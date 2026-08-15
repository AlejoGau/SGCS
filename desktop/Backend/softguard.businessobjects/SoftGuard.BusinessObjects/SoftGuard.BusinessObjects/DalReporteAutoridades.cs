
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
     ///ReporteAutoridades data access layer   
     ///</summary>
    public class DalReporteAutoridades : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _rep_cautoridad;
    
      private int _rep_iidcuenta;
    
      private string _rep_calarma;
    
      private DateTime? _rep_dfechahora;
    
      private string _rep_mcomentario;
    
      private Decimal _rep_nestado;
    
      private DateTime? _rep_dresolfechahora;
    
      private string _rep_czona;
    
      private int _rep_iidrecepcion;
    
      private int _rep_iresolucion;
    
      private int _rep_icategorizacion;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///rep_cautoridad   
     ///</summary>
      public string rep_cautoridad
      {
      
          get{ return this._rep_cautoridad; }
          set{ this._rep_cautoridad = value; }
        
      }
     ///<summary>
     ///rep_iidcuenta   
     ///</summary>
      public int rep_iidcuenta
      {
      
          get{ return this._rep_iidcuenta; }
          set{ this._rep_iidcuenta = value; }
        
      }
     ///<summary>
     ///rep_calarma   
     ///</summary>
      public string rep_calarma
      {
      
          get{ return this._rep_calarma; }
          set{ this._rep_calarma = value; }
        
      }
     ///<summary>
     ///rep_dfechahora   
     ///</summary>
      public DateTime? rep_dfechahora
      {
      
          get{ return this._rep_dfechahora; }
          set{ this._rep_dfechahora = value; }
        
      }
     ///<summary>
     ///rep_mcomentario   
     ///</summary>
      public string rep_mcomentario
      {
      
          get{ return this._rep_mcomentario; }
          set{ this._rep_mcomentario = value; }
        
      }
     ///<summary>
     ///rep_nestado   
     ///</summary>
      public Decimal rep_nestado
      {
      
          get{ return this._rep_nestado; }
          set{ this._rep_nestado = value; }
        
      }
     ///<summary>
     ///rep_dresolfechahora   
     ///</summary>
      public DateTime? rep_dresolfechahora
      {
      
          get{ return this._rep_dresolfechahora; }
          set{ this._rep_dresolfechahora = value; }
        
      }
     ///<summary>
     ///rep_czona   
     ///</summary>
      public string rep_czona
      {
      
          get{ return this._rep_czona; }
          set{ this._rep_czona = value; }
        
      }
     ///<summary>
     ///rep_iidrecepcion   
     ///</summary>
      public int rep_iidrecepcion
      {
      
          get{ return this._rep_iidrecepcion; }
          set{ this._rep_iidrecepcion = value; }
        
      }
     ///<summary>
     ///rep_iresolucion   
     ///</summary>
      public int rep_iresolucion
      {
      
          get{ return this._rep_iresolucion; }
          set{ this._rep_iresolucion = value; }
        
      }
     ///<summary>
     ///rep_icategorizacion   
     ///</summary>
      public int rep_icategorizacion
      {
      
          get{ return this._rep_icategorizacion; }
          set{ this._rep_icategorizacion = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalReporteAutoridades(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalReporteAutoridades(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalReporteAutoridades(SqlHelper SqlConfig, int UserId, SimpleReporteAutoridades Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rep_cautoridad = Simple.rep_cautoridad;

      this._rep_iidcuenta = Simple.rep_iidcuenta;

      this._rep_calarma = Simple.rep_calarma;

      this._rep_dfechahora = Simple.rep_dfechahora;

      this._rep_mcomentario = Simple.rep_mcomentario;

      this._rep_nestado = Simple.rep_nestado;

      this._rep_dresolfechahora = Simple.rep_dresolfechahora;

      this._rep_czona = Simple.rep_czona;

      this._rep_iidrecepcion = Simple.rep_iidrecepcion;

      this._rep_iresolucion = Simple.rep_iresolucion;

      this._rep_icategorizacion = Simple.rep_icategorizacion;

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
    using(var cmd = new SqlCommand("ReporteAutoridadesIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rep_cautoridad", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_dfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rep_mcomentario", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@rep_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rep_dresolfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rep_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_iidrecepcion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_iresolucion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_icategorizacion", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rep_cautoridad"].Value = (this._rep_cautoridad == null) ? (object) DBNull.Value : (object) this._rep_cautoridad;

		cmd.Parameters["@rep_iidcuenta"].Value = this._rep_iidcuenta;

		cmd.Parameters["@rep_calarma"].Value = (this._rep_calarma == null) ? (object) DBNull.Value : (object) this._rep_calarma;

		cmd.Parameters["@rep_dfechahora"].Value = (this._rep_dfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rep_dfechahora;

		cmd.Parameters["@rep_mcomentario"].Value = (this._rep_mcomentario == null) ? (object) DBNull.Value : (object) this._rep_mcomentario;

		cmd.Parameters["@rep_nestado"].Value = this._rep_nestado;

		cmd.Parameters["@rep_dresolfechahora"].Value = (this._rep_dresolfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rep_dresolfechahora;

		cmd.Parameters["@rep_czona"].Value = (this._rep_czona == null) ? (object) DBNull.Value : (object) this._rep_czona;

		cmd.Parameters["@rep_iidrecepcion"].Value = this._rep_iidrecepcion;

		cmd.Parameters["@rep_iresolucion"].Value = this._rep_iresolucion;

		cmd.Parameters["@rep_icategorizacion"].Value = this._rep_icategorizacion;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("ReporteAutoridadesUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rep_cautoridad", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_dfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rep_mcomentario", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@rep_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rep_dresolfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rep_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_iidrecepcion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_iresolucion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_icategorizacion", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@rep_cautoridad"].Value = (this._rep_cautoridad == null) ? (object) DBNull.Value : (object) this._rep_cautoridad;

		cmd.Parameters["@rep_iidcuenta"].Value = this._rep_iidcuenta;

		cmd.Parameters["@rep_calarma"].Value = (this._rep_calarma == null) ? (object) DBNull.Value : (object) this._rep_calarma;

		cmd.Parameters["@rep_dfechahora"].Value = (this._rep_dfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rep_dfechahora;

		cmd.Parameters["@rep_mcomentario"].Value = (this._rep_mcomentario == null) ? (object) DBNull.Value : (object) this._rep_mcomentario;

		cmd.Parameters["@rep_nestado"].Value = this._rep_nestado;

		cmd.Parameters["@rep_dresolfechahora"].Value = (this._rep_dresolfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rep_dresolfechahora;

		cmd.Parameters["@rep_czona"].Value = (this._rep_czona == null) ? (object) DBNull.Value : (object) this._rep_czona;

		cmd.Parameters["@rep_iidrecepcion"].Value = this._rep_iidrecepcion;

		cmd.Parameters["@rep_iresolucion"].Value = this._rep_iresolucion;

		cmd.Parameters["@rep_icategorizacion"].Value = this._rep_icategorizacion;

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
    throw new RuntimeException("The ReporteAutoridades is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("ReporteAutoridadesDel", conn))
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
    using(var CmdSel = new SqlCommand("ReporteAutoridadesSel", conn))
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
    SimpleReporteAutoridades Simple = new SimpleReporteAutoridades();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.rep_cautoridad = this._rep_cautoridad;

      Simple.rep_iidcuenta = this._rep_iidcuenta;

      Simple.rep_calarma = this._rep_calarma;

      Simple.rep_dfechahora = this._rep_dfechahora;

      Simple.rep_mcomentario = this._rep_mcomentario;

      Simple.rep_nestado = this._rep_nestado;

      Simple.rep_dresolfechahora = this._rep_dresolfechahora;

      Simple.rep_czona = this._rep_czona;

      Simple.rep_iidrecepcion = this._rep_iidrecepcion;

      Simple.rep_iresolucion = this._rep_iresolucion;

      Simple.rep_icategorizacion = this._rep_icategorizacion;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleReporteAutoridades)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._rep_cautoridad = Simple.rep_cautoridad;

      this._rep_iidcuenta = Simple.rep_iidcuenta;

      this._rep_calarma = Simple.rep_calarma;

      this._rep_dfechahora = Simple.rep_dfechahora;

      this._rep_mcomentario = Simple.rep_mcomentario;

      this._rep_nestado = Simple.rep_nestado;

      this._rep_dresolfechahora = Simple.rep_dresolfechahora;

      this._rep_czona = Simple.rep_czona;

      this._rep_iidrecepcion = Simple.rep_iidrecepcion;

      this._rep_iresolucion = Simple.rep_iresolucion;

      this._rep_icategorizacion = Simple.rep_icategorizacion;

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
    CallerReporteAutoridades Caller = new CallerReporteAutoridades();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.rep_cautoridad = this._rep_cautoridad;

      Caller.rep_iidcuenta = this._rep_iidcuenta;

      Caller.rep_calarma = this._rep_calarma;

      Caller.rep_dfechahora = this._rep_dfechahora;

      Caller.rep_mcomentario = this._rep_mcomentario;

      Caller.rep_nestado = this._rep_nestado;

      Caller.rep_dresolfechahora = this._rep_dresolfechahora;

      Caller.rep_czona = this._rep_czona;

      Caller.rep_iidrecepcion = this._rep_iidrecepcion;

      Caller.rep_iresolucion = this._rep_iresolucion;

      Caller.rep_icategorizacion = this._rep_icategorizacion;

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
    
      dt.Columns.Add(new DataColumn("rep_cautoridad", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rep_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rep_calarma", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rep_dfechahora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rep_mcomentario", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rep_nestado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("rep_dresolfechahora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("rep_czona", typeof (string)));
    
      dt.Columns.Add(new DataColumn("rep_iidrecepcion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rep_iresolucion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("rep_icategorizacion", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["rep_cautoridad"] = this._rep_cautoridad;

      dr["rep_iidcuenta"] = this._rep_iidcuenta;

      dr["rep_calarma"] = this._rep_calarma;

      dr["rep_dfechahora"] = (object)this._rep_dfechahora  ?? DBNull.Value;

      dr["rep_mcomentario"] = this._rep_mcomentario;

      dr["rep_nestado"] = this._rep_nestado;

      dr["rep_dresolfechahora"] = (object)this._rep_dresolfechahora  ?? DBNull.Value;

      dr["rep_czona"] = this._rep_czona;

      dr["rep_iidrecepcion"] = this._rep_iidrecepcion;

      dr["rep_iresolucion"] = this._rep_iresolucion;

      dr["rep_icategorizacion"] = this._rep_icategorizacion;

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
    using(var CmdChilds = new SqlCommand("ReporteAutoridadesByChildObject", conn))
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
    SimpleReporteAutoridades Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("ReporteAutoridadesByChildObject", conn))
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
    Simple = new SimpleReporteAutoridades();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rep_cautoridad = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.rep_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rep_calarma = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rep_dfechahora = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.rep_mcomentario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rep_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rep_dresolfechahora = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rep_czona = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.rep_iidrecepcion = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rep_iresolucion = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.rep_icategorizacion = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    SimpleReporteAutoridades Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleReporteAutoridades();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.rep_cautoridad = (Row["rep_cautoridad"] == DBNull.Value) ? "" : (string) Row["rep_cautoridad"];

Simple.rep_iidcuenta = (Row["rep_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["rep_iidcuenta"];

Simple.rep_calarma = (Row["rep_calarma"] == DBNull.Value) ? "" : (string) Row["rep_calarma"];

Simple.rep_dfechahora = (Row["rep_dfechahora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rep_dfechahora"];

Simple.rep_mcomentario = (Row["rep_mcomentario"] == DBNull.Value) ? "" : (string) Row["rep_mcomentario"];

Simple.rep_nestado = (Row["rep_nestado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["rep_nestado"];

Simple.rep_dresolfechahora = (Row["rep_dresolfechahora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["rep_dresolfechahora"];

Simple.rep_czona = (Row["rep_czona"] == DBNull.Value) ? "" : (string) Row["rep_czona"];

Simple.rep_iidrecepcion = (Row["rep_iidrecepcion"] == DBNull.Value) ? 0 : (int) Row["rep_iidrecepcion"];

Simple.rep_iresolucion = (Row["rep_iresolucion"] == DBNull.Value) ? 0 : (int) Row["rep_iresolucion"];

Simple.rep_icategorizacion = (Row["rep_icategorizacion"] == DBNull.Value) ? 0 : (int) Row["rep_icategorizacion"];


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
    using(var CmdParents = new SqlCommand("ReporteAutoridadesByParentObject", conn))
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
    SimpleReporteAutoridades Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("ReporteAutoridadesByParentObject", conn))
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
    Simple = new SimpleReporteAutoridades();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rep_cautoridad = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.rep_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rep_calarma = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rep_dfechahora = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.rep_mcomentario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rep_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rep_dresolfechahora = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rep_czona = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.rep_iidrecepcion = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rep_iresolucion = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.rep_icategorizacion = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    using (var CmdDataByName = new SqlCommand("ReporteAutoridadesByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("ReporteAutoridadesByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("ReporteAutoridadesByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("ReporteAutoridadesByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("ReporteAutoridadesByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleReporteAutoridades Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("ReporteAutoridadesBySimpleReporteAutoridades", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@rep_cautoridad", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_dfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rep_mcomentario", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@rep_nestado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@rep_dresolfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@rep_czona", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@rep_iidrecepcion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_iresolucion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@rep_icategorizacion", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@rep_cautoridad"].Value = (this._rep_cautoridad == null) ? (object) DBNull.Value : (object) this._rep_cautoridad;

		cmd.Parameters["@rep_iidcuenta"].Value = this._rep_iidcuenta;

		cmd.Parameters["@rep_calarma"].Value = (this._rep_calarma == null) ? (object) DBNull.Value : (object) this._rep_calarma;

		cmd.Parameters["@rep_dfechahora"].Value = (this._rep_dfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rep_dfechahora;

		cmd.Parameters["@rep_mcomentario"].Value = (this._rep_mcomentario == null) ? (object) DBNull.Value : (object) this._rep_mcomentario;

		cmd.Parameters["@rep_nestado"].Value = this._rep_nestado;

		cmd.Parameters["@rep_dresolfechahora"].Value = (this._rep_dresolfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._rep_dresolfechahora;

		cmd.Parameters["@rep_czona"].Value = (this._rep_czona == null) ? (object) DBNull.Value : (object) this._rep_czona;

		cmd.Parameters["@rep_iidrecepcion"].Value = this._rep_iidrecepcion;

		cmd.Parameters["@rep_iresolucion"].Value = this._rep_iresolucion;

		cmd.Parameters["@rep_icategorizacion"].Value = this._rep_icategorizacion;


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
		 
		public IEnumerable<SimpleReporteAutoridades> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("ReporteAutoridadesByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleReporteAutoridades Simple = new SimpleReporteAutoridades();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rep_cautoridad = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.rep_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rep_calarma = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rep_dfechahora = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.rep_mcomentario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rep_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rep_dresolfechahora = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rep_czona = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.rep_iidrecepcion = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rep_iresolucion = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.rep_icategorizacion = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleReporteAutoridades> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("ReporteAutoridadesByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleReporteAutoridades Simple = new SimpleReporteAutoridades();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.rep_cautoridad = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.rep_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.rep_calarma = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.rep_dfechahora = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)Simple.rep_mcomentario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.rep_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.rep_dresolfechahora = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)Simple.rep_czona = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.rep_iidrecepcion = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.rep_iresolucion = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.rep_icategorizacion = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3052, "ReporteAutoridades");
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
    if (Reader.FieldCount > 2)this._rep_cautoridad = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._rep_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._rep_calarma = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._rep_dfechahora = (Reader.IsDBNull(5)) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
if (Reader.FieldCount > 6)this._rep_mcomentario = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._rep_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._rep_dresolfechahora = (Reader.IsDBNull(8)) ? new DateTime(1,1,1) : Reader.GetDateTime(8);
if (Reader.FieldCount > 9)this._rep_czona = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._rep_iidrecepcion = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._rep_iresolucion = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._rep_icategorizacion = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    }
    Reader.Close();
    }
   }
  
    }
  