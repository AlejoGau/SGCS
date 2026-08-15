// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_videoidXtrainfo
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
  public class Simplet_videoidXtrainfo : SimpleBaseObject
  {
    [DataMember]
    public int tvi_iid { get; set; }

    [DataMember]
    public int tvi_iLauncher { get; set; }

    [DataMember]
    public string tvi_cConfig { get; set; }

    public Simplet_videoidXtrainfo()
    {
      this.InitClass();
    }

    public Simplet_videoidXtrainfo(int Id, string Name, int tvi_iid, int tvi_iLauncher, string tvi_cConfig)
    {
      this.Id = Id;
      this.Name = Name;
      this.tvi_iid = tvi_iid;
      this.tvi_iLauncher = tvi_iLauncher;
      this.tvi_cConfig = tvi_cConfig;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3130, "t_videoidXtrainfo");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_videoidXtrainfo(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_videoidXtrainfo callertVideoidXtrainfo = new Callert_videoidXtrainfo();
      callertVideoidXtrainfo.Id = this.Id;
      callertVideoidXtrainfo.Name = this.Name;
      callertVideoidXtrainfo.tvi_iid = this.tvi_iid;
      callertVideoidXtrainfo.tvi_iLauncher = this.tvi_iLauncher;
      callertVideoidXtrainfo.tvi_cConfig = this.tvi_cConfig;
      return (CallerObject) callertVideoidXtrainfo;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tvi_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tvi_iLauncher", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tvi_cConfig", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tvi_iid"] = (object) this.tvi_iid ?? (object) DBNull.Value;
      row["tvi_iLauncher"] = (object) this.tvi_iLauncher ?? (object) DBNull.Value;
      row["tvi_cConfig"] = (object) this.tvi_cConfig ?? (object) DBNull.Value;
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
