CREATE OR ALTER PROCEDURE [dbo].[p_vcrestriccionesSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[vcr_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'p_vcrestricciones', '[telefono],[Imei],[cue_clinea],[cue_ncuenta]')


DECLARE @subSqlFilter as VARCHAR(MAX)
SET @subSqlFilter = '';

IF @filter != ''          
 BEGIN        
	
	--set @filter = replace(@filter,'\\u','%u')

	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		PRINT 'FilterProperty - ' + @filterproperty
		--Set Filters

		
		IF @FilterProperty = 'telefono'
			SET @subSqlFilter = @subSqlFilter + ' AND Telefono LIKE ''%'+@FilterValue+'%'''		
		ELSE IF @FilterProperty = 'Imei'
			SET @subSqlFilter = @subSqlFilter + ' AND Imei LIKE ''%'+@FilterValue+'%'''
		ELSE IF @FilterProperty = 'cue_clinea'
			SET @subSqlFilter = @subSqlFilter + ' AND cue_clinea LIKE ''%'+@FilterValue+'%'''
		ELSE IF @FilterProperty = 'cue_ncuenta'
			SET @subSqlFilter = @subSqlFilter + ' AND cue_ncuenta LIKE ''%'+@FilterValue+'%'''
	
		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END  

IF @subSqlFilter != ''
BEGIN
	SET @SqlFilter = @SqlFilter + ' AND EXISTS (
						select Id   FROM [_datos].dbo.[SmartTrack] so
						LEFT JOIN _datos..m_cuentas c with (nolock) ON (so.CuentaId = c.cue_iid)
						WHERE 1=1 
						 '+@subSqlFilter+'
						 and  Id in (select * from _Desktop.dbo.ParseArray(o.vcr_list, '',''))

			)
 '
END
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.p_vcrestricciones o
LEFT JOIN _Datos..Organization org ON vcr_idorganizacion = org.Id
			WHERE 1 = 1 ' + @SqlFilter
 --select @Sql

print @Sql

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, vcr_idkey Id, o.*, org.Name nameOrganization ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to