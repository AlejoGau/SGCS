// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_resolucionesllamada
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
  public class Simplet_resolucionesllamada : SimpleBaseObject
  {
    [DataMember]
    public string rll_ccodigo { get; set; }

    [DataMember]
    public string rll_cdescripcion { get; set; }

    public Simplet_resolucionesllamada()
    {
      this.InitClass();
    }

    public Simplet_resolucionesllamada(int Id, string Name, string rll_ccodigo, string rll_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this.rll_ccodigo = rll_ccodigo;
      this.rll_cdescripcion = rll_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3081, "t_resolucionesllamada");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_resolucionesllamada(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_resolucionesllamada resolucionesllamada = new Callert_resolucionesllamada();
      resolucionesllamada.Id = this.Id;
      resolucionesllamada.Name = this.Name;
      resolucionesllamada.rll_ccodigo = this.rll_ccodigo;
      resolucionesllamada.rll_cdescripcion = this.rll_cdescripcion;
      return (CallerObject) resolucionesllamada;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rll_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rll_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["rll_ccodigo"] = (object) this.rll_ccodigo ?? (object) DBNull.Value;
      row["rll_cdescripcion"] = (object) this.rll_cdescripcion ?? (object) DBNull.Value;
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
