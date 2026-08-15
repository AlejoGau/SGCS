// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplep_VirtualIR
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
  public class Simplep_VirtualIR : SimpleBaseObject
  {
    [DataMember]
    public string vir_cDll { get; set; }

    [DataMember]
    public DateTime? vir_tFechaHora { get; set; }

    [DataMember]
    public Decimal vir_nStatus { get; set; }

    [DataMember]
    public string vir_cPackage { get; set; }

    public Simplep_VirtualIR()
    {
      this.InitClass();
    }

    public Simplep_VirtualIR(int Id, string Name, string vir_cDll, DateTime? vir_tFechaHora, Decimal vir_nStatus, string vir_cPackage)
    {
      this.Id = Id;
      this.Name = Name;
      this.vir_cDll = vir_cDll;
      this.vir_tFechaHora = vir_tFechaHora;
      this.vir_nStatus = vir_nStatus;
      this.vir_cPackage = vir_cPackage;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3104, "p_VirtualIR");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalp_VirtualIR(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerp_VirtualIR callerpVirtualIr = new Callerp_VirtualIR();
      callerpVirtualIr.Id = this.Id;
      callerpVirtualIr.Name = this.Name;
      callerpVirtualIr.vir_cDll = this.vir_cDll;
      callerpVirtualIr.vir_tFechaHora = this.vir_tFechaHora;
      callerpVirtualIr.vir_nStatus = this.vir_nStatus;
      callerpVirtualIr.vir_cPackage = this.vir_cPackage;
      return (CallerObject) callerpVirtualIr;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("vir_cDll", typeof (string)));
      dataTable.Columns.Add(new DataColumn("vir_tFechaHora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("vir_nStatus", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("vir_cPackage", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["vir_cDll"] = (object) this.vir_cDll ?? (object) DBNull.Value;
      row["vir_tFechaHora"] = (object) this.vir_tFechaHora ?? (object) DBNull.Value;
      row["vir_nStatus"] = (object) this.vir_nStatus ?? (object) DBNull.Value;
      row["vir_cPackage"] = (object) this.vir_cPackage ?? (object) DBNull.Value;
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
