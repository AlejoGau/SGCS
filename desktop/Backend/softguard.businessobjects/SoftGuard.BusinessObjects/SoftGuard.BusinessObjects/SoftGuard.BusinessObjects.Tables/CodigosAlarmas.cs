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
    public class CodigosAlarmas
    {       
        ///<summary>
        ///cod_ccodigo
        ///</summary>
        [DataMember]
        public string Codigo { get; set; }
        ///<summary>
        ///cod_cdescripcion   
        ///</summary>
        [DataMember]
        public string Descripcion { get; set; }
        ///<summary>
        ///cod_nalerta   
        ///</summary>
        [DataMember]
        public decimal Alerta { get; set; }        
        ///<summary>
        ///cod_nprioridad   
        ///</summary>
        [DataMember]
        public decimal Prioridad { get; set; }     
        ///<summary>
        ///cod_ntipo   
        ///</summary>
        [DataMember]
        public decimal Tipo { get; set; }     
        ///<summary>
        ///cod_nsistema   
        ///</summary>
        [DataMember]
        public decimal Sistema { get; set; }     
        ///<summary>
        ///cod_ncolor   
        ///</summary>
        [DataMember]
        public int Color { get; set; }     
        ///<summary>
        ///cod_cSonido   
        ///</summary>
        [DataMember]
        public string Sonido { get; set; }     
        ///<summary>
        ///cod_nColorLetra   
        ///</summary>
        [DataMember]
        public int ColorLetra { get; set; }     
        ///<summary>
        ///cod_nResuelve   
        ///</summary>
        [DataMember]
        public decimal Resuelve { get; set; }     

        ///<summary>
        ///Falsa Constructor
        ///</summary>
        public CodigosAlarmas()
        {            
        }       
    }

    public class CodigosAlarmasManager
    {
        public string ConnectionString { get; set; }

        public CodigosAlarmasManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<CodigosAlarmas> GetAll()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("Tables_CodigosAlarmasAll", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    CodigosAlarmas C = new CodigosAlarmas();
                    C.Codigo = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    C.Descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    C.Alerta = Reader.IsDBNull(2) ? 0 : Reader.GetDecimal(2);
                    C.Prioridad = Reader.IsDBNull(3) ? 0 : Reader.GetDecimal(3);
                    C.Tipo = Reader.IsDBNull(4) ? 0 : Reader.GetDecimal(4);
                    C.Sistema = Reader.IsDBNull(5) ? 0 : Reader.GetDecimal(5);
                    C.Color = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
                    C.Sonido = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
                    C.ColorLetra = Reader.IsDBNull(8) ? 0 : Reader.GetInt32(8);
                    C.Resuelve = Reader.IsDBNull(9) ? 0 : Reader.GetDecimal(9);

                    yield return C;
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
