


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
    public class Parametros
    {       
        
		   
			 ///<summary>
     ///par_ccodigo   
     ///</summary>
	 [DataMember]
     public string par_ccodigo { get;set;} 
	  ///<summary>
     ///par_cdescripcion   
     ///</summary>
	 [DataMember]
     public string par_cdescripcion { get;set;} 
	  ///<summary>
     ///par_ivalor   
     ///</summary>
	 [DataMember]
     public int par_ivalor { get;set;} 
	  ///<summary>
     ///par_mobservacion   
     ///</summary>
	 [DataMember]
     public string par_mobservacion { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Parametros()
        {            
        }       
    }

    public class ParametrosManager
    {
        public string ConnectionString { get; set; }

        public ParametrosManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Parametros> GetAll(string par_ccodigo = null)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_ParametrosAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.Add(new SqlParameter("par_ccodigo", SqlDbType.NVarChar)).Value = par_ccodigo;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Parametros();
                    Simple.par_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.par_cdescripcion = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.par_ivalor = (Reader.IsDBNull(2)) ? 0 : Reader.GetInt32(2);
Simple.par_mobservacion = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);


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


																
