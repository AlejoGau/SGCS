// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleHorarioToleranciaPlanilla
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
  public class SimpleHorarioToleranciaPlanilla : SimpleBaseObject
  {
    [DataMember]
    public int tol_iid { get; set; }

    [DataMember]
    public int tol_naperturaantes { get; set; }

    [DataMember]
    public string tol_caperturaantesalarma { get; set; }

    [DataMember]
    public int tol_naperturadespues { get; set; }

    [DataMember]
    public string tol_caperturadespuesalarma { get; set; }

    [DataMember]
    public int tol_ncierreantes { get; set; }

    [DataMember]
    public string tol_ccierreantesalarma { get; set; }

    [DataMember]
    public int tol_ncierredespues { get; set; }

    [DataMember]
    public string tol_ccierredespuesalarma { get; set; }

    [DataMember]
    public Decimal tol_nnyo { get; set; }

    [DataMember]
    public Decimal tol_nnyc { get; set; }

    [DataMember]
    public Decimal tol_nControl { get; set; }

    [DataMember]
    public Decimal tol_nModo { get; set; }

    [DataMember]
    public Decimal tol_nAPNYO { get; set; }

    [DataMember]
    public Decimal tol_nAPNYC { get; set; }

    public SimpleHorarioToleranciaPlanilla()
    {
      this.InitClass();
    }

    public SimpleHorarioToleranciaPlanilla(int Id, string Name, int tol_iid, int tol_naperturaantes, string tol_caperturaantesalarma, int tol_naperturadespues, string tol_caperturadespuesalarma, int tol_ncierreantes, string tol_ccierreantesalarma, int tol_ncierredespues, string tol_ccierredespuesalarma, Decimal tol_nnyo, Decimal tol_nnyc, Decimal tol_nControl, Decimal tol_nModo, Decimal tol_nAPNYO, Decimal tol_nAPNYC)
    {
      this.Id = Id;
      this.Name = Name;
      this.tol_iid = tol_iid;
      this.tol_naperturaantes = tol_naperturaantes;
      this.tol_caperturaantesalarma = tol_caperturaantesalarma;
      this.tol_naperturadespues = tol_naperturadespues;
      this.tol_caperturadespuesalarma = tol_caperturadespuesalarma;
      this.tol_ncierreantes = tol_ncierreantes;
      this.tol_ccierreantesalarma = tol_ccierreantesalarma;
      this.tol_ncierredespues = tol_ncierredespues;
      this.tol_ccierredespuesalarma = tol_ccierredespuesalarma;
      this.tol_nnyo = tol_nnyo;
      this.tol_nnyc = tol_nnyc;
      this.tol_nControl = tol_nControl;
      this.tol_nModo = tol_nModo;
      this.tol_nAPNYO = tol_nAPNYO;
      this.tol_nAPNYC = tol_nAPNYC;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3009, "HorarioToleranciaPlanilla");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalHorarioToleranciaPlanilla(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioToleranciaPlanilla toleranciaPlanilla = new CallerHorarioToleranciaPlanilla();
      toleranciaPlanilla.Id = this.Id;
      toleranciaPlanilla.Name = this.Name;
      toleranciaPlanilla.tol_iid = this.tol_iid;
      toleranciaPlanilla.tol_naperturaantes = this.tol_naperturaantes;
      toleranciaPlanilla.tol_caperturaantesalarma = this.tol_caperturaantesalarma;
      toleranciaPlanilla.tol_naperturadespues = this.tol_naperturadespues;
      toleranciaPlanilla.tol_caperturadespuesalarma = this.tol_caperturadespuesalarma;
      toleranciaPlanilla.tol_ncierreantes = this.tol_ncierreantes;
      toleranciaPlanilla.tol_ccierreantesalarma = this.tol_ccierreantesalarma;
      toleranciaPlanilla.tol_ncierredespues = this.tol_ncierredespues;
      toleranciaPlanilla.tol_ccierredespuesalarma = this.tol_ccierredespuesalarma;
      toleranciaPlanilla.tol_nnyo = this.tol_nnyo;
      toleranciaPlanilla.tol_nnyc = this.tol_nnyc;
      toleranciaPlanilla.tol_nControl = this.tol_nControl;
      toleranciaPlanilla.tol_nModo = this.tol_nModo;
      toleranciaPlanilla.tol_nAPNYO = this.tol_nAPNYO;
      toleranciaPlanilla.tol_nAPNYC = this.tol_nAPNYC;
      return (CallerObject) toleranciaPlanilla;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_naperturaantes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_caperturaantesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_naperturadespues", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_caperturadespuesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_ncierreantes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_ccierreantesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_ncierredespues", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tol_ccierredespuesalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_nnyo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nnyc", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nControl", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nModo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nAPNYO", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tol_nAPNYC", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tol_iid"] = (object) this.tol_iid ?? (object) DBNull.Value;
      row["tol_naperturaantes"] = (object) this.tol_naperturaantes ?? (object) DBNull.Value;
      row["tol_caperturaantesalarma"] = (object) this.tol_caperturaantesalarma ?? (object) DBNull.Value;
      row["tol_naperturadespues"] = (object) this.tol_naperturadespues ?? (object) DBNull.Value;
      row["tol_caperturadespuesalarma"] = (object) this.tol_caperturadespuesalarma ?? (object) DBNull.Value;
      row["tol_ncierreantes"] = (object) this.tol_ncierreantes ?? (object) DBNull.Value;
      row["tol_ccierreantesalarma"] = (object) this.tol_ccierreantesalarma ?? (object) DBNull.Value;
      row["tol_ncierredespues"] = (object) this.tol_ncierredespues ?? (object) DBNull.Value;
      row["tol_ccierredespuesalarma"] = (object) this.tol_ccierredespuesalarma ?? (object) DBNull.Value;
      row["tol_nnyo"] = (object) this.tol_nnyo ?? (object) DBNull.Value;
      row["tol_nnyc"] = (object) this.tol_nnyc ?? (object) DBNull.Value;
      row["tol_nControl"] = (object) this.tol_nControl ?? (object) DBNull.Value;
      row["tol_nModo"] = (object) this.tol_nModo ?? (object) DBNull.Value;
      row["tol_nAPNYO"] = (object) this.tol_nAPNYO ?? (object) DBNull.Value;
      row["tol_nAPNYC"] = (object) this.tol_nAPNYC ?? (object) DBNull.Value;
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
