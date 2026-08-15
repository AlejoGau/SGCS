CREATE OR ALTER PROCEDURE [dbo].[UserByDealerWithRangoSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',
 @token VARCHAR(128),
 @totalrows INT = 1 --OUTPUT     
AS  
 SET NOCOUNT ON   

	--Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)    
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[dwm_idWeb] DESC')

 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')
		
--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)
SET @SqlFilterRango = ' ';

	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId
	 and (dwm_dealer != '' and dwm_cuenta_desde != '' and dwm_cuenta_hasta != '')
		 DECLARE @Pos INT
		 SET @Pos = 1
		 WHILE( (SELECT COUNT(*) FROM #Ranges WHERE id = @Pos) != 0)
		 BEGIN
			DECLARE @DealerLinea VARCHAR(3)
			DECLARE @DealerDesde VARCHAR(4)
			DECLARE @DealerHasta VARCHAR(4)
		
			SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM #Ranges WHERE id = @Pos		
			
			IF @DealerDesde = '' OR @DealerHasta = ''	
				SET @SqlFilterRango = @SqlFilterRango + ' OR (dwm_dealer = ''' + @DealerLinea + ''' ) '		
			ELSE
				SET @SqlFilterRango = @SqlFilterRango + ' OR (dwm_dealer = ''' + @DealerLinea + ''' AND dwm_cuenta_desde <= ''' + @DealerDesde + ''' AND dwm_cuenta_hasta >= ''' + @DealerHasta +''') '		
		
			SET @Pos = @Pos + 1
		 END

		IF @SqlFilterRango != '' 
			BEGIN		 
				SET @SqlFilterRango = ' AND ( 1=2 ' + @SqlFilterRango + ' )'
			END

--print @SqlFilterRango

SET @SqlFilter = @SqlFilter + @SqlFilterRango


 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM [_Sistema]..[UsersDesktopWebModulos] o	
			INNER JOIN [_Sistema]..[UsersDesktopWeb] u ON o.dwm_idWeb = u.udw_idKey	
			WHERE 1 = 1 
					--	and udw_tipo in (1,2)	
	' +@SQLfilter + ' GROUP BY o.dwm_idWeb,  udw_usuario, udw_idKey'



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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.dwm_idWeb Id,  udw_usuario, o.dwm_idWeb ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to