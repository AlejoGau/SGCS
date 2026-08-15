using System;
using System.Xml;
using System.Web;
using System.Net;
using System.Web.Security;
using System.Configuration;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using Slbf;
using Slbf.Data;
using Slbf.Json;
using Slbf.OAuth;
using SoftGuard.BusinessObjects.Security;
using NLog;

namespace SoftGuard.OAuth
{
    public class OAuthLoginHandler : IHttpHandler
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        #region IHttpHandler Members
        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest Request = context.Request;
            HttpResponse Response = context.Response;
            
            string ClientId = (Request.Params["ClientId"] != null) ? Request.Params["ClientId"] : "";
            string cDealer = (Request.Params["cDealer"] != null) ? Request.Params["cDealer"] : "";
            string Username = (Request.Params["Username"] != null) ? Request.Params["Username"].Trim() : "";
            string Password = (Request.Params["Password"] != null) ? Request.Params["Password"] : "";
            string captchaToken = (Request.Params["g-recaptcha-response"] != null) ? Request.Params["g-recaptcha-response"] : "";

            string CAPTCHA = (Slbf.Data.DataService.ExecuteScalar("t_parametrosGetmobservacionByCodigo", new Dictionary<string, object>() { { "@par_ccodigo", "CAPTCHA" } }) ?? "").ToString();

            string _loginUrl = getLoginUrl(ClientId, cDealer);

            if (!String.IsNullOrEmpty(CAPTCHA))
            {
                if ( !string.IsNullOrEmpty(captchaToken))
                {
                    if (!ValidateCaptcha(captchaToken, CAPTCHA))
                    {
                        logger.Error("Captcha inválido");
                        Response.Redirect(_loginUrl, true);
                    }
                }
                else
                {
                    logger.Error("Captcha vacio");
                    Response.Redirect(_loginUrl, true);
                }
            }

            if (ClientId.Length == 0 || Username.Length == 0 || Password.Length == 0)
            {
                logger.Error("Login sin datos, revisar clientid y tabla de Application");
                Response.Redirect(_loginUrl, true);
            }

