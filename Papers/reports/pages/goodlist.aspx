<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="goodlist.aspx.cs" Inherits="Papers.reports.pages.goodlist1" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%" Height="1000px">
                <LocalReport ReportPath="\\reports\rprt\goodlist.rdlc">
                    <DataSources>
                        <rsweb:ReportDataSource DataSourceId="sdsPaperGood" Name="GoodsList" />
                    </DataSources>
                </LocalReport>
            </rsweb:ReportViewer>
            <asp:ScriptManager ID="ScriptManager1" runat="server">
            </asp:ScriptManager>
        </div>
        <asp:SqlDataSource ID="sdsPaperGood" runat="server" ConnectionString="<%$ ConnectionStrings:Papers %>"
            SelectCommand="SELECT * FROM [cells] where isfill = 1"></asp:SqlDataSource>
    </form>
</body>
</html>
