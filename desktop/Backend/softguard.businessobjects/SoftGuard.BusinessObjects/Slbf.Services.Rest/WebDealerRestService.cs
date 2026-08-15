// Decompiled with JetBrains decompiler
// Type: SoftGuard.EnterpriseServices.Rest.WebDealerRestService
// Assembly: Slbf.Services.Rest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 7573FD33-E826-4337-B134-94D834E5B70B
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\Slbf.Services.Rest.dll

using SoftGuard.BusinessObjects.Customs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;

namespace SoftGuard.EnterpriseServices.Rest
{
  [ServiceKnownType("GetKnownTypes")]
  [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
  [DataContractFormat]
  [ServiceContract]
  [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
  public class WebDealerRestService
  {
    public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
    {
      return (IEnumerable<Type>) new List<Type>() { typeof (LineRange), typeof (Person) };
    }

    [WebGet(UriTemplate = "Lines?PersonId={PersonId}")]
    public IEnumerable<LineRange> GetLinesForPerson(string PersonId)
    {
      return new WebDealerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString).GetLinesForPerson(int.Parse(PersonId));
    }

    [WebGet(UriTemplate = "Persons?MasterDealers={MasterDealers}")]
    public IEnumerable<Person> GetPersonForMasterDealer(string MasterDealers)
    {
      return new WebDealerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString).GetPersonForMasterDealer(MasterDealers);
    }

    [WebInvoke(Method = "PUT", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "{id}")]
    public LineRange UpdateLineRange(LineRange LineRange)
    {
      return new WebDealerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString).SaveLineRange(LineRange);
    }

    [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "")]
    public LineRange AddLineRange(LineRange LineRange)
    {
      return new WebDealerManager(ConfigurationManager.ConnectionStrings["Slbf"].ConnectionString).SaveLineRange(LineRange);
    }
  }
}
