// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_tipos_formapago_fc
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_tipos_formapago_fc : CallerObject
  {
    private string _tfp_ccodigo;
    private string _tfp_cdescripcion;

    public string tfp_ccodigo
    {
      get
      {
        return this._tfp_ccodigo;
      }
      set
      {
        this._tfp_ccodigo = value;
      }
    }

    public string tfp_cdescripcion
    {
      get
      {
        return this._tfp_cdescripcion;
      }
      set
      {
        this._tfp_cdescripcion = value;
      }
    }

    public Callert_tipos_formapago_fc()
    {
      this.InitClass();
    }

    public Callert_tipos_formapago_fc(int Id, string Name, string tfp_ccodigo, string tfp_cdescripcion)
    {
      this.Id = Id;
      this.Name = Name;
      this._tfp_ccodigo = tfp_ccodigo;
      this._tfp_cdescripcion = tfp_cdescripcion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3146, "t_tipos_formapago_fc");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_tipos_formapago_fc tiposFormapagoFc = new Simplet_tipos_formapago_fc();
      tiposFormapagoFc.Id = this.Id;
      tiposFormapagoFc.Name = this.Name;
      tiposFormapagoFc.tfp_ccodigo = this._tfp_ccodigo;
      tiposFormapagoFc.tfp_cdescripcion = this._tfp_cdescripcion;
      return (SimpleBaseObject) tiposFormapagoFc;
    }

    public void SetSimpleObject(Simplet_tipos_formapago_fc Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tfp_ccodigo = Simple.tfp_ccodigo;
      this._tfp_cdescripcion = Simple.tfp_cdescripcion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_tipos_formapago_fc(SqlConfig, UserId, (Simplet_tipos_formapago_fc) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tfp_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tfp_cdescripcion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tfp_ccodigo"] = (object) this._tfp_ccodigo;
      row["tfp_cdescripcion"] = (object) this._tfp_cdescripcion;
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
