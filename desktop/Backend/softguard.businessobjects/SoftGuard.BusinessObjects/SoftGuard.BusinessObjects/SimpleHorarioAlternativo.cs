// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleHorarioAlternativo
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
  public class SimpleHorarioAlternativo : SimpleBaseObject
  {
    [DataMember]
    public int alt_iidcuenta { get; set; }

    [DataMember]
    public Decimal alt_ndiaapertura { get; set; }

    [DataMember]
    public string alt_choraapertura { get; set; }

    [DataMember]
    public Decimal alt_ndiacierre { get; set; }

    [DataMember]
    public string alt_choracierre { get; set; }

    public SimpleHorarioAlternativo()
    {
      this.InitClass();
    }

    public SimpleHorarioAlternativo(int Id, string Name, int alt_iidcuenta, Decimal alt_ndiaapertura, string alt_choraapertura, Decimal alt_ndiacierre, string alt_choracierre)
    {
      this.Id = Id;
      this.Name = Name;
      this.alt_iidcuenta = alt_iidcuenta;
      this.alt_ndiaapertura = alt_ndiaapertura;
      this.alt_choraapertura = alt_choraapertura;
      this.alt_ndiacierre = alt_ndiacierre;
      this.alt_choracierre = alt_choracierre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3004, "HorarioAlternativo");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalHorarioAlternativo(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioAlternativo horarioAlternativo = new CallerHorarioAlternativo();
      horarioAlternativo.Id = this.Id;
      horarioAlternativo.Name = this.Name;
      horarioAlternativo.alt_iidcuenta = this.alt_iidcuenta;
      horarioAlternativo.alt_ndiaapertura = this.alt_ndiaapertura;
      horarioAlternativo.alt_choraapertura = this.alt_choraapertura;
      horarioAlternativo.alt_ndiacierre = this.alt_ndiacierre;
      horarioAlternativo.alt_choracierre = this.alt_choracierre;
      return (CallerObject) horarioAlternativo;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("alt_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("alt_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("alt_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("alt_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("alt_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["alt_iidcuenta"] = (object) this.alt_iidcuenta;
      row["alt_ndiaapertura"] = (object) this.alt_ndiaapertura;
      row["alt_choraapertura"] = (object) this.alt_choraapertura;
      row["alt_ndiacierre"] = (object) this.alt_ndiacierre;
      row["alt_choracierre"] = (object) this.alt_choracierre;
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
