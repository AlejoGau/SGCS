CREATE OR ALTER PROCEDURE [dbo].[t_instaladoresByTokenSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',  
 @DealerAndNull VARCHAR(128) = '',
 @token VARCHAR(128),    
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
       

 print @HasMasterDealerModule
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[ins_cnombre] ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 select @filter = REPLACE(@filter,'ins_cnombre','ins_cnombre:LIKE')
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 't_instaladores')


DECLARE @filterDealers VARCHAR(MAX)
SET @filterDealers = '';

 -- RANGOS
 DECLARE @HasRanges INT 
 IF (@HasDealerModule = 1 
	OR @HasTrackguardModule = 1 
	OR @HasTrackGuardMonitoreoModule = 1
	OR @HasSmarttrackModule = 1
	OR @HasSmartpanicsModule = 1
	OR @HasSerTecModule = 1
	OR @HasMasterDealerModule = 1)
	AND @HasAdministratorModule != 1
 BEGIN
print 'paso 1';
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
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
			SET @filterDealers = @filterDealers;
		END
		ELSE
		BEGIN
			-- no tiene web remoto, no tiene rangos no ve nada
			SET @filterDealers = @filterDealers + ' AND 1=2 '
		END
	 END
	 ELSE
	 BEGIN
		-- hay rangos sumo los filtros
		declare @lineas varchar(max)  = ''
		DECLARE @Pos INT
		 SET @Pos = 1
		 WHILE( (SELECT COUNT(*) FROM #Ranges WHERE id = @Pos) != 0)
		 BEGIN
			DECLARE @DealerLinea VARCHAR(3)
			DECLARE @DealerDesde VARCHAR(4)
			DECLARE @DealerHasta VARCHAR(4)
		
			SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM #Ranges WHERE id = @Pos		

			if @pos > 1
			BEGIN 
			SET @lineas = @lineas + ','
			END
			
			SET @lineas = @lineas + ''''+@DealerLinea+''''
			SET @Pos = @Pos + 1
		 END

		--Each
		 SET @filterDealers = @filterDealers + ' AND (
			ins_idKey in (
				select [tid_iidInstalador]  from _Tablas..t_InstaladoresDealer
				left JOIN _Tablas..t_lineas l ON lin_idKey = tid_iidDealer
				where l.lin_ccodigo in ('+@lineas+')
				) ) OR ins_cDealer in ('+@lineas+')'

	 END
 END
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _tablas..t_instaladores o
			WHERE 1 = 1 ' + @SqlFilter +@filterDealers


	IF @DealerAndNull != '' 
	BEGIN
		print @DealerAndNull
		SET @sql = @sql + ' AND ins_cDealer = '''+@DealerAndNull+''' OR ins_cDealer is null OR ins_cDealer = '''' '
	END

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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, ins_idKey Id, o.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to