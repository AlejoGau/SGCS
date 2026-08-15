--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.773 
--####	#########################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchSmartTrackCuenta]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '', 
 @token NVARCHAR(128),   
 @internalToken NVARCHAR(128)='',
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON 

 -- si llamo desde un razor paso el token en otro parametro
 if (@internalToken != '')
	set @token = @internalToken
 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')    
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartTrack')
 --print '@sqlfilter'
 --print @sqlfilter
 --Puede ser llamado asi @filter = N'[{"property":"clineancuenta","value":"LOP-0004"}]', 
 set @SqlFilter = REPLACE(@sqlfilter, 'AND [clineancuenta] =', 'AND (cue_clinea + ''-'' + convert(varchar, cue_ncuenta) ) = ')
 set @SqlFilter = REPLACE(@sqlfilter, 'AND clineancuenta like', 'AND (cue_clinea + ''-'' + convert(varchar, cue_ncuenta) ) like')
 --print '@sqlfilter'
 --print @sqlfilter

DECLARE @TIEMPODISPOSITIVOS INT = 0;
SELECT @TIEMPODISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'TIEMPODISPOSITIVOS'

DECLARE @DISPERSIONDISPOSITIVOS INT = 0;
SELECT @DISPERSIONDISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'DISPERSIONDISPOSITIVOS'

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos].dbo.[SmartTrack] o
		LEFT JOIN _datos..m_cuentas c with (nolock) ON (o.CuentaId = c.cue_iid)
		LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo
		LEFT JOIN _datos..p_GpsSP g with (nolock) ON (o.imei = g.gps_cImei)
		left join [_Datos].[dbo].[m_telefonos] t with (nolock) on t.tel_ctelefono = o.telefono and t.tel_iidcuenta = o.cuentaId
		left join [_Datos].[dbo].[m_usuarios] u with (nolock) on u.usu_iid = t.tel_iid+700 and u.usu_iidcuenta = t.tel_iidcuenta
OUTER APPLY (
	SELECT 
			CASE 
						WHEN DATEDIFF(minute,gps_tfechahora, GETDATE()) > '+convert(varchar,@TIEMPODISPOSITIVOS)+'
							 THEN ''old''
						WHEN gps_rAccuracy > '+convert(varchar,@DISPERSIONDISPOSITIVOS)+'
							 THEN ''disper''	
						ELSE ''current'' 
			 END 
					as state
) as state
OUTER APPLY (
		SELECT TOP 1 * FROM [_Datos]..p_recepcion r WITH ( NOLOCK )
		inner join _tablas..t_codigos_alarma t on cod_ccodigo = r.rec_calarma
			WHERE r.rec_iidcuenta = c.cue_iid and r.rec_iid = g.gps_idRec  
			ORDER BY r.rec_tfechahora DESC
	) AS r	
		    WHERE 1 = 1 ' + @SqlFilter



 IF @HasAdministratorModule = 0 and @token !='8CDCD4D5-8284-48C0-B75A-4D3AAF379C87'
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

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,
							   [Id]
							  ,[Telefono]
							  ,[Imei]
							  ,[Modelo]
							  ,[Marca]
							  ,[Version]
							  ,[Tipo]
							  ,[CuentaId]
							  ,[Nombre]
							  ,[Config]
							  ,[fechaAlta]
							  ,[AppVersion]
							  ,[pushToken]
							  ,[EnFalloDeTesteo]
							  ,[EnFalloDeTesteoDesde]
							  ,[HBTime]
							  ,[cue_iid]
							  ,[cue_clinea]
							  ,[cue_ncuenta]
							  ,[cue_cnombre]
							  ,[cue_ccalle]
							  ,[cue_clocalidad]
							  ,[cue_cprovincia]
							  ,[cue_ccodigopostal]
							  ,[cue_ctipo]
							  ,[cue_cubicacion]
							  ,[cue_cobservacion]
							  ,[cue_cfoto]
							  ,[cue_dfechaalta]
							  ,[cue_dservicio]
							  ,[cue_nmostrar]
							  ,[cue_nsonidoul]
							  ,[cue_nllaveul]
							  ,[cue_cemail]
							  ,[cue_cinstalador]
							  ,[cue_cLatLng]
							  ,[cue_iZonaHoraria]
							  ,[cue_cPartitionInfo]
							  ,[cue_nAutoMonitoreo]
							  ,[tel_iidcuenta]
							  ,[tel_iid]
							  ,[tel_cnombre]
							  ,[tel_cobservacion]
							  ,[tel_ctelefono]
							  ,[tel_idKey]
							  ,[gps_iid]
							  ,[gps_cIMEI]
							  ,[gps_tfechahora]
							  ,[gps_idCuenta]
							  ,[gps_idRec]
							  ,[gps_rLatitud]
							  ,[gps_rLongitud]
							  ,[gps_iVelocidad]
							  ,[gps_iOdometro]
							  ,[gps_iRumbo]
							  ,[gps_cDireccion]
							  ,[gps_tRawfechahora]
							  ,[gps_rAccuracy]
							  ,[gps_cMethod]
							  ,[gps_iBattery]
							  ,[gps_iNivelSenial]
							  ,[gps_iSatelites]
							  ,[usu_iidcuenta]
							  ,[usu_icodigo]
							  ,[usu_cnombre]
							  ,[usu_iid]
							  ,[usu_cimagen]
							  ,[usu_idKey]
							  ,[rec_iid]
							  ,[rec_iidcuenta]
							  ,[rec_calarma]
							  ,[rec_czona]
							  ,[rec_iusuario]
							  ,[rec_tfechahora]
							  ,[rec_nestado]
							  ,[rec_cContenido]
							  ,[rec_cObservaciones]
							  ,[cod_cdescripcion]
							, DATEDIFF(minute,gps_tfechahora, GETDATE()) as ageGps
							, state.state
								' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 --Print '--------'
 --print @DynamicSqlReturnRows
 --Print '@from '+Cast(@from As varchar(10))
 --Print '@to '+Cast(@to As varchar(10))
 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to