// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_autoridaddestino
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_autoridaddestino : CallerObject
  {
    private string _tad_cnombre;
    private string _tad_curl;
    private string _tad_cconfig;
    private string _tad_cmetadata;

    public string tad_cnombre
    {
      get
      {
        return this._tad_cnombre;
      }
      set
      {
        this._tad_cnombre = value;
      }
    }

    public string tad_curl
    {
      get
      {
        return this._tad_curl;
      }
      set
      {
        this._tad_curl = value;
      }
    }

    public string tad_cconfig
    {
      get
      {
        return this._tad_cconfig;
      }
      set
      {
        this._tad_cconfig = value;
      }
    }

    public string tad_cmetadata
    {
      get
      {
        return this._tad_cmetadata;
      }
      set
      {
        this._tad_cmetadata = value;
      }
    }

    public Callert_autoridaddestino()
    {
      this.InitClass();
    }

    public Callert_autoridaddestino(int Id, string Name, string tad_cnombre, string tad_curl, string tad_cconfig, string tad_cmetadata)
    {
      this.Id = Id;
      this.Name = Name;
      this._tad_cnombre = tad_cnombre;
      this._tad_curl = tad_curl;
      this._tad_cconfig = tad_cconfig;
      this._tad_cmetadata = tad_cmetadata;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3132, "t_autoridaddestino");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_autoridaddestino autoridaddestino = new Simplet_autoridaddestino();
      autoridaddestino.Id = this.Id;
      autoridaddestino.Name = this.Name;
      autoridaddestino.tad_cnombre = this._tad_cnombre;
      autoridaddestino.tad_curl = this._tad_curl;
      autoridaddestino.tad_cconfig = this._tad_cconfig;
      autoridaddestino.tad_cmetadata = this._tad_cmetadata;
      return (SimpleBaseObject) autoridaddestino;
    }

    public void SetSimpleObject(Simplet_autoridaddestino Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tad_cnombre = Simple.tad_cnombre;
      this._tad_curl = Simple.tad_curl;
      this._tad_cconfig = Simple.tad_cconfig;
      this._tad_cmetadata = Simple.tad_cmetadata;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_autoridaddestino(SqlConfig, UserId, (Simplet_autoridaddestino) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_curl", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_cconfig", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tad_cmetadata", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tad_cnombre"] = (object) this._tad_cnombre;
      row["tad_curl"] = (object) this._tad_curl;
      row["tad_cconfig"] = (object) this._tad_cconfig;
      row["tad_cmetadata"] = (object) this._tad_cmetadata;
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
