// Decompiled with JetBrains decompiler
// Type: SoftGuard.BussinesObjects.CallerVehicle
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BussinesObjects
{
  public class CallerVehicle : CallerObject
  {
    private string _Brand;
    private string _Model;
    private int _Year;
    private string _Domain;
    private string _Colour;
    private string _VehicleType;
    private byte[] _Photo;
    private string _PhotoType;
    private int _VehicleBrand;
    private int _VehicleModel;
    private int _OwnerTypeId;
    private int _OwnerId;
    private int _DriverTypeId;
    private int _DriverId;
    private int _MaxSpeed;

    public string Brand
    {
      get
      {
        return this._Brand;
      }
      set
      {
        this._Brand = value;
      }
    }

    public string Model
    {
      get
      {
        return this._Model;
      }
      set
      {
        this._Model = value;
      }
    }

    public int Year
    {
      get
      {
        return this._Year;
      }
      set
      {
        this._Year = value;
      }
    }

    public string Domain
    {
      get
      {
        return this._Domain;
      }
      set
      {
        this._Domain = value;
      }
    }

    public string Colour
    {
      get
      {
        return this._Colour;
      }
      set
      {
        this._Colour = value;
      }
    }

    public string VehicleType
    {
      get
      {
        return this._VehicleType;
      }
      set
      {
        this._VehicleType = value;
      }
    }

    public byte[] Photo
    {
      get
      {
        return this._Photo;
      }
      set
      {
        this._Photo = value;
      }
    }

    public string PhotoType
    {
      get
      {
        return this._PhotoType;
      }
      set
      {
        this._PhotoType = value;
      }
    }

    public int VehicleBrand
    {
      get
      {
        return this._VehicleBrand;
      }
      set
      {
        this._VehicleBrand = value;
      }
    }

    public int VehicleModel
    {
      get
      {
        return this._VehicleModel;
      }
      set
      {
        this._VehicleModel = value;
      }
    }

    public int OwnerTypeId
    {
      get
      {
        return this._OwnerTypeId;
      }
      set
      {
        this._OwnerTypeId = value;
      }
    }

    public int OwnerId
    {
      get
      {
        return this._OwnerId;
      }
      set
      {
        this._OwnerId = value;
      }
    }

    public int DriverTypeId
    {
      get
      {
        return this._DriverTypeId;
      }
      set
      {
        this._DriverTypeId = value;
      }
    }

    public int DriverId
    {
      get
      {
        return this._DriverId;
      }
      set
      {
        this._DriverId = value;
      }
    }

    public int MaxSpeed
    {
      get
      {
        return this._MaxSpeed;
      }
      set
      {
        this._MaxSpeed = value;
      }
    }

    public CallerVehicle()
    {
      this.InitClass();
    }

    public CallerVehicle(int Id, string Name, string Brand, string Model, int Year, string Domain, string Colour, string VehicleType, byte[] Photo, string PhotoType, int VehicleBrand, int VehicleModel, int OwnerTypeId, int OwnerId, int DriverTypeId, int DriverId, int MaxSpeed)
    {
      this.Id = Id;
      this.Name = Name;
      this._Brand = Brand;
      this._Model = Model;
      this._Year = Year;
      this._Domain = Domain;
      this._Colour = Colour;
      this._VehicleType = VehicleType;
      this._Photo = Photo;
      this._PhotoType = PhotoType;
      this._VehicleBrand = VehicleBrand;
      this._VehicleModel = VehicleModel;
      this._OwnerTypeId = OwnerTypeId;
      this._OwnerId = OwnerId;
      this._DriverTypeId = DriverTypeId;
      this._DriverId = DriverId;
      this._MaxSpeed = MaxSpeed;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(659, "Vehicle");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleVehicle simpleVehicle = new SimpleVehicle();
      simpleVehicle.Id = this.Id;
      simpleVehicle.Name = this.Name;
      simpleVehicle.Brand = this._Brand;
      simpleVehicle.Model = this._Model;
      simpleVehicle.Year = this._Year;
      simpleVehicle.Domain = this._Domain;
      simpleVehicle.Colour = this._Colour;
      simpleVehicle.VehicleType = this._VehicleType;
      simpleVehicle.Photo = this._Photo;
      simpleVehicle.PhotoType = this._PhotoType;
      simpleVehicle.VehicleBrand = this._VehicleBrand;
      simpleVehicle.VehicleModel = this._VehicleModel;
      simpleVehicle.OwnerTypeId = this._OwnerTypeId;
      simpleVehicle.OwnerId = this._OwnerId;
      simpleVehicle.DriverTypeId = this._DriverTypeId;
      simpleVehicle.DriverId = this._DriverId;
      simpleVehicle.MaxSpeed = this._MaxSpeed;
      return (SimpleBaseObject) simpleVehicle;
    }

    public void SetSimpleObject(SimpleVehicle Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Brand = Simple.Brand;
      this._Model = Simple.Model;
      this._Year = Simple.Year;
      this._Domain = Simple.Domain;
      this._Colour = Simple.Colour;
      this._VehicleType = Simple.VehicleType;
      this._Photo = Simple.Photo;
      this._PhotoType = Simple.PhotoType;
      this._VehicleBrand = Simple.VehicleBrand;
      this._VehicleModel = Simple.VehicleModel;
      this._OwnerTypeId = Simple.OwnerTypeId;
      this._OwnerId = Simple.OwnerId;
      this._DriverTypeId = Simple.DriverTypeId;
      this._DriverId = Simple.DriverId;
      this._MaxSpeed = Simple.MaxSpeed;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalVehicle(SqlConfig, UserId, (SimpleVehicle) this.GetSimpleObject());
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
      row["Brand"] = (object) this._Brand;
      row["Model"] = (object) this._Model;
      row["Year"] = (object) this._Year;
      row["Domain"] = (object) this._Domain;
      row["Colour"] = (object) this._Colour;
      row["VehicleType"] = (object) this._VehicleType;
      row["Photo"] = (object) this._Photo;
      row["PhotoType"] = (object) this._PhotoType;
      row["VehicleBrand"] = (object) this._VehicleBrand;
      row["VehicleModel"] = (object) this._VehicleModel;
      row["OwnerTypeId"] = (object) this._OwnerTypeId;
      row["OwnerId"] = (object) this._OwnerId;
      row["DriverTypeId"] = (object) this._DriverTypeId;
      row["DriverId"] = (object) this._DriverId;
      row["MaxSpeed"] = (object) this._MaxSpeed;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Caller") { EnforceConstraints = false, Tables = { this.GetDataObject(), this.Type.GetDataObject() } });
      if (this.Relation != null)
        xmlDataDocument.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
