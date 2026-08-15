// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_teclados
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_teclados : CallerObject
  {
    private string _tec_cdescripcion;
    private string _tec_cobservacion;

    public string tec_cdescripcion
    {
      get
      {
        return this._tec_cdescripcion;
      }
      set
      {
        this._tec_cdescripcion = value;
      }
    }

    public string tec_cobservacion
    {
      get
      {
        return this._tec_cobservacion;
      }
      set
      {
        this._tec_cobservacion = value;
      }
    }

    public Callert_teclados()
    {
      this.InitClass();
    }

    public Callert_teclados(int Id, string Name, string tec_cdescripcion, string tec_cobservacion)
    {
      this.Id = Id;
      this.Name = Name;
      this._tec_cdescripcion = tec_cdescripcion;
      this._tec_cobservacion = tec_cobservacion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3135, "t_teclados");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_teclados simpletTeclados = new Simplet_teclados();
      simpletTeclados.Id = this.Id;
      simpletTeclados.Name = this.Name;
      simpletTeclados.tec_cdescripcion = this._tec_cdescripcion;
      simpletTeclados.tec_cobservacion = this._tec_cobservacion;
      return (SimpleBaseObject) simpletTeclados;
    }

    public void SetSimpleObject(Simplet_teclados Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tec_cdescripcion = Simple.tec_cdescripcion;
      this._tec_cobservacion = Simple.tec_cobservacion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_teclados(SqlConfig, UserId, (Simplet_teclados) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cobservacion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tec_cdescripcion"] = (object) this._tec_cdescripcion;
      row["tec_cobservacion"] = (object) this._tec_cobservacion;
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
