// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_resoluciones
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
  public class Callert_resoluciones : CallerObject
  {
    private string _res_ccodigo;
    private string _res_cdescripcion;
    private Decimal _res_nfalsaalarma;
    private Decimal _res_nEstado;

    public string res_ccodigo
    {
      get
      {
        return this._res_ccodigo;
      }
      set
      {
        this._res_ccodigo = value;
      }
    }

    public string res_cdescripcion
    {
      get
      {
        return this._res_cdescripcion;
      }
      set
      {
        this._res_cdescripcion = value;
      }
    }

    public Decimal res_nfalsaalarma
    {
      get
      {
        return this._res_nfalsaalarma;
      }
      set
      {
        this._res_nfalsaalarma = value;
      }
    }

    public Decimal res_nEstado
    {
      get
      {
        return this._res_nEstado;
      }
      set
      {
        this._res_nEstado = value;
      }
    }

    public Callert_resoluciones()
    {
      this.InitClass();
    }

    public Callert_resoluciones(int Id, string Name, string res_ccodigo, string res_cdescripcion, Decimal res_nfalsaalarma, Decimal res_nEstado)
    {
      this.Id = Id;
      this.Name = Name;
      this._res_ccodigo = res_ccodigo;
      this._res_cdescripcion = res_cdescripcion;
      this._res_nfalsaalarma = res_nfalsaalarma;
      this._res_nEstado = res_nEstado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3078, "t_resoluciones");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_resoluciones simpletResoluciones = new Simplet_resoluciones();
      simpletResoluciones.Id = this.Id;
      simpletResoluciones.Name = this.Name;
      simpletResoluciones.res_ccodigo = this._res_ccodigo;
      simpletResoluciones.res_cdescripcion = this._res_cdescripcion;
      simpletResoluciones.res_nfalsaalarma = this._res_nfalsaalarma;
      simpletResoluciones.res_nEstado = this._res_nEstado;
      return (SimpleBaseObject) simpletResoluciones;
    }

    public void SetSimpleObject(Simplet_resoluciones Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._res_ccodigo = Simple.res_ccodigo;
      this._res_cdescripcion = Simple.res_cdescripcion;
      this._res_nfalsaalarma = Simple.res_nfalsaalarma;
      this._res_nEstado = Simple.res_nEstado;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_resoluciones(SqlConfig, UserId, (Simplet_resoluciones) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("res_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("res_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("res_nfalsaalarma", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("res_nEstado", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["res_ccodigo"] = (object) this._res_ccodigo;
      row["res_cdescripcion"] = (object) this._res_cdescripcion;
      row["res_nfalsaalarma"] = (object) this._res_nfalsaalarma;
      row["res_nEstado"] = (object) this._res_nEstado;
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
