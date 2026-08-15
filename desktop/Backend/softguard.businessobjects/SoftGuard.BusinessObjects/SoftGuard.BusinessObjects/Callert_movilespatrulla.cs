// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_movilespatrulla
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
  public class Callert_movilespatrulla : CallerObject
  {
    private string _tmp_cnombre;
    private string _tmp_cnumero;
    private string _tmp_clicencia;
    private string _tmp_cmarca;
    private string _tmp_cmodelo;
    private string _tmp_cpathfoto;
    private string _tmp_cflota;
    private Decimal _tmp_nestado;
    private int _tmp_icuenta;
    private int _tmp_iAsignado;

    public string tmp_cnombre
    {
      get
      {
        return this._tmp_cnombre;
      }
      set
      {
        this._tmp_cnombre = value;
      }
    }

    public string tmp_cnumero
    {
      get
      {
        return this._tmp_cnumero;
      }
      set
      {
        this._tmp_cnumero = value;
      }
    }

    public string tmp_clicencia
    {
      get
      {
        return this._tmp_clicencia;
      }
      set
      {
        this._tmp_clicencia = value;
      }
    }

    public string tmp_cmarca
    {
      get
      {
        return this._tmp_cmarca;
      }
      set
      {
        this._tmp_cmarca = value;
      }
    }

    public string tmp_cmodelo
    {
      get
      {
        return this._tmp_cmodelo;
      }
      set
      {
        this._tmp_cmodelo = value;
      }
    }

    public string tmp_cpathfoto
    {
      get
      {
        return this._tmp_cpathfoto;
      }
      set
      {
        this._tmp_cpathfoto = value;
      }
    }

    public string tmp_cflota
    {
      get
      {
        return this._tmp_cflota;
      }
      set
      {
        this._tmp_cflota = value;
      }
    }

    public Decimal tmp_nestado
    {
      get
      {
        return this._tmp_nestado;
      }
      set
      {
        this._tmp_nestado = value;
      }
    }

    public int tmp_icuenta
    {
      get
      {
        return this._tmp_icuenta;
      }
      set
      {
        this._tmp_icuenta = value;
      }
    }

    public int tmp_iAsignado
    {
      get
      {
        return this._tmp_iAsignado;
      }
      set
      {
        this._tmp_iAsignado = value;
      }
    }

    public Callert_movilespatrulla()
    {
      this.InitClass();
    }

    public Callert_movilespatrulla(int Id, string Name, string tmp_cnombre, string tmp_cnumero, string tmp_clicencia, string tmp_cmarca, string tmp_cmodelo, string tmp_cpathfoto, string tmp_cflota, Decimal tmp_nestado, int tmp_icuenta, int tmp_iAsignado)
    {
      this.Id = Id;
      this.Name = Name;
      this._tmp_cnombre = tmp_cnombre;
      this._tmp_cnumero = tmp_cnumero;
      this._tmp_clicencia = tmp_clicencia;
      this._tmp_cmarca = tmp_cmarca;
      this._tmp_cmodelo = tmp_cmodelo;
      this._tmp_cpathfoto = tmp_cpathfoto;
      this._tmp_cflota = tmp_cflota;
      this._tmp_nestado = tmp_nestado;
      this._tmp_icuenta = tmp_icuenta;
      this._tmp_iAsignado = tmp_iAsignado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3087, "t_movilespatrulla");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_movilespatrulla simpletMovilespatrulla = new Simplet_movilespatrulla();
      simpletMovilespatrulla.Id = this.Id;
      simpletMovilespatrulla.Name = this.Name;
      simpletMovilespatrulla.tmp_cnombre = this._tmp_cnombre;
      simpletMovilespatrulla.tmp_cnumero = this._tmp_cnumero;
      simpletMovilespatrulla.tmp_clicencia = this._tmp_clicencia;
      simpletMovilespatrulla.tmp_cmarca = this._tmp_cmarca;
      simpletMovilespatrulla.tmp_cmodelo = this._tmp_cmodelo;
      simpletMovilespatrulla.tmp_cpathfoto = this._tmp_cpathfoto;
      simpletMovilespatrulla.tmp_cflota = this._tmp_cflota;
      simpletMovilespatrulla.tmp_nestado = this._tmp_nestado;
      simpletMovilespatrulla.tmp_icuenta = this._tmp_icuenta;
      simpletMovilespatrulla.tmp_iAsignado = this._tmp_iAsignado;
      return (SimpleBaseObject) simpletMovilespatrulla;
    }

    public void SetSimpleObject(Simplet_movilespatrulla Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tmp_cnombre = Simple.tmp_cnombre;
      this._tmp_cnumero = Simple.tmp_cnumero;
      this._tmp_clicencia = Simple.tmp_clicencia;
      this._tmp_cmarca = Simple.tmp_cmarca;
      this._tmp_cmodelo = Simple.tmp_cmodelo;
      this._tmp_cpathfoto = Simple.tmp_cpathfoto;
      this._tmp_cflota = Simple.tmp_cflota;
      this._tmp_nestado = Simple.tmp_nestado;
      this._tmp_icuenta = Simple.tmp_icuenta;
      this._tmp_iAsignado = Simple.tmp_iAsignado;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_movilespatrulla(SqlConfig, UserId, (Simplet_movilespatrulla) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cnumero", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_clicencia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cmarca", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cmodelo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cpathfoto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cflota", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tmp_icuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tmp_iAsignado", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tmp_cnombre"] = (object) this._tmp_cnombre;
      row["tmp_cnumero"] = (object) this._tmp_cnumero;
      row["tmp_clicencia"] = (object) this._tmp_clicencia;
      row["tmp_cmarca"] = (object) this._tmp_cmarca;
      row["tmp_cmodelo"] = (object) this._tmp_cmodelo;
      row["tmp_cpathfoto"] = (object) this._tmp_cpathfoto;
      row["tmp_cflota"] = (object) this._tmp_cflota;
      row["tmp_nestado"] = (object) this._tmp_nestado;
      row["tmp_icuenta"] = (object) this._tmp_icuenta;
      row["tmp_iAsignado"] = (object) this._tmp_iAsignado;
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