            try
            {
                int loginSuccess = Membership.ValidateUser(Username, Password) ? 1 : 0;
                int blockingValidationSuccess = ValidateBlocking(Username, loginSuccess);
                if (blockingValidationSuccess == 1)
                {
                    // verifico si tiene cookie
                    if (Request.Cookies["OAuth_Token"] != null)
                    {
                        // tiene cookie, elimino el token de la base.
                        string t = Request.Cookies["OAuth_Token"].Value;

                        // si tiene cookie devuelvo al login
                        if (Request["deletetoken"] != "true" && Request["forceOpenModule"] != "WebRemoto")
                        {
                            Response.Redirect(_loginUrl);
                        }

                    }

                    // actualizo el perfil del usuario si es que vino del membership
                    try
                    {
                        if (System.Web.Security.Roles.Enabled)
                        {
                            logger.Trace(Roles.Provider.ToString());

                            // listo los roles del usuario
                            string[] aroles;
                            aroles = Roles.GetRolesForUser(Username);

                            string sroles = string.Join(",", aroles);
                            logger.Trace("Roles del usuario: " + Username + "= " + sroles);

                            using (SqlConnection Conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString))
                            using (SqlCommand Cmd = new SqlCommand("replaceUserRoles", Conn))
                            {
                                Cmd.CommandType = System.Data.CommandType.StoredProcedure;
                                Cmd.Parameters.Add(new SqlParameter("@username", SqlDbType.NVarChar)).Value = Username;
                                Cmd.Parameters.Add(new SqlParameter("@roles", SqlDbType.NVarChar)).Value = sroles;

                                Conn.Open();
                                string result = (string)Cmd.ExecuteScalar() ?? "";

                                logger.Trace("Se aplicaron los roles al usuario " + Username + " con resultado:" + result);
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        logger.Error("Error al actualizar roles:" + e.Message);
                        var message = "";
                        {
                            var header = "Error no manejado: ";
                            var err = e;
                            while (err != null)
                            {
                                if (err.Message != null)
                                {
                                    message += header + err.Message + "\r\n";
                                }

                                if (err.StackTrace != null)
                                {
                                    message += err.StackTrace + "\r\n";
                                }

                                if (err.Source != null)
                                {
                                    message += "Source: \r\n";
                                    message += err.Source;
                                }

                                header = "InnerException: ";
                                err = err.InnerException;
                            }
                        }

                        logger.Fatal(message);
                    }

                    string token = Request["token"] ?? Request["OAuth_Token"];
                    // borro de la tabla de token
                    if (!String.IsNullOrEmpty(token))
                    {
                        var t = Slbf.ObjectFactoryService.Create<Slbf.Objects.SearchObject>();
                        t.LoadByName("tokenDel");
                        var td = new System.Collections.Generic.Dictionary<string, object>() { };
                        td.Add("token", token);
                        int total = 0;
                        t.ExecuteAsDataTable(td, out total);
                    }

                    /*
                    XmlDocument XmlUserData = new XmlDocument();
                    XmlUserData.LoadXml("<Data><Lines/></Data>");                           
                    */
                    // cambio XML vacio por IP remota
                    string remoteIp = Request.UserHostAddress;
                    logger.Trace("remoteIp :" + remoteIp.ToString());

                    //CREATE TOKEN
                    Application OAuthApp = new Application(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                    string OAuthCallback = OAuthApp.GetRequestURI(ClientId);

                    Token OAuthToken = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                    //string Code = OAuthToken.CreateToken(ClientId, Username, XmlUserData.InnerXml);
                    string Code = OAuthToken.CreateToken(ClientId, Username, remoteIp);

                    //REDIRECT QUERYSTRING                        
                    NameValueCollection parameters = HttpUtility.ParseQueryString(Request.QueryString.ToString());

                    //REMOVE PARAMETERS
                    parameters.Remove("ClientId");
                    parameters.Remove("Username");
                    parameters.Remove("Password");

                    //ADD PARAMETERS
                    parameters.Add("UserId", Username);
                    parameters.Add("Code", Code);

                    string QueryString = "&" + ConstructQueryString(parameters);

                    //REDIRECT                
                    Response.Redirect(OAuthCallback + QueryString, true);
                }
                else
                {
                    logger.Trace("[OAUTHLOGINHANDLER] Usuario o contraseña invalidos o bien usuario bloqueado por cantidad de intentos");

                    //Return
                    Response.Redirect("OAuthLogin.aspx?Login=false&blocking=" +  blockingValidationSuccess, true);
                }
            }
            catch (SgInvalidKeyException ex)
            {
                Response.StatusCode = 402;
            }
        }

        private static string getLoginUrl(string ClientId, string cDealer)
        {
            string ErrorRequestURI = "";
            using (SqlConnection Conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString))
            using (SqlCommand Cmd = new SqlCommand("SELECT ErrorRequestURI FROM Application WHERE ClientId = @ClientId", Conn))
            {
                Cmd.CommandType = System.Data.CommandType.Text;
                Cmd.Parameters.Add(new SqlParameter("@ClientId", SqlDbType.NVarChar)).Value = ClientId;

                Conn.Open();
                ErrorRequestURI = Cmd.ExecuteScalar().ToString().Trim();
                if (ErrorRequestURI.Length == 0)
                {
                    if (string.IsNullOrEmpty(cDealer))
                    {
                        ErrorRequestURI = "OAuthLogin.aspx?Login=false";
                    }
                    else
                    {
                        ErrorRequestURI = "OAuthLogin.aspx?Login=false&cdealer=" + cDealer;
                    }
                }
            }

            return ErrorRequestURI;
        }
        public static int ValidateBlocking(string Username, int loginSuccess)
        {
            // Log parameters
            Console.WriteLine("Username: " + Username);
            Console.WriteLine("Login Success: " + loginSuccess);
            int loginResult = 0;
            using (SqlConnection Conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString))
            using (SqlCommand Cmd = new SqlCommand("_Desktop..SoftGuard_MembershipProvider_ValidateBlocking", Conn))
            {
                Cmd.CommandType = System.Data.CommandType.StoredProcedure;
                Cmd.Parameters.Add(new SqlParameter("@Username", SqlDbType.NVarChar)).Value = Username;
                Cmd.Parameters.Add(new SqlParameter("@Loginsuccess", SqlDbType.TinyInt)).Value = loginSuccess;

                Conn.Open();
                loginResult = (int)Cmd.ExecuteScalar();
            }

            return loginResult;
        }
        private static String ConstructQueryString(NameValueCollection parameters)
        {
            List<string> items = new List<string>();

            foreach (String name in parameters)
                items.Add(String.Concat(name, "=", System.Web.HttpUtility.UrlEncode(parameters[name])));

            return String.Join("&", items.ToArray());
        }

        private static bool ValidateCaptcha(string token, string captchaConfig)
        {
            bool _result = false;
            try
            {
                dynamic dCapchaConfig = DynamicJson.Parse(captchaConfig);

                string key = dCapchaConfig.key.ToString();
                string secret = dCapchaConfig.secret.ToString();
                using (WebClient client = new WebClient())
                {
                    string _url = string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secret, token);
                    var GoogleReply = client.DownloadString(_url);
                    logger.Trace("[ValidateCaptcha] respuesta: " + GoogleReply);
                    dynamic dResponse = DynamicJson.Parse(GoogleReply);

                    if (dResponse.success.ToString().ToLower() == "true")
                    {
                        _result = true;
                    }
                    else
                    {
                        logger.Error("Error en captcha: "+ _url+" " + GoogleReply);
                    }
                }
            }
            catch (Exception e)
            {
                logger.Error("Error no controlado en captcha " + e.Message);
            }
            

            return _result;
        }
        #endregion
    }
}


