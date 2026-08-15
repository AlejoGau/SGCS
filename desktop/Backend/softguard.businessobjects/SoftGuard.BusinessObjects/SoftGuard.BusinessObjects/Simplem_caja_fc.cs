// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_caja_fc
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
  public class Simplem_caja_fc : SimpleBaseObject
  {
    [DataMember]
    public DateTime? caj_dfecha { get; set; }

    [DataMember]
    public Decimal caj_ytotal { get; set; }

    [DataMember]
    public string caj_ctipomov { get; set; }

    [DataMember]
    public string caj_cmotivo { get; set; }

    public Simplem_caja_fc()
    {
      this.InitClass();
    }

    public Simplem_caja_fc(int Id, string Name, DateTime? caj_dfecha, Decimal caj_ytotal, string caj_ctipomov, string caj_cmotivo)
    {
      this.Id = Id;
      this.Name = Name;
      this.caj_dfecha = caj_dfecha;
      this.caj_ytotal = caj_ytotal;
      this.caj_ctipomov = caj_ctipomov;
      this.caj_cmotivo = caj_cmotivo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3154, "m_caja_fc");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_caja_fc(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_caja_fc callermCajaFc = new Callerm_caja_fc();
      callermCajaFc.Id = this.Id;
      callermCajaFc.Name = this.Name;
      callermCajaFc.caj_dfecha = this.caj_dfecha;
      callermCajaFc.caj_ytotal = this.caj_ytotal;
      callermCajaFc.caj_ctipomov = this.caj_ctipomov;
      callermCajaFc.caj_cmotivo = this.caj_cmotivo;
      return (CallerObject) callermCajaFc;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("caj_dfecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("caj_ytotal", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("caj_ctipomov", typeof (string)));
      dataTable.Columns.Add(new DataColumn("caj_cmotivo", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["caj_dfecha"] = (object) this.caj_dfecha ?? (object) DBNull.Value;
      row["caj_ytotal"] = (object) this.caj_ytotal ?? (object) DBNull.Value;
      row["caj_ctipomov"] = (object) this.caj_ctipomov ?? (object) DBNull.Value;
      row["caj_cmotivo"] = (object) this.caj_cmotivo ?? (object) DBNull.Value;
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
