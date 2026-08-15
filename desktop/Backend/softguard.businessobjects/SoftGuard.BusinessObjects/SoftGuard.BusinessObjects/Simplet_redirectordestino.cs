// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_redirectordestino
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
  public class Simplet_redirectordestino : SimpleBaseObject
  {
    [DataMember]
    public string rrd_cnombre { get; set; }

    [DataMember]
    public string rrd_curl { get; set; }

    [DataMember]
    public string rrd_cconfig { get; set; }

    [DataMember]
    public string rrd_cmetadata { get; set; }

    public Simplet_redirectordestino()
    {
      this.InitClass();
    }

    public Simplet_redirectordestino(int Id, string Name, string rrd_cnombre, string rrd_curl, string rrd_cconfig, string rrd_cmetadata)
    {
      this.Id = Id;
      this.Name = Name;
      this.rrd_cnombre = rrd_cnombre;
      this.rrd_curl = rrd_curl;
      this.rrd_cconfig = rrd_cconfig;
      this.rrd_cmetadata = rrd_cmetadata;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3139, "t_redirectordestino");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_redirectordestino(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_redirectordestino redirectordestino = new Callert_redirectordestino();
      redirectordestino.Id = this.Id;
      redirectordestino.Name = this.Name;
      redirectordestino.rrd_cnombre = this.rrd_cnombre;
      redirectordestino.rrd_curl = this.rrd_curl;
      redirectordestino.rrd_cconfig = this.rrd_cconfig;
      redirectordestino.rrd_cmetadata = this.rrd_cmetadata;
      return (CallerObject) redirectordestino;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_curl", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_cconfig", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_cmetadata", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["rrd_cnombre"] = (object) this.rrd_cnombre ?? (object) DBNull.Value;
      row["rrd_curl"] = (object) this.rrd_curl ?? (object) DBNull.Value;
      row["rrd_cconfig"] = (object) this.rrd_cconfig ?? (object) DBNull.Value;
      row["rrd_cmetadata"] = (object) this.rrd_cmetadata ?? (object) DBNull.Value;
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
