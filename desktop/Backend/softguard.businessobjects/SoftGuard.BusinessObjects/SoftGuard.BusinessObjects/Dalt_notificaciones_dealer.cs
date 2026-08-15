
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
     ///t_notificaciones_dealer data access layer   
     ///</summary>
    public class Dalt_notificaciones_dealer : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _tnd_cDealer;
    
      private string _tnd_cDescripcion;
    
      private int _tnd_iNotificarAlertas;
    
      private int _tnd_iGrupoAlarmas;
    
      private string _tnd_cAlarmas;
    
      private string _tnd_cMail;
    
      private string _tnd_cPlantillaMail;
    
      private int _tnd_iTipo;
    
      private int _tnd_iAdmin;
    
      private int _tnd_iNotificarSP;
    
      private string _tnd_cSMS;
    
      private int _tnd_iModemSMS;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///tnd_cDealer   
     ///</summary>
      public string tnd_cDealer
      {
      
          get{ return this._tnd_cDealer; }
          set{ this._tnd_cDealer = value; }
        
      }
     ///<summary>
     ///tnd_cDescripcion   
     ///</summary>
      public string tnd_cDescripcion
      {
      
          get{ return this._tnd_cDescripcion; }
          set{ this._tnd_cDescripcion = value; }
        
      }
     ///<summary>
     ///tnd_iNotificarAlertas   
     ///</summary>
      public int tnd_iNotificarAlertas
      {
      
          get{ return this._tnd_iNotificarAlertas; }
          set{ this._tnd_iNotificarAlertas = value; }
        
      }
     ///<summary>
     ///tnd_iGrupoAlarmas   
     ///</summary>
      public int tnd_iGrupoAlarmas
      {
      
          get{ return this._tnd_iGrupoAlarmas; }
          set{ this._tnd_iGrupoAlarmas = value; }
        
      }
     ///<summary>
     ///tnd_cAlarmas   
     ///</summary>
      public string tnd_cAlarmas
      {
      
          get{ return this._tnd_cAlarmas; }
          set{ this._tnd_cAlarmas = value; }
        
      }
     ///<summary>
     ///tnd_cMail   
     ///</summary>
      public string tnd_cMail
      {
      
          get{ return this._tnd_cMail; }
          set{ this._tnd_cMail = value; }
        
      }
     ///<summary>
     ///tnd_cPlantillaMail   
     ///</summary>
      public string tnd_cPlantillaMail
      {
      
          get{ return this._tnd_cPlantillaMail; }
          set{ this._tnd_cPlantillaMail = value; }
        
      }
     ///<summary>
     ///tnd_iTipo   
     ///</summary>
      public int tnd_iTipo
      {
      
          get{ return this._tnd_iTipo; }
          set{ this._tnd_iTipo = value; }
        
      }
     ///<summary>
     ///tnd_iAdmin   
     ///</summary>
      public int tnd_iAdmin
      {
      
          get{ return this._tnd_iAdmin; }
          set{ this._tnd_iAdmin = value; }
        
      }
     ///<summary>
     ///tnd_iNotificarSP   
     ///</summary>
      public int tnd_iNotificarSP
      {
      
          get{ return this._tnd_iNotificarSP; }
          set{ this._tnd_iNotificarSP = value; }
        
      }
     ///<summary>
     ///tnd_cSMS   
     ///</summary>
      public string tnd_cSMS
      {
      
          get{ return this._tnd_cSMS; }
          set{ this._tnd_cSMS = value; }
        
      }
     ///<summary>
     ///tnd_iModemSMS   
     ///</summary>
      public int tnd_iModemSMS
      {
      
          get{ return this._tnd_iModemSMS; }
          set{ this._tnd_iModemSMS = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_notificaciones_dealer(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_notificaciones_dealer(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_notificaciones_dealer(SqlHelper SqlConfig, int UserId, Simplet_notificaciones_dealer Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tnd_cDealer = Simple.tnd_cDealer;

      this._tnd_cDescripcion = Simple.tnd_cDescripcion;

      this._tnd_iNotificarAlertas = Simple.tnd_iNotificarAlertas;

      this._tnd_iGrupoAlarmas = Simple.tnd_iGrupoAlarmas;

      this._tnd_cAlarmas = Simple.tnd_cAlarmas;

      this._tnd_cMail = Simple.tnd_cMail;

      this._tnd_cPlantillaMail = Simple.tnd_cPlantillaMail;

      this._tnd_iTipo = Simple.tnd_iTipo;

      this._tnd_iAdmin = Simple.tnd_iAdmin;

      this._tnd_iNotificarSP = Simple.tnd_iNotificarSP;

      this._tnd_cSMS = Simple.tnd_cSMS;

      this._tnd_iModemSMS = Simple.tnd_iModemSMS;

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
    using(var cmd = new SqlCommand("t_notificaciones_dealerIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tnd_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tnd_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tnd_iNotificarAlertas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iGrupoAlarmas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_cAlarmas", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tnd_cMail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tnd_cPlantillaMail", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tnd_iTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iAdmin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iNotificarSP", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_cSMS", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tnd_iModemSMS", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tnd_cDealer"].Value = (this._tnd_cDealer == null) ? (object) DBNull.Value : (object) this._tnd_cDealer;

		cmd.Parameters["@tnd_cDescripcion"].Value = (this._tnd_cDescripcion == null) ? (object) DBNull.Value : (object) this._tnd_cDescripcion;

		cmd.Parameters["@tnd_iNotificarAlertas"].Value = this._tnd_iNotificarAlertas;

		cmd.Parameters["@tnd_iGrupoAlarmas"].Value = this._tnd_iGrupoAlarmas;

		cmd.Parameters["@tnd_cAlarmas"].Value = (this._tnd_cAlarmas == null) ? (object) DBNull.Value : (object) this._tnd_cAlarmas;

		cmd.Parameters["@tnd_cMail"].Value = (this._tnd_cMail == null) ? (object) DBNull.Value : (object) this._tnd_cMail;

		cmd.Parameters["@tnd_cPlantillaMail"].Value = (this._tnd_cPlantillaMail == null) ? (object) DBNull.Value : (object) this._tnd_cPlantillaMail;

		cmd.Parameters["@tnd_iTipo"].Value = this._tnd_iTipo;

		cmd.Parameters["@tnd_iAdmin"].Value = this._tnd_iAdmin;

		cmd.Parameters["@tnd_iNotificarSP"].Value = this._tnd_iNotificarSP;

		cmd.Parameters["@tnd_cSMS"].Value = (this._tnd_cSMS == null) ? (object) DBNull.Value : (object) this._tnd_cSMS;

		cmd.Parameters["@tnd_iModemSMS"].Value = this._tnd_iModemSMS;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_notificaciones_dealerUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tnd_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tnd_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tnd_iNotificarAlertas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iGrupoAlarmas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_cAlarmas", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tnd_cMail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tnd_cPlantillaMail", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tnd_iTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iAdmin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iNotificarSP", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_cSMS", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tnd_iModemSMS", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tnd_cDealer"].Value = (this._tnd_cDealer == null) ? (object) DBNull.Value : (object) this._tnd_cDealer;

		cmd.Parameters["@tnd_cDescripcion"].Value = (this._tnd_cDescripcion == null) ? (object) DBNull.Value : (object) this._tnd_cDescripcion;

		cmd.Parameters["@tnd_iNotificarAlertas"].Value = this._tnd_iNotificarAlertas;

		cmd.Parameters["@tnd_iGrupoAlarmas"].Value = this._tnd_iGrupoAlarmas;

		cmd.Parameters["@tnd_cAlarmas"].Value = (this._tnd_cAlarmas == null) ? (object) DBNull.Value : (object) this._tnd_cAlarmas;

		cmd.Parameters["@tnd_cMail"].Value = (this._tnd_cMail == null) ? (object) DBNull.Value : (object) this._tnd_cMail;

		cmd.Parameters["@tnd_cPlantillaMail"].Value = (this._tnd_cPlantillaMail == null) ? (object) DBNull.Value : (object) this._tnd_cPlantillaMail;

		cmd.Parameters["@tnd_iTipo"].Value = this._tnd_iTipo;

		cmd.Parameters["@tnd_iAdmin"].Value = this._tnd_iAdmin;

		cmd.Parameters["@tnd_iNotificarSP"].Value = this._tnd_iNotificarSP;

		cmd.Parameters["@tnd_cSMS"].Value = (this._tnd_cSMS == null) ? (object) DBNull.Value : (object) this._tnd_cSMS;

		cmd.Parameters["@tnd_iModemSMS"].Value = this._tnd_iModemSMS;

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
    throw new RuntimeException("The t_notificaciones_dealer is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_notificaciones_dealerDel", conn))
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
    using(var CmdSel = new SqlCommand("t_notificaciones_dealerSel", conn))
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
    Simplet_notificaciones_dealer Simple = new Simplet_notificaciones_dealer();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.tnd_cDealer = this._tnd_cDealer;

      Simple.tnd_cDescripcion = this._tnd_cDescripcion;

      Simple.tnd_iNotificarAlertas = this._tnd_iNotificarAlertas;

      Simple.tnd_iGrupoAlarmas = this._tnd_iGrupoAlarmas;

      Simple.tnd_cAlarmas = this._tnd_cAlarmas;

      Simple.tnd_cMail = this._tnd_cMail;

      Simple.tnd_cPlantillaMail = this._tnd_cPlantillaMail;

      Simple.tnd_iTipo = this._tnd_iTipo;

      Simple.tnd_iAdmin = this._tnd_iAdmin;

      Simple.tnd_iNotificarSP = this._tnd_iNotificarSP;

      Simple.tnd_cSMS = this._tnd_cSMS;

      Simple.tnd_iModemSMS = this._tnd_iModemSMS;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_notificaciones_dealer)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tnd_cDealer = Simple.tnd_cDealer;

      this._tnd_cDescripcion = Simple.tnd_cDescripcion;

      this._tnd_iNotificarAlertas = Simple.tnd_iNotificarAlertas;

      this._tnd_iGrupoAlarmas = Simple.tnd_iGrupoAlarmas;

      this._tnd_cAlarmas = Simple.tnd_cAlarmas;

      this._tnd_cMail = Simple.tnd_cMail;

      this._tnd_cPlantillaMail = Simple.tnd_cPlantillaMail;

      this._tnd_iTipo = Simple.tnd_iTipo;

      this._tnd_iAdmin = Simple.tnd_iAdmin;

      this._tnd_iNotificarSP = Simple.tnd_iNotificarSP;

      this._tnd_cSMS = Simple.tnd_cSMS;

      this._tnd_iModemSMS = Simple.tnd_iModemSMS;

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
    Callert_notificaciones_dealer Caller = new Callert_notificaciones_dealer();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.tnd_cDealer = this._tnd_cDealer;

      Caller.tnd_cDescripcion = this._tnd_cDescripcion;

      Caller.tnd_iNotificarAlertas = this._tnd_iNotificarAlertas;

      Caller.tnd_iGrupoAlarmas = this._tnd_iGrupoAlarmas;

      Caller.tnd_cAlarmas = this._tnd_cAlarmas;

      Caller.tnd_cMail = this._tnd_cMail;

      Caller.tnd_cPlantillaMail = this._tnd_cPlantillaMail;

      Caller.tnd_iTipo = this._tnd_iTipo;

      Caller.tnd_iAdmin = this._tnd_iAdmin;

      Caller.tnd_iNotificarSP = this._tnd_iNotificarSP;

      Caller.tnd_cSMS = this._tnd_cSMS;

      Caller.tnd_iModemSMS = this._tnd_iModemSMS;

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
    
      dt.Columns.Add(new DataColumn("tnd_cDealer", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tnd_cDescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tnd_iNotificarAlertas", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tnd_iGrupoAlarmas", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tnd_cAlarmas", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tnd_cMail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tnd_cPlantillaMail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tnd_iTipo", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tnd_iAdmin", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tnd_iNotificarSP", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tnd_cSMS", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tnd_iModemSMS", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["tnd_cDealer"] = this._tnd_cDealer;

      dr["tnd_cDescripcion"] = this._tnd_cDescripcion;

      dr["tnd_iNotificarAlertas"] = this._tnd_iNotificarAlertas;

      dr["tnd_iGrupoAlarmas"] = this._tnd_iGrupoAlarmas;

      dr["tnd_cAlarmas"] = this._tnd_cAlarmas;

      dr["tnd_cMail"] = this._tnd_cMail;

      dr["tnd_cPlantillaMail"] = this._tnd_cPlantillaMail;

      dr["tnd_iTipo"] = this._tnd_iTipo;

      dr["tnd_iAdmin"] = this._tnd_iAdmin;

      dr["tnd_iNotificarSP"] = this._tnd_iNotificarSP;

      dr["tnd_cSMS"] = this._tnd_cSMS;

      dr["tnd_iModemSMS"] = this._tnd_iModemSMS;

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
    using(var CmdChilds = new SqlCommand("t_notificaciones_dealerByChildObject", conn))
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
    Simplet_notificaciones_dealer Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_notificaciones_dealerByChildObject", conn))
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
    Simple = new Simplet_notificaciones_dealer();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tnd_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tnd_cDescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tnd_iNotificarAlertas = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tnd_iGrupoAlarmas = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tnd_cAlarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tnd_cMail = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tnd_cPlantillaMail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tnd_iTipo = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.tnd_iAdmin = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tnd_iNotificarSP = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tnd_cSMS = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tnd_iModemSMS = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    Simplet_notificaciones_dealer Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_notificaciones_dealer();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.tnd_cDealer = (Row["tnd_cDealer"] == DBNull.Value) ? "" : (string) Row["tnd_cDealer"];

Simple.tnd_cDescripcion = (Row["tnd_cDescripcion"] == DBNull.Value) ? "" : (string) Row["tnd_cDescripcion"];

Simple.tnd_iNotificarAlertas = (Row["tnd_iNotificarAlertas"] == DBNull.Value) ? 0 : (int) Row["tnd_iNotificarAlertas"];

Simple.tnd_iGrupoAlarmas = (Row["tnd_iGrupoAlarmas"] == DBNull.Value) ? 0 : (int) Row["tnd_iGrupoAlarmas"];

Simple.tnd_cAlarmas = (Row["tnd_cAlarmas"] == DBNull.Value) ? "" : (string) Row["tnd_cAlarmas"];

Simple.tnd_cMail = (Row["tnd_cMail"] == DBNull.Value) ? "" : (string) Row["tnd_cMail"];

Simple.tnd_cPlantillaMail = (Row["tnd_cPlantillaMail"] == DBNull.Value) ? "" : (string) Row["tnd_cPlantillaMail"];

Simple.tnd_iTipo = (Row["tnd_iTipo"] == DBNull.Value) ? 0 : (int) Row["tnd_iTipo"];

Simple.tnd_iAdmin = (Row["tnd_iAdmin"] == DBNull.Value) ? 0 : (int) Row["tnd_iAdmin"];

Simple.tnd_iNotificarSP = (Row["tnd_iNotificarSP"] == DBNull.Value) ? 0 : (int) Row["tnd_iNotificarSP"];

Simple.tnd_cSMS = (Row["tnd_cSMS"] == DBNull.Value) ? "" : (string) Row["tnd_cSMS"];

Simple.tnd_iModemSMS = (Row["tnd_iModemSMS"] == DBNull.Value) ? 0 : (int) Row["tnd_iModemSMS"];


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
    using(var CmdParents = new SqlCommand("t_notificaciones_dealerByParentObject", conn))
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
    Simplet_notificaciones_dealer Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_notificaciones_dealerByParentObject", conn))
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
    Simple = new Simplet_notificaciones_dealer();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tnd_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tnd_cDescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tnd_iNotificarAlertas = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tnd_iGrupoAlarmas = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tnd_cAlarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tnd_cMail = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tnd_cPlantillaMail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tnd_iTipo = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.tnd_iAdmin = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tnd_iNotificarSP = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tnd_cSMS = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tnd_iModemSMS = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    using (var CmdDataByName = new SqlCommand("t_notificaciones_dealerByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_notificaciones_dealerByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_notificaciones_dealerByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_notificaciones_dealerByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_notificaciones_dealerByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_notificaciones_dealer Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_notificaciones_dealerBySimplet_notificaciones_dealer", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.VarChar));
    cmd.Parameters.Add(new SqlParameter("@tnd_cDealer", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tnd_cDescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tnd_iNotificarAlertas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iGrupoAlarmas", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_cAlarmas", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tnd_cMail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tnd_cPlantillaMail", SqlDbType.Char));cmd.Parameters.Add(new SqlParameter("@tnd_iTipo", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iAdmin", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_iNotificarSP", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tnd_cSMS", SqlDbType.VarChar));cmd.Parameters.Add(new SqlParameter("@tnd_iModemSMS", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@tnd_cDealer"].Value = (this._tnd_cDealer == null) ? (object) DBNull.Value : (object) this._tnd_cDealer;

		cmd.Parameters["@tnd_cDescripcion"].Value = (this._tnd_cDescripcion == null) ? (object) DBNull.Value : (object) this._tnd_cDescripcion;

		cmd.Parameters["@tnd_iNotificarAlertas"].Value = this._tnd_iNotificarAlertas;

		cmd.Parameters["@tnd_iGrupoAlarmas"].Value = this._tnd_iGrupoAlarmas;

		cmd.Parameters["@tnd_cAlarmas"].Value = (this._tnd_cAlarmas == null) ? (object) DBNull.Value : (object) this._tnd_cAlarmas;

		cmd.Parameters["@tnd_cMail"].Value = (this._tnd_cMail == null) ? (object) DBNull.Value : (object) this._tnd_cMail;

		cmd.Parameters["@tnd_cPlantillaMail"].Value = (this._tnd_cPlantillaMail == null) ? (object) DBNull.Value : (object) this._tnd_cPlantillaMail;

		cmd.Parameters["@tnd_iTipo"].Value = this._tnd_iTipo;

		cmd.Parameters["@tnd_iAdmin"].Value = this._tnd_iAdmin;

		cmd.Parameters["@tnd_iNotificarSP"].Value = this._tnd_iNotificarSP;

		cmd.Parameters["@tnd_cSMS"].Value = (this._tnd_cSMS == null) ? (object) DBNull.Value : (object) this._tnd_cSMS;

		cmd.Parameters["@tnd_iModemSMS"].Value = this._tnd_iModemSMS;


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
		 
		public IEnumerable<Simplet_notificaciones_dealer> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_notificaciones_dealerByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_notificaciones_dealer Simple = new Simplet_notificaciones_dealer();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tnd_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tnd_cDescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tnd_iNotificarAlertas = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tnd_iGrupoAlarmas = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tnd_cAlarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tnd_cMail = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tnd_cPlantillaMail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tnd_iTipo = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.tnd_iAdmin = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tnd_iNotificarSP = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tnd_cSMS = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tnd_iModemSMS = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_notificaciones_dealer> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_notificaciones_dealerByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.VarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_notificaciones_dealer Simple = new Simplet_notificaciones_dealer();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tnd_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.tnd_cDescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.tnd_iNotificarAlertas = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.tnd_iGrupoAlarmas = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)Simple.tnd_cAlarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tnd_cMail = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tnd_cPlantillaMail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.tnd_iTipo = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)Simple.tnd_iAdmin = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.tnd_iNotificarSP = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.tnd_cSMS = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.tnd_iModemSMS = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3212, "t_notificaciones_dealer");
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
    if (Reader.FieldCount > 2)this._tnd_cDealer = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._tnd_cDescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._tnd_iNotificarAlertas = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._tnd_iGrupoAlarmas = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt32(5);
if (Reader.FieldCount > 6)this._tnd_cAlarmas = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._tnd_cMail = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._tnd_cPlantillaMail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._tnd_iTipo = (Reader.IsDBNull(9)) ? 0 : Reader.GetInt32(9);
if (Reader.FieldCount > 10)this._tnd_iAdmin = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._tnd_iNotificarSP = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._tnd_cSMS = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._tnd_iModemSMS = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    }
    Reader.Close();
    }
   }
  
    }
  