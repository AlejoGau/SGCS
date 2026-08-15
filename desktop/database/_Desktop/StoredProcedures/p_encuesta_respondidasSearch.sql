CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_respondidasSearch]
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
	SET @Sql = 'SELECT enr.*, enc.enc_descripcion, enc.enc_status, sp.*, c.*, CASE
			WHEN enr_estado = 0 THEN ''Pendiente de respuesta''
			WHEN enr_estado = 1 THEN ''Iniciada no finalizada''
			ELSE ''Finalizada''
		END AS estado
		FROM [_Datos].[dbo].[p_encuesta_respondidas] enr
			LEFT JOIN [_Datos].[dbo].[p_encuesta] enc ON (enc.enc_idKey = enr.enr_encidkey)
			LEFT JOIN [_Datos].[dbo].[SmartPanic] sp ON (sp.Id = enr.enr_eprspidkey)
			LEFT JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = enr.enr_epricuenta)
		WHERE 1 = 1 
		--AND enr_fechaModificacion IS NULL
		'+@SqlFilter+'
		ORDER BY '+@SqlSort

	PRINT @Sql
	EXEC (@Sql)