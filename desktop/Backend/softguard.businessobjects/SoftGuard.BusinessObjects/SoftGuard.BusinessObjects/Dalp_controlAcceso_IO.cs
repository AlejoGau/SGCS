
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
     ///p_controlAcceso_IO data access layer   
     ///</summary>
    public class Dalp_controlAcceso_IO : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _cac_tipoacceso;
    
      private int _cac_idpuerta;
    
      private DateTime? _cac_fecha;
    
      private int _cac_idautorizado;
    
      private int _cac_autorizatipo;
    
      private int _cac_autorizaid;
    
      private string _cac_autorizacodigo;
    
      private string _cac_cobservacion;
    
      private int _cac_autorizadotipoid;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cac_tipoacceso   
     ///</summary>
      public int cac_tipoacceso
      {
      
          get{ return this._cac_tipoacceso; }
          set{ this._cac_tipoacceso = value; }
        
      }
     ///<summary>
     ///cac_idpuerta   
     ///</summary>
      public int cac_idpuerta
      {
      
          get{ return this._cac_idpuerta; }
          set{ this._cac_idpuerta = value; }
        
      }
     ///<summary>
     ///cac_fecha   
     ///</summary>
      public DateTime? cac_fecha
      {
      
          get{ return this._cac_fecha; }
          set{ this._cac_fecha = value; }
        
      }
     ///<summary>
     ///cac_idautorizado   
     ///</summary>
      public int cac_idautorizado
      {
      
          get{ return this._cac_idautorizado; }
          set{ this._cac_idautorizado = value; }
        
      }
     ///<summary>
     ///cac_autorizatipo   
     ///</summary>
      public int cac_autorizatipo
      {
      
          get{ return this._cac_autorizatipo; }
          set{ this._cac_autorizatipo = value; }
        
      }
     ///<summary>
     ///cac_autorizaid   
     ///</summary>
      public int cac_autorizaid
      {
      
          get{ return this._cac_autorizaid; }
          set{ this._cac_autorizaid = value; }
        
      }
     ///<summary>
     ///cac_autorizacodigo   
     ///</summary>
      public string cac_autorizacodigo
      {
      
          get{ return this._cac_autorizacodigo; }
          set{ this._cac_autorizacodigo = value; }
        
      }
     ///<summary>
     ///cac_cobservacion   
     ///</summary>
      public string cac_cobservacion
      {
      
          get{ return this._cac_cobservacion; }
          set{ this._cac_cobservacion = value; }
        
      }
     ///<summary>
     ///cac_autorizadotipoid   
     ///</summary>
      public int cac_autorizadotipoid
      {
      
          get{ return this._cac_autorizadotipoid; }
          set{ this._cac_autorizadotipoid = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_controlAcceso_IO(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_controlAcceso_IO(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_controlAcceso_IO(SqlHelper SqlConfig, int UserId, Simplep_controlAcceso_IO Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cac_tipoacceso = Simple.cac_tipoacceso;

      this._cac_idpuerta = Simple.cac_idpuerta;

      this._cac_fecha = Simple.cac_fecha;

      this._cac_idautorizado = Simple.cac_idautorizado;

      this._cac_autorizatipo = Simple.cac_autorizatipo;

      this._cac_autorizaid = Simple.cac_autorizaid;

      this._cac_autorizacodigo = Simple.cac_autorizacodigo;

      this._cac_cobservacion = Simple.cac_cobservacion;

      this._cac_autorizadotipoid = Simple.cac_autorizadotipoid;

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
    using(var cmd = new SqlCommand("p_controlAcceso_IOIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cac_tipoacceso", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_idpuerta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_fecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cac_idautorizado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizatipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizaid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizacodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cac_cobservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cac_autorizadotipoid", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cac_tipoacceso"].Value = this._cac_tipoacceso;

		cmd.Parameters["@cac_idpuerta"].Value = this._cac_idpuerta;

		cmd.Parameters["@cac_fecha"].Value = (this._cac_fecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cac_fecha;

		cmd.Parameters["@cac_idautorizado"].Value = this._cac_idautorizado;

		cmd.Parameters["@cac_autorizatipo"].Value = this._cac_autorizatipo;

		cmd.Parameters["@cac_autorizaid"].Value = this._cac_autorizaid;

		cmd.Parameters["@cac_autorizacodigo"].Value = (this._cac_autorizacodigo == null) ? (object) DBNull.Value : (object) this._cac_autorizacodigo;

		cmd.Parameters["@cac_cobservacion"].Value = (this._cac_cobservacion == null) ? (object) DBNull.Value : (object) this._cac_cobservacion;

		cmd.Parameters["@cac_autorizadotipoid"].Value = this._cac_autorizadotipoid;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_controlAcceso_IOUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cac_tipoacceso", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_idpuerta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_fecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cac_idautorizado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizatipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizaid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizacodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cac_cobservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cac_autorizadotipoid", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cac_tipoacceso"].Value = this._cac_tipoacceso;

		cmd.Parameters["@cac_idpuerta"].Value = this._cac_idpuerta;

		cmd.Parameters["@cac_fecha"].Value = (this._cac_fecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cac_fecha;

		cmd.Parameters["@cac_idautorizado"].Value = this._cac_idautorizado;

		cmd.Parameters["@cac_autorizatipo"].Value = this._cac_autorizatipo;

		cmd.Parameters["@cac_autorizaid"].Value = this._cac_autorizaid;

		cmd.Parameters["@cac_autorizacodigo"].Value = (this._cac_autorizacodigo == null) ? (object) DBNull.Value : (object) this._cac_autorizacodigo;

		cmd.Parameters["@cac_cobservacion"].Value = (this._cac_cobservacion == null) ? (object) DBNull.Value : (object) this._cac_cobservacion;

		cmd.Parameters["@cac_autorizadotipoid"].Value = this._cac_autorizadotipoid;

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
    throw new RuntimeException("The p_controlAcceso_IO is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_controlAcceso_IODel", conn))
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
    using(var CmdSel = new SqlCommand("p_controlAcceso_IOSel", conn))
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
    Simplep_controlAcceso_IO Simple = new Simplep_controlAcceso_IO();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cac_tipoacceso = this._cac_tipoacceso;

      Simple.cac_idpuerta = this._cac_idpuerta;

      Simple.cac_fecha = this._cac_fecha;

      Simple.cac_idautorizado = this._cac_idautorizado;

      Simple.cac_autorizatipo = this._cac_autorizatipo;

      Simple.cac_autorizaid = this._cac_autorizaid;

      Simple.cac_autorizacodigo = this._cac_autorizacodigo;

      Simple.cac_cobservacion = this._cac_cobservacion;

      Simple.cac_autorizadotipoid = this._cac_autorizadotipoid;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_controlAcceso_IO)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cac_tipoacceso = Simple.cac_tipoacceso;

      this._cac_idpuerta = Simple.cac_idpuerta;

      this._cac_fecha = Simple.cac_fecha;

      this._cac_idautorizado = Simple.cac_idautorizado;

      this._cac_autorizatipo = Simple.cac_autorizatipo;

      this._cac_autorizaid = Simple.cac_autorizaid;

      this._cac_autorizacodigo = Simple.cac_autorizacodigo;

      this._cac_cobservacion = Simple.cac_cobservacion;

      this._cac_autorizadotipoid = Simple.cac_autorizadotipoid;

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
    Callerp_controlAcceso_IO Caller = new Callerp_controlAcceso_IO();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cac_tipoacceso = this._cac_tipoacceso;

      Caller.cac_idpuerta = this._cac_idpuerta;

      Caller.cac_fecha = this._cac_fecha;

      Caller.cac_idautorizado = this._cac_idautorizado;

      Caller.cac_autorizatipo = this._cac_autorizatipo;

      Caller.cac_autorizaid = this._cac_autorizaid;

      Caller.cac_autorizacodigo = this._cac_autorizacodigo;

      Caller.cac_cobservacion = this._cac_cobservacion;

      Caller.cac_autorizadotipoid = this._cac_autorizadotipoid;

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
    
      dt.Columns.Add(new DataColumn("cac_tipoacceso", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cac_idpuerta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cac_fecha", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cac_idautorizado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cac_autorizatipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cac_autorizaid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cac_autorizacodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cac_cobservacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cac_autorizadotipoid", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cac_tipoacceso"] = this._cac_tipoacceso;

      dr["cac_idpuerta"] = this._cac_idpuerta;

      dr["cac_fecha"] = (object)this._cac_fecha  ?? DBNull.Value;

      dr["cac_idautorizado"] = this._cac_idautorizado;

      dr["cac_autorizatipo"] = this._cac_autorizatipo;

      dr["cac_autorizaid"] = this._cac_autorizaid;

      dr["cac_autorizacodigo"] = this._cac_autorizacodigo;

      dr["cac_cobservacion"] = this._cac_cobservacion;

      dr["cac_autorizadotipoid"] = this._cac_autorizadotipoid;

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
    using(var CmdChilds = new SqlCommand("p_controlAcceso_IOByChildObject", conn))
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
    Simplep_controlAcceso_IO Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_controlAcceso_IOByChildObject", conn))
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
    Simple = new Simplep_controlAcceso_IO();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cac_tipoacceso = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cac_idpuerta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cac_fecha = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cac_idautorizado = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cac_autorizatipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cac_autorizaid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cac_autorizacodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cac_cobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cac_autorizadotipoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);


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
    Simplep_controlAcceso_IO Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_controlAcceso_IO();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cac_tipoacceso = (Row["cac_tipoacceso"] == DBNull.Value) ? 0 : (int) Row["cac_tipoacceso"];

Simple.cac_idpuerta = (Row["cac_idpuerta"] == DBNull.Value) ? 0 : (int) Row["cac_idpuerta"];

Simple.cac_fecha = (Row["cac_fecha"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cac_fecha"];

Simple.cac_idautorizado = (Row["cac_idautorizado"] == DBNull.Value) ? 0 : (int) Row["cac_idautorizado"];

Simple.cac_autorizatipo = (Row["cac_autorizatipo"] == DBNull.Value) ? 0 : (int) Row["cac_autorizatipo"];

Simple.cac_autorizaid = (Row["cac_autorizaid"] == DBNull.Value) ? 0 : (int) Row["cac_autorizaid"];

Simple.cac_autorizacodigo = (Row["cac_autorizacodigo"] == DBNull.Value) ? "" : (string) Row["cac_autorizacodigo"];

Simple.cac_cobservacion = (Row["cac_cobservacion"] == DBNull.Value) ? "" : (string) Row["cac_cobservacion"];

Simple.cac_autorizadotipoid = (Row["cac_autorizadotipoid"] == DBNull.Value) ? 0 : (int) Row["cac_autorizadotipoid"];


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
    using(var CmdParents = new SqlCommand("p_controlAcceso_IOByParentObject", conn))
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
    Simplep_controlAcceso_IO Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_controlAcceso_IOByParentObject", conn))
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
    Simple = new Simplep_controlAcceso_IO();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cac_tipoacceso = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cac_idpuerta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cac_fecha = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cac_idautorizado = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cac_autorizatipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cac_autorizaid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cac_autorizacodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cac_cobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cac_autorizadotipoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);


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
    using (var CmdDataByName = new SqlCommand("p_controlAcceso_IOByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_controlAcceso_IOByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_controlAcceso_IOByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_controlAcceso_IOByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_controlAcceso_IOByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_controlAcceso_IO Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_controlAcceso_IOBySimplep_controlAcceso_IO", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cac_tipoacceso", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_idpuerta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_fecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cac_idautorizado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizatipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizaid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cac_autorizacodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cac_cobservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cac_autorizadotipoid", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cac_tipoacceso"].Value = this._cac_tipoacceso;

		cmd.Parameters["@cac_idpuerta"].Value = this._cac_idpuerta;

		cmd.Parameters["@cac_fecha"].Value = (this._cac_fecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cac_fecha;

		cmd.Parameters["@cac_idautorizado"].Value = this._cac_idautorizado;

		cmd.Parameters["@cac_autorizatipo"].Value = this._cac_autorizatipo;

		cmd.Parameters["@cac_autorizaid"].Value = this._cac_autorizaid;

		cmd.Parameters["@cac_autorizacodigo"].Value = (this._cac_autorizacodigo == null) ? (object) DBNull.Value : (object) this._cac_autorizacodigo;

		cmd.Parameters["@cac_cobservacion"].Value = (this._cac_cobservacion == null) ? (object) DBNull.Value : (object) this._cac_cobservacion;

		cmd.Parameters["@cac_autorizadotipoid"].Value = this._cac_autorizadotipoid;


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
		 
		public IEnumerable<Simplep_controlAcceso_IO> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_controlAcceso_IOByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_controlAcceso_IO Simple = new Simplep_controlAcceso_IO();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cac_tipoacceso = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cac_idpuerta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cac_fecha = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cac_idautorizado = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cac_autorizatipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cac_autorizaid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cac_autorizacodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cac_cobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cac_autorizadotipoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_controlAcceso_IO> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_controlAcceso_IOByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_controlAcceso_IO Simple = new Simplep_controlAcceso_IO();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cac_tipoacceso = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cac_idpuerta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cac_fecha = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cac_idautorizado = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cac_autorizatipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cac_autorizaid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cac_autorizacodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cac_cobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cac_autorizadotipoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3208, "p_controlAcceso_IO");
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
    if (Reader.FieldCount > 2)this._cac_tipoacceso = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._cac_idpuerta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._cac_fecha = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._cac_idautorizado = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._cac_autorizatipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._cac_autorizaid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._cac_autorizacodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._cac_cobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._cac_autorizadotipoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);

    }
    Reader.Close();
    }
   }
  
    }
  