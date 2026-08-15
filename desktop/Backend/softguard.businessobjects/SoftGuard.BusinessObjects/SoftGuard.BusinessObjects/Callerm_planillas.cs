// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_planillas
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerm_planillas : CallerObject
  {
    private string _pla_cDescripcion;
    private string _pla_cNombreTabla;

    public string pla_cDescripcion
    {
      get
      {
        return this._pla_cDescripcion;
      }
      set
      {
        this._pla_cDescripcion = value;
      }
    }

    public string pla_cNombreTabla
    {
      get
      {
        return this._pla_cNombreTabla;
      }
      set
      {
        this._pla_cNombreTabla = value;
      }
    }

    public Callerm_planillas()
    {
      this.InitClass();
    }

    public Callerm_planillas(int Id, string Name, string pla_cDescripcion, string pla_cNombreTabla)
    {
      this.Id = Id;
      this.Name = Name;
      this._pla_cDescripcion = pla_cDescripcion;
      this._pla_cNombreTabla = pla_cNombreTabla;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3097, "m_planillas");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_planillas simplemPlanillas = new Simplem_planillas();
      simplemPlanillas.Id = this.Id;
      simplemPlanillas.Name = this.Name;
      simplemPlanillas.pla_cDescripcion = this._pla_cDescripcion;
      simplemPlanillas.pla_cNombreTabla = this._pla_cNombreTabla;
      return (SimpleBaseObject) simplemPlanillas;
    }

    public void SetSimpleObject(Simplem_planillas Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._pla_cDescripcion = Simple.pla_cDescripcion;
      this._pla_cNombreTabla = Simple.pla_cNombreTabla;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_planillas(SqlConfig, UserId, (Simplem_planillas) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pla_cDescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pla_cNombreTabla", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pla_cDescripcion"] = (object) this._pla_cDescripcion;
      row["pla_cNombreTabla"] = (object) this._pla_cNombreTabla;
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
