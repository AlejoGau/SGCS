// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_EscalamientoPrioridades
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
  public class Simplet_EscalamientoPrioridades : SimpleBaseObject
  {
    [DataMember]
    public int tep_itiempo { get; set; }

    [DataMember]
    public Decimal tep_ncontrola { get; set; }

    public Simplet_EscalamientoPrioridades()
    {
      this.InitClass();
    }

    public Simplet_EscalamientoPrioridades(int Id, string Name, int tep_itiempo, Decimal tep_ncontrola)
    {
      this.Id = Id;
      this.Name = Name;
      this.tep_itiempo = tep_itiempo;
      this.tep_ncontrola = tep_ncontrola;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3108, "t_EscalamientoPrioridades");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_EscalamientoPrioridades(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_EscalamientoPrioridades escalamientoPrioridades = new Callert_EscalamientoPrioridades();
      escalamientoPrioridades.Id = this.Id;
      escalamientoPrioridades.Name = this.Name;
      escalamientoPrioridades.tep_itiempo = this.tep_itiempo;
      escalamientoPrioridades.tep_ncontrola = this.tep_ncontrola;
      return (CallerObject) escalamientoPrioridades;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tep_itiempo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tep_ncontrola", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tep_itiempo"] = (object) this.tep_itiempo ?? (object) DBNull.Value;
      row["tep_ncontrola"] = (object) this.tep_ncontrola ?? (object) DBNull.Value;
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
