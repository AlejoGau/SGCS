// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerHorarioTolerancia
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
  public class CallerHorarioTolerancia : CallerObject
  {
    private int _tol_iidcuenta;
    private int _tol_naperturaantes;
    private string _tol_caperturaantesalarma;
    private int _tol_naperturadespues;
    private string _tol_caperturadespuesalarma;
    private int _tol_ncierreantes;
    private string _tol_ccierreantesalarma;
    private int _tol_ncierredespues;
    private string _tol_ccierredespuesalarma;
    private Decimal _tol_nnyo;
    private Decimal _tol_nnyc;
    private Decimal _tol_nControl;
    private Decimal _tol_nModo;
    private Decimal _tol_nAPNYO;
    private Decimal _tol_nAPNYC;
    private DateTime? _tol_dVacacionesHasta;
    private DateTime? _tol_dVacacionesDesde;

    public int tol_iidcuenta
    {
      get
      {
        return this._tol_iidcuenta;
      }
      set
      {
        this._tol_iidcuenta = value;
      }
    }

    public int tol_naperturaantes
    {
      get
      {
        return this._tol_naperturaantes;
      }
      set
      {
        this._tol_naperturaantes = value;
      }
    }

    public string tol_caperturaantesalarma
    {
      get
      {
        return this._tol_caperturaantesalarma;
      }
      set
      {
        this._tol_caperturaantesalarma = value;
      }
    }

    public int tol_naperturadespues
    {
      get
      {
        return this._tol_naperturadespues;
      }
      set
      {
        this._tol_naperturadespues = value;
      }
    }

    public string tol_caperturadespuesalarma
    {
      get
      {
        return this._tol_caperturadespuesalarma;
      }
      set
      {
        this._tol_caperturadespuesalarma = value;
      }
    }

    public int tol_ncierreantes
    {
      get
      {
        return this._tol_ncierreantes;
      }
      set
      {
        this._tol_ncierreantes = value;
      }
    }

    public string tol_ccierreantesalarma
    {
      get
      {
        return this._tol_ccierreantesalarma;
      }
      set
      {
        this._tol_ccierreantesalarma = value;
      }
    }

    public int tol_ncierredespues
    {
      get
      {
        return this._tol_ncierredespues;
      }
      set
      {
        this._tol_ncierredespues = value;
      }
    }

    public string tol_ccierredespuesalarma
    {
      get
      {
        return this._tol_ccierredespuesalarma;
      }
      set
      {
        this._tol_ccierredespuesalarma = value;
      }
    }

    public Decimal tol_nnyo
    {
      get
      {
        return this._tol_nnyo;
      }
      set
      {
        this._tol_nnyo = value;
      }
    }

    public Decimal tol_nnyc
    {
      get
      {
        return this._tol_nnyc;
      }
      set
      {
        this._tol_nnyc = value;
      }
    }

    public Decimal tol_nControl
    {
      get
      {
        return this._tol_nControl;
      }
      set
      {
        this._tol_nControl = value;
      }
    }

    public Decimal tol_nModo
    {
      get
      {
        return this._tol_nModo;
      }
      set
      {
        this._tol_nModo = value;
      }
    }

    public Decimal tol_nAPNYO
    {
      get
      {
        return this._tol_nAPNYO;
      }
      set
      {
        this._tol_nAPNYO = value;
      }
    }

    public Decimal tol_nAPNYC
    {
      get
      {
        return this._tol_nAPNYC;
      }
      set
      {
        this._tol_nAPNYC = value;
      }
    }

    public DateTime? tol_dVacacionesHasta
    {
      get
      {
        return this._tol_dVacacionesHasta;
      }
      set
      {
        this._tol_dVacacionesHasta = value;
      }
    }

    public DateTime? tol_dVacacionesDesde
    {
      get
      {
        return this._tol_dVacacionesDesde;
      }
      set
      {
        this._tol_dVacacionesDesde = value;
      }
    }

    public CallerHorarioTolerancia()
    {
      this.InitClass();
    }

    public CallerHorarioTolerancia(int Id, string Name, int tol_iidcuenta, int tol_naperturaantes, string tol_caperturaantesalarma, int tol_naperturadespues, string tol_caperturadespuesalarma, int tol_ncierreantes, string tol_ccierreantesalarma, int tol_ncierredespues, string tol_ccierredespuesalarma, Decimal tol_nnyo, Decimal tol_nnyc, Decimal tol_nControl, Decimal tol_nModo, Decimal tol_nAPNYO, Decimal tol_nAPNYC, DateTime? tol_dVacacionesHasta, DateTime? tol_dVacacionesDesde)
    {
      this.Id = Id;
      this.Name = Name;
      this._tol_iidcuenta = tol_iidcuenta;
      this._tol_naperturaantes = tol_naperturaantes;
      this._tol_caperturaantesalarma = tol_caperturaantesalarma;
      this._tol_naperturadespues = tol_naperturadespues;
      this._tol_caperturadespuesalarma = tol_caperturadespuesalarma;
      this._tol_ncierreantes = tol_ncierreantes;
      this._tol_ccierreantesalarma = tol_ccierreantesalarma;
      this._tol_ncierredespues = tol_ncierredespues;
      this._tol_ccierredespuesalarma = tol_ccierredespuesalarma;
      this._tol_nnyo = tol_nnyo;
      this._tol_nnyc = tol_nnyc;
      this._tol_nControl = tol_nControl;
      this._tol_nModo = tol_nModo;
      this._tol_nAPNYO = tol_nAPNYO;
      this._tol_nAPNYC = tol_nAPNYC;
      this._tol_dVacacionesHasta = tol_dVacacionesHasta;
      this._tol_dVacacionesDesde = tol_dVacacionesDesde;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3008, "HorarioTolerancia");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleHorarioTolerancia horarioTolerancia = new SimpleHorarioTolerancia();
      horarioTolerancia.Id = this.Id;
      horarioTolerancia.Name = this.Name;
      horarioTolerancia.tol_iidcuenta = this._tol_iidcuenta;
      horarioTolerancia.tol_naperturaantes = this._tol_naperturaantes;
      horarioTolerancia.tol_caperturaantesalarma = this._tol_caperturaantesalarma;
      horarioTolerancia.tol_naperturadespues = this._tol_naperturadespues;
      horarioTolerancia.tol_caperturadespuesalarma = this._tol_caperturadespuesalarma;
      horarioTolerancia.tol_ncierreantes = this._tol_ncierreantes;
      horarioTolerancia.tol_ccierreantesalarma = this._tol_ccierreantesalarma;
      horarioTolerancia.tol_ncierredespues = this._tol_ncierredespues;
      horarioTolerancia.tol_ccierredespuesalarma = this._tol_ccierredespuesalarma;
      horarioTolerancia.tol_nnyo = this._tol_nnyo;
      horarioTolerancia.tol_nnyc = this._tol_nnyc;
      horarioTolerancia.tol_nControl = this._tol_nControl;
      horarioTolerancia.tol_nModo = this._tol_nModo;
      horarioTolerancia.tol_nAPNYO = this._tol_nAPNYO;
      horarioTolerancia.tol_nAPNYC = this._tol_nAPNYC;
      horarioTolerancia.tol_dVacacionesHasta = this._tol_dVacacionesHasta;
      horarioTolerancia.tol_dVacacionesDesde = this._tol_dVacacionesDesde;
      return (SimpleBaseObject) horarioTolerancia;
    }

    public void SetSimpleObject(SimpleHorarioTolerancia Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tol_iidcuenta = Simple.tol_iidcuenta;
      this._tol_naperturaantes = Simple.tol_naperturaantes;
      this._tol_caperturaantesalarma = Simple.tol_caperturaantesalarma;
      this._tol_naperturadespues = Simple.tol_naperturadespues;
      this._tol_caperturadespuesalarma = Simple.tol_caperturadespuesalarma;
      this._tol_ncierreantes = Simple.tol_ncierreantes;
      this._tol_ccierreantesalarma = Simple.tol_ccierreantesalarma;
      this._tol_ncierredespues = Simple.tol_ncierredespues;
      this._tol_ccierredespuesalarma = Simple.tol_ccierredespuesalarma;
      this._tol_nnyo = Simple.tol_nnyo;
      this._tol_nnyc = Simple.tol_nnyc;
      this._tol_nControl = Simple.tol_nControl;
      this._tol_nModo = Simple.tol_nModo;
      this._tol_nAPNYO = Simple.tol_nAPNYO;
      this._tol_nAPNYC = Simple.tol_nAPNYC;
      this._tol_dVacacionesHasta = Simple.tol_dVacacionesHasta;
      this._tol_dVacacionesDesde = Simple.tol_dVacacionesDesde;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalHorarioTolerancia(SqlConfig, UserId, (SimpleHorarioTolerancia) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_naperturaantes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_caperturaantesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_naperturadespues", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_caperturadespuesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_ncierreantes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_ccierreantesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_ncierredespues", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_ccierredespuesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_nnyo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nnyc", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nControl", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nModo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nAPNYO", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nAPNYC", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_dVacacionesHasta", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("tol_dVacacionesDesde", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tol_iidcuenta"] = (object) this._tol_iidcuenta;
      row["tol_naperturaantes"] = (object) this._tol_naperturaantes;
      row["tol_caperturaantesalarma"] = (object) this._tol_caperturaantesalarma;
      row["tol_naperturadespues"] = (object) this._tol_naperturadespues;
      row["tol_caperturadespuesalarma"] = (object) this._tol_caperturadespuesalarma;
      row["tol_ncierreantes"] = (object) this._tol_ncierreantes;
      row["tol_ccierreantesalarma"] = (object) this._tol_ccierreantesalarma;
      row["tol_ncierredespues"] = (object) this._tol_ncierredespues;
      row["tol_ccierredespuesalarma"] = (object) this._tol_ccierredespuesalarma;
      row["tol_nnyo"] = (object) this._tol_nnyo;
      row["tol_nnyc"] = (object) this._tol_nnyc;
      row["tol_nControl"] = (object) this._tol_nControl;
      row["tol_nModo"] = (object) this._tol_nModo;
      row["tol_nAPNYO"] = (object) this._tol_nAPNYO;
      row["tol_nAPNYC"] = (object) this._tol_nAPNYC;
      row["tol_dVacacionesHasta"] = (object) this._tol_dVacacionesHasta;
      row["tol_dVacacionesDesde"] = (object) this._tol_dVacacionesDesde;
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
