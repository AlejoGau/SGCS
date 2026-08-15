// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplet_parametros
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
  public class Simplet_parametros : SimpleBaseObject
  {
    [DataMember]
    public string par_ccodigo { get; set; }

    [DataMember]
    public string par_cdescripcion { get; set; }

    [DataMember]
    public int par_ivalor { get; set; }

    [DataMember]
    public string par_mobservacion { get; set; }

    [DataMember]
    public string par_cconfig { get; set; }

    [DataMember]
    public string par_ccomentario { get; set; }

    [DataMember]
    public string par_cvalor { get; set; }

    public Simplet_parametros()
    {
      this.InitClass();
    }

    public Simplet_parametros(int Id, string Name, string par_ccodigo, string par_cdescripcion, int par_ivalor, string par_mobservacion, string par_cconfig, string par_ccomentario, string par_cvalor)
    {
      this.Id = Id;
      this.Name = Name;
      this.par_ccodigo = par_ccodigo;
      this.par_cdescripcion = par_cdescripcion;
      this.par_ivalor = par_ivalor;
      this.par_mobservacion = par_mobservacion;
      this.par_cconfig = par_cconfig;
      this.par_ccomentario = par_ccomentario;
      this.par_cvalor = par_cvalor;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3094, "t_parametros");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalt_parametros(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callert_parametros callertParametros = new Callert_parametros();
      callertParametros.Id = this.Id;
      callertParametros.Name = this.Name;
      callertParametros.par_ccodigo = this.par_ccodigo;
      callertParametros.par_cdescripcion = this.par_cdescripcion;
      callertParametros.par_ivalor = this.par_ivalor;
      callertParametros.par_mobservacion = this.par_mobservacion;
      callertParametros.par_cconfig = this.par_cconfig;
      callertParametros.par_ccomentario = this.par_ccomentario;
      callertParametros.par_cvalor = this.par_cvalor;
      return (CallerObject) callertParametros;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_ivalor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("par_mobservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_cconfig", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_ccomentario", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_cvalor", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["par_ccodigo"] = (object) this.par_ccodigo ?? (object) DBNull.Value;
      row["par_cdescripcion"] = (object) this.par_cdescripcion ?? (object) DBNull.Value;
      row["par_ivalor"] = (object) this.par_ivalor ?? (object) DBNull.Value;
      row["par_mobservacion"] = (object) this.par_mobservacion ?? (object) DBNull.Value;
      row["par_cconfig"] = (object) this.par_cconfig ?? (object) DBNull.Value;
      row["par_ccomentario"] = (object) this.par_ccomentario ?? (object) DBNull.Value;
      row["par_cvalor"] = (object) this.par_cvalor ?? (object) DBNull.Value;
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
