// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_port_alias
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_port_alias : CallerObject
  {
    private int _tpa_icodigo;
    private string _tpa_cdealer;
    private int _tpa_ipuerto;
    private int _tpa_iportip;

    public int tpa_icodigo
    {
      get
      {
        return this._tpa_icodigo;
      }
      set
      {
        this._tpa_icodigo = value;
      }
    }

    public string tpa_cdealer
    {
      get
      {
        return this._tpa_cdealer;
      }
      set
      {
        this._tpa_cdealer = value;
      }
    }

    public int tpa_ipuerto
    {
      get
      {
        return this._tpa_ipuerto;
      }
      set
      {
        this._tpa_ipuerto = value;
      }
    }

    public int tpa_iportip
    {
      get
      {
        return this._tpa_iportip;
      }
      set
      {
        this._tpa_iportip = value;
      }
    }

    public Callert_port_alias()
    {
      this.InitClass();
    }

    public Callert_port_alias(int Id, string Name, int tpa_icodigo, string tpa_cdealer, int tpa_ipuerto, int tpa_iportip)
    {
      this.Id = Id;
      this.Name = Name;
      this._tpa_icodigo = tpa_icodigo;
      this._tpa_cdealer = tpa_cdealer;
      this._tpa_ipuerto = tpa_ipuerto;
      this._tpa_iportip = tpa_iportip;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3093, "t_port_alias");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_port_alias simpletPortAlias = new Simplet_port_alias();
      simpletPortAlias.Id = this.Id;
      simpletPortAlias.Name = this.Name;
      simpletPortAlias.tpa_icodigo = this._tpa_icodigo;
      simpletPortAlias.tpa_cdealer = this._tpa_cdealer;
      simpletPortAlias.tpa_ipuerto = this._tpa_ipuerto;
      simpletPortAlias.tpa_iportip = this._tpa_iportip;
      return (SimpleBaseObject) simpletPortAlias;
    }

    public void SetSimpleObject(Simplet_port_alias Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tpa_icodigo = Simple.tpa_icodigo;
      this._tpa_cdealer = Simple.tpa_cdealer;
      this._tpa_ipuerto = Simple.tpa_ipuerto;
      this._tpa_iportip = Simple.tpa_iportip;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_port_alias(SqlConfig, UserId, (Simplet_port_alias) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tpa_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tpa_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tpa_ipuerto", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tpa_iportip", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tpa_icodigo"] = (object) this._tpa_icodigo;
      row["tpa_cdealer"] = (object) this._tpa_cdealer;
      row["tpa_ipuerto"] = (object) this._tpa_ipuerto;
      row["tpa_iportip"] = (object) this._tpa_iportip;
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
