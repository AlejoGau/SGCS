CREATE OR ALTER PROCEDURE [dbo].[CuentaByDealer]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(128) = '',
 @cue_nAutoMonitoreo  NVARCHAR(256) = '', 
 @filter NVARCHAR(2048) = '',      
 @linea NVARCHAR(4) = '',
 @lineadesde NVARCHAR(4) = '',  
 @lineahasta NVARCHAR(4) = '',
 @zona NVARCHAR(4) = '',
 @cuenta NVARCHAR(4) = '',  
 @cuentaId INT = 0,  
 @texto NVARCHAR(128) = '', 
 @cue_ncuentaDesde NVARCHAR(4) = '',  
 @cue_ncuentaHasta NVARCHAR(4) = '',  
 @est_nestado INT = 0,
 @est_nestadoin NVARCHAR(256) = '', 
 @tip_ccodigo NVARCHAR(256) = '',
 @token NVARCHAR(128),     
 @_dc NVARCHAR(256) = '', 
 @fieldlist NVARCHAR(MAX) = '', 
 @sta_nestado NVARCHAR(256) = '',
 @totalrows INT = 1 OUTPUT,
 @UserId INT = 0,
 @short int = 0,
 @type varchar(64) = '',
 @incluyecuentasparticion Int = 1,
 @Debug Char(1) ='N'
