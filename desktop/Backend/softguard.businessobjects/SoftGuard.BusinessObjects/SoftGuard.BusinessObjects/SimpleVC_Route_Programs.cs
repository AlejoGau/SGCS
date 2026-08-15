// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleVC_Route_Programs
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
  public class SimpleVC_Route_Programs : SimpleBaseObject
  {
    [DataMember]
    public int routeId { get; set; }

    [DataMember]
    public string programtype { get; set; }

    [DataMember]
    public int starthour { get; set; }

    [DataMember]
    public int startminutes { get; set; }

    [DataMember]
    public int dayofweek { get; set; }

    [DataMember]
    public int dayofmonth { get; set; }

    public SimpleVC_Route_Programs()
    {
      this.InitClass();
    }

    public SimpleVC_Route_Programs(int Id, string Name, int routeId, string programtype, int starthour, int startminutes, int dayofweek, int dayofmonth)
    {
      this.Id = Id;
      this.Name = Name;
      this.routeId = routeId;
      this.programtype = programtype;
      this.starthour = starthour;
      this.startminutes = startminutes;
      this.dayofweek = dayofweek;
      this.dayofmonth = dayofmonth;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3119, "VC_Route_Programs");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalVC_Route_Programs(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerVC_Route_Programs callerVcRoutePrograms = new CallerVC_Route_Programs();
      callerVcRoutePrograms.Id = this.Id;
      callerVcRoutePrograms.Name = this.Name;
      callerVcRoutePrograms.routeId = this.routeId;
      callerVcRoutePrograms.programtype = this.programtype;
      callerVcRoutePrograms.starthour = this.starthour;
      callerVcRoutePrograms.startminutes = this.startminutes;
      callerVcRoutePrograms.dayofweek = this.dayofweek;
      callerVcRoutePrograms.dayofmonth = this.dayofmonth;
      return (CallerObject) callerVcRoutePrograms;
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
      row["routeId"] = (object) this.routeId ?? (object) DBNull.Value;
      row["programtype"] = (object) this.programtype ?? (object) DBNull.Value;
      row["starthour"] = (object) this.starthour ?? (object) DBNull.Value;
      row["startminutes"] = (object) this.startminutes ?? (object) DBNull.Value;
      row["dayofweek"] = (object) this.dayofweek ?? (object) DBNull.Value;
      row["dayofmonth"] = (object) this.dayofmonth ?? (object) DBNull.Value;
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
