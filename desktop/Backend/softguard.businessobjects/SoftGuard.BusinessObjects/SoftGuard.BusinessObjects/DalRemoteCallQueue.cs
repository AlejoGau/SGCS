
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
     ///RemoteCallQueue data access layer   
     ///</summary>
    public class DalRemoteCallQueue : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _rcq_estado;
    
      private string _rcq_tipo;
    
      private string _rcq_url;
    
      private string _rcq_result;
    
      private DateTime? _rcq_fechaprograma;
    
      private DateTime? _rcq_fechaalta;
    
      private DateTime? _rcq_fechamodificacion;
    
      private string _rcq_config;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///rcq_estado   
     ///</summary>
      public int rcq_estado
      {
      
          get{ return this._rcq_estado; }
          set{ this._rcq_estado = value; }
        
      }
     ///<summary>
     ///rcq_tipo   
     ///</summary>
      public string rcq_tipo
      {
      
          get{ return this._rcq_tipo; }
          set{ this._rcq_tipo = value; }
        
      }
     ///<summary>
     ///rcq_url   
     ///</summary>
      public string rcq_url
      {
      
          get{ return this._rcq_url; }
          set{ this._rcq_url = value; }
        
      }
     ///<summary>
     ///rcq_result   
     ///</summary>
      public string rcq_result
      {
      
          get{ return this._rcq_result; }
          set{ this._rcq_result = value; }
        
      }
     ///<summary>
     ///rcq_fechaprograma   
     ///</summary>
      public DateTime? rcq_fechaprograma
      {
      
          get{ return this._rcq_fechaprograma; }
          set{ this._rcq_fechaprograma = value; }
        
      }
     ///<summary>
     ///rcq_fechaalta   
     ///</summary>
      public DateTime? rcq_fechaalta
      {
      
          get{ return this._rcq_fechaalta; }
          set{ this._rcq_fechaalta = value; }
        
      }
     ///<summary>
     ///rcq_fechamodificacion   
     ///</summary>
      public DateTime? rcq_fechamodificacion
      {
      
          get{ return this._rcq_fechamodificacion; }
          set{ this._rcq_fechamodificacion = value; }
        
      }
     ///<summary>
     ///rcq_config   
     ///</summary>
      public string rcq_config
      {
      
          get{ return this._rcq_config; }
          set{ this._rcq_config = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalRemoteCallQueue(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalRemoteCallQueue(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalRemoteCallQueue(SqlHelper SqlConfig, int UserId, SimpleRemoteCallQueue Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rcq_estado = Simple.rcq_estado;

      this._rcq_tipo = Simple.rcq_tipo;

      this._rcq_url = Simple.rcq_url;

      this._rcq_result = Simple.rcq_result;

      this._rcq_fechaprograma = Simple.rcq_fechaprograma;

      this._rcq_fechaalta = Simple.rcq_fechaalta;

      this._rcq_fechamodificacion = Simple.rcq_fechamodificacion;

      this._rcq_config = Simple.rcq_config;

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
    using(var cmd = new SqlCommand("RemoteCallQueueIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rcq_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rcq_tipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_url", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_result", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_fechaprograma", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_fechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_fechamodificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_config", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rcq_estado"].Value = this._rcq_estado;

		cmd.Parameters["@rcq_tipo"].Value = (this._rcq_tipo == null) ? (object) DBNull.Value : (object) this._rcq_tipo;

		cmd.Parameters["@rcq_url"].Value = (this._rcq_url == null) ? (object) DBNull.Value : (object) this._rcq_url;

		cmd.Parameters["@rcq_result"].Value = (this._rcq_result == null) ? (object) DBNull.Value : (object) this._rcq_result;

		cmd.Parameters["@rcq_fechaprograma"].Value = (this._rcq_fechaprograma == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechaprograma;

		cmd.Parameters["@rcq_fechaalta"].Value = (this._rcq_fechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechaalta;

		cmd.Parameters["@rcq_fechamodificacion"].Value = (this._rcq_fechamodificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechamodificacion;

		cmd.Parameters["@rcq_config"].Value = (this._rcq_config == null) ? (object) DBNull.Value : (object) this._rcq_config;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("RemoteCallQueueUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rcq_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rcq_tipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_url", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_result", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_fechaprograma", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_fechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_fechamodificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_config", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rcq_estado"].Value = this._rcq_estado;

		cmd.Parameters["@rcq_tipo"].Value = (this._rcq_tipo == null) ? (object) DBNull.Value : (object) this._rcq_tipo;

		cmd.Parameters["@rcq_url"].Value = (this._rcq_url == null) ? (object) DBNull.Value : (object) this._rcq_url;

		cmd.Parameters["@rcq_result"].Value = (this._rcq_result == null) ? (object) DBNull.Value : (object) this._rcq_result;

		cmd.Parameters["@rcq_fechaprograma"].Value = (this._rcq_fechaprograma == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechaprograma;

		cmd.Parameters["@rcq_fechaalta"].Value = (this._rcq_fechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechaalta;

		cmd.Parameters["@rcq_fechamodificacion"].Value = (this._rcq_fechamodificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechamodificacion;

		cmd.Parameters["@rcq_config"].Value = (this._rcq_config == null) ? (object) DBNull.Value : (object) this._rcq_config;

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
    throw new RuntimeException("The RemoteCallQueue is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("RemoteCallQueueDel", conn))
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
    using(var CmdSel = new SqlCommand("RemoteCallQueueSel", conn))
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
    SimpleRemoteCallQueue Simple = new SimpleRemoteCallQueue();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.rcq_estado = this._rcq_estado;

      Simple.rcq_tipo = this._rcq_tipo;

      Simple.rcq_url = this._rcq_url;

      Simple.rcq_result = this._rcq_result;

      Simple.rcq_fechaprograma = this._rcq_fechaprograma;

      Simple.rcq_fechaalta = this._rcq_fechaalta;

      Simple.rcq_fechamodificacion = this._rcq_fechamodificacion;

      Simple.rcq_config = this._rcq_config;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleRemoteCallQueue)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rcq_estado = Simple.rcq_estado;

      this._rcq_tipo = Simple.rcq_tipo;

      this._rcq_url = Simple.rcq_url;

      this._rcq_result = Simple.rcq_result;

      this._rcq_fechaprograma = Simple.rcq_fechaprograma;

      this._rcq_fechaalta = Simple.rcq_fechaalta;

      this._rcq_fechamodificacion = Simple.rcq_fechamodificacion;

      this._rcq_config = Simple.rcq_config;

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
    CallerRemoteCallQueue Caller = new CallerRemoteCallQueue();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.rcq_estado = this._rcq_estado;

      Caller.rcq_tipo = this._rcq_tipo;

      Caller.rcq_url = this._rcq_url;

      Caller.rcq_result = this._rcq_result;

      Caller.rcq_fechaprograma = this._rcq_fechaprograma;

      Caller.rcq_fechaalta = this._rcq_fechaalta;

      Caller.rcq_fechamodificacion = this._rcq_fechamodificacion;

      Caller.rcq_config = this._rcq_config;

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
    
      dt.Columns.Add(new DataColumn("rcq_estado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rcq_tipo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rcq_url", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rcq_result", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rcq_fechaprograma", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rcq_fechaalta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rcq_fechamodificacion", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rcq_config", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["rcq_estado"] = this._rcq_estado;

      dr["rcq_tipo"] = this._rcq_tipo;

      dr["rcq_url"] = this._rcq_url;

      dr["rcq_result"] = this._rcq_result;

      dr["rcq_fechaprograma"] = this._rcq_fechaprograma;

      dr["rcq_fechaalta"] = this._rcq_fechaalta;

      dr["rcq_fechamodificacion"] = this._rcq_fechamodificacion;

      dr["rcq_config"] = this._rcq_config;

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
    using(var CmdChilds = new SqlCommand("RemoteCallQueueByChildObject", conn))
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
    SimpleRemoteCallQueue Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("RemoteCallQueueByChildObject", conn))
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
    Simple = new SimpleRemoteCallQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rcq_estado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rcq_tipo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rcq_url = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rcq_result = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rcq_fechaprograma = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rcq_fechaalta = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.rcq_fechamodificacion = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rcq_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    SimpleRemoteCallQueue Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleRemoteCallQueue();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.rcq_estado = (Row["rcq_estado"] == DBNull.Value) ? 0 : (int) Row["rcq_estado"];

Simple.rcq_tipo = (Row["rcq_tipo"] == DBNull.Value) ? "" : (string) Row["rcq_tipo"];

Simple.rcq_url = (Row["rcq_url"] == DBNull.Value) ? "" : (string) Row["rcq_url"];

Simple.rcq_result = (Row["rcq_result"] == DBNull.Value) ? "" : (string) Row["rcq_result"];

Simple.rcq_fechaprograma = (Row["rcq_fechaprograma"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rcq_fechaprograma"];

Simple.rcq_fechaalta = (Row["rcq_fechaalta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rcq_fechaalta"];

Simple.rcq_fechamodificacion = (Row["rcq_fechamodificacion"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rcq_fechamodificacion"];

Simple.rcq_config = (Row["rcq_config"] == DBNull.Value) ? "" : (string) Row["rcq_config"];


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
    using(var CmdParents = new SqlCommand("RemoteCallQueueByParentObject", conn))
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
    SimpleRemoteCallQueue Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("RemoteCallQueueByParentObject", conn))
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
    Simple = new SimpleRemoteCallQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rcq_estado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rcq_tipo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rcq_url = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rcq_result = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rcq_fechaprograma = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rcq_fechaalta = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.rcq_fechamodificacion = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rcq_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    using (var CmdDataByName = new SqlCommand("RemoteCallQueueByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("RemoteCallQueueByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("RemoteCallQueueByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("RemoteCallQueueByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("RemoteCallQueueByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleRemoteCallQueue Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("RemoteCallQueueBySimpleRemoteCallQueue", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rcq_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rcq_tipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_url", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_result", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rcq_fechaprograma", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_fechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_fechamodificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rcq_config", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@rcq_estado"].Value = this._rcq_estado;

		cmd.Parameters["@rcq_tipo"].Value = (this._rcq_tipo == null) ? (object) DBNull.Value : (object) this._rcq_tipo;

		cmd.Parameters["@rcq_url"].Value = (this._rcq_url == null) ? (object) DBNull.Value : (object) this._rcq_url;

		cmd.Parameters["@rcq_result"].Value = (this._rcq_result == null) ? (object) DBNull.Value : (object) this._rcq_result;

		cmd.Parameters["@rcq_fechaprograma"].Value = (this._rcq_fechaprograma == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechaprograma;

		cmd.Parameters["@rcq_fechaalta"].Value = (this._rcq_fechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechaalta;

		cmd.Parameters["@rcq_fechamodificacion"].Value = (this._rcq_fechamodificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rcq_fechamodificacion;

		cmd.Parameters["@rcq_config"].Value = (this._rcq_config == null) ? (object) DBNull.Value : (object) this._rcq_config;


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
		 
		public IEnumerable<SimpleRemoteCallQueue> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("RemoteCallQueueByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleRemoteCallQueue Simple = new SimpleRemoteCallQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rcq_estado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rcq_tipo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rcq_url = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rcq_result = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rcq_fechaprograma = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rcq_fechaalta = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.rcq_fechamodificacion = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rcq_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleRemoteCallQueue> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("RemoteCallQueueByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleRemoteCallQueue Simple = new SimpleRemoteCallQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rcq_estado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rcq_tipo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rcq_url = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rcq_result = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rcq_fechaprograma = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rcq_fechaalta = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.rcq_fechamodificacion = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rcq_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3173, "RemoteCallQueue");
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
    if (Reader.FieldCount > 2)this._rcq_estado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._rcq_tipo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._rcq_url = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._rcq_result = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._rcq_fechaprograma = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._rcq_fechaalta = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)this._rcq_fechamodificacion = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)this._rcq_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    }
    Reader.Close();
    }
   }
  
    }
  