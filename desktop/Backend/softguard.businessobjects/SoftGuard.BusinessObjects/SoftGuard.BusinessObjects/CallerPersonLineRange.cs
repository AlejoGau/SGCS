// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerPersonLineRange
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerPersonLineRange : CallerObject
  {
    private string _Code;
    private int _RangeStart;
    private int _RangeEnd;
    private int _PersonId;

    public string Code
    {
      get
      {
        return this._Code;
      }
      set
      {
        this._Code = value;
      }
    }

    public int RangeStart
    {
      get
      {
        return this._RangeStart;
      }
      set
      {
        this._RangeStart = value;
      }
    }

    public int RangeEnd
    {
      get
      {
        return this._RangeEnd;
      }
      set
      {
        this._RangeEnd = value;
      }
    }

    public int PersonId
    {
      get
      {
        return this._PersonId;
      }
      set
      {
        this._PersonId = value;
      }
    }

    public CallerPersonLineRange()
    {
      this.InitClass();
    }

    public CallerPersonLineRange(int Id, string Name, string Code, int RangeStart, int RangeEnd, int PersonId)
    {
      this.Id = Id;
      this.Name = Name;
      this._Code = Code;
      this._RangeStart = RangeStart;
      this._RangeEnd = RangeEnd;
      this._PersonId = PersonId;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3035, "PersonLineRange");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimplePersonLineRange simplePersonLineRange = new SimplePersonLineRange();
      simplePersonLineRange.Id = this.Id;
      simplePersonLineRange.Name = this.Name;
      simplePersonLineRange.Code = this._Code;
      simplePersonLineRange.RangeStart = this._RangeStart;
      simplePersonLineRange.RangeEnd = this._RangeEnd;
      simplePersonLineRange.PersonId = this._PersonId;
      return (SimpleBaseObject) simplePersonLineRange;
    }

    public void SetSimpleObject(SimplePersonLineRange Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Code = Simple.Code;
      this._RangeStart = Simple.RangeStart;
      this._RangeEnd = Simple.RangeEnd;
      this._PersonId = Simple.PersonId;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalPersonLineRange(SqlConfig, UserId, (SimplePersonLineRange) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Code", typeof (string)));
      dataTable.Columns.Add(new DataColumn("RangeStart", typeof (int)));
      dataTable.Columns.Add(new DataColumn("RangeEnd", typeof (int)));
      dataTable.Columns.Add(new DataColumn("PersonId", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Code"] = (object) this._Code;
      row["RangeStart"] = (object) this._RangeStart;
      row["RangeEnd"] = (object) this._RangeEnd;
      row["PersonId"] = (object) this._PersonId;
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
