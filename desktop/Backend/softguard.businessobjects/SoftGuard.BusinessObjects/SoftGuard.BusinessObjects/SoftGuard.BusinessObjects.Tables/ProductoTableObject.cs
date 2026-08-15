


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
    public class Producto
    {       
        
		   
			 ///<summary>
     ///pro_ccodigo   
     ///</summary>
	 [DataMember]
     public string pro_ccodigo { get;set;} 
	  ///<summary>
     ///pro_cdescripcion   
     ///</summary>
	 [DataMember]
     public string pro_cdescripcion { get;set;} 
	  ///<summary>
     ///pro_nstockminimo   
     ///</summary>
	 [DataMember]
     public Decimal pro_nstockminimo { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Producto()
        {            
        }       
    }

    public class ProductoManager
    {
        public string ConnectionString { get; set; }

        public ProductoManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Producto> GetAll(string pro_ccodigo = null, string pro_cdescripcion = null, decimal pro_nstockminimo = 0)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_ProductoAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
			
			Cmd.Parameters.Add(new SqlParameter("@pro_ccodigo", SqlDbType.NChar)).Value = pro_ccodigo;
            Cmd.Parameters.Add(new SqlParameter("@pro_cdescripcion", SqlDbType.NChar)).Value = pro_cdescripcion;
            Cmd.Parameters.Add(new SqlParameter("@pro_nstockminimo", SqlDbType.Decimal)).Value = pro_nstockminimo;
			

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Producto();
                    Simple.pro_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.pro_cdescripcion = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.pro_nstockminimo = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);


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


																
