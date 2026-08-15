// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.WebManagerViews
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using Slbf.Security;

namespace SoftGuard.BusinessObjects
{
  public class WebManagerViews : SpeWebManagerViews
  {
    public WebManagerViews(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
    }

    public WebManagerViews(SqlHelper SqlConfig, string Token)
      : base(SqlConfig, UserService.GetId(Token))
    {
      this._DalObject.Token = Token ?? UserService.GetContextToken((object) null);
    }

    public WebManagerViews(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId, Id)
    {
    }

    public WebManagerViews(SqlHelper SqlConfig, int UserId, SimpleWebManagerViews Simple)
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
