// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerTaskStatus
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerTaskStatus : CallerObject
  {
    private int _Status;
    private DateTime? _LastExecutionDate;
    private int _Repetition;

    public int Status
    {
      get
      {
        return this._Status;
      }
      set
      {
        this._Status = value;
      }
    }

    public DateTime? LastExecutionDate
    {
      get
      {
        return this._LastExecutionDate;
      }
      set
      {
        this._LastExecutionDate = value;
      }
    }

    public int Repetition
    {
      get
      {
        return this._Repetition;
      }
      set
      {
        this._Repetition = value;
      }
    }

    public CallerTaskStatus()
    {
      this.InitClass();
    }

    public CallerTaskStatus(int Id, string Name, int Status, DateTime? LastExecutionDate, int Repetition)
    {
      this.Id = Id;
      this.Name = Name;
      this._Status = Status;
      this._LastExecutionDate = LastExecutionDate;
      this._Repetition = Repetition;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3074, "TaskStatus");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleTaskStatus simpleTaskStatus = new SimpleTaskStatus();
      simpleTaskStatus.Id = this.Id;
      simpleTaskStatus.Name = this.Name;
      simpleTaskStatus.Status = this._Status;
      simpleTaskStatus.LastExecutionDate = this._LastExecutionDate;
      simpleTaskStatus.Repetition = this._Repetition;
      return (SimpleBaseObject) simpleTaskStatus;
    }

    public void SetSimpleObject(SimpleTaskStatus Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Status = Simple.Status;
      this._LastExecutionDate = Simple.LastExecutionDate;
      this._Repetition = Simple.Repetition;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalTaskStatus(SqlConfig, UserId, (SimpleTaskStatus) this.GetSimpleObject());
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
      row["Status"] = (object) this._Status;
      row["LastExecutionDate"] = (object) this._LastExecutionDate;
      row["Repetition"] = (object) this._Repetition;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Caller")
      {
        EnforceConstraints = false,
        Tables = {
          this.GetDataObject(),
          this.Type.GetDataObject()
        }
      });
      if (this.Relation != null)
        xmlDataDocument.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
