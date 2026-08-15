--ALTER STORE
CREATE OR ALTER PROCEDURE [dbo].[MP_Vehicles]                  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort VARCHAR(64) = '',              
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
 
--paramentros  
DECLARE @tg_tiempovidaalarma INT
DECLARE @tiempogps INT
DECLARE @tg_tiempovidaalarmaVarchar VARCHAR(50)
DECLARE @tiempogpsVarchar VARCHAR(50)
SELECT @tg_tiempovidaalarma = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'tg_tiempovidaalarma'
SELECT @tiempogps = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'TIEMPOGPS'
SET @tg_tiempovidaalarmaVarchar = CONVERT(VARCHAR(11),@tg_tiempovidaalarma)
SET @tiempogpsVarchar = CONVERT(VARCHAR(11),@tiempogps)
   
 --Order            
 DECLARE @SortField VARCHAR(64)             
 DECLARE @SortDirection VARCHAR(4)            
 SELECT @SortField = 'tmp_cflota, tmp_cnombre', @SortDirection = ''            
             
 IF @sort != ''            
 BEGIN            
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC            
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC              
 END     
    
 --Temp                    
 --CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY, cFlota VARCHAR(256), cService VARCHAR(2), nDifFMinutes INT)     
 CREATE TABLE #Temp (RowNumber INT, Id INT, cFlota VARCHAR(256), cService VARCHAR(2), nDifFMinutes INT)               
             
 DECLARE @Sql VARCHAR(MAX)            
 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id, cFlota, cService, nDiffMinutes)    
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber,  
		MP.tmp_iid,       
		ISNULL(FL.flo_cdescripcion,'''') AS cflota,     
		CASE WHEN M.mov_ipatrullaID IS NULL THEN '''' ELSE ''ST'' END AS cService,       
		DATEDIFF (minute, ISNULL(GP.gps_tfechahora, GETDATE()), GETDATE()) As nDifFMinutes
	      
	FROM _Tablas.dbo.t_MovilesPatrulla AS MP   
		 LEFT JOIN _Tablas.dbo.t_Flotas AS FL On MP.tmp_cflota=FL.flo_ccodigo  
		 INNER JOIN _Datos.dbo.m_cuentas AS MC ON MC.cue_iid=MP.tmp_icuenta  
		 LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = cue_iid 
		 LEFT JOIN _Datos.dbo.p_Gps AS GP ON GP.gps_idCuenta=MP.tmp_icuenta  
		 LEFT JOIN _Tablas.dbo.t_moviles AS M ON m.mov_ipatrullaID = mp.tmp_iid  
		 
		 OUTER APPLY (
				SELECT TOP 1 *
				FROM _Datos.dbo.m_asignacion_movil oama				
				WHERE oama.amv_objectid = MP.tmp_idKey 
				ORDER BY oama.amv_idkey DESC
			) MA
			   
		OUTER APPLY (
			SELECT 
				CASE WHEN DATEDIFF(minute,GP.gps_tfechahora, GETDATE()) <= '+@tiempogpsVarchar+' AND  DATEDIFF(minute,ms.sta_dfechaultimaalerta, GETDATE()) > '+@tg_tiempovidaalarmaVarchar+'  THEN 
				
				CASE WHEN gps_iVelocidad = 0 THEN ''frenado''
						WHEN gps_iRumbo != '''' THEN ''enmovimeinto''
						ELSE 
						''alarma''	
						END 

				WHEN DATEDIFF(minute,GP.gps_tfechahora, GETDATE()) > '+@tiempogpsVarchar+' THEN ''vieja''				
				ELSE 
					CASE WHEN gps_iVelocidad = 0 THEN ''frenado''
								WHEN gps_iRumbo != '''' THEN ''enmovimeinto''
								ELSE 
								NULL
								END
				END AS state
		) AS s

     WHERE MP.tmp_nestado <> 2 
		AND ((GP.gps_rlatitud <> 0 AND GP.gps_rlongitud <> 0) OR MC.cue_cLatLng <> '''' )
	 '   
  
--Filters  
IF @filter != ''            
 BEGIN          
 SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')         
   
 DECLARE @FilterProperty VARCHAR(32)  
 DECLARE @FilterValue VARCHAR(64)
 DECLARE @FilterFieldState VARCHAR(32)       
 DECLARE @FilterValueState VARCHAR(256)
  
 DECLARE @Index INT  
 SET @Index = 1  
 WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)  
 BEGIN    
  --Read  
  SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'  
  SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'      
  
  SELECT TOP 1 @FilterFieldState = StringValue FROM #Filters WHERE NAME = 'property' AND StringValue = 'stateIN'  ORDER BY element_id DESC      
  SELECT @FilterValueState = StringValue FROM #Filters WHERE NAME = 'value' and parent_ID = (SELECT TOP 1 parent_ID FROM #Filters WHERE NAME = 'property' AND StringValue != 'Situacion' AND StringValue != 'cue_cnombre' ORDER BY element_id DESC)      
  
  IF @FilterFieldState IS NOT NULL               
  BEGIN    
	SET @Sql = @Sql + ' AND s.state IN ('''+ @FilterValueState + ''') '    
  END   

  /*
  Print '------'
  Print '@FilterProperty'
  Print @FilterProperty
  Print '@FilterValue'
  Print @FilterValue
  Print '------'
  */
  --Set Filters    
  IF @FilterProperty = 'cService'  
   BEGIN  
   IF @FilterValue = 'ST'  
    SET @Sql = @Sql + ' AND M.mov_ipatrullaID IS NOT NULL'        
   IF @FilterValue = ''  
    SET @Sql = @Sql + ' AND M.mov_ipatrullaID IS NULL'            
   END  
  ELSE 
		BEGIN
			IF @FilterProperty = 'tmp_idKey:IN'
				SET @Sql = @Sql + ' AND tmp_idKey IN (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @FilterValue + ''', '',''))'       
			ELSE
				BEGIN
				    IF @FilterProperty = 'cue_cnombre:LIKE'
						SET @Sql = @Sql + ' AND MC.cue_cnombre COLLATE Modern_Spanish_CI_AI LIKE ''%' + @FilterValue + '%'''
					ELSE IF @FilterProperty = 'tmp_cnombre:LIKE'
						SET @Sql = @Sql + ' AND MP.tmp_cnombre COLLATE Modern_Spanish_CI_AI LIKE ''%' + @FilterValue + '%'''
					ELse IF @FilterProperty = 'tmp_cnumero:LIKE'
						SET @Sql = @Sql + ' AND tmp_cnumero LIKE ''%' + @FilterValue + '%'''   
					ELSE IF @FilterProperty = 'tmp_cnumero:LIKENOT'
						SET @Sql = @Sql + ' AND tmp_cnumero NOT LIKE   ''' + @FilterValue + '%'''
					ELSE IF @FilterProperty = 'cue_cIMEI:LIKE'
						BEGIN  
							SET @Sql = @Sql + ' AND cue_cIMEI LIKE ''%'+ @FilterValue +'%''' 	
						END
					ELSE IF @FilterProperty = 'tmp_cflota:IN'
						BEGIN  
							SET @Sql = @Sql + ' AND tmp_cflota collate modern_spanish_ci_as IN (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @FilterValue + ''', '','')) '
						END
					ELSE IF @FilterProperty = 'state:IN'
						BEGIN  
							IF @FilterValue != ''
								SET @Sql = @Sql + ' AND tmp_nestado  IN (' + @FilterValue + ') '
						END
					ELSE IF @FilterProperty = 'amv_estado:IN'
						BEGIN  
							SET @Sql = @Sql + ' AND MA.amv_estado  IN (' + @FilterValue + ') '
						END

					ELSE IF @FilterProperty = 'latANDlong:ISNOTNULL'
						BEGIN  
							SET @Sql = @Sql + ' AND ( gps_rlatitud IS NOT NULL AND gps_rlongitud IS NOT NULL )'
						END
					ELSE
						SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''       
				END
        
		END
	--print(@Sql)    
	
	--Next  
	SET @Index = @Index + 1  
	END  
   
	DROP TABLE #Filters  
