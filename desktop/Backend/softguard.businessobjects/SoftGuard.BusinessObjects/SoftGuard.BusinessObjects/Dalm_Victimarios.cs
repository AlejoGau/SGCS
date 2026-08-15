
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
     ///m_Victimarios data access layer   
     ///</summary>
    public class Dalm_Victimarios : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _vic_cApellido;
    
      private string _vic_cNombre;
    
      private string _vic_cIdentificacion;
    
      private int _vic_iRestriccion;
    
      private string _vic_cCalle;
    
      private string _vic_cCalleNro;
    
      private string _vic_cCallePiso;
    
      private string _vic_cCalleDpto;
    
      private string _vic_cCodigoPostal;
    
      private string _vic_cPartido;
    
      private string _vic_cLocalidad;
    
      private string _vic_cUbicacion;
    
      private string _vic_cPathPicture;
    
      private int _vic_iStatus;
    
      private DateTime? _vic_tFechaAlta;
    
      private int _vic_iEdad;
    
      private int _vic_iAltura;
    
      private int _vic_iAspectoRaza;
    
      private int _vic_iAspectoTez;
    
      private int _vic_iAspectoContextura;
    
      private int _vic_iCabelloTipo;
    
      private int _vic_iCabelloColor;
    
      private int _vic_iCabelloEstilo;
    
      private int _vic_iRostroForma;
    
      private int _vic_iOjosForma;
    
      private int _vic_iOjosColor;
    
      private int _vic_iNarizFrente;
    
      private int _vic_iNarizPerfil;
    
      private int _vic_iNarizSize;
    
      private int _vic_iBocaLabios;
    
      private int _vic_iBocaSize;
    
      private int _vic_iMentonForma;
    
      private int _vic_iOrejasForma;
    
      private int _vic_iOrejasSize;
    
      private int _vic_iCejasForma;
    
      private int _vic_iCejasSize;
    
      private int _vic_iPilosidadTipo;
    
      private int _vic_iPilosidadForma;
    
      private string _vic_cObservaciones;
    
      private string _vic_cCaractSocial;
    
      private string _vic_cAdicciones;
    
      private int _vic_iPeso;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///vic_cApellido   
     ///</summary>
      public string vic_cApellido
      {
      
          get{ return this._vic_cApellido; }
          set{ this._vic_cApellido = value; }
        
      }
     ///<summary>
     ///vic_cNombre   
     ///</summary>
      public string vic_cNombre
      {
      
          get{ return this._vic_cNombre; }
          set{ this._vic_cNombre = value; }
        
      }
     ///<summary>
     ///vic_cIdentificacion   
     ///</summary>
      public string vic_cIdentificacion
      {
      
          get{ return this._vic_cIdentificacion; }
          set{ this._vic_cIdentificacion = value; }
        
      }
     ///<summary>
     ///vic_iRestriccion   
     ///</summary>
      public int vic_iRestriccion
      {
      
          get{ return this._vic_iRestriccion; }
          set{ this._vic_iRestriccion = value; }
        
      }
     ///<summary>
     ///vic_cCalle   
     ///</summary>
      public string vic_cCalle
      {
      
          get{ return this._vic_cCalle; }
          set{ this._vic_cCalle = value; }
        
      }
     ///<summary>
     ///vic_cCalleNro   
     ///</summary>
      public string vic_cCalleNro
      {
      
          get{ return this._vic_cCalleNro; }
          set{ this._vic_cCalleNro = value; }
        
      }
     ///<summary>
     ///vic_cCallePiso   
     ///</summary>
      public string vic_cCallePiso
      {
      
          get{ return this._vic_cCallePiso; }
          set{ this._vic_cCallePiso = value; }
        
      }
     ///<summary>
     ///vic_cCalleDpto   
     ///</summary>
      public string vic_cCalleDpto
      {
      
          get{ return this._vic_cCalleDpto; }
          set{ this._vic_cCalleDpto = value; }
        
      }
     ///<summary>
     ///vic_cCodigoPostal   
     ///</summary>
      public string vic_cCodigoPostal
      {
      
          get{ return this._vic_cCodigoPostal; }
          set{ this._vic_cCodigoPostal = value; }
        
      }
     ///<summary>
     ///vic_cPartido   
     ///</summary>
      public string vic_cPartido
      {
      
          get{ return this._vic_cPartido; }
          set{ this._vic_cPartido = value; }
        
      }
     ///<summary>
     ///vic_cLocalidad   
     ///</summary>
      public string vic_cLocalidad
      {
      
          get{ return this._vic_cLocalidad; }
          set{ this._vic_cLocalidad = value; }
        
      }
     ///<summary>
     ///vic_cUbicacion   
     ///</summary>
      public string vic_cUbicacion
      {
      
          get{ return this._vic_cUbicacion; }
          set{ this._vic_cUbicacion = value; }
        
      }
     ///<summary>
     ///vic_cPathPicture   
     ///</summary>
      public string vic_cPathPicture
      {
      
          get{ return this._vic_cPathPicture; }
          set{ this._vic_cPathPicture = value; }
        
      }
     ///<summary>
     ///vic_iStatus   
     ///</summary>
      public int vic_iStatus
      {
      
          get{ return this._vic_iStatus; }
          set{ this._vic_iStatus = value; }
        
      }
     ///<summary>
     ///vic_tFechaAlta   
     ///</summary>
      public DateTime? vic_tFechaAlta
      {
      
          get{ return this._vic_tFechaAlta; }
          set{ this._vic_tFechaAlta = value; }
        
      }
     ///<summary>
     ///vic_iEdad   
     ///</summary>
      public int vic_iEdad
      {
      
          get{ return this._vic_iEdad; }
          set{ this._vic_iEdad = value; }
        
      }
     ///<summary>
     ///vic_iAltura   
     ///</summary>
      public int vic_iAltura
      {
      
          get{ return this._vic_iAltura; }
          set{ this._vic_iAltura = value; }
        
      }
     ///<summary>
     ///vic_iAspectoRaza   
     ///</summary>
      public int vic_iAspectoRaza
      {
      
          get{ return this._vic_iAspectoRaza; }
          set{ this._vic_iAspectoRaza = value; }
        
      }
     ///<summary>
     ///vic_iAspectoTez   
     ///</summary>
      public int vic_iAspectoTez
      {
      
          get{ return this._vic_iAspectoTez; }
          set{ this._vic_iAspectoTez = value; }
        
      }
     ///<summary>
     ///vic_iAspectoContextura   
     ///</summary>
      public int vic_iAspectoContextura
      {
      
          get{ return this._vic_iAspectoContextura; }
          set{ this._vic_iAspectoContextura = value; }
        
      }
     ///<summary>
     ///vic_iCabelloTipo   
     ///</summary>
      public int vic_iCabelloTipo
      {
      
          get{ return this._vic_iCabelloTipo; }
          set{ this._vic_iCabelloTipo = value; }
        
      }
     ///<summary>
     ///vic_iCabelloColor   
     ///</summary>
      public int vic_iCabelloColor
      {
      
          get{ return this._vic_iCabelloColor; }
          set{ this._vic_iCabelloColor = value; }
        
      }
     ///<summary>
     ///vic_iCabelloEstilo   
     ///</summary>
      public int vic_iCabelloEstilo
      {
      
          get{ return this._vic_iCabelloEstilo; }
          set{ this._vic_iCabelloEstilo = value; }
        
      }
     ///<summary>
     ///vic_iRostroForma   
     ///</summary>
      public int vic_iRostroForma
      {
      
          get{ return this._vic_iRostroForma; }
          set{ this._vic_iRostroForma = value; }
        
      }
     ///<summary>
     ///vic_iOjosForma   
     ///</summary>
      public int vic_iOjosForma
      {
      
          get{ return this._vic_iOjosForma; }
          set{ this._vic_iOjosForma = value; }
        
      }
     ///<summary>
     ///vic_iOjosColor   
     ///</summary>
      public int vic_iOjosColor
      {
      
          get{ return this._vic_iOjosColor; }
          set{ this._vic_iOjosColor = value; }
        
      }
     ///<summary>
     ///vic_iNarizFrente   
     ///</summary>
      public int vic_iNarizFrente
      {
      
          get{ return this._vic_iNarizFrente; }
          set{ this._vic_iNarizFrente = value; }
        
      }
     ///<summary>
     ///vic_iNarizPerfil   
     ///</summary>
      public int vic_iNarizPerfil
      {
      
          get{ return this._vic_iNarizPerfil; }
          set{ this._vic_iNarizPerfil = value; }
        
      }
     ///<summary>
     ///vic_iNarizSize   
     ///</summary>
      public int vic_iNarizSize
      {
      
          get{ return this._vic_iNarizSize; }
          set{ this._vic_iNarizSize = value; }
        
      }
     ///<summary>
     ///vic_iBocaLabios   
     ///</summary>
      public int vic_iBocaLabios
      {
      
          get{ return this._vic_iBocaLabios; }
          set{ this._vic_iBocaLabios = value; }
        
      }
     ///<summary>
     ///vic_iBocaSize   
     ///</summary>
      public int vic_iBocaSize
      {
      
          get{ return this._vic_iBocaSize; }
          set{ this._vic_iBocaSize = value; }
        
      }
     ///<summary>
     ///vic_iMentonForma   
     ///</summary>
      public int vic_iMentonForma
      {
      
          get{ return this._vic_iMentonForma; }
          set{ this._vic_iMentonForma = value; }
        
      }
     ///<summary>
     ///vic_iOrejasForma   
     ///</summary>
      public int vic_iOrejasForma
      {
      
          get{ return this._vic_iOrejasForma; }
          set{ this._vic_iOrejasForma = value; }
        
      }
     ///<summary>
     ///vic_iOrejasSize   
     ///</summary>
      public int vic_iOrejasSize
      {
      
          get{ return this._vic_iOrejasSize; }
          set{ this._vic_iOrejasSize = value; }
        
      }
     ///<summary>
     ///vic_iCejasForma   
     ///</summary>
      public int vic_iCejasForma
      {
      
          get{ return this._vic_iCejasForma; }
          set{ this._vic_iCejasForma = value; }
        
      }
     ///<summary>
     ///vic_iCejasSize   
     ///</summary>
      public int vic_iCejasSize
      {
      
          get{ return this._vic_iCejasSize; }
          set{ this._vic_iCejasSize = value; }
        
      }
     ///<summary>
     ///vic_iPilosidadTipo   
     ///</summary>
      public int vic_iPilosidadTipo
      {
      
          get{ return this._vic_iPilosidadTipo; }
          set{ this._vic_iPilosidadTipo = value; }
        
      }
     ///<summary>
     ///vic_iPilosidadForma   
     ///</summary>
      public int vic_iPilosidadForma
      {
      
          get{ return this._vic_iPilosidadForma; }
          set{ this._vic_iPilosidadForma = value; }
        
      }
     ///<summary>
     ///vic_cObservaciones   
     ///</summary>
      public string vic_cObservaciones
      {
      
          get{ return this._vic_cObservaciones; }
          set{ this._vic_cObservaciones = value; }
        
      }
     ///<summary>
     ///vic_cCaractSocial   
     ///</summary>
      public string vic_cCaractSocial
      {
      
          get{ return this._vic_cCaractSocial; }
          set{ this._vic_cCaractSocial = value; }
        
      }
     ///<summary>
     ///vic_cAdicciones   
     ///</summary>
      public string vic_cAdicciones
      {
      
          get{ return this._vic_cAdicciones; }
          set{ this._vic_cAdicciones = value; }
        
      }
     ///<summary>
     ///vic_iPeso   
     ///</summary>
      public int vic_iPeso
      {
      
          get{ return this._vic_iPeso; }
          set{ this._vic_iPeso = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_Victimarios(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_Victimarios(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_Victimarios(SqlHelper SqlConfig, int UserId, Simplem_Victimarios Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._vic_cApellido = Simple.vic_cApellido;

      this._vic_cNombre = Simple.vic_cNombre;

      this._vic_cIdentificacion = Simple.vic_cIdentificacion;

      this._vic_iRestriccion = Simple.vic_iRestriccion;

      this._vic_cCalle = Simple.vic_cCalle;

      this._vic_cCalleNro = Simple.vic_cCalleNro;

      this._vic_cCallePiso = Simple.vic_cCallePiso;

      this._vic_cCalleDpto = Simple.vic_cCalleDpto;

      this._vic_cCodigoPostal = Simple.vic_cCodigoPostal;

      this._vic_cPartido = Simple.vic_cPartido;

      this._vic_cLocalidad = Simple.vic_cLocalidad;

      this._vic_cUbicacion = Simple.vic_cUbicacion;

      this._vic_cPathPicture = Simple.vic_cPathPicture;

      this._vic_iStatus = Simple.vic_iStatus;

      this._vic_tFechaAlta = Simple.vic_tFechaAlta;

      this._vic_iEdad = Simple.vic_iEdad;

      this._vic_iAltura = Simple.vic_iAltura;

      this._vic_iAspectoRaza = Simple.vic_iAspectoRaza;

      this._vic_iAspectoTez = Simple.vic_iAspectoTez;

      this._vic_iAspectoContextura = Simple.vic_iAspectoContextura;

      this._vic_iCabelloTipo = Simple.vic_iCabelloTipo;

      this._vic_iCabelloColor = Simple.vic_iCabelloColor;

      this._vic_iCabelloEstilo = Simple.vic_iCabelloEstilo;

      this._vic_iRostroForma = Simple.vic_iRostroForma;

      this._vic_iOjosForma = Simple.vic_iOjosForma;

      this._vic_iOjosColor = Simple.vic_iOjosColor;

      this._vic_iNarizFrente = Simple.vic_iNarizFrente;

      this._vic_iNarizPerfil = Simple.vic_iNarizPerfil;

      this._vic_iNarizSize = Simple.vic_iNarizSize;

      this._vic_iBocaLabios = Simple.vic_iBocaLabios;

      this._vic_iBocaSize = Simple.vic_iBocaSize;

      this._vic_iMentonForma = Simple.vic_iMentonForma;

      this._vic_iOrejasForma = Simple.vic_iOrejasForma;

      this._vic_iOrejasSize = Simple.vic_iOrejasSize;

      this._vic_iCejasForma = Simple.vic_iCejasForma;

      this._vic_iCejasSize = Simple.vic_iCejasSize;

      this._vic_iPilosidadTipo = Simple.vic_iPilosidadTipo;

      this._vic_iPilosidadForma = Simple.vic_iPilosidadForma;

      this._vic_cObservaciones = Simple.vic_cObservaciones;

      this._vic_cCaractSocial = Simple.vic_cCaractSocial;

      this._vic_cAdicciones = Simple.vic_cAdicciones;

      this._vic_iPeso = Simple.vic_iPeso;

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
    using(var cmd = new SqlCommand("m_VictimariosIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@vic_cApellido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iRestriccion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_cCalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCalleNro", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCallePiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCalleDpto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCodigoPostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cPartido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cLocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cUbicacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cPathPicture", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_tFechaAlta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@vic_iEdad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAltura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoRaza", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoTez", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoContextura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloColor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloEstilo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iRostroForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOjosForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOjosColor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizFrente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizPerfil", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iBocaLabios", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iBocaSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iMentonForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOrejasForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOrejasSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCejasForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCejasSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iPilosidadTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iPilosidadForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCaractSocial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cAdicciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iPeso", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@vic_cApellido"].Value = (this._vic_cApellido == null) ? (object) DBNull.Value : (object) this._vic_cApellido;

		cmd.Parameters["@vic_cNombre"].Value = (this._vic_cNombre == null) ? (object) DBNull.Value : (object) this._vic_cNombre;

		cmd.Parameters["@vic_cIdentificacion"].Value = (this._vic_cIdentificacion == null) ? (object) DBNull.Value : (object) this._vic_cIdentificacion;

		cmd.Parameters["@vic_iRestriccion"].Value = this._vic_iRestriccion;

		cmd.Parameters["@vic_cCalle"].Value = (this._vic_cCalle == null) ? (object) DBNull.Value : (object) this._vic_cCalle;

		cmd.Parameters["@vic_cCalleNro"].Value = (this._vic_cCalleNro == null) ? (object) DBNull.Value : (object) this._vic_cCalleNro;

		cmd.Parameters["@vic_cCallePiso"].Value = (this._vic_cCallePiso == null) ? (object) DBNull.Value : (object) this._vic_cCallePiso;

		cmd.Parameters["@vic_cCalleDpto"].Value = (this._vic_cCalleDpto == null) ? (object) DBNull.Value : (object) this._vic_cCalleDpto;

		cmd.Parameters["@vic_cCodigoPostal"].Value = (this._vic_cCodigoPostal == null) ? (object) DBNull.Value : (object) this._vic_cCodigoPostal;

		cmd.Parameters["@vic_cPartido"].Value = (this._vic_cPartido == null) ? (object) DBNull.Value : (object) this._vic_cPartido;

		cmd.Parameters["@vic_cLocalidad"].Value = (this._vic_cLocalidad == null) ? (object) DBNull.Value : (object) this._vic_cLocalidad;

		cmd.Parameters["@vic_cUbicacion"].Value = (this._vic_cUbicacion == null) ? (object) DBNull.Value : (object) this._vic_cUbicacion;

		cmd.Parameters["@vic_cPathPicture"].Value = (this._vic_cPathPicture == null) ? (object) DBNull.Value : (object) this._vic_cPathPicture;

		cmd.Parameters["@vic_iStatus"].Value = this._vic_iStatus;

		cmd.Parameters["@vic_tFechaAlta"].Value = (this._vic_tFechaAlta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._vic_tFechaAlta;

		cmd.Parameters["@vic_iEdad"].Value = this._vic_iEdad;

		cmd.Parameters["@vic_iAltura"].Value = this._vic_iAltura;

		cmd.Parameters["@vic_iAspectoRaza"].Value = this._vic_iAspectoRaza;

		cmd.Parameters["@vic_iAspectoTez"].Value = this._vic_iAspectoTez;

		cmd.Parameters["@vic_iAspectoContextura"].Value = this._vic_iAspectoContextura;

		cmd.Parameters["@vic_iCabelloTipo"].Value = this._vic_iCabelloTipo;

		cmd.Parameters["@vic_iCabelloColor"].Value = this._vic_iCabelloColor;

		cmd.Parameters["@vic_iCabelloEstilo"].Value = this._vic_iCabelloEstilo;

		cmd.Parameters["@vic_iRostroForma"].Value = this._vic_iRostroForma;

		cmd.Parameters["@vic_iOjosForma"].Value = this._vic_iOjosForma;

		cmd.Parameters["@vic_iOjosColor"].Value = this._vic_iOjosColor;

		cmd.Parameters["@vic_iNarizFrente"].Value = this._vic_iNarizFrente;

		cmd.Parameters["@vic_iNarizPerfil"].Value = this._vic_iNarizPerfil;

		cmd.Parameters["@vic_iNarizSize"].Value = this._vic_iNarizSize;

		cmd.Parameters["@vic_iBocaLabios"].Value = this._vic_iBocaLabios;

		cmd.Parameters["@vic_iBocaSize"].Value = this._vic_iBocaSize;

		cmd.Parameters["@vic_iMentonForma"].Value = this._vic_iMentonForma;

		cmd.Parameters["@vic_iOrejasForma"].Value = this._vic_iOrejasForma;

		cmd.Parameters["@vic_iOrejasSize"].Value = this._vic_iOrejasSize;

		cmd.Parameters["@vic_iCejasForma"].Value = this._vic_iCejasForma;

		cmd.Parameters["@vic_iCejasSize"].Value = this._vic_iCejasSize;

		cmd.Parameters["@vic_iPilosidadTipo"].Value = this._vic_iPilosidadTipo;

		cmd.Parameters["@vic_iPilosidadForma"].Value = this._vic_iPilosidadForma;

		cmd.Parameters["@vic_cObservaciones"].Value = (this._vic_cObservaciones == null) ? (object) DBNull.Value : (object) this._vic_cObservaciones;

		cmd.Parameters["@vic_cCaractSocial"].Value = (this._vic_cCaractSocial == null) ? (object) DBNull.Value : (object) this._vic_cCaractSocial;

		cmd.Parameters["@vic_cAdicciones"].Value = (this._vic_cAdicciones == null) ? (object) DBNull.Value : (object) this._vic_cAdicciones;

		cmd.Parameters["@vic_iPeso"].Value = this._vic_iPeso;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_VictimariosUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@vic_cApellido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iRestriccion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_cCalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCalleNro", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCallePiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCalleDpto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCodigoPostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cPartido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cLocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cUbicacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cPathPicture", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_tFechaAlta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@vic_iEdad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAltura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoRaza", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoTez", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoContextura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloColor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloEstilo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iRostroForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOjosForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOjosColor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizFrente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizPerfil", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iBocaLabios", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iBocaSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iMentonForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOrejasForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOrejasSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCejasForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCejasSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iPilosidadTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iPilosidadForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCaractSocial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cAdicciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iPeso", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@vic_cApellido"].Value = (this._vic_cApellido == null) ? (object) DBNull.Value : (object) this._vic_cApellido;

		cmd.Parameters["@vic_cNombre"].Value = (this._vic_cNombre == null) ? (object) DBNull.Value : (object) this._vic_cNombre;

		cmd.Parameters["@vic_cIdentificacion"].Value = (this._vic_cIdentificacion == null) ? (object) DBNull.Value : (object) this._vic_cIdentificacion;

		cmd.Parameters["@vic_iRestriccion"].Value = this._vic_iRestriccion;

		cmd.Parameters["@vic_cCalle"].Value = (this._vic_cCalle == null) ? (object) DBNull.Value : (object) this._vic_cCalle;

		cmd.Parameters["@vic_cCalleNro"].Value = (this._vic_cCalleNro == null) ? (object) DBNull.Value : (object) this._vic_cCalleNro;

		cmd.Parameters["@vic_cCallePiso"].Value = (this._vic_cCallePiso == null) ? (object) DBNull.Value : (object) this._vic_cCallePiso;

		cmd.Parameters["@vic_cCalleDpto"].Value = (this._vic_cCalleDpto == null) ? (object) DBNull.Value : (object) this._vic_cCalleDpto;

		cmd.Parameters["@vic_cCodigoPostal"].Value = (this._vic_cCodigoPostal == null) ? (object) DBNull.Value : (object) this._vic_cCodigoPostal;

		cmd.Parameters["@vic_cPartido"].Value = (this._vic_cPartido == null) ? (object) DBNull.Value : (object) this._vic_cPartido;

		cmd.Parameters["@vic_cLocalidad"].Value = (this._vic_cLocalidad == null) ? (object) DBNull.Value : (object) this._vic_cLocalidad;

		cmd.Parameters["@vic_cUbicacion"].Value = (this._vic_cUbicacion == null) ? (object) DBNull.Value : (object) this._vic_cUbicacion;

		cmd.Parameters["@vic_cPathPicture"].Value = (this._vic_cPathPicture == null) ? (object) DBNull.Value : (object) this._vic_cPathPicture;

		cmd.Parameters["@vic_iStatus"].Value = this._vic_iStatus;

		cmd.Parameters["@vic_tFechaAlta"].Value = (this._vic_tFechaAlta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._vic_tFechaAlta;

		cmd.Parameters["@vic_iEdad"].Value = this._vic_iEdad;

		cmd.Parameters["@vic_iAltura"].Value = this._vic_iAltura;

		cmd.Parameters["@vic_iAspectoRaza"].Value = this._vic_iAspectoRaza;

		cmd.Parameters["@vic_iAspectoTez"].Value = this._vic_iAspectoTez;

		cmd.Parameters["@vic_iAspectoContextura"].Value = this._vic_iAspectoContextura;

		cmd.Parameters["@vic_iCabelloTipo"].Value = this._vic_iCabelloTipo;

		cmd.Parameters["@vic_iCabelloColor"].Value = this._vic_iCabelloColor;

		cmd.Parameters["@vic_iCabelloEstilo"].Value = this._vic_iCabelloEstilo;

		cmd.Parameters["@vic_iRostroForma"].Value = this._vic_iRostroForma;

		cmd.Parameters["@vic_iOjosForma"].Value = this._vic_iOjosForma;

		cmd.Parameters["@vic_iOjosColor"].Value = this._vic_iOjosColor;

		cmd.Parameters["@vic_iNarizFrente"].Value = this._vic_iNarizFrente;

		cmd.Parameters["@vic_iNarizPerfil"].Value = this._vic_iNarizPerfil;

		cmd.Parameters["@vic_iNarizSize"].Value = this._vic_iNarizSize;

		cmd.Parameters["@vic_iBocaLabios"].Value = this._vic_iBocaLabios;

		cmd.Parameters["@vic_iBocaSize"].Value = this._vic_iBocaSize;

		cmd.Parameters["@vic_iMentonForma"].Value = this._vic_iMentonForma;

		cmd.Parameters["@vic_iOrejasForma"].Value = this._vic_iOrejasForma;

		cmd.Parameters["@vic_iOrejasSize"].Value = this._vic_iOrejasSize;

		cmd.Parameters["@vic_iCejasForma"].Value = this._vic_iCejasForma;

		cmd.Parameters["@vic_iCejasSize"].Value = this._vic_iCejasSize;

		cmd.Parameters["@vic_iPilosidadTipo"].Value = this._vic_iPilosidadTipo;

		cmd.Parameters["@vic_iPilosidadForma"].Value = this._vic_iPilosidadForma;

		cmd.Parameters["@vic_cObservaciones"].Value = (this._vic_cObservaciones == null) ? (object) DBNull.Value : (object) this._vic_cObservaciones;

		cmd.Parameters["@vic_cCaractSocial"].Value = (this._vic_cCaractSocial == null) ? (object) DBNull.Value : (object) this._vic_cCaractSocial;

		cmd.Parameters["@vic_cAdicciones"].Value = (this._vic_cAdicciones == null) ? (object) DBNull.Value : (object) this._vic_cAdicciones;

		cmd.Parameters["@vic_iPeso"].Value = this._vic_iPeso;

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
    throw new RuntimeException("The m_Victimarios is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_VictimariosDel", conn))
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
    using(var CmdSel = new SqlCommand("m_VictimariosSel", conn))
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
    Simplem_Victimarios Simple = new Simplem_Victimarios();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.vic_cApellido = this._vic_cApellido;

      Simple.vic_cNombre = this._vic_cNombre;

      Simple.vic_cIdentificacion = this._vic_cIdentificacion;

      Simple.vic_iRestriccion = this._vic_iRestriccion;

      Simple.vic_cCalle = this._vic_cCalle;

      Simple.vic_cCalleNro = this._vic_cCalleNro;

      Simple.vic_cCallePiso = this._vic_cCallePiso;

      Simple.vic_cCalleDpto = this._vic_cCalleDpto;

      Simple.vic_cCodigoPostal = this._vic_cCodigoPostal;

      Simple.vic_cPartido = this._vic_cPartido;

      Simple.vic_cLocalidad = this._vic_cLocalidad;

      Simple.vic_cUbicacion = this._vic_cUbicacion;

      Simple.vic_cPathPicture = this._vic_cPathPicture;

      Simple.vic_iStatus = this._vic_iStatus;

      Simple.vic_tFechaAlta = this._vic_tFechaAlta;

      Simple.vic_iEdad = this._vic_iEdad;

      Simple.vic_iAltura = this._vic_iAltura;

      Simple.vic_iAspectoRaza = this._vic_iAspectoRaza;

      Simple.vic_iAspectoTez = this._vic_iAspectoTez;

      Simple.vic_iAspectoContextura = this._vic_iAspectoContextura;

      Simple.vic_iCabelloTipo = this._vic_iCabelloTipo;

      Simple.vic_iCabelloColor = this._vic_iCabelloColor;

      Simple.vic_iCabelloEstilo = this._vic_iCabelloEstilo;

      Simple.vic_iRostroForma = this._vic_iRostroForma;

      Simple.vic_iOjosForma = this._vic_iOjosForma;

      Simple.vic_iOjosColor = this._vic_iOjosColor;

      Simple.vic_iNarizFrente = this._vic_iNarizFrente;

      Simple.vic_iNarizPerfil = this._vic_iNarizPerfil;

      Simple.vic_iNarizSize = this._vic_iNarizSize;

      Simple.vic_iBocaLabios = this._vic_iBocaLabios;

      Simple.vic_iBocaSize = this._vic_iBocaSize;

      Simple.vic_iMentonForma = this._vic_iMentonForma;

      Simple.vic_iOrejasForma = this._vic_iOrejasForma;

      Simple.vic_iOrejasSize = this._vic_iOrejasSize;

      Simple.vic_iCejasForma = this._vic_iCejasForma;

      Simple.vic_iCejasSize = this._vic_iCejasSize;

      Simple.vic_iPilosidadTipo = this._vic_iPilosidadTipo;

      Simple.vic_iPilosidadForma = this._vic_iPilosidadForma;

      Simple.vic_cObservaciones = this._vic_cObservaciones;

      Simple.vic_cCaractSocial = this._vic_cCaractSocial;

      Simple.vic_cAdicciones = this._vic_cAdicciones;

      Simple.vic_iPeso = this._vic_iPeso;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_Victimarios)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._vic_cApellido = Simple.vic_cApellido;

      this._vic_cNombre = Simple.vic_cNombre;

      this._vic_cIdentificacion = Simple.vic_cIdentificacion;

      this._vic_iRestriccion = Simple.vic_iRestriccion;

      this._vic_cCalle = Simple.vic_cCalle;

      this._vic_cCalleNro = Simple.vic_cCalleNro;

      this._vic_cCallePiso = Simple.vic_cCallePiso;

      this._vic_cCalleDpto = Simple.vic_cCalleDpto;

      this._vic_cCodigoPostal = Simple.vic_cCodigoPostal;

      this._vic_cPartido = Simple.vic_cPartido;

      this._vic_cLocalidad = Simple.vic_cLocalidad;

      this._vic_cUbicacion = Simple.vic_cUbicacion;

      this._vic_cPathPicture = Simple.vic_cPathPicture;

      this._vic_iStatus = Simple.vic_iStatus;

      this._vic_tFechaAlta = Simple.vic_tFechaAlta;

      this._vic_iEdad = Simple.vic_iEdad;

      this._vic_iAltura = Simple.vic_iAltura;

      this._vic_iAspectoRaza = Simple.vic_iAspectoRaza;

      this._vic_iAspectoTez = Simple.vic_iAspectoTez;

      this._vic_iAspectoContextura = Simple.vic_iAspectoContextura;

      this._vic_iCabelloTipo = Simple.vic_iCabelloTipo;

      this._vic_iCabelloColor = Simple.vic_iCabelloColor;

      this._vic_iCabelloEstilo = Simple.vic_iCabelloEstilo;

      this._vic_iRostroForma = Simple.vic_iRostroForma;

      this._vic_iOjosForma = Simple.vic_iOjosForma;

      this._vic_iOjosColor = Simple.vic_iOjosColor;

      this._vic_iNarizFrente = Simple.vic_iNarizFrente;

      this._vic_iNarizPerfil = Simple.vic_iNarizPerfil;

      this._vic_iNarizSize = Simple.vic_iNarizSize;

      this._vic_iBocaLabios = Simple.vic_iBocaLabios;

      this._vic_iBocaSize = Simple.vic_iBocaSize;

      this._vic_iMentonForma = Simple.vic_iMentonForma;

      this._vic_iOrejasForma = Simple.vic_iOrejasForma;

      this._vic_iOrejasSize = Simple.vic_iOrejasSize;

      this._vic_iCejasForma = Simple.vic_iCejasForma;

      this._vic_iCejasSize = Simple.vic_iCejasSize;

      this._vic_iPilosidadTipo = Simple.vic_iPilosidadTipo;

      this._vic_iPilosidadForma = Simple.vic_iPilosidadForma;

      this._vic_cObservaciones = Simple.vic_cObservaciones;

      this._vic_cCaractSocial = Simple.vic_cCaractSocial;

      this._vic_cAdicciones = Simple.vic_cAdicciones;

      this._vic_iPeso = Simple.vic_iPeso;

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
    Callerm_Victimarios Caller = new Callerm_Victimarios();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.vic_cApellido = this._vic_cApellido;

      Caller.vic_cNombre = this._vic_cNombre;

      Caller.vic_cIdentificacion = this._vic_cIdentificacion;

      Caller.vic_iRestriccion = this._vic_iRestriccion;

      Caller.vic_cCalle = this._vic_cCalle;

      Caller.vic_cCalleNro = this._vic_cCalleNro;

      Caller.vic_cCallePiso = this._vic_cCallePiso;

      Caller.vic_cCalleDpto = this._vic_cCalleDpto;

      Caller.vic_cCodigoPostal = this._vic_cCodigoPostal;

      Caller.vic_cPartido = this._vic_cPartido;

      Caller.vic_cLocalidad = this._vic_cLocalidad;

      Caller.vic_cUbicacion = this._vic_cUbicacion;

      Caller.vic_cPathPicture = this._vic_cPathPicture;

      Caller.vic_iStatus = this._vic_iStatus;

      Caller.vic_tFechaAlta = this._vic_tFechaAlta;

      Caller.vic_iEdad = this._vic_iEdad;

      Caller.vic_iAltura = this._vic_iAltura;

      Caller.vic_iAspectoRaza = this._vic_iAspectoRaza;

      Caller.vic_iAspectoTez = this._vic_iAspectoTez;

      Caller.vic_iAspectoContextura = this._vic_iAspectoContextura;

      Caller.vic_iCabelloTipo = this._vic_iCabelloTipo;

      Caller.vic_iCabelloColor = this._vic_iCabelloColor;

      Caller.vic_iCabelloEstilo = this._vic_iCabelloEstilo;

      Caller.vic_iRostroForma = this._vic_iRostroForma;

      Caller.vic_iOjosForma = this._vic_iOjosForma;

      Caller.vic_iOjosColor = this._vic_iOjosColor;

      Caller.vic_iNarizFrente = this._vic_iNarizFrente;

      Caller.vic_iNarizPerfil = this._vic_iNarizPerfil;

      Caller.vic_iNarizSize = this._vic_iNarizSize;

      Caller.vic_iBocaLabios = this._vic_iBocaLabios;

      Caller.vic_iBocaSize = this._vic_iBocaSize;

      Caller.vic_iMentonForma = this._vic_iMentonForma;

      Caller.vic_iOrejasForma = this._vic_iOrejasForma;

      Caller.vic_iOrejasSize = this._vic_iOrejasSize;

      Caller.vic_iCejasForma = this._vic_iCejasForma;

      Caller.vic_iCejasSize = this._vic_iCejasSize;

      Caller.vic_iPilosidadTipo = this._vic_iPilosidadTipo;

      Caller.vic_iPilosidadForma = this._vic_iPilosidadForma;

      Caller.vic_cObservaciones = this._vic_cObservaciones;

      Caller.vic_cCaractSocial = this._vic_cCaractSocial;

      Caller.vic_cAdicciones = this._vic_cAdicciones;

      Caller.vic_iPeso = this._vic_iPeso;

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
    
      dt.Columns.Add(new DataColumn("vic_cApellido", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cNombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cIdentificacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_iRestriccion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_cCalle", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cCalleNro", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cCallePiso", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cCalleDpto", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cCodigoPostal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cPartido", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cLocalidad", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cUbicacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cPathPicture", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_iStatus", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_tFechaAlta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("vic_iEdad", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iAltura", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iAspectoRaza", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iAspectoTez", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iAspectoContextura", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iCabelloTipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iCabelloColor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iCabelloEstilo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iRostroForma", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iOjosForma", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iOjosColor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iNarizFrente", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iNarizPerfil", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iNarizSize", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iBocaLabios", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iBocaSize", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iMentonForma", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iOrejasForma", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iOrejasSize", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iCejasForma", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iCejasSize", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iPilosidadTipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_iPilosidadForma", typeof (int)));
    
      dt.Columns.Add(new DataColumn("vic_cObservaciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cCaractSocial", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_cAdicciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("vic_iPeso", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["vic_cApellido"] = this._vic_cApellido;

      dr["vic_cNombre"] = this._vic_cNombre;

      dr["vic_cIdentificacion"] = this._vic_cIdentificacion;

      dr["vic_iRestriccion"] = this._vic_iRestriccion;

      dr["vic_cCalle"] = this._vic_cCalle;

      dr["vic_cCalleNro"] = this._vic_cCalleNro;

      dr["vic_cCallePiso"] = this._vic_cCallePiso;

      dr["vic_cCalleDpto"] = this._vic_cCalleDpto;

      dr["vic_cCodigoPostal"] = this._vic_cCodigoPostal;

      dr["vic_cPartido"] = this._vic_cPartido;

      dr["vic_cLocalidad"] = this._vic_cLocalidad;

      dr["vic_cUbicacion"] = this._vic_cUbicacion;

      dr["vic_cPathPicture"] = this._vic_cPathPicture;

      dr["vic_iStatus"] = this._vic_iStatus;

      dr["vic_tFechaAlta"] = (object)this._vic_tFechaAlta  ?? DBNull.Value;

      dr["vic_iEdad"] = this._vic_iEdad;

      dr["vic_iAltura"] = this._vic_iAltura;

      dr["vic_iAspectoRaza"] = this._vic_iAspectoRaza;

      dr["vic_iAspectoTez"] = this._vic_iAspectoTez;

      dr["vic_iAspectoContextura"] = this._vic_iAspectoContextura;

      dr["vic_iCabelloTipo"] = this._vic_iCabelloTipo;

      dr["vic_iCabelloColor"] = this._vic_iCabelloColor;

      dr["vic_iCabelloEstilo"] = this._vic_iCabelloEstilo;

      dr["vic_iRostroForma"] = this._vic_iRostroForma;

      dr["vic_iOjosForma"] = this._vic_iOjosForma;

      dr["vic_iOjosColor"] = this._vic_iOjosColor;

      dr["vic_iNarizFrente"] = this._vic_iNarizFrente;

      dr["vic_iNarizPerfil"] = this._vic_iNarizPerfil;

      dr["vic_iNarizSize"] = this._vic_iNarizSize;

      dr["vic_iBocaLabios"] = this._vic_iBocaLabios;

      dr["vic_iBocaSize"] = this._vic_iBocaSize;

      dr["vic_iMentonForma"] = this._vic_iMentonForma;

      dr["vic_iOrejasForma"] = this._vic_iOrejasForma;

      dr["vic_iOrejasSize"] = this._vic_iOrejasSize;

      dr["vic_iCejasForma"] = this._vic_iCejasForma;

      dr["vic_iCejasSize"] = this._vic_iCejasSize;

      dr["vic_iPilosidadTipo"] = this._vic_iPilosidadTipo;

      dr["vic_iPilosidadForma"] = this._vic_iPilosidadForma;

      dr["vic_cObservaciones"] = this._vic_cObservaciones;

      dr["vic_cCaractSocial"] = this._vic_cCaractSocial;

      dr["vic_cAdicciones"] = this._vic_cAdicciones;

      dr["vic_iPeso"] = this._vic_iPeso;

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
    using(var CmdChilds = new SqlCommand("m_VictimariosByChildObject", conn))
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
    Simplem_Victimarios Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_VictimariosByChildObject", conn))
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
    Simple = new Simplem_Victimarios();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.vic_cApellido = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.vic_cNombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.vic_cIdentificacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.vic_iRestriccion = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.vic_cCalle = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.vic_cCalleNro = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.vic_cCallePiso = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.vic_cCalleDpto = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.vic_cCodigoPostal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.vic_cPartido = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.vic_cLocalidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.vic_cUbicacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.vic_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.vic_iStatus = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.vic_tFechaAlta = (Reader.IsDBNull(16)) ? new DateTime(1,1,1) : Reader.GetDateTime(16);
if (Reader.FieldCount > 17)Simple.vic_iEdad = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.vic_iAltura = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.vic_iAspectoRaza = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.vic_iAspectoTez = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.vic_iAspectoContextura = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.vic_iCabelloTipo = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.vic_iCabelloColor = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.vic_iCabelloEstilo = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.vic_iRostroForma = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.vic_iOjosForma = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.vic_iOjosColor = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);
if (Reader.FieldCount > 28)Simple.vic_iNarizFrente = (Reader.IsDBNull(28)) ? 0 : Reader.GetInt32(28);
if (Reader.FieldCount > 29)Simple.vic_iNarizPerfil = (Reader.IsDBNull(29)) ? 0 : Reader.GetInt32(29);
if (Reader.FieldCount > 30)Simple.vic_iNarizSize = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.vic_iBocaLabios = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.vic_iBocaSize = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.vic_iMentonForma = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.vic_iOrejasForma = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.vic_iOrejasSize = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);
if (Reader.FieldCount > 36)Simple.vic_iCejasForma = (Reader.IsDBNull(36)) ? 0 : Reader.GetInt32(36);
if (Reader.FieldCount > 37)Simple.vic_iCejasSize = (Reader.IsDBNull(37)) ? 0 : Reader.GetInt32(37);
if (Reader.FieldCount > 38)Simple.vic_iPilosidadTipo = (Reader.IsDBNull(38)) ? 0 : Reader.GetInt32(38);
if (Reader.FieldCount > 39)Simple.vic_iPilosidadForma = (Reader.IsDBNull(39)) ? 0 : Reader.GetInt32(39);
if (Reader.FieldCount > 40)Simple.vic_cObservaciones = (Reader.IsDBNull(40)) ? "" : Reader.GetString(40);
if (Reader.FieldCount > 41)Simple.vic_cCaractSocial = (Reader.IsDBNull(41)) ? "" : Reader.GetString(41);
if (Reader.FieldCount > 42)Simple.vic_cAdicciones = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.vic_iPeso = (Reader.IsDBNull(43)) ? 0 : Reader.GetInt32(43);


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
    Simplem_Victimarios Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_Victimarios();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.vic_cApellido = (Row["vic_cApellido"] == DBNull.Value) ? "" : (string) Row["vic_cApellido"];

Simple.vic_cNombre = (Row["vic_cNombre"] == DBNull.Value) ? "" : (string) Row["vic_cNombre"];

Simple.vic_cIdentificacion = (Row["vic_cIdentificacion"] == DBNull.Value) ? "" : (string) Row["vic_cIdentificacion"];

Simple.vic_iRestriccion = (Row["vic_iRestriccion"] == DBNull.Value) ? 0 : (int) Row["vic_iRestriccion"];

Simple.vic_cCalle = (Row["vic_cCalle"] == DBNull.Value) ? "" : (string) Row["vic_cCalle"];

Simple.vic_cCalleNro = (Row["vic_cCalleNro"] == DBNull.Value) ? "" : (string) Row["vic_cCalleNro"];

Simple.vic_cCallePiso = (Row["vic_cCallePiso"] == DBNull.Value) ? "" : (string) Row["vic_cCallePiso"];

Simple.vic_cCalleDpto = (Row["vic_cCalleDpto"] == DBNull.Value) ? "" : (string) Row["vic_cCalleDpto"];

Simple.vic_cCodigoPostal = (Row["vic_cCodigoPostal"] == DBNull.Value) ? "" : (string) Row["vic_cCodigoPostal"];

Simple.vic_cPartido = (Row["vic_cPartido"] == DBNull.Value) ? "" : (string) Row["vic_cPartido"];

Simple.vic_cLocalidad = (Row["vic_cLocalidad"] == DBNull.Value) ? "" : (string) Row["vic_cLocalidad"];

Simple.vic_cUbicacion = (Row["vic_cUbicacion"] == DBNull.Value) ? "" : (string) Row["vic_cUbicacion"];

Simple.vic_cPathPicture = (Row["vic_cPathPicture"] == DBNull.Value) ? "" : (string) Row["vic_cPathPicture"];

Simple.vic_iStatus = (Row["vic_iStatus"] == DBNull.Value) ? 0 : (int) Row["vic_iStatus"];

Simple.vic_tFechaAlta = (Row["vic_tFechaAlta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["vic_tFechaAlta"];

Simple.vic_iEdad = (Row["vic_iEdad"] == DBNull.Value) ? 0 : (int) Row["vic_iEdad"];

Simple.vic_iAltura = (Row["vic_iAltura"] == DBNull.Value) ? 0 : (int) Row["vic_iAltura"];

Simple.vic_iAspectoRaza = (Row["vic_iAspectoRaza"] == DBNull.Value) ? 0 : (int) Row["vic_iAspectoRaza"];

Simple.vic_iAspectoTez = (Row["vic_iAspectoTez"] == DBNull.Value) ? 0 : (int) Row["vic_iAspectoTez"];

Simple.vic_iAspectoContextura = (Row["vic_iAspectoContextura"] == DBNull.Value) ? 0 : (int) Row["vic_iAspectoContextura"];

Simple.vic_iCabelloTipo = (Row["vic_iCabelloTipo"] == DBNull.Value) ? 0 : (int) Row["vic_iCabelloTipo"];

Simple.vic_iCabelloColor = (Row["vic_iCabelloColor"] == DBNull.Value) ? 0 : (int) Row["vic_iCabelloColor"];

Simple.vic_iCabelloEstilo = (Row["vic_iCabelloEstilo"] == DBNull.Value) ? 0 : (int) Row["vic_iCabelloEstilo"];

Simple.vic_iRostroForma = (Row["vic_iRostroForma"] == DBNull.Value) ? 0 : (int) Row["vic_iRostroForma"];

Simple.vic_iOjosForma = (Row["vic_iOjosForma"] == DBNull.Value) ? 0 : (int) Row["vic_iOjosForma"];

Simple.vic_iOjosColor = (Row["vic_iOjosColor"] == DBNull.Value) ? 0 : (int) Row["vic_iOjosColor"];

Simple.vic_iNarizFrente = (Row["vic_iNarizFrente"] == DBNull.Value) ? 0 : (int) Row["vic_iNarizFrente"];

Simple.vic_iNarizPerfil = (Row["vic_iNarizPerfil"] == DBNull.Value) ? 0 : (int) Row["vic_iNarizPerfil"];

Simple.vic_iNarizSize = (Row["vic_iNarizSize"] == DBNull.Value) ? 0 : (int) Row["vic_iNarizSize"];

Simple.vic_iBocaLabios = (Row["vic_iBocaLabios"] == DBNull.Value) ? 0 : (int) Row["vic_iBocaLabios"];

Simple.vic_iBocaSize = (Row["vic_iBocaSize"] == DBNull.Value) ? 0 : (int) Row["vic_iBocaSize"];

Simple.vic_iMentonForma = (Row["vic_iMentonForma"] == DBNull.Value) ? 0 : (int) Row["vic_iMentonForma"];

Simple.vic_iOrejasForma = (Row["vic_iOrejasForma"] == DBNull.Value) ? 0 : (int) Row["vic_iOrejasForma"];

Simple.vic_iOrejasSize = (Row["vic_iOrejasSize"] == DBNull.Value) ? 0 : (int) Row["vic_iOrejasSize"];

Simple.vic_iCejasForma = (Row["vic_iCejasForma"] == DBNull.Value) ? 0 : (int) Row["vic_iCejasForma"];

Simple.vic_iCejasSize = (Row["vic_iCejasSize"] == DBNull.Value) ? 0 : (int) Row["vic_iCejasSize"];

Simple.vic_iPilosidadTipo = (Row["vic_iPilosidadTipo"] == DBNull.Value) ? 0 : (int) Row["vic_iPilosidadTipo"];

Simple.vic_iPilosidadForma = (Row["vic_iPilosidadForma"] == DBNull.Value) ? 0 : (int) Row["vic_iPilosidadForma"];

Simple.vic_cObservaciones = (Row["vic_cObservaciones"] == DBNull.Value) ? "" : (string) Row["vic_cObservaciones"];

Simple.vic_cCaractSocial = (Row["vic_cCaractSocial"] == DBNull.Value) ? "" : (string) Row["vic_cCaractSocial"];

Simple.vic_cAdicciones = (Row["vic_cAdicciones"] == DBNull.Value) ? "" : (string) Row["vic_cAdicciones"];

Simple.vic_iPeso = (Row["vic_iPeso"] == DBNull.Value) ? 0 : (int) Row["vic_iPeso"];


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
    using(var CmdParents = new SqlCommand("m_VictimariosByParentObject", conn))
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
    Simplem_Victimarios Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_VictimariosByParentObject", conn))
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
    Simple = new Simplem_Victimarios();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.vic_cApellido = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.vic_cNombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.vic_cIdentificacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.vic_iRestriccion = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.vic_cCalle = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.vic_cCalleNro = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.vic_cCallePiso = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.vic_cCalleDpto = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.vic_cCodigoPostal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.vic_cPartido = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.vic_cLocalidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.vic_cUbicacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.vic_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.vic_iStatus = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.vic_tFechaAlta = (Reader.IsDBNull(16)) ? new DateTime(1,1,1) : Reader.GetDateTime(16);
if (Reader.FieldCount > 17)Simple.vic_iEdad = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.vic_iAltura = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.vic_iAspectoRaza = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.vic_iAspectoTez = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.vic_iAspectoContextura = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.vic_iCabelloTipo = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.vic_iCabelloColor = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.vic_iCabelloEstilo = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.vic_iRostroForma = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.vic_iOjosForma = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.vic_iOjosColor = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);
if (Reader.FieldCount > 28)Simple.vic_iNarizFrente = (Reader.IsDBNull(28)) ? 0 : Reader.GetInt32(28);
if (Reader.FieldCount > 29)Simple.vic_iNarizPerfil = (Reader.IsDBNull(29)) ? 0 : Reader.GetInt32(29);
if (Reader.FieldCount > 30)Simple.vic_iNarizSize = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.vic_iBocaLabios = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.vic_iBocaSize = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.vic_iMentonForma = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.vic_iOrejasForma = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.vic_iOrejasSize = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);
if (Reader.FieldCount > 36)Simple.vic_iCejasForma = (Reader.IsDBNull(36)) ? 0 : Reader.GetInt32(36);
if (Reader.FieldCount > 37)Simple.vic_iCejasSize = (Reader.IsDBNull(37)) ? 0 : Reader.GetInt32(37);
if (Reader.FieldCount > 38)Simple.vic_iPilosidadTipo = (Reader.IsDBNull(38)) ? 0 : Reader.GetInt32(38);
if (Reader.FieldCount > 39)Simple.vic_iPilosidadForma = (Reader.IsDBNull(39)) ? 0 : Reader.GetInt32(39);
if (Reader.FieldCount > 40)Simple.vic_cObservaciones = (Reader.IsDBNull(40)) ? "" : Reader.GetString(40);
if (Reader.FieldCount > 41)Simple.vic_cCaractSocial = (Reader.IsDBNull(41)) ? "" : Reader.GetString(41);
if (Reader.FieldCount > 42)Simple.vic_cAdicciones = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.vic_iPeso = (Reader.IsDBNull(43)) ? 0 : Reader.GetInt32(43);


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
    using (var CmdDataByName = new SqlCommand("m_VictimariosByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_VictimariosByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_VictimariosByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_VictimariosByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_VictimariosByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_Victimarios Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_VictimariosBySimplem_Victimarios", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@vic_cApellido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iRestriccion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_cCalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCalleNro", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCallePiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCalleDpto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCodigoPostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cPartido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cLocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cUbicacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cPathPicture", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_tFechaAlta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@vic_iEdad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAltura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoRaza", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoTez", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iAspectoContextura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloColor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCabelloEstilo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iRostroForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOjosForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOjosColor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizFrente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizPerfil", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iNarizSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iBocaLabios", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iBocaSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iMentonForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOrejasForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iOrejasSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCejasForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iCejasSize", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iPilosidadTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_iPilosidadForma", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@vic_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cCaractSocial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_cAdicciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@vic_iPeso", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@vic_cApellido"].Value = (this._vic_cApellido == null) ? (object) DBNull.Value : (object) this._vic_cApellido;

		cmd.Parameters["@vic_cNombre"].Value = (this._vic_cNombre == null) ? (object) DBNull.Value : (object) this._vic_cNombre;

		cmd.Parameters["@vic_cIdentificacion"].Value = (this._vic_cIdentificacion == null) ? (object) DBNull.Value : (object) this._vic_cIdentificacion;

		cmd.Parameters["@vic_iRestriccion"].Value = this._vic_iRestriccion;

		cmd.Parameters["@vic_cCalle"].Value = (this._vic_cCalle == null) ? (object) DBNull.Value : (object) this._vic_cCalle;

		cmd.Parameters["@vic_cCalleNro"].Value = (this._vic_cCalleNro == null) ? (object) DBNull.Value : (object) this._vic_cCalleNro;

		cmd.Parameters["@vic_cCallePiso"].Value = (this._vic_cCallePiso == null) ? (object) DBNull.Value : (object) this._vic_cCallePiso;

		cmd.Parameters["@vic_cCalleDpto"].Value = (this._vic_cCalleDpto == null) ? (object) DBNull.Value : (object) this._vic_cCalleDpto;

		cmd.Parameters["@vic_cCodigoPostal"].Value = (this._vic_cCodigoPostal == null) ? (object) DBNull.Value : (object) this._vic_cCodigoPostal;

		cmd.Parameters["@vic_cPartido"].Value = (this._vic_cPartido == null) ? (object) DBNull.Value : (object) this._vic_cPartido;

		cmd.Parameters["@vic_cLocalidad"].Value = (this._vic_cLocalidad == null) ? (object) DBNull.Value : (object) this._vic_cLocalidad;

		cmd.Parameters["@vic_cUbicacion"].Value = (this._vic_cUbicacion == null) ? (object) DBNull.Value : (object) this._vic_cUbicacion;

		cmd.Parameters["@vic_cPathPicture"].Value = (this._vic_cPathPicture == null) ? (object) DBNull.Value : (object) this._vic_cPathPicture;

		cmd.Parameters["@vic_iStatus"].Value = this._vic_iStatus;

		cmd.Parameters["@vic_tFechaAlta"].Value = (this._vic_tFechaAlta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._vic_tFechaAlta;

		cmd.Parameters["@vic_iEdad"].Value = this._vic_iEdad;

		cmd.Parameters["@vic_iAltura"].Value = this._vic_iAltura;

		cmd.Parameters["@vic_iAspectoRaza"].Value = this._vic_iAspectoRaza;

		cmd.Parameters["@vic_iAspectoTez"].Value = this._vic_iAspectoTez;

		cmd.Parameters["@vic_iAspectoContextura"].Value = this._vic_iAspectoContextura;

		cmd.Parameters["@vic_iCabelloTipo"].Value = this._vic_iCabelloTipo;

		cmd.Parameters["@vic_iCabelloColor"].Value = this._vic_iCabelloColor;

		cmd.Parameters["@vic_iCabelloEstilo"].Value = this._vic_iCabelloEstilo;

		cmd.Parameters["@vic_iRostroForma"].Value = this._vic_iRostroForma;

		cmd.Parameters["@vic_iOjosForma"].Value = this._vic_iOjosForma;

		cmd.Parameters["@vic_iOjosColor"].Value = this._vic_iOjosColor;

		cmd.Parameters["@vic_iNarizFrente"].Value = this._vic_iNarizFrente;

		cmd.Parameters["@vic_iNarizPerfil"].Value = this._vic_iNarizPerfil;

		cmd.Parameters["@vic_iNarizSize"].Value = this._vic_iNarizSize;

		cmd.Parameters["@vic_iBocaLabios"].Value = this._vic_iBocaLabios;

		cmd.Parameters["@vic_iBocaSize"].Value = this._vic_iBocaSize;

		cmd.Parameters["@vic_iMentonForma"].Value = this._vic_iMentonForma;

		cmd.Parameters["@vic_iOrejasForma"].Value = this._vic_iOrejasForma;

		cmd.Parameters["@vic_iOrejasSize"].Value = this._vic_iOrejasSize;

		cmd.Parameters["@vic_iCejasForma"].Value = this._vic_iCejasForma;

		cmd.Parameters["@vic_iCejasSize"].Value = this._vic_iCejasSize;

		cmd.Parameters["@vic_iPilosidadTipo"].Value = this._vic_iPilosidadTipo;

		cmd.Parameters["@vic_iPilosidadForma"].Value = this._vic_iPilosidadForma;

		cmd.Parameters["@vic_cObservaciones"].Value = (this._vic_cObservaciones == null) ? (object) DBNull.Value : (object) this._vic_cObservaciones;

		cmd.Parameters["@vic_cCaractSocial"].Value = (this._vic_cCaractSocial == null) ? (object) DBNull.Value : (object) this._vic_cCaractSocial;

		cmd.Parameters["@vic_cAdicciones"].Value = (this._vic_cAdicciones == null) ? (object) DBNull.Value : (object) this._vic_cAdicciones;

		cmd.Parameters["@vic_iPeso"].Value = this._vic_iPeso;


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
		 
		public IEnumerable<Simplem_Victimarios> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_VictimariosByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_Victimarios Simple = new Simplem_Victimarios();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.vic_cApellido = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.vic_cNombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.vic_cIdentificacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.vic_iRestriccion = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.vic_cCalle = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.vic_cCalleNro = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.vic_cCallePiso = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.vic_cCalleDpto = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.vic_cCodigoPostal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.vic_cPartido = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.vic_cLocalidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.vic_cUbicacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.vic_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.vic_iStatus = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.vic_tFechaAlta = (Reader.IsDBNull(16)) ? new DateTime(1,1,1) : Reader.GetDateTime(16);
if (Reader.FieldCount > 17)Simple.vic_iEdad = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.vic_iAltura = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.vic_iAspectoRaza = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.vic_iAspectoTez = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.vic_iAspectoContextura = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.vic_iCabelloTipo = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.vic_iCabelloColor = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.vic_iCabelloEstilo = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.vic_iRostroForma = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.vic_iOjosForma = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.vic_iOjosColor = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);
if (Reader.FieldCount > 28)Simple.vic_iNarizFrente = (Reader.IsDBNull(28)) ? 0 : Reader.GetInt32(28);
if (Reader.FieldCount > 29)Simple.vic_iNarizPerfil = (Reader.IsDBNull(29)) ? 0 : Reader.GetInt32(29);
if (Reader.FieldCount > 30)Simple.vic_iNarizSize = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.vic_iBocaLabios = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.vic_iBocaSize = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.vic_iMentonForma = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.vic_iOrejasForma = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.vic_iOrejasSize = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);
if (Reader.FieldCount > 36)Simple.vic_iCejasForma = (Reader.IsDBNull(36)) ? 0 : Reader.GetInt32(36);
if (Reader.FieldCount > 37)Simple.vic_iCejasSize = (Reader.IsDBNull(37)) ? 0 : Reader.GetInt32(37);
if (Reader.FieldCount > 38)Simple.vic_iPilosidadTipo = (Reader.IsDBNull(38)) ? 0 : Reader.GetInt32(38);
if (Reader.FieldCount > 39)Simple.vic_iPilosidadForma = (Reader.IsDBNull(39)) ? 0 : Reader.GetInt32(39);
if (Reader.FieldCount > 40)Simple.vic_cObservaciones = (Reader.IsDBNull(40)) ? "" : Reader.GetString(40);
if (Reader.FieldCount > 41)Simple.vic_cCaractSocial = (Reader.IsDBNull(41)) ? "" : Reader.GetString(41);
if (Reader.FieldCount > 42)Simple.vic_cAdicciones = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.vic_iPeso = (Reader.IsDBNull(43)) ? 0 : Reader.GetInt32(43);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_Victimarios> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_VictimariosByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_Victimarios Simple = new Simplem_Victimarios();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.vic_cApellido = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.vic_cNombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.vic_cIdentificacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.vic_iRestriccion = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.vic_cCalle = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.vic_cCalleNro = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.vic_cCallePiso = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.vic_cCalleDpto = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.vic_cCodigoPostal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.vic_cPartido = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.vic_cLocalidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.vic_cUbicacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.vic_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.vic_iStatus = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.vic_tFechaAlta = (Reader.IsDBNull(16)) ? new DateTime(1,1,1) : Reader.GetDateTime(16);
if (Reader.FieldCount > 17)Simple.vic_iEdad = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.vic_iAltura = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.vic_iAspectoRaza = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.vic_iAspectoTez = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.vic_iAspectoContextura = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)Simple.vic_iCabelloTipo = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.vic_iCabelloColor = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.vic_iCabelloEstilo = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.vic_iRostroForma = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.vic_iOjosForma = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.vic_iOjosColor = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);
if (Reader.FieldCount > 28)Simple.vic_iNarizFrente = (Reader.IsDBNull(28)) ? 0 : Reader.GetInt32(28);
if (Reader.FieldCount > 29)Simple.vic_iNarizPerfil = (Reader.IsDBNull(29)) ? 0 : Reader.GetInt32(29);
if (Reader.FieldCount > 30)Simple.vic_iNarizSize = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)Simple.vic_iBocaLabios = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)Simple.vic_iBocaSize = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.vic_iMentonForma = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)Simple.vic_iOrejasForma = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)Simple.vic_iOrejasSize = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);
if (Reader.FieldCount > 36)Simple.vic_iCejasForma = (Reader.IsDBNull(36)) ? 0 : Reader.GetInt32(36);
if (Reader.FieldCount > 37)Simple.vic_iCejasSize = (Reader.IsDBNull(37)) ? 0 : Reader.GetInt32(37);
if (Reader.FieldCount > 38)Simple.vic_iPilosidadTipo = (Reader.IsDBNull(38)) ? 0 : Reader.GetInt32(38);
if (Reader.FieldCount > 39)Simple.vic_iPilosidadForma = (Reader.IsDBNull(39)) ? 0 : Reader.GetInt32(39);
if (Reader.FieldCount > 40)Simple.vic_cObservaciones = (Reader.IsDBNull(40)) ? "" : Reader.GetString(40);
if (Reader.FieldCount > 41)Simple.vic_cCaractSocial = (Reader.IsDBNull(41)) ? "" : Reader.GetString(41);
if (Reader.FieldCount > 42)Simple.vic_cAdicciones = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)Simple.vic_iPeso = (Reader.IsDBNull(43)) ? 0 : Reader.GetInt32(43);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3238, "m_Victimarios");
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
    if (Reader.FieldCount > 2)this._vic_cApellido = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._vic_cNombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._vic_cIdentificacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._vic_iRestriccion = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._vic_cCalle = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._vic_cCalleNro = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._vic_cCallePiso = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._vic_cCalleDpto = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._vic_cCodigoPostal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._vic_cPartido = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._vic_cLocalidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._vic_cUbicacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._vic_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._vic_iStatus = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)this._vic_tFechaAlta = (Reader.IsDBNull(16)) ? new DateTime(1,1,1) : Reader.GetDateTime(16);
