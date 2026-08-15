--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.207 
--#############################################################################
 CREATE OR ALTER PROCEDURE [dbo].[SearchReporteTotalCotizacionesCrm]
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
 SET @Sql = '	SELECT 
					COUNT(
						CASE
							WHEN Status = 1 OR Status = 2 THEN ''Abiertas'' 
							WHEN Status = 4 THEN ''Cerradas''
						ELSE ''Rechazadas'' END) as cantCotizacion,
					(CASE
							WHEN Status = 1 OR Status = 2 THEN ''Abiertas'' 
							WHEN Status = 4 THEN ''Cerradas''
						ELSE ''Rechazadas'' END) as tipoCotizacion,

					SUM ( TotalPrice ) as totalPriceCotizacion,
					SUM ( VAT ) as totalVatCotizacion,
					SUM ( TotalPrice - VAT ) as totalNetoCotizacion
				FROM [_Datos].[dbo].[Order] o
				WHERE 1 = 1 ' + @SqlFilter + ' 
				GROUP BY 
					(CASE
						WHEN Status = 1 OR Status = 2 THEN ''Abiertas'' 
						WHEN Status = 4 THEN ''Cerradas''
					ELSE ''Rechazadas'' END)
				'

 print @Sql
 exec (@sql)