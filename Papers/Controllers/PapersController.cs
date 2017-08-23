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

namespace Papers.Controllers
{
    [Authorize]
    public class PapersController : ApiController
    {
        // GET: api/Papers
        public object Get()
        {
            using (WDB wdb = new WDB())
            {
                var queryparams = Request.GetQueryNameValuePairs();

                var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
                var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
                var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

                var year = Convert.ToInt32(queryparams.Where(w => w.Key == "year").FirstOrDefault().Value);
                var month = Convert.ToInt32(queryparams.Where(w => w.Key == "month").FirstOrDefault().Value);

                int qty = 0;
                var list = wdb.Paper.GetPapersList(year, month, start, limit, out qty).ToList();

                return new
                {
                    data = list,
                    total = qty
                };     
            }
        }

        // GET: api/Papers/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Papers
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Papers/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Papers/5
        public void Delete(int id)
        {
        }
    }
}
