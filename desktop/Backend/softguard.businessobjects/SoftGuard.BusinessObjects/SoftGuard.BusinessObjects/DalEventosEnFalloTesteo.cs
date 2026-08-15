
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
     ///EventosEnFalloTesteo data access layer   
     ///</summary>
    public class DalEventosEnFalloTesteo : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _eft_irecid;
    
      private int _eft_iidcuenta;
    
      private DateTime? _eft_teventofechahora;
    
      private string _eft_clinea;
    
      private string _eft_ccuenta;
    
      private string _eft_cnombre;
    
      private string _eft_calarma;
    
      private string _eft_calarmadescripcion;
    
      private int _eft_nalarmacolor;
    
      private int _eft_nalarmacolorletra;
    
      private string _eft_calarmaautoprocesa;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///eft_irecid   
     ///</summary>
      public int eft_irecid
      {
      
          get{ return this._eft_irecid; }
          set{ this._eft_irecid = value; }
        
      }
     ///<summary>
     ///eft_iidcuenta   
     ///</summary>
      public int eft_iidcuenta
      {
      
          get{ return this._eft_iidcuenta; }
          set{ this._eft_iidcuenta = value; }
        
      }
     ///<summary>
     ///eft_teventofechahora   
     ///</summary>
      public DateTime? eft_teventofechahora
      {
      
          get{ return this._eft_teventofechahora; }
          set{ this._eft_teventofechahora = value; }
        
      }
     ///<summary>
     ///eft_clinea   
     ///</summary>
      public string eft_clinea
      {
      
          get{ return this._eft_clinea; }
          set{ this._eft_clinea = value; }
        
      }
     ///<summary>
     ///eft_ccuenta   
     ///</summary>
      public string eft_ccuenta
      {
      
          get{ return this._eft_ccuenta; }
          set{ this._eft_ccuenta = value; }
        
      }
     ///<summary>
     ///eft_cnombre   
     ///</summary>
      public string eft_cnombre
      {
      
          get{ return this._eft_cnombre; }
          set{ this._eft_cnombre = value; }
        
      }
     ///<summary>
     ///eft_calarma   
     ///</summary>
      public string eft_calarma
      {
      
          get{ return this._eft_calarma; }
          set{ this._eft_calarma = value; }
        
      }
     ///<summary>
     ///eft_calarmadescripcion   
     ///</summary>
      public string eft_calarmadescripcion
      {
      
          get{ return this._eft_calarmadescripcion; }
          set{ this._eft_calarmadescripcion = value; }
        
      }
     ///<summary>
     ///eft_nalarmacolor   
     ///</summary>
      public int eft_nalarmacolor
      {
      
          get{ return this._eft_nalarmacolor; }
          set{ this._eft_nalarmacolor = value; }
        
      }
     ///<summary>
     ///eft_nalarmacolorletra   
     ///</summary>
      public int eft_nalarmacolorletra
      {
      
          get{ return this._eft_nalarmacolorletra; }
          set{ this._eft_nalarmacolorletra = value; }
        
      }
     ///<summary>
     ///eft_calarmaautoprocesa   
     ///</summary>
      public string eft_calarmaautoprocesa
      {
      
          get{ return this._eft_calarmaautoprocesa; }
          set{ this._eft_calarmaautoprocesa = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosEnFalloTesteo(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosEnFalloTesteo(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalEventosEnFalloTesteo(SqlHelper SqlConfig, int UserId, SimpleEventosEnFalloTesteo Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._eft_irecid = Simple.eft_irecid;

      this._eft_iidcuenta = Simple.eft_iidcuenta;

      this._eft_teventofechahora = Simple.eft_teventofechahora;

      this._eft_clinea = Simple.eft_clinea;

      this._eft_ccuenta = Simple.eft_ccuenta;

      this._eft_cnombre = Simple.eft_cnombre;

      this._eft_calarma = Simple.eft_calarma;

      this._eft_calarmadescripcion = Simple.eft_calarmadescripcion;

      this._eft_nalarmacolor = Simple.eft_nalarmacolor;

      this._eft_nalarmacolorletra = Simple.eft_nalarmacolorletra;

      this._eft_calarmaautoprocesa = Simple.eft_calarmaautoprocesa;

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
    using(var cmd = new SqlCommand("EventosEnFalloTesteoIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@eft_irecid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_teventofechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@eft_clinea", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_ccuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@eft_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_calarmadescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@eft_nalarmacolor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_nalarmacolorletra", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_calarmaautoprocesa", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@eft_irecid"].Value = this._eft_irecid;

		cmd.Parameters["@eft_iidcuenta"].Value = this._eft_iidcuenta;

		cmd.Parameters["@eft_teventofechahora"].Value = (this._eft_teventofechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._eft_teventofechahora;

		cmd.Parameters["@eft_clinea"].Value = (this._eft_clinea == null) ? (object) DBNull.Value : (object) this._eft_clinea;

		cmd.Parameters["@eft_ccuenta"].Value = (this._eft_ccuenta == null) ? (object) DBNull.Value : (object) this._eft_ccuenta;

		cmd.Parameters["@eft_cnombre"].Value = (this._eft_cnombre == null) ? (object) DBNull.Value : (object) this._eft_cnombre;

		cmd.Parameters["@eft_calarma"].Value = (this._eft_calarma == null) ? (object) DBNull.Value : (object) this._eft_calarma;

		cmd.Parameters["@eft_calarmadescripcion"].Value = (this._eft_calarmadescripcion == null) ? (object) DBNull.Value : (object) this._eft_calarmadescripcion;

		cmd.Parameters["@eft_nalarmacolor"].Value = this._eft_nalarmacolor;

		cmd.Parameters["@eft_nalarmacolorletra"].Value = this._eft_nalarmacolorletra;

		cmd.Parameters["@eft_calarmaautoprocesa"].Value = (this._eft_calarmaautoprocesa == null) ? (object) DBNull.Value : (object) this._eft_calarmaautoprocesa;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EventosEnFalloTesteoUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@eft_irecid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_teventofechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@eft_clinea", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_ccuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@eft_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_calarmadescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@eft_nalarmacolor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_nalarmacolorletra", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_calarmaautoprocesa", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@eft_irecid"].Value = this._eft_irecid;

		cmd.Parameters["@eft_iidcuenta"].Value = this._eft_iidcuenta;

		cmd.Parameters["@eft_teventofechahora"].Value = (this._eft_teventofechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._eft_teventofechahora;

		cmd.Parameters["@eft_clinea"].Value = (this._eft_clinea == null) ? (object) DBNull.Value : (object) this._eft_clinea;

		cmd.Parameters["@eft_ccuenta"].Value = (this._eft_ccuenta == null) ? (object) DBNull.Value : (object) this._eft_ccuenta;

		cmd.Parameters["@eft_cnombre"].Value = (this._eft_cnombre == null) ? (object) DBNull.Value : (object) this._eft_cnombre;

		cmd.Parameters["@eft_calarma"].Value = (this._eft_calarma == null) ? (object) DBNull.Value : (object) this._eft_calarma;

		cmd.Parameters["@eft_calarmadescripcion"].Value = (this._eft_calarmadescripcion == null) ? (object) DBNull.Value : (object) this._eft_calarmadescripcion;

		cmd.Parameters["@eft_nalarmacolor"].Value = this._eft_nalarmacolor;

		cmd.Parameters["@eft_nalarmacolorletra"].Value = this._eft_nalarmacolorletra;

		cmd.Parameters["@eft_calarmaautoprocesa"].Value = (this._eft_calarmaautoprocesa == null) ? (object) DBNull.Value : (object) this._eft_calarmaautoprocesa;

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
    throw new RuntimeException("The EventosEnFalloTesteo is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("EventosEnFalloTesteoDel", conn))
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
    using(var CmdSel = new SqlCommand("EventosEnFalloTesteoSel", conn))
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
    SimpleEventosEnFalloTesteo Simple = new SimpleEventosEnFalloTesteo();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.eft_irecid = this._eft_irecid;

      Simple.eft_iidcuenta = this._eft_iidcuenta;

      Simple.eft_teventofechahora = this._eft_teventofechahora;

      Simple.eft_clinea = this._eft_clinea;

      Simple.eft_ccuenta = this._eft_ccuenta;

      Simple.eft_cnombre = this._eft_cnombre;

      Simple.eft_calarma = this._eft_calarma;

      Simple.eft_calarmadescripcion = this._eft_calarmadescripcion;

      Simple.eft_nalarmacolor = this._eft_nalarmacolor;

      Simple.eft_nalarmacolorletra = this._eft_nalarmacolorletra;

      Simple.eft_calarmaautoprocesa = this._eft_calarmaautoprocesa;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleEventosEnFalloTesteo)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._eft_irecid = Simple.eft_irecid;

      this._eft_iidcuenta = Simple.eft_iidcuenta;

      this._eft_teventofechahora = Simple.eft_teventofechahora;

      this._eft_clinea = Simple.eft_clinea;

      this._eft_ccuenta = Simple.eft_ccuenta;

      this._eft_cnombre = Simple.eft_cnombre;

      this._eft_calarma = Simple.eft_calarma;

      this._eft_calarmadescripcion = Simple.eft_calarmadescripcion;

      this._eft_nalarmacolor = Simple.eft_nalarmacolor;

      this._eft_nalarmacolorletra = Simple.eft_nalarmacolorletra;

      this._eft_calarmaautoprocesa = Simple.eft_calarmaautoprocesa;

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
    CallerEventosEnFalloTesteo Caller = new CallerEventosEnFalloTesteo();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.eft_irecid = this._eft_irecid;

      Caller.eft_iidcuenta = this._eft_iidcuenta;

      Caller.eft_teventofechahora = this._eft_teventofechahora;

      Caller.eft_clinea = this._eft_clinea;

      Caller.eft_ccuenta = this._eft_ccuenta;

      Caller.eft_cnombre = this._eft_cnombre;

      Caller.eft_calarma = this._eft_calarma;

      Caller.eft_calarmadescripcion = this._eft_calarmadescripcion;

      Caller.eft_nalarmacolor = this._eft_nalarmacolor;

      Caller.eft_nalarmacolorletra = this._eft_nalarmacolorletra;

      Caller.eft_calarmaautoprocesa = this._eft_calarmaautoprocesa;

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
    
      dt.Columns.Add(new DataColumn("eft_irecid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("eft_iidcuenta", typeof (int)));
    
      dt.Columns.Add(new DataColumn("eft_teventofechahora", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("eft_clinea", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eft_ccuenta", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eft_cnombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eft_calarma", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eft_calarmadescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("eft_nalarmacolor", typeof (int)));
    
      dt.Columns.Add(new DataColumn("eft_nalarmacolorletra", typeof (int)));
    
      dt.Columns.Add(new DataColumn("eft_calarmaautoprocesa", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["eft_irecid"] = this._eft_irecid;

      dr["eft_iidcuenta"] = this._eft_iidcuenta;

      dr["eft_teventofechahora"] = this._eft_teventofechahora;

      dr["eft_clinea"] = this._eft_clinea;

      dr["eft_ccuenta"] = this._eft_ccuenta;

      dr["eft_cnombre"] = this._eft_cnombre;

      dr["eft_calarma"] = this._eft_calarma;

      dr["eft_calarmadescripcion"] = this._eft_calarmadescripcion;

      dr["eft_nalarmacolor"] = this._eft_nalarmacolor;

      dr["eft_nalarmacolorletra"] = this._eft_nalarmacolorletra;

      dr["eft_calarmaautoprocesa"] = this._eft_calarmaautoprocesa;

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
    using(var CmdChilds = new SqlCommand("EventosEnFalloTesteoByChildObject", conn))
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
    SimpleEventosEnFalloTesteo Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("EventosEnFalloTesteoByChildObject", conn))
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
    Simple = new SimpleEventosEnFalloTesteo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eft_irecid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eft_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eft_teventofechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eft_clinea = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eft_ccuenta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eft_cnombre = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eft_calarma = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eft_calarmadescripcion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.eft_nalarmacolor = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.eft_nalarmacolorletra = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.eft_calarmaautoprocesa = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    SimpleEventosEnFalloTesteo Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleEventosEnFalloTesteo();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.eft_irecid = (Row["eft_irecid"] == DBNull.Value) ? 0 : (int) Row["eft_irecid"];

Simple.eft_iidcuenta = (Row["eft_iidcuenta"] == DBNull.Value) ? 0 : (int) Row["eft_iidcuenta"];

Simple.eft_teventofechahora = (Row["eft_teventofechahora"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["eft_teventofechahora"];

Simple.eft_clinea = (Row["eft_clinea"] == DBNull.Value) ? "" : (string) Row["eft_clinea"];

Simple.eft_ccuenta = (Row["eft_ccuenta"] == DBNull.Value) ? "" : (string) Row["eft_ccuenta"];

Simple.eft_cnombre = (Row["eft_cnombre"] == DBNull.Value) ? "" : (string) Row["eft_cnombre"];

Simple.eft_calarma = (Row["eft_calarma"] == DBNull.Value) ? "" : (string) Row["eft_calarma"];

Simple.eft_calarmadescripcion = (Row["eft_calarmadescripcion"] == DBNull.Value) ? "" : (string) Row["eft_calarmadescripcion"];

Simple.eft_nalarmacolor = (Row["eft_nalarmacolor"] == DBNull.Value) ? 0 : (int) Row["eft_nalarmacolor"];

Simple.eft_nalarmacolorletra = (Row["eft_nalarmacolorletra"] == DBNull.Value) ? 0 : (int) Row["eft_nalarmacolorletra"];

Simple.eft_calarmaautoprocesa = (Row["eft_calarmaautoprocesa"] == DBNull.Value) ? "" : (string) Row["eft_calarmaautoprocesa"];


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
    using(var CmdParents = new SqlCommand("EventosEnFalloTesteoByParentObject", conn))
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
    SimpleEventosEnFalloTesteo Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("EventosEnFalloTesteoByParentObject", conn))
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
    Simple = new SimpleEventosEnFalloTesteo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eft_irecid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eft_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eft_teventofechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eft_clinea = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eft_ccuenta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eft_cnombre = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eft_calarma = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eft_calarmadescripcion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.eft_nalarmacolor = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.eft_nalarmacolorletra = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.eft_calarmaautoprocesa = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    using (var CmdDataByName = new SqlCommand("EventosEnFalloTesteoByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("EventosEnFalloTesteoByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("EventosEnFalloTesteoByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("EventosEnFalloTesteoByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("EventosEnFalloTesteoByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleEventosEnFalloTesteo Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("EventosEnFalloTesteoBySimpleEventosEnFalloTesteo", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@eft_irecid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_iidcuenta", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_teventofechahora", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@eft_clinea", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_ccuenta", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@eft_calarma", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@eft_calarmadescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@eft_nalarmacolor", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_nalarmacolorletra", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@eft_calarmaautoprocesa", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@eft_irecid"].Value = this._eft_irecid;

		cmd.Parameters["@eft_iidcuenta"].Value = this._eft_iidcuenta;

		cmd.Parameters["@eft_teventofechahora"].Value = (this._eft_teventofechahora == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._eft_teventofechahora;

		cmd.Parameters["@eft_clinea"].Value = (this._eft_clinea == null) ? (object) DBNull.Value : (object) this._eft_clinea;

		cmd.Parameters["@eft_ccuenta"].Value = (this._eft_ccuenta == null) ? (object) DBNull.Value : (object) this._eft_ccuenta;

		cmd.Parameters["@eft_cnombre"].Value = (this._eft_cnombre == null) ? (object) DBNull.Value : (object) this._eft_cnombre;

		cmd.Parameters["@eft_calarma"].Value = (this._eft_calarma == null) ? (object) DBNull.Value : (object) this._eft_calarma;

		cmd.Parameters["@eft_calarmadescripcion"].Value = (this._eft_calarmadescripcion == null) ? (object) DBNull.Value : (object) this._eft_calarmadescripcion;

		cmd.Parameters["@eft_nalarmacolor"].Value = this._eft_nalarmacolor;

		cmd.Parameters["@eft_nalarmacolorletra"].Value = this._eft_nalarmacolorletra;

		cmd.Parameters["@eft_calarmaautoprocesa"].Value = (this._eft_calarmaautoprocesa == null) ? (object) DBNull.Value : (object) this._eft_calarmaautoprocesa;


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
		 
		public IEnumerable<SimpleEventosEnFalloTesteo> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EventosEnFalloTesteoByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEventosEnFalloTesteo Simple = new SimpleEventosEnFalloTesteo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eft_irecid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eft_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eft_teventofechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eft_clinea = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eft_ccuenta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eft_cnombre = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eft_calarma = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eft_calarmadescripcion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.eft_nalarmacolor = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.eft_nalarmacolorletra = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.eft_calarmaautoprocesa = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleEventosEnFalloTesteo> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("EventosEnFalloTesteoByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleEventosEnFalloTesteo Simple = new SimpleEventosEnFalloTesteo();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.eft_irecid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.eft_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.eft_teventofechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)Simple.eft_clinea = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.eft_ccuenta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.eft_cnombre = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.eft_calarma = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.eft_calarmadescripcion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.eft_nalarmacolor = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.eft_nalarmacolorletra = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)Simple.eft_calarmaautoprocesa = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3165, "EventosEnFalloTesteo");
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
    if (Reader.FieldCount > 2)this._eft_irecid = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._eft_iidcuenta = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._eft_teventofechahora = (Reader.IsDBNull(4)) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
if (Reader.FieldCount > 5)this._eft_clinea = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._eft_ccuenta = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._eft_cnombre = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._eft_calarma = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._eft_calarmadescripcion = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._eft_nalarmacolor = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._eft_nalarmacolorletra = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt32(11);
if (Reader.FieldCount > 12)this._eft_calarmaautoprocesa = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    }
    Reader.Close();
    }
   }
  
    }
  