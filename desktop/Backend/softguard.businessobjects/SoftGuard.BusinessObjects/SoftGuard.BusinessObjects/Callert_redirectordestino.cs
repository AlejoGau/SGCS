// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_redirectordestino
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_redirectordestino : CallerObject
  {
    private string _rrd_cnombre;
    private string _rrd_curl;
    private string _rrd_cconfig;
    private string _rrd_cmetadata;

    public string rrd_cnombre
    {
      get
      {
        return this._rrd_cnombre;
      }
      set
      {
        this._rrd_cnombre = value;
      }
    }

    public string rrd_curl
    {
      get
      {
        return this._rrd_curl;
      }
      set
      {
        this._rrd_curl = value;
      }
    }

    public string rrd_cconfig
    {
      get
      {
        return this._rrd_cconfig;
      }
      set
      {
        this._rrd_cconfig = value;
      }
    }

    public string rrd_cmetadata
    {
      get
      {
        return this._rrd_cmetadata;
      }
      set
      {
        this._rrd_cmetadata = value;
      }
    }

    public Callert_redirectordestino()
    {
      this.InitClass();
    }

    public Callert_redirectordestino(int Id, string Name, string rrd_cnombre, string rrd_curl, string rrd_cconfig, string rrd_cmetadata)
    {
      this.Id = Id;
      this.Name = Name;
      this._rrd_cnombre = rrd_cnombre;
      this._rrd_curl = rrd_curl;
      this._rrd_cconfig = rrd_cconfig;
      this._rrd_cmetadata = rrd_cmetadata;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3139, "t_redirectordestino");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_redirectordestino redirectordestino = new Simplet_redirectordestino();
      redirectordestino.Id = this.Id;
      redirectordestino.Name = this.Name;
      redirectordestino.rrd_cnombre = this._rrd_cnombre;
      redirectordestino.rrd_curl = this._rrd_curl;
      redirectordestino.rrd_cconfig = this._rrd_cconfig;
      redirectordestino.rrd_cmetadata = this._rrd_cmetadata;
      return (SimpleBaseObject) redirectordestino;
    }

    public void SetSimpleObject(Simplet_redirectordestino Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._rrd_cnombre = Simple.rrd_cnombre;
      this._rrd_curl = Simple.rrd_curl;
      this._rrd_cconfig = Simple.rrd_cconfig;
      this._rrd_cmetadata = Simple.rrd_cmetadata;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_redirectordestino(SqlConfig, UserId, (Simplet_redirectordestino) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_curl", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_cconfig", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rrd_cmetadata", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["rrd_cnombre"] = (object) this._rrd_cnombre;
      row["rrd_curl"] = (object) this._rrd_curl;
      row["rrd_cconfig"] = (object) this._rrd_cconfig;
      row["rrd_cmetadata"] = (object) this._rrd_cmetadata;
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
