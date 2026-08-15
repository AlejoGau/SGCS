// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_port_alias
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
  public class Simplet_port_alias : SimpleBaseObject
  {
    [DataMember]
    public int tpa_icodigo { get; set; }

    [DataMember]
    public string tpa_cdealer { get; set; }

    [DataMember]
    public int tpa_ipuerto { get; set; }

    [DataMember]
    public int tpa_iportip { get; set; }

    public Simplet_port_alias()
    {
      this.InitClass();
    }

    public Simplet_port_alias(int Id, string Name, int tpa_icodigo, string tpa_cdealer, int tpa_ipuerto, int tpa_iportip)
    {
      this.Id = Id;
      this.Name = Name;
      this.tpa_icodigo = tpa_icodigo;
      this.tpa_cdealer = tpa_cdealer;
      this.tpa_ipuerto = tpa_ipuerto;
      this.tpa_iportip = tpa_iportip;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3093, "t_port_alias");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_port_alias(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_port_alias callertPortAlias = new Callert_port_alias();
      callertPortAlias.Id = this.Id;
      callertPortAlias.Name = this.Name;
      callertPortAlias.tpa_icodigo = this.tpa_icodigo;
      callertPortAlias.tpa_cdealer = this.tpa_cdealer;
      callertPortAlias.tpa_ipuerto = this.tpa_ipuerto;
      callertPortAlias.tpa_iportip = this.tpa_iportip;
      return (CallerObject) callertPortAlias;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tpa_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tpa_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tpa_ipuerto", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tpa_iportip", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tpa_icodigo"] = (object) this.tpa_icodigo ?? (object) DBNull.Value;
      row["tpa_cdealer"] = (object) this.tpa_cdealer ?? (object) DBNull.Value;
      row["tpa_ipuerto"] = (object) this.tpa_ipuerto ?? (object) DBNull.Value;
      row["tpa_iportip"] = (object) this.tpa_iportip ?? (object) DBNull.Value;
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
