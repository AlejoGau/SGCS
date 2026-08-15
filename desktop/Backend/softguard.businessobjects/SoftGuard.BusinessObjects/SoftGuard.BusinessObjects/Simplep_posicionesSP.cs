// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Simplep_posicionesSP
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Data;
using System.Runtime.Serialization;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  [DataContract]
  public class Simplep_posicionesSP : SimpleBaseObject
  {
    [DataMember]
    public DateTime? sp_tfechahora { get; set; }

    [DataMember]
    public string sp_cIMEI { get; set; }

    [DataMember]
    public float sp_rLatitud { get; set; }

    [DataMember]
    public float sp_rLongitud { get; set; }

    [DataMember]
    public float sp_rAccuracy { get; set; }

    [DataMember]
    public int sp_iVelocidad { get; set; }

    [DataMember]
    public int sp_iRumbo { get; set; }

    [DataMember]
    public int sp_iOdometro { get; set; }

    [DataMember]
    public int sp_iBatt { get; set; }

    [DataMember]
    public int sp_iSecuencia { get; set; }

    [DataMember]
    public int sp_reciid { get; set; }

    public Simplep_posicionesSP()
    {
      this.InitClass();
    }

    public Simplep_posicionesSP(int Id, string Name, DateTime? sp_tfechahora, string sp_cIMEI, float sp_rLatitud, float sp_rLongitud, float sp_rAccuracy, int sp_iVelocidad, int sp_iRumbo, int sp_iOdometro, int sp_iBatt, int sp_iSecuencia, int sp_reciid)
    {
      this.Id = Id;
      this.Name = Name;
      this.sp_tfechahora = sp_tfechahora;
      this.sp_cIMEI = sp_cIMEI;
      this.sp_rLatitud = sp_rLatitud;
      this.sp_rLongitud = sp_rLongitud;
      this.sp_rAccuracy = sp_rAccuracy;
      this.sp_iVelocidad = sp_iVelocidad;
      this.sp_iRumbo = sp_iRumbo;
      this.sp_iOdometro = sp_iOdometro;
      this.sp_iBatt = sp_iBatt;
      this.sp_iSecuencia = sp_iSecuencia;
      this.sp_reciid = sp_reciid;
      this.InitClass();
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3105, "p_posicionesSP");
    }

    public override SimpleBaseObject GetObject()
    {
      return (SimpleBaseObject) this;
    }

    public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
    {
      BaseObject baseObject = (BaseObject) new Dalp_posicionesSP(SqlConfig, UserId, this);
      if (this.CallerObject != null)
        baseObject.CallerObject = this.CallerObject;
      return baseObject;
    }

    public override CallerObject GetCallerObject()
    {
      Callerp_posicionesSP callerpPosicionesSp = new Callerp_posicionesSP();
      callerpPosicionesSp.Id = this.Id;
      callerpPosicionesSp.Name = this.Name;
      callerpPosicionesSp.sp_tfechahora = this.sp_tfechahora;
      callerpPosicionesSp.sp_cIMEI = this.sp_cIMEI;
      callerpPosicionesSp.sp_rLatitud = this.sp_rLatitud;
      callerpPosicionesSp.sp_rLongitud = this.sp_rLongitud;
      callerpPosicionesSp.sp_rAccuracy = this.sp_rAccuracy;
      callerpPosicionesSp.sp_iVelocidad = this.sp_iVelocidad;
      callerpPosicionesSp.sp_iRumbo = this.sp_iRumbo;
      callerpPosicionesSp.sp_iOdometro = this.sp_iOdometro;
      callerpPosicionesSp.sp_iBatt = this.sp_iBatt;
      callerpPosicionesSp.sp_iSecuencia = this.sp_iSecuencia;
      callerpPosicionesSp.sp_reciid = this.sp_reciid;
      return (CallerObject) callerpPosicionesSp;
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
      row["sp_tfechahora"] = (object) this.sp_tfechahora ?? (object) DBNull.Value;
      row["sp_cIMEI"] = (object) this.sp_cIMEI ?? (object) DBNull.Value;
      row["sp_rLatitud"] = (object) this.sp_rLatitud ?? (object) DBNull.Value;
      row["sp_rLongitud"] = (object) this.sp_rLongitud ?? (object) DBNull.Value;
      row["sp_rAccuracy"] = (object) this.sp_rAccuracy ?? (object) DBNull.Value;
      row["sp_iVelocidad"] = (object) this.sp_iVelocidad ?? (object) DBNull.Value;
      row["sp_iRumbo"] = (object) this.sp_iRumbo ?? (object) DBNull.Value;
      row["sp_iOdometro"] = (object) this.sp_iOdometro ?? (object) DBNull.Value;
      row["sp_iBatt"] = (object) this.sp_iBatt ?? (object) DBNull.Value;
      row["sp_iSecuencia"] = (object) this.sp_iSecuencia ?? (object) DBNull.Value;
      row["sp_reciid"] = (object) this.sp_reciid ?? (object) DBNull.Value;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      XmlDataDocument xmlDataDocument = new XmlDataDocument(new DataSet("Object") { EnforceConstraints = false, Tables = { this.GetDataObject(), this.Type.GetDataObject() } });
      if (this.CallerObject != null)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;
      if (this.Dependencies.Count != 0)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }
  }
}
