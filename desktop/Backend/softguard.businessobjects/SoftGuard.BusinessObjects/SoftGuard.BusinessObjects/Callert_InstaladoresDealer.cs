// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_InstaladoresDealer
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_InstaladoresDealer : CallerObject
  {
    private int _tid_iidInstalador;
    private int _tid_iidDealer;

    public int tid_iidInstalador
    {
      get
      {
        return this._tid_iidInstalador;
      }
      set
      {
        this._tid_iidInstalador = value;
      }
    }

    public int tid_iidDealer
    {
      get
      {
        return this._tid_iidDealer;
      }
      set
      {
        this._tid_iidDealer = value;
      }
    }

    public Callert_InstaladoresDealer()
    {
      this.InitClass();
    }

    public Callert_InstaladoresDealer(int Id, string Name, int tid_iidInstalador, int tid_iidDealer)
    {
      this.Id = Id;
      this.Name = Name;
      this._tid_iidInstalador = tid_iidInstalador;
      this._tid_iidDealer = tid_iidDealer;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3156, "t_InstaladoresDealer");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_InstaladoresDealer instaladoresDealer = new Simplet_InstaladoresDealer();
      instaladoresDealer.Id = this.Id;
      instaladoresDealer.Name = this.Name;
      instaladoresDealer.tid_iidInstalador = this._tid_iidInstalador;
      instaladoresDealer.tid_iidDealer = this._tid_iidDealer;
      return (SimpleBaseObject) instaladoresDealer;
    }

    public void SetSimpleObject(Simplet_InstaladoresDealer Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tid_iidInstalador = Simple.tid_iidInstalador;
      this._tid_iidDealer = Simple.tid_iidDealer;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_InstaladoresDealer(SqlConfig, UserId, (Simplet_InstaladoresDealer) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tid_iidInstalador", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tid_iidDealer", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tid_iidInstalador"] = (object) this._tid_iidInstalador;
      row["tid_iidDealer"] = (object) this._tid_iidDealer;
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
