


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
    public class Deposito
    {       
        
		   
			 ///<summary>
     ///dep_ccodigo   
     ///</summary>
	 [DataMember]
     public string dep_ccodigo { get;set;} 
	  ///<summary>
     ///dep_cdescripcion   
     ///</summary>
	 [DataMember]
     public string dep_cdescripcion { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Deposito()
        {            
        }       
    }

    public class DepositoManager
    {
        public string ConnectionString { get; set; }

        public DepositoManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Deposito> GetAll(string dep_ccodigo = null, string dep_cdescripcion = null)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_DepositoAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
			
			Cmd.Parameters.Add(new SqlParameter("@dep_ccodigo", SqlDbType.Char)).Value = dep_ccodigo;
            Cmd.Parameters.Add(new SqlParameter("@dep_cdescripcion", SqlDbType.Char)).Value = dep_cdescripcion;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Deposito();
                    Simple.dep_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.dep_cdescripcion = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);


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


																
