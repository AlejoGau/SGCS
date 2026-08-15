// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleSerTecMovilesVisitas
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
  public class SimpleSerTecMovilesVisitas : SimpleBaseObject
  {
    [DataMember]
    public int smv_iMovil { get; set; }

    [DataMember]
    public int smv_iVisita { get; set; }

    public SimpleSerTecMovilesVisitas()
    {
      this.InitClass();
    }

    public SimpleSerTecMovilesVisitas(int Id, string Name, int smv_iMovil, int smv_iVisita)
    {
      this.Id = Id;
      this.Name = Name;
      this.smv_iMovil = smv_iMovil;
      this.smv_iVisita = smv_iVisita;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3122, "SerTecMovilesVisitas");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalSerTecMovilesVisitas(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerSerTecMovilesVisitas tecMovilesVisitas = new CallerSerTecMovilesVisitas();
      tecMovilesVisitas.Id = this.Id;
      tecMovilesVisitas.Name = this.Name;
      tecMovilesVisitas.smv_iMovil = this.smv_iMovil;
      tecMovilesVisitas.smv_iVisita = this.smv_iVisita;
      return (CallerObject) tecMovilesVisitas;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("smv_iMovil", typeof (int)));
      dataTable.Columns.Add(new DataColumn("smv_iVisita", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["smv_iMovil"] = (object) this.smv_iMovil ?? (object) DBNull.Value;
      row["smv_iVisita"] = (object) this.smv_iVisita ?? (object) DBNull.Value;
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
