// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerp_recepcion_notas
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerp_recepcion_notas : CallerObject
  {
    private int _rec_iidrecepcion;
    private int _rec_itipo;
    private string _rec_mnota;

    public int rec_iidrecepcion
    {
      get
      {
        return this._rec_iidrecepcion;
      }
      set
      {
        this._rec_iidrecepcion = value;
      }
    }

    public int rec_itipo
    {
      get
      {
        return this._rec_itipo;
      }
      set
      {
        this._rec_itipo = value;
      }
    }

    public string rec_mnota
    {
      get
      {
        return this._rec_mnota;
      }
      set
      {
        this._rec_mnota = value;
      }
    }

    public Callerp_recepcion_notas()
    {
      this.InitClass();
    }

    public Callerp_recepcion_notas(int Id, string Name, int rec_iidrecepcion, int rec_itipo, string rec_mnota)
    {
      this.Id = Id;
      this.Name = Name;
      this._rec_iidrecepcion = rec_iidrecepcion;
      this._rec_itipo = rec_itipo;
      this._rec_mnota = rec_mnota;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3103, "p_recepcion_notas");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplep_recepcion_notas simplepRecepcionNotas = new Simplep_recepcion_notas();
      simplepRecepcionNotas.Id = this.Id;
      simplepRecepcionNotas.Name = this.Name;
      simplepRecepcionNotas.rec_iidrecepcion = this._rec_iidrecepcion;
      simplepRecepcionNotas.rec_itipo = this._rec_itipo;
      simplepRecepcionNotas.rec_mnota = this._rec_mnota;
      return (SimpleBaseObject) simplepRecepcionNotas;
    }

    public void SetSimpleObject(Simplep_recepcion_notas Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._rec_iidrecepcion = Simple.rec_iidrecepcion;
      this._rec_itipo = Simple.rec_itipo;
      this._rec_mnota = Simple.rec_mnota;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalp_recepcion_notas(SqlConfig, UserId, (Simplep_recepcion_notas) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("rec_iidrecepcion", typeof (int)));
      dataTable.Columns.Add(new DataColumn("rec_itipo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("rec_mnota", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["rec_iidrecepcion"] = (object) this._rec_iidrecepcion;
      row["rec_itipo"] = (object) this._rec_itipo;
      row["rec_mnota"] = (object) this._rec_mnota;
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
