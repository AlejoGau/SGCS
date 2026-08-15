using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Slbf.Services.Rest.Search
{
    public class ParametroMapzenGeocodingSearchProvider:MapzenGeocodingSearchProvider
    {
        public override dynamic GetConfig(Objects.SearchObject ObjectSearch)
        {
            var config = base.GetConfig(ObjectSearch);
            return ParametroJsonParser.Current.GetConfig(config);
        }
    }
}