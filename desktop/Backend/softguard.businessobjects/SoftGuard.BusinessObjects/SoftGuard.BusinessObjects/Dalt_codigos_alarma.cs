
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
     ///t_codigos_alarma data access layer   
     ///</summary>
    public class Dalt_codigos_alarma : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _cod_ccodigo;
    
      private string _cod_cdescripcion;
    
      private Decimal _cod_nalerta;
    
      private Decimal _cod_nprioridad;
    
      private int _cod_ntipo;
    
      private Decimal _cod_nsistema;
    
      private int _cod_ncolor;
    
      private string _cod_cSonido;
    
      private int _cod_nColorLetra;
    
      private Decimal _cod_nResuelve;
    
      private string _cod_cGrupo;
    
      private Decimal _cod_nSms;
    
      private Decimal _cod_nMail;
    
      private Decimal _cod_nVideo;
    
      private Decimal _cod_nManual;
    
      private Decimal _cod_nMovil;
    
      private Decimal _cod_nAutoridad;
    
      private Decimal _cod_nLeeSonido;
    
      private Decimal _cod_nMultiMonitor;
    
      private string _cod_cinstrucciones_DSS;
    
      private string _cod_cconfiguracion_DSS;
    
      private Decimal _cod_nWebCliente;
    
      private string _cod_cAlarmaAutoprocesa;
    
      private int _cod_iTemplate;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cod_ccodigo   
     ///</summary>
      public string cod_ccodigo
      {
      
          get{ return this._cod_ccodigo; }
          set{ this._cod_ccodigo = value; }
        
      }
     ///<summary>
     ///cod_cdescripcion   
     ///</summary>
      public string cod_cdescripcion
      {
      
          get{ return this._cod_cdescripcion; }
          set{ this._cod_cdescripcion = value; }
        
      }
     ///<summary>
     ///cod_nalerta   
     ///</summary>
      public Decimal cod_nalerta
      {
      
          get{ return this._cod_nalerta; }
          set{ this._cod_nalerta = value; }
        
      }
     ///<summary>
     ///cod_nprioridad   
     ///</summary>
      public Decimal cod_nprioridad
      {
      
          get{ return this._cod_nprioridad; }
          set{ this._cod_nprioridad = value; }
        
      }
     ///<summary>
     ///cod_ntipo   
     ///</summary>
      public int cod_ntipo
      {
      
          get{ return this._cod_ntipo; }
          set{ this._cod_ntipo = value; }
        
      }
     ///<summary>
     ///cod_nsistema   
     ///</summary>
      public Decimal cod_nsistema
      {
      
          get{ return this._cod_nsistema; }
          set{ this._cod_nsistema = value; }
        
      }
     ///<summary>
     ///cod_ncolor   
     ///</summary>
      public int cod_ncolor
      {
      
          get{ return this._cod_ncolor; }
          set{ this._cod_ncolor = value; }
        
      }
     ///<summary>
     ///cod_cSonido   
     ///</summary>
      public string cod_cSonido
      {
      
          get{ return this._cod_cSonido; }
          set{ this._cod_cSonido = value; }
        
      }
     ///<summary>
     ///cod_nColorLetra   
     ///</summary>
      public int cod_nColorLetra
      {
      
          get{ return this._cod_nColorLetra; }
          set{ this._cod_nColorLetra = value; }
        
      }
     ///<summary>
     ///cod_nResuelve   
     ///</summary>
      public Decimal cod_nResuelve
      {
      
          get{ return this._cod_nResuelve; }
          set{ this._cod_nResuelve = value; }
        
      }
     ///<summary>
     ///cod_cGrupo   
     ///</summary>
      public string cod_cGrupo
      {
      
          get{ return this._cod_cGrupo; }
          set{ this._cod_cGrupo = value; }
        
      }
     ///<summary>
     ///cod_nSms   
     ///</summary>
      public Decimal cod_nSms
      {
      
          get{ return this._cod_nSms; }
          set{ this._cod_nSms = value; }
        
      }
     ///<summary>
     ///cod_nMail   
     ///</summary>
      public Decimal cod_nMail
      {
      
          get{ return this._cod_nMail; }
          set{ this._cod_nMail = value; }
        
      }
     ///<summary>
     ///cod_nVideo   
     ///</summary>
      public Decimal cod_nVideo
      {
      
          get{ return this._cod_nVideo; }
          set{ this._cod_nVideo = value; }
        
      }
     ///<summary>
     ///cod_nManual   
     ///</summary>
      public Decimal cod_nManual
      {
      
          get{ return this._cod_nManual; }
          set{ this._cod_nManual = value; }
        
      }
     ///<summary>
     ///cod_nMovil   
     ///</summary>
      public Decimal cod_nMovil
      {
      
          get{ return this._cod_nMovil; }
          set{ this._cod_nMovil = value; }
        
      }
     ///<summary>
     ///cod_nAutoridad   
     ///</summary>
      public Decimal cod_nAutoridad
      {
      
          get{ return this._cod_nAutoridad; }
          set{ this._cod_nAutoridad = value; }
        
      }
     ///<summary>
     ///cod_nLeeSonido   
     ///</summary>
      public Decimal cod_nLeeSonido
      {
      
          get{ return this._cod_nLeeSonido; }
          set{ this._cod_nLeeSonido = value; }
        
      }
     ///<summary>
     ///cod_nMultiMonitor   
     ///</summary>
      public Decimal cod_nMultiMonitor
      {
      
          get{ return this._cod_nMultiMonitor; }
          set{ this._cod_nMultiMonitor = value; }
        
      }
     ///<summary>
     ///cod_cinstrucciones_DSS   
     ///</summary>
      public string cod_cinstrucciones_DSS
      {
      
          get{ return this._cod_cinstrucciones_DSS; }
          set{ this._cod_cinstrucciones_DSS = value; }
        
      }
     ///<summary>
     ///cod_cconfiguracion_DSS   
     ///</summary>
      public string cod_cconfiguracion_DSS
      {
      
          get{ return this._cod_cconfiguracion_DSS; }
          set{ this._cod_cconfiguracion_DSS = value; }
        
      }
     ///<summary>
     ///cod_nWebCliente   
     ///</summary>
      public Decimal cod_nWebCliente
      {
      
          get{ return this._cod_nWebCliente; }
          set{ this._cod_nWebCliente = value; }
        
      }
     ///<summary>
     ///cod_cAlarmaAutoprocesa   
     ///</summary>
      public string cod_cAlarmaAutoprocesa
      {
      
          get{ return this._cod_cAlarmaAutoprocesa; }
          set{ this._cod_cAlarmaAutoprocesa = value; }
        
      }
     ///<summary>
     ///cod_iTemplate   
     ///</summary>
      public int cod_iTemplate
      {
      
          get{ return this._cod_iTemplate; }
          set{ this._cod_iTemplate = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_codigos_alarma(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_codigos_alarma(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_codigos_alarma(SqlHelper SqlConfig, int UserId, Simplet_codigos_alarma Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cod_ccodigo = Simple.cod_ccodigo;

      this._cod_cdescripcion = Simple.cod_cdescripcion;

      this._cod_nalerta = Simple.cod_nalerta;

      this._cod_nprioridad = Simple.cod_nprioridad;

      this._cod_ntipo = Simple.cod_ntipo;

      this._cod_nsistema = Simple.cod_nsistema;

      this._cod_ncolor = Simple.cod_ncolor;

      this._cod_cSonido = Simple.cod_cSonido;

      this._cod_nColorLetra = Simple.cod_nColorLetra;

      this._cod_nResuelve = Simple.cod_nResuelve;

      this._cod_cGrupo = Simple.cod_cGrupo;

      this._cod_nSms = Simple.cod_nSms;

      this._cod_nMail = Simple.cod_nMail;

      this._cod_nVideo = Simple.cod_nVideo;

      this._cod_nManual = Simple.cod_nManual;

      this._cod_nMovil = Simple.cod_nMovil;

      this._cod_nAutoridad = Simple.cod_nAutoridad;

      this._cod_nLeeSonido = Simple.cod_nLeeSonido;

      this._cod_nMultiMonitor = Simple.cod_nMultiMonitor;

      this._cod_cinstrucciones_DSS = Simple.cod_cinstrucciones_DSS;

      this._cod_cconfiguracion_DSS = Simple.cod_cconfiguracion_DSS;

      this._cod_nWebCliente = Simple.cod_nWebCliente;

      this._cod_cAlarmaAutoprocesa = Simple.cod_cAlarmaAutoprocesa;

      this._cod_iTemplate = Simple.cod_iTemplate;

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
    using(var cmd = new SqlCommand("t_codigos_alarmaIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cod_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@cod_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nalerta", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nprioridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_nsistema", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_ncolor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_cSonido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nColorLetra", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_nResuelve", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cGrupo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@cod_nSms", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMail", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nVideo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nManual", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMovil", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nAutoridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nLeeSonido", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMultiMonitor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cinstrucciones_DSS", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_cconfiguracion_DSS", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nWebCliente", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cAlarmaAutoprocesa", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cod_iTemplate", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cod_ccodigo"].Value = (this._cod_ccodigo == null) ? (object) DBNull.Value : (object) this._cod_ccodigo;

		cmd.Parameters["@cod_cdescripcion"].Value = (this._cod_cdescripcion == null) ? (object) DBNull.Value : (object) this._cod_cdescripcion;

		cmd.Parameters["@cod_nalerta"].Value = this._cod_nalerta;

		cmd.Parameters["@cod_nprioridad"].Value = this._cod_nprioridad;

		cmd.Parameters["@cod_ntipo"].Value = this._cod_ntipo;

		cmd.Parameters["@cod_nsistema"].Value = this._cod_nsistema;

		cmd.Parameters["@cod_ncolor"].Value = this._cod_ncolor;

		cmd.Parameters["@cod_cSonido"].Value = (this._cod_cSonido == null) ? (object) DBNull.Value : (object) this._cod_cSonido;

		cmd.Parameters["@cod_nColorLetra"].Value = this._cod_nColorLetra;

		cmd.Parameters["@cod_nResuelve"].Value = this._cod_nResuelve;

		cmd.Parameters["@cod_cGrupo"].Value = (this._cod_cGrupo == null) ? (object) DBNull.Value : (object) this._cod_cGrupo;

		cmd.Parameters["@cod_nSms"].Value = this._cod_nSms;

		cmd.Parameters["@cod_nMail"].Value = this._cod_nMail;

		cmd.Parameters["@cod_nVideo"].Value = this._cod_nVideo;

		cmd.Parameters["@cod_nManual"].Value = this._cod_nManual;

		cmd.Parameters["@cod_nMovil"].Value = this._cod_nMovil;

		cmd.Parameters["@cod_nAutoridad"].Value = this._cod_nAutoridad;

		cmd.Parameters["@cod_nLeeSonido"].Value = this._cod_nLeeSonido;

		cmd.Parameters["@cod_nMultiMonitor"].Value = this._cod_nMultiMonitor;

		cmd.Parameters["@cod_cinstrucciones_DSS"].Value = (this._cod_cinstrucciones_DSS == null) ? (object) DBNull.Value : (object) this._cod_cinstrucciones_DSS;

		cmd.Parameters["@cod_cconfiguracion_DSS"].Value = (this._cod_cconfiguracion_DSS == null) ? (object) DBNull.Value : (object) this._cod_cconfiguracion_DSS;

		cmd.Parameters["@cod_nWebCliente"].Value = this._cod_nWebCliente;

		cmd.Parameters["@cod_cAlarmaAutoprocesa"].Value = (this._cod_cAlarmaAutoprocesa == null) ? (object) DBNull.Value : (object) this._cod_cAlarmaAutoprocesa;

		cmd.Parameters["@cod_iTemplate"].Value = this._cod_iTemplate;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_codigos_alarmaUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cod_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@cod_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nalerta", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nprioridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_nsistema", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_ncolor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_cSonido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nColorLetra", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_nResuelve", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cGrupo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@cod_nSms", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMail", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nVideo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nManual", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMovil", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nAutoridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nLeeSonido", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMultiMonitor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cinstrucciones_DSS", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_cconfiguracion_DSS", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nWebCliente", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cAlarmaAutoprocesa", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cod_iTemplate", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cod_ccodigo"].Value = (this._cod_ccodigo == null) ? (object) DBNull.Value : (object) this._cod_ccodigo;

		cmd.Parameters["@cod_cdescripcion"].Value = (this._cod_cdescripcion == null) ? (object) DBNull.Value : (object) this._cod_cdescripcion;

		cmd.Parameters["@cod_nalerta"].Value = this._cod_nalerta;

		cmd.Parameters["@cod_nprioridad"].Value = this._cod_nprioridad;

		cmd.Parameters["@cod_ntipo"].Value = this._cod_ntipo;

		cmd.Parameters["@cod_nsistema"].Value = this._cod_nsistema;

		cmd.Parameters["@cod_ncolor"].Value = this._cod_ncolor;

		cmd.Parameters["@cod_cSonido"].Value = (this._cod_cSonido == null) ? (object) DBNull.Value : (object) this._cod_cSonido;

		cmd.Parameters["@cod_nColorLetra"].Value = this._cod_nColorLetra;

		cmd.Parameters["@cod_nResuelve"].Value = this._cod_nResuelve;

		cmd.Parameters["@cod_cGrupo"].Value = (this._cod_cGrupo == null) ? (object) DBNull.Value : (object) this._cod_cGrupo;

		cmd.Parameters["@cod_nSms"].Value = this._cod_nSms;

		cmd.Parameters["@cod_nMail"].Value = this._cod_nMail;

		cmd.Parameters["@cod_nVideo"].Value = this._cod_nVideo;

		cmd.Parameters["@cod_nManual"].Value = this._cod_nManual;

		cmd.Parameters["@cod_nMovil"].Value = this._cod_nMovil;

		cmd.Parameters["@cod_nAutoridad"].Value = this._cod_nAutoridad;

		cmd.Parameters["@cod_nLeeSonido"].Value = this._cod_nLeeSonido;

		cmd.Parameters["@cod_nMultiMonitor"].Value = this._cod_nMultiMonitor;

		cmd.Parameters["@cod_cinstrucciones_DSS"].Value = (this._cod_cinstrucciones_DSS == null) ? (object) DBNull.Value : (object) this._cod_cinstrucciones_DSS;

		cmd.Parameters["@cod_cconfiguracion_DSS"].Value = (this._cod_cconfiguracion_DSS == null) ? (object) DBNull.Value : (object) this._cod_cconfiguracion_DSS;

		cmd.Parameters["@cod_nWebCliente"].Value = this._cod_nWebCliente;

		cmd.Parameters["@cod_cAlarmaAutoprocesa"].Value = (this._cod_cAlarmaAutoprocesa == null) ? (object) DBNull.Value : (object) this._cod_cAlarmaAutoprocesa;

		cmd.Parameters["@cod_iTemplate"].Value = this._cod_iTemplate;

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
    throw new RuntimeException("The t_codigos_alarma is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_codigos_alarmaDel", conn))
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
    using(var CmdSel = new SqlCommand("t_codigos_alarmaSel", conn))
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
    Simplet_codigos_alarma Simple = new Simplet_codigos_alarma();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cod_ccodigo = this._cod_ccodigo;

      Simple.cod_cdescripcion = this._cod_cdescripcion;

      Simple.cod_nalerta = this._cod_nalerta;

      Simple.cod_nprioridad = this._cod_nprioridad;

      Simple.cod_ntipo = this._cod_ntipo;

      Simple.cod_nsistema = this._cod_nsistema;

      Simple.cod_ncolor = this._cod_ncolor;

      Simple.cod_cSonido = this._cod_cSonido;

      Simple.cod_nColorLetra = this._cod_nColorLetra;

      Simple.cod_nResuelve = this._cod_nResuelve;

      Simple.cod_cGrupo = this._cod_cGrupo;

      Simple.cod_nSms = this._cod_nSms;

      Simple.cod_nMail = this._cod_nMail;

      Simple.cod_nVideo = this._cod_nVideo;

      Simple.cod_nManual = this._cod_nManual;

      Simple.cod_nMovil = this._cod_nMovil;

      Simple.cod_nAutoridad = this._cod_nAutoridad;

      Simple.cod_nLeeSonido = this._cod_nLeeSonido;

      Simple.cod_nMultiMonitor = this._cod_nMultiMonitor;

      Simple.cod_cinstrucciones_DSS = this._cod_cinstrucciones_DSS;

      Simple.cod_cconfiguracion_DSS = this._cod_cconfiguracion_DSS;

      Simple.cod_nWebCliente = this._cod_nWebCliente;

      Simple.cod_cAlarmaAutoprocesa = this._cod_cAlarmaAutoprocesa;

      Simple.cod_iTemplate = this._cod_iTemplate;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_codigos_alarma)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cod_ccodigo = Simple.cod_ccodigo;

      this._cod_cdescripcion = Simple.cod_cdescripcion;

      this._cod_nalerta = Simple.cod_nalerta;

      this._cod_nprioridad = Simple.cod_nprioridad;

      this._cod_ntipo = Simple.cod_ntipo;

      this._cod_nsistema = Simple.cod_nsistema;

      this._cod_ncolor = Simple.cod_ncolor;

      this._cod_cSonido = Simple.cod_cSonido;

      this._cod_nColorLetra = Simple.cod_nColorLetra;

      this._cod_nResuelve = Simple.cod_nResuelve;

      this._cod_cGrupo = Simple.cod_cGrupo;

      this._cod_nSms = Simple.cod_nSms;

      this._cod_nMail = Simple.cod_nMail;

      this._cod_nVideo = Simple.cod_nVideo;

      this._cod_nManual = Simple.cod_nManual;

      this._cod_nMovil = Simple.cod_nMovil;

      this._cod_nAutoridad = Simple.cod_nAutoridad;

      this._cod_nLeeSonido = Simple.cod_nLeeSonido;

      this._cod_nMultiMonitor = Simple.cod_nMultiMonitor;

      this._cod_cinstrucciones_DSS = Simple.cod_cinstrucciones_DSS;

      this._cod_cconfiguracion_DSS = Simple.cod_cconfiguracion_DSS;

      this._cod_nWebCliente = Simple.cod_nWebCliente;

      this._cod_cAlarmaAutoprocesa = Simple.cod_cAlarmaAutoprocesa;

      this._cod_iTemplate = Simple.cod_iTemplate;

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
    Callert_codigos_alarma Caller = new Callert_codigos_alarma();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cod_ccodigo = this._cod_ccodigo;

      Caller.cod_cdescripcion = this._cod_cdescripcion;

      Caller.cod_nalerta = this._cod_nalerta;

      Caller.cod_nprioridad = this._cod_nprioridad;

      Caller.cod_ntipo = this._cod_ntipo;

      Caller.cod_nsistema = this._cod_nsistema;

      Caller.cod_ncolor = this._cod_ncolor;

      Caller.cod_cSonido = this._cod_cSonido;

      Caller.cod_nColorLetra = this._cod_nColorLetra;

      Caller.cod_nResuelve = this._cod_nResuelve;

      Caller.cod_cGrupo = this._cod_cGrupo;

      Caller.cod_nSms = this._cod_nSms;

      Caller.cod_nMail = this._cod_nMail;

      Caller.cod_nVideo = this._cod_nVideo;

      Caller.cod_nManual = this._cod_nManual;

      Caller.cod_nMovil = this._cod_nMovil;

      Caller.cod_nAutoridad = this._cod_nAutoridad;

      Caller.cod_nLeeSonido = this._cod_nLeeSonido;

      Caller.cod_nMultiMonitor = this._cod_nMultiMonitor;

      Caller.cod_cinstrucciones_DSS = this._cod_cinstrucciones_DSS;

      Caller.cod_cconfiguracion_DSS = this._cod_cconfiguracion_DSS;

      Caller.cod_nWebCliente = this._cod_nWebCliente;

      Caller.cod_cAlarmaAutoprocesa = this._cod_cAlarmaAutoprocesa;

      Caller.cod_iTemplate = this._cod_iTemplate;

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
    
      dt.Columns.Add(new DataColumn("cod_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cod_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cod_nalerta", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nprioridad", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_ntipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cod_nsistema", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_ncolor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cod_cSonido", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cod_nColorLetra", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cod_nResuelve", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_cGrupo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cod_nSms", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nMail", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nVideo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nManual", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nMovil", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nAutoridad", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nLeeSonido", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_nMultiMonitor", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_cinstrucciones_DSS", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cod_cconfiguracion_DSS", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cod_nWebCliente", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cod_cAlarmaAutoprocesa", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cod_iTemplate", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cod_ccodigo"] = this._cod_ccodigo;

      dr["cod_cdescripcion"] = this._cod_cdescripcion;

      dr["cod_nalerta"] = this._cod_nalerta;

      dr["cod_nprioridad"] = this._cod_nprioridad;

      dr["cod_ntipo"] = this._cod_ntipo;

      dr["cod_nsistema"] = this._cod_nsistema;

      dr["cod_ncolor"] = this._cod_ncolor;

      dr["cod_cSonido"] = this._cod_cSonido;

      dr["cod_nColorLetra"] = this._cod_nColorLetra;

      dr["cod_nResuelve"] = this._cod_nResuelve;

      dr["cod_cGrupo"] = this._cod_cGrupo;

      dr["cod_nSms"] = this._cod_nSms;

      dr["cod_nMail"] = this._cod_nMail;

      dr["cod_nVideo"] = this._cod_nVideo;

      dr["cod_nManual"] = this._cod_nManual;

      dr["cod_nMovil"] = this._cod_nMovil;

      dr["cod_nAutoridad"] = this._cod_nAutoridad;

      dr["cod_nLeeSonido"] = this._cod_nLeeSonido;

      dr["cod_nMultiMonitor"] = this._cod_nMultiMonitor;

      dr["cod_cinstrucciones_DSS"] = this._cod_cinstrucciones_DSS;

      dr["cod_cconfiguracion_DSS"] = this._cod_cconfiguracion_DSS;

      dr["cod_nWebCliente"] = this._cod_nWebCliente;

      dr["cod_cAlarmaAutoprocesa"] = this._cod_cAlarmaAutoprocesa;

      dr["cod_iTemplate"] = this._cod_iTemplate;

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
    using(var CmdChilds = new SqlCommand("t_codigos_alarmaByChildObject", conn))
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
    Simplet_codigos_alarma Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_codigos_alarmaByChildObject", conn))
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
    Simple = new Simplet_codigos_alarma();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cod_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cod_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cod_nalerta = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cod_nprioridad = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cod_ntipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cod_nsistema = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cod_ncolor = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cod_cSonido = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cod_nColorLetra = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cod_nResuelve = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cod_cGrupo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cod_nSms = (Reader.IsDBNull(13)) ? new Decimal(0) : Reader.GetDecimal(13);
if (Reader.FieldCount > 14)Simple.cod_nMail = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.cod_nVideo = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.cod_nManual = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cod_nMovil = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cod_nAutoridad = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cod_nLeeSonido = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cod_nMultiMonitor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cod_cinstrucciones_DSS = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.cod_cconfiguracion_DSS = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.cod_nWebCliente = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cod_cAlarmaAutoprocesa = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cod_iTemplate = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);


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
    Simplet_codigos_alarma Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_codigos_alarma();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cod_ccodigo = (Row["cod_ccodigo"] == DBNull.Value) ? "" : (string) Row["cod_ccodigo"];

Simple.cod_cdescripcion = (Row["cod_cdescripcion"] == DBNull.Value) ? "" : (string) Row["cod_cdescripcion"];

Simple.cod_nalerta = (Row["cod_nalerta"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nalerta"];

Simple.cod_nprioridad = (Row["cod_nprioridad"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nprioridad"];

Simple.cod_ntipo = (Row["cod_ntipo"] == DBNull.Value) ? 0 : (int) Row["cod_ntipo"];

Simple.cod_nsistema = (Row["cod_nsistema"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nsistema"];

Simple.cod_ncolor = (Row["cod_ncolor"] == DBNull.Value) ? 0 : (int) Row["cod_ncolor"];

Simple.cod_cSonido = (Row["cod_cSonido"] == DBNull.Value) ? "" : (string) Row["cod_cSonido"];

Simple.cod_nColorLetra = (Row["cod_nColorLetra"] == DBNull.Value) ? 0 : (int) Row["cod_nColorLetra"];

Simple.cod_nResuelve = (Row["cod_nResuelve"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nResuelve"];

Simple.cod_cGrupo = (Row["cod_cGrupo"] == DBNull.Value) ? "" : (string) Row["cod_cGrupo"];

Simple.cod_nSms = (Row["cod_nSms"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nSms"];

Simple.cod_nMail = (Row["cod_nMail"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nMail"];

Simple.cod_nVideo = (Row["cod_nVideo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nVideo"];

Simple.cod_nManual = (Row["cod_nManual"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nManual"];

Simple.cod_nMovil = (Row["cod_nMovil"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nMovil"];

Simple.cod_nAutoridad = (Row["cod_nAutoridad"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nAutoridad"];

Simple.cod_nLeeSonido = (Row["cod_nLeeSonido"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nLeeSonido"];

Simple.cod_nMultiMonitor = (Row["cod_nMultiMonitor"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nMultiMonitor"];

Simple.cod_cinstrucciones_DSS = (Row["cod_cinstrucciones_DSS"] == DBNull.Value) ? "" : (string) Row["cod_cinstrucciones_DSS"];

Simple.cod_cconfiguracion_DSS = (Row["cod_cconfiguracion_DSS"] == DBNull.Value) ? "" : (string) Row["cod_cconfiguracion_DSS"];

Simple.cod_nWebCliente = (Row["cod_nWebCliente"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cod_nWebCliente"];

Simple.cod_cAlarmaAutoprocesa = (Row["cod_cAlarmaAutoprocesa"] == DBNull.Value) ? "" : (string) Row["cod_cAlarmaAutoprocesa"];

Simple.cod_iTemplate = (Row["cod_iTemplate"] == DBNull.Value) ? 0 : (int) Row["cod_iTemplate"];


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
    using(var CmdParents = new SqlCommand("t_codigos_alarmaByParentObject", conn))
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
    Simplet_codigos_alarma Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_codigos_alarmaByParentObject", conn))
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
    Simple = new Simplet_codigos_alarma();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cod_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cod_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cod_nalerta = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cod_nprioridad = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cod_ntipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cod_nsistema = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cod_ncolor = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cod_cSonido = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cod_nColorLetra = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cod_nResuelve = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cod_cGrupo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cod_nSms = (Reader.IsDBNull(13)) ? new Decimal(0) : Reader.GetDecimal(13);
if (Reader.FieldCount > 14)Simple.cod_nMail = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.cod_nVideo = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.cod_nManual = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cod_nMovil = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cod_nAutoridad = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cod_nLeeSonido = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cod_nMultiMonitor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cod_cinstrucciones_DSS = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.cod_cconfiguracion_DSS = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.cod_nWebCliente = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cod_cAlarmaAutoprocesa = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cod_iTemplate = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);


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
    using (var CmdDataByName = new SqlCommand("t_codigos_alarmaByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_codigos_alarmaByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_codigos_alarmaByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_codigos_alarmaByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_codigos_alarmaByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_codigos_alarma Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_codigos_alarmaBySimplet_codigos_alarma", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cod_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@cod_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nalerta", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nprioridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_nsistema", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_ncolor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_cSonido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nColorLetra", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cod_nResuelve", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cGrupo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@cod_nSms", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMail", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nVideo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nManual", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMovil", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nAutoridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nLeeSonido", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_nMultiMonitor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cinstrucciones_DSS", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_cconfiguracion_DSS", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cod_nWebCliente", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cod_cAlarmaAutoprocesa", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cod_iTemplate", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cod_ccodigo"].Value = (this._cod_ccodigo == null) ? (object) DBNull.Value : (object) this._cod_ccodigo;

		cmd.Parameters["@cod_cdescripcion"].Value = (this._cod_cdescripcion == null) ? (object) DBNull.Value : (object) this._cod_cdescripcion;

		cmd.Parameters["@cod_nalerta"].Value = this._cod_nalerta;

		cmd.Parameters["@cod_nprioridad"].Value = this._cod_nprioridad;

		cmd.Parameters["@cod_ntipo"].Value = this._cod_ntipo;

		cmd.Parameters["@cod_nsistema"].Value = this._cod_nsistema;

		cmd.Parameters["@cod_ncolor"].Value = this._cod_ncolor;

		cmd.Parameters["@cod_cSonido"].Value = (this._cod_cSonido == null) ? (object) DBNull.Value : (object) this._cod_cSonido;

		cmd.Parameters["@cod_nColorLetra"].Value = this._cod_nColorLetra;

		cmd.Parameters["@cod_nResuelve"].Value = this._cod_nResuelve;

		cmd.Parameters["@cod_cGrupo"].Value = (this._cod_cGrupo == null) ? (object) DBNull.Value : (object) this._cod_cGrupo;

		cmd.Parameters["@cod_nSms"].Value = this._cod_nSms;

		cmd.Parameters["@cod_nMail"].Value = this._cod_nMail;

		cmd.Parameters["@cod_nVideo"].Value = this._cod_nVideo;

		cmd.Parameters["@cod_nManual"].Value = this._cod_nManual;

		cmd.Parameters["@cod_nMovil"].Value = this._cod_nMovil;

		cmd.Parameters["@cod_nAutoridad"].Value = this._cod_nAutoridad;

		cmd.Parameters["@cod_nLeeSonido"].Value = this._cod_nLeeSonido;

		cmd.Parameters["@cod_nMultiMonitor"].Value = this._cod_nMultiMonitor;

		cmd.Parameters["@cod_cinstrucciones_DSS"].Value = (this._cod_cinstrucciones_DSS == null) ? (object) DBNull.Value : (object) this._cod_cinstrucciones_DSS;

		cmd.Parameters["@cod_cconfiguracion_DSS"].Value = (this._cod_cconfiguracion_DSS == null) ? (object) DBNull.Value : (object) this._cod_cconfiguracion_DSS;

		cmd.Parameters["@cod_nWebCliente"].Value = this._cod_nWebCliente;

		cmd.Parameters["@cod_cAlarmaAutoprocesa"].Value = (this._cod_cAlarmaAutoprocesa == null) ? (object) DBNull.Value : (object) this._cod_cAlarmaAutoprocesa;

		cmd.Parameters["@cod_iTemplate"].Value = this._cod_iTemplate;


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
		 
		public IEnumerable<Simplet_codigos_alarma> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_codigos_alarmaByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_codigos_alarma Simple = new Simplet_codigos_alarma();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cod_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cod_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cod_nalerta = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cod_nprioridad = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cod_ntipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cod_nsistema = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cod_ncolor = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cod_cSonido = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cod_nColorLetra = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cod_nResuelve = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cod_cGrupo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cod_nSms = (Reader.IsDBNull(13)) ? new Decimal(0) : Reader.GetDecimal(13);
if (Reader.FieldCount > 14)Simple.cod_nMail = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.cod_nVideo = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.cod_nManual = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cod_nMovil = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cod_nAutoridad = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cod_nLeeSonido = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cod_nMultiMonitor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cod_cinstrucciones_DSS = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.cod_cconfiguracion_DSS = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.cod_nWebCliente = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cod_cAlarmaAutoprocesa = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cod_iTemplate = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_codigos_alarma> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_codigos_alarmaByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_codigos_alarma Simple = new Simplet_codigos_alarma();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cod_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cod_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cod_nalerta = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cod_nprioridad = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cod_ntipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cod_nsistema = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cod_ncolor = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cod_cSonido = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cod_nColorLetra = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cod_nResuelve = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cod_cGrupo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cod_nSms = (Reader.IsDBNull(13)) ? new Decimal(0) : Reader.GetDecimal(13);
if (Reader.FieldCount > 14)Simple.cod_nMail = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.cod_nVideo = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.cod_nManual = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cod_nMovil = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cod_nAutoridad = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cod_nLeeSonido = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cod_nMultiMonitor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cod_cinstrucciones_DSS = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.cod_cconfiguracion_DSS = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.cod_nWebCliente = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cod_cAlarmaAutoprocesa = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cod_iTemplate = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3089, "t_codigos_alarma");
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
    if (Reader.FieldCount > 2)this._cod_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._cod_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._cod_nalerta = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)this._cod_nprioridad = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)this._cod_ntipo = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._cod_nsistema = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._cod_ncolor = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._cod_cSonido = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._cod_nColorLetra = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._cod_nResuelve = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)this._cod_cGrupo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._cod_nSms = (Reader.IsDBNull(13)) ? new Decimal(0) : Reader.GetDecimal(13);
if (Reader.FieldCount > 14)this._cod_nMail = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)this._cod_nVideo = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)this._cod_nManual = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)this._cod_nMovil = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)this._cod_nAutoridad = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)this._cod_nLeeSonido = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)this._cod_nMultiMonitor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)this._cod_cinstrucciones_DSS = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)this._cod_cconfiguracion_DSS = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)this._cod_nWebCliente = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)this._cod_cAlarmaAutoprocesa = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)this._cod_iTemplate = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);

    }
    Reader.Close();
    }
   }
  
    }
  