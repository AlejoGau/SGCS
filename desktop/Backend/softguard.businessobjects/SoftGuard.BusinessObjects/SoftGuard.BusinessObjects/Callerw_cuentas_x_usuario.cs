// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerw_cuentas_x_usuario
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerw_cuentas_x_usuario : CallerObject
  {
    private int _id_usuario;
    private int _cue_iid;

    public int id_usuario
    {
      get
      {
        return this._id_usuario;
      }
      set
      {
        this._id_usuario = value;
      }
    }

    public int cue_iid
    {
      get
      {
        return this._cue_iid;
      }
      set
      {
        this._cue_iid = value;
      }
    }

    public Callerw_cuentas_x_usuario()
    {
      this.InitClass();
    }

    public Callerw_cuentas_x_usuario(int Id, string Name, int id_usuario, int cue_iid)
    {
      this.Id = Id;
      this.Name = Name;
      this._id_usuario = id_usuario;
      this._cue_iid = cue_iid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3063, "w_cuentas_x_usuario");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplew_cuentas_x_usuario simplewCuentasXUsuario = new Simplew_cuentas_x_usuario();
      simplewCuentasXUsuario.Id = this.Id;
      simplewCuentasXUsuario.Name = this.Name;
      simplewCuentasXUsuario.id_usuario = this._id_usuario;
      simplewCuentasXUsuario.cue_iid = this._cue_iid;
      return (SimpleBaseObject) simplewCuentasXUsuario;
    }

    public void SetSimpleObject(Simplew_cuentas_x_usuario Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._id_usuario = Simple.id_usuario;
      this._cue_iid = Simple.cue_iid;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalw_cuentas_x_usuario(SqlConfig, UserId, (Simplew_cuentas_x_usuario) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("id_usuario", typeof (int)));
      dataTable.Columns.Add(new DataColumn("cue_iid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["id_usuario"] = (object) this._id_usuario;
      row["cue_iid"] = (object) this._cue_iid;
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
