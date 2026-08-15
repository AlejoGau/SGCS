// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.DalUsersDesktopWebModulos
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
  public class DalUsersDesktopWebModulos : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private int _dwm_idKey;
    private int _dwm_idWeb;
    private int _dwm_idModules;
    private string _dwm_idTabla;
    private string _dwm_dealer;
    private string _dwm_cuenta_desde;
    private string _dwm_cuenta_hasta;
    private string _dwm_data;

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

    public int dwm_idKey
    {
      get
      {
        return this._dwm_idKey;
      }
      set
      {
        this._dwm_idKey = value;
      }
    }

    public int dwm_idWeb
    {
      get
      {
        return this._dwm_idWeb;
      }
      set
      {
        this._dwm_idWeb = value;
      }
    }

    public int dwm_idModules
    {
      get
      {
        return this._dwm_idModules;
      }
      set
      {
        this._dwm_idModules = value;
      }
    }

    public string dwm_idTabla
    {
      get
      {
        return this._dwm_idTabla;
      }
      set
      {
        this._dwm_idTabla = value;
      }
    }

    public string dwm_dealer
    {
      get
      {
        return this._dwm_dealer;
      }
      set
      {
        this._dwm_dealer = value;
      }
    }

    public string dwm_cuenta_desde
    {
      get
      {
        return this._dwm_cuenta_desde;
      }
      set
      {
        this._dwm_cuenta_desde = value;
      }
    }

    public string dwm_cuenta_hasta
    {
      get
      {
        return this._dwm_cuenta_hasta;
      }
      set
      {
        this._dwm_cuenta_hasta = value;
      }
    }

    public string dwm_data
    {
      get
      {
        return this._dwm_data;
      }
      set
      {
        this._dwm_data = value;
      }
    }

    public DalUsersDesktopWebModulos(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public DalUsersDesktopWebModulos(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public DalUsersDesktopWebModulos(SqlHelper SqlConfig, int UserId, SimpleUsersDesktopWebModulos Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._dwm_idKey = Simple.dwm_idKey;
      this._dwm_idWeb = Simple.dwm_idWeb;
      this._dwm_idModules = Simple.dwm_idModules;
      this._dwm_idTabla = Simple.dwm_idTabla;
      this._dwm_dealer = Simple.dwm_dealer;
      this._dwm_cuenta_desde = Simple.dwm_cuenta_desde;
      this._dwm_cuenta_hasta = Simple.dwm_cuenta_hasta;
      this._dwm_data = Simple.dwm_data;
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
            using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idKey", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idWeb", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idModules", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idTabla", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_dealer", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_cuenta_desde", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_cuenta_hasta", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_data", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@dwm_idKey"].Value = (object) this._dwm_idKey;
              sqlCommand.Parameters["@dwm_idWeb"].Value = (object) this._dwm_idWeb;
              sqlCommand.Parameters["@dwm_idModules"].Value = (object) this._dwm_idModules;
              sqlCommand.Parameters["@dwm_idTabla"].Value = this._dwm_idTabla == null ? (object) DBNull.Value : (object) this._dwm_idTabla;
              sqlCommand.Parameters["@dwm_dealer"].Value = this._dwm_dealer == null ? (object) DBNull.Value : (object) this._dwm_dealer;
              sqlCommand.Parameters["@dwm_cuenta_desde"].Value = this._dwm_cuenta_desde == null ? (object) DBNull.Value : (object) this._dwm_cuenta_desde;
              sqlCommand.Parameters["@dwm_cuenta_hasta"].Value = this._dwm_cuenta_hasta == null ? (object) DBNull.Value : (object) this._dwm_cuenta_hasta;
              sqlCommand.Parameters["@dwm_data"].Value = this._dwm_data == null ? (object) DBNull.Value : (object) this._dwm_data;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idKey", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idWeb", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idModules", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_idTabla", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_dealer", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_cuenta_desde", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_cuenta_hasta", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@dwm_data", SqlDbType.NVarChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@dwm_idKey"].Value = (object) this._dwm_idKey;
              sqlCommand.Parameters["@dwm_idWeb"].Value = (object) this._dwm_idWeb;
              sqlCommand.Parameters["@dwm_idModules"].Value = (object) this._dwm_idModules;
              sqlCommand.Parameters["@dwm_idTabla"].Value = this._dwm_idTabla == null ? (object) DBNull.Value : (object) this._dwm_idTabla;
              sqlCommand.Parameters["@dwm_dealer"].Value = this._dwm_dealer == null ? (object) DBNull.Value : (object) this._dwm_dealer;
              sqlCommand.Parameters["@dwm_cuenta_desde"].Value = this._dwm_cuenta_desde == null ? (object) DBNull.Value : (object) this._dwm_cuenta_desde;
              sqlCommand.Parameters["@dwm_cuenta_hasta"].Value = this._dwm_cuenta_hasta == null ? (object) DBNull.Value : (object) this._dwm_cuenta_hasta;
              sqlCommand.Parameters["@dwm_data"].Value = this._dwm_data == null ? (object) DBNull.Value : (object) this._dwm_data;
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
        throw new RuntimeException("The UsersDesktopWebModulos is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosSel", connection))
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
      SimpleUsersDesktopWebModulos desktopWebModulos = new SimpleUsersDesktopWebModulos();
      desktopWebModulos.Id = this.Id;
      desktopWebModulos.Name = this.Name;
      desktopWebModulos.dwm_idKey = this._dwm_idKey;
      desktopWebModulos.dwm_idWeb = this._dwm_idWeb;
      desktopWebModulos.dwm_idModules = this._dwm_idModules;
      desktopWebModulos.dwm_idTabla = this._dwm_idTabla;
      desktopWebModulos.dwm_dealer = this._dwm_dealer;
      desktopWebModulos.dwm_cuenta_desde = this._dwm_cuenta_desde;
      desktopWebModulos.dwm_cuenta_hasta = this._dwm_cuenta_hasta;
      desktopWebModulos.dwm_data = this._dwm_data;
      if (this.CallerObject != null)
        desktopWebModulos.CallerObject = this.CallerObject;
      return (SimpleBaseObject) desktopWebModulos;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      SimpleUsersDesktopWebModulos desktopWebModulos = (SimpleUsersDesktopWebModulos) BaseSimple;
      this.Id = desktopWebModulos.Id;
      this.Name = desktopWebModulos.Name;
      this._dwm_idKey = desktopWebModulos.dwm_idKey;
      this._dwm_idWeb = desktopWebModulos.dwm_idWeb;
      this._dwm_idModules = desktopWebModulos.dwm_idModules;
      this._dwm_idTabla = desktopWebModulos.dwm_idTabla;
      this._dwm_dealer = desktopWebModulos.dwm_dealer;
      this._dwm_cuenta_desde = desktopWebModulos.dwm_cuenta_desde;
      this._dwm_cuenta_hasta = desktopWebModulos.dwm_cuenta_hasta;
      this._dwm_data = desktopWebModulos.dwm_data;
      if (desktopWebModulos.CallerObject != null)
        this.CallerObject = desktopWebModulos.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      CallerUsersDesktopWebModulos desktopWebModulos = new CallerUsersDesktopWebModulos();
      desktopWebModulos.Id = this.Id;
      desktopWebModulos.Name = this.Name;
      desktopWebModulos.dwm_idKey = this._dwm_idKey;
      desktopWebModulos.dwm_idWeb = this._dwm_idWeb;
      desktopWebModulos.dwm_idModules = this._dwm_idModules;
      desktopWebModulos.dwm_idTabla = this._dwm_idTabla;
      desktopWebModulos.dwm_dealer = this._dwm_dealer;
      desktopWebModulos.dwm_cuenta_desde = this._dwm_cuenta_desde;
      desktopWebModulos.dwm_cuenta_hasta = this._dwm_cuenta_hasta;
      desktopWebModulos.dwm_data = this._dwm_data;
      return (CallerObject) desktopWebModulos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_idKey", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dwm_idWeb", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dwm_idModules", typeof (int)));
      dataTable.Columns.Add(new DataColumn("dwm_idTabla", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_dealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_cuenta_desde", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_cuenta_hasta", typeof (string)));
      dataTable.Columns.Add(new DataColumn("dwm_data", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["dwm_idKey"] = (object) this._dwm_idKey;
      row["dwm_idWeb"] = (object) this._dwm_idWeb;
      row["dwm_idModules"] = (object) this._dwm_idModules;
      row["dwm_idTabla"] = (object) this._dwm_idTabla;
      row["dwm_dealer"] = (object) this._dwm_dealer;
      row["dwm_cuenta_desde"] = (object) this._dwm_cuenta_desde;
      row["dwm_cuenta_hasta"] = (object) this._dwm_cuenta_hasta;
      row["dwm_data"] = (object) this._dwm_data;
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
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosByChildObject", connection))
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
              SimpleUsersDesktopWebModulos desktopWebModulos = new SimpleUsersDesktopWebModulos();
              desktopWebModulos.Id = sqlDataReader.GetInt32(0);
              desktopWebModulos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                desktopWebModulos.dwm_idKey = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                desktopWebModulos.dwm_idWeb = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                desktopWebModulos.dwm_idModules = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                desktopWebModulos.dwm_idTabla = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                desktopWebModulos.dwm_dealer = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                desktopWebModulos.dwm_cuenta_desde = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                desktopWebModulos.dwm_cuenta_hasta = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                desktopWebModulos.dwm_data = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              desktopWebModulos.CallerObject = Object.GetCallerObject();
              desktopWebModulos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) desktopWebModulos);
              objectCollection.Add((SimpleBaseObject) desktopWebModulos);
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
        SimpleUsersDesktopWebModulos desktopWebModulos = new SimpleUsersDesktopWebModulos();
        desktopWebModulos.Id = (int) row["Id"];
        desktopWebModulos.Name = (string) row["Name"];
        desktopWebModulos.dwm_idKey = row["dwm_idKey"] == DBNull.Value ? 0 : (int) row["dwm_idKey"];
        desktopWebModulos.dwm_idWeb = row["dwm_idWeb"] == DBNull.Value ? 0 : (int) row["dwm_idWeb"];
        desktopWebModulos.dwm_idModules = row["dwm_idModules"] == DBNull.Value ? 0 : (int) row["dwm_idModules"];
        desktopWebModulos.dwm_idTabla = row["dwm_idTabla"] == DBNull.Value ? "" : (string) row["dwm_idTabla"];
        desktopWebModulos.dwm_dealer = row["dwm_dealer"] == DBNull.Value ? "" : (string) row["dwm_dealer"];
        desktopWebModulos.dwm_cuenta_desde = row["dwm_cuenta_desde"] == DBNull.Value ? "" : (string) row["dwm_cuenta_desde"];
        desktopWebModulos.dwm_cuenta_hasta = row["dwm_cuenta_hasta"] == DBNull.Value ? "" : (string) row["dwm_cuenta_hasta"];
        desktopWebModulos.dwm_data = row["dwm_data"] == DBNull.Value ? "" : (string) row["dwm_data"];
        desktopWebModulos.CallerObject = Object.GetCallerObject();
        desktopWebModulos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) desktopWebModulos);
        if (Recursive)
          desktopWebModulos.Dependencies = this.GetChildsByObject((SimpleBaseObject) desktopWebModulos, Recursive);
        objectCollection.Add((SimpleBaseObject) desktopWebModulos);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosByParentObject", connection))
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
              SimpleUsersDesktopWebModulos desktopWebModulos = new SimpleUsersDesktopWebModulos();
              desktopWebModulos.Id = sqlDataReader.GetInt32(0);
              desktopWebModulos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                desktopWebModulos.dwm_idKey = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                desktopWebModulos.dwm_idWeb = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                desktopWebModulos.dwm_idModules = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                desktopWebModulos.dwm_idTabla = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                desktopWebModulos.dwm_dealer = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                desktopWebModulos.dwm_cuenta_desde = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                desktopWebModulos.dwm_cuenta_hasta = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                desktopWebModulos.dwm_data = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              desktopWebModulos.CallerObject = Object.GetCallerObject();
              desktopWebModulos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) desktopWebModulos);
              objectCollection.Add((SimpleBaseObject) desktopWebModulos);
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
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosByText", connection))
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

    public DataTable GetDataBySimpleObject(SimpleUsersDesktopWebModulos Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("UsersDesktopWebModulosBySimpleUsersDesktopWebModulos", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_idKey", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_idWeb", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_idModules", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_idTabla", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_dealer", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_cuenta_desde", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_cuenta_hasta", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@dwm_data", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@dwm_idKey"].Value = (object) this._dwm_idKey;
            selectCommand.Parameters["@dwm_idWeb"].Value = (object) this._dwm_idWeb;
            selectCommand.Parameters["@dwm_idModules"].Value = (object) this._dwm_idModules;
            selectCommand.Parameters["@dwm_idTabla"].Value = this._dwm_idTabla == null ? (object) DBNull.Value : (object) this._dwm_idTabla;
            selectCommand.Parameters["@dwm_dealer"].Value = this._dwm_dealer == null ? (object) DBNull.Value : (object) this._dwm_dealer;
            selectCommand.Parameters["@dwm_cuenta_desde"].Value = this._dwm_cuenta_desde == null ? (object) DBNull.Value : (object) this._dwm_cuenta_desde;
            selectCommand.Parameters["@dwm_cuenta_hasta"].Value = this._dwm_cuenta_hasta == null ? (object) DBNull.Value : (object) this._dwm_cuenta_hasta;
            selectCommand.Parameters["@dwm_data"].Value = this._dwm_data == null ? (object) DBNull.Value : (object) this._dwm_data;
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

    public IEnumerable<SimpleUsersDesktopWebModulos> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleUsersDesktopWebModulos Simple = new SimpleUsersDesktopWebModulos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.dwm_idKey = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.dwm_idWeb = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.dwm_idModules = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.dwm_idTabla = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.dwm_dealer = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.dwm_cuenta_desde = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.dwm_cuenta_hasta = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.dwm_data = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<SimpleUsersDesktopWebModulos> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("UsersDesktopWebModulosByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              SimpleUsersDesktopWebModulos Simple = new SimpleUsersDesktopWebModulos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.dwm_idKey = sqlDataReader.IsDBNull(2) ? 0 : sqlDataReader.GetInt32(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.dwm_idWeb = sqlDataReader.IsDBNull(3) ? 0 : sqlDataReader.GetInt32(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.dwm_idModules = sqlDataReader.IsDBNull(4) ? 0 : sqlDataReader.GetInt32(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.dwm_idTabla = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.dwm_dealer = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.dwm_cuenta_desde = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.dwm_cuenta_hasta = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.dwm_data = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3051, "UsersDesktopWebModulos");
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
          this._dwm_idKey = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
        if (Reader.FieldCount > 3)
          this._dwm_idWeb = Reader.IsDBNull(3) ? 0 : Reader.GetInt32(3);
        if (Reader.FieldCount > 4)
          this._dwm_idModules = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
        if (Reader.FieldCount > 5)
          this._dwm_idTabla = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._dwm_dealer = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._dwm_cuenta_desde = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._dwm_cuenta_hasta = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._dwm_data = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
      }
      Reader.Close();
    }
  }
}
