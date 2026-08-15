// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_formatos
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
  public class Simplem_formatos : SimpleBaseObject
  {
    [DataMember]
    public string for_cdescripcion { get; set; }

    [DataMember]
    public string for_cformato { get; set; }

    [DataMember]
    public string for_cnombre { get; set; }

    [DataMember]
    public string for_calarma { get; set; }

    [DataMember]
    public string for_ccodigo { get; set; }

    public Simplem_formatos()
    {
      this.InitClass();
    }

    public Simplem_formatos(int Id, string Name, string for_cdescripcion, string for_cformato, string for_cnombre, string for_calarma, string for_ccodigo)
    {
      this.Id = Id;
      this.Name = Name;
      this.for_cdescripcion = for_cdescripcion;
      this.for_cformato = for_cformato;
      this.for_cnombre = for_cnombre;
      this.for_calarma = for_calarma;
      this.for_ccodigo = for_ccodigo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3096, "m_formatos");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_formatos(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_formatos callermFormatos = new Callerm_formatos();
      callermFormatos.Id = this.Id;
      callermFormatos.Name = this.Name;
      callermFormatos.for_cdescripcion = this.for_cdescripcion;
      callermFormatos.for_cformato = this.for_cformato;
      callermFormatos.for_cnombre = this.for_cnombre;
      callermFormatos.for_calarma = this.for_calarma;
      callermFormatos.for_ccodigo = this.for_ccodigo;
      return (CallerObject) callermFormatos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cformato", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_calarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_ccodigo", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["for_cdescripcion"] = (object) this.for_cdescripcion ?? (object) DBNull.Value;
      row["for_cformato"] = (object) this.for_cformato ?? (object) DBNull.Value;
      row["for_cnombre"] = (object) this.for_cnombre ?? (object) DBNull.Value;
      row["for_calarma"] = (object) this.for_calarma ?? (object) DBNull.Value;
      row["for_ccodigo"] = (object) this.for_ccodigo ?? (object) DBNull.Value;
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
