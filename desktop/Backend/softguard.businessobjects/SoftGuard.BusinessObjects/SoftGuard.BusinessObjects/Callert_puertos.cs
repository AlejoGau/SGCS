// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_puertos
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
  public class Callert_puertos : CallerObject
  {
    private int _pue_icodigo;
    private string _pue_cdescripcion;
    private int _pue_ireceptor;
    private Decimal _pue_npuerto;
    private Decimal _pue_ndatabits;
    private Decimal _pue_nstopbits;
    private Decimal _pue_nbaudrate;
    private Decimal _pue_nparity;
    private Decimal _pue_nflowctrl;
    private Decimal _pue_nbufferin;
    private Decimal _pue_nbufferout;
    private Decimal _pue_nrts;
    private Decimal _pue_ndtr;
    private Decimal _pue_nestado;
    private Decimal _pue_crespondeack;
    private int _pue_itiempoinactividad;
    private Decimal _pue_cresetxhb;

    public int pue_icodigo
    {
      get
      {
        return this._pue_icodigo;
      }
      set
      {
        this._pue_icodigo = value;
      }
    }

    public string pue_cdescripcion
    {
      get
      {
        return this._pue_cdescripcion;
      }
      set
      {
        this._pue_cdescripcion = value;
      }
    }

    public int pue_ireceptor
    {
      get
      {
        return this._pue_ireceptor;
      }
      set
      {
        this._pue_ireceptor = value;
      }
    }

    public Decimal pue_npuerto
    {
      get
      {
        return this._pue_npuerto;
      }
      set
      {
        this._pue_npuerto = value;
      }
    }

    public Decimal pue_ndatabits
    {
      get
      {
        return this._pue_ndatabits;
      }
      set
      {
        this._pue_ndatabits = value;
      }
    }

    public Decimal pue_nstopbits
    {
      get
      {
        return this._pue_nstopbits;
      }
      set
      {
        this._pue_nstopbits = value;
      }
    }

    public Decimal pue_nbaudrate
    {
      get
      {
        return this._pue_nbaudrate;
      }
      set
      {
        this._pue_nbaudrate = value;
      }
    }

    public Decimal pue_nparity
    {
      get
      {
        return this._pue_nparity;
      }
      set
      {
        this._pue_nparity = value;
      }
    }

    public Decimal pue_nflowctrl
    {
      get
      {
        return this._pue_nflowctrl;
      }
      set
      {
        this._pue_nflowctrl = value;
      }
    }

    public Decimal pue_nbufferin
    {
      get
      {
        return this._pue_nbufferin;
      }
      set
      {
        this._pue_nbufferin = value;
      }
    }

    public Decimal pue_nbufferout
    {
      get
      {
        return this._pue_nbufferout;
      }
      set
      {
        this._pue_nbufferout = value;
      }
    }

    public Decimal pue_nrts
    {
      get
      {
        return this._pue_nrts;
      }
      set
      {
        this._pue_nrts = value;
      }
    }

    public Decimal pue_ndtr
    {
      get
      {
        return this._pue_ndtr;
      }
      set
      {
        this._pue_ndtr = value;
      }
    }

    public Decimal pue_nestado
    {
      get
      {
        return this._pue_nestado;
      }
      set
      {
        this._pue_nestado = value;
      }
    }

    public Decimal pue_crespondeack
    {
      get
      {
        return this._pue_crespondeack;
      }
      set
      {
        this._pue_crespondeack = value;
      }
    }

    public int pue_itiempoinactividad
    {
      get
      {
        return this._pue_itiempoinactividad;
      }
      set
      {
        this._pue_itiempoinactividad = value;
      }
    }

    public Decimal pue_cresetxhb
    {
      get
      {
        return this._pue_cresetxhb;
      }
      set
      {
        this._pue_cresetxhb = value;
      }
    }

    public Callert_puertos()
    {
      this.InitClass();
    }

    public Callert_puertos(int Id, string Name, int pue_icodigo, string pue_cdescripcion, int pue_ireceptor, Decimal pue_npuerto, Decimal pue_ndatabits, Decimal pue_nstopbits, Decimal pue_nbaudrate, Decimal pue_nparity, Decimal pue_nflowctrl, Decimal pue_nbufferin, Decimal pue_nbufferout, Decimal pue_nrts, Decimal pue_ndtr, Decimal pue_nestado, Decimal pue_crespondeack, int pue_itiempoinactividad, Decimal pue_cresetxhb)
    {
      this.Id = Id;
      this.Name = Name;
      this._pue_icodigo = pue_icodigo;
      this._pue_cdescripcion = pue_cdescripcion;
      this._pue_ireceptor = pue_ireceptor;
      this._pue_npuerto = pue_npuerto;
      this._pue_ndatabits = pue_ndatabits;
      this._pue_nstopbits = pue_nstopbits;
      this._pue_nbaudrate = pue_nbaudrate;
      this._pue_nparity = pue_nparity;
      this._pue_nflowctrl = pue_nflowctrl;
      this._pue_nbufferin = pue_nbufferin;
      this._pue_nbufferout = pue_nbufferout;
      this._pue_nrts = pue_nrts;
      this._pue_ndtr = pue_ndtr;
      this._pue_nestado = pue_nestado;
      this._pue_crespondeack = pue_crespondeack;
      this._pue_itiempoinactividad = pue_itiempoinactividad;
      this._pue_cresetxhb = pue_cresetxhb;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3091, "t_puertos");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_puertos simpletPuertos = new Simplet_puertos();
      simpletPuertos.Id = this.Id;
      simpletPuertos.Name = this.Name;
      simpletPuertos.pue_icodigo = this._pue_icodigo;
      simpletPuertos.pue_cdescripcion = this._pue_cdescripcion;
      simpletPuertos.pue_ireceptor = this._pue_ireceptor;
      simpletPuertos.pue_npuerto = this._pue_npuerto;
      simpletPuertos.pue_ndatabits = this._pue_ndatabits;
      simpletPuertos.pue_nstopbits = this._pue_nstopbits;
      simpletPuertos.pue_nbaudrate = this._pue_nbaudrate;
      simpletPuertos.pue_nparity = this._pue_nparity;
      simpletPuertos.pue_nflowctrl = this._pue_nflowctrl;
      simpletPuertos.pue_nbufferin = this._pue_nbufferin;
      simpletPuertos.pue_nbufferout = this._pue_nbufferout;
      simpletPuertos.pue_nrts = this._pue_nrts;
      simpletPuertos.pue_ndtr = this._pue_ndtr;
      simpletPuertos.pue_nestado = this._pue_nestado;
      simpletPuertos.pue_crespondeack = this._pue_crespondeack;
      simpletPuertos.pue_itiempoinactividad = this._pue_itiempoinactividad;
      simpletPuertos.pue_cresetxhb = this._pue_cresetxhb;
      return (SimpleBaseObject) simpletPuertos;
    }

    public void SetSimpleObject(Simplet_puertos Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._pue_icodigo = Simple.pue_icodigo;
      this._pue_cdescripcion = Simple.pue_cdescripcion;
      this._pue_ireceptor = Simple.pue_ireceptor;
      this._pue_npuerto = Simple.pue_npuerto;
      this._pue_ndatabits = Simple.pue_ndatabits;
      this._pue_nstopbits = Simple.pue_nstopbits;
      this._pue_nbaudrate = Simple.pue_nbaudrate;
      this._pue_nparity = Simple.pue_nparity;
      this._pue_nflowctrl = Simple.pue_nflowctrl;
      this._pue_nbufferin = Simple.pue_nbufferin;
      this._pue_nbufferout = Simple.pue_nbufferout;
      this._pue_nrts = Simple.pue_nrts;
      this._pue_ndtr = Simple.pue_ndtr;
      this._pue_nestado = Simple.pue_nestado;
      this._pue_crespondeack = Simple.pue_crespondeack;
      this._pue_itiempoinactividad = Simple.pue_itiempoinactividad;
      this._pue_cresetxhb = Simple.pue_cresetxhb;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_puertos(SqlConfig, UserId, (Simplet_puertos) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pue_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pue_ireceptor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_npuerto", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_ndatabits", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nstopbits", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbaudrate", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nparity", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nflowctrl", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbufferin", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbufferout", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nrts", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_ndtr", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_crespondeack", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_itiempoinactividad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_cresetxhb", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pue_icodigo"] = (object) this._pue_icodigo;
      row["pue_cdescripcion"] = (object) this._pue_cdescripcion;
      row["pue_ireceptor"] = (object) this._pue_ireceptor;
      row["pue_npuerto"] = (object) this._pue_npuerto;
      row["pue_ndatabits"] = (object) this._pue_ndatabits;
      row["pue_nstopbits"] = (object) this._pue_nstopbits;
      row["pue_nbaudrate"] = (object) this._pue_nbaudrate;
      row["pue_nparity"] = (object) this._pue_nparity;
      row["pue_nflowctrl"] = (object) this._pue_nflowctrl;
      row["pue_nbufferin"] = (object) this._pue_nbufferin;
      row["pue_nbufferout"] = (object) this._pue_nbufferout;
      row["pue_nrts"] = (object) this._pue_nrts;
      row["pue_ndtr"] = (object) this._pue_ndtr;
      row["pue_nestado"] = (object) this._pue_nestado;
      row["pue_crespondeack"] = (object) this._pue_crespondeack;
      row["pue_itiempoinactividad"] = (object) this._pue_itiempoinactividad;
      row["pue_cresetxhb"] = (object) this._pue_cresetxhb;
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
