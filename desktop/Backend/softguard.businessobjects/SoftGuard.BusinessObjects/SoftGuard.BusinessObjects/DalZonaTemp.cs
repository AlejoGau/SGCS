// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalZonaTemp
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
  public class DalZonaTemp : TransactionObject
  {
    private bool _AutoCommit = false;
    private SqlConnection _Conn;
    private SqlTransaction _Trans;
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
    private long _zon_idregistro;
    private int _zon_iidcuenta;
    private int _zon_usuario;
    private string _zon_ccodigo;
    private string _zon_cdescripcion;
    private string _zon_codigoalarma;
    private string _zon_tipo;
    private string _zon_cimagen;

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

    public long zon_idregistro
    {
      get
      {
        return this._zon_idregistro;
      }
      set
      {
        this._zon_idregistro = value;
      }
    }

    public int zon_iidcuenta
    {
      get
      {
        return this._zon_iidcuenta;
      }
      set
      {
        this._zon_iidcuenta = value;
      }
    }

    public int zon_usuario
    {
      get
      {
        return this._zon_usuario;
      }
      set
      {
        this._zon_usuario = value;
      }
    }

    public string zon_ccodigo
    {
      get
      {
        return this._zon_ccodigo;
      }
      set
      {
        this._zon_ccodigo = value;
      }
    }

    public string zon_cdescripcion
    {
      get
      {
        return this._zon_cdescripcion;
      }
      set
      {
        this._zon_cdescripcion = value;
      }
    }

    public string zon_codigoalarma
    {
      get
      {
        return this._zon_codigoalarma;
      }
      set
      {
        this._zon_codigoalarma = value;
      }
    }

    public string zon_tipo
    {
      get
      {
        return this._zon_tipo;
      }
      set
      {
        this._zon_tipo = value;
      }
    }

    public string zon_cimagen
    {
      get
      {
        return this._zon_cimagen;
      }
      set
      {
        this._zon_cimagen = value;
      }
    }

    public DalZonaTemp(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalZonaTemp(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalZonaTemp(SqlHelper SqlConfig, int UserId, SimpleZonaTemp Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._zon_idregistro = Simple.zon_idregistro;
      this._zon_iidcuenta = Simple.zon_iidcuenta;
      this._zon_usuario = Simple.zon_usuario;
      this._zon_ccodigo = Simple.zon_ccodigo;
      this._zon_cdescripcion = Simple.zon_cdescripcion;
      this._zon_codigoalarma = Simple.zon_codigoalarma;
      this._zon_tipo = Simple.zon_tipo;
      this._zon_cimagen = Simple.zon_cimagen;
    }

    ~DalZonaTemp()
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
      this._Conn.Open();
      this._Trans = this._Conn.BeginTransaction();
      this._CmdIns.Connection = this._Conn;
      this._CmdUpd.Connection = this._Conn;
      this._CmdDel.Connection = this._Conn;
      this._CmdIns.Transaction = this._Trans;
      this._CmdUpd.Transaction = this._Trans;
      this._CmdDel.Transaction = this._Trans;
    }

    public override void CommitTran()
    {
      this._Trans.Commit();
    }

    public override void RollbackTran()
    {
      this._Trans.Rollback();
    }

    public override void EndTran()
    {
      this._Conn.Close();
    }

    public override void Save()
    {
      base.Save();
      if (this._AutoCommit)
        this.BeginTran();
      try
      {
        if (this.Id == 0)
        {
          SqlCommand cmdIns = this._CmdIns;
          cmdIns.Parameters["@Name"].Value = (object) this.Name;
          cmdIns.Parameters["@zon_idregistro"].Value = (object) this._zon_idregistro;
          cmdIns.Parameters["@zon_iidcuenta"].Value = (object) this._zon_iidcuenta;
          cmdIns.Parameters["@zon_usuario"].Value = (object) this._zon_usuario;
          cmdIns.Parameters["@zon_ccodigo"].Value = this._zon_ccodigo == null ? (object) DBNull.Value : (object) this._zon_ccodigo;
          cmdIns.Parameters["@zon_cdescripcion"].Value = this._zon_cdescripcion == null ? (object) DBNull.Value : (object) this._zon_cdescripcion;
          cmdIns.Parameters["@zon_codigoalarma"].Value = this._zon_codigoalarma == null ? (object) DBNull.Value : (object) this._zon_codigoalarma;
          cmdIns.Parameters["@zon_tipo"].Value = this._zon_tipo == null ? (object) DBNull.Value : (object) this._zon_tipo;
          cmdIns.Parameters["@zon_cimagen"].Value = this._zon_cimagen == null ? (object) DBNull.Value : (object) this._zon_cimagen;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@zon_idregistro"].Value = (object) this._zon_idregistro;
          cmdUpd.Parameters["@zon_iidcuenta"].Value = (object) this._zon_iidcuenta;
          cmdUpd.Parameters["@zon_usuario"].Value = (object) this._zon_usuario;
          cmdUpd.Parameters["@zon_ccodigo"].Value = this._zon_ccodigo == null ? (object) DBNull.Value : (object) this._zon_ccodigo;
          cmdUpd.Parameters["@zon_cdescripcion"].Value = this._zon_cdescripcion == null ? (object) DBNull.Value : (object) this._zon_cdescripcion;
          cmdUpd.Parameters["@zon_codigoalarma"].Value = this._zon_codigoalarma == null ? (object) DBNull.Value : (object) this._zon_codigoalarma;
          cmdUpd.Parameters["@zon_tipo"].Value = this._zon_tipo == null ? (object) DBNull.Value : (object) this._zon_tipo;
          cmdUpd.Parameters["@zon_cimagen"].Value = this._zon_cimagen == null ? (object) DBNull.Value : (object) this._zon_cimagen;
          this.FillObject(cmdUpd.ExecuteReader());
        }
        if (!this._AutoCommit)
          return;
        this.CommitTran();
      }
      catch (Exception ex)
      {
        if (this._AutoCommit)
          this.RollbackTran();
        throw ex;
      }
      finally
      {
        if (this._AutoCommit)
          this.EndTran();
      }
    }

    public override void Delete()
    {
      base.Delete();
      if (this.Id == 0)
        throw new RuntimeException("The ZonaTemp is null");
      try
      {
        if (this._AutoCommit)
          this.BeginTran();
        this._CmdDel.Parameters["@Id"].Value = (object) this.Id;
        this._CmdDel.ExecuteNonQuery();
        if (!this._AutoCommit)
          return;
        this.CommitTran();
      }
      catch (Exception ex)
      {
        if (this._AutoCommit)
          this.RollbackTran();
        throw ex;
      }
      finally
      {
        if (this._AutoCommit)
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
      SimpleZonaTemp simpleZonaTemp = new SimpleZonaTemp();
      simpleZonaTemp.Id = this.Id;
      simpleZonaTemp.Name = this.Name;
      simpleZonaTemp.zon_idregistro = this._zon_idregistro;
      simpleZonaTemp.zon_iidcuenta = this._zon_iidcuenta;
      simpleZonaTemp.zon_usuario = this._zon_usuario;
      simpleZonaTemp.zon_ccodigo = this._zon_ccodigo;
      simpleZonaTemp.zon_cdescripcion = this._zon_cdescripcion;
      simpleZonaTemp.zon_codigoalarma = this._zon_codigoalarma;
      simpleZonaTemp.zon_tipo = this._zon_tipo;
      simpleZonaTemp.zon_cimagen = this._zon_cimagen;
      if (this.CallerObject != null)
        simpleZonaTemp.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleZonaTemp;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleZonaTemp simpleZonaTemp = (SimpleZonaTemp) BaseSimple;
      this.Id = simpleZonaTemp.Id;
      this.Name = simpleZonaTemp.Name;
      this._zon_idregistro = simpleZonaTemp.zon_idregistro;
      this._zon_iidcuenta = simpleZonaTemp.zon_iidcuenta;
      this._zon_usuario = simpleZonaTemp.zon_usuario;
      this._zon_ccodigo = simpleZonaTemp.zon_ccodigo;
      this._zon_cdescripcion = simpleZonaTemp.zon_cdescripcion;
      this._zon_codigoalarma = simpleZonaTemp.zon_codigoalarma;
      this._zon_tipo = simpleZonaTemp.zon_tipo;
      this._zon_cimagen = simpleZonaTemp.zon_cimagen;
      if (simpleZonaTemp.CallerObject != null)
        this.CallerObject = simpleZonaTemp.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerZonaTemp callerZonaTemp = new CallerZonaTemp();
      callerZonaTemp.Id = this.Id;
      callerZonaTemp.Name = this.Name;
      callerZonaTemp.zon_idregistro = this._zon_idregistro;
      callerZonaTemp.zon_iidcuenta = this._zon_iidcuenta;
      callerZonaTemp.zon_usuario = this._zon_usuario;
      callerZonaTemp.zon_ccodigo = this._zon_ccodigo;
      callerZonaTemp.zon_cdescripcion = this._zon_cdescripcion;
      callerZonaTemp.zon_codigoalarma = this._zon_codigoalarma;
      callerZonaTemp.zon_tipo = this._zon_tipo;
      callerZonaTemp.zon_cimagen = this._zon_cimagen;
      return (CallerObject) callerZonaTemp;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_idregistro", typeof (long)));
      dataTable.Columns.Add(new DataColumn("zon_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_usuario", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_tipo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["zon_idregistro"] = (object) this._zon_idregistro;
      row["zon_iidcuenta"] = (object) this._zon_iidcuenta;
      row["zon_usuario"] = (object) this._zon_usuario;
      row["zon_ccodigo"] = (object) this._zon_ccodigo;
      row["zon_cdescripcion"] = (object) this._zon_cdescripcion;
      row["zon_codigoalarma"] = (object) this._zon_codigoalarma;
      row["zon_tipo"] = (object) this._zon_tipo;
      row["zon_cimagen"] = (object) this._zon_cimagen;
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
        SimpleZonaTemp simpleZonaTemp = new SimpleZonaTemp();
        simpleZonaTemp.Id = sqlDataReader.GetInt32(0);
        simpleZonaTemp.Name = sqlDataReader.GetString(1);
        simpleZonaTemp.zon_idregistro = sqlDataReader.IsDBNull(2) ? 0L : sqlDataReader.GetInt64(2);
        simpleZonaTemp.zon_iidcuenta = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simpleZonaTemp.zon_usuario = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
        simpleZonaTemp.zon_ccodigo = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        simpleZonaTemp.zon_cdescripcion = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        simpleZonaTemp.zon_codigoalarma = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
        simpleZonaTemp.zon_tipo = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
        simpleZonaTemp.zon_cimagen = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
        simpleZonaTemp.CallerObject = Object.GetCallerObject();
        simpleZonaTemp.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleZonaTemp);
        objectCollection.Add((SimpleBaseObject) simpleZonaTemp);
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
        SimpleZonaTemp simpleZonaTemp = new SimpleZonaTemp();
        simpleZonaTemp.Id = (int) row["Id"];
        simpleZonaTemp.Name = (string) row["Name"];
        simpleZonaTemp.zon_idregistro = row["zon_idregistro"] == DBNull.Value ? 0L : (long) (int) row["zon_idregistro"];
        simpleZonaTemp.zon_iidcuenta = row["zon_iidcuenta"] == DBNull.Value ? 0 : (int) row["zon_iidcuenta"];
        simpleZonaTemp.zon_usuario = row["zon_usuario"] == DBNull.Value ? 0 : (int) row["zon_usuario"];
        simpleZonaTemp.zon_ccodigo = row["zon_ccodigo"] == DBNull.Value ? "" : (string) row["zon_ccodigo"];
        simpleZonaTemp.zon_cdescripcion = row["zon_cdescripcion"] == DBNull.Value ? "" : (string) row["zon_cdescripcion"];
        simpleZonaTemp.zon_codigoalarma = row["zon_codigoalarma"] == DBNull.Value ? "" : (string) row["zon_codigoalarma"];
        simpleZonaTemp.zon_tipo = row["zon_tipo"] == DBNull.Value ? "" : (string) row["zon_tipo"];
        simpleZonaTemp.zon_cimagen = row["zon_cimagen"] == DBNull.Value ? "" : (string) row["zon_cimagen"];
        simpleZonaTemp.CallerObject = Object.GetCallerObject();
        simpleZonaTemp.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleZonaTemp);
        if (Recursive)
          simpleZonaTemp.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleZonaTemp, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleZonaTemp);
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
        SimpleZonaTemp simpleZonaTemp = new SimpleZonaTemp();
        simpleZonaTemp.Id = sqlDataReader.GetInt32(0);
        simpleZonaTemp.Name = sqlDataReader.GetString(1);
        simpleZonaTemp.zon_idregistro = sqlDataReader.IsDBNull(2) ? 0L : sqlDataReader.GetInt64(2);
        simpleZonaTemp.zon_iidcuenta = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simpleZonaTemp.zon_usuario = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
        simpleZonaTemp.zon_ccodigo = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        simpleZonaTemp.zon_cdescripcion = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        simpleZonaTemp.zon_codigoalarma = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
        simpleZonaTemp.zon_tipo = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
        simpleZonaTemp.zon_cimagen = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
        simpleZonaTemp.CallerObject = Object.GetCallerObject();
        simpleZonaTemp.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleZonaTemp);
        objectCollection.Add((SimpleBaseObject) simpleZonaTemp);
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

    public DataTable GetDataBySimpleObject(SimpleZonaTemp Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@zon_idregistro"].Value = (object) this._zon_idregistro;
      dataBySimpleObject.Parameters["@zon_iidcuenta"].Value = (object) this._zon_iidcuenta;
      dataBySimpleObject.Parameters["@zon_usuario"].Value = (object) this._zon_usuario;
      dataBySimpleObject.Parameters["@zon_ccodigo"].Value = this._zon_ccodigo == null ? (object) DBNull.Value : (object) this._zon_ccodigo;
      dataBySimpleObject.Parameters["@zon_cdescripcion"].Value = this._zon_cdescripcion == null ? (object) DBNull.Value : (object) this._zon_cdescripcion;
      dataBySimpleObject.Parameters["@zon_codigoalarma"].Value = this._zon_codigoalarma == null ? (object) DBNull.Value : (object) this._zon_codigoalarma;
      dataBySimpleObject.Parameters["@zon_tipo"].Value = this._zon_tipo == null ? (object) DBNull.Value : (object) this._zon_tipo;
      dataBySimpleObject.Parameters["@zon_cimagen"].Value = this._zon_cimagen == null ? (object) DBNull.Value : (object) this._zon_cimagen;
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

    public IEnumerable<SimpleZonaTemp> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("ZonaTempByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleZonaTemp Simple = new SimpleZonaTemp();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.zon_idregistro = sqlDataReader.IsDBNull(2) ? 0L : sqlDataReader.GetInt64(2);
              Simple.zon_iidcuenta = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              Simple.zon_usuario = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              Simple.zon_ccodigo = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              Simple.zon_cdescripcion = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              Simple.zon_codigoalarma = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              Simple.zon_tipo = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              Simple.zon_cimagen = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
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
      this.Type = new ObjectType(3016, "ZonaTemp");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("ZonaTempIns");
      this._CmdSel = new SqlCommand("ZonaTempSel");
      this._CmdUpd = new SqlCommand("ZonaTempUpd");
      this._CmdDel = new SqlCommand("ZonaTempDel");
      this._CmdChilds = new SqlCommand("ZonaTempByChildObject");
      this._CmdParents = new SqlCommand("ZonaTempByParentObject");
      this._CmdDataByName = new SqlCommand("ZonaTempByName");
      this._CmdDataByNameWithChild = new SqlCommand("ZonaTempByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("ZonaTempByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("ZonaTempBySimpleZonaTemp");
      this._CmdDataByText = new SqlCommand("ZonaTempByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_idregistro", SqlDbType.BigInt));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_iidcuenta", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_usuario", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_tipo", SqlDbType.NChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_idregistro", SqlDbType.BigInt));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_iidcuenta", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_usuario", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_tipo", SqlDbType.NChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));
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
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_idregistro", SqlDbType.BigInt));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_iidcuenta", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_usuario", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_tipo", SqlDbType.NChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));
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
        this._zon_idregistro = Reader.IsDBNull(2) ? 0L : Reader.GetInt64(2);
        this._zon_iidcuenta = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        this._zon_usuario = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        this._zon_ccodigo = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        this._zon_cdescripcion = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        this._zon_codigoalarma = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        this._zon_tipo = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        this._zon_cimagen = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
      }
      Reader.Close();
    }
  }
}
