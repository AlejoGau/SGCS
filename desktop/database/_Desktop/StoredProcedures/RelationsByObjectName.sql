CREATE OR ALTER PROCEDURE [dbo].[RelationsByObjectName]
	@ObjectType varchar(50) = null,
	@ObjectId int = null,
	@RelationObjectType varchar(50) = null,
	@RelationObjectId int = null
AS
	Set NoCount ON	
	declare @ObjectTypeId int, 		
		@RelationObjectTypeId int,
		@sql varchar(1000)	
	set @sql = 'select ro.RelationId, ro.ObjectTypeId, oto.Name ObjectType, ro.ObjectId, ro.RelationObjectTypeId, otr.Name RelationObjectType, ro.RelationObjectId
 	  	        from RelationObject ro 
			   inner join Object oto on ro.ObjectTypeId = oto.Id
			   inner join Object otr on ro.RelationObjectTypeId = otr.Id
		     where 1=1 ' 
	if @ObjectType != null
	   begin
   	      set @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	      set @sql = @sql + ' and ro.ObjectTypeId = ' + cast(@ObjectTypeId as varchar(15))
	   end	           		  
	if @ObjectId != null 
         	      set @sql = @sql + ' and ro.ObjectId = ' + cast(@ObjectId as varchar(15))
	
	if @RelationObjectType != null
	   begin
	      set @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
         	      set @sql = @sql + ' and ro.RelationObjectTypeId = ' + cast(@RelationObjectTypeId as varchar(15))
	   end	 
	if @RelationObjectId != null 
         	      set @sql = @sql + ' and ro.RelationObjectId = ' + cast(@RelationObjectId as varchar(15))
	
	exec(@sql)