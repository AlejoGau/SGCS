
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
     ///OperadorVirtualConfig data access layer   
     ///</summary>
    public class DalOperadorVirtualConfig : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _ovc_cDescripcion;
    
      private int _ovc_iStatus;
    
      private string _ovc_cDealers;
    
      private string _ovc_cEventos;
    
      private DateTime? _ovc_tLastUpdated;
    
      private DateTime? _ovc_tCreatedDate;
    
      private string _ovc_cEventType;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///ovc_cDescripcion   
     ///</summary>
      public string ovc_cDescripcion
      {
      
          get{ return this._ovc_cDescripcion; }
          set{ this._ovc_cDescripcion = value; }
        
      }
     ///<summary>
     ///ovc_iStatus   
     ///</summary>
      public int ovc_iStatus
      {
      
          get{ return this._ovc_iStatus; }
          set{ this._ovc_iStatus = value; }
        
      }
     ///<summary>
     ///ovc_cDealers   
     ///</summary>
      public string ovc_cDealers
      {
      
          get{ return this._ovc_cDealers; }
          set{ this._ovc_cDealers = value; }
        
      }
     ///<summary>
     ///ovc_cEventos   
     ///</summary>
      public string ovc_cEventos
      {
      
          get{ return this._ovc_cEventos; }
          set{ this._ovc_cEventos = value; }
        
      }
     ///<summary>
     ///ovc_tLastUpdated   
     ///</summary>
      public DateTime? ovc_tLastUpdated
      {
      
          get{ return this._ovc_tLastUpdated; }
          set{ this._ovc_tLastUpdated = value; }
        
      }
     ///<summary>
     ///ovc_tCreatedDate   
     ///</summary>
      public DateTime? ovc_tCreatedDate
      {
      
          get{ return this._ovc_tCreatedDate; }
          set{ this._ovc_tCreatedDate = value; }
        
      }
     ///<summary>
     ///ovc_cEventType   
     ///</summary>
      public string ovc_cEventType
      {
      
          get{ return this._ovc_cEventType; }
          set{ this._ovc_cEventType = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalOperadorVirtualConfig(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalOperadorVirtualConfig(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalOperadorVirtualConfig(SqlHelper SqlConfig, int UserId, SimpleOperadorVirtualConfig Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._ovc_cDescripcion = Simple.ovc_cDescripcion;

      this._ovc_iStatus = Simple.ovc_iStatus;

      this._ovc_cDealers = Simple.ovc_cDealers;

      this._ovc_cEventos = Simple.ovc_cEventos;

      this._ovc_tLastUpdated = Simple.ovc_tLastUpdated;

      this._ovc_tCreatedDate = Simple.ovc_tCreatedDate;

      this._ovc_cEventType = Simple.ovc_cEventType;

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
    using(var cmd = new SqlCommand("OperadorVirtualConfigIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@ovc_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ovc_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ovc_cDealers", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@ovc_cEventos", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@ovc_tLastUpdated", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ovc_tCreatedDate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ovc_cEventType", SqlDbType.VarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@ovc_cDescripcion"].Value = (this._ovc_cDescripcion == null) ? (object) DBNull.Value : (object) this._ovc_cDescripcion;

		cmd.Parameters["@ovc_iStatus"].Value = this._ovc_iStatus;

		cmd.Parameters["@ovc_cDealers"].Value = (this._ovc_cDealers == null) ? (object) DBNull.Value : (object) this._ovc_cDealers;

		cmd.Parameters["@ovc_cEventos"].Value = (this._ovc_cEventos == null) ? (object) DBNull.Value : (object) this._ovc_cEventos;

		cmd.Parameters["@ovc_tLastUpdated"].Value = (this._ovc_tLastUpdated == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ovc_tLastUpdated;

		cmd.Parameters["@ovc_tCreatedDate"].Value = (this._ovc_tCreatedDate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ovc_tCreatedDate;

		cmd.Parameters["@ovc_cEventType"].Value = (this._ovc_cEventType == null) ? (object) DBNull.Value : (object) this._ovc_cEventType;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("OperadorVirtualConfigUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@ovc_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ovc_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ovc_cDealers", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@ovc_cEventos", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@ovc_tLastUpdated", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ovc_tCreatedDate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ovc_cEventType", SqlDbType.VarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@ovc_cDescripcion"].Value = (this._ovc_cDescripcion == null) ? (object) DBNull.Value : (object) this._ovc_cDescripcion;

		cmd.Parameters["@ovc_iStatus"].Value = this._ovc_iStatus;

		cmd.Parameters["@ovc_cDealers"].Value = (this._ovc_cDealers == null) ? (object) DBNull.Value : (object) this._ovc_cDealers;

		cmd.Parameters["@ovc_cEventos"].Value = (this._ovc_cEventos == null) ? (object) DBNull.Value : (object) this._ovc_cEventos;

		cmd.Parameters["@ovc_tLastUpdated"].Value = (this._ovc_tLastUpdated == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ovc_tLastUpdated;

		cmd.Parameters["@ovc_tCreatedDate"].Value = (this._ovc_tCreatedDate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ovc_tCreatedDate;

		cmd.Parameters["@ovc_cEventType"].Value = (this._ovc_cEventType == null) ? (object) DBNull.Value : (object) this._ovc_cEventType;

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
    throw new RuntimeException("The OperadorVirtualConfig is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("OperadorVirtualConfigDel", conn))
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
    using(var CmdSel = new SqlCommand("OperadorVirtualConfigSel", conn))
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
    SimpleOperadorVirtualConfig Simple = new SimpleOperadorVirtualConfig();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.ovc_cDescripcion = this._ovc_cDescripcion;

      Simple.ovc_iStatus = this._ovc_iStatus;

      Simple.ovc_cDealers = this._ovc_cDealers;

      Simple.ovc_cEventos = this._ovc_cEventos;

      Simple.ovc_tLastUpdated = this._ovc_tLastUpdated;

      Simple.ovc_tCreatedDate = this._ovc_tCreatedDate;

      Simple.ovc_cEventType = this._ovc_cEventType;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleOperadorVirtualConfig)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._ovc_cDescripcion = Simple.ovc_cDescripcion;

      this._ovc_iStatus = Simple.ovc_iStatus;

      this._ovc_cDealers = Simple.ovc_cDealers;

      this._ovc_cEventos = Simple.ovc_cEventos;

      this._ovc_tLastUpdated = Simple.ovc_tLastUpdated;

      this._ovc_tCreatedDate = Simple.ovc_tCreatedDate;

      this._ovc_cEventType = Simple.ovc_cEventType;

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
    CallerOperadorVirtualConfig Caller = new CallerOperadorVirtualConfig();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.ovc_cDescripcion = this._ovc_cDescripcion;

      Caller.ovc_iStatus = this._ovc_iStatus;

      Caller.ovc_cDealers = this._ovc_cDealers;

      Caller.ovc_cEventos = this._ovc_cEventos;

      Caller.ovc_tLastUpdated = this._ovc_tLastUpdated;

      Caller.ovc_tCreatedDate = this._ovc_tCreatedDate;

      Caller.ovc_cEventType = this._ovc_cEventType;

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
    
      dt.Columns.Add(new DataColumn("ovc_cDescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ovc_iStatus", typeof (int)));
    
      dt.Columns.Add(new DataColumn("ovc_cDealers", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ovc_cEventos", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ovc_tLastUpdated", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("ovc_tCreatedDate", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("ovc_cEventType", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["ovc_cDescripcion"] = this._ovc_cDescripcion;

      dr["ovc_iStatus"] = this._ovc_iStatus;

      dr["ovc_cDealers"] = this._ovc_cDealers;

      dr["ovc_cEventos"] = this._ovc_cEventos;

      dr["ovc_tLastUpdated"] = (object)this._ovc_tLastUpdated  ?? DBNull.Value;

      dr["ovc_tCreatedDate"] = (object)this._ovc_tCreatedDate  ?? DBNull.Value;

      dr["ovc_cEventType"] = this._ovc_cEventType;

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
    using(var CmdChilds = new SqlCommand("OperadorVirtualConfigByChildObject", conn))
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
    SimpleOperadorVirtualConfig Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("OperadorVirtualConfigByChildObject", conn))
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
    Simple = new SimpleOperadorVirtualConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ovc_cDescripcion = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ovc_iStatus = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.ovc_cDealers = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ovc_cEventos = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ovc_tLastUpdated = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.ovc_tCreatedDate = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ovc_cEventType = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);


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
    SimpleOperadorVirtualConfig Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleOperadorVirtualConfig();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.ovc_cDescripcion = (Row["ovc_cDescripcion"] == DBNull.Value) ? "" : (string) Row["ovc_cDescripcion"];

Simple.ovc_iStatus = (Row["ovc_iStatus"] == DBNull.Value) ? 0 : (int) Row["ovc_iStatus"];

Simple.ovc_cDealers = (Row["ovc_cDealers"] == DBNull.Value) ? "" : (string) Row["ovc_cDealers"];

Simple.ovc_cEventos = (Row["ovc_cEventos"] == DBNull.Value) ? "" : (string) Row["ovc_cEventos"];

Simple.ovc_tLastUpdated = (Row["ovc_tLastUpdated"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["ovc_tLastUpdated"];

Simple.ovc_tCreatedDate = (Row["ovc_tCreatedDate"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["ovc_tCreatedDate"];

Simple.ovc_cEventType = (Row["ovc_cEventType"] == DBNull.Value) ? "" : (string) Row["ovc_cEventType"];


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
    using(var CmdParents = new SqlCommand("OperadorVirtualConfigByParentObject", conn))
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
    SimpleOperadorVirtualConfig Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("OperadorVirtualConfigByParentObject", conn))
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
    Simple = new SimpleOperadorVirtualConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ovc_cDescripcion = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ovc_iStatus = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.ovc_cDealers = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ovc_cEventos = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ovc_tLastUpdated = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.ovc_tCreatedDate = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ovc_cEventType = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);


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
    using (var CmdDataByName = new SqlCommand("OperadorVirtualConfigByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("OperadorVirtualConfigByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("OperadorVirtualConfigByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("OperadorVirtualConfigByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("OperadorVirtualConfigByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleOperadorVirtualConfig Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("OperadorVirtualConfigBySimpleOperadorVirtualConfig", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@ovc_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ovc_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ovc_cDealers", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@ovc_cEventos", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@ovc_tLastUpdated", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ovc_tCreatedDate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ovc_cEventType", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@ovc_cDescripcion"].Value = (this._ovc_cDescripcion == null) ? (object) DBNull.Value : (object) this._ovc_cDescripcion;

		cmd.Parameters["@ovc_iStatus"].Value = this._ovc_iStatus;

		cmd.Parameters["@ovc_cDealers"].Value = (this._ovc_cDealers == null) ? (object) DBNull.Value : (object) this._ovc_cDealers;

		cmd.Parameters["@ovc_cEventos"].Value = (this._ovc_cEventos == null) ? (object) DBNull.Value : (object) this._ovc_cEventos;

		cmd.Parameters["@ovc_tLastUpdated"].Value = (this._ovc_tLastUpdated == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ovc_tLastUpdated;

		cmd.Parameters["@ovc_tCreatedDate"].Value = (this._ovc_tCreatedDate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ovc_tCreatedDate;

		cmd.Parameters["@ovc_cEventType"].Value = (this._ovc_cEventType == null) ? (object) DBNull.Value : (object) this._ovc_cEventType;


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
		 
		public IEnumerable<SimpleOperadorVirtualConfig> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("OperadorVirtualConfigByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleOperadorVirtualConfig Simple = new SimpleOperadorVirtualConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ovc_cDescripcion = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ovc_iStatus = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.ovc_cDealers = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ovc_cEventos = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ovc_tLastUpdated = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.ovc_tCreatedDate = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ovc_cEventType = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleOperadorVirtualConfig> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("OperadorVirtualConfigByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleOperadorVirtualConfig Simple = new SimpleOperadorVirtualConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ovc_cDescripcion = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ovc_iStatus = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.ovc_cDealers = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ovc_cEventos = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ovc_tLastUpdated = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.ovc_tCreatedDate = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ovc_cEventType = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(7047, "OperadorVirtualConfig");
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
    if (Reader.FieldCount > 2)this._ovc_cDescripcion = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._ovc_iStatus = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._ovc_cDealers = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._ovc_cEventos = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._ovc_tLastUpdated = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._ovc_tCreatedDate = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)this._ovc_cEventType = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    }
    Reader.Close();
    }
   }
  
    }
  