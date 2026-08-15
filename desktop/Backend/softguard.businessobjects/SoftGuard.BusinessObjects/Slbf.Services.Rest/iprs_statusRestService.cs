using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Reflection;
using System.Globalization;
using Slbf;
using SoftGuard.BusinessObjects;

namespace SoftGuard.BusinessObjects.Rest
{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [DataContractFormat] // for JSON
    [ServiceKnownType("GetKnownTypes")]
    public class iprs_statusRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>()
            {
                typeof(iprs_status)
            };

        }

        [WebInvoke(UriTemplate = "", Method = "POST")]
        public void Create(iprs_status instance)
        {
            
        }
    }

    public class iprs_status
    {
        
    }
}