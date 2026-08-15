// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplew_usuarios
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
  public class Simplew_usuarios : SimpleBaseObject
  {
    [DataMember]
    public string nombrelogin { get; set; }

    [DataMember]
    public string contrasena { get; set; }

    [DataMember]
    public bool first_login { get; set; }

    [DataMember]
    public string nombre_mostrar { get; set; }

    [DataMember]
    public string logo { get; set; }

    [DataMember]
    public string html_bienvenida { get; set; }

    [DataMember]
    public int tipo_vista { get; set; }

    [DataMember]
    public int tipo_vistaM { get; set; }

    [DataMember]
    public string email_novedades { get; set; }

    [DataMember]
    public string email { get; set; }

    public Simplew_usuarios()
    {
      this.InitClass();
    }

    public Simplew_usuarios(int Id, string Name, string nombrelogin, string contrasena, bool first_login, string nombre_mostrar, string logo, string html_bienvenida, int tipo_vista, int tipo_vistaM, string email_novedades, string email)
    {
      this.Id = Id;
      this.Name = Name;
      this.nombrelogin = nombrelogin;
      this.contrasena = contrasena;
      this.first_login = first_login;
      this.nombre_mostrar = nombre_mostrar;
      this.logo = logo;
      this.html_bienvenida = html_bienvenida;
      this.tipo_vista = tipo_vista;
      this.tipo_vistaM = tipo_vistaM;
      this.email_novedades = email_novedades;
      this.email = email;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3062, "w_usuarios");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalw_usuarios(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerw_usuarios callerwUsuarios = new Callerw_usuarios();
      callerwUsuarios.Id = this.Id;
      callerwUsuarios.Name = this.Name;
      callerwUsuarios.nombrelogin = this.nombrelogin;
      callerwUsuarios.contrasena = this.contrasena;
      callerwUsuarios.first_login = this.first_login;
      callerwUsuarios.nombre_mostrar = this.nombre_mostrar;
      callerwUsuarios.logo = this.logo;
      callerwUsuarios.html_bienvenida = this.html_bienvenida;
      callerwUsuarios.tipo_vista = this.tipo_vista;
      callerwUsuarios.tipo_vistaM = this.tipo_vistaM;
      callerwUsuarios.email_novedades = this.email_novedades;
      callerwUsuarios.email = this.email;
      return (CallerObject) callerwUsuarios;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nombrelogin", typeof (string)));
      dataTable.Columns.Add(new DataColumn("contrasena", typeof (string)));
      dataTable.Columns.Add(new DataColumn("first_login", typeof (bool)));
      dataTable.Columns.Add(new DataColumn("nombre_mostrar", typeof (string)));
      dataTable.Columns.Add(new DataColumn("logo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("html_bienvenida", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tipo_vista", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tipo_vistaM", typeof (int)));
      dataTable.Columns.Add(new DataColumn("email_novedades", typeof (string)));
      dataTable.Columns.Add(new DataColumn("email", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["nombrelogin"] = (object) this.nombrelogin ?? (object) DBNull.Value;
      row["contrasena"] = (object) this.contrasena ?? (object) DBNull.Value;
      row["first_login"] = (object) this.first_login ?? (object) DBNull.Value;
      row["nombre_mostrar"] = (object) this.nombre_mostrar ?? (object) DBNull.Value;
      row["logo"] = (object) this.logo ?? (object) DBNull.Value;
      row["html_bienvenida"] = (object) this.html_bienvenida ?? (object) DBNull.Value;
      row["tipo_vista"] = (object) this.tipo_vista ?? (object) DBNull.Value;
      row["tipo_vistaM"] = (object) this.tipo_vistaM ?? (object) DBNull.Value;
      row["email_novedades"] = (object) this.email_novedades ?? (object) DBNull.Value;
      row["email"] = (object) this.email ?? (object) DBNull.Value;
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
