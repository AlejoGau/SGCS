// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalVC_Routes
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
  public class DalVC_Routes : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _cuentaId;
    private int _userId;
    private string _routetype;
    private DateTime? _datestart;
    private int _time;
    private int _startbeforetolerance;
    private int _startaftertolerance;
    private int _endbeforetolerance;
    private int _endaftertolerance;

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

    public int cuentaId
    {
      get
      {
        return this._cuentaId;
      }
      set
      {
        this._cuentaId = value;
      }
    }

    public int userId
    {
      get
      {
        return this._userId;
      }
      set
      {
        this._userId = value;
      }
    }

    public string routetype
    {
      get
      {
        return this._routetype;
      }
      set
      {
        this._routetype = value;
      }
    }

    public DateTime? datestart
    {
      get
      {
        return this._datestart;
      }
      set
      {
        this._datestart = value;
      }
    }

    public int time
    {
      get
      {
        return this._time;
      }
      set
      {
        this._time = value;
      }
    }

    public int startbeforetolerance
    {
      get
      {
        return this._startbeforetolerance;
      }
      set
      {
        this._startbeforetolerance = value;
      }
    }

    public int startaftertolerance
    {
      get
      {
        return this._startaftertolerance;
      }
      set
      {
        this._startaftertolerance = value;
      }
    }

    public int endbeforetolerance
    {
      get
      {
        return this._endbeforetolerance;
      }
      set
      {
        this._endbeforetolerance = value;
      }
    }

    public int endaftertolerance
    {
      get
      {
        return this._endaftertolerance;
      }
      set
      {
        this._endaftertolerance = value;
      }
    }

    public DalVC_Routes(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalVC_Routes(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalVC_Routes(SqlHelper SqlConfig, int UserId, SimpleVC_Routes Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._cuentaId = Simple.cuentaId;
      this._userId = Simple.userId;
      this._routetype = Simple.routetype;
      this._datestart = Simple.datestart;
      this._time = Simple.time;
      this._startbeforetolerance = Simple.startbeforetolerance;
      this._startaftertolerance = Simple.startaftertolerance;
      this._endbeforetolerance = Simple.endbeforetolerance;
      this._endaftertolerance = Simple.endaftertolerance;
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
            using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@cuentaId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@userId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@routetype", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@datestart", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@time", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startbeforetolerance", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startaftertolerance", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endbeforetolerance", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endaftertolerance", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@cuentaId"].Value = (object) this._cuentaId;
              sqlCommand.Parameters["@userId"].Value = (object) this._userId;
              sqlCommand.Parameters["@routetype"].Value = this._routetype == null ? (object) DBNull.Value : (object) this._routetype;
              SqlParameter parameter = sqlCommand.Parameters["@datestart"];
              DateTime? datestart = this._datestart;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!datestart.HasValue ? 0 : (datestart.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._datestart;
              parameter.Value = obj;
              sqlCommand.Parameters["@time"].Value = (object) this._time;
              sqlCommand.Parameters["@startbeforetolerance"].Value = (object) this._startbeforetolerance;
              sqlCommand.Parameters["@startaftertolerance"].Value = (object) this._startaftertolerance;
              sqlCommand.Parameters["@endbeforetolerance"].Value = (object) this._endbeforetolerance;
              sqlCommand.Parameters["@endaftertolerance"].Value = (object) this._endaftertolerance;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@cuentaId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@userId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@routetype", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@datestart", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@time", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startbeforetolerance", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startaftertolerance", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endbeforetolerance", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endaftertolerance", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@cuentaId"].Value = (object) this._cuentaId;
              sqlCommand.Parameters["@userId"].Value = (object) this._userId;
              sqlCommand.Parameters["@routetype"].Value = this._routetype == null ? (object) DBNull.Value : (object) this._routetype;
              SqlParameter parameter = sqlCommand.Parameters["@datestart"];
              DateTime? datestart = this._datestart;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!datestart.HasValue ? 0 : (datestart.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._datestart;
              parameter.Value = obj;
              sqlCommand.Parameters["@time"].Value = (object) this._time;
              sqlCommand.Parameters["@startbeforetolerance"].Value = (object) this._startbeforetolerance;
              sqlCommand.Parameters["@startaftertolerance"].Value = (object) this._startaftertolerance;
              sqlCommand.Parameters["@endbeforetolerance"].Value = (object) this._endbeforetolerance;
              sqlCommand.Parameters["@endaftertolerance"].Value = (object) this._endaftertolerance;
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
        throw new RuntimeException("The VC_Routes is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesSel", connection))
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
      SimpleVC_Routes simpleVcRoutes = new SimpleVC_Routes();
      simpleVcRoutes.Id = this.Id;
      simpleVcRoutes.Name = this.Name;
      simpleVcRoutes.cuentaId = this._cuentaId;
      simpleVcRoutes.userId = this._userId;
      simpleVcRoutes.routetype = this._routetype;
      simpleVcRoutes.datestart = this._datestart;
      simpleVcRoutes.time = this._time;
      simpleVcRoutes.startbeforetolerance = this._startbeforetolerance;
      simpleVcRoutes.startaftertolerance = this._startaftertolerance;
      simpleVcRoutes.endbeforetolerance = this._endbeforetolerance;
      simpleVcRoutes.endaftertolerance = this._endaftertolerance;
      if (this.CallerObject != null)
        simpleVcRoutes.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleVcRoutes;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleVC_Routes simpleVcRoutes = (SimpleVC_Routes) BaseSimple;
      this.Id = simpleVcRoutes.Id;
      this.Name = simpleVcRoutes.Name;
      this._cuentaId = simpleVcRoutes.cuentaId;
      this._userId = simpleVcRoutes.userId;
      this._routetype = simpleVcRoutes.routetype;
      this._datestart = simpleVcRoutes.datestart;
      this._time = simpleVcRoutes.time;
      this._startbeforetolerance = simpleVcRoutes.startbeforetolerance;
      this._startaftertolerance = simpleVcRoutes.startaftertolerance;
      this._endbeforetolerance = simpleVcRoutes.endbeforetolerance;
      this._endaftertolerance = simpleVcRoutes.endaftertolerance;
      if (simpleVcRoutes.CallerObject != null)
        this.CallerObject = simpleVcRoutes.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerVC_Routes callerVcRoutes = new CallerVC_Routes();
      callerVcRoutes.Id = this.Id;
      callerVcRoutes.Name = this.Name;
      callerVcRoutes.cuentaId = this._cuentaId;
      callerVcRoutes.userId = this._userId;
      callerVcRoutes.routetype = this._routetype;
      callerVcRoutes.datestart = this._datestart;
      callerVcRoutes.time = this._time;
      callerVcRoutes.startbeforetolerance = this._startbeforetolerance;
      callerVcRoutes.startaftertolerance = this._startaftertolerance;
      callerVcRoutes.endbeforetolerance = this._endbeforetolerance;
      callerVcRoutes.endaftertolerance = this._endaftertolerance;
      return (CallerObject) callerVcRoutes;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("cuentaId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("userId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("routetype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("datestart", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("time", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startbeforetolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startaftertolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endbeforetolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endaftertolerance", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["cuentaId"] = (object) this._cuentaId;
      row["userId"] = (object) this._userId;
      row["routetype"] = (object) this._routetype;
      row["datestart"] = (object) this._datestart;
      row["time"] = (object) this._time;
      row["startbeforetolerance"] = (object) this._startbeforetolerance;
      row["startaftertolerance"] = (object) this._startaftertolerance;
      row["endbeforetolerance"] = (object) this._endbeforetolerance;
      row["endaftertolerance"] = (object) this._endaftertolerance;
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
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesByChildObject", connection))
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
              SimpleVC_Routes simpleVcRoutes = new SimpleVC_Routes();
              simpleVcRoutes.Id = sqlDataReader.GetInt32(0);
              simpleVcRoutes.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleVcRoutes.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleVcRoutes.userId = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simpleVcRoutes.routetype = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleVcRoutes.datestart = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                simpleVcRoutes.time = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simpleVcRoutes.startbeforetolerance = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simpleVcRoutes.startaftertolerance = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                simpleVcRoutes.endbeforetolerance = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                simpleVcRoutes.endaftertolerance = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              simpleVcRoutes.CallerObject = Object.GetCallerObject();
              simpleVcRoutes.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVcRoutes);
              objectCollection.Add((SimpleBaseObject) simpleVcRoutes);
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
        SimpleVC_Routes simpleVcRoutes = new SimpleVC_Routes();
        simpleVcRoutes.Id = (int) row["Id"];
        simpleVcRoutes.Name = (string) row["Name"];
        simpleVcRoutes.cuentaId = row["cuentaId"] == DBNull.Value ? 0 : (int) row["cuentaId"];
        simpleVcRoutes.userId = row["userId"] == DBNull.Value ? 0 : (int) row["userId"];
        simpleVcRoutes.routetype = row["routetype"] == DBNull.Value ? "" : (string) row["routetype"];
        simpleVcRoutes.datestart = row["datestart"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["datestart"];
        simpleVcRoutes.time = row["time"] == DBNull.Value ? 0 : (int) row["time"];
        simpleVcRoutes.startbeforetolerance = row["startbeforetolerance"] == DBNull.Value ? 0 : (int) row["startbeforetolerance"];
        simpleVcRoutes.startaftertolerance = row["startaftertolerance"] == DBNull.Value ? 0 : (int) row["startaftertolerance"];
        simpleVcRoutes.endbeforetolerance = row["endbeforetolerance"] == DBNull.Value ? 0 : (int) row["endbeforetolerance"];
        simpleVcRoutes.endaftertolerance = row["endaftertolerance"] == DBNull.Value ? 0 : (int) row["endaftertolerance"];
        simpleVcRoutes.CallerObject = Object.GetCallerObject();
        simpleVcRoutes.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVcRoutes);
        if (Recursive)
          simpleVcRoutes.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleVcRoutes, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleVcRoutes);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesByParentObject", connection))
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
              SimpleVC_Routes simpleVcRoutes = new SimpleVC_Routes();
              simpleVcRoutes.Id = sqlDataReader.GetInt32(0);
              simpleVcRoutes.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleVcRoutes.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleVcRoutes.userId = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simpleVcRoutes.routetype = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleVcRoutes.datestart = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                simpleVcRoutes.time = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simpleVcRoutes.startbeforetolerance = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simpleVcRoutes.startaftertolerance = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                simpleVcRoutes.endbeforetolerance = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                simpleVcRoutes.endaftertolerance = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              simpleVcRoutes.CallerObject = Object.GetCallerObject();
              simpleVcRoutes.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVcRoutes);
              objectCollection.Add((SimpleBaseObject) simpleVcRoutes);
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
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleVC_Routes Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VC_RoutesBySimpleVC_Routes", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@cuentaId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@userId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@routetype", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@datestart", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@time", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@startbeforetolerance", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@startaftertolerance", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@endbeforetolerance", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@endaftertolerance", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@cuentaId"].Value = (object) this._cuentaId;
            selectCommand.Parameters["@userId"].Value = (object) this._userId;
            selectCommand.Parameters["@routetype"].Value = this._routetype == null ? (object) DBNull.Value : (object) this._routetype;
            SqlParameter parameter = selectCommand.Parameters["@datestart"];
            DateTime? datestart = this._datestart;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!datestart.HasValue ? 0 : (datestart.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._datestart;
            parameter.Value = obj;
            selectCommand.Parameters["@time"].Value = (object) this._time;
            selectCommand.Parameters["@startbeforetolerance"].Value = (object) this._startbeforetolerance;
            selectCommand.Parameters["@startaftertolerance"].Value = (object) this._startaftertolerance;
            selectCommand.Parameters["@endbeforetolerance"].Value = (object) this._endbeforetolerance;
            selectCommand.Parameters["@endaftertolerance"].Value = (object) this._endaftertolerance;
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

    public IEnumerable<SimpleVC_Routes> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVC_Routes Simple = new SimpleVC_Routes();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.userId = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.routetype = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.datestart = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                Simple.time = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.startbeforetolerance = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.startaftertolerance = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.endbeforetolerance = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.endaftertolerance = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleVC_Routes> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VC_RoutesByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVC_Routes Simple = new SimpleVC_Routes();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.userId = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.routetype = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.datestart = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                Simple.time = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.startbeforetolerance = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.startaftertolerance = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.endbeforetolerance = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.endaftertolerance = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3118, "VC_Routes");
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
          this._cuentaId = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._userId = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        if (Reader.FieldCount > 4)
          this._routetype = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._datestart = new DateTime?(Reader.IsDBNull(5) ? new DateTime(1, 1, 1) : Reader.GetDateTime(5));
        if (Reader.FieldCount > 6)
          this._time = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
        if (Reader.FieldCount > 7)
          this._startbeforetolerance = Reader.IsDBNull(7) ? 0 : Reader.GetInt32(7);
        if (Reader.FieldCount > 8)
          this._startaftertolerance = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
        if (Reader.FieldCount > 9)
          this._endbeforetolerance = Reader.IsDBNull(9) ? 0 : Reader.GetInt32(9);
        if (Reader.FieldCount > 10)
          this._endaftertolerance = Reader.IsDBNull(10) ? 0 : Reader.GetInt32(10);
      }
      Reader.Close();
    }
  }
}