if (Reader.FieldCount > 17)this._vic_iEdad = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)this._vic_iAltura = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)this._vic_iAspectoRaza = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)this._vic_iAspectoTez = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)this._vic_iAspectoContextura = (Reader.IsDBNull(21)) ? 0 : Reader.GetInt32(21);
if (Reader.FieldCount > 22)this._vic_iCabelloTipo = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)this._vic_iCabelloColor = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)this._vic_iCabelloEstilo = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)this._vic_iRostroForma = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)this._vic_iOjosForma = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)this._vic_iOjosColor = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);
if (Reader.FieldCount > 28)this._vic_iNarizFrente = (Reader.IsDBNull(28)) ? 0 : Reader.GetInt32(28);
if (Reader.FieldCount > 29)this._vic_iNarizPerfil = (Reader.IsDBNull(29)) ? 0 : Reader.GetInt32(29);
if (Reader.FieldCount > 30)this._vic_iNarizSize = (Reader.IsDBNull(30)) ? 0 : Reader.GetInt32(30);
if (Reader.FieldCount > 31)this._vic_iBocaLabios = (Reader.IsDBNull(31)) ? 0 : Reader.GetInt32(31);
if (Reader.FieldCount > 32)this._vic_iBocaSize = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)this._vic_iMentonForma = (Reader.IsDBNull(33)) ? 0 : Reader.GetInt32(33);
if (Reader.FieldCount > 34)this._vic_iOrejasForma = (Reader.IsDBNull(34)) ? 0 : Reader.GetInt32(34);
if (Reader.FieldCount > 35)this._vic_iOrejasSize = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);
if (Reader.FieldCount > 36)this._vic_iCejasForma = (Reader.IsDBNull(36)) ? 0 : Reader.GetInt32(36);
if (Reader.FieldCount > 37)this._vic_iCejasSize = (Reader.IsDBNull(37)) ? 0 : Reader.GetInt32(37);
if (Reader.FieldCount > 38)this._vic_iPilosidadTipo = (Reader.IsDBNull(38)) ? 0 : Reader.GetInt32(38);
if (Reader.FieldCount > 39)this._vic_iPilosidadForma = (Reader.IsDBNull(39)) ? 0 : Reader.GetInt32(39);
if (Reader.FieldCount > 40)this._vic_cObservaciones = (Reader.IsDBNull(40)) ? "" : Reader.GetString(40);
if (Reader.FieldCount > 41)this._vic_cCaractSocial = (Reader.IsDBNull(41)) ? "" : Reader.GetString(41);
if (Reader.FieldCount > 42)this._vic_cAdicciones = (Reader.IsDBNull(42)) ? "" : Reader.GetString(42);
if (Reader.FieldCount > 43)this._vic_iPeso = (Reader.IsDBNull(43)) ? 0 : Reader.GetInt32(43);

    }
    Reader.Close();
    }
   }
  
    }
  