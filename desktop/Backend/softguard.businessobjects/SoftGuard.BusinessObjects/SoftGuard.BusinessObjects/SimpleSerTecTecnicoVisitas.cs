// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleSerTecTecnicoVisitas
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
  public class SimpleSerTecTecnicoVisitas : SimpleBaseObject
  {
    [DataMember]
    public int stv_iTecnico { get; set; }

    [DataMember]
    public int stv_iVisita { get; set; }

    [DataMember]
    public int stv_iFormaDeViaje { get; set; }

    public SimpleSerTecTecnicoVisitas()
    {
      this.InitClass();
    }

    public SimpleSerTecTecnicoVisitas(int Id, string Name, int stv_iTecnico, int stv_iVisita, int stv_iFormaDeViaje)
    {
      this.Id = Id;
      this.Name = Name;
      this.stv_iTecnico = stv_iTecnico;
      this.stv_iVisita = stv_iVisita;
      this.stv_iFormaDeViaje = stv_iFormaDeViaje;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3122, "SerTecTecnicoVisitas");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalSerTecTecnicoVisitas(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerSerTecTecnicoVisitas tecTecnicoVisitas = new CallerSerTecTecnicoVisitas();
      tecTecnicoVisitas.Id = this.Id;
      tecTecnicoVisitas.Name = this.Name;
      tecTecnicoVisitas.stv_iTecnico = this.stv_iTecnico;
      tecTecnicoVisitas.stv_iVisita = this.stv_iVisita;
      tecTecnicoVisitas.stv_iFormaDeViaje = this.stv_iFormaDeViaje;
      return (CallerObject) tecTecnicoVisitas;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stv_iTecnico", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stv_iVisita", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stv_iFormaDeViaje", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stv_iTecnico"] = (object) this.stv_iTecnico ?? (object) DBNull.Value;
      row["stv_iVisita"] = (object) this.stv_iVisita ?? (object) DBNull.Value;
      row["stv_iFormaDeViaje"] = (object) this.stv_iFormaDeViaje ?? (object) DBNull.Value;
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
