using PapersDbWorker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Newspapers.Controllers
{
    public class LoginController : ApiController
    {
        [Authorize]
        // GET: api/Login
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Login/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Login
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Login/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Login/5
        public void Delete(int id)
        {

        }
        [HttpGet]
        public string LoginVerificated(int id)
        {
            string returned = "IsNotExists";
            var parameters = Request.GetQueryNameValuePairs();
            var login = parameters.Where(o => o.Key == "login").FirstOrDefault().Value.ToString();
            if (login != null)
            {
                using (WDB w = new WDB())
                {
                    DataModels.User user = w.User.LoginVerificated(login);
                    if (user != null)
                    {
                        returned = "IsExists";
                    }
                }
            } else { returned = "IsExists"; }

            return returned;
        }
    }
}
