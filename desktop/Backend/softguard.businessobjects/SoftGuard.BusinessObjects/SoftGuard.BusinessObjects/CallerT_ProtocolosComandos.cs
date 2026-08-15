// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerT_ProtocolosComandos
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerT_ProtocolosComandos : CallerObject
  {
    private string _pcm_cName;
    private string _pcm_cMetaData;
    private string _pcm_cComando;

    public string pcm_cName
    {
      get
      {
        return this._pcm_cName;
      }
      set
      {
        this._pcm_cName = value;
      }
    }

    public string pcm_cMetaData
    {
      get
      {
        return this._pcm_cMetaData;
      }
      set
      {
        this._pcm_cMetaData = value;
      }
    }

    public string pcm_cComando
    {
      get
      {
        return this._pcm_cComando;
      }
      set
      {
        this._pcm_cComando = value;
      }
    }

    public CallerT_ProtocolosComandos()
    {
      this.InitClass();
    }

    public CallerT_ProtocolosComandos(int Id, string Name, string pcm_cName, string pcm_cMetaData, string pcm_cComando)
    {
      this.Id = Id;
      this.Name = Name;
      this._pcm_cName = pcm_cName;
      this._pcm_cMetaData = pcm_cMetaData;
      this._pcm_cComando = pcm_cComando;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3160, "T_ProtocolosComandos");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleT_ProtocolosComandos protocolosComandos = new SimpleT_ProtocolosComandos();
      protocolosComandos.Id = this.Id;
      protocolosComandos.Name = this.Name;
      protocolosComandos.pcm_cName = this._pcm_cName;
      protocolosComandos.pcm_cMetaData = this._pcm_cMetaData;
      protocolosComandos.pcm_cComando = this._pcm_cComando;
      return (SimpleBaseObject) protocolosComandos;
    }

    public void SetSimpleObject(SimpleT_ProtocolosComandos Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._pcm_cName = Simple.pcm_cName;
      this._pcm_cMetaData = Simple.pcm_cMetaData;
      this._pcm_cComando = Simple.pcm_cComando;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalT_ProtocolosComandos(SqlConfig, UserId, (SimpleT_ProtocolosComandos) this.GetSimpleObject());
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
      row["pcm_cName"] = (object) this._pcm_cName;
      row["pcm_cMetaData"] = (object) this._pcm_cMetaData;
      row["pcm_cComando"] = (object) this._pcm_cComando;
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
