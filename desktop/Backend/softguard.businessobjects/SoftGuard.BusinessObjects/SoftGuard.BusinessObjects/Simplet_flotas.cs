// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_flotas
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
  public class Simplet_flotas : SimpleBaseObject
  {
    [DataMember]
    public string flo_ccodigo { get; set; }

    [DataMember]
    public string flo_cdescripcion { get; set; }

    public Simplet_flotas()
    {
      this.InitClass();
    }

    public Simplet_flotas(int Id, string Name, string flo_ccodigo, string flo_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this.flo_ccodigo = flo_ccodigo;
      this.flo_cdescripcion = flo_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3086, "t_flotas");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_flotas(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_flotas callertFlotas = new Callert_flotas();
      callertFlotas.Id = this.Id;
      callertFlotas.Name = this.Name;
      callertFlotas.flo_ccodigo = this.flo_ccodigo;
      callertFlotas.flo_cdescripcion = this.flo_cdescripcion;
      return (CallerObject) callertFlotas;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("flo_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("flo_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["flo_ccodigo"] = (object) this.flo_ccodigo ?? (object) DBNull.Value;
      row["flo_cdescripcion"] = (object) this.flo_cdescripcion ?? (object) DBNull.Value;
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
