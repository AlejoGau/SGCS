
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
     ///t_organizacion_fc data access layer   
     ///</summary>
    public class Dalt_organizacion_fc : TransactionObject
    { 

    string _ConnectionString = null;
    private bool _AutoCommit = false;
    
      private string _org_cnombre;
    
      private string _org_ccallefiscal;
    
      private string _org_clocalidadfiscal;
    
      private string _org_cprovinciafiscal;
    
      private string _org_ccodigopostalfiscal;
    
      private string _org_ctelefono;
    
      private string _org_cmail;
    
      private string _org_ccategoriaimpositiva;
    
      private string _org_cidentificacion;
    
      private string _org_cinicioactividades;
    
      private string _org_cempresacb;
    
      private string _org_cheadercbte;
    
      private string _org_csymbol;
    
      private string _org_cmetadata;
    
      private string _org_factelect;
    
      private int _org_organizacionId;
     ///<summary>
     ///Sets transaction Autocommit value   
     ///</summary>
    public override bool AutoCommit
    {
    get{ return this._AutoCommit; }
    set{ this._AutoCommit = value; }
    }
     ///<summary>
     ///org_cnombre   
     ///</summary>
      public string org_cnombre
      {
      
          get{ return this._org_cnombre; }
          set{ this._org_cnombre = value; }
        
      }
     ///<summary>
     ///org_ccallefiscal   
     ///</summary>
      public string org_ccallefiscal
      {
      
          get{ return this._org_ccallefiscal; }
          set{ this._org_ccallefiscal = value; }
        
      }
     ///<summary>
     ///org_clocalidadfiscal   
     ///</summary>
      public string org_clocalidadfiscal
      {
      
          get{ return this._org_clocalidadfiscal; }
          set{ this._org_clocalidadfiscal = value; }
        
      }
     ///<summary>
     ///org_cprovinciafiscal   
     ///</summary>
      public string org_cprovinciafiscal
      {
      
          get{ return this._org_cprovinciafiscal; }
          set{ this._org_cprovinciafiscal = value; }
        
      }
     ///<summary>
     ///org_ccodigopostalfiscal   
     ///</summary>
      public string org_ccodigopostalfiscal
      {
      
          get{ return this._org_ccodigopostalfiscal; }
          set{ this._org_ccodigopostalfiscal = value; }
        
      }
     ///<summary>
     ///org_ctelefono   
     ///</summary>
      public string org_ctelefono
      {
      
          get{ return this._org_ctelefono; }
          set{ this._org_ctelefono = value; }
        
      }
     ///<summary>
     ///org_cmail   
     ///</summary>
      public string org_cmail
      {
      
          get{ return this._org_cmail; }
          set{ this._org_cmail = value; }
        
      }
     ///<summary>
     ///org_ccategoriaimpositiva   
     ///</summary>
      public string org_ccategoriaimpositiva
      {
      
          get{ return this._org_ccategoriaimpositiva; }
          set{ this._org_ccategoriaimpositiva = value; }
        
      }
     ///<summary>
     ///org_cidentificacion   
     ///</summary>
      public string org_cidentificacion
      {
      
          get{ return this._org_cidentificacion; }
          set{ this._org_cidentificacion = value; }
        
      }
     ///<summary>
     ///org_cinicioactividades   
     ///</summary>
      public string org_cinicioactividades
      {
      
          get{ return this._org_cinicioactividades; }
          set{ this._org_cinicioactividades = value; }
        
      }
     ///<summary>
     ///org_cempresacb   
     ///</summary>
      public string org_cempresacb
      {
      
          get{ return this._org_cempresacb; }
          set{ this._org_cempresacb = value; }
        
      }
     ///<summary>
     ///org_cheadercbte   
     ///</summary>
      public string org_cheadercbte
      {
      
          get{ return this._org_cheadercbte; }
          set{ this._org_cheadercbte = value; }
        
      }
     ///<summary>
     ///org_csymbol   
     ///</summary>
      public string org_csymbol
      {
      
          get{ return this._org_csymbol; }
          set{ this._org_csymbol = value; }
        
      }
     ///<summary>
     ///org_cmetadata   
     ///</summary>
      public string org_cmetadata
      {
      
          get{ return this._org_cmetadata; }
          set{ this._org_cmetadata = value; }
        
      }
     ///<summary>
     ///org_factelect   
     ///</summary>
      public string org_factelect
      {
      
          get{ return this._org_factelect; }
          set{ this._org_factelect = value; }
        
      }
     ///<summary>
     ///org_organizacionId   
     ///</summary>
      public int org_organizacionId
      {
      
          get{ return this._org_organizacionId; }
          set{ this._org_organizacionId = value; }
        
      }
     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_organizacion_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_organizacion_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    Load(Id);
    }

     ///<summary>
     ///Constructor   
     ///</summary>
    public Dalt_organizacion_fc(SqlHelper SqlConfig, int UserId, Simplet_organizacion_fc Simple) : base(SqlConfig, UserId)
    {
    InitClass();
    SetConfig(SqlConfig);
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._org_cnombre = Simple.org_cnombre;

      this._org_ccallefiscal = Simple.org_ccallefiscal;

      this._org_clocalidadfiscal = Simple.org_clocalidadfiscal;

      this._org_cprovinciafiscal = Simple.org_cprovinciafiscal;

      this._org_ccodigopostalfiscal = Simple.org_ccodigopostalfiscal;

      this._org_ctelefono = Simple.org_ctelefono;

      this._org_cmail = Simple.org_cmail;

      this._org_ccategoriaimpositiva = Simple.org_ccategoriaimpositiva;

      this._org_cidentificacion = Simple.org_cidentificacion;

      this._org_cinicioactividades = Simple.org_cinicioactividades;

      this._org_cempresacb = Simple.org_cempresacb;

      this._org_cheadercbte = Simple.org_cheadercbte;

      this._org_csymbol = Simple.org_csymbol;

      this._org_cmetadata = Simple.org_cmetadata;

      this._org_factelect = Simple.org_factelect;

      this._org_organizacionId = Simple.org_organizacionId;

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
    using(var cmd = new SqlCommand("t_organizacion_fcIns", conn))
    {
    // Insert
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@org_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ccallefiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_clocalidadfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cprovinciafiscal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@org_ccodigopostalfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ccategoriaimpositiva", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@org_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cinicioactividades", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cempresacb", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cheadercbte", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@org_csymbol", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cmetadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_factelect", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_organizacionId", SqlDbType.Int));

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@org_cnombre"].Value = (this._org_cnombre == null) ? (object) DBNull.Value : (object) this._org_cnombre;

		cmd.Parameters["@org_ccallefiscal"].Value = (this._org_ccallefiscal == null) ? (object) DBNull.Value : (object) this._org_ccallefiscal;

		cmd.Parameters["@org_clocalidadfiscal"].Value = (this._org_clocalidadfiscal == null) ? (object) DBNull.Value : (object) this._org_clocalidadfiscal;

		cmd.Parameters["@org_cprovinciafiscal"].Value = (this._org_cprovinciafiscal == null) ? (object) DBNull.Value : (object) this._org_cprovinciafiscal;

		cmd.Parameters["@org_ccodigopostalfiscal"].Value = (this._org_ccodigopostalfiscal == null) ? (object) DBNull.Value : (object) this._org_ccodigopostalfiscal;

		cmd.Parameters["@org_ctelefono"].Value = (this._org_ctelefono == null) ? (object) DBNull.Value : (object) this._org_ctelefono;

		cmd.Parameters["@org_cmail"].Value = (this._org_cmail == null) ? (object) DBNull.Value : (object) this._org_cmail;

		cmd.Parameters["@org_ccategoriaimpositiva"].Value = (this._org_ccategoriaimpositiva == null) ? (object) DBNull.Value : (object) this._org_ccategoriaimpositiva;

		cmd.Parameters["@org_cidentificacion"].Value = (this._org_cidentificacion == null) ? (object) DBNull.Value : (object) this._org_cidentificacion;

		cmd.Parameters["@org_cinicioactividades"].Value = (this._org_cinicioactividades == null) ? (object) DBNull.Value : (object) this._org_cinicioactividades;

		cmd.Parameters["@org_cempresacb"].Value = (this._org_cempresacb == null) ? (object) DBNull.Value : (object) this._org_cempresacb;

		cmd.Parameters["@org_cheadercbte"].Value = (this._org_cheadercbte == null) ? (object) DBNull.Value : (object) this._org_cheadercbte;

		cmd.Parameters["@org_csymbol"].Value = (this._org_csymbol == null) ? (object) DBNull.Value : (object) this._org_csymbol;

		cmd.Parameters["@org_cmetadata"].Value = (this._org_cmetadata == null) ? (object) DBNull.Value : (object) this._org_cmetadata;

		cmd.Parameters["@org_factelect"].Value = (this._org_factelect == null) ? (object) DBNull.Value : (object) this._org_factelect;

		cmd.Parameters["@org_organizacionId"].Value = this._org_organizacionId;

    conn.Open();
    FillObject(cmd.ExecuteReader());
    }
    }
    else
    {
    //update

    // Update
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_organizacion_fcUpd", conn))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@org_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ccallefiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_clocalidadfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cprovinciafiscal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@org_ccodigopostalfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ccategoriaimpositiva", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@org_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cinicioactividades", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cempresacb", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cheadercbte", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@org_csymbol", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cmetadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_factelect", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_organizacionId", SqlDbType.Int));

    cmd.Parameters["@Id"].Value = base.Id;

    cmd.Parameters["@Name"].Value = base.Name;

		cmd.Parameters["@org_cnombre"].Value = (this._org_cnombre == null) ? (object) DBNull.Value : (object) this._org_cnombre;

		cmd.Parameters["@org_ccallefiscal"].Value = (this._org_ccallefiscal == null) ? (object) DBNull.Value : (object) this._org_ccallefiscal;

		cmd.Parameters["@org_clocalidadfiscal"].Value = (this._org_clocalidadfiscal == null) ? (object) DBNull.Value : (object) this._org_clocalidadfiscal;

		cmd.Parameters["@org_cprovinciafiscal"].Value = (this._org_cprovinciafiscal == null) ? (object) DBNull.Value : (object) this._org_cprovinciafiscal;

		cmd.Parameters["@org_ccodigopostalfiscal"].Value = (this._org_ccodigopostalfiscal == null) ? (object) DBNull.Value : (object) this._org_ccodigopostalfiscal;

		cmd.Parameters["@org_ctelefono"].Value = (this._org_ctelefono == null) ? (object) DBNull.Value : (object) this._org_ctelefono;

		cmd.Parameters["@org_cmail"].Value = (this._org_cmail == null) ? (object) DBNull.Value : (object) this._org_cmail;

		cmd.Parameters["@org_ccategoriaimpositiva"].Value = (this._org_ccategoriaimpositiva == null) ? (object) DBNull.Value : (object) this._org_ccategoriaimpositiva;

		cmd.Parameters["@org_cidentificacion"].Value = (this._org_cidentificacion == null) ? (object) DBNull.Value : (object) this._org_cidentificacion;

		cmd.Parameters["@org_cinicioactividades"].Value = (this._org_cinicioactividades == null) ? (object) DBNull.Value : (object) this._org_cinicioactividades;

		cmd.Parameters["@org_cempresacb"].Value = (this._org_cempresacb == null) ? (object) DBNull.Value : (object) this._org_cempresacb;

		cmd.Parameters["@org_cheadercbte"].Value = (this._org_cheadercbte == null) ? (object) DBNull.Value : (object) this._org_cheadercbte;

		cmd.Parameters["@org_csymbol"].Value = (this._org_csymbol == null) ? (object) DBNull.Value : (object) this._org_csymbol;

		cmd.Parameters["@org_cmetadata"].Value = (this._org_cmetadata == null) ? (object) DBNull.Value : (object) this._org_cmetadata;

		cmd.Parameters["@org_factelect"].Value = (this._org_factelect == null) ? (object) DBNull.Value : (object) this._org_factelect;

		cmd.Parameters["@org_organizacionId"].Value = this._org_organizacionId;

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
    throw new RuntimeException("The t_organizacion_fc is null");
    }
    else
    {
    //delete
    try
    {

    BeginTran();

    // Delete
    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdDel = new SqlCommand("t_organizacion_fcDel", conn))
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
    using(var CmdSel = new SqlCommand("t_organizacion_fcSel", conn))
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
    Simplet_organizacion_fc Simple = new Simplet_organizacion_fc();
    Simple.Id = base.Id;
    Simple.Name = base.Name;
    
      Simple.org_cnombre = this._org_cnombre;

      Simple.org_ccallefiscal = this._org_ccallefiscal;

      Simple.org_clocalidadfiscal = this._org_clocalidadfiscal;

      Simple.org_cprovinciafiscal = this._org_cprovinciafiscal;

      Simple.org_ccodigopostalfiscal = this._org_ccodigopostalfiscal;

      Simple.org_ctelefono = this._org_ctelefono;

      Simple.org_cmail = this._org_cmail;

      Simple.org_ccategoriaimpositiva = this._org_ccategoriaimpositiva;

      Simple.org_cidentificacion = this._org_cidentificacion;

      Simple.org_cinicioactividades = this._org_cinicioactividades;

      Simple.org_cempresacb = this._org_cempresacb;

      Simple.org_cheadercbte = this._org_cheadercbte;

      Simple.org_csymbol = this._org_csymbol;

      Simple.org_cmetadata = this._org_cmetadata;

      Simple.org_factelect = this._org_factelect;

      Simple.org_organizacionId = this._org_organizacionId;

    if(this.CallerObject != null)
    Simple.CallerObject = this.CallerObject;
    return (SimpleBaseObject) Simple;
    }
   ///<summary>
     ///Sets SimpleBaseObject   
     ///</summary>
    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
    var Simple = (Simplet_organizacion_fc)BaseSimple;
    base.Id = Simple.Id;
    base.Name = Simple.Name;
    
      this._org_cnombre = Simple.org_cnombre;

      this._org_ccallefiscal = Simple.org_ccallefiscal;

      this._org_clocalidadfiscal = Simple.org_clocalidadfiscal;

      this._org_cprovinciafiscal = Simple.org_cprovinciafiscal;

      this._org_ccodigopostalfiscal = Simple.org_ccodigopostalfiscal;

      this._org_ctelefono = Simple.org_ctelefono;

      this._org_cmail = Simple.org_cmail;

      this._org_ccategoriaimpositiva = Simple.org_ccategoriaimpositiva;

      this._org_cidentificacion = Simple.org_cidentificacion;

      this._org_cinicioactividades = Simple.org_cinicioactividades;

      this._org_cempresacb = Simple.org_cempresacb;

      this._org_cheadercbte = Simple.org_cheadercbte;

      this._org_csymbol = Simple.org_csymbol;

      this._org_cmetadata = Simple.org_cmetadata;

      this._org_factelect = Simple.org_factelect;

      this._org_organizacionId = Simple.org_organizacionId;

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
    Callert_organizacion_fc Caller = new Callert_organizacion_fc();
    Caller.Id = base.Id;
    Caller.Name = base.Name;
    
      Caller.org_cnombre = this._org_cnombre;

      Caller.org_ccallefiscal = this._org_ccallefiscal;

      Caller.org_clocalidadfiscal = this._org_clocalidadfiscal;

      Caller.org_cprovinciafiscal = this._org_cprovinciafiscal;

      Caller.org_ccodigopostalfiscal = this._org_ccodigopostalfiscal;

      Caller.org_ctelefono = this._org_ctelefono;

      Caller.org_cmail = this._org_cmail;

      Caller.org_ccategoriaimpositiva = this._org_ccategoriaimpositiva;

      Caller.org_cidentificacion = this._org_cidentificacion;

      Caller.org_cinicioactividades = this._org_cinicioactividades;

      Caller.org_cempresacb = this._org_cempresacb;

      Caller.org_cheadercbte = this._org_cheadercbte;

      Caller.org_csymbol = this._org_csymbol;

      Caller.org_cmetadata = this._org_cmetadata;

      Caller.org_factelect = this._org_factelect;

      Caller.org_organizacionId = this._org_organizacionId;

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
    
      dt.Columns.Add(new DataColumn("org_cnombre", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_ccallefiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_clocalidadfiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_cprovinciafiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_ccodigopostalfiscal", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_ctelefono", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_cmail", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_ccategoriaimpositiva", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_cidentificacion", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_cinicioactividades", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_cempresacb", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_cheadercbte", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_csymbol", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_cmetadata", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_factelect", typeof (string)));
    
      dt.Columns.Add(new DataColumn("org_organizacionId", typeof (int)));
    
    //create Row
    dr = dt.NewRow();

    //set Row
    dr["Id"] = base.Id;

    dr["Name"] = base.Name;

      dr["org_cnombre"] = this._org_cnombre;

      dr["org_ccallefiscal"] = this._org_ccallefiscal;

      dr["org_clocalidadfiscal"] = this._org_clocalidadfiscal;

      dr["org_cprovinciafiscal"] = this._org_cprovinciafiscal;

      dr["org_ccodigopostalfiscal"] = this._org_ccodigopostalfiscal;

      dr["org_ctelefono"] = this._org_ctelefono;

      dr["org_cmail"] = this._org_cmail;

      dr["org_ccategoriaimpositiva"] = this._org_ccategoriaimpositiva;

      dr["org_cidentificacion"] = this._org_cidentificacion;

      dr["org_cinicioactividades"] = this._org_cinicioactividades;

      dr["org_cempresacb"] = this._org_cempresacb;

      dr["org_cheadercbte"] = this._org_cheadercbte;

      dr["org_csymbol"] = this._org_csymbol;

      dr["org_cmetadata"] = this._org_cmetadata;

      dr["org_factelect"] = this._org_factelect;

      dr["org_organizacionId"] = this._org_organizacionId;

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
    using(var CmdChilds = new SqlCommand("t_organizacion_fcByChildObject", conn))
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
    Simplet_organizacion_fc Simple;

    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdChilds = new SqlCommand("t_organizacion_fcByChildObject", conn))
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
    Simple = new Simplet_organizacion_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.org_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.org_ccallefiscal = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.org_clocalidadfiscal = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.org_cprovinciafiscal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.org_ccodigopostalfiscal = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.org_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.org_cmail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.org_ccategoriaimpositiva = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.org_cidentificacion = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.org_cinicioactividades = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.org_cempresacb = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.org_cheadercbte = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.org_csymbol = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.org_cmetadata = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.org_factelect = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.org_organizacionId = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);


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
    Simplet_organizacion_fc Simple;
    SimpleBaseObjectCollection Collection = new SimpleBaseObjectCollection();
    DataTable Data = GetDataChildsByObject(Object);

    foreach(DataRow Row in Data.Rows)
    {
    Simple = new Simplet_organizacion_fc();
    Simple.Id = (int) Row["Id"];
    Simple.Name = (string) Row["Name"];
    
Simple.org_cnombre = (Row["org_cnombre"] == DBNull.Value) ? "" : (string) Row["org_cnombre"];

Simple.org_ccallefiscal = (Row["org_ccallefiscal"] == DBNull.Value) ? "" : (string) Row["org_ccallefiscal"];

Simple.org_clocalidadfiscal = (Row["org_clocalidadfiscal"] == DBNull.Value) ? "" : (string) Row["org_clocalidadfiscal"];

Simple.org_cprovinciafiscal = (Row["org_cprovinciafiscal"] == DBNull.Value) ? "" : (string) Row["org_cprovinciafiscal"];

Simple.org_ccodigopostalfiscal = (Row["org_ccodigopostalfiscal"] == DBNull.Value) ? "" : (string) Row["org_ccodigopostalfiscal"];

Simple.org_ctelefono = (Row["org_ctelefono"] == DBNull.Value) ? "" : (string) Row["org_ctelefono"];

Simple.org_cmail = (Row["org_cmail"] == DBNull.Value) ? "" : (string) Row["org_cmail"];

Simple.org_ccategoriaimpositiva = (Row["org_ccategoriaimpositiva"] == DBNull.Value) ? "" : (string) Row["org_ccategoriaimpositiva"];

Simple.org_cidentificacion = (Row["org_cidentificacion"] == DBNull.Value) ? "" : (string) Row["org_cidentificacion"];

Simple.org_cinicioactividades = (Row["org_cinicioactividades"] == DBNull.Value) ? "" : (string) Row["org_cinicioactividades"];

Simple.org_cempresacb = (Row["org_cempresacb"] == DBNull.Value) ? "" : (string) Row["org_cempresacb"];

Simple.org_cheadercbte = (Row["org_cheadercbte"] == DBNull.Value) ? "" : (string) Row["org_cheadercbte"];

Simple.org_csymbol = (Row["org_csymbol"] == DBNull.Value) ? "" : (string) Row["org_csymbol"];

Simple.org_cmetadata = (Row["org_cmetadata"] == DBNull.Value) ? "" : (string) Row["org_cmetadata"];

Simple.org_factelect = (Row["org_factelect"] == DBNull.Value) ? "" : (string) Row["org_factelect"];

Simple.org_organizacionId = (Row["org_organizacionId"] == DBNull.Value) ? 0 : (int) Row["org_organizacionId"];


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
    using(var CmdParents = new SqlCommand("t_organizacion_fcByParentObject", conn))
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
    Simplet_organizacion_fc Simple;


    using(var conn = new SqlConnection(_ConnectionString))
    using(var CmdParents = new SqlCommand("t_organizacion_fcByParentObject", conn))
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
    Simple = new Simplet_organizacion_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.org_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.org_ccallefiscal = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.org_clocalidadfiscal = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.org_cprovinciafiscal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.org_ccodigopostalfiscal = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.org_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.org_cmail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.org_ccategoriaimpositiva = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.org_cidentificacion = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.org_cinicioactividades = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.org_cempresacb = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.org_cheadercbte = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.org_csymbol = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.org_cmetadata = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.org_factelect = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.org_organizacionId = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);


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
    using (var CmdDataByName = new SqlCommand("t_organizacion_fcByName", conn))
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
    using(var CmdDataByNameWithChild = new SqlCommand("t_organizacion_fcByNameWithChild", conn))
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
    using(var CmdDataByNameWithParent = new SqlCommand("t_organizacion_fcByNameWithParent", conn))
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
    using (var cmd = new SqlCommand("t_organizacion_fcByFilter", conn))
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
    using(var CmdDataByText = new SqlCommand("t_organizacion_fcByText", conn))
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
    public DataTable GetDataBySimpleObject(Simplet_organizacion_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
    base.Load();
    using(var conn = new SqlConnection(_ConnectionString))
    using(var cmd = new SqlCommand("t_organizacion_fcBySimplet_organizacion_fc", conn))
    using(var Adapter = new SqlDataAdapter(cmd))
    {
    cmd.CommandType = CommandType.StoredProcedure;
    cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
    cmd.Parameters.Add(new SqlParameter("@org_cnombre", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ccallefiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_clocalidadfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cprovinciafiscal", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@org_ccodigopostalfiscal", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ctelefono", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cmail", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_ccategoriaimpositiva", SqlDbType.NChar));cmd.Parameters.Add(new SqlParameter("@org_cidentificacion", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cinicioactividades", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cempresacb", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cheadercbte", SqlDbType.NText));cmd.Parameters.Add(new SqlParameter("@org_csymbol", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_cmetadata", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_factelect", SqlDbType.NVarChar));cmd.Parameters.Add(new SqlParameter("@org_organizacionId", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
    cmd.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
    cmd.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
    cmd.Parameters["@RowTotal"].Direction = ParameterDirection.Output;


    DataTable Data = new DataTable("Object");

    cmd.Parameters["@Name"].Value = Simple.Name;

    cmd.Parameters["@Taxonomies"].Value = Taxonomies.GetTaxnonomiesByChecked();
    
		cmd.Parameters["@org_cnombre"].Value = (this._org_cnombre == null) ? (object) DBNull.Value : (object) this._org_cnombre;

		cmd.Parameters["@org_ccallefiscal"].Value = (this._org_ccallefiscal == null) ? (object) DBNull.Value : (object) this._org_ccallefiscal;

		cmd.Parameters["@org_clocalidadfiscal"].Value = (this._org_clocalidadfiscal == null) ? (object) DBNull.Value : (object) this._org_clocalidadfiscal;

		cmd.Parameters["@org_cprovinciafiscal"].Value = (this._org_cprovinciafiscal == null) ? (object) DBNull.Value : (object) this._org_cprovinciafiscal;

		cmd.Parameters["@org_ccodigopostalfiscal"].Value = (this._org_ccodigopostalfiscal == null) ? (object) DBNull.Value : (object) this._org_ccodigopostalfiscal;

		cmd.Parameters["@org_ctelefono"].Value = (this._org_ctelefono == null) ? (object) DBNull.Value : (object) this._org_ctelefono;

		cmd.Parameters["@org_cmail"].Value = (this._org_cmail == null) ? (object) DBNull.Value : (object) this._org_cmail;

		cmd.Parameters["@org_ccategoriaimpositiva"].Value = (this._org_ccategoriaimpositiva == null) ? (object) DBNull.Value : (object) this._org_ccategoriaimpositiva;

		cmd.Parameters["@org_cidentificacion"].Value = (this._org_cidentificacion == null) ? (object) DBNull.Value : (object) this._org_cidentificacion;

		cmd.Parameters["@org_cinicioactividades"].Value = (this._org_cinicioactividades == null) ? (object) DBNull.Value : (object) this._org_cinicioactividades;

		cmd.Parameters["@org_cempresacb"].Value = (this._org_cempresacb == null) ? (object) DBNull.Value : (object) this._org_cempresacb;

		cmd.Parameters["@org_cheadercbte"].Value = (this._org_cheadercbte == null) ? (object) DBNull.Value : (object) this._org_cheadercbte;

		cmd.Parameters["@org_csymbol"].Value = (this._org_csymbol == null) ? (object) DBNull.Value : (object) this._org_csymbol;

		cmd.Parameters["@org_cmetadata"].Value = (this._org_cmetadata == null) ? (object) DBNull.Value : (object) this._org_cmetadata;

		cmd.Parameters["@org_factelect"].Value = (this._org_factelect == null) ? (object) DBNull.Value : (object) this._org_factelect;

		cmd.Parameters["@org_organizacionId"].Value = this._org_organizacionId;


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
		 
		public IEnumerable<Simplet_organizacion_fc> GetByChild(string ObjectType, int ObjectId)
		{
			base.Load();
			
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_organizacion_fcByParentObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_organizacion_fc Simple = new Simplet_organizacion_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.org_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.org_ccallefiscal = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.org_clocalidadfiscal = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.org_cprovinciafiscal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.org_ccodigopostalfiscal = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.org_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.org_cmail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.org_ccategoriaimpositiva = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.org_cidentificacion = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.org_cinicioactividades = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.org_cempresacb = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.org_cheadercbte = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.org_csymbol = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.org_cmetadata = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.org_factelect = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.org_organizacionId = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);

    yield return Simple;
    }
    }
    }
   ///<summary>
     ///Get by parent
     ///</summary>
		 
		public IEnumerable<Simplet_organizacion_fc> GetByParent(string ObjectType, int ObjectId)
		{
			base.Load();
			using(var conn = new SqlConnection(_ConnectionString))
			using(var Cmd = new SqlCommand("t_organizacion_fcByChildObject", conn))
			{
				conn.Open();
				Cmd.CommandType = CommandType.StoredProcedure;
				Cmd.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = ObjectType;
				Cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = ObjectId;
				using(var Reader = Cmd.ExecuteReader())
				while(Reader.Read())
				{
				Simplet_organizacion_fc Simple = new Simplet_organizacion_fc();
    Simple.Id = Reader.GetInt32(0);
    Simple.Name = Reader.GetString(1);
    if (Reader.FieldCount > 2)Simple.org_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)Simple.org_ccallefiscal = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)Simple.org_clocalidadfiscal = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)Simple.org_cprovinciafiscal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)Simple.org_ccodigopostalfiscal = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)Simple.org_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)Simple.org_cmail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)Simple.org_ccategoriaimpositiva = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)Simple.org_cidentificacion = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)Simple.org_cinicioactividades = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)Simple.org_cempresacb = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)Simple.org_cheadercbte = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)Simple.org_csymbol = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)Simple.org_cmetadata = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)Simple.org_factelect = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)Simple.org_organizacionId = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);

    yield return Simple;
    }
    }
    }
  
    private void InitClass()
    {
    base.Type = new ObjectType(3147, "t_organizacion_fc");
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
    if (Reader.FieldCount > 2)this._org_cnombre = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
if (Reader.FieldCount > 3)this._org_ccallefiscal = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
if (Reader.FieldCount > 4)this._org_clocalidadfiscal = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
if (Reader.FieldCount > 5)this._org_cprovinciafiscal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
if (Reader.FieldCount > 6)this._org_ccodigopostalfiscal = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
if (Reader.FieldCount > 7)this._org_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
if (Reader.FieldCount > 8)this._org_cmail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
if (Reader.FieldCount > 9)this._org_ccategoriaimpositiva = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
if (Reader.FieldCount > 10)this._org_cidentificacion = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
if (Reader.FieldCount > 11)this._org_cinicioactividades = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
if (Reader.FieldCount > 12)this._org_cempresacb = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
if (Reader.FieldCount > 13)this._org_cheadercbte = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
if (Reader.FieldCount > 14)this._org_csymbol = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
if (Reader.FieldCount > 15)this._org_cmetadata = (Reader.IsDBNull(15)) ? "" : Reader.GetString(15);
if (Reader.FieldCount > 16)this._org_factelect = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);
if (Reader.FieldCount > 17)this._org_organizacionId = (Reader.IsDBNull(17)) ? 0 : Reader.GetInt32(17);

    }
    Reader.Close();
    }
   }
  
    }
  