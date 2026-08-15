// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalDealerRango
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
  public class DalDealerRango : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _NombreEntidad;
    private int _IdEntidad;
    private string _Dealer;
    private string _CuentaDesde;
    private string _CuentaHasta;

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

    public string NombreEntidad
    {
      get
      {
        return this._NombreEntidad;
      }
      set
      {
        this._NombreEntidad = value;
      }
    }

    public int IdEntidad
    {
      get
      {
        return this._IdEntidad;
      }
      set
      {
        this._IdEntidad = value;
      }
    }

    public string Dealer
    {
      get
      {
        return this._Dealer;
      }
      set
      {
        this._Dealer = value;
      }
    }

    public string CuentaDesde
    {
      get
      {
        return this._CuentaDesde;
      }
      set
      {
        this._CuentaDesde = value;
      }
    }

    public string CuentaHasta
    {
      get
      {
        return this._CuentaHasta;
      }
      set
      {
        this._CuentaHasta = value;
      }
    }

    public DalDealerRango(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalDealerRango(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalDealerRango(SqlHelper SqlConfig, int UserId, SimpleDealerRango Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._NombreEntidad = Simple.NombreEntidad;
      this._IdEntidad = Simple.IdEntidad;
      this._Dealer = Simple.Dealer;
      this._CuentaDesde = Simple.CuentaDesde;
      this._CuentaHasta = Simple.CuentaHasta;
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
            using (SqlCommand sqlCommand = new SqlCommand("DealerRangoIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@NombreEntidad", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@IdEntidad", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Dealer", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@CuentaDesde", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@CuentaHasta", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@NombreEntidad"].Value = this._NombreEntidad == null ? (object) DBNull.Value : (object) this._NombreEntidad;
              sqlCommand.Parameters["@IdEntidad"].Value = (object) this._IdEntidad;
              sqlCommand.Parameters["@Dealer"].Value = this._Dealer == null ? (object) DBNull.Value : (object) this._Dealer;
              sqlCommand.Parameters["@CuentaDesde"].Value = this._CuentaDesde == null ? (object) DBNull.Value : (object) this._CuentaDesde;
              sqlCommand.Parameters["@CuentaHasta"].Value = this._CuentaHasta == null ? (object) DBNull.Value : (object) this._CuentaHasta;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("DealerRangoUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@NombreEntidad", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@IdEntidad", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Dealer", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@CuentaDesde", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@CuentaHasta", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@NombreEntidad"].Value = this._NombreEntidad == null ? (object) DBNull.Value : (object) this._NombreEntidad;
              sqlCommand.Parameters["@IdEntidad"].Value = (object) this._IdEntidad;
              sqlCommand.Parameters["@Dealer"].Value = this._Dealer == null ? (object) DBNull.Value : (object) this._Dealer;
              sqlCommand.Parameters["@CuentaDesde"].Value = this._CuentaDesde == null ? (object) DBNull.Value : (object) this._CuentaDesde;
              sqlCommand.Parameters["@CuentaHasta"].Value = this._CuentaHasta == null ? (object) DBNull.Value : (object) this._CuentaHasta;
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
        throw new RuntimeException("The DealerRango is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("DealerRangoDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("DealerRangoSel", connection))
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
      SimpleDealerRango simpleDealerRango = new SimpleDealerRango();
      simpleDealerRango.Id = this.Id;
      simpleDealerRango.Name = this.Name;
      simpleDealerRango.NombreEntidad = this._NombreEntidad;
      simpleDealerRango.IdEntidad = this._IdEntidad;
      simpleDealerRango.Dealer = this._Dealer;
      simpleDealerRango.CuentaDesde = this._CuentaDesde;
      simpleDealerRango.CuentaHasta = this._CuentaHasta;
      if (this.CallerObject != null)
        simpleDealerRango.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpleDealerRango;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleDealerRango simpleDealerRango = (SimpleDealerRango) BaseSimple;
      this.Id = simpleDealerRango.Id;
      this.Name = simpleDealerRango.Name;
      this._NombreEntidad = simpleDealerRango.NombreEntidad;
      this._IdEntidad = simpleDealerRango.IdEntidad;
      this._Dealer = simpleDealerRango.Dealer;
      this._CuentaDesde = simpleDealerRango.CuentaDesde;
      this._CuentaHasta = simpleDealerRango.CuentaHasta;
      if (simpleDealerRango.CallerObject != null)
        this.CallerObject = simpleDealerRango.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerDealerRango callerDealerRango = new CallerDealerRango();
      callerDealerRango.Id = this.Id;
      callerDealerRango.Name = this.Name;
      callerDealerRango.NombreEntidad = this._NombreEntidad;
      callerDealerRango.IdEntidad = this._IdEntidad;
      callerDealerRango.Dealer = this._Dealer;
      callerDealerRango.CuentaDesde = this._CuentaDesde;
      callerDealerRango.CuentaHasta = this._CuentaHasta;
      return (CallerObject) callerDealerRango;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("NombreEntidad", typeof (string)));
      dataTable.Columns.Add(new DataColumn("IdEntidad", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Dealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("CuentaDesde", typeof (string)));
      dataTable.Columns.Add(new DataColumn("CuentaHasta", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["NombreEntidad"] = (object) this._NombreEntidad;
      row["IdEntidad"] = (object) this._IdEntidad;
      row["Dealer"] = (object) this._Dealer;
      row["CuentaDesde"] = (object) this._CuentaDesde;
      row["CuentaHasta"] = (object) this._CuentaHasta;
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
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("DealerRangoByChildObject", connection))
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
              SimpleDealerRango simpleDealerRango = new SimpleDealerRango();
              simpleDealerRango.Id = sqlDataReader.GetInt32(0);
              simpleDealerRango.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleDealerRango.NombreEntidad = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpleDealerRango.IdEntidad = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simpleDealerRango.Dealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleDealerRango.CuentaDesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleDealerRango.CuentaHasta = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              simpleDealerRango.CallerObject = Object.GetCallerObject();
              simpleDealerRango.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleDealerRango);
              objectCollection.Add((SimpleBaseObject) simpleDealerRango);
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
        SimpleDealerRango simpleDealerRango = new SimpleDealerRango();
        simpleDealerRango.Id = (int) row["Id"];
        simpleDealerRango.Name = (string) row["Name"];
        simpleDealerRango.NombreEntidad = row["NombreEntidad"] == DBNull.Value ? "" : (string) row["NombreEntidad"];
        simpleDealerRango.IdEntidad = row["IdEntidad"] == DBNull.Value ? 0 : (int) row["IdEntidad"];
        simpleDealerRango.Dealer = row["Dealer"] == DBNull.Value ? "" : (string) row["Dealer"];
        simpleDealerRango.CuentaDesde = row["CuentaDesde"] == DBNull.Value ? "" : (string) row["CuentaDesde"];
        simpleDealerRango.CuentaHasta = row["CuentaHasta"] == DBNull.Value ? "" : (string) row["CuentaHasta"];
        simpleDealerRango.CallerObject = Object.GetCallerObject();
        simpleDealerRango.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleDealerRango);
        if (Recursive)
          simpleDealerRango.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpleDealerRango, Recursive);
        objectCollection.Add((SimpleBaseObject) simpleDealerRango);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("DealerRangoByParentObject", connection))
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
              SimpleDealerRango simpleDealerRango = new SimpleDealerRango();
              simpleDealerRango.Id = sqlDataReader.GetInt32(0);
              simpleDealerRango.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpleDealerRango.NombreEntidad = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpleDealerRango.IdEntidad = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                simpleDealerRango.Dealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpleDealerRango.CuentaDesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpleDealerRango.CuentaHasta = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              simpleDealerRango.CallerObject = Object.GetCallerObject();
              simpleDealerRango.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpleDealerRango);
              objectCollection.Add((SimpleBaseObject) simpleDealerRango);
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
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleDealerRango Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("DealerRangoBySimpleDealerRango", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@NombreEntidad", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@IdEntidad", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@Dealer", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@CuentaDesde", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@CuentaHasta", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@NombreEntidad"].Value = this._NombreEntidad == null ? (object) DBNull.Value : (object) this._NombreEntidad;
            selectCommand.Parameters["@IdEntidad"].Value = (object) this._IdEntidad;
            selectCommand.Parameters["@Dealer"].Value = this._Dealer == null ? (object) DBNull.Value : (object) this._Dealer;
            selectCommand.Parameters["@CuentaDesde"].Value = this._CuentaDesde == null ? (object) DBNull.Value : (object) this._CuentaDesde;
            selectCommand.Parameters["@CuentaHasta"].Value = this._CuentaHasta == null ? (object) DBNull.Value : (object) this._CuentaHasta;
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

    public IEnumerable<SimpleDealerRango> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("DealerRangoByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleDealerRango Simple = new SimpleDealerRango();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.NombreEntidad = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.IdEntidad = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.Dealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.CuentaDesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.CuentaHasta = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleDealerRango> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("DealerRangoByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleDealerRango Simple = new SimpleDealerRango();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.NombreEntidad = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.IdEntidad = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.Dealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.CuentaDesde = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.CuentaHasta = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3066, "DealerRango");
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
          this._NombreEntidad = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._IdEntidad = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        if (Reader.FieldCount > 4)
          this._Dealer = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._CuentaDesde = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._CuentaHasta = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
      }
      Reader.Close();
    }
  }
}
