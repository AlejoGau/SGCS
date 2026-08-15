// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalm_formatos
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
  public class Dalm_formatos : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _for_cdescripcion;
    private string _for_cformato;
    private string _for_cnombre;
    private string _for_calarma;
    private string _for_ccodigo;

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

    public string for_cdescripcion
    {
      get
      {
        return this._for_cdescripcion;
      }
      set
      {
        this._for_cdescripcion = value;
      }
    }

    public string for_cformato
    {
      get
      {
        return this._for_cformato;
      }
      set
      {
        this._for_cformato = value;
      }
    }

    public string for_cnombre
    {
      get
      {
        return this._for_cnombre;
      }
      set
      {
        this._for_cnombre = value;
      }
    }

    public string for_calarma
    {
      get
      {
        return this._for_calarma;
      }
      set
      {
        this._for_calarma = value;
      }
    }

    public string for_ccodigo
    {
      get
      {
        return this._for_ccodigo;
      }
      set
      {
        this._for_ccodigo = value;
      }
    }

    public Dalm_formatos(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalm_formatos(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalm_formatos(SqlHelper SqlConfig, int UserId, Simplem_formatos Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._for_cdescripcion = Simple.for_cdescripcion;
      this._for_cformato = Simple.for_cformato;
      this._for_cnombre = Simple.for_cnombre;
      this._for_calarma = Simple.for_calarma;
      this._for_ccodigo = Simple.for_ccodigo;
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
            using (SqlCommand sqlCommand = new SqlCommand("m_formatosIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_cformato", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_calarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@for_cdescripcion"].Value = this._for_cdescripcion == null ? (object) DBNull.Value : (object) this._for_cdescripcion;
              sqlCommand.Parameters["@for_cformato"].Value = this._for_cformato == null ? (object) DBNull.Value : (object) this._for_cformato;
              sqlCommand.Parameters["@for_cnombre"].Value = this._for_cnombre == null ? (object) DBNull.Value : (object) this._for_cnombre;
              sqlCommand.Parameters["@for_calarma"].Value = this._for_calarma == null ? (object) DBNull.Value : (object) this._for_calarma;
              sqlCommand.Parameters["@for_ccodigo"].Value = this._for_ccodigo == null ? (object) DBNull.Value : (object) this._for_ccodigo;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("m_formatosUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_cformato", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_calarma", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@for_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@for_cdescripcion"].Value = this._for_cdescripcion == null ? (object) DBNull.Value : (object) this._for_cdescripcion;
              sqlCommand.Parameters["@for_cformato"].Value = this._for_cformato == null ? (object) DBNull.Value : (object) this._for_cformato;
              sqlCommand.Parameters["@for_cnombre"].Value = this._for_cnombre == null ? (object) DBNull.Value : (object) this._for_cnombre;
              sqlCommand.Parameters["@for_calarma"].Value = this._for_calarma == null ? (object) DBNull.Value : (object) this._for_calarma;
              sqlCommand.Parameters["@for_ccodigo"].Value = this._for_ccodigo == null ? (object) DBNull.Value : (object) this._for_ccodigo;
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
        throw new RuntimeException("The m_formatos is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("m_formatosDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_formatosSel", connection))
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
      Simplem_formatos simplemFormatos = new Simplem_formatos();
      simplemFormatos.Id = this.Id;
      simplemFormatos.Name = this.Name;
      simplemFormatos.for_cdescripcion = this._for_cdescripcion;
      simplemFormatos.for_cformato = this._for_cformato;
      simplemFormatos.for_cnombre = this._for_cnombre;
      simplemFormatos.for_calarma = this._for_calarma;
      simplemFormatos.for_ccodigo = this._for_ccodigo;
      if (this.CallerObject != null)
        simplemFormatos.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simplemFormatos;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplem_formatos simplemFormatos = (Simplem_formatos) BaseSimple;
      this.Id = simplemFormatos.Id;
      this.Name = simplemFormatos.Name;
      this._for_cdescripcion = simplemFormatos.for_cdescripcion;
      this._for_cformato = simplemFormatos.for_cformato;
      this._for_cnombre = simplemFormatos.for_cnombre;
      this._for_calarma = simplemFormatos.for_calarma;
      this._for_ccodigo = simplemFormatos.for_ccodigo;
      if (simplemFormatos.CallerObject != null)
        this.CallerObject = simplemFormatos.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_formatos callermFormatos = new Callerm_formatos();
      callermFormatos.Id = this.Id;
      callermFormatos.Name = this.Name;
      callermFormatos.for_cdescripcion = this._for_cdescripcion;
      callermFormatos.for_cformato = this._for_cformato;
      callermFormatos.for_cnombre = this._for_cnombre;
      callermFormatos.for_calarma = this._for_calarma;
      callermFormatos.for_ccodigo = this._for_ccodigo;
      return (CallerObject) callermFormatos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cformato", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_calarma", typeof (string)));
      dataTable.Columns.Add(new DataColumn("for_ccodigo", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["for_cdescripcion"] = (object) this._for_cdescripcion;
      row["for_cformato"] = (object) this._for_cformato;
      row["for_cnombre"] = (object) this._for_cnombre;
      row["for_calarma"] = (object) this._for_calarma;
      row["for_ccodigo"] = (object) this._for_ccodigo;
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
        using (SqlCommand selectCommand = new SqlCommand("m_formatosByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_formatosByChildObject", connection))
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
              Simplem_formatos simplemFormatos = new Simplem_formatos();
              simplemFormatos.Id = sqlDataReader.GetInt32(0);
              simplemFormatos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemFormatos.for_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplemFormatos.for_cformato = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplemFormatos.for_cnombre = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplemFormatos.for_calarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simplemFormatos.for_ccodigo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              simplemFormatos.CallerObject = Object.GetCallerObject();
              simplemFormatos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemFormatos);
              objectCollection.Add((SimpleBaseObject) simplemFormatos);
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
        Simplem_formatos simplemFormatos = new Simplem_formatos();
        simplemFormatos.Id = (int) row["Id"];
        simplemFormatos.Name = (string) row["Name"];
        simplemFormatos.for_cdescripcion = row["for_cdescripcion"] == DBNull.Value ? "" : (string) row["for_cdescripcion"];
        simplemFormatos.for_cformato = row["for_cformato"] == DBNull.Value ? "" : (string) row["for_cformato"];
        simplemFormatos.for_cnombre = row["for_cnombre"] == DBNull.Value ? "" : (string) row["for_cnombre"];
        simplemFormatos.for_calarma = row["for_calarma"] == DBNull.Value ? "" : (string) row["for_calarma"];
        simplemFormatos.for_ccodigo = row["for_ccodigo"] == DBNull.Value ? "" : (string) row["for_ccodigo"];
        simplemFormatos.CallerObject = Object.GetCallerObject();
        simplemFormatos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemFormatos);
        if (Recursive)
          simplemFormatos.Dependencies = this.GetChildsByObject((SimpleBaseObject) simplemFormatos, Recursive);
        objectCollection.Add((SimpleBaseObject) simplemFormatos);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_formatosByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_formatosByParentObject", connection))
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
              Simplem_formatos simplemFormatos = new Simplem_formatos();
              simplemFormatos.Id = sqlDataReader.GetInt32(0);
              simplemFormatos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simplemFormatos.for_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simplemFormatos.for_cformato = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simplemFormatos.for_cnombre = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simplemFormatos.for_calarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simplemFormatos.for_ccodigo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              simplemFormatos.CallerObject = Object.GetCallerObject();
              simplemFormatos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simplemFormatos);
              objectCollection.Add((SimpleBaseObject) simplemFormatos);
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
        using (SqlCommand selectCommand = new SqlCommand("m_formatosByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_formatosByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_formatosByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_formatosByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_formatosByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplem_formatos Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_formatosBySimplem_formatos", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@for_cdescripcion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@for_cformato", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@for_cnombre", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@for_calarma", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@for_ccodigo", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@for_cdescripcion"].Value = this._for_cdescripcion == null ? (object) DBNull.Value : (object) this._for_cdescripcion;
            selectCommand.Parameters["@for_cformato"].Value = this._for_cformato == null ? (object) DBNull.Value : (object) this._for_cformato;
            selectCommand.Parameters["@for_cnombre"].Value = this._for_cnombre == null ? (object) DBNull.Value : (object) this._for_cnombre;
            selectCommand.Parameters["@for_calarma"].Value = this._for_calarma == null ? (object) DBNull.Value : (object) this._for_calarma;
            selectCommand.Parameters["@for_ccodigo"].Value = this._for_ccodigo == null ? (object) DBNull.Value : (object) this._for_ccodigo;
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

    public IEnumerable<Simplem_formatos> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_formatosByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_formatos Simple = new Simplem_formatos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.for_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.for_cformato = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.for_cnombre = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.for_calarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.for_ccodigo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplem_formatos> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_formatosByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_formatos Simple = new Simplem_formatos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.for_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.for_cformato = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.for_cnombre = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.for_calarma = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.for_ccodigo = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3096, "m_formatos");
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
          this._for_cdescripcion = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._for_cformato = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._for_cnombre = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._for_calarma = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._for_ccodigo = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
      }
      Reader.Close();
    }
  }
}
