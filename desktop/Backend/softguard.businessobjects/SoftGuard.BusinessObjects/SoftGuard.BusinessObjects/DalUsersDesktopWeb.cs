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
     ///UsersDesktopWeb data access layer   
     ///</summary>
    public class DalUsersDesktopWeb : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _udw_idKey;
    
      private string _udw_usuario;
    
      private string _udw_clave;
    
      private string _udw_nombre;
    
      private string _udw_apellido;
    
      private string _udw_empresa;
    
      private int _udw_tipo;
    
      private int _udw_iperfil;
    
      private Decimal _udw_estado;
    
      private string _udw_metadata;
    
      private int _udw_iloginfallido;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///udw_idKey   
     ///</summary>
      public int udw_idKey
      {
      
          get{ return this._udw_idKey; }
          set{ this._udw_idKey = value; }
        
      }
     ///<summary>
     ///udw_usuario   
     ///</summary>
      public string udw_usuario
      {
      
          get{ return this._udw_usuario; }
          set{ this._udw_usuario = value; }
        
      }
     ///<summary>
     ///udw_clave   
     ///</summary>
      public string udw_clave
      {
      
          get{ return this._udw_clave; }
          set{ this._udw_clave = value; }
        
      }
     ///<summary>
     ///udw_nombre   
     ///</summary>
      public string udw_nombre
      {
      
          get{ return this._udw_nombre; }
          set{ this._udw_nombre = value; }
        
      }
     ///<summary>
     ///udw_apellido   
     ///</summary>
      public string udw_apellido
      {
      
          get{ return this._udw_apellido; }
          set{ this._udw_apellido = value; }
        
      }
     ///<summary>
     ///udw_empresa   
     ///</summary>
      public string udw_empresa
      {
      
          get{ return this._udw_empresa; }
          set{ this._udw_empresa = value; }
        
      }
     ///<summary>
     ///udw_tipo   
     ///</summary>
      public int udw_tipo
      {
      
          get{ return this._udw_tipo; }
          set{ this._udw_tipo = value; }
        
      }
     ///<summary>
     ///udw_iperfil   
     ///</summary>
      public int udw_iperfil
      {
      
          get{ return this._udw_iperfil; }
          set{ this._udw_iperfil = value; }
        
      }
     ///<summary>
     ///udw_estado   
     ///</summary>
      public Decimal udw_estado
      {
      
          get{ return this._udw_estado; }
          set{ this._udw_estado = value; }
        
      }
     ///<summary>
     ///udw_metadata   
     ///</summary>
      public string udw_metadata
      {
      
          get{ return this._udw_metadata; }
          set{ this._udw_metadata = value; }
        
      }
     ///<summary>
     ///udw_iloginfallido   
     ///</summary>
      public int udw_iloginfallido
      {
      
          get{ return this._udw_iloginfallido; }
          set{ this._udw_iloginfallido = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalUsersDesktopWeb(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalUsersDesktopWeb(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalUsersDesktopWeb(SqlHelper SqlConfig, int UserId, SimpleUsersDesktopWeb Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._udw_idKey = Simple.udw_idKey;

      this._udw_usuario = Simple.udw_usuario;

      this._udw_clave = Simple.udw_clave;

      this._udw_nombre = Simple.udw_nombre;

      this._udw_apellido = Simple.udw_apellido;

      this._udw_empresa = Simple.udw_empresa;

      this._udw_tipo = Simple.udw_tipo;

      this._udw_iperfil = Simple.udw_iperfil;

      this._udw_estado = Simple.udw_estado;

      this._udw_metadata = Simple.udw_metadata;

      this._udw_iloginfallido = Simple.udw_iloginfallido;

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
    using(var cmd = new SqlCommand("UsersDesktopWebIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@udw_idKey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_usuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_clave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_apellido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_empresa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_tipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_iperfil", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_estado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@udw_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_iloginfallido", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@udw_idKey"].Value = this._udw_idKey;

		cmd.Parameters["@udw_usuario"].Value = (this._udw_usuario == null) ? (object) DBNull.Value : (object) this._udw_usuario;

		cmd.Parameters["@udw_clave"].Value = (this._udw_clave == null) ? (object) DBNull.Value : (object) this._udw_clave;

		cmd.Parameters["@udw_nombre"].Value = (this._udw_nombre == null) ? (object) DBNull.Value : (object) this._udw_nombre;

		cmd.Parameters["@udw_apellido"].Value = (this._udw_apellido == null) ? (object) DBNull.Value : (object) this._udw_apellido;

		cmd.Parameters["@udw_empresa"].Value = (this._udw_empresa == null) ? (object) DBNull.Value : (object) this._udw_empresa;

		cmd.Parameters["@udw_tipo"].Value = this._udw_tipo;

		cmd.Parameters["@udw_iperfil"].Value = this._udw_iperfil;

		cmd.Parameters["@udw_estado"].Value = this._udw_estado;

		cmd.Parameters["@udw_metadata"].Value = (this._udw_metadata == null) ? (object) DBNull.Value : (object) this._udw_metadata;

		cmd.Parameters["@udw_iloginfallido"].Value = this._udw_iloginfallido;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("UsersDesktopWebUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@udw_idKey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_usuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_clave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_apellido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_empresa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_tipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_iperfil", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_estado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@udw_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_iloginfallido", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@udw_idKey"].Value = this._udw_idKey;

		cmd.Parameters["@udw_usuario"].Value = (this._udw_usuario == null) ? (object) DBNull.Value : (object) this._udw_usuario;

		cmd.Parameters["@udw_clave"].Value = (this._udw_clave == null) ? (object) DBNull.Value : (object) this._udw_clave;

		cmd.Parameters["@udw_nombre"].Value = (this._udw_nombre == null) ? (object) DBNull.Value : (object) this._udw_nombre;

		cmd.Parameters["@udw_apellido"].Value = (this._udw_apellido == null) ? (object) DBNull.Value : (object) this._udw_apellido;

		cmd.Parameters["@udw_empresa"].Value = (this._udw_empresa == null) ? (object) DBNull.Value : (object) this._udw_empresa;

		cmd.Parameters["@udw_tipo"].Value = this._udw_tipo;

		cmd.Parameters["@udw_iperfil"].Value = this._udw_iperfil;

		cmd.Parameters["@udw_estado"].Value = this._udw_estado;

		cmd.Parameters["@udw_metadata"].Value = (this._udw_metadata == null) ? (object) DBNull.Value : (object) this._udw_metadata;

		cmd.Parameters["@udw_iloginfallido"].Value = this._udw_iloginfallido;

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
    throw new RuntimeException("The UsersDesktopWeb is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("UsersDesktopWebDel", conn))
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
    using(var CmdSel = new SqlCommand("UsersDesktopWebSel", conn))
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
    SimpleUsersDesktopWeb Simple = new SimpleUsersDesktopWeb();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.udw_idKey = this._udw_idKey;

      Simple.udw_usuario = this._udw_usuario;

      Simple.udw_clave = this._udw_clave;

      Simple.udw_nombre = this._udw_nombre;

      Simple.udw_apellido = this._udw_apellido;

      Simple.udw_empresa = this._udw_empresa;

      Simple.udw_tipo = this._udw_tipo;

      Simple.udw_iperfil = this._udw_iperfil;

      Simple.udw_estado = this._udw_estado;

      Simple.udw_metadata = this._udw_metadata;

      Simple.udw_iloginfallido = this._udw_iloginfallido;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleUsersDesktopWeb)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._udw_idKey = Simple.udw_idKey;

      this._udw_usuario = Simple.udw_usuario;

      this._udw_clave = Simple.udw_clave;

      this._udw_nombre = Simple.udw_nombre;

      this._udw_apellido = Simple.udw_apellido;

      this._udw_empresa = Simple.udw_empresa;

      this._udw_tipo = Simple.udw_tipo;

      this._udw_iperfil = Simple.udw_iperfil;

      this._udw_estado = Simple.udw_estado;

      this._udw_metadata = Simple.udw_metadata;

      this._udw_iloginfallido = Simple.udw_iloginfallido;

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
    CallerUsersDesktopWeb Caller = new CallerUsersDesktopWeb();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.udw_idKey = this._udw_idKey;

      Caller.udw_usuario = this._udw_usuario;

      Caller.udw_clave = this._udw_clave;

      Caller.udw_nombre = this._udw_nombre;

      Caller.udw_apellido = this._udw_apellido;

      Caller.udw_empresa = this._udw_empresa;

      Caller.udw_tipo = this._udw_tipo;

      Caller.udw_iperfil = this._udw_iperfil;

      Caller.udw_estado = this._udw_estado;

      Caller.udw_metadata = this._udw_metadata;

      Caller.udw_iloginfallido = this._udw_iloginfallido;

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
    
      dt.Columns.Add(new DataColumn("udw_idKey", typeof (int)));
    
      dt.Columns.Add(new DataColumn("udw_usuario", typeof (string)));
    
      dt.Columns.Add(new DataColumn("udw_clave", typeof (string)));
    
      dt.Columns.Add(new DataColumn("udw_nombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("udw_apellido", typeof (string)));
    
      dt.Columns.Add(new DataColumn("udw_empresa", typeof (string)));
    
      dt.Columns.Add(new DataColumn("udw_tipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("udw_iperfil", typeof (int)));
    
      dt.Columns.Add(new DataColumn("udw_estado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("udw_metadata", typeof (string)));
    
      dt.Columns.Add(new DataColumn("udw_iloginfallido", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["udw_idKey"] = this._udw_idKey;

      dr["udw_usuario"] = this._udw_usuario;

      dr["udw_clave"] = this._udw_clave;

      dr["udw_nombre"] = this._udw_nombre;

      dr["udw_apellido"] = this._udw_apellido;

      dr["udw_empresa"] = this._udw_empresa;

      dr["udw_tipo"] = this._udw_tipo;

      dr["udw_iperfil"] = this._udw_iperfil;

      dr["udw_estado"] = this._udw_estado;

      dr["udw_metadata"] = this._udw_metadata;

      dr["udw_iloginfallido"] = this._udw_iloginfallido;

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
    using(var CmdChilds = new SqlCommand("UsersDesktopWebByChildObject", conn))
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
    SimpleUsersDesktopWeb Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("UsersDesktopWebByChildObject", conn))
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
    Simple = new SimpleUsersDesktopWeb();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.udw_idKey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.udw_usuario = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.udw_clave = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.udw_nombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.udw_apellido = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.udw_empresa = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.udw_tipo = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.udw_iperfil = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.udw_estado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.udw_metadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.udw_iloginfallido = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    SimpleUsersDesktopWeb Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleUsersDesktopWeb();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.udw_idKey = (Row["udw_idKey"] == DBNull.Value) ? 0 : (int) Row["udw_idKey"];

Simple.udw_usuario = (Row["udw_usuario"] == DBNull.Value) ? "" : (string) Row["udw_usuario"];

Simple.udw_clave = (Row["udw_clave"] == DBNull.Value) ? "" : (string) Row["udw_clave"];

Simple.udw_nombre = (Row["udw_nombre"] == DBNull.Value) ? "" : (string) Row["udw_nombre"];

Simple.udw_apellido = (Row["udw_apellido"] == DBNull.Value) ? "" : (string) Row["udw_apellido"];

Simple.udw_empresa = (Row["udw_empresa"] == DBNull.Value) ? "" : (string) Row["udw_empresa"];

Simple.udw_tipo = (Row["udw_tipo"] == DBNull.Value) ? 0 : (int) Row["udw_tipo"];

Simple.udw_iperfil = (Row["udw_iperfil"] == DBNull.Value) ? 0 : (int) Row["udw_iperfil"];

Simple.udw_estado = (Row["udw_estado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["udw_estado"];

Simple.udw_metadata = (Row["udw_metadata"] == DBNull.Value) ? "" : (string) Row["udw_metadata"];

Simple.udw_iloginfallido = (Row["udw_iloginfallido"] == DBNull.Value) ? 0 : (int) Row["udw_iloginfallido"];


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
    using(var CmdParents = new SqlCommand("UsersDesktopWebByParentObject", conn))
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
    SimpleUsersDesktopWeb Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("UsersDesktopWebByParentObject", conn))
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
    Simple = new SimpleUsersDesktopWeb();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.udw_idKey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.udw_usuario = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.udw_clave = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.udw_nombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.udw_apellido = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.udw_empresa = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.udw_tipo = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.udw_iperfil = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.udw_estado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.udw_metadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.udw_iloginfallido = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    using (var CmdDataByName = new SqlCommand("UsersDesktopWebByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("UsersDesktopWebByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("UsersDesktopWebByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("UsersDesktopWebByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("UsersDesktopWebByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleUsersDesktopWeb Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("UsersDesktopWebBySimpleUsersDesktopWeb", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@udw_idKey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_usuario", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_clave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_apellido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_empresa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_tipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_iperfil", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@udw_estado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@udw_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@udw_iloginfallido", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@udw_idKey"].Value = this._udw_idKey;

		cmd.Parameters["@udw_usuario"].Value = (this._udw_usuario == null) ? (object) DBNull.Value : (object) this._udw_usuario;

		cmd.Parameters["@udw_clave"].Value = (this._udw_clave == null) ? (object) DBNull.Value : (object) this._udw_clave;

		cmd.Parameters["@udw_nombre"].Value = (this._udw_nombre == null) ? (object) DBNull.Value : (object) this._udw_nombre;

		cmd.Parameters["@udw_apellido"].Value = (this._udw_apellido == null) ? (object) DBNull.Value : (object) this._udw_apellido;

		cmd.Parameters["@udw_empresa"].Value = (this._udw_empresa == null) ? (object) DBNull.Value : (object) this._udw_empresa;

		cmd.Parameters["@udw_tipo"].Value = this._udw_tipo;

		cmd.Parameters["@udw_iperfil"].Value = this._udw_iperfil;

		cmd.Parameters["@udw_estado"].Value = this._udw_estado;

		cmd.Parameters["@udw_metadata"].Value = (this._udw_metadata == null) ? (object) DBNull.Value : (object) this._udw_metadata;

		cmd.Parameters["@udw_iloginfallido"].Value = this._udw_iloginfallido;


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
		 
		public IEnumerable<SimpleUsersDesktopWeb> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("UsersDesktopWebByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleUsersDesktopWeb Simple = new SimpleUsersDesktopWeb();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.udw_idKey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.udw_usuario = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.udw_clave = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.udw_nombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.udw_apellido = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.udw_empresa = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.udw_tipo = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.udw_iperfil = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.udw_estado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.udw_metadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.udw_iloginfallido = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleUsersDesktopWeb> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("UsersDesktopWebByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleUsersDesktopWeb Simple = new SimpleUsersDesktopWeb();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.udw_idKey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.udw_usuario = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.udw_clave = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.udw_nombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.udw_apellido = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.udw_empresa = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.udw_tipo = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.udw_iperfil = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.udw_estado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.udw_metadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.udw_iloginfallido = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3050, "UsersDesktopWeb");
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
    if (Reader.FieldCount > 2)this._udw_idKey = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._udw_usuario = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._udw_clave = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._udw_nombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._udw_apellido = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._udw_empresa = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._udw_tipo = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._udw_iperfil = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._udw_estado = (Reader.IsDBNull(10)) ? new Decimal(10) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)this._udw_metadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._udw_iloginfallido = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    }
    Reader.Close();
    }
   }
  
    }
  