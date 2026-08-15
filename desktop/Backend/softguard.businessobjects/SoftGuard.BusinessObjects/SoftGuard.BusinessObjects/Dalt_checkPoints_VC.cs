// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_checkPoints_VC
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

namespace SoftGuard.BusinessObjects
{
  public class Dalt_checkPoints_VC : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _chp_cReference;
    private string _chp_cZona;
    private int _chp_iCuenta;
    private float _chp_rLatitud;
    private float _chp_rLongitud;
    private Decimal _chp_nTipo;
    private int _chp_iTolerancia;

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

    public string chp_cReference
    {
      get
      {
        return this._chp_cReference;
      }
      set
      {
        this._chp_cReference = value;
      }
    }

    public string chp_cZona
    {
      get
      {
        return this._chp_cZona;
      }
      set
      {
        this._chp_cZona = value;
      }
    }

    public int chp_iCuenta
    {
      get
      {
        return this._chp_iCuenta;
      }
      set
      {
        this._chp_iCuenta = value;
      }
    }

    public float chp_rLatitud
    {
      get
      {
        return this._chp_rLatitud;
      }
      set
      {
        this._chp_rLatitud = value;
      }
    }

    public float chp_rLongitud
    {
      get
      {
        return this._chp_rLongitud;
      }
      set
      {
        this._chp_rLongitud = value;
      }
    }

    public Decimal chp_nTipo
    {
      get
      {
        return this._chp_nTipo;
      }
      set
      {
        this._chp_nTipo = value;
      }
    }

    public int chp_iTolerancia
    {
      get
      {
        return this._chp_iTolerancia;
      }
      set
      {
        this._chp_iTolerancia = value;
      }
    }

