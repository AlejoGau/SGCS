
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
     ///t_modems_sms data access layer   
     ///</summary>
    public class Dalt_modems_sms : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _sms_icodigo;
    
      private string _sms_cdescripcion;
    
      private Decimal _sms_nport;
    
      private string _sms_cseteo;
    
      private string _sms_cinbox;
    
      private Decimal _sms_ndefault;
    
      private string _sms_cterminal;
    
      private string _sms_csource;
    
      private Decimal _sms_nEstado;
    
      private int _sms_iGateway;
    
      private string _sms_cDealer;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///sms_icodigo   
     ///</summary>
      public int sms_icodigo
      {
      
          get{ return this._sms_icodigo; }
          set{ this._sms_icodigo = value; }
        
      }
     ///<summary>
     ///sms_cdescripcion   
     ///</summary>
      public string sms_cdescripcion
      {
      
          get{ return this._sms_cdescripcion; }
          set{ this._sms_cdescripcion = value; }
        
      }
     ///<summary>
     ///sms_nport   
     ///</summary>
      public Decimal sms_nport
      {
      
          get{ return this._sms_nport; }
          set{ this._sms_nport = value; }
        
      }
     ///<summary>
     ///sms_cseteo   
     ///</summary>
      public string sms_cseteo
      {
      
          get{ return this._sms_cseteo; }
          set{ this._sms_cseteo = value; }
        
      }
     ///<summary>
     ///sms_cinbox   
     ///</summary>
      public string sms_cinbox
      {
      
          get{ return this._sms_cinbox; }
          set{ this._sms_cinbox = value; }
        
      }
     ///<summary>
     ///sms_ndefault   
     ///</summary>
      public Decimal sms_ndefault
      {
      
          get{ return this._sms_ndefault; }
          set{ this._sms_ndefault = value; }
        
      }
     ///<summary>
     ///sms_cterminal   
     ///</summary>
      public string sms_cterminal
      {
      
          get{ return this._sms_cterminal; }
          set{ this._sms_cterminal = value; }
        
      }
     ///<summary>
     ///sms_csource   
     ///</summary>
      public string sms_csource
      {
      
          get{ return this._sms_csource; }
          set{ this._sms_csource = value; }
        
      }
     ///<summary>
     ///sms_nEstado   
     ///</summary>
      public Decimal sms_nEstado
      {
      
          get{ return this._sms_nEstado; }
          set{ this._sms_nEstado = value; }
        
      }
     ///<summary>
     ///sms_iGateway   
     ///</summary>
      public int sms_iGateway
      {
      
          get{ return this._sms_iGateway; }
          set{ this._sms_iGateway = value; }
        
      }
     ///<summary>
     ///sms_cDealer   
     ///</summary>
      public string sms_cDealer
      {
      
          get{ return this._sms_cDealer; }
          set{ this._sms_cDealer = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_modems_sms(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_modems_sms(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_modems_sms(SqlHelper SqlConfig, int UserId, Simplet_modems_sms Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sms_icodigo = Simple.sms_icodigo;

      this._sms_cdescripcion = Simple.sms_cdescripcion;

      this._sms_nport = Simple.sms_nport;

      this._sms_cseteo = Simple.sms_cseteo;

      this._sms_cinbox = Simple.sms_cinbox;

      this._sms_ndefault = Simple.sms_ndefault;

      this._sms_cterminal = Simple.sms_cterminal;

      this._sms_csource = Simple.sms_csource;

      this._sms_nEstado = Simple.sms_nEstado;

      this._sms_iGateway = Simple.sms_iGateway;

      this._sms_cDealer = Simple.sms_cDealer;

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
    using(var cmd = new SqlCommand("t_modems_smsIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@sms_icodigo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_nport", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_cseteo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_cinbox", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_ndefault", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_cterminal", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_csource", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_nEstado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_iGateway", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cDealer", SqlDbType.VarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sms_icodigo"].Value = this._sms_icodigo;

		cmd.Parameters["@sms_cdescripcion"].Value = (this._sms_cdescripcion == null) ? (object) DBNull.Value : (object) this._sms_cdescripcion;

		cmd.Parameters["@sms_nport"].Value = this._sms_nport;

		cmd.Parameters["@sms_cseteo"].Value = (this._sms_cseteo == null) ? (object) DBNull.Value : (object) this._sms_cseteo;

		cmd.Parameters["@sms_cinbox"].Value = (this._sms_cinbox == null) ? (object) DBNull.Value : (object) this._sms_cinbox;

		cmd.Parameters["@sms_ndefault"].Value = this._sms_ndefault;

		cmd.Parameters["@sms_cterminal"].Value = (this._sms_cterminal == null) ? (object) DBNull.Value : (object) this._sms_cterminal;

		cmd.Parameters["@sms_csource"].Value = (this._sms_csource == null) ? (object) DBNull.Value : (object) this._sms_csource;

		cmd.Parameters["@sms_nEstado"].Value = this._sms_nEstado;

		cmd.Parameters["@sms_iGateway"].Value = this._sms_iGateway;

		cmd.Parameters["@sms_cDealer"].Value = (this._sms_cDealer == null) ? (object) DBNull.Value : (object) this._sms_cDealer;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_modems_smsUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@sms_icodigo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_nport", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_cseteo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_cinbox", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_ndefault", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_cterminal", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_csource", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_nEstado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_iGateway", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cDealer", SqlDbType.VarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@sms_icodigo"].Value = this._sms_icodigo;

		cmd.Parameters["@sms_cdescripcion"].Value = (this._sms_cdescripcion == null) ? (object) DBNull.Value : (object) this._sms_cdescripcion;

		cmd.Parameters["@sms_nport"].Value = this._sms_nport;

		cmd.Parameters["@sms_cseteo"].Value = (this._sms_cseteo == null) ? (object) DBNull.Value : (object) this._sms_cseteo;

		cmd.Parameters["@sms_cinbox"].Value = (this._sms_cinbox == null) ? (object) DBNull.Value : (object) this._sms_cinbox;

		cmd.Parameters["@sms_ndefault"].Value = this._sms_ndefault;

		cmd.Parameters["@sms_cterminal"].Value = (this._sms_cterminal == null) ? (object) DBNull.Value : (object) this._sms_cterminal;

		cmd.Parameters["@sms_csource"].Value = (this._sms_csource == null) ? (object) DBNull.Value : (object) this._sms_csource;

		cmd.Parameters["@sms_nEstado"].Value = this._sms_nEstado;

		cmd.Parameters["@sms_iGateway"].Value = this._sms_iGateway;

		cmd.Parameters["@sms_cDealer"].Value = (this._sms_cDealer == null) ? (object) DBNull.Value : (object) this._sms_cDealer;

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
    throw new RuntimeException("The t_modems_sms is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_modems_smsDel", conn))
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
    using(var CmdSel = new SqlCommand("t_modems_smsSel", conn))
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
    Simplet_modems_sms Simple = new Simplet_modems_sms();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.sms_icodigo = this._sms_icodigo;

      Simple.sms_cdescripcion = this._sms_cdescripcion;

      Simple.sms_nport = this._sms_nport;

      Simple.sms_cseteo = this._sms_cseteo;

      Simple.sms_cinbox = this._sms_cinbox;

      Simple.sms_ndefault = this._sms_ndefault;

      Simple.sms_cterminal = this._sms_cterminal;

      Simple.sms_csource = this._sms_csource;

      Simple.sms_nEstado = this._sms_nEstado;

      Simple.sms_iGateway = this._sms_iGateway;

      Simple.sms_cDealer = this._sms_cDealer;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_modems_sms)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._sms_icodigo = Simple.sms_icodigo;

      this._sms_cdescripcion = Simple.sms_cdescripcion;

      this._sms_nport = Simple.sms_nport;

      this._sms_cseteo = Simple.sms_cseteo;

      this._sms_cinbox = Simple.sms_cinbox;

      this._sms_ndefault = Simple.sms_ndefault;

      this._sms_cterminal = Simple.sms_cterminal;

      this._sms_csource = Simple.sms_csource;

      this._sms_nEstado = Simple.sms_nEstado;

      this._sms_iGateway = Simple.sms_iGateway;

      this._sms_cDealer = Simple.sms_cDealer;

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
    Callert_modems_sms Caller = new Callert_modems_sms();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.sms_icodigo = this._sms_icodigo;

      Caller.sms_cdescripcion = this._sms_cdescripcion;

      Caller.sms_nport = this._sms_nport;

      Caller.sms_cseteo = this._sms_cseteo;

      Caller.sms_cinbox = this._sms_cinbox;

      Caller.sms_ndefault = this._sms_ndefault;

      Caller.sms_cterminal = this._sms_cterminal;

      Caller.sms_csource = this._sms_csource;

      Caller.sms_nEstado = this._sms_nEstado;

      Caller.sms_iGateway = this._sms_iGateway;

      Caller.sms_cDealer = this._sms_cDealer;

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
    
      dt.Columns.Add(new DataColumn("sms_icodigo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sms_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_nport", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("sms_cseteo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_cinbox", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_ndefault", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("sms_cterminal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_csource", typeof (string)));
    
      dt.Columns.Add(new DataColumn("sms_nEstado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("sms_iGateway", typeof (int)));
    
      dt.Columns.Add(new DataColumn("sms_cDealer", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["sms_icodigo"] = this._sms_icodigo;

      dr["sms_cdescripcion"] = this._sms_cdescripcion;

      dr["sms_nport"] = this._sms_nport;

      dr["sms_cseteo"] = this._sms_cseteo;

      dr["sms_cinbox"] = this._sms_cinbox;

      dr["sms_ndefault"] = this._sms_ndefault;

      dr["sms_cterminal"] = this._sms_cterminal;

      dr["sms_csource"] = this._sms_csource;

      dr["sms_nEstado"] = this._sms_nEstado;

      dr["sms_iGateway"] = this._sms_iGateway;

      dr["sms_cDealer"] = this._sms_cDealer;

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
    using(var CmdChilds = new SqlCommand("t_modems_smsByChildObject", conn))
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
    Simplet_modems_sms Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_modems_smsByChildObject", conn))
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
    Simple = new Simplet_modems_sms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_icodigo = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_nport = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.sms_cseteo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sms_cinbox = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_ndefault = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.sms_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_csource = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sms_nEstado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.sms_iGateway = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.sms_cDealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    Simplet_modems_sms Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_modems_sms();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.sms_icodigo = (Row["sms_icodigo"] == DBNull.Value) ? 0 : (int) Row["sms_icodigo"];

Simple.sms_cdescripcion = (Row["sms_cdescripcion"] == DBNull.Value) ? "" : (string) Row["sms_cdescripcion"];

Simple.sms_nport = (Row["sms_nport"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["sms_nport"];

Simple.sms_cseteo = (Row["sms_cseteo"] == DBNull.Value) ? "" : (string) Row["sms_cseteo"];

Simple.sms_cinbox = (Row["sms_cinbox"] == DBNull.Value) ? "" : (string) Row["sms_cinbox"];

Simple.sms_ndefault = (Row["sms_ndefault"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["sms_ndefault"];

Simple.sms_cterminal = (Row["sms_cterminal"] == DBNull.Value) ? "" : (string) Row["sms_cterminal"];

Simple.sms_csource = (Row["sms_csource"] == DBNull.Value) ? "" : (string) Row["sms_csource"];

Simple.sms_nEstado = (Row["sms_nEstado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["sms_nEstado"];

Simple.sms_iGateway = (Row["sms_iGateway"] == DBNull.Value) ? 0 : (int) Row["sms_iGateway"];

Simple.sms_cDealer = (Row["sms_cDealer"] == DBNull.Value) ? "" : (string) Row["sms_cDealer"];


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
    using(var CmdParents = new SqlCommand("t_modems_smsByParentObject", conn))
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
    Simplet_modems_sms Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_modems_smsByParentObject", conn))
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
    Simple = new Simplet_modems_sms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_icodigo = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_nport = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.sms_cseteo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sms_cinbox = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_ndefault = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.sms_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_csource = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sms_nEstado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.sms_iGateway = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.sms_cDealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    using (var CmdDataByName = new SqlCommand("t_modems_smsByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_modems_smsByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_modems_smsByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_modems_smsByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_modems_smsByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_modems_sms Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_modems_smsBySimplet_modems_sms", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@sms_icodigo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_nport", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_cseteo", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_cinbox", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_ndefault", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_cterminal", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@sms_csource", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@sms_nEstado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@sms_iGateway", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@sms_cDealer", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@sms_icodigo"].Value = this._sms_icodigo;

		cmd.Parameters["@sms_cdescripcion"].Value = (this._sms_cdescripcion == null) ? (object) DBNull.Value : (object) this._sms_cdescripcion;

		cmd.Parameters["@sms_nport"].Value = this._sms_nport;

		cmd.Parameters["@sms_cseteo"].Value = (this._sms_cseteo == null) ? (object) DBNull.Value : (object) this._sms_cseteo;

		cmd.Parameters["@sms_cinbox"].Value = (this._sms_cinbox == null) ? (object) DBNull.Value : (object) this._sms_cinbox;

		cmd.Parameters["@sms_ndefault"].Value = this._sms_ndefault;

		cmd.Parameters["@sms_cterminal"].Value = (this._sms_cterminal == null) ? (object) DBNull.Value : (object) this._sms_cterminal;

		cmd.Parameters["@sms_csource"].Value = (this._sms_csource == null) ? (object) DBNull.Value : (object) this._sms_csource;

		cmd.Parameters["@sms_nEstado"].Value = this._sms_nEstado;

		cmd.Parameters["@sms_iGateway"].Value = this._sms_iGateway;

		cmd.Parameters["@sms_cDealer"].Value = (this._sms_cDealer == null) ? (object) DBNull.Value : (object) this._sms_cDealer;


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
		 
		public IEnumerable<Simplet_modems_sms> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_modems_smsByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_modems_sms Simple = new Simplet_modems_sms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_icodigo = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_nport = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.sms_cseteo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sms_cinbox = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_ndefault = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.sms_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_csource = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sms_nEstado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.sms_iGateway = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.sms_cDealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_modems_sms> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_modems_smsByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_modems_sms Simple = new Simplet_modems_sms();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.sms_icodigo = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.sms_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.sms_nport = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.sms_cseteo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.sms_cinbox = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.sms_ndefault = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.sms_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.sms_csource = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.sms_nEstado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.sms_iGateway = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.sms_cDealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3082, "t_modems_sms");
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
    if (Reader.FieldCount > 2)this._sms_icodigo = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._sms_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._sms_nport = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)this._sms_cseteo = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._sms_cinbox = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._sms_ndefault = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._sms_cterminal = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._sms_csource = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._sms_nEstado = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)this._sms_iGateway = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._sms_cDealer = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    }
    Reader.Close();
    }
   }
  
    }
  