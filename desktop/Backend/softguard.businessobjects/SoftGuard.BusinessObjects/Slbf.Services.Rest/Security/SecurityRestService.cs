using System;
using System.Xml;
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
using Slbf.OAuth;
using System.Runtime.Serialization;
using Slbf.Helpers;
using SoftGuard.BusinessObjects.Tables;
using SoftGuard.BusinessObjects.Reports;
using SoftGuard.BusinessObjects.Security;
using Slbf.Security;
using System.IO;
using NLog;

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

    public class SecurityRestService
    {
        private Logger logger = LogManager.GetCurrentClassLogger();
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>()
            {
                typeof(KeyModule),
                typeof(CustomerInfo),
                typeof(UserModule),
                typeof(Permission),
                typeof(Line),
                typeof(bool),
                typeof(KeyModuleSecurity)
            };            
        }

        public static Exception CurrentException = null;
        [WebGet(UriTemplate = "Exception", ResponseFormat = WebMessageFormat.Json)]
        public String GetException()
        {
            string Out = "-null-";
            if (CurrentException != null)
            {
                Out = CurrentException.GetType().FullName
                    + ", Message: " + CurrentException.Message
                    + ", Stack: " + CurrentException.StackTrace
                    + ", HasInnerException: " + (CurrentException.InnerException != null);
            }
            return Out;
        }
        [WebGet(UriTemplate = "Exception/Clear", ResponseFormat = WebMessageFormat.Json)]
        public bool GetExceptionClear()
        {
            if (CurrentException == null)
                return false;
            else
            {
                CurrentException = null;
                return true;
            }
        }

        [WebGet(UriTemplate = "UserData")]
        public UserData GetUserData()
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                return Manager.GetUserData(UserName);
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        [WebInvoke(UriTemplate = "ChangePassword?OldPassword={OldPassword}&NewPassword={NewPassword}", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public bool ChangePassword(string OldPassword, string NewPassword)
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                return System.Web.Security.Membership.Provider.ChangePassword(UserName, OldPassword, NewPassword);
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        [WebGet(UriTemplate = "Modules")]
        public IEnumerable<UserModule> GetModules()
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                string _config = ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString;
                logger.Trace("Slbf connectionstring :" + _config);
                Token Token = new Token(_config);

                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);
                logger.Trace("userId:" + UserName);
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                IEnumerable<UserModule> Result = Manager.GetModulesForUser(UserName);
                logger.Trace("devuelvo los modulos:"+Result.Count().ToString());
                return Result;
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
                logger.Error(ex.StackTrace);
                CurrentException = ex;
                throw;
            }
        }
        [WebGet(UriTemplate = "KeyModules")]
        public List<KeyModule> GetKeyModules()
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                return Manager.GetKeyModules();
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        [WebGet(UriTemplate = "KeyCustomerInfo")]
        public CustomerInfo GetKeyCustomerInfo()
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                return Manager.GetKeyCustomerInfo();
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
            
        }
        [WebGet(UriTemplate = "MetaData")]
        public System.IO.Stream GetUserMetaData()
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                var Json = GetUserMetaDataByToken(OAuth_Token);

                WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Json));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        
        public string GetUserMetaDataByToken(string token)
        {
            string OAuth_Token = token;

            Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

            SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            string Json = Manager.GetMetaDataForUser(0, UserName);

            return Json;
        }

        [WebGet(UriTemplate = "UserData/{UserId}/MetaData")]
        public System.IO.Stream GetUserMetaDataForId(string UserId)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string Json = Manager.GetMetaDataForUser(int.Parse(UserId), "");

                WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Json));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        [WebInvoke(UriTemplate = "MetaData", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream SetUserMetaData()
        {
            try
            {
                string MetaData = System.Web.HttpContext.Current.Request.Form.ToString();
                MetaData = System.Web.HttpUtility.UrlDecode(MetaData);

                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string Json = Manager.SetMetaDataForUser(0, UserName, MetaData);

                WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Json));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        [WebInvoke(UriTemplate = "UserData/{UserId}/MetaData", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream SetUserMetaDataForId(string UserId, Stream postData)
        {
            try
            {
                string MetaData = null;// System.Web.HttpContext.Current.Request.Form.ToString();
                if (String.IsNullOrEmpty(MetaData))
                {
                    var postDataStream = new StreamReader(postData);
                    MetaData = postDataStream.ReadToEnd();
                }
                MetaData = System.Web.HttpUtility.UrlDecode(MetaData);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string Json = Manager.SetMetaDataForUser(int.Parse(UserId), "", MetaData);

                WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Json));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        [WebGet(UriTemplate = "Modules/{ModuleId}/CheckQuantityOfUsers")]
        public KeyModuleSecurity CheckQuantityOfUsersForModule(string ModuleId)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                return Manager.CheckQuantityOfUsersForModule(int.Parse(ModuleId));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }

        }
        [WebInvoke(UriTemplate = "Modules/{ModuleId}/MetaData", Method = "PUT", ResponseFormat = WebMessageFormat.Json)]
        public UserModule SetModuleMetaData(string ModuleId, string MetaData)
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                return Manager.SetModuleMetaDataForUser(UserName, int.Parse(ModuleId), MetaData);
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        [WebInvoke(UriTemplate = "Modules/{ModuleId}/Security", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public UserModule SetModuleSecurity(string ModuleId)
        {
            try
            {
                string MetaData = System.Web.HttpContext.Current.Request.Form.ToString();
                MetaData = System.Web.HttpUtility.UrlDecode(MetaData);

                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                return Manager.SetModuleSecurityForUser(UserName, int.Parse(ModuleId), MetaData);
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        [WebInvoke(UriTemplate = "Modules/{ModuleId}/Security/{Username}", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public UserModule SetModuleSecurityByUsername(string ModuleId, string Username, Stream PostData)
        {
            try
            {
                // obtengo el nombre del usuario logueado
                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string _admin = Token.GetUserIdForAccessToken(OAuth_Token);


                //string MetaData = System.Web.HttpContext.Current.Request.Form.ToString();
                string MetaData = null;// System.Web.HttpContext.Current.Request.Form.ToString();
                if (String.IsNullOrEmpty(MetaData))
                {
                    var PostDataStream = new StreamReader(PostData);
                    MetaData = PostDataStream.ReadToEnd();
                }
                MetaData = System.Web.HttpUtility.UrlDecode(MetaData);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);

                logger.Trace("[SetModuleSecurityByUsername] token:"+ OAuth_Token);

                return Manager.SetModuleSecurityForUser(Username, int.Parse(ModuleId), MetaData, OAuth_Token);
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        [WebInvoke(UriTemplate = "Modules/{ModuleId}/Security", Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream GetModuleSecurity(string ModuleId)
        {
            try
            {
                string OAuth_Token = UserService.GetToken();

                Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string UserName = Token.GetUserIdForAccessToken(OAuth_Token);

                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string Json = Manager.GetModuleSecurityForUser(UserName, int.Parse(ModuleId));

                WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Json));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        [WebInvoke(UriTemplate = "Modules/{ModuleId}/Security/{Username}", Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream GetModuleSecurityByUsername(string ModuleId, string Username)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                string Json = Manager.GetModuleSecurityForUser(Username, int.Parse(ModuleId));

                WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
                return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Json));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        #region AWCC
        [WebInvoke(UriTemplate = "AWCC/AsignarCuentas/{Login}/{CueIId}", Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public void AWCC_AsignarCuentasAdd(string Login, string CueIId)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                Manager.AWCC_AsignarCuentas("A", Login, int.Parse(CueIId));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        [WebInvoke(UriTemplate = "AWCC/AsignarCuentas/{Login}/{CueIId}", Method = "DELETE", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public void AWCC_AsignarCuentasDelete(string Login, string CueIId)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                Manager.AWCC_AsignarCuentas("B", Login, int.Parse(CueIId));
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }

        [WebInvoke(UriTemplate = "AWCC/Usuarios", Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public ResultadoMensaje AWCC_UsuariosAdd(AWCCUser User)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                var Out = Manager.AWCC_Usuarios("A", User);
                return Out;
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        [WebInvoke(UriTemplate = "AWCC/Usuarios", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public ResultadoMensaje AWCC_UsuariosChange(AWCCUser User)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                var Out = Manager.AWCC_Usuarios("M", User);
                return Out;
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }
        [WebInvoke(UriTemplate = "AWCC/Usuarios", Method = "DELETE", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public void AWCC_UsuariosDelete(AWCCUser User)
        {
            try
            {
                SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
                Manager.AWCC_Usuarios("B", User);
            }
            catch (Exception ex)
            {
                CurrentException = ex;
                throw;
            }
        }   

        #endregion
        /*[WebGet(UriTemplate = "Lines")]
        public IEnumerable<Line> GetLines()
        {
            string OAuth_Token = UserService.GetToken();
            Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            string UserData = Token.GetUserData(OAuth_Token);

            XmlDocument XmlUserData = new XmlDocument();
            XmlUserData.LoadXml(UserData);

            XmlNode XmlNodeLines = XmlUserData.SelectSingleNode("/Data/Lines");
            foreach (XmlNode Line in XmlNodeLines.ChildNodes)
            {
                Line l = new Line();
                l.Id = Line.Attributes["Id"].Value;
                l.Name = Line.Attributes["Name"].Value;
                l.RangeStart = int.Parse(Line.Attributes["RangeStart"].Value);
                l.RangeEnd = int.Parse(Line.Attributes["RangeEnd"].Value);
                yield return l;
            }
        }

        [WebGet(UriTemplate = "Lines/{Id}")]
        public Line GetLineById(string Id)
        {            
            return (from x in GetLines()
                   where x.Id == Id
                   select x).FirstOrDefault();
        }*/

        /*[WebGet(UriTemplate = "Permissions?Module={Module}")]
        public IEnumerable<Permission> GetPermissionsForUserAndModule(string Module)
        {
            string OAuth_Token = UserService.GetToken();

            Token Token = new Token(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            string UserId = Token.GetUserIdForAccessToken(OAuth_Token);

            SecurityManager Manager = new SecurityManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            IEnumerable<Permission> Result = Manager.GetPermissionsForUserAndType(UserId, Module);

            return Result;
        }           */            
    }
}
																
