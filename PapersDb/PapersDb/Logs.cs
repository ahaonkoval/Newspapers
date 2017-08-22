using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using LinqToDB;
namespace PapersDbWorker
{
    public class Logs
    {
        public void SetRequest(string request)
        {
            using (var db = new PapersDB())
            {
                db.Requests.Insert(() => new Request {
                    Request_Column = request
                });
            }
        }
    }
}
