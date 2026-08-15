// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_videoidXtrainfo
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_videoidXtrainfo : CallerObject
  {
    private int _tvi_iid;
    private int _tvi_iLauncher;
    private string _tvi_cConfig;

    public int tvi_iid
    {
      get
      {
        return this._tvi_iid;
      }
      set
      {
        this._tvi_iid = value;
      }
    }

    public int tvi_iLauncher
    {
      get
      {
        return this._tvi_iLauncher;
      }
      set
      {
        this._tvi_iLauncher = value;
      }
    }

    public string tvi_cConfig
    {
      get
      {
        return this._tvi_cConfig;
      }
      set
      {
        this._tvi_cConfig = value;
      }
    }

    public Callert_videoidXtrainfo()
    {
      this.InitClass();
    }

    public Callert_videoidXtrainfo(int Id, string Name, int tvi_iid, int tvi_iLauncher, string tvi_cConfig)
    {
      this.Id = Id;
      this.Name = Name;
      this._tvi_iid = tvi_iid;
      this._tvi_iLauncher = tvi_iLauncher;
      this._tvi_cConfig = tvi_cConfig;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3130, "t_videoidXtrainfo");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_videoidXtrainfo simpletVideoidXtrainfo = new Simplet_videoidXtrainfo();
      simpletVideoidXtrainfo.Id = this.Id;
      simpletVideoidXtrainfo.Name = this.Name;
      simpletVideoidXtrainfo.tvi_iid = this._tvi_iid;
      simpletVideoidXtrainfo.tvi_iLauncher = this._tvi_iLauncher;
      simpletVideoidXtrainfo.tvi_cConfig = this._tvi_cConfig;
      return (SimpleBaseObject) simpletVideoidXtrainfo;
    }

    public void SetSimpleObject(Simplet_videoidXtrainfo Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tvi_iid = Simple.tvi_iid;
      this._tvi_iLauncher = Simple.tvi_iLauncher;
      this._tvi_cConfig = Simple.tvi_cConfig;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_videoidXtrainfo(SqlConfig, UserId, (Simplet_videoidXtrainfo) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tvi_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tvi_iLauncher", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tvi_cConfig", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tvi_iid"] = (object) this._tvi_iid;
      row["tvi_iLauncher"] = (object) this._tvi_iLauncher;
      row["tvi_cConfig"] = (object) this._tvi_cConfig;
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
