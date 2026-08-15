
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
     ///WeSafeSubscription data access layer   
     ///</summary>
    public class DalWeSafeSubscription : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _wsu_cDealer;
    
      private string _wsu_cID;
    
      private string _wsu_cName;
    
      private string _wsu_cDesc;
    
      private int _wsu_iPriceID;
    
      private int _wsu_iPeriodicityID;
    
      private DateTime? _wsu_tDateCreation;
    
      private DateTime? _wsu_tDateUpdateAndroid;
    
      private int _wsu_iStatusAndroid;
    
      private DateTime? _wsu_tDateUpdateIOS;
    
      private int _wsu_iStatusIOS;
    
      private string _wsu_cSubscriptionGroupIdIOS;
    
      private string _wsu_cSubscriptionIdIOS;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///wsu_cDealer   
     ///</summary>
      public string wsu_cDealer
      {
      
          get{ return this._wsu_cDealer; }
          set{ this._wsu_cDealer = value; }
        
      }
     ///<summary>
     ///wsu_cID   
     ///</summary>
      public string wsu_cID
      {
      
          get{ return this._wsu_cID; }
          set{ this._wsu_cID = value; }
        
      }
     ///<summary>
     ///wsu_cName   
     ///</summary>
      public string wsu_cName
      {
      
          get{ return this._wsu_cName; }
          set{ this._wsu_cName = value; }
        
      }
     ///<summary>
     ///wsu_cDesc   
     ///</summary>
      public string wsu_cDesc
      {
      
          get{ return this._wsu_cDesc; }
          set{ this._wsu_cDesc = value; }
        
      }
     ///<summary>
     ///wsu_iPriceID   
     ///</summary>
      public int wsu_iPriceID
      {
      
          get{ return this._wsu_iPriceID; }
          set{ this._wsu_iPriceID = value; }
        
      }
     ///<summary>
     ///wsu_iPeriodicityID   
     ///</summary>
      public int wsu_iPeriodicityID
      {
      
          get{ return this._wsu_iPeriodicityID; }
          set{ this._wsu_iPeriodicityID = value; }
        
      }
     ///<summary>
     ///wsu_tDateCreation   
     ///</summary>
      public DateTime? wsu_tDateCreation
      {
      
          get{ return this._wsu_tDateCreation; }
          set{ this._wsu_tDateCreation = value; }
        
      }
     ///<summary>
     ///wsu_tDateUpdateAndroid   
     ///</summary>
      public DateTime? wsu_tDateUpdateAndroid
      {
      
          get{ return this._wsu_tDateUpdateAndroid; }
          set{ this._wsu_tDateUpdateAndroid = value; }
        
      }
     ///<summary>
     ///wsu_iStatusAndroid   
     ///</summary>
      public int wsu_iStatusAndroid
      {
      
          get{ return this._wsu_iStatusAndroid; }
          set{ this._wsu_iStatusAndroid = value; }
        
      }
     ///<summary>
     ///wsu_tDateUpdateIOS   
     ///</summary>
      public DateTime? wsu_tDateUpdateIOS
      {
      
          get{ return this._wsu_tDateUpdateIOS; }
          set{ this._wsu_tDateUpdateIOS = value; }
        
      }
     ///<summary>
     ///wsu_iStatusIOS   
     ///</summary>
      public int wsu_iStatusIOS
      {
      
          get{ return this._wsu_iStatusIOS; }
          set{ this._wsu_iStatusIOS = value; }
        
      }
     ///<summary>
     ///wsu_cSubscriptionGroupIdIOS   
     ///</summary>
      public string wsu_cSubscriptionGroupIdIOS
      {
      
          get{ return this._wsu_cSubscriptionGroupIdIOS; }
          set{ this._wsu_cSubscriptionGroupIdIOS = value; }
        
      }
     ///<summary>
     ///wsu_cSubscriptionIdIOS   
     ///</summary>
      public string wsu_cSubscriptionIdIOS
      {
      
          get{ return this._wsu_cSubscriptionIdIOS; }
          set{ this._wsu_cSubscriptionIdIOS = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalWeSafeSubscription(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalWeSafeSubscription(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalWeSafeSubscription(SqlHelper SqlConfig, int UserId, SimpleWeSafeSubscription Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._wsu_cDealer = Simple.wsu_cDealer;

      this._wsu_cID = Simple.wsu_cID;

      this._wsu_cName = Simple.wsu_cName;

      this._wsu_cDesc = Simple.wsu_cDesc;

      this._wsu_iPriceID = Simple.wsu_iPriceID;

      this._wsu_iPeriodicityID = Simple.wsu_iPeriodicityID;

      this._wsu_tDateCreation = Simple.wsu_tDateCreation;

      this._wsu_tDateUpdateAndroid = Simple.wsu_tDateUpdateAndroid;

      this._wsu_iStatusAndroid = Simple.wsu_iStatusAndroid;

      this._wsu_tDateUpdateIOS = Simple.wsu_tDateUpdateIOS;

      this._wsu_iStatusIOS = Simple.wsu_iStatusIOS;

      this._wsu_cSubscriptionGroupIdIOS = Simple.wsu_cSubscriptionGroupIdIOS;

      this._wsu_cSubscriptionIdIOS = Simple.wsu_cSubscriptionIdIOS;

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
    using(var cmd = new SqlCommand("WeSafeSubscriptionIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@wsu_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wsu_cID", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wsu_cName", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_cDesc", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_iPriceID", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_iPeriodicityID", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_tDateCreation", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_tDateUpdateAndroid", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_iStatusAndroid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_tDateUpdateIOS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_iStatusIOS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_cSubscriptionGroupIdIOS", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_cSubscriptionIdIOS", SqlDbType.VarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@wsu_cDealer"].Value = (this._wsu_cDealer == null) ? (object) DBNull.Value : (object) this._wsu_cDealer;

		cmd.Parameters["@wsu_cID"].Value = (this._wsu_cID == null) ? (object) DBNull.Value : (object) this._wsu_cID;

		cmd.Parameters["@wsu_cName"].Value = (this._wsu_cName == null) ? (object) DBNull.Value : (object) this._wsu_cName;

		cmd.Parameters["@wsu_cDesc"].Value = (this._wsu_cDesc == null) ? (object) DBNull.Value : (object) this._wsu_cDesc;

		cmd.Parameters["@wsu_iPriceID"].Value = this._wsu_iPriceID;

		cmd.Parameters["@wsu_iPeriodicityID"].Value = this._wsu_iPeriodicityID;

		cmd.Parameters["@wsu_tDateCreation"].Value = (this._wsu_tDateCreation == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateCreation;

		cmd.Parameters["@wsu_tDateUpdateAndroid"].Value = (this._wsu_tDateUpdateAndroid == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateUpdateAndroid;

		cmd.Parameters["@wsu_iStatusAndroid"].Value = this._wsu_iStatusAndroid;

		cmd.Parameters["@wsu_tDateUpdateIOS"].Value = (this._wsu_tDateUpdateIOS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateUpdateIOS;

		cmd.Parameters["@wsu_iStatusIOS"].Value = this._wsu_iStatusIOS;

		cmd.Parameters["@wsu_cSubscriptionGroupIdIOS"].Value = (this._wsu_cSubscriptionGroupIdIOS == null) ? (object) DBNull.Value : (object) this._wsu_cSubscriptionGroupIdIOS;

		cmd.Parameters["@wsu_cSubscriptionIdIOS"].Value = (this._wsu_cSubscriptionIdIOS == null) ? (object) DBNull.Value : (object) this._wsu_cSubscriptionIdIOS;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("WeSafeSubscriptionUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@wsu_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wsu_cID", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wsu_cName", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_cDesc", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_iPriceID", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_iPeriodicityID", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_tDateCreation", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_tDateUpdateAndroid", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_iStatusAndroid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_tDateUpdateIOS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_iStatusIOS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_cSubscriptionGroupIdIOS", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_cSubscriptionIdIOS", SqlDbType.VarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@wsu_cDealer"].Value = (this._wsu_cDealer == null) ? (object) DBNull.Value : (object) this._wsu_cDealer;

		cmd.Parameters["@wsu_cID"].Value = (this._wsu_cID == null) ? (object) DBNull.Value : (object) this._wsu_cID;

		cmd.Parameters["@wsu_cName"].Value = (this._wsu_cName == null) ? (object) DBNull.Value : (object) this._wsu_cName;

		cmd.Parameters["@wsu_cDesc"].Value = (this._wsu_cDesc == null) ? (object) DBNull.Value : (object) this._wsu_cDesc;

		cmd.Parameters["@wsu_iPriceID"].Value = this._wsu_iPriceID;

		cmd.Parameters["@wsu_iPeriodicityID"].Value = this._wsu_iPeriodicityID;

		cmd.Parameters["@wsu_tDateCreation"].Value = (this._wsu_tDateCreation == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateCreation;

		cmd.Parameters["@wsu_tDateUpdateAndroid"].Value = (this._wsu_tDateUpdateAndroid == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateUpdateAndroid;

		cmd.Parameters["@wsu_iStatusAndroid"].Value = this._wsu_iStatusAndroid;

		cmd.Parameters["@wsu_tDateUpdateIOS"].Value = (this._wsu_tDateUpdateIOS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateUpdateIOS;

		cmd.Parameters["@wsu_iStatusIOS"].Value = this._wsu_iStatusIOS;

		cmd.Parameters["@wsu_cSubscriptionGroupIdIOS"].Value = (this._wsu_cSubscriptionGroupIdIOS == null) ? (object) DBNull.Value : (object) this._wsu_cSubscriptionGroupIdIOS;

		cmd.Parameters["@wsu_cSubscriptionIdIOS"].Value = (this._wsu_cSubscriptionIdIOS == null) ? (object) DBNull.Value : (object) this._wsu_cSubscriptionIdIOS;

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
    throw new RuntimeException("The WeSafeSubscription is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("WeSafeSubscriptionDel", conn))
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
    using(var CmdSel = new SqlCommand("WeSafeSubscriptionSel", conn))
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
    SimpleWeSafeSubscription Simple = new SimpleWeSafeSubscription();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.wsu_cDealer = this._wsu_cDealer;

      Simple.wsu_cID = this._wsu_cID;

      Simple.wsu_cName = this._wsu_cName;

      Simple.wsu_cDesc = this._wsu_cDesc;

      Simple.wsu_iPriceID = this._wsu_iPriceID;

      Simple.wsu_iPeriodicityID = this._wsu_iPeriodicityID;

      Simple.wsu_tDateCreation = this._wsu_tDateCreation;

      Simple.wsu_tDateUpdateAndroid = this._wsu_tDateUpdateAndroid;

      Simple.wsu_iStatusAndroid = this._wsu_iStatusAndroid;

      Simple.wsu_tDateUpdateIOS = this._wsu_tDateUpdateIOS;

      Simple.wsu_iStatusIOS = this._wsu_iStatusIOS;

      Simple.wsu_cSubscriptionGroupIdIOS = this._wsu_cSubscriptionGroupIdIOS;

      Simple.wsu_cSubscriptionIdIOS = this._wsu_cSubscriptionIdIOS;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleWeSafeSubscription)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._wsu_cDealer = Simple.wsu_cDealer;

      this._wsu_cID = Simple.wsu_cID;

      this._wsu_cName = Simple.wsu_cName;

      this._wsu_cDesc = Simple.wsu_cDesc;

      this._wsu_iPriceID = Simple.wsu_iPriceID;

      this._wsu_iPeriodicityID = Simple.wsu_iPeriodicityID;

      this._wsu_tDateCreation = Simple.wsu_tDateCreation;

      this._wsu_tDateUpdateAndroid = Simple.wsu_tDateUpdateAndroid;

      this._wsu_iStatusAndroid = Simple.wsu_iStatusAndroid;

      this._wsu_tDateUpdateIOS = Simple.wsu_tDateUpdateIOS;

      this._wsu_iStatusIOS = Simple.wsu_iStatusIOS;

      this._wsu_cSubscriptionGroupIdIOS = Simple.wsu_cSubscriptionGroupIdIOS;

      this._wsu_cSubscriptionIdIOS = Simple.wsu_cSubscriptionIdIOS;

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
    CallerWeSafeSubscription Caller = new CallerWeSafeSubscription();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.wsu_cDealer = this._wsu_cDealer;

      Caller.wsu_cID = this._wsu_cID;

      Caller.wsu_cName = this._wsu_cName;

      Caller.wsu_cDesc = this._wsu_cDesc;

      Caller.wsu_iPriceID = this._wsu_iPriceID;

      Caller.wsu_iPeriodicityID = this._wsu_iPeriodicityID;

      Caller.wsu_tDateCreation = this._wsu_tDateCreation;

      Caller.wsu_tDateUpdateAndroid = this._wsu_tDateUpdateAndroid;

      Caller.wsu_iStatusAndroid = this._wsu_iStatusAndroid;

      Caller.wsu_tDateUpdateIOS = this._wsu_tDateUpdateIOS;

      Caller.wsu_iStatusIOS = this._wsu_iStatusIOS;

      Caller.wsu_cSubscriptionGroupIdIOS = this._wsu_cSubscriptionGroupIdIOS;

      Caller.wsu_cSubscriptionIdIOS = this._wsu_cSubscriptionIdIOS;

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
    
      dt.Columns.Add(new DataColumn("wsu_cDealer", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wsu_cID", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wsu_cName", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wsu_cDesc", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wsu_iPriceID", typeof (int)));
    
      dt.Columns.Add(new DataColumn("wsu_iPeriodicityID", typeof (int)));
    
      dt.Columns.Add(new DataColumn("wsu_tDateCreation", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("wsu_tDateUpdateAndroid", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("wsu_iStatusAndroid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("wsu_tDateUpdateIOS", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("wsu_iStatusIOS", typeof (int)));
    
      dt.Columns.Add(new DataColumn("wsu_cSubscriptionGroupIdIOS", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wsu_cSubscriptionIdIOS", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["wsu_cDealer"] = this._wsu_cDealer;

      dr["wsu_cID"] = this._wsu_cID;

      dr["wsu_cName"] = this._wsu_cName;

      dr["wsu_cDesc"] = this._wsu_cDesc;

      dr["wsu_iPriceID"] = this._wsu_iPriceID;

      dr["wsu_iPeriodicityID"] = this._wsu_iPeriodicityID;

      dr["wsu_tDateCreation"] = (object)this._wsu_tDateCreation  ?? DBNull.Value;

      dr["wsu_tDateUpdateAndroid"] = (object)this._wsu_tDateUpdateAndroid  ?? DBNull.Value;

      dr["wsu_iStatusAndroid"] = this._wsu_iStatusAndroid;

      dr["wsu_tDateUpdateIOS"] = (object)this._wsu_tDateUpdateIOS  ?? DBNull.Value;

      dr["wsu_iStatusIOS"] = this._wsu_iStatusIOS;

      dr["wsu_cSubscriptionGroupIdIOS"] = this._wsu_cSubscriptionGroupIdIOS;

      dr["wsu_cSubscriptionIdIOS"] = this._wsu_cSubscriptionIdIOS;

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
    using(var CmdChilds = new SqlCommand("WeSafeSubscriptionByChildObject", conn))
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
    SimpleWeSafeSubscription Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("WeSafeSubscriptionByChildObject", conn))
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
    Simple = new SimpleWeSafeSubscription();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wsu_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wsu_cID = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wsu_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wsu_cDesc = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wsu_iPriceID = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.wsu_iPeriodicityID = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.wsu_tDateCreation = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.wsu_tDateUpdateAndroid = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.wsu_iStatusAndroid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.wsu_tDateUpdateIOS = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.wsu_iStatusIOS = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.wsu_cSubscriptionGroupIdIOS = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.wsu_cSubscriptionIdIOS = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);


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
    SimpleWeSafeSubscription Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleWeSafeSubscription();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.wsu_cDealer = (Row["wsu_cDealer"] == DBNull.Value) ? "" : (string) Row["wsu_cDealer"];

Simple.wsu_cID = (Row["wsu_cID"] == DBNull.Value) ? "" : (string) Row["wsu_cID"];

Simple.wsu_cName = (Row["wsu_cName"] == DBNull.Value) ? "" : (string) Row["wsu_cName"];

Simple.wsu_cDesc = (Row["wsu_cDesc"] == DBNull.Value) ? "" : (string) Row["wsu_cDesc"];

Simple.wsu_iPriceID = (Row["wsu_iPriceID"] == DBNull.Value) ? 0 : (int) Row["wsu_iPriceID"];

Simple.wsu_iPeriodicityID = (Row["wsu_iPeriodicityID"] == DBNull.Value) ? 0 : (int) Row["wsu_iPeriodicityID"];

Simple.wsu_tDateCreation = (Row["wsu_tDateCreation"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["wsu_tDateCreation"];

Simple.wsu_tDateUpdateAndroid = (Row["wsu_tDateUpdateAndroid"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["wsu_tDateUpdateAndroid"];

Simple.wsu_iStatusAndroid = (Row["wsu_iStatusAndroid"] == DBNull.Value) ? 0 : (int) Row["wsu_iStatusAndroid"];

Simple.wsu_tDateUpdateIOS = (Row["wsu_tDateUpdateIOS"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["wsu_tDateUpdateIOS"];

Simple.wsu_iStatusIOS = (Row["wsu_iStatusIOS"] == DBNull.Value) ? 0 : (int) Row["wsu_iStatusIOS"];

Simple.wsu_cSubscriptionGroupIdIOS = (Row["wsu_cSubscriptionGroupIdIOS"] == DBNull.Value) ? "" : (string) Row["wsu_cSubscriptionGroupIdIOS"];

Simple.wsu_cSubscriptionIdIOS = (Row["wsu_cSubscriptionIdIOS"] == DBNull.Value) ? "" : (string) Row["wsu_cSubscriptionIdIOS"];


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
    using(var CmdParents = new SqlCommand("WeSafeSubscriptionByParentObject", conn))
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
    SimpleWeSafeSubscription Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("WeSafeSubscriptionByParentObject", conn))
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
    Simple = new SimpleWeSafeSubscription();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wsu_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wsu_cID = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wsu_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wsu_cDesc = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wsu_iPriceID = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.wsu_iPeriodicityID = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.wsu_tDateCreation = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.wsu_tDateUpdateAndroid = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.wsu_iStatusAndroid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.wsu_tDateUpdateIOS = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.wsu_iStatusIOS = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.wsu_cSubscriptionGroupIdIOS = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.wsu_cSubscriptionIdIOS = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);


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
    using (var CmdDataByName = new SqlCommand("WeSafeSubscriptionByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("WeSafeSubscriptionByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("WeSafeSubscriptionByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("WeSafeSubscriptionByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("WeSafeSubscriptionByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleWeSafeSubscription Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("WeSafeSubscriptionBySimpleWeSafeSubscription", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@wsu_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wsu_cID", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wsu_cName", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_cDesc", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_iPriceID", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_iPeriodicityID", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_tDateCreation", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_tDateUpdateAndroid", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_iStatusAndroid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_tDateUpdateIOS", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@wsu_iStatusIOS", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@wsu_cSubscriptionGroupIdIOS", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wsu_cSubscriptionIdIOS", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@wsu_cDealer"].Value = (this._wsu_cDealer == null) ? (object) DBNull.Value : (object) this._wsu_cDealer;

		cmd.Parameters["@wsu_cID"].Value = (this._wsu_cID == null) ? (object) DBNull.Value : (object) this._wsu_cID;

		cmd.Parameters["@wsu_cName"].Value = (this._wsu_cName == null) ? (object) DBNull.Value : (object) this._wsu_cName;

		cmd.Parameters["@wsu_cDesc"].Value = (this._wsu_cDesc == null) ? (object) DBNull.Value : (object) this._wsu_cDesc;

		cmd.Parameters["@wsu_iPriceID"].Value = this._wsu_iPriceID;

		cmd.Parameters["@wsu_iPeriodicityID"].Value = this._wsu_iPeriodicityID;

		cmd.Parameters["@wsu_tDateCreation"].Value = (this._wsu_tDateCreation == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateCreation;

		cmd.Parameters["@wsu_tDateUpdateAndroid"].Value = (this._wsu_tDateUpdateAndroid == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateUpdateAndroid;

		cmd.Parameters["@wsu_iStatusAndroid"].Value = this._wsu_iStatusAndroid;

		cmd.Parameters["@wsu_tDateUpdateIOS"].Value = (this._wsu_tDateUpdateIOS == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._wsu_tDateUpdateIOS;

		cmd.Parameters["@wsu_iStatusIOS"].Value = this._wsu_iStatusIOS;

		cmd.Parameters["@wsu_cSubscriptionGroupIdIOS"].Value = (this._wsu_cSubscriptionGroupIdIOS == null) ? (object) DBNull.Value : (object) this._wsu_cSubscriptionGroupIdIOS;

		cmd.Parameters["@wsu_cSubscriptionIdIOS"].Value = (this._wsu_cSubscriptionIdIOS == null) ? (object) DBNull.Value : (object) this._wsu_cSubscriptionIdIOS;


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
		 
		public IEnumerable<SimpleWeSafeSubscription> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("WeSafeSubscriptionByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleWeSafeSubscription Simple = new SimpleWeSafeSubscription();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wsu_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wsu_cID = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wsu_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wsu_cDesc = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wsu_iPriceID = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.wsu_iPeriodicityID = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.wsu_tDateCreation = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.wsu_tDateUpdateAndroid = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.wsu_iStatusAndroid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.wsu_tDateUpdateIOS = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.wsu_iStatusIOS = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.wsu_cSubscriptionGroupIdIOS = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.wsu_cSubscriptionIdIOS = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleWeSafeSubscription> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("WeSafeSubscriptionByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleWeSafeSubscription Simple = new SimpleWeSafeSubscription();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wsu_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wsu_cID = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wsu_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wsu_cDesc = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wsu_iPriceID = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.wsu_iPeriodicityID = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.wsu_tDateCreation = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.wsu_tDateUpdateAndroid = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.wsu_iStatusAndroid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.wsu_tDateUpdateIOS = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)Simple.wsu_iStatusIOS = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.wsu_cSubscriptionGroupIdIOS = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.wsu_cSubscriptionIdIOS = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(7038, "WeSafeSubscription");
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
    if (Reader.FieldCount > 2)this._wsu_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._wsu_cID = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._wsu_cName = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._wsu_cDesc = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._wsu_iPriceID = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._wsu_iPeriodicityID = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._wsu_tDateCreation = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)this._wsu_tDateUpdateAndroid = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)this._wsu_iStatusAndroid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._wsu_tDateUpdateIOS = (Reader.IsDBNull(11)) ? new DateTime(1,1,1) : Reader.GetDateTime(11);
if (Reader.FieldCount > 12)this._wsu_iStatusIOS = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._wsu_cSubscriptionGroupIdIOS = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._wsu_cSubscriptionIdIOS = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);

    }
    Reader.Close();
    }
   }
  
    }
  