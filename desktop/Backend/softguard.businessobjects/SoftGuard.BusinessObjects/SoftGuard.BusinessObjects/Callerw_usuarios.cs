// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerw_usuarios
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerw_usuarios : CallerObject
  {
    private string _nombrelogin;
    private string _contrasena;
    private bool _first_login;
    private string _nombre_mostrar;
    private string _logo;
    private string _html_bienvenida;
    private int _tipo_vista;
    private int _tipo_vistaM;
    private string _email_novedades;
    private string _email;

    public string nombrelogin
    {
      get
      {
        return this._nombrelogin;
      }
      set
      {
        this._nombrelogin = value;
      }
    }

    public string contrasena
    {
      get
      {
        return this._contrasena;
      }
      set
      {
        this._contrasena = value;
      }
    }

    public bool first_login
    {
      get
      {
        return this._first_login;
      }
      set
      {
        this._first_login = value;
      }
    }

    public string nombre_mostrar
    {
      get
      {
        return this._nombre_mostrar;
      }
      set
      {
        this._nombre_mostrar = value;
      }
    }

    public string logo
    {
      get
      {
        return this._logo;
      }
      set
      {
        this._logo = value;
      }
    }

    public string html_bienvenida
    {
      get
      {
        return this._html_bienvenida;
      }
      set
      {
        this._html_bienvenida = value;
      }
    }

    public int tipo_vista
    {
      get
      {
        return this._tipo_vista;
      }
      set
      {
        this._tipo_vista = value;
      }
    }

    public int tipo_vistaM
    {
      get
      {
        return this._tipo_vistaM;
      }
      set
      {
        this._tipo_vistaM = value;
      }
    }

    public string email_novedades
    {
      get
      {
        return this._email_novedades;
      }
      set
      {
        this._email_novedades = value;
      }
    }

    public string email
    {
      get
      {
        return this._email;
      }
      set
      {
        this._email = value;
      }
    }

    public Callerw_usuarios()
    {
      this.InitClass();
    }

    public Callerw_usuarios(int Id, string Name, string nombrelogin, string contrasena, bool first_login, string nombre_mostrar, string logo, string html_bienvenida, int tipo_vista, int tipo_vistaM, string email_novedades, string email)
    {
      this.Id = Id;
      this.Name = Name;
      this._nombrelogin = nombrelogin;
      this._contrasena = contrasena;
      this._first_login = first_login;
      this._nombre_mostrar = nombre_mostrar;
      this._logo = logo;
      this._html_bienvenida = html_bienvenida;
      this._tipo_vista = tipo_vista;
      this._tipo_vistaM = tipo_vistaM;
      this._email_novedades = email_novedades;
      this._email = email;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3062, "w_usuarios");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplew_usuarios simplewUsuarios = new Simplew_usuarios();
      simplewUsuarios.Id = this.Id;
      simplewUsuarios.Name = this.Name;
      simplewUsuarios.nombrelogin = this._nombrelogin;
      simplewUsuarios.contrasena = this._contrasena;
      simplewUsuarios.first_login = this._first_login;
      simplewUsuarios.nombre_mostrar = this._nombre_mostrar;
      simplewUsuarios.logo = this._logo;
      simplewUsuarios.html_bienvenida = this._html_bienvenida;
      simplewUsuarios.tipo_vista = this._tipo_vista;
      simplewUsuarios.tipo_vistaM = this._tipo_vistaM;
      simplewUsuarios.email_novedades = this._email_novedades;
      simplewUsuarios.email = this._email;
      return (SimpleBaseObject) simplewUsuarios;
    }

    public void SetSimpleObject(Simplew_usuarios Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._nombrelogin = Simple.nombrelogin;
      this._contrasena = Simple.contrasena;
      this._first_login = Simple.first_login;
      this._nombre_mostrar = Simple.nombre_mostrar;
      this._logo = Simple.logo;
      this._html_bienvenida = Simple.html_bienvenida;
      this._tipo_vista = Simple.tipo_vista;
      this._tipo_vistaM = Simple.tipo_vistaM;
      this._email_novedades = Simple.email_novedades;
      this._email = Simple.email;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalw_usuarios(SqlConfig, UserId, (Simplew_usuarios) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nombrelogin", typeof (string)));
      dataTable.Columns.Add(new DataColumn("contrasena", typeof (string)));
      dataTable.Columns.Add(new DataColumn("first_login", typeof (bool)));
      dataTable.Columns.Add(new DataColumn("nombre_mostrar", typeof (string)));
      dataTable.Columns.Add(new DataColumn("logo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("html_bienvenida", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tipo_vista", typeof (int)));
      dataTable.Columns.Add(new DataColumn("tipo_vistaM", typeof (int)));
      dataTable.Columns.Add(new DataColumn("email_novedades", typeof (string)));
      dataTable.Columns.Add(new DataColumn("email", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["nombrelogin"] = (object) this._nombrelogin;
      row["contrasena"] = (object) this._contrasena;
      row["first_login"] = (object) this._first_login;
      row["nombre_mostrar"] = (object) this._nombre_mostrar;
      row["logo"] = (object) this._logo;
      row["html_bienvenida"] = (object) this._html_bienvenida;
      row["tipo_vista"] = (object) this._tipo_vista;
      row["tipo_vistaM"] = (object) this._tipo_vistaM;
      row["email_novedades"] = (object) this._email_novedades;
      row["email"] = (object) this._email;
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
