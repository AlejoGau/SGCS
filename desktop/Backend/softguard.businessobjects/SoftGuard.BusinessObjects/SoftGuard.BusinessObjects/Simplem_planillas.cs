// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_planillas
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
  public class Simplem_planillas : SimpleBaseObject
  {
    [DataMember]
    public string pla_cDescripcion { get; set; }

    [DataMember]
    public string pla_cNombreTabla { get; set; }

    public Simplem_planillas()
    {
      this.InitClass();
    }

    public Simplem_planillas(int Id, string Name, string pla_cDescripcion, string pla_cNombreTabla)
    {
      this.Id = Id;
      this.Name = Name;
      this.pla_cDescripcion = pla_cDescripcion;
      this.pla_cNombreTabla = pla_cNombreTabla;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3097, "m_planillas");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_planillas(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_planillas callermPlanillas = new Callerm_planillas();
      callermPlanillas.Id = this.Id;
      callermPlanillas.Name = this.Name;
      callermPlanillas.pla_cDescripcion = this.pla_cDescripcion;
      callermPlanillas.pla_cNombreTabla = this.pla_cNombreTabla;
      return (CallerObject) callermPlanillas;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pla_cDescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pla_cNombreTabla", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pla_cDescripcion"] = (object) this.pla_cDescripcion ?? (object) DBNull.Value;
      row["pla_cNombreTabla"] = (object) this.pla_cNombreTabla ?? (object) DBNull.Value;
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
