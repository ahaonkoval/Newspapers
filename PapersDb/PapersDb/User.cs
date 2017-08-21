﻿using DataModels;
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

        public DataModels.User LoginVerificated(string login)
        {
            using (var db = new PapersDB())
            {
                return db.Users.Where(w => w.Login == login).FirstOrDefault();
            }
        }

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

        public void Delete(int userId) {
            using (var db = new PapersDB())
            {
                db.Users.Delete(o => o.UserId == userId);
            }
        }

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
    }
}
