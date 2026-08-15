
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
     ///ZonaPlanilla data access layer   
     ///</summary>
    public class DalZonaPlanilla : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _zon_iid;
    
      private string _zon_ccodigo;
    
      private string _zon_cdescripcion;
    
      private string _zon_codigoalarma;
    
      private string _zon_clistaemergencia;
    
      private string _zon_cimagen;
    
      private string _zon_mobservacion;
    
      private string _zon_ccodigorestauracion;
    
      private Decimal _zon_nminutosrestauracion;
    
      private Decimal _zon_nmostrar;
    
      private string _zon_cdealer;
    
      private string _zon_ccuenta;
    
      private Decimal _zon_nautoprocesa;
    
      private string _zon_calarmaagenerar;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///zon_iid   
     ///</summary>
      public int zon_iid
      {
      
          get{ return this._zon_iid; }
          set{ this._zon_iid = value; }
        
      }
     ///<summary>
     ///zon_ccodigo   
     ///</summary>
      public string zon_ccodigo
      {
      
          get{ return this._zon_ccodigo; }
          set{ this._zon_ccodigo = value; }
        
      }
     ///<summary>
     ///zon_cdescripcion   
     ///</summary>
      public string zon_cdescripcion
      {
      
          get{ return this._zon_cdescripcion; }
          set{ this._zon_cdescripcion = value; }
        
      }
     ///<summary>
     ///zon_codigoalarma   
     ///</summary>
      public string zon_codigoalarma
      {
      
          get{ return this._zon_codigoalarma; }
          set{ this._zon_codigoalarma = value; }
        
      }
     ///<summary>
     ///zon_clistaemergencia   
     ///</summary>
      public string zon_clistaemergencia
      {
      
          get{ return this._zon_clistaemergencia; }
          set{ this._zon_clistaemergencia = value; }
        
      }
     ///<summary>
     ///zon_cimagen   
     ///</summary>
      public string zon_cimagen
      {
      
          get{ return this._zon_cimagen; }
          set{ this._zon_cimagen = value; }
        
      }
     ///<summary>
     ///zon_mobservacion   
     ///</summary>
      public string zon_mobservacion
      {
      
          get{ return this._zon_mobservacion; }
          set{ this._zon_mobservacion = value; }
        
      }
     ///<summary>
     ///zon_ccodigorestauracion   
     ///</summary>
      public string zon_ccodigorestauracion
      {
      
          get{ return this._zon_ccodigorestauracion; }
          set{ this._zon_ccodigorestauracion = value; }
        
      }
     ///<summary>
     ///zon_nminutosrestauracion   
     ///</summary>
      public Decimal zon_nminutosrestauracion
      {
      
          get{ return this._zon_nminutosrestauracion; }
          set{ this._zon_nminutosrestauracion = value; }
        
      }
     ///<summary>
     ///zon_nmostrar   
     ///</summary>
      public Decimal zon_nmostrar
      {
      
          get{ return this._zon_nmostrar; }
          set{ this._zon_nmostrar = value; }
        
      }
     ///<summary>
     ///zon_cdealer   
     ///</summary>
      public string zon_cdealer
      {
      
          get{ return this._zon_cdealer; }
          set{ this._zon_cdealer = value; }
        
      }
     ///<summary>
     ///zon_ccuenta   
     ///</summary>
      public string zon_ccuenta
      {
      
          get{ return this._zon_ccuenta; }
          set{ this._zon_ccuenta = value; }
        
      }
     ///<summary>
     ///zon_nautoprocesa   
     ///</summary>
      public Decimal zon_nautoprocesa
      {
      
          get{ return this._zon_nautoprocesa; }
          set{ this._zon_nautoprocesa = value; }
        
      }
     ///<summary>
     ///zon_calarmaagenerar   
     ///</summary>
      public string zon_calarmaagenerar
      {
      
          get{ return this._zon_calarmaagenerar; }
          set{ this._zon_calarmaagenerar = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalZonaPlanilla(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalZonaPlanilla(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalZonaPlanilla(SqlHelper SqlConfig, int UserId, SimpleZonaPlanilla Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._zon_iid = Simple.zon_iid;

      this._zon_ccodigo = Simple.zon_ccodigo;

      this._zon_cdescripcion = Simple.zon_cdescripcion;

      this._zon_codigoalarma = Simple.zon_codigoalarma;

      this._zon_clistaemergencia = Simple.zon_clistaemergencia;

      this._zon_cimagen = Simple.zon_cimagen;

      this._zon_mobservacion = Simple.zon_mobservacion;

      this._zon_ccodigorestauracion = Simple.zon_ccodigorestauracion;

      this._zon_nminutosrestauracion = Simple.zon_nminutosrestauracion;

      this._zon_nmostrar = Simple.zon_nmostrar;

      this._zon_cdealer = Simple.zon_cdealer;

      this._zon_ccuenta = Simple.zon_ccuenta;

      this._zon_nautoprocesa = Simple.zon_nautoprocesa;

      this._zon_calarmaagenerar = Simple.zon_calarmaagenerar;

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
    using(var cmd = new SqlCommand("ZonaPlanillaIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@zon_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_clistaemergencia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@zon_mobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@zon_ccodigorestauracion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_nminutosrestauracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_cdealer", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_ccuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_nautoprocesa", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_calarmaagenerar", SqlDbType.NChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@zon_iid"].Value = this._zon_iid;

		cmd.Parameters["@zon_ccodigo"].Value = (this._zon_ccodigo == null) ? (object) DBNull.Value : (object) this._zon_ccodigo;

		cmd.Parameters["@zon_cdescripcion"].Value = (this._zon_cdescripcion == null) ? (object) DBNull.Value : (object) this._zon_cdescripcion;

		cmd.Parameters["@zon_codigoalarma"].Value = (this._zon_codigoalarma == null) ? (object) DBNull.Value : (object) this._zon_codigoalarma;

		cmd.Parameters["@zon_clistaemergencia"].Value = (this._zon_clistaemergencia == null) ? (object) DBNull.Value : (object) this._zon_clistaemergencia;

		cmd.Parameters["@zon_cimagen"].Value = (this._zon_cimagen == null) ? (object) DBNull.Value : (object) this._zon_cimagen;

		cmd.Parameters["@zon_mobservacion"].Value = (this._zon_mobservacion == null) ? (object) DBNull.Value : (object) this._zon_mobservacion;

		cmd.Parameters["@zon_ccodigorestauracion"].Value = (this._zon_ccodigorestauracion == null) ? (object) DBNull.Value : (object) this._zon_ccodigorestauracion;

		cmd.Parameters["@zon_nminutosrestauracion"].Value = this._zon_nminutosrestauracion;

		cmd.Parameters["@zon_nmostrar"].Value = this._zon_nmostrar;

		cmd.Parameters["@zon_cdealer"].Value = (this._zon_cdealer == null) ? (object) DBNull.Value : (object) this._zon_cdealer;

		cmd.Parameters["@zon_ccuenta"].Value = (this._zon_ccuenta == null) ? (object) DBNull.Value : (object) this._zon_ccuenta;

		cmd.Parameters["@zon_nautoprocesa"].Value = this._zon_nautoprocesa;

		cmd.Parameters["@zon_calarmaagenerar"].Value = (this._zon_calarmaagenerar == null) ? (object) DBNull.Value : (object) this._zon_calarmaagenerar;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("ZonaPlanillaUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@zon_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_clistaemergencia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@zon_mobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@zon_ccodigorestauracion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_nminutosrestauracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_cdealer", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_ccuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_nautoprocesa", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_calarmaagenerar", SqlDbType.NChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@zon_iid"].Value = this._zon_iid;

		cmd.Parameters["@zon_ccodigo"].Value = (this._zon_ccodigo == null) ? (object) DBNull.Value : (object) this._zon_ccodigo;

		cmd.Parameters["@zon_cdescripcion"].Value = (this._zon_cdescripcion == null) ? (object) DBNull.Value : (object) this._zon_cdescripcion;

		cmd.Parameters["@zon_codigoalarma"].Value = (this._zon_codigoalarma == null) ? (object) DBNull.Value : (object) this._zon_codigoalarma;

		cmd.Parameters["@zon_clistaemergencia"].Value = (this._zon_clistaemergencia == null) ? (object) DBNull.Value : (object) this._zon_clistaemergencia;

		cmd.Parameters["@zon_cimagen"].Value = (this._zon_cimagen == null) ? (object) DBNull.Value : (object) this._zon_cimagen;

		cmd.Parameters["@zon_mobservacion"].Value = (this._zon_mobservacion == null) ? (object) DBNull.Value : (object) this._zon_mobservacion;

		cmd.Parameters["@zon_ccodigorestauracion"].Value = (this._zon_ccodigorestauracion == null) ? (object) DBNull.Value : (object) this._zon_ccodigorestauracion;

		cmd.Parameters["@zon_nminutosrestauracion"].Value = this._zon_nminutosrestauracion;

		cmd.Parameters["@zon_nmostrar"].Value = this._zon_nmostrar;

		cmd.Parameters["@zon_cdealer"].Value = (this._zon_cdealer == null) ? (object) DBNull.Value : (object) this._zon_cdealer;

		cmd.Parameters["@zon_ccuenta"].Value = (this._zon_ccuenta == null) ? (object) DBNull.Value : (object) this._zon_ccuenta;

		cmd.Parameters["@zon_nautoprocesa"].Value = this._zon_nautoprocesa;

		cmd.Parameters["@zon_calarmaagenerar"].Value = (this._zon_calarmaagenerar == null) ? (object) DBNull.Value : (object) this._zon_calarmaagenerar;

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
    throw new RuntimeException("The ZonaPlanilla is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("ZonaPlanillaDel", conn))
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
    using(var CmdSel = new SqlCommand("ZonaPlanillaSel", conn))
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
    SimpleZonaPlanilla Simple = new SimpleZonaPlanilla();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.zon_iid = this._zon_iid;

      Simple.zon_ccodigo = this._zon_ccodigo;

      Simple.zon_cdescripcion = this._zon_cdescripcion;

      Simple.zon_codigoalarma = this._zon_codigoalarma;

      Simple.zon_clistaemergencia = this._zon_clistaemergencia;

      Simple.zon_cimagen = this._zon_cimagen;

      Simple.zon_mobservacion = this._zon_mobservacion;

      Simple.zon_ccodigorestauracion = this._zon_ccodigorestauracion;

      Simple.zon_nminutosrestauracion = this._zon_nminutosrestauracion;

      Simple.zon_nmostrar = this._zon_nmostrar;

      Simple.zon_cdealer = this._zon_cdealer;

      Simple.zon_ccuenta = this._zon_ccuenta;

      Simple.zon_nautoprocesa = this._zon_nautoprocesa;

      Simple.zon_calarmaagenerar = this._zon_calarmaagenerar;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleZonaPlanilla)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._zon_iid = Simple.zon_iid;

      this._zon_ccodigo = Simple.zon_ccodigo;

      this._zon_cdescripcion = Simple.zon_cdescripcion;

      this._zon_codigoalarma = Simple.zon_codigoalarma;

      this._zon_clistaemergencia = Simple.zon_clistaemergencia;

      this._zon_cimagen = Simple.zon_cimagen;

      this._zon_mobservacion = Simple.zon_mobservacion;

      this._zon_ccodigorestauracion = Simple.zon_ccodigorestauracion;

      this._zon_nminutosrestauracion = Simple.zon_nminutosrestauracion;

      this._zon_nmostrar = Simple.zon_nmostrar;

      this._zon_cdealer = Simple.zon_cdealer;

      this._zon_ccuenta = Simple.zon_ccuenta;

      this._zon_nautoprocesa = Simple.zon_nautoprocesa;

      this._zon_calarmaagenerar = Simple.zon_calarmaagenerar;

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
    CallerZonaPlanilla Caller = new CallerZonaPlanilla();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.zon_iid = this._zon_iid;

      Caller.zon_ccodigo = this._zon_ccodigo;

      Caller.zon_cdescripcion = this._zon_cdescripcion;

      Caller.zon_codigoalarma = this._zon_codigoalarma;

      Caller.zon_clistaemergencia = this._zon_clistaemergencia;

      Caller.zon_cimagen = this._zon_cimagen;

      Caller.zon_mobservacion = this._zon_mobservacion;

      Caller.zon_ccodigorestauracion = this._zon_ccodigorestauracion;

      Caller.zon_nminutosrestauracion = this._zon_nminutosrestauracion;

      Caller.zon_nmostrar = this._zon_nmostrar;

      Caller.zon_cdealer = this._zon_cdealer;

      Caller.zon_ccuenta = this._zon_ccuenta;

      Caller.zon_nautoprocesa = this._zon_nautoprocesa;

      Caller.zon_calarmaagenerar = this._zon_calarmaagenerar;

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
    
      dt.Columns.Add(new DataColumn("zon_iid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_clistaemergencia", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_mobservacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_ccodigorestauracion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_nminutosrestauracion", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("zon_nmostrar", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("zon_cdealer", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_ccuenta", typeof (string)));
    
      dt.Columns.Add(new DataColumn("zon_nautoprocesa", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("zon_calarmaagenerar", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["zon_iid"] = this._zon_iid;

      dr["zon_ccodigo"] = this._zon_ccodigo;

      dr["zon_cdescripcion"] = this._zon_cdescripcion;

      dr["zon_codigoalarma"] = this._zon_codigoalarma;

      dr["zon_clistaemergencia"] = this._zon_clistaemergencia;

      dr["zon_cimagen"] = this._zon_cimagen;

      dr["zon_mobservacion"] = this._zon_mobservacion;

      dr["zon_ccodigorestauracion"] = this._zon_ccodigorestauracion;

      dr["zon_nminutosrestauracion"] = this._zon_nminutosrestauracion;

      dr["zon_nmostrar"] = this._zon_nmostrar;

      dr["zon_cdealer"] = this._zon_cdealer;

      dr["zon_ccuenta"] = this._zon_ccuenta;

      dr["zon_nautoprocesa"] = this._zon_nautoprocesa;

      dr["zon_calarmaagenerar"] = this._zon_calarmaagenerar;

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
    using(var CmdChilds = new SqlCommand("ZonaPlanillaByChildObject", conn))
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
    SimpleZonaPlanilla Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("ZonaPlanillaByChildObject", conn))
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
    Simple = new SimpleZonaPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.zon_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.zon_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.zon_cdescripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.zon_codigoalarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.zon_clistaemergencia = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.zon_cimagen = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.zon_mobservacion = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.zon_ccodigorestauracion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.zon_nminutosrestauracion = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.zon_nmostrar = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.zon_cdealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.zon_ccuenta = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.zon_nautoprocesa = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.zon_calarmaagenerar = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);


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
    SimpleZonaPlanilla Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleZonaPlanilla();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.zon_iid = (Row["zon_iid"] == DBNull.Value) ? 0 : (int) Row["zon_iid"];

Simple.zon_ccodigo = (Row["zon_ccodigo"] == DBNull.Value) ? "" : (string) Row["zon_ccodigo"];

Simple.zon_cdescripcion = (Row["zon_cdescripcion"] == DBNull.Value) ? "" : (string) Row["zon_cdescripcion"];

Simple.zon_codigoalarma = (Row["zon_codigoalarma"] == DBNull.Value) ? "" : (string) Row["zon_codigoalarma"];

Simple.zon_clistaemergencia = (Row["zon_clistaemergencia"] == DBNull.Value) ? "" : (string) Row["zon_clistaemergencia"];

Simple.zon_cimagen = (Row["zon_cimagen"] == DBNull.Value) ? "" : (string) Row["zon_cimagen"];

Simple.zon_mobservacion = (Row["zon_mobservacion"] == DBNull.Value) ? "" : (string) Row["zon_mobservacion"];

Simple.zon_ccodigorestauracion = (Row["zon_ccodigorestauracion"] == DBNull.Value) ? "" : (string) Row["zon_ccodigorestauracion"];

Simple.zon_nminutosrestauracion = (Row["zon_nminutosrestauracion"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["zon_nminutosrestauracion"];

Simple.zon_nmostrar = (Row["zon_nmostrar"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["zon_nmostrar"];

Simple.zon_cdealer = (Row["zon_cdealer"] == DBNull.Value) ? "" : (string) Row["zon_cdealer"];

Simple.zon_ccuenta = (Row["zon_ccuenta"] == DBNull.Value) ? "" : (string) Row["zon_ccuenta"];

Simple.zon_nautoprocesa = (Row["zon_nautoprocesa"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["zon_nautoprocesa"];

Simple.zon_calarmaagenerar = (Row["zon_calarmaagenerar"] == DBNull.Value) ? "" : (string) Row["zon_calarmaagenerar"];


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
    using(var CmdParents = new SqlCommand("ZonaPlanillaByParentObject", conn))
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
    SimpleZonaPlanilla Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("ZonaPlanillaByParentObject", conn))
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
    Simple = new SimpleZonaPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.zon_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.zon_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.zon_cdescripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.zon_codigoalarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.zon_clistaemergencia = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.zon_cimagen = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.zon_mobservacion = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.zon_ccodigorestauracion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.zon_nminutosrestauracion = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.zon_nmostrar = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.zon_cdealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.zon_ccuenta = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.zon_nautoprocesa = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.zon_calarmaagenerar = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);


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
    using (var CmdDataByName = new SqlCommand("ZonaPlanillaByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("ZonaPlanillaByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("ZonaPlanillaByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("ZonaPlanillaByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("ZonaPlanillaByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleZonaPlanilla Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("ZonaPlanillaBySimpleZonaPlanilla", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@zon_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_clistaemergencia", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@zon_mobservacion", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@zon_ccodigorestauracion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_nminutosrestauracion", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_nmostrar", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_cdealer", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_ccuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@zon_nautoprocesa", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@zon_calarmaagenerar", SqlDbType.NChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@zon_iid"].Value = this._zon_iid;

		cmd.Parameters["@zon_ccodigo"].Value = (this._zon_ccodigo == null) ? (object) DBNull.Value : (object) this._zon_ccodigo;

		cmd.Parameters["@zon_cdescripcion"].Value = (this._zon_cdescripcion == null) ? (object) DBNull.Value : (object) this._zon_cdescripcion;

		cmd.Parameters["@zon_codigoalarma"].Value = (this._zon_codigoalarma == null) ? (object) DBNull.Value : (object) this._zon_codigoalarma;

		cmd.Parameters["@zon_clistaemergencia"].Value = (this._zon_clistaemergencia == null) ? (object) DBNull.Value : (object) this._zon_clistaemergencia;

		cmd.Parameters["@zon_cimagen"].Value = (this._zon_cimagen == null) ? (object) DBNull.Value : (object) this._zon_cimagen;

		cmd.Parameters["@zon_mobservacion"].Value = (this._zon_mobservacion == null) ? (object) DBNull.Value : (object) this._zon_mobservacion;

		cmd.Parameters["@zon_ccodigorestauracion"].Value = (this._zon_ccodigorestauracion == null) ? (object) DBNull.Value : (object) this._zon_ccodigorestauracion;

		cmd.Parameters["@zon_nminutosrestauracion"].Value = this._zon_nminutosrestauracion;

		cmd.Parameters["@zon_nmostrar"].Value = this._zon_nmostrar;

		cmd.Parameters["@zon_cdealer"].Value = (this._zon_cdealer == null) ? (object) DBNull.Value : (object) this._zon_cdealer;

		cmd.Parameters["@zon_ccuenta"].Value = (this._zon_ccuenta == null) ? (object) DBNull.Value : (object) this._zon_ccuenta;

		cmd.Parameters["@zon_nautoprocesa"].Value = this._zon_nautoprocesa;

		cmd.Parameters["@zon_calarmaagenerar"].Value = (this._zon_calarmaagenerar == null) ? (object) DBNull.Value : (object) this._zon_calarmaagenerar;


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
		 
		public IEnumerable<SimpleZonaPlanilla> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("ZonaPlanillaByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleZonaPlanilla Simple = new SimpleZonaPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.zon_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.zon_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.zon_cdescripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.zon_codigoalarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.zon_clistaemergencia = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.zon_cimagen = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.zon_mobservacion = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.zon_ccodigorestauracion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.zon_nminutosrestauracion = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.zon_nmostrar = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.zon_cdealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.zon_ccuenta = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.zon_nautoprocesa = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.zon_calarmaagenerar = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleZonaPlanilla> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("ZonaPlanillaByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleZonaPlanilla Simple = new SimpleZonaPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.zon_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.zon_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.zon_cdescripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.zon_codigoalarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.zon_clistaemergencia = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.zon_cimagen = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.zon_mobservacion = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.zon_ccodigorestauracion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.zon_nminutosrestauracion = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.zon_nmostrar = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.zon_cdealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.zon_ccuenta = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.zon_nautoprocesa = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)Simple.zon_calarmaagenerar = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3015, "ZonaPlanilla");
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
    if (Reader.FieldCount > 2)this._zon_iid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._zon_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._zon_cdescripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._zon_codigoalarma = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._zon_clistaemergencia = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._zon_cimagen = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._zon_mobservacion = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._zon_ccodigorestauracion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._zon_nminutosrestauracion = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)this._zon_nmostrar = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)this._zon_cdealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._zon_ccuenta = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._zon_nautoprocesa = (Reader.IsDBNull(14)) ? new Decimal(0) : Reader.GetDecimal(14);
if (Reader.FieldCount > 15)this._zon_calarmaagenerar = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);

    }
    Reader.Close();
    }
   }
  
    }
  