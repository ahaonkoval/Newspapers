using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PapersDbWorker;
using Newtonsoft.Json;
using System.Web.Script.Serialization;

namespace Newspapers.Controllers
{
    public class CellsController : ApiController
    {
        // GET: api/Cells
        public IEnumerable<DataModels.Cell> Get()
        {
            using (WDB w = new WDB())
            {
                return w.Cells.GetCellsListByPageId(1);
            }
        }

        // GET: api/Cells/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Cells
        public void Post([FromBody]object value)
        {
            string o = value.ToString();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            DataModels.Cell cell = jss.Deserialize<DataModels.Cell>(o);

            using (WDB w = new WDB())
            {
                w.Cells.SetCell(cell);
            }
        }

        // PUT: api/Cells/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Cells/5
        public void Delete(int id)
        {
        }

    }
}
