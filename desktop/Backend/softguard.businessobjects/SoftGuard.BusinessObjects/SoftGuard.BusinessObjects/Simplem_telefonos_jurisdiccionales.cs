// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_telefonos_jurisdiccionales
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
  public class Simplem_telefonos_jurisdiccionales : SimpleBaseObject
  {
    [DataMember]
    public string tel_clista { get; set; }

    [DataMember]
    public string tel_cnombre { get; set; }

    [DataMember]
    public string tel_cobservacion { get; set; }

    [DataMember]
    public string tel_ctelefono { get; set; }

    [DataMember]
    public Decimal tel_ndiscado { get; set; }

    [DataMember]
    public string tel_cpredigito { get; set; }

    [DataMember]
    public string tel_cpostdigito { get; set; }

    [DataMember]
    public string tel_cprovincia { get; set; }

    public Simplem_telefonos_jurisdiccionales()
    {
      this.InitClass();
    }

    public Simplem_telefonos_jurisdiccionales(int Id, string Name, string tel_clista, string tel_cnombre, string tel_cobservacion, string tel_ctelefono, Decimal tel_ndiscado, string tel_cpredigito, string tel_cpostdigito, string tel_cprovincia)
    {
      this.Id = Id;
      this.Name = Name;
      this.tel_clista = tel_clista;
      this.tel_cnombre = tel_cnombre;
      this.tel_cobservacion = tel_cobservacion;
      this.tel_ctelefono = tel_ctelefono;
      this.tel_ndiscado = tel_ndiscado;
      this.tel_cpredigito = tel_cpredigito;
      this.tel_cpostdigito = tel_cpostdigito;
      this.tel_cprovincia = tel_cprovincia;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3099, "m_telefonos_jurisdiccionales");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_telefonos_jurisdiccionales(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_telefonos_jurisdiccionales jurisdiccionales = new Callerm_telefonos_jurisdiccionales();
      jurisdiccionales.Id = this.Id;
      jurisdiccionales.Name = this.Name;
      jurisdiccionales.tel_clista = this.tel_clista;
      jurisdiccionales.tel_cnombre = this.tel_cnombre;
      jurisdiccionales.tel_cobservacion = this.tel_cobservacion;
      jurisdiccionales.tel_ctelefono = this.tel_ctelefono;
      jurisdiccionales.tel_ndiscado = this.tel_ndiscado;
      jurisdiccionales.tel_cpredigito = this.tel_cpredigito;
      jurisdiccionales.tel_cpostdigito = this.tel_cpostdigito;
      jurisdiccionales.tel_cprovincia = this.tel_cprovincia;
      return (CallerObject) jurisdiccionales;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_clista", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cobservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_ndiscado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tel_cpredigito", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cpostdigito", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cprovincia", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tel_clista"] = (object) this.tel_clista ?? (object) DBNull.Value;
      row["tel_cnombre"] = (object) this.tel_cnombre ?? (object) DBNull.Value;
      row["tel_cobservacion"] = (object) this.tel_cobservacion ?? (object) DBNull.Value;
      row["tel_ctelefono"] = (object) this.tel_ctelefono ?? (object) DBNull.Value;
      row["tel_ndiscado"] = (object) this.tel_ndiscado ?? (object) DBNull.Value;
      row["tel_cpredigito"] = (object) this.tel_cpredigito ?? (object) DBNull.Value;
      row["tel_cpostdigito"] = (object) this.tel_cpostdigito ?? (object) DBNull.Value;
      row["tel_cprovincia"] = (object) this.tel_cprovincia ?? (object) DBNull.Value;
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
