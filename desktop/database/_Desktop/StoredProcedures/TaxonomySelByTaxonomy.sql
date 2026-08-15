CREATE OR ALTER PROCEDURE [dbo].[TaxonomySelByTaxonomy]
	@Id int
AS
	if @Id = 0
		select Value.Id, Value.Name, Tree.ParentId
	          from TaxonomyValue Value
			inner join TaxonomyTree Tree on Value.Id = Tree.ChildId

	if @Id != 0
		select Value.Id, Value.Name, Tree.ParentId
	          from TaxonomyValue Value
			inner join TaxonomyTree Tree on Value.Id = Tree.ChildId
		 where Value.Id in (select TaxonomyId from dbo.GetTaxonomyChilds(@Id))