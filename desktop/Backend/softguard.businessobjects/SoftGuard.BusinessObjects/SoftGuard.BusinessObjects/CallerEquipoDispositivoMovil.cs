// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerEquipoDispositivoMovil
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerEquipoDispositivoMovil : CallerObject
  {
    private int _idCuenta;
    private int _idEquipo;
    private string _Config;
    private int _isTemplate;

    public int idCuenta
    {
      get
      {
        return this._idCuenta;
      }
      set
      {
        this._idCuenta = value;
      }
    }

    public int idEquipo
    {
      get
      {
        return this._idEquipo;
      }
      set
      {
        this._idEquipo = value;
      }
    }

    public string Config
    {
      get
      {
        return this._Config;
      }
      set
      {
        this._Config = value;
      }
    }

    public int isTemplate
    {
      get
      {
        return this._isTemplate;
      }
      set
      {
        this._isTemplate = value;
      }
    }

    public CallerEquipoDispositivoMovil()
    {
      this.InitClass();
    }

    public CallerEquipoDispositivoMovil(int Id, string Name, int idCuenta, int idEquipo, string Config, int isTemplate)
    {
      this.Id = Id;
      this.Name = Name;
      this._idCuenta = idCuenta;
      this._idEquipo = idEquipo;
      this._Config = Config;
      this._isTemplate = isTemplate;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3064, "EquipoDispositivoMovil");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleEquipoDispositivoMovil dispositivoMovil = new SimpleEquipoDispositivoMovil();
      dispositivoMovil.Id = this.Id;
      dispositivoMovil.Name = this.Name;
      dispositivoMovil.idCuenta = this._idCuenta;
      dispositivoMovil.idEquipo = this._idEquipo;
      dispositivoMovil.Config = this._Config;
      dispositivoMovil.isTemplate = this._isTemplate;
      return (SimpleBaseObject) dispositivoMovil;
    }

    public void SetSimpleObject(SimpleEquipoDispositivoMovil Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._idCuenta = Simple.idCuenta;
      this._idEquipo = Simple.idEquipo;
      this._Config = Simple.Config;
      this._isTemplate = Simple.isTemplate;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalEquipoDispositivoMovil(SqlConfig, UserId, (SimpleEquipoDispositivoMovil) this.GetSimpleObject());
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
      row["idCuenta"] = (object) this._idCuenta;
      row["idEquipo"] = (object) this._idEquipo;
      row["Config"] = (object) this._Config;
      row["isTemplate"] = (object) this._isTemplate;
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
