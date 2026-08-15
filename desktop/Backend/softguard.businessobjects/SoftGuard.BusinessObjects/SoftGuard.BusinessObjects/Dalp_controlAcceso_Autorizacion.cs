
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
     ///p_controlAcceso_Autorizacion data access layer   
     ///</summary>
    public class Dalp_controlAcceso_Autorizacion : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _caa_idautorizado;
    
      private int _caa_tipo;
    
      private DateTime? _caa_fechadesde;
    
      private DateTime? _caa_fechahasta;
    
      private int _caa_diasemana;
    
      private string _caa_horadesde;
    
      private string _caa_horahasta;
    
      private int _caa_estado;
    
      private string _caa_codigo;
    
      private int _caa_usuautoriza;
    
      private string _caa_marcavehiculo;
    
      private string _caa_patenteVehiculo;
    
      private int _caa_tipoVisita;
    
      private string _caa_comentarios;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///caa_idautorizado   
     ///</summary>
      public int caa_idautorizado
      {
      
          get{ return this._caa_idautorizado; }
          set{ this._caa_idautorizado = value; }
        
      }
     ///<summary>
     ///caa_tipo   
     ///</summary>
      public int caa_tipo
      {
      
          get{ return this._caa_tipo; }
          set{ this._caa_tipo = value; }
        
      }
     ///<summary>
     ///caa_fechadesde   
     ///</summary>
      public DateTime? caa_fechadesde
      {
      
          get{ return this._caa_fechadesde; }
          set{ this._caa_fechadesde = value; }
        
      }
     ///<summary>
     ///caa_fechahasta   
     ///</summary>
      public DateTime? caa_fechahasta
      {
      
          get{ return this._caa_fechahasta; }
          set{ this._caa_fechahasta = value; }
        
      }
     ///<summary>
     ///caa_diasemana   
     ///</summary>
      public int caa_diasemana
      {
      
          get{ return this._caa_diasemana; }
          set{ this._caa_diasemana = value; }
        
      }
     ///<summary>
     ///caa_horadesde   
     ///</summary>
      public string caa_horadesde
      {
      
          get{ return this._caa_horadesde; }
          set{ this._caa_horadesde = value; }
        
      }
     ///<summary>
     ///caa_horahasta   
     ///</summary>
      public string caa_horahasta
      {
      
          get{ return this._caa_horahasta; }
          set{ this._caa_horahasta = value; }
        
      }
     ///<summary>
     ///caa_estado   
     ///</summary>
      public int caa_estado
      {
      
          get{ return this._caa_estado; }
          set{ this._caa_estado = value; }
        
      }
     ///<summary>
     ///caa_codigo   
     ///</summary>
      public string caa_codigo
      {
      
          get{ return this._caa_codigo; }
          set{ this._caa_codigo = value; }
        
      }
     ///<summary>
     ///caa_usuautoriza   
     ///</summary>
      public int caa_usuautoriza
      {
      
          get{ return this._caa_usuautoriza; }
          set{ this._caa_usuautoriza = value; }
        
      }
     ///<summary>
     ///caa_marcavehiculo   
     ///</summary>
      public string caa_marcavehiculo
      {
      
          get{ return this._caa_marcavehiculo; }
          set{ this._caa_marcavehiculo = value; }
        
      }
     ///<summary>
     ///caa_patenteVehiculo   
     ///</summary>
      public string caa_patenteVehiculo
      {
      
          get{ return this._caa_patenteVehiculo; }
          set{ this._caa_patenteVehiculo = value; }
        
      }
     ///<summary>
     ///caa_tipoVisita   
     ///</summary>
      public int caa_tipoVisita
      {
      
          get{ return this._caa_tipoVisita; }
          set{ this._caa_tipoVisita = value; }
        
      }
     ///<summary>
     ///caa_comentarios   
     ///</summary>
      public string caa_comentarios
      {
      
          get{ return this._caa_comentarios; }
          set{ this._caa_comentarios = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_controlAcceso_Autorizacion(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_controlAcceso_Autorizacion(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_controlAcceso_Autorizacion(SqlHelper SqlConfig, int UserId, Simplep_controlAcceso_Autorizacion Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._caa_idautorizado = Simple.caa_idautorizado;

      this._caa_tipo = Simple.caa_tipo;

      this._caa_fechadesde = Simple.caa_fechadesde;

      this._caa_fechahasta = Simple.caa_fechahasta;

      this._caa_diasemana = Simple.caa_diasemana;

      this._caa_horadesde = Simple.caa_horadesde;

      this._caa_horahasta = Simple.caa_horahasta;

      this._caa_estado = Simple.caa_estado;

      this._caa_codigo = Simple.caa_codigo;

      this._caa_usuautoriza = Simple.caa_usuautoriza;

      this._caa_marcavehiculo = Simple.caa_marcavehiculo;

      this._caa_patenteVehiculo = Simple.caa_patenteVehiculo;

      this._caa_tipoVisita = Simple.caa_tipoVisita;

      this._caa_comentarios = Simple.caa_comentarios;

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
    using(var cmd = new SqlCommand("p_controlAcceso_AutorizacionIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@caa_idautorizado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_tipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_fechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@caa_fechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@caa_diasemana", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_horadesde", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_horahasta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_usuautoriza", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_marcavehiculo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_patenteVehiculo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_tipoVisita", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_comentarios", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@caa_idautorizado"].Value = this._caa_idautorizado;

		cmd.Parameters["@caa_tipo"].Value = this._caa_tipo;

		cmd.Parameters["@caa_fechadesde"].Value = (this._caa_fechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._caa_fechadesde;

		cmd.Parameters["@caa_fechahasta"].Value = (this._caa_fechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._caa_fechahasta;

		cmd.Parameters["@caa_diasemana"].Value = this._caa_diasemana;

		cmd.Parameters["@caa_horadesde"].Value = (this._caa_horadesde == null) ? (object) DBNull.Value : (object) this._caa_horadesde;

		cmd.Parameters["@caa_horahasta"].Value = (this._caa_horahasta == null) ? (object) DBNull.Value : (object) this._caa_horahasta;

		cmd.Parameters["@caa_estado"].Value = this._caa_estado;

		cmd.Parameters["@caa_codigo"].Value = (this._caa_codigo == null) ? (object) DBNull.Value : (object) this._caa_codigo;

		cmd.Parameters["@caa_usuautoriza"].Value = this._caa_usuautoriza;

		cmd.Parameters["@caa_marcavehiculo"].Value = (this._caa_marcavehiculo == null) ? (object) DBNull.Value : (object) this._caa_marcavehiculo;

		cmd.Parameters["@caa_patenteVehiculo"].Value = (this._caa_patenteVehiculo == null) ? (object) DBNull.Value : (object) this._caa_patenteVehiculo;

		cmd.Parameters["@caa_tipoVisita"].Value = this._caa_tipoVisita;

		cmd.Parameters["@caa_comentarios"].Value = (this._caa_comentarios == null) ? (object) DBNull.Value : (object) this._caa_comentarios;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_controlAcceso_AutorizacionUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@caa_idautorizado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_tipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_fechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@caa_fechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@caa_diasemana", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_horadesde", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_horahasta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_usuautoriza", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_marcavehiculo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_patenteVehiculo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_tipoVisita", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_comentarios", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@caa_idautorizado"].Value = this._caa_idautorizado;

		cmd.Parameters["@caa_tipo"].Value = this._caa_tipo;

		cmd.Parameters["@caa_fechadesde"].Value = (this._caa_fechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._caa_fechadesde;

		cmd.Parameters["@caa_fechahasta"].Value = (this._caa_fechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._caa_fechahasta;

		cmd.Parameters["@caa_diasemana"].Value = this._caa_diasemana;

		cmd.Parameters["@caa_horadesde"].Value = (this._caa_horadesde == null) ? (object) DBNull.Value : (object) this._caa_horadesde;

		cmd.Parameters["@caa_horahasta"].Value = (this._caa_horahasta == null) ? (object) DBNull.Value : (object) this._caa_horahasta;

		cmd.Parameters["@caa_estado"].Value = this._caa_estado;

		cmd.Parameters["@caa_codigo"].Value = (this._caa_codigo == null) ? (object) DBNull.Value : (object) this._caa_codigo;

		cmd.Parameters["@caa_usuautoriza"].Value = this._caa_usuautoriza;

		cmd.Parameters["@caa_marcavehiculo"].Value = (this._caa_marcavehiculo == null) ? (object) DBNull.Value : (object) this._caa_marcavehiculo;

		cmd.Parameters["@caa_patenteVehiculo"].Value = (this._caa_patenteVehiculo == null) ? (object) DBNull.Value : (object) this._caa_patenteVehiculo;

		cmd.Parameters["@caa_tipoVisita"].Value = this._caa_tipoVisita;

		cmd.Parameters["@caa_comentarios"].Value = (this._caa_comentarios == null) ? (object) DBNull.Value : (object) this._caa_comentarios;

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
    throw new RuntimeException("The p_controlAcceso_Autorizacion is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_controlAcceso_AutorizacionDel", conn))
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
    using(var CmdSel = new SqlCommand("p_controlAcceso_AutorizacionSel", conn))
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
    Simplep_controlAcceso_Autorizacion Simple = new Simplep_controlAcceso_Autorizacion();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.caa_idautorizado = this._caa_idautorizado;

      Simple.caa_tipo = this._caa_tipo;

      Simple.caa_fechadesde = this._caa_fechadesde;

      Simple.caa_fechahasta = this._caa_fechahasta;

      Simple.caa_diasemana = this._caa_diasemana;

      Simple.caa_horadesde = this._caa_horadesde;

      Simple.caa_horahasta = this._caa_horahasta;

      Simple.caa_estado = this._caa_estado;

      Simple.caa_codigo = this._caa_codigo;

      Simple.caa_usuautoriza = this._caa_usuautoriza;

      Simple.caa_marcavehiculo = this._caa_marcavehiculo;

      Simple.caa_patenteVehiculo = this._caa_patenteVehiculo;

      Simple.caa_tipoVisita = this._caa_tipoVisita;

      Simple.caa_comentarios = this._caa_comentarios;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_controlAcceso_Autorizacion)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._caa_idautorizado = Simple.caa_idautorizado;

      this._caa_tipo = Simple.caa_tipo;

      this._caa_fechadesde = Simple.caa_fechadesde;

      this._caa_fechahasta = Simple.caa_fechahasta;

      this._caa_diasemana = Simple.caa_diasemana;

      this._caa_horadesde = Simple.caa_horadesde;

      this._caa_horahasta = Simple.caa_horahasta;

      this._caa_estado = Simple.caa_estado;

      this._caa_codigo = Simple.caa_codigo;

      this._caa_usuautoriza = Simple.caa_usuautoriza;

      this._caa_marcavehiculo = Simple.caa_marcavehiculo;

      this._caa_patenteVehiculo = Simple.caa_patenteVehiculo;

      this._caa_tipoVisita = Simple.caa_tipoVisita;

      this._caa_comentarios = Simple.caa_comentarios;

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
    Callerp_controlAcceso_Autorizacion Caller = new Callerp_controlAcceso_Autorizacion();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.caa_idautorizado = this._caa_idautorizado;

      Caller.caa_tipo = this._caa_tipo;

      Caller.caa_fechadesde = this._caa_fechadesde;

      Caller.caa_fechahasta = this._caa_fechahasta;

      Caller.caa_diasemana = this._caa_diasemana;

      Caller.caa_horadesde = this._caa_horadesde;

      Caller.caa_horahasta = this._caa_horahasta;

      Caller.caa_estado = this._caa_estado;

      Caller.caa_codigo = this._caa_codigo;

      Caller.caa_usuautoriza = this._caa_usuautoriza;

      Caller.caa_marcavehiculo = this._caa_marcavehiculo;

      Caller.caa_patenteVehiculo = this._caa_patenteVehiculo;

      Caller.caa_tipoVisita = this._caa_tipoVisita;

      Caller.caa_comentarios = this._caa_comentarios;

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
    
      dt.Columns.Add(new DataColumn("caa_idautorizado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("caa_tipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("caa_fechadesde", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("caa_fechahasta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("caa_diasemana", typeof (int)));
    
      dt.Columns.Add(new DataColumn("caa_horadesde", typeof (string)));
    
      dt.Columns.Add(new DataColumn("caa_horahasta", typeof (string)));
    
      dt.Columns.Add(new DataColumn("caa_estado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("caa_codigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("caa_usuautoriza", typeof (int)));
    
      dt.Columns.Add(new DataColumn("caa_marcavehiculo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("caa_patenteVehiculo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("caa_tipoVisita", typeof (int)));
    
      dt.Columns.Add(new DataColumn("caa_comentarios", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["caa_idautorizado"] = this._caa_idautorizado;

      dr["caa_tipo"] = this._caa_tipo;

      dr["caa_fechadesde"] = (object)this._caa_fechadesde  ?? DBNull.Value;

      dr["caa_fechahasta"] = (object)this._caa_fechahasta  ?? DBNull.Value;

      dr["caa_diasemana"] = this._caa_diasemana;

      dr["caa_horadesde"] = this._caa_horadesde;

      dr["caa_horahasta"] = this._caa_horahasta;

      dr["caa_estado"] = this._caa_estado;

      dr["caa_codigo"] = this._caa_codigo;

      dr["caa_usuautoriza"] = this._caa_usuautoriza;

      dr["caa_marcavehiculo"] = this._caa_marcavehiculo;

      dr["caa_patenteVehiculo"] = this._caa_patenteVehiculo;

      dr["caa_tipoVisita"] = this._caa_tipoVisita;

      dr["caa_comentarios"] = this._caa_comentarios;

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
    using(var CmdChilds = new SqlCommand("p_controlAcceso_AutorizacionByChildObject", conn))
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
    Simplep_controlAcceso_Autorizacion Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_controlAcceso_AutorizacionByChildObject", conn))
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
    Simple = new Simplep_controlAcceso_Autorizacion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.caa_idautorizado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.caa_tipo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.caa_fechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.caa_fechahasta = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.caa_diasemana = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.caa_horadesde = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.caa_horahasta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.caa_estado = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.caa_codigo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.caa_usuautoriza = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.caa_marcavehiculo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.caa_patenteVehiculo = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.caa_tipoVisita = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.caa_comentarios = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);


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
    Simplep_controlAcceso_Autorizacion Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_controlAcceso_Autorizacion();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.caa_idautorizado = (Row["caa_idautorizado"] == DBNull.Value) ? 0 : (int) Row["caa_idautorizado"];

Simple.caa_tipo = (Row["caa_tipo"] == DBNull.Value) ? 0 : (int) Row["caa_tipo"];

Simple.caa_fechadesde = (Row["caa_fechadesde"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["caa_fechadesde"];

Simple.caa_fechahasta = (Row["caa_fechahasta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["caa_fechahasta"];

Simple.caa_diasemana = (Row["caa_diasemana"] == DBNull.Value) ? 0 : (int) Row["caa_diasemana"];

Simple.caa_horadesde = (Row["caa_horadesde"] == DBNull.Value) ? "" : (string) Row["caa_horadesde"];

Simple.caa_horahasta = (Row["caa_horahasta"] == DBNull.Value) ? "" : (string) Row["caa_horahasta"];

Simple.caa_estado = (Row["caa_estado"] == DBNull.Value) ? 0 : (int) Row["caa_estado"];

Simple.caa_codigo = (Row["caa_codigo"] == DBNull.Value) ? "" : (string) Row["caa_codigo"];

Simple.caa_usuautoriza = (Row["caa_usuautoriza"] == DBNull.Value) ? 0 : (int) Row["caa_usuautoriza"];

Simple.caa_marcavehiculo = (Row["caa_marcavehiculo"] == DBNull.Value) ? "" : (string) Row["caa_marcavehiculo"];

Simple.caa_patenteVehiculo = (Row["caa_patenteVehiculo"] == DBNull.Value) ? "" : (string) Row["caa_patenteVehiculo"];

Simple.caa_tipoVisita = (Row["caa_tipoVisita"] == DBNull.Value) ? 0 : (int) Row["caa_tipoVisita"];

Simple.caa_comentarios = (Row["caa_comentarios"] == DBNull.Value) ? "" : (string) Row["caa_comentarios"];


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
    using(var CmdParents = new SqlCommand("p_controlAcceso_AutorizacionByParentObject", conn))
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
    Simplep_controlAcceso_Autorizacion Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_controlAcceso_AutorizacionByParentObject", conn))
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
    Simple = new Simplep_controlAcceso_Autorizacion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.caa_idautorizado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.caa_tipo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.caa_fechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.caa_fechahasta = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.caa_diasemana = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.caa_horadesde = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.caa_horahasta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.caa_estado = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.caa_codigo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.caa_usuautoriza = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.caa_marcavehiculo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.caa_patenteVehiculo = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.caa_tipoVisita = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.caa_comentarios = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);


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
    using (var CmdDataByName = new SqlCommand("p_controlAcceso_AutorizacionByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_controlAcceso_AutorizacionByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_controlAcceso_AutorizacionByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_controlAcceso_AutorizacionByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_controlAcceso_AutorizacionByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_controlAcceso_Autorizacion Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_controlAcceso_AutorizacionBySimplep_controlAcceso_Autorizacion", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@caa_idautorizado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_tipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_fechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@caa_fechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@caa_diasemana", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_horadesde", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_horahasta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_usuautoriza", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_marcavehiculo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_patenteVehiculo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@caa_tipoVisita", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@caa_comentarios", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@caa_idautorizado"].Value = this._caa_idautorizado;

		cmd.Parameters["@caa_tipo"].Value = this._caa_tipo;

		cmd.Parameters["@caa_fechadesde"].Value = (this._caa_fechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._caa_fechadesde;

		cmd.Parameters["@caa_fechahasta"].Value = (this._caa_fechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._caa_fechahasta;

		cmd.Parameters["@caa_diasemana"].Value = this._caa_diasemana;

		cmd.Parameters["@caa_horadesde"].Value = (this._caa_horadesde == null) ? (object) DBNull.Value : (object) this._caa_horadesde;

		cmd.Parameters["@caa_horahasta"].Value = (this._caa_horahasta == null) ? (object) DBNull.Value : (object) this._caa_horahasta;

		cmd.Parameters["@caa_estado"].Value = this._caa_estado;

		cmd.Parameters["@caa_codigo"].Value = (this._caa_codigo == null) ? (object) DBNull.Value : (object) this._caa_codigo;

		cmd.Parameters["@caa_usuautoriza"].Value = this._caa_usuautoriza;

		cmd.Parameters["@caa_marcavehiculo"].Value = (this._caa_marcavehiculo == null) ? (object) DBNull.Value : (object) this._caa_marcavehiculo;

		cmd.Parameters["@caa_patenteVehiculo"].Value = (this._caa_patenteVehiculo == null) ? (object) DBNull.Value : (object) this._caa_patenteVehiculo;

		cmd.Parameters["@caa_tipoVisita"].Value = this._caa_tipoVisita;

		cmd.Parameters["@caa_comentarios"].Value = (this._caa_comentarios == null) ? (object) DBNull.Value : (object) this._caa_comentarios;


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
		 
		public IEnumerable<Simplep_controlAcceso_Autorizacion> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_controlAcceso_AutorizacionByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_controlAcceso_Autorizacion Simple = new Simplep_controlAcceso_Autorizacion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.caa_idautorizado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.caa_tipo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.caa_fechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.caa_fechahasta = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.caa_diasemana = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.caa_horadesde = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.caa_horahasta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.caa_estado = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.caa_codigo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.caa_usuautoriza = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.caa_marcavehiculo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.caa_patenteVehiculo = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.caa_tipoVisita = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.caa_comentarios = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_controlAcceso_Autorizacion> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_controlAcceso_AutorizacionByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_controlAcceso_Autorizacion Simple = new Simplep_controlAcceso_Autorizacion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.caa_idautorizado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.caa_tipo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.caa_fechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.caa_fechahasta = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.caa_diasemana = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.caa_horadesde = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.caa_horahasta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.caa_estado = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.caa_codigo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.caa_usuautoriza = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.caa_marcavehiculo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.caa_patenteVehiculo = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.caa_tipoVisita = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.caa_comentarios = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3207, "p_controlAcceso_Autorizacion");
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
    if (Reader.FieldCount > 2)this._caa_idautorizado = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._caa_tipo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._caa_fechadesde = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._caa_fechahasta = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)this._caa_diasemana = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._caa_horadesde = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._caa_horahasta = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._caa_estado = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._caa_codigo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._caa_usuautoriza = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._caa_marcavehiculo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._caa_patenteVehiculo = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._caa_tipoVisita = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)this._caa_comentarios = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    }
    Reader.Close();
    }
   }
  
    }
  