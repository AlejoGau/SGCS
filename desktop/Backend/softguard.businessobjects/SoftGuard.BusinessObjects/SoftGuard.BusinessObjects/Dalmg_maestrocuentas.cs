
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
     ///mg_maestrocuentas data access layer   
     ///</summary>
    public class Dalmg_maestrocuentas : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _mgmc_idorganizacion;
    
      private string _mgmc_ccodigo;
    
      private string _mgmc_descripcion;
    
      private string _mgmc_ctipo;
    
      private DateTime? _mgmc_lastupdate;
    
      private Decimal _mgmc_saldo;
    
      private string _mgmc_moncodigo;
    
      private string _mgmc_metadata;
    
      private int _mgmc_capitulo;
    
      private int _mgmc_rubro;
    
      private int _mgmc_subrubro;
    
      private int _mgmc_imputacion;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///mgmc_idorganizacion   
     ///</summary>
      public int mgmc_idorganizacion
      {
      
          get{ return this._mgmc_idorganizacion; }
          set{ this._mgmc_idorganizacion = value; }
        
      }
     ///<summary>
     ///mgmc_ccodigo   
     ///</summary>
      public string mgmc_ccodigo
      {
      
          get{ return this._mgmc_ccodigo; }
          set{ this._mgmc_ccodigo = value; }
        
      }
     ///<summary>
     ///mgmc_descripcion   
     ///</summary>
      public string mgmc_descripcion
      {
      
          get{ return this._mgmc_descripcion; }
          set{ this._mgmc_descripcion = value; }
        
      }
     ///<summary>
     ///mgmc_ctipo   
     ///</summary>
      public string mgmc_ctipo
      {
      
          get{ return this._mgmc_ctipo; }
          set{ this._mgmc_ctipo = value; }
        
      }
     ///<summary>
     ///mgmc_lastupdate   
     ///</summary>
      public DateTime? mgmc_lastupdate
      {
      
          get{ return this._mgmc_lastupdate; }
          set{ this._mgmc_lastupdate = value; }
        
      }
     ///<summary>
     ///mgmc_saldo   
     ///</summary>
      public Decimal mgmc_saldo
      {
      
          get{ return this._mgmc_saldo; }
          set{ this._mgmc_saldo = value; }
        
      }
     ///<summary>
     ///mgmc_moncodigo   
     ///</summary>
      public string mgmc_moncodigo
      {
      
          get{ return this._mgmc_moncodigo; }
          set{ this._mgmc_moncodigo = value; }
        
      }
     ///<summary>
     ///mgmc_metadata   
     ///</summary>
      public string mgmc_metadata
      {
      
          get{ return this._mgmc_metadata; }
          set{ this._mgmc_metadata = value; }
        
      }
     ///<summary>
     ///mgmc_capitulo   
     ///</summary>
      public int mgmc_capitulo
      {
      
          get{ return this._mgmc_capitulo; }
          set{ this._mgmc_capitulo = value; }
        
      }
     ///<summary>
     ///mgmc_rubro   
     ///</summary>
      public int mgmc_rubro
      {
      
          get{ return this._mgmc_rubro; }
          set{ this._mgmc_rubro = value; }
        
      }
     ///<summary>
     ///mgmc_subrubro   
     ///</summary>
      public int mgmc_subrubro
      {
      
          get{ return this._mgmc_subrubro; }
          set{ this._mgmc_subrubro = value; }
        
      }
     ///<summary>
     ///mgmc_imputacion   
     ///</summary>
      public int mgmc_imputacion
      {
      
          get{ return this._mgmc_imputacion; }
          set{ this._mgmc_imputacion = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalmg_maestrocuentas(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalmg_maestrocuentas(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalmg_maestrocuentas(SqlHelper SqlConfig, int UserId, Simplemg_maestrocuentas Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._mgmc_idorganizacion = Simple.mgmc_idorganizacion;

      this._mgmc_ccodigo = Simple.mgmc_ccodigo;

      this._mgmc_descripcion = Simple.mgmc_descripcion;

      this._mgmc_ctipo = Simple.mgmc_ctipo;

      this._mgmc_lastupdate = Simple.mgmc_lastupdate;

      this._mgmc_saldo = Simple.mgmc_saldo;

      this._mgmc_moncodigo = Simple.mgmc_moncodigo;

      this._mgmc_metadata = Simple.mgmc_metadata;

      this._mgmc_capitulo = Simple.mgmc_capitulo;

      this._mgmc_rubro = Simple.mgmc_rubro;

      this._mgmc_subrubro = Simple.mgmc_subrubro;

      this._mgmc_imputacion = Simple.mgmc_imputacion;

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
    using(var cmd = new SqlCommand("mg_maestrocuentasIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mgmc_idorganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_ccodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_descripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_ctipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_lastupdate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mgmc_saldo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@mgmc_moncodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mgmc_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_capitulo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_rubro", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_subrubro", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_imputacion", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@mgmc_idorganizacion"].Value = this._mgmc_idorganizacion;

		cmd.Parameters["@mgmc_ccodigo"].Value = (this._mgmc_ccodigo == null) ? (object) DBNull.Value : (object) this._mgmc_ccodigo;

		cmd.Parameters["@mgmc_descripcion"].Value = (this._mgmc_descripcion == null) ? (object) DBNull.Value : (object) this._mgmc_descripcion;

		cmd.Parameters["@mgmc_ctipo"].Value = (this._mgmc_ctipo == null) ? (object) DBNull.Value : (object) this._mgmc_ctipo;

		cmd.Parameters["@mgmc_lastupdate"].Value = (this._mgmc_lastupdate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mgmc_lastupdate;

		cmd.Parameters["@mgmc_saldo"].Value = this._mgmc_saldo;

		cmd.Parameters["@mgmc_moncodigo"].Value = (this._mgmc_moncodigo == null) ? (object) DBNull.Value : (object) this._mgmc_moncodigo;

		cmd.Parameters["@mgmc_metadata"].Value = (this._mgmc_metadata == null) ? (object) DBNull.Value : (object) this._mgmc_metadata;

		cmd.Parameters["@mgmc_capitulo"].Value = this._mgmc_capitulo;

		cmd.Parameters["@mgmc_rubro"].Value = this._mgmc_rubro;

		cmd.Parameters["@mgmc_subrubro"].Value = this._mgmc_subrubro;

		cmd.Parameters["@mgmc_imputacion"].Value = this._mgmc_imputacion;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("mg_maestrocuentasUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mgmc_idorganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_ccodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_descripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_ctipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_lastupdate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mgmc_saldo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@mgmc_moncodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mgmc_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_capitulo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_rubro", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_subrubro", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_imputacion", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@mgmc_idorganizacion"].Value = this._mgmc_idorganizacion;

		cmd.Parameters["@mgmc_ccodigo"].Value = (this._mgmc_ccodigo == null) ? (object) DBNull.Value : (object) this._mgmc_ccodigo;

		cmd.Parameters["@mgmc_descripcion"].Value = (this._mgmc_descripcion == null) ? (object) DBNull.Value : (object) this._mgmc_descripcion;

		cmd.Parameters["@mgmc_ctipo"].Value = (this._mgmc_ctipo == null) ? (object) DBNull.Value : (object) this._mgmc_ctipo;

		cmd.Parameters["@mgmc_lastupdate"].Value = (this._mgmc_lastupdate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mgmc_lastupdate;

		cmd.Parameters["@mgmc_saldo"].Value = this._mgmc_saldo;

		cmd.Parameters["@mgmc_moncodigo"].Value = (this._mgmc_moncodigo == null) ? (object) DBNull.Value : (object) this._mgmc_moncodigo;

		cmd.Parameters["@mgmc_metadata"].Value = (this._mgmc_metadata == null) ? (object) DBNull.Value : (object) this._mgmc_metadata;

		cmd.Parameters["@mgmc_capitulo"].Value = this._mgmc_capitulo;

		cmd.Parameters["@mgmc_rubro"].Value = this._mgmc_rubro;

		cmd.Parameters["@mgmc_subrubro"].Value = this._mgmc_subrubro;

		cmd.Parameters["@mgmc_imputacion"].Value = this._mgmc_imputacion;

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
    throw new RuntimeException("The mg_maestrocuentas is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("mg_maestrocuentasDel", conn))
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
    using(var CmdSel = new SqlCommand("mg_maestrocuentasSel", conn))
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
    Simplemg_maestrocuentas Simple = new Simplemg_maestrocuentas();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.mgmc_idorganizacion = this._mgmc_idorganizacion;

      Simple.mgmc_ccodigo = this._mgmc_ccodigo;

      Simple.mgmc_descripcion = this._mgmc_descripcion;

      Simple.mgmc_ctipo = this._mgmc_ctipo;

      Simple.mgmc_lastupdate = this._mgmc_lastupdate;

      Simple.mgmc_saldo = this._mgmc_saldo;

      Simple.mgmc_moncodigo = this._mgmc_moncodigo;

      Simple.mgmc_metadata = this._mgmc_metadata;

      Simple.mgmc_capitulo = this._mgmc_capitulo;

      Simple.mgmc_rubro = this._mgmc_rubro;

      Simple.mgmc_subrubro = this._mgmc_subrubro;

      Simple.mgmc_imputacion = this._mgmc_imputacion;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplemg_maestrocuentas)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._mgmc_idorganizacion = Simple.mgmc_idorganizacion;

      this._mgmc_ccodigo = Simple.mgmc_ccodigo;

      this._mgmc_descripcion = Simple.mgmc_descripcion;

      this._mgmc_ctipo = Simple.mgmc_ctipo;

      this._mgmc_lastupdate = Simple.mgmc_lastupdate;

      this._mgmc_saldo = Simple.mgmc_saldo;

      this._mgmc_moncodigo = Simple.mgmc_moncodigo;

      this._mgmc_metadata = Simple.mgmc_metadata;

      this._mgmc_capitulo = Simple.mgmc_capitulo;

      this._mgmc_rubro = Simple.mgmc_rubro;

      this._mgmc_subrubro = Simple.mgmc_subrubro;

      this._mgmc_imputacion = Simple.mgmc_imputacion;

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
    Callermg_maestrocuentas Caller = new Callermg_maestrocuentas();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.mgmc_idorganizacion = this._mgmc_idorganizacion;

      Caller.mgmc_ccodigo = this._mgmc_ccodigo;

      Caller.mgmc_descripcion = this._mgmc_descripcion;

      Caller.mgmc_ctipo = this._mgmc_ctipo;

      Caller.mgmc_lastupdate = this._mgmc_lastupdate;

      Caller.mgmc_saldo = this._mgmc_saldo;

      Caller.mgmc_moncodigo = this._mgmc_moncodigo;

      Caller.mgmc_metadata = this._mgmc_metadata;

      Caller.mgmc_capitulo = this._mgmc_capitulo;

      Caller.mgmc_rubro = this._mgmc_rubro;

      Caller.mgmc_subrubro = this._mgmc_subrubro;

      Caller.mgmc_imputacion = this._mgmc_imputacion;

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
    
      dt.Columns.Add(new DataColumn("mgmc_idorganizacion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mgmc_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mgmc_descripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mgmc_ctipo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mgmc_lastupdate", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("mgmc_saldo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("mgmc_moncodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mgmc_metadata", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mgmc_capitulo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mgmc_rubro", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mgmc_subrubro", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mgmc_imputacion", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["mgmc_idorganizacion"] = this._mgmc_idorganizacion;

      dr["mgmc_ccodigo"] = this._mgmc_ccodigo;

      dr["mgmc_descripcion"] = this._mgmc_descripcion;

      dr["mgmc_ctipo"] = this._mgmc_ctipo;

      dr["mgmc_lastupdate"] = (object)this._mgmc_lastupdate  ?? DBNull.Value;

      dr["mgmc_saldo"] = this._mgmc_saldo;

      dr["mgmc_moncodigo"] = this._mgmc_moncodigo;

      dr["mgmc_metadata"] = this._mgmc_metadata;

      dr["mgmc_capitulo"] = this._mgmc_capitulo;

      dr["mgmc_rubro"] = this._mgmc_rubro;

      dr["mgmc_subrubro"] = this._mgmc_subrubro;

      dr["mgmc_imputacion"] = this._mgmc_imputacion;

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
    using(var CmdChilds = new SqlCommand("mg_maestrocuentasByChildObject", conn))
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
    Simplemg_maestrocuentas Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("mg_maestrocuentasByChildObject", conn))
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
    Simple = new Simplemg_maestrocuentas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mgmc_idorganizacion = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mgmc_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mgmc_descripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mgmc_ctipo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mgmc_lastupdate = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mgmc_saldo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.mgmc_moncodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mgmc_metadata = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.mgmc_capitulo = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.mgmc_rubro = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.mgmc_subrubro = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.mgmc_imputacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    Simplemg_maestrocuentas Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplemg_maestrocuentas();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.mgmc_idorganizacion = (Row["mgmc_idorganizacion"] == DBNull.Value) ? 0 : (int) Row["mgmc_idorganizacion"];

Simple.mgmc_ccodigo = (Row["mgmc_ccodigo"] == DBNull.Value) ? "" : (string) Row["mgmc_ccodigo"];

Simple.mgmc_descripcion = (Row["mgmc_descripcion"] == DBNull.Value) ? "" : (string) Row["mgmc_descripcion"];

Simple.mgmc_ctipo = (Row["mgmc_ctipo"] == DBNull.Value) ? "" : (string) Row["mgmc_ctipo"];

Simple.mgmc_lastupdate = (Row["mgmc_lastupdate"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["mgmc_lastupdate"];

Simple.mgmc_saldo = (Row["mgmc_saldo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["mgmc_saldo"];

Simple.mgmc_moncodigo = (Row["mgmc_moncodigo"] == DBNull.Value) ? "" : (string) Row["mgmc_moncodigo"];

Simple.mgmc_metadata = (Row["mgmc_metadata"] == DBNull.Value) ? "" : (string) Row["mgmc_metadata"];

Simple.mgmc_capitulo = (Row["mgmc_capitulo"] == DBNull.Value) ? 0 : (int) Row["mgmc_capitulo"];

Simple.mgmc_rubro = (Row["mgmc_rubro"] == DBNull.Value) ? 0 : (int) Row["mgmc_rubro"];

Simple.mgmc_subrubro = (Row["mgmc_subrubro"] == DBNull.Value) ? 0 : (int) Row["mgmc_subrubro"];

Simple.mgmc_imputacion = (Row["mgmc_imputacion"] == DBNull.Value) ? 0 : (int) Row["mgmc_imputacion"];


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
    using(var CmdParents = new SqlCommand("mg_maestrocuentasByParentObject", conn))
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
    Simplemg_maestrocuentas Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("mg_maestrocuentasByParentObject", conn))
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
    Simple = new Simplemg_maestrocuentas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mgmc_idorganizacion = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mgmc_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mgmc_descripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mgmc_ctipo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mgmc_lastupdate = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mgmc_saldo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.mgmc_moncodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mgmc_metadata = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.mgmc_capitulo = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.mgmc_rubro = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.mgmc_subrubro = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.mgmc_imputacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    using (var CmdDataByName = new SqlCommand("mg_maestrocuentasByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("mg_maestrocuentasByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("mg_maestrocuentasByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("mg_maestrocuentasByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("mg_maestrocuentasByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplemg_maestrocuentas Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("mg_maestrocuentasBySimplemg_maestrocuentas", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mgmc_idorganizacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_ccodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_descripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_ctipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_lastupdate", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@mgmc_saldo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@mgmc_moncodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mgmc_metadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@mgmc_capitulo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_rubro", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_subrubro", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mgmc_imputacion", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@mgmc_idorganizacion"].Value = this._mgmc_idorganizacion;

		cmd.Parameters["@mgmc_ccodigo"].Value = (this._mgmc_ccodigo == null) ? (object) DBNull.Value : (object) this._mgmc_ccodigo;

		cmd.Parameters["@mgmc_descripcion"].Value = (this._mgmc_descripcion == null) ? (object) DBNull.Value : (object) this._mgmc_descripcion;

		cmd.Parameters["@mgmc_ctipo"].Value = (this._mgmc_ctipo == null) ? (object) DBNull.Value : (object) this._mgmc_ctipo;

		cmd.Parameters["@mgmc_lastupdate"].Value = (this._mgmc_lastupdate == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._mgmc_lastupdate;

		cmd.Parameters["@mgmc_saldo"].Value = this._mgmc_saldo;

		cmd.Parameters["@mgmc_moncodigo"].Value = (this._mgmc_moncodigo == null) ? (object) DBNull.Value : (object) this._mgmc_moncodigo;

		cmd.Parameters["@mgmc_metadata"].Value = (this._mgmc_metadata == null) ? (object) DBNull.Value : (object) this._mgmc_metadata;

		cmd.Parameters["@mgmc_capitulo"].Value = this._mgmc_capitulo;

		cmd.Parameters["@mgmc_rubro"].Value = this._mgmc_rubro;

		cmd.Parameters["@mgmc_subrubro"].Value = this._mgmc_subrubro;

		cmd.Parameters["@mgmc_imputacion"].Value = this._mgmc_imputacion;


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
		 
		public IEnumerable<Simplemg_maestrocuentas> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("mg_maestrocuentasByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplemg_maestrocuentas Simple = new Simplemg_maestrocuentas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mgmc_idorganizacion = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mgmc_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mgmc_descripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mgmc_ctipo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mgmc_lastupdate = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mgmc_saldo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.mgmc_moncodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mgmc_metadata = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.mgmc_capitulo = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.mgmc_rubro = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.mgmc_subrubro = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.mgmc_imputacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplemg_maestrocuentas> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("mg_maestrocuentasByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplemg_maestrocuentas Simple = new Simplemg_maestrocuentas();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mgmc_idorganizacion = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mgmc_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mgmc_descripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.mgmc_ctipo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mgmc_lastupdate = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.mgmc_saldo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.mgmc_moncodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.mgmc_metadata = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.mgmc_capitulo = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.mgmc_rubro = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.mgmc_subrubro = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.mgmc_imputacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3211, "mg_maestrocuentas");
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
    if (Reader.FieldCount > 2)this._mgmc_idorganizacion = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._mgmc_ccodigo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._mgmc_descripcion = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._mgmc_ctipo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._mgmc_lastupdate = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._mgmc_saldo = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._mgmc_moncodigo = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._mgmc_metadata = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._mgmc_capitulo = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._mgmc_rubro = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._mgmc_subrubro = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._mgmc_imputacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    }
    Reader.Close();
    }
   }
  
    }
  