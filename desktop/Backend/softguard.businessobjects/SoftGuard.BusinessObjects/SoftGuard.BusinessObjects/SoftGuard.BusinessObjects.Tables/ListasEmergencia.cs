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
    public class ListasEmergencia
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
        ///Falsa Constructor
        ///</summary>
        public ListasEmergencia()
        {            
        }       
    }

    public class ListasEmergenciaManager
    {
        public string ConnectionString { get; set; }

        public ListasEmergenciaManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<ListasEmergencia> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_ListasEmergenciaAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    ListasEmergencia E = new ListasEmergencia();
                    E.Codigo = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    E.Descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    //E.Prioridad = Reader.IsDBNull(2) ? 0 : Reader.GetDecimal(2);

                    yield return E;
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
