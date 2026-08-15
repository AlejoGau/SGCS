--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.207 
--#############################################################################
 CREATE OR ALTER PROCEDURE [dbo].[SearchReporteCotizacionesVencidasCrm]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.ForecastDate DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, '[_Datos].[dbo].[Order]', 'o.[ForecastDate]')
 
 -- Obtengo los filtros de fechas desde el filter
	 IF @filter != ''        
	 BEGIN
		SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
	
		DECLARE @Date VARCHAR(255) = ''
		-- Obtengo las fechas inicio y fin del Filter
		SELECT TOP 1 @Date = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'o.ForecastDate')
		-- Filtro desde la fecha que se indico
		IF @Date != ''
			BEGIN
				SET @SqlFilter = @SqlFilter + ' AND o.ForecastDate >= '''+@Date+''''
			END
	END

 print @SqlFilter

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = '	SELECT *
 					
				FROM [_Datos].[dbo].[Order] o
				
				WHERE 1 = 1 ' + @SqlFilter + ' 
					AND o.ForecastDate <= FORMAT(GETDATE() , ''yyyy-MM-dd HH:mm:ss'')
					AND (o.Status = 1 OR o.Status = 2)

				ORDER BY '+ @SqlSort 

 print @Sql
 exec (@sql)