// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_telefonos_jurisdiccionales
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
  public class Callerm_telefonos_jurisdiccionales : CallerObject
  {
    private string _tel_clista;
    private string _tel_cnombre;
    private string _tel_cobservacion;
    private string _tel_ctelefono;
    private Decimal _tel_ndiscado;
    private string _tel_cpredigito;
    private string _tel_cpostdigito;
    private string _tel_cprovincia;

    public string tel_clista
    {
      get
      {
        return this._tel_clista;
      }
      set
      {
        this._tel_clista = value;
      }
    }

    public string tel_cnombre
    {
      get
      {
        return this._tel_cnombre;
      }
      set
      {
        this._tel_cnombre = value;
      }
    }

    public string tel_cobservacion
    {
      get
      {
        return this._tel_cobservacion;
      }
      set
      {
        this._tel_cobservacion = value;
      }
    }

    public string tel_ctelefono
    {
      get
      {
        return this._tel_ctelefono;
      }
      set
      {
        this._tel_ctelefono = value;
      }
    }

    public Decimal tel_ndiscado
    {
      get
      {
        return this._tel_ndiscado;
      }
      set
      {
        this._tel_ndiscado = value;
      }
    }

    public string tel_cpredigito
    {
      get
      {
        return this._tel_cpredigito;
      }
      set
      {
        this._tel_cpredigito = value;
      }
    }

    public string tel_cpostdigito
    {
      get
      {
        return this._tel_cpostdigito;
      }
      set
      {
        this._tel_cpostdigito = value;
      }
    }

    public string tel_cprovincia
    {
      get
      {
        return this._tel_cprovincia;
      }
      set
      {
        this._tel_cprovincia = value;
      }
    }

    public Callerm_telefonos_jurisdiccionales()
    {
      this.InitClass();
    }

    public Callerm_telefonos_jurisdiccionales(int Id, string Name, string tel_clista, string tel_cnombre, string tel_cobservacion, string tel_ctelefono, Decimal tel_ndiscado, string tel_cpredigito, string tel_cpostdigito, string tel_cprovincia)
    {
      this.Id = Id;
      this.Name = Name;
      this._tel_clista = tel_clista;
      this._tel_cnombre = tel_cnombre;
      this._tel_cobservacion = tel_cobservacion;
      this._tel_ctelefono = tel_ctelefono;
      this._tel_ndiscado = tel_ndiscado;
      this._tel_cpredigito = tel_cpredigito;
      this._tel_cpostdigito = tel_cpostdigito;
      this._tel_cprovincia = tel_cprovincia;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3099, "m_telefonos_jurisdiccionales");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_telefonos_jurisdiccionales jurisdiccionales = new Simplem_telefonos_jurisdiccionales();
      jurisdiccionales.Id = this.Id;
      jurisdiccionales.Name = this.Name;
      jurisdiccionales.tel_clista = this._tel_clista;
      jurisdiccionales.tel_cnombre = this._tel_cnombre;
      jurisdiccionales.tel_cobservacion = this._tel_cobservacion;
      jurisdiccionales.tel_ctelefono = this._tel_ctelefono;
      jurisdiccionales.tel_ndiscado = this._tel_ndiscado;
      jurisdiccionales.tel_cpredigito = this._tel_cpredigito;
      jurisdiccionales.tel_cpostdigito = this._tel_cpostdigito;
      jurisdiccionales.tel_cprovincia = this._tel_cprovincia;
      return (SimpleBaseObject) jurisdiccionales;
    }

    public void SetSimpleObject(Simplem_telefonos_jurisdiccionales Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tel_clista = Simple.tel_clista;
      this._tel_cnombre = Simple.tel_cnombre;
      this._tel_cobservacion = Simple.tel_cobservacion;
      this._tel_ctelefono = Simple.tel_ctelefono;
      this._tel_ndiscado = Simple.tel_ndiscado;
      this._tel_cpredigito = Simple.tel_cpredigito;
      this._tel_cpostdigito = Simple.tel_cpostdigito;
      this._tel_cprovincia = Simple.tel_cprovincia;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_telefonos_jurisdiccionales(SqlConfig, UserId, (Simplem_telefonos_jurisdiccionales) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_clista", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cobservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_ndiscado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tel_cpredigito", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cpostdigito", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cprovincia", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tel_clista"] = (object) this._tel_clista;
      row["tel_cnombre"] = (object) this._tel_cnombre;
      row["tel_cobservacion"] = (object) this._tel_cobservacion;
      row["tel_ctelefono"] = (object) this._tel_ctelefono;
      row["tel_ndiscado"] = (object) this._tel_ndiscado;
      row["tel_cpredigito"] = (object) this._tel_cpredigito;
      row["tel_cpostdigito"] = (object) this._tel_cpostdigito;
      row["tel_cprovincia"] = (object) this._tel_cprovincia;
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
