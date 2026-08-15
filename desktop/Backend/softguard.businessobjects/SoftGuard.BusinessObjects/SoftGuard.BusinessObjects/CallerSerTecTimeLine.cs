// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSerTecTimeLine
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
  public class CallerSerTecTimeLine : CallerObject
  {
    private int _stl_iServicio;
    private DateTime? _stl_tFechaHora;
    private string _stl_cAccion;
    private string _stl_cObservacion;
    private int _stl_iUsuarioDSS;

    public int stl_iServicio
    {
      get
      {
        return this._stl_iServicio;
      }
      set
      {
        this._stl_iServicio = value;
      }
    }

    public DateTime? stl_tFechaHora
    {
      get
      {
        return this._stl_tFechaHora;
      }
      set
      {
        this._stl_tFechaHora = value;
      }
    }

    public string stl_cAccion
    {
      get
      {
        return this._stl_cAccion;
      }
      set
      {
        this._stl_cAccion = value;
      }
    }

    public string stl_cObservacion
    {
      get
      {
        return this._stl_cObservacion;
      }
      set
      {
        this._stl_cObservacion = value;
      }
    }

    public int stl_iUsuarioDSS
    {
      get
      {
        return this._stl_iUsuarioDSS;
      }
      set
      {
        this._stl_iUsuarioDSS = value;
      }
    }

    public CallerSerTecTimeLine()
    {
      this.InitClass();
    }

    public CallerSerTecTimeLine(int Id, string Name, int stl_iServicio, DateTime? stl_tFechaHora, string stl_cAccion, string stl_cObservacion, int stl_iUsuarioDSS)
    {
      this.Id = Id;
      this.Name = Name;
      this._stl_iServicio = stl_iServicio;
      this._stl_tFechaHora = stl_tFechaHora;
      this._stl_cAccion = stl_cAccion;
      this._stl_cObservacion = stl_cObservacion;
      this._stl_iUsuarioDSS = stl_iUsuarioDSS;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3124, "SerTecTimeLine");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSerTecTimeLine simpleSerTecTimeLine = new SimpleSerTecTimeLine();
      simpleSerTecTimeLine.Id = this.Id;
      simpleSerTecTimeLine.Name = this.Name;
      simpleSerTecTimeLine.stl_iServicio = this._stl_iServicio;
      simpleSerTecTimeLine.stl_tFechaHora = this._stl_tFechaHora;
      simpleSerTecTimeLine.stl_cAccion = this._stl_cAccion;
      simpleSerTecTimeLine.stl_cObservacion = this._stl_cObservacion;
      simpleSerTecTimeLine.stl_iUsuarioDSS = this._stl_iUsuarioDSS;
      return (SimpleBaseObject) simpleSerTecTimeLine;
    }

    public void SetSimpleObject(SimpleSerTecTimeLine Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._stl_iServicio = Simple.stl_iServicio;
      this._stl_tFechaHora = Simple.stl_tFechaHora;
      this._stl_cAccion = Simple.stl_cAccion;
      this._stl_cObservacion = Simple.stl_cObservacion;
      this._stl_iUsuarioDSS = Simple.stl_iUsuarioDSS;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSerTecTimeLine(SqlConfig, UserId, (SimpleSerTecTimeLine) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_iServicio", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stl_tFechaHora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("stl_cAccion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_cObservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stl_iUsuarioDSS", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stl_iServicio"] = (object) this._stl_iServicio;
      row["stl_tFechaHora"] = (object) this._stl_tFechaHora;
      row["stl_cAccion"] = (object) this._stl_cAccion;
      row["stl_cObservacion"] = (object) this._stl_cObservacion;
      row["stl_iUsuarioDSS"] = (object) this._stl_iUsuarioDSS;
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
