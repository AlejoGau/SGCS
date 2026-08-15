// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalp_VirtualIR
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
  public class Dalp_VirtualIR : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _vir_cDll;
    private DateTime? _vir_tFechaHora;
    private Decimal _vir_nStatus;
    private string _vir_cPackage;

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

    public string vir_cDll
    {
      get
      {
        return this._vir_cDll;
      }
      set
      {
        this._vir_cDll = value;
      }
    }

    public DateTime? vir_tFechaHora
    {
      get
      {
        return this._vir_tFechaHora;
      }
      set
      {
        this._vir_tFechaHora = value;
      }
    }

    public Decimal vir_nStatus
    {
      get
      {
        return this._vir_nStatus;
      }
      set
      {
        this._vir_nStatus = value;
      }
    }

    public string vir_cPackage
    {
      get
      {
        return this._vir_cPackage;
      }
      set
      {
        this._vir_cPackage = value;
      }
    }

    public Dalp_VirtualIR(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalp_VirtualIR(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalp_VirtualIR(SqlHelper SqlConfig, int UserId, Simplep_VirtualIR Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._vir_cDll = Simple.vir_cDll;
      this._vir_tFechaHora = Simple.vir_tFechaHora;
      this._vir_nStatus = Simple.vir_nStatus;
      this._vir_cPackage = Simple.vir_cPackage;
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
            using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_cDll", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_tFechaHora", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_nStatus", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_cPackage", SqlDbType.NText));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@vir_cDll"].Value = this._vir_cDll == null ? (object) DBNull.Value : (object) this._vir_cDll;
              SqlParameter parameter = sqlCommand.Parameters["@vir_tFechaHora"];
              DateTime? virTFechaHora = this._vir_tFechaHora;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!virTFechaHora.HasValue ? 0 : (virTFechaHora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._vir_tFechaHora;
              parameter.Value = obj;
              sqlCommand.Parameters["@vir_nStatus"].Value = (object) this._vir_nStatus;
              sqlCommand.Parameters["@vir_cPackage"].Value = this._vir_cPackage == null ? (object) DBNull.Value : (object) this._vir_cPackage;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_cDll", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_tFechaHora", SqlDbType.DateTime));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_nStatus", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@vir_cPackage", SqlDbType.NText));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@vir_cDll"].Value = this._vir_cDll == null ? (object) DBNull.Value : (object) this._vir_cDll;
              SqlParameter parameter = sqlCommand.Parameters["@vir_tFechaHora"];
              DateTime? virTFechaHora = this._vir_tFechaHora;
              DateTime dateTime = new DateTime(1, 1, 1);
              object obj = (!virTFechaHora.HasValue ? 0 : (virTFechaHora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._vir_tFechaHora;
              parameter.Value = obj;
              sqlCommand.Parameters["@vir_nStatus"].Value = (object) this._vir_nStatus;
              sqlCommand.Parameters["@vir_cPackage"].Value = this._vir_cPackage == null ? (object) DBNull.Value : (object) this._vir_cPackage;
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
        throw new RuntimeException("The p_VirtualIR is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRSel", connection))
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
      Simplep_VirtualIR simplepVirtualIr = new Simplep_VirtualIR();
      simplepVirtualIr.Id = this.Id;
      simplepVirtualIr.Name = this.Name;
      simplepVirtualIr.vir_cDll = this._vir_cDll;
      simplepVirtualIr.vir_tFechaHora = this._vir_tFechaHora;
      simplepVirtualIr.vir_nStatus = this._vir_nStatus;
      simplepVirtualIr.vir_cPackage = this._vir_cPackage;
      if (this.CallerObject != null)
        simplepVirtualIr.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplepVirtualIr;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplep_VirtualIR simplepVirtualIr = (Simplep_VirtualIR) BaseSimple;
      this.Id = simplepVirtualIr.Id;
      this.Name = simplepVirtualIr.Name;
      this._vir_cDll = simplepVirtualIr.vir_cDll;
      this._vir_tFechaHora = simplepVirtualIr.vir_tFechaHora;
      this._vir_nStatus = simplepVirtualIr.vir_nStatus;
      this._vir_cPackage = simplepVirtualIr.vir_cPackage;
      if (simplepVirtualIr.CallerObject != null)
        this.CallerObject = simplepVirtualIr.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerp_VirtualIR callerpVirtualIr = new Callerp_VirtualIR();
      callerpVirtualIr.Id = this.Id;
      callerpVirtualIr.Name = this.Name;
      callerpVirtualIr.vir_cDll = this._vir_cDll;
      callerpVirtualIr.vir_tFechaHora = this._vir_tFechaHora;
      callerpVirtualIr.vir_nStatus = this._vir_nStatus;
      callerpVirtualIr.vir_cPackage = this._vir_cPackage;
      return (CallerObject) callerpVirtualIr;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("vir_cDll", typeof (string)));
      dataTable.Columns.Add(new DataColumn("vir_tFechaHora", typeof (DateTime)));
      dataTable.Columns.Add(new DataColumn("vir_nStatus", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("vir_cPackage", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["vir_cDll"] = (object) this._vir_cDll;
      row["vir_tFechaHora"] = (object) this._vir_tFechaHora;
      row["vir_nStatus"] = (object) this._vir_nStatus;
      row["vir_cPackage"] = (object) this._vir_cPackage;
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
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRByChildObject", connection))
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
              Simplep_VirtualIR simplepVirtualIr = new Simplep_VirtualIR();
              simplepVirtualIr.Id = sqlDataReader.GetInt32(0);
              simplepVirtualIr.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplepVirtualIr.vir_cDll = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplepVirtualIr.vir_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                simplepVirtualIr.vir_nStatus = sqlDataReader.IsDBNull(4) ? new Decimal(0) : sqlDataReader.GetDecimal(4);
              if (sqlDataReader.FieldCount > 5)
                simplepVirtualIr.vir_cPackage = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              simplepVirtualIr.CallerObject = Object.GetCallerObject();
              simplepVirtualIr.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplepVirtualIr);
              objectCollection.Add((SimpleBaseObject) simplepVirtualIr);
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
        Simplep_VirtualIR simplepVirtualIr = new Simplep_VirtualIR();
        simplepVirtualIr.Id = (int) row["Id"];
        simplepVirtualIr.Name = (string) row["Name"];
        simplepVirtualIr.vir_cDll = row["vir_cDll"] == DBNull.Value ? "" : (string) row["vir_cDll"];
        simplepVirtualIr.vir_tFechaHora = row["vir_tFechaHora"] == DBNull.Value ? new DateTime?(new DateTime(1, 1, 1)) : (DateTime?) row["vir_tFechaHora"];
        simplepVirtualIr.vir_nStatus = row["vir_nStatus"] == DBNull.Value ? new Decimal(0) : (Decimal) row["vir_nStatus"];
        simplepVirtualIr.vir_cPackage = row["vir_cPackage"] == DBNull.Value ? "" : (string) row["vir_cPackage"];
        simplepVirtualIr.CallerObject = Object.GetCallerObject();
        simplepVirtualIr.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplepVirtualIr);
        if (Recursive)
          simplepVirtualIr.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplepVirtualIr, Recursive);
        objectCollection.Add((SimpleBaseObject) simplepVirtualIr);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRByParentObject", connection))
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
              Simplep_VirtualIR simplepVirtualIr = new Simplep_VirtualIR();
              simplepVirtualIr.Id = sqlDataReader.GetInt32(0);
              simplepVirtualIr.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplepVirtualIr.vir_cDll = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplepVirtualIr.vir_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                simplepVirtualIr.vir_nStatus = sqlDataReader.IsDBNull(4) ? new Decimal(0) : sqlDataReader.GetDecimal(4);
              if (sqlDataReader.FieldCount > 5)
                simplepVirtualIr.vir_cPackage = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              simplepVirtualIr.CallerObject = Object.GetCallerObject();
              simplepVirtualIr.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplepVirtualIr);
              objectCollection.Add((SimpleBaseObject) simplepVirtualIr);
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
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplep_VirtualIR Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("p_VirtualIRBySimplep_VirtualIR", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@vir_cDll", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@vir_tFechaHora", SqlDbType.DateTime));
            selectCommand.Parameters.Add(new SqlParameter("@vir_nStatus", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@vir_cPackage", SqlDbType.NText));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@vir_cDll"].Value = this._vir_cDll == null ? (object) DBNull.Value : (object) this._vir_cDll;
            SqlParameter parameter = selectCommand.Parameters["@vir_tFechaHora"];
            DateTime? virTFechaHora = this._vir_tFechaHora;
            DateTime dateTime = new DateTime(1, 1, 1);
            object obj = (!virTFechaHora.HasValue ? 0 : (virTFechaHora.GetValueOrDefault() == dateTime ? 1 : 0)) != 0 ? (object) DBNull.Value : (object) this._vir_tFechaHora;
            parameter.Value = obj;
            selectCommand.Parameters["@vir_nStatus"].Value = (object) this._vir_nStatus;
            selectCommand.Parameters["@vir_cPackage"].Value = this._vir_cPackage == null ? (object) DBNull.Value : (object) this._vir_cPackage;
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

    public IEnumerable<Simplep_VirtualIR> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplep_VirtualIR Simple = new Simplep_VirtualIR();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.vir_cDll = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.vir_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                Simple.vir_nStatus = sqlDataReader.IsDBNull(4) ? new Decimal(0) : sqlDataReader.GetDecimal(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.vir_cPackage = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplep_VirtualIR> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("p_VirtualIRByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplep_VirtualIR Simple = new Simplep_VirtualIR();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.vir_cDll = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.vir_tFechaHora = new DateTime?(sqlDataReader.IsDBNull(3) ? new DateTime(1, 1, 1) : sqlDataReader.GetDateTime(3));
              if (sqlDataReader.FieldCount > 4)
                Simple.vir_nStatus = sqlDataReader.IsDBNull(4) ? new Decimal(0) : sqlDataReader.GetDecimal(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.vir_cPackage = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3104, "p_VirtualIR");
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
          this._vir_cDll = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._vir_tFechaHora = new DateTime?(Reader.IsDBNull(3) ? new DateTime(1, 1, 1) : Reader.GetDateTime(3));
        if (Reader.FieldCount > 4)
          this._vir_nStatus = Reader.IsDBNull(4) ? new Decimal(0) : Reader.GetDecimal(4);
        if (Reader.FieldCount > 5)
          this._vir_cPackage = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
      }
      Reader.Close();
    }
  }
}
