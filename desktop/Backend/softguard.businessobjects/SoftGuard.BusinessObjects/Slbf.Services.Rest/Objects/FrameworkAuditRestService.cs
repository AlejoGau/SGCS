

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Slbf.Objects;
using Slbf.Services.Rest;

namespace Slbf.Objects.Rest
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
    public class FrameworkAuditRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>(){
                typeof(Slbf.Objects.SimpleFrameworkAudit),
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

        [WebGet(UriTemplate = "?objecttypeid={objecttypeid}&objectid={objectid}&functionid={functionid}&pagecount={pagecount}&pagepresent={pagepresent}")]
        public IEnumerable<SimpleFrameworkAudit> Search(string objecttypeid, string objectid, string functionid, string pagecount, string pagepresent)
        {
            var iobjecttypeid = 0; int.TryParse(objecttypeid, out iobjecttypeid);
            var iobjectid = 0; int.TryParse(objectid, out iobjectid);
            var ifunctionid = 0; int.TryParse(functionid, out ifunctionid);
            var ipagecount = 50;// int.TryParse(pagecount, out ipagecount);
            var ipagepresent = 1;// int.TryParse(pagepresent, out ipagepresent);

            var Object = GetFrameworkAudit();
            return Object.GetBySearch(iobjecttypeid, iobjectid, ifunctionid, ipagecount, ipagepresent);
        }

        private FrameworkAudit GetFrameworkAudit()
        {
            var Object = new FrameworkAudit(Global.SqlHelper, Global.GetUserId());
            return Object;
        }

        [WebGet(UriTemplate = "/{id}/Xml")]
        public string GetXml(string id)
        {
            var Out = "";
            var iid = 0;
            if (int.TryParse(id, out iid))
            {
                var f = GetFrameworkAudit();
                Out = f.GetXmlByAudit(iid);
            }
            return Out;
        }
    }
}
																
