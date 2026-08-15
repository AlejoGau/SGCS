


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
    public class Lineas
    {       
        
		   
			 ///<summary>
     ///lin_ccodigo   
     ///</summary>
	 [DataMember]
     public string lin_ccodigo { get;set;} 
	  ///<summary>
     ///lin_crazonsocial   
     ///</summary>
	 [DataMember]
     public string lin_crazonsocial { get;set;} 
	  ///<summary>
     ///lin_ccalle   
     ///</summary>
	 [DataMember]
     public string lin_ccalle { get;set;} 
	  ///<summary>
     ///lin_inumero   
     ///</summary>
	 [DataMember]
     public int lin_inumero { get;set;} 
	  ///<summary>
     ///lin_npiso   
     ///</summary>
	 [DataMember]
     public Decimal lin_npiso { get;set;} 
	  ///<summary>
     ///lin_cdepartamento   
     ///</summary>
	 [DataMember]
     public string lin_cdepartamento { get;set;} 
	  ///<summary>
     ///lin_clocalidad   
     ///</summary>
	 [DataMember]
     public string lin_clocalidad { get;set;} 
	  ///<summary>
     ///lin_cprovincia   
     ///</summary>
	 [DataMember]
     public string lin_cprovincia { get;set;} 
	  ///<summary>
     ///lin_cestado   
     ///</summary>
	 [DataMember]
     public string lin_cestado { get;set;} 
	  ///<summary>
     ///lin_ccodigopostal   
     ///</summary>
	 [DataMember]
     public string lin_ccodigopostal { get;set;} 
	  ///<summary>
     ///lin_ctelfono   
     ///</summary>
	 [DataMember]
     public string lin_ctelfono { get;set;} 
	  ///<summary>
     ///lin_cfax   
     ///</summary>
	 [DataMember]
     public string lin_cfax { get;set;} 
	  ///<summary>
     ///lin_cimagen   
     ///</summary>
	 [DataMember]
     public string lin_cimagen { get;set;} 
	  ///<summary>
     ///lin_cusuario   
     ///</summary>
	 [DataMember]
     public string lin_cusuario { get;set;} 
	  ///<summary>
     ///lin_cclave   
     ///</summary>
	 [DataMember]
     public string lin_cclave { get;set;} 
	  ///<summary>
     ///lin_nacceso   
     ///</summary>
	 [DataMember]
     public Decimal lin_nacceso { get;set;} 
	  ///<summary>
     ///lin_cmail   
     ///</summary>
	 [DataMember]
     public string lin_cmail { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Lineas()
        {            
        }       
    }

    public class LineasManager
    {
        public string ConnectionString { get; set; }

        public LineasManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Lineas> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_LineasAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Lineas();
                    Simple.lin_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.lin_crazonsocial = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.lin_ccalle = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
Simple.lin_inumero = (Reader.IsDBNull(3)) ? 0 : Reader.GetInt32(3);
Simple.lin_npiso = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
Simple.lin_cdepartamento = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
Simple.lin_clocalidad = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
Simple.lin_cprovincia = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
Simple.lin_cestado = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
Simple.lin_ccodigopostal = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
Simple.lin_ctelfono = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
Simple.lin_cfax = (Reader.IsDBNull(11)) ? "" : Reader.GetString(11);
Simple.lin_cimagen = (Reader.IsDBNull(12)) ? "" : Reader.GetString(12);
Simple.lin_cusuario = (Reader.IsDBNull(13)) ? "" : Reader.GetString(13);
Simple.lin_cclave = (Reader.IsDBNull(14)) ? "" : Reader.GetString(14);
Simple.lin_nacceso = (Reader.IsDBNull(15)) ? new Decimal(0) : Reader.GetDecimal(15);
Simple.lin_cmail = (Reader.IsDBNull(16)) ? "" : Reader.GetString(16);


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


																
