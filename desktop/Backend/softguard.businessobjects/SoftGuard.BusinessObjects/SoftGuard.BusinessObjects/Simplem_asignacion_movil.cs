// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_asignacion_movil
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
  public class Simplem_asignacion_movil : SimpleBaseObject
  {
    [DataMember]
    public int amv_rec_iid { get; set; }

    [DataMember]
    public int amv_objecttypeid { get; set; }

    [DataMember]
    public int amv_objectid { get; set; }

    [DataMember]
    public int amv_estado { get; set; }

    [DataMember]
    public int amv_prioridad { get; set; }

    public Simplem_asignacion_movil()
    {
      this.InitClass();
    }

    public Simplem_asignacion_movil(int Id, string Name, int amv_rec_iid, int amv_objecttypeid, int amv_objectid, int amv_estado, int amv_prioridad)
    {
      this.Id = Id;
      this.Name = Name;
      this.amv_rec_iid = amv_rec_iid;
      this.amv_objecttypeid = amv_objecttypeid;
      this.amv_objectid = amv_objectid;
      this.amv_estado = amv_estado;
      this.amv_prioridad = amv_prioridad;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3161, "m_asignacion_movil");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_asignacion_movil(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_asignacion_movil callermAsignacionMovil = new Callerm_asignacion_movil();
      callermAsignacionMovil.Id = this.Id;
      callermAsignacionMovil.Name = this.Name;
      callermAsignacionMovil.amv_rec_iid = this.amv_rec_iid;
      callermAsignacionMovil.amv_objecttypeid = this.amv_objecttypeid;
      callermAsignacionMovil.amv_objectid = this.amv_objectid;
      callermAsignacionMovil.amv_estado = this.amv_estado;
      callermAsignacionMovil.amv_prioridad = this.amv_prioridad;
      return (CallerObject) callermAsignacionMovil;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("amv_rec_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_objecttypeid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_objectid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_estado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_prioridad", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["amv_rec_iid"] = (object) this.amv_rec_iid ?? (object) DBNull.Value;
      row["amv_objecttypeid"] = (object) this.amv_objecttypeid ?? (object) DBNull.Value;
      row["amv_objectid"] = (object) this.amv_objectid ?? (object) DBNull.Value;
      row["amv_estado"] = (object) this.amv_estado ?? (object) DBNull.Value;
      row["amv_prioridad"] = (object) this.amv_prioridad ?? (object) DBNull.Value;
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
