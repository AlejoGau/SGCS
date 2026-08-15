// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_stock_totales
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Runtime.Serialization;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  [DataContract]
  public class Simplem_stock_totales : SimpleBaseObject
  {
    [DataMember]
    public int stt_iddeposito { get; set; }

    [DataMember]
    public int stt_idproducto { get; set; }

    [DataMember]
    public int stt_idtecnico { get; set; }

    [DataMember]
    public float stt_cant { get; set; }

    [DataMember]
    public DateTime? stt_fecha { get; set; }

    public Simplem_stock_totales()
    {
      this.InitClass();
    }

    public Simplem_stock_totales(int Id, string Name, int stt_iddeposito, int stt_idproducto, int stt_idtecnico, float stt_cant, DateTime? stt_fecha)
    {
      this.Id = Id;
      this.Name = Name;
      this.stt_iddeposito = stt_iddeposito;
      this.stt_idproducto = stt_idproducto;
      this.stt_idtecnico = stt_idtecnico;
      this.stt_cant = stt_cant;
      this.stt_fecha = stt_fecha;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3141, "m_stock_totales");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_stock_totales(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_stock_totales callermStockTotales = new Callerm_stock_totales();
      callermStockTotales.Id = this.Id;
      callermStockTotales.Name = this.Name;
      callermStockTotales.stt_iddeposito = this.stt_iddeposito;
      callermStockTotales.stt_idproducto = this.stt_idproducto;
      callermStockTotales.stt_idtecnico = this.stt_idtecnico;
      callermStockTotales.stt_cant = this.stt_cant;
      callermStockTotales.stt_fecha = this.stt_fecha;
      return (CallerObject) callermStockTotales;
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
      row["stt_iddeposito"] = (object) this.stt_iddeposito ?? (object) DBNull.Value;
      row["stt_idproducto"] = (object) this.stt_idproducto ?? (object) DBNull.Value;
      row["stt_idtecnico"] = (object) this.stt_idtecnico ?? (object) DBNull.Value;
      row["stt_cant"] = (object) this.stt_cant ?? (object) DBNull.Value;
      row["stt_fecha"] = (object) this.stt_fecha ?? (object) DBNull.Value;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Object") { EnforceConstraints = false, Tables = { this.GetDataObject(), this.Type.GetDataObject() } });
      if (this.CallerObject != null)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;
      if (this.Dependencies.Count != 0)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
