// Decompiled with JetBrains decompiler
// Type: Slbf.Services.Rest.ZonaTempRestService
// Assembly: Slbf.Services.Rest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 7573FD33-E826-4337-B134-94D834E5B70B
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\Slbf.Services.Rest.dll

using Slbf.Objects;
using SoftGuard.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Web;

namespace Slbf.Services.Rest
{
  [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
  [DataContractFormat]
  [ServiceKnownType("GetKnownTypes")]
  [ServiceContract]
  [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
  public class ZonaTempRestService
  {
    private string _CurrentObjectName;

    public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
    {
      return (IEnumerable<Type>) new List<Type>() { typeof (SimpleZonaTemp), typeof (SimpleMembershipUser), typeof (SimpleUserAccount), typeof (SimpleMenu), typeof (SimplePermission), typeof (SimpleRole), typeof (SimpleTaxonomy), typeof (SimpleMenuItem), typeof (SimpleGroups), typeof (SimpleGroups), typeof (SimpleMetaData), typeof (SimpleFrameworkAudit) };
    }

    [WebGet(UriTemplate = "")]
    public SimpleBaseObject[] GetCollection()
    {
      List<SimpleBaseObject> simpleBaseObjectList = new List<SimpleBaseObject>();
      ISpecialization currentObject = this.GetCurrentObject();
      TaxonomyCollection Taxonomies = new TaxonomyCollection(currentObject.Security.SqlConfig, Global.GetToken());
      int PageTotal = 0;
      int RowTotal = 0;
      DataTable dataByText = currentObject.GetDataByText("", Taxonomies, 10, 1, ref PageTotal, ref RowTotal);
      foreach (DataRow row in (InternalDataCollectionBase) dataByText.Rows)
      {
        row["id"].ToString();
        SimpleBaseObject simpleObject = ObjectFactoryService.GetInstance().CreateSimpleObject(this.GetCurrentObjectName());
        foreach (PropertyInfo property in simpleObject.GetType().GetProperties())
        {
          DataColumn column;
          if ((column = dataByText.Columns[property.Name]) != null && row[column] != DBNull.Value)
            property.SetValue((object) simpleObject, row[column], (object[]) null);
        }
        simpleBaseObjectList.Add(simpleObject);
      }
      return simpleBaseObjectList.ToArray();
    }

    private ISpecialization GetCurrentObject()
    {
      return ObjectFactoryService.CreateByName(this.GetCurrentObjectName());
    }

    [WebGet(UriTemplate = "/GetCurrentObjectName")]
    public string GetCurrentObjectName()
    {
      return this._CurrentObjectName ?? (this._CurrentObjectName = this.GetCurrentObjectNameFromUrl());
    }

    public string SetCurrentObjectName(string NewObjectName)
    {
      return this._CurrentObjectName = NewObjectName;
    }

    private string GetCurrentObjectNameFromUrl()
    {
      foreach (MemberInfo knownType in ZonaTempRestService.GetKnownTypes((ICustomAttributeProvider) null))
      {
        string lower = knownType.Name.Replace("Simple", "").ToLower();
        if (HttpContext.Current.Request.Url.ToString().ToLower().Contains(lower))
          return lower;
      }
      return (string) null;
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}")]
    public SimpleBaseObject Get(string id)
    {
      return this.GetObject(id).GetSimpleObject();
    }

    [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "")]
    public SimpleBaseObject Create(SimpleZonaTemp instance)
    {
      ISpecialization currentObject = this.GetCurrentObject();
      currentObject.SetSimpleObject((SimpleBaseObject) instance);
      currentObject.Save();
      return currentObject.GetSimpleObject();
    }

    [WebInvoke(Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}")]
    public SimpleBaseObject Update(string id, SimpleZonaTemp instance)
    {
      try
      {
        ISpecialization currentObject = this.GetCurrentObject();
        currentObject.Load(instance.Id);
        this.AssignSimpleObjectProperties((object) currentObject, (object) instance);
        currentObject.Save();
        return currentObject.GetSimpleObject();
      }
      catch (Exception ex)
      {
        Global.SetException(ex);
        throw;
      }
    }

    [WebInvoke(Method = "DELETE", UriTemplate = "{id}")]
    public void Delete(string id)
    {
      this.GetObject(id).Delete();
    }

    private ISpecialization GetObject(string id)
    {
      ISpecialization currentObject = this.GetCurrentObject();
      currentObject.Load(int.Parse(id));
      return currentObject;
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
      return ((IEnumerable<SimpleTaxonomy>) ObjectFactoryService.CreateTaxonomyCollection().Get(Convert.ToInt32(ParentId), this.GetCurrentObject().GetObjectType().Id, Convert.ToInt32(id))).Select<SimpleTaxonomy, SenchaTreeNode>((Func<SimpleTaxonomy, SenchaTreeNode>) (x => new SenchaTreeNode() { @checked = x.IsChecked.ToString().ToLower(), id = x.Id.ToString(), text = x.Name }));
    }

    [WebInvoke(Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Taxonomies")]
    public SenchaTreeNode PutTaxonomy(SenchaTreeNode Put, string id)
    {
      bool flag = bool.Parse(Put.@checked);
      int Id = int.Parse(Put.id);
      ISpecialization specialization = this.GetObject(id);
      SimpleTaxonomy simpleTaxonomy = specialization.Taxonomies.GetObject(Id);
      simpleTaxonomy.IsChecked = flag;
      specialization.Save();
      return new SenchaTreeNode() { id = simpleTaxonomy.Id.ToString(), @checked = simpleTaxonomy.IsChecked.ToString().ToLower(), text = simpleTaxonomy.Name };
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Relations")]
    public List<Slbf.Relation> GetRelations(string id)
    {
      this.GetCurrentObjectName();
      int Id = int.Parse(id);
      ISpecialization currentObject = this.GetCurrentObject();
      currentObject.Load(Id);
      RelationCollection relationCollection = new RelationCollection(Global.SqlHelper);
      relationCollection.Load(currentObject.GetObject());
      List<Slbf.Relation> relationList = new List<Slbf.Relation>();
      foreach (Slbf.Relation relation in (List<Slbf.Relation>) relationCollection)
        relationList.Add(relation);
      return relationList;
    }

    [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}/Audit?PageCount={pagecount}&PagePresent={pagepresent}&FunctionId={functionid}")]
    public IEnumerable<SimpleFrameworkAudit> GetAuditByObjectId(string id, string pagecount, string pagepresent, string functionid)
    {
      int result1 = 100;
      int.TryParse(pagecount, out result1);
      int result2 = 1;
      int.TryParse(pagepresent, out result2);
      int result3 = 0;
      int.TryParse(functionid, out result3);
      int Id = int.Parse(id);
      ISpecialization currentObject = this.GetCurrentObject();
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
      ISpecialization currentObject = this.GetCurrentObject();
      return new FrameworkAudit(currentObject.Security.SqlConfig, currentObject.Security.UserId).GetBySearch(currentObject.GetObjectType().Id, currentObject.Id, result3, result1, result2);
    }
  }
}
