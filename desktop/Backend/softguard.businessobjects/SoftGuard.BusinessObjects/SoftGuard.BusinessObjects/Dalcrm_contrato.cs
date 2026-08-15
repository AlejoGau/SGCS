
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
     ///crm_contrato data access layer   
     ///</summary>
    public class Dalcrm_contrato : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _cnt_org_fc;
    
      private int _cnt_idcliente;
    
      private DateTime? _cnt_fechaalta;
    
      private DateTime? _cnt_fechavto;
    
      private int _cnt_formapago;
    
      private string _cnt_metadata;
    
      private int _cnt_estado;
    
      private int _cnt_tmp_id;
    
      private int _cnt_dinamico;
    
      private int _cnt_cantidad_auto;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cnt_org_fc   
     ///</summary>
      public int cnt_org_fc
      {
      
          get{ return this._cnt_org_fc; }
          set{ this._cnt_org_fc = value; }
        
      }
     ///<summary>
     ///cnt_idcliente   
     ///</summary>
      public int cnt_idcliente
      {
      
          get{ return this._cnt_idcliente; }
          set{ this._cnt_idcliente = value; }
        
      }
     ///<summary>
     ///cnt_fechaalta   
     ///</summary>
      public DateTime? cnt_fechaalta
      {
      
          get{ return this._cnt_fechaalta; }
          set{ this._cnt_fechaalta = value; }
        
      }
     ///<summary>
     ///cnt_fechavto   
     ///</summary>
      public DateTime? cnt_fechavto
      {
      
          get{ return this._cnt_fechavto; }
          set{ this._cnt_fechavto = value; }
        
      }
     ///<summary>
     ///cnt_formapago   
     ///</summary>
      public int cnt_formapago
      {
      
          get{ return this._cnt_formapago; }
          set{ this._cnt_formapago = value; }
        
      }
     ///<summary>
     ///cnt_metadata   
     ///</summary>
      public string cnt_metadata
      {
      
          get{ return this._cnt_metadata; }
          set{ this._cnt_metadata = value; }
        
      }
     ///<summary>
     ///cnt_estado   
     ///</summary>
      public int cnt_estado
      {
      
          get{ return this._cnt_estado; }
          set{ this._cnt_estado = value; }
        
      }
     ///<summary>
     ///cnt_tmp_id   
     ///</summary>
      public int cnt_tmp_id
      {
      
          get{ return this._cnt_tmp_id; }
          set{ this._cnt_tmp_id = value; }
        
      }
     ///<summary>
     ///cnt_dinamico   
     ///</summary>
      public int cnt_dinamico
      {
      
          get{ return this._cnt_dinamico; }
          set{ this._cnt_dinamico = value; }
        
      }
     ///<summary>
     ///cnt_cantidad_auto   
     ///</summary>
      public int cnt_cantidad_auto
      {
      
          get{ return this._cnt_cantidad_auto; }
          set{ this._cnt_cantidad_auto = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalcrm_contrato(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalcrm_contrato(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalcrm_contrato(SqlHelper SqlConfig, int UserId, Simplecrm_contrato Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cnt_org_fc = Simple.cnt_org_fc;

      this._cnt_idcliente = Simple.cnt_idcliente;

      this._cnt_fechaalta = Simple.cnt_fechaalta;

      this._cnt_fechavto = Simple.cnt_fechavto;

      this._cnt_formapago = Simple.cnt_formapago;

      this._cnt_metadata = Simple.cnt_metadata;

      this._cnt_estado = Simple.cnt_estado;

      this._cnt_tmp_id = Simple.cnt_tmp_id;

      this._cnt_dinamico = Simple.cnt_dinamico;

      this._cnt_cantidad_auto = Simple.cnt_cantidad_auto;

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
    using(var cmd = new SqlCommand("crm_contratoIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cnt_org_fc", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_idcliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_fechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cnt_fechavto", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cnt_formapago", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_metadata", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cnt_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_tmp_id", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_dinamico", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_cantidad_auto", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cnt_org_fc"].Value = this._cnt_org_fc;

		cmd.Parameters["@cnt_idcliente"].Value = this._cnt_idcliente;

		cmd.Parameters["@cnt_fechaalta"].Value = (this._cnt_fechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cnt_fechaalta;

		cmd.Parameters["@cnt_fechavto"].Value = (this._cnt_fechavto == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cnt_fechavto;

		cmd.Parameters["@cnt_formapago"].Value = this._cnt_formapago;

		cmd.Parameters["@cnt_metadata"].Value = (this._cnt_metadata == null) ? (object) DBNull.Value : (object) this._cnt_metadata;

		cmd.Parameters["@cnt_estado"].Value = this._cnt_estado;

		cmd.Parameters["@cnt_tmp_id"].Value = this._cnt_tmp_id;

		cmd.Parameters["@cnt_dinamico"].Value = this._cnt_dinamico;

		cmd.Parameters["@cnt_cantidad_auto"].Value = this._cnt_cantidad_auto;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("crm_contratoUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cnt_org_fc", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_idcliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_fechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cnt_fechavto", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cnt_formapago", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_metadata", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cnt_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_tmp_id", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_dinamico", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_cantidad_auto", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cnt_org_fc"].Value = this._cnt_org_fc;

		cmd.Parameters["@cnt_idcliente"].Value = this._cnt_idcliente;

		cmd.Parameters["@cnt_fechaalta"].Value = (this._cnt_fechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cnt_fechaalta;

		cmd.Parameters["@cnt_fechavto"].Value = (this._cnt_fechavto == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cnt_fechavto;

		cmd.Parameters["@cnt_formapago"].Value = this._cnt_formapago;

		cmd.Parameters["@cnt_metadata"].Value = (this._cnt_metadata == null) ? (object) DBNull.Value : (object) this._cnt_metadata;

		cmd.Parameters["@cnt_estado"].Value = this._cnt_estado;

		cmd.Parameters["@cnt_tmp_id"].Value = this._cnt_tmp_id;

		cmd.Parameters["@cnt_dinamico"].Value = this._cnt_dinamico;

		cmd.Parameters["@cnt_cantidad_auto"].Value = this._cnt_cantidad_auto;

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
    throw new RuntimeException("The crm_contrato is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("crm_contratoDel", conn))
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
    using(var CmdSel = new SqlCommand("crm_contratoSel", conn))
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
    Simplecrm_contrato Simple = new Simplecrm_contrato();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cnt_org_fc = this._cnt_org_fc;

      Simple.cnt_idcliente = this._cnt_idcliente;

      Simple.cnt_fechaalta = this._cnt_fechaalta;

      Simple.cnt_fechavto = this._cnt_fechavto;

      Simple.cnt_formapago = this._cnt_formapago;

      Simple.cnt_metadata = this._cnt_metadata;

      Simple.cnt_estado = this._cnt_estado;

      Simple.cnt_tmp_id = this._cnt_tmp_id;

      Simple.cnt_dinamico = this._cnt_dinamico;

      Simple.cnt_cantidad_auto = this._cnt_cantidad_auto;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplecrm_contrato)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cnt_org_fc = Simple.cnt_org_fc;

      this._cnt_idcliente = Simple.cnt_idcliente;

      this._cnt_fechaalta = Simple.cnt_fechaalta;

      this._cnt_fechavto = Simple.cnt_fechavto;

      this._cnt_formapago = Simple.cnt_formapago;

      this._cnt_metadata = Simple.cnt_metadata;

      this._cnt_estado = Simple.cnt_estado;

      this._cnt_tmp_id = Simple.cnt_tmp_id;

      this._cnt_dinamico = Simple.cnt_dinamico;

      this._cnt_cantidad_auto = Simple.cnt_cantidad_auto;

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
    Callercrm_contrato Caller = new Callercrm_contrato();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cnt_org_fc = this._cnt_org_fc;

      Caller.cnt_idcliente = this._cnt_idcliente;

      Caller.cnt_fechaalta = this._cnt_fechaalta;

      Caller.cnt_fechavto = this._cnt_fechavto;

      Caller.cnt_formapago = this._cnt_formapago;

      Caller.cnt_metadata = this._cnt_metadata;

      Caller.cnt_estado = this._cnt_estado;

      Caller.cnt_tmp_id = this._cnt_tmp_id;

      Caller.cnt_dinamico = this._cnt_dinamico;

      Caller.cnt_cantidad_auto = this._cnt_cantidad_auto;

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
    
      dt.Columns.Add(new DataColumn("cnt_org_fc", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cnt_idcliente", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cnt_fechaalta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cnt_fechavto", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cnt_formapago", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cnt_metadata", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cnt_estado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cnt_tmp_id", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cnt_dinamico", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cnt_cantidad_auto", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cnt_org_fc"] = this._cnt_org_fc;

      dr["cnt_idcliente"] = this._cnt_idcliente;

      dr["cnt_fechaalta"] = (object)this._cnt_fechaalta  ?? DBNull.Value;

      dr["cnt_fechavto"] = (object)this._cnt_fechavto  ?? DBNull.Value;

      dr["cnt_formapago"] = this._cnt_formapago;

      dr["cnt_metadata"] = this._cnt_metadata;

      dr["cnt_estado"] = this._cnt_estado;

      dr["cnt_tmp_id"] = this._cnt_tmp_id;

      dr["cnt_dinamico"] = this._cnt_dinamico;

      dr["cnt_cantidad_auto"] = this._cnt_cantidad_auto;

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
    using(var CmdChilds = new SqlCommand("crm_contratoByChildObject", conn))
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
    Simplecrm_contrato Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("crm_contratoByChildObject", conn))
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
    Simple = new Simplecrm_contrato();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cnt_org_fc = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cnt_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cnt_fechaalta = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cnt_fechavto = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.cnt_formapago = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cnt_metadata = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cnt_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cnt_tmp_id = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cnt_dinamico = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cnt_cantidad_auto = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);


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
    Simplecrm_contrato Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplecrm_contrato();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cnt_org_fc = (Row["cnt_org_fc"] == DBNull.Value) ? 0 : (int) Row["cnt_org_fc"];

Simple.cnt_idcliente = (Row["cnt_idcliente"] == DBNull.Value) ? 0 : (int) Row["cnt_idcliente"];

Simple.cnt_fechaalta = (Row["cnt_fechaalta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cnt_fechaalta"];

Simple.cnt_fechavto = (Row["cnt_fechavto"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cnt_fechavto"];

Simple.cnt_formapago = (Row["cnt_formapago"] == DBNull.Value) ? 0 : (int) Row["cnt_formapago"];

Simple.cnt_metadata = (Row["cnt_metadata"] == DBNull.Value) ? "" : (string) Row["cnt_metadata"];

Simple.cnt_estado = (Row["cnt_estado"] == DBNull.Value) ? 0 : (int) Row["cnt_estado"];

Simple.cnt_tmp_id = (Row["cnt_tmp_id"] == DBNull.Value) ? 0 : (int) Row["cnt_tmp_id"];

Simple.cnt_dinamico = (Row["cnt_dinamico"] == DBNull.Value) ? 0 : (int) Row["cnt_dinamico"];

Simple.cnt_cantidad_auto = (Row["cnt_cantidad_auto"] == DBNull.Value) ? 0 : (int) Row["cnt_cantidad_auto"];


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
    using(var CmdParents = new SqlCommand("crm_contratoByParentObject", conn))
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
    Simplecrm_contrato Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("crm_contratoByParentObject", conn))
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
    Simple = new Simplecrm_contrato();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cnt_org_fc = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cnt_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cnt_fechaalta = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cnt_fechavto = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.cnt_formapago = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cnt_metadata = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cnt_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cnt_tmp_id = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cnt_dinamico = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cnt_cantidad_auto = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);


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
    using (var CmdDataByName = new SqlCommand("crm_contratoByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("crm_contratoByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("crm_contratoByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("crm_contratoByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("crm_contratoByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplecrm_contrato Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("crm_contratoBySimplecrm_contrato", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cnt_org_fc", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_idcliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_fechaalta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cnt_fechavto", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cnt_formapago", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_metadata", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cnt_estado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_tmp_id", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_dinamico", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cnt_cantidad_auto", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cnt_org_fc"].Value = this._cnt_org_fc;

		cmd.Parameters["@cnt_idcliente"].Value = this._cnt_idcliente;

		cmd.Parameters["@cnt_fechaalta"].Value = (this._cnt_fechaalta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cnt_fechaalta;

		cmd.Parameters["@cnt_fechavto"].Value = (this._cnt_fechavto == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cnt_fechavto;

		cmd.Parameters["@cnt_formapago"].Value = this._cnt_formapago;

		cmd.Parameters["@cnt_metadata"].Value = (this._cnt_metadata == null) ? (object) DBNull.Value : (object) this._cnt_metadata;

		cmd.Parameters["@cnt_estado"].Value = this._cnt_estado;

		cmd.Parameters["@cnt_tmp_id"].Value = this._cnt_tmp_id;

		cmd.Parameters["@cnt_dinamico"].Value = this._cnt_dinamico;

		cmd.Parameters["@cnt_cantidad_auto"].Value = this._cnt_cantidad_auto;


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
		 
		public IEnumerable<Simplecrm_contrato> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("crm_contratoByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplecrm_contrato Simple = new Simplecrm_contrato();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cnt_org_fc = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cnt_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cnt_fechaalta = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cnt_fechavto = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.cnt_formapago = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cnt_metadata = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cnt_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cnt_tmp_id = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cnt_dinamico = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cnt_cantidad_auto = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplecrm_contrato> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("crm_contratoByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplecrm_contrato Simple = new Simplecrm_contrato();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cnt_org_fc = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cnt_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cnt_fechaalta = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.cnt_fechavto = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.cnt_formapago = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cnt_metadata = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cnt_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cnt_tmp_id = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cnt_dinamico = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.cnt_cantidad_auto = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3148, "crm_contrato");
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
    if (Reader.FieldCount > 2)this._cnt_org_fc = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._cnt_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._cnt_fechaalta = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._cnt_fechavto = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)this._cnt_formapago = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._cnt_metadata = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._cnt_estado = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._cnt_tmp_id = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._cnt_dinamico = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._cnt_cantidad_auto = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);

    }
    Reader.Close();
    }
   }
  
    }
  