// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalZona
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
  public class DalZona : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _zon_iidcuenta;
    private string _zon_ccodigo;
    private string _zon_cdescripcion;
    private string _zon_codigoalarma;
    private string _zon_clistaemergencia;
    private string _zon_cimagen;
    private string _zon_mobservacion;
    private string _zon_ccodigorestauracion;
    private Decimal _zon_nminutosrestauracion;
    private Decimal _zon_nmostrar;
    private string _zon_cdealer;
    private string _zon_ccuenta;
    private Decimal _zon_nautoprocesa;
    private string _zon_cAlarmaAGenerar;

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

    public int zon_iidcuenta
    {
      get
      {
        return this._zon_iidcuenta;
      }
      set
      {
        this._zon_iidcuenta = value;
      }
    }

    public string zon_ccodigo
    {
      get
      {
        return this._zon_ccodigo;
      }
      set
      {
        this._zon_ccodigo = value;
      }
    }

    public string zon_cdescripcion
    {
      get
      {
        return this._zon_cdescripcion;
      }
      set
      {
        this._zon_cdescripcion = value;
      }
    }

    public string zon_codigoalarma
    {
      get
      {
        return this._zon_codigoalarma;
      }
      set
      {
        this._zon_codigoalarma = value;
      }
    }

    public string zon_clistaemergencia
    {
      get
      {
        return this._zon_clistaemergencia;
      }
      set
      {
        this._zon_clistaemergencia = value;
      }
    }

    public string zon_cimagen
    {
      get
      {
        return this._zon_cimagen;
      }
      set
      {
        this._zon_cimagen = value;
      }
    }

    public string zon_mobservacion
    {
      get
      {
        return this._zon_mobservacion;
      }
      set
      {
        this._zon_mobservacion = value;
      }
    }

    public string zon_ccodigorestauracion
    {
      get
      {
        return this._zon_ccodigorestauracion;
      }
      set
      {
        this._zon_ccodigorestauracion = value;
      }
    }

    public Decimal zon_nminutosrestauracion
    {
      get
      {
        return this._zon_nminutosrestauracion;
      }
      set
      {
        this._zon_nminutosrestauracion = value;
      }
    }

    public Decimal zon_nmostrar
    {
      get
      {
        return this._zon_nmostrar;
      }
      set
      {
        this._zon_nmostrar = value;
      }
    }

    public string zon_cdealer
    {
      get
      {
        return this._zon_cdealer;
      }
      set
      {
        this._zon_cdealer = value;
      }
    }

    public string zon_ccuenta
    {
      get
      {
        return this._zon_ccuenta;
      }
      set
      {
        this._zon_ccuenta = value;
      }
    }

    public Decimal zon_nautoprocesa
    {
      get
      {
        return this._zon_nautoprocesa;
      }
      set
      {
        this._zon_nautoprocesa = value;
      }
    }

    public string zon_cAlarmaAGenerar
    {
      get
      {
        return this._zon_cAlarmaAGenerar;
      }
      set
      {
        this._zon_cAlarmaAGenerar = value;
      }
    }

    public DalZona(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalZona(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalZona(SqlHelper SqlConfig, int UserId, SimpleZona Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._zon_iidcuenta = Simple.zon_iidcuenta;
      this._zon_ccodigo = Simple.zon_ccodigo;
      this._zon_cdescripcion = Simple.zon_cdescripcion;
      this._zon_codigoalarma = Simple.zon_codigoalarma;
      this._zon_clistaemergencia = Simple.zon_clistaemergencia;
      this._zon_cimagen = Simple.zon_cimagen;
      this._zon_mobservacion = Simple.zon_mobservacion;
      this._zon_ccodigorestauracion = Simple.zon_ccodigorestauracion;
      this._zon_nminutosrestauracion = Simple.zon_nminutosrestauracion;
      this._zon_nmostrar = Simple.zon_nmostrar;
      this._zon_cdealer = Simple.zon_cdealer;
      this._zon_ccuenta = Simple.zon_ccuenta;
      this._zon_nautoprocesa = Simple.zon_nautoprocesa;
      this._zon_cAlarmaAGenerar = Simple.zon_cAlarmaAGenerar;
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
            using (SqlCommand sqlCommand = new SqlCommand("ZonaIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_iidcuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_clistaemergencia", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_mobservacion", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_ccodigorestauracion", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_nminutosrestauracion", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_nmostrar", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cdealer", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_ccuenta", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_nautoprocesa", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cAlarmaAGenerar", SqlDbType.NChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@zon_iidcuenta"].Value = (object) this._zon_iidcuenta;
              sqlCommand.Parameters["@zon_ccodigo"].Value = this._zon_ccodigo == null ? (object) DBNull.Value : (object) this._zon_ccodigo;
              sqlCommand.Parameters["@zon_cdescripcion"].Value = this._zon_cdescripcion == null ? (object) DBNull.Value : (object) this._zon_cdescripcion;
              sqlCommand.Parameters["@zon_codigoalarma"].Value = this._zon_codigoalarma == null ? (object) DBNull.Value : (object) this._zon_codigoalarma;
              sqlCommand.Parameters["@zon_clistaemergencia"].Value = this._zon_clistaemergencia == null ? (object) DBNull.Value : (object) this._zon_clistaemergencia;
              sqlCommand.Parameters["@zon_cimagen"].Value = this._zon_cimagen == null ? (object) DBNull.Value : (object) this._zon_cimagen;
              sqlCommand.Parameters["@zon_mobservacion"].Value = this._zon_mobservacion == null ? (object) DBNull.Value : (object) this._zon_mobservacion;
              sqlCommand.Parameters["@zon_ccodigorestauracion"].Value = this._zon_ccodigorestauracion == null ? (object) DBNull.Value : (object) this._zon_ccodigorestauracion;
              sqlCommand.Parameters["@zon_nminutosrestauracion"].Value = (object) this._zon_nminutosrestauracion;
              sqlCommand.Parameters["@zon_nmostrar"].Value = (object) this._zon_nmostrar;
              sqlCommand.Parameters["@zon_cdealer"].Value = this._zon_cdealer == null ? (object) DBNull.Value : (object) this._zon_cdealer;
              sqlCommand.Parameters["@zon_ccuenta"].Value = this._zon_ccuenta == null ? (object) DBNull.Value : (object) this._zon_ccuenta;
              sqlCommand.Parameters["@zon_nautoprocesa"].Value = (object) this._zon_nautoprocesa;
              sqlCommand.Parameters["@zon_cAlarmaAGenerar"].Value = this._zon_cAlarmaAGenerar == null ? (object) DBNull.Value : (object) this._zon_cAlarmaAGenerar;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("ZonaUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_iidcuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_clistaemergencia", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_mobservacion", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_ccodigorestauracion", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_nminutosrestauracion", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_nmostrar", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cdealer", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_ccuenta", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_nautoprocesa", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@zon_cAlarmaAGenerar", SqlDbType.NChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@zon_iidcuenta"].Value = (object) this._zon_iidcuenta;
              sqlCommand.Parameters["@zon_ccodigo"].Value = this._zon_ccodigo == null ? (object) DBNull.Value : (object) this._zon_ccodigo;
              sqlCommand.Parameters["@zon_cdescripcion"].Value = this._zon_cdescripcion == null ? (object) DBNull.Value : (object) this._zon_cdescripcion;
              sqlCommand.Parameters["@zon_codigoalarma"].Value = this._zon_codigoalarma == null ? (object) DBNull.Value : (object) this._zon_codigoalarma;
              sqlCommand.Parameters["@zon_clistaemergencia"].Value = this._zon_clistaemergencia == null ? (object) DBNull.Value : (object) this._zon_clistaemergencia;
              sqlCommand.Parameters["@zon_cimagen"].Value = this._zon_cimagen == null ? (object) DBNull.Value : (object) this._zon_cimagen;
              sqlCommand.Parameters["@zon_mobservacion"].Value = this._zon_mobservacion == null ? (object) DBNull.Value : (object) this._zon_mobservacion;
              sqlCommand.Parameters["@zon_ccodigorestauracion"].Value = this._zon_ccodigorestauracion == null ? (object) DBNull.Value : (object) this._zon_ccodigorestauracion;
              sqlCommand.Parameters["@zon_nminutosrestauracion"].Value = (object) this._zon_nminutosrestauracion;
              sqlCommand.Parameters["@zon_nmostrar"].Value = (object) this._zon_nmostrar;
              sqlCommand.Parameters["@zon_cdealer"].Value = this._zon_cdealer == null ? (object) DBNull.Value : (object) this._zon_cdealer;
              sqlCommand.Parameters["@zon_ccuenta"].Value = this._zon_ccuenta == null ? (object) DBNull.Value : (object) this._zon_ccuenta;
              sqlCommand.Parameters["@zon_nautoprocesa"].Value = (object) this._zon_nautoprocesa;
              sqlCommand.Parameters["@zon_cAlarmaAGenerar"].Value = this._zon_cAlarmaAGenerar == null ? (object) DBNull.Value : (object) this._zon_cAlarmaAGenerar;
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
        throw new RuntimeException("The Zona is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("ZonaDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("ZonaSel", connection))
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
      SimpleZona simpleZona = new SimpleZona();
      simpleZona.Id = this.Id;
      simpleZona.Name = this.Name;
      simpleZona.zon_iidcuenta = this._zon_iidcuenta;
      simpleZona.zon_ccodigo = this._zon_ccodigo;
      simpleZona.zon_cdescripcion = this._zon_cdescripcion;
      simpleZona.zon_codigoalarma = this._zon_codigoalarma;
      simpleZona.zon_clistaemergencia = this._zon_clistaemergencia;
      simpleZona.zon_cimagen = this._zon_cimagen;
      simpleZona.zon_mobservacion = this._zon_mobservacion;
      simpleZona.zon_ccodigorestauracion = this._zon_ccodigorestauracion;
      simpleZona.zon_nminutosrestauracion = this._zon_nminutosrestauracion;
      simpleZona.zon_nmostrar = this._zon_nmostrar;
      simpleZona.zon_cdealer = this._zon_cdealer;
      simpleZona.zon_ccuenta = this._zon_ccuenta;
      simpleZona.zon_nautoprocesa = this._zon_nautoprocesa;
      simpleZona.zon_cAlarmaAGenerar = this._zon_cAlarmaAGenerar;
      if (this.CallerObject != null)
        simpleZona.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleZona;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleZona simpleZona = (SimpleZona) BaseSimple;
      this.Id = simpleZona.Id;
      this.Name = simpleZona.Name;
      this._zon_iidcuenta = simpleZona.zon_iidcuenta;
      this._zon_ccodigo = simpleZona.zon_ccodigo;
      this._zon_cdescripcion = simpleZona.zon_cdescripcion;
      this._zon_codigoalarma = simpleZona.zon_codigoalarma;
      this._zon_clistaemergencia = simpleZona.zon_clistaemergencia;
      this._zon_cimagen = simpleZona.zon_cimagen;
      this._zon_mobservacion = simpleZona.zon_mobservacion;
      this._zon_ccodigorestauracion = simpleZona.zon_ccodigorestauracion;
      this._zon_nminutosrestauracion = simpleZona.zon_nminutosrestauracion;
      this._zon_nmostrar = simpleZona.zon_nmostrar;
      this._zon_cdealer = simpleZona.zon_cdealer;
      this._zon_ccuenta = simpleZona.zon_ccuenta;
      this._zon_nautoprocesa = simpleZona.zon_nautoprocesa;
      this._zon_cAlarmaAGenerar = simpleZona.zon_cAlarmaAGenerar;
      if (simpleZona.CallerObject != null)
        this.CallerObject = simpleZona.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerZona callerZona = new CallerZona();
      callerZona.Id = this.Id;
      callerZona.Name = this.Name;
      callerZona.zon_iidcuenta = this._zon_iidcuenta;
      callerZona.zon_ccodigo = this._zon_ccodigo;
      callerZona.zon_cdescripcion = this._zon_cdescripcion;
      callerZona.zon_codigoalarma = this._zon_codigoalarma;
      callerZona.zon_clistaemergencia = this._zon_clistaemergencia;
      callerZona.zon_cimagen = this._zon_cimagen;
      callerZona.zon_mobservacion = this._zon_mobservacion;
      callerZona.zon_ccodigorestauracion = this._zon_ccodigorestauracion;
      callerZona.zon_nminutosrestauracion = this._zon_nminutosrestauracion;
      callerZona.zon_nmostrar = this._zon_nmostrar;
      callerZona.zon_cdealer = this._zon_cdealer;
      callerZona.zon_ccuenta = this._zon_ccuenta;
      callerZona.zon_nautoprocesa = this._zon_nautoprocesa;
      callerZona.zon_cAlarmaAGenerar = this._zon_cAlarmaAGenerar;
      return (CallerObject) callerZona;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_clistaemergencia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_mobservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_ccodigorestauracion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_nminutosrestauracion", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("zon_nmostrar", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("zon_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_ccuenta", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_nautoprocesa", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("zon_cAlarmaAGenerar", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["zon_iidcuenta"] = (object) this._zon_iidcuenta;
      row["zon_ccodigo"] = (object) this._zon_ccodigo;
      row["zon_cdescripcion"] = (object) this._zon_cdescripcion;
      row["zon_codigoalarma"] = (object) this._zon_codigoalarma;
      row["zon_clistaemergencia"] = (object) this._zon_clistaemergencia;
      row["zon_cimagen"] = (object) this._zon_cimagen;
      row["zon_mobservacion"] = (object) this._zon_mobservacion;
      row["zon_ccodigorestauracion"] = (object) this._zon_ccodigorestauracion;
      row["zon_nminutosrestauracion"] = (object) this._zon_nminutosrestauracion;
      row["zon_nmostrar"] = (object) this._zon_nmostrar;
      row["zon_cdealer"] = (object) this._zon_cdealer;
      row["zon_ccuenta"] = (object) this._zon_ccuenta;
      row["zon_nautoprocesa"] = (object) this._zon_nautoprocesa;
      row["zon_cAlarmaAGenerar"] = (object) this._zon_cAlarmaAGenerar;
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
        using (SqlCommand selectCommand = new SqlCommand("ZonaByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("ZonaByChildObject", connection))
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
              SimpleZona simpleZona = new SimpleZona();
              simpleZona.Id = sqlDataReader.GetInt32(0);
              simpleZona.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleZona.zon_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleZona.zon_ccodigo = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpleZona.zon_cdescripcion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleZona.zon_codigoalarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleZona.zon_clistaemergencia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpleZona.zon_cimagen = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpleZona.zon_mobservacion = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpleZona.zon_ccodigorestauracion = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpleZona.zon_nminutosrestauracion = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simpleZona.zon_nmostrar = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                simpleZona.zon_cdealer = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              if (sqlDataReader.FieldCount > 13)
                simpleZona.zon_ccuenta = sqlDataReader.IsDBNull(13) ? "" : sqlDataReader.GetString(13);
              if (sqlDataReader.FieldCount > 14)
                simpleZona.zon_nautoprocesa = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                simpleZona.zon_cAlarmaAGenerar = sqlDataReader.IsDBNull(15) ? "" : sqlDataReader.GetString(15);
              simpleZona.CallerObject = Object.GetCallerObject();
              simpleZona.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleZona);
              objectCollection.Add((SimpleBaseObject) simpleZona);
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
        SimpleZona simpleZona = new SimpleZona();
        simpleZona.Id = (int) row["Id"];
        simpleZona.Name = (string) row["Name"];
        simpleZona.zon_iidcuenta = row["zon_iidcuenta"] == DBNull.Value ? 0 : (int) row["zon_iidcuenta"];
        simpleZona.zon_ccodigo = row["zon_ccodigo"] == DBNull.Value ? "" : (string) row["zon_ccodigo"];
        simpleZona.zon_cdescripcion = row["zon_cdescripcion"] == DBNull.Value ? "" : (string) row["zon_cdescripcion"];
        simpleZona.zon_codigoalarma = row["zon_codigoalarma"] == DBNull.Value ? "" : (string) row["zon_codigoalarma"];
        simpleZona.zon_clistaemergencia = row["zon_clistaemergencia"] == DBNull.Value ? "" : (string) row["zon_clistaemergencia"];
        simpleZona.zon_cimagen = row["zon_cimagen"] == DBNull.Value ? "" : (string) row["zon_cimagen"];
        simpleZona.zon_mobservacion = row["zon_mobservacion"] == DBNull.Value ? "" : (string) row["zon_mobservacion"];
        simpleZona.zon_ccodigorestauracion = row["zon_ccodigorestauracion"] == DBNull.Value ? "" : (string) row["zon_ccodigorestauracion"];
        simpleZona.zon_nminutosrestauracion = row["zon_nminutosrestauracion"] == DBNull.Value ? new Decimal(0) : (Decimal) row["zon_nminutosrestauracion"];
        simpleZona.zon_nmostrar = row["zon_nmostrar"] == DBNull.Value ? new Decimal(0) : (Decimal) row["zon_nmostrar"];
        simpleZona.zon_cdealer = row["zon_cdealer"] == DBNull.Value ? "" : (string) row["zon_cdealer"];
        simpleZona.zon_ccuenta = row["zon_ccuenta"] == DBNull.Value ? "" : (string) row["zon_ccuenta"];
        simpleZona.zon_nautoprocesa = row["zon_nautoprocesa"] == DBNull.Value ? new Decimal(0) : (Decimal) row["zon_nautoprocesa"];
        simpleZona.zon_cAlarmaAGenerar = row["zon_cAlarmaAGenerar"] == DBNull.Value ? "" : (string) row["zon_cAlarmaAGenerar"];
        simpleZona.CallerObject = Object.GetCallerObject();
        simpleZona.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleZona);
        if (Recursive)
          simpleZona.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleZona, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleZona);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("ZonaByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("ZonaByParentObject", connection))
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
              SimpleZona simpleZona = new SimpleZona();
              simpleZona.Id = sqlDataReader.GetInt32(0);
              simpleZona.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleZona.zon_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpleZona.zon_ccodigo = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpleZona.zon_cdescripcion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleZona.zon_codigoalarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleZona.zon_clistaemergencia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpleZona.zon_cimagen = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpleZona.zon_mobservacion = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpleZona.zon_ccodigorestauracion = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpleZona.zon_nminutosrestauracion = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simpleZona.zon_nmostrar = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                simpleZona.zon_cdealer = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              if (sqlDataReader.FieldCount > 13)
                simpleZona.zon_ccuenta = sqlDataReader.IsDBNull(13) ? "" : sqlDataReader.GetString(13);
              if (sqlDataReader.FieldCount > 14)
                simpleZona.zon_nautoprocesa = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                simpleZona.zon_cAlarmaAGenerar = sqlDataReader.IsDBNull(15) ? "" : sqlDataReader.GetString(15);
              simpleZona.CallerObject = Object.GetCallerObject();
              simpleZona.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleZona);
              objectCollection.Add((SimpleBaseObject) simpleZona);
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
        using (SqlCommand selectCommand = new SqlCommand("ZonaByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("ZonaByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("ZonaByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("ZonaByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("ZonaByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleZona Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("ZonaBySimpleZona", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_iidcuenta", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@zon_ccodigo", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_cdescripcion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_codigoalarma", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_clistaemergencia", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_cimagen", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_mobservacion", SqlDbType.NText));
            selectCommand.Parameters.Add(new SqlParameter("@zon_ccodigorestauracion", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_nminutosrestauracion", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@zon_nmostrar", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@zon_cdealer", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_ccuenta", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@zon_nautoprocesa", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@zon_cAlarmaAGenerar", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@zon_iidcuenta"].Value = (object) this._zon_iidcuenta;
            selectCommand.Parameters["@zon_ccodigo"].Value = this._zon_ccodigo == null ? (object) DBNull.Value : (object) this._zon_ccodigo;
            selectCommand.Parameters["@zon_cdescripcion"].Value = this._zon_cdescripcion == null ? (object) DBNull.Value : (object) this._zon_cdescripcion;
            selectCommand.Parameters["@zon_codigoalarma"].Value = this._zon_codigoalarma == null ? (object) DBNull.Value : (object) this._zon_codigoalarma;
            selectCommand.Parameters["@zon_clistaemergencia"].Value = this._zon_clistaemergencia == null ? (object) DBNull.Value : (object) this._zon_clistaemergencia;
            selectCommand.Parameters["@zon_cimagen"].Value = this._zon_cimagen == null ? (object) DBNull.Value : (object) this._zon_cimagen;
            selectCommand.Parameters["@zon_mobservacion"].Value = this._zon_mobservacion == null ? (object) DBNull.Value : (object) this._zon_mobservacion;
            selectCommand.Parameters["@zon_ccodigorestauracion"].Value = this._zon_ccodigorestauracion == null ? (object) DBNull.Value : (object) this._zon_ccodigorestauracion;
            selectCommand.Parameters["@zon_nminutosrestauracion"].Value = (object) this._zon_nminutosrestauracion;
            selectCommand.Parameters["@zon_nmostrar"].Value = (object) this._zon_nmostrar;
            selectCommand.Parameters["@zon_cdealer"].Value = this._zon_cdealer == null ? (object) DBNull.Value : (object) this._zon_cdealer;
            selectCommand.Parameters["@zon_ccuenta"].Value = this._zon_ccuenta == null ? (object) DBNull.Value : (object) this._zon_ccuenta;
            selectCommand.Parameters["@zon_nautoprocesa"].Value = (object) this._zon_nautoprocesa;
            selectCommand.Parameters["@zon_cAlarmaAGenerar"].Value = this._zon_cAlarmaAGenerar == null ? (object) DBNull.Value : (object) this._zon_cAlarmaAGenerar;
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

    public IEnumerable<SimpleZona> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("ZonaByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleZona Simple = new SimpleZona();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.zon_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.zon_ccodigo = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.zon_cdescripcion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.zon_codigoalarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.zon_clistaemergencia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.zon_cimagen = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.zon_mobservacion = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.zon_ccodigorestauracion = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.zon_nminutosrestauracion = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.zon_nmostrar = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.zon_cdealer = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.zon_ccuenta = sqlDataReader.IsDBNull(13) ? "" : sqlDataReader.GetString(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.zon_nautoprocesa = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.zon_cAlarmaAGenerar = sqlDataReader.IsDBNull(15) ? "" : sqlDataReader.GetString(15);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleZona> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("ZonaByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleZona Simple = new SimpleZona();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.zon_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.zon_ccodigo = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.zon_cdescripcion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.zon_codigoalarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.zon_clistaemergencia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.zon_cimagen = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.zon_mobservacion = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.zon_ccodigorestauracion = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.zon_nminutosrestauracion = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.zon_nmostrar = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.zon_cdealer = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.zon_ccuenta = sqlDataReader.IsDBNull(13) ? "" : sqlDataReader.GetString(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.zon_nautoprocesa = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.zon_cAlarmaAGenerar = sqlDataReader.IsDBNull(15) ? "" : sqlDataReader.GetString(15);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3014, "Zona");
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
          this._zon_iidcuenta = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._zon_ccodigo = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._zon_cdescripcion = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._zon_codigoalarma = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._zon_clistaemergencia = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._zon_cimagen = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._zon_mobservacion = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._zon_ccodigorestauracion = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
        if (Reader.FieldCount > 10)
          this._zon_nminutosrestauracion = Reader.IsDBNull(10) ? new Decimal(0) : Reader.GetDecimal(10);
        if (Reader.FieldCount > 11)
          this._zon_nmostrar = Reader.IsDBNull(11) ? new Decimal(0) : Reader.GetDecimal(11);
        if (Reader.FieldCount > 12)
          this._zon_cdealer = Reader.IsDBNull(12) ? "" : Reader.GetString(12);
        if (Reader.FieldCount > 13)
          this._zon_ccuenta = Reader.IsDBNull(13) ? "" : Reader.GetString(13);
        if (Reader.FieldCount > 14)
          this._zon_nautoprocesa = Reader.IsDBNull(14) ? new Decimal(0) : Reader.GetDecimal(14);
        if (Reader.FieldCount > 15)
          this._zon_cAlarmaAGenerar = Reader.IsDBNull(15) ? "" : Reader.GetString(15);
      }
      Reader.Close();
    }
  }
}
