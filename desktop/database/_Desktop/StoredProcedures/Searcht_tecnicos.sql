--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.570 
--#############################################################################
--select * from _tablas..t_tecnicos


							CREATE OR ALTER PROCEDURE [dbo].[Searcht_tecnicos]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',      
 @token NVARCHAR(128) = '',        
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   


 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')  
 
 DECLARE @HasWebRemotoModule INT 
 SELECT @HasWebRemotoModule = dbo.UserDesktopWebHasModule(@UserId, 'WebRemoto') 
 
 DECLARE @HasDealerModule INT 
 SELECT @HasDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebDealer')

  DECLARE @HasMasterDealerModule INT 
 SELECT @HasMasterDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'MasterWebDealer')
 
 DECLARE @HasTrackguardModule INT 
 SELECT @HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuard') 
   
 DECLARE @HasSmarttrackModule INT 
 SELECT @HasSmarttrackModule = dbo.UserDesktopWebHasModule(@UserId, 'SmartTrack')  

 DECLARE @HasSmartpanicsModule INT 
 SELECT @HasSmartpanicsModule = dbo.UserDesktopWebHasModule(@UserId, 'SmartPanics')

 DECLARE @HasTrackGuardMonitoreoModule INT 
 SELECT @HasTrackGuardMonitoreoModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuardMonitoreo')  

 DECLARE @HasSerTecModule INT 
 SELECT @HasSerTecModule = dbo.UserDesktopWebHasModule(@UserId, 'SerTec')

 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[tec_ccodigo] DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_tecnicos')

 -- rangos
 DECLARE @HasRanges INT 


 IF @HasDealerModule = 1 
	OR @HasTrackguardModule = 1 
	OR @HasTrackGuardMonitoreoModule = 1
	OR @HasSmarttrackModule = 1
	OR @HasSmartpanicsModule = 1
	OR @HasSerTecModule = 1
	OR @HasMasterDealerModule = 1
 BEGIN
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer NVARCHAR(3), desde NVARCHAR(4), hasta NVARCHAR(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId
	 and (dwm_dealer != '' and dwm_cuenta_desde != '' and dwm_cuenta_hasta != '')

	 if ((select count(*) from #Ranges) = 0)
	 BEGIN
		-- no tiene rangos tengo que ver que tipo de usuario es
		if (@HasWebRemotoModule = 1 OR @HasAdministratorModule=1)
		BEGIN
			-- tiene webremoto no hago nada
			SET @SqlFilter = @SqlFilter;
		END
		ELSE
		BEGIN
			-- no tiene web remoto, no tiene rangos no ve nada
			SET @SqlFilter = @SqlFilter + ' AND 1=2 '
		END
	 END
	 ELSE
	 BEGIN
		-- hay rangos sumo los filtros

		--Each
		 --SET @SqlFilter = @SqlFilter + ' AND ( 1=2 '
	 
		 DECLARE @Pos INT
		 SET @Pos = 1
		 WHILE( (SELECT COUNT(*) FROM #Ranges WHERE id = @Pos) != 0)
		 BEGIN
			DECLARE @DealerLinea NVARCHAR(3)
		
			SELECT @DealerLinea = dealer FROM #Ranges WHERE id = @Pos		
			--SET @SqlFilter = @SqlFilter + ' OR (cue_clinea = ''' + @DealerLinea + ''' ) '		
			
			SET @Pos = @Pos + 1
		 END
	 
		 --SET @SqlFilter = @SqlFilter + ' )'

	 END
 END
 -- fin RANGOS
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _tablas..[t_tecnicos] o
			WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, tec_idKey Id, o.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to