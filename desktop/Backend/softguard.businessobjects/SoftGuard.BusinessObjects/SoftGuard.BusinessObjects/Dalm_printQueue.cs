// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalm_printQueue
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
  public class Dalm_printQueue : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _prn_cbc_icodigo_id;
    private int _prn_icopia;
    private string _prn_cbc_ctipocbte;
    private int _prn_cbc_inumerocbte;
    private string _prn_cbc_cprefijocbte;
    private DateTime? _prn_cbc_dfecha;
    private string _prn_org_cnombre;
    private string _prn_organizationName;
    private string _prn_cli_cidentificacion;
    private int _prn_iestado;
    private string _prn_cfilename;

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

    public int prn_cbc_icodigo_id
    {
      get
      {
        return this._prn_cbc_icodigo_id;
      }
      set
      {
        this._prn_cbc_icodigo_id = value;
      }
    }

    public int prn_icopia
    {
      get
      {
        return this._prn_icopia;
      }
      set
      {
        this._prn_icopia = value;
      }
    }

    public string prn_cbc_ctipocbte
    {
      get
      {
        return this._prn_cbc_ctipocbte;
      }
      set
      {
        this._prn_cbc_ctipocbte = value;
      }
    }

    public int prn_cbc_inumerocbte
    {
      get
      {
        return this._prn_cbc_inumerocbte;
      }
      set
      {
        this._prn_cbc_inumerocbte = value;
      }
    }

    public string prn_cbc_cprefijocbte
    {
      get
      {
        return this._prn_cbc_cprefijocbte;
      }
      set
      {
        this._prn_cbc_cprefijocbte = value;
      }
    }

    public DateTime? prn_cbc_dfecha
    {
      get
      {
        return this._prn_cbc_dfecha;
      }
      set
      {
        this._prn_cbc_dfecha = value;
      }
    }

    public string prn_org_cnombre
    {
      get
      {
        return this._prn_org_cnombre;
      }
      set
      {
        this._prn_org_cnombre = value;
      }
    }

    public string prn_organizationName
    {
      get
      {
        return this._prn_organizationName;
      }
      set
      {
        this._prn_organizationName = value;
      }
    }

    public string prn_cli_cidentificacion
    {
      get
      {
        return this._prn_cli_cidentificacion;
      }
      set
      {
        this._prn_cli_cidentificacion = value;
      }
    }

    public int prn_iestado
    {
      get
      {
        return this._prn_iestado;
      }
      set
      {
        this._prn_iestado = value;
      }
    }

    public string prn_cfilename
    {
      get
      {
        return this._prn_cfilename;
      }
      set
      {
        this._prn_cfilename = value;
      }
    }

    public Dalm_printQueue(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalm_printQueue(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalm_printQueue(SqlHelper SqlConfig, int UserId, Simplem_printQueue Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._prn_cbc_icodigo_id = Simple.prn_cbc_icodigo_id;
      this._prn_icopia = Simple.prn_icopia;
      this._prn_cbc_ctipocbte = Simple.prn_cbc_ctipocbte;
      this._prn_cbc_inumerocbte = Simple.prn_cbc_inumerocbte;
      this._prn_cbc_cprefijocbte = Simple.prn_cbc_cprefijocbte;
      this._prn_cbc_dfecha = Simple.prn_cbc_dfecha;
      this._prn_org_cnombre = Simple.prn_org_cnombre;
      this._prn_organizationName = Simple.prn_organizationName;
      this._prn_cli_cidentificacion = Simple.prn_cli_cidentificacion;
      this._prn_iestado = Simple.prn_iestado;
      this._prn_cfilename = Simple.prn_cfilename;
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
            using (SqlCommand sqlCommand = new SqlCommand("m_printQueueIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_icodigo_id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_icopia", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_ctipocbte", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_inumerocbte", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_cprefijocbte", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_dfecha", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_org_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_organizationName", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cli_cidentificacion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_iestado", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cfilename", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@prn_cbc_icodigo_id"].Value = (object) this._prn_cbc_icodigo_id;
              sqlCommand.Parameters["@prn_icopia"].Value = (object) this._prn_icopia;
              sqlCommand.Parameters["@prn_cbc_ctipocbte"].Value = this._prn_cbc_ctipocbte == null ? (object) DBNull.Value : (object) this._prn_cbc_ctipocbte;
              sqlCommand.Parameters["@prn_cbc_inumerocbte"].Value = (object) this._prn_cbc_inumerocbte;
              sqlCommand.Parameters["@prn_cbc_cprefijocbte"].Value = this._prn_cbc_cprefijocbte == null ? (object) DBNull.Value : (object) this._prn_cbc_cprefijocbte;
              SqlParameter parameter = sqlCommand.Parameters["@prn_cbc_dfecha"];
              DateTime? prnCbcDfecha = this._prn_cbc_dfecha;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!prnCbcDfecha.HasValue ? 0 : (prnCbcDfecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prn_cbc_dfecha;
              parameter.Value = obj;
              sqlCommand.Parameters["@prn_org_cnombre"].Value = this._prn_org_cnombre == null ? (object) DBNull.Value : (object) this._prn_org_cnombre;
              sqlCommand.Parameters["@prn_organizationName"].Value = this._prn_organizationName == null ? (object) DBNull.Value : (object) this._prn_organizationName;
              sqlCommand.Parameters["@prn_cli_cidentificacion"].Value = this._prn_cli_cidentificacion == null ? (object) DBNull.Value : (object) this._prn_cli_cidentificacion;
              sqlCommand.Parameters["@prn_iestado"].Value = (object) this._prn_iestado;
              sqlCommand.Parameters["@prn_cfilename"].Value = this._prn_cfilename == null ? (object) DBNull.Value : (object) this._prn_cfilename;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("m_printQueueUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_icodigo_id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_icopia", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_ctipocbte", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_inumerocbte", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_cprefijocbte", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cbc_dfecha", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_org_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_organizationName", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cli_cidentificacion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_iestado", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@prn_cfilename", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@prn_cbc_icodigo_id"].Value = (object) this._prn_cbc_icodigo_id;
              sqlCommand.Parameters["@prn_icopia"].Value = (object) this._prn_icopia;
              sqlCommand.Parameters["@prn_cbc_ctipocbte"].Value = this._prn_cbc_ctipocbte == null ? (object) DBNull.Value : (object) this._prn_cbc_ctipocbte;
              sqlCommand.Parameters["@prn_cbc_inumerocbte"].Value = (object) this._prn_cbc_inumerocbte;
              sqlCommand.Parameters["@prn_cbc_cprefijocbte"].Value = this._prn_cbc_cprefijocbte == null ? (object) DBNull.Value : (object) this._prn_cbc_cprefijocbte;
              SqlParameter parameter = sqlCommand.Parameters["@prn_cbc_dfecha"];
              DateTime? prnCbcDfecha = this._prn_cbc_dfecha;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!prnCbcDfecha.HasValue ? 0 : (prnCbcDfecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prn_cbc_dfecha;
              parameter.Value = obj;
              sqlCommand.Parameters["@prn_org_cnombre"].Value = this._prn_org_cnombre == null ? (object) DBNull.Value : (object) this._prn_org_cnombre;
              sqlCommand.Parameters["@prn_organizationName"].Value = this._prn_organizationName == null ? (object) DBNull.Value : (object) this._prn_organizationName;
              sqlCommand.Parameters["@prn_cli_cidentificacion"].Value = this._prn_cli_cidentificacion == null ? (object) DBNull.Value : (object) this._prn_cli_cidentificacion;
              sqlCommand.Parameters["@prn_iestado"].Value = (object) this._prn_iestado;
              sqlCommand.Parameters["@prn_cfilename"].Value = this._prn_cfilename == null ? (object) DBNull.Value : (object) this._prn_cfilename;
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
        throw new RuntimeException("The m_printQueue is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("m_printQueueDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_printQueueSel", connection))
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
      Simplem_printQueue simplemPrintQueue = new Simplem_printQueue();
      simplemPrintQueue.Id = this.Id;
      simplemPrintQueue.Name = this.Name;
      simplemPrintQueue.prn_cbc_icodigo_id = this._prn_cbc_icodigo_id;
      simplemPrintQueue.prn_icopia = this._prn_icopia;
      simplemPrintQueue.prn_cbc_ctipocbte = this._prn_cbc_ctipocbte;
      simplemPrintQueue.prn_cbc_inumerocbte = this._prn_cbc_inumerocbte;
      simplemPrintQueue.prn_cbc_cprefijocbte = this._prn_cbc_cprefijocbte;
      simplemPrintQueue.prn_cbc_dfecha = this._prn_cbc_dfecha;
      simplemPrintQueue.prn_org_cnombre = this._prn_org_cnombre;
      simplemPrintQueue.prn_organizationName = this._prn_organizationName;
      simplemPrintQueue.prn_cli_cidentificacion = this._prn_cli_cidentificacion;
      simplemPrintQueue.prn_iestado = this._prn_iestado;
      simplemPrintQueue.prn_cfilename = this._prn_cfilename;
      if (this.CallerObject != null)
        simplemPrintQueue.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplemPrintQueue;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplem_printQueue simplemPrintQueue = (Simplem_printQueue) BaseSimple;
      this.Id = simplemPrintQueue.Id;
      this.Name = simplemPrintQueue.Name;
      this._prn_cbc_icodigo_id = simplemPrintQueue.prn_cbc_icodigo_id;
      this._prn_icopia = simplemPrintQueue.prn_icopia;
      this._prn_cbc_ctipocbte = simplemPrintQueue.prn_cbc_ctipocbte;
      this._prn_cbc_inumerocbte = simplemPrintQueue.prn_cbc_inumerocbte;
      this._prn_cbc_cprefijocbte = simplemPrintQueue.prn_cbc_cprefijocbte;
      this._prn_cbc_dfecha = simplemPrintQueue.prn_cbc_dfecha;
      this._prn_org_cnombre = simplemPrintQueue.prn_org_cnombre;
      this._prn_organizationName = simplemPrintQueue.prn_organizationName;
      this._prn_cli_cidentificacion = simplemPrintQueue.prn_cli_cidentificacion;
      this._prn_iestado = simplemPrintQueue.prn_iestado;
      this._prn_cfilename = simplemPrintQueue.prn_cfilename;
      if (simplemPrintQueue.CallerObject != null)
        this.CallerObject = simplemPrintQueue.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_printQueue callermPrintQueue = new Callerm_printQueue();
      callermPrintQueue.Id = this.Id;
      callermPrintQueue.Name = this.Name;
      callermPrintQueue.prn_cbc_icodigo_id = this._prn_cbc_icodigo_id;
      callermPrintQueue.prn_icopia = this._prn_icopia;
      callermPrintQueue.prn_cbc_ctipocbte = this._prn_cbc_ctipocbte;
      callermPrintQueue.prn_cbc_inumerocbte = this._prn_cbc_inumerocbte;
      callermPrintQueue.prn_cbc_cprefijocbte = this._prn_cbc_cprefijocbte;
      callermPrintQueue.prn_cbc_dfecha = this._prn_cbc_dfecha;
      callermPrintQueue.prn_org_cnombre = this._prn_org_cnombre;
      callermPrintQueue.prn_organizationName = this._prn_organizationName;
      callermPrintQueue.prn_cli_cidentificacion = this._prn_cli_cidentificacion;
      callermPrintQueue.prn_iestado = this._prn_iestado;
      callermPrintQueue.prn_cfilename = this._prn_cfilename;
      return (CallerObject) callermPrintQueue;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_icodigo_id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_icopia", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_ctipocbte", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_inumerocbte", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_cprefijocbte", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_dfecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prn_org_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_organizationName", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cli_cidentificacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_iestado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cfilename", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["prn_cbc_icodigo_id"] = (object) this._prn_cbc_icodigo_id;
      row["prn_icopia"] = (object) this._prn_icopia;
      row["prn_cbc_ctipocbte"] = (object) this._prn_cbc_ctipocbte;
      row["prn_cbc_inumerocbte"] = (object) this._prn_cbc_inumerocbte;
      row["prn_cbc_cprefijocbte"] = (object) this._prn_cbc_cprefijocbte;
      row["prn_cbc_dfecha"] = (object) this._prn_cbc_dfecha;
      row["prn_org_cnombre"] = (object) this._prn_org_cnombre;
      row["prn_organizationName"] = (object) this._prn_organizationName;
      row["prn_cli_cidentificacion"] = (object) this._prn_cli_cidentificacion;
      row["prn_iestado"] = (object) this._prn_iestado;
      row["prn_cfilename"] = (object) this._prn_cfilename;
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
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_printQueueByChildObject", connection))
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
              Simplem_printQueue simplemPrintQueue = new Simplem_printQueue();
              simplemPrintQueue.Id = sqlDataReader.GetInt32(0);
              simplemPrintQueue.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemPrintQueue.prn_cbc_icodigo_id = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simplemPrintQueue.prn_icopia = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simplemPrintQueue.prn_cbc_ctipocbte = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplemPrintQueue.prn_cbc_inumerocbte = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simplemPrintQueue.prn_cbc_cprefijocbte = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simplemPrintQueue.prn_cbc_dfecha = new DateTime?(sqlDataReader.IsDBNull(7) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(7));
              if (sqlDataReader.FieldCount > 8)
                simplemPrintQueue.prn_org_cnombre = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simplemPrintQueue.prn_organizationName = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simplemPrintQueue.prn_cli_cidentificacion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                simplemPrintQueue.prn_iestado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simplemPrintQueue.prn_cfilename = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              simplemPrintQueue.CallerObject = Object.GetCallerObject();
              simplemPrintQueue.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemPrintQueue);
              objectCollection.Add((SimpleBaseObject) simplemPrintQueue);
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
        Simplem_printQueue simplemPrintQueue = new Simplem_printQueue();
        simplemPrintQueue.Id = (int) row["Id"];
        simplemPrintQueue.Name = (string) row["Name"];
        simplemPrintQueue.prn_cbc_icodigo_id = row["prn_cbc_icodigo_id"] == DBNull.Value ? 0 : (int) row["prn_cbc_icodigo_id"];
        simplemPrintQueue.prn_icopia = row["prn_icopia"] == DBNull.Value ? 0 : (int) row["prn_icopia"];
        simplemPrintQueue.prn_cbc_ctipocbte = row["prn_cbc_ctipocbte"] == DBNull.Value ? "" : (string) row["prn_cbc_ctipocbte"];
        simplemPrintQueue.prn_cbc_inumerocbte = row["prn_cbc_inumerocbte"] == DBNull.Value ? 0 : (int) row["prn_cbc_inumerocbte"];
        simplemPrintQueue.prn_cbc_cprefijocbte = row["prn_cbc_cprefijocbte"] == DBNull.Value ? "" : (string) row["prn_cbc_cprefijocbte"];
        simplemPrintQueue.prn_cbc_dfecha = row["prn_cbc_dfecha"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["prn_cbc_dfecha"];
        simplemPrintQueue.prn_org_cnombre = row["prn_org_cnombre"] == DBNull.Value ? "" : (string) row["prn_org_cnombre"];
        simplemPrintQueue.prn_organizationName = row["prn_organizationName"] == DBNull.Value ? "" : (string) row["prn_organizationName"];
        simplemPrintQueue.prn_cli_cidentificacion = row["prn_cli_cidentificacion"] == DBNull.Value ? "" : (string) row["prn_cli_cidentificacion"];
        simplemPrintQueue.prn_iestado = row["prn_iestado"] == DBNull.Value ? 0 : (int) row["prn_iestado"];
        simplemPrintQueue.prn_cfilename = row["prn_cfilename"] == DBNull.Value ? "" : (string) row["prn_cfilename"];
        simplemPrintQueue.CallerObject = Object.GetCallerObject();
        simplemPrintQueue.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemPrintQueue);
        if (Recursive)
          simplemPrintQueue.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplemPrintQueue, Recursive);
        objectCollection.Add((SimpleBaseObject) simplemPrintQueue);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_printQueueByParentObject", connection))
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
              Simplem_printQueue simplemPrintQueue = new Simplem_printQueue();
              simplemPrintQueue.Id = sqlDataReader.GetInt32(0);
              simplemPrintQueue.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemPrintQueue.prn_cbc_icodigo_id = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simplemPrintQueue.prn_icopia = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simplemPrintQueue.prn_cbc_ctipocbte = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplemPrintQueue.prn_cbc_inumerocbte = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                simplemPrintQueue.prn_cbc_cprefijocbte = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simplemPrintQueue.prn_cbc_dfecha = new DateTime?(sqlDataReader.IsDBNull(7) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(7));
              if (sqlDataReader.FieldCount > 8)
                simplemPrintQueue.prn_org_cnombre = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simplemPrintQueue.prn_organizationName = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simplemPrintQueue.prn_cli_cidentificacion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                simplemPrintQueue.prn_iestado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simplemPrintQueue.prn_cfilename = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              simplemPrintQueue.CallerObject = Object.GetCallerObject();
              simplemPrintQueue.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemPrintQueue);
              objectCollection.Add((SimpleBaseObject) simplemPrintQueue);
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
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplem_printQueue Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_printQueueBySimplem_printQueue", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prn_cbc_icodigo_id", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@prn_icopia", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@prn_cbc_ctipocbte", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@prn_cbc_inumerocbte", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@prn_cbc_cprefijocbte", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@prn_cbc_dfecha", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@prn_org_cnombre", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prn_organizationName", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prn_cli_cidentificacion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@prn_iestado", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@prn_cfilename", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@prn_cbc_icodigo_id"].Value = (object) this._prn_cbc_icodigo_id;
            selectCommand.Parameters["@prn_icopia"].Value = (object) this._prn_icopia;
            selectCommand.Parameters["@prn_cbc_ctipocbte"].Value = this._prn_cbc_ctipocbte == null ? (object) DBNull.Value : (object) this._prn_cbc_ctipocbte;
            selectCommand.Parameters["@prn_cbc_inumerocbte"].Value = (object) this._prn_cbc_inumerocbte;
            selectCommand.Parameters["@prn_cbc_cprefijocbte"].Value = this._prn_cbc_cprefijocbte == null ? (object) DBNull.Value : (object) this._prn_cbc_cprefijocbte;
            SqlParameter parameter = selectCommand.Parameters["@prn_cbc_dfecha"];
            DateTime? prnCbcDfecha = this._prn_cbc_dfecha;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!prnCbcDfecha.HasValue ? 0 : (prnCbcDfecha.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._prn_cbc_dfecha;
            parameter.Value = obj;
            selectCommand.Parameters["@prn_org_cnombre"].Value = this._prn_org_cnombre == null ? (object) DBNull.Value : (object) this._prn_org_cnombre;
            selectCommand.Parameters["@prn_organizationName"].Value = this._prn_organizationName == null ? (object) DBNull.Value : (object) this._prn_organizationName;
            selectCommand.Parameters["@prn_cli_cidentificacion"].Value = this._prn_cli_cidentificacion == null ? (object) DBNull.Value : (object) this._prn_cli_cidentificacion;
            selectCommand.Parameters["@prn_iestado"].Value = (object) this._prn_iestado;
            selectCommand.Parameters["@prn_cfilename"].Value = this._prn_cfilename == null ? (object) DBNull.Value : (object) this._prn_cfilename;
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

    public IEnumerable<Simplem_printQueue> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_printQueueByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_printQueue Simple = new Simplem_printQueue();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.prn_cbc_icodigo_id = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.prn_icopia = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.prn_cbc_ctipocbte = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.prn_cbc_inumerocbte = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.prn_cbc_cprefijocbte = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.prn_cbc_dfecha = new DateTime?(sqlDataReader.IsDBNull(7) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(7));
              if (sqlDataReader.FieldCount > 8)
                Simple.prn_org_cnombre = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.prn_organizationName = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.prn_cli_cidentificacion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.prn_iestado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.prn_cfilename = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplem_printQueue> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_printQueueByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_printQueue Simple = new Simplem_printQueue();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.prn_cbc_icodigo_id = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.prn_icopia = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.prn_cbc_ctipocbte = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.prn_cbc_inumerocbte = sqlDataReader.IsDBNull(5) ? 0 : sqlDataReader.GetInt32(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.prn_cbc_cprefijocbte = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.prn_cbc_dfecha = new DateTime?(sqlDataReader.IsDBNull(7) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(7));
              if (sqlDataReader.FieldCount > 8)
                Simple.prn_org_cnombre = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.prn_organizationName = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.prn_cli_cidentificacion = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.prn_iestado = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.prn_cfilename = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3157, "m_printQueue");
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
          this._prn_cbc_icodigo_id = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._prn_icopia = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        if (Reader.FieldCount > 4)
          this._prn_cbc_ctipocbte = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._prn_cbc_inumerocbte = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
        if (Reader.FieldCount > 6)
          this._prn_cbc_cprefijocbte = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._prn_cbc_dfecha = new DateTime?(Reader.IsDBNull(7) ? new DateTime(1, 1, 1) : Reader.GetDateTime(7));
        if (Reader.FieldCount > 8)
          this._prn_org_cnombre = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._prn_organizationName = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
        if (Reader.FieldCount > 10)
          this._prn_cli_cidentificacion = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
        if (Reader.FieldCount > 11)
          this._prn_iestado = Reader.IsDBNull(11) ? 0 : Reader.GetInt32(11);
        if (Reader.FieldCount > 12)
          this._prn_cfilename = Reader.IsDBNull(12) ? "" : Reader.GetString(12);
      }
      Reader.Close();
    }
  }
}
