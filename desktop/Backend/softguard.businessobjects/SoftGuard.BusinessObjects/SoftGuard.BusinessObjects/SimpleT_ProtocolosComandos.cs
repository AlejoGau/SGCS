// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleT_ProtocolosComandos
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
  public class SimpleT_ProtocolosComandos : SimpleBaseObject
  {
    [DataMember]
    public string pcm_cName { get; set; }

    [DataMember]
    public string pcm_cMetaData { get; set; }

    [DataMember]
    public string pcm_cComando { get; set; }

    public SimpleT_ProtocolosComandos()
    {
      this.InitClass();
    }

    public SimpleT_ProtocolosComandos(int Id, string Name, string pcm_cName, string pcm_cMetaData, string pcm_cComando)
    {
      this.Id = Id;
      this.Name = Name;
      this.pcm_cName = pcm_cName;
      this.pcm_cMetaData = pcm_cMetaData;
      this.pcm_cComando = pcm_cComando;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3160, "T_ProtocolosComandos");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalT_ProtocolosComandos(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerT_ProtocolosComandos protocolosComandos = new CallerT_ProtocolosComandos();
      protocolosComandos.Id = this.Id;
      protocolosComandos.Name = this.Name;
      protocolosComandos.pcm_cName = this.pcm_cName;
      protocolosComandos.pcm_cMetaData = this.pcm_cMetaData;
      protocolosComandos.pcm_cComando = this.pcm_cComando;
      return (CallerObject) protocolosComandos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pcm_cName", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pcm_cMetaData", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pcm_cComando", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pcm_cName"] = (object) this.pcm_cName ?? (object) DBNull.Value;
      row["pcm_cMetaData"] = (object) this.pcm_cMetaData ?? (object) DBNull.Value;
      row["pcm_cComando"] = (object) this.pcm_cComando ?? (object) DBNull.Value;
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
