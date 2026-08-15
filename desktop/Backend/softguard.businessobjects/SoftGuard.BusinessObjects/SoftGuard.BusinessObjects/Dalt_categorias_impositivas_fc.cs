
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
     ///t_categorias_impositivas_fc data access layer   
     ///</summary>
    public class Dalt_categorias_impositivas_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _cat_ccodigo;
    
      private string _cat_cdescripcion;
    
      private string _cat_cimpuesto1;
    
      private string _cat_cimpuesto2;
    
      private string _cat_cimpuesto3;
    
      private Decimal _cat_nTipoResp;
    
      private int _cat_orgicodigoid;
    
      private int _cat_cbtidkey;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cat_ccodigo   
     ///</summary>
      public string cat_ccodigo
      {
      
          get{ return this._cat_ccodigo; }
          set{ this._cat_ccodigo = value; }
        
      }
     ///<summary>
     ///cat_cdescripcion   
     ///</summary>
      public string cat_cdescripcion
      {
      
          get{ return this._cat_cdescripcion; }
          set{ this._cat_cdescripcion = value; }
        
      }
     ///<summary>
     ///cat_cimpuesto1   
     ///</summary>
      public string cat_cimpuesto1
      {
      
          get{ return this._cat_cimpuesto1; }
          set{ this._cat_cimpuesto1 = value; }
        
      }
     ///<summary>
     ///cat_cimpuesto2   
     ///</summary>
      public string cat_cimpuesto2
      {
      
          get{ return this._cat_cimpuesto2; }
          set{ this._cat_cimpuesto2 = value; }
        
      }
     ///<summary>
     ///cat_cimpuesto3   
     ///</summary>
      public string cat_cimpuesto3
      {
      
          get{ return this._cat_cimpuesto3; }
          set{ this._cat_cimpuesto3 = value; }
        
      }
     ///<summary>
     ///cat_nTipoResp   
     ///</summary>
      public Decimal cat_nTipoResp
      {
      
          get{ return this._cat_nTipoResp; }
          set{ this._cat_nTipoResp = value; }
        
      }
     ///<summary>
     ///cat_orgicodigoid   
     ///</summary>
      public int cat_orgicodigoid
      {
      
          get{ return this._cat_orgicodigoid; }
          set{ this._cat_orgicodigoid = value; }
        
      }
     ///<summary>
     ///cat_cbtidkey   
     ///</summary>
      public int cat_cbtidkey
      {
      
          get{ return this._cat_cbtidkey; }
          set{ this._cat_cbtidkey = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_categorias_impositivas_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_categorias_impositivas_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_categorias_impositivas_fc(SqlHelper SqlConfig, int UserId, Simplet_categorias_impositivas_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cat_ccodigo = Simple.cat_ccodigo;

      this._cat_cdescripcion = Simple.cat_cdescripcion;

      this._cat_cimpuesto1 = Simple.cat_cimpuesto1;

      this._cat_cimpuesto2 = Simple.cat_cimpuesto2;

      this._cat_cimpuesto3 = Simple.cat_cimpuesto3;

      this._cat_nTipoResp = Simple.cat_nTipoResp;

      this._cat_orgicodigoid = Simple.cat_orgicodigoid;

      this._cat_cbtidkey = Simple.cat_cbtidkey;

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
    using(var cmd = new SqlCommand("t_categorias_impositivas_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cat_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto1", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto2", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto3", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_nTipoResp", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cat_orgicodigoid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cat_cbtidkey", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cat_ccodigo"].Value = (this._cat_ccodigo == null) ? (object) DBNull.Value : (object) this._cat_ccodigo;

		cmd.Parameters["@cat_cdescripcion"].Value = (this._cat_cdescripcion == null) ? (object) DBNull.Value : (object) this._cat_cdescripcion;

		cmd.Parameters["@cat_cimpuesto1"].Value = (this._cat_cimpuesto1 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto1;

		cmd.Parameters["@cat_cimpuesto2"].Value = (this._cat_cimpuesto2 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto2;

		cmd.Parameters["@cat_cimpuesto3"].Value = (this._cat_cimpuesto3 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto3;

		cmd.Parameters["@cat_nTipoResp"].Value = this._cat_nTipoResp;

		cmd.Parameters["@cat_orgicodigoid"].Value = this._cat_orgicodigoid;

		cmd.Parameters["@cat_cbtidkey"].Value = this._cat_cbtidkey;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_categorias_impositivas_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cat_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto1", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto2", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto3", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_nTipoResp", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cat_orgicodigoid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cat_cbtidkey", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cat_ccodigo"].Value = (this._cat_ccodigo == null) ? (object) DBNull.Value : (object) this._cat_ccodigo;

		cmd.Parameters["@cat_cdescripcion"].Value = (this._cat_cdescripcion == null) ? (object) DBNull.Value : (object) this._cat_cdescripcion;

		cmd.Parameters["@cat_cimpuesto1"].Value = (this._cat_cimpuesto1 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto1;

		cmd.Parameters["@cat_cimpuesto2"].Value = (this._cat_cimpuesto2 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto2;

		cmd.Parameters["@cat_cimpuesto3"].Value = (this._cat_cimpuesto3 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto3;

		cmd.Parameters["@cat_nTipoResp"].Value = this._cat_nTipoResp;

		cmd.Parameters["@cat_orgicodigoid"].Value = this._cat_orgicodigoid;

		cmd.Parameters["@cat_cbtidkey"].Value = this._cat_cbtidkey;

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
    throw new RuntimeException("The t_categorias_impositivas_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_categorias_impositivas_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("t_categorias_impositivas_fcSel", conn))
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
    Simplet_categorias_impositivas_fc Simple = new Simplet_categorias_impositivas_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cat_ccodigo = this._cat_ccodigo;

      Simple.cat_cdescripcion = this._cat_cdescripcion;

      Simple.cat_cimpuesto1 = this._cat_cimpuesto1;

      Simple.cat_cimpuesto2 = this._cat_cimpuesto2;

      Simple.cat_cimpuesto3 = this._cat_cimpuesto3;

      Simple.cat_nTipoResp = this._cat_nTipoResp;

      Simple.cat_orgicodigoid = this._cat_orgicodigoid;

      Simple.cat_cbtidkey = this._cat_cbtidkey;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_categorias_impositivas_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cat_ccodigo = Simple.cat_ccodigo;

      this._cat_cdescripcion = Simple.cat_cdescripcion;

      this._cat_cimpuesto1 = Simple.cat_cimpuesto1;

      this._cat_cimpuesto2 = Simple.cat_cimpuesto2;

      this._cat_cimpuesto3 = Simple.cat_cimpuesto3;

      this._cat_nTipoResp = Simple.cat_nTipoResp;

      this._cat_orgicodigoid = Simple.cat_orgicodigoid;

      this._cat_cbtidkey = Simple.cat_cbtidkey;

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
    Callert_categorias_impositivas_fc Caller = new Callert_categorias_impositivas_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cat_ccodigo = this._cat_ccodigo;

      Caller.cat_cdescripcion = this._cat_cdescripcion;

      Caller.cat_cimpuesto1 = this._cat_cimpuesto1;

      Caller.cat_cimpuesto2 = this._cat_cimpuesto2;

      Caller.cat_cimpuesto3 = this._cat_cimpuesto3;

      Caller.cat_nTipoResp = this._cat_nTipoResp;

      Caller.cat_orgicodigoid = this._cat_orgicodigoid;

      Caller.cat_cbtidkey = this._cat_cbtidkey;

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
    
      dt.Columns.Add(new DataColumn("cat_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cat_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cat_cimpuesto1", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cat_cimpuesto2", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cat_cimpuesto3", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cat_nTipoResp", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cat_orgicodigoid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cat_cbtidkey", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cat_ccodigo"] = this._cat_ccodigo;

      dr["cat_cdescripcion"] = this._cat_cdescripcion;

      dr["cat_cimpuesto1"] = this._cat_cimpuesto1;

      dr["cat_cimpuesto2"] = this._cat_cimpuesto2;

      dr["cat_cimpuesto3"] = this._cat_cimpuesto3;

      dr["cat_nTipoResp"] = this._cat_nTipoResp;

      dr["cat_orgicodigoid"] = this._cat_orgicodigoid;

      dr["cat_cbtidkey"] = this._cat_cbtidkey;

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
    using(var CmdChilds = new SqlCommand("t_categorias_impositivas_fcByChildObject", conn))
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
    Simplet_categorias_impositivas_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_categorias_impositivas_fcByChildObject", conn))
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
    Simple = new Simplet_categorias_impositivas_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cat_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cat_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cat_cimpuesto1 = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cat_cimpuesto2 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cat_cimpuesto3 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cat_nTipoResp = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cat_orgicodigoid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cat_cbtidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);


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
    Simplet_categorias_impositivas_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_categorias_impositivas_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cat_ccodigo = (Row["cat_ccodigo"] == DBNull.Value) ? "" : (string) Row["cat_ccodigo"];

Simple.cat_cdescripcion = (Row["cat_cdescripcion"] == DBNull.Value) ? "" : (string) Row["cat_cdescripcion"];

Simple.cat_cimpuesto1 = (Row["cat_cimpuesto1"] == DBNull.Value) ? "" : (string) Row["cat_cimpuesto1"];

Simple.cat_cimpuesto2 = (Row["cat_cimpuesto2"] == DBNull.Value) ? "" : (string) Row["cat_cimpuesto2"];

Simple.cat_cimpuesto3 = (Row["cat_cimpuesto3"] == DBNull.Value) ? "" : (string) Row["cat_cimpuesto3"];

Simple.cat_nTipoResp = (Row["cat_nTipoResp"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cat_nTipoResp"];

Simple.cat_orgicodigoid = (Row["cat_orgicodigoid"] == DBNull.Value) ? 0 : (int) Row["cat_orgicodigoid"];

Simple.cat_cbtidkey = (Row["cat_cbtidkey"] == DBNull.Value) ? 0 : (int) Row["cat_cbtidkey"];


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
    using(var CmdParents = new SqlCommand("t_categorias_impositivas_fcByParentObject", conn))
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
    Simplet_categorias_impositivas_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_categorias_impositivas_fcByParentObject", conn))
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
    Simple = new Simplet_categorias_impositivas_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cat_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cat_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cat_cimpuesto1 = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cat_cimpuesto2 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cat_cimpuesto3 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cat_nTipoResp = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cat_orgicodigoid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cat_cbtidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);


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
    using (var CmdDataByName = new SqlCommand("t_categorias_impositivas_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_categorias_impositivas_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_categorias_impositivas_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_categorias_impositivas_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_categorias_impositivas_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_categorias_impositivas_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_categorias_impositivas_fcBySimplet_categorias_impositivas_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cat_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto1", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto2", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_cimpuesto3", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cat_nTipoResp", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cat_orgicodigoid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cat_cbtidkey", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cat_ccodigo"].Value = (this._cat_ccodigo == null) ? (object) DBNull.Value : (object) this._cat_ccodigo;

		cmd.Parameters["@cat_cdescripcion"].Value = (this._cat_cdescripcion == null) ? (object) DBNull.Value : (object) this._cat_cdescripcion;

		cmd.Parameters["@cat_cimpuesto1"].Value = (this._cat_cimpuesto1 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto1;

		cmd.Parameters["@cat_cimpuesto2"].Value = (this._cat_cimpuesto2 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto2;

		cmd.Parameters["@cat_cimpuesto3"].Value = (this._cat_cimpuesto3 == null) ? (object) DBNull.Value : (object) this._cat_cimpuesto3;

		cmd.Parameters["@cat_nTipoResp"].Value = this._cat_nTipoResp;

		cmd.Parameters["@cat_orgicodigoid"].Value = this._cat_orgicodigoid;

		cmd.Parameters["@cat_cbtidkey"].Value = this._cat_cbtidkey;


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
		 
		public IEnumerable<Simplet_categorias_impositivas_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_categorias_impositivas_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_categorias_impositivas_fc Simple = new Simplet_categorias_impositivas_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cat_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cat_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cat_cimpuesto1 = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cat_cimpuesto2 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cat_cimpuesto3 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cat_nTipoResp = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cat_orgicodigoid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cat_cbtidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_categorias_impositivas_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_categorias_impositivas_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_categorias_impositivas_fc Simple = new Simplet_categorias_impositivas_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cat_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cat_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cat_cimpuesto1 = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cat_cimpuesto2 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cat_cimpuesto3 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cat_nTipoResp = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cat_orgicodigoid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cat_cbtidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3149, "t_categorias_impositivas_fc");
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
    if (Reader.FieldCount > 2)this._cat_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._cat_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._cat_cimpuesto1 = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._cat_cimpuesto2 = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._cat_cimpuesto3 = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._cat_nTipoResp = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._cat_orgicodigoid = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._cat_cbtidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);

    }
    Reader.Close();
    }
   }
  
    }
  