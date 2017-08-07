using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;

namespace PapersDbWorker
{
    public class Cells
    {
        public Cells()
        {

        }
        public IEnumerable<Cell> GetCellsListByPageId(long page_id)
        {
            using (var db = new PapersDB())
            {
                return db.Cells.Where(w => w.PageId == page_id).OrderBy(o => o.PagePosition).ToList();
            }
        }
    }
}
