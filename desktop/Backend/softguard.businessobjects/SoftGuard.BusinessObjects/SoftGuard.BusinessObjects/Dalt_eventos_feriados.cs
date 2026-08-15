// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_eventos_feriados
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
  public class Dalt_eventos_feriados : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _eve_ccodigo;
    private string _eve_cdescripcion;
    private DateTime? _eve_dfechadesdes;
    private string _eve_choradesde;
    private DateTime? _eve_dfechahasta;
    private string _eve_chorahasta;

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

    public string eve_ccodigo
    {
      get
      {
        return this._eve_ccodigo;
      }
      set
      {
        this._eve_ccodigo = value;
      }
    }

    public string eve_cdescripcion
    {
      get
      {
        return this._eve_cdescripcion;
      }
      set
      {
        this._eve_cdescripcion = value;
      }
    }

    public DateTime? eve_dfechadesdes
    {
      get
      {
        return this._eve_dfechadesdes;
      }
      set
      {
        this._eve_dfechadesdes = value;
      }
    }

    public string eve_choradesde
    {
      get
      {
        return this._eve_choradesde;
      }
      set
      {
        this._eve_choradesde = value;
      }
    }

    public DateTime? eve_dfechahasta
    {
      get
      {
        return this._eve_dfechahasta;
      }
      set
      {
        this._eve_dfechahasta = value;
      }
    }

    public string eve_chorahasta
    {
      get
      {
        return this._eve_chorahasta;
      }
      set
      {
        this._eve_chorahasta = value;
      }
    }

    public Dalt_eventos_feriados(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_eventos_feriados(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_eventos_feriados(SqlHelper SqlConfig, int UserId, Simplet_eventos_feriados Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._eve_ccodigo = Simple.eve_ccodigo;
      this._eve_cdescripcion = Simple.eve_cdescripcion;
      this._eve_dfechadesdes = Simple.eve_dfechadesdes;
      this._eve_choradesde = Simple.eve_choradesde;
      this._eve_dfechahasta = Simple.eve_dfechahasta;
      this._eve_chorahasta = Simple.eve_chorahasta;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_dfechadesdes", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_choradesde", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_dfechahasta", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_chorahasta", SqlDbType.NChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@eve_ccodigo"].Value = this._eve_ccodigo == null ? (object) DBNull.Value : (object) this._eve_ccodigo;
              sqlCommand.Parameters["@eve_cdescripcion"].Value = this._eve_cdescripcion == null ? (object) DBNull.Value : (object) this._eve_cdescripcion;
              SqlParameter parameter1 = sqlCommand.Parameters["@eve_dfechadesdes"];
              DateTime? nullable = this._eve_dfechadesdes;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._eve_dfechadesdes;
              parameter1.Value = obj1;
              sqlCommand.Parameters["@eve_choradesde"].Value = this._eve_choradesde == null ? (object) DBNull.Value : (object) this._eve_choradesde;
              SqlParameter parameter2 = sqlCommand.Parameters["@eve_dfechahasta"];
              nullable = this._eve_dfechahasta;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._eve_dfechahasta;
              parameter2.Value = obj2;
              sqlCommand.Parameters["@eve_chorahasta"].Value = this._eve_chorahasta == null ? (object) DBNull.Value : (object) this._eve_chorahasta;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_dfechadesdes", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_choradesde", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_dfechahasta", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@eve_chorahasta", SqlDbType.NChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@eve_ccodigo"].Value = this._eve_ccodigo == null ? (object) DBNull.Value : (object) this._eve_ccodigo;
              sqlCommand.Parameters["@eve_cdescripcion"].Value = this._eve_cdescripcion == null ? (object) DBNull.Value : (object) this._eve_cdescripcion;
              SqlParameter parameter1 = sqlCommand.Parameters["@eve_dfechadesdes"];
              DateTime? nullable = this._eve_dfechadesdes;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._eve_dfechadesdes;
              parameter1.Value = obj1;
              sqlCommand.Parameters["@eve_choradesde"].Value = this._eve_choradesde == null ? (object) DBNull.Value : (object) this._eve_choradesde;
              SqlParameter parameter2 = sqlCommand.Parameters["@eve_dfechahasta"];
              nullable = this._eve_dfechahasta;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._eve_dfechahasta;
              parameter2.Value = obj2;
              sqlCommand.Parameters["@eve_chorahasta"].Value = this._eve_chorahasta == null ? (object) DBNull.Value : (object) this._eve_chorahasta;
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
        throw new RuntimeException("The t_eventos_feriados is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosSel", connection))
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
      Simplet_eventos_feriados simpletEventosFeriados = new Simplet_eventos_feriados();
      simpletEventosFeriados.Id = this.Id;
      simpletEventosFeriados.Name = this.Name;
      simpletEventosFeriados.eve_ccodigo = this._eve_ccodigo;
      simpletEventosFeriados.eve_cdescripcion = this._eve_cdescripcion;
      simpletEventosFeriados.eve_dfechadesdes = this._eve_dfechadesdes;
      simpletEventosFeriados.eve_choradesde = this._eve_choradesde;
      simpletEventosFeriados.eve_dfechahasta = this._eve_dfechahasta;
      simpletEventosFeriados.eve_chorahasta = this._eve_chorahasta;
      if (this.CallerObject != null)
        simpletEventosFeriados.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletEventosFeriados;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_eventos_feriados simpletEventosFeriados = (Simplet_eventos_feriados) BaseSimple;
      this.Id = simpletEventosFeriados.Id;
      this.Name = simpletEventosFeriados.Name;
      this._eve_ccodigo = simpletEventosFeriados.eve_ccodigo;
      this._eve_cdescripcion = simpletEventosFeriados.eve_cdescripcion;
      this._eve_dfechadesdes = simpletEventosFeriados.eve_dfechadesdes;
      this._eve_choradesde = simpletEventosFeriados.eve_choradesde;
      this._eve_dfechahasta = simpletEventosFeriados.eve_dfechahasta;
      this._eve_chorahasta = simpletEventosFeriados.eve_chorahasta;
      if (simpletEventosFeriados.CallerObject != null)
        this.CallerObject = simpletEventosFeriados.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_eventos_feriados callertEventosFeriados = new Callert_eventos_feriados();
      callertEventosFeriados.Id = this.Id;
      callertEventosFeriados.Name = this.Name;
      callertEventosFeriados.eve_ccodigo = this._eve_ccodigo;
      callertEventosFeriados.eve_cdescripcion = this._eve_cdescripcion;
      callertEventosFeriados.eve_dfechadesdes = this._eve_dfechadesdes;
      callertEventosFeriados.eve_choradesde = this._eve_choradesde;
      callertEventosFeriados.eve_dfechahasta = this._eve_dfechahasta;
      callertEventosFeriados.eve_chorahasta = this._eve_chorahasta;
      return (CallerObject) callertEventosFeriados;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_dfechadesdes", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("eve_choradesde", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_dfechahasta", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("eve_chorahasta", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["eve_ccodigo"] = (object) this._eve_ccodigo;
      row["eve_cdescripcion"] = (object) this._eve_cdescripcion;
      row["eve_dfechadesdes"] = (object) this._eve_dfechadesdes;
      row["eve_choradesde"] = (object) this._eve_choradesde;
      row["eve_dfechahasta"] = (object) this._eve_dfechahasta;
      row["eve_chorahasta"] = (object) this._eve_chorahasta;
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
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosByChildObject", connection))
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
              Simplet_eventos_feriados simpletEventosFeriados = new Simplet_eventos_feriados();
              simpletEventosFeriados.Id = sqlDataReader.GetInt32(0);
              simpletEventosFeriados.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletEventosFeriados.eve_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletEventosFeriados.eve_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletEventosFeriados.eve_dfechadesdes = new DateTime?(sqlDataReader.IsDBNull(4) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(4));
              if (sqlDataReader.FieldCount > 5)
                simpletEventosFeriados.eve_choradesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletEventosFeriados.eve_dfechahasta = new DateTime?(sqlDataReader.IsDBNull(6) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(6));
              if (sqlDataReader.FieldCount > 7)
                simpletEventosFeriados.eve_chorahasta = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              simpletEventosFeriados.CallerObject = Object.GetCallerObject();
              simpletEventosFeriados.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletEventosFeriados);
              objectCollection.Add((SimpleBaseObject) simpletEventosFeriados);
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
        Simplet_eventos_feriados simpletEventosFeriados = new Simplet_eventos_feriados();
        simpletEventosFeriados.Id = (int) row["Id"];
        simpletEventosFeriados.Name = (string) row["Name"];
        simpletEventosFeriados.eve_ccodigo = row["eve_ccodigo"] == DBNull.Value ? "" : (string) row["eve_ccodigo"];
        simpletEventosFeriados.eve_cdescripcion = row["eve_cdescripcion"] == DBNull.Value ? "" : (string) row["eve_cdescripcion"];
        simpletEventosFeriados.eve_dfechadesdes = row["eve_dfechadesdes"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["eve_dfechadesdes"];
        simpletEventosFeriados.eve_choradesde = row["eve_choradesde"] == DBNull.Value ? "" : (string) row["eve_choradesde"];
        simpletEventosFeriados.eve_dfechahasta = row["eve_dfechahasta"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["eve_dfechahasta"];
        simpletEventosFeriados.eve_chorahasta = row["eve_chorahasta"] == DBNull.Value ? "" : (string) row["eve_chorahasta"];
        simpletEventosFeriados.CallerObject = Object.GetCallerObject();
        simpletEventosFeriados.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletEventosFeriados);
        if (Recursive)
          simpletEventosFeriados.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletEventosFeriados, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletEventosFeriados);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosByParentObject", connection))
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
              Simplet_eventos_feriados simpletEventosFeriados = new Simplet_eventos_feriados();
              simpletEventosFeriados.Id = sqlDataReader.GetInt32(0);
              simpletEventosFeriados.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletEventosFeriados.eve_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletEventosFeriados.eve_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletEventosFeriados.eve_dfechadesdes = new DateTime?(sqlDataReader.IsDBNull(4) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(4));
              if (sqlDataReader.FieldCount > 5)
                simpletEventosFeriados.eve_choradesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletEventosFeriados.eve_dfechahasta = new DateTime?(sqlDataReader.IsDBNull(6) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(6));
              if (sqlDataReader.FieldCount > 7)
                simpletEventosFeriados.eve_chorahasta = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              simpletEventosFeriados.CallerObject = Object.GetCallerObject();
              simpletEventosFeriados.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletEventosFeriados);
              objectCollection.Add((SimpleBaseObject) simpletEventosFeriados);
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
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_eventos_feriados Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_eventos_feriadosBySimplet_eventos_feriados", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@eve_ccodigo", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@eve_cdescripcion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@eve_dfechadesdes", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@eve_choradesde", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@eve_dfechahasta", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@eve_chorahasta", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@eve_ccodigo"].Value = this._eve_ccodigo == null ? (object) DBNull.Value : (object) this._eve_ccodigo;
            selectCommand.Parameters["@eve_cdescripcion"].Value = this._eve_cdescripcion == null ? (object) DBNull.Value : (object) this._eve_cdescripcion;
            SqlParameter parameter1 = selectCommand.Parameters["@eve_dfechadesdes"];
            DateTime? nullable = this._eve_dfechadesdes;
            DateTime dateTime1 = new DateTime(1, 1, 1);
            object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._eve_dfechadesdes;
            parameter1.Value = obj1;
            selectCommand.Parameters["@eve_choradesde"].Value = this._eve_choradesde == null ? (object) DBNull.Value : (object) this._eve_choradesde;
            SqlParameter parameter2 = selectCommand.Parameters["@eve_dfechahasta"];
            nullable = this._eve_dfechahasta;
            DateTime dateTime2 = new DateTime(1, 1, 1);
            object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._eve_dfechahasta;
            parameter2.Value = obj2;
            selectCommand.Parameters["@eve_chorahasta"].Value = this._eve_chorahasta == null ? (object) DBNull.Value : (object) this._eve_chorahasta;
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

    public IEnumerable<Simplet_eventos_feriados> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_eventos_feriados Simple = new Simplet_eventos_feriados();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.eve_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.eve_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.eve_dfechadesdes = new DateTime?(sqlDataReader.IsDBNull(4) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(4));
              if (sqlDataReader.FieldCount > 5)
                Simple.eve_choradesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.eve_dfechahasta = new DateTime?(sqlDataReader.IsDBNull(6) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(6));
              if (sqlDataReader.FieldCount > 7)
                Simple.eve_chorahasta = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_eventos_feriados> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_eventos_feriadosByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_eventos_feriados Simple = new Simplet_eventos_feriados();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.eve_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.eve_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.eve_dfechadesdes = new DateTime?(sqlDataReader.IsDBNull(4) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(4));
              if (sqlDataReader.FieldCount > 5)
                Simple.eve_choradesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.eve_dfechahasta = new DateTime?(sqlDataReader.IsDBNull(6) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(6));
              if (sqlDataReader.FieldCount > 7)
                Simple.eve_chorahasta = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3077, "t_eventos_feriados");
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
          this._eve_ccodigo = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._eve_cdescripcion = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._eve_dfechadesdes = new DateTime?(Reader.IsDBNull(4) ? new DateTime(1, 1, 1) : Reader.GetDateTime(4));
        if (Reader.FieldCount > 5)
          this._eve_choradesde = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._eve_dfechahasta = new DateTime?(Reader.IsDBNull(6) ? new DateTime(1, 1, 1) : Reader.GetDateTime(6));
        if (Reader.FieldCount > 7)
          this._eve_chorahasta = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
      }
      Reader.Close();
    }
  }
}
