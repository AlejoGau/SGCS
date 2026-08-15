
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
     ///m_cuenta_corriente_fc data access layer   
     ///</summary>
    public class Dalm_cuenta_corriente_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _cta_iCodigoCbte;
    
      private Decimal _cta_nCuota;
    
      private Decimal _cta_yTotal;
    
      private Decimal _cta_ySaldo;
    
      private DateTime? _cta_dVencimiento;
    
      private DateTime? _cta_dCobro;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cta_iCodigoCbte   
     ///</summary>
      public int cta_iCodigoCbte
      {
      
          get{ return this._cta_iCodigoCbte; }
          set{ this._cta_iCodigoCbte = value; }
        
      }
     ///<summary>
     ///cta_nCuota   
     ///</summary>
      public Decimal cta_nCuota
      {
      
          get{ return this._cta_nCuota; }
          set{ this._cta_nCuota = value; }
        
      }
     ///<summary>
     ///cta_yTotal   
     ///</summary>
      public Decimal cta_yTotal
      {
      
          get{ return this._cta_yTotal; }
          set{ this._cta_yTotal = value; }
        
      }
     ///<summary>
     ///cta_ySaldo   
     ///</summary>
      public Decimal cta_ySaldo
      {
      
          get{ return this._cta_ySaldo; }
          set{ this._cta_ySaldo = value; }
        
      }
     ///<summary>
     ///cta_dVencimiento   
     ///</summary>
      public DateTime? cta_dVencimiento
      {
      
          get{ return this._cta_dVencimiento; }
          set{ this._cta_dVencimiento = value; }
        
      }
     ///<summary>
     ///cta_dCobro   
     ///</summary>
      public DateTime? cta_dCobro
      {
      
          get{ return this._cta_dCobro; }
          set{ this._cta_dCobro = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_cuenta_corriente_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_cuenta_corriente_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_cuenta_corriente_fc(SqlHelper SqlConfig, int UserId, Simplem_cuenta_corriente_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cta_iCodigoCbte = Simple.cta_iCodigoCbte;

      this._cta_nCuota = Simple.cta_nCuota;

      this._cta_yTotal = Simple.cta_yTotal;

      this._cta_ySaldo = Simple.cta_ySaldo;

      this._cta_dVencimiento = Simple.cta_dVencimiento;

      this._cta_dCobro = Simple.cta_dCobro;

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
    using(var cmd = new SqlCommand("m_cuenta_corriente_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cta_iCodigoCbte", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cta_nCuota", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_yTotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_ySaldo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_dVencimiento", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cta_dCobro", SqlDbType.DateTime));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cta_iCodigoCbte"].Value = this._cta_iCodigoCbte;

		cmd.Parameters["@cta_nCuota"].Value = this._cta_nCuota;

		cmd.Parameters["@cta_yTotal"].Value = this._cta_yTotal;

		cmd.Parameters["@cta_ySaldo"].Value = this._cta_ySaldo;

		cmd.Parameters["@cta_dVencimiento"].Value = (this._cta_dVencimiento == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cta_dVencimiento;

		cmd.Parameters["@cta_dCobro"].Value = (this._cta_dCobro == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cta_dCobro;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_cuenta_corriente_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cta_iCodigoCbte", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cta_nCuota", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_yTotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_ySaldo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_dVencimiento", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cta_dCobro", SqlDbType.DateTime));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cta_iCodigoCbte"].Value = this._cta_iCodigoCbte;

		cmd.Parameters["@cta_nCuota"].Value = this._cta_nCuota;

		cmd.Parameters["@cta_yTotal"].Value = this._cta_yTotal;

		cmd.Parameters["@cta_ySaldo"].Value = this._cta_ySaldo;

		cmd.Parameters["@cta_dVencimiento"].Value = (this._cta_dVencimiento == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cta_dVencimiento;

		cmd.Parameters["@cta_dCobro"].Value = (this._cta_dCobro == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cta_dCobro;

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
    throw new RuntimeException("The m_cuenta_corriente_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_cuenta_corriente_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("m_cuenta_corriente_fcSel", conn))
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
    Simplem_cuenta_corriente_fc Simple = new Simplem_cuenta_corriente_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cta_iCodigoCbte = this._cta_iCodigoCbte;

      Simple.cta_nCuota = this._cta_nCuota;

      Simple.cta_yTotal = this._cta_yTotal;

      Simple.cta_ySaldo = this._cta_ySaldo;

      Simple.cta_dVencimiento = this._cta_dVencimiento;

      Simple.cta_dCobro = this._cta_dCobro;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_cuenta_corriente_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cta_iCodigoCbte = Simple.cta_iCodigoCbte;

      this._cta_nCuota = Simple.cta_nCuota;

      this._cta_yTotal = Simple.cta_yTotal;

      this._cta_ySaldo = Simple.cta_ySaldo;

      this._cta_dVencimiento = Simple.cta_dVencimiento;

      this._cta_dCobro = Simple.cta_dCobro;

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
    Callerm_cuenta_corriente_fc Caller = new Callerm_cuenta_corriente_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cta_iCodigoCbte = this._cta_iCodigoCbte;

      Caller.cta_nCuota = this._cta_nCuota;

      Caller.cta_yTotal = this._cta_yTotal;

      Caller.cta_ySaldo = this._cta_ySaldo;

      Caller.cta_dVencimiento = this._cta_dVencimiento;

      Caller.cta_dCobro = this._cta_dCobro;

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
    
      dt.Columns.Add(new DataColumn("cta_iCodigoCbte", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cta_nCuota", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cta_yTotal", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cta_ySaldo", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cta_dVencimiento", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cta_dCobro", typeof (DateTime)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cta_iCodigoCbte"] = this._cta_iCodigoCbte;

      dr["cta_nCuota"] = this._cta_nCuota;

      dr["cta_yTotal"] = this._cta_yTotal;

      dr["cta_ySaldo"] = this._cta_ySaldo;

      dr["cta_dVencimiento"] = this._cta_dVencimiento;

      dr["cta_dCobro"] = this._cta_dCobro;

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
    using(var CmdChilds = new SqlCommand("m_cuenta_corriente_fcByChildObject", conn))
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
    Simplem_cuenta_corriente_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_cuenta_corriente_fcByChildObject", conn))
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
    Simple = new Simplem_cuenta_corriente_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cta_iCodigoCbte = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cta_nCuota = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.cta_yTotal = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cta_ySaldo = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cta_dVencimiento = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.cta_dCobro = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);


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
    Simplem_cuenta_corriente_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_cuenta_corriente_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cta_iCodigoCbte = (Row["cta_iCodigoCbte"] == DBNull.Value) ? 0 : (int) Row["cta_iCodigoCbte"];

Simple.cta_nCuota = (Row["cta_nCuota"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cta_nCuota"];

Simple.cta_yTotal = (Row["cta_yTotal"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cta_yTotal"];

Simple.cta_ySaldo = (Row["cta_ySaldo"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cta_ySaldo"];

Simple.cta_dVencimiento = (Row["cta_dVencimiento"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cta_dVencimiento"];

Simple.cta_dCobro = (Row["cta_dCobro"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cta_dCobro"];


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
    using(var CmdParents = new SqlCommand("m_cuenta_corriente_fcByParentObject", conn))
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
    Simplem_cuenta_corriente_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_cuenta_corriente_fcByParentObject", conn))
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
    Simple = new Simplem_cuenta_corriente_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cta_iCodigoCbte = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cta_nCuota = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.cta_yTotal = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cta_ySaldo = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cta_dVencimiento = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.cta_dCobro = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);


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
    using (var CmdDataByName = new SqlCommand("m_cuenta_corriente_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_cuenta_corriente_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_cuenta_corriente_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_cuenta_corriente_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_cuenta_corriente_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_cuenta_corriente_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_cuenta_corriente_fcBySimplem_cuenta_corriente_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cta_iCodigoCbte", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cta_nCuota", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_yTotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_ySaldo", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cta_dVencimiento", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cta_dCobro", SqlDbType.DateTime));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cta_iCodigoCbte"].Value = this._cta_iCodigoCbte;

		cmd.Parameters["@cta_nCuota"].Value = this._cta_nCuota;

		cmd.Parameters["@cta_yTotal"].Value = this._cta_yTotal;

		cmd.Parameters["@cta_ySaldo"].Value = this._cta_ySaldo;

		cmd.Parameters["@cta_dVencimiento"].Value = (this._cta_dVencimiento == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cta_dVencimiento;

		cmd.Parameters["@cta_dCobro"].Value = (this._cta_dCobro == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cta_dCobro;


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
		 
		public IEnumerable<Simplem_cuenta_corriente_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_cuenta_corriente_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_cuenta_corriente_fc Simple = new Simplem_cuenta_corriente_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cta_iCodigoCbte = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cta_nCuota = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.cta_yTotal = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cta_ySaldo = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cta_dVencimiento = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.cta_dCobro = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_cuenta_corriente_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_cuenta_corriente_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_cuenta_corriente_fc Simple = new Simplem_cuenta_corriente_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cta_iCodigoCbte = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cta_nCuota = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)Simple.cta_yTotal = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)Simple.cta_ySaldo = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)Simple.cta_dVencimiento = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)Simple.cta_dCobro = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3168, "m_cuenta_corriente_fc");
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
    if (Reader.FieldCount > 2)this._cta_iCodigoCbte = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._cta_nCuota = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);
if (Reader.FieldCount > 4)this._cta_yTotal = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
if (Reader.FieldCount > 5)this._cta_ySaldo = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
if (Reader.FieldCount > 6)this._cta_dVencimiento = (Reader.IsDBNull(6)) ? new DateTime(1,1,1) : Reader.GetDateTime(6);
if (Reader.FieldCount > 7)this._cta_dCobro = (Reader.IsDBNull(7)) ? new DateTime(1,1,1) : Reader.GetDateTime(7);

    }
    Reader.Close();
    }
   }
  
    }
  