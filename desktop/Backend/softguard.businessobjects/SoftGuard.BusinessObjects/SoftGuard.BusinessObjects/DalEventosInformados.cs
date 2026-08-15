
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
     ///EventosInformados data access layer   
     ///</summary>
    public class DalEventosInformados : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _evi_iRecId;
    
      private int _evi_iCuentaId;
    
      private int _evi_iUsuario;
    
      private string _evi_cUsuarioNombre;
    
      private string _evi_cAlarma;
    
      private string _evi_cAlarmaDesc;
    
      private int _evi_iCheck;
    
      private int _evi_iCheckType;
    
      private int _evi_iDevice;
    
      private int _evi_iStatus;
    
      private DateTime? _evi_tStatusExec;
    
      private int _evi_iGenRecId;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///evi_iRecId   
     ///</summary>
      public int evi_iRecId
      {
      
          get{ return this._evi_iRecId; }
          set{ this._evi_iRecId = value; }
        
      }
     ///<summary>
     ///evi_iCuentaId   
     ///</summary>
      public int evi_iCuentaId
      {
      
          get{ return this._evi_iCuentaId; }
          set{ this._evi_iCuentaId = value; }
        
      }
     ///<summary>
     ///evi_iUsuario   
     ///</summary>
      public int evi_iUsuario
      {
      
          get{ return this._evi_iUsuario; }
          set{ this._evi_iUsuario = value; }
        
      }
     ///<summary>
     ///evi_cUsuarioNombre   
     ///</summary>
      public string evi_cUsuarioNombre
      {
      
          get{ return this._evi_cUsuarioNombre; }
          set{ this._evi_cUsuarioNombre = value; }
        
      }
     ///<summary>
     ///evi_cAlarma   
     ///</summary>
      public string evi_cAlarma
      {
      
          get{ return this._evi_cAlarma; }
          set{ this._evi_cAlarma = value; }
        
      }
     ///<summary>
     ///evi_cAlarmaDesc   
     ///</summary>
      public string evi_cAlarmaDesc
      {
      
          get{ return this._evi_cAlarmaDesc; }
          set{ this._evi_cAlarmaDesc = value; }
        
      }
     ///<summary>
     ///evi_iCheck   
     ///</summary>
      public int evi_iCheck
      {
      
          get{ return this._evi_iCheck; }
          set{ this._evi_iCheck = value; }
        
      }
     ///<summary>
     ///evi_iCheckType   
     ///</summary>
      public int evi_iCheckType
      {
      
          get{ return this._evi_iCheckType; }
          set{ this._evi_iCheckType = value; }
        
      }
     ///<summary>
     ///evi_iDevice   
     ///</summary>
      public int evi_iDevice
      {
      
          get{ return this._evi_iDevice; }
          set{ this._evi_iDevice = value; }
        
      }
     ///<summary>
     ///evi_iStatus   
     ///</summary>
      public int evi_iStatus
      {
      
          get{ return this._evi_iStatus; }
          set{ this._evi_iStatus = value; }
        
      }
     ///<summary>
     ///evi_tStatusExec   
     ///</summary>
      public DateTime? evi_tStatusExec
      {
      
          get{ return this._evi_tStatusExec; }
          set{ this._evi_tStatusExec = value; }
        
      }
     ///<summary>
     ///evi_iGenRecId   
     ///</summary>
      public int evi_iGenRecId
      {
      
          get{ return this._evi_iGenRecId; }
          set{ this._evi_iGenRecId = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosInformados(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosInformados(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosInformados(SqlHelper SqlConfig, int UserId, SimpleEventosInformados Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._evi_iRecId = Simple.evi_iRecId;

      this._evi_iCuentaId = Simple.evi_iCuentaId;

      this._evi_iUsuario = Simple.evi_iUsuario;

      this._evi_cUsuarioNombre = Simple.evi_cUsuarioNombre;

      this._evi_cAlarma = Simple.evi_cAlarma;

      this._evi_cAlarmaDesc = Simple.evi_cAlarmaDesc;

      this._evi_iCheck = Simple.evi_iCheck;

      this._evi_iCheckType = Simple.evi_iCheckType;

      this._evi_iDevice = Simple.evi_iDevice;

      this._evi_iStatus = Simple.evi_iStatus;

      this._evi_tStatusExec = Simple.evi_tStatusExec;

      this._evi_iGenRecId = Simple.evi_iGenRecId;

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
    using(var cmd = new SqlCommand("EventosInformadosIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@evi_iRecId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iUsuario", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_cUsuarioNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@evi_cAlarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@evi_cAlarmaDesc", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@evi_iCheck", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iCheckType", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iDevice", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_tStatusExec", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@evi_iGenRecId", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@evi_iRecId"].Value = this._evi_iRecId;

		cmd.Parameters["@evi_iCuentaId"].Value = this._evi_iCuentaId;

		cmd.Parameters["@evi_iUsuario"].Value = this._evi_iUsuario;

		cmd.Parameters["@evi_cUsuarioNombre"].Value = (this._evi_cUsuarioNombre == null) ? (object) DBNull.Value : (object) this._evi_cUsuarioNombre;

		cmd.Parameters["@evi_cAlarma"].Value = (this._evi_cAlarma == null) ? (object) DBNull.Value : (object) this._evi_cAlarma;

		cmd.Parameters["@evi_cAlarmaDesc"].Value = (this._evi_cAlarmaDesc == null) ? (object) DBNull.Value : (object) this._evi_cAlarmaDesc;

		cmd.Parameters["@evi_iCheck"].Value = this._evi_iCheck;

		cmd.Parameters["@evi_iCheckType"].Value = this._evi_iCheckType;

		cmd.Parameters["@evi_iDevice"].Value = this._evi_iDevice;

		cmd.Parameters["@evi_iStatus"].Value = this._evi_iStatus;

		cmd.Parameters["@evi_tStatusExec"].Value = (this._evi_tStatusExec == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._evi_tStatusExec;

		cmd.Parameters["@evi_iGenRecId"].Value = this._evi_iGenRecId;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EventosInformadosUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@evi_iRecId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iUsuario", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_cUsuarioNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@evi_cAlarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@evi_cAlarmaDesc", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@evi_iCheck", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iCheckType", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iDevice", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_tStatusExec", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@evi_iGenRecId", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@evi_iRecId"].Value = this._evi_iRecId;

		cmd.Parameters["@evi_iCuentaId"].Value = this._evi_iCuentaId;

		cmd.Parameters["@evi_iUsuario"].Value = this._evi_iUsuario;

		cmd.Parameters["@evi_cUsuarioNombre"].Value = (this._evi_cUsuarioNombre == null) ? (object) DBNull.Value : (object) this._evi_cUsuarioNombre;

		cmd.Parameters["@evi_cAlarma"].Value = (this._evi_cAlarma == null) ? (object) DBNull.Value : (object) this._evi_cAlarma;

		cmd.Parameters["@evi_cAlarmaDesc"].Value = (this._evi_cAlarmaDesc == null) ? (object) DBNull.Value : (object) this._evi_cAlarmaDesc;

		cmd.Parameters["@evi_iCheck"].Value = this._evi_iCheck;

		cmd.Parameters["@evi_iCheckType"].Value = this._evi_iCheckType;

		cmd.Parameters["@evi_iDevice"].Value = this._evi_iDevice;

		cmd.Parameters["@evi_iStatus"].Value = this._evi_iStatus;

		cmd.Parameters["@evi_tStatusExec"].Value = (this._evi_tStatusExec == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._evi_tStatusExec;

		cmd.Parameters["@evi_iGenRecId"].Value = this._evi_iGenRecId;

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
    throw new RuntimeException("The EventosInformados is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("EventosInformadosDel", conn))
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
    using(var CmdSel = new SqlCommand("EventosInformadosSel", conn))
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
    SimpleEventosInformados Simple = new SimpleEventosInformados();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.evi_iRecId = this._evi_iRecId;

      Simple.evi_iCuentaId = this._evi_iCuentaId;

      Simple.evi_iUsuario = this._evi_iUsuario;

      Simple.evi_cUsuarioNombre = this._evi_cUsuarioNombre;

      Simple.evi_cAlarma = this._evi_cAlarma;

      Simple.evi_cAlarmaDesc = this._evi_cAlarmaDesc;

      Simple.evi_iCheck = this._evi_iCheck;

      Simple.evi_iCheckType = this._evi_iCheckType;

      Simple.evi_iDevice = this._evi_iDevice;

      Simple.evi_iStatus = this._evi_iStatus;

      Simple.evi_tStatusExec = this._evi_tStatusExec;

      Simple.evi_iGenRecId = this._evi_iGenRecId;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleEventosInformados)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._evi_iRecId = Simple.evi_iRecId;

      this._evi_iCuentaId = Simple.evi_iCuentaId;

      this._evi_iUsuario = Simple.evi_iUsuario;

      this._evi_cUsuarioNombre = Simple.evi_cUsuarioNombre;

      this._evi_cAlarma = Simple.evi_cAlarma;

      this._evi_cAlarmaDesc = Simple.evi_cAlarmaDesc;

      this._evi_iCheck = Simple.evi_iCheck;

      this._evi_iCheckType = Simple.evi_iCheckType;

      this._evi_iDevice = Simple.evi_iDevice;

      this._evi_iStatus = Simple.evi_iStatus;

      this._evi_tStatusExec = Simple.evi_tStatusExec;

      this._evi_iGenRecId = Simple.evi_iGenRecId;

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
    CallerEventosInformados Caller = new CallerEventosInformados();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.evi_iRecId = this._evi_iRecId;

      Caller.evi_iCuentaId = this._evi_iCuentaId;

      Caller.evi_iUsuario = this._evi_iUsuario;

      Caller.evi_cUsuarioNombre = this._evi_cUsuarioNombre;

      Caller.evi_cAlarma = this._evi_cAlarma;

      Caller.evi_cAlarmaDesc = this._evi_cAlarmaDesc;

      Caller.evi_iCheck = this._evi_iCheck;

      Caller.evi_iCheckType = this._evi_iCheckType;

      Caller.evi_iDevice = this._evi_iDevice;

      Caller.evi_iStatus = this._evi_iStatus;

      Caller.evi_tStatusExec = this._evi_tStatusExec;

      Caller.evi_iGenRecId = this._evi_iGenRecId;

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
    
      dt.Columns.Add(new DataColumn("evi_iRecId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("evi_iCuentaId", typeof (int)));
    
      dt.Columns.Add(new DataColumn("evi_iUsuario", typeof (int)));
    
      dt.Columns.Add(new DataColumn("evi_cUsuarioNombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("evi_cAlarma", typeof (string)));
    
      dt.Columns.Add(new DataColumn("evi_cAlarmaDesc", typeof (string)));
    
      dt.Columns.Add(new DataColumn("evi_iCheck", typeof (int)));
    
      dt.Columns.Add(new DataColumn("evi_iCheckType", typeof (int)));
    
      dt.Columns.Add(new DataColumn("evi_iDevice", typeof (int)));
    
      dt.Columns.Add(new DataColumn("evi_iStatus", typeof (int)));
    
      dt.Columns.Add(new DataColumn("evi_tStatusExec", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("evi_iGenRecId", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["evi_iRecId"] = this._evi_iRecId;

      dr["evi_iCuentaId"] = this._evi_iCuentaId;

      dr["evi_iUsuario"] = this._evi_iUsuario;

      dr["evi_cUsuarioNombre"] = this._evi_cUsuarioNombre;

      dr["evi_cAlarma"] = this._evi_cAlarma;

      dr["evi_cAlarmaDesc"] = this._evi_cAlarmaDesc;

      dr["evi_iCheck"] = this._evi_iCheck;

      dr["evi_iCheckType"] = this._evi_iCheckType;

      dr["evi_iDevice"] = this._evi_iDevice;

      dr["evi_iStatus"] = this._evi_iStatus;

      dr["evi_tStatusExec"] = (object)this._evi_tStatusExec  ?? DBNull.Value;

      dr["evi_iGenRecId"] = this._evi_iGenRecId;

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
    using(var CmdChilds = new SqlCommand("EventosInformadosByChildObject", conn))
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
    SimpleEventosInformados Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("EventosInformadosByChildObject", conn))
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
    Simple = new SimpleEventosInformados();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.evi_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.evi_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.evi_iUsuario = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.evi_cUsuarioNombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.evi_cAlarma = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.evi_cAlarmaDesc = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.evi_iCheck = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.evi_iCheckType = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.evi_iDevice = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.evi_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.evi_tStatusExec = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.evi_iGenRecId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    SimpleEventosInformados Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleEventosInformados();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.evi_iRecId = (Row["evi_iRecId"] == DBNull.Value) ? 0 : (int) Row["evi_iRecId"];

Simple.evi_iCuentaId = (Row["evi_iCuentaId"] == DBNull.Value) ? 0 : (int) Row["evi_iCuentaId"];

Simple.evi_iUsuario = (Row["evi_iUsuario"] == DBNull.Value) ? 0 : (int) Row["evi_iUsuario"];

Simple.evi_cUsuarioNombre = (Row["evi_cUsuarioNombre"] == DBNull.Value) ? "" : (string) Row["evi_cUsuarioNombre"];

Simple.evi_cAlarma = (Row["evi_cAlarma"] == DBNull.Value) ? "" : (string) Row["evi_cAlarma"];

Simple.evi_cAlarmaDesc = (Row["evi_cAlarmaDesc"] == DBNull.Value) ? "" : (string) Row["evi_cAlarmaDesc"];

Simple.evi_iCheck = (Row["evi_iCheck"] == DBNull.Value) ? 0 : (int) Row["evi_iCheck"];

Simple.evi_iCheckType = (Row["evi_iCheckType"] == DBNull.Value) ? 0 : (int) Row["evi_iCheckType"];

Simple.evi_iDevice = (Row["evi_iDevice"] == DBNull.Value) ? 0 : (int) Row["evi_iDevice"];

Simple.evi_iStatus = (Row["evi_iStatus"] == DBNull.Value) ? 0 : (int) Row["evi_iStatus"];

Simple.evi_tStatusExec = (Row["evi_tStatusExec"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["evi_tStatusExec"];

Simple.evi_iGenRecId = (Row["evi_iGenRecId"] == DBNull.Value) ? 0 : (int) Row["evi_iGenRecId"];


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
    using(var CmdParents = new SqlCommand("EventosInformadosByParentObject", conn))
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
    SimpleEventosInformados Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("EventosInformadosByParentObject", conn))
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
    Simple = new SimpleEventosInformados();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.evi_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.evi_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.evi_iUsuario = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.evi_cUsuarioNombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.evi_cAlarma = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.evi_cAlarmaDesc = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.evi_iCheck = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.evi_iCheckType = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.evi_iDevice = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.evi_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.evi_tStatusExec = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.evi_iGenRecId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    using (var CmdDataByName = new SqlCommand("EventosInformadosByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("EventosInformadosByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("EventosInformadosByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("EventosInformadosByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("EventosInformadosByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleEventosInformados Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EventosInformadosBySimpleEventosInformados", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@evi_iRecId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iCuentaId", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iUsuario", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_cUsuarioNombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@evi_cAlarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@evi_cAlarmaDesc", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@evi_iCheck", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iCheckType", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iDevice", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_iStatus", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@evi_tStatusExec", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@evi_iGenRecId", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@evi_iRecId"].Value = this._evi_iRecId;

		cmd.Parameters["@evi_iCuentaId"].Value = this._evi_iCuentaId;

		cmd.Parameters["@evi_iUsuario"].Value = this._evi_iUsuario;

		cmd.Parameters["@evi_cUsuarioNombre"].Value = (this._evi_cUsuarioNombre == null) ? (object) DBNull.Value : (object) this._evi_cUsuarioNombre;

		cmd.Parameters["@evi_cAlarma"].Value = (this._evi_cAlarma == null) ? (object) DBNull.Value : (object) this._evi_cAlarma;

		cmd.Parameters["@evi_cAlarmaDesc"].Value = (this._evi_cAlarmaDesc == null) ? (object) DBNull.Value : (object) this._evi_cAlarmaDesc;

		cmd.Parameters["@evi_iCheck"].Value = this._evi_iCheck;

		cmd.Parameters["@evi_iCheckType"].Value = this._evi_iCheckType;

		cmd.Parameters["@evi_iDevice"].Value = this._evi_iDevice;

		cmd.Parameters["@evi_iStatus"].Value = this._evi_iStatus;

		cmd.Parameters["@evi_tStatusExec"].Value = (this._evi_tStatusExec == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._evi_tStatusExec;

		cmd.Parameters["@evi_iGenRecId"].Value = this._evi_iGenRecId;


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
		 
		public IEnumerable<SimpleEventosInformados> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EventosInformadosByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEventosInformados Simple = new SimpleEventosInformados();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.evi_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.evi_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.evi_iUsuario = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.evi_cUsuarioNombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.evi_cAlarma = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.evi_cAlarmaDesc = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.evi_iCheck = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.evi_iCheckType = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.evi_iDevice = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.evi_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.evi_tStatusExec = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.evi_iGenRecId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleEventosInformados> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EventosInformadosByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEventosInformados Simple = new SimpleEventosInformados();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.evi_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.evi_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.evi_iUsuario = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.evi_cUsuarioNombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.evi_cAlarma = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.evi_cAlarmaDesc = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.evi_iCheck = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.evi_iCheckType = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.evi_iDevice = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.evi_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.evi_tStatusExec = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.evi_iGenRecId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(7031, "EventosInformados");
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
    if (Reader.FieldCount > 2)this._evi_iRecId = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._evi_iCuentaId = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._evi_iUsuario = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._evi_cUsuarioNombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._evi_cAlarma = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._evi_cAlarmaDesc = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._evi_iCheck = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._evi_iCheckType = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._evi_iDevice = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._evi_iStatus = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._evi_tStatusExec = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)this._evi_iGenRecId = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    }
    Reader.Close();
    }
   }
  
    }
  