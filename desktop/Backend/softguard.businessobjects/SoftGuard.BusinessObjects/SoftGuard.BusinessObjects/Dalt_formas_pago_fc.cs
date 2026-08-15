
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
     ///t_formas_pago_fc data access layer   
     ///</summary>
    public class Dalt_formas_pago_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _fpg_ccodigo;
    
      private string _fpg_cdescripcion;
    
      private string _fpg_cdescripcionreducida;
    
      private Decimal _fpg_npidenumero;
    
      private Decimal _fpg_npidevencimiento;
    
      private Decimal _fpg_npidebanco;
    
      private string _fpg_ctipo;
    
      private int _fpg_mgmcidkey;
    
      private int _fpg_orgidcodigoid;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///fpg_ccodigo   
     ///</summary>
      public string fpg_ccodigo
      {
      
          get{ return this._fpg_ccodigo; }
          set{ this._fpg_ccodigo = value; }
        
      }
     ///<summary>
     ///fpg_cdescripcion   
     ///</summary>
      public string fpg_cdescripcion
      {
      
          get{ return this._fpg_cdescripcion; }
          set{ this._fpg_cdescripcion = value; }
        
      }
     ///<summary>
     ///fpg_cdescripcionreducida   
     ///</summary>
      public string fpg_cdescripcionreducida
      {
      
          get{ return this._fpg_cdescripcionreducida; }
          set{ this._fpg_cdescripcionreducida = value; }
        
      }
     ///<summary>
     ///fpg_npidenumero   
     ///</summary>
      public Decimal fpg_npidenumero
      {
      
          get{ return this._fpg_npidenumero; }
          set{ this._fpg_npidenumero = value; }
        
      }
     ///<summary>
     ///fpg_npidevencimiento   
     ///</summary>
      public Decimal fpg_npidevencimiento
      {
      
          get{ return this._fpg_npidevencimiento; }
          set{ this._fpg_npidevencimiento = value; }
        
      }
     ///<summary>
     ///fpg_npidebanco   
     ///</summary>
      public Decimal fpg_npidebanco
      {
      
          get{ return this._fpg_npidebanco; }
          set{ this._fpg_npidebanco = value; }
        
      }
     ///<summary>
     ///fpg_ctipo   
     ///</summary>
      public string fpg_ctipo
      {
      
          get{ return this._fpg_ctipo; }
          set{ this._fpg_ctipo = value; }
        
      }
     ///<summary>
     ///fpg_mgmcidkey   
     ///</summary>
      public int fpg_mgmcidkey
      {
      
          get{ return this._fpg_mgmcidkey; }
          set{ this._fpg_mgmcidkey = value; }
        
      }
     ///<summary>
     ///fpg_orgidcodigoid   
     ///</summary>
      public int fpg_orgidcodigoid
      {
      
          get{ return this._fpg_orgidcodigoid; }
          set{ this._fpg_orgidcodigoid = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_formas_pago_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_formas_pago_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_formas_pago_fc(SqlHelper SqlConfig, int UserId, Simplet_formas_pago_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._fpg_ccodigo = Simple.fpg_ccodigo;

      this._fpg_cdescripcion = Simple.fpg_cdescripcion;

      this._fpg_cdescripcionreducida = Simple.fpg_cdescripcionreducida;

      this._fpg_npidenumero = Simple.fpg_npidenumero;

      this._fpg_npidevencimiento = Simple.fpg_npidevencimiento;

      this._fpg_npidebanco = Simple.fpg_npidebanco;

      this._fpg_ctipo = Simple.fpg_ctipo;

      this._fpg_mgmcidkey = Simple.fpg_mgmcidkey;

      this._fpg_orgidcodigoid = Simple.fpg_orgidcodigoid;

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
    using(var cmd = new SqlCommand("t_formas_pago_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@fpg_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@fpg_cdescripcionreducida", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_npidenumero", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_npidevencimiento", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_npidebanco", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_ctipo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_mgmcidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@fpg_orgidcodigoid", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@fpg_ccodigo"].Value = (this._fpg_ccodigo == null) ? (object) DBNull.Value : (object) this._fpg_ccodigo;

		cmd.Parameters["@fpg_cdescripcion"].Value = (this._fpg_cdescripcion == null) ? (object) DBNull.Value : (object) this._fpg_cdescripcion;

		cmd.Parameters["@fpg_cdescripcionreducida"].Value = (this._fpg_cdescripcionreducida == null) ? (object) DBNull.Value : (object) this._fpg_cdescripcionreducida;

		cmd.Parameters["@fpg_npidenumero"].Value = this._fpg_npidenumero;

		cmd.Parameters["@fpg_npidevencimiento"].Value = this._fpg_npidevencimiento;

		cmd.Parameters["@fpg_npidebanco"].Value = this._fpg_npidebanco;

		cmd.Parameters["@fpg_ctipo"].Value = (this._fpg_ctipo == null) ? (object) DBNull.Value : (object) this._fpg_ctipo;

		cmd.Parameters["@fpg_mgmcidkey"].Value = this._fpg_mgmcidkey;

		cmd.Parameters["@fpg_orgidcodigoid"].Value = this._fpg_orgidcodigoid;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_formas_pago_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@fpg_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@fpg_cdescripcionreducida", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_npidenumero", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_npidevencimiento", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_npidebanco", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_ctipo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_mgmcidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@fpg_orgidcodigoid", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@fpg_ccodigo"].Value = (this._fpg_ccodigo == null) ? (object) DBNull.Value : (object) this._fpg_ccodigo;

		cmd.Parameters["@fpg_cdescripcion"].Value = (this._fpg_cdescripcion == null) ? (object) DBNull.Value : (object) this._fpg_cdescripcion;

		cmd.Parameters["@fpg_cdescripcionreducida"].Value = (this._fpg_cdescripcionreducida == null) ? (object) DBNull.Value : (object) this._fpg_cdescripcionreducida;

		cmd.Parameters["@fpg_npidenumero"].Value = this._fpg_npidenumero;

		cmd.Parameters["@fpg_npidevencimiento"].Value = this._fpg_npidevencimiento;

		cmd.Parameters["@fpg_npidebanco"].Value = this._fpg_npidebanco;

		cmd.Parameters["@fpg_ctipo"].Value = (this._fpg_ctipo == null) ? (object) DBNull.Value : (object) this._fpg_ctipo;

		cmd.Parameters["@fpg_mgmcidkey"].Value = this._fpg_mgmcidkey;

		cmd.Parameters["@fpg_orgidcodigoid"].Value = this._fpg_orgidcodigoid;

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
    throw new RuntimeException("The t_formas_pago_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_formas_pago_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("t_formas_pago_fcSel", conn))
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
    Simplet_formas_pago_fc Simple = new Simplet_formas_pago_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.fpg_ccodigo = this._fpg_ccodigo;

      Simple.fpg_cdescripcion = this._fpg_cdescripcion;

      Simple.fpg_cdescripcionreducida = this._fpg_cdescripcionreducida;

      Simple.fpg_npidenumero = this._fpg_npidenumero;

      Simple.fpg_npidevencimiento = this._fpg_npidevencimiento;

      Simple.fpg_npidebanco = this._fpg_npidebanco;

      Simple.fpg_ctipo = this._fpg_ctipo;

      Simple.fpg_mgmcidkey = this._fpg_mgmcidkey;

      Simple.fpg_orgidcodigoid = this._fpg_orgidcodigoid;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_formas_pago_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._fpg_ccodigo = Simple.fpg_ccodigo;

      this._fpg_cdescripcion = Simple.fpg_cdescripcion;

      this._fpg_cdescripcionreducida = Simple.fpg_cdescripcionreducida;

      this._fpg_npidenumero = Simple.fpg_npidenumero;

      this._fpg_npidevencimiento = Simple.fpg_npidevencimiento;

      this._fpg_npidebanco = Simple.fpg_npidebanco;

      this._fpg_ctipo = Simple.fpg_ctipo;

      this._fpg_mgmcidkey = Simple.fpg_mgmcidkey;

      this._fpg_orgidcodigoid = Simple.fpg_orgidcodigoid;

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
    Callert_formas_pago_fc Caller = new Callert_formas_pago_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.fpg_ccodigo = this._fpg_ccodigo;

      Caller.fpg_cdescripcion = this._fpg_cdescripcion;

      Caller.fpg_cdescripcionreducida = this._fpg_cdescripcionreducida;

      Caller.fpg_npidenumero = this._fpg_npidenumero;

      Caller.fpg_npidevencimiento = this._fpg_npidevencimiento;

      Caller.fpg_npidebanco = this._fpg_npidebanco;

      Caller.fpg_ctipo = this._fpg_ctipo;

      Caller.fpg_mgmcidkey = this._fpg_mgmcidkey;

      Caller.fpg_orgidcodigoid = this._fpg_orgidcodigoid;

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
    
      dt.Columns.Add(new DataColumn("fpg_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("fpg_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("fpg_cdescripcionreducida", typeof (string)));
    
      dt.Columns.Add(new DataColumn("fpg_npidenumero", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("fpg_npidevencimiento", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("fpg_npidebanco", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("fpg_ctipo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("fpg_mgmcidkey", typeof (int)));
    
      dt.Columns.Add(new DataColumn("fpg_orgidcodigoid", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["fpg_ccodigo"] = this._fpg_ccodigo;

      dr["fpg_cdescripcion"] = this._fpg_cdescripcion;

      dr["fpg_cdescripcionreducida"] = this._fpg_cdescripcionreducida;

      dr["fpg_npidenumero"] = this._fpg_npidenumero;

      dr["fpg_npidevencimiento"] = this._fpg_npidevencimiento;

      dr["fpg_npidebanco"] = this._fpg_npidebanco;

      dr["fpg_ctipo"] = this._fpg_ctipo;

      dr["fpg_mgmcidkey"] = this._fpg_mgmcidkey;

      dr["fpg_orgidcodigoid"] = this._fpg_orgidcodigoid;

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
    using(var CmdChilds = new SqlCommand("t_formas_pago_fcByChildObject", conn))
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
    Simplet_formas_pago_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_formas_pago_fcByChildObject", conn))
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
    Simple = new Simplet_formas_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.fpg_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.fpg_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.fpg_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.fpg_npidenumero = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.fpg_npidevencimiento = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.fpg_npidebanco = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.fpg_ctipo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.fpg_mgmcidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.fpg_orgidcodigoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);


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
    Simplet_formas_pago_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_formas_pago_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.fpg_ccodigo = (Row["fpg_ccodigo"] == DBNull.Value) ? "" : (string) Row["fpg_ccodigo"];

Simple.fpg_cdescripcion = (Row["fpg_cdescripcion"] == DBNull.Value) ? "" : (string) Row["fpg_cdescripcion"];

Simple.fpg_cdescripcionreducida = (Row["fpg_cdescripcionreducida"] == DBNull.Value) ? "" : (string) Row["fpg_cdescripcionreducida"];

Simple.fpg_npidenumero = (Row["fpg_npidenumero"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["fpg_npidenumero"];

Simple.fpg_npidevencimiento = (Row["fpg_npidevencimiento"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["fpg_npidevencimiento"];

Simple.fpg_npidebanco = (Row["fpg_npidebanco"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["fpg_npidebanco"];

Simple.fpg_ctipo = (Row["fpg_ctipo"] == DBNull.Value) ? "" : (string) Row["fpg_ctipo"];

Simple.fpg_mgmcidkey = (Row["fpg_mgmcidkey"] == DBNull.Value) ? 0 : (int) Row["fpg_mgmcidkey"];

Simple.fpg_orgidcodigoid = (Row["fpg_orgidcodigoid"] == DBNull.Value) ? 0 : (int) Row["fpg_orgidcodigoid"];


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
    using(var CmdParents = new SqlCommand("t_formas_pago_fcByParentObject", conn))
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
    Simplet_formas_pago_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_formas_pago_fcByParentObject", conn))
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
    Simple = new Simplet_formas_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.fpg_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.fpg_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.fpg_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.fpg_npidenumero = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.fpg_npidevencimiento = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.fpg_npidebanco = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.fpg_ctipo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.fpg_mgmcidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.fpg_orgidcodigoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);


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
    using (var CmdDataByName = new SqlCommand("t_formas_pago_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_formas_pago_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_formas_pago_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_formas_pago_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_formas_pago_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_formas_pago_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_formas_pago_fcBySimplet_formas_pago_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@fpg_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@fpg_cdescripcionreducida", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_npidenumero", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_npidevencimiento", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_npidebanco", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@fpg_ctipo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@fpg_mgmcidkey", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@fpg_orgidcodigoid", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@fpg_ccodigo"].Value = (this._fpg_ccodigo == null) ? (object) DBNull.Value : (object) this._fpg_ccodigo;

		cmd.Parameters["@fpg_cdescripcion"].Value = (this._fpg_cdescripcion == null) ? (object) DBNull.Value : (object) this._fpg_cdescripcion;

		cmd.Parameters["@fpg_cdescripcionreducida"].Value = (this._fpg_cdescripcionreducida == null) ? (object) DBNull.Value : (object) this._fpg_cdescripcionreducida;

		cmd.Parameters["@fpg_npidenumero"].Value = this._fpg_npidenumero;

		cmd.Parameters["@fpg_npidevencimiento"].Value = this._fpg_npidevencimiento;

		cmd.Parameters["@fpg_npidebanco"].Value = this._fpg_npidebanco;

		cmd.Parameters["@fpg_ctipo"].Value = (this._fpg_ctipo == null) ? (object) DBNull.Value : (object) this._fpg_ctipo;

		cmd.Parameters["@fpg_mgmcidkey"].Value = this._fpg_mgmcidkey;

		cmd.Parameters["@fpg_orgidcodigoid"].Value = this._fpg_orgidcodigoid;


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
		 
		public IEnumerable<Simplet_formas_pago_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_formas_pago_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_formas_pago_fc Simple = new Simplet_formas_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.fpg_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.fpg_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.fpg_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.fpg_npidenumero = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.fpg_npidevencimiento = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.fpg_npidebanco = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.fpg_ctipo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.fpg_mgmcidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.fpg_orgidcodigoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_formas_pago_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_formas_pago_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_formas_pago_fc Simple = new Simplet_formas_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.fpg_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.fpg_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.fpg_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.fpg_npidenumero = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.fpg_npidevencimiento = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)Simple.fpg_npidebanco = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.fpg_ctipo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.fpg_mgmcidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.fpg_orgidcodigoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3144, "t_formas_pago_fc");
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
    if (Reader.FieldCount > 2)this._fpg_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._fpg_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._fpg_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._fpg_npidenumero = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)this._fpg_npidevencimiento = (Reader.IsDBNull(6)) ? new Decimal(0) : Reader.GetDecimal(6);
if (Reader.FieldCount > 7)this._fpg_npidebanco = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._fpg_ctipo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._fpg_mgmcidkey = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._fpg_orgidcodigoid = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);

    }
    Reader.Close();
    }
   }
  
    }
  