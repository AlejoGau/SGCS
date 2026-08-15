// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleGeoFenseCuenta
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
  public class SimpleGeoFenseCuenta : SimpleBaseObject
  {
    [DataMember]
    public int GeoFenseId { get; set; }

    [DataMember]
    public int CuentaId { get; set; }

    public SimpleGeoFenseCuenta()
    {
      this.InitClass();
    }

    public SimpleGeoFenseCuenta(int Id, string Name, int GeoFenseId, int CuentaId)
    {
      this.Id = Id;
      this.Name = Name;
      this.GeoFenseId = GeoFenseId;
      this.CuentaId = CuentaId;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3061, "GeoFenseCuenta");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalGeoFenseCuenta(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerGeoFenseCuenta callerGeoFenseCuenta = new CallerGeoFenseCuenta();
      callerGeoFenseCuenta.Id = this.Id;
      callerGeoFenseCuenta.Name = this.Name;
      callerGeoFenseCuenta.GeoFenseId = this.GeoFenseId;
      callerGeoFenseCuenta.CuentaId = this.CuentaId;
      return (CallerObject) callerGeoFenseCuenta;
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
      row["GeoFenseId"] = (object) this.GeoFenseId ?? (object) DBNull.Value;
      row["CuentaId"] = (object) this.CuentaId ?? (object) DBNull.Value;
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
