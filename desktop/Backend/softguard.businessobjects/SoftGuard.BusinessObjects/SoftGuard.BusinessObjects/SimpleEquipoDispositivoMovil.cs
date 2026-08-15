// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleEquipoDispositivoMovil
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
  public class SimpleEquipoDispositivoMovil : SimpleBaseObject
  {
    [DataMember]
    public int idCuenta { get; set; }

    [DataMember]
    public int idEquipo { get; set; }

    [DataMember]
    public string Config { get; set; }

    [DataMember]
    public int isTemplate { get; set; }

    public SimpleEquipoDispositivoMovil()
    {
      this.InitClass();
    }

    public SimpleEquipoDispositivoMovil(int Id, string Name, int idCuenta, int idEquipo, string Config, int isTemplate)
    {
      this.Id = Id;
      this.Name = Name;
      this.idCuenta = idCuenta;
      this.idEquipo = idEquipo;
      this.Config = Config;
      this.isTemplate = isTemplate;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3064, "EquipoDispositivoMovil");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalEquipoDispositivoMovil(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerEquipoDispositivoMovil dispositivoMovil = new CallerEquipoDispositivoMovil();
      dispositivoMovil.Id = this.Id;
      dispositivoMovil.Name = this.Name;
      dispositivoMovil.idCuenta = this.idCuenta;
      dispositivoMovil.idEquipo = this.idEquipo;
      dispositivoMovil.Config = this.Config;
      dispositivoMovil.isTemplate = this.isTemplate;
      return (CallerObject) dispositivoMovil;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("idCuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("idEquipo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Config", typeof (string)));
      dataTable.Columns.Add(new DataColumn("isTemplate", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["idCuenta"] = (object) this.idCuenta ?? (object) DBNull.Value;
      row["idEquipo"] = (object) this.idEquipo ?? (object) DBNull.Value;
      row["Config"] = (object) this.Config ?? (object) DBNull.Value;
      row["isTemplate"] = (object) this.isTemplate ?? (object) DBNull.Value;
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
