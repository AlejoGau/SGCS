CREATE OR ALTER PROCEDURE [dbo].[Taxo_ComoNosConocioItemsSearch]
@page INT = 1,             
 @start INT = 0,             
 @limit INT = 50,             
 @sort NVARCHAR(64) = '',          
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = ''     
AS
BEGIN
  SELECT tv.*, tt.*, tvp.Name as ParentName FROM _Datos..TaxonomyValue tv
	INNER JOIN _Datos..TaxonomyTree tt ON tt.ChildId = tv.Id
	INNER JOIN _Datos..TaxonomyValue tvp ON tt.ParentId = tvp.Id
	WHERE tvp.Name = '_comoNosConocio'
END