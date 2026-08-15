// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerGrupoCuentas
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerGrupoCuentas : CallerObject
  {
    private string _tgc_cdescripcion;

    public string tgc_cdescripcion
    {
      get
      {
        return this._tgc_cdescripcion;
      }
      set
      {
        this._tgc_cdescripcion = value;
      }
    }

    public CallerGrupoCuentas()
    {
      this.InitClass();
    }

    public CallerGrupoCuentas(int Id, string Name, string tgc_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this._tgc_cdescripcion = tgc_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3062, "GrupoCuentas");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleGrupoCuentas simpleGrupoCuentas = new SimpleGrupoCuentas();
      simpleGrupoCuentas.Id = this.Id;
      simpleGrupoCuentas.Name = this.Name;
      simpleGrupoCuentas.tgc_cdescripcion = this._tgc_cdescripcion;
      return (SimpleBaseObject) simpleGrupoCuentas;
    }

    public void SetSimpleObject(SimpleGrupoCuentas Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tgc_cdescripcion = Simple.tgc_cdescripcion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalGrupoCuentas(SqlConfig, UserId, (SimpleGrupoCuentas) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tgc_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tgc_cdescripcion"] = (object) this._tgc_cdescripcion;
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
