
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
     ///p_grabacion_audio data access layer   
     ///</summary>
    public class Dalp_grabacion_audio : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _gra_iidcuenta;
    
      private int _gra_iidrecepcion;
    
      private DateTime? _gra_dfechahora;
    
      private string _gra_carchivo;
    
      private Decimal _gra_nduracion;
    
      private int _gra_ioperador;
    
      private string _gra_cterminal;
    
      private Decimal _gra_nestado;
    
      private string _gra_ctelefono;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///gra_iidcuenta   
     ///</summary>
      public int gra_iidcuenta
      {
      
          get{ return this._gra_iidcuenta; }
          set{ this._gra_iidcuenta = value; }
        
      }
     ///<summary>
     ///gra_iidrecepcion   
     ///</summary>
      public int gra_iidrecepcion
      {
      
          get{ return this._gra_iidrecepcion; }
          set{ this._gra_iidrecepcion = value; }
        
      }
     ///<summary>
     ///gra_dfechahora   
     ///</summary>
      public DateTime? gra_dfechahora
      {
      
          get{ return this._gra_dfechahora; }
          set{ this._gra_dfechahora = value; }
        
      }
     ///<summary>
     ///gra_carchivo   
     ///</summary>
      public string gra_carchivo
      {
      
          get{ return this._gra_carchivo; }
          set{ this._gra_carchivo = value; }
        
      }
     ///<summary>
     ///gra_nduracion   
     ///</summary>
      public Decimal gra_nduracion
      {
      
          get{ return this._gra_nduracion; }
          set{ this._gra_nduracion = value; }
        
      }
     ///<summary>
     ///gra_ioperador   
     ///</summary>
      public int gra_ioperador
      {
      
          get{ return this._gra_ioperador; }
          set{ this._gra_ioperador = value; }
        
      }
     ///<summary>
     ///gra_cterminal   
     ///</summary>
      public string gra_cterminal
      {
      
          get{ return this._gra_cterminal; }
          set{ this._gra_cterminal = value; }
        
      }
     ///<summary>
     ///gra_nestado   
     ///</summary>
      public Decimal gra_nestado
      {
      
          get{ return this._gra_nestado; }
          set{ this._gra_nestado = value; }
        
      }
     ///<summary>
     ///gra_ctelefono   
     ///</summary>
      public string gra_ctelefono
      {
      
          get{ return this._gra_ctelefono; }
          set{ this._gra_ctelefono = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_grabacion_audio(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_grabacion_audio(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_grabacion_audio(SqlHelper SqlConfig, int UserId, Simplep_grabacion_audio Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._gra_iidcuenta = Simple.gra_iidcuenta;

      this._gra_iidrecepcion = Simple.gra_iidrecepcion;

      this._gra_dfechahora = Simple.gra_dfechahora;

      this._gra_carchivo = Simple.gra_carchivo;

      this._gra_nduracion = Simple.gra_nduracion;

      this._gra_ioperador = Simple.gra_ioperador;

      this._gra_cterminal = Simple.gra_cterminal;

      this._gra_nestado = Simple.gra_nestado;

      this._gra_ctelefono = Simple.gra_ctelefono;

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
    using(var cmd = new SqlCommand("p_grabacion_audioIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@gra_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_iidrecepcion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_dfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@gra_carchivo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@gra_nduracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@gra_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_cterminal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@gra_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@gra_ctelefono", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@gra_iidcuenta"].Value = this._gra_iidcuenta;

		cmd.Parameters["@gra_iidrecepcion"].Value = this._gra_iidrecepcion;

		cmd.Parameters["@gra_dfechahora"].Value = (this._gra_dfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._gra_dfechahora;

		cmd.Parameters["@gra_carchivo"].Value = (this._gra_carchivo == null) ? (object) DBNull.Value : (object) this._gra_carchivo;

		cmd.Parameters["@gra_nduracion"].Value = this._gra_nduracion;

		cmd.Parameters["@gra_ioperador"].Value = this._gra_ioperador;

		cmd.Parameters["@gra_cterminal"].Value = (this._gra_cterminal == null) ? (object) DBNull.Value : (object) this._gra_cterminal;

		cmd.Parameters["@gra_nestado"].Value = this._gra_nestado;

		cmd.Parameters["@gra_ctelefono"].Value = (this._gra_ctelefono == null) ? (object) DBNull.Value : (object) this._gra_ctelefono;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_grabacion_audioUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@gra_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_iidrecepcion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_dfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@gra_carchivo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@gra_nduracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@gra_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_cterminal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@gra_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@gra_ctelefono", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@gra_iidcuenta"].Value = this._gra_iidcuenta;

		cmd.Parameters["@gra_iidrecepcion"].Value = this._gra_iidrecepcion;

		cmd.Parameters["@gra_dfechahora"].Value = (this._gra_dfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._gra_dfechahora;

		cmd.Parameters["@gra_carchivo"].Value = (this._gra_carchivo == null) ? (object) DBNull.Value : (object) this._gra_carchivo;

		cmd.Parameters["@gra_nduracion"].Value = this._gra_nduracion;

		cmd.Parameters["@gra_ioperador"].Value = this._gra_ioperador;

		cmd.Parameters["@gra_cterminal"].Value = (this._gra_cterminal == null) ? (object) DBNull.Value : (object) this._gra_cterminal;

		cmd.Parameters["@gra_nestado"].Value = this._gra_nestado;

		cmd.Parameters["@gra_ctelefono"].Value = (this._gra_ctelefono == null) ? (object) DBNull.Value : (object) this._gra_ctelefono;

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
    throw new RuntimeException("The p_grabacion_audio is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_grabacion_audioDel", conn))
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
    using(var CmdSel = new SqlCommand("p_grabacion_audioSel", conn))
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
    Simplep_grabacion_audio Simple = new Simplep_grabacion_audio();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.gra_iidcuenta = this._gra_iidcuenta;

      Simple.gra_iidrecepcion = this._gra_iidrecepcion;

      Simple.gra_dfechahora = this._gra_dfechahora;

      Simple.gra_carchivo = this._gra_carchivo;

      Simple.gra_nduracion = this._gra_nduracion;

      Simple.gra_ioperador = this._gra_ioperador;

      Simple.gra_cterminal = this._gra_cterminal;

      Simple.gra_nestado = this._gra_nestado;

      Simple.gra_ctelefono = this._gra_ctelefono;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_grabacion_audio)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._gra_iidcuenta = Simple.gra_iidcuenta;

      this._gra_iidrecepcion = Simple.gra_iidrecepcion;

      this._gra_dfechahora = Simple.gra_dfechahora;

      this._gra_carchivo = Simple.gra_carchivo;

      this._gra_nduracion = Simple.gra_nduracion;

      this._gra_ioperador = Simple.gra_ioperador;

      this._gra_cterminal = Simple.gra_cterminal;

      this._gra_nestado = Simple.gra_nestado;

      this._gra_ctelefono = Simple.gra_ctelefono;

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
    Callerp_grabacion_audio Caller = new Callerp_grabacion_audio();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.gra_iidcuenta = this._gra_iidcuenta;

      Caller.gra_iidrecepcion = this._gra_iidrecepcion;

      Caller.gra_dfechahora = this._gra_dfechahora;

      Caller.gra_carchivo = this._gra_carchivo;

      Caller.gra_nduracion = this._gra_nduracion;

      Caller.gra_ioperador = this._gra_ioperador;

      Caller.gra_cterminal = this._gra_cterminal;

      Caller.gra_nestado = this._gra_nestado;

      Caller.gra_ctelefono = this._gra_ctelefono;

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
    
      dt.Columns.Add(new DataColumn("gra_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("gra_iidrecepcion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("gra_dfechahora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("gra_carchivo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("gra_nduracion", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("gra_ioperador", typeof (int)));
    
      dt.Columns.Add(new DataColumn("gra_cterminal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("gra_nestado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("gra_ctelefono", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["gra_iidcuenta"] = this._gra_iidcuenta;

      dr["gra_iidrecepcion"] = this._gra_iidrecepcion;

      dr["gra_dfechahora"] = (object)this._gra_dfechahora  ?? DBNull.Value;

      dr["gra_carchivo"] = this._gra_carchivo;

      dr["gra_nduracion"] = this._gra_nduracion;

      dr["gra_ioperador"] = this._gra_ioperador;

      dr["gra_cterminal"] = this._gra_cterminal;

      dr["gra_nestado"] = this._gra_nestado;

      dr["gra_ctelefono"] = this._gra_ctelefono;

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
    using(var CmdChilds = new SqlCommand("p_grabacion_audioByChildObject", conn))
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
    Simplep_grabacion_audio Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_grabacion_audioByChildObject", conn))
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
    Simple = new Simplep_grabacion_audio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.gra_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.gra_iidrecepcion = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.gra_dfechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.gra_carchivo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.gra_nduracion = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.gra_ioperador = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.gra_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.gra_nestado = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.gra_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    Simplep_grabacion_audio Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_grabacion_audio();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.gra_iidcuenta = (Row["gra_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["gra_iidcuenta"];

Simple.gra_iidrecepcion = (Row["gra_iidrecepcion"] == DBNull.Value) ? 0 : (int) Row["gra_iidrecepcion"];

Simple.gra_dfechahora = (Row["gra_dfechahora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["gra_dfechahora"];

Simple.gra_carchivo = (Row["gra_carchivo"] == DBNull.Value) ? "" : (string) Row["gra_carchivo"];

Simple.gra_nduracion = (Row["gra_nduracion"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["gra_nduracion"];

Simple.gra_ioperador = (Row["gra_ioperador"] == DBNull.Value) ? 0 : (int) Row["gra_ioperador"];

Simple.gra_cterminal = (Row["gra_cterminal"] == DBNull.Value) ? "" : (string) Row["gra_cterminal"];

Simple.gra_nestado = (Row["gra_nestado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["gra_nestado"];

Simple.gra_ctelefono = (Row["gra_ctelefono"] == DBNull.Value) ? "" : (string) Row["gra_ctelefono"];


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
    using(var CmdParents = new SqlCommand("p_grabacion_audioByParentObject", conn))
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
    Simplep_grabacion_audio Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_grabacion_audioByParentObject", conn))
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
    Simple = new Simplep_grabacion_audio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.gra_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.gra_iidrecepcion = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.gra_dfechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.gra_carchivo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.gra_nduracion = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.gra_ioperador = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.gra_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.gra_nestado = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.gra_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    using (var CmdDataByName = new SqlCommand("p_grabacion_audioByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_grabacion_audioByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_grabacion_audioByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_grabacion_audioByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_grabacion_audioByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_grabacion_audio Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_grabacion_audioBySimplep_grabacion_audio", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@gra_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_iidrecepcion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_dfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@gra_carchivo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@gra_nduracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@gra_ioperador", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@gra_cterminal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@gra_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@gra_ctelefono", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@gra_iidcuenta"].Value = this._gra_iidcuenta;

		cmd.Parameters["@gra_iidrecepcion"].Value = this._gra_iidrecepcion;

		cmd.Parameters["@gra_dfechahora"].Value = (this._gra_dfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._gra_dfechahora;

		cmd.Parameters["@gra_carchivo"].Value = (this._gra_carchivo == null) ? (object) DBNull.Value : (object) this._gra_carchivo;

		cmd.Parameters["@gra_nduracion"].Value = this._gra_nduracion;

		cmd.Parameters["@gra_ioperador"].Value = this._gra_ioperador;

		cmd.Parameters["@gra_cterminal"].Value = (this._gra_cterminal == null) ? (object) DBNull.Value : (object) this._gra_cterminal;

		cmd.Parameters["@gra_nestado"].Value = this._gra_nestado;

		cmd.Parameters["@gra_ctelefono"].Value = (this._gra_ctelefono == null) ? (object) DBNull.Value : (object) this._gra_ctelefono;


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
		 
		public IEnumerable<Simplep_grabacion_audio> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_grabacion_audioByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_grabacion_audio Simple = new Simplep_grabacion_audio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.gra_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.gra_iidrecepcion = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.gra_dfechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.gra_carchivo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.gra_nduracion = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.gra_ioperador = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.gra_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.gra_nestado = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.gra_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_grabacion_audio> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_grabacion_audioByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_grabacion_audio Simple = new Simplep_grabacion_audio();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.gra_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.gra_iidrecepcion = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.gra_dfechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.gra_carchivo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.gra_nduracion = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.gra_ioperador = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.gra_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.gra_nestado = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.gra_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3129, "p_grabacion_audio");
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
    if (Reader.FieldCount > 2)this._gra_iidcuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._gra_iidrecepcion = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._gra_dfechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._gra_carchivo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._gra_nduracion = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)this._gra_ioperador = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._gra_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._gra_nestado = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)this._gra_ctelefono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    }
    Reader.Close();
    }
   }
  
    }
  