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
    public class Provincias
    {
        ///<summary>
        ///pro_ccodigo
        ///</summary>
        [DataMember]
        public string Codigo { get; set; }
        ///<summary>
        ///pro_cdescripcion   
        ///</summary>
        [DataMember]
        public string Descripcion { get; set; }
        ///<summary>
        ///pro_cletra   
        ///</summary>
        [DataMember]
        public string Letra { get; set; }        

        ///<summary>
        ///Falsa Constructor
        ///</summary>
        public Provincias()
        {            
        }       
    }

    public class ProvinciasManager
    {
        public string ConnectionString { get; set; }

        public ProvinciasManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Provincias> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_ProvinciasAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    Provincias P = new Provincias();
                    P.Codigo = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    P.Descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    P.Letra = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    
                    yield return P;
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
