// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_eventos_feriados
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
  public class Simplet_eventos_feriados : SimpleBaseObject
  {
    [DataMember]
    public string eve_ccodigo { get; set; }

    [DataMember]
    public string eve_cdescripcion { get; set; }

    [DataMember]
    public DateTime? eve_dfechadesdes { get; set; }

    [DataMember]
    public string eve_choradesde { get; set; }

    [DataMember]
    public DateTime? eve_dfechahasta { get; set; }

    [DataMember]
    public string eve_chorahasta { get; set; }

    public Simplet_eventos_feriados()
    {
      this.InitClass();
    }

    public Simplet_eventos_feriados(int Id, string Name, string eve_ccodigo, string eve_cdescripcion, DateTime? eve_dfechadesdes, string eve_choradesde, DateTime? eve_dfechahasta, string eve_chorahasta)
    {
      this.Id = Id;
      this.Name = Name;
      this.eve_ccodigo = eve_ccodigo;
      this.eve_cdescripcion = eve_cdescripcion;
      this.eve_dfechadesdes = eve_dfechadesdes;
      this.eve_choradesde = eve_choradesde;
      this.eve_dfechahasta = eve_dfechahasta;
      this.eve_chorahasta = eve_chorahasta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3077, "t_eventos_feriados");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_eventos_feriados(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_eventos_feriados callertEventosFeriados = new Callert_eventos_feriados();
      callertEventosFeriados.Id = this.Id;
      callertEventosFeriados.Name = this.Name;
      callertEventosFeriados.eve_ccodigo = this.eve_ccodigo;
      callertEventosFeriados.eve_cdescripcion = this.eve_cdescripcion;
      callertEventosFeriados.eve_dfechadesdes = this.eve_dfechadesdes;
      callertEventosFeriados.eve_choradesde = this.eve_choradesde;
      callertEventosFeriados.eve_dfechahasta = this.eve_dfechahasta;
      callertEventosFeriados.eve_chorahasta = this.eve_chorahasta;
      return (CallerObject) callertEventosFeriados;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_dfechadesdes", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("eve_choradesde", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eve_dfechahasta", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("eve_chorahasta", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["eve_ccodigo"] = (object) this.eve_ccodigo ?? (object) DBNull.Value;
      row["eve_cdescripcion"] = (object) this.eve_cdescripcion ?? (object) DBNull.Value;
      row["eve_dfechadesdes"] = (object) this.eve_dfechadesdes ?? (object) DBNull.Value;
      row["eve_choradesde"] = (object) this.eve_choradesde ?? (object) DBNull.Value;
      row["eve_dfechahasta"] = (object) this.eve_dfechahasta ?? (object) DBNull.Value;
      row["eve_chorahasta"] = (object) this.eve_chorahasta ?? (object) DBNull.Value;
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
