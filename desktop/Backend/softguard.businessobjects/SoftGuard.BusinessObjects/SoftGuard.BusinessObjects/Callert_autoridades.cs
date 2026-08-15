// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_autoridades
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_autoridades : CallerObject
  {
    private string _aut_cnombre;
    private string _aut_meventos;
    private string _aut_cdealer;
    private string _aut_meventosauto;
    private string _aut_cprovincia;
    private string _aut_cautoprocesados;
    private int _aut_idestino;

    public string aut_cnombre
    {
      get
      {
        return this._aut_cnombre;
      }
      set
      {
        this._aut_cnombre = value;
      }
    }

    public string aut_meventos
    {
      get
      {
        return this._aut_meventos;
      }
      set
      {
        this._aut_meventos = value;
      }
    }

    public string aut_cdealer
    {
      get
      {
        return this._aut_cdealer;
      }
      set
      {
        this._aut_cdealer = value;
      }
    }

    public string aut_meventosauto
    {
      get
      {
        return this._aut_meventosauto;
      }
      set
      {
        this._aut_meventosauto = value;
      }
    }

    public string aut_cprovincia
    {
      get
      {
        return this._aut_cprovincia;
      }
      set
      {
        this._aut_cprovincia = value;
      }
    }

    public string aut_cautoprocesados
    {
      get
      {
        return this._aut_cautoprocesados;
      }
      set
      {
        this._aut_cautoprocesados = value;
      }
    }

    public int aut_idestino
    {
      get
      {
        return this._aut_idestino;
      }
      set
      {
        this._aut_idestino = value;
      }
    }

    public Callert_autoridades()
    {
      this.InitClass();
    }

    public Callert_autoridades(int Id, string Name, string aut_cnombre, string aut_meventos, string aut_cdealer, string aut_meventosauto, string aut_cprovincia, string aut_cautoprocesados, int aut_idestino)
    {
      this.Id = Id;
      this.Name = Name;
      this._aut_cnombre = aut_cnombre;
      this._aut_meventos = aut_meventos;
      this._aut_cdealer = aut_cdealer;
      this._aut_meventosauto = aut_meventosauto;
      this._aut_cprovincia = aut_cprovincia;
      this._aut_cautoprocesados = aut_cautoprocesados;
      this._aut_idestino = aut_idestino;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3128, "t_autoridades");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_autoridades simpletAutoridades = new Simplet_autoridades();
      simpletAutoridades.Id = this.Id;
      simpletAutoridades.Name = this.Name;
      simpletAutoridades.aut_cnombre = this._aut_cnombre;
      simpletAutoridades.aut_meventos = this._aut_meventos;
      simpletAutoridades.aut_cdealer = this._aut_cdealer;
      simpletAutoridades.aut_meventosauto = this._aut_meventosauto;
      simpletAutoridades.aut_cprovincia = this._aut_cprovincia;
      simpletAutoridades.aut_cautoprocesados = this._aut_cautoprocesados;
      simpletAutoridades.aut_idestino = this._aut_idestino;
      return (SimpleBaseObject) simpletAutoridades;
    }

    public void SetSimpleObject(Simplet_autoridades Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._aut_cnombre = Simple.aut_cnombre;
      this._aut_meventos = Simple.aut_meventos;
      this._aut_cdealer = Simple.aut_cdealer;
      this._aut_meventosauto = Simple.aut_meventosauto;
      this._aut_cprovincia = Simple.aut_cprovincia;
      this._aut_cautoprocesados = Simple.aut_cautoprocesados;
      this._aut_idestino = Simple.aut_idestino;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_autoridades(SqlConfig, UserId, (Simplet_autoridades) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_meventos", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_meventosauto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cprovincia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cautoprocesados", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_idestino", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["aut_cnombre"] = (object) this._aut_cnombre;
      row["aut_meventos"] = (object) this._aut_meventos;
      row["aut_cdealer"] = (object) this._aut_cdealer;
      row["aut_meventosauto"] = (object) this._aut_meventosauto;
      row["aut_cprovincia"] = (object) this._aut_cprovincia;
      row["aut_cautoprocesados"] = (object) this._aut_cautoprocesados;
      row["aut_idestino"] = (object) this._aut_idestino;
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
