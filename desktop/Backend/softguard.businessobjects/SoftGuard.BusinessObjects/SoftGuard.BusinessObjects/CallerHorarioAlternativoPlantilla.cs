// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerHorarioAlternativoPlantilla
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
  public class CallerHorarioAlternativoPlantilla : CallerObject
  {
    private int _Alt_iid;
    private Decimal _Alt_ndiaapertura;
    private string _Alt_choraapertura;
    private Decimal _Alt_ndiacierre;
    private string _Alt_choracierre;

    public int Alt_iid
    {
      get
      {
        return this._Alt_iid;
      }
      set
      {
        this._Alt_iid = value;
      }
    }

    public Decimal Alt_ndiaapertura
    {
      get
      {
        return this._Alt_ndiaapertura;
      }
      set
      {
        this._Alt_ndiaapertura = value;
      }
    }

    public string Alt_choraapertura
    {
      get
      {
        return this._Alt_choraapertura;
      }
      set
      {
        this._Alt_choraapertura = value;
      }
    }

    public Decimal Alt_ndiacierre
    {
      get
      {
        return this._Alt_ndiacierre;
      }
      set
      {
        this._Alt_ndiacierre = value;
      }
    }

    public string Alt_choracierre
    {
      get
      {
        return this._Alt_choracierre;
      }
      set
      {
        this._Alt_choracierre = value;
      }
    }

    public CallerHorarioAlternativoPlantilla()
    {
      this.InitClass();
    }

    public CallerHorarioAlternativoPlantilla(int Id, string Name, int Alt_iid, Decimal Alt_ndiaapertura, string Alt_choraapertura, Decimal Alt_ndiacierre, string Alt_choracierre)
    {
      this.Id = Id;
      this.Name = Name;
      this._Alt_iid = Alt_iid;
      this._Alt_ndiaapertura = Alt_ndiaapertura;
      this._Alt_choraapertura = Alt_choraapertura;
      this._Alt_ndiacierre = Alt_ndiacierre;
      this._Alt_choracierre = Alt_choracierre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3005, "HorarioAlternativoPlantilla");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleHorarioAlternativoPlantilla alternativoPlantilla = new SimpleHorarioAlternativoPlantilla();
      alternativoPlantilla.Id = this.Id;
      alternativoPlantilla.Name = this.Name;
      alternativoPlantilla.Alt_iid = this._Alt_iid;
      alternativoPlantilla.Alt_ndiaapertura = this._Alt_ndiaapertura;
      alternativoPlantilla.Alt_choraapertura = this._Alt_choraapertura;
      alternativoPlantilla.Alt_ndiacierre = this._Alt_ndiacierre;
      alternativoPlantilla.Alt_choracierre = this._Alt_choracierre;
      return (SimpleBaseObject) alternativoPlantilla;
    }

    public void SetSimpleObject(SimpleHorarioAlternativoPlantilla Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Alt_iid = Simple.Alt_iid;
      this._Alt_ndiaapertura = Simple.Alt_ndiaapertura;
      this._Alt_choraapertura = Simple.Alt_choraapertura;
      this._Alt_ndiacierre = Simple.Alt_ndiacierre;
      this._Alt_choracierre = Simple.Alt_choracierre;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalHorarioAlternativoPlantilla(SqlConfig, UserId, (SimpleHorarioAlternativoPlantilla) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Alt_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Alt_ndiaapertura", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("Alt_choraapertura", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Alt_ndiacierre", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("Alt_choracierre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Alt_iid"] = (object) this._Alt_iid;
      row["Alt_ndiaapertura"] = (object) this._Alt_ndiaapertura;
      row["Alt_choraapertura"] = (object) this._Alt_choraapertura;
      row["Alt_ndiacierre"] = (object) this._Alt_ndiacierre;
      row["Alt_choracierre"] = (object) this._Alt_choracierre;
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
