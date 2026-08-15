// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplew_cuentas_x_usuario
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
  public class Simplew_cuentas_x_usuario : SimpleBaseObject
  {
    [DataMember]
    public int id_usuario { get; set; }

    [DataMember]
    public int cue_iid { get; set; }

    public Simplew_cuentas_x_usuario()
    {
      this.InitClass();
    }

    public Simplew_cuentas_x_usuario(int Id, string Name, int id_usuario, int cue_iid)
    {
      this.Id = Id;
      this.Name = Name;
      this.id_usuario = id_usuario;
      this.cue_iid = cue_iid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3063, "w_cuentas_x_usuario");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalw_cuentas_x_usuario(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerw_cuentas_x_usuario callerwCuentasXUsuario = new Callerw_cuentas_x_usuario();
      callerwCuentasXUsuario.Id = this.Id;
      callerwCuentasXUsuario.Name = this.Name;
      callerwCuentasXUsuario.id_usuario = this.id_usuario;
      callerwCuentasXUsuario.cue_iid = this.cue_iid;
      return (CallerObject) callerwCuentasXUsuario;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("id_usuario", typeof (int)));
      dataTable.Columns.Add(new DataColumn("cue_iid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["id_usuario"] = (object) this.id_usuario ?? (object) DBNull.Value;
      row["cue_iid"] = (object) this.cue_iid ?? (object) DBNull.Value;
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
