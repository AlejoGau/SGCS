CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_estadoFinalCheck]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT 
AS
set noCount on
	
	--Sort
	DECLARE @SqlSort AS VARCHAR(256)
	SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'enr_estado DESC')
 
	--Filters
	DECLARE @SqlFilter AS VARCHAR(4096)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_encuesta_respondidas')
 
	--Sql
	DECLARE @Sql NVARCHAR(MAX)
	SET @Sql = 'SELECT COUNT(*) as cantidad, CASE
			WHEN enr_estado = 0 THEN ''Pendiente de respuesta''
			WHEN enr_estado = 1 THEN ''Iniciada no finalizada''
			ELSE ''Finalizada''
		END AS estado
		FROM [_Datos].[dbo].[p_encuesta_respondidas]
		WHERE 1 = 1'+@SqlFilter+'
		GROUP BY enr_estado' 

	PRINT @Sql
	EXEC (@Sql)