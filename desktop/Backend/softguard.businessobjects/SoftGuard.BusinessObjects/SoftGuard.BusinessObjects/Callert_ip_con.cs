// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_ip_con
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
  public class Callert_ip_con : CallerObject
  {
    private int _ipc_icodigo;
    private string _ipc_cdescripcion;
    private int _ipc_ireceptor;
    private Decimal _ipc_nestado;
    private Decimal _ipc_nport;
    private Decimal _ipc_nprotocolo;
    private Decimal _ipc_crespondeack;
    private int _ipc_itiempoinactividad;
    private Decimal _ipc_cresetxhb;
    private int _ipc_imodemsms;
    private string _ipc_cremotehostip;

    public int ipc_icodigo
    {
      get
      {
        return this._ipc_icodigo;
      }
      set
      {
        this._ipc_icodigo = value;
      }
    }

    public string ipc_cdescripcion
    {
      get
      {
        return this._ipc_cdescripcion;
      }
      set
      {
        this._ipc_cdescripcion = value;
      }
    }

    public int ipc_ireceptor
    {
      get
      {
        return this._ipc_ireceptor;
      }
      set
      {
        this._ipc_ireceptor = value;
      }
    }

    public Decimal ipc_nestado
    {
      get
      {
        return this._ipc_nestado;
      }
      set
      {
        this._ipc_nestado = value;
      }
    }

    public Decimal ipc_nport
    {
      get
      {
        return this._ipc_nport;
      }
      set
      {
        this._ipc_nport = value;
      }
    }

    public Decimal ipc_nprotocolo
    {
      get
      {
        return this._ipc_nprotocolo;
      }
      set
      {
        this._ipc_nprotocolo = value;
      }
    }

    public Decimal ipc_crespondeack
    {
      get
      {
        return this._ipc_crespondeack;
      }
      set
      {
        this._ipc_crespondeack = value;
      }
    }

    public int ipc_itiempoinactividad
    {
      get
      {
        return this._ipc_itiempoinactividad;
      }
      set
      {
        this._ipc_itiempoinactividad = value;
      }
    }

    public Decimal ipc_cresetxhb
    {
      get
      {
        return this._ipc_cresetxhb;
      }
      set
      {
        this._ipc_cresetxhb = value;
      }
    }

    public int ipc_imodemsms
    {
      get
      {
        return this._ipc_imodemsms;
      }
      set
      {
        this._ipc_imodemsms = value;
      }
    }

    public string ipc_cremotehostip
    {
      get
      {
        return this._ipc_cremotehostip;
      }
      set
      {
        this._ipc_cremotehostip = value;
      }
    }

    public Callert_ip_con()
    {
      this.InitClass();
    }

    public Callert_ip_con(int Id, string Name, int ipc_icodigo, string ipc_cdescripcion, int ipc_ireceptor, Decimal ipc_nestado, Decimal ipc_nport, Decimal ipc_nprotocolo, Decimal ipc_crespondeack, int ipc_itiempoinactividad, Decimal ipc_cresetxhb, int ipc_imodemsms, string ipc_cremotehostip)
    {
      this.Id = Id;
      this.Name = Name;
      this._ipc_icodigo = ipc_icodigo;
      this._ipc_cdescripcion = ipc_cdescripcion;
      this._ipc_ireceptor = ipc_ireceptor;
      this._ipc_nestado = ipc_nestado;
      this._ipc_nport = ipc_nport;
      this._ipc_nprotocolo = ipc_nprotocolo;
      this._ipc_crespondeack = ipc_crespondeack;
      this._ipc_itiempoinactividad = ipc_itiempoinactividad;
      this._ipc_cresetxhb = ipc_cresetxhb;
      this._ipc_imodemsms = ipc_imodemsms;
      this._ipc_cremotehostip = ipc_cremotehostip;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3092, "t_ip_con");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_ip_con simpletIpCon = new Simplet_ip_con();
      simpletIpCon.Id = this.Id;
      simpletIpCon.Name = this.Name;
      simpletIpCon.ipc_icodigo = this._ipc_icodigo;
      simpletIpCon.ipc_cdescripcion = this._ipc_cdescripcion;
      simpletIpCon.ipc_ireceptor = this._ipc_ireceptor;
      simpletIpCon.ipc_nestado = this._ipc_nestado;
      simpletIpCon.ipc_nport = this._ipc_nport;
      simpletIpCon.ipc_nprotocolo = this._ipc_nprotocolo;
      simpletIpCon.ipc_crespondeack = this._ipc_crespondeack;
      simpletIpCon.ipc_itiempoinactividad = this._ipc_itiempoinactividad;
      simpletIpCon.ipc_cresetxhb = this._ipc_cresetxhb;
      simpletIpCon.ipc_imodemsms = this._ipc_imodemsms;
      simpletIpCon.ipc_cremotehostip = this._ipc_cremotehostip;
      return (SimpleBaseObject) simpletIpCon;
    }

    public void SetSimpleObject(Simplet_ip_con Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._ipc_icodigo = Simple.ipc_icodigo;
      this._ipc_cdescripcion = Simple.ipc_cdescripcion;
      this._ipc_ireceptor = Simple.ipc_ireceptor;
      this._ipc_nestado = Simple.ipc_nestado;
      this._ipc_nport = Simple.ipc_nport;
      this._ipc_nprotocolo = Simple.ipc_nprotocolo;
      this._ipc_crespondeack = Simple.ipc_crespondeack;
      this._ipc_itiempoinactividad = Simple.ipc_itiempoinactividad;
      this._ipc_cresetxhb = Simple.ipc_cresetxhb;
      this._ipc_imodemsms = Simple.ipc_imodemsms;
      this._ipc_cremotehostip = Simple.ipc_cremotehostip;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_ip_con(SqlConfig, UserId, (Simplet_ip_con) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ipc_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("ipc_ireceptor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_nport", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_nprotocolo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_crespondeack", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_itiempoinactividad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cresetxhb", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("ipc_imodemsms", typeof (int)));
      dataTable.Columns.Add(new DataColumn("ipc_cremotehostip", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["ipc_icodigo"] = (object) this._ipc_icodigo;
      row["ipc_cdescripcion"] = (object) this._ipc_cdescripcion;
      row["ipc_ireceptor"] = (object) this._ipc_ireceptor;
      row["ipc_nestado"] = (object) this._ipc_nestado;
      row["ipc_nport"] = (object) this._ipc_nport;
      row["ipc_nprotocolo"] = (object) this._ipc_nprotocolo;
      row["ipc_crespondeack"] = (object) this._ipc_crespondeack;
      row["ipc_itiempoinactividad"] = (object) this._ipc_itiempoinactividad;
      row["ipc_cresetxhb"] = (object) this._ipc_cresetxhb;
      row["ipc_imodemsms"] = (object) this._ipc_imodemsms;
      row["ipc_cremotehostip"] = (object) this._ipc_cremotehostip;
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
