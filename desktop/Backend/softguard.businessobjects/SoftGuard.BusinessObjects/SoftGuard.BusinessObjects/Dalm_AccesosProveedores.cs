
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
     ///m_AccesosProveedores data access layer   
     ///</summary>
    public class Dalm_AccesosProveedores : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _apr_cNombre;
    
      private string _apr_cIdentificacion;
    
      private string _apr_cDireccion;
    
      private string _apr_cCodigoPostal;
    
      private string _apr_cLocalidad;
    
      private int _apr_iProvincia;
    
      private string _apr_cTelefono;
    
      private int _apr_iCategoria;
    
      private DateTime? _apr_tFechaAlta;
    
      private int _apr_iStatus;
    
      private string _apr_cObservaciones;
    
      private string _apr_cPathPicture;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///apr_cNombre   
     ///</summary>
      public string apr_cNombre
      {
      
          get{ return this._apr_cNombre; }
          set{ this._apr_cNombre = value; }
        
      }
     ///<summary>
     ///apr_cIdentificacion   
     ///</summary>
      public string apr_cIdentificacion
      {
      
          get{ return this._apr_cIdentificacion; }
          set{ this._apr_cIdentificacion = value; }
        
      }
     ///<summary>
     ///apr_cDireccion   
     ///</summary>
      public string apr_cDireccion
      {
      
          get{ return this._apr_cDireccion; }
          set{ this._apr_cDireccion = value; }
        
      }
     ///<summary>
     ///apr_cCodigoPostal   
     ///</summary>
      public string apr_cCodigoPostal
      {
      
          get{ return this._apr_cCodigoPostal; }
          set{ this._apr_cCodigoPostal = value; }
        
      }
     ///<summary>
     ///apr_cLocalidad   
     ///</summary>
      public string apr_cLocalidad
      {
      
          get{ return this._apr_cLocalidad; }
          set{ this._apr_cLocalidad = value; }
        
      }
     ///<summary>
     ///apr_iProvincia   
     ///</summary>
      public int apr_iProvincia
      {
      
          get{ return this._apr_iProvincia; }
          set{ this._apr_iProvincia = value; }
        
      }
     ///<summary>
     ///apr_cTelefono   
     ///</summary>
      public string apr_cTelefono
      {
      
          get{ return this._apr_cTelefono; }
          set{ this._apr_cTelefono = value; }
        
      }
     ///<summary>
     ///apr_iCategoria   
     ///</summary>
      public int apr_iCategoria
      {
      
          get{ return this._apr_iCategoria; }
          set{ this._apr_iCategoria = value; }
        
      }
     ///<summary>
     ///apr_tFechaAlta   
     ///</summary>
      public DateTime? apr_tFechaAlta
      {
      
          get{ return this._apr_tFechaAlta; }
          set{ this._apr_tFechaAlta = value; }
        
      }
     ///<summary>
     ///apr_iStatus   
     ///</summary>
      public int apr_iStatus
      {
      
          get{ return this._apr_iStatus; }
          set{ this._apr_iStatus = value; }
        
      }
     ///<summary>
     ///apr_cObservaciones   
     ///</summary>
      public string apr_cObservaciones
      {
      
          get{ return this._apr_cObservaciones; }
          set{ this._apr_cObservaciones = value; }
        
      }
     ///<summary>
     ///apr_cPathPicture   
     ///</summary>
      public string apr_cPathPicture
      {
      
          get{ return this._apr_cPathPicture; }
          set{ this._apr_cPathPicture = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_AccesosProveedores(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_AccesosProveedores(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_AccesosProveedores(SqlHelper SqlConfig, int UserId, Simplem_AccesosProveedores Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._apr_cNombre = Simple.apr_cNombre;

      this._apr_cIdentificacion = Simple.apr_cIdentificacion;

      this._apr_cDireccion = Simple.apr_cDireccion;

      this._apr_cCodigoPostal = Simple.apr_cCodigoPostal;

      this._apr_cLocalidad = Simple.apr_cLocalidad;

      this._apr_iProvincia = Simple.apr_iProvincia;

      this._apr_cTelefono = Simple.apr_cTelefono;

      this._apr_iCategoria = Simple.apr_iCategoria;

      this._apr_tFechaAlta = Simple.apr_tFechaAlta;

      this._apr_iStatus = Simple.apr_iStatus;

      this._apr_cObservaciones = Simple.apr_cObservaciones;

      this._apr_cPathPicture = Simple.apr_cPathPicture;

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
    using(var cmd = new SqlCommand("m_AccesosProveedoresIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@apr_cNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cDireccion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cCodigoPostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cLocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_iProvincia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_cTelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_iCategoria", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_tFechaAlta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@apr_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cPathPicture", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@apr_cNombre"].Value = (this._apr_cNombre == null) ? (object) DBNull.Value : (object) this._apr_cNombre;

		cmd.Parameters["@apr_cIdentificacion"].Value = (this._apr_cIdentificacion == null) ? (object) DBNull.Value : (object) this._apr_cIdentificacion;

		cmd.Parameters["@apr_cDireccion"].Value = (this._apr_cDireccion == null) ? (object) DBNull.Value : (object) this._apr_cDireccion;

		cmd.Parameters["@apr_cCodigoPostal"].Value = (this._apr_cCodigoPostal == null) ? (object) DBNull.Value : (object) this._apr_cCodigoPostal;

		cmd.Parameters["@apr_cLocalidad"].Value = (this._apr_cLocalidad == null) ? (object) DBNull.Value : (object) this._apr_cLocalidad;

		cmd.Parameters["@apr_iProvincia"].Value = this._apr_iProvincia;

		cmd.Parameters["@apr_cTelefono"].Value = (this._apr_cTelefono == null) ? (object) DBNull.Value : (object) this._apr_cTelefono;

		cmd.Parameters["@apr_iCategoria"].Value = this._apr_iCategoria;

		cmd.Parameters["@apr_tFechaAlta"].Value = (this._apr_tFechaAlta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._apr_tFechaAlta;

		cmd.Parameters["@apr_iStatus"].Value = this._apr_iStatus;

		cmd.Parameters["@apr_cObservaciones"].Value = (this._apr_cObservaciones == null) ? (object) DBNull.Value : (object) this._apr_cObservaciones;

		cmd.Parameters["@apr_cPathPicture"].Value = (this._apr_cPathPicture == null) ? (object) DBNull.Value : (object) this._apr_cPathPicture;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_AccesosProveedoresUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@apr_cNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cDireccion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cCodigoPostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cLocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_iProvincia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_cTelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_iCategoria", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_tFechaAlta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@apr_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cPathPicture", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@apr_cNombre"].Value = (this._apr_cNombre == null) ? (object) DBNull.Value : (object) this._apr_cNombre;

		cmd.Parameters["@apr_cIdentificacion"].Value = (this._apr_cIdentificacion == null) ? (object) DBNull.Value : (object) this._apr_cIdentificacion;

		cmd.Parameters["@apr_cDireccion"].Value = (this._apr_cDireccion == null) ? (object) DBNull.Value : (object) this._apr_cDireccion;

		cmd.Parameters["@apr_cCodigoPostal"].Value = (this._apr_cCodigoPostal == null) ? (object) DBNull.Value : (object) this._apr_cCodigoPostal;

		cmd.Parameters["@apr_cLocalidad"].Value = (this._apr_cLocalidad == null) ? (object) DBNull.Value : (object) this._apr_cLocalidad;

		cmd.Parameters["@apr_iProvincia"].Value = this._apr_iProvincia;

		cmd.Parameters["@apr_cTelefono"].Value = (this._apr_cTelefono == null) ? (object) DBNull.Value : (object) this._apr_cTelefono;

		cmd.Parameters["@apr_iCategoria"].Value = this._apr_iCategoria;

		cmd.Parameters["@apr_tFechaAlta"].Value = (this._apr_tFechaAlta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._apr_tFechaAlta;

		cmd.Parameters["@apr_iStatus"].Value = this._apr_iStatus;

		cmd.Parameters["@apr_cObservaciones"].Value = (this._apr_cObservaciones == null) ? (object) DBNull.Value : (object) this._apr_cObservaciones;

		cmd.Parameters["@apr_cPathPicture"].Value = (this._apr_cPathPicture == null) ? (object) DBNull.Value : (object) this._apr_cPathPicture;

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
    throw new RuntimeException("The m_AccesosProveedores is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_AccesosProveedoresDel", conn))
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
    using(var CmdSel = new SqlCommand("m_AccesosProveedoresSel", conn))
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
    Simplem_AccesosProveedores Simple = new Simplem_AccesosProveedores();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.apr_cNombre = this._apr_cNombre;

      Simple.apr_cIdentificacion = this._apr_cIdentificacion;

      Simple.apr_cDireccion = this._apr_cDireccion;

      Simple.apr_cCodigoPostal = this._apr_cCodigoPostal;

      Simple.apr_cLocalidad = this._apr_cLocalidad;

      Simple.apr_iProvincia = this._apr_iProvincia;

      Simple.apr_cTelefono = this._apr_cTelefono;

      Simple.apr_iCategoria = this._apr_iCategoria;

      Simple.apr_tFechaAlta = this._apr_tFechaAlta;

      Simple.apr_iStatus = this._apr_iStatus;

      Simple.apr_cObservaciones = this._apr_cObservaciones;

      Simple.apr_cPathPicture = this._apr_cPathPicture;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_AccesosProveedores)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._apr_cNombre = Simple.apr_cNombre;

      this._apr_cIdentificacion = Simple.apr_cIdentificacion;

      this._apr_cDireccion = Simple.apr_cDireccion;

      this._apr_cCodigoPostal = Simple.apr_cCodigoPostal;

      this._apr_cLocalidad = Simple.apr_cLocalidad;

      this._apr_iProvincia = Simple.apr_iProvincia;

      this._apr_cTelefono = Simple.apr_cTelefono;

      this._apr_iCategoria = Simple.apr_iCategoria;

      this._apr_tFechaAlta = Simple.apr_tFechaAlta;

      this._apr_iStatus = Simple.apr_iStatus;

      this._apr_cObservaciones = Simple.apr_cObservaciones;

      this._apr_cPathPicture = Simple.apr_cPathPicture;

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
    Callerm_AccesosProveedores Caller = new Callerm_AccesosProveedores();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.apr_cNombre = this._apr_cNombre;

      Caller.apr_cIdentificacion = this._apr_cIdentificacion;

      Caller.apr_cDireccion = this._apr_cDireccion;

      Caller.apr_cCodigoPostal = this._apr_cCodigoPostal;

      Caller.apr_cLocalidad = this._apr_cLocalidad;

      Caller.apr_iProvincia = this._apr_iProvincia;

      Caller.apr_cTelefono = this._apr_cTelefono;

      Caller.apr_iCategoria = this._apr_iCategoria;

      Caller.apr_tFechaAlta = this._apr_tFechaAlta;

      Caller.apr_iStatus = this._apr_iStatus;

      Caller.apr_cObservaciones = this._apr_cObservaciones;

      Caller.apr_cPathPicture = this._apr_cPathPicture;

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
    
      dt.Columns.Add(new DataColumn("apr_cNombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("apr_cIdentificacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("apr_cDireccion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("apr_cCodigoPostal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("apr_cLocalidad", typeof (string)));
    
      dt.Columns.Add(new DataColumn("apr_iProvincia", typeof (int)));
    
      dt.Columns.Add(new DataColumn("apr_cTelefono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("apr_iCategoria", typeof (int)));
    
      dt.Columns.Add(new DataColumn("apr_tFechaAlta", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("apr_iStatus", typeof (int)));
    
      dt.Columns.Add(new DataColumn("apr_cObservaciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("apr_cPathPicture", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["apr_cNombre"] = this._apr_cNombre;

      dr["apr_cIdentificacion"] = this._apr_cIdentificacion;

      dr["apr_cDireccion"] = this._apr_cDireccion;

      dr["apr_cCodigoPostal"] = this._apr_cCodigoPostal;

      dr["apr_cLocalidad"] = this._apr_cLocalidad;

      dr["apr_iProvincia"] = this._apr_iProvincia;

      dr["apr_cTelefono"] = this._apr_cTelefono;

      dr["apr_iCategoria"] = this._apr_iCategoria;

      dr["apr_tFechaAlta"] = (object)this._apr_tFechaAlta  ?? DBNull.Value;

      dr["apr_iStatus"] = this._apr_iStatus;

      dr["apr_cObservaciones"] = this._apr_cObservaciones;

      dr["apr_cPathPicture"] = this._apr_cPathPicture;

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
    using(var CmdChilds = new SqlCommand("m_AccesosProveedoresByChildObject", conn))
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
    Simplem_AccesosProveedores Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_AccesosProveedoresByChildObject", conn))
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
    Simple = new Simplem_AccesosProveedores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.apr_cNombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.apr_cIdentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.apr_cDireccion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.apr_cCodigoPostal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.apr_cLocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.apr_iProvincia = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.apr_cTelefono = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.apr_iCategoria = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.apr_tFechaAlta = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.apr_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.apr_cObservaciones = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.apr_cPathPicture = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);


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
    Simplem_AccesosProveedores Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_AccesosProveedores();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.apr_cNombre = (Row["apr_cNombre"] == DBNull.Value) ? "" : (string) Row["apr_cNombre"];

Simple.apr_cIdentificacion = (Row["apr_cIdentificacion"] == DBNull.Value) ? "" : (string) Row["apr_cIdentificacion"];

Simple.apr_cDireccion = (Row["apr_cDireccion"] == DBNull.Value) ? "" : (string) Row["apr_cDireccion"];

Simple.apr_cCodigoPostal = (Row["apr_cCodigoPostal"] == DBNull.Value) ? "" : (string) Row["apr_cCodigoPostal"];

Simple.apr_cLocalidad = (Row["apr_cLocalidad"] == DBNull.Value) ? "" : (string) Row["apr_cLocalidad"];

Simple.apr_iProvincia = (Row["apr_iProvincia"] == DBNull.Value) ? 0 : (int) Row["apr_iProvincia"];

Simple.apr_cTelefono = (Row["apr_cTelefono"] == DBNull.Value) ? "" : (string) Row["apr_cTelefono"];

Simple.apr_iCategoria = (Row["apr_iCategoria"] == DBNull.Value) ? 0 : (int) Row["apr_iCategoria"];

Simple.apr_tFechaAlta = (Row["apr_tFechaAlta"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["apr_tFechaAlta"];

Simple.apr_iStatus = (Row["apr_iStatus"] == DBNull.Value) ? 0 : (int) Row["apr_iStatus"];

Simple.apr_cObservaciones = (Row["apr_cObservaciones"] == DBNull.Value) ? "" : (string) Row["apr_cObservaciones"];

Simple.apr_cPathPicture = (Row["apr_cPathPicture"] == DBNull.Value) ? "" : (string) Row["apr_cPathPicture"];


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
    using(var CmdParents = new SqlCommand("m_AccesosProveedoresByParentObject", conn))
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
    Simplem_AccesosProveedores Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_AccesosProveedoresByParentObject", conn))
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
    Simple = new Simplem_AccesosProveedores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.apr_cNombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.apr_cIdentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.apr_cDireccion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.apr_cCodigoPostal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.apr_cLocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.apr_iProvincia = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.apr_cTelefono = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.apr_iCategoria = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.apr_tFechaAlta = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.apr_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.apr_cObservaciones = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.apr_cPathPicture = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);


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
    using (var CmdDataByName = new SqlCommand("m_AccesosProveedoresByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_AccesosProveedoresByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_AccesosProveedoresByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_AccesosProveedoresByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_AccesosProveedoresByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_AccesosProveedores Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_AccesosProveedoresBySimplem_AccesosProveedores", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@apr_cNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cDireccion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cCodigoPostal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cLocalidad", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_iProvincia", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_cTelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_iCategoria", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_tFechaAlta", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@apr_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@apr_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@apr_cPathPicture", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@apr_cNombre"].Value = (this._apr_cNombre == null) ? (object) DBNull.Value : (object) this._apr_cNombre;

		cmd.Parameters["@apr_cIdentificacion"].Value = (this._apr_cIdentificacion == null) ? (object) DBNull.Value : (object) this._apr_cIdentificacion;

		cmd.Parameters["@apr_cDireccion"].Value = (this._apr_cDireccion == null) ? (object) DBNull.Value : (object) this._apr_cDireccion;

		cmd.Parameters["@apr_cCodigoPostal"].Value = (this._apr_cCodigoPostal == null) ? (object) DBNull.Value : (object) this._apr_cCodigoPostal;

		cmd.Parameters["@apr_cLocalidad"].Value = (this._apr_cLocalidad == null) ? (object) DBNull.Value : (object) this._apr_cLocalidad;

		cmd.Parameters["@apr_iProvincia"].Value = this._apr_iProvincia;

		cmd.Parameters["@apr_cTelefono"].Value = (this._apr_cTelefono == null) ? (object) DBNull.Value : (object) this._apr_cTelefono;

		cmd.Parameters["@apr_iCategoria"].Value = this._apr_iCategoria;

		cmd.Parameters["@apr_tFechaAlta"].Value = (this._apr_tFechaAlta == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._apr_tFechaAlta;

		cmd.Parameters["@apr_iStatus"].Value = this._apr_iStatus;

		cmd.Parameters["@apr_cObservaciones"].Value = (this._apr_cObservaciones == null) ? (object) DBNull.Value : (object) this._apr_cObservaciones;

		cmd.Parameters["@apr_cPathPicture"].Value = (this._apr_cPathPicture == null) ? (object) DBNull.Value : (object) this._apr_cPathPicture;


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
		 
		public IEnumerable<Simplem_AccesosProveedores> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_AccesosProveedoresByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_AccesosProveedores Simple = new Simplem_AccesosProveedores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.apr_cNombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.apr_cIdentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.apr_cDireccion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.apr_cCodigoPostal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.apr_cLocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.apr_iProvincia = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.apr_cTelefono = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.apr_iCategoria = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.apr_tFechaAlta = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.apr_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.apr_cObservaciones = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.apr_cPathPicture = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_AccesosProveedores> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_AccesosProveedoresByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_AccesosProveedores Simple = new Simplem_AccesosProveedores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.apr_cNombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.apr_cIdentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.apr_cDireccion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.apr_cCodigoPostal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.apr_cLocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.apr_iProvincia = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.apr_cTelefono = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.apr_iCategoria = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.apr_tFechaAlta = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.apr_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.apr_cObservaciones = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.apr_cPathPicture = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3227, "m_AccesosProveedores");
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
    if (Reader.FieldCount > 2)this._apr_cNombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._apr_cIdentificacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._apr_cDireccion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._apr_cCodigoPostal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._apr_cLocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._apr_iProvincia = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._apr_cTelefono = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._apr_iCategoria = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._apr_tFechaAlta = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)this._apr_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._apr_cObservaciones = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._apr_cPathPicture = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);

    }
    Reader.Close();
    }
   }
  
    }
  