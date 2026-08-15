// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalSchedulerPrograms
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
  public class DalSchedulerPrograms : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _cuentaId;
    private string _eventos;
    private string _eventogenerar;
    private int _zonaiid;
    private int _usuarioiid;
    private string _programtype;
    private int _starthour;
    private int _startminutes;
    private int _endhour;
    private int _endminutes;
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

    public string eventos
    {
      get
      {
        return this._eventos;
      }
      set
      {
        this._eventos = value;
      }
    }

    public string eventogenerar
    {
      get
      {
        return this._eventogenerar;
      }
      set
      {
        this._eventogenerar = value;
      }
    }

    public int zonaiid
    {
      get
      {
        return this._zonaiid;
      }
      set
      {
        this._zonaiid = value;
      }
    }

    public int usuarioiid
    {
      get
      {
        return this._usuarioiid;
      }
      set
      {
        this._usuarioiid = value;
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

    public int endhour
    {
      get
      {
        return this._endhour;
      }
      set
      {
        this._endhour = value;
      }
    }

    public int endminutes
    {
      get
      {
        return this._endminutes;
      }
      set
      {
        this._endminutes = value;
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

    public DalSchedulerPrograms(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalSchedulerPrograms(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalSchedulerPrograms(SqlHelper SqlConfig, int UserId, SimpleSchedulerPrograms Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._cuentaId = Simple.cuentaId;
      this._eventos = Simple.eventos;
      this._eventogenerar = Simple.eventogenerar;
      this._zonaiid = Simple.zonaiid;
      this._usuarioiid = Simple.usuarioiid;
      this._programtype = Simple.programtype;
      this._starthour = Simple.starthour;
      this._startminutes = Simple.startminutes;
      this._endhour = Simple.endhour;
      this._endminutes = Simple.endminutes;
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
            using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@cuentaId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@eventos", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eventogenerar", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zonaiid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@usuarioiid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@programtype", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@starthour", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startminutes", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endhour", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endminutes", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofweek", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofmonth", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@cuentaId"].Value = (object) this._cuentaId;
              sqlCommand.Parameters["@eventos"].Value = this._eventos == null ? (object) DBNull.Value : (object) this._eventos;
              sqlCommand.Parameters["@eventogenerar"].Value = this._eventogenerar == null ? (object) DBNull.Value : (object) this._eventogenerar;
              sqlCommand.Parameters["@zonaiid"].Value = (object) this._zonaiid;
              sqlCommand.Parameters["@usuarioiid"].Value = (object) this._usuarioiid;
              sqlCommand.Parameters["@programtype"].Value = this._programtype == null ? (object) DBNull.Value : (object) this._programtype;
              sqlCommand.Parameters["@starthour"].Value = (object) this._starthour;
              sqlCommand.Parameters["@startminutes"].Value = (object) this._startminutes;
              sqlCommand.Parameters["@endhour"].Value = (object) this._endhour;
              sqlCommand.Parameters["@endminutes"].Value = (object) this._endminutes;
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
            using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@cuentaId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@eventos", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eventogenerar", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zonaiid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@usuarioiid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@programtype", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@starthour", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@startminutes", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endhour", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@endminutes", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofweek", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dayofmonth", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@cuentaId"].Value = (object) this._cuentaId;
              sqlCommand.Parameters["@eventos"].Value = this._eventos == null ? (object) DBNull.Value : (object) this._eventos;
              sqlCommand.Parameters["@eventogenerar"].Value = this._eventogenerar == null ? (object) DBNull.Value : (object) this._eventogenerar;
              sqlCommand.Parameters["@zonaiid"].Value = (object) this._zonaiid;
              sqlCommand.Parameters["@usuarioiid"].Value = (object) this._usuarioiid;
              sqlCommand.Parameters["@programtype"].Value = this._programtype == null ? (object) DBNull.Value : (object) this._programtype;
              sqlCommand.Parameters["@starthour"].Value = (object) this._starthour;
              sqlCommand.Parameters["@startminutes"].Value = (object) this._startminutes;
              sqlCommand.Parameters["@endhour"].Value = (object) this._endhour;
              sqlCommand.Parameters["@endminutes"].Value = (object) this._endminutes;
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
        throw new RuntimeException("The SchedulerPrograms is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsSel", connection))
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
      SimpleSchedulerPrograms schedulerPrograms = new SimpleSchedulerPrograms();
      schedulerPrograms.Id = this.Id;
      schedulerPrograms.Name = this.Name;
      schedulerPrograms.cuentaId = this._cuentaId;
      schedulerPrograms.eventos = this._eventos;
      schedulerPrograms.eventogenerar = this._eventogenerar;
      schedulerPrograms.zonaiid = this._zonaiid;
      schedulerPrograms.usuarioiid = this._usuarioiid;
      schedulerPrograms.programtype = this._programtype;
      schedulerPrograms.starthour = this._starthour;
      schedulerPrograms.startminutes = this._startminutes;
      schedulerPrograms.endhour = this._endhour;
      schedulerPrograms.endminutes = this._endminutes;
      schedulerPrograms.dayofweek = this._dayofweek;
      schedulerPrograms.dayofmonth = this._dayofmonth;
      if (this.CallerObject != null)
        schedulerPrograms.CallerObject = this.CallerObject;
      return (SimpleBaseObject) schedulerPrograms;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleSchedulerPrograms schedulerPrograms = (SimpleSchedulerPrograms) BaseSimple;
      this.Id = schedulerPrograms.Id;
      this.Name = schedulerPrograms.Name;
      this._cuentaId = schedulerPrograms.cuentaId;
      this._eventos = schedulerPrograms.eventos;
      this._eventogenerar = schedulerPrograms.eventogenerar;
      this._zonaiid = schedulerPrograms.zonaiid;
      this._usuarioiid = schedulerPrograms.usuarioiid;
      this._programtype = schedulerPrograms.programtype;
      this._starthour = schedulerPrograms.starthour;
      this._startminutes = schedulerPrograms.startminutes;
      this._endhour = schedulerPrograms.endhour;
      this._endminutes = schedulerPrograms.endminutes;
      this._dayofweek = schedulerPrograms.dayofweek;
      this._dayofmonth = schedulerPrograms.dayofmonth;
      if (schedulerPrograms.CallerObject != null)
        this.CallerObject = schedulerPrograms.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerSchedulerPrograms schedulerPrograms = new CallerSchedulerPrograms();
      schedulerPrograms.Id = this.Id;
      schedulerPrograms.Name = this.Name;
      schedulerPrograms.cuentaId = this._cuentaId;
      schedulerPrograms.eventos = this._eventos;
      schedulerPrograms.eventogenerar = this._eventogenerar;
      schedulerPrograms.zonaiid = this._zonaiid;
      schedulerPrograms.usuarioiid = this._usuarioiid;
      schedulerPrograms.programtype = this._programtype;
      schedulerPrograms.starthour = this._starthour;
      schedulerPrograms.startminutes = this._startminutes;
      schedulerPrograms.endhour = this._endhour;
      schedulerPrograms.endminutes = this._endminutes;
      schedulerPrograms.dayofweek = this._dayofweek;
      schedulerPrograms.dayofmonth = this._dayofmonth;
      return (CallerObject) schedulerPrograms;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("cuentaId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("eventos", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eventogenerar", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zonaiid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("usuarioiid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("programtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("starthour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endhour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofweek", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofmonth", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["cuentaId"] = (object) this._cuentaId;
      row["eventos"] = (object) this._eventos;
      row["eventogenerar"] = (object) this._eventogenerar;
      row["zonaiid"] = (object) this._zonaiid;
      row["usuarioiid"] = (object) this._usuarioiid;
      row["programtype"] = (object) this._programtype;
      row["starthour"] = (object) this._starthour;
      row["startminutes"] = (object) this._startminutes;
      row["endhour"] = (object) this._endhour;
      row["endminutes"] = (object) this._endminutes;
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsByChildObject", connection))
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
              SimpleSchedulerPrograms schedulerPrograms = new SimpleSchedulerPrograms();
              schedulerPrograms.Id = sqlDataReader.GetInt32(0);
              schedulerPrograms.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                schedulerPrograms.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                schedulerPrograms.eventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                schedulerPrograms.eventogenerar = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                schedulerPrograms.zonaiid = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                schedulerPrograms.usuarioiid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                schedulerPrograms.programtype = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                schedulerPrograms.starthour = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                schedulerPrograms.startminutes = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                schedulerPrograms.endhour = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                schedulerPrograms.endminutes = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                schedulerPrograms.dayofweek = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                schedulerPrograms.dayofmonth = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              schedulerPrograms.CallerObject = Object.GetCallerObject();
              schedulerPrograms.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) schedulerPrograms);
              objectCollection.Add((SimpleBaseObject) schedulerPrograms);
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
        SimpleSchedulerPrograms schedulerPrograms = new SimpleSchedulerPrograms();
        schedulerPrograms.Id = (int) row["Id"];
        schedulerPrograms.Name = (string) row["Name"];
        schedulerPrograms.cuentaId = row["cuentaId"] == DBNull.Value ? 0 : (int) row["cuentaId"];
        schedulerPrograms.eventos = row["eventos"] == DBNull.Value ? "" : (string) row["eventos"];
        schedulerPrograms.eventogenerar = row["eventogenerar"] == DBNull.Value ? "" : (string) row["eventogenerar"];
        schedulerPrograms.zonaiid = row["zonaiid"] == DBNull.Value ? 0 : (int) row["zonaiid"];
        schedulerPrograms.usuarioiid = row["usuarioiid"] == DBNull.Value ? 0 : (int) row["usuarioiid"];
        schedulerPrograms.programtype = row["programtype"] == DBNull.Value ? "" : (string) row["programtype"];
        schedulerPrograms.starthour = row["starthour"] == DBNull.Value ? 0 : (int) row["starthour"];
        schedulerPrograms.startminutes = row["startminutes"] == DBNull.Value ? 0 : (int) row["startminutes"];
        schedulerPrograms.endhour = row["endhour"] == DBNull.Value ? 0 : (int) row["endhour"];
        schedulerPrograms.endminutes = row["endminutes"] == DBNull.Value ? 0 : (int) row["endminutes"];
        schedulerPrograms.dayofweek = row["dayofweek"] == DBNull.Value ? 0 : (int) row["dayofweek"];
        schedulerPrograms.dayofmonth = row["dayofmonth"] == DBNull.Value ? 0 : (int) row["dayofmonth"];
        schedulerPrograms.CallerObject = Object.GetCallerObject();
        schedulerPrograms.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) schedulerPrograms);
        if (Recursive)
          schedulerPrograms.Dependencies = this.GetChildsByObject((SimpleBaseObject) schedulerPrograms, Recursive);
        objectCollection.Add((SimpleBaseObject) schedulerPrograms);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsByParentObject", connection))
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
              SimpleSchedulerPrograms schedulerPrograms = new SimpleSchedulerPrograms();
              schedulerPrograms.Id = sqlDataReader.GetInt32(0);
              schedulerPrograms.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                schedulerPrograms.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                schedulerPrograms.eventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                schedulerPrograms.eventogenerar = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                schedulerPrograms.zonaiid = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                schedulerPrograms.usuarioiid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                schedulerPrograms.programtype = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                schedulerPrograms.starthour = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                schedulerPrograms.startminutes = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                schedulerPrograms.endhour = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                schedulerPrograms.endminutes = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                schedulerPrograms.dayofweek = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                schedulerPrograms.dayofmonth = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              schedulerPrograms.CallerObject = Object.GetCallerObject();
              schedulerPrograms.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) schedulerPrograms);
              objectCollection.Add((SimpleBaseObject) schedulerPrograms);
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleSchedulerPrograms Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("SchedulerProgramsBySimpleSchedulerPrograms", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@cuentaId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@eventos", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@eventogenerar", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@zonaiid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@usuarioiid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@programtype", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@starthour", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@startminutes", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@endhour", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@endminutes", SqlDbType.Int));
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
            selectCommand.Parameters["@cuentaId"].Value = (object) this._cuentaId;
            selectCommand.Parameters["@eventos"].Value = this._eventos == null ? (object) DBNull.Value : (object) this._eventos;
            selectCommand.Parameters["@eventogenerar"].Value = this._eventogenerar == null ? (object) DBNull.Value : (object) this._eventogenerar;
            selectCommand.Parameters["@zonaiid"].Value = (object) this._zonaiid;
            selectCommand.Parameters["@usuarioiid"].Value = (object) this._usuarioiid;
            selectCommand.Parameters["@programtype"].Value = this._programtype == null ? (object) DBNull.Value : (object) this._programtype;
            selectCommand.Parameters["@starthour"].Value = (object) this._starthour;
            selectCommand.Parameters["@startminutes"].Value = (object) this._startminutes;
            selectCommand.Parameters["@endhour"].Value = (object) this._endhour;
            selectCommand.Parameters["@endminutes"].Value = (object) this._endminutes;
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

    public IEnumerable<SimpleSchedulerPrograms> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleSchedulerPrograms Simple = new SimpleSchedulerPrograms();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.eventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.eventogenerar = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.zonaiid = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.usuarioiid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.programtype = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.starthour = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.startminutes = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.endhour = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.endminutes = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.dayofweek = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.dayofmonth = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleSchedulerPrograms> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("SchedulerProgramsByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleSchedulerPrograms Simple = new SimpleSchedulerPrograms();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.cuentaId = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.eventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.eventogenerar = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.zonaiid = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.usuarioiid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.programtype = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.starthour = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.startminutes = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.endhour = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.endminutes = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.dayofweek = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.dayofmonth = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3133, "SchedulerPrograms");
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
          this._eventos = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._eventogenerar = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._zonaiid = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
        if (Reader.FieldCount > 6)
          this._usuarioiid = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
        if (Reader.FieldCount > 7)
          this._programtype = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._starthour = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
        if (Reader.FieldCount > 9)
          this._startminutes = Reader.IsDBNull(9) ? 0 : Reader.GetInt32(9);
        if (Reader.FieldCount > 10)
          this._endhour = Reader.IsDBNull(10) ? 0 : Reader.GetInt32(10);
        if (Reader.FieldCount > 11)
          this._endminutes = Reader.IsDBNull(11) ? 0 : Reader.GetInt32(11);
        if (Reader.FieldCount > 12)
          this._dayofweek = Reader.IsDBNull(12) ? 0 : Reader.GetInt32(12);
        if (Reader.FieldCount > 13)
          this._dayofmonth = Reader.IsDBNull(13) ? 0 : Reader.GetInt32(13);
      }
      Reader.Close();
    }
  }
}
