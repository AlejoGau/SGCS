
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
     ///m_EstadosPanel data access layer   
     ///</summary>
    public class Dalm_EstadosPanel : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _mep_idCuenta;
    
      private string _mep_cAlarmaControl;
    
      private int _mep_iUsuarioControl;
    
      private string _mep_cAlarmaEsperada;
    
      private int _mep_iUsuarioEsperado;
    
      private int _mep_iMinutos;
    
      private int _mep_iAutoProcesa;
    
      private string _mep_cAlarmaAGenerar;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///mep_idCuenta   
     ///</summary>
      public int mep_idCuenta
      {
      
          get{ return this._mep_idCuenta; }
          set{ this._mep_idCuenta = value; }
        
      }
     ///<summary>
     ///mep_cAlarmaControl   
     ///</summary>
      public string mep_cAlarmaControl
      {
      
          get{ return this._mep_cAlarmaControl; }
          set{ this._mep_cAlarmaControl = value; }
        
      }
     ///<summary>
     ///mep_iUsuarioControl   
     ///</summary>
      public int mep_iUsuarioControl
      {
      
          get{ return this._mep_iUsuarioControl; }
          set{ this._mep_iUsuarioControl = value; }
        
      }
     ///<summary>
     ///mep_cAlarmaEsperada   
     ///</summary>
      public string mep_cAlarmaEsperada
      {
      
          get{ return this._mep_cAlarmaEsperada; }
          set{ this._mep_cAlarmaEsperada = value; }
        
      }
     ///<summary>
     ///mep_iUsuarioEsperado   
     ///</summary>
      public int mep_iUsuarioEsperado
      {
      
          get{ return this._mep_iUsuarioEsperado; }
          set{ this._mep_iUsuarioEsperado = value; }
        
      }
     ///<summary>
     ///mep_iMinutos   
     ///</summary>
      public int mep_iMinutos
      {
      
          get{ return this._mep_iMinutos; }
          set{ this._mep_iMinutos = value; }
        
      }
     ///<summary>
     ///mep_iAutoProcesa   
     ///</summary>
      public int mep_iAutoProcesa
      {
      
          get{ return this._mep_iAutoProcesa; }
          set{ this._mep_iAutoProcesa = value; }
        
      }
     ///<summary>
     ///mep_cAlarmaAGenerar   
     ///</summary>
      public string mep_cAlarmaAGenerar
      {
      
          get{ return this._mep_cAlarmaAGenerar; }
          set{ this._mep_cAlarmaAGenerar = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_EstadosPanel(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_EstadosPanel(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_EstadosPanel(SqlHelper SqlConfig, int UserId, Simplem_EstadosPanel Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._mep_idCuenta = Simple.mep_idCuenta;

      this._mep_cAlarmaControl = Simple.mep_cAlarmaControl;

      this._mep_iUsuarioControl = Simple.mep_iUsuarioControl;

      this._mep_cAlarmaEsperada = Simple.mep_cAlarmaEsperada;

      this._mep_iUsuarioEsperado = Simple.mep_iUsuarioEsperado;

      this._mep_iMinutos = Simple.mep_iMinutos;

      this._mep_iAutoProcesa = Simple.mep_iAutoProcesa;

      this._mep_cAlarmaAGenerar = Simple.mep_cAlarmaAGenerar;

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
    using(var cmd = new SqlCommand("m_EstadosPanelIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mep_idCuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaControl", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mep_iUsuarioControl", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaEsperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mep_iUsuarioEsperado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_iMinutos", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_iAutoProcesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaAGenerar", SqlDbType.NChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@mep_idCuenta"].Value = this._mep_idCuenta;

		cmd.Parameters["@mep_cAlarmaControl"].Value = (this._mep_cAlarmaControl == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaControl;

		cmd.Parameters["@mep_iUsuarioControl"].Value = this._mep_iUsuarioControl;

		cmd.Parameters["@mep_cAlarmaEsperada"].Value = (this._mep_cAlarmaEsperada == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaEsperada;

		cmd.Parameters["@mep_iUsuarioEsperado"].Value = this._mep_iUsuarioEsperado;

		cmd.Parameters["@mep_iMinutos"].Value = this._mep_iMinutos;

		cmd.Parameters["@mep_iAutoProcesa"].Value = this._mep_iAutoProcesa;

		cmd.Parameters["@mep_cAlarmaAGenerar"].Value = (this._mep_cAlarmaAGenerar == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaAGenerar;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_EstadosPanelUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mep_idCuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaControl", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mep_iUsuarioControl", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaEsperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mep_iUsuarioEsperado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_iMinutos", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_iAutoProcesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaAGenerar", SqlDbType.NChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@mep_idCuenta"].Value = this._mep_idCuenta;

		cmd.Parameters["@mep_cAlarmaControl"].Value = (this._mep_cAlarmaControl == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaControl;

		cmd.Parameters["@mep_iUsuarioControl"].Value = this._mep_iUsuarioControl;

		cmd.Parameters["@mep_cAlarmaEsperada"].Value = (this._mep_cAlarmaEsperada == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaEsperada;

		cmd.Parameters["@mep_iUsuarioEsperado"].Value = this._mep_iUsuarioEsperado;

		cmd.Parameters["@mep_iMinutos"].Value = this._mep_iMinutos;

		cmd.Parameters["@mep_iAutoProcesa"].Value = this._mep_iAutoProcesa;

		cmd.Parameters["@mep_cAlarmaAGenerar"].Value = (this._mep_cAlarmaAGenerar == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaAGenerar;

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
    throw new RuntimeException("The m_EstadosPanel is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_EstadosPanelDel", conn))
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
    using(var CmdSel = new SqlCommand("m_EstadosPanelSel", conn))
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
    Simplem_EstadosPanel Simple = new Simplem_EstadosPanel();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.mep_idCuenta = this._mep_idCuenta;

      Simple.mep_cAlarmaControl = this._mep_cAlarmaControl;

      Simple.mep_iUsuarioControl = this._mep_iUsuarioControl;

      Simple.mep_cAlarmaEsperada = this._mep_cAlarmaEsperada;

      Simple.mep_iUsuarioEsperado = this._mep_iUsuarioEsperado;

      Simple.mep_iMinutos = this._mep_iMinutos;

      Simple.mep_iAutoProcesa = this._mep_iAutoProcesa;

      Simple.mep_cAlarmaAGenerar = this._mep_cAlarmaAGenerar;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_EstadosPanel)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._mep_idCuenta = Simple.mep_idCuenta;

      this._mep_cAlarmaControl = Simple.mep_cAlarmaControl;

      this._mep_iUsuarioControl = Simple.mep_iUsuarioControl;

      this._mep_cAlarmaEsperada = Simple.mep_cAlarmaEsperada;

      this._mep_iUsuarioEsperado = Simple.mep_iUsuarioEsperado;

      this._mep_iMinutos = Simple.mep_iMinutos;

      this._mep_iAutoProcesa = Simple.mep_iAutoProcesa;

      this._mep_cAlarmaAGenerar = Simple.mep_cAlarmaAGenerar;

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
    Callerm_EstadosPanel Caller = new Callerm_EstadosPanel();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.mep_idCuenta = this._mep_idCuenta;

      Caller.mep_cAlarmaControl = this._mep_cAlarmaControl;

      Caller.mep_iUsuarioControl = this._mep_iUsuarioControl;

      Caller.mep_cAlarmaEsperada = this._mep_cAlarmaEsperada;

      Caller.mep_iUsuarioEsperado = this._mep_iUsuarioEsperado;

      Caller.mep_iMinutos = this._mep_iMinutos;

      Caller.mep_iAutoProcesa = this._mep_iAutoProcesa;

      Caller.mep_cAlarmaAGenerar = this._mep_cAlarmaAGenerar;

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
    
      dt.Columns.Add(new DataColumn("mep_idCuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mep_cAlarmaControl", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mep_iUsuarioControl", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mep_cAlarmaEsperada", typeof (string)));
    
      dt.Columns.Add(new DataColumn("mep_iUsuarioEsperado", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mep_iMinutos", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mep_iAutoProcesa", typeof (int)));
    
      dt.Columns.Add(new DataColumn("mep_cAlarmaAGenerar", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["mep_idCuenta"] = this._mep_idCuenta;

      dr["mep_cAlarmaControl"] = this._mep_cAlarmaControl;

      dr["mep_iUsuarioControl"] = this._mep_iUsuarioControl;

      dr["mep_cAlarmaEsperada"] = this._mep_cAlarmaEsperada;

      dr["mep_iUsuarioEsperado"] = this._mep_iUsuarioEsperado;

      dr["mep_iMinutos"] = this._mep_iMinutos;

      dr["mep_iAutoProcesa"] = this._mep_iAutoProcesa;

      dr["mep_cAlarmaAGenerar"] = this._mep_cAlarmaAGenerar;

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
    using(var CmdChilds = new SqlCommand("m_EstadosPanelByChildObject", conn))
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
    Simplem_EstadosPanel Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_EstadosPanelByChildObject", conn))
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
    Simple = new Simplem_EstadosPanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mep_idCuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mep_cAlarmaControl = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mep_iUsuarioControl = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.mep_cAlarmaEsperada = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mep_iUsuarioEsperado = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.mep_iMinutos = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mep_iAutoProcesa = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.mep_cAlarmaAGenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    Simplem_EstadosPanel Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_EstadosPanel();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.mep_idCuenta = (Row["mep_idCuenta"] == DBNull.Value) ? 0 : (int) Row["mep_idCuenta"];

Simple.mep_cAlarmaControl = (Row["mep_cAlarmaControl"] == DBNull.Value) ? "" : (string) Row["mep_cAlarmaControl"];

Simple.mep_iUsuarioControl = (Row["mep_iUsuarioControl"] == DBNull.Value) ? 0 : (int) Row["mep_iUsuarioControl"];

Simple.mep_cAlarmaEsperada = (Row["mep_cAlarmaEsperada"] == DBNull.Value) ? "" : (string) Row["mep_cAlarmaEsperada"];

Simple.mep_iUsuarioEsperado = (Row["mep_iUsuarioEsperado"] == DBNull.Value) ? 0 : (int) Row["mep_iUsuarioEsperado"];

Simple.mep_iMinutos = (Row["mep_iMinutos"] == DBNull.Value) ? 0 : (int) Row["mep_iMinutos"];

Simple.mep_iAutoProcesa = (Row["mep_iAutoProcesa"] == DBNull.Value) ? 0 : (int) Row["mep_iAutoProcesa"];

Simple.mep_cAlarmaAGenerar = (Row["mep_cAlarmaAGenerar"] == DBNull.Value) ? "" : (string) Row["mep_cAlarmaAGenerar"];


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
    using(var CmdParents = new SqlCommand("m_EstadosPanelByParentObject", conn))
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
    Simplem_EstadosPanel Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_EstadosPanelByParentObject", conn))
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
    Simple = new Simplem_EstadosPanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mep_idCuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mep_cAlarmaControl = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mep_iUsuarioControl = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.mep_cAlarmaEsperada = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mep_iUsuarioEsperado = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.mep_iMinutos = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mep_iAutoProcesa = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.mep_cAlarmaAGenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    using (var CmdDataByName = new SqlCommand("m_EstadosPanelByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_EstadosPanelByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_EstadosPanelByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_EstadosPanelByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_EstadosPanelByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_EstadosPanel Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_EstadosPanelBySimplem_EstadosPanel", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@mep_idCuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaControl", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mep_iUsuarioControl", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaEsperada", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@mep_iUsuarioEsperado", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_iMinutos", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_iAutoProcesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@mep_cAlarmaAGenerar", SqlDbType.NChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@mep_idCuenta"].Value = this._mep_idCuenta;

		cmd.Parameters["@mep_cAlarmaControl"].Value = (this._mep_cAlarmaControl == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaControl;

		cmd.Parameters["@mep_iUsuarioControl"].Value = this._mep_iUsuarioControl;

		cmd.Parameters["@mep_cAlarmaEsperada"].Value = (this._mep_cAlarmaEsperada == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaEsperada;

		cmd.Parameters["@mep_iUsuarioEsperado"].Value = this._mep_iUsuarioEsperado;

		cmd.Parameters["@mep_iMinutos"].Value = this._mep_iMinutos;

		cmd.Parameters["@mep_iAutoProcesa"].Value = this._mep_iAutoProcesa;

		cmd.Parameters["@mep_cAlarmaAGenerar"].Value = (this._mep_cAlarmaAGenerar == null) ? (object) DBNull.Value : (object) this._mep_cAlarmaAGenerar;


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
		 
		public IEnumerable<Simplem_EstadosPanel> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_EstadosPanelByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_EstadosPanel Simple = new Simplem_EstadosPanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mep_idCuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mep_cAlarmaControl = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mep_iUsuarioControl = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.mep_cAlarmaEsperada = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mep_iUsuarioEsperado = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.mep_iMinutos = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mep_iAutoProcesa = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.mep_cAlarmaAGenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_EstadosPanel> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_EstadosPanelByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_EstadosPanel Simple = new Simplem_EstadosPanel();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.mep_idCuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.mep_cAlarmaControl = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.mep_iUsuarioControl = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.mep_cAlarmaEsperada = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.mep_iUsuarioEsperado = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.mep_iMinutos = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.mep_iAutoProcesa = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.mep_cAlarmaAGenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3194, "m_EstadosPanel");
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
    if (Reader.FieldCount > 2)this._mep_idCuenta = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._mep_cAlarmaControl = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._mep_iUsuarioControl = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._mep_cAlarmaEsperada = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._mep_iUsuarioEsperado = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._mep_iMinutos = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._mep_iAutoProcesa = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._mep_cAlarmaAGenerar = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    }
    Reader.Close();
    }
   }
  
    }
  