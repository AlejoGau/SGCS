// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleSchedulerPrograms
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
  public class SimpleSchedulerPrograms : SimpleBaseObject
  {
    [DataMember]
    public int cuentaId { get; set; }

    [DataMember]
    public string eventos { get; set; }

    [DataMember]
    public string eventogenerar { get; set; }

    [DataMember]
    public int zonaiid { get; set; }

    [DataMember]
    public int usuarioiid { get; set; }

    [DataMember]
    public string programtype { get; set; }

    [DataMember]
    public int starthour { get; set; }

    [DataMember]
    public int startminutes { get; set; }

    [DataMember]
    public int endhour { get; set; }

    [DataMember]
    public int endminutes { get; set; }

    [DataMember]
    public int dayofweek { get; set; }

    [DataMember]
    public int dayofmonth { get; set; }

    public SimpleSchedulerPrograms()
    {
      this.InitClass();
    }

    public SimpleSchedulerPrograms(int Id, string Name, int cuentaId, string eventos, string eventogenerar, int zonaiid, int usuarioiid, string programtype, int starthour, int startminutes, int endhour, int endminutes, int dayofweek, int dayofmonth)
    {
      this.Id = Id;
      this.Name = Name;
      this.cuentaId = cuentaId;
      this.eventos = eventos;
      this.eventogenerar = eventogenerar;
      this.zonaiid = zonaiid;
      this.usuarioiid = usuarioiid;
      this.programtype = programtype;
      this.starthour = starthour;
      this.startminutes = startminutes;
      this.endhour = endhour;
      this.endminutes = endminutes;
      this.dayofweek = dayofweek;
      this.dayofmonth = dayofmonth;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3133, "SchedulerPrograms");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalSchedulerPrograms(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerSchedulerPrograms schedulerPrograms = new CallerSchedulerPrograms();
      schedulerPrograms.Id = this.Id;
      schedulerPrograms.Name = this.Name;
      schedulerPrograms.cuentaId = this.cuentaId;
      schedulerPrograms.eventos = this.eventos;
      schedulerPrograms.eventogenerar = this.eventogenerar;
      schedulerPrograms.zonaiid = this.zonaiid;
      schedulerPrograms.usuarioiid = this.usuarioiid;
      schedulerPrograms.programtype = this.programtype;
      schedulerPrograms.starthour = this.starthour;
      schedulerPrograms.startminutes = this.startminutes;
      schedulerPrograms.endhour = this.endhour;
      schedulerPrograms.endminutes = this.endminutes;
      schedulerPrograms.dayofweek = this.dayofweek;
      schedulerPrograms.dayofmonth = this.dayofmonth;
      return (CallerObject) schedulerPrograms;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("cuentaId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("eventos", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eventogenerar", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zonaiid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("usuarioiid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("programtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("starthour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endhour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofweek", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofmonth", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["cuentaId"] = (object) this.cuentaId ?? (object) DBNull.Value;
      row["eventos"] = (object) this.eventos ?? (object) DBNull.Value;
      row["eventogenerar"] = (object) this.eventogenerar ?? (object) DBNull.Value;
      row["zonaiid"] = (object) this.zonaiid ?? (object) DBNull.Value;
      row["usuarioiid"] = (object) this.usuarioiid ?? (object) DBNull.Value;
      row["programtype"] = (object) this.programtype ?? (object) DBNull.Value;
      row["starthour"] = (object) this.starthour ?? (object) DBNull.Value;
      row["startminutes"] = (object) this.startminutes ?? (object) DBNull.Value;
      row["endhour"] = (object) this.endhour ?? (object) DBNull.Value;
      row["endminutes"] = (object) this.endminutes ?? (object) DBNull.Value;
      row["dayofweek"] = (object) this.dayofweek ?? (object) DBNull.Value;
      row["dayofmonth"] = (object) this.dayofmonth ?? (object) DBNull.Value;
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
