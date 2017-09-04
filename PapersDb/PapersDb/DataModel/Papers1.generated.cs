//---------------------------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated by T4Model template for T4 (https://github.com/linq2db/t4models).
//    Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//---------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

using LinqToDB;
using LinqToDB.Common;
using LinqToDB.Data;
using LinqToDB.DataProvider.SqlServer;
using LinqToDB.Extensions;
using LinqToDB.Mapping;

namespace DataModels
{
	/// <summary>
	/// Database       : PapersDevelop
	/// Data Source    : MO-726-001
	/// Server Version : 13.00.4446
	/// </summary>
	public partial class PapersDB : LinqToDB.Data.DataConnection
	{
		public ITable<Access>         Accesses       { get { return this.GetTable<Access>(); } }
		public ITable<Cell>           Cells          { get { return this.GetTable<Cell>(); } }
		public ITable<Depart>         Departs        { get { return this.GetTable<Depart>(); } }
		public ITable<GoodsSizes>     GoodsSizes     { get { return this.GetTable<GoodsSizes>(); } }
		public ITable<GoodsTemplate>  GoodsTemplate  { get { return this.GetTable<GoodsTemplate>(); } }
		public ITable<Npaper>         Npapers        { get { return this.GetTable<Npaper>(); } }
		public ITable<Otd>            Otds           { get { return this.GetTable<Otd>(); } }
		public ITable<Page>           Pages          { get { return this.GetTable<Page>(); } }
		public ITable<Request>        Requests       { get { return this.GetTable<Request>(); } }
		public ITable<Token>          Tokens         { get { return this.GetTable<Token>(); } }
		public ITable<User>           Users          { get { return this.GetTable<User>(); } }
		public ITable<VGoodsTemplate> VGoodsTemplate { get { return this.GetTable<VGoodsTemplate>(); } }
		public ITable<VUsers>         VUsers         { get { return this.GetTable<VUsers>(); } }

		public PapersDB()
		{
			InitDataContext();
		}

		public PapersDB(string configuration)
			: base(configuration)
		{
			InitDataContext();
		}

		partial void InitDataContext();

		#region FreeTextTable

		public class FreeTextKey<T>
		{
			public T   Key;
			public int Rank;
		}

		private static MethodInfo _freeTextTableMethod1 = typeof(PapersDB).GetMethod("FreeTextTable", new Type[] { typeof(string), typeof(string) });

		[FreeTextTableExpression]
		public ITable<FreeTextKey<TKey>> FreeTextTable<TTable,TKey>(string field, string text)
		{
			return this.GetTable<FreeTextKey<TKey>>(
				this,
				_freeTextTableMethod1,
				field,
				text);
		}

		private static MethodInfo _freeTextTableMethod2 = 
			typeof(PapersDB).GetMethods()
				.Where(m => m.Name == "FreeTextTable" &&  m.IsGenericMethod && m.GetParameters().Length == 2)
				.Where(m => m.GetParameters()[0].ParameterType.IsGenericTypeEx() && m.GetParameters()[0].ParameterType.GetGenericTypeDefinition() == typeof(Expression<>))
				.Where(m => m.GetParameters()[1].ParameterType == typeof(string))
				.Single();

		[FreeTextTableExpression]
		public ITable<FreeTextKey<TKey>> FreeTextTable<TTable,TKey>(Expression<Func<TTable,string>> fieldSelector, string text)
		{
			return this.GetTable<FreeTextKey<TKey>>(
				this,
				_freeTextTableMethod2,
				fieldSelector,
				text);
		}

		#endregion
	}

	[Table(Schema="dbo", Name="access")]
	public partial class Access
	{
		[Column("access_id"), PrimaryKey,  NotNull] public long   AccessId { get; set; } // bigint
		[Column("name"),         Nullable         ] public string Name     { get; set; } // nvarchar(50)

		#region Associations

