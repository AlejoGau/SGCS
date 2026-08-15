
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
     ///m_CuentasXtraInfo data access layer   
     ///</summary>
    public class Dalm_CuentasXtraInfo : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _cue_iidcuenta;
    
      private string _cue_ccustom;
    
      private string _cue_cconfig;
    
      private int _cue_ilicenciassp;
    
      private int _cue_iImportancia;
    
      private int _cue_iteclado;
    
      private string _cue_cHoraAperturaAutomonitoreo;
    
      private string _cue_cHoraCierreAutomonitoreo ;
    
      private int _cue_ilicenciapar;
    
      private int _cue_iTipoServicio;
    
      private int _cue_iExcesoLimiteDia;
    
      private int _cue_iExcesoLimiteHora;
    
      private string _cue_cInstrucciones;
    
      private int _cue_iInstrMostrar;
    
      private int _cue_iVigiladoresVC;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cue_iidcuenta   
     ///</summary>
      public int cue_iidcuenta
      {
      
          get{ return this._cue_iidcuenta; }
          set{ this._cue_iidcuenta = value; }
        
      }
     ///<summary>
     ///cue_ccustom   
     ///</summary>
      public string cue_ccustom
      {
      
          get{ return this._cue_ccustom; }
          set{ this._cue_ccustom = value; }
        
      }
     ///<summary>
     ///cue_cconfig   
     ///</summary>
      public string cue_cconfig
      {
      
          get{ return this._cue_cconfig; }
          set{ this._cue_cconfig = value; }
        
      }
     ///<summary>
     ///cue_ilicenciassp   
     ///</summary>
      public int cue_ilicenciassp
      {
      
          get{ return this._cue_ilicenciassp; }
          set{ this._cue_ilicenciassp = value; }
        
      }
     ///<summary>
     ///cue_iImportancia   
     ///</summary>
      public int cue_iImportancia
      {
      
          get{ return this._cue_iImportancia; }
          set{ this._cue_iImportancia = value; }
        
      }
     ///<summary>
     ///cue_iteclado   
     ///</summary>
      public int cue_iteclado
      {
      
          get{ return this._cue_iteclado; }
          set{ this._cue_iteclado = value; }
        
      }
     ///<summary>
     ///cue_cHoraAperturaAutomonitoreo   
     ///</summary>
      public string cue_cHoraAperturaAutomonitoreo
      {
      
          get{ return this._cue_cHoraAperturaAutomonitoreo; }
          set{ this._cue_cHoraAperturaAutomonitoreo = value; }
        
      }
     ///<summary>
     ///cue_cHoraCierreAutomonitoreo    
     ///</summary>
      public string cue_cHoraCierreAutomonitoreo 
      {
      
          get{ return this._cue_cHoraCierreAutomonitoreo ; }
          set{ this._cue_cHoraCierreAutomonitoreo  = value; }
        
      }
     ///<summary>
     ///cue_ilicenciapar   
     ///</summary>
      public int cue_ilicenciapar
      {
      
          get{ return this._cue_ilicenciapar; }
          set{ this._cue_ilicenciapar = value; }
        
      }
     ///<summary>
     ///cue_iTipoServicio   
     ///</summary>
      public int cue_iTipoServicio
      {
      
          get{ return this._cue_iTipoServicio; }
          set{ this._cue_iTipoServicio = value; }
        
      }
     ///<summary>
     ///cue_iExcesoLimiteDia   
     ///</summary>
      public int cue_iExcesoLimiteDia
      {
      
          get{ return this._cue_iExcesoLimiteDia; }
          set{ this._cue_iExcesoLimiteDia = value; }
        
      }
     ///<summary>
     ///cue_iExcesoLimiteHora   
     ///</summary>
      public int cue_iExcesoLimiteHora
      {
      
          get{ return this._cue_iExcesoLimiteHora; }
          set{ this._cue_iExcesoLimiteHora = value; }
        
      }
     ///<summary>
     ///cue_cInstrucciones   
     ///</summary>
      public string cue_cInstrucciones
      {
      
          get{ return this._cue_cInstrucciones; }
          set{ this._cue_cInstrucciones = value; }
        
      }
     ///<summary>
     ///cue_iInstrMostrar   
     ///</summary>
      public int cue_iInstrMostrar
      {
      
          get{ return this._cue_iInstrMostrar; }
          set{ this._cue_iInstrMostrar = value; }
        
      }
     ///<summary>
     ///cue_iVigiladoresVC   
     ///</summary>
      public int cue_iVigiladoresVC
      {
      
          get{ return this._cue_iVigiladoresVC; }
          set{ this._cue_iVigiladoresVC = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_CuentasXtraInfo(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_CuentasXtraInfo(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_CuentasXtraInfo(SqlHelper SqlConfig, int UserId, Simplem_CuentasXtraInfo Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cue_iidcuenta = Simple.cue_iidcuenta;

      this._cue_ccustom = Simple.cue_ccustom;

      this._cue_cconfig = Simple.cue_cconfig;

      this._cue_ilicenciassp = Simple.cue_ilicenciassp;

      this._cue_iImportancia = Simple.cue_iImportancia;

      this._cue_iteclado = Simple.cue_iteclado;

      this._cue_cHoraAperturaAutomonitoreo = Simple.cue_cHoraAperturaAutomonitoreo;

      this._cue_cHoraCierreAutomonitoreo  = Simple.cue_cHoraCierreAutomonitoreo ;

      this._cue_ilicenciapar = Simple.cue_ilicenciapar;

      this._cue_iTipoServicio = Simple.cue_iTipoServicio;

      this._cue_iExcesoLimiteDia = Simple.cue_iExcesoLimiteDia;

      this._cue_iExcesoLimiteHora = Simple.cue_iExcesoLimiteHora;

      this._cue_cInstrucciones = Simple.cue_cInstrucciones;

      this._cue_iInstrMostrar = Simple.cue_iInstrMostrar;

      this._cue_iVigiladoresVC = Simple.cue_iVigiladoresVC;

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
    using(var cmd = new SqlCommand("m_CuentasXtraInfoIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cue_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_ccustom", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cconfig", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ilicenciassp", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iImportancia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iteclado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cHoraAperturaAutomonitoreo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cHoraCierreAutomonitoreo ", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ilicenciapar", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iTipoServicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iExcesoLimiteDia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iExcesoLimiteHora", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cInstrucciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_iInstrMostrar", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iVigiladoresVC", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cue_iidcuenta"].Value = this._cue_iidcuenta;

		cmd.Parameters["@cue_ccustom"].Value = (this._cue_ccustom == null) ? (object) DBNull.Value : (object) this._cue_ccustom;

		cmd.Parameters["@cue_cconfig"].Value = (this._cue_cconfig == null) ? (object) DBNull.Value : (object) this._cue_cconfig;

		cmd.Parameters["@cue_ilicenciassp"].Value = this._cue_ilicenciassp;

		cmd.Parameters["@cue_iImportancia"].Value = this._cue_iImportancia;

		cmd.Parameters["@cue_iteclado"].Value = this._cue_iteclado;

		cmd.Parameters["@cue_cHoraAperturaAutomonitoreo"].Value = (this._cue_cHoraAperturaAutomonitoreo == null) ? (object) DBNull.Value : (object) this._cue_cHoraAperturaAutomonitoreo;

		cmd.Parameters["@cue_cHoraCierreAutomonitoreo "].Value = (this._cue_cHoraCierreAutomonitoreo  == null) ? (object) DBNull.Value : (object) this._cue_cHoraCierreAutomonitoreo ;

		cmd.Parameters["@cue_ilicenciapar"].Value = this._cue_ilicenciapar;

		cmd.Parameters["@cue_iTipoServicio"].Value = this._cue_iTipoServicio;

		cmd.Parameters["@cue_iExcesoLimiteDia"].Value = this._cue_iExcesoLimiteDia;

		cmd.Parameters["@cue_iExcesoLimiteHora"].Value = this._cue_iExcesoLimiteHora;

		cmd.Parameters["@cue_cInstrucciones"].Value = (this._cue_cInstrucciones == null) ? (object) DBNull.Value : (object) this._cue_cInstrucciones;

		cmd.Parameters["@cue_iInstrMostrar"].Value = this._cue_iInstrMostrar;

		cmd.Parameters["@cue_iVigiladoresVC"].Value = this._cue_iVigiladoresVC;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_CuentasXtraInfoUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cue_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_ccustom", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cconfig", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ilicenciassp", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iImportancia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iteclado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cHoraAperturaAutomonitoreo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cHoraCierreAutomonitoreo ", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ilicenciapar", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iTipoServicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iExcesoLimiteDia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iExcesoLimiteHora", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cInstrucciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_iInstrMostrar", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iVigiladoresVC", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cue_iidcuenta"].Value = this._cue_iidcuenta;

		cmd.Parameters["@cue_ccustom"].Value = (this._cue_ccustom == null) ? (object) DBNull.Value : (object) this._cue_ccustom;

		cmd.Parameters["@cue_cconfig"].Value = (this._cue_cconfig == null) ? (object) DBNull.Value : (object) this._cue_cconfig;

		cmd.Parameters["@cue_ilicenciassp"].Value = this._cue_ilicenciassp;

		cmd.Parameters["@cue_iImportancia"].Value = this._cue_iImportancia;

		cmd.Parameters["@cue_iteclado"].Value = this._cue_iteclado;

		cmd.Parameters["@cue_cHoraAperturaAutomonitoreo"].Value = (this._cue_cHoraAperturaAutomonitoreo == null) ? (object) DBNull.Value : (object) this._cue_cHoraAperturaAutomonitoreo;

		cmd.Parameters["@cue_cHoraCierreAutomonitoreo "].Value = (this._cue_cHoraCierreAutomonitoreo  == null) ? (object) DBNull.Value : (object) this._cue_cHoraCierreAutomonitoreo ;

		cmd.Parameters["@cue_ilicenciapar"].Value = this._cue_ilicenciapar;

		cmd.Parameters["@cue_iTipoServicio"].Value = this._cue_iTipoServicio;

		cmd.Parameters["@cue_iExcesoLimiteDia"].Value = this._cue_iExcesoLimiteDia;

		cmd.Parameters["@cue_iExcesoLimiteHora"].Value = this._cue_iExcesoLimiteHora;

		cmd.Parameters["@cue_cInstrucciones"].Value = (this._cue_cInstrucciones == null) ? (object) DBNull.Value : (object) this._cue_cInstrucciones;

		cmd.Parameters["@cue_iInstrMostrar"].Value = this._cue_iInstrMostrar;

		cmd.Parameters["@cue_iVigiladoresVC"].Value = this._cue_iVigiladoresVC;

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
    throw new RuntimeException("The m_CuentasXtraInfo is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_CuentasXtraInfoDel", conn))
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
    using(var CmdSel = new SqlCommand("m_CuentasXtraInfoSel", conn))
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
    Simplem_CuentasXtraInfo Simple = new Simplem_CuentasXtraInfo();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cue_iidcuenta = this._cue_iidcuenta;

      Simple.cue_ccustom = this._cue_ccustom;

      Simple.cue_cconfig = this._cue_cconfig;

      Simple.cue_ilicenciassp = this._cue_ilicenciassp;

      Simple.cue_iImportancia = this._cue_iImportancia;

      Simple.cue_iteclado = this._cue_iteclado;

      Simple.cue_cHoraAperturaAutomonitoreo = this._cue_cHoraAperturaAutomonitoreo;

      Simple.cue_cHoraCierreAutomonitoreo  = this._cue_cHoraCierreAutomonitoreo ;

      Simple.cue_ilicenciapar = this._cue_ilicenciapar;

      Simple.cue_iTipoServicio = this._cue_iTipoServicio;

      Simple.cue_iExcesoLimiteDia = this._cue_iExcesoLimiteDia;

      Simple.cue_iExcesoLimiteHora = this._cue_iExcesoLimiteHora;

      Simple.cue_cInstrucciones = this._cue_cInstrucciones;

      Simple.cue_iInstrMostrar = this._cue_iInstrMostrar;

      Simple.cue_iVigiladoresVC = this._cue_iVigiladoresVC;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_CuentasXtraInfo)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cue_iidcuenta = Simple.cue_iidcuenta;

      this._cue_ccustom = Simple.cue_ccustom;

      this._cue_cconfig = Simple.cue_cconfig;

      this._cue_ilicenciassp = Simple.cue_ilicenciassp;

      this._cue_iImportancia = Simple.cue_iImportancia;

      this._cue_iteclado = Simple.cue_iteclado;

      this._cue_cHoraAperturaAutomonitoreo = Simple.cue_cHoraAperturaAutomonitoreo;

      this._cue_cHoraCierreAutomonitoreo  = Simple.cue_cHoraCierreAutomonitoreo ;

      this._cue_ilicenciapar = Simple.cue_ilicenciapar;

      this._cue_iTipoServicio = Simple.cue_iTipoServicio;

      this._cue_iExcesoLimiteDia = Simple.cue_iExcesoLimiteDia;

      this._cue_iExcesoLimiteHora = Simple.cue_iExcesoLimiteHora;

      this._cue_cInstrucciones = Simple.cue_cInstrucciones;

      this._cue_iInstrMostrar = Simple.cue_iInstrMostrar;

      this._cue_iVigiladoresVC = Simple.cue_iVigiladoresVC;

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
    Callerm_CuentasXtraInfo Caller = new Callerm_CuentasXtraInfo();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cue_iidcuenta = this._cue_iidcuenta;

      Caller.cue_ccustom = this._cue_ccustom;

      Caller.cue_cconfig = this._cue_cconfig;

      Caller.cue_ilicenciassp = this._cue_ilicenciassp;

      Caller.cue_iImportancia = this._cue_iImportancia;

      Caller.cue_iteclado = this._cue_iteclado;

      Caller.cue_cHoraAperturaAutomonitoreo = this._cue_cHoraAperturaAutomonitoreo;

      Caller.cue_cHoraCierreAutomonitoreo  = this._cue_cHoraCierreAutomonitoreo ;

      Caller.cue_ilicenciapar = this._cue_ilicenciapar;

      Caller.cue_iTipoServicio = this._cue_iTipoServicio;

      Caller.cue_iExcesoLimiteDia = this._cue_iExcesoLimiteDia;

      Caller.cue_iExcesoLimiteHora = this._cue_iExcesoLimiteHora;

      Caller.cue_cInstrucciones = this._cue_cInstrucciones;

      Caller.cue_iInstrMostrar = this._cue_iInstrMostrar;

      Caller.cue_iVigiladoresVC = this._cue_iVigiladoresVC;

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
    
      dt.Columns.Add(new DataColumn("cue_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_ccustom", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cconfig", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ilicenciassp", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_iImportancia", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_iteclado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_cHoraAperturaAutomonitoreo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_cHoraCierreAutomonitoreo ", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_ilicenciapar", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_iTipoServicio", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_iExcesoLimiteDia", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_iExcesoLimiteHora", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_cInstrucciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cue_iInstrMostrar", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cue_iVigiladoresVC", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cue_iidcuenta"] = this._cue_iidcuenta;

      dr["cue_ccustom"] = this._cue_ccustom;

      dr["cue_cconfig"] = this._cue_cconfig;

      dr["cue_ilicenciassp"] = this._cue_ilicenciassp;

      dr["cue_iImportancia"] = this._cue_iImportancia;

      dr["cue_iteclado"] = this._cue_iteclado;

      dr["cue_cHoraAperturaAutomonitoreo"] = this._cue_cHoraAperturaAutomonitoreo;

      dr["cue_cHoraCierreAutomonitoreo "] = this._cue_cHoraCierreAutomonitoreo ;

      dr["cue_ilicenciapar"] = this._cue_ilicenciapar;

      dr["cue_iTipoServicio"] = this._cue_iTipoServicio;

      dr["cue_iExcesoLimiteDia"] = this._cue_iExcesoLimiteDia;

      dr["cue_iExcesoLimiteHora"] = this._cue_iExcesoLimiteHora;

      dr["cue_cInstrucciones"] = this._cue_cInstrucciones;

      dr["cue_iInstrMostrar"] = this._cue_iInstrMostrar;

      dr["cue_iVigiladoresVC"] = this._cue_iVigiladoresVC;

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
    using(var CmdChilds = new SqlCommand("m_CuentasXtraInfoByChildObject", conn))
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
    Simplem_CuentasXtraInfo Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_CuentasXtraInfoByChildObject", conn))
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
    Simple = new Simplem_CuentasXtraInfo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cue_ccustom = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cconfig = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ilicenciassp = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cue_iImportancia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cue_iteclado = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cue_cHoraAperturaAutomonitoreo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_cHoraCierreAutomonitoreo  = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_ilicenciapar = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cue_iTipoServicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cue_iExcesoLimiteDia = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.cue_iExcesoLimiteHora = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.cue_cInstrucciones = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_iInstrMostrar = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.cue_iVigiladoresVC = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);


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
    Simplem_CuentasXtraInfo Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_CuentasXtraInfo();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cue_iidcuenta = (Row["cue_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["cue_iidcuenta"];

Simple.cue_ccustom = (Row["cue_ccustom"] == DBNull.Value) ? "" : (string) Row["cue_ccustom"];

Simple.cue_cconfig = (Row["cue_cconfig"] == DBNull.Value) ? "" : (string) Row["cue_cconfig"];

Simple.cue_ilicenciassp = (Row["cue_ilicenciassp"] == DBNull.Value) ? 0 : (int) Row["cue_ilicenciassp"];

Simple.cue_iImportancia = (Row["cue_iImportancia"] == DBNull.Value) ? 0 : (int) Row["cue_iImportancia"];

Simple.cue_iteclado = (Row["cue_iteclado"] == DBNull.Value) ? 0 : (int) Row["cue_iteclado"];

Simple.cue_cHoraAperturaAutomonitoreo = (Row["cue_cHoraAperturaAutomonitoreo"] == DBNull.Value) ? "" : (string) Row["cue_cHoraAperturaAutomonitoreo"];

Simple.cue_cHoraCierreAutomonitoreo  = (Row["cue_cHoraCierreAutomonitoreo "] == DBNull.Value) ? "" : (string) Row["cue_cHoraCierreAutomonitoreo "];

Simple.cue_ilicenciapar = (Row["cue_ilicenciapar"] == DBNull.Value) ? 0 : (int) Row["cue_ilicenciapar"];

Simple.cue_iTipoServicio = (Row["cue_iTipoServicio"] == DBNull.Value) ? 0 : (int) Row["cue_iTipoServicio"];

Simple.cue_iExcesoLimiteDia = (Row["cue_iExcesoLimiteDia"] == DBNull.Value) ? 0 : (int) Row["cue_iExcesoLimiteDia"];

Simple.cue_iExcesoLimiteHora = (Row["cue_iExcesoLimiteHora"] == DBNull.Value) ? 0 : (int) Row["cue_iExcesoLimiteHora"];

Simple.cue_cInstrucciones = (Row["cue_cInstrucciones"] == DBNull.Value) ? "" : (string) Row["cue_cInstrucciones"];

Simple.cue_iInstrMostrar = (Row["cue_iInstrMostrar"] == DBNull.Value) ? 0 : (int) Row["cue_iInstrMostrar"];

Simple.cue_iVigiladoresVC = (Row["cue_iVigiladoresVC"] == DBNull.Value) ? 0 : (int) Row["cue_iVigiladoresVC"];


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
    using(var CmdParents = new SqlCommand("m_CuentasXtraInfoByParentObject", conn))
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
    Simplem_CuentasXtraInfo Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_CuentasXtraInfoByParentObject", conn))
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
    Simple = new Simplem_CuentasXtraInfo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cue_ccustom = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cconfig = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ilicenciassp = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cue_iImportancia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cue_iteclado = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cue_cHoraAperturaAutomonitoreo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_cHoraCierreAutomonitoreo  = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_ilicenciapar = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cue_iTipoServicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cue_iExcesoLimiteDia = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.cue_iExcesoLimiteHora = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.cue_cInstrucciones = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_iInstrMostrar = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.cue_iVigiladoresVC = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);


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
    using (var CmdDataByName = new SqlCommand("m_CuentasXtraInfoByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_CuentasXtraInfoByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_CuentasXtraInfoByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_CuentasXtraInfoByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_CuentasXtraInfoByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_CuentasXtraInfo Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_CuentasXtraInfoBySimplem_CuentasXtraInfo", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cue_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_ccustom", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_cconfig", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_ilicenciassp", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iImportancia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iteclado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cHoraAperturaAutomonitoreo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_cHoraCierreAutomonitoreo ", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cue_ilicenciapar", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iTipoServicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iExcesoLimiteDia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iExcesoLimiteHora", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_cInstrucciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cue_iInstrMostrar", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cue_iVigiladoresVC", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cue_iidcuenta"].Value = this._cue_iidcuenta;

		cmd.Parameters["@cue_ccustom"].Value = (this._cue_ccustom == null) ? (object) DBNull.Value : (object) this._cue_ccustom;

		cmd.Parameters["@cue_cconfig"].Value = (this._cue_cconfig == null) ? (object) DBNull.Value : (object) this._cue_cconfig;

		cmd.Parameters["@cue_ilicenciassp"].Value = this._cue_ilicenciassp;

		cmd.Parameters["@cue_iImportancia"].Value = this._cue_iImportancia;

		cmd.Parameters["@cue_iteclado"].Value = this._cue_iteclado;

		cmd.Parameters["@cue_cHoraAperturaAutomonitoreo"].Value = (this._cue_cHoraAperturaAutomonitoreo == null) ? (object) DBNull.Value : (object) this._cue_cHoraAperturaAutomonitoreo;

		cmd.Parameters["@cue_cHoraCierreAutomonitoreo "].Value = (this._cue_cHoraCierreAutomonitoreo  == null) ? (object) DBNull.Value : (object) this._cue_cHoraCierreAutomonitoreo ;

		cmd.Parameters["@cue_ilicenciapar"].Value = this._cue_ilicenciapar;

		cmd.Parameters["@cue_iTipoServicio"].Value = this._cue_iTipoServicio;

		cmd.Parameters["@cue_iExcesoLimiteDia"].Value = this._cue_iExcesoLimiteDia;

		cmd.Parameters["@cue_iExcesoLimiteHora"].Value = this._cue_iExcesoLimiteHora;

		cmd.Parameters["@cue_cInstrucciones"].Value = (this._cue_cInstrucciones == null) ? (object) DBNull.Value : (object) this._cue_cInstrucciones;

		cmd.Parameters["@cue_iInstrMostrar"].Value = this._cue_iInstrMostrar;

		cmd.Parameters["@cue_iVigiladoresVC"].Value = this._cue_iVigiladoresVC;


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
		 
		public IEnumerable<Simplem_CuentasXtraInfo> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_CuentasXtraInfoByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_CuentasXtraInfo Simple = new Simplem_CuentasXtraInfo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cue_ccustom = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cconfig = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ilicenciassp = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cue_iImportancia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cue_iteclado = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cue_cHoraAperturaAutomonitoreo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_cHoraCierreAutomonitoreo  = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_ilicenciapar = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cue_iTipoServicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cue_iExcesoLimiteDia = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.cue_iExcesoLimiteHora = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.cue_cInstrucciones = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_iInstrMostrar = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.cue_iVigiladoresVC = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_CuentasXtraInfo> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_CuentasXtraInfoByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_CuentasXtraInfo Simple = new Simplem_CuentasXtraInfo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cue_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cue_ccustom = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cue_cconfig = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cue_ilicenciassp = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cue_iImportancia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cue_iteclado = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cue_cHoraAperturaAutomonitoreo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cue_cHoraCierreAutomonitoreo  = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.cue_ilicenciapar = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cue_iTipoServicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cue_iExcesoLimiteDia = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.cue_iExcesoLimiteHora = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.cue_cInstrucciones = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cue_iInstrMostrar = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.cue_iVigiladoresVC = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3127, "m_CuentasXtraInfo");
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
    if (Reader.FieldCount > 2)this._cue_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._cue_ccustom = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._cue_cconfig = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._cue_ilicenciassp = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._cue_iImportancia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._cue_iteclado = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._cue_cHoraAperturaAutomonitoreo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._cue_cHoraCierreAutomonitoreo  = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._cue_ilicenciapar = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._cue_iTipoServicio = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._cue_iExcesoLimiteDia = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._cue_iExcesoLimiteHora = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)this._cue_cInstrucciones = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._cue_iInstrMostrar = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)this._cue_iVigiladoresVC = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);

    }
    Reader.Close();
    }
   }
  
    }
  