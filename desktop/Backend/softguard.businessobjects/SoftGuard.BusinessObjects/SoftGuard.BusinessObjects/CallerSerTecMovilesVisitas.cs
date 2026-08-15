// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSerTecMovilesVisitas
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerSerTecMovilesVisitas : CallerObject
  {
    private int _smv_iMovil;
    private int _smv_iVisita;

    public int smv_iMovil
    {
      get
      {
        return this._smv_iMovil;
      }
      set
      {
        this._smv_iMovil = value;
      }
    }

    public int smv_iVisita
    {
      get
      {
        return this._smv_iVisita;
      }
      set
      {
        this._smv_iVisita = value;
      }
    }

    public CallerSerTecMovilesVisitas()
    {
      this.InitClass();
    }

    public CallerSerTecMovilesVisitas(int Id, string Name, int smv_iMovil, int smv_iVisita)
    {
      this.Id = Id;
      this.Name = Name;
      this._smv_iMovil = smv_iMovil;
      this._smv_iVisita = smv_iVisita;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3122, "SerTecMovilesVisitas");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSerTecMovilesVisitas tecMovilesVisitas = new SimpleSerTecMovilesVisitas();
      tecMovilesVisitas.Id = this.Id;
      tecMovilesVisitas.Name = this.Name;
      tecMovilesVisitas.smv_iMovil = this._smv_iMovil;
      tecMovilesVisitas.smv_iVisita = this._smv_iVisita;
      return (SimpleBaseObject) tecMovilesVisitas;
    }

    public void SetSimpleObject(SimpleSerTecMovilesVisitas Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._smv_iMovil = Simple.smv_iMovil;
      this._smv_iVisita = Simple.smv_iVisita;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSerTecMovilesVisitas(SqlConfig, UserId, (SimpleSerTecMovilesVisitas) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("smv_iMovil", typeof (int)));
      dataTable.Columns.Add(new DataColumn("smv_iVisita", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["smv_iMovil"] = (object) this._smv_iMovil;
      row["smv_iVisita"] = (object) this._smv_iVisita;
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
