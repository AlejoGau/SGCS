// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_checkPoints_VC
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
  public class Simplet_checkPoints_VC : SimpleBaseObject
  {
    [DataMember]
    public string chp_cReference { get; set; }

    [DataMember]
    public string chp_cZona { get; set; }

    [DataMember]
    public int chp_iCuenta { get; set; }

    [DataMember]
    public float chp_rLatitud { get; set; }

    [DataMember]
    public float chp_rLongitud { get; set; }

    [DataMember]
    public Decimal chp_nTipo { get; set; }

    [DataMember]
    public int chp_iTolerancia { get; set; }

    public Simplet_checkPoints_VC()
    {
      this.InitClass();
    }

    public Simplet_checkPoints_VC(int Id, string Name, string chp_cReference, string chp_cZona, int chp_iCuenta, float chp_rLatitud, float chp_rLongitud, Decimal chp_nTipo, int chp_iTolerancia)
    {
      this.Id = Id;
      this.Name = Name;
      this.chp_cReference = chp_cReference;
      this.chp_cZona = chp_cZona;
      this.chp_iCuenta = chp_iCuenta;
      this.chp_rLatitud = chp_rLatitud;
      this.chp_rLongitud = chp_rLongitud;
      this.chp_nTipo = chp_nTipo;
      this.chp_iTolerancia = chp_iTolerancia;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3117, "t_checkPoints_VC");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_checkPoints_VC(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_checkPoints_VC callertCheckPointsVc = new Callert_checkPoints_VC();
      callertCheckPointsVc.Id = this.Id;
      callertCheckPointsVc.Name = this.Name;
      callertCheckPointsVc.chp_cReference = this.chp_cReference;
      callertCheckPointsVc.chp_cZona = this.chp_cZona;
      callertCheckPointsVc.chp_iCuenta = this.chp_iCuenta;
      callertCheckPointsVc.chp_rLatitud = this.chp_rLatitud;
      callertCheckPointsVc.chp_rLongitud = this.chp_rLongitud;
      callertCheckPointsVc.chp_nTipo = this.chp_nTipo;
      callertCheckPointsVc.chp_iTolerancia = this.chp_iTolerancia;
      return (CallerObject) callertCheckPointsVc;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_cReference", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_cZona", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_iCuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("chp_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("chp_rLongitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("chp_nTipo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("chp_iTolerancia", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["chp_cReference"] = (object) this.chp_cReference ?? (object) DBNull.Value;
      row["chp_cZona"] = (object) this.chp_cZona ?? (object) DBNull.Value;
      row["chp_iCuenta"] = (object) this.chp_iCuenta ?? (object) DBNull.Value;
      row["chp_rLatitud"] = (object) this.chp_rLatitud ?? (object) DBNull.Value;
      row["chp_rLongitud"] = (object) this.chp_rLongitud ?? (object) DBNull.Value;
      row["chp_nTipo"] = (object) this.chp_nTipo ?? (object) DBNull.Value;
      row["chp_iTolerancia"] = (object) this.chp_iTolerancia ?? (object) DBNull.Value;
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
