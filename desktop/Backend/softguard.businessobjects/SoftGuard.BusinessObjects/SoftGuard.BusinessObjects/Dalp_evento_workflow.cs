
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
     ///p_evento_workflow data access layer   
     ///</summary>
    public class Dalp_evento_workflow : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _pew_proceso_estados;
    
      private string _pew_name;
    
      private string _pew_evento_estados;
    
      private string _pew_dealers;
    
      private string _pew_codalarmas;
    
      private int _pew_codalarmagrupo;
    
      private string _pew_sql;
    
      private string _pew_config;
    
      private string _pew_form_config;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///pew_proceso_estados   
     ///</summary>
      public string pew_proceso_estados
      {
      
          get{ return this._pew_proceso_estados; }
          set{ this._pew_proceso_estados = value; }
        
      }
     ///<summary>
     ///pew_name   
     ///</summary>
      public string pew_name
      {
      
          get{ return this._pew_name; }
          set{ this._pew_name = value; }
        
      }
     ///<summary>
     ///pew_evento_estados   
     ///</summary>
      public string pew_evento_estados
      {
      
          get{ return this._pew_evento_estados; }
          set{ this._pew_evento_estados = value; }
        
      }
     ///<summary>
     ///pew_dealers   
     ///</summary>
      public string pew_dealers
      {
      
          get{ return this._pew_dealers; }
          set{ this._pew_dealers = value; }
        
      }
     ///<summary>
     ///pew_codalarmas   
     ///</summary>
      public string pew_codalarmas
      {
      
          get{ return this._pew_codalarmas; }
          set{ this._pew_codalarmas = value; }
        
      }
     ///<summary>
     ///pew_codalarmagrupo   
     ///</summary>
      public int pew_codalarmagrupo
      {
      
          get{ return this._pew_codalarmagrupo; }
          set{ this._pew_codalarmagrupo = value; }
        
      }
     ///<summary>
     ///pew_sql   
     ///</summary>
      public string pew_sql
      {
      
          get{ return this._pew_sql; }
          set{ this._pew_sql = value; }
        
      }
     ///<summary>
     ///pew_config   
     ///</summary>
      public string pew_config
      {
      
          get{ return this._pew_config; }
          set{ this._pew_config = value; }
        
      }
     ///<summary>
     ///pew_form_config   
     ///</summary>
      public string pew_form_config
      {
      
          get{ return this._pew_form_config; }
          set{ this._pew_form_config = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_evento_workflow(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_evento_workflow(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_evento_workflow(SqlHelper SqlConfig, int UserId, Simplep_evento_workflow Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._pew_proceso_estados = Simple.pew_proceso_estados;

      this._pew_name = Simple.pew_name;

      this._pew_evento_estados = Simple.pew_evento_estados;

      this._pew_dealers = Simple.pew_dealers;

      this._pew_codalarmas = Simple.pew_codalarmas;

      this._pew_codalarmagrupo = Simple.pew_codalarmagrupo;

      this._pew_sql = Simple.pew_sql;

      this._pew_config = Simple.pew_config;

      this._pew_form_config = Simple.pew_form_config;

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
    using(var cmd = new SqlCommand("p_evento_workflowIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@pew_proceso_estados", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_name", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_evento_estados", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_dealers", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_codalarmas", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_codalarmagrupo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pew_sql", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_config", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_form_config", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@pew_proceso_estados"].Value = (this._pew_proceso_estados == null) ? (object) DBNull.Value : (object) this._pew_proceso_estados;

		cmd.Parameters["@pew_name"].Value = (this._pew_name == null) ? (object) DBNull.Value : (object) this._pew_name;

		cmd.Parameters["@pew_evento_estados"].Value = (this._pew_evento_estados == null) ? (object) DBNull.Value : (object) this._pew_evento_estados;

		cmd.Parameters["@pew_dealers"].Value = (this._pew_dealers == null) ? (object) DBNull.Value : (object) this._pew_dealers;

		cmd.Parameters["@pew_codalarmas"].Value = (this._pew_codalarmas == null) ? (object) DBNull.Value : (object) this._pew_codalarmas;

		cmd.Parameters["@pew_codalarmagrupo"].Value = this._pew_codalarmagrupo;

		cmd.Parameters["@pew_sql"].Value = (this._pew_sql == null) ? (object) DBNull.Value : (object) this._pew_sql;

		cmd.Parameters["@pew_config"].Value = (this._pew_config == null) ? (object) DBNull.Value : (object) this._pew_config;

		cmd.Parameters["@pew_form_config"].Value = (this._pew_form_config == null) ? (object) DBNull.Value : (object) this._pew_form_config;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_evento_workflowUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@pew_proceso_estados", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_name", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_evento_estados", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_dealers", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_codalarmas", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_codalarmagrupo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pew_sql", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_config", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_form_config", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@pew_proceso_estados"].Value = (this._pew_proceso_estados == null) ? (object) DBNull.Value : (object) this._pew_proceso_estados;

		cmd.Parameters["@pew_name"].Value = (this._pew_name == null) ? (object) DBNull.Value : (object) this._pew_name;

		cmd.Parameters["@pew_evento_estados"].Value = (this._pew_evento_estados == null) ? (object) DBNull.Value : (object) this._pew_evento_estados;

		cmd.Parameters["@pew_dealers"].Value = (this._pew_dealers == null) ? (object) DBNull.Value : (object) this._pew_dealers;

		cmd.Parameters["@pew_codalarmas"].Value = (this._pew_codalarmas == null) ? (object) DBNull.Value : (object) this._pew_codalarmas;

		cmd.Parameters["@pew_codalarmagrupo"].Value = this._pew_codalarmagrupo;

		cmd.Parameters["@pew_sql"].Value = (this._pew_sql == null) ? (object) DBNull.Value : (object) this._pew_sql;

		cmd.Parameters["@pew_config"].Value = (this._pew_config == null) ? (object) DBNull.Value : (object) this._pew_config;

		cmd.Parameters["@pew_form_config"].Value = (this._pew_form_config == null) ? (object) DBNull.Value : (object) this._pew_form_config;

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
    throw new RuntimeException("The p_evento_workflow is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_evento_workflowDel", conn))
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
    using(var CmdSel = new SqlCommand("p_evento_workflowSel", conn))
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
    Simplep_evento_workflow Simple = new Simplep_evento_workflow();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.pew_proceso_estados = this._pew_proceso_estados;

      Simple.pew_name = this._pew_name;

      Simple.pew_evento_estados = this._pew_evento_estados;

      Simple.pew_dealers = this._pew_dealers;

      Simple.pew_codalarmas = this._pew_codalarmas;

      Simple.pew_codalarmagrupo = this._pew_codalarmagrupo;

      Simple.pew_sql = this._pew_sql;

      Simple.pew_config = this._pew_config;

      Simple.pew_form_config = this._pew_form_config;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_evento_workflow)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._pew_proceso_estados = Simple.pew_proceso_estados;

      this._pew_name = Simple.pew_name;

      this._pew_evento_estados = Simple.pew_evento_estados;

      this._pew_dealers = Simple.pew_dealers;

      this._pew_codalarmas = Simple.pew_codalarmas;

      this._pew_codalarmagrupo = Simple.pew_codalarmagrupo;

      this._pew_sql = Simple.pew_sql;

      this._pew_config = Simple.pew_config;

      this._pew_form_config = Simple.pew_form_config;

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
    Callerp_evento_workflow Caller = new Callerp_evento_workflow();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.pew_proceso_estados = this._pew_proceso_estados;

      Caller.pew_name = this._pew_name;

      Caller.pew_evento_estados = this._pew_evento_estados;

      Caller.pew_dealers = this._pew_dealers;

      Caller.pew_codalarmas = this._pew_codalarmas;

      Caller.pew_codalarmagrupo = this._pew_codalarmagrupo;

      Caller.pew_sql = this._pew_sql;

      Caller.pew_config = this._pew_config;

      Caller.pew_form_config = this._pew_form_config;

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
    
      dt.Columns.Add(new DataColumn("pew_proceso_estados", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pew_name", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pew_evento_estados", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pew_dealers", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pew_codalarmas", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pew_codalarmagrupo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pew_sql", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pew_config", typeof (string)));
    
      dt.Columns.Add(new DataColumn("pew_form_config", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["pew_proceso_estados"] = this._pew_proceso_estados;

      dr["pew_name"] = this._pew_name;

      dr["pew_evento_estados"] = this._pew_evento_estados;

      dr["pew_dealers"] = this._pew_dealers;

      dr["pew_codalarmas"] = this._pew_codalarmas;

      dr["pew_codalarmagrupo"] = this._pew_codalarmagrupo;

      dr["pew_sql"] = this._pew_sql;

      dr["pew_config"] = this._pew_config;

      dr["pew_form_config"] = this._pew_form_config;

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
    using(var CmdChilds = new SqlCommand("p_evento_workflowByChildObject", conn))
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
    Simplep_evento_workflow Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_evento_workflowByChildObject", conn))
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
    Simple = new Simplep_evento_workflow();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pew_proceso_estados = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.pew_name = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pew_evento_estados = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pew_dealers = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pew_codalarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pew_codalarmagrupo = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.pew_sql = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pew_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pew_form_config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    Simplep_evento_workflow Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_evento_workflow();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.pew_proceso_estados = (Row["pew_proceso_estados"] == DBNull.Value) ? "" : (string) Row["pew_proceso_estados"];

Simple.pew_name = (Row["pew_name"] == DBNull.Value) ? "" : (string) Row["pew_name"];

Simple.pew_evento_estados = (Row["pew_evento_estados"] == DBNull.Value) ? "" : (string) Row["pew_evento_estados"];

Simple.pew_dealers = (Row["pew_dealers"] == DBNull.Value) ? "" : (string) Row["pew_dealers"];

Simple.pew_codalarmas = (Row["pew_codalarmas"] == DBNull.Value) ? "" : (string) Row["pew_codalarmas"];

Simple.pew_codalarmagrupo = (Row["pew_codalarmagrupo"] == DBNull.Value) ? 0 : (int) Row["pew_codalarmagrupo"];

Simple.pew_sql = (Row["pew_sql"] == DBNull.Value) ? "" : (string) Row["pew_sql"];

Simple.pew_config = (Row["pew_config"] == DBNull.Value) ? "" : (string) Row["pew_config"];

Simple.pew_form_config = (Row["pew_form_config"] == DBNull.Value) ? "" : (string) Row["pew_form_config"];


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
    using(var CmdParents = new SqlCommand("p_evento_workflowByParentObject", conn))
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
    Simplep_evento_workflow Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_evento_workflowByParentObject", conn))
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
    Simple = new Simplep_evento_workflow();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pew_proceso_estados = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.pew_name = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pew_evento_estados = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pew_dealers = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pew_codalarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pew_codalarmagrupo = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.pew_sql = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pew_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pew_form_config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    using (var CmdDataByName = new SqlCommand("p_evento_workflowByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_evento_workflowByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_evento_workflowByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_evento_workflowByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_evento_workflowByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_evento_workflow Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_evento_workflowBySimplep_evento_workflow", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@pew_proceso_estados", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_name", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_evento_estados", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_dealers", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_codalarmas", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_codalarmagrupo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pew_sql", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_config", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@pew_form_config", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@pew_proceso_estados"].Value = (this._pew_proceso_estados == null) ? (object) DBNull.Value : (object) this._pew_proceso_estados;

		cmd.Parameters["@pew_name"].Value = (this._pew_name == null) ? (object) DBNull.Value : (object) this._pew_name;

		cmd.Parameters["@pew_evento_estados"].Value = (this._pew_evento_estados == null) ? (object) DBNull.Value : (object) this._pew_evento_estados;

		cmd.Parameters["@pew_dealers"].Value = (this._pew_dealers == null) ? (object) DBNull.Value : (object) this._pew_dealers;

		cmd.Parameters["@pew_codalarmas"].Value = (this._pew_codalarmas == null) ? (object) DBNull.Value : (object) this._pew_codalarmas;

		cmd.Parameters["@pew_codalarmagrupo"].Value = this._pew_codalarmagrupo;

		cmd.Parameters["@pew_sql"].Value = (this._pew_sql == null) ? (object) DBNull.Value : (object) this._pew_sql;

		cmd.Parameters["@pew_config"].Value = (this._pew_config == null) ? (object) DBNull.Value : (object) this._pew_config;

		cmd.Parameters["@pew_form_config"].Value = (this._pew_form_config == null) ? (object) DBNull.Value : (object) this._pew_form_config;


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
		 
		public IEnumerable<Simplep_evento_workflow> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_evento_workflowByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_evento_workflow Simple = new Simplep_evento_workflow();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pew_proceso_estados = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.pew_name = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pew_evento_estados = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pew_dealers = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pew_codalarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pew_codalarmagrupo = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.pew_sql = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pew_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pew_form_config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_evento_workflow> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_evento_workflowByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_evento_workflow Simple = new Simplep_evento_workflow();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.pew_proceso_estados = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.pew_name = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.pew_evento_estados = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.pew_dealers = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.pew_codalarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.pew_codalarmagrupo = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.pew_sql = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.pew_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.pew_form_config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3174, "p_evento_workflow");
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
    if (Reader.FieldCount > 2)this._pew_proceso_estados = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._pew_name = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._pew_evento_estados = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._pew_dealers = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._pew_codalarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._pew_codalarmagrupo = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._pew_sql = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._pew_config = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._pew_form_config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    }
    Reader.Close();
    }
   }
  
    }
  