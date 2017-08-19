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
    [Authorize]
    public class GoodsController : ApiController
    {
        // GET: api/Goods
        public object Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            using (WDB w = new WDB())
            {
                var goods = w.Good.GetGoodsTemplateList(start, limit).ToList();

                var o = new {
                    total = w.Good.GetGoodsCount(),
                    data = goods
                };
                return o;  
            }
        }

        // GET: api/Goods/5
        public DataModels.VGoodsTemplate Get(int id)
        {
            using (WDB w = new WDB())
            {
                return w.Good.GetGoodTmpById(id);
            }
        }

        // POST: api/Goods новый
        public long Post([FromBody]dynamic value)
        {
            using (WDB w = new WDB())
            {
                var o = value.ToString();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                DataModels.VGoodsTemplate good = jss.Deserialize<DataModels.VGoodsTemplate>(o);
                long GoodTmpId = w.Good.CreateGoodTmp(good);
                return GoodTmpId;
            }
        }

        // PUT: api/Goods/5 обновлення
        public void Put(int id, [FromBody]dynamic value)
        {
            var o = value.ToString();
            JavaScriptSerializer jss = new JavaScriptSerializer();
            DataModels.VGoodsTemplate good = jss.Deserialize<DataModels.VGoodsTemplate>(o);

            using (WDB w = new WDB())
            {
                w.Good.SetGoodTmp(good);
            }
        }

        // DELETE: api/Goods/5
        public void Delete(int id)
        {
        }
    }
}
