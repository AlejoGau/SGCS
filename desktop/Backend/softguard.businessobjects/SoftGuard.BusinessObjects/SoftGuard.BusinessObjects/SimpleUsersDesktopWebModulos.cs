// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleUsersDesktopWebModulos
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
  public class SimpleUsersDesktopWebModulos : SimpleBaseObject
  {
    [DataMember]
    public int dwm_idKey { get; set; }

    [DataMember]
    public int dwm_idWeb { get; set; }

    [DataMember]
    public int dwm_idModules { get; set; }

    [DataMember]
    public string dwm_idTabla { get; set; }

    [DataMember]
    public string dwm_dealer { get; set; }

    [DataMember]
    public string dwm_cuenta_desde { get; set; }

    [DataMember]
    public string dwm_cuenta_hasta { get; set; }

    [DataMember]
    public string dwm_data { get; set; }

    public SimpleUsersDesktopWebModulos()
    {
      this.InitClass();
    }

    public SimpleUsersDesktopWebModulos(int Id, string Name, int dwm_idKey, int dwm_idWeb, int dwm_idModules, string dwm_idTabla, string dwm_dealer, string dwm_cuenta_desde, string dwm_cuenta_hasta, string dwm_data)
    {
      this.Id = Id;
      this.Name = Name;
      this.dwm_idKey = dwm_idKey;
      this.dwm_idWeb = dwm_idWeb;
      this.dwm_idModules = dwm_idModules;
      this.dwm_idTabla = dwm_idTabla;
      this.dwm_dealer = dwm_dealer;
      this.dwm_cuenta_desde = dwm_cuenta_desde;
      this.dwm_cuenta_hasta = dwm_cuenta_hasta;
      this.dwm_data = dwm_data;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3051, "UsersDesktopWebModulos");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalUsersDesktopWebModulos(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerUsersDesktopWebModulos desktopWebModulos = new CallerUsersDesktopWebModulos();
      desktopWebModulos.Id = this.Id;
      desktopWebModulos.Name = this.Name;
      desktopWebModulos.dwm_idKey = this.dwm_idKey;
      desktopWebModulos.dwm_idWeb = this.dwm_idWeb;
      desktopWebModulos.dwm_idModules = this.dwm_idModules;
      desktopWebModulos.dwm_idTabla = this.dwm_idTabla;
      desktopWebModulos.dwm_dealer = this.dwm_dealer;
      desktopWebModulos.dwm_cuenta_desde = this.dwm_cuenta_desde;
      desktopWebModulos.dwm_cuenta_hasta = this.dwm_cuenta_hasta;
      desktopWebModulos.dwm_data = this.dwm_data;
      return (CallerObject) desktopWebModulos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_idKey", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dwm_idWeb", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dwm_idModules", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dwm_idTabla", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_dealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_cuenta_desde", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_cuenta_hasta", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_data", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["dwm_idKey"] = (object) this.dwm_idKey ?? (object) DBNull.Value;
      row["dwm_idWeb"] = (object) this.dwm_idWeb ?? (object) DBNull.Value;
      row["dwm_idModules"] = (object) this.dwm_idModules ?? (object) DBNull.Value;
      row["dwm_idTabla"] = (object) this.dwm_idTabla ?? (object) DBNull.Value;
      row["dwm_dealer"] = (object) this.dwm_dealer ?? (object) DBNull.Value;
      row["dwm_cuenta_desde"] = (object) this.dwm_cuenta_desde ?? (object) DBNull.Value;
      row["dwm_cuenta_hasta"] = (object) this.dwm_cuenta_hasta ?? (object) DBNull.Value;
      row["dwm_data"] = (object) this.dwm_data ?? (object) DBNull.Value;
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
