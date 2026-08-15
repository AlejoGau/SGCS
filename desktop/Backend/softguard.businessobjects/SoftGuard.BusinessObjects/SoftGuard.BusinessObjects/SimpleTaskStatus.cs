// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleTaskStatus
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
  public class SimpleTaskStatus : SimpleBaseObject
  {
    [DataMember]
    public int Status { get; set; }

    [DataMember]
    public DateTime? LastExecutionDate { get; set; }

    [DataMember]
    public int Repetition { get; set; }

    public SimpleTaskStatus()
    {
      this.InitClass();
    }

    public SimpleTaskStatus(int Id, string Name, int Status, DateTime? LastExecutionDate, int Repetition)
    {
      this.Id = Id;
      this.Name = Name;
      this.Status = Status;
      this.LastExecutionDate = LastExecutionDate;
      this.Repetition = Repetition;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3074, "TaskStatus");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalTaskStatus(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerTaskStatus callerTaskStatus = new CallerTaskStatus();
      callerTaskStatus.Id = this.Id;
      callerTaskStatus.Name = this.Name;
      callerTaskStatus.Status = this.Status;
      callerTaskStatus.LastExecutionDate = this.LastExecutionDate;
      callerTaskStatus.Repetition = this.Repetition;
      return (CallerObject) callerTaskStatus;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Status", typeof (int)));
      dataTable.Columns.Add(new DataColumn("LastExecutionDate", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("Repetition", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Status"] = (object) this.Status ?? (object) DBNull.Value;
      row["LastExecutionDate"] = (object) this.LastExecutionDate ?? (object) DBNull.Value;
      row["Repetition"] = (object) this.Repetition ?? (object) DBNull.Value;
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
