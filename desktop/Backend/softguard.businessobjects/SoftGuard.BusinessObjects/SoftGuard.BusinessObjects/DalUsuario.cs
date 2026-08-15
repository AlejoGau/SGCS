
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
     ///Usuario data access layer   
     ///</summary>
    public class DalUsuario : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _usu_iidcuenta;
    
      private int _usu_icodigo;
    
      private string _usu_cnombre;
    
      private int _usu_iid;
    
      private string _usu_cclave;
    
      private Decimal _usu_ntipo;
    
      private string _usu_cimagen;
    
      private string _usu_mobservacion;
    
      private string _usu_cidextendido;
    
      private string _usu_cmetadata;
    
      private int _usu_teliid;
    
      private string _usu_cidentificacion;
    
      private int _usu_itipoidentificacion;
    
      private string _usu_email;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///usu_iidcuenta   
     ///</summary>
      public int usu_iidcuenta
      {
      
          get{ return this._usu_iidcuenta; }
          set{ this._usu_iidcuenta = value; }
        
      }
     ///<summary>
     ///usu_icodigo   
     ///</summary>
      public int usu_icodigo
      {
      
          get{ return this._usu_icodigo; }
          set{ this._usu_icodigo = value; }
        
      }
     ///<summary>
     ///usu_cnombre   
     ///</summary>
      public string usu_cnombre
      {
      
          get{ return this._usu_cnombre; }
          set{ this._usu_cnombre = value; }
        
      }
     ///<summary>
     ///usu_iid   
     ///</summary>
      public int usu_iid
      {
      
          get{ return this._usu_iid; }
          set{ this._usu_iid = value; }
        
      }
     ///<summary>
     ///usu_cclave   
     ///</summary>
      public string usu_cclave
      {
      
          get{ return this._usu_cclave; }
          set{ this._usu_cclave = value; }
        
      }
     ///<summary>
     ///usu_ntipo   
     ///</summary>
      public Decimal usu_ntipo
      {
      
          get{ return this._usu_ntipo; }
          set{ this._usu_ntipo = value; }
        
      }
     ///<summary>
     ///usu_cimagen   
     ///</summary>
      public string usu_cimagen
      {
      
          get{ return this._usu_cimagen; }
          set{ this._usu_cimagen = value; }
        
      }
     ///<summary>
     ///usu_mobservacion   
     ///</summary>
      public string usu_mobservacion
      {
      
          get{ return this._usu_mobservacion; }
          set{ this._usu_mobservacion = value; }
        
      }
     ///<summary>
     ///usu_cidextendido   
     ///</summary>
      public string usu_cidextendido
      {
      
          get{ return this._usu_cidextendido; }
          set{ this._usu_cidextendido = value; }
        
      }
     ///<summary>
     ///usu_cmetadata   
     ///</summary>
      public string usu_cmetadata
      {
      
          get{ return this._usu_cmetadata; }
          set{ this._usu_cmetadata = value; }
        
      }
     ///<summary>
     ///usu_teliid   
     ///</summary>
      public int usu_teliid
      {
      
          get{ return this._usu_teliid; }
          set{ this._usu_teliid = value; }
        
      }
     ///<summary>
     ///usu_cidentificacion   
     ///</summary>
      public string usu_cidentificacion
      {
      
          get{ return this._usu_cidentificacion; }
          set{ this._usu_cidentificacion = value; }
        
      }
     ///<summary>
     ///usu_itipoidentificacion   
     ///</summary>
      public int usu_itipoidentificacion
      {
      
          get{ return this._usu_itipoidentificacion; }
          set{ this._usu_itipoidentificacion = value; }
        
      }
     ///<summary>
     ///usu_email   
     ///</summary>
      public string usu_email
      {
      
          get{ return this._usu_email; }
          set{ this._usu_email = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalUsuario(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalUsuario(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalUsuario(SqlHelper SqlConfig, int UserId, SimpleUsuario Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._usu_iidcuenta = Simple.usu_iidcuenta;

      this._usu_icodigo = Simple.usu_icodigo;

      this._usu_cnombre = Simple.usu_cnombre;

      this._usu_iid = Simple.usu_iid;

      this._usu_cclave = Simple.usu_cclave;

      this._usu_ntipo = Simple.usu_ntipo;

      this._usu_cimagen = Simple.usu_cimagen;

      this._usu_mobservacion = Simple.usu_mobservacion;

      this._usu_cidextendido = Simple.usu_cidextendido;

      this._usu_cmetadata = Simple.usu_cmetadata;

      this._usu_teliid = Simple.usu_teliid;

      this._usu_cidentificacion = Simple.usu_cidentificacion;

      this._usu_itipoidentificacion = Simple.usu_itipoidentificacion;

      this._usu_email = Simple.usu_email;

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
    using(var cmd = new SqlCommand("UsuarioIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@usu_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_icodigo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@usu_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_mobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@usu_cidextendido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_cmetadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_teliid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_itipoidentificacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_email", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@usu_iidcuenta"].Value = this._usu_iidcuenta;

		cmd.Parameters["@usu_icodigo"].Value = this._usu_icodigo;

		cmd.Parameters["@usu_cnombre"].Value = (this._usu_cnombre == null) ? (object) DBNull.Value : (object) this._usu_cnombre;

		cmd.Parameters["@usu_iid"].Value = this._usu_iid;

		cmd.Parameters["@usu_cclave"].Value = (this._usu_cclave == null) ? (object) DBNull.Value : (object) this._usu_cclave;

		cmd.Parameters["@usu_ntipo"].Value = this._usu_ntipo;

		cmd.Parameters["@usu_cimagen"].Value = (this._usu_cimagen == null) ? (object) DBNull.Value : (object) this._usu_cimagen;

		cmd.Parameters["@usu_mobservacion"].Value = (this._usu_mobservacion == null) ? (object) DBNull.Value : (object) this._usu_mobservacion;

		cmd.Parameters["@usu_cidextendido"].Value = (this._usu_cidextendido == null) ? (object) DBNull.Value : (object) this._usu_cidextendido;

		cmd.Parameters["@usu_cmetadata"].Value = (this._usu_cmetadata == null) ? (object) DBNull.Value : (object) this._usu_cmetadata;

		cmd.Parameters["@usu_teliid"].Value = this._usu_teliid;

		cmd.Parameters["@usu_cidentificacion"].Value = (this._usu_cidentificacion == null) ? (object) DBNull.Value : (object) this._usu_cidentificacion;

		cmd.Parameters["@usu_itipoidentificacion"].Value = this._usu_itipoidentificacion;

		cmd.Parameters["@usu_email"].Value = (this._usu_email == null) ? (object) DBNull.Value : (object) this._usu_email;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("UsuarioUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@usu_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_icodigo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@usu_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_mobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@usu_cidextendido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_cmetadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_teliid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_itipoidentificacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_email", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@usu_iidcuenta"].Value = this._usu_iidcuenta;

		cmd.Parameters["@usu_icodigo"].Value = this._usu_icodigo;

		cmd.Parameters["@usu_cnombre"].Value = (this._usu_cnombre == null) ? (object) DBNull.Value : (object) this._usu_cnombre;

		cmd.Parameters["@usu_iid"].Value = this._usu_iid;

		cmd.Parameters["@usu_cclave"].Value = (this._usu_cclave == null) ? (object) DBNull.Value : (object) this._usu_cclave;

		cmd.Parameters["@usu_ntipo"].Value = this._usu_ntipo;

		cmd.Parameters["@usu_cimagen"].Value = (this._usu_cimagen == null) ? (object) DBNull.Value : (object) this._usu_cimagen;

		cmd.Parameters["@usu_mobservacion"].Value = (this._usu_mobservacion == null) ? (object) DBNull.Value : (object) this._usu_mobservacion;

		cmd.Parameters["@usu_cidextendido"].Value = (this._usu_cidextendido == null) ? (object) DBNull.Value : (object) this._usu_cidextendido;

		cmd.Parameters["@usu_cmetadata"].Value = (this._usu_cmetadata == null) ? (object) DBNull.Value : (object) this._usu_cmetadata;

		cmd.Parameters["@usu_teliid"].Value = this._usu_teliid;

		cmd.Parameters["@usu_cidentificacion"].Value = (this._usu_cidentificacion == null) ? (object) DBNull.Value : (object) this._usu_cidentificacion;

		cmd.Parameters["@usu_itipoidentificacion"].Value = this._usu_itipoidentificacion;

		cmd.Parameters["@usu_email"].Value = (this._usu_email == null) ? (object) DBNull.Value : (object) this._usu_email;

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
    throw new RuntimeException("The Usuario is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("UsuarioDel", conn))
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
    using(var CmdSel = new SqlCommand("UsuarioSel", conn))
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
    SimpleUsuario Simple = new SimpleUsuario();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.usu_iidcuenta = this._usu_iidcuenta;

      Simple.usu_icodigo = this._usu_icodigo;

      Simple.usu_cnombre = this._usu_cnombre;

      Simple.usu_iid = this._usu_iid;

      Simple.usu_cclave = this._usu_cclave;

      Simple.usu_ntipo = this._usu_ntipo;

      Simple.usu_cimagen = this._usu_cimagen;

      Simple.usu_mobservacion = this._usu_mobservacion;

      Simple.usu_cidextendido = this._usu_cidextendido;

      Simple.usu_cmetadata = this._usu_cmetadata;

      Simple.usu_teliid = this._usu_teliid;

      Simple.usu_cidentificacion = this._usu_cidentificacion;

      Simple.usu_itipoidentificacion = this._usu_itipoidentificacion;

      Simple.usu_email = this._usu_email;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleUsuario)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._usu_iidcuenta = Simple.usu_iidcuenta;

      this._usu_icodigo = Simple.usu_icodigo;

      this._usu_cnombre = Simple.usu_cnombre;

      this._usu_iid = Simple.usu_iid;

      this._usu_cclave = Simple.usu_cclave;

      this._usu_ntipo = Simple.usu_ntipo;

      this._usu_cimagen = Simple.usu_cimagen;

      this._usu_mobservacion = Simple.usu_mobservacion;

      this._usu_cidextendido = Simple.usu_cidextendido;

      this._usu_cmetadata = Simple.usu_cmetadata;

      this._usu_teliid = Simple.usu_teliid;

      this._usu_cidentificacion = Simple.usu_cidentificacion;

      this._usu_itipoidentificacion = Simple.usu_itipoidentificacion;

      this._usu_email = Simple.usu_email;

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
    CallerUsuario Caller = new CallerUsuario();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.usu_iidcuenta = this._usu_iidcuenta;

      Caller.usu_icodigo = this._usu_icodigo;

      Caller.usu_cnombre = this._usu_cnombre;

      Caller.usu_iid = this._usu_iid;

      Caller.usu_cclave = this._usu_cclave;

      Caller.usu_ntipo = this._usu_ntipo;

      Caller.usu_cimagen = this._usu_cimagen;

      Caller.usu_mobservacion = this._usu_mobservacion;

      Caller.usu_cidextendido = this._usu_cidextendido;

      Caller.usu_cmetadata = this._usu_cmetadata;

      Caller.usu_teliid = this._usu_teliid;

      Caller.usu_cidentificacion = this._usu_cidentificacion;

      Caller.usu_itipoidentificacion = this._usu_itipoidentificacion;

      Caller.usu_email = this._usu_email;

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
    
      dt.Columns.Add(new DataColumn("usu_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("usu_icodigo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("usu_cnombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("usu_iid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("usu_cclave", typeof (string)));
    
      dt.Columns.Add(new DataColumn("usu_ntipo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("usu_cimagen", typeof (string)));
    
      dt.Columns.Add(new DataColumn("usu_mobservacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("usu_cidextendido", typeof (string)));
    
      dt.Columns.Add(new DataColumn("usu_cmetadata", typeof (string)));
    
      dt.Columns.Add(new DataColumn("usu_teliid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("usu_cidentificacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("usu_itipoidentificacion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("usu_email", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["usu_iidcuenta"] = this._usu_iidcuenta;

      dr["usu_icodigo"] = this._usu_icodigo;

      dr["usu_cnombre"] = this._usu_cnombre;

      dr["usu_iid"] = this._usu_iid;

      dr["usu_cclave"] = this._usu_cclave;

      dr["usu_ntipo"] = this._usu_ntipo;

      dr["usu_cimagen"] = this._usu_cimagen;

      dr["usu_mobservacion"] = this._usu_mobservacion;

      dr["usu_cidextendido"] = this._usu_cidextendido;

      dr["usu_cmetadata"] = this._usu_cmetadata;

      dr["usu_teliid"] = this._usu_teliid;

      dr["usu_cidentificacion"] = this._usu_cidentificacion;

      dr["usu_itipoidentificacion"] = this._usu_itipoidentificacion;

      dr["usu_email"] = this._usu_email;

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
    using(var CmdChilds = new SqlCommand("UsuarioByChildObject", conn))
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
    SimpleUsuario Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("UsuarioByChildObject", conn))
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
    Simple = new SimpleUsuario();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.usu_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.usu_icodigo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.usu_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.usu_iid = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.usu_cclave = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.usu_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.usu_cimagen = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.usu_mobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.usu_cidextendido = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.usu_cmetadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.usu_teliid = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.usu_cidentificacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.usu_itipoidentificacion = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.usu_email = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);


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
    SimpleUsuario Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleUsuario();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.usu_iidcuenta = (Row["usu_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["usu_iidcuenta"];

Simple.usu_icodigo = (Row["usu_icodigo"] == DBNull.Value) ? 0 : (int) Row["usu_icodigo"];

Simple.usu_cnombre = (Row["usu_cnombre"] == DBNull.Value) ? "" : (string) Row["usu_cnombre"];

Simple.usu_iid = (Row["usu_iid"] == DBNull.Value) ? 0 : (int) Row["usu_iid"];

Simple.usu_cclave = (Row["usu_cclave"] == DBNull.Value) ? "" : (string) Row["usu_cclave"];

Simple.usu_ntipo = (Row["usu_ntipo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["usu_ntipo"];

Simple.usu_cimagen = (Row["usu_cimagen"] == DBNull.Value) ? "" : (string) Row["usu_cimagen"];

Simple.usu_mobservacion = (Row["usu_mobservacion"] == DBNull.Value) ? "" : (string) Row["usu_mobservacion"];

Simple.usu_cidextendido = (Row["usu_cidextendido"] == DBNull.Value) ? "" : (string) Row["usu_cidextendido"];

Simple.usu_cmetadata = (Row["usu_cmetadata"] == DBNull.Value) ? "" : (string) Row["usu_cmetadata"];

Simple.usu_teliid = (Row["usu_teliid"] == DBNull.Value) ? 0 : (int) Row["usu_teliid"];

Simple.usu_cidentificacion = (Row["usu_cidentificacion"] == DBNull.Value) ? "" : (string) Row["usu_cidentificacion"];

Simple.usu_itipoidentificacion = (Row["usu_itipoidentificacion"] == DBNull.Value) ? 0 : (int) Row["usu_itipoidentificacion"];

Simple.usu_email = (Row["usu_email"] == DBNull.Value) ? "" : (string) Row["usu_email"];


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
    using(var CmdParents = new SqlCommand("UsuarioByParentObject", conn))
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
    SimpleUsuario Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("UsuarioByParentObject", conn))
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
    Simple = new SimpleUsuario();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.usu_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.usu_icodigo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.usu_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.usu_iid = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.usu_cclave = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.usu_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.usu_cimagen = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.usu_mobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.usu_cidextendido = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.usu_cmetadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.usu_teliid = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.usu_cidentificacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.usu_itipoidentificacion = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.usu_email = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);


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
    using (var CmdDataByName = new SqlCommand("UsuarioByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("UsuarioByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("UsuarioByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("UsuarioByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("UsuarioByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleUsuario Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("UsuarioBySimpleUsuario", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@usu_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_icodigo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_ntipo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@usu_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_mobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@usu_cidextendido", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_cmetadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_teliid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@usu_itipoidentificacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@usu_email", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@usu_iidcuenta"].Value = this._usu_iidcuenta;

		cmd.Parameters["@usu_icodigo"].Value = this._usu_icodigo;

		cmd.Parameters["@usu_cnombre"].Value = (this._usu_cnombre == null) ? (object) DBNull.Value : (object) this._usu_cnombre;

		cmd.Parameters["@usu_iid"].Value = this._usu_iid;

		cmd.Parameters["@usu_cclave"].Value = (this._usu_cclave == null) ? (object) DBNull.Value : (object) this._usu_cclave;

		cmd.Parameters["@usu_ntipo"].Value = this._usu_ntipo;

		cmd.Parameters["@usu_cimagen"].Value = (this._usu_cimagen == null) ? (object) DBNull.Value : (object) this._usu_cimagen;

		cmd.Parameters["@usu_mobservacion"].Value = (this._usu_mobservacion == null) ? (object) DBNull.Value : (object) this._usu_mobservacion;

		cmd.Parameters["@usu_cidextendido"].Value = (this._usu_cidextendido == null) ? (object) DBNull.Value : (object) this._usu_cidextendido;

		cmd.Parameters["@usu_cmetadata"].Value = (this._usu_cmetadata == null) ? (object) DBNull.Value : (object) this._usu_cmetadata;

		cmd.Parameters["@usu_teliid"].Value = this._usu_teliid;

		cmd.Parameters["@usu_cidentificacion"].Value = (this._usu_cidentificacion == null) ? (object) DBNull.Value : (object) this._usu_cidentificacion;

		cmd.Parameters["@usu_itipoidentificacion"].Value = this._usu_itipoidentificacion;

		cmd.Parameters["@usu_email"].Value = (this._usu_email == null) ? (object) DBNull.Value : (object) this._usu_email;


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
		 
		public IEnumerable<SimpleUsuario> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("UsuarioByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleUsuario Simple = new SimpleUsuario();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.usu_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.usu_icodigo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.usu_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.usu_iid = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.usu_cclave = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.usu_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.usu_cimagen = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.usu_mobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.usu_cidextendido = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.usu_cmetadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.usu_teliid = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.usu_cidentificacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.usu_itipoidentificacion = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.usu_email = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleUsuario> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("UsuarioByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleUsuario Simple = new SimpleUsuario();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.usu_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.usu_icodigo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.usu_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.usu_iid = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.usu_cclave = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.usu_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.usu_cimagen = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.usu_mobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.usu_cidextendido = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.usu_cmetadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.usu_teliid = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.usu_cidentificacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.usu_itipoidentificacion = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)Simple.usu_email = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3013, "Usuario");
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
    if (Reader.FieldCount > 2)this._usu_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._usu_icodigo = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._usu_cnombre = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._usu_iid = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._usu_cclave = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._usu_ntipo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._usu_cimagen = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._usu_mobservacion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._usu_cidextendido = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._usu_cmetadata = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._usu_teliid = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._usu_cidentificacion = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._usu_itipoidentificacion = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);
if (Reader.FieldCount > 15)this._usu_email = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    }
    Reader.Close();
    }
   }
  
    }
  