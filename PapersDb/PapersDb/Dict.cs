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
        public IEnumerable<Otd> GetOtdList(int id)
        {
            using (var db = new PapersDB())
            {
                if (id == 0)
                {
                    return db.Otds.Where(w => w.OtdId != 726).Where(w => w.OtdId != 1000).OrderBy(o => o.OtdId).ToList();
                }
                else
                {
                    return db.Otds.OrderBy(o => o.OtdId).ToList();
                }
            }
        }

        public IEnumerable<Depart> GetDepartList()
        {
            using (var db = new PapersDB())
            {
                return db.Departs.OrderBy(o => o.DepartId).ToList();
            }
        }

        public IEnumerable<Access> GetAccessList()
        {
            using (var db = new PapersDB())
            {
                return db.Accesses.OrderBy(o => o.AccessId).ToList();
            }
        }

        public IEnumerable<DataModels.GoodsSizes> GetGoodsSizes()
        {
            using (var db = new PapersDB())
            {
                return db.GoodsSizes.OrderBy(o => o.SizeId).ToList();
            }
        }
    }
}
