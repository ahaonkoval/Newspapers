using DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PapersDbWorker
{
    public class Dict
    {
        public IEnumerable<Otd> GetOtdList()
        {
            using (var db = new PapersDB())
            {
                return db.Otds.OrderBy(o => o.OtdId).ToList();
            }
        }
    }
}
