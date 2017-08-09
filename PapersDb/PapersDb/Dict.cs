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
                return db.Otds.Where(w=> w.OtdId != 726).Where(w=> w.OtdId != 1000).OrderBy(o => o.OtdId).ToList();
            }
        }

        public IEnumerable<Depart> GetDepartList()
        {
            using (var db = new PapersDB())
            {
                return db.Departs.OrderBy(o => o.DepartId).ToList();
            }
        }
    }
}
