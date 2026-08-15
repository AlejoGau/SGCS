// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_TimeZone
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
  public class Simplet_TimeZone : SimpleBaseObject
  {
    [DataMember]
    public string ttz_cTitle { get; set; }

    [DataMember]
    public Decimal ttz_nOffSet { get; set; }

    public Simplet_TimeZone()
    {
      this.InitClass();
    }

    public Simplet_TimeZone(int Id, string Name, string ttz_cTitle, Decimal ttz_nOffSet)
    {
      this.Id = Id;
      this.Name = Name;
      this.ttz_cTitle = ttz_cTitle;
      this.ttz_nOffSet = ttz_nOffSet;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3101, "t_TimeZone");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_TimeZone(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_TimeZone callertTimeZone = new Callert_TimeZone();
      callertTimeZone.Id = this.Id;
      callertTimeZone.Name = this.Name;
      callertTimeZone.ttz_cTitle = this.ttz_cTitle;
      callertTimeZone.ttz_nOffSet = this.ttz_nOffSet;
      return (CallerObject) callertTimeZone;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ttz_cTitle", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ttz_nOffSet", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ttz_cTitle"] = (object) this.ttz_cTitle ?? (object) DBNull.Value;
      row["ttz_nOffSet"] = (object) this.ttz_nOffSet ?? (object) DBNull.Value;
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
