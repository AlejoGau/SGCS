// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_EscalamientoPrioridades
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
  public class Callert_EscalamientoPrioridades : CallerObject
  {
    private int _tep_itiempo;
    private Decimal _tep_ncontrola;

    public int tep_itiempo
    {
      get
      {
        return this._tep_itiempo;
      }
      set
      {
        this._tep_itiempo = value;
      }
    }

    public Decimal tep_ncontrola
    {
      get
      {
        return this._tep_ncontrola;
      }
      set
      {
        this._tep_ncontrola = value;
      }
    }

    public Callert_EscalamientoPrioridades()
    {
      this.InitClass();
    }

    public Callert_EscalamientoPrioridades(int Id, string Name, int tep_itiempo, Decimal tep_ncontrola)
    {
      this.Id = Id;
      this.Name = Name;
      this._tep_itiempo = tep_itiempo;
      this._tep_ncontrola = tep_ncontrola;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3108, "t_EscalamientoPrioridades");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_EscalamientoPrioridades escalamientoPrioridades = new Simplet_EscalamientoPrioridades();
      escalamientoPrioridades.Id = this.Id;
      escalamientoPrioridades.Name = this.Name;
      escalamientoPrioridades.tep_itiempo = this._tep_itiempo;
      escalamientoPrioridades.tep_ncontrola = this._tep_ncontrola;
      return (SimpleBaseObject) escalamientoPrioridades;
    }

    public void SetSimpleObject(Simplet_EscalamientoPrioridades Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tep_itiempo = Simple.tep_itiempo;
      this._tep_ncontrola = Simple.tep_ncontrola;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_EscalamientoPrioridades(SqlConfig, UserId, (Simplet_EscalamientoPrioridades) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tep_itiempo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tep_ncontrola", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tep_itiempo"] = (object) this._tep_itiempo;
      row["tep_ncontrola"] = (object) this._tep_ncontrola;
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
