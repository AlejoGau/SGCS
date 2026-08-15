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


    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    //[XmlSerializerFormat()]
    [DataContractFormat] // for JSON

    [ServiceKnownType("GetKnownTypes")]
    public partial class ArchivosRestService 
    {
        //
        // GET: /Html/
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>(){
                    typeof(SimpleEstadoItem),
                    typeof(Slbf.Objects.SimpleMembershipUser),
                    typeof(Slbf.Objects.SimpleUserAccount),
                    typeof(Slbf.Objects.SimpleMenu),
                    typeof(Slbf.Objects.SimplePermission),
                    typeof(Slbf.Objects.SimpleRole),
                    typeof(Slbf.SimpleTaxonomy),
                    typeof(Slbf.Objects.SimpleMenuItem),
                    typeof(Slbf.Objects.SimpleGroups),
                    typeof(Slbf.Objects.SimpleGroups),

                    typeof(Slbf.Objects.SimpleMetaData)
                };
        }


        [WebInvoke(UriTemplate = "?sourcepath={sourcepath}&search={search}&destinationpath={destinationpath}", Method = "PUT"
            , RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public PagedOutput MoveFile(string sourcepath, string search, string destinationpath)
        {
            /*string sourcepath = Request.QueryString["sourcepath"];
            string search = Request.QueryString["search"];
            string destinationpath = Request.QueryString["destinationpath"];

            if (!checkPath(sourcepath))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            if (!checkPath(destinationpath))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            string fileSearch = Request["HTTP_X_FILE_SEARCH"] ?? Request.QueryString["search"];
            var pc = GetFilePath(fileSearch, sourcepath);
            var npc = GetFilePath(fileSearch, destinationpath);

            if (Request.Params["Debug"] != null)
            {
                WriteEnd("pc: " + pc + ", npc: " + npc);
            }
            System.IO.File.Move(pc, npc);
            WriteEnd("OK,MoveFile");
            return null;*/
            List<Slbf.SimpleBaseObject> oo = new List<SimpleBaseObject>();
            var Out = new PagedOutput();
            Out.rows = oo;
            Out.total = 1234;
            return Out;
        }
        /*
        public ActionResult DeleteFile2()
        {
            string path = Request.QueryString["path"];
            string search = Request.QueryString["search"];
            string name = Request.QueryString["name"];

            if (!checkPath(path))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            string fileSearch = Request["HTTP_X_FILE_SEARCH"] ?? Request.QueryString["search"];
            var pc = GetFilePath(fileSearch, path, name);

            System.IO.File.Delete(pc);
            WriteEnd("OK,DeleteFile");
            return null;
        }

        public ActionResult MoveDirectory2()
        {
            string sourcepath = Request.QueryString["sourcepath"];
            string search = Request.QueryString["search"];
            string destinationpath = Request.QueryString["destinationpath"];


            if (!checkPath(sourcepath))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            if (!checkPath(destinationpath))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            string fileSearch = Request["HTTP_X_FILE_SEARCH"] ?? Request.QueryString["search"];
            var pc = GetFilePath(fileSearch, sourcepath);
            var npc = GetFilePath(fileSearch, destinationpath);

            System.IO.Directory.Move(pc, npc);
            WriteEnd("OK,MoveDirectory");
            return null;
        }

        public ActionResult CreateDirectory2()
        {
            string path = Request.QueryString["path"];
            string search = Request.QueryString["search"];
            string name = Request.QueryString["name"];
            string fileSearch = Request["HTTP_X_FILE_SEARCH"] ?? Request.QueryString["search"];

            if (!checkPath(path))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            var pc = GetFilePath(fileSearch, path, name);

            System.IO.Directory.CreateDirectory(pc);
            WriteEnd("OK,CreateDirectory,path:" + path + ",name:" + name);
            return null;
        }

        public ActionResult DeleteDirectory2(string path, string search, string name, bool recursive = false, bool showfullpath = false)
        {

            if (!checkPath(path))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            string fileSearch = Request["HTTP_X_FILE_SEARCH"] ?? search;
            var pc = GetFilePath(fileSearch, path, name);

            if (showfullpath)
                WriteEnd(pc);
            else
                System.IO.Directory.Delete(pc, recursive);
            WriteEnd("OK,DeleteDirectory");
            return null;
        }

        public ActionResult ExtractZip2()
        {
            string path = Request.QueryString["path"];
            string search = Request["HTTP_X_FILE_SEARCH"] ?? Request.QueryString["search"];
            string name = Request.QueryString["name"];
            string destinationpath = Request.QueryString["destinationpath"];

            if (!checkPath(path))
            {
                Response.Write("Error: path inválido");
                Response.End();
                return null;
            }

            var zip = GetFilePath(search, path, name);
            var target = GetFilePath(search, destinationpath);

            if (Request.Params["Debug"] != null)
            {
                WriteEnd("zip: " + zip + ", target: " + target);
            }

            //using (ZipFile zipf = ZipFile.Read(zip))
            //{
            //    zipf.ExtractAll(target, ExtractExistingFileAction.OverwriteSilently);
            //}

            //ZipFile.Read(zip).ExtractAll(target);    

            WriteEnd("OK,Extract");
            return null;
        }

        private static string GetFilePath(string fileSearch, string virtualPath, string fileName = null)
        {

            var os = ObjectFactoryService.Create<Objects.SearchObject>();
            os.LoadByName(fileSearch);
            var osProvider = os.GetProvider();
            if (!(osProvider is FileSearchProvider))
                throw new ApplicationException("Search must derive from FileSearchProvider");

            var newPath = (osProvider as FileSearchProvider).GetConfig(os).path as string;
            var newRealPath = newPath + '\\' + virtualPath;

            if (!String.IsNullOrEmpty(fileName))
                return newRealPath + "\\" + fileName.Replace("/", "").Replace("\\", "");
            else
                return newRealPath;

        }
        void WriteEnd(string Que)
        {
            Response.Write(Que);
            Response.End();
        }

        private bool checkPath(string path)
        {
            bool isValid = false;

            if ((path.IndexOf("..",
                    StringComparison.OrdinalIgnoreCase) >= 0))
            {
                isValid = false;
            }

            return isValid;
        }
        */
    }
}