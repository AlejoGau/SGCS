// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_resolucionesllamada
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_resolucionesllamada : CallerObject
  {
    private string _rll_ccodigo;
    private string _rll_cdescripcion;

    public string rll_ccodigo
    {
      get
      {
        return this._rll_ccodigo;
      }
      set
      {
        this._rll_ccodigo = value;
      }
    }

    public string rll_cdescripcion
    {
      get
      {
        return this._rll_cdescripcion;
      }
      set
      {
        this._rll_cdescripcion = value;
      }
    }

    public Callert_resolucionesllamada()
    {
      this.InitClass();
    }

    public Callert_resolucionesllamada(int Id, string Name, string rll_ccodigo, string rll_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this._rll_ccodigo = rll_ccodigo;
      this._rll_cdescripcion = rll_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3081, "t_resolucionesllamada");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_resolucionesllamada resolucionesllamada = new Simplet_resolucionesllamada();
      resolucionesllamada.Id = this.Id;
      resolucionesllamada.Name = this.Name;
      resolucionesllamada.rll_ccodigo = this._rll_ccodigo;
      resolucionesllamada.rll_cdescripcion = this._rll_cdescripcion;
      return (SimpleBaseObject) resolucionesllamada;
    }

    public void SetSimpleObject(Simplet_resolucionesllamada Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._rll_ccodigo = Simple.rll_ccodigo;
      this._rll_cdescripcion = Simple.rll_cdescripcion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_resolucionesllamada(SqlConfig, UserId, (Simplet_resolucionesllamada) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rll_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rll_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["rll_ccodigo"] = (object) this._rll_ccodigo;
      row["rll_cdescripcion"] = (object) this._rll_cdescripcion;
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
