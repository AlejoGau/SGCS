// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_novedades_fc
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
  public class Dalt_novedades_fc : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _nov_cdescripcion;
    private Decimal _nov_mimporte;
    private string _nov_cimpuesto1;
    private string _nov_cimpuesto2;
    private string _nov_cimpuesto3;

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

    public string nov_cdescripcion
    {
      get
      {
        return this._nov_cdescripcion;
      }
      set
      {
        this._nov_cdescripcion = value;
      }
    }

    public Decimal nov_mimporte
    {
      get
      {
        return this._nov_mimporte;
      }
      set
      {
        this._nov_mimporte = value;
      }
    }

    public string nov_cimpuesto1
    {
      get
      {
        return this._nov_cimpuesto1;
      }
      set
      {
        this._nov_cimpuesto1 = value;
      }
    }

    public string nov_cimpuesto2
    {
      get
      {
        return this._nov_cimpuesto2;
      }
      set
      {
        this._nov_cimpuesto2 = value;
      }
    }

    public string nov_cimpuesto3
    {
      get
      {
        return this._nov_cimpuesto3;
      }
      set
      {
        this._nov_cimpuesto3 = value;
      }
    }

    public Dalt_novedades_fc(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_novedades_fc(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_novedades_fc(SqlHelper SqlConfig, int UserId, Simplet_novedades_fc Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._nov_cdescripcion = Simple.nov_cdescripcion;
      this._nov_mimporte = Simple.nov_mimporte;
      this._nov_cimpuesto1 = Simple.nov_cimpuesto1;
      this._nov_cimpuesto2 = Simple.nov_cimpuesto2;
      this._nov_cimpuesto3 = Simple.nov_cimpuesto3;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_mimporte", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto1", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto2", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto3", SqlDbType.NChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@nov_cdescripcion"].Value = this._nov_cdescripcion == null ? (object) DBNull.Value : (object) this._nov_cdescripcion;
              sqlCommand.Parameters["@nov_mimporte"].Value = (object) this._nov_mimporte;
              sqlCommand.Parameters["@nov_cimpuesto1"].Value = this._nov_cimpuesto1 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto1;
              sqlCommand.Parameters["@nov_cimpuesto2"].Value = this._nov_cimpuesto2 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto2;
              sqlCommand.Parameters["@nov_cimpuesto3"].Value = this._nov_cimpuesto3 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto3;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cdescripcion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_mimporte", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto1", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto2", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto3", SqlDbType.NChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@nov_cdescripcion"].Value = this._nov_cdescripcion == null ? (object) DBNull.Value : (object) this._nov_cdescripcion;
              sqlCommand.Parameters["@nov_mimporte"].Value = (object) this._nov_mimporte;
              sqlCommand.Parameters["@nov_cimpuesto1"].Value = this._nov_cimpuesto1 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto1;
              sqlCommand.Parameters["@nov_cimpuesto2"].Value = this._nov_cimpuesto2 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto2;
              sqlCommand.Parameters["@nov_cimpuesto3"].Value = this._nov_cimpuesto3 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto3;
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
        throw new RuntimeException("The t_novedades_fc is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcSel", connection))
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
      Simplet_novedades_fc simpletNovedadesFc = new Simplet_novedades_fc();
      simpletNovedadesFc.Id = this.Id;
      simpletNovedadesFc.Name = this.Name;
      simpletNovedadesFc.nov_cdescripcion = this._nov_cdescripcion;
      simpletNovedadesFc.nov_mimporte = this._nov_mimporte;
      simpletNovedadesFc.nov_cimpuesto1 = this._nov_cimpuesto1;
      simpletNovedadesFc.nov_cimpuesto2 = this._nov_cimpuesto2;
      simpletNovedadesFc.nov_cimpuesto3 = this._nov_cimpuesto3;
      if (this.CallerObject != null)
        simpletNovedadesFc.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletNovedadesFc;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_novedades_fc simpletNovedadesFc = (Simplet_novedades_fc) BaseSimple;
      this.Id = simpletNovedadesFc.Id;
      this.Name = simpletNovedadesFc.Name;
      this._nov_cdescripcion = simpletNovedadesFc.nov_cdescripcion;
      this._nov_mimporte = simpletNovedadesFc.nov_mimporte;
      this._nov_cimpuesto1 = simpletNovedadesFc.nov_cimpuesto1;
      this._nov_cimpuesto2 = simpletNovedadesFc.nov_cimpuesto2;
      this._nov_cimpuesto3 = simpletNovedadesFc.nov_cimpuesto3;
      if (simpletNovedadesFc.CallerObject != null)
        this.CallerObject = simpletNovedadesFc.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_novedades_fc callertNovedadesFc = new Callert_novedades_fc();
      callertNovedadesFc.Id = this.Id;
      callertNovedadesFc.Name = this.Name;
      callertNovedadesFc.nov_cdescripcion = this._nov_cdescripcion;
      callertNovedadesFc.nov_mimporte = this._nov_mimporte;
      callertNovedadesFc.nov_cimpuesto1 = this._nov_cimpuesto1;
      callertNovedadesFc.nov_cimpuesto2 = this._nov_cimpuesto2;
      callertNovedadesFc.nov_cimpuesto3 = this._nov_cimpuesto3;
      return (CallerObject) callertNovedadesFc;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cdescripcion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_mimporte", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto1", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto2", typeof (string)));
      dataTable.Columns.Add(new DataColumn("nov_cimpuesto3", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["nov_cdescripcion"] = (object) this._nov_cdescripcion;
      row["nov_mimporte"] = (object) this._nov_mimporte;
      row["nov_cimpuesto1"] = (object) this._nov_cimpuesto1;
      row["nov_cimpuesto2"] = (object) this._nov_cimpuesto2;
      row["nov_cimpuesto3"] = (object) this._nov_cimpuesto3;
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
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcByChildObject", connection))
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
              Simplet_novedades_fc simpletNovedadesFc = new Simplet_novedades_fc();
              simpletNovedadesFc.Id = sqlDataReader.GetInt32(0);
              simpletNovedadesFc.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletNovedadesFc.nov_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletNovedadesFc.nov_mimporte = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
              if (sqlDataReader.FieldCount > 4)
                simpletNovedadesFc.nov_cimpuesto1 = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletNovedadesFc.nov_cimpuesto2 = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletNovedadesFc.nov_cimpuesto3 = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              simpletNovedadesFc.CallerObject = Object.GetCallerObject();
              simpletNovedadesFc.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletNovedadesFc);
              objectCollection.Add((SimpleBaseObject) simpletNovedadesFc);
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
        Simplet_novedades_fc simpletNovedadesFc = new Simplet_novedades_fc();
        simpletNovedadesFc.Id = (int) row["Id"];
        simpletNovedadesFc.Name = (string) row["Name"];
        simpletNovedadesFc.nov_cdescripcion = row["nov_cdescripcion"] == DBNull.Value ? "" : (string) row["nov_cdescripcion"];
        simpletNovedadesFc.nov_mimporte = row["nov_mimporte"] == DBNull.Value ? new Decimal(0) : (Decimal) row["nov_mimporte"];
        simpletNovedadesFc.nov_cimpuesto1 = row["nov_cimpuesto1"] == DBNull.Value ? "" : (string) row["nov_cimpuesto1"];
        simpletNovedadesFc.nov_cimpuesto2 = row["nov_cimpuesto2"] == DBNull.Value ? "" : (string) row["nov_cimpuesto2"];
        simpletNovedadesFc.nov_cimpuesto3 = row["nov_cimpuesto3"] == DBNull.Value ? "" : (string) row["nov_cimpuesto3"];
        simpletNovedadesFc.CallerObject = Object.GetCallerObject();
        simpletNovedadesFc.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletNovedadesFc);
        if (Recursive)
          simpletNovedadesFc.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletNovedadesFc, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletNovedadesFc);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcByParentObject", connection))
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
              Simplet_novedades_fc simpletNovedadesFc = new Simplet_novedades_fc();
              simpletNovedadesFc.Id = sqlDataReader.GetInt32(0);
              simpletNovedadesFc.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletNovedadesFc.nov_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletNovedadesFc.nov_mimporte = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
              if (sqlDataReader.FieldCount > 4)
                simpletNovedadesFc.nov_cimpuesto1 = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletNovedadesFc.nov_cimpuesto2 = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletNovedadesFc.nov_cimpuesto3 = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              simpletNovedadesFc.CallerObject = Object.GetCallerObject();
              simpletNovedadesFc.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletNovedadesFc);
              objectCollection.Add((SimpleBaseObject) simpletNovedadesFc);
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
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_novedades_fc Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_novedades_fcBySimplet_novedades_fc", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@nov_cdescripcion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@nov_mimporte", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto1", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto2", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@nov_cimpuesto3", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@nov_cdescripcion"].Value = this._nov_cdescripcion == null ? (object) DBNull.Value : (object) this._nov_cdescripcion;
            selectCommand.Parameters["@nov_mimporte"].Value = (object) this._nov_mimporte;
            selectCommand.Parameters["@nov_cimpuesto1"].Value = this._nov_cimpuesto1 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto1;
            selectCommand.Parameters["@nov_cimpuesto2"].Value = this._nov_cimpuesto2 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto2;
            selectCommand.Parameters["@nov_cimpuesto3"].Value = this._nov_cimpuesto3 == null ? (object) DBNull.Value : (object) this._nov_cimpuesto3;
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

    public IEnumerable<Simplet_novedades_fc> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_novedades_fc Simple = new Simplet_novedades_fc();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.nov_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.nov_mimporte = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.nov_cimpuesto1 = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.nov_cimpuesto2 = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.nov_cimpuesto3 = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_novedades_fc> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_novedades_fcByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_novedades_fc Simple = new Simplet_novedades_fc();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.nov_cdescripcion = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.nov_mimporte = sqlDataReader.IsDBNull(3) ? new Decimal(0) : sqlDataReader.GetDecimal(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.nov_cimpuesto1 = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.nov_cimpuesto2 = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.nov_cimpuesto3 = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3153, "t_novedades_fc");
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
          this._nov_cdescripcion = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._nov_mimporte = Reader.IsDBNull(3) ? new Decimal(0) : Reader.GetDecimal(3);
        if (Reader.FieldCount > 4)
          this._nov_cimpuesto1 = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._nov_cimpuesto2 = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._nov_cimpuesto3 = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
      }
      Reader.Close();
    }
  }
}
