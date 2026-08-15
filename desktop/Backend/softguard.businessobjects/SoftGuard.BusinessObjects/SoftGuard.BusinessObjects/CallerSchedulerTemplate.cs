// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSchedulerTemplate
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerSchedulerTemplate : CallerObject
  {
    private string _config;
    private string _sql;

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

    public CallerSchedulerTemplate()
    {
      this.InitClass();
    }

    public CallerSchedulerTemplate(int Id, string Name, string config, string sql)
    {
      this.Id = Id;
      this.Name = Name;
      this._config = config;
      this._sql = sql;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3115, "SchedulerTemplate");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSchedulerTemplate schedulerTemplate = new SimpleSchedulerTemplate();
      schedulerTemplate.Id = this.Id;
      schedulerTemplate.Name = this.Name;
      schedulerTemplate.config = this._config;
      schedulerTemplate.sql = this._sql;
      return (SimpleBaseObject) schedulerTemplate;
    }

    public void SetSimpleObject(SimpleSchedulerTemplate Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._config = Simple.config;
      this._sql = Simple.sql;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSchedulerTemplate(SqlConfig, UserId, (SimpleSchedulerTemplate) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("config", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sql", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["config"] = (object) this._config;
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
