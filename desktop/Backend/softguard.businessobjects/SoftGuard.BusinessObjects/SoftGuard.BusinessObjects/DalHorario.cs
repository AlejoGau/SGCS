// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalHorario
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
  public class DalHorario : TransactionObject
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
    private int _hor_iidcuenta;
    private Decimal _hor_ndiaapertura;
    private string _hor_choraapertura;
    private Decimal _hor_ndiacierre;
    private string _hor_choracierre;

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

    public int hor_iidcuenta
    {
      get
      {
        return this._hor_iidcuenta;
      }
      set
      {
        this._hor_iidcuenta = value;
      }
    }

    public Decimal hor_ndiaapertura
    {
      get
      {
        return this._hor_ndiaapertura;
      }
      set
      {
        this._hor_ndiaapertura = value;
      }
    }

    public string hor_choraapertura
    {
      get
      {
        return this._hor_choraapertura;
      }
      set
      {
        this._hor_choraapertura = value;
      }
    }

    public Decimal hor_ndiacierre
    {
      get
      {
        return this._hor_ndiacierre;
      }
      set
      {
        this._hor_ndiacierre = value;
      }
    }

    public string hor_choracierre
    {
      get
      {
        return this._hor_choracierre;
      }
      set
      {
        this._hor_choracierre = value;
      }
    }

    public DalHorario(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalHorario(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalHorario(SqlHelper SqlConfig, int UserId, SimpleHorario Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._hor_iidcuenta = Simple.hor_iidcuenta;
      this._hor_ndiaapertura = Simple.hor_ndiaapertura;
      this._hor_choraapertura = Simple.hor_choraapertura;
      this._hor_ndiacierre = Simple.hor_ndiacierre;
      this._hor_choracierre = Simple.hor_choracierre;
    }

    ~DalHorario()
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
          cmdIns.Parameters["@hor_iidcuenta"].Value = (object) this._hor_iidcuenta;
          cmdIns.Parameters["@hor_ndiaapertura"].Value = (object) this._hor_ndiaapertura;
          cmdIns.Parameters["@hor_choraapertura"].Value = this._hor_choraapertura == null ? (object) DBNull.Value : (object) this._hor_choraapertura;
          cmdIns.Parameters["@hor_ndiacierre"].Value = (object) this._hor_ndiacierre;
          cmdIns.Parameters["@hor_choracierre"].Value = this._hor_choracierre == null ? (object) DBNull.Value : (object) this._hor_choracierre;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@hor_iidcuenta"].Value = (object) this._hor_iidcuenta;
          cmdUpd.Parameters["@hor_ndiaapertura"].Value = (object) this._hor_ndiaapertura;
          cmdUpd.Parameters["@hor_choraapertura"].Value = this._hor_choraapertura == null ? (object) DBNull.Value : (object) this._hor_choraapertura;
          cmdUpd.Parameters["@hor_ndiacierre"].Value = (object) this._hor_ndiacierre;
          cmdUpd.Parameters["@hor_choracierre"].Value = this._hor_choracierre == null ? (object) DBNull.Value : (object) this._hor_choracierre;
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
        throw new RuntimeException("The Horario is null");
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
      SimpleHorario simpleHorario = new SimpleHorario();
      simpleHorario.Id = this.Id;
      simpleHorario.Name = this.Name;
      simpleHorario.hor_iidcuenta = this._hor_iidcuenta;
      simpleHorario.hor_ndiaapertura = this._hor_ndiaapertura;
      simpleHorario.hor_choraapertura = this._hor_choraapertura;
      simpleHorario.hor_ndiacierre = this._hor_ndiacierre;
      simpleHorario.hor_choracierre = this._hor_choracierre;
      if (this.CallerObject != null)
        simpleHorario.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleHorario;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleHorario simpleHorario = (SimpleHorario) BaseSimple;
      this.Id = simpleHorario.Id;
      this.Name = simpleHorario.Name;
      this._hor_iidcuenta = simpleHorario.hor_iidcuenta;
      this._hor_ndiaapertura = simpleHorario.hor_ndiaapertura;
      this._hor_choraapertura = simpleHorario.hor_choraapertura;
      this._hor_ndiacierre = simpleHorario.hor_ndiacierre;
      this._hor_choracierre = simpleHorario.hor_choracierre;
      if (simpleHorario.CallerObject != null)
        this.CallerObject = simpleHorario.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorario callerHorario = new CallerHorario();
      callerHorario.Id = this.Id;
      callerHorario.Name = this.Name;
      callerHorario.hor_iidcuenta = this._hor_iidcuenta;
      callerHorario.hor_ndiaapertura = this._hor_ndiaapertura;
      callerHorario.hor_choraapertura = this._hor_choraapertura;
      callerHorario.hor_ndiacierre = this._hor_ndiacierre;
      callerHorario.hor_choracierre = this._hor_choracierre;
      return (CallerObject) callerHorario;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("hor_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("hor_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("hor_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("hor_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("hor_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["hor_iidcuenta"] = (object) this._hor_iidcuenta;
      row["hor_ndiaapertura"] = (object) this._hor_ndiaapertura;
      row["hor_choraapertura"] = (object) this._hor_choraapertura;
      row["hor_ndiacierre"] = (object) this._hor_ndiacierre;
      row["hor_choracierre"] = (object) this._hor_choracierre;
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
        SimpleHorario simpleHorario = new SimpleHorario();
        simpleHorario.Id = sqlDataReader.GetInt32(0);
        simpleHorario.Name = sqlDataReader.GetString(1);
        simpleHorario.hor_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleHorario.hor_ndiaapertura = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
        simpleHorario.hor_choraapertura = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        simpleHorario.hor_ndiacierre = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
        simpleHorario.hor_choracierre = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        simpleHorario.CallerObject = Object.GetCallerObject();
        simpleHorario.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleHorario);
        objectCollection.Add((SimpleBaseObject) simpleHorario);
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
        SimpleHorario simpleHorario = new SimpleHorario();
        simpleHorario.Id = (int) row["Id"];
        simpleHorario.Name = (string) row["Name"];
        simpleHorario.hor_iidcuenta = row["hor_iidcuenta"] == DBNull.Value ? 0 : (int) row["hor_iidcuenta"];
        simpleHorario.hor_ndiaapertura = row["hor_ndiaapertura"] == DBNull.Value ? new Decimal(0) : (Decimal) row["hor_ndiaapertura"];
        simpleHorario.hor_choraapertura = row["hor_choraapertura"] == DBNull.Value ? "" : (string) row["hor_choraapertura"];
        simpleHorario.hor_ndiacierre = row["hor_ndiacierre"] == DBNull.Value ? new Decimal(0) : (Decimal) row["hor_ndiacierre"];
        simpleHorario.hor_choracierre = row["hor_choracierre"] == DBNull.Value ? "" : (string) row["hor_choracierre"];
        simpleHorario.CallerObject = Object.GetCallerObject();
        simpleHorario.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleHorario);
        if (Recursive)
          simpleHorario.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleHorario, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleHorario);
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
        SimpleHorario simpleHorario = new SimpleHorario();
        simpleHorario.Id = sqlDataReader.GetInt32(0);
        simpleHorario.Name = sqlDataReader.GetString(1);
        simpleHorario.hor_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleHorario.hor_ndiaapertura = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
        simpleHorario.hor_choraapertura = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        simpleHorario.hor_ndiacierre = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
        simpleHorario.hor_choracierre = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        simpleHorario.CallerObject = Object.GetCallerObject();
        simpleHorario.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleHorario);
        objectCollection.Add((SimpleBaseObject) simpleHorario);
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

    public DataTable GetDataBySimpleObject(SimpleHorario Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@hor_iidcuenta"].Value = (object) this._hor_iidcuenta;
      dataBySimpleObject.Parameters["@hor_ndiaapertura"].Value = (object) this._hor_ndiaapertura;
      dataBySimpleObject.Parameters["@hor_choraapertura"].Value = this._hor_choraapertura == null ? (object) DBNull.Value : (object) this._hor_choraapertura;
      dataBySimpleObject.Parameters["@hor_ndiacierre"].Value = (object) this._hor_ndiacierre;
      dataBySimpleObject.Parameters["@hor_choracierre"].Value = this._hor_choracierre == null ? (object) DBNull.Value : (object) this._hor_choracierre;
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

    public IEnumerable<SimpleHorario> GetByParent(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("HorarioByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHorario Simple = new SimpleHorario();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.hor_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              Simple.hor_ndiaapertura = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
              Simple.hor_choraapertura = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              Simple.hor_ndiacierre = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              Simple.hor_choracierre = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
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
      this.Type = new ObjectType(3003, "Horario");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("HorarioIns");
      this._CmdSel = new SqlCommand("HorarioSel");
      this._CmdUpd = new SqlCommand("HorarioUpd");
      this._CmdDel = new SqlCommand("HorarioDel");
      this._CmdChilds = new SqlCommand("HorarioByChildObject");
      this._CmdParents = new SqlCommand("HorarioByParentObject");
      this._CmdDataByName = new SqlCommand("HorarioByName");
      this._CmdDataByNameWithChild = new SqlCommand("HorarioByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("HorarioByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("HorarioBySimpleHorario");
      this._CmdDataByText = new SqlCommand("HorarioByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@hor_iidcuenta", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@hor_ndiaapertura", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@hor_choraapertura", SqlDbType.NChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@hor_ndiacierre", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@hor_choracierre", SqlDbType.NChar));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@hor_iidcuenta", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@hor_ndiaapertura", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@hor_choraapertura", SqlDbType.NChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@hor_ndiacierre", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@hor_choracierre", SqlDbType.NChar));
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
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@hor_iidcuenta", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@hor_ndiaapertura", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@hor_choraapertura", SqlDbType.NChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@hor_ndiacierre", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@hor_choracierre", SqlDbType.NChar));
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
        this._hor_iidcuenta = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        this._hor_ndiaapertura = Reader.IsDBNull(3) ? new Decimal(0) : Reader.GetDecimal(3);
        this._hor_choraapertura = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        this._hor_ndiacierre = Reader.IsDBNull(5) ? new Decimal(0) : Reader.GetDecimal(5);
        this._hor_choracierre = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
      }
      Reader.Close();
    }
  }
}
