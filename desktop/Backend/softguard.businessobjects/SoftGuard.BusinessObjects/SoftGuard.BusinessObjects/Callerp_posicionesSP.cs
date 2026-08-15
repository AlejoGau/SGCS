// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Callerp_posicionesSP
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public class Callerp_posicionesSP : CallerObject
  {
    private DateTime? _sp_tfechahora;
    private string _sp_cIMEI;
    private float _sp_rLatitud;
    private float _sp_rLongitud;
    private float _sp_rAccuracy;
    private int _sp_iVelocidad;
    private int _sp_iRumbo;
    private int _sp_iOdometro;
    private int _sp_iBatt;
    private int _sp_iSecuencia;
    private int _sp_reciid;

    public DateTime? sp_tfechahora
    {
      get
      {
        return this._sp_tfechahora;
      }
      set
      {
        this._sp_tfechahora = value;
      }
    }

    public string sp_cIMEI
    {
      get
      {
        return this._sp_cIMEI;
      }
      set
      {
        this._sp_cIMEI = value;
      }
    }

    public float sp_rLatitud
    {
      get
      {
        return this._sp_rLatitud;
      }
      set
      {
        this._sp_rLatitud = value;
      }
    }

    public float sp_rLongitud
    {
      get
      {
        return this._sp_rLongitud;
      }
      set
      {
        this._sp_rLongitud = value;
      }
    }

    public float sp_rAccuracy
    {
      get
      {
        return this._sp_rAccuracy;
      }
      set
      {
        this._sp_rAccuracy = value;
      }
    }

    public int sp_iVelocidad
    {
      get
      {
        return this._sp_iVelocidad;
      }
      set
      {
        this._sp_iVelocidad = value;
      }
    }

    public int sp_iRumbo
    {
      get
      {
        return this._sp_iRumbo;
      }
      set
      {
        this._sp_iRumbo = value;
      }
    }

    public int sp_iOdometro
    {
      get
      {
        return this._sp_iOdometro;
      }
      set
      {
        this._sp_iOdometro = value;
      }
    }

    public int sp_iBatt
    {
      get
      {
        return this._sp_iBatt;
      }
      set
      {
        this._sp_iBatt = value;
      }
    }

    public int sp_iSecuencia
    {
      get
      {
        return this._sp_iSecuencia;
      }
      set
      {
        this._sp_iSecuencia = value;
      }
    }

    public int sp_reciid
    {
      get
      {
        return this._sp_reciid;
      }
      set
      {
        this._sp_reciid = value;
      }
    }

    public Callerp_posicionesSP()
    {
      this.InitClass();
    }

    public Callerp_posicionesSP(int Id, string Name, DateTime? sp_tfechahora, string sp_cIMEI, float sp_rLatitud, float sp_rLongitud, float sp_rAccuracy, int sp_iVelocidad, int sp_iRumbo, int sp_iOdometro, int sp_iBatt, int sp_iSecuencia, int sp_reciid)
    {
      this.Id = Id;
      this.Name = Name;
      this._sp_tfechahora = sp_tfechahora;
      this._sp_cIMEI = sp_cIMEI;
      this._sp_rLatitud = sp_rLatitud;
      this._sp_rLongitud = sp_rLongitud;
      this._sp_rAccuracy = sp_rAccuracy;
      this._sp_iVelocidad = sp_iVelocidad;
      this._sp_iRumbo = sp_iRumbo;
      this._sp_iOdometro = sp_iOdometro;
      this._sp_iBatt = sp_iBatt;
      this._sp_iSecuencia = sp_iSecuencia;
      this._sp_reciid = sp_reciid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3105, "p_posicionesSP");
    }

    public override CallerObject GetObject()
    {
      return (CallerObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      Simplep_posicionesSP simplepPosicionesSp = new Simplep_posicionesSP();
      simplepPosicionesSp.Id = this.Id;
      simplepPosicionesSp.Name = this.Name;
      simplepPosicionesSp.sp_tfechahora = this._sp_tfechahora;
      simplepPosicionesSp.sp_cIMEI = this._sp_cIMEI;
      simplepPosicionesSp.sp_rLatitud = this._sp_rLatitud;
      simplepPosicionesSp.sp_rLongitud = this._sp_rLongitud;
      simplepPosicionesSp.sp_rAccuracy = this._sp_rAccuracy;
      simplepPosicionesSp.sp_iVelocidad = this._sp_iVelocidad;
      simplepPosicionesSp.sp_iRumbo = this._sp_iRumbo;
      simplepPosicionesSp.sp_iOdometro = this._sp_iOdometro;
      simplepPosicionesSp.sp_iBatt = this._sp_iBatt;
      simplepPosicionesSp.sp_iSecuencia = this._sp_iSecuencia;
      simplepPosicionesSp.sp_reciid = this._sp_reciid;
      return (SimpleBaseObject) simplepPosicionesSp;
    }

    public void SetSimpleObject(Simplep_posicionesSP Simple)
    {
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._sp_tfechahora = Simple.sp_tfechahora;
      this._sp_cIMEI = Simple.sp_cIMEI;
      this._sp_rLatitud = Simple.sp_rLatitud;
      this._sp_rLongitud = Simple.sp_rLongitud;
      this._sp_rAccuracy = Simple.sp_rAccuracy;
      this._sp_iVelocidad = Simple.sp_iVelocidad;
      this._sp_iRumbo = Simple.sp_iRumbo;
      this._sp_iOdometro = Simple.sp_iOdometro;
      this._sp_iBatt = Simple.sp_iBatt;
      this._sp_iSecuencia = Simple.sp_iSecuencia;
      this._sp_reciid = Simple.sp_reciid;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      return (BaseObject) new Dalp_posicionesSP(SqlConfig, UserId, (Simplep_posicionesSP) this.GetSimpleObject());
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sp_tfechahora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("sp_cIMEI", typeof (string)));
      dataTable.Columns.Add(new DataColumn("sp_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("sp_rLongitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("sp_rAccuracy", typeof (float)));
      dataTable.Columns.Add(new DataColumn("sp_iVelocidad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iRumbo", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iOdometro", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iBatt", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_iSecuencia", typeof (int)));
      dataTable.Columns.Add(new DataColumn("sp_reciid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["sp_tfechahora"] = (object) this._sp_tfechahora;
      row["sp_cIMEI"] = (object) this._sp_cIMEI;
      row["sp_rLatitud"] = (object) this._sp_rLatitud;
      row["sp_rLongitud"] = (object) this._sp_rLongitud;
      row["sp_rAccuracy"] = (object) this._sp_rAccuracy;
      row["sp_iVelocidad"] = (object) this._sp_iVelocidad;
      row["sp_iRumbo"] = (object) this._sp_iRumbo;
      row["sp_iOdometro"] = (object) this._sp_iOdometro;
      row["sp_iBatt"] = (object) this._sp_iBatt;
      row["sp_iSecuencia"] = (object) this._sp_iSecuencia;
      row["sp_reciid"] = (object) this._sp_reciid;
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
