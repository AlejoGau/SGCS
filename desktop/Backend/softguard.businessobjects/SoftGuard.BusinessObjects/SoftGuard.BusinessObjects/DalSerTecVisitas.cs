
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
     ///SerTecVisitas data access layer   
     ///</summary>
    public class DalSerTecVisitas : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private DateTime? _svi_tFechaHora;
    
      private int _svi_iEstado;
    
      private int _svi_iServicio;
    
      private int _svi_iFormaDeViaje;
    
      private string _svi_cObservacion;
    
      private DateTime? _svi_tSalidaHaciaCliente;
    
      private DateTime? _svi_tArriboAlCliente;
    
      private DateTime? _svi_tSalidaDelCliente;
    
      private int _svi_iusuarioDss;
    
      private string _svi_cHorasPlanificadas;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///svi_tFechaHora   
     ///</summary>
      public DateTime? svi_tFechaHora
      {
      
          get{ return this._svi_tFechaHora; }
          set{ this._svi_tFechaHora = value; }
        
      }
     ///<summary>
     ///svi_iEstado   
     ///</summary>
      public int svi_iEstado
      {
      
          get{ return this._svi_iEstado; }
          set{ this._svi_iEstado = value; }
        
      }
     ///<summary>
     ///svi_iServicio   
     ///</summary>
      public int svi_iServicio
      {
      
          get{ return this._svi_iServicio; }
          set{ this._svi_iServicio = value; }
        
      }
     ///<summary>
     ///svi_iFormaDeViaje   
     ///</summary>
      public int svi_iFormaDeViaje
      {
      
          get{ return this._svi_iFormaDeViaje; }
          set{ this._svi_iFormaDeViaje = value; }
        
      }
     ///<summary>
     ///svi_cObservacion   
     ///</summary>
      public string svi_cObservacion
      {
      
          get{ return this._svi_cObservacion; }
          set{ this._svi_cObservacion = value; }
        
      }
     ///<summary>
     ///svi_tSalidaHaciaCliente   
     ///</summary>
      public DateTime? svi_tSalidaHaciaCliente
      {
      
          get{ return this._svi_tSalidaHaciaCliente; }
          set{ this._svi_tSalidaHaciaCliente = value; }
        
      }
     ///<summary>
     ///svi_tArriboAlCliente   
     ///</summary>
      public DateTime? svi_tArriboAlCliente
      {
      
          get{ return this._svi_tArriboAlCliente; }
          set{ this._svi_tArriboAlCliente = value; }
        
      }
     ///<summary>
     ///svi_tSalidaDelCliente   
     ///</summary>
      public DateTime? svi_tSalidaDelCliente
      {
      
          get{ return this._svi_tSalidaDelCliente; }
          set{ this._svi_tSalidaDelCliente = value; }
        
      }
     ///<summary>
     ///svi_iusuarioDss   
     ///</summary>
      public int svi_iusuarioDss
      {
      
          get{ return this._svi_iusuarioDss; }
          set{ this._svi_iusuarioDss = value; }
        
      }
     ///<summary>
     ///svi_cHorasPlanificadas   
     ///</summary>
      public string svi_cHorasPlanificadas
      {
      
          get{ return this._svi_cHorasPlanificadas; }
          set{ this._svi_cHorasPlanificadas = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSerTecVisitas(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSerTecVisitas(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSerTecVisitas(SqlHelper SqlConfig, int UserId, SimpleSerTecVisitas Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._svi_tFechaHora = Simple.svi_tFechaHora;

      this._svi_iEstado = Simple.svi_iEstado;

      this._svi_iServicio = Simple.svi_iServicio;

      this._svi_iFormaDeViaje = Simple.svi_iFormaDeViaje;

      this._svi_cObservacion = Simple.svi_cObservacion;

      this._svi_tSalidaHaciaCliente = Simple.svi_tSalidaHaciaCliente;

      this._svi_tArriboAlCliente = Simple.svi_tArriboAlCliente;

      this._svi_tSalidaDelCliente = Simple.svi_tSalidaDelCliente;

      this._svi_iusuarioDss = Simple.svi_iusuarioDss;

      this._svi_cHorasPlanificadas = Simple.svi_cHorasPlanificadas;

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
    using(var cmd = new SqlCommand("SerTecVisitasIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@svi_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_iEstado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_iServicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_iFormaDeViaje", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_cObservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svi_tSalidaHaciaCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_tArriboAlCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_tSalidaDelCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_iusuarioDss", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_cHorasPlanificadas", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@svi_tFechaHora"].Value = (this._svi_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tFechaHora;

		cmd.Parameters["@svi_iEstado"].Value = this._svi_iEstado;

		cmd.Parameters["@svi_iServicio"].Value = this._svi_iServicio;

		cmd.Parameters["@svi_iFormaDeViaje"].Value = this._svi_iFormaDeViaje;

		cmd.Parameters["@svi_cObservacion"].Value = (this._svi_cObservacion == null) ? (object) DBNull.Value : (object) this._svi_cObservacion;

		cmd.Parameters["@svi_tSalidaHaciaCliente"].Value = (this._svi_tSalidaHaciaCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tSalidaHaciaCliente;

		cmd.Parameters["@svi_tArriboAlCliente"].Value = (this._svi_tArriboAlCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tArriboAlCliente;

		cmd.Parameters["@svi_tSalidaDelCliente"].Value = (this._svi_tSalidaDelCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tSalidaDelCliente;

		cmd.Parameters["@svi_iusuarioDss"].Value = this._svi_iusuarioDss;

		cmd.Parameters["@svi_cHorasPlanificadas"].Value = (this._svi_cHorasPlanificadas == null) ? (object) DBNull.Value : (object) this._svi_cHorasPlanificadas;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SerTecVisitasUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@svi_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_iEstado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_iServicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_iFormaDeViaje", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_cObservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svi_tSalidaHaciaCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_tArriboAlCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_tSalidaDelCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_iusuarioDss", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_cHorasPlanificadas", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@svi_tFechaHora"].Value = (this._svi_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tFechaHora;

		cmd.Parameters["@svi_iEstado"].Value = this._svi_iEstado;

		cmd.Parameters["@svi_iServicio"].Value = this._svi_iServicio;

		cmd.Parameters["@svi_iFormaDeViaje"].Value = this._svi_iFormaDeViaje;

		cmd.Parameters["@svi_cObservacion"].Value = (this._svi_cObservacion == null) ? (object) DBNull.Value : (object) this._svi_cObservacion;

		cmd.Parameters["@svi_tSalidaHaciaCliente"].Value = (this._svi_tSalidaHaciaCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tSalidaHaciaCliente;

		cmd.Parameters["@svi_tArriboAlCliente"].Value = (this._svi_tArriboAlCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tArriboAlCliente;

		cmd.Parameters["@svi_tSalidaDelCliente"].Value = (this._svi_tSalidaDelCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tSalidaDelCliente;

		cmd.Parameters["@svi_iusuarioDss"].Value = this._svi_iusuarioDss;

		cmd.Parameters["@svi_cHorasPlanificadas"].Value = (this._svi_cHorasPlanificadas == null) ? (object) DBNull.Value : (object) this._svi_cHorasPlanificadas;

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
    throw new RuntimeException("The SerTecVisitas is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("SerTecVisitasDel", conn))
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
    using(var CmdSel = new SqlCommand("SerTecVisitasSel", conn))
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
    SimpleSerTecVisitas Simple = new SimpleSerTecVisitas();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.svi_tFechaHora = this._svi_tFechaHora;

      Simple.svi_iEstado = this._svi_iEstado;

      Simple.svi_iServicio = this._svi_iServicio;

      Simple.svi_iFormaDeViaje = this._svi_iFormaDeViaje;

      Simple.svi_cObservacion = this._svi_cObservacion;

      Simple.svi_tSalidaHaciaCliente = this._svi_tSalidaHaciaCliente;

      Simple.svi_tArriboAlCliente = this._svi_tArriboAlCliente;

      Simple.svi_tSalidaDelCliente = this._svi_tSalidaDelCliente;

      Simple.svi_iusuarioDss = this._svi_iusuarioDss;

      Simple.svi_cHorasPlanificadas = this._svi_cHorasPlanificadas;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleSerTecVisitas)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._svi_tFechaHora = Simple.svi_tFechaHora;

      this._svi_iEstado = Simple.svi_iEstado;

      this._svi_iServicio = Simple.svi_iServicio;

      this._svi_iFormaDeViaje = Simple.svi_iFormaDeViaje;

      this._svi_cObservacion = Simple.svi_cObservacion;

      this._svi_tSalidaHaciaCliente = Simple.svi_tSalidaHaciaCliente;

      this._svi_tArriboAlCliente = Simple.svi_tArriboAlCliente;

      this._svi_tSalidaDelCliente = Simple.svi_tSalidaDelCliente;

      this._svi_iusuarioDss = Simple.svi_iusuarioDss;

      this._svi_cHorasPlanificadas = Simple.svi_cHorasPlanificadas;

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
    CallerSerTecVisitas Caller = new CallerSerTecVisitas();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.svi_tFechaHora = this._svi_tFechaHora;

      Caller.svi_iEstado = this._svi_iEstado;

      Caller.svi_iServicio = this._svi_iServicio;

      Caller.svi_iFormaDeViaje = this._svi_iFormaDeViaje;

      Caller.svi_cObservacion = this._svi_cObservacion;

      Caller.svi_tSalidaHaciaCliente = this._svi_tSalidaHaciaCliente;

      Caller.svi_tArriboAlCliente = this._svi_tArriboAlCliente;

      Caller.svi_tSalidaDelCliente = this._svi_tSalidaDelCliente;

      Caller.svi_iusuarioDss = this._svi_iusuarioDss;

      Caller.svi_cHorasPlanificadas = this._svi_cHorasPlanificadas;

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
    
      dt.Columns.Add(new DataColumn("svi_tFechaHora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("svi_iEstado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("svi_iServicio", typeof (int)));
    
      dt.Columns.Add(new DataColumn("svi_iFormaDeViaje", typeof (int)));
    
      dt.Columns.Add(new DataColumn("svi_cObservacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("svi_tSalidaHaciaCliente", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("svi_tArriboAlCliente", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("svi_tSalidaDelCliente", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("svi_iusuarioDss", typeof (int)));
    
      dt.Columns.Add(new DataColumn("svi_cHorasPlanificadas", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["svi_tFechaHora"] = (object)this._svi_tFechaHora  ?? DBNull.Value;

      dr["svi_iEstado"] = this._svi_iEstado;

      dr["svi_iServicio"] = this._svi_iServicio;

      dr["svi_iFormaDeViaje"] = this._svi_iFormaDeViaje;

      dr["svi_cObservacion"] = this._svi_cObservacion;

      dr["svi_tSalidaHaciaCliente"] = (object)this._svi_tSalidaHaciaCliente  ?? DBNull.Value;

      dr["svi_tArriboAlCliente"] = (object)this._svi_tArriboAlCliente  ?? DBNull.Value;

      dr["svi_tSalidaDelCliente"] = (object)this._svi_tSalidaDelCliente  ?? DBNull.Value;

      dr["svi_iusuarioDss"] = this._svi_iusuarioDss;

      dr["svi_cHorasPlanificadas"] = this._svi_cHorasPlanificadas;

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
    using(var CmdChilds = new SqlCommand("SerTecVisitasByChildObject", conn))
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
    SimpleSerTecVisitas Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("SerTecVisitasByChildObject", conn))
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
    Simple = new SimpleSerTecVisitas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svi_tFechaHora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.svi_iEstado = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svi_iServicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.svi_iFormaDeViaje = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.svi_cObservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svi_tSalidaHaciaCliente = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svi_tArriboAlCliente = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.svi_tSalidaDelCliente = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.svi_iusuarioDss = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.svi_cHorasPlanificadas = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);


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
    SimpleSerTecVisitas Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleSerTecVisitas();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.svi_tFechaHora = (Row["svi_tFechaHora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["svi_tFechaHora"];

Simple.svi_iEstado = (Row["svi_iEstado"] == DBNull.Value) ? 0 : (int) Row["svi_iEstado"];

Simple.svi_iServicio = (Row["svi_iServicio"] == DBNull.Value) ? 0 : (int) Row["svi_iServicio"];

Simple.svi_iFormaDeViaje = (Row["svi_iFormaDeViaje"] == DBNull.Value) ? 0 : (int) Row["svi_iFormaDeViaje"];

Simple.svi_cObservacion = (Row["svi_cObservacion"] == DBNull.Value) ? "" : (string) Row["svi_cObservacion"];

Simple.svi_tSalidaHaciaCliente = (Row["svi_tSalidaHaciaCliente"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["svi_tSalidaHaciaCliente"];

Simple.svi_tArriboAlCliente = (Row["svi_tArriboAlCliente"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["svi_tArriboAlCliente"];

Simple.svi_tSalidaDelCliente = (Row["svi_tSalidaDelCliente"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["svi_tSalidaDelCliente"];

Simple.svi_iusuarioDss = (Row["svi_iusuarioDss"] == DBNull.Value) ? 0 : (int) Row["svi_iusuarioDss"];

Simple.svi_cHorasPlanificadas = (Row["svi_cHorasPlanificadas"] == DBNull.Value) ? "" : (string) Row["svi_cHorasPlanificadas"];


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
    using(var CmdParents = new SqlCommand("SerTecVisitasByParentObject", conn))
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
    SimpleSerTecVisitas Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("SerTecVisitasByParentObject", conn))
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
    Simple = new SimpleSerTecVisitas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svi_tFechaHora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.svi_iEstado = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svi_iServicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.svi_iFormaDeViaje = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.svi_cObservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svi_tSalidaHaciaCliente = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svi_tArriboAlCliente = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.svi_tSalidaDelCliente = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.svi_iusuarioDss = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.svi_cHorasPlanificadas = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);


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
    using (var CmdDataByName = new SqlCommand("SerTecVisitasByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("SerTecVisitasByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("SerTecVisitasByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("SerTecVisitasByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("SerTecVisitasByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleSerTecVisitas Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SerTecVisitasBySimpleSerTecVisitas", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@svi_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_iEstado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_iServicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_iFormaDeViaje", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_cObservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@svi_tSalidaHaciaCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_tArriboAlCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_tSalidaDelCliente", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@svi_iusuarioDss", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@svi_cHorasPlanificadas", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@svi_tFechaHora"].Value = (this._svi_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tFechaHora;

		cmd.Parameters["@svi_iEstado"].Value = this._svi_iEstado;

		cmd.Parameters["@svi_iServicio"].Value = this._svi_iServicio;

		cmd.Parameters["@svi_iFormaDeViaje"].Value = this._svi_iFormaDeViaje;

		cmd.Parameters["@svi_cObservacion"].Value = (this._svi_cObservacion == null) ? (object) DBNull.Value : (object) this._svi_cObservacion;

		cmd.Parameters["@svi_tSalidaHaciaCliente"].Value = (this._svi_tSalidaHaciaCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tSalidaHaciaCliente;

		cmd.Parameters["@svi_tArriboAlCliente"].Value = (this._svi_tArriboAlCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tArriboAlCliente;

		cmd.Parameters["@svi_tSalidaDelCliente"].Value = (this._svi_tSalidaDelCliente == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._svi_tSalidaDelCliente;

		cmd.Parameters["@svi_iusuarioDss"].Value = this._svi_iusuarioDss;

		cmd.Parameters["@svi_cHorasPlanificadas"].Value = (this._svi_cHorasPlanificadas == null) ? (object) DBNull.Value : (object) this._svi_cHorasPlanificadas;


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
		 
		public IEnumerable<SimpleSerTecVisitas> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SerTecVisitasByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSerTecVisitas Simple = new SimpleSerTecVisitas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svi_tFechaHora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.svi_iEstado = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svi_iServicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.svi_iFormaDeViaje = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.svi_cObservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svi_tSalidaHaciaCliente = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svi_tArriboAlCliente = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.svi_tSalidaDelCliente = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.svi_iusuarioDss = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.svi_cHorasPlanificadas = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleSerTecVisitas> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SerTecVisitasByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSerTecVisitas Simple = new SimpleSerTecVisitas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.svi_tFechaHora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.svi_iEstado = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.svi_iServicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.svi_iFormaDeViaje = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.svi_cObservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.svi_tSalidaHaciaCliente = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.svi_tArriboAlCliente = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.svi_tSalidaDelCliente = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.svi_iusuarioDss = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.svi_cHorasPlanificadas = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3121, "SerTecVisitas");
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
    if (Reader.FieldCount > 2)this._svi_tFechaHora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)this._svi_iEstado = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._svi_iServicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._svi_iFormaDeViaje = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._svi_cObservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._svi_tSalidaHaciaCliente = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)this._svi_tArriboAlCliente = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)this._svi_tSalidaDelCliente = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)this._svi_iusuarioDss = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._svi_cHorasPlanificadas = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);

    }
    Reader.Close();
    }
   }
  
    }
  