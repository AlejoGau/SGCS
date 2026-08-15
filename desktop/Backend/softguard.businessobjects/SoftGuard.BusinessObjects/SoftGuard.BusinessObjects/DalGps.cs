// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalGps
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
  public class DalGps : TransactionObject
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
    private DateTime _gps_tfechahora;
    private int _gps_idCuenta;
    private int _gps_idRec;
    private float _gps_rLatitud;
    private float _gps_rLongitud;

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

    public DateTime gps_tfechahora
    {
      get
      {
        return this._gps_tfechahora;
      }
      set
      {
        this._gps_tfechahora = value;
      }
    }

    public int gps_idCuenta
    {
      get
      {
        return this._gps_idCuenta;
      }
      set
      {
        this._gps_idCuenta = value;
      }
    }

    public int gps_idRec
    {
      get
      {
        return this._gps_idRec;
      }
      set
      {
        this._gps_idRec = value;
      }
    }

    public float gps_rLatitud
    {
      get
      {
        return this._gps_rLatitud;
      }
      set
      {
        this._gps_rLatitud = value;
      }
    }

    public float gps_rLongitud
    {
      get
      {
        return this._gps_rLongitud;
      }
      set
      {
        this._gps_rLongitud = value;
      }
    }

    public DalGps(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalGps(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalGps(SqlHelper SqlConfig, int UserId, SimpleGps Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._gps_tfechahora = Simple.gps_tfechahora;
      this._gps_idCuenta = Simple.gps_idCuenta;
      this._gps_idRec = Simple.gps_idRec;
      this._gps_rLatitud = Simple.gps_rLatitud;
      this._gps_rLongitud = Simple.gps_rLongitud;
    }

    ~DalGps()
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
          cmdIns.Parameters["@gps_tfechahora"].Value = this._gps_tfechahora == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._gps_tfechahora;
          cmdIns.Parameters["@gps_idCuenta"].Value = (object) this._gps_idCuenta;
          cmdIns.Parameters["@gps_idRec"].Value = (object) this._gps_idRec;
          cmdIns.Parameters["@gps_rLatitud"].Value = (object) this._gps_rLatitud;
          cmdIns.Parameters["@gps_rLongitud"].Value = (object) this._gps_rLongitud;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@gps_tfechahora"].Value = this._gps_tfechahora == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._gps_tfechahora;
          cmdUpd.Parameters["@gps_idCuenta"].Value = (object) this._gps_idCuenta;
          cmdUpd.Parameters["@gps_idRec"].Value = (object) this._gps_idRec;
          cmdUpd.Parameters["@gps_rLatitud"].Value = (object) this._gps_rLatitud;
          cmdUpd.Parameters["@gps_rLongitud"].Value = (object) this._gps_rLongitud;
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
        throw new RuntimeException("The Gps is null");
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
      SimpleGps simpleGps = new SimpleGps();
      simpleGps.Id = this.Id;
      simpleGps.Name = this.Name;
      simpleGps.gps_tfechahora = this._gps_tfechahora;
      simpleGps.gps_idCuenta = this._gps_idCuenta;
      simpleGps.gps_idRec = this._gps_idRec;
      simpleGps.gps_rLatitud = this._gps_rLatitud;
      simpleGps.gps_rLongitud = this._gps_rLongitud;
      if (this.CallerObject != null)
        simpleGps.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleGps;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleGps simpleGps = (SimpleGps) BaseSimple;
      this.Id = simpleGps.Id;
      this.Name = simpleGps.Name;
      this._gps_tfechahora = simpleGps.gps_tfechahora;
      this._gps_idCuenta = simpleGps.gps_idCuenta;
      this._gps_idRec = simpleGps.gps_idRec;
      this._gps_rLatitud = simpleGps.gps_rLatitud;
      this._gps_rLongitud = simpleGps.gps_rLongitud;
      if (simpleGps.CallerObject != null)
        this.CallerObject = simpleGps.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerGps callerGps = new CallerGps();
      callerGps.Id = this.Id;
      callerGps.Name = this.Name;
      callerGps.gps_tfechahora = this._gps_tfechahora;
      callerGps.gps_idCuenta = this._gps_idCuenta;
      callerGps.gps_idRec = this._gps_idRec;
      callerGps.gps_rLatitud = this._gps_rLatitud;
      callerGps.gps_rLongitud = this._gps_rLongitud;
      return (CallerObject) callerGps;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("gps_tfechahora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("gps_idCuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("gps_idRec", typeof (int)));
      dataTable.Columns.Add(new DataColumn("gps_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("gps_rLongitud", typeof (float)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["gps_tfechahora"] = (object) this._gps_tfechahora;
      row["gps_idCuenta"] = (object) this._gps_idCuenta;
      row["gps_idRec"] = (object) this._gps_idRec;
      row["gps_rLatitud"] = (object) this._gps_rLatitud;
      row["gps_rLongitud"] = (object) this._gps_rLongitud;
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
        SimpleGps simpleGps = new SimpleGps();
        simpleGps.Id = sqlDataReader.GetInt32(0);
        simpleGps.Name = sqlDataReader.GetString(1);
        simpleGps.gps_tfechahora = sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2);
        simpleGps.gps_idCuenta = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simpleGps.gps_idRec = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
        simpleGps.gps_rLatitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
        simpleGps.gps_rLongitud = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
        simpleGps.CallerObject = Object.GetCallerObject();
        simpleGps.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleGps);
        objectCollection.Add((SimpleBaseObject) simpleGps);
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
        SimpleGps simpleGps = new SimpleGps();
        simpleGps.Id = (int) row["Id"];
        simpleGps.Name = (string) row["Name"];
        simpleGps.gps_tfechahora = row["gps_tfechahora"] == DBNull.Value ? new DateTime(1, 1, 1) : (DateTime) row["gps_tfechahora"];
        simpleGps.gps_idCuenta = row["gps_idCuenta"] == DBNull.Value ? 0 : (int) row["gps_idCuenta"];
        simpleGps.gps_idRec = row["gps_idRec"] == DBNull.Value ? 0 : (int) row["gps_idRec"];
        simpleGps.gps_rLatitud = row["gps_rLatitud"] == DBNull.Value ? 0.0f : (float) row["gps_rLatitud"];
        simpleGps.gps_rLongitud = row["gps_rLongitud"] == DBNull.Value ? 0.0f : (float) row["gps_rLongitud"];
        simpleGps.CallerObject = Object.GetCallerObject();
        simpleGps.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleGps);
        if (Recursive)
          simpleGps.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleGps, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleGps);
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
        SimpleGps simpleGps = new SimpleGps();
        simpleGps.Id = sqlDataReader.GetInt32(0);
        simpleGps.Name = sqlDataReader.GetString(1);
        simpleGps.gps_tfechahora = sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2);
        simpleGps.gps_idCuenta = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simpleGps.gps_idRec = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
        simpleGps.gps_rLatitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
        simpleGps.gps_rLongitud = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
        simpleGps.CallerObject = Object.GetCallerObject();
        simpleGps.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleGps);
        objectCollection.Add((SimpleBaseObject) simpleGps);
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

    public DataTable GetDataBySimpleObject(SimpleGps Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@gps_tfechahora"].Value = this._gps_tfechahora == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._gps_tfechahora;
      dataBySimpleObject.Parameters["@gps_idCuenta"].Value = (object) this._gps_idCuenta;
      dataBySimpleObject.Parameters["@gps_idRec"].Value = (object) this._gps_idRec;
      dataBySimpleObject.Parameters["@gps_rLatitud"].Value = (object) this._gps_rLatitud;
      dataBySimpleObject.Parameters["@gps_rLongitud"].Value = (object) this._gps_rLongitud;
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

    public IEnumerable<SimpleGps> GetByParent(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("GpsByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleGps Simple = new SimpleGps();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.gps_tfechahora = sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2);
              Simple.gps_idCuenta = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              Simple.gps_idRec = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              Simple.gps_rLatitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              Simple.gps_rLongitud = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
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
      this.Type = new ObjectType(3038, "Gps");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("GpsIns");
      this._CmdSel = new SqlCommand("GpsSel");
      this._CmdUpd = new SqlCommand("GpsUpd");
      this._CmdDel = new SqlCommand("GpsDel");
      this._CmdChilds = new SqlCommand("GpsByChildObject");
      this._CmdParents = new SqlCommand("GpsByParentObject");
      this._CmdDataByName = new SqlCommand("GpsByName");
      this._CmdDataByNameWithChild = new SqlCommand("GpsByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("GpsByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("GpsBySimpleGps");
      this._CmdDataByText = new SqlCommand("GpsByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@gps_tfechahora", SqlDbType.DateTime));
      this._CmdIns.Parameters.Add(new SqlParameter("@gps_idCuenta", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@gps_idRec", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@gps_rLatitud", SqlDbType.Real));
      this._CmdIns.Parameters.Add(new SqlParameter("@gps_rLongitud", SqlDbType.Real));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@gps_tfechahora", SqlDbType.DateTime));
      this._CmdUpd.Parameters.Add(new SqlParameter("@gps_idCuenta", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@gps_idRec", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@gps_rLatitud", SqlDbType.Real));
      this._CmdUpd.Parameters.Add(new SqlParameter("@gps_rLongitud", SqlDbType.Real));
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
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@gps_tfechahora", SqlDbType.DateTime));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@gps_idCuenta", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@gps_idRec", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@gps_rLatitud", SqlDbType.Real));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@gps_rLongitud", SqlDbType.Real));
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
        this._gps_tfechahora = Reader.IsDBNull(2) ? new DateTime(1, 1, 1) : Reader.GetDateTime(2);
        this._gps_idCuenta = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        this._gps_idRec = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        this._gps_rLatitud = Reader.IsDBNull(5) ? 0.0f : (float) Reader.GetValue(5);
        this._gps_rLongitud = Reader.IsDBNull(6) ? 0.0f : (float) Reader.GetValue(6);
      }
      Reader.Close();
    }
  }
}
