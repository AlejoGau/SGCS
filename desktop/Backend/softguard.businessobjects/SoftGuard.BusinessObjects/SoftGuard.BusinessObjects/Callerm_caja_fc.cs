// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_caja_fc
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerm_caja_fc : CallerObject
  {
    private DateTime? _caj_dfecha;
    private Decimal _caj_ytotal;
    private string _caj_ctipomov;
    private string _caj_cmotivo;

    public DateTime? caj_dfecha
    {
      get
      {
        return this._caj_dfecha;
      }
      set
      {
        this._caj_dfecha = value;
      }
    }

    public Decimal caj_ytotal
    {
      get
      {
        return this._caj_ytotal;
      }
      set
      {
        this._caj_ytotal = value;
      }
    }

    public string caj_ctipomov
    {
      get
      {
        return this._caj_ctipomov;
      }
      set
      {
        this._caj_ctipomov = value;
      }
    }

    public string caj_cmotivo
    {
      get
      {
        return this._caj_cmotivo;
      }
      set
      {
        this._caj_cmotivo = value;
      }
    }

    public Callerm_caja_fc()
    {
      this.InitClass();
    }

    public Callerm_caja_fc(int Id, string Name, DateTime? caj_dfecha, Decimal caj_ytotal, string caj_ctipomov, string caj_cmotivo)
    {
      this.Id = Id;
      this.Name = Name;
      this._caj_dfecha = caj_dfecha;
      this._caj_ytotal = caj_ytotal;
      this._caj_ctipomov = caj_ctipomov;
      this._caj_cmotivo = caj_cmotivo;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3154, "m_caja_fc");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_caja_fc simplemCajaFc = new Simplem_caja_fc();
      simplemCajaFc.Id = this.Id;
      simplemCajaFc.Name = this.Name;
      simplemCajaFc.caj_dfecha = this._caj_dfecha;
      simplemCajaFc.caj_ytotal = this._caj_ytotal;
      simplemCajaFc.caj_ctipomov = this._caj_ctipomov;
      simplemCajaFc.caj_cmotivo = this._caj_cmotivo;
      return (SimpleBaseObject) simplemCajaFc;
    }

    public void SetSimpleObject(Simplem_caja_fc Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._caj_dfecha = Simple.caj_dfecha;
      this._caj_ytotal = Simple.caj_ytotal;
      this._caj_ctipomov = Simple.caj_ctipomov;
      this._caj_cmotivo = Simple.caj_cmotivo;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_caja_fc(SqlConfig, UserId, (Simplem_caja_fc) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("caj_dfecha", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("caj_ytotal", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("caj_ctipomov", typeof (string)));
      dataTable.Columns.Add(new DataColumn("caj_cmotivo", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["caj_dfecha"] = (object) this._caj_dfecha;
      row["caj_ytotal"] = (object) this._caj_ytotal;
      row["caj_ctipomov"] = (object) this._caj_ctipomov;
      row["caj_cmotivo"] = (object) this._caj_cmotivo;
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
