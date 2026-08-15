


using System;
using System.Xml;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Serialization;

namespace SoftGuard.BusinessObjects.Tables
{
    ///<summary>
    ///Falsa Slbf Class
    ///</summary>
    [DataContract]
    public class TipoServicio
    {       
        
		   
			 ///<summary>
     ///tip_ccodigo   
     ///</summary>
	 [DataMember]
     public string tip_ccodigo { get;set;} 
	  ///<summary>
     ///tip_cdescripcion   
     ///</summary>
	 [DataMember]
     public string tip_cdescripcion { get;set;} 
	  ///<summary>
     ///tip_yvalor   
     ///</summary>
	 [DataMember]
     public Decimal tip_yvalor { get;set;} 
	  ///<summary>
     ///tip_ndias   
     ///</summary>
	 [DataMember]
     public Decimal tip_ndias { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public TipoServicio()
        {            
        }       
    }

    public class TipoServicioManager
    {
        public string ConnectionString { get; set; }

        public TipoServicioManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<TipoServicio> GetAll(string tip_ccodigo = null, string tip_cdescripcion = null, decimal tip_yvalor = 0, decimal tip_ndias = 0)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_TipoServicioAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
			
			Cmd.Parameters.Add(new SqlParameter("@tip_ccodigo", SqlDbType.NChar)).Value = tip_ccodigo;
            Cmd.Parameters.Add(new SqlParameter("@tip_cdescripcion", SqlDbType.NChar)).Value = tip_cdescripcion;
            Cmd.Parameters.Add(new SqlParameter("@tip_yvalor", SqlDbType.Decimal)).Value = tip_yvalor;
            Cmd.Parameters.Add(new SqlParameter("@tip_ndias", SqlDbType.Decimal)).Value = tip_ndias;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new TipoServicio();
                    Simple.tip_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.tip_cdescripcion = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.tip_yvalor = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
Simple.tip_ndias = (Reader.IsDBNull(3)) ? new Decimal(0) : Reader.GetDecimal(3);


                    yield return Simple;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
    }
}


																
