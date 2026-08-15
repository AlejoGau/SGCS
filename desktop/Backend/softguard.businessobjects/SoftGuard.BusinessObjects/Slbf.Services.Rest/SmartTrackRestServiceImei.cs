

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

namespace SoftGuard.BusinessObjects.Rest
{
    public partial class SmartTrackRestService
    {

        [WebGet(UriTemplate = "/Imei/{imei}", RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleSmartTrack GetByImei(string imei)
        {
            var o = Slbf.Data.DataService.ExecuteScalar("SmartTrackIdByImei", new Dictionary<string, object>() { { "Imei", imei } });
            if (o != null && o is int)
            {
                var i = (int)o;
                return this.Get(i.ToString()) as SimpleSmartTrack;
            }
            else
            {
                return null;
            }
        }

        [WebGet(UriTemplate = "/Telefono/{telefono}", RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleSmartTrack GetByTelefono(string telefono)
        {
            var o = Slbf.Data.DataService.ExecuteScalar("SmartTrackIdByTelefono", new Dictionary<string, object>() { { "Telefono", telefono } });
            if (o != null && o is int)
            {
                var i = (int)o;
                return this.Get(i.ToString()) as SimpleSmartTrack;
            }
            else
            {
                return null;
            }
        }
    }
}
																
