using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using LinqToDB;

namespace PapersDbWorker
{
    public class Paper
    {
        public Paper()
        {

        }
        public IEnumerable<DataModels.Paper> GetPapersList(int year, int month, long start, long limit, out int qty)
        {
            limit = (start + limit);
            using (var db = new PapersDB())
            {
                int index = 1;
                var ps = db.Papers.Where(w => w.PublicationDate.Value.Year == year && w.PublicationDate.Value.Month == month).ToList()
                    .Select(
                        x => new DataModels.Paper
                        {
                            Ps = index++,
                            CorrectionGoods = x.CorrectionGoods,
                            DeliveryNewsPaper = x.DeliveryNewsPaper,
                            LayoutNewsPaper = x.LayoutNewsPaper,
                            PaperId = x.PaperId,
                            PaperName = x.PaperName,
                            PrintingNewsPaper = x.PrintingNewsPaper,
                            PrintPrepareAndSign = x.PrintPrepareAndSign,
                            PublicationDate = x.PublicationDate,
                            QtyPages = x.QtyPages,
                            ReconcilementArtQty = x.ReconcilementArtQty,
                            SellAproveGoods = x.SellAproveGoods,
                            StartGoodPrepare = x.StartGoodPrepare,
                            StartQtyPages = x.StartQtyPages,
                            StopAgreement = x.StopAgreement
                        }
                ).ToList();

                qty = ps.Count();

                return ps.Where(w => w.Ps >= start && w.Ps <= limit).ToList(); 
            }
        }

        public long CreatePaper(DataModels.Paper paper)
        {
            using (var db = new PapersDB())
            {
                var o = db.Papers.InsertWithIdentity(
                    () => new DataModels.Paper
                    {
                        CorrectionGoods = paper.CorrectionGoods,
                        DeliveryNewsPaper = paper.DeliveryNewsPaper,
                        LayoutNewsPaper = paper.LayoutNewsPaper,
                        PaperName = paper.PaperName,
                        PrintingNewsPaper = paper.PrintingNewsPaper,
                        PrintPrepareAndSign = paper.PrintPrepareAndSign,
                        PublicationDate = paper.PublicationDate,
                        ReconcilementArtQty = paper.ReconcilementArtQty,
                        SellAproveGoods = paper.SellAproveGoods,
                        StartGoodPrepare = paper.StartGoodPrepare,
                        StartQtyPages = paper.StartQtyPages,
                        StopAgreement = paper.StopAgreement
                    });
                return Convert.ToInt64(o);
            }
        }

        public void UpdatePaper(DataModels.Paper paper)
        {
            using (var db = new PapersDB())
            {
                db.Papers.Where(w => w.PaperId == paper.PaperId)
                    .Set(p => p.CorrectionGoods, paper.CorrectionGoods)
                    .Set(p => p.DeliveryNewsPaper, paper.DeliveryNewsPaper)
                    .Set(p => p.LayoutNewsPaper, paper.LayoutNewsPaper)
                    .Set(p => p.PaperName, paper.PaperName)
                    .Set(p => p.PrintingNewsPaper, paper.PrintingNewsPaper)
                    .Set(p => p.PrintPrepareAndSign, paper.PrintPrepareAndSign)
                    .Set(p => p.PublicationDate, paper.PublicationDate)
                    .Set(p => p.ReconcilementArtQty, paper.ReconcilementArtQty)
                    .Set(p => p.SellAproveGoods, paper.SellAproveGoods)
                    .Set(p => p.StartGoodPrepare, paper.StartGoodPrepare)
                    .Set(p => p.StopAgreement, paper.StopAgreement)
                    .Update();
            }
        }

        public DataModels.Paper GetPaperById(long paperId)
        {
            using (var db = new PapersDB())
            {
                return db.Papers.Where(w => w.PaperId == paperId).FirstOrDefault();
            }
        }
    }
}
