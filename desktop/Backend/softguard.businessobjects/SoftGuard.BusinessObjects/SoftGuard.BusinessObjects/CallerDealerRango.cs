// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerDealerRango
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerDealerRango : CallerObject
  {
    private string _NombreEntidad;
    private int _IdEntidad;
    private string _Dealer;
    private string _CuentaDesde;
    private string _CuentaHasta;

    public string NombreEntidad
    {
      get
      {
        return this._NombreEntidad;
      }
      set
      {
        this._NombreEntidad = value;
      }
    }

    public int IdEntidad
    {
      get
      {
        return this._IdEntidad;
      }
      set
      {
        this._IdEntidad = value;
      }
    }

    public string Dealer
    {
      get
      {
        return this._Dealer;
      }
      set
      {
        this._Dealer = value;
      }
    }

    public string CuentaDesde
    {
      get
      {
        return this._CuentaDesde;
      }
      set
      {
        this._CuentaDesde = value;
      }
    }

    public string CuentaHasta
    {
      get
      {
        return this._CuentaHasta;
      }
      set
      {
        this._CuentaHasta = value;
      }
    }

    public CallerDealerRango()
    {
      this.InitClass();
    }

    public CallerDealerRango(int Id, string Name, string NombreEntidad, int IdEntidad, string Dealer, string CuentaDesde, string CuentaHasta)
    {
      this.Id = Id;
      this.Name = Name;
      this._NombreEntidad = NombreEntidad;
      this._IdEntidad = IdEntidad;
      this._Dealer = Dealer;
      this._CuentaDesde = CuentaDesde;
      this._CuentaHasta = CuentaHasta;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3066, "DealerRango");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleDealerRango simpleDealerRango = new SimpleDealerRango();
      simpleDealerRango.Id = this.Id;
      simpleDealerRango.Name = this.Name;
      simpleDealerRango.NombreEntidad = this._NombreEntidad;
      simpleDealerRango.IdEntidad = this._IdEntidad;
      simpleDealerRango.Dealer = this._Dealer;
      simpleDealerRango.CuentaDesde = this._CuentaDesde;
      simpleDealerRango.CuentaHasta = this._CuentaHasta;
      return (SimpleBaseObject) simpleDealerRango;
    }

    public void SetSimpleObject(SimpleDealerRango Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._NombreEntidad = Simple.NombreEntidad;
      this._IdEntidad = Simple.IdEntidad;
      this._Dealer = Simple.Dealer;
      this._CuentaDesde = Simple.CuentaDesde;
      this._CuentaHasta = Simple.CuentaHasta;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalDealerRango(SqlConfig, UserId, (SimpleDealerRango) this.GetSimpleObject());
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
      row["NombreEntidad"] = (object) this._NombreEntidad;
      row["IdEntidad"] = (object) this._IdEntidad;
      row["Dealer"] = (object) this._Dealer;
      row["CuentaDesde"] = (object) this._CuentaDesde;
      row["CuentaHasta"] = (object) this._CuentaHasta;
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
