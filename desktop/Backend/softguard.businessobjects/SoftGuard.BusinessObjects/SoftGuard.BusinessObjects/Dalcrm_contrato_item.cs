
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
     ///crm_contrato_item data access layer   
     ///</summary>
    public class Dalcrm_contrato_item : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _idcontrato;
    
      private Decimal _Price;
    
      private string _Currency;
    
      private string _Status;
    
      private string _Description;
    
      private int _Quantity;
    
      private int _QuantityDelivered;
    
      private string _Code;
    
      private Decimal _VAT;
    
      private int _ProductId;
    
      private int _idlista;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///idcontrato   
     ///</summary>
      public int idcontrato
      {
      
          get{ return this._idcontrato; }
          set{ this._idcontrato = value; }
        
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
     ///Currency   
     ///</summary>
      public string Currency
      {
      
          get{ return this._Currency; }
          set{ this._Currency = value; }
        
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
     ///Description   
     ///</summary>
      public string Description
      {
      
          get{ return this._Description; }
          set{ this._Description = value; }
        
      }
     ///<summary>
     ///Quantity   
     ///</summary>
      public int Quantity
      {
      
          get{ return this._Quantity; }
          set{ this._Quantity = value; }
        
      }
     ///<summary>
     ///QuantityDelivered   
     ///</summary>
      public int QuantityDelivered
      {
      
          get{ return this._QuantityDelivered; }
          set{ this._QuantityDelivered = value; }
        
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
     ///ProductId   
     ///</summary>
      public int ProductId
      {
      
          get{ return this._ProductId; }
          set{ this._ProductId = value; }
        
      }
     ///<summary>
     ///idlista   
     ///</summary>
      public int idlista
      {
      
          get{ return this._idlista; }
          set{ this._idlista = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalcrm_contrato_item(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalcrm_contrato_item(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalcrm_contrato_item(SqlHelper SqlConfig, int UserId, Simplecrm_contrato_item Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._idcontrato = Simple.idcontrato;

      this._Price = Simple.Price;

      this._Currency = Simple.Currency;

      this._Status = Simple.Status;

      this._Description = Simple.Description;

      this._Quantity = Simple.Quantity;

      this._QuantityDelivered = Simple.QuantityDelivered;

      this._Code = Simple.Code;

      this._VAT = Simple.VAT;

      this._ProductId = Simple.ProductId;

      this._idlista = Simple.idlista;

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
    using(var cmd = new SqlCommand("crm_contrato_itemIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@idcontrato", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Currency", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Status", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@QuantityDelivered", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VAT", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@ProductId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@idlista", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@idcontrato"].Value = this._idcontrato;

		cmd.Parameters["@Price"].Value = this._Price;

		cmd.Parameters["@Currency"].Value = (this._Currency == null) ? (object) DBNull.Value : (object) this._Currency;

		cmd.Parameters["@Status"].Value = (this._Status == null) ? (object) DBNull.Value : (object) this._Status;

		cmd.Parameters["@Description"].Value = (this._Description == null) ? (object) DBNull.Value : (object) this._Description;

		cmd.Parameters["@Quantity"].Value = this._Quantity;

		cmd.Parameters["@QuantityDelivered"].Value = this._QuantityDelivered;

		cmd.Parameters["@Code"].Value = (this._Code == null) ? (object) DBNull.Value : (object) this._Code;

		cmd.Parameters["@VAT"].Value = this._VAT;

		cmd.Parameters["@ProductId"].Value = this._ProductId;

		cmd.Parameters["@idlista"].Value = this._idlista;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("crm_contrato_itemUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@idcontrato", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Currency", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Status", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@QuantityDelivered", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VAT", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@ProductId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@idlista", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@idcontrato"].Value = this._idcontrato;

		cmd.Parameters["@Price"].Value = this._Price;

		cmd.Parameters["@Currency"].Value = (this._Currency == null) ? (object) DBNull.Value : (object) this._Currency;

		cmd.Parameters["@Status"].Value = (this._Status == null) ? (object) DBNull.Value : (object) this._Status;

		cmd.Parameters["@Description"].Value = (this._Description == null) ? (object) DBNull.Value : (object) this._Description;

		cmd.Parameters["@Quantity"].Value = this._Quantity;

		cmd.Parameters["@QuantityDelivered"].Value = this._QuantityDelivered;

		cmd.Parameters["@Code"].Value = (this._Code == null) ? (object) DBNull.Value : (object) this._Code;

		cmd.Parameters["@VAT"].Value = this._VAT;

		cmd.Parameters["@ProductId"].Value = this._ProductId;

		cmd.Parameters["@idlista"].Value = this._idlista;

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
    throw new RuntimeException("The crm_contrato_item is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("crm_contrato_itemDel", conn))
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
    using(var CmdSel = new SqlCommand("crm_contrato_itemSel", conn))
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
    Simplecrm_contrato_item Simple = new Simplecrm_contrato_item();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.idcontrato = this._idcontrato;

      Simple.Price = this._Price;

      Simple.Currency = this._Currency;

      Simple.Status = this._Status;

      Simple.Description = this._Description;

      Simple.Quantity = this._Quantity;

      Simple.QuantityDelivered = this._QuantityDelivered;

      Simple.Code = this._Code;

      Simple.VAT = this._VAT;

      Simple.ProductId = this._ProductId;

      Simple.idlista = this._idlista;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplecrm_contrato_item)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._idcontrato = Simple.idcontrato;

      this._Price = Simple.Price;

      this._Currency = Simple.Currency;

      this._Status = Simple.Status;

      this._Description = Simple.Description;

      this._Quantity = Simple.Quantity;

      this._QuantityDelivered = Simple.QuantityDelivered;

      this._Code = Simple.Code;

      this._VAT = Simple.VAT;

      this._ProductId = Simple.ProductId;

      this._idlista = Simple.idlista;

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
    Callercrm_contrato_item Caller = new Callercrm_contrato_item();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.idcontrato = this._idcontrato;

      Caller.Price = this._Price;

      Caller.Currency = this._Currency;

      Caller.Status = this._Status;

      Caller.Description = this._Description;

      Caller.Quantity = this._Quantity;

      Caller.QuantityDelivered = this._QuantityDelivered;

      Caller.Code = this._Code;

      Caller.VAT = this._VAT;

      Caller.ProductId = this._ProductId;

      Caller.idlista = this._idlista;

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
    
      dt.Columns.Add(new DataColumn("idcontrato", typeof (int)));
    
      dt.Columns.Add(new DataColumn("Price", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("Currency", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Status", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Description", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Quantity", typeof (int)));
    
      dt.Columns.Add(new DataColumn("QuantityDelivered", typeof (int)));
    
      dt.Columns.Add(new DataColumn("Code", typeof (string)));
    
      dt.Columns.Add(new DataColumn("VAT", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("ProductId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("idlista", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["idcontrato"] = this._idcontrato;

      dr["Price"] = this._Price;

      dr["Currency"] = this._Currency;

      dr["Status"] = this._Status;

      dr["Description"] = this._Description;

      dr["Quantity"] = this._Quantity;

      dr["QuantityDelivered"] = this._QuantityDelivered;

      dr["Code"] = this._Code;

      dr["VAT"] = this._VAT;

      dr["ProductId"] = this._ProductId;

      dr["idlista"] = this._idlista;

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
    using(var CmdChilds = new SqlCommand("crm_contrato_itemByChildObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdChilds))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
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
    Simplecrm_contrato_item Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("crm_contrato_itemByChildObject", conn))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdChilds.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdChilds.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdChilds.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new Simplecrm_contrato_item();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.idcontrato = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.Price = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.Currency = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Status = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Description = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Quantity = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.QuantityDelivered = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Code = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VAT = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.ProductId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.idlista = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    Simplecrm_contrato_item Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplecrm_contrato_item();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.idcontrato = (Row["idcontrato"] == DBNull.Value) ? 0 : (int) Row["idcontrato"];

Simple.Price = (Row["Price"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["Price"];

Simple.Currency = (Row["Currency"] == DBNull.Value) ? "" : (string) Row["Currency"];

Simple.Status = (Row["Status"] == DBNull.Value) ? "" : (string) Row["Status"];

Simple.Description = (Row["Description"] == DBNull.Value) ? "" : (string) Row["Description"];

Simple.Quantity = (Row["Quantity"] == DBNull.Value) ? 0 : (int) Row["Quantity"];

Simple.QuantityDelivered = (Row["QuantityDelivered"] == DBNull.Value) ? 0 : (int) Row["QuantityDelivered"];

Simple.Code = (Row["Code"] == DBNull.Value) ? "" : (string) Row["Code"];

Simple.VAT = (Row["VAT"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["VAT"];

Simple.ProductId = (Row["ProductId"] == DBNull.Value) ? 0 : (int) Row["ProductId"];

Simple.idlista = (Row["idlista"] == DBNull.Value) ? 0 : (int) Row["idlista"];


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
    using(var CmdParents = new SqlCommand("crm_contrato_itemByParentObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdParents))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
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
    Simplecrm_contrato_item Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("crm_contrato_itemByParentObject", conn))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
    CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdParents.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdParents.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdParents.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new Simplecrm_contrato_item();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.idcontrato = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.Price = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.Currency = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Status = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Description = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Quantity = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.QuantityDelivered = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Code = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VAT = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.ProductId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.idlista = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    using (var CmdDataByName = new SqlCommand("crm_contrato_itemByName", conn))
    using (var Adapter = new SqlDataAdapter(CmdDataByName))
    {
    // Search By Name
    CmdDataByName.CommandType = CommandType.StoredProcedure;
    CmdDataByName.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
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
    using(var CmdDataByNameWithChild = new SqlCommand("crm_contrato_itemByNameWithChild", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithChild))
    {
    // Search By Name Whit Child
    CmdDataByNameWithChild.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
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
    using(var CmdDataByNameWithParent = new SqlCommand("crm_contrato_itemByNameWithParent", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithParent))
    {
    // Search By Name Whit Parent
    CmdDataByNameWithParent.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
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
    using (var cmd = new SqlCommand("crm_contrato_itemByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("crm_contrato_itemByText", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByText))
    {

    CmdDataByText.CommandType = CommandType.StoredProcedure;
    CmdDataByText.Parameters.Add(new SqlParameter("@Text", SqlDbType.NVarChar));
    CmdDataByText.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
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
    public DataTable GetDataBySimpleObject(Simplecrm_contrato_item Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("crm_contrato_itemBySimplecrm_contrato_item", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@idcontrato", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@Currency", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Status", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@QuantityDelivered", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@VAT", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@ProductId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@idlista", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@idcontrato"].Value = this._idcontrato;

		cmd.Parameters["@Price"].Value = this._Price;

		cmd.Parameters["@Currency"].Value = (this._Currency == null) ? (object) DBNull.Value : (object) this._Currency;

		cmd.Parameters["@Status"].Value = (this._Status == null) ? (object) DBNull.Value : (object) this._Status;

		cmd.Parameters["@Description"].Value = (this._Description == null) ? (object) DBNull.Value : (object) this._Description;

		cmd.Parameters["@Quantity"].Value = this._Quantity;

		cmd.Parameters["@QuantityDelivered"].Value = this._QuantityDelivered;

		cmd.Parameters["@Code"].Value = (this._Code == null) ? (object) DBNull.Value : (object) this._Code;

		cmd.Parameters["@VAT"].Value = this._VAT;

		cmd.Parameters["@ProductId"].Value = this._ProductId;

		cmd.Parameters["@idlista"].Value = this._idlista;


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
		 
		public IEnumerable<Simplecrm_contrato_item> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("crm_contrato_itemByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplecrm_contrato_item Simple = new Simplecrm_contrato_item();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.idcontrato = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.Price = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.Currency = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Status = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Description = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Quantity = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.QuantityDelivered = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Code = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VAT = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.ProductId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.idlista = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplecrm_contrato_item> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("crm_contrato_itemByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplecrm_contrato_item Simple = new Simplecrm_contrato_item();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.idcontrato = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.Price = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.Currency = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Status = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Description = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Quantity = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.QuantityDelivered = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Code = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.VAT = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.ProductId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.idlista = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3150, "crm_contrato_item");
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
    if (Reader.FieldCount > 2)this._idcontrato = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._Price = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)this._Currency = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._Status = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._Description = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._Quantity = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._QuantityDelivered = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._Code = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._VAT = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)this._ProductId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._idlista = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    }
    Reader.Close();
    }
   }
  
    }
  