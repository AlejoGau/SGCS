// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_printQueue
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
  public class Callerm_printQueue : CallerObject
  {
    private int _prn_cbc_icodigo_id;
    private int _prn_icopia;
    private string _prn_cbc_ctipocbte;
    private int _prn_cbc_inumerocbte;
    private string _prn_cbc_cprefijocbte;
    private DateTime? _prn_cbc_dfecha;
    private string _prn_org_cnombre;
    private string _prn_organizationName;
    private string _prn_cli_cidentificacion;
    private int _prn_iestado;
    private string _prn_cfilename;

    public int prn_cbc_icodigo_id
    {
      get
      {
        return this._prn_cbc_icodigo_id;
      }
      set
      {
        this._prn_cbc_icodigo_id = value;
      }
    }

    public int prn_icopia
    {
      get
      {
        return this._prn_icopia;
      }
      set
      {
        this._prn_icopia = value;
      }
    }

    public string prn_cbc_ctipocbte
    {
      get
      {
        return this._prn_cbc_ctipocbte;
      }
      set
      {
        this._prn_cbc_ctipocbte = value;
      }
    }

    public int prn_cbc_inumerocbte
    {
      get
      {
        return this._prn_cbc_inumerocbte;
      }
      set
      {
        this._prn_cbc_inumerocbte = value;
      }
    }

    public string prn_cbc_cprefijocbte
    {
      get
      {
        return this._prn_cbc_cprefijocbte;
      }
      set
      {
        this._prn_cbc_cprefijocbte = value;
      }
    }

    public DateTime? prn_cbc_dfecha
    {
      get
      {
        return this._prn_cbc_dfecha;
      }
      set
      {
        this._prn_cbc_dfecha = value;
      }
    }

    public string prn_org_cnombre
    {
      get
      {
        return this._prn_org_cnombre;
      }
      set
      {
        this._prn_org_cnombre = value;
      }
    }

    public string prn_organizationName
    {
      get
      {
        return this._prn_organizationName;
      }
      set
      {
        this._prn_organizationName = value;
      }
    }

    public string prn_cli_cidentificacion
    {
      get
      {
        return this._prn_cli_cidentificacion;
      }
      set
      {
        this._prn_cli_cidentificacion = value;
      }
    }

    public int prn_iestado
    {
      get
      {
        return this._prn_iestado;
      }
      set
      {
        this._prn_iestado = value;
      }
    }

    public string prn_cfilename
    {
      get
      {
        return this._prn_cfilename;
      }
      set
      {
        this._prn_cfilename = value;
      }
    }

    public Callerm_printQueue()
    {
      this.InitClass();
    }

    public Callerm_printQueue(int Id, string Name, int prn_cbc_icodigo_id, int prn_icopia, string prn_cbc_ctipocbte, int prn_cbc_inumerocbte, string prn_cbc_cprefijocbte, DateTime? prn_cbc_dfecha, string prn_org_cnombre, string prn_organizationName, string prn_cli_cidentificacion, int prn_iestado, string prn_cfilename)
    {
      this.Id = Id;
      this.Name = Name;
      this._prn_cbc_icodigo_id = prn_cbc_icodigo_id;
      this._prn_icopia = prn_icopia;
      this._prn_cbc_ctipocbte = prn_cbc_ctipocbte;
      this._prn_cbc_inumerocbte = prn_cbc_inumerocbte;
      this._prn_cbc_cprefijocbte = prn_cbc_cprefijocbte;
      this._prn_cbc_dfecha = prn_cbc_dfecha;
      this._prn_org_cnombre = prn_org_cnombre;
      this._prn_organizationName = prn_organizationName;
      this._prn_cli_cidentificacion = prn_cli_cidentificacion;
      this._prn_iestado = prn_iestado;
      this._prn_cfilename = prn_cfilename;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3157, "m_printQueue");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_printQueue simplemPrintQueue = new Simplem_printQueue();
      simplemPrintQueue.Id = this.Id;
      simplemPrintQueue.Name = this.Name;
      simplemPrintQueue.prn_cbc_icodigo_id = this._prn_cbc_icodigo_id;
      simplemPrintQueue.prn_icopia = this._prn_icopia;
      simplemPrintQueue.prn_cbc_ctipocbte = this._prn_cbc_ctipocbte;
      simplemPrintQueue.prn_cbc_inumerocbte = this._prn_cbc_inumerocbte;
      simplemPrintQueue.prn_cbc_cprefijocbte = this._prn_cbc_cprefijocbte;
      simplemPrintQueue.prn_cbc_dfecha = this._prn_cbc_dfecha;
      simplemPrintQueue.prn_org_cnombre = this._prn_org_cnombre;
      simplemPrintQueue.prn_organizationName = this._prn_organizationName;
      simplemPrintQueue.prn_cli_cidentificacion = this._prn_cli_cidentificacion;
      simplemPrintQueue.prn_iestado = this._prn_iestado;
      simplemPrintQueue.prn_cfilename = this._prn_cfilename;
      return (SimpleBaseObject) simplemPrintQueue;
    }

    public void SetSimpleObject(Simplem_printQueue Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._prn_cbc_icodigo_id = Simple.prn_cbc_icodigo_id;
      this._prn_icopia = Simple.prn_icopia;
      this._prn_cbc_ctipocbte = Simple.prn_cbc_ctipocbte;
      this._prn_cbc_inumerocbte = Simple.prn_cbc_inumerocbte;
      this._prn_cbc_cprefijocbte = Simple.prn_cbc_cprefijocbte;
      this._prn_cbc_dfecha = Simple.prn_cbc_dfecha;
      this._prn_org_cnombre = Simple.prn_org_cnombre;
      this._prn_organizationName = Simple.prn_organizationName;
      this._prn_cli_cidentificacion = Simple.prn_cli_cidentificacion;
      this._prn_iestado = Simple.prn_iestado;
      this._prn_cfilename = Simple.prn_cfilename;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_printQueue(SqlConfig, UserId, (Simplem_printQueue) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_icodigo_id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_icopia", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_ctipocbte", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_inumerocbte", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_cprefijocbte", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cbc_dfecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("prn_org_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_organizationName", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_cli_cidentificacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("prn_iestado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("prn_cfilename", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["prn_cbc_icodigo_id"] = (object) this._prn_cbc_icodigo_id;
      row["prn_icopia"] = (object) this._prn_icopia;
      row["prn_cbc_ctipocbte"] = (object) this._prn_cbc_ctipocbte;
      row["prn_cbc_inumerocbte"] = (object) this._prn_cbc_inumerocbte;
      row["prn_cbc_cprefijocbte"] = (object) this._prn_cbc_cprefijocbte;
      row["prn_cbc_dfecha"] = (object) this._prn_cbc_dfecha;
      row["prn_org_cnombre"] = (object) this._prn_org_cnombre;
      row["prn_organizationName"] = (object) this._prn_organizationName;
      row["prn_cli_cidentificacion"] = (object) this._prn_cli_cidentificacion;
      row["prn_iestado"] = (object) this._prn_iestado;
      row["prn_cfilename"] = (object) this._prn_cfilename;
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
