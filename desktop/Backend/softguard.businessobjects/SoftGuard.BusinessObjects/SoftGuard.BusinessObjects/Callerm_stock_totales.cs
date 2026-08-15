// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_stock_totales
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
  public class Callerm_stock_totales : CallerObject
  {
    private int _stt_iddeposito;
    private int _stt_idproducto;
    private int _stt_idtecnico;
    private float _stt_cant;
    private DateTime? _stt_fecha;

    public int stt_iddeposito
    {
      get
      {
        return this._stt_iddeposito;
      }
      set
      {
        this._stt_iddeposito = value;
      }
    }

    public int stt_idproducto
    {
      get
      {
        return this._stt_idproducto;
      }
      set
      {
        this._stt_idproducto = value;
      }
    }

    public int stt_idtecnico
    {
      get
      {
        return this._stt_idtecnico;
      }
      set
      {
        this._stt_idtecnico = value;
      }
    }

    public float stt_cant
    {
      get
      {
        return this._stt_cant;
      }
      set
      {
        this._stt_cant = value;
      }
    }

    public DateTime? stt_fecha
    {
      get
      {
        return this._stt_fecha;
      }
      set
      {
        this._stt_fecha = value;
      }
    }

    public Callerm_stock_totales()
    {
      this.InitClass();
    }

    public Callerm_stock_totales(int Id, string Name, int stt_iddeposito, int stt_idproducto, int stt_idtecnico, float stt_cant, DateTime? stt_fecha)
    {
      this.Id = Id;
      this.Name = Name;
      this._stt_iddeposito = stt_iddeposito;
      this._stt_idproducto = stt_idproducto;
      this._stt_idtecnico = stt_idtecnico;
      this._stt_cant = stt_cant;
      this._stt_fecha = stt_fecha;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3141, "m_stock_totales");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_stock_totales simplemStockTotales = new Simplem_stock_totales();
      simplemStockTotales.Id = this.Id;
      simplemStockTotales.Name = this.Name;
      simplemStockTotales.stt_iddeposito = this._stt_iddeposito;
      simplemStockTotales.stt_idproducto = this._stt_idproducto;
      simplemStockTotales.stt_idtecnico = this._stt_idtecnico;
      simplemStockTotales.stt_cant = this._stt_cant;
      simplemStockTotales.stt_fecha = this._stt_fecha;
      return (SimpleBaseObject) simplemStockTotales;
    }

    public void SetSimpleObject(Simplem_stock_totales Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._stt_iddeposito = Simple.stt_iddeposito;
      this._stt_idproducto = Simple.stt_idproducto;
      this._stt_idtecnico = Simple.stt_idtecnico;
      this._stt_cant = Simple.stt_cant;
      this._stt_fecha = Simple.stt_fecha;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_stock_totales(SqlConfig, UserId, (Simplem_stock_totales) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stt_iddeposito", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stt_idproducto", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stt_idtecnico", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stt_cant", typeof (float)));
      dataTable.Columns.Add(new DataColumn("stt_fecha", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stt_iddeposito"] = (object) this._stt_iddeposito;
      row["stt_idproducto"] = (object) this._stt_idproducto;
      row["stt_idtecnico"] = (object) this._stt_idtecnico;
      row["stt_cant"] = (object) this._stt_cant;
      row["stt_fecha"] = (object) this._stt_fecha;
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
