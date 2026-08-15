// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleNota
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
  public class SimpleNota : SimpleBaseObject
  {
    [DataMember]
    public int not_iidcuenta { get; set; }

    [DataMember]
    public string not_mnotaprincipal { get; set; }

    [DataMember]
    public string not_mnotatemporal { get; set; }

    [DataMember]
    public DateTime not_dtemporaldesde { get; set; }

    [DataMember]
    public DateTime not_dtemporalhasta { get; set; }

    public SimpleNota()
    {
      this.InitClass();
    }

    public SimpleNota(int Id, string Name, int not_iidcuenta, string not_mnotaprincipal, string not_mnotatemporal, DateTime not_dtemporaldesde, DateTime not_dtemporalhasta)
    {
      this.Id = Id;
      this.Name = Name;
      this.not_iidcuenta = not_iidcuenta;
      this.not_mnotaprincipal = not_mnotaprincipal;
      this.not_mnotatemporal = not_mnotatemporal;
      this.not_dtemporaldesde = not_dtemporaldesde;
      this.not_dtemporalhasta = not_dtemporalhasta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3010, "Nota");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalNota(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerNota callerNota = new CallerNota();
      callerNota.Id = this.Id;
      callerNota.Name = this.Name;
      callerNota.not_iidcuenta = this.not_iidcuenta;
      callerNota.not_mnotaprincipal = this.not_mnotaprincipal;
      callerNota.not_mnotatemporal = this.not_mnotatemporal;
      callerNota.not_dtemporaldesde = this.not_dtemporaldesde;
      callerNota.not_dtemporalhasta = this.not_dtemporalhasta;
      return (CallerObject) callerNota;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("not_mnotaprincipal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_mnotatemporal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_dtemporaldesde", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("not_dtemporalhasta", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["not_iidcuenta"] = (object) this.not_iidcuenta;
      row["not_mnotaprincipal"] = (object) this.not_mnotaprincipal;
      row["not_mnotatemporal"] = (object) this.not_mnotatemporal;
      row["not_dtemporaldesde"] = (object) this.not_dtemporaldesde;
      row["not_dtemporalhasta"] = (object) this.not_dtemporalhasta;
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
