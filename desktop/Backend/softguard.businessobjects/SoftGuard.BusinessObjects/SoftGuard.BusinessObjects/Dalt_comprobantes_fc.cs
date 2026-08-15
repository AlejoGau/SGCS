
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
     ///t_comprobantes_fc data access layer   
     ///</summary>
    public class Dalt_comprobantes_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _cbt_ccodigo;
    
      private string _cbt_cdescripcion;
    
      private string _cbt_cdescripcionreducida;
    
      private int _cbt_ntipo;
    
      private string _cbt_cletra;
    
      private string _cbt_cprefijo;
    
      private int _cbt_inumero;
    
      private int _cbt_ncopias;
    
      private string _cbt_casociado;
    
      private int _cbt_nCbteCAE;
    
      private int _cbt_idOrganizacionFacturadora;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cbt_ccodigo   
     ///</summary>
      public string cbt_ccodigo
      {
      
          get{ return this._cbt_ccodigo; }
          set{ this._cbt_ccodigo = value; }
        
      }
     ///<summary>
     ///cbt_cdescripcion   
     ///</summary>
      public string cbt_cdescripcion
      {
      
          get{ return this._cbt_cdescripcion; }
          set{ this._cbt_cdescripcion = value; }
        
      }
     ///<summary>
     ///cbt_cdescripcionreducida   
     ///</summary>
      public string cbt_cdescripcionreducida
      {
      
          get{ return this._cbt_cdescripcionreducida; }
          set{ this._cbt_cdescripcionreducida = value; }
        
      }
     ///<summary>
     ///cbt_ntipo   
     ///</summary>
      public int cbt_ntipo
      {
      
          get{ return this._cbt_ntipo; }
          set{ this._cbt_ntipo = value; }
        
      }
     ///<summary>
     ///cbt_cletra   
     ///</summary>
      public string cbt_cletra
      {
      
          get{ return this._cbt_cletra; }
          set{ this._cbt_cletra = value; }
        
      }
     ///<summary>
     ///cbt_cprefijo   
     ///</summary>
      public string cbt_cprefijo
      {
      
          get{ return this._cbt_cprefijo; }
          set{ this._cbt_cprefijo = value; }
        
      }
     ///<summary>
     ///cbt_inumero   
     ///</summary>
      public int cbt_inumero
      {
      
          get{ return this._cbt_inumero; }
          set{ this._cbt_inumero = value; }
        
      }
     ///<summary>
     ///cbt_ncopias   
     ///</summary>
      public int cbt_ncopias
      {
      
          get{ return this._cbt_ncopias; }
          set{ this._cbt_ncopias = value; }
        
      }
     ///<summary>
     ///cbt_casociado   
     ///</summary>
      public string cbt_casociado
      {
      
          get{ return this._cbt_casociado; }
          set{ this._cbt_casociado = value; }
        
      }
     ///<summary>
     ///cbt_nCbteCAE   
     ///</summary>
      public int cbt_nCbteCAE
      {
      
          get{ return this._cbt_nCbteCAE; }
          set{ this._cbt_nCbteCAE = value; }
        
      }
     ///<summary>
     ///cbt_idOrganizacionFacturadora   
     ///</summary>
      public int cbt_idOrganizacionFacturadora
      {
      
          get{ return this._cbt_idOrganizacionFacturadora; }
          set{ this._cbt_idOrganizacionFacturadora = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_comprobantes_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_comprobantes_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_comprobantes_fc(SqlHelper SqlConfig, int UserId, Simplet_comprobantes_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cbt_ccodigo = Simple.cbt_ccodigo;

      this._cbt_cdescripcion = Simple.cbt_cdescripcion;

      this._cbt_cdescripcionreducida = Simple.cbt_cdescripcionreducida;

      this._cbt_ntipo = Simple.cbt_ntipo;

      this._cbt_cletra = Simple.cbt_cletra;

      this._cbt_cprefijo = Simple.cbt_cprefijo;

      this._cbt_inumero = Simple.cbt_inumero;

      this._cbt_ncopias = Simple.cbt_ncopias;

      this._cbt_casociado = Simple.cbt_casociado;

      this._cbt_nCbteCAE = Simple.cbt_nCbteCAE;

      this._cbt_idOrganizacionFacturadora = Simple.cbt_idOrganizacionFacturadora;

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
    using(var cmd = new SqlCommand("t_comprobantes_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbt_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cdescripcion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cdescripcionreducida", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_cletra", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cprefijo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_ncopias", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_casociado", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_nCbteCAE", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_idOrganizacionFacturadora", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cbt_ccodigo"].Value = (this._cbt_ccodigo == null) ? (object) DBNull.Value : (object) this._cbt_ccodigo;

		cmd.Parameters["@cbt_cdescripcion"].Value = (this._cbt_cdescripcion == null) ? (object) DBNull.Value : (object) this._cbt_cdescripcion;

		cmd.Parameters["@cbt_cdescripcionreducida"].Value = (this._cbt_cdescripcionreducida == null) ? (object) DBNull.Value : (object) this._cbt_cdescripcionreducida;

		cmd.Parameters["@cbt_ntipo"].Value = this._cbt_ntipo;

		cmd.Parameters["@cbt_cletra"].Value = (this._cbt_cletra == null) ? (object) DBNull.Value : (object) this._cbt_cletra;

		cmd.Parameters["@cbt_cprefijo"].Value = (this._cbt_cprefijo == null) ? (object) DBNull.Value : (object) this._cbt_cprefijo;

		cmd.Parameters["@cbt_inumero"].Value = this._cbt_inumero;

		cmd.Parameters["@cbt_ncopias"].Value = this._cbt_ncopias;

		cmd.Parameters["@cbt_casociado"].Value = (this._cbt_casociado == null) ? (object) DBNull.Value : (object) this._cbt_casociado;

		cmd.Parameters["@cbt_nCbteCAE"].Value = this._cbt_nCbteCAE;

		cmd.Parameters["@cbt_idOrganizacionFacturadora"].Value = this._cbt_idOrganizacionFacturadora;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_comprobantes_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbt_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cdescripcion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cdescripcionreducida", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_cletra", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cprefijo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_ncopias", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_casociado", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_nCbteCAE", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_idOrganizacionFacturadora", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cbt_ccodigo"].Value = (this._cbt_ccodigo == null) ? (object) DBNull.Value : (object) this._cbt_ccodigo;

		cmd.Parameters["@cbt_cdescripcion"].Value = (this._cbt_cdescripcion == null) ? (object) DBNull.Value : (object) this._cbt_cdescripcion;

		cmd.Parameters["@cbt_cdescripcionreducida"].Value = (this._cbt_cdescripcionreducida == null) ? (object) DBNull.Value : (object) this._cbt_cdescripcionreducida;

		cmd.Parameters["@cbt_ntipo"].Value = this._cbt_ntipo;

		cmd.Parameters["@cbt_cletra"].Value = (this._cbt_cletra == null) ? (object) DBNull.Value : (object) this._cbt_cletra;

		cmd.Parameters["@cbt_cprefijo"].Value = (this._cbt_cprefijo == null) ? (object) DBNull.Value : (object) this._cbt_cprefijo;

		cmd.Parameters["@cbt_inumero"].Value = this._cbt_inumero;

		cmd.Parameters["@cbt_ncopias"].Value = this._cbt_ncopias;

		cmd.Parameters["@cbt_casociado"].Value = (this._cbt_casociado == null) ? (object) DBNull.Value : (object) this._cbt_casociado;

		cmd.Parameters["@cbt_nCbteCAE"].Value = this._cbt_nCbteCAE;

		cmd.Parameters["@cbt_idOrganizacionFacturadora"].Value = this._cbt_idOrganizacionFacturadora;

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
    throw new RuntimeException("The t_comprobantes_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_comprobantes_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("t_comprobantes_fcSel", conn))
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
    Simplet_comprobantes_fc Simple = new Simplet_comprobantes_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cbt_ccodigo = this._cbt_ccodigo;

      Simple.cbt_cdescripcion = this._cbt_cdescripcion;

      Simple.cbt_cdescripcionreducida = this._cbt_cdescripcionreducida;

      Simple.cbt_ntipo = this._cbt_ntipo;

      Simple.cbt_cletra = this._cbt_cletra;

      Simple.cbt_cprefijo = this._cbt_cprefijo;

      Simple.cbt_inumero = this._cbt_inumero;

      Simple.cbt_ncopias = this._cbt_ncopias;

      Simple.cbt_casociado = this._cbt_casociado;

      Simple.cbt_nCbteCAE = this._cbt_nCbteCAE;

      Simple.cbt_idOrganizacionFacturadora = this._cbt_idOrganizacionFacturadora;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_comprobantes_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cbt_ccodigo = Simple.cbt_ccodigo;

      this._cbt_cdescripcion = Simple.cbt_cdescripcion;

      this._cbt_cdescripcionreducida = Simple.cbt_cdescripcionreducida;

      this._cbt_ntipo = Simple.cbt_ntipo;

      this._cbt_cletra = Simple.cbt_cletra;

      this._cbt_cprefijo = Simple.cbt_cprefijo;

      this._cbt_inumero = Simple.cbt_inumero;

      this._cbt_ncopias = Simple.cbt_ncopias;

      this._cbt_casociado = Simple.cbt_casociado;

      this._cbt_nCbteCAE = Simple.cbt_nCbteCAE;

      this._cbt_idOrganizacionFacturadora = Simple.cbt_idOrganizacionFacturadora;

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
    Callert_comprobantes_fc Caller = new Callert_comprobantes_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cbt_ccodigo = this._cbt_ccodigo;

      Caller.cbt_cdescripcion = this._cbt_cdescripcion;

      Caller.cbt_cdescripcionreducida = this._cbt_cdescripcionreducida;

      Caller.cbt_ntipo = this._cbt_ntipo;

      Caller.cbt_cletra = this._cbt_cletra;

      Caller.cbt_cprefijo = this._cbt_cprefijo;

      Caller.cbt_inumero = this._cbt_inumero;

      Caller.cbt_ncopias = this._cbt_ncopias;

      Caller.cbt_casociado = this._cbt_casociado;

      Caller.cbt_nCbteCAE = this._cbt_nCbteCAE;

      Caller.cbt_idOrganizacionFacturadora = this._cbt_idOrganizacionFacturadora;

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
    
      dt.Columns.Add(new DataColumn("cbt_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbt_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbt_cdescripcionreducida", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbt_ntipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbt_cletra", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbt_cprefijo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbt_inumero", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbt_ncopias", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbt_casociado", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbt_nCbteCAE", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbt_idOrganizacionFacturadora", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cbt_ccodigo"] = this._cbt_ccodigo;

      dr["cbt_cdescripcion"] = this._cbt_cdescripcion;

      dr["cbt_cdescripcionreducida"] = this._cbt_cdescripcionreducida;

      dr["cbt_ntipo"] = this._cbt_ntipo;

      dr["cbt_cletra"] = this._cbt_cletra;

      dr["cbt_cprefijo"] = this._cbt_cprefijo;

      dr["cbt_inumero"] = this._cbt_inumero;

      dr["cbt_ncopias"] = this._cbt_ncopias;

      dr["cbt_casociado"] = this._cbt_casociado;

      dr["cbt_nCbteCAE"] = this._cbt_nCbteCAE;

      dr["cbt_idOrganizacionFacturadora"] = this._cbt_idOrganizacionFacturadora;

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
    using(var CmdChilds = new SqlCommand("t_comprobantes_fcByChildObject", conn))
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
    Simplet_comprobantes_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_comprobantes_fcByChildObject", conn))
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
    Simple = new Simplet_comprobantes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbt_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cbt_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cbt_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbt_ntipo = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cbt_cletra = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbt_cprefijo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cbt_inumero = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbt_ncopias = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cbt_casociado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cbt_nCbteCAE = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cbt_idOrganizacionFacturadora = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    Simplet_comprobantes_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_comprobantes_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cbt_ccodigo = (Row["cbt_ccodigo"] == DBNull.Value) ? "" : (string) Row["cbt_ccodigo"];

Simple.cbt_cdescripcion = (Row["cbt_cdescripcion"] == DBNull.Value) ? "" : (string) Row["cbt_cdescripcion"];

Simple.cbt_cdescripcionreducida = (Row["cbt_cdescripcionreducida"] == DBNull.Value) ? "" : (string) Row["cbt_cdescripcionreducida"];

Simple.cbt_ntipo = (Row["cbt_ntipo"] == DBNull.Value) ? 0 : (int) Row["cbt_ntipo"];

Simple.cbt_cletra = (Row["cbt_cletra"] == DBNull.Value) ? "" : (string) Row["cbt_cletra"];

Simple.cbt_cprefijo = (Row["cbt_cprefijo"] == DBNull.Value) ? "" : (string) Row["cbt_cprefijo"];

Simple.cbt_inumero = (Row["cbt_inumero"] == DBNull.Value) ? 0 : (int) Row["cbt_inumero"];

Simple.cbt_ncopias = (Row["cbt_ncopias"] == DBNull.Value) ? 0 : (int) Row["cbt_ncopias"];

Simple.cbt_casociado = (Row["cbt_casociado"] == DBNull.Value) ? "" : (string) Row["cbt_casociado"];

Simple.cbt_nCbteCAE = (Row["cbt_nCbteCAE"] == DBNull.Value) ? 0 : (int) Row["cbt_nCbteCAE"];

Simple.cbt_idOrganizacionFacturadora = (Row["cbt_idOrganizacionFacturadora"] == DBNull.Value) ? 0 : (int) Row["cbt_idOrganizacionFacturadora"];


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
    using(var CmdParents = new SqlCommand("t_comprobantes_fcByParentObject", conn))
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
    Simplet_comprobantes_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_comprobantes_fcByParentObject", conn))
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
    Simple = new Simplet_comprobantes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbt_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cbt_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cbt_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbt_ntipo = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cbt_cletra = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbt_cprefijo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cbt_inumero = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbt_ncopias = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cbt_casociado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cbt_nCbteCAE = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cbt_idOrganizacionFacturadora = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);


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
    using (var CmdDataByName = new SqlCommand("t_comprobantes_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_comprobantes_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_comprobantes_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_comprobantes_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_comprobantes_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_comprobantes_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_comprobantes_fcBySimplet_comprobantes_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbt_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cdescripcion", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cdescripcionreducida", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_ntipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_cletra", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_cprefijo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_ncopias", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_casociado", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbt_nCbteCAE", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbt_idOrganizacionFacturadora", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cbt_ccodigo"].Value = (this._cbt_ccodigo == null) ? (object) DBNull.Value : (object) this._cbt_ccodigo;

		cmd.Parameters["@cbt_cdescripcion"].Value = (this._cbt_cdescripcion == null) ? (object) DBNull.Value : (object) this._cbt_cdescripcion;

		cmd.Parameters["@cbt_cdescripcionreducida"].Value = (this._cbt_cdescripcionreducida == null) ? (object) DBNull.Value : (object) this._cbt_cdescripcionreducida;

		cmd.Parameters["@cbt_ntipo"].Value = this._cbt_ntipo;

		cmd.Parameters["@cbt_cletra"].Value = (this._cbt_cletra == null) ? (object) DBNull.Value : (object) this._cbt_cletra;

		cmd.Parameters["@cbt_cprefijo"].Value = (this._cbt_cprefijo == null) ? (object) DBNull.Value : (object) this._cbt_cprefijo;

		cmd.Parameters["@cbt_inumero"].Value = this._cbt_inumero;

		cmd.Parameters["@cbt_ncopias"].Value = this._cbt_ncopias;

		cmd.Parameters["@cbt_casociado"].Value = (this._cbt_casociado == null) ? (object) DBNull.Value : (object) this._cbt_casociado;

		cmd.Parameters["@cbt_nCbteCAE"].Value = this._cbt_nCbteCAE;

		cmd.Parameters["@cbt_idOrganizacionFacturadora"].Value = this._cbt_idOrganizacionFacturadora;


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
		 
		public IEnumerable<Simplet_comprobantes_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_comprobantes_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_comprobantes_fc Simple = new Simplet_comprobantes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbt_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cbt_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cbt_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbt_ntipo = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cbt_cletra = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbt_cprefijo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cbt_inumero = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbt_ncopias = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cbt_casociado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cbt_nCbteCAE = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cbt_idOrganizacionFacturadora = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_comprobantes_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_comprobantes_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_comprobantes_fc Simple = new Simplet_comprobantes_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbt_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.cbt_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.cbt_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbt_ntipo = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cbt_cletra = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbt_cprefijo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.cbt_inumero = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbt_ncopias = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cbt_casociado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.cbt_nCbteCAE = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.cbt_idOrganizacionFacturadora = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3183, "t_comprobantes_fc");
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
    if (Reader.FieldCount > 2)this._cbt_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._cbt_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._cbt_cdescripcionreducida = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._cbt_ntipo = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._cbt_cletra = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._cbt_cprefijo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._cbt_inumero = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._cbt_ncopias = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._cbt_casociado = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._cbt_nCbteCAE = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._cbt_idOrganizacionFacturadora = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);

    }
    Reader.Close();
    }
   }
  
    }
  