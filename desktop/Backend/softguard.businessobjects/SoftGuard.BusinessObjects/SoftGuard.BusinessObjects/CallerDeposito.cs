// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerDeposito
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerDeposito : CallerObject
  {
    private string _dep_ccodigo;
    private string _dep_cdescripcion;

    public string dep_ccodigo
    {
      get
      {
        return this._dep_ccodigo;
      }
      set
      {
        this._dep_ccodigo = value;
      }
    }

    public string dep_cdescripcion
    {
      get
      {
        return this._dep_cdescripcion;
      }
      set
      {
        this._dep_cdescripcion = value;
      }
    }

    public CallerDeposito()
    {
      this.InitClass();
    }

    public CallerDeposito(int Id, string Name, string dep_ccodigo, string dep_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this._dep_ccodigo = dep_ccodigo;
      this._dep_cdescripcion = dep_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3026, "Deposito");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleDeposito simpleDeposito = new SimpleDeposito();
      simpleDeposito.Id = this.Id;
      simpleDeposito.Name = this.Name;
      simpleDeposito.dep_ccodigo = this._dep_ccodigo;
      simpleDeposito.dep_cdescripcion = this._dep_cdescripcion;
      return (SimpleBaseObject) simpleDeposito;
    }

    public void SetSimpleObject(SimpleDeposito Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._dep_ccodigo = Simple.dep_ccodigo;
      this._dep_cdescripcion = Simple.dep_cdescripcion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalDeposito(SqlConfig, UserId, (SimpleDeposito) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dep_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dep_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["dep_ccodigo"] = (object) this._dep_ccodigo;
      row["dep_cdescripcion"] = (object) this._dep_cdescripcion;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Caller")
      {
        EnforceConstraints = false,
        Tables = {
          this.GetDataObject(),
          this.Type.GetDataObject()
        }
      });
      if (this.Relation != null)
        xmlDataDocument.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
