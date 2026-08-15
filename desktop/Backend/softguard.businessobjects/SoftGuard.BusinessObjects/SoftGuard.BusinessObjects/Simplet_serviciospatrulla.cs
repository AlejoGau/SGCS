// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_serviciospatrulla
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
  public class Simplet_serviciospatrulla : SimpleBaseObject
  {
    [DataMember]
    public string tsp_ccodigo { get; set; }

    [DataMember]
    public string tsp_cdescripcion { get; set; }

    [DataMember]
    public string tsp_cpathicon { get; set; }

    public Simplet_serviciospatrulla()
    {
      this.InitClass();
    }

    public Simplet_serviciospatrulla(int Id, string Name, string tsp_ccodigo, string tsp_cdescripcion, string tsp_cpathicon)
    {
      this.Id = Id;
      this.Name = Name;
      this.tsp_ccodigo = tsp_ccodigo;
      this.tsp_cdescripcion = tsp_cdescripcion;
      this.tsp_cpathicon = tsp_cpathicon;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3088, "t_serviciospatrulla");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_serviciospatrulla(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_serviciospatrulla serviciospatrulla = new Callert_serviciospatrulla();
      serviciospatrulla.Id = this.Id;
      serviciospatrulla.Name = this.Name;
      serviciospatrulla.tsp_ccodigo = this.tsp_ccodigo;
      serviciospatrulla.tsp_cdescripcion = this.tsp_cdescripcion;
      serviciospatrulla.tsp_cpathicon = this.tsp_cpathicon;
      return (CallerObject) serviciospatrulla;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tsp_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tsp_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tsp_cpathicon", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tsp_ccodigo"] = (object) this.tsp_ccodigo ?? (object) DBNull.Value;
      row["tsp_cdescripcion"] = (object) this.tsp_cdescripcion ?? (object) DBNull.Value;
      row["tsp_cpathicon"] = (object) this.tsp_cpathicon ?? (object) DBNull.Value;
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
