// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_tecnicos
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
  public class Dalt_tecnicos : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _tec_ccodigo;
    private string _tec_cnombre;
    private string _tec_ctelefono;
    private string _tec_cmail;
    private Decimal _tec_ningreso;
    private Decimal _tec_negreso;
    private string _tec_cobservaciones;
    private Decimal _tec_nestado;

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

    public string tec_ccodigo
    {
      get
      {
        return this._tec_ccodigo;
      }
      set
      {
        this._tec_ccodigo = value;
      }
    }

    public string tec_cnombre
    {
      get
      {
        return this._tec_cnombre;
      }
      set
      {
        this._tec_cnombre = value;
      }
    }

    public string tec_ctelefono
    {
      get
      {
        return this._tec_ctelefono;
      }
      set
      {
        this._tec_ctelefono = value;
      }
    }

    public string tec_cmail
    {
      get
      {
        return this._tec_cmail;
      }
      set
      {
        this._tec_cmail = value;
      }
    }

    public Decimal tec_ningreso
    {
      get
      {
        return this._tec_ningreso;
      }
      set
      {
        this._tec_ningreso = value;
      }
    }

    public Decimal tec_negreso
    {
      get
      {
        return this._tec_negreso;
      }
      set
      {
        this._tec_negreso = value;
      }
    }

    public string tec_cobservaciones
    {
      get
      {
        return this._tec_cobservaciones;
      }
      set
      {
        this._tec_cobservaciones = value;
      }
    }

    public Decimal tec_nestado
    {
      get
      {
        return this._tec_nestado;
      }
      set
      {
        this._tec_nestado = value;
      }
    }

    public Dalt_tecnicos(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_tecnicos(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_tecnicos(SqlHelper SqlConfig, int UserId, Simplet_tecnicos Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._tec_ccodigo = Simple.tec_ccodigo;
      this._tec_cnombre = Simple.tec_cnombre;
      this._tec_ctelefono = Simple.tec_ctelefono;
      this._tec_cmail = Simple.tec_cmail;
      this._tec_ningreso = Simple.tec_ningreso;
      this._tec_negreso = Simple.tec_negreso;
      this._tec_cobservaciones = Simple.tec_cobservaciones;
      this._tec_nestado = Simple.tec_nestado;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_cnombre", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_ctelefono", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_cmail", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_ningreso", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_negreso", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_cobservaciones", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tec_ccodigo"].Value = this._tec_ccodigo == null ? (object) DBNull.Value : (object) this._tec_ccodigo;
              sqlCommand.Parameters["@tec_cnombre"].Value = this._tec_cnombre == null ? (object) DBNull.Value : (object) this._tec_cnombre;
              sqlCommand.Parameters["@tec_ctelefono"].Value = this._tec_ctelefono == null ? (object) DBNull.Value : (object) this._tec_ctelefono;
              sqlCommand.Parameters["@tec_cmail"].Value = this._tec_cmail == null ? (object) DBNull.Value : (object) this._tec_cmail;
              sqlCommand.Parameters["@tec_ningreso"].Value = (object) this._tec_ningreso;
              sqlCommand.Parameters["@tec_negreso"].Value = (object) this._tec_negreso;
              sqlCommand.Parameters["@tec_cobservaciones"].Value = this._tec_cobservaciones == null ? (object) DBNull.Value : (object) this._tec_cobservaciones;
              sqlCommand.Parameters["@tec_nestado"].Value = (object) this._tec_nestado;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_cnombre", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_ctelefono", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_cmail", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_ningreso", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_negreso", SqlDbType.Decimal));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_cobservaciones", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@tec_nestado", SqlDbType.Decimal));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@tec_ccodigo"].Value = this._tec_ccodigo == null ? (object) DBNull.Value : (object) this._tec_ccodigo;
              sqlCommand.Parameters["@tec_cnombre"].Value = this._tec_cnombre == null ? (object) DBNull.Value : (object) this._tec_cnombre;
              sqlCommand.Parameters["@tec_ctelefono"].Value = this._tec_ctelefono == null ? (object) DBNull.Value : (object) this._tec_ctelefono;
              sqlCommand.Parameters["@tec_cmail"].Value = this._tec_cmail == null ? (object) DBNull.Value : (object) this._tec_cmail;
              sqlCommand.Parameters["@tec_ningreso"].Value = (object) this._tec_ningreso;
              sqlCommand.Parameters["@tec_negreso"].Value = (object) this._tec_negreso;
              sqlCommand.Parameters["@tec_cobservaciones"].Value = this._tec_cobservaciones == null ? (object) DBNull.Value : (object) this._tec_cobservaciones;
              sqlCommand.Parameters["@tec_nestado"].Value = (object) this._tec_nestado;
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
        throw new RuntimeException("The t_tecnicos is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosSel", connection))
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
      Simplet_tecnicos simpletTecnicos = new Simplet_tecnicos();
      simpletTecnicos.Id = this.Id;
      simpletTecnicos.Name = this.Name;
      simpletTecnicos.tec_ccodigo = this._tec_ccodigo;
      simpletTecnicos.tec_cnombre = this._tec_cnombre;
      simpletTecnicos.tec_ctelefono = this._tec_ctelefono;
      simpletTecnicos.tec_cmail = this._tec_cmail;
      simpletTecnicos.tec_ningreso = this._tec_ningreso;
      simpletTecnicos.tec_negreso = this._tec_negreso;
      simpletTecnicos.tec_cobservaciones = this._tec_cobservaciones;
      simpletTecnicos.tec_nestado = this._tec_nestado;
      if (this.CallerObject != null)
        simpletTecnicos.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletTecnicos;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_tecnicos simpletTecnicos = (Simplet_tecnicos) BaseSimple;
      this.Id = simpletTecnicos.Id;
      this.Name = simpletTecnicos.Name;
      this._tec_ccodigo = simpletTecnicos.tec_ccodigo;
      this._tec_cnombre = simpletTecnicos.tec_cnombre;
      this._tec_ctelefono = simpletTecnicos.tec_ctelefono;
      this._tec_cmail = simpletTecnicos.tec_cmail;
      this._tec_ningreso = simpletTecnicos.tec_ningreso;
      this._tec_negreso = simpletTecnicos.tec_negreso;
      this._tec_cobservaciones = simpletTecnicos.tec_cobservaciones;
      this._tec_nestado = simpletTecnicos.tec_nestado;
      if (simpletTecnicos.CallerObject != null)
        this.CallerObject = simpletTecnicos.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_tecnicos callertTecnicos = new Callert_tecnicos();
      callertTecnicos.Id = this.Id;
      callertTecnicos.Name = this.Name;
      callertTecnicos.tec_ccodigo = this._tec_ccodigo;
      callertTecnicos.tec_cnombre = this._tec_cnombre;
      callertTecnicos.tec_ctelefono = this._tec_ctelefono;
      callertTecnicos.tec_cmail = this._tec_cmail;
      callertTecnicos.tec_ningreso = this._tec_ningreso;
      callertTecnicos.tec_negreso = this._tec_negreso;
      callertTecnicos.tec_cobservaciones = this._tec_cobservaciones;
      callertTecnicos.tec_nestado = this._tec_nestado;
      return (CallerObject) callertTecnicos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_cmail", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_ningreso", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tec_negreso", typeof (Decimal)));
      dataTable.Columns.Add(new DataColumn("tec_cobservaciones", typeof (string)));
      dataTable.Columns.Add(new DataColumn("tec_nestado", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["tec_ccodigo"] = (object) this._tec_ccodigo;
      row["tec_cnombre"] = (object) this._tec_cnombre;
      row["tec_ctelefono"] = (object) this._tec_ctelefono;
      row["tec_cmail"] = (object) this._tec_cmail;
      row["tec_ningreso"] = (object) this._tec_ningreso;
      row["tec_negreso"] = (object) this._tec_negreso;
      row["tec_cobservaciones"] = (object) this._tec_cobservaciones;
      row["tec_nestado"] = (object) this._tec_nestado;
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
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosByChildObject", connection))
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
              Simplet_tecnicos simpletTecnicos = new Simplet_tecnicos();
              simpletTecnicos.Id = sqlDataReader.GetInt32(0);
              simpletTecnicos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletTecnicos.tec_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletTecnicos.tec_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletTecnicos.tec_ctelefono = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletTecnicos.tec_cmail = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletTecnicos.tec_ningreso = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simpletTecnicos.tec_negreso = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletTecnicos.tec_cobservaciones = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpletTecnicos.tec_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              simpletTecnicos.CallerObject = Object.GetCallerObject();
              simpletTecnicos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletTecnicos);
              objectCollection.Add((SimpleBaseObject) simpletTecnicos);
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
        Simplet_tecnicos simpletTecnicos = new Simplet_tecnicos();
        simpletTecnicos.Id = (int) row["Id"];
        simpletTecnicos.Name = (string) row["Name"];
        simpletTecnicos.tec_ccodigo = row["tec_ccodigo"] == DBNull.Value ? "" : (string) row["tec_ccodigo"];
        simpletTecnicos.tec_cnombre = row["tec_cnombre"] == DBNull.Value ? "" : (string) row["tec_cnombre"];
        simpletTecnicos.tec_ctelefono = row["tec_ctelefono"] == DBNull.Value ? "" : (string) row["tec_ctelefono"];
        simpletTecnicos.tec_cmail = row["tec_cmail"] == DBNull.Value ? "" : (string) row["tec_cmail"];
        simpletTecnicos.tec_ningreso = row["tec_ningreso"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tec_ningreso"];
        simpletTecnicos.tec_negreso = row["tec_negreso"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tec_negreso"];
        simpletTecnicos.tec_cobservaciones = row["tec_cobservaciones"] == DBNull.Value ? "" : (string) row["tec_cobservaciones"];
        simpletTecnicos.tec_nestado = row["tec_nestado"] == DBNull.Value ? new Decimal(0) : (Decimal) row["tec_nestado"];
        simpletTecnicos.CallerObject = Object.GetCallerObject();
        simpletTecnicos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletTecnicos);
        if (Recursive)
          simpletTecnicos.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletTecnicos, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletTecnicos);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosByParentObject", connection))
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
              Simplet_tecnicos simpletTecnicos = new Simplet_tecnicos();
              simpletTecnicos.Id = sqlDataReader.GetInt32(0);
              simpletTecnicos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletTecnicos.tec_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletTecnicos.tec_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletTecnicos.tec_ctelefono = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletTecnicos.tec_cmail = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletTecnicos.tec_ningreso = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                simpletTecnicos.tec_negreso = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                simpletTecnicos.tec_cobservaciones = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpletTecnicos.tec_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              simpletTecnicos.CallerObject = Object.GetCallerObject();
              simpletTecnicos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletTecnicos);
              objectCollection.Add((SimpleBaseObject) simpletTecnicos);
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
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_tecnicos Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_tecnicosBySimplet_tecnicos", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tec_ccodigo", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tec_cnombre", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@tec_ctelefono", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tec_cmail", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@tec_ningreso", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tec_negreso", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@tec_cobservaciones", SqlDbType.NText));
            selectCommand.Parameters.Add(new SqlParameter("@tec_nestado", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@tec_ccodigo"].Value = this._tec_ccodigo == null ? (object) DBNull.Value : (object) this._tec_ccodigo;
            selectCommand.Parameters["@tec_cnombre"].Value = this._tec_cnombre == null ? (object) DBNull.Value : (object) this._tec_cnombre;
            selectCommand.Parameters["@tec_ctelefono"].Value = this._tec_ctelefono == null ? (object) DBNull.Value : (object) this._tec_ctelefono;
            selectCommand.Parameters["@tec_cmail"].Value = this._tec_cmail == null ? (object) DBNull.Value : (object) this._tec_cmail;
            selectCommand.Parameters["@tec_ningreso"].Value = (object) this._tec_ningreso;
            selectCommand.Parameters["@tec_negreso"].Value = (object) this._tec_negreso;
            selectCommand.Parameters["@tec_cobservaciones"].Value = this._tec_cobservaciones == null ? (object) DBNull.Value : (object) this._tec_cobservaciones;
            selectCommand.Parameters["@tec_nestado"].Value = (object) this._tec_nestado;
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

    public IEnumerable<Simplet_tecnicos> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_tecnicos Simple = new Simplet_tecnicos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tec_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tec_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tec_ctelefono = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tec_cmail = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tec_ningreso = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tec_negreso = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tec_cobservaciones = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tec_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_tecnicos> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_tecnicosByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_tecnicos Simple = new Simplet_tecnicos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.tec_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.tec_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.tec_ctelefono = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.tec_cmail = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.tec_ningreso = sqlDataReader.IsDBNull(6) ? new Decimal(0) : sqlDataReader.GetDecimal(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.tec_negreso = sqlDataReader.IsDBNull(7) ? new Decimal(0) : sqlDataReader.GetDecimal(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.tec_cobservaciones = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.tec_nestado = sqlDataReader.IsDBNull(9) ? new Decimal(0) : sqlDataReader.GetDecimal(9);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3029, "t_tecnicos");
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
          this._tec_ccodigo = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._tec_cnombre = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._tec_ctelefono = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._tec_cmail = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._tec_ningreso = Reader.IsDBNull(6) ? new Decimal(0) : Reader.GetDecimal(6);
        if (Reader.FieldCount > 7)
          this._tec_negreso = Reader.IsDBNull(7) ? new Decimal(0) : Reader.GetDecimal(7);
        if (Reader.FieldCount > 8)
          this._tec_cobservaciones = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._tec_nestado = Reader.IsDBNull(9) ? new Decimal(0) : Reader.GetDecimal(9);
      }
      Reader.Close();
    }
  }
}
