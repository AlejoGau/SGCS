// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Dalt_autoridades
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
  public class Dalt_autoridades : TransactionObject
  {
    private string _ConnectionString = (string) null;
    private bool _AutoCommit = false;
    private string _aut_cnombre;
    private string _aut_meventos;
    private string _aut_cdealer;
    private string _aut_meventosauto;
    private string _aut_cprovincia;
    private string _aut_cautoprocesados;
    private int _aut_idestino;

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

    public string aut_cnombre
    {
      get
      {
        return this._aut_cnombre;
      }
      set
      {
        this._aut_cnombre = value;
      }
    }

    public string aut_meventos
    {
      get
      {
        return this._aut_meventos;
      }
      set
      {
        this._aut_meventos = value;
      }
    }

    public string aut_cdealer
    {
      get
      {
        return this._aut_cdealer;
      }
      set
      {
        this._aut_cdealer = value;
      }
    }

    public string aut_meventosauto
    {
      get
      {
        return this._aut_meventosauto;
      }
      set
      {
        this._aut_meventosauto = value;
      }
    }

    public string aut_cprovincia
    {
      get
      {
        return this._aut_cprovincia;
      }
      set
      {
        this._aut_cprovincia = value;
      }
    }

    public string aut_cautoprocesados
    {
      get
      {
        return this._aut_cautoprocesados;
      }
      set
      {
        this._aut_cautoprocesados = value;
      }
    }

    public int aut_idestino
    {
      get
      {
        return this._aut_idestino;
      }
      set
      {
        this._aut_idestino = value;
      }
    }

    public Dalt_autoridades(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
    }

    public Dalt_autoridades(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Load(Id);
    }

    public Dalt_autoridades(SqlHelper SqlConfig, int UserId, Simplet_autoridades Simple)
      : base(SqlConfig, UserId)
    {
      this.InitClass();
      this.SetConfig(SqlConfig);
      this.Id = Simple.Id;
      this.Name = Simple.Name;
      this._aut_cnombre = Simple.aut_cnombre;
      this._aut_meventos = Simple.aut_meventos;
      this._aut_cdealer = Simple.aut_cdealer;
      this._aut_meventosauto = Simple.aut_meventosauto;
      this._aut_cprovincia = Simple.aut_cprovincia;
      this._aut_cautoprocesados = Simple.aut_cautoprocesados;
      this._aut_idestino = Simple.aut_idestino;
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
            using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesIns", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_meventos", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cdealer", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_meventosauto", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cprovincia", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cautoprocesados", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_idestino", SqlDbType.Int));
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@aut_cnombre"].Value = this._aut_cnombre == null ? (object) DBNull.Value : (object) this._aut_cnombre;
              sqlCommand.Parameters["@aut_meventos"].Value = this._aut_meventos == null ? (object) DBNull.Value : (object) this._aut_meventos;
              sqlCommand.Parameters["@aut_cdealer"].Value = this._aut_cdealer == null ? (object) DBNull.Value : (object) this._aut_cdealer;
              sqlCommand.Parameters["@aut_meventosauto"].Value = this._aut_meventosauto == null ? (object) DBNull.Value : (object) this._aut_meventosauto;
              sqlCommand.Parameters["@aut_cprovincia"].Value = this._aut_cprovincia == null ? (object) DBNull.Value : (object) this._aut_cprovincia;
              sqlCommand.Parameters["@aut_cautoprocesados"].Value = this._aut_cautoprocesados == null ? (object) DBNull.Value : (object) this._aut_cautoprocesados;
              sqlCommand.Parameters["@aut_idestino"].Value = (object) this._aut_idestino;
              connection.Open();
              this.FillObject(sqlCommand.ExecuteReader());
            }
          }
        }
        else
        {
          using (SqlConnection connection = new SqlConnection(this._ConnectionString))
          {
            using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesUpd", connection))
            {
              sqlCommand.CommandType = CommandType.StoredProcedure;
              sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int));
              sqlCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cnombre", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_meventos", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cdealer", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_meventosauto", SqlDbType.NText));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cprovincia", SqlDbType.NChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_cautoprocesados", SqlDbType.NVarChar));
              sqlCommand.Parameters.Add(new SqlParameter("@aut_idestino", SqlDbType.Int));
              sqlCommand.Parameters["@Id"].Value = (object) this.Id;
              sqlCommand.Parameters["@Name"].Value = (object) this.Name;
              sqlCommand.Parameters["@aut_cnombre"].Value = this._aut_cnombre == null ? (object) DBNull.Value : (object) this._aut_cnombre;
              sqlCommand.Parameters["@aut_meventos"].Value = this._aut_meventos == null ? (object) DBNull.Value : (object) this._aut_meventos;
              sqlCommand.Parameters["@aut_cdealer"].Value = this._aut_cdealer == null ? (object) DBNull.Value : (object) this._aut_cdealer;
              sqlCommand.Parameters["@aut_meventosauto"].Value = this._aut_meventosauto == null ? (object) DBNull.Value : (object) this._aut_meventosauto;
              sqlCommand.Parameters["@aut_cprovincia"].Value = this._aut_cprovincia == null ? (object) DBNull.Value : (object) this._aut_cprovincia;
              sqlCommand.Parameters["@aut_cautoprocesados"].Value = this._aut_cautoprocesados == null ? (object) DBNull.Value : (object) this._aut_cautoprocesados;
              sqlCommand.Parameters["@aut_idestino"].Value = (object) this._aut_idestino;
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
        throw new RuntimeException("The t_autoridades is null");
      try
      {
        this.BeginTran();
        using (SqlConnection connection = new SqlConnection(this._ConnectionString))
        {
          using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesDel", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesSel", connection))
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
      Simplet_autoridades simpletAutoridades = new Simplet_autoridades();
      simpletAutoridades.Id = this.Id;
      simpletAutoridades.Name = this.Name;
      simpletAutoridades.aut_cnombre = this._aut_cnombre;
      simpletAutoridades.aut_meventos = this._aut_meventos;
      simpletAutoridades.aut_cdealer = this._aut_cdealer;
      simpletAutoridades.aut_meventosauto = this._aut_meventosauto;
      simpletAutoridades.aut_cprovincia = this._aut_cprovincia;
      simpletAutoridades.aut_cautoprocesados = this._aut_cautoprocesados;
      simpletAutoridades.aut_idestino = this._aut_idestino;
      if (this.CallerObject != null)
        simpletAutoridades.CallerObject = this.CallerObject;
      return (SimpleBaseObject) simpletAutoridades;
    }

    public void SetSimpleObject(SimpleBaseObject BaseSimple)
    {
      Simplet_autoridades simpletAutoridades = (Simplet_autoridades) BaseSimple;
      this.Id = simpletAutoridades.Id;
      this.Name = simpletAutoridades.Name;
      this._aut_cnombre = simpletAutoridades.aut_cnombre;
      this._aut_meventos = simpletAutoridades.aut_meventos;
      this._aut_cdealer = simpletAutoridades.aut_cdealer;
      this._aut_meventosauto = simpletAutoridades.aut_meventosauto;
      this._aut_cprovincia = simpletAutoridades.aut_cprovincia;
      this._aut_cautoprocesados = simpletAutoridades.aut_cautoprocesados;
      this._aut_idestino = simpletAutoridades.aut_idestino;
      if (simpletAutoridades.CallerObject != null)
        this.CallerObject = simpletAutoridades.CallerObject;
      this.OriginalObject = this.GetSimpleObject();
    }

    public override CallerObject GetCallerObject()
    {
      Callert_autoridades callertAutoridades = new Callert_autoridades();
      callertAutoridades.Id = this.Id;
      callertAutoridades.Name = this.Name;
      callertAutoridades.aut_cnombre = this._aut_cnombre;
      callertAutoridades.aut_meventos = this._aut_meventos;
      callertAutoridades.aut_cdealer = this._aut_cdealer;
      callertAutoridades.aut_meventosauto = this._aut_meventosauto;
      callertAutoridades.aut_cprovincia = this._aut_cprovincia;
      callertAutoridades.aut_cautoprocesados = this._aut_cautoprocesados;
      callertAutoridades.aut_idestino = this._aut_idestino;
      return (CallerObject) callertAutoridades;
    }

    public override DataTable GetDataObject()
    {
      DataTable dataTable = new DataTable("Data");
      dataTable.Columns.Add(new DataColumn("Id", typeof (int)));
      dataTable.Columns.Add(new DataColumn("Name", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cnombre", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_meventos", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cdealer", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_meventosauto", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cprovincia", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_cautoprocesados", typeof (string)));
      dataTable.Columns.Add(new DataColumn("aut_idestino", typeof (int)));
      DataRow row = dataTable.NewRow();
      row["Id"] = (object) this.Id;
      row["Name"] = (object) this.Name;
      row["aut_cnombre"] = (object) this._aut_cnombre;
      row["aut_meventos"] = (object) this._aut_meventos;
      row["aut_cdealer"] = (object) this._aut_cdealer;
      row["aut_meventosauto"] = (object) this._aut_meventosauto;
      row["aut_cprovincia"] = (object) this._aut_cprovincia;
      row["aut_cautoprocesados"] = (object) this._aut_cautoprocesados;
      row["aut_idestino"] = (object) this._aut_idestino;
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
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesByChildObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesByChildObject", connection))
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
              Simplet_autoridades simpletAutoridades = new Simplet_autoridades();
              simpletAutoridades.Id = sqlDataReader.GetInt32(0);
              simpletAutoridades.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletAutoridades.aut_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletAutoridades.aut_meventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletAutoridades.aut_cdealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletAutoridades.aut_meventosauto = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletAutoridades.aut_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpletAutoridades.aut_cautoprocesados = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpletAutoridades.aut_idestino = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              simpletAutoridades.CallerObject = Object.GetCallerObject();
              simpletAutoridades.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletAutoridades);
              objectCollection.Add((SimpleBaseObject) simpletAutoridades);
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
        Simplet_autoridades simpletAutoridades = new Simplet_autoridades();
        simpletAutoridades.Id = (int) row["Id"];
        simpletAutoridades.Name = (string) row["Name"];
        simpletAutoridades.aut_cnombre = row["aut_cnombre"] == DBNull.Value ? "" : (string) row["aut_cnombre"];
        simpletAutoridades.aut_meventos = row["aut_meventos"] == DBNull.Value ? "" : (string) row["aut_meventos"];
        simpletAutoridades.aut_cdealer = row["aut_cdealer"] == DBNull.Value ? "" : (string) row["aut_cdealer"];
        simpletAutoridades.aut_meventosauto = row["aut_meventosauto"] == DBNull.Value ? "" : (string) row["aut_meventosauto"];
        simpletAutoridades.aut_cprovincia = row["aut_cprovincia"] == DBNull.Value ? "" : (string) row["aut_cprovincia"];
        simpletAutoridades.aut_cautoprocesados = row["aut_cautoprocesados"] == DBNull.Value ? "" : (string) row["aut_cautoprocesados"];
        simpletAutoridades.aut_idestino = row["aut_idestino"] == DBNull.Value ? 0 : (int) row["aut_idestino"];
        simpletAutoridades.CallerObject = Object.GetCallerObject();
        simpletAutoridades.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletAutoridades);
        if (Recursive)
          simpletAutoridades.Dependencies = this.GetChildsByObject((SimpleBaseObject) simpletAutoridades, Recursive);
        objectCollection.Add((SimpleBaseObject) simpletAutoridades);
      }
      return objectCollection;
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      this.Load();
      DataTable dataTable = new DataTable("Parents");
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesByParentObject", connection))
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
        using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesByParentObject", connection))
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
              Simplet_autoridades simpletAutoridades = new Simplet_autoridades();
              simpletAutoridades.Id = sqlDataReader.GetInt32(0);
              simpletAutoridades.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                simpletAutoridades.aut_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                simpletAutoridades.aut_meventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                simpletAutoridades.aut_cdealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                simpletAutoridades.aut_meventosauto = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                simpletAutoridades.aut_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                simpletAutoridades.aut_cautoprocesados = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                simpletAutoridades.aut_idestino = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              simpletAutoridades.CallerObject = Object.GetCallerObject();
              simpletAutoridades.CallerObject.Relation = new RelationHelper(this.Security.SqlConfig).GetValuesWithRelation(Object, (SimpleBaseObject) simpletAutoridades);
              objectCollection.Add((SimpleBaseObject) simpletAutoridades);
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
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesByName", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesByNameWithChild", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesByNameWithParent", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesByFilter", connection))
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
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesByText", connection))
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

    public DataTable GetDataBySimpleObject(Simplet_autoridades Simple, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      this.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand selectCommand = new SqlCommand("t_autoridadesBySimplet_autoridades", connection))
        {
          using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand))
          {
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@Taxonomies", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@aut_cnombre", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@aut_meventos", SqlDbType.NText));
            selectCommand.Parameters.Add(new SqlParameter("@aut_cdealer", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@aut_meventosauto", SqlDbType.NText));
            selectCommand.Parameters.Add(new SqlParameter("@aut_cprovincia", SqlDbType.NChar));
            selectCommand.Parameters.Add(new SqlParameter("@aut_cautoprocesados", SqlDbType.NVarChar));
            selectCommand.Parameters.Add(new SqlParameter("@aut_idestino", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageCount", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PagePresent", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@PageTotal", SqlDbType.Int));
            selectCommand.Parameters.Add(new SqlParameter("@RowTotal", SqlDbType.Int));
            selectCommand.Parameters["@PageTotal"].Direction = ParameterDirection.Output;
            selectCommand.Parameters["@RowTotal"].Direction = ParameterDirection.Output;
            DataTable dataTable = new DataTable("Object");
            selectCommand.Parameters["@Name"].Value = (object) Simple.Name;
            selectCommand.Parameters["@Taxonomies"].Value = (object) Taxonomies.GetTaxnonomiesByChecked();
            selectCommand.Parameters["@aut_cnombre"].Value = this._aut_cnombre == null ? (object) DBNull.Value : (object) this._aut_cnombre;
            selectCommand.Parameters["@aut_meventos"].Value = this._aut_meventos == null ? (object) DBNull.Value : (object) this._aut_meventos;
            selectCommand.Parameters["@aut_cdealer"].Value = this._aut_cdealer == null ? (object) DBNull.Value : (object) this._aut_cdealer;
            selectCommand.Parameters["@aut_meventosauto"].Value = this._aut_meventosauto == null ? (object) DBNull.Value : (object) this._aut_meventosauto;
            selectCommand.Parameters["@aut_cprovincia"].Value = this._aut_cprovincia == null ? (object) DBNull.Value : (object) this._aut_cprovincia;
            selectCommand.Parameters["@aut_cautoprocesados"].Value = this._aut_cautoprocesados == null ? (object) DBNull.Value : (object) this._aut_cautoprocesados;
            selectCommand.Parameters["@aut_idestino"].Value = (object) this._aut_idestino;
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

    public IEnumerable<Simplet_autoridades> GetByChild(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesByParentObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_autoridades Simple = new Simplet_autoridades();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.aut_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.aut_meventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.aut_cdealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.aut_meventosauto = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.aut_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.aut_cautoprocesados = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.aut_idestino = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              yield return Simple;
            }
          }
        }
      }
    }

    public IEnumerable<Simplet_autoridades> GetByParent(string ObjectType, int ObjectId)
    {
      // ISSUE: reference to a compiler-generated method
      base.Load();
      using (SqlConnection connection = new SqlConnection(this._ConnectionString))
      {
        using (SqlCommand sqlCommand = new SqlCommand("t_autoridadesByChildObject", connection))
        {
          connection.Open();
          sqlCommand.CommandType = CommandType.StoredProcedure;
          sqlCommand.Parameters.Add(new SqlParameter("@ObjectType", SqlDbType.NVarChar)).Value = (object) ObjectType;
          sqlCommand.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int)).Value = (object) ObjectId;
          using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
          {
            while (sqlDataReader.Read())
            {
              Simplet_autoridades Simple = new Simplet_autoridades();
              Simple.Id = sqlDataReader.GetInt32(0);
              Simple.Name = sqlDataReader.GetString(1);
              if (sqlDataReader.FieldCount > 2)
                Simple.aut_cnombre = sqlDataReader.IsDBNull(2) ? "" : sqlDataReader.GetString(2);
              if (sqlDataReader.FieldCount > 3)
                Simple.aut_meventos = sqlDataReader.IsDBNull(3) ? "" : sqlDataReader.GetString(3);
              if (sqlDataReader.FieldCount > 4)
                Simple.aut_cdealer = sqlDataReader.IsDBNull(4) ? "" : sqlDataReader.GetString(4);
              if (sqlDataReader.FieldCount > 5)
                Simple.aut_meventosauto = sqlDataReader.IsDBNull(5) ? "" : sqlDataReader.GetString(5);
              if (sqlDataReader.FieldCount > 6)
                Simple.aut_cprovincia = sqlDataReader.IsDBNull(6) ? "" : sqlDataReader.GetString(6);
              if (sqlDataReader.FieldCount > 7)
                Simple.aut_cautoprocesados = sqlDataReader.IsDBNull(7) ? "" : sqlDataReader.GetString(7);
              if (sqlDataReader.FieldCount > 8)
                Simple.aut_idestino = sqlDataReader.IsDBNull(8) ? 0 : sqlDataReader.GetInt32(8);
              yield return Simple;
            }
          }
        }
      }
    }

    private void InitClass()
    {
      this.Type = new ObjectType(3128, "t_autoridades");
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
          this._aut_cnombre = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
        if (Reader.FieldCount > 3)
          this._aut_meventos = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
        if (Reader.FieldCount > 4)
          this._aut_cdealer = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
        if (Reader.FieldCount > 5)
          this._aut_meventosauto = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
        if (Reader.FieldCount > 6)
          this._aut_cprovincia = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
        if (Reader.FieldCount > 7)
          this._aut_cautoprocesados = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
        if (Reader.FieldCount > 8)
          this._aut_idestino = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
      }
      Reader.Close();
    }
  }
}
