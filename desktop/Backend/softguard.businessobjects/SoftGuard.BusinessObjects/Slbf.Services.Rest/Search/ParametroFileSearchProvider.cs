using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Configuration.Provider;
using Slbf.Data;
using System.IO;

namespace Slbf.Services.Rest
{
    public class ParametroFileSearchProvider : FileSearchProvider
    {
        //ExecuteAsJson, 
        //ExecuteAsXml, 
        /*
         * En SearchObject, el campo Content ahora dice el nombre del parámetro
content: {"Parametro": "SEARCHSOFTGUARDMISCFILE", "virtualPath": "/SoftguardMisc"}
searchtype: parametrofile

en _tablas..t_parametros agregamos un registro SEARCHSOFTGUARDMISCFILE de la siguiente forma
insert into _tablas..t_parametros (par_ccodigo, par_cdescripcion, par_ivalor, par_mobservacion)
values('SEARCHSOFTGUARDMISCFILE','Ruta de acceso a la carpeta Misc',0, 'C:\SoftGuard.Final\Misc')
         * */

        public override string GetPath(Objects.SearchObject ObjectSearch)
        {
            var config = GetConfig(ObjectSearch);
            var parametroname = config.Parametro.ToString() as string;
            DataTable tcodigo = DataService.ExecuteTable("t_parametrosSelByCodigo", new Dictionary<string, object>() { { "par_ccodigo", parametroname } }) as DataTable;
            if (tcodigo == null || tcodigo.Rows.Count == 0)
                throw new ApplicationException("Parametro not found");

            var scodigo = (tcodigo.Rows[0]["par_cvalor"] ?? "").ToString();
            if (String.IsNullOrEmpty(scodigo))
                throw new ApplicationException("Parametro has an empty value");

            return scodigo;
        }

        public override DataTable ExecuteAsDataTable(Objects.SearchObject ObjectSearch, Dictionary<string, object> QueryParams, out int Total)
        {
            Total = 0;

            var cpath = GetPath(ObjectSearch);

            var spname = "";

            if (!String.IsNullOrEmpty(cpath))
            {
                spname += cpath;
            }

            if (QueryParams.ContainsKey("Path"))
            {
                var path = QueryParams["Path"];
                spname += "\\" + path;
            }

            if (!String.IsNullOrEmpty(ObjectSearch.IdProperty))
            {
                QueryParams[ObjectSearch.IdProperty] = Slbf.Security.UserService.GetId();
            }
            if (!String.IsNullOrEmpty(ObjectSearch.TokenProperty))
            {
                QueryParams[ObjectSearch.TokenProperty] = Slbf.Security.UserService.GetToken();
            }
            if (QueryParams.ContainsKey("_dc")) QueryParams.Remove("_dc");

            var OutputParams = new Dictionary<string, object>();
            if (!String.IsNullOrEmpty(ObjectSearch.TotalRowsParameterName))
                OutputParams.Add(ObjectSearch.TotalRowsParameterName, 0);

            var Out = GetFilesAsDataTable(ObjectSearch, spname, QueryParams, OutputParams);

            if (!String.IsNullOrEmpty(ObjectSearch.TotalRowsParameterName))
            {
                var o = OutputParams[ObjectSearch.TotalRowsParameterName];
                if (o is int) Total = (int)o;
            }

            return Out;
        }

