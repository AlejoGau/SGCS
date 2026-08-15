


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
    public class Instaladores
    {       
        
		   
			 ///<summary>
     ///ins_ccodigo   
     ///</summary>
	 [DataMember]
     public string ins_ccodigo { get;set;} 
	  ///<summary>
     ///ins_cnombre   
     ///</summary>
	 [DataMember]
     public string ins_cnombre { get;set;} 
	  ///<summary>
     ///ins_cempresa   
     ///</summary>
	 [DataMember]
     public string ins_cempresa { get;set;} 
	  ///<summary>
     ///ins_ccalle   
     ///</summary>
	 [DataMember]
     public string ins_ccalle { get;set;} 
	  ///<summary>
     ///ins_inumero   
     ///</summary>
	 [DataMember]
     public int ins_inumero { get;set;} 
	  ///<summary>
     ///ins_npiso   
     ///</summary>
	 [DataMember]
     public Decimal ins_npiso { get;set;} 
	  ///<summary>
     ///ins_cdepartamento   
     ///</summary>
	 [DataMember]
     public string ins_cdepartamento { get;set;} 
	  ///<summary>
     ///ins_ctelefono   
     ///</summary>
	 [DataMember]
     public string ins_ctelefono { get;set;}
     ///<summary>
     ///ins_cmail   
     ///</summary>
     [DataMember]
     public string ins_cmail { get; set; }
     ///<summary>
     ///ins_cDealer
     ///</summary>
     [DataMember]
     public string ins_cDealer { get; set; } 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Instaladores()
        {            
        }       
    }

    public class InstaladoresManager
    {
        public string ConnectionString { get; set; }

        public InstaladoresManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Instaladores> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_InstaladoresAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Instaladores();
                    Simple.ins_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.ins_cnombre = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.ins_cempresa = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
Simple.ins_ccalle = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
Simple.ins_inumero = (Reader.IsDBNull(4)) ? 0 : Reader.GetInt32(4);
Simple.ins_npiso = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
Simple.ins_cdepartamento = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
Simple.ins_ctelefono = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
Simple.ins_cmail = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
Simple.ins_cDealer = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);


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


																
