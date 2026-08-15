// Decompiled with JetBrains decompiler
// Type: SoftGuard.BussinesObjects.DalVehicle
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Xml;

namespace SoftGuard.BussinesObjects
{
  public class DalVehicle : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _Brand;
    private string _Model;
    private int _Year;
    private string _Domain;
    private string _Colour;
    private string _VehicleType;
    private byte[] _Photo;
    private string _PhotoType;
    private int _VehicleBrand;
    private int _VehicleModel;
    private int _OwnerTypeId;
    private int _OwnerId;
    private int _DriverTypeId;
    private int _DriverId;
    private int _MaxSpeed;

    public override bool AutoCommit
    {
      get
      {
        return this._AutoCommit;
      }
      set
      {
        this._AutoCommit = value;
      }
    }

    public string Brand
    {
      get
      {
        return this._Brand;
      }
      set
      {
        this._Brand = value;
      }
    }

    public string Model
    {
      get
      {
        return this._Model;
      }
      set
      {
        this._Model = value;
      }
    }

    public int Year
    {
      get
      {
        return this._Year;
      }
      set
      {
        this._Year = value;
      }
    }

    public string Domain
    {
      get
      {
        return this._Domain;
      }
      set
      {
        this._Domain = value;
      }
    }

    public string Colour
    {
      get
      {
        return this._Colour;
      }
      set
      {
        this._Colour = value;
      }
    }

    public string VehicleType
    {
      get
      {
        return this._VehicleType;
      }
      set
      {
        this._VehicleType = value;
      }
    }

    public byte[] Photo
    {
      get
      {
        return this._Photo;
      }
      set
      {
        this._Photo = value;
      }
    }

    public string PhotoType
    {
      get
      {
        return this._PhotoType;
      }
      set
      {
        this._PhotoType = value;
      }
    }

    public int VehicleBrand
    {
      get
      {
        return this._VehicleBrand;
      }
      set
      {
        this._VehicleBrand = value;
      }
    }

    public int VehicleModel
    {
      get
      {
        return this._VehicleModel;
      }
      set
      {
        this._VehicleModel = value;
      }
    }

    public int OwnerTypeId
    {
      get
      {
        return this._OwnerTypeId;
      }
      set
      {
        this._OwnerTypeId = value;
      }
    }

    public int OwnerId
    {
      get
      {
        return this._OwnerId;
      }
      set
      {
        this._OwnerId = value;
      }
    }

    public int DriverTypeId
    {
      get
      {
        return this._DriverTypeId;
      }
      set
      {
        this._DriverTypeId = value;
      }
    }

    public int DriverId
    {
      get
      {
        return this._DriverId;
      }
      set
      {
        this._DriverId = value;
      }
    }

    public int MaxSpeed
    {
      get
      {
        return this._MaxSpeed;
      }
      set
      {
        this._MaxSpeed = value;
      }
    }

