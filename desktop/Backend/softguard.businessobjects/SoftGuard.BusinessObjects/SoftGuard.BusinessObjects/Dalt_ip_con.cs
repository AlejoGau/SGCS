// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_ip_con
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
  public class Dalt_ip_con : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _ipc_icodigo;
    private string _ipc_cdescripcion;
    private int _ipc_ireceptor;
    private Decimal _ipc_nestado;
    private Decimal _ipc_nport;
    private Decimal _ipc_nprotocolo;
    private Decimal _ipc_crespondeack;
    private int _ipc_itiempoinactividad;
    private Decimal _ipc_cresetxhb;
    private int _ipc_imodemsms;
    private string _ipc_cremotehostip;

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

    public int ipc_icodigo
    {
      get
      {
        return this._ipc_icodigo;
      }
      set
      {
        this._ipc_icodigo = value;
      }
    }

    public string ipc_cdescripcion
    {
      get
      {
        return this._ipc_cdescripcion;
      }
      set
      {
        this._ipc_cdescripcion = value;
      }
    }

    public int ipc_ireceptor
    {
      get
      {
        return this._ipc_ireceptor;
      }
      set
      {
        this._ipc_ireceptor = value;
      }
    }

    public Decimal ipc_nestado
    {
      get
      {
        return this._ipc_nestado;
      }
      set
      {
        this._ipc_nestado = value;
      }
    }

    public Decimal ipc_nport
    {
      get
      {
        return this._ipc_nport;
      }
      set
      {
        this._ipc_nport = value;
      }
    }

    public Decimal ipc_nprotocolo
    {
      get
      {
        return this._ipc_nprotocolo;
      }
      set
      {
        this._ipc_nprotocolo = value;
      }
    }

    public Decimal ipc_crespondeack
    {
      get
      {
        return this._ipc_crespondeack;
      }
      set
      {
        this._ipc_crespondeack = value;
      }
    }

    public int ipc_itiempoinactividad
    {
      get
      {
        return this._ipc_itiempoinactividad;
      }
      set
      {
        this._ipc_itiempoinactividad = value;
      }
    }

    public Decimal ipc_cresetxhb
    {
      get
      {
        return this._ipc_cresetxhb;
      }
      set
      {
        this._ipc_cresetxhb = value;
      }
    }

    public int ipc_imodemsms
    {
      get
      {
        return this._ipc_imodemsms;
      }
      set
      {
        this._ipc_imodemsms = value;
      }
    }

    public string ipc_cremotehostip
    {
      get
      {
        return this._ipc_cremotehostip;
      }
      set
      {
        this._ipc_cremotehostip = value;
      }
    }

    public Dalt_ip_con(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_ip_con(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_ip_con(SqlHelper SqlConfig, int UserId, Simplet_ip_con Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._ipc_icodigo = Simple.ipc_icodigo;
      this._ipc_cdescripcion = Simple.ipc_cdescripcion;
      this._ipc_ireceptor = Simple.ipc_ireceptor;
      this._ipc_nestado = Simple.ipc_nestado;
      this._ipc_nport = Simple.ipc_nport;
      this._ipc_nprotocolo = Simple.ipc_nprotocolo;
      this._ipc_crespondeack = Simple.ipc_crespondeack;
      this._ipc_itiempoinactividad = Simple.ipc_itiempoinactividad;
      this._ipc_cresetxhb = Simple.ipc_cresetxhb;
      this._ipc_imodemsms = Simple.ipc_imodemsms;
      this._ipc_cremotehostip = Simple.ipc_cremotehostip;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_ip_conIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_icodigo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_ireceptor", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_nport", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_nprotocolo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_crespondeack", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_itiempoinactividad", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_cresetxhb", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_imodemsms", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_cremotehostip", SqlDbType.NChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@ipc_icodigo"].Value = (object) this._ipc_icodigo;
              sqlCommand.Parameters["@ipc_cdescripcion"].Value = this._ipc_cdescripcion == null ? (object) DBNull.Value : (object) this._ipc_cdescripcion;
              sqlCommand.Parameters["@ipc_ireceptor"].Value = (object) this._ipc_ireceptor;
              sqlCommand.Parameters["@ipc_nestado"].Value = (object) this._ipc_nestado;
              sqlCommand.Parameters["@ipc_nport"].Value = (object) this._ipc_nport;
              sqlCommand.Parameters["@ipc_nprotocolo"].Value = (object) this._ipc_nprotocolo;
              sqlCommand.Parameters["@ipc_crespondeack"].Value = (object) this._ipc_crespondeack;
              sqlCommand.Parameters["@ipc_itiempoinactividad"].Value = (object) this._ipc_itiempoinactividad;
              sqlCommand.Parameters["@ipc_cresetxhb"].Value = (object) this._ipc_cresetxhb;
              sqlCommand.Parameters["@ipc_imodemsms"].Value = (object) this._ipc_imodemsms;
              sqlCommand.Parameters["@ipc_cremotehostip"].Value = this._ipc_cremotehostip == null ? (object) DBNull.Value : (object) this._ipc_cremotehostip;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_ip_conUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_icodigo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_ireceptor", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_nport", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_nprotocolo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_crespondeack", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_itiempoinactividad", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_cresetxhb", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_imodemsms", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@ipc_cremotehostip", SqlDbType.NChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@ipc_icodigo"].Value = (object) this._ipc_icodigo;
              sqlCommand.Parameters["@ipc_cdescripcion"].Value = this._ipc_cdescripcion == null ? (object) DBNull.Value : (object) this._ipc_cdescripcion;
              sqlCommand.Parameters["@ipc_ireceptor"].Value = (object) this._ipc_ireceptor;
              sqlCommand.Parameters["@ipc_nestado"].Value = (object) this._ipc_nestado;
              sqlCommand.Parameters["@ipc_nport"].Value = (object) this._ipc_nport;
              sqlCommand.Parameters["@ipc_nprotocolo"].Value = (object) this._ipc_nprotocolo;
              sqlCommand.Parameters["@ipc_crespondeack"].Value = (object) this._ipc_crespondeack;
              sqlCommand.Parameters["@ipc_itiempoinactividad"].Value = (object) this._ipc_itiempoinactividad;
              sqlCommand.Parameters["@ipc_cresetxhb"].Value = (object) this._ipc_cresetxhb;
              sqlCommand.Parameters["@ipc_imodemsms"].Value = (object) this._ipc_imodemsms;
              sqlCommand.Parameters["@ipc_cremotehostip"].Value = this._ipc_cremotehostip == null ? (object) DBNull.Value : (object) this._ipc_cremotehostip;
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
        throw new RuntimeException("The t_ip_con is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_ip_conDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_ip_conSel", connection))
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
      Simplet_ip_con simpletIpCon = new Simplet_ip_con();
      simpletIpCon.Id = this.Id;
      simpletIpCon.Name = this.Name;
      simpletIpCon.ipc_icodigo = this._ipc_icodigo;
      simpletIpCon.ipc_cdescripcion = this._ipc_cdescripcion;
      simpletIpCon.ipc_ireceptor = this._ipc_ireceptor;
      simpletIpCon.ipc_nestado = this._ipc_nestado;
      simpletIpCon.ipc_nport = this._ipc_nport;
      simpletIpCon.ipc_nprotocolo = this._ipc_nprotocolo;
      simpletIpCon.ipc_crespondeack = this._ipc_crespondeack;
      simpletIpCon.ipc_itiempoinactividad = this._ipc_itiempoinactividad;
      simpletIpCon.ipc_cresetxhb = this._ipc_cresetxhb;
      simpletIpCon.ipc_imodemsms = this._ipc_imodemsms;
      simpletIpCon.ipc_cremotehostip = this._ipc_cremotehostip;
      if (this.CallerObject != null)
        simpletIpCon.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletIpCon;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_ip_con simpletIpCon = (Simplet_ip_con) BaseSimple;
      this.Id = simpletIpCon.Id;
      this.Name = simpletIpCon.Name;
      this._ipc_icodigo = simpletIpCon.ipc_icodigo;
      this._ipc_cdescripcion = simpletIpCon.ipc_cdescripcion;
      this._ipc_ireceptor = simpletIpCon.ipc_ireceptor;
      this._ipc_nestado = simpletIpCon.ipc_nestado;
      this._ipc_nport = simpletIpCon.ipc_nport;
      this._ipc_nprotocolo = simpletIpCon.ipc_nprotocolo;
      this._ipc_crespondeack = simpletIpCon.ipc_crespondeack;
      this._ipc_itiempoinactividad = simpletIpCon.ipc_itiempoinactividad;
      this._ipc_cresetxhb = simpletIpCon.ipc_cresetxhb;
      this._ipc_imodemsms = simpletIpCon.ipc_imodemsms;
      this._ipc_cremotehostip = simpletIpCon.ipc_cremotehostip;
      if (simpletIpCon.CallerObject != null)
        this.CallerObject = simpletIpCon.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_ip_con callertIpCon = new Callert_ip_con();
      callertIpCon.Id = this.Id;
      callertIpCon.Name = this.Name;
      callertIpCon.ipc_icodigo = this._ipc_icodigo;
      callertIpCon.ipc_cdescripcion = this._ipc_cdescripcion;
      callertIpCon.ipc_ireceptor = this._ipc_ireceptor;
      callertIpCon.ipc_nestado = this._ipc_nestado;
      callertIpCon.ipc_nport = this._ipc_nport;
      callertIpCon.ipc_nprotocolo = this._ipc_nprotocolo;
      callertIpCon.ipc_crespondeack = this._ipc_crespondeack;
      callertIpCon.ipc_itiempoinactividad = this._ipc_itiempoinactividad;
      callertIpCon.ipc_cresetxhb = this._ipc_cresetxhb;
      callertIpCon.ipc_imodemsms = this._ipc_imodemsms;
      callertIpCon.ipc_cremotehostip = this._ipc_cremotehostip;
      return (CallerObject) callertIpCon;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ipc_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ipc_ireceptor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_nport", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_nprotocolo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_crespondeack", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_itiempoinactividad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cresetxhb", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_imodemsms", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cremotehostip", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ipc_icodigo"] = (object) this._ipc_icodigo;
      row["ipc_cdescripcion"] = (object) this._ipc_cdescripcion;
      row["ipc_ireceptor"] = (object) this._ipc_ireceptor;
      row["ipc_nestado"] = (object) this._ipc_nestado;
      row["ipc_nport"] = (object) this._ipc_nport;
      row["ipc_nprotocolo"] = (object) this._ipc_nprotocolo;
      row["ipc_crespondeack"] = (object) this._ipc_crespondeack;
      row["ipc_itiempoinactividad"] = (object) this._ipc_itiempoinactividad;
      row["ipc_cresetxhb"] = (object) this._ipc_cresetxhb;
      row["ipc_imodemsms"] = (object) this._ipc_imodemsms;
      row["ipc_cremotehostip"] = (object) this._ipc_cremotehostip;
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
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_ip_conByChildObject", connection))
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
              Simplet_ip_con simpletIpCon = new Simplet_ip_con();
              simpletIpCon.Id = sqlDataReader.GetInt32(0);
              simpletIpCon.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletIpCon.ipc_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpletIpCon.ipc_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletIpCon.ipc_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpletIpCon.ipc_nestado = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                simpletIpCon.ipc_nport = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simpletIpCon.ipc_nprotocolo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletIpCon.ipc_crespondeack = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                simpletIpCon.ipc_itiempoinactividad = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                simpletIpCon.ipc_cresetxhb = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simpletIpCon.ipc_imodemsms = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simpletIpCon.ipc_cremotehostip = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              simpletIpCon.CallerObject = Object.GetCallerObject();
              simpletIpCon.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletIpCon);
              objectCollection.Add((SimpleBaseObject) simpletIpCon);
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
        Simplet_ip_con simpletIpCon = new Simplet_ip_con();
        simpletIpCon.Id = (int) row["Id"];
        simpletIpCon.Name = (string) row["Name"];
        simpletIpCon.ipc_icodigo = row["ipc_icodigo"] == DBNull.Value ? 0 : (int) row["ipc_icodigo"];
        simpletIpCon.ipc_cdescripcion = row["ipc_cdescripcion"] == DBNull.Value ? "" : (string) row["ipc_cdescripcion"];
        simpletIpCon.ipc_ireceptor = row["ipc_ireceptor"] == DBNull.Value ? 0 : (int) row["ipc_ireceptor"];
        simpletIpCon.ipc_nestado = row["ipc_nestado"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ipc_nestado"];
        simpletIpCon.ipc_nport = row["ipc_nport"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ipc_nport"];
        simpletIpCon.ipc_nprotocolo = row["ipc_nprotocolo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ipc_nprotocolo"];
        simpletIpCon.ipc_crespondeack = row["ipc_crespondeack"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ipc_crespondeack"];
        simpletIpCon.ipc_itiempoinactividad = row["ipc_itiempoinactividad"] == DBNull.Value ? 0 : (int) row["ipc_itiempoinactividad"];
        simpletIpCon.ipc_cresetxhb = row["ipc_cresetxhb"] == DBNull.Value ? new Decimal(0) : (Decimal) row["ipc_cresetxhb"];
        simpletIpCon.ipc_imodemsms = row["ipc_imodemsms"] == DBNull.Value ? 0 : (int) row["ipc_imodemsms"];
        simpletIpCon.ipc_cremotehostip = row["ipc_cremotehostip"] == DBNull.Value ? "" : (string) row["ipc_cremotehostip"];
        simpletIpCon.CallerObject = Object.GetCallerObject();
        simpletIpCon.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletIpCon);
        if (Recursive)
          simpletIpCon.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletIpCon, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletIpCon);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_ip_conByParentObject", connection))
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
              Simplet_ip_con simpletIpCon = new Simplet_ip_con();
              simpletIpCon.Id = sqlDataReader.GetInt32(0);
              simpletIpCon.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletIpCon.ipc_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpletIpCon.ipc_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletIpCon.ipc_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpletIpCon.ipc_nestado = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                simpletIpCon.ipc_nport = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simpletIpCon.ipc_nprotocolo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletIpCon.ipc_crespondeack = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                simpletIpCon.ipc_itiempoinactividad = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                simpletIpCon.ipc_cresetxhb = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simpletIpCon.ipc_imodemsms = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simpletIpCon.ipc_cremotehostip = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              simpletIpCon.CallerObject = Object.GetCallerObject();
              simpletIpCon.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletIpCon);
              objectCollection.Add((SimpleBaseObject) simpletIpCon);
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
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_ip_con Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_ip_conBySimplet_ip_con", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_icodigo", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_cdescripcion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_ireceptor", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_nestado", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_nport", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_nprotocolo", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_crespondeack", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_itiempoinactividad", SqlDbType.SmallInt));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_cresetxhb", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_imodemsms", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ipc_cremotehostip", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@ipc_icodigo"].Value = (object) this._ipc_icodigo;
            selectCommand.Parameters["@ipc_cdescripcion"].Value = this._ipc_cdescripcion == null ? (object) DBNull.Value : (object) this._ipc_cdescripcion;
            selectCommand.Parameters["@ipc_ireceptor"].Value = (object) this._ipc_ireceptor;
            selectCommand.Parameters["@ipc_nestado"].Value = (object) this._ipc_nestado;
            selectCommand.Parameters["@ipc_nport"].Value = (object) this._ipc_nport;
            selectCommand.Parameters["@ipc_nprotocolo"].Value = (object) this._ipc_nprotocolo;
            selectCommand.Parameters["@ipc_crespondeack"].Value = (object) this._ipc_crespondeack;
            selectCommand.Parameters["@ipc_itiempoinactividad"].Value = (object) this._ipc_itiempoinactividad;
            selectCommand.Parameters["@ipc_cresetxhb"].Value = (object) this._ipc_cresetxhb;
            selectCommand.Parameters["@ipc_imodemsms"].Value = (object) this._ipc_imodemsms;
            selectCommand.Parameters["@ipc_cremotehostip"].Value = this._ipc_cremotehostip == null ? (object) DBNull.Value : (object) this._ipc_cremotehostip;
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

    public IEnumerable<Simplet_ip_con> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_ip_conByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_ip_con Simple = new Simplet_ip_con();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.ipc_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.ipc_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.ipc_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.ipc_nestado = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.ipc_nport = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.ipc_nprotocolo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.ipc_crespondeack = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.ipc_itiempoinactividad = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.ipc_cresetxhb = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.ipc_imodemsms = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.ipc_cremotehostip = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_ip_con> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_ip_conByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_ip_con Simple = new Simplet_ip_con();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.ipc_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.ipc_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.ipc_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.ipc_nestado = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.ipc_nport = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.ipc_nprotocolo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.ipc_crespondeack = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.ipc_itiempoinactividad = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.ipc_cresetxhb = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.ipc_imodemsms = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.ipc_cremotehostip = sqlDataReader.IsDBNull(12) ? "" : sqlDataReader.GetString(12);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3092, "t_ip_con");
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
          this._ipc_icodigo = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._ipc_cdescripcion = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._ipc_ireceptor = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._ipc_nestado = Reader.IsDBNull(5) ? new Decimal(0) : Reader.GetDecimal(5);
        if (Reader.FieldCount > 6)
          this._ipc_nport = Reader.IsDBNull(6) ? new Decimal(0) : Reader.GetDecimal(6);
        if (Reader.FieldCount > 7)
          this._ipc_nprotocolo = Reader.IsDBNull(7) ? new Decimal(0) : Reader.GetDecimal(7);
        if (Reader.FieldCount > 8)
          this._ipc_crespondeack = Reader.IsDBNull(8) ? new Decimal(0) : Reader.GetDecimal(8);
        if (Reader.FieldCount > 9)
          this._ipc_itiempoinactividad = Reader.IsDBNull(9) ? 0 : (int) Reader.GetInt16(9);
        if (Reader.FieldCount > 10)
          this._ipc_cresetxhb = Reader.IsDBNull(10) ? new Decimal(0) : Reader.GetDecimal(10);
        if (Reader.FieldCount > 11)
          this._ipc_imodemsms = Reader.IsDBNull(11) ? 0 : Reader.GetInt32(11);
        if (Reader.FieldCount > 12)
          this._ipc_cremotehostip = Reader.IsDBNull(12) ? "" : Reader.GetString(12);
      }
      Reader.Close();
    }
  }
}
