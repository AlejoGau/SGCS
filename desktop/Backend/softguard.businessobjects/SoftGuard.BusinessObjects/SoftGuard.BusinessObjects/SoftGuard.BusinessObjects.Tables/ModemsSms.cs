


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
    public class ModemsSms
    {       
        
		   
			 ///<summary>
     ///sms_icodigo   
     ///</summary>
	 [DataMember]
     public int sms_icodigo { get;set;} 
	  ///<summary>
     ///sms_cdescripcion   
     ///</summary>
	 [DataMember]
     public string sms_cdescripcion { get;set;} 
	  ///<summary>
     ///sms_nport   
     ///</summary>
	 [DataMember]
     public Decimal sms_nport { get;set;} 
	  ///<summary>
     ///sms_cseteo   
     ///</summary>
	 [DataMember]
     public string sms_cseteo { get;set;} 
	  ///<summary>
     ///sms_cinbox   
     ///</summary>
	 [DataMember]
     public string sms_cinbox { get;set;} 
	  ///<summary>
     ///sms_ndefault   
     ///</summary>
	 [DataMember]
     public Decimal sms_ndefault { get;set;} 
	  ///<summary>
     ///sms_cterminal   
     ///</summary>
	 [DataMember]
     public string sms_cterminal { get;set;} 
	  ///<summary>
     ///sms_csource   
     ///</summary>
	 [DataMember]
     public string sms_csource { get;set;} 
	  ///<summary>
     ///sms_csmppsystemid   
     ///</summary>
	 [DataMember]
     public string sms_csmppsystemid { get;set;} 
	  ///<summary>
     ///sms_csmpppassword   
     ///</summary>
	 [DataMember]
     public string sms_csmpppassword { get;set;} 
	  ///<summary>
     ///sms_csmpphostname   
     ///</summary>
	 [DataMember]
     public string sms_csmpphostname { get;set;} 
	  ///<summary>
     ///sms_nsmppport   
     ///</summary>
	 [DataMember]
     public Decimal sms_nsmppport { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public ModemsSms()
        {            
        }       
    }

    public class ModemsSmsManager
    {
        public string ConnectionString { get; set; }

        public ModemsSmsManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<ModemsSms> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_ModemsSmsAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new ModemsSms();
                    Simple.sms_icodigo = (Reader.IsDBNull(0)) ? 0 : Reader.GetInt32(0);
Simple.sms_cdescripcion = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.sms_nport = (Reader.IsDBNull(2)) ? new Decimal(0) : Reader.GetDecimal(2);
Simple.sms_cseteo = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
Simple.sms_cinbox = (Reader.IsDBNull(4)) ? "" : Reader.GetString(4);
Simple.sms_ndefault = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
Simple.sms_cterminal = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
Simple.sms_csource = (Reader.IsDBNull(7)) ? "" : Reader.GetString(7);
Simple.sms_csmppsystemid = (Reader.IsDBNull(8)) ? "" : Reader.GetString(8);
Simple.sms_csmpppassword = (Reader.IsDBNull(9)) ? "" : Reader.GetString(9);
Simple.sms_csmpphostname = (Reader.IsDBNull(10)) ? "" : Reader.GetString(10);
Simple.sms_nsmppport = (Reader.IsDBNull(11)) ? new Decimal(0) : Reader.GetDecimal(11);


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


																
