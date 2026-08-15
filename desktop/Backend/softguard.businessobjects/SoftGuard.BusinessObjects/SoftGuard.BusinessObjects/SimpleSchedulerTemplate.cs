// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleSchedulerTemplate
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
  public class SimpleSchedulerTemplate : SimpleBaseObject
  {
    [DataMember]
    public string config { get; set; }

    [DataMember]
    public string sql { get; set; }

    public SimpleSchedulerTemplate()
    {
      this.InitClass();
    }

    public SimpleSchedulerTemplate(int Id, string Name, string config, string sql)
    {
      this.Id = Id;
      this.Name = Name;
      this.config = config;
      this.sql = sql;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3115, "SchedulerTemplate");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalSchedulerTemplate(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerSchedulerTemplate schedulerTemplate = new CallerSchedulerTemplate();
      schedulerTemplate.Id = this.Id;
      schedulerTemplate.Name = this.Name;
      schedulerTemplate.config = this.config;
      schedulerTemplate.sql = this.sql;
      return (CallerObject) schedulerTemplate;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("config", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sql", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["config"] = (object) this.config ?? (object) DBNull.Value;
      row["sql"] = (object) this.sql ?? (object) DBNull.Value;
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
