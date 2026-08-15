// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_grupos
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_grupos : CallerObject
  {
    private string _gru_ccodigo;
    private string _gru_cdescripcion;

    public string gru_ccodigo
    {
      get
      {
        return this._gru_ccodigo;
      }
      set
      {
        this._gru_ccodigo = value;
      }
    }

    public string gru_cdescripcion
    {
      get
      {
        return this._gru_cdescripcion;
      }
      set
      {
        this._gru_cdescripcion = value;
      }
    }

    public Callert_grupos()
    {
      this.InitClass();
    }

    public Callert_grupos(int Id, string Name, string gru_ccodigo, string gru_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this._gru_ccodigo = gru_ccodigo;
      this._gru_cdescripcion = gru_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3075, "t_grupos");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_grupos simpletGrupos = new Simplet_grupos();
      simpletGrupos.Id = this.Id;
      simpletGrupos.Name = this.Name;
      simpletGrupos.gru_ccodigo = this._gru_ccodigo;
      simpletGrupos.gru_cdescripcion = this._gru_cdescripcion;
      return (SimpleBaseObject) simpletGrupos;
    }

    public void SetSimpleObject(Simplet_grupos Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._gru_ccodigo = Simple.gru_ccodigo;
      this._gru_cdescripcion = Simple.gru_cdescripcion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_grupos(SqlConfig, UserId, (Simplet_grupos) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("gru_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("gru_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["gru_ccodigo"] = (object) this._gru_ccodigo;
      row["gru_cdescripcion"] = (object) this._gru_cdescripcion;
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
