using System;
using System.Configuration;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Data;
using System.Reflection;
using System.Globalization;
using Slbf;
using System.Runtime.Serialization;
using Slbf.Helpers;
using SoftGuard.BusinessObjects.Tables;
using SoftGuard.BusinessObjects.Reports;

namespace SoftGuard.EnterpriseServices.Rest
{
    // Start the service and browse objectTo http://<machine_name>:<port>/Metadata/help objectTo view the service's generated help page
    // NOTE: By default, a new instance of the service is created for each call; change the InstanceContextMode objectTo Single if you want
    // a single instance of the service objectTo process all calls.	

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    //[XmlSerializerFormat()]
    [DataContractFormat] // for JSON
    [ServiceKnownType("GetKnownTypes")]
    public class WebManagerRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>()
            {
                typeof(AlertasGeoreferenciadas),
                typeof(AnalisisIPR),
                typeof(AnalisisPG),
                typeof(CategorizacionDeAlarmas),
                typeof(CategorizacionDeEventos),
                typeof(EstadoDeCuenta),
                typeof(EventosAutoprocesados),
                typeof(EventosPorDiaPorOperador),
                typeof(EventosDeEmergenciaUltimos10Dias),
                typeof(EventosDeEmergenciaUltimos2Meses),
                typeof(EventosEnEsperaPorPrioridad),
                typeof(EventosPendientesPorPrioridad),
                typeof(EventosRecibidos),
                typeof(EventosRecibidos30Dias),
                typeof(EventosPorTipoDelDia),
                typeof(ProcesamientosPorTerminal),
                typeof(ProcesoEventosActuales),
                typeof(ResolucionDeEventos),
                typeof(UltimosEventos),
                typeof(CuentasGeoreferenciadas),
                typeof(EvolucionCuentas),
                typeof(EvolucionCuentas12Meses)                
            };            
        }


        [WebGet(UriTemplate = "AlertasGeoreferenciadas", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<AlertasGeoreferenciadas> GetAlertasGeoreferenciadas()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetAlertasGeoreferenciadas();            
        }
        [WebGet(UriTemplate = "AnalisisIPR30Dias", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<AnalisisIPR> GetAnalisisIPR30Dias()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetAnalisisIPR30Dias();
        }
        [WebGet(UriTemplate = "AnalisisIPRHoy", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<AnalisisIPR> GetAnalisisIPRHoy()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetAnalisisIPRHoy();
        }
        [WebGet(UriTemplate = "AnalisisPG30Dias", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<AnalisisPG> GetAnalisisPG30Dias()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetAnalisisPG30Dias();
        }
        [WebGet(UriTemplate = "AnalisisPGHoy", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<AnalisisPG> GetAnalisisPGHoy()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetAnalisisPGHoy();
        }
        [WebGet(UriTemplate = "CategorizacionDeAlarmas", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<CategorizacionDeAlarmas> GetCategorizacionDeAlarmas()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetCategorizacionDeAlarmas();
        }
        [WebGet(UriTemplate = "CategorizacionDeEventos", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<CategorizacionDeEventos> GetCategorizacionDeEventos()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetCategorizacionDeEventos();
        }
        [WebGet(UriTemplate = "EstadoDeCuenta", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EstadoDeCuenta> GetEstadoDeCuenta()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEstadoDeCuenta();
        }
        [WebGet(UriTemplate = "EventosAutoprocesados", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosAutoprocesados> GetEventosAutoprocesados()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosAutoprocesados();
        }
        [WebGet(UriTemplate = "EventosPorDiaPorOperador", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosPorDiaPorOperador> GetEventosPorDiaPorOperador()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosPorDiaPorOperador();
        }
        [WebGet(UriTemplate = "EventosDeEmergenciaUltimos10Dias", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosDeEmergenciaUltimos10Dias> GetEventosDeEmergenciaUltimos10Dias()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosDeEmergenciaUltimos10Dias();
        }
        [WebGet(UriTemplate = "EventosDeEmergenciaUltimos2Meses", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosDeEmergenciaUltimos2Meses> GetEventosDeEmergenciaUltimos2Meses()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosDeEmergenciaUltimos2Meses();
        }
        [WebGet(UriTemplate = "EventosEnEsperaPorPrioridad", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosEnEsperaPorPrioridad> GetEventosEnEsperaPorPrioridad()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosEnEsperaPorPrioridad();
        }
        [WebGet(UriTemplate = "EventosPendientesPorPrioridad", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosPendientesPorPrioridad> GetEventosPendientesPorPrioridad()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosPendientesPorPrioridad();
        }
        [WebGet(UriTemplate = "EventosRecibidos", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosRecibidos> GetEventosRecibidos()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosRecibidos();
        }
        [WebGet(UriTemplate = "EventosRecibidos30Dias", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosRecibidos30Dias> GetEventosRecibidos30Dias()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosRecibidos30Dias();
        }
        [WebGet(UriTemplate = "EventosPorTipoDelDia", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EventosPorTipoDelDia> GetEventosPorTipoDelDia()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEventosPorTipoDelDia();
        }
        [WebGet(UriTemplate = "ProcesamientosPorTerminal", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<ProcesamientosPorTerminal> GetProcesamientosPorTerminal()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetProcesamientosPorTerminal();
        }
        [WebGet(UriTemplate = "ProcesoEventosActuales", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<ProcesoEventosActuales> GetProcesoEventosActuales()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetProcesoEventosActuales();
        }
        [WebGet(UriTemplate = "ResolucionDeEventosPorDia", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<ResolucionDeEventos> GetResolucionDeEventosPorDia()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetResolucionDeEventosPorDia();
        }
        [WebGet(UriTemplate = "ResolucionDeEventosPorMes", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<ResolucionDeEventos> GetResolucionDeEventosPorMes()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetResolucionDeEventosPorMes();
        }
        [WebGet(UriTemplate = "Ultimos25Eventos", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<UltimosEventos> GetUltimos25Eventos()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetUltimos25Eventos();
        }
        [WebGet(UriTemplate = "Ultimos25EventosAlertas", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<UltimosEventos> GetUltimos25EventosAlertas()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetUltimos25EventosAlertas();
        }
        [WebGet(UriTemplate = "CuentasGeoreferenciadas", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<CuentasGeoreferenciadas> GetCuentasGeoreferenciadas()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetCuentasGeoreferenciadas();
        }
        [WebGet(UriTemplate = "EvolucionCuentas30Dias", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EvolucionCuentas> GetEvolucionCuentas30Dias()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEvolucionCuentas30Dias();
        }
        [WebGet(UriTemplate = "EvolucionCuentas60Dias", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EvolucionCuentas> GetEvolucionCuentas60Dias()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEvolucionCuentas60Dias();
        }
        [WebGet(UriTemplate = "EvolucionCuentas12Meses", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<EvolucionCuentas12Meses> GetEvolucionCuentas12Meses()
        {
            WebManagerManager Manager = new WebManagerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            return Manager.GetEvolucionCuentas12Meses();
        }
    }


    
}
																
