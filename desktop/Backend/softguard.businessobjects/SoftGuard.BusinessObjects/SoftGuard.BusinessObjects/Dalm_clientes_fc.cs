
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
     ///m_clientes_fc data access layer   
     ///</summary>
    public class Dalm_clientes_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _cli_cnombre;
    
      private string _cli_cidentificacion;
    
      private string _cli_ccategoriaimpositiva;
    
      private int _cli_ivendedor;
    
      private int _cli_icobrador;
    
      private string _cli_czona;
    
      private string _cli_ccallefiscal;
    
      private string _cli_clocalidadfiscal;
    
      private string _cli_cprovinciafiscal;
    
      private string _cli_ccodigopostalfiscal;
    
      private string _cli_ccallecobranza;
    
      private string _cli_clocalidadcobranza;
    
      private string _cli_cprovinciacobranza;
    
      private string _cli_ccodigopostalcobranza;
    
      private Decimal _cli_nlunes;
    
      private Decimal _cli_nmartes;
    
      private Decimal _cli_nmiercoles;
    
      private Decimal _cli_njueves;
    
      private Decimal _cli_nviernes;
    
      private Decimal _cli_nsabado;
    
      private Decimal _cli_ndomingo;
    
      private string _cli_chora;
    
      private string _cli_cservicio;
    
      private DateTime? _cli_dproximafactura;
    
      private string _cli_cformatoimpresion;
    
      private string _cli_ccondicionpago;
    
      private string _cli_ctelefono;
    
      private string _cli_ccontacto;
    
      private string _cli_cobservacion;
    
      private Decimal _cli_nsituacion;
    
      private int _cli_inumero;
    
      private Decimal _cli_nDocCAE;
    
      private string _cli_cDatosExtra;
    
      private int _cli_iorganizacion;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cli_cnombre   
     ///</summary>
      public string cli_cnombre
      {
      
          get{ return this._cli_cnombre; }
          set{ this._cli_cnombre = value; }
        
      }
     ///<summary>
     ///cli_cidentificacion   
     ///</summary>
      public string cli_cidentificacion
      {
      
          get{ return this._cli_cidentificacion; }
          set{ this._cli_cidentificacion = value; }
        
      }
     ///<summary>
     ///cli_ccategoriaimpositiva   
     ///</summary>
      public string cli_ccategoriaimpositiva
      {
      
          get{ return this._cli_ccategoriaimpositiva; }
          set{ this._cli_ccategoriaimpositiva = value; }
        
      }
     ///<summary>
     ///cli_ivendedor   
     ///</summary>
      public int cli_ivendedor
      {
      
          get{ return this._cli_ivendedor; }
          set{ this._cli_ivendedor = value; }
        
      }
     ///<summary>
     ///cli_icobrador   
     ///</summary>
      public int cli_icobrador
      {
      
          get{ return this._cli_icobrador; }
          set{ this._cli_icobrador = value; }
        
      }
     ///<summary>
     ///cli_czona   
     ///</summary>
      public string cli_czona
      {
      
          get{ return this._cli_czona; }
          set{ this._cli_czona = value; }
        
      }
     ///<summary>
     ///cli_ccallefiscal   
     ///</summary>
      public string cli_ccallefiscal
      {
      
          get{ return this._cli_ccallefiscal; }
          set{ this._cli_ccallefiscal = value; }
        
      }
     ///<summary>
     ///cli_clocalidadfiscal   
     ///</summary>
      public string cli_clocalidadfiscal
      {
      
          get{ return this._cli_clocalidadfiscal; }
          set{ this._cli_clocalidadfiscal = value; }
        
      }
     ///<summary>
     ///cli_cprovinciafiscal   
     ///</summary>
      public string cli_cprovinciafiscal
      {
      
          get{ return this._cli_cprovinciafiscal; }
          set{ this._cli_cprovinciafiscal = value; }
        
      }
     ///<summary>
     ///cli_ccodigopostalfiscal   
     ///</summary>
      public string cli_ccodigopostalfiscal
      {
      
          get{ return this._cli_ccodigopostalfiscal; }
          set{ this._cli_ccodigopostalfiscal = value; }
        
      }
     ///<summary>
     ///cli_ccallecobranza   
     ///</summary>
      public string cli_ccallecobranza
      {
      
          get{ return this._cli_ccallecobranza; }
          set{ this._cli_ccallecobranza = value; }
        
      }
     ///<summary>
     ///cli_clocalidadcobranza   
     ///</summary>
      public string cli_clocalidadcobranza
      {
      
          get{ return this._cli_clocalidadcobranza; }
          set{ this._cli_clocalidadcobranza = value; }
        
      }
     ///<summary>
     ///cli_cprovinciacobranza   
     ///</summary>
      public string cli_cprovinciacobranza
      {
      
          get{ return this._cli_cprovinciacobranza; }
          set{ this._cli_cprovinciacobranza = value; }
        
      }
     ///<summary>
     ///cli_ccodigopostalcobranza   
     ///</summary>
      public string cli_ccodigopostalcobranza
      {
      
          get{ return this._cli_ccodigopostalcobranza; }
          set{ this._cli_ccodigopostalcobranza = value; }
        
      }
     ///<summary>
     ///cli_nlunes   
     ///</summary>
      public Decimal cli_nlunes
      {
      
          get{ return this._cli_nlunes; }
          set{ this._cli_nlunes = value; }
        
      }
     ///<summary>
     ///cli_nmartes   
     ///</summary>
      public Decimal cli_nmartes
      {
      
          get{ return this._cli_nmartes; }
          set{ this._cli_nmartes = value; }
        
      }
     ///<summary>
     ///cli_nmiercoles   
     ///</summary>
      public Decimal cli_nmiercoles
      {
      
          get{ return this._cli_nmiercoles; }
          set{ this._cli_nmiercoles = value; }
        
      }
     ///<summary>
     ///cli_njueves   
     ///</summary>
      public Decimal cli_njueves
      {
      
          get{ return this._cli_njueves; }
          set{ this._cli_njueves = value; }
        
      }
     ///<summary>
     ///cli_nviernes   
     ///</summary>
      public Decimal cli_nviernes
      {
      
          get{ return this._cli_nviernes; }
          set{ this._cli_nviernes = value; }
        
      }
     ///<summary>
     ///cli_nsabado   
     ///</summary>
      public Decimal cli_nsabado
      {
      
          get{ return this._cli_nsabado; }
          set{ this._cli_nsabado = value; }
        
      }
     ///<summary>
     ///cli_ndomingo   
     ///</summary>
      public Decimal cli_ndomingo
      {
      
          get{ return this._cli_ndomingo; }
          set{ this._cli_ndomingo = value; }
        
      }
     ///<summary>
     ///cli_chora   
     ///</summary>
      public string cli_chora
      {
      
          get{ return this._cli_chora; }
          set{ this._cli_chora = value; }
        
      }
     ///<summary>
     ///cli_cservicio   
     ///</summary>
      public string cli_cservicio
      {
      
          get{ return this._cli_cservicio; }
          set{ this._cli_cservicio = value; }
        
      }
     ///<summary>
     ///cli_dproximafactura   
     ///</summary>
      public DateTime? cli_dproximafactura
      {
      
          get{ return this._cli_dproximafactura; }
          set{ this._cli_dproximafactura = value; }
        
      }
     ///<summary>
     ///cli_cformatoimpresion   
     ///</summary>
      public string cli_cformatoimpresion
      {
      
          get{ return this._cli_cformatoimpresion; }
          set{ this._cli_cformatoimpresion = value; }
        
      }
     ///<summary>
     ///cli_ccondicionpago   
     ///</summary>
      public string cli_ccondicionpago
      {
      
          get{ return this._cli_ccondicionpago; }
          set{ this._cli_ccondicionpago = value; }
        
      }
     ///<summary>
     ///cli_ctelefono   
     ///</summary>
      public string cli_ctelefono
      {
      
          get{ return this._cli_ctelefono; }
          set{ this._cli_ctelefono = value; }
        
      }
     ///<summary>
     ///cli_ccontacto   
     ///</summary>
      public string cli_ccontacto
      {
      
          get{ return this._cli_ccontacto; }
          set{ this._cli_ccontacto = value; }
        
      }
     ///<summary>
     ///cli_cobservacion   
     ///</summary>
      public string cli_cobservacion
      {
      
          get{ return this._cli_cobservacion; }
          set{ this._cli_cobservacion = value; }
        
      }
     ///<summary>
     ///cli_nsituacion   
     ///</summary>
      public Decimal cli_nsituacion
      {
      
          get{ return this._cli_nsituacion; }
          set{ this._cli_nsituacion = value; }
        
      }
     ///<summary>
     ///cli_inumero   
     ///</summary>
      public int cli_inumero
      {
      
          get{ return this._cli_inumero; }
          set{ this._cli_inumero = value; }
        
      }
     ///<summary>
     ///cli_nDocCAE   
     ///</summary>
      public Decimal cli_nDocCAE
      {
      
          get{ return this._cli_nDocCAE; }
          set{ this._cli_nDocCAE = value; }
        
      }
     ///<summary>
     ///cli_cDatosExtra   
     ///</summary>
      public string cli_cDatosExtra
      {
      
          get{ return this._cli_cDatosExtra; }
          set{ this._cli_cDatosExtra = value; }
        
      }
     ///<summary>
     ///cli_iorganizacion   
     ///</summary>
      public int cli_iorganizacion
      {
      
          get{ return this._cli_iorganizacion; }
          set{ this._cli_iorganizacion = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_clientes_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_clientes_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_clientes_fc(SqlHelper SqlConfig, int UserId, Simplem_clientes_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cli_cnombre = Simple.cli_cnombre;

      this._cli_cidentificacion = Simple.cli_cidentificacion;

      this._cli_ccategoriaimpositiva = Simple.cli_ccategoriaimpositiva;

      this._cli_ivendedor = Simple.cli_ivendedor;

      this._cli_icobrador = Simple.cli_icobrador;

      this._cli_czona = Simple.cli_czona;

      this._cli_ccallefiscal = Simple.cli_ccallefiscal;

      this._cli_clocalidadfiscal = Simple.cli_clocalidadfiscal;

      this._cli_cprovinciafiscal = Simple.cli_cprovinciafiscal;

      this._cli_ccodigopostalfiscal = Simple.cli_ccodigopostalfiscal;

      this._cli_ccallecobranza = Simple.cli_ccallecobranza;

      this._cli_clocalidadcobranza = Simple.cli_clocalidadcobranza;

      this._cli_cprovinciacobranza = Simple.cli_cprovinciacobranza;

      this._cli_ccodigopostalcobranza = Simple.cli_ccodigopostalcobranza;

      this._cli_nlunes = Simple.cli_nlunes;

      this._cli_nmartes = Simple.cli_nmartes;

      this._cli_nmiercoles = Simple.cli_nmiercoles;

      this._cli_njueves = Simple.cli_njueves;

      this._cli_nviernes = Simple.cli_nviernes;

      this._cli_nsabado = Simple.cli_nsabado;

      this._cli_ndomingo = Simple.cli_ndomingo;

      this._cli_chora = Simple.cli_chora;

      this._cli_cservicio = Simple.cli_cservicio;

      this._cli_dproximafactura = Simple.cli_dproximafactura;

      this._cli_cformatoimpresion = Simple.cli_cformatoimpresion;

      this._cli_ccondicionpago = Simple.cli_ccondicionpago;

      this._cli_ctelefono = Simple.cli_ctelefono;

      this._cli_ccontacto = Simple.cli_ccontacto;

      this._cli_cobservacion = Simple.cli_cobservacion;

      this._cli_nsituacion = Simple.cli_nsituacion;

      this._cli_inumero = Simple.cli_inumero;

      this._cli_nDocCAE = Simple.cli_nDocCAE;

      this._cli_cDatosExtra = Simple.cli_cDatosExtra;

      this._cli_iorganizacion = Simple.cli_iorganizacion;

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
    using(var cmd = new SqlCommand("m_clientes_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cli_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccategoriaimpositiva", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ivendedor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_icobrador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccallefiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_clocalidadfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cprovinciafiscal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccodigopostalfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccallecobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_clocalidadcobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cprovinciacobranza", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccodigopostalcobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_nlunes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nmartes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nmiercoles", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_njueves", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nviernes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nsabado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_ndomingo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_chora", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cservicio", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_dproximafactura", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cli_cformatoimpresion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccondicionpago", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccontacto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cli_nsituacion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_nDocCAE", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_cDatosExtra", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_iorganizacion", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cli_cnombre"].Value = (this._cli_cnombre == null) ? (object) DBNull.Value : (object) this._cli_cnombre;

		cmd.Parameters["@cli_cidentificacion"].Value = (this._cli_cidentificacion == null) ? (object) DBNull.Value : (object) this._cli_cidentificacion;

		cmd.Parameters["@cli_ccategoriaimpositiva"].Value = (this._cli_ccategoriaimpositiva == null) ? (object) DBNull.Value : (object) this._cli_ccategoriaimpositiva;

		cmd.Parameters["@cli_ivendedor"].Value = this._cli_ivendedor;

		cmd.Parameters["@cli_icobrador"].Value = this._cli_icobrador;

		cmd.Parameters["@cli_czona"].Value = (this._cli_czona == null) ? (object) DBNull.Value : (object) this._cli_czona;

		cmd.Parameters["@cli_ccallefiscal"].Value = (this._cli_ccallefiscal == null) ? (object) DBNull.Value : (object) this._cli_ccallefiscal;

		cmd.Parameters["@cli_clocalidadfiscal"].Value = (this._cli_clocalidadfiscal == null) ? (object) DBNull.Value : (object) this._cli_clocalidadfiscal;

		cmd.Parameters["@cli_cprovinciafiscal"].Value = (this._cli_cprovinciafiscal == null) ? (object) DBNull.Value : (object) this._cli_cprovinciafiscal;

		cmd.Parameters["@cli_ccodigopostalfiscal"].Value = (this._cli_ccodigopostalfiscal == null) ? (object) DBNull.Value : (object) this._cli_ccodigopostalfiscal;

		cmd.Parameters["@cli_ccallecobranza"].Value = (this._cli_ccallecobranza == null) ? (object) DBNull.Value : (object) this._cli_ccallecobranza;

		cmd.Parameters["@cli_clocalidadcobranza"].Value = (this._cli_clocalidadcobranza == null) ? (object) DBNull.Value : (object) this._cli_clocalidadcobranza;

		cmd.Parameters["@cli_cprovinciacobranza"].Value = (this._cli_cprovinciacobranza == null) ? (object) DBNull.Value : (object) this._cli_cprovinciacobranza;

		cmd.Parameters["@cli_ccodigopostalcobranza"].Value = (this._cli_ccodigopostalcobranza == null) ? (object) DBNull.Value : (object) this._cli_ccodigopostalcobranza;

		cmd.Parameters["@cli_nlunes"].Value = this._cli_nlunes;

		cmd.Parameters["@cli_nmartes"].Value = this._cli_nmartes;

		cmd.Parameters["@cli_nmiercoles"].Value = this._cli_nmiercoles;

		cmd.Parameters["@cli_njueves"].Value = this._cli_njueves;

		cmd.Parameters["@cli_nviernes"].Value = this._cli_nviernes;

		cmd.Parameters["@cli_nsabado"].Value = this._cli_nsabado;

		cmd.Parameters["@cli_ndomingo"].Value = this._cli_ndomingo;

		cmd.Parameters["@cli_chora"].Value = (this._cli_chora == null) ? (object) DBNull.Value : (object) this._cli_chora;

		cmd.Parameters["@cli_cservicio"].Value = (this._cli_cservicio == null) ? (object) DBNull.Value : (object) this._cli_cservicio;

		cmd.Parameters["@cli_dproximafactura"].Value = (this._cli_dproximafactura == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cli_dproximafactura;

		cmd.Parameters["@cli_cformatoimpresion"].Value = (this._cli_cformatoimpresion == null) ? (object) DBNull.Value : (object) this._cli_cformatoimpresion;

		cmd.Parameters["@cli_ccondicionpago"].Value = (this._cli_ccondicionpago == null) ? (object) DBNull.Value : (object) this._cli_ccondicionpago;

		cmd.Parameters["@cli_ctelefono"].Value = (this._cli_ctelefono == null) ? (object) DBNull.Value : (object) this._cli_ctelefono;

		cmd.Parameters["@cli_ccontacto"].Value = (this._cli_ccontacto == null) ? (object) DBNull.Value : (object) this._cli_ccontacto;

		cmd.Parameters["@cli_cobservacion"].Value = (this._cli_cobservacion == null) ? (object) DBNull.Value : (object) this._cli_cobservacion;

		cmd.Parameters["@cli_nsituacion"].Value = this._cli_nsituacion;

		cmd.Parameters["@cli_inumero"].Value = this._cli_inumero;

		cmd.Parameters["@cli_nDocCAE"].Value = this._cli_nDocCAE;

		cmd.Parameters["@cli_cDatosExtra"].Value = (this._cli_cDatosExtra == null) ? (object) DBNull.Value : (object) this._cli_cDatosExtra;

		cmd.Parameters["@cli_iorganizacion"].Value = this._cli_iorganizacion;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_clientes_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cli_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccategoriaimpositiva", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ivendedor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_icobrador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccallefiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_clocalidadfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cprovinciafiscal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccodigopostalfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccallecobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_clocalidadcobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cprovinciacobranza", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccodigopostalcobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_nlunes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nmartes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nmiercoles", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_njueves", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nviernes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nsabado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_ndomingo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_chora", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cservicio", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_dproximafactura", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cli_cformatoimpresion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccondicionpago", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccontacto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cli_nsituacion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_nDocCAE", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_cDatosExtra", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_iorganizacion", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cli_cnombre"].Value = (this._cli_cnombre == null) ? (object) DBNull.Value : (object) this._cli_cnombre;

		cmd.Parameters["@cli_cidentificacion"].Value = (this._cli_cidentificacion == null) ? (object) DBNull.Value : (object) this._cli_cidentificacion;

		cmd.Parameters["@cli_ccategoriaimpositiva"].Value = (this._cli_ccategoriaimpositiva == null) ? (object) DBNull.Value : (object) this._cli_ccategoriaimpositiva;

		cmd.Parameters["@cli_ivendedor"].Value = this._cli_ivendedor;

		cmd.Parameters["@cli_icobrador"].Value = this._cli_icobrador;

		cmd.Parameters["@cli_czona"].Value = (this._cli_czona == null) ? (object) DBNull.Value : (object) this._cli_czona;

		cmd.Parameters["@cli_ccallefiscal"].Value = (this._cli_ccallefiscal == null) ? (object) DBNull.Value : (object) this._cli_ccallefiscal;

		cmd.Parameters["@cli_clocalidadfiscal"].Value = (this._cli_clocalidadfiscal == null) ? (object) DBNull.Value : (object) this._cli_clocalidadfiscal;

		cmd.Parameters["@cli_cprovinciafiscal"].Value = (this._cli_cprovinciafiscal == null) ? (object) DBNull.Value : (object) this._cli_cprovinciafiscal;

		cmd.Parameters["@cli_ccodigopostalfiscal"].Value = (this._cli_ccodigopostalfiscal == null) ? (object) DBNull.Value : (object) this._cli_ccodigopostalfiscal;

		cmd.Parameters["@cli_ccallecobranza"].Value = (this._cli_ccallecobranza == null) ? (object) DBNull.Value : (object) this._cli_ccallecobranza;

		cmd.Parameters["@cli_clocalidadcobranza"].Value = (this._cli_clocalidadcobranza == null) ? (object) DBNull.Value : (object) this._cli_clocalidadcobranza;

		cmd.Parameters["@cli_cprovinciacobranza"].Value = (this._cli_cprovinciacobranza == null) ? (object) DBNull.Value : (object) this._cli_cprovinciacobranza;

		cmd.Parameters["@cli_ccodigopostalcobranza"].Value = (this._cli_ccodigopostalcobranza == null) ? (object) DBNull.Value : (object) this._cli_ccodigopostalcobranza;

		cmd.Parameters["@cli_nlunes"].Value = this._cli_nlunes;

		cmd.Parameters["@cli_nmartes"].Value = this._cli_nmartes;

		cmd.Parameters["@cli_nmiercoles"].Value = this._cli_nmiercoles;

		cmd.Parameters["@cli_njueves"].Value = this._cli_njueves;

		cmd.Parameters["@cli_nviernes"].Value = this._cli_nviernes;

		cmd.Parameters["@cli_nsabado"].Value = this._cli_nsabado;

		cmd.Parameters["@cli_ndomingo"].Value = this._cli_ndomingo;

		cmd.Parameters["@cli_chora"].Value = (this._cli_chora == null) ? (object) DBNull.Value : (object) this._cli_chora;

		cmd.Parameters["@cli_cservicio"].Value = (this._cli_cservicio == null) ? (object) DBNull.Value : (object) this._cli_cservicio;

		cmd.Parameters["@cli_dproximafactura"].Value = (this._cli_dproximafactura == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cli_dproximafactura;

		cmd.Parameters["@cli_cformatoimpresion"].Value = (this._cli_cformatoimpresion == null) ? (object) DBNull.Value : (object) this._cli_cformatoimpresion;

		cmd.Parameters["@cli_ccondicionpago"].Value = (this._cli_ccondicionpago == null) ? (object) DBNull.Value : (object) this._cli_ccondicionpago;

		cmd.Parameters["@cli_ctelefono"].Value = (this._cli_ctelefono == null) ? (object) DBNull.Value : (object) this._cli_ctelefono;

		cmd.Parameters["@cli_ccontacto"].Value = (this._cli_ccontacto == null) ? (object) DBNull.Value : (object) this._cli_ccontacto;

		cmd.Parameters["@cli_cobservacion"].Value = (this._cli_cobservacion == null) ? (object) DBNull.Value : (object) this._cli_cobservacion;

		cmd.Parameters["@cli_nsituacion"].Value = this._cli_nsituacion;

		cmd.Parameters["@cli_inumero"].Value = this._cli_inumero;

		cmd.Parameters["@cli_nDocCAE"].Value = this._cli_nDocCAE;

		cmd.Parameters["@cli_cDatosExtra"].Value = (this._cli_cDatosExtra == null) ? (object) DBNull.Value : (object) this._cli_cDatosExtra;

		cmd.Parameters["@cli_iorganizacion"].Value = this._cli_iorganizacion;

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
    throw new RuntimeException("The m_clientes_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_clientes_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("m_clientes_fcSel", conn))
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
    Simplem_clientes_fc Simple = new Simplem_clientes_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cli_cnombre = this._cli_cnombre;

      Simple.cli_cidentificacion = this._cli_cidentificacion;

      Simple.cli_ccategoriaimpositiva = this._cli_ccategoriaimpositiva;

      Simple.cli_ivendedor = this._cli_ivendedor;

      Simple.cli_icobrador = this._cli_icobrador;

      Simple.cli_czona = this._cli_czona;

      Simple.cli_ccallefiscal = this._cli_ccallefiscal;

      Simple.cli_clocalidadfiscal = this._cli_clocalidadfiscal;

      Simple.cli_cprovinciafiscal = this._cli_cprovinciafiscal;

      Simple.cli_ccodigopostalfiscal = this._cli_ccodigopostalfiscal;

      Simple.cli_ccallecobranza = this._cli_ccallecobranza;

      Simple.cli_clocalidadcobranza = this._cli_clocalidadcobranza;

      Simple.cli_cprovinciacobranza = this._cli_cprovinciacobranza;

      Simple.cli_ccodigopostalcobranza = this._cli_ccodigopostalcobranza;

      Simple.cli_nlunes = this._cli_nlunes;

      Simple.cli_nmartes = this._cli_nmartes;

      Simple.cli_nmiercoles = this._cli_nmiercoles;

      Simple.cli_njueves = this._cli_njueves;

      Simple.cli_nviernes = this._cli_nviernes;

      Simple.cli_nsabado = this._cli_nsabado;

      Simple.cli_ndomingo = this._cli_ndomingo;

      Simple.cli_chora = this._cli_chora;

      Simple.cli_cservicio = this._cli_cservicio;

      Simple.cli_dproximafactura = this._cli_dproximafactura;

      Simple.cli_cformatoimpresion = this._cli_cformatoimpresion;

      Simple.cli_ccondicionpago = this._cli_ccondicionpago;

      Simple.cli_ctelefono = this._cli_ctelefono;

      Simple.cli_ccontacto = this._cli_ccontacto;

      Simple.cli_cobservacion = this._cli_cobservacion;

      Simple.cli_nsituacion = this._cli_nsituacion;

      Simple.cli_inumero = this._cli_inumero;

      Simple.cli_nDocCAE = this._cli_nDocCAE;

      Simple.cli_cDatosExtra = this._cli_cDatosExtra;

      Simple.cli_iorganizacion = this._cli_iorganizacion;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_clientes_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cli_cnombre = Simple.cli_cnombre;

      this._cli_cidentificacion = Simple.cli_cidentificacion;

      this._cli_ccategoriaimpositiva = Simple.cli_ccategoriaimpositiva;

      this._cli_ivendedor = Simple.cli_ivendedor;

      this._cli_icobrador = Simple.cli_icobrador;

      this._cli_czona = Simple.cli_czona;

      this._cli_ccallefiscal = Simple.cli_ccallefiscal;

      this._cli_clocalidadfiscal = Simple.cli_clocalidadfiscal;

      this._cli_cprovinciafiscal = Simple.cli_cprovinciafiscal;

      this._cli_ccodigopostalfiscal = Simple.cli_ccodigopostalfiscal;

      this._cli_ccallecobranza = Simple.cli_ccallecobranza;

      this._cli_clocalidadcobranza = Simple.cli_clocalidadcobranza;

      this._cli_cprovinciacobranza = Simple.cli_cprovinciacobranza;

      this._cli_ccodigopostalcobranza = Simple.cli_ccodigopostalcobranza;

      this._cli_nlunes = Simple.cli_nlunes;

      this._cli_nmartes = Simple.cli_nmartes;

      this._cli_nmiercoles = Simple.cli_nmiercoles;

      this._cli_njueves = Simple.cli_njueves;

      this._cli_nviernes = Simple.cli_nviernes;

      this._cli_nsabado = Simple.cli_nsabado;

      this._cli_ndomingo = Simple.cli_ndomingo;

      this._cli_chora = Simple.cli_chora;

      this._cli_cservicio = Simple.cli_cservicio;

      this._cli_dproximafactura = Simple.cli_dproximafactura;

      this._cli_cformatoimpresion = Simple.cli_cformatoimpresion;

      this._cli_ccondicionpago = Simple.cli_ccondicionpago;

      this._cli_ctelefono = Simple.cli_ctelefono;

      this._cli_ccontacto = Simple.cli_ccontacto;

      this._cli_cobservacion = Simple.cli_cobservacion;

      this._cli_nsituacion = Simple.cli_nsituacion;

      this._cli_inumero = Simple.cli_inumero;

      this._cli_nDocCAE = Simple.cli_nDocCAE;

      this._cli_cDatosExtra = Simple.cli_cDatosExtra;

      this._cli_iorganizacion = Simple.cli_iorganizacion;

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
    Callerm_clientes_fc Caller = new Callerm_clientes_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cli_cnombre = this._cli_cnombre;

      Caller.cli_cidentificacion = this._cli_cidentificacion;

      Caller.cli_ccategoriaimpositiva = this._cli_ccategoriaimpositiva;

      Caller.cli_ivendedor = this._cli_ivendedor;

      Caller.cli_icobrador = this._cli_icobrador;

      Caller.cli_czona = this._cli_czona;

      Caller.cli_ccallefiscal = this._cli_ccallefiscal;

      Caller.cli_clocalidadfiscal = this._cli_clocalidadfiscal;

      Caller.cli_cprovinciafiscal = this._cli_cprovinciafiscal;

      Caller.cli_ccodigopostalfiscal = this._cli_ccodigopostalfiscal;

      Caller.cli_ccallecobranza = this._cli_ccallecobranza;

      Caller.cli_clocalidadcobranza = this._cli_clocalidadcobranza;

      Caller.cli_cprovinciacobranza = this._cli_cprovinciacobranza;

      Caller.cli_ccodigopostalcobranza = this._cli_ccodigopostalcobranza;

      Caller.cli_nlunes = this._cli_nlunes;

      Caller.cli_nmartes = this._cli_nmartes;

      Caller.cli_nmiercoles = this._cli_nmiercoles;

      Caller.cli_njueves = this._cli_njueves;

      Caller.cli_nviernes = this._cli_nviernes;

      Caller.cli_nsabado = this._cli_nsabado;

      Caller.cli_ndomingo = this._cli_ndomingo;

      Caller.cli_chora = this._cli_chora;

      Caller.cli_cservicio = this._cli_cservicio;

      Caller.cli_dproximafactura = this._cli_dproximafactura;

      Caller.cli_cformatoimpresion = this._cli_cformatoimpresion;

      Caller.cli_ccondicionpago = this._cli_ccondicionpago;

      Caller.cli_ctelefono = this._cli_ctelefono;

      Caller.cli_ccontacto = this._cli_ccontacto;

      Caller.cli_cobservacion = this._cli_cobservacion;

      Caller.cli_nsituacion = this._cli_nsituacion;

      Caller.cli_inumero = this._cli_inumero;

      Caller.cli_nDocCAE = this._cli_nDocCAE;

      Caller.cli_cDatosExtra = this._cli_cDatosExtra;

      Caller.cli_iorganizacion = this._cli_iorganizacion;

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
    
      dt.Columns.Add(new DataColumn("cli_cnombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_cidentificacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ccategoriaimpositiva", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ivendedor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cli_icobrador", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cli_czona", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ccallefiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_clocalidadfiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_cprovinciafiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ccodigopostalfiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ccallecobranza", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_clocalidadcobranza", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_cprovinciacobranza", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ccodigopostalcobranza", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_nlunes", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_nmartes", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_nmiercoles", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_njueves", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_nviernes", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_nsabado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_ndomingo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_chora", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_cservicio", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_dproximafactura", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cli_cformatoimpresion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ccondicionpago", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ctelefono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_ccontacto", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_cobservacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_nsituacion", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_inumero", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cli_nDocCAE", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cli_cDatosExtra", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cli_iorganizacion", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cli_cnombre"] = this._cli_cnombre;

      dr["cli_cidentificacion"] = this._cli_cidentificacion;

      dr["cli_ccategoriaimpositiva"] = this._cli_ccategoriaimpositiva;

      dr["cli_ivendedor"] = this._cli_ivendedor;

      dr["cli_icobrador"] = this._cli_icobrador;

      dr["cli_czona"] = this._cli_czona;

      dr["cli_ccallefiscal"] = this._cli_ccallefiscal;

      dr["cli_clocalidadfiscal"] = this._cli_clocalidadfiscal;

      dr["cli_cprovinciafiscal"] = this._cli_cprovinciafiscal;

      dr["cli_ccodigopostalfiscal"] = this._cli_ccodigopostalfiscal;

      dr["cli_ccallecobranza"] = this._cli_ccallecobranza;

      dr["cli_clocalidadcobranza"] = this._cli_clocalidadcobranza;

      dr["cli_cprovinciacobranza"] = this._cli_cprovinciacobranza;

      dr["cli_ccodigopostalcobranza"] = this._cli_ccodigopostalcobranza;

      dr["cli_nlunes"] = this._cli_nlunes;

      dr["cli_nmartes"] = this._cli_nmartes;

      dr["cli_nmiercoles"] = this._cli_nmiercoles;

      dr["cli_njueves"] = this._cli_njueves;

      dr["cli_nviernes"] = this._cli_nviernes;

      dr["cli_nsabado"] = this._cli_nsabado;

      dr["cli_ndomingo"] = this._cli_ndomingo;

      dr["cli_chora"] = this._cli_chora;

      dr["cli_cservicio"] = this._cli_cservicio;

      dr["cli_dproximafactura"] = this._cli_dproximafactura;

      dr["cli_cformatoimpresion"] = this._cli_cformatoimpresion;

      dr["cli_ccondicionpago"] = this._cli_ccondicionpago;

      dr["cli_ctelefono"] = this._cli_ctelefono;

      dr["cli_ccontacto"] = this._cli_ccontacto;

      dr["cli_cobservacion"] = this._cli_cobservacion;

      dr["cli_nsituacion"] = this._cli_nsituacion;

      dr["cli_inumero"] = this._cli_inumero;

      dr["cli_nDocCAE"] = this._cli_nDocCAE;

      dr["cli_cDatosExtra"] = this._cli_cDatosExtra;

      dr["cli_iorganizacion"] = this._cli_iorganizacion;

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
    using(var CmdChilds = new SqlCommand("m_clientes_fcByChildObject", conn))
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
    Simplem_clientes_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_clientes_fcByChildObject", conn))
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
    Simple = new Simplem_clientes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cli_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cli_cidentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cli_ccategoriaimpositiva = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cli_ivendedor = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cli_icobrador = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cli_czona = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cli_ccallefiscal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cli_clocalidadfiscal = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cli_cprovinciafiscal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cli_ccodigopostalfiscal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cli_ccallecobranza = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cli_clocalidadcobranza = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cli_cprovinciacobranza = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cli_ccodigopostalcobranza = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cli_nlunes = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cli_nmartes = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cli_nmiercoles = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cli_njueves = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cli_nviernes = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cli_nsabado = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.cli_ndomingo = (Reader.IsDBNull(22)) ? new Decimal(0) : Reader.GetDecimal(22);
if (Reader.FieldCount > 23)Simple.cli_chora = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.cli_cservicio = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cli_dproximafactura = (Reader.IsDBNull(25)) ? new DateTime(1,1,1) : Reader.GetDateTime(25);
if (Reader.FieldCount > 26)Simple.cli_cformatoimpresion = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cli_ccondicionpago = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cli_ctelefono = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cli_ccontacto = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.cli_cobservacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cli_nsituacion = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cli_inumero = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.cli_nDocCAE = (Reader.IsDBNull(33)) ? new Decimal(0) : Reader.GetDecimal(33);
if (Reader.FieldCount > 34)Simple.cli_cDatosExtra = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cli_iorganizacion = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);


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
    Simplem_clientes_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_clientes_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cli_cnombre = (Row["cli_cnombre"] == DBNull.Value) ? "" : (string) Row["cli_cnombre"];

Simple.cli_cidentificacion = (Row["cli_cidentificacion"] == DBNull.Value) ? "" : (string) Row["cli_cidentificacion"];

Simple.cli_ccategoriaimpositiva = (Row["cli_ccategoriaimpositiva"] == DBNull.Value) ? "" : (string) Row["cli_ccategoriaimpositiva"];

Simple.cli_ivendedor = (Row["cli_ivendedor"] == DBNull.Value) ? 0 : (int) Row["cli_ivendedor"];

Simple.cli_icobrador = (Row["cli_icobrador"] == DBNull.Value) ? 0 : (int) Row["cli_icobrador"];

Simple.cli_czona = (Row["cli_czona"] == DBNull.Value) ? "" : (string) Row["cli_czona"];

Simple.cli_ccallefiscal = (Row["cli_ccallefiscal"] == DBNull.Value) ? "" : (string) Row["cli_ccallefiscal"];

Simple.cli_clocalidadfiscal = (Row["cli_clocalidadfiscal"] == DBNull.Value) ? "" : (string) Row["cli_clocalidadfiscal"];

Simple.cli_cprovinciafiscal = (Row["cli_cprovinciafiscal"] == DBNull.Value) ? "" : (string) Row["cli_cprovinciafiscal"];

Simple.cli_ccodigopostalfiscal = (Row["cli_ccodigopostalfiscal"] == DBNull.Value) ? "" : (string) Row["cli_ccodigopostalfiscal"];

Simple.cli_ccallecobranza = (Row["cli_ccallecobranza"] == DBNull.Value) ? "" : (string) Row["cli_ccallecobranza"];

Simple.cli_clocalidadcobranza = (Row["cli_clocalidadcobranza"] == DBNull.Value) ? "" : (string) Row["cli_clocalidadcobranza"];

Simple.cli_cprovinciacobranza = (Row["cli_cprovinciacobranza"] == DBNull.Value) ? "" : (string) Row["cli_cprovinciacobranza"];

Simple.cli_ccodigopostalcobranza = (Row["cli_ccodigopostalcobranza"] == DBNull.Value) ? "" : (string) Row["cli_ccodigopostalcobranza"];

Simple.cli_nlunes = (Row["cli_nlunes"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_nlunes"];

Simple.cli_nmartes = (Row["cli_nmartes"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_nmartes"];

Simple.cli_nmiercoles = (Row["cli_nmiercoles"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_nmiercoles"];

Simple.cli_njueves = (Row["cli_njueves"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_njueves"];

Simple.cli_nviernes = (Row["cli_nviernes"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_nviernes"];

Simple.cli_nsabado = (Row["cli_nsabado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_nsabado"];

Simple.cli_ndomingo = (Row["cli_ndomingo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_ndomingo"];

Simple.cli_chora = (Row["cli_chora"] == DBNull.Value) ? "" : (string) Row["cli_chora"];

Simple.cli_cservicio = (Row["cli_cservicio"] == DBNull.Value) ? "" : (string) Row["cli_cservicio"];

Simple.cli_dproximafactura = (Row["cli_dproximafactura"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cli_dproximafactura"];

Simple.cli_cformatoimpresion = (Row["cli_cformatoimpresion"] == DBNull.Value) ? "" : (string) Row["cli_cformatoimpresion"];

Simple.cli_ccondicionpago = (Row["cli_ccondicionpago"] == DBNull.Value) ? "" : (string) Row["cli_ccondicionpago"];

Simple.cli_ctelefono = (Row["cli_ctelefono"] == DBNull.Value) ? "" : (string) Row["cli_ctelefono"];

Simple.cli_ccontacto = (Row["cli_ccontacto"] == DBNull.Value) ? "" : (string) Row["cli_ccontacto"];

Simple.cli_cobservacion = (Row["cli_cobservacion"] == DBNull.Value) ? "" : (string) Row["cli_cobservacion"];

Simple.cli_nsituacion = (Row["cli_nsituacion"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_nsituacion"];

Simple.cli_inumero = (Row["cli_inumero"] == DBNull.Value) ? 0 : (int) Row["cli_inumero"];

Simple.cli_nDocCAE = (Row["cli_nDocCAE"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cli_nDocCAE"];

Simple.cli_cDatosExtra = (Row["cli_cDatosExtra"] == DBNull.Value) ? "" : (string) Row["cli_cDatosExtra"];

Simple.cli_iorganizacion = (Row["cli_iorganizacion"] == DBNull.Value) ? 0 : (int) Row["cli_iorganizacion"];


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
    using(var CmdParents = new SqlCommand("m_clientes_fcByParentObject", conn))
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
    Simplem_clientes_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_clientes_fcByParentObject", conn))
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
    Simple = new Simplem_clientes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cli_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cli_cidentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cli_ccategoriaimpositiva = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cli_ivendedor = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cli_icobrador = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cli_czona = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cli_ccallefiscal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cli_clocalidadfiscal = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cli_cprovinciafiscal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cli_ccodigopostalfiscal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cli_ccallecobranza = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cli_clocalidadcobranza = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cli_cprovinciacobranza = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cli_ccodigopostalcobranza = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cli_nlunes = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cli_nmartes = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cli_nmiercoles = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cli_njueves = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cli_nviernes = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cli_nsabado = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.cli_ndomingo = (Reader.IsDBNull(22)) ? new Decimal(0) : Reader.GetDecimal(22);
if (Reader.FieldCount > 23)Simple.cli_chora = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.cli_cservicio = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cli_dproximafactura = (Reader.IsDBNull(25)) ? new DateTime(1,1,1) : Reader.GetDateTime(25);
if (Reader.FieldCount > 26)Simple.cli_cformatoimpresion = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cli_ccondicionpago = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cli_ctelefono = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cli_ccontacto = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.cli_cobservacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cli_nsituacion = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cli_inumero = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.cli_nDocCAE = (Reader.IsDBNull(33)) ? new Decimal(0) : Reader.GetDecimal(33);
if (Reader.FieldCount > 34)Simple.cli_cDatosExtra = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cli_iorganizacion = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);


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
    using (var CmdDataByName = new SqlCommand("m_clientes_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_clientes_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_clientes_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_clientes_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_clientes_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_clientes_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_clientes_fcBySimplem_clientes_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cli_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccategoriaimpositiva", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ivendedor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_icobrador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccallefiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_clocalidadfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cprovinciafiscal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccodigopostalfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccallecobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_clocalidadcobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cprovinciacobranza", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccodigopostalcobranza", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_nlunes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nmartes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nmiercoles", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_njueves", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nviernes", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_nsabado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_ndomingo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_chora", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cservicio", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_dproximafactura", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cli_cformatoimpresion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ccondicionpago", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cli_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_ccontacto", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_cobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@cli_nsituacion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cli_nDocCAE", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cli_cDatosExtra", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cli_iorganizacion", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cli_cnombre"].Value = (this._cli_cnombre == null) ? (object) DBNull.Value : (object) this._cli_cnombre;

		cmd.Parameters["@cli_cidentificacion"].Value = (this._cli_cidentificacion == null) ? (object) DBNull.Value : (object) this._cli_cidentificacion;

		cmd.Parameters["@cli_ccategoriaimpositiva"].Value = (this._cli_ccategoriaimpositiva == null) ? (object) DBNull.Value : (object) this._cli_ccategoriaimpositiva;

		cmd.Parameters["@cli_ivendedor"].Value = this._cli_ivendedor;

		cmd.Parameters["@cli_icobrador"].Value = this._cli_icobrador;

		cmd.Parameters["@cli_czona"].Value = (this._cli_czona == null) ? (object) DBNull.Value : (object) this._cli_czona;

		cmd.Parameters["@cli_ccallefiscal"].Value = (this._cli_ccallefiscal == null) ? (object) DBNull.Value : (object) this._cli_ccallefiscal;

		cmd.Parameters["@cli_clocalidadfiscal"].Value = (this._cli_clocalidadfiscal == null) ? (object) DBNull.Value : (object) this._cli_clocalidadfiscal;

		cmd.Parameters["@cli_cprovinciafiscal"].Value = (this._cli_cprovinciafiscal == null) ? (object) DBNull.Value : (object) this._cli_cprovinciafiscal;

		cmd.Parameters["@cli_ccodigopostalfiscal"].Value = (this._cli_ccodigopostalfiscal == null) ? (object) DBNull.Value : (object) this._cli_ccodigopostalfiscal;

		cmd.Parameters["@cli_ccallecobranza"].Value = (this._cli_ccallecobranza == null) ? (object) DBNull.Value : (object) this._cli_ccallecobranza;

		cmd.Parameters["@cli_clocalidadcobranza"].Value = (this._cli_clocalidadcobranza == null) ? (object) DBNull.Value : (object) this._cli_clocalidadcobranza;

		cmd.Parameters["@cli_cprovinciacobranza"].Value = (this._cli_cprovinciacobranza == null) ? (object) DBNull.Value : (object) this._cli_cprovinciacobranza;

		cmd.Parameters["@cli_ccodigopostalcobranza"].Value = (this._cli_ccodigopostalcobranza == null) ? (object) DBNull.Value : (object) this._cli_ccodigopostalcobranza;

		cmd.Parameters["@cli_nlunes"].Value = this._cli_nlunes;

		cmd.Parameters["@cli_nmartes"].Value = this._cli_nmartes;

		cmd.Parameters["@cli_nmiercoles"].Value = this._cli_nmiercoles;

		cmd.Parameters["@cli_njueves"].Value = this._cli_njueves;

		cmd.Parameters["@cli_nviernes"].Value = this._cli_nviernes;

		cmd.Parameters["@cli_nsabado"].Value = this._cli_nsabado;

		cmd.Parameters["@cli_ndomingo"].Value = this._cli_ndomingo;

		cmd.Parameters["@cli_chora"].Value = (this._cli_chora == null) ? (object) DBNull.Value : (object) this._cli_chora;

		cmd.Parameters["@cli_cservicio"].Value = (this._cli_cservicio == null) ? (object) DBNull.Value : (object) this._cli_cservicio;

		cmd.Parameters["@cli_dproximafactura"].Value = (this._cli_dproximafactura == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cli_dproximafactura;

		cmd.Parameters["@cli_cformatoimpresion"].Value = (this._cli_cformatoimpresion == null) ? (object) DBNull.Value : (object) this._cli_cformatoimpresion;

		cmd.Parameters["@cli_ccondicionpago"].Value = (this._cli_ccondicionpago == null) ? (object) DBNull.Value : (object) this._cli_ccondicionpago;

		cmd.Parameters["@cli_ctelefono"].Value = (this._cli_ctelefono == null) ? (object) DBNull.Value : (object) this._cli_ctelefono;

		cmd.Parameters["@cli_ccontacto"].Value = (this._cli_ccontacto == null) ? (object) DBNull.Value : (object) this._cli_ccontacto;

		cmd.Parameters["@cli_cobservacion"].Value = (this._cli_cobservacion == null) ? (object) DBNull.Value : (object) this._cli_cobservacion;

		cmd.Parameters["@cli_nsituacion"].Value = this._cli_nsituacion;

		cmd.Parameters["@cli_inumero"].Value = this._cli_inumero;

		cmd.Parameters["@cli_nDocCAE"].Value = this._cli_nDocCAE;

		cmd.Parameters["@cli_cDatosExtra"].Value = (this._cli_cDatosExtra == null) ? (object) DBNull.Value : (object) this._cli_cDatosExtra;

		cmd.Parameters["@cli_iorganizacion"].Value = this._cli_iorganizacion;


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
		 
		public IEnumerable<Simplem_clientes_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_clientes_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_clientes_fc Simple = new Simplem_clientes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cli_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cli_cidentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cli_ccategoriaimpositiva = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cli_ivendedor = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cli_icobrador = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cli_czona = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cli_ccallefiscal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cli_clocalidadfiscal = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cli_cprovinciafiscal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cli_ccodigopostalfiscal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cli_ccallecobranza = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cli_clocalidadcobranza = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cli_cprovinciacobranza = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cli_ccodigopostalcobranza = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cli_nlunes = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cli_nmartes = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cli_nmiercoles = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cli_njueves = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cli_nviernes = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cli_nsabado = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.cli_ndomingo = (Reader.IsDBNull(22)) ? new Decimal(0) : Reader.GetDecimal(22);
if (Reader.FieldCount > 23)Simple.cli_chora = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.cli_cservicio = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cli_dproximafactura = (Reader.IsDBNull(25)) ? new DateTime(1,1,1) : Reader.GetDateTime(25);
if (Reader.FieldCount > 26)Simple.cli_cformatoimpresion = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cli_ccondicionpago = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cli_ctelefono = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cli_ccontacto = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.cli_cobservacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cli_nsituacion = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cli_inumero = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.cli_nDocCAE = (Reader.IsDBNull(33)) ? new Decimal(0) : Reader.GetDecimal(33);
if (Reader.FieldCount > 34)Simple.cli_cDatosExtra = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cli_iorganizacion = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_clientes_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_clientes_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_clientes_fc Simple = new Simplem_clientes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cli_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cli_cidentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cli_ccategoriaimpositiva = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cli_ivendedor = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cli_icobrador = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cli_czona = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cli_ccallefiscal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cli_clocalidadfiscal = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cli_cprovinciafiscal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cli_ccodigopostalfiscal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.cli_ccallecobranza = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cli_clocalidadcobranza = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cli_cprovinciacobranza = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cli_ccodigopostalcobranza = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.cli_nlunes = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)Simple.cli_nmartes = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.cli_nmiercoles = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)Simple.cli_njueves = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)Simple.cli_nviernes = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)Simple.cli_nsabado = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)Simple.cli_ndomingo = (Reader.IsDBNull(22)) ? new Decimal(0) : Reader.GetDecimal(22);
if (Reader.FieldCount > 23)Simple.cli_chora = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)Simple.cli_cservicio = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)Simple.cli_dproximafactura = (Reader.IsDBNull(25)) ? new DateTime(1,1,1) : Reader.GetDateTime(25);
if (Reader.FieldCount > 26)Simple.cli_cformatoimpresion = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)Simple.cli_ccondicionpago = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)Simple.cli_ctelefono = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)Simple.cli_ccontacto = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)Simple.cli_cobservacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)Simple.cli_nsituacion = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)Simple.cli_inumero = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)Simple.cli_nDocCAE = (Reader.IsDBNull(33)) ? new Decimal(0) : Reader.GetDecimal(33);
if (Reader.FieldCount > 34)Simple.cli_cDatosExtra = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)Simple.cli_iorganizacion = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3039, "m_clientes_fc");
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
    if (Reader.FieldCount > 2)this._cli_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._cli_cidentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._cli_ccategoriaimpositiva = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._cli_ivendedor = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._cli_icobrador = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._cli_czona = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._cli_ccallefiscal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._cli_clocalidadfiscal = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._cli_cprovinciafiscal = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._cli_ccodigopostalfiscal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._cli_ccallecobranza = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._cli_clocalidadcobranza = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._cli_cprovinciacobranza = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._cli_ccodigopostalcobranza = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._cli_nlunes = (Reader.IsDBNull(16)) ? new Decimal(0) : Reader.GetDecimal(16);
if (Reader.FieldCount > 17)this._cli_nmartes = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)this._cli_nmiercoles = (Reader.IsDBNull(18)) ? new Decimal(0) : Reader.GetDecimal(18);
if (Reader.FieldCount > 19)this._cli_njueves = (Reader.IsDBNull(19)) ? new Decimal(0) : Reader.GetDecimal(19);
if (Reader.FieldCount > 20)this._cli_nviernes = (Reader.IsDBNull(20)) ? new Decimal(0) : Reader.GetDecimal(20);
if (Reader.FieldCount > 21)this._cli_nsabado = (Reader.IsDBNull(21)) ? new Decimal(0) : Reader.GetDecimal(21);
if (Reader.FieldCount > 22)this._cli_ndomingo = (Reader.IsDBNull(22)) ? new Decimal(0) : Reader.GetDecimal(22);
if (Reader.FieldCount > 23)this._cli_chora = (Reader.IsDBNull(23)) ? "" : Reader.GetString(23);
if (Reader.FieldCount > 24)this._cli_cservicio = (Reader.IsDBNull(24)) ? "" : Reader.GetString(24);
if (Reader.FieldCount > 25)this._cli_dproximafactura = (Reader.IsDBNull(25)) ? new DateTime(1,1,1) : Reader.GetDateTime(25);
if (Reader.FieldCount > 26)this._cli_cformatoimpresion = (Reader.IsDBNull(26)) ? "" : Reader.GetString(26);
if (Reader.FieldCount > 27)this._cli_ccondicionpago = (Reader.IsDBNull(27)) ? "" : Reader.GetString(27);
if (Reader.FieldCount > 28)this._cli_ctelefono = (Reader.IsDBNull(28)) ? "" : Reader.GetString(28);
if (Reader.FieldCount > 29)this._cli_ccontacto = (Reader.IsDBNull(29)) ? "" : Reader.GetString(29);
if (Reader.FieldCount > 30)this._cli_cobservacion = (Reader.IsDBNull(30)) ? "" : Reader.GetString(30);
if (Reader.FieldCount > 31)this._cli_nsituacion = (Reader.IsDBNull(31)) ? new Decimal(0) : Reader.GetDecimal(31);
if (Reader.FieldCount > 32)this._cli_inumero = (Reader.IsDBNull(32)) ? 0 : Reader.GetInt32(32);
if (Reader.FieldCount > 33)this._cli_nDocCAE = (Reader.IsDBNull(33)) ? new Decimal(0) : Reader.GetDecimal(33);
if (Reader.FieldCount > 34)this._cli_cDatosExtra = (Reader.IsDBNull(34)) ? "" : Reader.GetString(34);
if (Reader.FieldCount > 35)this._cli_iorganizacion = (Reader.IsDBNull(35)) ? 0 : Reader.GetInt32(35);

    }
    Reader.Close();
    }
   }
  
    }
  