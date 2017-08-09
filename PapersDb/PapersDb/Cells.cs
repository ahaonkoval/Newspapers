using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using LinqToDB;
//using System.Data.Linq;

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

        public void SetCell(Cell c)
        {
            using (var db = new PapersDB())
            {                
                ITable<Cell> cell = db.GetTable<Cell>();

                db.Cells.Where(w => w.GlobalCellId == c.GlobalCellId)
                    .Set(p => p.Artlst, c.Artlst)
                    .Set(p => p.Advantage, c.Advantage)
                    .Set(p => p.CompensationSp, c.CompensationSp)
                    .Set(p => p.CompetitiveProduct, c.CompetitiveProduct)
                    .Set(p => p.Competitors, c.Competitors)
                    .Set(p => p.CompetitorsPrice, c.CompetitorsPrice)
                    .Set(p => p.DepartId, c.DepartId)
                    .Set(p => p.DiffCompetitorPrice, c.DiffCompetitorPrice)
                    .Set(p => p.DiffCompetitorPricePrc, c.DiffCompetitorPricePrc)
                    .Set(p => p.DiffPrice, c.DiffPrice)
                    .Set(p => p.ForecastProfit, c.ForecastProfit)
                    .Set(p => p.ForecastProfitAct, c.ForecastProfitAct)
                    .Set(p => p.Garant, c.Garant)
                    .Set(p => p.Inventory, c.Inventory)
                    .Set(p => p.Isfill, c.Isfill)
                    .Set(p => p.Madein, c.Madein)
                    .Set(p => p.Manager, c.Manager)
                    .Set(p => p.Margin, c.Margin)
                    .Set(p => p.Number, c.Number)
                    .Set(p => p.OtdId, c.OtdId)
                    .Set(p => p.PageId, c.PageId)
                    .Set(p => p.PagePosition, c.PagePosition)
                    .Set(p => p.PathPhoto, c.PathPhoto)
                    .Set(p => p.PlacementType, c.PlacementType)
                    .Set(p => p.PriceAct, c.PriceAct)
                    .Set(p => p.PriceAfterAct, c.PriceAfterAct)
                    .Set(p => p.PriceBeforeAct, c.PriceBeforeAct)
                    .Set(p => p.PriceBuy, c.PriceBuy)
                    .Set(p => p.PriceStart, c.PriceStart)
                    .Set(p => p.Producer, c.Producer)
                    .Set(p => p.ProducktCategory, c.ProducktCategory)
                    .Set(p => p.ProfitProcent, c.ProfitProcent)
                    .Set(p => p.ShortName, c.ShortName)
                    .Set(p => p.Specifiacations, c.Specifiacations)
                    .Set(p => p.SpecilPlacement, c.SpecilPlacement)
                    .Set(p => p.Unit, c.Unit)
                .Update();

                //db.Update(c);

                //db.Users.DataContext..Cells.Where(w => w.GlobalCellId == c.GlobalCellId)
                //db.GetTable<Cell>()

                //db.GetTable<Cell>().Insert(() => new Cell {
                //    Advantage = "",
                //    Artlst = "214234",
                //    CompensationSp = "sdvf"                    

                //});
                //var i = db.Cells.Insert(cell.);
            }
        }
    }
}
