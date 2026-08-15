// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_autoridaddestino
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
  public class Simplet_autoridaddestino : SimpleBaseObject
  {
    [DataMember]
    public string tad_cnombre { get; set; }

    [DataMember]
    public string tad_curl { get; set; }

    [DataMember]
    public string tad_cconfig { get; set; }

    [DataMember]
    public string tad_cmetadata { get; set; }

    public Simplet_autoridaddestino()
    {
      this.InitClass();
    }

    public Simplet_autoridaddestino(int Id, string Name, string tad_cnombre, string tad_curl, string tad_cconfig, string tad_cmetadata)
    {
      this.Id = Id;
      this.Name = Name;
      this.tad_cnombre = tad_cnombre;
      this.tad_curl = tad_curl;
      this.tad_cconfig = tad_cconfig;
      this.tad_cmetadata = tad_cmetadata;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3132, "t_autoridaddestino");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_autoridaddestino(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_autoridaddestino autoridaddestino = new Callert_autoridaddestino();
      autoridaddestino.Id = this.Id;
      autoridaddestino.Name = this.Name;
      autoridaddestino.tad_cnombre = this.tad_cnombre;
      autoridaddestino.tad_curl = this.tad_curl;
      autoridaddestino.tad_cconfig = this.tad_cconfig;
      autoridaddestino.tad_cmetadata = this.tad_cmetadata;
      return (CallerObject) autoridaddestino;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_curl", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_cconfig", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_cmetadata", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tad_cnombre"] = (object) this.tad_cnombre ?? (object) DBNull.Value;
      row["tad_curl"] = (object) this.tad_curl ?? (object) DBNull.Value;
      row["tad_cconfig"] = (object) this.tad_cconfig ?? (object) DBNull.Value;
      row["tad_cmetadata"] = (object) this.tad_cmetadata ?? (object) DBNull.Value;
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
