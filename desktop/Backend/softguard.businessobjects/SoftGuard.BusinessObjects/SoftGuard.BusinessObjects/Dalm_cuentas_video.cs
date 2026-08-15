
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
     ///m_cuentas_video data access layer   
     ///</summary>
    public class Dalm_cuentas_video : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _cuv_iidcuenta;
    
      private string _cuv_clink;
    
      private string _cuv_meventos;
    
      private string _cuv_clinkdss;
    
      private int _cuv_ivideoid;
    
      private Single _cuv_rlatitud;
    
      private Single _cuv_rlongitud;
    
      private int _cuv_iTodosLosEventos;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cuv_iidcuenta   
     ///</summary>
      public int cuv_iidcuenta
      {
      
          get{ return this._cuv_iidcuenta; }
          set{ this._cuv_iidcuenta = value; }
        
      }
     ///<summary>
     ///cuv_clink   
     ///</summary>
      public string cuv_clink
      {
      
          get{ return this._cuv_clink; }
          set{ this._cuv_clink = value; }
        
      }
     ///<summary>
     ///cuv_meventos   
     ///</summary>
      public string cuv_meventos
      {
      
          get{ return this._cuv_meventos; }
          set{ this._cuv_meventos = value; }
        
      }
     ///<summary>
     ///cuv_clinkdss   
     ///</summary>
      public string cuv_clinkdss
      {
      
          get{ return this._cuv_clinkdss; }
          set{ this._cuv_clinkdss = value; }
        
      }
     ///<summary>
     ///cuv_ivideoid   
     ///</summary>
      public int cuv_ivideoid
      {
      
          get{ return this._cuv_ivideoid; }
          set{ this._cuv_ivideoid = value; }
        
      }
     ///<summary>
     ///cuv_rlatitud   
     ///</summary>
      public Single cuv_rlatitud
      {
      
          get{ return this._cuv_rlatitud; }
          set{ this._cuv_rlatitud = value; }
        
      }
     ///<summary>
     ///cuv_rlongitud   
     ///</summary>
      public Single cuv_rlongitud
      {
      
          get{ return this._cuv_rlongitud; }
          set{ this._cuv_rlongitud = value; }
        
      }
     ///<summary>
     ///cuv_iTodosLosEventos   
     ///</summary>
      public int cuv_iTodosLosEventos
      {
      
          get{ return this._cuv_iTodosLosEventos; }
          set{ this._cuv_iTodosLosEventos = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_cuentas_video(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_cuentas_video(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_cuentas_video(SqlHelper SqlConfig, int UserId, Simplem_cuentas_video Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cuv_iidcuenta = Simple.cuv_iidcuenta;

      this._cuv_clink = Simple.cuv_clink;

      this._cuv_meventos = Simple.cuv_meventos;

      this._cuv_clinkdss = Simple.cuv_clinkdss;

      this._cuv_ivideoid = Simple.cuv_ivideoid;

      this._cuv_rlatitud = Simple.cuv_rlatitud;

      this._cuv_rlongitud = Simple.cuv_rlongitud;

      this._cuv_iTodosLosEventos = Simple.cuv_iTodosLosEventos;

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
    using(var cmd = new SqlCommand("m_cuentas_videoIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cuv_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cuv_clink", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cuv_meventos", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@cuv_clinkdss", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cuv_ivideoid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cuv_rlatitud", SqlDbType.Real));cmd.Parameters.Add(new SqlParameter("@cuv_rlongitud", SqlDbType.Real));cmd.Parameters.Add(new SqlParameter("@cuv_iTodosLosEventos", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cuv_iidcuenta"].Value = this._cuv_iidcuenta;

		cmd.Parameters["@cuv_clink"].Value = (this._cuv_clink == null) ? (object) DBNull.Value : (object) this._cuv_clink;

		cmd.Parameters["@cuv_meventos"].Value = (this._cuv_meventos == null) ? (object) DBNull.Value : (object) this._cuv_meventos;

		cmd.Parameters["@cuv_clinkdss"].Value = (this._cuv_clinkdss == null) ? (object) DBNull.Value : (object) this._cuv_clinkdss;

		cmd.Parameters["@cuv_ivideoid"].Value = this._cuv_ivideoid;

		cmd.Parameters["@cuv_rlatitud"].Value = this._cuv_rlatitud;

		cmd.Parameters["@cuv_rlongitud"].Value = this._cuv_rlongitud;

		cmd.Parameters["@cuv_iTodosLosEventos"].Value = this._cuv_iTodosLosEventos;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_cuentas_videoUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cuv_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cuv_clink", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cuv_meventos", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@cuv_clinkdss", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cuv_ivideoid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cuv_rlatitud", SqlDbType.Real));cmd.Parameters.Add(new SqlParameter("@cuv_rlongitud", SqlDbType.Real));cmd.Parameters.Add(new SqlParameter("@cuv_iTodosLosEventos", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cuv_iidcuenta"].Value = this._cuv_iidcuenta;

		cmd.Parameters["@cuv_clink"].Value = (this._cuv_clink == null) ? (object) DBNull.Value : (object) this._cuv_clink;

		cmd.Parameters["@cuv_meventos"].Value = (this._cuv_meventos == null) ? (object) DBNull.Value : (object) this._cuv_meventos;

		cmd.Parameters["@cuv_clinkdss"].Value = (this._cuv_clinkdss == null) ? (object) DBNull.Value : (object) this._cuv_clinkdss;

		cmd.Parameters["@cuv_ivideoid"].Value = this._cuv_ivideoid;

		cmd.Parameters["@cuv_rlatitud"].Value = this._cuv_rlatitud;

		cmd.Parameters["@cuv_rlongitud"].Value = this._cuv_rlongitud;

		cmd.Parameters["@cuv_iTodosLosEventos"].Value = this._cuv_iTodosLosEventos;

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
    throw new RuntimeException("The m_cuentas_video is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_cuentas_videoDel", conn))
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
    using(var CmdSel = new SqlCommand("m_cuentas_videoSel", conn))
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
    Simplem_cuentas_video Simple = new Simplem_cuentas_video();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cuv_iidcuenta = this._cuv_iidcuenta;

      Simple.cuv_clink = this._cuv_clink;

      Simple.cuv_meventos = this._cuv_meventos;

      Simple.cuv_clinkdss = this._cuv_clinkdss;

      Simple.cuv_ivideoid = this._cuv_ivideoid;

      Simple.cuv_rlatitud = this._cuv_rlatitud;

      Simple.cuv_rlongitud = this._cuv_rlongitud;

      Simple.cuv_iTodosLosEventos = this._cuv_iTodosLosEventos;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_cuentas_video)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cuv_iidcuenta = Simple.cuv_iidcuenta;

      this._cuv_clink = Simple.cuv_clink;

      this._cuv_meventos = Simple.cuv_meventos;

      this._cuv_clinkdss = Simple.cuv_clinkdss;

      this._cuv_ivideoid = Simple.cuv_ivideoid;

      this._cuv_rlatitud = Simple.cuv_rlatitud;

      this._cuv_rlongitud = Simple.cuv_rlongitud;

      this._cuv_iTodosLosEventos = Simple.cuv_iTodosLosEventos;

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
    Callerm_cuentas_video Caller = new Callerm_cuentas_video();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cuv_iidcuenta = this._cuv_iidcuenta;

      Caller.cuv_clink = this._cuv_clink;

      Caller.cuv_meventos = this._cuv_meventos;

      Caller.cuv_clinkdss = this._cuv_clinkdss;

      Caller.cuv_ivideoid = this._cuv_ivideoid;

      Caller.cuv_rlatitud = this._cuv_rlatitud;

      Caller.cuv_rlongitud = this._cuv_rlongitud;

      Caller.cuv_iTodosLosEventos = this._cuv_iTodosLosEventos;

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
    
      dt.Columns.Add(new DataColumn("cuv_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cuv_clink", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cuv_meventos", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cuv_clinkdss", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cuv_ivideoid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cuv_rlatitud", typeof (Single)));
    
      dt.Columns.Add(new DataColumn("cuv_rlongitud", typeof (Single)));
    
      dt.Columns.Add(new DataColumn("cuv_iTodosLosEventos", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cuv_iidcuenta"] = this._cuv_iidcuenta;

      dr["cuv_clink"] = this._cuv_clink;

      dr["cuv_meventos"] = this._cuv_meventos;

      dr["cuv_clinkdss"] = this._cuv_clinkdss;

      dr["cuv_ivideoid"] = this._cuv_ivideoid;

      dr["cuv_rlatitud"] = this._cuv_rlatitud;

      dr["cuv_rlongitud"] = this._cuv_rlongitud;

      dr["cuv_iTodosLosEventos"] = this._cuv_iTodosLosEventos;

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
    using(var CmdChilds = new SqlCommand("m_cuentas_videoByChildObject", conn))
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
    Simplem_cuentas_video Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_cuentas_videoByChildObject", conn))
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
    Simple = new Simplem_cuentas_video();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cuv_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cuv_clink = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cuv_meventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cuv_clinkdss = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cuv_ivideoid = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cuv_rlatitud = (Reader.IsDBNull(7)) ? new Single() : (Single)Reader.GetValue(7);
if (Reader.FieldCount > 8)Simple.cuv_rlongitud = (Reader.IsDBNull(8)) ? new Single() : (Single)Reader.GetValue(8);
if (Reader.FieldCount > 9)Simple.cuv_iTodosLosEventos = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);


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
    Simplem_cuentas_video Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_cuentas_video();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cuv_iidcuenta = (Row["cuv_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["cuv_iidcuenta"];

Simple.cuv_clink = (Row["cuv_clink"] == DBNull.Value) ? "" : (string) Row["cuv_clink"];

Simple.cuv_meventos = (Row["cuv_meventos"] == DBNull.Value) ? "" : (string) Row["cuv_meventos"];

Simple.cuv_clinkdss = (Row["cuv_clinkdss"] == DBNull.Value) ? "" : (string) Row["cuv_clinkdss"];

Simple.cuv_ivideoid = (Row["cuv_ivideoid"] == DBNull.Value) ? 0 : (int) Row["cuv_ivideoid"];

Simple.cuv_rlatitud = (Row["cuv_rlatitud"] == DBNull.Value) ? new Single() : (Single) Row["cuv_rlatitud"];

Simple.cuv_rlongitud = (Row["cuv_rlongitud"] == DBNull.Value) ? new Single() : (Single) Row["cuv_rlongitud"];

Simple.cuv_iTodosLosEventos = (Row["cuv_iTodosLosEventos"] == DBNull.Value) ? 0 : (int) Row["cuv_iTodosLosEventos"];


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
    using(var CmdParents = new SqlCommand("m_cuentas_videoByParentObject", conn))
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
    Simplem_cuentas_video Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_cuentas_videoByParentObject", conn))
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
    Simple = new Simplem_cuentas_video();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cuv_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cuv_clink = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cuv_meventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cuv_clinkdss = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cuv_ivideoid = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cuv_rlatitud = (Reader.IsDBNull(7)) ? new Single() : (Single)Reader.GetValue(7);
if (Reader.FieldCount > 8)Simple.cuv_rlongitud = (Reader.IsDBNull(8)) ? new Single() : (Single)Reader.GetValue(8);
if (Reader.FieldCount > 9)Simple.cuv_iTodosLosEventos = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);


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
    using (var CmdDataByName = new SqlCommand("m_cuentas_videoByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_cuentas_videoByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_cuentas_videoByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_cuentas_videoByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_cuentas_videoByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_cuentas_video Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_cuentas_videoBySimplem_cuentas_video", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@cuv_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cuv_clink", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@cuv_meventos", SqlDbType.Text));cmd.Parameters.Add(new SqlParameter("@cuv_clinkdss", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cuv_ivideoid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cuv_rlatitud", SqlDbType.Real));cmd.Parameters.Add(new SqlParameter("@cuv_rlongitud", SqlDbType.Real));cmd.Parameters.Add(new SqlParameter("@cuv_iTodosLosEventos", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cuv_iidcuenta"].Value = this._cuv_iidcuenta;

		cmd.Parameters["@cuv_clink"].Value = (this._cuv_clink == null) ? (object) DBNull.Value : (object) this._cuv_clink;

		cmd.Parameters["@cuv_meventos"].Value = (this._cuv_meventos == null) ? (object) DBNull.Value : (object) this._cuv_meventos;

		cmd.Parameters["@cuv_clinkdss"].Value = (this._cuv_clinkdss == null) ? (object) DBNull.Value : (object) this._cuv_clinkdss;

		cmd.Parameters["@cuv_ivideoid"].Value = this._cuv_ivideoid;

		cmd.Parameters["@cuv_rlatitud"].Value = this._cuv_rlatitud;

		cmd.Parameters["@cuv_rlongitud"].Value = this._cuv_rlongitud;

		cmd.Parameters["@cuv_iTodosLosEventos"].Value = this._cuv_iTodosLosEventos;


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
		 
		public IEnumerable<Simplem_cuentas_video> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_cuentas_videoByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_cuentas_video Simple = new Simplem_cuentas_video();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cuv_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cuv_clink = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cuv_meventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cuv_clinkdss = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cuv_ivideoid = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cuv_rlatitud = (Reader.IsDBNull(7)) ? new Single() : (Single)Reader.GetValue(7);
if (Reader.FieldCount > 8)Simple.cuv_rlongitud = (Reader.IsDBNull(8)) ? new Single() : (Single)Reader.GetValue(8);
if (Reader.FieldCount > 9)Simple.cuv_iTodosLosEventos = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_cuentas_video> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_cuentas_videoByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_cuentas_video Simple = new Simplem_cuentas_video();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cuv_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cuv_clink = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cuv_meventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cuv_clinkdss = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cuv_ivideoid = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cuv_rlatitud = (Reader.IsDBNull(7)) ? new Single() : (Single)Reader.GetValue(7);
if (Reader.FieldCount > 8)Simple.cuv_rlongitud = (Reader.IsDBNull(8)) ? new Single() : (Single)Reader.GetValue(8);
if (Reader.FieldCount > 9)Simple.cuv_iTodosLosEventos = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3109, "m_cuentas_video");
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
    if (Reader.FieldCount > 2)this._cuv_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._cuv_clink = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._cuv_meventos = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._cuv_clinkdss = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._cuv_ivideoid = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._cuv_rlatitud = (Reader.IsDBNull(7)) ? new Single() : (Single)Reader.GetValue(7);
if (Reader.FieldCount > 8)this._cuv_rlongitud = (Reader.IsDBNull(8)) ? new Single() : (Single)Reader.GetValue(8);
if (Reader.FieldCount > 9)this._cuv_iTodosLosEventos = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);

    }
    Reader.Close();
    }
   }
  
    }
  