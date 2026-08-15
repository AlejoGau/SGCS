// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_tipos_formapago_fc
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
  public class Simplet_tipos_formapago_fc : SimpleBaseObject
  {
    [DataMember]
    public string tfp_ccodigo { get; set; }

    [DataMember]
    public string tfp_cdescripcion { get; set; }

    public Simplet_tipos_formapago_fc()
    {
      this.InitClass();
    }

    public Simplet_tipos_formapago_fc(int Id, string Name, string tfp_ccodigo, string tfp_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this.tfp_ccodigo = tfp_ccodigo;
      this.tfp_cdescripcion = tfp_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3146, "t_tipos_formapago_fc");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_tipos_formapago_fc(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_tipos_formapago_fc tiposFormapagoFc = new Callert_tipos_formapago_fc();
      tiposFormapagoFc.Id = this.Id;
      tiposFormapagoFc.Name = this.Name;
      tiposFormapagoFc.tfp_ccodigo = this.tfp_ccodigo;
      tiposFormapagoFc.tfp_cdescripcion = this.tfp_cdescripcion;
      return (CallerObject) tiposFormapagoFc;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tfp_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tfp_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tfp_ccodigo"] = (object) this.tfp_ccodigo ?? (object) DBNull.Value;
      row["tfp_cdescripcion"] = (object) this.tfp_cdescripcion ?? (object) DBNull.Value;
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
