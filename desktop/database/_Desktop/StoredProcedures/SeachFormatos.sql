CREATE OR ALTER PROCEDURE [dbo].[SeachFormatos]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, ' for_ccodigo ASC')

--print '----'
--print @Filter 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096) = ''
 if @Filter Not Like '%"null:LIKE"%'	--Puede llegar algo asi @filter = N'[{"property":"null:LIKE","value":""}]' y se rompe la busqueda
	SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, '','[for_cdescripcionORfor_cformato],[rec_iidNOT],[rec_iid],[rec_iConexion],[rec_iConexionNOT]')
 
--print @SqlFilter
--print @SqlSort

IF @filter != ''          
BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty VARCHAR(32)
	DECLARE @FilterValue VARCHAR(64)

	DECLARE @_SqlFilter VARCHAR(MAX)
	DECLARE @_SqlFilterOR VARCHAR(MAX)
	set @_SqlFilterOR = '';

	--print '--'+@_SqlFilterOR+'///'
	declare @idreceptor varchar(10) = '0'

	set @_SqlFilter = '';
	DECLARE @Index INT
	SET @Index = 1

	DECLARE @todos INT
	SET @todos = 1

	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'
		IF @FilterProperty = 'rec_iConexion'
		BEGIN				
			SET @todos = 0;
		END
		IF @FilterProperty = 'rec_iConexionNOT'
		BEGIN				
			SET @todos = 0;
		END
		SET @Index = @Index + 1
	END
	IF @todos = 1
	BEGIN
		SET @Index = 1
		WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
		BEGIN		
			--Read
			SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
			SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
			--PRINT 'FilterProperty - ' + @filterproperty

			--Set Filters
			IF @FilterProperty = 'for_cdescripcionORfor_cformato'
				begin				
					set @_SqlFilter = @_SqlFilter + ' AND ( for_cdescripcion LIKE ''%'+@FilterValue+'%'' OR for_cformato LIKE ''%'+@FilterValue+'%'' )'
				end

			IF @FilterProperty = 'rec_iidNOT'
				begin				
					set @_SqlFilter = @_SqlFilter + 
					' AND ( for_ccodigo NOT IN (select rec_cformato from _datos..m_receptores_item where rec_iid = '
					+@FilterValue+' AND rec_iConexion = 0) )'
				end
			IF @FilterProperty = 'rec_iid'
				begin				
					select @idreceptor = @FilterValue
					set @_SqlFilter = @_SqlFilter + 
					' AND ( for_ccodigo IN (select rec_cformato from _datos..m_receptores_item where rec_iid = '
					+@FilterValue+' AND rec_iConexion = 0) )'
				end		
			SET @Index = @Index + 1
		END
	END
	ELSE 
	BEGIN
	SET @Index = 1
		WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
		BEGIN		
			--Read
			SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
			SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
			--PRINT 'FilterProperty - ' + @filterproperty

			--Set Filters
			IF @FilterProperty = 'for_cdescripcionORfor_cformato'
				begin				
					set @_SqlFilter = @_SqlFilter + ' AND ( for_cdescripcion LIKE ''%'+@FilterValue+'%'' OR for_cformato LIKE ''%'+@FilterValue+'%'' )'
				end

			IF @FilterProperty = 'rec_iidNOT'
				begin				
					set @_SqlFilter = @_SqlFilter + ' AND ( for_ccodigo NOT IN (select rec_cformato from _datos..m_receptores_item where rec_iid = '+@FilterValue+') )'
				end
			IF @FilterProperty = 'rec_iid'
				begin				
					select @idreceptor = @FilterValue
					set @_SqlFilter = @_SqlFilter + ' AND ( for_ccodigo IN (select rec_cformato from _datos..m_receptores_item where rec_iid = '+@FilterValue+') )'
				end

			--MODIFICADO POR MARTIN VELEZ 14/10/2022 PARA TAREA DS-233
			IF @FilterProperty = 'rec_iConexionNOT'
				begin				
					set @_SqlFilter = @_SqlFilter + ' AND ( for_ccodigo NOT IN (select rec_cformato from _datos..m_receptores_item where rec_iConexion = '+@FilterValue+') )'
				end
			IF @FilterProperty = 'rec_iConexion'
				begin				
					set @_SqlFilter = @_SqlFilter + ' AND ( for_ccodigo IN (select rec_cformato from _datos..m_receptores_item where rec_iConexion = '+@FilterValue+') )'
				end
			--Next
			SET @Index = @Index + 1
		END
	END
	DROP TABLE #Filters
	SET @SqlFilter = @SqlFilter + @_SqlFilter 
END 

 --print @idreceptor
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 select @Sql = 'FROM [_Datos].dbo.[m_formatos] o
		left join [_tablas].dbo.[t_codigos_alarma] c on (o.for_calarma = c.cod_ccodigo)
		left join _datos..m_receptores_item ri on ri.rec_iid = '+isnull(@idreceptor,'0') +' and ri.rec_cformato = o.for_ccodigo
		WHERE 1 = 1 ' + isnull(@SqlFilter,'')
 
 --print @Sql
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, *' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
		
 /*
 Print '----'
 print @DynamicSqlReturnRows
 */

 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to