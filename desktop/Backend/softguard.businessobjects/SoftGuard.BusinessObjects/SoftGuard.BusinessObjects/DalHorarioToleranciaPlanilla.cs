// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalHorarioToleranciaPlanilla
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
  public class DalHorarioToleranciaPlanilla : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _tol_iid;
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

    public int tol_iid
    {
      get
      {
        return this._tol_iid;
      }
      set
      {
        this._tol_iid = value;
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

    public DalHorarioToleranciaPlanilla(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalHorarioToleranciaPlanilla(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalHorarioToleranciaPlanilla(SqlHelper SqlConfig, int UserId, SimpleHorarioToleranciaPlanilla Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tol_iid = Simple.tol_iid;
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
            using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_iid", SqlDbType.Int));
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
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tol_iid"].Value = (object) this._tol_iid;
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
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tol_iid", SqlDbType.Int));
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
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tol_iid"].Value = (object) this._tol_iid;
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
        throw new RuntimeException("The HorarioToleranciaPlanilla is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaSel", connection))
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
      SimpleHorarioToleranciaPlanilla toleranciaPlanilla = new SimpleHorarioToleranciaPlanilla();
      toleranciaPlanilla.Id = this.Id;
      toleranciaPlanilla.Name = this.Name;
      toleranciaPlanilla.tol_iid = this._tol_iid;
      toleranciaPlanilla.tol_naperturaantes = this._tol_naperturaantes;
      toleranciaPlanilla.tol_caperturaantesalarma = this._tol_caperturaantesalarma;
      toleranciaPlanilla.tol_naperturadespues = this._tol_naperturadespues;
      toleranciaPlanilla.tol_caperturadespuesalarma = this._tol_caperturadespuesalarma;
      toleranciaPlanilla.tol_ncierreantes = this._tol_ncierreantes;
      toleranciaPlanilla.tol_ccierreantesalarma = this._tol_ccierreantesalarma;
      toleranciaPlanilla.tol_ncierredespues = this._tol_ncierredespues;
      toleranciaPlanilla.tol_ccierredespuesalarma = this._tol_ccierredespuesalarma;
      toleranciaPlanilla.tol_nnyo = this._tol_nnyo;
      toleranciaPlanilla.tol_nnyc = this._tol_nnyc;
      toleranciaPlanilla.tol_nControl = this._tol_nControl;
      toleranciaPlanilla.tol_nModo = this._tol_nModo;
      toleranciaPlanilla.tol_nAPNYO = this._tol_nAPNYO;
      toleranciaPlanilla.tol_nAPNYC = this._tol_nAPNYC;
      if (this.CallerObject != null)
        toleranciaPlanilla.CallerObject = this.CallerObject;
      return (SimpleBaseObject) toleranciaPlanilla;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleHorarioToleranciaPlanilla toleranciaPlanilla = (SimpleHorarioToleranciaPlanilla) BaseSimple;
      this.Id = toleranciaPlanilla.Id;
      this.Name = toleranciaPlanilla.Name;
      this._tol_iid = toleranciaPlanilla.tol_iid;
      this._tol_naperturaantes = toleranciaPlanilla.tol_naperturaantes;
      this._tol_caperturaantesalarma = toleranciaPlanilla.tol_caperturaantesalarma;
      this._tol_naperturadespues = toleranciaPlanilla.tol_naperturadespues;
      this._tol_caperturadespuesalarma = toleranciaPlanilla.tol_caperturadespuesalarma;
      this._tol_ncierreantes = toleranciaPlanilla.tol_ncierreantes;
      this._tol_ccierreantesalarma = toleranciaPlanilla.tol_ccierreantesalarma;
      this._tol_ncierredespues = toleranciaPlanilla.tol_ncierredespues;
      this._tol_ccierredespuesalarma = toleranciaPlanilla.tol_ccierredespuesalarma;
      this._tol_nnyo = toleranciaPlanilla.tol_nnyo;
      this._tol_nnyc = toleranciaPlanilla.tol_nnyc;
      this._tol_nControl = toleranciaPlanilla.tol_nControl;
      this._tol_nModo = toleranciaPlanilla.tol_nModo;
      this._tol_nAPNYO = toleranciaPlanilla.tol_nAPNYO;
      this._tol_nAPNYC = toleranciaPlanilla.tol_nAPNYC;
      if (toleranciaPlanilla.CallerObject != null)
        this.CallerObject = toleranciaPlanilla.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioToleranciaPlanilla toleranciaPlanilla = new CallerHorarioToleranciaPlanilla();
      toleranciaPlanilla.Id = this.Id;
      toleranciaPlanilla.Name = this.Name;
      toleranciaPlanilla.tol_iid = this._tol_iid;
      toleranciaPlanilla.tol_naperturaantes = this._tol_naperturaantes;
      toleranciaPlanilla.tol_caperturaantesalarma = this._tol_caperturaantesalarma;
      toleranciaPlanilla.tol_naperturadespues = this._tol_naperturadespues;
      toleranciaPlanilla.tol_caperturadespuesalarma = this._tol_caperturadespuesalarma;
      toleranciaPlanilla.tol_ncierreantes = this._tol_ncierreantes;
      toleranciaPlanilla.tol_ccierreantesalarma = this._tol_ccierreantesalarma;
      toleranciaPlanilla.tol_ncierredespues = this._tol_ncierredespues;
      toleranciaPlanilla.tol_ccierredespuesalarma = this._tol_ccierredespuesalarma;
      toleranciaPlanilla.tol_nnyo = this._tol_nnyo;
      toleranciaPlanilla.tol_nnyc = this._tol_nnyc;
      toleranciaPlanilla.tol_nControl = this._tol_nControl;
      toleranciaPlanilla.tol_nModo = this._tol_nModo;
      toleranciaPlanilla.tol_nAPNYO = this._tol_nAPNYO;
      toleranciaPlanilla.tol_nAPNYC = this._tol_nAPNYC;
      return (CallerObject) toleranciaPlanilla;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_iid", typeof (int)));
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
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tol_iid"] = (object) this._tol_iid;
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaByChildObject", connection))
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
              SimpleHorarioToleranciaPlanilla toleranciaPlanilla = new SimpleHorarioToleranciaPlanilla();
              toleranciaPlanilla.Id = sqlDataReader.GetInt32(0);
              toleranciaPlanilla.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                toleranciaPlanilla.tol_iid = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                toleranciaPlanilla.tol_naperturaantes = sqlDataReader.IsDBNull(3) ? 0 : (int) sqlDataReader.GetInt16(3);
              if (sqlDataReader.FieldCount > 4)
                toleranciaPlanilla.tol_caperturaantesalarma = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                toleranciaPlanilla.tol_naperturadespues = sqlDataReader.IsDBNull(5) ? 0 : (int) sqlDataReader.GetInt16(5);
              if (sqlDataReader.FieldCount > 6)
                toleranciaPlanilla.tol_caperturadespuesalarma = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                toleranciaPlanilla.tol_ncierreantes = sqlDataReader.IsDBNull(7) ? 0 : (int) sqlDataReader.GetInt16(7);
              if (sqlDataReader.FieldCount > 8)
                toleranciaPlanilla.tol_ccierreantesalarma = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                toleranciaPlanilla.tol_ncierredespues = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                toleranciaPlanilla.tol_ccierredespuesalarma = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                toleranciaPlanilla.tol_nnyo = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                toleranciaPlanilla.tol_nnyc = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                toleranciaPlanilla.tol_nControl = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                toleranciaPlanilla.tol_nModo = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                toleranciaPlanilla.tol_nAPNYO = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                toleranciaPlanilla.tol_nAPNYC = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              toleranciaPlanilla.CallerObject = Object.GetCallerObject();
              toleranciaPlanilla.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) toleranciaPlanilla);
              objectCollection.Add((SimpleBaseObject) toleranciaPlanilla);
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
        SimpleHorarioToleranciaPlanilla toleranciaPlanilla = new SimpleHorarioToleranciaPlanilla();
        toleranciaPlanilla.Id = (int) row["Id"];
        toleranciaPlanilla.Name = (string) row["Name"];
        toleranciaPlanilla.tol_iid = row["tol_iid"] == DBNull.Value ? 0 : (int) row["tol_iid"];
        toleranciaPlanilla.tol_naperturaantes = row["tol_naperturaantes"] == DBNull.Value ? 0 : (int) row["tol_naperturaantes"];
        toleranciaPlanilla.tol_caperturaantesalarma = row["tol_caperturaantesalarma"] == DBNull.Value ? "" : (string) row["tol_caperturaantesalarma"];
        toleranciaPlanilla.tol_naperturadespues = row["tol_naperturadespues"] == DBNull.Value ? 0 : (int) row["tol_naperturadespues"];
        toleranciaPlanilla.tol_caperturadespuesalarma = row["tol_caperturadespuesalarma"] == DBNull.Value ? "" : (string) row["tol_caperturadespuesalarma"];
        toleranciaPlanilla.tol_ncierreantes = row["tol_ncierreantes"] == DBNull.Value ? 0 : (int) row["tol_ncierreantes"];
        toleranciaPlanilla.tol_ccierreantesalarma = row["tol_ccierreantesalarma"] == DBNull.Value ? "" : (string) row["tol_ccierreantesalarma"];
        toleranciaPlanilla.tol_ncierredespues = row["tol_ncierredespues"] == DBNull.Value ? 0 : (int) row["tol_ncierredespues"];
        toleranciaPlanilla.tol_ccierredespuesalarma = row["tol_ccierredespuesalarma"] == DBNull.Value ? "" : (string) row["tol_ccierredespuesalarma"];
        toleranciaPlanilla.tol_nnyo = row["tol_nnyo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nnyo"];
        toleranciaPlanilla.tol_nnyc = row["tol_nnyc"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nnyc"];
        toleranciaPlanilla.tol_nControl = row["tol_nControl"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nControl"];
        toleranciaPlanilla.tol_nModo = row["tol_nModo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nModo"];
        toleranciaPlanilla.tol_nAPNYO = row["tol_nAPNYO"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nAPNYO"];
        toleranciaPlanilla.tol_nAPNYC = row["tol_nAPNYC"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tol_nAPNYC"];
        toleranciaPlanilla.CallerObject = Object.GetCallerObject();
        toleranciaPlanilla.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) toleranciaPlanilla);
        if (Recursive)
          toleranciaPlanilla.Dependencies = this.GetChildsByObject((SimpleBaseObject) toleranciaPlanilla, Recursive);
        objectCollection.Add((SimpleBaseObject) toleranciaPlanilla);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaByParentObject", connection))
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
              SimpleHorarioToleranciaPlanilla toleranciaPlanilla = new SimpleHorarioToleranciaPlanilla();
              toleranciaPlanilla.Id = sqlDataReader.GetInt32(0);
              toleranciaPlanilla.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                toleranciaPlanilla.tol_iid = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                toleranciaPlanilla.tol_naperturaantes = sqlDataReader.IsDBNull(3) ? 0 : (int) sqlDataReader.GetInt16(3);
              if (sqlDataReader.FieldCount > 4)
                toleranciaPlanilla.tol_caperturaantesalarma = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                toleranciaPlanilla.tol_naperturadespues = sqlDataReader.IsDBNull(5) ? 0 : (int) sqlDataReader.GetInt16(5);
              if (sqlDataReader.FieldCount > 6)
                toleranciaPlanilla.tol_caperturadespuesalarma = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                toleranciaPlanilla.tol_ncierreantes = sqlDataReader.IsDBNull(7) ? 0 : (int) sqlDataReader.GetInt16(7);
              if (sqlDataReader.FieldCount > 8)
                toleranciaPlanilla.tol_ccierreantesalarma = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                toleranciaPlanilla.tol_ncierredespues = sqlDataReader.IsDBNull(9) ? 0 : (int) sqlDataReader.GetInt16(9);
              if (sqlDataReader.FieldCount > 10)
                toleranciaPlanilla.tol_ccierredespuesalarma = sqlDataReader.IsDBNull(10) ? "" : sqlDataReader.GetString(10);
              if (sqlDataReader.FieldCount > 11)
                toleranciaPlanilla.tol_nnyo = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                toleranciaPlanilla.tol_nnyc = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                toleranciaPlanilla.tol_nControl = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                toleranciaPlanilla.tol_nModo = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                toleranciaPlanilla.tol_nAPNYO = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                toleranciaPlanilla.tol_nAPNYC = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              toleranciaPlanilla.CallerObject = Object.GetCallerObject();
              toleranciaPlanilla.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) toleranciaPlanilla);
              objectCollection.Add((SimpleBaseObject) toleranciaPlanilla);
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleHorarioToleranciaPlanilla Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("HorarioToleranciaPlanillaBySimpleHorarioToleranciaPlanilla", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tol_iid", SqlDbType.Int));
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
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@tol_iid"].Value = (object) this._tol_iid;
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

    public IEnumerable<SimpleHorarioToleranciaPlanilla> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHorarioToleranciaPlanilla Simple = new SimpleHorarioToleranciaPlanilla();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tol_iid = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
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
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleHorarioToleranciaPlanilla> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("HorarioToleranciaPlanillaByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleHorarioToleranciaPlanilla Simple = new SimpleHorarioToleranciaPlanilla();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tol_iid = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
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
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3009, "HorarioToleranciaPlanilla");
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
          this._tol_iid = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
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
      }
      Reader.Close();
    }
  }
}
