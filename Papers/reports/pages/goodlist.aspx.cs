using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Papers.reports.pages
{
    public partial class goodlist1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~//reports//rprt//goodlist.rdlc");
            // HttpContext.Current.Request.Url.Host + "\\reports\\rprt\\goodlist.rdlc";
        }
    }
}