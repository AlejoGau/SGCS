// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalHorarioAlternativo
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
  public class DalHorarioAlternativo : TransactionObject
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
    private int _alt_iidcuenta;
    private Decimal _alt_ndiaapertura;
    private string _alt_choraapertura;
    private Decimal _alt_ndiacierre;
    private string _alt_choracierre;

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

    public int alt_iidcuenta
    {
      get
      {
        return this._alt_iidcuenta;
      }
      set
      {
        this._alt_iidcuenta = value;
      }
    }

    public Decimal alt_ndiaapertura
    {
      get
      {
        return this._alt_ndiaapertura;
      }
      set
      {
        this._alt_ndiaapertura = value;
      }
    }

    public string alt_choraapertura
    {
      get
      {
        return this._alt_choraapertura;
      }
      set
      {
        this._alt_choraapertura = value;
      }
    }

    public Decimal alt_ndiacierre
    {
      get
      {
        return this._alt_ndiacierre;
      }
      set
      {
        this._alt_ndiacierre = value;
      }
    }

    public string alt_choracierre
    {
      get
      {
        return this._alt_choracierre;
      }
      set
      {
        this._alt_choracierre = value;
      }
    }

    public DalHorarioAlternativo(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalHorarioAlternativo(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalHorarioAlternativo(SqlHelper SqlConfig, int UserId, SimpleHorarioAlternativo Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._alt_iidcuenta = Simple.alt_iidcuenta;
      this._alt_ndiaapertura = Simple.alt_ndiaapertura;
      this._alt_choraapertura = Simple.alt_choraapertura;
      this._alt_ndiacierre = Simple.alt_ndiacierre;
      this._alt_choracierre = Simple.alt_choracierre;
    }

    ~DalHorarioAlternativo()
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
          cmdIns.Parameters["@alt_iidcuenta"].Value = (object) this._alt_iidcuenta;
          cmdIns.Parameters["@alt_ndiaapertura"].Value = (object) this._alt_ndiaapertura;
          cmdIns.Parameters["@alt_choraapertura"].Value = this._alt_choraapertura == null ? (object) DBNull.Value : (object) this._alt_choraapertura;
          cmdIns.Parameters["@alt_ndiacierre"].Value = (object) this._alt_ndiacierre;
          cmdIns.Parameters["@alt_choracierre"].Value = this._alt_choracierre == null ? (object) DBNull.Value : (object) this._alt_choracierre;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@alt_iidcuenta"].Value = (object) this._alt_iidcuenta;
          cmdUpd.Parameters["@alt_ndiaapertura"].Value = (object) this._alt_ndiaapertura;
          cmdUpd.Parameters["@alt_choraapertura"].Value = this._alt_choraapertura == null ? (object) DBNull.Value : (object) this._alt_choraapertura;
          cmdUpd.Parameters["@alt_ndiacierre"].Value = (object) this._alt_ndiacierre;
          cmdUpd.Parameters["@alt_choracierre"].Value = this._alt_choracierre == null ? (object) DBNull.Value : (object) this._alt_choracierre;
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
        throw new RuntimeException("The HorarioAlternativo is null");
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
      SimpleHorarioAlternativo horarioAlternativo = new SimpleHorarioAlternativo();
      horarioAlternativo.Id = this.Id;
      horarioAlternativo.Name = this.Name;
      horarioAlternativo.alt_iidcuenta = this._alt_iidcuenta;
      horarioAlternativo.alt_ndiaapertura = this._alt_ndiaapertura;
      horarioAlternativo.alt_choraapertura = this._alt_choraapertura;
      horarioAlternativo.alt_ndiacierre = this._alt_ndiacierre;
      horarioAlternativo.alt_choracierre = this._alt_choracierre;
      if (this.CallerObject != null)
        horarioAlternativo.CallerObject = this.CallerObject;
      return (SimpleBaseObject) horarioAlternativo;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleHorarioAlternativo horarioAlternativo = (SimpleHorarioAlternativo) BaseSimple;
      this.Id = horarioAlternativo.Id;
      this.Name = horarioAlternativo.Name;
      this._alt_iidcuenta = horarioAlternativo.alt_iidcuenta;
      this._alt_ndiaapertura = horarioAlternativo.alt_ndiaapertura;
      this._alt_choraapertura = horarioAlternativo.alt_choraapertura;
      this._alt_ndiacierre = horarioAlternativo.alt_ndiacierre;
      this._alt_choracierre = horarioAlternativo.alt_choracierre;
      if (horarioAlternativo.CallerObject != null)
        this.CallerObject = horarioAlternativo.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioAlternativo horarioAlternativo = new CallerHorarioAlternativo();
      horarioAlternativo.Id = this.Id;
      horarioAlternativo.Name = this.Name;
      horarioAlternativo.alt_iidcuenta = this._alt_iidcuenta;
      horarioAlternativo.alt_ndiaapertura = this._alt_ndiaapertura;
      horarioAlternativo.alt_choraapertura = this._alt_choraapertura;
      horarioAlternativo.alt_ndiacierre = this._alt_ndiacierre;
      horarioAlternativo.alt_choracierre = this._alt_choracierre;
      return (CallerObject) horarioAlternativo;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("alt_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("alt_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("alt_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("alt_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("alt_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["alt_iidcuenta"] = (object) this._alt_iidcuenta;
      row["alt_ndiaapertura"] = (object) this._alt_ndiaapertura;
      row["alt_choraapertura"] = (object) this._alt_choraapertura;
      row["alt_ndiacierre"] = (object) this._alt_ndiacierre;
      row["alt_choracierre"] = (object) this._alt_choracierre;
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
        SimpleHorarioAlternativo horarioAlternativo = new SimpleHorarioAlternativo();
        horarioAlternativo.Id = sqlDataReader.GetInt32(0);
        horarioAlternativo.Name = sqlDataReader.GetString(1);
        horarioAlternativo.alt_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        horarioAlternativo.alt_ndiaapertura = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
        horarioAlternativo.alt_choraapertura = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        horarioAlternativo.alt_ndiacierre = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
        horarioAlternativo.alt_choracierre = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        horarioAlternativo.CallerObject = Object.GetCallerObject();
        horarioAlternativo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) horarioAlternativo);
        objectCollection.Add((SimpleBaseObject) horarioAlternativo);
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
        SimpleHorarioAlternativo horarioAlternativo = new SimpleHorarioAlternativo();
        horarioAlternativo.Id = (int) row["Id"];
        horarioAlternativo.Name = (string) row["Name"];
        horarioAlternativo.alt_iidcuenta = row["alt_iidcuenta"] == DBNull.Value ? 0 : (int) row["alt_iidcuenta"];
        horarioAlternativo.alt_ndiaapertura = row["alt_ndiaapertura"] == DBNull.Value ? new Decimal(0) : (Decimal) row["alt_ndiaapertura"];
        horarioAlternativo.alt_choraapertura = row["alt_choraapertura"] == DBNull.Value ? "" : (string) row["alt_choraapertura"];
        horarioAlternativo.alt_ndiacierre = row["alt_ndiacierre"] == DBNull.Value ? new Decimal(0) : (Decimal) row["alt_ndiacierre"];
        horarioAlternativo.alt_choracierre = row["alt_choracierre"] == DBNull.Value ? "" : (string) row["alt_choracierre"];
        horarioAlternativo.CallerObject = Object.GetCallerObject();
        horarioAlternativo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) horarioAlternativo);
        if (Recursive)
          horarioAlternativo.Dependencies = this.GetChildsByObject((SimpleBaseObject) horarioAlternativo, Recursive);
        objectCollection.Add((SimpleBaseObject) horarioAlternativo);
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
        SimpleHorarioAlternativo horarioAlternativo = new SimpleHorarioAlternativo();
        horarioAlternativo.Id = sqlDataReader.GetInt32(0);
        horarioAlternativo.Name = sqlDataReader.GetString(1);
        horarioAlternativo.alt_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        horarioAlternativo.alt_ndiaapertura = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
        horarioAlternativo.alt_choraapertura = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        horarioAlternativo.alt_ndiacierre = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
        horarioAlternativo.alt_choracierre = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        horarioAlternativo.CallerObject = Object.GetCallerObject();
        horarioAlternativo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) horarioAlternativo);
        objectCollection.Add((SimpleBaseObject) horarioAlternativo);
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

    public DataTable GetDataBySimpleObject(SimpleHorarioAlternativo Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@alt_iidcuenta"].Value = (object) this._alt_iidcuenta;
      dataBySimpleObject.Parameters["@alt_ndiaapertura"].Value = (object) this._alt_ndiaapertura;
      dataBySimpleObject.Parameters["@alt_choraapertura"].Value = this._alt_choraapertura == null ? (object) DBNull.Value : (object) this._alt_choraapertura;
      dataBySimpleObject.Parameters["@alt_ndiacierre"].Value = (object) this._alt_ndiacierre;
      dataBySimpleObject.Parameters["@alt_choracierre"].Value = this._alt_choracierre == null ? (object) DBNull.Value : (object) this._alt_choracierre;
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

    public IEnumerable<SimpleHorarioAlternativo> GetByParent(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("HorarioAlternativoByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHorarioAlternativo Simple = new SimpleHorarioAlternativo();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.alt_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              Simple.alt_ndiaapertura = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
              Simple.alt_choraapertura = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              Simple.alt_ndiacierre = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              Simple.alt_choracierre = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
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
      this.Type = new ObjectType(3004, "HorarioAlternativo");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("HorarioAlternativoIns");
      this._CmdSel = new SqlCommand("HorarioAlternativoSel");
      this._CmdUpd = new SqlCommand("HorarioAlternativoUpd");
      this._CmdDel = new SqlCommand("HorarioAlternativoDel");
      this._CmdChilds = new SqlCommand("HorarioAlternativoByChildObject");
      this._CmdParents = new SqlCommand("HorarioAlternativoByParentObject");
      this._CmdDataByName = new SqlCommand("HorarioAlternativoByName");
      this._CmdDataByNameWithChild = new SqlCommand("HorarioAlternativoByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("HorarioAlternativoByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("HorarioAlternativoBySimpleHorarioAlternativo");
      this._CmdDataByText = new SqlCommand("HorarioAlternativoByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@alt_iidcuenta", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@alt_ndiaapertura", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@alt_choraapertura", SqlDbType.NChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@alt_ndiacierre", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@alt_choracierre", SqlDbType.NChar));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@alt_iidcuenta", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@alt_ndiaapertura", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@alt_choraapertura", SqlDbType.NChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@alt_ndiacierre", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@alt_choracierre", SqlDbType.NChar));
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
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@alt_iidcuenta", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@alt_ndiaapertura", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@alt_choraapertura", SqlDbType.NChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@alt_ndiacierre", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@alt_choracierre", SqlDbType.NChar));
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
        this._alt_iidcuenta = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        this._alt_ndiaapertura = Reader.IsDBNull(3) ? new Decimal(0) : Reader.GetDecimal(3);
        this._alt_choraapertura = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        this._alt_ndiacierre = Reader.IsDBNull(5) ? new Decimal(0) : Reader.GetDecimal(5);
        this._alt_choracierre = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
      }
      Reader.Close();
    }
  }
}
