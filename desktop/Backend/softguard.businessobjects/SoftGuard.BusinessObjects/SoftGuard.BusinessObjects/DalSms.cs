
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
     ///Sms data access layer   
     ///</summary>
    public class DalSms : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _sms_iidcuenta;
    
      private string _sms_meventos;
    
      private string _sms_csmsparaeventos;
    
      private int _sms_imodemsms;
    
      private string _sms_cplantillasms;
    
      private string _sms_cmailparaeventos;
    
      private string _sms_cplantillamail;
    
      private int _sms_inotificaralertas;
    
      private string _sms_cplantillapush;
    
      private string _sms_cidspushsmartpanic;
    
      private string _sms_cDescripcion;
    
      private int _sms_iGrupoAlarmas;
    
      private string _sms_czona;
    
      private int _sms_iEventosSP;
    
      private string _sms_cSonido;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///sms_iidcuenta   
     ///</summary>
      public int sms_iidcuenta
      {
      
          get{ return this._sms_iidcuenta; }
          set{ this._sms_iidcuenta = value; }
        
      }
     ///<summary>
     ///sms_meventos   
     ///</summary>
      public string sms_meventos
      {
      
          get{ return this._sms_meventos; }
          set{ this._sms_meventos = value; }
        
      }
     ///<summary>
     ///sms_csmsparaeventos   
     ///</summary>
      public string sms_csmsparaeventos
      {
      
          get{ return this._sms_csmsparaeventos; }
          set{ this._sms_csmsparaeventos = value; }
        
      }
     ///<summary>
     ///sms_imodemsms   
     ///</summary>
      public int sms_imodemsms
      {
      
          get{ return this._sms_imodemsms; }
          set{ this._sms_imodemsms = value; }
        
      }
     ///<summary>
     ///sms_cplantillasms   
     ///</summary>
      public string sms_cplantillasms
      {
      
          get{ return this._sms_cplantillasms; }
          set{ this._sms_cplantillasms = value; }
        
      }
     ///<summary>
     ///sms_cmailparaeventos   
     ///</summary>
      public string sms_cmailparaeventos
      {
      
          get{ return this._sms_cmailparaeventos; }
          set{ this._sms_cmailparaeventos = value; }
        
      }
     ///<summary>
     ///sms_cplantillamail   
     ///</summary>
      public string sms_cplantillamail
      {
      
          get{ return this._sms_cplantillamail; }
          set{ this._sms_cplantillamail = value; }
        
      }
     ///<summary>
     ///sms_inotificaralertas   
     ///</summary>
      public int sms_inotificaralertas
      {
      
          get{ return this._sms_inotificaralertas; }
          set{ this._sms_inotificaralertas = value; }
        
      }
     ///<summary>
     ///sms_cplantillapush   
     ///</summary>
      public string sms_cplantillapush
      {
      
          get{ return this._sms_cplantillapush; }
          set{ this._sms_cplantillapush = value; }
        
      }
     ///<summary>
     ///sms_cidspushsmartpanic   
     ///</summary>
      public string sms_cidspushsmartpanic
      {
      
          get{ return this._sms_cidspushsmartpanic; }
          set{ this._sms_cidspushsmartpanic = value; }
        
      }
     ///<summary>
     ///sms_cDescripcion   
     ///</summary>
      public string sms_cDescripcion
      {
      
          get{ return this._sms_cDescripcion; }
          set{ this._sms_cDescripcion = value; }
        
      }
     ///<summary>
     ///sms_iGrupoAlarmas   
     ///</summary>
      public int sms_iGrupoAlarmas
      {
      
          get{ return this._sms_iGrupoAlarmas; }
          set{ this._sms_iGrupoAlarmas = value; }
        
      }
     ///<summary>
     ///sms_czona   
     ///</summary>
      public string sms_czona
      {
      
          get{ return this._sms_czona; }
          set{ this._sms_czona = value; }
        
      }
     ///<summary>
     ///sms_iEventosSP   
     ///</summary>
      public int sms_iEventosSP
      {
      
          get{ return this._sms_iEventosSP; }
          set{ this._sms_iEventosSP = value; }
        
      }
     ///<summary>
     ///sms_cSonido   
     ///</summary>
      public string sms_cSonido
      {
      
          get{ return this._sms_cSonido; }
          set{ this._sms_cSonido = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSms(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSms(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSms(SqlHelper SqlConfig, int UserId, SimpleSms Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sms_iidcuenta = Simple.sms_iidcuenta;

      this._sms_meventos = Simple.sms_meventos;

      this._sms_csmsparaeventos = Simple.sms_csmsparaeventos;

      this._sms_imodemsms = Simple.sms_imodemsms;

      this._sms_cplantillasms = Simple.sms_cplantillasms;

      this._sms_cmailparaeventos = Simple.sms_cmailparaeventos;

      this._sms_cplantillamail = Simple.sms_cplantillamail;

      this._sms_inotificaralertas = Simple.sms_inotificaralertas;

      this._sms_cplantillapush = Simple.sms_cplantillapush;

      this._sms_cidspushsmartpanic = Simple.sms_cidspushsmartpanic;

      this._sms_cDescripcion = Simple.sms_cDescripcion;

      this._sms_iGrupoAlarmas = Simple.sms_iGrupoAlarmas;

      this._sms_czona = Simple.sms_czona;

      this._sms_iEventosSP = Simple.sms_iEventosSP;

      this._sms_cSonido = Simple.sms_cSonido;

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
    using(var cmd = new SqlCommand("SmsIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sms_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_meventos", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@sms_csmsparaeventos", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_imodemsms", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cplantillasms", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_cmailparaeventos", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_cplantillamail", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_inotificaralertas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cplantillapush", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_cidspushsmartpanic", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_iGrupoAlarmas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_iEventosSP", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cSonido", SqlDbType.NChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sms_iidcuenta"].Value = this._sms_iidcuenta;

		cmd.Parameters["@sms_meventos"].Value = (this._sms_meventos == null) ? (object) DBNull.Value : (object) this._sms_meventos;

		cmd.Parameters["@sms_csmsparaeventos"].Value = (this._sms_csmsparaeventos == null) ? (object) DBNull.Value : (object) this._sms_csmsparaeventos;

		cmd.Parameters["@sms_imodemsms"].Value = this._sms_imodemsms;

		cmd.Parameters["@sms_cplantillasms"].Value = (this._sms_cplantillasms == null) ? (object) DBNull.Value : (object) this._sms_cplantillasms;

		cmd.Parameters["@sms_cmailparaeventos"].Value = (this._sms_cmailparaeventos == null) ? (object) DBNull.Value : (object) this._sms_cmailparaeventos;

		cmd.Parameters["@sms_cplantillamail"].Value = (this._sms_cplantillamail == null) ? (object) DBNull.Value : (object) this._sms_cplantillamail;

		cmd.Parameters["@sms_inotificaralertas"].Value = this._sms_inotificaralertas;

		cmd.Parameters["@sms_cplantillapush"].Value = (this._sms_cplantillapush == null) ? (object) DBNull.Value : (object) this._sms_cplantillapush;

		cmd.Parameters["@sms_cidspushsmartpanic"].Value = (this._sms_cidspushsmartpanic == null) ? (object) DBNull.Value : (object) this._sms_cidspushsmartpanic;

		cmd.Parameters["@sms_cDescripcion"].Value = (this._sms_cDescripcion == null) ? (object) DBNull.Value : (object) this._sms_cDescripcion;

		cmd.Parameters["@sms_iGrupoAlarmas"].Value = this._sms_iGrupoAlarmas;

		cmd.Parameters["@sms_czona"].Value = (this._sms_czona == null) ? (object) DBNull.Value : (object) this._sms_czona;

		cmd.Parameters["@sms_iEventosSP"].Value = this._sms_iEventosSP;

		cmd.Parameters["@sms_cSonido"].Value = (this._sms_cSonido == null) ? (object) DBNull.Value : (object) this._sms_cSonido;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SmsUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sms_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_meventos", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@sms_csmsparaeventos", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_imodemsms", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cplantillasms", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_cmailparaeventos", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_cplantillamail", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_inotificaralertas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cplantillapush", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_cidspushsmartpanic", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_iGrupoAlarmas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_iEventosSP", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cSonido", SqlDbType.NChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sms_iidcuenta"].Value = this._sms_iidcuenta;

		cmd.Parameters["@sms_meventos"].Value = (this._sms_meventos == null) ? (object) DBNull.Value : (object) this._sms_meventos;

		cmd.Parameters["@sms_csmsparaeventos"].Value = (this._sms_csmsparaeventos == null) ? (object) DBNull.Value : (object) this._sms_csmsparaeventos;

		cmd.Parameters["@sms_imodemsms"].Value = this._sms_imodemsms;

		cmd.Parameters["@sms_cplantillasms"].Value = (this._sms_cplantillasms == null) ? (object) DBNull.Value : (object) this._sms_cplantillasms;

		cmd.Parameters["@sms_cmailparaeventos"].Value = (this._sms_cmailparaeventos == null) ? (object) DBNull.Value : (object) this._sms_cmailparaeventos;

		cmd.Parameters["@sms_cplantillamail"].Value = (this._sms_cplantillamail == null) ? (object) DBNull.Value : (object) this._sms_cplantillamail;

		cmd.Parameters["@sms_inotificaralertas"].Value = this._sms_inotificaralertas;

		cmd.Parameters["@sms_cplantillapush"].Value = (this._sms_cplantillapush == null) ? (object) DBNull.Value : (object) this._sms_cplantillapush;

		cmd.Parameters["@sms_cidspushsmartpanic"].Value = (this._sms_cidspushsmartpanic == null) ? (object) DBNull.Value : (object) this._sms_cidspushsmartpanic;

		cmd.Parameters["@sms_cDescripcion"].Value = (this._sms_cDescripcion == null) ? (object) DBNull.Value : (object) this._sms_cDescripcion;

		cmd.Parameters["@sms_iGrupoAlarmas"].Value = this._sms_iGrupoAlarmas;

		cmd.Parameters["@sms_czona"].Value = (this._sms_czona == null) ? (object) DBNull.Value : (object) this._sms_czona;

		cmd.Parameters["@sms_iEventosSP"].Value = this._sms_iEventosSP;

		cmd.Parameters["@sms_cSonido"].Value = (this._sms_cSonido == null) ? (object) DBNull.Value : (object) this._sms_cSonido;

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
    throw new RuntimeException("The Sms is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("SmsDel", conn))
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
    using(var CmdSel = new SqlCommand("SmsSel", conn))
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
    SimpleSms Simple = new SimpleSms();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.sms_iidcuenta = this._sms_iidcuenta;

      Simple.sms_meventos = this._sms_meventos;

      Simple.sms_csmsparaeventos = this._sms_csmsparaeventos;

      Simple.sms_imodemsms = this._sms_imodemsms;

      Simple.sms_cplantillasms = this._sms_cplantillasms;

      Simple.sms_cmailparaeventos = this._sms_cmailparaeventos;

      Simple.sms_cplantillamail = this._sms_cplantillamail;

      Simple.sms_inotificaralertas = this._sms_inotificaralertas;

      Simple.sms_cplantillapush = this._sms_cplantillapush;

      Simple.sms_cidspushsmartpanic = this._sms_cidspushsmartpanic;

      Simple.sms_cDescripcion = this._sms_cDescripcion;

      Simple.sms_iGrupoAlarmas = this._sms_iGrupoAlarmas;

      Simple.sms_czona = this._sms_czona;

      Simple.sms_iEventosSP = this._sms_iEventosSP;

      Simple.sms_cSonido = this._sms_cSonido;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleSms)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sms_iidcuenta = Simple.sms_iidcuenta;

      this._sms_meventos = Simple.sms_meventos;

      this._sms_csmsparaeventos = Simple.sms_csmsparaeventos;

      this._sms_imodemsms = Simple.sms_imodemsms;

      this._sms_cplantillasms = Simple.sms_cplantillasms;

      this._sms_cmailparaeventos = Simple.sms_cmailparaeventos;

      this._sms_cplantillamail = Simple.sms_cplantillamail;

      this._sms_inotificaralertas = Simple.sms_inotificaralertas;

      this._sms_cplantillapush = Simple.sms_cplantillapush;

      this._sms_cidspushsmartpanic = Simple.sms_cidspushsmartpanic;

      this._sms_cDescripcion = Simple.sms_cDescripcion;

      this._sms_iGrupoAlarmas = Simple.sms_iGrupoAlarmas;

      this._sms_czona = Simple.sms_czona;

      this._sms_iEventosSP = Simple.sms_iEventosSP;

      this._sms_cSonido = Simple.sms_cSonido;

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
    CallerSms Caller = new CallerSms();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.sms_iidcuenta = this._sms_iidcuenta;

      Caller.sms_meventos = this._sms_meventos;

      Caller.sms_csmsparaeventos = this._sms_csmsparaeventos;

      Caller.sms_imodemsms = this._sms_imodemsms;

      Caller.sms_cplantillasms = this._sms_cplantillasms;

      Caller.sms_cmailparaeventos = this._sms_cmailparaeventos;

      Caller.sms_cplantillamail = this._sms_cplantillamail;

      Caller.sms_inotificaralertas = this._sms_inotificaralertas;

      Caller.sms_cplantillapush = this._sms_cplantillapush;

      Caller.sms_cidspushsmartpanic = this._sms_cidspushsmartpanic;

      Caller.sms_cDescripcion = this._sms_cDescripcion;

      Caller.sms_iGrupoAlarmas = this._sms_iGrupoAlarmas;

      Caller.sms_czona = this._sms_czona;

      Caller.sms_iEventosSP = this._sms_iEventosSP;

      Caller.sms_cSonido = this._sms_cSonido;

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
    
      dt.Columns.Add(new DataColumn("sms_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sms_meventos", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_csmsparaeventos", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_imodemsms", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sms_cplantillasms", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_cmailparaeventos", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_cplantillamail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_inotificaralertas", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sms_cplantillapush", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_cidspushsmartpanic", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_cDescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_iGrupoAlarmas", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sms_czona", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_iEventosSP", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sms_cSonido", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["sms_iidcuenta"] = this._sms_iidcuenta;

      dr["sms_meventos"] = this._sms_meventos;

      dr["sms_csmsparaeventos"] = this._sms_csmsparaeventos;

      dr["sms_imodemsms"] = this._sms_imodemsms;

      dr["sms_cplantillasms"] = this._sms_cplantillasms;

      dr["sms_cmailparaeventos"] = this._sms_cmailparaeventos;

      dr["sms_cplantillamail"] = this._sms_cplantillamail;

      dr["sms_inotificaralertas"] = this._sms_inotificaralertas;

      dr["sms_cplantillapush"] = this._sms_cplantillapush;

      dr["sms_cidspushsmartpanic"] = this._sms_cidspushsmartpanic;

      dr["sms_cDescripcion"] = this._sms_cDescripcion;

      dr["sms_iGrupoAlarmas"] = this._sms_iGrupoAlarmas;

      dr["sms_czona"] = this._sms_czona;

      dr["sms_iEventosSP"] = this._sms_iEventosSP;

      dr["sms_cSonido"] = this._sms_cSonido;

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
    using(var CmdChilds = new SqlCommand("SmsByChildObject", conn))
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
    SimpleSms Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("SmsByChildObject", conn))
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
    Simple = new SimpleSms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_meventos = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_csmsparaeventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sms_imodemsms = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.sms_cplantillasms = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_cmailparaeventos = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.sms_cplantillamail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_inotificaralertas = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.sms_cplantillapush = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sms_cidspushsmartpanic = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sms_cDescripcion = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.sms_iGrupoAlarmas = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.sms_czona = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.sms_iEventosSP = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.sms_cSonido = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);


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
    SimpleSms Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleSms();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.sms_iidcuenta = (Row["sms_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["sms_iidcuenta"];

Simple.sms_meventos = (Row["sms_meventos"] == DBNull.Value) ? "" : (string) Row["sms_meventos"];

Simple.sms_csmsparaeventos = (Row["sms_csmsparaeventos"] == DBNull.Value) ? "" : (string) Row["sms_csmsparaeventos"];

Simple.sms_imodemsms = (Row["sms_imodemsms"] == DBNull.Value) ? 0 : (int) Row["sms_imodemsms"];

Simple.sms_cplantillasms = (Row["sms_cplantillasms"] == DBNull.Value) ? "" : (string) Row["sms_cplantillasms"];

Simple.sms_cmailparaeventos = (Row["sms_cmailparaeventos"] == DBNull.Value) ? "" : (string) Row["sms_cmailparaeventos"];

Simple.sms_cplantillamail = (Row["sms_cplantillamail"] == DBNull.Value) ? "" : (string) Row["sms_cplantillamail"];

Simple.sms_inotificaralertas = (Row["sms_inotificaralertas"] == DBNull.Value) ? 0 : (int) Row["sms_inotificaralertas"];

Simple.sms_cplantillapush = (Row["sms_cplantillapush"] == DBNull.Value) ? "" : (string) Row["sms_cplantillapush"];

Simple.sms_cidspushsmartpanic = (Row["sms_cidspushsmartpanic"] == DBNull.Value) ? "" : (string) Row["sms_cidspushsmartpanic"];

Simple.sms_cDescripcion = (Row["sms_cDescripcion"] == DBNull.Value) ? "" : (string) Row["sms_cDescripcion"];

Simple.sms_iGrupoAlarmas = (Row["sms_iGrupoAlarmas"] == DBNull.Value) ? 0 : (int) Row["sms_iGrupoAlarmas"];

Simple.sms_czona = (Row["sms_czona"] == DBNull.Value) ? "" : (string) Row["sms_czona"];

Simple.sms_iEventosSP = (Row["sms_iEventosSP"] == DBNull.Value) ? 0 : (int) Row["sms_iEventosSP"];

Simple.sms_cSonido = (Row["sms_cSonido"] == DBNull.Value) ? "" : (string) Row["sms_cSonido"];


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
    using(var CmdParents = new SqlCommand("SmsByParentObject", conn))
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
    SimpleSms Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("SmsByParentObject", conn))
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
    Simple = new SimpleSms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_meventos = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_csmsparaeventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sms_imodemsms = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.sms_cplantillasms = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_cmailparaeventos = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.sms_cplantillamail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_inotificaralertas = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.sms_cplantillapush = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sms_cidspushsmartpanic = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sms_cDescripcion = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.sms_iGrupoAlarmas = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.sms_czona = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.sms_iEventosSP = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.sms_cSonido = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);


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
    using (var CmdDataByName = new SqlCommand("SmsByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("SmsByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("SmsByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("SmsByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("SmsByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleSms Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SmsBySimpleSms", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@sms_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_meventos", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@sms_csmsparaeventos", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_imodemsms", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cplantillasms", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_cmailparaeventos", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_cplantillamail", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_inotificaralertas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cplantillapush", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_cidspushsmartpanic", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_iGrupoAlarmas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@sms_iEventosSP", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cSonido", SqlDbType.NChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@sms_iidcuenta"].Value = this._sms_iidcuenta;

		cmd.Parameters["@sms_meventos"].Value = (this._sms_meventos == null) ? (object) DBNull.Value : (object) this._sms_meventos;

		cmd.Parameters["@sms_csmsparaeventos"].Value = (this._sms_csmsparaeventos == null) ? (object) DBNull.Value : (object) this._sms_csmsparaeventos;

		cmd.Parameters["@sms_imodemsms"].Value = this._sms_imodemsms;

		cmd.Parameters["@sms_cplantillasms"].Value = (this._sms_cplantillasms == null) ? (object) DBNull.Value : (object) this._sms_cplantillasms;

		cmd.Parameters["@sms_cmailparaeventos"].Value = (this._sms_cmailparaeventos == null) ? (object) DBNull.Value : (object) this._sms_cmailparaeventos;

		cmd.Parameters["@sms_cplantillamail"].Value = (this._sms_cplantillamail == null) ? (object) DBNull.Value : (object) this._sms_cplantillamail;

		cmd.Parameters["@sms_inotificaralertas"].Value = this._sms_inotificaralertas;

		cmd.Parameters["@sms_cplantillapush"].Value = (this._sms_cplantillapush == null) ? (object) DBNull.Value : (object) this._sms_cplantillapush;

		cmd.Parameters["@sms_cidspushsmartpanic"].Value = (this._sms_cidspushsmartpanic == null) ? (object) DBNull.Value : (object) this._sms_cidspushsmartpanic;

		cmd.Parameters["@sms_cDescripcion"].Value = (this._sms_cDescripcion == null) ? (object) DBNull.Value : (object) this._sms_cDescripcion;

		cmd.Parameters["@sms_iGrupoAlarmas"].Value = this._sms_iGrupoAlarmas;

		cmd.Parameters["@sms_czona"].Value = (this._sms_czona == null) ? (object) DBNull.Value : (object) this._sms_czona;

		cmd.Parameters["@sms_iEventosSP"].Value = this._sms_iEventosSP;

		cmd.Parameters["@sms_cSonido"].Value = (this._sms_cSonido == null) ? (object) DBNull.Value : (object) this._sms_cSonido;


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
		 
		public IEnumerable<SimpleSms> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SmsByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSms Simple = new SimpleSms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_meventos = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_csmsparaeventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sms_imodemsms = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.sms_cplantillasms = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_cmailparaeventos = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.sms_cplantillamail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_inotificaralertas = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.sms_cplantillapush = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sms_cidspushsmartpanic = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sms_cDescripcion = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.sms_iGrupoAlarmas = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.sms_czona = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.sms_iEventosSP = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.sms_cSonido = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleSms> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SmsByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSms Simple = new SimpleSms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_meventos = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_csmsparaeventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.sms_imodemsms = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.sms_cplantillasms = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_cmailparaeventos = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.sms_cplantillamail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_inotificaralertas = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.sms_cplantillapush = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.sms_cidspushsmartpanic = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.sms_cDescripcion = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.sms_iGrupoAlarmas = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.sms_czona = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.sms_iEventosSP = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)Simple.sms_cSonido = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3020, "Sms");
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
    if (Reader.FieldCount > 2)this._sms_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._sms_meventos = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._sms_csmsparaeventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._sms_imodemsms = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._sms_cplantillasms = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._sms_cmailparaeventos = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._sms_cplantillamail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._sms_inotificaralertas = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._sms_cplantillapush = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._sms_cidspushsmartpanic = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._sms_cDescripcion = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._sms_iGrupoAlarmas = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)this._sms_czona = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._sms_iEventosSP = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);
if (Reader.FieldCount > 16)this._sms_cSonido = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);

    }
    Reader.Close();
    }
   }
  
    }
  