CREATE OR ALTER PROCEDURE [dbo].[SearchSmartPanicCuenta]
 @page INT = 1,               
 @start INT = 0,               
 @sort VARCHAR(256) = '',   
 @limit INT = 50,               
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '', 
 @token VARCHAR(128),                
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON 

 --11/03/2025 Daniel O. Medina reemplazo _nombreCuenta en @sort para order nar por cue_clinea y cue_ncuenta
--esto es para solucionar un error en el agrupamiento de grillas sencha
If @sort Like '%_nombreCuenta%'
Begin
	Set @sort = Replace(@sort, '{"property":"_nombreCuenta","direction":"ASC"}','{"property":"cue_clinea","direction":"ASC"},{"property":"cue_ncuenta","direction":"ASC"}')
	Set @sort = Replace(@sort, '{"property":"_nombreCuenta","direction":"DESC"}','{"property":"cue_clinea","direction":"DESC"},{"property":"cue_ncuenta","direction":"DESC"}')	
End


 --parametros
 DECLARE @TIEMPODISPOSITIVOS INT
 SELECT @TIEMPODISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'TIEMPODISPOSITIVOS'

 DECLARE @DISPERSIONDISPOSITIVOS INT
 SELECT @DISPERSIONDISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'DISPERSIONDISPOSITIVOS'

 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')
 
 if (@token = '8CDCD4D5-8284-48C0-B75A-4D3AAF379C87')
	set @HasAdministratorModule=1
 
 --Sort
 --Print 'GetSqlSortForJson con '+@sort
 DECLARE @SqlSort AS VARCHAR(256) = ''
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id DESC')

 --Print '@SqlSort'
--Print @SqlSort

 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
-- @filter [{"property":"Id:ININT","value":",19497,19682,"}]
--2022-05-13 Pablo x que el filter llega como se muestra aca arriba
If @filter Like '%Id:ININT%'
Begin
	Set @filter = Replace(@filter,'"value":",','"value":"')
	Set @filter = Replace(@filter,',"}]','"}]')
End
--

 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartPanic')
 
 --Puede ser llamado asi @filter = N'[{"property":"clineancuenta","value":"LOP-0004"}]', 
 set @SqlFilter = REPLACE(@sqlfilter, 'AND [clineancuenta] =', 'AND (cue_clinea + ''-'' + convert(varchar, cue_ncuenta) ) = ')
 set @SqlFilter = REPLACE(@sqlfilter, 'AND clineancuenta like', 'AND (cue_clinea + ''-'' + convert(varchar, cue_ncuenta) ) like')
 set @SqlFilter = REPLACE(@sqlfilter, 'AND [IsWeSafe] = ''1''', 'AND (AppType >= 2000 AND AppType <= 3000)')
 set @SqlFilter = REPLACE(@sqlfilter, 'AND [IsWeSafe] = ''0''', 'AND (AppType < 2000 OR AppType > 3000)')
 
--print '@sqlfilter'
print @sqlfilter

-- Print '@UserId'
-- print @UserId

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos].dbo.[SmartPanic] o WITH ( NOLOCK )
				  LEFT JOIN _datos..m_cuentas c with (nolock) ON (o.CuentaId = c.cue_iid)
    LEFT JOIN [_Tablas].[dbo].[t_provincias] p ON c.cue_cprovincia = p.pro_ccodigo
				  LEFT JOIN _datos..p_GpsSP g WITH ( NOLOCK ) ON (o.imei = g.gps_cImei)
				  left join _sistema..usersdesktopweb u WITH ( NOLOCK ) on (u.udw_idkey = o.awccUserId)
				  left join _datos..m_telefonos t WITH ( NOLOCK ) on (RIGHT(t.tel_ctelefono, 8) = RIGHT(o.Telefono, 8)) AND tel_iidcuenta = c.cue_iid and t.tel_nsp IN (1,3)
				  left join _datos..m_usuarios usu WITH ( NOLOCK ) on (usu_iidcuenta = c.cue_iid and usu_iid = t.tel_iid+700)
				  left join _datos..p_spremotebtn btn WITH ( NOLOCK ) on o.imei = btn.srb_spimei


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

--Print '@HasAdministratorModule'
--Print @HasAdministratorModule

 IF @HasAdministratorModule = 0 
 BEGIN
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId and um.dwm_dealer !=''
	 

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
			SET @Sql = @Sql + ' OR (Linea = ''' + @DealerLinea + ''' AND [cue_ncuenta] is null or [cue_ncuenta] = '''') '	
				
		SET @Pos = @Pos + 1
	 END
	 
	 SET @Sql = @Sql + ' )'	
 END     
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'

 --print @DynamicSqlTotalRows
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --PRINT @SqlSort

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT *
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.*
	  ,[cue_iid]
      ,[cue_clinea]
      ,[cue_ncuenta]
      ,[cue_cnombre]
      ,[cue_ccalle]
      ,[cue_clocalidad]
      ,[p].[pro_cdescripcion] AS cue_cprovincia
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
	  ,[udw_idKey]
      ,[udw_usuario]
      ,[udw_nombre]
      ,[udw_apellido]
      ,[udw_empresa]
      ,[udw_estado] 
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
	  ,usu_ntipo
	  ,usu_mobservacion
	  ,usu_cIdExtendido
	  ,usu_cclave
	  ,[rec_iid]
      ,[rec_iidcuenta]
      ,[rec_calarma]
      ,[rec_czona]
      ,[rec_iusuario]
      ,[rec_tfechahora]
      ,[rec_nestado]
      ,[rec_cContenido]
      ,[rec_cObservaciones]
	  ,srb_idkey
	  ,srb_button_uuid
	  ,[cod_cdescripcion]
	  ,CASE WHEN AppType >= 2000 AND AppType < 3000 THEN 1 ELSE 0 END IsWeSafe
	  ,CASE WHEN DATEADD(minute, -'+CONVERT(VARCHAR(10),@TIEMPODISPOSITIVOS )+', GETDATE()) >  gps_tfechahora THEN 				
					''/resources/softguard/images/mapguard-cservice/sp_old.png''
			WHEN gps_rAccuracy > '+CONVERT(VARCHAR(10),@DISPERSIONDISPOSITIVOS)+' THEN 
				''/resources/softguard/images/mapguard-cservice/sp_disper.png''				
			ELSE 
				''/resources/softguard/images/mapguard-cservice/sp.png''
			END AS icon
			' + @Sql + ' ) AS T
			WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
Print '-----'
print Cast(@DynamicSqlReturnRows  As NText)
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to