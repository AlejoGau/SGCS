CREATE OR ALTER PROCEDURE [dbo].[SearchVCCuentaSeguimiento]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '', 
 @token VARCHAR(128) = '',                
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON 
 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')    
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartTrack')
 set @SqlFilter = REPLACE(@sqlfilter, 'AND clineancuenta like', 'AND (cue_clinea + ''-'' + convert(varchar, cue_ncuenta) ) like')
 --print '@sqlfilter'
 --print @sqlfilter

 DECLARE @TIEMPODISPOSITIVOS INT = 0;
 SELECT @TIEMPODISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'TIEMPODISPOSITIVOS'

 DECLARE @DISPERSIONDISPOSITIVOS INT = 0;
 SELECT @DISPERSIONDISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'DISPERSIONDISPOSITIVOS'

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' FROM [_datos].dbo.[SmartTrack] o
				  LEFT JOIN _datos..m_cuentas c ON (o.CuentaId = c.cue_iid)
					LEFT JOIN [_Tablas].[dbo].[t_tipos] tip ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(c.cue_ctipo))
					
				  LEFT JOIN _datos..p_GpsSP g ON (o.imei = g.gps_cImei)
				  OUTER APPLY 
					(SELECT TOP 1 [gps_tfechahora] As posTFH ,[gps_tRawfechahora] AS posTRFH
					 FROM _datos..p_posicionesSP pos (NOLOCK)
					 WHERE pos.sp_cIMEI=o.Imei
					 ORDER BY sp_iid desc
					) AS POS
				  OUTER APPLY 
					(SELECT TOP 1 posGPS.[gps_tfechahora] As posGPSTFH , posGPS.[gps_tRawfechahora] AS posGPSTRFH
					 FROM _datos..[p_PosicionesGPS] posGPS (NOLOCK)
					 WHERE posGPS.gps_cIMEI=o.Imei
					 ORDER BY posGPS.gps_iid desc
					) AS POSGPS
					OUTER APPLY (
						SELECT 
							CASE 
								WHEN DATEDIFF(minute,g.gps_tfechahora, GETDATE()) > '+convert(varchar,@TIEMPODISPOSITIVOS)+'
										THEN ''old''
								WHEN g.gps_rAccuracy > '+convert(varchar,@DISPERSIONDISPOSITIVOS)+'
										THEN ''disper''	
								ELSE ''current'' 
								END 
								as state
					) as state
		    WHERE 1 = 1 ' + @SqlFilter

 IF @HasAdministratorModule = 0
 BEGIN
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
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
		DECLARE @DealerLinea VARCHAR(3)
		DECLARE @DealerDesde VARCHAR(4)
		DECLARE @DealerHasta VARCHAR(4)
		
		SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM #Ranges WHERE id = @Pos		
			
		IF @DealerDesde = '' OR @DealerHasta = ''	
			SET @Sql = @Sql + ' OR (cue_clinea = ''' + @DealerLinea + ''' ) '		
		ELSE
			SET @Sql = @Sql + ' OR (cue_clinea = ''' + @DealerLinea + ''' AND cue_ncuenta BETWEEN ''' + @DealerDesde + ''' AND ''' + @DealerHasta + ''') '		
		
		SET @Pos = @Pos + 1
	 END
	 
	 SET @Sql = @Sql + ' )'	
 END     

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT *,IsNull(posTFH,posGPSTFH) As gps_tfechahora, IsNull(posTRFH,posGPSTRFH) As gps_tRawfechahora
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, * ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '

/*
 Print '====='
 Print @DynamicSqlReturnRows
 Print '====='
*/
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to