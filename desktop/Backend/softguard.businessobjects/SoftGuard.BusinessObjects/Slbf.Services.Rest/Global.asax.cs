// Decompiled with JetBrains decompiler
// Type: Slbf.Services.Rest.Global
// Assembly: Slbf.Services.Rest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 7573FD33-E826-4337-B134-94D834E5B70B
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\Slbf.Services.Rest.dll

using Slbf.Helpers;
using Slbf.Security;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Reflection;
using System.ServiceModel.Activation;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Hosting;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Slbf.Services.Rest
{
    public class Global : HttpApplication
    {
        public static SqlHelper SqlHelper = (SqlHelper)null;
        public static Exception CurrentException { get; private set; }
        public static DateTime CurrentExceptionDate { get; private set; }
        protected internal void Application_BeginRequest(object sender, EventArgs e)
        {
            bool _isvalid = true;
            // seteo config HMAC
            string HMACINVALIDREQUEST = ConfigurationManager.AppSettings.Get("HMACINVALIDREQUEST");
            if (string.IsNullOrEmpty(HMACINVALIDREQUEST))
            {
                HMACINVALIDREQUEST = "LOG";
            }

            if (HMACINVALIDREQUEST != "IGNORE")
            {
                _isvalid = ValidateRequest();
            }

            if (HMACINVALIDREQUEST == "FAIL" && !_isvalid)
            {
                throw new FrameworkException("Invalid Request");
            }


            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-US");
        }

        private bool ValidateRequest()
        {
            bool _isvalid = true;
            NLog.Logger hmaclogger = NLog.LogManager.GetLogger("hmac");
            // TODO: configurar el funcionamineto del HMAC
            HttpRequest _request = HttpContext.Current.Request;

            // tomo el hmac si existe
            string hmac = _request.Headers["_h"];
            string _u = Uri.UnescapeDataString(_request.Url.ToString());

            // ignoro algunos REST en la validacion.
            string pat = @"(bundle|IsValid|Message|upload|p_encuesta_respondidasSearch|login|getImage|SearchObject|UiapplicationUpdate|AlarmaGenerarMultimedia)";

            Regex r = new Regex(pat, RegexOptions.IgnoreCase);
            Match m = r.Match(_u);

            var _ureferer = _request.UrlReferrer;
            String _referer = "";
            if (_ureferer != null)
            {
                _referer = _ureferer.ToString();
            }

            if (m.Success || _referer.IndexOf("Desktop") > 0 || _referer.IndexOf("desktop") > 0 || _referer.IndexOf("BundleManager") > 0 || _referer.IndexOf("landingform") > 0)
            {
                _isvalid = true;
            }
            else if (!string.IsNullOrEmpty(hmac))
            {
                string _t = _request.Headers["_t"];
                string _n = _request.Headers["_n"];
                string _m = _request.HttpMethod;
                string token = _request.Params["oauth_token"];

                if (String.IsNullOrEmpty(token))
                {
                    token = _request.Headers["Authorization"];
                }

                if (String.IsNullOrEmpty(token))
                {
                    token = _request.Headers["oauth_token"];
                }

                if (String.IsNullOrEmpty(token))
                {
                    token = _request.Cookies["OAuth_Token"] != null ? _request.Cookies["OAuth_Token"].Value : null;
                }

                string key = String.Join(":", new String[] { token, _t });
                string firma = String.Join(":", new String[] { token, _t, _u, _m, _n });

                // controlo el timestamp
                DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                DateTime timestamp = epoch.AddMilliseconds(Int64.Parse(_t));


                DateTime _now = DateTime.Now;

                TimeSpan dateDiff = _now.Subtract(timestamp);

                if (dateDiff.Minutes > 15)
                {
                    hmaclogger.Error("[Application_BeginRequest] Fecha del request inv�lido");
                    hmaclogger.Trace("[INVALID_DATE] now:" + _now.ToString());
                    hmaclogger.Trace("[INVALID_DATE] timestamp:" + timestamp.ToString());
                    hmaclogger.Trace("[INVALID_DATE] diff:" + dateDiff.Minutes.ToString());
                }

                // encripto
                HMACSHA256 hobj = new HMACSHA256(Encoding.UTF8.GetBytes(key));
                byte[] hbytes = hobj.ComputeHash(Encoding.UTF8.GetBytes(firma));
                string _h = Convert.ToBase64String(hbytes);

                // primer pasada, agrego el puerto a la URL y recalculo, para compatibilidad sp que calcula con puertos 80 y 443 en la url


                if (_h != hmac && _request.Url.IsDefaultPort)
                {
                    hmaclogger.Trace("[INVALID_HMAC] hmac:" + hmac);
                    hmaclogger.Trace("[INVALID_HMAC] url:" + _u);
                    hmaclogger.Trace("[INVALID_HMAC] nonce:" + _n);
                    hmaclogger.Trace("[INVALID_HMAC] method:" + _m);
                    hmaclogger.Trace("[INVALID_HMAC] timestamp:" + _t);
                    hmaclogger.Trace("[INVALID_HMAC] token:" + token);
                    hmaclogger.Trace("[INVALID_HMAC] key:" + key);
                    hmaclogger.Trace("[INVALID_HMAC] firma:" + firma);
                    hmaclogger.Trace("[INVALID_HMAC] hmac calculado:" + _h);
                    hmaclogger.Trace("[INVALID_HMAC] Referer URL: " + _request.UrlReferrer);
                    hmaclogger.Trace("[INVALID_HMAC] Referer IP: " + _request.ServerVariables["REMOTE_ADDR"]);
                    hmaclogger.Trace("[INVALID_HMAC] Agrego puerto a la url y vuelvo a calcular");
                    UriBuilder _builder = new UriBuilder(_u)
                    {
                        Port = _request.Url.Port
                    };
                    _u = Uri.UnescapeDataString(_builder.ToString());
                    //hmaclogger.Trace("[URL_BUILDER] Url:" + _u);

                    firma = String.Join(":", new String[] { token, _t, _u, _m, _n });
                    //hmaclogger.Trace("Nueva firma:" + firma);

                    hbytes = hobj.ComputeHash(Encoding.UTF8.GetBytes(firma));
                    _h = Convert.ToBase64String(hbytes);
                    //hmaclogger.Trace("Nuevo hmac:" + _h);


                }

                if (_h != hmac)
                {
                    hmaclogger.Error("[Application_BeginRequest] la firma de la url es erronea");
                    hmaclogger.Trace("[INVALID_HMAC] hmac:" + hmac);
                    hmaclogger.Trace("[INVALID_HMAC] url:" + _u);
                    hmaclogger.Trace("[INVALID_HMAC] nonce:" + _n);
                    hmaclogger.Trace("[INVALID_HMAC] method:" + _m);
                    hmaclogger.Trace("[INVALID_HMAC] timestamp:" + _t);
                    hmaclogger.Trace("[INVALID_HMAC] token:" + token);
                    hmaclogger.Trace("[INVALID_HMAC] key:" + key);
                    hmaclogger.Trace("[INVALID_HMAC] firma:" + firma);
                    hmaclogger.Trace("[INVALID_HMAC] hmac calculado:" + _h);
                    hmaclogger.Trace("[INVALID_HMAC] Referer URL: " + _request.UrlReferrer);
                    hmaclogger.Trace("[INVALID_HMAC] Referer IP: " + _request.ServerVariables["REMOTE_ADDR"]);

                    _isvalid = false;

                }
            }
            else
            {
                hmaclogger.Error("[Application_BeginRequest] REQUEST INSEGURO (activar trace)");
                hmaclogger.Trace("[INSECURE_REQUEST] Destino: " + _request.Url);
                hmaclogger.Trace("[INSECURE_REQUEST] Referer URL: " + _request.UrlReferrer);
                hmaclogger.Trace("[INSECURE_REQUEST] Referer IP: " + _request.ServerVariables["REMOTE_ADDR"]);
                _isvalid = false;
            }

            return _isvalid;
        }

        private void Application_Start(object sender, EventArgs e)
        {

            NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
            logger.Trace("Application_Start");



            // me fijo si el sitio es valido
            /*
            if (HostingEnvironment.SiteName!= "CloudSecuritySuite" )
            {
                logger.Error("Violaci�n de seguridad, contacte al administrador ("+ HostingEnvironment.SiteName+")");
                throw new Exception("Violaci�n de seguridad, contacte al administrador");
            }
            */
            //else
            //{
            Global.SqlHelper = new SqlHelper(this.GetConnectionString());
            this.RegisterRoutes();
            //}



            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-US");

        }

        public static string GetUserId()
        {
            return Global.GetToken();
        }

        public static string GetToken()
        {
            string token = UserService.GetToken();
            if (token == "undefined")
                throw new FrameworkException("Invalid Token");
            return token;
        }

        private string GetConnectionString()
        {
            ConnectionStringSettings connectionString = ConfigurationManager.ConnectionStrings["Slbf"];
            if (connectionString != null)
                return connectionString.ConnectionString;
            return (string)null;
        }

        private void RegisterRoutes()
        {

            RouteTable.Routes.Add((RouteBase)new ServiceRoute("Cuenta", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.BusinessObjects.Rest.CuentaRestService, Slbf.Services.Rest")));


            string[] strArray1 = new string[] { "Falsa", "HorarioAlternativo", "Horario", "Nota", "ZonaTemp", "MedicalInfo" };
            foreach (string routePrefix in strArray1)
                RouteTable.Routes.Add((RouteBase)new ServiceRoute(routePrefix, (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("Slbf.Services.Rest." + routePrefix + "RestService, Slbf.Services.Rest")));


                string[] strArray2 = new string[] { "Test",
                    "Sms", "Reporte", "Estado", "EstadoItem", "PersonLineRange", "WebManagerViews",
                    "WebManagerGraphics", "TelefonoPlanilla", "Telefono", "Panel", "Zona", "UsersDesktopWeb",
                    "UsersDesktopWebModulos", "DispositivoMovil", "ReporteAutoridades", "GeoFense", "GeoFenseCuenta",
                    "GrupoCuentas", "w_usuarios", "w_cuentas_x_usuario", "w_destinatarios_correo", "p_comandos_ip",
                    "EquipoDispositivoMovil", "DealerRango", "SmartPanic", "m_receptores_item", "t_LineasXPuerto",
                    "t_listas_emergencia", "t_paneles", "t_teclados", "t_linkurl", "t_tipos", "t_medicos", "t_grupos",
                    "t_provincias", "t_resoluciones", "t_categorizacion", "t_instaladores", "t_InstaladoresDealer",
                    "t_resolucionesllamada", "t_modems_sms", "t_tags_ag", "t_observaciones", "t_flotas", "t_movilespatrulla",
                    "t_serviciospatrulla", "t_codigos_alarma", "t_lineas", "t_puertos", "t_ip_con", "t_mailConnector",
                    "t_port_alias", "t_parametros", "t_plantillas_sms", "t_eventos_feriados", "t_redirector",
                    "t_redirectordestino", "s_terminales", "m_formatos", "m_planillas", "p_recepcion", "p_posicionesSP",
                    "p_recepcion_notas", "p_VirtualIR", "p_push_queue", "t_TimeZone", "TaskStatus", "ZonaPlanilla",
                    "HorarioExcepcionPlanilla", "HorarioToleranciaPlanilla", "HorarioExcepcion",
                    "HorarioAlternativoPlantilla", "HorarioTolerancia", "HorarioPlanilla", "m_telefonos_jurisdiccionales",
                    "m_st_cabecera", "t_tecnicos", "t_tiposervicio", "s_operadores", "t_EscalamientoPrioridades",
                    "m_cuentas_video", "m_CuentasXtraInfo", "m_cuentas_video_links", "m_cuentas_drawing", "t_videoid",
                    "t_videoidXtrainfo", "SmartTrack", "SmartTrackGeoFense", "p_vcrestricciones", "HombreVivo",
                    "Scheduler", "SchedulerTemplate", "t_checkPoints_VC", "VC_Routes", "VC_Route_Programs",
                    "VC_Route_Checkpoints", "SerTecTecnicoVisitas", "m_tgviaje", "TG_Routes", "TG_Route_Programs",
                    "TG_Route_Geofences", "TG_mantenimiento_historico", "t_TG_mantenimiento_servicios", "SerTecVisitas",
                    "SerTecMovilesVisitas", "SerTecProductosOrden", "SerTecFormaViajeVisitas", "SerTecTimeLine",
                    "t_gatewaysmsg", "t_autoridades", "p_grabacion_audio", "Deposito", "eventostimeline",
                    "t_autoridaddestino", "SchedulerPrograms", "m_stock_cabecera", "t_stock_depositos",
                    "m_stock_totales", "m_stock_item", "t_tipos_formapago_fc", "t_formas_pago_fc", "t_bancos_fc",
                    "t_organizacion_fc", "t_categorias_impositivas_fc", "t_firmantes_fc", "t_novedades_fc",
                    "t_condiciones_pago_fc", "T_ProtocolosComandos", "m_clientes_fc", "t_comprobantes_fc", "m_caja_fc",
                    "m_comprobantes_item_fc", "m_comprobantes_cab_fc", "m_printQueue", "m_tstconexion",
                    "m_aviso_programado", "m_template_contrato", "m_asignacion_movil", "m_EstadosPanel",
                    "m_reportes_automaticos_dealer", "Resource", "crm_contrato", "crm_contrato_item", "Usuario",
                    "mg_maestrocuentas", "MG_listas_precios", "MG_listas_precios_detalle", "t_monedas", "MG_Afip_Cae",
                    "MG_Afip_Cae_Ws", "MG_product_impuesto", "MG_comprobante_impuesto", "s_systemdata",
                    "EventosEnFalloTesteo", "s_systemdata_clientes", "s_online_help", "m_cuenta_corriente_fc",
                    "m_novedades_facturacion_fc", "t_impuestos_fc", "p_rximg", "p_encuesta", "p_encuesta_pregunta",
                    "p_encuesta_pregunta_opcion", "p_encuesta_pregunta_respuesta", "p_controlAcceso_IO",
                    "p_controlAcceso_Autorizacion", "t_controlAcceso_puerta", "RemoteCallQueue", "p_evento_workflow",
                    "iprs_status", "t_dealerplantillas", "t_estadosdinamicos", "t_iprsconecciones",
                    "t_EscalamientoPorOrganizacion", "s_iprservicios", "p_objetos_modificaciones", "p_lista_correo",
                    "p_SpRemoteBtn", "s_ip_range", "m_cuenta_grupo", "m_cuenta_grupo_usuarios", "t_mensajes_whatsapp",
                    "t_monitoreo_dealer", "m_dealer_spconfig", "m_dealer_vcconfig", "t_notificaciones_dealer",
                    "m_dealer_tgconfig", "t_CuentasTipoServicio", "T_AccesosTipoDocumento",
                    "m_AccesosProveedoresVehiculos", "m_AccesosProveedoresDocumentos",
                    "m_AccesosProveedoresAutorizaciones", "m_AccesosProveedores", "T_AccesosCategoriaProveedor",
                    "T_AccesosVehiculoProveedor", "m_simcard", "T_SimCard_APN", "T_SimCard_Marca", "T_SimCard_Estado",
                    "m_dealer_stconfig", "t_grupos_geofence", "p_EnergyDevices", "EventosInformados", "t_ModoEmergencia",
                    "t_CtrlEventoPrevio","t_CodigosEnFalla", "EventosIngresosEgresos", "m_Victimarios", "VisitasIngresosEgresos", "m_CuentasConn", "m_sgnotes",
                    "t_WeSafePriceOptions", "t_WeSafePeriodicityOptions", "t_WeSafeFunctionsOptions", "WeSafeSubscription", "WeSafeSubscriptionFunctions", "WeSafeConfig",
                    "t_GuidedStepOptions"  , "GuidedMonitoringTemplateSteps","GuidedMonitoringTemplate",
                    "SV_Route_AnalysisPoints","SV_Route_Programs","SV_Routes", "m_llaves", 
                    "m_cuentas_video_control", "OperadorVirtualConfig", "OperadorVirtualConfigDealers", "OperadorVirtualConfigEventos", "t_CategoriaVC", "t_ControlEventosDealer",
					"t_FormulariosST",
                    "UserAccountFilter",
                    "t_ResourcesModule_Type",
                    "ResourceModule"
            };
            foreach (string routePrefix in strArray2)
                RouteTable.Routes.Add((RouteBase)new ServiceRoute(routePrefix, (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.BusinessObjects.Rest." + routePrefix + "RestService, Slbf.Services.Rest")));
            string[] strArray3 = new string[] { "Tecnico", "Movil", "Producto", "TipoServicio" };
            foreach (string str in strArray3)


                RouteTable.Routes.Add((RouteBase)new ServiceRoute("Tablas/" + str, (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.EnterpriseServices.Rest." + str + "RestService, Slbf.Services.Rest")));
            string[] strArray4 = new string[] { "CodigosAlarmas"
                , "EventosFeriados"
                , "ListasEmergencia", "Paneles", "Provincias"
                , "Tipos", "Instaladores", "Medicos", "Lineas"
                , "ModemsSms", "PlantillasSms", "Parametros" };
            foreach (string str in strArray4)
                RouteTable.Routes.Add((RouteBase)new ServiceRoute("Tablas/" + str, (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.EnterpriseServices.Rest." + str + "RestService, Slbf.Services.Rest")));

            RouteTable.Routes.Add((RouteBase)new ServiceRoute("Reportes", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.EnterpriseServices.Rest.ReportesRestService, Slbf.Services.Rest")));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute("WebManager", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.EnterpriseServices.Rest.WebManagerRestService, Slbf.Services.Rest")));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute("Audit", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("Slbf.Objects.Rest.FrameworkAuditRestService, Slbf.Services.Rest")));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute("Security", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.EnterpriseServices.Rest.SecurityRestService, Slbf.Services.Rest")));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute("Desktop", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.EnterpriseServices.Rest.DesktopRestService, Slbf.Services.Rest")));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute("WebDealerRestService", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.EnterpriseServices.Rest.WebDealerRestService, Slbf.Services.Rest")));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute("Gps", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.BusinessObjects.Rest.GpsRestService, Slbf.Services.Rest")));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute("Poi", (ServiceHostFactoryBase)new WebServiceHostFactory(), Type.GetType("SoftGuard.BusinessObjects.Rest.PoiRestService, Slbf.Services.Rest")));

            // DK-1493: Product entity migrated from Slbf.Pxp to SoftGuard.BusinessObjects (added pro_cantidad_auto).
            // Class renamed to BoProductRestService to avoid duplicate "Product" route registration via RegisterFromBin
            // when both Slbf.Pxp.dll (legacy) and SoftGuard.BusinessObjects.dll are present in bin.
            // Explicit registration runs BEFORE RegisterFromBin so the Pxp scan is skipped via _registeredPrefixes.
            Type boProductType = Type.GetType("SoftGuard.BusinessObjects.Rest.BoProductRestService, Slbf.Services.Rest");
            if (boProductType != null)
            {
                RouteTable.Routes.Add((RouteBase)new ServiceRoute("Product", (ServiceHostFactoryBase)new WebServiceHostFactory(), boProductType));
                RouteTable.Routes.Add((RouteBase)new ServiceRoute("Product.svc", (ServiceHostFactoryBase)new WebServiceHostFactory(), boProductType));
                _registeredPrefixes.Add("Product");
                _registeredPrefixes.Add("Product.svc");
            }

            Global.RegisterFromBin();



            RouteCollectionExtensions.MapRoute(RouteTable.Routes, "Default", "{controller}/{action}/{id}", (object)new
            {
                controller = "Default",
                action = "Index",
                id = (UrlParameter)UrlParameter.Optional
            });
        }

        private static HashSet<string> _registeredPrefixes = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        private static void RegisterFromBin()
        {
            NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
            List<Assembly> assemblyList = new List<Assembly>((IEnumerable<Assembly>)AssemblyLocator.GetBinFolderAssemblies());
            assemblyList.Remove(Assembly.GetExecutingAssembly());
            foreach (Assembly assembly in assemblyList)
            {
                Type[] types;
                try
                {
                    types = assembly.GetTypes();
                }
                catch (ReflectionTypeLoadException ex)
                {
                    logger.Warn("RegisterFromBin: GetTypes failed for " + assembly.FullName + ": " + ex.Message);
                    types = ex.Types;
                }
                catch (Exception ex)
                {
                    logger.Warn("RegisterFromBin: skipping " + assembly.FullName + ": " + ex.Message);
                    continue;
                }
                foreach (Type type in types)
                {
                    if (type == null) continue;
                    if (type.Name.EndsWith("RestService"))
                        Global.AddServiceRoute(type);
                }
            }
        }

        private static void AddServiceRoute(Type t)
        {
            string routePrefix = t.Name.Replace("RestService", "");
            if (_registeredPrefixes.Contains(routePrefix))
                return;
            _registeredPrefixes.Add(routePrefix);
            _registeredPrefixes.Add(routePrefix + ".svc");
            RouteTable.Routes.Add((RouteBase)new ServiceRoute(routePrefix, (ServiceHostFactoryBase)new WebServiceHostFactory(), t));
            RouteTable.Routes.Add((RouteBase)new ServiceRoute(routePrefix + ".svc", (ServiceHostFactoryBase)new WebServiceHostFactory(), t));
        }

        protected void Application_Error()
        {
            Exception lastException = Server.GetLastError();
            NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
            logger.Fatal(lastException);
        }

        public static void SetException(Exception ex)
        {
            Global.CurrentExceptionDate = DateTime.Now;
            Global.CurrentException = ex;

            NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
            logger.Fatal(ex);
        }
    }
}
