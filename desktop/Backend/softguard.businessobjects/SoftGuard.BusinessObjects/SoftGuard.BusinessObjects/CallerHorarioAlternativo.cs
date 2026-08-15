// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerHorarioAlternativo
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
  public class CallerHorarioAlternativo : CallerObject
  {
    private int _alt_iidcuenta;
    private Decimal _alt_ndiaapertura;
    private string _alt_choraapertura;
    private Decimal _alt_ndiacierre;
    private string _alt_choracierre;

    public int alt_iidcuenta
    {
      get
      {
        return this._alt_iidcuenta;
      }
      set
      {
        this._alt_iidcuenta = value;
      }
    }

    public Decimal alt_ndiaapertura
    {
      get
      {
        return this._alt_ndiaapertura;
      }
      set
      {
        this._alt_ndiaapertura = value;
      }
    }

    public string alt_choraapertura
    {
      get
      {
        return this._alt_choraapertura;
      }
      set
      {
        this._alt_choraapertura = value;
      }
    }

    public Decimal alt_ndiacierre
    {
      get
      {
        return this._alt_ndiacierre;
      }
      set
      {
        this._alt_ndiacierre = value;
      }
    }

    public string alt_choracierre
    {
      get
      {
        return this._alt_choracierre;
      }
      set
      {
        this._alt_choracierre = value;
      }
    }

    public CallerHorarioAlternativo()
    {
      this.InitClass();
    }

    public CallerHorarioAlternativo(int Id, string Name, int alt_iidcuenta, Decimal alt_ndiaapertura, string alt_choraapertura, Decimal alt_ndiacierre, string alt_choracierre)
    {
      this.Id = Id;
      this.Name = Name;
      this._alt_iidcuenta = alt_iidcuenta;
      this._alt_ndiaapertura = alt_ndiaapertura;
      this._alt_choraapertura = alt_choraapertura;
      this._alt_ndiacierre = alt_ndiacierre;
      this._alt_choracierre = alt_choracierre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3004, "HorarioAlternativo");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleHorarioAlternativo horarioAlternativo = new SimpleHorarioAlternativo();
      horarioAlternativo.Id = this.Id;
      horarioAlternativo.Name = this.Name;
      horarioAlternativo.alt_iidcuenta = this._alt_iidcuenta;
      horarioAlternativo.alt_ndiaapertura = this._alt_ndiaapertura;
      horarioAlternativo.alt_choraapertura = this._alt_choraapertura;
      horarioAlternativo.alt_ndiacierre = this._alt_ndiacierre;
      horarioAlternativo.alt_choracierre = this._alt_choracierre;
      return (SimpleBaseObject) horarioAlternativo;
    }

    public void SetSimpleObject(SimpleHorarioAlternativo Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._alt_iidcuenta = Simple.alt_iidcuenta;
      this._alt_ndiaapertura = Simple.alt_ndiaapertura;
      this._alt_choraapertura = Simple.alt_choraapertura;
      this._alt_ndiacierre = Simple.alt_ndiacierre;
      this._alt_choracierre = Simple.alt_choracierre;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalHorarioAlternativo(SqlConfig, UserId, (SimpleHorarioAlternativo) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("alt_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("alt_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("alt_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("alt_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("alt_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["alt_iidcuenta"] = (object) this._alt_iidcuenta;
      row["alt_ndiaapertura"] = (object) this._alt_ndiaapertura;
      row["alt_choraapertura"] = (object) this._alt_choraapertura;
      row["alt_ndiacierre"] = (object) this._alt_ndiacierre;
      row["alt_choracierre"] = (object) this._alt_choracierre;
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
