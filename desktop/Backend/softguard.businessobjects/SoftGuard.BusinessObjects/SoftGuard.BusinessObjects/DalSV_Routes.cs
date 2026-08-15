
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
     ///SV_Routes data access layer   
     ///</summary>
    public class DalSV_Routes : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _svr_iid;
    
      private int _svr_iCuentaId;
    
      private string _svr_cName;
    
      private string _svr_cDescripcion;
    
      private string _svr_cRouteType;
    
      private DateTime? _svr_dDateStart;
    
      private int _svr_iParallel;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///svr_iid   
     ///</summary>
      public int svr_iid
      {
      
          get{ return this._svr_iid; }
          set{ this._svr_iid = value; }
        
      }
     ///<summary>
     ///svr_iCuentaId   
     ///</summary>
      public int svr_iCuentaId
      {
      
          get{ return this._svr_iCuentaId; }
          set{ this._svr_iCuentaId = value; }
        
      }
     ///<summary>
     ///svr_cName   
     ///</summary>
      public string svr_cName
      {
      
          get{ return this._svr_cName; }
          set{ this._svr_cName = value; }
        
      }
     ///<summary>
     ///svr_cDescripcion   
     ///</summary>
      public string svr_cDescripcion
      {
      
          get{ return this._svr_cDescripcion; }
          set{ this._svr_cDescripcion = value; }
        
      }
     ///<summary>
     ///svr_cRouteType   
     ///</summary>
      public string svr_cRouteType
      {
      
          get{ return this._svr_cRouteType; }
          set{ this._svr_cRouteType = value; }
        
      }
     ///<summary>
     ///svr_dDateStart   
     ///</summary>
      public DateTime? svr_dDateStart
      {
      
          get{ return this._svr_dDateStart; }
          set{ this._svr_dDateStart = value; }
        
      }
     ///<summary>
     ///svr_iParallel   
     ///</summary>
      public int svr_iParallel
      {
      
          get{ return this._svr_iParallel; }
          set{ this._svr_iParallel = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSV_Routes(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSV_Routes(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSV_Routes(SqlHelper SqlConfig, int UserId, SimpleSV_Routes Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._svr_iid = Simple.svr_iid;

      this._svr_iCuentaId = Simple.svr_iCuentaId;

      this._svr_cName = Simple.svr_cName;

      this._svr_cDescripcion = Simple.svr_cDescripcion;

      this._svr_cRouteType = Simple.svr_cRouteType;

      this._svr_dDateStart = Simple.svr_dDateStart;

      this._svr_iParallel = Simple.svr_iParallel;

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
    using(var cmd = new SqlCommand("SV_RoutesIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@svr_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svr_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svr_cName", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svr_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svr_cRouteType", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@svr_dDateStart", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svr_iParallel", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@svr_iid"].Value = this._svr_iid;

		cmd.Parameters["@svr_iCuentaId"].Value = this._svr_iCuentaId;

		cmd.Parameters["@svr_cName"].Value = (this._svr_cName == null) ? (object) DBNull.Value : (object) this._svr_cName;

		cmd.Parameters["@svr_cDescripcion"].Value = (this._svr_cDescripcion == null) ? (object) DBNull.Value : (object) this._svr_cDescripcion;

		cmd.Parameters["@svr_cRouteType"].Value = (this._svr_cRouteType == null) ? (object) DBNull.Value : (object) this._svr_cRouteType;

		cmd.Parameters["@svr_dDateStart"].Value = (this._svr_dDateStart == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svr_dDateStart;

		cmd.Parameters["@svr_iParallel"].Value = this._svr_iParallel;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SV_RoutesUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@svr_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svr_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svr_cName", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svr_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svr_cRouteType", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@svr_dDateStart", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svr_iParallel", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@svr_iid"].Value = this._svr_iid;

		cmd.Parameters["@svr_iCuentaId"].Value = this._svr_iCuentaId;

		cmd.Parameters["@svr_cName"].Value = (this._svr_cName == null) ? (object) DBNull.Value : (object) this._svr_cName;

		cmd.Parameters["@svr_cDescripcion"].Value = (this._svr_cDescripcion == null) ? (object) DBNull.Value : (object) this._svr_cDescripcion;

		cmd.Parameters["@svr_cRouteType"].Value = (this._svr_cRouteType == null) ? (object) DBNull.Value : (object) this._svr_cRouteType;

		cmd.Parameters["@svr_dDateStart"].Value = (this._svr_dDateStart == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svr_dDateStart;

		cmd.Parameters["@svr_iParallel"].Value = this._svr_iParallel;

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
    throw new RuntimeException("The SV_Routes is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("SV_RoutesDel", conn))
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
    using(var CmdSel = new SqlCommand("SV_RoutesSel", conn))
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
    SimpleSV_Routes Simple = new SimpleSV_Routes();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.svr_iid = this._svr_iid;

      Simple.svr_iCuentaId = this._svr_iCuentaId;

      Simple.svr_cName = this._svr_cName;

      Simple.svr_cDescripcion = this._svr_cDescripcion;

      Simple.svr_cRouteType = this._svr_cRouteType;

      Simple.svr_dDateStart = this._svr_dDateStart;

      Simple.svr_iParallel = this._svr_iParallel;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleSV_Routes)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._svr_iid = Simple.svr_iid;

      this._svr_iCuentaId = Simple.svr_iCuentaId;

      this._svr_cName = Simple.svr_cName;

      this._svr_cDescripcion = Simple.svr_cDescripcion;

      this._svr_cRouteType = Simple.svr_cRouteType;

      this._svr_dDateStart = Simple.svr_dDateStart;

      this._svr_iParallel = Simple.svr_iParallel;

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
    CallerSV_Routes Caller = new CallerSV_Routes();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.svr_iid = this._svr_iid;

      Caller.svr_iCuentaId = this._svr_iCuentaId;

      Caller.svr_cName = this._svr_cName;

      Caller.svr_cDescripcion = this._svr_cDescripcion;

      Caller.svr_cRouteType = this._svr_cRouteType;

      Caller.svr_dDateStart = this._svr_dDateStart;

      Caller.svr_iParallel = this._svr_iParallel;

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
    
      dt.Columns.Add(new DataColumn("svr_iid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("svr_iCuentaId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("svr_cName", typeof (string)));
    
      dt.Columns.Add(new DataColumn("svr_cDescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("svr_cRouteType", typeof (string)));
    
      dt.Columns.Add(new DataColumn("svr_dDateStart", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("svr_iParallel", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["svr_iid"] = this._svr_iid;

      dr["svr_iCuentaId"] = this._svr_iCuentaId;

      dr["svr_cName"] = this._svr_cName;

      dr["svr_cDescripcion"] = this._svr_cDescripcion;

      dr["svr_cRouteType"] = this._svr_cRouteType;

      dr["svr_dDateStart"] = (object)this._svr_dDateStart  ?? DBNull.Value;

      dr["svr_iParallel"] = this._svr_iParallel;

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
    using(var CmdChilds = new SqlCommand("SV_RoutesByChildObject", conn))
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
    SimpleSV_Routes Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("SV_RoutesByChildObject", conn))
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
    Simple = new SimpleSV_Routes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svr_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.svr_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svr_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.svr_cDescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.svr_cRouteType = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svr_dDateStart = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svr_iParallel = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);


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
    SimpleSV_Routes Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleSV_Routes();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.svr_iid = (Row["svr_iid"] == DBNull.Value) ? 0 : (int) Row["svr_iid"];

Simple.svr_iCuentaId = (Row["svr_iCuentaId"] == DBNull.Value) ? 0 : (int) Row["svr_iCuentaId"];

Simple.svr_cName = (Row["svr_cName"] == DBNull.Value) ? "" : (string) Row["svr_cName"];

Simple.svr_cDescripcion = (Row["svr_cDescripcion"] == DBNull.Value) ? "" : (string) Row["svr_cDescripcion"];

Simple.svr_cRouteType = (Row["svr_cRouteType"] == DBNull.Value) ? "" : (string) Row["svr_cRouteType"];

Simple.svr_dDateStart = (Row["svr_dDateStart"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["svr_dDateStart"];

Simple.svr_iParallel = (Row["svr_iParallel"] == DBNull.Value) ? 0 : (int) Row["svr_iParallel"];


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
    using(var CmdParents = new SqlCommand("SV_RoutesByParentObject", conn))
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
    SimpleSV_Routes Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("SV_RoutesByParentObject", conn))
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
    Simple = new SimpleSV_Routes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svr_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.svr_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svr_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.svr_cDescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.svr_cRouteType = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svr_dDateStart = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svr_iParallel = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);


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
    using (var CmdDataByName = new SqlCommand("SV_RoutesByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("SV_RoutesByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("SV_RoutesByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("SV_RoutesByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("SV_RoutesByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleSV_Routes Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SV_RoutesBySimpleSV_Routes", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@svr_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svr_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svr_cName", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svr_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svr_cRouteType", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@svr_dDateStart", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svr_iParallel", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@svr_iid"].Value = this._svr_iid;

		cmd.Parameters["@svr_iCuentaId"].Value = this._svr_iCuentaId;

		cmd.Parameters["@svr_cName"].Value = (this._svr_cName == null) ? (object) DBNull.Value : (object) this._svr_cName;

		cmd.Parameters["@svr_cDescripcion"].Value = (this._svr_cDescripcion == null) ? (object) DBNull.Value : (object) this._svr_cDescripcion;

		cmd.Parameters["@svr_cRouteType"].Value = (this._svr_cRouteType == null) ? (object) DBNull.Value : (object) this._svr_cRouteType;

		cmd.Parameters["@svr_dDateStart"].Value = (this._svr_dDateStart == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svr_dDateStart;

		cmd.Parameters["@svr_iParallel"].Value = this._svr_iParallel;


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
		 
		public IEnumerable<SimpleSV_Routes> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SV_RoutesByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSV_Routes Simple = new SimpleSV_Routes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svr_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.svr_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svr_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.svr_cDescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.svr_cRouteType = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svr_dDateStart = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svr_iParallel = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleSV_Routes> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SV_RoutesByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSV_Routes Simple = new SimpleSV_Routes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svr_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.svr_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svr_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.svr_cDescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.svr_cRouteType = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svr_dDateStart = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svr_iParallel = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3301, "SV_Routes");
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
    if (Reader.FieldCount > 2)this._svr_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._svr_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._svr_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._svr_cDescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._svr_cRouteType = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._svr_dDateStart = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)this._svr_iParallel = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);

    }
    Reader.Close();
    }
   }
  
    }
  