CREATE OR ALTER PROCEDURE [dbo].[RelationValuesByObjects]
	@ObjectType varchar(50),
	@ObjectId int,
	@RelationObjectType varchar(50),
	@RelationObjectId int
AS
	declare @ObjectTypeId int
	declare @RelationObjectTypeId int
	select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	select @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
	select V.RelationValueId, V.RelationType, V.ValueType, V.Value 
	  from RelationValues V 
	       inner join RelationObject O
		       on V.RelationId = O.RelationId
	where O.ObjectTypeId = @ObjectTypeId
	      and O.ObjectId = @ObjectId
	      and O.RelationObjectTypeId = @RelationObjectTypeId
	      and O.RelationObjectId = @RelationObjectId