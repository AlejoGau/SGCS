CREATE OR ALTER PROCEDURE [dbo].[SeachReceptoresCab]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_iid ASC')
 
SET @SqlSort = ' ORDER BY '+@SqlSort 

 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SET @SqlFilter = '';
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'SeachReceptoresCab','[pue_ireceptorISNOTNULL],[ipc_ireceptorISNOTNULL],[rec_cdescripcionORrec_cdll],[for_cformatoNOT],[_tienecomandos]')

--print @SqlFilter
--print '----'
IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty VARCHAR(32)
	DECLARE @FilterValue VARCHAR(64)



	DECLARE @_SqlFilter VARCHAR(MAX)
  DECLARE @_SqlFilterOR VARCHAR(MAX)
	set @_SqlFilterOR = '';

--print '--'+@_SqlFilterOR+'///'

	set @_SqlFilter = '';
	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		--PRINT 'FilterProperty - ' + @filterproperty
		
		--Set Filters
		IF @FilterProperty = 'pue_ireceptorISNOTNULL'
			begin
				IF @_SqlFilterOR != ''
					BEGIN
						set @_SqlFilterOR = @_SqlFilterOR + ' OR '
					END
				set @_SqlFilterOR = @_SqlFilterOR + ' pue_ireceptor is not null '
			end
		ELSE IF @FilterProperty = 'ipc_ireceptorISNOTNULL'
			begin
				IF @_SqlFilterOR != ''
					BEGIN
						set @_SqlFilterOR = @_SqlFilterOR + ' OR '
					END
				set @_SqlFilterOR = @_SqlFilterOR + '  ipc_ireceptor is not null '
			end
		ELSE IF @FilterProperty = 'rec_cdescripcionORrec_cdll'
			begin				
				set @_SqlFilter = @_SqlFilter + ' AND ( rec_cdescripcion LIKE ''%'+@FilterValue+'%'' OR rec_cdll LIKE ''%'+@FilterValue+'%'' )'
			end
		ELSE IF @FilterProperty = 'for_cformatoNOT'
			begin				
				set @_SqlFilter = @_SqlFilter + ' AND o.rec_iid NOT IN (SELECT rec_iid FROM [_Datos].[dbo].[m_receptores_item] WHERE rec_cformato = '''+@FilterValue+''') '
			end
		ELSE IF @FilterProperty = '_tienecomandos'
			begin				
				set @_SqlFilter = @_SqlFilter + ' AND o.rec_iEsIRS=1 AND o.rec_iid IN (SELECT distinct tcm_ireceptor FROM [_tablas].[dbo].[t_comandos]) '
			end

		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
	
	IF @_SqlFilterOR != ''
		BEGIN
			set @_SqlFilterOR = ' AND  ( ' + @_SqlFilterOR + ' ) '
		END


	SET @SqlFilter = @SqlFilter + @_SqlFilter + @_SqlFilterOR

END 




 --print @SqlFilter
 --Sql
 --2025-04-25 Pablo ; saque los join porque multiplican registros por que en ipcon una dll se puede usar decenas o cientos de veces
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Datos].dbo.[m_receptores_cab] o
--left join [_tablas].[dbo].[t_ip_con] ipcon on (o.rec_iid = ipcon.ipc_ireceptor)
--left join [_tablas].[dbo].[t_puertos] pue on (o.rec_iid = pue.pue_ireceptor)
			WHERE 1 = 1 ' + @SqlFilter

-- print @Sql


 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 --EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   
 -- calcular el total con groupby

 --Execute Sql (ReturnRows) 25/1/2018 DEDALO saco del resultado los pue y ipcon porque se duplican y no veo que los campos se usen como resultado, solo se usan de filtro.
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT max(RowNumber) as rownumber ,rec_iid,rec_cdescripcion,rec_cdll,rec_ntcpip
							   FROM ( SELECT ROW_NUMBER() OVER (' + @SqlSort + ') AS RowNumber, o.* ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to 
								
							  group by rec_iid,rec_cdescripcion,rec_cdll,rec_ntcpip
'+@SqlSort+'
							  '
							
			--print @DynamicSqlReturnRows				  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
 Print '======'
 Print '@from ' + Cast(@from As varchar(10))
 Print '@to ' + Cast(@to As varchar(10))
 Print @DynamicSqlReturnRows				    			  	 
 Print '======'
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to