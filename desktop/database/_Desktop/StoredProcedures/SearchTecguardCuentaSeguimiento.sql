CREATE OR ALTER PROCEDURE [dbo].[SearchTecguardCuentaSeguimiento]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '', 
 @token NVARCHAR(128),                
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON 
 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')    
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.cue_iid DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Cuenta')
 set @SqlFilter = REPLACE(@sqlfilter, 'AND clineancuenta like', 'AND (cue_clinea + ''-'' + convert(varchar, cue_ncuenta) ) like')
 --print '@sqlfilter'
 --print @sqlfilter

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..m_cuentas (nolock) o
				  left join _tablas..t_timezone gmt WITH (NOLOCK) on o.cue_iZonaHoraria = gmt.ttz_idkey
					LEFT JOIN [_Tablas].[dbo].[t_tipos] (nolock) tip ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(o.cue_ctipo))
					LEFT JOIN _datos..p_GpsSP (nolock) g ON (o.cue_cimei = g.gps_cImei)
				  CROSS APPLY 
					(SELECT TOP 1 [sp_iid]
						  ,[sp_tfechahora]
						  ,[sp_cIMEI]
						  ,[sp_rLatitud]
						  ,[sp_rLongitud]
						  ,[sp_rAccuracy]
						  ,[sp_iVelocidad]
						  ,[sp_iRumbo]
						  ,[sp_iOdometro]
						  ,[sp_iBatt]
						  ,[sp_iSecuencia]
						  ,[sp_reciid]
					 FROM _datos..p_posicionesSP pos (NOLOCK)
					 WHERE pos.sp_cIMEI=o.cue_cimei
					 order by sp_iid desc
					) AS POS
		    WHERE 1 = 1 ' + @SqlFilter

declare @Sqlcount nvarchar(4000)='';
SET @Sqlcount = N'FROM _datos..m_cuentas (nolock) o 
		
	WHERE 1 = 1 ' + @SqlFilter

 IF @HasAdministratorModule = 0
 BEGIN
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer NVARCHAR(3), desde NVARCHAR(4), hasta NVARCHAR(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId
	 
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
			
		IF @DealerDesde = '' OR @DealerHasta = ''	
			SET @Sql = @Sql + ' OR (cue_clinea = ''' + @DealerLinea + ''' ) '		
		ELSE
			SET @Sql = @Sql + ' OR (cue_clinea = ''' + @DealerLinea + ''' AND cue_ncuenta BETWEEN ''' + @DealerDesde + ''' AND ''' + @DealerHasta + ''') '		
		
		SET @Pos = @Pos + 1
	 END
	 
	 SET @Sql = @Sql + ' )'	
 END     

 print @sql

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sqlcount
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, *
							   , convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (g.gps_tRawfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tRawfechahoraOffset
								' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to