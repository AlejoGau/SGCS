// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleHorarioAlternativoPlantilla
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
  public class SimpleHorarioAlternativoPlantilla : SimpleBaseObject
  {
    [DataMember]
    public int Alt_iid { get; set; }

    [DataMember]
    public Decimal Alt_ndiaapertura { get; set; }

    [DataMember]
    public string Alt_choraapertura { get; set; }

    [DataMember]
    public Decimal Alt_ndiacierre { get; set; }

    [DataMember]
    public string Alt_choracierre { get; set; }

    public SimpleHorarioAlternativoPlantilla()
    {
      this.InitClass();
    }

    public SimpleHorarioAlternativoPlantilla(int Id, string Name, int Alt_iid, Decimal Alt_ndiaapertura, string Alt_choraapertura, Decimal Alt_ndiacierre, string Alt_choracierre)
    {
      this.Id = Id;
      this.Name = Name;
      this.Alt_iid = Alt_iid;
      this.Alt_ndiaapertura = Alt_ndiaapertura;
      this.Alt_choraapertura = Alt_choraapertura;
      this.Alt_ndiacierre = Alt_ndiacierre;
      this.Alt_choracierre = Alt_choracierre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3005, "HorarioAlternativoPlantilla");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalHorarioAlternativoPlantilla(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioAlternativoPlantilla alternativoPlantilla = new CallerHorarioAlternativoPlantilla();
      alternativoPlantilla.Id = this.Id;
      alternativoPlantilla.Name = this.Name;
      alternativoPlantilla.Alt_iid = this.Alt_iid;
      alternativoPlantilla.Alt_ndiaapertura = this.Alt_ndiaapertura;
      alternativoPlantilla.Alt_choraapertura = this.Alt_choraapertura;
      alternativoPlantilla.Alt_ndiacierre = this.Alt_ndiacierre;
      alternativoPlantilla.Alt_choracierre = this.Alt_choracierre;
      return (CallerObject) alternativoPlantilla;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Alt_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Alt_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("Alt_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Alt_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("Alt_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Alt_iid"] = (object) this.Alt_iid ?? (object) DBNull.Value;
      row["Alt_ndiaapertura"] = (object) this.Alt_ndiaapertura ?? (object) DBNull.Value;
      row["Alt_choraapertura"] = (object) this.Alt_choraapertura ?? (object) DBNull.Value;
      row["Alt_ndiacierre"] = (object) this.Alt_ndiacierre ?? (object) DBNull.Value;
      row["Alt_choracierre"] = (object) this.Alt_choracierre ?? (object) DBNull.Value;
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
