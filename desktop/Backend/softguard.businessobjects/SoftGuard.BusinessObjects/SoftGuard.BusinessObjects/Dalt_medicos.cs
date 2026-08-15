// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_medicos
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
  public class Dalt_medicos : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _med_ccodigo;
    private string _med_cnombre;
    private string _med_ccalle;
    private string _med_clocalidad;
    private string _med_cprovincia;
    private string _med_ccodigopostal;
    private string _med_ctelefono;
    private string _med_cfax;
    private Decimal _med_ntipo;

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

    public string med_ccodigo
    {
      get
      {
        return this._med_ccodigo;
      }
      set
      {
        this._med_ccodigo = value;
      }
    }

    public string med_cnombre
    {
      get
      {
        return this._med_cnombre;
      }
      set
      {
        this._med_cnombre = value;
      }
    }

    public string med_ccalle
    {
      get
      {
        return this._med_ccalle;
      }
      set
      {
        this._med_ccalle = value;
      }
    }

    public string med_clocalidad
    {
      get
      {
        return this._med_clocalidad;
      }
      set
      {
        this._med_clocalidad = value;
      }
    }

    public string med_cprovincia
    {
      get
      {
        return this._med_cprovincia;
      }
      set
      {
        this._med_cprovincia = value;
      }
    }

    public string med_ccodigopostal
    {
      get
      {
        return this._med_ccodigopostal;
      }
      set
      {
        this._med_ccodigopostal = value;
      }
    }

    public string med_ctelefono
    {
      get
      {
        return this._med_ctelefono;
      }
      set
      {
        this._med_ctelefono = value;
      }
    }

    public string med_cfax
    {
      get
      {
        return this._med_cfax;
      }
      set
      {
        this._med_cfax = value;
      }
    }

    public Decimal med_ntipo
    {
      get
      {
        return this._med_ntipo;
      }
      set
      {
        this._med_ntipo = value;
      }
    }

    public Dalt_medicos(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_medicos(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_medicos(SqlHelper SqlConfig, int UserId, Simplet_medicos Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._med_ccodigo = Simple.med_ccodigo;
      this._med_cnombre = Simple.med_cnombre;
      this._med_ccalle = Simple.med_ccalle;
      this._med_clocalidad = Simple.med_clocalidad;
      this._med_cprovincia = Simple.med_cprovincia;
      this._med_ccodigopostal = Simple.med_ccodigopostal;
      this._med_ctelefono = Simple.med_ctelefono;
      this._med_cfax = Simple.med_cfax;
      this._med_ntipo = Simple.med_ntipo;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_medicosIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ccalle", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_clocalidad", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_cprovincia", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ccodigopostal", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ctelefono", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_cfax", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ntipo", SqlDbType.Decimal));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@med_ccodigo"].Value = this._med_ccodigo == null ? (object) DBNull.Value : (object) this._med_ccodigo;
              sqlCommand.Parameters["@med_cnombre"].Value = this._med_cnombre == null ? (object) DBNull.Value : (object) this._med_cnombre;
              sqlCommand.Parameters["@med_ccalle"].Value = this._med_ccalle == null ? (object) DBNull.Value : (object) this._med_ccalle;
              sqlCommand.Parameters["@med_clocalidad"].Value = this._med_clocalidad == null ? (object) DBNull.Value : (object) this._med_clocalidad;
              sqlCommand.Parameters["@med_cprovincia"].Value = this._med_cprovincia == null ? (object) DBNull.Value : (object) this._med_cprovincia;
              sqlCommand.Parameters["@med_ccodigopostal"].Value = this._med_ccodigopostal == null ? (object) DBNull.Value : (object) this._med_ccodigopostal;
              sqlCommand.Parameters["@med_ctelefono"].Value = this._med_ctelefono == null ? (object) DBNull.Value : (object) this._med_ctelefono;
              sqlCommand.Parameters["@med_cfax"].Value = this._med_cfax == null ? (object) DBNull.Value : (object) this._med_cfax;
              sqlCommand.Parameters["@med_ntipo"].Value = (object) this._med_ntipo;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_medicosUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ccodigo", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ccalle", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_clocalidad", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_cprovincia", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ccodigopostal", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ctelefono", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_cfax", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@med_ntipo", SqlDbType.Decimal));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@med_ccodigo"].Value = this._med_ccodigo == null ? (object) DBNull.Value : (object) this._med_ccodigo;
              sqlCommand.Parameters["@med_cnombre"].Value = this._med_cnombre == null ? (object) DBNull.Value : (object) this._med_cnombre;
              sqlCommand.Parameters["@med_ccalle"].Value = this._med_ccalle == null ? (object) DBNull.Value : (object) this._med_ccalle;
              sqlCommand.Parameters["@med_clocalidad"].Value = this._med_clocalidad == null ? (object) DBNull.Value : (object) this._med_clocalidad;
              sqlCommand.Parameters["@med_cprovincia"].Value = this._med_cprovincia == null ? (object) DBNull.Value : (object) this._med_cprovincia;
              sqlCommand.Parameters["@med_ccodigopostal"].Value = this._med_ccodigopostal == null ? (object) DBNull.Value : (object) this._med_ccodigopostal;
              sqlCommand.Parameters["@med_ctelefono"].Value = this._med_ctelefono == null ? (object) DBNull.Value : (object) this._med_ctelefono;
              sqlCommand.Parameters["@med_cfax"].Value = this._med_cfax == null ? (object) DBNull.Value : (object) this._med_cfax;
              sqlCommand.Parameters["@med_ntipo"].Value = (object) this._med_ntipo;
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
        throw new RuntimeException("The t_medicos is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_medicosDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_medicosSel", connection))
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
      Simplet_medicos simpletMedicos = new Simplet_medicos();
      simpletMedicos.Id = this.Id;
      simpletMedicos.Name = this.Name;
      simpletMedicos.med_ccodigo = this._med_ccodigo;
      simpletMedicos.med_cnombre = this._med_cnombre;
      simpletMedicos.med_ccalle = this._med_ccalle;
      simpletMedicos.med_clocalidad = this._med_clocalidad;
      simpletMedicos.med_cprovincia = this._med_cprovincia;
      simpletMedicos.med_ccodigopostal = this._med_ccodigopostal;
      simpletMedicos.med_ctelefono = this._med_ctelefono;
      simpletMedicos.med_cfax = this._med_cfax;
      simpletMedicos.med_ntipo = this._med_ntipo;
      if (this.CallerObject != null)
        simpletMedicos.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletMedicos;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_medicos simpletMedicos = (Simplet_medicos) BaseSimple;
      this.Id = simpletMedicos.Id;
      this.Name = simpletMedicos.Name;
      this._med_ccodigo = simpletMedicos.med_ccodigo;
      this._med_cnombre = simpletMedicos.med_cnombre;
      this._med_ccalle = simpletMedicos.med_ccalle;
      this._med_clocalidad = simpletMedicos.med_clocalidad;
      this._med_cprovincia = simpletMedicos.med_cprovincia;
      this._med_ccodigopostal = simpletMedicos.med_ccodigopostal;
      this._med_ctelefono = simpletMedicos.med_ctelefono;
      this._med_cfax = simpletMedicos.med_cfax;
      this._med_ntipo = simpletMedicos.med_ntipo;
      if (simpletMedicos.CallerObject != null)
        this.CallerObject = simpletMedicos.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_medicos callertMedicos = new Callert_medicos();
      callertMedicos.Id = this.Id;
      callertMedicos.Name = this.Name;
      callertMedicos.med_ccodigo = this._med_ccodigo;
      callertMedicos.med_cnombre = this._med_cnombre;
      callertMedicos.med_ccalle = this._med_ccalle;
      callertMedicos.med_clocalidad = this._med_clocalidad;
      callertMedicos.med_cprovincia = this._med_cprovincia;
      callertMedicos.med_ccodigopostal = this._med_ccodigopostal;
      callertMedicos.med_ctelefono = this._med_ctelefono;
      callertMedicos.med_cfax = this._med_cfax;
      callertMedicos.med_ntipo = this._med_ntipo;
      return (CallerObject) callertMedicos;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccodigo", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccalle", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_clocalidad", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cprovincia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ccodigopostal", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ctelefono", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_cfax", typeof (string)));
      dataTable.Columns.Add(new DataColumn("med_ntipo", typeof (Decimal)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["med_ccodigo"] = (object) this._med_ccodigo;
      row["med_cnombre"] = (object) this._med_cnombre;
      row["med_ccalle"] = (object) this._med_ccalle;
      row["med_clocalidad"] = (object) this._med_clocalidad;
      row["med_cprovincia"] = (object) this._med_cprovincia;
      row["med_ccodigopostal"] = (object) this._med_ccodigopostal;
      row["med_ctelefono"] = (object) this._med_ctelefono;
      row["med_cfax"] = (object) this._med_cfax;
      row["med_ntipo"] = (object) this._med_ntipo;
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
        using (SqlCommand selectCommand = new SqlCommand("t_medicosByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_medicosByChildObject", connection))
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
              Simplet_medicos simpletMedicos = new Simplet_medicos();
              simpletMedicos.Id = sqlDataReader.GetInt32(0);
              simpletMedicos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletMedicos.med_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletMedicos.med_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletMedicos.med_ccalle = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletMedicos.med_clocalidad = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletMedicos.med_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpletMedicos.med_ccodigopostal = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpletMedicos.med_ctelefono = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpletMedicos.med_cfax = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpletMedicos.med_ntipo = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              simpletMedicos.CallerObject = Object.GetCallerObject();
              simpletMedicos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMedicos);
              objectCollection.Add((SimpleBaseObject) simpletMedicos);
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
        Simplet_medicos simpletMedicos = new Simplet_medicos();
        simpletMedicos.Id = (int) row["Id"];
        simpletMedicos.Name = (string) row["Name"];
        simpletMedicos.med_ccodigo = row["med_ccodigo"] == DBNull.Value ? "" : (string) row["med_ccodigo"];
        simpletMedicos.med_cnombre = row["med_cnombre"] == DBNull.Value ? "" : (string) row["med_cnombre"];
        simpletMedicos.med_ccalle = row["med_ccalle"] == DBNull.Value ? "" : (string) row["med_ccalle"];
        simpletMedicos.med_clocalidad = row["med_clocalidad"] == DBNull.Value ? "" : (string) row["med_clocalidad"];
        simpletMedicos.med_cprovincia = row["med_cprovincia"] == DBNull.Value ? "" : (string) row["med_cprovincia"];
        simpletMedicos.med_ccodigopostal = row["med_ccodigopostal"] == DBNull.Value ? "" : (string) row["med_ccodigopostal"];
        simpletMedicos.med_ctelefono = row["med_ctelefono"] == DBNull.Value ? "" : (string) row["med_ctelefono"];
        simpletMedicos.med_cfax = row["med_cfax"] == DBNull.Value ? "" : (string) row["med_cfax"];
        simpletMedicos.med_ntipo = row["med_ntipo"] == DBNull.Value ? new Decimal(0) : (Decimal) row["med_ntipo"];
        simpletMedicos.CallerObject = Object.GetCallerObject();
        simpletMedicos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMedicos);
        if (Recursive)
          simpletMedicos.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletMedicos, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletMedicos);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_medicosByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_medicosByParentObject", connection))
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
              Simplet_medicos simpletMedicos = new Simplet_medicos();
              simpletMedicos.Id = sqlDataReader.GetInt32(0);
              simpletMedicos.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletMedicos.med_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletMedicos.med_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletMedicos.med_ccalle = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletMedicos.med_clocalidad = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletMedicos.med_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpletMedicos.med_ccodigopostal = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpletMedicos.med_ctelefono = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                simpletMedicos.med_cfax = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                simpletMedicos.med_ntipo = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              simpletMedicos.CallerObject = Object.GetCallerObject();
              simpletMedicos.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletMedicos);
              objectCollection.Add((SimpleBaseObject) simpletMedicos);
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
        using (SqlCommand selectCommand = new SqlCommand("t_medicosByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_medicosByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_medicosByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_medicosByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_medicosByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_medicos Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_medicosBySimplet_medicos", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_ccodigo", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_cnombre", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_ccalle", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_clocalidad", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_cprovincia", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_ccodigopostal", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_ctelefono", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_cfax", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@med_ntipo", SqlDbType.Decimal));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@med_ccodigo"].Value = this._med_ccodigo == null ? (object) DBNull.Value : (object) this._med_ccodigo;
            selectCommand.Parameters["@med_cnombre"].Value = this._med_cnombre == null ? (object) DBNull.Value : (object) this._med_cnombre;
            selectCommand.Parameters["@med_ccalle"].Value = this._med_ccalle == null ? (object) DBNull.Value : (object) this._med_ccalle;
            selectCommand.Parameters["@med_clocalidad"].Value = this._med_clocalidad == null ? (object) DBNull.Value : (object) this._med_clocalidad;
            selectCommand.Parameters["@med_cprovincia"].Value = this._med_cprovincia == null ? (object) DBNull.Value : (object) this._med_cprovincia;
            selectCommand.Parameters["@med_ccodigopostal"].Value = this._med_ccodigopostal == null ? (object) DBNull.Value : (object) this._med_ccodigopostal;
            selectCommand.Parameters["@med_ctelefono"].Value = this._med_ctelefono == null ? (object) DBNull.Value : (object) this._med_ctelefono;
            selectCommand.Parameters["@med_cfax"].Value = this._med_cfax == null ? (object) DBNull.Value : (object) this._med_cfax;
            selectCommand.Parameters["@med_ntipo"].Value = (object) this._med_ntipo;
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

    public IEnumerable<Simplet_medicos> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_medicosByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_medicos Simple = new Simplet_medicos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.med_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.med_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.med_ccalle = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.med_clocalidad = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.med_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.med_ccodigopostal = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.med_ctelefono = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.med_cfax = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.med_ntipo = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_medicos> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_medicosByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_medicos Simple = new Simplet_medicos();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.med_ccodigo = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.med_cnombre = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.med_ccalle = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.med_clocalidad = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.med_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.med_ccodigopostal = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.med_ctelefono = sqlDataReader.IsDBNull(8) ? "" : sqlDataReader.GetString(8);
              if (sqlDataReader.FieldCount > 9)
                Simple.med_cfax = sqlDataReader.IsDBNull(9) ? "" : sqlDataReader.GetString(9);
              if (sqlDataReader.FieldCount > 10)
                Simple.med_ntipo = sqlDataReader.IsDBNull(10) ? new Decimal(0) : sqlDataReader.GetDecimal(10);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3073, "t_medicos");
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
          this._med_ccodigo = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._med_cnombre = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._med_ccalle = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._med_clocalidad = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._med_cprovincia = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._med_ccodigopostal = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._med_ctelefono = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
        if (Reader.FieldCount > 9)
          this._med_cfax = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
        if (Reader.FieldCount > 10)
          this._med_ntipo = Reader.IsDBNull(10) ? new Decimal(0) : Reader.GetDecimal(10);
      }
      Reader.Close();
    }
  }
}
