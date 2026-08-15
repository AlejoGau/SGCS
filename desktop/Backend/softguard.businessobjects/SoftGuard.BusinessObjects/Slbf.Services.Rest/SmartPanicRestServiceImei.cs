

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Slbf.Objects;
using Slbf;
using NLog;
using System.Configuration;
using System.Data.SqlClient;

namespace SoftGuard.BusinessObjects.Rest
{
    public partial class SmartPanicRestService
    {
        private static string GetDbFingerprint()
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["Slbf"];
                if (cs == null || string.IsNullOrEmpty(cs.ConnectionString))
                    return "Slbf connection string not found";

                var builder = new SqlConnectionStringBuilder(cs.ConnectionString);
                return "DataSource=" + builder.DataSource + ";InitialCatalog=" + builder.InitialCatalog;
            }
            catch (Exception ex)
            {
                return "DB fingerprint error: " + ex.Message;
            }
        }

        [WebGet(UriTemplate = "/Imei/{imei}", RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleSmartPanic GetByImei(string imei)
        {
            var o = Slbf.Data.DataService.ExecuteScalar("SmartPanicIdByImei", new Dictionary<string, object>() { { "Imei", imei } });
            LogManager.GetCurrentClassLogger().Trace("[SmartPanicByImei] imei=" + imei
                + " | scalar=" + (o == null ? "null" : o.ToString())
                + " | scalarType=" + (o == null ? "null" : o.GetType().FullName)
                + " | db=" + GetDbFingerprint());
            if (o != null && o is int)
            {
                var i = (int)o;
                LogManager.GetCurrentClassLogger().Trace("[SmartPanicByImei] resolvedId=" + i);
                return this.Get(i.ToString()) as SimpleSmartPanic;
            }
            else
            {
                LogManager.GetCurrentClassLogger().Trace("[SmartPanicByImei] id not resolved as Int32");
                return null;
            }
        }

        [WebGet(UriTemplate = "/Telefono/{telefono}/AppType/{apptype}", RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]

        public SimpleSmartPanic GetByTelefono(string telefono, string apptype)
        {

            Dictionary<string, object> parameters = new Dictionary<string, object>();
            parameters.Add("Telefono", telefono);
            parameters.Add("AppType", apptype);

            var o = Slbf.Data.DataService.ExecuteScalar("SmartPanicIdByTelefono", parameters);
            LogManager.GetCurrentClassLogger().Trace("[SmartPanicByTelefono] telefono=" + telefono
                + " | appType=" + apptype
                + " | scalar=" + (o == null ? "null" : o.ToString())
                + " | scalarType=" + (o == null ? "null" : o.GetType().FullName)
                + " | db=" + GetDbFingerprint());
            if (o != null && o is int)
            {
                var i = (int)o;
                LogManager.GetCurrentClassLogger().Trace("[SmartPanicByTelefono] resolvedId=" + i);
                return this.Get(i.ToString()) as SimpleSmartPanic;
            }
            else
            {
                LogManager.GetCurrentClassLogger().Trace("[SmartPanicByTelefono] id not resolved as Int32");
                return null;
            }
        }
    }
}
																
