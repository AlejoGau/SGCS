
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
     ///WeSafeConfig data access layer   
     ///</summary>
    public class DalWeSafeConfig : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _wcf_cDealer;
    
      private string _wcf_cEndPointAppStore;
    
      private string _wcf_cMailGoogleStore;
    
      private string _wcf_cAppNameAppStore;
    
      private string _wcf_cIssuerID;
    
      private string _wcf_cKeyIdAppStore;
    
      private string _wcf_cAppNameGoogleStore;
    
      private string _wcf_cEndPointGooglePlay;
    
      private string _wcf_cPrivateKeyAppStore;
    
      private string _wcf_cPrivateKeyGoogleStore;
    
      private string _idsPublicidad;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///wcf_cDealer   
     ///</summary>
      public string wcf_cDealer
      {
      
          get{ return this._wcf_cDealer; }
          set{ this._wcf_cDealer = value; }
        
      }
     ///<summary>
     ///wcf_cEndPointAppStore   
     ///</summary>
      public string wcf_cEndPointAppStore
      {
      
          get{ return this._wcf_cEndPointAppStore; }
          set{ this._wcf_cEndPointAppStore = value; }
        
      }
     ///<summary>
     ///wcf_cMailGoogleStore   
     ///</summary>
      public string wcf_cMailGoogleStore
      {
      
          get{ return this._wcf_cMailGoogleStore; }
          set{ this._wcf_cMailGoogleStore = value; }
        
      }
     ///<summary>
     ///wcf_cAppNameAppStore   
     ///</summary>
      public string wcf_cAppNameAppStore
      {
      
          get{ return this._wcf_cAppNameAppStore; }
          set{ this._wcf_cAppNameAppStore = value; }
        
      }
     ///<summary>
     ///wcf_cIssuerID   
     ///</summary>
      public string wcf_cIssuerID
      {
      
          get{ return this._wcf_cIssuerID; }
          set{ this._wcf_cIssuerID = value; }
        
      }
     ///<summary>
     ///wcf_cKeyIdAppStore   
     ///</summary>
      public string wcf_cKeyIdAppStore
      {
      
          get{ return this._wcf_cKeyIdAppStore; }
          set{ this._wcf_cKeyIdAppStore = value; }
        
      }
     ///<summary>
     ///wcf_cAppNameGoogleStore   
     ///</summary>
      public string wcf_cAppNameGoogleStore
      {
      
          get{ return this._wcf_cAppNameGoogleStore; }
          set{ this._wcf_cAppNameGoogleStore = value; }
        
      }
     ///<summary>
     ///wcf_cEndPointGooglePlay   
     ///</summary>
      public string wcf_cEndPointGooglePlay
      {
      
          get{ return this._wcf_cEndPointGooglePlay; }
          set{ this._wcf_cEndPointGooglePlay = value; }
        
      }
     ///<summary>
     ///wcf_cPrivateKeyAppStore   
     ///</summary>
      public string wcf_cPrivateKeyAppStore
      {
      
          get{ return this._wcf_cPrivateKeyAppStore; }
          set{ this._wcf_cPrivateKeyAppStore = value; }
        
      }
     ///<summary>
     ///wcf_cPrivateKeyGoogleStore   
     ///</summary>
      public string wcf_cPrivateKeyGoogleStore
      {
      
          get{ return this._wcf_cPrivateKeyGoogleStore; }
          set{ this._wcf_cPrivateKeyGoogleStore = value; }
        
      }
     ///<summary>
     ///idsPublicidad   
     ///</summary>
      public string idsPublicidad
      {
      
          get{ return this._idsPublicidad; }
          set{ this._idsPublicidad = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalWeSafeConfig(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalWeSafeConfig(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalWeSafeConfig(SqlHelper SqlConfig, int UserId, SimpleWeSafeConfig Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._wcf_cDealer = Simple.wcf_cDealer;

      this._wcf_cEndPointAppStore = Simple.wcf_cEndPointAppStore;

      this._wcf_cMailGoogleStore = Simple.wcf_cMailGoogleStore;

      this._wcf_cAppNameAppStore = Simple.wcf_cAppNameAppStore;

      this._wcf_cIssuerID = Simple.wcf_cIssuerID;

      this._wcf_cKeyIdAppStore = Simple.wcf_cKeyIdAppStore;

      this._wcf_cAppNameGoogleStore = Simple.wcf_cAppNameGoogleStore;

      this._wcf_cEndPointGooglePlay = Simple.wcf_cEndPointGooglePlay;

      this._wcf_cPrivateKeyAppStore = Simple.wcf_cPrivateKeyAppStore;

      this._wcf_cPrivateKeyGoogleStore = Simple.wcf_cPrivateKeyGoogleStore;

      this._idsPublicidad = Simple.idsPublicidad;

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
    using(var cmd = new SqlCommand("WeSafeConfigIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@wcf_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wcf_cEndPointAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cMailGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cAppNameAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cIssuerID", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cKeyIdAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cAppNameGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cEndPointGooglePlay", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cPrivateKeyAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cPrivateKeyGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@idsPublicidad", SqlDbType.VarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@wcf_cDealer"].Value = (this._wcf_cDealer == null) ? (object) DBNull.Value : (object) this._wcf_cDealer;

		cmd.Parameters["@wcf_cEndPointAppStore"].Value = (this._wcf_cEndPointAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cEndPointAppStore;

		cmd.Parameters["@wcf_cMailGoogleStore"].Value = (this._wcf_cMailGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cMailGoogleStore;

		cmd.Parameters["@wcf_cAppNameAppStore"].Value = (this._wcf_cAppNameAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cAppNameAppStore;

		cmd.Parameters["@wcf_cIssuerID"].Value = (this._wcf_cIssuerID == null) ? (object) DBNull.Value : (object) this._wcf_cIssuerID;

		cmd.Parameters["@wcf_cKeyIdAppStore"].Value = (this._wcf_cKeyIdAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cKeyIdAppStore;

		cmd.Parameters["@wcf_cAppNameGoogleStore"].Value = (this._wcf_cAppNameGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cAppNameGoogleStore;

		cmd.Parameters["@wcf_cEndPointGooglePlay"].Value = (this._wcf_cEndPointGooglePlay == null) ? (object) DBNull.Value : (object) this._wcf_cEndPointGooglePlay;

		cmd.Parameters["@wcf_cPrivateKeyAppStore"].Value = (this._wcf_cPrivateKeyAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cPrivateKeyAppStore;

		cmd.Parameters["@wcf_cPrivateKeyGoogleStore"].Value = (this._wcf_cPrivateKeyGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cPrivateKeyGoogleStore;

		cmd.Parameters["@idsPublicidad"].Value = (this._idsPublicidad == null) ? (object) DBNull.Value : (object) this._idsPublicidad;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("WeSafeConfigUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@wcf_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wcf_cEndPointAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cMailGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cAppNameAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cIssuerID", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cKeyIdAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cAppNameGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cEndPointGooglePlay", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cPrivateKeyAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cPrivateKeyGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@idsPublicidad", SqlDbType.VarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@wcf_cDealer"].Value = (this._wcf_cDealer == null) ? (object) DBNull.Value : (object) this._wcf_cDealer;

		cmd.Parameters["@wcf_cEndPointAppStore"].Value = (this._wcf_cEndPointAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cEndPointAppStore;

		cmd.Parameters["@wcf_cMailGoogleStore"].Value = (this._wcf_cMailGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cMailGoogleStore;

		cmd.Parameters["@wcf_cAppNameAppStore"].Value = (this._wcf_cAppNameAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cAppNameAppStore;

		cmd.Parameters["@wcf_cIssuerID"].Value = (this._wcf_cIssuerID == null) ? (object) DBNull.Value : (object) this._wcf_cIssuerID;

		cmd.Parameters["@wcf_cKeyIdAppStore"].Value = (this._wcf_cKeyIdAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cKeyIdAppStore;

		cmd.Parameters["@wcf_cAppNameGoogleStore"].Value = (this._wcf_cAppNameGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cAppNameGoogleStore;

		cmd.Parameters["@wcf_cEndPointGooglePlay"].Value = (this._wcf_cEndPointGooglePlay == null) ? (object) DBNull.Value : (object) this._wcf_cEndPointGooglePlay;

		cmd.Parameters["@wcf_cPrivateKeyAppStore"].Value = (this._wcf_cPrivateKeyAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cPrivateKeyAppStore;

		cmd.Parameters["@wcf_cPrivateKeyGoogleStore"].Value = (this._wcf_cPrivateKeyGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cPrivateKeyGoogleStore;

		cmd.Parameters["@idsPublicidad"].Value = (this._idsPublicidad == null) ? (object) DBNull.Value : (object) this._idsPublicidad;

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
    throw new RuntimeException("The WeSafeConfig is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("WeSafeConfigDel", conn))
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
    using(var CmdSel = new SqlCommand("WeSafeConfigSel", conn))
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
    SimpleWeSafeConfig Simple = new SimpleWeSafeConfig();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.wcf_cDealer = this._wcf_cDealer;

      Simple.wcf_cEndPointAppStore = this._wcf_cEndPointAppStore;

      Simple.wcf_cMailGoogleStore = this._wcf_cMailGoogleStore;

      Simple.wcf_cAppNameAppStore = this._wcf_cAppNameAppStore;

      Simple.wcf_cIssuerID = this._wcf_cIssuerID;

      Simple.wcf_cKeyIdAppStore = this._wcf_cKeyIdAppStore;

      Simple.wcf_cAppNameGoogleStore = this._wcf_cAppNameGoogleStore;

      Simple.wcf_cEndPointGooglePlay = this._wcf_cEndPointGooglePlay;

      Simple.wcf_cPrivateKeyAppStore = this._wcf_cPrivateKeyAppStore;

      Simple.wcf_cPrivateKeyGoogleStore = this._wcf_cPrivateKeyGoogleStore;

      Simple.idsPublicidad = this._idsPublicidad;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleWeSafeConfig)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._wcf_cDealer = Simple.wcf_cDealer;

      this._wcf_cEndPointAppStore = Simple.wcf_cEndPointAppStore;

      this._wcf_cMailGoogleStore = Simple.wcf_cMailGoogleStore;

      this._wcf_cAppNameAppStore = Simple.wcf_cAppNameAppStore;

      this._wcf_cIssuerID = Simple.wcf_cIssuerID;

      this._wcf_cKeyIdAppStore = Simple.wcf_cKeyIdAppStore;

      this._wcf_cAppNameGoogleStore = Simple.wcf_cAppNameGoogleStore;

      this._wcf_cEndPointGooglePlay = Simple.wcf_cEndPointGooglePlay;

      this._wcf_cPrivateKeyAppStore = Simple.wcf_cPrivateKeyAppStore;

      this._wcf_cPrivateKeyGoogleStore = Simple.wcf_cPrivateKeyGoogleStore;

      this._idsPublicidad = Simple.idsPublicidad;

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
    CallerWeSafeConfig Caller = new CallerWeSafeConfig();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.wcf_cDealer = this._wcf_cDealer;

      Caller.wcf_cEndPointAppStore = this._wcf_cEndPointAppStore;

      Caller.wcf_cMailGoogleStore = this._wcf_cMailGoogleStore;

      Caller.wcf_cAppNameAppStore = this._wcf_cAppNameAppStore;

      Caller.wcf_cIssuerID = this._wcf_cIssuerID;

      Caller.wcf_cKeyIdAppStore = this._wcf_cKeyIdAppStore;

      Caller.wcf_cAppNameGoogleStore = this._wcf_cAppNameGoogleStore;

      Caller.wcf_cEndPointGooglePlay = this._wcf_cEndPointGooglePlay;

      Caller.wcf_cPrivateKeyAppStore = this._wcf_cPrivateKeyAppStore;

      Caller.wcf_cPrivateKeyGoogleStore = this._wcf_cPrivateKeyGoogleStore;

      Caller.idsPublicidad = this._idsPublicidad;

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
    
      dt.Columns.Add(new DataColumn("wcf_cDealer", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cEndPointAppStore", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cMailGoogleStore", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cAppNameAppStore", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cIssuerID", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cKeyIdAppStore", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cAppNameGoogleStore", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cEndPointGooglePlay", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cPrivateKeyAppStore", typeof (string)));
    
      dt.Columns.Add(new DataColumn("wcf_cPrivateKeyGoogleStore", typeof (string)));
    
      dt.Columns.Add(new DataColumn("idsPublicidad", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["wcf_cDealer"] = this._wcf_cDealer;

      dr["wcf_cEndPointAppStore"] = this._wcf_cEndPointAppStore;

      dr["wcf_cMailGoogleStore"] = this._wcf_cMailGoogleStore;

      dr["wcf_cAppNameAppStore"] = this._wcf_cAppNameAppStore;

      dr["wcf_cIssuerID"] = this._wcf_cIssuerID;

      dr["wcf_cKeyIdAppStore"] = this._wcf_cKeyIdAppStore;

      dr["wcf_cAppNameGoogleStore"] = this._wcf_cAppNameGoogleStore;

      dr["wcf_cEndPointGooglePlay"] = this._wcf_cEndPointGooglePlay;

      dr["wcf_cPrivateKeyAppStore"] = this._wcf_cPrivateKeyAppStore;

      dr["wcf_cPrivateKeyGoogleStore"] = this._wcf_cPrivateKeyGoogleStore;

      dr["idsPublicidad"] = this._idsPublicidad;

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
    using(var CmdChilds = new SqlCommand("WeSafeConfigByChildObject", conn))
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
    SimpleWeSafeConfig Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("WeSafeConfigByChildObject", conn))
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
    Simple = new SimpleWeSafeConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wcf_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wcf_cEndPointAppStore = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wcf_cMailGoogleStore = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wcf_cAppNameAppStore = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wcf_cIssuerID = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.wcf_cKeyIdAppStore = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.wcf_cAppNameGoogleStore = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.wcf_cEndPointGooglePlay = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.wcf_cPrivateKeyAppStore = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.wcf_cPrivateKeyGoogleStore = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.idsPublicidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    SimpleWeSafeConfig Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleWeSafeConfig();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.wcf_cDealer = (Row["wcf_cDealer"] == DBNull.Value) ? "" : (string) Row["wcf_cDealer"];

Simple.wcf_cEndPointAppStore = (Row["wcf_cEndPointAppStore"] == DBNull.Value) ? "" : (string) Row["wcf_cEndPointAppStore"];

Simple.wcf_cMailGoogleStore = (Row["wcf_cMailGoogleStore"] == DBNull.Value) ? "" : (string) Row["wcf_cMailGoogleStore"];

Simple.wcf_cAppNameAppStore = (Row["wcf_cAppNameAppStore"] == DBNull.Value) ? "" : (string) Row["wcf_cAppNameAppStore"];

Simple.wcf_cIssuerID = (Row["wcf_cIssuerID"] == DBNull.Value) ? "" : (string) Row["wcf_cIssuerID"];

Simple.wcf_cKeyIdAppStore = (Row["wcf_cKeyIdAppStore"] == DBNull.Value) ? "" : (string) Row["wcf_cKeyIdAppStore"];

Simple.wcf_cAppNameGoogleStore = (Row["wcf_cAppNameGoogleStore"] == DBNull.Value) ? "" : (string) Row["wcf_cAppNameGoogleStore"];

Simple.wcf_cEndPointGooglePlay = (Row["wcf_cEndPointGooglePlay"] == DBNull.Value) ? "" : (string) Row["wcf_cEndPointGooglePlay"];

Simple.wcf_cPrivateKeyAppStore = (Row["wcf_cPrivateKeyAppStore"] == DBNull.Value) ? "" : (string) Row["wcf_cPrivateKeyAppStore"];

Simple.wcf_cPrivateKeyGoogleStore = (Row["wcf_cPrivateKeyGoogleStore"] == DBNull.Value) ? "" : (string) Row["wcf_cPrivateKeyGoogleStore"];

Simple.idsPublicidad = (Row["idsPublicidad"] == DBNull.Value) ? "" : (string) Row["idsPublicidad"];


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
    using(var CmdParents = new SqlCommand("WeSafeConfigByParentObject", conn))
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
    SimpleWeSafeConfig Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("WeSafeConfigByParentObject", conn))
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
    Simple = new SimpleWeSafeConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wcf_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wcf_cEndPointAppStore = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wcf_cMailGoogleStore = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wcf_cAppNameAppStore = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wcf_cIssuerID = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.wcf_cKeyIdAppStore = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.wcf_cAppNameGoogleStore = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.wcf_cEndPointGooglePlay = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.wcf_cPrivateKeyAppStore = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.wcf_cPrivateKeyGoogleStore = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.idsPublicidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    using (var CmdDataByName = new SqlCommand("WeSafeConfigByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("WeSafeConfigByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("WeSafeConfigByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("WeSafeConfigByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("WeSafeConfigByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleWeSafeConfig Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("WeSafeConfigBySimpleWeSafeConfig", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@wcf_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@wcf_cEndPointAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cMailGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cAppNameAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cIssuerID", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cKeyIdAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cAppNameGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cEndPointGooglePlay", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cPrivateKeyAppStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@wcf_cPrivateKeyGoogleStore", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@idsPublicidad", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@wcf_cDealer"].Value = (this._wcf_cDealer == null) ? (object) DBNull.Value : (object) this._wcf_cDealer;

		cmd.Parameters["@wcf_cEndPointAppStore"].Value = (this._wcf_cEndPointAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cEndPointAppStore;

		cmd.Parameters["@wcf_cMailGoogleStore"].Value = (this._wcf_cMailGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cMailGoogleStore;

		cmd.Parameters["@wcf_cAppNameAppStore"].Value = (this._wcf_cAppNameAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cAppNameAppStore;

		cmd.Parameters["@wcf_cIssuerID"].Value = (this._wcf_cIssuerID == null) ? (object) DBNull.Value : (object) this._wcf_cIssuerID;

		cmd.Parameters["@wcf_cKeyIdAppStore"].Value = (this._wcf_cKeyIdAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cKeyIdAppStore;

		cmd.Parameters["@wcf_cAppNameGoogleStore"].Value = (this._wcf_cAppNameGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cAppNameGoogleStore;

		cmd.Parameters["@wcf_cEndPointGooglePlay"].Value = (this._wcf_cEndPointGooglePlay == null) ? (object) DBNull.Value : (object) this._wcf_cEndPointGooglePlay;

		cmd.Parameters["@wcf_cPrivateKeyAppStore"].Value = (this._wcf_cPrivateKeyAppStore == null) ? (object) DBNull.Value : (object) this._wcf_cPrivateKeyAppStore;

		cmd.Parameters["@wcf_cPrivateKeyGoogleStore"].Value = (this._wcf_cPrivateKeyGoogleStore == null) ? (object) DBNull.Value : (object) this._wcf_cPrivateKeyGoogleStore;

		cmd.Parameters["@idsPublicidad"].Value = (this._idsPublicidad == null) ? (object) DBNull.Value : (object) this._idsPublicidad;


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
		 
		public IEnumerable<SimpleWeSafeConfig> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("WeSafeConfigByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleWeSafeConfig Simple = new SimpleWeSafeConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wcf_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wcf_cEndPointAppStore = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wcf_cMailGoogleStore = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wcf_cAppNameAppStore = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wcf_cIssuerID = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.wcf_cKeyIdAppStore = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.wcf_cAppNameGoogleStore = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.wcf_cEndPointGooglePlay = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.wcf_cPrivateKeyAppStore = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.wcf_cPrivateKeyGoogleStore = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.idsPublicidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleWeSafeConfig> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("WeSafeConfigByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleWeSafeConfig Simple = new SimpleWeSafeConfig();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.wcf_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.wcf_cEndPointAppStore = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.wcf_cMailGoogleStore = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.wcf_cAppNameAppStore = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.wcf_cIssuerID = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.wcf_cKeyIdAppStore = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.wcf_cAppNameGoogleStore = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.wcf_cEndPointGooglePlay = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.wcf_cPrivateKeyAppStore = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.wcf_cPrivateKeyGoogleStore = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.idsPublicidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(7037, "WeSafeConfig");
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
    if (Reader.FieldCount > 2)this._wcf_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._wcf_cEndPointAppStore = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._wcf_cMailGoogleStore = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._wcf_cAppNameAppStore = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._wcf_cIssuerID = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._wcf_cKeyIdAppStore = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._wcf_cAppNameGoogleStore = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._wcf_cEndPointGooglePlay = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._wcf_cPrivateKeyAppStore = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._wcf_cPrivateKeyGoogleStore = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._idsPublicidad = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    }
    Reader.Close();
    }
   }
  
    }
  