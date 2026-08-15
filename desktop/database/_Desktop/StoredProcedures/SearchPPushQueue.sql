--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.207 
--#############################################################################
 CREATE OR ALTER PROCEDURE [dbo].[SearchPPushQueue]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[Id] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'p_push_queue', 'o.[ppq_fechacreacion],o.[ppq_fechacreacionEND]')
 

 -- Obtengo los filtros de fechas desde el filter
	 IF @filter != ''        
	 BEGIN
		SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
	
		DECLARE @DateCreate VARCHAR(255) = ''
		--DECLARE @DateSent VARCHAR(255) = ''
		DECLARE @DateCreateEND VARCHAR(255) = ''
		--DECLARE @DateSentEND VARCHAR(255) = ''

		-- Obtengo las fechas inicio y fin del Filter
		SELECT TOP 1 @DateCreate = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'o.ppq_fechacreacion')
		SELECT TOP 1 @DateCreateEND = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'o.ppq_fechacreacionEND')
		--SELECT TOP 1 @DateSent = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'ppq_fechaenvio')
		--SELECT TOP 1 @DateSentEND = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'ppq_fechaenvioEND')
		
	    IF @DateCreate != ''
            BEGIN
                SET @SqlFilter = @SqlFilter + ' AND o.ppq_fechacreacion >= '''+@DateCreate+''''
                --SET @SqlFilter = @SqlFilter + ' AND o.ppq_fechacreacion <= '''+@DateCreateEND+''''
            END

        /*
        IF @DateSent != ''
            BEGIN
                SET @SqlFilter = @SqlFilter + ' AND o.ppq_fechaenvio >= '''+@DateSent+''''
                SET @SqlFilter = @SqlFilter + ' AND o.ppq_fechaenvio <= '''+@DateSentEND+''''
            END
        */
	END 


 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' 	FROM _Datos.dbo.p_push_queue o
                    LEFT JOIN [_Datos].[dbo].[Message] ms on (ms.Id = o.ppq_idmessage)
                    LEFT JOIN _Datos.dbo.m_cuentas mc on (mc.cue_iid = o.ppq_idcuenta)
                    LEFT JOIN [_Datos].[dbo].[SmartPanic] sp on (sp.Id = ms.ToId)
				WHERE 1 = 1 and ms.Name !=''''
                    ' + @SqlFilter

 print @Sql
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = ' SELECT Distinct *
									,CONVERT(VARCHAR, ppq_fechacreacion, 126) AS fechacreacion
									,CONVERT(VARCHAR, ppq_fechaenvio, 126) AS fechaenvio
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber
									,o.[Id]
									  ,[ppq_msg]
									  ,[ppq_estado]
									  ,[ppq_fechacreacion]
									  ,[ppq_fechaenvio]
									  ,[ppq_idCuenta]
									  ,[ppq_idMessage]
                                    ,ms.ToId as idDestino
                                    ,ms.Body as msgBody
									,ms.Status as msStatus
									,ms.name as msName
                                    ,ms.CuentaID as cuentaOrigen
                                    ,mc.cue_clinea as clineaOrigen
                                    ,mc.cue_ncuenta as ncuentaOrigen
                                    ,mc.cue_cnombre as nombreOrigen
                                    ,sp.Id as spDestino
                                    ,sp.Telefono as telefonoDestino
                                    ,sp.Linea as lineaDestino
                                    ,sp.Nombre as nombreDestino' + @Sql + ' ) AS T
							   WHERE RowNumber BETWEEN @from AND @to '


							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

 print @DynamicSqlReturnRows