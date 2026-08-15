// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerPoi
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerPoi : CallerObject
  {
    private string _FullAddress;
    private string _Icon;
    private string _Country;
    private string _State;
    private string _City;
    private string _Address;
    private string _Number;
    private double _Latitude;
    private double _Longitude;
    private string _CDealer;
    private int _Organization;

    public string FullAddress
    {
      get
      {
        return this._FullAddress;
      }
      set
      {
        this._FullAddress = value;
      }
    }

    public string Icon
    {
      get
      {
        return this._Icon;
      }
      set
      {
        this._Icon = value;
      }
    }

    public string Country
    {
      get
      {
        return this._Country;
      }
      set
      {
        this._Country = value;
      }
    }

    public string State
    {
      get
      {
        return this._State;
      }
      set
      {
        this._State = value;
      }
    }

    public string City
    {
      get
      {
        return this._City;
      }
      set
      {
        this._City = value;
      }
    }

    public string Address
    {
      get
      {
        return this._Address;
      }
      set
      {
        this._Address = value;
      }
    }

    public string Number
    {
      get
      {
        return this._Number;
      }
      set
      {
        this._Number = value;
      }
    }

    public double Latitude
    {
      get
      {
        return this._Latitude;
      }
      set
      {
        this._Latitude = value;
      }
    }

    public double Longitude
    {
      get
      {
        return this._Longitude;
      }
      set
      {
        this._Longitude = value;
      }
    }

    public string CDealer
    {
      get
      {
        return this._CDealer;
      }
      set
      {
        this._CDealer = value;
      }
    }

    public int Organization
    {
      get
      {
        return this._Organization;
      }
      set
      {
        this._Organization = value;
      }
    }

    public CallerPoi()
    {
      this.InitClass();
    }

    public CallerPoi(int Id, string Name, string FullAddress, string Icon, string Country, string State, string City, string Address, string Number, double Latitude, double Longitude, string CDealer, int Organization)
    {
      this.Id = Id;
      this.Name = Name;
      this._FullAddress = FullAddress;
      this._Icon = Icon;
      this._Country = Country;
      this._State = State;
      this._City = City;
      this._Address = Address;
      this._Number = Number;
      this._Latitude = Latitude;
      this._Longitude = Longitude;
      this._CDealer = CDealer;
      this._Organization = Organization;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3044, "Poi");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimplePoi simplePoi = new SimplePoi();
      simplePoi.Id = this.Id;
      simplePoi.Name = this.Name;
      simplePoi.FullAddress = this._FullAddress;
      simplePoi.Icon = this._Icon;
      simplePoi.Country = this._Country;
      simplePoi.State = this._State;
      simplePoi.City = this._City;
      simplePoi.Address = this._Address;
      simplePoi.Number = this._Number;
      simplePoi.Latitude = this._Latitude;
      simplePoi.Longitude = this._Longitude;
      simplePoi.CDealer = this._CDealer;
      simplePoi.Organization = this._Organization;
      return (SimpleBaseObject) simplePoi;
    }

    public void SetSimpleObject(SimplePoi Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._FullAddress = Simple.FullAddress;
      this._Icon = Simple.Icon;
      this._Country = Simple.Country;
      this._State = Simple.State;
      this._City = Simple.City;
      this._Address = Simple.Address;
      this._Number = Simple.Number;
      this._Latitude = Simple.Latitude;
      this._Longitude = Simple.Longitude;
      this._CDealer = Simple.CDealer;
      this._Organization = Simple.Organization;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalPoi(SqlConfig, UserId, (SimplePoi) this.GetSimpleObject());
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
      row["FullAddress"] = (object) this._FullAddress;
      row["Icon"] = (object) this._Icon;
      row["Country"] = (object) this._Country;
      row["State"] = (object) this._State;
      row["City"] = (object) this._City;
      row["Address"] = (object) this._Address;
      row["Number"] = (object) this._Number;
      row["Latitude"] = (object) this._Latitude;
      row["Longitude"] = (object) this._Longitude;
      row["CDealer"] = (object) this._CDealer;
      row["Organization"] = (object) this._Organization;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Caller")
      {
        EnforceConstraints = false,
        Tables = {
          this.GetDataObject(),
          this.Type.GetDataObject()
        }
      });
      if (this.Relation != null)
        xmlDataDocument.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
