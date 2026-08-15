
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
     ///EventosIngresosEgresos data access layer   
     ///</summary>
    public class DalEventosIngresosEgresos : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _eie_iRecId;
    
      private int _eie_iCuentaId;
    
      private DateTime? _eie_tFechaHora;
    
      private string _eie_cMatricula;
    
      private string _eie_cUnidadFuncional;
    
      private string _eie_cVecino;
    
      private string _eie_cTransito;
    
      private string _eie_cUsuario;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///eie_iRecId   
     ///</summary>
      public int eie_iRecId
      {
      
          get{ return this._eie_iRecId; }
          set{ this._eie_iRecId = value; }
        
      }
     ///<summary>
     ///eie_iCuentaId   
     ///</summary>
      public int eie_iCuentaId
      {
      
          get{ return this._eie_iCuentaId; }
          set{ this._eie_iCuentaId = value; }
        
      }
     ///<summary>
     ///eie_tFechaHora   
     ///</summary>
      public DateTime? eie_tFechaHora
      {
      
          get{ return this._eie_tFechaHora; }
          set{ this._eie_tFechaHora = value; }
        
      }
     ///<summary>
     ///eie_cMatricula   
     ///</summary>
      public string eie_cMatricula
      {
      
          get{ return this._eie_cMatricula; }
          set{ this._eie_cMatricula = value; }
        
      }
     ///<summary>
     ///eie_cUnidadFuncional   
     ///</summary>
      public string eie_cUnidadFuncional
      {
      
          get{ return this._eie_cUnidadFuncional; }
          set{ this._eie_cUnidadFuncional = value; }
        
      }
     ///<summary>
     ///eie_cVecino   
     ///</summary>
      public string eie_cVecino
      {
      
          get{ return this._eie_cVecino; }
          set{ this._eie_cVecino = value; }
        
      }
     ///<summary>
     ///eie_cTransito   
     ///</summary>
      public string eie_cTransito
      {
      
          get{ return this._eie_cTransito; }
          set{ this._eie_cTransito = value; }
        
      }
     ///<summary>
     ///eie_cUsuario   
     ///</summary>
      public string eie_cUsuario
      {
      
          get{ return this._eie_cUsuario; }
          set{ this._eie_cUsuario = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosIngresosEgresos(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosIngresosEgresos(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosIngresosEgresos(SqlHelper SqlConfig, int UserId, SimpleEventosIngresosEgresos Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._eie_iRecId = Simple.eie_iRecId;

      this._eie_iCuentaId = Simple.eie_iCuentaId;

      this._eie_tFechaHora = Simple.eie_tFechaHora;

      this._eie_cMatricula = Simple.eie_cMatricula;

      this._eie_cUnidadFuncional = Simple.eie_cUnidadFuncional;

      this._eie_cVecino = Simple.eie_cVecino;

      this._eie_cTransito = Simple.eie_cTransito;

      this._eie_cUsuario = Simple.eie_cUsuario;

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
    using(var cmd = new SqlCommand("EventosIngresosEgresosIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@eie_iRecId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eie_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eie_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@eie_cMatricula", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cUnidadFuncional", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cVecino", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cTransito", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cUsuario", SqlDbType.VarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@eie_iRecId"].Value = this._eie_iRecId;

		cmd.Parameters["@eie_iCuentaId"].Value = this._eie_iCuentaId;

		cmd.Parameters["@eie_tFechaHora"].Value = (this._eie_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._eie_tFechaHora;

		cmd.Parameters["@eie_cMatricula"].Value = (this._eie_cMatricula == null) ? (object) DBNull.Value : (object) this._eie_cMatricula;

		cmd.Parameters["@eie_cUnidadFuncional"].Value = (this._eie_cUnidadFuncional == null) ? (object) DBNull.Value : (object) this._eie_cUnidadFuncional;

		cmd.Parameters["@eie_cVecino"].Value = (this._eie_cVecino == null) ? (object) DBNull.Value : (object) this._eie_cVecino;

		cmd.Parameters["@eie_cTransito"].Value = (this._eie_cTransito == null) ? (object) DBNull.Value : (object) this._eie_cTransito;

		cmd.Parameters["@eie_cUsuario"].Value = (this._eie_cUsuario == null) ? (object) DBNull.Value : (object) this._eie_cUsuario;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EventosIngresosEgresosUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@eie_iRecId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eie_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eie_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@eie_cMatricula", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cUnidadFuncional", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cVecino", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cTransito", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cUsuario", SqlDbType.VarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@eie_iRecId"].Value = this._eie_iRecId;

		cmd.Parameters["@eie_iCuentaId"].Value = this._eie_iCuentaId;

		cmd.Parameters["@eie_tFechaHora"].Value = (this._eie_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._eie_tFechaHora;

		cmd.Parameters["@eie_cMatricula"].Value = (this._eie_cMatricula == null) ? (object) DBNull.Value : (object) this._eie_cMatricula;

		cmd.Parameters["@eie_cUnidadFuncional"].Value = (this._eie_cUnidadFuncional == null) ? (object) DBNull.Value : (object) this._eie_cUnidadFuncional;

		cmd.Parameters["@eie_cVecino"].Value = (this._eie_cVecino == null) ? (object) DBNull.Value : (object) this._eie_cVecino;

		cmd.Parameters["@eie_cTransito"].Value = (this._eie_cTransito == null) ? (object) DBNull.Value : (object) this._eie_cTransito;

		cmd.Parameters["@eie_cUsuario"].Value = (this._eie_cUsuario == null) ? (object) DBNull.Value : (object) this._eie_cUsuario;

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
    throw new RuntimeException("The EventosIngresosEgresos is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("EventosIngresosEgresosDel", conn))
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
    using(var CmdSel = new SqlCommand("EventosIngresosEgresosSel", conn))
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
    SimpleEventosIngresosEgresos Simple = new SimpleEventosIngresosEgresos();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.eie_iRecId = this._eie_iRecId;

      Simple.eie_iCuentaId = this._eie_iCuentaId;

      Simple.eie_tFechaHora = this._eie_tFechaHora;

      Simple.eie_cMatricula = this._eie_cMatricula;

      Simple.eie_cUnidadFuncional = this._eie_cUnidadFuncional;

      Simple.eie_cVecino = this._eie_cVecino;

      Simple.eie_cTransito = this._eie_cTransito;

      Simple.eie_cUsuario = this._eie_cUsuario;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleEventosIngresosEgresos)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._eie_iRecId = Simple.eie_iRecId;

      this._eie_iCuentaId = Simple.eie_iCuentaId;

      this._eie_tFechaHora = Simple.eie_tFechaHora;

      this._eie_cMatricula = Simple.eie_cMatricula;

      this._eie_cUnidadFuncional = Simple.eie_cUnidadFuncional;

      this._eie_cVecino = Simple.eie_cVecino;

      this._eie_cTransito = Simple.eie_cTransito;

      this._eie_cUsuario = Simple.eie_cUsuario;

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
    CallerEventosIngresosEgresos Caller = new CallerEventosIngresosEgresos();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.eie_iRecId = this._eie_iRecId;

      Caller.eie_iCuentaId = this._eie_iCuentaId;

      Caller.eie_tFechaHora = this._eie_tFechaHora;

      Caller.eie_cMatricula = this._eie_cMatricula;

      Caller.eie_cUnidadFuncional = this._eie_cUnidadFuncional;

      Caller.eie_cVecino = this._eie_cVecino;

      Caller.eie_cTransito = this._eie_cTransito;

      Caller.eie_cUsuario = this._eie_cUsuario;

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
    
      dt.Columns.Add(new DataColumn("eie_iRecId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("eie_iCuentaId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("eie_tFechaHora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("eie_cMatricula", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eie_cUnidadFuncional", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eie_cVecino", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eie_cTransito", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eie_cUsuario", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["eie_iRecId"] = this._eie_iRecId;

      dr["eie_iCuentaId"] = this._eie_iCuentaId;

      dr["eie_tFechaHora"] = (object)this._eie_tFechaHora  ?? DBNull.Value;

      dr["eie_cMatricula"] = this._eie_cMatricula;

      dr["eie_cUnidadFuncional"] = this._eie_cUnidadFuncional;

      dr["eie_cVecino"] = this._eie_cVecino;

      dr["eie_cTransito"] = this._eie_cTransito;

      dr["eie_cUsuario"] = this._eie_cUsuario;

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
    using(var CmdChilds = new SqlCommand("EventosIngresosEgresosByChildObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdChilds))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
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
    SimpleEventosIngresosEgresos Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("EventosIngresosEgresosByChildObject", conn))
    {
    // Childs By Type
    CmdChilds.CommandType = CommandType.StoredProcedure;
    CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdChilds.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdChilds.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdChilds.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new SimpleEventosIngresosEgresos();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eie_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eie_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eie_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eie_cMatricula = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eie_cUnidadFuncional = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eie_cVecino = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eie_cTransito = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eie_cUsuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    SimpleEventosIngresosEgresos Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleEventosIngresosEgresos();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.eie_iRecId = (Row["eie_iRecId"] == DBNull.Value) ? 0 : (int) Row["eie_iRecId"];

Simple.eie_iCuentaId = (Row["eie_iCuentaId"] == DBNull.Value) ? 0 : (int) Row["eie_iCuentaId"];

Simple.eie_tFechaHora = (Row["eie_tFechaHora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["eie_tFechaHora"];

Simple.eie_cMatricula = (Row["eie_cMatricula"] == DBNull.Value) ? "" : (string) Row["eie_cMatricula"];

Simple.eie_cUnidadFuncional = (Row["eie_cUnidadFuncional"] == DBNull.Value) ? "" : (string) Row["eie_cUnidadFuncional"];

Simple.eie_cVecino = (Row["eie_cVecino"] == DBNull.Value) ? "" : (string) Row["eie_cVecino"];

Simple.eie_cTransito = (Row["eie_cTransito"] == DBNull.Value) ? "" : (string) Row["eie_cTransito"];

Simple.eie_cUsuario = (Row["eie_cUsuario"] == DBNull.Value) ? "" : (string) Row["eie_cUsuario"];


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
    using(var CmdParents = new SqlCommand("EventosIngresosEgresosByParentObject", conn))
    using(var Adapter = new SqlDataAdapter(CmdParents))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
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
    SimpleEventosIngresosEgresos Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("EventosIngresosEgresosByParentObject", conn))
    {
    // Parents By Type
    CmdParents.CommandType = CommandType.StoredProcedure;
    CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
    CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    CmdParents.Parameters["@ObjectType"].Value = Object.Type.Name;
    CmdParents.Parameters["@Id"].Value = Object.Id;

    conn.Open();
    using(SqlDataReader Reader = CmdParents.ExecuteReader())
    while(Reader.Read())
    {
    Simple = new SimpleEventosIngresosEgresos();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eie_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eie_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eie_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eie_cMatricula = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eie_cUnidadFuncional = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eie_cVecino = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eie_cTransito = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eie_cUsuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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
    using (var CmdDataByName = new SqlCommand("EventosIngresosEgresosByName", conn))
    using (var Adapter = new SqlDataAdapter(CmdDataByName))
    {
    // Search By Name
    CmdDataByName.CommandType = CommandType.StoredProcedure;
    CmdDataByName.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByName.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
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
    using(var CmdDataByNameWithChild = new SqlCommand("EventosIngresosEgresosByNameWithChild", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithChild))
    {
    // Search By Name Whit Child
    CmdDataByNameWithChild.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
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
    using(var CmdDataByNameWithParent = new SqlCommand("EventosIngresosEgresosByNameWithParent", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByNameWithParent))
    {
    // Search By Name Whit Parent
    CmdDataByNameWithParent.CommandType = CommandType.StoredProcedure;
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar));
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
    using (var cmd = new SqlCommand("EventosIngresosEgresosByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("EventosIngresosEgresosByText", conn))
    using(var Adapter = new SqlDataAdapter(CmdDataByText))
    {

    CmdDataByText.CommandType = CommandType.StoredProcedure;
    CmdDataByText.Parameters.Add(new SqlParameter("@Text", SqlDbType.VarChar));
    CmdDataByText.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
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
    public DataTable GetDataBySimpleObject(SimpleEventosIngresosEgresos Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EventosIngresosEgresosBySimpleEventosIngresosEgresos", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@eie_iRecId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eie_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eie_tFechaHora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@eie_cMatricula", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cUnidadFuncional", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cVecino", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cTransito", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@eie_cUsuario", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@eie_iRecId"].Value = this._eie_iRecId;

		cmd.Parameters["@eie_iCuentaId"].Value = this._eie_iCuentaId;

		cmd.Parameters["@eie_tFechaHora"].Value = (this._eie_tFechaHora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._eie_tFechaHora;

		cmd.Parameters["@eie_cMatricula"].Value = (this._eie_cMatricula == null) ? (object) DBNull.Value : (object) this._eie_cMatricula;

		cmd.Parameters["@eie_cUnidadFuncional"].Value = (this._eie_cUnidadFuncional == null) ? (object) DBNull.Value : (object) this._eie_cUnidadFuncional;

		cmd.Parameters["@eie_cVecino"].Value = (this._eie_cVecino == null) ? (object) DBNull.Value : (object) this._eie_cVecino;

		cmd.Parameters["@eie_cTransito"].Value = (this._eie_cTransito == null) ? (object) DBNull.Value : (object) this._eie_cTransito;

		cmd.Parameters["@eie_cUsuario"].Value = (this._eie_cUsuario == null) ? (object) DBNull.Value : (object) this._eie_cUsuario;


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
		 
		public IEnumerable<SimpleEventosIngresosEgresos> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EventosIngresosEgresosByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEventosIngresosEgresos Simple = new SimpleEventosIngresosEgresos();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eie_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eie_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eie_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eie_cMatricula = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eie_cUnidadFuncional = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eie_cVecino = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eie_cTransito = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eie_cUsuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleEventosIngresosEgresos> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EventosIngresosEgresosByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEventosIngresosEgresos Simple = new SimpleEventosIngresosEgresos();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eie_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eie_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eie_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eie_cMatricula = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eie_cUnidadFuncional = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eie_cVecino = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eie_cTransito = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eie_cUsuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(7035, "EventosIngresosEgresos");
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
    if (Reader.FieldCount > 2)this._eie_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._eie_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._eie_tFechaHora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._eie_cMatricula = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._eie_cUnidadFuncional = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._eie_cVecino = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._eie_cTransito = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._eie_cUsuario = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);

    }
    Reader.Close();
    }
   }
  
    }
  