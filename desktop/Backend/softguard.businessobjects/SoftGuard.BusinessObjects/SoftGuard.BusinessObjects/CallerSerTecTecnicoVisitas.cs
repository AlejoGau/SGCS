// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.CallerSerTecTecnicoVisitas
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class CallerSerTecTecnicoVisitas : CallerObject
  {
    private int _stv_iTecnico;
    private int _stv_iVisita;
    private int _stv_iFormaDeViaje;

    public int stv_iTecnico
    {
      get
      {
        return this._stv_iTecnico;
      }
      set
      {
        this._stv_iTecnico = value;
      }
    }

    public int stv_iVisita
    {
      get
      {
        return this._stv_iVisita;
      }
      set
      {
        this._stv_iVisita = value;
      }
    }

    public int stv_iFormaDeViaje
    {
      get
      {
        return this._stv_iFormaDeViaje;
      }
      set
      {
        this._stv_iFormaDeViaje = value;
      }
    }

    public CallerSerTecTecnicoVisitas()
    {
      this.InitClass();
    }

    public CallerSerTecTecnicoVisitas(int Id, string Name, int stv_iTecnico, int stv_iVisita, int stv_iFormaDeViaje)
    {
      this.Id = Id;
      this.Name = Name;
      this._stv_iTecnico = stv_iTecnico;
      this._stv_iVisita = stv_iVisita;
      this._stv_iFormaDeViaje = stv_iFormaDeViaje;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3122, "SerTecTecnicoVisitas");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleSerTecTecnicoVisitas tecTecnicoVisitas = new SimpleSerTecTecnicoVisitas();
      tecTecnicoVisitas.Id = this.Id;
      tecTecnicoVisitas.Name = this.Name;
      tecTecnicoVisitas.stv_iTecnico = this._stv_iTecnico;
      tecTecnicoVisitas.stv_iVisita = this._stv_iVisita;
      tecTecnicoVisitas.stv_iFormaDeViaje = this._stv_iFormaDeViaje;
      return (SimpleBaseObject) tecTecnicoVisitas;
    }

    public void SetSimpleObject(SimpleSerTecTecnicoVisitas Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._stv_iTecnico = Simple.stv_iTecnico;
      this._stv_iVisita = Simple.stv_iVisita;
      this._stv_iFormaDeViaje = Simple.stv_iFormaDeViaje;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new DalSerTecTecnicoVisitas(SqlConfig, UserId, (SimpleSerTecTecnicoVisitas) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("stv_iTecnico", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stv_iVisita", typeof (int)));
      dataTable.Columns.Add(new DataColumn("stv_iFormaDeViaje", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["stv_iTecnico"] = (object) this._stv_iTecnico;
      row["stv_iVisita"] = (object) this._stv_iVisita;
      row["stv_iFormaDeViaje"] = (object) this._stv_iFormaDeViaje;
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
