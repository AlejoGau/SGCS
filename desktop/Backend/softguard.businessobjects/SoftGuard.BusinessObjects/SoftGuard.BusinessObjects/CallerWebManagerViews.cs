// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerWebManagerViews
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerWebManagerViews : CallerObject
  {
    private string _Data;
    private int _RefreshTime;
    private int _Opened;

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

    public int RefreshTime
    {
      get
      {
        return this._RefreshTime;
      }
      set
      {
        this._RefreshTime = value;
      }
    }

    public int Opened
    {
      get
      {
        return this._Opened;
      }
      set
      {
        this._Opened = value;
      }
    }

    public CallerWebManagerViews()
    {
      this.InitClass();
    }

    public CallerWebManagerViews(int Id, string Name, string Data, int RefreshTime, int Opened)
    {
      this.Id = Id;
      this.Name = Name;
      this._Data = Data;
      this._RefreshTime = RefreshTime;
      this._Opened = Opened;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3037, "WebManagerViews");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleWebManagerViews simpleWebManagerViews = new SimpleWebManagerViews();
      simpleWebManagerViews.Id = this.Id;
      simpleWebManagerViews.Name = this.Name;
      simpleWebManagerViews.Data = this._Data;
      simpleWebManagerViews.RefreshTime = this._RefreshTime;
      simpleWebManagerViews.Opened = this._Opened;
      return (SimpleBaseObject) simpleWebManagerViews;
    }

    public void SetSimpleObject(SimpleWebManagerViews Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Data = Simple.Data;
      this._RefreshTime = Simple.RefreshTime;
      this._Opened = Simple.Opened;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalWebManagerViews(SqlConfig, UserId, (SimpleWebManagerViews) this.GetSimpleObject());
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
      row["Data"] = (object) this._Data;
      row["RefreshTime"] = (object) this._RefreshTime;
      row["Opened"] = (object) this._Opened;
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
