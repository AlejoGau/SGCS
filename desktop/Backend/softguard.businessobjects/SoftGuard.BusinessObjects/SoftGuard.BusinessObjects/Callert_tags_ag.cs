// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_tags_ag
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_tags_ag : CallerObject
  {
    private string _tag_ccodigo;
    private string _tag_ctag;
    private string _tag_czona;
    private int _tag_iCuenta;

    public string tag_ccodigo
    {
      get
      {
        return this._tag_ccodigo;
      }
      set
      {
        this._tag_ccodigo = value;
      }
    }

    public string tag_ctag
    {
      get
      {
        return this._tag_ctag;
      }
      set
      {
        this._tag_ctag = value;
      }
    }

    public string tag_czona
    {
      get
      {
        return this._tag_czona;
      }
      set
      {
        this._tag_czona = value;
      }
    }

    public int tag_iCuenta
    {
      get
      {
        return this._tag_iCuenta;
      }
      set
      {
        this._tag_iCuenta = value;
      }
    }

    public Callert_tags_ag()
    {
      this.InitClass();
    }

    public Callert_tags_ag(int Id, string Name, string tag_ccodigo, string tag_ctag, string tag_czona, int tag_iCuenta)
    {
      this.Id = Id;
      this.Name = Name;
      this._tag_ccodigo = tag_ccodigo;
      this._tag_ctag = tag_ctag;
      this._tag_czona = tag_czona;
      this._tag_iCuenta = tag_iCuenta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3083, "t_tags_ag");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_tags_ag simpletTagsAg = new Simplet_tags_ag();
      simpletTagsAg.Id = this.Id;
      simpletTagsAg.Name = this.Name;
      simpletTagsAg.tag_ccodigo = this._tag_ccodigo;
      simpletTagsAg.tag_ctag = this._tag_ctag;
      simpletTagsAg.tag_czona = this._tag_czona;
      simpletTagsAg.tag_iCuenta = this._tag_iCuenta;
      return (SimpleBaseObject) simpletTagsAg;
    }

    public void SetSimpleObject(Simplet_tags_ag Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tag_ccodigo = Simple.tag_ccodigo;
      this._tag_ctag = Simple.tag_ctag;
      this._tag_czona = Simple.tag_czona;
      this._tag_iCuenta = Simple.tag_iCuenta;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_tags_ag(SqlConfig, UserId, (Simplet_tags_ag) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_ctag", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_czona", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_iCuenta", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tag_ccodigo"] = (object) this._tag_ccodigo;
      row["tag_ctag"] = (object) this._tag_ctag;
      row["tag_czona"] = (object) this._tag_czona;
      row["tag_iCuenta"] = (object) this._tag_iCuenta;
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
