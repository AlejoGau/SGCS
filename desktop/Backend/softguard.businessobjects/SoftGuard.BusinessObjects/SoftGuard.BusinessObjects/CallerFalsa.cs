// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerFalsa
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
  public class CallerFalsa : CallerObject
  {
    private int _fal_iidcuenta;
    private Decimal _fal_nmargen;
    private Decimal _fal_nmeses;
    private string _fal_mnota;

    public int fal_iidcuenta
    {
      get
      {
        return this._fal_iidcuenta;
      }
      set
      {
        this._fal_iidcuenta = value;
      }
    }

    public Decimal fal_nmargen
    {
      get
      {
        return this._fal_nmargen;
      }
      set
      {
        this._fal_nmargen = value;
      }
    }

    public Decimal fal_nmeses
    {
      get
      {
        return this._fal_nmeses;
      }
      set
      {
        this._fal_nmeses = value;
      }
    }

    public string fal_mnota
    {
      get
      {
        return this._fal_mnota;
      }
      set
      {
        this._fal_mnota = value;
      }
    }

    public CallerFalsa()
    {
      this.InitClass();
    }

    public CallerFalsa(int Id, string Name, int fal_iidcuenta, Decimal fal_nmargen, Decimal fal_nmeses, string fal_mnota)
    {
      this.Id = Id;
      this.Name = Name;
      this._fal_iidcuenta = fal_iidcuenta;
      this._fal_nmargen = fal_nmargen;
      this._fal_nmeses = fal_nmeses;
      this._fal_mnota = fal_mnota;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3002, "Falsa");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleFalsa simpleFalsa = new SimpleFalsa();
      simpleFalsa.Id = this.Id;
      simpleFalsa.Name = this.Name;
      simpleFalsa.fal_iidcuenta = this._fal_iidcuenta;
      simpleFalsa.fal_nmargen = this._fal_nmargen;
      simpleFalsa.fal_nmeses = this._fal_nmeses;
      simpleFalsa.fal_mnota = this._fal_mnota;
      return (SimpleBaseObject) simpleFalsa;
    }

    public void SetSimpleObject(SimpleFalsa Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._fal_iidcuenta = Simple.fal_iidcuenta;
      this._fal_nmargen = Simple.fal_nmargen;
      this._fal_nmeses = Simple.fal_nmeses;
      this._fal_mnota = Simple.fal_mnota;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalFalsa(SqlConfig, UserId, (SimpleFalsa) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("fal_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("fal_nmargen", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("fal_nmeses", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("fal_mnota", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["fal_iidcuenta"] = (object) this._fal_iidcuenta;
      row["fal_nmargen"] = (object) this._fal_nmargen;
      row["fal_nmeses"] = (object) this._fal_nmeses;
      row["fal_mnota"] = (object) this._fal_mnota;
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
