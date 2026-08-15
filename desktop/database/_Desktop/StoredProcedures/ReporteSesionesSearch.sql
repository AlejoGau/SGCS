CREATE OR ALTER PROCEDURE [dbo].[ReporteSesionesSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[clave] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 's_operadores')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM (
				SELECT ''UsersDesktopWebCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Sistema]..[UsersDesktopWeb] With (NOLOCK)

					UNION ALL
				SELECT ''TokenCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Desktop]..[Token] With (NOLOCK)

					UNION ALL	
				SELECT ''p_recepcionCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Datos]..[p_recepcion] With (NOLOCK) 
				/*
					UNION ALL	
				-- 07/11, Se deja el campo con Horario incluido
				-- SELECT ''p_recepcionUltimaFecha'' as clave , convert(VARCHAR(50),MAX(rec_tfechahora),103) as valor  FROM [_Datos]..[p_recepcion] 
				SELECT ''p_recepcionUltimaFecha'' as clave , convert(VARCHAR(50),MAX(rec_tfechahora),22) as valor  FROM [_Datos]..[p_recepcion] With (NOLOCK)
					UNION ALL	
				-- Cantidad de señales recibidas, dividir por meses
				Select ''Cantidad de Señales Recibidas por mes'' as clave, convert(VARCHAR(50),Count(pr.rec_iid),1) as valor FROM [_Datos].[dbo].[p_recepcion] PR With (NOLOCK) 
					Left Outer Join [_Datos].[dbo].[m_receptores_cab] MR On MR.rec_iid = PR.rec_idReceptor
				WHERE PR.rec_nOrigen = 2 AND rec_tfechahora >= DATEADD(MONTH, DATEDIFF(MONTH, -1, getdate()), -31)
				*/
					UNION ALL	
				SELECT ''p_recepcionPendientes'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Datos]..[eventospendientes] With (NOLOCK) 
					LEFT JOIN _Datos..m_estado_cuenta_cab cab WITH (NOLOCK) ON (cab.est_iidcuenta = rec_iidcuenta)  WHERE rec_nestado = 0 AND (cab.est_nestado != 2 OR rec_calarma = ''_SN'')
					UNION ALL	
				-- 07/11, Se deja el campo con Horario incluido
				-- SELECT ''p_recepcionPendientesUltimaFecha'' as clave , convert(VARCHAR(50),MAX(rec_tfechahora),103) as valor  FROM [_Datos]..[eventospendientes]  WHERE rec_nestado = 0
				SELECT ''p_recepcionPendientesUltimaFecha'' as clave , convert(VARCHAR(50), MAX(rec_tfechahora), 22) as valor  FROM [_Datos]..[eventospendientes] With (NOLOCK)
					WHERE rec_nestado = 0
					
					UNION ALL	
				SELECT ''rxlogCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Datos]..[p_RXLog] With (NOLOCK)		
					
					UNION ALL	
				SELECT ''p_PosicionesGPSCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Datos]..[p_PosicionesGPS] With (NOLOCK) 
				/*
					UNION ALL	
				-- 07/11, Se deja el campo con Horario incluido
				-- SELECT ''p_PosicionesGPSUltimaFecha'' as clave ,  convert(VARCHAR(50),MAX(gps_tfechahora),103) as valor  FROM [_Datos]..[p_PosicionesGPS] 
				SELECT ''p_PosicionesGPSUltimaFecha'' as clave ,  convert(VARCHAR(50),MAX(gps_tfechahora),22) as valor  FROM [_Datos]..[p_PosicionesGPS] With (NOLOCK)
					UNION ALL	
				SELECT ''p_PosicionesGPSCantidadSinDireccion'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Datos]..[p_PosicionesGPS] With (NOLOCK)
					WHERE gps_cDireccion = ''''
				*/
					UNION ALL
				SELECT ''tasksCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Sistema]..[TaskStatus] With (NOLOCK) 
					
					UNION ALL	
				SELECT ''SmartMailProgramPendientesCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Datos]..[SmartMail_Program] With (NOLOCK)
					Where Status = ''P''
					
					UNION ALL	
				SELECT ''p_smsQueueCantidad'' as clave , convert(VARCHAR(50),count(1),1) as valor  FROM [_Datos]..[p_smsQueue ] With (NOLOCK)
					Where que_nestado = 1
					
					UNION ALL	
				-- 07/11, BC: 369657869 - Agregado para los nuevos contadores solicitadod
				-- Cantidad de dispositivos activos SmartPanics
				SELECT ''Cantidad de dispositivos SmartPanics'' as clave, convert(VARCHAR(50),COUNT(spa.CuentaId),1) as valor	FROM _datos..SmartPanic spa With (NOLOCK)
					WHERE spa.CuentaId is not null AND spa.CuentaId !=0
					
					UNION ALL
				-- Cantidad de dispositivos activos VigiControl
				SELECT ''Cantidad de dispositivos Vigicontrol'' as clave, convert(VARCHAR(50),COUNT(sta.CuentaId),1) as valor	FROM _datos..SmartTrack sta With (NOLOCK)
					WHERE sta.CuentaId is not null AND sta.CuentaId !=0
					
					UNION ALL
				-- Cantidad de conexiones IPRS
				SELECT ''Cantidad de conexiones de IPRS'' as clave, convert(VARCHAR(50),COUNT(iprsc_idKey),1) as valor FROM _Tablas..t_IPRSConn With (NOLOCK)
					WHERE iprsc_status = ''A''
				
					UNION ALL
				-- Cantidad de cuentas fijas habilitadas
				SELECT ''Cantidad de cuentas Fijas Habilitadas'' as clave, convert(VARCHAR(50),COUNT (cue_iid),1) as valor FROM _datos..m_cuentas c With (NOLOCK)
					left JOIN _Tablas..t_tipos t  With (NOLOCK) ON (convert(varchar(10), t.tip_ccodigo) = c.cue_ctipo)
					left JOIN _datos..m_estado_cuenta_cab ec With (NOLOCK) ON (ec.est_iidcuenta = c.cue_iid)
				WHERE (t.tip_ntipo NOT IN (1,2,3,5,6) or t.tip_ntipo is null) AND (ec.est_nestado = 0)
					
					UNION ALL
				-- Cantidad de cuentas Moviles habilitadas
				SELECT ''Cantidad de cuentas Moviles Habilitadas'' as clave, convert(VARCHAR(50),COUNT(dm.OwnerId),1) as valor FROM _datos..DispositivoMovil dm  With (NOLOCK)
					INNER JOIN _datos..m_estado_cuenta_cab ec  With (NOLOCK) ON (ec.est_iidcuenta = dm.OwnerId)
				WHERE dm.OwnerId is not null AND dm.OwnerId !=0 AND (ec.est_nestado = 0 or ec.est_nestado = 3)

			 ) o 
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.* ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to