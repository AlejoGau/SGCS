// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_puertos
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
  public class Dalt_puertos : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _pue_icodigo;
    private string _pue_cdescripcion;
    private int _pue_ireceptor;
    private Decimal _pue_npuerto;
    private Decimal _pue_ndatabits;
    private Decimal _pue_nstopbits;
    private Decimal _pue_nbaudrate;
    private Decimal _pue_nparity;
    private Decimal _pue_nflowctrl;
    private Decimal _pue_nbufferin;
    private Decimal _pue_nbufferout;
    private Decimal _pue_nrts;
    private Decimal _pue_ndtr;
    private Decimal _pue_nestado;
    private Decimal _pue_crespondeack;
    private int _pue_itiempoinactividad;
    private Decimal _pue_cresetxhb;

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

    public int pue_icodigo
    {
      get
      {
        return this._pue_icodigo;
      }
      set
      {
        this._pue_icodigo = value;
      }
    }

    public string pue_cdescripcion
    {
      get
      {
        return this._pue_cdescripcion;
      }
      set
      {
        this._pue_cdescripcion = value;
      }
    }

    public int pue_ireceptor
    {
      get
      {
        return this._pue_ireceptor;
      }
      set
      {
        this._pue_ireceptor = value;
      }
    }

    public Decimal pue_npuerto
    {
      get
      {
        return this._pue_npuerto;
      }
      set
      {
        this._pue_npuerto = value;
      }
    }

    public Decimal pue_ndatabits
    {
      get
      {
        return this._pue_ndatabits;
      }
      set
      {
        this._pue_ndatabits = value;
      }
    }

    public Decimal pue_nstopbits
    {
      get
      {
        return this._pue_nstopbits;
      }
      set
      {
        this._pue_nstopbits = value;
      }
    }

    public Decimal pue_nbaudrate
    {
      get
      {
        return this._pue_nbaudrate;
      }
      set
      {
        this._pue_nbaudrate = value;
      }
    }

    public Decimal pue_nparity
    {
      get
      {
        return this._pue_nparity;
      }
      set
      {
        this._pue_nparity = value;
      }
    }

    public Decimal pue_nflowctrl
    {
      get
      {
        return this._pue_nflowctrl;
      }
      set
      {
        this._pue_nflowctrl = value;
      }
    }

    public Decimal pue_nbufferin
    {
      get
      {
        return this._pue_nbufferin;
      }
      set
      {
        this._pue_nbufferin = value;
      }
    }

    public Decimal pue_nbufferout
    {
      get
      {
        return this._pue_nbufferout;
      }
      set
      {
        this._pue_nbufferout = value;
      }
    }

    public Decimal pue_nrts
    {
      get
      {
        return this._pue_nrts;
      }
      set
      {
        this._pue_nrts = value;
      }
    }

    public Decimal pue_ndtr
    {
      get
      {
        return this._pue_ndtr;
      }
      set
      {
        this._pue_ndtr = value;
      }
    }

    public Decimal pue_nestado
    {
      get
      {
        return this._pue_nestado;
      }
      set
      {
        this._pue_nestado = value;
      }
    }

    public Decimal pue_crespondeack
    {
      get
      {
        return this._pue_crespondeack;
      }
      set
      {
        this._pue_crespondeack = value;
      }
    }

    public int pue_itiempoinactividad
    {
      get
      {
        return this._pue_itiempoinactividad;
      }
      set
      {
        this._pue_itiempoinactividad = value;
      }
    }

    public Decimal pue_cresetxhb
    {
      get
      {
        return this._pue_cresetxhb;
      }
      set
      {
        this._pue_cresetxhb = value;
      }
    }

    public Dalt_puertos(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_puertos(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_puertos(SqlHelper SqlConfig, int UserId, Simplet_puertos Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._pue_icodigo = Simple.pue_icodigo;
      this._pue_cdescripcion = Simple.pue_cdescripcion;
      this._pue_ireceptor = Simple.pue_ireceptor;
      this._pue_npuerto = Simple.pue_npuerto;
      this._pue_ndatabits = Simple.pue_ndatabits;
      this._pue_nstopbits = Simple.pue_nstopbits;
      this._pue_nbaudrate = Simple.pue_nbaudrate;
      this._pue_nparity = Simple.pue_nparity;
      this._pue_nflowctrl = Simple.pue_nflowctrl;
      this._pue_nbufferin = Simple.pue_nbufferin;
      this._pue_nbufferout = Simple.pue_nbufferout;
      this._pue_nrts = Simple.pue_nrts;
      this._pue_ndtr = Simple.pue_ndtr;
      this._pue_nestado = Simple.pue_nestado;
      this._pue_crespondeack = Simple.pue_crespondeack;
      this._pue_itiempoinactividad = Simple.pue_itiempoinactividad;
      this._pue_cresetxhb = Simple.pue_cresetxhb;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_puertosIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_icodigo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_ireceptor", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_npuerto", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_ndatabits", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nstopbits", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nbaudrate", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nparity", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nflowctrl", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nbufferin", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nbufferout", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nrts", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_ndtr", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_crespondeack", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_itiempoinactividad", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_cresetxhb", SqlDbType.Decimal));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@pue_icodigo"].Value = (object) this._pue_icodigo;
              sqlCommand.Parameters["@pue_cdescripcion"].Value = this._pue_cdescripcion == null ? (object) DBNull.Value : (object) this._pue_cdescripcion;
              sqlCommand.Parameters["@pue_ireceptor"].Value = (object) this._pue_ireceptor;
              sqlCommand.Parameters["@pue_npuerto"].Value = (object) this._pue_npuerto;
              sqlCommand.Parameters["@pue_ndatabits"].Value = (object) this._pue_ndatabits;
              sqlCommand.Parameters["@pue_nstopbits"].Value = (object) this._pue_nstopbits;
              sqlCommand.Parameters["@pue_nbaudrate"].Value = (object) this._pue_nbaudrate;
              sqlCommand.Parameters["@pue_nparity"].Value = (object) this._pue_nparity;
              sqlCommand.Parameters["@pue_nflowctrl"].Value = (object) this._pue_nflowctrl;
              sqlCommand.Parameters["@pue_nbufferin"].Value = (object) this._pue_nbufferin;
              sqlCommand.Parameters["@pue_nbufferout"].Value = (object) this._pue_nbufferout;
              sqlCommand.Parameters["@pue_nrts"].Value = (object) this._pue_nrts;
              sqlCommand.Parameters["@pue_ndtr"].Value = (object) this._pue_ndtr;
              sqlCommand.Parameters["@pue_nestado"].Value = (object) this._pue_nestado;
              sqlCommand.Parameters["@pue_crespondeack"].Value = (object) this._pue_crespondeack;
              sqlCommand.Parameters["@pue_itiempoinactividad"].Value = (object) this._pue_itiempoinactividad;
              sqlCommand.Parameters["@pue_cresetxhb"].Value = (object) this._pue_cresetxhb;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_puertosUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_icodigo", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_ireceptor", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_npuerto", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_ndatabits", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nstopbits", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nbaudrate", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nparity", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nflowctrl", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nbufferin", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nbufferout", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nrts", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_ndtr", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_crespondeack", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_itiempoinactividad", SqlDbType.SmallInt));
              sqlCommand.Parameters.Add(new SqlParameter("@pue_cresetxhb", SqlDbType.Decimal));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@pue_icodigo"].Value = (object) this._pue_icodigo;
              sqlCommand.Parameters["@pue_cdescripcion"].Value = this._pue_cdescripcion == null ? (object) DBNull.Value : (object) this._pue_cdescripcion;
              sqlCommand.Parameters["@pue_ireceptor"].Value = (object) this._pue_ireceptor;
              sqlCommand.Parameters["@pue_npuerto"].Value = (object) this._pue_npuerto;
              sqlCommand.Parameters["@pue_ndatabits"].Value = (object) this._pue_ndatabits;
              sqlCommand.Parameters["@pue_nstopbits"].Value = (object) this._pue_nstopbits;
              sqlCommand.Parameters["@pue_nbaudrate"].Value = (object) this._pue_nbaudrate;
              sqlCommand.Parameters["@pue_nparity"].Value = (object) this._pue_nparity;
              sqlCommand.Parameters["@pue_nflowctrl"].Value = (object) this._pue_nflowctrl;
              sqlCommand.Parameters["@pue_nbufferin"].Value = (object) this._pue_nbufferin;
              sqlCommand.Parameters["@pue_nbufferout"].Value = (object) this._pue_nbufferout;
              sqlCommand.Parameters["@pue_nrts"].Value = (object) this._pue_nrts;
              sqlCommand.Parameters["@pue_ndtr"].Value = (object) this._pue_ndtr;
              sqlCommand.Parameters["@pue_nestado"].Value = (object) this._pue_nestado;
              sqlCommand.Parameters["@pue_crespondeack"].Value = (object) this._pue_crespondeack;
              sqlCommand.Parameters["@pue_itiempoinactividad"].Value = (object) this._pue_itiempoinactividad;
              sqlCommand.Parameters["@pue_cresetxhb"].Value = (object) this._pue_cresetxhb;
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
        throw new RuntimeException("The t_puertos is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_puertosDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_puertosSel", connection))
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
      Simplet_puertos simpletPuertos = new Simplet_puertos();
      simpletPuertos.Id = this.Id;
      simpletPuertos.Name = this.Name;
      simpletPuertos.pue_icodigo = this._pue_icodigo;
      simpletPuertos.pue_cdescripcion = this._pue_cdescripcion;
      simpletPuertos.pue_ireceptor = this._pue_ireceptor;
      simpletPuertos.pue_npuerto = this._pue_npuerto;
      simpletPuertos.pue_ndatabits = this._pue_ndatabits;
      simpletPuertos.pue_nstopbits = this._pue_nstopbits;
      simpletPuertos.pue_nbaudrate = this._pue_nbaudrate;
      simpletPuertos.pue_nparity = this._pue_nparity;
      simpletPuertos.pue_nflowctrl = this._pue_nflowctrl;
      simpletPuertos.pue_nbufferin = this._pue_nbufferin;
      simpletPuertos.pue_nbufferout = this._pue_nbufferout;
      simpletPuertos.pue_nrts = this._pue_nrts;
      simpletPuertos.pue_ndtr = this._pue_ndtr;
      simpletPuertos.pue_nestado = this._pue_nestado;
      simpletPuertos.pue_crespondeack = this._pue_crespondeack;
      simpletPuertos.pue_itiempoinactividad = this._pue_itiempoinactividad;
      simpletPuertos.pue_cresetxhb = this._pue_cresetxhb;
      if (this.CallerObject != null)
        simpletPuertos.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletPuertos;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_puertos simpletPuertos = (Simplet_puertos) BaseSimple;
      this.Id = simpletPuertos.Id;
      this.Name = simpletPuertos.Name;
      this._pue_icodigo = simpletPuertos.pue_icodigo;
      this._pue_cdescripcion = simpletPuertos.pue_cdescripcion;
      this._pue_ireceptor = simpletPuertos.pue_ireceptor;
      this._pue_npuerto = simpletPuertos.pue_npuerto;
      this._pue_ndatabits = simpletPuertos.pue_ndatabits;
      this._pue_nstopbits = simpletPuertos.pue_nstopbits;
      this._pue_nbaudrate = simpletPuertos.pue_nbaudrate;
      this._pue_nparity = simpletPuertos.pue_nparity;
      this._pue_nflowctrl = simpletPuertos.pue_nflowctrl;
      this._pue_nbufferin = simpletPuertos.pue_nbufferin;
      this._pue_nbufferout = simpletPuertos.pue_nbufferout;
      this._pue_nrts = simpletPuertos.pue_nrts;
      this._pue_ndtr = simpletPuertos.pue_ndtr;
      this._pue_nestado = simpletPuertos.pue_nestado;
      this._pue_crespondeack = simpletPuertos.pue_crespondeack;
      this._pue_itiempoinactividad = simpletPuertos.pue_itiempoinactividad;
      this._pue_cresetxhb = simpletPuertos.pue_cresetxhb;
      if (simpletPuertos.CallerObject != null)
        this.CallerObject = simpletPuertos.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_puertos callertPuertos = new Callert_puertos();
      callertPuertos.Id = this.Id;
      callertPuertos.Name = this.Name;
      callertPuertos.pue_icodigo = this._pue_icodigo;
      callertPuertos.pue_cdescripcion = this._pue_cdescripcion;
      callertPuertos.pue_ireceptor = this._pue_ireceptor;
      callertPuertos.pue_npuerto = this._pue_npuerto;
      callertPuertos.pue_ndatabits = this._pue_ndatabits;
      callertPuertos.pue_nstopbits = this._pue_nstopbits;
      callertPuertos.pue_nbaudrate = this._pue_nbaudrate;
      callertPuertos.pue_nparity = this._pue_nparity;
      callertPuertos.pue_nflowctrl = this._pue_nflowctrl;
      callertPuertos.pue_nbufferin = this._pue_nbufferin;
      callertPuertos.pue_nbufferout = this._pue_nbufferout;
      callertPuertos.pue_nrts = this._pue_nrts;
      callertPuertos.pue_ndtr = this._pue_ndtr;
      callertPuertos.pue_nestado = this._pue_nestado;
      callertPuertos.pue_crespondeack = this._pue_crespondeack;
      callertPuertos.pue_itiempoinactividad = this._pue_itiempoinactividad;
      callertPuertos.pue_cresetxhb = this._pue_cresetxhb;
      return (CallerObject) callertPuertos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pue_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pue_ireceptor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_npuerto", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_ndatabits", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nstopbits", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbaudrate", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nparity", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nflowctrl", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbufferin", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbufferout", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nrts", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_ndtr", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_crespondeack", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_itiempoinactividad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_cresetxhb", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pue_icodigo"] = (object) this._pue_icodigo;
      row["pue_cdescripcion"] = (object) this._pue_cdescripcion;
      row["pue_ireceptor"] = (object) this._pue_ireceptor;
      row["pue_npuerto"] = (object) this._pue_npuerto;
      row["pue_ndatabits"] = (object) this._pue_ndatabits;
      row["pue_nstopbits"] = (object) this._pue_nstopbits;
      row["pue_nbaudrate"] = (object) this._pue_nbaudrate;
      row["pue_nparity"] = (object) this._pue_nparity;
      row["pue_nflowctrl"] = (object) this._pue_nflowctrl;
      row["pue_nbufferin"] = (object) this._pue_nbufferin;
      row["pue_nbufferout"] = (object) this._pue_nbufferout;
      row["pue_nrts"] = (object) this._pue_nrts;
      row["pue_ndtr"] = (object) this._pue_ndtr;
      row["pue_nestado"] = (object) this._pue_nestado;
      row["pue_crespondeack"] = (object) this._pue_crespondeack;
      row["pue_itiempoinactividad"] = (object) this._pue_itiempoinactividad;
      row["pue_cresetxhb"] = (object) this._pue_cresetxhb;
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
        using (SqlCommand selectCommand = new SqlCommand("t_puertosByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_puertosByChildObject", connection))
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
              Simplet_puertos simpletPuertos = new Simplet_puertos();
              simpletPuertos.Id = sqlDataReader.GetInt32(0);
              simpletPuertos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletPuertos.pue_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpletPuertos.pue_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletPuertos.pue_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpletPuertos.pue_npuerto = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                simpletPuertos.pue_ndatabits = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simpletPuertos.pue_nstopbits = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletPuertos.pue_nbaudrate = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                simpletPuertos.pue_nparity = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                simpletPuertos.pue_nflowctrl = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simpletPuertos.pue_nbufferin = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                simpletPuertos.pue_nbufferout = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                simpletPuertos.pue_nrts = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                simpletPuertos.pue_ndtr = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                simpletPuertos.pue_nestado = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                simpletPuertos.pue_crespondeack = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                simpletPuertos.pue_itiempoinactividad = sqlDataReader.IsDBNull(17) ? 0 : (int) sqlDataReader.GetInt16(17);
              if (sqlDataReader.FieldCount > 18)
                simpletPuertos.pue_cresetxhb = sqlDataReader.IsDBNull(18) ? new Decimal(0) : sqlDataReader.GetDecimal(18);
              simpletPuertos.CallerObject = Object.GetCallerObject();
              simpletPuertos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletPuertos);
              objectCollection.Add((SimpleBaseObject) simpletPuertos);
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
        Simplet_puertos simpletPuertos = new Simplet_puertos();
        simpletPuertos.Id = (int) row["Id"];
        simpletPuertos.Name = (string) row["Name"];
        simpletPuertos.pue_icodigo = row["pue_icodigo"] == DBNull.Value ? 0 : (int) row["pue_icodigo"];
        simpletPuertos.pue_cdescripcion = row["pue_cdescripcion"] == DBNull.Value ? "" : (string) row["pue_cdescripcion"];
        simpletPuertos.pue_ireceptor = row["pue_ireceptor"] == DBNull.Value ? 0 : (int) row["pue_ireceptor"];
        simpletPuertos.pue_npuerto = row["pue_npuerto"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_npuerto"];
        simpletPuertos.pue_ndatabits = row["pue_ndatabits"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_ndatabits"];
        simpletPuertos.pue_nstopbits = row["pue_nstopbits"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nstopbits"];
        simpletPuertos.pue_nbaudrate = row["pue_nbaudrate"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nbaudrate"];
        simpletPuertos.pue_nparity = row["pue_nparity"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nparity"];
        simpletPuertos.pue_nflowctrl = row["pue_nflowctrl"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nflowctrl"];
        simpletPuertos.pue_nbufferin = row["pue_nbufferin"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nbufferin"];
        simpletPuertos.pue_nbufferout = row["pue_nbufferout"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nbufferout"];
        simpletPuertos.pue_nrts = row["pue_nrts"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nrts"];
        simpletPuertos.pue_ndtr = row["pue_ndtr"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_ndtr"];
        simpletPuertos.pue_nestado = row["pue_nestado"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_nestado"];
        simpletPuertos.pue_crespondeack = row["pue_crespondeack"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_crespondeack"];
        simpletPuertos.pue_itiempoinactividad = row["pue_itiempoinactividad"] == DBNull.Value ? 0 : (int) row["pue_itiempoinactividad"];
        simpletPuertos.pue_cresetxhb = row["pue_cresetxhb"] == DBNull.Value ? new Decimal(0) : (Decimal) row["pue_cresetxhb"];
        simpletPuertos.CallerObject = Object.GetCallerObject();
        simpletPuertos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletPuertos);
        if (Recursive)
          simpletPuertos.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletPuertos, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletPuertos);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_puertosByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_puertosByParentObject", connection))
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
              Simplet_puertos simpletPuertos = new Simplet_puertos();
              simpletPuertos.Id = sqlDataReader.GetInt32(0);
              simpletPuertos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletPuertos.pue_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                simpletPuertos.pue_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletPuertos.pue_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpletPuertos.pue_npuerto = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                simpletPuertos.pue_ndatabits = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simpletPuertos.pue_nstopbits = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletPuertos.pue_nbaudrate = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                simpletPuertos.pue_nparity = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                simpletPuertos.pue_nflowctrl = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                simpletPuertos.pue_nbufferin = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                simpletPuertos.pue_nbufferout = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                simpletPuertos.pue_nrts = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                simpletPuertos.pue_ndtr = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                simpletPuertos.pue_nestado = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                simpletPuertos.pue_crespondeack = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                simpletPuertos.pue_itiempoinactividad = sqlDataReader.IsDBNull(17) ? 0 : (int) sqlDataReader.GetInt16(17);
              if (sqlDataReader.FieldCount > 18)
                simpletPuertos.pue_cresetxhb = sqlDataReader.IsDBNull(18) ? new Decimal(0) : sqlDataReader.GetDecimal(18);
              simpletPuertos.CallerObject = Object.GetCallerObject();
              simpletPuertos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletPuertos);
              objectCollection.Add((SimpleBaseObject) simpletPuertos);
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
        using (SqlCommand selectCommand = new SqlCommand("t_puertosByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_puertosByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_puertosByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_puertosByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_puertosByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_puertos Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_puertosBySimplet_puertos", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@pue_icodigo", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@pue_cdescripcion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@pue_ireceptor", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@pue_npuerto", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_ndatabits", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nstopbits", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nbaudrate", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nparity", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nflowctrl", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nbufferin", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nbufferout", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nrts", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_ndtr", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_nestado", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_crespondeack", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@pue_itiempoinactividad", SqlDbType.SmallInt));
            selectCommand.Parameters.Add(new SqlParameter("@pue_cresetxhb", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@pue_icodigo"].Value = (object) this._pue_icodigo;
            selectCommand.Parameters["@pue_cdescripcion"].Value = this._pue_cdescripcion == null ? (object) DBNull.Value : (object) this._pue_cdescripcion;
            selectCommand.Parameters["@pue_ireceptor"].Value = (object) this._pue_ireceptor;
            selectCommand.Parameters["@pue_npuerto"].Value = (object) this._pue_npuerto;
            selectCommand.Parameters["@pue_ndatabits"].Value = (object) this._pue_ndatabits;
            selectCommand.Parameters["@pue_nstopbits"].Value = (object) this._pue_nstopbits;
            selectCommand.Parameters["@pue_nbaudrate"].Value = (object) this._pue_nbaudrate;
            selectCommand.Parameters["@pue_nparity"].Value = (object) this._pue_nparity;
            selectCommand.Parameters["@pue_nflowctrl"].Value = (object) this._pue_nflowctrl;
            selectCommand.Parameters["@pue_nbufferin"].Value = (object) this._pue_nbufferin;
            selectCommand.Parameters["@pue_nbufferout"].Value = (object) this._pue_nbufferout;
            selectCommand.Parameters["@pue_nrts"].Value = (object) this._pue_nrts;
            selectCommand.Parameters["@pue_ndtr"].Value = (object) this._pue_ndtr;
            selectCommand.Parameters["@pue_nestado"].Value = (object) this._pue_nestado;
            selectCommand.Parameters["@pue_crespondeack"].Value = (object) this._pue_crespondeack;
            selectCommand.Parameters["@pue_itiempoinactividad"].Value = (object) this._pue_itiempoinactividad;
            selectCommand.Parameters["@pue_cresetxhb"].Value = (object) this._pue_cresetxhb;
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

    public IEnumerable<Simplet_puertos> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_puertosByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_puertos Simple = new Simplet_puertos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.pue_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.pue_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.pue_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.pue_npuerto = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.pue_ndatabits = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.pue_nstopbits = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.pue_nbaudrate = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.pue_nparity = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.pue_nflowctrl = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.pue_nbufferin = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.pue_nbufferout = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.pue_nrts = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.pue_ndtr = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.pue_nestado = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                Simple.pue_crespondeack = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                Simple.pue_itiempoinactividad = sqlDataReader.IsDBNull(17) ? 0 : (int) sqlDataReader.GetInt16(17);
              if (sqlDataReader.FieldCount > 18)
                Simple.pue_cresetxhb = sqlDataReader.IsDBNull(18) ? new Decimal(0) : sqlDataReader.GetDecimal(18);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_puertos> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_puertosByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_puertos Simple = new Simplet_puertos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.pue_icodigo = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.pue_cdescripcion = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.pue_ireceptor = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.pue_npuerto = sqlDataReader.IsDBNull(5) ? new Decimal(0) : sqlDataReader.GetDecimal(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.pue_ndatabits = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.pue_nstopbits = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.pue_nbaudrate = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.pue_nparity = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.pue_nflowctrl = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.pue_nbufferin = sqlDataReader.IsDBNull(11) ? new Decimal(0) : sqlDataReader.GetDecimal(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.pue_nbufferout = sqlDataReader.IsDBNull(12) ? new Decimal(0) : sqlDataReader.GetDecimal(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.pue_nrts = sqlDataReader.IsDBNull(13) ? new Decimal(0) : sqlDataReader.GetDecimal(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.pue_ndtr = sqlDataReader.IsDBNull(14) ? new Decimal(0) : sqlDataReader.GetDecimal(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.pue_nestado = sqlDataReader.IsDBNull(15) ? new Decimal(0) : sqlDataReader.GetDecimal(15);
              if (sqlDataReader.FieldCount > 16)
                Simple.pue_crespondeack = sqlDataReader.IsDBNull(16) ? new Decimal(0) : sqlDataReader.GetDecimal(16);
              if (sqlDataReader.FieldCount > 17)
                Simple.pue_itiempoinactividad = sqlDataReader.IsDBNull(17) ? 0 : (int) sqlDataReader.GetInt16(17);
              if (sqlDataReader.FieldCount > 18)
                Simple.pue_cresetxhb = sqlDataReader.IsDBNull(18) ? new Decimal(0) : sqlDataReader.GetDecimal(18);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3091, "t_puertos");
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
          this._pue_icodigo = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._pue_cdescripcion = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._pue_ireceptor = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._pue_npuerto = Reader.IsDBNull(5) ? new Decimal(0) : Reader.GetDecimal(5);
        if (Reader.FieldCount > 6)
          this._pue_ndatabits = Reader.IsDBNull(6) ? new Decimal(0) : Reader.GetDecimal(6);
        if (Reader.FieldCount > 7)
          this._pue_nstopbits = Reader.IsDBNull(7) ? new Decimal(0) : Reader.GetDecimal(7);
        if (Reader.FieldCount > 8)
          this._pue_nbaudrate = Reader.IsDBNull(8) ? new Decimal(0) : Reader.GetDecimal(8);
        if (Reader.FieldCount > 9)
          this._pue_nparity = Reader.IsDBNull(9) ? new Decimal(0) : Reader.GetDecimal(9);
        if (Reader.FieldCount > 10)
          this._pue_nflowctrl = Reader.IsDBNull(10) ? new Decimal(0) : Reader.GetDecimal(10);
        if (Reader.FieldCount > 11)
          this._pue_nbufferin = Reader.IsDBNull(11) ? new Decimal(0) : Reader.GetDecimal(11);
        if (Reader.FieldCount > 12)
          this._pue_nbufferout = Reader.IsDBNull(12) ? new Decimal(0) : Reader.GetDecimal(12);
        if (Reader.FieldCount > 13)
          this._pue_nrts = Reader.IsDBNull(13) ? new Decimal(0) : Reader.GetDecimal(13);
        if (Reader.FieldCount > 14)
          this._pue_ndtr = Reader.IsDBNull(14) ? new Decimal(0) : Reader.GetDecimal(14);
        if (Reader.FieldCount > 15)
          this._pue_nestado = Reader.IsDBNull(15) ? new Decimal(0) : Reader.GetDecimal(15);
        if (Reader.FieldCount > 16)
          this._pue_crespondeack = Reader.IsDBNull(16) ? new Decimal(0) : Reader.GetDecimal(16);
        if (Reader.FieldCount > 17)
          this._pue_itiempoinactividad = Reader.IsDBNull(17) ? 0 : (int) Reader.GetInt16(17);
        if (Reader.FieldCount > 18)
          this._pue_cresetxhb = Reader.IsDBNull(18) ? new Decimal(0) : Reader.GetDecimal(18);
      }
      Reader.Close();
    }
  }
}
