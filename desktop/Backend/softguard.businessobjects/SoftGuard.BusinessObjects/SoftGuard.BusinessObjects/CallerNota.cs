// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerNota
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
  public class CallerNota : CallerObject
  {
    private int _not_iidcuenta;
    private string _not_mnotaprincipal;
    private string _not_mnotatemporal;
    private DateTime _not_dtemporaldesde;
    private DateTime _not_dtemporalhasta;

    public int not_iidcuenta
    {
      get
      {
        return this._not_iidcuenta;
      }
      set
      {
        this._not_iidcuenta = value;
      }
    }

    public string not_mnotaprincipal
    {
      get
      {
        return this._not_mnotaprincipal;
      }
      set
      {
        this._not_mnotaprincipal = value;
      }
    }

    public string not_mnotatemporal
    {
      get
      {
        return this._not_mnotatemporal;
      }
      set
      {
        this._not_mnotatemporal = value;
      }
    }

    public DateTime not_dtemporaldesde
    {
      get
      {
        return this._not_dtemporaldesde;
      }
      set
      {
        this._not_dtemporaldesde = value;
      }
    }

    public DateTime not_dtemporalhasta
    {
      get
      {
        return this._not_dtemporalhasta;
      }
      set
      {
        this._not_dtemporalhasta = value;
      }
    }

    public CallerNota()
    {
      this.InitClass();
    }

    public CallerNota(int Id, string Name, int not_iidcuenta, string not_mnotaprincipal, string not_mnotatemporal, DateTime not_dtemporaldesde, DateTime not_dtemporalhasta)
    {
      this.Id = Id;
      this.Name = Name;
      this._not_iidcuenta = not_iidcuenta;
      this._not_mnotaprincipal = not_mnotaprincipal;
      this._not_mnotatemporal = not_mnotatemporal;
      this._not_dtemporaldesde = not_dtemporaldesde;
      this._not_dtemporalhasta = not_dtemporalhasta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3010, "Nota");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleNota simpleNota = new SimpleNota();
      simpleNota.Id = this.Id;
      simpleNota.Name = this.Name;
      simpleNota.not_iidcuenta = this._not_iidcuenta;
      simpleNota.not_mnotaprincipal = this._not_mnotaprincipal;
      simpleNota.not_mnotatemporal = this._not_mnotatemporal;
      simpleNota.not_dtemporaldesde = this._not_dtemporaldesde;
      simpleNota.not_dtemporalhasta = this._not_dtemporalhasta;
      return (SimpleBaseObject) simpleNota;
    }

    public void SetSimpleObject(SimpleNota Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._not_iidcuenta = Simple.not_iidcuenta;
      this._not_mnotaprincipal = Simple.not_mnotaprincipal;
      this._not_mnotatemporal = Simple.not_mnotatemporal;
      this._not_dtemporaldesde = Simple.not_dtemporaldesde;
      this._not_dtemporalhasta = Simple.not_dtemporalhasta;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalNota(SqlConfig, UserId, (SimpleNota) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("not_mnotaprincipal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_mnotatemporal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("not_dtemporaldesde", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("not_dtemporalhasta", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["not_iidcuenta"] = (object) this._not_iidcuenta;
      row["not_mnotaprincipal"] = (object) this._not_mnotaprincipal;
      row["not_mnotatemporal"] = (object) this._not_mnotatemporal;
      row["not_dtemporaldesde"] = (object) this._not_dtemporaldesde;
      row["not_dtemporalhasta"] = (object) this._not_dtemporalhasta;
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
