// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_mailConnector
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_mailConnector : CallerObject
  {
    private string _mcn_name;
    private string _mcn_username;
    private string _mcn_password;
    private string _mcn_popserver;
    private int _mcn_popport;
    private int _mcn_popssl;
    private int _mcn_ipconid;

    public string mcn_name
    {
      get
      {
        return this._mcn_name;
      }
      set
      {
        this._mcn_name = value;
      }
    }

    public string mcn_username
    {
      get
      {
        return this._mcn_username;
      }
      set
      {
        this._mcn_username = value;
      }
    }

    public string mcn_password
    {
      get
      {
        return this._mcn_password;
      }
      set
      {
        this._mcn_password = value;
      }
    }

    public string mcn_popserver
    {
      get
      {
        return this._mcn_popserver;
      }
      set
      {
        this._mcn_popserver = value;
      }
    }

    public int mcn_popport
    {
      get
      {
        return this._mcn_popport;
      }
      set
      {
        this._mcn_popport = value;
      }
    }

    public int mcn_popssl
    {
      get
      {
        return this._mcn_popssl;
      }
      set
      {
        this._mcn_popssl = value;
      }
    }

    public int mcn_ipconid
    {
      get
      {
        return this._mcn_ipconid;
      }
      set
      {
        this._mcn_ipconid = value;
      }
    }

    public Callert_mailConnector()
    {
      this.InitClass();
    }

    public Callert_mailConnector(int Id, string Name, string mcn_name, string mcn_username, string mcn_password, string mcn_popserver, int mcn_popport, int mcn_popssl, int mcn_ipconid)
    {
      this.Id = Id;
      this.Name = Name;
      this._mcn_name = mcn_name;
      this._mcn_username = mcn_username;
      this._mcn_password = mcn_password;
      this._mcn_popserver = mcn_popserver;
      this._mcn_popport = mcn_popport;
      this._mcn_popssl = mcn_popssl;
      this._mcn_ipconid = mcn_ipconid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3137, "t_mailConnector");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_mailConnector simpletMailConnector = new Simplet_mailConnector();
      simpletMailConnector.Id = this.Id;
      simpletMailConnector.Name = this.Name;
      simpletMailConnector.mcn_name = this._mcn_name;
      simpletMailConnector.mcn_username = this._mcn_username;
      simpletMailConnector.mcn_password = this._mcn_password;
      simpletMailConnector.mcn_popserver = this._mcn_popserver;
      simpletMailConnector.mcn_popport = this._mcn_popport;
      simpletMailConnector.mcn_popssl = this._mcn_popssl;
      simpletMailConnector.mcn_ipconid = this._mcn_ipconid;
      return (SimpleBaseObject) simpletMailConnector;
    }

    public void SetSimpleObject(Simplet_mailConnector Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._mcn_name = Simple.mcn_name;
      this._mcn_username = Simple.mcn_username;
      this._mcn_password = Simple.mcn_password;
      this._mcn_popserver = Simple.mcn_popserver;
      this._mcn_popport = Simple.mcn_popport;
      this._mcn_popssl = Simple.mcn_popssl;
      this._mcn_ipconid = Simple.mcn_ipconid;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_mailConnector(SqlConfig, UserId, (Simplet_mailConnector) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_username", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_password", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_popserver", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_popport", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mcn_popssl", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mcn_ipconid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["mcn_name"] = (object) this._mcn_name;
      row["mcn_username"] = (object) this._mcn_username;
      row["mcn_password"] = (object) this._mcn_password;
      row["mcn_popserver"] = (object) this._mcn_popserver;
      row["mcn_popport"] = (object) this._mcn_popport;
      row["mcn_popssl"] = (object) this._mcn_popssl;
      row["mcn_ipconid"] = (object) this._mcn_ipconid;
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
