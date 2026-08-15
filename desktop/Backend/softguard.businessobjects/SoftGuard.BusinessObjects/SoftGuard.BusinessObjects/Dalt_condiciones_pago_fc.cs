
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
     ///t_condiciones_pago_fc data access layer   
     ///</summary>
    public class Dalt_condiciones_pago_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _con_ccodigo;
    
      private string _con_cdescripcion;
    
      private Decimal _con_ncuotas;
    
      private int _con_idias;
    
      private int _con_ifrecuencia;
    
      private Decimal _con_nPideDatos;
    
      private Decimal _con_nCobranzaAut;
    
      private string _con_cCodigoBarra;
    
      private int _con_iRemesa;
    
      private string _con_cDatosExtra;
    
      private string _con_cFormaPagoCobrAut;
    
      private int _con_orgidcodigoid;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///con_ccodigo   
     ///</summary>
      public string con_ccodigo
      {
      
          get{ return this._con_ccodigo; }
          set{ this._con_ccodigo = value; }
        
      }
     ///<summary>
     ///con_cdescripcion   
     ///</summary>
      public string con_cdescripcion
      {
      
          get{ return this._con_cdescripcion; }
          set{ this._con_cdescripcion = value; }
        
      }
     ///<summary>
     ///con_ncuotas   
     ///</summary>
      public Decimal con_ncuotas
      {
      
          get{ return this._con_ncuotas; }
          set{ this._con_ncuotas = value; }
        
      }
     ///<summary>
     ///con_idias   
     ///</summary>
      public int con_idias
      {
      
          get{ return this._con_idias; }
          set{ this._con_idias = value; }
        
      }
     ///<summary>
     ///con_ifrecuencia   
     ///</summary>
      public int con_ifrecuencia
      {
      
          get{ return this._con_ifrecuencia; }
          set{ this._con_ifrecuencia = value; }
        
      }
     ///<summary>
     ///con_nPideDatos   
     ///</summary>
      public Decimal con_nPideDatos
      {
      
          get{ return this._con_nPideDatos; }
          set{ this._con_nPideDatos = value; }
        
      }
     ///<summary>
     ///con_nCobranzaAut   
     ///</summary>
      public Decimal con_nCobranzaAut
      {
      
          get{ return this._con_nCobranzaAut; }
          set{ this._con_nCobranzaAut = value; }
        
      }
     ///<summary>
     ///con_cCodigoBarra   
     ///</summary>
      public string con_cCodigoBarra
      {
      
          get{ return this._con_cCodigoBarra; }
          set{ this._con_cCodigoBarra = value; }
        
      }
     ///<summary>
     ///con_iRemesa   
     ///</summary>
      public int con_iRemesa
      {
      
          get{ return this._con_iRemesa; }
          set{ this._con_iRemesa = value; }
        
      }
     ///<summary>
     ///con_cDatosExtra   
     ///</summary>
      public string con_cDatosExtra
      {
      
          get{ return this._con_cDatosExtra; }
          set{ this._con_cDatosExtra = value; }
        
      }
     ///<summary>
     ///con_cFormaPagoCobrAut   
     ///</summary>
      public string con_cFormaPagoCobrAut
      {
      
          get{ return this._con_cFormaPagoCobrAut; }
          set{ this._con_cFormaPagoCobrAut = value; }
        
      }
     ///<summary>
     ///con_orgidcodigoid   
     ///</summary>
      public int con_orgidcodigoid
      {
      
          get{ return this._con_orgidcodigoid; }
          set{ this._con_orgidcodigoid = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_condiciones_pago_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_condiciones_pago_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_condiciones_pago_fc(SqlHelper SqlConfig, int UserId, Simplet_condiciones_pago_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._con_ccodigo = Simple.con_ccodigo;

      this._con_cdescripcion = Simple.con_cdescripcion;

      this._con_ncuotas = Simple.con_ncuotas;

      this._con_idias = Simple.con_idias;

      this._con_ifrecuencia = Simple.con_ifrecuencia;

      this._con_nPideDatos = Simple.con_nPideDatos;

      this._con_nCobranzaAut = Simple.con_nCobranzaAut;

      this._con_cCodigoBarra = Simple.con_cCodigoBarra;

      this._con_iRemesa = Simple.con_iRemesa;

      this._con_cDatosExtra = Simple.con_cDatosExtra;

      this._con_cFormaPagoCobrAut = Simple.con_cFormaPagoCobrAut;

      this._con_orgidcodigoid = Simple.con_orgidcodigoid;

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
    using(var cmd = new SqlCommand("t_condiciones_pago_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@con_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@con_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@con_ncuotas", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_idias", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@con_ifrecuencia", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@con_nPideDatos", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_nCobranzaAut", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_cCodigoBarra", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@con_iRemesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@con_cDatosExtra", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@con_cFormaPagoCobrAut", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@con_orgidcodigoid", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@con_ccodigo"].Value = (this._con_ccodigo == null) ? (object) DBNull.Value : (object) this._con_ccodigo;

		cmd.Parameters["@con_cdescripcion"].Value = (this._con_cdescripcion == null) ? (object) DBNull.Value : (object) this._con_cdescripcion;

		cmd.Parameters["@con_ncuotas"].Value = this._con_ncuotas;

		cmd.Parameters["@con_idias"].Value = this._con_idias;

		cmd.Parameters["@con_ifrecuencia"].Value = this._con_ifrecuencia;

		cmd.Parameters["@con_nPideDatos"].Value = this._con_nPideDatos;

		cmd.Parameters["@con_nCobranzaAut"].Value = this._con_nCobranzaAut;

		cmd.Parameters["@con_cCodigoBarra"].Value = (this._con_cCodigoBarra == null) ? (object) DBNull.Value : (object) this._con_cCodigoBarra;

		cmd.Parameters["@con_iRemesa"].Value = this._con_iRemesa;

		cmd.Parameters["@con_cDatosExtra"].Value = (this._con_cDatosExtra == null) ? (object) DBNull.Value : (object) this._con_cDatosExtra;

		cmd.Parameters["@con_cFormaPagoCobrAut"].Value = (this._con_cFormaPagoCobrAut == null) ? (object) DBNull.Value : (object) this._con_cFormaPagoCobrAut;

		cmd.Parameters["@con_orgidcodigoid"].Value = this._con_orgidcodigoid;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_condiciones_pago_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@con_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@con_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@con_ncuotas", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_idias", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@con_ifrecuencia", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@con_nPideDatos", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_nCobranzaAut", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_cCodigoBarra", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@con_iRemesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@con_cDatosExtra", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@con_cFormaPagoCobrAut", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@con_orgidcodigoid", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@con_ccodigo"].Value = (this._con_ccodigo == null) ? (object) DBNull.Value : (object) this._con_ccodigo;

		cmd.Parameters["@con_cdescripcion"].Value = (this._con_cdescripcion == null) ? (object) DBNull.Value : (object) this._con_cdescripcion;

		cmd.Parameters["@con_ncuotas"].Value = this._con_ncuotas;

		cmd.Parameters["@con_idias"].Value = this._con_idias;

		cmd.Parameters["@con_ifrecuencia"].Value = this._con_ifrecuencia;

		cmd.Parameters["@con_nPideDatos"].Value = this._con_nPideDatos;

		cmd.Parameters["@con_nCobranzaAut"].Value = this._con_nCobranzaAut;

		cmd.Parameters["@con_cCodigoBarra"].Value = (this._con_cCodigoBarra == null) ? (object) DBNull.Value : (object) this._con_cCodigoBarra;

		cmd.Parameters["@con_iRemesa"].Value = this._con_iRemesa;

		cmd.Parameters["@con_cDatosExtra"].Value = (this._con_cDatosExtra == null) ? (object) DBNull.Value : (object) this._con_cDatosExtra;

		cmd.Parameters["@con_cFormaPagoCobrAut"].Value = (this._con_cFormaPagoCobrAut == null) ? (object) DBNull.Value : (object) this._con_cFormaPagoCobrAut;

		cmd.Parameters["@con_orgidcodigoid"].Value = this._con_orgidcodigoid;

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
    throw new RuntimeException("The t_condiciones_pago_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_condiciones_pago_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("t_condiciones_pago_fcSel", conn))
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
    Simplet_condiciones_pago_fc Simple = new Simplet_condiciones_pago_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.con_ccodigo = this._con_ccodigo;

      Simple.con_cdescripcion = this._con_cdescripcion;

      Simple.con_ncuotas = this._con_ncuotas;

      Simple.con_idias = this._con_idias;

      Simple.con_ifrecuencia = this._con_ifrecuencia;

      Simple.con_nPideDatos = this._con_nPideDatos;

      Simple.con_nCobranzaAut = this._con_nCobranzaAut;

      Simple.con_cCodigoBarra = this._con_cCodigoBarra;

      Simple.con_iRemesa = this._con_iRemesa;

      Simple.con_cDatosExtra = this._con_cDatosExtra;

      Simple.con_cFormaPagoCobrAut = this._con_cFormaPagoCobrAut;

      Simple.con_orgidcodigoid = this._con_orgidcodigoid;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_condiciones_pago_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._con_ccodigo = Simple.con_ccodigo;

      this._con_cdescripcion = Simple.con_cdescripcion;

      this._con_ncuotas = Simple.con_ncuotas;

      this._con_idias = Simple.con_idias;

      this._con_ifrecuencia = Simple.con_ifrecuencia;

      this._con_nPideDatos = Simple.con_nPideDatos;

      this._con_nCobranzaAut = Simple.con_nCobranzaAut;

      this._con_cCodigoBarra = Simple.con_cCodigoBarra;

      this._con_iRemesa = Simple.con_iRemesa;

      this._con_cDatosExtra = Simple.con_cDatosExtra;

      this._con_cFormaPagoCobrAut = Simple.con_cFormaPagoCobrAut;

      this._con_orgidcodigoid = Simple.con_orgidcodigoid;

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
    Callert_condiciones_pago_fc Caller = new Callert_condiciones_pago_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.con_ccodigo = this._con_ccodigo;

      Caller.con_cdescripcion = this._con_cdescripcion;

      Caller.con_ncuotas = this._con_ncuotas;

      Caller.con_idias = this._con_idias;

      Caller.con_ifrecuencia = this._con_ifrecuencia;

      Caller.con_nPideDatos = this._con_nPideDatos;

      Caller.con_nCobranzaAut = this._con_nCobranzaAut;

      Caller.con_cCodigoBarra = this._con_cCodigoBarra;

      Caller.con_iRemesa = this._con_iRemesa;

      Caller.con_cDatosExtra = this._con_cDatosExtra;

      Caller.con_cFormaPagoCobrAut = this._con_cFormaPagoCobrAut;

      Caller.con_orgidcodigoid = this._con_orgidcodigoid;

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
    
      dt.Columns.Add(new DataColumn("con_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("con_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("con_ncuotas", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("con_idias", typeof (int)));
    
      dt.Columns.Add(new DataColumn("con_ifrecuencia", typeof (int)));
    
      dt.Columns.Add(new DataColumn("con_nPideDatos", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("con_nCobranzaAut", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("con_cCodigoBarra", typeof (string)));
    
      dt.Columns.Add(new DataColumn("con_iRemesa", typeof (int)));
    
      dt.Columns.Add(new DataColumn("con_cDatosExtra", typeof (string)));
    
      dt.Columns.Add(new DataColumn("con_cFormaPagoCobrAut", typeof (string)));
    
      dt.Columns.Add(new DataColumn("con_orgidcodigoid", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["con_ccodigo"] = this._con_ccodigo;

      dr["con_cdescripcion"] = this._con_cdescripcion;

      dr["con_ncuotas"] = this._con_ncuotas;

      dr["con_idias"] = this._con_idias;

      dr["con_ifrecuencia"] = this._con_ifrecuencia;

      dr["con_nPideDatos"] = this._con_nPideDatos;

      dr["con_nCobranzaAut"] = this._con_nCobranzaAut;

      dr["con_cCodigoBarra"] = this._con_cCodigoBarra;

      dr["con_iRemesa"] = this._con_iRemesa;

      dr["con_cDatosExtra"] = this._con_cDatosExtra;

      dr["con_cFormaPagoCobrAut"] = this._con_cFormaPagoCobrAut;

      dr["con_orgidcodigoid"] = this._con_orgidcodigoid;

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
    using(var CmdChilds = new SqlCommand("t_condiciones_pago_fcByChildObject", conn))
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
    Simplet_condiciones_pago_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_condiciones_pago_fcByChildObject", conn))
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
    Simple = new Simplet_condiciones_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.con_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.con_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.con_ncuotas = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.con_idias = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt16(5);
if (Reader.FieldCount > 6)Simple.con_ifrecuencia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt16(6);
if (Reader.FieldCount > 7)Simple.con_nPideDatos = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.con_nCobranzaAut = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.con_cCodigoBarra = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.con_iRemesa = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.con_cDatosExtra = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.con_cFormaPagoCobrAut = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.con_orgidcodigoid = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    Simplet_condiciones_pago_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_condiciones_pago_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.con_ccodigo = (Row["con_ccodigo"] == DBNull.Value) ? "" : (string) Row["con_ccodigo"];

Simple.con_cdescripcion = (Row["con_cdescripcion"] == DBNull.Value) ? "" : (string) Row["con_cdescripcion"];

Simple.con_ncuotas = (Row["con_ncuotas"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["con_ncuotas"];

Simple.con_idias = (Row["con_idias"] == DBNull.Value) ? 0 : (int) Row["con_idias"];

Simple.con_ifrecuencia = (Row["con_ifrecuencia"] == DBNull.Value) ? 0 : (int) Row["con_ifrecuencia"];

Simple.con_nPideDatos = (Row["con_nPideDatos"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["con_nPideDatos"];

Simple.con_nCobranzaAut = (Row["con_nCobranzaAut"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["con_nCobranzaAut"];

Simple.con_cCodigoBarra = (Row["con_cCodigoBarra"] == DBNull.Value) ? "" : (string) Row["con_cCodigoBarra"];

Simple.con_iRemesa = (Row["con_iRemesa"] == DBNull.Value) ? 0 : (int) Row["con_iRemesa"];

Simple.con_cDatosExtra = (Row["con_cDatosExtra"] == DBNull.Value) ? "" : (string) Row["con_cDatosExtra"];

Simple.con_cFormaPagoCobrAut = (Row["con_cFormaPagoCobrAut"] == DBNull.Value) ? "" : (string) Row["con_cFormaPagoCobrAut"];

Simple.con_orgidcodigoid = (Row["con_orgidcodigoid"] == DBNull.Value) ? 0 : (int) Row["con_orgidcodigoid"];


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
    using(var CmdParents = new SqlCommand("t_condiciones_pago_fcByParentObject", conn))
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
    Simplet_condiciones_pago_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_condiciones_pago_fcByParentObject", conn))
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
    Simple = new Simplet_condiciones_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.con_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.con_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.con_ncuotas = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.con_idias = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt16(5);
if (Reader.FieldCount > 6)Simple.con_ifrecuencia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt16(6);
if (Reader.FieldCount > 7)Simple.con_nPideDatos = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.con_nCobranzaAut = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.con_cCodigoBarra = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.con_iRemesa = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.con_cDatosExtra = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.con_cFormaPagoCobrAut = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.con_orgidcodigoid = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);


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
    using (var CmdDataByName = new SqlCommand("t_condiciones_pago_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_condiciones_pago_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_condiciones_pago_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_condiciones_pago_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_condiciones_pago_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_condiciones_pago_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_condiciones_pago_fcBySimplet_condiciones_pago_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@con_ccodigo", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@con_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@con_ncuotas", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_idias", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@con_ifrecuencia", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@con_nPideDatos", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_nCobranzaAut", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@con_cCodigoBarra", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@con_iRemesa", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@con_cDatosExtra", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@con_cFormaPagoCobrAut", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@con_orgidcodigoid", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@con_ccodigo"].Value = (this._con_ccodigo == null) ? (object) DBNull.Value : (object) this._con_ccodigo;

		cmd.Parameters["@con_cdescripcion"].Value = (this._con_cdescripcion == null) ? (object) DBNull.Value : (object) this._con_cdescripcion;

		cmd.Parameters["@con_ncuotas"].Value = this._con_ncuotas;

		cmd.Parameters["@con_idias"].Value = this._con_idias;

		cmd.Parameters["@con_ifrecuencia"].Value = this._con_ifrecuencia;

		cmd.Parameters["@con_nPideDatos"].Value = this._con_nPideDatos;

		cmd.Parameters["@con_nCobranzaAut"].Value = this._con_nCobranzaAut;

		cmd.Parameters["@con_cCodigoBarra"].Value = (this._con_cCodigoBarra == null) ? (object) DBNull.Value : (object) this._con_cCodigoBarra;

		cmd.Parameters["@con_iRemesa"].Value = this._con_iRemesa;

		cmd.Parameters["@con_cDatosExtra"].Value = (this._con_cDatosExtra == null) ? (object) DBNull.Value : (object) this._con_cDatosExtra;

		cmd.Parameters["@con_cFormaPagoCobrAut"].Value = (this._con_cFormaPagoCobrAut == null) ? (object) DBNull.Value : (object) this._con_cFormaPagoCobrAut;

		cmd.Parameters["@con_orgidcodigoid"].Value = this._con_orgidcodigoid;


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
		 
		public IEnumerable<Simplet_condiciones_pago_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_condiciones_pago_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_condiciones_pago_fc Simple = new Simplet_condiciones_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.con_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.con_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.con_ncuotas = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.con_idias = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt16(5);
if (Reader.FieldCount > 6)Simple.con_ifrecuencia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt16(6);
if (Reader.FieldCount > 7)Simple.con_nPideDatos = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.con_nCobranzaAut = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.con_cCodigoBarra = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.con_iRemesa = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.con_cDatosExtra = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.con_cFormaPagoCobrAut = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.con_orgidcodigoid = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_condiciones_pago_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_condiciones_pago_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_condiciones_pago_fc Simple = new Simplet_condiciones_pago_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.con_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.con_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.con_ncuotas = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.con_idias = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt16(5);
if (Reader.FieldCount > 6)Simple.con_ifrecuencia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt16(6);
if (Reader.FieldCount > 7)Simple.con_nPideDatos = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.con_nCobranzaAut = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.con_cCodigoBarra = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.con_iRemesa = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)Simple.con_cDatosExtra = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.con_cFormaPagoCobrAut = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.con_orgidcodigoid = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3149, "t_condiciones_pago_fc");
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
    if (Reader.FieldCount > 2)this._con_ccodigo = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._con_cdescripcion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._con_ncuotas = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)this._con_idias = (Reader.IsDBNull(5)) ? 0 : Reader.GetInt16(5);
if (Reader.FieldCount > 6)this._con_ifrecuencia = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt16(6);
if (Reader.FieldCount > 7)this._con_nPideDatos = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._con_nCobranzaAut = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)this._con_cCodigoBarra = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._con_iRemesa = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt32(10);
if (Reader.FieldCount > 11)this._con_cDatosExtra = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._con_cFormaPagoCobrAut = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._con_orgidcodigoid = (Reader.IsDBNull(13)) ? 0 : Reader.GetInt32(13);

    }
    Reader.Close();
    }
   }
  
    }
  