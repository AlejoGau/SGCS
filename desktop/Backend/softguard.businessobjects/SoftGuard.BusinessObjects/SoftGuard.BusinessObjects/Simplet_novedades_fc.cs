// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_novedades_fc
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
  public class Simplet_novedades_fc : SimpleBaseObject
  {
    [DataMember]
    public string nov_cdescripcion { get; set; }

    [DataMember]
    public Decimal nov_mimporte { get; set; }

    [DataMember]
    public string nov_cimpuesto1 { get; set; }

    [DataMember]
    public string nov_cimpuesto2 { get; set; }

    [DataMember]
    public string nov_cimpuesto3 { get; set; }

    public Simplet_novedades_fc()
    {
      this.InitClass();
    }

    public Simplet_novedades_fc(int Id, string Name, string nov_cdescripcion, Decimal nov_mimporte, string nov_cimpuesto1, string nov_cimpuesto2, string nov_cimpuesto3)
    {
      this.Id = Id;
      this.Name = Name;
      this.nov_cdescripcion = nov_cdescripcion;
      this.nov_mimporte = nov_mimporte;
      this.nov_cimpuesto1 = nov_cimpuesto1;
      this.nov_cimpuesto2 = nov_cimpuesto2;
      this.nov_cimpuesto3 = nov_cimpuesto3;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3153, "t_novedades_fc");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_novedades_fc(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_novedades_fc callertNovedadesFc = new Callert_novedades_fc();
      callertNovedadesFc.Id = this.Id;
      callertNovedadesFc.Name = this.Name;
      callertNovedadesFc.nov_cdescripcion = this.nov_cdescripcion;
      callertNovedadesFc.nov_mimporte = this.nov_mimporte;
      callertNovedadesFc.nov_cimpuesto1 = this.nov_cimpuesto1;
      callertNovedadesFc.nov_cimpuesto2 = this.nov_cimpuesto2;
      callertNovedadesFc.nov_cimpuesto3 = this.nov_cimpuesto3;
      return (CallerObject) callertNovedadesFc;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_mimporte", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto1", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto2", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto3", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["nov_cdescripcion"] = (object) this.nov_cdescripcion ?? (object) DBNull.Value;
      row["nov_mimporte"] = (object) this.nov_mimporte ?? (object) DBNull.Value;
      row["nov_cimpuesto1"] = (object) this.nov_cimpuesto1 ?? (object) DBNull.Value;
      row["nov_cimpuesto2"] = (object) this.nov_cimpuesto2 ?? (object) DBNull.Value;
      row["nov_cimpuesto3"] = (object) this.nov_cimpuesto3 ?? (object) DBNull.Value;
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
