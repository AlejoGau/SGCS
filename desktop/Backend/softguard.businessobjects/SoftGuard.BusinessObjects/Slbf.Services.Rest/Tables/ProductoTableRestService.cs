


using System;
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
using Slbf;
using System.Runtime.Serialization;
using Slbf.Helpers;
using SoftGuard.BusinessObjects.Tables;

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
    public class ProductoRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>()
            {
                typeof(Producto)
            };            
        }


        [WebGet(UriTemplate = "", ResponseFormat=WebMessageFormat.Json)]
        public Producto[] GetCollection()
        {
            ProductoManager Manager = new ProductoManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString);
            // me fijo que tenga token valido.
            var token = Slbf.Security.UserService.GetId();
            IEnumerable<Producto> Result = Manager.GetAll();
            
            return new List<Producto>(Result).ToArray();
        }
    }
}



