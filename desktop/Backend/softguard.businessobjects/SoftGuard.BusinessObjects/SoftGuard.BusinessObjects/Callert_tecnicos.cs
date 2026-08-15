// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_tecnicos
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
  public class Callert_tecnicos : CallerObject
  {
    private string _tec_ccodigo;
    private string _tec_cnombre;
    private string _tec_ctelefono;
    private string _tec_cmail;
    private Decimal _tec_ningreso;
    private Decimal _tec_negreso;
    private string _tec_cobservaciones;
    private Decimal _tec_nestado;

    public string tec_ccodigo
    {
      get
      {
        return this._tec_ccodigo;
      }
      set
      {
        this._tec_ccodigo = value;
      }
    }

    public string tec_cnombre
    {
      get
      {
        return this._tec_cnombre;
      }
      set
      {
        this._tec_cnombre = value;
      }
    }

    public string tec_ctelefono
    {
      get
      {
        return this._tec_ctelefono;
      }
      set
      {
        this._tec_ctelefono = value;
      }
    }

    public string tec_cmail
    {
      get
      {
        return this._tec_cmail;
      }
      set
      {
        this._tec_cmail = value;
      }
    }

    public Decimal tec_ningreso
    {
      get
      {
        return this._tec_ningreso;
      }
      set
      {
        this._tec_ningreso = value;
      }
    }

    public Decimal tec_negreso
    {
      get
      {
        return this._tec_negreso;
      }
      set
      {
        this._tec_negreso = value;
      }
    }

    public string tec_cobservaciones
    {
      get
      {
        return this._tec_cobservaciones;
      }
      set
      {
        this._tec_cobservaciones = value;
      }
    }

    public Decimal tec_nestado
    {
      get
      {
        return this._tec_nestado;
      }
      set
      {
        this._tec_nestado = value;
      }
    }

    public Callert_tecnicos()
    {
      this.InitClass();
    }

    public Callert_tecnicos(int Id, string Name, string tec_ccodigo, string tec_cnombre, string tec_ctelefono, string tec_cmail, Decimal tec_ningreso, Decimal tec_negreso, string tec_cobservaciones, Decimal tec_nestado)
    {
      this.Id = Id;
      this.Name = Name;
      this._tec_ccodigo = tec_ccodigo;
      this._tec_cnombre = tec_cnombre;
      this._tec_ctelefono = tec_ctelefono;
      this._tec_cmail = tec_cmail;
      this._tec_ningreso = tec_ningreso;
      this._tec_negreso = tec_negreso;
      this._tec_cobservaciones = tec_cobservaciones;
      this._tec_nestado = tec_nestado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3029, "t_tecnicos");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_tecnicos simpletTecnicos = new Simplet_tecnicos();
      simpletTecnicos.Id = this.Id;
      simpletTecnicos.Name = this.Name;
      simpletTecnicos.tec_ccodigo = this._tec_ccodigo;
      simpletTecnicos.tec_cnombre = this._tec_cnombre;
      simpletTecnicos.tec_ctelefono = this._tec_ctelefono;
      simpletTecnicos.tec_cmail = this._tec_cmail;
      simpletTecnicos.tec_ningreso = this._tec_ningreso;
      simpletTecnicos.tec_negreso = this._tec_negreso;
      simpletTecnicos.tec_cobservaciones = this._tec_cobservaciones;
      simpletTecnicos.tec_nestado = this._tec_nestado;
      return (SimpleBaseObject) simpletTecnicos;
    }

    public void SetSimpleObject(Simplet_tecnicos Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tec_ccodigo = Simple.tec_ccodigo;
      this._tec_cnombre = Simple.tec_cnombre;
      this._tec_ctelefono = Simple.tec_ctelefono;
      this._tec_cmail = Simple.tec_cmail;
      this._tec_ningreso = Simple.tec_ningreso;
      this._tec_negreso = Simple.tec_negreso;
      this._tec_cobservaciones = Simple.tec_cobservaciones;
      this._tec_nestado = Simple.tec_nestado;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_tecnicos(SqlConfig, UserId, (Simplet_tecnicos) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cmail", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_ningreso", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tec_negreso", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tec_cobservaciones", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_nestado", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tec_ccodigo"] = (object) this._tec_ccodigo;
      row["tec_cnombre"] = (object) this._tec_cnombre;
      row["tec_ctelefono"] = (object) this._tec_ctelefono;
      row["tec_cmail"] = (object) this._tec_cmail;
      row["tec_ningreso"] = (object) this._tec_ningreso;
      row["tec_negreso"] = (object) this._tec_negreso;
      row["tec_cobservaciones"] = (object) this._tec_cobservaciones;
      row["tec_nestado"] = (object) this._tec_nestado;
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
