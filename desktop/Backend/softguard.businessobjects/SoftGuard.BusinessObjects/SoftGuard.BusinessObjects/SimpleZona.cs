// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleZona
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
  public class SimpleZona : SimpleBaseObject
  {
    [DataMember]
    public int zon_iidcuenta { get; set; }

    [DataMember]
    public string zon_ccodigo { get; set; }

    [DataMember]
    public string zon_cdescripcion { get; set; }

    [DataMember]
    public string zon_codigoalarma { get; set; }

    [DataMember]
    public string zon_clistaemergencia { get; set; }

    [DataMember]
    public string zon_cimagen { get; set; }

    [DataMember]
    public string zon_mobservacion { get; set; }

    [DataMember]
    public string zon_ccodigorestauracion { get; set; }

    [DataMember]
    public Decimal zon_nminutosrestauracion { get; set; }

    [DataMember]
    public Decimal zon_nmostrar { get; set; }

    [DataMember]
    public string zon_cdealer { get; set; }

    [DataMember]
    public string zon_ccuenta { get; set; }

    [DataMember]
    public Decimal zon_nautoprocesa { get; set; }

    [DataMember]
    public string zon_cAlarmaAGenerar { get; set; }

    public SimpleZona()
    {
      this.InitClass();
    }

    public SimpleZona(int Id, string Name, int zon_iidcuenta, string zon_ccodigo, string zon_cdescripcion, string zon_codigoalarma, string zon_clistaemergencia, string zon_cimagen, string zon_mobservacion, string zon_ccodigorestauracion, Decimal zon_nminutosrestauracion, Decimal zon_nmostrar, string zon_cdealer, string zon_ccuenta, Decimal zon_nautoprocesa, string zon_cAlarmaAGenerar)
    {
      this.Id = Id;
      this.Name = Name;
      this.zon_iidcuenta = zon_iidcuenta;
      this.zon_ccodigo = zon_ccodigo;
      this.zon_cdescripcion = zon_cdescripcion;
      this.zon_codigoalarma = zon_codigoalarma;
      this.zon_clistaemergencia = zon_clistaemergencia;
      this.zon_cimagen = zon_cimagen;
      this.zon_mobservacion = zon_mobservacion;
      this.zon_ccodigorestauracion = zon_ccodigorestauracion;
      this.zon_nminutosrestauracion = zon_nminutosrestauracion;
      this.zon_nmostrar = zon_nmostrar;
      this.zon_cdealer = zon_cdealer;
      this.zon_ccuenta = zon_ccuenta;
      this.zon_nautoprocesa = zon_nautoprocesa;
      this.zon_cAlarmaAGenerar = zon_cAlarmaAGenerar;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3014, "Zona");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalZona(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerZona callerZona = new CallerZona();
      callerZona.Id = this.Id;
      callerZona.Name = this.Name;
      callerZona.zon_iidcuenta = this.zon_iidcuenta;
      callerZona.zon_ccodigo = this.zon_ccodigo;
      callerZona.zon_cdescripcion = this.zon_cdescripcion;
      callerZona.zon_codigoalarma = this.zon_codigoalarma;
      callerZona.zon_clistaemergencia = this.zon_clistaemergencia;
      callerZona.zon_cimagen = this.zon_cimagen;
      callerZona.zon_mobservacion = this.zon_mobservacion;
      callerZona.zon_ccodigorestauracion = this.zon_ccodigorestauracion;
      callerZona.zon_nminutosrestauracion = this.zon_nminutosrestauracion;
      callerZona.zon_nmostrar = this.zon_nmostrar;
      callerZona.zon_cdealer = this.zon_cdealer;
      callerZona.zon_ccuenta = this.zon_ccuenta;
      callerZona.zon_nautoprocesa = this.zon_nautoprocesa;
      callerZona.zon_cAlarmaAGenerar = this.zon_cAlarmaAGenerar;
      return (CallerObject) callerZona;
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
      row["zon_iidcuenta"] = (object) this.zon_iidcuenta ?? (object) DBNull.Value;
      row["zon_ccodigo"] = (object) this.zon_ccodigo ?? (object) DBNull.Value;
      row["zon_cdescripcion"] = (object) this.zon_cdescripcion ?? (object) DBNull.Value;
      row["zon_codigoalarma"] = (object) this.zon_codigoalarma ?? (object) DBNull.Value;
      row["zon_clistaemergencia"] = (object) this.zon_clistaemergencia ?? (object) DBNull.Value;
      row["zon_cimagen"] = (object) this.zon_cimagen ?? (object) DBNull.Value;
      row["zon_mobservacion"] = (object) this.zon_mobservacion ?? (object) DBNull.Value;
      row["zon_ccodigorestauracion"] = (object) this.zon_ccodigorestauracion ?? (object) DBNull.Value;
      row["zon_nminutosrestauracion"] = (object) this.zon_nminutosrestauracion ?? (object) DBNull.Value;
      row["zon_nmostrar"] = (object) this.zon_nmostrar ?? (object) DBNull.Value;
      row["zon_cdealer"] = (object) this.zon_cdealer ?? (object) DBNull.Value;
      row["zon_ccuenta"] = (object) this.zon_ccuenta ?? (object) DBNull.Value;
      row["zon_nautoprocesa"] = (object) this.zon_nautoprocesa ?? (object) DBNull.Value;
      row["zon_cAlarmaAGenerar"] = (object) this.zon_cAlarmaAGenerar ?? (object) DBNull.Value;
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
