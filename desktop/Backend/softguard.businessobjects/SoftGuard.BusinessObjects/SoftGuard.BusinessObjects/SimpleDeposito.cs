// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleDeposito
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
  public class SimpleDeposito : SimpleBaseObject
  {
    [DataMember]
    public string dep_ccodigo { get; set; }

    [DataMember]
    public string dep_cdescripcion { get; set; }

    public SimpleDeposito()
    {
      this.InitClass();
    }

    public SimpleDeposito(int Id, string Name, string dep_ccodigo, string dep_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this.dep_ccodigo = dep_ccodigo;
      this.dep_cdescripcion = dep_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3026, "Deposito");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalDeposito(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerDeposito callerDeposito = new CallerDeposito();
      callerDeposito.Id = this.Id;
      callerDeposito.Name = this.Name;
      callerDeposito.dep_ccodigo = this.dep_ccodigo;
      callerDeposito.dep_cdescripcion = this.dep_cdescripcion;
      return (CallerObject) callerDeposito;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dep_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dep_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["dep_ccodigo"] = (object) this.dep_ccodigo ?? (object) DBNull.Value;
      row["dep_cdescripcion"] = (object) this.dep_cdescripcion ?? (object) DBNull.Value;
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
