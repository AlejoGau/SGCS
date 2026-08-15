// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleMedicalInfo
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Runtime.Serialization;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  [DataContract]
  public class SimpleMedicalInfo : SimpleBaseObject
  {
    [DataMember]
    public int mnf_iidcuenta { get; set; }

    [DataMember]
    public int mnf_iid { get; set; }

    [DataMember]
    public string mnf_cprotegido { get; set; }

    [DataMember]
    public string mnf_cdoctor { get; set; }

    [DataMember]
    public string mnf_cobrasocial { get; set; }

    [DataMember]
    public Decimal mnf_nsexo { get; set; }

    [DataMember]
    public Decimal mnf_ndiscapacitado { get; set; }

    [DataMember]
    public Decimal mnf_nambulancia { get; set; }

    [DataMember]
    public Decimal mnf_nvivesolo { get; set; }

    [DataMember]
    public DateTime mnf_dfechanacimiento { get; set; }

    [DataMember]
    public int mnf_nedad { get; set; }

    [DataMember]
    public string mnf_tobservaciones { get; set; }

    [DataMember]
    public string mnf_casociado { get; set; }

    public SimpleMedicalInfo()
    {
      this.InitClass();
    }

    public SimpleMedicalInfo(int Id, string Name, int mnf_iidcuenta, int mnf_iid, string mnf_cprotegido, string mnf_cdoctor, string mnf_cobrasocial, Decimal mnf_nsexo, Decimal mnf_ndiscapacitado, Decimal mnf_nambulancia, Decimal mnf_nvivesolo, DateTime mnf_dfechanacimiento, int mnf_nedad, string mnf_tobservaciones, string mnf_casociado)
    {
      this.Id = Id;
      this.Name = Name;
      this.mnf_iidcuenta = mnf_iidcuenta;
      this.mnf_iid = mnf_iid;
      this.mnf_cprotegido = mnf_cprotegido;
      this.mnf_cdoctor = mnf_cdoctor;
      this.mnf_cobrasocial = mnf_cobrasocial;
      this.mnf_nsexo = mnf_nsexo;
      this.mnf_ndiscapacitado = mnf_ndiscapacitado;
      this.mnf_nambulancia = mnf_nambulancia;
      this.mnf_nvivesolo = mnf_nvivesolo;
      this.mnf_dfechanacimiento = mnf_dfechanacimiento;
      this.mnf_nedad = mnf_nedad;
      this.mnf_tobservaciones = mnf_tobservaciones;
      this.mnf_casociado = mnf_casociado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3019, "MedicalInfo");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalMedicalInfo(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerMedicalInfo callerMedicalInfo = new CallerMedicalInfo();
      callerMedicalInfo.Id = this.Id;
      callerMedicalInfo.Name = this.Name;
      callerMedicalInfo.mnf_iidcuenta = this.mnf_iidcuenta;
      callerMedicalInfo.mnf_iid = this.mnf_iid;
      callerMedicalInfo.mnf_cprotegido = this.mnf_cprotegido;
      callerMedicalInfo.mnf_cdoctor = this.mnf_cdoctor;
      callerMedicalInfo.mnf_cobrasocial = this.mnf_cobrasocial;
      callerMedicalInfo.mnf_nsexo = this.mnf_nsexo;
      callerMedicalInfo.mnf_ndiscapacitado = this.mnf_ndiscapacitado;
      callerMedicalInfo.mnf_nambulancia = this.mnf_nambulancia;
      callerMedicalInfo.mnf_nvivesolo = this.mnf_nvivesolo;
      callerMedicalInfo.mnf_dfechanacimiento = this.mnf_dfechanacimiento;
      callerMedicalInfo.mnf_nedad = this.mnf_nedad;
      callerMedicalInfo.mnf_tobservaciones = this.mnf_tobservaciones;
      callerMedicalInfo.mnf_casociado = this.mnf_casociado;
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
      row["mnf_iidcuenta"] = (object) this.mnf_iidcuenta;
      row["mnf_iid"] = (object) this.mnf_iid;
      row["mnf_cprotegido"] = (object) this.mnf_cprotegido;
      row["mnf_cdoctor"] = (object) this.mnf_cdoctor;
      row["mnf_cobrasocial"] = (object) this.mnf_cobrasocial;
      row["mnf_nsexo"] = (object) this.mnf_nsexo;
      row["mnf_ndiscapacitado"] = (object) this.mnf_ndiscapacitado;
      row["mnf_nambulancia"] = (object) this.mnf_nambulancia;
      row["mnf_nvivesolo"] = (object) this.mnf_nvivesolo;
      row["mnf_dfechanacimiento"] = (object) this.mnf_dfechanacimiento;
      row["mnf_nedad"] = (object) this.mnf_nedad;
      row["mnf_tobservaciones"] = (object) this.mnf_tobservaciones;
      row["mnf_casociado"] = (object) this.mnf_casociado;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Object") { EnforceConstraints = false, Tables = { this.GetDataObject(), this.Type.GetDataObject() } });
      if (this.CallerObject != null)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;
      if (this.Dependencies.Count != 0)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
