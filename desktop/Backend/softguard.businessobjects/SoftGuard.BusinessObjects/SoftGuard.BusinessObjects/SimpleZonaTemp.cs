// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleZonaTemp
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Runtime.Serialization;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  [DataContract]
  public class SimpleZonaTemp : SimpleBaseObject
  {
    [DataMember]
    public long zon_idregistro { get; set; }

    [DataMember]
    public int zon_iidcuenta { get; set; }

    [DataMember]
    public int zon_usuario { get; set; }

    [DataMember]
    public string zon_ccodigo { get; set; }

    [DataMember]
    public string zon_cdescripcion { get; set; }

    [DataMember]
    public string zon_codigoalarma { get; set; }

    [DataMember]
    public string zon_tipo { get; set; }

    [DataMember]
    public string zon_cimagen { get; set; }

    public SimpleZonaTemp()
    {
      this.InitClass();
    }

    public SimpleZonaTemp(int Id, string Name, long zon_idregistro, int zon_iidcuenta, int zon_usuario, string zon_ccodigo, string zon_cdescripcion, string zon_codigoalarma, string zon_tipo, string zon_cimagen)
    {
      this.Id = Id;
      this.Name = Name;
      this.zon_idregistro = zon_idregistro;
      this.zon_iidcuenta = zon_iidcuenta;
      this.zon_usuario = zon_usuario;
      this.zon_ccodigo = zon_ccodigo;
      this.zon_cdescripcion = zon_cdescripcion;
      this.zon_codigoalarma = zon_codigoalarma;
      this.zon_tipo = zon_tipo;
      this.zon_cimagen = zon_cimagen;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3016, "ZonaTemp");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalZonaTemp(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerZonaTemp callerZonaTemp = new CallerZonaTemp();
      callerZonaTemp.Id = this.Id;
      callerZonaTemp.Name = this.Name;
      callerZonaTemp.zon_idregistro = this.zon_idregistro;
      callerZonaTemp.zon_iidcuenta = this.zon_iidcuenta;
      callerZonaTemp.zon_usuario = this.zon_usuario;
      callerZonaTemp.zon_ccodigo = this.zon_ccodigo;
      callerZonaTemp.zon_cdescripcion = this.zon_cdescripcion;
      callerZonaTemp.zon_codigoalarma = this.zon_codigoalarma;
      callerZonaTemp.zon_tipo = this.zon_tipo;
      callerZonaTemp.zon_cimagen = this.zon_cimagen;
      return (CallerObject) callerZonaTemp;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_idregistro", typeof (long)));
      dataTable.Columns.Add(new DataColumn("zon_iidcuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_usuario", typeof (int)));
      dataTable.Columns.Add(new DataColumn("zon_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_codigoalarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_tipo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zon_cimagen", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["zon_idregistro"] = (object) this.zon_idregistro;
      row["zon_iidcuenta"] = (object) this.zon_iidcuenta;
      row["zon_usuario"] = (object) this.zon_usuario;
      row["zon_ccodigo"] = (object) this.zon_ccodigo;
      row["zon_cdescripcion"] = (object) this.zon_cdescripcion;
      row["zon_codigoalarma"] = (object) this.zon_codigoalarma;
      row["zon_tipo"] = (object) this.zon_tipo;
      row["zon_cimagen"] = (object) this.zon_cimagen;
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
