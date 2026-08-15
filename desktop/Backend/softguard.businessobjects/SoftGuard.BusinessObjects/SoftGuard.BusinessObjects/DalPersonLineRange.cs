// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalPersonLineRange
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
  public class DalPersonLineRange : TransactionObject
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
    private string _Code;
    private int _RangeStart;
    private int _RangeEnd;
    private int _PersonId;

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

    public string Code
    {
      get
      {
        return this._Code;
      }
      set
      {
        this._Code = value;
      }
    }

    public int RangeStart
    {
      get
      {
        return this._RangeStart;
      }
      set
      {
        this._RangeStart = value;
      }
    }

    public int RangeEnd
    {
      get
      {
        return this._RangeEnd;
      }
      set
      {
        this._RangeEnd = value;
      }
    }

    public int PersonId
    {
      get
      {
        return this._PersonId;
      }
      set
      {
        this._PersonId = value;
      }
    }

    public DalPersonLineRange(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalPersonLineRange(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalPersonLineRange(SqlHelper SqlConfig, int UserId, SimplePersonLineRange Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Code = Simple.Code;
      this._RangeStart = Simple.RangeStart;
      this._RangeEnd = Simple.RangeEnd;
      this._PersonId = Simple.PersonId;
    }

    ~DalPersonLineRange()
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
          cmdIns.Parameters["@Code"].Value = this._Code == null ? (object) DBNull.Value : (object) this._Code;
          cmdIns.Parameters["@RangeStart"].Value = (object) this._RangeStart;
          cmdIns.Parameters["@RangeEnd"].Value = (object) this._RangeEnd;
          cmdIns.Parameters["@PersonId"].Value = (object) this._PersonId;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@Code"].Value = this._Code == null ? (object) DBNull.Value : (object) this._Code;
          cmdUpd.Parameters["@RangeStart"].Value = (object) this._RangeStart;
          cmdUpd.Parameters["@RangeEnd"].Value = (object) this._RangeEnd;
          cmdUpd.Parameters["@PersonId"].Value = (object) this._PersonId;
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
        throw new RuntimeException("The PersonLineRange is null");
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
      SimplePersonLineRange simplePersonLineRange = new SimplePersonLineRange();
      simplePersonLineRange.Id = this.Id;
      simplePersonLineRange.Name = this.Name;
      simplePersonLineRange.Code = this._Code;
      simplePersonLineRange.RangeStart = this._RangeStart;
      simplePersonLineRange.RangeEnd = this._RangeEnd;
      simplePersonLineRange.PersonId = this._PersonId;
      if (this.CallerObject != null)
        simplePersonLineRange.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplePersonLineRange;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimplePersonLineRange simplePersonLineRange = (SimplePersonLineRange) BaseSimple;
      this.Id = simplePersonLineRange.Id;
      this.Name = simplePersonLineRange.Name;
      this._Code = simplePersonLineRange.Code;
      this._RangeStart = simplePersonLineRange.RangeStart;
      this._RangeEnd = simplePersonLineRange.RangeEnd;
      this._PersonId = simplePersonLineRange.PersonId;
      if (simplePersonLineRange.CallerObject != null)
        this.CallerObject = simplePersonLineRange.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerPersonLineRange callerPersonLineRange = new CallerPersonLineRange();
      callerPersonLineRange.Id = this.Id;
      callerPersonLineRange.Name = this.Name;
      callerPersonLineRange.Code = this._Code;
      callerPersonLineRange.RangeStart = this._RangeStart;
      callerPersonLineRange.RangeEnd = this._RangeEnd;
      callerPersonLineRange.PersonId = this._PersonId;
      return (CallerObject) callerPersonLineRange;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Code", typeof (string)));
      dataTable.Columns.Add(new DataColumn("RangeStart", typeof (int)));
      dataTable.Columns.Add(new DataColumn("RangeEnd", typeof (int)));
      dataTable.Columns.Add(new DataColumn("PersonId", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Code"] = (object) this._Code;
      row["RangeStart"] = (object) this._RangeStart;
      row["RangeEnd"] = (object) this._RangeEnd;
      row["PersonId"] = (object) this._PersonId;
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
        SimplePersonLineRange simplePersonLineRange = new SimplePersonLineRange();
        simplePersonLineRange.Id = sqlDataReader.GetInt32(0);
        simplePersonLineRange.Name = sqlDataReader.GetString(1);
        simplePersonLineRange.Code = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
        simplePersonLineRange.RangeStart = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simplePersonLineRange.RangeEnd = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
        simplePersonLineRange.PersonId = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
        simplePersonLineRange.CallerObject = Object.GetCallerObject();
        simplePersonLineRange.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplePersonLineRange);
        objectCollection.Add((SimpleBaseObject) simplePersonLineRange);
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
        SimplePersonLineRange simplePersonLineRange = new SimplePersonLineRange();
        simplePersonLineRange.Id = (int) row["Id"];
        simplePersonLineRange.Name = (string) row["Name"];
        simplePersonLineRange.Code = row["Code"] == DBNull.Value ? "" : (string) row["Code"];
        simplePersonLineRange.RangeStart = row["RangeStart"] == DBNull.Value ? 0 : (int) row["RangeStart"];
        simplePersonLineRange.RangeEnd = row["RangeEnd"] == DBNull.Value ? 0 : (int) row["RangeEnd"];
        simplePersonLineRange.PersonId = row["PersonId"] == DBNull.Value ? 0 : (int) row["PersonId"];
        simplePersonLineRange.CallerObject = Object.GetCallerObject();
        simplePersonLineRange.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplePersonLineRange);
        if (Recursive)
          simplePersonLineRange.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplePersonLineRange, Recursive);
        objectCollection.Add((SimpleBaseObject) simplePersonLineRange);
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
        SimplePersonLineRange simplePersonLineRange = new SimplePersonLineRange();
        simplePersonLineRange.Id = sqlDataReader.GetInt32(0);
        simplePersonLineRange.Name = sqlDataReader.GetString(1);
        simplePersonLineRange.Code = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
        simplePersonLineRange.RangeStart = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simplePersonLineRange.RangeEnd = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
        simplePersonLineRange.PersonId = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
        simplePersonLineRange.CallerObject = Object.GetCallerObject();
        simplePersonLineRange.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplePersonLineRange);
        objectCollection.Add((SimpleBaseObject) simplePersonLineRange);
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

    public DataTable GetDataBySimpleObject(SimplePersonLineRange Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@Code"].Value = this._Code == null ? (object) DBNull.Value : (object) this._Code;
      dataBySimpleObject.Parameters["@RangeStart"].Value = (object) this._RangeStart;
      dataBySimpleObject.Parameters["@RangeEnd"].Value = (object) this._RangeEnd;
      dataBySimpleObject.Parameters["@PersonId"].Value = (object) this._PersonId;
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

    public IEnumerable<SimplePersonLineRange> GetByParent(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("PersonLineRangeByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimplePersonLineRange Simple = new SimplePersonLineRange();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.Code = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              Simple.RangeStart = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              Simple.RangeEnd = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              Simple.PersonId = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
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
      this.Type = new ObjectType(3035, "PersonLineRange");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("PersonLineRangeIns");
      this._CmdSel = new SqlCommand("PersonLineRangeSel");
      this._CmdUpd = new SqlCommand("PersonLineRangeUpd");
      this._CmdDel = new SqlCommand("PersonLineRangeDel");
      this._CmdChilds = new SqlCommand("PersonLineRangeByChildObject");
      this._CmdParents = new SqlCommand("PersonLineRangeByParentObject");
      this._CmdDataByName = new SqlCommand("PersonLineRangeByName");
      this._CmdDataByNameWithChild = new SqlCommand("PersonLineRangeByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("PersonLineRangeByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("PersonLineRangeBySimplePersonLineRange");
      this._CmdDataByText = new SqlCommand("PersonLineRangeByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@RangeStart", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@RangeEnd", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@PersonId", SqlDbType.Int));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@RangeStart", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@RangeEnd", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@PersonId", SqlDbType.Int));
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
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@RangeStart", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@RangeEnd", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@PersonId", SqlDbType.Int));
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
        this._Code = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        this._RangeStart = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        this._RangeEnd = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        this._PersonId = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
      }
      Reader.Close();
    }
  }
}
