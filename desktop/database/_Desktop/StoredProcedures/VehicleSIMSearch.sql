CREATE OR ALTER PROCEDURE [dbo].[VehicleSIMSearch]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(64) = '',
 @group VARCHAR(64) = '',            
 @filter VARCHAR(2048) = '', 
 @token VARCHAR(128),   
 @_dc VARCHAR(256) = '',      
 @totalrows INT = 1 OUTPUT              
AS                
BEGIN                
 SET NOCOUNT ON              
	--Filters
	DECLARE @SqlFilter AS VARCHAR(Max)
	SET @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, '[_Datos].[dbo].[DispositivoMovil]', 'dm.[SIM1],dm.[SIM2]')

	-- Obtengo los filtros de fechas desde el filter
	 IF @filter != ''        
	 BEGIN
		SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
	
		DECLARE @SIM1 VARCHAR(255) = '';
		DECLARE @SIM2 VARCHAR(255) = '';

		-- Obtengo las fechas inicio y fin del Filter
		SELECT TOP 1 @SIM1 = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'dm.SIM1')
		SELECT TOP 1 @SIM2 = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'dm.SIM2')
		
	    SET @SqlFilter = @SqlFilter + ' AND (dm.[SIM1] = '''+@SIM1+''' OR dm.[SIM2] = '''+@SIM2+''')'
    END

	--RANGOS 
	DECLARE @SqlFilterRango AS VARCHAR(max) = ''
	EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	/*
	print '---';
	print @SqlFilterRango
	print '---';
	*/

	SET @SqlFilter = @SqlFilter + @SqlFilterRango
	--print @SqlFilter
 
	--print  @SqlSort

	--Sql
	DECLARE @Sql NVARCHAR(MAX) = '';
	select @Sql = ' 
			SELECT *
			FROM [_Datos].[dbo].[m_cuentas] c 
				LEFT JOIN [_Datos].[dbo].[DispositivoMovil] dm ON (c.cue_iid = dm.OwnerId )
				WHERE 1 = 1 ' + @SqlFilter

	--PRINT @sql
	EXEC (@sql)
        
END