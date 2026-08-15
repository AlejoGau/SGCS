// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerHorario
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
  public class CallerHorario : CallerObject
  {
    private int _hor_iidcuenta;
    private Decimal _hor_ndiaapertura;
    private string _hor_choraapertura;
    private Decimal _hor_ndiacierre;
    private string _hor_choracierre;

    public int hor_iidcuenta
    {
      get
      {
        return this._hor_iidcuenta;
      }
      set
      {
        this._hor_iidcuenta = value;
      }
    }

    public Decimal hor_ndiaapertura
    {
      get
      {
        return this._hor_ndiaapertura;
      }
      set
      {
        this._hor_ndiaapertura = value;
      }
    }

    public string hor_choraapertura
    {
      get
      {
        return this._hor_choraapertura;
      }
      set
      {
        this._hor_choraapertura = value;
      }
    }

    public Decimal hor_ndiacierre
    {
      get
      {
        return this._hor_ndiacierre;
      }
      set
      {
        this._hor_ndiacierre = value;
      }
    }

    public string hor_choracierre
    {
      get
      {
        return this._hor_choracierre;
      }
      set
      {
        this._hor_choracierre = value;
      }
    }

    public CallerHorario()
    {
      this.InitClass();
    }

    public CallerHorario(int Id, string Name, int hor_iidcuenta, Decimal hor_ndiaapertura, string hor_choraapertura, Decimal hor_ndiacierre, string hor_choracierre)
    {
      this.Id = Id;
      this.Name = Name;
      this._hor_iidcuenta = hor_iidcuenta;
      this._hor_ndiaapertura = hor_ndiaapertura;
      this._hor_choraapertura = hor_choraapertura;
      this._hor_ndiacierre = hor_ndiacierre;
      this._hor_choracierre = hor_choracierre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3003, "Horario");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleHorario simpleHorario = new SimpleHorario();
      simpleHorario.Id = this.Id;
      simpleHorario.Name = this.Name;
      simpleHorario.hor_iidcuenta = this._hor_iidcuenta;
      simpleHorario.hor_ndiaapertura = this._hor_ndiaapertura;
      simpleHorario.hor_choraapertura = this._hor_choraapertura;
      simpleHorario.hor_ndiacierre = this._hor_ndiacierre;
      simpleHorario.hor_choracierre = this._hor_choracierre;
      return (SimpleBaseObject) simpleHorario;
    }

    public void SetSimpleObject(SimpleHorario Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._hor_iidcuenta = Simple.hor_iidcuenta;
      this._hor_ndiaapertura = Simple.hor_ndiaapertura;
      this._hor_choraapertura = Simple.hor_choraapertura;
      this._hor_ndiacierre = Simple.hor_ndiacierre;
      this._hor_choracierre = Simple.hor_choracierre;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalHorario(SqlConfig, UserId, (SimpleHorario) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("hor_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("hor_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("hor_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("hor_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("hor_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["hor_iidcuenta"] = (object) this._hor_iidcuenta;
      row["hor_ndiaapertura"] = (object) this._hor_ndiaapertura;
      row["hor_choraapertura"] = (object) this._hor_choraapertura;
      row["hor_ndiacierre"] = (object) this._hor_ndiacierre;
      row["hor_choracierre"] = (object) this._hor_choracierre;
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
