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
    public class Tipos
    {
        ///<summary>
        ///tip_ccodigo
        ///</summary>
        [DataMember]
        public string Codigo { get; set; }
        ///<summary>
        ///tip_cdescripcion   
        ///</summary>
        [DataMember]
        public string Descripcion { get; set; }
        ///<summary>
        ///tip_curlimagen   
        ///</summary>
        [DataMember]
        public string UrlImagen { get; set; }       
        ///<summary>
        ///tip_cservicio   
        ///</summary>
        [DataMember]
        public string Servicio { get; set; }     

        ///<summary>
        ///Falsa Constructor
        ///</summary>
        public Tipos()
        {            
        }       
    }

    public class TiposManager
    {
        public string ConnectionString { get; set; }

        public TiposManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<Tipos> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_TiposAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    Tipos T = new Tipos();
                    T.Codigo = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    T.Descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    T.UrlImagen = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    T.Servicio = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    yield return T;
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
