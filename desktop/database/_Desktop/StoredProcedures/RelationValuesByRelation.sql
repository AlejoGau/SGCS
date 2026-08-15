CREATE OR ALTER PROCEDURE [dbo].[RelationValuesByRelation]
	@RelationId int
as
	select RelationValueId, RelationType, ValueType, Value from RelationValues where RelationId = @RelationId