using System;
using System.Xml;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Serialization;

namespace SoftGuard.BusinessObjects.Reports
{
    [DataContract]
    public class ReporteHistorico
    {       
        [DataMember]
        public int rec_iid { get; set; }

        [DataMember]
        public int rec_iidcuenta { get; set; }

        [DataMember]
        public string rec_calarma { get; set; }

        [DataMember]
        public string rec_czona { get; set; }

        [DataMember]
        public int rec_iusuario { get; set; }

        [DataMember]
        public DateTime rec_tfechahora { get; set; }

        [DataMember]
        public decimal rec_nestado { get; set; }

        [DataMember]
        public string rec_cContenido { get; set; }

        [DataMember]
        public DateTime rec_tFechaProceso { get; set; }

        [DataMember]
        public int rec_ioperador { get; set; }

        [DataMember]
        public string rec_cObservaciones { get; set; }

        [DataMember]
        public string rec_cTerminal { get; set; }

        [DataMember]
        public string rec_idResolucion { get; set; }

        [DataMember]
        public int rec_idReceptor { get; set; }

        [DataMember]
        public string rec_cCategorizacion { get; set; }

        [DataMember]
        public int rec_iNYR { get; set; }

        [DataMember]
        public int rec_iTE { get; set; }

        [DataMember]
        public DateTime rec_tFechaRecepcion { get; set; }

        [DataMember]
        public decimal rec_nOrigen { get; set; }

        [DataMember]
        public int rec_idMap { get; set; }

        [DataMember]
        public int rec_idFwd { get; set; }

        [DataMember]
        public int rec_iMinutosEspera { get; set; }

        [DataMember]
        public int rec_iPuerto { get; set; }

        [DataMember]
        public int rec_idLoc { get; set; }

        [DataMember]
        public decimal cod_nPrioridad { get; set; }

        [DataMember]
        public string cod_cDescripcion { get; set; }

        [DataMember]
        public int cod_nColor { get; set; }

        [DataMember]
        public int cod_nColorLetra { get; set; }

        [DataMember]
        public string zon_cDescripcion { get; set; }

        [DataMember]
        public string usu_cNombre { get; set; }

        [DataMember]
        public bool tiene_notificaciones { get; set; }

        [DataMember]
        public string cue_cLinea { get; set; }

        [DataMember]
        public string cue_nCuenta { get; set; }

        [DataMember]
        public string cue_cNombre { get; set; }
         
        public ReporteHistorico()
        {            
        }       
    }

    public class RecepcionManager
    {
        public string ConnectionString { get; set; }

        public RecepcionManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<ReporteHistorico> GetReporteHistorico(string Cuentas, string CodigosAlarmaExcluir = "", DateTime? FechaDesde = null, DateTime? FechaHasta = null, string Estados = "", string Alertas = "", string Tipos = "", int Mostrar = 0, string OrdenarFecha = "ASC")
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand("ReporteHistorico", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Cuentas", Cuentas);
            Cmd.Parameters.AddWithValue("@CodigosAlarmaExcluir", CodigosAlarmaExcluir);
            Cmd.Parameters.AddWithValue("@FechaDesde", (FechaDesde == new DateTime(1,1,1)) ? (object)DBNull.Value : (object)FechaDesde);
            Cmd.Parameters.AddWithValue("@FechaHasta", (FechaHasta == new DateTime(1,1,1)) ? (object)DBNull.Value : (object)FechaHasta);
            Cmd.Parameters.AddWithValue("@Estados", Estados);
            Cmd.Parameters.AddWithValue("@Alertas", Alertas);
            Cmd.Parameters.AddWithValue("@Tipos", Tipos);
            Cmd.Parameters.AddWithValue("@Mostrar", Mostrar);
            Cmd.Parameters.AddWithValue("@OrdenarFecha", OrdenarFecha);

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    ReporteHistorico C = new ReporteHistorico();
                    C.rec_iid = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    C.rec_iidcuenta = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                    C.rec_calarma = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    C.rec_czona = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    C.rec_iusuario = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
                    C.rec_tfechahora = Reader.IsDBNull(5) ? new DateTime(1,1,1) : Reader.GetDateTime(5);
                    C.rec_nestado = Reader.IsDBNull(6) ? 0 : Reader.GetDecimal(6);
                    C.rec_cContenido = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
                    C.rec_tFechaProceso = Reader.IsDBNull(8) ? new DateTime(1, 1, 1) : Reader.GetDateTime(8);
                    C.rec_ioperador = Reader.IsDBNull(9) ? 0 : Reader.GetInt32(9);
                    C.rec_cObservaciones = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
                    C.rec_cTerminal = Reader.IsDBNull(11) ? "" : Reader.GetString(11);
                    C.rec_idResolucion = Reader.IsDBNull(12) ? "" : Reader.GetString(12);
                    C.rec_idReceptor = Reader.IsDBNull(13) ? 0 : Reader.GetInt32(13);
                    C.rec_cCategorizacion = Reader.IsDBNull(14) ? "" : Reader.GetString(14);
                    C.rec_iNYR = Reader.IsDBNull(15) ? 0 : Reader.GetInt32(15);
                    C.rec_iTE = Reader.IsDBNull(16) ? 0 : Reader.GetInt32(16);
                    C.rec_tFechaRecepcion = Reader.IsDBNull(17) ? new DateTime(1, 1, 1) : Reader.GetDateTime(17);
                    C.rec_nOrigen = Reader.IsDBNull(18) ? 0 : Reader.GetDecimal(18);
                    C.rec_idMap = Reader.IsDBNull(19) ? 0 : Reader.GetInt32(19);
                    C.rec_idFwd = Reader.IsDBNull(20) ? 0 : Reader.GetInt32(20);
                    C.rec_iMinutosEspera = Reader.IsDBNull(21) ? 0 : Reader.GetInt16(21);
                    C.rec_iPuerto = Reader.IsDBNull(22) ? 0 : Reader.GetInt16(22);
                    C.rec_idLoc = Reader.IsDBNull(23) ? 0 : Reader.GetInt32(23);
                    C.cod_nPrioridad = Reader.IsDBNull(24) ? 0 : Reader.GetDecimal(24);
                    C.cod_cDescripcion = Reader.IsDBNull(25) ? "" : Reader.GetString(25);
                    C.cod_nColor = Reader.IsDBNull(26) ? 0 : Reader.GetInt32(26);
                    C.cod_nColorLetra = Reader.IsDBNull(27) ? 0 : Reader.GetInt32(27);
                    C.zon_cDescripcion = Reader.IsDBNull(28) ? "" : Reader.GetString(28);
                    C.usu_cNombre = Reader.IsDBNull(29) ? "" : Reader.GetString(29);
                    C.tiene_notificaciones = Reader.IsDBNull(30) ? false : Reader.GetBoolean(30);
                    C.cue_cLinea = Reader.IsDBNull(31) ? "" : Reader.GetString(31);
                    C.cue_nCuenta = Reader.IsDBNull(32) ? "" : Reader.GetString(32);
                    C.cue_cNombre = Reader.IsDBNull(33) ? "" : Reader.GetString(33);

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
