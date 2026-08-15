// Decompiled with JetBrains decompiler
// Type: SoftGuard.BussinesObjects.SimpleVehicle
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Runtime.Serialization;
using System.Xml;

namespace SoftGuard.BussinesObjects
{
  [DataContract]
  public class SimpleVehicle : SimpleBaseObject
  {
    [DataMember]
    public string Brand { get; set; }

    [DataMember]
    public string Model { get; set; }

    [DataMember]
    public int Year { get; set; }

    [DataMember]
    public string Domain { get; set; }

    [DataMember]
    public string Colour { get; set; }

    [DataMember]
    public string VehicleType { get; set; }

    [DataMember]
    public byte[] Photo { get; set; }

    [DataMember]
    public string PhotoType { get; set; }

    [DataMember]
    public int VehicleBrand { get; set; }

    [DataMember]
    public int VehicleModel { get; set; }

    [DataMember]
    public int OwnerTypeId { get; set; }

    [DataMember]
    public int OwnerId { get; set; }

    [DataMember]
    public int DriverTypeId { get; set; }

    [DataMember]
    public int DriverId { get; set; }

    [DataMember]
    public int MaxSpeed { get; set; }

    public SimpleVehicle()
    {
      this.InitClass();
    }

    public SimpleVehicle(int Id, string Name, string Brand, string Model, int Year, string Domain, string Colour, string VehicleType, byte[] Photo, string PhotoType, int VehicleBrand, int VehicleModel, int OwnerTypeId, int OwnerId, int DriverTypeId, int DriverId, int MaxSpeed)
    {
      this.Id = Id;
      this.Name = Name;
      this.Brand = Brand;
      this.Model = Model;
      this.Year = Year;
      this.Domain = Domain;
      this.Colour = Colour;
      this.VehicleType = VehicleType;
      this.Photo = Photo;
      this.PhotoType = PhotoType;
      this.VehicleBrand = VehicleBrand;
      this.VehicleModel = VehicleModel;
      this.OwnerTypeId = OwnerTypeId;
      this.OwnerId = OwnerId;
      this.DriverTypeId = DriverTypeId;
      this.DriverId = DriverId;
      this.MaxSpeed = MaxSpeed;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(659, "Vehicle");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalVehicle(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerVehicle callerVehicle = new CallerVehicle();
      callerVehicle.Id = this.Id;
      callerVehicle.Name = this.Name;
      callerVehicle.Brand = this.Brand;
      callerVehicle.Model = this.Model;
      callerVehicle.Year = this.Year;
      callerVehicle.Domain = this.Domain;
      callerVehicle.Colour = this.Colour;
      callerVehicle.VehicleType = this.VehicleType;
      callerVehicle.Photo = this.Photo;
      callerVehicle.PhotoType = this.PhotoType;
      callerVehicle.VehicleBrand = this.VehicleBrand;
      callerVehicle.VehicleModel = this.VehicleModel;
      callerVehicle.OwnerTypeId = this.OwnerTypeId;
      callerVehicle.OwnerId = this.OwnerId;
      callerVehicle.DriverTypeId = this.DriverTypeId;
      callerVehicle.DriverId = this.DriverId;
      callerVehicle.MaxSpeed = this.MaxSpeed;
      return (CallerObject) callerVehicle;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Brand", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Model", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Year", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Domain", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Colour", typeof (string)));
      dataTable.Columns.Add(new DataColumn("VehicleType", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Photo", typeof (byte[])));
      dataTable.Columns.Add(new DataColumn("PhotoType", typeof (string)));
      dataTable.Columns.Add(new DataColumn("VehicleBrand", typeof (int)));
      dataTable.Columns.Add(new DataColumn("VehicleModel", typeof (int)));
      dataTable.Columns.Add(new DataColumn("OwnerTypeId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("OwnerId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("DriverTypeId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("DriverId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("MaxSpeed", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Brand"] = (object) this.Brand ?? (object) DBNull.Value;
      row["Model"] = (object) this.Model ?? (object) DBNull.Value;
      row["Year"] = (object) this.Year ?? (object) DBNull.Value;
      row["Domain"] = (object) this.Domain ?? (object) DBNull.Value;
      row["Colour"] = (object) this.Colour ?? (object) DBNull.Value;
      row["VehicleType"] = (object) this.VehicleType ?? (object) DBNull.Value;
      row["Photo"] = (object) this.Photo ?? (object) DBNull.Value;
      row["PhotoType"] = (object) this.PhotoType ?? (object) DBNull.Value;
      row["VehicleBrand"] = (object) this.VehicleBrand ?? (object) DBNull.Value;
      row["VehicleModel"] = (object) this.VehicleModel ?? (object) DBNull.Value;
      row["OwnerTypeId"] = (object) this.OwnerTypeId ?? (object) DBNull.Value;
      row["OwnerId"] = (object) this.OwnerId ?? (object) DBNull.Value;
      row["DriverTypeId"] = (object) this.DriverTypeId ?? (object) DBNull.Value;
      row["DriverId"] = (object) this.DriverId ?? (object) DBNull.Value;
      row["MaxSpeed"] = (object) this.MaxSpeed ?? (object) DBNull.Value;
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
