// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_medicos
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
  public class Simplet_medicos : SimpleBaseObject
  {
    [DataMember]
    public string med_ccodigo { get; set; }

    [DataMember]
    public string med_cnombre { get; set; }

    [DataMember]
    public string med_ccalle { get; set; }

    [DataMember]
    public string med_clocalidad { get; set; }

    [DataMember]
    public string med_cprovincia { get; set; }

    [DataMember]
    public string med_ccodigopostal { get; set; }

    [DataMember]
    public string med_ctelefono { get; set; }

    [DataMember]
    public string med_cfax { get; set; }

    [DataMember]
    public Decimal med_ntipo { get; set; }

    public Simplet_medicos()
    {
      this.InitClass();
    }

    public Simplet_medicos(int Id, string Name, string med_ccodigo, string med_cnombre, string med_ccalle, string med_clocalidad, string med_cprovincia, string med_ccodigopostal, string med_ctelefono, string med_cfax, Decimal med_ntipo)
    {
      this.Id = Id;
      this.Name = Name;
      this.med_ccodigo = med_ccodigo;
      this.med_cnombre = med_cnombre;
      this.med_ccalle = med_ccalle;
      this.med_clocalidad = med_clocalidad;
      this.med_cprovincia = med_cprovincia;
      this.med_ccodigopostal = med_ccodigopostal;
      this.med_ctelefono = med_ctelefono;
      this.med_cfax = med_cfax;
      this.med_ntipo = med_ntipo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3073, "t_medicos");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_medicos(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_medicos callertMedicos = new Callert_medicos();
      callertMedicos.Id = this.Id;
      callertMedicos.Name = this.Name;
      callertMedicos.med_ccodigo = this.med_ccodigo;
      callertMedicos.med_cnombre = this.med_cnombre;
      callertMedicos.med_ccalle = this.med_ccalle;
      callertMedicos.med_clocalidad = this.med_clocalidad;
      callertMedicos.med_cprovincia = this.med_cprovincia;
      callertMedicos.med_ccodigopostal = this.med_ccodigopostal;
      callertMedicos.med_ctelefono = this.med_ctelefono;
      callertMedicos.med_cfax = this.med_cfax;
      callertMedicos.med_ntipo = this.med_ntipo;
      return (CallerObject) callertMedicos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccalle", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_clocalidad", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cprovincia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccodigopostal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cfax", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ntipo", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["med_ccodigo"] = (object) this.med_ccodigo ?? (object) DBNull.Value;
      row["med_cnombre"] = (object) this.med_cnombre ?? (object) DBNull.Value;
      row["med_ccalle"] = (object) this.med_ccalle ?? (object) DBNull.Value;
      row["med_clocalidad"] = (object) this.med_clocalidad ?? (object) DBNull.Value;
      row["med_cprovincia"] = (object) this.med_cprovincia ?? (object) DBNull.Value;
      row["med_ccodigopostal"] = (object) this.med_ccodigopostal ?? (object) DBNull.Value;
      row["med_ctelefono"] = (object) this.med_ctelefono ?? (object) DBNull.Value;
      row["med_cfax"] = (object) this.med_cfax ?? (object) DBNull.Value;
      row["med_ntipo"] = (object) this.med_ntipo ?? (object) DBNull.Value;
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
