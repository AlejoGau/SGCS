

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
    // Start the service and browse objectTo http://<machine_name>:<port>/Metadata/help objectTo view the service's generated help page
    // NOTE: By default, a new instance of the service is created for each call; change the InstanceContextMode objectTo Single if you want
    // a single instance of the service objectTo process all calls.	
    
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    //[XmlSerializerFormat()]
    [DataContractFormat] // for JSON

    [ServiceKnownType("GetKnownTypes")] 
    public partial class m_template_contratoRestService
    {
        public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
        {
            return new List<Type>(){
                typeof(Simplem_template_contrato),
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

        [WebGet(UriTemplate = "?Page={Page}&Start={Start}&Limit={Limit}&Sort={Sort}&Group={Group}&Filter={Filter}")]
        public PagedOutput GetCollection(string Page, string Start,string Limit, string Sort, string Group, string Filter )
        {
			int iLimit = int.TryParse(Limit, out iLimit) ? iLimit : 10;
            int iPage = int.TryParse(Page, out iPage) ? iPage : 1;
            int iStart = int.TryParse(Start, out iStart) ? iStart : 1;
            int TotalRows = 0;
		
            List<Slbf.SimpleBaseObject> oo = new List<SimpleBaseObject>();
            var Object = GetCurrentObject();

            var taxonomies = Slbf.ObjectFactoryService.CreateTaxonomyCollection();
            DataTable t = Object.GetDataByFilter(iPage, iStart, iLimit, Sort, Group, Filter, ref TotalRows);
            foreach (DataRow r in t.Rows)
            {
                DataColumn c;
                var s = new Simplem_template_contrato();
                foreach (var p in s.GetType().GetProperties())
                    if ((c = t.Columns[p.Name]) != null && r[c] != DBNull.Value)
                        p.SetValue(s, r[c], null);

                oo.Add(s);
            }

            var Out = new PagedOutput();
            Out.rows = oo;
            Out.total = TotalRows;
            return Out;
        }



        m_template_contrato GetCurrentObject(int Id = 0)
        {
            var Object = Slbf.ObjectFactoryService.Create<m_template_contrato>();
			if(Id != 0) Object.Load(Id);
            return Object;
        }

        string _CurrentObjectName;
        [WebGet(UriTemplate = "/GetCurrentObjectName")]
        public string GetCurrentObjectName()
        {
            return _CurrentObjectName ?? (_CurrentObjectName = "m_template_contrato");
        }
        public string SetCurrentObjectName(string NewObjectName)
        {
            return _CurrentObjectName = NewObjectName;
        }

        [WebGet(UriTemplate = "{id}", ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Get(string id)
        {
            var o = GetObject(id);
            if (o.Id == 0)
            {
                WebOperationContext ctx = WebOperationContext.Current;
                ctx.OutgoingResponse.StatusCode = System.Net.HttpStatusCode.NotFound;
                return null;
            }
            else
            {
                var s = o.GetSimpleObject();
                return s;
            }
        }

        [WebInvoke(UriTemplate = "", Method = "POST"
            , RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Create(Simplem_template_contrato instance)
        {
			instance.Id = 0;
            var p = GetCurrentObject();
            p.SetSimpleObject(instance);
            p.Save();
            return p.GetSimpleObject();
        }

        [WebInvoke(UriTemplate = "{id}", Method = "PUT"
            , RequestFormat = WebMessageFormat.Json
            , ResponseFormat = WebMessageFormat.Json)]
        public SimpleBaseObject Update(string id, Simplem_template_contrato instance)
        {
			var iid = int.Parse(id);
			var p = GetCurrentObject(iid); // this also loads an object
			AssignSimpleObjectProperties(p, instance);
			p.Save();
			return p.GetSimpleObject();
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

            var taxcol = ObjectFactoryService.CreateTaxonomyCollection();
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

            if (t != null && t.Id != 0 && t.Name != Put.text)
            {
                var tt = ObjectFactoryService.Create<Taxonomy>();
                tt.Load(t.Id);
                tt.Name = Put.text;
                tt.Save();
                t = (SimpleTaxonomy)tt.GetSimpleObject();
            }
            Slbf.ObjectFactoryService.InvalidateTaxonomyCollection();

            return new SenchaTreeNode { id = t.Id.ToString(), @checked = t.IsChecked.ToString().ToLower(), text = t.Name };
        }
        [WebInvoke(UriTemplate = "{id}/Taxonomies", Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public SenchaTreeNode PostTaxonomy(SenchaTreeNode Put, string id)
        {
            bool Checked = bool.Parse(Put.@checked);
            int TId = int.Parse(Put.id);
            int TParentId = int.Parse(Put.parentId);

            var tt = ObjectFactoryService.Create<Taxonomy>();
            tt.Load(TId);
            tt.Name = Put.text;
            tt.Parent = TParentId;
            tt.Save();
            Slbf.ObjectFactoryService.InvalidateTaxonomyCollection();

            var t = (SimpleTaxonomy)tt.GetSimpleObject();

            return new SenchaTreeNode { id = t.Id.ToString(), @checked = t.IsChecked.ToString().ToLower(), text = t.Name };
        }
        [WebInvoke(UriTemplate = "{id}/Taxonomies?id={tid}", Method = "DELETE", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public SenchaTreeNode DeleteTaxonomy(string id, string tid)
        {
            int TId = int.Parse(tid);
            var t = ObjectFactoryService.Create<Taxonomy>();
            t.Load(TId);
            var Out = new SenchaTreeNode { id = t.Id.ToString(), @checked = t.IsChecked.ToString().ToLower(), text = t.Name };
            t.Delete();
            Slbf.ObjectFactoryService.InvalidateTaxonomyCollection();
            return Out;
        }

        [WebGet(UriTemplate = "{id}/Relations", ResponseFormat = WebMessageFormat.Json)]
        public List<Slbf.Relation> GetRelations(string id)
        {
            string name = GetCurrentObjectName();
            var pid = int.Parse(id);
            var o = GetCurrentObject();
            o.Load(pid);

            var r = Slbf.ObjectFactoryService.CreateRelationCollection();
            r.Load(o.GetObject());

            var res = new List<Slbf.Relation>();
            foreach (Slbf.Relation rel in r) res.Add(rel);
            return res;
        }
		
		[WebGet(UriTemplate = "{id}/Audit?PageCount={pagecount}&PagePresent={pagepresent}&FunctionId={functionid}", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<SimpleFrameworkAudit> GetAuditById(string id, string pagecount, string pagepresent, string functionid)
        {
            int iPageCount = 100; int.TryParse(pagecount, out iPageCount);
            int iPagePresent = 1; int.TryParse(pagepresent, out iPagePresent);
            int iFunctionId = 0; int.TryParse(functionid, out iFunctionId);
            var pid = int.Parse(id);
            var o = GetCurrentObject();
            o.Load(pid);
            return o.GetAudit(iFunctionId, iPageCount, iPagePresent);
        }

        [WebGet(UriTemplate = "/Audit?PageCount={pagecount}&PagePresent={pagepresent}&FunctionId={functionid}", ResponseFormat = WebMessageFormat.Json)]
        public IEnumerable<SimpleFrameworkAudit> GetAudit(string pagecount, string pagepresent, string functionid)
        {
            int iPageCount = 100; int.TryParse(pagecount, out iPageCount);
            int iPagePresent = 1; int.TryParse(pagepresent, out iPagePresent);
            int iFunctionId = 0; int.TryParse(functionid, out iFunctionId);

            var o = GetCurrentObject();
            var f = new FrameworkAudit(o.Security.SqlConfig, o.Security.UserId);
            return f.GetBySearch(o.GetObjectType().Id, o.Id, iFunctionId, iPageCount, iPagePresent);
        }
		
		[WebGet(UriTemplate = "{id}/metadata", ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream GetMetadata(string id)
        {
            return GetMetadataByName(id, null);
        }

        [WebGet(UriTemplate = "{id}/metadata/{name}", ResponseFormat = WebMessageFormat.Json)]
        public System.IO.Stream GetMetadataByName(string id, string name = null)
        {
            var Object = GetCurrentObject(int.Parse(id));

            MetaData m = string.IsNullOrEmpty(name) ? Object.MetadataObject() : Object.MetadataObject(name);
            WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
            if (String.IsNullOrEmpty(m.XmlData))
            {
                WebOperationContext ctx = WebOperationContext.Current;
                ctx.OutgoingResponse.StatusCode = System.Net.HttpStatusCode.NotFound;
                return null;
            }
            var Out = m.XmlData;
            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(Out));
        }

        [WebInvoke(UriTemplate = "{id}/metadata", Method = "POST"
            , RequestFormat = WebMessageFormat.Json
        )]
        public System.IO.Stream SetMetadata(string id)
        {
            var s = System.Web.HttpContext.Current.Request.Form.ToString();
            s = System.Web.HttpUtility.UrlDecode(s);
            var p = GetCurrentObject(int.Parse(id)).MetadataObject();
            p.SetDynamicJson(s);
            return new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(s));
        }
		
		[WebGet(UriTemplate = "{id}/children", ResponseFormat = WebMessageFormat.Json)]
        public List<Slbf.Relation> GetChildren(string id)
        {
            var res = new List<Slbf.Relation>();

            var pid = int.Parse(id);
            var o = GetCurrentObject();
            o.Load(pid);
			
			
			
            return res;
        }
    }
}
																
