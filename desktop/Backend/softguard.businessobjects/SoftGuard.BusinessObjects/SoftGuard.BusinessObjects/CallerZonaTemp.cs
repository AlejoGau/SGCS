// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerZonaTemp
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerZonaTemp : CallerObject
  {
    private long _zon_idregistro;
    private int _zon_iidcuenta;
    private int _zon_usuario;
    private string _zon_ccodigo;
    private string _zon_cdescripcion;
    private string _zon_codigoalarma;
    private string _zon_tipo;
    private string _zon_cimagen;

    public long zon_idregistro
    {
      get
      {
        return this._zon_idregistro;
      }
      set
      {
        this._zon_idregistro = value;
      }
    }

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

    public int zon_usuario
    {
      get
      {
        return this._zon_usuario;
      }
      set
      {
        this._zon_usuario = value;
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

    public string zon_tipo
    {
      get
      {
        return this._zon_tipo;
      }
      set
      {
        this._zon_tipo = value;
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

    public CallerZonaTemp()
    {
      this.InitClass();
    }

    public CallerZonaTemp(int Id, string Name, long zon_idregistro, int zon_iidcuenta, int zon_usuario, string zon_ccodigo, string zon_cdescripcion, string zon_codigoalarma, string zon_tipo, string zon_cimagen)
    {
      this.Id = Id;
      this.Name = Name;
      this._zon_idregistro = zon_idregistro;
      this._zon_iidcuenta = zon_iidcuenta;
      this._zon_usuario = zon_usuario;
      this._zon_ccodigo = zon_ccodigo;
      this._zon_cdescripcion = zon_cdescripcion;
      this._zon_codigoalarma = zon_codigoalarma;
      this._zon_tipo = zon_tipo;
      this._zon_cimagen = zon_cimagen;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3016, "ZonaTemp");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleZonaTemp simpleZonaTemp = new SimpleZonaTemp();
      simpleZonaTemp.Id = this.Id;
      simpleZonaTemp.Name = this.Name;
      simpleZonaTemp.zon_idregistro = this._zon_idregistro;
      simpleZonaTemp.zon_iidcuenta = this._zon_iidcuenta;
      simpleZonaTemp.zon_usuario = this._zon_usuario;
      simpleZonaTemp.zon_ccodigo = this._zon_ccodigo;
      simpleZonaTemp.zon_cdescripcion = this._zon_cdescripcion;
      simpleZonaTemp.zon_codigoalarma = this._zon_codigoalarma;
      simpleZonaTemp.zon_tipo = this._zon_tipo;
      simpleZonaTemp.zon_cimagen = this._zon_cimagen;
      return (SimpleBaseObject) simpleZonaTemp;
    }

    public void SetSimpleObject(SimpleZonaTemp Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._zon_idregistro = Simple.zon_idregistro;
      this._zon_iidcuenta = Simple.zon_iidcuenta;
      this._zon_usuario = Simple.zon_usuario;
      this._zon_ccodigo = Simple.zon_ccodigo;
      this._zon_cdescripcion = Simple.zon_cdescripcion;
      this._zon_codigoalarma = Simple.zon_codigoalarma;
      this._zon_tipo = Simple.zon_tipo;
      this._zon_cimagen = Simple.zon_cimagen;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalZonaTemp(SqlConfig, UserId, (SimpleZonaTemp) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_idregistro", typeof (long)));
      dataTable.Columns.Add(new DataColumn("zon_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_usuario", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_tipo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["zon_idregistro"] = (object) this._zon_idregistro;
      row["zon_iidcuenta"] = (object) this._zon_iidcuenta;
      row["zon_usuario"] = (object) this._zon_usuario;
      row["zon_ccodigo"] = (object) this._zon_ccodigo;
      row["zon_cdescripcion"] = (object) this._zon_cdescripcion;
      row["zon_codigoalarma"] = (object) this._zon_codigoalarma;
      row["zon_tipo"] = (object) this._zon_tipo;
      row["zon_cimagen"] = (object) this._zon_cimagen;
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
