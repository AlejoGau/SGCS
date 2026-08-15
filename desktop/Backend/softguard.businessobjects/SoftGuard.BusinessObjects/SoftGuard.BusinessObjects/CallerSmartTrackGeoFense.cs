// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSmartTrackGeoFense
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerSmartTrackGeoFense : CallerObject
  {
    private string _GeoType;
    private string _Imei;
    private string _MetaData;
    private string _Style;
    private int _Status;

    public string GeoType
    {
      get
      {
        return this._GeoType;
      }
      set
      {
        this._GeoType = value;
      }
    }

    public string Imei
    {
      get
      {
        return this._Imei;
      }
      set
      {
        this._Imei = value;
      }
    }

    public string MetaData
    {
      get
      {
        return this._MetaData;
      }
      set
      {
        this._MetaData = value;
      }
    }

    public string Style
    {
      get
      {
        return this._Style;
      }
      set
      {
        this._Style = value;
      }
    }

    public int Status
    {
      get
      {
        return this._Status;
      }
      set
      {
        this._Status = value;
      }
    }

    public CallerSmartTrackGeoFense()
    {
      this.InitClass();
    }

    public CallerSmartTrackGeoFense(int Id, string Name, string GeoType, string Imei, string MetaData, string Style, int Status)
    {
      this.Id = Id;
      this.Name = Name;
      this._GeoType = GeoType;
      this._Imei = Imei;
      this._MetaData = MetaData;
      this._Style = Style;
      this._Status = Status;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3112, "SmartTrackGeoFense");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSmartTrackGeoFense smartTrackGeoFense = new SimpleSmartTrackGeoFense();
      smartTrackGeoFense.Id = this.Id;
      smartTrackGeoFense.Name = this.Name;
      smartTrackGeoFense.GeoType = this._GeoType;
      smartTrackGeoFense.Imei = this._Imei;
      smartTrackGeoFense.MetaData = this._MetaData;
      smartTrackGeoFense.Style = this._Style;
      smartTrackGeoFense.Status = this._Status;
      return (SimpleBaseObject) smartTrackGeoFense;
    }

    public void SetSimpleObject(SimpleSmartTrackGeoFense Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._GeoType = Simple.GeoType;
      this._Imei = Simple.Imei;
      this._MetaData = Simple.MetaData;
      this._Style = Simple.Style;
      this._Status = Simple.Status;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSmartTrackGeoFense(SqlConfig, UserId, (SimpleSmartTrackGeoFense) this.GetSimpleObject());
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
      row["GeoType"] = (object) this._GeoType;
      row["Imei"] = (object) this._Imei;
      row["MetaData"] = (object) this._MetaData;
      row["Style"] = (object) this._Style;
      row["Status"] = (object) this._Status;
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
