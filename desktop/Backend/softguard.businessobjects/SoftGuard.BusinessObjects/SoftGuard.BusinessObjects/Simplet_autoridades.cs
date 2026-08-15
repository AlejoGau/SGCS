// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_autoridades
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
  public class Simplet_autoridades : SimpleBaseObject
  {
    [DataMember]
    public string aut_cnombre { get; set; }

    [DataMember]
    public string aut_meventos { get; set; }

    [DataMember]
    public string aut_cdealer { get; set; }

    [DataMember]
    public string aut_meventosauto { get; set; }

    [DataMember]
    public string aut_cprovincia { get; set; }

    [DataMember]
    public string aut_cautoprocesados { get; set; }

    [DataMember]
    public int aut_idestino { get; set; }

    public Simplet_autoridades()
    {
      this.InitClass();
    }

    public Simplet_autoridades(int Id, string Name, string aut_cnombre, string aut_meventos, string aut_cdealer, string aut_meventosauto, string aut_cprovincia, string aut_cautoprocesados, int aut_idestino)
    {
      this.Id = Id;
      this.Name = Name;
      this.aut_cnombre = aut_cnombre;
      this.aut_meventos = aut_meventos;
      this.aut_cdealer = aut_cdealer;
      this.aut_meventosauto = aut_meventosauto;
      this.aut_cprovincia = aut_cprovincia;
      this.aut_cautoprocesados = aut_cautoprocesados;
      this.aut_idestino = aut_idestino;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3128, "t_autoridades");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_autoridades(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_autoridades callertAutoridades = new Callert_autoridades();
      callertAutoridades.Id = this.Id;
      callertAutoridades.Name = this.Name;
      callertAutoridades.aut_cnombre = this.aut_cnombre;
      callertAutoridades.aut_meventos = this.aut_meventos;
      callertAutoridades.aut_cdealer = this.aut_cdealer;
      callertAutoridades.aut_meventosauto = this.aut_meventosauto;
      callertAutoridades.aut_cprovincia = this.aut_cprovincia;
      callertAutoridades.aut_cautoprocesados = this.aut_cautoprocesados;
      callertAutoridades.aut_idestino = this.aut_idestino;
      return (CallerObject) callertAutoridades;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_meventos", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_meventosauto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cprovincia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cautoprocesados", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_idestino", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["aut_cnombre"] = (object) this.aut_cnombre ?? (object) DBNull.Value;
      row["aut_meventos"] = (object) this.aut_meventos ?? (object) DBNull.Value;
      row["aut_cdealer"] = (object) this.aut_cdealer ?? (object) DBNull.Value;
      row["aut_meventosauto"] = (object) this.aut_meventosauto ?? (object) DBNull.Value;
      row["aut_cprovincia"] = (object) this.aut_cprovincia ?? (object) DBNull.Value;
      row["aut_cautoprocesados"] = (object) this.aut_cautoprocesados ?? (object) DBNull.Value;
      row["aut_idestino"] = (object) this.aut_idestino ?? (object) DBNull.Value;
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
