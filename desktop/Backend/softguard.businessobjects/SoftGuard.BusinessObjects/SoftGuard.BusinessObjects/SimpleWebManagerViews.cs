// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleWebManagerViews
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
  public class SimpleWebManagerViews : SimpleBaseObject
  {
    [DataMember]
    public string Data { get; set; }

    [DataMember]
    public int RefreshTime { get; set; }

    [DataMember]
    public int Opened { get; set; }

    public SimpleWebManagerViews()
    {
      this.InitClass();
    }

    public SimpleWebManagerViews(int Id, string Name, string Data, int RefreshTime, int Opened)
    {
      this.Id = Id;
      this.Name = Name;
      this.Data = Data;
      this.RefreshTime = RefreshTime;
      this.Opened = Opened;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3037, "WebManagerViews");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalWebManagerViews(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerWebManagerViews callerWebManagerViews = new CallerWebManagerViews();
      callerWebManagerViews.Id = this.Id;
      callerWebManagerViews.Name = this.Name;
      callerWebManagerViews.Data = this.Data;
      callerWebManagerViews.RefreshTime = this.RefreshTime;
      callerWebManagerViews.Opened = this.Opened;
      return (CallerObject) callerWebManagerViews;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Data", typeof (string)));
      dataTable.Columns.Add(new DataColumn("RefreshTime", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Opened", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Data"] = (object) this.Data;
      row["RefreshTime"] = (object) this.RefreshTime;
      row["Opened"] = (object) this.Opened;
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
