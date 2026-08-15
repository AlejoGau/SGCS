// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalm_stock_cabecera
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
  public class Dalm_stock_cabecera : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _stc_iddepositoorigen;
    private int _stc_iddepositodestino;
    private int _stc_iusuariodss;
    private int _stc_itecnico;
    private string _stc_tipomov;
    private string _stc_comprobantetipo;
    private string _stc_comprobante;
    private string _stc_referencia;
    private string _stc_descripcion;
    private DateTime? _stc_fecha;

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

    public int stc_iddepositoorigen
    {
      get
      {
        return this._stc_iddepositoorigen;
      }
      set
      {
        this._stc_iddepositoorigen = value;
      }
    }

    public int stc_iddepositodestino
    {
      get
      {
        return this._stc_iddepositodestino;
      }
      set
      {
        this._stc_iddepositodestino = value;
      }
    }

    public int stc_iusuariodss
    {
      get
      {
        return this._stc_iusuariodss;
      }
      set
      {
        this._stc_iusuariodss = value;
      }
    }

    public int stc_itecnico
    {
      get
      {
        return this._stc_itecnico;
      }
      set
      {
        this._stc_itecnico = value;
      }
    }

    public string stc_tipomov
    {
      get
      {
        return this._stc_tipomov;
      }
      set
      {
        this._stc_tipomov = value;
      }
    }

    public string stc_comprobantetipo
    {
      get
      {
        return this._stc_comprobantetipo;
      }
      set
      {
        this._stc_comprobantetipo = value;
      }
    }

    public string stc_comprobante
    {
      get
      {
        return this._stc_comprobante;
      }
      set
      {
        this._stc_comprobante = value;
      }
    }

    public string stc_referencia
    {
      get
      {
        return this._stc_referencia;
      }
      set
      {
        this._stc_referencia = value;
      }
    }

    public string stc_descripcion
    {
      get
      {
        return this._stc_descripcion;
      }
      set
      {
        this._stc_descripcion = value;
      }
    }

    public DateTime? stc_fecha
    {
      get
      {
        return this._stc_fecha;
      }
      set
      {
        this._stc_fecha = value;
      }
    }

    public Dalm_stock_cabecera(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalm_stock_cabecera(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalm_stock_cabecera(SqlHelper SqlConfig, int UserId, Simplem_stock_cabecera Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._stc_iddepositoorigen = Simple.stc_iddepositoorigen;
      this._stc_iddepositodestino = Simple.stc_iddepositodestino;
      this._stc_iusuariodss = Simple.stc_iusuariodss;
      this._stc_itecnico = Simple.stc_itecnico;
      this._stc_tipomov = Simple.stc_tipomov;
      this._stc_comprobantetipo = Simple.stc_comprobantetipo;
      this._stc_comprobante = Simple.stc_comprobante;
      this._stc_referencia = Simple.stc_referencia;
      this._stc_descripcion = Simple.stc_descripcion;
      this._stc_fecha = Simple.stc_fecha;
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
            using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_iddepositoorigen", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_iddepositodestino", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_iusuariodss", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_itecnico", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_tipomov", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_comprobantetipo", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_comprobante", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_referencia", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_descripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_fecha", SqlDbType.DateTime));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@stc_iddepositoorigen"].Value = (object) this._stc_iddepositoorigen;
              sqlCommand.Parameters["@stc_iddepositodestino"].Value = (object) this._stc_iddepositodestino;
              sqlCommand.Parameters["@stc_iusuariodss"].Value = (object) this._stc_iusuariodss;
              sqlCommand.Parameters["@stc_itecnico"].Value = (object) this._stc_itecnico;
              sqlCommand.Parameters["@stc_tipomov"].Value = this._stc_tipomov == null ? (object) DBNull.Value : (object) this._stc_tipomov;
              sqlCommand.Parameters["@stc_comprobantetipo"].Value = this._stc_comprobantetipo == null ? (object) DBNull.Value : (object) this._stc_comprobantetipo;
              sqlCommand.Parameters["@stc_comprobante"].Value = this._stc_comprobante == null ? (object) DBNull.Value : (object) this._stc_comprobante;
              sqlCommand.Parameters["@stc_referencia"].Value = this._stc_referencia == null ? (object) DBNull.Value : (object) this._stc_referencia;
              sqlCommand.Parameters["@stc_descripcion"].Value = this._stc_descripcion == null ? (object) DBNull.Value : (object) this._stc_descripcion;
              SqlParameter parameter = sqlCommand.Parameters["@stc_fecha"];
              DateTime? stcFecha = this._stc_fecha;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!stcFecha.HasValue ? 0 : (stcFecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._stc_fecha;
              parameter.Value = obj;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_iddepositoorigen", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_iddepositodestino", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_iusuariodss", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_itecnico", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_tipomov", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_comprobantetipo", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_comprobante", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_referencia", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_descripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@stc_fecha", SqlDbType.DateTime));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@stc_iddepositoorigen"].Value = (object) this._stc_iddepositoorigen;
              sqlCommand.Parameters["@stc_iddepositodestino"].Value = (object) this._stc_iddepositodestino;
              sqlCommand.Parameters["@stc_iusuariodss"].Value = (object) this._stc_iusuariodss;
              sqlCommand.Parameters["@stc_itecnico"].Value = (object) this._stc_itecnico;
              sqlCommand.Parameters["@stc_tipomov"].Value = this._stc_tipomov == null ? (object) DBNull.Value : (object) this._stc_tipomov;
              sqlCommand.Parameters["@stc_comprobantetipo"].Value = this._stc_comprobantetipo == null ? (object) DBNull.Value : (object) this._stc_comprobantetipo;
              sqlCommand.Parameters["@stc_comprobante"].Value = this._stc_comprobante == null ? (object) DBNull.Value : (object) this._stc_comprobante;
              sqlCommand.Parameters["@stc_referencia"].Value = this._stc_referencia == null ? (object) DBNull.Value : (object) this._stc_referencia;
              sqlCommand.Parameters["@stc_descripcion"].Value = this._stc_descripcion == null ? (object) DBNull.Value : (object) this._stc_descripcion;
              SqlParameter parameter = sqlCommand.Parameters["@stc_fecha"];
              DateTime? stcFecha = this._stc_fecha;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!stcFecha.HasValue ? 0 : (stcFecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._stc_fecha;
              parameter.Value = obj;
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
        throw new RuntimeException("The m_stock_cabecera is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraSel", connection))
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
      Simplem_stock_cabecera simplemStockCabecera = new Simplem_stock_cabecera();
      simplemStockCabecera.Id = this.Id;
      simplemStockCabecera.Name = this.Name;
      simplemStockCabecera.stc_iddepositoorigen = this._stc_iddepositoorigen;
      simplemStockCabecera.stc_iddepositodestino = this._stc_iddepositodestino;
      simplemStockCabecera.stc_iusuariodss = this._stc_iusuariodss;
      simplemStockCabecera.stc_itecnico = this._stc_itecnico;
      simplemStockCabecera.stc_tipomov = this._stc_tipomov;
      simplemStockCabecera.stc_comprobantetipo = this._stc_comprobantetipo;
      simplemStockCabecera.stc_comprobante = this._stc_comprobante;
      simplemStockCabecera.stc_referencia = this._stc_referencia;
      simplemStockCabecera.stc_descripcion = this._stc_descripcion;
      simplemStockCabecera.stc_fecha = this._stc_fecha;
      if (this.CallerObject != null)
        simplemStockCabecera.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplemStockCabecera;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplem_stock_cabecera simplemStockCabecera = (Simplem_stock_cabecera) BaseSimple;
      this.Id = simplemStockCabecera.Id;
      this.Name = simplemStockCabecera.Name;
      this._stc_iddepositoorigen = simplemStockCabecera.stc_iddepositoorigen;
      this._stc_iddepositodestino = simplemStockCabecera.stc_iddepositodestino;
      this._stc_iusuariodss = simplemStockCabecera.stc_iusuariodss;
      this._stc_itecnico = simplemStockCabecera.stc_itecnico;
      this._stc_tipomov = simplemStockCabecera.stc_tipomov;
      this._stc_comprobantetipo = simplemStockCabecera.stc_comprobantetipo;
      this._stc_comprobante = simplemStockCabecera.stc_comprobante;
      this._stc_referencia = simplemStockCabecera.stc_referencia;
      this._stc_descripcion = simplemStockCabecera.stc_descripcion;
      this._stc_fecha = simplemStockCabecera.stc_fecha;
      if (simplemStockCabecera.CallerObject != null)
        this.CallerObject = simplemStockCabecera.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_stock_cabecera callermStockCabecera = new Callerm_stock_cabecera();
      callermStockCabecera.Id = this.Id;
      callermStockCabecera.Name = this.Name;
      callermStockCabecera.stc_iddepositoorigen = this._stc_iddepositoorigen;
      callermStockCabecera.stc_iddepositodestino = this._stc_iddepositodestino;
      callermStockCabecera.stc_iusuariodss = this._stc_iusuariodss;
      callermStockCabecera.stc_itecnico = this._stc_itecnico;
      callermStockCabecera.stc_tipomov = this._stc_tipomov;
      callermStockCabecera.stc_comprobantetipo = this._stc_comprobantetipo;
      callermStockCabecera.stc_comprobante = this._stc_comprobante;
      callermStockCabecera.stc_referencia = this._stc_referencia;
      callermStockCabecera.stc_descripcion = this._stc_descripcion;
      callermStockCabecera.stc_fecha = this._stc_fecha;
      return (CallerObject) callermStockCabecera;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_iddepositoorigen", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_iddepositodestino", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_iusuariodss", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_itecnico", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_tipomov", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_comprobantetipo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_comprobante", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_referencia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_descripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_fecha", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stc_iddepositoorigen"] = (object) this._stc_iddepositoorigen;
      row["stc_iddepositodestino"] = (object) this._stc_iddepositodestino;
      row["stc_iusuariodss"] = (object) this._stc_iusuariodss;
      row["stc_itecnico"] = (object) this._stc_itecnico;
      row["stc_tipomov"] = (object) this._stc_tipomov;
      row["stc_comprobantetipo"] = (object) this._stc_comprobantetipo;
      row["stc_comprobante"] = (object) this._stc_comprobante;
      row["stc_referencia"] = (object) this._stc_referencia;
      row["stc_descripcion"] = (object) this._stc_descripcion;
      row["stc_fecha"] = (object) this._stc_fecha;
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
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraByChildObject", connection))
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
              Simplem_stock_cabecera simplemStockCabecera = new Simplem_stock_cabecera();
              simplemStockCabecera.Id = sqlDataReader.GetInt32(0);
              simplemStockCabecera.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemStockCabecera.stc_iddepositoorigen = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simplemStockCabecera.stc_iddepositodestino = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simplemStockCabecera.stc_iusuariodss = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simplemStockCabecera.stc_itecnico = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simplemStockCabecera.stc_tipomov = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simplemStockCabecera.stc_comprobantetipo = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simplemStockCabecera.stc_comprobante = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simplemStockCabecera.stc_referencia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simplemStockCabecera.stc_descripcion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                simplemStockCabecera.stc_fecha = new DateTime?(sqlDataReader.IsDBNull(11) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(11));
              simplemStockCabecera.CallerObject = Object.GetCallerObject();
              simplemStockCabecera.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemStockCabecera);
              objectCollection.Add((SimpleBaseObject) simplemStockCabecera);
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
        Simplem_stock_cabecera simplemStockCabecera = new Simplem_stock_cabecera();
        simplemStockCabecera.Id = (int) row["Id"];
        simplemStockCabecera.Name = (string) row["Name"];
        simplemStockCabecera.stc_iddepositoorigen = row["stc_iddepositoorigen"] == DBNull.Value ? 0 : (int) row["stc_iddepositoorigen"];
        simplemStockCabecera.stc_iddepositodestino = row["stc_iddepositodestino"] == DBNull.Value ? 0 : (int) row["stc_iddepositodestino"];
        simplemStockCabecera.stc_iusuariodss = row["stc_iusuariodss"] == DBNull.Value ? 0 : (int) row["stc_iusuariodss"];
        simplemStockCabecera.stc_itecnico = row["stc_itecnico"] == DBNull.Value ? 0 : (int) row["stc_itecnico"];
        simplemStockCabecera.stc_tipomov = row["stc_tipomov"] == DBNull.Value ? "" : (string) row["stc_tipomov"];
        simplemStockCabecera.stc_comprobantetipo = row["stc_comprobantetipo"] == DBNull.Value ? "" : (string) row["stc_comprobantetipo"];
        simplemStockCabecera.stc_comprobante = row["stc_comprobante"] == DBNull.Value ? "" : (string) row["stc_comprobante"];
        simplemStockCabecera.stc_referencia = row["stc_referencia"] == DBNull.Value ? "" : (string) row["stc_referencia"];
        simplemStockCabecera.stc_descripcion = row["stc_descripcion"] == DBNull.Value ? "" : (string) row["stc_descripcion"];
        simplemStockCabecera.stc_fecha = row["stc_fecha"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["stc_fecha"];
        simplemStockCabecera.CallerObject = Object.GetCallerObject();
        simplemStockCabecera.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemStockCabecera);
        if (Recursive)
          simplemStockCabecera.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplemStockCabecera, Recursive);
        objectCollection.Add((SimpleBaseObject) simplemStockCabecera);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraByParentObject", connection))
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
              Simplem_stock_cabecera simplemStockCabecera = new Simplem_stock_cabecera();
              simplemStockCabecera.Id = sqlDataReader.GetInt32(0);
              simplemStockCabecera.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemStockCabecera.stc_iddepositoorigen = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simplemStockCabecera.stc_iddepositodestino = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simplemStockCabecera.stc_iusuariodss = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simplemStockCabecera.stc_itecnico = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simplemStockCabecera.stc_tipomov = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simplemStockCabecera.stc_comprobantetipo = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simplemStockCabecera.stc_comprobante = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simplemStockCabecera.stc_referencia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simplemStockCabecera.stc_descripcion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                simplemStockCabecera.stc_fecha = new DateTime?(sqlDataReader.IsDBNull(11) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(11));
              simplemStockCabecera.CallerObject = Object.GetCallerObject();
              simplemStockCabecera.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemStockCabecera);
              objectCollection.Add((SimpleBaseObject) simplemStockCabecera);
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
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplem_stock_cabecera Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_stock_cabeceraBySimplem_stock_cabecera", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stc_iddepositoorigen", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@stc_iddepositodestino", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@stc_iusuariodss", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@stc_itecnico", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@stc_tipomov", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stc_comprobantetipo", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stc_comprobante", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stc_referencia", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stc_descripcion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@stc_fecha", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@stc_iddepositoorigen"].Value = (object) this._stc_iddepositoorigen;
            selectCommand.Parameters["@stc_iddepositodestino"].Value = (object) this._stc_iddepositodestino;
            selectCommand.Parameters["@stc_iusuariodss"].Value = (object) this._stc_iusuariodss;
            selectCommand.Parameters["@stc_itecnico"].Value = (object) this._stc_itecnico;
            selectCommand.Parameters["@stc_tipomov"].Value = this._stc_tipomov == null ? (object) DBNull.Value : (object) this._stc_tipomov;
            selectCommand.Parameters["@stc_comprobantetipo"].Value = this._stc_comprobantetipo == null ? (object) DBNull.Value : (object) this._stc_comprobantetipo;
            selectCommand.Parameters["@stc_comprobante"].Value = this._stc_comprobante == null ? (object) DBNull.Value : (object) this._stc_comprobante;
            selectCommand.Parameters["@stc_referencia"].Value = this._stc_referencia == null ? (object) DBNull.Value : (object) this._stc_referencia;
            selectCommand.Parameters["@stc_descripcion"].Value = this._stc_descripcion == null ? (object) DBNull.Value : (object) this._stc_descripcion;
            SqlParameter parameter = selectCommand.Parameters["@stc_fecha"];
            DateTime? stcFecha = this._stc_fecha;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!stcFecha.HasValue ? 0 : (stcFecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._stc_fecha;
            parameter.Value = obj;
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

    public IEnumerable<Simplem_stock_cabecera> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_stock_cabecera Simple = new Simplem_stock_cabecera();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.stc_iddepositoorigen = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.stc_iddepositodestino = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.stc_iusuariodss = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.stc_itecnico = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.stc_tipomov = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.stc_comprobantetipo = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.stc_comprobante = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.stc_referencia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.stc_descripcion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.stc_fecha = new DateTime?(sqlDataReader.IsDBNull(11) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(11));
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplem_stock_cabecera> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_stock_cabeceraByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_stock_cabecera Simple = new Simplem_stock_cabecera();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.stc_iddepositoorigen = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.stc_iddepositodestino = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.stc_iusuariodss = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.stc_itecnico = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.stc_tipomov = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.stc_comprobantetipo = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.stc_comprobante = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.stc_referencia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.stc_descripcion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.stc_fecha = new DateTime?(sqlDataReader.IsDBNull(11) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(11));
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3142, "m_stock_cabecera");
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
          this._stc_iddepositoorigen = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._stc_iddepositodestino = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        if (Reader.FieldCount > 4)
          this._stc_iusuariodss = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._stc_itecnico = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
        if (Reader.FieldCount > 6)
          this._stc_tipomov = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._stc_comprobantetipo = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._stc_comprobante = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._stc_referencia = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
        if (Reader.FieldCount > 10)
          this._stc_descripcion = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
        if (Reader.FieldCount > 11)
          this._stc_fecha = new DateTime?(Reader.IsDBNull(11) ? new DateTime(1, 1, 1) : Reader.GetDateTime(11));
      }
      Reader.Close();
    }
  }
}
