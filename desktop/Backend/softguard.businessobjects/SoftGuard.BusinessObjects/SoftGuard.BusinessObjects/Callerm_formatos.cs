// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_formatos
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerm_formatos : CallerObject
  {
    private string _for_cdescripcion;
    private string _for_cformato;
    private string _for_cnombre;
    private string _for_calarma;
    private string _for_ccodigo;

    public string for_cdescripcion
    {
      get
      {
        return this._for_cdescripcion;
      }
      set
      {
        this._for_cdescripcion = value;
      }
    }

    public string for_cformato
    {
      get
      {
        return this._for_cformato;
      }
      set
      {
        this._for_cformato = value;
      }
    }

    public string for_cnombre
    {
      get
      {
        return this._for_cnombre;
      }
      set
      {
        this._for_cnombre = value;
      }
    }

    public string for_calarma
    {
      get
      {
        return this._for_calarma;
      }
      set
      {
        this._for_calarma = value;
      }
    }

    public string for_ccodigo
    {
      get
      {
        return this._for_ccodigo;
      }
      set
      {
        this._for_ccodigo = value;
      }
    }

    public Callerm_formatos()
    {
      this.InitClass();
    }

    public Callerm_formatos(int Id, string Name, string for_cdescripcion, string for_cformato, string for_cnombre, string for_calarma, string for_ccodigo)
    {
      this.Id = Id;
      this.Name = Name;
      this._for_cdescripcion = for_cdescripcion;
      this._for_cformato = for_cformato;
      this._for_cnombre = for_cnombre;
      this._for_calarma = for_calarma;
      this._for_ccodigo = for_ccodigo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3096, "m_formatos");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_formatos simplemFormatos = new Simplem_formatos();
      simplemFormatos.Id = this.Id;
      simplemFormatos.Name = this.Name;
      simplemFormatos.for_cdescripcion = this._for_cdescripcion;
      simplemFormatos.for_cformato = this._for_cformato;
      simplemFormatos.for_cnombre = this._for_cnombre;
      simplemFormatos.for_calarma = this._for_calarma;
      simplemFormatos.for_ccodigo = this._for_ccodigo;
      return (SimpleBaseObject) simplemFormatos;
    }

    public void SetSimpleObject(Simplem_formatos Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._for_cdescripcion = Simple.for_cdescripcion;
      this._for_cformato = Simple.for_cformato;
      this._for_cnombre = Simple.for_cnombre;
      this._for_calarma = Simple.for_calarma;
      this._for_ccodigo = Simple.for_ccodigo;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_formatos(SqlConfig, UserId, (Simplem_formatos) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cformato", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_calarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_ccodigo", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["for_cdescripcion"] = (object) this._for_cdescripcion;
      row["for_cformato"] = (object) this._for_cformato;
      row["for_cnombre"] = (object) this._for_cnombre;
      row["for_calarma"] = (object) this._for_calarma;
      row["for_ccodigo"] = (object) this._for_ccodigo;
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
