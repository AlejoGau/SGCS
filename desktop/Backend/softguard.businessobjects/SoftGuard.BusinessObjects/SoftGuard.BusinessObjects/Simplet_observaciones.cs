// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_observaciones
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
  public class Simplet_observaciones : SimpleBaseObject
  {
    [DataMember]
    public string obs_ccodigo { get; set; }

    [DataMember]
    public string obs_cdescripcion { get; set; }

    [DataMember]
    public string obs_mobservacion { get; set; }

    public Simplet_observaciones()
    {
      this.InitClass();
    }

    public Simplet_observaciones(int Id, string Name, string obs_ccodigo, string obs_cdescripcion, string obs_mobservacion)
    {
      this.Id = Id;
      this.Name = Name;
      this.obs_ccodigo = obs_ccodigo;
      this.obs_cdescripcion = obs_cdescripcion;
      this.obs_mobservacion = obs_mobservacion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3085, "t_observaciones");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_observaciones(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_observaciones callertObservaciones = new Callert_observaciones();
      callertObservaciones.Id = this.Id;
      callertObservaciones.Name = this.Name;
      callertObservaciones.obs_ccodigo = this.obs_ccodigo;
      callertObservaciones.obs_cdescripcion = this.obs_cdescripcion;
      callertObservaciones.obs_mobservacion = this.obs_mobservacion;
      return (CallerObject) callertObservaciones;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("obs_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("obs_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("obs_mobservacion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["obs_ccodigo"] = (object) this.obs_ccodigo ?? (object) DBNull.Value;
      row["obs_cdescripcion"] = (object) this.obs_cdescripcion ?? (object) DBNull.Value;
      row["obs_mobservacion"] = (object) this.obs_mobservacion ?? (object) DBNull.Value;
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