    public DalVehicle(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalVehicle(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalVehicle(SqlHelper SqlConfig, int UserId, SimpleVehicle Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._Brand = Simple.Brand;
      this._Model = Simple.Model;
      this._Year = Simple.Year;
      this._Domain = Simple.Domain;
      this._Colour = Simple.Colour;
      this._VehicleType = Simple.VehicleType;
      this._Photo = Simple.Photo;
      this._PhotoType = Simple.PhotoType;
      this._VehicleBrand = Simple.VehicleBrand;
      this._VehicleModel = Simple.VehicleModel;
      this._OwnerTypeId = Simple.OwnerTypeId;
      this._OwnerId = Simple.OwnerId;
      this._DriverTypeId = Simple.DriverTypeId;
      this._DriverId = Simple.DriverId;
      this._MaxSpeed = Simple.MaxSpeed;
    }

    public override void BeginTran()
    {
    }

    public override void CommitTran()
    {
    }

    public override void RollbackTran()
    {
    }

    public override void EndTran()
    {
    }

    public override void Save()
    {
      base.Save();
      this.BeginTran();
      try
      {
        if (this.Id == 0)
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("VehicleIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Brand", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Year", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Domain", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Colour", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@VehicleType", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Photo", SqlDbType.Image));
              sqlCommand.Parameters.Add(new SqlParameter("@PhotoType", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@VehicleBrand", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@VehicleModel", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@OwnerTypeId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@OwnerId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@DriverTypeId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@DriverId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@MaxSpeed", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@Brand"].Value = this._Brand == null ? (object) DBNull.Value : (object) this._Brand;
              sqlCommand.Parameters["@Model"].Value = this._Model == null ? (object) DBNull.Value : (object) this._Model;
              sqlCommand.Parameters["@Year"].Value = (object) this._Year;
              sqlCommand.Parameters["@Domain"].Value = this._Domain == null ? (object) DBNull.Value : (object) this._Domain;
              sqlCommand.Parameters["@Colour"].Value = this._Colour == null ? (object) DBNull.Value : (object) this._Colour;
              sqlCommand.Parameters["@VehicleType"].Value = this._VehicleType == null ? (object) DBNull.Value : (object) this._VehicleType;
              sqlCommand.Parameters["@Photo"].Value = this._Photo == null ? (object) DBNull.Value : (object) this._Photo;
              sqlCommand.Parameters["@PhotoType"].Value = this._PhotoType == null ? (object) DBNull.Value : (object) this._PhotoType;
              sqlCommand.Parameters["@VehicleBrand"].Value = (object) this._VehicleBrand;
              sqlCommand.Parameters["@VehicleModel"].Value = (object) this._VehicleModel;
              sqlCommand.Parameters["@OwnerTypeId"].Value = (object) this._OwnerTypeId;
              sqlCommand.Parameters["@OwnerId"].Value = (object) this._OwnerId;
              sqlCommand.Parameters["@DriverTypeId"].Value = (object) this._DriverTypeId;
              sqlCommand.Parameters["@DriverId"].Value = (object) this._DriverId;
              sqlCommand.Parameters["@MaxSpeed"].Value = (object) this._MaxSpeed;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("VehicleUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Brand", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Year", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Domain", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Colour", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@VehicleType", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@Photo", SqlDbType.Image));
              sqlCommand.Parameters.Add(new SqlParameter("@PhotoType", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@VehicleBrand", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@VehicleModel", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@OwnerTypeId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@OwnerId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@DriverTypeId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@DriverId", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@MaxSpeed", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@Brand"].Value = this._Brand == null ? (object) DBNull.Value : (object) this._Brand;
              sqlCommand.Parameters["@Model"].Value = this._Model == null ? (object) DBNull.Value : (object) this._Model;
              sqlCommand.Parameters["@Year"].Value = (object) this._Year;
              sqlCommand.Parameters["@Domain"].Value = this._Domain == null ? (object) DBNull.Value : (object) this._Domain;
              sqlCommand.Parameters["@Colour"].Value = this._Colour == null ? (object) DBNull.Value : (object) this._Colour;
              sqlCommand.Parameters["@VehicleType"].Value = this._VehicleType == null ? (object) DBNull.Value : (object) this._VehicleType;
              sqlCommand.Parameters["@Photo"].Value = this._Photo == null ? (object) DBNull.Value : (object) this._Photo;
              sqlCommand.Parameters["@PhotoType"].Value = this._PhotoType == null ? (object) DBNull.Value : (object) this._PhotoType;
              sqlCommand.Parameters["@VehicleBrand"].Value = (object) this._VehicleBrand;
              sqlCommand.Parameters["@VehicleModel"].Value = (object) this._VehicleModel;
              sqlCommand.Parameters["@OwnerTypeId"].Value = (object) this._OwnerTypeId;
              sqlCommand.Parameters["@OwnerId"].Value = (object) this._OwnerId;
              sqlCommand.Parameters["@DriverTypeId"].Value = (object) this._DriverTypeId;
              sqlCommand.Parameters["@DriverId"].Value = (object) this._DriverId;
              sqlCommand.Parameters["@MaxSpeed"].Value = (object) this._MaxSpeed;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
      }
      finally
      {
        this.EndTran();
      }
    }

    public override void Delete()
    {
      base.Delete();
      if (this.Id == 0)
        throw new RuntimeException("The Vehicle is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("VehicleDel", connection))
          {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
            sqlCommand.Parameters["@Id"].Value = (object) this.Id;
            connection.Open();
            sqlCommand.ExecuteNonQuery();
          }
        }
      }
      finally
      {
        this.EndTran();
      }
    }

    public new virtual void Load(int Id)
    {
      base.Load(Id);
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VehicleSel", connection))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
          connection.Open();
          sqlCommand.Parameters["@Id"].Value = (object) Id;
          this.FillObject(sqlCommand.ExecuteReader());
          this.OriginalObject = this.GetSimpleObject();
        }
      }
    }

    public override BaseObject GetObject()
    {
      return (BaseObject) this;
    }

    public override SimpleBaseObject GetSimpleObject()
    {
      SimpleVehicle simpleVehicle = new SimpleVehicle();
      simpleVehicle.Id = this.Id;
      simpleVehicle.Name = this.Name;
      simpleVehicle.Brand = this._Brand;
      simpleVehicle.Model = this._Model;
      simpleVehicle.Year = this._Year;
      simpleVehicle.Domain = this._Domain;
      simpleVehicle.Colour = this._Colour;
      simpleVehicle.VehicleType = this._VehicleType;
      simpleVehicle.Photo = this._Photo;
      simpleVehicle.PhotoType = this._PhotoType;
      simpleVehicle.VehicleBrand = this._VehicleBrand;
      simpleVehicle.VehicleModel = this._VehicleModel;
      simpleVehicle.OwnerTypeId = this._OwnerTypeId;
      simpleVehicle.OwnerId = this._OwnerId;
      simpleVehicle.DriverTypeId = this._DriverTypeId;
      simpleVehicle.DriverId = this._DriverId;
      simpleVehicle.MaxSpeed = this._MaxSpeed;
      if (this.CallerObject != null)
        simpleVehicle.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleVehicle;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleVehicle simpleVehicle = (SimpleVehicle) BaseSimple;
      this.Id = simpleVehicle.Id;
      this.Name = simpleVehicle.Name;
      this._Brand = simpleVehicle.Brand;
      this._Model = simpleVehicle.Model;
      this._Year = simpleVehicle.Year;
      this._Domain = simpleVehicle.Domain;
      this._Colour = simpleVehicle.Colour;
      this._VehicleType = simpleVehicle.VehicleType;
      this._Photo = simpleVehicle.Photo;
      this._PhotoType = simpleVehicle.PhotoType;
      this._VehicleBrand = simpleVehicle.VehicleBrand;
      this._VehicleModel = simpleVehicle.VehicleModel;
      this._OwnerTypeId = simpleVehicle.OwnerTypeId;
      this._OwnerId = simpleVehicle.OwnerId;
      this._DriverTypeId = simpleVehicle.DriverTypeId;
      this._DriverId = simpleVehicle.DriverId;
      this._MaxSpeed = simpleVehicle.MaxSpeed;
      if (simpleVehicle.CallerObject != null)
        this.CallerObject = simpleVehicle.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerVehicle callerVehicle = new CallerVehicle();
      callerVehicle.Id = this.Id;
      callerVehicle.Name = this.Name;
      callerVehicle.Brand = this._Brand;
      callerVehicle.Model = this._Model;
      callerVehicle.Year = this._Year;
      callerVehicle.Domain = this._Domain;
      callerVehicle.Colour = this._Colour;
      callerVehicle.VehicleType = this._VehicleType;
      callerVehicle.Photo = this._Photo;
      callerVehicle.PhotoType = this._PhotoType;
      callerVehicle.VehicleBrand = this._VehicleBrand;
      callerVehicle.VehicleModel = this._VehicleModel;
      callerVehicle.OwnerTypeId = this._OwnerTypeId;
      callerVehicle.OwnerId = this._OwnerId;
      callerVehicle.DriverTypeId = this._DriverTypeId;
      callerVehicle.DriverId = this._DriverId;
      callerVehicle.MaxSpeed = this._MaxSpeed;
      return (CallerObject) callerVehicle;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Brand", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Model", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Year", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Domain", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Colour", typeof (string)));
      dataTable.Columns.Add(new DataColumn("VehicleType", typeof (string)));
      dataTable.Columns.Add(new DataColumn("Photo", typeof (byte[])));
      dataTable.Columns.Add(new DataColumn("PhotoType", typeof (string)));
      dataTable.Columns.Add(new DataColumn("VehicleBrand", typeof (int)));
      dataTable.Columns.Add(new DataColumn("VehicleModel", typeof (int)));
      dataTable.Columns.Add(new DataColumn("OwnerTypeId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("OwnerId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("DriverTypeId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("DriverId", typeof (int)));
      dataTable.Columns.Add(new DataColumn("MaxSpeed", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["Brand"] = (object) this._Brand;
      row["Model"] = (object) this._Model;
      row["Year"] = (object) this._Year;
      row["Domain"] = (object) this._Domain;
      row["Colour"] = (object) this._Colour;
      row["VehicleType"] = (object) this._VehicleType;
      row["Photo"] = (object) this._Photo;
      row["PhotoType"] = (object) this._PhotoType;
      row["VehicleBrand"] = (object) this._VehicleBrand;
      row["VehicleModel"] = (object) this._VehicleModel;
      row["OwnerTypeId"] = (object) this._OwnerTypeId;
      row["OwnerId"] = (object) this._OwnerId;
      row["DriverTypeId"] = (object) this._DriverTypeId;
      row["DriverId"] = (object) this._DriverId;
      row["MaxSpeed"] = (object) this._MaxSpeed;
      dataTable.Rows.Add(row);
      return dataTable;
    }

    public override XmlDataDocument GetXmlObject()
    {
      DataSet dataset = new DataSet("Object");
      dataset.EnforceConstraints = false;
      dataset.Tables.Add(this.GetDataObject().Copy());
      dataset.Tables.Add(this.Type.GetDataObject().Copy());
      if (this.CallerObject != null)
        dataset.Tables.Add(this.CallerObject.GetDataObject().Copy());
      XmlDataDocument xmlDataDocument = new XmlDataDocument(dataset);
      if (this.Dependencies.Count != 0)
        xmlDataDocument.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;
      return xmlDataDocument;
    }

    public DataTable GetDataChildsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Childs");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleByChildObject", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
            selectCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
            selectCommand.Parameters["@Id"].Value = (object) Object.Id;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VehicleByChildObject", connection))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
          sqlCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
          sqlCommand.Parameters["@Id"].Value = (object) Object.Id;
          connection.Open();
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVehicle simpleVehicle = new SimpleVehicle();
              simpleVehicle.Id = sqlDataReader.GetInt32(0);
              simpleVehicle.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleVehicle.Brand = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpleVehicle.Model = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpleVehicle.Year = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleVehicle.Domain = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleVehicle.Colour = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpleVehicle.VehicleType = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpleVehicle.Photo = sqlDataReader.IsDBNull(8) ? new byte[0] : new byte[0];
              if (sqlDataReader.FieldCount > 9)
                simpleVehicle.PhotoType = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpleVehicle.VehicleBrand = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                simpleVehicle.VehicleModel = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simpleVehicle.OwnerTypeId = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                simpleVehicle.OwnerId = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              if (sqlDataReader.FieldCount > 14)
                simpleVehicle.DriverTypeId = sqlDataReader.IsDBNull(14) ? 0 : sqlDataReader.GetInt32(14);
              if (sqlDataReader.FieldCount > 15)
                simpleVehicle.DriverId = sqlDataReader.IsDBNull(15) ? 0 : sqlDataReader.GetInt32(15);
              if (sqlDataReader.FieldCount > 16)
                simpleVehicle.MaxSpeed = sqlDataReader.IsDBNull(16) ? 0 : sqlDataReader.GetInt32(16);
              simpleVehicle.CallerObject = Object.GetCallerObject();
              simpleVehicle.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVehicle);
              objectCollection.Add((SimpleBaseObject) simpleVehicle);
            }
          }
          connection.Close();
        }
      }
      return objectCollection;
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      foreach (DataRow row in (InternalDataCollectionBase) this.GetDataChildsByObject(Object).Rows)
      {
        SimpleVehicle simpleVehicle = new SimpleVehicle();
        simpleVehicle.Id = (int) row["Id"];
        simpleVehicle.Name = (string) row["Name"];
        simpleVehicle.Brand = row["Brand"] == DBNull.Value ? "" : (string) row["Brand"];
        simpleVehicle.Model = row["Model"] == DBNull.Value ? "" : (string) row["Model"];
        simpleVehicle.Year = row["Year"] == DBNull.Value ? 0 : (int) row["Year"];
        simpleVehicle.Domain = row["Domain"] == DBNull.Value ? "" : (string) row["Domain"];
        simpleVehicle.Colour = row["Colour"] == DBNull.Value ? "" : (string) row["Colour"];
        simpleVehicle.VehicleType = row["VehicleType"] == DBNull.Value ? "" : (string) row["VehicleType"];
        simpleVehicle.Photo = row["Photo"] == DBNull.Value ? new byte[0] : (byte[]) row["Photo"];
        simpleVehicle.PhotoType = row["PhotoType"] == DBNull.Value ? "" : (string) row["PhotoType"];
        simpleVehicle.VehicleBrand = row["VehicleBrand"] == DBNull.Value ? 0 : (int) row["VehicleBrand"];
        simpleVehicle.VehicleModel = row["VehicleModel"] == DBNull.Value ? 0 : (int) row["VehicleModel"];
        simpleVehicle.OwnerTypeId = row["OwnerTypeId"] == DBNull.Value ? 0 : (int) row["OwnerTypeId"];
        simpleVehicle.OwnerId = row["OwnerId"] == DBNull.Value ? 0 : (int) row["OwnerId"];
        simpleVehicle.DriverTypeId = row["DriverTypeId"] == DBNull.Value ? 0 : (int) row["DriverTypeId"];
        simpleVehicle.DriverId = row["DriverId"] == DBNull.Value ? 0 : (int) row["DriverId"];
        simpleVehicle.MaxSpeed = row["MaxSpeed"] == DBNull.Value ? 0 : (int) row["MaxSpeed"];
        simpleVehicle.CallerObject = Object.GetCallerObject();
        simpleVehicle.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVehicle);
        if (Recursive)
          simpleVehicle.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleVehicle, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleVehicle);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleByParentObject", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
            selectCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
            selectCommand.Parameters["@Id"].Value = (object) Object.Id;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      SimpleBaseObjectCollection objectCollection = new SimpleBaseObjectCollection();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VehicleByParentObject", connection))
        {
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
          sqlCommand.Parameters["@ObjectType"].Value = (object) Object.Type.Name;
          sqlCommand.Parameters["@Id"].Value = (object) Object.Id;
          connection.Open();
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVehicle simpleVehicle = new SimpleVehicle();
              simpleVehicle.Id = sqlDataReader.GetInt32(0);
              simpleVehicle.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleVehicle.Brand = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpleVehicle.Model = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpleVehicle.Year = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpleVehicle.Domain = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleVehicle.Colour = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpleVehicle.VehicleType = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpleVehicle.Photo = sqlDataReader.IsDBNull(8) ? new byte[0] : new byte[0];
              if (sqlDataReader.FieldCount > 9)
                simpleVehicle.PhotoType = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpleVehicle.VehicleBrand = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                simpleVehicle.VehicleModel = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                simpleVehicle.OwnerTypeId = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                simpleVehicle.OwnerId = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              if (sqlDataReader.FieldCount > 14)
                simpleVehicle.DriverTypeId = sqlDataReader.IsDBNull(14) ? 0 : sqlDataReader.GetInt32(14);
              if (sqlDataReader.FieldCount > 15)
                simpleVehicle.DriverId = sqlDataReader.IsDBNull(15) ? 0 : sqlDataReader.GetInt32(15);
              if (sqlDataReader.FieldCount > 16)
                simpleVehicle.MaxSpeed = sqlDataReader.IsDBNull(16) ? 0 : sqlDataReader.GetInt32(16);
              simpleVehicle.CallerObject = Object.GetCallerObject();
              simpleVehicle.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleVehicle);
              objectCollection.Add((SimpleBaseObject) simpleVehicle);
            }
          }
          return objectCollection;
        }
      }
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this.GetDataByName(Name, Taxonomies, PageCount, PagePresent, "Id", ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleByName", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Name"].Value = (object) Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            selectCommand.Parameters["@OrderBy"].Value = (object) OrderBy;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleByNameWithChild", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Name"].Value = (object) Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@ObjectType"].Value = (object) FilterChildObject.Type.Name;
            selectCommand.Parameters["@ObjectId"].Value = (object) FilterChildObject.Id;
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleByNameWithParent", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@ObjectId", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Name"].Value = (object) Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@ObjectType"].Value = (object) FilterParentObject.Type.Name;
            selectCommand.Parameters["@ObjectId"].Value = (object) FilterParentObject.Id;
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleByFilter", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.AddWithValue("@page", (object) Page);
            selectCommand.Parameters.AddWithValue("@start", (object) Start);
            selectCommand.Parameters.AddWithValue("@limit", (object) Limit);
            selectCommand.Parameters.AddWithValue("@sort", (object) Sort);
            selectCommand.Parameters.AddWithValue("@group", (object) Group);
            selectCommand.Parameters.AddWithValue("@filter", (object) Filter);
            selectCommand.Parameters.Add("@totalrows", SqlDbType.Int).Direction = ParameterDirection.Output;
            sqlDataAdapter.Fill(dataTable);
            object obj = selectCommand.Parameters["@totalrows"].Value;
            if (obj != null && obj != DBNull.Value)
              TotalRows = (int) obj;
          }
        }
      }
      return dataTable;
    }

    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      DataTable dataTable = new DataTable("Object");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleByText", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Text", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@Text"].Value = (object) Text;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public DataTable GetDataBySimpleObject(SimpleVehicle Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("VehicleBySimpleVehicle", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Brand", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Year", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@Domain", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Colour", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@VehicleType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Photo", SqlDbType.Image));
            selectCommand.Parameters.Add(new SqlParameter("@PhotoType", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@VehicleBrand", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@VehicleModel", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@OwnerTypeId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@OwnerId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@DriverTypeId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@DriverId", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@MaxSpeed", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@Brand"].Value = this._Brand == null ? (object) DBNull.Value : (object) this._Brand;
            selectCommand.Parameters["@Model"].Value = this._Model == null ? (object) DBNull.Value : (object) this._Model;
            selectCommand.Parameters["@Year"].Value = (object) this._Year;
            selectCommand.Parameters["@Domain"].Value = this._Domain == null ? (object) DBNull.Value : (object) this._Domain;
            selectCommand.Parameters["@Colour"].Value = this._Colour == null ? (object) DBNull.Value : (object) this._Colour;
            selectCommand.Parameters["@VehicleType"].Value = this._VehicleType == null ? (object) DBNull.Value : (object) this._VehicleType;
            selectCommand.Parameters["@Photo"].Value = this._Photo == null ? (object) DBNull.Value : (object) this._Photo;
            selectCommand.Parameters["@PhotoType"].Value = this._PhotoType == null ? (object) DBNull.Value : (object) this._PhotoType;
            selectCommand.Parameters["@VehicleBrand"].Value = (object) this._VehicleBrand;
            selectCommand.Parameters["@VehicleModel"].Value = (object) this._VehicleModel;
            selectCommand.Parameters["@OwnerTypeId"].Value = (object) this._OwnerTypeId;
            selectCommand.Parameters["@OwnerId"].Value = (object) this._OwnerId;
            selectCommand.Parameters["@DriverTypeId"].Value = (object) this._DriverTypeId;
            selectCommand.Parameters["@DriverId"].Value = (object) this._DriverId;
            selectCommand.Parameters["@MaxSpeed"].Value = (object) this._MaxSpeed;
            selectCommand.Parameters["@PageCount"].Value = (object) PageCount;
            selectCommand.Parameters["@PagePresent"].Value = (object) PagePresent;
            selectCommand.Parameters["@PageTotal"].Value = (object) PageTotal;
            selectCommand.Parameters["@RowTotal"].Value = (object) RowTotal;
            connection.Open();
            sqlDataAdapter.Fill(dataTable);
            if (selectCommand.Parameters["@PageTotal"].Value != DBNull.Value)
              PageTotal = int.Parse(selectCommand.Parameters["@PageTotal"].Value.ToString());
            if (selectCommand.Parameters["@RowTotal"].Value != DBNull.Value)
              RowTotal = int.Parse(selectCommand.Parameters["@RowTotal"].Value.ToString());
            connection.Close();
            return dataTable;
          }
        }
      }
    }

    public IEnumerable<SimpleVehicle> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VehicleByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVehicle Simple = new SimpleVehicle();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.Brand = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.Model = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.Year = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.Domain = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.Colour = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.VehicleType = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.Photo = sqlDataReader.IsDBNull(8) ? new byte[0] : new byte[0];
              if (sqlDataReader.FieldCount > 9)
                Simple.PhotoType = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.VehicleBrand = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.VehicleModel = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.OwnerTypeId = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.OwnerId = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.DriverTypeId = sqlDataReader.IsDBNull(14) ? 0 : sqlDataReader.GetInt32(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.DriverId = sqlDataReader.IsDBNull(15) ? 0 : sqlDataReader.GetInt32(15);
              if (sqlDataReader.FieldCount > 16)
                Simple.MaxSpeed = sqlDataReader.IsDBNull(16) ? 0 : sqlDataReader.GetInt32(16);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleVehicle> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("VehicleByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleVehicle Simple = new SimpleVehicle();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.Brand = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.Model = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.Year = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.Domain = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.Colour = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.VehicleType = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.Photo = sqlDataReader.IsDBNull(8) ? new byte[0] : new byte[0];
              if (sqlDataReader.FieldCount > 9)
                Simple.PhotoType = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.VehicleBrand = sqlDataReader.IsDBNull(10) ? 0 : sqlDataReader.GetInt32(10);
              if (sqlDataReader.FieldCount > 11)
                Simple.VehicleModel = sqlDataReader.IsDBNull(11) ? 0 : sqlDataReader.GetInt32(11);
              if (sqlDataReader.FieldCount > 12)
                Simple.OwnerTypeId = sqlDataReader.IsDBNull(12) ? 0 : sqlDataReader.GetInt32(12);
              if (sqlDataReader.FieldCount > 13)
                Simple.OwnerId = sqlDataReader.IsDBNull(13) ? 0 : sqlDataReader.GetInt32(13);
              if (sqlDataReader.FieldCount > 14)
                Simple.DriverTypeId = sqlDataReader.IsDBNull(14) ? 0 : sqlDataReader.GetInt32(14);
              if (sqlDataReader.FieldCount > 15)
                Simple.DriverId = sqlDataReader.IsDBNull(15) ? 0 : sqlDataReader.GetInt32(15);
              if (sqlDataReader.FieldCount > 16)
                Simple.MaxSpeed = sqlDataReader.IsDBNull(16) ? 0 : sqlDataReader.GetInt32(16);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(659, "Vehicle");
    }

    private void SetConfig(SqlHelper SqlConfig)
    {
      this._ConnectionString = SqlConfig.GetConnString();
    }

    private void FillObject(SqlDataReader Reader)
    {
      while (Reader.Read())
      {
        this.Id = Reader.GetInt32(0);
        this.Name = Reader.GetString(1);
        if (Reader.FieldCount > 2)
          this._Brand = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._Model = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._Year = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._Domain = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._Colour = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._VehicleType = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._Photo = Reader.IsDBNull(8) ? new byte[0] : new byte[0];
        if (Reader.FieldCount > 9)
          this._PhotoType = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
        if (Reader.FieldCount > 10)
          this._VehicleBrand = Reader.IsDBNull(10) ? 0 : Reader.GetInt32(10);
        if (Reader.FieldCount > 11)
          this._VehicleModel = Reader.IsDBNull(11) ? 0 : Reader.GetInt32(11);
        if (Reader.FieldCount > 12)
          this._OwnerTypeId = Reader.IsDBNull(12) ? 0 : Reader.GetInt32(12);
        if (Reader.FieldCount > 13)
          this._OwnerId = Reader.IsDBNull(13) ? 0 : Reader.GetInt32(13);
        if (Reader.FieldCount > 14)
          this._DriverTypeId = Reader.IsDBNull(14) ? 0 : Reader.GetInt32(14);
        if (Reader.FieldCount > 15)
          this._DriverId = Reader.IsDBNull(15) ? 0 : Reader.GetInt32(15);
        if (Reader.FieldCount > 16)
          this._MaxSpeed = Reader.IsDBNull(16) ? 0 : Reader.GetInt32(16);
      }
      Reader.Close();
    }
  }
}
