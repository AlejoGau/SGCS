using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Slbf.Objects;
using System.Web;
using Slbf;
using NLog;

namespace SoftGuard.BusinessObjects.Rest
{
    public partial class SmartTrackRestService
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        [WebInvoke(UriTemplate = "/Login", Method = "POST"
            , ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream PostLogin(string Json)
        {
            return GetLogin(Json);
        }

        [WebGet(UriTemplate = "/Login?Json={strJson}", RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream GetLogin(string strJson)
        {
            string Out = "";
            string token = HttpContext.Current.Request.QueryString["Oauth_Token"];
            string AppType = "VIGICONTROL";


            logger.Trace("[SmartTrackLogin] el llamado es: " + HttpContext.Current.Request.Url.ToString());
            logger.Trace("[SmartTrackLogin] Datos: " + strJson);

            dynamic Json = DynamicJson.Parse(strJson);
            SimpleSmartTrack o;
            if (Json != null && !String.IsNullOrEmpty(Json.Imei) && !String.IsNullOrEmpty(Json.Telefono))
            {
                AppType = Json.AppType() ? Json.AppType ?? "" : "VIGICONTROL";

                //Login - Si no está lo crea, sino lo usa.
                logger.Trace("Si no esta creado el smarttrack o si esta el IdCuenta en 0, devuelvo json de status NO el config");
                o = this.GetByImei(Json.Imei.ToString() as string);

                if (o == null || o.Id == 0)
                {
                    logger.Trace("No encontre por imei:" + Json.Imei.ToString());
                    o = this.GetByTelefono(Json.Telefono.ToString() as string);

                    if (o != null)
                    {
                        logger.Trace("Si tiene imei cargado cuando busco por telefono devuelvo un error, porque cambiaste de aparato");
                        if (!String.IsNullOrEmpty(o.Imei))
                        {
                            Out = "{\"STATUS\":\"INVALIDIMEI\"}";
                            WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Out));
                        }
                        else
                        {
                            o.Imei = Json.Imei.ToString() as string;
                            this.Update(o.Id.ToString(), o);
                        }
                    }
                }

                if (o == null || o.Id == 0)
                {
                    logger.Trace("Creo el nuevo vc:" + Json.Imei.ToString());
                    var s = new SimpleSmartTrack()
                    {
                        Name = Json.Name() ? Json.Name ?? "" : "",
                        Telefono = Json.Telefono() ? Json.Telefono ?? "" : "",
                        Imei = Json.Imei() ? Json.Imei ?? "" : "",
                        Modelo = Json.Modelo() ? Json.Modelo ?? "" : "",
                        Marca = Json.Marca() ? Json.Marca ?? "" : "",
                        Version = Json.Version() ? Json.Version ?? "" : "",
                        Tipo = Json.Tipo() ? Json.Tipo ?? "" : "",
                        Nombre = Json.Nombre() ? Json.Nombre ?? "" : "",
                        AppType = Json.AppType() ? Json.AppType ?? "" : "VIGICONTROL",
                        CuentaId = 0
                    };
                    o = this.Create(s) as SimpleSmartTrack;
                    Out = strJson;
                }
                else
                {
                    logger.Trace("Encontre imei:" + Json.Imei.ToString());
                    var mustsave = false;
                    if (String.IsNullOrEmpty(o.Modelo) && Json.Modelo() && Json.Modelo != null && !String.IsNullOrEmpty(Json.Modelo.ToString() as string))
                    { o.Modelo = Json.Modelo.ToString() as string; mustsave = true; }
                    if (String.IsNullOrEmpty(o.Marca) && Json.Marca() && Json.Marca != null && !String.IsNullOrEmpty(Json.Marca.ToString() as string))
                    { o.Marca = Json.Marca.ToString() as string; mustsave = true; }
                    if (String.IsNullOrEmpty(o.Version) && Json.Version() && Json.Version != null && !String.IsNullOrEmpty(Json.Version.ToString() as string))
                    { o.Version = Json.Version.ToString() as string; mustsave = true; }
                    if (String.IsNullOrEmpty(o.Tipo) && Json.Tipo() && Json.Tipo != null && !String.IsNullOrEmpty(Json.Tipo.ToString() as string))
                    { o.Tipo = Json.Tipo.ToString() as string; mustsave = true; }
                    if (Json.Nombre() && Json.Nombre != null && !String.IsNullOrEmpty(Json.Nombre.ToString() as string) && Json.Nombre.ToString() != o.Nombre)
                    { o.Nombre = Json.Nombre.ToString() as string; mustsave = true; }
                    if (Json.pushToken() && Json.pushToken != null && !String.IsNullOrEmpty(Json.pushToken.ToString() as string) && Json.pushToken.ToString() != o.pushToken)
                    { o.pushToken = Json.pushToken.ToString() as string; mustsave = true; }

                    if (mustsave)
                    {
                        logger.Trace("Guardo los cambios");
                        this.Update(o.Id.ToString(), o);
                    }

                    if (o.CuentaId == 0)
                    {
                        logger.Trace("Cuenta no asignada");
                        Out = "{\"STATUS\":\"CTANOASIGN\"}";
                    }
                    else
                    {
                        logger.Trace("UIApplication, SmartTrack, Metadata, config");
                        var totalrowsserach = 0;
                        var search = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
                        string filter = "[{\"property\":\"imei\",\"value\":\"" + o.Imei + "\"}]";

                        logger.Trace("SmartTrackCuenta: filter " + filter);
                        search.LoadByName("SmartTrackCuenta");
                        var datasearch = search.ExecuteAsDataTable(new Dictionary<string, object>() { { "filter", filter } }, out totalrowsserach);
                        
                        var cue_clinea = datasearch.Rows[0]["cue_clinea"] as string;

                        //logger.Trace("GetSmartTrackConfig: cue_clinea "+ cue_clinea + " AppType "+ AppType);
                        //var config = GetSmartTrackConfig(cue_clinea, "OK", AppType);

                        logger.Trace("GetSmartTrackConfig: cue_clinea " + cue_clinea + " AppType " + AppType);
                        var config = GetSmartTrackConfig(cue_clinea, "OK", o.CuentaId, AppType);

                        logger.Trace("busco el telefono y el usuario y actualizo los nombres del dispositivo");
                        var telsearch = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
                        telsearch.LoadByName("Telefono");
                        var teldatasearch = telsearch.ExecuteAsDataTable(new Dictionary<string, object>() { { "filter", "[{\"property\":\"tel_iidcuenta\",\"value\":\"" + o.CuentaId + "\"},{\"property\":\"tel_ctelefono\",\"value\":\"" + o.Telefono + "\"}]" } }, out totalrowsserach);
                        int telid = int.Parse(teldatasearch.Rows[0]["tel_idKey"].ToString());
                        logger.Trace("con el id cargo el objeto y lo actualizo");
                        var tel = Slbf.ObjectFactoryService.CreateLoad<Telefono>(telid);
                        tel.tel_cnombre = o.Nombre;
                        tel.Save();

                        string usertoken = "";

                        if (!string.IsNullOrEmpty(o.Config.ToString()))
                        {
                            dynamic djson = DynamicJson.Parse(o.Config.ToString());

                            logger.Trace("me fijo si la configuracion tiene usario asociado para obtener el token");
                            if (djson.vigicontrolUserId() && (djson.vigicontrolUserId != null && !String.IsNullOrEmpty(djson.vigicontrolUserId.ToString())))
                            {
                                usertoken = (Slbf.Data.DataService.ExecuteScalar("GetCreateToken", new Dictionary<string, object>() { { "@userId", djson.vigicontrolUserId.ToString() } }) ?? "").ToString();
                            }
                        }

                        Out = "{" + "\"SmartTrack\":" + "{";
                        Out +="\"idcuenta\":" + o.CuentaId.ToString();
                        Out += ",\"smarttrackId\":" + "\"" + o.Id.ToString() + "\"";


                        if (!String.IsNullOrEmpty(o.Nombre.ToString()))
                        {
                            Out += ",\"nombre\":" + "\"" + o.Nombre.ToString() + "\"";
                        }
                        if (!String.IsNullOrEmpty(o.Telefono.ToString()))
                        {
                            Out += ",\"telefono\":" + "\"" + o.Telefono.ToString() + "\"";
                        }
                        if (!String.IsNullOrEmpty(o.Config.ToString()))
                        {
                            Out += ",\"config\":" + o.Config.ToString();
                        }
                        if (!String.IsNullOrEmpty(o.Config.ToString()))
                        {
                            Out += ",\"userToken\":" + "\"" + usertoken + "\"";
                        }

                        Out += "}" +
                            ",\"Config\":" + config
                            + ",\"PackageVersion\":\"16.7.2.440\""
                        + "}";
                       
                        //Out = useriid.ToString();// +' ' + telid.ToString();
                    }
                }
            }
            else
            {
                throw new ApplicationException("Parameter 'Json' is empty or does not complain SimpleSmartTrack schema. Contact the system administrator");
            }

            WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Out));
        }

