--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.207 
--#############################################################################
 CREATE OR ALTER PROCEDURE [dbo].[SearchReporteCotizacionesCrm]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id ASC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, '[_Datos].[dbo].[Order]', 'o.[DateCreated],o.[ForecastDate]')
 
 -- Obtengo los filtros de fechas desde el filter
	 IF @filter != ''        
	 BEGIN
		SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
	
		DECLARE @DateCreate VARCHAR(255) = ''
		DECLARE @Date VARCHAR(255) = ''
		-- Obtengo las fechas inicio y fin del Filter
		SELECT TOP 1 @DateCreate = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'o.DateCreated')
		SELECT TOP 1 @Date = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'o.ForecastDate')
		-- Filtro desde la fecha que se indico
		IF @DateCreate != ''
			BEGIN
				SET @SqlFilter = @SqlFilter + ' AND o.DateCreated >= '''+@DateCreate+''''
			END
		IF @Date != ''
			BEGIN
				SET @SqlFilter = @SqlFilter + ' AND o.ForecastDate >= '''+@Date+''''
			END
	END

print @SqlFilter

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' 	FROM [_Datos].[dbo].[Order] o
					LEFT JOIN _Datos..Organization org ON o.ClientId = org.Id
				WHERE 1 = 1 ' + @SqlFilter

 print @Sql
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = ' SELECT *
									,CONVERT(VARCHAR, [DateCreated], 126) AS fechaCreacion
									,CONVERT(VARCHAR, [ForecastDate], 126) AS fechaProbable
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber
									,o.*
									,org.Name as orgName
									' + @Sql + ' ) AS T
							   WHERE RowNumber BETWEEN @from AND @to '

 print @DynamicSqlReturnRows
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to