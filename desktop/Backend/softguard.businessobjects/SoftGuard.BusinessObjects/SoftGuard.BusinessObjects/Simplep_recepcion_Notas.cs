// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplep_recepcion_notas
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
  public class Simplep_recepcion_notas : SimpleBaseObject
  {
    [DataMember]
    public int rec_iidrecepcion { get; set; }

    [DataMember]
    public int rec_itipo { get; set; }

    [DataMember]
    public string rec_mnota { get; set; }

    public Simplep_recepcion_notas()
    {
      this.InitClass();
    }

    public Simplep_recepcion_notas(int Id, string Name, int rec_iidrecepcion, int rec_itipo, string rec_mnota)
    {
      this.Id = Id;
      this.Name = Name;
      this.rec_iidrecepcion = rec_iidrecepcion;
      this.rec_itipo = rec_itipo;
      this.rec_mnota = rec_mnota;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3103, "p_recepcion_notas");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalp_recepcion_notas(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerp_recepcion_notas callerpRecepcionNotas = new Callerp_recepcion_notas();
      callerpRecepcionNotas.Id = this.Id;
      callerpRecepcionNotas.Name = this.Name;
      callerpRecepcionNotas.rec_iidrecepcion = this.rec_iidrecepcion;
      callerpRecepcionNotas.rec_itipo = this.rec_itipo;
      callerpRecepcionNotas.rec_mnota = this.rec_mnota;
      return (CallerObject) callerpRecepcionNotas;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rec_iidrecepcion", typeof (int)));
      dataTable.Columns.Add(new DataColumn("rec_itipo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("rec_mnota", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["rec_iidrecepcion"] = (object) this.rec_iidrecepcion ?? (object) DBNull.Value;
      row["rec_itipo"] = (object) this.rec_itipo ?? (object) DBNull.Value;
      row["rec_mnota"] = (object) this.rec_mnota ?? (object) DBNull.Value;
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
