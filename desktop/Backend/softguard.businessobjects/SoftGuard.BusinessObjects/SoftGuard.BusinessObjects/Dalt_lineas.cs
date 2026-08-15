
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
     ///t_lineas data access layer   
     ///</summary>
    public class Dalt_lineas : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _lin_ccodigo;
    
      private string _lin_crazonsocial;
    
      private string _lin_ccalle;
    
      private int _lin_inumero;
    
      private Decimal _lin_npiso;
    
      private string _lin_cdepartamento;
    
      private string _lin_clocalidad;
    
      private string _lin_cprovincia;
    
      private string _lin_cestado;
    
      private string _lin_ccodigopostal;
    
      private string _lin_ctelfono;
    
      private string _lin_cfax;
    
      private string _lin_cimagen;
    
      private string _lin_cusuario;
    
      private string _lin_cclave;
    
      private Decimal _lin_nacceso;
    
      private string _lin_cmail;
    
      private int _lin_iEnviaMailPorFalloTest;
    
      private int _lin_iAutoProcesa;
    
      private string _lin_cMetaData;
    
      private int _lin_iEscala;
    
      private int _lin_iOpnDespuesAlerta;
    
      private int _lin_iGeneraAlarmaPorDesactivacion;
    
      private int _lin_iOrganizacion;
    
      private int _lin_iControlaCierreDespuesDeApertura;
    
      private int _lin_iMinutosControlCDDA;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///lin_ccodigo   
     ///</summary>
      public string lin_ccodigo
      {
      
          get{ return this._lin_ccodigo; }
          set{ this._lin_ccodigo = value; }
        
      }
     ///<summary>
     ///lin_crazonsocial   
     ///</summary>
      public string lin_crazonsocial
      {
      
          get{ return this._lin_crazonsocial; }
          set{ this._lin_crazonsocial = value; }
        
      }
     ///<summary>
     ///lin_ccalle   
     ///</summary>
      public string lin_ccalle
      {
      
          get{ return this._lin_ccalle; }
          set{ this._lin_ccalle = value; }
        
      }
     ///<summary>
     ///lin_inumero   
     ///</summary>
      public int lin_inumero
      {
      
          get{ return this._lin_inumero; }
          set{ this._lin_inumero = value; }
        
      }
     ///<summary>
     ///lin_npiso   
     ///</summary>
      public Decimal lin_npiso
      {
      
          get{ return this._lin_npiso; }
          set{ this._lin_npiso = value; }
        
      }
     ///<summary>
     ///lin_cdepartamento   
     ///</summary>
      public string lin_cdepartamento
      {
      
          get{ return this._lin_cdepartamento; }
          set{ this._lin_cdepartamento = value; }
        
      }
     ///<summary>
     ///lin_clocalidad   
     ///</summary>
      public string lin_clocalidad
      {
      
          get{ return this._lin_clocalidad; }
          set{ this._lin_clocalidad = value; }
        
      }
     ///<summary>
     ///lin_cprovincia   
     ///</summary>
      public string lin_cprovincia
      {
      
          get{ return this._lin_cprovincia; }
          set{ this._lin_cprovincia = value; }
        
      }
     ///<summary>
     ///lin_cestado   
     ///</summary>
      public string lin_cestado
      {
      
          get{ return this._lin_cestado; }
          set{ this._lin_cestado = value; }
        
      }
     ///<summary>
     ///lin_ccodigopostal   
     ///</summary>
      public string lin_ccodigopostal
      {
      
          get{ return this._lin_ccodigopostal; }
          set{ this._lin_ccodigopostal = value; }
        
      }
     ///<summary>
     ///lin_ctelfono   
     ///</summary>
      public string lin_ctelfono
      {
      
          get{ return this._lin_ctelfono; }
          set{ this._lin_ctelfono = value; }
        
      }
     ///<summary>
     ///lin_cfax   
     ///</summary>
      public string lin_cfax
      {
      
          get{ return this._lin_cfax; }
          set{ this._lin_cfax = value; }
        
      }
     ///<summary>
     ///lin_cimagen   
     ///</summary>
      public string lin_cimagen
      {
      
          get{ return this._lin_cimagen; }
          set{ this._lin_cimagen = value; }
        
      }
     ///<summary>
     ///lin_cusuario   
     ///</summary>
      public string lin_cusuario
      {
      
          get{ return this._lin_cusuario; }
          set{ this._lin_cusuario = value; }
        
      }
     ///<summary>
     ///lin_cclave   
     ///</summary>
      public string lin_cclave
      {
      
          get{ return this._lin_cclave; }
          set{ this._lin_cclave = value; }
        
      }
     ///<summary>
     ///lin_nacceso   
     ///</summary>
      public Decimal lin_nacceso
      {
      
          get{ return this._lin_nacceso; }
          set{ this._lin_nacceso = value; }
        
      }
     ///<summary>
     ///lin_cmail   
     ///</summary>
      public string lin_cmail
      {
      
          get{ return this._lin_cmail; }
          set{ this._lin_cmail = value; }
        
      }
     ///<summary>
     ///lin_iEnviaMailPorFalloTest   
     ///</summary>
      public int lin_iEnviaMailPorFalloTest
      {
      
          get{ return this._lin_iEnviaMailPorFalloTest; }
          set{ this._lin_iEnviaMailPorFalloTest = value; }
        
      }
     ///<summary>
     ///lin_iAutoProcesa   
     ///</summary>
      public int lin_iAutoProcesa
      {
      
          get{ return this._lin_iAutoProcesa; }
          set{ this._lin_iAutoProcesa = value; }
        
      }
     ///<summary>
     ///lin_cMetaData   
     ///</summary>
      public string lin_cMetaData
      {
      
          get{ return this._lin_cMetaData; }
          set{ this._lin_cMetaData = value; }
        
      }
     ///<summary>
     ///lin_iEscala   
     ///</summary>
      public int lin_iEscala
      {
      
          get{ return this._lin_iEscala; }
          set{ this._lin_iEscala = value; }
        
      }
     ///<summary>
     ///lin_iOpnDespuesAlerta   
     ///</summary>
      public int lin_iOpnDespuesAlerta
      {
      
          get{ return this._lin_iOpnDespuesAlerta; }
          set{ this._lin_iOpnDespuesAlerta = value; }
        
      }
     ///<summary>
     ///lin_iGeneraAlarmaPorDesactivacion   
     ///</summary>
      public int lin_iGeneraAlarmaPorDesactivacion
      {
      
          get{ return this._lin_iGeneraAlarmaPorDesactivacion; }
          set{ this._lin_iGeneraAlarmaPorDesactivacion = value; }
        
      }
     ///<summary>
     ///lin_iOrganizacion   
     ///</summary>
      public int lin_iOrganizacion
      {
      
          get{ return this._lin_iOrganizacion; }
          set{ this._lin_iOrganizacion = value; }
        
      }
     ///<summary>
     ///lin_iControlaCierreDespuesDeApertura   
     ///</summary>
      public int lin_iControlaCierreDespuesDeApertura
      {
      
          get{ return this._lin_iControlaCierreDespuesDeApertura; }
          set{ this._lin_iControlaCierreDespuesDeApertura = value; }
        
      }
     ///<summary>
     ///lin_iMinutosControlCDDA   
     ///</summary>
      public int lin_iMinutosControlCDDA
      {
      
          get{ return this._lin_iMinutosControlCDDA; }
          set{ this._lin_iMinutosControlCDDA = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_lineas(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_lineas(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_lineas(SqlHelper SqlConfig, int UserId, Simplet_lineas Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._lin_ccodigo = Simple.lin_ccodigo;

      this._lin_crazonsocial = Simple.lin_crazonsocial;

      this._lin_ccalle = Simple.lin_ccalle;

      this._lin_inumero = Simple.lin_inumero;

      this._lin_npiso = Simple.lin_npiso;

      this._lin_cdepartamento = Simple.lin_cdepartamento;

      this._lin_clocalidad = Simple.lin_clocalidad;

      this._lin_cprovincia = Simple.lin_cprovincia;

      this._lin_cestado = Simple.lin_cestado;

      this._lin_ccodigopostal = Simple.lin_ccodigopostal;

      this._lin_ctelfono = Simple.lin_ctelfono;

      this._lin_cfax = Simple.lin_cfax;

      this._lin_cimagen = Simple.lin_cimagen;

      this._lin_cusuario = Simple.lin_cusuario;

      this._lin_cclave = Simple.lin_cclave;

      this._lin_nacceso = Simple.lin_nacceso;

      this._lin_cmail = Simple.lin_cmail;

      this._lin_iEnviaMailPorFalloTest = Simple.lin_iEnviaMailPorFalloTest;

      this._lin_iAutoProcesa = Simple.lin_iAutoProcesa;

      this._lin_cMetaData = Simple.lin_cMetaData;

      this._lin_iEscala = Simple.lin_iEscala;

      this._lin_iOpnDespuesAlerta = Simple.lin_iOpnDespuesAlerta;

      this._lin_iGeneraAlarmaPorDesactivacion = Simple.lin_iGeneraAlarmaPorDesactivacion;

      this._lin_iOrganizacion = Simple.lin_iOrganizacion;

      this._lin_iControlaCierreDespuesDeApertura = Simple.lin_iControlaCierreDespuesDeApertura;

      this._lin_iMinutosControlCDDA = Simple.lin_iMinutosControlCDDA;

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
    using(var cmd = new SqlCommand("t_lineasIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@lin_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_crazonsocial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_npiso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@lin_cdepartamento", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_clocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cprovincia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_cestado", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_ccodigopostal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_ctelfono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cfax", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cusuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_nacceso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@lin_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_iEnviaMailPorFalloTest", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iAutoProcesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_cMetaData", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_iEscala", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iOpnDespuesAlerta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iGeneraAlarmaPorDesactivacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iOrganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iControlaCierreDespuesDeApertura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iMinutosControlCDDA", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@lin_ccodigo"].Value = (this._lin_ccodigo == null) ? (object) DBNull.Value : (object) this._lin_ccodigo;

		cmd.Parameters["@lin_crazonsocial"].Value = (this._lin_crazonsocial == null) ? (object) DBNull.Value : (object) this._lin_crazonsocial;

		cmd.Parameters["@lin_ccalle"].Value = (this._lin_ccalle == null) ? (object) DBNull.Value : (object) this._lin_ccalle;

		cmd.Parameters["@lin_inumero"].Value = this._lin_inumero;

		cmd.Parameters["@lin_npiso"].Value = this._lin_npiso;

		cmd.Parameters["@lin_cdepartamento"].Value = (this._lin_cdepartamento == null) ? (object) DBNull.Value : (object) this._lin_cdepartamento;

		cmd.Parameters["@lin_clocalidad"].Value = (this._lin_clocalidad == null) ? (object) DBNull.Value : (object) this._lin_clocalidad;

		cmd.Parameters["@lin_cprovincia"].Value = (this._lin_cprovincia == null) ? (object) DBNull.Value : (object) this._lin_cprovincia;

		cmd.Parameters["@lin_cestado"].Value = (this._lin_cestado == null) ? (object) DBNull.Value : (object) this._lin_cestado;

		cmd.Parameters["@lin_ccodigopostal"].Value = (this._lin_ccodigopostal == null) ? (object) DBNull.Value : (object) this._lin_ccodigopostal;

		cmd.Parameters["@lin_ctelfono"].Value = (this._lin_ctelfono == null) ? (object) DBNull.Value : (object) this._lin_ctelfono;

		cmd.Parameters["@lin_cfax"].Value = (this._lin_cfax == null) ? (object) DBNull.Value : (object) this._lin_cfax;

		cmd.Parameters["@lin_cimagen"].Value = (this._lin_cimagen == null) ? (object) DBNull.Value : (object) this._lin_cimagen;

		cmd.Parameters["@lin_cusuario"].Value = (this._lin_cusuario == null) ? (object) DBNull.Value : (object) this._lin_cusuario;

		cmd.Parameters["@lin_cclave"].Value = (this._lin_cclave == null) ? (object) DBNull.Value : (object) this._lin_cclave;

		cmd.Parameters["@lin_nacceso"].Value = this._lin_nacceso;

		cmd.Parameters["@lin_cmail"].Value = (this._lin_cmail == null) ? (object) DBNull.Value : (object) this._lin_cmail;

		cmd.Parameters["@lin_iEnviaMailPorFalloTest"].Value = this._lin_iEnviaMailPorFalloTest;

		cmd.Parameters["@lin_iAutoProcesa"].Value = this._lin_iAutoProcesa;

		cmd.Parameters["@lin_cMetaData"].Value = (this._lin_cMetaData == null) ? (object) DBNull.Value : (object) this._lin_cMetaData;

		cmd.Parameters["@lin_iEscala"].Value = this._lin_iEscala;

		cmd.Parameters["@lin_iOpnDespuesAlerta"].Value = this._lin_iOpnDespuesAlerta;

		cmd.Parameters["@lin_iGeneraAlarmaPorDesactivacion"].Value = this._lin_iGeneraAlarmaPorDesactivacion;

		cmd.Parameters["@lin_iOrganizacion"].Value = this._lin_iOrganizacion;

		cmd.Parameters["@lin_iControlaCierreDespuesDeApertura"].Value = this._lin_iControlaCierreDespuesDeApertura;

		cmd.Parameters["@lin_iMinutosControlCDDA"].Value = this._lin_iMinutosControlCDDA;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_lineasUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@lin_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_crazonsocial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_npiso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@lin_cdepartamento", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_clocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cprovincia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_cestado", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_ccodigopostal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_ctelfono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cfax", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cusuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_nacceso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@lin_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_iEnviaMailPorFalloTest", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iAutoProcesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_cMetaData", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_iEscala", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iOpnDespuesAlerta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iGeneraAlarmaPorDesactivacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iOrganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iControlaCierreDespuesDeApertura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iMinutosControlCDDA", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@lin_ccodigo"].Value = (this._lin_ccodigo == null) ? (object) DBNull.Value : (object) this._lin_ccodigo;

		cmd.Parameters["@lin_crazonsocial"].Value = (this._lin_crazonsocial == null) ? (object) DBNull.Value : (object) this._lin_crazonsocial;

		cmd.Parameters["@lin_ccalle"].Value = (this._lin_ccalle == null) ? (object) DBNull.Value : (object) this._lin_ccalle;

		cmd.Parameters["@lin_inumero"].Value = this._lin_inumero;

		cmd.Parameters["@lin_npiso"].Value = this._lin_npiso;

		cmd.Parameters["@lin_cdepartamento"].Value = (this._lin_cdepartamento == null) ? (object) DBNull.Value : (object) this._lin_cdepartamento;

		cmd.Parameters["@lin_clocalidad"].Value = (this._lin_clocalidad == null) ? (object) DBNull.Value : (object) this._lin_clocalidad;

		cmd.Parameters["@lin_cprovincia"].Value = (this._lin_cprovincia == null) ? (object) DBNull.Value : (object) this._lin_cprovincia;

		cmd.Parameters["@lin_cestado"].Value = (this._lin_cestado == null) ? (object) DBNull.Value : (object) this._lin_cestado;

		cmd.Parameters["@lin_ccodigopostal"].Value = (this._lin_ccodigopostal == null) ? (object) DBNull.Value : (object) this._lin_ccodigopostal;

		cmd.Parameters["@lin_ctelfono"].Value = (this._lin_ctelfono == null) ? (object) DBNull.Value : (object) this._lin_ctelfono;

		cmd.Parameters["@lin_cfax"].Value = (this._lin_cfax == null) ? (object) DBNull.Value : (object) this._lin_cfax;

		cmd.Parameters["@lin_cimagen"].Value = (this._lin_cimagen == null) ? (object) DBNull.Value : (object) this._lin_cimagen;

		cmd.Parameters["@lin_cusuario"].Value = (this._lin_cusuario == null) ? (object) DBNull.Value : (object) this._lin_cusuario;

		cmd.Parameters["@lin_cclave"].Value = (this._lin_cclave == null) ? (object) DBNull.Value : (object) this._lin_cclave;

		cmd.Parameters["@lin_nacceso"].Value = this._lin_nacceso;

		cmd.Parameters["@lin_cmail"].Value = (this._lin_cmail == null) ? (object) DBNull.Value : (object) this._lin_cmail;

		cmd.Parameters["@lin_iEnviaMailPorFalloTest"].Value = this._lin_iEnviaMailPorFalloTest;

		cmd.Parameters["@lin_iAutoProcesa"].Value = this._lin_iAutoProcesa;

		cmd.Parameters["@lin_cMetaData"].Value = (this._lin_cMetaData == null) ? (object) DBNull.Value : (object) this._lin_cMetaData;

		cmd.Parameters["@lin_iEscala"].Value = this._lin_iEscala;

		cmd.Parameters["@lin_iOpnDespuesAlerta"].Value = this._lin_iOpnDespuesAlerta;

		cmd.Parameters["@lin_iGeneraAlarmaPorDesactivacion"].Value = this._lin_iGeneraAlarmaPorDesactivacion;

		cmd.Parameters["@lin_iOrganizacion"].Value = this._lin_iOrganizacion;

		cmd.Parameters["@lin_iControlaCierreDespuesDeApertura"].Value = this._lin_iControlaCierreDespuesDeApertura;

		cmd.Parameters["@lin_iMinutosControlCDDA"].Value = this._lin_iMinutosControlCDDA;

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
    throw new RuntimeException("The t_lineas is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_lineasDel", conn))
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
    using(var CmdSel = new SqlCommand("t_lineasSel", conn))
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
    Simplet_lineas Simple = new Simplet_lineas();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.lin_ccodigo = this._lin_ccodigo;

      Simple.lin_crazonsocial = this._lin_crazonsocial;

      Simple.lin_ccalle = this._lin_ccalle;

      Simple.lin_inumero = this._lin_inumero;

      Simple.lin_npiso = this._lin_npiso;

      Simple.lin_cdepartamento = this._lin_cdepartamento;

      Simple.lin_clocalidad = this._lin_clocalidad;

      Simple.lin_cprovincia = this._lin_cprovincia;

      Simple.lin_cestado = this._lin_cestado;

      Simple.lin_ccodigopostal = this._lin_ccodigopostal;

      Simple.lin_ctelfono = this._lin_ctelfono;

      Simple.lin_cfax = this._lin_cfax;

      Simple.lin_cimagen = this._lin_cimagen;

      Simple.lin_cusuario = this._lin_cusuario;

      Simple.lin_cclave = this._lin_cclave;

      Simple.lin_nacceso = this._lin_nacceso;

      Simple.lin_cmail = this._lin_cmail;

      Simple.lin_iEnviaMailPorFalloTest = this._lin_iEnviaMailPorFalloTest;

      Simple.lin_iAutoProcesa = this._lin_iAutoProcesa;

      Simple.lin_cMetaData = this._lin_cMetaData;

      Simple.lin_iEscala = this._lin_iEscala;

      Simple.lin_iOpnDespuesAlerta = this._lin_iOpnDespuesAlerta;

      Simple.lin_iGeneraAlarmaPorDesactivacion = this._lin_iGeneraAlarmaPorDesactivacion;

      Simple.lin_iOrganizacion = this._lin_iOrganizacion;

      Simple.lin_iControlaCierreDespuesDeApertura = this._lin_iControlaCierreDespuesDeApertura;

      Simple.lin_iMinutosControlCDDA = this._lin_iMinutosControlCDDA;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_lineas)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._lin_ccodigo = Simple.lin_ccodigo;

      this._lin_crazonsocial = Simple.lin_crazonsocial;

      this._lin_ccalle = Simple.lin_ccalle;

      this._lin_inumero = Simple.lin_inumero;

      this._lin_npiso = Simple.lin_npiso;

      this._lin_cdepartamento = Simple.lin_cdepartamento;

      this._lin_clocalidad = Simple.lin_clocalidad;

      this._lin_cprovincia = Simple.lin_cprovincia;

      this._lin_cestado = Simple.lin_cestado;

      this._lin_ccodigopostal = Simple.lin_ccodigopostal;

      this._lin_ctelfono = Simple.lin_ctelfono;

      this._lin_cfax = Simple.lin_cfax;

      this._lin_cimagen = Simple.lin_cimagen;

      this._lin_cusuario = Simple.lin_cusuario;

      this._lin_cclave = Simple.lin_cclave;

      this._lin_nacceso = Simple.lin_nacceso;

      this._lin_cmail = Simple.lin_cmail;

      this._lin_iEnviaMailPorFalloTest = Simple.lin_iEnviaMailPorFalloTest;

      this._lin_iAutoProcesa = Simple.lin_iAutoProcesa;

      this._lin_cMetaData = Simple.lin_cMetaData;

      this._lin_iEscala = Simple.lin_iEscala;

      this._lin_iOpnDespuesAlerta = Simple.lin_iOpnDespuesAlerta;

      this._lin_iGeneraAlarmaPorDesactivacion = Simple.lin_iGeneraAlarmaPorDesactivacion;

      this._lin_iOrganizacion = Simple.lin_iOrganizacion;

      this._lin_iControlaCierreDespuesDeApertura = Simple.lin_iControlaCierreDespuesDeApertura;

      this._lin_iMinutosControlCDDA = Simple.lin_iMinutosControlCDDA;

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
    Callert_lineas Caller = new Callert_lineas();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.lin_ccodigo = this._lin_ccodigo;

      Caller.lin_crazonsocial = this._lin_crazonsocial;

      Caller.lin_ccalle = this._lin_ccalle;

      Caller.lin_inumero = this._lin_inumero;

      Caller.lin_npiso = this._lin_npiso;

      Caller.lin_cdepartamento = this._lin_cdepartamento;

      Caller.lin_clocalidad = this._lin_clocalidad;

      Caller.lin_cprovincia = this._lin_cprovincia;

      Caller.lin_cestado = this._lin_cestado;

      Caller.lin_ccodigopostal = this._lin_ccodigopostal;

      Caller.lin_ctelfono = this._lin_ctelfono;

      Caller.lin_cfax = this._lin_cfax;

      Caller.lin_cimagen = this._lin_cimagen;

      Caller.lin_cusuario = this._lin_cusuario;

      Caller.lin_cclave = this._lin_cclave;

      Caller.lin_nacceso = this._lin_nacceso;

      Caller.lin_cmail = this._lin_cmail;

      Caller.lin_iEnviaMailPorFalloTest = this._lin_iEnviaMailPorFalloTest;

      Caller.lin_iAutoProcesa = this._lin_iAutoProcesa;

      Caller.lin_cMetaData = this._lin_cMetaData;

      Caller.lin_iEscala = this._lin_iEscala;

      Caller.lin_iOpnDespuesAlerta = this._lin_iOpnDespuesAlerta;

      Caller.lin_iGeneraAlarmaPorDesactivacion = this._lin_iGeneraAlarmaPorDesactivacion;

      Caller.lin_iOrganizacion = this._lin_iOrganizacion;

      Caller.lin_iControlaCierreDespuesDeApertura = this._lin_iControlaCierreDespuesDeApertura;

      Caller.lin_iMinutosControlCDDA = this._lin_iMinutosControlCDDA;

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
    
      dt.Columns.Add(new DataColumn("lin_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_crazonsocial", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_ccalle", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_inumero", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_npiso", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("lin_cdepartamento", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_clocalidad", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_cprovincia", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_cestado", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_ccodigopostal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_ctelfono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_cfax", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_cimagen", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_cusuario", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_cclave", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_nacceso", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("lin_cmail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_iEnviaMailPorFalloTest", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_iAutoProcesa", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_cMetaData", typeof (string)));
    
      dt.Columns.Add(new DataColumn("lin_iEscala", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_iOpnDespuesAlerta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_iGeneraAlarmaPorDesactivacion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_iOrganizacion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_iControlaCierreDespuesDeApertura", typeof (int)));
    
      dt.Columns.Add(new DataColumn("lin_iMinutosControlCDDA", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["lin_ccodigo"] = this._lin_ccodigo;

      dr["lin_crazonsocial"] = this._lin_crazonsocial;

      dr["lin_ccalle"] = this._lin_ccalle;

      dr["lin_inumero"] = this._lin_inumero;

      dr["lin_npiso"] = this._lin_npiso;

      dr["lin_cdepartamento"] = this._lin_cdepartamento;

      dr["lin_clocalidad"] = this._lin_clocalidad;

      dr["lin_cprovincia"] = this._lin_cprovincia;

      dr["lin_cestado"] = this._lin_cestado;

      dr["lin_ccodigopostal"] = this._lin_ccodigopostal;

      dr["lin_ctelfono"] = this._lin_ctelfono;

      dr["lin_cfax"] = this._lin_cfax;

      dr["lin_cimagen"] = this._lin_cimagen;

      dr["lin_cusuario"] = this._lin_cusuario;

      dr["lin_cclave"] = this._lin_cclave;

      dr["lin_nacceso"] = this._lin_nacceso;

      dr["lin_cmail"] = this._lin_cmail;

      dr["lin_iEnviaMailPorFalloTest"] = this._lin_iEnviaMailPorFalloTest;

      dr["lin_iAutoProcesa"] = this._lin_iAutoProcesa;

      dr["lin_cMetaData"] = this._lin_cMetaData;

      dr["lin_iEscala"] = this._lin_iEscala;

      dr["lin_iOpnDespuesAlerta"] = this._lin_iOpnDespuesAlerta;

      dr["lin_iGeneraAlarmaPorDesactivacion"] = this._lin_iGeneraAlarmaPorDesactivacion;

      dr["lin_iOrganizacion"] = this._lin_iOrganizacion;

      dr["lin_iControlaCierreDespuesDeApertura"] = this._lin_iControlaCierreDespuesDeApertura;

      dr["lin_iMinutosControlCDDA"] = this._lin_iMinutosControlCDDA;

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
    using(var CmdChilds = new SqlCommand("t_lineasByChildObject", conn))
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
    Simplet_lineas Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_lineasByChildObject", conn))
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
    Simple = new Simplet_lineas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.lin_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.lin_crazonsocial = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.lin_ccalle = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.lin_inumero = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.lin_npiso = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.lin_cdepartamento = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.lin_clocalidad = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.lin_cprovincia = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.lin_cestado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.lin_ccodigopostal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.lin_ctelfono = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.lin_cfax = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.lin_cimagen = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.lin_cusuario = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.lin_cclave = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.lin_nacceso = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.lin_cmail = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.lin_iEnviaMailPorFalloTest = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.lin_iAutoProcesa = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.lin_cMetaData = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.lin_iEscala = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.lin_iOpnDespuesAlerta = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.lin_iGeneraAlarmaPorDesactivacion = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.lin_iOrganizacion = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.lin_iControlaCierreDespuesDeApertura = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.lin_iMinutosControlCDDA = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);


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
    Simplet_lineas Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_lineas();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.lin_ccodigo = (Row["lin_ccodigo"] == DBNull.Value) ? "" : (string) Row["lin_ccodigo"];

Simple.lin_crazonsocial = (Row["lin_crazonsocial"] == DBNull.Value) ? "" : (string) Row["lin_crazonsocial"];

Simple.lin_ccalle = (Row["lin_ccalle"] == DBNull.Value) ? "" : (string) Row["lin_ccalle"];

Simple.lin_inumero = (Row["lin_inumero"] == DBNull.Value) ? 0 : (int) Row["lin_inumero"];

Simple.lin_npiso = (Row["lin_npiso"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["lin_npiso"];

Simple.lin_cdepartamento = (Row["lin_cdepartamento"] == DBNull.Value) ? "" : (string) Row["lin_cdepartamento"];

Simple.lin_clocalidad = (Row["lin_clocalidad"] == DBNull.Value) ? "" : (string) Row["lin_clocalidad"];

Simple.lin_cprovincia = (Row["lin_cprovincia"] == DBNull.Value) ? "" : (string) Row["lin_cprovincia"];

Simple.lin_cestado = (Row["lin_cestado"] == DBNull.Value) ? "" : (string) Row["lin_cestado"];

Simple.lin_ccodigopostal = (Row["lin_ccodigopostal"] == DBNull.Value) ? "" : (string) Row["lin_ccodigopostal"];

Simple.lin_ctelfono = (Row["lin_ctelfono"] == DBNull.Value) ? "" : (string) Row["lin_ctelfono"];

Simple.lin_cfax = (Row["lin_cfax"] == DBNull.Value) ? "" : (string) Row["lin_cfax"];

Simple.lin_cimagen = (Row["lin_cimagen"] == DBNull.Value) ? "" : (string) Row["lin_cimagen"];

Simple.lin_cusuario = (Row["lin_cusuario"] == DBNull.Value) ? "" : (string) Row["lin_cusuario"];

Simple.lin_cclave = (Row["lin_cclave"] == DBNull.Value) ? "" : (string) Row["lin_cclave"];

Simple.lin_nacceso = (Row["lin_nacceso"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["lin_nacceso"];

Simple.lin_cmail = (Row["lin_cmail"] == DBNull.Value) ? "" : (string) Row["lin_cmail"];

Simple.lin_iEnviaMailPorFalloTest = (Row["lin_iEnviaMailPorFalloTest"] == DBNull.Value) ? 0 : (int) Row["lin_iEnviaMailPorFalloTest"];

Simple.lin_iAutoProcesa = (Row["lin_iAutoProcesa"] == DBNull.Value) ? 0 : (int) Row["lin_iAutoProcesa"];

Simple.lin_cMetaData = (Row["lin_cMetaData"] == DBNull.Value) ? "" : (string) Row["lin_cMetaData"];

Simple.lin_iEscala = (Row["lin_iEscala"] == DBNull.Value) ? 0 : (int) Row["lin_iEscala"];

Simple.lin_iOpnDespuesAlerta = (Row["lin_iOpnDespuesAlerta"] == DBNull.Value) ? 0 : (int) Row["lin_iOpnDespuesAlerta"];

Simple.lin_iGeneraAlarmaPorDesactivacion = (Row["lin_iGeneraAlarmaPorDesactivacion"] == DBNull.Value) ? 0 : (int) Row["lin_iGeneraAlarmaPorDesactivacion"];

Simple.lin_iOrganizacion = (Row["lin_iOrganizacion"] == DBNull.Value) ? 0 : (int) Row["lin_iOrganizacion"];

Simple.lin_iControlaCierreDespuesDeApertura = (Row["lin_iControlaCierreDespuesDeApertura"] == DBNull.Value) ? 0 : (int) Row["lin_iControlaCierreDespuesDeApertura"];

Simple.lin_iMinutosControlCDDA = (Row["lin_iMinutosControlCDDA"] == DBNull.Value) ? 0 : (int) Row["lin_iMinutosControlCDDA"];


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
    using(var CmdParents = new SqlCommand("t_lineasByParentObject", conn))
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
    Simplet_lineas Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_lineasByParentObject", conn))
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
    Simple = new Simplet_lineas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.lin_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.lin_crazonsocial = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.lin_ccalle = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.lin_inumero = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.lin_npiso = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.lin_cdepartamento = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.lin_clocalidad = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.lin_cprovincia = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.lin_cestado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.lin_ccodigopostal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.lin_ctelfono = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.lin_cfax = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.lin_cimagen = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.lin_cusuario = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.lin_cclave = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.lin_nacceso = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.lin_cmail = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.lin_iEnviaMailPorFalloTest = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.lin_iAutoProcesa = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.lin_cMetaData = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.lin_iEscala = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.lin_iOpnDespuesAlerta = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.lin_iGeneraAlarmaPorDesactivacion = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.lin_iOrganizacion = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.lin_iControlaCierreDespuesDeApertura = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.lin_iMinutosControlCDDA = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);


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
    using (var CmdDataByName = new SqlCommand("t_lineasByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_lineasByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_lineasByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_lineasByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_lineasByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_lineas Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_lineasBySimplet_lineas", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@lin_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_crazonsocial", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_npiso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@lin_cdepartamento", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_clocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cprovincia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_cestado", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_ccodigopostal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@lin_ctelfono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cfax", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cusuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_nacceso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@lin_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_iEnviaMailPorFalloTest", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iAutoProcesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_cMetaData", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@lin_iEscala", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iOpnDespuesAlerta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iGeneraAlarmaPorDesactivacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iOrganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iControlaCierreDespuesDeApertura", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@lin_iMinutosControlCDDA", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@lin_ccodigo"].Value = (this._lin_ccodigo == null) ? (object) DBNull.Value : (object) this._lin_ccodigo;

		cmd.Parameters["@lin_crazonsocial"].Value = (this._lin_crazonsocial == null) ? (object) DBNull.Value : (object) this._lin_crazonsocial;

		cmd.Parameters["@lin_ccalle"].Value = (this._lin_ccalle == null) ? (object) DBNull.Value : (object) this._lin_ccalle;

		cmd.Parameters["@lin_inumero"].Value = this._lin_inumero;

		cmd.Parameters["@lin_npiso"].Value = this._lin_npiso;

		cmd.Parameters["@lin_cdepartamento"].Value = (this._lin_cdepartamento == null) ? (object) DBNull.Value : (object) this._lin_cdepartamento;

		cmd.Parameters["@lin_clocalidad"].Value = (this._lin_clocalidad == null) ? (object) DBNull.Value : (object) this._lin_clocalidad;

		cmd.Parameters["@lin_cprovincia"].Value = (this._lin_cprovincia == null) ? (object) DBNull.Value : (object) this._lin_cprovincia;

		cmd.Parameters["@lin_cestado"].Value = (this._lin_cestado == null) ? (object) DBNull.Value : (object) this._lin_cestado;

		cmd.Parameters["@lin_ccodigopostal"].Value = (this._lin_ccodigopostal == null) ? (object) DBNull.Value : (object) this._lin_ccodigopostal;

		cmd.Parameters["@lin_ctelfono"].Value = (this._lin_ctelfono == null) ? (object) DBNull.Value : (object) this._lin_ctelfono;

		cmd.Parameters["@lin_cfax"].Value = (this._lin_cfax == null) ? (object) DBNull.Value : (object) this._lin_cfax;

		cmd.Parameters["@lin_cimagen"].Value = (this._lin_cimagen == null) ? (object) DBNull.Value : (object) this._lin_cimagen;

		cmd.Parameters["@lin_cusuario"].Value = (this._lin_cusuario == null) ? (object) DBNull.Value : (object) this._lin_cusuario;

		cmd.Parameters["@lin_cclave"].Value = (this._lin_cclave == null) ? (object) DBNull.Value : (object) this._lin_cclave;

		cmd.Parameters["@lin_nacceso"].Value = this._lin_nacceso;

		cmd.Parameters["@lin_cmail"].Value = (this._lin_cmail == null) ? (object) DBNull.Value : (object) this._lin_cmail;

		cmd.Parameters["@lin_iEnviaMailPorFalloTest"].Value = this._lin_iEnviaMailPorFalloTest;

		cmd.Parameters["@lin_iAutoProcesa"].Value = this._lin_iAutoProcesa;

		cmd.Parameters["@lin_cMetaData"].Value = (this._lin_cMetaData == null) ? (object) DBNull.Value : (object) this._lin_cMetaData;

		cmd.Parameters["@lin_iEscala"].Value = this._lin_iEscala;

		cmd.Parameters["@lin_iOpnDespuesAlerta"].Value = this._lin_iOpnDespuesAlerta;

		cmd.Parameters["@lin_iGeneraAlarmaPorDesactivacion"].Value = this._lin_iGeneraAlarmaPorDesactivacion;

		cmd.Parameters["@lin_iOrganizacion"].Value = this._lin_iOrganizacion;

		cmd.Parameters["@lin_iControlaCierreDespuesDeApertura"].Value = this._lin_iControlaCierreDespuesDeApertura;

		cmd.Parameters["@lin_iMinutosControlCDDA"].Value = this._lin_iMinutosControlCDDA;


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
		 
		public IEnumerable<Simplet_lineas> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_lineasByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_lineas Simple = new Simplet_lineas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.lin_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.lin_crazonsocial = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.lin_ccalle = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.lin_inumero = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.lin_npiso = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.lin_cdepartamento = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.lin_clocalidad = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.lin_cprovincia = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.lin_cestado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.lin_ccodigopostal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.lin_ctelfono = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.lin_cfax = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.lin_cimagen = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.lin_cusuario = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.lin_cclave = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.lin_nacceso = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.lin_cmail = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.lin_iEnviaMailPorFalloTest = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.lin_iAutoProcesa = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.lin_cMetaData = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.lin_iEscala = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.lin_iOpnDespuesAlerta = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.lin_iGeneraAlarmaPorDesactivacion = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.lin_iOrganizacion = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.lin_iControlaCierreDespuesDeApertura = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.lin_iMinutosControlCDDA = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_lineas> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_lineasByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_lineas Simple = new Simplet_lineas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.lin_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.lin_crazonsocial = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.lin_ccalle = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.lin_inumero = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.lin_npiso = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.lin_cdepartamento = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.lin_clocalidad = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.lin_cprovincia = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.lin_cestado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.lin_ccodigopostal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.lin_ctelfono = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.lin_cfax = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.lin_cimagen = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.lin_cusuario = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.lin_cclave = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.lin_nacceso = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)Simple.lin_cmail = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.lin_iEnviaMailPorFalloTest = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.lin_iAutoProcesa = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.lin_cMetaData = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)Simple.lin_iEscala = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)Simple.lin_iOpnDespuesAlerta = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)Simple.lin_iGeneraAlarmaPorDesactivacion = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)Simple.lin_iOrganizacion = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)Simple.lin_iControlaCierreDespuesDeApertura = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)Simple.lin_iMinutosControlCDDA = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3090, "t_lineas");
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
    if (Reader.FieldCount > 2)this._lin_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._lin_crazonsocial = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._lin_ccalle = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._lin_inumero = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._lin_npiso = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)this._lin_cdepartamento = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._lin_clocalidad = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._lin_cprovincia = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._lin_cestado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._lin_ccodigopostal = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._lin_ctelfono = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._lin_cfax = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._lin_cimagen = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._lin_cusuario = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._lin_cclave = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._lin_nacceso = (Reader.IsDBNull(17)) ? new Decimal(0) : Reader.GetDecimal(17);
if (Reader.FieldCount > 18)this._lin_cmail = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)this._lin_iEnviaMailPorFalloTest = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)this._lin_iAutoProcesa = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)this._lin_cMetaData = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);
if (Reader.FieldCount > 22)this._lin_iEscala = (Reader.IsDBNull(22)) ? 0 : Reader.GetInt32(22);
if (Reader.FieldCount > 23)this._lin_iOpnDespuesAlerta = (Reader.IsDBNull(23)) ? 0 : Reader.GetInt32(23);
if (Reader.FieldCount > 24)this._lin_iGeneraAlarmaPorDesactivacion = (Reader.IsDBNull(24)) ? 0 : Reader.GetInt32(24);
if (Reader.FieldCount > 25)this._lin_iOrganizacion = (Reader.IsDBNull(25)) ? 0 : Reader.GetInt32(25);
if (Reader.FieldCount > 26)this._lin_iControlaCierreDespuesDeApertura = (Reader.IsDBNull(26)) ? 0 : Reader.GetInt32(26);
if (Reader.FieldCount > 27)this._lin_iMinutosControlCDDA = (Reader.IsDBNull(27)) ? 0 : Reader.GetInt32(27);

    }
    Reader.Close();
    }
   }
  
    }
  