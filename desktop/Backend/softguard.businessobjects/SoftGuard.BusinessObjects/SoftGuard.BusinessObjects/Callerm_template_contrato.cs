// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_template_contrato
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerm_template_contrato : CallerObject
  {
    private string _tmp_asunto;
    private string _tmp_cuerpo;
    private string _tmp_metadata;
    private int _tmp_iorganizacion;
    private int _tmp_itipo;

    public string tmp_asunto
    {
      get
      {
        return this._tmp_asunto;
      }
      set
      {
        this._tmp_asunto = value;
      }
    }

    public string tmp_cuerpo
    {
      get
      {
        return this._tmp_cuerpo;
      }
      set
      {
        this._tmp_cuerpo = value;
      }
    }

    public string tmp_metadata
    {
      get
      {
        return this._tmp_metadata;
      }
      set
      {
        this._tmp_metadata = value;
      }
    }

    public int tmp_iorganizacion
    {
      get
      {
        return this._tmp_iorganizacion;
      }
      set
      {
        this._tmp_iorganizacion = value;
      }
    }

    public int tmp_itipo
    {
      get
      {
        return this._tmp_itipo;
      }
      set
      {
        this._tmp_itipo = value;
      }
    }

    public Callerm_template_contrato()
    {
      this.InitClass();
    }

    public Callerm_template_contrato(int Id, string Name, string tmp_asunto, string tmp_cuerpo, string tmp_metadata, int tmp_iorganizacion, int tmp_itipo)
    {
      this.Id = Id;
      this.Name = Name;
      this._tmp_asunto = tmp_asunto;
      this._tmp_cuerpo = tmp_cuerpo;
      this._tmp_metadata = tmp_metadata;
      this._tmp_iorganizacion = tmp_iorganizacion;
      this._tmp_itipo = tmp_itipo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3158, "m_template_contrato");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_template_contrato templateContrato = new Simplem_template_contrato();
      templateContrato.Id = this.Id;
      templateContrato.Name = this.Name;
      templateContrato.tmp_asunto = this._tmp_asunto;
      templateContrato.tmp_cuerpo = this._tmp_cuerpo;
      templateContrato.tmp_metadata = this._tmp_metadata;
      templateContrato.tmp_iorganizacion = this._tmp_iorganizacion;
      templateContrato.tmp_itipo = this._tmp_itipo;
      return (SimpleBaseObject) templateContrato;
    }

    public void SetSimpleObject(Simplem_template_contrato Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tmp_asunto = Simple.tmp_asunto;
      this._tmp_cuerpo = Simple.tmp_cuerpo;
      this._tmp_metadata = Simple.tmp_metadata;
      this._tmp_iorganizacion = Simple.tmp_iorganizacion;
      this._tmp_itipo = Simple.tmp_itipo;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_template_contrato(SqlConfig, UserId, (Simplem_template_contrato) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_asunto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cuerpo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_metadata", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_iorganizacion", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tmp_itipo", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tmp_asunto"] = (object) this._tmp_asunto;
      row["tmp_cuerpo"] = (object) this._tmp_cuerpo;
      row["tmp_metadata"] = (object) this._tmp_metadata;
      row["tmp_iorganizacion"] = (object) this._tmp_iorganizacion;
      row["tmp_itipo"] = (object) this._tmp_itipo;
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
