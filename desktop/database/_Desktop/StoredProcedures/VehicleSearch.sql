CREATE OR ALTER PROCEDURE [dbo].[VehicleSearch]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(64) = '',
 @group VARCHAR(64) = '',            
 @filter VARCHAR(2048) = '',      
 @linea VARCHAR(4) = '',  
 @cuenta VARCHAR(4) = '',  
 @cuentaId INT = 0,  
 @texto VARCHAR(128) = '', 
 @token VARCHAR(128),     
 @_dc VARCHAR(256) = '', 
 @short VARCHAR(256) = 'false',  
 @ultimaCarga VARCHAR(256) = '',      
 @totalrows INT = 1 OUTPUT              
AS                
BEGIN                
	 SET NOCOUNT ON   
	 SET DATEFORMAT ymd;
 
	 --Load Security
	 DECLARE @UserId INT
	 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
	 DECLARE @HasAdministratorModule INT 
	 DECLARE @HasTrackguardModule INT 
	 DECLARE @HasTrackguardMonitoreoModule INT 
	 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')
           
	 --Filter          
	 DECLARE @FilterSituacion VARCHAR(32)  
	 DECLARE @FilterGpsValid VARCHAR(32)      
	 DECLARE @FilterSituacionText VARCHAR(32)      
 
	 -- JUAN 26/12/2018 Dado que en TrackGuard, cuando se filtran mas de 6 dispositivos el VARCHAR(32) limita en cantidad, se pasa a MAX.
	 DECLARE @FilterFieldText VARCHAR(MAX)       
	 DECLARE @FilterValueText VARCHAR(MAX)       
 
	 DECLARE @FilterFieldState VARCHAR(32)       
	 DECLARE @FilterValueState VARCHAR(256)
	 DECLARE @FilterFieldEnviaje int = 0

	 DECLARE @filterTipo VARCHAR(32)
	 --SELECT @limit=par_ivalor FROM _tablas..t_parametros WHERE par_ccodigo='VISUALIZATGENSP'

	 IF @filter != ''          
	 BEGIN        
	 SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)  
 

      
	 SELECT @FilterSituacionText = StringValue, @FilterSituacion = CASE StringValue WHEN 'No Habilitada' THEN '2' WHEN 'Habilitada' THEN '0' WHEN 'En Prueba' THEN '3' ELSE NULL END FROM #FilterTable WHERE NAME = 'value' and parent_ID = (SELECT parent_ID FROM #FilterTable WHERE NAME = 'property' AND StringValue = 'Situacion')
	 SELECT @FilterGpsValid = StringValue FROM #FilterTable WHERE NAME = 'value' and parent_ID = (SELECT parent_ID FROM #FilterTable WHERE NAME = 'property' AND StringValue = 'gps_valid')      
 
 
	 -- sirve para casos particulares como cueiidin
	 --select * from #FilterTable
	 SELECT TOP 1 @FilterFieldText = StringValue FROM #FilterTable WHERE NAME = 'property' AND StringValue in('tip_nTipo:NOTININT','Dealer-Cuenta','cue_iidIN','cue_iidNOTIN','DomainLIKE','cue_cCustom') ORDER BY element_id DESC      
	 SELECT @FilterValueText = StringValue FROM #FilterTable WHERE NAME = 'value' and parent_ID = (SELECT TOP 1 parent_ID FROM #FilterTable WHERE NAME = 'property' AND StringValue in ('tip_nTipo:NOTININT','Dealer-Cuenta','cue_iidIN','cue_iidNOTIN','DomainLIKE','cue_cCustom') ORDER BY element_id DESC)      
 
	 SELECT TOP 1 @FilterFieldState = StringValue FROM #FilterTable WHERE NAME = 'property' AND StringValue = 'stateIN'  ORDER BY element_id DESC      
	 SELECT @FilterValueState = StringValue FROM #FilterTable WHERE NAME = 'value' and parent_ID = (SELECT TOP 1 parent_ID FROM #FilterTable WHERE NAME = 'property' AND StringValue = 'stateIN' ORDER BY element_id DESC)      

	 SELECT TOP 1 @FilterFieldEnviaje = 1 FROM #FilterTable WHERE NAME = 'property' AND StringValue = 'enviaje'  ORDER BY element_id DESC      

	 DROP TABLE #FilterTable         
	 END      
      
     
	 --Order          
	 DECLARE @SortField VARCHAR(64)           
	 DECLARE @SortDirection VARCHAR(4)          
	 SELECT @SortField = 'cue_iid', @SortDirection = 'ASC'          
           
	 IF @sort != ''          
	 BEGIN          
	   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
	   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC          
         
	   IF @SortField = 'Situacion'      
		  SET @SortField = 'est_nEstado' 

		 IF @SortField = 'cue_clinea' AND @SortDirection = 'DESC'    
		  SET @SortField = 'cue_clinea DESC, cue_ncuenta ';
		 ELSE IF @SortField = 'sta_dfechautimaalarma' 
		  SET @SortField = 'sta_dfechautimaalarma ';
		  ELSE IF @SortField = 'sta_dfechautimaalerta' 
		  SET @SortField = 'sta_dfechautimaalerta ';
		 ELSE IF @SortField = 'gps_isofechahora' 
		  SET @SortField = 'gps_tfechahora ';
		ELSE IF @SortField = 'gps_trawfechahora' 
		  SET @SortField = 'gps_tRawfechahora ';
		ELSE IF @SortField = 'gps_iBattery' 
		  SET @SortField = 'gps_iBattery ';
	----------------------AGREGANDO ORDENAMIENTO PARA @SortField -- PEDIDO POR https://basecamp.com/2249105/projects/12939010/todolists/51852728
		ELSE IF @SortField='cue_cnombre'
			SET  @SortField='cue_cnombre';
		ELSE IF @SortField='Domain'
			SET  @SortField='Domain';
		ELSE IF @SortField='gps_iVelocidad'
			SET  @SortField='g.gps_iVelocidad';
		ELSE IF @SortField='sta_cultimaalerta'
			SET  @SortField='sta_cultimaalerta';
		ELSE IF @SortField='sta_dfechaultimaalerta'
			SET  @SortField='sta_dfechaultimaalerta';
		ELSE IF @SortField='sta_dfechaultimo2dotst'
			SET  @SortField='sta_dfechaultimo2dotst';
		 ELSE
		  SET @SortField = 'cue_clinea ASC, cue_ncuenta ';

	  
		 -- gps_iVelocidad sta_cultimaalerta sta_dfechaultimaalerta sta_dfechaultimo2dotst


	 END   

	--paramentros  
		DECLARE @tg_tiempovidaalarma INT
		DECLARE @tiempogps INT

		DECLARE @tg_tiempovidaalarmaVarchar VARCHAR(50)
		DECLARE @tiempogpsVarchar VARCHAR(50)

		SELECT @tg_tiempovidaalarma = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'tg_tiempovidaalarma'
		SELECT @tiempogps = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'TIEMPOGPS'
	  SET @tg_tiempovidaalarmaVarchar = CONVERT(VARCHAR(11),@tg_tiempovidaalarma)
		SET @tiempogpsVarchar = CONVERT(VARCHAR(11),@tiempogps)
                 
	 --Temp    
	
	Print ' If(OBJECT_ID(''tempdb..#Temp'') Is Not Null)
	Begin
		Drop Table #Temp
	End    
	Go'
	

	 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                
	
	Print ' CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)      '    
	Print 'Go'
	
	 DECLARE @Sql VARCHAR(MAX)          
	 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)          
		SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, Id           
		  FROM _Datos.dbo.DispositivoMovil v   
			LEFT OUTER JOIN _Datos.dbo.m_cuentas o ON cue_iid = v.ownerid                      
			LEFT OUTER JOIN _Datos.dbo.m_estado_cuenta_cab ON cue_iid = est_iidcuenta           
			LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = cue_iid                 
			LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = cue_ctipo 
			OUTER APPLY (
				SELECT TOP 1 * FROM _Datos.dbo.p_gps WITH(NOLOCK) WHERE gps_cIMEI = cue_cimei AND gps_idCuenta = cue_iid ORDER BY 1 DESC
			) AS g    
			OUTER APPLY (
				SELECT 
					CASE WHEN DATEDIFF(minute,gps_tfechahora, GETDATE()) <= '+@tiempogpsVarchar+' AND  DATEDIFF(minute,sta_dfechaultimaalerta, GETDATE()) < '+@tg_tiempovidaalarmaVarchar+'  THEN 
						CASE WHEN gps_iVelocidad = 0 THEN ''frenado''
							WHEN gps_iRumbo != '''' THEN ''enmovimeinto''
							ELSE 
							''alarma''	
							END 

						WHEN DATEDIFF(minute,gps_tfechahora, GETDATE()) > '+@tiempogpsVarchar+' THEN ''vieja''				
							ELSE 
							CASE WHEN gps_iVelocidad = 0 THEN ''frenado''
								WHEN gps_iRumbo != '''' THEN ''enmovimeinto''
								ELSE 
								''vieja''
								END
					END AS state
			) AS s
			LEFT JOIN [_Datos]..[m_paneles] pan ON pan.pan_iidcuenta = cue_iid
			LEFT JOIN [_Tablas]..[t_paneles] tpan ON tpan.pan_ccodigo = pan.pan_cgprs
			LEFT JOIN [_Datos]..[m_CuentasXtraInfo] x ON x.cue_iidCuenta = cue_iid

		 WHERE 1 = 1'          
	/*  
	  print '--************Temp***************'     
	  print cast(@sql as ntext)
	  print '--*********************************'
	*/
	IF @FilterFieldState IS NOT NULL               
	 BEGIN    
		SET @Sql = @Sql + ' AND s.state IN (select * from _Datos.dbo.ParseArray('''+ @FilterValueState + ''','','')) '    
	 END      
  

	 IF @FilterSituacion IS NOT NULL               
	 BEGIN      
	 SET @Sql = @Sql + ' AND ('      
	 SET @Sql = @Sql + ' est_nEstado IN (' + @FilterSituacion + ')'      
	 IF @FilterSituacionText = 'En Prueba'      
		SET @Sql = @Sql + ' OR (est_nEstado = 1 AND GetDate() BETWEEN est_dfechadesde AND isnull(est_dfechahasta, getdate()+1))'        
	 SET @Sql = @Sql + ')'      
	 END      
 
 
	-- print @FilterFieldText
	-- print @FilterValueText
	 IF @FilterFieldText IS NOT NULL      
	 BEGIN
	 -- 04/09 : JUAN, agregado para poder filtrar NO ver los tipos mascota      
	 IF @FilterFieldText = 'tip_nTipo:NOTININT'
	 BEGIN
		SET @Sql = @Sql + ' AND tip_nTipo != ''' + @FilterValueText + ''''
		END
	 ELSE IF @FilterFieldText = 'Dealer-Cuenta'
	 BEGIN
		SET @Sql = @Sql + ' AND (cue_clinea + ''-'' + cue_ncuenta) = ''' + @FilterValueText + ''''
		END
	 ELSE IF @FilterFieldText = 'cue_iid'
	 BEGIN
		SET @Sql = @Sql + ' AND ' + @FilterFieldText + '=''' + @FilterValueText + '''' 
	END
	 ELSE IF @FilterFieldText = 'cue_iidIN'
	 BEGIN
		SET @Sql = @Sql + ' AND cue_iid IN ('+ @FilterValueText + ') '  
	END
	 ELSE IF @FilterFieldText = 'cue_iidNOTIN'
	BEGIN
		SET @Sql = @Sql + ' AND cue_iid NOT IN ('+ @FilterValueText + ') ' 
	END 
	ELSE IF @FilterFieldText = '_nombre'
	BEGIN
		SET @Sql = @Sql + ' AND cue_cnombre LIKE ''%'+ @FilterValueText + '%'' ' 
	END
	 ELSE IF @FilterFieldText = 'cue_cIMEI:LIKE'
			BEGIN  
				SET @Sql = @Sql + ' AND cue_cIMEI LIKE ''%'+ @FilterValueText +'%''' 	
			END
	ELSE IF @FilterFieldText = 'DomainLIKE'
			BEGIN  
				SET @Sql = @Sql + ' AND Domain LIKE ''%'+ @FilterValueText +'%''' 	
			END

	ELSE IF @FilterFieldText = 'pan_cdescripcion'
	BEGIN
		SET @Sql = @Sql + ' AND ' + @FilterFieldText + ' LIKE ''%' + @FilterValueText + '%'''
	END
	ELSE IF @FilterFieldText = 'cue_cCustom'
