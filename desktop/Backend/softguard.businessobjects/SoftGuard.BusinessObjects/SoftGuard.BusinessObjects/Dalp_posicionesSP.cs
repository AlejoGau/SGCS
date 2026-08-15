// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalp_posicionesSP
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
  public class Dalp_posicionesSP : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private DateTime? _sp_tfechahora;
    private string _sp_cIMEI;
    private float _sp_rLatitud;
    private float _sp_rLongitud;
    private float _sp_rAccuracy;
    private int _sp_iVelocidad;
    private int _sp_iRumbo;
    private int _sp_iOdometro;
    private int _sp_iBatt;
    private int _sp_iSecuencia;
    private int _sp_reciid;

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

    public DateTime? sp_tfechahora
    {
      get
      {
        return this._sp_tfechahora;
      }
      set
      {
        this._sp_tfechahora = value;
      }
    }

    public string sp_cIMEI
    {
      get
      {
        return this._sp_cIMEI;
      }
      set
      {
        this._sp_cIMEI = value;
      }
    }

    public float sp_rLatitud
    {
      get
      {
        return this._sp_rLatitud;
      }
      set
      {
        this._sp_rLatitud = value;
      }
    }

    public float sp_rLongitud
    {
      get
      {
        return this._sp_rLongitud;
      }
      set
      {
        this._sp_rLongitud = value;
      }
    }

    public float sp_rAccuracy
    {
      get
      {
        return this._sp_rAccuracy;
      }
      set
      {
        this._sp_rAccuracy = value;
      }
    }

    public int sp_iVelocidad
    {
      get
      {
        return this._sp_iVelocidad;
      }
      set
      {
        this._sp_iVelocidad = value;
      }
    }

    public int sp_iRumbo
    {
      get
      {
        return this._sp_iRumbo;
      }
      set
      {
        this._sp_iRumbo = value;
      }
    }

    public int sp_iOdometro
    {
      get
      {
        return this._sp_iOdometro;
      }
      set
      {
        this._sp_iOdometro = value;
      }
    }

    public int sp_iBatt
    {
      get
      {
        return this._sp_iBatt;
      }
      set
      {
        this._sp_iBatt = value;
      }
    }

    public int sp_iSecuencia
    {
      get
      {
        return this._sp_iSecuencia;
      }
      set
      {
        this._sp_iSecuencia = value;
      }
    }

    public int sp_reciid
    {
      get
      {
        return this._sp_reciid;
      }
      set
      {
        this._sp_reciid = value;
      }
    }

    public Dalp_posicionesSP(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalp_posicionesSP(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalp_posicionesSP(SqlHelper SqlConfig, int UserId, Simplep_posicionesSP Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._sp_tfechahora = Simple.sp_tfechahora;
      this._sp_cIMEI = Simple.sp_cIMEI;
      this._sp_rLatitud = Simple.sp_rLatitud;
      this._sp_rLongitud = Simple.sp_rLongitud;
      this._sp_rAccuracy = Simple.sp_rAccuracy;
      this._sp_iVelocidad = Simple.sp_iVelocidad;
      this._sp_iRumbo = Simple.sp_iRumbo;
      this._sp_iOdometro = Simple.sp_iOdometro;
      this._sp_iBatt = Simple.sp_iBatt;
      this._sp_iSecuencia = Simple.sp_iSecuencia;
      this._sp_reciid = Simple.sp_reciid;
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
            using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_tfechahora", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_cIMEI", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_rLatitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_rLongitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_rAccuracy", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iVelocidad", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iRumbo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iOdometro", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iBatt", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iSecuencia", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_reciid", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              SqlParameter parameter = sqlCommand.Parameters["@sp_tfechahora"];
              DateTime? spTfechahora = this._sp_tfechahora;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!spTfechahora.HasValue ? 0 : (spTfechahora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._sp_tfechahora;
              parameter.Value = obj;
              sqlCommand.Parameters["@sp_cIMEI"].Value = this._sp_cIMEI == null ? (object) DBNull.Value : (object) this._sp_cIMEI;
              sqlCommand.Parameters["@sp_rLatitud"].Value = (object) this._sp_rLatitud;
              sqlCommand.Parameters["@sp_rLongitud"].Value = (object) this._sp_rLongitud;
              sqlCommand.Parameters["@sp_rAccuracy"].Value = (object) this._sp_rAccuracy;
              sqlCommand.Parameters["@sp_iVelocidad"].Value = (object) this._sp_iVelocidad;
              sqlCommand.Parameters["@sp_iRumbo"].Value = (object) this._sp_iRumbo;
              sqlCommand.Parameters["@sp_iOdometro"].Value = (object) this._sp_iOdometro;
              sqlCommand.Parameters["@sp_iBatt"].Value = (object) this._sp_iBatt;
              sqlCommand.Parameters["@sp_iSecuencia"].Value = (object) this._sp_iSecuencia;
              sqlCommand.Parameters["@sp_reciid"].Value = (object) this._sp_reciid;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_tfechahora", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_cIMEI", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_rLatitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_rLongitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_rAccuracy", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iVelocidad", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iRumbo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iOdometro", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iBatt", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_iSecuencia", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@sp_reciid", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              SqlParameter parameter = sqlCommand.Parameters["@sp_tfechahora"];
              DateTime? spTfechahora = this._sp_tfechahora;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!spTfechahora.HasValue ? 0 : (spTfechahora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._sp_tfechahora;
              parameter.Value = obj;
              sqlCommand.Parameters["@sp_cIMEI"].Value = this._sp_cIMEI == null ? (object) DBNull.Value : (object) this._sp_cIMEI;
              sqlCommand.Parameters["@sp_rLatitud"].Value = (object) this._sp_rLatitud;
              sqlCommand.Parameters["@sp_rLongitud"].Value = (object) this._sp_rLongitud;
              sqlCommand.Parameters["@sp_rAccuracy"].Value = (object) this._sp_rAccuracy;
              sqlCommand.Parameters["@sp_iVelocidad"].Value = (object) this._sp_iVelocidad;
              sqlCommand.Parameters["@sp_iRumbo"].Value = (object) this._sp_iRumbo;
              sqlCommand.Parameters["@sp_iOdometro"].Value = (object) this._sp_iOdometro;
              sqlCommand.Parameters["@sp_iBatt"].Value = (object) this._sp_iBatt;
              sqlCommand.Parameters["@sp_iSecuencia"].Value = (object) this._sp_iSecuencia;
              sqlCommand.Parameters["@sp_reciid"].Value = (object) this._sp_reciid;
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
        throw new RuntimeException("The p_posicionesSP is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPSel", connection))
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
      Simplep_posicionesSP simplepPosicionesSp = new Simplep_posicionesSP();
      simplepPosicionesSp.Id = this.Id;
      simplepPosicionesSp.Name = this.Name;
      simplepPosicionesSp.sp_tfechahora = this._sp_tfechahora;
      simplepPosicionesSp.sp_cIMEI = this._sp_cIMEI;
      simplepPosicionesSp.sp_rLatitud = this._sp_rLatitud;
      simplepPosicionesSp.sp_rLongitud = this._sp_rLongitud;
      simplepPosicionesSp.sp_rAccuracy = this._sp_rAccuracy;
      simplepPosicionesSp.sp_iVelocidad = this._sp_iVelocidad;
      simplepPosicionesSp.sp_iRumbo = this._sp_iRumbo;
      simplepPosicionesSp.sp_iOdometro = this._sp_iOdometro;
      simplepPosicionesSp.sp_iBatt = this._sp_iBatt;
      simplepPosicionesSp.sp_iSecuencia = this._sp_iSecuencia;
      simplepPosicionesSp.sp_reciid = this._sp_reciid;
      if (this.CallerObject != null)
        simplepPosicionesSp.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplepPosicionesSp;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplep_posicionesSP simplepPosicionesSp = (Simplep_posicionesSP) BaseSimple;
      this.Id = simplepPosicionesSp.Id;
      this.Name = simplepPosicionesSp.Name;
      this._sp_tfechahora = simplepPosicionesSp.sp_tfechahora;
      this._sp_cIMEI = simplepPosicionesSp.sp_cIMEI;
      this._sp_rLatitud = simplepPosicionesSp.sp_rLatitud;
      this._sp_rLongitud = simplepPosicionesSp.sp_rLongitud;
      this._sp_rAccuracy = simplepPosicionesSp.sp_rAccuracy;
      this._sp_iVelocidad = simplepPosicionesSp.sp_iVelocidad;
      this._sp_iRumbo = simplepPosicionesSp.sp_iRumbo;
      this._sp_iOdometro = simplepPosicionesSp.sp_iOdometro;
      this._sp_iBatt = simplepPosicionesSp.sp_iBatt;
      this._sp_iSecuencia = simplepPosicionesSp.sp_iSecuencia;
      this._sp_reciid = simplepPosicionesSp.sp_reciid;
      if (simplepPosicionesSp.CallerObject != null)
        this.CallerObject = simplepPosicionesSp.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerp_posicionesSP callerpPosicionesSp = new Callerp_posicionesSP();
      callerpPosicionesSp.Id = this.Id;
      callerpPosicionesSp.Name = this.Name;
      callerpPosicionesSp.sp_tfechahora = this._sp_tfechahora;
      callerpPosicionesSp.sp_cIMEI = this._sp_cIMEI;
      callerpPosicionesSp.sp_rLatitud = this._sp_rLatitud;
      callerpPosicionesSp.sp_rLongitud = this._sp_rLongitud;
      callerpPosicionesSp.sp_rAccuracy = this._sp_rAccuracy;
      callerpPosicionesSp.sp_iVelocidad = this._sp_iVelocidad;
      callerpPosicionesSp.sp_iRumbo = this._sp_iRumbo;
      callerpPosicionesSp.sp_iOdometro = this._sp_iOdometro;
      callerpPosicionesSp.sp_iBatt = this._sp_iBatt;
      callerpPosicionesSp.sp_iSecuencia = this._sp_iSecuencia;
      callerpPosicionesSp.sp_reciid = this._sp_reciid;
      return (CallerObject) callerpPosicionesSp;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sp_tfechahora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("sp_cIMEI", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sp_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("sp_rLongitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("sp_rAccuracy", typeof (float)));
      dataTable.Columns.Add(new DataColumn("sp_iVelocidad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iRumbo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iOdometro", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iBatt", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iSecuencia", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_reciid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["sp_tfechahora"] = (object) this._sp_tfechahora;
      row["sp_cIMEI"] = (object) this._sp_cIMEI;
      row["sp_rLatitud"] = (object) this._sp_rLatitud;
      row["sp_rLongitud"] = (object) this._sp_rLongitud;
      row["sp_rAccuracy"] = (object) this._sp_rAccuracy;
      row["sp_iVelocidad"] = (object) this._sp_iVelocidad;
      row["sp_iRumbo"] = (object) this._sp_iRumbo;
      row["sp_iOdometro"] = (object) this._sp_iOdometro;
      row["sp_iBatt"] = (object) this._sp_iBatt;
      row["sp_iSecuencia"] = (object) this._sp_iSecuencia;
      row["sp_reciid"] = (object) this._sp_reciid;
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
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPByChildObject", connection))
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
              Simplep_posicionesSP simplepPosicionesSp = new Simplep_posicionesSP();
              simplepPosicionesSp.Id = sqlDataReader.GetInt32(0);
              simplepPosicionesSp.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplepPosicionesSp.sp_tfechahora = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                simplepPosicionesSp.sp_cIMEI = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplepPosicionesSp.sp_rLatitud = sqlDataReader.IsDBNull(4) ? 0.0f : (float) sqlDataReader.GetValue(4);
              if (sqlDataReader.FieldCount > 5)
                simplepPosicionesSp.sp_rLongitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                simplepPosicionesSp.sp_rAccuracy = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                simplepPosicionesSp.sp_iVelocidad = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simplepPosicionesSp.sp_iRumbo = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                simplepPosicionesSp.sp_iOdometro = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                simplepPosicionesSp.sp_iBatt = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                simplepPosicionesSp.sp_iSecuencia = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simplepPosicionesSp.sp_reciid = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              simplepPosicionesSp.CallerObject = Object.GetCallerObject();
              simplepPosicionesSp.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplepPosicionesSp);
              objectCollection.Add((SimpleBaseObject) simplepPosicionesSp);
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
        Simplep_posicionesSP simplepPosicionesSp = new Simplep_posicionesSP();
        simplepPosicionesSp.Id = (int) row["Id"];
        simplepPosicionesSp.Name = (string) row["Name"];
        simplepPosicionesSp.sp_tfechahora = row["sp_tfechahora"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["sp_tfechahora"];
        simplepPosicionesSp.sp_cIMEI = row["sp_cIMEI"] == DBNull.Value ? "" : (string) row["sp_cIMEI"];
        simplepPosicionesSp.sp_rLatitud = row["sp_rLatitud"] == DBNull.Value ? 0.0f : (float) row["sp_rLatitud"];
        simplepPosicionesSp.sp_rLongitud = row["sp_rLongitud"] == DBNull.Value ? 0.0f : (float) row["sp_rLongitud"];
        simplepPosicionesSp.sp_rAccuracy = row["sp_rAccuracy"] == DBNull.Value ? 0.0f : (float) row["sp_rAccuracy"];
        simplepPosicionesSp.sp_iVelocidad = row["sp_iVelocidad"] == DBNull.Value ? 0 : (int) row["sp_iVelocidad"];
        simplepPosicionesSp.sp_iRumbo = row["sp_iRumbo"] == DBNull.Value ? 0 : (int) row["sp_iRumbo"];
        simplepPosicionesSp.sp_iOdometro = row["sp_iOdometro"] == DBNull.Value ? 0 : (int) row["sp_iOdometro"];
        simplepPosicionesSp.sp_iBatt = row["sp_iBatt"] == DBNull.Value ? 0 : (int) row["sp_iBatt"];
        simplepPosicionesSp.sp_iSecuencia = row["sp_iSecuencia"] == DBNull.Value ? 0 : (int) row["sp_iSecuencia"];
        simplepPosicionesSp.sp_reciid = row["sp_reciid"] == DBNull.Value ? 0 : (int) row["sp_reciid"];
        simplepPosicionesSp.CallerObject = Object.GetCallerObject();
        simplepPosicionesSp.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplepPosicionesSp);
        if (Recursive)
          simplepPosicionesSp.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplepPosicionesSp, Recursive);
        objectCollection.Add((SimpleBaseObject) simplepPosicionesSp);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPByParentObject", connection))
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
              Simplep_posicionesSP simplepPosicionesSp = new Simplep_posicionesSP();
              simplepPosicionesSp.Id = sqlDataReader.GetInt32(0);
              simplepPosicionesSp.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplepPosicionesSp.sp_tfechahora = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                simplepPosicionesSp.sp_cIMEI = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplepPosicionesSp.sp_rLatitud = sqlDataReader.IsDBNull(4) ? 0.0f : (float) sqlDataReader.GetValue(4);
              if (sqlDataReader.FieldCount > 5)
                simplepPosicionesSp.sp_rLongitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                simplepPosicionesSp.sp_rAccuracy = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                simplepPosicionesSp.sp_iVelocidad = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simplepPosicionesSp.sp_iRumbo = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                simplepPosicionesSp.sp_iOdometro = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                simplepPosicionesSp.sp_iBatt = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                simplepPosicionesSp.sp_iSecuencia = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simplepPosicionesSp.sp_reciid = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              simplepPosicionesSp.CallerObject = Object.GetCallerObject();
              simplepPosicionesSp.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplepPosicionesSp);
              objectCollection.Add((SimpleBaseObject) simplepPosicionesSp);
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
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplep_posicionesSP Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("p_posicionesSPBySimplep_posicionesSP", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@sp_tfechahora", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@sp_cIMEI", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@sp_rLatitud", SqlDbType.Real));
            selectCommand.Parameters.Add(new SqlParameter("@sp_rLongitud", SqlDbType.Real));
            selectCommand.Parameters.Add(new SqlParameter("@sp_rAccuracy", SqlDbType.Real));
            selectCommand.Parameters.Add(new SqlParameter("@sp_iVelocidad", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@sp_iRumbo", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@sp_iOdometro", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@sp_iBatt", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@sp_iSecuencia", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@sp_reciid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            SqlParameter parameter = selectCommand.Parameters["@sp_tfechahora"];
            DateTime? spTfechahora = this._sp_tfechahora;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!spTfechahora.HasValue ? 0 : (spTfechahora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._sp_tfechahora;
            parameter.Value = obj;
            selectCommand.Parameters["@sp_cIMEI"].Value = this._sp_cIMEI == null ? (object) DBNull.Value : (object) this._sp_cIMEI;
            selectCommand.Parameters["@sp_rLatitud"].Value = (object) this._sp_rLatitud;
            selectCommand.Parameters["@sp_rLongitud"].Value = (object) this._sp_rLongitud;
            selectCommand.Parameters["@sp_rAccuracy"].Value = (object) this._sp_rAccuracy;
            selectCommand.Parameters["@sp_iVelocidad"].Value = (object) this._sp_iVelocidad;
            selectCommand.Parameters["@sp_iRumbo"].Value = (object) this._sp_iRumbo;
            selectCommand.Parameters["@sp_iOdometro"].Value = (object) this._sp_iOdometro;
            selectCommand.Parameters["@sp_iBatt"].Value = (object) this._sp_iBatt;
            selectCommand.Parameters["@sp_iSecuencia"].Value = (object) this._sp_iSecuencia;
            selectCommand.Parameters["@sp_reciid"].Value = (object) this._sp_reciid;
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

    public IEnumerable<Simplep_posicionesSP> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplep_posicionesSP Simple = new Simplep_posicionesSP();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.sp_tfechahora = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                Simple.sp_cIMEI = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.sp_rLatitud = sqlDataReader.IsDBNull(4) ? 0.0f : (float) sqlDataReader.GetValue(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.sp_rLongitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.sp_rAccuracy = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.sp_iVelocidad = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.sp_iRumbo = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.sp_iOdometro = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.sp_iBatt = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.sp_iSecuencia = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.sp_reciid = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplep_posicionesSP> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("p_posicionesSPByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplep_posicionesSP Simple = new Simplep_posicionesSP();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.sp_tfechahora = new DateTime?(sqlDataReader.IsDBNull(2) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(2));
              if (sqlDataReader.FieldCount > 3)
                Simple.sp_cIMEI = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.sp_rLatitud = sqlDataReader.IsDBNull(4) ? 0.0f : (float) sqlDataReader.GetValue(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.sp_rLongitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.sp_rAccuracy = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.sp_iVelocidad = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.sp_iRumbo = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.sp_iOdometro = sqlDataReader.IsDBNull(9) ? 0 : sqlDataReader.GetInt32(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.sp_iBatt = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.sp_iSecuencia = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.sp_reciid = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3105, "p_posicionesSP");
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
          this._sp_tfechahora = new DateTime?(Reader.IsDBNull(2) ? new DateTime(1, 1, 1) : Reader.GetDateTime(2));
        if (Reader.FieldCount > 3)
          this._sp_cIMEI = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._sp_rLatitud = Reader.IsDBNull(4) ? 0.0f : (float) Reader.GetValue(4);
        if (Reader.FieldCount > 5)
          this._sp_rLongitud = Reader.IsDBNull(5) ? 0.0f : (float) Reader.GetValue(5);
        if (Reader.FieldCount > 6)
          this._sp_rAccuracy = Reader.IsDBNull(6) ? 0.0f : (float) Reader.GetValue(6);
        if (Reader.FieldCount > 7)
          this._sp_iVelocidad = Reader.IsDBNull(7) ? 0 : Reader.GetInt32(7);
        if (Reader.FieldCount > 8)
          this._sp_iRumbo = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
        if (Reader.FieldCount > 9)
          this._sp_iOdometro = Reader.IsDBNull(9) ? 0 : Reader.GetInt32(9);
        if (Reader.FieldCount > 10)
          this._sp_iBatt = Reader.IsDBNull(10) ? 0 : Reader.GetInt32(10);
        if (Reader.FieldCount > 11)
          this._sp_iSecuencia = Reader.IsDBNull(11) ? 0 : Reader.GetInt32(11);
        if (Reader.FieldCount > 12)
          this._sp_reciid = Reader.IsDBNull(12) ? 0 : Reader.GetInt32(12);
      }
      Reader.Close();
    }
  }
}
