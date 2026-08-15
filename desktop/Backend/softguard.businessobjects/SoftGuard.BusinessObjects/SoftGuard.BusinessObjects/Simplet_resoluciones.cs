// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_resoluciones
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
  public class Simplet_resoluciones : SimpleBaseObject
  {
    [DataMember]
    public string res_ccodigo { get; set; }

    [DataMember]
    public string res_cdescripcion { get; set; }

    [DataMember]
    public Decimal res_nfalsaalarma { get; set; }

    [DataMember]
    public Decimal res_nEstado { get; set; }

    public Simplet_resoluciones()
    {
      this.InitClass();
    }

    public Simplet_resoluciones(int Id, string Name, string res_ccodigo, string res_cdescripcion, Decimal res_nfalsaalarma, Decimal res_nEstado)
    {
      this.Id = Id;
      this.Name = Name;
      this.res_ccodigo = res_ccodigo;
      this.res_cdescripcion = res_cdescripcion;
      this.res_nfalsaalarma = res_nfalsaalarma;
      this.res_nEstado = res_nEstado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3078, "t_resoluciones");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_resoluciones(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_resoluciones callertResoluciones = new Callert_resoluciones();
      callertResoluciones.Id = this.Id;
      callertResoluciones.Name = this.Name;
      callertResoluciones.res_ccodigo = this.res_ccodigo;
      callertResoluciones.res_cdescripcion = this.res_cdescripcion;
      callertResoluciones.res_nfalsaalarma = this.res_nfalsaalarma;
      callertResoluciones.res_nEstado = this.res_nEstado;
      return (CallerObject) callertResoluciones;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("res_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("res_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("res_nfalsaalarma", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("res_nEstado", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["res_ccodigo"] = (object) this.res_ccodigo ?? (object) DBNull.Value;
      row["res_cdescripcion"] = (object) this.res_cdescripcion ?? (object) DBNull.Value;
      row["res_nfalsaalarma"] = (object) this.res_nfalsaalarma ?? (object) DBNull.Value;
      row["res_nEstado"] = (object) this.res_nEstado ?? (object) DBNull.Value;
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