AS                
BEGIN                
 SET NOCOUNT ON              
 set dateformat ymd

 IF (@UserId = 0)
 BEGIN
	SELECT @UserId = dbo.GetUserIdByToken(@token)
 END
 
 If @Debug = 'S'
 Begin
    Print '---'
	Print '@UserId'
	Print @UserId
 End

 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

 If @Debug = 'S'
 Begin
	Print '@SqlFilterRango'
	Print @SqlFilterRango
 End

 DECLARE @SortField NVARCHAR(128)           
 DECLARE @SortDirection NVARCHAR(4)          
 SELECT @SortField = 'cue_iid', @SortDirection = 'ASC'           
 
 If @Debug = 'S'
 Begin
	print 'comienza sort'
	print @sort
 End

 IF @sort != ''          
 BEGIN          
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC          
         
   IF @SortField = 'dealer-cuenta'      
      SET @SortField = 'cue_clinea '+@SortDirection+' , cue_ncuenta'
 END          

 If @Debug = 'S'
 Begin
	print @SortField
	print 'fin sort'   
	Print '---------------------------'
	Print '--------CERO---------------'
	Print '---------------------------'
	Print 'CREATE TABLE #Temp (RowNumber INT, Id INT)'
 End	
			     
 CREATE TABLE #Temp (RowNumber INT, Id INT)                
           
 DECLARE @Sql NVARCHAR(MAX)          
 set @Sql = ''
 set @Sql += ' WHERE 1 = 1'          
               
 if @incluyecuentasparticion=0
	set @Sql += '  And c.cue_nparticion=0 '

 declare @JoinAlarma int;
 set @JoinAlarma = 0;

 IF @filter != ''          
 BEGIN        
	SELECT element_id, parent_ID, Object_ID, NAME,
		CASE 
			WHEN @filter LIKE '%"0,1,null"%' AND NAME = 'value' AND StringValue = '0,1,nul' THEN '0,1,null'
			ELSE StringValue
		END AS StringValue,ValueType
	INTO #Filters 
	FROM dbo.parseJSON(@filter) 
	WHERE NAME IN ('property', 'value');
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(1024)

	DECLARE @Index INT
	SET @Index = 1

	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'

		If @Debug = 'S'
		Begin
		 	PRINT 'FilterProperty - ' + @filterproperty
			PRINT 'FilterValue - ' + @FilterValue
		End

		DECLARE @ObjectTypeId VARCHAR(64)		
		DECLARE @ObjectId VARCHAR(11)
		DECLARE @RelationObjectTypeId VARCHAR(64)			 											 										
		DECLARE @RelationObjectId VARCHAR(11)
		DECLARE @RelationMethod VARCHAR(12) = ' IN '	
		DECLARE @objectType VARCHAR(64) = 'Cuenta'
									
		DECLARE @ObjectDatos bit;
		DECLARE @RelationObjectDatos bit;

		IF PATINDEX('%:RelationParent', @FilterProperty) > 0
		BEGIN
			SET @FilterProperty = REPLACE(@FilterProperty, ':RelationParent', '')
			SET @ObjectDatos = 0
			SET @RelationObjectDatos = 0

			SELECT 
				@ObjectTypeId = CAST(dbo.GetObjectId(@FilterProperty) AS VARCHAR), 
				@ObjectId = @FilterValue, 
				@RelationObjectTypeId = CAST(dbo.GetObjectId(@objectType) AS VARCHAR)			
						
			SET @Sql +=  ' AND c.cue_iid ' + @RelationMethod + ' (SELECT RelationObjectId FROM _datos..RelationObject WHERE ObjectTypeId = ' + @ObjectTypeId + ' AND ObjectId = ' + @ObjectId + ' AND RelationObjectTypeId = ' + @RelationObjectTypeId + ') '
		END
		ELSE IF @FilterProperty = 'Situacion'
		BEGIN      
			SET @Sql +=  ' AND ( '      
			
			IF @FilterValue = 'Habilitada'
				SET @Sql +=  ' est_nEstado IN (0)'      
			ELSE IF @FilterValue = 'No Habilitada'
				SET @Sql +=  ' est_nEstado IN (2)'      
			ELSE IF @FilterValue = 'En Prueba'
				SET @Sql +=  ' est_nEstado IN (3)'    
			ELSE IF @FilterValue = 'Eliminar'
				SET @Sql +=  ' est_nEstado IN (4)'  		    		    			    
				
			IF @FilterValue = 'En Prueba'      
				SET @Sql +=  ' OR (est_nEstado = 1 AND GetDate() BETWEEN est_dfechadesde AND isnull(est_dfechahasta, getdate()+1))'        
			
			IF @FilterValue = 'Alarma'
			BEGIN
				SET @Sql +=  ' (p_recepcion.rec_nestado <= 7 And t_codigos_alarma2.cod_ntipo=0 And t_codigos_alarma2.cod_nalerta=1) '
				SET @JoinAlarma = 1
			END
			
			SET @Sql +=  ')'      
		END  
		ELSE IF @FilterProperty = 'est_nestado:IN'
			SET @Sql +=  ' AND est_nestado in (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @FilterValue + ''', '',''))'
 		ELSE IF @FilterProperty = 'Dealer-Cuenta'
			SET @Sql +=  ' AND (c.cue_clinea + ''-'' + c.cue_ncuenta) = ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'cue_clinea'
			SET @Sql +=  ' AND c.cue_clinea = ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'cue_ncuentaGET'
			SET @Sql +=  ' AND c.cue_ncuenta >= ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'cue_ncuentaLET'
			SET @Sql +=  ' AND c.cue_ncuenta <= ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'sta_tEnFalloDeTSTDesde'
			SET @Sql +=  ' AND sta_tEnFalloDeTSTDesde >= convert(datetime,  ''' + @FilterValue + ''',105)'
		ELSE IF @FilterProperty = 'sta_dfechaultimotst'
			SET @Sql +=  ' AND datediff(day, sta_dfechaultimotst, convert(datetime,  ''' + @FilterValue + ''',105)) = 0'
		ELSE IF @FilterProperty = 'tip_nCondicion' AND @FilterValue = '1'
		BEGIN
			SET @Sql +=  ' AND (tip.tip_nCondicion = 1)'     
			SET @Sql +=  ' AND c.cue_iid NOT IN (SELECT OwnerId FROM _Datos.dbo.DispositivoMovil) '
		END
		ELSE IF @FilterProperty = 'cue_cnombre'
			SET @Sql +=  ' AND c.' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''  
		ELSE IF @FilterProperty = 'cue_nparticion:GTINT'
			SET @Sql +=  ' AND c.' + replace(@FilterProperty, ':GTINT', '') + ' > ''' + @FilterValue + ''''  
		ELSE IF @FilterProperty = 'cue_nparticion:GTEINT'
			SET @Sql +=  ' AND c.' + replace(@FilterProperty, ':GTEINT', '') + ' >= ''' + @FilterValue + ''''  
		ELSE IF @FilterProperty = 'cue_ccalle'
			SET @Sql +=  ' AND c.' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''   
		ELSE IF @FilterProperty = 'cue_cemail'
			SET @Sql +=  ' AND ' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''   
		ELSE IF @FilterProperty = 'estados'
			SET @Sql +=  ' AND est_iidcuenta IN (' + @FilterValue + ')' 
		ELSE IF @FilterProperty = 'pan_cdescripcion'
			SET @Sql +=  ' AND ' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''  
		ELSE IF @FilterProperty = 'cue_clocalidad'
			SET @Sql +=  ' AND c.' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''
		ELSE IF @FilterProperty = 'cue_cprovincia'
			SET @Sql +=  ' AND c.cue_cprovincia = N''' + @FilterValue + '''' 
		ELSE IF @FilterProperty = 'cue_iid:ININT'
			SET @Sql +=  ' AND c.cue_iid IN (' + @FilterValue + ') ' 
		ELSE IF @FilterProperty = 'cue_iid:NOT INT'
			SET @Sql +=  ' AND c.cue_iid != ''' + @FilterValue + ''' ' 
		ELSE IF @FilterProperty = 'cue_cpermiso:LIKE'
			SET @Sql +=  ' AND c.cue_cpermiso LIKE ''%' + @FilterValue + '%'' ' 
		ELSE IF @FilterProperty = 'cue_nEfectiva:ININT'
			SET @Sql +=  ' AND c.cue_nEfectiva IN (' + @FilterValue + ') '
		ELSE IF @FilterProperty = 'tip_nTipo:ININT'
			SET @Sql +=  ' AND tip.tip_nTipo IN (' + @FilterValue + ') '
		ELSE IF @FilterProperty = 'sta_dfechaOPNdesde:GT'
			SET @Sql +=  ' AND ' + replace(@FilterProperty, ':GT', '') + ' >= convert(DATETIME,'''+CONVERT(VARCHAR,DATEADD(day, @FilterValue*-1 , GETDATE()),120)+''',120)'
		ELSE IF @FilterProperty = 'sta_dfechaOPNdesde:LT'
			SET @Sql +=  ' AND ' + replace(@FilterProperty, ':LT', '') + ' <= convert(DATETIME,'''+CONVERT(VARCHAR,DATEADD(day, @FilterValue*-1 , GETDATE()),120)+''',120)'
		ELSE IF @FilterProperty = 'georeferenciada'
		BEGIN
			SET @Sql +=  ' AND (c.cue_ncuenta NOT IN (''0000'',''XXXX'')
								AND c.cue_clinea NOT IN (''_SG'',''_MP'') 
								AND c.cue_cLatLng NOT IN ('''',''0.0,0.0'')
								AND est_nEstado NOT IN (2,4) )'
		END
		ELSE IF @FilterProperty = 'sta_ncuentaenfallo' 
		BEGIN
			IF @FilterValue = 1
			BEGIN
				SET @Sql +=  ' AND ([sta_ncuentaenfallodetst] = 1 or [sta_ncuentaenfallo2dotst] = 1 or [sta_ncuentaenfallo3ertst] = 1) AND ((est_nEstado IN (0,2,3) OR (est_nEstado = 1 AND GetDate() BETWEEN est_dfechadesde AND isnull(est_dfechahasta, getdate()+1))))'
			END
		END
		ELSE IF @FilterProperty = 'sta_tst1:OR:sta_tst2'
			SET @Sql +=  ' AND ([sta_ncuentaenfallodetst] = 1 or [sta_ncuentaenfallo2dotst] = 1) '
		ELSE IF @FilterProperty = 'sta_nEnFalloDeAC'
			SET @Sql +=  ' AND ([sta_nEnFalloDeAC] = ''' + @FilterValue + ''' )'
		ELSE IF @FilterProperty = '_tip_nTipo' Or @FilterProperty = 'tip_nTipo' 
			SET @Sql +=  ' AND (tip.tip_nTipo IN (' + CAST(@FilterValue AS VARCHAR) + ') OR tip.tip_nTipo is null)'
		ELSE IF @FilterProperty = 'tip_nCondicionIN'  
			SET @Sql +=  ' AND tip.tip_nCondicion IN (' + CAST(@FilterValue AS VARCHAR) + ')'
		ELSE IF @FilterProperty = '_tip_nTipo:NOT' Or @FilterProperty = 'tip_nTipo:NOT'  
		BEGIN
			SET @Sql +=  ' AND (tip.tip_nTipo NOT IN (' + CAST(@FilterValue AS VARCHAR) + ') OR tip.tip_nTipo is null)'
		END
		ELSE IF @FilterProperty = 'cue_ncuentaDesde'  
			SET @Sql +=  ' AND c.cue_ncuenta BETWEEN ' + @FilterValue
		ELSE IF @FilterProperty = 'cue_cclave:LIKE'  
			SET @Sql +=  ' AND c.cue_cclave LIKE ''%'+ @FilterValue +'%'''
		ELSE IF @FilterProperty = 'pro_cdescripcion:LIKE'  
			SET @Sql +=  ' AND pro_cdescripcion LIKE ''%'+ @FilterValue +'%'''
		ELSE IF @FilterProperty = 'tpan.pan_idKey'  
			SET @Sql +=  ' AND tpan.pan_idKey = '''+ @FilterValue +''''
		ELSE IF @FilterProperty = 'pan.pan_ccodigo'  
			SET @Sql +=  ' AND pan.pan_ccodigo = '''+ @FilterValue +''''
		ELSE IF @FilterProperty = 'sinVehiculo'  
			SET @Sql +=  ' AND c.cue_iid NOT IN (select OwnerId from _Datos..dispositivoMovil where OwnerId = cue_iid) and tip.tip_nCondicion in (1,2)'
		ELSE IF @FilterProperty = 'soloVehiculo' 
		BEGIN 
			IF @FilterValue = 'true'
			BEGIN
				SET @Sql +=  ' AND c.cue_iid IN (select OwnerId from _Datos..dispositivoMovil where OwnerId = cue_iid) and tip.tip_nCondicion in (1,2)'
			END
		END
		ELSE IF @FilterProperty = 'cue_cCustom'  
			SET @Sql +=  ' AND x.cue_cCustom LIKE N''%'+ @FilterValue +'%'''
		ELSE IF @FilterProperty = '_nombre'  
		BEGIN   
			SET @Sql +=  ' AND (
							c.cue_iid IN (SELECT cue_iid FROM _Datos..m_cuentas WHERE cue_cnombre LIKE N''%'+ @FilterValue +'%'') 
						 OR c.cue_iid IN (SELECT tel_iidcuenta FROM _Datos..m_telefonos WHERE tel_cnombre LIKE N''%'+ @FilterValue +'%'') 
						 OR c.cue_iid IN (SELECT usu_iidcuenta FROM _Datos..m_usuarios WHERE usu_cnombre LIKE N''%'+ @FilterValue +'%'') 
						)'
		END
		ELSE IF @FilterProperty = '_telefono'  
		BEGIN      
			SET @Sql +=  ' AND (
								c.cue_iid IN (SELECT cue_iid FROM _Datos..m_cuentas WHERE cue_ctelefono LIKE ''%'+ @FilterValue +'%'') 
							 OR c.cue_iid IN (SELECT tel_iidcuenta FROM _Datos..m_telefonos WHERE tel_ctelefono LIKE ''%'+ @FilterValue +'%'') 					 
							)'
		END
		ELSE IF @FilterProperty = '_clave'  
		BEGIN      
			SET @Sql +=  ' AND (
								c.cue_iid IN (SELECT cue_iid FROM _Datos..m_cuentas WHERE cue_cclave LIKE ''%'+ @FilterValue +'%'') 
							 OR c.cue_iid IN (SELECT tel_iidcuenta FROM _Datos..m_telefonos WHERE tel_cclave LIKE ''%'+ @FilterValue +'%'') 
							 OR c.cue_iid IN (SELECT usu_iidcuenta FROM _Datos..m_usuarios WHERE usu_cclave LIKE ''%'+ @FilterValue +'%'') 
							)'
		END
		ELSE IF @FilterProperty = '_cue_cLatLng:ISNULL'  
			SET @Sql +=  ' AND c.cue_cLatLng = '''' OR cue_cLatLng = ''0.0,0.0''	'
		ELSE IF @FilterProperty = 'sta_dfechautimaalarma:GT'  
			SET @Sql +=  ' AND sta_dfechautimaalarma >= '''+@FilterValue+''''
		ELSE IF @FilterProperty = 'sta_dfechautimaalarma:GL'  
			SET @Sql +=  ' AND sta_dfechautimaalarma <= '''+@FilterValue+''''
		ELSE IF @FilterProperty = 'OPGSP'  
			SET @Sql +=  ' AND pro_idkey = '''+@FilterValue+''' AND cue_cubicacion LIKE ''%partidoId%'' '
		ELSE IF @FilterProperty = 'cue_dfechaalta:GT'  
			SET @Sql +=  ' AND c.cue_dfechaalta >= '''+@FilterValue+''''
		ELSE IF @FilterProperty = 'cue_dfechaalta:GL'  
			SET @Sql +=  ' AND c.cue_dfechaalta <= '''+@FilterValue+''''
		ELSE IF @FilterProperty = 'cue_cIMEI:LIKE'
			SET @Sql +=  ' AND c.cue_cIMEI LIKE ''%'+ @FilterValue +'%'''
		ELSE IF @FilterProperty = 'cue_cnombre:LIKE'
			SET @Sql +=  ' AND c.cue_cnombre LIKE ''%'+ @FilterValue +'%'''
		ELSE IF @FilterProperty = 'rep_cmail'
			SET @Sql +=  ' AND ra.rep_cmail LIKE ''%'+ @FilterValue +'%'''
		ELSE IF @FilterProperty = 'reporte_cod_ccodigo'
			SET @Sql +=  ' AND ca.cod_ccodigo IN (''' + replace(replace(@FilterValue, ',', ''','''), '[', '''') + ''') '
		ELSE IF @FilterProperty = 'pan_cnrosim'  
		BEGIN      
			SET @Sql +=  ' AND (
								c.cue_iid IN (SELECT pan_iidcuenta FROM _Datos..m_paneles WHERE pan_cnrosim1 LIKE ''%'+ @FilterValue +'%'' OR pan_cnrosim2 LIKE ''%'+ @FilterValue +'%'')
							)'
		END
		ELSE IF @FilterProperty = 'pan_ccompania'  
		BEGIN      
			SET @Sql +=  ' AND (
								c.cue_iid IN (SELECT pan_iidcuenta FROM _Datos..m_paneles WHERE pan_ccompania1 LIKE ''%'+ @FilterValue +'%'' OR pan_ccompania2 LIKE ''%'+ @FilterValue +'%'')
							)'
		END
		ELSE IF @FilterProperty = 'cue_ncuenta:ORcue_cnombre'
			SET @Sql +=  ' AND ( c.cue_cnombre LIKE ''%' + REPLACE(@FilterValue,'''','''''') + '%'' OR c.cue_ncuenta = ''' + @FilterValue + ''')'
		ELSE	
		BEGIN
			SET @Sql +=  ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''
			IF @Debug = 'S'
				PRINT @filterproperty + ', ELSE'
		END

		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
 END    
   
 SET @Sql += @SqlFilterRango

 IF @zona != ''  
 BEGIN      
	SET @Sql += ' AND c.cue_iid IN (SELECT zon_iidcuenta FROM _Datos.dbo.[m_zonas] o WHERE zon_ccodigo = '''+@zona+''' )'
 END  

 IF @linea != ''  
 BEGIN      
	SET @Sql += ' AND c.cue_clinea = ''' + @linea + ''''
 END  

 IF @lineadesde != '' 
 BEGIN      
	SET @Sql += ' AND c.cue_clinea >= ''' + @lineadesde + ''''
 END 

 IF @lineahasta != ''
 BEGIN      
	SET @Sql += ' AND c.cue_clinea <= ''' + @lineahasta + ''''
 END 
   
 IF @cuenta != ''  
 BEGIN      
	SET @Sql += ' AND c.cue_ncuenta = ''' + @cuenta + ''''
 END   
   
 IF @texto != ''  
 BEGIN      
	SET @Sql += ' AND c.cue_cnombre LIKE ''%' + REPLACE(@texto,'''','''''') + '%'''
 END      
 
 IF @cuentaId != 0  
 BEGIN      
	SET @Sql += ' AND c.cue_iid = ' + CAST(@cuentaId AS VARCHAR)
 END  

 IF @cue_ncuentaDesde != '' 
 BEGIN      
	SET @Sql += ' AND c.cue_ncuenta BETWEEN ''' + CAST(@cue_ncuentaDesde AS VARCHAR) + ''' AND ''' + CAST(@cue_ncuentaHasta AS VARCHAR) + ''''
 END  

 IF @est_nestado != 0  
 BEGIN      
	SET @Sql += ' AND est_nestado = ' + CAST(@est_nestado AS VARCHAR)
 END  

 IF @est_nestadoin != ''  
 BEGIN      
	SET @Sql += ' AND est_nestado IN (' + @est_nestadoin +') '
 END 

 IF @sta_nestado != ''  
 BEGIN      
	SET @Sql += ' AND sta_nestado IN (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @sta_nestado + ''', '','')) '
 END  

 IF @tip_ccodigo != ''  
 BEGIN      
	SET @Sql += ' AND tip.tip_ccodigo = ''' + @tip_ccodigo +''' '
 END

 DECLARE @SqlFrom NVARCHAR(max)

 SET @SqlFrom = 'INSERT INTO #Temp (RowNumber, Id)      
	SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, cue_iid
	FROM _Datos.dbo.m_cuentas c
		LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion ON c.cue_iid = est_iidcuenta           
		LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid                 
		LEFT OUTER JOIN _Tablas.dbo.t_tipos tip ON tip.tip_ccodigo = c.cue_ctipo
		OUTER APPLY (
			SELECT TOP 1 * FROM _Datos.dbo.p_gps gps WHERE gps_idcuenta = c.cue_iid ORDER BY 1 DESC
		) AS gps
		OUTER APPLY (
			SELECT TOP 1 * FROM [_Datos]..[m_paneles] pan WHERE pan.pan_iidcuenta = c.cue_iid ORDER BY 1 DESC
		) AS pan
		LEFT OUTER JOIN _Tablas.dbo.t_provincias p ON p.pro_ccodigo = c.cue_cprovincia
		LEFT OUTER JOIN _Datos.dbo.m_CuentasXtraInfo x ON x.cue_iidCuenta = c.cue_iid
		LEFT OUTER JOIN [_Tablas].[dbo].[t_CuentasTipoSevicio] cts ON cts.cts_idKey = x.cue_iTipoServicio
		LEFT JOIN [_Tablas]..[t_paneles] tpan ON tpan.pan_ccodigo = pan.pan_ccodigo
		LEFT JOIN _datos.dbo.m_reportes_automaticos ra ON ra.rep_iidcuenta = c.cue_iid
		LEFT JOIN _Tablas.dbo.t_codigos_alarma ca ON ca.cod_ccodigo = ms.sta_cultimaalarma
'

 IF(@JoinAlarma = 1)
 BEGIN
	SET @SqlFrom = @SqlFrom + ' 
		LEFT OUTER JOIN _datos.dbo.p_recepcion as p_recepcion ON rec_iidCuenta = c.cue_iid
		LEFT OUTER JOIN _tablas.dbo.t_codigos_alarma as t_codigos_alarma2 ON rec_cAlarma = t_codigos_alarma2.cod_cCodigo '
 END

 IF @type != ''
	SET @SqlFrom += ' INNER JOIN _Datos.dbo.SmartTrack ON CuentaId = c.cue_iid And apptype= ''' + @type + ''''

 SET @Sql = @SqlFrom + @Sql

 If @Debug = 'S'
 Begin
	Print '---------------------------'
	Print '--------UNO----------------'
	Print '---------------------------'
	PRINT CAST(@Sql AS VARCHAR(MAX))
 End

 EXEC(@Sql)
               
 SELECT @totalrows = MAX(RowNumber) FROM #Temp
               
 SET @Sql = '';

 IF @fieldlist = '' 
 BEGIN
	IF @short = 1
	BEGIN
		SET @fieldlist = '
			c.cue_iid Id
			, c.cue_iid
			, c.cue_clinea
			, c.cue_ncuenta
			, LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(c.cue_cnombre, CHAR(13), ''''), CHAR(10), ''''), CHAR(9), ''''))) as cue_cnombre
			, c.cue_ccalle
			, c.cue_clocalidad
			, p.pro_cdescripcion as cue_provincia
			, c.cue_ccodigopostal
			, Situacion
			, c.cue_cLatLng
			, ms.sta_cultimaalarma
			, REPLACE(CONVERT(VARCHAR, ms.sta_dfechautimaalarma, 126),''1900-01-01T00:00:00'', '''') AS sta_dfechautimaalarma
			, REPLACE(CONVERT(VARCHAR, ms.sta_dfechaultimotst, 126),''1900-01-01T00:00:00'', '''') AS sta_dfechaultimotst
			, ca.cod_cdescripcion
			, c.cue_cemail
			, c.cue_cobservacion
			, c.cue_cubicacion
			, lin_crazonsocial
			, x.cue_iTipoServicio
			, ISNULL(cts.cts_cnombre, '''') as cue_cTipoServicio
		'
	END
	ELSE
	BEGIN
		SET @fieldlist = '
			c.cue_iid Id
			, c.cue_iid
			, c.cue_clinea
			, c.cue_ncuenta
			, LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(c.cue_cnombre, CHAR(13), ''''), CHAR(10), ''''), CHAR(9), ''''))) as cue_cnombre
			, sta_ncuentaenfallodetst
			, sta_tEnFalloDeTSTDesde
			, sta_dfechaultimotst
			, sta_ncuentaenfallo2dotst
			, sta_tEnFalloDeTST2Desde
			, sta_dfechaultimo2dotst
			, sta_ncuentaenfallo3ertst
			, sta_tEnFalloDeTST3Desde
			, sta_dfechaultimo3ertst
			, c.cue_ctipo
			, c.cue_ccalle
			, c.cue_clocalidad
			, c.cue_cprovincia
			, c.cue_nPrioridad
			, p.pro_cdescripcion as cue_provincia
			, c.cue_ccodigopostal
			, Situacion
			, est_dfechadesde
			, est_dfechahasta
			, c.cue_cLatLng
			, ms.sta_cultimaalarma
			, REPLACE(CONVERT(VARCHAR, ms.sta_dfechautimaalarma, 126),''1900-01-01T00:00:00'', '''') AS sta_dfechautimaalarma
			, REPLACE(CONVERT(VARCHAR, ms.sta_dfechaultimotst, 126),''1900-01-01T00:00:00'', '''') AS sta_dfechaultimotst
			, ca.cod_cdescripcion
			, ca.cod_nColorLetra
			, ca.cod_ncolor
			, ms.sta_nestado
			, ms.sta_nestado as act_nestado
			, ms.sta_ienviadossms
			, ms.sta_nenviasms
			, tip.* 
			, REPLACE(CONVERT(VARCHAR, gps.gps_tfechahora, 126),''1900-01-01T00:00:00'', '''') AS gps_tfechahora
			, ms.[sta_nEnFalloDeAC]
			, c.cue_nEfectiva
			, c.cue_cIdExtendido
			, c.cue_iZonaHoraria
			, x.cue_iLicenciasSP
			, c.cue_cPartitionInfo
			, c.cue_cIMEI
			, c.cue_nparticion
			, c.cue_nAutoMonitoreo
			, c.cue_nllaveul
			, c.cue_ctelefono
			, c.cue_dfechaalta
			, c.cue_cemail
			, c.cue_cobservacion
			, c.cue_cubicacion
			, c.cue_dservicio
			, c.cue_cpermiso
			, c.cue_cclave
			, est_nestado
			, sta_dfechaOPNdesde
			, sta_cultimaalerta
			, REPLACE(CONVERT(VARCHAR, ms.sta_dFechaUltimaAlerta, 126),''1900-01-01T00:00:00'', '''') AS sta_dFechaUltimaAlerta
			, sta_nestado
			, lin_crazonsocial
			, lin_cimagen
			, sta_nEnFalloDeAC
			, x.cue_cCustom
			, x.cue_cConfig
			, x.cue_cUltimaAlarmaRecibida
			, x.cue_dFechaUltimaAlarmaRecibida
			, x.cue_dFechaOPN
			, x.cue_dFechaCLO
			, x.cue_iTipoServicio
			, ISNULL(cts.cts_cnombre, '''') as cue_cTipoServicio
			, x.cue_iVigiladoresVC
			, x.cue_iEnFalla
			, tpan.*
			, caxtra.cod_cdescripcion as cod_cdescripcionUAR
			, caxtra.cod_nColorLetra as cod_nColorLetraUAR
			, caxtra.cod_ncolor as cod_ncolorUAR
			, madre.cue_clinea as madre_clinea
			, madre.cue_ncuenta as madre_ncuenta
			, madre.cue_cnombre as madre_cnombre
			, tinst.ins_cnombre as tinst_cnombre
			, tinst.ins_ccodigo as tinst_ccodigo
			, caalerta.cod_cdescripcion as cod_cdescripcionalerta
			, caalerta.cod_ncolorletra as cod_nColorLetraAlerta
			, caalerta.cod_ncolor as cod_ncolorAlerta
			, nvs.nvs_nNivel
		'
	END
 END

 SET @Sql += 'SELECT RowNumber, ' + @fieldlist + '
	FROM _Datos.dbo.m_cuentas c               
	LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion ON c.cue_iid = est_iidcuenta       
	LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid              
	LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma ca ON ca.cod_ccodigo = ms.sta_cultimaalarma 
	LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma caalerta ON caalerta.cod_ccodigo = ms.sta_cultimaalerta        
	LEFT OUTER JOIN _Tablas.dbo.t_provincias p ON p.pro_ccodigo = c.cue_cprovincia 
	OUTER APPLY (
		SELECT TOP 1 * FROM _Datos.dbo.p_gps gps WHERE gps_idcuenta = c.cue_iid ORDER BY 1 DESC
	) AS gps
	LEFT OUTER JOIN _Datos.dbo.m_CuentasXtraInfo x ON x.cue_iidCuenta = c.cue_iid
	LEFT OUTER JOIN [_Tablas].[dbo].[t_CuentasTipoSevicio] cts ON cts.cts_idKey = x.cue_iTipoServicio
	LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma caxtra ON caxtra.cod_ccodigo = x.cue_cUltimaAlarmaRecibida          
	LEFT OUTER JOIN _Tablas.dbo.t_lineas lin ON lin.lin_ccodigo = c.cue_clinea   
	LEFT OUTER JOIN _Tablas.dbo.t_tipos tip ON tip.tip_ccodigo = c.cue_ctipo 
	OUTER APPLY (
		SELECT TOP 1 * FROM [_Datos]..[m_paneles] pan WHERE pan.pan_iidcuenta = c.cue_iid ORDER BY 1 DESC
	) AS pan
	OUTER APPLY (
		SELECT TOP 1 * FROM [_Datos]..[p_nivelsenal] nvs WHERE nvs.nvs_idCuenta = c.cue_iid ORDER BY nvs_tfechahora DESC
	) AS nvs
	LEFT JOIN [_Tablas]..[t_paneles] tpan ON tpan.pan_ccodigo = pan.pan_cgprs
	LEFT JOIN [_Datos].[dbo].[m_cuentas] madre ON madre.cue_iid = c.cue_nparticion
	LEFT JOIN _datos.dbo.m_reportes_automaticos ra ON ra.rep_iidcuenta = c.cue_iid
	LEFT OUTER JOIN [_Tablas]..[t_instaladores] tinst ON tinst.ins_ccodigo = c.cue_cinstalador
	INNER JOIN #Temp t ON t.Id = c.cue_iid          
	WHERE t.RowNumber BETWEEN (' + replace(@page, '''', '''''') + ' - 1) * ' + replace(@limit, '''', '''''') + ' + 1 AND (' + replace(@page, '''', '''''')+ ' * ' + replace(@limit, '''', '''''') + ')
	ORDER BY t.RowNumber ASC';

 IF @Debug = 'S'
 Begin
	Print '---------------------------'
	print '-------DOS-----------------'
	Print '---------------------------'
	print CAST(@sql AS NTEXT)
 End

 EXEC(@Sql)
END