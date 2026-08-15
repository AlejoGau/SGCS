// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalSerTecTimeLine
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
  public class DalSerTecTimeLine : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _stl_iServicio;
    private DateTime? _stl_tFechaHora;
    private string _stl_cAccion;
    private string _stl_cObservacion;
    private int _stl_iUsuarioDSS;

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

    public int stl_iServicio
    {
      get
      {
        return this._stl_iServicio;
      }
      set
      {
        this._stl_iServicio = value;
      }
    }

    public DateTime? stl_tFechaHora
    {
      get
      {
        return this._stl_tFechaHora;
      }
      set
      {
        this._stl_tFechaHora = value;
      }
    }

    public string stl_cAccion
    {
      get
      {
        return this._stl_cAccion;
      }
      set
      {
        this._stl_cAccion = value;
      }
    }

    public string stl_cObservacion
    {
      get
      {
        return this._stl_cObservacion;
      }
      set
      {
        this._stl_cObservacion = value;
      }
    }

    public int stl_iUsuarioDSS
    {
      get
      {
        return this._stl_iUsuarioDSS;
      }
      set
      {
        this._stl_iUsuarioDSS = value;
      }
    }

    public DalSerTecTimeLine(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalSerTecTimeLine(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalSerTecTimeLine(SqlHelper SqlConfig, int UserId, SimpleSerTecTimeLine Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._stl_iServicio = Simple.stl_iServicio;
      this._stl_tFechaHora = Simple.stl_tFechaHora;
      this._stl_cAccion = Simple.stl_cAccion;
      this._stl_cObservacion = Simple.stl_cObservacion;
      this._stl_iUsuarioDSS = Simple.stl_iUsuarioDSS;
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
            using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_iServicio", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_tFechaHora", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_cAccion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_cObservacion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_iUsuarioDSS", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@stl_iServicio"].Value = (object) this._stl_iServicio;
              SqlParameter parameter = sqlCommand.Parameters["@stl_tFechaHora"];
              DateTime? stlTFechaHora = this._stl_tFechaHora;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!stlTFechaHora.HasValue ? 0 : (stlTFechaHora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._stl_tFechaHora;
              parameter.Value = obj;
              sqlCommand.Parameters["@stl_cAccion"].Value = this._stl_cAccion == null ? (object) DBNull.Value : (object) this._stl_cAccion;
              sqlCommand.Parameters["@stl_cObservacion"].Value = this._stl_cObservacion == null ? (object) DBNull.Value : (object) this._stl_cObservacion;
              sqlCommand.Parameters["@stl_iUsuarioDSS"].Value = (object) this._stl_iUsuarioDSS;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_iServicio", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_tFechaHora", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_cAccion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_cObservacion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stl_iUsuarioDSS", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@stl_iServicio"].Value = (object) this._stl_iServicio;
              SqlParameter parameter = sqlCommand.Parameters["@stl_tFechaHora"];
              DateTime? stlTFechaHora = this._stl_tFechaHora;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!stlTFechaHora.HasValue ? 0 : (stlTFechaHora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._stl_tFechaHora;
              parameter.Value = obj;
              sqlCommand.Parameters["@stl_cAccion"].Value = this._stl_cAccion == null ? (object) DBNull.Value : (object) this._stl_cAccion;
              sqlCommand.Parameters["@stl_cObservacion"].Value = this._stl_cObservacion == null ? (object) DBNull.Value : (object) this._stl_cObservacion;
              sqlCommand.Parameters["@stl_iUsuarioDSS"].Value = (object) this._stl_iUsuarioDSS;
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
        throw new RuntimeException("The SerTecTimeLine is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineSel", connection))
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
      SimpleSerTecTimeLine simpleSerTecTimeLine = new SimpleSerTecTimeLine();
      simpleSerTecTimeLine.Id = this.Id;
      simpleSerTecTimeLine.Name = this.Name;
      simpleSerTecTimeLine.stl_iServicio = this._stl_iServicio;
      simpleSerTecTimeLine.stl_tFechaHora = this._stl_tFechaHora;
      simpleSerTecTimeLine.stl_cAccion = this._stl_cAccion;
      simpleSerTecTimeLine.stl_cObservacion = this._stl_cObservacion;
      simpleSerTecTimeLine.stl_iUsuarioDSS = this._stl_iUsuarioDSS;
      if (this.CallerObject != null)
        simpleSerTecTimeLine.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleSerTecTimeLine;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleSerTecTimeLine simpleSerTecTimeLine = (SimpleSerTecTimeLine) BaseSimple;
      this.Id = simpleSerTecTimeLine.Id;
      this.Name = simpleSerTecTimeLine.Name;
      this._stl_iServicio = simpleSerTecTimeLine.stl_iServicio;
      this._stl_tFechaHora = simpleSerTecTimeLine.stl_tFechaHora;
      this._stl_cAccion = simpleSerTecTimeLine.stl_cAccion;
      this._stl_cObservacion = simpleSerTecTimeLine.stl_cObservacion;
      this._stl_iUsuarioDSS = simpleSerTecTimeLine.stl_iUsuarioDSS;
      if (simpleSerTecTimeLine.CallerObject != null)
        this.CallerObject = simpleSerTecTimeLine.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerSerTecTimeLine callerSerTecTimeLine = new CallerSerTecTimeLine();
      callerSerTecTimeLine.Id = this.Id;
      callerSerTecTimeLine.Name = this.Name;
      callerSerTecTimeLine.stl_iServicio = this._stl_iServicio;
      callerSerTecTimeLine.stl_tFechaHora = this._stl_tFechaHora;
      callerSerTecTimeLine.stl_cAccion = this._stl_cAccion;
      callerSerTecTimeLine.stl_cObservacion = this._stl_cObservacion;
      callerSerTecTimeLine.stl_iUsuarioDSS = this._stl_iUsuarioDSS;
      return (CallerObject) callerSerTecTimeLine;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_iServicio", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stl_tFechaHora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("stl_cAccion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_cObservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_iUsuarioDSS", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stl_iServicio"] = (object) this._stl_iServicio;
      row["stl_tFechaHora"] = (object) this._stl_tFechaHora;
      row["stl_cAccion"] = (object) this._stl_cAccion;
      row["stl_cObservacion"] = (object) this._stl_cObservacion;
      row["stl_iUsuarioDSS"] = (object) this._stl_iUsuarioDSS;
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
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineByChildObject", connection))
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
              SimpleSerTecTimeLine simpleSerTecTimeLine = new SimpleSerTecTimeLine();
              simpleSerTecTimeLine.Id = sqlDataReader.GetInt32(0);
              simpleSerTecTimeLine.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleSerTecTimeLine.stl_iServicio = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleSerTecTimeLine.stl_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                simpleSerTecTimeLine.stl_cAccion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleSerTecTimeLine.stl_cObservacion = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleSerTecTimeLine.stl_iUsuarioDSS = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              simpleSerTecTimeLine.CallerObject = Object.GetCallerObject();
              simpleSerTecTimeLine.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleSerTecTimeLine);
              objectCollection.Add((SimpleBaseObject) simpleSerTecTimeLine);
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
        SimpleSerTecTimeLine simpleSerTecTimeLine = new SimpleSerTecTimeLine();
        simpleSerTecTimeLine.Id = (int) row["Id"];
        simpleSerTecTimeLine.Name = (string) row["Name"];
        simpleSerTecTimeLine.stl_iServicio = row["stl_iServicio"] == DBNull.Value ? 0 : (int) row["stl_iServicio"];
        simpleSerTecTimeLine.stl_tFechaHora = row["stl_tFechaHora"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["stl_tFechaHora"];
        simpleSerTecTimeLine.stl_cAccion = row["stl_cAccion"] == DBNull.Value ? "" : (string) row["stl_cAccion"];
        simpleSerTecTimeLine.stl_cObservacion = row["stl_cObservacion"] == DBNull.Value ? "" : (string) row["stl_cObservacion"];
        simpleSerTecTimeLine.stl_iUsuarioDSS = row["stl_iUsuarioDSS"] == DBNull.Value ? 0 : (int) row["stl_iUsuarioDSS"];
        simpleSerTecTimeLine.CallerObject = Object.GetCallerObject();
        simpleSerTecTimeLine.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleSerTecTimeLine);
        if (Recursive)
          simpleSerTecTimeLine.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleSerTecTimeLine, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleSerTecTimeLine);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineByParentObject", connection))
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
              SimpleSerTecTimeLine simpleSerTecTimeLine = new SimpleSerTecTimeLine();
              simpleSerTecTimeLine.Id = sqlDataReader.GetInt32(0);
              simpleSerTecTimeLine.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleSerTecTimeLine.stl_iServicio = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleSerTecTimeLine.stl_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                simpleSerTecTimeLine.stl_cAccion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleSerTecTimeLine.stl_cObservacion = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleSerTecTimeLine.stl_iUsuarioDSS = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              simpleSerTecTimeLine.CallerObject = Object.GetCallerObject();
              simpleSerTecTimeLine.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleSerTecTimeLine);
              objectCollection.Add((SimpleBaseObject) simpleSerTecTimeLine);
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
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleSerTecTimeLine Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("SerTecTimeLineBySimpleSerTecTimeLine", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stl_iServicio", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@stl_tFechaHora", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@stl_cAccion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stl_cObservacion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stl_iUsuarioDSS", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@stl_iServicio"].Value = (object) this._stl_iServicio;
            SqlParameter parameter = selectCommand.Parameters["@stl_tFechaHora"];
            DateTime? stlTFechaHora = this._stl_tFechaHora;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!stlTFechaHora.HasValue ? 0 : (stlTFechaHora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._stl_tFechaHora;
            parameter.Value = obj;
            selectCommand.Parameters["@stl_cAccion"].Value = this._stl_cAccion == null ? (object) DBNull.Value : (object) this._stl_cAccion;
            selectCommand.Parameters["@stl_cObservacion"].Value = this._stl_cObservacion == null ? (object) DBNull.Value : (object) this._stl_cObservacion;
            selectCommand.Parameters["@stl_iUsuarioDSS"].Value = (object) this._stl_iUsuarioDSS;
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

    public IEnumerable<SimpleSerTecTimeLine> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleSerTecTimeLine Simple = new SimpleSerTecTimeLine();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.stl_iServicio = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.stl_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                Simple.stl_cAccion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.stl_cObservacion = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.stl_iUsuarioDSS = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleSerTecTimeLine> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("SerTecTimeLineByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleSerTecTimeLine Simple = new SimpleSerTecTimeLine();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.stl_iServicio = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.stl_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                Simple.stl_cAccion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.stl_cObservacion = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.stl_iUsuarioDSS = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3124, "SerTecTimeLine");
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
          this._stl_iServicio = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._stl_tFechaHora = new DateTime?(Reader.IsDBNull(3) ? new DateTime(1, 1, 1) : Reader.GetDateTime(3));
        if (Reader.FieldCount > 4)
          this._stl_cAccion = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._stl_cObservacion = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._stl_iUsuarioDSS = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
      }
      Reader.Close();
    }
  }
}
