// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_stock_cabecera
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
  public class Simplem_stock_cabecera : SimpleBaseObject
  {
    [DataMember]
    public int stc_iddepositoorigen { get; set; }

    [DataMember]
    public int stc_iddepositodestino { get; set; }

    [DataMember]
    public int stc_iusuariodss { get; set; }

    [DataMember]
    public int stc_itecnico { get; set; }

    [DataMember]
    public string stc_tipomov { get; set; }

    [DataMember]
    public string stc_comprobantetipo { get; set; }

    [DataMember]
    public string stc_comprobante { get; set; }

    [DataMember]
    public string stc_referencia { get; set; }

    [DataMember]
    public string stc_descripcion { get; set; }

    [DataMember]
    public DateTime? stc_fecha { get; set; }

    public Simplem_stock_cabecera()
    {
      this.InitClass();
    }

    public Simplem_stock_cabecera(int Id, string Name, int stc_iddepositoorigen, int stc_iddepositodestino, int stc_iusuariodss, int stc_itecnico, string stc_tipomov, string stc_comprobantetipo, string stc_comprobante, string stc_referencia, string stc_descripcion, DateTime? stc_fecha)
    {
      this.Id = Id;
      this.Name = Name;
      this.stc_iddepositoorigen = stc_iddepositoorigen;
      this.stc_iddepositodestino = stc_iddepositodestino;
      this.stc_iusuariodss = stc_iusuariodss;
      this.stc_itecnico = stc_itecnico;
      this.stc_tipomov = stc_tipomov;
      this.stc_comprobantetipo = stc_comprobantetipo;
      this.stc_comprobante = stc_comprobante;
      this.stc_referencia = stc_referencia;
      this.stc_descripcion = stc_descripcion;
      this.stc_fecha = stc_fecha;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3142, "m_stock_cabecera");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_stock_cabecera(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_stock_cabecera callermStockCabecera = new Callerm_stock_cabecera();
      callermStockCabecera.Id = this.Id;
      callermStockCabecera.Name = this.Name;
      callermStockCabecera.stc_iddepositoorigen = this.stc_iddepositoorigen;
      callermStockCabecera.stc_iddepositodestino = this.stc_iddepositodestino;
      callermStockCabecera.stc_iusuariodss = this.stc_iusuariodss;
      callermStockCabecera.stc_itecnico = this.stc_itecnico;
      callermStockCabecera.stc_tipomov = this.stc_tipomov;
      callermStockCabecera.stc_comprobantetipo = this.stc_comprobantetipo;
      callermStockCabecera.stc_comprobante = this.stc_comprobante;
      callermStockCabecera.stc_referencia = this.stc_referencia;
      callermStockCabecera.stc_descripcion = this.stc_descripcion;
      callermStockCabecera.stc_fecha = this.stc_fecha;
      return (CallerObject) callermStockCabecera;
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
      row["stc_iddepositoorigen"] = (object) this.stc_iddepositoorigen ?? (object) DBNull.Value;
      row["stc_iddepositodestino"] = (object) this.stc_iddepositodestino ?? (object) DBNull.Value;
      row["stc_iusuariodss"] = (object) this.stc_iusuariodss ?? (object) DBNull.Value;
      row["stc_itecnico"] = (object) this.stc_itecnico ?? (object) DBNull.Value;
      row["stc_tipomov"] = (object) this.stc_tipomov ?? (object) DBNull.Value;
      row["stc_comprobantetipo"] = (object) this.stc_comprobantetipo ?? (object) DBNull.Value;
      row["stc_comprobante"] = (object) this.stc_comprobante ?? (object) DBNull.Value;
      row["stc_referencia"] = (object) this.stc_referencia ?? (object) DBNull.Value;
      row["stc_descripcion"] = (object) this.stc_descripcion ?? (object) DBNull.Value;
      row["stc_fecha"] = (object) this.stc_fecha ?? (object) DBNull.Value;
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
