// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerp_VirtualIR
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
  public class Callerp_VirtualIR : CallerObject
  {
    private string _vir_cDll;
    private DateTime? _vir_tFechaHora;
    private Decimal _vir_nStatus;
    private string _vir_cPackage;

    public string vir_cDll
    {
      get
      {
        return this._vir_cDll;
      }
      set
      {
        this._vir_cDll = value;
      }
    }

    public DateTime? vir_tFechaHora
    {
      get
      {
        return this._vir_tFechaHora;
      }
      set
      {
        this._vir_tFechaHora = value;
      }
    }

    public Decimal vir_nStatus
    {
      get
      {
        return this._vir_nStatus;
      }
      set
      {
        this._vir_nStatus = value;
      }
    }

    public string vir_cPackage
    {
      get
      {
        return this._vir_cPackage;
      }
      set
      {
        this._vir_cPackage = value;
      }
    }

    public Callerp_VirtualIR()
    {
      this.InitClass();
    }

    public Callerp_VirtualIR(int Id, string Name, string vir_cDll, DateTime? vir_tFechaHora, Decimal vir_nStatus, string vir_cPackage)
    {
      this.Id = Id;
      this.Name = Name;
      this._vir_cDll = vir_cDll;
      this._vir_tFechaHora = vir_tFechaHora;
      this._vir_nStatus = vir_nStatus;
      this._vir_cPackage = vir_cPackage;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3104, "p_VirtualIR");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplep_VirtualIR simplepVirtualIr = new Simplep_VirtualIR();
      simplepVirtualIr.Id = this.Id;
      simplepVirtualIr.Name = this.Name;
      simplepVirtualIr.vir_cDll = this._vir_cDll;
      simplepVirtualIr.vir_tFechaHora = this._vir_tFechaHora;
      simplepVirtualIr.vir_nStatus = this._vir_nStatus;
      simplepVirtualIr.vir_cPackage = this._vir_cPackage;
      return (SimpleBaseObject) simplepVirtualIr;
    }

    public void SetSimpleObject(Simplep_VirtualIR Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._vir_cDll = Simple.vir_cDll;
      this._vir_tFechaHora = Simple.vir_tFechaHora;
      this._vir_nStatus = Simple.vir_nStatus;
      this._vir_cPackage = Simple.vir_cPackage;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalp_VirtualIR(SqlConfig, UserId, (Simplep_VirtualIR) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("vir_cDll", typeof (string)));
      dataTable.Columns.Add(new DataColumn("vir_tFechaHora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("vir_nStatus", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("vir_cPackage", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["vir_cDll"] = (object) this._vir_cDll;
      row["vir_tFechaHora"] = (object) this._vir_tFechaHora;
      row["vir_nStatus"] = (object) this._vir_nStatus;
      row["vir_cPackage"] = (object) this._vir_cPackage;
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
