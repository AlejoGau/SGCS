// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerHombreVivo
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
  public class CallerHombreVivo : CallerObject
  {
    private DateTime? _fecha;
    private int _proximo;
    private int _idscheduler;
    private string _imei;
    private int _idcuenta;

    public DateTime? fecha
    {
      get
      {
        return this._fecha;
      }
      set
      {
        this._fecha = value;
      }
    }

    public int proximo
    {
      get
      {
        return this._proximo;
      }
      set
      {
        this._proximo = value;
      }
    }

    public int idscheduler
    {
      get
      {
        return this._idscheduler;
      }
      set
      {
        this._idscheduler = value;
      }
    }

    public string imei
    {
      get
      {
        return this._imei;
      }
      set
      {
        this._imei = value;
      }
    }

    public int idcuenta
    {
      get
      {
        return this._idcuenta;
      }
      set
      {
        this._idcuenta = value;
      }
    }

    public CallerHombreVivo()
    {
      this.InitClass();
    }

    public CallerHombreVivo(int Id, string Name, DateTime? fecha, int proximo, int idscheduler, string imei, int idcuenta)
    {
      this.Id = Id;
      this.Name = Name;
      this._fecha = fecha;
      this._proximo = proximo;
      this._idscheduler = idscheduler;
      this._imei = imei;
      this._idcuenta = idcuenta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3116, "HombreVivo");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleHombreVivo simpleHombreVivo = new SimpleHombreVivo();
      simpleHombreVivo.Id = this.Id;
      simpleHombreVivo.Name = this.Name;
      simpleHombreVivo.fecha = this._fecha;
      simpleHombreVivo.proximo = this._proximo;
      simpleHombreVivo.idscheduler = this._idscheduler;
      simpleHombreVivo.imei = this._imei;
      simpleHombreVivo.idcuenta = this._idcuenta;
      return (SimpleBaseObject) simpleHombreVivo;
    }

    public void SetSimpleObject(SimpleHombreVivo Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._fecha = Simple.fecha;
      this._proximo = Simple.proximo;
      this._idscheduler = Simple.idscheduler;
      this._imei = Simple.imei;
      this._idcuenta = Simple.idcuenta;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalHombreVivo(SqlConfig, UserId, (SimpleHombreVivo) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("fecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("proximo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("idscheduler", typeof (int)));
      dataTable.Columns.Add(new DataColumn("imei", typeof (string)));
      dataTable.Columns.Add(new DataColumn("idcuenta", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["fecha"] = (object) this._fecha;
      row["proximo"] = (object) this._proximo;
      row["idscheduler"] = (object) this._idscheduler;
      row["imei"] = (object) this._imei;
      row["idcuenta"] = (object) this._idcuenta;
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
