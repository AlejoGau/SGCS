// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_teclados
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
  public class Simplet_teclados : SimpleBaseObject
  {
    [DataMember]
    public string tec_cdescripcion { get; set; }

    [DataMember]
    public string tec_cobservacion { get; set; }

    public Simplet_teclados()
    {
      this.InitClass();
    }

    public Simplet_teclados(int Id, string Name, string tec_cdescripcion, string tec_cobservacion)
    {
      this.Id = Id;
      this.Name = Name;
      this.tec_cdescripcion = tec_cdescripcion;
      this.tec_cobservacion = tec_cobservacion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3135, "t_teclados");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_teclados(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_teclados callertTeclados = new Callert_teclados();
      callertTeclados.Id = this.Id;
      callertTeclados.Name = this.Name;
      callertTeclados.tec_cdescripcion = this.tec_cdescripcion;
      callertTeclados.tec_cobservacion = this.tec_cobservacion;
      return (CallerObject) callertTeclados;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cobservacion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tec_cdescripcion"] = (object) this.tec_cdescripcion ?? (object) DBNull.Value;
      row["tec_cobservacion"] = (object) this.tec_cobservacion ?? (object) DBNull.Value;
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
