// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Rest.GeoFenseCuentaRestService
// Assembly: Slbf.Services.Rest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 7573FD33-E826-4337-B134-94D834E5B70B
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\Slbf.Services.Rest.dll

using Slbf;
using Slbf.Objects;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web;

namespace SoftGuard.BusinessObjects.Rest
{
  [DataContractFormat]
  [ServiceKnownType("GetKnownTypes")]
  [ServiceContract]
  [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
  [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
  public class GeoFenseCuentaRestService
  {
    private string _CurrentObjectName;

    public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
    {
      return (IEnumerable<Type>) new List<Type>() { typeof (SimpleGeoFenseCuenta), typeof (SimpleMembershipUser), typeof (SimpleUserAccount), typeof (SimpleMenu), typeof (SimplePermission), typeof (SimpleRole), typeof (SimpleTaxonomy), typeof (SimpleMenuItem), typeof (SimpleGroups), typeof (SimpleGroups), typeof (SimpleMetaData) };
    }

    [WebGet(UriTemplate = "?Page={Page}&Start={Start}&Limit={Limit}&Sort={Sort}&Group={Group}&Filter={Filter}")]
    public PagedOutput GetCollection(string Page, string Start, string Limit, string Sort, string Group, string Filter)
    {
      int result1;
      int Limit1 = int.TryParse(Limit, out result1) ? result1 : 10;
      int result2;
      int Page1 = int.TryParse(Page, out result2) ? result2 : 1;
      int result3;
      int Start1 = int.TryParse(Start, out result3) ? result3 : 1;
      int TotalRows = 0;
      List<SimpleBaseObject> simpleBaseObjectList = new List<SimpleBaseObject>();
      GeoFenseCuenta currentObject = this.GetCurrentObject(0);
      ObjectFactoryService.CreateTaxonomyCollection();
      DataTable dataByFilter = currentObject.GetDataByFilter(Page1, Start1, Limit1, Sort, Group, Filter, ref TotalRows);
      foreach (DataRow row in (InternalDataCollectionBase) dataByFilter.Rows)
      {
        row["id"].ToString();
        SimpleGeoFenseCuenta simpleGeoFenseCuenta = new SimpleGeoFenseCuenta();
        foreach (PropertyInfo property in simpleGeoFenseCuenta.GetType().GetProperties())
        {
          DataColumn column;
          if ((column = dataByFilter.Columns[property.Name]) != null && row[column] != DBNull.Value)
            property.SetValue((object) simpleGeoFenseCuenta, row[column], (object[]) null);
        }
        simpleBaseObjectList.Add((SimpleBaseObject) simpleGeoFenseCuenta);
      }
      return new PagedOutput() { rows = (IEnumerable<object>) simpleBaseObjectList, total = TotalRows };
    }

    private GeoFenseCuenta GetCurrentObject(int Id = 0)
    {
      GeoFenseCuenta geoFenseCuenta = ObjectFactoryService.Create<GeoFenseCuenta>();
      if (Id != 0)
        geoFenseCuenta.Load(Id);
      return geoFenseCuenta;
    }

    [WebGet(UriTemplate = "/GetCurrentObjectName")]
    public string GetCurrentObjectName()
    {
      return this._CurrentObjectName ?? (this._CurrentObjectName = "GeoFenseCuenta");
    }

    public string SetCurrentObjectName(string NewObjectName)
    {
      return this._CurrentObjectName = NewObjectName;
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}")]
    public SimpleBaseObject Get(string id)
    {
      ISpecialization specialization = this.GetObject(id);
      if (specialization.Id != 0)
        return specialization.GetSimpleObject();
      WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
      return (SimpleBaseObject) null;
    }

    [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "")]
    public SimpleBaseObject Create(SimpleGeoFenseCuenta instance)
    {
      instance.Id = 0;
      GeoFenseCuenta currentObject = this.GetCurrentObject(0);
      currentObject.SetSimpleObject((SimpleBaseObject) instance);
      currentObject.Save();
      return currentObject.GetSimpleObject();
    }

    [WebInvoke(Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}")]
    public SimpleBaseObject Update(string id, SimpleGeoFenseCuenta instance)
    {
      GeoFenseCuenta currentObject = this.GetCurrentObject(int.Parse(id));
      this.AssignSimpleObjectProperties((object) currentObject, (object) instance);
      currentObject.Save();
      return currentObject.GetSimpleObject();
    }

    [WebInvoke(Method = "DELETE", UriTemplate = "{id}")]
    public void Delete(string id)
    {
      this.GetObject(id).Delete();
    }

    private ISpecialization GetObject(string id)
    {
      GeoFenseCuenta currentObject = this.GetCurrentObject(0);
      currentObject.Load(int.Parse(id));
      return (ISpecialization) currentObject;
    }

    private void AssignSimpleObjectProperties(object objectTo, object objectFrom)
    {
      BindingFlags bindingAttr = BindingFlags.Instance | BindingFlags.Public;
      foreach (PropertyInfo property1 in objectFrom.GetType().GetProperties(bindingAttr))
      {
        object obj = property1.GetValue(objectFrom, (object[]) null);
        if (obj != null)
        {
          PropertyInfo property2 = objectTo.GetType().GetProperty(property1.Name);
          if (property2 != (PropertyInfo) null && property2.GetSetMethod() != (MethodInfo) null)
            property2.SetValue(objectTo, obj, (object[]) null);
        }
      }
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Taxonomies?Node={ParentId}")]
    public IEnumerable<SenchaTreeNode> GetTaxonomiesJustOneLevel(string id, string ParentId)
    {
      return ((IEnumerable<SimpleTaxonomy>) ObjectFactoryService.CreateTaxonomyCollection().Get(Convert.ToInt32(ParentId), this.GetCurrentObject(0).GetObjectType().Id, Convert.ToInt32(id))).Select<SimpleTaxonomy, SenchaTreeNode>((Func<SimpleTaxonomy, SenchaTreeNode>) (x => new SenchaTreeNode() { @checked = x.IsChecked.ToString().ToLower(), id = x.Id.ToString(), text = x.Name }));
    }

    [WebInvoke(Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Taxonomies")]
    public SenchaTreeNode PutTaxonomy(SenchaTreeNode Put, string id)
    {
      bool flag = bool.Parse(Put.@checked);
      int Id = int.Parse(Put.id);
      ISpecialization specialization = this.GetObject(id);
      SimpleTaxonomy simpleObject = specialization.Taxonomies.GetObject(Id);
      simpleObject.IsChecked = flag;
      specialization.Save();
      if (simpleObject != null && simpleObject.Id != 0 && simpleObject.Name != Put.text)
      {
        Taxonomy taxonomy = ObjectFactoryService.Create<Taxonomy>();
        taxonomy.Load(simpleObject.Id);
        taxonomy.Name = Put.text;
        taxonomy.Save();
        simpleObject = (SimpleTaxonomy) taxonomy.GetSimpleObject();
      }
      ObjectFactoryService.InvalidateTaxonomyCollection();
      return new SenchaTreeNode() { id = simpleObject.Id.ToString(), @checked = simpleObject.IsChecked.ToString().ToLower(), text = simpleObject.Name };
    }

    [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Taxonomies")]
    public SenchaTreeNode PostTaxonomy(SenchaTreeNode Put, string id)
    {
      bool.Parse(Put.@checked);
      int Id = int.Parse(Put.id);
      int num = int.Parse(Put.parentId);
      Taxonomy taxonomy = ObjectFactoryService.Create<Taxonomy>();
      taxonomy.Load(Id);
      taxonomy.Name = Put.text;
      taxonomy.Parent = num;
      taxonomy.Save();
      ObjectFactoryService.InvalidateTaxonomyCollection();
      SimpleTaxonomy simpleObject = (SimpleTaxonomy) taxonomy.GetSimpleObject();
      return new SenchaTreeNode() { id = simpleObject.Id.ToString(), @checked = simpleObject.IsChecked.ToString().ToLower(), text = simpleObject.Name };
    }

    [WebInvoke(Method = "DELETE", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Taxonomies?id={tid}")]
    public SenchaTreeNode DeleteTaxonomy(string id, string tid)
    {
      int Id = int.Parse(tid);
      Taxonomy taxonomy = ObjectFactoryService.Create<Taxonomy>();
      taxonomy.Load(Id);
      SenchaTreeNode senchaTreeNode = new SenchaTreeNode() { id = taxonomy.Id.ToString(), @checked = taxonomy.IsChecked.ToString().ToLower(), text = taxonomy.Name };
      taxonomy.Delete();
      ObjectFactoryService.InvalidateTaxonomyCollection();
      return senchaTreeNode;
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Relations")]
    public List<Slbf.Relation> GetRelations(string id)
    {
      this.GetCurrentObjectName();
      int Id = int.Parse(id);
      GeoFenseCuenta currentObject = this.GetCurrentObject(0);
      currentObject.Load(Id);
      RelationCollection relationCollection = ObjectFactoryService.CreateRelationCollection();
      relationCollection.Load(currentObject.GetObject());
      List<Slbf.Relation> relationList = new List<Slbf.Relation>();
      foreach (Slbf.Relation relation in (List<Slbf.Relation>) relationCollection)
        relationList.Add(relation);
      return relationList;
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Audit?PageCount={pagecount}&PagePresent={pagepresent}&FunctionId={functionid}")]
    public IEnumerable<SimpleFrameworkAudit> GetAuditById(string id, string pagecount, string pagepresent, string functionid)
    {
      int result1 = 100;
      int.TryParse(pagecount, out result1);
      int result2 = 1;
      int.TryParse(pagepresent, out result2);
      int result3 = 0;
      int.TryParse(functionid, out result3);
      int Id = int.Parse(id);
      GeoFenseCuenta currentObject = this.GetCurrentObject(0);
      currentObject.Load(Id);
      return currentObject.GetAudit(result3, result1, result2);
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/Audit?PageCount={pagecount}&PagePresent={pagepresent}&FunctionId={functionid}")]
    public IEnumerable<SimpleFrameworkAudit> GetAudit(string pagecount, string pagepresent, string functionid)
    {
      int result1 = 100;
      int.TryParse(pagecount, out result1);
      int result2 = 1;
      int.TryParse(pagepresent, out result2);
      int result3 = 0;
      int.TryParse(functionid, out result3);
      GeoFenseCuenta currentObject = this.GetCurrentObject(0);
      return new FrameworkAudit(currentObject.Security.SqlConfig, currentObject.Security.UserId).GetBySearch(currentObject.GetObjectType().Id, currentObject.Id, result3, result1, result2);
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/metadata")]
    public Stream GetMetadata(string id)
    {
      return this.GetMetadataByName(id, (string) null);
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/metadata/{name}")]
    public Stream GetMetadataByName(string id, string name = null)
    {
      GeoFenseCuenta currentObject = this.GetCurrentObject(int.Parse(id));
      MetaData metaData = string.IsNullOrEmpty(name) ? currentObject.MetadataObject() : currentObject.MetadataObject(name);
      WebOperationContext.Current.OutgoingResponse.ContentType = "application/json; charset=utf-8";
      if (!string.IsNullOrEmpty(metaData.XmlData))
        return (Stream) new MemoryStream(Encoding.UTF8.GetBytes(metaData.XmlData));
      WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.NotFound;
      return (Stream) null;
    }

    [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, UriTemplate = "{id}/metadata")]
    public Stream SetMetadata(string id)
    {
      string s = HttpUtility.UrlDecode(HttpContext.Current.Request.Form.ToString());
      this.GetCurrentObject(int.Parse(id)).MetadataObject().SetDynamicJson((object) s);
      return (Stream) new MemoryStream(Encoding.UTF8.GetBytes(s));
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/children")]
    public List<Slbf.Relation> GetChildren(string id)
    {
      List<Slbf.Relation> relationList = new List<Slbf.Relation>();
      this.GetCurrentObject(0).Load(int.Parse(id));
      return relationList;
    }
  }
}
