
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
     ///m_comprobantes_item_fc data access layer   
     ///</summary>
    public class Dalm_comprobantes_item_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _cbi_icodigocab;
    
      private int _cbi_irenglon;
    
      private int _cbi_iproducto;
    
      private string _cbi_cdescripcion;
    
      private string _cbi_ccodigo;
    
      private int _cbi_inovedad;
    
      private int _cbi_inovedadTabla;
    
      private Decimal _cbi_yimporte;
    
      private int _cbi_icantidad;
    
      private Decimal _cbi_ndescuento;
    
      private string _cbi_cimpuestos;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cbi_icodigocab   
     ///</summary>
      public int cbi_icodigocab
      {
      
          get{ return this._cbi_icodigocab; }
          set{ this._cbi_icodigocab = value; }
        
      }
     ///<summary>
     ///cbi_irenglon   
     ///</summary>
      public int cbi_irenglon
      {
      
          get{ return this._cbi_irenglon; }
          set{ this._cbi_irenglon = value; }
        
      }
     ///<summary>
     ///cbi_iproducto   
     ///</summary>
      public int cbi_iproducto
      {
      
          get{ return this._cbi_iproducto; }
          set{ this._cbi_iproducto = value; }
        
      }
     ///<summary>
     ///cbi_cdescripcion   
     ///</summary>
      public string cbi_cdescripcion
      {
      
          get{ return this._cbi_cdescripcion; }
          set{ this._cbi_cdescripcion = value; }
        
      }
     ///<summary>
     ///cbi_ccodigo   
     ///</summary>
      public string cbi_ccodigo
      {
      
          get{ return this._cbi_ccodigo; }
          set{ this._cbi_ccodigo = value; }
        
      }
     ///<summary>
     ///cbi_inovedad   
     ///</summary>
      public int cbi_inovedad
      {
      
          get{ return this._cbi_inovedad; }
          set{ this._cbi_inovedad = value; }
        
      }
     ///<summary>
     ///cbi_inovedadTabla   
     ///</summary>
      public int cbi_inovedadTabla
      {
      
          get{ return this._cbi_inovedadTabla; }
          set{ this._cbi_inovedadTabla = value; }
        
      }
     ///<summary>
     ///cbi_yimporte   
     ///</summary>
      public Decimal cbi_yimporte
      {
      
          get{ return this._cbi_yimporte; }
          set{ this._cbi_yimporte = value; }
        
      }
     ///<summary>
     ///cbi_icantidad   
     ///</summary>
      public int cbi_icantidad
      {
      
          get{ return this._cbi_icantidad; }
          set{ this._cbi_icantidad = value; }
        
      }
     ///<summary>
     ///cbi_ndescuento   
     ///</summary>
      public Decimal cbi_ndescuento
      {
      
          get{ return this._cbi_ndescuento; }
          set{ this._cbi_ndescuento = value; }
        
      }
     ///<summary>
     ///cbi_cimpuestos   
     ///</summary>
      public string cbi_cimpuestos
      {
      
          get{ return this._cbi_cimpuestos; }
          set{ this._cbi_cimpuestos = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_comprobantes_item_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_comprobantes_item_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_comprobantes_item_fc(SqlHelper SqlConfig, int UserId, Simplem_comprobantes_item_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cbi_icodigocab = Simple.cbi_icodigocab;

      this._cbi_irenglon = Simple.cbi_irenglon;

      this._cbi_iproducto = Simple.cbi_iproducto;

      this._cbi_cdescripcion = Simple.cbi_cdescripcion;

      this._cbi_ccodigo = Simple.cbi_ccodigo;

      this._cbi_inovedad = Simple.cbi_inovedad;

      this._cbi_inovedadTabla = Simple.cbi_inovedadTabla;

      this._cbi_yimporte = Simple.cbi_yimporte;

      this._cbi_icantidad = Simple.cbi_icantidad;

      this._cbi_ndescuento = Simple.cbi_ndescuento;

      this._cbi_cimpuestos = Simple.cbi_cimpuestos;

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
    using(var cmd = new SqlCommand("m_comprobantes_item_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbi_icodigocab", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_irenglon", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@cbi_iproducto", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbi_ccodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbi_inovedad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_inovedadTabla", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_yimporte", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbi_icantidad", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@cbi_ndescuento", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbi_cimpuestos", SqlDbType.NVarChar));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cbi_icodigocab"].Value = this._cbi_icodigocab;

		cmd.Parameters["@cbi_irenglon"].Value = this._cbi_irenglon;

		cmd.Parameters["@cbi_iproducto"].Value = this._cbi_iproducto;

		cmd.Parameters["@cbi_cdescripcion"].Value = (this._cbi_cdescripcion == null) ? (object) DBNull.Value : (object) this._cbi_cdescripcion;

		cmd.Parameters["@cbi_ccodigo"].Value = (this._cbi_ccodigo == null) ? (object) DBNull.Value : (object) this._cbi_ccodigo;

		cmd.Parameters["@cbi_inovedad"].Value = this._cbi_inovedad;

		cmd.Parameters["@cbi_inovedadTabla"].Value = this._cbi_inovedadTabla;

		cmd.Parameters["@cbi_yimporte"].Value = this._cbi_yimporte;

		cmd.Parameters["@cbi_icantidad"].Value = this._cbi_icantidad;

		cmd.Parameters["@cbi_ndescuento"].Value = this._cbi_ndescuento;

		cmd.Parameters["@cbi_cimpuestos"].Value = (this._cbi_cimpuestos == null) ? (object) DBNull.Value : (object) this._cbi_cimpuestos;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_comprobantes_item_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbi_icodigocab", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_irenglon", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@cbi_iproducto", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbi_ccodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbi_inovedad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_inovedadTabla", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_yimporte", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbi_icantidad", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@cbi_ndescuento", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbi_cimpuestos", SqlDbType.NVarChar));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cbi_icodigocab"].Value = this._cbi_icodigocab;

		cmd.Parameters["@cbi_irenglon"].Value = this._cbi_irenglon;

		cmd.Parameters["@cbi_iproducto"].Value = this._cbi_iproducto;

		cmd.Parameters["@cbi_cdescripcion"].Value = (this._cbi_cdescripcion == null) ? (object) DBNull.Value : (object) this._cbi_cdescripcion;

		cmd.Parameters["@cbi_ccodigo"].Value = (this._cbi_ccodigo == null) ? (object) DBNull.Value : (object) this._cbi_ccodigo;

		cmd.Parameters["@cbi_inovedad"].Value = this._cbi_inovedad;

		cmd.Parameters["@cbi_inovedadTabla"].Value = this._cbi_inovedadTabla;

		cmd.Parameters["@cbi_yimporte"].Value = this._cbi_yimporte;

		cmd.Parameters["@cbi_icantidad"].Value = this._cbi_icantidad;

		cmd.Parameters["@cbi_ndescuento"].Value = this._cbi_ndescuento;

		cmd.Parameters["@cbi_cimpuestos"].Value = (this._cbi_cimpuestos == null) ? (object) DBNull.Value : (object) this._cbi_cimpuestos;

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
    throw new RuntimeException("The m_comprobantes_item_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_comprobantes_item_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("m_comprobantes_item_fcSel", conn))
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
    Simplem_comprobantes_item_fc Simple = new Simplem_comprobantes_item_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cbi_icodigocab = this._cbi_icodigocab;

      Simple.cbi_irenglon = this._cbi_irenglon;

      Simple.cbi_iproducto = this._cbi_iproducto;

      Simple.cbi_cdescripcion = this._cbi_cdescripcion;

      Simple.cbi_ccodigo = this._cbi_ccodigo;

      Simple.cbi_inovedad = this._cbi_inovedad;

      Simple.cbi_inovedadTabla = this._cbi_inovedadTabla;

      Simple.cbi_yimporte = this._cbi_yimporte;

      Simple.cbi_icantidad = this._cbi_icantidad;

      Simple.cbi_ndescuento = this._cbi_ndescuento;

      Simple.cbi_cimpuestos = this._cbi_cimpuestos;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_comprobantes_item_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cbi_icodigocab = Simple.cbi_icodigocab;

      this._cbi_irenglon = Simple.cbi_irenglon;

      this._cbi_iproducto = Simple.cbi_iproducto;

      this._cbi_cdescripcion = Simple.cbi_cdescripcion;

      this._cbi_ccodigo = Simple.cbi_ccodigo;

      this._cbi_inovedad = Simple.cbi_inovedad;

      this._cbi_inovedadTabla = Simple.cbi_inovedadTabla;

      this._cbi_yimporte = Simple.cbi_yimporte;

      this._cbi_icantidad = Simple.cbi_icantidad;

      this._cbi_ndescuento = Simple.cbi_ndescuento;

      this._cbi_cimpuestos = Simple.cbi_cimpuestos;

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
    Callerm_comprobantes_item_fc Caller = new Callerm_comprobantes_item_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cbi_icodigocab = this._cbi_icodigocab;

      Caller.cbi_irenglon = this._cbi_irenglon;

      Caller.cbi_iproducto = this._cbi_iproducto;

      Caller.cbi_cdescripcion = this._cbi_cdescripcion;

      Caller.cbi_ccodigo = this._cbi_ccodigo;

      Caller.cbi_inovedad = this._cbi_inovedad;

      Caller.cbi_inovedadTabla = this._cbi_inovedadTabla;

      Caller.cbi_yimporte = this._cbi_yimporte;

      Caller.cbi_icantidad = this._cbi_icantidad;

      Caller.cbi_ndescuento = this._cbi_ndescuento;

      Caller.cbi_cimpuestos = this._cbi_cimpuestos;

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
    
      dt.Columns.Add(new DataColumn("cbi_icodigocab", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbi_irenglon", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbi_iproducto", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbi_cdescripcion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbi_ccodigo", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbi_inovedad", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbi_inovedadTabla", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbi_yimporte", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cbi_icantidad", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbi_ndescuento", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cbi_cimpuestos", typeof (string)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cbi_icodigocab"] = this._cbi_icodigocab;

      dr["cbi_irenglon"] = this._cbi_irenglon;

      dr["cbi_iproducto"] = this._cbi_iproducto;

      dr["cbi_cdescripcion"] = this._cbi_cdescripcion;

      dr["cbi_ccodigo"] = this._cbi_ccodigo;

      dr["cbi_inovedad"] = this._cbi_inovedad;

      dr["cbi_inovedadTabla"] = this._cbi_inovedadTabla;

      dr["cbi_yimporte"] = this._cbi_yimporte;

      dr["cbi_icantidad"] = this._cbi_icantidad;

      dr["cbi_ndescuento"] = this._cbi_ndescuento;

      dr["cbi_cimpuestos"] = this._cbi_cimpuestos;

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
    using(var CmdChilds = new SqlCommand("m_comprobantes_item_fcByChildObject", conn))
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
    Simplem_comprobantes_item_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_comprobantes_item_fcByChildObject", conn))
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
    Simple = new Simplem_comprobantes_item_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbi_icodigocab = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbi_irenglon = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt16(3);
if (Reader.FieldCount > 4)Simple.cbi_iproducto = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cbi_cdescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbi_ccodigo = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbi_inovedad = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cbi_inovedadTabla = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbi_yimporte = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbi_icantidad = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt16(10);
if (Reader.FieldCount > 11)Simple.cbi_ndescuento = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbi_cimpuestos = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    Simplem_comprobantes_item_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_comprobantes_item_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cbi_icodigocab = (Row["cbi_icodigocab"] == DBNull.Value) ? 0 : (int) Row["cbi_icodigocab"];

Simple.cbi_irenglon = (Row["cbi_irenglon"] == DBNull.Value) ? 0 : (int) Row["cbi_irenglon"];

Simple.cbi_iproducto = (Row["cbi_iproducto"] == DBNull.Value) ? 0 : (int) Row["cbi_iproducto"];

Simple.cbi_cdescripcion = (Row["cbi_cdescripcion"] == DBNull.Value) ? "" : (string) Row["cbi_cdescripcion"];

Simple.cbi_ccodigo = (Row["cbi_ccodigo"] == DBNull.Value) ? "" : (string) Row["cbi_ccodigo"];

Simple.cbi_inovedad = (Row["cbi_inovedad"] == DBNull.Value) ? 0 : (int) Row["cbi_inovedad"];

Simple.cbi_inovedadTabla = (Row["cbi_inovedadTabla"] == DBNull.Value) ? 0 : (int) Row["cbi_inovedadTabla"];

Simple.cbi_yimporte = (Row["cbi_yimporte"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cbi_yimporte"];

Simple.cbi_icantidad = (Row["cbi_icantidad"] == DBNull.Value) ? 0 : (int) Row["cbi_icantidad"];

Simple.cbi_ndescuento = (Row["cbi_ndescuento"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cbi_ndescuento"];

Simple.cbi_cimpuestos = (Row["cbi_cimpuestos"] == DBNull.Value) ? "" : (string) Row["cbi_cimpuestos"];


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
    using(var CmdParents = new SqlCommand("m_comprobantes_item_fcByParentObject", conn))
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
    Simplem_comprobantes_item_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_comprobantes_item_fcByParentObject", conn))
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
    Simple = new Simplem_comprobantes_item_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbi_icodigocab = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbi_irenglon = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt16(3);
if (Reader.FieldCount > 4)Simple.cbi_iproducto = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cbi_cdescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbi_ccodigo = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbi_inovedad = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cbi_inovedadTabla = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbi_yimporte = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbi_icantidad = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt16(10);
if (Reader.FieldCount > 11)Simple.cbi_ndescuento = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbi_cimpuestos = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);


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
    using (var CmdDataByName = new SqlCommand("m_comprobantes_item_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_comprobantes_item_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_comprobantes_item_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_comprobantes_item_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_comprobantes_item_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_comprobantes_item_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_comprobantes_item_fcBySimplem_comprobantes_item_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbi_icodigocab", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_irenglon", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@cbi_iproducto", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_cdescripcion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbi_ccodigo", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbi_inovedad", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_inovedadTabla", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbi_yimporte", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbi_icantidad", SqlDbType.SmallInt));cmd.Parameters.Add(new SqlParameter("@cbi_ndescuento", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbi_cimpuestos", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cbi_icodigocab"].Value = this._cbi_icodigocab;

		cmd.Parameters["@cbi_irenglon"].Value = this._cbi_irenglon;

		cmd.Parameters["@cbi_iproducto"].Value = this._cbi_iproducto;

		cmd.Parameters["@cbi_cdescripcion"].Value = (this._cbi_cdescripcion == null) ? (object) DBNull.Value : (object) this._cbi_cdescripcion;

		cmd.Parameters["@cbi_ccodigo"].Value = (this._cbi_ccodigo == null) ? (object) DBNull.Value : (object) this._cbi_ccodigo;

		cmd.Parameters["@cbi_inovedad"].Value = this._cbi_inovedad;

		cmd.Parameters["@cbi_inovedadTabla"].Value = this._cbi_inovedadTabla;

		cmd.Parameters["@cbi_yimporte"].Value = this._cbi_yimporte;

		cmd.Parameters["@cbi_icantidad"].Value = this._cbi_icantidad;

		cmd.Parameters["@cbi_ndescuento"].Value = this._cbi_ndescuento;

		cmd.Parameters["@cbi_cimpuestos"].Value = (this._cbi_cimpuestos == null) ? (object) DBNull.Value : (object) this._cbi_cimpuestos;


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
		 
		public IEnumerable<Simplem_comprobantes_item_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_comprobantes_item_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_comprobantes_item_fc Simple = new Simplem_comprobantes_item_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbi_icodigocab = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbi_irenglon = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt16(3);
if (Reader.FieldCount > 4)Simple.cbi_iproducto = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cbi_cdescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbi_ccodigo = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbi_inovedad = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cbi_inovedadTabla = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbi_yimporte = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbi_icantidad = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt16(10);
if (Reader.FieldCount > 11)Simple.cbi_ndescuento = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbi_cimpuestos = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_comprobantes_item_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_comprobantes_item_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_comprobantes_item_fc Simple = new Simplem_comprobantes_item_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbi_icodigocab = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbi_irenglon = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt16(3);
if (Reader.FieldCount > 4)Simple.cbi_iproducto = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)Simple.cbi_cdescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbi_ccodigo = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.cbi_inovedad = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)Simple.cbi_inovedadTabla = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)Simple.cbi_yimporte = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbi_icantidad = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt16(10);
if (Reader.FieldCount > 11)Simple.cbi_ndescuento = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbi_cimpuestos = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3152, "m_comprobantes_item_fc");
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
    if (Reader.FieldCount > 2)this._cbi_icodigocab = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._cbi_irenglon = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt16(3);
if (Reader.FieldCount > 4)this._cbi_iproducto = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
if (Reader.FieldCount > 5)this._cbi_cdescripcion = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._cbi_ccodigo = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._cbi_inovedad = (Reader.IsDBNull(7)) ? 0 : Reader.GetInt32(7);
if (Reader.FieldCount > 8)this._cbi_inovedadTabla = (Reader.IsDBNull(8)) ? 0 : Reader.GetInt32(8);
if (Reader.FieldCount > 9)this._cbi_yimporte = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)this._cbi_icantidad = (Reader.IsDBNull(10)) ? 0 : Reader.GetInt16(10);
if (Reader.FieldCount > 11)this._cbi_ndescuento = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)this._cbi_cimpuestos = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);

    }
    Reader.Close();
    }
   }
  
    }
  