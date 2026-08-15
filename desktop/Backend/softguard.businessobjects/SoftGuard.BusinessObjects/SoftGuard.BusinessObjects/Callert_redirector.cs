// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_redirector
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_redirector : CallerObject
  {
    private string _trd_cnombre;
    private string _trd_cdealer;
    private string _trd_ceventos;
    private int _trd_idestino;

    public string trd_cnombre
    {
      get
      {
        return this._trd_cnombre;
      }
      set
      {
        this._trd_cnombre = value;
      }
    }

    public string trd_cdealer
    {
      get
      {
        return this._trd_cdealer;
      }
      set
      {
        this._trd_cdealer = value;
      }
    }

    public string trd_ceventos
    {
      get
      {
        return this._trd_ceventos;
      }
      set
      {
        this._trd_ceventos = value;
      }
    }

    public int trd_idestino
    {
      get
      {
        return this._trd_idestino;
      }
      set
      {
        this._trd_idestino = value;
      }
    }

    public Callert_redirector()
    {
      this.InitClass();
    }

    public Callert_redirector(int Id, string Name, string trd_cnombre, string trd_cdealer, string trd_ceventos, int trd_idestino)
    {
      this.Id = Id;
      this.Name = Name;
      this._trd_cnombre = trd_cnombre;
      this._trd_cdealer = trd_cdealer;
      this._trd_ceventos = trd_ceventos;
      this._trd_idestino = trd_idestino;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3138, "t_redirector");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_redirector simpletRedirector = new Simplet_redirector();
      simpletRedirector.Id = this.Id;
      simpletRedirector.Name = this.Name;
      simpletRedirector.trd_cnombre = this._trd_cnombre;
      simpletRedirector.trd_cdealer = this._trd_cdealer;
      simpletRedirector.trd_ceventos = this._trd_ceventos;
      simpletRedirector.trd_idestino = this._trd_idestino;
      return (SimpleBaseObject) simpletRedirector;
    }

    public void SetSimpleObject(Simplet_redirector Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._trd_cnombre = Simple.trd_cnombre;
      this._trd_cdealer = Simple.trd_cdealer;
      this._trd_ceventos = Simple.trd_ceventos;
      this._trd_idestino = Simple.trd_idestino;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_redirector(SqlConfig, UserId, (Simplet_redirector) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("trd_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("trd_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("trd_ceventos", typeof (string)));
      dataTable.Columns.Add(new DataColumn("trd_idestino", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["trd_cnombre"] = (object) this._trd_cnombre;
      row["trd_cdealer"] = (object) this._trd_cdealer;
      row["trd_ceventos"] = (object) this._trd_ceventos;
      row["trd_idestino"] = (object) this._trd_idestino;
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
