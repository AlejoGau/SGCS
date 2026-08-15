// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_grupos
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
  public class Simplet_grupos : SimpleBaseObject
  {
    [DataMember]
    public string gru_ccodigo { get; set; }

    [DataMember]
    public string gru_cdescripcion { get; set; }

    public Simplet_grupos()
    {
      this.InitClass();
    }

    public Simplet_grupos(int Id, string Name, string gru_ccodigo, string gru_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this.gru_ccodigo = gru_ccodigo;
      this.gru_cdescripcion = gru_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3075, "t_grupos");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_grupos(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_grupos callertGrupos = new Callert_grupos();
      callertGrupos.Id = this.Id;
      callertGrupos.Name = this.Name;
      callertGrupos.gru_ccodigo = this.gru_ccodigo;
      callertGrupos.gru_cdescripcion = this.gru_cdescripcion;
      return (CallerObject) callertGrupos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("gru_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("gru_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["gru_ccodigo"] = (object) this.gru_ccodigo ?? (object) DBNull.Value;
      row["gru_cdescripcion"] = (object) this.gru_cdescripcion ?? (object) DBNull.Value;
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
