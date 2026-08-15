// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.ZonaTemp
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using Slbf.Security;

namespace SoftGuard.BusinessObjects
{
  public class ZonaTemp : SpeZonaTemp
  {
    public ZonaTemp(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
    }

    public ZonaTemp(SqlHelper SqlConfig, string Token)
      : base(SqlConfig, UserService.GetId(Token))
    {
      this._DalObject.Token = Token;
    }

    public ZonaTemp(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId, Id)
    {
    }

    public ZonaTemp(SqlHelper SqlConfig, int UserId, SimpleZonaTemp Simple)
      : base(SqlConfig, UserId, Simple)
    {
    }

    public override void Save()
    {
      int id = this.Id;
      base.Save();
      if (id == 0)
        this.OnAfterInsert(new SimpleEventArgs(this.GetSimpleObject()));
      if (id == 0)
        return;
      this.OnAfterUpdate(new SimpleEventArgs(this.GetSimpleObject()));
    }

    public override void Delete()
    {
      base.Delete();
      this.OnAfterDelete(new SimpleEventArgs(this.GetSimpleObject()));
    }

    public override void Load(int Id)
    {
      base.Load(Id);
      this.OnAfterSelect(new SimpleEventArgs(this.GetSimpleObject()));
    }
  }
}
