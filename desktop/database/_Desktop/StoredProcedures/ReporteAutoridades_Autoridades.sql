CREATE OR ALTER PROCEDURE [dbo].[ReporteAutoridades_Autoridades]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(64) = '',            
	@filter VARCHAR(2048) = '',        
	@token VARCHAR(128) = '',     
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT 
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Tablas.dbo.t_autoridades