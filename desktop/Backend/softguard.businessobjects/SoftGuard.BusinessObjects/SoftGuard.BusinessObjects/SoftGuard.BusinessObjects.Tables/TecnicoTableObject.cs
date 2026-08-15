


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
    public class Tecnico
    {       
        
		   
			 ///<summary>
     ///tec_ccodigo   
     ///</summary>
	 [DataMember]
     public string tec_ccodigo { get;set;} 
	  ///<summary>
     ///tec_cnombre   
     ///</summary>
	 [DataMember]
     public string tec_cnombre { get;set;} 
	  ///<summary>
     ///tec_ctelefono   
     ///</summary>
	 [DataMember]
     public string tec_ctelefono { get;set;} 
	  ///<summary>
     ///tec_cmail   
     ///</summary>
	 [DataMember]
     public string tec_cmail { get;set;} 
	  ///<summary>
     ///tec_ningreso   
     ///</summary>
	 [DataMember]
     public Decimal tec_ningreso { get;set;} 
	  ///<summary>
     ///tec_negreso   
     ///</summary>
	 [DataMember]
     public Decimal tec_negreso { get;set;} 
	  ///<summary>
     ///tec_cobservaciones   
     ///</summary>
	 [DataMember]
     public string tec_cobservaciones { get;set;} 
	  ///<summary>
     ///tec_nestado   
     ///</summary>
	 [DataMember]
     public Decimal tec_nestado { get;set;} 
	 
	 

		
        ///<summary>
        /// Constructor
        ///</summary>
        public Tecnico()
        {            
        }       
    }

    public class TecnicoManager
    {
        public string ConnectionString { get; set; }

        public TecnicoManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Tecnico> GetAll(string tec_ccodigo = null,
            string tec_cnombre = null,
            string tec_ctelefono = null, 
            string tec_cmail = null,
            decimal tec_ningreso = 0,
            decimal tec_negreso = 0,
            string tec_cobservaciones = null,
            decimal tec_nestado = 0)
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_TecnicoAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
			
			Cmd.Parameters.Add(new SqlParameter("@tec_ccodigo", SqlDbType.NChar)).Value = tec_ccodigo;
            Cmd.Parameters.Add(new SqlParameter("@tec_cnombre", SqlDbType.NChar)).Value = tec_cnombre;
            Cmd.Parameters.Add(new SqlParameter("@tec_ctelefono", SqlDbType.NVarChar)).Value = tec_ctelefono;
            Cmd.Parameters.Add(new SqlParameter("@tec_cmail", SqlDbType.NVarChar)).Value = tec_cmail;
            Cmd.Parameters.Add(new SqlParameter("@tec_ningreso", SqlDbType.Decimal)).Value = tec_ningreso;
            Cmd.Parameters.Add(new SqlParameter("@tec_negreso", SqlDbType.Decimal)).Value = tec_negreso;
            Cmd.Parameters.Add(new SqlParameter("@tec_cobservaciones", SqlDbType.NText)).Value = tec_cobservaciones;
            Cmd.Parameters.Add(new SqlParameter("@tec_nestado", SqlDbType.Decimal)).Value = tec_nestado;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    var Simple = new Tecnico();
                    Simple.tec_ccodigo = (Reader.IsDBNull(0)) ? "" : Reader.GetString(0);
Simple.tec_cnombre = (Reader.IsDBNull(1)) ? "" : Reader.GetString(1);
Simple.tec_ctelefono = (Reader.IsDBNull(2)) ? "" : Reader.GetString(2);
Simple.tec_cmail = (Reader.IsDBNull(3)) ? "" : Reader.GetString(3);
Simple.tec_ningreso = (Reader.IsDBNull(4)) ? new Decimal(0) : Reader.GetDecimal(4);
Simple.tec_negreso = (Reader.IsDBNull(5)) ? new Decimal(0) : Reader.GetDecimal(5);
Simple.tec_cobservaciones = (Reader.IsDBNull(6)) ? "" : Reader.GetString(6);
Simple.tec_nestado = (Reader.IsDBNull(7)) ? new Decimal(0) : Reader.GetDecimal(7);


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


																
