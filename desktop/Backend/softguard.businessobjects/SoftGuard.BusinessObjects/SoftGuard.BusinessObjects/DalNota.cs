// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalNota
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
  public class DalNota : TransactionObject
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
    private int _not_iidcuenta;
    private string _not_mnotaprincipal;
    private string _not_mnotatemporal;
    private DateTime _not_dtemporaldesde;
    private DateTime _not_dtemporalhasta;

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

    public int not_iidcuenta
    {
      get
      {
        return this._not_iidcuenta;
      }
      set
      {
        this._not_iidcuenta = value;
      }
    }

    public string not_mnotaprincipal
    {
      get
      {
        return this._not_mnotaprincipal;
      }
      set
      {
        this._not_mnotaprincipal = value;
      }
    }

    public string not_mnotatemporal
    {
      get
      {
        return this._not_mnotatemporal;
      }
      set
      {
        this._not_mnotatemporal = value;
      }
    }

    public DateTime not_dtemporaldesde
    {
      get
      {
        return this._not_dtemporaldesde;
      }
      set
      {
        this._not_dtemporaldesde = value;
      }
    }

    public DateTime not_dtemporalhasta
    {
      get
      {
        return this._not_dtemporalhasta;
      }
      set
      {
        this._not_dtemporalhasta = value;
      }
    }

    public DalNota(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalNota(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalNota(SqlHelper SqlConfig, int UserId, SimpleNota Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._not_iidcuenta = Simple.not_iidcuenta;
      this._not_mnotaprincipal = Simple.not_mnotaprincipal;
      this._not_mnotatemporal = Simple.not_mnotatemporal;
      this._not_dtemporaldesde = Simple.not_dtemporaldesde;
      this._not_dtemporalhasta = Simple.not_dtemporalhasta;
    }

    ~DalNota()
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
          cmdIns.Parameters["@not_iidcuenta"].Value = (object) this._not_iidcuenta;
          cmdIns.Parameters["@not_mnotaprincipal"].Value = this._not_mnotaprincipal == null ? (object) DBNull.Value : (object) this._not_mnotaprincipal;
          cmdIns.Parameters["@not_mnotatemporal"].Value = this._not_mnotatemporal == null ? (object) DBNull.Value : (object) this._not_mnotatemporal;
          cmdIns.Parameters["@not_dtemporaldesde"].Value = this._not_dtemporaldesde == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._not_dtemporaldesde;
          cmdIns.Parameters["@not_dtemporalhasta"].Value = this._not_dtemporalhasta == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._not_dtemporalhasta;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@not_iidcuenta"].Value = (object) this._not_iidcuenta;
          cmdUpd.Parameters["@not_mnotaprincipal"].Value = this._not_mnotaprincipal == null ? (object) DBNull.Value : (object) this._not_mnotaprincipal;
          cmdUpd.Parameters["@not_mnotatemporal"].Value = this._not_mnotatemporal == null ? (object) DBNull.Value : (object) this._not_mnotatemporal;
          cmdUpd.Parameters["@not_dtemporaldesde"].Value = this._not_dtemporaldesde == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._not_dtemporaldesde;
          cmdUpd.Parameters["@not_dtemporalhasta"].Value = this._not_dtemporalhasta == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._not_dtemporalhasta;
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
        throw new RuntimeException("The Nota is null");
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
      SimpleNota simpleNota = new SimpleNota();
      simpleNota.Id = this.Id;
      simpleNota.Name = this.Name;
      simpleNota.not_iidcuenta = this._not_iidcuenta;
      simpleNota.not_mnotaprincipal = this._not_mnotaprincipal;
      simpleNota.not_mnotatemporal = this._not_mnotatemporal;
      simpleNota.not_dtemporaldesde = this._not_dtemporaldesde;
      simpleNota.not_dtemporalhasta = this._not_dtemporalhasta;
      if (this.CallerObject != null)
        simpleNota.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleNota;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleNota simpleNota = (SimpleNota) BaseSimple;
      this.Id = simpleNota.Id;
      this.Name = simpleNota.Name;
      this._not_iidcuenta = simpleNota.not_iidcuenta;
      this._not_mnotaprincipal = simpleNota.not_mnotaprincipal;
      this._not_mnotatemporal = simpleNota.not_mnotatemporal;
      this._not_dtemporaldesde = simpleNota.not_dtemporaldesde;
      this._not_dtemporalhasta = simpleNota.not_dtemporalhasta;
      if (simpleNota.CallerObject != null)
        this.CallerObject = simpleNota.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerNota callerNota = new CallerNota();
      callerNota.Id = this.Id;
      callerNota.Name = this.Name;
      callerNota.not_iidcuenta = this._not_iidcuenta;
      callerNota.not_mnotaprincipal = this._not_mnotaprincipal;
      callerNota.not_mnotatemporal = this._not_mnotatemporal;
      callerNota.not_dtemporaldesde = this._not_dtemporaldesde;
      callerNota.not_dtemporalhasta = this._not_dtemporalhasta;
      return (CallerObject) callerNota;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("not_mnotaprincipal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_mnotatemporal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_dtemporaldesde", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("not_dtemporalhasta", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["not_iidcuenta"] = (object) this._not_iidcuenta;
      row["not_mnotaprincipal"] = (object) this._not_mnotaprincipal;
      row["not_mnotatemporal"] = (object) this._not_mnotatemporal;
      row["not_dtemporaldesde"] = (object) this._not_dtemporaldesde;
      row["not_dtemporalhasta"] = (object) this._not_dtemporalhasta;
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
        SimpleNota simpleNota = new SimpleNota();
        simpleNota.Id = sqlDataReader.GetInt32(0);
        simpleNota.Name = sqlDataReader.GetString(1);
        simpleNota.not_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleNota.not_mnotaprincipal = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
        simpleNota.not_mnotatemporal = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        simpleNota.not_dtemporaldesde = sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5);
        simpleNota.not_dtemporalhasta = sqlDataReader.IsDBNull(6) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(6);
        simpleNota.CallerObject = Object.GetCallerObject();
        simpleNota.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleNota);
        objectCollection.Add((SimpleBaseObject) simpleNota);
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
        SimpleNota simpleNota = new SimpleNota();
        simpleNota.Id = (int) row["Id"];
        simpleNota.Name = (string) row["Name"];
        simpleNota.not_iidcuenta = row["not_iidcuenta"] == DBNull.Value ? 0 : (int) row["not_iidcuenta"];
        simpleNota.not_mnotaprincipal = row["not_mnotaprincipal"] == DBNull.Value ? "" : (string) row["not_mnotaprincipal"];
        simpleNota.not_mnotatemporal = row["not_mnotatemporal"] == DBNull.Value ? "" : (string) row["not_mnotatemporal"];
        simpleNota.not_dtemporaldesde = row["not_dtemporaldesde"] == DBNull.Value ? new DateTime(1, 1, 1) : (DateTime) row["not_dtemporaldesde"];
        simpleNota.not_dtemporalhasta = row["not_dtemporalhasta"] == DBNull.Value ? new DateTime(1, 1, 1) : (DateTime) row["not_dtemporalhasta"];
        simpleNota.CallerObject = Object.GetCallerObject();
        simpleNota.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleNota);
        if (Recursive)
          simpleNota.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleNota, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleNota);
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
        SimpleNota simpleNota = new SimpleNota();
        simpleNota.Id = sqlDataReader.GetInt32(0);
        simpleNota.Name = sqlDataReader.GetString(1);
        simpleNota.not_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleNota.not_mnotaprincipal = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
        simpleNota.not_mnotatemporal = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        simpleNota.not_dtemporaldesde = sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5);
        simpleNota.not_dtemporalhasta = sqlDataReader.IsDBNull(6) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(6);
        simpleNota.CallerObject = Object.GetCallerObject();
        simpleNota.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleNota);
        objectCollection.Add((SimpleBaseObject) simpleNota);
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

    public DataTable GetDataBySimpleObject(SimpleNota Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@not_iidcuenta"].Value = (object) this._not_iidcuenta;
      dataBySimpleObject.Parameters["@not_mnotaprincipal"].Value = this._not_mnotaprincipal == null ? (object) DBNull.Value : (object) this._not_mnotaprincipal;
      dataBySimpleObject.Parameters["@not_mnotatemporal"].Value = this._not_mnotatemporal == null ? (object) DBNull.Value : (object) this._not_mnotatemporal;
      dataBySimpleObject.Parameters["@not_dtemporaldesde"].Value = this._not_dtemporaldesde == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._not_dtemporaldesde;
      dataBySimpleObject.Parameters["@not_dtemporalhasta"].Value = this._not_dtemporalhasta == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._not_dtemporalhasta;
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

    public IEnumerable<SimpleNota> GetByParent(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("NotaByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleNota Simple = new SimpleNota();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.not_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              Simple.not_mnotaprincipal = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              Simple.not_mnotatemporal = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              Simple.not_dtemporaldesde = sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5);
              Simple.not_dtemporalhasta = sqlDataReader.IsDBNull(6) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(6);
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
      this.Type = new ObjectType(3010, "Nota");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("NotaIns");
      this._CmdSel = new SqlCommand("NotaSel");
      this._CmdUpd = new SqlCommand("NotaUpd");
      this._CmdDel = new SqlCommand("NotaDel");
      this._CmdChilds = new SqlCommand("NotaByChildObject");
      this._CmdParents = new SqlCommand("NotaByParentObject");
      this._CmdDataByName = new SqlCommand("NotaByName");
      this._CmdDataByNameWithChild = new SqlCommand("NotaByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("NotaByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("NotaBySimpleNota");
      this._CmdDataByText = new SqlCommand("NotaByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@not_iidcuenta", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@not_mnotaprincipal", SqlDbType.NText));
      this._CmdIns.Parameters.Add(new SqlParameter("@not_mnotatemporal", SqlDbType.NText));
      this._CmdIns.Parameters.Add(new SqlParameter("@not_dtemporaldesde", SqlDbType.DateTime));
      this._CmdIns.Parameters.Add(new SqlParameter("@not_dtemporalhasta", SqlDbType.DateTime));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@not_iidcuenta", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@not_mnotaprincipal", SqlDbType.NText));
      this._CmdUpd.Parameters.Add(new SqlParameter("@not_mnotatemporal", SqlDbType.NText));
      this._CmdUpd.Parameters.Add(new SqlParameter("@not_dtemporaldesde", SqlDbType.DateTime));
      this._CmdUpd.Parameters.Add(new SqlParameter("@not_dtemporalhasta", SqlDbType.DateTime));
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
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@not_iidcuenta", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@not_mnotaprincipal", SqlDbType.NText));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@not_mnotatemporal", SqlDbType.NText));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@not_dtemporaldesde", SqlDbType.DateTime));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@not_dtemporalhasta", SqlDbType.DateTime));
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
        this._not_iidcuenta = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        this._not_mnotaprincipal = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        this._not_mnotatemporal = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        this._not_dtemporaldesde = Reader.IsDBNull(5) ? new DateTime(1, 1, 1) : Reader.GetDateTime(5);
        this._not_dtemporalhasta = Reader.IsDBNull(6) ? new DateTime(1, 1, 1) : Reader.GetDateTime(6);
      }
      Reader.Close();
    }
  }
}
