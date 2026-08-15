// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSchedulerPrograms
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerSchedulerPrograms : CallerObject
  {
    private int _cuentaId;
    private string _eventos;
    private string _eventogenerar;
    private int _zonaiid;
    private int _usuarioiid;
    private string _programtype;
    private int _starthour;
    private int _startminutes;
    private int _endhour;
    private int _endminutes;
    private int _dayofweek;
    private int _dayofmonth;

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

    public string eventos
    {
      get
      {
        return this._eventos;
      }
      set
      {
        this._eventos = value;
      }
    }

    public string eventogenerar
    {
      get
      {
        return this._eventogenerar;
      }
      set
      {
        this._eventogenerar = value;
      }
    }

    public int zonaiid
    {
      get
      {
        return this._zonaiid;
      }
      set
      {
        this._zonaiid = value;
      }
    }

    public int usuarioiid
    {
      get
      {
        return this._usuarioiid;
      }
      set
      {
        this._usuarioiid = value;
      }
    }

    public string programtype
    {
      get
      {
        return this._programtype;
      }
      set
      {
        this._programtype = value;
      }
    }

    public int starthour
    {
      get
      {
        return this._starthour;
      }
      set
      {
        this._starthour = value;
      }
    }

    public int startminutes
    {
      get
      {
        return this._startminutes;
      }
      set
      {
        this._startminutes = value;
      }
    }

    public int endhour
    {
      get
      {
        return this._endhour;
      }
      set
      {
        this._endhour = value;
      }
    }

    public int endminutes
    {
      get
      {
        return this._endminutes;
      }
      set
      {
        this._endminutes = value;
      }
    }

    public int dayofweek
    {
      get
      {
        return this._dayofweek;
      }
      set
      {
        this._dayofweek = value;
      }
    }

    public int dayofmonth
    {
      get
      {
        return this._dayofmonth;
      }
      set
      {
        this._dayofmonth = value;
      }
    }

    public CallerSchedulerPrograms()
    {
      this.InitClass();
    }

    public CallerSchedulerPrograms(int Id, string Name, int cuentaId, string eventos, string eventogenerar, int zonaiid, int usuarioiid, string programtype, int starthour, int startminutes, int endhour, int endminutes, int dayofweek, int dayofmonth)
    {
      this.Id = Id;
      this.Name = Name;
      this._cuentaId = cuentaId;
      this._eventos = eventos;
      this._eventogenerar = eventogenerar;
      this._zonaiid = zonaiid;
      this._usuarioiid = usuarioiid;
      this._programtype = programtype;
      this._starthour = starthour;
      this._startminutes = startminutes;
      this._endhour = endhour;
      this._endminutes = endminutes;
      this._dayofweek = dayofweek;
      this._dayofmonth = dayofmonth;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3133, "SchedulerPrograms");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSchedulerPrograms schedulerPrograms = new SimpleSchedulerPrograms();
      schedulerPrograms.Id = this.Id;
      schedulerPrograms.Name = this.Name;
      schedulerPrograms.cuentaId = this._cuentaId;
      schedulerPrograms.eventos = this._eventos;
      schedulerPrograms.eventogenerar = this._eventogenerar;
      schedulerPrograms.zonaiid = this._zonaiid;
      schedulerPrograms.usuarioiid = this._usuarioiid;
      schedulerPrograms.programtype = this._programtype;
      schedulerPrograms.starthour = this._starthour;
      schedulerPrograms.startminutes = this._startminutes;
      schedulerPrograms.endhour = this._endhour;
      schedulerPrograms.endminutes = this._endminutes;
      schedulerPrograms.dayofweek = this._dayofweek;
      schedulerPrograms.dayofmonth = this._dayofmonth;
      return (SimpleBaseObject) schedulerPrograms;
    }

    public void SetSimpleObject(SimpleSchedulerPrograms Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._cuentaId = Simple.cuentaId;
      this._eventos = Simple.eventos;
      this._eventogenerar = Simple.eventogenerar;
      this._zonaiid = Simple.zonaiid;
      this._usuarioiid = Simple.usuarioiid;
      this._programtype = Simple.programtype;
      this._starthour = Simple.starthour;
      this._startminutes = Simple.startminutes;
      this._endhour = Simple.endhour;
      this._endminutes = Simple.endminutes;
      this._dayofweek = Simple.dayofweek;
      this._dayofmonth = Simple.dayofmonth;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSchedulerPrograms(SqlConfig, UserId, (SimpleSchedulerPrograms) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("cuentaId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("eventos", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eventogenerar", typeof (string)));
      dataTable.Columns.Add(new DataColumn("zonaiid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("usuarioiid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("programtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("starthour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("startminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endhour", typeof (int)));
      dataTable.Columns.Add(new DataColumn("endminutes", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofweek", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dayofmonth", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["cuentaId"] = (object) this._cuentaId;
      row["eventos"] = (object) this._eventos;
      row["eventogenerar"] = (object) this._eventogenerar;
      row["zonaiid"] = (object) this._zonaiid;
      row["usuarioiid"] = (object) this._usuarioiid;
      row["programtype"] = (object) this._programtype;
      row["starthour"] = (object) this._starthour;
      row["startminutes"] = (object) this._startminutes;
      row["endhour"] = (object) this._endhour;
      row["endminutes"] = (object) this._endminutes;
      row["dayofweek"] = (object) this._dayofweek;
      row["dayofmonth"] = (object) this._dayofmonth;
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
