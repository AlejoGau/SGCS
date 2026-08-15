using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NLog;

namespace Slbf.Services.Rest.Search
{
    public class ParametroGoogleGeocodingSearchProvider: Slbf.GoogleGeocodingSearchProvider
    {
        public static Logger xlogger = LogManager.GetCurrentClassLogger();
        public override dynamic GetConfig(Objects.SearchObject ObjectSearch)
        {
            dynamic config = base.GetConfig(ObjectSearch);
            xlogger.Trace("[ParametroGoogleGeocodingSearchProvider] parseo la config: "+config.ToString());
            return ParametroJsonParser.Current.GetConfig(config);
        }
    }
}