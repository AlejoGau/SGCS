
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
     ///s_systemdata_clientes data access layer   
     ///</summary>
    public class Dals_systemdata_clientes : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private DateTime? _sdc_fecha;
    
      private string _sdc_code;
    
      private string _sdc_serial;
    
      private string _sdc_key_id;
    
      private string _sdc_secret;
    
      private int _sdc_client_id;
    
      private string _sdc_public;
    
      private string _sdc_data;
    
      private int _sdc_type;
    
      private string _sdc_log;
    
      private DateTime? _sdc_lastupdate;
    
      private int _sdc_status;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///sdc_fecha   
     ///</summary>
      public DateTime? sdc_fecha
      {
      
          get{ return this._sdc_fecha; }
          set{ this._sdc_fecha = value; }
        
      }
     ///<summary>
     ///sdc_code   
     ///</summary>
      public string sdc_code
      {
      
          get{ return this._sdc_code; }
          set{ this._sdc_code = value; }
        
      }
     ///<summary>
     ///sdc_serial   
     ///</summary>
      public string sdc_serial
      {
      
          get{ return this._sdc_serial; }
          set{ this._sdc_serial = value; }
        
      }
     ///<summary>
     ///sdc_key_id   
     ///</summary>
      public string sdc_key_id
      {
      
          get{ return this._sdc_key_id; }
          set{ this._sdc_key_id = value; }
        
      }
     ///<summary>
     ///sdc_secret   
     ///</summary>
      public string sdc_secret
      {
      
          get{ return this._sdc_secret; }
          set{ this._sdc_secret = value; }
        
      }
     ///<summary>
     ///sdc_client_id   
     ///</summary>
      public int sdc_client_id
      {
      
          get{ return this._sdc_client_id; }
          set{ this._sdc_client_id = value; }
        
      }
     ///<summary>
     ///sdc_public   
     ///</summary>
      public string sdc_public
      {
      
          get{ return this._sdc_public; }
          set{ this._sdc_public = value; }
        
      }
     ///<summary>
     ///sdc_data   
     ///</summary>
      public string sdc_data
      {
      
          get{ return this._sdc_data; }
          set{ this._sdc_data = value; }
        
      }
     ///<summary>
     ///sdc_type   
     ///</summary>
      public int sdc_type
      {
      
          get{ return this._sdc_type; }
          set{ this._sdc_type = value; }
        
      }
     ///<summary>
     ///sdc_log   
     ///</summary>
      public string sdc_log
      {
      
          get{ return this._sdc_log; }
          set{ this._sdc_log = value; }
        
      }
     ///<summary>
     ///sdc_lastupdate   
     ///</summary>
      public DateTime? sdc_lastupdate
      {
      
          get{ return this._sdc_lastupdate; }
          set{ this._sdc_lastupdate = value; }
        
      }
     ///<summary>
     ///sdc_status   
     ///</summary>
      public int sdc_status
      {
      
          get{ return this._sdc_status; }
          set{ this._sdc_status = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dals_systemdata_clientes(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dals_systemdata_clientes(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dals_systemdata_clientes(SqlHelper SqlConfig, int UserId, Simples_systemdata_clientes Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sdc_fecha = Simple.sdc_fecha;

      this._sdc_code = Simple.sdc_code;

      this._sdc_serial = Simple.sdc_serial;

      this._sdc_key_id = Simple.sdc_key_id;

      this._sdc_secret = Simple.sdc_secret;

      this._sdc_client_id = Simple.sdc_client_id;

      this._sdc_public = Simple.sdc_public;

      this._sdc_data = Simple.sdc_data;

      this._sdc_type = Simple.sdc_type;

      this._sdc_log = Simple.sdc_log;

      this._sdc_lastupdate = Simple.sdc_lastupdate;

      this._sdc_status = Simple.sdc_status;

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
    using(var cmd = new SqlCommand("s_systemdata_clientesIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sdc_fecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sdc_code", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_serial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_key_id", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_secret", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_client_id", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sdc_public", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_data", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_type", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sdc_log", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_lastupdate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sdc_status", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sdc_fecha"].Value = (this._sdc_fecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sdc_fecha;

		cmd.Parameters["@sdc_code"].Value = (this._sdc_code == null) ? (object) DBNull.Value : (object) this._sdc_code;

		cmd.Parameters["@sdc_serial"].Value = (this._sdc_serial == null) ? (object) DBNull.Value : (object) this._sdc_serial;

		cmd.Parameters["@sdc_key_id"].Value = (this._sdc_key_id == null) ? (object) DBNull.Value : (object) this._sdc_key_id;

		cmd.Parameters["@sdc_secret"].Value = (this._sdc_secret == null) ? (object) DBNull.Value : (object) this._sdc_secret;

		cmd.Parameters["@sdc_client_id"].Value = this._sdc_client_id;

		cmd.Parameters["@sdc_public"].Value = (this._sdc_public == null) ? (object) DBNull.Value : (object) this._sdc_public;

		cmd.Parameters["@sdc_data"].Value = (this._sdc_data == null) ? (object) DBNull.Value : (object) this._sdc_data;

		cmd.Parameters["@sdc_type"].Value = this._sdc_type;

		cmd.Parameters["@sdc_log"].Value = (this._sdc_log == null) ? (object) DBNull.Value : (object) this._sdc_log;

		cmd.Parameters["@sdc_lastupdate"].Value = (this._sdc_lastupdate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sdc_lastupdate;

		cmd.Parameters["@sdc_status"].Value = this._sdc_status;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("s_systemdata_clientesUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sdc_fecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sdc_code", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_serial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_key_id", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_secret", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_client_id", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sdc_public", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_data", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_type", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sdc_log", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_lastupdate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sdc_status", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sdc_fecha"].Value = (this._sdc_fecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sdc_fecha;

		cmd.Parameters["@sdc_code"].Value = (this._sdc_code == null) ? (object) DBNull.Value : (object) this._sdc_code;

		cmd.Parameters["@sdc_serial"].Value = (this._sdc_serial == null) ? (object) DBNull.Value : (object) this._sdc_serial;

		cmd.Parameters["@sdc_key_id"].Value = (this._sdc_key_id == null) ? (object) DBNull.Value : (object) this._sdc_key_id;

		cmd.Parameters["@sdc_secret"].Value = (this._sdc_secret == null) ? (object) DBNull.Value : (object) this._sdc_secret;

		cmd.Parameters["@sdc_client_id"].Value = this._sdc_client_id;

		cmd.Parameters["@sdc_public"].Value = (this._sdc_public == null) ? (object) DBNull.Value : (object) this._sdc_public;

		cmd.Parameters["@sdc_data"].Value = (this._sdc_data == null) ? (object) DBNull.Value : (object) this._sdc_data;

		cmd.Parameters["@sdc_type"].Value = this._sdc_type;

		cmd.Parameters["@sdc_log"].Value = (this._sdc_log == null) ? (object) DBNull.Value : (object) this._sdc_log;

		cmd.Parameters["@sdc_lastupdate"].Value = (this._sdc_lastupdate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sdc_lastupdate;

		cmd.Parameters["@sdc_status"].Value = this._sdc_status;

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
    throw new RuntimeException("The s_systemdata_clientes is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("s_systemdata_clientesDel", conn))
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
    using(var CmdSel = new SqlCommand("s_systemdata_clientesSel", conn))
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
    Simples_systemdata_clientes Simple = new Simples_systemdata_clientes();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.sdc_fecha = this._sdc_fecha;

      Simple.sdc_code = this._sdc_code;

      Simple.sdc_serial = this._sdc_serial;

      Simple.sdc_key_id = this._sdc_key_id;

      Simple.sdc_secret = this._sdc_secret;

      Simple.sdc_client_id = this._sdc_client_id;

      Simple.sdc_public = this._sdc_public;

      Simple.sdc_data = this._sdc_data;

      Simple.sdc_type = this._sdc_type;

      Simple.sdc_log = this._sdc_log;

      Simple.sdc_lastupdate = this._sdc_lastupdate;

      Simple.sdc_status = this._sdc_status;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simples_systemdata_clientes)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sdc_fecha = Simple.sdc_fecha;

      this._sdc_code = Simple.sdc_code;

      this._sdc_serial = Simple.sdc_serial;

      this._sdc_key_id = Simple.sdc_key_id;

      this._sdc_secret = Simple.sdc_secret;

      this._sdc_client_id = Simple.sdc_client_id;

      this._sdc_public = Simple.sdc_public;

      this._sdc_data = Simple.sdc_data;

      this._sdc_type = Simple.sdc_type;

      this._sdc_log = Simple.sdc_log;

      this._sdc_lastupdate = Simple.sdc_lastupdate;

      this._sdc_status = Simple.sdc_status;

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
    Callers_systemdata_clientes Caller = new Callers_systemdata_clientes();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.sdc_fecha = this._sdc_fecha;

      Caller.sdc_code = this._sdc_code;

      Caller.sdc_serial = this._sdc_serial;

      Caller.sdc_key_id = this._sdc_key_id;

      Caller.sdc_secret = this._sdc_secret;

      Caller.sdc_client_id = this._sdc_client_id;

      Caller.sdc_public = this._sdc_public;

      Caller.sdc_data = this._sdc_data;

      Caller.sdc_type = this._sdc_type;

      Caller.sdc_log = this._sdc_log;

      Caller.sdc_lastupdate = this._sdc_lastupdate;

      Caller.sdc_status = this._sdc_status;

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
    
      dt.Columns.Add(new DataColumn("sdc_fecha", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("sdc_code", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sdc_serial", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sdc_key_id", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sdc_secret", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sdc_client_id", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sdc_public", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sdc_data", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sdc_type", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sdc_log", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sdc_lastupdate", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("sdc_status", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["sdc_fecha"] = this._sdc_fecha;

      dr["sdc_code"] = this._sdc_code;

      dr["sdc_serial"] = this._sdc_serial;

      dr["sdc_key_id"] = this._sdc_key_id;

      dr["sdc_secret"] = this._sdc_secret;

      dr["sdc_client_id"] = this._sdc_client_id;

      dr["sdc_public"] = this._sdc_public;

      dr["sdc_data"] = this._sdc_data;

      dr["sdc_type"] = this._sdc_type;

      dr["sdc_log"] = this._sdc_log;

      dr["sdc_lastupdate"] = this._sdc_lastupdate;

      dr["sdc_status"] = this._sdc_status;

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
    using(var CmdChilds = new SqlCommand("s_systemdata_clientesByChildObject", conn))
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
    Simples_systemdata_clientes Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("s_systemdata_clientesByChildObject", conn))
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
    Simple = new Simples_systemdata_clientes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sdc_fecha = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.sdc_code = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sdc_serial = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sdc_key_id = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sdc_secret = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sdc_client_id = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sdc_public = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sdc_data = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sdc_type = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.sdc_log = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sdc_lastupdate = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.sdc_status = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    Simples_systemdata_clientes Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simples_systemdata_clientes();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.sdc_fecha = (Row["sdc_fecha"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["sdc_fecha"];

Simple.sdc_code = (Row["sdc_code"] == DBNull.Value) ? "" : (string) Row["sdc_code"];

Simple.sdc_serial = (Row["sdc_serial"] == DBNull.Value) ? "" : (string) Row["sdc_serial"];

Simple.sdc_key_id = (Row["sdc_key_id"] == DBNull.Value) ? "" : (string) Row["sdc_key_id"];

Simple.sdc_secret = (Row["sdc_secret"] == DBNull.Value) ? "" : (string) Row["sdc_secret"];

Simple.sdc_client_id = (Row["sdc_client_id"] == DBNull.Value) ? 0 : (int) Row["sdc_client_id"];

Simple.sdc_public = (Row["sdc_public"] == DBNull.Value) ? "" : (string) Row["sdc_public"];

Simple.sdc_data = (Row["sdc_data"] == DBNull.Value) ? "" : (string) Row["sdc_data"];

Simple.sdc_type = (Row["sdc_type"] == DBNull.Value) ? 0 : (int) Row["sdc_type"];

Simple.sdc_log = (Row["sdc_log"] == DBNull.Value) ? "" : (string) Row["sdc_log"];

Simple.sdc_lastupdate = (Row["sdc_lastupdate"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["sdc_lastupdate"];

Simple.sdc_status = (Row["sdc_status"] == DBNull.Value) ? 0 : (int) Row["sdc_status"];


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
    using(var CmdParents = new SqlCommand("s_systemdata_clientesByParentObject", conn))
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
    Simples_systemdata_clientes Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("s_systemdata_clientesByParentObject", conn))
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
    Simple = new Simples_systemdata_clientes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sdc_fecha = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.sdc_code = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sdc_serial = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sdc_key_id = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sdc_secret = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sdc_client_id = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sdc_public = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sdc_data = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sdc_type = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.sdc_log = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sdc_lastupdate = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.sdc_status = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    using (var CmdDataByName = new SqlCommand("s_systemdata_clientesByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("s_systemdata_clientesByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("s_systemdata_clientesByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("s_systemdata_clientesByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("s_systemdata_clientesByText", conn))
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
    public DataTable GetDataBySimpleObject(Simples_systemdata_clientes Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("s_systemdata_clientesBySimples_systemdata_clientes", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sdc_fecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sdc_code", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_serial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_key_id", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_secret", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_client_id", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sdc_public", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_data", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_type", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sdc_log", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sdc_lastupdate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sdc_status", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@sdc_fecha"].Value = (this._sdc_fecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sdc_fecha;

		cmd.Parameters["@sdc_code"].Value = (this._sdc_code == null) ? (object) DBNull.Value : (object) this._sdc_code;

		cmd.Parameters["@sdc_serial"].Value = (this._sdc_serial == null) ? (object) DBNull.Value : (object) this._sdc_serial;

		cmd.Parameters["@sdc_key_id"].Value = (this._sdc_key_id == null) ? (object) DBNull.Value : (object) this._sdc_key_id;

		cmd.Parameters["@sdc_secret"].Value = (this._sdc_secret == null) ? (object) DBNull.Value : (object) this._sdc_secret;

		cmd.Parameters["@sdc_client_id"].Value = this._sdc_client_id;

		cmd.Parameters["@sdc_public"].Value = (this._sdc_public == null) ? (object) DBNull.Value : (object) this._sdc_public;

		cmd.Parameters["@sdc_data"].Value = (this._sdc_data == null) ? (object) DBNull.Value : (object) this._sdc_data;

		cmd.Parameters["@sdc_type"].Value = this._sdc_type;

		cmd.Parameters["@sdc_log"].Value = (this._sdc_log == null) ? (object) DBNull.Value : (object) this._sdc_log;

		cmd.Parameters["@sdc_lastupdate"].Value = (this._sdc_lastupdate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sdc_lastupdate;

		cmd.Parameters["@sdc_status"].Value = this._sdc_status;


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
		 
		public IEnumerable<Simples_systemdata_clientes> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("s_systemdata_clientesByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simples_systemdata_clientes Simple = new Simples_systemdata_clientes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sdc_fecha = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.sdc_code = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sdc_serial = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sdc_key_id = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sdc_secret = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sdc_client_id = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sdc_public = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sdc_data = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sdc_type = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.sdc_log = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sdc_lastupdate = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.sdc_status = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simples_systemdata_clientes> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("s_systemdata_clientesByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simples_systemdata_clientes Simple = new Simples_systemdata_clientes();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sdc_fecha = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.sdc_code = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sdc_serial = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sdc_key_id = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sdc_secret = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sdc_client_id = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sdc_public = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sdc_data = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sdc_type = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.sdc_log = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sdc_lastupdate = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.sdc_status = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3166, "s_systemdata_clientes");
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
    if (Reader.FieldCount > 2)this._sdc_fecha = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)this._sdc_code = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._sdc_serial = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._sdc_key_id = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._sdc_secret = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._sdc_client_id = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._sdc_public = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._sdc_data = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._sdc_type = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._sdc_log = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._sdc_lastupdate = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)this._sdc_status = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    }
    Reader.Close();
    }
   }
  
    }
  