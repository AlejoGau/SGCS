// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalPoi
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
  public class DalPoi : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _FullAddress;
    private string _Icon;
    private string _Country;
    private string _State;
    private string _City;
    private string _Address;
    private string _Number;
    private double _Latitude;
    private double _Longitude;
    private string _CDealer;
    private int _Organization;

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

    public string FullAddress
    {
      get
      {
        return this._FullAddress;
      }
      set
      {
        this._FullAddress = value;
      }
    }

    public string Icon
    {
      get
      {
        return this._Icon;
      }
      set
      {
        this._Icon = value;
      }
    }

    public string Country
    {
      get
      {
        return this._Country;
      }
      set
      {
        this._Country = value;
      }
    }

    public string State
    {
      get
      {
        return this._State;
      }
      set
      {
        this._State = value;
      }
    }

    public string City
    {
      get
      {
        return this._City;
      }
      set
      {
        this._City = value;
      }
    }

    public string Address
    {
      get
      {
        return this._Address;
      }
      set
      {
        this._Address = value;
      }
    }

    public string Number
    {
      get
      {
        return this._Number;
      }
      set
      {
        this._Number = value;
      }
    }

    public double Latitude
    {
      get
      {
        return this._Latitude;
      }
      set
      {
        this._Latitude = value;
      }
    }

    public double Longitude
    {
      get
      {
        return this._Longitude;
      }
      set
      {
        this._Longitude = value;
      }
    }

    public string CDealer
    {
      get
      {
        return this._CDealer;
      }
      set
      {
        this._CDealer = value;
      }
    }

    public int Organization
    {
      get
      {
        return this._Organization;
      }
      set
      {
        this._Organization = value;
      }
    }

    public DalPoi(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalPoi(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalPoi(SqlHelper SqlConfig, int UserId, SimplePoi Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._FullAddress = Simple.FullAddress;
      this._Icon = Simple.Icon;
      this._Country = Simple.Country;
      this._State = Simple.State;
      this._City = Simple.City;
      this._Address = Simple.Address;
      this._Number = Simple.Number;
      this._Latitude = Simple.Latitude;
      this._Longitude = Simple.Longitude;
      this._CDealer = Simple.CDealer;
      this._Organization = Simple.Organization;
    }

    public override void BeginTran()
    {
    }

    public override void CommitTran()
    {
    }

    public override void RollbackTran()
    {
    }

    public override void EndTran()
    {
    }

    public override void Save()
    {
      base.Save();
      this.BeginTran();
      try
      {
        if (this.Id == 0)
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("PoiIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@FullAddress", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Icon", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Country", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@State", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@City", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Number", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Latitude", SqlDbType.Float));
              sqlCommand.Parameters.Add(new SqlParameter("@Longitude", SqlDbType.Float));
              sqlCommand.Parameters.Add(new SqlParameter("@CDealer", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Organization", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@FullAddress"].Value = this._FullAddress == null ? (object) DBNull.Value : (object) this._FullAddress;
              sqlCommand.Parameters["@Icon"].Value = this._Icon == null ? (object) DBNull.Value : (object) this._Icon;
              sqlCommand.Parameters["@Country"].Value = this._Country == null ? (object) DBNull.Value : (object) this._Country;
              sqlCommand.Parameters["@State"].Value = this._State == null ? (object) DBNull.Value : (object) this._State;
              sqlCommand.Parameters["@City"].Value = this._City == null ? (object) DBNull.Value : (object) this._City;
              sqlCommand.Parameters["@Address"].Value = this._Address == null ? (object) DBNull.Value : (object) this._Address;
              sqlCommand.Parameters["@Number"].Value = this._Number == null ? (object) DBNull.Value : (object) this._Number;
              sqlCommand.Parameters["@Latitude"].Value = (object) this._Latitude;
              sqlCommand.Parameters["@Longitude"].Value = (object) this._Longitude;
              sqlCommand.Parameters["@CDealer"].Value = this._CDealer == null ? (object) DBNull.Value : (object) this._CDealer;
              sqlCommand.Parameters["@Organization"].Value = (object) this._Organization;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("PoiUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@FullAddress", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Icon", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Country", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@State", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@City", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Number", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Latitude", SqlDbType.Float));
              sqlCommand.Parameters.Add(new SqlParameter("@Longitude", SqlDbType.Float));
              sqlCommand.Parameters.Add(new SqlParameter("@CDealer", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Organization", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@FullAddress"].Value = this._FullAddress == null ? (object) DBNull.Value : (object) this._FullAddress;
              sqlCommand.Parameters["@Icon"].Value = this._Icon == null ? (object) DBNull.Value : (object) this._Icon;
              sqlCommand.Parameters["@Country"].Value = this._Country == null ? (object) DBNull.Value : (object) this._Country;
              sqlCommand.Parameters["@State"].Value = this._State == null ? (object) DBNull.Value : (object) this._State;
              sqlCommand.Parameters["@City"].Value = this._City == null ? (object) DBNull.Value : (object) this._City;
              sqlCommand.Parameters["@Address"].Value = this._Address == null ? (object) DBNull.Value : (object) this._Address;
              sqlCommand.Parameters["@Number"].Value = this._Number == null ? (object) DBNull.Value : (object) this._Number;
              sqlCommand.Parameters["@Latitude"].Value = (object) this._Latitude;
              sqlCommand.Parameters["@Longitude"].Value = (object) this._Longitude;
              sqlCommand.Parameters["@CDealer"].Value = this._CDealer == null ? (object) DBNull.Value : (object) this._CDealer;
              sqlCommand.Parameters["@Organization"].Value = (object) this._Organization;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
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
        throw new RuntimeException("The Poi is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("PoiDel", connection))
          {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
            sqlCommand.Parameters["@Id"].Value = (object) this.Id;
            connection.Open();
            sqlCommand.ExecuteNonQuery();
          }
        }
      }
      finally
      {
        this.EndTran();
      }
    }

    public new virtual void Load(int Id)
    {
      base.Load(Id);
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("PoiSel", connection))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
          connection.Open();
          sqlCommand.Parameters["@Id"].Value = (object) Id;
          this.FillObject(sqlCommand.ExecuteReader());
          this.OriginalObject = this.GetSimpleObject();
        }
      }
    }

    public override BaseObject GetObject()
    {
      return (BaseObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimplePoi simplePoi = new SimplePoi();
      simplePoi.Id = this.Id;
      simplePoi.Name = this.Name;
      simplePoi.FullAddress = this._FullAddress;
      simplePoi.Icon = this._Icon;
      simplePoi.Country = this._Country;
      simplePoi.State = this._State;
      simplePoi.City = this._City;
      simplePoi.Address = this._Address;
      simplePoi.Number = this._Number;
      simplePoi.Latitude = this._Latitude;
      simplePoi.Longitude = this._Longitude;
      simplePoi.CDealer = this._CDealer;
      simplePoi.Organization = this._Organization;
      if (this.CallerObject != null)
        simplePoi.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplePoi;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimplePoi simplePoi = (SimplePoi) BaseSimple;
      this.Id = simplePoi.Id;
      this.Name = simplePoi.Name;
      this._FullAddress = simplePoi.FullAddress;
      this._Icon = simplePoi.Icon;
      this._Country = simplePoi.Country;
      this._State = simplePoi.State;
      this._City = simplePoi.City;
      this._Address = simplePoi.Address;
      this._Number = simplePoi.Number;
      this._Latitude = simplePoi.Latitude;
      this._Longitude = simplePoi.Longitude;
      this._CDealer = simplePoi.CDealer;
      this._Organization = simplePoi.Organization;
      if (simplePoi.CallerObject != null)
        this.CallerObject = simplePoi.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerPoi callerPoi = new CallerPoi();
      callerPoi.Id = this.Id;
      callerPoi.Name = this.Name;
      callerPoi.FullAddress = this._FullAddress;
      callerPoi.Icon = this._Icon;
      callerPoi.Country = this._Country;
      callerPoi.State = this._State;
      callerPoi.City = this._City;
      callerPoi.Address = this._Address;
      callerPoi.Number = this._Number;
      callerPoi.Latitude = this._Latitude;
      callerPoi.Longitude = this._Longitude;
      callerPoi.CDealer = this._CDealer;
      callerPoi.Organization = this._Organization;
      return (CallerObject) callerPoi;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("FullAddress", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Icon", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Country", typeof (string)));
      dataTable.Columns.Add(new DataColumn("State", typeof (string)));
      dataTable.Columns.Add(new DataColumn("City", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Address", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Number", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Latitude", typeof (double)));
      dataTable.Columns.Add(new DataColumn("Longitude", typeof (double)));
      dataTable.Columns.Add(new DataColumn("CDealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Organization", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["FullAddress"] = (object) this._FullAddress;
      row["Icon"] = (object) this._Icon;
      row["Country"] = (object) this._Country;
      row["State"] = (object) this._State;
      row["City"] = (object) this._City;
      row["Address"] = (object) this._Address;
      row["Number"] = (object) this._Number;
      row["Latitude"] = (object) this._Latitude;
      row["Longitude"] = (object) this._Longitude;
      row["CDealer"] = (object) this._CDealer;
      row["Organization"] = (object) this._Organization;
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
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiByChildObject", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
            selectCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
            selectCommand.Parameters["@Id"].Value = (object) Object.Id;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("PoiByChildObject", connection))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
          sqlCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
          sqlCommand.Parameters["@Id"].Value = (object) Object.Id;
          connection.Open();
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimplePoi simplePoi = new SimplePoi();
              simplePoi.Id = sqlDataReader.GetInt32(0);
              simplePoi.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplePoi.FullAddress = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplePoi.Icon = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplePoi.Country = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplePoi.State = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simplePoi.City = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simplePoi.Address = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simplePoi.Number = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simplePoi.Latitude = sqlDataReader.IsDBNull(9) ? 0.0 : (double) sqlDataReader.GetValue(9);
              if (sqlDataReader.FieldCount > 10)
                simplePoi.Longitude = sqlDataReader.IsDBNull(10) ? 0.0 : (double) sqlDataReader.GetValue(10);
              if (sqlDataReader.FieldCount > 11)
                simplePoi.CDealer = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
              if (sqlDataReader.FieldCount > 12)
                simplePoi.Organization = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              simplePoi.CallerObject = Object.GetCallerObject();
              simplePoi.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplePoi);
              objectCollection.Add((SimpleBaseObject) simplePoi);
            }
          }
          connection.Close();
        }
      }
      return objectCollection;
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      foreach (DataRow row in (InternalDataCollectionBase) this.GetDataChildsByObject(Object).Rows)
      {
        SimplePoi simplePoi = new SimplePoi();
        simplePoi.Id = (int) row["Id"];
        simplePoi.Name = (string) row["Name"];
        simplePoi.FullAddress = row["FullAddress"] == DBNull.Value ? "" : (string) row["FullAddress"];
        simplePoi.Icon = row["Icon"] == DBNull.Value ? "" : (string) row["Icon"];
        simplePoi.Country = row["Country"] == DBNull.Value ? "" : (string) row["Country"];
        simplePoi.State = row["State"] == DBNull.Value ? "" : (string) row["State"];
        simplePoi.City = row["City"] == DBNull.Value ? "" : (string) row["City"];
        simplePoi.Address = row["Address"] == DBNull.Value ? "" : (string) row["Address"];
        simplePoi.Number = row["Number"] == DBNull.Value ? "" : (string) row["Number"];
        simplePoi.Latitude = row["Latitude"] == DBNull.Value ? 0.0 : (double) row["Latitude"];
        simplePoi.Longitude = row["Longitude"] == DBNull.Value ? 0.0 : (double) row["Longitude"];
        simplePoi.CDealer = row["CDealer"] == DBNull.Value ? "" : (string) row["CDealer"];
        simplePoi.Organization = row["Organization"] == DBNull.Value ? 0 : (int) row["Organization"];
        simplePoi.CallerObject = Object.GetCallerObject();
        simplePoi.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplePoi);
        if (Recursive)
          simplePoi.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplePoi, Recursive);
        objectCollection.Add((SimpleBaseObject) simplePoi);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiByParentObject", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
            selectCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
            selectCommand.Parameters["@Id"].Value = (object) Object.Id;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("PoiByParentObject", connection))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
          sqlCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
          sqlCommand.Parameters["@Id"].Value = (object) Object.Id;
          connection.Open();
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimplePoi simplePoi = new SimplePoi();
              simplePoi.Id = sqlDataReader.GetInt32(0);
              simplePoi.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplePoi.FullAddress = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplePoi.Icon = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplePoi.Country = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplePoi.State = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simplePoi.City = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simplePoi.Address = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simplePoi.Number = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simplePoi.Latitude = sqlDataReader.IsDBNull(9) ? 0.0 : (double) sqlDataReader.GetValue(9);
              if (sqlDataReader.FieldCount > 10)
                simplePoi.Longitude = sqlDataReader.IsDBNull(10) ? 0.0 : (double) sqlDataReader.GetValue(10);
              if (sqlDataReader.FieldCount > 11)
                simplePoi.CDealer = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
              if (sqlDataReader.FieldCount > 12)
                simplePoi.Organization = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              simplePoi.CallerObject = Object.GetCallerObject();
              simplePoi.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplePoi);
              objectCollection.Add((SimpleBaseObject) simplePoi);
            }
          }
          return objectCollection;
        }
      }
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this.GetDataByName(Name, Taxonomies, PageCount, PagePresent, "Id", ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiByName", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Name"].Value = (object) Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            selectCommand.Parameters["@OrderBy"].Value = (object) OrderBy;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiByNameWithChild", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Name"].Value = (object) Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@ObjectType"].Value = (object) FilterChildObject.Type.Name;
            selectCommand.Parameters["@ObjectId"].Value = (object) FilterChildObject.Id;
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiByNameWithParent", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Name"].Value = (object) Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@ObjectType"].Value = (object) FilterParentObject.Type.Name;
            selectCommand.Parameters["@ObjectId"].Value = (object) FilterParentObject.Id;
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiByFilter", connection))
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
      }
      return dataTable;
    }

    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiByText", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Text", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Text"].Value = (object) Text;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataBySimpleObject(SimplePoi Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("PoiBySimplePoi", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@FullAddress", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Icon", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Country", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@State", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@City", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Number", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Latitude", SqlDbType.Float));
            selectCommand.Parameters.Add(new SqlParameter("@Longitude", SqlDbType.Float));
            selectCommand.Parameters.Add(new SqlParameter("@CDealer", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Organization", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@FullAddress"].Value = this._FullAddress == null ? (object) DBNull.Value : (object) this._FullAddress;
            selectCommand.Parameters["@Icon"].Value = this._Icon == null ? (object) DBNull.Value : (object) this._Icon;
            selectCommand.Parameters["@Country"].Value = this._Country == null ? (object) DBNull.Value : (object) this._Country;
            selectCommand.Parameters["@State"].Value = this._State == null ? (object) DBNull.Value : (object) this._State;
            selectCommand.Parameters["@City"].Value = this._City == null ? (object) DBNull.Value : (object) this._City;
            selectCommand.Parameters["@Address"].Value = this._Address == null ? (object) DBNull.Value : (object) this._Address;
            selectCommand.Parameters["@Number"].Value = this._Number == null ? (object) DBNull.Value : (object) this._Number;
            selectCommand.Parameters["@Latitude"].Value = (object) this._Latitude;
            selectCommand.Parameters["@Longitude"].Value = (object) this._Longitude;
            selectCommand.Parameters["@CDealer"].Value = this._CDealer == null ? (object) DBNull.Value : (object) this._CDealer;
            selectCommand.Parameters["@Organization"].Value = (object) this._Organization;
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public IEnumerable<SimplePoi> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("PoiByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimplePoi Simple = new SimplePoi();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.FullAddress = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.Icon = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.Country = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.State = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.City = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.Address = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.Number = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.Latitude = sqlDataReader.IsDBNull(9) ? 0.0 : (double) sqlDataReader.GetValue(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.Longitude = sqlDataReader.IsDBNull(10) ? 0.0 : (double) sqlDataReader.GetValue(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.CDealer = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.Organization = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimplePoi> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("PoiByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimplePoi Simple = new SimplePoi();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.FullAddress = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.Icon = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.Country = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.State = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.City = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.Address = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.Number = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.Latitude = sqlDataReader.IsDBNull(9) ? 0.0 : (double) sqlDataReader.GetValue(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.Longitude = sqlDataReader.IsDBNull(10) ? 0.0 : (double) sqlDataReader.GetValue(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.CDealer = sqlDataReader.IsDBNull(11) ? "" : sqlDataReader.GetString(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.Organization = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3044, "Poi");
    }

    private void SetConfig(SqlHelper SqlConfig)
    {
      this._ConnectionString = SqlConfig.GetConnString();
    }

    private void FillObject(SqlDataReader Reader)
    {
      while (Reader.Read())
      {
        this.Id = Reader.GetInt32(0);
        this.Name = Reader.GetString(1);
        if (Reader.FieldCount > 2)
          this._FullAddress = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._Icon = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._Country = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._State = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._City = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._Address = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._Number = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._Latitude = Reader.IsDBNull(9) ? 0.0 : (double) Reader.GetValue(9);
        if (Reader.FieldCount > 10)
          this._Longitude = Reader.IsDBNull(10) ? 0.0 : (double) Reader.GetValue(10);
        if (Reader.FieldCount > 11)
          this._CDealer = Reader.IsDBNull(11) ? "" : Reader.GetString(11);
        if (Reader.FieldCount > 12)
          this._Organization = Reader.IsDBNull(12) ? 0 : Reader.GetInt32(12);
      }
      Reader.Close();
    }
  }
}