        private DataTable GetFilesAsDataTable(Objects.SearchObject SearchObject, string Path, Dictionary<string, object> QueryParams, Dictionary<string, object> OutputParams)
        {
            var config = this.GetConfig(SearchObject);
            var virtualPath = config.virtualPath() ? config.virtualPath as string : "";
            var Out = new DataTable();
            Out.Columns.Add("Name");
            Out.Columns.Add("CreationTime");
            Out.Columns.Add("Type");
            Out.Columns.Add("Path");
            Out.Columns.Add("Weight");
            Out.Columns.Add("VirtualPath");


            var queryPath = QueryParams.ContainsKey("Path") ? QueryParams["Path"] as string ?? "" : "";
            var queryType = QueryParams.ContainsKey("Type") ? QueryParams["Type"] as string ?? "" : "";

            DirectoryInfo d;

            //creo el directorio por las dudas
            if (Directory.Exists(Path))
            {
                d = new DirectoryInfo(Path);
            } else
            {
                d = Directory.CreateDirectory(Path);
            }

                
            FileSystemInfo[] qq;
            switch (queryType)
            {
                case "Directory": qq = d.GetDirectories(); break;
                case "File": qq = d.GetFiles(); break;
                default: qq = d.GetFileSystemInfos(); break;
            }
            foreach (var f in qq)
            {
                long weight = 0;
                var ff = f as FileInfo;
                if (ff != null)
                    weight = ff.Length;

                var r = Out.NewRow();
                r["Name"] = f.Name;
                r["CreationTime"] = f.CreationTime;
                r["Path"] = queryPath;
                r["Weight"] = weight;
                if (!String.IsNullOrEmpty(virtualPath))
                    r["VirtualPath"] = virtualPath + "/" + queryPath.Replace("\\", "/") + "/" + f.Name;
                var type = f.GetType().Name;
                switch (type)
                {
                    case ("DirectoryInfo"):
                        r["Type"] = "Directory";
                        break;
                    case ("FileInfo"):
                        r["Type"] = "File";
                        break;
                    default:
                        r["Type"] = type;
                        break;
                }
                Out.Rows.Add(r);
            }

            return Out;
        }
        public override dynamic ExecuteAsJson(Objects.SearchObject ObjectSearch, Dictionary<string, object> QueryParams, out int Total)
        {
            Total = 0;
            var d = ExecuteAsDataTable(ObjectSearch, QueryParams, out Total);
            var sb = new StringBuilder();
            if (Total == 0) Total = d.Rows.Count;


            sb.Append("{\"success\":true,\"total\":" + Total + ",\"rows\":[");
            bool ri = false;
            foreach (DataRow r in d.Rows)
            {
                if (ri == true)
                    sb.Append(",");
                ri = true;
                sb.Append("{");
                bool ci = false;
                foreach (DataColumn c in d.Columns)
                {
                    if (ci == true)
                        sb.Append(",");
                    ci = true;
                    sb.Append("\"");
                    sb.Append(c.ColumnName);
                    sb.Append("\"");
                    sb.Append(":");
                    sb.Append("\"");
                    //sb.Append(r[c].ToString().Replace("\"", "\\\"").Replace("\r\n", "\\\r\n"));
                    sb.Append(r[c].ToString()
                        .Replace("\"", "\\\"")
                        .Replace("\r", "\\\\r")
                        .Replace("\n", "\\\\n")
                        .Replace("	", "")
                        );
                    sb.Append("\"");
                }
                sb.Append("}");
            }
            sb.Append("]");
            sb.Append("}");

            var s = sb.ToString();
            Slbf.DynamicJson j = null;
            try
            {
                j = Slbf.DynamicJson.Parse(s);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error parsing json: *" + s + "*, message follows: " + ex.Message, ex);
            }
            return j;
        }

        /*
         *  public override string ExecuteAsJson(Objects.SearchObject ObjectSearch, Dictionary<string, object> QueryParams)
        {
            var d = ExecuteAsDataTable(ObjectSearch, QueryParams);

            var j = DynamicJson.Parse(@"{""rows"":[]}");
            j.success = true;
            j.total = d.Rows.Count;
            var l = j.rows;
            
            foreach (DataRow r in d.Rows)
            {
                var i = 0;
                foreach (DataColumn c in d.Columns)
                {
                    var name = c.ColumnName;
                    var value = r[c].ToString();
                    dynamic o = new DynamicJson();
                    l[i] = o;
                    o[name] = value;
                    i++;
                }
            }
            
            return j.ToString();
        }*/

    }
}