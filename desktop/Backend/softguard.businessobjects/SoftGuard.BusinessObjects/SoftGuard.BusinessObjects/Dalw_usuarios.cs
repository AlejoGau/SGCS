// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalw_usuarios
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Dalw_usuarios : TransactionObject
  {
    private bool _AutoCommit = false;
    private SqlConnection _Conn;
    private SqlCommand _CmdIns;
    private SqlCommand _CmdSel;
    private SqlCommand _CmdUpd;
    private SqlCommand _CmdDel;
    private SqlCommand _CmdChilds;
    private SqlCommand _CmdParents;
    private SqlCommand _CmdDataByName;
    private SqlCommand _CmdDataByNameWithChild;
    private SqlCommand _CmdDataByNameWithParent;
    private SqlCommand _CmdDataBySimpleObject;
    private SqlCommand _CmdDataByText;
    private string _nombrelogin;
    private string _contrasena;
    private bool _first_login;
    private string _nombre_mostrar;
    private string _logo;
    private string _html_bienvenida;
    private int _tipo_vista;
    private int _tipo_vistaM;
    private string _email_novedades;
    private string _email;

    public override bool AutoCommit
    {
      get
      {
        return this._AutoCommit;
      }
      set
      {
        this._AutoCommit = value;
      }
    }

    public string nombrelogin
    {
      get
      {
        return this._nombrelogin;
      }
      set
      {
        this._nombrelogin = value;
      }
    }

    public string contrasena
    {
      get
      {
        return this._contrasena;
      }
      set
      {
        this._contrasena = value;
      }
    }

    public bool first_login
    {
      get
      {
        return this._first_login;
      }
      set
      {
        this._first_login = value;
      }
    }

    public string nombre_mostrar
    {
      get
      {
        return this._nombre_mostrar;
      }
      set
      {
        this._nombre_mostrar = value;
      }
    }

    public string logo
    {
      get
      {
        return this._logo;
      }
      set
      {
        this._logo = value;
      }
    }

    public string html_bienvenida
    {
      get
      {
        return this._html_bienvenida;
      }
      set
      {
        this._html_bienvenida = value;
      }
    }

    public int tipo_vista
    {
      get
      {
        return this._tipo_vista;
      }
      set
      {
        this._tipo_vista = value;
      }
    }

    public int tipo_vistaM
    {
      get
      {
        return this._tipo_vistaM;
      }
      set
      {
        this._tipo_vistaM = value;
      }
    }

    public string email_novedades
    {
      get
      {
        return this._email_novedades;
      }
      set
      {
        this._email_novedades = value;
      }
    }

    public string email
    {
      get
      {
        return this._email;
      }
      set
      {
        this._email = value;
      }
    }

    public Dalw_usuarios(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalw_usuarios(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalw_usuarios(SqlHelper SqlConfig, int UserId, Simplew_usuarios Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._nombrelogin = Simple.nombrelogin;
      this._contrasena = Simple.contrasena;
      this._first_login = Simple.first_login;
      this._nombre_mostrar = Simple.nombre_mostrar;
      this._logo = Simple.logo;
      this._html_bienvenida = Simple.html_bienvenida;
      this._tipo_vista = Simple.tipo_vista;
      this._tipo_vistaM = Simple.tipo_vistaM;
      this._email_novedades = Simple.email_novedades;
      this._email = Simple.email;
    }

    ~Dalw_usuarios()
    {
      this._CmdSel.Parameters.Clear();
      this._CmdIns.Parameters.Clear();
      this._CmdUpd.Parameters.Clear();
      this._CmdDel.Parameters.Clear();
      this._CmdChilds.Parameters.Clear();
      this._CmdParents.Parameters.Clear();
      this._CmdDataByName.Parameters.Clear();
      this._CmdDataByNameWithChild.Parameters.Clear();
      this._CmdDataByNameWithParent.Parameters.Clear();
      this._CmdDataBySimpleObject.Parameters.Clear();
      this._CmdDataByText.Parameters.Clear();
    }

    public override void BeginTran()
    {
      if (this._Conn.State == ConnectionState.Closed)
        this._Conn.Open();
      this._CmdIns.Connection = this._Conn;
      this._CmdUpd.Connection = this._Conn;
      this._CmdDel.Connection = this._Conn;
    }

    public override void CommitTran()
    {
    }

    public override void RollbackTran()
    {
    }

    public override void EndTran()
    {
      this._Conn.Close();
    }

    public override void Save()
    {
      base.Save();
      this.BeginTran();
      try
      {
        if (this.Id == 0)
        {
          SqlCommand cmdIns = this._CmdIns;
          cmdIns.Parameters["@Name"].Value = (object) this.Name;
          cmdIns.Parameters["@nombrelogin"].Value = this._nombrelogin == null ? (object) DBNull.Value : (object) this._nombrelogin;
          cmdIns.Parameters["@contrasena"].Value = this._contrasena == null ? (object) DBNull.Value : (object) this._contrasena;
          cmdIns.Parameters["@first_login"].Value = (object) this._first_login;
          cmdIns.Parameters["@nombre_mostrar"].Value = this._nombre_mostrar == null ? (object) DBNull.Value : (object) this._nombre_mostrar;
          cmdIns.Parameters["@logo"].Value = this._logo == null ? (object) DBNull.Value : (object) this._logo;
          cmdIns.Parameters["@html_bienvenida"].Value = this._html_bienvenida == null ? (object) DBNull.Value : (object) this._html_bienvenida;
          cmdIns.Parameters["@tipo_vista"].Value = (object) this._tipo_vista;
          cmdIns.Parameters["@tipo_vistaM"].Value = (object) this._tipo_vistaM;
          cmdIns.Parameters["@email_novedades"].Value = this._email_novedades == null ? (object) DBNull.Value : (object) this._email_novedades;
          cmdIns.Parameters["@email"].Value = this._email == null ? (object) DBNull.Value : (object) this._email;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@nombrelogin"].Value = this._nombrelogin == null ? (object) DBNull.Value : (object) this._nombrelogin;
          cmdUpd.Parameters["@contrasena"].Value = this._contrasena == null ? (object) DBNull.Value : (object) this._contrasena;
          cmdUpd.Parameters["@first_login"].Value = (object) this._first_login;
          cmdUpd.Parameters["@nombre_mostrar"].Value = this._nombre_mostrar == null ? (object) DBNull.Value : (object) this._nombre_mostrar;
          cmdUpd.Parameters["@logo"].Value = this._logo == null ? (object) DBNull.Value : (object) this._logo;
          cmdUpd.Parameters["@html_bienvenida"].Value = this._html_bienvenida == null ? (object) DBNull.Value : (object) this._html_bienvenida;
          cmdUpd.Parameters["@tipo_vista"].Value = (object) this._tipo_vista;
          cmdUpd.Parameters["@tipo_vistaM"].Value = (object) this._tipo_vistaM;
          cmdUpd.Parameters["@email_novedades"].Value = this._email_novedades == null ? (object) DBNull.Value : (object) this._email_novedades;
          cmdUpd.Parameters["@email"].Value = this._email == null ? (object) DBNull.Value : (object) this._email;
          this.FillObject(cmdUpd.ExecuteReader());
        }
      }
      finally
      {
        this.EndTran();
      }
    }

    public override void Delete()
    {
      base.Delete();
      if (this.Id == 0)
        throw new RuntimeException("The w_usuarios is null");
      try
      {
        this.BeginTran();
        this._CmdDel.Parameters["@Id"].Value = (object) this.Id;
        this._CmdDel.ExecuteNonQuery();
      }
      finally
      {
        this.EndTran();
      }
    }

    public new virtual void Load(int Id)
    {
      base.Load(Id);
      this._Conn.Open();
      this._CmdSel.Parameters["@Id"].Value = (object) Id;
      this.FillObject(this._CmdSel.ExecuteReader());
      this._Conn.Close();
      this.OriginalObject = this.GetSimpleObject();
    }

    public override BaseObject GetObject()
    {
      return (BaseObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplew_usuarios simplewUsuarios = new Simplew_usuarios();
      simplewUsuarios.Id = this.Id;
      simplewUsuarios.Name = this.Name;
      simplewUsuarios.nombrelogin = this._nombrelogin;
      simplewUsuarios.contrasena = this._contrasena;
      simplewUsuarios.first_login = this._first_login;
      simplewUsuarios.nombre_mostrar = this._nombre_mostrar;
      simplewUsuarios.logo = this._logo;
      simplewUsuarios.html_bienvenida = this._html_bienvenida;
      simplewUsuarios.tipo_vista = this._tipo_vista;
      simplewUsuarios.tipo_vistaM = this._tipo_vistaM;
      simplewUsuarios.email_novedades = this._email_novedades;
      simplewUsuarios.email = this._email;
      if (this.CallerObject != null)
        simplewUsuarios.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplewUsuarios;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplew_usuarios simplewUsuarios = (Simplew_usuarios) BaseSimple;
      this.Id = simplewUsuarios.Id;
      this.Name = simplewUsuarios.Name;
      this._nombrelogin = simplewUsuarios.nombrelogin;
      this._contrasena = simplewUsuarios.contrasena;
      this._first_login = simplewUsuarios.first_login;
      this._nombre_mostrar = simplewUsuarios.nombre_mostrar;
      this._logo = simplewUsuarios.logo;
      this._html_bienvenida = simplewUsuarios.html_bienvenida;
      this._tipo_vista = simplewUsuarios.tipo_vista;
      this._tipo_vistaM = simplewUsuarios.tipo_vistaM;
      this._email_novedades = simplewUsuarios.email_novedades;
      this._email = simplewUsuarios.email;
      if (simplewUsuarios.CallerObject != null)
        this.CallerObject = simplewUsuarios.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerw_usuarios callerwUsuarios = new Callerw_usuarios();
      callerwUsuarios.Id = this.Id;
      callerwUsuarios.Name = this.Name;
      callerwUsuarios.nombrelogin = this._nombrelogin;
      callerwUsuarios.contrasena = this._contrasena;
      callerwUsuarios.first_login = this._first_login;
      callerwUsuarios.nombre_mostrar = this._nombre_mostrar;
      callerwUsuarios.logo = this._logo;
      callerwUsuarios.html_bienvenida = this._html_bienvenida;
      callerwUsuarios.tipo_vista = this._tipo_vista;
      callerwUsuarios.tipo_vistaM = this._tipo_vistaM;
      callerwUsuarios.email_novedades = this._email_novedades;
      callerwUsuarios.email = this._email;
      return (CallerObject) callerwUsuarios;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nombrelogin", typeof (string)));
      dataTable.Columns.Add(new DataColumn("contrasena", typeof (string)));
      dataTable.Columns.Add(new DataColumn("first_login", typeof (bool)));
      dataTable.Columns.Add(new DataColumn("nombre_mostrar", typeof (string)));
      dataTable.Columns.Add(new DataColumn("logo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("html_bienvenida", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tipo_vista", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tipo_vistaM", typeof (int)));
      dataTable.Columns.Add(new DataColumn("email_novedades", typeof (string)));
      dataTable.Columns.Add(new DataColumn("email", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["nombrelogin"] = (object) this._nombrelogin;
      row["contrasena"] = (object) this._contrasena;
      row["first_login"] = (object) this._first_login;
      row["nombre_mostrar"] = (object) this._nombre_mostrar;
      row["logo"] = (object) this._logo;
      row["html_bienvenida"] = (object) this._html_bienvenida;
      row["tipo_vista"] = (object) this._tipo_vista;
      row["tipo_vistaM"] = (object) this._tipo_vistaM;
      row["email_novedades"] = (object) this._email_novedades;
      row["email"] = (object) this._email;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      DataSet dataset = new DataSet("Object");
      dataset.EnforceConstraints = false;
      dataset.Tables.Add(this.GetDataObject().Copy());
      dataset.Tables.Add(this.Type.GetDataObject().Copy());
      if (this.CallerObject != null)
        dataset.Tables.Add(this.CallerObject.GetDataObject().Copy());
      XmlDataDocument xmlDataDocument = new XmlDataDocument(dataset);
      if (this.Dependencies.Count != 0)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }

    public DataTable GetDataChildsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Childs");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdChilds);
      this._CmdChilds.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdChilds.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      this._Conn.Close();
      return dataTable;
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      this._CmdChilds.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdChilds.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      SqlDataReader sqlDataReader = this._CmdChilds.ExecuteReader();
      while (sqlDataReader.Read())
      {
        Simplew_usuarios simplewUsuarios = new Simplew_usuarios();
        simplewUsuarios.Id = sqlDataReader.GetInt32(0);
        simplewUsuarios.Name = sqlDataReader.GetString(1);
        if (sqlDataReader.FieldCount > 2)
          simplewUsuarios.nombrelogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
        if (sqlDataReader.FieldCount > 3)
          simplewUsuarios.contrasena = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
        if (sqlDataReader.FieldCount > 4)
          simplewUsuarios.first_login = !sqlDataReader.IsDBNull(4) && sqlDataReader.GetBoolean(4);
        if (sqlDataReader.FieldCount > 5)
          simplewUsuarios.nombre_mostrar = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        if (sqlDataReader.FieldCount > 6)
          simplewUsuarios.logo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        if (sqlDataReader.FieldCount > 7)
          simplewUsuarios.html_bienvenida = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
        if (sqlDataReader.FieldCount > 8)
          simplewUsuarios.tipo_vista = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
        if (sqlDataReader.FieldCount > 9)
          simplewUsuarios.tipo_vistaM = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
        if (sqlDataReader.FieldCount > 10)
          simplewUsuarios.email_novedades = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
        if (sqlDataReader.FieldCount > 11)
          simplewUsuarios.email = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
        simplewUsuarios.CallerObject = Object.GetCallerObject();
        simplewUsuarios.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplewUsuarios);
        objectCollection.Add((SimpleBaseObject) simplewUsuarios);
      }
      sqlDataReader.Close();
      this._Conn.Close();
      return objectCollection;
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      foreach (DataRow row in (InternalDataCollectionBase) this.GetDataChildsByObject(Object).Rows)
      {
        Simplew_usuarios simplewUsuarios = new Simplew_usuarios();
        simplewUsuarios.Id = (int) row["Id"];
        simplewUsuarios.Name = (string) row["Name"];
        simplewUsuarios.nombrelogin = row["nombrelogin"] == DBNull.Value ? "" : (string) row["nombrelogin"];
        simplewUsuarios.contrasena = row["contrasena"] == DBNull.Value ? "" : (string) row["contrasena"];
        simplewUsuarios.first_login = row["first_login"] != DBNull.Value && (bool) row["first_login"];
        simplewUsuarios.nombre_mostrar = row["nombre_mostrar"] == DBNull.Value ? "" : (string) row["nombre_mostrar"];
        simplewUsuarios.logo = row["logo"] == DBNull.Value ? "" : (string) row["logo"];
        simplewUsuarios.html_bienvenida = row["html_bienvenida"] == DBNull.Value ? "" : (string) row["html_bienvenida"];
        simplewUsuarios.tipo_vista = row["tipo_vista"] == DBNull.Value ? 0 : (int) row["tipo_vista"];
        simplewUsuarios.tipo_vistaM = row["tipo_vistaM"] == DBNull.Value ? 0 : (int) row["tipo_vistaM"];
        simplewUsuarios.email_novedades = row["email_novedades"] == DBNull.Value ? "" : (string) row["email_novedades"];
        simplewUsuarios.email = row["email"] == DBNull.Value ? "" : (string) row["email"];
        simplewUsuarios.CallerObject = Object.GetCallerObject();
        simplewUsuarios.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplewUsuarios);
        if (Recursive)
          simplewUsuarios.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplewUsuarios, Recursive);
        objectCollection.Add((SimpleBaseObject) simplewUsuarios);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdParents);
      this._CmdParents.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdParents.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      this._Conn.Close();
      return dataTable;
    }

    public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      this._CmdParents.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdParents.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      SqlDataReader sqlDataReader = this._CmdParents.ExecuteReader();
      while (sqlDataReader.Read())
      {
        Simplew_usuarios simplewUsuarios = new Simplew_usuarios();
        simplewUsuarios.Id = sqlDataReader.GetInt32(0);
        simplewUsuarios.Name = sqlDataReader.GetString(1);
        if (sqlDataReader.FieldCount > 2)
          simplewUsuarios.nombrelogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
        if (sqlDataReader.FieldCount > 3)
          simplewUsuarios.contrasena = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
        if (sqlDataReader.FieldCount > 4)
          simplewUsuarios.first_login = !sqlDataReader.IsDBNull(4) && sqlDataReader.GetBoolean(4);
        if (sqlDataReader.FieldCount > 5)
          simplewUsuarios.nombre_mostrar = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        if (sqlDataReader.FieldCount > 6)
          simplewUsuarios.logo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        if (sqlDataReader.FieldCount > 7)
          simplewUsuarios.html_bienvenida = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
        if (sqlDataReader.FieldCount > 8)
          simplewUsuarios.tipo_vista = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
        if (sqlDataReader.FieldCount > 9)
          simplewUsuarios.tipo_vistaM = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
        if (sqlDataReader.FieldCount > 10)
          simplewUsuarios.email_novedades = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
        if (sqlDataReader.FieldCount > 11)
          simplewUsuarios.email = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
        simplewUsuarios.CallerObject = Object.GetCallerObject();
        simplewUsuarios.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplewUsuarios);
        objectCollection.Add((SimpleBaseObject) simplewUsuarios);
      }
      sqlDataReader.Close();
      this._Conn.Close();
      return objectCollection;
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this.GetDataByName(Name, Taxonomies, PageCount, PagePresent, "Id", ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByName);
      this._CmdDataByName.Parameters["@Name"].Value = (object) Name;
      this._CmdDataByName.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByName.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByName.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByName.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByName.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._CmdDataByName.Parameters["@OrderBy"].Value = (object) OrderBy;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByName.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByName.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByName.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByName.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByNameWithChild);
      this._CmdDataByNameWithChild.Parameters["@Name"].Value = (object) Name;
      this._CmdDataByNameWithChild.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByNameWithChild.Parameters["@ObjectType"].Value = (object) FilterChildObject.Type.Name;
      this._CmdDataByNameWithChild.Parameters["@ObjectId"].Value = (object) FilterChildObject.Id;
      this._CmdDataByNameWithChild.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByNameWithChild.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByNameWithChild.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByNameWithChild.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByNameWithChild.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByNameWithChild.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByNameWithChild.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByNameWithChild.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByNameWithParent);
      this._CmdDataByNameWithParent.Parameters["@Name"].Value = (object) Name;
      this._CmdDataByNameWithParent.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByNameWithParent.Parameters["@ObjectType"].Value = (object) FilterParentObject.Type.Name;
      this._CmdDataByNameWithParent.Parameters["@ObjectId"].Value = (object) FilterParentObject.Id;
      this._CmdDataByNameWithParent.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByNameWithParent.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByNameWithParent.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByNameWithParent.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByNameWithParent.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByNameWithParent.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByNameWithParent.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByNameWithParent.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlCommand selectCommand = new SqlCommand("w_usuariosByFilter", this._Conn))
      {
        using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
        {
          selectCommand.CommandType = CommandType.StoredProcedure;
          selectCommand.Parameters.AddWithValue("@page", (object) Page);
          selectCommand.Parameters.AddWithValue("@start", (object) Start);
          selectCommand.Parameters.AddWithValue("@limit", (object) Limit);
          selectCommand.Parameters.AddWithValue("@sort", (object) Sort);
          selectCommand.Parameters.AddWithValue("@group", (object) Group);
          selectCommand.Parameters.AddWithValue("@filter", (object) Filter);
          selectCommand.Parameters.Add("@totalrows", SqlDbType.Int).Direction = ParameterDirection.Output;
          sqlDataAdapter.Fill(dataTable);
          object obj = selectCommand.Parameters["@totalrows"].Value;
          if (obj != null && obj != DBNull.Value)
            TotalRows = (int) obj;
        }
      }
      return dataTable;
    }

    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByText);
      this._CmdDataByText.Parameters["@Text"].Value = (object) Text;
      this._CmdDataByText.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByText.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByText.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByName.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByName.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByText.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByText.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByText.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByText.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataBySimpleObject(Simplew_usuarios Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@nombrelogin"].Value = this._nombrelogin == null ? (object) DBNull.Value : (object) this._nombrelogin;
      dataBySimpleObject.Parameters["@contrasena"].Value = this._contrasena == null ? (object) DBNull.Value : (object) this._contrasena;
      dataBySimpleObject.Parameters["@first_login"].Value = (object) this._first_login;
      dataBySimpleObject.Parameters["@nombre_mostrar"].Value = this._nombre_mostrar == null ? (object) DBNull.Value : (object) this._nombre_mostrar;
      dataBySimpleObject.Parameters["@logo"].Value = this._logo == null ? (object) DBNull.Value : (object) this._logo;
      dataBySimpleObject.Parameters["@html_bienvenida"].Value = this._html_bienvenida == null ? (object) DBNull.Value : (object) this._html_bienvenida;
      dataBySimpleObject.Parameters["@tipo_vista"].Value = (object) this._tipo_vista;
      dataBySimpleObject.Parameters["@tipo_vistaM"].Value = (object) this._tipo_vistaM;
      dataBySimpleObject.Parameters["@email_novedades"].Value = this._email_novedades == null ? (object) DBNull.Value : (object) this._email_novedades;
      dataBySimpleObject.Parameters["@email"].Value = this._email == null ? (object) DBNull.Value : (object) this._email;
      dataBySimpleObject.Parameters["@PageCount"].Value = (object) PageCount;
      dataBySimpleObject.Parameters["@PagePresent"].Value = (object) PagePresent;
      dataBySimpleObject.Parameters["@PageTotal"].Value = (object) PageTotal;
      dataBySimpleObject.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (dataBySimpleObject.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(dataBySimpleObject.Parameters["@PageTotal"].Value.ToString());
      if (dataBySimpleObject.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(dataBySimpleObject.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public IEnumerable<Simplew_usuarios> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("w_usuariosByParentObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplew_usuarios Simple = new Simplew_usuarios();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.nombrelogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.contrasena = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.first_login = !sqlDataReader.IsDBNull(4) && sqlDataReader.GetBoolean(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.nombre_mostrar = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.logo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.html_bienvenida = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tipo_vista = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tipo_vistaM = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.email_novedades = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.email = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
              yield return Simple;
            }
          }
        }
        this._Conn.Close();
      }
      finally
      {
        if (this._Conn.State != ConnectionState.Closed)
          this._Conn.Close();
      }
    }

    public IEnumerable<Simplew_usuarios> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("w_usuariosByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplew_usuarios Simple = new Simplew_usuarios();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.nombrelogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.contrasena = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.first_login = !sqlDataReader.IsDBNull(4) && sqlDataReader.GetBoolean(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.nombre_mostrar = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.logo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.html_bienvenida = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tipo_vista = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tipo_vistaM = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.email_novedades = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.email = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
              yield return Simple;
            }
          }
        }
        this._Conn.Close();
      }
      finally
      {
        if (this._Conn.State != ConnectionState.Closed)
          this._Conn.Close();
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3062, "w_usuarios");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("w_usuariosIns");
      this._CmdSel = new SqlCommand("w_usuariosSel");
      this._CmdUpd = new SqlCommand("w_usuariosUpd");
      this._CmdDel = new SqlCommand("w_usuariosDel");
      this._CmdChilds = new SqlCommand("w_usuariosByChildObject");
      this._CmdParents = new SqlCommand("w_usuariosByParentObject");
      this._CmdDataByName = new SqlCommand("w_usuariosByName");
      this._CmdDataByNameWithChild = new SqlCommand("w_usuariosByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("w_usuariosByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("w_usuariosBySimplew_usuarios");
      this._CmdDataByText = new SqlCommand("w_usuariosByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@nombrelogin", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@contrasena", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@first_login", SqlDbType.Bit));
      this._CmdIns.Parameters.Add(new SqlParameter("@nombre_mostrar", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@logo", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@html_bienvenida", SqlDbType.NText));
      this._CmdIns.Parameters.Add(new SqlParameter("@tipo_vista", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@tipo_vistaM", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@email_novedades", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@email", SqlDbType.NVarChar));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@nombrelogin", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@contrasena", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@first_login", SqlDbType.Bit));
      this._CmdUpd.Parameters.Add(new SqlParameter("@nombre_mostrar", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@logo", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@html_bienvenida", SqlDbType.NText));
      this._CmdUpd.Parameters.Add(new SqlParameter("@tipo_vista", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@tipo_vistaM", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@email_novedades", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@email", SqlDbType.NVarChar));
      this._CmdChilds.CommandType = CommandType.StoredProcedure;
      this._CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdParents.CommandType = CommandType.StoredProcedure;
      this._CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdDataByName.CommandType = CommandType.StoredProcedure;
      this._CmdDataByName.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
      this._CmdDataByName.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByName.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithChild.CommandType = CommandType.StoredProcedure;
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithChild.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithParent.CommandType = CommandType.StoredProcedure;
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithParent.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataBySimpleObject.CommandType = CommandType.StoredProcedure;
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@nombrelogin", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@contrasena", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@first_login", SqlDbType.Bit));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@nombre_mostrar", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@logo", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@html_bienvenida", SqlDbType.NText));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@tipo_vista", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@tipo_vistaM", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@email_novedades", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@email", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataBySimpleObject.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByText.CommandType = CommandType.StoredProcedure;
      this._CmdDataByText.Parameters.Add(new SqlParameter("@Text", SqlDbType.NVarChar));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByText.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByText.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
    }

    private void SetConfig(SqlHelper SqlConfig)
    {
      this._Conn.ConnectionString = SqlConfig.GetConnString();
      this._CmdSel.Connection = this._Conn;
      this._CmdChilds.Connection = this._Conn;
      this._CmdParents.Connection = this._Conn;
      this._CmdDataByName.Connection = this._Conn;
      this._CmdDataByNameWithChild.Connection = this._Conn;
      this._CmdDataByNameWithParent.Connection = this._Conn;
      this._CmdDataBySimpleObject.Connection = this._Conn;
      this._CmdDataByText.Connection = this._Conn;
    }

    private void FillObject(SqlDataReader Reader)
    {
      while (Reader.Read())
      {
        this.Id = Reader.GetInt32(0);
        this.Name = Reader.GetString(1);
        if (Reader.FieldCount > 2)
          this._nombrelogin = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._contrasena = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._first_login = !Reader.IsDBNull(4) && Reader.GetBoolean(4);
        if (Reader.FieldCount > 5)
          this._nombre_mostrar = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._logo = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._html_bienvenida = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._tipo_vista = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
        if (Reader.FieldCount > 9)
          this._tipo_vistaM = Reader.IsDBNull(9) ? 0 : Reader.GetInt32(9);
        if (Reader.FieldCount > 10)
          this._email_novedades = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
        if (Reader.FieldCount > 11)
          this._email = Reader.IsDBNull(11) ? "" : Reader.GetString(11);
      }
      Reader.Close();
    }
  }
}
