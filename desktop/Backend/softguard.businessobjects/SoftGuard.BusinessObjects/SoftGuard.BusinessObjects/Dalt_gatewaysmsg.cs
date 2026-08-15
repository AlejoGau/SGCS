
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
     ///t_gatewaysmsg data access layer   
     ///</summary>
    public class Dalt_gatewaysmsg : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _tgm_idkey;
    
      private string _tgm_cdescripcion;
    
      private int _tgm_ntipo;
    
      private string _tgm_csmppsystemid;
    
      private string _tgm_csmpppassword;
    
      private string _tgm_csmpphostname;
    
      private Decimal _tgm_nsmppport;
    
      private string _tgm_nsmpsourceadd;
    
      private string _tgm_chttpurl;
    
      private string _tgm_capimail;
    
      private string _tgm_cuser;
    
      private string _tgm_cpassword;
    
      private string _tgm_cdll;
    
      private string _tgm_cconfig;
    
      private string _tgm_cmetadata;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///tgm_idkey   
     ///</summary>
      public int tgm_idkey
      {
      
          get{ return this._tgm_idkey; }
          set{ this._tgm_idkey = value; }
        
      }
     ///<summary>
     ///tgm_cdescripcion   
     ///</summary>
      public string tgm_cdescripcion
      {
      
          get{ return this._tgm_cdescripcion; }
          set{ this._tgm_cdescripcion = value; }
        
      }
     ///<summary>
     ///tgm_ntipo   
     ///</summary>
      public int tgm_ntipo
      {
      
          get{ return this._tgm_ntipo; }
          set{ this._tgm_ntipo = value; }
        
      }
     ///<summary>
     ///tgm_csmppsystemid   
     ///</summary>
      public string tgm_csmppsystemid
      {
      
          get{ return this._tgm_csmppsystemid; }
          set{ this._tgm_csmppsystemid = value; }
        
      }
     ///<summary>
     ///tgm_csmpppassword   
     ///</summary>
      public string tgm_csmpppassword
      {
      
          get{ return this._tgm_csmpppassword; }
          set{ this._tgm_csmpppassword = value; }
        
      }
     ///<summary>
     ///tgm_csmpphostname   
     ///</summary>
      public string tgm_csmpphostname
      {
      
          get{ return this._tgm_csmpphostname; }
          set{ this._tgm_csmpphostname = value; }
        
      }
     ///<summary>
     ///tgm_nsmppport   
     ///</summary>
      public Decimal tgm_nsmppport
      {
      
          get{ return this._tgm_nsmppport; }
          set{ this._tgm_nsmppport = value; }
        
      }
     ///<summary>
     ///tgm_nsmpsourceadd   
     ///</summary>
      public string tgm_nsmpsourceadd
      {
      
          get{ return this._tgm_nsmpsourceadd; }
          set{ this._tgm_nsmpsourceadd = value; }
        
      }
     ///<summary>
     ///tgm_chttpurl   
     ///</summary>
      public string tgm_chttpurl
      {
      
          get{ return this._tgm_chttpurl; }
          set{ this._tgm_chttpurl = value; }
        
      }
     ///<summary>
     ///tgm_capimail   
     ///</summary>
      public string tgm_capimail
      {
      
          get{ return this._tgm_capimail; }
          set{ this._tgm_capimail = value; }
        
      }
     ///<summary>
     ///tgm_cuser   
     ///</summary>
      public string tgm_cuser
      {
      
          get{ return this._tgm_cuser; }
          set{ this._tgm_cuser = value; }
        
      }
     ///<summary>
     ///tgm_cpassword   
     ///</summary>
      public string tgm_cpassword
      {
      
          get{ return this._tgm_cpassword; }
          set{ this._tgm_cpassword = value; }
        
      }
     ///<summary>
     ///tgm_cdll   
     ///</summary>
      public string tgm_cdll
      {
      
          get{ return this._tgm_cdll; }
          set{ this._tgm_cdll = value; }
        
      }
     ///<summary>
     ///tgm_cconfig   
     ///</summary>
      public string tgm_cconfig
      {
      
          get{ return this._tgm_cconfig; }
          set{ this._tgm_cconfig = value; }
        
      }
     ///<summary>
     ///tgm_cmetadata   
     ///</summary>
      public string tgm_cmetadata
      {
      
          get{ return this._tgm_cmetadata; }
          set{ this._tgm_cmetadata = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_gatewaysmsg(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_gatewaysmsg(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_gatewaysmsg(SqlHelper SqlConfig, int UserId, Simplet_gatewaysmsg Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tgm_idkey = Simple.tgm_idkey;

      this._tgm_cdescripcion = Simple.tgm_cdescripcion;

      this._tgm_ntipo = Simple.tgm_ntipo;

      this._tgm_csmppsystemid = Simple.tgm_csmppsystemid;

      this._tgm_csmpppassword = Simple.tgm_csmpppassword;

      this._tgm_csmpphostname = Simple.tgm_csmpphostname;

      this._tgm_nsmppport = Simple.tgm_nsmppport;

      this._tgm_nsmpsourceadd = Simple.tgm_nsmpsourceadd;

      this._tgm_chttpurl = Simple.tgm_chttpurl;

      this._tgm_capimail = Simple.tgm_capimail;

      this._tgm_cuser = Simple.tgm_cuser;

      this._tgm_cpassword = Simple.tgm_cpassword;

      this._tgm_cdll = Simple.tgm_cdll;

      this._tgm_cconfig = Simple.tgm_cconfig;

      this._tgm_cmetadata = Simple.tgm_cmetadata;

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
    using(var cmd = new SqlCommand("t_gatewaysmsgIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tgm_idkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgm_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgm_csmppsystemid", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_csmpppassword", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_csmpphostname", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_nsmppport", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tgm_nsmpsourceadd", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tgm_chttpurl", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_capimail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cuser", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cpassword", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cdll", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cconfig", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cmetadata", SqlDbType.VarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tgm_idkey"].Value = this._tgm_idkey;

		cmd.Parameters["@tgm_cdescripcion"].Value = (this._tgm_cdescripcion == null) ? (object) DBNull.Value : (object) this._tgm_cdescripcion;

		cmd.Parameters["@tgm_ntipo"].Value = this._tgm_ntipo;

		cmd.Parameters["@tgm_csmppsystemid"].Value = (this._tgm_csmppsystemid == null) ? (object) DBNull.Value : (object) this._tgm_csmppsystemid;

		cmd.Parameters["@tgm_csmpppassword"].Value = (this._tgm_csmpppassword == null) ? (object) DBNull.Value : (object) this._tgm_csmpppassword;

		cmd.Parameters["@tgm_csmpphostname"].Value = (this._tgm_csmpphostname == null) ? (object) DBNull.Value : (object) this._tgm_csmpphostname;

		cmd.Parameters["@tgm_nsmppport"].Value = this._tgm_nsmppport;

		cmd.Parameters["@tgm_nsmpsourceadd"].Value = (this._tgm_nsmpsourceadd == null) ? (object) DBNull.Value : (object) this._tgm_nsmpsourceadd;

		cmd.Parameters["@tgm_chttpurl"].Value = (this._tgm_chttpurl == null) ? (object) DBNull.Value : (object) this._tgm_chttpurl;

		cmd.Parameters["@tgm_capimail"].Value = (this._tgm_capimail == null) ? (object) DBNull.Value : (object) this._tgm_capimail;

		cmd.Parameters["@tgm_cuser"].Value = (this._tgm_cuser == null) ? (object) DBNull.Value : (object) this._tgm_cuser;

		cmd.Parameters["@tgm_cpassword"].Value = (this._tgm_cpassword == null) ? (object) DBNull.Value : (object) this._tgm_cpassword;

		cmd.Parameters["@tgm_cdll"].Value = (this._tgm_cdll == null) ? (object) DBNull.Value : (object) this._tgm_cdll;

		cmd.Parameters["@tgm_cconfig"].Value = (this._tgm_cconfig == null) ? (object) DBNull.Value : (object) this._tgm_cconfig;

		cmd.Parameters["@tgm_cmetadata"].Value = (this._tgm_cmetadata == null) ? (object) DBNull.Value : (object) this._tgm_cmetadata;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_gatewaysmsgUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tgm_idkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgm_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgm_csmppsystemid", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_csmpppassword", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_csmpphostname", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_nsmppport", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tgm_nsmpsourceadd", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tgm_chttpurl", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_capimail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cuser", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cpassword", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cdll", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cconfig", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cmetadata", SqlDbType.VarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tgm_idkey"].Value = this._tgm_idkey;

		cmd.Parameters["@tgm_cdescripcion"].Value = (this._tgm_cdescripcion == null) ? (object) DBNull.Value : (object) this._tgm_cdescripcion;

		cmd.Parameters["@tgm_ntipo"].Value = this._tgm_ntipo;

		cmd.Parameters["@tgm_csmppsystemid"].Value = (this._tgm_csmppsystemid == null) ? (object) DBNull.Value : (object) this._tgm_csmppsystemid;

		cmd.Parameters["@tgm_csmpppassword"].Value = (this._tgm_csmpppassword == null) ? (object) DBNull.Value : (object) this._tgm_csmpppassword;

		cmd.Parameters["@tgm_csmpphostname"].Value = (this._tgm_csmpphostname == null) ? (object) DBNull.Value : (object) this._tgm_csmpphostname;

		cmd.Parameters["@tgm_nsmppport"].Value = this._tgm_nsmppport;

		cmd.Parameters["@tgm_nsmpsourceadd"].Value = (this._tgm_nsmpsourceadd == null) ? (object) DBNull.Value : (object) this._tgm_nsmpsourceadd;

		cmd.Parameters["@tgm_chttpurl"].Value = (this._tgm_chttpurl == null) ? (object) DBNull.Value : (object) this._tgm_chttpurl;

		cmd.Parameters["@tgm_capimail"].Value = (this._tgm_capimail == null) ? (object) DBNull.Value : (object) this._tgm_capimail;

		cmd.Parameters["@tgm_cuser"].Value = (this._tgm_cuser == null) ? (object) DBNull.Value : (object) this._tgm_cuser;

		cmd.Parameters["@tgm_cpassword"].Value = (this._tgm_cpassword == null) ? (object) DBNull.Value : (object) this._tgm_cpassword;

		cmd.Parameters["@tgm_cdll"].Value = (this._tgm_cdll == null) ? (object) DBNull.Value : (object) this._tgm_cdll;

		cmd.Parameters["@tgm_cconfig"].Value = (this._tgm_cconfig == null) ? (object) DBNull.Value : (object) this._tgm_cconfig;

		cmd.Parameters["@tgm_cmetadata"].Value = (this._tgm_cmetadata == null) ? (object) DBNull.Value : (object) this._tgm_cmetadata;

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
    throw new RuntimeException("The t_gatewaysmsg is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_gatewaysmsgDel", conn))
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
    using(var CmdSel = new SqlCommand("t_gatewaysmsgSel", conn))
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
    Simplet_gatewaysmsg Simple = new Simplet_gatewaysmsg();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.tgm_idkey = this._tgm_idkey;

      Simple.tgm_cdescripcion = this._tgm_cdescripcion;

      Simple.tgm_ntipo = this._tgm_ntipo;

      Simple.tgm_csmppsystemid = this._tgm_csmppsystemid;

      Simple.tgm_csmpppassword = this._tgm_csmpppassword;

      Simple.tgm_csmpphostname = this._tgm_csmpphostname;

      Simple.tgm_nsmppport = this._tgm_nsmppport;

      Simple.tgm_nsmpsourceadd = this._tgm_nsmpsourceadd;

      Simple.tgm_chttpurl = this._tgm_chttpurl;

      Simple.tgm_capimail = this._tgm_capimail;

      Simple.tgm_cuser = this._tgm_cuser;

      Simple.tgm_cpassword = this._tgm_cpassword;

      Simple.tgm_cdll = this._tgm_cdll;

      Simple.tgm_cconfig = this._tgm_cconfig;

      Simple.tgm_cmetadata = this._tgm_cmetadata;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_gatewaysmsg)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tgm_idkey = Simple.tgm_idkey;

      this._tgm_cdescripcion = Simple.tgm_cdescripcion;

      this._tgm_ntipo = Simple.tgm_ntipo;

      this._tgm_csmppsystemid = Simple.tgm_csmppsystemid;

      this._tgm_csmpppassword = Simple.tgm_csmpppassword;

      this._tgm_csmpphostname = Simple.tgm_csmpphostname;

      this._tgm_nsmppport = Simple.tgm_nsmppport;

      this._tgm_nsmpsourceadd = Simple.tgm_nsmpsourceadd;

      this._tgm_chttpurl = Simple.tgm_chttpurl;

      this._tgm_capimail = Simple.tgm_capimail;

      this._tgm_cuser = Simple.tgm_cuser;

      this._tgm_cpassword = Simple.tgm_cpassword;

      this._tgm_cdll = Simple.tgm_cdll;

      this._tgm_cconfig = Simple.tgm_cconfig;

      this._tgm_cmetadata = Simple.tgm_cmetadata;

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
    Callert_gatewaysmsg Caller = new Callert_gatewaysmsg();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.tgm_idkey = this._tgm_idkey;

      Caller.tgm_cdescripcion = this._tgm_cdescripcion;

      Caller.tgm_ntipo = this._tgm_ntipo;

      Caller.tgm_csmppsystemid = this._tgm_csmppsystemid;

      Caller.tgm_csmpppassword = this._tgm_csmpppassword;

      Caller.tgm_csmpphostname = this._tgm_csmpphostname;

      Caller.tgm_nsmppport = this._tgm_nsmppport;

      Caller.tgm_nsmpsourceadd = this._tgm_nsmpsourceadd;

      Caller.tgm_chttpurl = this._tgm_chttpurl;

      Caller.tgm_capimail = this._tgm_capimail;

      Caller.tgm_cuser = this._tgm_cuser;

      Caller.tgm_cpassword = this._tgm_cpassword;

      Caller.tgm_cdll = this._tgm_cdll;

      Caller.tgm_cconfig = this._tgm_cconfig;

      Caller.tgm_cmetadata = this._tgm_cmetadata;

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
    
      dt.Columns.Add(new DataColumn("tgm_idkey", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgm_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_ntipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tgm_csmppsystemid", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_csmpppassword", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_csmpphostname", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_nsmppport", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tgm_nsmpsourceadd", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_chttpurl", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_capimail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_cuser", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_cpassword", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_cdll", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_cconfig", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tgm_cmetadata", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["tgm_idkey"] = this._tgm_idkey;

      dr["tgm_cdescripcion"] = this._tgm_cdescripcion;

      dr["tgm_ntipo"] = this._tgm_ntipo;

      dr["tgm_csmppsystemid"] = this._tgm_csmppsystemid;

      dr["tgm_csmpppassword"] = this._tgm_csmpppassword;

      dr["tgm_csmpphostname"] = this._tgm_csmpphostname;

      dr["tgm_nsmppport"] = this._tgm_nsmppport;

      dr["tgm_nsmpsourceadd"] = this._tgm_nsmpsourceadd;

      dr["tgm_chttpurl"] = this._tgm_chttpurl;

      dr["tgm_capimail"] = this._tgm_capimail;

      dr["tgm_cuser"] = this._tgm_cuser;

      dr["tgm_cpassword"] = this._tgm_cpassword;

      dr["tgm_cdll"] = this._tgm_cdll;

      dr["tgm_cconfig"] = this._tgm_cconfig;

      dr["tgm_cmetadata"] = this._tgm_cmetadata;

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
    using(var CmdChilds = new SqlCommand("t_gatewaysmsgByChildObject", conn))
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
    Simplet_gatewaysmsg Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_gatewaysmsgByChildObject", conn))
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
    Simple = new Simplet_gatewaysmsg();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgm_idkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tgm_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tgm_ntipo = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tgm_csmppsystemid = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tgm_csmpppassword = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tgm_csmpphostname = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tgm_nsmppport = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tgm_nsmpsourceadd = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgm_chttpurl = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tgm_capimail = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.tgm_cuser = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tgm_cpassword = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgm_cdll = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tgm_cconfig = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tgm_cmetadata = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);


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
    Simplet_gatewaysmsg Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_gatewaysmsg();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.tgm_idkey = (Row["tgm_idkey"] == DBNull.Value) ? 0 : (int) Row["tgm_idkey"];

Simple.tgm_cdescripcion = (Row["tgm_cdescripcion"] == DBNull.Value) ? "" : (string) Row["tgm_cdescripcion"];

Simple.tgm_ntipo = (Row["tgm_ntipo"] == DBNull.Value) ? 0 : (int) Row["tgm_ntipo"];

Simple.tgm_csmppsystemid = (Row["tgm_csmppsystemid"] == DBNull.Value) ? "" : (string) Row["tgm_csmppsystemid"];

Simple.tgm_csmpppassword = (Row["tgm_csmpppassword"] == DBNull.Value) ? "" : (string) Row["tgm_csmpppassword"];

Simple.tgm_csmpphostname = (Row["tgm_csmpphostname"] == DBNull.Value) ? "" : (string) Row["tgm_csmpphostname"];

Simple.tgm_nsmppport = (Row["tgm_nsmppport"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tgm_nsmppport"];

Simple.tgm_nsmpsourceadd = (Row["tgm_nsmpsourceadd"] == DBNull.Value) ? "" : (string) Row["tgm_nsmpsourceadd"];

Simple.tgm_chttpurl = (Row["tgm_chttpurl"] == DBNull.Value) ? "" : (string) Row["tgm_chttpurl"];

Simple.tgm_capimail = (Row["tgm_capimail"] == DBNull.Value) ? "" : (string) Row["tgm_capimail"];

Simple.tgm_cuser = (Row["tgm_cuser"] == DBNull.Value) ? "" : (string) Row["tgm_cuser"];

Simple.tgm_cpassword = (Row["tgm_cpassword"] == DBNull.Value) ? "" : (string) Row["tgm_cpassword"];

Simple.tgm_cdll = (Row["tgm_cdll"] == DBNull.Value) ? "" : (string) Row["tgm_cdll"];

Simple.tgm_cconfig = (Row["tgm_cconfig"] == DBNull.Value) ? "" : (string) Row["tgm_cconfig"];

Simple.tgm_cmetadata = (Row["tgm_cmetadata"] == DBNull.Value) ? "" : (string) Row["tgm_cmetadata"];


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
    using(var CmdParents = new SqlCommand("t_gatewaysmsgByParentObject", conn))
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
    Simplet_gatewaysmsg Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_gatewaysmsgByParentObject", conn))
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
    Simple = new Simplet_gatewaysmsg();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgm_idkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tgm_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tgm_ntipo = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tgm_csmppsystemid = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tgm_csmpppassword = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tgm_csmpphostname = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tgm_nsmppport = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tgm_nsmpsourceadd = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgm_chttpurl = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tgm_capimail = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.tgm_cuser = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tgm_cpassword = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgm_cdll = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tgm_cconfig = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tgm_cmetadata = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);


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
    using (var CmdDataByName = new SqlCommand("t_gatewaysmsgByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_gatewaysmsgByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_gatewaysmsgByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_gatewaysmsgByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_gatewaysmsgByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_gatewaysmsg Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_gatewaysmsgBySimplet_gatewaysmsg", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tgm_idkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgm_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tgm_csmppsystemid", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_csmpppassword", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_csmpphostname", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_nsmppport", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tgm_nsmpsourceadd", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tgm_chttpurl", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_capimail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cuser", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cpassword", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cdll", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cconfig", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tgm_cmetadata", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@tgm_idkey"].Value = this._tgm_idkey;

		cmd.Parameters["@tgm_cdescripcion"].Value = (this._tgm_cdescripcion == null) ? (object) DBNull.Value : (object) this._tgm_cdescripcion;

		cmd.Parameters["@tgm_ntipo"].Value = this._tgm_ntipo;

		cmd.Parameters["@tgm_csmppsystemid"].Value = (this._tgm_csmppsystemid == null) ? (object) DBNull.Value : (object) this._tgm_csmppsystemid;

		cmd.Parameters["@tgm_csmpppassword"].Value = (this._tgm_csmpppassword == null) ? (object) DBNull.Value : (object) this._tgm_csmpppassword;

		cmd.Parameters["@tgm_csmpphostname"].Value = (this._tgm_csmpphostname == null) ? (object) DBNull.Value : (object) this._tgm_csmpphostname;

		cmd.Parameters["@tgm_nsmppport"].Value = this._tgm_nsmppport;

		cmd.Parameters["@tgm_nsmpsourceadd"].Value = (this._tgm_nsmpsourceadd == null) ? (object) DBNull.Value : (object) this._tgm_nsmpsourceadd;

		cmd.Parameters["@tgm_chttpurl"].Value = (this._tgm_chttpurl == null) ? (object) DBNull.Value : (object) this._tgm_chttpurl;

		cmd.Parameters["@tgm_capimail"].Value = (this._tgm_capimail == null) ? (object) DBNull.Value : (object) this._tgm_capimail;

		cmd.Parameters["@tgm_cuser"].Value = (this._tgm_cuser == null) ? (object) DBNull.Value : (object) this._tgm_cuser;

		cmd.Parameters["@tgm_cpassword"].Value = (this._tgm_cpassword == null) ? (object) DBNull.Value : (object) this._tgm_cpassword;

		cmd.Parameters["@tgm_cdll"].Value = (this._tgm_cdll == null) ? (object) DBNull.Value : (object) this._tgm_cdll;

		cmd.Parameters["@tgm_cconfig"].Value = (this._tgm_cconfig == null) ? (object) DBNull.Value : (object) this._tgm_cconfig;

		cmd.Parameters["@tgm_cmetadata"].Value = (this._tgm_cmetadata == null) ? (object) DBNull.Value : (object) this._tgm_cmetadata;


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
		 
		public IEnumerable<Simplet_gatewaysmsg> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_gatewaysmsgByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_gatewaysmsg Simple = new Simplet_gatewaysmsg();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgm_idkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tgm_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tgm_ntipo = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tgm_csmppsystemid = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tgm_csmpppassword = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tgm_csmpphostname = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tgm_nsmppport = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tgm_nsmpsourceadd = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgm_chttpurl = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tgm_capimail = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.tgm_cuser = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tgm_cpassword = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgm_cdll = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tgm_cconfig = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tgm_cmetadata = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_gatewaysmsg> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_gatewaysmsgByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_gatewaysmsg Simple = new Simplet_gatewaysmsg();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tgm_idkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tgm_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tgm_ntipo = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tgm_csmppsystemid = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tgm_csmpppassword = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tgm_csmpphostname = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tgm_nsmppport = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tgm_nsmpsourceadd = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tgm_chttpurl = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tgm_capimail = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.tgm_cuser = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tgm_cpassword = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tgm_cdll = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tgm_cconfig = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.tgm_cmetadata = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3126, "t_gatewaysmsg");
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
    if (Reader.FieldCount > 2)this._tgm_idkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._tgm_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._tgm_ntipo = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._tgm_csmppsystemid = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._tgm_csmpppassword = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._tgm_csmpphostname = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._tgm_nsmppport = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)this._tgm_nsmpsourceadd = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._tgm_chttpurl = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._tgm_capimail = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._tgm_cuser = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._tgm_cpassword = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._tgm_cdll = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._tgm_cconfig = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._tgm_cmetadata = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);

    }
    Reader.Close();
    }
   }
  
    }
  
