// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimplePoi
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
  public class SimplePoi : SimpleBaseObject
  {
    [DataMember]
    public string FullAddress { get; set; }

    [DataMember]
    public string Icon { get; set; }

    [DataMember]
    public string Country { get; set; }

    [DataMember]
    public string State { get; set; }

    [DataMember]
    public string City { get; set; }

    [DataMember]
    public string Address { get; set; }

    [DataMember]
    public string Number { get; set; }

    [DataMember]
    public double Latitude { get; set; }

    [DataMember]
    public double Longitude { get; set; }

    [DataMember]
    public string CDealer { get; set; }

    [DataMember]
    public int Organization { get; set; }

    public SimplePoi()
    {
      this.InitClass();
    }

    public SimplePoi(int Id, string Name, string FullAddress, string Icon, string Country, string State, string City, string Address, string Number, double Latitude, double Longitude, string CDealer, int Organization)
    {
      this.Id = Id;
      this.Name = Name;
      this.FullAddress = FullAddress;
      this.Icon = Icon;
      this.Country = Country;
      this.State = State;
      this.City = City;
      this.Address = Address;
      this.Number = Number;
      this.Latitude = Latitude;
      this.Longitude = Longitude;
      this.CDealer = CDealer;
      this.Organization = Organization;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3044, "Poi");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalPoi(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerPoi callerPoi = new CallerPoi();
      callerPoi.Id = this.Id;
      callerPoi.Name = this.Name;
      callerPoi.FullAddress = this.FullAddress;
      callerPoi.Icon = this.Icon;
      callerPoi.Country = this.Country;
      callerPoi.State = this.State;
      callerPoi.City = this.City;
      callerPoi.Address = this.Address;
      callerPoi.Number = this.Number;
      callerPoi.Latitude = this.Latitude;
      callerPoi.Longitude = this.Longitude;
      callerPoi.CDealer = this.CDealer;
      callerPoi.Organization = this.Organization;
      return (CallerObject) callerPoi;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("FullAddress", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Icon", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Country", typeof (string)));
      dataTable.Columns.Add(new DataColumn("State", typeof (string)));
      dataTable.Columns.Add(new DataColumn("City", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Address", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Number", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Latitude", typeof (double)));
      dataTable.Columns.Add(new DataColumn("Longitude", typeof (double)));
      dataTable.Columns.Add(new DataColumn("CDealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Organization", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["FullAddress"] = (object) this.FullAddress ?? (object) DBNull.Value;
      row["Icon"] = (object) this.Icon ?? (object) DBNull.Value;
      row["Country"] = (object) this.Country ?? (object) DBNull.Value;
      row["State"] = (object) this.State ?? (object) DBNull.Value;
      row["City"] = (object) this.City ?? (object) DBNull.Value;
      row["Address"] = (object) this.Address ?? (object) DBNull.Value;
      row["Number"] = (object) this.Number ?? (object) DBNull.Value;
      row["Latitude"] = (object) this.Latitude ?? (object) DBNull.Value;
      row["Longitude"] = (object) this.Longitude ?? (object) DBNull.Value;
      row["CDealer"] = (object) this.CDealer ?? (object) DBNull.Value;
      row["Organization"] = (object) this.Organization ?? (object) DBNull.Value;
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
