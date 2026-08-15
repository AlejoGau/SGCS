// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_tecnicos
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
  public class Simplet_tecnicos : SimpleBaseObject
  {
    [DataMember]
    public string tec_ccodigo { get; set; }

    [DataMember]
    public string tec_cnombre { get; set; }

    [DataMember]
    public string tec_ctelefono { get; set; }

    [DataMember]
    public string tec_cmail { get; set; }

    [DataMember]
    public Decimal tec_ningreso { get; set; }

    [DataMember]
    public Decimal tec_negreso { get; set; }

    [DataMember]
    public string tec_cobservaciones { get; set; }

    [DataMember]
    public Decimal tec_nestado { get; set; }

    public Simplet_tecnicos()
    {
      this.InitClass();
    }

    public Simplet_tecnicos(int Id, string Name, string tec_ccodigo, string tec_cnombre, string tec_ctelefono, string tec_cmail, Decimal tec_ningreso, Decimal tec_negreso, string tec_cobservaciones, Decimal tec_nestado)
    {
      this.Id = Id;
      this.Name = Name;
      this.tec_ccodigo = tec_ccodigo;
      this.tec_cnombre = tec_cnombre;
      this.tec_ctelefono = tec_ctelefono;
      this.tec_cmail = tec_cmail;
      this.tec_ningreso = tec_ningreso;
      this.tec_negreso = tec_negreso;
      this.tec_cobservaciones = tec_cobservaciones;
      this.tec_nestado = tec_nestado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3029, "t_tecnicos");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_tecnicos(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_tecnicos callertTecnicos = new Callert_tecnicos();
      callertTecnicos.Id = this.Id;
      callertTecnicos.Name = this.Name;
      callertTecnicos.tec_ccodigo = this.tec_ccodigo;
      callertTecnicos.tec_cnombre = this.tec_cnombre;
      callertTecnicos.tec_ctelefono = this.tec_ctelefono;
      callertTecnicos.tec_cmail = this.tec_cmail;
      callertTecnicos.tec_ningreso = this.tec_ningreso;
      callertTecnicos.tec_negreso = this.tec_negreso;
      callertTecnicos.tec_cobservaciones = this.tec_cobservaciones;
      callertTecnicos.tec_nestado = this.tec_nestado;
      return (CallerObject) callertTecnicos;
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
      row["tec_ccodigo"] = (object) this.tec_ccodigo ?? (object) DBNull.Value;
      row["tec_cnombre"] = (object) this.tec_cnombre ?? (object) DBNull.Value;
      row["tec_ctelefono"] = (object) this.tec_ctelefono ?? (object) DBNull.Value;
      row["tec_cmail"] = (object) this.tec_cmail ?? (object) DBNull.Value;
      row["tec_ningreso"] = (object) this.tec_ningreso ?? (object) DBNull.Value;
      row["tec_negreso"] = (object) this.tec_negreso ?? (object) DBNull.Value;
      row["tec_cobservaciones"] = (object) this.tec_cobservaciones ?? (object) DBNull.Value;
      row["tec_nestado"] = (object) this.tec_nestado ?? (object) DBNull.Value;
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
