using System;
using System.IO;
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
    public class DesktopRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>()
            {
                typeof(string)
            };            
        }

        [WebGet(UriTemplate = "Wallpapers?id={OrganizationId}")]
        public List<string> GetWallpapers(int OrganizationId = 0)
        {
            List<string> WallpaperList = new List<string>();
            string PathDirectory = ConfigurationManager.AppSettings["Desktop.Wallpapers"];

            if (OrganizationId>0)
            {
                PathDirectory = Path.Combine(PathDirectory, OrganizationId.ToString());
            }
            
            string[] Wallpapers = Directory.GetFiles(PathDirectory);
            foreach (string Wallpaper in Wallpapers)
            {
                WallpaperList.Add(Path.GetFileName(Wallpaper));
            }

            return WallpaperList;
        }
    }
}
																
