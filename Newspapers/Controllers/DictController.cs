using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Newspapers.Controllers
{
    public class DictController : ApiController
    {
        // GET: api/Dict
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Dict/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Dict
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Dict/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Dict/5
        public void Delete(int id)
        {
        }
    }
}
