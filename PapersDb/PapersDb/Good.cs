using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using LinqToDB;

namespace PapersDbWorker
{
    public class Good
    {
        public Good()
        {

        }
        public IEnumerable<DataModels.VGoodsTemplate> GetGoodsTemplateList(long start, long limit)
        {
            limit = (start + limit);
            using (var db = new PapersDB())
            {
                return db.VGoodsTemplate.Where(w => w.Number >= start && w.Number <= limit).ToList();
            }
        }   
        
        public int GetGoodsCount()
        {
            using (var db = new PapersDB())
            {
                return db.GoodsTemplate.Count();
            }
        }  
        
        public long CreateGoodTmp(DataModels.VGoodsTemplate good)
        {
            using (var db = new PapersDB())
            {
                //long id = db.GetTable<GoodsTemplate>().Insert(() => new GoodsTemplate
                //{
                //    Keywords = good.Keywords,
                //    Name = good.Name,
                //    SizeId = good.SizeId
                //});
                DataModels.GoodsTemplate g = new DataModels.GoodsTemplate {
                    Keywords = good.Keywords,
                    Name = good.Name,
                    SizeId = good.SizeId
                };

                long id = Convert.ToInt64(db.InsertWithIdentity(g));
                return id;
            }
        }

        public VGoodsTemplate GetGoodTmpById(long GoodTmpId)
        {
            using (var db = new PapersDB())
            {
                return db.VGoodsTemplate.Where(w => w.GoodtmpId == GoodTmpId).FirstOrDefault();
            }
        }
    }
}
