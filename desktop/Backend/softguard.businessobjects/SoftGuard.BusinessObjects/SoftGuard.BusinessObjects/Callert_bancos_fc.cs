// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_bancos_fc
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_bancos_fc : CallerObject
  {
    private string _bco_ccodigo;
    private string _bco_cnombre;

    public string bco_ccodigo
    {
      get
      {
        return this._bco_ccodigo;
      }
      set
      {
        this._bco_ccodigo = value;
      }
    }

    public string bco_cnombre
    {
      get
      {
        return this._bco_cnombre;
      }
      set
      {
        this._bco_cnombre = value;
      }
    }

    public Callert_bancos_fc()
    {
      this.InitClass();
    }

    public Callert_bancos_fc(int Id, string Name, string bco_ccodigo, string bco_cnombre)
    {
      this.Id = Id;
      this.Name = Name;
      this._bco_ccodigo = bco_ccodigo;
      this._bco_cnombre = bco_cnombre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3145, "t_bancos_fc");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_bancos_fc simpletBancosFc = new Simplet_bancos_fc();
      simpletBancosFc.Id = this.Id;
      simpletBancosFc.Name = this.Name;
      simpletBancosFc.bco_ccodigo = this._bco_ccodigo;
      simpletBancosFc.bco_cnombre = this._bco_cnombre;
      return (SimpleBaseObject) simpletBancosFc;
    }

    public void SetSimpleObject(Simplet_bancos_fc Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._bco_ccodigo = Simple.bco_ccodigo;
      this._bco_cnombre = Simple.bco_cnombre;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_bancos_fc(SqlConfig, UserId, (Simplet_bancos_fc) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("bco_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("bco_cnombre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["bco_ccodigo"] = (object) this._bco_ccodigo;
      row["bco_cnombre"] = (object) this._bco_cnombre;
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
