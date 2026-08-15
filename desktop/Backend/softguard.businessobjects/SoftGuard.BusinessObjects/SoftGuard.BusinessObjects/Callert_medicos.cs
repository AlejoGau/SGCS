// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_medicos
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
  public class Callert_medicos : CallerObject
  {
    private string _med_ccodigo;
    private string _med_cnombre;
    private string _med_ccalle;
    private string _med_clocalidad;
    private string _med_cprovincia;
    private string _med_ccodigopostal;
    private string _med_ctelefono;
    private string _med_cfax;
    private Decimal _med_ntipo;

    public string med_ccodigo
    {
      get
      {
        return this._med_ccodigo;
      }
      set
      {
        this._med_ccodigo = value;
      }
    }

    public string med_cnombre
    {
      get
      {
        return this._med_cnombre;
      }
      set
      {
        this._med_cnombre = value;
      }
    }

    public string med_ccalle
    {
      get
      {
        return this._med_ccalle;
      }
      set
      {
        this._med_ccalle = value;
      }
    }

    public string med_clocalidad
    {
      get
      {
        return this._med_clocalidad;
      }
      set
      {
        this._med_clocalidad = value;
      }
    }

    public string med_cprovincia
    {
      get
      {
        return this._med_cprovincia;
      }
      set
      {
        this._med_cprovincia = value;
      }
    }

    public string med_ccodigopostal
    {
      get
      {
        return this._med_ccodigopostal;
      }
      set
      {
        this._med_ccodigopostal = value;
      }
    }

    public string med_ctelefono
    {
      get
      {
        return this._med_ctelefono;
      }
      set
      {
        this._med_ctelefono = value;
      }
    }

    public string med_cfax
    {
      get
      {
        return this._med_cfax;
      }
      set
      {
        this._med_cfax = value;
      }
    }

    public Decimal med_ntipo
    {
      get
      {
        return this._med_ntipo;
      }
      set
      {
        this._med_ntipo = value;
      }
    }

    public Callert_medicos()
    {
      this.InitClass();
    }

    public Callert_medicos(int Id, string Name, string med_ccodigo, string med_cnombre, string med_ccalle, string med_clocalidad, string med_cprovincia, string med_ccodigopostal, string med_ctelefono, string med_cfax, Decimal med_ntipo)
    {
      this.Id = Id;
      this.Name = Name;
      this._med_ccodigo = med_ccodigo;
      this._med_cnombre = med_cnombre;
      this._med_ccalle = med_ccalle;
      this._med_clocalidad = med_clocalidad;
      this._med_cprovincia = med_cprovincia;
      this._med_ccodigopostal = med_ccodigopostal;
      this._med_ctelefono = med_ctelefono;
      this._med_cfax = med_cfax;
      this._med_ntipo = med_ntipo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3073, "t_medicos");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_medicos simpletMedicos = new Simplet_medicos();
      simpletMedicos.Id = this.Id;
      simpletMedicos.Name = this.Name;
      simpletMedicos.med_ccodigo = this._med_ccodigo;
      simpletMedicos.med_cnombre = this._med_cnombre;
      simpletMedicos.med_ccalle = this._med_ccalle;
      simpletMedicos.med_clocalidad = this._med_clocalidad;
      simpletMedicos.med_cprovincia = this._med_cprovincia;
      simpletMedicos.med_ccodigopostal = this._med_ccodigopostal;
      simpletMedicos.med_ctelefono = this._med_ctelefono;
      simpletMedicos.med_cfax = this._med_cfax;
      simpletMedicos.med_ntipo = this._med_ntipo;
      return (SimpleBaseObject) simpletMedicos;
    }

    public void SetSimpleObject(Simplet_medicos Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._med_ccodigo = Simple.med_ccodigo;
      this._med_cnombre = Simple.med_cnombre;
      this._med_ccalle = Simple.med_ccalle;
      this._med_clocalidad = Simple.med_clocalidad;
      this._med_cprovincia = Simple.med_cprovincia;
      this._med_ccodigopostal = Simple.med_ccodigopostal;
      this._med_ctelefono = Simple.med_ctelefono;
      this._med_cfax = Simple.med_cfax;
      this._med_ntipo = Simple.med_ntipo;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_medicos(SqlConfig, UserId, (Simplet_medicos) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccalle", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_clocalidad", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cprovincia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccodigopostal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cfax", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ntipo", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["med_ccodigo"] = (object) this._med_ccodigo;
      row["med_cnombre"] = (object) this._med_cnombre;
      row["med_ccalle"] = (object) this._med_ccalle;
      row["med_clocalidad"] = (object) this._med_clocalidad;
      row["med_cprovincia"] = (object) this._med_cprovincia;
      row["med_ccodigopostal"] = (object) this._med_ccodigopostal;
      row["med_ctelefono"] = (object) this._med_ctelefono;
      row["med_cfax"] = (object) this._med_cfax;
      row["med_ntipo"] = (object) this._med_ntipo;
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
