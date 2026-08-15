using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text.RegularExpressions;
using System.Web;
using Slbf.Objects;
using Slbf;
using NLog;

namespace SoftGuard.BusinessObjects.Rest
{
    public partial class SmartPanicRestService
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        private static int idcuenta;

        public static bool IsPropertyExist(dynamic settings, string name)
        {
            if (settings is ExpandoObject)
                return ((IDictionary<string, object>)settings).ContainsKey(name);

            return settings.GetType().GetProperty(name) != null;
        }

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
            WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
            logger.Trace("[SmartpanicsLogin] el llamado es: " + HttpContext.Current.Request.Url.ToString());
            logger.Trace("[SmartpanicsLogin] Datos: " + strJson);

            dynamic Json = DynamicJson.Parse(strJson);
            //dynamic MetadataConfig = GetSmartPanicsConfig();
            dynamic smartpanicsMetadata = GetSmartPanicsMetadata();
            dynamic MetadataConfig = DynamicJson.Parse(smartpanicsMetadata.Config.ToString());
            string _metadataconfig = DynamicJson.Serialize(MetadataConfig);
            logger.Trace("[SmartpanicsLogin] _metadataconfig: " + _metadataconfig);
            SimpleSmartPanic o = null;

            string awccusertoken = "";

            string apptype = null;
            if (Json.IsDefined("AppType") && Json.AppType != null)
            {
                var appTypeRaw = Json.AppType.ToString();
                if (!string.IsNullOrWhiteSpace(appTypeRaw))
                {
                    apptype = appTypeRaw.Trim();
                }
            }
            // si no llega el telefono solo devuelvo config
            // si la app es signature

            string telefono = "";

            if (Json.IsDefined("Telefono"))
            {
                telefono = Json.Telefono.ToString();
            }

