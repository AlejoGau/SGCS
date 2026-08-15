// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_puertos
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
  public class Simplet_puertos : SimpleBaseObject
  {
    [DataMember]
    public int pue_icodigo { get; set; }

    [DataMember]
    public string pue_cdescripcion { get; set; }

    [DataMember]
    public int pue_ireceptor { get; set; }

    [DataMember]
    public Decimal pue_npuerto { get; set; }

    [DataMember]
    public Decimal pue_ndatabits { get; set; }

    [DataMember]
    public Decimal pue_nstopbits { get; set; }

    [DataMember]
    public Decimal pue_nbaudrate { get; set; }

    [DataMember]
    public Decimal pue_nparity { get; set; }

    [DataMember]
    public Decimal pue_nflowctrl { get; set; }

    [DataMember]
    public Decimal pue_nbufferin { get; set; }

    [DataMember]
    public Decimal pue_nbufferout { get; set; }

    [DataMember]
    public Decimal pue_nrts { get; set; }

    [DataMember]
    public Decimal pue_ndtr { get; set; }

    [DataMember]
    public Decimal pue_nestado { get; set; }

    [DataMember]
    public Decimal pue_crespondeack { get; set; }

    [DataMember]
    public int pue_itiempoinactividad { get; set; }

    [DataMember]
    public Decimal pue_cresetxhb { get; set; }

    public Simplet_puertos()
    {
      this.InitClass();
    }

    public Simplet_puertos(int Id, string Name, int pue_icodigo, string pue_cdescripcion, int pue_ireceptor, Decimal pue_npuerto, Decimal pue_ndatabits, Decimal pue_nstopbits, Decimal pue_nbaudrate, Decimal pue_nparity, Decimal pue_nflowctrl, Decimal pue_nbufferin, Decimal pue_nbufferout, Decimal pue_nrts, Decimal pue_ndtr, Decimal pue_nestado, Decimal pue_crespondeack, int pue_itiempoinactividad, Decimal pue_cresetxhb)
    {
      this.Id = Id;
      this.Name = Name;
      this.pue_icodigo = pue_icodigo;
      this.pue_cdescripcion = pue_cdescripcion;
      this.pue_ireceptor = pue_ireceptor;
      this.pue_npuerto = pue_npuerto;
      this.pue_ndatabits = pue_ndatabits;
      this.pue_nstopbits = pue_nstopbits;
      this.pue_nbaudrate = pue_nbaudrate;
      this.pue_nparity = pue_nparity;
      this.pue_nflowctrl = pue_nflowctrl;
      this.pue_nbufferin = pue_nbufferin;
      this.pue_nbufferout = pue_nbufferout;
      this.pue_nrts = pue_nrts;
      this.pue_ndtr = pue_ndtr;
      this.pue_nestado = pue_nestado;
      this.pue_crespondeack = pue_crespondeack;
      this.pue_itiempoinactividad = pue_itiempoinactividad;
      this.pue_cresetxhb = pue_cresetxhb;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3091, "t_puertos");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_puertos(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_puertos callertPuertos = new Callert_puertos();
      callertPuertos.Id = this.Id;
      callertPuertos.Name = this.Name;
      callertPuertos.pue_icodigo = this.pue_icodigo;
      callertPuertos.pue_cdescripcion = this.pue_cdescripcion;
      callertPuertos.pue_ireceptor = this.pue_ireceptor;
      callertPuertos.pue_npuerto = this.pue_npuerto;
      callertPuertos.pue_ndatabits = this.pue_ndatabits;
      callertPuertos.pue_nstopbits = this.pue_nstopbits;
      callertPuertos.pue_nbaudrate = this.pue_nbaudrate;
      callertPuertos.pue_nparity = this.pue_nparity;
      callertPuertos.pue_nflowctrl = this.pue_nflowctrl;
      callertPuertos.pue_nbufferin = this.pue_nbufferin;
      callertPuertos.pue_nbufferout = this.pue_nbufferout;
      callertPuertos.pue_nrts = this.pue_nrts;
      callertPuertos.pue_ndtr = this.pue_ndtr;
      callertPuertos.pue_nestado = this.pue_nestado;
      callertPuertos.pue_crespondeack = this.pue_crespondeack;
      callertPuertos.pue_itiempoinactividad = this.pue_itiempoinactividad;
      callertPuertos.pue_cresetxhb = this.pue_cresetxhb;
      return (CallerObject) callertPuertos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pue_icodigo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pue_ireceptor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_npuerto", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_ndatabits", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nstopbits", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbaudrate", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nparity", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nflowctrl", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbufferin", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nbufferout", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nrts", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_ndtr", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_crespondeack", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pue_itiempoinactividad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("pue_cresetxhb", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pue_icodigo"] = (object) this.pue_icodigo ?? (object) DBNull.Value;
      row["pue_cdescripcion"] = (object) this.pue_cdescripcion ?? (object) DBNull.Value;
      row["pue_ireceptor"] = (object) this.pue_ireceptor ?? (object) DBNull.Value;
      row["pue_npuerto"] = (object) this.pue_npuerto ?? (object) DBNull.Value;
      row["pue_ndatabits"] = (object) this.pue_ndatabits ?? (object) DBNull.Value;
      row["pue_nstopbits"] = (object) this.pue_nstopbits ?? (object) DBNull.Value;
      row["pue_nbaudrate"] = (object) this.pue_nbaudrate ?? (object) DBNull.Value;
      row["pue_nparity"] = (object) this.pue_nparity ?? (object) DBNull.Value;
      row["pue_nflowctrl"] = (object) this.pue_nflowctrl ?? (object) DBNull.Value;
      row["pue_nbufferin"] = (object) this.pue_nbufferin ?? (object) DBNull.Value;
      row["pue_nbufferout"] = (object) this.pue_nbufferout ?? (object) DBNull.Value;
      row["pue_nrts"] = (object) this.pue_nrts ?? (object) DBNull.Value;
      row["pue_ndtr"] = (object) this.pue_ndtr ?? (object) DBNull.Value;
      row["pue_nestado"] = (object) this.pue_nestado ?? (object) DBNull.Value;
      row["pue_crespondeack"] = (object) this.pue_crespondeack ?? (object) DBNull.Value;
      row["pue_itiempoinactividad"] = (object) this.pue_itiempoinactividad ?? (object) DBNull.Value;
      row["pue_cresetxhb"] = (object) this.pue_cresetxhb ?? (object) DBNull.Value;
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
