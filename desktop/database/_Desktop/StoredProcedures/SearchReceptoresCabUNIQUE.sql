--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.007 
-- 2023-03-23 : Se filtra por los receptores que son de IRS AND o.[rec_iEsIRS]=1
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchReceptoresCabUNIQUE]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',    
 @conIdItem INT = 0,
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 

  --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_iid ASC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SET @SqlFilter = '';
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'SeachReceptoresCab','[pue_ireceptorISNOTNULL],[ipc_ireceptorISNOTNULL],[rec_cdescripcionORrec_cdll],[for_cformatoNOT],[for_cformato],[for_ccodigo],[for_ccodigoNOT]')

--print @SqlFilter
--print '----'
IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)
	DECLARE @_SqlFilter NVARCHAR(MAX)
	DECLARE @_SqlFilterOR NVARCHAR(MAX)
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
		
		IF @FilterProperty = 'ipc_ireceptorISNOTNULL'
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
				set @_SqlFilter = @_SqlFilter + ' AND o.[rec_iEsIRS]=1 AND 
				o.rec_iid NOT IN (SELECT rec_iid FROM [_Datos]..[m_receptores_item] 
					inner join _datos..m_formatos on for_ccodigo = rec_cformato
					WHERE for_cformato = '''+@FilterValue+''') '
			end
		ELSE IF @FilterProperty = 'for_cformato'
			begin			
				IF @conIdItem != 1
					BEGIN
						set @_SqlFilter = @_SqlFilter + ' AND 
						o.rec_iid IN (SELECT rec_iid FROM [_Datos]..[m_receptores_item] 
							inner join _datos..m_formatos on for_ccodigo = rec_cformato
							WHERE for_cformato = '''+@FilterValue+''') '
					END
				ELSE
					BEGIN
						set @_SqlFilter = @_SqlFilter + ' AND for_cformato = '''+@FilterValue+'''';
					END
			end
		ELSE IF @FilterProperty = 'for_ccodigo'
			begin			
						set @_SqlFilter = @_SqlFilter + ' AND 
						o.rec_iid IN (SELECT rec_iid FROM [_Datos]..[m_receptores_item] 
							WHERE rec_cformato = '''+@FilterValue+''') '
			end

		ELSE IF @FilterProperty = 'for_ccodigoNOT'
			begin			
						set @_SqlFilter = @_SqlFilter + ' AND o.[rec_iEsIRS]=1 AND 
						o.rec_iid NOT IN (SELECT rec_iid FROM [_Datos]..[m_receptores_item] 
							WHERE rec_cformato = '''+@FilterValue+''') '
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
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM (select distinct o.rec_iid, o.rec_cdescripcion, o.rec_ntcpip from [_Datos].dbo.[m_receptores_cab] o
left join [_Datos]..m_receptores_item i on (o.rec_iid = i.rec_iid)
			WHERE 1 = 1 AND o.[rec_iEsIRS]=1 AND o.rec_iid NOT IN (SELECT rec_iid FROM [_Datos]..[m_receptores_item] WHERE rec_cformato = '''') ' + @SqlFilter + ')'

-- print @Sql

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 --EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   

 IF @conIdItem != 1
	BEGIN


		 SET @DynamicSqlReturnRows = 'select distinct o.rec_iid, o.rec_cdescripcion, o.rec_ntcpip
						from [_Datos].dbo.[m_receptores_cab] o
						left join [_Datos]..m_receptores_item i on (o.rec_iid = i.rec_iid)
						WHERE 1 = 1  AND o.[rec_iEsIRS]=1 AND o.rec_iid NOT IN (SELECT rec_iid FROM [_Datos]..[m_receptores_item] WHERE rec_cformato = '''')
						' + @SqlFilter + '
						order by '+ @SqlSort
	END
 ELSE 
	BEGIN
		SET @DynamicSqlReturnRows = 'select o.rec_iid, max(rec_idKey) Id, o.rec_cdescripcion, o.rec_ntcpip 
						from [_Datos].dbo.[m_receptores_cab] o
						
						left join [_Datos]..m_receptores_item i on (o.rec_iid = i.rec_iid)
						INNER JOIN _datos..m_formatos ON for_ccodigo = rec_cformato
						 WHERE 1 = 1  ' + @SqlFilter + '
						group by o.rec_iid, o.rec_cdescripcion, o.rec_ntcpip
						order by '+ @SqlSort
	END

							  

 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'	
 
 
 --print @DynamicSqlReturnRows		  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
		  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to




 /*
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_iid ASC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SET @SqlFilter = '';
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'SeachReceptoresCab','[pue_ireceptorISNOTNULL],[ipc_ireceptorISNOTNULL],[rec_cdescripcionORrec_cdll],[for_cformatoNOT]')

print @SqlFilter
print '----'
IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)



	DECLARE @_SqlFilter NVARCHAR(MAX)
  DECLARE @_SqlFilterOR NVARCHAR(MAX)
	set @_SqlFilterOR = '';

print '--'+@_SqlFilterOR+'///'

	set @_SqlFilter = '';
	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		PRINT 'FilterProperty - ' + @filterproperty
		
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
				set @_SqlFilter = @_SqlFilter + ' AND o.rec_iid NOT IN (SELECT rec_iid FROM [_Datos].dbo.[m_receptores_item] WHERE rec_cformato = '''+@FilterValue+''') '
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




 print @SqlFilter
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM (select distinct o.rec_iid, o.rec_cdescripcion, o.rec_ntcpip from [_Datos].dbo.[m_receptores_cab] o
left join [_tablas].[dbo].[t_ip_con] ipcon on (o.rec_iid = ipcon.ipc_ireceptor)
left join [_tablas].[dbo].[t_puertos] pue on (o.rec_iid = pue.pue_ireceptor)
			WHERE 1 = 1 ' + @SqlFilter + ')'

 print @Sql

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 --EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'select distinct o.rec_iid, o.rec_cdescripcion, o.rec_ntcpip from [_Datos].dbo.[m_receptores_cab] o
 left join [_tablas].[dbo].[t_ip_con] ipcon on (o.rec_iid = ipcon.ipc_ireceptor)
 left join [_tablas].[dbo].[t_puertos] pue on (o.rec_iid = pue.pue_ireceptor)
			WHERE 1 = 1  AND o.rec_iid NOT IN (SELECT rec_iid FROM [_Datos].dbo.[m_receptores_item] WHERE rec_cformato = '''')
			' + @SqlFilter + '
			order by '+ @SqlSort
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'	
 
 
 print @DynamicSqlReturnRows		  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
		  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

 */