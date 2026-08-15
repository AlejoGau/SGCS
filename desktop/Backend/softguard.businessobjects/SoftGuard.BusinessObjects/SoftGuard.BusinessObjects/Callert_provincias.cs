// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_provincias
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
  public class Callert_provincias : CallerObject
  {
    private string _pro_ccodigo;
    private string _pro_cdescripcion;
    private string _pro_cletra;
    private Decimal _pro_nTipo;
    private int _pro_iParentID;

    public string pro_ccodigo
    {
      get
      {
        return this._pro_ccodigo;
      }
      set
      {
        this._pro_ccodigo = value;
      }
    }

    public string pro_cdescripcion
    {
      get
      {
        return this._pro_cdescripcion;
      }
      set
      {
        this._pro_cdescripcion = value;
      }
    }

    public string pro_cletra
    {
      get
      {
        return this._pro_cletra;
      }
      set
      {
        this._pro_cletra = value;
      }
    }

    public Decimal pro_nTipo
    {
      get
      {
        return this._pro_nTipo;
      }
      set
      {
        this._pro_nTipo = value;
      }
    }

    public int pro_iParentID
    {
      get
      {
        return this._pro_iParentID;
      }
      set
      {
        this._pro_iParentID = value;
      }
    }

    public Callert_provincias()
    {
      this.InitClass();
    }

    public Callert_provincias(int Id, string Name, string pro_ccodigo, string pro_cdescripcion, string pro_cletra, Decimal pro_nTipo, int pro_iParentID)
    {
      this.Id = Id;
      this.Name = Name;
      this._pro_ccodigo = pro_ccodigo;
      this._pro_cdescripcion = pro_cdescripcion;
      this._pro_cletra = pro_cletra;
      this._pro_nTipo = pro_nTipo;
      this._pro_iParentID = pro_iParentID;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3076, "t_provincias");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_provincias simpletProvincias = new Simplet_provincias();
      simpletProvincias.Id = this.Id;
      simpletProvincias.Name = this.Name;
      simpletProvincias.pro_ccodigo = this._pro_ccodigo;
      simpletProvincias.pro_cdescripcion = this._pro_cdescripcion;
      simpletProvincias.pro_cletra = this._pro_cletra;
      simpletProvincias.pro_nTipo = this._pro_nTipo;
      simpletProvincias.pro_iParentID = this._pro_iParentID;
      return (SimpleBaseObject) simpletProvincias;
    }

    public void SetSimpleObject(Simplet_provincias Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._pro_ccodigo = Simple.pro_ccodigo;
      this._pro_cdescripcion = Simple.pro_cdescripcion;
      this._pro_cletra = Simple.pro_cletra;
      this._pro_nTipo = Simple.pro_nTipo;
      this._pro_iParentID = Simple.pro_iParentID;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_provincias(SqlConfig, UserId, (Simplet_provincias) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_cletra", typeof (string)));
      dataTable.Columns.Add(new DataColumn("pro_nTipo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("pro_iParentID", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["pro_ccodigo"] = (object) this._pro_ccodigo;
      row["pro_cdescripcion"] = (object) this._pro_cdescripcion;
      row["pro_cletra"] = (object) this._pro_cletra;
      row["pro_nTipo"] = (object) this._pro_nTipo;
      row["pro_iParentID"] = (object) this._pro_iParentID;
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
