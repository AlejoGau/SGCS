// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.SimpleDealerRango
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
  public class SimpleDealerRango : SimpleBaseObject
  {
    [DataMember]
    public string NombreEntidad { get; set; }

    [DataMember]
    public int IdEntidad { get; set; }

    [DataMember]
    public string Dealer { get; set; }

    [DataMember]
    public string CuentaDesde { get; set; }

    [DataMember]
    public string CuentaHasta { get; set; }

    public SimpleDealerRango()
    {
      this.InitClass();
    }

    public SimpleDealerRango(int Id, string Name, string NombreEntidad, int IdEntidad, string Dealer, string CuentaDesde, string CuentaHasta)
    {
      this.Id = Id;
      this.Name = Name;
      this.NombreEntidad = NombreEntidad;
      this.IdEntidad = IdEntidad;
      this.Dealer = Dealer;
      this.CuentaDesde = CuentaDesde;
      this.CuentaHasta = CuentaHasta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3066, "DealerRango");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new DalDealerRango(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      CallerDealerRango callerDealerRango = new CallerDealerRango();
      callerDealerRango.Id = this.Id;
      callerDealerRango.Name = this.Name;
      callerDealerRango.NombreEntidad = this.NombreEntidad;
      callerDealerRango.IdEntidad = this.IdEntidad;
      callerDealerRango.Dealer = this.Dealer;
      callerDealerRango.CuentaDesde = this.CuentaDesde;
      callerDealerRango.CuentaHasta = this.CuentaHasta;
      return (CallerObject) callerDealerRango;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("NombreEntidad", typeof (string)));
      dataTable.Columns.Add(new DataColumn("IdEntidad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Dealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("CuentaDesde", typeof (string)));
      dataTable.Columns.Add(new DataColumn("CuentaHasta", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["NombreEntidad"] = (object) this.NombreEntidad ?? (object) DBNull.Value;
      row["IdEntidad"] = (object) this.IdEntidad ?? (object) DBNull.Value;
      row["Dealer"] = (object) this.Dealer ?? (object) DBNull.Value;
      row["CuentaDesde"] = (object) this.CuentaDesde ?? (object) DBNull.Value;
      row["CuentaHasta"] = (object) this.CuentaHasta ?? (object) DBNull.Value;
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
