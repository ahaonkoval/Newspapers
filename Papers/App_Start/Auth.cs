using PapersDbWorker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http.Results;
using CryptA;

namespace Papers.App_Start
{
    public class IdentityBasicAuthentication : Attribute, IAuthenticationFilter
    {
        private readonly IAuthenticator _authenticator;

        public bool AllowMultiple
        {
            get { return true; }
        }

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            await Task.Factory.StartNew(() =>
            {
                HttpRequestMessage request = context.Request;
                AuthenticationHeaderValue authorization = request.Headers.Authorization;

                using (WDB w = new WDB())
                {
                    w.DbLoger.SetRequest(context.Request.ToString());
                    w.DbLoger.SetRequest(request.Headers.Authorization.ToString());
                }            

                //return true;

                if (authorization == null)
                {
                    context.ErrorResult = new AuthenticationFailureResult("Missing authorization header", request);
                    return;
                }

                if (authorization.Scheme != "tk")
                {
                    if (authorization.Scheme != "Basic")
                    {
                        context.ErrorResult = new AuthenticationFailureResult("Authorization scheme not supported", request);
                        return;
                    }
                }

                if (authorization.Scheme == "tk")
                {
                    // По токену шукаємо користувача, перевіряємо його валідність, і формуємо GenericPrincipal
                    string token = GetTokenFromBase64String(authorization.Parameter);
                    if (token != string.Empty)
                    {
                        using (WDB w = new WDB())
                        {
                            DataModels.VUsers user = w.User.GetUserByToken(token);
                            if (user != null)
                            {
                                var identity = new GenericIdentity(user.Login, "Basic");
                                context.Principal = new GenericPrincipal(identity, GetRoleNamesByLogin(user.Login));
                                return;
                            }
                            else
                            {
                                return;
                            }
                        }
                    }
                }

                if (authorization.Scheme == "Basic")
                {
                    Tuple<string, string> userNameAndPasword = ExtractUserNameAndPassword(authorization.Parameter);
                    if (userNameAndPasword == null)
                    {
                        context.ErrorResult = new AuthenticationFailureResult("Invalid credentials", request);
                    }
                    else
                    {
                        string login = userNameAndPasword.Item1;
                        string password = userNameAndPasword.Item2;
                        if (IsAuthenticated(login, password))
                        {
                            var identity = new GenericIdentity(login, "Basic");
                            //if you need authorization as well, then fetch the roles and add it here
                            context.Principal = new GenericPrincipal(identity, GetRoleNamesByLogin(login));
                        }
                        else
                            context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                    }
                }
            });
        }

        public bool IsAuthenticated(string login, string password)
        {
            using (WDB w = new WDB())
            {
                using (CryptA.Cryptor cryptor = new Cryptor())
                {
                    string wp = cryptor.Crypt(password);
                    return w.User.Autentificate(login, wp);
                }
            }
        }

        public string[] GetRoleNamesByLogin(string login) {
            using (WDB w = new WDB())
            {
                return w.User.GetRoleNamesByLogin(login);
            }
        }

        private string GetTokenFromBase64String(string base54string)
        {
            byte[] credentialBytes;
            try
            {
                credentialBytes = Convert.FromBase64String(base54string);
                Encoding encoding = Encoding.ASCII;
                // Make a writable copy of the encoding to enable setting a decoder fallback.
                encoding = (Encoding)encoding.Clone();
                // Fail on invalid bytes rather than silently replacing and continuing.
                encoding.DecoderFallback = DecoderFallback.ExceptionFallback;
                string token = encoding.GetString(credentialBytes);

                if (String.IsNullOrEmpty(token))
                {
                    return string.Empty;
                }
                else
                {
                    return token;
                }
            }
            catch {
                return string.Empty;
            }

        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            //var host = context.Request.RequestUri.DnsSafeHost;
            //var challenge = new AuthenticationHeaderValue("Basic");
            //context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(execute(context, cancellationToken));
        }

        private HttpResponseMessage execute(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            response.RequestMessage = new HttpRequestMessage();//ContextBoundObjec; 
            response.ReasonPhrase = "error";
            return response;
        }

        private static Tuple<string, string> ExtractUserNameAndPassword(string authorizationParameter)
        {
            byte[] credentialBytes;

            try
            {
                credentialBytes = Convert.FromBase64String(authorizationParameter);
            }
            catch (FormatException)
            {
                return null;
            }

            // The currently approved HTTP 1.1 specification says characters here are ISO-8859-1.
            // However, the current draft updated specification for HTTP 1.1 indicates this encoding is infrequently
            // used in practice and defines behavior only for ASCII.
            Encoding encoding = Encoding.ASCII;
            // Make a writable copy of the encoding to enable setting a decoder fallback.
            encoding = (Encoding)encoding.Clone();
            // Fail on invalid bytes rather than silently replacing and continuing.
            encoding.DecoderFallback = DecoderFallback.ExceptionFallback;
            string decodedCredentials;

            try
            {
                decodedCredentials = encoding.GetString(credentialBytes);
            }
            catch (DecoderFallbackException)
            {
                return null;
            }

            if (String.IsNullOrEmpty(decodedCredentials))
            {
                return null;
            }

            int colonIndex = decodedCredentials.IndexOf(':');

            if (colonIndex == -1)
            {
                return null;
            }

            string userName = decodedCredentials.Substring(0, colonIndex);
            string password = decodedCredentials.Substring(colonIndex + 1);
            return new Tuple<string, string>(userName, password);
        }
    }

    internal class AuthenticationFailureResult : IHttpActionResult
    {
        private HttpRequestMessage request;
        private string v;

        public AuthenticationFailureResult(string v, HttpRequestMessage request)
        {
            this.v = v;
            this.request = request;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }

    internal interface IAuthenticator
    {
    }

    internal class AddChallengeOnUnauthorizedResult : IHttpActionResult
    {
        private AuthenticationHeaderValue challenge;
        private IHttpActionResult result;

        public AddChallengeOnUnauthorizedResult(AuthenticationHeaderValue challenge, IHttpActionResult result)
        {
            this.challenge = challenge;
            this.result = result;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }

    //public class Auth
    //{
    //}
}