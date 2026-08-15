// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplew_destinatarios_correo
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
  public class Simplew_destinatarios_correo : SimpleBaseObject
  {
    [DataMember]
    public string destino { get; set; }

    [DataMember]
    public string email_destino { get; set; }

    public Simplew_destinatarios_correo()
    {
      this.InitClass();
    }

    public Simplew_destinatarios_correo(int Id, string Name, string destino, string email_destino)
    {
      this.Id = Id;
      this.Name = Name;
      this.destino = destino;
      this.email_destino = email_destino;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3155, "w_destinatarios_correo");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalw_destinatarios_correo(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerw_destinatarios_correo destinatariosCorreo = new Callerw_destinatarios_correo();
      destinatariosCorreo.Id = this.Id;
      destinatariosCorreo.Name = this.Name;
      destinatariosCorreo.destino = this.destino;
      destinatariosCorreo.email_destino = this.email_destino;
      return (CallerObject) destinatariosCorreo;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("destino", typeof (string)));
      dataTable.Columns.Add(new DataColumn("email_destino", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["destino"] = (object) this.destino ?? (object) DBNull.Value;
      row["email_destino"] = (object) this.email_destino ?? (object) DBNull.Value;
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
