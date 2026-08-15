using Slbf.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Slbf.Services.Rest
{
    public class ParametroJsonParser
    {
        static ParametroJsonParser _current = null;
        public static ParametroJsonParser Current { get { return _current ?? (_current = new ParametroJsonParser()); } }
        public dynamic GetConfig(dynamic JsonConfig)
        {
            var parametroname = JsonConfig.Parametro.ToString() as string;
            DataTable tcodigo = DataService.ExecuteTable("t_parametrosSelByCodigo", new Dictionary<string, object>() { { "par_ccodigo", parametroname } }) as DataTable;
            if (tcodigo == null || tcodigo.Rows.Count == 0)
                throw new ApplicationException("Parametro not found");

            var scodigo = (tcodigo.Rows[0]["par_cvalor"] ?? "").ToString();
            if (String.IsNullOrEmpty(scodigo))
                throw new ApplicationException("Parametro has an empty value");

            var json = DynamicJson.Parse(scodigo);
            return json;
        }
    }
}