// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleScheduler
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
  public class SimpleScheduler : SimpleBaseObject
  {
    [DataMember]
    public int template { get; set; }

    [DataMember]
    public DateTime? limitdate { get; set; }

    [DataMember]
    public int status { get; set; }

    [DataMember]
    public DateTime? lastchange { get; set; }

    [DataMember]
    public string config { get; set; }

    [DataMember]
    public int eventid { get; set; }

    [DataMember]
    public string eventtype { get; set; }

    [DataMember]
    public string condition { get; set; }

    [DataMember]
    public string sql { get; set; }

    public SimpleScheduler()
    {
      this.InitClass();
    }

    public SimpleScheduler(int Id, string Name, int template, DateTime? limitdate, int status, DateTime? lastchange, string config, int eventid, string eventtype, string condition, string sql)
    {
      this.Id = Id;
      this.Name = Name;
      this.template = template;
      this.limitdate = limitdate;
      this.status = status;
      this.lastchange = lastchange;
      this.config = config;
      this.eventid = eventid;
      this.eventtype = eventtype;
      this.condition = condition;
      this.sql = sql;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3114, "Scheduler");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalScheduler(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerScheduler callerScheduler = new CallerScheduler();
      callerScheduler.Id = this.Id;
      callerScheduler.Name = this.Name;
      callerScheduler.template = this.template;
      callerScheduler.limitdate = this.limitdate;
      callerScheduler.status = this.status;
      callerScheduler.lastchange = this.lastchange;
      callerScheduler.config = this.config;
      callerScheduler.eventid = this.eventid;
      callerScheduler.eventtype = this.eventtype;
      callerScheduler.condition = this.condition;
      callerScheduler.sql = this.sql;
      return (CallerObject) callerScheduler;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("template", typeof (int)));
      dataTable.Columns.Add(new DataColumn("limitdate", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("status", typeof (int)));
      dataTable.Columns.Add(new DataColumn("lastchange", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("config", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eventid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("eventtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("condition", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sql", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["template"] = (object) this.template ?? (object) DBNull.Value;
      row["limitdate"] = (object) this.limitdate ?? (object) DBNull.Value;
      row["status"] = (object) this.status ?? (object) DBNull.Value;
      row["lastchange"] = (object) this.lastchange ?? (object) DBNull.Value;
      row["config"] = (object) this.config ?? (object) DBNull.Value;
      row["eventid"] = (object) this.eventid ?? (object) DBNull.Value;
      row["eventtype"] = (object) this.eventtype ?? (object) DBNull.Value;
      row["condition"] = (object) this.condition ?? (object) DBNull.Value;
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
