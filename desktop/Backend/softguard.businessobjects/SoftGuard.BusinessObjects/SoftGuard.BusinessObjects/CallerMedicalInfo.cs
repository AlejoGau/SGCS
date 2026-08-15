// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerMedicalInfo
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerMedicalInfo : CallerObject
  {
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

    public CallerMedicalInfo()
    {
      this.InitClass();
    }

    public CallerMedicalInfo(int Id, string Name, int mnf_iidcuenta, int mnf_iid, string mnf_cprotegido, string mnf_cdoctor, string mnf_cobrasocial, Decimal mnf_nsexo, Decimal mnf_ndiscapacitado, Decimal mnf_nambulancia, Decimal mnf_nvivesolo, DateTime mnf_dfechanacimiento, int mnf_nedad, string mnf_tobservaciones, string mnf_casociado)
    {
      this.Id = Id;
      this.Name = Name;
      this._mnf_iidcuenta = mnf_iidcuenta;
      this._mnf_iid = mnf_iid;
      this._mnf_cprotegido = mnf_cprotegido;
      this._mnf_cdoctor = mnf_cdoctor;
      this._mnf_cobrasocial = mnf_cobrasocial;
      this._mnf_nsexo = mnf_nsexo;
      this._mnf_ndiscapacitado = mnf_ndiscapacitado;
      this._mnf_nambulancia = mnf_nambulancia;
      this._mnf_nvivesolo = mnf_nvivesolo;
      this._mnf_dfechanacimiento = mnf_dfechanacimiento;
      this._mnf_nedad = mnf_nedad;
      this._mnf_tobservaciones = mnf_tobservaciones;
      this._mnf_casociado = mnf_casociado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3019, "MedicalInfo");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
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
      return (SimpleBaseObject) simpleMedicalInfo;
    }

    public void SetSimpleObject(SimpleMedicalInfo Simple)
    {
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

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalMedicalInfo(SqlConfig, UserId, (SimpleMedicalInfo) this.GetSimpleObject());
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
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Caller")
      {
        EnforceConstraints = false,
        Tables = {
          this.GetDataObject(),
          this.Type.GetDataObject()
        }
      });
      if (this.Relation != null)
        xmlDataDocument.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
