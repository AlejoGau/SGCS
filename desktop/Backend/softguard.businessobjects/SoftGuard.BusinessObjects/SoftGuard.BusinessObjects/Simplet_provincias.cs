// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_provincias
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
  public class Simplet_provincias : SimpleBaseObject
  {
    [DataMember]
    public string pro_ccodigo { get; set; }

    [DataMember]
    public string pro_cdescripcion { get; set; }

    [DataMember]
    public string pro_cletra { get; set; }

    [DataMember]
    public Decimal pro_nTipo { get; set; }

    [DataMember]
    public int pro_iParentID { get; set; }

    public Simplet_provincias()
    {
      this.InitClass();
    }

    public Simplet_provincias(int Id, string Name, string pro_ccodigo, string pro_cdescripcion, string pro_cletra, Decimal pro_nTipo, int pro_iParentID)
    {
      this.Id = Id;
      this.Name = Name;
      this.pro_ccodigo = pro_ccodigo;
      this.pro_cdescripcion = pro_cdescripcion;
      this.pro_cletra = pro_cletra;
      this.pro_nTipo = pro_nTipo;
      this.pro_iParentID = pro_iParentID;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3076, "t_provincias");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_provincias(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_provincias callertProvincias = new Callert_provincias();
      callertProvincias.Id = this.Id;
      callertProvincias.Name = this.Name;
      callertProvincias.pro_ccodigo = this.pro_ccodigo;
      callertProvincias.pro_cdescripcion = this.pro_cdescripcion;
      callertProvincias.pro_cletra = this.pro_cletra;
      callertProvincias.pro_nTipo = this.pro_nTipo;
      callertProvincias.pro_iParentID = this.pro_iParentID;
      return (CallerObject) callertProvincias;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_cletra", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_nTipo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pro_iParentID", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pro_ccodigo"] = (object) this.pro_ccodigo ?? (object) DBNull.Value;
      row["pro_cdescripcion"] = (object) this.pro_cdescripcion ?? (object) DBNull.Value;
      row["pro_cletra"] = (object) this.pro_cletra ?? (object) DBNull.Value;
      row["pro_nTipo"] = (object) this.pro_nTipo ?? (object) DBNull.Value;
      row["pro_iParentID"] = (object) this.pro_iParentID ?? (object) DBNull.Value;
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