END               
--select @sql
 IF @HasAdministratorModule = 0
	BEGIN

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
		SET @Sql = @Sql;
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

 /*
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
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
	 
	 SET @Sql = @Sql + ' ) '
	

	*/

 END            
  
Print '---------'
Print 'CREATE TABLE #Temp (RowNumber INT, Id INT, cFlota VARCHAR(256), cService VARCHAR(2), nDifFMinutes INT)               '
Print 'Go'
PRINT(@Sql)
EXEC(@Sql)         
       
--Cantidad de registros                
SELECT @totalrows = MAX(RowNumber) FROM #Temp                
                 
 --Paginacion                
 SELECT RowNumber,  
	MP.tmp_idKey,
	MP.tmp_iid,  
	MP.tmp_cnombre,  
	MP.tmp_cnumero,  
	MP.tmp_nestado,--Disponible 0, Fuera de Servicio 1, Asignado 2  
	MP.tmp_clicencia,  
	MP.tmp_cmarca,  
	MP.tmp_cmodelo,  
	MP.tmp_iAsignado, --Cuenta asignada el movil  
	MP.tmp_icuenta, -- cuenta del movil
	cflota,     
	cService,  
	SPACE(2) AS cUsado,  
	MP.tmp_icuenta as cue_iid,  
	mc.*,  
	GP.gps_rlatitud,
	gp.gps_rlongitud,
	gp.gps_tfechahora,
	GP.gps_rlatitud gps_rLatitud ,
	gp.gps_rlongitud gps_rLongitud,  
	gp.gps_iVelocidad gps_iVelocidad,
	gp.gps_iRumbo,
	gp.gps_cIMEI,
	REPLACE(CONVERT(VARCHAR, gp.gps_tRawfechahora, 126),'1900-01-01T00:00:00', '') as gps_isorawfechahora,
	/*mc.cue_cnombre,  
	mc.cue_clinea,  
	mc.cue_ncuenta,*/  
	MC.cue_cLatLng AS cLatLng,  
	nDifFMinutes,  
	ac.cue_cnombre AS asi_cnombre,   
	ac.cue_clinea AS asi_clinea,  
	ac.cue_ncuenta AS asi_ncuenta,  
	ac.cue_cLatLng AS asi_cLatLng,  
	ac.cue_iid AS asi_cueiid,
	MA.*
	, DATEDIFF(minute,sta_dfechaultimaalerta, GETDATE()) as ageAlarma
	, DATEDIFF(minute,gps_tfechahora, GETDATE()) as ageGps	
	, ce.cue_iEngineStatus
	, s.*
	,tt.tip_curlimagen
 FROM _Tablas.dbo.t_MovilesPatrulla MP   
	LEFT JOIN _Tablas.dbo.t_Flotas FL On MP.tmp_cflota=FL.flo_ccodigo  
	INNER JOIN _Datos.dbo.m_cuentas MC On MC.cue_iid=MP.tmp_icuenta  
	LEFT JOIN _Datos.dbo.p_Gps GP On GP.gps_idCuenta=MP.tmp_icuenta  
	LEFT JOIN _Tablas.dbo.t_moviles m ON m.mov_ipatrullaID = mp.tmp_iid  
	INNER JOIN #Temp t ON t.Id = MP.tmp_iid            
	LEFT JOIN _Datos.dbo.m_cuentas AC On AC.cue_iid=MP.tmp_iAsignado  
	LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = tmp_icuenta
	LEFT JOIN _Datos.dbo.m_CuentasXtraInfo ce On ce.cue_iidCuenta=MC.cue_iid
	LEFT OUTER JOIN _Tablas.dbo.t_tipos tt ON tt.tip_ccodigo = MC.cue_ctipo 
	
	OUTER APPLY (
		SELECT TOP 1 *
		FROM _Datos.dbo.m_asignacion_movil oama				
		WHERE oama.amv_objectid = MP.tmp_idKey 
		ORDER BY oama.amv_idkey DESC
	) MA

	OUTER APPLY (
		SELECT 
		CASE 
			WHEN DATEDIFF(minute,GP.gps_tfechahora, GETDATE()) <= @tiempogpsVarchar AND DATEDIFF(minute,ms.sta_dfechaultimaalerta, GETDATE()) > @tg_tiempovidaalarmaVarchar  
		THEN 			
			CASE 
				WHEN gps_iVelocidad = 0 THEN 'frenado'
				WHEN gps_iRumbo != '' THEN 'enmovimeinto'
			ELSE 
				'alarma'
			END 

		WHEN DATEDIFF(minute,GP.gps_tfechahora, GETDATE()) > @tiempogpsVarchar THEN 'vieja' 			
		ELSE 
			CASE WHEN gps_iVelocidad = 0 THEN 'frenado'
			WHEN gps_iRumbo != '' THEN 'enmovimeinto'
			ELSE 
			NULL
			END
		END AS state
	) AS s


 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)                       
 ORDER BY t.RowNumber ASC