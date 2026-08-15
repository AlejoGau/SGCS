// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalMedicalInfo
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
  public class DalMedicalInfo : TransactionObject
  {
    private bool _AutoCommit = false;
    private SqlConnection _Conn;
    private SqlTransaction _Trans;
    private SqlCommand _CmdIns;
    private SqlCommand _CmdSel;
    private SqlCommand _CmdUpd;
    private SqlCommand _CmdDel;
    private SqlCommand _CmdChilds;
    private SqlCommand _CmdParents;
    private SqlCommand _CmdDataByName;
    private SqlCommand _CmdDataByNameWithChild;
    private SqlCommand _CmdDataByNameWithParent;
    private SqlCommand _CmdDataBySimpleObject;
    private SqlCommand _CmdDataByText;
    private int _mnf_iidcuenta;
    private int _mnf_iid;
    private string _mnf_cprotegido;
    private string _mnf_cdoctor;
    private string _mnf_cobrasocial;
    private Decimal _mnf_nsexo;
    private Decimal _mnf_ndiscapacitado;
    private Decimal _mnf_nambulancia;
    private Decimal _mnf_nvivesolo;
    private DateTime _mnf_dfechanacimiento;
    private int _mnf_nedad;
    private string _mnf_tobservaciones;
    private string _mnf_casociado;

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

    public int mnf_iidcuenta
    {
      get
      {
        return this._mnf_iidcuenta;
      }
      set
      {
        this._mnf_iidcuenta = value;
      }
    }

    public int mnf_iid
    {
      get
      {
        return this._mnf_iid;
      }
      set
      {
        this._mnf_iid = value;
      }
    }

    public string mnf_cprotegido
    {
      get
      {
        return this._mnf_cprotegido;
      }
      set
      {
        this._mnf_cprotegido = value;
      }
    }

    public string mnf_cdoctor
    {
      get
      {
        return this._mnf_cdoctor;
      }
      set
      {
        this._mnf_cdoctor = value;
      }
    }

    public string mnf_cobrasocial
    {
      get
      {
        return this._mnf_cobrasocial;
      }
      set
      {
        this._mnf_cobrasocial = value;
      }
    }

    public Decimal mnf_nsexo
    {
      get
      {
        return this._mnf_nsexo;
      }
      set
      {
        this._mnf_nsexo = value;
      }
    }

    public Decimal mnf_ndiscapacitado
    {
      get
      {
        return this._mnf_ndiscapacitado;
      }
      set
      {
        this._mnf_ndiscapacitado = value;
      }
    }

    public Decimal mnf_nambulancia
    {
      get
      {
        return this._mnf_nambulancia;
      }
      set
      {
        this._mnf_nambulancia = value;
      }
    }

    public Decimal mnf_nvivesolo
    {
      get
      {
        return this._mnf_nvivesolo;
      }
      set
      {
        this._mnf_nvivesolo = value;
      }
    }

    public DateTime mnf_dfechanacimiento
    {
      get
      {
        return this._mnf_dfechanacimiento;
      }
      set
      {
        this._mnf_dfechanacimiento = value;
      }
    }

    public int mnf_nedad
    {
      get
      {
        return this._mnf_nedad;
      }
      set
      {
        this._mnf_nedad = value;
      }
    }

    public string mnf_tobservaciones
    {
      get
      {
        return this._mnf_tobservaciones;
      }
      set
      {
        this._mnf_tobservaciones = value;
      }
    }

    public string mnf_casociado
    {
      get
      {
        return this._mnf_casociado;
      }
      set
      {
        this._mnf_casociado = value;
      }
    }

    public DalMedicalInfo(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalMedicalInfo(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalMedicalInfo(SqlHelper SqlConfig, int UserId, SimpleMedicalInfo Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._mnf_iidcuenta = Simple.mnf_iidcuenta;
      this._mnf_iid = Simple.mnf_iid;
      this._mnf_cprotegido = Simple.mnf_cprotegido;
      this._mnf_cdoctor = Simple.mnf_cdoctor;
      this._mnf_cobrasocial = Simple.mnf_cobrasocial;
      this._mnf_nsexo = Simple.mnf_nsexo;
      this._mnf_ndiscapacitado = Simple.mnf_ndiscapacitado;
      this._mnf_nambulancia = Simple.mnf_nambulancia;
      this._mnf_nvivesolo = Simple.mnf_nvivesolo;
      this._mnf_dfechanacimiento = Simple.mnf_dfechanacimiento;
      this._mnf_nedad = Simple.mnf_nedad;
      this._mnf_tobservaciones = Simple.mnf_tobservaciones;
      this._mnf_casociado = Simple.mnf_casociado;
    }

    ~DalMedicalInfo()
    {
      this._CmdSel.Parameters.Clear();
      this._CmdIns.Parameters.Clear();
      this._CmdUpd.Parameters.Clear();
      this._CmdDel.Parameters.Clear();
      this._CmdChilds.Parameters.Clear();
      this._CmdParents.Parameters.Clear();
      this._CmdDataByName.Parameters.Clear();
      this._CmdDataByNameWithChild.Parameters.Clear();
      this._CmdDataByNameWithParent.Parameters.Clear();
      this._CmdDataBySimpleObject.Parameters.Clear();
      this._CmdDataByText.Parameters.Clear();
    }

    public override void BeginTran()
    {
      this._Conn.Open();
      this._Trans = this._Conn.BeginTransaction();
      this._CmdIns.Connection = this._Conn;
      this._CmdUpd.Connection = this._Conn;
      this._CmdDel.Connection = this._Conn;
      this._CmdIns.Transaction = this._Trans;
      this._CmdUpd.Transaction = this._Trans;
      this._CmdDel.Transaction = this._Trans;
    }

    public override void CommitTran()
    {
      this._Trans.Commit();
    }

    public override void RollbackTran()
    {
      this._Trans.Rollback();
    }

    public override void EndTran()
    {
      this._Conn.Close();
    }

    public override void Save()
    {
      base.Save();
      if (this._AutoCommit)
        this.BeginTran();
      try
      {
        if (this.Id == 0)
        {
          SqlCommand cmdIns = this._CmdIns;
          cmdIns.Parameters["@Name"].Value = (object) this.Name;
          cmdIns.Parameters["@mnf_iidcuenta"].Value = (object) this._mnf_iidcuenta;
          cmdIns.Parameters["@mnf_iid"].Value = (object) this._mnf_iid;
          cmdIns.Parameters["@mnf_cprotegido"].Value = this._mnf_cprotegido == null ? (object) DBNull.Value : (object) this._mnf_cprotegido;
          cmdIns.Parameters["@mnf_cdoctor"].Value = this._mnf_cdoctor == null ? (object) DBNull.Value : (object) this._mnf_cdoctor;
          cmdIns.Parameters["@mnf_cobrasocial"].Value = this._mnf_cobrasocial == null ? (object) DBNull.Value : (object) this._mnf_cobrasocial;
          cmdIns.Parameters["@mnf_nsexo"].Value = (object) this._mnf_nsexo;
          cmdIns.Parameters["@mnf_ndiscapacitado"].Value = (object) this._mnf_ndiscapacitado;
          cmdIns.Parameters["@mnf_nambulancia"].Value = (object) this._mnf_nambulancia;
          cmdIns.Parameters["@mnf_nvivesolo"].Value = (object) this._mnf_nvivesolo;
          cmdIns.Parameters["@mnf_dfechanacimiento"].Value = this._mnf_dfechanacimiento == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._mnf_dfechanacimiento;
          cmdIns.Parameters["@mnf_nedad"].Value = (object) this._mnf_nedad;
          cmdIns.Parameters["@mnf_tobservaciones"].Value = this._mnf_tobservaciones == null ? (object) DBNull.Value : (object) this._mnf_tobservaciones;
          cmdIns.Parameters["@mnf_casociado"].Value = this._mnf_casociado == null ? (object) DBNull.Value : (object) this._mnf_casociado;
          this.FillObject(cmdIns.ExecuteReader());
        }
        else
        {
          SqlCommand cmdUpd = this._CmdUpd;
          cmdUpd.Parameters["@Id"].Value = (object) this.Id;
          cmdUpd.Parameters["@Name"].Value = (object) this.Name;
          cmdUpd.Parameters["@mnf_iidcuenta"].Value = (object) this._mnf_iidcuenta;
          cmdUpd.Parameters["@mnf_iid"].Value = (object) this._mnf_iid;
          cmdUpd.Parameters["@mnf_cprotegido"].Value = this._mnf_cprotegido == null ? (object) DBNull.Value : (object) this._mnf_cprotegido;
          cmdUpd.Parameters["@mnf_cdoctor"].Value = this._mnf_cdoctor == null ? (object) DBNull.Value : (object) this._mnf_cdoctor;
          cmdUpd.Parameters["@mnf_cobrasocial"].Value = this._mnf_cobrasocial == null ? (object) DBNull.Value : (object) this._mnf_cobrasocial;
          cmdUpd.Parameters["@mnf_nsexo"].Value = (object) this._mnf_nsexo;
          cmdUpd.Parameters["@mnf_ndiscapacitado"].Value = (object) this._mnf_ndiscapacitado;
          cmdUpd.Parameters["@mnf_nambulancia"].Value = (object) this._mnf_nambulancia;
          cmdUpd.Parameters["@mnf_nvivesolo"].Value = (object) this._mnf_nvivesolo;
          cmdUpd.Parameters["@mnf_dfechanacimiento"].Value = this._mnf_dfechanacimiento == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._mnf_dfechanacimiento;
          cmdUpd.Parameters["@mnf_nedad"].Value = (object) this._mnf_nedad;
          cmdUpd.Parameters["@mnf_tobservaciones"].Value = this._mnf_tobservaciones == null ? (object) DBNull.Value : (object) this._mnf_tobservaciones;
          cmdUpd.Parameters["@mnf_casociado"].Value = this._mnf_casociado == null ? (object) DBNull.Value : (object) this._mnf_casociado;
          this.FillObject(cmdUpd.ExecuteReader());
        }
        if (!this._AutoCommit)
          return;
        this.CommitTran();
      }
      catch (Exception ex)
      {
        if (this._AutoCommit)
          this.RollbackTran();
        throw ex;
      }
      finally
      {
        if (this._AutoCommit)
          this.EndTran();
      }
    }

    public override void Delete()
    {
      base.Delete();
      if (this.Id == 0)
        throw new RuntimeException("The MedicalInfo is null");
      try
      {
        if (this._AutoCommit)
          this.BeginTran();
        this._CmdDel.Parameters["@Id"].Value = (object) this.Id;
        this._CmdDel.ExecuteNonQuery();
        if (!this._AutoCommit)
          return;
        this.CommitTran();
      }
      catch (Exception ex)
      {
        if (this._AutoCommit)
          this.RollbackTran();
        throw ex;
      }
      finally
      {
        if (this._AutoCommit)
          this.EndTran();
      }
    }

    public new virtual void Load(int Id)
    {
      base.Load(Id);
      this._Conn.Open();
      this._CmdSel.Parameters["@Id"].Value = (object) Id;
      this.FillObject(this._CmdSel.ExecuteReader());
      this._Conn.Close();
      this.OriginalObject = this.GetSimpleObject();
    }

    public override BaseObject GetObject()
    {
      return (BaseObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleMedicalInfo simpleMedicalInfo = new SimpleMedicalInfo();
      simpleMedicalInfo.Id = this.Id;
      simpleMedicalInfo.Name = this.Name;
      simpleMedicalInfo.mnf_iidcuenta = this._mnf_iidcuenta;
      simpleMedicalInfo.mnf_iid = this._mnf_iid;
      simpleMedicalInfo.mnf_cprotegido = this._mnf_cprotegido;
      simpleMedicalInfo.mnf_cdoctor = this._mnf_cdoctor;
      simpleMedicalInfo.mnf_cobrasocial = this._mnf_cobrasocial;
      simpleMedicalInfo.mnf_nsexo = this._mnf_nsexo;
      simpleMedicalInfo.mnf_ndiscapacitado = this._mnf_ndiscapacitado;
      simpleMedicalInfo.mnf_nambulancia = this._mnf_nambulancia;
      simpleMedicalInfo.mnf_nvivesolo = this._mnf_nvivesolo;
      simpleMedicalInfo.mnf_dfechanacimiento = this._mnf_dfechanacimiento;
      simpleMedicalInfo.mnf_nedad = this._mnf_nedad;
      simpleMedicalInfo.mnf_tobservaciones = this._mnf_tobservaciones;
      simpleMedicalInfo.mnf_casociado = this._mnf_casociado;
      if (this.CallerObject != null)
        simpleMedicalInfo.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleMedicalInfo;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleMedicalInfo simpleMedicalInfo = (SimpleMedicalInfo) BaseSimple;
      this.Id = simpleMedicalInfo.Id;
      this.Name = simpleMedicalInfo.Name;
      this._mnf_iidcuenta = simpleMedicalInfo.mnf_iidcuenta;
      this._mnf_iid = simpleMedicalInfo.mnf_iid;
      this._mnf_cprotegido = simpleMedicalInfo.mnf_cprotegido;
      this._mnf_cdoctor = simpleMedicalInfo.mnf_cdoctor;
      this._mnf_cobrasocial = simpleMedicalInfo.mnf_cobrasocial;
      this._mnf_nsexo = simpleMedicalInfo.mnf_nsexo;
      this._mnf_ndiscapacitado = simpleMedicalInfo.mnf_ndiscapacitado;
      this._mnf_nambulancia = simpleMedicalInfo.mnf_nambulancia;
      this._mnf_nvivesolo = simpleMedicalInfo.mnf_nvivesolo;
      this._mnf_dfechanacimiento = simpleMedicalInfo.mnf_dfechanacimiento;
      this._mnf_nedad = simpleMedicalInfo.mnf_nedad;
      this._mnf_tobservaciones = simpleMedicalInfo.mnf_tobservaciones;
      this._mnf_casociado = simpleMedicalInfo.mnf_casociado;
      if (simpleMedicalInfo.CallerObject != null)
        this.CallerObject = simpleMedicalInfo.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerMedicalInfo callerMedicalInfo = new CallerMedicalInfo();
      callerMedicalInfo.Id = this.Id;
      callerMedicalInfo.Name = this.Name;
      callerMedicalInfo.mnf_iidcuenta = this._mnf_iidcuenta;
      callerMedicalInfo.mnf_iid = this._mnf_iid;
      callerMedicalInfo.mnf_cprotegido = this._mnf_cprotegido;
      callerMedicalInfo.mnf_cdoctor = this._mnf_cdoctor;
      callerMedicalInfo.mnf_cobrasocial = this._mnf_cobrasocial;
      callerMedicalInfo.mnf_nsexo = this._mnf_nsexo;
      callerMedicalInfo.mnf_ndiscapacitado = this._mnf_ndiscapacitado;
      callerMedicalInfo.mnf_nambulancia = this._mnf_nambulancia;
      callerMedicalInfo.mnf_nvivesolo = this._mnf_nvivesolo;
      callerMedicalInfo.mnf_dfechanacimiento = this._mnf_dfechanacimiento;
      callerMedicalInfo.mnf_nedad = this._mnf_nedad;
      callerMedicalInfo.mnf_tobservaciones = this._mnf_tobservaciones;
      callerMedicalInfo.mnf_casociado = this._mnf_casociado;
      return (CallerObject) callerMedicalInfo;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mnf_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mnf_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mnf_cprotegido", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mnf_cdoctor", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mnf_cobrasocial", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mnf_nsexo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("mnf_ndiscapacitado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("mnf_nambulancia", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("mnf_nvivesolo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("mnf_dfechanacimiento", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("mnf_nedad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mnf_tobservaciones", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mnf_casociado", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["mnf_iidcuenta"] = (object) this._mnf_iidcuenta;
      row["mnf_iid"] = (object) this._mnf_iid;
      row["mnf_cprotegido"] = (object) this._mnf_cprotegido;
      row["mnf_cdoctor"] = (object) this._mnf_cdoctor;
      row["mnf_cobrasocial"] = (object) this._mnf_cobrasocial;
      row["mnf_nsexo"] = (object) this._mnf_nsexo;
      row["mnf_ndiscapacitado"] = (object) this._mnf_ndiscapacitado;
      row["mnf_nambulancia"] = (object) this._mnf_nambulancia;
      row["mnf_nvivesolo"] = (object) this._mnf_nvivesolo;
      row["mnf_dfechanacimiento"] = (object) this._mnf_dfechanacimiento;
      row["mnf_nedad"] = (object) this._mnf_nedad;
      row["mnf_tobservaciones"] = (object) this._mnf_tobservaciones;
      row["mnf_casociado"] = (object) this._mnf_casociado;
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
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdChilds);
      this._CmdChilds.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdChilds.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      this._Conn.Close();
      return dataTable;
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      this._CmdChilds.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdChilds.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      SqlDataReader sqlDataReader = this._CmdChilds.ExecuteReader();
      while (sqlDataReader.Read())
      {
        SimpleMedicalInfo simpleMedicalInfo = new SimpleMedicalInfo();
        simpleMedicalInfo.Id = sqlDataReader.GetInt32(0);
        simpleMedicalInfo.Name = sqlDataReader.GetString(1);
        simpleMedicalInfo.mnf_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleMedicalInfo.mnf_iid = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simpleMedicalInfo.mnf_cprotegido = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        simpleMedicalInfo.mnf_cdoctor = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        simpleMedicalInfo.mnf_cobrasocial = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        simpleMedicalInfo.mnf_nsexo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
        simpleMedicalInfo.mnf_ndiscapacitado = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
        simpleMedicalInfo.mnf_nambulancia = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
        simpleMedicalInfo.mnf_nvivesolo = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
        simpleMedicalInfo.mnf_dfechanacimiento = sqlDataReader.IsDBNull(11) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(11);
        simpleMedicalInfo.mnf_nedad = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
        simpleMedicalInfo.mnf_tobservaciones = sqlDataReader.IsDBNull(13) ? "" : sqlDataReader.GetString(13);
        simpleMedicalInfo.mnf_casociado = sqlDataReader.IsDBNull(14) ? "" : sqlDataReader.GetString(14);
        simpleMedicalInfo.CallerObject = Object.GetCallerObject();
        simpleMedicalInfo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleMedicalInfo);
        objectCollection.Add((SimpleBaseObject) simpleMedicalInfo);
      }
      sqlDataReader.Close();
      this._Conn.Close();
      return objectCollection;
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      foreach (DataRow row in (InternalDataCollectionBase) this.GetDataChildsByObject(Object).Rows)
      {
        SimpleMedicalInfo simpleMedicalInfo = new SimpleMedicalInfo();
        simpleMedicalInfo.Id = (int) row["Id"];
        simpleMedicalInfo.Name = (string) row["Name"];
        simpleMedicalInfo.mnf_iidcuenta = row["mnf_iidcuenta"] == DBNull.Value ? 0 : (int) row["mnf_iidcuenta"];
        simpleMedicalInfo.mnf_iid = row["mnf_iid"] == DBNull.Value ? 0 : (int) row["mnf_iid"];
        simpleMedicalInfo.mnf_cprotegido = row["mnf_cprotegido"] == DBNull.Value ? "" : (string) row["mnf_cprotegido"];
        simpleMedicalInfo.mnf_cdoctor = row["mnf_cdoctor"] == DBNull.Value ? "" : (string) row["mnf_cdoctor"];
        simpleMedicalInfo.mnf_cobrasocial = row["mnf_cobrasocial"] == DBNull.Value ? "" : (string) row["mnf_cobrasocial"];
        simpleMedicalInfo.mnf_nsexo = row["mnf_nsexo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["mnf_nsexo"];
        simpleMedicalInfo.mnf_ndiscapacitado = row["mnf_ndiscapacitado"] == DBNull.Value ? new Decimal(0) : (Decimal) row["mnf_ndiscapacitado"];
        simpleMedicalInfo.mnf_nambulancia = row["mnf_nambulancia"] == DBNull.Value ? new Decimal(0) : (Decimal) row["mnf_nambulancia"];
        simpleMedicalInfo.mnf_nvivesolo = row["mnf_nvivesolo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["mnf_nvivesolo"];
        simpleMedicalInfo.mnf_dfechanacimiento = row["mnf_dfechanacimiento"] == DBNull.Value ? new DateTime(1, 1, 1) : (DateTime) row["mnf_dfechanacimiento"];
        simpleMedicalInfo.mnf_nedad = row["mnf_nedad"] == DBNull.Value ? 0 : (int) row["mnf_nedad"];
        simpleMedicalInfo.mnf_tobservaciones = row["mnf_tobservaciones"] == DBNull.Value ? "" : (string) row["mnf_tobservaciones"];
        simpleMedicalInfo.mnf_casociado = row["mnf_casociado"] == DBNull.Value ? "" : (string) row["mnf_casociado"];
        simpleMedicalInfo.CallerObject = Object.GetCallerObject();
        simpleMedicalInfo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleMedicalInfo);
        if (Recursive)
          simpleMedicalInfo.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleMedicalInfo, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleMedicalInfo);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdParents);
      this._CmdParents.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdParents.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      this._Conn.Close();
      return dataTable;
    }

    public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      this._CmdParents.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
      this._CmdParents.Parameters["@Id"].Value = (object) Object.Id;
      this._Conn.Open();
      SqlDataReader sqlDataReader = this._CmdParents.ExecuteReader();
      while (sqlDataReader.Read())
      {
        SimpleMedicalInfo simpleMedicalInfo = new SimpleMedicalInfo();
        simpleMedicalInfo.Id = sqlDataReader.GetInt32(0);
        simpleMedicalInfo.Name = sqlDataReader.GetString(1);
        simpleMedicalInfo.mnf_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
        simpleMedicalInfo.mnf_iid = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
        simpleMedicalInfo.mnf_cprotegido = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
        simpleMedicalInfo.mnf_cdoctor = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
        simpleMedicalInfo.mnf_cobrasocial = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
        simpleMedicalInfo.mnf_nsexo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
        simpleMedicalInfo.mnf_ndiscapacitado = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
        simpleMedicalInfo.mnf_nambulancia = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
        simpleMedicalInfo.mnf_nvivesolo = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
        simpleMedicalInfo.mnf_dfechanacimiento = sqlDataReader.IsDBNull(11) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(11);
        simpleMedicalInfo.mnf_nedad = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
        simpleMedicalInfo.mnf_tobservaciones = sqlDataReader.IsDBNull(13) ? "" : sqlDataReader.GetString(13);
        simpleMedicalInfo.mnf_casociado = sqlDataReader.IsDBNull(14) ? "" : sqlDataReader.GetString(14);
        simpleMedicalInfo.CallerObject = Object.GetCallerObject();
        simpleMedicalInfo.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleMedicalInfo);
        objectCollection.Add((SimpleBaseObject) simpleMedicalInfo);
      }
      sqlDataReader.Close();
      this._Conn.Close();
      return objectCollection;
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this.GetDataByName(Name, Taxonomies, PageCount, PagePresent, "Id", ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByName);
      this._CmdDataByName.Parameters["@Name"].Value = (object) Name;
      this._CmdDataByName.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByName.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByName.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByName.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByName.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._CmdDataByName.Parameters["@OrderBy"].Value = (object) OrderBy;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByName.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByName.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByName.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByName.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByNameWithChild);
      this._CmdDataByNameWithChild.Parameters["@Name"].Value = (object) Name;
      this._CmdDataByNameWithChild.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByNameWithChild.Parameters["@ObjectType"].Value = (object) FilterChildObject.Type.Name;
      this._CmdDataByNameWithChild.Parameters["@ObjectId"].Value = (object) FilterChildObject.Id;
      this._CmdDataByNameWithChild.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByNameWithChild.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByNameWithChild.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByNameWithChild.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByNameWithChild.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByNameWithChild.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByNameWithChild.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByNameWithChild.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByNameWithParent);
      this._CmdDataByNameWithParent.Parameters["@Name"].Value = (object) Name;
      this._CmdDataByNameWithParent.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByNameWithParent.Parameters["@ObjectType"].Value = (object) FilterParentObject.Type.Name;
      this._CmdDataByNameWithParent.Parameters["@ObjectId"].Value = (object) FilterParentObject.Id;
      this._CmdDataByNameWithParent.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByNameWithParent.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByNameWithParent.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByNameWithParent.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByNameWithParent.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByNameWithParent.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByNameWithParent.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByNameWithParent.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(this._CmdDataByText);
      this._CmdDataByText.Parameters["@Text"].Value = (object) Text;
      this._CmdDataByText.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      this._CmdDataByText.Parameters["@PageCount"].Value = (object) PageCount;
      this._CmdDataByText.Parameters["@PagePresent"].Value = (object) PagePresent;
      this._CmdDataByName.Parameters["@PageTotal"].Value = (object) PageTotal;
      this._CmdDataByName.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (this._CmdDataByText.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(this._CmdDataByText.Parameters["@PageTotal"].Value.ToString());
      if (this._CmdDataByText.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(this._CmdDataByText.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public DataTable GetDataBySimpleObject(SimpleMedicalInfo Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      SqlCommand dataBySimpleObject = this._CmdDataBySimpleObject;
      DataTable dataTable = new DataTable("Object");
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(dataBySimpleObject);
      dataBySimpleObject.Parameters["@Name"].Value = (object) Simple.Name;
      dataBySimpleObject.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
      dataBySimpleObject.Parameters["@mnf_iidcuenta"].Value = (object) this._mnf_iidcuenta;
      dataBySimpleObject.Parameters["@mnf_iid"].Value = (object) this._mnf_iid;
      dataBySimpleObject.Parameters["@mnf_cprotegido"].Value = this._mnf_cprotegido == null ? (object) DBNull.Value : (object) this._mnf_cprotegido;
      dataBySimpleObject.Parameters["@mnf_cdoctor"].Value = this._mnf_cdoctor == null ? (object) DBNull.Value : (object) this._mnf_cdoctor;
      dataBySimpleObject.Parameters["@mnf_cobrasocial"].Value = this._mnf_cobrasocial == null ? (object) DBNull.Value : (object) this._mnf_cobrasocial;
      dataBySimpleObject.Parameters["@mnf_nsexo"].Value = (object) this._mnf_nsexo;
      dataBySimpleObject.Parameters["@mnf_ndiscapacitado"].Value = (object) this._mnf_ndiscapacitado;
      dataBySimpleObject.Parameters["@mnf_nambulancia"].Value = (object) this._mnf_nambulancia;
      dataBySimpleObject.Parameters["@mnf_nvivesolo"].Value = (object) this._mnf_nvivesolo;
      dataBySimpleObject.Parameters["@mnf_dfechanacimiento"].Value = this._mnf_dfechanacimiento == new DateTime(1, 1, 1) ? (object) DBNull.Value : (object) this._mnf_dfechanacimiento;
      dataBySimpleObject.Parameters["@mnf_nedad"].Value = (object) this._mnf_nedad;
      dataBySimpleObject.Parameters["@mnf_tobservaciones"].Value = this._mnf_tobservaciones == null ? (object) DBNull.Value : (object) this._mnf_tobservaciones;
      dataBySimpleObject.Parameters["@mnf_casociado"].Value = this._mnf_casociado == null ? (object) DBNull.Value : (object) this._mnf_casociado;
      dataBySimpleObject.Parameters["@PageCount"].Value = (object) PageCount;
      dataBySimpleObject.Parameters["@PagePresent"].Value = (object) PagePresent;
      dataBySimpleObject.Parameters["@PageTotal"].Value = (object) PageTotal;
      dataBySimpleObject.Parameters["@RowTotal"].Value = (object) RowTotal;
      this._Conn.Open();
      sqlDataAdapter.Fill(dataTable);
      if (dataBySimpleObject.Parameters["@PageTotal"].Value != DBNull.Value)
        PageTotal = int.Parse(dataBySimpleObject.Parameters["@PageTotal"].Value.ToString());
      if (dataBySimpleObject.Parameters["@RowTotal"].Value != DBNull.Value)
        RowTotal = int.Parse(dataBySimpleObject.Parameters["@RowTotal"].Value.ToString());
      this._Conn.Close();
      return dataTable;
    }

    public IEnumerable<SimpleMedicalInfo> GetByParent(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            try
      {
        this._Conn.Open();
        using (SqlCommand sqlCommand = new SqlCommand("MedicalInfoByChildObject", this._Conn))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleMedicalInfo Simple = new SimpleMedicalInfo();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              Simple.mnf_iidcuenta = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              Simple.mnf_iid = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              Simple.mnf_cprotegido = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              Simple.mnf_cdoctor = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              Simple.mnf_cobrasocial = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              Simple.mnf_nsexo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              Simple.mnf_ndiscapacitado = sqlDataReader.IsDBNull(8) ? new Decimal(0) : sqlDataReader.GetDecimal(8);
              Simple.mnf_nambulancia = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              Simple.mnf_nvivesolo = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              Simple.mnf_dfechanacimiento = sqlDataReader.IsDBNull(11) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(11);
              Simple.mnf_nedad = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              Simple.mnf_tobservaciones = sqlDataReader.IsDBNull(13) ? "" : sqlDataReader.GetString(13);
              Simple.mnf_casociado = sqlDataReader.IsDBNull(14) ? "" : sqlDataReader.GetString(14);
              yield return Simple;
            }
          }
        }
        this._Conn.Close();
      }
      finally
      {
        if (this._Conn.State != ConnectionState.Closed)
          this._Conn.Close();
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3019, "MedicalInfo");
      this._Conn = new SqlConnection();
      this._CmdIns = new SqlCommand("MedicalInfoIns");
      this._CmdSel = new SqlCommand("MedicalInfoSel");
      this._CmdUpd = new SqlCommand("MedicalInfoUpd");
      this._CmdDel = new SqlCommand("MedicalInfoDel");
      this._CmdChilds = new SqlCommand("MedicalInfoByChildObject");
      this._CmdParents = new SqlCommand("MedicalInfoByParentObject");
      this._CmdDataByName = new SqlCommand("MedicalInfoByName");
      this._CmdDataByNameWithChild = new SqlCommand("MedicalInfoByNameWithChild");
      this._CmdDataByNameWithParent = new SqlCommand("MedicalInfoByNameWithParent");
      this._CmdDataBySimpleObject = new SqlCommand("MedicalInfoBySimpleMedicalInfo");
      this._CmdDataByText = new SqlCommand("MedicalInfoByText");
      this._CmdDel.CommandType = CommandType.StoredProcedure;
      this._CmdDel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdIns.CommandType = CommandType.StoredProcedure;
      this._CmdIns.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_iidcuenta", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_iid", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_cprotegido", SqlDbType.NVarChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_cdoctor", SqlDbType.NChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_cobrasocial", SqlDbType.NChar));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_nsexo", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_ndiscapacitado", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_nambulancia", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_nvivesolo", SqlDbType.Decimal));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_dfechanacimiento", SqlDbType.DateTime));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_nedad", SqlDbType.Int));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_tobservaciones", SqlDbType.NText));
      this._CmdIns.Parameters.Add(new SqlParameter("@mnf_casociado", SqlDbType.NVarChar));
      this._CmdSel.CommandType = CommandType.StoredProcedure;
      this._CmdSel.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.CommandType = CommandType.StoredProcedure;
      this._CmdUpd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_iidcuenta", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_iid", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_cprotegido", SqlDbType.NVarChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_cdoctor", SqlDbType.NChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_cobrasocial", SqlDbType.NChar));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_nsexo", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_ndiscapacitado", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_nambulancia", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_nvivesolo", SqlDbType.Decimal));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_dfechanacimiento", SqlDbType.DateTime));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_nedad", SqlDbType.Int));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_tobservaciones", SqlDbType.NText));
      this._CmdUpd.Parameters.Add(new SqlParameter("@mnf_casociado", SqlDbType.NVarChar));
      this._CmdChilds.CommandType = CommandType.StoredProcedure;
      this._CmdChilds.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdChilds.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdParents.CommandType = CommandType.StoredProcedure;
      this._CmdParents.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdParents.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
      this._CmdDataByName.CommandType = CommandType.StoredProcedure;
      this._CmdDataByName.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByName.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
      this._CmdDataByName.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByName.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithChild.CommandType = CommandType.StoredProcedure;
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdDataByNameWithChild.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
      this._CmdDataByNameWithChild.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithChild.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithParent.CommandType = CommandType.StoredProcedure;
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
      this._CmdDataByNameWithParent.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
      this._CmdDataByNameWithParent.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByNameWithParent.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataBySimpleObject.CommandType = CommandType.StoredProcedure;
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_iidcuenta", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_iid", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_cprotegido", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_cdoctor", SqlDbType.NChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_cobrasocial", SqlDbType.NChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_nsexo", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_ndiscapacitado", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_nambulancia", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_nvivesolo", SqlDbType.Decimal));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_dfechanacimiento", SqlDbType.DateTime));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_nedad", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_tobservaciones", SqlDbType.NText));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@mnf_casociado", SqlDbType.NVarChar));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataBySimpleObject.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataBySimpleObject.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByText.CommandType = CommandType.StoredProcedure;
      this._CmdDataByText.Parameters.Add(new SqlParameter("@Text", SqlDbType.NVarChar));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
      this._CmdDataByText.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
      this._CmdDataByText.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
      this._CmdDataByText.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
    }

    private void SetConfig(SqlHelper SqlConfig)
    {
      this._Conn.ConnectionString = SqlConfig.GetConnString();
      this._CmdSel.Connection = this._Conn;
      this._CmdChilds.Connection = this._Conn;
      this._CmdParents.Connection = this._Conn;
      this._CmdDataByName.Connection = this._Conn;
      this._CmdDataByNameWithChild.Connection = this._Conn;
      this._CmdDataByNameWithParent.Connection = this._Conn;
      this._CmdDataBySimpleObject.Connection = this._Conn;
      this._CmdDataByText.Connection = this._Conn;
    }

    private void FillObject(SqlDataReader Reader)
    {
      while (Reader.Read())
      {
        this.Id = Reader.GetInt32(0);
        this.Name = Reader.GetString(1);
        this._mnf_iidcuenta = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        this._mnf_iid = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        this._mnf_cprotegido = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        this._mnf_cdoctor = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        this._mnf_cobrasocial = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        this._mnf_nsexo = Reader.IsDBNull(7) ? new Decimal(0) : Reader.GetDecimal(7);
        this._mnf_ndiscapacitado = Reader.IsDBNull(8) ? new Decimal(0) : Reader.GetDecimal(8);
        this._mnf_nambulancia = Reader.IsDBNull(9) ? new Decimal(0) : Reader.GetDecimal(9);
        this._mnf_nvivesolo = Reader.IsDBNull(10) ? new Decimal(0) : Reader.GetDecimal(10);
        this._mnf_dfechanacimiento = Reader.IsDBNull(11) ? new DateTime(1, 1, 1) : Reader.GetDateTime(11);
        this._mnf_nedad = Reader.IsDBNull(12) ? 0 : Reader.GetInt32(12);
        this._mnf_tobservaciones = Reader.IsDBNull(13) ? "" : Reader.GetString(13);
        this._mnf_casociado = Reader.IsDBNull(14) ? "" : Reader.GetString(14);
      }
      Reader.Close();
    }
  }
}
