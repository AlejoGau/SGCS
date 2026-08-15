// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerScheduler
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
  public class CallerScheduler : CallerObject
  {
    private int _template;
    private DateTime? _limitdate;
    private int _status;
    private DateTime? _lastchange;
    private string _config;
    private int _eventid;
    private string _eventtype;
    private string _condition;
    private string _sql;

    public int template
    {
      get
      {
        return this._template;
      }
      set
      {
        this._template = value;
      }
    }

    public DateTime? limitdate
    {
      get
      {
        return this._limitdate;
      }
      set
      {
        this._limitdate = value;
      }
    }

    public int status
    {
      get
      {
        return this._status;
      }
      set
      {
        this._status = value;
      }
    }

    public DateTime? lastchange
    {
      get
      {
        return this._lastchange;
      }
      set
      {
        this._lastchange = value;
      }
    }

    public string config
    {
      get
      {
        return this._config;
      }
      set
      {
        this._config = value;
      }
    }

    public int eventid
    {
      get
      {
        return this._eventid;
      }
      set
      {
        this._eventid = value;
      }
    }

    public string eventtype
    {
      get
      {
        return this._eventtype;
      }
      set
      {
        this._eventtype = value;
      }
    }

    public string condition
    {
      get
      {
        return this._condition;
      }
      set
      {
        this._condition = value;
      }
    }

    public string sql
    {
      get
      {
        return this._sql;
      }
      set
      {
        this._sql = value;
      }
    }

    public CallerScheduler()
    {
      this.InitClass();
    }

    public CallerScheduler(int Id, string Name, int template, DateTime? limitdate, int status, DateTime? lastchange, string config, int eventid, string eventtype, string condition, string sql)
    {
      this.Id = Id;
      this.Name = Name;
      this._template = template;
      this._limitdate = limitdate;
      this._status = status;
      this._lastchange = lastchange;
      this._config = config;
      this._eventid = eventid;
      this._eventtype = eventtype;
      this._condition = condition;
      this._sql = sql;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3114, "Scheduler");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleScheduler simpleScheduler = new SimpleScheduler();
      simpleScheduler.Id = this.Id;
      simpleScheduler.Name = this.Name;
      simpleScheduler.template = this._template;
      simpleScheduler.limitdate = this._limitdate;
      simpleScheduler.status = this._status;
      simpleScheduler.lastchange = this._lastchange;
      simpleScheduler.config = this._config;
      simpleScheduler.eventid = this._eventid;
      simpleScheduler.eventtype = this._eventtype;
      simpleScheduler.condition = this._condition;
      simpleScheduler.sql = this._sql;
      return (SimpleBaseObject) simpleScheduler;
    }

    public void SetSimpleObject(SimpleScheduler Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._template = Simple.template;
      this._limitdate = Simple.limitdate;
      this._status = Simple.status;
      this._lastchange = Simple.lastchange;
      this._config = Simple.config;
      this._eventid = Simple.eventid;
      this._eventtype = Simple.eventtype;
      this._condition = Simple.condition;
      this._sql = Simple.sql;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalScheduler(SqlConfig, UserId, (SimpleScheduler) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("template", typeof (int)));
      dataTable.Columns.Add(new DataColumn("limitdate", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("status", typeof (int)));
      dataTable.Columns.Add(new DataColumn("lastchange", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("config", typeof (string)));
      dataTable.Columns.Add(new DataColumn("eventid", typeof (int)));
      dataTable.Columns.Add(new DataColumn("eventtype", typeof (string)));
      dataTable.Columns.Add(new DataColumn("condition", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sql", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["template"] = (object) this._template;
      row["limitdate"] = (object) this._limitdate;
      row["status"] = (object) this._status;
      row["lastchange"] = (object) this._lastchange;
      row["config"] = (object) this._config;
      row["eventid"] = (object) this._eventid;
      row["eventtype"] = (object) this._eventtype;
      row["condition"] = (object) this._condition;
      row["sql"] = (object) this._sql;
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
