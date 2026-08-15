// Decompiled with JetBrains decompiler
// Type: Slbf.Services.Rest.TaxonomyTree
// Assembly: Slbf.Services.Rest, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 7573FD33-E826-4337-B134-94D834E5B70B
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\Slbf.Services.Rest.dll

using System.Collections.Generic;

namespace Slbf.Services.Rest
{
  public class TaxonomyTree
  {
    public List<TaxonomyTree> children = new List<TaxonomyTree>();

    public bool expanded { get; set; }

    public bool leaf { get; set; }

    public string text { get; set; }

    public string user { get; set; }

    public string status { get; set; }
  }
}
