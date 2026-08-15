
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
     ///p_comandos_ip data access layer   
     ///</summary>
    public class Dalp_comandos_ip : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private DateTime? _cmd_tfechahora;
    
      private int _cmd_idCuenta;
    
      private int _cmd_idReceptor;
    
      private int _cmd_iComando;
    
      private string _cmd_cValores;
    
      private Decimal _cmd_nEstado;
    
      private string _cmd_cObservaciones;
    
      private int _cmd_iEsCustom;
    
      private string _cmd_cAlarmaGenerar;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cmd_tfechahora   
     ///</summary>
      public DateTime? cmd_tfechahora
      {
      
          get{ return this._cmd_tfechahora; }
          set{ this._cmd_tfechahora = value; }
        
      }
     ///<summary>
     ///cmd_idCuenta   
     ///</summary>
      public int cmd_idCuenta
      {
      
          get{ return this._cmd_idCuenta; }
          set{ this._cmd_idCuenta = value; }
        
      }
     ///<summary>
     ///cmd_idReceptor   
     ///</summary>
      public int cmd_idReceptor
      {
      
          get{ return this._cmd_idReceptor; }
          set{ this._cmd_idReceptor = value; }
        
      }
     ///<summary>
     ///cmd_iComando   
     ///</summary>
      public int cmd_iComando
      {
      
          get{ return this._cmd_iComando; }
          set{ this._cmd_iComando = value; }
        
      }
     ///<summary>
     ///cmd_cValores   
     ///</summary>
      public string cmd_cValores
      {
      
          get{ return this._cmd_cValores; }
          set{ this._cmd_cValores = value; }
        
      }
     ///<summary>
     ///cmd_nEstado   
     ///</summary>
      public Decimal cmd_nEstado
      {
      
          get{ return this._cmd_nEstado; }
          set{ this._cmd_nEstado = value; }
        
      }
     ///<summary>
     ///cmd_cObservaciones   
     ///</summary>
      public string cmd_cObservaciones
      {
      
          get{ return this._cmd_cObservaciones; }
          set{ this._cmd_cObservaciones = value; }
        
      }
     ///<summary>
     ///cmd_iEsCustom   
     ///</summary>
      public int cmd_iEsCustom
      {
      
          get{ return this._cmd_iEsCustom; }
          set{ this._cmd_iEsCustom = value; }
        
      }
     ///<summary>
     ///cmd_cAlarmaGenerar   
     ///</summary>
      public string cmd_cAlarmaGenerar
      {
      
          get{ return this._cmd_cAlarmaGenerar; }
          set{ this._cmd_cAlarmaGenerar = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_comandos_ip(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_comandos_ip(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalp_comandos_ip(SqlHelper SqlConfig, int UserId, Simplep_comandos_ip Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cmd_tfechahora = Simple.cmd_tfechahora;

      this._cmd_idCuenta = Simple.cmd_idCuenta;

      this._cmd_idReceptor = Simple.cmd_idReceptor;

      this._cmd_iComando = Simple.cmd_iComando;

      this._cmd_cValores = Simple.cmd_cValores;

      this._cmd_nEstado = Simple.cmd_nEstado;

      this._cmd_cObservaciones = Simple.cmd_cObservaciones;

      this._cmd_iEsCustom = Simple.cmd_iEsCustom;

      this._cmd_cAlarmaGenerar = Simple.cmd_cAlarmaGenerar;

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
    BeginTran();
    try{
    if(base.Id == 0)
    {
    //new
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_comandos_ipIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cmd_tfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cmd_idCuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_idReceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_iComando", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_cValores", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cmd_nEstado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cmd_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cmd_iEsCustom", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_cAlarmaGenerar", SqlDbType.NChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cmd_tfechahora"].Value = (this._cmd_tfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cmd_tfechahora;

		cmd.Parameters["@cmd_idCuenta"].Value = this._cmd_idCuenta;

		cmd.Parameters["@cmd_idReceptor"].Value = this._cmd_idReceptor;

		cmd.Parameters["@cmd_iComando"].Value = this._cmd_iComando;

		cmd.Parameters["@cmd_cValores"].Value = (this._cmd_cValores == null) ? (object) DBNull.Value : (object) this._cmd_cValores;

		cmd.Parameters["@cmd_nEstado"].Value = this._cmd_nEstado;

		cmd.Parameters["@cmd_cObservaciones"].Value = (this._cmd_cObservaciones == null) ? (object) DBNull.Value : (object) this._cmd_cObservaciones;

		cmd.Parameters["@cmd_iEsCustom"].Value = this._cmd_iEsCustom;

		cmd.Parameters["@cmd_cAlarmaGenerar"].Value = (this._cmd_cAlarmaGenerar == null) ? (object) DBNull.Value : (object) this._cmd_cAlarmaGenerar;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_comandos_ipUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cmd_tfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cmd_idCuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_idReceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_iComando", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_cValores", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cmd_nEstado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cmd_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cmd_iEsCustom", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_cAlarmaGenerar", SqlDbType.NChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cmd_tfechahora"].Value = (this._cmd_tfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cmd_tfechahora;

		cmd.Parameters["@cmd_idCuenta"].Value = this._cmd_idCuenta;

		cmd.Parameters["@cmd_idReceptor"].Value = this._cmd_idReceptor;

		cmd.Parameters["@cmd_iComando"].Value = this._cmd_iComando;

		cmd.Parameters["@cmd_cValores"].Value = (this._cmd_cValores == null) ? (object) DBNull.Value : (object) this._cmd_cValores;

		cmd.Parameters["@cmd_nEstado"].Value = this._cmd_nEstado;

		cmd.Parameters["@cmd_cObservaciones"].Value = (this._cmd_cObservaciones == null) ? (object) DBNull.Value : (object) this._cmd_cObservaciones;

		cmd.Parameters["@cmd_iEsCustom"].Value = this._cmd_iEsCustom;

		cmd.Parameters["@cmd_cAlarmaGenerar"].Value = (this._cmd_cAlarmaGenerar == null) ? (object) DBNull.Value : (object) this._cmd_cAlarmaGenerar;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    }
    finally{
    base.Save();
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
    throw new RuntimeException("The p_comandos_ip is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("p_comandos_ipDel", conn))
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
    using(var CmdSel = new SqlCommand("p_comandos_ipSel", conn))
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
    Simplep_comandos_ip Simple = new Simplep_comandos_ip();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cmd_tfechahora = this._cmd_tfechahora;

      Simple.cmd_idCuenta = this._cmd_idCuenta;

      Simple.cmd_idReceptor = this._cmd_idReceptor;

      Simple.cmd_iComando = this._cmd_iComando;

      Simple.cmd_cValores = this._cmd_cValores;

      Simple.cmd_nEstado = this._cmd_nEstado;

      Simple.cmd_cObservaciones = this._cmd_cObservaciones;

      Simple.cmd_iEsCustom = this._cmd_iEsCustom;

      Simple.cmd_cAlarmaGenerar = this._cmd_cAlarmaGenerar;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplep_comandos_ip)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cmd_tfechahora = Simple.cmd_tfechahora;

      this._cmd_idCuenta = Simple.cmd_idCuenta;

      this._cmd_idReceptor = Simple.cmd_idReceptor;

      this._cmd_iComando = Simple.cmd_iComando;

      this._cmd_cValores = Simple.cmd_cValores;

      this._cmd_nEstado = Simple.cmd_nEstado;

      this._cmd_cObservaciones = Simple.cmd_cObservaciones;

      this._cmd_iEsCustom = Simple.cmd_iEsCustom;

      this._cmd_cAlarmaGenerar = Simple.cmd_cAlarmaGenerar;

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
    Callerp_comandos_ip Caller = new Callerp_comandos_ip();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cmd_tfechahora = this._cmd_tfechahora;

      Caller.cmd_idCuenta = this._cmd_idCuenta;

      Caller.cmd_idReceptor = this._cmd_idReceptor;

      Caller.cmd_iComando = this._cmd_iComando;

      Caller.cmd_cValores = this._cmd_cValores;

      Caller.cmd_nEstado = this._cmd_nEstado;

      Caller.cmd_cObservaciones = this._cmd_cObservaciones;

      Caller.cmd_iEsCustom = this._cmd_iEsCustom;

      Caller.cmd_cAlarmaGenerar = this._cmd_cAlarmaGenerar;

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
    
      dt.Columns.Add(new DataColumn("cmd_tfechahora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cmd_idCuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cmd_idReceptor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cmd_iComando", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cmd_cValores", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cmd_nEstado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cmd_cObservaciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cmd_iEsCustom", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cmd_cAlarmaGenerar", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cmd_tfechahora"] = (object)this._cmd_tfechahora  ?? DBNull.Value;

      dr["cmd_idCuenta"] = this._cmd_idCuenta;

      dr["cmd_idReceptor"] = this._cmd_idReceptor;

      dr["cmd_iComando"] = this._cmd_iComando;

      dr["cmd_cValores"] = this._cmd_cValores;

      dr["cmd_nEstado"] = this._cmd_nEstado;

      dr["cmd_cObservaciones"] = this._cmd_cObservaciones;

      dr["cmd_iEsCustom"] = this._cmd_iEsCustom;

      dr["cmd_cAlarmaGenerar"] = this._cmd_cAlarmaGenerar;

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
    using(var CmdChilds = new SqlCommand("p_comandos_ipByChildObject", conn))
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
    Simplep_comandos_ip Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("p_comandos_ipByChildObject", conn))
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
    Simple = new Simplep_comandos_ip();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cmd_tfechahora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.cmd_idCuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cmd_idReceptor = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cmd_iComando = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cmd_cValores = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cmd_nEstado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cmd_cObservaciones = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cmd_iEsCustom = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cmd_cAlarmaGenerar = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    Simplep_comandos_ip Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplep_comandos_ip();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cmd_tfechahora = (Row["cmd_tfechahora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cmd_tfechahora"];

Simple.cmd_idCuenta = (Row["cmd_idCuenta"] == DBNull.Value) ? 0 : (int) Row["cmd_idCuenta"];

Simple.cmd_idReceptor = (Row["cmd_idReceptor"] == DBNull.Value) ? 0 : (int) Row["cmd_idReceptor"];

Simple.cmd_iComando = (Row["cmd_iComando"] == DBNull.Value) ? 0 : (int) Row["cmd_iComando"];

Simple.cmd_cValores = (Row["cmd_cValores"] == DBNull.Value) ? "" : (string) Row["cmd_cValores"];

Simple.cmd_nEstado = (Row["cmd_nEstado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cmd_nEstado"];

Simple.cmd_cObservaciones = (Row["cmd_cObservaciones"] == DBNull.Value) ? "" : (string) Row["cmd_cObservaciones"];

Simple.cmd_iEsCustom = (Row["cmd_iEsCustom"] == DBNull.Value) ? 0 : (int) Row["cmd_iEsCustom"];

Simple.cmd_cAlarmaGenerar = (Row["cmd_cAlarmaGenerar"] == DBNull.Value) ? "" : (string) Row["cmd_cAlarmaGenerar"];


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
    using(var CmdParents = new SqlCommand("p_comandos_ipByParentObject", conn))
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
    Simplep_comandos_ip Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("p_comandos_ipByParentObject", conn))
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
    Simple = new Simplep_comandos_ip();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cmd_tfechahora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.cmd_idCuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cmd_idReceptor = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cmd_iComando = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cmd_cValores = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cmd_nEstado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cmd_cObservaciones = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cmd_iEsCustom = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cmd_cAlarmaGenerar = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);


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
    using (var CmdDataByName = new SqlCommand("p_comandos_ipByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("p_comandos_ipByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("p_comandos_ipByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("p_comandos_ipByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("p_comandos_ipByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplep_comandos_ip Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("p_comandos_ipBySimplep_comandos_ip", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cmd_tfechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cmd_idCuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_idReceptor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_iComando", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_cValores", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cmd_nEstado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cmd_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cmd_iEsCustom", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cmd_cAlarmaGenerar", SqlDbType.NChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cmd_tfechahora"].Value = (this._cmd_tfechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cmd_tfechahora;

		cmd.Parameters["@cmd_idCuenta"].Value = this._cmd_idCuenta;

		cmd.Parameters["@cmd_idReceptor"].Value = this._cmd_idReceptor;

		cmd.Parameters["@cmd_iComando"].Value = this._cmd_iComando;

		cmd.Parameters["@cmd_cValores"].Value = (this._cmd_cValores == null) ? (object) DBNull.Value : (object) this._cmd_cValores;

		cmd.Parameters["@cmd_nEstado"].Value = this._cmd_nEstado;

		cmd.Parameters["@cmd_cObservaciones"].Value = (this._cmd_cObservaciones == null) ? (object) DBNull.Value : (object) this._cmd_cObservaciones;

		cmd.Parameters["@cmd_iEsCustom"].Value = this._cmd_iEsCustom;

		cmd.Parameters["@cmd_cAlarmaGenerar"].Value = (this._cmd_cAlarmaGenerar == null) ? (object) DBNull.Value : (object) this._cmd_cAlarmaGenerar;


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
		 
		public IEnumerable<Simplep_comandos_ip> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_comandos_ipByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_comandos_ip Simple = new Simplep_comandos_ip();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cmd_tfechahora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.cmd_idCuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cmd_idReceptor = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cmd_iComando = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cmd_cValores = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cmd_nEstado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cmd_cObservaciones = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cmd_iEsCustom = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cmd_cAlarmaGenerar = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplep_comandos_ip> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("p_comandos_ipByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplep_comandos_ip Simple = new Simplep_comandos_ip();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cmd_tfechahora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)Simple.cmd_idCuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.cmd_idReceptor = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cmd_iComando = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.cmd_cValores = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cmd_nEstado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cmd_cObservaciones = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.cmd_iEsCustom = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.cmd_cAlarmaGenerar = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3065, "p_comandos_ip");
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
    if (Reader.FieldCount > 2)this._cmd_tfechahora = (Reader.IsDBNull(2)) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
if (Reader.FieldCount > 3)this._cmd_idCuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._cmd_idReceptor = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._cmd_iComando = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._cmd_cValores = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._cmd_nEstado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._cmd_cObservaciones = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._cmd_iEsCustom = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._cmd_cAlarmaGenerar = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);

    }
    Reader.Close();
    }
   }
  
    }
  