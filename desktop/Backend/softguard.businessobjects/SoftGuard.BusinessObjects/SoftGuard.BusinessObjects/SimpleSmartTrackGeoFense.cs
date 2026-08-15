// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleSmartTrackGeoFense
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
  public class SimpleSmartTrackGeoFense : SimpleBaseObject
  {
    [DataMember]
    public string GeoType { get; set; }

    [DataMember]
    public string Imei { get; set; }

    [DataMember]
    public string MetaData { get; set; }

    [DataMember]
    public string Style { get; set; }

    [DataMember]
    public int Status { get; set; }

    public SimpleSmartTrackGeoFense()
    {
      this.InitClass();
    }

    public SimpleSmartTrackGeoFense(int Id, string Name, string GeoType, string Imei, string MetaData, string Style, int Status)
    {
      this.Id = Id;
      this.Name = Name;
      this.GeoType = GeoType;
      this.Imei = Imei;
      this.MetaData = MetaData;
      this.Style = Style;
      this.Status = Status;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3112, "SmartTrackGeoFense");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalSmartTrackGeoFense(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerSmartTrackGeoFense smartTrackGeoFense = new CallerSmartTrackGeoFense();
      smartTrackGeoFense.Id = this.Id;
      smartTrackGeoFense.Name = this.Name;
      smartTrackGeoFense.GeoType = this.GeoType;
      smartTrackGeoFense.Imei = this.Imei;
      smartTrackGeoFense.MetaData = this.MetaData;
      smartTrackGeoFense.Style = this.Style;
      smartTrackGeoFense.Status = this.Status;
      return (CallerObject) smartTrackGeoFense;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("GeoType", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Imei", typeof (string)));
      dataTable.Columns.Add(new DataColumn("MetaData", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Style", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Status", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["GeoType"] = (object) this.GeoType ?? (object) DBNull.Value;
      row["Imei"] = (object) this.Imei ?? (object) DBNull.Value;
      row["MetaData"] = (object) this.MetaData ?? (object) DBNull.Value;
      row["Style"] = (object) this.Style ?? (object) DBNull.Value;
      row["Status"] = (object) this.Status ?? (object) DBNull.Value;
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
