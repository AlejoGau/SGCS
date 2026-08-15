// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerVC_Route_Programs
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerVC_Route_Programs : CallerObject
  {
    private int _routeId;
    private string _programtype;
    private int _starthour;
    private int _startminutes;
    private int _dayofweek;
    private int _dayofmonth;

    public int routeId
    {
      get
      {
        return this._routeId;
      }
      set
      {
        this._routeId = value;
      }
    }

    public string programtype
    {
      get
      {
        return this._programtype;
      }
      set
      {
        this._programtype = value;
      }
    }

    public int starthour
    {
      get
      {
        return this._starthour;
      }
      set
      {
        this._starthour = value;
      }
    }

    public int startminutes
    {
      get
      {
        return this._startminutes;
      }
      set
      {
        this._startminutes = value;
      }
    }

    public int dayofweek
    {
      get
      {
        return this._dayofweek;
      }
      set
      {
        this._dayofweek = value;
      }
    }

    public int dayofmonth
    {
      get
      {
        return this._dayofmonth;
      }
      set
      {
        this._dayofmonth = value;
      }
    }

    public CallerVC_Route_Programs()
    {
      this.InitClass();
    }

    public CallerVC_Route_Programs(int Id, string Name, int routeId, string programtype, int starthour, int startminutes, int dayofweek, int dayofmonth)
    {
      this.Id = Id;
      this.Name = Name;
      this._routeId = routeId;
      this._programtype = programtype;
      this._starthour = starthour;
      this._startminutes = startminutes;
      this._dayofweek = dayofweek;
      this._dayofmonth = dayofmonth;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3119, "VC_Route_Programs");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleVC_Route_Programs simpleVcRoutePrograms = new SimpleVC_Route_Programs();
      simpleVcRoutePrograms.Id = this.Id;
      simpleVcRoutePrograms.Name = this.Name;
      simpleVcRoutePrograms.routeId = this._routeId;
      simpleVcRoutePrograms.programtype = this._programtype;
      simpleVcRoutePrograms.starthour = this._starthour;
      simpleVcRoutePrograms.startminutes = this._startminutes;
      simpleVcRoutePrograms.dayofweek = this._dayofweek;
      simpleVcRoutePrograms.dayofmonth = this._dayofmonth;
      return (SimpleBaseObject) simpleVcRoutePrograms;
    }

    public void SetSimpleObject(SimpleVC_Route_Programs Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._routeId = Simple.routeId;
      this._programtype = Simple.programtype;
      this._starthour = Simple.starthour;
      this._startminutes = Simple.startminutes;
      this._dayofweek = Simple.dayofweek;
      this._dayofmonth = Simple.dayofmonth;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalVC_Route_Programs(SqlConfig, UserId, (SimpleVC_Route_Programs) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("routeId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("programtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("starthour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofweek", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofmonth", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["routeId"] = (object) this._routeId;
      row["programtype"] = (object) this._programtype;
      row["starthour"] = (object) this._starthour;
      row["startminutes"] = (object) this._startminutes;
      row["dayofweek"] = (object) this._dayofweek;
      row["dayofmonth"] = (object) this._dayofmonth;
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
