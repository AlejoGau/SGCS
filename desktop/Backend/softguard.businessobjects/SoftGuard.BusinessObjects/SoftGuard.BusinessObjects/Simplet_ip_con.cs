// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_ip_con
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
  public class Simplet_ip_con : SimpleBaseObject
  {
    [DataMember]
    public int ipc_icodigo { get; set; }

    [DataMember]
    public string ipc_cdescripcion { get; set; }

    [DataMember]
    public int ipc_ireceptor { get; set; }

    [DataMember]
    public Decimal ipc_nestado { get; set; }

    [DataMember]
    public Decimal ipc_nport { get; set; }

    [DataMember]
    public Decimal ipc_nprotocolo { get; set; }

    [DataMember]
    public Decimal ipc_crespondeack { get; set; }

    [DataMember]
    public int ipc_itiempoinactividad { get; set; }

    [DataMember]
    public Decimal ipc_cresetxhb { get; set; }

    [DataMember]
    public int ipc_imodemsms { get; set; }

    [DataMember]
    public string ipc_cremotehostip { get; set; }

    public Simplet_ip_con()
    {
      this.InitClass();
    }

    public Simplet_ip_con(int Id, string Name, int ipc_icodigo, string ipc_cdescripcion, int ipc_ireceptor, Decimal ipc_nestado, Decimal ipc_nport, Decimal ipc_nprotocolo, Decimal ipc_crespondeack, int ipc_itiempoinactividad, Decimal ipc_cresetxhb, int ipc_imodemsms, string ipc_cremotehostip)
    {
      this.Id = Id;
      this.Name = Name;
      this.ipc_icodigo = ipc_icodigo;
      this.ipc_cdescripcion = ipc_cdescripcion;
      this.ipc_ireceptor = ipc_ireceptor;
      this.ipc_nestado = ipc_nestado;
      this.ipc_nport = ipc_nport;
      this.ipc_nprotocolo = ipc_nprotocolo;
      this.ipc_crespondeack = ipc_crespondeack;
      this.ipc_itiempoinactividad = ipc_itiempoinactividad;
      this.ipc_cresetxhb = ipc_cresetxhb;
      this.ipc_imodemsms = ipc_imodemsms;
      this.ipc_cremotehostip = ipc_cremotehostip;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3092, "t_ip_con");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_ip_con(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_ip_con callertIpCon = new Callert_ip_con();
      callertIpCon.Id = this.Id;
      callertIpCon.Name = this.Name;
      callertIpCon.ipc_icodigo = this.ipc_icodigo;
      callertIpCon.ipc_cdescripcion = this.ipc_cdescripcion;
      callertIpCon.ipc_ireceptor = this.ipc_ireceptor;
      callertIpCon.ipc_nestado = this.ipc_nestado;
      callertIpCon.ipc_nport = this.ipc_nport;
      callertIpCon.ipc_nprotocolo = this.ipc_nprotocolo;
      callertIpCon.ipc_crespondeack = this.ipc_crespondeack;
      callertIpCon.ipc_itiempoinactividad = this.ipc_itiempoinactividad;
      callertIpCon.ipc_cresetxhb = this.ipc_cresetxhb;
      callertIpCon.ipc_imodemsms = this.ipc_imodemsms;
      callertIpCon.ipc_cremotehostip = this.ipc_cremotehostip;
      return (CallerObject) callertIpCon;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ipc_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ipc_ireceptor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_nport", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_nprotocolo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_crespondeack", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_itiempoinactividad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cresetxhb", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_imodemsms", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cremotehostip", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ipc_icodigo"] = (object) this.ipc_icodigo ?? (object) DBNull.Value;
      row["ipc_cdescripcion"] = (object) this.ipc_cdescripcion ?? (object) DBNull.Value;
      row["ipc_ireceptor"] = (object) this.ipc_ireceptor ?? (object) DBNull.Value;
      row["ipc_nestado"] = (object) this.ipc_nestado ?? (object) DBNull.Value;
      row["ipc_nport"] = (object) this.ipc_nport ?? (object) DBNull.Value;
      row["ipc_nprotocolo"] = (object) this.ipc_nprotocolo ?? (object) DBNull.Value;
      row["ipc_crespondeack"] = (object) this.ipc_crespondeack ?? (object) DBNull.Value;
      row["ipc_itiempoinactividad"] = (object) this.ipc_itiempoinactividad ?? (object) DBNull.Value;
      row["ipc_cresetxhb"] = (object) this.ipc_cresetxhb ?? (object) DBNull.Value;
      row["ipc_imodemsms"] = (object) this.ipc_imodemsms ?? (object) DBNull.Value;
      row["ipc_cremotehostip"] = (object) this.ipc_cremotehostip ?? (object) DBNull.Value;
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
