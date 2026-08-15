// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_stock_cabecera
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
  public class Callerm_stock_cabecera : CallerObject
  {
    private int _stc_iddepositoorigen;
    private int _stc_iddepositodestino;
    private int _stc_iusuariodss;
    private int _stc_itecnico;
    private string _stc_tipomov;
    private string _stc_comprobantetipo;
    private string _stc_comprobante;
    private string _stc_referencia;
    private string _stc_descripcion;
    private DateTime? _stc_fecha;

    public int stc_iddepositoorigen
    {
      get
      {
        return this._stc_iddepositoorigen;
      }
      set
      {
        this._stc_iddepositoorigen = value;
      }
    }

    public int stc_iddepositodestino
    {
      get
      {
        return this._stc_iddepositodestino;
      }
      set
      {
        this._stc_iddepositodestino = value;
      }
    }

    public int stc_iusuariodss
    {
      get
      {
        return this._stc_iusuariodss;
      }
      set
      {
        this._stc_iusuariodss = value;
      }
    }

    public int stc_itecnico
    {
      get
      {
        return this._stc_itecnico;
      }
      set
      {
        this._stc_itecnico = value;
      }
    }

    public string stc_tipomov
    {
      get
      {
        return this._stc_tipomov;
      }
      set
      {
        this._stc_tipomov = value;
      }
    }

    public string stc_comprobantetipo
    {
      get
      {
        return this._stc_comprobantetipo;
      }
      set
      {
        this._stc_comprobantetipo = value;
      }
    }

    public string stc_comprobante
    {
      get
      {
        return this._stc_comprobante;
      }
      set
      {
        this._stc_comprobante = value;
      }
    }

    public string stc_referencia
    {
      get
      {
        return this._stc_referencia;
      }
      set
      {
        this._stc_referencia = value;
      }
    }

    public string stc_descripcion
    {
      get
      {
        return this._stc_descripcion;
      }
      set
      {
        this._stc_descripcion = value;
      }
    }

    public DateTime? stc_fecha
    {
      get
      {
        return this._stc_fecha;
      }
      set
      {
        this._stc_fecha = value;
      }
    }

    public Callerm_stock_cabecera()
    {
      this.InitClass();
    }

    public Callerm_stock_cabecera(int Id, string Name, int stc_iddepositoorigen, int stc_iddepositodestino, int stc_iusuariodss, int stc_itecnico, string stc_tipomov, string stc_comprobantetipo, string stc_comprobante, string stc_referencia, string stc_descripcion, DateTime? stc_fecha)
    {
      this.Id = Id;
      this.Name = Name;
      this._stc_iddepositoorigen = stc_iddepositoorigen;
      this._stc_iddepositodestino = stc_iddepositodestino;
      this._stc_iusuariodss = stc_iusuariodss;
      this._stc_itecnico = stc_itecnico;
      this._stc_tipomov = stc_tipomov;
      this._stc_comprobantetipo = stc_comprobantetipo;
      this._stc_comprobante = stc_comprobante;
      this._stc_referencia = stc_referencia;
      this._stc_descripcion = stc_descripcion;
      this._stc_fecha = stc_fecha;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3142, "m_stock_cabecera");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_stock_cabecera simplemStockCabecera = new Simplem_stock_cabecera();
      simplemStockCabecera.Id = this.Id;
      simplemStockCabecera.Name = this.Name;
      simplemStockCabecera.stc_iddepositoorigen = this._stc_iddepositoorigen;
      simplemStockCabecera.stc_iddepositodestino = this._stc_iddepositodestino;
      simplemStockCabecera.stc_iusuariodss = this._stc_iusuariodss;
      simplemStockCabecera.stc_itecnico = this._stc_itecnico;
      simplemStockCabecera.stc_tipomov = this._stc_tipomov;
      simplemStockCabecera.stc_comprobantetipo = this._stc_comprobantetipo;
      simplemStockCabecera.stc_comprobante = this._stc_comprobante;
      simplemStockCabecera.stc_referencia = this._stc_referencia;
      simplemStockCabecera.stc_descripcion = this._stc_descripcion;
      simplemStockCabecera.stc_fecha = this._stc_fecha;
      return (SimpleBaseObject) simplemStockCabecera;
    }

    public void SetSimpleObject(Simplem_stock_cabecera Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._stc_iddepositoorigen = Simple.stc_iddepositoorigen;
      this._stc_iddepositodestino = Simple.stc_iddepositodestino;
      this._stc_iusuariodss = Simple.stc_iusuariodss;
      this._stc_itecnico = Simple.stc_itecnico;
      this._stc_tipomov = Simple.stc_tipomov;
      this._stc_comprobantetipo = Simple.stc_comprobantetipo;
      this._stc_comprobante = Simple.stc_comprobante;
      this._stc_referencia = Simple.stc_referencia;
      this._stc_descripcion = Simple.stc_descripcion;
      this._stc_fecha = Simple.stc_fecha;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_stock_cabecera(SqlConfig, UserId, (Simplem_stock_cabecera) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_iddepositoorigen", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_iddepositodestino", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_iusuariodss", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_itecnico", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stc_tipomov", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_comprobantetipo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_comprobante", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_referencia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_descripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stc_fecha", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stc_iddepositoorigen"] = (object) this._stc_iddepositoorigen;
      row["stc_iddepositodestino"] = (object) this._stc_iddepositodestino;
      row["stc_iusuariodss"] = (object) this._stc_iusuariodss;
      row["stc_itecnico"] = (object) this._stc_itecnico;
      row["stc_tipomov"] = (object) this._stc_tipomov;
      row["stc_comprobantetipo"] = (object) this._stc_comprobantetipo;
      row["stc_comprobante"] = (object) this._stc_comprobante;
      row["stc_referencia"] = (object) this._stc_referencia;
      row["stc_descripcion"] = (object) this._stc_descripcion;
      row["stc_fecha"] = (object) this._stc_fecha;
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
