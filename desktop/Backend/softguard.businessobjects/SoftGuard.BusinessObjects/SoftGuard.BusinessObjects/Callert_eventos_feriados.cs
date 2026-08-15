// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_eventos_feriados
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
  public class Callert_eventos_feriados : CallerObject
  {
    private string _eve_ccodigo;
    private string _eve_cdescripcion;
    private DateTime? _eve_dfechadesdes;
    private string _eve_choradesde;
    private DateTime? _eve_dfechahasta;
    private string _eve_chorahasta;

    public string eve_ccodigo
    {
      get
      {
        return this._eve_ccodigo;
      }
      set
      {
        this._eve_ccodigo = value;
      }
    }

    public string eve_cdescripcion
    {
      get
      {
        return this._eve_cdescripcion;
      }
      set
      {
        this._eve_cdescripcion = value;
      }
    }

    public DateTime? eve_dfechadesdes
    {
      get
      {
        return this._eve_dfechadesdes;
      }
      set
      {
        this._eve_dfechadesdes = value;
      }
    }

    public string eve_choradesde
    {
      get
      {
        return this._eve_choradesde;
      }
      set
      {
        this._eve_choradesde = value;
      }
    }

    public DateTime? eve_dfechahasta
    {
      get
      {
        return this._eve_dfechahasta;
      }
      set
      {
        this._eve_dfechahasta = value;
      }
    }

    public string eve_chorahasta
    {
      get
      {
        return this._eve_chorahasta;
      }
      set
      {
        this._eve_chorahasta = value;
      }
    }

    public Callert_eventos_feriados()
    {
      this.InitClass();
    }

    public Callert_eventos_feriados(int Id, string Name, string eve_ccodigo, string eve_cdescripcion, DateTime? eve_dfechadesdes, string eve_choradesde, DateTime? eve_dfechahasta, string eve_chorahasta)
    {
      this.Id = Id;
      this.Name = Name;
      this._eve_ccodigo = eve_ccodigo;
      this._eve_cdescripcion = eve_cdescripcion;
      this._eve_dfechadesdes = eve_dfechadesdes;
      this._eve_choradesde = eve_choradesde;
      this._eve_dfechahasta = eve_dfechahasta;
      this._eve_chorahasta = eve_chorahasta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3077, "t_eventos_feriados");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_eventos_feriados simpletEventosFeriados = new Simplet_eventos_feriados();
      simpletEventosFeriados.Id = this.Id;
      simpletEventosFeriados.Name = this.Name;
      simpletEventosFeriados.eve_ccodigo = this._eve_ccodigo;
      simpletEventosFeriados.eve_cdescripcion = this._eve_cdescripcion;
      simpletEventosFeriados.eve_dfechadesdes = this._eve_dfechadesdes;
      simpletEventosFeriados.eve_choradesde = this._eve_choradesde;
      simpletEventosFeriados.eve_dfechahasta = this._eve_dfechahasta;
      simpletEventosFeriados.eve_chorahasta = this._eve_chorahasta;
      return (SimpleBaseObject) simpletEventosFeriados;
    }

    public void SetSimpleObject(Simplet_eventos_feriados Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._eve_ccodigo = Simple.eve_ccodigo;
      this._eve_cdescripcion = Simple.eve_cdescripcion;
      this._eve_dfechadesdes = Simple.eve_dfechadesdes;
      this._eve_choradesde = Simple.eve_choradesde;
      this._eve_dfechahasta = Simple.eve_dfechahasta;
      this._eve_chorahasta = Simple.eve_chorahasta;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_eventos_feriados(SqlConfig, UserId, (Simplet_eventos_feriados) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_dfechadesdes", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("eve_choradesde", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_dfechahasta", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("eve_chorahasta", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["eve_ccodigo"] = (object) this._eve_ccodigo;
      row["eve_cdescripcion"] = (object) this._eve_cdescripcion;
      row["eve_dfechadesdes"] = (object) this._eve_dfechadesdes;
      row["eve_choradesde"] = (object) this._eve_choradesde;
      row["eve_dfechahasta"] = (object) this._eve_dfechahasta;
      row["eve_chorahasta"] = (object) this._eve_chorahasta;
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
