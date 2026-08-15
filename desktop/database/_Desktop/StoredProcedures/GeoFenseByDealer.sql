--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.277 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.503 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[GeoFenseByDealer]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(64) = '',            
 @filter NVARCHAR(2048) = '',      
 @texto NVARCHAR(128) = '', 
 @token NVARCHAR(128),     
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT              
AS                
BEGIN                
 SET NOCOUNT ON              
 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
  
 DECLARE @HasAdministratorModule INT 
 DECLARE @HasTrackguardModule INT
 DECLARE @HasTrackguardMonitoreoModule INT

 DECLARE @HasWebRemotoModule INT 
 SELECT @HasWebRemotoModule = dbo.UserDesktopWebHasModule(@UserId, 'WebRemoto') 
 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator'),
		@HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'Trackguard'),
		@HasTrackguardMonitoreoModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackguardMonitoreo')
            
 --Order          
 DECLARE @SortField NVARCHAR(64)           
 DECLARE @SortDirection NVARCHAR(4)          
 SELECT @SortField = 'g.Name', @SortDirection = 'ASC'          
           
 IF @sort != ''          
 BEGIN          
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                   
 END          
                 
declare @SqlSort NVARCHAR(max)
set @SqlSort = @SortField +' '+@SortDirection


 DECLARE @Sql NVARCHAR(MAX)          
 SET @Sql = 'select g.[Id]
      ,g.[Name]
      ,g.[GeoType]
      ,g.[Dealer]
      ,g.[MetaData]
      ,g.[Style]
      ,g.[MaxSpeed], l.lin_crazonsocial, gc.cuentaId, isnull(gr.grg_idKey,0) as GeoGroup, isnull(gr.grg_cdescripcion,'''') as GeoGroupName, ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber        
      FROM _Datos.dbo.GeoFense g
	  LEFT JOIN _Tablas.dbo.t_lineas l ON l.lin_ccodigo = g.Dealer
	  LEFT JOIN _Datos.dbo.GeoFenseCuenta gc ON gc.GeoFenseId = g.Id
	  LEFT JOIN _Tablas.[dbo].[t_Grupos_Geofence] gr ON gr.grg_idKey = g.GeoGroup
     WHERE 1 = 1 '  

                       
 
 --Filters
IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		
		--Set Filters		
		IF @FilterProperty = 'Cuenta'
			SET @Sql = @Sql + ' AND gc.CuentaId = ' + @FilterValue 
		ELSE IF @FilterProperty = 'Cuenta:NOT'
			SET @Sql = @Sql + ' AND ( gc.CuentaId is null or gc.CuentaId != ' + @FilterValue +')'
		ELSE IF @FilterProperty = 'MetaData:LIKE'
			SET @Sql = @Sql + ' AND MetaData LIKE ''%'+@FilterValue+'%'''
		ELSE IF @FilterProperty = 'MetaData:LIKENOT'
			SET @Sql = @Sql + ' AND MetaData NOT LIKE ''%'+@FilterValue+'%'''
		ELSE
			SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''     
		
		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END       
 
 --Filter Security
 
 IF (@HasTrackguardModule != 0 OR @HasTrackguardMonitoreoModule != 0)  AND @HasAdministratorModule = 0
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
			SET @Sql = @Sql;
		END
		ELSE
		BEGIN
			-- no tiene web remoto, no tiene rangos no ve nada
			SET @Sql = @Sql + ' AND 1=2 '
		END
	 END
	 ELSE
	 BEGIN
		-- hay rangos sumo los filtros

		--Each
		 SET @Sql = @Sql + ' AND ( 1=2 '
	 
		 DECLARE @Pos INT
		 SET @Pos = 1
		 WHILE( (SELECT COUNT(*) FROM #Ranges WHERE id = @Pos) != 0)
		 BEGIN
			DECLARE @DealerLinea NVARCHAR(3)
			DECLARE @DealerDesde NVARCHAR(4)
			DECLARE @DealerHasta NVARCHAR(4)
		
			SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM #Ranges WHERE id = @Pos		

			SET @Sql = @Sql + ' OR (Dealer = ''' + @DealerLinea + ''' ) '
		
			SET @Pos = @Pos + 1
		 END
	 
		 SET @Sql = @Sql + ' )'
	 END
 END
          
               
 PRINT(@Sql)              
 EXEC(@Sql)              
                          

--Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = max(RowNumber) from ('+@Sql+') x'
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT  
 
set @sql = 'with CTE  as ('+@sql+')
			select * from CTE
			WHERE RowNumber BETWEEN ('+cast(@page as NVARCHAR(5))+' - 1) * '+cast(@limit as NVARCHAR(5))+' + 1 AND ('+cast(@page as NVARCHAR(5))+' * '+cast(@limit as NVARCHAR(5))+')    
			ORDER BY ' +REPLACE(REPLACE(REPLACE(@SqlSort,'g.','')  ,'o.','') ,'r.','')
print @sql

EXEC (@SQL)     
              
END