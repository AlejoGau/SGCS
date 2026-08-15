// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerm_asignacion_movil
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerm_asignacion_movil : CallerObject
  {
    private int _amv_rec_iid;
    private int _amv_objecttypeid;
    private int _amv_objectid;
    private int _amv_estado;
    private int _amv_prioridad;

    public int amv_rec_iid
    {
      get
      {
        return this._amv_rec_iid;
      }
      set
      {
        this._amv_rec_iid = value;
      }
    }

    public int amv_objecttypeid
    {
      get
      {
        return this._amv_objecttypeid;
      }
      set
      {
        this._amv_objecttypeid = value;
      }
    }

    public int amv_objectid
    {
      get
      {
        return this._amv_objectid;
      }
      set
      {
        this._amv_objectid = value;
      }
    }

    public int amv_estado
    {
      get
      {
        return this._amv_estado;
      }
      set
      {
        this._amv_estado = value;
      }
    }

    public int amv_prioridad
    {
      get
      {
        return this._amv_prioridad;
      }
      set
      {
        this._amv_prioridad = value;
      }
    }

    public Callerm_asignacion_movil()
    {
      this.InitClass();
    }

    public Callerm_asignacion_movil(int Id, string Name, int amv_rec_iid, int amv_objecttypeid, int amv_objectid, int amv_estado, int amv_prioridad)
    {
      this.Id = Id;
      this.Name = Name;
      this._amv_rec_iid = amv_rec_iid;
      this._amv_objecttypeid = amv_objecttypeid;
      this._amv_objectid = amv_objectid;
      this._amv_estado = amv_estado;
      this._amv_prioridad = amv_prioridad;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3161, "m_asignacion_movil");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplem_asignacion_movil simplemAsignacionMovil = new Simplem_asignacion_movil();
      simplemAsignacionMovil.Id = this.Id;
      simplemAsignacionMovil.Name = this.Name;
      simplemAsignacionMovil.amv_rec_iid = this._amv_rec_iid;
      simplemAsignacionMovil.amv_objecttypeid = this._amv_objecttypeid;
      simplemAsignacionMovil.amv_objectid = this._amv_objectid;
      simplemAsignacionMovil.amv_estado = this._amv_estado;
      simplemAsignacionMovil.amv_prioridad = this._amv_prioridad;
      return (SimpleBaseObject) simplemAsignacionMovil;
    }

    public void SetSimpleObject(Simplem_asignacion_movil Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._amv_rec_iid = Simple.amv_rec_iid;
      this._amv_objecttypeid = Simple.amv_objecttypeid;
      this._amv_objectid = Simple.amv_objectid;
      this._amv_estado = Simple.amv_estado;
      this._amv_prioridad = Simple.amv_prioridad;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalm_asignacion_movil(SqlConfig, UserId, (Simplem_asignacion_movil) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("amv_rec_iid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_objecttypeid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_objectid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_estado", typeof (int)));
      dataTable.Columns.Add(new DataColumn("amv_prioridad", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["amv_rec_iid"] = (object) this._amv_rec_iid;
      row["amv_objecttypeid"] = (object) this._amv_objecttypeid;
      row["amv_objectid"] = (object) this._amv_objectid;
      row["amv_estado"] = (object) this._amv_estado;
      row["amv_prioridad"] = (object) this._amv_prioridad;
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
