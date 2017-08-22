using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PapersDbWorker;
using DataModels;
using System.Web.Script.Serialization;
using CryptA;

namespace Newspapers.Controllers
{
    public class UserController : ApiController
    {
        //[Authorize]
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
        public void Put(int id, [FromBody]dynamic value)
        {
            using (WDB w = new WDB())
            {
                var o = value.ToString();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                UserTmp UserTmp = jss.Deserialize<UserTmp>(o);

                    using (Cryptor cryptor = new Cryptor()) {
                        DataModels.User user = new DataModels.User
                        {
                            UserId = id,
                            Name1 = UserTmp.name1,
                            Name2 = UserTmp.name2,
                            Name3 = UserTmp.name3,
                            AccessId = UserTmp.AccessId,
                            Login = UserTmp.login,
                            OtdId = UserTmp.OtdId
                            //Password = new Guid(cryptor.Crypt(UserTmp.password))
                        };
                        w.User.SetUser(user);
                    }
            }
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        [HttpPost]
        public void DeleteUser(int id)
        {
            using (WDB w = new WDB())
            {
                w.User.Delete(id);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        [HttpPost]
        public void Change(int id, [FromBody]dynamic value)
        {
            using (WDB w = new WDB())
            {
                w.User.UpdPwd(id, value.ToString());
            }
        }
    }
    public class UserTmp
    {
        public string login { get; set;}
        public string name1 { get; set; }
        public string name2 { get; set; }
        public string name3 { get; set; }
        public int OtdId { get; set; }
        public int AccessId { get; set; }
        public string password { get; set; }
        public string password_check { get; set; }
        public string UserId { get; set; }
    }

    /*
     * "OtdId": 10,
  "AccessId": 2,
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
