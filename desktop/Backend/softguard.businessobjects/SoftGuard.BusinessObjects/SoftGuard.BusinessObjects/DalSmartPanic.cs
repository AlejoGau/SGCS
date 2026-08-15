
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
     ///SmartPanic data access layer   
     ///</summary>
    public class DalSmartPanic : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _Telefono;
    
      private string _Imei;
    
      private string _Modelo;
    
      private string _Marca;
    
      private string _Version;
    
      private string _Tipo;
    
      private int _CuentaId;
    
      private string _Nombre;
    
      private string _Config;
    
      private int _GrupoId;
    
      private string _Linea;
    
      private int _awccUserId;
    
      private string _pushToken;
    
      private string _AppVersion;
    
      private int _AppType;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///Telefono   
     ///</summary>
      public string Telefono
      {
      
          get{ return this._Telefono; }
          set{ this._Telefono = value; }
        
      }
     ///<summary>
     ///Imei   
     ///</summary>
      public string Imei
      {
      
          get{ return this._Imei; }
          set{ this._Imei = value; }
        
      }
     ///<summary>
     ///Modelo   
     ///</summary>
      public string Modelo
      {
      
          get{ return this._Modelo; }
          set{ this._Modelo = value; }
        
      }
     ///<summary>
     ///Marca   
     ///</summary>
      public string Marca
      {
      
          get{ return this._Marca; }
          set{ this._Marca = value; }
        
      }
     ///<summary>
     ///Version   
     ///</summary>
      public string Version
      {
      
          get{ return this._Version; }
          set{ this._Version = value; }
        
      }
     ///<summary>
     ///Tipo   
     ///</summary>
      public string Tipo
      {
      
          get{ return this._Tipo; }
          set{ this._Tipo = value; }
        
      }
     ///<summary>
     ///CuentaId   
     ///</summary>
      public int CuentaId
      {
      
          get{ return this._CuentaId; }
          set{ this._CuentaId = value; }
        
      }
     ///<summary>
     ///Nombre   
     ///</summary>
      public string Nombre
      {
      
          get{ return this._Nombre; }
          set{ this._Nombre = value; }
        
      }
     ///<summary>
     ///Config   
     ///</summary>
      public string Config
      {
      
          get{ return this._Config; }
          set{ this._Config = value; }
        
      }
     ///<summary>
     ///GrupoId   
     ///</summary>
      public int GrupoId
      {
      
          get{ return this._GrupoId; }
          set{ this._GrupoId = value; }
        
      }
     ///<summary>
     ///Linea   
     ///</summary>
      public string Linea
      {
      
          get{ return this._Linea; }
          set{ this._Linea = value; }
        
      }
     ///<summary>
     ///awccUserId   
     ///</summary>
      public int awccUserId
      {
      
          get{ return this._awccUserId; }
          set{ this._awccUserId = value; }
        
      }
     ///<summary>
     ///pushToken   
     ///</summary>
      public string pushToken
      {
      
          get{ return this._pushToken; }
          set{ this._pushToken = value; }
        
      }
     ///<summary>
     ///AppVersion   
     ///</summary>
      public string AppVersion
      {
      
          get{ return this._AppVersion; }
          set{ this._AppVersion = value; }
        
      }
     ///<summary>
     ///AppType   
     ///</summary>
      public int AppType
      {
      
          get{ return this._AppType; }
          set{ this._AppType = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSmartPanic(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSmartPanic(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalSmartPanic(SqlHelper SqlConfig, int UserId, SimpleSmartPanic Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._Telefono = Simple.Telefono;

      this._Imei = Simple.Imei;

      this._Modelo = Simple.Modelo;

      this._Marca = Simple.Marca;

      this._Version = Simple.Version;

      this._Tipo = Simple.Tipo;

      this._CuentaId = Simple.CuentaId;

      this._Nombre = Simple.Nombre;

      this._Config = Simple.Config;

      this._GrupoId = Simple.GrupoId;

      this._Linea = Simple.Linea;

      this._awccUserId = Simple.awccUserId;

      this._pushToken = Simple.pushToken;

      this._AppVersion = Simple.AppVersion;

      this._AppType = Simple.AppType;

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
    using(var cmd = new SqlCommand("SmartPanicIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Telefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Imei", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Modelo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Marca", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Version", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Tipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Config", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@GrupoId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Linea", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@awccUserId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pushToken", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@AppVersion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@AppType", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@Telefono"].Value = (this._Telefono == null) ? (object) DBNull.Value : (object) this._Telefono;

		cmd.Parameters["@Imei"].Value = (this._Imei == null) ? (object) DBNull.Value : (object) this._Imei;

		cmd.Parameters["@Modelo"].Value = (this._Modelo == null) ? (object) DBNull.Value : (object) this._Modelo;

		cmd.Parameters["@Marca"].Value = (this._Marca == null) ? (object) DBNull.Value : (object) this._Marca;

		cmd.Parameters["@Version"].Value = (this._Version == null) ? (object) DBNull.Value : (object) this._Version;

		cmd.Parameters["@Tipo"].Value = (this._Tipo == null) ? (object) DBNull.Value : (object) this._Tipo;

		cmd.Parameters["@CuentaId"].Value = this._CuentaId;

		cmd.Parameters["@Nombre"].Value = (this._Nombre == null) ? (object) DBNull.Value : (object) this._Nombre;

		cmd.Parameters["@Config"].Value = (this._Config == null) ? (object) DBNull.Value : (object) this._Config;

		cmd.Parameters["@GrupoId"].Value = this._GrupoId;

		cmd.Parameters["@Linea"].Value = (this._Linea == null) ? (object) DBNull.Value : (object) this._Linea;

		cmd.Parameters["@awccUserId"].Value = this._awccUserId;

		cmd.Parameters["@pushToken"].Value = (this._pushToken == null) ? (object) DBNull.Value : (object) this._pushToken;

		cmd.Parameters["@AppVersion"].Value = (this._AppVersion == null) ? (object) DBNull.Value : (object) this._AppVersion;

		cmd.Parameters["@AppType"].Value = this._AppType;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SmartPanicUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Telefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Imei", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Modelo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Marca", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Version", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Tipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Config", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@GrupoId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Linea", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@awccUserId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pushToken", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@AppVersion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@AppType", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@Telefono"].Value = (this._Telefono == null) ? (object) DBNull.Value : (object) this._Telefono;

		cmd.Parameters["@Imei"].Value = (this._Imei == null) ? (object) DBNull.Value : (object) this._Imei;

		cmd.Parameters["@Modelo"].Value = (this._Modelo == null) ? (object) DBNull.Value : (object) this._Modelo;

		cmd.Parameters["@Marca"].Value = (this._Marca == null) ? (object) DBNull.Value : (object) this._Marca;

		cmd.Parameters["@Version"].Value = (this._Version == null) ? (object) DBNull.Value : (object) this._Version;

		cmd.Parameters["@Tipo"].Value = (this._Tipo == null) ? (object) DBNull.Value : (object) this._Tipo;

		cmd.Parameters["@CuentaId"].Value = this._CuentaId;

		cmd.Parameters["@Nombre"].Value = (this._Nombre == null) ? (object) DBNull.Value : (object) this._Nombre;

		cmd.Parameters["@Config"].Value = (this._Config == null) ? (object) DBNull.Value : (object) this._Config;

		cmd.Parameters["@GrupoId"].Value = this._GrupoId;

		cmd.Parameters["@Linea"].Value = (this._Linea == null) ? (object) DBNull.Value : (object) this._Linea;

		cmd.Parameters["@awccUserId"].Value = this._awccUserId;

		cmd.Parameters["@pushToken"].Value = (this._pushToken == null) ? (object) DBNull.Value : (object) this._pushToken;

		cmd.Parameters["@AppVersion"].Value = (this._AppVersion == null) ? (object) DBNull.Value : (object) this._AppVersion;

		cmd.Parameters["@AppType"].Value = this._AppType;

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
    throw new RuntimeException("The SmartPanic is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("SmartPanicDel", conn))
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
    using(var CmdSel = new SqlCommand("SmartPanicSel", conn))
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
    SimpleSmartPanic Simple = new SimpleSmartPanic();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.Telefono = this._Telefono;

      Simple.Imei = this._Imei;

      Simple.Modelo = this._Modelo;

      Simple.Marca = this._Marca;

      Simple.Version = this._Version;

      Simple.Tipo = this._Tipo;

      Simple.CuentaId = this._CuentaId;

      Simple.Nombre = this._Nombre;

      Simple.Config = this._Config;

      Simple.GrupoId = this._GrupoId;

      Simple.Linea = this._Linea;

      Simple.awccUserId = this._awccUserId;

      Simple.pushToken = this._pushToken;

      Simple.AppVersion = this._AppVersion;

      Simple.AppType = this._AppType;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleSmartPanic)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._Telefono = Simple.Telefono;

      this._Imei = Simple.Imei;

      this._Modelo = Simple.Modelo;

      this._Marca = Simple.Marca;

      this._Version = Simple.Version;

      this._Tipo = Simple.Tipo;

      this._CuentaId = Simple.CuentaId;

      this._Nombre = Simple.Nombre;

      this._Config = Simple.Config;

      this._GrupoId = Simple.GrupoId;

      this._Linea = Simple.Linea;

      this._awccUserId = Simple.awccUserId;

      this._pushToken = Simple.pushToken;

      this._AppVersion = Simple.AppVersion;

      this._AppType = Simple.AppType;

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
    CallerSmartPanic Caller = new CallerSmartPanic();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.Telefono = this._Telefono;

      Caller.Imei = this._Imei;

      Caller.Modelo = this._Modelo;

      Caller.Marca = this._Marca;

      Caller.Version = this._Version;

      Caller.Tipo = this._Tipo;

      Caller.CuentaId = this._CuentaId;

      Caller.Nombre = this._Nombre;

      Caller.Config = this._Config;

      Caller.GrupoId = this._GrupoId;

      Caller.Linea = this._Linea;

      Caller.awccUserId = this._awccUserId;

      Caller.pushToken = this._pushToken;

      Caller.AppVersion = this._AppVersion;

      Caller.AppType = this._AppType;

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
    
      dt.Columns.Add(new DataColumn("Telefono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Imei", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Modelo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Marca", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Version", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Tipo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("CuentaId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("Nombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("Config", typeof (string)));
    
      dt.Columns.Add(new DataColumn("GrupoId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("Linea", typeof (string)));
    
      dt.Columns.Add(new DataColumn("awccUserId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("pushToken", typeof (string)));
    
      dt.Columns.Add(new DataColumn("AppVersion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("AppType", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["Telefono"] = this._Telefono;

      dr["Imei"] = this._Imei;

      dr["Modelo"] = this._Modelo;

      dr["Marca"] = this._Marca;

      dr["Version"] = this._Version;

      dr["Tipo"] = this._Tipo;

      dr["CuentaId"] = this._CuentaId;

      dr["Nombre"] = this._Nombre;

      dr["Config"] = this._Config;

      dr["GrupoId"] = this._GrupoId;

      dr["Linea"] = this._Linea;

      dr["awccUserId"] = this._awccUserId;

      dr["pushToken"] = this._pushToken;

      dr["AppVersion"] = this._AppVersion;

      dr["AppType"] = this._AppType;

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
    using(var CmdChilds = new SqlCommand("SmartPanicByChildObject", conn))
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
    SimpleSmartPanic Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("SmartPanicByChildObject", conn))
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
    Simple = new SimpleSmartPanic();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Telefono = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Imei = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Modelo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Marca = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Version = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Tipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.CuentaId = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Nombre = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.Config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.GrupoId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.Linea = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.awccUserId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.pushToken = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.AppVersion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.AppType = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);


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
    SimpleSmartPanic Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleSmartPanic();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.Telefono = (Row["Telefono"] == DBNull.Value) ? "" : (string) Row["Telefono"];

Simple.Imei = (Row["Imei"] == DBNull.Value) ? "" : (string) Row["Imei"];

Simple.Modelo = (Row["Modelo"] == DBNull.Value) ? "" : (string) Row["Modelo"];

Simple.Marca = (Row["Marca"] == DBNull.Value) ? "" : (string) Row["Marca"];

Simple.Version = (Row["Version"] == DBNull.Value) ? "" : (string) Row["Version"];

Simple.Tipo = (Row["Tipo"] == DBNull.Value) ? "" : (string) Row["Tipo"];

Simple.CuentaId = (Row["CuentaId"] == DBNull.Value) ? 0 : (int) Row["CuentaId"];

Simple.Nombre = (Row["Nombre"] == DBNull.Value) ? "" : (string) Row["Nombre"];

Simple.Config = (Row["Config"] == DBNull.Value) ? "" : (string) Row["Config"];

Simple.GrupoId = (Row["GrupoId"] == DBNull.Value) ? 0 : (int) Row["GrupoId"];

Simple.Linea = (Row["Linea"] == DBNull.Value) ? "" : (string) Row["Linea"];

Simple.awccUserId = (Row["awccUserId"] == DBNull.Value) ? 0 : (int) Row["awccUserId"];

Simple.pushToken = (Row["pushToken"] == DBNull.Value) ? "" : (string) Row["pushToken"];

Simple.AppVersion = (Row["AppVersion"] == DBNull.Value) ? "" : (string) Row["AppVersion"];

Simple.AppType = (Row["AppType"] == DBNull.Value) ? 0 : (int) Row["AppType"];


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
    using(var CmdParents = new SqlCommand("SmartPanicByParentObject", conn))
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
    SimpleSmartPanic Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("SmartPanicByParentObject", conn))
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
    Simple = new SimpleSmartPanic();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Telefono = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Imei = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Modelo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Marca = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Version = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Tipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.CuentaId = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Nombre = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.Config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.GrupoId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.Linea = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.awccUserId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.pushToken = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.AppVersion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.AppType = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);


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
    using (var CmdDataByName = new SqlCommand("SmartPanicByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("SmartPanicByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("SmartPanicByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("SmartPanicByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("SmartPanicByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleSmartPanic Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("SmartPanicBySimpleSmartPanic", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Telefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Imei", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Modelo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Marca", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Version", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Tipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@CuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Nombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@Config", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@GrupoId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@Linea", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@awccUserId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@pushToken", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@AppVersion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@AppType", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@Telefono"].Value = (this._Telefono == null) ? (object) DBNull.Value : (object) this._Telefono;

		cmd.Parameters["@Imei"].Value = (this._Imei == null) ? (object) DBNull.Value : (object) this._Imei;

		cmd.Parameters["@Modelo"].Value = (this._Modelo == null) ? (object) DBNull.Value : (object) this._Modelo;

		cmd.Parameters["@Marca"].Value = (this._Marca == null) ? (object) DBNull.Value : (object) this._Marca;

		cmd.Parameters["@Version"].Value = (this._Version == null) ? (object) DBNull.Value : (object) this._Version;

		cmd.Parameters["@Tipo"].Value = (this._Tipo == null) ? (object) DBNull.Value : (object) this._Tipo;

		cmd.Parameters["@CuentaId"].Value = this._CuentaId;

		cmd.Parameters["@Nombre"].Value = (this._Nombre == null) ? (object) DBNull.Value : (object) this._Nombre;

		cmd.Parameters["@Config"].Value = (this._Config == null) ? (object) DBNull.Value : (object) this._Config;

		cmd.Parameters["@GrupoId"].Value = this._GrupoId;

		cmd.Parameters["@Linea"].Value = (this._Linea == null) ? (object) DBNull.Value : (object) this._Linea;

		cmd.Parameters["@awccUserId"].Value = this._awccUserId;

		cmd.Parameters["@pushToken"].Value = (this._pushToken == null) ? (object) DBNull.Value : (object) this._pushToken;

		cmd.Parameters["@AppVersion"].Value = (this._AppVersion == null) ? (object) DBNull.Value : (object) this._AppVersion;

		cmd.Parameters["@AppType"].Value = this._AppType;


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
		 
		public IEnumerable<SimpleSmartPanic> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SmartPanicByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSmartPanic Simple = new SimpleSmartPanic();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Telefono = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Imei = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Modelo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Marca = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Version = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Tipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.CuentaId = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Nombre = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.Config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.GrupoId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.Linea = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.awccUserId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.pushToken = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.AppVersion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.AppType = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleSmartPanic> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("SmartPanicByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleSmartPanic Simple = new SimpleSmartPanic();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.Telefono = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.Imei = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.Modelo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.Marca = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.Version = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.Tipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.CuentaId = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.Nombre = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.Config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.GrupoId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.Linea = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.awccUserId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.pushToken = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.AppVersion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.AppType = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3067, "SmartPanic");
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
    if (Reader.FieldCount > 2)this._Telefono = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._Imei = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._Modelo = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._Marca = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._Version = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._Tipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._CuentaId = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._Nombre = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._Config = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._GrupoId = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._Linea = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._awccUserId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)this._pushToken = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._AppVersion = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._AppType = (Reader.IsDBNull(16)) ? 0 : Reader.GetInt32(16);

    }
    Reader.Close();
    }
   }
  
    }
  