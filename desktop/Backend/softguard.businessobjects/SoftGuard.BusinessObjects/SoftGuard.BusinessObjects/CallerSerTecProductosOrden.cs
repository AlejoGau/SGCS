// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSerTecProductosOrden
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerSerTecProductosOrden : CallerObject
  {
    private int _spr_iServicio;
    private int _spr_iVisita;
    private int _spr_iProducto;
    private float _spr_iCantidad;

    public int spr_iServicio
    {
      get
      {
        return this._spr_iServicio;
      }
      set
      {
        this._spr_iServicio = value;
      }
    }

    public int spr_iVisita
    {
      get
      {
        return this._spr_iVisita;
      }
      set
      {
        this._spr_iVisita = value;
      }
    }

    public int spr_iProducto
    {
      get
      {
        return this._spr_iProducto;
      }
      set
      {
        this._spr_iProducto = value;
      }
    }

    public float spr_iCantidad
    {
      get
      {
        return this._spr_iCantidad;
      }
      set
      {
        this._spr_iCantidad = value;
      }
    }

    public CallerSerTecProductosOrden()
    {
      this.InitClass();
    }

    public CallerSerTecProductosOrden(int Id, string Name, int spr_iServicio, int spr_iVisita, int spr_iProducto, float spr_iCantidad)
    {
      this.Id = Id;
      this.Name = Name;
      this._spr_iServicio = spr_iServicio;
      this._spr_iVisita = spr_iVisita;
      this._spr_iProducto = spr_iProducto;
      this._spr_iCantidad = spr_iCantidad;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3123, "SerTecProductosOrden");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSerTecProductosOrden tecProductosOrden = new SimpleSerTecProductosOrden();
      tecProductosOrden.Id = this.Id;
      tecProductosOrden.Name = this.Name;
      tecProductosOrden.spr_iServicio = this._spr_iServicio;
      tecProductosOrden.spr_iVisita = this._spr_iVisita;
      tecProductosOrden.spr_iProducto = this._spr_iProducto;
      tecProductosOrden.spr_iCantidad = this._spr_iCantidad;
      return (SimpleBaseObject) tecProductosOrden;
    }

    public void SetSimpleObject(SimpleSerTecProductosOrden Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._spr_iServicio = Simple.spr_iServicio;
      this._spr_iVisita = Simple.spr_iVisita;
      this._spr_iProducto = Simple.spr_iProducto;
      this._spr_iCantidad = Simple.spr_iCantidad;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSerTecProductosOrden(SqlConfig, UserId, (SimpleSerTecProductosOrden) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("spr_iServicio", typeof (int)));
      dataTable.Columns.Add(new DataColumn("spr_iVisita", typeof (int)));
      dataTable.Columns.Add(new DataColumn("spr_iProducto", typeof (int)));
      dataTable.Columns.Add(new DataColumn("spr_iCantidad", typeof (float)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["spr_iServicio"] = (object) this._spr_iServicio;
      row["spr_iVisita"] = (object) this._spr_iVisita;
      row["spr_iProducto"] = (object) this._spr_iProducto;
      row["spr_iCantidad"] = (object) this._spr_iCantidad;
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
