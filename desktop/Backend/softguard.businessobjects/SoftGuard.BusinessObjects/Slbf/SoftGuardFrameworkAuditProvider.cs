using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration.Provider;
using System.Data.SqlClient;
using System.Data;
using Slbf;
using Slbf.Helpers;
using System.Configuration;
using NLog;

namespace SoftGuard.Audit
{
    public class SoftGuardFrameworkAuditProvider : FrameworkAuditProvider
    {
        Logger logger = NLog.LogManager.GetCurrentClassLogger();

        public SqlHelper SqlConfig { get; private set; }

        public override void Audit(FrameworkObject Obj, FrameworkSecurityEventArgs Args, string XmlOld, string XmlNew)
        {
            /*
             * lo comento porque pasa por aca todo el tiempo
            logger.Trace("Guardar auditoria "+Obj.Name+" "+Args.FunctionName);
            logger.Trace(XmlOld);
            logger.Trace(XmlNew);
            */

            SqlConnection Conn = new SqlConnection(SqlConfig.GetConnString());
            SqlCommand Cmd = new SqlCommand("SoftGuard_FrameworkAuditSet", Conn);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@UserId", Args.UserId);
            Cmd.Parameters.AddWithValue("@ObjectTypeId", Obj.Type.Id);
            Cmd.Parameters.AddWithValue("@ObjectId", Obj.Id);
            Cmd.Parameters.AddWithValue("@FunctionName", Args.FunctionName);
            Cmd.Parameters.AddWithValue("@XmlOld", String.IsNullOrEmpty(XmlOld) ? DBNull.Value : (object)XmlOld);
            Cmd.Parameters.AddWithValue("@XmlNew", String.IsNullOrEmpty(XmlNew) ? DBNull.Value : (object)XmlNew);
            Cmd.Parameters.AddWithValue("@Token", Obj.Token);
            if (System.Web.HttpContext.Current.Request.Params["debug"] == "true") {
                System.Web.HttpContext.Current.Response.Write("ok" + Obj.Type.Id + "_" + Obj.Id);
                System.Web.HttpContext.Current.Response.End();
                return;
            }
            try
            {
                Conn.Open();
                Cmd.ExecuteNonQuery();
            }
            catch(Exception e)
            {
                logger.Error("Error al guardar auditoria XMLold, XMLnew:");
                logger.Error(XmlOld);
                logger.Error(XmlNew);
            }
            finally
            {
                if (Conn.State != ConnectionState.Closed)
                    Conn.Close();
            }            
        }
        public override void Initialize(string name, System.Collections.Specialized.NameValueCollection config)
        {
            // Verify that config isn't null
            if (config == null)
                throw new ArgumentNullException("config");

            // Assign the provider a default name if it doesn't have one
            if (String.IsNullOrEmpty(name))
                name = this.GetType().Name;

            // Add a default "description" attribute to config if the
            // attribute doesn't exist or is empty
            if (string.IsNullOrEmpty(config["description"]))
            {
                config.Remove("description");
                config.Add("description", "User provider");
            }

            base.Initialize(name, config);

            SqlConfig = new SqlHelper();
            var ConnectionStringName = GetConfigValue(config["connectionStringName"], null) ?? GetConfigValue(config["connectionString"], null);
            string ConnectionString = null;
            if (!String.IsNullOrEmpty(ConnectionStringName))
            {
                ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringName].ConnectionString;
                SqlConfig.SetConfig(ConnectionString);
            }
            else if ((SqlConfig = ObjectFactoryService.GetInstance().GetSqlHelper(typeof(SlbfFrameworkAuditProvider)))!= null)
            {
                //OK!
            }
            else if (Convert.ToBoolean(GetConfigValue(config["useAppSettings"], "true")))
            {
                SqlConfig.SetConfig(ConfigurationManager.AppSettings["DataBase.Server"], ConfigurationManager.AppSettings["DataBase.Name"], ConfigurationManager.AppSettings["DataBase.User"], ConfigurationManager.AppSettings["DataBase.Password"]);
            }
        }       
        
        private string GetConfigValue(string configValue, string defaultValue)
        {
            if (String.IsNullOrEmpty(configValue))
                return defaultValue;

            return configValue;
        }
    }
}
