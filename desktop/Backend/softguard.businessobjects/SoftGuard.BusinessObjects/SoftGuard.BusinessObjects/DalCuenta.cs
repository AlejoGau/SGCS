
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
     ///Cuenta data access layer   
     ///</summary>
    public class DalCuenta : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _cue_clinea;
    
      private string _cue_ncuenta;
    
      private string _cue_cnombre;
    
      private string _cue_ccalle;
    
      private string _cue_clocalidad;
    
      private string _cue_cprovincia;
    
      private string _cue_ccodigopostal;
    
      private string _cue_ccallecorreo;
    
      private string _cue_clocalidadcorreo;
    
      private string _cue_cprovinciacorreo;
    
      private string _cue_ccodigopostalcorreo;
    
      private string _cue_ctelefono;
    
      private string _cue_cclave;
    
      private string _cue_cpermiso;
    
      private string _cue_ctipo;
    
      private string _cue_cubicacion;
    
      private int _cue_nparticion;
    
      private string _cue_cobservacion;
    
      private string _cue_cfoto;
    
      private DateTime? _cue_dfechaalta;
    
      private DateTime? _cue_dservicio;
    
      private Decimal _cue_nmostrar;
    
      private Decimal _cue_nsonidoul;
    
      private Decimal _cue_nllaveul;
    
      private string _cue_cemail;
    
      private string _cue_cinstalador;
    
      private string _cue_cIMEI;
    
      private string _cue_cLatLng;
    
      private string _Situacion;
    
      private Decimal _cue_nEfectiva;
    
      private string _cue_cIdExtendido;
    
      private int _cue_iZonaHoraria;
    
      private string _cue_cPartitionInfo;
    
      private Decimal _cue_nAutoMonitoreo;
    
      private Decimal _cue_nPrioridad;
    
      private string _cue_cCustom;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cue_clinea   
     ///</summary>
      public string cue_clinea
      {
      
          get{ return this._cue_clinea; }
          set{ this._cue_clinea = value; }
        
      }
     ///<summary>
     ///cue_ncuenta   
     ///</summary>
      public string cue_ncuenta
      {
      
          get{ return this._cue_ncuenta; }
          set{ this._cue_ncuenta = value; }
        
      }
     ///<summary>
     ///cue_cnombre   
     ///</summary>
      public string cue_cnombre
      {
      
          get{ return this._cue_cnombre; }
          set{ this._cue_cnombre = value; }
        
      }
     ///<summary>
     ///cue_ccalle   
     ///</summary>
      public string cue_ccalle
      {
      
          get{ return this._cue_ccalle; }
          set{ this._cue_ccalle = value; }
        
      }
     ///<summary>
     ///cue_clocalidad   
     ///</summary>
      public string cue_clocalidad
      {
      
          get{ return this._cue_clocalidad; }
          set{ this._cue_clocalidad = value; }
        
      }
     ///<summary>
     ///cue_cprovincia   
     ///</summary>
      public string cue_cprovincia
      {
      
          get{ return this._cue_cprovincia; }
          set{ this._cue_cprovincia = value; }
        
      }
     ///<summary>
     ///cue_ccodigopostal   
     ///</summary>
      public string cue_ccodigopostal
      {
      
          get{ return this._cue_ccodigopostal; }
          set{ this._cue_ccodigopostal = value; }
        
      }
     ///<summary>
     ///cue_ccallecorreo   
     ///</summary>
      public string cue_ccallecorreo
      {
      
          get{ return this._cue_ccallecorreo; }
          set{ this._cue_ccallecorreo = value; }
        
      }
     ///<summary>
     ///cue_clocalidadcorreo   
     ///</summary>
      public string cue_clocalidadcorreo
      {
      
          get{ return this._cue_clocalidadcorreo; }
          set{ this._cue_clocalidadcorreo = value; }
        
      }
     ///<summary>
     ///cue_cprovinciacorreo   
     ///</summary>
      public string cue_cprovinciacorreo
      {
      
          get{ return this._cue_cprovinciacorreo; }
          set{ this._cue_cprovinciacorreo = value; }
        
      }
     ///<summary>
     ///cue_ccodigopostalcorreo   
     ///</summary>
      public string cue_ccodigopostalcorreo
      {
      
          get{ return this._cue_ccodigopostalcorreo; }
          set{ this._cue_ccodigopostalcorreo = value; }
        
      }
     ///<summary>
     ///cue_ctelefono   
     ///</summary>
      public string cue_ctelefono
      {
      
          get{ return this._cue_ctelefono; }
          set{ this._cue_ctelefono = value; }
        
      }
     ///<summary>
     ///cue_cclave   
     ///</summary>
      public string cue_cclave
      {
      
          get{ return this._cue_cclave; }
          set{ this._cue_cclave = value; }
        
      }
     ///<summary>
     ///cue_cpermiso   
     ///</summary>
      public string cue_cpermiso
      {
      
          get{ return this._cue_cpermiso; }
          set{ this._cue_cpermiso = value; }
        
      }
     ///<summary>
     ///cue_ctipo   
     ///</summary>
      public string cue_ctipo
      {
      
          get{ return this._cue_ctipo; }
          set{ this._cue_ctipo = value; }
        
      }
     ///<summary>
     ///cue_cubicacion   
     ///</summary>
      public string cue_cubicacion
      {
      
          get{ return this._cue_cubicacion; }
          set{ this._cue_cubicacion = value; }
        
      }
     ///<summary>
     ///cue_nparticion   
     ///</summary>
      public int cue_nparticion
      {
      
          get{ return this._cue_nparticion; }
          set{ this._cue_nparticion = value; }
        
      }
     ///<summary>
     ///cue_cobservacion   
     ///</summary>
      public string cue_cobservacion
      {
      
          get{ return this._cue_cobservacion; }
          set{ this._cue_cobservacion = value; }
        
      }
     ///<summary>
     ///cue_cfoto   
     ///</summary>
      public string cue_cfoto
      {
      
          get{ return this._cue_cfoto; }
          set{ this._cue_cfoto = value; }
        
      }
     ///<summary>
     ///cue_dfechaalta   
     ///</summary>
      public DateTime? cue_dfechaalta
      {
      
          get{ return this._cue_dfechaalta; }
          set{ this._cue_dfechaalta = value; }
        
      }
     ///<summary>
     ///cue_dservicio   
     ///</summary>
      public DateTime? cue_dservicio
      {
      
          get{ return this._cue_dservicio; }
          set{ this._cue_dservicio = value; }
        
      }
     ///<summary>
     ///cue_nmostrar   
     ///</summary>
      public Decimal cue_nmostrar
      {
      
          get{ return this._cue_nmostrar; }
          set{ this._cue_nmostrar = value; }
        
      }
     ///<summary>
     ///cue_nsonidoul   
     ///</summary>
      public Decimal cue_nsonidoul
      {
      
          get{ return this._cue_nsonidoul; }
          set{ this._cue_nsonidoul = value; }
        
      }
     ///<summary>
     ///cue_nllaveul   
     ///</summary>
      public Decimal cue_nllaveul
      {
      
          get{ return this._cue_nllaveul; }
          set{ this._cue_nllaveul = value; }
        
      }
     ///<summary>
     ///cue_cemail   
     ///</summary>
      public string cue_cemail
      {
      
          get{ return this._cue_cemail; }
          set{ this._cue_cemail = value; }
        
      }
     ///<summary>
     ///cue_cinstalador   
     ///</summary>
      public string cue_cinstalador
      {
      
          get{ return this._cue_cinstalador; }
          set{ this._cue_cinstalador = value; }
        
      }
     ///<summary>
     ///cue_cIMEI   
     ///</summary>
      public string cue_cIMEI
      {
      
          get{ return this._cue_cIMEI; }
          set{ this._cue_cIMEI = value; }
        
      }
     ///<summary>
     ///cue_cLatLng   
     ///</summary>
      public string cue_cLatLng
      {
      
          get{ return this._cue_cLatLng; }
          set{ this._cue_cLatLng = value; }
        
      }
     ///<summary>
     ///Situacion   
     ///</summary>
      public string Situacion
      {
      
          get{ return this._Situacion; }
          set{ this._Situacion = value; }
        
      }
     ///<summary>
     ///cue_nEfectiva   
     ///</summary>
      public Decimal cue_nEfectiva
      {
      
          get{ return this._cue_nEfectiva; }
          set{ this._cue_nEfectiva = value; }
        
      }
     ///<summary>
     ///cue_cIdExtendido   
     ///</summary>
      public string cue_cIdExtendido
      {
      
          get{ return this._cue_cIdExtendido; }
          set{ this._cue_cIdExtendido = value; }
        
      }
     ///<summary>
     ///cue_iZonaHoraria   
     ///</summary>
      public int cue_iZonaHoraria
      {
      
          get{ return this._cue_iZonaHoraria; }
          set{ this._cue_iZonaHoraria = value; }
        
      }
     ///<summary>
     ///cue_cPartitionInfo   
     ///</summary>
      public string cue_cPartitionInfo
      {
      
          get{ return this._cue_cPartitionInfo; }
          set{ this._cue_cPartitionInfo = value; }
        
      }
     ///<summary>
     ///cue_nAutoMonitoreo   
     ///</summary>
      public Decimal cue_nAutoMonitoreo
      {
      
          get{ return this._cue_nAutoMonitoreo; }
          set{ this._cue_nAutoMonitoreo = value; }
        
      }
     ///<summary>
     ///cue_nPrioridad   
     ///</summary>
      public Decimal cue_nPrioridad
      {
      
          get{ return this._cue_nPrioridad; }
          set{ this._cue_nPrioridad = value; }
        
      }
     ///<summary>
     ///cue_cCustom   
     ///</summary>
      public string cue_cCustom
      {
      
          get{ return this._cue_cCustom; }
          set{ this._cue_cCustom = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalCuenta(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalCuenta(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalCuenta(SqlHelper SqlConfig, int UserId, SimpleCuenta Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cue_clinea = Simple.cue_clinea;

      this._cue_ncuenta = Simple.cue_ncuenta;

      this._cue_cnombre = Simple.cue_cnombre;

      this._cue_ccalle = Simple.cue_ccalle;

      this._cue_clocalidad = Simple.cue_clocalidad;

      this._cue_cprovincia = Simple.cue_cprovincia;

      this._cue_ccodigopostal = Simple.cue_ccodigopostal;

      this._cue_ccallecorreo = Simple.cue_ccallecorreo;

      this._cue_clocalidadcorreo = Simple.cue_clocalidadcorreo;

      this._cue_cprovinciacorreo = Simple.cue_cprovinciacorreo;

      this._cue_ccodigopostalcorreo = Simple.cue_ccodigopostalcorreo;

      this._cue_ctelefono = Simple.cue_ctelefono;

      this._cue_cclave = Simple.cue_cclave;

      this._cue_cpermiso = Simple.cue_cpermiso;

      this._cue_ctipo = Simple.cue_ctipo;

      this._cue_cubicacion = Simple.cue_cubicacion;

      this._cue_nparticion = Simple.cue_nparticion;

      this._cue_cobservacion = Simple.cue_cobservacion;

      this._cue_cfoto = Simple.cue_cfoto;

      this._cue_dfechaalta = Simple.cue_dfechaalta;

      this._cue_dservicio = Simple.cue_dservicio;

      this._cue_nmostrar = Simple.cue_nmostrar;

      this._cue_nsonidoul = Simple.cue_nsonidoul;

      this._cue_nllaveul = Simple.cue_nllaveul;

      this._cue_cemail = Simple.cue_cemail;

      this._cue_cinstalador = Simple.cue_cinstalador;

      this._cue_cIMEI = Simple.cue_cIMEI;

      this._cue_cLatLng = Simple.cue_cLatLng;

      this._Situacion = Simple.Situacion;

      this._cue_nEfectiva = Simple.cue_nEfectiva;

      this._cue_cIdExtendido = Simple.cue_cIdExtendido;

      this._cue_iZonaHoraria = Simple.cue_iZonaHoraria;

      this._cue_cPartitionInfo = Simple.cue_cPartitionInfo;

      this._cue_nAutoMonitoreo = Simple.cue_nAutoMonitoreo;

      this._cue_nPrioridad = Simple.cue_nPrioridad;

      this._cue_cCustom = Simple.cue_cCustom;

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
    using(var cmd = new SqlCommand("CuentaIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cue_clinea", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ncuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_clocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cprovincia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ccodigopostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ccallecorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_clocalidadcorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cprovinciacorreo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ccodigopostalcorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cpermiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ctipo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cubicacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cue_nparticion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cue_cfoto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_dfechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cue_dservicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cue_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nsonidoul", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nllaveul", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cemail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cinstalador", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cIMEI", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cLatLng", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Situacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_nEfectiva", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cIdExtendido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_iZonaHoraria", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cPartitionInfo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_nAutoMonitoreo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nPrioridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cCustom", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cue_clinea"].Value = (this._cue_clinea == null) ? (object) DBNull.Value : (object) this._cue_clinea;

		cmd.Parameters["@cue_ncuenta"].Value = (this._cue_ncuenta == null) ? (object) DBNull.Value : (object) this._cue_ncuenta;

		cmd.Parameters["@cue_cnombre"].Value = (this._cue_cnombre == null) ? (object) DBNull.Value : (object) this._cue_cnombre;

		cmd.Parameters["@cue_ccalle"].Value = (this._cue_ccalle == null) ? (object) DBNull.Value : (object) this._cue_ccalle;

		cmd.Parameters["@cue_clocalidad"].Value = (this._cue_clocalidad == null) ? (object) DBNull.Value : (object) this._cue_clocalidad;

		cmd.Parameters["@cue_cprovincia"].Value = (this._cue_cprovincia == null) ? (object) DBNull.Value : (object) this._cue_cprovincia;

		cmd.Parameters["@cue_ccodigopostal"].Value = (this._cue_ccodigopostal == null) ? (object) DBNull.Value : (object) this._cue_ccodigopostal;

		cmd.Parameters["@cue_ccallecorreo"].Value = (this._cue_ccallecorreo == null) ? (object) DBNull.Value : (object) this._cue_ccallecorreo;

		cmd.Parameters["@cue_clocalidadcorreo"].Value = (this._cue_clocalidadcorreo == null) ? (object) DBNull.Value : (object) this._cue_clocalidadcorreo;

		cmd.Parameters["@cue_cprovinciacorreo"].Value = (this._cue_cprovinciacorreo == null) ? (object) DBNull.Value : (object) this._cue_cprovinciacorreo;

		cmd.Parameters["@cue_ccodigopostalcorreo"].Value = (this._cue_ccodigopostalcorreo == null) ? (object) DBNull.Value : (object) this._cue_ccodigopostalcorreo;

		cmd.Parameters["@cue_ctelefono"].Value = (this._cue_ctelefono == null) ? (object) DBNull.Value : (object) this._cue_ctelefono;

		cmd.Parameters["@cue_cclave"].Value = (this._cue_cclave == null) ? (object) DBNull.Value : (object) this._cue_cclave;

		cmd.Parameters["@cue_cpermiso"].Value = (this._cue_cpermiso == null) ? (object) DBNull.Value : (object) this._cue_cpermiso;

		cmd.Parameters["@cue_ctipo"].Value = (this._cue_ctipo == null) ? (object) DBNull.Value : (object) this._cue_ctipo;

		cmd.Parameters["@cue_cubicacion"].Value = (this._cue_cubicacion == null) ? (object) DBNull.Value : (object) this._cue_cubicacion;

		cmd.Parameters["@cue_nparticion"].Value = this._cue_nparticion;

		cmd.Parameters["@cue_cobservacion"].Value = (this._cue_cobservacion == null) ? (object) DBNull.Value : (object) this._cue_cobservacion;

		cmd.Parameters["@cue_cfoto"].Value = (this._cue_cfoto == null) ? (object) DBNull.Value : (object) this._cue_cfoto;

		cmd.Parameters["@cue_dfechaalta"].Value = (this._cue_dfechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cue_dfechaalta;

		cmd.Parameters["@cue_dservicio"].Value = (this._cue_dservicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cue_dservicio;

		cmd.Parameters["@cue_nmostrar"].Value = this._cue_nmostrar;

		cmd.Parameters["@cue_nsonidoul"].Value = this._cue_nsonidoul;

		cmd.Parameters["@cue_nllaveul"].Value = this._cue_nllaveul;

		cmd.Parameters["@cue_cemail"].Value = (this._cue_cemail == null) ? (object) DBNull.Value : (object) this._cue_cemail;

		cmd.Parameters["@cue_cinstalador"].Value = (this._cue_cinstalador == null) ? (object) DBNull.Value : (object) this._cue_cinstalador;

		cmd.Parameters["@cue_cIMEI"].Value = (this._cue_cIMEI == null) ? (object) DBNull.Value : (object) this._cue_cIMEI;

		cmd.Parameters["@cue_cLatLng"].Value = (this._cue_cLatLng == null) ? (object) DBNull.Value : (object) this._cue_cLatLng;

		cmd.Parameters["@Situacion"].Value = (this._Situacion == null) ? (object) DBNull.Value : (object) this._Situacion;

		cmd.Parameters["@cue_nEfectiva"].Value = this._cue_nEfectiva;

		cmd.Parameters["@cue_cIdExtendido"].Value = (this._cue_cIdExtendido == null) ? (object) DBNull.Value : (object) this._cue_cIdExtendido;

		cmd.Parameters["@cue_iZonaHoraria"].Value = this._cue_iZonaHoraria;

		cmd.Parameters["@cue_cPartitionInfo"].Value = (this._cue_cPartitionInfo == null) ? (object) DBNull.Value : (object) this._cue_cPartitionInfo;

		cmd.Parameters["@cue_nAutoMonitoreo"].Value = this._cue_nAutoMonitoreo;

		cmd.Parameters["@cue_nPrioridad"].Value = this._cue_nPrioridad;

		cmd.Parameters["@cue_cCustom"].Value = (this._cue_cCustom == null) ? (object) DBNull.Value : (object) this._cue_cCustom;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("CuentaUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cue_clinea", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ncuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_clocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cprovincia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ccodigopostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ccallecorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_clocalidadcorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cprovinciacorreo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ccodigopostalcorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cpermiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ctipo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cubicacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cue_nparticion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cue_cfoto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_dfechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cue_dservicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cue_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nsonidoul", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nllaveul", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cemail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cinstalador", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cIMEI", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cLatLng", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Situacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_nEfectiva", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cIdExtendido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_iZonaHoraria", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cPartitionInfo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_nAutoMonitoreo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nPrioridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cCustom", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cue_clinea"].Value = (this._cue_clinea == null) ? (object) DBNull.Value : (object) this._cue_clinea;

		cmd.Parameters["@cue_ncuenta"].Value = (this._cue_ncuenta == null) ? (object) DBNull.Value : (object) this._cue_ncuenta;

		cmd.Parameters["@cue_cnombre"].Value = (this._cue_cnombre == null) ? (object) DBNull.Value : (object) this._cue_cnombre;

		cmd.Parameters["@cue_ccalle"].Value = (this._cue_ccalle == null) ? (object) DBNull.Value : (object) this._cue_ccalle;

		cmd.Parameters["@cue_clocalidad"].Value = (this._cue_clocalidad == null) ? (object) DBNull.Value : (object) this._cue_clocalidad;

		cmd.Parameters["@cue_cprovincia"].Value = (this._cue_cprovincia == null) ? (object) DBNull.Value : (object) this._cue_cprovincia;

		cmd.Parameters["@cue_ccodigopostal"].Value = (this._cue_ccodigopostal == null) ? (object) DBNull.Value : (object) this._cue_ccodigopostal;

		cmd.Parameters["@cue_ccallecorreo"].Value = (this._cue_ccallecorreo == null) ? (object) DBNull.Value : (object) this._cue_ccallecorreo;

		cmd.Parameters["@cue_clocalidadcorreo"].Value = (this._cue_clocalidadcorreo == null) ? (object) DBNull.Value : (object) this._cue_clocalidadcorreo;

		cmd.Parameters["@cue_cprovinciacorreo"].Value = (this._cue_cprovinciacorreo == null) ? (object) DBNull.Value : (object) this._cue_cprovinciacorreo;

		cmd.Parameters["@cue_ccodigopostalcorreo"].Value = (this._cue_ccodigopostalcorreo == null) ? (object) DBNull.Value : (object) this._cue_ccodigopostalcorreo;

		cmd.Parameters["@cue_ctelefono"].Value = (this._cue_ctelefono == null) ? (object) DBNull.Value : (object) this._cue_ctelefono;

		cmd.Parameters["@cue_cclave"].Value = (this._cue_cclave == null) ? (object) DBNull.Value : (object) this._cue_cclave;

		cmd.Parameters["@cue_cpermiso"].Value = (this._cue_cpermiso == null) ? (object) DBNull.Value : (object) this._cue_cpermiso;

		cmd.Parameters["@cue_ctipo"].Value = (this._cue_ctipo == null) ? (object) DBNull.Value : (object) this._cue_ctipo;

		cmd.Parameters["@cue_cubicacion"].Value = (this._cue_cubicacion == null) ? (object) DBNull.Value : (object) this._cue_cubicacion;

		cmd.Parameters["@cue_nparticion"].Value = this._cue_nparticion;

		cmd.Parameters["@cue_cobservacion"].Value = (this._cue_cobservacion == null) ? (object) DBNull.Value : (object) this._cue_cobservacion;

		cmd.Parameters["@cue_cfoto"].Value = (this._cue_cfoto == null) ? (object) DBNull.Value : (object) this._cue_cfoto;

		cmd.Parameters["@cue_dfechaalta"].Value = (this._cue_dfechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cue_dfechaalta;

		cmd.Parameters["@cue_dservicio"].Value = (this._cue_dservicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cue_dservicio;

		cmd.Parameters["@cue_nmostrar"].Value = this._cue_nmostrar;

		cmd.Parameters["@cue_nsonidoul"].Value = this._cue_nsonidoul;

		cmd.Parameters["@cue_nllaveul"].Value = this._cue_nllaveul;

		cmd.Parameters["@cue_cemail"].Value = (this._cue_cemail == null) ? (object) DBNull.Value : (object) this._cue_cemail;

		cmd.Parameters["@cue_cinstalador"].Value = (this._cue_cinstalador == null) ? (object) DBNull.Value : (object) this._cue_cinstalador;

		cmd.Parameters["@cue_cIMEI"].Value = (this._cue_cIMEI == null) ? (object) DBNull.Value : (object) this._cue_cIMEI;

		cmd.Parameters["@cue_cLatLng"].Value = (this._cue_cLatLng == null) ? (object) DBNull.Value : (object) this._cue_cLatLng;

		cmd.Parameters["@Situacion"].Value = (this._Situacion == null) ? (object) DBNull.Value : (object) this._Situacion;

		cmd.Parameters["@cue_nEfectiva"].Value = this._cue_nEfectiva;

		cmd.Parameters["@cue_cIdExtendido"].Value = (this._cue_cIdExtendido == null) ? (object) DBNull.Value : (object) this._cue_cIdExtendido;

		cmd.Parameters["@cue_iZonaHoraria"].Value = this._cue_iZonaHoraria;

		cmd.Parameters["@cue_cPartitionInfo"].Value = (this._cue_cPartitionInfo == null) ? (object) DBNull.Value : (object) this._cue_cPartitionInfo;

		cmd.Parameters["@cue_nAutoMonitoreo"].Value = this._cue_nAutoMonitoreo;

		cmd.Parameters["@cue_nPrioridad"].Value = this._cue_nPrioridad;

		cmd.Parameters["@cue_cCustom"].Value = (this._cue_cCustom == null) ? (object) DBNull.Value : (object) this._cue_cCustom;

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
    throw new RuntimeException("The Cuenta is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("CuentaDel", conn))
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
    using(var CmdSel = new SqlCommand("CuentaSel", conn))
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
    SimpleCuenta Simple = new SimpleCuenta();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cue_clinea = this._cue_clinea;

      Simple.cue_ncuenta = this._cue_ncuenta;

      Simple.cue_cnombre = this._cue_cnombre;

      Simple.cue_ccalle = this._cue_ccalle;

      Simple.cue_clocalidad = this._cue_clocalidad;

      Simple.cue_cprovincia = this._cue_cprovincia;

      Simple.cue_ccodigopostal = this._cue_ccodigopostal;

      Simple.cue_ccallecorreo = this._cue_ccallecorreo;

      Simple.cue_clocalidadcorreo = this._cue_clocalidadcorreo;

      Simple.cue_cprovinciacorreo = this._cue_cprovinciacorreo;

      Simple.cue_ccodigopostalcorreo = this._cue_ccodigopostalcorreo;

      Simple.cue_ctelefono = this._cue_ctelefono;

      Simple.cue_cclave = this._cue_cclave;

      Simple.cue_cpermiso = this._cue_cpermiso;

      Simple.cue_ctipo = this._cue_ctipo;

      Simple.cue_cubicacion = this._cue_cubicacion;

      Simple.cue_nparticion = this._cue_nparticion;

      Simple.cue_cobservacion = this._cue_cobservacion;

      Simple.cue_cfoto = this._cue_cfoto;

      Simple.cue_dfechaalta = this._cue_dfechaalta;

      Simple.cue_dservicio = this._cue_dservicio;

      Simple.cue_nmostrar = this._cue_nmostrar;

      Simple.cue_nsonidoul = this._cue_nsonidoul;

      Simple.cue_nllaveul = this._cue_nllaveul;

      Simple.cue_cemail = this._cue_cemail;

      Simple.cue_cinstalador = this._cue_cinstalador;

      Simple.cue_cIMEI = this._cue_cIMEI;

      Simple.cue_cLatLng = this._cue_cLatLng;

      Simple.Situacion = this._Situacion;

      Simple.cue_nEfectiva = this._cue_nEfectiva;

      Simple.cue_cIdExtendido = this._cue_cIdExtendido;

      Simple.cue_iZonaHoraria = this._cue_iZonaHoraria;

      Simple.cue_cPartitionInfo = this._cue_cPartitionInfo;

      Simple.cue_nAutoMonitoreo = this._cue_nAutoMonitoreo;

      Simple.cue_nPrioridad = this._cue_nPrioridad;

      Simple.cue_cCustom = this._cue_cCustom;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleCuenta)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cue_clinea = Simple.cue_clinea;

      this._cue_ncuenta = Simple.cue_ncuenta;

      this._cue_cnombre = Simple.cue_cnombre;

      this._cue_ccalle = Simple.cue_ccalle;

      this._cue_clocalidad = Simple.cue_clocalidad;

      this._cue_cprovincia = Simple.cue_cprovincia;

      this._cue_ccodigopostal = Simple.cue_ccodigopostal;

      this._cue_ccallecorreo = Simple.cue_ccallecorreo;

      this._cue_clocalidadcorreo = Simple.cue_clocalidadcorreo;

      this._cue_cprovinciacorreo = Simple.cue_cprovinciacorreo;

      this._cue_ccodigopostalcorreo = Simple.cue_ccodigopostalcorreo;

      this._cue_ctelefono = Simple.cue_ctelefono;

      this._cue_cclave = Simple.cue_cclave;

      this._cue_cpermiso = Simple.cue_cpermiso;

      this._cue_ctipo = Simple.cue_ctipo;

      this._cue_cubicacion = Simple.cue_cubicacion;

      this._cue_nparticion = Simple.cue_nparticion;

      this._cue_cobservacion = Simple.cue_cobservacion;

      this._cue_cfoto = Simple.cue_cfoto;

      this._cue_dfechaalta = Simple.cue_dfechaalta;

      this._cue_dservicio = Simple.cue_dservicio;

      this._cue_nmostrar = Simple.cue_nmostrar;

      this._cue_nsonidoul = Simple.cue_nsonidoul;

      this._cue_nllaveul = Simple.cue_nllaveul;

      this._cue_cemail = Simple.cue_cemail;

      this._cue_cinstalador = Simple.cue_cinstalador;

      this._cue_cIMEI = Simple.cue_cIMEI;

      this._cue_cLatLng = Simple.cue_cLatLng;

      this._Situacion = Simple.Situacion;

      this._cue_nEfectiva = Simple.cue_nEfectiva;

      this._cue_cIdExtendido = Simple.cue_cIdExtendido;

      this._cue_iZonaHoraria = Simple.cue_iZonaHoraria;

      this._cue_cPartitionInfo = Simple.cue_cPartitionInfo;

      this._cue_nAutoMonitoreo = Simple.cue_nAutoMonitoreo;

      this._cue_nPrioridad = Simple.cue_nPrioridad;

      this._cue_cCustom = Simple.cue_cCustom;

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
    CallerCuenta Caller = new CallerCuenta();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cue_clinea = this._cue_clinea;

      Caller.cue_ncuenta = this._cue_ncuenta;

      Caller.cue_cnombre = this._cue_cnombre;

      Caller.cue_ccalle = this._cue_ccalle;

      Caller.cue_clocalidad = this._cue_clocalidad;

      Caller.cue_cprovincia = this._cue_cprovincia;

      Caller.cue_ccodigopostal = this._cue_ccodigopostal;

      Caller.cue_ccallecorreo = this._cue_ccallecorreo;

      Caller.cue_clocalidadcorreo = this._cue_clocalidadcorreo;

      Caller.cue_cprovinciacorreo = this._cue_cprovinciacorreo;

      Caller.cue_ccodigopostalcorreo = this._cue_ccodigopostalcorreo;

      Caller.cue_ctelefono = this._cue_ctelefono;

      Caller.cue_cclave = this._cue_cclave;

      Caller.cue_cpermiso = this._cue_cpermiso;

      Caller.cue_ctipo = this._cue_ctipo;

      Caller.cue_cubicacion = this._cue_cubicacion;

      Caller.cue_nparticion = this._cue_nparticion;

      Caller.cue_cobservacion = this._cue_cobservacion;

      Caller.cue_cfoto = this._cue_cfoto;

      Caller.cue_dfechaalta = this._cue_dfechaalta;

      Caller.cue_dservicio = this._cue_dservicio;

      Caller.cue_nmostrar = this._cue_nmostrar;

      Caller.cue_nsonidoul = this._cue_nsonidoul;

      Caller.cue_nllaveul = this._cue_nllaveul;

      Caller.cue_cemail = this._cue_cemail;

      Caller.cue_cinstalador = this._cue_cinstalador;

      Caller.cue_cIMEI = this._cue_cIMEI;

      Caller.cue_cLatLng = this._cue_cLatLng;

      Caller.Situacion = this._Situacion;

      Caller.cue_nEfectiva = this._cue_nEfectiva;

      Caller.cue_cIdExtendido = this._cue_cIdExtendido;

      Caller.cue_iZonaHoraria = this._cue_iZonaHoraria;

      Caller.cue_cPartitionInfo = this._cue_cPartitionInfo;

      Caller.cue_nAutoMonitoreo = this._cue_nAutoMonitoreo;

      Caller.cue_nPrioridad = this._cue_nPrioridad;

      Caller.cue_cCustom = this._cue_cCustom;

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
    
      dt.Columns.Add(new DataColumn("cue_clinea", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ncuenta", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cnombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ccalle", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_clocalidad", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cprovincia", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ccodigopostal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ccallecorreo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_clocalidadcorreo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cprovinciacorreo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ccodigopostalcorreo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ctelefono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cclave", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cpermiso", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ctipo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cubicacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_nparticion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_cobservacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cfoto", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_dfechaalta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cue_dservicio", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cue_nmostrar", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cue_nsonidoul", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cue_nllaveul", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cue_cemail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cinstalador", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cIMEI", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cLatLng", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Situacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_nEfectiva", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cue_cIdExtendido", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_iZonaHoraria", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_cPartitionInfo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_nAutoMonitoreo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cue_nPrioridad", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cue_cCustom", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cue_clinea"] = this._cue_clinea;

      dr["cue_ncuenta"] = this._cue_ncuenta;

      dr["cue_cnombre"] = this._cue_cnombre;

      dr["cue_ccalle"] = this._cue_ccalle;

      dr["cue_clocalidad"] = this._cue_clocalidad;

      dr["cue_cprovincia"] = this._cue_cprovincia;

      dr["cue_ccodigopostal"] = this._cue_ccodigopostal;

      dr["cue_ccallecorreo"] = this._cue_ccallecorreo;

      dr["cue_clocalidadcorreo"] = this._cue_clocalidadcorreo;

      dr["cue_cprovinciacorreo"] = this._cue_cprovinciacorreo;

      dr["cue_ccodigopostalcorreo"] = this._cue_ccodigopostalcorreo;

      dr["cue_ctelefono"] = this._cue_ctelefono;

      dr["cue_cclave"] = this._cue_cclave;

      dr["cue_cpermiso"] = this._cue_cpermiso;

      dr["cue_ctipo"] = this._cue_ctipo;

      dr["cue_cubicacion"] = this._cue_cubicacion;

      dr["cue_nparticion"] = this._cue_nparticion;

      dr["cue_cobservacion"] = this._cue_cobservacion;

      dr["cue_cfoto"] = this._cue_cfoto;

      dr["cue_dfechaalta"] = this._cue_dfechaalta;

      dr["cue_dservicio"] = this._cue_dservicio;

      dr["cue_nmostrar"] = this._cue_nmostrar;

      dr["cue_nsonidoul"] = this._cue_nsonidoul;

      dr["cue_nllaveul"] = this._cue_nllaveul;

      dr["cue_cemail"] = this._cue_cemail;

      dr["cue_cinstalador"] = this._cue_cinstalador;

      dr["cue_cIMEI"] = this._cue_cIMEI;

      dr["cue_cLatLng"] = this._cue_cLatLng;

      dr["Situacion"] = this._Situacion;

      dr["cue_nEfectiva"] = this._cue_nEfectiva;

      dr["cue_cIdExtendido"] = this._cue_cIdExtendido;

      dr["cue_iZonaHoraria"] = this._cue_iZonaHoraria;

      dr["cue_cPartitionInfo"] = this._cue_cPartitionInfo;

      dr["cue_nAutoMonitoreo"] = this._cue_nAutoMonitoreo;

      dr["cue_nPrioridad"] = this._cue_nPrioridad;

      dr["cue_cCustom"] = this._cue_cCustom;

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
    using(var CmdChilds = new SqlCommand("CuentaByChildObject", conn))
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
    SimpleCuenta Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("CuentaByChildObject", conn))
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
    Simple = new SimpleCuenta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_clinea = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cue_ncuenta = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cue_clocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cue_cprovincia = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cue_ccodigopostal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_ccallecorreo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_clocalidadcorreo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cue_cprovinciacorreo = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cue_ccodigopostalcorreo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cue_ctelefono = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cue_cclave = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_cpermiso = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cue_ctipo = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.cue_cubicacion = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.cue_nparticion = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.cue_cobservacion = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.cue_cfoto = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.cue_dfechaalta = (Reader.IsDBNull(21)) ? new DateTime(1,1,1) : Reader.GetDateTime(21);
if (Reader.FieldCount > 22)Simple.cue_dservicio = (Reader.IsDBNull(22)) ? new DateTime(1,1,1) : Reader.GetDateTime(22);
if (Reader.FieldCount > 23)Simple.cue_nmostrar = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cue_nsonidoul = (Reader.IsDBNull(24)) ? new Decimal(0) : Reader.GetDecimal(24);
if (Reader.FieldCount > 25)Simple.cue_nllaveul = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.cue_cemail = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cue_cinstalador = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cue_cIMEI = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cue_cLatLng = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.Situacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cue_nEfectiva = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cue_cIdExtendido = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.cue_iZonaHoraria = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.cue_cPartitionInfo = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cue_nAutoMonitoreo = (Reader.IsDBNull(35)) ? new Decimal(0) : Reader.GetDecimal(35);
if (Reader.FieldCount > 36)Simple.cue_nPrioridad = (Reader.IsDBNull(36)) ? new Decimal(0) : Reader.GetDecimal(36);
if (Reader.FieldCount > 37)Simple.cue_cCustom = (Reader.IsDBNull(37)) ? "" : Reader.GetString(37);


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
    SimpleCuenta Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleCuenta();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cue_clinea = (Row["cue_clinea"] == DBNull.Value) ? "" : (string) Row["cue_clinea"];

Simple.cue_ncuenta = (Row["cue_ncuenta"] == DBNull.Value) ? "" : (string) Row["cue_ncuenta"];

Simple.cue_cnombre = (Row["cue_cnombre"] == DBNull.Value) ? "" : (string) Row["cue_cnombre"];

Simple.cue_ccalle = (Row["cue_ccalle"] == DBNull.Value) ? "" : (string) Row["cue_ccalle"];

Simple.cue_clocalidad = (Row["cue_clocalidad"] == DBNull.Value) ? "" : (string) Row["cue_clocalidad"];

Simple.cue_cprovincia = (Row["cue_cprovincia"] == DBNull.Value) ? "" : (string) Row["cue_cprovincia"];

Simple.cue_ccodigopostal = (Row["cue_ccodigopostal"] == DBNull.Value) ? "" : (string) Row["cue_ccodigopostal"];

Simple.cue_ccallecorreo = (Row["cue_ccallecorreo"] == DBNull.Value) ? "" : (string) Row["cue_ccallecorreo"];

Simple.cue_clocalidadcorreo = (Row["cue_clocalidadcorreo"] == DBNull.Value) ? "" : (string) Row["cue_clocalidadcorreo"];

Simple.cue_cprovinciacorreo = (Row["cue_cprovinciacorreo"] == DBNull.Value) ? "" : (string) Row["cue_cprovinciacorreo"];

Simple.cue_ccodigopostalcorreo = (Row["cue_ccodigopostalcorreo"] == DBNull.Value) ? "" : (string) Row["cue_ccodigopostalcorreo"];

Simple.cue_ctelefono = (Row["cue_ctelefono"] == DBNull.Value) ? "" : (string) Row["cue_ctelefono"];

Simple.cue_cclave = (Row["cue_cclave"] == DBNull.Value) ? "" : (string) Row["cue_cclave"];

Simple.cue_cpermiso = (Row["cue_cpermiso"] == DBNull.Value) ? "" : (string) Row["cue_cpermiso"];

Simple.cue_ctipo = (Row["cue_ctipo"] == DBNull.Value) ? "" : (string) Row["cue_ctipo"];

Simple.cue_cubicacion = (Row["cue_cubicacion"] == DBNull.Value) ? "" : (string) Row["cue_cubicacion"];

Simple.cue_nparticion = (Row["cue_nparticion"] == DBNull.Value) ? 0 : (int) Row["cue_nparticion"];

Simple.cue_cobservacion = (Row["cue_cobservacion"] == DBNull.Value) ? "" : (string) Row["cue_cobservacion"];

Simple.cue_cfoto = (Row["cue_cfoto"] == DBNull.Value) ? "" : (string) Row["cue_cfoto"];

Simple.cue_dfechaalta = (Row["cue_dfechaalta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cue_dfechaalta"];

Simple.cue_dservicio = (Row["cue_dservicio"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cue_dservicio"];

Simple.cue_nmostrar = (Row["cue_nmostrar"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cue_nmostrar"];

Simple.cue_nsonidoul = (Row["cue_nsonidoul"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cue_nsonidoul"];

Simple.cue_nllaveul = (Row["cue_nllaveul"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cue_nllaveul"];

Simple.cue_cemail = (Row["cue_cemail"] == DBNull.Value) ? "" : (string) Row["cue_cemail"];

Simple.cue_cinstalador = (Row["cue_cinstalador"] == DBNull.Value) ? "" : (string) Row["cue_cinstalador"];

Simple.cue_cIMEI = (Row["cue_cIMEI"] == DBNull.Value) ? "" : (string) Row["cue_cIMEI"];

Simple.cue_cLatLng = (Row["cue_cLatLng"] == DBNull.Value) ? "" : (string) Row["cue_cLatLng"];

Simple.Situacion = (Row["Situacion"] == DBNull.Value) ? "" : (string) Row["Situacion"];

Simple.cue_nEfectiva = (Row["cue_nEfectiva"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cue_nEfectiva"];

Simple.cue_cIdExtendido = (Row["cue_cIdExtendido"] == DBNull.Value) ? "" : (string) Row["cue_cIdExtendido"];

Simple.cue_iZonaHoraria = (Row["cue_iZonaHoraria"] == DBNull.Value) ? 0 : (int) Row["cue_iZonaHoraria"];

Simple.cue_cPartitionInfo = (Row["cue_cPartitionInfo"] == DBNull.Value) ? "" : (string) Row["cue_cPartitionInfo"];

Simple.cue_nAutoMonitoreo = (Row["cue_nAutoMonitoreo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cue_nAutoMonitoreo"];

Simple.cue_nPrioridad = (Row["cue_nPrioridad"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cue_nPrioridad"];

Simple.cue_cCustom = (Row["cue_cCustom"] == DBNull.Value) ? "" : (string) Row["cue_cCustom"];


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
    using(var CmdParents = new SqlCommand("CuentaByParentObject", conn))
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
    SimpleCuenta Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("CuentaByParentObject", conn))
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
    Simple = new SimpleCuenta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_clinea = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cue_ncuenta = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cue_clocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cue_cprovincia = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cue_ccodigopostal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_ccallecorreo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_clocalidadcorreo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cue_cprovinciacorreo = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cue_ccodigopostalcorreo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cue_ctelefono = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cue_cclave = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_cpermiso = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cue_ctipo = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.cue_cubicacion = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.cue_nparticion = (Reader.IsDBNull(18)) ? 0 : Convert.ToInt32(Reader.GetValue(18));
if (Reader.FieldCount > 19)Simple.cue_cobservacion = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.cue_cfoto = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.cue_dfechaalta = (Reader.IsDBNull(21)) ? new DateTime(1,1,1) : Reader.GetDateTime(21);
if (Reader.FieldCount > 22)Simple.cue_dservicio = (Reader.IsDBNull(22)) ? new DateTime(1,1,1) : Reader.GetDateTime(22);
if (Reader.FieldCount > 23)Simple.cue_nmostrar = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cue_nsonidoul = (Reader.IsDBNull(24)) ? new Decimal(0) : Reader.GetDecimal(24);
if (Reader.FieldCount > 25)Simple.cue_nllaveul = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.cue_cemail = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cue_cinstalador = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cue_cIMEI = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cue_cLatLng = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.Situacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cue_nEfectiva = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cue_cIdExtendido = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.cue_iZonaHoraria = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.cue_cPartitionInfo = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cue_nAutoMonitoreo = (Reader.IsDBNull(35)) ? new Decimal(0) : Reader.GetDecimal(35);
if (Reader.FieldCount > 36)Simple.cue_nPrioridad = (Reader.IsDBNull(36)) ? new Decimal(0) : Reader.GetDecimal(36);
if (Reader.FieldCount > 37)Simple.cue_cCustom = (Reader.IsDBNull(37)) ? "" : Reader.GetString(37);


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
    using (var CmdDataByName = new SqlCommand("CuentaByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("CuentaByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("CuentaByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("CuentaByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("CuentaByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleCuenta Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("CuentaBySimpleCuenta", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cue_clinea", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ncuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_clocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cprovincia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ccodigopostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ccallecorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_clocalidadcorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cprovinciacorreo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ccodigopostalcorreo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cpermiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ctipo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cubicacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cue_nparticion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cue_cfoto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_dfechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cue_dservicio", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cue_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nsonidoul", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nllaveul", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cemail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cinstalador", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cIMEI", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cLatLng", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Situacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_nEfectiva", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cIdExtendido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_iZonaHoraria", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cPartitionInfo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_nAutoMonitoreo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_nPrioridad", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cue_cCustom", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cue_clinea"].Value = (this._cue_clinea == null) ? (object) DBNull.Value : (object) this._cue_clinea;

		cmd.Parameters["@cue_ncuenta"].Value = (this._cue_ncuenta == null) ? (object) DBNull.Value : (object) this._cue_ncuenta;

		cmd.Parameters["@cue_cnombre"].Value = (this._cue_cnombre == null) ? (object) DBNull.Value : (object) this._cue_cnombre;

		cmd.Parameters["@cue_ccalle"].Value = (this._cue_ccalle == null) ? (object) DBNull.Value : (object) this._cue_ccalle;

		cmd.Parameters["@cue_clocalidad"].Value = (this._cue_clocalidad == null) ? (object) DBNull.Value : (object) this._cue_clocalidad;

		cmd.Parameters["@cue_cprovincia"].Value = (this._cue_cprovincia == null) ? (object) DBNull.Value : (object) this._cue_cprovincia;

		cmd.Parameters["@cue_ccodigopostal"].Value = (this._cue_ccodigopostal == null) ? (object) DBNull.Value : (object) this._cue_ccodigopostal;

		cmd.Parameters["@cue_ccallecorreo"].Value = (this._cue_ccallecorreo == null) ? (object) DBNull.Value : (object) this._cue_ccallecorreo;

		cmd.Parameters["@cue_clocalidadcorreo"].Value = (this._cue_clocalidadcorreo == null) ? (object) DBNull.Value : (object) this._cue_clocalidadcorreo;

		cmd.Parameters["@cue_cprovinciacorreo"].Value = (this._cue_cprovinciacorreo == null) ? (object) DBNull.Value : (object) this._cue_cprovinciacorreo;

		cmd.Parameters["@cue_ccodigopostalcorreo"].Value = (this._cue_ccodigopostalcorreo == null) ? (object) DBNull.Value : (object) this._cue_ccodigopostalcorreo;

		cmd.Parameters["@cue_ctelefono"].Value = (this._cue_ctelefono == null) ? (object) DBNull.Value : (object) this._cue_ctelefono;

		cmd.Parameters["@cue_cclave"].Value = (this._cue_cclave == null) ? (object) DBNull.Value : (object) this._cue_cclave;

		cmd.Parameters["@cue_cpermiso"].Value = (this._cue_cpermiso == null) ? (object) DBNull.Value : (object) this._cue_cpermiso;

		cmd.Parameters["@cue_ctipo"].Value = (this._cue_ctipo == null) ? (object) DBNull.Value : (object) this._cue_ctipo;

		cmd.Parameters["@cue_cubicacion"].Value = (this._cue_cubicacion == null) ? (object) DBNull.Value : (object) this._cue_cubicacion;

		cmd.Parameters["@cue_nparticion"].Value = this._cue_nparticion;

		cmd.Parameters["@cue_cobservacion"].Value = (this._cue_cobservacion == null) ? (object) DBNull.Value : (object) this._cue_cobservacion;

		cmd.Parameters["@cue_cfoto"].Value = (this._cue_cfoto == null) ? (object) DBNull.Value : (object) this._cue_cfoto;

		cmd.Parameters["@cue_dfechaalta"].Value = (this._cue_dfechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cue_dfechaalta;

		cmd.Parameters["@cue_dservicio"].Value = (this._cue_dservicio == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cue_dservicio;

		cmd.Parameters["@cue_nmostrar"].Value = this._cue_nmostrar;

		cmd.Parameters["@cue_nsonidoul"].Value = this._cue_nsonidoul;

		cmd.Parameters["@cue_nllaveul"].Value = this._cue_nllaveul;

		cmd.Parameters["@cue_cemail"].Value = (this._cue_cemail == null) ? (object) DBNull.Value : (object) this._cue_cemail;

		cmd.Parameters["@cue_cinstalador"].Value = (this._cue_cinstalador == null) ? (object) DBNull.Value : (object) this._cue_cinstalador;

		cmd.Parameters["@cue_cIMEI"].Value = (this._cue_cIMEI == null) ? (object) DBNull.Value : (object) this._cue_cIMEI;

		cmd.Parameters["@cue_cLatLng"].Value = (this._cue_cLatLng == null) ? (object) DBNull.Value : (object) this._cue_cLatLng;

		cmd.Parameters["@Situacion"].Value = (this._Situacion == null) ? (object) DBNull.Value : (object) this._Situacion;

		cmd.Parameters["@cue_nEfectiva"].Value = this._cue_nEfectiva;

		cmd.Parameters["@cue_cIdExtendido"].Value = (this._cue_cIdExtendido == null) ? (object) DBNull.Value : (object) this._cue_cIdExtendido;

		cmd.Parameters["@cue_iZonaHoraria"].Value = this._cue_iZonaHoraria;

		cmd.Parameters["@cue_cPartitionInfo"].Value = (this._cue_cPartitionInfo == null) ? (object) DBNull.Value : (object) this._cue_cPartitionInfo;

		cmd.Parameters["@cue_nAutoMonitoreo"].Value = this._cue_nAutoMonitoreo;

		cmd.Parameters["@cue_nPrioridad"].Value = this._cue_nPrioridad;

		cmd.Parameters["@cue_cCustom"].Value = (this._cue_cCustom == null) ? (object) DBNull.Value : (object) this._cue_cCustom;


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
		 
		public IEnumerable<SimpleCuenta> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("CuentaByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleCuenta Simple = new SimpleCuenta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_clinea = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cue_ncuenta = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cue_clocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cue_cprovincia = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cue_ccodigopostal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_ccallecorreo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_clocalidadcorreo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cue_cprovinciacorreo = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cue_ccodigopostalcorreo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cue_ctelefono = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cue_cclave = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_cpermiso = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cue_ctipo = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.cue_cubicacion = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.cue_nparticion = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.cue_cobservacion = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.cue_cfoto = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.cue_dfechaalta = (Reader.IsDBNull(21)) ? new DateTime(1,1,1) : Reader.GetDateTime(21);
if (Reader.FieldCount > 22)Simple.cue_dservicio = (Reader.IsDBNull(22)) ? new DateTime(1,1,1) : Reader.GetDateTime(22);
if (Reader.FieldCount > 23)Simple.cue_nmostrar = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cue_nsonidoul = (Reader.IsDBNull(24)) ? new Decimal(0) : Reader.GetDecimal(24);
if (Reader.FieldCount > 25)Simple.cue_nllaveul = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.cue_cemail = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cue_cinstalador = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cue_cIMEI = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cue_cLatLng = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.Situacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cue_nEfectiva = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cue_cIdExtendido = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.cue_iZonaHoraria = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.cue_cPartitionInfo = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cue_nAutoMonitoreo = (Reader.IsDBNull(35)) ? new Decimal(0) : Reader.GetDecimal(35);
if (Reader.FieldCount > 36)Simple.cue_nPrioridad = (Reader.IsDBNull(36)) ? new Decimal(0) : Reader.GetDecimal(36);
if (Reader.FieldCount > 37)Simple.cue_cCustom = (Reader.IsDBNull(37)) ? "" : Reader.GetString(37);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleCuenta> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("CuentaByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleCuenta Simple = new SimpleCuenta();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_clinea = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cue_ncuenta = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cue_clocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cue_cprovincia = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cue_ccodigopostal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_ccallecorreo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_clocalidadcorreo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cue_cprovinciacorreo = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cue_ccodigopostalcorreo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cue_ctelefono = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cue_cclave = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_cpermiso = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cue_ctipo = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.cue_cubicacion = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.cue_nparticion = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.cue_cobservacion = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)Simple.cue_cfoto = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)Simple.cue_dfechaalta = (Reader.IsDBNull(21)) ? new DateTime(1,1,1) : Reader.GetDateTime(21);
if (Reader.FieldCount > 22)Simple.cue_dservicio = (Reader.IsDBNull(22)) ? new DateTime(1,1,1) : Reader.GetDateTime(22);
if (Reader.FieldCount > 23)Simple.cue_nmostrar = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)Simple.cue_nsonidoul = (Reader.IsDBNull(24)) ? new Decimal(0) : Reader.GetDecimal(24);
if (Reader.FieldCount > 25)Simple.cue_nllaveul = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)Simple.cue_cemail = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cue_cinstalador = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cue_cIMEI = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cue_cLatLng = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.Situacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cue_nEfectiva = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cue_cIdExtendido = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)Simple.cue_iZonaHoraria = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.cue_cPartitionInfo = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cue_nAutoMonitoreo = (Reader.IsDBNull(35)) ? new Decimal(0) : Reader.GetDecimal(35);
if (Reader.FieldCount > 36)Simple.cue_nPrioridad = (Reader.IsDBNull(36)) ? new Decimal(0) : Reader.GetDecimal(36);
if (Reader.FieldCount > 37)Simple.cue_cCustom = (Reader.IsDBNull(37)) ? "" : Reader.GetString(37);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3001, "Cuenta");
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
    if (Reader.FieldCount > 2)this._cue_clinea = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._cue_ncuenta = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._cue_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._cue_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._cue_clocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._cue_cprovincia = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._cue_ccodigopostal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._cue_ccallecorreo = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._cue_clocalidadcorreo = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._cue_cprovinciacorreo = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._cue_ccodigopostalcorreo = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._cue_ctelefono = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._cue_cclave = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._cue_cpermiso = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._cue_ctipo = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._cue_cubicacion = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)this._cue_nparticion = (Reader.IsDBNull(18)) ? 0 : Convert.ToInt32(Reader.GetValue(18));
                if (Reader.FieldCount > 19)this._cue_cobservacion = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);
if (Reader.FieldCount > 20)this._cue_cfoto = (Reader.IsDBNull(20)) ? "" : Reader.GetString(20);
if (Reader.FieldCount > 21)this._cue_dfechaalta = (Reader.IsDBNull(21)) ? new DateTime(1,1,1) : Reader.GetDateTime(21);
if (Reader.FieldCount > 22)this._cue_dservicio = (Reader.IsDBNull(22)) ? new DateTime(1,1,1) : Reader.GetDateTime(22);
if (Reader.FieldCount > 23)this._cue_nmostrar = (Reader.IsDBNull(23)) ? new Decimal(0) : Reader.GetDecimal(23);
if (Reader.FieldCount > 24)this._cue_nsonidoul = (Reader.IsDBNull(24)) ? new Decimal(0) : Reader.GetDecimal(24);
if (Reader.FieldCount > 25)this._cue_nllaveul = (Reader.IsDBNull(25)) ? new Decimal(0) : Reader.GetDecimal(25);
if (Reader.FieldCount > 26)this._cue_cemail = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)this._cue_cinstalador = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)this._cue_cIMEI = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)this._cue_cLatLng = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)this._Situacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)this._cue_nEfectiva = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)this._cue_cIdExtendido = (Reader.IsDBNull(32)) ? "" : Reader.GetString(32);
if (Reader.FieldCount > 33)this._cue_iZonaHoraria = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)this._cue_cPartitionInfo = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)this._cue_nAutoMonitoreo = (Reader.IsDBNull(35)) ? new Decimal(0) : Reader.GetDecimal(35);
if (Reader.FieldCount > 36)this._cue_nPrioridad = (Reader.IsDBNull(36)) ? new Decimal(0) : Reader.GetDecimal(36);
if (Reader.FieldCount > 37)this._cue_cCustom = (Reader.IsDBNull(37)) ? "" : Reader.GetString(37);

    }
    Reader.Close();
    }
   }
  
    }
  