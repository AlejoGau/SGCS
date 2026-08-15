
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
     ///m_comprobantes_cab_fc data access layer   
     ///</summary>
    public class Dalm_comprobantes_cab_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private int _cbc_icliente;
    
      private DateTime? _cbc_dfecha;
    
      private string _cbc_ctipocbte;
    
      private string _cbc_cprefijocbte;
    
      private int _cbc_inumerocbte;
    
      private Decimal _cbc_ysubtotal;
    
      private Decimal _cbc_yimpuesto1;
    
      private Decimal _cbc_yimpuesto2;
    
      private Decimal _cbc_yimpuesto3;
    
      private Decimal _cbc_ytotal;
    
      private string _cbc_cestado;
    
      private string _cbc_ccae;
    
      private string _cbc_cvtocae;
    
      private int _cbc_iversion;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///cbc_icliente   
     ///</summary>
      public int cbc_icliente
      {
      
          get{ return this._cbc_icliente; }
          set{ this._cbc_icliente = value; }
        
      }
     ///<summary>
     ///cbc_dfecha   
     ///</summary>
      public DateTime? cbc_dfecha
      {
      
          get{ return this._cbc_dfecha; }
          set{ this._cbc_dfecha = value; }
        
      }
     ///<summary>
     ///cbc_ctipocbte   
     ///</summary>
      public string cbc_ctipocbte
      {
      
          get{ return this._cbc_ctipocbte; }
          set{ this._cbc_ctipocbte = value; }
        
      }
     ///<summary>
     ///cbc_cprefijocbte   
     ///</summary>
      public string cbc_cprefijocbte
      {
      
          get{ return this._cbc_cprefijocbte; }
          set{ this._cbc_cprefijocbte = value; }
        
      }
     ///<summary>
     ///cbc_inumerocbte   
     ///</summary>
      public int cbc_inumerocbte
      {
      
          get{ return this._cbc_inumerocbte; }
          set{ this._cbc_inumerocbte = value; }
        
      }
     ///<summary>
     ///cbc_ysubtotal   
     ///</summary>
      public Decimal cbc_ysubtotal
      {
      
          get{ return this._cbc_ysubtotal; }
          set{ this._cbc_ysubtotal = value; }
        
      }
     ///<summary>
     ///cbc_yimpuesto1   
     ///</summary>
      public Decimal cbc_yimpuesto1
      {
      
          get{ return this._cbc_yimpuesto1; }
          set{ this._cbc_yimpuesto1 = value; }
        
      }
     ///<summary>
     ///cbc_yimpuesto2   
     ///</summary>
      public Decimal cbc_yimpuesto2
      {
      
          get{ return this._cbc_yimpuesto2; }
          set{ this._cbc_yimpuesto2 = value; }
        
      }
     ///<summary>
     ///cbc_yimpuesto3   
     ///</summary>
      public Decimal cbc_yimpuesto3
      {
      
          get{ return this._cbc_yimpuesto3; }
          set{ this._cbc_yimpuesto3 = value; }
        
      }
     ///<summary>
     ///cbc_ytotal   
     ///</summary>
      public Decimal cbc_ytotal
      {
      
          get{ return this._cbc_ytotal; }
          set{ this._cbc_ytotal = value; }
        
      }
     ///<summary>
     ///cbc_cestado   
     ///</summary>
      public string cbc_cestado
      {
      
          get{ return this._cbc_cestado; }
          set{ this._cbc_cestado = value; }
        
      }
     ///<summary>
     ///cbc_ccae   
     ///</summary>
      public string cbc_ccae
      {
      
          get{ return this._cbc_ccae; }
          set{ this._cbc_ccae = value; }
        
      }
     ///<summary>
     ///cbc_cvtocae   
     ///</summary>
      public string cbc_cvtocae
      {
      
          get{ return this._cbc_cvtocae; }
          set{ this._cbc_cvtocae = value; }
        
      }
     ///<summary>
     ///cbc_iversion   
     ///</summary>
      public int cbc_iversion
      {
      
          get{ return this._cbc_iversion; }
          set{ this._cbc_iversion = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_comprobantes_cab_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_comprobantes_cab_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalm_comprobantes_cab_fc(SqlHelper SqlConfig, int UserId, Simplem_comprobantes_cab_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cbc_icliente = Simple.cbc_icliente;

      this._cbc_dfecha = Simple.cbc_dfecha;

      this._cbc_ctipocbte = Simple.cbc_ctipocbte;

      this._cbc_cprefijocbte = Simple.cbc_cprefijocbte;

      this._cbc_inumerocbte = Simple.cbc_inumerocbte;

      this._cbc_ysubtotal = Simple.cbc_ysubtotal;

      this._cbc_yimpuesto1 = Simple.cbc_yimpuesto1;

      this._cbc_yimpuesto2 = Simple.cbc_yimpuesto2;

      this._cbc_yimpuesto3 = Simple.cbc_yimpuesto3;

      this._cbc_ytotal = Simple.cbc_ytotal;

      this._cbc_cestado = Simple.cbc_cestado;

      this._cbc_ccae = Simple.cbc_ccae;

      this._cbc_cvtocae = Simple.cbc_cvtocae;

      this._cbc_iversion = Simple.cbc_iversion;

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
    using(var cmd = new SqlCommand("m_comprobantes_cab_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbc_icliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbc_dfecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cbc_ctipocbte", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_cprefijocbte", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_inumerocbte", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbc_ysubtotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto1", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_ytotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_cestado", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_ccae", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbc_cvtocae", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbc_iversion", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cbc_icliente"].Value = this._cbc_icliente;

		cmd.Parameters["@cbc_dfecha"].Value = (this._cbc_dfecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cbc_dfecha;

		cmd.Parameters["@cbc_ctipocbte"].Value = (this._cbc_ctipocbte == null) ? (object) DBNull.Value : (object) this._cbc_ctipocbte;

		cmd.Parameters["@cbc_cprefijocbte"].Value = (this._cbc_cprefijocbte == null) ? (object) DBNull.Value : (object) this._cbc_cprefijocbte;

		cmd.Parameters["@cbc_inumerocbte"].Value = this._cbc_inumerocbte;

		cmd.Parameters["@cbc_ysubtotal"].Value = this._cbc_ysubtotal;

		cmd.Parameters["@cbc_yimpuesto1"].Value = this._cbc_yimpuesto1;

		cmd.Parameters["@cbc_yimpuesto2"].Value = this._cbc_yimpuesto2;

		cmd.Parameters["@cbc_yimpuesto3"].Value = this._cbc_yimpuesto3;

		cmd.Parameters["@cbc_ytotal"].Value = this._cbc_ytotal;

		cmd.Parameters["@cbc_cestado"].Value = (this._cbc_cestado == null) ? (object) DBNull.Value : (object) this._cbc_cestado;

		cmd.Parameters["@cbc_ccae"].Value = (this._cbc_ccae == null) ? (object) DBNull.Value : (object) this._cbc_ccae;

		cmd.Parameters["@cbc_cvtocae"].Value = (this._cbc_cvtocae == null) ? (object) DBNull.Value : (object) this._cbc_cvtocae;

		cmd.Parameters["@cbc_iversion"].Value = this._cbc_iversion;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_comprobantes_cab_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbc_icliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbc_dfecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cbc_ctipocbte", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_cprefijocbte", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_inumerocbte", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbc_ysubtotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto1", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_ytotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_cestado", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_ccae", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbc_cvtocae", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbc_iversion", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@cbc_icliente"].Value = this._cbc_icliente;

		cmd.Parameters["@cbc_dfecha"].Value = (this._cbc_dfecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cbc_dfecha;

		cmd.Parameters["@cbc_ctipocbte"].Value = (this._cbc_ctipocbte == null) ? (object) DBNull.Value : (object) this._cbc_ctipocbte;

		cmd.Parameters["@cbc_cprefijocbte"].Value = (this._cbc_cprefijocbte == null) ? (object) DBNull.Value : (object) this._cbc_cprefijocbte;

		cmd.Parameters["@cbc_inumerocbte"].Value = this._cbc_inumerocbte;

		cmd.Parameters["@cbc_ysubtotal"].Value = this._cbc_ysubtotal;

		cmd.Parameters["@cbc_yimpuesto1"].Value = this._cbc_yimpuesto1;

		cmd.Parameters["@cbc_yimpuesto2"].Value = this._cbc_yimpuesto2;

		cmd.Parameters["@cbc_yimpuesto3"].Value = this._cbc_yimpuesto3;

		cmd.Parameters["@cbc_ytotal"].Value = this._cbc_ytotal;

		cmd.Parameters["@cbc_cestado"].Value = (this._cbc_cestado == null) ? (object) DBNull.Value : (object) this._cbc_cestado;

		cmd.Parameters["@cbc_ccae"].Value = (this._cbc_ccae == null) ? (object) DBNull.Value : (object) this._cbc_ccae;

		cmd.Parameters["@cbc_cvtocae"].Value = (this._cbc_cvtocae == null) ? (object) DBNull.Value : (object) this._cbc_cvtocae;

		cmd.Parameters["@cbc_iversion"].Value = this._cbc_iversion;

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
    throw new RuntimeException("The m_comprobantes_cab_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("m_comprobantes_cab_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("m_comprobantes_cab_fcSel", conn))
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
    Simplem_comprobantes_cab_fc Simple = new Simplem_comprobantes_cab_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.cbc_icliente = this._cbc_icliente;

      Simple.cbc_dfecha = this._cbc_dfecha;

      Simple.cbc_ctipocbte = this._cbc_ctipocbte;

      Simple.cbc_cprefijocbte = this._cbc_cprefijocbte;

      Simple.cbc_inumerocbte = this._cbc_inumerocbte;

      Simple.cbc_ysubtotal = this._cbc_ysubtotal;

      Simple.cbc_yimpuesto1 = this._cbc_yimpuesto1;

      Simple.cbc_yimpuesto2 = this._cbc_yimpuesto2;

      Simple.cbc_yimpuesto3 = this._cbc_yimpuesto3;

      Simple.cbc_ytotal = this._cbc_ytotal;

      Simple.cbc_cestado = this._cbc_cestado;

      Simple.cbc_ccae = this._cbc_ccae;

      Simple.cbc_cvtocae = this._cbc_cvtocae;

      Simple.cbc_iversion = this._cbc_iversion;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplem_comprobantes_cab_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._cbc_icliente = Simple.cbc_icliente;

      this._cbc_dfecha = Simple.cbc_dfecha;

      this._cbc_ctipocbte = Simple.cbc_ctipocbte;

      this._cbc_cprefijocbte = Simple.cbc_cprefijocbte;

      this._cbc_inumerocbte = Simple.cbc_inumerocbte;

      this._cbc_ysubtotal = Simple.cbc_ysubtotal;

      this._cbc_yimpuesto1 = Simple.cbc_yimpuesto1;

      this._cbc_yimpuesto2 = Simple.cbc_yimpuesto2;

      this._cbc_yimpuesto3 = Simple.cbc_yimpuesto3;

      this._cbc_ytotal = Simple.cbc_ytotal;

      this._cbc_cestado = Simple.cbc_cestado;

      this._cbc_ccae = Simple.cbc_ccae;

      this._cbc_cvtocae = Simple.cbc_cvtocae;

      this._cbc_iversion = Simple.cbc_iversion;

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
    Callerm_comprobantes_cab_fc Caller = new Callerm_comprobantes_cab_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.cbc_icliente = this._cbc_icliente;

      Caller.cbc_dfecha = this._cbc_dfecha;

      Caller.cbc_ctipocbte = this._cbc_ctipocbte;

      Caller.cbc_cprefijocbte = this._cbc_cprefijocbte;

      Caller.cbc_inumerocbte = this._cbc_inumerocbte;

      Caller.cbc_ysubtotal = this._cbc_ysubtotal;

      Caller.cbc_yimpuesto1 = this._cbc_yimpuesto1;

      Caller.cbc_yimpuesto2 = this._cbc_yimpuesto2;

      Caller.cbc_yimpuesto3 = this._cbc_yimpuesto3;

      Caller.cbc_ytotal = this._cbc_ytotal;

      Caller.cbc_cestado = this._cbc_cestado;

      Caller.cbc_ccae = this._cbc_ccae;

      Caller.cbc_cvtocae = this._cbc_cvtocae;

      Caller.cbc_iversion = this._cbc_iversion;

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
    
      dt.Columns.Add(new DataColumn("cbc_icliente", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbc_dfecha", typeof (DateTime)));
    
      dt.Columns.Add(new DataColumn("cbc_ctipocbte", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbc_cprefijocbte", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbc_inumerocbte", typeof (int)));
    
      dt.Columns.Add(new DataColumn("cbc_ysubtotal", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cbc_yimpuesto1", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cbc_yimpuesto2", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cbc_yimpuesto3", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cbc_ytotal", typeof (Decimal)));
    
      dt.Columns.Add(new DataColumn("cbc_cestado", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbc_ccae", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbc_cvtocae", typeof (string)));
    
      dt.Columns.Add(new DataColumn("cbc_iversion", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["cbc_icliente"] = this._cbc_icliente;

      dr["cbc_dfecha"] = (object)this._cbc_dfecha  ?? DBNull.Value;

      dr["cbc_ctipocbte"] = this._cbc_ctipocbte;

      dr["cbc_cprefijocbte"] = this._cbc_cprefijocbte;

      dr["cbc_inumerocbte"] = this._cbc_inumerocbte;

      dr["cbc_ysubtotal"] = this._cbc_ysubtotal;

      dr["cbc_yimpuesto1"] = this._cbc_yimpuesto1;

      dr["cbc_yimpuesto2"] = this._cbc_yimpuesto2;

      dr["cbc_yimpuesto3"] = this._cbc_yimpuesto3;

      dr["cbc_ytotal"] = this._cbc_ytotal;

      dr["cbc_cestado"] = this._cbc_cestado;

      dr["cbc_ccae"] = this._cbc_ccae;

      dr["cbc_cvtocae"] = this._cbc_cvtocae;

      dr["cbc_iversion"] = this._cbc_iversion;

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
    using(var CmdChilds = new SqlCommand("m_comprobantes_cab_fcByChildObject", conn))
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
    Simplem_comprobantes_cab_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("m_comprobantes_cab_fcByChildObject", conn))
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
    Simple = new Simplem_comprobantes_cab_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbc_icliente = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbc_dfecha = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.cbc_ctipocbte = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbc_cprefijocbte = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbc_inumerocbte = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cbc_ysubtotal = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cbc_yimpuesto1 = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.cbc_yimpuesto2 = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbc_yimpuesto3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.cbc_ytotal = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbc_cestado = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cbc_ccae = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cbc_cvtocae = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cbc_iversion = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);


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
    Simplem_comprobantes_cab_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplem_comprobantes_cab_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.cbc_icliente = (Row["cbc_icliente"] == DBNull.Value) ? 0 : (int) Row["cbc_icliente"];

Simple.cbc_dfecha = (Row["cbc_dfecha"] == DBNull.Value) ? new DateTime(1,1,1) : (DateTime?) Row["cbc_dfecha"];

Simple.cbc_ctipocbte = (Row["cbc_ctipocbte"] == DBNull.Value) ? "" : (string) Row["cbc_ctipocbte"];

Simple.cbc_cprefijocbte = (Row["cbc_cprefijocbte"] == DBNull.Value) ? "" : (string) Row["cbc_cprefijocbte"];

Simple.cbc_inumerocbte = (Row["cbc_inumerocbte"] == DBNull.Value) ? 0 : (int) Row["cbc_inumerocbte"];

Simple.cbc_ysubtotal = (Row["cbc_ysubtotal"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cbc_ysubtotal"];

Simple.cbc_yimpuesto1 = (Row["cbc_yimpuesto1"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cbc_yimpuesto1"];

Simple.cbc_yimpuesto2 = (Row["cbc_yimpuesto2"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cbc_yimpuesto2"];

Simple.cbc_yimpuesto3 = (Row["cbc_yimpuesto3"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cbc_yimpuesto3"];

Simple.cbc_ytotal = (Row["cbc_ytotal"] == DBNull.Value) ? new Decimal(0) : (Decimal) Row["cbc_ytotal"];

Simple.cbc_cestado = (Row["cbc_cestado"] == DBNull.Value) ? "" : (string) Row["cbc_cestado"];

Simple.cbc_ccae = (Row["cbc_ccae"] == DBNull.Value) ? "" : (string) Row["cbc_ccae"];

Simple.cbc_cvtocae = (Row["cbc_cvtocae"] == DBNull.Value) ? "" : (string) Row["cbc_cvtocae"];

Simple.cbc_iversion = (Row["cbc_iversion"] == DBNull.Value) ? 0 : (int) Row["cbc_iversion"];


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
    using(var CmdParents = new SqlCommand("m_comprobantes_cab_fcByParentObject", conn))
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
    Simplem_comprobantes_cab_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("m_comprobantes_cab_fcByParentObject", conn))
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
    Simple = new Simplem_comprobantes_cab_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbc_icliente = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbc_dfecha = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.cbc_ctipocbte = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbc_cprefijocbte = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbc_inumerocbte = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cbc_ysubtotal = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cbc_yimpuesto1 = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.cbc_yimpuesto2 = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbc_yimpuesto3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.cbc_ytotal = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbc_cestado = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cbc_ccae = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cbc_cvtocae = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cbc_iversion = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);


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
    using (var CmdDataByName = new SqlCommand("m_comprobantes_cab_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("m_comprobantes_cab_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("m_comprobantes_cab_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("m_comprobantes_cab_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("m_comprobantes_cab_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplem_comprobantes_cab_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("m_comprobantes_cab_fcBySimplem_comprobantes_cab_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@cbc_icliente", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbc_dfecha", SqlDbType.DateTime));cmd.Parameters.Add(new SqlParameter("@cbc_ctipocbte", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_cprefijocbte", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_inumerocbte", SqlDbType.Int));cmd.Parameters.Add(new SqlParameter("@cbc_ysubtotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto1", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto2", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_yimpuesto3", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_ytotal", SqlDbType.Decimal));cmd.Parameters.Add(new SqlParameter("@cbc_cestado", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@cbc_ccae", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbc_cvtocae", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@cbc_iversion", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@cbc_icliente"].Value = this._cbc_icliente;

		cmd.Parameters["@cbc_dfecha"].Value = (this._cbc_dfecha == new DateTime(1,1,1)) ? (object) DBNull.Value : (object) this._cbc_dfecha;

		cmd.Parameters["@cbc_ctipocbte"].Value = (this._cbc_ctipocbte == null) ? (object) DBNull.Value : (object) this._cbc_ctipocbte;

		cmd.Parameters["@cbc_cprefijocbte"].Value = (this._cbc_cprefijocbte == null) ? (object) DBNull.Value : (object) this._cbc_cprefijocbte;

		cmd.Parameters["@cbc_inumerocbte"].Value = this._cbc_inumerocbte;

		cmd.Parameters["@cbc_ysubtotal"].Value = this._cbc_ysubtotal;

		cmd.Parameters["@cbc_yimpuesto1"].Value = this._cbc_yimpuesto1;

		cmd.Parameters["@cbc_yimpuesto2"].Value = this._cbc_yimpuesto2;

		cmd.Parameters["@cbc_yimpuesto3"].Value = this._cbc_yimpuesto3;

		cmd.Parameters["@cbc_ytotal"].Value = this._cbc_ytotal;

		cmd.Parameters["@cbc_cestado"].Value = (this._cbc_cestado == null) ? (object) DBNull.Value : (object) this._cbc_cestado;

		cmd.Parameters["@cbc_ccae"].Value = (this._cbc_ccae == null) ? (object) DBNull.Value : (object) this._cbc_ccae;

		cmd.Parameters["@cbc_cvtocae"].Value = (this._cbc_cvtocae == null) ? (object) DBNull.Value : (object) this._cbc_cvtocae;

		cmd.Parameters["@cbc_iversion"].Value = this._cbc_iversion;


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
		 
		public IEnumerable<Simplem_comprobantes_cab_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_comprobantes_cab_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_comprobantes_cab_fc Simple = new Simplem_comprobantes_cab_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbc_icliente = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbc_dfecha = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.cbc_ctipocbte = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbc_cprefijocbte = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbc_inumerocbte = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cbc_ysubtotal = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cbc_yimpuesto1 = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.cbc_yimpuesto2 = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbc_yimpuesto3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.cbc_ytotal = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbc_cestado = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cbc_ccae = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cbc_cvtocae = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cbc_iversion = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplem_comprobantes_cab_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("m_comprobantes_cab_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplem_comprobantes_cab_fc Simple = new Simplem_comprobantes_cab_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.cbc_icliente = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)Simple.cbc_dfecha = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)Simple.cbc_ctipocbte = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.cbc_cprefijocbte = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.cbc_inumerocbte = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)Simple.cbc_ysubtotal = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)Simple.cbc_yimpuesto1 = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)Simple.cbc_yimpuesto2 = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)Simple.cbc_yimpuesto3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)Simple.cbc_ytotal = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)Simple.cbc_cestado = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.cbc_ccae = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.cbc_cvtocae = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.cbc_iversion = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3151, "m_comprobantes_cab_fc");
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
    if (Reader.FieldCount > 2)this._cbc_icliente = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
if (Reader.FieldCount > 3)this._cbc_dfecha = (Reader.IsDBNull(3)) ? new DateTime(1,1,1) : Reader.GetDateTime(3);
if (Reader.FieldCount > 4)this._cbc_ctipocbte = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._cbc_cprefijocbte = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._cbc_inumerocbte = (Reader.IsDBNull(6)) ? 0 : Reader.GetInt32(6);
if (Reader.FieldCount > 7)this._cbc_ysubtotal = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);
if (Reader.FieldCount > 8)this._cbc_yimpuesto1 = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);
if (Reader.FieldCount > 9)this._cbc_yimpuesto2 = (Reader.IsDBNull(9)) ? new Decimal(0) : Reader.GetDecimal(9);
if (Reader.FieldCount > 10)this._cbc_yimpuesto3 = (Reader.IsDBNull(10)) ? new Decimal(0) : Reader.GetDecimal(10);
if (Reader.FieldCount > 11)this._cbc_ytotal = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);
if (Reader.FieldCount > 12)this._cbc_cestado = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._cbc_ccae = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._cbc_cvtocae = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._cbc_iversion = (Reader.IsDBNull(15)) ? 0 : Reader.GetInt32(15);

    }
    Reader.Close();
    }
   }
  
    }
  