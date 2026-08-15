// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerGeoFenseCuenta
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerGeoFenseCuenta : CallerObject
  {
    private int _GeoFenseId;
    private int _CuentaId;

    public int GeoFenseId
    {
      get
      {
        return this._GeoFenseId;
      }
      set
      {
        this._GeoFenseId = value;
      }
    }

    public int CuentaId
    {
      get
      {
        return this._CuentaId;
      }
      set
      {
        this._CuentaId = value;
      }
    }

    public CallerGeoFenseCuenta()
    {
      this.InitClass();
    }

    public CallerGeoFenseCuenta(int Id, string Name, int GeoFenseId, int CuentaId)
    {
      this.Id = Id;
      this.Name = Name;
      this._GeoFenseId = GeoFenseId;
      this._CuentaId = CuentaId;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3061, "GeoFenseCuenta");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleGeoFenseCuenta simpleGeoFenseCuenta = new SimpleGeoFenseCuenta();
      simpleGeoFenseCuenta.Id = this.Id;
      simpleGeoFenseCuenta.Name = this.Name;
      simpleGeoFenseCuenta.GeoFenseId = this._GeoFenseId;
      simpleGeoFenseCuenta.CuentaId = this._CuentaId;
      return (SimpleBaseObject) simpleGeoFenseCuenta;
    }

    public void SetSimpleObject(SimpleGeoFenseCuenta Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._GeoFenseId = Simple.GeoFenseId;
      this._CuentaId = Simple.CuentaId;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalGeoFenseCuenta(SqlConfig, UserId, (SimpleGeoFenseCuenta) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("GeoFenseId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("CuentaId", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["GeoFenseId"] = (object) this._GeoFenseId;
      row["CuentaId"] = (object) this._CuentaId;
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
