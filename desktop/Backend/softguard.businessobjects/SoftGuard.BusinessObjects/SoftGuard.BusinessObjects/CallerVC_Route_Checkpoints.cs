// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerVC_Route_Checkpoints
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerVC_Route_Checkpoints : CallerObject
  {
    private int _routeId;
    private int _checkpointId;
    private int _time;
    private int _beforetolerance;
    private int _aftertolerance;
    private int _order;

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

    public int checkpointId
    {
      get
      {
        return this._checkpointId;
      }
      set
      {
        this._checkpointId = value;
      }
    }

    public int time
    {
      get
      {
        return this._time;
      }
      set
      {
        this._time = value;
      }
    }

    public int beforetolerance
    {
      get
      {
        return this._beforetolerance;
      }
      set
      {
        this._beforetolerance = value;
      }
    }

    public int aftertolerance
    {
      get
      {
        return this._aftertolerance;
      }
      set
      {
        this._aftertolerance = value;
      }
    }

    public int order
    {
      get
      {
        return this._order;
      }
      set
      {
        this._order = value;
      }
    }

    public CallerVC_Route_Checkpoints()
    {
      this.InitClass();
    }

    public CallerVC_Route_Checkpoints(int Id, string Name, int routeId, int checkpointId, int time, int beforetolerance, int aftertolerance, int order)
    {
      this.Id = Id;
      this.Name = Name;
      this._routeId = routeId;
      this._checkpointId = checkpointId;
      this._time = time;
      this._beforetolerance = beforetolerance;
      this._aftertolerance = aftertolerance;
      this._order = order;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3120, "VC_Route_Checkpoints");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleVC_Route_Checkpoints routeCheckpoints = new SimpleVC_Route_Checkpoints();
      routeCheckpoints.Id = this.Id;
      routeCheckpoints.Name = this.Name;
      routeCheckpoints.routeId = this._routeId;
      routeCheckpoints.checkpointId = this._checkpointId;
      routeCheckpoints.time = this._time;
      routeCheckpoints.beforetolerance = this._beforetolerance;
      routeCheckpoints.aftertolerance = this._aftertolerance;
      routeCheckpoints.order = this._order;
      return (SimpleBaseObject) routeCheckpoints;
    }

    public void SetSimpleObject(SimpleVC_Route_Checkpoints Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._routeId = Simple.routeId;
      this._checkpointId = Simple.checkpointId;
      this._time = Simple.time;
      this._beforetolerance = Simple.beforetolerance;
      this._aftertolerance = Simple.aftertolerance;
      this._order = Simple.order;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalVC_Route_Checkpoints(SqlConfig, UserId, (SimpleVC_Route_Checkpoints) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("routeId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("checkpointId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("time", typeof (int)));
      dataTable.Columns.Add(new DataColumn("beforetolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("aftertolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("order", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["routeId"] = (object) this._routeId;
      row["checkpointId"] = (object) this._checkpointId;
      row["time"] = (object) this._time;
      row["beforetolerance"] = (object) this._beforetolerance;
      row["aftertolerance"] = (object) this._aftertolerance;
      row["order"] = (object) this._order;
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
