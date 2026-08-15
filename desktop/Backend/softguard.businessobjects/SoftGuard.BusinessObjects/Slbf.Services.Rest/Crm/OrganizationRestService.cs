

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

namespace Slbf.Crm.Rest
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
    public class OrganizationRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>(){
                typeof(Slbf.Crm.SimpleOrganization),
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

        [WebGet(UriTemplate = "")]
        public Slbf.SimpleBaseObject[] GetCollection()
        {
            List<Slbf.SimpleBaseObject> oo = new List<SimpleBaseObject>();
            var Object = GetCurrentObject();

            TaxonomyCollection taxonomies = new TaxonomyCollection(Object.Security.SqlConfig, Global.GetToken());
            int totalPages = 0;
            int totalRows = 0;
            DataTable t = Object.GetDataByText("", taxonomies, 10, 1, ref totalPages, ref totalRows);
            foreach (DataRow r in t.Rows)
            {
                DataColumn c;
                string id = r["id"].ToString();
                var s = new Slbf.Crm.SimpleOrganization();
                foreach (var p in s.GetType().GetProperties())
                    if ((c = t.Columns[p.Name]) != null && r[c] != DBNull.Value)
                        p.SetValue(s, r[c], null);

                oo.Add(s);
            }

            return oo.ToArray();
        }
		
		

        Slbf.Crm.Organization GetCurrentObject(int Id = 0)
        {
            var Object = new Slbf.Crm.Organization(Global.SqlHelper Global.GetToken());
			if(Id != 0) Object.Load(Id);
            return Object;
        }

        string _CurrentObjectName;
        [WebGet(UriTemplate = "/GetCurrentObjectName")]
        public string GetCurrentObjectName()
        {
            return _CurrentObjectName ?? (_CurrentObjectName = GetCurrentObjectNameFromUrl());
        }
        public string SetCurrentObjectName(string NewObjectName)
        {
            return _CurrentObjectName = NewObjectName;
        }


        private string GetCurrentObjectNameFromUrl()
        {
            foreach (var o in GetKnownTypes(null))
            {
                var oname = o.Name.Replace("Simple", "").ToLower();
                if (System.Web.HttpContext.Current.Request.Url.ToString().ToLower().Contains(oname))
                    return oname;
            }
            return null;
        }

        [WebGet(UriTemplate = "{id}", ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Get(string id)
        {
            return GetObject(id).GetSimpleObject();
        }

        [WebInvoke(UriTemplate = "", Method = "POST"
            , RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Create(Slbf.Crm.SimpleOrganization instance)
        {
            var p = GetCurrentObject();
            p.SetSimpleObject(instance);
            p.Save();
            return p.GetSimpleObject();
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT"
            , RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Update(string id, Slbf.Crm.SimpleOrganization instance)
        {
            try
            {
                var p = GetCurrentObject(instance.Id); // this also loads an object
                AssignSimpleObjectProperties(p, instance);
                p.Save();
                return p.GetSimpleObject();
            }
            catch (Exception ex)
            {
                Global.SetException(ex);
                throw;
            }
        }

        [WebInvoke(UriTemplate = "{id}", Method = "DELETE")]
        public void Delete(string id)
        {
            GetObject(id).Delete();
        }

        private ISpecialization GetObject(string id)
        {
            var p = GetCurrentObject();
            p.Load(Int32.Parse(id));
            return p;
        }

        private void AssignSimpleObjectProperties(object objectTo, object objectFrom)
        {
            BindingFlags flags = BindingFlags.Instance | BindingFlags.Public;
            foreach (PropertyInfo propFrom in objectFrom.GetType().GetProperties(flags))
            {
                object value = propFrom.GetValue(objectFrom, null);
                if (value != null)
                {
                    PropertyInfo propTo = objectTo.GetType().GetProperty(propFrom.Name);
                    if (propTo != null && propTo.GetSetMethod() != null)
                        propTo.SetValue(objectTo, value, null);
                }
            }
        }


        [WebGet(UriTemplate = "{id}/Taxonomies?Node={ParentId}", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<SenchaTreeNode> GetTaxonomiesJustOneLevel(string id, string ParentId)
        {
            int intParentId = Convert.ToInt32(ParentId);
            int intObjectTypeId = GetCurrentObject().GetObjectType().Id;
            int intId = Convert.ToInt32(id);

            TaxonomyCollection taxcol = (TaxonomyCollection)ObjectFactoryService.GetInstance().CreateObject("TaxonomyCollection", Global.SqlHelper, Global.GetToken());
            SimpleTaxonomy[] taxos = taxcol.Get(intParentId, intObjectTypeId, intId);

            return from x in taxos
                   select new SenchaTreeNode
                   {
                       @checked = x.IsChecked.ToString().ToLower(),
                       id = x.Id.ToString(),
                       text = x.Name
                   };
        }
		
		[WebInvoke(UriTemplate = "{id}/Taxonomies", Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public SenchaTreeNode PutTaxonomy(SenchaTreeNode Put, string id)
        {
            bool Checked = bool.Parse(Put.@checked);
            int TId = int.Parse(Put.id);

            var o = GetObject(id);
            var t = o.Taxonomies.GetObject(TId);
            t.IsChecked = Checked;

            o.Save();
            return new SenchaTreeNode { id = t.Id.ToString(), @checked = t.IsChecked.ToString().ToLower(), text = t.Name };
        }

        [WebGet(UriTemplate = "{id}/Relations", ResponseFormat = WebMessageFormat.Json)]
        public List<Relation> GetRelations(string id)
        {
            string name = GetCurrentObjectName();
            var pid = int.Parse(id);
            var o = GetCurrentObject();
            o.Load(pid);

            var r = new RelationCollection(Global.SqlHelper);
            r.Load(o.GetObject());

            var res = new List<Relation>();
            foreach (Slbf.Relation rel in r) res.Add(rel);
            return res;
        }
    }
}
																