            int appTypeValue = 0;
            int.TryParse(apptype ?? "0", out appTypeValue);
            if (appTypeValue >= 1)
            {
                logger.Trace("Es signature me fijo el estado del workflow");

                // traigo el objeto workflow
                workflow p_landingworkflow = getWorkFlow(Json.Imei.ToString());

                if (p_landingworkflow!= null && p_landingworkflow.estado > 0)
                {
                    logger.Trace("Workflow terminado, env�o datos del dispositivo");
                    telefono = p_landingworkflow.Telefono;
                }
                else if(string.IsNullOrEmpty(telefono)) // no debe mandar telefono cuando es landing
                {

                    logger.Trace("Workflow pendiente, envio landing");


                    string configGlobal = "";

                    // me fijo si enviaron dealer en el login (municipios y hoteles) para buscar la config del dealer
                    if (Json.IsDefined("Dealer") && !String.IsNullOrEmpty(Json.Dealer.ToString())){
                        configGlobal = GetSmartPanicsConfig(Json.Dealer.ToString(), "LANDING");
                    }
                    else
                    {

                        dynamic result = smartpanicsMetadata;

                        configGlobal = result.Config as string;
                    }
                    

                    // traigo la url de la landing
                    string url = GetLandingUrlConfig(configGlobal);

                    // agrego el imei.
                    string urlImei = url + "?imei=" + Json.Imei.ToString();

                    // reemplazo la url por la nueva con imei
                    configGlobal = Regex.Replace(configGlobal, url, urlImei);


                    logger.Trace("La url de landing es: " + urlImei);

                    Out += "{\"STATUS\":\"LANDING\"," +
                        "\"Config\":" + configGlobal
                        + "}";

                    return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Out));
                }

            }

            if (telefono == "")
            {
                logger.Trace("No hay teléfono y no es signature, devuelvo config global");
                dynamic result = smartpanicsMetadata;
                string configGlobal = result.Config as string;
                Out += "{" +
                    "\"Config\":" + configGlobal
                    + "}";
            }
            else if (Json != null && !string.IsNullOrEmpty(Json.Imei) && !string.IsNullOrEmpty(telefono))
            {
                logger.Trace("Login - Si no está lo crea, sino lo usa.");

                //Si no esta creado el smartpanic o si esta el IdCuenta en 0, devuelvo json de status NO el config
                // asignar a la cuenta por defecto si existe esa configuracion.
                o = this.GetByImei(Json.Imei.ToString() as string);
                if (o != null)
                {
                    logger.Trace("[SmartPanicLogin] LoadedByImei | Id: " + o.Id
                        + " | Imei: " + (o.Imei ?? "")
                        + " | Telefono: " + (o.Telefono ?? "")
                        + " | Modelo: " + (o.Modelo ?? "")
                        + " | Marca: " + (o.Marca ?? "")
                        + " | Version: " + (o.Version ?? "")
                        + " | Tipo: " + (o.Tipo ?? "")
                        + " | Nombre: " + (o.Nombre ?? "")
                        + " | pushToken: " + (o.pushToken ?? "")
                        + " | AppVersion: " + (o.AppVersion ?? "")
                        + " | AppType: " + o.AppType.ToString()
                        + " | CuentaId: " + o.CuentaId.ToString());
                }

                if (o == null || o.Id == 0)
                {
                    var appTypeForSearch = string.IsNullOrEmpty(apptype) ? "0" : apptype;
                    logger.Trace("GetByTelefono: " + telefono + " | AppType: " + appTypeForSearch);
                    o = this.GetByTelefono(telefono as string, appTypeForSearch);
                    if (o != null)
                    {
                        logger.Trace("[SmartPanicLogin] LoadedByTelefono | Id: " + o.Id
                            + " | Imei: " + (o.Imei ?? "")
                            + " | Telefono: " + (o.Telefono ?? "")
                            + " | Modelo: " + (o.Modelo ?? "")
                            + " | Marca: " + (o.Marca ?? "")
                            + " | Version: " + (o.Version ?? "")
                            + " | Tipo: " + (o.Tipo ?? "")
                            + " | Nombre: " + (o.Nombre ?? "")
                            + " | pushToken: " + (o.pushToken ?? "")
                            + " | AppVersion: " + (o.AppVersion ?? "")
                            + " | AppType: " + o.AppType.ToString()
                            + " | CuentaId: " + o.CuentaId.ToString());
                    }

                    if (o != null)
                    {
                        logger.Trace("Si tiene imei cargado cuando busco por telefono devuelvo un error, porque cambiaste de aparato");
                        if (!String.IsNullOrEmpty(o.Imei))
                        {
                            Out = "{\"STATUS\":\"INVALIDIMEI\"}";
                            WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Out));
                        }
                        else  // alta temprana, existia pero sin imei, se le agrega el imei y se guarda
                        {
                            logger.Trace("alta temprana, existia pero sin imei, se le agrega el imei y se guarda");
                            o.Imei = Json.Imei.ToString() as string;
                            this.Update(o.Id.ToString(), o); 
                        }
                    }

                }

                if (o == null || o.Id == 0)
                {
                    // no es signature analizo o creo la cuenta creo la cuenta.
                    Out = analizoCreoCuenta(o,MetadataConfig,Json);
                }
                else
                {
                    var mustsave = false;
                    logger.Trace("AppVersion: " + Json.AppVersion.ToString());
                    logger.Trace("[SmartPanicLogin] PreUpdate DB state | Modelo: " + (o.Modelo ?? "")
                        + " | Marca: " + (o.Marca ?? "")
                        + " | Version: " + (o.Version ?? "")
                        + " | Tipo: " + (o.Tipo ?? "")
                        + " | Nombre: " + (o.Nombre ?? "")
                        + " | pushToken: " + (o.pushToken ?? "")
                        + " | AppVersion: " + (o.AppVersion ?? "")
                        + " | AppType: " + o.AppType.ToString());
                    var mustSaveReasons = new List<string>();
                    if (String.IsNullOrEmpty(o.Modelo) && Json.Modelo() && Json.Modelo != null && !String.IsNullOrEmpty(Json.Modelo.ToString() as string))
                    { o.Modelo = Json.Modelo.ToString() as string;
                        logger.Trace("[SmartPanicLogin] MustSave Modelo: " + o.Modelo.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("Modelo"); }
                    if (String.IsNullOrEmpty(o.Marca) && Json.Marca() && Json.Marca != null && !String.IsNullOrEmpty(Json.Marca.ToString() as string))
                    { o.Marca = Json.Marca.ToString() as string;
                        logger.Trace("[SmartPanicLogin] MustSave Marca: " + o.Marca.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("Marca"); }
                    if (String.IsNullOrEmpty(o.Version) && Json.Version() && Json.Version != null && !String.IsNullOrEmpty(Json.Version.ToString() as string))
                    { o.Version = Json.Version.ToString() as string;
                        logger.Trace("[SmartPanicLogin] MustSave Version: " + o.Version.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("Version"); }
                    if (String.IsNullOrEmpty(o.Tipo) && Json.Tipo() && Json.Tipo != null && !String.IsNullOrEmpty(Json.Tipo.ToString() as string))
                    { o.Tipo = Json.Tipo.ToString() as string;
                        logger.Trace("[SmartPanicLogin] MustSave Tipo: " + o.Tipo.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("Tipo"); }
                    string nombreIncoming = (Json.Nombre() && Json.Nombre != null) ? Json.Nombre.ToString().Trim() : "";
                    string nombreCurrent = (o.Nombre ?? "").Trim();
                    if (!String.IsNullOrEmpty(nombreIncoming) && !String.Equals(nombreIncoming, nombreCurrent, StringComparison.Ordinal))
                    { o.Nombre = nombreIncoming;
                        logger.Trace("[SmartPanicLogin] MustSave Nombre: " + o.Nombre.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("Nombre"); }
                    string pushTokenIncoming = (Json.pushToken() && Json.pushToken != null) ? Json.pushToken.ToString().Trim() : "";
                    string pushTokenCurrent = (o.pushToken ?? "").Trim();
                    if (!String.IsNullOrEmpty(pushTokenIncoming) && !String.Equals(pushTokenIncoming, pushTokenCurrent, StringComparison.Ordinal))
                    { o.pushToken = pushTokenIncoming;
                        logger.Trace("[SmartPanicLogin] MustSave pushToken: " + o.pushToken.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("pushToken"); }
                    string appVersionIncoming = (Json.AppVersion() && Json.AppVersion != null) ? Json.AppVersion.ToString().Trim() : "";
                    string appVersionCurrent = (o.AppVersion ?? "").Trim();
                    if (!String.IsNullOrEmpty(appVersionIncoming) && !String.Equals(appVersionIncoming, appVersionCurrent, StringComparison.Ordinal))
                    { o.AppVersion = appVersionIncoming;
                        logger.Trace("[SmartPanicLogin] MustSave AppVersion: " + o.AppVersion.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("AppVersion"); }
                    int parsedIncomingAppType = 0;
                    if (!String.IsNullOrEmpty(apptype) && Int32.TryParse(apptype, out parsedIncomingAppType) && parsedIncomingAppType != o.AppType)
                    { o.AppType = parsedIncomingAppType;
                        logger.Trace("[SmartPanicLogin] MustSave AppType: " + o.AppType.ToString());
                        mustsave = true;
                        mustSaveReasons.Add("AppType"); }

                    if (mustsave)
                    {
                        logger.Trace("[SmartPanicLogin] Update payload state | Modelo: " + (o.Modelo ?? "")
                            + " | Marca: " + (o.Marca ?? "")
                            + " | Version: " + (o.Version ?? "")
                            + " | Tipo: " + (o.Tipo ?? "")
                            + " | Nombre: " + (o.Nombre ?? "")
                            + " | pushToken: " + (o.pushToken ?? "")
                            + " | AppVersion: " + (o.AppVersion ?? "")
                            + " | AppType: " + o.AppType.ToString());
                        logger.Trace("[SmartPanicLogin] llamo update. Motivos: " + string.Join(",", mustSaveReasons));
                        this.Update(o.Id.ToString(), o);

                        // Verificación explícita para detectar cuando la persistencia no refleja los cambios.
                        var reloaded = this.Get(o.Id.ToString()) as SimpleSmartPanic;
                        if (reloaded != null)
                        {
                            logger.Trace("[SmartPanicLogin] PostUpdate DB state | Modelo: " + (reloaded.Modelo ?? "")
                                + " | Marca: " + (reloaded.Marca ?? "")
                                + " | Version: " + (reloaded.Version ?? "")
                                + " | Tipo: " + (reloaded.Tipo ?? "")
                                + " | pushToken: " + (reloaded.pushToken ?? "")
                                + " | AppVersion: " + (reloaded.AppVersion ?? "")
                                + " | AppType: " + reloaded.AppType.ToString());
                        }
                    }

                    if (o.CuentaId == 0)
                    {
                        Out = "{\"STATUS\":\"CTANOASIGN\"}";
                    }
                    else
                    {
                        idcuenta = o.CuentaId;
                        //UIApplication, SmartPanic, Metadata, config
                        var totalrowsserach = 0;
                        var search = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
                        search.LoadByName("SmartPanicCuenta");

                        var dsearch = new Dictionary<string, object>();
                        dsearch.Add("filter", "[{\"property\":\"imei\",\"value\":\"" + o.Imei + "\"}]");

                        var datasearch = search.ExecuteAsDataTable( dsearch, out totalrowsserach);

                        awccusertoken = (Slbf.Data.DataService.ExecuteScalar("GetCreateToken", new Dictionary<string, object>() { { "@userId", datasearch.Rows[0]["udw_usuario"].ToString() } }) ?? "").ToString();
                  
                        var cue_clinea = datasearch.Rows[0]["cue_clinea"] as string;
                        var cue_ncuenta = datasearch.Rows[0]["cue_ncuenta"] as string;

                        var config = GetSmartPanicsConfig(cue_clinea, "OK");

                        logger.Trace("[SmartPanicLogin] preparo filter para buscar telefono: " + o.Telefono.ToString());
                        // busco el telefono y el usuario y actualizo los nombres del dispositivo
                        string _telfilter = "[{\"property\":\"tel_iidcuenta\",\"value\":\"" + o.CuentaId + "\"},{\"property\":\"tel_ctelefono:LIKE\",\"value\":\"" + o.Telefono.Substring(o.Telefono.Length - 8) + "\"}]";
                        logger.Trace("[SmartPanicLogin] Busco telefono con filter" + _telfilter);
                        var telsearch = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
                        telsearch.LoadByName("Telefono");
                        var teldatasearch = telsearch.ExecuteAsDataTable(new Dictionary<string, object>() { { "filter", _telfilter } }, out totalrowsserach);


                        int telid = 0;

                        if (teldatasearch.Rows.Count>0)
                        {
                            telid = int.Parse(teldatasearch.Rows[0]["tel_idKey"].ToString());
                            logger.Trace("Teléfono encontrado ID: " + telid.ToString());
                        }
                        else
                        {
                            logger.Trace("No hay teléfono creado, creo uno "+o.Telefono);
                            AsingarCuenta(o);
                            teldatasearch = telsearch.ExecuteAsDataTable(new Dictionary<string, object>() { { "filter", "[{\"property\":\"tel_iidcuenta\",\"value\":\"" + o.CuentaId + "\"},{\"property\":\"tel_ctelefono:LIKE\",\"value\":\"" + o.Telefono.Substring(o.Telefono.Length - 8) + "\"}]" } }, out totalrowsserach);
                            telid = int.Parse(teldatasearch.Rows[0]["tel_idKey"].ToString());
                        }

                        var tel = Slbf.ObjectFactoryService.CreateLoad<Telefono>(telid);


                        //si el nombre cambio, lo actualizo
                        if (tel.tel_cnombre != o.Nombre)
                        {
                            logger.Trace("Actualizo el telefono porque "+ tel.tel_cnombre + " es diferetente a "+o.Nombre);
                            tel.tel_iidcuenta = o.CuentaId;
                            tel.tel_cnombre = o.Nombre;
                            tel.Name = o.Nombre;
                            tel.tel_ctelefono = o.Telefono;
                            tel.tel_nsp = 1;
                            //tel.tel_clista = "";
                            //tel.tel_cclave = "";
                            tel.Save();
                        }
                        
                        // con el id del telefono cargo el usuario
                        int useriid = tel.tel_iid + 700;
                        
                        var usersearch = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
                        usersearch.LoadByName("Usuario");
                        var userdatasearch = usersearch.ExecuteAsDataTable(new Dictionary<string, object>() { { "filter", "[{\"property\":\"usu_iidcuenta\",\"value\":\"" + o.CuentaId + "\"},{\"property\":\"usu_iid\",\"value\":\"" + useriid + "\"}]" } }, out totalrowsserach);

                        int userid = 0;

                        if (userdatasearch.Rows.Count > 0)
                        {
                            userid = int.Parse(userdatasearch.Rows[0]["Id"].ToString());
                        }
                        else
                        {
                            logger.Trace("No hay usuario creado, creo uno " + o.Nombre);
                        }

                        
                        var user = Slbf.ObjectFactoryService.CreateLoad<Usuario>(userid);

                        //si el nombre cambio, lo actualizo
                        if (user.usu_cnombre != o.Nombre)
                        {
                            user.usu_cnombre = o.Nombre;
                            user.usu_iidcuenta = o.CuentaId;
                            user.Save();
                        }

                        if (Json.ConfigVersion() && !String.IsNullOrEmpty(Json.ConfigVersion.ToString() as string) && int.Parse(Json.ConfigVersion.ToString()) >= 3)
                        {
                            Out = "{" + "\"SmartPanic\":" + "{";
                            Out += "\"idcuenta\":" + o.CuentaId.ToString();
                            Out += ",\"cue_clinea\":\"" + cue_clinea + "\"";
                            Out += ",\"appVersions\":[\"3.0\",\"3.1\"]";
                            Out += ",\"HMACVERSION\":1";

                            Out += ",\"spid\":" + o.Id.ToString();


                            if (!String.IsNullOrEmpty(o.Nombre.ToString()))
                            {
                                Out += ",\"nombre\":" + "\"" + o.Nombre.ToString() + "\"";
                            }
                            if (telid > 0)
                            {
                                Out += ",\"tel_idKey\":" + "\"" + telid.ToString() + "\"";
                            }
                            if (!String.IsNullOrEmpty(o.Telefono.ToString()))
                            {
                                Out += ",\"telefono\":" + "\"" + o.Telefono.ToString() + "\"";
                            }
                            if (!String.IsNullOrEmpty(o.Config.ToString()))
                            {
                                Out += ",\"config\":" + o.Config.ToString();
                            }
                            if (!String.IsNullOrEmpty(o.GrupoId.ToString()))
                            {
                                Out += ",\"grupoid\":" + o.GrupoId.ToString();
                            }
                            if (!String.IsNullOrEmpty(o.awccUserId.ToString()))
                            {
                                Out += ",\"awccUserId\":" + o.awccUserId.ToString();
                            }
                            if (!String.IsNullOrEmpty(awccusertoken))
                            {
                                Out += ",\"awccusertoken\":" + "\"" + awccusertoken + "\"";
                            }

                            Out += "}" +
                            ",\"Config\":" + config
                            + "}";
                        } else if (Json.ConfigVersion() && !String.IsNullOrEmpty(Json.ConfigVersion.ToString() as string) && Json.ConfigVersion.ToString() == "2")
                        {
                            Out = "{" + "\"SmartPanic\":" + "{";

                            Out +="\"idcuenta\":" + o.CuentaId.ToString();

                            Out += ",\"appVersions\":[\"3.0\",\"3.1\"]";

                            Out += ",\"spid\":" + o.Id.ToString();

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
                            if (!String.IsNullOrEmpty(o.GrupoId.ToString()))
                            {
                                Out += ",\"grupoid\":" + o.GrupoId.ToString();
                            }
                            
                            Out += "}" +
                            ",\"Config\":" + config
                            + "}";
                        }
                        else
                        {
                            Out =  config;
                        }

                        logger.Trace("Reemplazo {clinea} {telefono} {ncuenta}");

                        Out = Out.Replace("{clinea}", cue_clinea);
                        Out = Out.Replace("{telefono}", tel.tel_ctelefono);
                        Out = Out.Replace("{ncuenta}", cue_ncuenta.Trim());
                        Out = Out.Replace("{idcuenta}", o.CuentaId.ToString());
                        //Out = useriid.ToString();// +' ' + telid.ToString();
                    }
                }
            }
            else
            {
                string msg = "Parameter 'Json' is empty or does not contain SimpleSmartPanic schema. Contact the system administrator";
                logger.Error(msg);
                throw new ApplicationException(msg);
            }


            logger.Trace("Me fijo si esta deshabilitado");
            if (o != null && o.Id != 0 && o.Config != "")
            {
                try
                {
                    logger.Trace("reempplazo valores dinammicos");
                    dynamic dconfig = DynamicJson.Parse(o.Config);

                    Out = replaceCamposExtra(Out, MetadataConfig, dconfig);
                    if (dconfig.userEnabled() && dconfig.userEnabled.ToString() == "0")
                    {
                        logger.Trace("El smartpanics esta deshabilitado");
                        Out = "{\"STATUS\":\"DISABLED\"}";
                    }
                }
                catch(Exception e)
                {
                    logger.Trace("Error al reemplazar valores en:" + o.Config);
                    logger.Error(e.Message);
                    logger.Error(e.StackTrace);
                }
            }

            // reempplazo valores dinammicos
            try
            {
                logger.Trace("reempplazo valores dinammicos");
                Out = Out.Replace("{token}", awccusertoken.Trim());
                Out = Out.Replace("{imei}", Json.Imei.ToString().Trim());
                Out = Out.Replace("{telefono}", o.Telefono.ToString().Trim());
                Out = Out.Replace("{idcuenta}", o.CuentaId.ToString().Trim());
                Out = Out.Replace("{spid}", o.Id.ToString().Trim());

                logger.Trace("[SmartPanicLogin] SPID utilizado: " + o.Id.ToString());
            }
            catch (Exception e)
            {
                logger.Trace("Error al reemplazar valores en:" + Out);
                logger.Error(e.Message);
                logger.Error(e.StackTrace);
            }


            logger.Trace("[SMARTPANICS] Response Config Login:"+Out);
            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Out));
        }

        private string replaceCamposExtra(string _out, dynamic MetadataConfig, dynamic spconfig)
        {
            try
            {
                logger.Trace("[SMARTPANICS] busco los campos extra "+ MetadataConfig.IsDefined("extraFieldConfig").ToString()+ MetadataConfig.extraFieldConfig.ToString()); 
                if (MetadataConfig.IsDefined("extraFieldConfig") && !string.IsNullOrEmpty(MetadataConfig.extraFieldConfig.ToString()))
                {
                    string extraFieldConfig = MetadataConfig.extraFieldConfig.ToString();
                    logger.Trace("[SMARTPANICS] extraFieldConfig:" + extraFieldConfig);
                    logger.Trace("[SMARTPANICS] busco campos a reemplazar:" + _out);
                    string pattern = @"{(\w*?)}";
                    MatchCollection matches = Regex.Matches(_out, pattern);
                    foreach (Match match in matches)
                    {
                        string captured = match.Groups[0].Value;
                        string field = captured.Replace("{", "").Replace("}", "");
                        logger.Trace("[SMARTPANICS] match de campo a reemplazar: " + field);
                        if (!string.IsNullOrEmpty(field) && spconfig.IsDefined(field))
                        {
                            string value = spconfig[field].ToString();
                            _out = _out.Replace(captured, value);
                        }
                    }

                    // por cada campo busco el valor y lo reemplazo

                }
            }
            catch (Exception e)
            {
                logger.Error(e.Message);
            }

            return _out;
        }

        private string analizoCreoCuenta(SimpleSmartPanic o, dynamic MetadataConfig, dynamic Json)
        {
            string Out = "";
            // si hay una cuenta configurada uso esa, sino va cero
            int iddefaultaccount = 0;
            logger.Trace("[SMARTPANICS] me fijo el valor de DEFAULTIDCUENTA");
            if (MetadataConfig.IsDefined("DEFAULTIDCUENTA") && MetadataConfig.DEFAULTIDCUENTA != null && MetadataConfig.DEFAULTIDCUENTA.ToString() != "" && int.Parse(MetadataConfig.DEFAULTIDCUENTA) != 0)
            {
                iddefaultaccount = int.Parse(MetadataConfig.DEFAULTIDCUENTA.ToString());
                logger.Trace("[SMARTPANICS] DEFAULTIDCUENTA:" + iddefaultaccount.ToString());
            }

            var config = GetSmartPanicsConfig("", "OK");
            int cuentaid = 0;
            string cuentastring = Json.CuentaId() ? Json.CuentaId.ToString() ?? "" : "";
            int.TryParse(cuentastring, out cuentaid);

            int grupoid = 0;
            string grupostring = Json.GrupoId() ? Json.GrupoId.ToString() ?? "" : "";
            int.TryParse(grupostring, out grupoid);

            int appTypeParsed = 0;
            if (Json.AppType() && Json.AppType != null)
            {
                int.TryParse(Json.AppType.ToString(), out appTypeParsed);
            }

            var incomingName = Json.Name() ? (Json.Name ?? "") : "";
            if (string.IsNullOrWhiteSpace(incomingName) && Json.Nombre() && Json.Nombre != null)
            {
                incomingName = Json.Nombre;
            }

            var s = new SimpleSmartPanic()
            {
                Name = incomingName,
                Telefono = Json.Telefono() ? Json.Telefono ?? "" : "",
                Imei = Json.Imei() ? Json.Imei ?? "" : "",
                Modelo = Json.Modelo() ? Json.Modelo ?? "" : "",
                Marca = Json.Marca() ? Json.Marca ?? "" : "",
                Version = Json.Version() ? Json.Version ?? "" : "",
                Tipo = Json.Tipo() ? Json.Tipo ?? "" : "",
                Nombre = Json.Nombre() ? Json.Nombre ?? "" : "",
                GrupoId = Json.GrupoId() ? grupoid : 0,
                CuentaId = Json.CuentaId() ? cuentaid : iddefaultaccount,
                pushToken = Json.pushToken() ? Json.pushToken ?? "" : "",
                AppVersion = Json.AppVersion() ? Json.AppVersion ?? "" : "",
                AppType = appTypeParsed,
                Config = ""
            };
            o = this.Create(s) as SimpleSmartPanic;


            // asigno la cuenta al SP
            if (o.CuentaId != 0)
            {
                // asigno la cuenta
                AsingarCuenta(o);

                if (Json.ConfigVersion() && !String.IsNullOrEmpty(Json.ConfigVersion.ToString() as string) && (Json.ConfigVersion.ToString() == "2" || Json.ConfigVersion.ToString() == "3"))
                {
                    Out = "{" + "\"SmartPanic\":" + "{";
                    Out += "\"idcuenta\":" + o.CuentaId.ToString();
                    Out += ",\"spid\":" + o.Id.ToString();

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
                    if (!String.IsNullOrEmpty(o.GrupoId.ToString()))
                    {
                        Out += ",\"grupoid\":" + o.GrupoId.ToString();
                    }

                    Out += "}" +
                    ",\"Config\":" + config
                    + "}";
                }
                else
                {
                    Out = config;
                }
            }
            else
            {
                Out = "{\"STATUS\":\"CTANOASIGN\"}";
            }
            return Out;
        }

        private static string GetSmartPanicsConfig(string cue_clinea,string estado)
        {

            string config;
            int total;
            // me fijo si hay configuracion por dealer.
            SearchObject m_dealer_spconfig = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
            m_dealer_spconfig.LoadByName("m_dealer_spconfig");
            DataTable datasearch = m_dealer_spconfig.ExecuteAsDataTable(
                new Dictionary<string, object>()
                    {
                        { "filter", "{\"Property\":\"dsp_cdealer\",\"Value\":\""+cue_clinea+"\"}"}
                    }
                , out total
            );

            if (total > 0)
            {
                config = datasearch.Rows[0]["dsp_config"].ToString();
                logger.Trace("Configuracion por dealer " + cue_clinea + " :" + config);
               
            }
            else
            {
                logger.Trace("No hay conf dealer devuelvo  global");
                dynamic result = GetSmartPanicsMetadata();
                config = result.Config as string;
            }

            var str = config
    .Replace("{cue_clinea}", cue_clinea)
    .Replace("{clinea}", cue_clinea)
    .Replace("{estado}", estado)
    .Replace("{idcuenta}", idcuenta.ToString());

            logger.Trace("Configuracion: " + config);

            return str;
        }

        private static string GetLandingUrlConfig(string _config)
        {
            string url = "";

            Regex regex = new Regex("\"LandingMobileURL\":\"(.*?)\"");
            Match match = regex.Match(_config);

            if (match.Success)
            {
                url = match.Groups[1].Value;
            }

            return url;
        }

        private static string GetSmartPanicsConfig()
        {
            dynamic result;
            dynamic m = GetSmartPanicsMetadata();
            
            string config;

            try // horrible, mejorar para testear si la propiedad existe (exapandobject?)
            {
                config = m.Config as string;
                result = DynamicJson.Parse(config);
                logger.Trace("GetSmartPanicsConfig() " + config);
            }
            catch
            {
                throw new ApplicationException("SmartPanics Metadata does not contains 'Config' key or is empty. Contact the system administrator");
            }

            return config;
        }

        private static dynamic GetSmartPanicsMetadata()
        {
            var uia = Slbf.ObjectFactoryService.Create<Slbf.UI.UIApplication>();
            uia.LoadByName("SmartPanics");
            if (uia == null)
                throw new ApplicationException("UIApplication SmartPanics cannot be loaded. Contact the system administrator");

            dynamic m = uia.Metadata();
            //logger.Trace("uiapplication " + DynamicJson.Serialize(uia));

            if (m == null)
                throw new ApplicationException("SmartPanics Metadata is null. Contact the system administrator");

            return m;
        }

        private workflow getWorkFlow(string imei)
        {
            int assignout = 0;
            workflow wf = null;

            SearchObject swflw = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
            swflw.LoadByName("validateLandingUserAccountPending");
            DataTable datasearch = swflw.ExecuteAsDataTable(
                new Dictionary<string, object>()
                    {
                        { "imei", imei }
                    }
                , out assignout
            );

            if (assignout > 0)
            {
                DataRow rwflw = datasearch.Rows[0];

                wf = new workflow(rwflw);

            }

            return wf;
            
        }

        private static int AsingarCuenta(SimpleSmartPanic o)
        {
            int assignout = 0;
            var assignsearch = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
            assignsearch.LoadByName("SmartPanicAsignarCuenta");
            var datasearch = assignsearch.ExecuteAsDataTable(
                new Dictionary<string, object>()
                    {
                        { "SmartPanicId", o.Id },
                        {"CuentaId",o.CuentaId}
                    }
                , out assignout
            );

            return assignout;
        }
    }

    public class workflow
    {
        public string Imei;
        public dynamic dMetadata;
        public string sMetadata;
        public string Telefono;
        public int estado;

        public workflow(DataRow rwkflw)
        {
            Imei = rwkflw["plw_imei"].ToString();
            sMetadata = rwkflw["plw_metadata"].ToString();
            dMetadata = DynamicJson.Parse(sMetadata);
            Telefono = dMetadata["telefono"].ToString();
            estado = int.Parse(rwkflw["plw_status"].ToString());

        }
    }
}
																
