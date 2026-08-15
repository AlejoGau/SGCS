// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_template_contrato
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
  public class Simplem_template_contrato : SimpleBaseObject
  {
    [DataMember]
    public string tmp_asunto { get; set; }

    [DataMember]
    public string tmp_cuerpo { get; set; }

    [DataMember]
    public string tmp_metadata { get; set; }

    [DataMember]
    public int tmp_iorganizacion { get; set; }

    [DataMember]
    public int tmp_itipo { get; set; }

    public Simplem_template_contrato()
    {
      this.InitClass();
    }

    public Simplem_template_contrato(int Id, string Name, string tmp_asunto, string tmp_cuerpo, string tmp_metadata, int tmp_iorganizacion, int tmp_itipo)
    {
      this.Id = Id;
      this.Name = Name;
      this.tmp_asunto = tmp_asunto;
      this.tmp_cuerpo = tmp_cuerpo;
      this.tmp_metadata = tmp_metadata;
      this.tmp_iorganizacion = tmp_iorganizacion;
      this.tmp_itipo = tmp_itipo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3158, "m_template_contrato");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_template_contrato(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_template_contrato templateContrato = new Callerm_template_contrato();
      templateContrato.Id = this.Id;
      templateContrato.Name = this.Name;
      templateContrato.tmp_asunto = this.tmp_asunto;
      templateContrato.tmp_cuerpo = this.tmp_cuerpo;
      templateContrato.tmp_metadata = this.tmp_metadata;
      templateContrato.tmp_iorganizacion = this.tmp_iorganizacion;
      templateContrato.tmp_itipo = this.tmp_itipo;
      return (CallerObject) templateContrato;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_asunto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cuerpo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_metadata", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_iorganizacion", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tmp_itipo", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tmp_asunto"] = (object) this.tmp_asunto ?? (object) DBNull.Value;
      row["tmp_cuerpo"] = (object) this.tmp_cuerpo ?? (object) DBNull.Value;
      row["tmp_metadata"] = (object) this.tmp_metadata ?? (object) DBNull.Value;
      row["tmp_iorganizacion"] = (object) this.tmp_iorganizacion ?? (object) DBNull.Value;
      row["tmp_itipo"] = (object) this.tmp_itipo ?? (object) DBNull.Value;
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
