// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_checkPoints_VC
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
  public class Callert_checkPoints_VC : CallerObject
  {
    private string _chp_cReference;
    private string _chp_cZona;
    private int _chp_iCuenta;
    private float _chp_rLatitud;
    private float _chp_rLongitud;
    private Decimal _chp_nTipo;
    private int _chp_iTolerancia;

    public string chp_cReference
    {
      get
      {
        return this._chp_cReference;
      }
      set
      {
        this._chp_cReference = value;
      }
    }

    public string chp_cZona
    {
      get
      {
        return this._chp_cZona;
      }
      set
      {
        this._chp_cZona = value;
      }
    }

    public int chp_iCuenta
    {
      get
      {
        return this._chp_iCuenta;
      }
      set
      {
        this._chp_iCuenta = value;
      }
    }

    public float chp_rLatitud
    {
      get
      {
        return this._chp_rLatitud;
      }
      set
      {
        this._chp_rLatitud = value;
      }
    }

    public float chp_rLongitud
    {
      get
      {
        return this._chp_rLongitud;
      }
      set
      {
        this._chp_rLongitud = value;
      }
    }

    public Decimal chp_nTipo
    {
      get
      {
        return this._chp_nTipo;
      }
      set
      {
        this._chp_nTipo = value;
      }
    }

    public int chp_iTolerancia
    {
      get
      {
        return this._chp_iTolerancia;
      }
      set
      {
        this._chp_iTolerancia = value;
      }
    }

    public Callert_checkPoints_VC()
    {
      this.InitClass();
    }

    public Callert_checkPoints_VC(int Id, string Name, string chp_cReference, string chp_cZona, int chp_iCuenta, float chp_rLatitud, float chp_rLongitud, Decimal chp_nTipo, int chp_iTolerancia)
    {
      this.Id = Id;
      this.Name = Name;
      this._chp_cReference = chp_cReference;
      this._chp_cZona = chp_cZona;
      this._chp_iCuenta = chp_iCuenta;
      this._chp_rLatitud = chp_rLatitud;
      this._chp_rLongitud = chp_rLongitud;
      this._chp_nTipo = chp_nTipo;
      this._chp_iTolerancia = chp_iTolerancia;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3117, "t_checkPoints_VC");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_checkPoints_VC simpletCheckPointsVc = new Simplet_checkPoints_VC();
      simpletCheckPointsVc.Id = this.Id;
      simpletCheckPointsVc.Name = this.Name;
      simpletCheckPointsVc.chp_cReference = this._chp_cReference;
      simpletCheckPointsVc.chp_cZona = this._chp_cZona;
      simpletCheckPointsVc.chp_iCuenta = this._chp_iCuenta;
      simpletCheckPointsVc.chp_rLatitud = this._chp_rLatitud;
      simpletCheckPointsVc.chp_rLongitud = this._chp_rLongitud;
      simpletCheckPointsVc.chp_nTipo = this._chp_nTipo;
      simpletCheckPointsVc.chp_iTolerancia = this._chp_iTolerancia;
      return (SimpleBaseObject) simpletCheckPointsVc;
    }

    public void SetSimpleObject(Simplet_checkPoints_VC Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._chp_cReference = Simple.chp_cReference;
      this._chp_cZona = Simple.chp_cZona;
      this._chp_iCuenta = Simple.chp_iCuenta;
      this._chp_rLatitud = Simple.chp_rLatitud;
      this._chp_rLongitud = Simple.chp_rLongitud;
      this._chp_nTipo = Simple.chp_nTipo;
      this._chp_iTolerancia = Simple.chp_iTolerancia;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_checkPoints_VC(SqlConfig, UserId, (Simplet_checkPoints_VC) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_cReference", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_cZona", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_iCuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("chp_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("chp_rLongitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("chp_nTipo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("chp_iTolerancia", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["chp_cReference"] = (object) this._chp_cReference;
      row["chp_cZona"] = (object) this._chp_cZona;
      row["chp_iCuenta"] = (object) this._chp_iCuenta;
      row["chp_rLatitud"] = (object) this._chp_rLatitud;
      row["chp_rLongitud"] = (object) this._chp_rLongitud;
      row["chp_nTipo"] = (object) this._chp_nTipo;
      row["chp_iTolerancia"] = (object) this._chp_iTolerancia;
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
