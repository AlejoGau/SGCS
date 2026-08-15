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
    public class EventosFeriados
    {       
        ///<summary>
        ///eve_ccodigo
        ///</summary>
        [DataMember]
        public string Codigo { get; set; }
        ///<summary>
        ///eve_cdescripcion   
        ///</summary>
        [DataMember]
        public string Descripcion { get; set; }
        ///<summary>
        ///eve_dfechadesdes   
        ///</summary>
        [DataMember]
        public DateTime FechaDesde { get; set; }        
        ///<summary>
        ///eve_choradesde   
        ///</summary>
        [DataMember]
        public string HoraDesde { get; set; }     
        ///<summary>
        ///eve_dfechahasta   
        ///</summary>
        [DataMember]
        public DateTime FechaHasta { get; set; }     
        ///<summary>
        ///eve_chorahasta   
        ///</summary>
        [DataMember]
        public string HoraHasta { get; set; }       

        ///<summary>
        ///Falsa Constructor
        ///</summary>
        public EventosFeriados()
        {            
        }       
    }

    public class EventosFeriadosManager
    {
        public string ConnectionString { get; set; }

        public EventosFeriadosManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<EventosFeriados> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_EventosFeriadosAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {                    
                    EventosFeriados E = new EventosFeriados();
                    E.Codigo = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    E.Descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    E.FechaDesde = Reader.IsDBNull(2) ? new DateTime(1,1,1) : Reader.GetDateTime(2);
                    E.HoraDesde = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    E.FechaHasta = Reader.IsDBNull(4) ? new DateTime(1,1,1) : Reader.GetDateTime(4);
                    E.HoraHasta = Reader.IsDBNull(5) ? "" : Reader.GetString(5);                    

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
