// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerVC_Routes
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
  public class CallerVC_Routes : CallerObject
  {
    private int _cuentaId;
    private int _userId;
    private string _routetype;
    private DateTime? _datestart;
    private int _time;
    private int _startbeforetolerance;
    private int _startaftertolerance;
    private int _endbeforetolerance;
    private int _endaftertolerance;

    public int cuentaId
    {
      get
      {
        return this._cuentaId;
      }
      set
      {
        this._cuentaId = value;
      }
    }

    public int userId
    {
      get
      {
        return this._userId;
      }
      set
      {
        this._userId = value;
      }
    }

    public string routetype
    {
      get
      {
        return this._routetype;
      }
      set
      {
        this._routetype = value;
      }
    }

    public DateTime? datestart
    {
      get
      {
        return this._datestart;
      }
      set
      {
        this._datestart = value;
      }
    }

    public int time
    {
      get
      {
        return this._time;
      }
      set
      {
        this._time = value;
      }
    }

    public int startbeforetolerance
    {
      get
      {
        return this._startbeforetolerance;
      }
      set
      {
        this._startbeforetolerance = value;
      }
    }

    public int startaftertolerance
    {
      get
      {
        return this._startaftertolerance;
      }
      set
      {
        this._startaftertolerance = value;
      }
    }

    public int endbeforetolerance
    {
      get
      {
        return this._endbeforetolerance;
      }
      set
      {
        this._endbeforetolerance = value;
      }
    }

    public int endaftertolerance
    {
      get
      {
        return this._endaftertolerance;
      }
      set
      {
        this._endaftertolerance = value;
      }
    }

    public CallerVC_Routes()
    {
      this.InitClass();
    }

    public CallerVC_Routes(int Id, string Name, int cuentaId, int userId, string routetype, DateTime? datestart, int time, int startbeforetolerance, int startaftertolerance, int endbeforetolerance, int endaftertolerance)
    {
      this.Id = Id;
      this.Name = Name;
      this._cuentaId = cuentaId;
      this._userId = userId;
      this._routetype = routetype;
      this._datestart = datestart;
      this._time = time;
      this._startbeforetolerance = startbeforetolerance;
      this._startaftertolerance = startaftertolerance;
      this._endbeforetolerance = endbeforetolerance;
      this._endaftertolerance = endaftertolerance;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3118, "VC_Routes");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleVC_Routes simpleVcRoutes = new SimpleVC_Routes();
      simpleVcRoutes.Id = this.Id;
      simpleVcRoutes.Name = this.Name;
      simpleVcRoutes.cuentaId = this._cuentaId;
      simpleVcRoutes.userId = this._userId;
      simpleVcRoutes.routetype = this._routetype;
      simpleVcRoutes.datestart = this._datestart;
      simpleVcRoutes.time = this._time;
      simpleVcRoutes.startbeforetolerance = this._startbeforetolerance;
      simpleVcRoutes.startaftertolerance = this._startaftertolerance;
      simpleVcRoutes.endbeforetolerance = this._endbeforetolerance;
      simpleVcRoutes.endaftertolerance = this._endaftertolerance;
      return (SimpleBaseObject) simpleVcRoutes;
    }

    public void SetSimpleObject(SimpleVC_Routes Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._cuentaId = Simple.cuentaId;
      this._userId = Simple.userId;
      this._routetype = Simple.routetype;
      this._datestart = Simple.datestart;
      this._time = Simple.time;
      this._startbeforetolerance = Simple.startbeforetolerance;
      this._startaftertolerance = Simple.startaftertolerance;
      this._endbeforetolerance = Simple.endbeforetolerance;
      this._endaftertolerance = Simple.endaftertolerance;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalVC_Routes(SqlConfig, UserId, (SimpleVC_Routes) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("cuentaId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("userId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("routetype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("datestart", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("time", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startbeforetolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startaftertolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endbeforetolerance", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endaftertolerance", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["cuentaId"] = (object) this._cuentaId;
      row["userId"] = (object) this._userId;
      row["routetype"] = (object) this._routetype;
      row["datestart"] = (object) this._datestart;
      row["time"] = (object) this._time;
      row["startbeforetolerance"] = (object) this._startbeforetolerance;
      row["startaftertolerance"] = (object) this._startaftertolerance;
      row["endbeforetolerance"] = (object) this._endbeforetolerance;
      row["endaftertolerance"] = (object) this._endaftertolerance;
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
