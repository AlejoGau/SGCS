// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleGps
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
  public class SimpleGps : SimpleBaseObject
  {
    [DataMember]
    public DateTime gps_tfechahora { get; set; }

    [DataMember]
    public int gps_idCuenta { get; set; }

    [DataMember]
    public int gps_idRec { get; set; }

    [DataMember]
    public float gps_rLatitud { get; set; }

    [DataMember]
    public float gps_rLongitud { get; set; }

    public SimpleGps()
    {
      this.InitClass();
    }

    public SimpleGps(int Id, string Name, DateTime gps_tfechahora, int gps_idCuenta, int gps_idRec, float gps_rLatitud, float gps_rLongitud)
    {
      this.Id = Id;
      this.Name = Name;
      this.gps_tfechahora = gps_tfechahora;
      this.gps_idCuenta = gps_idCuenta;
      this.gps_idRec = gps_idRec;
      this.gps_rLatitud = gps_rLatitud;
      this.gps_rLongitud = gps_rLongitud;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3038, "Gps");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalGps(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerGps callerGps = new CallerGps();
      callerGps.Id = this.Id;
      callerGps.Name = this.Name;
      callerGps.gps_tfechahora = this.gps_tfechahora;
      callerGps.gps_idCuenta = this.gps_idCuenta;
      callerGps.gps_idRec = this.gps_idRec;
      callerGps.gps_rLatitud = this.gps_rLatitud;
      callerGps.gps_rLongitud = this.gps_rLongitud;
      return (CallerObject) callerGps;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("gps_tfechahora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("gps_idCuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("gps_idRec", typeof (int)));
      dataTable.Columns.Add(new DataColumn("gps_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("gps_rLongitud", typeof (float)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["gps_tfechahora"] = (object) this.gps_tfechahora;
      row["gps_idCuenta"] = (object) this.gps_idCuenta;
      row["gps_idRec"] = (object) this.gps_idRec;
      row["gps_rLatitud"] = (object) this.gps_rLatitud;
      row["gps_rLongitud"] = (object) this.gps_rLongitud;
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
