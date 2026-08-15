// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_serviciospatrulla
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_serviciospatrulla : CallerObject
  {
    private string _tsp_ccodigo;
    private string _tsp_cdescripcion;
    private string _tsp_cpathicon;

    public string tsp_ccodigo
    {
      get
      {
        return this._tsp_ccodigo;
      }
      set
      {
        this._tsp_ccodigo = value;
      }
    }

    public string tsp_cdescripcion
    {
      get
      {
        return this._tsp_cdescripcion;
      }
      set
      {
        this._tsp_cdescripcion = value;
      }
    }

    public string tsp_cpathicon
    {
      get
      {
        return this._tsp_cpathicon;
      }
      set
      {
        this._tsp_cpathicon = value;
      }
    }

    public Callert_serviciospatrulla()
    {
      this.InitClass();
    }

    public Callert_serviciospatrulla(int Id, string Name, string tsp_ccodigo, string tsp_cdescripcion, string tsp_cpathicon)
    {
      this.Id = Id;
      this.Name = Name;
      this._tsp_ccodigo = tsp_ccodigo;
      this._tsp_cdescripcion = tsp_cdescripcion;
      this._tsp_cpathicon = tsp_cpathicon;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3088, "t_serviciospatrulla");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_serviciospatrulla serviciospatrulla = new Simplet_serviciospatrulla();
      serviciospatrulla.Id = this.Id;
      serviciospatrulla.Name = this.Name;
      serviciospatrulla.tsp_ccodigo = this._tsp_ccodigo;
      serviciospatrulla.tsp_cdescripcion = this._tsp_cdescripcion;
      serviciospatrulla.tsp_cpathicon = this._tsp_cpathicon;
      return (SimpleBaseObject) serviciospatrulla;
    }

    public void SetSimpleObject(Simplet_serviciospatrulla Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tsp_ccodigo = Simple.tsp_ccodigo;
      this._tsp_cdescripcion = Simple.tsp_cdescripcion;
      this._tsp_cpathicon = Simple.tsp_cpathicon;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_serviciospatrulla(SqlConfig, UserId, (Simplet_serviciospatrulla) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tsp_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tsp_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tsp_cpathicon", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tsp_ccodigo"] = (object) this._tsp_ccodigo;
      row["tsp_cdescripcion"] = (object) this._tsp_cdescripcion;
      row["tsp_cpathicon"] = (object) this._tsp_cpathicon;
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
