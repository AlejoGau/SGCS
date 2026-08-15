// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalScheduler
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
  public class DalScheduler : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _template;
    private DateTime? _limitdate;
    private int _status;
    private DateTime? _lastchange;
    private string _config;
    private int _eventid;
    private string _eventtype;
    private string _condition;
    private string _sql;

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

    public int template
    {
      get
      {
        return this._template;
      }
      set
      {
        this._template = value;
      }
    }

    public DateTime? limitdate
    {
      get
      {
        return this._limitdate;
      }
      set
      {
        this._limitdate = value;
      }
    }

    public int status
    {
      get
      {
        return this._status;
      }
      set
      {
        this._status = value;
      }
    }

    public DateTime? lastchange
    {
      get
      {
        return this._lastchange;
      }
      set
      {
        this._lastchange = value;
      }
    }

    public string config
    {
      get
      {
        return this._config;
      }
      set
      {
        this._config = value;
      }
    }

    public int eventid
    {
      get
      {
        return this._eventid;
      }
      set
      {
        this._eventid = value;
      }
    }

    public string eventtype
    {
      get
      {
        return this._eventtype;
      }
      set
      {
        this._eventtype = value;
      }
    }

    public string condition
    {
      get
      {
        return this._condition;
      }
      set
      {
        this._condition = value;
      }
    }

    public string sql
    {
      get
      {
        return this._sql;
      }
      set
      {
        this._sql = value;
      }
    }

    public DalScheduler(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalScheduler(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalScheduler(SqlHelper SqlConfig, int UserId, SimpleScheduler Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._template = Simple.template;
      this._limitdate = Simple.limitdate;
      this._status = Simple.status;
      this._lastchange = Simple.lastchange;
      this._config = Simple.config;
      this._eventid = Simple.eventid;
      this._eventtype = Simple.eventtype;
      this._condition = Simple.condition;
      this._sql = Simple.sql;
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
            using (SqlCommand sqlCommand = new SqlCommand("SchedulerIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@template", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@limitdate", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@status", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@lastchange", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@config", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eventid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@eventtype", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@condition", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@sql", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@template"].Value = (object) this._template;
              SqlParameter parameter1 = sqlCommand.Parameters["@limitdate"];
              DateTime? nullable = this._limitdate;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._limitdate;
              parameter1.Value = obj1;
              sqlCommand.Parameters["@status"].Value = (object) this._status;
              SqlParameter parameter2 = sqlCommand.Parameters["@lastchange"];
              nullable = this._lastchange;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._lastchange;
              parameter2.Value = obj2;
              sqlCommand.Parameters["@config"].Value = this._config == null ? (object) DBNull.Value : (object) this._config;
              sqlCommand.Parameters["@eventid"].Value = (object) this._eventid;
              sqlCommand.Parameters["@eventtype"].Value = this._eventtype == null ? (object) DBNull.Value : (object) this._eventtype;
              sqlCommand.Parameters["@condition"].Value = this._condition == null ? (object) DBNull.Value : (object) this._condition;
              sqlCommand.Parameters["@sql"].Value = this._sql == null ? (object) DBNull.Value : (object) this._sql;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("SchedulerUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@template", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@limitdate", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@status", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@lastchange", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@config", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eventid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@eventtype", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@condition", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@sql", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@template"].Value = (object) this._template;
              SqlParameter parameter1 = sqlCommand.Parameters["@limitdate"];
              DateTime? nullable = this._limitdate;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._limitdate;
              parameter1.Value = obj1;
              sqlCommand.Parameters["@status"].Value = (object) this._status;
              SqlParameter parameter2 = sqlCommand.Parameters["@lastchange"];
              nullable = this._lastchange;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._lastchange;
              parameter2.Value = obj2;
              sqlCommand.Parameters["@config"].Value = this._config == null ? (object) DBNull.Value : (object) this._config;
              sqlCommand.Parameters["@eventid"].Value = (object) this._eventid;
              sqlCommand.Parameters["@eventtype"].Value = this._eventtype == null ? (object) DBNull.Value : (object) this._eventtype;
              sqlCommand.Parameters["@condition"].Value = this._condition == null ? (object) DBNull.Value : (object) this._condition;
              sqlCommand.Parameters["@sql"].Value = this._sql == null ? (object) DBNull.Value : (object) this._sql;
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
        throw new RuntimeException("The Scheduler is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("SchedulerDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerSel", connection))
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
      SimpleScheduler simpleScheduler = new SimpleScheduler();
      simpleScheduler.Id = this.Id;
      simpleScheduler.Name = this.Name;
      simpleScheduler.template = this._template;
      simpleScheduler.limitdate = this._limitdate;
      simpleScheduler.status = this._status;
      simpleScheduler.lastchange = this._lastchange;
      simpleScheduler.config = this._config;
      simpleScheduler.eventid = this._eventid;
      simpleScheduler.eventtype = this._eventtype;
      simpleScheduler.condition = this._condition;
      simpleScheduler.sql = this._sql;
      if (this.CallerObject != null)
        simpleScheduler.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleScheduler;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleScheduler simpleScheduler = (SimpleScheduler) BaseSimple;
      this.Id = simpleScheduler.Id;
      this.Name = simpleScheduler.Name;
      this._template = simpleScheduler.template;
      this._limitdate = simpleScheduler.limitdate;
      this._status = simpleScheduler.status;
      this._lastchange = simpleScheduler.lastchange;
      this._config = simpleScheduler.config;
      this._eventid = simpleScheduler.eventid;
      this._eventtype = simpleScheduler.eventtype;
      this._condition = simpleScheduler.condition;
      this._sql = simpleScheduler.sql;
      if (simpleScheduler.CallerObject != null)
        this.CallerObject = simpleScheduler.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerScheduler callerScheduler = new CallerScheduler();
      callerScheduler.Id = this.Id;
      callerScheduler.Name = this.Name;
      callerScheduler.template = this._template;
      callerScheduler.limitdate = this._limitdate;
      callerScheduler.status = this._status;
      callerScheduler.lastchange = this._lastchange;
      callerScheduler.config = this._config;
      callerScheduler.eventid = this._eventid;
      callerScheduler.eventtype = this._eventtype;
      callerScheduler.condition = this._condition;
      callerScheduler.sql = this._sql;
      return (CallerObject) callerScheduler;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("template", typeof (int)));
      dataTable.Columns.Add(new DataColumn("limitdate", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("status", typeof (int)));
      dataTable.Columns.Add(new DataColumn("lastchange", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("config", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eventid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("eventtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("condition", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sql", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["template"] = (object) this._template;
      row["limitdate"] = (object) this._limitdate;
      row["status"] = (object) this._status;
      row["lastchange"] = (object) this._lastchange;
      row["config"] = (object) this._config;
      row["eventid"] = (object) this._eventid;
      row["eventtype"] = (object) this._eventtype;
      row["condition"] = (object) this._condition;
      row["sql"] = (object) this._sql;
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerByChildObject", connection))
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
              SimpleScheduler simpleScheduler = new SimpleScheduler();
              simpleScheduler.Id = sqlDataReader.GetInt32(0);
              simpleScheduler.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleScheduler.template = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleScheduler.limitdate = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                simpleScheduler.status = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleScheduler.lastchange = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                simpleScheduler.config = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpleScheduler.eventid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simpleScheduler.eventtype = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpleScheduler.condition = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpleScheduler.sql = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              simpleScheduler.CallerObject = Object.GetCallerObject();
              simpleScheduler.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleScheduler);
              objectCollection.Add((SimpleBaseObject) simpleScheduler);
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
        SimpleScheduler simpleScheduler = new SimpleScheduler();
        simpleScheduler.Id = (int) row["Id"];
        simpleScheduler.Name = (string) row["Name"];
        simpleScheduler.template = row["template"] == DBNull.Value ? 0 : (int) row["template"];
        simpleScheduler.limitdate = row["limitdate"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["limitdate"];
        simpleScheduler.status = row["status"] == DBNull.Value ? 0 : (int) row["status"];
        simpleScheduler.lastchange = row["lastchange"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["lastchange"];
        simpleScheduler.config = row["config"] == DBNull.Value ? "" : (string) row["config"];
        simpleScheduler.eventid = row["eventid"] == DBNull.Value ? 0 : (int) row["eventid"];
        simpleScheduler.eventtype = row["eventtype"] == DBNull.Value ? "" : (string) row["eventtype"];
        simpleScheduler.condition = row["condition"] == DBNull.Value ? "" : (string) row["condition"];
        simpleScheduler.sql = row["sql"] == DBNull.Value ? "" : (string) row["sql"];
        simpleScheduler.CallerObject = Object.GetCallerObject();
        simpleScheduler.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleScheduler);
        if (Recursive)
          simpleScheduler.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleScheduler, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleScheduler);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("SchedulerByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerByParentObject", connection))
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
              SimpleScheduler simpleScheduler = new SimpleScheduler();
              simpleScheduler.Id = sqlDataReader.GetInt32(0);
              simpleScheduler.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleScheduler.template = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleScheduler.limitdate = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                simpleScheduler.status = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleScheduler.lastchange = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                simpleScheduler.config = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpleScheduler.eventid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simpleScheduler.eventtype = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpleScheduler.condition = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpleScheduler.sql = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              simpleScheduler.CallerObject = Object.GetCallerObject();
              simpleScheduler.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleScheduler);
              objectCollection.Add((SimpleBaseObject) simpleScheduler);
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleScheduler Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("SchedulerBySimpleScheduler", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@template", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@limitdate", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@status", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@lastchange", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@config", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@eventid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@eventtype", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@condition", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@sql", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@template"].Value = (object) this._template;
            SqlParameter parameter1 = selectCommand.Parameters["@limitdate"];
            DateTime? nullable = this._limitdate;
            DateTime dateTime1 = new DateTime(1, 1, 1);
            object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._limitdate;
            parameter1.Value = obj1;
            selectCommand.Parameters["@status"].Value = (object) this._status;
            SqlParameter parameter2 = selectCommand.Parameters["@lastchange"];
            nullable = this._lastchange;
            DateTime dateTime2 = new DateTime(1, 1, 1);
            object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._lastchange;
            parameter2.Value = obj2;
            selectCommand.Parameters["@config"].Value = this._config == null ? (object) DBNull.Value : (object) this._config;
            selectCommand.Parameters["@eventid"].Value = (object) this._eventid;
            selectCommand.Parameters["@eventtype"].Value = this._eventtype == null ? (object) DBNull.Value : (object) this._eventtype;
            selectCommand.Parameters["@condition"].Value = this._condition == null ? (object) DBNull.Value : (object) this._condition;
            selectCommand.Parameters["@sql"].Value = this._sql == null ? (object) DBNull.Value : (object) this._sql;
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

    public IEnumerable<SimpleScheduler> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleScheduler Simple = new SimpleScheduler();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.template = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.limitdate = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                Simple.status = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.lastchange = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                Simple.config = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.eventid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.eventtype = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.condition = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.sql = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleScheduler> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleScheduler Simple = new SimpleScheduler();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.template = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.limitdate = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                Simple.status = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.lastchange = new DateTime?(sqlDataReader.IsDBNull(5) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(5));
              if (sqlDataReader.FieldCount > 6)
                Simple.config = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.eventid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.eventtype = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.condition = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.sql = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3114, "Scheduler");
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
          this._template = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._limitdate = new DateTime?(Reader.IsDBNull(3) ? new DateTime(1, 1, 1) : Reader.GetDateTime(3));
        if (Reader.FieldCount > 4)
          this._status = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._lastchange = new DateTime?(Reader.IsDBNull(5) ? new DateTime(1, 1, 1) : Reader.GetDateTime(5));
        if (Reader.FieldCount > 6)
          this._config = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._eventid = Reader.IsDBNull(7) ? 0 : Reader.GetInt32(7);
        if (Reader.FieldCount > 8)
          this._eventtype = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._condition = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
        if (Reader.FieldCount > 10)
          this._sql = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
      }
      Reader.Close();
    }
  }
}