BEGIN
    SET @Sql = @Sql + ' AND x.cue_cCustom LIKE ''%' + REPLACE(@FilterValueText, '''', '''''') + '%'''
END
	/*
	-- saco el else porque tengo el filterwithignore
	 ELSE 
		BEGIN
		print 'entro por el ELSE'
		SET @Sql = @Sql + ' AND ' + @FilterFieldText + ' LIKE ''%' + @FilterValueText + '%'''      
		END
	*/
	 END   
 
	IF @FilterFieldEnviaje = 1
	BEGIN  
		SET @Sql = @Sql + ' AND cue_iid in (select tgv_cueiid from _datos..m_tgviaje where (tgv_fechainicio is not null and tgv_fechainicio> ''1970-1-1'' and tgv_fechainicio < getdate()) and (tgv_fechafin is null or tgv_fechafin < ''1970-1-1''))' 	
	END
   
	 IF @linea != ''  
	 BEGIN      
	 SET @Sql = @Sql + ' AND cue_clinea = ''' + @linea + ''''      
	 END   
   
	 IF @cuenta != ''  
	 BEGIN      
	 SET @Sql = @Sql + ' AND cue_ncuenta = ''' + @cuenta + ''''     
	 END   
   
	 IF @texto != ''  
	 BEGIN      
	 SET @Sql = @Sql + ' AND cue_cnombre LIKE ''%' + @texto + '%'''      
	 END      
 
	 IF @cuentaId != 0  
	 BEGIN      
	 SET @Sql = @Sql + ' AND cue_iid = ' + CAST(@cuentaId AS VARCHAR)
	 END 

	 if  @FilterGpsValid = 'true'
	 BEGIN
		SET @Sql = @Sql + ' AND gps_rLongitud != 0 AND gps_rLatitud != 0 AND gps_rLongitud IS NOT NULL AND gps_rLatitud IS NOT NULL  '
	 END 
 
	IF @ultimaCarga != ''  
	 BEGIN      
	 SET @Sql = @Sql + ' AND gps_tfechahora >= '''+@ultimaCarga+''' '
	 END 

	 --RANGOS 
	 DECLARE @SqlFilterRango AS VARCHAR(max)
	 EXEC getSqlRangesForToken @table = 'DispositivoMovil', @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT

	DECLARE @SqlFilter AS VARCHAR(4096)
	SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'VehicleSearch','[enviaje],[Situacion],[stateIN],[gps_valid],[cue_iidIN],[cue_iidNOTIN],[Dealer-Cuenta],[DomainLIKE],[cue_cCustom]')

	/*      
	print '------------- SQLFILTER -------------'
	print @SqlFilter
	print '-------------------------------------'
	*/
	SET @Sql = @Sql+@SqlFilter+@SqlFilterRango

	print @sql
	Print 'Go'
	 EXEC(@Sql)              
               
	 --Cantidad de registros              
	 SELECT @totalrows = MAX(RowNumber) FROM #Temp              
             
 
	 --Paginacion
	if (@short = 'true')
	BEGIN

		SELECT
		v.Id 
		,  RowNumber, cue_iid, cue_clinea,cue_ctipo, lin_crazonsocial, cue_cimei , cue_ncuenta, cue_cnombre, (CASE               
			   WHEN est_nEstado=1 AND GetDate() BETWEEN est_dfechadesde AND est_dfechahasta THEN 'Prueba'                
			   WHEN est_nEstado=2 THEN 'No Habilitado'               
			   WHEN est_nEstado=3 THEN 'Prueba x Zonas'          
			   ELSE 'Habilitado'               
			   END) AS Situacion,ms.sta_cultimaalarma, 
			   ms.sta_dfechautimaalarma, 
			   ms.sta_cultimaalerta, 
			   ms.sta_dfechaultimaalerta, 
			   ca.cod_cdescripcion,
			   v.Domain,
			   v.OwnerId,
			   tip.tip_ntipo,
			   tip.tip_cdescripcion,
			   v.Name, vb.Name BrandName, vm.Name ModelName,
			   g.gps_tfechahora, 
			   g.gps_idRec, 
			   g.gps_rLatitud, 
			   g.gps_rLongitud, 
			   g.gps_iVelocidad, 
			   g.gps_iOdometro, 
			   g.gps_iRumbo, 
			   g.gps_cDireccion, 
			   g.gps_tRawfechahora,
				 g.gps_iNivelSenial,
				 g.gps_iSatelites,
				 g.gps_iid,
				 g.gps_iFuel,
				 g.gps_iEngineStatus,
				 CASE WHEN g.gps_iBattery > 0 THEN g.gps_iBattery ELSE (g.gps_iExtBattery/100) END AS gps_iBattery,
			   CONVERT(VARCHAR, g.gps_tfechahora, 126) AS gps_isofechahora,
				 rece.*
				, convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (g.gps_tRawfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tRawfechahoraOffset
		  FROM _Datos.dbo.DispositivoMovil v WITH(NOLOCK)  
			LEFT OUTER JOIN _Datos.dbo.m_cuentas o WITH(NOLOCK) ON cue_iid = v.ownerid   
			left join _tablas..t_timezone gmt WITH (NOLOCK) on o.cue_iZonaHoraria = gmt.ttz_idkey
			LEFT OUTER JOIN _Datos.dbo.m_estado_cuenta_cab WITH(NOLOCK) ON cue_iid = est_iidcuenta       
			LEFT OUTER JOIN _Datos.dbo.m_status ms WITH(NOLOCK) ON ms.sta_iidcuenta = cue_iid              
			LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma ca WITH(NOLOCK) ON ca.cod_ccodigo = ms.sta_cUltimaAlerta        
			LEFT OUTER JOIN _Tablas.dbo.t_provincias p WITH(NOLOCK) ON pro_ccodigo = cue_cprovincia	
			LEFT OUTER JOIN _Tablas.dbo.VehicleBrand vb WITH(NOLOCK) ON v.VehicleBrand = vb.Id
			LEFT OUTER JOIN _Tablas.dbo.VehicleModel vm WITH(NOLOCK) ON v.VehicleModel = vm.Id            
			LEFT OUTER JOIN _Tablas.dbo.t_tipos tip WITH(NOLOCK) ON tip_ccodigo = cue_ctipo
			OUTER APPLY (
				SELECT TOP 1 * FROM _Datos.dbo.p_gps WITH(NOLOCK) WHERE gps_cIMEI = cue_cimei ORDER BY 1 DESC --gps_idcuenta = cue_iid ORDER BY 1 DESC
			) AS g 
			--LEFT OUTER JOIN _Datos.dbo.p_Gps g ON cue_iid = gps_idCuenta
			LEFT OUTER JOIN  _Tablas.dbo.t_lineas WITH(NOLOCK) ON lin_ccodigo = cue_clinea
			LEFT JOIN [_Datos].dbo.[EquipoDispositivoMovil] em ON idCuenta = cue_iid
			LEFT JOIN [_Datos]..[m_paneles] pan WITH(NOLOCK) ON pan.pan_iidcuenta = cue_iid
			LEFT JOIN [_Datos].[dbo].[m_receptores_cab] rece WITH(NOLOCK) ON pan.pan_iReceptor = rece.rec_iid

			INNER JOIN #Temp t ON t.Id = v.Id          
		 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)                     
		 ORDER BY t.RowNumber ASC  

	END
	ELSE
	BEGIN 
	set @sql=	'SELECT
		v.Id
		, RowNumber
		, cue_iid, cue_clinea
		, lin_crazonsocial
		, cue_ncuenta
		, cue_cnombre
		, cue_ccalle
		, cue_clocalidad
		, cue_cprovincia
		, p.pro_cdescripcion as cue_provincia
		, cue_ccodigopostal
		, cue_cimei
		,cue_ctelefono
	  ,cue_dfechaalta
	  ,cue_dservicio
		,x.*
		, (CASE               
			   WHEN est_nEstado=1 AND GetDate() BETWEEN est_dfechadesde AND est_dfechahasta THEN ''Prueba''                
			   WHEN est_nEstado=2 THEN ''No Habilitado''               
			   WHEN est_nEstado=3 THEN ''Prueba x Zonas''          
			   ELSE ''Habilitado''               
			   END) AS Situacion
		, est_nestado, ms.sta_cultimaalarma
		, ms.sta_dfechautimaalarma
		, ms.sta_cultimaalerta
		, ms.sta_dfechaultimaalerta
		, REPLACE(CONVERT(VARCHAR, ms.sta_dfechaultimotst, 126),''1900-01-01T00:00:00'', '''') AS sta_dfechaultimotst
		-- 12/11, Agregado por BC : 371086206
		, REPLACE(CONVERT(VARCHAR, ms.sta_dfechaultimo2dotst, 126),''1900-01-01T00:00:00'', '''') AS sta_dfechaultimo2dotst
		, ca.cod_cdescripcion
		,  ca.cod_nColorLetra
		, ca.cod_ncolor
		, ms.sta_nestado
		, ms.sta_nestado as act_nestado
		, v.*
		, vb.Name BrandName
		, vm.Name ModelName
		, tip.*,
		 g.gps_tfechahora, 
		 g.gps_idRec, 
		 g.gps_rLatitud, 
		 g.gps_rLongitud, 
		 g.gps_iVelocidad, 
		 g.gps_iOdometro, 
		 g.gps_iRumbo, 
		 g.gps_cDireccion, 
		 g.gps_tRawfechahora,
		 g.gps_iNivelSenial,
		 g.gps_iSatelites,
			g.gps_iExtBattery,
			g.gps_iid
		, DATEDIFF(minute,sta_dfechaultimaalerta, GETDATE()) as ageAlarma
		, rece.*
		, DATEDIFF(minute,gps_tfechahora, GETDATE()) as ageGps	
		, cue_iEngineStatus
		, gps_iVelocidad
		, CONVERT(VARCHAR, g.gps_tfechahora, 126) AS gps_isofechahora
	  , g.gps_tfechahora
  				 ,g.gps_iFuel
				 ,g.gps_iEngineStatus
		, CASE WHEN g.gps_iBattery > 0 THEN g.gps_iBattery ELSE (convert(float,g.gps_iExtBattery)/100) END AS gps_iBattery

		,'+convert(varchar,@tiempogps)+' AS AA
		,s.*
		,pan.*
		,case   
			 when gps_iRumbo between 0 and 22 then ''up''   
			 when gps_iRumbo between 23 and 67 then ''upright''  
			 when gps_iRumbo between 68 and 112 then ''right''  
			 when gps_iRumbo between 113 and 157 then ''downright''  
			 when gps_iRumbo between 158 and 202 then ''down''  
			 when gps_iRumbo between 203 and 247 then ''downleft''  
			 when gps_iRumbo between 248 and 292 then ''left''  
			 when gps_iRumbo between 293 and 337 then ''upleft''  
			 when gps_iRumbo between 338 and 360 then ''up''  
	   end as gps_Rumbo
	   , convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (g.gps_tRawfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tRawfechahoraOffset
	   --,g.gps_tRawfechahora as _tRawfechahoraOffset
	   , ''\nAlarma: '' + CAST(UltEvento.eve_nombre AS XML).value(''.'', ''varchar(max)'') + '' '' + RIGHT(''0'' + CAST(DATEPART(DAY, UltEvento.eve_fechahora) AS NVARCHAR(2)), 2) + ''/'' + RIGHT(''0'' + CAST(DATEPART(MONTH, UltEvento.eve_fechahora) AS NVARCHAR(2)), 2) + '' '' + RIGHT(''0'' + CAST(DATEPART(HOUR, UltEvento.eve_fechahora) AS NVARCHAR(2)), 2) + '':'' + RIGHT(''0'' + CAST(DATEPART(MINUTE, UltEvento.eve_fechahora) AS NVARCHAR(2)), 2) + '':'' + RIGHT(''0'' + CAST(DATEPART(SECOND, UltEvento.eve_fechahora) AS NVARCHAR(2)), 2) AS evt_pendiente
		  FROM _Datos.dbo.DispositivoMovil v  WITH(NOLOCK)  
			LEFT OUTER JOIN _Datos.dbo.m_cuentas WITH(NOLOCK) ON cue_iid = v.ownerid   
			left join _tablas..t_timezone gmt WITH (NOLOCK) on cue_iZonaHoraria = gmt.ttz_idkey
			LEFT OUTER JOIN _Datos.dbo.m_estado_cuenta_cab WITH(NOLOCK) ON cue_iid = est_iidcuenta       
			LEFT OUTER JOIN _Datos.dbo.m_status ms WITH(NOLOCK) ON ms.sta_iidcuenta = cue_iid              
			LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma ca WITH(NOLOCK) ON ca.cod_ccodigo = ms.sta_cUltimaAlerta         
			LEFT OUTER JOIN _Tablas.dbo.t_provincias p WITH(NOLOCK) ON pro_ccodigo = cue_cprovincia	
			LEFT OUTER JOIN _Tablas.dbo.VehicleBrand vb WITH(NOLOCK) ON v.VehicleBrand = vb.Id
			LEFT OUTER JOIN _Tablas.dbo.VehicleModel vm WITH(NOLOCK) ON v.VehicleModel = vm.Id            
			LEFT OUTER JOIN _Tablas.dbo.t_tipos tip WITH(NOLOCK) ON tip_ccodigo = cue_ctipo
			OUTER APPLY (
				SELECT TOP 1 * FROM _Datos.dbo.p_gps WITH(NOLOCK) WHERE gps_cIMEI = cue_cimei AND gps_idCuenta = cue_iid ORDER BY 1 DESC
			) AS g 
			OUTER APPLY (
				SELECT TOP 1 EventosPendientes.rec_tFechaHora AS eve_fechahora, cod_cDescripcion as eve_nombre
				FROM _Datos..EventosPendientes WITH(NOLOCK)
				WHERE EventosPendientes.rec_iidCuenta = v.ownerid
					AND EventosPendientes.rec_nEstado=0
				ORDER BY rec_tFechaRecepcion DESC
			) AS UltEvento
			OUTER APPLY (
				SELECT 
					DATEDIFF(minute,gps_tfechahora, GETDATE()) as diftfechahora,
					DATEDIFF(minute,sta_dfechaultimaalerta, GETDATE()) as diffultimaalerta,
					CASE WHEN DATEDIFF(minute,gps_tfechahora, GETDATE()) <= '+convert(varchar,@tiempogps)+' AND  DATEDIFF(minute,sta_dfechaultimaalerta, GETDATE()) < '+convert(varchar,@tg_tiempovidaalarma)+'  THEN 
					CASE WHEN gps_iVelocidad = 0 THEN ''frenado''
						WHEN gps_iRumbo != '''' THEN ''enmovimeinto''
							ELSE 
							''alarma''		
							END 
						WHEN DATEDIFF(minute,gps_tfechahora, GETDATE()) > '+convert(varchar,@tiempogps)+' THEN ''vieja''				
						ELSE 
							CASE WHEN gps_iVelocidad = 0 THEN ''frenado''
								WHEN gps_iRumbo != '''' THEN ''enmovimeinto''
								ELSE 
								NULL
							END
						END AS icon
			) AS s
			--LEFT OUTER JOIN _Datos.dbo.p_Gps g WITH(NOLOCK) ON cue_iid = gps_idCuenta
			LEFT OUTER JOIN  _Tablas.dbo.t_lineas WITH(NOLOCK) ON lin_ccodigo = cue_clinea
			LEFT OUTER JOIN [_Datos]..[m_CuentasXtraInfo] x WITH(NOLOCK) ON cue_iid = x.cue_iidCuenta
			LEFT JOIN [_Datos].dbo.[EquipoDispositivoMovil] em WITH(NOLOCK) ON idCuenta = cue_iid
			LEFT JOIN [_Datos]..[m_paneles] pan WITH(NOLOCK) ON pan.pan_iidcuenta = cue_iid
			LEFT JOIN [_Datos].[dbo].[m_receptores_cab] rece WITH(NOLOCK) ON pan.pan_iReceptor = rece.rec_iid
			INNER JOIN #Temp t ON t.Id = v.Id          
		 WHERE t.RowNumber BETWEEN ('+convert(varchar,@page)+' - 1) * '+convert(varchar,@limit)+' + 1 AND ('+convert(varchar,@page)+' * '+convert(varchar,@limit)+')  ORDER BY '
		 +@SortField+' '+@SortDirection
		 
		 print '-----SQL Final-----'
		 print cast ( @Sql as ntext)
		 

		 EXEC(@Sql)  
	END         
END