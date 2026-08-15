// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerw_destinatarios_correo
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerw_destinatarios_correo : CallerObject
  {
    private string _destino;
    private string _email_destino;

    public string destino
    {
      get
      {
        return this._destino;
      }
      set
      {
        this._destino = value;
      }
    }

    public string email_destino
    {
      get
      {
        return this._email_destino;
      }
      set
      {
        this._email_destino = value;
      }
    }

    public Callerw_destinatarios_correo()
    {
      this.InitClass();
    }

    public Callerw_destinatarios_correo(int Id, string Name, string destino, string email_destino)
    {
      this.Id = Id;
      this.Name = Name;
      this._destino = destino;
      this._email_destino = email_destino;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3155, "w_destinatarios_correo");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplew_destinatarios_correo destinatariosCorreo = new Simplew_destinatarios_correo();
      destinatariosCorreo.Id = this.Id;
      destinatariosCorreo.Name = this.Name;
      destinatariosCorreo.destino = this._destino;
      destinatariosCorreo.email_destino = this._email_destino;
      return (SimpleBaseObject) destinatariosCorreo;
    }

    public void SetSimpleObject(Simplew_destinatarios_correo Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._destino = Simple.destino;
      this._email_destino = Simple.email_destino;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalw_destinatarios_correo(SqlConfig, UserId, (Simplew_destinatarios_correo) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("destino", typeof (string)));
      dataTable.Columns.Add(new DataColumn("email_destino", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["destino"] = (object) this._destino;
      row["email_destino"] = (object) this._email_destino;
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
