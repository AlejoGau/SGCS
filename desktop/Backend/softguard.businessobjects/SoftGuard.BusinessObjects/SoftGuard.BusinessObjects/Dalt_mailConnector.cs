// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_mailConnector
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
  public class Dalt_mailConnector : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _mcn_name;
    private string _mcn_username;
    private string _mcn_password;
    private string _mcn_popserver;
    private int _mcn_popport;
    private int _mcn_popssl;
    private int _mcn_ipconid;

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

    public string mcn_name
    {
      get
      {
        return this._mcn_name;
      }
      set
      {
        this._mcn_name = value;
      }
    }

    public string mcn_username
    {
      get
      {
        return this._mcn_username;
      }
      set
      {
        this._mcn_username = value;
      }
    }

    public string mcn_password
    {
      get
      {
        return this._mcn_password;
      }
      set
      {
        this._mcn_password = value;
      }
    }

    public string mcn_popserver
    {
      get
      {
        return this._mcn_popserver;
      }
      set
      {
        this._mcn_popserver = value;
      }
    }

    public int mcn_popport
    {
      get
      {
        return this._mcn_popport;
      }
      set
      {
        this._mcn_popport = value;
      }
    }

    public int mcn_popssl
    {
      get
      {
        return this._mcn_popssl;
      }
      set
      {
        this._mcn_popssl = value;
      }
    }

    public int mcn_ipconid
    {
      get
      {
        return this._mcn_ipconid;
      }
      set
      {
        this._mcn_ipconid = value;
      }
    }

    public Dalt_mailConnector(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_mailConnector(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_mailConnector(SqlHelper SqlConfig, int UserId, Simplet_mailConnector Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._mcn_name = Simple.mcn_name;
      this._mcn_username = Simple.mcn_username;
      this._mcn_password = Simple.mcn_password;
      this._mcn_popserver = Simple.mcn_popserver;
      this._mcn_popport = Simple.mcn_popport;
      this._mcn_popssl = Simple.mcn_popssl;
      this._mcn_ipconid = Simple.mcn_ipconid;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_username", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_password", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_popserver", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_popport", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_popssl", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_ipconid", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@mcn_name"].Value = this._mcn_name == null ? (object) DBNull.Value : (object) this._mcn_name;
              sqlCommand.Parameters["@mcn_username"].Value = this._mcn_username == null ? (object) DBNull.Value : (object) this._mcn_username;
              sqlCommand.Parameters["@mcn_password"].Value = this._mcn_password == null ? (object) DBNull.Value : (object) this._mcn_password;
              sqlCommand.Parameters["@mcn_popserver"].Value = this._mcn_popserver == null ? (object) DBNull.Value : (object) this._mcn_popserver;
              sqlCommand.Parameters["@mcn_popport"].Value = (object) this._mcn_popport;
              sqlCommand.Parameters["@mcn_popssl"].Value = (object) this._mcn_popssl;
              sqlCommand.Parameters["@mcn_ipconid"].Value = (object) this._mcn_ipconid;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_username", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_password", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_popserver", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_popport", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_popssl", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@mcn_ipconid", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@mcn_name"].Value = this._mcn_name == null ? (object) DBNull.Value : (object) this._mcn_name;
              sqlCommand.Parameters["@mcn_username"].Value = this._mcn_username == null ? (object) DBNull.Value : (object) this._mcn_username;
              sqlCommand.Parameters["@mcn_password"].Value = this._mcn_password == null ? (object) DBNull.Value : (object) this._mcn_password;
              sqlCommand.Parameters["@mcn_popserver"].Value = this._mcn_popserver == null ? (object) DBNull.Value : (object) this._mcn_popserver;
              sqlCommand.Parameters["@mcn_popport"].Value = (object) this._mcn_popport;
              sqlCommand.Parameters["@mcn_popssl"].Value = (object) this._mcn_popssl;
              sqlCommand.Parameters["@mcn_ipconid"].Value = (object) this._mcn_ipconid;
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
        throw new RuntimeException("The t_mailConnector is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorSel", connection))
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
      Simplet_mailConnector simpletMailConnector = new Simplet_mailConnector();
      simpletMailConnector.Id = this.Id;
      simpletMailConnector.Name = this.Name;
      simpletMailConnector.mcn_name = this._mcn_name;
      simpletMailConnector.mcn_username = this._mcn_username;
      simpletMailConnector.mcn_password = this._mcn_password;
      simpletMailConnector.mcn_popserver = this._mcn_popserver;
      simpletMailConnector.mcn_popport = this._mcn_popport;
      simpletMailConnector.mcn_popssl = this._mcn_popssl;
      simpletMailConnector.mcn_ipconid = this._mcn_ipconid;
      if (this.CallerObject != null)
        simpletMailConnector.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletMailConnector;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_mailConnector simpletMailConnector = (Simplet_mailConnector) BaseSimple;
      this.Id = simpletMailConnector.Id;
      this.Name = simpletMailConnector.Name;
      this._mcn_name = simpletMailConnector.mcn_name;
      this._mcn_username = simpletMailConnector.mcn_username;
      this._mcn_password = simpletMailConnector.mcn_password;
      this._mcn_popserver = simpletMailConnector.mcn_popserver;
      this._mcn_popport = simpletMailConnector.mcn_popport;
      this._mcn_popssl = simpletMailConnector.mcn_popssl;
      this._mcn_ipconid = simpletMailConnector.mcn_ipconid;
      if (simpletMailConnector.CallerObject != null)
        this.CallerObject = simpletMailConnector.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_mailConnector callertMailConnector = new Callert_mailConnector();
      callertMailConnector.Id = this.Id;
      callertMailConnector.Name = this.Name;
      callertMailConnector.mcn_name = this._mcn_name;
      callertMailConnector.mcn_username = this._mcn_username;
      callertMailConnector.mcn_password = this._mcn_password;
      callertMailConnector.mcn_popserver = this._mcn_popserver;
      callertMailConnector.mcn_popport = this._mcn_popport;
      callertMailConnector.mcn_popssl = this._mcn_popssl;
      callertMailConnector.mcn_ipconid = this._mcn_ipconid;
      return (CallerObject) callertMailConnector;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_username", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_password", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_popserver", typeof (string)));
      dataTable.Columns.Add(new DataColumn("mcn_popport", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mcn_popssl", typeof (int)));
      dataTable.Columns.Add(new DataColumn("mcn_ipconid", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["mcn_name"] = (object) this._mcn_name;
      row["mcn_username"] = (object) this._mcn_username;
      row["mcn_password"] = (object) this._mcn_password;
      row["mcn_popserver"] = (object) this._mcn_popserver;
      row["mcn_popport"] = (object) this._mcn_popport;
      row["mcn_popssl"] = (object) this._mcn_popssl;
      row["mcn_ipconid"] = (object) this._mcn_ipconid;
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
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorByChildObject", connection))
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
              Simplet_mailConnector simpletMailConnector = new Simplet_mailConnector();
              simpletMailConnector.Id = sqlDataReader.GetInt32(0);
              simpletMailConnector.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletMailConnector.mcn_name = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletMailConnector.mcn_username = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletMailConnector.mcn_password = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletMailConnector.mcn_popserver = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletMailConnector.mcn_popport = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simpletMailConnector.mcn_popssl = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simpletMailConnector.mcn_ipconid = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              simpletMailConnector.CallerObject = Object.GetCallerObject();
              simpletMailConnector.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMailConnector);
              objectCollection.Add((SimpleBaseObject) simpletMailConnector);
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
        Simplet_mailConnector simpletMailConnector = new Simplet_mailConnector();
        simpletMailConnector.Id = (int) row["Id"];
        simpletMailConnector.Name = (string) row["Name"];
        simpletMailConnector.mcn_name = row["mcn_name"] == DBNull.Value ? "" : (string) row["mcn_name"];
        simpletMailConnector.mcn_username = row["mcn_username"] == DBNull.Value ? "" : (string) row["mcn_username"];
        simpletMailConnector.mcn_password = row["mcn_password"] == DBNull.Value ? "" : (string) row["mcn_password"];
        simpletMailConnector.mcn_popserver = row["mcn_popserver"] == DBNull.Value ? "" : (string) row["mcn_popserver"];
        simpletMailConnector.mcn_popport = row["mcn_popport"] == DBNull.Value ? 0 : (int) row["mcn_popport"];
        simpletMailConnector.mcn_popssl = row["mcn_popssl"] == DBNull.Value ? 0 : (int) row["mcn_popssl"];
        simpletMailConnector.mcn_ipconid = row["mcn_ipconid"] == DBNull.Value ? 0 : (int) row["mcn_ipconid"];
        simpletMailConnector.CallerObject = Object.GetCallerObject();
        simpletMailConnector.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMailConnector);
        if (Recursive)
          simpletMailConnector.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletMailConnector, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletMailConnector);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorByParentObject", connection))
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
              Simplet_mailConnector simpletMailConnector = new Simplet_mailConnector();
              simpletMailConnector.Id = sqlDataReader.GetInt32(0);
              simpletMailConnector.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletMailConnector.mcn_name = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletMailConnector.mcn_username = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletMailConnector.mcn_password = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletMailConnector.mcn_popserver = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletMailConnector.mcn_popport = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                simpletMailConnector.mcn_popssl = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                simpletMailConnector.mcn_ipconid = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              simpletMailConnector.CallerObject = Object.GetCallerObject();
              simpletMailConnector.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMailConnector);
              objectCollection.Add((SimpleBaseObject) simpletMailConnector);
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
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_mailConnector Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_mailConnectorBySimplet_mailConnector", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@mcn_name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@mcn_username", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@mcn_password", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@mcn_popserver", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@mcn_popport", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@mcn_popssl", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@mcn_ipconid", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@mcn_name"].Value = this._mcn_name == null ? (object) DBNull.Value : (object) this._mcn_name;
            selectCommand.Parameters["@mcn_username"].Value = this._mcn_username == null ? (object) DBNull.Value : (object) this._mcn_username;
            selectCommand.Parameters["@mcn_password"].Value = this._mcn_password == null ? (object) DBNull.Value : (object) this._mcn_password;
            selectCommand.Parameters["@mcn_popserver"].Value = this._mcn_popserver == null ? (object) DBNull.Value : (object) this._mcn_popserver;
            selectCommand.Parameters["@mcn_popport"].Value = (object) this._mcn_popport;
            selectCommand.Parameters["@mcn_popssl"].Value = (object) this._mcn_popssl;
            selectCommand.Parameters["@mcn_ipconid"].Value = (object) this._mcn_ipconid;
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

    public IEnumerable<Simplet_mailConnector> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_mailConnector Simple = new Simplet_mailConnector();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.mcn_name = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.mcn_username = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.mcn_password = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.mcn_popserver = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.mcn_popport = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.mcn_popssl = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.mcn_ipconid = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_mailConnector> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_mailConnectorByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_mailConnector Simple = new Simplet_mailConnector();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.mcn_name = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.mcn_username = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.mcn_password = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.mcn_popserver = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.mcn_popport = sqlDataReader.IsDBNull(6) ? 0 : sqlDataReader.GetInt32(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.mcn_popssl = sqlDataReader.IsDBNull(7) ? 0 : sqlDataReader.GetInt32(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.mcn_ipconid = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3137, "t_mailConnector");
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
          this._mcn_name = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._mcn_username = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._mcn_password = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._mcn_popserver = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._mcn_popport = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
        if (Reader.FieldCount > 7)
          this._mcn_popssl = Reader.IsDBNull(7) ? 0 : Reader.GetInt32(7);
        if (Reader.FieldCount > 8)
          this._mcn_ipconid = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
      }
      Reader.Close();
    }
  }
}
