// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleVC_Route_Checkpoints
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Runtime.Serialization;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  [DataContract]
  public class SimpleVC_Route_Checkpoints : SimpleBaseObject
  {
    [DataMember]
    public int routeId { get; set; }

    [DataMember]
    public int checkpointId { get; set; }

    [DataMember]
    public int time { get; set; }

    [DataMember]
    public int beforetolerance { get; set; }

    [DataMember]
    public int aftertolerance { get; set; }

    [DataMember]
    public int order { get; set; }

    public SimpleVC_Route_Checkpoints()
    {
      this.InitClass();
    }

    public SimpleVC_Route_Checkpoints(int Id, string Name, int routeId, int checkpointId, int time, int beforetolerance, int aftertolerance, int order)
    {
      this.Id = Id;
      this.Name = Name;
      this.routeId = routeId;
      this.checkpointId = checkpointId;
      this.time = time;
      this.beforetolerance = beforetolerance;
      this.aftertolerance = aftertolerance;
      this.order = order;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3120, "VC_Route_Checkpoints");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalVC_Route_Checkpoints(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerVC_Route_Checkpoints routeCheckpoints = new CallerVC_Route_Checkpoints();
      routeCheckpoints.Id = this.Id;
      routeCheckpoints.Name = this.Name;
      routeCheckpoints.routeId = this.routeId;
      routeCheckpoints.checkpointId = this.checkpointId;
      routeCheckpoints.time = this.time;
      routeCheckpoints.beforetolerance = this.beforetolerance;
      routeCheckpoints.aftertolerance = this.aftertolerance;
      routeCheckpoints.order = this.order;
      return (CallerObject) routeCheckpoints;
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
      row["routeId"] = (object) this.routeId ?? (object) DBNull.Value;
      row["checkpointId"] = (object) this.checkpointId ?? (object) DBNull.Value;
      row["time"] = (object) this.time ?? (object) DBNull.Value;
      row["beforetolerance"] = (object) this.beforetolerance ?? (object) DBNull.Value;
      row["aftertolerance"] = (object) this.aftertolerance ?? (object) DBNull.Value;
      row["order"] = (object) this.order ?? (object) DBNull.Value;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Object") { EnforceConstraints = false, Tables = { this.GetDataObject(), this.Type.GetDataObject() } });
      if (this.CallerObject != null)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;
      if (this.Dependencies.Count != 0)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
