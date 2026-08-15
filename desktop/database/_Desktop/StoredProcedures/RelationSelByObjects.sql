CREATE OR ALTER PROCEDURE [dbo].[RelationSelByObjects]
	@ObjectType varchar(50),
	@ObjectId int,
	@RelationObjectType varchar(50),
	@RelationObjectId int
AS
	declare @ObjectTypeId int
	declare @RelationObjectTypeId int
	select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	select @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
	Select r.RelationId, r.ObjectTypeId, o.name ObjectType, r.ObjectId, r.RelationObjectTypeId, oRelac.name RelationObjectType, r.RelationObjectId
	  from RelationObject r 
	       inner join Object o on r.ObjectTypeId = o.Id
	       inner join Object oRelac on r.RelationObjectTypeId = oRelac.Id
	 where r.ObjectTypeId = @ObjectTypeId
	       and r.ObjectId = @ObjectId
	       and r.RelationObjectTypeId = @RelationObjectTypeId
	       and r.RelationObjectId = @RelationObjectId