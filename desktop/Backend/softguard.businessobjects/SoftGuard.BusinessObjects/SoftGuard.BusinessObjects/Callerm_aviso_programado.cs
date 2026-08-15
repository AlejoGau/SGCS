// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_aviso_programado
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
  public class Callerm_aviso_programado : CallerObject
  {
    private string _prg_from;
    private string _prg_to;
    private int _prg_estado;
    private string _prg_gateway;
    private int _prg_objecttypeid;
    private int _prg_objectid;
    private DateTime? _prg_prgdatetime;
    private DateTime? _prg_enviodatetime;
    private string _prg_mensaje;

    public string prg_from
    {
      get
      {
        return this._prg_from;
      }
      set
      {
        this._prg_from = value;
      }
    }

    public string prg_to
    {
      get
      {
        return this._prg_to;
      }
      set
      {
        this._prg_to = value;
      }
    }

    public int prg_estado
    {
      get
      {
        return this._prg_estado;
      }
      set
      {
        this._prg_estado = value;
      }
    }

    public string prg_gateway
    {
      get
      {
        return this._prg_gateway;
      }
      set
      {
        this._prg_gateway = value;
      }
    }

    public int prg_objecttypeid
    {
      get
      {
        return this._prg_objecttypeid;
      }
      set
      {
        this._prg_objecttypeid = value;
      }
    }

    public int prg_objectid
    {
      get
      {
        return this._prg_objectid;
      }
      set
      {
        this._prg_objectid = value;
      }
    }

    public DateTime? prg_prgdatetime
    {
      get
      {
        return this._prg_prgdatetime;
      }
      set
      {
        this._prg_prgdatetime = value;
      }
    }

    public DateTime? prg_enviodatetime
    {
      get
      {
        return this._prg_enviodatetime;
      }
      set
      {
        this._prg_enviodatetime = value;
      }
    }

    public string prg_mensaje
    {
      get
      {
        return this._prg_mensaje;
      }
      set
      {
        this._prg_mensaje = value;
      }
    }

    public Callerm_aviso_programado()
    {
      this.InitClass();
    }

    public Callerm_aviso_programado(int Id, string Name, string prg_from, string prg_to, int prg_estado, string prg_gateway, int prg_objecttypeid, int prg_objectid, DateTime? prg_prgdatetime, DateTime? prg_enviodatetime, string prg_mensaje)
    {
      this.Id = Id;
      this.Name = Name;
      this._prg_from = prg_from;
      this._prg_to = prg_to;
      this._prg_estado = prg_estado;
      this._prg_gateway = prg_gateway;
      this._prg_objecttypeid = prg_objecttypeid;
      this._prg_objectid = prg_objectid;
      this._prg_prgdatetime = prg_prgdatetime;
      this._prg_enviodatetime = prg_enviodatetime;
      this._prg_mensaje = prg_mensaje;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3159, "m_aviso_programado");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_aviso_programado simplemAvisoProgramado = new Simplem_aviso_programado();
      simplemAvisoProgramado.Id = this.Id;
      simplemAvisoProgramado.Name = this.Name;
      simplemAvisoProgramado.prg_from = this._prg_from;
      simplemAvisoProgramado.prg_to = this._prg_to;
      simplemAvisoProgramado.prg_estado = this._prg_estado;
      simplemAvisoProgramado.prg_gateway = this._prg_gateway;
      simplemAvisoProgramado.prg_objecttypeid = this._prg_objecttypeid;
      simplemAvisoProgramado.prg_objectid = this._prg_objectid;
      simplemAvisoProgramado.prg_prgdatetime = this._prg_prgdatetime;
      simplemAvisoProgramado.prg_enviodatetime = this._prg_enviodatetime;
      simplemAvisoProgramado.prg_mensaje = this._prg_mensaje;
      return (SimpleBaseObject) simplemAvisoProgramado;
    }

    public void SetSimpleObject(Simplem_aviso_programado Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._prg_from = Simple.prg_from;
      this._prg_to = Simple.prg_to;
      this._prg_estado = Simple.prg_estado;
      this._prg_gateway = Simple.prg_gateway;
      this._prg_objecttypeid = Simple.prg_objecttypeid;
      this._prg_objectid = Simple.prg_objectid;
      this._prg_prgdatetime = Simple.prg_prgdatetime;
      this._prg_enviodatetime = Simple.prg_enviodatetime;
      this._prg_mensaje = Simple.prg_mensaje;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_aviso_programado(SqlConfig, UserId, (Simplem_aviso_programado) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_from", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_to", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_estado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_gateway", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prg_objecttypeid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_objectid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prg_prgdatetime", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prg_enviodatetime", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prg_mensaje", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["prg_from"] = (object) this._prg_from;
      row["prg_to"] = (object) this._prg_to;
      row["prg_estado"] = (object) this._prg_estado;
      row["prg_gateway"] = (object) this._prg_gateway;
      row["prg_objecttypeid"] = (object) this._prg_objecttypeid;
      row["prg_objectid"] = (object) this._prg_objectid;
      row["prg_prgdatetime"] = (object) this._prg_prgdatetime;
      row["prg_enviodatetime"] = (object) this._prg_enviodatetime;
      row["prg_mensaje"] = (object) this._prg_mensaje;
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
