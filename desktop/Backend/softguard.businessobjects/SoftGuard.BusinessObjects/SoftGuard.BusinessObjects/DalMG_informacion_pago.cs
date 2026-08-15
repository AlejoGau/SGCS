
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
     ///MG_informacion_pago data access layer   
     ///</summary>
    public class DalMG_informacion_pago : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _mip_fpgidkey;
    
      private int _mip_idcliente;
    
      private string _mip_codigo;
    
      private DateTime? _mip_fechadesde;
    
      private DateTime? _mip_fechahasta;
    
      private int _mip_emisor;
    
      private string _mip_clave;
    
      private string _mip_nombreusuario;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///mip_fpgidkey   
     ///</summary>
      public int mip_fpgidkey
      {
      
          get{ return this._mip_fpgidkey; }
          set{ this._mip_fpgidkey = value; }
        
      }
     ///<summary>
     ///mip_idcliente   
     ///</summary>
      public int mip_idcliente
      {
      
          get{ return this._mip_idcliente; }
          set{ this._mip_idcliente = value; }
        
      }
     ///<summary>
     ///mip_codigo   
     ///</summary>
      public string mip_codigo
      {
      
          get{ return this._mip_codigo; }
          set{ this._mip_codigo = value; }
        
      }
     ///<summary>
     ///mip_fechadesde   
     ///</summary>
      public DateTime? mip_fechadesde
      {
      
          get{ return this._mip_fechadesde; }
          set{ this._mip_fechadesde = value; }
        
      }
     ///<summary>
     ///mip_fechahasta   
     ///</summary>
      public DateTime? mip_fechahasta
      {
      
          get{ return this._mip_fechahasta; }
          set{ this._mip_fechahasta = value; }
        
      }
     ///<summary>
     ///mip_emisor   
     ///</summary>
      public int mip_emisor
      {
      
          get{ return this._mip_emisor; }
          set{ this._mip_emisor = value; }
        
      }
     ///<summary>
     ///mip_clave   
     ///</summary>
      public string mip_clave
      {
      
          get{ return this._mip_clave; }
          set{ this._mip_clave = value; }
        
      }
     ///<summary>
     ///mip_nombreusuario   
     ///</summary>
      public string mip_nombreusuario
      {
      
          get{ return this._mip_nombreusuario; }
          set{ this._mip_nombreusuario = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalMG_informacion_pago(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalMG_informacion_pago(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalMG_informacion_pago(SqlHelper SqlConfig, int UserId, SimpleMG_informacion_pago Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._mip_fpgidkey = Simple.mip_fpgidkey;

      this._mip_idcliente = Simple.mip_idcliente;

      this._mip_codigo = Simple.mip_codigo;

      this._mip_fechadesde = Simple.mip_fechadesde;

      this._mip_fechahasta = Simple.mip_fechahasta;

      this._mip_emisor = Simple.mip_emisor;

      this._mip_clave = Simple.mip_clave;

      this._mip_nombreusuario = Simple.mip_nombreusuario;

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
    using(var cmd = new SqlCommand("MG_informacion_pagoIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mip_fpgidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_idcliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mip_fechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mip_fechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mip_emisor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_clave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mip_nombreusuario", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@mip_fpgidkey"].Value = this._mip_fpgidkey;

		cmd.Parameters["@mip_idcliente"].Value = this._mip_idcliente;

		cmd.Parameters["@mip_codigo"].Value = (this._mip_codigo == null) ? (object) DBNull.Value : (object) this._mip_codigo;

		cmd.Parameters["@mip_fechadesde"].Value = (this._mip_fechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mip_fechadesde;

		cmd.Parameters["@mip_fechahasta"].Value = (this._mip_fechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mip_fechahasta;

		cmd.Parameters["@mip_emisor"].Value = this._mip_emisor;

		cmd.Parameters["@mip_clave"].Value = (this._mip_clave == null) ? (object) DBNull.Value : (object) this._mip_clave;

		cmd.Parameters["@mip_nombreusuario"].Value = (this._mip_nombreusuario == null) ? (object) DBNull.Value : (object) this._mip_nombreusuario;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("MG_informacion_pagoUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mip_fpgidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_idcliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mip_fechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mip_fechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mip_emisor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_clave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mip_nombreusuario", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@mip_fpgidkey"].Value = this._mip_fpgidkey;

		cmd.Parameters["@mip_idcliente"].Value = this._mip_idcliente;

		cmd.Parameters["@mip_codigo"].Value = (this._mip_codigo == null) ? (object) DBNull.Value : (object) this._mip_codigo;

		cmd.Parameters["@mip_fechadesde"].Value = (this._mip_fechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mip_fechadesde;

		cmd.Parameters["@mip_fechahasta"].Value = (this._mip_fechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mip_fechahasta;

		cmd.Parameters["@mip_emisor"].Value = this._mip_emisor;

		cmd.Parameters["@mip_clave"].Value = (this._mip_clave == null) ? (object) DBNull.Value : (object) this._mip_clave;

		cmd.Parameters["@mip_nombreusuario"].Value = (this._mip_nombreusuario == null) ? (object) DBNull.Value : (object) this._mip_nombreusuario;

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
    throw new RuntimeException("The MG_informacion_pago is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("MG_informacion_pagoDel", conn))
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
    using(var CmdSel = new SqlCommand("MG_informacion_pagoSel", conn))
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
    SimpleMG_informacion_pago Simple = new SimpleMG_informacion_pago();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.mip_fpgidkey = this._mip_fpgidkey;

      Simple.mip_idcliente = this._mip_idcliente;

      Simple.mip_codigo = this._mip_codigo;

      Simple.mip_fechadesde = this._mip_fechadesde;

      Simple.mip_fechahasta = this._mip_fechahasta;

      Simple.mip_emisor = this._mip_emisor;

      Simple.mip_clave = this._mip_clave;

      Simple.mip_nombreusuario = this._mip_nombreusuario;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleMG_informacion_pago)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._mip_fpgidkey = Simple.mip_fpgidkey;

      this._mip_idcliente = Simple.mip_idcliente;

      this._mip_codigo = Simple.mip_codigo;

      this._mip_fechadesde = Simple.mip_fechadesde;

      this._mip_fechahasta = Simple.mip_fechahasta;

      this._mip_emisor = Simple.mip_emisor;

      this._mip_clave = Simple.mip_clave;

      this._mip_nombreusuario = Simple.mip_nombreusuario;

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
    CallerMG_informacion_pago Caller = new CallerMG_informacion_pago();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.mip_fpgidkey = this._mip_fpgidkey;

      Caller.mip_idcliente = this._mip_idcliente;

      Caller.mip_codigo = this._mip_codigo;

      Caller.mip_fechadesde = this._mip_fechadesde;

      Caller.mip_fechahasta = this._mip_fechahasta;

      Caller.mip_emisor = this._mip_emisor;

      Caller.mip_clave = this._mip_clave;

      Caller.mip_nombreusuario = this._mip_nombreusuario;

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
    
      dt.Columns.Add(new DataColumn("mip_fpgidkey", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mip_idcliente", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mip_codigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mip_fechadesde", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("mip_fechahasta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("mip_emisor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mip_clave", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mip_nombreusuario", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["mip_fpgidkey"] = this._mip_fpgidkey;

      dr["mip_idcliente"] = this._mip_idcliente;

      dr["mip_codigo"] = this._mip_codigo;

      dr["mip_fechadesde"] = (object)this._mip_fechadesde  ?? DBNull.Value;

      dr["mip_fechahasta"] = (object)this._mip_fechahasta  ?? DBNull.Value;

      dr["mip_emisor"] = this._mip_emisor;

      dr["mip_clave"] = this._mip_clave;

      dr["mip_nombreusuario"] = this._mip_nombreusuario;

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
    using(var CmdChilds = new SqlCommand("MG_informacion_pagoByChildObject", conn))
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
    SimpleMG_informacion_pago Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("MG_informacion_pagoByChildObject", conn))
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
    Simple = new SimpleMG_informacion_pago();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mip_fpgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mip_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.mip_codigo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mip_fechadesde = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.mip_fechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mip_emisor = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mip_clave = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mip_nombreusuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    SimpleMG_informacion_pago Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleMG_informacion_pago();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.mip_fpgidkey = (Row["mip_fpgidkey"] == DBNull.Value) ? 0 : (int) Row["mip_fpgidkey"];

Simple.mip_idcliente = (Row["mip_idcliente"] == DBNull.Value) ? 0 : (int) Row["mip_idcliente"];

Simple.mip_codigo = (Row["mip_codigo"] == DBNull.Value) ? "" : (string) Row["mip_codigo"];

Simple.mip_fechadesde = (Row["mip_fechadesde"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["mip_fechadesde"];

Simple.mip_fechahasta = (Row["mip_fechahasta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["mip_fechahasta"];

Simple.mip_emisor = (Row["mip_emisor"] == DBNull.Value) ? 0 : (int) Row["mip_emisor"];

Simple.mip_clave = (Row["mip_clave"] == DBNull.Value) ? "" : (string) Row["mip_clave"];

Simple.mip_nombreusuario = (Row["mip_nombreusuario"] == DBNull.Value) ? "" : (string) Row["mip_nombreusuario"];


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
    using(var CmdParents = new SqlCommand("MG_informacion_pagoByParentObject", conn))
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
    SimpleMG_informacion_pago Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("MG_informacion_pagoByParentObject", conn))
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
    Simple = new SimpleMG_informacion_pago();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mip_fpgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mip_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.mip_codigo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mip_fechadesde = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.mip_fechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mip_emisor = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mip_clave = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mip_nombreusuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    using (var CmdDataByName = new SqlCommand("MG_informacion_pagoByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("MG_informacion_pagoByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("MG_informacion_pagoByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("MG_informacion_pagoByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("MG_informacion_pagoByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleMG_informacion_pago Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("MG_informacion_pagoBySimpleMG_informacion_pago", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mip_fpgidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_idcliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_codigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mip_fechadesde", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mip_fechahasta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mip_emisor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mip_clave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mip_nombreusuario", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@mip_fpgidkey"].Value = this._mip_fpgidkey;

		cmd.Parameters["@mip_idcliente"].Value = this._mip_idcliente;

		cmd.Parameters["@mip_codigo"].Value = (this._mip_codigo == null) ? (object) DBNull.Value : (object) this._mip_codigo;

		cmd.Parameters["@mip_fechadesde"].Value = (this._mip_fechadesde == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mip_fechadesde;

		cmd.Parameters["@mip_fechahasta"].Value = (this._mip_fechahasta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mip_fechahasta;

		cmd.Parameters["@mip_emisor"].Value = this._mip_emisor;

		cmd.Parameters["@mip_clave"].Value = (this._mip_clave == null) ? (object) DBNull.Value : (object) this._mip_clave;

		cmd.Parameters["@mip_nombreusuario"].Value = (this._mip_nombreusuario == null) ? (object) DBNull.Value : (object) this._mip_nombreusuario;


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
		 
		public IEnumerable<SimpleMG_informacion_pago> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("MG_informacion_pagoByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleMG_informacion_pago Simple = new SimpleMG_informacion_pago();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mip_fpgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mip_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.mip_codigo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mip_fechadesde = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.mip_fechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mip_emisor = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mip_clave = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mip_nombreusuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleMG_informacion_pago> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("MG_informacion_pagoByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleMG_informacion_pago Simple = new SimpleMG_informacion_pago();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mip_fpgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mip_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.mip_codigo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mip_fechadesde = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.mip_fechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mip_emisor = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mip_clave = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mip_nombreusuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3221, "MG_informacion_pago");
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
    if (Reader.FieldCount > 2)this._mip_fpgidkey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._mip_idcliente = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._mip_codigo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._mip_fechadesde = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)this._mip_fechahasta = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._mip_emisor = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._mip_clave = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._mip_nombreusuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    }
    Reader.Close();
    }
   }
  
    }
  