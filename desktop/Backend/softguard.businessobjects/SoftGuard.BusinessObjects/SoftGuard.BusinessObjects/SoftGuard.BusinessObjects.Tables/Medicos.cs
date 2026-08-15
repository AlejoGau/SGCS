


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
    public class Medicos
    {       
        
		   
			 ///<summary>
     ///med_ccodigo   
     ///</summary>
	 [DataMember]
     public string med_ccodigo { get;set;} 
	  ///<summary>
     ///med_cnombre   
     ///</summary>
	 [DataMember]
     public string med_cnombre { get;set;} 
	  ///<summary>
     ///med_ccalle   
     ///</summary>
	 [DataMember]
     public string med_ccalle { get;set;} 
	  ///<summary>
     ///med_clocalidad   
     ///</summary>
	 [DataMember]
     public string med_clocalidad { get;set;} 
	  ///<summary>
     ///med_cprovincia   
     ///</summary>
	 [DataMember]
     public string med_cprovincia { get;set;} 
	  ///<summary>
     ///med_ccodigopostal   
     ///</summary>
	 [DataMember]
     public string med_ccodigopostal { get;set;} 
	  ///<summary>
     ///med_ctelefono   
     ///</summary>
	 [DataMember]
     public string med_ctelefono { get;set;} 
	  ///<summary>
     ///med_cfax   
     ///</summary>
	 [DataMember]
     public string med_cfax { get;set;} 
	  ///<summary>
     ///med_ntipo   
     ///</summary>
	 [DataMember]
     public Decimal med_ntipo { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Medicos()
        {            
        }       
    }

    public class MedicosManager
    {
        public string ConnectionString { get; set; }

        public MedicosManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Medicos> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_MedicosAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Medicos();
                    Simple.med_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.med_cnombre = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.med_ccalle = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
Simple.med_clocalidad = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
Simple.med_cprovincia = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
Simple.med_ccodigopostal = (Reader.IsDBNull(5)) ? "" : Reader.GetString(5);
Simple.med_ctelefono = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
Simple.med_cfax = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
Simple.med_ntipo = (Reader.IsDBNull(8)) ? new Decimal(0) : Reader.GetDecimal(8);


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


																
