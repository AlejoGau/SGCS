
      using System;
      using System.Xml;
      using System.Data;
      using Slbf;
      using Slbf.Helpers;
	  using System.Collections.Generic;

namespace SoftGuard.BusinessObjects
{ 
   ///<summary>
     ///t_organizacion_fc class   
     ///</summary>
    public partial class t_organizacion_fc : Spet_organizacion_fc
    {  ///<summary>
     ///Constructor   
     ///</summary>
    		public t_organizacion_fc(SqlHelper SqlConfig, int UserId) : base(SqlConfig, UserId)
    		{
    		}

 ///<summary>
     ///Constructor   
     ///</summary>
    		public t_organizacion_fc(SqlHelper SqlConfig, string Token) : base(SqlConfig, Slbf.Security.UserService.GetId(Token))
    		{
				this._DalObject.Token = Token ?? Slbf.Security.UserService.GetContextToken(null);
    		}
			
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public t_organizacion_fc(SqlHelper SqlConfig, int UserId, int Id) : base(SqlConfig, UserId, Id)
    		{
    		}
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public t_organizacion_fc(SqlHelper SqlConfig, int UserId, Simplet_organizacion_fc Simple) : base(SqlConfig, UserId, Simple)
    		{
    		}					
 ///<summary>
     ///Saves object data   
     ///</summary>
public override void Save()
		{
			int OldId = base.Id;
			base.Save();

			//Save

			if(OldId == 0)
			   OnAfterInsert(new SimpleEventArgs(this.GetSimpleObject()));
			
			if(OldId != 0)
			   OnAfterUpdate(new SimpleEventArgs(this.GetSimpleObject()));
				
		}
		 ///<summary>
     ///Delete object   
     ///</summary>
		public override void Delete()
		{
			base.Delete ();

			//Delete

			OnAfterDelete(new SimpleEventArgs(this.GetSimpleObject()));
		}
		 ///<summary>
     ///Load object data   
     ///</summary>
		public override void Load(int Id)
		{
			base.Load (Id);

			//Load

			OnAfterSelect(new SimpleEventArgs(this.GetSimpleObject()));
		}		

        public Slbf.Objects.MetaData MetadataObject(string Name)
        {
            var objectId = this.Id;
            var objectTypeId = this.GetObjectType().Id;
            var o = Slbf.Objects.MetadataManager.GetFirst(objectId, objectTypeId, Name);
            var Out = ObjectFactoryService.Create<Slbf.Objects.MetaData>();
            if (o != null)
			{
                Out.SetSimpleObject(o);
			}
			Out.Name = Out.Name ?? Name;
			Out.ObjectTypeId = objectTypeId;
            Out.ObjectId = objectId;
            return Out;
        }

        public Slbf.Objects.MetaData MetadataObject()
        {
            return MetadataObject(Slbf.Objects.MetadataManager.DefaultName);
        }

        public dynamic Metadata(string Name)
        {
            return MetadataObject(Name).GetDynamic();
        }

        public dynamic Metadata()
        {
            return MetadataObject().GetDynamic();
        }

 }

}
