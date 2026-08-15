// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerWebManagerGraphics
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerWebManagerGraphics : CallerObject
  {
    private string _Data;
    private int _Height;

    public string Data
    {
      get
      {
        return this._Data;
      }
      set
      {
        this._Data = value;
      }
    }

    public int Height
    {
      get
      {
        return this._Height;
      }
      set
      {
        this._Height = value;
      }
    }

    public CallerWebManagerGraphics()
    {
      this.InitClass();
    }

    public CallerWebManagerGraphics(int Id, string Name, string Data, int Height)
    {
      this.Id = Id;
      this.Name = Name;
      this._Data = Data;
      this._Height = Height;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3036, "WebManagerGraphics");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleWebManagerGraphics webManagerGraphics = new SimpleWebManagerGraphics();
      webManagerGraphics.Id = this.Id;
      webManagerGraphics.Name = this.Name;
      webManagerGraphics.Data = this._Data;
      webManagerGraphics.Height = this._Height;
      return (SimpleBaseObject) webManagerGraphics;
    }

    public void SetSimpleObject(SimpleWebManagerGraphics Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Data = Simple.Data;
      this._Height = Simple.Height;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalWebManagerGraphics(SqlConfig, UserId, (SimpleWebManagerGraphics) this.GetSimpleObject());
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
      row["Data"] = (object) this._Data;
      row["Height"] = (object) this._Height;
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
