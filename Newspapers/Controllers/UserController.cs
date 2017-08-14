using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PapersDbWorker;
using DataModels;
using System.Web.Script.Serialization;

namespace Newspapers.Controllers
{
    public class UserController : ApiController
    {
        // GET: api/User
        public IEnumerable<DataModels.User> Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            using (WDB w = new WDB())
            {
                return w.User.GetUserList(start, limit).ToList();
            }
        }

        // GET: api/User/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        public long Post([FromBody]dynamic value)
        {
            var o = value.ToString();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            DataModels.User user = jss.Deserialize<DataModels.User>(o);

            using (WDB w = new WDB())
            {
                if (user.UserId != 0)
                {
                    w.User.SetUser(user);
                } else
                {
                    user.UserId = w.User.CreateUser(user);
                }
            }

            return user.UserId;
        }

        // PUT: api/User/5
        public long Put(int id, [FromBody]dynamic value)
        {
            using (WDB w = new WDB())
            {
                var o = value.ToString();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                UserTmp UserTmp = jss.Deserialize<UserTmp>(o);

                if (UserTmp.password == UserTmp.password_check)
                {
                    DataModels.User user = new DataModels.User
                    {
                        Name1 = UserTmp.name1,
                        Name2 = UserTmp.name2,
                        Name3 = UserTmp.name3,
                        AccessId = UserTmp.access,
                        Login = UserTmp.login,
                        OtdId = UserTmp.otd
                    };

                    user.UserId = w.User.CreateUser(user);
                    return user.UserId;
                }
                else
                {
                    return -1;
                }
            }
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
    public class UserTmp
    {
        public string login { get; set;}
        public string name1 { get; set; }
        public string name2 { get; set; }
        public string name3 { get; set; }
        public int otd { get; set; }
        public int access { get; set; }
        public string password { get; set; }
        public string password_check { get; set; }
        public string UserId { get; set; }
    }

    /*
        {
          "name1": "11",
          "name2": "11",
          "name3": "11",
          "login": "11",
          "otd": 10,
          "access": 1,
          "password": "11",
          "password_check": "11"
        }
     */
}
