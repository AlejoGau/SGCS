// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simples_operadores
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
  public class Simples_operadores : SimpleBaseObject
  {
    [DataMember]
    public string ope_clogin { get; set; }

    [DataMember]
    public string ope_cnombre { get; set; }

    [DataMember]
    public string ope_cclave { get; set; }

    [DataMember]
    public int ope_nsql { get; set; }

    [DataMember]
    public Decimal ope_nsupervisor { get; set; }

    [DataMember]
    public string ope_clinea { get; set; }

    [DataMember]
    public Decimal ope_nprioridad { get; set; }

    [DataMember]
    public DateTime? ope_dCambio { get; set; }

    [DataMember]
    public Decimal ope_nSereno { get; set; }

    [DataMember]
    public int ope_iid { get; set; }

    public Simples_operadores()
    {
      this.InitClass();
    }

    public Simples_operadores(int Id, string Name, string ope_clogin, string ope_cnombre, string ope_cclave, int ope_nsql, Decimal ope_nsupervisor, string ope_clinea, Decimal ope_nprioridad, DateTime? ope_dCambio, Decimal ope_nSereno, int ope_iid)
    {
      this.Id = Id;
      this.Name = Name;
      this.ope_clogin = ope_clogin;
      this.ope_cnombre = ope_cnombre;
      this.ope_cclave = ope_cclave;
      this.ope_nsql = ope_nsql;
      this.ope_nsupervisor = ope_nsupervisor;
      this.ope_clinea = ope_clinea;
      this.ope_nprioridad = ope_nprioridad;
      this.ope_dCambio = ope_dCambio;
      this.ope_nSereno = ope_nSereno;
      this.ope_iid = ope_iid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3107, "s_operadores");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dals_operadores(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callers_operadores callersOperadores = new Callers_operadores();
      callersOperadores.Id = this.Id;
      callersOperadores.Name = this.Name;
      callersOperadores.ope_clogin = this.ope_clogin;
      callersOperadores.ope_cnombre = this.ope_cnombre;
      callersOperadores.ope_cclave = this.ope_cclave;
      callersOperadores.ope_nsql = this.ope_nsql;
      callersOperadores.ope_nsupervisor = this.ope_nsupervisor;
      callersOperadores.ope_clinea = this.ope_clinea;
      callersOperadores.ope_nprioridad = this.ope_nprioridad;
      callersOperadores.ope_dCambio = this.ope_dCambio;
      callersOperadores.ope_nSereno = this.ope_nSereno;
      callersOperadores.ope_iid = this.ope_iid;
      return (CallerObject) callersOperadores;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_clogin", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_cclave", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_nsql", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ope_nsupervisor", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_clinea", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_nprioridad", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_dCambio", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("ope_nSereno", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_iid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ope_clogin"] = (object) this.ope_clogin ?? (object) DBNull.Value;
      row["ope_cnombre"] = (object) this.ope_cnombre ?? (object) DBNull.Value;
      row["ope_cclave"] = (object) this.ope_cclave ?? (object) DBNull.Value;
      row["ope_nsql"] = (object) this.ope_nsql ?? (object) DBNull.Value;
      row["ope_nsupervisor"] = (object) this.ope_nsupervisor ?? (object) DBNull.Value;
      row["ope_clinea"] = (object) this.ope_clinea ?? (object) DBNull.Value;
      row["ope_nprioridad"] = (object) this.ope_nprioridad ?? (object) DBNull.Value;
      row["ope_dCambio"] = (object) this.ope_dCambio ?? (object) DBNull.Value;
      row["ope_nSereno"] = (object) this.ope_nSereno ?? (object) DBNull.Value;
      row["ope_iid"] = (object) this.ope_iid ?? (object) DBNull.Value;
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
