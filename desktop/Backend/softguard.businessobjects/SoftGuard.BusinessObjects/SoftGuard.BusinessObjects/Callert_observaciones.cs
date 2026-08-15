// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_observaciones
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_observaciones : CallerObject
  {
    private string _obs_ccodigo;
    private string _obs_cdescripcion;
    private string _obs_mobservacion;

    public string obs_ccodigo
    {
      get
      {
        return this._obs_ccodigo;
      }
      set
      {
        this._obs_ccodigo = value;
      }
    }

    public string obs_cdescripcion
    {
      get
      {
        return this._obs_cdescripcion;
      }
      set
      {
        this._obs_cdescripcion = value;
      }
    }

    public string obs_mobservacion
    {
      get
      {
        return this._obs_mobservacion;
      }
      set
      {
        this._obs_mobservacion = value;
      }
    }

    public Callert_observaciones()
    {
      this.InitClass();
    }

    public Callert_observaciones(int Id, string Name, string obs_ccodigo, string obs_cdescripcion, string obs_mobservacion)
    {
      this.Id = Id;
      this.Name = Name;
      this._obs_ccodigo = obs_ccodigo;
      this._obs_cdescripcion = obs_cdescripcion;
      this._obs_mobservacion = obs_mobservacion;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3085, "t_observaciones");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_observaciones simpletObservaciones = new Simplet_observaciones();
      simpletObservaciones.Id = this.Id;
      simpletObservaciones.Name = this.Name;
      simpletObservaciones.obs_ccodigo = this._obs_ccodigo;
      simpletObservaciones.obs_cdescripcion = this._obs_cdescripcion;
      simpletObservaciones.obs_mobservacion = this._obs_mobservacion;
      return (SimpleBaseObject) simpletObservaciones;
    }

    public void SetSimpleObject(Simplet_observaciones Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._obs_ccodigo = Simple.obs_ccodigo;
      this._obs_cdescripcion = Simple.obs_cdescripcion;
      this._obs_mobservacion = Simple.obs_mobservacion;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_observaciones(SqlConfig, UserId, (Simplet_observaciones) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("obs_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("obs_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("obs_mobservacion", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["obs_ccodigo"] = (object) this._obs_ccodigo;
      row["obs_cdescripcion"] = (object) this._obs_cdescripcion;
      row["obs_mobservacion"] = (object) this._obs_mobservacion;
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
