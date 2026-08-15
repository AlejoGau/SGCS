// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_mailConnector
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
  public class Simplet_mailConnector : SimpleBaseObject
  {
    [DataMember]
    public string mcn_name { get; set; }

    [DataMember]
    public string mcn_username { get; set; }

    [DataMember]
    public string mcn_password { get; set; }

    [DataMember]
    public string mcn_popserver { get; set; }

    [DataMember]
    public int mcn_popport { get; set; }

    [DataMember]
    public int mcn_popssl { get; set; }

    [DataMember]
    public int mcn_ipconid { get; set; }

    public Simplet_mailConnector()
    {
      this.InitClass();
    }

    public Simplet_mailConnector(int Id, string Name, string mcn_name, string mcn_username, string mcn_password, string mcn_popserver, int mcn_popport, int mcn_popssl, int mcn_ipconid)
    {
      this.Id = Id;
      this.Name = Name;
      this.mcn_name = mcn_name;
      this.mcn_username = mcn_username;
      this.mcn_password = mcn_password;
      this.mcn_popserver = mcn_popserver;
      this.mcn_popport = mcn_popport;
      this.mcn_popssl = mcn_popssl;
      this.mcn_ipconid = mcn_ipconid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3137, "t_mailConnector");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_mailConnector(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_mailConnector callertMailConnector = new Callert_mailConnector();
      callertMailConnector.Id = this.Id;
      callertMailConnector.Name = this.Name;
      callertMailConnector.mcn_name = this.mcn_name;
      callertMailConnector.mcn_username = this.mcn_username;
      callertMailConnector.mcn_password = this.mcn_password;
      callertMailConnector.mcn_popserver = this.mcn_popserver;
      callertMailConnector.mcn_popport = this.mcn_popport;
      callertMailConnector.mcn_popssl = this.mcn_popssl;
      callertMailConnector.mcn_ipconid = this.mcn_ipconid;
      return (CallerObject) callertMailConnector;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_username", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_password", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_popserver", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_popport", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mcn_popssl", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mcn_ipconid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["mcn_name"] = (object) this.mcn_name ?? (object) DBNull.Value;
      row["mcn_username"] = (object) this.mcn_username ?? (object) DBNull.Value;
      row["mcn_password"] = (object) this.mcn_password ?? (object) DBNull.Value;
      row["mcn_popserver"] = (object) this.mcn_popserver ?? (object) DBNull.Value;
      row["mcn_popport"] = (object) this.mcn_popport ?? (object) DBNull.Value;
      row["mcn_popssl"] = (object) this.mcn_popssl ?? (object) DBNull.Value;
      row["mcn_ipconid"] = (object) this.mcn_ipconid ?? (object) DBNull.Value;
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
