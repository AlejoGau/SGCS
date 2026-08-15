
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
     ///t_instaladores data access layer   
     ///</summary>
    public class Dalt_instaladores : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _ins_ccodigo;
    
      private string _ins_cnombre;
    
      private string _ins_cempresa;
    
      private string _ins_ccalle;
    
      private int _ins_inumero;
    
      private Decimal _ins_npiso;
    
      private string _ins_cdepartamento;
    
      private string _ins_ctelefono;
    
      private string _ins_cmail;
    
      private string _ins_cDealer;
    
      private int _ins_iTipo;
    
      private int _ins_irelacion;
    
      private int _ins_iOrganizacion ;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///ins_ccodigo   
     ///</summary>
      public string ins_ccodigo
      {
      
          get{ return this._ins_ccodigo; }
          set{ this._ins_ccodigo = value; }
        
      }
     ///<summary>
     ///ins_cnombre   
     ///</summary>
      public string ins_cnombre
      {
      
          get{ return this._ins_cnombre; }
          set{ this._ins_cnombre = value; }
        
      }
     ///<summary>
     ///ins_cempresa   
     ///</summary>
      public string ins_cempresa
      {
      
          get{ return this._ins_cempresa; }
          set{ this._ins_cempresa = value; }
        
      }
     ///<summary>
     ///ins_ccalle   
     ///</summary>
      public string ins_ccalle
      {
      
          get{ return this._ins_ccalle; }
          set{ this._ins_ccalle = value; }
        
      }
     ///<summary>
     ///ins_inumero   
     ///</summary>
      public int ins_inumero
      {
      
          get{ return this._ins_inumero; }
          set{ this._ins_inumero = value; }
        
      }
     ///<summary>
     ///ins_npiso   
     ///</summary>
      public Decimal ins_npiso
      {
      
          get{ return this._ins_npiso; }
          set{ this._ins_npiso = value; }
        
      }
     ///<summary>
     ///ins_cdepartamento   
     ///</summary>
      public string ins_cdepartamento
      {
      
          get{ return this._ins_cdepartamento; }
          set{ this._ins_cdepartamento = value; }
        
      }
     ///<summary>
     ///ins_ctelefono   
     ///</summary>
      public string ins_ctelefono
      {
      
          get{ return this._ins_ctelefono; }
          set{ this._ins_ctelefono = value; }
        
      }
     ///<summary>
     ///ins_cmail   
     ///</summary>
      public string ins_cmail
      {
      
          get{ return this._ins_cmail; }
          set{ this._ins_cmail = value; }
        
      }
     ///<summary>
     ///ins_cDealer   
     ///</summary>
      public string ins_cDealer
      {
      
          get{ return this._ins_cDealer; }
          set{ this._ins_cDealer = value; }
        
      }
     ///<summary>
     ///ins_iTipo   
     ///</summary>
      public int ins_iTipo
      {
      
          get{ return this._ins_iTipo; }
          set{ this._ins_iTipo = value; }
        
      }
     ///<summary>
     ///ins_irelacion   
     ///</summary>
      public int ins_irelacion
      {
      
          get{ return this._ins_irelacion; }
          set{ this._ins_irelacion = value; }
        
      }
     ///<summary>
     ///ins_iOrganizacion    
     ///</summary>
      public int ins_iOrganizacion 
      {
      
          get{ return this._ins_iOrganizacion ; }
          set{ this._ins_iOrganizacion  = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_instaladores(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_instaladores(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_instaladores(SqlHelper SqlConfig, int UserId, Simplet_instaladores Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._ins_ccodigo = Simple.ins_ccodigo;

      this._ins_cnombre = Simple.ins_cnombre;

      this._ins_cempresa = Simple.ins_cempresa;

      this._ins_ccalle = Simple.ins_ccalle;

      this._ins_inumero = Simple.ins_inumero;

      this._ins_npiso = Simple.ins_npiso;

      this._ins_cdepartamento = Simple.ins_cdepartamento;

      this._ins_ctelefono = Simple.ins_ctelefono;

      this._ins_cmail = Simple.ins_cmail;

      this._ins_cDealer = Simple.ins_cDealer;

      this._ins_iTipo = Simple.ins_iTipo;

      this._ins_irelacion = Simple.ins_irelacion;

      this._ins_iOrganizacion  = Simple.ins_iOrganizacion ;

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
    using(var cmd = new SqlCommand("t_instaladoresIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@ins_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cempresa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_npiso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@ins_cdepartamento", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_iTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_irelacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_iOrganizacion ", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@ins_ccodigo"].Value = (this._ins_ccodigo == null) ? (object) DBNull.Value : (object) this._ins_ccodigo;

		cmd.Parameters["@ins_cnombre"].Value = (this._ins_cnombre == null) ? (object) DBNull.Value : (object) this._ins_cnombre;

		cmd.Parameters["@ins_cempresa"].Value = (this._ins_cempresa == null) ? (object) DBNull.Value : (object) this._ins_cempresa;

		cmd.Parameters["@ins_ccalle"].Value = (this._ins_ccalle == null) ? (object) DBNull.Value : (object) this._ins_ccalle;

		cmd.Parameters["@ins_inumero"].Value = this._ins_inumero;

		cmd.Parameters["@ins_npiso"].Value = this._ins_npiso;

		cmd.Parameters["@ins_cdepartamento"].Value = (this._ins_cdepartamento == null) ? (object) DBNull.Value : (object) this._ins_cdepartamento;

		cmd.Parameters["@ins_ctelefono"].Value = (this._ins_ctelefono == null) ? (object) DBNull.Value : (object) this._ins_ctelefono;

		cmd.Parameters["@ins_cmail"].Value = (this._ins_cmail == null) ? (object) DBNull.Value : (object) this._ins_cmail;

		cmd.Parameters["@ins_cDealer"].Value = (this._ins_cDealer == null) ? (object) DBNull.Value : (object) this._ins_cDealer;

		cmd.Parameters["@ins_iTipo"].Value = this._ins_iTipo;

		cmd.Parameters["@ins_irelacion"].Value = this._ins_irelacion;

		cmd.Parameters["@ins_iOrganizacion "].Value = this._ins_iOrganizacion ;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_instaladoresUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@ins_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cempresa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_npiso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@ins_cdepartamento", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_iTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_irelacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_iOrganizacion ", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@ins_ccodigo"].Value = (this._ins_ccodigo == null) ? (object) DBNull.Value : (object) this._ins_ccodigo;

		cmd.Parameters["@ins_cnombre"].Value = (this._ins_cnombre == null) ? (object) DBNull.Value : (object) this._ins_cnombre;

		cmd.Parameters["@ins_cempresa"].Value = (this._ins_cempresa == null) ? (object) DBNull.Value : (object) this._ins_cempresa;

		cmd.Parameters["@ins_ccalle"].Value = (this._ins_ccalle == null) ? (object) DBNull.Value : (object) this._ins_ccalle;

		cmd.Parameters["@ins_inumero"].Value = this._ins_inumero;

		cmd.Parameters["@ins_npiso"].Value = this._ins_npiso;

		cmd.Parameters["@ins_cdepartamento"].Value = (this._ins_cdepartamento == null) ? (object) DBNull.Value : (object) this._ins_cdepartamento;

		cmd.Parameters["@ins_ctelefono"].Value = (this._ins_ctelefono == null) ? (object) DBNull.Value : (object) this._ins_ctelefono;

		cmd.Parameters["@ins_cmail"].Value = (this._ins_cmail == null) ? (object) DBNull.Value : (object) this._ins_cmail;

		cmd.Parameters["@ins_cDealer"].Value = (this._ins_cDealer == null) ? (object) DBNull.Value : (object) this._ins_cDealer;

		cmd.Parameters["@ins_iTipo"].Value = this._ins_iTipo;

		cmd.Parameters["@ins_irelacion"].Value = this._ins_irelacion;

		cmd.Parameters["@ins_iOrganizacion "].Value = this._ins_iOrganizacion ;

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
    throw new RuntimeException("The t_instaladores is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_instaladoresDel", conn))
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
    using(var CmdSel = new SqlCommand("t_instaladoresSel", conn))
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
    Simplet_instaladores Simple = new Simplet_instaladores();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.ins_ccodigo = this._ins_ccodigo;

      Simple.ins_cnombre = this._ins_cnombre;

      Simple.ins_cempresa = this._ins_cempresa;

      Simple.ins_ccalle = this._ins_ccalle;

      Simple.ins_inumero = this._ins_inumero;

      Simple.ins_npiso = this._ins_npiso;

      Simple.ins_cdepartamento = this._ins_cdepartamento;

      Simple.ins_ctelefono = this._ins_ctelefono;

      Simple.ins_cmail = this._ins_cmail;

      Simple.ins_cDealer = this._ins_cDealer;

      Simple.ins_iTipo = this._ins_iTipo;

      Simple.ins_irelacion = this._ins_irelacion;

      Simple.ins_iOrganizacion  = this._ins_iOrganizacion ;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_instaladores)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._ins_ccodigo = Simple.ins_ccodigo;

      this._ins_cnombre = Simple.ins_cnombre;

      this._ins_cempresa = Simple.ins_cempresa;

      this._ins_ccalle = Simple.ins_ccalle;

      this._ins_inumero = Simple.ins_inumero;

      this._ins_npiso = Simple.ins_npiso;

      this._ins_cdepartamento = Simple.ins_cdepartamento;

      this._ins_ctelefono = Simple.ins_ctelefono;

      this._ins_cmail = Simple.ins_cmail;

      this._ins_cDealer = Simple.ins_cDealer;

      this._ins_iTipo = Simple.ins_iTipo;

      this._ins_irelacion = Simple.ins_irelacion;

      this._ins_iOrganizacion  = Simple.ins_iOrganizacion ;

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
    Callert_instaladores Caller = new Callert_instaladores();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.ins_ccodigo = this._ins_ccodigo;

      Caller.ins_cnombre = this._ins_cnombre;

      Caller.ins_cempresa = this._ins_cempresa;

      Caller.ins_ccalle = this._ins_ccalle;

      Caller.ins_inumero = this._ins_inumero;

      Caller.ins_npiso = this._ins_npiso;

      Caller.ins_cdepartamento = this._ins_cdepartamento;

      Caller.ins_ctelefono = this._ins_ctelefono;

      Caller.ins_cmail = this._ins_cmail;

      Caller.ins_cDealer = this._ins_cDealer;

      Caller.ins_iTipo = this._ins_iTipo;

      Caller.ins_irelacion = this._ins_irelacion;

      Caller.ins_iOrganizacion  = this._ins_iOrganizacion ;

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
    
      dt.Columns.Add(new DataColumn("ins_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_cnombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_cempresa", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_ccalle", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_inumero", typeof (int)));
    
      dt.Columns.Add(new DataColumn("ins_npiso", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("ins_cdepartamento", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_ctelefono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_cmail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_cDealer", typeof (string)));
    
      dt.Columns.Add(new DataColumn("ins_iTipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("ins_irelacion", typeof (int)));
    
      dt.Columns.Add(new DataColumn("ins_iOrganizacion ", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["ins_ccodigo"] = this._ins_ccodigo;

      dr["ins_cnombre"] = this._ins_cnombre;

      dr["ins_cempresa"] = this._ins_cempresa;

      dr["ins_ccalle"] = this._ins_ccalle;

      dr["ins_inumero"] = this._ins_inumero;

      dr["ins_npiso"] = this._ins_npiso;

      dr["ins_cdepartamento"] = this._ins_cdepartamento;

      dr["ins_ctelefono"] = this._ins_ctelefono;

      dr["ins_cmail"] = this._ins_cmail;

      dr["ins_cDealer"] = this._ins_cDealer;

      dr["ins_iTipo"] = this._ins_iTipo;

      dr["ins_irelacion"] = this._ins_irelacion;

      dr["ins_iOrganizacion "] = this._ins_iOrganizacion ;

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
    using(var CmdChilds = new SqlCommand("t_instaladoresByChildObject", conn))
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
    Simplet_instaladores Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_instaladoresByChildObject", conn))
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
    Simple = new Simplet_instaladores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ins_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ins_cnombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ins_cempresa = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ins_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ins_inumero = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.ins_npiso = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.ins_cdepartamento = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.ins_ctelefono = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.ins_cmail = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.ins_cDealer = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.ins_iTipo = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.ins_irelacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.ins_iOrganizacion  = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);


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
    Simplet_instaladores Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_instaladores();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.ins_ccodigo = (Row["ins_ccodigo"] == DBNull.Value) ? "" : (string) Row["ins_ccodigo"];

Simple.ins_cnombre = (Row["ins_cnombre"] == DBNull.Value) ? "" : (string) Row["ins_cnombre"];

Simple.ins_cempresa = (Row["ins_cempresa"] == DBNull.Value) ? "" : (string) Row["ins_cempresa"];

Simple.ins_ccalle = (Row["ins_ccalle"] == DBNull.Value) ? "" : (string) Row["ins_ccalle"];

Simple.ins_inumero = (Row["ins_inumero"] == DBNull.Value) ? 0 : (int) Row["ins_inumero"];

Simple.ins_npiso = (Row["ins_npiso"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["ins_npiso"];

Simple.ins_cdepartamento = (Row["ins_cdepartamento"] == DBNull.Value) ? "" : (string) Row["ins_cdepartamento"];

Simple.ins_ctelefono = (Row["ins_ctelefono"] == DBNull.Value) ? "" : (string) Row["ins_ctelefono"];

Simple.ins_cmail = (Row["ins_cmail"] == DBNull.Value) ? "" : (string) Row["ins_cmail"];

Simple.ins_cDealer = (Row["ins_cDealer"] == DBNull.Value) ? "" : (string) Row["ins_cDealer"];

Simple.ins_iTipo = (Row["ins_iTipo"] == DBNull.Value) ? 0 : (int) Row["ins_iTipo"];

Simple.ins_irelacion = (Row["ins_irelacion"] == DBNull.Value) ? 0 : (int) Row["ins_irelacion"];

Simple.ins_iOrganizacion  = (Row["ins_iOrganizacion "] == DBNull.Value) ? 0 : (int) Row["ins_iOrganizacion "];


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
    using(var CmdParents = new SqlCommand("t_instaladoresByParentObject", conn))
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
    Simplet_instaladores Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_instaladoresByParentObject", conn))
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
    Simple = new Simplet_instaladores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ins_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ins_cnombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ins_cempresa = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ins_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ins_inumero = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.ins_npiso = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.ins_cdepartamento = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.ins_ctelefono = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.ins_cmail = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.ins_cDealer = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.ins_iTipo = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.ins_irelacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.ins_iOrganizacion  = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);


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
    using (var CmdDataByName = new SqlCommand("t_instaladoresByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_instaladoresByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_instaladoresByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_instaladoresByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_instaladoresByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_instaladores Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_instaladoresBySimplet_instaladores", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@ins_ccodigo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cempresa", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_ccalle", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_inumero", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_npiso", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@ins_cdepartamento", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@ins_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@ins_iTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_irelacion", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@ins_iOrganizacion ", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@ins_ccodigo"].Value = (this._ins_ccodigo == null) ? (object) DBNull.Value : (object) this._ins_ccodigo;

		cmd.Parameters["@ins_cnombre"].Value = (this._ins_cnombre == null) ? (object) DBNull.Value : (object) this._ins_cnombre;

		cmd.Parameters["@ins_cempresa"].Value = (this._ins_cempresa == null) ? (object) DBNull.Value : (object) this._ins_cempresa;

		cmd.Parameters["@ins_ccalle"].Value = (this._ins_ccalle == null) ? (object) DBNull.Value : (object) this._ins_ccalle;

		cmd.Parameters["@ins_inumero"].Value = this._ins_inumero;

		cmd.Parameters["@ins_npiso"].Value = this._ins_npiso;

		cmd.Parameters["@ins_cdepartamento"].Value = (this._ins_cdepartamento == null) ? (object) DBNull.Value : (object) this._ins_cdepartamento;

		cmd.Parameters["@ins_ctelefono"].Value = (this._ins_ctelefono == null) ? (object) DBNull.Value : (object) this._ins_ctelefono;

		cmd.Parameters["@ins_cmail"].Value = (this._ins_cmail == null) ? (object) DBNull.Value : (object) this._ins_cmail;

		cmd.Parameters["@ins_cDealer"].Value = (this._ins_cDealer == null) ? (object) DBNull.Value : (object) this._ins_cDealer;

		cmd.Parameters["@ins_iTipo"].Value = this._ins_iTipo;

		cmd.Parameters["@ins_irelacion"].Value = this._ins_irelacion;

		cmd.Parameters["@ins_iOrganizacion "].Value = this._ins_iOrganizacion ;


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
		 
		public IEnumerable<Simplet_instaladores> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_instaladoresByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_instaladores Simple = new Simplet_instaladores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ins_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ins_cnombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ins_cempresa = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ins_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ins_inumero = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.ins_npiso = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.ins_cdepartamento = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.ins_ctelefono = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.ins_cmail = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.ins_cDealer = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.ins_iTipo = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.ins_irelacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.ins_iOrganizacion  = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_instaladores> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_instaladoresByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_instaladores Simple = new Simplet_instaladores();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.ins_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.ins_cnombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.ins_cempresa = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.ins_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.ins_inumero = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.ins_npiso = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.ins_cdepartamento = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.ins_ctelefono = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.ins_cmail = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.ins_cDealer = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.ins_iTipo = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)Simple.ins_irelacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)Simple.ins_iOrganizacion  = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3080, "t_instaladores");
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
    if (Reader.FieldCount > 2)this._ins_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._ins_cnombre = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._ins_cempresa = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._ins_ccalle = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._ins_inumero = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._ins_npiso = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._ins_cdepartamento = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._ins_ctelefono = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._ins_cmail = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._ins_cDealer = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._ins_iTipo = (Reader.IsDBNull(12)) ? 0 : Reader.GetInt32(12);
if (Reader.FieldCount > 13)this._ins_irelacion = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);
if (Reader.FieldCount > 14)this._ins_iOrganizacion  = (Reader.IsDBNull(14)) ? 0 : Reader.GetInt32(14);

    }
    Reader.Close();
    }
   }
  
    }
  