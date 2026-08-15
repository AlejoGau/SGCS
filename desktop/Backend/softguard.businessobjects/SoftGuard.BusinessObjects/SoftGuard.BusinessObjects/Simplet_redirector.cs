// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_redirector
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
  public class Simplet_redirector : SimpleBaseObject
  {
    [DataMember]
    public string trd_cnombre { get; set; }

    [DataMember]
    public string trd_cdealer { get; set; }

    [DataMember]
    public string trd_ceventos { get; set; }

    [DataMember]
    public int trd_idestino { get; set; }

    public Simplet_redirector()
    {
      this.InitClass();
    }

    public Simplet_redirector(int Id, string Name, string trd_cnombre, string trd_cdealer, string trd_ceventos, int trd_idestino)
    {
      this.Id = Id;
      this.Name = Name;
      this.trd_cnombre = trd_cnombre;
      this.trd_cdealer = trd_cdealer;
      this.trd_ceventos = trd_ceventos;
      this.trd_idestino = trd_idestino;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3138, "t_redirector");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_redirector(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_redirector callertRedirector = new Callert_redirector();
      callertRedirector.Id = this.Id;
      callertRedirector.Name = this.Name;
      callertRedirector.trd_cnombre = this.trd_cnombre;
      callertRedirector.trd_cdealer = this.trd_cdealer;
      callertRedirector.trd_ceventos = this.trd_ceventos;
      callertRedirector.trd_idestino = this.trd_idestino;
      return (CallerObject) callertRedirector;
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
      row["trd_cnombre"] = (object) this.trd_cnombre ?? (object) DBNull.Value;
      row["trd_cdealer"] = (object) this.trd_cdealer ?? (object) DBNull.Value;
      row["trd_ceventos"] = (object) this.trd_ceventos ?? (object) DBNull.Value;
      row["trd_idestino"] = (object) this.trd_idestino ?? (object) DBNull.Value;
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
