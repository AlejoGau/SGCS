// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleVC_Routes
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
  public class SimpleVC_Routes : SimpleBaseObject
  {
    [DataMember]
    public int cuentaId { get; set; }

    [DataMember]
    public int userId { get; set; }

    [DataMember]
    public string routetype { get; set; }

    [DataMember]
    public DateTime? datestart { get; set; }

    [DataMember]
    public int time { get; set; }

    [DataMember]
    public int startbeforetolerance { get; set; }

    [DataMember]
    public int startaftertolerance { get; set; }

    [DataMember]
    public int endbeforetolerance { get; set; }

    [DataMember]
    public int endaftertolerance { get; set; }

    public SimpleVC_Routes()
    {
      this.InitClass();
    }

    public SimpleVC_Routes(int Id, string Name, int cuentaId, int userId, string routetype, DateTime? datestart, int time, int startbeforetolerance, int startaftertolerance, int endbeforetolerance, int endaftertolerance)
    {
      this.Id = Id;
      this.Name = Name;
      this.cuentaId = cuentaId;
      this.userId = userId;
      this.routetype = routetype;
      this.datestart = datestart;
      this.time = time;
      this.startbeforetolerance = startbeforetolerance;
      this.startaftertolerance = startaftertolerance;
      this.endbeforetolerance = endbeforetolerance;
      this.endaftertolerance = endaftertolerance;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3118, "VC_Routes");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalVC_Routes(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerVC_Routes callerVcRoutes = new CallerVC_Routes();
      callerVcRoutes.Id = this.Id;
      callerVcRoutes.Name = this.Name;
      callerVcRoutes.cuentaId = this.cuentaId;
      callerVcRoutes.userId = this.userId;
      callerVcRoutes.routetype = this.routetype;
      callerVcRoutes.datestart = this.datestart;
      callerVcRoutes.time = this.time;
      callerVcRoutes.startbeforetolerance = this.startbeforetolerance;
      callerVcRoutes.startaftertolerance = this.startaftertolerance;
      callerVcRoutes.endbeforetolerance = this.endbeforetolerance;
      callerVcRoutes.endaftertolerance = this.endaftertolerance;
      return (CallerObject) callerVcRoutes;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("cuentaId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("userId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("routetype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("datestart", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("time", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startbeforetolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startaftertolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endbeforetolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endaftertolerance", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["cuentaId"] = (object) this.cuentaId ?? (object) DBNull.Value;
      row["userId"] = (object) this.userId ?? (object) DBNull.Value;
      row["routetype"] = (object) this.routetype ?? (object) DBNull.Value;
      row["datestart"] = (object) this.datestart ?? (object) DBNull.Value;
      row["time"] = (object) this.time ?? (object) DBNull.Value;
      row["startbeforetolerance"] = (object) this.startbeforetolerance ?? (object) DBNull.Value;
      row["startaftertolerance"] = (object) this.startaftertolerance ?? (object) DBNull.Value;
      row["endbeforetolerance"] = (object) this.endbeforetolerance ?? (object) DBNull.Value;
      row["endaftertolerance"] = (object) this.endaftertolerance ?? (object) DBNull.Value;
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
