CREATE OR ALTER PROCEDURE [dbo].[TaxonomySelFirstChilds] @TaxonomyId INT
AS
SELECT * FROM Taxonomies WHERE ParentId = @TaxonomyId