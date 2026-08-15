
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
     ///m_simcard data access layer   
     ///</summary>
    public class Dalm_simcard : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _sim_cuenta;
    
      private int _sim_apn;
    
      private int _sim_csid;
    
      private DateTime? _sim_fecha_activacion;
    
      private string _sim_iccid;
    
      private int _sim_marca;
    
      private int _sim_estado;
    
      private string _sim_codigo;
    
      private string _sim_observaciones;
    
      private string _sim_ClaveMaster;
    
      private int _sim_udw_idKey;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///sim_cuenta   
     ///</summary>
      public int sim_cuenta
      {
      
          get{ return this._sim_cuenta; }
          set{ this._sim_cuenta = value; }
        
      }
     ///<summary>
     ///sim_apn   
     ///</summary>
      public int sim_apn
      {
      
          get{ return this._sim_apn; }
          set{ this._sim_apn = value; }
        
      }
     ///<summary>
     ///sim_csid   
     ///</summary>
      public int sim_csid
      {
      
          get{ return this._sim_csid; }
          set{ this._sim_csid = value; }
        
      }
     ///<summary>
     ///sim_fecha_activacion   
     ///</summary>
      public DateTime? sim_fecha_activacion
      {
      
          get{ return this._sim_fecha_activacion; }
          set{ this._sim_fecha_activacion = value; }
        
      }
     ///<summary>
     ///sim_iccid   
     ///</summary>
      public string sim_iccid
      {
      
          get{ return this._sim_iccid; }
          set{ this._sim_iccid = value; }
        
      }
     ///<summary>
     ///sim_marca   
     ///</summary>
      public int sim_marca
      {
      
          get{ return this._sim_marca; }
          set{ this._sim_marca = value; }
        
      }
     ///<summary>
     ///sim_estado   
     ///</summary>
      public int sim_estado
      {
      
          get{ return this._sim_estado; }
          set{ this._sim_estado = value; }
        
      }
     ///<summary>
     ///sim_codigo   
     ///</summary>
      public string sim_codigo
      {
      
          get{ return this._sim_codigo; }
          set{ this._sim_codigo = value; }
        
      }
     ///<summary>
     ///sim_observaciones   
     ///</summary>
      public string sim_observaciones
      {
      
          get{ return this._sim_observaciones; }
          set{ this._sim_observaciones = value; }
        
      }
     ///<summary>
     ///sim_ClaveMaster   
     ///</summary>
      public string sim_ClaveMaster
      {
      
          get{ return this._sim_ClaveMaster; }
          set{ this._sim_ClaveMaster = value; }
        
      }
     ///<summary>
     ///sim_udw_idKey   
     ///</summary>
      public int sim_udw_idKey
      {
      
          get{ return this._sim_udw_idKey; }
          set{ this._sim_udw_idKey = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_simcard(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_simcard(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_simcard(SqlHelper SqlConfig, int UserId, Simplem_simcard Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sim_cuenta = Simple.sim_cuenta;

      this._sim_apn = Simple.sim_apn;

      this._sim_csid = Simple.sim_csid;

      this._sim_fecha_activacion = Simple.sim_fecha_activacion;

      this._sim_iccid = Simple.sim_iccid;

      this._sim_marca = Simple.sim_marca;

      this._sim_estado = Simple.sim_estado;

      this._sim_codigo = Simple.sim_codigo;

      this._sim_observaciones = Simple.sim_observaciones;

      this._sim_ClaveMaster = Simple.sim_ClaveMaster;

      this._sim_udw_idKey = Simple.sim_udw_idKey;

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
    using(var cmd = new SqlCommand("m_simcardIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sim_cuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_apn", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_csid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_fecha_activacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sim_iccid", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_marca", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_observaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_ClaveMaster", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_udw_idKey", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sim_cuenta"].Value = this._sim_cuenta;

		cmd.Parameters["@sim_apn"].Value = this._sim_apn;

		cmd.Parameters["@sim_csid"].Value = this._sim_csid;

		cmd.Parameters["@sim_fecha_activacion"].Value = (this._sim_fecha_activacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sim_fecha_activacion;

		cmd.Parameters["@sim_iccid"].Value = (this._sim_iccid == null) ? (object) DBNull.Value : (object) this._sim_iccid;

		cmd.Parameters["@sim_marca"].Value = this._sim_marca;

		cmd.Parameters["@sim_estado"].Value = this._sim_estado;

		cmd.Parameters["@sim_codigo"].Value = (this._sim_codigo == null) ? (object) DBNull.Value : (object) this._sim_codigo;

		cmd.Parameters["@sim_observaciones"].Value = (this._sim_observaciones == null) ? (object) DBNull.Value : (object) this._sim_observaciones;

		cmd.Parameters["@sim_ClaveMaster"].Value = (this._sim_ClaveMaster == null) ? (object) DBNull.Value : (object) this._sim_ClaveMaster;

		cmd.Parameters["@sim_udw_idKey"].Value = this._sim_udw_idKey;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_simcardUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sim_cuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_apn", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_csid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_fecha_activacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sim_iccid", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_marca", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_observaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_ClaveMaster", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_udw_idKey", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sim_cuenta"].Value = this._sim_cuenta;

		cmd.Parameters["@sim_apn"].Value = this._sim_apn;

		cmd.Parameters["@sim_csid"].Value = this._sim_csid;

		cmd.Parameters["@sim_fecha_activacion"].Value = (this._sim_fecha_activacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sim_fecha_activacion;

		cmd.Parameters["@sim_iccid"].Value = (this._sim_iccid == null) ? (object) DBNull.Value : (object) this._sim_iccid;

		cmd.Parameters["@sim_marca"].Value = this._sim_marca;

		cmd.Parameters["@sim_estado"].Value = this._sim_estado;

		cmd.Parameters["@sim_codigo"].Value = (this._sim_codigo == null) ? (object) DBNull.Value : (object) this._sim_codigo;

		cmd.Parameters["@sim_observaciones"].Value = (this._sim_observaciones == null) ? (object) DBNull.Value : (object) this._sim_observaciones;

		cmd.Parameters["@sim_ClaveMaster"].Value = (this._sim_ClaveMaster == null) ? (object) DBNull.Value : (object) this._sim_ClaveMaster;

		cmd.Parameters["@sim_udw_idKey"].Value = this._sim_udw_idKey;

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
    throw new RuntimeException("The m_simcard is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_simcardDel", conn))
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
    using(var CmdSel = new SqlCommand("m_simcardSel", conn))
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
    Simplem_simcard Simple = new Simplem_simcard();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.sim_cuenta = this._sim_cuenta;

      Simple.sim_apn = this._sim_apn;

      Simple.sim_csid = this._sim_csid;

      Simple.sim_fecha_activacion = this._sim_fecha_activacion;

      Simple.sim_iccid = this._sim_iccid;

      Simple.sim_marca = this._sim_marca;

      Simple.sim_estado = this._sim_estado;

      Simple.sim_codigo = this._sim_codigo;

      Simple.sim_observaciones = this._sim_observaciones;

      Simple.sim_ClaveMaster = this._sim_ClaveMaster;

      Simple.sim_udw_idKey = this._sim_udw_idKey;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_simcard)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sim_cuenta = Simple.sim_cuenta;

      this._sim_apn = Simple.sim_apn;

      this._sim_csid = Simple.sim_csid;

      this._sim_fecha_activacion = Simple.sim_fecha_activacion;

      this._sim_iccid = Simple.sim_iccid;

      this._sim_marca = Simple.sim_marca;

      this._sim_estado = Simple.sim_estado;

      this._sim_codigo = Simple.sim_codigo;

      this._sim_observaciones = Simple.sim_observaciones;

      this._sim_ClaveMaster = Simple.sim_ClaveMaster;

      this._sim_udw_idKey = Simple.sim_udw_idKey;

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
    Callerm_simcard Caller = new Callerm_simcard();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.sim_cuenta = this._sim_cuenta;

      Caller.sim_apn = this._sim_apn;

      Caller.sim_csid = this._sim_csid;

      Caller.sim_fecha_activacion = this._sim_fecha_activacion;

      Caller.sim_iccid = this._sim_iccid;

      Caller.sim_marca = this._sim_marca;

      Caller.sim_estado = this._sim_estado;

      Caller.sim_codigo = this._sim_codigo;

      Caller.sim_observaciones = this._sim_observaciones;

      Caller.sim_ClaveMaster = this._sim_ClaveMaster;

      Caller.sim_udw_idKey = this._sim_udw_idKey;

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
    
      dt.Columns.Add(new DataColumn("sim_cuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sim_apn", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sim_csid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sim_fecha_activacion", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("sim_iccid", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sim_marca", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sim_estado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sim_codigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sim_observaciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sim_ClaveMaster", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sim_udw_idKey", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["sim_cuenta"] = this._sim_cuenta;

      dr["sim_apn"] = this._sim_apn;

      dr["sim_csid"] = this._sim_csid;

      dr["sim_fecha_activacion"] = (object)this._sim_fecha_activacion  ?? DBNull.Value;

      dr["sim_iccid"] = this._sim_iccid;

      dr["sim_marca"] = this._sim_marca;

      dr["sim_estado"] = this._sim_estado;

      dr["sim_codigo"] = this._sim_codigo;

      dr["sim_observaciones"] = this._sim_observaciones;

      dr["sim_ClaveMaster"] = this._sim_ClaveMaster;

      dr["sim_udw_idKey"] = this._sim_udw_idKey;

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
    using(var CmdChilds = new SqlCommand("m_simcardByChildObject", conn))
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
    Simplem_simcard Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_simcardByChildObject", conn))
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
    Simple = new Simplem_simcard();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sim_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sim_apn = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.sim_csid = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.sim_fecha_activacion = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.sim_iccid = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sim_marca = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sim_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.sim_codigo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sim_observaciones = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sim_ClaveMaster = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sim_udw_idKey = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    Simplem_simcard Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_simcard();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.sim_cuenta = (Row["sim_cuenta"] == DBNull.Value) ? 0 : (int) Row["sim_cuenta"];

Simple.sim_apn = (Row["sim_apn"] == DBNull.Value) ? 0 : (int) Row["sim_apn"];

Simple.sim_csid = (Row["sim_csid"] == DBNull.Value) ? 0 : (int) Row["sim_csid"];

Simple.sim_fecha_activacion = (Row["sim_fecha_activacion"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["sim_fecha_activacion"];

Simple.sim_iccid = (Row["sim_iccid"] == DBNull.Value) ? "" : (string) Row["sim_iccid"];

Simple.sim_marca = (Row["sim_marca"] == DBNull.Value) ? 0 : (int) Row["sim_marca"];

Simple.sim_estado = (Row["sim_estado"] == DBNull.Value) ? 0 : (int) Row["sim_estado"];

Simple.sim_codigo = (Row["sim_codigo"] == DBNull.Value) ? "" : (string) Row["sim_codigo"];

Simple.sim_observaciones = (Row["sim_observaciones"] == DBNull.Value) ? "" : (string) Row["sim_observaciones"];

Simple.sim_ClaveMaster = (Row["sim_ClaveMaster"] == DBNull.Value) ? "" : (string) Row["sim_ClaveMaster"];

Simple.sim_udw_idKey = (Row["sim_udw_idKey"] == DBNull.Value) ? 0 : (int) Row["sim_udw_idKey"];


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
    using(var CmdParents = new SqlCommand("m_simcardByParentObject", conn))
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
    Simplem_simcard Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_simcardByParentObject", conn))
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
    Simple = new Simplem_simcard();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sim_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sim_apn = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.sim_csid = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.sim_fecha_activacion = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.sim_iccid = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sim_marca = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sim_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.sim_codigo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sim_observaciones = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sim_ClaveMaster = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sim_udw_idKey = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    using (var CmdDataByName = new SqlCommand("m_simcardByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_simcardByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_simcardByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_simcardByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_simcardByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_simcard Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_simcardBySimplem_simcard", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sim_cuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_apn", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_csid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_fecha_activacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@sim_iccid", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_marca", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sim_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_observaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_ClaveMaster", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sim_udw_idKey", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@sim_cuenta"].Value = this._sim_cuenta;

		cmd.Parameters["@sim_apn"].Value = this._sim_apn;

		cmd.Parameters["@sim_csid"].Value = this._sim_csid;

		cmd.Parameters["@sim_fecha_activacion"].Value = (this._sim_fecha_activacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._sim_fecha_activacion;

		cmd.Parameters["@sim_iccid"].Value = (this._sim_iccid == null) ? (object) DBNull.Value : (object) this._sim_iccid;

		cmd.Parameters["@sim_marca"].Value = this._sim_marca;

		cmd.Parameters["@sim_estado"].Value = this._sim_estado;

		cmd.Parameters["@sim_codigo"].Value = (this._sim_codigo == null) ? (object) DBNull.Value : (object) this._sim_codigo;

		cmd.Parameters["@sim_observaciones"].Value = (this._sim_observaciones == null) ? (object) DBNull.Value : (object) this._sim_observaciones;

		cmd.Parameters["@sim_ClaveMaster"].Value = (this._sim_ClaveMaster == null) ? (object) DBNull.Value : (object) this._sim_ClaveMaster;

		cmd.Parameters["@sim_udw_idKey"].Value = this._sim_udw_idKey;


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
		 
		public IEnumerable<Simplem_simcard> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_simcardByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_simcard Simple = new Simplem_simcard();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sim_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sim_apn = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.sim_csid = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.sim_fecha_activacion = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.sim_iccid = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sim_marca = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sim_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.sim_codigo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sim_observaciones = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sim_ClaveMaster = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sim_udw_idKey = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_simcard> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_simcardByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_simcard Simple = new Simplem_simcard();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sim_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sim_apn = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.sim_csid = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.sim_fecha_activacion = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.sim_iccid = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sim_marca = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.sim_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.sim_codigo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sim_observaciones = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sim_ClaveMaster = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sim_udw_idKey = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3233, "m_simcard");
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
    if (Reader.FieldCount > 2)this._sim_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._sim_apn = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._sim_csid = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._sim_fecha_activacion = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)this._sim_iccid = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._sim_marca = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._sim_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._sim_codigo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._sim_observaciones = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._sim_ClaveMaster = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._sim_udw_idKey = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    }
    Reader.Close();
    }
   }
  
    }
  