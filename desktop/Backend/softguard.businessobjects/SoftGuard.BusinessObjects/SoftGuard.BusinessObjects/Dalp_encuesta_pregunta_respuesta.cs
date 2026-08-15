
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
     ///p_encuesta_pregunta_respuesta data access layer   
     ///</summary>
    public class Dalp_encuesta_pregunta_respuesta : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _epr_epgidkey;
    
      private string _epr_cvalue;
    
      private int _epr_ivalue;
    
      private string _epr_cuser;
    
      private string _epr_itipousuario;
    
      private string _epr_cnombreusuario;
    
      private string _epr_cnombrecuenta;
    
      private int _epr_icuenta;
    
      private string _epr_ctelefono;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///epr_epgidkey   
     ///</summary>
      public int epr_epgidkey
      {
      
          get{ return this._epr_epgidkey; }
          set{ this._epr_epgidkey = value; }
        
      }
     ///<summary>
     ///epr_cvalue   
     ///</summary>
      public string epr_cvalue
      {
      
          get{ return this._epr_cvalue; }
          set{ this._epr_cvalue = value; }
        
      }
     ///<summary>
     ///epr_ivalue   
     ///</summary>
      public int epr_ivalue
      {
      
          get{ return this._epr_ivalue; }
          set{ this._epr_ivalue = value; }
        
      }
     ///<summary>
     ///epr_cuser   
     ///</summary>
      public string epr_cuser
      {
      
          get{ return this._epr_cuser; }
          set{ this._epr_cuser = value; }
        
      }
     ///<summary>
     ///epr_itipousuario   
     ///</summary>
      public string epr_itipousuario
      {
      
          get{ return this._epr_itipousuario; }
          set{ this._epr_itipousuario = value; }
        
      }
     ///<summary>
     ///epr_cnombreusuario   
     ///</summary>
      public string epr_cnombreusuario
      {
      
          get{ return this._epr_cnombreusuario; }
          set{ this._epr_cnombreusuario = value; }
        
      }
     ///<summary>
     ///epr_cnombrecuenta   
     ///</summary>
      public string epr_cnombrecuenta
      {
      
          get{ return this._epr_cnombrecuenta; }
          set{ this._epr_cnombrecuenta = value; }
        
      }
     ///<summary>
     ///epr_icuenta   
     ///</summary>
      public int epr_icuenta
      {
      
          get{ return this._epr_icuenta; }
          set{ this._epr_icuenta = value; }
        
      }
     ///<summary>
     ///epr_ctelefono   
     ///</summary>
      public string epr_ctelefono
      {
      
          get{ return this._epr_ctelefono; }
          set{ this._epr_ctelefono = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_encuesta_pregunta_respuesta(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_encuesta_pregunta_respuesta(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_encuesta_pregunta_respuesta(SqlHelper SqlConfig, int UserId, Simplep_encuesta_pregunta_respuesta Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._epr_epgidkey = Simple.epr_epgidkey;

      this._epr_cvalue = Simple.epr_cvalue;

      this._epr_ivalue = Simple.epr_ivalue;

      this._epr_cuser = Simple.epr_cuser;

      this._epr_itipousuario = Simple.epr_itipousuario;

      this._epr_cnombreusuario = Simple.epr_cnombreusuario;

      this._epr_cnombrecuenta = Simple.epr_cnombrecuenta;

      this._epr_icuenta = Simple.epr_icuenta;

      this._epr_ctelefono = Simple.epr_ctelefono;

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
    using(var cmd = new SqlCommand("p_encuesta_pregunta_respuestaIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@epr_epgidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_cvalue", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_ivalue", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_cuser", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_itipousuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_cnombreusuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_cnombrecuenta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_icuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_ctelefono", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@epr_epgidkey"].Value = this._epr_epgidkey;

		cmd.Parameters["@epr_cvalue"].Value = (this._epr_cvalue == null) ? (object) DBNull.Value : (object) this._epr_cvalue;

		cmd.Parameters["@epr_ivalue"].Value = this._epr_ivalue;

		cmd.Parameters["@epr_cuser"].Value = (this._epr_cuser == null) ? (object) DBNull.Value : (object) this._epr_cuser;

		cmd.Parameters["@epr_itipousuario"].Value = (this._epr_itipousuario == null) ? (object) DBNull.Value : (object) this._epr_itipousuario;

		cmd.Parameters["@epr_cnombreusuario"].Value = (this._epr_cnombreusuario == null) ? (object) DBNull.Value : (object) this._epr_cnombreusuario;

		cmd.Parameters["@epr_cnombrecuenta"].Value = (this._epr_cnombrecuenta == null) ? (object) DBNull.Value : (object) this._epr_cnombrecuenta;

		cmd.Parameters["@epr_icuenta"].Value = this._epr_icuenta;

		cmd.Parameters["@epr_ctelefono"].Value = (this._epr_ctelefono == null) ? (object) DBNull.Value : (object) this._epr_ctelefono;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_encuesta_pregunta_respuestaUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@epr_epgidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_cvalue", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_ivalue", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_cuser", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_itipousuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_cnombreusuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_cnombrecuenta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_icuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_ctelefono", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@epr_epgidkey"].Value = this._epr_epgidkey;

		cmd.Parameters["@epr_cvalue"].Value = (this._epr_cvalue == null) ? (object) DBNull.Value : (object) this._epr_cvalue;

		cmd.Parameters["@epr_ivalue"].Value = this._epr_ivalue;

		cmd.Parameters["@epr_cuser"].Value = (this._epr_cuser == null) ? (object) DBNull.Value : (object) this._epr_cuser;

		cmd.Parameters["@epr_itipousuario"].Value = (this._epr_itipousuario == null) ? (object) DBNull.Value : (object) this._epr_itipousuario;

		cmd.Parameters["@epr_cnombreusuario"].Value = (this._epr_cnombreusuario == null) ? (object) DBNull.Value : (object) this._epr_cnombreusuario;

		cmd.Parameters["@epr_cnombrecuenta"].Value = (this._epr_cnombrecuenta == null) ? (object) DBNull.Value : (object) this._epr_cnombrecuenta;

		cmd.Parameters["@epr_icuenta"].Value = this._epr_icuenta;

		cmd.Parameters["@epr_ctelefono"].Value = (this._epr_ctelefono == null) ? (object) DBNull.Value : (object) this._epr_ctelefono;

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
    throw new RuntimeException("The p_encuesta_pregunta_respuesta is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_encuesta_pregunta_respuestaDel", conn))
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
    using(var CmdSel = new SqlCommand("p_encuesta_pregunta_respuestaSel", conn))
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
    Simplep_encuesta_pregunta_respuesta Simple = new Simplep_encuesta_pregunta_respuesta();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.epr_epgidkey = this._epr_epgidkey;

      Simple.epr_cvalue = this._epr_cvalue;

      Simple.epr_ivalue = this._epr_ivalue;

      Simple.epr_cuser = this._epr_cuser;

      Simple.epr_itipousuario = this._epr_itipousuario;

      Simple.epr_cnombreusuario = this._epr_cnombreusuario;

      Simple.epr_cnombrecuenta = this._epr_cnombrecuenta;

      Simple.epr_icuenta = this._epr_icuenta;

      Simple.epr_ctelefono = this._epr_ctelefono;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_encuesta_pregunta_respuesta)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._epr_epgidkey = Simple.epr_epgidkey;

      this._epr_cvalue = Simple.epr_cvalue;

      this._epr_ivalue = Simple.epr_ivalue;

      this._epr_cuser = Simple.epr_cuser;

      this._epr_itipousuario = Simple.epr_itipousuario;

      this._epr_cnombreusuario = Simple.epr_cnombreusuario;

      this._epr_cnombrecuenta = Simple.epr_cnombrecuenta;

      this._epr_icuenta = Simple.epr_icuenta;

      this._epr_ctelefono = Simple.epr_ctelefono;

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
    Callerp_encuesta_pregunta_respuesta Caller = new Callerp_encuesta_pregunta_respuesta();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.epr_epgidkey = this._epr_epgidkey;

      Caller.epr_cvalue = this._epr_cvalue;

      Caller.epr_ivalue = this._epr_ivalue;

      Caller.epr_cuser = this._epr_cuser;

      Caller.epr_itipousuario = this._epr_itipousuario;

      Caller.epr_cnombreusuario = this._epr_cnombreusuario;

      Caller.epr_cnombrecuenta = this._epr_cnombrecuenta;

      Caller.epr_icuenta = this._epr_icuenta;

      Caller.epr_ctelefono = this._epr_ctelefono;

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
    
      dt.Columns.Add(new DataColumn("epr_epgidkey", typeof (int)));
    
      dt.Columns.Add(new DataColumn("epr_cvalue", typeof (string)));
    
      dt.Columns.Add(new DataColumn("epr_ivalue", typeof (int)));
    
      dt.Columns.Add(new DataColumn("epr_cuser", typeof (string)));
    
      dt.Columns.Add(new DataColumn("epr_itipousuario", typeof (string)));
    
      dt.Columns.Add(new DataColumn("epr_cnombreusuario", typeof (string)));
    
      dt.Columns.Add(new DataColumn("epr_cnombrecuenta", typeof (string)));
    
      dt.Columns.Add(new DataColumn("epr_icuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("epr_ctelefono", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["epr_epgidkey"] = this._epr_epgidkey;

      dr["epr_cvalue"] = this._epr_cvalue;

      dr["epr_ivalue"] = this._epr_ivalue;

      dr["epr_cuser"] = this._epr_cuser;

      dr["epr_itipousuario"] = this._epr_itipousuario;

      dr["epr_cnombreusuario"] = this._epr_cnombreusuario;

      dr["epr_cnombrecuenta"] = this._epr_cnombrecuenta;

      dr["epr_icuenta"] = this._epr_icuenta;

      dr["epr_ctelefono"] = this._epr_ctelefono;

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
    using(var CmdChilds = new SqlCommand("p_encuesta_pregunta_respuestaByChildObject", conn))
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
    Simplep_encuesta_pregunta_respuesta Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_encuesta_pregunta_respuestaByChildObject", conn))
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
    Simple = new Simplep_encuesta_pregunta_respuesta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.epr_epgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.epr_cvalue = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.epr_ivalue = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.epr_cuser = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.epr_itipousuario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.epr_cnombreusuario = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.epr_cnombrecuenta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.epr_icuenta = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.epr_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    Simplep_encuesta_pregunta_respuesta Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_encuesta_pregunta_respuesta();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.epr_epgidkey = (Row["epr_epgidkey"] == DBNull.Value) ? 0 : (int) Row["epr_epgidkey"];

Simple.epr_cvalue = (Row["epr_cvalue"] == DBNull.Value) ? "" : (string) Row["epr_cvalue"];

Simple.epr_ivalue = (Row["epr_ivalue"] == DBNull.Value) ? 0 : (int) Row["epr_ivalue"];

Simple.epr_cuser = (Row["epr_cuser"] == DBNull.Value) ? "" : (string) Row["epr_cuser"];

Simple.epr_itipousuario = (Row["epr_itipousuario"] == DBNull.Value) ? "" : (string) Row["epr_itipousuario"];

Simple.epr_cnombreusuario = (Row["epr_cnombreusuario"] == DBNull.Value) ? "" : (string) Row["epr_cnombreusuario"];

Simple.epr_cnombrecuenta = (Row["epr_cnombrecuenta"] == DBNull.Value) ? "" : (string) Row["epr_cnombrecuenta"];

Simple.epr_icuenta = (Row["epr_icuenta"] == DBNull.Value) ? 0 : (int) Row["epr_icuenta"];

Simple.epr_ctelefono = (Row["epr_ctelefono"] == DBNull.Value) ? "" : (string) Row["epr_ctelefono"];


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
    using(var CmdParents = new SqlCommand("p_encuesta_pregunta_respuestaByParentObject", conn))
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
    Simplep_encuesta_pregunta_respuesta Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_encuesta_pregunta_respuestaByParentObject", conn))
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
    Simple = new Simplep_encuesta_pregunta_respuesta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.epr_epgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.epr_cvalue = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.epr_ivalue = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.epr_cuser = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.epr_itipousuario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.epr_cnombreusuario = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.epr_cnombrecuenta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.epr_icuenta = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.epr_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    using (var CmdDataByName = new SqlCommand("p_encuesta_pregunta_respuestaByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_encuesta_pregunta_respuestaByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_encuesta_pregunta_respuestaByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_encuesta_pregunta_respuestaByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_encuesta_pregunta_respuestaByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_encuesta_pregunta_respuesta Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_encuesta_pregunta_respuestaBySimplep_encuesta_pregunta_respuesta", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@epr_epgidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_cvalue", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_ivalue", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_cuser", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_itipousuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_cnombreusuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_cnombrecuenta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@epr_icuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@epr_ctelefono", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@epr_epgidkey"].Value = this._epr_epgidkey;

		cmd.Parameters["@epr_cvalue"].Value = (this._epr_cvalue == null) ? (object) DBNull.Value : (object) this._epr_cvalue;

		cmd.Parameters["@epr_ivalue"].Value = this._epr_ivalue;

		cmd.Parameters["@epr_cuser"].Value = (this._epr_cuser == null) ? (object) DBNull.Value : (object) this._epr_cuser;

		cmd.Parameters["@epr_itipousuario"].Value = (this._epr_itipousuario == null) ? (object) DBNull.Value : (object) this._epr_itipousuario;

		cmd.Parameters["@epr_cnombreusuario"].Value = (this._epr_cnombreusuario == null) ? (object) DBNull.Value : (object) this._epr_cnombreusuario;

		cmd.Parameters["@epr_cnombrecuenta"].Value = (this._epr_cnombrecuenta == null) ? (object) DBNull.Value : (object) this._epr_cnombrecuenta;

		cmd.Parameters["@epr_icuenta"].Value = this._epr_icuenta;

		cmd.Parameters["@epr_ctelefono"].Value = (this._epr_ctelefono == null) ? (object) DBNull.Value : (object) this._epr_ctelefono;


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
		 
		public IEnumerable<Simplep_encuesta_pregunta_respuesta> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_encuesta_pregunta_respuestaByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_encuesta_pregunta_respuesta Simple = new Simplep_encuesta_pregunta_respuesta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.epr_epgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.epr_cvalue = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.epr_ivalue = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.epr_cuser = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.epr_itipousuario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.epr_cnombreusuario = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.epr_cnombrecuenta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.epr_icuenta = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.epr_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_encuesta_pregunta_respuesta> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_encuesta_pregunta_respuestaByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_encuesta_pregunta_respuesta Simple = new Simplep_encuesta_pregunta_respuesta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.epr_epgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.epr_cvalue = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.epr_ivalue = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.epr_cuser = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.epr_itipousuario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.epr_cnombreusuario = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.epr_cnombrecuenta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.epr_icuenta = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.epr_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3205, "p_encuesta_pregunta_respuesta");
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
    if (Reader.FieldCount > 2)this._epr_epgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._epr_cvalue = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._epr_ivalue = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._epr_cuser = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._epr_itipousuario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._epr_cnombreusuario = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._epr_cnombrecuenta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._epr_icuenta = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._epr_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    }
    Reader.Close();
    }
   }
  
    }
  