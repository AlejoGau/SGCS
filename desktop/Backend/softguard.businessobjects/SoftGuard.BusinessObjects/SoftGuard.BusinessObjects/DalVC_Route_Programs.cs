// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalVC_Route_Programs
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
  public class DalVC_Route_Programs : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _routeId;
    private string _programtype;
    private int _starthour;
    private int _startminutes;
    private int _dayofweek;
    private int _dayofmonth;

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

    public int routeId
    {
      get
      {
        return this._routeId;
      }
      set
      {
        this._routeId = value;
      }
    }

    public string programtype
    {
      get
      {
        return this._programtype;
      }
      set
      {
        this._programtype = value;
      }
    }

    public int starthour
    {
      get
      {
        return this._starthour;
      }
      set
      {
        this._starthour = value;
      }
    }

    public int startminutes
    {
      get
      {
        return this._startminutes;
      }
      set
      {
        this._startminutes = value;
      }
    }

    public int dayofweek
    {
      get
      {
        return this._dayofweek;
      }
      set
      {
        this._dayofweek = value;
      }
    }

    public int dayofmonth
    {
      get
      {
        return this._dayofmonth;
      }
      set
      {
        this._dayofmonth = value;
      }
    }

    public DalVC_Route_Programs(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalVC_Route_Programs(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalVC_Route_Programs(SqlHelper SqlConfig, int UserId, SimpleVC_Route_Programs Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._routeId = Simple.routeId;
      this._programtype = Simple.programtype;
      this._starthour = Simple.starthour;
      this._startminutes = Simple.startminutes;
      this._dayofweek = Simple.dayofweek;
      this._dayofmonth = Simple.dayofmonth;
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
            using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@routeId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@programtype", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@starthour", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startminutes", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofweek", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofmonth", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@routeId"].Value = (object) this._routeId;
              sqlCommand.Parameters["@programtype"].Value = this._programtype == null ? (object) DBNull.Value : (object) this._programtype;
              sqlCommand.Parameters["@starthour"].Value = (object) this._starthour;
              sqlCommand.Parameters["@startminutes"].Value = (object) this._startminutes;
              sqlCommand.Parameters["@dayofweek"].Value = (object) this._dayofweek;
              sqlCommand.Parameters["@dayofmonth"].Value = (object) this._dayofmonth;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@routeId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@programtype", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@starthour", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startminutes", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofweek", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofmonth", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@routeId"].Value = (object) this._routeId;
              sqlCommand.Parameters["@programtype"].Value = this._programtype == null ? (object) DBNull.Value : (object) this._programtype;
              sqlCommand.Parameters["@starthour"].Value = (object) this._starthour;
              sqlCommand.Parameters["@startminutes"].Value = (object) this._startminutes;
              sqlCommand.Parameters["@dayofweek"].Value = (object) this._dayofweek;
              sqlCommand.Parameters["@dayofmonth"].Value = (object) this._dayofmonth;
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
        throw new RuntimeException("The VC_Route_Programs is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsSel", connection))
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
      SimpleVC_Route_Programs simpleVcRoutePrograms = new SimpleVC_Route_Programs();
      simpleVcRoutePrograms.Id = this.Id;
      simpleVcRoutePrograms.Name = this.Name;
      simpleVcRoutePrograms.routeId = this._routeId;
      simpleVcRoutePrograms.programtype = this._programtype;
      simpleVcRoutePrograms.starthour = this._starthour;
      simpleVcRoutePrograms.startminutes = this._startminutes;
      simpleVcRoutePrograms.dayofweek = this._dayofweek;
      simpleVcRoutePrograms.dayofmonth = this._dayofmonth;
      if (this.CallerObject != null)
        simpleVcRoutePrograms.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleVcRoutePrograms;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleVC_Route_Programs simpleVcRoutePrograms = (SimpleVC_Route_Programs) BaseSimple;
      this.Id = simpleVcRoutePrograms.Id;
      this.Name = simpleVcRoutePrograms.Name;
      this._routeId = simpleVcRoutePrograms.routeId;
      this._programtype = simpleVcRoutePrograms.programtype;
      this._starthour = simpleVcRoutePrograms.starthour;
      this._startminutes = simpleVcRoutePrograms.startminutes;
      this._dayofweek = simpleVcRoutePrograms.dayofweek;
      this._dayofmonth = simpleVcRoutePrograms.dayofmonth;
      if (simpleVcRoutePrograms.CallerObject != null)
        this.CallerObject = simpleVcRoutePrograms.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerVC_Route_Programs callerVcRoutePrograms = new CallerVC_Route_Programs();
      callerVcRoutePrograms.Id = this.Id;
      callerVcRoutePrograms.Name = this.Name;
      callerVcRoutePrograms.routeId = this._routeId;
      callerVcRoutePrograms.programtype = this._programtype;
      callerVcRoutePrograms.starthour = this._starthour;
      callerVcRoutePrograms.startminutes = this._startminutes;
      callerVcRoutePrograms.dayofweek = this._dayofweek;
      callerVcRoutePrograms.dayofmonth = this._dayofmonth;
      return (CallerObject) callerVcRoutePrograms;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("routeId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("programtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("starthour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofweek", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofmonth", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["routeId"] = (object) this._routeId;
      row["programtype"] = (object) this._programtype;
      row["starthour"] = (object) this._starthour;
      row["startminutes"] = (object) this._startminutes;
      row["dayofweek"] = (object) this._dayofweek;
      row["dayofmonth"] = (object) this._dayofmonth;
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
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsByChildObject", connection))
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
              SimpleVC_Route_Programs simpleVcRoutePrograms = new SimpleVC_Route_Programs();
              simpleVcRoutePrograms.Id = sqlDataReader.GetInt32(0);
              simpleVcRoutePrograms.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleVcRoutePrograms.routeId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleVcRoutePrograms.programtype = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpleVcRoutePrograms.starthour = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleVcRoutePrograms.startminutes = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simpleVcRoutePrograms.dayofweek = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simpleVcRoutePrograms.dayofmonth = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              simpleVcRoutePrograms.CallerObject = Object.GetCallerObject();
              simpleVcRoutePrograms.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVcRoutePrograms);
              objectCollection.Add((SimpleBaseObject) simpleVcRoutePrograms);
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
        SimpleVC_Route_Programs simpleVcRoutePrograms = new SimpleVC_Route_Programs();
        simpleVcRoutePrograms.Id = (int) row["Id"];
        simpleVcRoutePrograms.Name = (string) row["Name"];
        simpleVcRoutePrograms.routeId = row["routeId"] == DBNull.Value ? 0 : (int) row["routeId"];
        simpleVcRoutePrograms.programtype = row["programtype"] == DBNull.Value ? "" : (string) row["programtype"];
        simpleVcRoutePrograms.starthour = row["starthour"] == DBNull.Value ? 0 : (int) row["starthour"];
        simpleVcRoutePrograms.startminutes = row["startminutes"] == DBNull.Value ? 0 : (int) row["startminutes"];
        simpleVcRoutePrograms.dayofweek = row["dayofweek"] == DBNull.Value ? 0 : (int) row["dayofweek"];
        simpleVcRoutePrograms.dayofmonth = row["dayofmonth"] == DBNull.Value ? 0 : (int) row["dayofmonth"];
        simpleVcRoutePrograms.CallerObject = Object.GetCallerObject();
        simpleVcRoutePrograms.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVcRoutePrograms);
        if (Recursive)
          simpleVcRoutePrograms.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleVcRoutePrograms, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleVcRoutePrograms);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsByParentObject", connection))
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
              SimpleVC_Route_Programs simpleVcRoutePrograms = new SimpleVC_Route_Programs();
              simpleVcRoutePrograms.Id = sqlDataReader.GetInt32(0);
              simpleVcRoutePrograms.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleVcRoutePrograms.routeId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleVcRoutePrograms.programtype = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpleVcRoutePrograms.starthour = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleVcRoutePrograms.startminutes = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simpleVcRoutePrograms.dayofweek = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simpleVcRoutePrograms.dayofmonth = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              simpleVcRoutePrograms.CallerObject = Object.GetCallerObject();
              simpleVcRoutePrograms.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVcRoutePrograms);
              objectCollection.Add((SimpleBaseObject) simpleVcRoutePrograms);
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
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleVC_Route_Programs Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VC_Route_ProgramsBySimpleVC_Route_Programs", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@routeId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@programtype", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@starthour", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@startminutes", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@dayofweek", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@dayofmonth", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@routeId"].Value = (object) this._routeId;
            selectCommand.Parameters["@programtype"].Value = this._programtype == null ? (object) DBNull.Value : (object) this._programtype;
            selectCommand.Parameters["@starthour"].Value = (object) this._starthour;
            selectCommand.Parameters["@startminutes"].Value = (object) this._startminutes;
            selectCommand.Parameters["@dayofweek"].Value = (object) this._dayofweek;
            selectCommand.Parameters["@dayofmonth"].Value = (object) this._dayofmonth;
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

    public IEnumerable<SimpleVC_Route_Programs> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVC_Route_Programs Simple = new SimpleVC_Route_Programs();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.routeId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.programtype = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.starthour = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.startminutes = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.dayofweek = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.dayofmonth = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleVC_Route_Programs> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VC_Route_ProgramsByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVC_Route_Programs Simple = new SimpleVC_Route_Programs();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.routeId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.programtype = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.starthour = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.startminutes = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.dayofweek = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.dayofmonth = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3119, "VC_Route_Programs");
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
          this._routeId = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._programtype = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._starthour = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._startminutes = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
        if (Reader.FieldCount > 6)
          this._dayofweek = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
        if (Reader.FieldCount > 7)
          this._dayofmonth = Reader.IsDBNull(7) ? 0 : Reader.GetInt32(7);
      }
      Reader.Close();
    }
  }
}
