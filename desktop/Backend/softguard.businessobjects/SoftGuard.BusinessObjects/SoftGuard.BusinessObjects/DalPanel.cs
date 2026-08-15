
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
     ///Panel data access layer   
     ///</summary>
    public class DalPanel : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _pan_iidcuenta;
    
      private string _pan_ccodigo;
    
      private string _pan_mubicacion;
    
      private string _pan_ccallerid1;
    
      private string _pan_ccallerid2;
    
      private string _pan_ccallerid3;
    
      private string _pan_ccallerid4;
    
      private string _pan_ccallerid5;
    
      private Decimal _pan_nmostrar;
    
      private string _pan_csender;
    
      private string _pan_cnrosim1;
    
      private string _pan_ccompania1;
    
      private string _pan_cnrosim2;
    
      private string _pan_ccompania2;
    
      private string _pan_cgprs;
    
      private int _pan_ireceptor;
    
      private string _pan_cconfig;
    
      private int _pan_rpmidkey;
    
      private int _pan_cModemSMS;
    
      private string _pan_cClavePanel;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///pan_iidcuenta   
     ///</summary>
      public int pan_iidcuenta
      {
      
          get{ return this._pan_iidcuenta; }
          set{ this._pan_iidcuenta = value; }
        
      }
     ///<summary>
     ///pan_ccodigo   
     ///</summary>
      public string pan_ccodigo
      {
      
          get{ return this._pan_ccodigo; }
          set{ this._pan_ccodigo = value; }
        
      }
     ///<summary>
     ///pan_mubicacion   
     ///</summary>
      public string pan_mubicacion
      {
      
          get{ return this._pan_mubicacion; }
          set{ this._pan_mubicacion = value; }
        
      }
     ///<summary>
     ///pan_ccallerid1   
     ///</summary>
      public string pan_ccallerid1
      {
      
          get{ return this._pan_ccallerid1; }
          set{ this._pan_ccallerid1 = value; }
        
      }
     ///<summary>
     ///pan_ccallerid2   
     ///</summary>
      public string pan_ccallerid2
      {
      
          get{ return this._pan_ccallerid2; }
          set{ this._pan_ccallerid2 = value; }
        
      }
     ///<summary>
     ///pan_ccallerid3   
     ///</summary>
      public string pan_ccallerid3
      {
      
          get{ return this._pan_ccallerid3; }
          set{ this._pan_ccallerid3 = value; }
        
      }
     ///<summary>
     ///pan_ccallerid4   
     ///</summary>
      public string pan_ccallerid4
      {
      
          get{ return this._pan_ccallerid4; }
          set{ this._pan_ccallerid4 = value; }
        
      }
     ///<summary>
     ///pan_ccallerid5   
     ///</summary>
      public string pan_ccallerid5
      {
      
          get{ return this._pan_ccallerid5; }
          set{ this._pan_ccallerid5 = value; }
        
      }
     ///<summary>
     ///pan_nmostrar   
     ///</summary>
      public Decimal pan_nmostrar
      {
      
          get{ return this._pan_nmostrar; }
          set{ this._pan_nmostrar = value; }
        
      }
     ///<summary>
     ///pan_csender   
     ///</summary>
      public string pan_csender
      {
      
          get{ return this._pan_csender; }
          set{ this._pan_csender = value; }
        
      }
     ///<summary>
     ///pan_cnrosim1   
     ///</summary>
      public string pan_cnrosim1
      {
      
          get{ return this._pan_cnrosim1; }
          set{ this._pan_cnrosim1 = value; }
        
      }
     ///<summary>
     ///pan_ccompania1   
     ///</summary>
      public string pan_ccompania1
      {
      
          get{ return this._pan_ccompania1; }
          set{ this._pan_ccompania1 = value; }
        
      }
     ///<summary>
     ///pan_cnrosim2   
     ///</summary>
      public string pan_cnrosim2
      {
      
          get{ return this._pan_cnrosim2; }
          set{ this._pan_cnrosim2 = value; }
        
      }
     ///<summary>
     ///pan_ccompania2   
     ///</summary>
      public string pan_ccompania2
      {
      
          get{ return this._pan_ccompania2; }
          set{ this._pan_ccompania2 = value; }
        
      }
     ///<summary>
     ///pan_cgprs   
     ///</summary>
      public string pan_cgprs
      {
      
          get{ return this._pan_cgprs; }
          set{ this._pan_cgprs = value; }
        
      }
     ///<summary>
     ///pan_ireceptor   
     ///</summary>
      public int pan_ireceptor
      {
      
          get{ return this._pan_ireceptor; }
          set{ this._pan_ireceptor = value; }
        
      }
     ///<summary>
     ///pan_cconfig   
     ///</summary>
      public string pan_cconfig
      {
      
          get{ return this._pan_cconfig; }
          set{ this._pan_cconfig = value; }
        
      }
     ///<summary>
     ///pan_rpmidkey   
     ///</summary>
      public int pan_rpmidkey
      {
      
          get{ return this._pan_rpmidkey; }
          set{ this._pan_rpmidkey = value; }
        
      }
     ///<summary>
     ///pan_cModemSMS   
     ///</summary>
      public int pan_cModemSMS
      {
      
          get{ return this._pan_cModemSMS; }
          set{ this._pan_cModemSMS = value; }
        
      }
     ///<summary>
     ///pan_cClavePanel   
     ///</summary>
      public string pan_cClavePanel
      {
      
          get{ return this._pan_cClavePanel; }
          set{ this._pan_cClavePanel = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalPanel(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalPanel(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalPanel(SqlHelper SqlConfig, int UserId, SimplePanel Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._pan_iidcuenta = Simple.pan_iidcuenta;

      this._pan_ccodigo = Simple.pan_ccodigo;

      this._pan_mubicacion = Simple.pan_mubicacion;

      this._pan_ccallerid1 = Simple.pan_ccallerid1;

      this._pan_ccallerid2 = Simple.pan_ccallerid2;

      this._pan_ccallerid3 = Simple.pan_ccallerid3;

      this._pan_ccallerid4 = Simple.pan_ccallerid4;

      this._pan_ccallerid5 = Simple.pan_ccallerid5;

      this._pan_nmostrar = Simple.pan_nmostrar;

      this._pan_csender = Simple.pan_csender;

      this._pan_cnrosim1 = Simple.pan_cnrosim1;

      this._pan_ccompania1 = Simple.pan_ccompania1;

      this._pan_cnrosim2 = Simple.pan_cnrosim2;

      this._pan_ccompania2 = Simple.pan_ccompania2;

      this._pan_cgprs = Simple.pan_cgprs;

      this._pan_ireceptor = Simple.pan_ireceptor;

      this._pan_cconfig = Simple.pan_cconfig;

      this._pan_rpmidkey = Simple.pan_rpmidkey;

      this._pan_cModemSMS = Simple.pan_cModemSMS;

      this._pan_cClavePanel = Simple.pan_cClavePanel;

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
    using(var cmd = new SqlCommand("PanelIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@pan_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@pan_mubicacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid3", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid4", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid5", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@pan_csender", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cnrosim1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccompania1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cnrosim2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccompania2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cgprs", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@pan_ireceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cconfig", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_rpmidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cModemSMS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cClavePanel", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@pan_iidcuenta"].Value = this._pan_iidcuenta;

		cmd.Parameters["@pan_ccodigo"].Value = (this._pan_ccodigo == null) ? (object) DBNull.Value : (object) this._pan_ccodigo;

		cmd.Parameters["@pan_mubicacion"].Value = (this._pan_mubicacion == null) ? (object) DBNull.Value : (object) this._pan_mubicacion;

		cmd.Parameters["@pan_ccallerid1"].Value = (this._pan_ccallerid1 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid1;

		cmd.Parameters["@pan_ccallerid2"].Value = (this._pan_ccallerid2 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid2;

		cmd.Parameters["@pan_ccallerid3"].Value = (this._pan_ccallerid3 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid3;

		cmd.Parameters["@pan_ccallerid4"].Value = (this._pan_ccallerid4 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid4;

		cmd.Parameters["@pan_ccallerid5"].Value = (this._pan_ccallerid5 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid5;

		cmd.Parameters["@pan_nmostrar"].Value = this._pan_nmostrar;

		cmd.Parameters["@pan_csender"].Value = (this._pan_csender == null) ? (object) DBNull.Value : (object) this._pan_csender;

		cmd.Parameters["@pan_cnrosim1"].Value = (this._pan_cnrosim1 == null) ? (object) DBNull.Value : (object) this._pan_cnrosim1;

		cmd.Parameters["@pan_ccompania1"].Value = (this._pan_ccompania1 == null) ? (object) DBNull.Value : (object) this._pan_ccompania1;

		cmd.Parameters["@pan_cnrosim2"].Value = (this._pan_cnrosim2 == null) ? (object) DBNull.Value : (object) this._pan_cnrosim2;

		cmd.Parameters["@pan_ccompania2"].Value = (this._pan_ccompania2 == null) ? (object) DBNull.Value : (object) this._pan_ccompania2;

		cmd.Parameters["@pan_cgprs"].Value = (this._pan_cgprs == null) ? (object) DBNull.Value : (object) this._pan_cgprs;

		cmd.Parameters["@pan_ireceptor"].Value = this._pan_ireceptor;

		cmd.Parameters["@pan_cconfig"].Value = (this._pan_cconfig == null) ? (object) DBNull.Value : (object) this._pan_cconfig;

		cmd.Parameters["@pan_rpmidkey"].Value = this._pan_rpmidkey;

		cmd.Parameters["@pan_cModemSMS"].Value = this._pan_cModemSMS;

		cmd.Parameters["@pan_cClavePanel"].Value = (this._pan_cClavePanel == null) ? (object) DBNull.Value : (object) this._pan_cClavePanel;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("PanelUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@pan_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@pan_mubicacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid3", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid4", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid5", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@pan_csender", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cnrosim1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccompania1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cnrosim2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccompania2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cgprs", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@pan_ireceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cconfig", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_rpmidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cModemSMS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cClavePanel", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@pan_iidcuenta"].Value = this._pan_iidcuenta;

		cmd.Parameters["@pan_ccodigo"].Value = (this._pan_ccodigo == null) ? (object) DBNull.Value : (object) this._pan_ccodigo;

		cmd.Parameters["@pan_mubicacion"].Value = (this._pan_mubicacion == null) ? (object) DBNull.Value : (object) this._pan_mubicacion;

		cmd.Parameters["@pan_ccallerid1"].Value = (this._pan_ccallerid1 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid1;

		cmd.Parameters["@pan_ccallerid2"].Value = (this._pan_ccallerid2 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid2;

		cmd.Parameters["@pan_ccallerid3"].Value = (this._pan_ccallerid3 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid3;

		cmd.Parameters["@pan_ccallerid4"].Value = (this._pan_ccallerid4 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid4;

		cmd.Parameters["@pan_ccallerid5"].Value = (this._pan_ccallerid5 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid5;

		cmd.Parameters["@pan_nmostrar"].Value = this._pan_nmostrar;

		cmd.Parameters["@pan_csender"].Value = (this._pan_csender == null) ? (object) DBNull.Value : (object) this._pan_csender;

		cmd.Parameters["@pan_cnrosim1"].Value = (this._pan_cnrosim1 == null) ? (object) DBNull.Value : (object) this._pan_cnrosim1;

		cmd.Parameters["@pan_ccompania1"].Value = (this._pan_ccompania1 == null) ? (object) DBNull.Value : (object) this._pan_ccompania1;

		cmd.Parameters["@pan_cnrosim2"].Value = (this._pan_cnrosim2 == null) ? (object) DBNull.Value : (object) this._pan_cnrosim2;

		cmd.Parameters["@pan_ccompania2"].Value = (this._pan_ccompania2 == null) ? (object) DBNull.Value : (object) this._pan_ccompania2;

		cmd.Parameters["@pan_cgprs"].Value = (this._pan_cgprs == null) ? (object) DBNull.Value : (object) this._pan_cgprs;

		cmd.Parameters["@pan_ireceptor"].Value = this._pan_ireceptor;

		cmd.Parameters["@pan_cconfig"].Value = (this._pan_cconfig == null) ? (object) DBNull.Value : (object) this._pan_cconfig;

		cmd.Parameters["@pan_rpmidkey"].Value = this._pan_rpmidkey;

		cmd.Parameters["@pan_cModemSMS"].Value = this._pan_cModemSMS;

		cmd.Parameters["@pan_cClavePanel"].Value = (this._pan_cClavePanel == null) ? (object) DBNull.Value : (object) this._pan_cClavePanel;

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
    throw new RuntimeException("The Panel is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("PanelDel", conn))
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
    using(var CmdSel = new SqlCommand("PanelSel", conn))
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
    SimplePanel Simple = new SimplePanel();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.pan_iidcuenta = this._pan_iidcuenta;

      Simple.pan_ccodigo = this._pan_ccodigo;

      Simple.pan_mubicacion = this._pan_mubicacion;

      Simple.pan_ccallerid1 = this._pan_ccallerid1;

      Simple.pan_ccallerid2 = this._pan_ccallerid2;

      Simple.pan_ccallerid3 = this._pan_ccallerid3;

      Simple.pan_ccallerid4 = this._pan_ccallerid4;

      Simple.pan_ccallerid5 = this._pan_ccallerid5;

      Simple.pan_nmostrar = this._pan_nmostrar;

      Simple.pan_csender = this._pan_csender;

      Simple.pan_cnrosim1 = this._pan_cnrosim1;

      Simple.pan_ccompania1 = this._pan_ccompania1;

      Simple.pan_cnrosim2 = this._pan_cnrosim2;

      Simple.pan_ccompania2 = this._pan_ccompania2;

      Simple.pan_cgprs = this._pan_cgprs;

      Simple.pan_ireceptor = this._pan_ireceptor;

      Simple.pan_cconfig = this._pan_cconfig;

      Simple.pan_rpmidkey = this._pan_rpmidkey;

      Simple.pan_cModemSMS = this._pan_cModemSMS;

      Simple.pan_cClavePanel = this._pan_cClavePanel;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimplePanel)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._pan_iidcuenta = Simple.pan_iidcuenta;

      this._pan_ccodigo = Simple.pan_ccodigo;

      this._pan_mubicacion = Simple.pan_mubicacion;

      this._pan_ccallerid1 = Simple.pan_ccallerid1;

      this._pan_ccallerid2 = Simple.pan_ccallerid2;

      this._pan_ccallerid3 = Simple.pan_ccallerid3;

      this._pan_ccallerid4 = Simple.pan_ccallerid4;

      this._pan_ccallerid5 = Simple.pan_ccallerid5;

      this._pan_nmostrar = Simple.pan_nmostrar;

      this._pan_csender = Simple.pan_csender;

      this._pan_cnrosim1 = Simple.pan_cnrosim1;

      this._pan_ccompania1 = Simple.pan_ccompania1;

      this._pan_cnrosim2 = Simple.pan_cnrosim2;

      this._pan_ccompania2 = Simple.pan_ccompania2;

      this._pan_cgprs = Simple.pan_cgprs;

      this._pan_ireceptor = Simple.pan_ireceptor;

      this._pan_cconfig = Simple.pan_cconfig;

      this._pan_rpmidkey = Simple.pan_rpmidkey;

      this._pan_cModemSMS = Simple.pan_cModemSMS;

      this._pan_cClavePanel = Simple.pan_cClavePanel;

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
    CallerPanel Caller = new CallerPanel();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.pan_iidcuenta = this._pan_iidcuenta;

      Caller.pan_ccodigo = this._pan_ccodigo;

      Caller.pan_mubicacion = this._pan_mubicacion;

      Caller.pan_ccallerid1 = this._pan_ccallerid1;

      Caller.pan_ccallerid2 = this._pan_ccallerid2;

      Caller.pan_ccallerid3 = this._pan_ccallerid3;

      Caller.pan_ccallerid4 = this._pan_ccallerid4;

      Caller.pan_ccallerid5 = this._pan_ccallerid5;

      Caller.pan_nmostrar = this._pan_nmostrar;

      Caller.pan_csender = this._pan_csender;

      Caller.pan_cnrosim1 = this._pan_cnrosim1;

      Caller.pan_ccompania1 = this._pan_ccompania1;

      Caller.pan_cnrosim2 = this._pan_cnrosim2;

      Caller.pan_ccompania2 = this._pan_ccompania2;

      Caller.pan_cgprs = this._pan_cgprs;

      Caller.pan_ireceptor = this._pan_ireceptor;

      Caller.pan_cconfig = this._pan_cconfig;

      Caller.pan_rpmidkey = this._pan_rpmidkey;

      Caller.pan_cModemSMS = this._pan_cModemSMS;

      Caller.pan_cClavePanel = this._pan_cClavePanel;

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
    
      dt.Columns.Add(new DataColumn("pan_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pan_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_mubicacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ccallerid1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ccallerid2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ccallerid3", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ccallerid4", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ccallerid5", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_nmostrar", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("pan_csender", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_cnrosim1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ccompania1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_cnrosim2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ccompania2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_cgprs", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_ireceptor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pan_cconfig", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pan_rpmidkey", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pan_cModemSMS", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pan_cClavePanel", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["pan_iidcuenta"] = this._pan_iidcuenta;

      dr["pan_ccodigo"] = this._pan_ccodigo;

      dr["pan_mubicacion"] = this._pan_mubicacion;

      dr["pan_ccallerid1"] = this._pan_ccallerid1;

      dr["pan_ccallerid2"] = this._pan_ccallerid2;

      dr["pan_ccallerid3"] = this._pan_ccallerid3;

      dr["pan_ccallerid4"] = this._pan_ccallerid4;

      dr["pan_ccallerid5"] = this._pan_ccallerid5;

      dr["pan_nmostrar"] = this._pan_nmostrar;

      dr["pan_csender"] = this._pan_csender;

      dr["pan_cnrosim1"] = this._pan_cnrosim1;

      dr["pan_ccompania1"] = this._pan_ccompania1;

      dr["pan_cnrosim2"] = this._pan_cnrosim2;

      dr["pan_ccompania2"] = this._pan_ccompania2;

      dr["pan_cgprs"] = this._pan_cgprs;

      dr["pan_ireceptor"] = this._pan_ireceptor;

      dr["pan_cconfig"] = this._pan_cconfig;

      dr["pan_rpmidkey"] = this._pan_rpmidkey;

      dr["pan_cModemSMS"] = this._pan_cModemSMS;

      dr["pan_cClavePanel"] = this._pan_cClavePanel;

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
    using(var CmdChilds = new SqlCommand("PanelByChildObject", conn))
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
    SimplePanel Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("PanelByChildObject", conn))
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
    Simple = new SimplePanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pan_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.pan_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pan_mubicacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pan_ccallerid1 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pan_ccallerid2 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pan_ccallerid3 = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.pan_ccallerid4 = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pan_ccallerid5 = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pan_nmostrar = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.pan_csender = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.pan_cnrosim1 = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.pan_ccompania1 = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.pan_cnrosim2 = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.pan_ccompania2 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.pan_cgprs = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pan_ireceptor = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pan_cconfig = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.pan_rpmidkey = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.pan_cModemSMS = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.pan_cClavePanel = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);


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
    SimplePanel Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimplePanel();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.pan_iidcuenta = (Row["pan_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["pan_iidcuenta"];

Simple.pan_ccodigo = (Row["pan_ccodigo"] == DBNull.Value) ? "" : (string) Row["pan_ccodigo"];

Simple.pan_mubicacion = (Row["pan_mubicacion"] == DBNull.Value) ? "" : (string) Row["pan_mubicacion"];

Simple.pan_ccallerid1 = (Row["pan_ccallerid1"] == DBNull.Value) ? "" : (string) Row["pan_ccallerid1"];

Simple.pan_ccallerid2 = (Row["pan_ccallerid2"] == DBNull.Value) ? "" : (string) Row["pan_ccallerid2"];

Simple.pan_ccallerid3 = (Row["pan_ccallerid3"] == DBNull.Value) ? "" : (string) Row["pan_ccallerid3"];

Simple.pan_ccallerid4 = (Row["pan_ccallerid4"] == DBNull.Value) ? "" : (string) Row["pan_ccallerid4"];

Simple.pan_ccallerid5 = (Row["pan_ccallerid5"] == DBNull.Value) ? "" : (string) Row["pan_ccallerid5"];

Simple.pan_nmostrar = (Row["pan_nmostrar"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["pan_nmostrar"];

Simple.pan_csender = (Row["pan_csender"] == DBNull.Value) ? "" : (string) Row["pan_csender"];

Simple.pan_cnrosim1 = (Row["pan_cnrosim1"] == DBNull.Value) ? "" : (string) Row["pan_cnrosim1"];

Simple.pan_ccompania1 = (Row["pan_ccompania1"] == DBNull.Value) ? "" : (string) Row["pan_ccompania1"];

Simple.pan_cnrosim2 = (Row["pan_cnrosim2"] == DBNull.Value) ? "" : (string) Row["pan_cnrosim2"];

Simple.pan_ccompania2 = (Row["pan_ccompania2"] == DBNull.Value) ? "" : (string) Row["pan_ccompania2"];

Simple.pan_cgprs = (Row["pan_cgprs"] == DBNull.Value) ? "" : (string) Row["pan_cgprs"];

Simple.pan_ireceptor = (Row["pan_ireceptor"] == DBNull.Value) ? 0 : (int) Row["pan_ireceptor"];

Simple.pan_cconfig = (Row["pan_cconfig"] == DBNull.Value) ? "" : (string) Row["pan_cconfig"];

Simple.pan_rpmidkey = (Row["pan_rpmidkey"] == DBNull.Value) ? 0 : (int) Row["pan_rpmidkey"];

Simple.pan_cModemSMS = (Row["pan_cModemSMS"] == DBNull.Value) ? 0 : (int) Row["pan_cModemSMS"];

Simple.pan_cClavePanel = (Row["pan_cClavePanel"] == DBNull.Value) ? "" : (string) Row["pan_cClavePanel"];


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
    using(var CmdParents = new SqlCommand("PanelByParentObject", conn))
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
    SimplePanel Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("PanelByParentObject", conn))
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
    Simple = new SimplePanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pan_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.pan_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pan_mubicacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pan_ccallerid1 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pan_ccallerid2 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pan_ccallerid3 = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.pan_ccallerid4 = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pan_ccallerid5 = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pan_nmostrar = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.pan_csender = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.pan_cnrosim1 = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.pan_ccompania1 = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.pan_cnrosim2 = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.pan_ccompania2 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.pan_cgprs = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pan_ireceptor = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pan_cconfig = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.pan_rpmidkey = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.pan_cModemSMS = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.pan_cClavePanel = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);


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
    using (var CmdDataByName = new SqlCommand("PanelByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("PanelByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("PanelByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("PanelByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("PanelByText", conn))
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
    public DataTable GetDataBySimpleObject(SimplePanel Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("PanelBySimplePanel", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@pan_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@pan_mubicacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid3", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid4", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccallerid5", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@pan_csender", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cnrosim1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccompania1", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cnrosim2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_ccompania2", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_cgprs", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@pan_ireceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cconfig", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pan_rpmidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cModemSMS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pan_cClavePanel", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@pan_iidcuenta"].Value = this._pan_iidcuenta;

		cmd.Parameters["@pan_ccodigo"].Value = (this._pan_ccodigo == null) ? (object) DBNull.Value : (object) this._pan_ccodigo;

		cmd.Parameters["@pan_mubicacion"].Value = (this._pan_mubicacion == null) ? (object) DBNull.Value : (object) this._pan_mubicacion;

		cmd.Parameters["@pan_ccallerid1"].Value = (this._pan_ccallerid1 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid1;

		cmd.Parameters["@pan_ccallerid2"].Value = (this._pan_ccallerid2 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid2;

		cmd.Parameters["@pan_ccallerid3"].Value = (this._pan_ccallerid3 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid3;

		cmd.Parameters["@pan_ccallerid4"].Value = (this._pan_ccallerid4 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid4;

		cmd.Parameters["@pan_ccallerid5"].Value = (this._pan_ccallerid5 == null) ? (object) DBNull.Value : (object) this._pan_ccallerid5;

		cmd.Parameters["@pan_nmostrar"].Value = this._pan_nmostrar;

		cmd.Parameters["@pan_csender"].Value = (this._pan_csender == null) ? (object) DBNull.Value : (object) this._pan_csender;

		cmd.Parameters["@pan_cnrosim1"].Value = (this._pan_cnrosim1 == null) ? (object) DBNull.Value : (object) this._pan_cnrosim1;

		cmd.Parameters["@pan_ccompania1"].Value = (this._pan_ccompania1 == null) ? (object) DBNull.Value : (object) this._pan_ccompania1;

		cmd.Parameters["@pan_cnrosim2"].Value = (this._pan_cnrosim2 == null) ? (object) DBNull.Value : (object) this._pan_cnrosim2;

		cmd.Parameters["@pan_ccompania2"].Value = (this._pan_ccompania2 == null) ? (object) DBNull.Value : (object) this._pan_ccompania2;

		cmd.Parameters["@pan_cgprs"].Value = (this._pan_cgprs == null) ? (object) DBNull.Value : (object) this._pan_cgprs;

		cmd.Parameters["@pan_ireceptor"].Value = this._pan_ireceptor;

		cmd.Parameters["@pan_cconfig"].Value = (this._pan_cconfig == null) ? (object) DBNull.Value : (object) this._pan_cconfig;

		cmd.Parameters["@pan_rpmidkey"].Value = this._pan_rpmidkey;

		cmd.Parameters["@pan_cModemSMS"].Value = this._pan_cModemSMS;

		cmd.Parameters["@pan_cClavePanel"].Value = (this._pan_cClavePanel == null) ? (object) DBNull.Value : (object) this._pan_cClavePanel;


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
		 
		public IEnumerable<SimplePanel> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("PanelByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimplePanel Simple = new SimplePanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pan_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.pan_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pan_mubicacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pan_ccallerid1 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pan_ccallerid2 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pan_ccallerid3 = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.pan_ccallerid4 = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pan_ccallerid5 = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pan_nmostrar = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.pan_csender = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.pan_cnrosim1 = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.pan_ccompania1 = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.pan_cnrosim2 = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.pan_ccompania2 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.pan_cgprs = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pan_ireceptor = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pan_cconfig = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.pan_rpmidkey = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.pan_cModemSMS = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.pan_cClavePanel = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimplePanel> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("PanelByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimplePanel Simple = new SimplePanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pan_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.pan_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pan_mubicacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pan_ccallerid1 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pan_ccallerid2 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pan_ccallerid3 = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.pan_ccallerid4 = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pan_ccallerid5 = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pan_nmostrar = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.pan_csender = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.pan_cnrosim1 = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.pan_ccompania1 = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.pan_cnrosim2 = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.pan_ccompania2 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.pan_cgprs = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.pan_ireceptor = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.pan_cconfig = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)Simple.pan_rpmidkey = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)Simple.pan_cModemSMS = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)Simple.pan_cClavePanel = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3017, "Panel");
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
    if (Reader.FieldCount > 2)this._pan_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._pan_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._pan_mubicacion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._pan_ccallerid1 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._pan_ccallerid2 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._pan_ccallerid3 = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._pan_ccallerid4 = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._pan_ccallerid5 = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._pan_nmostrar = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)this._pan_csender = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._pan_cnrosim1 = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._pan_ccompania1 = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._pan_cnrosim2 = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._pan_ccompania2 = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._pan_cgprs = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._pan_ireceptor = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)this._pan_cconfig = (Reader.IsDBNull(18)) ? "" : Reader.GetString(18);
if (Reader.FieldCount > 19)this._pan_rpmidkey = (Reader.IsDBNull(19)) ? 0 : Reader.GetInt32(19);
if (Reader.FieldCount > 20)this._pan_cModemSMS = (Reader.IsDBNull(20)) ? 0 : Reader.GetInt32(20);
if (Reader.FieldCount > 21)this._pan_cClavePanel = (Reader.IsDBNull(21)) ? "" : Reader.GetString(21);

    }
    Reader.Close();
    }
   }
  
    }
  