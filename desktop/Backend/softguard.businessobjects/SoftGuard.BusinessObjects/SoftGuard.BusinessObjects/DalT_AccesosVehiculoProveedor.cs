
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
     ///T_AccesosVehiculoProveedor data access layer   
     ///</summary>
    public class DalT_AccesosVehiculoProveedor : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _avp_iVehicleBrand;
    
      private int _avp_iVehicleModel;
    
      private string _avp_cMatricula;
    
      private string _avp_cColor;
    
      private int _avp_iYear;
    
      private string _avp_cTipo;
    
      private string _avp_cCiaSeguro;
    
      private DateTime? _avp_tVtoSeguro;
    
      private DateTime? _avp_tVtoVTV;
    
      private string _avp_cIdentificacion;
    
      private DateTime? _avp_tVtoIdentificacion;
    
      private string _avp_cObservaciones;
    
      private string _avp_cPathPicture;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///avp_iVehicleBrand   
     ///</summary>
      public int avp_iVehicleBrand
      {
      
          get{ return this._avp_iVehicleBrand; }
          set{ this._avp_iVehicleBrand = value; }
        
      }
     ///<summary>
     ///avp_iVehicleModel   
     ///</summary>
      public int avp_iVehicleModel
      {
      
          get{ return this._avp_iVehicleModel; }
          set{ this._avp_iVehicleModel = value; }
        
      }
     ///<summary>
     ///avp_cMatricula   
     ///</summary>
      public string avp_cMatricula
      {
      
          get{ return this._avp_cMatricula; }
          set{ this._avp_cMatricula = value; }
        
      }
     ///<summary>
     ///avp_cColor   
     ///</summary>
      public string avp_cColor
      {
      
          get{ return this._avp_cColor; }
          set{ this._avp_cColor = value; }
        
      }
     ///<summary>
     ///avp_iYear   
     ///</summary>
      public int avp_iYear
      {
      
          get{ return this._avp_iYear; }
          set{ this._avp_iYear = value; }
        
      }
     ///<summary>
     ///avp_cTipo   
     ///</summary>
      public string avp_cTipo
      {
      
          get{ return this._avp_cTipo; }
          set{ this._avp_cTipo = value; }
        
      }
     ///<summary>
     ///avp_cCiaSeguro   
     ///</summary>
      public string avp_cCiaSeguro
      {
      
          get{ return this._avp_cCiaSeguro; }
          set{ this._avp_cCiaSeguro = value; }
        
      }
     ///<summary>
     ///avp_tVtoSeguro   
     ///</summary>
      public DateTime? avp_tVtoSeguro
      {
      
          get{ return this._avp_tVtoSeguro; }
          set{ this._avp_tVtoSeguro = value; }
        
      }
     ///<summary>
     ///avp_tVtoVTV   
     ///</summary>
      public DateTime? avp_tVtoVTV
      {
      
          get{ return this._avp_tVtoVTV; }
          set{ this._avp_tVtoVTV = value; }
        
      }
     ///<summary>
     ///avp_cIdentificacion   
     ///</summary>
      public string avp_cIdentificacion
      {
      
          get{ return this._avp_cIdentificacion; }
          set{ this._avp_cIdentificacion = value; }
        
      }
     ///<summary>
     ///avp_tVtoIdentificacion   
     ///</summary>
      public DateTime? avp_tVtoIdentificacion
      {
      
          get{ return this._avp_tVtoIdentificacion; }
          set{ this._avp_tVtoIdentificacion = value; }
        
      }
     ///<summary>
     ///avp_cObservaciones   
     ///</summary>
      public string avp_cObservaciones
      {
      
          get{ return this._avp_cObservaciones; }
          set{ this._avp_cObservaciones = value; }
        
      }
     ///<summary>
     ///avp_cPathPicture   
     ///</summary>
      public string avp_cPathPicture
      {
      
          get{ return this._avp_cPathPicture; }
          set{ this._avp_cPathPicture = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalT_AccesosVehiculoProveedor(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalT_AccesosVehiculoProveedor(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalT_AccesosVehiculoProveedor(SqlHelper SqlConfig, int UserId, SimpleT_AccesosVehiculoProveedor Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._avp_iVehicleBrand = Simple.avp_iVehicleBrand;

      this._avp_iVehicleModel = Simple.avp_iVehicleModel;

      this._avp_cMatricula = Simple.avp_cMatricula;

      this._avp_cColor = Simple.avp_cColor;

      this._avp_iYear = Simple.avp_iYear;

      this._avp_cTipo = Simple.avp_cTipo;

      this._avp_cCiaSeguro = Simple.avp_cCiaSeguro;

      this._avp_tVtoSeguro = Simple.avp_tVtoSeguro;

      this._avp_tVtoVTV = Simple.avp_tVtoVTV;

      this._avp_cIdentificacion = Simple.avp_cIdentificacion;

      this._avp_tVtoIdentificacion = Simple.avp_tVtoIdentificacion;

      this._avp_cObservaciones = Simple.avp_cObservaciones;

      this._avp_cPathPicture = Simple.avp_cPathPicture;

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
    using(var cmd = new SqlCommand("T_AccesosVehiculoProveedorIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@avp_iVehicleBrand", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_iVehicleModel", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_cMatricula", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cColor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_iYear", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_cTipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cCiaSeguro", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_tVtoSeguro", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_tVtoVTV", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_tVtoIdentificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cPathPicture", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@avp_iVehicleBrand"].Value = this._avp_iVehicleBrand;

		cmd.Parameters["@avp_iVehicleModel"].Value = this._avp_iVehicleModel;

		cmd.Parameters["@avp_cMatricula"].Value = (this._avp_cMatricula == null) ? (object) DBNull.Value : (object) this._avp_cMatricula;

		cmd.Parameters["@avp_cColor"].Value = (this._avp_cColor == null) ? (object) DBNull.Value : (object) this._avp_cColor;

		cmd.Parameters["@avp_iYear"].Value = this._avp_iYear;

		cmd.Parameters["@avp_cTipo"].Value = (this._avp_cTipo == null) ? (object) DBNull.Value : (object) this._avp_cTipo;

		cmd.Parameters["@avp_cCiaSeguro"].Value = (this._avp_cCiaSeguro == null) ? (object) DBNull.Value : (object) this._avp_cCiaSeguro;

		cmd.Parameters["@avp_tVtoSeguro"].Value = (this._avp_tVtoSeguro == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoSeguro;

		cmd.Parameters["@avp_tVtoVTV"].Value = (this._avp_tVtoVTV == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoVTV;

		cmd.Parameters["@avp_cIdentificacion"].Value = (this._avp_cIdentificacion == null) ? (object) DBNull.Value : (object) this._avp_cIdentificacion;

		cmd.Parameters["@avp_tVtoIdentificacion"].Value = (this._avp_tVtoIdentificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoIdentificacion;

		cmd.Parameters["@avp_cObservaciones"].Value = (this._avp_cObservaciones == null) ? (object) DBNull.Value : (object) this._avp_cObservaciones;

		cmd.Parameters["@avp_cPathPicture"].Value = (this._avp_cPathPicture == null) ? (object) DBNull.Value : (object) this._avp_cPathPicture;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("T_AccesosVehiculoProveedorUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@avp_iVehicleBrand", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_iVehicleModel", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_cMatricula", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cColor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_iYear", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_cTipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cCiaSeguro", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_tVtoSeguro", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_tVtoVTV", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_tVtoIdentificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cPathPicture", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@avp_iVehicleBrand"].Value = this._avp_iVehicleBrand;

		cmd.Parameters["@avp_iVehicleModel"].Value = this._avp_iVehicleModel;

		cmd.Parameters["@avp_cMatricula"].Value = (this._avp_cMatricula == null) ? (object) DBNull.Value : (object) this._avp_cMatricula;

		cmd.Parameters["@avp_cColor"].Value = (this._avp_cColor == null) ? (object) DBNull.Value : (object) this._avp_cColor;

		cmd.Parameters["@avp_iYear"].Value = this._avp_iYear;

		cmd.Parameters["@avp_cTipo"].Value = (this._avp_cTipo == null) ? (object) DBNull.Value : (object) this._avp_cTipo;

		cmd.Parameters["@avp_cCiaSeguro"].Value = (this._avp_cCiaSeguro == null) ? (object) DBNull.Value : (object) this._avp_cCiaSeguro;

		cmd.Parameters["@avp_tVtoSeguro"].Value = (this._avp_tVtoSeguro == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoSeguro;

		cmd.Parameters["@avp_tVtoVTV"].Value = (this._avp_tVtoVTV == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoVTV;

		cmd.Parameters["@avp_cIdentificacion"].Value = (this._avp_cIdentificacion == null) ? (object) DBNull.Value : (object) this._avp_cIdentificacion;

		cmd.Parameters["@avp_tVtoIdentificacion"].Value = (this._avp_tVtoIdentificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoIdentificacion;

		cmd.Parameters["@avp_cObservaciones"].Value = (this._avp_cObservaciones == null) ? (object) DBNull.Value : (object) this._avp_cObservaciones;

		cmd.Parameters["@avp_cPathPicture"].Value = (this._avp_cPathPicture == null) ? (object) DBNull.Value : (object) this._avp_cPathPicture;

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
    throw new RuntimeException("The T_AccesosVehiculoProveedor is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("T_AccesosVehiculoProveedorDel", conn))
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
    using(var CmdSel = new SqlCommand("T_AccesosVehiculoProveedorSel", conn))
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
    SimpleT_AccesosVehiculoProveedor Simple = new SimpleT_AccesosVehiculoProveedor();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.avp_iVehicleBrand = this._avp_iVehicleBrand;

      Simple.avp_iVehicleModel = this._avp_iVehicleModel;

      Simple.avp_cMatricula = this._avp_cMatricula;

      Simple.avp_cColor = this._avp_cColor;

      Simple.avp_iYear = this._avp_iYear;

      Simple.avp_cTipo = this._avp_cTipo;

      Simple.avp_cCiaSeguro = this._avp_cCiaSeguro;

      Simple.avp_tVtoSeguro = this._avp_tVtoSeguro;

      Simple.avp_tVtoVTV = this._avp_tVtoVTV;

      Simple.avp_cIdentificacion = this._avp_cIdentificacion;

      Simple.avp_tVtoIdentificacion = this._avp_tVtoIdentificacion;

      Simple.avp_cObservaciones = this._avp_cObservaciones;

      Simple.avp_cPathPicture = this._avp_cPathPicture;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleT_AccesosVehiculoProveedor)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._avp_iVehicleBrand = Simple.avp_iVehicleBrand;

      this._avp_iVehicleModel = Simple.avp_iVehicleModel;

      this._avp_cMatricula = Simple.avp_cMatricula;

      this._avp_cColor = Simple.avp_cColor;

      this._avp_iYear = Simple.avp_iYear;

      this._avp_cTipo = Simple.avp_cTipo;

      this._avp_cCiaSeguro = Simple.avp_cCiaSeguro;

      this._avp_tVtoSeguro = Simple.avp_tVtoSeguro;

      this._avp_tVtoVTV = Simple.avp_tVtoVTV;

      this._avp_cIdentificacion = Simple.avp_cIdentificacion;

      this._avp_tVtoIdentificacion = Simple.avp_tVtoIdentificacion;

      this._avp_cObservaciones = Simple.avp_cObservaciones;

      this._avp_cPathPicture = Simple.avp_cPathPicture;

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
    CallerT_AccesosVehiculoProveedor Caller = new CallerT_AccesosVehiculoProveedor();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.avp_iVehicleBrand = this._avp_iVehicleBrand;

      Caller.avp_iVehicleModel = this._avp_iVehicleModel;

      Caller.avp_cMatricula = this._avp_cMatricula;

      Caller.avp_cColor = this._avp_cColor;

      Caller.avp_iYear = this._avp_iYear;

      Caller.avp_cTipo = this._avp_cTipo;

      Caller.avp_cCiaSeguro = this._avp_cCiaSeguro;

      Caller.avp_tVtoSeguro = this._avp_tVtoSeguro;

      Caller.avp_tVtoVTV = this._avp_tVtoVTV;

      Caller.avp_cIdentificacion = this._avp_cIdentificacion;

      Caller.avp_tVtoIdentificacion = this._avp_tVtoIdentificacion;

      Caller.avp_cObservaciones = this._avp_cObservaciones;

      Caller.avp_cPathPicture = this._avp_cPathPicture;

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
    
      dt.Columns.Add(new DataColumn("avp_iVehicleBrand", typeof (int)));
    
      dt.Columns.Add(new DataColumn("avp_iVehicleModel", typeof (int)));
    
      dt.Columns.Add(new DataColumn("avp_cMatricula", typeof (string)));
    
      dt.Columns.Add(new DataColumn("avp_cColor", typeof (string)));
    
      dt.Columns.Add(new DataColumn("avp_iYear", typeof (int)));
    
      dt.Columns.Add(new DataColumn("avp_cTipo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("avp_cCiaSeguro", typeof (string)));
    
      dt.Columns.Add(new DataColumn("avp_tVtoSeguro", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("avp_tVtoVTV", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("avp_cIdentificacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("avp_tVtoIdentificacion", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("avp_cObservaciones", typeof (string)));
    
      dt.Columns.Add(new DataColumn("avp_cPathPicture", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["avp_iVehicleBrand"] = this._avp_iVehicleBrand;

      dr["avp_iVehicleModel"] = this._avp_iVehicleModel;

      dr["avp_cMatricula"] = this._avp_cMatricula;

      dr["avp_cColor"] = this._avp_cColor;

      dr["avp_iYear"] = this._avp_iYear;

      dr["avp_cTipo"] = this._avp_cTipo;

      dr["avp_cCiaSeguro"] = this._avp_cCiaSeguro;

      dr["avp_tVtoSeguro"] = (object)this._avp_tVtoSeguro  ?? DBNull.Value;

      dr["avp_tVtoVTV"] = (object)this._avp_tVtoVTV  ?? DBNull.Value;

      dr["avp_cIdentificacion"] = this._avp_cIdentificacion;

      dr["avp_tVtoIdentificacion"] = (object)this._avp_tVtoIdentificacion  ?? DBNull.Value;

      dr["avp_cObservaciones"] = this._avp_cObservaciones;

      dr["avp_cPathPicture"] = this._avp_cPathPicture;

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
    using(var CmdChilds = new SqlCommand("T_AccesosVehiculoProveedorByChildObject", conn))
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
    SimpleT_AccesosVehiculoProveedor Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("T_AccesosVehiculoProveedorByChildObject", conn))
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
    Simple = new SimpleT_AccesosVehiculoProveedor();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.avp_iVehicleBrand = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.avp_iVehicleModel = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.avp_cMatricula = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.avp_cColor = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.avp_iYear = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.avp_cTipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.avp_cCiaSeguro = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.avp_tVtoSeguro = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.avp_tVtoVTV = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.avp_cIdentificacion = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.avp_tVtoIdentificacion = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.avp_cObservaciones = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.avp_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);


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
    SimpleT_AccesosVehiculoProveedor Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleT_AccesosVehiculoProveedor();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.avp_iVehicleBrand = (Row["avp_iVehicleBrand"] == DBNull.Value) ? 0 : (int) Row["avp_iVehicleBrand"];

Simple.avp_iVehicleModel = (Row["avp_iVehicleModel"] == DBNull.Value) ? 0 : (int) Row["avp_iVehicleModel"];

Simple.avp_cMatricula = (Row["avp_cMatricula"] == DBNull.Value) ? "" : (string) Row["avp_cMatricula"];

Simple.avp_cColor = (Row["avp_cColor"] == DBNull.Value) ? "" : (string) Row["avp_cColor"];

Simple.avp_iYear = (Row["avp_iYear"] == DBNull.Value) ? 0 : (int) Row["avp_iYear"];

Simple.avp_cTipo = (Row["avp_cTipo"] == DBNull.Value) ? "" : (string) Row["avp_cTipo"];

Simple.avp_cCiaSeguro = (Row["avp_cCiaSeguro"] == DBNull.Value) ? "" : (string) Row["avp_cCiaSeguro"];

Simple.avp_tVtoSeguro = (Row["avp_tVtoSeguro"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["avp_tVtoSeguro"];

Simple.avp_tVtoVTV = (Row["avp_tVtoVTV"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["avp_tVtoVTV"];

Simple.avp_cIdentificacion = (Row["avp_cIdentificacion"] == DBNull.Value) ? "" : (string) Row["avp_cIdentificacion"];

Simple.avp_tVtoIdentificacion = (Row["avp_tVtoIdentificacion"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["avp_tVtoIdentificacion"];

Simple.avp_cObservaciones = (Row["avp_cObservaciones"] == DBNull.Value) ? "" : (string) Row["avp_cObservaciones"];

Simple.avp_cPathPicture = (Row["avp_cPathPicture"] == DBNull.Value) ? "" : (string) Row["avp_cPathPicture"];


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
    using(var CmdParents = new SqlCommand("T_AccesosVehiculoProveedorByParentObject", conn))
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
    SimpleT_AccesosVehiculoProveedor Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("T_AccesosVehiculoProveedorByParentObject", conn))
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
    Simple = new SimpleT_AccesosVehiculoProveedor();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.avp_iVehicleBrand = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.avp_iVehicleModel = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.avp_cMatricula = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.avp_cColor = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.avp_iYear = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.avp_cTipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.avp_cCiaSeguro = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.avp_tVtoSeguro = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.avp_tVtoVTV = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.avp_cIdentificacion = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.avp_tVtoIdentificacion = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.avp_cObservaciones = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.avp_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);


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
    using (var CmdDataByName = new SqlCommand("T_AccesosVehiculoProveedorByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("T_AccesosVehiculoProveedorByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("T_AccesosVehiculoProveedorByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("T_AccesosVehiculoProveedorByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("T_AccesosVehiculoProveedorByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleT_AccesosVehiculoProveedor Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("T_AccesosVehiculoProveedorBySimpleT_AccesosVehiculoProveedor", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@avp_iVehicleBrand", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_iVehicleModel", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_cMatricula", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cColor", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_iYear", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@avp_cTipo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cCiaSeguro", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_tVtoSeguro", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_tVtoVTV", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_cIdentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_tVtoIdentificacion", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@avp_cObservaciones", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@avp_cPathPicture", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@avp_iVehicleBrand"].Value = this._avp_iVehicleBrand;

		cmd.Parameters["@avp_iVehicleModel"].Value = this._avp_iVehicleModel;

		cmd.Parameters["@avp_cMatricula"].Value = (this._avp_cMatricula == null) ? (object) DBNull.Value : (object) this._avp_cMatricula;

		cmd.Parameters["@avp_cColor"].Value = (this._avp_cColor == null) ? (object) DBNull.Value : (object) this._avp_cColor;

		cmd.Parameters["@avp_iYear"].Value = this._avp_iYear;

		cmd.Parameters["@avp_cTipo"].Value = (this._avp_cTipo == null) ? (object) DBNull.Value : (object) this._avp_cTipo;

		cmd.Parameters["@avp_cCiaSeguro"].Value = (this._avp_cCiaSeguro == null) ? (object) DBNull.Value : (object) this._avp_cCiaSeguro;

		cmd.Parameters["@avp_tVtoSeguro"].Value = (this._avp_tVtoSeguro == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoSeguro;

		cmd.Parameters["@avp_tVtoVTV"].Value = (this._avp_tVtoVTV == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoVTV;

		cmd.Parameters["@avp_cIdentificacion"].Value = (this._avp_cIdentificacion == null) ? (object) DBNull.Value : (object) this._avp_cIdentificacion;

		cmd.Parameters["@avp_tVtoIdentificacion"].Value = (this._avp_tVtoIdentificacion == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._avp_tVtoIdentificacion;

		cmd.Parameters["@avp_cObservaciones"].Value = (this._avp_cObservaciones == null) ? (object) DBNull.Value : (object) this._avp_cObservaciones;

		cmd.Parameters["@avp_cPathPicture"].Value = (this._avp_cPathPicture == null) ? (object) DBNull.Value : (object) this._avp_cPathPicture;


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
		 
		public IEnumerable<SimpleT_AccesosVehiculoProveedor> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("T_AccesosVehiculoProveedorByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleT_AccesosVehiculoProveedor Simple = new SimpleT_AccesosVehiculoProveedor();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.avp_iVehicleBrand = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.avp_iVehicleModel = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.avp_cMatricula = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.avp_cColor = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.avp_iYear = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.avp_cTipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.avp_cCiaSeguro = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.avp_tVtoSeguro = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.avp_tVtoVTV = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.avp_cIdentificacion = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.avp_tVtoIdentificacion = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.avp_cObservaciones = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.avp_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleT_AccesosVehiculoProveedor> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("T_AccesosVehiculoProveedorByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleT_AccesosVehiculoProveedor Simple = new SimpleT_AccesosVehiculoProveedor();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.avp_iVehicleBrand = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.avp_iVehicleModel = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.avp_cMatricula = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.avp_cColor = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.avp_iYear = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.avp_cTipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.avp_cCiaSeguro = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.avp_tVtoSeguro = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)Simple.avp_tVtoVTV = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)Simple.avp_cIdentificacion = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.avp_tVtoIdentificacion = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)Simple.avp_cObservaciones = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.avp_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3232, "T_AccesosVehiculoProveedor");
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
    if (Reader.FieldCount > 2)this._avp_iVehicleBrand = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._avp_iVehicleModel = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._avp_cMatricula = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._avp_cColor = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._avp_iYear = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._avp_cTipo = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._avp_cCiaSeguro = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._avp_tVtoSeguro = (Reader.IsDBNull(9)) ? new DateTime(1,1,1) : Reader.GetDateTime(9);
if (Reader.FieldCount > 10)this._avp_tVtoVTV = (Reader.IsDBNull(10)) ? new DateTime(1,1,1) : Reader.GetDateTime(10);
if (Reader.FieldCount > 11)this._avp_cIdentificacion = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._avp_tVtoIdentificacion = (Reader.IsDBNull(12)) ? new DateTime(1,1,1) : Reader.GetDateTime(12);
if (Reader.FieldCount > 13)this._avp_cObservaciones = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._avp_cPathPicture = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);

    }
    Reader.Close();
    }
   }
  
    }
  