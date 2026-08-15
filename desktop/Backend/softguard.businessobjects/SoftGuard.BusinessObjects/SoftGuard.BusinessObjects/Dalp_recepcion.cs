
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
     ///p_recepcion data access layer   
     ///</summary>
    public class Dalp_recepcion : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _rec_iidcuenta;
    
      private string _rec_calarma;
    
      private string _rec_czona;
    
      private int _rec_iusuario;
    
      private DateTime? _rec_tfechahora;
    
      private Decimal _rec_nestado;
    
      private string _rec_cContenido;
    
      private DateTime? _rec_tFechaProceso;
    
      private int _rec_ioperador;
    
      private string _rec_cObservaciones;
    
      private string _rec_cTerminal;
    
      private string _rec_idResolucion;
    
      private int _rec_idReceptor;
    
      private string _rec_cCategorizacion;
    
      private int _rec_iNYR;
    
      private int _rec_iTE;
    
      private DateTime? _rec_tFechaRecepcion;
    
      private Decimal _rec_nOrigen;
    
      private int _rec_idMap;
    
      private int _rec_idFwd;
    
      private int _rec_iMinutosEspera;
    
      private int _rec_iPuerto;
    
      private int _rec_idLoc;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///rec_iidcuenta   
     ///</summary>
      public int rec_iidcuenta
      {
      
          get{ return this._rec_iidcuenta; }
          set{ this._rec_iidcuenta = value; }
        
      }
     ///<summary>
     ///rec_calarma   
     ///</summary>
      public string rec_calarma
      {
      
          get{ return this._rec_calarma; }
          set{ this._rec_calarma = value; }
        
      }
     ///<summary>
     ///rec_czona   
     ///</summary>
      public string rec_czona
      {
      
          get{ return this._rec_czona; }
          set{ this._rec_czona = value; }
        
      }
     ///<summary>
     ///rec_iusuario   
     ///</summary>
      public int rec_iusuario
      {
      
          get{ return this._rec_iusuario; }
          set{ this._rec_iusuario = value; }
        
      }
     ///<summary>
     ///rec_tfechahora   
     ///</summary>
      public DateTime? rec_tfechahora
      {
      
          get{ return this._rec_tfechahora; }
          set{ this._rec_tfechahora = value; }
        
      }
     ///<summary>
     ///rec_nestado   
     ///</summary>
      public Decimal rec_nestado
      {
      
          get{ return this._rec_nestado; }
          set{ this._rec_nestado = value; }
        
      }
     ///<summary>
     ///rec_cContenido   
     ///</summary>
      public string rec_cContenido
      {
      
          get{ return this._rec_cContenido; }
          set{ this._rec_cContenido = value; }
        
      }
     ///<summary>
     ///rec_tFechaProceso   
     ///</summary>
      public DateTime? rec_tFechaProceso
      {
      
          get{ return this._rec_tFechaProceso; }
          set{ this._rec_tFechaProceso = value; }
        
      }
     ///<summary>
     ///rec_ioperador   
     ///</summary>
      public int rec_ioperador
      {
      
          get{ return this._rec_ioperador; }
          set{ this._rec_ioperador = value; }
        
      }
     ///<summary>
     ///rec_cObservaciones   
     ///</summary>
      public string rec_cObservaciones
      {
      
          get{ return this._rec_cObservaciones; }
          set{ this._rec_cObservaciones = value; }
        
      }
     ///<summary>
     ///rec_cTerminal   
     ///</summary>
      public string rec_cTerminal
      {
      
          get{ return this._rec_cTerminal; }
          set{ this._rec_cTerminal = value; }
        
      }
     ///<summary>
     ///rec_idResolucion   
     ///</summary>
      public string rec_idResolucion
      {
      
          get{ return this._rec_idResolucion; }
          set{ this._rec_idResolucion = value; }
        
      }
     ///<summary>
     ///rec_idReceptor   
     ///</summary>
      public int rec_idReceptor
      {
      
          get{ return this._rec_idReceptor; }
          set{ this._rec_idReceptor = value; }
        
      }
     ///<summary>
     ///rec_cCategorizacion   
     ///</summary>
      public string rec_cCategorizacion
      {
      
          get{ return this._rec_cCategorizacion; }
          set{ this._rec_cCategorizacion = value; }
        
      }
     ///<summary>
     ///rec_iNYR   
     ///</summary>
      public int rec_iNYR
      {
      
          get{ return this._rec_iNYR; }
          set{ this._rec_iNYR = value; }
        
      }
     ///<summary>
     ///rec_iTE   
     ///</summary>
      public int rec_iTE
      {
      
          get{ return this._rec_iTE; }
          set{ this._rec_iTE = value; }
        
      }
     ///<summary>
     ///rec_tFechaRecepcion   
     ///</summary>
      public DateTime? rec_tFechaRecepcion
      {
      
          get{ return this._rec_tFechaRecepcion; }
          set{ this._rec_tFechaRecepcion = value; }
        
      }
     ///<summary>
     ///rec_nOrigen   
     ///</summary>
      public Decimal rec_nOrigen
      {
      
          get{ return this._rec_nOrigen; }
          set{ this._rec_nOrigen = value; }
        
      }
     ///<summary>
     ///rec_idMap   
     ///</summary>
      public int rec_idMap
      {
      
          get{ return this._rec_idMap; }
          set{ this._rec_idMap = value; }
        
      }
     ///<summary>
     ///rec_idFwd   
     ///</summary>
      public int rec_idFwd
      {
      
          get{ return this._rec_idFwd; }
          set{ this._rec_idFwd = value; }
        
      }
     ///<summary>
     ///rec_iMinutosEspera   
     ///</summary>
      public int rec_iMinutosEspera
      {
      
          get{ return this._rec_iMinutosEspera; }
          set{ this._rec_iMinutosEspera = value; }
        
      }
     ///<summary>
     ///rec_iPuerto   
     ///</summary>
      public int rec_iPuerto
      {
      
          get{ return this._rec_iPuerto; }
          set{ this._rec_iPuerto = value; }
        
      }
     ///<summary>
     ///rec_idLoc   
     ///</summary>
      public int rec_idLoc
      {
      
          get{ return this._rec_idLoc; }
          set{ this._rec_idLoc = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_recepcion(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_recepcion(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_recepcion(SqlHelper SqlConfig, int UserId, Simplep_recepcion Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rec_iidcuenta = Simple.rec_iidcuenta;

      this._rec_calarma = Simple.rec_calarma;

      this._rec_czona = Simple.rec_czona;

      this._rec_iusuario = Simple.rec_iusuario;

      this._rec_tfechahora = Simple.rec_tfechahora;

      this._rec_nestado = Simple.rec_nestado;

      this._rec_cContenido = Simple.rec_cContenido;

      this._rec_tFechaProceso = Simple.rec_tFechaProceso;

      this._rec_ioperador = Simple.rec_ioperador;

      this._rec_cObservaciones = Simple.rec_cObservaciones;

      this._rec_cTerminal = Simple.rec_cTerminal;

      this._rec_idResolucion = Simple.rec_idResolucion;

      this._rec_idReceptor = Simple.rec_idReceptor;

      this._rec_cCategorizacion = Simple.rec_cCategorizacion;

      this._rec_iNYR = Simple.rec_iNYR;

      this._rec_iTE = Simple.rec_iTE;

      this._rec_tFechaRecepcion = Simple.rec_tFechaRecepcion;

      this._rec_nOrigen = Simple.rec_nOrigen;

      this._rec_idMap = Simple.rec_idMap;

      this._rec_idFwd = Simple.rec_idFwd;

      this._rec_iMinutosEspera = Simple.rec_iMinutosEspera;

      this._rec_iPuerto = Simple.rec_iPuerto;

      this._rec_idLoc = Simple.rec_idLoc;

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
    using(var cmd = new SqlCommand("p_recepcionIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@rec_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_calarma", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_czona", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_iusuario", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_tfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rec_cContenido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rec_tFechaProceso", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_cObservaciones", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@rec_cTerminal", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_idResolucion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rec_idReceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_cCategorizacion", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_iNYR", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iTE", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_tFechaRecepcion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_nOrigen", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rec_idMap", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_idFwd", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iMinutosEspera", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iPuerto", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@rec_idLoc", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rec_iidcuenta"].Value = this._rec_iidcuenta;

		cmd.Parameters["@rec_calarma"].Value = (this._rec_calarma == null) ? (object) DBNull.Value : (object) this._rec_calarma;

		cmd.Parameters["@rec_czona"].Value = (this._rec_czona == null) ? (object) DBNull.Value : (object) this._rec_czona;

		cmd.Parameters["@rec_iusuario"].Value = this._rec_iusuario;

		cmd.Parameters["@rec_tfechahora"].Value = (this._rec_tfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tfechahora;

		cmd.Parameters["@rec_nestado"].Value = this._rec_nestado;

		cmd.Parameters["@rec_cContenido"].Value = (this._rec_cContenido == null) ? (object) DBNull.Value : (object) this._rec_cContenido;

		cmd.Parameters["@rec_tFechaProceso"].Value = (this._rec_tFechaProceso == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tFechaProceso;

		cmd.Parameters["@rec_ioperador"].Value = this._rec_ioperador;

		cmd.Parameters["@rec_cObservaciones"].Value = (this._rec_cObservaciones == null) ? (object) DBNull.Value : (object) this._rec_cObservaciones;

		cmd.Parameters["@rec_cTerminal"].Value = (this._rec_cTerminal == null) ? (object) DBNull.Value : (object) this._rec_cTerminal;

		cmd.Parameters["@rec_idResolucion"].Value = (this._rec_idResolucion == null) ? (object) DBNull.Value : (object) this._rec_idResolucion;

		cmd.Parameters["@rec_idReceptor"].Value = this._rec_idReceptor;

		cmd.Parameters["@rec_cCategorizacion"].Value = (this._rec_cCategorizacion == null) ? (object) DBNull.Value : (object) this._rec_cCategorizacion;

		cmd.Parameters["@rec_iNYR"].Value = this._rec_iNYR;

		cmd.Parameters["@rec_iTE"].Value = this._rec_iTE;

		cmd.Parameters["@rec_tFechaRecepcion"].Value = (this._rec_tFechaRecepcion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tFechaRecepcion;

		cmd.Parameters["@rec_nOrigen"].Value = this._rec_nOrigen;

		cmd.Parameters["@rec_idMap"].Value = this._rec_idMap;

		cmd.Parameters["@rec_idFwd"].Value = this._rec_idFwd;

		cmd.Parameters["@rec_iMinutosEspera"].Value = this._rec_iMinutosEspera;

		cmd.Parameters["@rec_iPuerto"].Value = this._rec_iPuerto;

		cmd.Parameters["@rec_idLoc"].Value = this._rec_idLoc;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_recepcionUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@rec_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_calarma", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_czona", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_iusuario", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_tfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rec_cContenido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rec_tFechaProceso", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_cObservaciones", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@rec_cTerminal", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_idResolucion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rec_idReceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_cCategorizacion", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_iNYR", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iTE", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_tFechaRecepcion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_nOrigen", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rec_idMap", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_idFwd", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iMinutosEspera", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iPuerto", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@rec_idLoc", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rec_iidcuenta"].Value = this._rec_iidcuenta;

		cmd.Parameters["@rec_calarma"].Value = (this._rec_calarma == null) ? (object) DBNull.Value : (object) this._rec_calarma;

		cmd.Parameters["@rec_czona"].Value = (this._rec_czona == null) ? (object) DBNull.Value : (object) this._rec_czona;

		cmd.Parameters["@rec_iusuario"].Value = this._rec_iusuario;

		cmd.Parameters["@rec_tfechahora"].Value = (this._rec_tfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tfechahora;

		cmd.Parameters["@rec_nestado"].Value = this._rec_nestado;

		cmd.Parameters["@rec_cContenido"].Value = (this._rec_cContenido == null) ? (object) DBNull.Value : (object) this._rec_cContenido;

		cmd.Parameters["@rec_tFechaProceso"].Value = (this._rec_tFechaProceso == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tFechaProceso;

		cmd.Parameters["@rec_ioperador"].Value = this._rec_ioperador;

		cmd.Parameters["@rec_cObservaciones"].Value = (this._rec_cObservaciones == null) ? (object) DBNull.Value : (object) this._rec_cObservaciones;

		cmd.Parameters["@rec_cTerminal"].Value = (this._rec_cTerminal == null) ? (object) DBNull.Value : (object) this._rec_cTerminal;

		cmd.Parameters["@rec_idResolucion"].Value = (this._rec_idResolucion == null) ? (object) DBNull.Value : (object) this._rec_idResolucion;

		cmd.Parameters["@rec_idReceptor"].Value = this._rec_idReceptor;

		cmd.Parameters["@rec_cCategorizacion"].Value = (this._rec_cCategorizacion == null) ? (object) DBNull.Value : (object) this._rec_cCategorizacion;

		cmd.Parameters["@rec_iNYR"].Value = this._rec_iNYR;

		cmd.Parameters["@rec_iTE"].Value = this._rec_iTE;

		cmd.Parameters["@rec_tFechaRecepcion"].Value = (this._rec_tFechaRecepcion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tFechaRecepcion;

		cmd.Parameters["@rec_nOrigen"].Value = this._rec_nOrigen;

		cmd.Parameters["@rec_idMap"].Value = this._rec_idMap;

		cmd.Parameters["@rec_idFwd"].Value = this._rec_idFwd;

		cmd.Parameters["@rec_iMinutosEspera"].Value = this._rec_iMinutosEspera;

		cmd.Parameters["@rec_iPuerto"].Value = this._rec_iPuerto;

		cmd.Parameters["@rec_idLoc"].Value = this._rec_idLoc;

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
    throw new RuntimeException("The p_recepcion is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_recepcionDel", conn))
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
    using(var CmdSel = new SqlCommand("p_recepcionSel", conn))
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
    Simplep_recepcion Simple = new Simplep_recepcion();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.rec_iidcuenta = this._rec_iidcuenta;

      Simple.rec_calarma = this._rec_calarma;

      Simple.rec_czona = this._rec_czona;

      Simple.rec_iusuario = this._rec_iusuario;

      Simple.rec_tfechahora = this._rec_tfechahora;

      Simple.rec_nestado = this._rec_nestado;

      Simple.rec_cContenido = this._rec_cContenido;

      Simple.rec_tFechaProceso = this._rec_tFechaProceso;

      Simple.rec_ioperador = this._rec_ioperador;

      Simple.rec_cObservaciones = this._rec_cObservaciones;

      Simple.rec_cTerminal = this._rec_cTerminal;

      Simple.rec_idResolucion = this._rec_idResolucion;

      Simple.rec_idReceptor = this._rec_idReceptor;

      Simple.rec_cCategorizacion = this._rec_cCategorizacion;

      Simple.rec_iNYR = this._rec_iNYR;

      Simple.rec_iTE = this._rec_iTE;

      Simple.rec_tFechaRecepcion = this._rec_tFechaRecepcion;

      Simple.rec_nOrigen = this._rec_nOrigen;

      Simple.rec_idMap = this._rec_idMap;

      Simple.rec_idFwd = this._rec_idFwd;

      Simple.rec_iMinutosEspera = this._rec_iMinutosEspera;

      Simple.rec_iPuerto = this._rec_iPuerto;

      Simple.rec_idLoc = this._rec_idLoc;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_recepcion)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rec_iidcuenta = Simple.rec_iidcuenta;

      this._rec_calarma = Simple.rec_calarma;

      this._rec_czona = Simple.rec_czona;

      this._rec_iusuario = Simple.rec_iusuario;

      this._rec_tfechahora = Simple.rec_tfechahora;

      this._rec_nestado = Simple.rec_nestado;

      this._rec_cContenido = Simple.rec_cContenido;

      this._rec_tFechaProceso = Simple.rec_tFechaProceso;

      this._rec_ioperador = Simple.rec_ioperador;

      this._rec_cObservaciones = Simple.rec_cObservaciones;

      this._rec_cTerminal = Simple.rec_cTerminal;

      this._rec_idResolucion = Simple.rec_idResolucion;

      this._rec_idReceptor = Simple.rec_idReceptor;

      this._rec_cCategorizacion = Simple.rec_cCategorizacion;

      this._rec_iNYR = Simple.rec_iNYR;

      this._rec_iTE = Simple.rec_iTE;

      this._rec_tFechaRecepcion = Simple.rec_tFechaRecepcion;

      this._rec_nOrigen = Simple.rec_nOrigen;

      this._rec_idMap = Simple.rec_idMap;

      this._rec_idFwd = Simple.rec_idFwd;

      this._rec_iMinutosEspera = Simple.rec_iMinutosEspera;

      this._rec_iPuerto = Simple.rec_iPuerto;

      this._rec_idLoc = Simple.rec_idLoc;

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
    Callerp_recepcion Caller = new Callerp_recepcion();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.rec_iidcuenta = this._rec_iidcuenta;

      Caller.rec_calarma = this._rec_calarma;

      Caller.rec_czona = this._rec_czona;

      Caller.rec_iusuario = this._rec_iusuario;

      Caller.rec_tfechahora = this._rec_tfechahora;

      Caller.rec_nestado = this._rec_nestado;

      Caller.rec_cContenido = this._rec_cContenido;

      Caller.rec_tFechaProceso = this._rec_tFechaProceso;

      Caller.rec_ioperador = this._rec_ioperador;

      Caller.rec_cObservaciones = this._rec_cObservaciones;

      Caller.rec_cTerminal = this._rec_cTerminal;

      Caller.rec_idResolucion = this._rec_idResolucion;

      Caller.rec_idReceptor = this._rec_idReceptor;

      Caller.rec_cCategorizacion = this._rec_cCategorizacion;

      Caller.rec_iNYR = this._rec_iNYR;

      Caller.rec_iTE = this._rec_iTE;

      Caller.rec_tFechaRecepcion = this._rec_tFechaRecepcion;

      Caller.rec_nOrigen = this._rec_nOrigen;

      Caller.rec_idMap = this._rec_idMap;

      Caller.rec_idFwd = this._rec_idFwd;

      Caller.rec_iMinutosEspera = this._rec_iMinutosEspera;

      Caller.rec_iPuerto = this._rec_iPuerto;

      Caller.rec_idLoc = this._rec_idLoc;

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
    
      dt.Columns.Add(new DataColumn("rec_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_calarma", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rec_czona", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rec_iusuario", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_tfechahora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rec_nestado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("rec_cContenido", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rec_tFechaProceso", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rec_ioperador", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_cObservaciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rec_cTerminal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rec_idResolucion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rec_idReceptor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_cCategorizacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rec_iNYR", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_iTE", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_tFechaRecepcion", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rec_nOrigen", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("rec_idMap", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_idFwd", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_iMinutosEspera", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_iPuerto", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rec_idLoc", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["rec_iidcuenta"] = this._rec_iidcuenta;

      dr["rec_calarma"] = this._rec_calarma;

      dr["rec_czona"] = this._rec_czona;

      dr["rec_iusuario"] = this._rec_iusuario;

      dr["rec_tfechahora"] = (object)this._rec_tfechahora  ?? DBNull.Value;

      dr["rec_nestado"] = this._rec_nestado;

      dr["rec_cContenido"] = this._rec_cContenido;

      dr["rec_tFechaProceso"] = (object)this._rec_tFechaProceso  ?? DBNull.Value;

      dr["rec_ioperador"] = this._rec_ioperador;

      dr["rec_cObservaciones"] = this._rec_cObservaciones;

      dr["rec_cTerminal"] = this._rec_cTerminal;

      dr["rec_idResolucion"] = this._rec_idResolucion;

      dr["rec_idReceptor"] = this._rec_idReceptor;

      dr["rec_cCategorizacion"] = this._rec_cCategorizacion;

      dr["rec_iNYR"] = this._rec_iNYR;

      dr["rec_iTE"] = this._rec_iTE;

      dr["rec_tFechaRecepcion"] = (object)this._rec_tFechaRecepcion  ?? DBNull.Value;

      dr["rec_nOrigen"] = this._rec_nOrigen;

      dr["rec_idMap"] = this._rec_idMap;

      dr["rec_idFwd"] = this._rec_idFwd;

      dr["rec_iMinutosEspera"] = this._rec_iMinutosEspera;

      dr["rec_iPuerto"] = this._rec_iPuerto;

      dr["rec_idLoc"] = this._rec_idLoc;

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
    using(var CmdChilds = new SqlCommand("p_recepcionByChildObject", conn))
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
    Simplep_recepcion Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_recepcionByChildObject", conn))
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
    Simple = new Simplep_recepcion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rec_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rec_calarma = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rec_czona = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rec_iusuario = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.rec_tfechahora = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rec_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rec_cContenido = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.rec_tFechaProceso = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.rec_ioperador = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rec_cObservaciones = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.rec_cTerminal = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.rec_idResolucion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.rec_idReceptor = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.rec_cCategorizacion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.rec_iNYR = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.rec_iTE = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.rec_tFechaRecepcion = (Reader.IsDBNull(18)) ? new DateTime(1,1,1) : Reader.GetDateTime(18);
if (Reader.FieldCount > 19)Simple.rec_nOrigen = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.rec_idMap = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.rec_idFwd = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.rec_iMinutosEspera = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.rec_iPuerto = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt16(23);
if (Reader.FieldCount > 24)Simple.rec_idLoc = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);


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
    Simplep_recepcion Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_recepcion();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.rec_iidcuenta = (Row["rec_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["rec_iidcuenta"];

Simple.rec_calarma = (Row["rec_calarma"] == DBNull.Value) ? "" : (string) Row["rec_calarma"];

Simple.rec_czona = (Row["rec_czona"] == DBNull.Value) ? "" : (string) Row["rec_czona"];

Simple.rec_iusuario = (Row["rec_iusuario"] == DBNull.Value) ? 0 : (int) Row["rec_iusuario"];

Simple.rec_tfechahora = (Row["rec_tfechahora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rec_tfechahora"];

Simple.rec_nestado = (Row["rec_nestado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["rec_nestado"];

Simple.rec_cContenido = (Row["rec_cContenido"] == DBNull.Value) ? "" : (string) Row["rec_cContenido"];

Simple.rec_tFechaProceso = (Row["rec_tFechaProceso"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rec_tFechaProceso"];

Simple.rec_ioperador = (Row["rec_ioperador"] == DBNull.Value) ? 0 : (int) Row["rec_ioperador"];

Simple.rec_cObservaciones = (Row["rec_cObservaciones"] == DBNull.Value) ? "" : (string) Row["rec_cObservaciones"];

Simple.rec_cTerminal = (Row["rec_cTerminal"] == DBNull.Value) ? "" : (string) Row["rec_cTerminal"];

Simple.rec_idResolucion = (Row["rec_idResolucion"] == DBNull.Value) ? "" : (string) Row["rec_idResolucion"];

Simple.rec_idReceptor = (Row["rec_idReceptor"] == DBNull.Value) ? 0 : (int) Row["rec_idReceptor"];

Simple.rec_cCategorizacion = (Row["rec_cCategorizacion"] == DBNull.Value) ? "" : (string) Row["rec_cCategorizacion"];

Simple.rec_iNYR = (Row["rec_iNYR"] == DBNull.Value) ? 0 : (int) Row["rec_iNYR"];

Simple.rec_iTE = (Row["rec_iTE"] == DBNull.Value) ? 0 : (int) Row["rec_iTE"];

Simple.rec_tFechaRecepcion = (Row["rec_tFechaRecepcion"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rec_tFechaRecepcion"];

Simple.rec_nOrigen = (Row["rec_nOrigen"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["rec_nOrigen"];

Simple.rec_idMap = (Row["rec_idMap"] == DBNull.Value) ? 0 : (int) Row["rec_idMap"];

Simple.rec_idFwd = (Row["rec_idFwd"] == DBNull.Value) ? 0 : (int) Row["rec_idFwd"];

Simple.rec_iMinutosEspera = (Row["rec_iMinutosEspera"] == DBNull.Value) ? 0 : (int) Row["rec_iMinutosEspera"];

Simple.rec_iPuerto = (Row["rec_iPuerto"] == DBNull.Value) ? 0 : (int) Row["rec_iPuerto"];

Simple.rec_idLoc = (Row["rec_idLoc"] == DBNull.Value) ? 0 : (int) Row["rec_idLoc"];


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
    using(var CmdParents = new SqlCommand("p_recepcionByParentObject", conn))
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
    Simplep_recepcion Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_recepcionByParentObject", conn))
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
    Simple = new Simplep_recepcion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rec_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rec_calarma = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rec_czona = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rec_iusuario = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.rec_tfechahora = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rec_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rec_cContenido = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.rec_tFechaProceso = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.rec_ioperador = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rec_cObservaciones = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.rec_cTerminal = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.rec_idResolucion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.rec_idReceptor = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.rec_cCategorizacion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.rec_iNYR = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.rec_iTE = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.rec_tFechaRecepcion = (Reader.IsDBNull(18)) ? new DateTime(1,1,1) : Reader.GetDateTime(18);
if (Reader.FieldCount > 19)Simple.rec_nOrigen = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.rec_idMap = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.rec_idFwd = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.rec_iMinutosEspera = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.rec_iPuerto = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt16(23);
if (Reader.FieldCount > 24)Simple.rec_idLoc = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);


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
    using (var CmdDataByName = new SqlCommand("p_recepcionByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_recepcionByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_recepcionByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_recepcionByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_recepcionByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_recepcion Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_recepcionBySimplep_recepcion", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@rec_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_calarma", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_czona", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_iusuario", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_tfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rec_cContenido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rec_tFechaProceso", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_cObservaciones", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@rec_cTerminal", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_idResolucion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rec_idReceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_cCategorizacion", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@rec_iNYR", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iTE", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_tFechaRecepcion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rec_nOrigen", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rec_idMap", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_idFwd", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iMinutosEspera", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rec_iPuerto", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@rec_idLoc", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@rec_iidcuenta"].Value = this._rec_iidcuenta;

		cmd.Parameters["@rec_calarma"].Value = (this._rec_calarma == null) ? (object) DBNull.Value : (object) this._rec_calarma;

		cmd.Parameters["@rec_czona"].Value = (this._rec_czona == null) ? (object) DBNull.Value : (object) this._rec_czona;

		cmd.Parameters["@rec_iusuario"].Value = this._rec_iusuario;

		cmd.Parameters["@rec_tfechahora"].Value = (this._rec_tfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tfechahora;

		cmd.Parameters["@rec_nestado"].Value = this._rec_nestado;

		cmd.Parameters["@rec_cContenido"].Value = (this._rec_cContenido == null) ? (object) DBNull.Value : (object) this._rec_cContenido;

		cmd.Parameters["@rec_tFechaProceso"].Value = (this._rec_tFechaProceso == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tFechaProceso;

		cmd.Parameters["@rec_ioperador"].Value = this._rec_ioperador;

		cmd.Parameters["@rec_cObservaciones"].Value = (this._rec_cObservaciones == null) ? (object) DBNull.Value : (object) this._rec_cObservaciones;

		cmd.Parameters["@rec_cTerminal"].Value = (this._rec_cTerminal == null) ? (object) DBNull.Value : (object) this._rec_cTerminal;

		cmd.Parameters["@rec_idResolucion"].Value = (this._rec_idResolucion == null) ? (object) DBNull.Value : (object) this._rec_idResolucion;

		cmd.Parameters["@rec_idReceptor"].Value = this._rec_idReceptor;

		cmd.Parameters["@rec_cCategorizacion"].Value = (this._rec_cCategorizacion == null) ? (object) DBNull.Value : (object) this._rec_cCategorizacion;

		cmd.Parameters["@rec_iNYR"].Value = this._rec_iNYR;

		cmd.Parameters["@rec_iTE"].Value = this._rec_iTE;

		cmd.Parameters["@rec_tFechaRecepcion"].Value = (this._rec_tFechaRecepcion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rec_tFechaRecepcion;

		cmd.Parameters["@rec_nOrigen"].Value = this._rec_nOrigen;

		cmd.Parameters["@rec_idMap"].Value = this._rec_idMap;

		cmd.Parameters["@rec_idFwd"].Value = this._rec_idFwd;

		cmd.Parameters["@rec_iMinutosEspera"].Value = this._rec_iMinutosEspera;

		cmd.Parameters["@rec_iPuerto"].Value = this._rec_iPuerto;

		cmd.Parameters["@rec_idLoc"].Value = this._rec_idLoc;


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
		 
		public IEnumerable<Simplep_recepcion> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_recepcionByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_recepcion Simple = new Simplep_recepcion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rec_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rec_calarma = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rec_czona = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rec_iusuario = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.rec_tfechahora = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rec_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rec_cContenido = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.rec_tFechaProceso = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.rec_ioperador = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rec_cObservaciones = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.rec_cTerminal = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.rec_idResolucion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.rec_idReceptor = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.rec_cCategorizacion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.rec_iNYR = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.rec_iTE = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.rec_tFechaRecepcion = (Reader.IsDBNull(18)) ? new DateTime(1,1,1) : Reader.GetDateTime(18);
if (Reader.FieldCount > 19)Simple.rec_nOrigen = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.rec_idMap = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.rec_idFwd = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.rec_iMinutosEspera = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.rec_iPuerto = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt16(23);
if (Reader.FieldCount > 24)Simple.rec_idLoc = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_recepcion> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_recepcionByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_recepcion Simple = new Simplep_recepcion();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rec_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rec_calarma = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.rec_czona = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rec_iusuario = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.rec_tfechahora = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.rec_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rec_cContenido = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.rec_tFechaProceso = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.rec_ioperador = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rec_cObservaciones = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.rec_cTerminal = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.rec_idResolucion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.rec_idReceptor = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.rec_cCategorizacion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.rec_iNYR = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)Simple.rec_iTE = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.rec_tFechaRecepcion = (Reader.IsDBNull(18)) ? new DateTime(1,1,1) : Reader.GetDateTime(18);
if (Reader.FieldCount > 19)Simple.rec_nOrigen = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.rec_idMap = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.rec_idFwd = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.rec_iMinutosEspera = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.rec_iPuerto = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt16(23);
if (Reader.FieldCount > 24)Simple.rec_idLoc = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3100, "p_recepcion");
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
    if (Reader.FieldCount > 2)this._rec_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._rec_calarma = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._rec_czona = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._rec_iusuario = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._rec_tfechahora = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._rec_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._rec_cContenido = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._rec_tFechaProceso = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)this._rec_ioperador = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._rec_cObservaciones = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._rec_cTerminal = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._rec_idResolucion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._rec_idReceptor = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)this._rec_cCategorizacion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._rec_iNYR = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);
if (Reader.FieldCount > 17)this._rec_iTE = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)this._rec_tFechaRecepcion = (Reader.IsDBNull(18)) ? new DateTime(1,1,1) : Reader.GetDateTime(18);
if (Reader.FieldCount > 19)this._rec_nOrigen = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)this._rec_idMap = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)this._rec_idFwd = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)this._rec_iMinutosEspera = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)this._rec_iPuerto = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt16(23);
if (Reader.FieldCount > 24)this._rec_idLoc = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);

    }
    Reader.Close();
    }
   }
  
    }
  