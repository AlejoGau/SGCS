// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalm_telefonos_jurisdiccionales
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
  public class Dalm_telefonos_jurisdiccionales : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _tel_clista;
    private string _tel_cnombre;
    private string _tel_cobservacion;
    private string _tel_ctelefono;
    private Decimal _tel_ndiscado;
    private string _tel_cpredigito;
    private string _tel_cpostdigito;
    private string _tel_cprovincia;

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

    public string tel_clista
    {
      get
      {
        return this._tel_clista;
      }
      set
      {
        this._tel_clista = value;
      }
    }

    public string tel_cnombre
    {
      get
      {
        return this._tel_cnombre;
      }
      set
      {
        this._tel_cnombre = value;
      }
    }

    public string tel_cobservacion
    {
      get
      {
        return this._tel_cobservacion;
      }
      set
      {
        this._tel_cobservacion = value;
      }
    }

    public string tel_ctelefono
    {
      get
      {
        return this._tel_ctelefono;
      }
      set
      {
        this._tel_ctelefono = value;
      }
    }

    public Decimal tel_ndiscado
    {
      get
      {
        return this._tel_ndiscado;
      }
      set
      {
        this._tel_ndiscado = value;
      }
    }

    public string tel_cpredigito
    {
      get
      {
        return this._tel_cpredigito;
      }
      set
      {
        this._tel_cpredigito = value;
      }
    }

    public string tel_cpostdigito
    {
      get
      {
        return this._tel_cpostdigito;
      }
      set
      {
        this._tel_cpostdigito = value;
      }
    }

    public string tel_cprovincia
    {
      get
      {
        return this._tel_cprovincia;
      }
      set
      {
        this._tel_cprovincia = value;
      }
    }

    public Dalm_telefonos_jurisdiccionales(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalm_telefonos_jurisdiccionales(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalm_telefonos_jurisdiccionales(SqlHelper SqlConfig, int UserId, Simplem_telefonos_jurisdiccionales Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tel_clista = Simple.tel_clista;
      this._tel_cnombre = Simple.tel_cnombre;
      this._tel_cobservacion = Simple.tel_cobservacion;
      this._tel_ctelefono = Simple.tel_ctelefono;
      this._tel_ndiscado = Simple.tel_ndiscado;
      this._tel_cpredigito = Simple.tel_cpredigito;
      this._tel_cpostdigito = Simple.tel_cpostdigito;
      this._tel_cprovincia = Simple.tel_cprovincia;
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
            using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_clista", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cobservacion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_ctelefono", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_ndiscado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cpredigito", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cpostdigito", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cprovincia", SqlDbType.NChar));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tel_clista"].Value = this._tel_clista == null ? (object) DBNull.Value : (object) this._tel_clista;
              sqlCommand.Parameters["@tel_cnombre"].Value = this._tel_cnombre == null ? (object) DBNull.Value : (object) this._tel_cnombre;
              sqlCommand.Parameters["@tel_cobservacion"].Value = this._tel_cobservacion == null ? (object) DBNull.Value : (object) this._tel_cobservacion;
              sqlCommand.Parameters["@tel_ctelefono"].Value = this._tel_ctelefono == null ? (object) DBNull.Value : (object) this._tel_ctelefono;
              sqlCommand.Parameters["@tel_ndiscado"].Value = (object) this._tel_ndiscado;
              sqlCommand.Parameters["@tel_cpredigito"].Value = this._tel_cpredigito == null ? (object) DBNull.Value : (object) this._tel_cpredigito;
              sqlCommand.Parameters["@tel_cpostdigito"].Value = this._tel_cpostdigito == null ? (object) DBNull.Value : (object) this._tel_cpostdigito;
              sqlCommand.Parameters["@tel_cprovincia"].Value = this._tel_cprovincia == null ? (object) DBNull.Value : (object) this._tel_cprovincia;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_clista", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cobservacion", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_ctelefono", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_ndiscado", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cpredigito", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cpostdigito", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tel_cprovincia", SqlDbType.NChar));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tel_clista"].Value = this._tel_clista == null ? (object) DBNull.Value : (object) this._tel_clista;
              sqlCommand.Parameters["@tel_cnombre"].Value = this._tel_cnombre == null ? (object) DBNull.Value : (object) this._tel_cnombre;
              sqlCommand.Parameters["@tel_cobservacion"].Value = this._tel_cobservacion == null ? (object) DBNull.Value : (object) this._tel_cobservacion;
              sqlCommand.Parameters["@tel_ctelefono"].Value = this._tel_ctelefono == null ? (object) DBNull.Value : (object) this._tel_ctelefono;
              sqlCommand.Parameters["@tel_ndiscado"].Value = (object) this._tel_ndiscado;
              sqlCommand.Parameters["@tel_cpredigito"].Value = this._tel_cpredigito == null ? (object) DBNull.Value : (object) this._tel_cpredigito;
              sqlCommand.Parameters["@tel_cpostdigito"].Value = this._tel_cpostdigito == null ? (object) DBNull.Value : (object) this._tel_cpostdigito;
              sqlCommand.Parameters["@tel_cprovincia"].Value = this._tel_cprovincia == null ? (object) DBNull.Value : (object) this._tel_cprovincia;
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
        throw new RuntimeException("The m_telefonos_jurisdiccionales is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesSel", connection))
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
      Simplem_telefonos_jurisdiccionales jurisdiccionales = new Simplem_telefonos_jurisdiccionales();
      jurisdiccionales.Id = this.Id;
      jurisdiccionales.Name = this.Name;
      jurisdiccionales.tel_clista = this._tel_clista;
      jurisdiccionales.tel_cnombre = this._tel_cnombre;
      jurisdiccionales.tel_cobservacion = this._tel_cobservacion;
      jurisdiccionales.tel_ctelefono = this._tel_ctelefono;
      jurisdiccionales.tel_ndiscado = this._tel_ndiscado;
      jurisdiccionales.tel_cpredigito = this._tel_cpredigito;
      jurisdiccionales.tel_cpostdigito = this._tel_cpostdigito;
      jurisdiccionales.tel_cprovincia = this._tel_cprovincia;
      if (this.CallerObject != null)
        jurisdiccionales.CallerObject = this.CallerObject;
      return (SimpleBaseObject) jurisdiccionales;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplem_telefonos_jurisdiccionales jurisdiccionales = (Simplem_telefonos_jurisdiccionales) BaseSimple;
      this.Id = jurisdiccionales.Id;
      this.Name = jurisdiccionales.Name;
      this._tel_clista = jurisdiccionales.tel_clista;
      this._tel_cnombre = jurisdiccionales.tel_cnombre;
      this._tel_cobservacion = jurisdiccionales.tel_cobservacion;
      this._tel_ctelefono = jurisdiccionales.tel_ctelefono;
      this._tel_ndiscado = jurisdiccionales.tel_ndiscado;
      this._tel_cpredigito = jurisdiccionales.tel_cpredigito;
      this._tel_cpostdigito = jurisdiccionales.tel_cpostdigito;
      this._tel_cprovincia = jurisdiccionales.tel_cprovincia;
      if (jurisdiccionales.CallerObject != null)
        this.CallerObject = jurisdiccionales.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callerm_telefonos_jurisdiccionales jurisdiccionales = new Callerm_telefonos_jurisdiccionales();
      jurisdiccionales.Id = this.Id;
      jurisdiccionales.Name = this.Name;
      jurisdiccionales.tel_clista = this._tel_clista;
      jurisdiccionales.tel_cnombre = this._tel_cnombre;
      jurisdiccionales.tel_cobservacion = this._tel_cobservacion;
      jurisdiccionales.tel_ctelefono = this._tel_ctelefono;
      jurisdiccionales.tel_ndiscado = this._tel_ndiscado;
      jurisdiccionales.tel_cpredigito = this._tel_cpredigito;
      jurisdiccionales.tel_cpostdigito = this._tel_cpostdigito;
      jurisdiccionales.tel_cprovincia = this._tel_cprovincia;
      return (CallerObject) jurisdiccionales;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_clista", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cobservacion", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_ndiscado", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tel_cpredigito", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cpostdigito", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tel_cprovincia", typeof (string)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tel_clista"] = (object) this._tel_clista;
      row["tel_cnombre"] = (object) this._tel_cnombre;
      row["tel_cobservacion"] = (object) this._tel_cobservacion;
      row["tel_ctelefono"] = (object) this._tel_ctelefono;
      row["tel_ndiscado"] = (object) this._tel_ndiscado;
      row["tel_cpredigito"] = (object) this._tel_cpredigito;
      row["tel_cpostdigito"] = (object) this._tel_cpostdigito;
      row["tel_cprovincia"] = (object) this._tel_cprovincia;
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
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesByChildObject", connection))
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
              Simplem_telefonos_jurisdiccionales jurisdiccionales = new Simplem_telefonos_jurisdiccionales();
              jurisdiccionales.Id = sqlDataReader.GetInt32(0);
              jurisdiccionales.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                jurisdiccionales.tel_clista = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                jurisdiccionales.tel_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                jurisdiccionales.tel_cobservacion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                jurisdiccionales.tel_ctelefono = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                jurisdiccionales.tel_ndiscado = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                jurisdiccionales.tel_cpredigito = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                jurisdiccionales.tel_cpostdigito = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                jurisdiccionales.tel_cprovincia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              jurisdiccionales.CallerObject = Object.GetCallerObject();
              jurisdiccionales.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) jurisdiccionales);
              objectCollection.Add((SimpleBaseObject) jurisdiccionales);
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
        Simplem_telefonos_jurisdiccionales jurisdiccionales = new Simplem_telefonos_jurisdiccionales();
        jurisdiccionales.Id = (int) row["Id"];
        jurisdiccionales.Name = (string) row["Name"];
        jurisdiccionales.tel_clista = row["tel_clista"] == DBNull.Value ? "" : (string) row["tel_clista"];
        jurisdiccionales.tel_cnombre = row["tel_cnombre"] == DBNull.Value ? "" : (string) row["tel_cnombre"];
        jurisdiccionales.tel_cobservacion = row["tel_cobservacion"] == DBNull.Value ? "" : (string) row["tel_cobservacion"];
        jurisdiccionales.tel_ctelefono = row["tel_ctelefono"] == DBNull.Value ? "" : (string) row["tel_ctelefono"];
        jurisdiccionales.tel_ndiscado = row["tel_ndiscado"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tel_ndiscado"];
        jurisdiccionales.tel_cpredigito = row["tel_cpredigito"] == DBNull.Value ? "" : (string) row["tel_cpredigito"];
        jurisdiccionales.tel_cpostdigito = row["tel_cpostdigito"] == DBNull.Value ? "" : (string) row["tel_cpostdigito"];
        jurisdiccionales.tel_cprovincia = row["tel_cprovincia"] == DBNull.Value ? "" : (string) row["tel_cprovincia"];
        jurisdiccionales.CallerObject = Object.GetCallerObject();
        jurisdiccionales.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) jurisdiccionales);
        if (Recursive)
          jurisdiccionales.Dependencies = this.GetChildsByObject((SimpleBaseObject) jurisdiccionales, Recursive);
        objectCollection.Add((SimpleBaseObject) jurisdiccionales);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesByParentObject", connection))
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
              Simplem_telefonos_jurisdiccionales jurisdiccionales = new Simplem_telefonos_jurisdiccionales();
              jurisdiccionales.Id = sqlDataReader.GetInt32(0);
              jurisdiccionales.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                jurisdiccionales.tel_clista = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                jurisdiccionales.tel_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                jurisdiccionales.tel_cobservacion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                jurisdiccionales.tel_ctelefono = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                jurisdiccionales.tel_ndiscado = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                jurisdiccionales.tel_cpredigito = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                jurisdiccionales.tel_cpostdigito = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                jurisdiccionales.tel_cprovincia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              jurisdiccionales.CallerObject = Object.GetCallerObject();
              jurisdiccionales.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) jurisdiccionales);
              objectCollection.Add((SimpleBaseObject) jurisdiccionales);
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
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplem_telefonos_jurisdiccionales Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("m_telefonos_jurisdiccionalesBySimplem_telefonos_jurisdiccionales", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tel_clista", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tel_cnombre", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tel_cobservacion", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tel_ctelefono", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tel_ndiscado", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tel_cpredigito", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tel_cpostdigito", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tel_cprovincia", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@tel_clista"].Value = this._tel_clista == null ? (object) DBNull.Value : (object) this._tel_clista;
            selectCommand.Parameters["@tel_cnombre"].Value = this._tel_cnombre == null ? (object) DBNull.Value : (object) this._tel_cnombre;
            selectCommand.Parameters["@tel_cobservacion"].Value = this._tel_cobservacion == null ? (object) DBNull.Value : (object) this._tel_cobservacion;
            selectCommand.Parameters["@tel_ctelefono"].Value = this._tel_ctelefono == null ? (object) DBNull.Value : (object) this._tel_ctelefono;
            selectCommand.Parameters["@tel_ndiscado"].Value = (object) this._tel_ndiscado;
            selectCommand.Parameters["@tel_cpredigito"].Value = this._tel_cpredigito == null ? (object) DBNull.Value : (object) this._tel_cpredigito;
            selectCommand.Parameters["@tel_cpostdigito"].Value = this._tel_cpostdigito == null ? (object) DBNull.Value : (object) this._tel_cpostdigito;
            selectCommand.Parameters["@tel_cprovincia"].Value = this._tel_cprovincia == null ? (object) DBNull.Value : (object) this._tel_cprovincia;
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

    public IEnumerable<Simplem_telefonos_jurisdiccionales> GetByChild(string ObjectType, int ObjectId)
    {
            // ISSUE: reference to a compiler-generated method
            base.Load();
            using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_telefonos_jurisdiccionales Simple = new Simplem_telefonos_jurisdiccionales();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tel_clista = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tel_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tel_cobservacion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tel_ctelefono = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tel_ndiscado = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tel_cpredigito = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tel_cpostdigito = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tel_cprovincia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplem_telefonos_jurisdiccionales> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("m_telefonos_jurisdiccionalesByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplem_telefonos_jurisdiccionales Simple = new Simplem_telefonos_jurisdiccionales();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tel_clista = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tel_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tel_cobservacion = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tel_ctelefono = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tel_ndiscado = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tel_cpredigito = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tel_cpostdigito = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tel_cprovincia = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3099, "m_telefonos_jurisdiccionales");
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
          this._tel_clista = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._tel_cnombre = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._tel_cobservacion = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._tel_ctelefono = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._tel_ndiscado = Reader.IsDBNull(6) ? new Decimal(0) : Reader.GetDecimal(6);
        if (Reader.FieldCount > 7)
          this._tel_cpredigito = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._tel_cpostdigito = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._tel_cprovincia = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
      }
      Reader.Close();
    }
  }
}
