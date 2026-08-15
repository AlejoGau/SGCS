// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_stock_item
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerm_stock_item : CallerObject
  {
    private int _sti_idcabecera;
    private int _sti_idproducto;
    private float _sti_cant;

    public int sti_idcabecera
    {
      get
      {
        return this._sti_idcabecera;
      }
      set
      {
        this._sti_idcabecera = value;
      }
    }

    public int sti_idproducto
    {
      get
      {
        return this._sti_idproducto;
      }
      set
      {
        this._sti_idproducto = value;
      }
    }

    public float sti_cant
    {
      get
      {
        return this._sti_cant;
      }
      set
      {
        this._sti_cant = value;
      }
    }

    public Callerm_stock_item()
    {
      this.InitClass();
    }

    public Callerm_stock_item(int Id, string Name, int sti_idcabecera, int sti_idproducto, float sti_cant)
    {
      this.Id = Id;
      this.Name = Name;
      this._sti_idcabecera = sti_idcabecera;
      this._sti_idproducto = sti_idproducto;
      this._sti_cant = sti_cant;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3143, "m_stock_item");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_stock_item simplemStockItem = new Simplem_stock_item();
      simplemStockItem.Id = this.Id;
      simplemStockItem.Name = this.Name;
      simplemStockItem.sti_idcabecera = this._sti_idcabecera;
      simplemStockItem.sti_idproducto = this._sti_idproducto;
      simplemStockItem.sti_cant = this._sti_cant;
      return (SimpleBaseObject) simplemStockItem;
    }

    public void SetSimpleObject(Simplem_stock_item Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._sti_idcabecera = Simple.sti_idcabecera;
      this._sti_idproducto = Simple.sti_idproducto;
      this._sti_cant = Simple.sti_cant;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_stock_item(SqlConfig, UserId, (Simplem_stock_item) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sti_idcabecera", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sti_idproducto", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sti_cant", typeof (float)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["sti_idcabecera"] = (object) this._sti_idcabecera;
      row["sti_idproducto"] = (object) this._sti_idproducto;
      row["sti_cant"] = (object) this._sti_cant;
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
