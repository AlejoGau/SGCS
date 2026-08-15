
    using System;
    using System.Xml;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using Slbf;
    using Slbf.Helpers;
  
    namespace SoftGuard.BusinessObjects
    {
     ///<summary>
     ///Product data access layer   
     ///</summary>
    public class DalProduct : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _SmallComment;
    
      private string _LargeComment;
    
      private string _Body;
    
      private string _Available;
    
      private Decimal _Price;
    
      private string _Structure;
    
      private int _Weight;
    
      private string _MetaDescription;
    
      private string _MetaKeywords;
    
      private string _Status;
    
      private int _AttachId;
    
      private string _Code;
    
      private Decimal _VAT;
    
      private Decimal _Cost;
    
      private string _MeasureUnit;
    
      private int _pro_iidorganizacion;
    
      private int _pro_itipo;
    
      private string _pro_currency;
    
      private int _pro_cantidad_auto;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///SmallComment   
     ///</summary>
      public string SmallComment
      {
      
          get{ return this._SmallComment; }
          set{ this._SmallComment = value; }
        
      }
     ///<summary>
     ///LargeComment   
     ///</summary>
      public string LargeComment
      {
      
          get{ return this._LargeComment; }
          set{ this._LargeComment = value; }
        
      }
     ///<summary>
     ///Body   
     ///</summary>
      public string Body
      {
      
          get{ return this._Body; }
          set{ this._Body = value; }
        
      }
     ///<summary>
     ///Available   
     ///</summary>
      public string Available
      {
      
          get{ return this._Available; }
          set{ this._Available = value; }
        
      }
     ///<summary>
     ///Price   
     ///</summary>
      public Decimal Price
      {
      
          get{ return this._Price; }
          set{ this._Price = value; }
        
      }
     ///<summary>
     ///Structure   
     ///</summary>
      public string Structure
      {
      
          get{ return this._Structure; }
          set{ this._Structure = value; }
        
      }
     ///<summary>
     ///Weight   
     ///</summary>
      public int Weight
      {
      
          get{ return this._Weight; }
          set{ this._Weight = value; }
        
      }
     ///<summary>
     ///MetaDescription   
     ///</summary>
      public string MetaDescription
      {
      
          get{ return this._MetaDescription; }
          set{ this._MetaDescription = value; }
        
      }
     ///<summary>
     ///MetaKeywords   
     ///</summary>
      public string MetaKeywords
      {
      
          get{ return this._MetaKeywords; }
          set{ this._MetaKeywords = value; }
        
      }
     ///<summary>
     ///Status   
     ///</summary>
      public string Status
      {
      
          get{ return this._Status; }
          set{ this._Status = value; }
        
      }
     ///<summary>
     ///AttachId   
     ///</summary>
      public int AttachId
      {
      
          get{ return this._AttachId; }
          set{ this._AttachId = value; }
        
      }
     ///<summary>
     ///Code   
     ///</summary>
      public string Code
      {
      
          get{ return this._Code; }
          set{ this._Code = value; }
        
      }
     ///<summary>
     ///VAT   
     ///</summary>
      public Decimal VAT
      {
      
          get{ return this._VAT; }
          set{ this._VAT = value; }
        
      }
     ///<summary>
     ///Cost   
     ///</summary>
      public Decimal Cost
      {
      
          get{ return this._Cost; }
          set{ this._Cost = value; }
        
      }
     ///<summary>
     ///MeasureUnit   
     ///</summary>
      public string MeasureUnit
      {
      
          get{ return this._MeasureUnit; }
          set{ this._MeasureUnit = value; }
        
      }
     ///<summary>
     ///pro_iidorganizacion   
     ///</summary>
      public int pro_iidorganizacion
      {
      
          get{ return this._pro_iidorganizacion; }
          set{ this._pro_iidorganizacion = value; }
        
      }
     ///<summary>
     ///pro_itipo   
     ///</summary>
      public int pro_itipo
      {
      
          get{ return this._pro_itipo; }
          set{ this._pro_itipo = value; }
        
      }
     ///<summary>
     ///pro_currency   
     ///</summary>
      public string pro_currency
      {
      
          get{ return this._pro_currency; }
          set{ this._pro_currency = value; }
        
      }
     ///<summary>
     ///pro_cantidad_auto   
     ///</summary>
      public int pro_cantidad_auto
      {
      
          get{ return this._pro_cantidad_auto; }
          set{ this._pro_cantidad_auto = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalProduct(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalProduct(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalProduct(SqlHelper SqlConfig, int UserId, SimpleProduct Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._SmallComment = Simple.SmallComment;

      this._LargeComment = Simple.LargeComment;

      this._Body = Simple.Body;

      this._Available = Simple.Available;

      this._Price = Simple.Price;

      this._Structure = Simple.Structure;

      this._Weight = Simple.Weight;

      this._MetaDescription = Simple.MetaDescription;

      this._MetaKeywords = Simple.MetaKeywords;

      this._Status = Simple.Status;

      this._AttachId = Simple.AttachId;

      this._Code = Simple.Code;

      this._VAT = Simple.VAT;

      this._Cost = Simple.Cost;

      this._MeasureUnit = Simple.MeasureUnit;

      this._pro_iidorganizacion = Simple.pro_iidorganizacion;

      this._pro_itipo = Simple.pro_itipo;

      this._pro_currency = Simple.pro_currency;

      this._pro_cantidad_auto = Simple.pro_cantidad_auto;

    }

   ///<summary>
     ///Transaction   
     ///</summary>
    public override void BeginTran()
    {
    }
     ///<summary>
     ///Transaction   
     ///</summary>
    public override void CommitTran()
    {
    }
     ///<summary>
     ///Transaction   
     ///</summary>
    public override void RollbackTran()
    {
    }
     ///<summary>
     ///Transaction   
     ///</summary>
    public override void EndTran()
    {

    }
     ///<summary>
     ///Saves object data   
     ///</summary>
    public override void Save()
    {
    base.Save();

    BeginTran();
    try{
    if(base.Id == 0)
    {
    //new
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("ProductIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@SmallComment", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@LargeComment", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Body", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@Available", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Structure", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Weight", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@MetaDescription", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@MetaKeywords", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Status", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@AttachId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Code", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@VAT", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@MeasureUnit", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@pro_iidorganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pro_itipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pro_currency", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@pro_cantidad_auto", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@SmallComment"].Value = (this._SmallComment == null) ? (object) DBNull.Value : (object) this._SmallComment;

		cmd.Parameters["@LargeComment"].Value = (this._LargeComment == null) ? (object) DBNull.Value : (object) this._LargeComment;

		cmd.Parameters["@Body"].Value = (this._Body == null) ? (object) DBNull.Value : (object) this._Body;

		cmd.Parameters["@Available"].Value = (this._Available == null) ? (object) DBNull.Value : (object) this._Available;

		cmd.Parameters["@Price"].Value = this._Price;

		cmd.Parameters["@Structure"].Value = (this._Structure == null) ? (object) DBNull.Value : (object) this._Structure;

		cmd.Parameters["@Weight"].Value = this._Weight;

		cmd.Parameters["@MetaDescription"].Value = (this._MetaDescription == null) ? (object) DBNull.Value : (object) this._MetaDescription;

		cmd.Parameters["@MetaKeywords"].Value = (this._MetaKeywords == null) ? (object) DBNull.Value : (object) this._MetaKeywords;

		cmd.Parameters["@Status"].Value = (this._Status == null) ? (object) DBNull.Value : (object) this._Status;

		cmd.Parameters["@AttachId"].Value = this._AttachId;

		cmd.Parameters["@Code"].Value = (this._Code == null) ? (object) DBNull.Value : (object) this._Code;

		cmd.Parameters["@VAT"].Value = this._VAT;

		cmd.Parameters["@Cost"].Value = this._Cost;

		cmd.Parameters["@MeasureUnit"].Value = (this._MeasureUnit == null) ? (object) DBNull.Value : (object) this._MeasureUnit;

		cmd.Parameters["@pro_iidorganizacion"].Value = this._pro_iidorganizacion;

		cmd.Parameters["@pro_itipo"].Value = this._pro_itipo;

		cmd.Parameters["@pro_currency"].Value = (this._pro_currency == null) ? (object) DBNull.Value : (object) this._pro_currency;

		cmd.Parameters["@pro_cantidad_auto"].Value = this._pro_cantidad_auto;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("ProductUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@SmallComment", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@LargeComment", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Body", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@Available", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Structure", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Weight", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@MetaDescription", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@MetaKeywords", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Status", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@AttachId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Code", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@VAT", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@MeasureUnit", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@pro_iidorganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pro_itipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pro_currency", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@pro_cantidad_auto", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@SmallComment"].Value = (this._SmallComment == null) ? (object) DBNull.Value : (object) this._SmallComment;

		cmd.Parameters["@LargeComment"].Value = (this._LargeComment == null) ? (object) DBNull.Value : (object) this._LargeComment;

		cmd.Parameters["@Body"].Value = (this._Body == null) ? (object) DBNull.Value : (object) this._Body;

		cmd.Parameters["@Available"].Value = (this._Available == null) ? (object) DBNull.Value : (object) this._Available;

		cmd.Parameters["@Price"].Value = this._Price;

		cmd.Parameters["@Structure"].Value = (this._Structure == null) ? (object) DBNull.Value : (object) this._Structure;

		cmd.Parameters["@Weight"].Value = this._Weight;

		cmd.Parameters["@MetaDescription"].Value = (this._MetaDescription == null) ? (object) DBNull.Value : (object) this._MetaDescription;

		cmd.Parameters["@MetaKeywords"].Value = (this._MetaKeywords == null) ? (object) DBNull.Value : (object) this._MetaKeywords;

		cmd.Parameters["@Status"].Value = (this._Status == null) ? (object) DBNull.Value : (object) this._Status;

		cmd.Parameters["@AttachId"].Value = this._AttachId;

		cmd.Parameters["@Code"].Value = (this._Code == null) ? (object) DBNull.Value : (object) this._Code;

		cmd.Parameters["@VAT"].Value = this._VAT;

		cmd.Parameters["@Cost"].Value = this._Cost;

		cmd.Parameters["@MeasureUnit"].Value = (this._MeasureUnit == null) ? (object) DBNull.Value : (object) this._MeasureUnit;

		cmd.Parameters["@pro_iidorganizacion"].Value = this._pro_iidorganizacion;

		cmd.Parameters["@pro_itipo"].Value = this._pro_itipo;

		cmd.Parameters["@pro_currency"].Value = (this._pro_currency == null) ? (object) DBNull.Value : (object) this._pro_currency;

		cmd.Parameters["@pro_cantidad_auto"].Value = this._pro_cantidad_auto;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    }
    finally{
    EndTran();
    }
    }
   ///<summary>
     ///Deletes object   
     ///</summary>
    public override void Delete()
    {
    base.Delete();
    if(base.Id == 0)
    {
    throw new RuntimeException("The Product is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("ProductDel", conn))
    {
    CmdDel.CommandType = CommandType.StoredProcedure;
    CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdDel.Parameters["@Id"].Value = base.Id;
    conn.Open();
    CmdDel.ExecuteNonQuery();
    }

    }
    finally
    {
    EndTran();
    }
    }
    }
   ///<summary>
     ///Load object data   
     ///</summary>
    public virtual void Load(int Id)
    {
    //base.Load();
    base.Load(Id); // esto es para la auditoria

    // Select
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdSel = new SqlCommand("ProductSel", conn))
    {
    CmdSel.CommandType = CommandType.StoredProcedure;
    CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));

    conn.Open();
    CmdSel.Parameters["@Id"].Value = Id;
    FillObject(CmdSel.ExecuteReader());

    //save original object
    this.OriginalObject = this.GetSimpleObject();
    }
    }
   ///<summary>
     ///Gets baseobject   
     ///</summary>
    public override BaseObject GetObject()
    {
    return (BaseObject) this;
    }
   ///<summary>
     ///Gets SimpleBaseObject   
     ///</summary>
    public override SimpleBaseObject GetSimpleObject()
    {
    SimpleProduct Simple = new SimpleProduct();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.SmallComment = this._SmallComment;

      Simple.LargeComment = this._LargeComment;

      Simple.Body = this._Body;

      Simple.Available = this._Available;

      Simple.Price = this._Price;

      Simple.Structure = this._Structure;

      Simple.Weight = this._Weight;

      Simple.MetaDescription = this._MetaDescription;

      Simple.MetaKeywords = this._MetaKeywords;

      Simple.Status = this._Status;

      Simple.AttachId = this._AttachId;

      Simple.Code = this._Code;

      Simple.VAT = this._VAT;

      Simple.Cost = this._Cost;

      Simple.MeasureUnit = this._MeasureUnit;

      Simple.pro_iidorganizacion = this._pro_iidorganizacion;

      Simple.pro_itipo = this._pro_itipo;

      Simple.pro_currency = this._pro_currency;

      Simple.pro_cantidad_auto = this._pro_cantidad_auto;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleProduct)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._SmallComment = Simple.SmallComment;

      this._LargeComment = Simple.LargeComment;

      this._Body = Simple.Body;

      this._Available = Simple.Available;

      this._Price = Simple.Price;

      this._Structure = Simple.Structure;

      this._Weight = Simple.Weight;

      this._MetaDescription = Simple.MetaDescription;

      this._MetaKeywords = Simple.MetaKeywords;

      this._Status = Simple.Status;

      this._AttachId = Simple.AttachId;

      this._Code = Simple.Code;

      this._VAT = Simple.VAT;

      this._Cost = Simple.Cost;

      this._MeasureUnit = Simple.MeasureUnit;

      this._pro_iidorganizacion = Simple.pro_iidorganizacion;

      this._pro_itipo = Simple.pro_itipo;

      this._pro_currency = Simple.pro_currency;

      this._pro_cantidad_auto = Simple.pro_cantidad_auto;

    if(Simple.CallerObject != null)
    this.CallerObject = Simple.CallerObject;

    //Save original Object
    this.OriginalObject = this.GetSimpleObject();
    }
   ///<summary>
     ///Gets caller object   
     ///</summary>
    public override CallerObject GetCallerObject()
    {
    CallerProduct Caller = new CallerProduct();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.SmallComment = this._SmallComment;

      Caller.LargeComment = this._LargeComment;

      Caller.Body = this._Body;

      Caller.Available = this._Available;

      Caller.Price = this._Price;

      Caller.Structure = this._Structure;

      Caller.Weight = this._Weight;

      Caller.MetaDescription = this._MetaDescription;

      Caller.MetaKeywords = this._MetaKeywords;

      Caller.Status = this._Status;

      Caller.AttachId = this._AttachId;

      Caller.Code = this._Code;

      Caller.VAT = this._VAT;

      Caller.Cost = this._Cost;

      Caller.MeasureUnit = this._MeasureUnit;

      Caller.pro_iidorganizacion = this._pro_iidorganizacion;

      Caller.pro_itipo = this._pro_itipo;

      Caller.pro_currency = this._pro_currency;

      Caller.pro_cantidad_auto = this._pro_cantidad_auto;

    return (CallerObject) Caller;
    }
   ///<summary>
     ///Gets a datatable with object data   
     ///</summary>
    public override DataTable GetDataObject()
    {
    //create Table
    DataTable dt = new DataTable("Data");
    DataRow dr;

    dt.Columns.Add(new DataColumn("Id", typeof(int)));
    dt.Columns.Add(new DataColumn("Name", typeof(string)));
    
      dt.Columns.Add(new DataColumn("SmallComment", typeof (string)));
    
      dt.Columns.Add(new DataColumn("LargeComment", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Body", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Available", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Price", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("Structure", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Weight", typeof (int)));
    
      dt.Columns.Add(new DataColumn("MetaDescription", typeof (string)));
    
      dt.Columns.Add(new DataColumn("MetaKeywords", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Status", typeof (string)));
    
      dt.Columns.Add(new DataColumn("AttachId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("Code", typeof (string)));
    
      dt.Columns.Add(new DataColumn("VAT", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("Cost", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("MeasureUnit", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pro_iidorganizacion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pro_itipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pro_currency", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pro_cantidad_auto", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["SmallComment"] = this._SmallComment;

      dr["LargeComment"] = this._LargeComment;

      dr["Body"] = this._Body;

      dr["Available"] = this._Available;

      dr["Price"] = this._Price;

      dr["Structure"] = this._Structure;

      dr["Weight"] = this._Weight;

      dr["MetaDescription"] = this._MetaDescription;

      dr["MetaKeywords"] = this._MetaKeywords;

      dr["Status"] = this._Status;

      dr["AttachId"] = this._AttachId;

      dr["Code"] = this._Code;

      dr["VAT"] = this._VAT;

      dr["Cost"] = this._Cost;

      dr["MeasureUnit"] = this._MeasureUnit;

      dr["pro_iidorganizacion"] = this._pro_iidorganizacion;

      dr["pro_itipo"] = this._pro_itipo;

      dr["pro_currency"] = this._pro_currency;

      dr["pro_cantidad_auto"] = this._pro_cantidad_auto;

    //Insert Row in Table
    dt.Rows.Add(dr);

    return dt;

    }
   ///<summary>
     ///Gets xml representation of object   
     ///</summary>
    public override XmlDataDocument GetXmlObject()
    {
    DataSet ds = new DataSet("Object");
    ds.EnforceConstraints = false;

    ds.Tables.Add(GetDataObject().Copy());
    ds.Tables.Add(this.Type.GetDataObject().Copy());

    if(this.CallerObject != null)
    ds.Tables.Add(this.CallerObject.GetDataObject().Copy());

    XmlDataDocument XmlDoc = new XmlDataDocument(ds);

    if(this.Dependencies.Count != 0)
    XmlDoc.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;

    return XmlDoc;
    }
   ///<summary>
     ///Gets children of object   
     ///</summary>
    public DataTable GetDataChildsByObject(SimpleBaseObject Object)
    {
    base.Load();
    DataTable Data = new DataTable("Childs");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("ProductByChildObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdChilds))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));

    CmdChilds.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdChilds.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    Adapter.Fill(Data);
    conn.Close();

    return Data;
    }
    }
     ///<summary>
     ///Gets a collection of children object   
     ///</summary>
    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
    {
    base.Load();
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    SimpleProduct Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("ProductByChildObject", conn))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdChilds.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdChilds.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdChilds.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new SimpleProduct();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.SmallComment = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.LargeComment = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Body = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Available = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Price = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.Structure = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Weight = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.MetaDescription = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.MetaKeywords = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.Status = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.AttachId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.Code = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.VAT = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.Cost = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.MeasureUnit = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pro_iidorganizacion = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pro_itipo = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.pro_currency = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.pro_cantidad_auto = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);


    Simple.CallerObject = Object.GetCallerObject();
    Simple.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, Simple);

    Collection.Add(Simple);
    }
    conn.Close();
    }

    return Collection;
    }
    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
    {
    base.Load();
    SimpleProduct Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleProduct();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.SmallComment = (Row["SmallComment"] == DBNull.Value) ? "" : (string) Row["SmallComment"];

Simple.LargeComment = (Row["LargeComment"] == DBNull.Value) ? "" : (string) Row["LargeComment"];

Simple.Body = (Row["Body"] == DBNull.Value) ? "" : (string) Row["Body"];

Simple.Available = (Row["Available"] == DBNull.Value) ? "" : (string) Row["Available"];

Simple.Price = (Row["Price"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["Price"];

Simple.Structure = (Row["Structure"] == DBNull.Value) ? "" : (string) Row["Structure"];

Simple.Weight = (Row["Weight"] == DBNull.Value) ? 0 : (int) Row["Weight"];

Simple.MetaDescription = (Row["MetaDescription"] == DBNull.Value) ? "" : (string) Row["MetaDescription"];

Simple.MetaKeywords = (Row["MetaKeywords"] == DBNull.Value) ? "" : (string) Row["MetaKeywords"];

Simple.Status = (Row["Status"] == DBNull.Value) ? "" : (string) Row["Status"];

Simple.AttachId = (Row["AttachId"] == DBNull.Value) ? 0 : (int) Row["AttachId"];

Simple.Code = (Row["Code"] == DBNull.Value) ? "" : (string) Row["Code"];

Simple.VAT = (Row["VAT"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["VAT"];

Simple.Cost = (Row["Cost"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["Cost"];

Simple.MeasureUnit = (Row["MeasureUnit"] == DBNull.Value) ? "" : (string) Row["MeasureUnit"];

Simple.pro_iidorganizacion = (Row["pro_iidorganizacion"] == DBNull.Value) ? 0 : (int) Row["pro_iidorganizacion"];

Simple.pro_itipo = (Row["pro_itipo"] == DBNull.Value) ? 0 : (int) Row["pro_itipo"];

Simple.pro_currency = (Row["pro_currency"] == DBNull.Value) ? "" : (string) Row["pro_currency"];

Simple.pro_cantidad_auto = (Row["pro_cantidad_auto"] == DBNull.Value) ? 0 : (int) Row["pro_cantidad_auto"];


    Simple.CallerObject = Object.GetCallerObject();
    Simple.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, Simple);

    if(Recursive)
    Simple.Dependencies = GetChildsByObject(Simple, Recursive);

    Collection.Add(Simple);
    }
    return Collection;
    }
   ///<summary>
     ///Gets all parents   
     ///</summary>
    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
    base.Load();
    DataTable Data = new DataTable("Parents");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("ProductByParentObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdParents))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));

    CmdParents.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdParents.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    Adapter.Fill(Data);
    conn.Close();

    return Data;
    }
    }
     ///<summary>
     ///Gets a collection of parents   
     ///</summary>
    public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
    {
    base.Load();
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    SimpleProduct Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("ProductByParentObject", conn))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdParents.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdParents.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdParents.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new SimpleProduct();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.SmallComment = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.LargeComment = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Body = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Available = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Price = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.Structure = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Weight = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.MetaDescription = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.MetaKeywords = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.Status = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.AttachId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.Code = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.VAT = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.Cost = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.MeasureUnit = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pro_iidorganizacion = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pro_itipo = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.pro_currency = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.pro_cantidad_auto = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);


    Simple.CallerObject = Object.GetCallerObject();
    Simple.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, Simple);

    Collection.Add(Simple);
    }
    return Collection;
    }
    }
   ///<summary>
     ///Searchs objects using Name   
     ///</summary>
    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    return GetDataByName(Name, Taxonomies, PageCount, PagePresent, "Id", ref PageTotal, ref RowTotal);
    }

     ///<summary>
     ///Searchs objects using Name   
     ///</summary>
    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");

    using (var conn = new SqlConnection(_ConnectionString))
    using (var CmdDataByName = new SqlCommand("ProductByName", conn))
    using (var Adapter = new SqlDataAdapter(CmdDataByName))
    {
    // Search By Name
    CmdDataByName.CommandType = CommandType.StoredProcedure;
    CmdDataByName.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
    CmdDataByName.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByName.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByName.Parameters["@Name"].Value = Name;
    CmdDataByName.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    CmdDataByName.Parameters["@PageCount"].Value = PageCount;
    CmdDataByName.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByName.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByName.Parameters["@RowTotal"].Value = RowTotal;
    CmdDataByName.Parameters["@OrderBy"].Value = OrderBy;


    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByName.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByName.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByName.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByName.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
     ///<summary>
     ///Gets object by name including its children   
     ///</summary>
    public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDataByNameWithChild = new SqlCommand("ProductByNameWithChild", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithChild))
    {
    // Search By Name Whit Child
    CmdDataByNameWithChild.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByNameWithChild.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByNameWithChild.Parameters["@Name"].Value = Name;
    CmdDataByNameWithChild.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();

    CmdDataByNameWithChild.Parameters["@ObjectType"].Value = FilterChildObject.Type.Name ;
    CmdDataByNameWithChild.Parameters["@ObjectId"].Value = FilterChildObject.Id ;

    CmdDataByNameWithChild.Parameters["@PageCount"].Value = PageCount;
    CmdDataByNameWithChild.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByNameWithChild.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByNameWithChild.Parameters["@RowTotal"].Value = RowTotal;


    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByNameWithChild.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByNameWithChild.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByNameWithChild.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByNameWithChild.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
     ///<summary>
     ///Gets object data with parent   
     ///</summary>
    public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDataByNameWithParent = new SqlCommand("ProductByNameWithParent", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithParent))
    {
    // Search By Name Whit Parent
    CmdDataByNameWithParent.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByNameWithParent.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByNameWithParent.Parameters["@Name"].Value = Name;
    CmdDataByNameWithParent.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();

    CmdDataByNameWithParent.Parameters["@ObjectType"].Value = FilterParentObject.Type.Name ;
    CmdDataByNameWithParent.Parameters["@ObjectId"].Value = FilterParentObject.Id ;

    CmdDataByNameWithParent.Parameters["@PageCount"].Value = PageCount;
    CmdDataByNameWithParent.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByNameWithParent.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByNameWithParent.Parameters["@RowTotal"].Value = RowTotal;

    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByNameWithParent.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByNameWithParent.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByNameWithParent.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByNameWithParent.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }

    public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
    {
    base.Load();

    DataTable Data = new DataTable("Object");
    using( var conn = new SqlConnection(_ConnectionString))
    using (var cmd = new SqlCommand("ProductByFilter", conn))
    using (var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.AddWithValue("@page", Page);
    cmd.Parameters.AddWithValue("@start", Start);
    cmd.Parameters.AddWithValue("@limit", Limit);
    cmd.Parameters.AddWithValue("@sort", Sort);
    cmd.Parameters.AddWithValue("@group", Group);
    cmd.Parameters.AddWithValue("@filter", Filter);
    cmd.Parameters.Add("@totalrows", SqlDbType.Int).Direction = ParameterDirection.Output;

    Adapter.Fill(Data);
    var v = cmd.Parameters["@totalrows"].Value;
    if (v != null && v != DBNull.Value)
    TotalRows = (int)v;
    }
    return Data;
    }

     ///<summary>
     ///Gets objects using text   
     ///</summary>
    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    DataTable Data = new DataTable("Object");
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDataByText = new SqlCommand("ProductByText", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByText))
    {

    CmdDataByText.CommandType = CommandType.StoredProcedure;
    CmdDataByText.Parameters.Add(new SqlParameter("@Text", SqlDbType.VarChar));
    CmdDataByText.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    CmdDataByText.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByText.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByText.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByText.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByText.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    CmdDataByText.Parameters["@RowTotal"].Direction = ParameterDirection.Output;

    CmdDataByText.Parameters["@Text"].Value = Text;
    CmdDataByText.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    CmdDataByText.Parameters["@PageCount"].Value = PageCount;
    CmdDataByText.Parameters["@PagePresent"].Value = PagePresent;
    CmdDataByText.Parameters["@PageTotal"].Value = PageTotal;
    CmdDataByText.Parameters["@RowTotal"].Value = RowTotal;

    conn.Open();
    Adapter.Fill(Data);

    if (CmdDataByText.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(CmdDataByText.Parameters["@PageTotal"].Value.ToString());

    if (CmdDataByText.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(CmdDataByText.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
     ///<summary>
     ///Load object using its simpleObject representation   
     ///</summary>
    public DataTable GetDataBySimpleObject(SimpleProduct Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("ProductBySimpleProduct", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@SmallComment", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@LargeComment", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Body", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@Available", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Structure", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Weight", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@MetaDescription", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@MetaKeywords", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@Status", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@AttachId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Code", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@VAT", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@MeasureUnit", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@pro_iidorganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pro_itipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pro_currency", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@pro_cantidad_auto", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@SmallComment"].Value = (this._SmallComment == null) ? (object) DBNull.Value : (object) this._SmallComment;

		cmd.Parameters["@LargeComment"].Value = (this._LargeComment == null) ? (object) DBNull.Value : (object) this._LargeComment;

		cmd.Parameters["@Body"].Value = (this._Body == null) ? (object) DBNull.Value : (object) this._Body;

		cmd.Parameters["@Available"].Value = (this._Available == null) ? (object) DBNull.Value : (object) this._Available;

		cmd.Parameters["@Price"].Value = this._Price;

		cmd.Parameters["@Structure"].Value = (this._Structure == null) ? (object) DBNull.Value : (object) this._Structure;

		cmd.Parameters["@Weight"].Value = this._Weight;

		cmd.Parameters["@MetaDescription"].Value = (this._MetaDescription == null) ? (object) DBNull.Value : (object) this._MetaDescription;

		cmd.Parameters["@MetaKeywords"].Value = (this._MetaKeywords == null) ? (object) DBNull.Value : (object) this._MetaKeywords;

		cmd.Parameters["@Status"].Value = (this._Status == null) ? (object) DBNull.Value : (object) this._Status;

		cmd.Parameters["@AttachId"].Value = this._AttachId;

		cmd.Parameters["@Code"].Value = (this._Code == null) ? (object) DBNull.Value : (object) this._Code;

		cmd.Parameters["@VAT"].Value = this._VAT;

		cmd.Parameters["@Cost"].Value = this._Cost;

		cmd.Parameters["@MeasureUnit"].Value = (this._MeasureUnit == null) ? (object) DBNull.Value : (object) this._MeasureUnit;

		cmd.Parameters["@pro_iidorganizacion"].Value = this._pro_iidorganizacion;

		cmd.Parameters["@pro_itipo"].Value = this._pro_itipo;

		cmd.Parameters["@pro_currency"].Value = (this._pro_currency == null) ? (object) DBNull.Value : (object) this._pro_currency;

		cmd.Parameters["@pro_cantidad_auto"].Value = this._pro_cantidad_auto;


    cmd.Parameters["@PageCount"].Value = PageCount;
    cmd.Parameters["@PagePresent"].Value = PagePresent;
    cmd.Parameters["@PageTotal"].Value = PageTotal;
    cmd.Parameters["@RowTotal"].Value = RowTotal;

    conn.Open();
    Adapter.Fill(Data);

    if (cmd.Parameters["@PageTotal"].Value != DBNull.Value)
    PageTotal = int.Parse(cmd.Parameters["@PageTotal"].Value.ToString());

    if (cmd.Parameters["@RowTotal"].Value != DBNull.Value)
    RowTotal = int.Parse(cmd.Parameters["@RowTotal"].Value.ToString());

    conn.Close();
    return Data;
    }
    }
   ///<summary>
     ///Get by child
     ///</summary>
		 
		public IEnumerable<SimpleProduct> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("ProductByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleProduct Simple = new SimpleProduct();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.SmallComment = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.LargeComment = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Body = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Available = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Price = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.Structure = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Weight = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.MetaDescription = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.MetaKeywords = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.Status = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.AttachId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.Code = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.VAT = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.Cost = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.MeasureUnit = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pro_iidorganizacion = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pro_itipo = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.pro_currency = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.pro_cantidad_auto = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleProduct> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("ProductByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleProduct Simple = new SimpleProduct();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.SmallComment = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.LargeComment = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Body = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Available = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Price = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.Structure = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.Weight = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.MetaDescription = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.MetaKeywords = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.Status = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.AttachId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.Code = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.VAT = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.Cost = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.MeasureUnit = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pro_iidorganizacion = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pro_itipo = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.pro_currency = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.pro_cantidad_auto = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(403, "Product");
    }
  
    private void SetConfig(SqlHelper SqlConfig)
    {
    //Connection
    _ConnectionString = SqlConfig.GetConnString();
    }
  
    private void FillObject(SqlDataReader Reader)
    {
    while(Reader.Read())
    {
    base.Id = Reader.GetInt32(0);
    base.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)this._SmallComment = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._LargeComment = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._Body = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._Available = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._Price = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)this._Structure = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._Weight = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._MetaDescription = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._MetaKeywords = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._Status = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._AttachId = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._Code = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._VAT = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)this._Cost = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)this._MeasureUnit = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._pro_iidorganizacion = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)this._pro_itipo = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)this._pro_currency = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)this._pro_cantidad_auto = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);

    }
    Reader.Close();
    }
   }
  
    }
  