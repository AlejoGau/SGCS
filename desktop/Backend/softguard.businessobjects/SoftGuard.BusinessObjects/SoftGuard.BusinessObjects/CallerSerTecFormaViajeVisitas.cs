// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSerTecFormaViajeVisitas
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerSerTecFormaViajeVisitas : CallerObject
  {
    private string _sfv_cNombre;

    public string sfv_cNombre
    {
      get
      {
        return this._sfv_cNombre;
      }
      set
      {
        this._sfv_cNombre = value;
      }
    }

    public CallerSerTecFormaViajeVisitas()
    {
      this.InitClass();
    }

    public CallerSerTecFormaViajeVisitas(int Id, string Name, string sfv_cNombre)
    {
      this.Id = Id;
      this.Name = Name;
      this._sfv_cNombre = sfv_cNombre;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3125, "SerTecFormaViajeVisitas");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSerTecFormaViajeVisitas formaViajeVisitas = new SimpleSerTecFormaViajeVisitas();
      formaViajeVisitas.Id = this.Id;
      formaViajeVisitas.Name = this.Name;
      formaViajeVisitas.sfv_cNombre = this._sfv_cNombre;
      return (SimpleBaseObject) formaViajeVisitas;
    }

    public void SetSimpleObject(SimpleSerTecFormaViajeVisitas Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._sfv_cNombre = Simple.sfv_cNombre;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSerTecFormaViajeVisitas(SqlConfig, UserId, (SimpleSerTecFormaViajeVisitas) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sfv_cNombre", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["sfv_cNombre"] = (object) this._sfv_cNombre;
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
