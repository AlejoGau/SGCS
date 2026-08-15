
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
     ///Test data access layer   
     ///</summary>
    public class DalTest : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private Decimal _tst_ncada;
    
      private Decimal _tst_ntipo;
    
      private int _tst_ireinicio;
    
      private string _tst_calarma;
    
      private Decimal _tst_ncada2;
    
      private Decimal _tst_ntipo2;
    
      private string _tst_calarmaesperada;
    
      private string _tst_calarmagenerar;
    
      private Decimal _tst_ncada3;
    
      private Decimal _tst_ntipo3;
    
      private string _tst_calarma3esperada;
    
      private string _tst_calarma3generar;
    
      private string _tst_cAlarmaAutoprocesa;
    
      private string _tst_cAlarma2Autoprocesa;
    
      private string _tst_cAlarma3Autoprocesa;
    
      private int _tst_iTiempoCtrl;
    
      private int _tst_iCtrlExec;
    
      private string _tst_cAlarmaCtrlGenerar;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///tst_ncada   
     ///</summary>
      public Decimal tst_ncada
      {
      
          get{ return this._tst_ncada; }
          set{ this._tst_ncada = value; }
        
      }
     ///<summary>
     ///tst_ntipo   
     ///</summary>
      public Decimal tst_ntipo
      {
      
          get{ return this._tst_ntipo; }
          set{ this._tst_ntipo = value; }
        
      }
     ///<summary>
     ///tst_ireinicio   
     ///</summary>
      public int tst_ireinicio
      {
      
          get{ return this._tst_ireinicio; }
          set{ this._tst_ireinicio = value; }
        
      }
     ///<summary>
     ///tst_calarma   
     ///</summary>
      public string tst_calarma
      {
      
          get{ return this._tst_calarma; }
          set{ this._tst_calarma = value; }
        
      }
     ///<summary>
     ///tst_ncada2   
     ///</summary>
      public Decimal tst_ncada2
      {
      
          get{ return this._tst_ncada2; }
          set{ this._tst_ncada2 = value; }
        
      }
     ///<summary>
     ///tst_ntipo2   
     ///</summary>
      public Decimal tst_ntipo2
      {
      
          get{ return this._tst_ntipo2; }
          set{ this._tst_ntipo2 = value; }
        
      }
     ///<summary>
     ///tst_calarmaesperada   
     ///</summary>
      public string tst_calarmaesperada
      {
      
          get{ return this._tst_calarmaesperada; }
          set{ this._tst_calarmaesperada = value; }
        
      }
     ///<summary>
     ///tst_calarmagenerar   
     ///</summary>
      public string tst_calarmagenerar
      {
      
          get{ return this._tst_calarmagenerar; }
          set{ this._tst_calarmagenerar = value; }
        
      }
     ///<summary>
     ///tst_ncada3   
     ///</summary>
      public Decimal tst_ncada3
      {
      
          get{ return this._tst_ncada3; }
          set{ this._tst_ncada3 = value; }
        
      }
     ///<summary>
     ///tst_ntipo3   
     ///</summary>
      public Decimal tst_ntipo3
      {
      
          get{ return this._tst_ntipo3; }
          set{ this._tst_ntipo3 = value; }
        
      }
     ///<summary>
     ///tst_calarma3esperada   
     ///</summary>
      public string tst_calarma3esperada
      {
      
          get{ return this._tst_calarma3esperada; }
          set{ this._tst_calarma3esperada = value; }
        
      }
     ///<summary>
     ///tst_calarma3generar   
     ///</summary>
      public string tst_calarma3generar
      {
      
          get{ return this._tst_calarma3generar; }
          set{ this._tst_calarma3generar = value; }
        
      }
     ///<summary>
     ///tst_cAlarmaAutoprocesa   
     ///</summary>
      public string tst_cAlarmaAutoprocesa
      {
      
          get{ return this._tst_cAlarmaAutoprocesa; }
          set{ this._tst_cAlarmaAutoprocesa = value; }
        
      }
     ///<summary>
     ///tst_cAlarma2Autoprocesa   
     ///</summary>
      public string tst_cAlarma2Autoprocesa
      {
      
          get{ return this._tst_cAlarma2Autoprocesa; }
          set{ this._tst_cAlarma2Autoprocesa = value; }
        
      }
     ///<summary>
     ///tst_cAlarma3Autoprocesa   
     ///</summary>
      public string tst_cAlarma3Autoprocesa
      {
      
          get{ return this._tst_cAlarma3Autoprocesa; }
          set{ this._tst_cAlarma3Autoprocesa = value; }
        
      }
     ///<summary>
     ///tst_iTiempoCtrl   
     ///</summary>
      public int tst_iTiempoCtrl
      {
      
          get{ return this._tst_iTiempoCtrl; }
          set{ this._tst_iTiempoCtrl = value; }
        
      }
     ///<summary>
     ///tst_iCtrlExec   
     ///</summary>
      public int tst_iCtrlExec
      {
      
          get{ return this._tst_iCtrlExec; }
          set{ this._tst_iCtrlExec = value; }
        
      }
     ///<summary>
     ///tst_cAlarmaCtrlGenerar   
     ///</summary>
      public string tst_cAlarmaCtrlGenerar
      {
      
          get{ return this._tst_cAlarmaCtrlGenerar; }
          set{ this._tst_cAlarmaCtrlGenerar = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalTest(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalTest(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalTest(SqlHelper SqlConfig, int UserId, SimpleTest Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tst_ncada = Simple.tst_ncada;

      this._tst_ntipo = Simple.tst_ntipo;

      this._tst_ireinicio = Simple.tst_ireinicio;

      this._tst_calarma = Simple.tst_calarma;

      this._tst_ncada2 = Simple.tst_ncada2;

      this._tst_ntipo2 = Simple.tst_ntipo2;

      this._tst_calarmaesperada = Simple.tst_calarmaesperada;

      this._tst_calarmagenerar = Simple.tst_calarmagenerar;

      this._tst_ncada3 = Simple.tst_ncada3;

      this._tst_ntipo3 = Simple.tst_ntipo3;

      this._tst_calarma3esperada = Simple.tst_calarma3esperada;

      this._tst_calarma3generar = Simple.tst_calarma3generar;

      this._tst_cAlarmaAutoprocesa = Simple.tst_cAlarmaAutoprocesa;

      this._tst_cAlarma2Autoprocesa = Simple.tst_cAlarma2Autoprocesa;

      this._tst_cAlarma3Autoprocesa = Simple.tst_cAlarma3Autoprocesa;

      this._tst_iTiempoCtrl = Simple.tst_iTiempoCtrl;

      this._tst_iCtrlExec = Simple.tst_iCtrlExec;

      this._tst_cAlarmaCtrlGenerar = Simple.tst_cAlarmaCtrlGenerar;

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
    using(var cmd = new SqlCommand("TestIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tst_ncada", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ireinicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_ncada2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_calarmaesperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_calarmagenerar", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_ncada3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_calarma3esperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_calarma3generar", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarmaAutoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarma2Autoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarma3Autoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_iTiempoCtrl", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_iCtrlExec", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_cAlarmaCtrlGenerar", SqlDbType.NChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tst_ncada"].Value = this._tst_ncada;

		cmd.Parameters["@tst_ntipo"].Value = this._tst_ntipo;

		cmd.Parameters["@tst_ireinicio"].Value = this._tst_ireinicio;

		cmd.Parameters["@tst_calarma"].Value = (this._tst_calarma == null) ? (object) DBNull.Value : (object) this._tst_calarma;

		cmd.Parameters["@tst_ncada2"].Value = this._tst_ncada2;

		cmd.Parameters["@tst_ntipo2"].Value = this._tst_ntipo2;

		cmd.Parameters["@tst_calarmaesperada"].Value = (this._tst_calarmaesperada == null) ? (object) DBNull.Value : (object) this._tst_calarmaesperada;

		cmd.Parameters["@tst_calarmagenerar"].Value = (this._tst_calarmagenerar == null) ? (object) DBNull.Value : (object) this._tst_calarmagenerar;

		cmd.Parameters["@tst_ncada3"].Value = this._tst_ncada3;

		cmd.Parameters["@tst_ntipo3"].Value = this._tst_ntipo3;

		cmd.Parameters["@tst_calarma3esperada"].Value = (this._tst_calarma3esperada == null) ? (object) DBNull.Value : (object) this._tst_calarma3esperada;

		cmd.Parameters["@tst_calarma3generar"].Value = (this._tst_calarma3generar == null) ? (object) DBNull.Value : (object) this._tst_calarma3generar;

		cmd.Parameters["@tst_cAlarmaAutoprocesa"].Value = (this._tst_cAlarmaAutoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarmaAutoprocesa;

		cmd.Parameters["@tst_cAlarma2Autoprocesa"].Value = (this._tst_cAlarma2Autoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarma2Autoprocesa;

		cmd.Parameters["@tst_cAlarma3Autoprocesa"].Value = (this._tst_cAlarma3Autoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarma3Autoprocesa;

		cmd.Parameters["@tst_iTiempoCtrl"].Value = this._tst_iTiempoCtrl;

		cmd.Parameters["@tst_iCtrlExec"].Value = this._tst_iCtrlExec;

		cmd.Parameters["@tst_cAlarmaCtrlGenerar"].Value = (this._tst_cAlarmaCtrlGenerar == null) ? (object) DBNull.Value : (object) this._tst_cAlarmaCtrlGenerar;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("TestUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tst_ncada", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ireinicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_ncada2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_calarmaesperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_calarmagenerar", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_ncada3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_calarma3esperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_calarma3generar", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarmaAutoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarma2Autoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarma3Autoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_iTiempoCtrl", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_iCtrlExec", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_cAlarmaCtrlGenerar", SqlDbType.NChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tst_ncada"].Value = this._tst_ncada;

		cmd.Parameters["@tst_ntipo"].Value = this._tst_ntipo;

		cmd.Parameters["@tst_ireinicio"].Value = this._tst_ireinicio;

		cmd.Parameters["@tst_calarma"].Value = (this._tst_calarma == null) ? (object) DBNull.Value : (object) this._tst_calarma;

		cmd.Parameters["@tst_ncada2"].Value = this._tst_ncada2;

		cmd.Parameters["@tst_ntipo2"].Value = this._tst_ntipo2;

		cmd.Parameters["@tst_calarmaesperada"].Value = (this._tst_calarmaesperada == null) ? (object) DBNull.Value : (object) this._tst_calarmaesperada;

		cmd.Parameters["@tst_calarmagenerar"].Value = (this._tst_calarmagenerar == null) ? (object) DBNull.Value : (object) this._tst_calarmagenerar;

		cmd.Parameters["@tst_ncada3"].Value = this._tst_ncada3;

		cmd.Parameters["@tst_ntipo3"].Value = this._tst_ntipo3;

		cmd.Parameters["@tst_calarma3esperada"].Value = (this._tst_calarma3esperada == null) ? (object) DBNull.Value : (object) this._tst_calarma3esperada;

		cmd.Parameters["@tst_calarma3generar"].Value = (this._tst_calarma3generar == null) ? (object) DBNull.Value : (object) this._tst_calarma3generar;

		cmd.Parameters["@tst_cAlarmaAutoprocesa"].Value = (this._tst_cAlarmaAutoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarmaAutoprocesa;

		cmd.Parameters["@tst_cAlarma2Autoprocesa"].Value = (this._tst_cAlarma2Autoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarma2Autoprocesa;

		cmd.Parameters["@tst_cAlarma3Autoprocesa"].Value = (this._tst_cAlarma3Autoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarma3Autoprocesa;

		cmd.Parameters["@tst_iTiempoCtrl"].Value = this._tst_iTiempoCtrl;

		cmd.Parameters["@tst_iCtrlExec"].Value = this._tst_iCtrlExec;

		cmd.Parameters["@tst_cAlarmaCtrlGenerar"].Value = (this._tst_cAlarmaCtrlGenerar == null) ? (object) DBNull.Value : (object) this._tst_cAlarmaCtrlGenerar;

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
    throw new RuntimeException("The Test is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("TestDel", conn))
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
    using(var CmdSel = new SqlCommand("TestSel", conn))
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
    SimpleTest Simple = new SimpleTest();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.tst_ncada = this._tst_ncada;

      Simple.tst_ntipo = this._tst_ntipo;

      Simple.tst_ireinicio = this._tst_ireinicio;

      Simple.tst_calarma = this._tst_calarma;

      Simple.tst_ncada2 = this._tst_ncada2;

      Simple.tst_ntipo2 = this._tst_ntipo2;

      Simple.tst_calarmaesperada = this._tst_calarmaesperada;

      Simple.tst_calarmagenerar = this._tst_calarmagenerar;

      Simple.tst_ncada3 = this._tst_ncada3;

      Simple.tst_ntipo3 = this._tst_ntipo3;

      Simple.tst_calarma3esperada = this._tst_calarma3esperada;

      Simple.tst_calarma3generar = this._tst_calarma3generar;

      Simple.tst_cAlarmaAutoprocesa = this._tst_cAlarmaAutoprocesa;

      Simple.tst_cAlarma2Autoprocesa = this._tst_cAlarma2Autoprocesa;

      Simple.tst_cAlarma3Autoprocesa = this._tst_cAlarma3Autoprocesa;

      Simple.tst_iTiempoCtrl = this._tst_iTiempoCtrl;

      Simple.tst_iCtrlExec = this._tst_iCtrlExec;

      Simple.tst_cAlarmaCtrlGenerar = this._tst_cAlarmaCtrlGenerar;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleTest)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tst_ncada = Simple.tst_ncada;

      this._tst_ntipo = Simple.tst_ntipo;

      this._tst_ireinicio = Simple.tst_ireinicio;

      this._tst_calarma = Simple.tst_calarma;

      this._tst_ncada2 = Simple.tst_ncada2;

      this._tst_ntipo2 = Simple.tst_ntipo2;

      this._tst_calarmaesperada = Simple.tst_calarmaesperada;

      this._tst_calarmagenerar = Simple.tst_calarmagenerar;

      this._tst_ncada3 = Simple.tst_ncada3;

      this._tst_ntipo3 = Simple.tst_ntipo3;

      this._tst_calarma3esperada = Simple.tst_calarma3esperada;

      this._tst_calarma3generar = Simple.tst_calarma3generar;

      this._tst_cAlarmaAutoprocesa = Simple.tst_cAlarmaAutoprocesa;

      this._tst_cAlarma2Autoprocesa = Simple.tst_cAlarma2Autoprocesa;

      this._tst_cAlarma3Autoprocesa = Simple.tst_cAlarma3Autoprocesa;

      this._tst_iTiempoCtrl = Simple.tst_iTiempoCtrl;

      this._tst_iCtrlExec = Simple.tst_iCtrlExec;

      this._tst_cAlarmaCtrlGenerar = Simple.tst_cAlarmaCtrlGenerar;

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
    CallerTest Caller = new CallerTest();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.tst_ncada = this._tst_ncada;

      Caller.tst_ntipo = this._tst_ntipo;

      Caller.tst_ireinicio = this._tst_ireinicio;

      Caller.tst_calarma = this._tst_calarma;

      Caller.tst_ncada2 = this._tst_ncada2;

      Caller.tst_ntipo2 = this._tst_ntipo2;

      Caller.tst_calarmaesperada = this._tst_calarmaesperada;

      Caller.tst_calarmagenerar = this._tst_calarmagenerar;

      Caller.tst_ncada3 = this._tst_ncada3;

      Caller.tst_ntipo3 = this._tst_ntipo3;

      Caller.tst_calarma3esperada = this._tst_calarma3esperada;

      Caller.tst_calarma3generar = this._tst_calarma3generar;

      Caller.tst_cAlarmaAutoprocesa = this._tst_cAlarmaAutoprocesa;

      Caller.tst_cAlarma2Autoprocesa = this._tst_cAlarma2Autoprocesa;

      Caller.tst_cAlarma3Autoprocesa = this._tst_cAlarma3Autoprocesa;

      Caller.tst_iTiempoCtrl = this._tst_iTiempoCtrl;

      Caller.tst_iCtrlExec = this._tst_iCtrlExec;

      Caller.tst_cAlarmaCtrlGenerar = this._tst_cAlarmaCtrlGenerar;

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
    
      dt.Columns.Add(new DataColumn("tst_ncada", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tst_ntipo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tst_ireinicio", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tst_calarma", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_ncada2", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tst_ntipo2", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tst_calarmaesperada", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_calarmagenerar", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_ncada3", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tst_ntipo3", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tst_calarma3esperada", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_calarma3generar", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_cAlarmaAutoprocesa", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_cAlarma2Autoprocesa", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_cAlarma3Autoprocesa", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tst_iTiempoCtrl", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tst_iCtrlExec", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tst_cAlarmaCtrlGenerar", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["tst_ncada"] = this._tst_ncada;

      dr["tst_ntipo"] = this._tst_ntipo;

      dr["tst_ireinicio"] = this._tst_ireinicio;

      dr["tst_calarma"] = this._tst_calarma;

      dr["tst_ncada2"] = this._tst_ncada2;

      dr["tst_ntipo2"] = this._tst_ntipo2;

      dr["tst_calarmaesperada"] = this._tst_calarmaesperada;

      dr["tst_calarmagenerar"] = this._tst_calarmagenerar;

      dr["tst_ncada3"] = this._tst_ncada3;

      dr["tst_ntipo3"] = this._tst_ntipo3;

      dr["tst_calarma3esperada"] = this._tst_calarma3esperada;

      dr["tst_calarma3generar"] = this._tst_calarma3generar;

      dr["tst_cAlarmaAutoprocesa"] = this._tst_cAlarmaAutoprocesa;

      dr["tst_cAlarma2Autoprocesa"] = this._tst_cAlarma2Autoprocesa;

      dr["tst_cAlarma3Autoprocesa"] = this._tst_cAlarma3Autoprocesa;

      dr["tst_iTiempoCtrl"] = this._tst_iTiempoCtrl;

      dr["tst_iCtrlExec"] = this._tst_iCtrlExec;

      dr["tst_cAlarmaCtrlGenerar"] = this._tst_cAlarmaCtrlGenerar;

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
    using(var CmdChilds = new SqlCommand("TestByChildObject", conn))
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
    SimpleTest Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("TestByChildObject", conn))
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
    Simple = new SimpleTest();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tst_ncada = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.tst_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.tst_ireinicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tst_calarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tst_ncada2 = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tst_ntipo2 = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tst_calarmaesperada = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tst_calarmagenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tst_ncada3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.tst_ntipo3 = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.tst_calarma3esperada = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tst_calarma3generar = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tst_cAlarmaAutoprocesa = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tst_cAlarma2Autoprocesa = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tst_cAlarma3Autoprocesa = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tst_iTiempoCtrl = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tst_iCtrlExec = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.tst_cAlarmaCtrlGenerar = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);


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
    SimpleTest Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleTest();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.tst_ncada = (Row["tst_ncada"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tst_ncada"];

Simple.tst_ntipo = (Row["tst_ntipo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tst_ntipo"];

Simple.tst_ireinicio = (Row["tst_ireinicio"] == DBNull.Value) ? 0 : (int) Row["tst_ireinicio"];

Simple.tst_calarma = (Row["tst_calarma"] == DBNull.Value) ? "" : (string) Row["tst_calarma"];

Simple.tst_ncada2 = (Row["tst_ncada2"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tst_ncada2"];

Simple.tst_ntipo2 = (Row["tst_ntipo2"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tst_ntipo2"];

Simple.tst_calarmaesperada = (Row["tst_calarmaesperada"] == DBNull.Value) ? "" : (string) Row["tst_calarmaesperada"];

Simple.tst_calarmagenerar = (Row["tst_calarmagenerar"] == DBNull.Value) ? "" : (string) Row["tst_calarmagenerar"];

Simple.tst_ncada3 = (Row["tst_ncada3"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tst_ncada3"];

Simple.tst_ntipo3 = (Row["tst_ntipo3"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tst_ntipo3"];

Simple.tst_calarma3esperada = (Row["tst_calarma3esperada"] == DBNull.Value) ? "" : (string) Row["tst_calarma3esperada"];

Simple.tst_calarma3generar = (Row["tst_calarma3generar"] == DBNull.Value) ? "" : (string) Row["tst_calarma3generar"];

Simple.tst_cAlarmaAutoprocesa = (Row["tst_cAlarmaAutoprocesa"] == DBNull.Value) ? "" : (string) Row["tst_cAlarmaAutoprocesa"];

Simple.tst_cAlarma2Autoprocesa = (Row["tst_cAlarma2Autoprocesa"] == DBNull.Value) ? "" : (string) Row["tst_cAlarma2Autoprocesa"];

Simple.tst_cAlarma3Autoprocesa = (Row["tst_cAlarma3Autoprocesa"] == DBNull.Value) ? "" : (string) Row["tst_cAlarma3Autoprocesa"];

Simple.tst_iTiempoCtrl = (Row["tst_iTiempoCtrl"] == DBNull.Value) ? 0 : (int) Row["tst_iTiempoCtrl"];

Simple.tst_iCtrlExec = (Row["tst_iCtrlExec"] == DBNull.Value) ? 0 : (int) Row["tst_iCtrlExec"];

Simple.tst_cAlarmaCtrlGenerar = (Row["tst_cAlarmaCtrlGenerar"] == DBNull.Value) ? "" : (string) Row["tst_cAlarmaCtrlGenerar"];


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
    using(var CmdParents = new SqlCommand("TestByParentObject", conn))
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
    SimpleTest Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("TestByParentObject", conn))
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
    Simple = new SimpleTest();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tst_ncada = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.tst_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.tst_ireinicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tst_calarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tst_ncada2 = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tst_ntipo2 = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tst_calarmaesperada = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tst_calarmagenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tst_ncada3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.tst_ntipo3 = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.tst_calarma3esperada = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tst_calarma3generar = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tst_cAlarmaAutoprocesa = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tst_cAlarma2Autoprocesa = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tst_cAlarma3Autoprocesa = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tst_iTiempoCtrl = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tst_iCtrlExec = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.tst_cAlarmaCtrlGenerar = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);


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
    using (var CmdDataByName = new SqlCommand("TestByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("TestByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("TestByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("TestByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("TestByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleTest Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("TestBySimpleTest", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tst_ncada", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ireinicio", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_ncada2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_calarmaesperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_calarmagenerar", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_ncada3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_ntipo3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tst_calarma3esperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_calarma3generar", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarmaAutoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarma2Autoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_cAlarma3Autoprocesa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tst_iTiempoCtrl", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_iCtrlExec", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tst_cAlarmaCtrlGenerar", SqlDbType.NChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@tst_ncada"].Value = this._tst_ncada;

		cmd.Parameters["@tst_ntipo"].Value = this._tst_ntipo;

		cmd.Parameters["@tst_ireinicio"].Value = this._tst_ireinicio;

		cmd.Parameters["@tst_calarma"].Value = (this._tst_calarma == null) ? (object) DBNull.Value : (object) this._tst_calarma;

		cmd.Parameters["@tst_ncada2"].Value = this._tst_ncada2;

		cmd.Parameters["@tst_ntipo2"].Value = this._tst_ntipo2;

		cmd.Parameters["@tst_calarmaesperada"].Value = (this._tst_calarmaesperada == null) ? (object) DBNull.Value : (object) this._tst_calarmaesperada;

		cmd.Parameters["@tst_calarmagenerar"].Value = (this._tst_calarmagenerar == null) ? (object) DBNull.Value : (object) this._tst_calarmagenerar;

		cmd.Parameters["@tst_ncada3"].Value = this._tst_ncada3;

		cmd.Parameters["@tst_ntipo3"].Value = this._tst_ntipo3;

		cmd.Parameters["@tst_calarma3esperada"].Value = (this._tst_calarma3esperada == null) ? (object) DBNull.Value : (object) this._tst_calarma3esperada;

		cmd.Parameters["@tst_calarma3generar"].Value = (this._tst_calarma3generar == null) ? (object) DBNull.Value : (object) this._tst_calarma3generar;

		cmd.Parameters["@tst_cAlarmaAutoprocesa"].Value = (this._tst_cAlarmaAutoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarmaAutoprocesa;

		cmd.Parameters["@tst_cAlarma2Autoprocesa"].Value = (this._tst_cAlarma2Autoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarma2Autoprocesa;

		cmd.Parameters["@tst_cAlarma3Autoprocesa"].Value = (this._tst_cAlarma3Autoprocesa == null) ? (object) DBNull.Value : (object) this._tst_cAlarma3Autoprocesa;

		cmd.Parameters["@tst_iTiempoCtrl"].Value = this._tst_iTiempoCtrl;

		cmd.Parameters["@tst_iCtrlExec"].Value = this._tst_iCtrlExec;

		cmd.Parameters["@tst_cAlarmaCtrlGenerar"].Value = (this._tst_cAlarmaCtrlGenerar == null) ? (object) DBNull.Value : (object) this._tst_cAlarmaCtrlGenerar;


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
		 
		public IEnumerable<SimpleTest> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("TestByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleTest Simple = new SimpleTest();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tst_ncada = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.tst_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.tst_ireinicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tst_calarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tst_ncada2 = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tst_ntipo2 = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tst_calarmaesperada = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tst_calarmagenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tst_ncada3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.tst_ntipo3 = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.tst_calarma3esperada = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tst_calarma3generar = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tst_cAlarmaAutoprocesa = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tst_cAlarma2Autoprocesa = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tst_cAlarma3Autoprocesa = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tst_iTiempoCtrl = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tst_iCtrlExec = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.tst_cAlarmaCtrlGenerar = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleTest> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("TestByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleTest Simple = new SimpleTest();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tst_ncada = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)Simple.tst_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.tst_ireinicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tst_calarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tst_ncada2 = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tst_ntipo2 = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tst_calarmaesperada = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tst_calarmagenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tst_ncada3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.tst_ntipo3 = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.tst_calarma3esperada = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tst_calarma3generar = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tst_cAlarmaAutoprocesa = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tst_cAlarma2Autoprocesa = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tst_cAlarma3Autoprocesa = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tst_iTiempoCtrl = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)Simple.tst_iCtrlExec = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)Simple.tst_cAlarmaCtrlGenerar = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3031, "Test");
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
    if (Reader.FieldCount > 2)this._tst_ncada = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
if (Reader.FieldCount > 3)this._tst_ntipo = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)this._tst_ireinicio = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._tst_calarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._tst_ncada2 = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)this._tst_ntipo2 = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._tst_calarmaesperada = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._tst_calarmagenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._tst_ncada3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)this._tst_ntipo3 = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)this._tst_calarma3esperada = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._tst_calarma3generar = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._tst_cAlarmaAutoprocesa = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._tst_cAlarma2Autoprocesa = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._tst_cAlarma3Autoprocesa = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._tst_iTiempoCtrl = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);
if (Reader.FieldCount > 18)this._tst_iCtrlExec = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);
if (Reader.FieldCount > 19)this._tst_cAlarmaCtrlGenerar = (Reader.IsDBNull(19)) ? "" : Reader.GetString(19);

    }
    Reader.Close();
    }
   }
  
    }
  