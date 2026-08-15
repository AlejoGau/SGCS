// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dals_operadores
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
  public class Dals_operadores : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _ope_clogin;
    private string _ope_cnombre;
    private string _ope_cclave;
    private int _ope_nsql;
    private Decimal _ope_nsupervisor;
    private string _ope_clinea;
    private Decimal _ope_nprioridad;
    private DateTime? _ope_dCambio;
    private Decimal _ope_nSereno;
    private int _ope_iid;

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

    public string ope_clogin
    {
      get
      {
        return this._ope_clogin;
      }
      set
      {
        this._ope_clogin = value;
      }
    }

    public string ope_cnombre
    {
      get
      {
        return this._ope_cnombre;
      }
      set
      {
        this._ope_cnombre = value;
      }
    }

    public string ope_cclave
    {
      get
      {
        return this._ope_cclave;
      }
      set
      {
        this._ope_cclave = value;
      }
    }

    public int ope_nsql
    {
      get
      {
        return this._ope_nsql;
      }
      set
      {
        this._ope_nsql = value;
      }
    }

    public Decimal ope_nsupervisor
    {
      get
      {
        return this._ope_nsupervisor;
      }
      set
      {
        this._ope_nsupervisor = value;
      }
    }

    public string ope_clinea
    {
      get
      {
        return this._ope_clinea;
      }
      set
      {
        this._ope_clinea = value;
      }
    }

    public Decimal ope_nprioridad
    {
      get
      {
        return this._ope_nprioridad;
      }
      set
      {
        this._ope_nprioridad = value;
      }
    }

    public DateTime? ope_dCambio
    {
      get
      {
        return this._ope_dCambio;
      }
      set
      {
        this._ope_dCambio = value;
      }
    }

    public Decimal ope_nSereno
    {
      get
      {
        return this._ope_nSereno;
      }
      set
      {
        this._ope_nSereno = value;
      }
    }

    public int ope_iid
    {
      get
      {
        return this._ope_iid;
      }
      set
      {
        this._ope_iid = value;
      }
    }

    public Dals_operadores(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dals_operadores(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dals_operadores(SqlHelper SqlConfig, int UserId, Simples_operadores Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._ope_clogin = Simple.ope_clogin;
      this._ope_cnombre = Simple.ope_cnombre;
      this._ope_cclave = Simple.ope_cclave;
      this._ope_nsql = Simple.ope_nsql;
      this._ope_nsupervisor = Simple.ope_nsupervisor;
      this._ope_clinea = Simple.ope_clinea;
      this._ope_nprioridad = Simple.ope_nprioridad;
      this._ope_dCambio = Simple.ope_dCambio;
      this._ope_nSereno = Simple.ope_nSereno;
      this._ope_iid = Simple.ope_iid;
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
            using (SqlCommand sqlCommand = new SqlCommand("s_operadoresIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_clogin", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_cclave", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nsql", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nsupervisor", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_clinea", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nprioridad", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_dCambio", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nSereno", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_iid", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@ope_clogin"].Value = this._ope_clogin == null ? (object) DBNull.Value : (object) this._ope_clogin;
              sqlCommand.Parameters["@ope_cnombre"].Value = this._ope_cnombre == null ? (object) DBNull.Value : (object) this._ope_cnombre;
              sqlCommand.Parameters["@ope_cclave"].Value = this._ope_cclave == null ? (object) DBNull.Value : (object) this._ope_cclave;
              sqlCommand.Parameters["@ope_nsql"].Value = (object) this._ope_nsql;
              sqlCommand.Parameters["@ope_nsupervisor"].Value = (object) this._ope_nsupervisor;
              sqlCommand.Parameters["@ope_clinea"].Value = this._ope_clinea == null ? (object) DBNull.Value : (object) this._ope_clinea;
              sqlCommand.Parameters["@ope_nprioridad"].Value = (object) this._ope_nprioridad;
              SqlParameter parameter = sqlCommand.Parameters["@ope_dCambio"];
              DateTime? opeDCambio = this._ope_dCambio;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!opeDCambio.HasValue ? 0 : (opeDCambio.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._ope_dCambio;
              parameter.Value = obj;
              sqlCommand.Parameters["@ope_nSereno"].Value = (object) this._ope_nSereno;
              sqlCommand.Parameters["@ope_iid"].Value = (object) this._ope_iid;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("s_operadoresUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_clogin", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_cclave", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nsql", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nsupervisor", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_clinea", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nprioridad", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_dCambio", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_nSereno", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ope_iid", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@ope_clogin"].Value = this._ope_clogin == null ? (object) DBNull.Value : (object) this._ope_clogin;
              sqlCommand.Parameters["@ope_cnombre"].Value = this._ope_cnombre == null ? (object) DBNull.Value : (object) this._ope_cnombre;
              sqlCommand.Parameters["@ope_cclave"].Value = this._ope_cclave == null ? (object) DBNull.Value : (object) this._ope_cclave;
              sqlCommand.Parameters["@ope_nsql"].Value = (object) this._ope_nsql;
              sqlCommand.Parameters["@ope_nsupervisor"].Value = (object) this._ope_nsupervisor;
              sqlCommand.Parameters["@ope_clinea"].Value = this._ope_clinea == null ? (object) DBNull.Value : (object) this._ope_clinea;
              sqlCommand.Parameters["@ope_nprioridad"].Value = (object) this._ope_nprioridad;
              SqlParameter parameter = sqlCommand.Parameters["@ope_dCambio"];
              DateTime? opeDCambio = this._ope_dCambio;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!opeDCambio.HasValue ? 0 : (opeDCambio.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._ope_dCambio;
              parameter.Value = obj;
              sqlCommand.Parameters["@ope_nSereno"].Value = (object) this._ope_nSereno;
              sqlCommand.Parameters["@ope_iid"].Value = (object) this._ope_iid;
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
        throw new RuntimeException("The s_operadores is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("s_operadoresDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("s_operadoresSel", connection))
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
      Simples_operadores simplesOperadores = new Simples_operadores();
      simplesOperadores.Id = this.Id;
      simplesOperadores.Name = this.Name;
      simplesOperadores.ope_clogin = this._ope_clogin;
      simplesOperadores.ope_cnombre = this._ope_cnombre;
      simplesOperadores.ope_cclave = this._ope_cclave;
      simplesOperadores.ope_nsql = this._ope_nsql;
      simplesOperadores.ope_nsupervisor = this._ope_nsupervisor;
      simplesOperadores.ope_clinea = this._ope_clinea;
      simplesOperadores.ope_nprioridad = this._ope_nprioridad;
      simplesOperadores.ope_dCambio = this._ope_dCambio;
      simplesOperadores.ope_nSereno = this._ope_nSereno;
      simplesOperadores.ope_iid = this._ope_iid;
      if (this.CallerObject != null)
        simplesOperadores.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplesOperadores;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simples_operadores simplesOperadores = (Simples_operadores) BaseSimple;
      this.Id = simplesOperadores.Id;
      this.Name = simplesOperadores.Name;
      this._ope_clogin = simplesOperadores.ope_clogin;
      this._ope_cnombre = simplesOperadores.ope_cnombre;
      this._ope_cclave = simplesOperadores.ope_cclave;
      this._ope_nsql = simplesOperadores.ope_nsql;
      this._ope_nsupervisor = simplesOperadores.ope_nsupervisor;
      this._ope_clinea = simplesOperadores.ope_clinea;
      this._ope_nprioridad = simplesOperadores.ope_nprioridad;
      this._ope_dCambio = simplesOperadores.ope_dCambio;
      this._ope_nSereno = simplesOperadores.ope_nSereno;
      this._ope_iid = simplesOperadores.ope_iid;
      if (simplesOperadores.CallerObject != null)
        this.CallerObject = simplesOperadores.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callers_operadores callersOperadores = new Callers_operadores();
      callersOperadores.Id = this.Id;
      callersOperadores.Name = this.Name;
      callersOperadores.ope_clogin = this._ope_clogin;
      callersOperadores.ope_cnombre = this._ope_cnombre;
      callersOperadores.ope_cclave = this._ope_cclave;
      callersOperadores.ope_nsql = this._ope_nsql;
      callersOperadores.ope_nsupervisor = this._ope_nsupervisor;
      callersOperadores.ope_clinea = this._ope_clinea;
      callersOperadores.ope_nprioridad = this._ope_nprioridad;
      callersOperadores.ope_dCambio = this._ope_dCambio;
      callersOperadores.ope_nSereno = this._ope_nSereno;
      callersOperadores.ope_iid = this._ope_iid;
      return (CallerObject) callersOperadores;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_clogin", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_cclave", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_nsql", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ope_nsupervisor", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_clinea", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_nprioridad", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_dCambio", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("ope_nSereno", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_iid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ope_clogin"] = (object) this._ope_clogin;
      row["ope_cnombre"] = (object) this._ope_cnombre;
      row["ope_cclave"] = (object) this._ope_cclave;
      row["ope_nsql"] = (object) this._ope_nsql;
      row["ope_nsupervisor"] = (object) this._ope_nsupervisor;
      row["ope_clinea"] = (object) this._ope_clinea;
      row["ope_nprioridad"] = (object) this._ope_nprioridad;
      row["ope_dCambio"] = (object) this._ope_dCambio;
      row["ope_nSereno"] = (object) this._ope_nSereno;
      row["ope_iid"] = (object) this._ope_iid;
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
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("s_operadoresByChildObject", connection))
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
              Simples_operadores simplesOperadores = new Simples_operadores();
              simplesOperadores.Id = sqlDataReader.GetInt32(0);
              simplesOperadores.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplesOperadores.ope_clogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplesOperadores.ope_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplesOperadores.ope_cclave = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplesOperadores.ope_nsql = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simplesOperadores.ope_nsupervisor = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simplesOperadores.ope_clinea = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simplesOperadores.ope_nprioridad = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                simplesOperadores.ope_dCambio = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                simplesOperadores.ope_nSereno = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simplesOperadores.ope_iid = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              simplesOperadores.CallerObject = Object.GetCallerObject();
              simplesOperadores.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplesOperadores);
              objectCollection.Add((SimpleBaseObject) simplesOperadores);
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
        Simples_operadores simplesOperadores = new Simples_operadores();
        simplesOperadores.Id = (int) row["Id"];
        simplesOperadores.Name = (string) row["Name"];
        simplesOperadores.ope_clogin = row["ope_clogin"] == DBNull.Value ? "" : (string) row["ope_clogin"];
        simplesOperadores.ope_cnombre = row["ope_cnombre"] == DBNull.Value ? "" : (string) row["ope_cnombre"];
        simplesOperadores.ope_cclave = row["ope_cclave"] == DBNull.Value ? "" : (string) row["ope_cclave"];
        simplesOperadores.ope_nsql = row["ope_nsql"] == DBNull.Value ? 0 : (int) row["ope_nsql"];
        simplesOperadores.ope_nsupervisor = row["ope_nsupervisor"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ope_nsupervisor"];
        simplesOperadores.ope_clinea = row["ope_clinea"] == DBNull.Value ? "" : (string) row["ope_clinea"];
        simplesOperadores.ope_nprioridad = row["ope_nprioridad"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ope_nprioridad"];
        simplesOperadores.ope_dCambio = row["ope_dCambio"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["ope_dCambio"];
        simplesOperadores.ope_nSereno = row["ope_nSereno"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ope_nSereno"];
        simplesOperadores.ope_iid = row["ope_iid"] == DBNull.Value ? 0 : (int) row["ope_iid"];
        simplesOperadores.CallerObject = Object.GetCallerObject();
        simplesOperadores.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplesOperadores);
        if (Recursive)
          simplesOperadores.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplesOperadores, Recursive);
        objectCollection.Add((SimpleBaseObject) simplesOperadores);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("s_operadoresByParentObject", connection))
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
              Simples_operadores simplesOperadores = new Simples_operadores();
              simplesOperadores.Id = sqlDataReader.GetInt32(0);
              simplesOperadores.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplesOperadores.ope_clogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplesOperadores.ope_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplesOperadores.ope_cclave = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplesOperadores.ope_nsql = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simplesOperadores.ope_nsupervisor = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simplesOperadores.ope_clinea = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simplesOperadores.ope_nprioridad = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                simplesOperadores.ope_dCambio = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                simplesOperadores.ope_nSereno = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simplesOperadores.ope_iid = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              simplesOperadores.CallerObject = Object.GetCallerObject();
              simplesOperadores.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplesOperadores);
              objectCollection.Add((SimpleBaseObject) simplesOperadores);
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
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresByText", connection))
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

    public DataTable GetDataBySimpleObject(Simples_operadores Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("s_operadoresBySimples_operadores", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ope_clogin", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ope_cnombre", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ope_cclave", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ope_nsql", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ope_nsupervisor", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ope_clinea", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@ope_nprioridad", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ope_dCambio", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@ope_nSereno", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ope_iid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@ope_clogin"].Value = this._ope_clogin == null ? (object) DBNull.Value : (object) this._ope_clogin;
            selectCommand.Parameters["@ope_cnombre"].Value = this._ope_cnombre == null ? (object) DBNull.Value : (object) this._ope_cnombre;
            selectCommand.Parameters["@ope_cclave"].Value = this._ope_cclave == null ? (object) DBNull.Value : (object) this._ope_cclave;
            selectCommand.Parameters["@ope_nsql"].Value = (object) this._ope_nsql;
            selectCommand.Parameters["@ope_nsupervisor"].Value = (object) this._ope_nsupervisor;
            selectCommand.Parameters["@ope_clinea"].Value = this._ope_clinea == null ? (object) DBNull.Value : (object) this._ope_clinea;
            selectCommand.Parameters["@ope_nprioridad"].Value = (object) this._ope_nprioridad;
            SqlParameter parameter = selectCommand.Parameters["@ope_dCambio"];
            DateTime? opeDCambio = this._ope_dCambio;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!opeDCambio.HasValue ? 0 : (opeDCambio.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._ope_dCambio;
            parameter.Value = obj;
            selectCommand.Parameters["@ope_nSereno"].Value = (object) this._ope_nSereno;
            selectCommand.Parameters["@ope_iid"].Value = (object) this._ope_iid;
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

    public IEnumerable<Simples_operadores> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("s_operadoresByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simples_operadores Simple = new Simples_operadores();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.ope_clogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.ope_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.ope_cclave = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.ope_nsql = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.ope_nsupervisor = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.ope_clinea = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.ope_nprioridad = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.ope_dCambio = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                Simple.ope_nSereno = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.ope_iid = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simples_operadores> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("s_operadoresByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simples_operadores Simple = new Simples_operadores();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.ope_clogin = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.ope_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.ope_cclave = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.ope_nsql = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.ope_nsupervisor = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.ope_clinea = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.ope_nprioridad = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.ope_dCambio = new DateTime?(sqlDataReader.IsDBNull(9) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(9));
              if (sqlDataReader.FieldCount > 10)
                Simple.ope_nSereno = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.ope_iid = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3107, "s_operadores");
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
          this._ope_clogin = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._ope_cnombre = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._ope_cclave = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._ope_nsql = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
        if (Reader.FieldCount > 6)
          this._ope_nsupervisor = Reader.IsDBNull(6) ? new Decimal(0) : Reader.GetDecimal(6);
        if (Reader.FieldCount > 7)
          this._ope_clinea = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._ope_nprioridad = Reader.IsDBNull(8) ? new Decimal(0) : Reader.GetDecimal(8);
        if (Reader.FieldCount > 9)
          this._ope_dCambio = new DateTime?(Reader.IsDBNull(9) ? new DateTime(1, 1, 1) : Reader.GetDateTime(9));
        if (Reader.FieldCount > 10)
          this._ope_nSereno = Reader.IsDBNull(10) ? new Decimal(0) : Reader.GetDecimal(10);
        if (Reader.FieldCount > 11)
          this._ope_iid = Reader.IsDBNull(11) ? 0 : Reader.GetInt32(11);
      }
      Reader.Close();
    }
  }
}
