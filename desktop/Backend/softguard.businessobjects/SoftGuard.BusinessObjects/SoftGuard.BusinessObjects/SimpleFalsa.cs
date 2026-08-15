// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleFalsa
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
  public class SimpleFalsa : SimpleBaseObject
  {
    [DataMember]
    public int fal_iidcuenta { get; set; }

    [DataMember]
    public Decimal fal_nmargen { get; set; }

    [DataMember]
    public Decimal fal_nmeses { get; set; }

    [DataMember]
    public string fal_mnota { get; set; }

    public SimpleFalsa()
    {
      this.InitClass();
    }

    public SimpleFalsa(int Id, string Name, int fal_iidcuenta, Decimal fal_nmargen, Decimal fal_nmeses, string fal_mnota)
    {
      this.Id = Id;
      this.Name = Name;
      this.fal_iidcuenta = fal_iidcuenta;
      this.fal_nmargen = fal_nmargen;
      this.fal_nmeses = fal_nmeses;
      this.fal_mnota = fal_mnota;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3002, "Falsa");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalFalsa(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerFalsa callerFalsa = new CallerFalsa();
      callerFalsa.Id = this.Id;
      callerFalsa.Name = this.Name;
      callerFalsa.fal_iidcuenta = this.fal_iidcuenta;
      callerFalsa.fal_nmargen = this.fal_nmargen;
      callerFalsa.fal_nmeses = this.fal_nmeses;
      callerFalsa.fal_mnota = this.fal_mnota;
      return (CallerObject) callerFalsa;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("fal_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("fal_nmargen", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("fal_nmeses", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("fal_mnota", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["fal_iidcuenta"] = (object) this.fal_iidcuenta;
      row["fal_nmargen"] = (object) this.fal_nmargen;
      row["fal_nmeses"] = (object) this.fal_nmeses;
      row["fal_mnota"] = (object) this.fal_mnota;
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
