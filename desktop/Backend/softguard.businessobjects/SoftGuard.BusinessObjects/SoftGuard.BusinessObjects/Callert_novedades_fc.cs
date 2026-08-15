// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_novedades_fc
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
  public class Callert_novedades_fc : CallerObject
  {
    private string _nov_cdescripcion;
    private Decimal _nov_mimporte;
    private string _nov_cimpuesto1;
    private string _nov_cimpuesto2;
    private string _nov_cimpuesto3;

    public string nov_cdescripcion
    {
      get
      {
        return this._nov_cdescripcion;
      }
      set
      {
        this._nov_cdescripcion = value;
      }
    }

    public Decimal nov_mimporte
    {
      get
      {
        return this._nov_mimporte;
      }
      set
      {
        this._nov_mimporte = value;
      }
    }

    public string nov_cimpuesto1
    {
      get
      {
        return this._nov_cimpuesto1;
      }
      set
      {
        this._nov_cimpuesto1 = value;
      }
    }

    public string nov_cimpuesto2
    {
      get
      {
        return this._nov_cimpuesto2;
      }
      set
      {
        this._nov_cimpuesto2 = value;
      }
    }

    public string nov_cimpuesto3
    {
      get
      {
        return this._nov_cimpuesto3;
      }
      set
      {
        this._nov_cimpuesto3 = value;
      }
    }

    public Callert_novedades_fc()
    {
      this.InitClass();
    }

    public Callert_novedades_fc(int Id, string Name, string nov_cdescripcion, Decimal nov_mimporte, string nov_cimpuesto1, string nov_cimpuesto2, string nov_cimpuesto3)
    {
      this.Id = Id;
      this.Name = Name;
      this._nov_cdescripcion = nov_cdescripcion;
      this._nov_mimporte = nov_mimporte;
      this._nov_cimpuesto1 = nov_cimpuesto1;
      this._nov_cimpuesto2 = nov_cimpuesto2;
      this._nov_cimpuesto3 = nov_cimpuesto3;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3153, "t_novedades_fc");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_novedades_fc simpletNovedadesFc = new Simplet_novedades_fc();
      simpletNovedadesFc.Id = this.Id;
      simpletNovedadesFc.Name = this.Name;
      simpletNovedadesFc.nov_cdescripcion = this._nov_cdescripcion;
      simpletNovedadesFc.nov_mimporte = this._nov_mimporte;
      simpletNovedadesFc.nov_cimpuesto1 = this._nov_cimpuesto1;
      simpletNovedadesFc.nov_cimpuesto2 = this._nov_cimpuesto2;
      simpletNovedadesFc.nov_cimpuesto3 = this._nov_cimpuesto3;
      return (SimpleBaseObject) simpletNovedadesFc;
    }

    public void SetSimpleObject(Simplet_novedades_fc Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._nov_cdescripcion = Simple.nov_cdescripcion;
      this._nov_mimporte = Simple.nov_mimporte;
      this._nov_cimpuesto1 = Simple.nov_cimpuesto1;
      this._nov_cimpuesto2 = Simple.nov_cimpuesto2;
      this._nov_cimpuesto3 = Simple.nov_cimpuesto3;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_novedades_fc(SqlConfig, UserId, (Simplet_novedades_fc) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_mimporte", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto1", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto2", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto3", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["nov_cdescripcion"] = (object) this._nov_cdescripcion;
      row["nov_mimporte"] = (object) this._nov_mimporte;
      row["nov_cimpuesto1"] = (object) this._nov_cimpuesto1;
      row["nov_cimpuesto2"] = (object) this._nov_cimpuesto2;
      row["nov_cimpuesto3"] = (object) this._nov_cimpuesto3;
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