		/// <summary>
		/// FK__users__access_id__18EBB532_BackReference
		/// </summary>
		[Association(ThisKey="AccessId", OtherKey="AccessId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<User> usersid18EBB { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="cells")]
	public partial class Cell
	{
		[Column("global_cell_id"),            PrimaryKey,  Identity] public long     GlobalCellId           { get; set; } // bigint
		[Column("page_id"),                   NotNull              ] public long     PageId                 { get; set; } // bigint
		[Column("page_position"),                Nullable          ] public int?     PagePosition           { get; set; } // int
		[Column("otd_id"),                       Nullable          ] public long?    OtdId                  { get; set; } // bigint
		[Column("depart_id"),                    Nullable          ] public long?    DepartId               { get; set; } // bigint
		[Column("artlst"),                       Nullable          ] public string   Artlst                 { get; set; } // nvarchar(50)
		[Column("unit"),                         Nullable          ] public string   Unit                   { get; set; } // nvarchar(50)
		[Column("number"),                       Nullable          ] public string   Number                 { get; set; } // nvarchar(50)
		[Column("short_name"),                   Nullable          ] public string   ShortName              { get; set; } // nvarchar(50)
		[Column("producer"),                     Nullable          ] public string   Producer               { get; set; } // nvarchar(50)
		[Column("madein"),                       Nullable          ] public string   Madein                 { get; set; } // nvarchar(50)
		[Column("price_buy"),                    Nullable          ] public decimal? PriceBuy               { get; set; } // decimal(18, 2)
		[Column("price_before_act"),             Nullable          ] public decimal? PriceBeforeAct         { get; set; } // decimal(18, 2)
		[Column("price_act"),                    Nullable          ] public decimal? PriceAct               { get; set; } // decimal(18, 2)
		[Column("price_after_act"),              Nullable          ] public decimal? PriceAfterAct          { get; set; } // decimal(18, 2)
		[Column("price_start"),                  Nullable          ] public decimal? PriceStart             { get; set; } // decimal(18, 2)
		[Column("profit_procent"),               Nullable          ] public decimal? ProfitProcent          { get; set; } // decimal(18, 2)
		[Column("margin"),                       Nullable          ] public decimal? Margin                 { get; set; } // decimal(18, 2)
		[Column("diff_price"),                   Nullable          ] public decimal? DiffPrice              { get; set; } // decimal(18, 2)
		[Column("forecast_profit"),              Nullable          ] public decimal? ForecastProfit         { get; set; } // decimal(18, 2)
		[Column("forecast_profit_act"),          Nullable          ] public decimal? ForecastProfitAct      { get; set; } // decimal(18, 2)
		[Column("specifiacations"),              Nullable          ] public string   Specifiacations        { get; set; } // nvarchar(255)
		[Column("garant"),                       Nullable          ] public string   Garant                 { get; set; } // nvarchar(255)
		[Column("advantage"),                    Nullable          ] public string   Advantage              { get; set; } // nvarchar(255)
		[Column("inventory"),                    Nullable          ] public string   Inventory              { get; set; } // nvarchar(255)
		[Column("competitors"),                  Nullable          ] public string   Competitors            { get; set; } // nvarchar(50)
		[Column("competitive_product"),          Nullable          ] public string   CompetitiveProduct     { get; set; } // nvarchar(50)
		[Column("competitors_price"),            Nullable          ] public string   CompetitorsPrice       { get; set; } // nvarchar(50)
		[Column("diff_competitor_price"),        Nullable          ] public decimal? DiffCompetitorPrice    { get; set; } // decimal(18, 2)
		[Column("diff_competitor_price_prc"),    Nullable          ] public decimal? DiffCompetitorPricePrc { get; set; } // decimal(18, 2)
		[Column("placement_type"),               Nullable          ] public string   PlacementType          { get; set; } // nvarchar(50)
		[Column("compensation_sp"),              Nullable          ] public string   CompensationSp         { get; set; } // nvarchar(50)
		[Column("specil_placement"),             Nullable          ] public string   SpecilPlacement        { get; set; } // nvarchar(50)
		[Column("manager"),                      Nullable          ] public string   Manager                { get; set; } // nvarchar(50)
		[Column("produckt_category"),            Nullable          ] public string   ProducktCategory       { get; set; } // nvarchar(50)
		[Column("path_photo"),                   Nullable          ] public string   PathPhoto              { get; set; } // nvarchar(50)
		[Column("isfill"),                       Nullable          ] public bool?    Isfill                 { get; set; } // bit
		[Column(),                               Nullable          ] public string   OtdName                { get; set; } // nvarchar(255)
		[Column(),                            NotNull              ] public string   DepartName             { get; set; } // nvarchar(255)

		#region Associations

		/// <summary>
		/// FK_cells_departs
		/// </summary>
		[Association(ThisKey="DepartId", OtherKey="Lf1Id", CanBeNull=true, Relationship=Relationship.ManyToOne, KeyName="FK_cells_departs", BackReferenceName="cells")]
		public Depart depart { get; set; }

		/// <summary>
		/// FK_cells_pages
		/// </summary>
		[Association(ThisKey="PageId", OtherKey="PageId", CanBeNull=false, Relationship=Relationship.ManyToOne, KeyName="FK_cells_pages", BackReferenceName="cells")]
		public Page page { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="departs")]
	public partial class Depart
	{
		[Column("depart_id"), PrimaryKey, Identity] public long   DepartId { get; set; } // bigint
		[Column("otd_id"),    Nullable            ] public long?  OtdId    { get; set; } // bigint
		[Column("lf0_id"),    Nullable            ] public long?  Lf0Id    { get; set; } // bigint
		[Column("name_0"),    Nullable            ] public string Name0    { get; set; } // nvarchar(255)
		[Column("lf1_id"),    Nullable            ] public long?  Lf1Id    { get; set; } // bigint
		[Column("name_1"),    Nullable            ] public string Name1    { get; set; } // nvarchar(255)

		#region Associations

		/// <summary>
		/// FK_cells_departs_BackReference
		/// </summary>
		[Association(ThisKey="Lf1Id", OtherKey="DepartId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<Cell> cells { get; set; }

		/// <summary>
		/// FK_departs_otds
		/// </summary>
		[Association(ThisKey="OtdId", OtherKey="OtdId", CanBeNull=true, Relationship=Relationship.ManyToOne, KeyName="FK_departs_otds", BackReferenceName="departs")]
		public Otd otd { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="goods_sizes")]
	public partial class GoodsSizes
	{
		[Column("size_id"), PrimaryKey,  NotNull] public long   SizeId { get; set; } // bigint
		[Column("name"),       Nullable         ] public string Name   { get; set; } // nvarchar(50)

		#region Associations

		/// <summary>
		/// FK_goods_template_goods_sizes_BackReference
		/// </summary>
		[Association(ThisKey="SizeId", OtherKey="SizeId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<GoodsTemplate> goodstemplategoodssizes { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="goods_template")]
	public partial class GoodsTemplate
	{
		[Column("goodtmp_id"), PrimaryKey, Identity] public long   GoodtmpId { get; set; } // bigint
		[Column("name"),       Nullable            ] public string Name      { get; set; } // nvarchar(255)
		[Column("keywords"),   Nullable            ] public string Keywords  { get; set; } // nvarchar(50)
		[Column("size_id"),    Nullable            ] public long?  SizeId    { get; set; } // bigint
		[Column("ps"),         Nullable            ] public string Ps        { get; set; } // nchar(10)

		#region Associations

		/// <summary>
		/// FK_goods_template_goods_sizes
		/// </summary>
		[Association(ThisKey="SizeId", OtherKey="SizeId", CanBeNull=true, Relationship=Relationship.ManyToOne, KeyName="FK_goods_template_goods_sizes", BackReferenceName="goodstemplategoodssizes")]
		public GoodsSizes goodstemplategoodssize { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="npapers")]
	public partial class Npaper
	{
		[Column("paper_id"),               PrimaryKey, Identity] public long      PaperId             { get; set; } // bigint
		[Column("paper_name"),             Nullable            ] public string    PaperName           { get; set; } // nvarchar(50)
		[Column("start_qty_pages"),        Nullable            ] public int?      StartQtyPages       { get; set; } // int
		[Column("publication_date"),       Nullable            ] public DateTime? PublicationDate     { get; set; } // date
		/// <summary>
		/// ?????????? ????????? ?????????
		/// </summary>
		[Column("reconcilement_art_qty"),  Nullable            ] public DateTime? ReconcilementArtQty { get; set; } // date
		/// <summary>
		/// ??????? ?????????? ???????
		/// </summary>
		[Column("start_good_prepare"),     Nullable            ] public DateTime? StartGoodPrepare    { get; set; } // date
		/// <summary>
		/// ??????, ??????, ?????????? ???????
		/// </summary>
		[Column("sell_aprove_goods"),      Nullable            ] public DateTime? SellAproveGoods     { get; set; } // date
		/// <summary>
		/// ??????? ??????
		/// </summary>
		[Column("layout_news_paper"),      Nullable            ] public DateTime? LayoutNewsPaper     { get; set; } // date
		/// <summary>
		/// ???????????? ???????
		/// </summary>
		[Column("correction_goods"),       Nullable            ] public DateTime? CorrectionGoods     { get; set; } // date
		/// <summary>
		/// ???. ??????????, ?????????? ? ????????
		/// </summary>
		[Column("stop_agreement"),         Nullable            ] public DateTime? StopAgreement       { get; set; } // date
		/// <summary>
		/// ?????????? ?? ?????, ?????? ???????????
		/// </summary>
		[Column("print_prepare_and_sign"), Nullable            ] public DateTime? PrintPrepareAndSign { get; set; } // date
		/// <summary>
		/// ???? ??????
		/// </summary>
		[Column("printing_news_paper"),    Nullable            ] public DateTime? PrintingNewsPaper   { get; set; } // date
		/// <summary>
		/// ???????? ??????
		/// </summary>
		[Column("delivery_news_paper"),    Nullable            ] public DateTime? DeliveryNewsPaper   { get; set; } // date
		[Column("qty_pages"),              Nullable            ] public int?      QtyPages            { get; set; } // int
		[Column("ps"),                     Nullable            ] public int?      Ps                  { get; set; } // int

		#region Associations

		/// <summary>
		/// FK_pages_papers_BackReference
		/// </summary>
		[Association(ThisKey="PaperId", OtherKey="PaperId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<Page> pagespapers { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="otds")]
	public partial class Otd
	{
		[Column("Otd_id"), PrimaryKey,  NotNull] public long   OtdId { get; set; } // bigint
		[Column(),            Nullable         ] public string Name  { get; set; } // nvarchar(50)

		#region Associations

		/// <summary>
		/// FK_departs_otds_BackReference
		/// </summary>
		[Association(ThisKey="OtdId", OtherKey="OtdId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<Depart> departs { get; set; }

		/// <summary>
		/// FK__users__otd_id__17F790F9_BackReference
		/// </summary>
		[Association(ThisKey="OtdId", OtherKey="OtdId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<User> usersotdid17F790F { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="pages")]
	public partial class Page
	{
		[Column("page_id"),  PrimaryKey, Identity] public long  PageId  { get; set; } // bigint
		[Column("paper_id"), Nullable            ] public long? PaperId { get; set; } // bigint

		#region Associations

		/// <summary>
		/// FK_cells_pages_BackReference
		/// </summary>
		[Association(ThisKey="PageId", OtherKey="PageId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<Cell> cells { get; set; }

		/// <summary>
		/// FK_pages_papers
		/// </summary>
		[Association(ThisKey="PaperId", OtherKey="PaperId", CanBeNull=true, Relationship=Relationship.ManyToOne, KeyName="FK_pages_papers", BackReferenceName="pagespapers")]
		public Npaper paper { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="requests")]
	public partial class Request
	{
		[Column("id"),      Identity] public long   Id             { get; set; } // bigint
		[Column("request"), Nullable] public string Request_Column { get; set; } // nvarchar(4000)
	}

	[Table(Schema="dbo", Name="tokens")]
	public partial class Token
	{
		[Column("token_id"), PrimaryKey,  Identity] public long     TokenId { get; set; } // bigint
		[Column("user_id"),  NotNull              ] public long     UserId  { get; set; } // bigint
		[Column("value"),       Nullable          ] public string   Value   { get; set; } // nvarchar(50)
		[Column("created"),  NotNull              ] public DateTime Created { get; set; } // datetime

		#region Associations

		/// <summary>
		/// FK_tokens_ToTable
		/// </summary>
		[Association(ThisKey="UserId", OtherKey="UserId", CanBeNull=false, Relationship=Relationship.ManyToOne, KeyName="FK_tokens_ToTable", BackReferenceName="tokensToTables")]
		public User ToTable { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="users")]
	public partial class User
	{
		[Column("user_id"),   PrimaryKey,  Identity] public long   UserId   { get; set; } // bigint
		[Column("ps"),           Nullable          ] public int?   Ps       { get; set; } // int
		[Column("name1"),        Nullable          ] public string Name1    { get; set; } // nvarchar(50)
		[Column("name2"),        Nullable          ] public string Name2    { get; set; } // nvarchar(50)
		[Column("name3"),        Nullable          ] public string Name3    { get; set; } // nvarchar(50)
		[Column("login"),     NotNull              ] public string Login    { get; set; } // nvarchar(50)
		[Column("otd_id"),       Nullable          ] public long?  OtdId    { get; set; } // bigint
		[Column("access_id"),    Nullable          ] public long?  AccessId { get; set; } // bigint
		[Column("password"),     Nullable          ] public Guid?  Password { get; set; } // uniqueidentifier
		[Column("deleted"),   NotNull              ] public bool   Deleted  { get; set; } // bit

		#region Associations

		/// <summary>
		/// FK__users__access_id__18EBB532
		/// </summary>
		[Association(ThisKey="AccessId", OtherKey="AccessId", CanBeNull=true, Relationship=Relationship.ManyToOne, KeyName="FK__users__access_id__18EBB532", BackReferenceName="usersid18EBB")]
		public Access accessid18EBB { get; set; }

		/// <summary>
		/// FK__users__otd_id__17F790F9
		/// </summary>
		[Association(ThisKey="OtdId", OtherKey="OtdId", CanBeNull=true, Relationship=Relationship.ManyToOne, KeyName="FK__users__otd_id__17F790F9", BackReferenceName="usersotdid17F790F")]
		public Otd otdid17F790F { get; set; }

		/// <summary>
		/// FK_tokens_ToTable_BackReference
		/// </summary>
		[Association(ThisKey="UserId", OtherKey="UserId", CanBeNull=true, Relationship=Relationship.OneToMany, IsBackReference=true)]
		public IEnumerable<Token> tokensToTables { get; set; }

		#endregion
	}

	[Table(Schema="dbo", Name="v_goods_template", IsView=true)]
	public partial class VGoodsTemplate
	{
		[Column("number"),     Nullable] public long?  Number    { get; set; } // bigint
		[Column("goodtmp_id"), Identity] public long   GoodtmpId { get; set; } // bigint
		[Column("name"),       Nullable] public string Name      { get; set; } // nvarchar(255)
		[Column("keywords"),   Nullable] public string Keywords  { get; set; } // nvarchar(50)
		[Column("size_id"),    Nullable] public long?  SizeId    { get; set; } // bigint
	}

	[Table(Schema="dbo", Name="v_users", IsView=true)]
	public partial class VUsers
	{
		[Column("number"),       Nullable] public long?  Number   { get; set; } // bigint
		[Column("user_id"),   Identity   ] public long   UserId   { get; set; } // bigint
		[Column("ps"),           Nullable] public int?   Ps       { get; set; } // int
		[Column("name1"),        Nullable] public string Name1    { get; set; } // nvarchar(50)
		[Column("name2"),        Nullable] public string Name2    { get; set; } // nvarchar(50)
		[Column("name3"),        Nullable] public string Name3    { get; set; } // nvarchar(50)
		[Column("login"),     NotNull    ] public string Login    { get; set; } // nvarchar(50)
		[Column("otd_id"),       Nullable] public long?  OtdId    { get; set; } // bigint
		[Column("access_id"),    Nullable] public long?  AccessId { get; set; } // bigint
		[Column("password"),     Nullable] public Guid?  Password { get; set; } // uniqueidentifier
		[Column("deleted"),   NotNull    ] public bool   Deleted  { get; set; } // bit
	}

	public static partial class PapersDevelopDBStoredProcedures
	{
		#region SpCreatediagram

		public static int SpCreatediagram(this DataConnection dataConnection, string @diagramname, int? @owner_id, int? @version, byte[] @definition)
		{
			return dataConnection.ExecuteProc("[dbo].[sp_creatediagram]",
				new DataParameter("@diagramname", @diagramname, DataType.NVarChar),
				new DataParameter("@owner_id",    @owner_id,    DataType.Int32),
				new DataParameter("@version",     @version,     DataType.Int32),
				new DataParameter("@definition",  @definition,  DataType.VarBinary));
		}

		#endregion

		#region SpDropdiagram

		public static int SpDropdiagram(this DataConnection dataConnection, string @diagramname, int? @owner_id)
		{
			return dataConnection.ExecuteProc("[dbo].[sp_dropdiagram]",
				new DataParameter("@diagramname", @diagramname, DataType.NVarChar),
				new DataParameter("@owner_id",    @owner_id,    DataType.Int32));
		}

		#endregion

		#region SpHelpdiagrams

		public static IEnumerable<SpHelpdiagramsResult> SpHelpdiagrams(this DataConnection dataConnection, string @diagramname, int? @owner_id)
		{
			return dataConnection.QueryProc<SpHelpdiagramsResult>("[dbo].[sp_helpdiagrams]",
				new DataParameter("@diagramname", @diagramname, DataType.NVarChar),
				new DataParameter("@owner_id",    @owner_id,    DataType.Int32));
		}

		public partial class SpHelpdiagramsResult
		{
			public string Database { get; set; }
			public string Name     { get; set; }
			public int    ID       { get; set; }
			public string Owner    { get; set; }
			public int    OwnerID  { get; set; }
		}

		#endregion

		#region SpUpgraddiagrams

		public static int SpUpgraddiagrams(this DataConnection dataConnection)
		{
			return dataConnection.ExecuteProc("[dbo].[sp_upgraddiagrams]");
		}

		#endregion
	}

	public static partial class SqlFunctions
	{
		#region FGetDepartNameById

		[Sql.Function(Name="dbo.F_GetDepartNameById", ServerSideOnly=true)]
		public static string FGetDepartNameById(long? @otd_id)
		{
			throw new InvalidOperationException();
		}

		#endregion

		#region FGetOtdNameById

		[Sql.Function(Name="dbo.F_GetOtdNameById", ServerSideOnly=true)]
		public static string FGetOtdNameById(long? @otd_id)
		{
			throw new InvalidOperationException();
		}

		#endregion

		#region FnDiagramobjects

		[Sql.Function(Name="dbo.fn_diagramobjects", ServerSideOnly=true)]
		public static int? FnDiagramobjects()
		{
			throw new InvalidOperationException();
		}

		#endregion
	}

	public static partial class TableExtensions
	{
		public static Access Find(this ITable<Access> table, long AccessId)
		{
			return table.FirstOrDefault(t =>
				t.AccessId == AccessId);
		}

		public static Cell Find(this ITable<Cell> table, long GlobalCellId)
		{
			return table.FirstOrDefault(t =>
				t.GlobalCellId == GlobalCellId);
		}

		public static Depart Find(this ITable<Depart> table, long DepartId)
		{
			return table.FirstOrDefault(t =>
				t.DepartId == DepartId);
		}

		public static GoodsSizes Find(this ITable<GoodsSizes> table, long SizeId)
		{
			return table.FirstOrDefault(t =>
				t.SizeId == SizeId);
		}

		public static GoodsTemplate Find(this ITable<GoodsTemplate> table, long GoodtmpId)
		{
			return table.FirstOrDefault(t =>
				t.GoodtmpId == GoodtmpId);
		}

		public static Npaper Find(this ITable<Npaper> table, long PaperId)
		{
			return table.FirstOrDefault(t =>
				t.PaperId == PaperId);
		}

		public static Otd Find(this ITable<Otd> table, long OtdId)
		{
			return table.FirstOrDefault(t =>
				t.OtdId == OtdId);
		}

		public static Page Find(this ITable<Page> table, long PageId)
		{
			return table.FirstOrDefault(t =>
				t.PageId == PageId);
		}

		public static Token Find(this ITable<Token> table, long TokenId)
		{
			return table.FirstOrDefault(t =>
				t.TokenId == TokenId);
		}

		public static User Find(this ITable<User> table, long UserId)
		{
			return table.FirstOrDefault(t =>
				t.UserId == UserId);
		}
	}
}
