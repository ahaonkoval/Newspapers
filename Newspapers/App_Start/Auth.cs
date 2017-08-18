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

namespace Newspapers.App_Start
{
    public class IdentityBasicAuthentication : Attribute, IAuthenticationFilter
    {
        //private readonly IAuthenticator _authenticator;

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

                //return true;

                if (authorization == null)
                {
                    context.ErrorResult = new AuthenticationFailureResult("Missing authorization header", request);
                    return;
                }

                if (authorization.Scheme != "Basic")
                {
                    if (authorization.Scheme != "tk")
                    {
                        context.ErrorResult = new AuthenticationFailureResult("Authorization scheme not supported", request);
                        return;
                    }
                }

                if (authorization.Scheme == "tk")
                {
                    // По токену шукаємо користувача, перевіряємо його валідність, і формуємо GenericPrincipal

                    String[] array = { "element1", "element2", "element3" };
                    var identity = new GenericIdentity("123", "Basic");
                    context.Principal = new GenericPrincipal(identity, array);
                    return;
                }

                    //if (string.IsNullOrEmpty(authorization.Parameter))
                    //{
                    //    //context.ErrorResult = new AuthenticationFailureResult("Missing credentials", request);
                    //    return;
                    //}

                    Tuple<string, string> userNameAndPasword = ExtractUserNameAndPassword(authorization.Parameter);
                if (userNameAndPasword == null)
                {
                    //context.ErrorResult = new AuthenticationFailureResult("Invalid credentials", request);
                }
                else
                {
                    string userName = userNameAndPasword.Item1;
                    string password = userNameAndPasword.Item2;
                    //you may need to decide here how to verify the user. if you have saved in db, then check in db
                    if (IsAuthenticated())
                    {
                        //var identity = new GenericIdentity(userName, "Basic");
                        //if you need authorization as well, then fetch the roles and add it here
                        //context.Principal = new GenericPrincipal(identity, _authenticator.GetRoles());
                    }
                    else
                        context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                }
            });
        }

        public bool IsAuthenticated()
        {
            return true;
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            //var host = context.Request.RequestUri.DnsSafeHost;
            //var challenge = new AuthenticationHeaderValue("Basic");
            //context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(execute());
        }

        private HttpResponseMessage execute()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            response.RequestMessage = new HttpRequestMessage();//ContextBoundObjec; 
            response.ReasonPhrase = "phhhhhhhhhhhhhhhhhhhhhh";
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