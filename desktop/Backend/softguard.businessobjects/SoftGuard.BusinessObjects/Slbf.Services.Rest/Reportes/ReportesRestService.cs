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
    public class ReportesRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>()
            {
                typeof(ReporteHistorico)
            };            
        }


        [WebGet(UriTemplate = "ReporteHistorico?Cuentas={Cuentas}&CodigosAlarmaExcluir={codigosAlarmaExcluir}&FechaDesde={fechaDesde}&FechaHasta={FechaHasta}&Estados={estados}&Alertas={alertas}&Tipos={tipos}&Mostrar={mostrar}&OrdenarFecha={ordenarFecha}")]
        public ReporteHistorico[] GetReporteHistorico(string Cuentas, string codigosAlarmaExcluir, string fechaDesde, string fechaHasta, string estados, string alertas, string tipos, string mostrar, string ordenarFecha)
        {
            DateTime desde = DateTime.TryParse(fechaDesde, CultureInfo.GetCultureInfo("ES-AR"), DateTimeStyles.None, out desde) ? desde : new DateTime(1, 1, 1);
            DateTime hasta = DateTime.TryParse(fechaHasta, CultureInfo.GetCultureInfo("ES-AR"), DateTimeStyles.None, out hasta) ? hasta : new DateTime(1, 1, 1);

            int cantidad = int.TryParse(mostrar, out cantidad) ? cantidad : 0;

            RecepcionManager Manager = new RecepcionManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            IEnumerable<ReporteHistorico> Result = Manager.GetReporteHistorico(Cuentas, codigosAlarmaExcluir, desde, hasta, estados, alertas, tipos, cantidad, ordenarFecha);

            return new List<ReporteHistorico>(Result).ToArray();
        }


               
    }
}
																
