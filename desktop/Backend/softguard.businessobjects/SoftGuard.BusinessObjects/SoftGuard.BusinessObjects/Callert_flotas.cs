// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_flotas
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_flotas : CallerObject
  {
    private string _flo_ccodigo;
    private string _flo_cdescripcion;

    public string flo_ccodigo
    {
      get
      {
        return this._flo_ccodigo;
      }
      set
      {
        this._flo_ccodigo = value;
      }
    }

    public string flo_cdescripcion
    {
      get
      {
        return this._flo_cdescripcion;
      }
      set
      {
        this._flo_cdescripcion = value;
      }
    }

    public Callert_flotas()
    {
      this.InitClass();
    }

    public Callert_flotas(int Id, string Name, string flo_ccodigo, string flo_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this._flo_ccodigo = flo_ccodigo;
      this._flo_cdescripcion = flo_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3086, "t_flotas");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_flotas simpletFlotas = new Simplet_flotas();
      simpletFlotas.Id = this.Id;
      simpletFlotas.Name = this.Name;
      simpletFlotas.flo_ccodigo = this._flo_ccodigo;
      simpletFlotas.flo_cdescripcion = this._flo_cdescripcion;
      return (SimpleBaseObject) simpletFlotas;
    }

    public void SetSimpleObject(Simplet_flotas Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._flo_ccodigo = Simple.flo_ccodigo;
      this._flo_cdescripcion = Simple.flo_cdescripcion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_flotas(SqlConfig, UserId, (Simplet_flotas) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("flo_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("flo_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["flo_ccodigo"] = (object) this._flo_ccodigo;
      row["flo_cdescripcion"] = (object) this._flo_cdescripcion;
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
