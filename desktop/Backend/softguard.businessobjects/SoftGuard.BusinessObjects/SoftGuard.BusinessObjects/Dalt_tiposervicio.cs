
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
     ///t_tiposervicio data access layer   
     ///</summary>
    public class Dalt_tiposervicio : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _tip_ccodigo;
    
      private string _tip_cdescripcion;
    
      private Decimal _tip_yvalor;
    
      private Decimal _tip_ndias;
    
      private Decimal _tip_nvto;
    
      private Decimal _tip_ntipo;
    
      private string _tip_cEventos;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///tip_ccodigo   
     ///</summary>
      public string tip_ccodigo
      {
      
          get{ return this._tip_ccodigo; }
          set{ this._tip_ccodigo = value; }
        
      }
     ///<summary>
     ///tip_cdescripcion   
     ///</summary>
      public string tip_cdescripcion
      {
      
          get{ return this._tip_cdescripcion; }
          set{ this._tip_cdescripcion = value; }
        
      }
     ///<summary>
     ///tip_yvalor   
     ///</summary>
      public Decimal tip_yvalor
      {
      
          get{ return this._tip_yvalor; }
          set{ this._tip_yvalor = value; }
        
      }
     ///<summary>
     ///tip_ndias   
     ///</summary>
      public Decimal tip_ndias
      {
      
          get{ return this._tip_ndias; }
          set{ this._tip_ndias = value; }
        
      }
     ///<summary>
     ///tip_nvto   
     ///</summary>
      public Decimal tip_nvto
      {
      
          get{ return this._tip_nvto; }
          set{ this._tip_nvto = value; }
        
      }
     ///<summary>
     ///tip_ntipo   
     ///</summary>
      public Decimal tip_ntipo
      {
      
          get{ return this._tip_ntipo; }
          set{ this._tip_ntipo = value; }
        
      }
     ///<summary>
     ///tip_cEventos   
     ///</summary>
      public string tip_cEventos
      {
      
          get{ return this._tip_cEventos; }
          set{ this._tip_cEventos = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_tiposervicio(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_tiposervicio(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_tiposervicio(SqlHelper SqlConfig, int UserId, Simplet_tiposervicio Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tip_ccodigo = Simple.tip_ccodigo;

      this._tip_cdescripcion = Simple.tip_cdescripcion;

      this._tip_yvalor = Simple.tip_yvalor;

      this._tip_ndias = Simple.tip_ndias;

      this._tip_nvto = Simple.tip_nvto;

      this._tip_ntipo = Simple.tip_ntipo;

      this._tip_cEventos = Simple.tip_cEventos;

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
    using(var cmd = new SqlCommand("t_tiposervicioIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tip_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tip_cdescripcion", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tip_yvalor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_ndias", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_nvto", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_cEventos", SqlDbType.VarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tip_ccodigo"].Value = (this._tip_ccodigo == null) ? (object) DBNull.Value : (object) this._tip_ccodigo;

		cmd.Parameters["@tip_cdescripcion"].Value = (this._tip_cdescripcion == null) ? (object) DBNull.Value : (object) this._tip_cdescripcion;

		cmd.Parameters["@tip_yvalor"].Value = this._tip_yvalor;

		cmd.Parameters["@tip_ndias"].Value = this._tip_ndias;

		cmd.Parameters["@tip_nvto"].Value = this._tip_nvto;

		cmd.Parameters["@tip_ntipo"].Value = this._tip_ntipo;

		cmd.Parameters["@tip_cEventos"].Value = (this._tip_cEventos == null) ? (object) DBNull.Value : (object) this._tip_cEventos;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_tiposervicioUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tip_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tip_cdescripcion", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tip_yvalor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_ndias", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_nvto", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_cEventos", SqlDbType.VarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tip_ccodigo"].Value = (this._tip_ccodigo == null) ? (object) DBNull.Value : (object) this._tip_ccodigo;

		cmd.Parameters["@tip_cdescripcion"].Value = (this._tip_cdescripcion == null) ? (object) DBNull.Value : (object) this._tip_cdescripcion;

		cmd.Parameters["@tip_yvalor"].Value = this._tip_yvalor;

		cmd.Parameters["@tip_ndias"].Value = this._tip_ndias;

		cmd.Parameters["@tip_nvto"].Value = this._tip_nvto;

		cmd.Parameters["@tip_ntipo"].Value = this._tip_ntipo;

		cmd.Parameters["@tip_cEventos"].Value = (this._tip_cEventos == null) ? (object) DBNull.Value : (object) this._tip_cEventos;

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
    throw new RuntimeException("The t_tiposervicio is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_tiposervicioDel", conn))
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
    using(var CmdSel = new SqlCommand("t_tiposervicioSel", conn))
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
    Simplet_tiposervicio Simple = new Simplet_tiposervicio();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.tip_ccodigo = this._tip_ccodigo;

      Simple.tip_cdescripcion = this._tip_cdescripcion;

      Simple.tip_yvalor = this._tip_yvalor;

      Simple.tip_ndias = this._tip_ndias;

      Simple.tip_nvto = this._tip_nvto;

      Simple.tip_ntipo = this._tip_ntipo;

      Simple.tip_cEventos = this._tip_cEventos;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_tiposervicio)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tip_ccodigo = Simple.tip_ccodigo;

      this._tip_cdescripcion = Simple.tip_cdescripcion;

      this._tip_yvalor = Simple.tip_yvalor;

      this._tip_ndias = Simple.tip_ndias;

      this._tip_nvto = Simple.tip_nvto;

      this._tip_ntipo = Simple.tip_ntipo;

      this._tip_cEventos = Simple.tip_cEventos;

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
    Callert_tiposervicio Caller = new Callert_tiposervicio();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.tip_ccodigo = this._tip_ccodigo;

      Caller.tip_cdescripcion = this._tip_cdescripcion;

      Caller.tip_yvalor = this._tip_yvalor;

      Caller.tip_ndias = this._tip_ndias;

      Caller.tip_nvto = this._tip_nvto;

      Caller.tip_ntipo = this._tip_ntipo;

      Caller.tip_cEventos = this._tip_cEventos;

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
    
      dt.Columns.Add(new DataColumn("tip_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tip_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tip_yvalor", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tip_ndias", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tip_nvto", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tip_ntipo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tip_cEventos", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["tip_ccodigo"] = this._tip_ccodigo;

      dr["tip_cdescripcion"] = this._tip_cdescripcion;

      dr["tip_yvalor"] = this._tip_yvalor;

      dr["tip_ndias"] = this._tip_ndias;

      dr["tip_nvto"] = this._tip_nvto;

      dr["tip_ntipo"] = this._tip_ntipo;

      dr["tip_cEventos"] = this._tip_cEventos;

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
    using(var CmdChilds = new SqlCommand("t_tiposervicioByChildObject", conn))
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
    Simplet_tiposervicio Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_tiposervicioByChildObject", conn))
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
    Simple = new Simplet_tiposervicio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tip_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tip_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tip_yvalor = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.tip_ndias = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.tip_nvto = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tip_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tip_cEventos = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);


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
    Simplet_tiposervicio Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_tiposervicio();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.tip_ccodigo = (Row["tip_ccodigo"] == DBNull.Value) ? "" : (string) Row["tip_ccodigo"];

Simple.tip_cdescripcion = (Row["tip_cdescripcion"] == DBNull.Value) ? "" : (string) Row["tip_cdescripcion"];

Simple.tip_yvalor = (Row["tip_yvalor"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tip_yvalor"];

Simple.tip_ndias = (Row["tip_ndias"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tip_ndias"];

Simple.tip_nvto = (Row["tip_nvto"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tip_nvto"];

Simple.tip_ntipo = (Row["tip_ntipo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tip_ntipo"];

Simple.tip_cEventos = (Row["tip_cEventos"] == DBNull.Value) ? "" : (string) Row["tip_cEventos"];


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
    using(var CmdParents = new SqlCommand("t_tiposervicioByParentObject", conn))
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
    Simplet_tiposervicio Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_tiposervicioByParentObject", conn))
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
    Simple = new Simplet_tiposervicio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tip_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tip_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tip_yvalor = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.tip_ndias = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.tip_nvto = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tip_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tip_cEventos = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);


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
    using (var CmdDataByName = new SqlCommand("t_tiposervicioByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_tiposervicioByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_tiposervicioByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_tiposervicioByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_tiposervicioByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_tiposervicio Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_tiposervicioBySimplet_tiposervicio", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tip_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tip_cdescripcion", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tip_yvalor", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_ndias", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_nvto", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tip_cEventos", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@tip_ccodigo"].Value = (this._tip_ccodigo == null) ? (object) DBNull.Value : (object) this._tip_ccodigo;

		cmd.Parameters["@tip_cdescripcion"].Value = (this._tip_cdescripcion == null) ? (object) DBNull.Value : (object) this._tip_cdescripcion;

		cmd.Parameters["@tip_yvalor"].Value = this._tip_yvalor;

		cmd.Parameters["@tip_ndias"].Value = this._tip_ndias;

		cmd.Parameters["@tip_nvto"].Value = this._tip_nvto;

		cmd.Parameters["@tip_ntipo"].Value = this._tip_ntipo;

		cmd.Parameters["@tip_cEventos"].Value = (this._tip_cEventos == null) ? (object) DBNull.Value : (object) this._tip_cEventos;


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
		 
		public IEnumerable<Simplet_tiposervicio> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_tiposervicioByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_tiposervicio Simple = new Simplet_tiposervicio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tip_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tip_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tip_yvalor = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.tip_ndias = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.tip_nvto = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tip_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tip_cEventos = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_tiposervicio> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_tiposervicioByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_tiposervicio Simple = new Simplet_tiposervicio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tip_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tip_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tip_yvalor = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.tip_ndias = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.tip_nvto = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.tip_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.tip_cEventos = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3030, "t_tiposervicio");
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
    if (Reader.FieldCount > 2)this._tip_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._tip_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._tip_yvalor = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)this._tip_ndias = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)this._tip_nvto = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)this._tip_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._tip_cEventos = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);

    }
    Reader.Close();
    }
   }
  
    }
  