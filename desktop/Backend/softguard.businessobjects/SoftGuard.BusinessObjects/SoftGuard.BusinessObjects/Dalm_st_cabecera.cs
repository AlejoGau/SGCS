
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
     ///m_st_cabecera data access layer   
     ///</summary>
    public class Dalm_st_cabecera : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _stc_iid_cuenta;
    
      private int _stc_inumero;
    
      private string _stc_ctipo_servicio;
    
      private string _stc_mobservaciones;
    
      private DateTime? _stc_dfecha_desde_1;
    
      private DateTime? _stc_dfecha_hasta_1;
    
      private DateTime? _stc_dfecha_desde_2;
    
      private DateTime? _stc_dfecha_hasta_2;
    
      private DateTime? _stc_dfecha_desde_3;
    
      private DateTime? _stc_dfecha_hasta_3;
    
      private DateTime? _stc_dfecha_cierre;
    
      private string _stc_ccontacto;
    
      private Decimal _stc_nestado;
    
      private string _stc_ctecnico_1;
    
      private string _stc_ctecnico_2;
    
      private string _stc_ctecnico_3;
    
      private string _stc_ctecnico_4;
    
      private string _stc_ctecnico_5;
    
      private Decimal _stc_yValor;
    
      private Decimal _stc_nreclamo_1;
    
      private string _stc_creclamo_1;
    
      private Decimal _stc_nreclamo_2;
    
      private string _stc_creclamo_2;
    
      private Decimal _stc_nreclamo_3;
    
      private string _stc_creclamo_3;
    
      private Decimal _stc_nreclamo_4;
    
      private string _stc_creclamo_4;
    
      private Decimal _stc_nreclamo_5;
    
      private string _stc_creclamo_5;
    
      private string _stc_cmovil_1;
    
      private string _stc_cmovil_2;
    
      private DateTime? _stc_dfecha_modificacion;
    
      private int _stc_ioperador;
    
      private string _stc_minsumos;
    
      private DateTime? _stc_dintecnico_1;
    
      private DateTime? _stc_doutecnico_1;
    
      private DateTime? _stc_dintecnico_2;
    
      private DateTime? _stc_doutecnico_2;
    
      private DateTime? _stc_dintecnico_3;
    
      private DateTime? _stc_doutecnico_3;
    
      private string _stc_cdeposito;
    
      private DateTime? _stf_dfecha_vto_orden;
    
      private DateTime? _stc_dsalida_al_cliente_DSS;
    
      private DateTime? _stc_darribo_al_cliente_DSS;
    
      private DateTime? _stc_dsalida_desde_cliente_DSS;
    
      private int _stc_iforma_viaje_DSS;
    
      private string _stc_cconformidad_html ;
    
      private int _stc_idorigenorden;
    
      private DateTime? _stc_dfechapago;
    
      private Decimal _stc_nvalorpagotecnico;
    
      private Decimal _stc_ncostomanodeobra;
    
      private int _stc_iPrioridad;
    
      private int _stc_iOrganizacion;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///stc_iid_cuenta   
     ///</summary>
      public int stc_iid_cuenta
      {
      
          get{ return this._stc_iid_cuenta; }
          set{ this._stc_iid_cuenta = value; }
        
      }
     ///<summary>
     ///stc_inumero   
     ///</summary>
      public int stc_inumero
      {
      
          get{ return this._stc_inumero; }
          set{ this._stc_inumero = value; }
        
      }
     ///<summary>
     ///stc_ctipo_servicio   
     ///</summary>
      public string stc_ctipo_servicio
      {
      
          get{ return this._stc_ctipo_servicio; }
          set{ this._stc_ctipo_servicio = value; }
        
      }
     ///<summary>
     ///stc_mobservaciones   
     ///</summary>
      public string stc_mobservaciones
      {
      
          get{ return this._stc_mobservaciones; }
          set{ this._stc_mobservaciones = value; }
        
      }
     ///<summary>
     ///stc_dfecha_desde_1   
     ///</summary>
      public DateTime? stc_dfecha_desde_1
      {
      
          get{ return this._stc_dfecha_desde_1; }
          set{ this._stc_dfecha_desde_1 = value; }
        
      }
     ///<summary>
     ///stc_dfecha_hasta_1   
     ///</summary>
      public DateTime? stc_dfecha_hasta_1
      {
      
          get{ return this._stc_dfecha_hasta_1; }
          set{ this._stc_dfecha_hasta_1 = value; }
        
      }
     ///<summary>
     ///stc_dfecha_desde_2   
     ///</summary>
      public DateTime? stc_dfecha_desde_2
      {
      
          get{ return this._stc_dfecha_desde_2; }
          set{ this._stc_dfecha_desde_2 = value; }
        
      }
     ///<summary>
     ///stc_dfecha_hasta_2   
     ///</summary>
      public DateTime? stc_dfecha_hasta_2
      {
      
          get{ return this._stc_dfecha_hasta_2; }
          set{ this._stc_dfecha_hasta_2 = value; }
        
      }
     ///<summary>
     ///stc_dfecha_desde_3   
     ///</summary>
      public DateTime? stc_dfecha_desde_3
      {
      
          get{ return this._stc_dfecha_desde_3; }
          set{ this._stc_dfecha_desde_3 = value; }
        
      }
     ///<summary>
     ///stc_dfecha_hasta_3   
     ///</summary>
      public DateTime? stc_dfecha_hasta_3
      {
      
          get{ return this._stc_dfecha_hasta_3; }
          set{ this._stc_dfecha_hasta_3 = value; }
        
      }
     ///<summary>
     ///stc_dfecha_cierre   
     ///</summary>
      public DateTime? stc_dfecha_cierre
      {
      
          get{ return this._stc_dfecha_cierre; }
          set{ this._stc_dfecha_cierre = value; }
        
      }
     ///<summary>
     ///stc_ccontacto   
     ///</summary>
      public string stc_ccontacto
      {
      
          get{ return this._stc_ccontacto; }
          set{ this._stc_ccontacto = value; }
        
      }
     ///<summary>
     ///stc_nestado   
     ///</summary>
      public Decimal stc_nestado
      {
      
          get{ return this._stc_nestado; }
          set{ this._stc_nestado = value; }
        
      }
     ///<summary>
     ///stc_ctecnico_1   
     ///</summary>
      public string stc_ctecnico_1
      {
      
          get{ return this._stc_ctecnico_1; }
          set{ this._stc_ctecnico_1 = value; }
        
      }
     ///<summary>
     ///stc_ctecnico_2   
     ///</summary>
      public string stc_ctecnico_2
      {
      
          get{ return this._stc_ctecnico_2; }
          set{ this._stc_ctecnico_2 = value; }
        
      }
     ///<summary>
     ///stc_ctecnico_3   
     ///</summary>
      public string stc_ctecnico_3
      {
      
          get{ return this._stc_ctecnico_3; }
          set{ this._stc_ctecnico_3 = value; }
        
      }
     ///<summary>
     ///stc_ctecnico_4   
     ///</summary>
      public string stc_ctecnico_4
      {
      
          get{ return this._stc_ctecnico_4; }
          set{ this._stc_ctecnico_4 = value; }
        
      }
     ///<summary>
     ///stc_ctecnico_5   
     ///</summary>
      public string stc_ctecnico_5
      {
      
          get{ return this._stc_ctecnico_5; }
          set{ this._stc_ctecnico_5 = value; }
        
      }
     ///<summary>
     ///stc_yValor   
     ///</summary>
      public Decimal stc_yValor
      {
      
          get{ return this._stc_yValor; }
          set{ this._stc_yValor = value; }
        
      }
     ///<summary>
     ///stc_nreclamo_1   
     ///</summary>
      public Decimal stc_nreclamo_1
      {
      
          get{ return this._stc_nreclamo_1; }
          set{ this._stc_nreclamo_1 = value; }
        
      }
     ///<summary>
     ///stc_creclamo_1   
     ///</summary>
      public string stc_creclamo_1
      {
      
          get{ return this._stc_creclamo_1; }
          set{ this._stc_creclamo_1 = value; }
        
      }
     ///<summary>
     ///stc_nreclamo_2   
     ///</summary>
      public Decimal stc_nreclamo_2
      {
      
          get{ return this._stc_nreclamo_2; }
          set{ this._stc_nreclamo_2 = value; }
        
      }
     ///<summary>
     ///stc_creclamo_2   
     ///</summary>
      public string stc_creclamo_2
      {
      
          get{ return this._stc_creclamo_2; }
          set{ this._stc_creclamo_2 = value; }
        
      }
     ///<summary>
     ///stc_nreclamo_3   
     ///</summary>
      public Decimal stc_nreclamo_3
      {
      
          get{ return this._stc_nreclamo_3; }
          set{ this._stc_nreclamo_3 = value; }
        
      }
     ///<summary>
     ///stc_creclamo_3   
     ///</summary>
      public string stc_creclamo_3
      {
      
          get{ return this._stc_creclamo_3; }
          set{ this._stc_creclamo_3 = value; }
        
      }
     ///<summary>
     ///stc_nreclamo_4   
     ///</summary>
      public Decimal stc_nreclamo_4
      {
      
          get{ return this._stc_nreclamo_4; }
          set{ this._stc_nreclamo_4 = value; }
        
      }
     ///<summary>
     ///stc_creclamo_4   
     ///</summary>
      public string stc_creclamo_4
      {
      
          get{ return this._stc_creclamo_4; }
          set{ this._stc_creclamo_4 = value; }
        
      }
     ///<summary>
     ///stc_nreclamo_5   
     ///</summary>
      public Decimal stc_nreclamo_5
      {
      
          get{ return this._stc_nreclamo_5; }
          set{ this._stc_nreclamo_5 = value; }
        
      }
     ///<summary>
     ///stc_creclamo_5   
     ///</summary>
      public string stc_creclamo_5
      {
      
          get{ return this._stc_creclamo_5; }
          set{ this._stc_creclamo_5 = value; }
        
      }
     ///<summary>
     ///stc_cmovil_1   
     ///</summary>
      public string stc_cmovil_1
      {
      
          get{ return this._stc_cmovil_1; }
          set{ this._stc_cmovil_1 = value; }
        
      }
     ///<summary>
     ///stc_cmovil_2   
     ///</summary>
      public string stc_cmovil_2
      {
      
          get{ return this._stc_cmovil_2; }
          set{ this._stc_cmovil_2 = value; }
        
      }
     ///<summary>
     ///stc_dfecha_modificacion   
     ///</summary>
      public DateTime? stc_dfecha_modificacion
      {
      
          get{ return this._stc_dfecha_modificacion; }
          set{ this._stc_dfecha_modificacion = value; }
        
      }
     ///<summary>
     ///stc_ioperador   
     ///</summary>
      public int stc_ioperador
      {
      
          get{ return this._stc_ioperador; }
          set{ this._stc_ioperador = value; }
        
      }
     ///<summary>
     ///stc_minsumos   
     ///</summary>
      public string stc_minsumos
      {
      
          get{ return this._stc_minsumos; }
          set{ this._stc_minsumos = value; }
        
      }
     ///<summary>
     ///stc_dintecnico_1   
     ///</summary>
      public DateTime? stc_dintecnico_1
      {
      
          get{ return this._stc_dintecnico_1; }
          set{ this._stc_dintecnico_1 = value; }
        
      }
     ///<summary>
     ///stc_doutecnico_1   
     ///</summary>
      public DateTime? stc_doutecnico_1
      {
      
          get{ return this._stc_doutecnico_1; }
          set{ this._stc_doutecnico_1 = value; }
        
      }
     ///<summary>
     ///stc_dintecnico_2   
     ///</summary>
      public DateTime? stc_dintecnico_2
      {
      
          get{ return this._stc_dintecnico_2; }
          set{ this._stc_dintecnico_2 = value; }
        
      }
     ///<summary>
     ///stc_doutecnico_2   
     ///</summary>
      public DateTime? stc_doutecnico_2
      {
      
          get{ return this._stc_doutecnico_2; }
          set{ this._stc_doutecnico_2 = value; }
        
      }
     ///<summary>
     ///stc_dintecnico_3   
     ///</summary>
      public DateTime? stc_dintecnico_3
      {
      
          get{ return this._stc_dintecnico_3; }
          set{ this._stc_dintecnico_3 = value; }
        
      }
     ///<summary>
     ///stc_doutecnico_3   
     ///</summary>
      public DateTime? stc_doutecnico_3
      {
      
          get{ return this._stc_doutecnico_3; }
          set{ this._stc_doutecnico_3 = value; }
        
      }
     ///<summary>
     ///stc_cdeposito   
     ///</summary>
      public string stc_cdeposito
      {
      
          get{ return this._stc_cdeposito; }
          set{ this._stc_cdeposito = value; }
        
      }
     ///<summary>
     ///stf_dfecha_vto_orden   
     ///</summary>
      public DateTime? stf_dfecha_vto_orden
      {
      
          get{ return this._stf_dfecha_vto_orden; }
          set{ this._stf_dfecha_vto_orden = value; }
        
      }
     ///<summary>
     ///stc_dsalida_al_cliente_DSS   
     ///</summary>
      public DateTime? stc_dsalida_al_cliente_DSS
      {
      
          get{ return this._stc_dsalida_al_cliente_DSS; }
          set{ this._stc_dsalida_al_cliente_DSS = value; }
        
      }
     ///<summary>
     ///stc_darribo_al_cliente_DSS   
     ///</summary>
      public DateTime? stc_darribo_al_cliente_DSS
      {
      
          get{ return this._stc_darribo_al_cliente_DSS; }
          set{ this._stc_darribo_al_cliente_DSS = value; }
        
      }
     ///<summary>
     ///stc_dsalida_desde_cliente_DSS   
     ///</summary>
      public DateTime? stc_dsalida_desde_cliente_DSS
      {
      
          get{ return this._stc_dsalida_desde_cliente_DSS; }
          set{ this._stc_dsalida_desde_cliente_DSS = value; }
        
      }
     ///<summary>
     ///stc_iforma_viaje_DSS   
     ///</summary>
      public int stc_iforma_viaje_DSS
      {
      
          get{ return this._stc_iforma_viaje_DSS; }
          set{ this._stc_iforma_viaje_DSS = value; }
        
      }
     ///<summary>
     ///stc_cconformidad_html    
     ///</summary>
      public string stc_cconformidad_html 
      {
      
          get{ return this._stc_cconformidad_html ; }
          set{ this._stc_cconformidad_html  = value; }
        
      }
     ///<summary>
     ///stc_idorigenorden   
     ///</summary>
      public int stc_idorigenorden
      {
      
          get{ return this._stc_idorigenorden; }
          set{ this._stc_idorigenorden = value; }
        
      }
     ///<summary>
     ///stc_dfechapago   
     ///</summary>
      public DateTime? stc_dfechapago
      {
      
          get{ return this._stc_dfechapago; }
          set{ this._stc_dfechapago = value; }
        
      }
     ///<summary>
     ///stc_nvalorpagotecnico   
     ///</summary>
      public Decimal stc_nvalorpagotecnico
      {
      
          get{ return this._stc_nvalorpagotecnico; }
          set{ this._stc_nvalorpagotecnico = value; }
        
      }
     ///<summary>
     ///stc_ncostomanodeobra   
     ///</summary>
      public Decimal stc_ncostomanodeobra
      {
      
          get{ return this._stc_ncostomanodeobra; }
          set{ this._stc_ncostomanodeobra = value; }
        
      }
     ///<summary>
     ///stc_iPrioridad   
     ///</summary>
      public int stc_iPrioridad
      {
      
          get{ return this._stc_iPrioridad; }
          set{ this._stc_iPrioridad = value; }
        
      }
     ///<summary>
     ///stc_iOrganizacion   
     ///</summary>
      public int stc_iOrganizacion
      {
      
          get{ return this._stc_iOrganizacion; }
          set{ this._stc_iOrganizacion = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_st_cabecera(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_st_cabecera(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_st_cabecera(SqlHelper SqlConfig, int UserId, Simplem_st_cabecera Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._stc_iid_cuenta = Simple.stc_iid_cuenta;

      this._stc_inumero = Simple.stc_inumero;

      this._stc_ctipo_servicio = Simple.stc_ctipo_servicio;

      this._stc_mobservaciones = Simple.stc_mobservaciones;

      this._stc_dfecha_desde_1 = Simple.stc_dfecha_desde_1;

      this._stc_dfecha_hasta_1 = Simple.stc_dfecha_hasta_1;

      this._stc_dfecha_desde_2 = Simple.stc_dfecha_desde_2;

      this._stc_dfecha_hasta_2 = Simple.stc_dfecha_hasta_2;

      this._stc_dfecha_desde_3 = Simple.stc_dfecha_desde_3;

      this._stc_dfecha_hasta_3 = Simple.stc_dfecha_hasta_3;

      this._stc_dfecha_cierre = Simple.stc_dfecha_cierre;

      this._stc_ccontacto = Simple.stc_ccontacto;

      this._stc_nestado = Simple.stc_nestado;

      this._stc_ctecnico_1 = Simple.stc_ctecnico_1;

      this._stc_ctecnico_2 = Simple.stc_ctecnico_2;

      this._stc_ctecnico_3 = Simple.stc_ctecnico_3;

      this._stc_ctecnico_4 = Simple.stc_ctecnico_4;

      this._stc_ctecnico_5 = Simple.stc_ctecnico_5;

      this._stc_yValor = Simple.stc_yValor;

      this._stc_nreclamo_1 = Simple.stc_nreclamo_1;

      this._stc_creclamo_1 = Simple.stc_creclamo_1;

      this._stc_nreclamo_2 = Simple.stc_nreclamo_2;

      this._stc_creclamo_2 = Simple.stc_creclamo_2;

      this._stc_nreclamo_3 = Simple.stc_nreclamo_3;

      this._stc_creclamo_3 = Simple.stc_creclamo_3;

      this._stc_nreclamo_4 = Simple.stc_nreclamo_4;

      this._stc_creclamo_4 = Simple.stc_creclamo_4;

      this._stc_nreclamo_5 = Simple.stc_nreclamo_5;

      this._stc_creclamo_5 = Simple.stc_creclamo_5;

      this._stc_cmovil_1 = Simple.stc_cmovil_1;

      this._stc_cmovil_2 = Simple.stc_cmovil_2;

      this._stc_dfecha_modificacion = Simple.stc_dfecha_modificacion;

      this._stc_ioperador = Simple.stc_ioperador;

      this._stc_minsumos = Simple.stc_minsumos;

      this._stc_dintecnico_1 = Simple.stc_dintecnico_1;

      this._stc_doutecnico_1 = Simple.stc_doutecnico_1;

      this._stc_dintecnico_2 = Simple.stc_dintecnico_2;

      this._stc_doutecnico_2 = Simple.stc_doutecnico_2;

      this._stc_dintecnico_3 = Simple.stc_dintecnico_3;

      this._stc_doutecnico_3 = Simple.stc_doutecnico_3;

      this._stc_cdeposito = Simple.stc_cdeposito;

      this._stf_dfecha_vto_orden = Simple.stf_dfecha_vto_orden;

      this._stc_dsalida_al_cliente_DSS = Simple.stc_dsalida_al_cliente_DSS;

      this._stc_darribo_al_cliente_DSS = Simple.stc_darribo_al_cliente_DSS;

      this._stc_dsalida_desde_cliente_DSS = Simple.stc_dsalida_desde_cliente_DSS;

      this._stc_iforma_viaje_DSS = Simple.stc_iforma_viaje_DSS;

      this._stc_cconformidad_html  = Simple.stc_cconformidad_html ;

      this._stc_idorigenorden = Simple.stc_idorigenorden;

      this._stc_dfechapago = Simple.stc_dfechapago;

      this._stc_nvalorpagotecnico = Simple.stc_nvalorpagotecnico;

      this._stc_ncostomanodeobra = Simple.stc_ncostomanodeobra;

      this._stc_iPrioridad = Simple.stc_iPrioridad;

      this._stc_iOrganizacion = Simple.stc_iOrganizacion;

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
    using(var cmd = new SqlCommand("m_st_cabeceraIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@stc_iid_cuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_ctipo_servicio", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_mobservaciones", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_cierre", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_ccontacto", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_1", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_2", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_3", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_4", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_5", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_yValor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_1", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_3", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_4", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_4", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_5", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_5", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_cmovil_1", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_cmovil_2", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_modificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_minsumos", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_cdeposito", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stf_dfecha_vto_orden", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dsalida_al_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_darribo_al_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dsalida_desde_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_iforma_viaje_DSS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_cconformidad_html ", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_idorigenorden", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_dfechapago", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_nvalorpagotecnico", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_ncostomanodeobra", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_iPrioridad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_iOrganizacion", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@stc_iid_cuenta"].Value = this._stc_iid_cuenta;

		cmd.Parameters["@stc_inumero"].Value = this._stc_inumero;

		cmd.Parameters["@stc_ctipo_servicio"].Value = (this._stc_ctipo_servicio == null) ? (object) DBNull.Value : (object) this._stc_ctipo_servicio;

		cmd.Parameters["@stc_mobservaciones"].Value = (this._stc_mobservaciones == null) ? (object) DBNull.Value : (object) this._stc_mobservaciones;

		cmd.Parameters["@stc_dfecha_desde_1"].Value = (this._stc_dfecha_desde_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_1;

		cmd.Parameters["@stc_dfecha_hasta_1"].Value = (this._stc_dfecha_hasta_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_1;

		cmd.Parameters["@stc_dfecha_desde_2"].Value = (this._stc_dfecha_desde_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_2;

		cmd.Parameters["@stc_dfecha_hasta_2"].Value = (this._stc_dfecha_hasta_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_2;

		cmd.Parameters["@stc_dfecha_desde_3"].Value = (this._stc_dfecha_desde_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_3;

		cmd.Parameters["@stc_dfecha_hasta_3"].Value = (this._stc_dfecha_hasta_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_3;

		cmd.Parameters["@stc_dfecha_cierre"].Value = (this._stc_dfecha_cierre == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_cierre;

		cmd.Parameters["@stc_ccontacto"].Value = (this._stc_ccontacto == null) ? (object) DBNull.Value : (object) this._stc_ccontacto;

		cmd.Parameters["@stc_nestado"].Value = this._stc_nestado;

		cmd.Parameters["@stc_ctecnico_1"].Value = (this._stc_ctecnico_1 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_1;

		cmd.Parameters["@stc_ctecnico_2"].Value = (this._stc_ctecnico_2 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_2;

		cmd.Parameters["@stc_ctecnico_3"].Value = (this._stc_ctecnico_3 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_3;

		cmd.Parameters["@stc_ctecnico_4"].Value = (this._stc_ctecnico_4 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_4;

		cmd.Parameters["@stc_ctecnico_5"].Value = (this._stc_ctecnico_5 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_5;

		cmd.Parameters["@stc_yValor"].Value = this._stc_yValor;

		cmd.Parameters["@stc_nreclamo_1"].Value = this._stc_nreclamo_1;

		cmd.Parameters["@stc_creclamo_1"].Value = (this._stc_creclamo_1 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_1;

		cmd.Parameters["@stc_nreclamo_2"].Value = this._stc_nreclamo_2;

		cmd.Parameters["@stc_creclamo_2"].Value = (this._stc_creclamo_2 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_2;

		cmd.Parameters["@stc_nreclamo_3"].Value = this._stc_nreclamo_3;

		cmd.Parameters["@stc_creclamo_3"].Value = (this._stc_creclamo_3 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_3;

		cmd.Parameters["@stc_nreclamo_4"].Value = this._stc_nreclamo_4;

		cmd.Parameters["@stc_creclamo_4"].Value = (this._stc_creclamo_4 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_4;

		cmd.Parameters["@stc_nreclamo_5"].Value = this._stc_nreclamo_5;

		cmd.Parameters["@stc_creclamo_5"].Value = (this._stc_creclamo_5 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_5;

		cmd.Parameters["@stc_cmovil_1"].Value = (this._stc_cmovil_1 == null) ? (object) DBNull.Value : (object) this._stc_cmovil_1;

		cmd.Parameters["@stc_cmovil_2"].Value = (this._stc_cmovil_2 == null) ? (object) DBNull.Value : (object) this._stc_cmovil_2;

		cmd.Parameters["@stc_dfecha_modificacion"].Value = (this._stc_dfecha_modificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_modificacion;

		cmd.Parameters["@stc_ioperador"].Value = this._stc_ioperador;

		cmd.Parameters["@stc_minsumos"].Value = (this._stc_minsumos == null) ? (object) DBNull.Value : (object) this._stc_minsumos;

		cmd.Parameters["@stc_dintecnico_1"].Value = (this._stc_dintecnico_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_1;

		cmd.Parameters["@stc_doutecnico_1"].Value = (this._stc_doutecnico_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_1;

		cmd.Parameters["@stc_dintecnico_2"].Value = (this._stc_dintecnico_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_2;

		cmd.Parameters["@stc_doutecnico_2"].Value = (this._stc_doutecnico_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_2;

		cmd.Parameters["@stc_dintecnico_3"].Value = (this._stc_dintecnico_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_3;

		cmd.Parameters["@stc_doutecnico_3"].Value = (this._stc_doutecnico_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_3;

		cmd.Parameters["@stc_cdeposito"].Value = (this._stc_cdeposito == null) ? (object) DBNull.Value : (object) this._stc_cdeposito;

		cmd.Parameters["@stf_dfecha_vto_orden"].Value = (this._stf_dfecha_vto_orden == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stf_dfecha_vto_orden;

		cmd.Parameters["@stc_dsalida_al_cliente_DSS"].Value = (this._stc_dsalida_al_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dsalida_al_cliente_DSS;

		cmd.Parameters["@stc_darribo_al_cliente_DSS"].Value = (this._stc_darribo_al_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_darribo_al_cliente_DSS;

		cmd.Parameters["@stc_dsalida_desde_cliente_DSS"].Value = (this._stc_dsalida_desde_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dsalida_desde_cliente_DSS;

		cmd.Parameters["@stc_iforma_viaje_DSS"].Value = this._stc_iforma_viaje_DSS;

		cmd.Parameters["@stc_cconformidad_html "].Value = (this._stc_cconformidad_html  == null) ? (object) DBNull.Value : (object) this._stc_cconformidad_html ;

		cmd.Parameters["@stc_idorigenorden"].Value = this._stc_idorigenorden;

		cmd.Parameters["@stc_dfechapago"].Value = (this._stc_dfechapago == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfechapago;

		cmd.Parameters["@stc_nvalorpagotecnico"].Value = this._stc_nvalorpagotecnico;

		cmd.Parameters["@stc_ncostomanodeobra"].Value = this._stc_ncostomanodeobra;

		cmd.Parameters["@stc_iPrioridad"].Value = this._stc_iPrioridad;

		cmd.Parameters["@stc_iOrganizacion"].Value = this._stc_iOrganizacion;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_st_cabeceraUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@stc_iid_cuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_ctipo_servicio", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_mobservaciones", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_cierre", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_ccontacto", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_1", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_2", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_3", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_4", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_5", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_yValor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_1", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_3", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_4", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_4", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_5", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_5", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_cmovil_1", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_cmovil_2", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_modificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_minsumos", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_cdeposito", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stf_dfecha_vto_orden", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dsalida_al_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_darribo_al_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dsalida_desde_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_iforma_viaje_DSS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_cconformidad_html ", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_idorigenorden", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_dfechapago", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_nvalorpagotecnico", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_ncostomanodeobra", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_iPrioridad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_iOrganizacion", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@stc_iid_cuenta"].Value = this._stc_iid_cuenta;

		cmd.Parameters["@stc_inumero"].Value = this._stc_inumero;

		cmd.Parameters["@stc_ctipo_servicio"].Value = (this._stc_ctipo_servicio == null) ? (object) DBNull.Value : (object) this._stc_ctipo_servicio;

		cmd.Parameters["@stc_mobservaciones"].Value = (this._stc_mobservaciones == null) ? (object) DBNull.Value : (object) this._stc_mobservaciones;

		cmd.Parameters["@stc_dfecha_desde_1"].Value = (this._stc_dfecha_desde_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_1;

		cmd.Parameters["@stc_dfecha_hasta_1"].Value = (this._stc_dfecha_hasta_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_1;

		cmd.Parameters["@stc_dfecha_desde_2"].Value = (this._stc_dfecha_desde_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_2;

		cmd.Parameters["@stc_dfecha_hasta_2"].Value = (this._stc_dfecha_hasta_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_2;

		cmd.Parameters["@stc_dfecha_desde_3"].Value = (this._stc_dfecha_desde_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_3;

		cmd.Parameters["@stc_dfecha_hasta_3"].Value = (this._stc_dfecha_hasta_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_3;

		cmd.Parameters["@stc_dfecha_cierre"].Value = (this._stc_dfecha_cierre == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_cierre;

		cmd.Parameters["@stc_ccontacto"].Value = (this._stc_ccontacto == null) ? (object) DBNull.Value : (object) this._stc_ccontacto;

		cmd.Parameters["@stc_nestado"].Value = this._stc_nestado;

		cmd.Parameters["@stc_ctecnico_1"].Value = (this._stc_ctecnico_1 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_1;

		cmd.Parameters["@stc_ctecnico_2"].Value = (this._stc_ctecnico_2 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_2;

		cmd.Parameters["@stc_ctecnico_3"].Value = (this._stc_ctecnico_3 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_3;

		cmd.Parameters["@stc_ctecnico_4"].Value = (this._stc_ctecnico_4 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_4;

		cmd.Parameters["@stc_ctecnico_5"].Value = (this._stc_ctecnico_5 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_5;

		cmd.Parameters["@stc_yValor"].Value = this._stc_yValor;

		cmd.Parameters["@stc_nreclamo_1"].Value = this._stc_nreclamo_1;

		cmd.Parameters["@stc_creclamo_1"].Value = (this._stc_creclamo_1 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_1;

		cmd.Parameters["@stc_nreclamo_2"].Value = this._stc_nreclamo_2;

		cmd.Parameters["@stc_creclamo_2"].Value = (this._stc_creclamo_2 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_2;

		cmd.Parameters["@stc_nreclamo_3"].Value = this._stc_nreclamo_3;

		cmd.Parameters["@stc_creclamo_3"].Value = (this._stc_creclamo_3 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_3;

		cmd.Parameters["@stc_nreclamo_4"].Value = this._stc_nreclamo_4;

		cmd.Parameters["@stc_creclamo_4"].Value = (this._stc_creclamo_4 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_4;

		cmd.Parameters["@stc_nreclamo_5"].Value = this._stc_nreclamo_5;

		cmd.Parameters["@stc_creclamo_5"].Value = (this._stc_creclamo_5 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_5;

		cmd.Parameters["@stc_cmovil_1"].Value = (this._stc_cmovil_1 == null) ? (object) DBNull.Value : (object) this._stc_cmovil_1;

		cmd.Parameters["@stc_cmovil_2"].Value = (this._stc_cmovil_2 == null) ? (object) DBNull.Value : (object) this._stc_cmovil_2;

		cmd.Parameters["@stc_dfecha_modificacion"].Value = (this._stc_dfecha_modificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_modificacion;

		cmd.Parameters["@stc_ioperador"].Value = this._stc_ioperador;

		cmd.Parameters["@stc_minsumos"].Value = (this._stc_minsumos == null) ? (object) DBNull.Value : (object) this._stc_minsumos;

		cmd.Parameters["@stc_dintecnico_1"].Value = (this._stc_dintecnico_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_1;

		cmd.Parameters["@stc_doutecnico_1"].Value = (this._stc_doutecnico_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_1;

		cmd.Parameters["@stc_dintecnico_2"].Value = (this._stc_dintecnico_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_2;

		cmd.Parameters["@stc_doutecnico_2"].Value = (this._stc_doutecnico_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_2;

		cmd.Parameters["@stc_dintecnico_3"].Value = (this._stc_dintecnico_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_3;

		cmd.Parameters["@stc_doutecnico_3"].Value = (this._stc_doutecnico_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_3;

		cmd.Parameters["@stc_cdeposito"].Value = (this._stc_cdeposito == null) ? (object) DBNull.Value : (object) this._stc_cdeposito;

		cmd.Parameters["@stf_dfecha_vto_orden"].Value = (this._stf_dfecha_vto_orden == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stf_dfecha_vto_orden;

		cmd.Parameters["@stc_dsalida_al_cliente_DSS"].Value = (this._stc_dsalida_al_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dsalida_al_cliente_DSS;

		cmd.Parameters["@stc_darribo_al_cliente_DSS"].Value = (this._stc_darribo_al_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_darribo_al_cliente_DSS;

		cmd.Parameters["@stc_dsalida_desde_cliente_DSS"].Value = (this._stc_dsalida_desde_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dsalida_desde_cliente_DSS;

		cmd.Parameters["@stc_iforma_viaje_DSS"].Value = this._stc_iforma_viaje_DSS;

		cmd.Parameters["@stc_cconformidad_html "].Value = (this._stc_cconformidad_html  == null) ? (object) DBNull.Value : (object) this._stc_cconformidad_html ;

		cmd.Parameters["@stc_idorigenorden"].Value = this._stc_idorigenorden;

		cmd.Parameters["@stc_dfechapago"].Value = (this._stc_dfechapago == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfechapago;

		cmd.Parameters["@stc_nvalorpagotecnico"].Value = this._stc_nvalorpagotecnico;

		cmd.Parameters["@stc_ncostomanodeobra"].Value = this._stc_ncostomanodeobra;

		cmd.Parameters["@stc_iPrioridad"].Value = this._stc_iPrioridad;

		cmd.Parameters["@stc_iOrganizacion"].Value = this._stc_iOrganizacion;

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
    throw new RuntimeException("The m_st_cabecera is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_st_cabeceraDel", conn))
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
    using(var CmdSel = new SqlCommand("m_st_cabeceraSel", conn))
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
    Simplem_st_cabecera Simple = new Simplem_st_cabecera();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.stc_iid_cuenta = this._stc_iid_cuenta;

      Simple.stc_inumero = this._stc_inumero;

      Simple.stc_ctipo_servicio = this._stc_ctipo_servicio;

      Simple.stc_mobservaciones = this._stc_mobservaciones;

      Simple.stc_dfecha_desde_1 = this._stc_dfecha_desde_1;

      Simple.stc_dfecha_hasta_1 = this._stc_dfecha_hasta_1;

      Simple.stc_dfecha_desde_2 = this._stc_dfecha_desde_2;

      Simple.stc_dfecha_hasta_2 = this._stc_dfecha_hasta_2;

      Simple.stc_dfecha_desde_3 = this._stc_dfecha_desde_3;

      Simple.stc_dfecha_hasta_3 = this._stc_dfecha_hasta_3;

      Simple.stc_dfecha_cierre = this._stc_dfecha_cierre;

      Simple.stc_ccontacto = this._stc_ccontacto;

      Simple.stc_nestado = this._stc_nestado;

      Simple.stc_ctecnico_1 = this._stc_ctecnico_1;

      Simple.stc_ctecnico_2 = this._stc_ctecnico_2;

      Simple.stc_ctecnico_3 = this._stc_ctecnico_3;

      Simple.stc_ctecnico_4 = this._stc_ctecnico_4;

      Simple.stc_ctecnico_5 = this._stc_ctecnico_5;

      Simple.stc_yValor = this._stc_yValor;

      Simple.stc_nreclamo_1 = this._stc_nreclamo_1;

      Simple.stc_creclamo_1 = this._stc_creclamo_1;

      Simple.stc_nreclamo_2 = this._stc_nreclamo_2;

      Simple.stc_creclamo_2 = this._stc_creclamo_2;

      Simple.stc_nreclamo_3 = this._stc_nreclamo_3;

      Simple.stc_creclamo_3 = this._stc_creclamo_3;

      Simple.stc_nreclamo_4 = this._stc_nreclamo_4;

      Simple.stc_creclamo_4 = this._stc_creclamo_4;

      Simple.stc_nreclamo_5 = this._stc_nreclamo_5;

      Simple.stc_creclamo_5 = this._stc_creclamo_5;

      Simple.stc_cmovil_1 = this._stc_cmovil_1;

      Simple.stc_cmovil_2 = this._stc_cmovil_2;

      Simple.stc_dfecha_modificacion = this._stc_dfecha_modificacion;

      Simple.stc_ioperador = this._stc_ioperador;

      Simple.stc_minsumos = this._stc_minsumos;

      Simple.stc_dintecnico_1 = this._stc_dintecnico_1;

      Simple.stc_doutecnico_1 = this._stc_doutecnico_1;

      Simple.stc_dintecnico_2 = this._stc_dintecnico_2;

      Simple.stc_doutecnico_2 = this._stc_doutecnico_2;

      Simple.stc_dintecnico_3 = this._stc_dintecnico_3;

      Simple.stc_doutecnico_3 = this._stc_doutecnico_3;

      Simple.stc_cdeposito = this._stc_cdeposito;

      Simple.stf_dfecha_vto_orden = this._stf_dfecha_vto_orden;

      Simple.stc_dsalida_al_cliente_DSS = this._stc_dsalida_al_cliente_DSS;

      Simple.stc_darribo_al_cliente_DSS = this._stc_darribo_al_cliente_DSS;

      Simple.stc_dsalida_desde_cliente_DSS = this._stc_dsalida_desde_cliente_DSS;

      Simple.stc_iforma_viaje_DSS = this._stc_iforma_viaje_DSS;

      Simple.stc_cconformidad_html  = this._stc_cconformidad_html ;

      Simple.stc_idorigenorden = this._stc_idorigenorden;

      Simple.stc_dfechapago = this._stc_dfechapago;

      Simple.stc_nvalorpagotecnico = this._stc_nvalorpagotecnico;

      Simple.stc_ncostomanodeobra = this._stc_ncostomanodeobra;

      Simple.stc_iPrioridad = this._stc_iPrioridad;

      Simple.stc_iOrganizacion = this._stc_iOrganizacion;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_st_cabecera)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._stc_iid_cuenta = Simple.stc_iid_cuenta;

      this._stc_inumero = Simple.stc_inumero;

      this._stc_ctipo_servicio = Simple.stc_ctipo_servicio;

      this._stc_mobservaciones = Simple.stc_mobservaciones;

      this._stc_dfecha_desde_1 = Simple.stc_dfecha_desde_1;

      this._stc_dfecha_hasta_1 = Simple.stc_dfecha_hasta_1;

      this._stc_dfecha_desde_2 = Simple.stc_dfecha_desde_2;

      this._stc_dfecha_hasta_2 = Simple.stc_dfecha_hasta_2;

      this._stc_dfecha_desde_3 = Simple.stc_dfecha_desde_3;

      this._stc_dfecha_hasta_3 = Simple.stc_dfecha_hasta_3;

      this._stc_dfecha_cierre = Simple.stc_dfecha_cierre;

      this._stc_ccontacto = Simple.stc_ccontacto;

      this._stc_nestado = Simple.stc_nestado;

      this._stc_ctecnico_1 = Simple.stc_ctecnico_1;

      this._stc_ctecnico_2 = Simple.stc_ctecnico_2;

      this._stc_ctecnico_3 = Simple.stc_ctecnico_3;

      this._stc_ctecnico_4 = Simple.stc_ctecnico_4;

      this._stc_ctecnico_5 = Simple.stc_ctecnico_5;

      this._stc_yValor = Simple.stc_yValor;

      this._stc_nreclamo_1 = Simple.stc_nreclamo_1;

      this._stc_creclamo_1 = Simple.stc_creclamo_1;

      this._stc_nreclamo_2 = Simple.stc_nreclamo_2;

      this._stc_creclamo_2 = Simple.stc_creclamo_2;

      this._stc_nreclamo_3 = Simple.stc_nreclamo_3;

      this._stc_creclamo_3 = Simple.stc_creclamo_3;

      this._stc_nreclamo_4 = Simple.stc_nreclamo_4;

      this._stc_creclamo_4 = Simple.stc_creclamo_4;

      this._stc_nreclamo_5 = Simple.stc_nreclamo_5;

      this._stc_creclamo_5 = Simple.stc_creclamo_5;

      this._stc_cmovil_1 = Simple.stc_cmovil_1;

      this._stc_cmovil_2 = Simple.stc_cmovil_2;

      this._stc_dfecha_modificacion = Simple.stc_dfecha_modificacion;

      this._stc_ioperador = Simple.stc_ioperador;

      this._stc_minsumos = Simple.stc_minsumos;

      this._stc_dintecnico_1 = Simple.stc_dintecnico_1;

      this._stc_doutecnico_1 = Simple.stc_doutecnico_1;

      this._stc_dintecnico_2 = Simple.stc_dintecnico_2;

      this._stc_doutecnico_2 = Simple.stc_doutecnico_2;

      this._stc_dintecnico_3 = Simple.stc_dintecnico_3;

      this._stc_doutecnico_3 = Simple.stc_doutecnico_3;

      this._stc_cdeposito = Simple.stc_cdeposito;

      this._stf_dfecha_vto_orden = Simple.stf_dfecha_vto_orden;

      this._stc_dsalida_al_cliente_DSS = Simple.stc_dsalida_al_cliente_DSS;

      this._stc_darribo_al_cliente_DSS = Simple.stc_darribo_al_cliente_DSS;

      this._stc_dsalida_desde_cliente_DSS = Simple.stc_dsalida_desde_cliente_DSS;

      this._stc_iforma_viaje_DSS = Simple.stc_iforma_viaje_DSS;

      this._stc_cconformidad_html  = Simple.stc_cconformidad_html ;

      this._stc_idorigenorden = Simple.stc_idorigenorden;

      this._stc_dfechapago = Simple.stc_dfechapago;

      this._stc_nvalorpagotecnico = Simple.stc_nvalorpagotecnico;

      this._stc_ncostomanodeobra = Simple.stc_ncostomanodeobra;

      this._stc_iPrioridad = Simple.stc_iPrioridad;

      this._stc_iOrganizacion = Simple.stc_iOrganizacion;

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
    Callerm_st_cabecera Caller = new Callerm_st_cabecera();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.stc_iid_cuenta = this._stc_iid_cuenta;

      Caller.stc_inumero = this._stc_inumero;

      Caller.stc_ctipo_servicio = this._stc_ctipo_servicio;

      Caller.stc_mobservaciones = this._stc_mobservaciones;

      Caller.stc_dfecha_desde_1 = this._stc_dfecha_desde_1;

      Caller.stc_dfecha_hasta_1 = this._stc_dfecha_hasta_1;

      Caller.stc_dfecha_desde_2 = this._stc_dfecha_desde_2;

      Caller.stc_dfecha_hasta_2 = this._stc_dfecha_hasta_2;

      Caller.stc_dfecha_desde_3 = this._stc_dfecha_desde_3;

      Caller.stc_dfecha_hasta_3 = this._stc_dfecha_hasta_3;

      Caller.stc_dfecha_cierre = this._stc_dfecha_cierre;

      Caller.stc_ccontacto = this._stc_ccontacto;

      Caller.stc_nestado = this._stc_nestado;

      Caller.stc_ctecnico_1 = this._stc_ctecnico_1;

      Caller.stc_ctecnico_2 = this._stc_ctecnico_2;

      Caller.stc_ctecnico_3 = this._stc_ctecnico_3;

      Caller.stc_ctecnico_4 = this._stc_ctecnico_4;

      Caller.stc_ctecnico_5 = this._stc_ctecnico_5;

      Caller.stc_yValor = this._stc_yValor;

      Caller.stc_nreclamo_1 = this._stc_nreclamo_1;

      Caller.stc_creclamo_1 = this._stc_creclamo_1;

      Caller.stc_nreclamo_2 = this._stc_nreclamo_2;

      Caller.stc_creclamo_2 = this._stc_creclamo_2;

      Caller.stc_nreclamo_3 = this._stc_nreclamo_3;

      Caller.stc_creclamo_3 = this._stc_creclamo_3;

      Caller.stc_nreclamo_4 = this._stc_nreclamo_4;

      Caller.stc_creclamo_4 = this._stc_creclamo_4;

      Caller.stc_nreclamo_5 = this._stc_nreclamo_5;

      Caller.stc_creclamo_5 = this._stc_creclamo_5;

      Caller.stc_cmovil_1 = this._stc_cmovil_1;

      Caller.stc_cmovil_2 = this._stc_cmovil_2;

      Caller.stc_dfecha_modificacion = this._stc_dfecha_modificacion;

      Caller.stc_ioperador = this._stc_ioperador;

      Caller.stc_minsumos = this._stc_minsumos;

      Caller.stc_dintecnico_1 = this._stc_dintecnico_1;

      Caller.stc_doutecnico_1 = this._stc_doutecnico_1;

      Caller.stc_dintecnico_2 = this._stc_dintecnico_2;

      Caller.stc_doutecnico_2 = this._stc_doutecnico_2;

      Caller.stc_dintecnico_3 = this._stc_dintecnico_3;

      Caller.stc_doutecnico_3 = this._stc_doutecnico_3;

      Caller.stc_cdeposito = this._stc_cdeposito;

      Caller.stf_dfecha_vto_orden = this._stf_dfecha_vto_orden;

      Caller.stc_dsalida_al_cliente_DSS = this._stc_dsalida_al_cliente_DSS;

      Caller.stc_darribo_al_cliente_DSS = this._stc_darribo_al_cliente_DSS;

      Caller.stc_dsalida_desde_cliente_DSS = this._stc_dsalida_desde_cliente_DSS;

      Caller.stc_iforma_viaje_DSS = this._stc_iforma_viaje_DSS;

      Caller.stc_cconformidad_html  = this._stc_cconformidad_html ;

      Caller.stc_idorigenorden = this._stc_idorigenorden;

      Caller.stc_dfechapago = this._stc_dfechapago;

      Caller.stc_nvalorpagotecnico = this._stc_nvalorpagotecnico;

      Caller.stc_ncostomanodeobra = this._stc_ncostomanodeobra;

      Caller.stc_iPrioridad = this._stc_iPrioridad;

      Caller.stc_iOrganizacion = this._stc_iOrganizacion;

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
    
      dt.Columns.Add(new DataColumn("stc_iid_cuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("stc_inumero", typeof (int)));
    
      dt.Columns.Add(new DataColumn("stc_ctipo_servicio", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_mobservaciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_desde_1", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_hasta_1", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_desde_2", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_hasta_2", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_desde_3", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_hasta_3", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_cierre", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_ccontacto", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_nestado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_ctecnico_1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_ctecnico_2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_ctecnico_3", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_ctecnico_4", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_ctecnico_5", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_yValor", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_nreclamo_1", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_creclamo_1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_nreclamo_2", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_creclamo_2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_nreclamo_3", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_creclamo_3", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_nreclamo_4", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_creclamo_4", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_nreclamo_5", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_creclamo_5", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_cmovil_1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_cmovil_2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_dfecha_modificacion", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_ioperador", typeof (int)));
    
      dt.Columns.Add(new DataColumn("stc_minsumos", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_dintecnico_1", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_doutecnico_1", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dintecnico_2", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_doutecnico_2", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dintecnico_3", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_doutecnico_3", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_cdeposito", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stf_dfecha_vto_orden", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dsalida_al_cliente_DSS", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_darribo_al_cliente_DSS", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_dsalida_desde_cliente_DSS", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_iforma_viaje_DSS", typeof (int)));
    
      dt.Columns.Add(new DataColumn("stc_cconformidad_html ", typeof (string)));
    
      dt.Columns.Add(new DataColumn("stc_idorigenorden", typeof (int)));
    
      dt.Columns.Add(new DataColumn("stc_dfechapago", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("stc_nvalorpagotecnico", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_ncostomanodeobra", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("stc_iPrioridad", typeof (int)));
    
      dt.Columns.Add(new DataColumn("stc_iOrganizacion", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["stc_iid_cuenta"] = this._stc_iid_cuenta;

      dr["stc_inumero"] = this._stc_inumero;

      dr["stc_ctipo_servicio"] = this._stc_ctipo_servicio;

      dr["stc_mobservaciones"] = this._stc_mobservaciones;

      dr["stc_dfecha_desde_1"] = (object)this._stc_dfecha_desde_1  ?? DBNull.Value;

      dr["stc_dfecha_hasta_1"] = (object)this._stc_dfecha_hasta_1  ?? DBNull.Value;

      dr["stc_dfecha_desde_2"] = (object)this._stc_dfecha_desde_2  ?? DBNull.Value;

      dr["stc_dfecha_hasta_2"] = (object)this._stc_dfecha_hasta_2  ?? DBNull.Value;

      dr["stc_dfecha_desde_3"] = (object)this._stc_dfecha_desde_3  ?? DBNull.Value;

      dr["stc_dfecha_hasta_3"] = (object)this._stc_dfecha_hasta_3  ?? DBNull.Value;

      dr["stc_dfecha_cierre"] = (object)this._stc_dfecha_cierre  ?? DBNull.Value;

      dr["stc_ccontacto"] = this._stc_ccontacto;

      dr["stc_nestado"] = this._stc_nestado;

      dr["stc_ctecnico_1"] = this._stc_ctecnico_1;

      dr["stc_ctecnico_2"] = this._stc_ctecnico_2;

      dr["stc_ctecnico_3"] = this._stc_ctecnico_3;

      dr["stc_ctecnico_4"] = this._stc_ctecnico_4;

      dr["stc_ctecnico_5"] = this._stc_ctecnico_5;

      dr["stc_yValor"] = this._stc_yValor;

      dr["stc_nreclamo_1"] = this._stc_nreclamo_1;

      dr["stc_creclamo_1"] = this._stc_creclamo_1;

      dr["stc_nreclamo_2"] = this._stc_nreclamo_2;

      dr["stc_creclamo_2"] = this._stc_creclamo_2;

      dr["stc_nreclamo_3"] = this._stc_nreclamo_3;

      dr["stc_creclamo_3"] = this._stc_creclamo_3;

      dr["stc_nreclamo_4"] = this._stc_nreclamo_4;

      dr["stc_creclamo_4"] = this._stc_creclamo_4;

      dr["stc_nreclamo_5"] = this._stc_nreclamo_5;

      dr["stc_creclamo_5"] = this._stc_creclamo_5;

      dr["stc_cmovil_1"] = this._stc_cmovil_1;

      dr["stc_cmovil_2"] = this._stc_cmovil_2;

      dr["stc_dfecha_modificacion"] = (object)this._stc_dfecha_modificacion  ?? DBNull.Value;

      dr["stc_ioperador"] = this._stc_ioperador;

      dr["stc_minsumos"] = this._stc_minsumos;

      dr["stc_dintecnico_1"] = (object)this._stc_dintecnico_1  ?? DBNull.Value;

      dr["stc_doutecnico_1"] = (object)this._stc_doutecnico_1  ?? DBNull.Value;

      dr["stc_dintecnico_2"] = (object)this._stc_dintecnico_2  ?? DBNull.Value;

      dr["stc_doutecnico_2"] = (object)this._stc_doutecnico_2  ?? DBNull.Value;

      dr["stc_dintecnico_3"] = (object)this._stc_dintecnico_3  ?? DBNull.Value;

      dr["stc_doutecnico_3"] = (object)this._stc_doutecnico_3  ?? DBNull.Value;

      dr["stc_cdeposito"] = this._stc_cdeposito;

      dr["stf_dfecha_vto_orden"] = (object)this._stf_dfecha_vto_orden  ?? DBNull.Value;

      dr["stc_dsalida_al_cliente_DSS"] = (object)this._stc_dsalida_al_cliente_DSS  ?? DBNull.Value;

      dr["stc_darribo_al_cliente_DSS"] = (object)this._stc_darribo_al_cliente_DSS  ?? DBNull.Value;

      dr["stc_dsalida_desde_cliente_DSS"] = (object)this._stc_dsalida_desde_cliente_DSS  ?? DBNull.Value;

      dr["stc_iforma_viaje_DSS"] = this._stc_iforma_viaje_DSS;

      dr["stc_cconformidad_html "] = this._stc_cconformidad_html ;

      dr["stc_idorigenorden"] = this._stc_idorigenorden;

      dr["stc_dfechapago"] = (object)this._stc_dfechapago  ?? DBNull.Value;

      dr["stc_nvalorpagotecnico"] = this._stc_nvalorpagotecnico;

      dr["stc_ncostomanodeobra"] = this._stc_ncostomanodeobra;

      dr["stc_iPrioridad"] = this._stc_iPrioridad;

      dr["stc_iOrganizacion"] = this._stc_iOrganizacion;

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
    using(var CmdChilds = new SqlCommand("m_st_cabeceraByChildObject", conn))
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
    Simplem_st_cabecera Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_st_cabeceraByChildObject", conn))
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
    Simple = new Simplem_st_cabecera();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.stc_iid_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.stc_inumero = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.stc_ctipo_servicio = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.stc_mobservaciones = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.stc_dfecha_desde_1 = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.stc_dfecha_hasta_1 = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.stc_dfecha_desde_2 = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.stc_dfecha_hasta_2 = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.stc_dfecha_desde_3 = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.stc_dfecha_hasta_3 = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.stc_dfecha_cierre = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.stc_ccontacto = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.stc_nestado = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.stc_ctecnico_1 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.stc_ctecnico_2 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.stc_ctecnico_3 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.stc_ctecnico_4 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.stc_ctecnico_5 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.stc_yValor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.stc_nreclamo_1 = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.stc_creclamo_1 = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.stc_nreclamo_2 = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.stc_creclamo_2 = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.stc_nreclamo_3 = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.stc_creclamo_3 = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.stc_nreclamo_4 = (Reader.IsDBNull(27)) ? new Decimal(0) : Reader.GetDecimal(27);
if (Reader.FieldCount > 28)Simple.stc_creclamo_4 = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.stc_nreclamo_5 = (Reader.IsDBNull(29)) ? new Decimal(0) : Reader.GetDecimal(29);
if (Reader.FieldCount > 30)Simple.stc_creclamo_5 = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.stc_cmovil_1 = (Reader.IsDBNull(31)) ? "" : Reader.GetString(31);
if (Reader.FieldCount > 32)Simple.stc_cmovil_2 = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.stc_dfecha_modificacion = (Reader.IsDBNull(33)) ? new DateTime(1,1,1) : Reader.GetDateTime(33);
if (Reader.FieldCount > 34)Simple.stc_ioperador = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.stc_minsumos = (Reader.IsDBNull(35)) ? "" : Reader.GetString(35);
if (Reader.FieldCount > 36)Simple.stc_dintecnico_1 = (Reader.IsDBNull(36)) ? new DateTime(1,1,1) : Reader.GetDateTime(36);
if (Reader.FieldCount > 37)Simple.stc_doutecnico_1 = (Reader.IsDBNull(37)) ? new DateTime(1,1,1) : Reader.GetDateTime(37);
if (Reader.FieldCount > 38)Simple.stc_dintecnico_2 = (Reader.IsDBNull(38)) ? new DateTime(1,1,1) : Reader.GetDateTime(38);
if (Reader.FieldCount > 39)Simple.stc_doutecnico_2 = (Reader.IsDBNull(39)) ? new DateTime(1,1,1) : Reader.GetDateTime(39);
if (Reader.FieldCount > 40)Simple.stc_dintecnico_3 = (Reader.IsDBNull(40)) ? new DateTime(1,1,1) : Reader.GetDateTime(40);
if (Reader.FieldCount > 41)Simple.stc_doutecnico_3 = (Reader.IsDBNull(41)) ? new DateTime(1,1,1) : Reader.GetDateTime(41);
if (Reader.FieldCount > 42)Simple.stc_cdeposito = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.stf_dfecha_vto_orden = (Reader.IsDBNull(43)) ? new DateTime(1,1,1) : Reader.GetDateTime(43);
if (Reader.FieldCount > 44)Simple.stc_dsalida_al_cliente_DSS = (Reader.IsDBNull(44)) ? new DateTime(1,1,1) : Reader.GetDateTime(44);
if (Reader.FieldCount > 45)Simple.stc_darribo_al_cliente_DSS = (Reader.IsDBNull(45)) ? new DateTime(1,1,1) : Reader.GetDateTime(45);
if (Reader.FieldCount > 46)Simple.stc_dsalida_desde_cliente_DSS = (Reader.IsDBNull(46)) ? new DateTime(1,1,1) : Reader.GetDateTime(46);
if (Reader.FieldCount > 47)Simple.stc_iforma_viaje_DSS = (Reader.IsDBNull(47)) ? 0 : Reader.GetInt32(47);
if (Reader.FieldCount > 48)Simple.stc_cconformidad_html  = (Reader.IsDBNull(48)) ? "" : Reader.GetString(48);
if (Reader.FieldCount > 49)Simple.stc_idorigenorden = (Reader.IsDBNull(49)) ? 0 : Reader.GetInt32(49);
if (Reader.FieldCount > 50)Simple.stc_dfechapago = (Reader.IsDBNull(50)) ? new DateTime(1,1,1) : Reader.GetDateTime(50);
if (Reader.FieldCount > 51)Simple.stc_nvalorpagotecnico = (Reader.IsDBNull(51)) ? new Decimal(0) : Reader.GetDecimal(51);
if (Reader.FieldCount > 52)Simple.stc_ncostomanodeobra = (Reader.IsDBNull(52)) ? new Decimal(0) : Reader.GetDecimal(52);
if (Reader.FieldCount > 53)Simple.stc_iPrioridad = (Reader.IsDBNull(53)) ? 0 : Reader.GetInt32(53);
if (Reader.FieldCount > 54)Simple.stc_iOrganizacion = (Reader.IsDBNull(54)) ? 0 : Reader.GetInt32(54);


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
    Simplem_st_cabecera Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_st_cabecera();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.stc_iid_cuenta = (Row["stc_iid_cuenta"] == DBNull.Value) ? 0 : (int) Row["stc_iid_cuenta"];

Simple.stc_inumero = (Row["stc_inumero"] == DBNull.Value) ? 0 : (int) Row["stc_inumero"];

Simple.stc_ctipo_servicio = (Row["stc_ctipo_servicio"] == DBNull.Value) ? "" : (string) Row["stc_ctipo_servicio"];

Simple.stc_mobservaciones = (Row["stc_mobservaciones"] == DBNull.Value) ? "" : (string) Row["stc_mobservaciones"];

Simple.stc_dfecha_desde_1 = (Row["stc_dfecha_desde_1"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_desde_1"];

Simple.stc_dfecha_hasta_1 = (Row["stc_dfecha_hasta_1"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_hasta_1"];

Simple.stc_dfecha_desde_2 = (Row["stc_dfecha_desde_2"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_desde_2"];

Simple.stc_dfecha_hasta_2 = (Row["stc_dfecha_hasta_2"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_hasta_2"];

Simple.stc_dfecha_desde_3 = (Row["stc_dfecha_desde_3"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_desde_3"];

Simple.stc_dfecha_hasta_3 = (Row["stc_dfecha_hasta_3"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_hasta_3"];

Simple.stc_dfecha_cierre = (Row["stc_dfecha_cierre"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_cierre"];

Simple.stc_ccontacto = (Row["stc_ccontacto"] == DBNull.Value) ? "" : (string) Row["stc_ccontacto"];

Simple.stc_nestado = (Row["stc_nestado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_nestado"];

Simple.stc_ctecnico_1 = (Row["stc_ctecnico_1"] == DBNull.Value) ? "" : (string) Row["stc_ctecnico_1"];

Simple.stc_ctecnico_2 = (Row["stc_ctecnico_2"] == DBNull.Value) ? "" : (string) Row["stc_ctecnico_2"];

Simple.stc_ctecnico_3 = (Row["stc_ctecnico_3"] == DBNull.Value) ? "" : (string) Row["stc_ctecnico_3"];

Simple.stc_ctecnico_4 = (Row["stc_ctecnico_4"] == DBNull.Value) ? "" : (string) Row["stc_ctecnico_4"];

Simple.stc_ctecnico_5 = (Row["stc_ctecnico_5"] == DBNull.Value) ? "" : (string) Row["stc_ctecnico_5"];

Simple.stc_yValor = (Row["stc_yValor"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_yValor"];

Simple.stc_nreclamo_1 = (Row["stc_nreclamo_1"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_nreclamo_1"];

Simple.stc_creclamo_1 = (Row["stc_creclamo_1"] == DBNull.Value) ? "" : (string) Row["stc_creclamo_1"];

Simple.stc_nreclamo_2 = (Row["stc_nreclamo_2"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_nreclamo_2"];

Simple.stc_creclamo_2 = (Row["stc_creclamo_2"] == DBNull.Value) ? "" : (string) Row["stc_creclamo_2"];

Simple.stc_nreclamo_3 = (Row["stc_nreclamo_3"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_nreclamo_3"];

Simple.stc_creclamo_3 = (Row["stc_creclamo_3"] == DBNull.Value) ? "" : (string) Row["stc_creclamo_3"];

Simple.stc_nreclamo_4 = (Row["stc_nreclamo_4"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_nreclamo_4"];

Simple.stc_creclamo_4 = (Row["stc_creclamo_4"] == DBNull.Value) ? "" : (string) Row["stc_creclamo_4"];

Simple.stc_nreclamo_5 = (Row["stc_nreclamo_5"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_nreclamo_5"];

Simple.stc_creclamo_5 = (Row["stc_creclamo_5"] == DBNull.Value) ? "" : (string) Row["stc_creclamo_5"];

Simple.stc_cmovil_1 = (Row["stc_cmovil_1"] == DBNull.Value) ? "" : (string) Row["stc_cmovil_1"];

Simple.stc_cmovil_2 = (Row["stc_cmovil_2"] == DBNull.Value) ? "" : (string) Row["stc_cmovil_2"];

Simple.stc_dfecha_modificacion = (Row["stc_dfecha_modificacion"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfecha_modificacion"];

Simple.stc_ioperador = (Row["stc_ioperador"] == DBNull.Value) ? 0 : (int) Row["stc_ioperador"];

Simple.stc_minsumos = (Row["stc_minsumos"] == DBNull.Value) ? "" : (string) Row["stc_minsumos"];

Simple.stc_dintecnico_1 = (Row["stc_dintecnico_1"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dintecnico_1"];

Simple.stc_doutecnico_1 = (Row["stc_doutecnico_1"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_doutecnico_1"];

Simple.stc_dintecnico_2 = (Row["stc_dintecnico_2"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dintecnico_2"];

Simple.stc_doutecnico_2 = (Row["stc_doutecnico_2"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_doutecnico_2"];

Simple.stc_dintecnico_3 = (Row["stc_dintecnico_3"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dintecnico_3"];

Simple.stc_doutecnico_3 = (Row["stc_doutecnico_3"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_doutecnico_3"];

Simple.stc_cdeposito = (Row["stc_cdeposito"] == DBNull.Value) ? "" : (string) Row["stc_cdeposito"];

Simple.stf_dfecha_vto_orden = (Row["stf_dfecha_vto_orden"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stf_dfecha_vto_orden"];

Simple.stc_dsalida_al_cliente_DSS = (Row["stc_dsalida_al_cliente_DSS"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dsalida_al_cliente_DSS"];

Simple.stc_darribo_al_cliente_DSS = (Row["stc_darribo_al_cliente_DSS"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_darribo_al_cliente_DSS"];

Simple.stc_dsalida_desde_cliente_DSS = (Row["stc_dsalida_desde_cliente_DSS"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dsalida_desde_cliente_DSS"];

Simple.stc_iforma_viaje_DSS = (Row["stc_iforma_viaje_DSS"] == DBNull.Value) ? 0 : (int) Row["stc_iforma_viaje_DSS"];

Simple.stc_cconformidad_html  = (Row["stc_cconformidad_html "] == DBNull.Value) ? "" : (string) Row["stc_cconformidad_html "];

Simple.stc_idorigenorden = (Row["stc_idorigenorden"] == DBNull.Value) ? 0 : (int) Row["stc_idorigenorden"];

Simple.stc_dfechapago = (Row["stc_dfechapago"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["stc_dfechapago"];

Simple.stc_nvalorpagotecnico = (Row["stc_nvalorpagotecnico"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_nvalorpagotecnico"];

Simple.stc_ncostomanodeobra = (Row["stc_ncostomanodeobra"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["stc_ncostomanodeobra"];

Simple.stc_iPrioridad = (Row["stc_iPrioridad"] == DBNull.Value) ? 0 : (int) Row["stc_iPrioridad"];

Simple.stc_iOrganizacion = (Row["stc_iOrganizacion"] == DBNull.Value) ? 0 : (int) Row["stc_iOrganizacion"];


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
    using(var CmdParents = new SqlCommand("m_st_cabeceraByParentObject", conn))
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
    Simplem_st_cabecera Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_st_cabeceraByParentObject", conn))
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
    Simple = new Simplem_st_cabecera();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.stc_iid_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.stc_inumero = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.stc_ctipo_servicio = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.stc_mobservaciones = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.stc_dfecha_desde_1 = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.stc_dfecha_hasta_1 = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.stc_dfecha_desde_2 = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.stc_dfecha_hasta_2 = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.stc_dfecha_desde_3 = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.stc_dfecha_hasta_3 = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.stc_dfecha_cierre = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.stc_ccontacto = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.stc_nestado = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.stc_ctecnico_1 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.stc_ctecnico_2 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.stc_ctecnico_3 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.stc_ctecnico_4 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.stc_ctecnico_5 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.stc_yValor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.stc_nreclamo_1 = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.stc_creclamo_1 = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.stc_nreclamo_2 = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.stc_creclamo_2 = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.stc_nreclamo_3 = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.stc_creclamo_3 = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.stc_nreclamo_4 = (Reader.IsDBNull(27)) ? new Decimal(0) : Reader.GetDecimal(27);
if (Reader.FieldCount > 28)Simple.stc_creclamo_4 = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.stc_nreclamo_5 = (Reader.IsDBNull(29)) ? new Decimal(0) : Reader.GetDecimal(29);
if (Reader.FieldCount > 30)Simple.stc_creclamo_5 = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.stc_cmovil_1 = (Reader.IsDBNull(31)) ? "" : Reader.GetString(31);
if (Reader.FieldCount > 32)Simple.stc_cmovil_2 = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.stc_dfecha_modificacion = (Reader.IsDBNull(33)) ? new DateTime(1,1,1) : Reader.GetDateTime(33);
if (Reader.FieldCount > 34)Simple.stc_ioperador = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.stc_minsumos = (Reader.IsDBNull(35)) ? "" : Reader.GetString(35);
if (Reader.FieldCount > 36)Simple.stc_dintecnico_1 = (Reader.IsDBNull(36)) ? new DateTime(1,1,1) : Reader.GetDateTime(36);
if (Reader.FieldCount > 37)Simple.stc_doutecnico_1 = (Reader.IsDBNull(37)) ? new DateTime(1,1,1) : Reader.GetDateTime(37);
if (Reader.FieldCount > 38)Simple.stc_dintecnico_2 = (Reader.IsDBNull(38)) ? new DateTime(1,1,1) : Reader.GetDateTime(38);
if (Reader.FieldCount > 39)Simple.stc_doutecnico_2 = (Reader.IsDBNull(39)) ? new DateTime(1,1,1) : Reader.GetDateTime(39);
if (Reader.FieldCount > 40)Simple.stc_dintecnico_3 = (Reader.IsDBNull(40)) ? new DateTime(1,1,1) : Reader.GetDateTime(40);
if (Reader.FieldCount > 41)Simple.stc_doutecnico_3 = (Reader.IsDBNull(41)) ? new DateTime(1,1,1) : Reader.GetDateTime(41);
if (Reader.FieldCount > 42)Simple.stc_cdeposito = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.stf_dfecha_vto_orden = (Reader.IsDBNull(43)) ? new DateTime(1,1,1) : Reader.GetDateTime(43);
if (Reader.FieldCount > 44)Simple.stc_dsalida_al_cliente_DSS = (Reader.IsDBNull(44)) ? new DateTime(1,1,1) : Reader.GetDateTime(44);
if (Reader.FieldCount > 45)Simple.stc_darribo_al_cliente_DSS = (Reader.IsDBNull(45)) ? new DateTime(1,1,1) : Reader.GetDateTime(45);
if (Reader.FieldCount > 46)Simple.stc_dsalida_desde_cliente_DSS = (Reader.IsDBNull(46)) ? new DateTime(1,1,1) : Reader.GetDateTime(46);
if (Reader.FieldCount > 47)Simple.stc_iforma_viaje_DSS = (Reader.IsDBNull(47)) ? 0 : Reader.GetInt32(47);
if (Reader.FieldCount > 48)Simple.stc_cconformidad_html  = (Reader.IsDBNull(48)) ? "" : Reader.GetString(48);
if (Reader.FieldCount > 49)Simple.stc_idorigenorden = (Reader.IsDBNull(49)) ? 0 : Reader.GetInt32(49);
if (Reader.FieldCount > 50)Simple.stc_dfechapago = (Reader.IsDBNull(50)) ? new DateTime(1,1,1) : Reader.GetDateTime(50);
if (Reader.FieldCount > 51)Simple.stc_nvalorpagotecnico = (Reader.IsDBNull(51)) ? new Decimal(0) : Reader.GetDecimal(51);
if (Reader.FieldCount > 52)Simple.stc_ncostomanodeobra = (Reader.IsDBNull(52)) ? new Decimal(0) : Reader.GetDecimal(52);
if (Reader.FieldCount > 53)Simple.stc_iPrioridad = (Reader.IsDBNull(53)) ? 0 : Reader.GetInt32(53);
if (Reader.FieldCount > 54)Simple.stc_iOrganizacion = (Reader.IsDBNull(54)) ? 0 : Reader.GetInt32(54);


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
    using (var CmdDataByName = new SqlCommand("m_st_cabeceraByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_st_cabeceraByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_st_cabeceraByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_st_cabeceraByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_st_cabeceraByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_st_cabecera Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_st_cabeceraBySimplem_st_cabecera", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@stc_iid_cuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_ctipo_servicio", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_mobservaciones", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_desde_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_hasta_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_cierre", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_ccontacto", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_1", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_2", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_3", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_4", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_ctecnico_5", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_yValor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_1", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_3", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_4", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_4", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_nreclamo_5", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_creclamo_5", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_cmovil_1", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_cmovil_2", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stc_dfecha_modificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_minsumos", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_1", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_2", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dintecnico_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_doutecnico_3", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_cdeposito", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@stf_dfecha_vto_orden", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dsalida_al_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_darribo_al_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_dsalida_desde_cliente_DSS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_iforma_viaje_DSS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_cconformidad_html ", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@stc_idorigenorden", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_dfechapago", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@stc_nvalorpagotecnico", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_ncostomanodeobra", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@stc_iPrioridad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@stc_iOrganizacion", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@stc_iid_cuenta"].Value = this._stc_iid_cuenta;

		cmd.Parameters["@stc_inumero"].Value = this._stc_inumero;

		cmd.Parameters["@stc_ctipo_servicio"].Value = (this._stc_ctipo_servicio == null) ? (object) DBNull.Value : (object) this._stc_ctipo_servicio;

		cmd.Parameters["@stc_mobservaciones"].Value = (this._stc_mobservaciones == null) ? (object) DBNull.Value : (object) this._stc_mobservaciones;

		cmd.Parameters["@stc_dfecha_desde_1"].Value = (this._stc_dfecha_desde_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_1;

		cmd.Parameters["@stc_dfecha_hasta_1"].Value = (this._stc_dfecha_hasta_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_1;

		cmd.Parameters["@stc_dfecha_desde_2"].Value = (this._stc_dfecha_desde_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_2;

		cmd.Parameters["@stc_dfecha_hasta_2"].Value = (this._stc_dfecha_hasta_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_2;

		cmd.Parameters["@stc_dfecha_desde_3"].Value = (this._stc_dfecha_desde_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_desde_3;

		cmd.Parameters["@stc_dfecha_hasta_3"].Value = (this._stc_dfecha_hasta_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_hasta_3;

		cmd.Parameters["@stc_dfecha_cierre"].Value = (this._stc_dfecha_cierre == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_cierre;

		cmd.Parameters["@stc_ccontacto"].Value = (this._stc_ccontacto == null) ? (object) DBNull.Value : (object) this._stc_ccontacto;

		cmd.Parameters["@stc_nestado"].Value = this._stc_nestado;

		cmd.Parameters["@stc_ctecnico_1"].Value = (this._stc_ctecnico_1 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_1;

		cmd.Parameters["@stc_ctecnico_2"].Value = (this._stc_ctecnico_2 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_2;

		cmd.Parameters["@stc_ctecnico_3"].Value = (this._stc_ctecnico_3 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_3;

		cmd.Parameters["@stc_ctecnico_4"].Value = (this._stc_ctecnico_4 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_4;

		cmd.Parameters["@stc_ctecnico_5"].Value = (this._stc_ctecnico_5 == null) ? (object) DBNull.Value : (object) this._stc_ctecnico_5;

		cmd.Parameters["@stc_yValor"].Value = this._stc_yValor;

		cmd.Parameters["@stc_nreclamo_1"].Value = this._stc_nreclamo_1;

		cmd.Parameters["@stc_creclamo_1"].Value = (this._stc_creclamo_1 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_1;

		cmd.Parameters["@stc_nreclamo_2"].Value = this._stc_nreclamo_2;

		cmd.Parameters["@stc_creclamo_2"].Value = (this._stc_creclamo_2 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_2;

		cmd.Parameters["@stc_nreclamo_3"].Value = this._stc_nreclamo_3;

		cmd.Parameters["@stc_creclamo_3"].Value = (this._stc_creclamo_3 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_3;

		cmd.Parameters["@stc_nreclamo_4"].Value = this._stc_nreclamo_4;

		cmd.Parameters["@stc_creclamo_4"].Value = (this._stc_creclamo_4 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_4;

		cmd.Parameters["@stc_nreclamo_5"].Value = this._stc_nreclamo_5;

		cmd.Parameters["@stc_creclamo_5"].Value = (this._stc_creclamo_5 == null) ? (object) DBNull.Value : (object) this._stc_creclamo_5;

		cmd.Parameters["@stc_cmovil_1"].Value = (this._stc_cmovil_1 == null) ? (object) DBNull.Value : (object) this._stc_cmovil_1;

		cmd.Parameters["@stc_cmovil_2"].Value = (this._stc_cmovil_2 == null) ? (object) DBNull.Value : (object) this._stc_cmovil_2;

		cmd.Parameters["@stc_dfecha_modificacion"].Value = (this._stc_dfecha_modificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfecha_modificacion;

		cmd.Parameters["@stc_ioperador"].Value = this._stc_ioperador;

		cmd.Parameters["@stc_minsumos"].Value = (this._stc_minsumos == null) ? (object) DBNull.Value : (object) this._stc_minsumos;

		cmd.Parameters["@stc_dintecnico_1"].Value = (this._stc_dintecnico_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_1;

		cmd.Parameters["@stc_doutecnico_1"].Value = (this._stc_doutecnico_1 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_1;

		cmd.Parameters["@stc_dintecnico_2"].Value = (this._stc_dintecnico_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_2;

		cmd.Parameters["@stc_doutecnico_2"].Value = (this._stc_doutecnico_2 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_2;

		cmd.Parameters["@stc_dintecnico_3"].Value = (this._stc_dintecnico_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dintecnico_3;

		cmd.Parameters["@stc_doutecnico_3"].Value = (this._stc_doutecnico_3 == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_doutecnico_3;

		cmd.Parameters["@stc_cdeposito"].Value = (this._stc_cdeposito == null) ? (object) DBNull.Value : (object) this._stc_cdeposito;

		cmd.Parameters["@stf_dfecha_vto_orden"].Value = (this._stf_dfecha_vto_orden == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stf_dfecha_vto_orden;

		cmd.Parameters["@stc_dsalida_al_cliente_DSS"].Value = (this._stc_dsalida_al_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dsalida_al_cliente_DSS;

		cmd.Parameters["@stc_darribo_al_cliente_DSS"].Value = (this._stc_darribo_al_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_darribo_al_cliente_DSS;

		cmd.Parameters["@stc_dsalida_desde_cliente_DSS"].Value = (this._stc_dsalida_desde_cliente_DSS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dsalida_desde_cliente_DSS;

		cmd.Parameters["@stc_iforma_viaje_DSS"].Value = this._stc_iforma_viaje_DSS;

		cmd.Parameters["@stc_cconformidad_html "].Value = (this._stc_cconformidad_html  == null) ? (object) DBNull.Value : (object) this._stc_cconformidad_html ;

		cmd.Parameters["@stc_idorigenorden"].Value = this._stc_idorigenorden;

		cmd.Parameters["@stc_dfechapago"].Value = (this._stc_dfechapago == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._stc_dfechapago;

		cmd.Parameters["@stc_nvalorpagotecnico"].Value = this._stc_nvalorpagotecnico;

		cmd.Parameters["@stc_ncostomanodeobra"].Value = this._stc_ncostomanodeobra;

		cmd.Parameters["@stc_iPrioridad"].Value = this._stc_iPrioridad;

		cmd.Parameters["@stc_iOrganizacion"].Value = this._stc_iOrganizacion;


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
		 
		public IEnumerable<Simplem_st_cabecera> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_st_cabeceraByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_st_cabecera Simple = new Simplem_st_cabecera();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.stc_iid_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.stc_inumero = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.stc_ctipo_servicio = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.stc_mobservaciones = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.stc_dfecha_desde_1 = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.stc_dfecha_hasta_1 = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.stc_dfecha_desde_2 = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.stc_dfecha_hasta_2 = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.stc_dfecha_desde_3 = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.stc_dfecha_hasta_3 = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.stc_dfecha_cierre = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.stc_ccontacto = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.stc_nestado = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.stc_ctecnico_1 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.stc_ctecnico_2 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.stc_ctecnico_3 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.stc_ctecnico_4 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.stc_ctecnico_5 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.stc_yValor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.stc_nreclamo_1 = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.stc_creclamo_1 = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.stc_nreclamo_2 = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.stc_creclamo_2 = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.stc_nreclamo_3 = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.stc_creclamo_3 = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.stc_nreclamo_4 = (Reader.IsDBNull(27)) ? new Decimal(0) : Reader.GetDecimal(27);
if (Reader.FieldCount > 28)Simple.stc_creclamo_4 = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.stc_nreclamo_5 = (Reader.IsDBNull(29)) ? new Decimal(0) : Reader.GetDecimal(29);
if (Reader.FieldCount > 30)Simple.stc_creclamo_5 = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.stc_cmovil_1 = (Reader.IsDBNull(31)) ? "" : Reader.GetString(31);
if (Reader.FieldCount > 32)Simple.stc_cmovil_2 = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.stc_dfecha_modificacion = (Reader.IsDBNull(33)) ? new DateTime(1,1,1) : Reader.GetDateTime(33);
if (Reader.FieldCount > 34)Simple.stc_ioperador = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.stc_minsumos = (Reader.IsDBNull(35)) ? "" : Reader.GetString(35);
if (Reader.FieldCount > 36)Simple.stc_dintecnico_1 = (Reader.IsDBNull(36)) ? new DateTime(1,1,1) : Reader.GetDateTime(36);
if (Reader.FieldCount > 37)Simple.stc_doutecnico_1 = (Reader.IsDBNull(37)) ? new DateTime(1,1,1) : Reader.GetDateTime(37);
if (Reader.FieldCount > 38)Simple.stc_dintecnico_2 = (Reader.IsDBNull(38)) ? new DateTime(1,1,1) : Reader.GetDateTime(38);
if (Reader.FieldCount > 39)Simple.stc_doutecnico_2 = (Reader.IsDBNull(39)) ? new DateTime(1,1,1) : Reader.GetDateTime(39);
if (Reader.FieldCount > 40)Simple.stc_dintecnico_3 = (Reader.IsDBNull(40)) ? new DateTime(1,1,1) : Reader.GetDateTime(40);
if (Reader.FieldCount > 41)Simple.stc_doutecnico_3 = (Reader.IsDBNull(41)) ? new DateTime(1,1,1) : Reader.GetDateTime(41);
if (Reader.FieldCount > 42)Simple.stc_cdeposito = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.stf_dfecha_vto_orden = (Reader.IsDBNull(43)) ? new DateTime(1,1,1) : Reader.GetDateTime(43);
if (Reader.FieldCount > 44)Simple.stc_dsalida_al_cliente_DSS = (Reader.IsDBNull(44)) ? new DateTime(1,1,1) : Reader.GetDateTime(44);
if (Reader.FieldCount > 45)Simple.stc_darribo_al_cliente_DSS = (Reader.IsDBNull(45)) ? new DateTime(1,1,1) : Reader.GetDateTime(45);
if (Reader.FieldCount > 46)Simple.stc_dsalida_desde_cliente_DSS = (Reader.IsDBNull(46)) ? new DateTime(1,1,1) : Reader.GetDateTime(46);
if (Reader.FieldCount > 47)Simple.stc_iforma_viaje_DSS = (Reader.IsDBNull(47)) ? 0 : Reader.GetInt32(47);
if (Reader.FieldCount > 48)Simple.stc_cconformidad_html  = (Reader.IsDBNull(48)) ? "" : Reader.GetString(48);
if (Reader.FieldCount > 49)Simple.stc_idorigenorden = (Reader.IsDBNull(49)) ? 0 : Reader.GetInt32(49);
if (Reader.FieldCount > 50)Simple.stc_dfechapago = (Reader.IsDBNull(50)) ? new DateTime(1,1,1) : Reader.GetDateTime(50);
if (Reader.FieldCount > 51)Simple.stc_nvalorpagotecnico = (Reader.IsDBNull(51)) ? new Decimal(0) : Reader.GetDecimal(51);
if (Reader.FieldCount > 52)Simple.stc_ncostomanodeobra = (Reader.IsDBNull(52)) ? new Decimal(0) : Reader.GetDecimal(52);
if (Reader.FieldCount > 53)Simple.stc_iPrioridad = (Reader.IsDBNull(53)) ? 0 : Reader.GetInt32(53);
if (Reader.FieldCount > 54)Simple.stc_iOrganizacion = (Reader.IsDBNull(54)) ? 0 : Reader.GetInt32(54);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_st_cabecera> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_st_cabeceraByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_st_cabecera Simple = new Simplem_st_cabecera();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.stc_iid_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.stc_inumero = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.stc_ctipo_servicio = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.stc_mobservaciones = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.stc_dfecha_desde_1 = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.stc_dfecha_hasta_1 = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.stc_dfecha_desde_2 = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.stc_dfecha_hasta_2 = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.stc_dfecha_desde_3 = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.stc_dfecha_hasta_3 = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.stc_dfecha_cierre = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.stc_ccontacto = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.stc_nestado = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.stc_ctecnico_1 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.stc_ctecnico_2 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.stc_ctecnico_3 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.stc_ctecnico_4 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.stc_ctecnico_5 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.stc_yValor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.stc_nreclamo_1 = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.stc_creclamo_1 = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)Simple.stc_nreclamo_2 = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.stc_creclamo_2 = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.stc_nreclamo_3 = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.stc_creclamo_3 = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.stc_nreclamo_4 = (Reader.IsDBNull(27)) ? new Decimal(0) : Reader.GetDecimal(27);
if (Reader.FieldCount > 28)Simple.stc_creclamo_4 = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.stc_nreclamo_5 = (Reader.IsDBNull(29)) ? new Decimal(0) : Reader.GetDecimal(29);
if (Reader.FieldCount > 30)Simple.stc_creclamo_5 = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.stc_cmovil_1 = (Reader.IsDBNull(31)) ? "" : Reader.GetString(31);
if (Reader.FieldCount > 32)Simple.stc_cmovil_2 = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.stc_dfecha_modificacion = (Reader.IsDBNull(33)) ? new DateTime(1,1,1) : Reader.GetDateTime(33);
if (Reader.FieldCount > 34)Simple.stc_ioperador = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.stc_minsumos = (Reader.IsDBNull(35)) ? "" : Reader.GetString(35);
if (Reader.FieldCount > 36)Simple.stc_dintecnico_1 = (Reader.IsDBNull(36)) ? new DateTime(1,1,1) : Reader.GetDateTime(36);
if (Reader.FieldCount > 37)Simple.stc_doutecnico_1 = (Reader.IsDBNull(37)) ? new DateTime(1,1,1) : Reader.GetDateTime(37);
if (Reader.FieldCount > 38)Simple.stc_dintecnico_2 = (Reader.IsDBNull(38)) ? new DateTime(1,1,1) : Reader.GetDateTime(38);
if (Reader.FieldCount > 39)Simple.stc_doutecnico_2 = (Reader.IsDBNull(39)) ? new DateTime(1,1,1) : Reader.GetDateTime(39);
if (Reader.FieldCount > 40)Simple.stc_dintecnico_3 = (Reader.IsDBNull(40)) ? new DateTime(1,1,1) : Reader.GetDateTime(40);
if (Reader.FieldCount > 41)Simple.stc_doutecnico_3 = (Reader.IsDBNull(41)) ? new DateTime(1,1,1) : Reader.GetDateTime(41);
if (Reader.FieldCount > 42)Simple.stc_cdeposito = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.stf_dfecha_vto_orden = (Reader.IsDBNull(43)) ? new DateTime(1,1,1) : Reader.GetDateTime(43);
if (Reader.FieldCount > 44)Simple.stc_dsalida_al_cliente_DSS = (Reader.IsDBNull(44)) ? new DateTime(1,1,1) : Reader.GetDateTime(44);
if (Reader.FieldCount > 45)Simple.stc_darribo_al_cliente_DSS = (Reader.IsDBNull(45)) ? new DateTime(1,1,1) : Reader.GetDateTime(45);
if (Reader.FieldCount > 46)Simple.stc_dsalida_desde_cliente_DSS = (Reader.IsDBNull(46)) ? new DateTime(1,1,1) : Reader.GetDateTime(46);
if (Reader.FieldCount > 47)Simple.stc_iforma_viaje_DSS = (Reader.IsDBNull(47)) ? 0 : Reader.GetInt32(47);
if (Reader.FieldCount > 48)Simple.stc_cconformidad_html  = (Reader.IsDBNull(48)) ? "" : Reader.GetString(48);
if (Reader.FieldCount > 49)Simple.stc_idorigenorden = (Reader.IsDBNull(49)) ? 0 : Reader.GetInt32(49);
if (Reader.FieldCount > 50)Simple.stc_dfechapago = (Reader.IsDBNull(50)) ? new DateTime(1,1,1) : Reader.GetDateTime(50);
if (Reader.FieldCount > 51)Simple.stc_nvalorpagotecnico = (Reader.IsDBNull(51)) ? new Decimal(0) : Reader.GetDecimal(51);
if (Reader.FieldCount > 52)Simple.stc_ncostomanodeobra = (Reader.IsDBNull(52)) ? new Decimal(0) : Reader.GetDecimal(52);
if (Reader.FieldCount > 53)Simple.stc_iPrioridad = (Reader.IsDBNull(53)) ? 0 : Reader.GetInt32(53);
if (Reader.FieldCount > 54)Simple.stc_iOrganizacion = (Reader.IsDBNull(54)) ? 0 : Reader.GetInt32(54);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3102, "m_st_cabecera");
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
    if (Reader.FieldCount > 2)this._stc_iid_cuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._stc_inumero = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._stc_ctipo_servicio = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._stc_mobservaciones = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._stc_dfecha_desde_1 = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._stc_dfecha_hasta_1 = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)this._stc_dfecha_desde_2 = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)this._stc_dfecha_hasta_2 = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)this._stc_dfecha_desde_3 = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)this._stc_dfecha_hasta_3 = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)this._stc_dfecha_cierre = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)this._stc_ccontacto = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._stc_nestado = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)this._stc_ctecnico_1 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._stc_ctecnico_2 = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._stc_ctecnico_3 = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)this._stc_ctecnico_4 = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)this._stc_ctecnico_5 = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)this._stc_yValor = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)this._stc_nreclamo_1 = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)this._stc_creclamo_1 = (Reader.IsDBNull(22)) ? "" : Reader.GetString(22);
if (Reader.FieldCount > 23)this._stc_nreclamo_2 = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)this._stc_creclamo_2 = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)this._stc_nreclamo_3 = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)this._stc_creclamo_3 = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)this._stc_nreclamo_4 = (Reader.IsDBNull(27)) ? new Decimal(0) : Reader.GetDecimal(27);
if (Reader.FieldCount > 28)this._stc_creclamo_4 = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)this._stc_nreclamo_5 = (Reader.IsDBNull(29)) ? new Decimal(0) : Reader.GetDecimal(29);
if (Reader.FieldCount > 30)this._stc_creclamo_5 = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)this._stc_cmovil_1 = (Reader.IsDBNull(31)) ? "" : Reader.GetString(31);
if (Reader.FieldCount > 32)this._stc_cmovil_2 = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)this._stc_dfecha_modificacion = (Reader.IsDBNull(33)) ? new DateTime(1,1,1) : Reader.GetDateTime(33);
if (Reader.FieldCount > 34)this._stc_ioperador = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)this._stc_minsumos = (Reader.IsDBNull(35)) ? "" : Reader.GetString(35);
if (Reader.FieldCount > 36)this._stc_dintecnico_1 = (Reader.IsDBNull(36)) ? new DateTime(1,1,1) : Reader.GetDateTime(36);
if (Reader.FieldCount > 37)this._stc_doutecnico_1 = (Reader.IsDBNull(37)) ? new DateTime(1,1,1) : Reader.GetDateTime(37);
if (Reader.FieldCount > 38)this._stc_dintecnico_2 = (Reader.IsDBNull(38)) ? new DateTime(1,1,1) : Reader.GetDateTime(38);
if (Reader.FieldCount > 39)this._stc_doutecnico_2 = (Reader.IsDBNull(39)) ? new DateTime(1,1,1) : Reader.GetDateTime(39);
if (Reader.FieldCount > 40)this._stc_dintecnico_3 = (Reader.IsDBNull(40)) ? new DateTime(1,1,1) : Reader.GetDateTime(40);
if (Reader.FieldCount > 41)this._stc_doutecnico_3 = (Reader.IsDBNull(41)) ? new DateTime(1,1,1) : Reader.GetDateTime(41);
if (Reader.FieldCount > 42)this._stc_cdeposito = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)this._stf_dfecha_vto_orden = (Reader.IsDBNull(43)) ? new DateTime(1,1,1) : Reader.GetDateTime(43);
if (Reader.FieldCount > 44)this._stc_dsalida_al_cliente_DSS = (Reader.IsDBNull(44)) ? new DateTime(1,1,1) : Reader.GetDateTime(44);
if (Reader.FieldCount > 45)this._stc_darribo_al_cliente_DSS = (Reader.IsDBNull(45)) ? new DateTime(1,1,1) : Reader.GetDateTime(45);
if (Reader.FieldCount > 46)this._stc_dsalida_desde_cliente_DSS = (Reader.IsDBNull(46)) ? new DateTime(1,1,1) : Reader.GetDateTime(46);
if (Reader.FieldCount > 47)this._stc_iforma_viaje_DSS = (Reader.IsDBNull(47)) ? 0 : Reader.GetInt32(47);
if (Reader.FieldCount > 48)this._stc_cconformidad_html  = (Reader.IsDBNull(48)) ? "" : Reader.GetString(48);
if (Reader.FieldCount > 49)this._stc_idorigenorden = (Reader.IsDBNull(49)) ? 0 : Reader.GetInt32(49);
if (Reader.FieldCount > 50)this._stc_dfechapago = (Reader.IsDBNull(50)) ? new DateTime(1,1,1) : Reader.GetDateTime(50);
if (Reader.FieldCount > 51)this._stc_nvalorpagotecnico = (Reader.IsDBNull(51)) ? new Decimal(0) : Reader.GetDecimal(51);
if (Reader.FieldCount > 52)this._stc_ncostomanodeobra = (Reader.IsDBNull(52)) ? new Decimal(0) : Reader.GetDecimal(52);
if (Reader.FieldCount > 53)this._stc_iPrioridad = (Reader.IsDBNull(53)) ? 0 : Reader.GetInt32(53);
if (Reader.FieldCount > 54)this._stc_iOrganizacion = (Reader.IsDBNull(54)) ? 0 : Reader.GetInt32(54);

    }
    Reader.Close();
    }
   }
  
    }
  