        //private static string GetSmartTrackConfig(string cue_clinea, string estado, string AppType = "VIGICONTROL")
          private static string GetSmartTrackConfig(string cue_clinea, string estado, int cuentaId, string AppType = "VIGICONTROL")
        {
            string config="";

            try
            {
                logger.Trace("Busco la configuracion para el dealer:" + cue_clinea);
                int total = 0;
                // me fijo si hay configuracion por dealer.
                SearchObject m_dealer_vcconfig = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
                m_dealer_vcconfig.LoadByName("m_dealer_vcconfig");
                DataTable datasearch = m_dealer_vcconfig.ExecuteAsDataTable(
                    new Dictionary<string, object>()
                        {
                            { "filter", "{\"Property\":\"dvc_cdealer\",\"Value\":\""+cue_clinea+"\"},{\"Property\":\"dvc_apptype\",\"Value\":\""+AppType+"\"}"}
                        }
                    , out total
                );

                if (total > 0)
                {
                    config = datasearch.Rows[0]["dvc_config"].ToString();
                    logger.Trace("Configuracion por dealer " + cue_clinea + " :" + config+" Apptype:"+AppType);

                }
                else
                {
                    logger.Trace("No hay conf dealer devuelvo  global");
                    var uia = Slbf.ObjectFactoryService.Create<Slbf.UI.UIApplication>();
                    
                    if (AppType == "VIGICONTROL")
                    {
                        uia.LoadByName("SmartTrack");
                    } else
                    {
                        uia.LoadByName("CleanApp");
                    }
                    
                    if (uia == null)
                        throw new ApplicationException("UIApplication "+AppType+" cannot be loaded. Contact the system administrator");

                    dynamic m = uia.Metadata();
                    if (m == null)
                        throw new ApplicationException(AppType + " Metadata is null. Contact the system administrator");

                    if (!m.Config())
                        throw new ApplicationException(AppType + " Metadata does not contains 'Config' key. Contact the system administrator");

                    config = m.Config as string;
                    if (String.IsNullOrEmpty(config))
                        throw new ApplicationException(AppType + " Metadata does not contains 'Config' key or is empty. Contact the system administrator");
                }
            }
            catch (Exception e)
            {
                logger.Error("Hubo un error: "+e.Message);
            }

            /*
             var str = config
                 .Replace("{cue_clinea}", cue_clinea)
                 .Replace("{estado}", estado)
                 ;
             return str;
            */

            var str = config
                .Replace("{cue_clinea}", cue_clinea)                
                .Replace("{estado}", estado)
                .Replace("{idcuenta}", cuentaId.ToString())
                ;
            return str;

        }
    }
}
																
