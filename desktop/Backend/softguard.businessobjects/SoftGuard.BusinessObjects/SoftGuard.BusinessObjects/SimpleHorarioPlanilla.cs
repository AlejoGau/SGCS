// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleHorarioPlanilla
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
  public class SimpleHorarioPlanilla : SimpleBaseObject
  {
    [DataMember]
    public int hor_iid { get; set; }

    [DataMember]
    public Decimal hor_ndiaapertura { get; set; }

    [DataMember]
    public string hor_choraapertura { get; set; }

    [DataMember]
    public Decimal hor_ndiacierre { get; set; }

    [DataMember]
    public string hor_choracierre { get; set; }

    public SimpleHorarioPlanilla()
    {
      this.InitClass();
    }

    public SimpleHorarioPlanilla(int Id, string Name, int hor_iid, Decimal hor_ndiaapertura, string hor_choraapertura, Decimal hor_ndiacierre, string hor_choracierre)
    {
      this.Id = Id;
      this.Name = Name;
      this.hor_iid = hor_iid;
      this.hor_ndiaapertura = hor_ndiaapertura;
      this.hor_choraapertura = hor_choraapertura;
      this.hor_ndiacierre = hor_ndiacierre;
      this.hor_choracierre = hor_choracierre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3098, "HorarioPlanilla");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalHorarioPlanilla(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioPlanilla callerHorarioPlanilla = new CallerHorarioPlanilla();
      callerHorarioPlanilla.Id = this.Id;
      callerHorarioPlanilla.Name = this.Name;
      callerHorarioPlanilla.hor_iid = this.hor_iid;
      callerHorarioPlanilla.hor_ndiaapertura = this.hor_ndiaapertura;
      callerHorarioPlanilla.hor_choraapertura = this.hor_choraapertura;
      callerHorarioPlanilla.hor_ndiacierre = this.hor_ndiacierre;
      callerHorarioPlanilla.hor_choracierre = this.hor_choracierre;
      return (CallerObject) callerHorarioPlanilla;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("hor_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("hor_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("hor_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("hor_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("hor_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["hor_iid"] = (object) this.hor_iid ?? (object) DBNull.Value;
      row["hor_ndiaapertura"] = (object) this.hor_ndiaapertura ?? (object) DBNull.Value;
      row["hor_choraapertura"] = (object) this.hor_choraapertura ?? (object) DBNull.Value;
      row["hor_ndiacierre"] = (object) this.hor_ndiacierre ?? (object) DBNull.Value;
      row["hor_choracierre"] = (object) this.hor_choracierre ?? (object) DBNull.Value;
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
