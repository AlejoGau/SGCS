// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleWebManagerGraphics
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
  public class SimpleWebManagerGraphics : SimpleBaseObject
  {
    [DataMember]
    public string Data { get; set; }

    [DataMember]
    public int Height { get; set; }

    public SimpleWebManagerGraphics()
    {
      this.InitClass();
    }

    public SimpleWebManagerGraphics(int Id, string Name, string Data, int Height)
    {
      this.Id = Id;
      this.Name = Name;
      this.Data = Data;
      this.Height = Height;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3036, "WebManagerGraphics");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalWebManagerGraphics(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerWebManagerGraphics webManagerGraphics = new CallerWebManagerGraphics();
      webManagerGraphics.Id = this.Id;
      webManagerGraphics.Name = this.Name;
      webManagerGraphics.Data = this.Data;
      webManagerGraphics.Height = this.Height;
      return (CallerObject) webManagerGraphics;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Data", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Height", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Data"] = (object) this.Data;
      row["Height"] = (object) this.Height;
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
