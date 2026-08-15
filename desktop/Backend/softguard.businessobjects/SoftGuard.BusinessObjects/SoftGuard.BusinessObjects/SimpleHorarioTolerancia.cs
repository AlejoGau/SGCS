// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleHorarioTolerancia
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
  public class SimpleHorarioTolerancia : SimpleBaseObject
  {
    [DataMember]
    public int tol_iidcuenta { get; set; }

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

    [DataMember]
    public DateTime? tol_dVacacionesHasta { get; set; }

    [DataMember]
    public DateTime? tol_dVacacionesDesde { get; set; }

    public SimpleHorarioTolerancia()
    {
      this.InitClass();
    }

    public SimpleHorarioTolerancia(int Id, string Name, int tol_iidcuenta, int tol_naperturaantes, string tol_caperturaantesalarma, int tol_naperturadespues, string tol_caperturadespuesalarma, int tol_ncierreantes, string tol_ccierreantesalarma, int tol_ncierredespues, string tol_ccierredespuesalarma, Decimal tol_nnyo, Decimal tol_nnyc, Decimal tol_nControl, Decimal tol_nModo, Decimal tol_nAPNYO, Decimal tol_nAPNYC, DateTime? tol_dVacacionesHasta, DateTime? tol_dVacacionesDesde)
    {
      this.Id = Id;
      this.Name = Name;
      this.tol_iidcuenta = tol_iidcuenta;
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
      this.tol_dVacacionesHasta = tol_dVacacionesHasta;
      this.tol_dVacacionesDesde = tol_dVacacionesDesde;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3008, "HorarioTolerancia");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalHorarioTolerancia(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerHorarioTolerancia horarioTolerancia = new CallerHorarioTolerancia();
      horarioTolerancia.Id = this.Id;
      horarioTolerancia.Name = this.Name;
      horarioTolerancia.tol_iidcuenta = this.tol_iidcuenta;
      horarioTolerancia.tol_naperturaantes = this.tol_naperturaantes;
      horarioTolerancia.tol_caperturaantesalarma = this.tol_caperturaantesalarma;
      horarioTolerancia.tol_naperturadespues = this.tol_naperturadespues;
      horarioTolerancia.tol_caperturadespuesalarma = this.tol_caperturadespuesalarma;
      horarioTolerancia.tol_ncierreantes = this.tol_ncierreantes;
      horarioTolerancia.tol_ccierreantesalarma = this.tol_ccierreantesalarma;
      horarioTolerancia.tol_ncierredespues = this.tol_ncierredespues;
      horarioTolerancia.tol_ccierredespuesalarma = this.tol_ccierredespuesalarma;
      horarioTolerancia.tol_nnyo = this.tol_nnyo;
      horarioTolerancia.tol_nnyc = this.tol_nnyc;
      horarioTolerancia.tol_nControl = this.tol_nControl;
      horarioTolerancia.tol_nModo = this.tol_nModo;
      horarioTolerancia.tol_nAPNYO = this.tol_nAPNYO;
      horarioTolerancia.tol_nAPNYC = this.tol_nAPNYC;
      horarioTolerancia.tol_dVacacionesHasta = this.tol_dVacacionesHasta;
      horarioTolerancia.tol_dVacacionesDesde = this.tol_dVacacionesDesde;
      return (CallerObject) horarioTolerancia;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tol_iidcuenta", typeof (int)));
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
      dataTable.Columns.Add(new DataColumn("tol_dVacacionesHasta", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("tol_dVacacionesDesde", typeof (DateTime)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tol_iidcuenta"] = (object) this.tol_iidcuenta ?? (object) DBNull.Value;
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
      row["tol_dVacacionesHasta"] = (object) this.tol_dVacacionesHasta ?? (object) DBNull.Value;
      row["tol_dVacacionesDesde"] = (object) this.tol_dVacacionesDesde ?? (object) DBNull.Value;
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
