
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
     ///RedirectorQueue data access layer   
     ///</summary>
    public class DalRedirectorQueue : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _rdq_iReDirector;
    
      private int _rdq_idRec;
    
      private DateTime? _rdq_tFechaHora;
    
      private string _rdq_cLlamado;
    
      private string _rdq_cRespuesta;
    
      private int _rdq_iStatus;
    
      private DateTime? _rdq_tStatusExec;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///rdq_iReDirector   
     ///</summary>
      public int rdq_iReDirector
      {
      
          get{ return this._rdq_iReDirector; }
          set{ this._rdq_iReDirector = value; }
        
      }
     ///<summary>
     ///rdq_idRec   
     ///</summary>
      public int rdq_idRec
      {
      
          get{ return this._rdq_idRec; }
          set{ this._rdq_idRec = value; }
        
      }
     ///<summary>
     ///rdq_tFechaHora   
     ///</summary>
      public DateTime? rdq_tFechaHora
      {
      
          get{ return this._rdq_tFechaHora; }
          set{ this._rdq_tFechaHora = value; }
        
      }
     ///<summary>
     ///rdq_cLlamado   
     ///</summary>
      public string rdq_cLlamado
      {
      
          get{ return this._rdq_cLlamado; }
          set{ this._rdq_cLlamado = value; }
        
      }
     ///<summary>
     ///rdq_cRespuesta   
     ///</summary>
      public string rdq_cRespuesta
      {
      
          get{ return this._rdq_cRespuesta; }
          set{ this._rdq_cRespuesta = value; }
        
      }
     ///<summary>
     ///rdq_iStatus   
     ///</summary>
      public int rdq_iStatus
      {
      
          get{ return this._rdq_iStatus; }
          set{ this._rdq_iStatus = value; }
        
      }
     ///<summary>
     ///rdq_tStatusExec   
     ///</summary>
      public DateTime? rdq_tStatusExec
      {
      
          get{ return this._rdq_tStatusExec; }
          set{ this._rdq_tStatusExec = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalRedirectorQueue(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalRedirectorQueue(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalRedirectorQueue(SqlHelper SqlConfig, int UserId, SimpleRedirectorQueue Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rdq_iReDirector = Simple.rdq_iReDirector;

      this._rdq_idRec = Simple.rdq_idRec;

      this._rdq_tFechaHora = Simple.rdq_tFechaHora;

      this._rdq_cLlamado = Simple.rdq_cLlamado;

      this._rdq_cRespuesta = Simple.rdq_cRespuesta;

      this._rdq_iStatus = Simple.rdq_iStatus;

      this._rdq_tStatusExec = Simple.rdq_tStatusExec;

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
    using(var cmd = new SqlCommand("RedirectorQueueIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rdq_iReDirector", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_idRec", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rdq_cLlamado", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rdq_cRespuesta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rdq_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_tStatusExec", SqlDbType.DateTime));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rdq_iReDirector"].Value = this._rdq_iReDirector;

		cmd.Parameters["@rdq_idRec"].Value = this._rdq_idRec;

		cmd.Parameters["@rdq_tFechaHora"].Value = (this._rdq_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rdq_tFechaHora;

		cmd.Parameters["@rdq_cLlamado"].Value = (this._rdq_cLlamado == null) ? (object) DBNull.Value : (object) this._rdq_cLlamado;

		cmd.Parameters["@rdq_cRespuesta"].Value = (this._rdq_cRespuesta == null) ? (object) DBNull.Value : (object) this._rdq_cRespuesta;

		cmd.Parameters["@rdq_iStatus"].Value = this._rdq_iStatus;

		cmd.Parameters["@rdq_tStatusExec"].Value = (this._rdq_tStatusExec == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rdq_tStatusExec;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("RedirectorQueueUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rdq_iReDirector", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_idRec", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rdq_cLlamado", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rdq_cRespuesta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rdq_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_tStatusExec", SqlDbType.DateTime));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rdq_iReDirector"].Value = this._rdq_iReDirector;

		cmd.Parameters["@rdq_idRec"].Value = this._rdq_idRec;

		cmd.Parameters["@rdq_tFechaHora"].Value = (this._rdq_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rdq_tFechaHora;

		cmd.Parameters["@rdq_cLlamado"].Value = (this._rdq_cLlamado == null) ? (object) DBNull.Value : (object) this._rdq_cLlamado;

		cmd.Parameters["@rdq_cRespuesta"].Value = (this._rdq_cRespuesta == null) ? (object) DBNull.Value : (object) this._rdq_cRespuesta;

		cmd.Parameters["@rdq_iStatus"].Value = this._rdq_iStatus;

		cmd.Parameters["@rdq_tStatusExec"].Value = (this._rdq_tStatusExec == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rdq_tStatusExec;

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
    throw new RuntimeException("The RedirectorQueue is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("RedirectorQueueDel", conn))
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
    using(var CmdSel = new SqlCommand("RedirectorQueueSel", conn))
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
    SimpleRedirectorQueue Simple = new SimpleRedirectorQueue();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.rdq_iReDirector = this._rdq_iReDirector;

      Simple.rdq_idRec = this._rdq_idRec;

      Simple.rdq_tFechaHora = this._rdq_tFechaHora;

      Simple.rdq_cLlamado = this._rdq_cLlamado;

      Simple.rdq_cRespuesta = this._rdq_cRespuesta;

      Simple.rdq_iStatus = this._rdq_iStatus;

      Simple.rdq_tStatusExec = this._rdq_tStatusExec;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleRedirectorQueue)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rdq_iReDirector = Simple.rdq_iReDirector;

      this._rdq_idRec = Simple.rdq_idRec;

      this._rdq_tFechaHora = Simple.rdq_tFechaHora;

      this._rdq_cLlamado = Simple.rdq_cLlamado;

      this._rdq_cRespuesta = Simple.rdq_cRespuesta;

      this._rdq_iStatus = Simple.rdq_iStatus;

      this._rdq_tStatusExec = Simple.rdq_tStatusExec;

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
    CallerRedirectorQueue Caller = new CallerRedirectorQueue();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.rdq_iReDirector = this._rdq_iReDirector;

      Caller.rdq_idRec = this._rdq_idRec;

      Caller.rdq_tFechaHora = this._rdq_tFechaHora;

      Caller.rdq_cLlamado = this._rdq_cLlamado;

      Caller.rdq_cRespuesta = this._rdq_cRespuesta;

      Caller.rdq_iStatus = this._rdq_iStatus;

      Caller.rdq_tStatusExec = this._rdq_tStatusExec;

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
    
      dt.Columns.Add(new DataColumn("rdq_iReDirector", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rdq_idRec", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rdq_tFechaHora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rdq_cLlamado", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rdq_cRespuesta", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rdq_iStatus", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rdq_tStatusExec", typeof (DateTime)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["rdq_iReDirector"] = this._rdq_iReDirector;

      dr["rdq_idRec"] = this._rdq_idRec;

      dr["rdq_tFechaHora"] = (object)this._rdq_tFechaHora  ?? DBNull.Value;

      dr["rdq_cLlamado"] = this._rdq_cLlamado;

      dr["rdq_cRespuesta"] = this._rdq_cRespuesta;

      dr["rdq_iStatus"] = this._rdq_iStatus;

      dr["rdq_tStatusExec"] = (object)this._rdq_tStatusExec  ?? DBNull.Value;

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
    using(var CmdChilds = new SqlCommand("RedirectorQueueByChildObject", conn))
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
    SimpleRedirectorQueue Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("RedirectorQueueByChildObject", conn))
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
    Simple = new SimpleRedirectorQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rdq_iReDirector = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rdq_idRec = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rdq_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.rdq_cLlamado = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rdq_cRespuesta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rdq_iStatus = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.rdq_tStatusExec = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);


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
    SimpleRedirectorQueue Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleRedirectorQueue();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.rdq_iReDirector = (Row["rdq_iReDirector"] == DBNull.Value) ? 0 : (int) Row["rdq_iReDirector"];

Simple.rdq_idRec = (Row["rdq_idRec"] == DBNull.Value) ? 0 : (int) Row["rdq_idRec"];

Simple.rdq_tFechaHora = (Row["rdq_tFechaHora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rdq_tFechaHora"];

Simple.rdq_cLlamado = (Row["rdq_cLlamado"] == DBNull.Value) ? "" : (string) Row["rdq_cLlamado"];

Simple.rdq_cRespuesta = (Row["rdq_cRespuesta"] == DBNull.Value) ? "" : (string) Row["rdq_cRespuesta"];

Simple.rdq_iStatus = (Row["rdq_iStatus"] == DBNull.Value) ? 0 : (int) Row["rdq_iStatus"];

Simple.rdq_tStatusExec = (Row["rdq_tStatusExec"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rdq_tStatusExec"];


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
    using(var CmdParents = new SqlCommand("RedirectorQueueByParentObject", conn))
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
    SimpleRedirectorQueue Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("RedirectorQueueByParentObject", conn))
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
    Simple = new SimpleRedirectorQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rdq_iReDirector = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rdq_idRec = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rdq_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.rdq_cLlamado = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rdq_cRespuesta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rdq_iStatus = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.rdq_tStatusExec = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);


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
    using (var CmdDataByName = new SqlCommand("RedirectorQueueByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("RedirectorQueueByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("RedirectorQueueByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("RedirectorQueueByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("RedirectorQueueByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleRedirectorQueue Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("RedirectorQueueBySimpleRedirectorQueue", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rdq_iReDirector", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_idRec", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rdq_cLlamado", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rdq_cRespuesta", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@rdq_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rdq_tStatusExec", SqlDbType.DateTime));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@rdq_iReDirector"].Value = this._rdq_iReDirector;

		cmd.Parameters["@rdq_idRec"].Value = this._rdq_idRec;

		cmd.Parameters["@rdq_tFechaHora"].Value = (this._rdq_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rdq_tFechaHora;

		cmd.Parameters["@rdq_cLlamado"].Value = (this._rdq_cLlamado == null) ? (object) DBNull.Value : (object) this._rdq_cLlamado;

		cmd.Parameters["@rdq_cRespuesta"].Value = (this._rdq_cRespuesta == null) ? (object) DBNull.Value : (object) this._rdq_cRespuesta;

		cmd.Parameters["@rdq_iStatus"].Value = this._rdq_iStatus;

		cmd.Parameters["@rdq_tStatusExec"].Value = (this._rdq_tStatusExec == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rdq_tStatusExec;


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
		 
		public IEnumerable<SimpleRedirectorQueue> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("RedirectorQueueByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleRedirectorQueue Simple = new SimpleRedirectorQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rdq_iReDirector = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rdq_idRec = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rdq_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.rdq_cLlamado = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rdq_cRespuesta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rdq_iStatus = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.rdq_tStatusExec = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleRedirectorQueue> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("RedirectorQueueByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleRedirectorQueue Simple = new SimpleRedirectorQueue();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rdq_iReDirector = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.rdq_idRec = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rdq_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.rdq_cLlamado = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.rdq_cRespuesta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rdq_iStatus = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.rdq_tStatusExec = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3223, "RedirectorQueue");
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
    if (Reader.FieldCount > 2)this._rdq_iReDirector = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._rdq_idRec = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._rdq_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._rdq_cLlamado = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._rdq_cRespuesta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._rdq_iStatus = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._rdq_tStatusExec = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);

    }
    Reader.Close();
    }
   }
  
    }
  