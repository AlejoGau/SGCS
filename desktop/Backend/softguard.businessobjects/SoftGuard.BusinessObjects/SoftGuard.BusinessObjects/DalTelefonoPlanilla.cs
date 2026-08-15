
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
     ///TelefonoPlanilla data access layer   
     ///</summary>
    public class DalTelefonoPlanilla : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _tel_iidpla;
    
      private int _tel_iid;
    
      private string _tel_clista;
    
      private string _tel_cnombre;
    
      private string _tel_cobservacion;
    
      private string _tel_ctelefono;
    
      private Decimal _tel_ndiscado;
    
      private string _tel_cpredigito;
    
      private string _tel_cpostdigito;
    
      private int _tel_norden;
    
      private Decimal _tel_ntr;
    
      private string _tel_cclave;
    
      private string _tel_cpermiso;
    
      private Decimal _tel_nsms;
    
      private string _tel_cinternacional;
    
      private string _tel_ccountrycode;
    
      private int _tel_iismobile;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///tel_iidpla   
     ///</summary>
      public int tel_iidpla
      {
      
          get{ return this._tel_iidpla; }
          set{ this._tel_iidpla = value; }
        
      }
     ///<summary>
     ///tel_iid   
     ///</summary>
      public int tel_iid
      {
      
          get{ return this._tel_iid; }
          set{ this._tel_iid = value; }
        
      }
     ///<summary>
     ///tel_clista   
     ///</summary>
      public string tel_clista
      {
      
          get{ return this._tel_clista; }
          set{ this._tel_clista = value; }
        
      }
     ///<summary>
     ///tel_cnombre   
     ///</summary>
      public string tel_cnombre
      {
      
          get{ return this._tel_cnombre; }
          set{ this._tel_cnombre = value; }
        
      }
     ///<summary>
     ///tel_cobservacion   
     ///</summary>
      public string tel_cobservacion
      {
      
          get{ return this._tel_cobservacion; }
          set{ this._tel_cobservacion = value; }
        
      }
     ///<summary>
     ///tel_ctelefono   
     ///</summary>
      public string tel_ctelefono
      {
      
          get{ return this._tel_ctelefono; }
          set{ this._tel_ctelefono = value; }
        
      }
     ///<summary>
     ///tel_ndiscado   
     ///</summary>
      public Decimal tel_ndiscado
      {
      
          get{ return this._tel_ndiscado; }
          set{ this._tel_ndiscado = value; }
        
      }
     ///<summary>
     ///tel_cpredigito   
     ///</summary>
      public string tel_cpredigito
      {
      
          get{ return this._tel_cpredigito; }
          set{ this._tel_cpredigito = value; }
        
      }
     ///<summary>
     ///tel_cpostdigito   
     ///</summary>
      public string tel_cpostdigito
      {
      
          get{ return this._tel_cpostdigito; }
          set{ this._tel_cpostdigito = value; }
        
      }
     ///<summary>
     ///tel_norden   
     ///</summary>
      public int tel_norden
      {
      
          get{ return this._tel_norden; }
          set{ this._tel_norden = value; }
        
      }
     ///<summary>
     ///tel_ntr   
     ///</summary>
      public Decimal tel_ntr
      {
      
          get{ return this._tel_ntr; }
          set{ this._tel_ntr = value; }
        
      }
     ///<summary>
     ///tel_cclave   
     ///</summary>
      public string tel_cclave
      {
      
          get{ return this._tel_cclave; }
          set{ this._tel_cclave = value; }
        
      }
     ///<summary>
     ///tel_cpermiso   
     ///</summary>
      public string tel_cpermiso
      {
      
          get{ return this._tel_cpermiso; }
          set{ this._tel_cpermiso = value; }
        
      }
     ///<summary>
     ///tel_nsms   
     ///</summary>
      public Decimal tel_nsms
      {
      
          get{ return this._tel_nsms; }
          set{ this._tel_nsms = value; }
        
      }
     ///<summary>
     ///tel_cinternacional   
     ///</summary>
      public string tel_cinternacional
      {
      
          get{ return this._tel_cinternacional; }
          set{ this._tel_cinternacional = value; }
        
      }
     ///<summary>
     ///tel_ccountrycode   
     ///</summary>
      public string tel_ccountrycode
      {
      
          get{ return this._tel_ccountrycode; }
          set{ this._tel_ccountrycode = value; }
        
      }
     ///<summary>
     ///tel_iismobile   
     ///</summary>
      public int tel_iismobile
      {
      
          get{ return this._tel_iismobile; }
          set{ this._tel_iismobile = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public DalTelefonoPlanilla(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalTelefonoPlanilla(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public DalTelefonoPlanilla(SqlHelper SqlConfig, int UserId, SimpleTelefonoPlanilla Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tel_iidpla = Simple.tel_iidpla;

      this._tel_iid = Simple.tel_iid;

      this._tel_clista = Simple.tel_clista;

      this._tel_cnombre = Simple.tel_cnombre;

      this._tel_cobservacion = Simple.tel_cobservacion;

      this._tel_ctelefono = Simple.tel_ctelefono;

      this._tel_ndiscado = Simple.tel_ndiscado;

      this._tel_cpredigito = Simple.tel_cpredigito;

      this._tel_cpostdigito = Simple.tel_cpostdigito;

      this._tel_norden = Simple.tel_norden;

      this._tel_ntr = Simple.tel_ntr;

      this._tel_cclave = Simple.tel_cclave;

      this._tel_cpermiso = Simple.tel_cpermiso;

      this._tel_nsms = Simple.tel_nsms;

      this._tel_cinternacional = Simple.tel_cinternacional;

      this._tel_ccountrycode = Simple.tel_ccountrycode;

      this._tel_iismobile = Simple.tel_iismobile;

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
    using(var cmd = new SqlCommand("TelefonoPlanillaIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tel_iidpla", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tel_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tel_clista", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tel_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cobservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ndiscado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cpredigito", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cpostdigito", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_norden", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@tel_ntr", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cpermiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_nsms", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cinternacional", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ccountrycode", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_iismobile", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tel_iidpla"].Value = this._tel_iidpla;

		cmd.Parameters["@tel_iid"].Value = this._tel_iid;

		cmd.Parameters["@tel_clista"].Value = (this._tel_clista == null) ? (object) DBNull.Value : (object) this._tel_clista;

		cmd.Parameters["@tel_cnombre"].Value = (this._tel_cnombre == null) ? (object) DBNull.Value : (object) this._tel_cnombre;

		cmd.Parameters["@tel_cobservacion"].Value = (this._tel_cobservacion == null) ? (object) DBNull.Value : (object) this._tel_cobservacion;

		cmd.Parameters["@tel_ctelefono"].Value = (this._tel_ctelefono == null) ? (object) DBNull.Value : (object) this._tel_ctelefono;

		cmd.Parameters["@tel_ndiscado"].Value = this._tel_ndiscado;

		cmd.Parameters["@tel_cpredigito"].Value = (this._tel_cpredigito == null) ? (object) DBNull.Value : (object) this._tel_cpredigito;

		cmd.Parameters["@tel_cpostdigito"].Value = (this._tel_cpostdigito == null) ? (object) DBNull.Value : (object) this._tel_cpostdigito;

		cmd.Parameters["@tel_norden"].Value = this._tel_norden;

		cmd.Parameters["@tel_ntr"].Value = this._tel_ntr;

		cmd.Parameters["@tel_cclave"].Value = (this._tel_cclave == null) ? (object) DBNull.Value : (object) this._tel_cclave;

		cmd.Parameters["@tel_cpermiso"].Value = (this._tel_cpermiso == null) ? (object) DBNull.Value : (object) this._tel_cpermiso;

		cmd.Parameters["@tel_nsms"].Value = this._tel_nsms;

		cmd.Parameters["@tel_cinternacional"].Value = (this._tel_cinternacional == null) ? (object) DBNull.Value : (object) this._tel_cinternacional;

		cmd.Parameters["@tel_ccountrycode"].Value = (this._tel_ccountrycode == null) ? (object) DBNull.Value : (object) this._tel_ccountrycode;

		cmd.Parameters["@tel_iismobile"].Value = this._tel_iismobile;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("TelefonoPlanillaUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tel_iidpla", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tel_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tel_clista", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tel_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cobservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ndiscado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cpredigito", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cpostdigito", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_norden", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@tel_ntr", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cpermiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_nsms", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cinternacional", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ccountrycode", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_iismobile", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@tel_iidpla"].Value = this._tel_iidpla;

		cmd.Parameters["@tel_iid"].Value = this._tel_iid;

		cmd.Parameters["@tel_clista"].Value = (this._tel_clista == null) ? (object) DBNull.Value : (object) this._tel_clista;

		cmd.Parameters["@tel_cnombre"].Value = (this._tel_cnombre == null) ? (object) DBNull.Value : (object) this._tel_cnombre;

		cmd.Parameters["@tel_cobservacion"].Value = (this._tel_cobservacion == null) ? (object) DBNull.Value : (object) this._tel_cobservacion;

		cmd.Parameters["@tel_ctelefono"].Value = (this._tel_ctelefono == null) ? (object) DBNull.Value : (object) this._tel_ctelefono;

		cmd.Parameters["@tel_ndiscado"].Value = this._tel_ndiscado;

		cmd.Parameters["@tel_cpredigito"].Value = (this._tel_cpredigito == null) ? (object) DBNull.Value : (object) this._tel_cpredigito;

		cmd.Parameters["@tel_cpostdigito"].Value = (this._tel_cpostdigito == null) ? (object) DBNull.Value : (object) this._tel_cpostdigito;

		cmd.Parameters["@tel_norden"].Value = this._tel_norden;

		cmd.Parameters["@tel_ntr"].Value = this._tel_ntr;

		cmd.Parameters["@tel_cclave"].Value = (this._tel_cclave == null) ? (object) DBNull.Value : (object) this._tel_cclave;

		cmd.Parameters["@tel_cpermiso"].Value = (this._tel_cpermiso == null) ? (object) DBNull.Value : (object) this._tel_cpermiso;

		cmd.Parameters["@tel_nsms"].Value = this._tel_nsms;

		cmd.Parameters["@tel_cinternacional"].Value = (this._tel_cinternacional == null) ? (object) DBNull.Value : (object) this._tel_cinternacional;

		cmd.Parameters["@tel_ccountrycode"].Value = (this._tel_ccountrycode == null) ? (object) DBNull.Value : (object) this._tel_ccountrycode;

		cmd.Parameters["@tel_iismobile"].Value = this._tel_iismobile;

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
    throw new RuntimeException("The TelefonoPlanilla is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("TelefonoPlanillaDel", conn))
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
    using(var CmdSel = new SqlCommand("TelefonoPlanillaSel", conn))
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
    SimpleTelefonoPlanilla Simple = new SimpleTelefonoPlanilla();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.tel_iidpla = this._tel_iidpla;

      Simple.tel_iid = this._tel_iid;

      Simple.tel_clista = this._tel_clista;

      Simple.tel_cnombre = this._tel_cnombre;

      Simple.tel_cobservacion = this._tel_cobservacion;

      Simple.tel_ctelefono = this._tel_ctelefono;

      Simple.tel_ndiscado = this._tel_ndiscado;

      Simple.tel_cpredigito = this._tel_cpredigito;

      Simple.tel_cpostdigito = this._tel_cpostdigito;

      Simple.tel_norden = this._tel_norden;

      Simple.tel_ntr = this._tel_ntr;

      Simple.tel_cclave = this._tel_cclave;

      Simple.tel_cpermiso = this._tel_cpermiso;

      Simple.tel_nsms = this._tel_nsms;

      Simple.tel_cinternacional = this._tel_cinternacional;

      Simple.tel_ccountrycode = this._tel_ccountrycode;

      Simple.tel_iismobile = this._tel_iismobile;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (SimpleTelefonoPlanilla)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._tel_iidpla = Simple.tel_iidpla;

      this._tel_iid = Simple.tel_iid;

      this._tel_clista = Simple.tel_clista;

      this._tel_cnombre = Simple.tel_cnombre;

      this._tel_cobservacion = Simple.tel_cobservacion;

      this._tel_ctelefono = Simple.tel_ctelefono;

      this._tel_ndiscado = Simple.tel_ndiscado;

      this._tel_cpredigito = Simple.tel_cpredigito;

      this._tel_cpostdigito = Simple.tel_cpostdigito;

      this._tel_norden = Simple.tel_norden;

      this._tel_ntr = Simple.tel_ntr;

      this._tel_cclave = Simple.tel_cclave;

      this._tel_cpermiso = Simple.tel_cpermiso;

      this._tel_nsms = Simple.tel_nsms;

      this._tel_cinternacional = Simple.tel_cinternacional;

      this._tel_ccountrycode = Simple.tel_ccountrycode;

      this._tel_iismobile = Simple.tel_iismobile;

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
    CallerTelefonoPlanilla Caller = new CallerTelefonoPlanilla();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.tel_iidpla = this._tel_iidpla;

      Caller.tel_iid = this._tel_iid;

      Caller.tel_clista = this._tel_clista;

      Caller.tel_cnombre = this._tel_cnombre;

      Caller.tel_cobservacion = this._tel_cobservacion;

      Caller.tel_ctelefono = this._tel_ctelefono;

      Caller.tel_ndiscado = this._tel_ndiscado;

      Caller.tel_cpredigito = this._tel_cpredigito;

      Caller.tel_cpostdigito = this._tel_cpostdigito;

      Caller.tel_norden = this._tel_norden;

      Caller.tel_ntr = this._tel_ntr;

      Caller.tel_cclave = this._tel_cclave;

      Caller.tel_cpermiso = this._tel_cpermiso;

      Caller.tel_nsms = this._tel_nsms;

      Caller.tel_cinternacional = this._tel_cinternacional;

      Caller.tel_ccountrycode = this._tel_ccountrycode;

      Caller.tel_iismobile = this._tel_iismobile;

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
    
      dt.Columns.Add(new DataColumn("tel_iidpla", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tel_iid", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tel_clista", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_cnombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_cobservacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_ctelefono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_ndiscado", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tel_cpredigito", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_cpostdigito", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_norden", typeof (int)));
    
      dt.Columns.Add(new DataColumn("tel_ntr", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tel_cclave", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_cpermiso", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_nsms", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("tel_cinternacional", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_ccountrycode", typeof (string)));
    
      dt.Columns.Add(new DataColumn("tel_iismobile", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["tel_iidpla"] = this._tel_iidpla;

      dr["tel_iid"] = this._tel_iid;

      dr["tel_clista"] = this._tel_clista;

      dr["tel_cnombre"] = this._tel_cnombre;

      dr["tel_cobservacion"] = this._tel_cobservacion;

      dr["tel_ctelefono"] = this._tel_ctelefono;

      dr["tel_ndiscado"] = this._tel_ndiscado;

      dr["tel_cpredigito"] = this._tel_cpredigito;

      dr["tel_cpostdigito"] = this._tel_cpostdigito;

      dr["tel_norden"] = this._tel_norden;

      dr["tel_ntr"] = this._tel_ntr;

      dr["tel_cclave"] = this._tel_cclave;

      dr["tel_cpermiso"] = this._tel_cpermiso;

      dr["tel_nsms"] = this._tel_nsms;

      dr["tel_cinternacional"] = this._tel_cinternacional;

      dr["tel_ccountrycode"] = this._tel_ccountrycode;

      dr["tel_iismobile"] = this._tel_iismobile;

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
    using(var CmdChilds = new SqlCommand("TelefonoPlanillaByChildObject", conn))
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
    SimpleTelefonoPlanilla Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("TelefonoPlanillaByChildObject", conn))
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
    Simple = new SimpleTelefonoPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tel_iidpla = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tel_iid = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.tel_clista = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.tel_cnombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tel_cobservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tel_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tel_ndiscado = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tel_cpredigito = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tel_cpostdigito = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tel_norden = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt16(11);
if (Reader.FieldCount > 12)Simple.tel_ntr = (Reader.IsDBNull(12)) ? new Decimal(0) : Reader.GetDecimal(12);
if (Reader.FieldCount > 13)Simple.tel_cclave = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tel_cpermiso = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tel_nsms = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.tel_cinternacional = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tel_ccountrycode = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.tel_iismobile = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);


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
    SimpleTelefonoPlanilla Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new SimpleTelefonoPlanilla();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.tel_iidpla = (Row["tel_iidpla"] == DBNull.Value) ? 0 : (int) Row["tel_iidpla"];

Simple.tel_iid = (Row["tel_iid"] == DBNull.Value) ? 0 : (int) Row["tel_iid"];

Simple.tel_clista = (Row["tel_clista"] == DBNull.Value) ? "" : (string) Row["tel_clista"];

Simple.tel_cnombre = (Row["tel_cnombre"] == DBNull.Value) ? "" : (string) Row["tel_cnombre"];

Simple.tel_cobservacion = (Row["tel_cobservacion"] == DBNull.Value) ? "" : (string) Row["tel_cobservacion"];

Simple.tel_ctelefono = (Row["tel_ctelefono"] == DBNull.Value) ? "" : (string) Row["tel_ctelefono"];

Simple.tel_ndiscado = (Row["tel_ndiscado"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tel_ndiscado"];

Simple.tel_cpredigito = (Row["tel_cpredigito"] == DBNull.Value) ? "" : (string) Row["tel_cpredigito"];

Simple.tel_cpostdigito = (Row["tel_cpostdigito"] == DBNull.Value) ? "" : (string) Row["tel_cpostdigito"];

Simple.tel_norden = (Row["tel_norden"] == DBNull.Value) ? 0 : (int) Row["tel_norden"];

Simple.tel_ntr = (Row["tel_ntr"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tel_ntr"];

Simple.tel_cclave = (Row["tel_cclave"] == DBNull.Value) ? "" : (string) Row["tel_cclave"];

Simple.tel_cpermiso = (Row["tel_cpermiso"] == DBNull.Value) ? "" : (string) Row["tel_cpermiso"];

Simple.tel_nsms = (Row["tel_nsms"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["tel_nsms"];

Simple.tel_cinternacional = (Row["tel_cinternacional"] == DBNull.Value) ? "" : (string) Row["tel_cinternacional"];

Simple.tel_ccountrycode = (Row["tel_ccountrycode"] == DBNull.Value) ? "" : (string) Row["tel_ccountrycode"];

Simple.tel_iismobile = (Row["tel_iismobile"] == DBNull.Value) ? 0 : (int) Row["tel_iismobile"];


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
    using(var CmdParents = new SqlCommand("TelefonoPlanillaByParentObject", conn))
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
    SimpleTelefonoPlanilla Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("TelefonoPlanillaByParentObject", conn))
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
    Simple = new SimpleTelefonoPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tel_iidpla = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tel_iid = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.tel_clista = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.tel_cnombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tel_cobservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tel_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tel_ndiscado = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tel_cpredigito = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tel_cpostdigito = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tel_norden = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt16(11);
if (Reader.FieldCount > 12)Simple.tel_ntr = (Reader.IsDBNull(12)) ? new Decimal(0) : Reader.GetDecimal(12);
if (Reader.FieldCount > 13)Simple.tel_cclave = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tel_cpermiso = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tel_nsms = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.tel_cinternacional = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tel_ccountrycode = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.tel_iismobile = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);


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
    using (var CmdDataByName = new SqlCommand("TelefonoPlanillaByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("TelefonoPlanillaByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("TelefonoPlanillaByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("TelefonoPlanillaByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("TelefonoPlanillaByText", conn))
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
    public DataTable GetDataBySimpleObject(SimpleTelefonoPlanilla Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("TelefonoPlanillaBySimpleTelefonoPlanilla", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@tel_iidpla", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tel_iid", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@tel_clista", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@tel_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cobservacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ndiscado", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cpredigito", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cpostdigito", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_norden", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@tel_ntr", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cclave", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_cpermiso", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_nsms", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@tel_cinternacional", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_ccountrycode", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@tel_iismobile", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@tel_iidpla"].Value = this._tel_iidpla;

		cmd.Parameters["@tel_iid"].Value = this._tel_iid;

		cmd.Parameters["@tel_clista"].Value = (this._tel_clista == null) ? (object) DBNull.Value : (object) this._tel_clista;

		cmd.Parameters["@tel_cnombre"].Value = (this._tel_cnombre == null) ? (object) DBNull.Value : (object) this._tel_cnombre;

		cmd.Parameters["@tel_cobservacion"].Value = (this._tel_cobservacion == null) ? (object) DBNull.Value : (object) this._tel_cobservacion;

		cmd.Parameters["@tel_ctelefono"].Value = (this._tel_ctelefono == null) ? (object) DBNull.Value : (object) this._tel_ctelefono;

		cmd.Parameters["@tel_ndiscado"].Value = this._tel_ndiscado;

		cmd.Parameters["@tel_cpredigito"].Value = (this._tel_cpredigito == null) ? (object) DBNull.Value : (object) this._tel_cpredigito;

		cmd.Parameters["@tel_cpostdigito"].Value = (this._tel_cpostdigito == null) ? (object) DBNull.Value : (object) this._tel_cpostdigito;

		cmd.Parameters["@tel_norden"].Value = this._tel_norden;

		cmd.Parameters["@tel_ntr"].Value = this._tel_ntr;

		cmd.Parameters["@tel_cclave"].Value = (this._tel_cclave == null) ? (object) DBNull.Value : (object) this._tel_cclave;

		cmd.Parameters["@tel_cpermiso"].Value = (this._tel_cpermiso == null) ? (object) DBNull.Value : (object) this._tel_cpermiso;

		cmd.Parameters["@tel_nsms"].Value = this._tel_nsms;

		cmd.Parameters["@tel_cinternacional"].Value = (this._tel_cinternacional == null) ? (object) DBNull.Value : (object) this._tel_cinternacional;

		cmd.Parameters["@tel_ccountrycode"].Value = (this._tel_ccountrycode == null) ? (object) DBNull.Value : (object) this._tel_ccountrycode;

		cmd.Parameters["@tel_iismobile"].Value = this._tel_iismobile;


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
		 
		public IEnumerable<SimpleTelefonoPlanilla> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("TelefonoPlanillaByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleTelefonoPlanilla Simple = new SimpleTelefonoPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tel_iidpla = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tel_iid = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.tel_clista = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.tel_cnombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tel_cobservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tel_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tel_ndiscado = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tel_cpredigito = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tel_cpostdigito = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tel_norden = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt16(11);
if (Reader.FieldCount > 12)Simple.tel_ntr = (Reader.IsDBNull(12)) ? new Decimal(0) : Reader.GetDecimal(12);
if (Reader.FieldCount > 13)Simple.tel_cclave = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tel_cpermiso = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tel_nsms = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.tel_cinternacional = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tel_ccountrycode = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.tel_iismobile = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<SimpleTelefonoPlanilla> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("TelefonoPlanillaByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				SimpleTelefonoPlanilla Simple = new SimpleTelefonoPlanilla();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.tel_iidpla = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.tel_iid = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)Simple.tel_clista = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.tel_cnombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.tel_cobservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.tel_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.tel_ndiscado = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.tel_cpredigito = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.tel_cpostdigito = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.tel_norden = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt16(11);
if (Reader.FieldCount > 12)Simple.tel_ntr = (Reader.IsDBNull(12)) ? new Decimal(0) : Reader.GetDecimal(12);
if (Reader.FieldCount > 13)Simple.tel_cclave = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.tel_cpermiso = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.tel_nsms = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)Simple.tel_cinternacional = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.tel_ccountrycode = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)Simple.tel_iismobile = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3012, "TelefonoPlanilla");
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
    if (Reader.FieldCount > 2)this._tel_iidpla = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._tel_iid = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
if (Reader.FieldCount > 4)this._tel_clista = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._tel_cnombre = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._tel_cobservacion = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._tel_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._tel_ndiscado = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)this._tel_cpredigito = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._tel_cpostdigito = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._tel_norden = (Reader.IsDBNull(11)) ? 0 : Reader.GetInt16(11);
if (Reader.FieldCount > 12)this._tel_ntr = (Reader.IsDBNull(12)) ? new Decimal(0) : Reader.GetDecimal(12);
if (Reader.FieldCount > 13)this._tel_cclave = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._tel_cpermiso = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._tel_nsms = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
if (Reader.FieldCount > 16)this._tel_cinternacional = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._tel_ccountrycode = (Reader.IsDBNull(17)) ? "" : Reader.GetString(17);
if (Reader.FieldCount > 18)this._tel_iismobile = (Reader.IsDBNull(18)) ? 0 : Reader.GetInt32(18);

    }
    Reader.Close();
    }
   }
  
    }
  