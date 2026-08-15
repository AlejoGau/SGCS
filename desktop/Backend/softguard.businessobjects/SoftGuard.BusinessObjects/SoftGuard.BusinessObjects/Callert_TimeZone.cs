// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_TimeZone
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
  public class Callert_TimeZone : CallerObject
  {
    private string _ttz_cTitle;
    private Decimal _ttz_nOffSet;

    public string ttz_cTitle
    {
      get
      {
        return this._ttz_cTitle;
      }
      set
      {
        this._ttz_cTitle = value;
      }
    }

    public Decimal ttz_nOffSet
    {
      get
      {
        return this._ttz_nOffSet;
      }
      set
      {
        this._ttz_nOffSet = value;
      }
    }

    public Callert_TimeZone()
    {
      this.InitClass();
    }

    public Callert_TimeZone(int Id, string Name, string ttz_cTitle, Decimal ttz_nOffSet)
    {
      this.Id = Id;
      this.Name = Name;
      this._ttz_cTitle = ttz_cTitle;
      this._ttz_nOffSet = ttz_nOffSet;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3101, "t_TimeZone");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_TimeZone simpletTimeZone = new Simplet_TimeZone();
      simpletTimeZone.Id = this.Id;
      simpletTimeZone.Name = this.Name;
      simpletTimeZone.ttz_cTitle = this._ttz_cTitle;
      simpletTimeZone.ttz_nOffSet = this._ttz_nOffSet;
      return (SimpleBaseObject) simpletTimeZone;
    }

    public void SetSimpleObject(Simplet_TimeZone Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._ttz_cTitle = Simple.ttz_cTitle;
      this._ttz_nOffSet = Simple.ttz_nOffSet;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_TimeZone(SqlConfig, UserId, (Simplet_TimeZone) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ttz_cTitle", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ttz_nOffSet", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ttz_cTitle"] = (object) this._ttz_cTitle;
      row["ttz_nOffSet"] = (object) this._ttz_nOffSet;
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
