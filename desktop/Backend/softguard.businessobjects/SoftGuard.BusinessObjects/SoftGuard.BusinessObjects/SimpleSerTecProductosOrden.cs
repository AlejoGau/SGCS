// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleSerTecProductosOrden
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
  public class SimpleSerTecProductosOrden : SimpleBaseObject
  {
    [DataMember]
    public int spr_iServicio { get; set; }

    [DataMember]
    public int spr_iVisita { get; set; }

    [DataMember]
    public int spr_iProducto { get; set; }

    [DataMember]
    public float spr_iCantidad { get; set; }

    public SimpleSerTecProductosOrden()
    {
      this.InitClass();
    }

    public SimpleSerTecProductosOrden(int Id, string Name, int spr_iServicio, int spr_iVisita, int spr_iProducto, float spr_iCantidad)
    {
      this.Id = Id;
      this.Name = Name;
      this.spr_iServicio = spr_iServicio;
      this.spr_iVisita = spr_iVisita;
      this.spr_iProducto = spr_iProducto;
      this.spr_iCantidad = spr_iCantidad;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3123, "SerTecProductosOrden");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalSerTecProductosOrden(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerSerTecProductosOrden tecProductosOrden = new CallerSerTecProductosOrden();
      tecProductosOrden.Id = this.Id;
      tecProductosOrden.Name = this.Name;
      tecProductosOrden.spr_iServicio = this.spr_iServicio;
      tecProductosOrden.spr_iVisita = this.spr_iVisita;
      tecProductosOrden.spr_iProducto = this.spr_iProducto;
      tecProductosOrden.spr_iCantidad = this.spr_iCantidad;
      return (CallerObject) tecProductosOrden;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("spr_iServicio", typeof (int)));
      dataTable.Columns.Add(new DataColumn("spr_iVisita", typeof (int)));
      dataTable.Columns.Add(new DataColumn("spr_iProducto", typeof (int)));
      dataTable.Columns.Add(new DataColumn("spr_iCantidad", typeof (float)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["spr_iServicio"] = (object) this.spr_iServicio ?? (object) DBNull.Value;
      row["spr_iVisita"] = (object) this.spr_iVisita ?? (object) DBNull.Value;
      row["spr_iProducto"] = (object) this.spr_iProducto ?? (object) DBNull.Value;
      row["spr_iCantidad"] = (object) this.spr_iCantidad ?? (object) DBNull.Value;
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
