// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_movilespatrulla
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
  public class Dalt_movilespatrulla : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _tmp_cnombre;
    private string _tmp_cnumero;
    private string _tmp_clicencia;
    private string _tmp_cmarca;
    private string _tmp_cmodelo;
    private string _tmp_cpathfoto;
    private string _tmp_cflota;
    private Decimal _tmp_nestado;
    private int _tmp_icuenta;
    private int _tmp_iAsignado;

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

    public string tmp_cnombre
    {
      get
      {
        return this._tmp_cnombre;
      }
      set
      {
        this._tmp_cnombre = value;
      }
    }

    public string tmp_cnumero
    {
      get
      {
        return this._tmp_cnumero;
      }
      set
      {
        this._tmp_cnumero = value;
      }
    }

    public string tmp_clicencia
    {
      get
      {
        return this._tmp_clicencia;
      }
      set
      {
        this._tmp_clicencia = value;
      }
    }

    public string tmp_cmarca
    {
      get
      {
        return this._tmp_cmarca;
      }
      set
      {
        this._tmp_cmarca = value;
      }
    }

    public string tmp_cmodelo
    {
      get
      {
        return this._tmp_cmodelo;
      }
      set
      {
        this._tmp_cmodelo = value;
      }
    }

    public string tmp_cpathfoto
    {
      get
      {
        return this._tmp_cpathfoto;
      }
      set
      {
        this._tmp_cpathfoto = value;
      }
    }

    public string tmp_cflota
    {
      get
      {
        return this._tmp_cflota;
      }
      set
      {
        this._tmp_cflota = value;
      }
    }

    public Decimal tmp_nestado
    {
      get
      {
        return this._tmp_nestado;
      }
      set
      {
        this._tmp_nestado = value;
      }
    }

    public int tmp_icuenta
    {
      get
      {
        return this._tmp_icuenta;
      }
      set
      {
        this._tmp_icuenta = value;
      }
    }

    public int tmp_iAsignado
    {
      get
      {
        return this._tmp_iAsignado;
      }
      set
      {
        this._tmp_iAsignado = value;
      }
    }

    public Dalt_movilespatrulla(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_movilespatrulla(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_movilespatrulla(SqlHelper SqlConfig, int UserId, Simplet_movilespatrulla Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tmp_cnombre = Simple.tmp_cnombre;
      this._tmp_cnumero = Simple.tmp_cnumero;
      this._tmp_clicencia = Simple.tmp_clicencia;
      this._tmp_cmarca = Simple.tmp_cmarca;
      this._tmp_cmodelo = Simple.tmp_cmodelo;
      this._tmp_cpathfoto = Simple.tmp_cpathfoto;
      this._tmp_cflota = Simple.tmp_cflota;
      this._tmp_nestado = Simple.tmp_nestado;
      this._tmp_icuenta = Simple.tmp_icuenta;
      this._tmp_iAsignado = Simple.tmp_iAsignado;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cnumero", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_clicencia", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cmarca", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cmodelo", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cpathfoto", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cflota", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_icuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_iAsignado", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tmp_cnombre"].Value = this._tmp_cnombre == null ? (object) DBNull.Value : (object) this._tmp_cnombre;
              sqlCommand.Parameters["@tmp_cnumero"].Value = this._tmp_cnumero == null ? (object) DBNull.Value : (object) this._tmp_cnumero;
              sqlCommand.Parameters["@tmp_clicencia"].Value = this._tmp_clicencia == null ? (object) DBNull.Value : (object) this._tmp_clicencia;
              sqlCommand.Parameters["@tmp_cmarca"].Value = this._tmp_cmarca == null ? (object) DBNull.Value : (object) this._tmp_cmarca;
              sqlCommand.Parameters["@tmp_cmodelo"].Value = this._tmp_cmodelo == null ? (object) DBNull.Value : (object) this._tmp_cmodelo;
              sqlCommand.Parameters["@tmp_cpathfoto"].Value = this._tmp_cpathfoto == null ? (object) DBNull.Value : (object) this._tmp_cpathfoto;
              sqlCommand.Parameters["@tmp_cflota"].Value = this._tmp_cflota == null ? (object) DBNull.Value : (object) this._tmp_cflota;
              sqlCommand.Parameters["@tmp_nestado"].Value = (object) this._tmp_nestado;
              sqlCommand.Parameters["@tmp_icuenta"].Value = (object) this._tmp_icuenta;
              sqlCommand.Parameters["@tmp_iAsignado"].Value = (object) this._tmp_iAsignado;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cnumero", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_clicencia", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cmarca", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cmodelo", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cpathfoto", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_cflota", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_icuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@tmp_iAsignado", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tmp_cnombre"].Value = this._tmp_cnombre == null ? (object) DBNull.Value : (object) this._tmp_cnombre;
              sqlCommand.Parameters["@tmp_cnumero"].Value = this._tmp_cnumero == null ? (object) DBNull.Value : (object) this._tmp_cnumero;
              sqlCommand.Parameters["@tmp_clicencia"].Value = this._tmp_clicencia == null ? (object) DBNull.Value : (object) this._tmp_clicencia;
              sqlCommand.Parameters["@tmp_cmarca"].Value = this._tmp_cmarca == null ? (object) DBNull.Value : (object) this._tmp_cmarca;
              sqlCommand.Parameters["@tmp_cmodelo"].Value = this._tmp_cmodelo == null ? (object) DBNull.Value : (object) this._tmp_cmodelo;
              sqlCommand.Parameters["@tmp_cpathfoto"].Value = this._tmp_cpathfoto == null ? (object) DBNull.Value : (object) this._tmp_cpathfoto;
              sqlCommand.Parameters["@tmp_cflota"].Value = this._tmp_cflota == null ? (object) DBNull.Value : (object) this._tmp_cflota;
              sqlCommand.Parameters["@tmp_nestado"].Value = (object) this._tmp_nestado;
              sqlCommand.Parameters["@tmp_icuenta"].Value = (object) this._tmp_icuenta;
              sqlCommand.Parameters["@tmp_iAsignado"].Value = (object) this._tmp_iAsignado;
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
        throw new RuntimeException("The t_movilespatrulla is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaSel", connection))
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
      Simplet_movilespatrulla simpletMovilespatrulla = new Simplet_movilespatrulla();
      simpletMovilespatrulla.Id = this.Id;
      simpletMovilespatrulla.Name = this.Name;
      simpletMovilespatrulla.tmp_cnombre = this._tmp_cnombre;
      simpletMovilespatrulla.tmp_cnumero = this._tmp_cnumero;
      simpletMovilespatrulla.tmp_clicencia = this._tmp_clicencia;
      simpletMovilespatrulla.tmp_cmarca = this._tmp_cmarca;
      simpletMovilespatrulla.tmp_cmodelo = this._tmp_cmodelo;
      simpletMovilespatrulla.tmp_cpathfoto = this._tmp_cpathfoto;
      simpletMovilespatrulla.tmp_cflota = this._tmp_cflota;
      simpletMovilespatrulla.tmp_nestado = this._tmp_nestado;
      simpletMovilespatrulla.tmp_icuenta = this._tmp_icuenta;
      simpletMovilespatrulla.tmp_iAsignado = this._tmp_iAsignado;
      if (this.CallerObject != null)
        simpletMovilespatrulla.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletMovilespatrulla;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_movilespatrulla simpletMovilespatrulla = (Simplet_movilespatrulla) BaseSimple;
      this.Id = simpletMovilespatrulla.Id;
      this.Name = simpletMovilespatrulla.Name;
      this._tmp_cnombre = simpletMovilespatrulla.tmp_cnombre;
      this._tmp_cnumero = simpletMovilespatrulla.tmp_cnumero;
      this._tmp_clicencia = simpletMovilespatrulla.tmp_clicencia;
      this._tmp_cmarca = simpletMovilespatrulla.tmp_cmarca;
      this._tmp_cmodelo = simpletMovilespatrulla.tmp_cmodelo;
      this._tmp_cpathfoto = simpletMovilespatrulla.tmp_cpathfoto;
      this._tmp_cflota = simpletMovilespatrulla.tmp_cflota;
      this._tmp_nestado = simpletMovilespatrulla.tmp_nestado;
      this._tmp_icuenta = simpletMovilespatrulla.tmp_icuenta;
      this._tmp_iAsignado = simpletMovilespatrulla.tmp_iAsignado;
      if (simpletMovilespatrulla.CallerObject != null)
        this.CallerObject = simpletMovilespatrulla.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_movilespatrulla callertMovilespatrulla = new Callert_movilespatrulla();
      callertMovilespatrulla.Id = this.Id;
      callertMovilespatrulla.Name = this.Name;
      callertMovilespatrulla.tmp_cnombre = this._tmp_cnombre;
      callertMovilespatrulla.tmp_cnumero = this._tmp_cnumero;
      callertMovilespatrulla.tmp_clicencia = this._tmp_clicencia;
      callertMovilespatrulla.tmp_cmarca = this._tmp_cmarca;
      callertMovilespatrulla.tmp_cmodelo = this._tmp_cmodelo;
      callertMovilespatrulla.tmp_cpathfoto = this._tmp_cpathfoto;
      callertMovilespatrulla.tmp_cflota = this._tmp_cflota;
      callertMovilespatrulla.tmp_nestado = this._tmp_nestado;
      callertMovilespatrulla.tmp_icuenta = this._tmp_icuenta;
      callertMovilespatrulla.tmp_iAsignado = this._tmp_iAsignado;
      return (CallerObject) callertMovilespatrulla;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cnumero", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_clicencia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cmarca", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cmodelo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cpathfoto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cflota", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tmp_icuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tmp_iAsignado", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tmp_cnombre"] = (object) this._tmp_cnombre;
      row["tmp_cnumero"] = (object) this._tmp_cnumero;
      row["tmp_clicencia"] = (object) this._tmp_clicencia;
      row["tmp_cmarca"] = (object) this._tmp_cmarca;
      row["tmp_cmodelo"] = (object) this._tmp_cmodelo;
      row["tmp_cpathfoto"] = (object) this._tmp_cpathfoto;
      row["tmp_cflota"] = (object) this._tmp_cflota;
      row["tmp_nestado"] = (object) this._tmp_nestado;
      row["tmp_icuenta"] = (object) this._tmp_icuenta;
      row["tmp_iAsignado"] = (object) this._tmp_iAsignado;
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
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaByChildObject", connection))
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
              Simplet_movilespatrulla simpletMovilespatrulla = new Simplet_movilespatrulla();
              simpletMovilespatrulla.Id = sqlDataReader.GetInt32(0);
              simpletMovilespatrulla.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletMovilespatrulla.tmp_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletMovilespatrulla.tmp_cnumero = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletMovilespatrulla.tmp_clicencia = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletMovilespatrulla.tmp_cmarca = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletMovilespatrulla.tmp_cmodelo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpletMovilespatrulla.tmp_cpathfoto = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpletMovilespatrulla.tmp_cflota = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpletMovilespatrulla.tmp_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                simpletMovilespatrulla.tmp_icuenta = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                simpletMovilespatrulla.tmp_iAsignado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              simpletMovilespatrulla.CallerObject = Object.GetCallerObject();
              simpletMovilespatrulla.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMovilespatrulla);
              objectCollection.Add((SimpleBaseObject) simpletMovilespatrulla);
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
        Simplet_movilespatrulla simpletMovilespatrulla = new Simplet_movilespatrulla();
        simpletMovilespatrulla.Id = (int) row["Id"];
        simpletMovilespatrulla.Name = (string) row["Name"];
        simpletMovilespatrulla.tmp_cnombre = row["tmp_cnombre"] == DBNull.Value ? "" : (string) row["tmp_cnombre"];
        simpletMovilespatrulla.tmp_cnumero = row["tmp_cnumero"] == DBNull.Value ? "" : (string) row["tmp_cnumero"];
        simpletMovilespatrulla.tmp_clicencia = row["tmp_clicencia"] == DBNull.Value ? "" : (string) row["tmp_clicencia"];
        simpletMovilespatrulla.tmp_cmarca = row["tmp_cmarca"] == DBNull.Value ? "" : (string) row["tmp_cmarca"];
        simpletMovilespatrulla.tmp_cmodelo = row["tmp_cmodelo"] == DBNull.Value ? "" : (string) row["tmp_cmodelo"];
        simpletMovilespatrulla.tmp_cpathfoto = row["tmp_cpathfoto"] == DBNull.Value ? "" : (string) row["tmp_cpathfoto"];
        simpletMovilespatrulla.tmp_cflota = row["tmp_cflota"] == DBNull.Value ? "" : (string) row["tmp_cflota"];
        simpletMovilespatrulla.tmp_nestado = row["tmp_nestado"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tmp_nestado"];
        simpletMovilespatrulla.tmp_icuenta = row["tmp_icuenta"] == DBNull.Value ? 0 : (int) row["tmp_icuenta"];
        simpletMovilespatrulla.tmp_iAsignado = row["tmp_iAsignado"] == DBNull.Value ? 0 : (int) row["tmp_iAsignado"];
        simpletMovilespatrulla.CallerObject = Object.GetCallerObject();
        simpletMovilespatrulla.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMovilespatrulla);
        if (Recursive)
          simpletMovilespatrulla.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletMovilespatrulla, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletMovilespatrulla);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaByParentObject", connection))
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
              Simplet_movilespatrulla simpletMovilespatrulla = new Simplet_movilespatrulla();
              simpletMovilespatrulla.Id = sqlDataReader.GetInt32(0);
              simpletMovilespatrulla.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletMovilespatrulla.tmp_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletMovilespatrulla.tmp_cnumero = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletMovilespatrulla.tmp_clicencia = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletMovilespatrulla.tmp_cmarca = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletMovilespatrulla.tmp_cmodelo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpletMovilespatrulla.tmp_cpathfoto = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpletMovilespatrulla.tmp_cflota = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpletMovilespatrulla.tmp_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                simpletMovilespatrulla.tmp_icuenta = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                simpletMovilespatrulla.tmp_iAsignado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              simpletMovilespatrulla.CallerObject = Object.GetCallerObject();
              simpletMovilespatrulla.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMovilespatrulla);
              objectCollection.Add((SimpleBaseObject) simpletMovilespatrulla);
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
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_movilespatrulla Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_movilespatrullaBySimplet_movilespatrulla", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_cnombre", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_cnumero", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_clicencia", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_cmarca", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_cmodelo", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_cpathfoto", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_cflota", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_nestado", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_icuenta", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@tmp_iAsignado", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@tmp_cnombre"].Value = this._tmp_cnombre == null ? (object) DBNull.Value : (object) this._tmp_cnombre;
            selectCommand.Parameters["@tmp_cnumero"].Value = this._tmp_cnumero == null ? (object) DBNull.Value : (object) this._tmp_cnumero;
            selectCommand.Parameters["@tmp_clicencia"].Value = this._tmp_clicencia == null ? (object) DBNull.Value : (object) this._tmp_clicencia;
            selectCommand.Parameters["@tmp_cmarca"].Value = this._tmp_cmarca == null ? (object) DBNull.Value : (object) this._tmp_cmarca;
            selectCommand.Parameters["@tmp_cmodelo"].Value = this._tmp_cmodelo == null ? (object) DBNull.Value : (object) this._tmp_cmodelo;
            selectCommand.Parameters["@tmp_cpathfoto"].Value = this._tmp_cpathfoto == null ? (object) DBNull.Value : (object) this._tmp_cpathfoto;
            selectCommand.Parameters["@tmp_cflota"].Value = this._tmp_cflota == null ? (object) DBNull.Value : (object) this._tmp_cflota;
            selectCommand.Parameters["@tmp_nestado"].Value = (object) this._tmp_nestado;
            selectCommand.Parameters["@tmp_icuenta"].Value = (object) this._tmp_icuenta;
            selectCommand.Parameters["@tmp_iAsignado"].Value = (object) this._tmp_iAsignado;
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

    public IEnumerable<Simplet_movilespatrulla> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_movilespatrulla Simple = new Simplet_movilespatrulla();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tmp_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tmp_cnumero = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tmp_clicencia = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tmp_cmarca = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tmp_cmodelo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tmp_cpathfoto = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tmp_cflota = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tmp_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.tmp_icuenta = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.tmp_iAsignado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_movilespatrulla> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_movilespatrullaByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_movilespatrulla Simple = new Simplet_movilespatrulla();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tmp_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tmp_cnumero = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tmp_clicencia = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tmp_cmarca = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tmp_cmodelo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tmp_cpathfoto = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tmp_cflota = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tmp_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.tmp_icuenta = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.tmp_iAsignado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3087, "t_movilespatrulla");
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
          this._tmp_cnombre = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._tmp_cnumero = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._tmp_clicencia = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._tmp_cmarca = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._tmp_cmodelo = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._tmp_cpathfoto = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._tmp_cflota = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._tmp_nestado = Reader.IsDBNull(9) ? new Decimal(0) : Reader.GetDecimal(9);
        if (Reader.FieldCount > 10)
          this._tmp_icuenta = Reader.IsDBNull(10) ? 0 : Reader.GetInt32(10);
        if (Reader.FieldCount > 11)
          this._tmp_iAsignado = Reader.IsDBNull(11) ? 0 : Reader.GetInt32(11);
      }
      Reader.Close();
    }
  }
}
