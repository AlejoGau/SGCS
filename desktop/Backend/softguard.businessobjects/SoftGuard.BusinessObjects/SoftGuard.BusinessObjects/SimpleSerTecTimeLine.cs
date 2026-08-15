// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleSerTecTimeLine
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
  public class SimpleSerTecTimeLine : SimpleBaseObject
  {
    [DataMember]
    public int stl_iServicio { get; set; }

    [DataMember]
    public DateTime? stl_tFechaHora { get; set; }

    [DataMember]
    public string stl_cAccion { get; set; }

    [DataMember]
    public string stl_cObservacion { get; set; }

    [DataMember]
    public int stl_iUsuarioDSS { get; set; }

    public SimpleSerTecTimeLine()
    {
      this.InitClass();
    }

    public SimpleSerTecTimeLine(int Id, string Name, int stl_iServicio, DateTime? stl_tFechaHora, string stl_cAccion, string stl_cObservacion, int stl_iUsuarioDSS)
    {
      this.Id = Id;
      this.Name = Name;
      this.stl_iServicio = stl_iServicio;
      this.stl_tFechaHora = stl_tFechaHora;
      this.stl_cAccion = stl_cAccion;
      this.stl_cObservacion = stl_cObservacion;
      this.stl_iUsuarioDSS = stl_iUsuarioDSS;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3124, "SerTecTimeLine");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalSerTecTimeLine(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerSerTecTimeLine callerSerTecTimeLine = new CallerSerTecTimeLine();
      callerSerTecTimeLine.Id = this.Id;
      callerSerTecTimeLine.Name = this.Name;
      callerSerTecTimeLine.stl_iServicio = this.stl_iServicio;
      callerSerTecTimeLine.stl_tFechaHora = this.stl_tFechaHora;
      callerSerTecTimeLine.stl_cAccion = this.stl_cAccion;
      callerSerTecTimeLine.stl_cObservacion = this.stl_cObservacion;
      callerSerTecTimeLine.stl_iUsuarioDSS = this.stl_iUsuarioDSS;
      return (CallerObject) callerSerTecTimeLine;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_iServicio", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stl_tFechaHora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("stl_cAccion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_cObservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_iUsuarioDSS", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stl_iServicio"] = (object) this.stl_iServicio ?? (object) DBNull.Value;
      row["stl_tFechaHora"] = (object) this.stl_tFechaHora ?? (object) DBNull.Value;
      row["stl_cAccion"] = (object) this.stl_cAccion ?? (object) DBNull.Value;
      row["stl_cObservacion"] = (object) this.stl_cObservacion ?? (object) DBNull.Value;
      row["stl_iUsuarioDSS"] = (object) this.stl_iUsuarioDSS ?? (object) DBNull.Value;
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
