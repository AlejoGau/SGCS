// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalHorarioTolerancia
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
  public class DalHorarioTolerancia : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _tol_iidcuenta;
    private int _tol_naperturaantes;
    private string _tol_caperturaantesalarma;
    private int _tol_naperturadespues;
    private string _tol_caperturadespuesalarma;
    private int _tol_ncierreantes;
    private string _tol_ccierreantesalarma;
    private int _tol_ncierredespues;
    private string _tol_ccierredespuesalarma;
    private Decimal _tol_nnyo;
    private Decimal _tol_nnyc;
    private Decimal _tol_nControl;
    private Decimal _tol_nModo;
    private Decimal _tol_nAPNYO;
    private Decimal _tol_nAPNYC;
    private DateTime? _tol_dVacacionesHasta;
    private DateTime? _tol_dVacacionesDesde;

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

    public int tol_iidcuenta
    {
      get
      {
        return this._tol_iidcuenta;
      }
      set
      {
        this._tol_iidcuenta = value;
      }
    }

    public int tol_naperturaantes
    {
      get
      {
        return this._tol_naperturaantes;
      }
      set
      {
        this._tol_naperturaantes = value;
      }
    }

    public string tol_caperturaantesalarma
    {
      get
      {
        return this._tol_caperturaantesalarma;
      }
      set
      {
        this._tol_caperturaantesalarma = value;
      }
    }

    public int tol_naperturadespues
    {
      get
      {
        return this._tol_naperturadespues;
      }
      set
      {
        this._tol_naperturadespues = value;
      }
    }

    public string tol_caperturadespuesalarma
    {
      get
      {
        return this._tol_caperturadespuesalarma;
      }
      set
      {
        this._tol_caperturadespuesalarma = value;
      }
    }

    public int tol_ncierreantes
    {
      get
      {
        return this._tol_ncierreantes;
      }
      set
      {
        this._tol_ncierreantes = value;
      }
    }

    public string tol_ccierreantesalarma
    {
      get
      {
        return this._tol_ccierreantesalarma;
      }
      set
      {
        this._tol_ccierreantesalarma = value;
      }
    }

    public int tol_ncierredespues
    {
      get
      {
        return this._tol_ncierredespues;
      }
      set
      {
        this._tol_ncierredespues = value;
      }
    }

    public string tol_ccierredespuesalarma
    {
      get
      {
        return this._tol_ccierredespuesalarma;
      }
      set
      {
        this._tol_ccierredespuesalarma = value;
      }
    }

    public Decimal tol_nnyo
    {
      get
      {
        return this._tol_nnyo;
      }
      set
      {
        this._tol_nnyo = value;
      }
    }

    public Decimal tol_nnyc
    {
      get
      {
        return this._tol_nnyc;
      }
      set
      {
        this._tol_nnyc = value;
      }
    }

    public Decimal tol_nControl
    {
      get
      {
        return this._tol_nControl;
      }
      set
      {
        this._tol_nControl = value;
      }
    }

    public Decimal tol_nModo
    {
      get
      {
        return this._tol_nModo;
      }
      set
      {
        this._tol_nModo = value;
      }
    }

    public Decimal tol_nAPNYO
    {
      get
      {
        return this._tol_nAPNYO;
      }
      set
      {
        this._tol_nAPNYO = value;
      }
    }

    public Decimal tol_nAPNYC
    {
      get
      {
        return this._tol_nAPNYC;
      }
      set
      {
        this._tol_nAPNYC = value;
      }
    }

    public DateTime? tol_dVacacionesHasta
    {
      get
      {
        return this._tol_dVacacionesHasta;
      }
      set
      {
        this._tol_dVacacionesHasta = value;
      }
    }

    public DateTime? tol_dVacacionesDesde
    {
      get
      {
        return this._tol_dVacacionesDesde;
      }
      set
      {
        this._tol_dVacacionesDesde = value;
      }
    }

    public DalHorarioTolerancia(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalHorarioTolerancia(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalHorarioTolerancia(SqlHelper SqlConfig, int UserId, SimpleHorarioTolerancia Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tol_iidcuenta = Simple.tol_iidcuenta;
      this._tol_naperturaantes = Simple.tol_naperturaantes;
      this._tol_caperturaantesalarma = Simple.tol_caperturaantesalarma;
      this._tol_naperturadespues = Simple.tol_naperturadespues;
      this._tol_caperturadespuesalarma = Simple.tol_caperturadespuesalarma;
      this._tol_ncierreantes = Simple.tol_ncierreantes;
      this._tol_ccierreantesalarma = Simple.tol_ccierreantesalarma;
      this._tol_ncierredespues = Simple.tol_ncierredespues;
      this._tol_ccierredespuesalarma = Simple.tol_ccierredespuesalarma;
      this._tol_nnyo = Simple.tol_nnyo;
      this._tol_nnyc = Simple.tol_nnyc;
      this._tol_nControl = Simple.tol_nControl;
      this._tol_nModo = Simple.tol_nModo;
      this._tol_nAPNYO = Simple.tol_nAPNYO;
      this._tol_nAPNYC = Simple.tol_nAPNYC;
      this._tol_dVacacionesHasta = Simple.tol_dVacacionesHasta;
      this._tol_dVacacionesDesde = Simple.tol_dVacacionesDesde;
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
            using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_iidcuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_naperturaantes", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_caperturaantesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_naperturadespues", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_caperturadespuesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ncierreantes", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ccierreantesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ncierredespues", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ccierredespuesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nnyo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nnyc", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nControl", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nModo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nAPNYO", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nAPNYC", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_dVacacionesHasta", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_dVacacionesDesde", SqlDbType.DateTime));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tol_iidcuenta"].Value = (object) this._tol_iidcuenta;
              sqlCommand.Parameters["@tol_naperturaantes"].Value = (object) this._tol_naperturaantes;
              sqlCommand.Parameters["@tol_caperturaantesalarma"].Value = this._tol_caperturaantesalarma == null ? (object) DBNull.Value : (object) this._tol_caperturaantesalarma;
              sqlCommand.Parameters["@tol_naperturadespues"].Value = (object) this._tol_naperturadespues;
              sqlCommand.Parameters["@tol_caperturadespuesalarma"].Value = this._tol_caperturadespuesalarma == null ? (object) DBNull.Value : (object) this._tol_caperturadespuesalarma;
              sqlCommand.Parameters["@tol_ncierreantes"].Value = (object) this._tol_ncierreantes;
              sqlCommand.Parameters["@tol_ccierreantesalarma"].Value = this._tol_ccierreantesalarma == null ? (object) DBNull.Value : (object) this._tol_ccierreantesalarma;
              sqlCommand.Parameters["@tol_ncierredespues"].Value = (object) this._tol_ncierredespues;
              sqlCommand.Parameters["@tol_ccierredespuesalarma"].Value = this._tol_ccierredespuesalarma == null ? (object) DBNull.Value : (object) this._tol_ccierredespuesalarma;
              sqlCommand.Parameters["@tol_nnyo"].Value = (object) this._tol_nnyo;
              sqlCommand.Parameters["@tol_nnyc"].Value = (object) this._tol_nnyc;
              sqlCommand.Parameters["@tol_nControl"].Value = (object) this._tol_nControl;
              sqlCommand.Parameters["@tol_nModo"].Value = (object) this._tol_nModo;
              sqlCommand.Parameters["@tol_nAPNYO"].Value = (object) this._tol_nAPNYO;
              sqlCommand.Parameters["@tol_nAPNYC"].Value = (object) this._tol_nAPNYC;
              SqlParameter parameter1 = sqlCommand.Parameters["@tol_dVacacionesHasta"];
              DateTime? nullable = this._tol_dVacacionesHasta;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._tol_dVacacionesHasta;
              parameter1.Value = obj1;
              SqlParameter parameter2 = sqlCommand.Parameters["@tol_dVacacionesDesde"];
              nullable = this._tol_dVacacionesDesde;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._tol_dVacacionesDesde;
              parameter2.Value = obj2;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_iidcuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_naperturaantes", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_caperturaantesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_naperturadespues", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_caperturadespuesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ncierreantes", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ccierreantesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ncierredespues", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_ccierredespuesalarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nnyo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nnyc", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nControl", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nModo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nAPNYO", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_nAPNYC", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_dVacacionesHasta", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_dVacacionesDesde", SqlDbType.DateTime));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tol_iidcuenta"].Value = (object) this._tol_iidcuenta;
              sqlCommand.Parameters["@tol_naperturaantes"].Value = (object) this._tol_naperturaantes;
              sqlCommand.Parameters["@tol_caperturaantesalarma"].Value = this._tol_caperturaantesalarma == null ? (object) DBNull.Value : (object) this._tol_caperturaantesalarma;
              sqlCommand.Parameters["@tol_naperturadespues"].Value = (object) this._tol_naperturadespues;
              sqlCommand.Parameters["@tol_caperturadespuesalarma"].Value = this._tol_caperturadespuesalarma == null ? (object) DBNull.Value : (object) this._tol_caperturadespuesalarma;
              sqlCommand.Parameters["@tol_ncierreantes"].Value = (object) this._tol_ncierreantes;
              sqlCommand.Parameters["@tol_ccierreantesalarma"].Value = this._tol_ccierreantesalarma == null ? (object) DBNull.Value : (object) this._tol_ccierreantesalarma;
              sqlCommand.Parameters["@tol_ncierredespues"].Value = (object) this._tol_ncierredespues;
              sqlCommand.Parameters["@tol_ccierredespuesalarma"].Value = this._tol_ccierredespuesalarma == null ? (object) DBNull.Value : (object) this._tol_ccierredespuesalarma;
              sqlCommand.Parameters["@tol_nnyo"].Value = (object) this._tol_nnyo;
              sqlCommand.Parameters["@tol_nnyc"].Value = (object) this._tol_nnyc;
              sqlCommand.Parameters["@tol_nControl"].Value = (object) this._tol_nControl;
              sqlCommand.Parameters["@tol_nModo"].Value = (object) this._tol_nModo;
              sqlCommand.Parameters["@tol_nAPNYO"].Value = (object) this._tol_nAPNYO;
              sqlCommand.Parameters["@tol_nAPNYC"].Value = (object) this._tol_nAPNYC;
              SqlParameter parameter1 = sqlCommand.Parameters["@tol_dVacacionesHasta"];
              DateTime? nullable = this._tol_dVacacionesHasta;
              DateTime dateTime1 = new DateTime(1, 1, 1);
              object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._tol_dVacacionesHasta;
              parameter1.Value = obj1;
              SqlParameter parameter2 = sqlCommand.Parameters["@tol_dVacacionesDesde"];
              nullable = this._tol_dVacacionesDesde;
              DateTime dateTime2 = new DateTime(1, 1, 1);
              object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._tol_dVacacionesDesde;
              parameter2.Value = obj2;
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
        throw new RuntimeException("The HorarioTolerancia is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaSel", connection))
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
      SimpleHorarioTolerancia horarioTolerancia = new SimpleHorarioTolerancia();
      horarioTolerancia.Id = this.Id;
      horarioTolerancia.Name = this.Name;
      horarioTolerancia.tol_iidcuenta = this._tol_iidcuenta;
      horarioTolerancia.tol_naperturaantes = this._tol_naperturaantes;
      horarioTolerancia.tol_caperturaantesalarma = this._tol_caperturaantesalarma;
      horarioTolerancia.tol_naperturadespues = this._tol_naperturadespues;
      horarioTolerancia.tol_caperturadespuesalarma = this._tol_caperturadespuesalarma;
      horarioTolerancia.tol_ncierreantes = this._tol_ncierreantes;
      horarioTolerancia.tol_ccierreantesalarma = this._tol_ccierreantesalarma;
      horarioTolerancia.tol_ncierredespues = this._tol_ncierredespues;
      horarioTolerancia.tol_ccierredespuesalarma = this._tol_ccierredespuesalarma;
      horarioTolerancia.tol_nnyo = this._tol_nnyo;
      horarioTolerancia.tol_nnyc = this._tol_nnyc;
      horarioTolerancia.tol_nControl = this._tol_nControl;
      horarioTolerancia.tol_nModo = this._tol_nModo;
      horarioTolerancia.tol_nAPNYO = this._tol_nAPNYO;
      horarioTolerancia.tol_nAPNYC = this._tol_nAPNYC;
      horarioTolerancia.tol_dVacacionesHasta = this._tol_dVacacionesHasta;
      horarioTolerancia.tol_dVacacionesDesde = this._tol_dVacacionesDesde;
      if (this.CallerObject != null)
        horarioTolerancia.CallerObject = this.CallerObject;
      return (SimpleBaseObject) horarioTolerancia;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleHorarioTolerancia horarioTolerancia = (SimpleHorarioTolerancia) BaseSimple;
      this.Id = horarioTolerancia.Id;
      this.Name = horarioTolerancia.Name;
      this._tol_iidcuenta = horarioTolerancia.tol_iidcuenta;
      this._tol_naperturaantes = horarioTolerancia.tol_naperturaantes;
      this._tol_caperturaantesalarma = horarioTolerancia.tol_caperturaantesalarma;
      this._tol_naperturadespues = horarioTolerancia.tol_naperturadespues;
      this._tol_caperturadespuesalarma = horarioTolerancia.tol_caperturadespuesalarma;
      this._tol_ncierreantes = horarioTolerancia.tol_ncierreantes;
      this._tol_ccierreantesalarma = horarioTolerancia.tol_ccierreantesalarma;
      this._tol_ncierredespues = horarioTolerancia.tol_ncierredespues;
      this._tol_ccierredespuesalarma = horarioTolerancia.tol_ccierredespuesalarma;
      this._tol_nnyo = horarioTolerancia.tol_nnyo;
      this._tol_nnyc = horarioTolerancia.tol_nnyc;
      this._tol_nControl = horarioTolerancia.tol_nControl;
      this._tol_nModo = horarioTolerancia.tol_nModo;
      this._tol_nAPNYO = horarioTolerancia.tol_nAPNYO;
      this._tol_nAPNYC = horarioTolerancia.tol_nAPNYC;
      this._tol_dVacacionesHasta = horarioTolerancia.tol_dVacacionesHasta;
      this._tol_dVacacionesDesde = horarioTolerancia.tol_dVacacionesDesde;
      if (horarioTolerancia.CallerObject != null)
        this.CallerObject = horarioTolerancia.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioTolerancia horarioTolerancia = new CallerHorarioTolerancia();
      horarioTolerancia.Id = this.Id;
      horarioTolerancia.Name = this.Name;
      horarioTolerancia.tol_iidcuenta = this._tol_iidcuenta;
      horarioTolerancia.tol_naperturaantes = this._tol_naperturaantes;
      horarioTolerancia.tol_caperturaantesalarma = this._tol_caperturaantesalarma;
      horarioTolerancia.tol_naperturadespues = this._tol_naperturadespues;
      horarioTolerancia.tol_caperturadespuesalarma = this._tol_caperturadespuesalarma;
      horarioTolerancia.tol_ncierreantes = this._tol_ncierreantes;
      horarioTolerancia.tol_ccierreantesalarma = this._tol_ccierreantesalarma;
      horarioTolerancia.tol_ncierredespues = this._tol_ncierredespues;
      horarioTolerancia.tol_ccierredespuesalarma = this._tol_ccierredespuesalarma;
      horarioTolerancia.tol_nnyo = this._tol_nnyo;
      horarioTolerancia.tol_nnyc = this._tol_nnyc;
      horarioTolerancia.tol_nControl = this._tol_nControl;
      horarioTolerancia.tol_nModo = this._tol_nModo;
      horarioTolerancia.tol_nAPNYO = this._tol_nAPNYO;
      horarioTolerancia.tol_nAPNYC = this._tol_nAPNYC;
      horarioTolerancia.tol_dVacacionesHasta = this._tol_dVacacionesHasta;
      horarioTolerancia.tol_dVacacionesDesde = this._tol_dVacacionesDesde;
      return (CallerObject) horarioTolerancia;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_naperturaantes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_caperturaantesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_naperturadespues", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_caperturadespuesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_ncierreantes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_ccierreantesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_ncierredespues", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_ccierredespuesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_nnyo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nnyc", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nControl", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nModo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nAPNYO", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nAPNYC", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_dVacacionesHasta", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("tol_dVacacionesDesde", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tol_iidcuenta"] = (object) this._tol_iidcuenta;
      row["tol_naperturaantes"] = (object) this._tol_naperturaantes;
      row["tol_caperturaantesalarma"] = (object) this._tol_caperturaantesalarma;
      row["tol_naperturadespues"] = (object) this._tol_naperturadespues;
      row["tol_caperturadespuesalarma"] = (object) this._tol_caperturadespuesalarma;
      row["tol_ncierreantes"] = (object) this._tol_ncierreantes;
      row["tol_ccierreantesalarma"] = (object) this._tol_ccierreantesalarma;
      row["tol_ncierredespues"] = (object) this._tol_ncierredespues;
      row["tol_ccierredespuesalarma"] = (object) this._tol_ccierredespuesalarma;
      row["tol_nnyo"] = (object) this._tol_nnyo;
      row["tol_nnyc"] = (object) this._tol_nnyc;
      row["tol_nControl"] = (object) this._tol_nControl;
      row["tol_nModo"] = (object) this._tol_nModo;
      row["tol_nAPNYO"] = (object) this._tol_nAPNYO;
      row["tol_nAPNYC"] = (object) this._tol_nAPNYC;
      row["tol_dVacacionesHasta"] = (object) this._tol_dVacacionesHasta;
      row["tol_dVacacionesDesde"] = (object) this._tol_dVacacionesDesde;
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaByChildObject", connection))
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
              SimpleHorarioTolerancia horarioTolerancia = new SimpleHorarioTolerancia();
              horarioTolerancia.Id = sqlDataReader.GetInt32(0);
              horarioTolerancia.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                horarioTolerancia.tol_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                horarioTolerancia.tol_naperturaantes = sqlDataReader.IsDBNull(3) ? 0 : (int) sqlDataReader.GetInt16(3);
              if (sqlDataReader.FieldCount > 4)
                horarioTolerancia.tol_caperturaantesalarma = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                horarioTolerancia.tol_naperturadespues = sqlDataReader.IsDBNull(5) ? 0 : (int) sqlDataReader.GetInt16(5);
              if (sqlDataReader.FieldCount > 6)
                horarioTolerancia.tol_caperturadespuesalarma = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                horarioTolerancia.tol_ncierreantes = sqlDataReader.IsDBNull(7) ? 0 : (int) sqlDataReader.GetInt16(7);
              if (sqlDataReader.FieldCount > 8)
                horarioTolerancia.tol_ccierreantesalarma = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                horarioTolerancia.tol_ncierredespues = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                horarioTolerancia.tol_ccierredespuesalarma = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                horarioTolerancia.tol_nnyo = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                horarioTolerancia.tol_nnyc = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                horarioTolerancia.tol_nControl = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                horarioTolerancia.tol_nModo = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                horarioTolerancia.tol_nAPNYO = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                horarioTolerancia.tol_nAPNYC = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                horarioTolerancia.tol_dVacacionesHasta = new DateTime?(sqlDataReader.IsDBNull(17) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(17));
              if (sqlDataReader.FieldCount > 18)
                horarioTolerancia.tol_dVacacionesDesde = new DateTime?(sqlDataReader.IsDBNull(18) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(18));
              horarioTolerancia.CallerObject = Object.GetCallerObject();
              horarioTolerancia.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) horarioTolerancia);
              objectCollection.Add((SimpleBaseObject) horarioTolerancia);
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
        SimpleHorarioTolerancia horarioTolerancia = new SimpleHorarioTolerancia();
        horarioTolerancia.Id = (int) row["Id"];
        horarioTolerancia.Name = (string) row["Name"];
        horarioTolerancia.tol_iidcuenta = row["tol_iidcuenta"] == DBNull.Value ? 0 : (int) row["tol_iidcuenta"];
        horarioTolerancia.tol_naperturaantes = row["tol_naperturaantes"] == DBNull.Value ? 0 : (int) row["tol_naperturaantes"];
        horarioTolerancia.tol_caperturaantesalarma = row["tol_caperturaantesalarma"] == DBNull.Value ? "" : (string) row["tol_caperturaantesalarma"];
        horarioTolerancia.tol_naperturadespues = row["tol_naperturadespues"] == DBNull.Value ? 0 : (int) row["tol_naperturadespues"];
        horarioTolerancia.tol_caperturadespuesalarma = row["tol_caperturadespuesalarma"] == DBNull.Value ? "" : (string) row["tol_caperturadespuesalarma"];
        horarioTolerancia.tol_ncierreantes = row["tol_ncierreantes"] == DBNull.Value ? 0 : (int) row["tol_ncierreantes"];
        horarioTolerancia.tol_ccierreantesalarma = row["tol_ccierreantesalarma"] == DBNull.Value ? "" : (string) row["tol_ccierreantesalarma"];
        horarioTolerancia.tol_ncierredespues = row["tol_ncierredespues"] == DBNull.Value ? 0 : (int) row["tol_ncierredespues"];
        horarioTolerancia.tol_ccierredespuesalarma = row["tol_ccierredespuesalarma"] == DBNull.Value ? "" : (string) row["tol_ccierredespuesalarma"];
        horarioTolerancia.tol_nnyo = row["tol_nnyo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nnyo"];
        horarioTolerancia.tol_nnyc = row["tol_nnyc"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nnyc"];
        horarioTolerancia.tol_nControl = row["tol_nControl"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nControl"];
        horarioTolerancia.tol_nModo = row["tol_nModo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nModo"];
        horarioTolerancia.tol_nAPNYO = row["tol_nAPNYO"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nAPNYO"];
        horarioTolerancia.tol_nAPNYC = row["tol_nAPNYC"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nAPNYC"];
        horarioTolerancia.tol_dVacacionesHasta = row["tol_dVacacionesHasta"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["tol_dVacacionesHasta"];
        horarioTolerancia.tol_dVacacionesDesde = row["tol_dVacacionesDesde"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["tol_dVacacionesDesde"];
        horarioTolerancia.CallerObject = Object.GetCallerObject();
        horarioTolerancia.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) horarioTolerancia);
        if (Recursive)
          horarioTolerancia.Dependencies = this.GetChildsByObject((SimpleBaseObject) horarioTolerancia, Recursive);
        objectCollection.Add((SimpleBaseObject) horarioTolerancia);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaByParentObject", connection))
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
              SimpleHorarioTolerancia horarioTolerancia = new SimpleHorarioTolerancia();
              horarioTolerancia.Id = sqlDataReader.GetInt32(0);
              horarioTolerancia.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                horarioTolerancia.tol_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                horarioTolerancia.tol_naperturaantes = sqlDataReader.IsDBNull(3) ? 0 : (int) sqlDataReader.GetInt16(3);
              if (sqlDataReader.FieldCount > 4)
                horarioTolerancia.tol_caperturaantesalarma = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                horarioTolerancia.tol_naperturadespues = sqlDataReader.IsDBNull(5) ? 0 : (int) sqlDataReader.GetInt16(5);
              if (sqlDataReader.FieldCount > 6)
                horarioTolerancia.tol_caperturadespuesalarma = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                horarioTolerancia.tol_ncierreantes = sqlDataReader.IsDBNull(7) ? 0 : (int) sqlDataReader.GetInt16(7);
              if (sqlDataReader.FieldCount > 8)
                horarioTolerancia.tol_ccierreantesalarma = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                horarioTolerancia.tol_ncierredespues = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                horarioTolerancia.tol_ccierredespuesalarma = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                horarioTolerancia.tol_nnyo = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                horarioTolerancia.tol_nnyc = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                horarioTolerancia.tol_nControl = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                horarioTolerancia.tol_nModo = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                horarioTolerancia.tol_nAPNYO = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                horarioTolerancia.tol_nAPNYC = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                horarioTolerancia.tol_dVacacionesHasta = new DateTime?(sqlDataReader.IsDBNull(17) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(17));
              if (sqlDataReader.FieldCount > 18)
                horarioTolerancia.tol_dVacacionesDesde = new DateTime?(sqlDataReader.IsDBNull(18) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(18));
              horarioTolerancia.CallerObject = Object.GetCallerObject();
              horarioTolerancia.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) horarioTolerancia);
              objectCollection.Add((SimpleBaseObject) horarioTolerancia);
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleHorarioTolerancia Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaBySimpleHorarioTolerancia", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tol_iidcuenta", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@tol_naperturaantes", SqlDbType.SmallInt));
            selectCommand.Parameters.Add(new SqlParameter("@tol_caperturaantesalarma", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tol_naperturadespues", SqlDbType.SmallInt));
            selectCommand.Parameters.Add(new SqlParameter("@tol_caperturadespuesalarma", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tol_ncierreantes", SqlDbType.SmallInt));
            selectCommand.Parameters.Add(new SqlParameter("@tol_ccierreantesalarma", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tol_ncierredespues", SqlDbType.SmallInt));
            selectCommand.Parameters.Add(new SqlParameter("@tol_ccierredespuesalarma", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tol_nnyo", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tol_nnyc", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tol_nControl", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tol_nModo", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tol_nAPNYO", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tol_nAPNYC", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tol_dVacacionesHasta", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@tol_dVacacionesDesde", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@tol_iidcuenta"].Value = (object) this._tol_iidcuenta;
            selectCommand.Parameters["@tol_naperturaantes"].Value = (object) this._tol_naperturaantes;
            selectCommand.Parameters["@tol_caperturaantesalarma"].Value = this._tol_caperturaantesalarma == null ? (object) DBNull.Value : (object) this._tol_caperturaantesalarma;
            selectCommand.Parameters["@tol_naperturadespues"].Value = (object) this._tol_naperturadespues;
            selectCommand.Parameters["@tol_caperturadespuesalarma"].Value = this._tol_caperturadespuesalarma == null ? (object) DBNull.Value : (object) this._tol_caperturadespuesalarma;
            selectCommand.Parameters["@tol_ncierreantes"].Value = (object) this._tol_ncierreantes;
            selectCommand.Parameters["@tol_ccierreantesalarma"].Value = this._tol_ccierreantesalarma == null ? (object) DBNull.Value : (object) this._tol_ccierreantesalarma;
            selectCommand.Parameters["@tol_ncierredespues"].Value = (object) this._tol_ncierredespues;
            selectCommand.Parameters["@tol_ccierredespuesalarma"].Value = this._tol_ccierredespuesalarma == null ? (object) DBNull.Value : (object) this._tol_ccierredespuesalarma;
            selectCommand.Parameters["@tol_nnyo"].Value = (object) this._tol_nnyo;
            selectCommand.Parameters["@tol_nnyc"].Value = (object) this._tol_nnyc;
            selectCommand.Parameters["@tol_nControl"].Value = (object) this._tol_nControl;
            selectCommand.Parameters["@tol_nModo"].Value = (object) this._tol_nModo;
            selectCommand.Parameters["@tol_nAPNYO"].Value = (object) this._tol_nAPNYO;
            selectCommand.Parameters["@tol_nAPNYC"].Value = (object) this._tol_nAPNYC;
            SqlParameter parameter1 = selectCommand.Parameters["@tol_dVacacionesHasta"];
            DateTime? nullable = this._tol_dVacacionesHasta;
            DateTime dateTime1 = new DateTime(1, 1, 1);
            object obj1 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime1 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._tol_dVacacionesHasta;
            parameter1.Value = obj1;
            SqlParameter parameter2 = selectCommand.Parameters["@tol_dVacacionesDesde"];
            nullable = this._tol_dVacacionesDesde;
            DateTime dateTime2 = new DateTime(1, 1, 1);
            object obj2 = (!nullable.HasValue ? 0 : (nullable.GetValueOrDefault() == dateTime2 ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._tol_dVacacionesDesde;
            parameter2.Value = obj2;
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

    public IEnumerable<SimpleHorarioTolerancia> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHorarioTolerancia Simple = new SimpleHorarioTolerancia();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tol_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tol_naperturaantes = sqlDataReader.IsDBNull(3) ? 0 : (int) sqlDataReader.GetInt16(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tol_caperturaantesalarma = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tol_naperturadespues = sqlDataReader.IsDBNull(5) ? 0 : (int) sqlDataReader.GetInt16(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tol_caperturadespuesalarma = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tol_ncierreantes = sqlDataReader.IsDBNull(7) ? 0 : (int) sqlDataReader.GetInt16(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tol_ccierreantesalarma = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tol_ncierredespues = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.tol_ccierredespuesalarma = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.tol_nnyo = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.tol_nnyc = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.tol_nControl = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.tol_nModo = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.tol_nAPNYO = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                Simple.tol_nAPNYC = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                Simple.tol_dVacacionesHasta = new DateTime?(sqlDataReader.IsDBNull(17) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(17));
              if (sqlDataReader.FieldCount > 18)
                Simple.tol_dVacacionesDesde = new DateTime?(sqlDataReader.IsDBNull(18) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(18));
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleHorarioTolerancia> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHorarioTolerancia Simple = new SimpleHorarioTolerancia();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tol_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tol_naperturaantes = sqlDataReader.IsDBNull(3) ? 0 : (int) sqlDataReader.GetInt16(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tol_caperturaantesalarma = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tol_naperturadespues = sqlDataReader.IsDBNull(5) ? 0 : (int) sqlDataReader.GetInt16(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tol_caperturadespuesalarma = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tol_ncierreantes = sqlDataReader.IsDBNull(7) ? 0 : (int) sqlDataReader.GetInt16(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tol_ccierreantesalarma = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tol_ncierredespues = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.tol_ccierredespuesalarma = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.tol_nnyo = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.tol_nnyc = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.tol_nControl = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.tol_nModo = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.tol_nAPNYO = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                Simple.tol_nAPNYC = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                Simple.tol_dVacacionesHasta = new DateTime?(sqlDataReader.IsDBNull(17) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(17));
              if (sqlDataReader.FieldCount > 18)
                Simple.tol_dVacacionesDesde = new DateTime?(sqlDataReader.IsDBNull(18) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(18));
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3008, "HorarioTolerancia");
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
          this._tol_iidcuenta = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._tol_naperturaantes = Reader.IsDBNull(3) ? 0 : (int) Reader.GetInt16(3);
        if (Reader.FieldCount > 4)
          this._tol_caperturaantesalarma = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._tol_naperturadespues = Reader.IsDBNull(5) ? 0 : (int) Reader.GetInt16(5);
        if (Reader.FieldCount > 6)
          this._tol_caperturadespuesalarma = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._tol_ncierreantes = Reader.IsDBNull(7) ? 0 : (int) Reader.GetInt16(7);
        if (Reader.FieldCount > 8)
          this._tol_ccierreantesalarma = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._tol_ncierredespues = Reader.IsDBNull(9) ? 0 : (int) Reader.GetInt16(9);
        if (Reader.FieldCount > 10)
          this._tol_ccierredespuesalarma = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
        if (Reader.FieldCount > 11)
          this._tol_nnyo = Reader.IsDBNull(11) ? new Decimal(0) : Reader.GetDecimal(11);
        if (Reader.FieldCount > 12)
          this._tol_nnyc = Reader.IsDBNull(12) ? new Decimal(0) : Reader.GetDecimal(12);
        if (Reader.FieldCount > 13)
          this._tol_nControl = Reader.IsDBNull(13) ? new Decimal(0) : Reader.GetDecimal(13);
        if (Reader.FieldCount > 14)
          this._tol_nModo = Reader.IsDBNull(14) ? new Decimal(0) : Reader.GetDecimal(14);
        if (Reader.FieldCount > 15)
          this._tol_nAPNYO = Reader.IsDBNull(15) ? new Decimal(0) : Reader.GetDecimal(15);
        if (Reader.FieldCount > 16)
          this._tol_nAPNYC = Reader.IsDBNull(16) ? new Decimal(0) : Reader.GetDecimal(16);
        if (Reader.FieldCount > 17)
          this._tol_dVacacionesHasta = new DateTime?(Reader.IsDBNull(17) ? new DateTime(1900, 1, 1) : Reader.GetDateTime(17));
        if (Reader.FieldCount > 18)
          this._tol_dVacacionesDesde = new DateTime?(Reader.IsDBNull(18) ? new DateTime(1900, 1, 1) : Reader.GetDateTime(18));
      }
      Reader.Close();
    }
  }
}
