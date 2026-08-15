
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
     ///m_tgviaje data access layer   
     ///</summary>
    public class Dalm_tgviaje : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _tgv_nombre;
    
      private DateTime? _tgv_fechainicio;
    
      private DateTime? _tgv_fechafin;
    
      private int _tgv_reciid_inicio;
    
      private int _tgv_reciid_fin;
    
      private int _tgv_usuiid;
    
      private int _tgv_cueiid;
    
      private string _tgv_codigoexterno;
    
      private int _tgv_estado;
    
      private int _tgv_geofenseinicio;
    
      private int _tgv_geofensefin;
    
      private string _tgv_metadata;
    
      private DateTime? _tgv_fecha_prg_inicio;
    
      private DateTime? _tgv_fecha_prg_fin;
    
      private int _tgv_cuenta_cliente;
    
      private int _tgv_movil_transportista;
    
      private string _tgv_lugar_inicio;
    
      private string _tgv_lugar_fin;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///tgv_nombre   
     ///</summary>
      public string tgv_nombre
      {
      
          get{ return this._tgv_nombre; }
          set{ this._tgv_nombre = value; }
        
      }
     ///<summary>
     ///tgv_fechainicio   
     ///</summary>
      public DateTime? tgv_fechainicio
      {
      
          get{ return this._tgv_fechainicio; }
          set{ this._tgv_fechainicio = value; }
        
      }
     ///<summary>
     ///tgv_fechafin   
     ///</summary>
      public DateTime? tgv_fechafin
      {
      
          get{ return this._tgv_fechafin; }
          set{ this._tgv_fechafin = value; }
        
      }
     ///<summary>
     ///tgv_reciid_inicio   
     ///</summary>
      public int tgv_reciid_inicio
      {
      
          get{ return this._tgv_reciid_inicio; }
          set{ this._tgv_reciid_inicio = value; }
        
      }
     ///<summary>
     ///tgv_reciid_fin   
     ///</summary>
      public int tgv_reciid_fin
      {
      
          get{ return this._tgv_reciid_fin; }
          set{ this._tgv_reciid_fin = value; }
        
      }
     ///<summary>
     ///tgv_usuiid   
     ///</summary>
      public int tgv_usuiid
      {
      
          get{ return this._tgv_usuiid; }
          set{ this._tgv_usuiid = value; }
        
      }
     ///<summary>
     ///tgv_cueiid   
     ///</summary>
      public int tgv_cueiid
      {
      
          get{ return this._tgv_cueiid; }
          set{ this._tgv_cueiid = value; }
        
      }
     ///<summary>
     ///tgv_codigoexterno   
     ///</summary>
      public string tgv_codigoexterno
      {
      
          get{ return this._tgv_codigoexterno; }
          set{ this._tgv_codigoexterno = value; }
        
      }
     ///<summary>
     ///tgv_estado   
     ///</summary>
      public int tgv_estado
      {
      
          get{ return this._tgv_estado; }
          set{ this._tgv_estado = value; }
        
      }
     ///<summary>
     ///tgv_geofenseinicio   
     ///</summary>
      public int tgv_geofenseinicio
      {
      
          get{ return this._tgv_geofenseinicio; }
          set{ this._tgv_geofenseinicio = value; }
        
      }
     ///<summary>
     ///tgv_geofensefin   
     ///</summary>
      public int tgv_geofensefin
      {
      
          get{ return this._tgv_geofensefin; }
          set{ this._tgv_geofensefin = value; }
        
      }
     ///<summary>
     ///tgv_metadata   
     ///</summary>
      public string tgv_metadata
      {
      
          get{ return this._tgv_metadata; }
          set{ this._tgv_metadata = value; }
        
      }
     ///<summary>
     ///tgv_fecha_prg_inicio   
     ///</summary>
      public DateTime? tgv_fecha_prg_inicio
      {
      
          get{ return this._tgv_fecha_prg_inicio; }
          set{ this._tgv_fecha_prg_inicio = value; }
        
      }
     ///<summary>
     ///tgv_fecha_prg_fin   
     ///</summary>
      public DateTime? tgv_fecha_prg_fin
      {
      
          get{ return this._tgv_fecha_prg_fin; }
          set{ this._tgv_fecha_prg_fin = value; }
        
      }
     ///<summary>
     ///tgv_cuenta_cliente   
     ///</summary>
      public int tgv_cuenta_cliente
      {
      
          get{ return this._tgv_cuenta_cliente; }
          set{ this._tgv_cuenta_cliente = value; }
        
      }
     ///<summary>
     ///tgv_movil_transportista   
     ///</summary>
      public int tgv_movil_transportista
      {
      
          get{ return this._tgv_movil_transportista; }
          set{ this._tgv_movil_transportista = value; }
        
      }
     ///<summary>
     ///tgv_lugar_inicio   
     ///</summary>
      public string tgv_lugar_inicio
      {
      
          get{ return this._tgv_lugar_inicio; }
          set{ this._tgv_lugar_inicio = value; }
        
      }
     ///<summary>
     ///tgv_lugar_fin   
     ///</summary>
      public string tgv_lugar_fin
      {
      
          get{ return this._tgv_lugar_fin; }
          set{ this._tgv_lugar_fin = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_tgviaje(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_tgviaje(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_tgviaje(SqlHelper SqlConfig, int UserId, Simplem_tgviaje Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tgv_nombre = Simple.tgv_nombre;

      this._tgv_fechainicio = Simple.tgv_fechainicio;

      this._tgv_fechafin = Simple.tgv_fechafin;

      this._tgv_reciid_inicio = Simple.tgv_reciid_inicio;

      this._tgv_reciid_fin = Simple.tgv_reciid_fin;

      this._tgv_usuiid = Simple.tgv_usuiid;

      this._tgv_cueiid = Simple.tgv_cueiid;

      this._tgv_codigoexterno = Simple.tgv_codigoexterno;

      this._tgv_estado = Simple.tgv_estado;

      this._tgv_geofenseinicio = Simple.tgv_geofenseinicio;

      this._tgv_geofensefin = Simple.tgv_geofensefin;

      this._tgv_metadata = Simple.tgv_metadata;

      this._tgv_fecha_prg_inicio = Simple.tgv_fecha_prg_inicio;

      this._tgv_fecha_prg_fin = Simple.tgv_fecha_prg_fin;

      this._tgv_cuenta_cliente = Simple.tgv_cuenta_cliente;

      this._tgv_movil_transportista = Simple.tgv_movil_transportista;

      this._tgv_lugar_inicio = Simple.tgv_lugar_inicio;

      this._tgv_lugar_fin = Simple.tgv_lugar_fin;

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
    using(var cmd = new SqlCommand("m_tgviajeIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tgv_nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_fechainicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_fechafin", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_reciid_inicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_reciid_fin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_usuiid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_cueiid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_codigoexterno", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_geofenseinicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_geofensefin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_fecha_prg_inicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_fecha_prg_fin", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_cuenta_cliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_movil_transportista", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_lugar_inicio", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_lugar_fin", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tgv_nombre"].Value = (this._tgv_nombre == null) ? (object) DBNull.Value : (object) this._tgv_nombre;

		cmd.Parameters["@tgv_fechainicio"].Value = (this._tgv_fechainicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fechainicio;

		cmd.Parameters["@tgv_fechafin"].Value = (this._tgv_fechafin == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fechafin;

		cmd.Parameters["@tgv_reciid_inicio"].Value = this._tgv_reciid_inicio;

		cmd.Parameters["@tgv_reciid_fin"].Value = this._tgv_reciid_fin;

		cmd.Parameters["@tgv_usuiid"].Value = this._tgv_usuiid;

		cmd.Parameters["@tgv_cueiid"].Value = this._tgv_cueiid;

		cmd.Parameters["@tgv_codigoexterno"].Value = (this._tgv_codigoexterno == null) ? (object) DBNull.Value : (object) this._tgv_codigoexterno;

		cmd.Parameters["@tgv_estado"].Value = this._tgv_estado;

		cmd.Parameters["@tgv_geofenseinicio"].Value = this._tgv_geofenseinicio;

		cmd.Parameters["@tgv_geofensefin"].Value = this._tgv_geofensefin;

		cmd.Parameters["@tgv_metadata"].Value = (this._tgv_metadata == null) ? (object) DBNull.Value : (object) this._tgv_metadata;

		cmd.Parameters["@tgv_fecha_prg_inicio"].Value = (this._tgv_fecha_prg_inicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fecha_prg_inicio;

		cmd.Parameters["@tgv_fecha_prg_fin"].Value = (this._tgv_fecha_prg_fin == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fecha_prg_fin;

		cmd.Parameters["@tgv_cuenta_cliente"].Value = this._tgv_cuenta_cliente;

		cmd.Parameters["@tgv_movil_transportista"].Value = this._tgv_movil_transportista;

		cmd.Parameters["@tgv_lugar_inicio"].Value = (this._tgv_lugar_inicio == null) ? (object) DBNull.Value : (object) this._tgv_lugar_inicio;

		cmd.Parameters["@tgv_lugar_fin"].Value = (this._tgv_lugar_fin == null) ? (object) DBNull.Value : (object) this._tgv_lugar_fin;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_tgviajeUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tgv_nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_fechainicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_fechafin", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_reciid_inicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_reciid_fin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_usuiid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_cueiid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_codigoexterno", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_geofenseinicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_geofensefin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_fecha_prg_inicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_fecha_prg_fin", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_cuenta_cliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_movil_transportista", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_lugar_inicio", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_lugar_fin", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tgv_nombre"].Value = (this._tgv_nombre == null) ? (object) DBNull.Value : (object) this._tgv_nombre;

		cmd.Parameters["@tgv_fechainicio"].Value = (this._tgv_fechainicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fechainicio;

		cmd.Parameters["@tgv_fechafin"].Value = (this._tgv_fechafin == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fechafin;

		cmd.Parameters["@tgv_reciid_inicio"].Value = this._tgv_reciid_inicio;

		cmd.Parameters["@tgv_reciid_fin"].Value = this._tgv_reciid_fin;

		cmd.Parameters["@tgv_usuiid"].Value = this._tgv_usuiid;

		cmd.Parameters["@tgv_cueiid"].Value = this._tgv_cueiid;

		cmd.Parameters["@tgv_codigoexterno"].Value = (this._tgv_codigoexterno == null) ? (object) DBNull.Value : (object) this._tgv_codigoexterno;

		cmd.Parameters["@tgv_estado"].Value = this._tgv_estado;

		cmd.Parameters["@tgv_geofenseinicio"].Value = this._tgv_geofenseinicio;

		cmd.Parameters["@tgv_geofensefin"].Value = this._tgv_geofensefin;

		cmd.Parameters["@tgv_metadata"].Value = (this._tgv_metadata == null) ? (object) DBNull.Value : (object) this._tgv_metadata;

		cmd.Parameters["@tgv_fecha_prg_inicio"].Value = (this._tgv_fecha_prg_inicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fecha_prg_inicio;

		cmd.Parameters["@tgv_fecha_prg_fin"].Value = (this._tgv_fecha_prg_fin == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fecha_prg_fin;

		cmd.Parameters["@tgv_cuenta_cliente"].Value = this._tgv_cuenta_cliente;

		cmd.Parameters["@tgv_movil_transportista"].Value = this._tgv_movil_transportista;

		cmd.Parameters["@tgv_lugar_inicio"].Value = (this._tgv_lugar_inicio == null) ? (object) DBNull.Value : (object) this._tgv_lugar_inicio;

		cmd.Parameters["@tgv_lugar_fin"].Value = (this._tgv_lugar_fin == null) ? (object) DBNull.Value : (object) this._tgv_lugar_fin;

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
    throw new RuntimeException("The m_tgviaje is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_tgviajeDel", conn))
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
    using(var CmdSel = new SqlCommand("m_tgviajeSel", conn))
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
    Simplem_tgviaje Simple = new Simplem_tgviaje();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.tgv_nombre = this._tgv_nombre;

      Simple.tgv_fechainicio = this._tgv_fechainicio;

      Simple.tgv_fechafin = this._tgv_fechafin;

      Simple.tgv_reciid_inicio = this._tgv_reciid_inicio;

      Simple.tgv_reciid_fin = this._tgv_reciid_fin;

      Simple.tgv_usuiid = this._tgv_usuiid;

      Simple.tgv_cueiid = this._tgv_cueiid;

      Simple.tgv_codigoexterno = this._tgv_codigoexterno;

      Simple.tgv_estado = this._tgv_estado;

      Simple.tgv_geofenseinicio = this._tgv_geofenseinicio;

      Simple.tgv_geofensefin = this._tgv_geofensefin;

      Simple.tgv_metadata = this._tgv_metadata;

      Simple.tgv_fecha_prg_inicio = this._tgv_fecha_prg_inicio;

      Simple.tgv_fecha_prg_fin = this._tgv_fecha_prg_fin;

      Simple.tgv_cuenta_cliente = this._tgv_cuenta_cliente;

      Simple.tgv_movil_transportista = this._tgv_movil_transportista;

      Simple.tgv_lugar_inicio = this._tgv_lugar_inicio;

      Simple.tgv_lugar_fin = this._tgv_lugar_fin;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_tgviaje)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tgv_nombre = Simple.tgv_nombre;

      this._tgv_fechainicio = Simple.tgv_fechainicio;

      this._tgv_fechafin = Simple.tgv_fechafin;

      this._tgv_reciid_inicio = Simple.tgv_reciid_inicio;

      this._tgv_reciid_fin = Simple.tgv_reciid_fin;

      this._tgv_usuiid = Simple.tgv_usuiid;

      this._tgv_cueiid = Simple.tgv_cueiid;

      this._tgv_codigoexterno = Simple.tgv_codigoexterno;

      this._tgv_estado = Simple.tgv_estado;

      this._tgv_geofenseinicio = Simple.tgv_geofenseinicio;

      this._tgv_geofensefin = Simple.tgv_geofensefin;

      this._tgv_metadata = Simple.tgv_metadata;

      this._tgv_fecha_prg_inicio = Simple.tgv_fecha_prg_inicio;

      this._tgv_fecha_prg_fin = Simple.tgv_fecha_prg_fin;

      this._tgv_cuenta_cliente = Simple.tgv_cuenta_cliente;

      this._tgv_movil_transportista = Simple.tgv_movil_transportista;

      this._tgv_lugar_inicio = Simple.tgv_lugar_inicio;

      this._tgv_lugar_fin = Simple.tgv_lugar_fin;

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
    Callerm_tgviaje Caller = new Callerm_tgviaje();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.tgv_nombre = this._tgv_nombre;

      Caller.tgv_fechainicio = this._tgv_fechainicio;

      Caller.tgv_fechafin = this._tgv_fechafin;

      Caller.tgv_reciid_inicio = this._tgv_reciid_inicio;

      Caller.tgv_reciid_fin = this._tgv_reciid_fin;

      Caller.tgv_usuiid = this._tgv_usuiid;

      Caller.tgv_cueiid = this._tgv_cueiid;

      Caller.tgv_codigoexterno = this._tgv_codigoexterno;

      Caller.tgv_estado = this._tgv_estado;

      Caller.tgv_geofenseinicio = this._tgv_geofenseinicio;

      Caller.tgv_geofensefin = this._tgv_geofensefin;

      Caller.tgv_metadata = this._tgv_metadata;

      Caller.tgv_fecha_prg_inicio = this._tgv_fecha_prg_inicio;

      Caller.tgv_fecha_prg_fin = this._tgv_fecha_prg_fin;

      Caller.tgv_cuenta_cliente = this._tgv_cuenta_cliente;

      Caller.tgv_movil_transportista = this._tgv_movil_transportista;

      Caller.tgv_lugar_inicio = this._tgv_lugar_inicio;

      Caller.tgv_lugar_fin = this._tgv_lugar_fin;

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
    
      dt.Columns.Add(new DataColumn("tgv_nombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgv_fechainicio", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("tgv_fechafin", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("tgv_reciid_inicio", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_reciid_fin", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_usuiid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_cueiid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_codigoexterno", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgv_estado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_geofenseinicio", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_geofensefin", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_metadata", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgv_fecha_prg_inicio", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("tgv_fecha_prg_fin", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("tgv_cuenta_cliente", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_movil_transportista", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgv_lugar_inicio", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgv_lugar_fin", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["tgv_nombre"] = this._tgv_nombre;

      dr["tgv_fechainicio"] = (object)this._tgv_fechainicio  ?? DBNull.Value;

      dr["tgv_fechafin"] = (object)this._tgv_fechafin  ?? DBNull.Value;

      dr["tgv_reciid_inicio"] = this._tgv_reciid_inicio;

      dr["tgv_reciid_fin"] = this._tgv_reciid_fin;

      dr["tgv_usuiid"] = this._tgv_usuiid;

      dr["tgv_cueiid"] = this._tgv_cueiid;

      dr["tgv_codigoexterno"] = this._tgv_codigoexterno;

      dr["tgv_estado"] = this._tgv_estado;

      dr["tgv_geofenseinicio"] = this._tgv_geofenseinicio;

      dr["tgv_geofensefin"] = this._tgv_geofensefin;

      dr["tgv_metadata"] = this._tgv_metadata;

      dr["tgv_fecha_prg_inicio"] = (object)this._tgv_fecha_prg_inicio  ?? DBNull.Value;

      dr["tgv_fecha_prg_fin"] = (object)this._tgv_fecha_prg_fin  ?? DBNull.Value;

      dr["tgv_cuenta_cliente"] = this._tgv_cuenta_cliente;

      dr["tgv_movil_transportista"] = this._tgv_movil_transportista;

      dr["tgv_lugar_inicio"] = this._tgv_lugar_inicio;

      dr["tgv_lugar_fin"] = this._tgv_lugar_fin;

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
    using(var CmdChilds = new SqlCommand("m_tgviajeByChildObject", conn))
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
    Simplem_tgviaje Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_tgviajeByChildObject", conn))
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
    Simple = new Simplem_tgviaje();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgv_nombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tgv_fechainicio = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.tgv_fechafin = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.tgv_reciid_inicio = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tgv_reciid_fin = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.tgv_usuiid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.tgv_cueiid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.tgv_codigoexterno = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgv_estado = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tgv_geofenseinicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tgv_geofensefin = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.tgv_metadata = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgv_fecha_prg_inicio = (Reader.IsDBNull(14)) ? new DateTime(1,1,1) : Reader.GetDateTime(14);
if (Reader.FieldCount > 15)Simple.tgv_fecha_prg_fin = (Reader.IsDBNull(15)) ? new DateTime(1,1,1) : Reader.GetDateTime(15);
if (Reader.FieldCount > 16)Simple.tgv_cuenta_cliente = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.tgv_movil_transportista = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tgv_lugar_inicio = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.tgv_lugar_fin = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);


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
    Simplem_tgviaje Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_tgviaje();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.tgv_nombre = (Row["tgv_nombre"] == DBNull.Value) ? "" : (string) Row["tgv_nombre"];

Simple.tgv_fechainicio = (Row["tgv_fechainicio"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["tgv_fechainicio"];

Simple.tgv_fechafin = (Row["tgv_fechafin"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["tgv_fechafin"];

Simple.tgv_reciid_inicio = (Row["tgv_reciid_inicio"] == DBNull.Value) ? 0 : (int) Row["tgv_reciid_inicio"];

Simple.tgv_reciid_fin = (Row["tgv_reciid_fin"] == DBNull.Value) ? 0 : (int) Row["tgv_reciid_fin"];

Simple.tgv_usuiid = (Row["tgv_usuiid"] == DBNull.Value) ? 0 : (int) Row["tgv_usuiid"];

Simple.tgv_cueiid = (Row["tgv_cueiid"] == DBNull.Value) ? 0 : (int) Row["tgv_cueiid"];

Simple.tgv_codigoexterno = (Row["tgv_codigoexterno"] == DBNull.Value) ? "" : (string) Row["tgv_codigoexterno"];

Simple.tgv_estado = (Row["tgv_estado"] == DBNull.Value) ? 0 : (int) Row["tgv_estado"];

Simple.tgv_geofenseinicio = (Row["tgv_geofenseinicio"] == DBNull.Value) ? 0 : (int) Row["tgv_geofenseinicio"];

Simple.tgv_geofensefin = (Row["tgv_geofensefin"] == DBNull.Value) ? 0 : (int) Row["tgv_geofensefin"];

Simple.tgv_metadata = (Row["tgv_metadata"] == DBNull.Value) ? "" : (string) Row["tgv_metadata"];

Simple.tgv_fecha_prg_inicio = (Row["tgv_fecha_prg_inicio"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["tgv_fecha_prg_inicio"];

Simple.tgv_fecha_prg_fin = (Row["tgv_fecha_prg_fin"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["tgv_fecha_prg_fin"];

Simple.tgv_cuenta_cliente = (Row["tgv_cuenta_cliente"] == DBNull.Value) ? 0 : (int) Row["tgv_cuenta_cliente"];

Simple.tgv_movil_transportista = (Row["tgv_movil_transportista"] == DBNull.Value) ? 0 : (int) Row["tgv_movil_transportista"];

Simple.tgv_lugar_inicio = (Row["tgv_lugar_inicio"] == DBNull.Value) ? "" : (string) Row["tgv_lugar_inicio"];

Simple.tgv_lugar_fin = (Row["tgv_lugar_fin"] == DBNull.Value) ? "" : (string) Row["tgv_lugar_fin"];


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
    using(var CmdParents = new SqlCommand("m_tgviajeByParentObject", conn))
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
    Simplem_tgviaje Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_tgviajeByParentObject", conn))
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
    Simple = new Simplem_tgviaje();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgv_nombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tgv_fechainicio = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.tgv_fechafin = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.tgv_reciid_inicio = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tgv_reciid_fin = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.tgv_usuiid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.tgv_cueiid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.tgv_codigoexterno = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgv_estado = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tgv_geofenseinicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tgv_geofensefin = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.tgv_metadata = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgv_fecha_prg_inicio = (Reader.IsDBNull(14)) ? new DateTime(1,1,1) : Reader.GetDateTime(14);
if (Reader.FieldCount > 15)Simple.tgv_fecha_prg_fin = (Reader.IsDBNull(15)) ? new DateTime(1,1,1) : Reader.GetDateTime(15);
if (Reader.FieldCount > 16)Simple.tgv_cuenta_cliente = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.tgv_movil_transportista = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tgv_lugar_inicio = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.tgv_lugar_fin = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);


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
    using (var CmdDataByName = new SqlCommand("m_tgviajeByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_tgviajeByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_tgviajeByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_tgviajeByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_tgviajeByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_tgviaje Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_tgviajeBySimplem_tgviaje", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tgv_nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_fechainicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_fechafin", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_reciid_inicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_reciid_fin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_usuiid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_cueiid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_codigoexterno", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_geofenseinicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_geofensefin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_fecha_prg_inicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_fecha_prg_fin", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@tgv_cuenta_cliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_movil_transportista", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgv_lugar_inicio", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgv_lugar_fin", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@tgv_nombre"].Value = (this._tgv_nombre == null) ? (object) DBNull.Value : (object) this._tgv_nombre;

		cmd.Parameters["@tgv_fechainicio"].Value = (this._tgv_fechainicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fechainicio;

		cmd.Parameters["@tgv_fechafin"].Value = (this._tgv_fechafin == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fechafin;

		cmd.Parameters["@tgv_reciid_inicio"].Value = this._tgv_reciid_inicio;

		cmd.Parameters["@tgv_reciid_fin"].Value = this._tgv_reciid_fin;

		cmd.Parameters["@tgv_usuiid"].Value = this._tgv_usuiid;

		cmd.Parameters["@tgv_cueiid"].Value = this._tgv_cueiid;

		cmd.Parameters["@tgv_codigoexterno"].Value = (this._tgv_codigoexterno == null) ? (object) DBNull.Value : (object) this._tgv_codigoexterno;

		cmd.Parameters["@tgv_estado"].Value = this._tgv_estado;

		cmd.Parameters["@tgv_geofenseinicio"].Value = this._tgv_geofenseinicio;

		cmd.Parameters["@tgv_geofensefin"].Value = this._tgv_geofensefin;

		cmd.Parameters["@tgv_metadata"].Value = (this._tgv_metadata == null) ? (object) DBNull.Value : (object) this._tgv_metadata;

		cmd.Parameters["@tgv_fecha_prg_inicio"].Value = (this._tgv_fecha_prg_inicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fecha_prg_inicio;

		cmd.Parameters["@tgv_fecha_prg_fin"].Value = (this._tgv_fecha_prg_fin == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._tgv_fecha_prg_fin;

		cmd.Parameters["@tgv_cuenta_cliente"].Value = this._tgv_cuenta_cliente;

		cmd.Parameters["@tgv_movil_transportista"].Value = this._tgv_movil_transportista;

		cmd.Parameters["@tgv_lugar_inicio"].Value = (this._tgv_lugar_inicio == null) ? (object) DBNull.Value : (object) this._tgv_lugar_inicio;

		cmd.Parameters["@tgv_lugar_fin"].Value = (this._tgv_lugar_fin == null) ? (object) DBNull.Value : (object) this._tgv_lugar_fin;


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
		 
		public IEnumerable<Simplem_tgviaje> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_tgviajeByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_tgviaje Simple = new Simplem_tgviaje();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgv_nombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tgv_fechainicio = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.tgv_fechafin = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.tgv_reciid_inicio = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tgv_reciid_fin = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.tgv_usuiid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.tgv_cueiid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.tgv_codigoexterno = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgv_estado = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tgv_geofenseinicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tgv_geofensefin = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.tgv_metadata = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgv_fecha_prg_inicio = (Reader.IsDBNull(14)) ? new DateTime(1,1,1) : Reader.GetDateTime(14);
if (Reader.FieldCount > 15)Simple.tgv_fecha_prg_fin = (Reader.IsDBNull(15)) ? new DateTime(1,1,1) : Reader.GetDateTime(15);
if (Reader.FieldCount > 16)Simple.tgv_cuenta_cliente = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.tgv_movil_transportista = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tgv_lugar_inicio = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.tgv_lugar_fin = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_tgviaje> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_tgviajeByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_tgviaje Simple = new Simplem_tgviaje();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgv_nombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tgv_fechainicio = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.tgv_fechafin = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.tgv_reciid_inicio = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tgv_reciid_fin = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.tgv_usuiid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.tgv_cueiid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.tgv_codigoexterno = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgv_estado = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tgv_geofenseinicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tgv_geofensefin = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.tgv_metadata = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgv_fecha_prg_inicio = (Reader.IsDBNull(14)) ? new DateTime(1,1,1) : Reader.GetDateTime(14);
if (Reader.FieldCount > 15)Simple.tgv_fecha_prg_fin = (Reader.IsDBNull(15)) ? new DateTime(1,1,1) : Reader.GetDateTime(15);
if (Reader.FieldCount > 16)Simple.tgv_cuenta_cliente = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.tgv_movil_transportista = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tgv_lugar_inicio = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.tgv_lugar_fin = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3214, "m_tgviaje");
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
    if (Reader.FieldCount > 2)this._tgv_nombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._tgv_fechainicio = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)this._tgv_fechafin = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._tgv_reciid_inicio = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._tgv_reciid_fin = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._tgv_usuiid = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._tgv_cueiid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._tgv_codigoexterno = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._tgv_estado = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._tgv_geofenseinicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._tgv_geofensefin = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._tgv_metadata = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._tgv_fecha_prg_inicio = (Reader.IsDBNull(14)) ? new DateTime(1,1,1) : Reader.GetDateTime(14);
if (Reader.FieldCount > 15)this._tgv_fecha_prg_fin = (Reader.IsDBNull(15)) ? new DateTime(1,1,1) : Reader.GetDateTime(15);
if (Reader.FieldCount > 16)this._tgv_cuenta_cliente = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)this._tgv_movil_transportista = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)this._tgv_lugar_inicio = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)this._tgv_lugar_fin = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);

    }
    Reader.Close();
    }
   }
  
    }
  