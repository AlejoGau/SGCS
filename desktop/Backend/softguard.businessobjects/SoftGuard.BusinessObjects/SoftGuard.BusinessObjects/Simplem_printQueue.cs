// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_printQueue
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
  public class Simplem_printQueue : SimpleBaseObject
  {
    [DataMember]
    public int prn_cbc_icodigo_id { get; set; }

    [DataMember]
    public int prn_icopia { get; set; }

    [DataMember]
    public string prn_cbc_ctipocbte { get; set; }

    [DataMember]
    public int prn_cbc_inumerocbte { get; set; }

    [DataMember]
    public string prn_cbc_cprefijocbte { get; set; }

    [DataMember]
    public DateTime? prn_cbc_dfecha { get; set; }

    [DataMember]
    public string prn_org_cnombre { get; set; }

    [DataMember]
    public string prn_organizationName { get; set; }

    [DataMember]
    public string prn_cli_cidentificacion { get; set; }

    [DataMember]
    public int prn_iestado { get; set; }

    [DataMember]
    public string prn_cfilename { get; set; }

    public Simplem_printQueue()
    {
      this.InitClass();
    }

    public Simplem_printQueue(int Id, string Name, int prn_cbc_icodigo_id, int prn_icopia, string prn_cbc_ctipocbte, int prn_cbc_inumerocbte, string prn_cbc_cprefijocbte, DateTime? prn_cbc_dfecha, string prn_org_cnombre, string prn_organizationName, string prn_cli_cidentificacion, int prn_iestado, string prn_cfilename)
    {
      this.Id = Id;
      this.Name = Name;
      this.prn_cbc_icodigo_id = prn_cbc_icodigo_id;
      this.prn_icopia = prn_icopia;
      this.prn_cbc_ctipocbte = prn_cbc_ctipocbte;
      this.prn_cbc_inumerocbte = prn_cbc_inumerocbte;
      this.prn_cbc_cprefijocbte = prn_cbc_cprefijocbte;
      this.prn_cbc_dfecha = prn_cbc_dfecha;
      this.prn_org_cnombre = prn_org_cnombre;
      this.prn_organizationName = prn_organizationName;
      this.prn_cli_cidentificacion = prn_cli_cidentificacion;
      this.prn_iestado = prn_iestado;
      this.prn_cfilename = prn_cfilename;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3157, "m_printQueue");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_printQueue(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_printQueue callermPrintQueue = new Callerm_printQueue();
      callermPrintQueue.Id = this.Id;
      callermPrintQueue.Name = this.Name;
      callermPrintQueue.prn_cbc_icodigo_id = this.prn_cbc_icodigo_id;
      callermPrintQueue.prn_icopia = this.prn_icopia;
      callermPrintQueue.prn_cbc_ctipocbte = this.prn_cbc_ctipocbte;
      callermPrintQueue.prn_cbc_inumerocbte = this.prn_cbc_inumerocbte;
      callermPrintQueue.prn_cbc_cprefijocbte = this.prn_cbc_cprefijocbte;
      callermPrintQueue.prn_cbc_dfecha = this.prn_cbc_dfecha;
      callermPrintQueue.prn_org_cnombre = this.prn_org_cnombre;
      callermPrintQueue.prn_organizationName = this.prn_organizationName;
      callermPrintQueue.prn_cli_cidentificacion = this.prn_cli_cidentificacion;
      callermPrintQueue.prn_iestado = this.prn_iestado;
      callermPrintQueue.prn_cfilename = this.prn_cfilename;
      return (CallerObject) callermPrintQueue;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_icodigo_id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_icopia", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_ctipocbte", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_inumerocbte", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_cprefijocbte", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_dfecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prn_org_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_organizationName", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cli_cidentificacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_iestado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cfilename", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["prn_cbc_icodigo_id"] = (object) this.prn_cbc_icodigo_id ?? (object) DBNull.Value;
      row["prn_icopia"] = (object) this.prn_icopia ?? (object) DBNull.Value;
      row["prn_cbc_ctipocbte"] = (object) this.prn_cbc_ctipocbte ?? (object) DBNull.Value;
      row["prn_cbc_inumerocbte"] = (object) this.prn_cbc_inumerocbte ?? (object) DBNull.Value;
      row["prn_cbc_cprefijocbte"] = (object) this.prn_cbc_cprefijocbte ?? (object) DBNull.Value;
      row["prn_cbc_dfecha"] = (object) this.prn_cbc_dfecha ?? (object) DBNull.Value;
      row["prn_org_cnombre"] = (object) this.prn_org_cnombre ?? (object) DBNull.Value;
      row["prn_organizationName"] = (object) this.prn_organizationName ?? (object) DBNull.Value;
      row["prn_cli_cidentificacion"] = (object) this.prn_cli_cidentificacion ?? (object) DBNull.Value;
      row["prn_iestado"] = (object) this.prn_iestado ?? (object) DBNull.Value;
      row["prn_cfilename"] = (object) this.prn_cfilename ?? (object) DBNull.Value;
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
