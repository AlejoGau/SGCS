// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_InstaladoresDealer
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
  public class Simplet_InstaladoresDealer : SimpleBaseObject
  {
    [DataMember]
    public int tid_iidInstalador { get; set; }

    [DataMember]
    public int tid_iidDealer { get; set; }

    public Simplet_InstaladoresDealer()
    {
      this.InitClass();
    }

    public Simplet_InstaladoresDealer(int Id, string Name, int tid_iidInstalador, int tid_iidDealer)
    {
      this.Id = Id;
      this.Name = Name;
      this.tid_iidInstalador = tid_iidInstalador;
      this.tid_iidDealer = tid_iidDealer;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3156, "t_InstaladoresDealer");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_InstaladoresDealer(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_InstaladoresDealer instaladoresDealer = new Callert_InstaladoresDealer();
      instaladoresDealer.Id = this.Id;
      instaladoresDealer.Name = this.Name;
      instaladoresDealer.tid_iidInstalador = this.tid_iidInstalador;
      instaladoresDealer.tid_iidDealer = this.tid_iidDealer;
      return (CallerObject) instaladoresDealer;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tid_iidInstalador", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tid_iidDealer", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tid_iidInstalador"] = (object) this.tid_iidInstalador ?? (object) DBNull.Value;
      row["tid_iidDealer"] = (object) this.tid_iidDealer ?? (object) DBNull.Value;
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
