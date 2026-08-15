// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callert_parametros
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callert_parametros : CallerObject
  {
    private string _par_ccodigo;
    private string _par_cdescripcion;
    private int _par_ivalor;
    private string _par_mobservacion;
    private string _par_cconfig;
    private string _par_ccomentario;
    private string _par_cvalor;

    public string par_ccodigo
    {
      get
      {
        return this._par_ccodigo;
      }
      set
      {
        this._par_ccodigo = value;
      }
    }

    public string par_cdescripcion
    {
      get
      {
        return this._par_cdescripcion;
      }
      set
      {
        this._par_cdescripcion = value;
      }
    }

    public int par_ivalor
    {
      get
      {
        return this._par_ivalor;
      }
      set
      {
        this._par_ivalor = value;
      }
    }

    public string par_mobservacion
    {
      get
      {
        return this._par_mobservacion;
      }
      set
      {
        this._par_mobservacion = value;
      }
    }

    public string par_cconfig
    {
      get
      {
        return this._par_cconfig;
      }
      set
      {
        this._par_cconfig = value;
      }
    }

    public string par_ccomentario
    {
      get
      {
        return this._par_ccomentario;
      }
      set
      {
        this._par_ccomentario = value;
      }
    }

    public string par_cvalor
    {
      get
      {
        return this._par_cvalor;
      }
      set
      {
        this._par_cvalor = value;
      }
    }

    public Callert_parametros()
    {
      this.InitClass();
    }

    public Callert_parametros(int Id, string Name, string par_ccodigo, string par_cdescripcion, int par_ivalor, string par_mobservacion, string par_cconfig, string par_ccomentario, string par_cvalor)
    {
      this.Id = Id;
      this.Name = Name;
      this._par_ccodigo = par_ccodigo;
      this._par_cdescripcion = par_cdescripcion;
      this._par_ivalor = par_ivalor;
      this._par_mobservacion = par_mobservacion;
      this._par_cconfig = par_cconfig;
      this._par_ccomentario = par_ccomentario;
      this._par_cvalor = par_cvalor;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3094, "t_parametros");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplet_parametros simpletParametros = new Simplet_parametros();
      simpletParametros.Id = this.Id;
      simpletParametros.Name = this.Name;
      simpletParametros.par_ccodigo = this._par_ccodigo;
      simpletParametros.par_cdescripcion = this._par_cdescripcion;
      simpletParametros.par_ivalor = this._par_ivalor;
      simpletParametros.par_mobservacion = this._par_mobservacion;
      simpletParametros.par_cconfig = this._par_cconfig;
      simpletParametros.par_ccomentario = this._par_ccomentario;
      simpletParametros.par_cvalor = this._par_cvalor;
      return (SimpleBaseObject) simpletParametros;
    }

    public void SetSimpleObject(Simplet_parametros Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._par_ccodigo = Simple.par_ccodigo;
      this._par_cdescripcion = Simple.par_cdescripcion;
      this._par_ivalor = Simple.par_ivalor;
      this._par_mobservacion = Simple.par_mobservacion;
      this._par_cconfig = Simple.par_cconfig;
      this._par_ccomentario = Simple.par_ccomentario;
      this._par_cvalor = Simple.par_cvalor;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalt_parametros(SqlConfig, UserId, (Simplet_parametros) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_ivalor", typeof (int)));
      dataTable.Columns.Add(new DataColumn("par_mobservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_cconfig", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_ccomentario", typeof (string)));
      dataTable.Columns.Add(new DataColumn("par_cvalor", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["par_ccodigo"] = (object) this._par_ccodigo;
      row["par_cdescripcion"] = (object) this._par_cdescripcion;
      row["par_ivalor"] = (object) this._par_ivalor;
      row["par_mobservacion"] = (object) this._par_mobservacion;
      row["par_cconfig"] = (object) this._par_cconfig;
      row["par_ccomentario"] = (object) this._par_ccomentario;
      row["par_cvalor"] = (object) this._par_cvalor;
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
