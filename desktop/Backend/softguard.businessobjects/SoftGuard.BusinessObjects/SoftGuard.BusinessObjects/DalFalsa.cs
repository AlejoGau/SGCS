// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalFalsa
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
  public class DalFalsa : TransactionObject
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
    private int _fal_iidcuenta;
    private Decimal _fal_nmargen;
    private Decimal _fal_nmeses;
    private string _fal_mnota;

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

    public int fal_iidcuenta
    {
      get
      {
        return this._fal_iidcuenta;
      }
      set
      {
        this._fal_iidcuenta = value;
      }
    }

    public Decimal fal_nmargen
    {
      get
      {
        return this._fal_nmargen;
      }
      set
      {
        this._fal_nmargen = value;
      }
    }

    public Decimal fal_nmeses
    {
      get
      {
        return this._fal_nmeses;
      }
      set
      {
        this._fal_nmeses = value;
      }
    }

    public string fal_mnota
    {
      get
      {
        return this._fal_mnota;
      }
      set
      {
        this._fal_mnota = value;
      }
    }

    public DalFalsa(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalFalsa(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalFalsa(SqlHelper SqlConfig, int UserId, SimpleFalsa Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._fal_iidcuenta = Simple.fal_iidcuenta;
      this._fal_nmargen = Simple.fal_nmargen;
      this._fal_nmeses = Simple.fal_nmeses;
      this._fal_mnota = Simple.fal_mnota;
    }

    ~DalFalsa()
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
          cmdIns.Parameters["@fal_iidcuenta"].Value = (object) this._fal_iidcuenta;
          cmdIns.Parameters["@fal_nmargen"].Value = (object) this._fal_nmargen;
          cmdIns.Parameters["@fal_nmeses"].Value = (object) this._fal_nmeses;
          cmdIns.Parameters["@fal_mnota"].Value = this._fal_mnota == null ? (object) DBNull.Value : (object) this._fal_mnota;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@fal_iidcuenta"].Value = (object) this._fal_iidcuenta;
          cmdUpd.Parameters["@fal_nmargen"].Value = (object) this._fal_nmargen;
          cmdUpd.Parameters["@fal_nmeses"].Value = (object) this._fal_nmeses;
          cmdUpd.Parameters["@fal_mnota"].Value = this._fal_mnota == null ? (object) DBNull.Value : (object) this._fal_mnota;
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
        throw new RuntimeException("The Falsa is null");
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
      SimpleFalsa simpleFalsa = new SimpleFalsa();
      simpleFalsa.Id = this.Id;
      simpleFalsa.Name = this.Name;
      simpleFalsa.fal_iidcuenta = this._fal_iidcuenta;
      simpleFalsa.fal_nmargen = this._fal_nmargen;
      simpleFalsa.fal_nmeses = this._fal_nmeses;
      simpleFalsa.fal_mnota = this._fal_mnota;
      if (this.CallerObject != null)
        simpleFalsa.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleFalsa;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleFalsa simpleFalsa = (SimpleFalsa) BaseSimple;
      this.Id = simpleFalsa.Id;
      this.Name = simpleFalsa.Name;
      this._fal_iidcuenta = simpleFalsa.fal_iidcuenta;
      this._fal_nmargen = simpleFalsa.fal_nmargen;
      this._fal_nmeses = simpleFalsa.fal_nmeses;
      this._fal_mnota = simpleFalsa.fal_mnota;
      if (simpleFalsa.CallerObject != null)
        this.CallerObject = simpleFalsa.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerFalsa callerFalsa = new CallerFalsa();
      callerFalsa.Id = this.Id;
      callerFalsa.Name = this.Name;
      callerFalsa.fal_iidcuenta = this._fal_iidcuenta;
      callerFalsa.fal_nmargen = this._fal_nmargen;
      callerFalsa.fal_nmeses = this._fal_nmeses;
      callerFalsa.fal_mnota = this._fal_mnota;
      return (CallerObject) callerFalsa;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("fal_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("fal_nmargen", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("fal_nmeses", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("fal_mnota", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["fal_iidcuenta"] = (object) this._fal_iidcuenta;
      row["fal_nmargen"] = (object) this._fal_nmargen;
      row["fal_nmeses"] = (object) this._fal_nmeses;
      row["fal_mnota"] = (object) this._fal_mnota;
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
        SimpleFalsa simpleFalsa = new SimpleFalsa();
        simpleFalsa.Id = sqlDataReader.GetInt32(0);
        simpleFalsa.Name = sqlDataReader.GetString(1);
        simpleFalsa.fal_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleFalsa.fal_nmargen = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
        simpleFalsa.fal_nmeses = sqlDataReader.IsDBNull(4) ? new Decimal(0) : sqlDataReader.GetDecimal(4);
        simpleFalsa.fal_mnota = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        simpleFalsa.CallerObject = Object.GetCallerObject();
        simpleFalsa.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleFalsa);
        objectCollection.Add((SimpleBaseObject) simpleFalsa);
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
        SimpleFalsa simpleFalsa = new SimpleFalsa();
        simpleFalsa.Id = (int) row["Id"];
        simpleFalsa.Name = (string) row["Name"];
        simpleFalsa.fal_iidcuenta = row["fal_iidcuenta"] == DBNull.Value ? 0 : (int) row["fal_iidcuenta"];
        simpleFalsa.fal_nmargen = row["fal_nmargen"] == DBNull.Value ? new Decimal(0) : (Decimal) row["fal_nmargen"];
        simpleFalsa.fal_nmeses = row["fal_nmeses"] == DBNull.Value ? new Decimal(0) : (Decimal) row["fal_nmeses"];
        simpleFalsa.fal_mnota = row["fal_mnota"] == DBNull.Value ? "" : (string) row["fal_mnota"];
        simpleFalsa.CallerObject = Object.GetCallerObject();
        simpleFalsa.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleFalsa);
        if (Recursive)
          simpleFalsa.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleFalsa, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleFalsa);
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
        SimpleFalsa simpleFalsa = new SimpleFalsa();
        simpleFalsa.Id = sqlDataReader.GetInt32(0);
        simpleFalsa.Name = sqlDataReader.GetString(1);
        simpleFalsa.fal_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleFalsa.fal_nmargen = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
        simpleFalsa.fal_nmeses = sqlDataReader.IsDBNull(4) ? new Decimal(0) : sqlDataReader.GetDecimal(4);
        simpleFalsa.fal_mnota = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        simpleFalsa.CallerObject = Object.GetCallerObject();
        simpleFalsa.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleFalsa);
        objectCollection.Add((SimpleBaseObject) simpleFalsa);
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

    public DataTable GetDataBySimpleObject(SimpleFalsa Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@fal_iidcuenta"].Value = (object) this._fal_iidcuenta;
      dataBySimpleObject.Parameters["@fal_nmargen"].Value = (object) this._fal_nmargen;
      dataBySimpleObject.Parameters["@fal_nmeses"].Value = (object) this._fal_nmeses;
      dataBySimpleObject.Parameters["@fal_mnota"].Value = this._fal_mnota == null ? (object) DBNull.Value : (object) this._fal_mnota;
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

    public IEnumerable<SimpleFalsa> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("FalsaByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleFalsa Simple = new SimpleFalsa();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.fal_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              Simple.fal_nmargen = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
              Simple.fal_nmeses = sqlDataReader.IsDBNull(4) ? new Decimal(0) : sqlDataReader.GetDecimal(4);
              Simple.fal_mnota = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
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
      this.Type = new ObjectType(3002, "Falsa");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("FalsaIns");
      this._CmdSel = new SqlCommand("FalsaSel");
      this._CmdUpd = new SqlCommand("FalsaUpd");
      this._CmdDel = new SqlCommand("FalsaDel");
      this._CmdChilds = new SqlCommand("FalsaByChildObject");
      this._CmdParents = new SqlCommand("FalsaByParentObject");
      this._CmdDataByName = new SqlCommand("FalsaByName");
      this._CmdDataByNameWithChild = new SqlCommand("FalsaByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("FalsaByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("FalsaBySimpleFalsa");
      this._CmdDataByText = new SqlCommand("FalsaByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@fal_iidcuenta", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@fal_nmargen", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@fal_nmeses", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@fal_mnota", SqlDbType.NText));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@fal_iidcuenta", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@fal_nmargen", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@fal_nmeses", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@fal_mnota", SqlDbType.NText));
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
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@fal_iidcuenta", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@fal_nmargen", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@fal_nmeses", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@fal_mnota", SqlDbType.NText));
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
        this._fal_iidcuenta = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        this._fal_nmargen = Reader.IsDBNull(3) ? new Decimal(0) : Reader.GetDecimal(3);
        this._fal_nmeses = Reader.IsDBNull(4) ? new Decimal(0) : Reader.GetDecimal(4);
        this._fal_mnota = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
      }
      Reader.Close();
    }
  }
}
