
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
     ///p_EnergyDevices data access layer   
     ///</summary>
    public class Dalp_EnergyDevices : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _ped_idCta;
    
      private string _ped_cUri;
    
      private string _ped_cDeviceID;
    
      private string _ped_cLabel;
    
      private string _ped_cName;
    
      private DateTime? _ped_tCreatedAt;
    
      private int _ped_iVarCount;
    
      private string _ped_cLastActivity;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///ped_idCta   
     ///</summary>
      public int ped_idCta
      {
      
          get{ return this._ped_idCta; }
          set{ this._ped_idCta = value; }
        
      }
     ///<summary>
     ///ped_cUri   
     ///</summary>
      public string ped_cUri
      {
      
          get{ return this._ped_cUri; }
          set{ this._ped_cUri = value; }
        
      }
     ///<summary>
     ///ped_cDeviceID   
     ///</summary>
      public string ped_cDeviceID
      {
      
          get{ return this._ped_cDeviceID; }
          set{ this._ped_cDeviceID = value; }
        
      }
     ///<summary>
     ///ped_cLabel   
     ///</summary>
      public string ped_cLabel
      {
      
          get{ return this._ped_cLabel; }
          set{ this._ped_cLabel = value; }
        
      }
     ///<summary>
     ///ped_cName   
     ///</summary>
      public string ped_cName
      {
      
          get{ return this._ped_cName; }
          set{ this._ped_cName = value; }
        
      }
     ///<summary>
     ///ped_tCreatedAt   
     ///</summary>
      public DateTime? ped_tCreatedAt
      {
      
          get{ return this._ped_tCreatedAt; }
          set{ this._ped_tCreatedAt = value; }
        
      }
     ///<summary>
     ///ped_iVarCount   
     ///</summary>
      public int ped_iVarCount
      {
      
          get{ return this._ped_iVarCount; }
          set{ this._ped_iVarCount = value; }
        
      }
     ///<summary>
     ///ped_cLastActivity   
     ///</summary>
      public string ped_cLastActivity
      {
      
          get{ return this._ped_cLastActivity; }
          set{ this._ped_cLastActivity = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_EnergyDevices(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_EnergyDevices(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_EnergyDevices(SqlHelper SqlConfig, int UserId, Simplep_EnergyDevices Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._ped_idCta = Simple.ped_idCta;

      this._ped_cUri = Simple.ped_cUri;

      this._ped_cDeviceID = Simple.ped_cDeviceID;

      this._ped_cLabel = Simple.ped_cLabel;

      this._ped_cName = Simple.ped_cName;

      this._ped_tCreatedAt = Simple.ped_tCreatedAt;

      this._ped_iVarCount = Simple.ped_iVarCount;

      this._ped_cLastActivity = Simple.ped_cLastActivity;

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
    using(var cmd = new SqlCommand("p_EnergyDevicesIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@ped_idCta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ped_cUri", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cDeviceID", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cLabel", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cName", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_tCreatedAt", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ped_iVarCount", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ped_cLastActivity", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@ped_idCta"].Value = this._ped_idCta;

		cmd.Parameters["@ped_cUri"].Value = (this._ped_cUri == null) ? (object) DBNull.Value : (object) this._ped_cUri;

		cmd.Parameters["@ped_cDeviceID"].Value = (this._ped_cDeviceID == null) ? (object) DBNull.Value : (object) this._ped_cDeviceID;

		cmd.Parameters["@ped_cLabel"].Value = (this._ped_cLabel == null) ? (object) DBNull.Value : (object) this._ped_cLabel;

		cmd.Parameters["@ped_cName"].Value = (this._ped_cName == null) ? (object) DBNull.Value : (object) this._ped_cName;

		cmd.Parameters["@ped_tCreatedAt"].Value = (this._ped_tCreatedAt == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ped_tCreatedAt;

		cmd.Parameters["@ped_iVarCount"].Value = this._ped_iVarCount;

		cmd.Parameters["@ped_cLastActivity"].Value = (this._ped_cLastActivity == null) ? (object) DBNull.Value : (object) this._ped_cLastActivity;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_EnergyDevicesUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@ped_idCta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ped_cUri", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cDeviceID", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cLabel", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cName", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_tCreatedAt", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ped_iVarCount", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ped_cLastActivity", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@ped_idCta"].Value = this._ped_idCta;

		cmd.Parameters["@ped_cUri"].Value = (this._ped_cUri == null) ? (object) DBNull.Value : (object) this._ped_cUri;

		cmd.Parameters["@ped_cDeviceID"].Value = (this._ped_cDeviceID == null) ? (object) DBNull.Value : (object) this._ped_cDeviceID;

		cmd.Parameters["@ped_cLabel"].Value = (this._ped_cLabel == null) ? (object) DBNull.Value : (object) this._ped_cLabel;

		cmd.Parameters["@ped_cName"].Value = (this._ped_cName == null) ? (object) DBNull.Value : (object) this._ped_cName;

		cmd.Parameters["@ped_tCreatedAt"].Value = (this._ped_tCreatedAt == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ped_tCreatedAt;

		cmd.Parameters["@ped_iVarCount"].Value = this._ped_iVarCount;

		cmd.Parameters["@ped_cLastActivity"].Value = (this._ped_cLastActivity == null) ? (object) DBNull.Value : (object) this._ped_cLastActivity;

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
    throw new RuntimeException("The p_EnergyDevices is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_EnergyDevicesDel", conn))
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
    using(var CmdSel = new SqlCommand("p_EnergyDevicesSel", conn))
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
    Simplep_EnergyDevices Simple = new Simplep_EnergyDevices();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.ped_idCta = this._ped_idCta;

      Simple.ped_cUri = this._ped_cUri;

      Simple.ped_cDeviceID = this._ped_cDeviceID;

      Simple.ped_cLabel = this._ped_cLabel;

      Simple.ped_cName = this._ped_cName;

      Simple.ped_tCreatedAt = this._ped_tCreatedAt;

      Simple.ped_iVarCount = this._ped_iVarCount;

      Simple.ped_cLastActivity = this._ped_cLastActivity;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_EnergyDevices)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._ped_idCta = Simple.ped_idCta;

      this._ped_cUri = Simple.ped_cUri;

      this._ped_cDeviceID = Simple.ped_cDeviceID;

      this._ped_cLabel = Simple.ped_cLabel;

      this._ped_cName = Simple.ped_cName;

      this._ped_tCreatedAt = Simple.ped_tCreatedAt;

      this._ped_iVarCount = Simple.ped_iVarCount;

      this._ped_cLastActivity = Simple.ped_cLastActivity;

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
    Callerp_EnergyDevices Caller = new Callerp_EnergyDevices();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.ped_idCta = this._ped_idCta;

      Caller.ped_cUri = this._ped_cUri;

      Caller.ped_cDeviceID = this._ped_cDeviceID;

      Caller.ped_cLabel = this._ped_cLabel;

      Caller.ped_cName = this._ped_cName;

      Caller.ped_tCreatedAt = this._ped_tCreatedAt;

      Caller.ped_iVarCount = this._ped_iVarCount;

      Caller.ped_cLastActivity = this._ped_cLastActivity;

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
    
      dt.Columns.Add(new DataColumn("ped_idCta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("ped_cUri", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ped_cDeviceID", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ped_cLabel", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ped_cName", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ped_tCreatedAt", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("ped_iVarCount", typeof (int)));
    
      dt.Columns.Add(new DataColumn("ped_cLastActivity", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["ped_idCta"] = this._ped_idCta;

      dr["ped_cUri"] = this._ped_cUri;

      dr["ped_cDeviceID"] = this._ped_cDeviceID;

      dr["ped_cLabel"] = this._ped_cLabel;

      dr["ped_cName"] = this._ped_cName;

      dr["ped_tCreatedAt"] = (object)this._ped_tCreatedAt  ?? DBNull.Value;

      dr["ped_iVarCount"] = this._ped_iVarCount;

      dr["ped_cLastActivity"] = this._ped_cLastActivity;

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
    using(var CmdChilds = new SqlCommand("p_EnergyDevicesByChildObject", conn))
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
    Simplep_EnergyDevices Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_EnergyDevicesByChildObject", conn))
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
    Simple = new Simplep_EnergyDevices();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ped_idCta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.ped_cUri = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ped_cDeviceID = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ped_cLabel = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ped_cName = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.ped_tCreatedAt = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ped_iVarCount = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.ped_cLastActivity = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    Simplep_EnergyDevices Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_EnergyDevices();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.ped_idCta = (Row["ped_idCta"] == DBNull.Value) ? 0 : (int) Row["ped_idCta"];

Simple.ped_cUri = (Row["ped_cUri"] == DBNull.Value) ? "" : (string) Row["ped_cUri"];

Simple.ped_cDeviceID = (Row["ped_cDeviceID"] == DBNull.Value) ? "" : (string) Row["ped_cDeviceID"];

Simple.ped_cLabel = (Row["ped_cLabel"] == DBNull.Value) ? "" : (string) Row["ped_cLabel"];

Simple.ped_cName = (Row["ped_cName"] == DBNull.Value) ? "" : (string) Row["ped_cName"];

Simple.ped_tCreatedAt = (Row["ped_tCreatedAt"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["ped_tCreatedAt"];

Simple.ped_iVarCount = (Row["ped_iVarCount"] == DBNull.Value) ? 0 : (int) Row["ped_iVarCount"];

Simple.ped_cLastActivity = (Row["ped_cLastActivity"] == DBNull.Value) ? "" : (string) Row["ped_cLastActivity"];


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
    using(var CmdParents = new SqlCommand("p_EnergyDevicesByParentObject", conn))
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
    Simplep_EnergyDevices Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_EnergyDevicesByParentObject", conn))
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
    Simple = new Simplep_EnergyDevices();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ped_idCta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.ped_cUri = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ped_cDeviceID = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ped_cLabel = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ped_cName = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.ped_tCreatedAt = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ped_iVarCount = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.ped_cLastActivity = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    using (var CmdDataByName = new SqlCommand("p_EnergyDevicesByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_EnergyDevicesByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_EnergyDevicesByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_EnergyDevicesByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_EnergyDevicesByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_EnergyDevices Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_EnergyDevicesBySimplep_EnergyDevices", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@ped_idCta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ped_cUri", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cDeviceID", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cLabel", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_cName", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ped_tCreatedAt", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@ped_iVarCount", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ped_cLastActivity", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@ped_idCta"].Value = this._ped_idCta;

		cmd.Parameters["@ped_cUri"].Value = (this._ped_cUri == null) ? (object) DBNull.Value : (object) this._ped_cUri;

		cmd.Parameters["@ped_cDeviceID"].Value = (this._ped_cDeviceID == null) ? (object) DBNull.Value : (object) this._ped_cDeviceID;

		cmd.Parameters["@ped_cLabel"].Value = (this._ped_cLabel == null) ? (object) DBNull.Value : (object) this._ped_cLabel;

		cmd.Parameters["@ped_cName"].Value = (this._ped_cName == null) ? (object) DBNull.Value : (object) this._ped_cName;

		cmd.Parameters["@ped_tCreatedAt"].Value = (this._ped_tCreatedAt == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._ped_tCreatedAt;

		cmd.Parameters["@ped_iVarCount"].Value = this._ped_iVarCount;

		cmd.Parameters["@ped_cLastActivity"].Value = (this._ped_cLastActivity == null) ? (object) DBNull.Value : (object) this._ped_cLastActivity;


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
		 
		public IEnumerable<Simplep_EnergyDevices> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_EnergyDevicesByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_EnergyDevices Simple = new Simplep_EnergyDevices();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ped_idCta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.ped_cUri = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ped_cDeviceID = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ped_cLabel = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ped_cName = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.ped_tCreatedAt = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ped_iVarCount = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.ped_cLastActivity = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_EnergyDevices> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_EnergyDevicesByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_EnergyDevices Simple = new Simplep_EnergyDevices();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ped_idCta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.ped_cUri = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ped_cDeviceID = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ped_cLabel = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ped_cName = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.ped_tCreatedAt = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)Simple.ped_iVarCount = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.ped_cLastActivity = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(7029, "p_EnergyDevices");
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
    if (Reader.FieldCount > 2)this._ped_idCta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._ped_cUri = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._ped_cDeviceID = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._ped_cLabel = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._ped_cName = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._ped_tCreatedAt = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);
if (Reader.FieldCount > 8)this._ped_iVarCount = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._ped_cLastActivity = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    }
    Reader.Close();
    }
   }
  
    }
  