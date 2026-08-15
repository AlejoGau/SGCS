// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_LineasXPuerto
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
  public class Simplet_LineasXPuerto : SimpleBaseObject
  {
    [DataMember]
    public int lxp_iAlias { get; set; }

    [DataMember]
    public Decimal lxp_nLinea { get; set; }

    [DataMember]
    public Decimal lxp_nEstado { get; set; }

    public Simplet_LineasXPuerto()
    {
      this.InitClass();
    }

    public Simplet_LineasXPuerto(int Id, string Name, int lxp_iAlias, Decimal lxp_nLinea, Decimal lxp_nEstado)
    {
      this.Id = Id;
      this.Name = Name;
      this.lxp_iAlias = lxp_iAlias;
      this.lxp_nLinea = lxp_nLinea;
      this.lxp_nEstado = lxp_nEstado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3069, "t_LineasXPuerto");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_LineasXPuerto(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_LineasXPuerto callertLineasXpuerto = new Callert_LineasXPuerto();
      callertLineasXpuerto.Id = this.Id;
      callertLineasXpuerto.Name = this.Name;
      callertLineasXpuerto.lxp_iAlias = this.lxp_iAlias;
      callertLineasXpuerto.lxp_nLinea = this.lxp_nLinea;
      callertLineasXpuerto.lxp_nEstado = this.lxp_nEstado;
      return (CallerObject) callertLineasXpuerto;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("lxp_iAlias", typeof (int)));
      dataTable.Columns.Add(new DataColumn("lxp_nLinea", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("lxp_nEstado", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["lxp_iAlias"] = (object) this.lxp_iAlias ?? (object) DBNull.Value;
      row["lxp_nLinea"] = (object) this.lxp_nLinea ?? (object) DBNull.Value;
      row["lxp_nEstado"] = (object) this.lxp_nEstado ?? (object) DBNull.Value;
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
