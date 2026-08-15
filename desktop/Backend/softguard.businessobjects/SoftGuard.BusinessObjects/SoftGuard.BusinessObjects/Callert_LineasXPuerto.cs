// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_LineasXPuerto
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
  public class Callert_LineasXPuerto : CallerObject
  {
    private int _lxp_iAlias;
    private Decimal _lxp_nLinea;
    private Decimal _lxp_nEstado;

    public int lxp_iAlias
    {
      get
      {
        return this._lxp_iAlias;
      }
      set
      {
        this._lxp_iAlias = value;
      }
    }

    public Decimal lxp_nLinea
    {
      get
      {
        return this._lxp_nLinea;
      }
      set
      {
        this._lxp_nLinea = value;
      }
    }

    public Decimal lxp_nEstado
    {
      get
      {
        return this._lxp_nEstado;
      }
      set
      {
        this._lxp_nEstado = value;
      }
    }

    public Callert_LineasXPuerto()
    {
      this.InitClass();
    }

    public Callert_LineasXPuerto(int Id, string Name, int lxp_iAlias, Decimal lxp_nLinea, Decimal lxp_nEstado)
    {
      this.Id = Id;
      this.Name = Name;
      this._lxp_iAlias = lxp_iAlias;
      this._lxp_nLinea = lxp_nLinea;
      this._lxp_nEstado = lxp_nEstado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3069, "t_LineasXPuerto");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_LineasXPuerto simpletLineasXpuerto = new Simplet_LineasXPuerto();
      simpletLineasXpuerto.Id = this.Id;
      simpletLineasXpuerto.Name = this.Name;
      simpletLineasXpuerto.lxp_iAlias = this._lxp_iAlias;
      simpletLineasXpuerto.lxp_nLinea = this._lxp_nLinea;
      simpletLineasXpuerto.lxp_nEstado = this._lxp_nEstado;
      return (SimpleBaseObject) simpletLineasXpuerto;
    }

    public void SetSimpleObject(Simplet_LineasXPuerto Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._lxp_iAlias = Simple.lxp_iAlias;
      this._lxp_nLinea = Simple.lxp_nLinea;
      this._lxp_nEstado = Simple.lxp_nEstado;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_LineasXPuerto(SqlConfig, UserId, (Simplet_LineasXPuerto) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("lxp_iAlias", typeof (int)));
      dataTable.Columns.Add(new DataColumn("lxp_nLinea", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("lxp_nEstado", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["lxp_iAlias"] = (object) this._lxp_iAlias;
      row["lxp_nLinea"] = (object) this._lxp_nLinea;
      row["lxp_nEstado"] = (object) this._lxp_nEstado;
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
