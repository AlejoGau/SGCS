// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_movilespatrulla
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
  public class Simplet_movilespatrulla : SimpleBaseObject
  {
    [DataMember]
    public string tmp_cnombre { get; set; }

    [DataMember]
    public string tmp_cnumero { get; set; }

    [DataMember]
    public string tmp_clicencia { get; set; }

    [DataMember]
    public string tmp_cmarca { get; set; }

    [DataMember]
    public string tmp_cmodelo { get; set; }

    [DataMember]
    public string tmp_cpathfoto { get; set; }

    [DataMember]
    public string tmp_cflota { get; set; }

    [DataMember]
    public Decimal tmp_nestado { get; set; }

    [DataMember]
    public int tmp_icuenta { get; set; }

    [DataMember]
    public int tmp_iAsignado { get; set; }

    public Simplet_movilespatrulla()
    {
      this.InitClass();
    }

    public Simplet_movilespatrulla(int Id, string Name, string tmp_cnombre, string tmp_cnumero, string tmp_clicencia, string tmp_cmarca, string tmp_cmodelo, string tmp_cpathfoto, string tmp_cflota, Decimal tmp_nestado, int tmp_icuenta, int tmp_iAsignado)
    {
      this.Id = Id;
      this.Name = Name;
      this.tmp_cnombre = tmp_cnombre;
      this.tmp_cnumero = tmp_cnumero;
      this.tmp_clicencia = tmp_clicencia;
      this.tmp_cmarca = tmp_cmarca;
      this.tmp_cmodelo = tmp_cmodelo;
      this.tmp_cpathfoto = tmp_cpathfoto;
      this.tmp_cflota = tmp_cflota;
      this.tmp_nestado = tmp_nestado;
      this.tmp_icuenta = tmp_icuenta;
      this.tmp_iAsignado = tmp_iAsignado;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3087, "t_movilespatrulla");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_movilespatrulla(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_movilespatrulla callertMovilespatrulla = new Callert_movilespatrulla();
      callertMovilespatrulla.Id = this.Id;
      callertMovilespatrulla.Name = this.Name;
      callertMovilespatrulla.tmp_cnombre = this.tmp_cnombre;
      callertMovilespatrulla.tmp_cnumero = this.tmp_cnumero;
      callertMovilespatrulla.tmp_clicencia = this.tmp_clicencia;
      callertMovilespatrulla.tmp_cmarca = this.tmp_cmarca;
      callertMovilespatrulla.tmp_cmodelo = this.tmp_cmodelo;
      callertMovilespatrulla.tmp_cpathfoto = this.tmp_cpathfoto;
      callertMovilespatrulla.tmp_cflota = this.tmp_cflota;
      callertMovilespatrulla.tmp_nestado = this.tmp_nestado;
      callertMovilespatrulla.tmp_icuenta = this.tmp_icuenta;
      callertMovilespatrulla.tmp_iAsignado = this.tmp_iAsignado;
      return (CallerObject) callertMovilespatrulla;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cnumero", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_clicencia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cmarca", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cmodelo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cpathfoto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_cflota", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tmp_nestado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tmp_icuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tmp_iAsignado", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tmp_cnombre"] = (object) this.tmp_cnombre ?? (object) DBNull.Value;
      row["tmp_cnumero"] = (object) this.tmp_cnumero ?? (object) DBNull.Value;
      row["tmp_clicencia"] = (object) this.tmp_clicencia ?? (object) DBNull.Value;
      row["tmp_cmarca"] = (object) this.tmp_cmarca ?? (object) DBNull.Value;
      row["tmp_cmodelo"] = (object) this.tmp_cmodelo ?? (object) DBNull.Value;
      row["tmp_cpathfoto"] = (object) this.tmp_cpathfoto ?? (object) DBNull.Value;
      row["tmp_cflota"] = (object) this.tmp_cflota ?? (object) DBNull.Value;
      row["tmp_nestado"] = (object) this.tmp_nestado ?? (object) DBNull.Value;
      row["tmp_icuenta"] = (object) this.tmp_icuenta ?? (object) DBNull.Value;
      row["tmp_iAsignado"] = (object) this.tmp_iAsignado ?? (object) DBNull.Value;
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
