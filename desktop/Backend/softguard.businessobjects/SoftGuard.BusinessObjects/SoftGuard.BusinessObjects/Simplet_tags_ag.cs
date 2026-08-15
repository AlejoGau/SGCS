// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_tags_ag
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
  public class Simplet_tags_ag : SimpleBaseObject
  {
    [DataMember]
    public string tag_ccodigo { get; set; }

    [DataMember]
    public string tag_ctag { get; set; }

    [DataMember]
    public string tag_czona { get; set; }

    [DataMember]
    public int tag_iCuenta { get; set; }

    public Simplet_tags_ag()
    {
      this.InitClass();
    }

    public Simplet_tags_ag(int Id, string Name, string tag_ccodigo, string tag_ctag, string tag_czona, int tag_iCuenta)
    {
      this.Id = Id;
      this.Name = Name;
      this.tag_ccodigo = tag_ccodigo;
      this.tag_ctag = tag_ctag;
      this.tag_czona = tag_czona;
      this.tag_iCuenta = tag_iCuenta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3083, "t_tags_ag");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_tags_ag(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_tags_ag callertTagsAg = new Callert_tags_ag();
      callertTagsAg.Id = this.Id;
      callertTagsAg.Name = this.Name;
      callertTagsAg.tag_ccodigo = this.tag_ccodigo;
      callertTagsAg.tag_ctag = this.tag_ctag;
      callertTagsAg.tag_czona = this.tag_czona;
      callertTagsAg.tag_iCuenta = this.tag_iCuenta;
      return (CallerObject) callertTagsAg;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_ctag", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_czona", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tag_iCuenta", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tag_ccodigo"] = (object) this.tag_ccodigo ?? (object) DBNull.Value;
      row["tag_ctag"] = (object) this.tag_ctag ?? (object) DBNull.Value;
      row["tag_czona"] = (object) this.tag_czona ?? (object) DBNull.Value;
      row["tag_iCuenta"] = (object) this.tag_iCuenta ?? (object) DBNull.Value;
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
