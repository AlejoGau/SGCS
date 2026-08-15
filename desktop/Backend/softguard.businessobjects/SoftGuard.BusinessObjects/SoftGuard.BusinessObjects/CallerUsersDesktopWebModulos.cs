// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerUsersDesktopWebModulos
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerUsersDesktopWebModulos : CallerObject
  {
    private int _dwm_idKey;
    private int _dwm_idWeb;
    private int _dwm_idModules;
    private string _dwm_idTabla;
    private string _dwm_dealer;
    private string _dwm_cuenta_desde;
    private string _dwm_cuenta_hasta;
    private string _dwm_data;

    public int dwm_idKey
    {
      get
      {
        return this._dwm_idKey;
      }
      set
      {
        this._dwm_idKey = value;
      }
    }

    public int dwm_idWeb
    {
      get
      {
        return this._dwm_idWeb;
      }
      set
      {
        this._dwm_idWeb = value;
      }
    }

    public int dwm_idModules
    {
      get
      {
        return this._dwm_idModules;
      }
      set
      {
        this._dwm_idModules = value;
      }
    }

    public string dwm_idTabla
    {
      get
      {
        return this._dwm_idTabla;
      }
      set
      {
        this._dwm_idTabla = value;
      }
    }

    public string dwm_dealer
    {
      get
      {
        return this._dwm_dealer;
      }
      set
      {
        this._dwm_dealer = value;
      }
    }

    public string dwm_cuenta_desde
    {
      get
      {
        return this._dwm_cuenta_desde;
      }
      set
      {
        this._dwm_cuenta_desde = value;
      }
    }

    public string dwm_cuenta_hasta
    {
      get
      {
        return this._dwm_cuenta_hasta;
      }
      set
      {
        this._dwm_cuenta_hasta = value;
      }
    }

    public string dwm_data
    {
      get
      {
        return this._dwm_data;
      }
      set
      {
        this._dwm_data = value;
      }
    }

    public CallerUsersDesktopWebModulos()
    {
      this.InitClass();
    }

    public CallerUsersDesktopWebModulos(int Id, string Name, int dwm_idKey, int dwm_idWeb, int dwm_idModules, string dwm_idTabla, string dwm_dealer, string dwm_cuenta_desde, string dwm_cuenta_hasta, string dwm_data)
    {
      this.Id = Id;
      this.Name = Name;
      this._dwm_idKey = dwm_idKey;
      this._dwm_idWeb = dwm_idWeb;
      this._dwm_idModules = dwm_idModules;
      this._dwm_idTabla = dwm_idTabla;
      this._dwm_dealer = dwm_dealer;
      this._dwm_cuenta_desde = dwm_cuenta_desde;
      this._dwm_cuenta_hasta = dwm_cuenta_hasta;
      this._dwm_data = dwm_data;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3051, "UsersDesktopWebModulos");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleUsersDesktopWebModulos desktopWebModulos = new SimpleUsersDesktopWebModulos();
      desktopWebModulos.Id = this.Id;
      desktopWebModulos.Name = this.Name;
      desktopWebModulos.dwm_idKey = this._dwm_idKey;
      desktopWebModulos.dwm_idWeb = this._dwm_idWeb;
      desktopWebModulos.dwm_idModules = this._dwm_idModules;
      desktopWebModulos.dwm_idTabla = this._dwm_idTabla;
      desktopWebModulos.dwm_dealer = this._dwm_dealer;
      desktopWebModulos.dwm_cuenta_desde = this._dwm_cuenta_desde;
      desktopWebModulos.dwm_cuenta_hasta = this._dwm_cuenta_hasta;
      desktopWebModulos.dwm_data = this._dwm_data;
      return (SimpleBaseObject) desktopWebModulos;
    }

    public void SetSimpleObject(SimpleUsersDesktopWebModulos Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._dwm_idKey = Simple.dwm_idKey;
      this._dwm_idWeb = Simple.dwm_idWeb;
      this._dwm_idModules = Simple.dwm_idModules;
      this._dwm_idTabla = Simple.dwm_idTabla;
      this._dwm_dealer = Simple.dwm_dealer;
      this._dwm_cuenta_desde = Simple.dwm_cuenta_desde;
      this._dwm_cuenta_hasta = Simple.dwm_cuenta_hasta;
      this._dwm_data = Simple.dwm_data;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalUsersDesktopWebModulos(SqlConfig, UserId, (SimpleUsersDesktopWebModulos) this.GetSimpleObject());
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
      row["dwm_idKey"] = (object) this._dwm_idKey;
      row["dwm_idWeb"] = (object) this._dwm_idWeb;
      row["dwm_idModules"] = (object) this._dwm_idModules;
      row["dwm_idTabla"] = (object) this._dwm_idTabla;
      row["dwm_dealer"] = (object) this._dwm_dealer;
      row["dwm_cuenta_desde"] = (object) this._dwm_cuenta_desde;
      row["dwm_cuenta_hasta"] = (object) this._dwm_cuenta_hasta;
      row["dwm_data"] = (object) this._dwm_data;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Caller")
      {
        EnforceConstraints = false,
        Tables = {
          this.GetDataObject(),
          this.Type.GetDataObject()
        }
      });
      if (this.Relation != null)
        xmlDataDocument.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
