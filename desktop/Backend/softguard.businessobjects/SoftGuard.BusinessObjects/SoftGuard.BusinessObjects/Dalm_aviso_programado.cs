// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalm_aviso_programado
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
  public class Dalm_aviso_programado : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _prg_from;
    private string _prg_to;
    private int _prg_estado;
    private string _prg_gateway;
    private int _prg_objecttypeid;
    private int _prg_objectid;
    private DateTime? _prg_prgdatetime;
    private DateTime? _prg_enviodatetime;
    private string _prg_mensaje;

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

    public string prg_from
    {
      get
      {
        return this._prg_from;
      }
      set
      {
        this._prg_from = value;
      }
    }

    public string prg_to
    {
      get
      {
        return this._prg_to;
      }
      set
      {
        this._prg_to = value;
      }
    }

    public int prg_estado
    {
      get
      {
        return this._prg_estado;
      }
      set
      {
        this._prg_estado = value;
      }
    }

    public string prg_gateway
    {
      get
      {
        return this._prg_gateway;
      }
      set
      {
        this._prg_gateway = value;
      }
    }

    public int prg_objecttypeid
    {
      get
      {
        return this._prg_objecttypeid;
      }
      set
      {
        this._prg_objecttypeid = value;
      }
    }

    public int prg_objectid
    {
      get
      {
        return this._prg_objectid;
      }
      set
      {
        this._prg_objectid = value;
      }
    }

    public DateTime? prg_prgdatetime
    {
      get
      {
        return this._prg_prgdatetime;
      }
      set
      {
        this._prg_prgdatetime = value;
      }
    }

    public DateTime? prg_enviodatetime
    {
      get
      {
        return this._prg_enviodatetime;
      }
      set
      {
        this._prg_enviodatetime = value;
      }
    }

    public string prg_mensaje
    {
      get
      {
        return this._prg_mensaje;
      }
      set
      {
        this._prg_mensaje = value;
      }
    }

    public Dalm_aviso_programado(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalm_aviso_programado(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalm_aviso_programado(SqlHelper SqlConfig, int UserId, Simplem_aviso_programado Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._prg_from = Simple.prg_from;
      this._prg_to = Simple.prg_to;
      this._prg_estado = Simple.prg_estado;
      this._prg_gateway = Simple.prg_gateway;
      this._prg_objecttypeid = Simple.prg_objecttypeid;
      this._prg_objectid = Simple.prg_objectid;
      this._prg_prgdatetime = Simple.prg_prgdatetime;
      this._prg_enviodatetime = Simple.prg_enviodatetime;
      this._prg_mensaje = Simple.prg_mensaje;
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
            using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_from", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_to", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_estado", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_gateway", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_objecttypeid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_objectid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_prgdatetime", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_enviodatetime", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_mensaje", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@prg_from"].Value = this._prg_from == null ? (object) DBNull.Value : (object) this._prg_from;
              sqlCommand.Parameters["@prg_to"].Value = this._prg_to == null ? (object) DBNull.Value : (object) this._prg_to;
              sqlCommand.Parameters["@prg_estado"].Value = (object) this._prg_estado;
              sqlCommand.Parameters["@prg_gateway"].Value = this._prg_gateway == null ? (object) DBNull.Value : (object) this._prg_gateway;
              sqlCommand.Parameters["@prg_objecttypeid"].Value = (object) this._prg_objecttypeid;
              sqlCommand.Parameters["@prg_objectid"].Value = (object) this._prg_objectid;
              SqlParameter parameter1 = sqlCommand.Parameters["@prg_prgdatetime"];
              DateTime? nullable = this._prg_prgdatetime;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prg_prgdatetime;
              parameter1.Value = obj1;
              SqlParameter parameter2 = sqlCommand.Parameters["@prg_enviodatetime"];
              nullable = this._prg_enviodatetime;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prg_enviodatetime;
              parameter2.Value = obj2;
              sqlCommand.Parameters["@prg_mensaje"].Value = this._prg_mensaje == null ? (object) DBNull.Value : (object) this._prg_mensaje;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_from", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_to", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_estado", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_gateway", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_objecttypeid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_objectid", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_prgdatetime", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_enviodatetime", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@prg_mensaje", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@prg_from"].Value = this._prg_from == null ? (object) DBNull.Value : (object) this._prg_from;
              sqlCommand.Parameters["@prg_to"].Value = this._prg_to == null ? (object) DBNull.Value : (object) this._prg_to;
              sqlCommand.Parameters["@prg_estado"].Value = (object) this._prg_estado;
              sqlCommand.Parameters["@prg_gateway"].Value = this._prg_gateway == null ? (object) DBNull.Value : (object) this._prg_gateway;
              sqlCommand.Parameters["@prg_objecttypeid"].Value = (object) this._prg_objecttypeid;
              sqlCommand.Parameters["@prg_objectid"].Value = (object) this._prg_objectid;
              SqlParameter parameter1 = sqlCommand.Parameters["@prg_prgdatetime"];
              DateTime? nullable = this._prg_prgdatetime;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prg_prgdatetime;
              parameter1.Value = obj1;
              SqlParameter parameter2 = sqlCommand.Parameters["@prg_enviodatetime"];
              nullable = this._prg_enviodatetime;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prg_enviodatetime;
              parameter2.Value = obj2;
              sqlCommand.Parameters["@prg_mensaje"].Value = this._prg_mensaje == null ? (object) DBNull.Value : (object) this._prg_mensaje;
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
        throw new RuntimeException("The m_aviso_programado is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoSel", connection))
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
      Simplem_aviso_programado simplemAvisoProgramado = new Simplem_aviso_programado();
      simplemAvisoProgramado.Id = this.Id;
      simplemAvisoProgramado.Name = this.Name;
      simplemAvisoProgramado.prg_from = this._prg_from;
      simplemAvisoProgramado.prg_to = this._prg_to;
      simplemAvisoProgramado.prg_estado = this._prg_estado;
      simplemAvisoProgramado.prg_gateway = this._prg_gateway;
      simplemAvisoProgramado.prg_objecttypeid = this._prg_objecttypeid;
      simplemAvisoProgramado.prg_objectid = this._prg_objectid;
      simplemAvisoProgramado.prg_prgdatetime = this._prg_prgdatetime;
      simplemAvisoProgramado.prg_enviodatetime = this._prg_enviodatetime;
      simplemAvisoProgramado.prg_mensaje = this._prg_mensaje;
      if (this.CallerObject != null)
        simplemAvisoProgramado.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplemAvisoProgramado;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplem_aviso_programado simplemAvisoProgramado = (Simplem_aviso_programado) BaseSimple;
      this.Id = simplemAvisoProgramado.Id;
      this.Name = simplemAvisoProgramado.Name;
      this._prg_from = simplemAvisoProgramado.prg_from;
      this._prg_to = simplemAvisoProgramado.prg_to;
      this._prg_estado = simplemAvisoProgramado.prg_estado;
      this._prg_gateway = simplemAvisoProgramado.prg_gateway;
      this._prg_objecttypeid = simplemAvisoProgramado.prg_objecttypeid;
      this._prg_objectid = simplemAvisoProgramado.prg_objectid;
      this._prg_prgdatetime = simplemAvisoProgramado.prg_prgdatetime;
      this._prg_enviodatetime = simplemAvisoProgramado.prg_enviodatetime;
      this._prg_mensaje = simplemAvisoProgramado.prg_mensaje;
      if (simplemAvisoProgramado.CallerObject != null)
        this.CallerObject = simplemAvisoProgramado.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_aviso_programado callermAvisoProgramado = new Callerm_aviso_programado();
      callermAvisoProgramado.Id = this.Id;
      callermAvisoProgramado.Name = this.Name;
      callermAvisoProgramado.prg_from = this._prg_from;
      callermAvisoProgramado.prg_to = this._prg_to;
      callermAvisoProgramado.prg_estado = this._prg_estado;
      callermAvisoProgramado.prg_gateway = this._prg_gateway;
      callermAvisoProgramado.prg_objecttypeid = this._prg_objecttypeid;
      callermAvisoProgramado.prg_objectid = this._prg_objectid;
      callermAvisoProgramado.prg_prgdatetime = this._prg_prgdatetime;
      callermAvisoProgramado.prg_enviodatetime = this._prg_enviodatetime;
      callermAvisoProgramado.prg_mensaje = this._prg_mensaje;
      return (CallerObject) callermAvisoProgramado;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_from", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_to", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_estado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_gateway", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_objecttypeid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_objectid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_prgdatetime", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prg_enviodatetime", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prg_mensaje", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["prg_from"] = (object) this._prg_from;
      row["prg_to"] = (object) this._prg_to;
      row["prg_estado"] = (object) this._prg_estado;
      row["prg_gateway"] = (object) this._prg_gateway;
      row["prg_objecttypeid"] = (object) this._prg_objecttypeid;
      row["prg_objectid"] = (object) this._prg_objectid;
      row["prg_prgdatetime"] = (object) this._prg_prgdatetime;
      row["prg_enviodatetime"] = (object) this._prg_enviodatetime;
      row["prg_mensaje"] = (object) this._prg_mensaje;
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
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoByChildObject", connection))
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
              Simplem_aviso_programado simplemAvisoProgramado = new Simplem_aviso_programado();
              simplemAvisoProgramado.Id = sqlDataReader.GetInt32(0);
              simplemAvisoProgramado.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemAvisoProgramado.prg_from = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplemAvisoProgramado.prg_to = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplemAvisoProgramado.prg_estado = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simplemAvisoProgramado.prg_gateway = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simplemAvisoProgramado.prg_objecttypeid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simplemAvisoProgramado.prg_objectid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simplemAvisoProgramado.prg_prgdatetime = new DateTime?(sqlDataReader.IsDBNull(8) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(8));
              if (sqlDataReader.FieldCount > 9)
                simplemAvisoProgramado.prg_enviodatetime = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                simplemAvisoProgramado.prg_mensaje = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              simplemAvisoProgramado.CallerObject = Object.GetCallerObject();
              simplemAvisoProgramado.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemAvisoProgramado);
              objectCollection.Add((SimpleBaseObject) simplemAvisoProgramado);
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
        Simplem_aviso_programado simplemAvisoProgramado = new Simplem_aviso_programado();
        simplemAvisoProgramado.Id = (int) row["Id"];
        simplemAvisoProgramado.Name = (string) row["Name"];
        simplemAvisoProgramado.prg_from = row["prg_from"] == DBNull.Value ? "" : (string) row["prg_from"];
        simplemAvisoProgramado.prg_to = row["prg_to"] == DBNull.Value ? "" : (string) row["prg_to"];
        simplemAvisoProgramado.prg_estado = row["prg_estado"] == DBNull.Value ? 0 : (int) row["prg_estado"];
        simplemAvisoProgramado.prg_gateway = row["prg_gateway"] == DBNull.Value ? "" : (string) row["prg_gateway"];
        simplemAvisoProgramado.prg_objecttypeid = row["prg_objecttypeid"] == DBNull.Value ? 0 : (int) row["prg_objecttypeid"];
        simplemAvisoProgramado.prg_objectid = row["prg_objectid"] == DBNull.Value ? 0 : (int) row["prg_objectid"];
        simplemAvisoProgramado.prg_prgdatetime = row["prg_prgdatetime"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["prg_prgdatetime"];
        simplemAvisoProgramado.prg_enviodatetime = row["prg_enviodatetime"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["prg_enviodatetime"];
        simplemAvisoProgramado.prg_mensaje = row["prg_mensaje"] == DBNull.Value ? "" : (string) row["prg_mensaje"];
        simplemAvisoProgramado.CallerObject = Object.GetCallerObject();
        simplemAvisoProgramado.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemAvisoProgramado);
        if (Recursive)
          simplemAvisoProgramado.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplemAvisoProgramado, Recursive);
        objectCollection.Add((SimpleBaseObject) simplemAvisoProgramado);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoByParentObject", connection))
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
              Simplem_aviso_programado simplemAvisoProgramado = new Simplem_aviso_programado();
              simplemAvisoProgramado.Id = sqlDataReader.GetInt32(0);
              simplemAvisoProgramado.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemAvisoProgramado.prg_from = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplemAvisoProgramado.prg_to = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplemAvisoProgramado.prg_estado = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simplemAvisoProgramado.prg_gateway = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simplemAvisoProgramado.prg_objecttypeid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simplemAvisoProgramado.prg_objectid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simplemAvisoProgramado.prg_prgdatetime = new DateTime?(sqlDataReader.IsDBNull(8) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(8));
              if (sqlDataReader.FieldCount > 9)
                simplemAvisoProgramado.prg_enviodatetime = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                simplemAvisoProgramado.prg_mensaje = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              simplemAvisoProgramado.CallerObject = Object.GetCallerObject();
              simplemAvisoProgramado.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemAvisoProgramado);
              objectCollection.Add((SimpleBaseObject) simplemAvisoProgramado);
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
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplem_aviso_programado Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_aviso_programadoBySimplem_aviso_programado", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prg_from", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prg_to", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prg_estado", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@prg_gateway", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prg_objecttypeid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@prg_objectid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@prg_prgdatetime", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@prg_enviodatetime", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@prg_mensaje", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@prg_from"].Value = this._prg_from == null ? (object) DBNull.Value : (object) this._prg_from;
            selectCommand.Parameters["@prg_to"].Value = this._prg_to == null ? (object) DBNull.Value : (object) this._prg_to;
            selectCommand.Parameters["@prg_estado"].Value = (object) this._prg_estado;
            selectCommand.Parameters["@prg_gateway"].Value = this._prg_gateway == null ? (object) DBNull.Value : (object) this._prg_gateway;
            selectCommand.Parameters["@prg_objecttypeid"].Value = (object) this._prg_objecttypeid;
            selectCommand.Parameters["@prg_objectid"].Value = (object) this._prg_objectid;
            SqlParameter parameter1 = selectCommand.Parameters["@prg_prgdatetime"];
            DateTime? nullable = this._prg_prgdatetime;
            DateTime dateTime1 = new DateTime(1, 1, 1);
            object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prg_prgdatetime;
            parameter1.Value = obj1;
            SqlParameter parameter2 = selectCommand.Parameters["@prg_enviodatetime"];
            nullable = this._prg_enviodatetime;
            DateTime dateTime2 = new DateTime(1, 1, 1);
            object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prg_enviodatetime;
            parameter2.Value = obj2;
            selectCommand.Parameters["@prg_mensaje"].Value = this._prg_mensaje == null ? (object) DBNull.Value : (object) this._prg_mensaje;
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

    public IEnumerable<Simplem_aviso_programado> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_aviso_programado Simple = new Simplem_aviso_programado();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.prg_from = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.prg_to = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.prg_estado = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.prg_gateway = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.prg_objecttypeid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.prg_objectid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.prg_prgdatetime = new DateTime?(sqlDataReader.IsDBNull(8) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(8));
              if (sqlDataReader.FieldCount > 9)
                Simple.prg_enviodatetime = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                Simple.prg_mensaje = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplem_aviso_programado> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_aviso_programadoByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_aviso_programado Simple = new Simplem_aviso_programado();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.prg_from = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.prg_to = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.prg_estado = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.prg_gateway = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.prg_objecttypeid = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.prg_objectid = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.prg_prgdatetime = new DateTime?(sqlDataReader.IsDBNull(8) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(8));
              if (sqlDataReader.FieldCount > 9)
                Simple.prg_enviodatetime = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                Simple.prg_mensaje = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3159, "m_aviso_programado");
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
          this._prg_from = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._prg_to = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._prg_estado = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._prg_gateway = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._prg_objecttypeid = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
        if (Reader.FieldCount > 7)
          this._prg_objectid = Reader.IsDBNull(7) ? 0 : Reader.GetInt32(7);
        if (Reader.FieldCount > 8)
          this._prg_prgdatetime = new DateTime?(Reader.IsDBNull(8) ? new DateTime(1, 1, 1) : Reader.GetDateTime(8));
        if (Reader.FieldCount > 9)
          this._prg_enviodatetime = new DateTime?(Reader.IsDBNull(9) ? new DateTime(1, 1, 1) : Reader.GetDateTime(9));
        if (Reader.FieldCount > 10)
          this._prg_mensaje = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
      }
      Reader.Close();
    }
  }
}
