// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimplePersonLineRange
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Runtime.Serialization;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  [DataContract]
  public class SimplePersonLineRange : SimpleBaseObject
  {
    [DataMember]
    public string Code { get; set; }

    [DataMember]
    public int RangeStart { get; set; }

    [DataMember]
    public int RangeEnd { get; set; }

    [DataMember]
    public int PersonId { get; set; }

    public SimplePersonLineRange()
    {
      this.InitClass();
    }

    public SimplePersonLineRange(int Id, string Name, string Code, int RangeStart, int RangeEnd, int PersonId)
    {
      this.Id = Id;
      this.Name = Name;
      this.Code = Code;
      this.RangeStart = RangeStart;
      this.RangeEnd = RangeEnd;
      this.PersonId = PersonId;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3035, "PersonLineRange");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalPersonLineRange(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerPersonLineRange callerPersonLineRange = new CallerPersonLineRange();
      callerPersonLineRange.Id = this.Id;
      callerPersonLineRange.Name = this.Name;
      callerPersonLineRange.Code = this.Code;
      callerPersonLineRange.RangeStart = this.RangeStart;
      callerPersonLineRange.RangeEnd = this.RangeEnd;
      callerPersonLineRange.PersonId = this.PersonId;
      return (CallerObject) callerPersonLineRange;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Code", typeof (string)));
      dataTable.Columns.Add(new DataColumn("RangeStart", typeof (int)));
      dataTable.Columns.Add(new DataColumn("RangeEnd", typeof (int)));
      dataTable.Columns.Add(new DataColumn("PersonId", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Code"] = (object) this.Code;
      row["RangeStart"] = (object) this.RangeStart;
      row["RangeEnd"] = (object) this.RangeEnd;
      row["PersonId"] = (object) this.PersonId;
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
