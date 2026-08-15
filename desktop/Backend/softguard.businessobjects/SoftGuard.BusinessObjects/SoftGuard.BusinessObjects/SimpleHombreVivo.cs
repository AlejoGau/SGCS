// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleHombreVivo
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
  public class SimpleHombreVivo : SimpleBaseObject
  {
    [DataMember]
    public DateTime? fecha { get; set; }

    [DataMember]
    public int proximo { get; set; }

    [DataMember]
    public int idscheduler { get; set; }

    [DataMember]
    public string imei { get; set; }

    [DataMember]
    public int idcuenta { get; set; }

    public SimpleHombreVivo()
    {
      this.InitClass();
    }

    public SimpleHombreVivo(int Id, string Name, DateTime? fecha, int proximo, int idscheduler, string imei, int idcuenta)
    {
      this.Id = Id;
      this.Name = Name;
      this.fecha = fecha;
      this.proximo = proximo;
      this.idscheduler = idscheduler;
      this.imei = imei;
      this.idcuenta = idcuenta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3116, "HombreVivo");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalHombreVivo(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerHombreVivo callerHombreVivo = new CallerHombreVivo();
      callerHombreVivo.Id = this.Id;
      callerHombreVivo.Name = this.Name;
      callerHombreVivo.fecha = this.fecha;
      callerHombreVivo.proximo = this.proximo;
      callerHombreVivo.idscheduler = this.idscheduler;
      callerHombreVivo.imei = this.imei;
      callerHombreVivo.idcuenta = this.idcuenta;
      return (CallerObject) callerHombreVivo;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("fecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("proximo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("idscheduler", typeof (int)));
      dataTable.Columns.Add(new DataColumn("imei", typeof (string)));
      dataTable.Columns.Add(new DataColumn("idcuenta", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["fecha"] = (object) this.fecha ?? (object) DBNull.Value;
      row["proximo"] = (object) this.proximo ?? (object) DBNull.Value;
      row["idscheduler"] = (object) this.idscheduler ?? (object) DBNull.Value;
      row["imei"] = (object) this.imei ?? (object) DBNull.Value;
      row["idcuenta"] = (object) this.idcuenta ?? (object) DBNull.Value;
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
