// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplem_stock_item
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
  public class Simplem_stock_item : SimpleBaseObject
  {
    [DataMember]
    public int sti_idcabecera { get; set; }

    [DataMember]
    public int sti_idproducto { get; set; }

    [DataMember]
    public float sti_cant { get; set; }

    public Simplem_stock_item()
    {
      this.InitClass();
    }

    public Simplem_stock_item(int Id, string Name, int sti_idcabecera, int sti_idproducto, float sti_cant)
    {
      this.Id = Id;
      this.Name = Name;
      this.sti_idcabecera = sti_idcabecera;
      this.sti_idproducto = sti_idproducto;
      this.sti_cant = sti_cant;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3143, "m_stock_item");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalm_stock_item(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_stock_item callermStockItem = new Callerm_stock_item();
      callermStockItem.Id = this.Id;
      callermStockItem.Name = this.Name;
      callermStockItem.sti_idcabecera = this.sti_idcabecera;
      callermStockItem.sti_idproducto = this.sti_idproducto;
      callermStockItem.sti_cant = this.sti_cant;
      return (CallerObject) callermStockItem;
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
      row["sti_idcabecera"] = (object) this.sti_idcabecera ?? (object) DBNull.Value;
      row["sti_idproducto"] = (object) this.sti_idproducto ?? (object) DBNull.Value;
      row["sti_cant"] = (object) this.sti_cant ?? (object) DBNull.Value;
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
