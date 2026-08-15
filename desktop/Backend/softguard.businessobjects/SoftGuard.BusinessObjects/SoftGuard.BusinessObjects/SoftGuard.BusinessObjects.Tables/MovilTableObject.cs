


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
    public class Movil
    {       
        
		   
			 ///<summary>
     ///mov_ccodigo   
     ///</summary>
	 [DataMember]
     public string mov_ccodigo { get;set;} 
	  ///<summary>
     ///mov_cdescripcion   
     ///</summary>
	 [DataMember]
     public string mov_cdescripcion { get;set;} 
	  ///<summary>
     ///mov_mobservaciones   
     ///</summary>
	 [DataMember]
     public string mov_mobservaciones { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Movil()
        {            
        }       
    }

    public class MovilManager
    {
        public string ConnectionString { get; set; }

        public MovilManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Movil> GetAll(string mov_ccodigo = null, string mov_cdescripcion = null, string mov_mobservaciones = null)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_MovilAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
			
			Cmd.Parameters.Add(new SqlParameter("@mov_ccodigo", SqlDbType.NChar)).Value = mov_ccodigo;
            Cmd.Parameters.Add(new SqlParameter("@mov_cdescripcion", SqlDbType.NChar)).Value = mov_cdescripcion;
            Cmd.Parameters.Add(new SqlParameter("@mov_mobservaciones", SqlDbType.NText)).Value = mov_mobservaciones;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Movil();
                    Simple.mov_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.mov_cdescripcion = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.mov_mobservaciones = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);


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


																
