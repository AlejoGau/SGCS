// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.VC_Route_Checkpoints
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using Slbf.Objects;
using Slbf.Security;

namespace SoftGuard.BusinessObjects
{
  public class VC_Route_Checkpoints : SpeVC_Route_Checkpoints
  {
    public VC_Route_Checkpoints(SqlHelper SqlConfig, int UserId)
      : base(SqlConfig, UserId)
    {
    }

    public VC_Route_Checkpoints(SqlHelper SqlConfig, string Token)
      : base(SqlConfig, UserService.GetId(Token))
    {
      this._DalObject.Token = Token ?? UserService.GetContextToken((object) null);
    }

    public VC_Route_Checkpoints(SqlHelper SqlConfig, int UserId, int Id)
      : base(SqlConfig, UserId, Id)
    {
    }

    public VC_Route_Checkpoints(SqlHelper SqlConfig, int UserId, SimpleVC_Route_Checkpoints Simple)
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

    public MetaData MetadataObject(string Name)
    {
      int id1 = this.Id;
      int id2 = this.GetObjectType().Id;
      SimpleMetaData first = MetadataManager.GetFirst(id1, id2, Name);
      MetaData metaData = ObjectFactoryService.Create<MetaData>();
      if (first != null)
        metaData.SetSimpleObject((SimpleBaseObject) first);
      metaData.Name = metaData.Name ?? Name;
      metaData.ObjectTypeId = id2;
      metaData.ObjectId = id1;
      return metaData;
    }

    public MetaData MetadataObject()
    {
      return this.MetadataObject("_properties");
    }

    public object Metadata(string Name)
    {
      return this.MetadataObject(Name).GetDynamic();
    }

    public object Metadata()
    {
      return this.MetadataObject().GetDynamic();
    }
  }
}
