// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Rest.ResourceRestService
// Assembly: Slbf.Services.Rest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 7573FD33-E826-4337-B134-94D834E5B70B
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\Slbf.Services.Rest.dll

using Slbf.Services.Rest.Resources;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Reflection;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;

namespace SoftGuard.BusinessObjects.Rest
{
  [ServiceContract]
  [DataContractFormat]
  [ServiceKnownType("GetKnownTypes")]
  [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
  [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
  public class ResourceRestService
  {
    public static IEnumerable<Type> GetKnownTypes(ICustomAttributeProvider provider)
    {
      return (IEnumerable<Type>) new List<Type>();
    }

    [WebGet(UriTemplate = "/Image/{Logo}.{Format}?mimetype={mimetype}")]
    public Stream Get(string Logo, string Format = null, string MimeType = null)
    {
      WebOperationContext.Current.OutgoingResponse.ContentType = (MimeType ?? "image/png") + "; charset=utf-8";
      Bitmap poweredBySoftguard = Resource1.powered_by_softguard;
      MemoryStream memoryStream = new MemoryStream();
      poweredBySoftguard.Save((Stream) memoryStream, ImageFormat.Png);
      memoryStream.Flush();
      memoryStream.Position = 0L;
      return (Stream) memoryStream;
    }
  }
}
