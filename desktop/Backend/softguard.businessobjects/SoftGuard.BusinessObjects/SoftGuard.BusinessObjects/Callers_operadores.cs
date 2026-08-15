// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callers_operadores
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
  public class Callers_operadores : CallerObject
  {
    private string _ope_clogin;
    private string _ope_cnombre;
    private string _ope_cclave;
    private int _ope_nsql;
    private Decimal _ope_nsupervisor;
    private string _ope_clinea;
    private Decimal _ope_nprioridad;
    private DateTime? _ope_dCambio;
    private Decimal _ope_nSereno;
    private int _ope_iid;

    public string ope_clogin
    {
      get
      {
        return this._ope_clogin;
      }
      set
      {
        this._ope_clogin = value;
      }
    }

    public string ope_cnombre
    {
      get
      {
        return this._ope_cnombre;
      }
      set
      {
        this._ope_cnombre = value;
      }
    }

    public string ope_cclave
    {
      get
      {
        return this._ope_cclave;
      }
      set
      {
        this._ope_cclave = value;
      }
    }

    public int ope_nsql
    {
      get
      {
        return this._ope_nsql;
      }
      set
      {
        this._ope_nsql = value;
      }
    }

    public Decimal ope_nsupervisor
    {
      get
      {
        return this._ope_nsupervisor;
      }
      set
      {
        this._ope_nsupervisor = value;
      }
    }

    public string ope_clinea
    {
      get
      {
        return this._ope_clinea;
      }
      set
      {
        this._ope_clinea = value;
      }
    }

    public Decimal ope_nprioridad
    {
      get
      {
        return this._ope_nprioridad;
      }
      set
      {
        this._ope_nprioridad = value;
      }
    }

    public DateTime? ope_dCambio
    {
      get
      {
        return this._ope_dCambio;
      }
      set
      {
        this._ope_dCambio = value;
      }
    }

    public Decimal ope_nSereno
    {
      get
      {
        return this._ope_nSereno;
      }
      set
      {
        this._ope_nSereno = value;
      }
    }

    public int ope_iid
    {
      get
      {
        return this._ope_iid;
      }
      set
      {
        this._ope_iid = value;
      }
    }

    public Callers_operadores()
    {
      this.InitClass();
    }

    public Callers_operadores(int Id, string Name, string ope_clogin, string ope_cnombre, string ope_cclave, int ope_nsql, Decimal ope_nsupervisor, string ope_clinea, Decimal ope_nprioridad, DateTime? ope_dCambio, Decimal ope_nSereno, int ope_iid)
    {
      this.Id = Id;
      this.Name = Name;
      this._ope_clogin = ope_clogin;
      this._ope_cnombre = ope_cnombre;
      this._ope_cclave = ope_cclave;
      this._ope_nsql = ope_nsql;
      this._ope_nsupervisor = ope_nsupervisor;
      this._ope_clinea = ope_clinea;
      this._ope_nprioridad = ope_nprioridad;
      this._ope_dCambio = ope_dCambio;
      this._ope_nSereno = ope_nSereno;
      this._ope_iid = ope_iid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3107, "s_operadores");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simples_operadores simplesOperadores = new Simples_operadores();
      simplesOperadores.Id = this.Id;
      simplesOperadores.Name = this.Name;
      simplesOperadores.ope_clogin = this._ope_clogin;
      simplesOperadores.ope_cnombre = this._ope_cnombre;
      simplesOperadores.ope_cclave = this._ope_cclave;
      simplesOperadores.ope_nsql = this._ope_nsql;
      simplesOperadores.ope_nsupervisor = this._ope_nsupervisor;
      simplesOperadores.ope_clinea = this._ope_clinea;
      simplesOperadores.ope_nprioridad = this._ope_nprioridad;
      simplesOperadores.ope_dCambio = this._ope_dCambio;
      simplesOperadores.ope_nSereno = this._ope_nSereno;
      simplesOperadores.ope_iid = this._ope_iid;
      return (SimpleBaseObject) simplesOperadores;
    }

    public void SetSimpleObject(Simples_operadores Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._ope_clogin = Simple.ope_clogin;
      this._ope_cnombre = Simple.ope_cnombre;
      this._ope_cclave = Simple.ope_cclave;
      this._ope_nsql = Simple.ope_nsql;
      this._ope_nsupervisor = Simple.ope_nsupervisor;
      this._ope_clinea = Simple.ope_clinea;
      this._ope_nprioridad = Simple.ope_nprioridad;
      this._ope_dCambio = Simple.ope_dCambio;
      this._ope_nSereno = Simple.ope_nSereno;
      this._ope_iid = Simple.ope_iid;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dals_operadores(SqlConfig, UserId, (Simples_operadores) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_clogin", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_cclave", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_nsql", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ope_nsupervisor", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_clinea", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ope_nprioridad", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_dCambio", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("ope_nSereno", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ope_iid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ope_clogin"] = (object) this._ope_clogin;
      row["ope_cnombre"] = (object) this._ope_cnombre;
      row["ope_cclave"] = (object) this._ope_cclave;
      row["ope_nsql"] = (object) this._ope_nsql;
      row["ope_nsupervisor"] = (object) this._ope_nsupervisor;
      row["ope_clinea"] = (object) this._ope_clinea;
      row["ope_nprioridad"] = (object) this._ope_nprioridad;
      row["ope_dCambio"] = (object) this._ope_dCambio;
      row["ope_nSereno"] = (object) this._ope_nSereno;
      row["ope_iid"] = (object) this._ope_iid;
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