    public Dalt_checkPoints_VC(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_checkPoints_VC(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_checkPoints_VC(SqlHelper SqlConfig, int UserId, Simplet_checkPoints_VC Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._chp_cReference = Simple.chp_cReference;
      this._chp_cZona = Simple.chp_cZona;
      this._chp_iCuenta = Simple.chp_iCuenta;
      this._chp_rLatitud = Simple.chp_rLatitud;
      this._chp_rLongitud = Simple.chp_rLongitud;
      this._chp_nTipo = Simple.chp_nTipo;
      this._chp_iTolerancia = Simple.chp_iTolerancia;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_cReference", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_cZona", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_iCuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_rLatitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_rLongitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_nTipo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_iTolerancia", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@chp_cReference"].Value = this._chp_cReference == null ? (object) DBNull.Value : (object) this._chp_cReference;
              sqlCommand.Parameters["@chp_cZona"].Value = this._chp_cZona == null ? (object) DBNull.Value : (object) this._chp_cZona;
              sqlCommand.Parameters["@chp_iCuenta"].Value = (object) this._chp_iCuenta;
              sqlCommand.Parameters["@chp_rLatitud"].Value = (object) this._chp_rLatitud;
              sqlCommand.Parameters["@chp_rLongitud"].Value = (object) this._chp_rLongitud;
              sqlCommand.Parameters["@chp_nTipo"].Value = (object) this._chp_nTipo;
              sqlCommand.Parameters["@chp_iTolerancia"].Value = (object) this._chp_iTolerancia;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_cReference", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_cZona", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_iCuenta", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_rLatitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_rLongitud", SqlDbType.Real));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_nTipo", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@chp_iTolerancia", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@chp_cReference"].Value = this._chp_cReference == null ? (object) DBNull.Value : (object) this._chp_cReference;
              sqlCommand.Parameters["@chp_cZona"].Value = this._chp_cZona == null ? (object) DBNull.Value : (object) this._chp_cZona;
              sqlCommand.Parameters["@chp_iCuenta"].Value = (object) this._chp_iCuenta;
              sqlCommand.Parameters["@chp_rLatitud"].Value = (object) this._chp_rLatitud;
              sqlCommand.Parameters["@chp_rLongitud"].Value = (object) this._chp_rLongitud;
              sqlCommand.Parameters["@chp_nTipo"].Value = (object) this._chp_nTipo;
              sqlCommand.Parameters["@chp_iTolerancia"].Value = (object) this._chp_iTolerancia;
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
        throw new RuntimeException("The t_checkPoints_VC is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCSel", connection))
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
      Simplet_checkPoints_VC simpletCheckPointsVc = new Simplet_checkPoints_VC();
      simpletCheckPointsVc.Id = this.Id;
      simpletCheckPointsVc.Name = this.Name;
      simpletCheckPointsVc.chp_cReference = this._chp_cReference;
      simpletCheckPointsVc.chp_cZona = this._chp_cZona;
      simpletCheckPointsVc.chp_iCuenta = this._chp_iCuenta;
      simpletCheckPointsVc.chp_rLatitud = this._chp_rLatitud;
      simpletCheckPointsVc.chp_rLongitud = this._chp_rLongitud;
      simpletCheckPointsVc.chp_nTipo = this._chp_nTipo;
      simpletCheckPointsVc.chp_iTolerancia = this._chp_iTolerancia;
      if (this.CallerObject != null)
        simpletCheckPointsVc.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletCheckPointsVc;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_checkPoints_VC simpletCheckPointsVc = (Simplet_checkPoints_VC) BaseSimple;
      this.Id = simpletCheckPointsVc.Id;
      this.Name = simpletCheckPointsVc.Name;
      this._chp_cReference = simpletCheckPointsVc.chp_cReference;
      this._chp_cZona = simpletCheckPointsVc.chp_cZona;
      this._chp_iCuenta = simpletCheckPointsVc.chp_iCuenta;
      this._chp_rLatitud = simpletCheckPointsVc.chp_rLatitud;
      this._chp_rLongitud = simpletCheckPointsVc.chp_rLongitud;
      this._chp_nTipo = simpletCheckPointsVc.chp_nTipo;
      this._chp_iTolerancia = simpletCheckPointsVc.chp_iTolerancia;
      if (simpletCheckPointsVc.CallerObject != null)
        this.CallerObject = simpletCheckPointsVc.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_checkPoints_VC callertCheckPointsVc = new Callert_checkPoints_VC();
      callertCheckPointsVc.Id = this.Id;
      callertCheckPointsVc.Name = this.Name;
      callertCheckPointsVc.chp_cReference = this._chp_cReference;
      callertCheckPointsVc.chp_cZona = this._chp_cZona;
      callertCheckPointsVc.chp_iCuenta = this._chp_iCuenta;
      callertCheckPointsVc.chp_rLatitud = this._chp_rLatitud;
      callertCheckPointsVc.chp_rLongitud = this._chp_rLongitud;
      callertCheckPointsVc.chp_nTipo = this._chp_nTipo;
      callertCheckPointsVc.chp_iTolerancia = this._chp_iTolerancia;
      return (CallerObject) callertCheckPointsVc;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_cReference", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_cZona", typeof (string)));
      dataTable.Columns.Add(new DataColumn("chp_iCuenta", typeof (int)));
      dataTable.Columns.Add(new DataColumn("chp_rLatitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("chp_rLongitud", typeof (float)));
      dataTable.Columns.Add(new DataColumn("chp_nTipo", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("chp_iTolerancia", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["chp_cReference"] = (object) this._chp_cReference;
      row["chp_cZona"] = (object) this._chp_cZona;
      row["chp_iCuenta"] = (object) this._chp_iCuenta;
      row["chp_rLatitud"] = (object) this._chp_rLatitud;
      row["chp_rLongitud"] = (object) this._chp_rLongitud;
      row["chp_nTipo"] = (object) this._chp_nTipo;
      row["chp_iTolerancia"] = (object) this._chp_iTolerancia;
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
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCByChildObject", connection))
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
              Simplet_checkPoints_VC simpletCheckPointsVc = new Simplet_checkPoints_VC();
              simpletCheckPointsVc.Id = sqlDataReader.GetInt32(0);
              simpletCheckPointsVc.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletCheckPointsVc.chp_cReference = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletCheckPointsVc.chp_cZona = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletCheckPointsVc.chp_iCuenta = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpletCheckPointsVc.chp_rLatitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                simpletCheckPointsVc.chp_rLongitud = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                simpletCheckPointsVc.chp_nTipo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletCheckPointsVc.chp_iTolerancia = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              simpletCheckPointsVc.CallerObject = Object.GetCallerObject();
              simpletCheckPointsVc.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletCheckPointsVc);
              objectCollection.Add((SimpleBaseObject) simpletCheckPointsVc);
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
        Simplet_checkPoints_VC simpletCheckPointsVc = new Simplet_checkPoints_VC();
        simpletCheckPointsVc.Id = (int) row["Id"];
        simpletCheckPointsVc.Name = (string) row["Name"];
        simpletCheckPointsVc.chp_cReference = row["chp_cReference"] == DBNull.Value ? "" : (string) row["chp_cReference"];
        simpletCheckPointsVc.chp_cZona = row["chp_cZona"] == DBNull.Value ? "" : (string) row["chp_cZona"];
        simpletCheckPointsVc.chp_iCuenta = row["chp_iCuenta"] == DBNull.Value ? 0 : (int) row["chp_iCuenta"];
        simpletCheckPointsVc.chp_rLatitud = row["chp_rLatitud"] == DBNull.Value ? 0.0f : (float) row["chp_rLatitud"];
        simpletCheckPointsVc.chp_rLongitud = row["chp_rLongitud"] == DBNull.Value ? 0.0f : (float) row["chp_rLongitud"];
        simpletCheckPointsVc.chp_nTipo = row["chp_nTipo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["chp_nTipo"];
        simpletCheckPointsVc.chp_iTolerancia = row["chp_iTolerancia"] == DBNull.Value ? 0 : (int) row["chp_iTolerancia"];
        simpletCheckPointsVc.CallerObject = Object.GetCallerObject();
        simpletCheckPointsVc.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletCheckPointsVc);
        if (Recursive)
          simpletCheckPointsVc.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletCheckPointsVc, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletCheckPointsVc);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCByParentObject", connection))
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
              Simplet_checkPoints_VC simpletCheckPointsVc = new Simplet_checkPoints_VC();
              simpletCheckPointsVc.Id = sqlDataReader.GetInt32(0);
              simpletCheckPointsVc.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletCheckPointsVc.chp_cReference = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletCheckPointsVc.chp_cZona = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletCheckPointsVc.chp_iCuenta = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                simpletCheckPointsVc.chp_rLatitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                simpletCheckPointsVc.chp_rLongitud = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                simpletCheckPointsVc.chp_nTipo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletCheckPointsVc.chp_iTolerancia = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              simpletCheckPointsVc.CallerObject = Object.GetCallerObject();
              simpletCheckPointsVc.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletCheckPointsVc);
              objectCollection.Add((SimpleBaseObject) simpletCheckPointsVc);
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
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_checkPoints_VC Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_checkPoints_VCBySimplet_checkPoints_VC", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@chp_cReference", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@chp_cZona", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@chp_iCuenta", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@chp_rLatitud", SqlDbType.Real));
            selectCommand.Parameters.Add(new SqlParameter("@chp_rLongitud", SqlDbType.Real));
            selectCommand.Parameters.Add(new SqlParameter("@chp_nTipo", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@chp_iTolerancia", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@chp_cReference"].Value = this._chp_cReference == null ? (object) DBNull.Value : (object) this._chp_cReference;
            selectCommand.Parameters["@chp_cZona"].Value = this._chp_cZona == null ? (object) DBNull.Value : (object) this._chp_cZona;
            selectCommand.Parameters["@chp_iCuenta"].Value = (object) this._chp_iCuenta;
            selectCommand.Parameters["@chp_rLatitud"].Value = (object) this._chp_rLatitud;
            selectCommand.Parameters["@chp_rLongitud"].Value = (object) this._chp_rLongitud;
            selectCommand.Parameters["@chp_nTipo"].Value = (object) this._chp_nTipo;
            selectCommand.Parameters["@chp_iTolerancia"].Value = (object) this._chp_iTolerancia;
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

    public IEnumerable<Simplet_checkPoints_VC> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_checkPoints_VC Simple = new Simplet_checkPoints_VC();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.chp_cReference = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.chp_cZona = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.chp_iCuenta = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.chp_rLatitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.chp_rLongitud = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.chp_nTipo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.chp_iTolerancia = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_checkPoints_VC> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_checkPoints_VCByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_checkPoints_VC Simple = new Simplet_checkPoints_VC();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.chp_cReference = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.chp_cZona = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.chp_iCuenta = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.chp_rLatitud = sqlDataReader.IsDBNull(5) ? 0.0f : (float) sqlDataReader.GetValue(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.chp_rLongitud = sqlDataReader.IsDBNull(6) ? 0.0f : (float) sqlDataReader.GetValue(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.chp_nTipo = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.chp_iTolerancia = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3117, "t_checkPoints_VC");
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
          this._chp_cReference = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._chp_cZona = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._chp_iCuenta = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._chp_rLatitud = Reader.IsDBNull(5) ? 0.0f : (float) Reader.GetValue(5);
        if (Reader.FieldCount > 6)
          this._chp_rLongitud = Reader.IsDBNull(6) ? 0.0f : (float) Reader.GetValue(6);
        if (Reader.FieldCount > 7)
          this._chp_nTipo = Reader.IsDBNull(7) ? new Decimal(0) : Reader.GetDecimal(7);
        if (Reader.FieldCount > 8)
          this._chp_iTolerancia = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
      }
      Reader.Close();
    }
  }
}
