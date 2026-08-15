CREATE OR ALTER PROCEDURE [dbo].[SearchDelRelationByChildObject]
	@RelationObjectTypeId INT,
	@RelationObjectId INT,
	@ParentObjectTypeId INT,
	@ParentObjectId INT
AS
	set noCount on
										
BEGIN
																	
	delete from [_Datos]..[RelationObject]
		where ObjectTypeId = @ParentObjectTypeId
		and ObjectId = @ParentObjectId
		and RelationObjectTypeId = @RelationObjectTypeId
		and RelationObjectId = @RelationObjectId
END