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
    public class AlertasGeoreferenciadas
    {       
        [DataMember]
        public string cue_ncuenta { get; set; }

        [DataMember]
        public string cue_cNombre { get; set; }

        [DataMember]
        public string cue_cCalle { get; set; }

        [DataMember]
        public string cue_cLatLng { get; set; }

        [DataMember]
        public string cod_cdescripcion { get; set; }

        [DataMember]
        public string color_fondo { get; set; }

        [DataMember]
        public string cue_clinea { get; set; }

        [DataMember]
        public string rec_nestado { get; set; }

        [DataMember]
        public string cue_provincia { get; set; }

        [DataMember]
        public string cue_localidad { get; set; }

        [DataMember]
        public string cue_pais { get; set; }

        [DataMember]
        public string cue_codigo_postal { get; set; }

        public AlertasGeoreferenciadas()
        {            
        }       
    }

    [DataContract]
    public class AnalisisIPR
    {        
        [DataMember]
        public int puerto { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string descripcion { get; set; }

        public AnalisisIPR()
        {
        }
    }

    [DataContract]
    public class AnalisisPG
    {
        [DataMember]
        public int puerto { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string descripcion { get; set; }

        public AnalisisPG()
        {
        }
    }

    [DataContract]
    public class CategorizacionDeAlarmas
    {
        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        public CategorizacionDeAlarmas()
        {
        }
    }

    [DataContract]
    public class CategorizacionDeEventos
    {
        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        public CategorizacionDeEventos()
        {
        }
    }

     [DataContract]
    public class EstadoDeCuenta
    {
        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string situacion { get; set; }

        public EstadoDeCuenta()
        {
        }
    }

    [DataContract]
    public class EventosAutoprocesados
    {
        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string situacion { get; set; }

        public EventosAutoprocesados()
        {
        }
    }

    [DataContract]
    public class EventosPorDiaPorOperador
    {
        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        public EventosPorDiaPorOperador()
        {
        }
    }

    [DataContract]
    public class EventosDeEmergenciaUltimos10Dias
    {
        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string dia { get; set; }

        public EventosDeEmergenciaUltimos10Dias()
        {
        }
    }
    
    [DataContract]
    public class EventosDeEmergenciaUltimos2Meses
    {
        [DataMember]
        public int mes { get; set; }

        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        public EventosDeEmergenciaUltimos2Meses()
        {
        }
    }
    
    [DataContract]
    public class EventosEnEsperaPorPrioridad
    {
        [DataMember]
        public DateTime fecha { get; set; }

        [DataMember]
        public int nPrioridad { get; set; }

        public EventosEnEsperaPorPrioridad()
        {
        }
    }

    [DataContract]
    public class EventosPendientesPorPrioridad
    {
        [DataMember]
        public DateTime fecha { get; set; }

        [DataMember]
        public int nPrioridad { get; set; }

        public EventosPendientesPorPrioridad()
        {
        }
    }

    [DataContract]
    public class EventosRecibidos
    {
        [DataMember]
        public int puerto { get; set; }

        [DataMember]
        public string nOrigen { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string hora { get; set; }

        public EventosRecibidos()
        {
        }
    }    

     [DataContract]
    public class EventosRecibidos30Dias
    {
        [DataMember]
        public int puerto { get; set; }

        [DataMember]
        public string nOrigen { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string nFecha { get; set; }

        public EventosRecibidos30Dias()
        {
        }
    }

    [DataContract]
    public class EventosPorTipoDelDia
    {
        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string tipo { get; set; }

        public EventosPorTipoDelDia()
        {
        }
    }

    [DataContract]
    public class ProcesamientosPorTerminal
    {
        [DataMember]
        public string rec_cTerminal { get; set; }
         
        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public int nHora { get; set; }

        public ProcesamientosPorTerminal()
        {
        }
    }

    [DataContract]
    public class ProcesoEventosActuales
    {        
        [DataMember]
        public int nCantidad { get; set; }

        [DataMember]
        public string situacion { get; set; }

        public ProcesoEventosActuales()
        {
        }
    }

    [DataContract]
    public class ResolucionDeEventos
    {        
        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int nCantidad { get; set; }

        public ResolucionDeEventos()
        {
        }
    }
   
    [DataContract]
    public class UltimosEventos
    {        
        [DataMember]
        public string fecha { get; set; }

        [DataMember]
        public string hora { get; set; }

        [DataMember]
        public string cod_ccodigo { get; set; }

        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int color_fondo { get; set; }

        [DataMember]
        public int color_letra { get; set; }

        [DataMember]
        public int cod_nColorLetra { get; set; }

        [DataMember]
        public string cue_clinea { get; set; }

        [DataMember]
        public string cue_ncuenta { get; set; }

        [DataMember]
        public string cue_cnombre { get; set; }

        [DataMember]
        public string rec_calarma { get; set; }

        [DataMember]
        public decimal rec_nestado { get; set; }

        public UltimosEventos()
        {
        }
    }

    [DataContract]
    public class CuentasGeoreferenciadas
    {
        [DataMember]
        public string cue_clinea { get; set; }

        [DataMember]
        public string cue_ncuenta { get; set; }

        [DataMember]
        public string cue_cNombre { get; set; }

        [DataMember]
        public string cue_cCalle { get; set; }

        [DataMember]
        public string cue_cLatLng { get; set; }

        [DataMember]
        public string cue_provincia { get; set; }

        [DataMember]
        public string cue_localidad { get; set; }

        [DataMember]
        public string cue_pais { get; set; }

        [DataMember]
        public string cue_codigo_postal { get; set; }

        public CuentasGeoreferenciadas()
        {
        }
    }

    [DataContract]
    public class EvolucionCuentas
    {
        [DataMember]
        public DateTime fecha { get; set; }

        [DataMember]
        public string descripcion { get; set; }

        [DataMember]
        public int cantidad { get; set; }

        [DataMember]
        public string fecha_format { get; set; }
        
        public EvolucionCuentas()
        {
        }
    }

    [DataContract]
    public class EvolucionCuentas12Meses
    {
        [DataMember]
        public int cantidad { get; set; }

        [DataMember]
        public int mes { get; set; }

        [DataMember]
        public int ano { get; set; }

        public EvolucionCuentas12Meses()
        {
        }
    }

    

    public class WebManagerManager
    {
        public string ConnectionString { get; set; }

        public WebManagerManager(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
        }

        public IEnumerable<AlertasGeoreferenciadas> GetAlertasGeoreferenciadas()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_AlertasGeoreferenciadas", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;            

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    AlertasGeoreferenciadas o = new AlertasGeoreferenciadas();
                    o.cue_ncuenta = Reader.IsDBNull(0) ? "" : Reader.GetString(0).Trim();
                    o.cue_cNombre = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    o.cue_cCalle = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    o.cue_cLatLng = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    o.cod_cdescripcion = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
                    o.color_fondo = Reader.IsDBNull(5) ? "" : Reader.GetValue(5).ToString().Trim();                    
                    o.cue_clinea = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
                    o.rec_nestado = Reader.IsDBNull(7) ? "" : Reader.GetValue(7).ToString().Trim();                    
                    o.cue_provincia = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
                    o.cue_localidad = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
                    o.cue_pais = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
                    o.cue_codigo_postal = Reader.IsDBNull(11) ? "" : Reader.GetString(11);     

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<AnalisisIPR> GetAnalisisIPR30Dias()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_AnalisisIPR30Dias", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    AnalisisIPR o = new AnalisisIPR();
                    o.puerto = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                    o.descripcion = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                  
                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<AnalisisIPR> GetAnalisisIPRHoy()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_AnalisisIPRHoy", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    AnalisisIPR o = new AnalisisIPR();
                    o.puerto = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                    o.descripcion = Reader.IsDBNull(2) ? "" : Reader.GetString(2);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<AnalisisPG> GetAnalisisPG30Dias()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_AnalisisPG30Dias", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    AnalisisPG o = new AnalisisPG();
                    o.puerto = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                    o.descripcion = Reader.IsDBNull(2) ? "" : Reader.GetString(2);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<AnalisisPG> GetAnalisisPGHoy()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_AnalisisIPRHoy", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    AnalisisPG o = new AnalisisPG();
                    o.puerto = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                    o.descripcion = Reader.IsDBNull(2) ? "" : Reader.GetString(2);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<CategorizacionDeAlarmas> GetCategorizacionDeAlarmas()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_CategorizacionDeAlarmas", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    CategorizacionDeAlarmas o = new CategorizacionDeAlarmas();
                    o.descripcion = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);                    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<CategorizacionDeEventos> GetCategorizacionDeEventos()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_CategorizacionDeEventos", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    CategorizacionDeEventos o = new CategorizacionDeEventos();
                    o.descripcion = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EstadoDeCuenta> GetEstadoDeCuenta()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EstadoDeCuenta", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EstadoDeCuenta o = new EstadoDeCuenta();                    
                    o.nCantidad = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.situacion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosAutoprocesados> GetEventosAutoprocesados()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosAutoprocesados", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosAutoprocesados o = new EventosAutoprocesados();                    
                    o.nCantidad = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.situacion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosPorDiaPorOperador> GetEventosPorDiaPorOperador()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosPorDiaPorOperador", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosPorDiaPorOperador o = new EventosPorDiaPorOperador();                    
                    o.descripcion = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);                    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosDeEmergenciaUltimos10Dias> GetEventosDeEmergenciaUltimos10Dias()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosDeEmergenciaUltimos10Dias", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosDeEmergenciaUltimos10Dias o = new EventosDeEmergenciaUltimos10Dias();                    
                    o.descripcion = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);                    
                    o.dia = Reader.IsDBNull(2) ? "" : Reader.GetString(2);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosDeEmergenciaUltimos2Meses> GetEventosDeEmergenciaUltimos2Meses()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosDeEmergenciaUltimos2Meses", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosDeEmergenciaUltimos2Meses o = new EventosDeEmergenciaUltimos2Meses();                    
                    o.mes = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    o.nCantidad = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);                    
                    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosEnEsperaPorPrioridad> GetEventosEnEsperaPorPrioridad()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosEnEsperaPorPrioridad", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosEnEsperaPorPrioridad o = new EventosEnEsperaPorPrioridad();                    
                    o.fecha = Reader.IsDBNull(0) ? new DateTime(1,1,1) : Reader.GetDateTime(0);
                    o.nPrioridad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);                                                            

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosPendientesPorPrioridad> GetEventosPendientesPorPrioridad()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosPendientesPorPrioridad", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosPendientesPorPrioridad o = new EventosPendientesPorPrioridad();                    
                    o.fecha = Reader.IsDBNull(0) ? new DateTime(1,1,1) : Reader.GetDateTime(0);
                    o.nPrioridad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);                                                            

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosRecibidos> GetEventosRecibidos()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosRecibidos", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosRecibidos o = new EventosRecibidos();                    
                    o.puerto = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.nOrigen = Reader.IsDBNull(1) ? "" : Reader.GetString(1);                                                            
                    o.nCantidad = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);   
                    o.hora = Reader.IsDBNull(3) ? "" : Reader.GetString(3);   

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosRecibidos30Dias> GetEventosRecibidos30Dias()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosRecibidos30Dias", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosRecibidos30Dias o = new EventosRecibidos30Dias();                    
                    o.puerto = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.nOrigen = Reader.IsDBNull(1) ? "" : Reader.GetString(1);                                                            
                    o.nCantidad = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);                       
                    o.nFecha = Reader.IsDBNull(3) ? "" : Reader.GetString(3);                                                            

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EventosPorTipoDelDia> GetEventosPorTipoDelDia()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EventosPorTipoDelDia", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EventosPorTipoDelDia o = new EventosPorTipoDelDia();                    
                    o.nCantidad = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);                       
                    o.tipo = Reader.IsDBNull(1) ? "" : Reader.GetString(1);                                                            

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<ProcesamientosPorTerminal> GetProcesamientosPorTerminal()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_ProcesamientosPorTerminal", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    ProcesamientosPorTerminal o = new ProcesamientosPorTerminal();                    
                    o.rec_cTerminal = Reader.IsDBNull(0) ? "" : Reader.GetString(0);                       
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                    o.nHora = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<ProcesoEventosActuales> GetProcesoEventosActuales()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_ProcesoEventosActuales", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    ProcesoEventosActuales o = new ProcesoEventosActuales();                                        
                    o.nCantidad = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.situacion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<ResolucionDeEventos> GetResolucionDeEventosPorDia()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_ResolucionDeEventosPorDia", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    ResolucionDeEventos o = new ResolucionDeEventos();                                        
                    o.descripcion = Reader.IsDBNull(0) ? "" : Reader.GetString(0);    
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);                    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<ResolucionDeEventos> GetResolucionDeEventosPorMes()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_ResolucionDeEventosPorMes", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    ResolucionDeEventos o = new ResolucionDeEventos();                                        
                    o.descripcion = Reader.IsDBNull(0) ? "" : Reader.GetString(0);    
                    o.nCantidad = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);                    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<UltimosEventos> GetUltimos25Eventos()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_Ultimos25Eventos", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    UltimosEventos o = new UltimosEventos();                                        
                    o.fecha = Reader.IsDBNull(0) ? "" : Reader.GetString(0);    
                    o.hora = Reader.IsDBNull(1) ? "" : Reader.GetString(1);                    
                    o.cod_ccodigo = Reader.IsDBNull(2) ? "" : Reader.GetString(2);                    
                    o.descripcion = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    o.color_fondo = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
                    o.color_letra = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
                    o.cod_nColorLetra = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
                    o.cue_clinea = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
                    o.cue_ncuenta = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
                    o.cue_cnombre = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
                    o.rec_calarma = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
                    o.rec_nestado = Reader.IsDBNull(11) ? 0 : Reader.GetDecimal(11);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<UltimosEventos> GetUltimos25EventosAlertas()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_Ultimos25EventosAlertas", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    UltimosEventos o = new UltimosEventos();                                        
                    o.fecha = Reader.IsDBNull(0) ? "" : Reader.GetString(0);    
                    o.hora = Reader.IsDBNull(1) ? "" : Reader.GetString(1);                    
                    o.cod_ccodigo = Reader.IsDBNull(2) ? "" : Reader.GetString(2);                    
                    o.descripcion = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    o.color_fondo = Reader.IsDBNull(4) ? 0 : Reader.GetInt32(4);
                    o.color_letra = Reader.IsDBNull(5) ? 0 : Reader.GetInt32(5);
                    o.cod_nColorLetra = Reader.IsDBNull(6) ? 0 : Reader.GetInt32(6);
                    o.cue_clinea = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
                    o.cue_ncuenta = Reader.IsDBNull(8) ? "" : Reader.GetString(8);
                    o.cue_cnombre = Reader.IsDBNull(9) ? "" : Reader.GetString(9);
                    o.rec_calarma = Reader.IsDBNull(10) ? "" : Reader.GetString(10);
                    o.rec_nestado = Reader.IsDBNull(11) ? 0 : Reader.GetDecimal(11);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<CuentasGeoreferenciadas> GetCuentasGeoreferenciadas()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_CuentasGeoreferenciadas", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    CuentasGeoreferenciadas o = new CuentasGeoreferenciadas();
                    o.cue_clinea = Reader.IsDBNull(0) ? "" : Reader.GetString(0);
                    o.cue_ncuenta = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    o.cue_cNombre = Reader.IsDBNull(2) ? "" : Reader.GetString(2);
                    o.cue_cCalle = Reader.IsDBNull(3) ? "" : Reader.GetString(3);
                    o.cue_cLatLng = Reader.IsDBNull(4) ? "" : Reader.GetString(4);
                    o.cue_provincia = Reader.IsDBNull(5) ? "" : Reader.GetString(5);
                    o.cue_localidad = Reader.IsDBNull(6) ? "" : Reader.GetString(6);
                    o.cue_pais = Reader.IsDBNull(7) ? "" : Reader.GetString(7);
                    o.cue_codigo_postal = Reader.IsDBNull(8) ? "" : Reader.GetString(8);     

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EvolucionCuentas> GetEvolucionCuentas30Dias()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EvolucionCuentas30Dias", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EvolucionCuentas o = new EvolucionCuentas();
                    o.fecha = Reader.IsDBNull(0) ? new DateTime(1,1,1) : Reader.GetDateTime(0);
                    o.descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    o.cantidad = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
                    o.fecha_format = Reader.IsDBNull(3) ? "" : Reader.GetString(3);                    

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EvolucionCuentas> GetEvolucionCuentas60Dias()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EvolucionCuentas60Dias", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EvolucionCuentas o = new EvolucionCuentas();
                    o.fecha = Reader.IsDBNull(0) ? new DateTime(1, 1, 1) : Reader.GetDateTime(0);
                    o.descripcion = Reader.IsDBNull(1) ? "" : Reader.GetString(1);
                    o.cantidad = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);
                    o.fecha_format = Reader.IsDBNull(3) ? "" : Reader.GetString(3);

                    yield return o;
                }
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }
        }
        public IEnumerable<EvolucionCuentas12Meses> GetEvolucionCuentas12Meses()
        {
            if (this.ConnectionString.Length == 0)
                throw new Exception("Connection String not defined");

            SqlConnection Conn = new SqlConnection(this.ConnectionString);
            SqlCommand Cmd = new SqlCommand(@"WebManager_EvolucionCuentas12Meses", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;

            try
            {
                Conn.Open();
                SqlDataReader Reader = Cmd.ExecuteReader();
                while (Reader.Read())
                {
                    EvolucionCuentas12Meses o = new EvolucionCuentas12Meses();
                    o.cantidad = Reader.IsDBNull(0) ? 0 : Reader.GetInt32(0);
                    o.mes = Reader.IsDBNull(1) ? 0 : Reader.GetInt32(1);
                    o.ano = Reader.IsDBNull(2) ? 0 : Reader.GetInt32(2);

                    yield return o;
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
