
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
     ///Estado data access layer   
     ///</summary>
    public class DalEstado : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private Decimal _est_nestado;
    
      private Decimal _est_ntipo;
    
      private DateTime? _est_dfechadesde;
    
      private Decimal _est_nduracion;
    
      private DateTime? _est_dfechahasta;
    
      private string _est_mnota;
    
      private string _token;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///est_nestado   
     ///</summary>
      public Decimal est_nestado
      {
      
          get{ return this._est_nestado; }
          set{ this._est_nestado = value; }
        
      }
     ///<summary>
     ///est_ntipo   
     ///</summary>
      public Decimal est_ntipo
      {
      
          get{ return this._est_ntipo; }
          set{ this._est_ntipo = value; }
        
      }
     ///<summary>
     ///est_dfechadesde   
     ///</summary>
      public DateTime? est_dfechadesde
      {
      
          get{ return this._est_dfechadesde; }
          set{ this._est_dfechadesde = value; }
        
      }
     ///<summary>
     ///est_nduracion   
     ///</summary>
      public Decimal est_nduracion
      {
      
          get{ return this._est_nduracion; }
          set{ this._est_nduracion = value; }
        
      }
     ///<summary>
     ///est_dfechahasta   
     ///</summary>
      public DateTime? est_dfechahasta
      {
      
          get{ return this._est_dfechahasta; }
          set{ this._est_dfechahasta = value; }
        
      }
     ///<summary>
     ///est_mnota   
     ///</summary>
      public string est_mnota
      {
      
          get{ return this._est_mnota; }
          set{ this._est_mnota = value; }
        
      }
     ///<summary>
     ///token   
     ///</summary>
      public string token
      {
      
          get{ return this._token; }
          set{ this._token = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEstado(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEstado(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEstado(SqlHelper SqlConfig, int UserId, SimpleEstado Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._est_nestado = Simple.est_nestado;

      this._est_ntipo = Simple.est_ntipo;

      this._est_dfechadesde = Simple.est_dfechadesde;

      this._est_nduracion = Simple.est_nduracion;

      this._est_dfechahasta = Simple.est_dfechahasta;

      this._est_mnota = Simple.est_mnota;

      this._token = Simple.token;

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
    using(var cmd = new SqlCommand("EstadoIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@est_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_dfechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@est_nduracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_dfechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@est_mnota", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@token", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@est_nestado"].Value = this._est_nestado;

		cmd.Parameters["@est_ntipo"].Value = this._est_ntipo;

		cmd.Parameters["@est_dfechadesde"].Value = (this._est_dfechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._est_dfechadesde;

		cmd.Parameters["@est_nduracion"].Value = this._est_nduracion;

		cmd.Parameters["@est_dfechahasta"].Value = (this._est_dfechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._est_dfechahasta;

		cmd.Parameters["@est_mnota"].Value = (this._est_mnota == null) ? (object) DBNull.Value : (object) this._est_mnota;

		cmd.Parameters["@token"].Value = (this._token == null) ? (object) DBNull.Value : (object) this._token;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EstadoUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@est_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_dfechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@est_nduracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_dfechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@est_mnota", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@token", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@est_nestado"].Value = this._est_nestado;

		cmd.Parameters["@est_ntipo"].Value = this._est_ntipo;

		cmd.Parameters["@est_dfechadesde"].Value = (this._est_dfechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._est_dfechadesde;

		cmd.Parameters["@est_nduracion"].Value = this._est_nduracion;

		cmd.Parameters["@est_dfechahasta"].Value = (this._est_dfechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._est_dfechahasta;

		cmd.Parameters["@est_mnota"].Value = (this._est_mnota == null) ? (object) DBNull.Value : (object) this._est_mnota;

		cmd.Parameters["@token"].Value = (this._token == null) ? (object) DBNull.Value : (object) this._token;

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
    throw new RuntimeException("The Estado is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("EstadoDel", conn))
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
    using(var CmdSel = new SqlCommand("EstadoSel", conn))
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
    SimpleEstado Simple = new SimpleEstado();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.est_nestado = this._est_nestado;

      Simple.est_ntipo = this._est_ntipo;

      Simple.est_dfechadesde = this._est_dfechadesde;

      Simple.est_nduracion = this._est_nduracion;

      Simple.est_dfechahasta = this._est_dfechahasta;

      Simple.est_mnota = this._est_mnota;

      Simple.token = this._token;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleEstado)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._est_nestado = Simple.est_nestado;

      this._est_ntipo = Simple.est_ntipo;

      this._est_dfechadesde = Simple.est_dfechadesde;

      this._est_nduracion = Simple.est_nduracion;

      this._est_dfechahasta = Simple.est_dfechahasta;

      this._est_mnota = Simple.est_mnota;

      this._token = Simple.token;

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
    CallerEstado Caller = new CallerEstado();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.est_nestado = this._est_nestado;

      Caller.est_ntipo = this._est_ntipo;

      Caller.est_dfechadesde = this._est_dfechadesde;

      Caller.est_nduracion = this._est_nduracion;

      Caller.est_dfechahasta = this._est_dfechahasta;

      Caller.est_mnota = this._est_mnota;

      Caller.token = this._token;

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
    
      dt.Columns.Add(new DataColumn("est_nestado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("est_ntipo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("est_dfechadesde", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("est_nduracion", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("est_dfechahasta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("est_mnota", typeof (string)));
    
      dt.Columns.Add(new DataColumn("token", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["est_nestado"] = this._est_nestado;

      dr["est_ntipo"] = this._est_ntipo;

      dr["est_dfechadesde"] = (object)this._est_dfechadesde  ?? DBNull.Value;

      dr["est_nduracion"] = this._est_nduracion;

      dr["est_dfechahasta"] = (object)this._est_dfechahasta  ?? DBNull.Value;

      dr["est_mnota"] = this._est_mnota;

      dr["token"] = this._token;

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
    using(var CmdChilds = new SqlCommand("EstadoByChildObject", conn))
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
    SimpleEstado Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("EstadoByChildObject", conn))
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
    Simple = new SimpleEstado();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.est_nestado = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.est_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.est_dfechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.est_nduracion = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.est_dfechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.est_mnota = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.token = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);


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
    SimpleEstado Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleEstado();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.est_nestado = (Row["est_nestado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["est_nestado"];

Simple.est_ntipo = (Row["est_ntipo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["est_ntipo"];

Simple.est_dfechadesde = (Row["est_dfechadesde"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["est_dfechadesde"];

Simple.est_nduracion = (Row["est_nduracion"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["est_nduracion"];

Simple.est_dfechahasta = (Row["est_dfechahasta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["est_dfechahasta"];

Simple.est_mnota = (Row["est_mnota"] == DBNull.Value) ? "" : (string) Row["est_mnota"];

Simple.token = (Row["token"] == DBNull.Value) ? "" : (string) Row["token"];


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
    using(var CmdParents = new SqlCommand("EstadoByParentObject", conn))
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
    SimpleEstado Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("EstadoByParentObject", conn))
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
    Simple = new SimpleEstado();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.est_nestado = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.est_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.est_dfechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.est_nduracion = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.est_dfechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.est_mnota = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.token = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);


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
    using (var CmdDataByName = new SqlCommand("EstadoByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("EstadoByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("EstadoByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("EstadoByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("EstadoByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleEstado Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EstadoBySimpleEstado", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@est_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_dfechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@est_nduracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@est_dfechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@est_mnota", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@token", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@est_nestado"].Value = this._est_nestado;

		cmd.Parameters["@est_ntipo"].Value = this._est_ntipo;

		cmd.Parameters["@est_dfechadesde"].Value = (this._est_dfechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._est_dfechadesde;

		cmd.Parameters["@est_nduracion"].Value = this._est_nduracion;

		cmd.Parameters["@est_dfechahasta"].Value = (this._est_dfechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._est_dfechahasta;

		cmd.Parameters["@est_mnota"].Value = (this._est_mnota == null) ? (object) DBNull.Value : (object) this._est_mnota;

		cmd.Parameters["@token"].Value = (this._token == null) ? (object) DBNull.Value : (object) this._token;


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
		 
		public IEnumerable<SimpleEstado> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EstadoByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEstado Simple = new SimpleEstado();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.est_nestado = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.est_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.est_dfechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.est_nduracion = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.est_dfechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.est_mnota = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.token = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleEstado> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EstadoByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEstado Simple = new SimpleEstado();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.est_nestado = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.est_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.est_dfechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.est_nduracion = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.est_dfechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.est_mnota = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.token = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3033, "Estado");
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
    if (Reader.FieldCount > 2)this._est_nestado = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)this._est_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)this._est_dfechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._est_nduracion = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)this._est_dfechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._est_mnota = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._token = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    }
    Reader.Close();
    }
   }
  
    }
  