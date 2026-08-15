// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerGps
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerGps : CallerObject
  {
    private DateTime _gps_tfechahora;
    private int _gps_idCuenta;
    private int _gps_idRec;
    private float _gps_rLatitud;
    private float _gps_rLongitud;

    public DateTime gps_tfechahora
    {
      get
      {
        return this._gps_tfechahora;
      }
      set
      {
        this._gps_tfechahora = value;
      }
    }

    public int gps_idCuenta
    {
      get
      {
        return this._gps_idCuenta;
      }
      set
      {
        this._gps_idCuenta = value;
      }
    }

    public int gps_idRec
    {
      get
      {
        return this._gps_idRec;
      }
      set
      {
        this._gps_idRec = value;
      }
    }

    public float gps_rLatitud
    {
      get
      {
        return this._gps_rLatitud;
      }
      set
      {
        this._gps_rLatitud = value;
      }
    }

    public float gps_rLongitud
    {
      get
      {
        return this._gps_rLongitud;
      }
      set
      {
        this._gps_rLongitud = value;
      }
    }

    public CallerGps()
    {
      this.InitClass();
    }

    public CallerGps(int Id, string Name, DateTime gps_tfechahora, int gps_idCuenta, int gps_idRec, float gps_rLatitud, float gps_rLongitud)
    {
      this.Id = Id;
      this.Name = Name;
      this._gps_tfechahora = gps_tfechahora;
      this._gps_idCuenta = gps_idCuenta;
      this._gps_idRec = gps_idRec;
      this._gps_rLatitud = gps_rLatitud;
      this._gps_rLongitud = gps_rLongitud;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3038, "Gps");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleGps simpleGps = new SimpleGps();
      simpleGps.Id = this.Id;
      simpleGps.Name = this.Name;
      simpleGps.gps_tfechahora = this._gps_tfechahora;
      simpleGps.gps_idCuenta = this._gps_idCuenta;
      simpleGps.gps_idRec = this._gps_idRec;
      simpleGps.gps_rLatitud = this._gps_rLatitud;
      simpleGps.gps_rLongitud = this._gps_rLongitud;
      return (SimpleBaseObject) simpleGps;
    }

    public void SetSimpleObject(SimpleGps Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._gps_tfechahora = Simple.gps_tfechahora;
      this._gps_idCuenta = Simple.gps_idCuenta;
      this._gps_idRec = Simple.gps_idRec;
      this._gps_rLatitud = Simple.gps_rLatitud;
      this._gps_rLongitud = Simple.gps_rLongitud;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalGps(SqlConfig, UserId, (SimpleGps) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("gps_tfechahora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("gps_idCuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("gps_idRec", typeof (int)));
      dataTable.Columns.Add(new DataColumn("gps_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("gps_rLongitud", typeof (float)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["gps_tfechahora"] = (object) this._gps_tfechahora;
      row["gps_idCuenta"] = (object) this._gps_idCuenta;
      row["gps_idRec"] = (object) this._gps_idRec;
      row["gps_rLatitud"] = (object) this._gps_rLatitud;
      row["gps_rLongitud"] = (object) this._gps_rLongitud;
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
