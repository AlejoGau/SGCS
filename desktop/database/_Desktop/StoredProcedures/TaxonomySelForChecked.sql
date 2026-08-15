CREATE OR ALTER PROCEDURE [dbo].[TaxonomySelForChecked]
	@ObjectTypeId int
,	@ObjectId int
as
	select TaxonomyId
	from ObjectTaxonomy
	where ObjectTypeId = @ObjectTypeId
	and ObjectId = @ObjectId