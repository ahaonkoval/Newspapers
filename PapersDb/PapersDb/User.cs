using DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqToDB;
using CryptA;

namespace PapersDbWorker
{
    public class User
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public IEnumerable<DataModels.User> GetUserList(int start, int limit)
        {
            using (var db = new PapersDB())
            {
                var index = 1;
                var users = db.Users.ToList().Select(
                    x => new DataModels.User
                    {
                        Ps = index++,
                        AccessId = x.AccessId,
                        Login = x.Login,
                        Name1 = x.Name1,
                        Name2 = x.Name2,
                        Name3 = x.Name3,
                        OtdId = x.OtdId,
                        Password = x.Password,                        
                        tokensToTables = x.tokensToTables,
                        UserId = x.UserId,
                        accessid18EBB = x.accessid18EBB,
                        otdid17F790F = x.otdid17F790F
                    }).ToList();

                return users;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        public void SetUser(DataModels.User user)
        {
            using (var db = new PapersDB())
            {
                db.Users.Where(w => w.UserId == user.UserId)
                    //.Set(p => p.AccessId, user.AccessId)
                    //.Set(p => p.accessid18EBB, user.accessid18EBB)
                    .Set(p => p.Login, user.Login)
                    .Set(p => p.Name1, user.Name1)
                    .Set(p => p.Name2, user.Name2)
                    .Set(p => p.Name3, user.Name3)
                    .Set(p => p.OtdId, user.OtdId)
                    //.Set(p => p.otdid17F790F, user.otdid17F790F)
                    .Set(p => p.AccessId, user.AccessId).Update();
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long CreateUser(DataModels.User user)
        {
            using (var db = new PapersDB())
            {
               long st = db.GetTable<DataModels.User>().Insert(() => new DataModels.User {
                    Name1 = user.Name1,
                    Name2 = user.Name2,
                    Name3 = user.Name3,
                    Login = user.Login,
                    AccessId = user.AccessId,
                    OtdId = user.OtdId,
                    Ps = 0,
                    Password = user.Password
                });

                return db.Users.Where(w => w.Login == user.Login).FirstOrDefault().UserId;

                //db.GetTable<Cell>().Insert(() => new Cell {
                //    Advantage = "",
                //    Artlst = "214234",
                //    CompensationSp = "sdvf"                    

                //    db.Users.Where(w => w.UserId == user.UserId)
                //        .Set(p => p.AccessId, user.AccessId)
                //        //.Set(p => p.accessid18EBB, user.accessid18EBB)
                //        .Set(p => p.Login, user.Login)
                //        .Set(p => p.Name1, user.Name1)
                //        .Set(p => p.Name2, user.Name2)
                //        .Set(p => p.Name3, user.Name3)
                //        .Set(p => p.OtdId, user.OtdId)
                //        //.Set(p => p.otdid17F790F, user.otdid17F790F)
                //        .Set(p => p.UserId, user.UserId).Update();
                //}
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        public DataModels.User LoginVerificated(string login)
        {
            using (var db = new PapersDB())
            {
                return db.Users.Where(w => w.Login == login).FirstOrDefault();
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="login"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool Autentificate(string login, string password)
        {
            using (var db = new PapersDB())
            {
                var user = db.Users.Where(w => w.Login == login).FirstOrDefault();

                if (user == null) return false;

                if (user.Password == new Guid(password))
                {
                    return true;
                }
                else return false;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        public string[] GetRoleNamesByLogin(string login)
        {
            using (var db = new PapersDB())
            {
                var user = db.Users.Where(w => w.Login == login).FirstOrDefault();
                var access = db.Accesses.Where(w => w.AccessId == user.AccessId).FirstOrDefault();
                List<string> lst = new List<string>();
                lst.Add(access.Name);

                return lst.ToArray();
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        public void Delete(int userId) {
            using (var db = new PapersDB())
            {
                db.Users.Delete(o => o.UserId == userId);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="pwd"></param>
        public void UpdPwd(int userId, string pwd)
        {
            using (Cryptor cryptor = new Cryptor())
            {
                Guid gpwd = new Guid(cryptor.Crypt(pwd));

                using (var db = new PapersDB())
                {
                    db.Users.Where(o => o.UserId == userId).Set(
                        p => p.Password, gpwd
                        ).Update();
                }
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        public string GetNewToken(long userId, string source)
        {
            using (Cryptor cryptor = new Cryptor())
            {
                string token = cryptor.Crypt(source);
                using (var db = new PapersDB())
                {
                    db.Tokens.Insert(() => new DataModels.Token {
                        UserId = userId,
                        Created = DateTime.Now,
                        Value = token
                    });
                    return token;
                }
            }
        }

        public long GetUserByLogin(string login)
        {
            using (var db = new PapersDB())
            {
                return db.VUsers.Where(w => w.Login == login).FirstOrDefault().UserId;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public VUsers GetUserByToken(string token)
        {
            using (var db = new PapersDB())
            {
                Token t = db.Tokens.Where(w => w.Value == token).FirstOrDefault();
                if (t != null)
                {
                    if (t.Created.AddHours(2) >= DateTime.Now)
                    {
                        var user = db.VUsers.Where(w => w.UserId == t.UserId).FirstOrDefault();
                        db.Tokens.Where(w => w.UserId == user.UserId).Set(p => p.Created, DateTime.Now).Update();
                        return user;

                    } else
                    {
                        return null;
                    }
                } else
                {
                    return null;
                }
            }                
        }

    }
}
