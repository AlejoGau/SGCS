// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_bancos_fc
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
  public class Simplet_bancos_fc : SimpleBaseObject
  {
    [DataMember]
    public string bco_ccodigo { get; set; }

    [DataMember]
    public string bco_cnombre { get; set; }

    public Simplet_bancos_fc()
    {
      this.InitClass();
    }

    public Simplet_bancos_fc(int Id, string Name, string bco_ccodigo, string bco_cnombre)
    {
      this.Id = Id;
      this.Name = Name;
      this.bco_ccodigo = bco_ccodigo;
      this.bco_cnombre = bco_cnombre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3145, "t_bancos_fc");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_bancos_fc(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_bancos_fc callertBancosFc = new Callert_bancos_fc();
      callertBancosFc.Id = this.Id;
      callertBancosFc.Name = this.Name;
      callertBancosFc.bco_ccodigo = this.bco_ccodigo;
      callertBancosFc.bco_cnombre = this.bco_cnombre;
      return (CallerObject) callertBancosFc;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("bco_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("bco_cnombre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["bco_ccodigo"] = (object) this.bco_ccodigo ?? (object) DBNull.Value;
      row["bco_cnombre"] = (object) this.bco_cnombre ?? (object) DBNull.Value;
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
