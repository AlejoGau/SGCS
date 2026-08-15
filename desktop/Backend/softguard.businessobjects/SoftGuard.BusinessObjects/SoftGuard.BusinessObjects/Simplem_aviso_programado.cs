// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_aviso_programado
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
  public class Simplem_aviso_programado : SimpleBaseObject
  {
    [DataMember]
    public string prg_from { get; set; }

    [DataMember]
    public string prg_to { get; set; }

    [DataMember]
    public int prg_estado { get; set; }

    [DataMember]
    public string prg_gateway { get; set; }

    [DataMember]
    public int prg_objecttypeid { get; set; }

    [DataMember]
    public int prg_objectid { get; set; }

    [DataMember]
    public DateTime? prg_prgdatetime { get; set; }

    [DataMember]
    public DateTime? prg_enviodatetime { get; set; }

    [DataMember]
    public string prg_mensaje { get; set; }

    public Simplem_aviso_programado()
    {
      this.InitClass();
    }

    public Simplem_aviso_programado(int Id, string Name, string prg_from, string prg_to, int prg_estado, string prg_gateway, int prg_objecttypeid, int prg_objectid, DateTime? prg_prgdatetime, DateTime? prg_enviodatetime, string prg_mensaje)
    {
      this.Id = Id;
      this.Name = Name;
      this.prg_from = prg_from;
      this.prg_to = prg_to;
      this.prg_estado = prg_estado;
      this.prg_gateway = prg_gateway;
      this.prg_objecttypeid = prg_objecttypeid;
      this.prg_objectid = prg_objectid;
      this.prg_prgdatetime = prg_prgdatetime;
      this.prg_enviodatetime = prg_enviodatetime;
      this.prg_mensaje = prg_mensaje;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3159, "m_aviso_programado");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_aviso_programado(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_aviso_programado callermAvisoProgramado = new Callerm_aviso_programado();
      callermAvisoProgramado.Id = this.Id;
      callermAvisoProgramado.Name = this.Name;
      callermAvisoProgramado.prg_from = this.prg_from;
      callermAvisoProgramado.prg_to = this.prg_to;
      callermAvisoProgramado.prg_estado = this.prg_estado;
      callermAvisoProgramado.prg_gateway = this.prg_gateway;
      callermAvisoProgramado.prg_objecttypeid = this.prg_objecttypeid;
      callermAvisoProgramado.prg_objectid = this.prg_objectid;
      callermAvisoProgramado.prg_prgdatetime = this.prg_prgdatetime;
      callermAvisoProgramado.prg_enviodatetime = this.prg_enviodatetime;
      callermAvisoProgramado.prg_mensaje = this.prg_mensaje;
      return (CallerObject) callermAvisoProgramado;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_from", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_to", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_estado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_gateway", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_objecttypeid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_objectid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_prgdatetime", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prg_enviodatetime", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prg_mensaje", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["prg_from"] = (object) this.prg_from ?? (object) DBNull.Value;
      row["prg_to"] = (object) this.prg_to ?? (object) DBNull.Value;
      row["prg_estado"] = (object) this.prg_estado ?? (object) DBNull.Value;
      row["prg_gateway"] = (object) this.prg_gateway ?? (object) DBNull.Value;
      row["prg_objecttypeid"] = (object) this.prg_objecttypeid ?? (object) DBNull.Value;
      row["prg_objectid"] = (object) this.prg_objectid ?? (object) DBNull.Value;
      row["prg_prgdatetime"] = (object) this.prg_prgdatetime ?? (object) DBNull.Value;
      row["prg_enviodatetime"] = (object) this.prg_enviodatetime ?? (object) DBNull.Value;
      row["prg_mensaje"] = (object) this.prg_mensaje ?? (object) DBNull.Value;
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
