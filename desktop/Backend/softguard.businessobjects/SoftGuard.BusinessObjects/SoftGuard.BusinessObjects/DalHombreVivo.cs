// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalHombreVivo
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
  public class DalHombreVivo : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private DateTime? _fecha;
    private int _proximo;
    private int _idscheduler;
    private string _imei;
    private int _idcuenta;

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

    public DateTime? fecha
    {
      get
      {
        return this._fecha;
      }
      set
      {
        this._fecha = value;
      }
    }

    public int proximo
    {
      get
      {
        return this._proximo;
      }
      set
      {
        this._proximo = value;
      }
    }

    public int idscheduler
    {
      get
      {
        return this._idscheduler;
      }
      set
      {
        this._idscheduler = value;
      }
    }

    public string imei
    {
      get
      {
        return this._imei;
      }
      set
      {
        this._imei = value;
      }
    }

    public int idcuenta
    {
      get
      {
        return this._idcuenta;
      }
      set
      {
        this._idcuenta = value;
      }
    }

    public DalHombreVivo(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalHombreVivo(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalHombreVivo(SqlHelper SqlConfig, int UserId, SimpleHombreVivo Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._fecha = Simple.fecha;
      this._proximo = Simple.proximo;
      this._idscheduler = Simple.idscheduler;
      this._imei = Simple.imei;
      this._idcuenta = Simple.idcuenta;
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
            using (SqlCommand sqlCommand = new SqlCommand("HombreVivoIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@fecha", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@proximo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@idscheduler", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@imei", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@idcuenta", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              SqlParameter parameter = sqlCommand.Parameters["@fecha"];
              DateTime? fecha = this._fecha;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!fecha.HasValue ? 0 : (fecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._fecha;
              parameter.Value = obj;
              sqlCommand.Parameters["@proximo"].Value = (object) this._proximo;
              sqlCommand.Parameters["@idscheduler"].Value = (object) this._idscheduler;
              sqlCommand.Parameters["@imei"].Value = this._imei == null ? (object) DBNull.Value : (object) this._imei;
              sqlCommand.Parameters["@idcuenta"].Value = (object) this._idcuenta;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("HombreVivoUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@fecha", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@proximo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@idscheduler", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@imei", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@idcuenta", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              SqlParameter parameter = sqlCommand.Parameters["@fecha"];
              DateTime? fecha = this._fecha;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!fecha.HasValue ? 0 : (fecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._fecha;
              parameter.Value = obj;
              sqlCommand.Parameters["@proximo"].Value = (object) this._proximo;
              sqlCommand.Parameters["@idscheduler"].Value = (object) this._idscheduler;
              sqlCommand.Parameters["@imei"].Value = this._imei == null ? (object) DBNull.Value : (object) this._imei;
              sqlCommand.Parameters["@idcuenta"].Value = (object) this._idcuenta;
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
        throw new RuntimeException("The HombreVivo is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("HombreVivoDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HombreVivoSel", connection))
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
      SimpleHombreVivo simpleHombreVivo = new SimpleHombreVivo();
      simpleHombreVivo.Id = this.Id;
      simpleHombreVivo.Name = this.Name;
      simpleHombreVivo.fecha = this._fecha;
      simpleHombreVivo.proximo = this._proximo;
      simpleHombreVivo.idscheduler = this._idscheduler;
      simpleHombreVivo.imei = this._imei;
      simpleHombreVivo.idcuenta = this._idcuenta;
      if (this.CallerObject != null)
        simpleHombreVivo.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleHombreVivo;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleHombreVivo simpleHombreVivo = (SimpleHombreVivo) BaseSimple;
      this.Id = simpleHombreVivo.Id;
      this.Name = simpleHombreVivo.Name;
      this._fecha = simpleHombreVivo.fecha;
      this._proximo = simpleHombreVivo.proximo;
      this._idscheduler = simpleHombreVivo.idscheduler;
      this._imei = simpleHombreVivo.imei;
      this._idcuenta = simpleHombreVivo.idcuenta;
      if (simpleHombreVivo.CallerObject != null)
        this.CallerObject = simpleHombreVivo.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerHombreVivo callerHombreVivo = new CallerHombreVivo();
      callerHombreVivo.Id = this.Id;
      callerHombreVivo.Name = this.Name;
      callerHombreVivo.fecha = this._fecha;
      callerHombreVivo.proximo = this._proximo;
      callerHombreVivo.idscheduler = this._idscheduler;
      callerHombreVivo.imei = this._imei;
      callerHombreVivo.idcuenta = this._idcuenta;
      return (CallerObject) callerHombreVivo;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("fecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("proximo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("idscheduler", typeof (int)));
      dataTable.Columns.Add(new DataColumn("imei", typeof (string)));
      dataTable.Columns.Add(new DataColumn("idcuenta", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["fecha"] = (object) this._fecha;
      row["proximo"] = (object) this._proximo;
      row["idscheduler"] = (object) this._idscheduler;
      row["imei"] = (object) this._imei;
      row["idcuenta"] = (object) this._idcuenta;
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
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HombreVivoByChildObject", connection))
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
              SimpleHombreVivo simpleHombreVivo = new SimpleHombreVivo();
              simpleHombreVivo.Id = sqlDataReader.GetInt32(0);
              simpleHombreVivo.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleHombreVivo.fecha = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                simpleHombreVivo.proximo = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simpleHombreVivo.idscheduler = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleHombreVivo.imei = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleHombreVivo.idcuenta = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              simpleHombreVivo.CallerObject = Object.GetCallerObject();
              simpleHombreVivo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleHombreVivo);
              objectCollection.Add((SimpleBaseObject) simpleHombreVivo);
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
        SimpleHombreVivo simpleHombreVivo = new SimpleHombreVivo();
        simpleHombreVivo.Id = (int) row["Id"];
        simpleHombreVivo.Name = (string) row["Name"];
        simpleHombreVivo.fecha = row["fecha"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["fecha"];
        simpleHombreVivo.proximo = row["proximo"] == DBNull.Value ? 0 : (int) row["proximo"];
        simpleHombreVivo.idscheduler = row["idscheduler"] == DBNull.Value ? 0 : (int) row["idscheduler"];
        simpleHombreVivo.imei = row["imei"] == DBNull.Value ? "" : (string) row["imei"];
        simpleHombreVivo.idcuenta = row["idcuenta"] == DBNull.Value ? 0 : (int) row["idcuenta"];
        simpleHombreVivo.CallerObject = Object.GetCallerObject();
        simpleHombreVivo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleHombreVivo);
        if (Recursive)
          simpleHombreVivo.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleHombreVivo, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleHombreVivo);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HombreVivoByParentObject", connection))
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
              SimpleHombreVivo simpleHombreVivo = new SimpleHombreVivo();
              simpleHombreVivo.Id = sqlDataReader.GetInt32(0);
              simpleHombreVivo.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleHombreVivo.fecha = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                simpleHombreVivo.proximo = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simpleHombreVivo.idscheduler = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleHombreVivo.imei = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleHombreVivo.idcuenta = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              simpleHombreVivo.CallerObject = Object.GetCallerObject();
              simpleHombreVivo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleHombreVivo);
              objectCollection.Add((SimpleBaseObject) simpleHombreVivo);
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
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleHombreVivo Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("HombreVivoBySimpleHombreVivo", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@fecha", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@proximo", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@idscheduler", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@imei", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@idcuenta", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            SqlParameter parameter = selectCommand.Parameters["@fecha"];
            DateTime? fecha = this._fecha;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!fecha.HasValue ? 0 : (fecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._fecha;
            parameter.Value = obj;
            selectCommand.Parameters["@proximo"].Value = (object) this._proximo;
            selectCommand.Parameters["@idscheduler"].Value = (object) this._idscheduler;
            selectCommand.Parameters["@imei"].Value = this._imei == null ? (object) DBNull.Value : (object) this._imei;
            selectCommand.Parameters["@idcuenta"].Value = (object) this._idcuenta;
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

    public IEnumerable<SimpleHombreVivo> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("HombreVivoByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHombreVivo Simple = new SimpleHombreVivo();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.fecha = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                Simple.proximo = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.idscheduler = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.imei = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.idcuenta = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleHombreVivo> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("HombreVivoByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHombreVivo Simple = new SimpleHombreVivo();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.fecha = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                Simple.proximo = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.idscheduler = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.imei = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.idcuenta = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3116, "HombreVivo");
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
          this._fecha = new DateTime?(Reader.IsDBNull(2) ? new DateTime(1, 1, 1) : Reader.GetDateTime(2));
        if (Reader.FieldCount > 3)
          this._proximo = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        if (Reader.FieldCount > 4)
          this._idscheduler = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._imei = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._idcuenta = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
      }
      Reader.Close();
    }
  }
}
