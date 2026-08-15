// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerZona
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
  public class CallerZona : CallerObject
  {
    private int _zon_iidcuenta;
    private string _zon_ccodigo;
    private string _zon_cdescripcion;
    private string _zon_codigoalarma;
    private string _zon_clistaemergencia;
    private string _zon_cimagen;
    private string _zon_mobservacion;
    private string _zon_ccodigorestauracion;
    private Decimal _zon_nminutosrestauracion;
    private Decimal _zon_nmostrar;
    private string _zon_cdealer;
    private string _zon_ccuenta;
    private Decimal _zon_nautoprocesa;
    private string _zon_cAlarmaAGenerar;

    public int zon_iidcuenta
    {
      get
      {
        return this._zon_iidcuenta;
      }
      set
      {
        this._zon_iidcuenta = value;
      }
    }

    public string zon_ccodigo
    {
      get
      {
        return this._zon_ccodigo;
      }
      set
      {
        this._zon_ccodigo = value;
      }
    }

    public string zon_cdescripcion
    {
      get
      {
        return this._zon_cdescripcion;
      }
      set
      {
        this._zon_cdescripcion = value;
      }
    }

    public string zon_codigoalarma
    {
      get
      {
        return this._zon_codigoalarma;
      }
      set
      {
        this._zon_codigoalarma = value;
      }
    }

    public string zon_clistaemergencia
    {
      get
      {
        return this._zon_clistaemergencia;
      }
      set
      {
        this._zon_clistaemergencia = value;
      }
    }

    public string zon_cimagen
    {
      get
      {
        return this._zon_cimagen;
      }
      set
      {
        this._zon_cimagen = value;
      }
    }

    public string zon_mobservacion
    {
      get
      {
        return this._zon_mobservacion;
      }
      set
      {
        this._zon_mobservacion = value;
      }
    }

    public string zon_ccodigorestauracion
    {
      get
      {
        return this._zon_ccodigorestauracion;
      }
      set
      {
        this._zon_ccodigorestauracion = value;
      }
    }

    public Decimal zon_nminutosrestauracion
    {
      get
      {
        return this._zon_nminutosrestauracion;
      }
      set
      {
        this._zon_nminutosrestauracion = value;
      }
    }

    public Decimal zon_nmostrar
    {
      get
      {
        return this._zon_nmostrar;
      }
      set
      {
        this._zon_nmostrar = value;
      }
    }

    public string zon_cdealer
    {
      get
      {
        return this._zon_cdealer;
      }
      set
      {
        this._zon_cdealer = value;
      }
    }

    public string zon_ccuenta
    {
      get
      {
        return this._zon_ccuenta;
      }
      set
      {
        this._zon_ccuenta = value;
      }
    }

    public Decimal zon_nautoprocesa
    {
      get
      {
        return this._zon_nautoprocesa;
      }
      set
      {
        this._zon_nautoprocesa = value;
      }
    }

    public string zon_cAlarmaAGenerar
    {
      get
      {
        return this._zon_cAlarmaAGenerar;
      }
      set
      {
        this._zon_cAlarmaAGenerar = value;
      }
    }

    public CallerZona()
    {
      this.InitClass();
    }

    public CallerZona(int Id, string Name, int zon_iidcuenta, string zon_ccodigo, string zon_cdescripcion, string zon_codigoalarma, string zon_clistaemergencia, string zon_cimagen, string zon_mobservacion, string zon_ccodigorestauracion, Decimal zon_nminutosrestauracion, Decimal zon_nmostrar, string zon_cdealer, string zon_ccuenta, Decimal zon_nautoprocesa, string zon_cAlarmaAGenerar)
    {
      this.Id = Id;
      this.Name = Name;
      this._zon_iidcuenta = zon_iidcuenta;
      this._zon_ccodigo = zon_ccodigo;
      this._zon_cdescripcion = zon_cdescripcion;
      this._zon_codigoalarma = zon_codigoalarma;
      this._zon_clistaemergencia = zon_clistaemergencia;
      this._zon_cimagen = zon_cimagen;
      this._zon_mobservacion = zon_mobservacion;
      this._zon_ccodigorestauracion = zon_ccodigorestauracion;
      this._zon_nminutosrestauracion = zon_nminutosrestauracion;
      this._zon_nmostrar = zon_nmostrar;
      this._zon_cdealer = zon_cdealer;
      this._zon_ccuenta = zon_ccuenta;
      this._zon_nautoprocesa = zon_nautoprocesa;
      this._zon_cAlarmaAGenerar = zon_cAlarmaAGenerar;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3014, "Zona");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleZona simpleZona = new SimpleZona();
      simpleZona.Id = this.Id;
      simpleZona.Name = this.Name;
      simpleZona.zon_iidcuenta = this._zon_iidcuenta;
      simpleZona.zon_ccodigo = this._zon_ccodigo;
      simpleZona.zon_cdescripcion = this._zon_cdescripcion;
      simpleZona.zon_codigoalarma = this._zon_codigoalarma;
      simpleZona.zon_clistaemergencia = this._zon_clistaemergencia;
      simpleZona.zon_cimagen = this._zon_cimagen;
      simpleZona.zon_mobservacion = this._zon_mobservacion;
      simpleZona.zon_ccodigorestauracion = this._zon_ccodigorestauracion;
      simpleZona.zon_nminutosrestauracion = this._zon_nminutosrestauracion;
      simpleZona.zon_nmostrar = this._zon_nmostrar;
      simpleZona.zon_cdealer = this._zon_cdealer;
      simpleZona.zon_ccuenta = this._zon_ccuenta;
      simpleZona.zon_nautoprocesa = this._zon_nautoprocesa;
      simpleZona.zon_cAlarmaAGenerar = this._zon_cAlarmaAGenerar;
      return (SimpleBaseObject) simpleZona;
    }

    public void SetSimpleObject(SimpleZona Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._zon_iidcuenta = Simple.zon_iidcuenta;
      this._zon_ccodigo = Simple.zon_ccodigo;
      this._zon_cdescripcion = Simple.zon_cdescripcion;
      this._zon_codigoalarma = Simple.zon_codigoalarma;
      this._zon_clistaemergencia = Simple.zon_clistaemergencia;
      this._zon_cimagen = Simple.zon_cimagen;
      this._zon_mobservacion = Simple.zon_mobservacion;
      this._zon_ccodigorestauracion = Simple.zon_ccodigorestauracion;
      this._zon_nminutosrestauracion = Simple.zon_nminutosrestauracion;
      this._zon_nmostrar = Simple.zon_nmostrar;
      this._zon_cdealer = Simple.zon_cdealer;
      this._zon_ccuenta = Simple.zon_ccuenta;
      this._zon_nautoprocesa = Simple.zon_nautoprocesa;
      this._zon_cAlarmaAGenerar = Simple.zon_cAlarmaAGenerar;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalZona(SqlConfig, UserId, (SimpleZona) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_clistaemergencia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_mobservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_ccodigorestauracion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_nminutosrestauracion", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("zon_nmostrar", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("zon_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_ccuenta", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_nautoprocesa", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("zon_cAlarmaAGenerar", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["zon_iidcuenta"] = (object) this._zon_iidcuenta;
      row["zon_ccodigo"] = (object) this._zon_ccodigo;
      row["zon_cdescripcion"] = (object) this._zon_cdescripcion;
      row["zon_codigoalarma"] = (object) this._zon_codigoalarma;
      row["zon_clistaemergencia"] = (object) this._zon_clistaemergencia;
      row["zon_cimagen"] = (object) this._zon_cimagen;
      row["zon_mobservacion"] = (object) this._zon_mobservacion;
      row["zon_ccodigorestauracion"] = (object) this._zon_ccodigorestauracion;
      row["zon_nminutosrestauracion"] = (object) this._zon_nminutosrestauracion;
      row["zon_nmostrar"] = (object) this._zon_nmostrar;
      row["zon_cdealer"] = (object) this._zon_cdealer;
      row["zon_ccuenta"] = (object) this._zon_ccuenta;
      row["zon_nautoprocesa"] = (object) this._zon_nautoprocesa;
      row["zon_cAlarmaAGenerar"] = (object) this._zon_cAlarmaAGenerar;
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
