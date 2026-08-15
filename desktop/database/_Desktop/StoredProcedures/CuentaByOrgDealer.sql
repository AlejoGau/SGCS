--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.270 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.563 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[CuentaByOrgDealer]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(128) = '',            
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
 
 -- 10/01 BC 375744352
 @UserId INT = 0         
AS                
BEGIN                
 SET NOCOUNT ON              
 set dateformat ymd
 --Load Security
 
 -- 10/01 BC 375744352
 IF (@UserId = 0)
	BEGIN
		SELECT @UserId = dbo.GetUserIdByToken(@token)
	END
 
 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
           
 --Order          
 DECLARE @SortField NVARCHAR(128)           
 DECLARE @SortDirection NVARCHAR(4)          
 SELECT @SortField = 'lin_iOrganizacion', @SortDirection = 'ASC'           
 
 print 'comienza sort'
 print @sort
 IF @sort != ''          
 BEGIN          
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC          
         
   IF @SortField = 'dealer-cuenta'      
      SET @SortField = 'cue_clinea ASC , cue_ncuenta '    
 END          

print @SortField
print 'fin sort'   

			     
 --Temp          
 CREATE TABLE #Temp (RowNumber INT, Id INT)                
           
 DECLARE @Sql NVARCHAR(MAX)          
 set @Sql = ''
     set @Sql = @Sql + ' WHERE 1 = 1 AND lin.lin_iOrganizacion > 0 AND lin.lin_iOrganizacion is not NULL '          
               
 
 --Filters
 declare @JoinAlarma int;
 set @JoinAlarma = 0;
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
		PRINT 'FilterProperty - ' + @filterproperty
		--Set Filters

		DECLARE @ObjectTypeId VARCHAR(64)		
		DECLARE @ObjectId VARCHAR(11)
		DECLARE @RelationObjectTypeId VARCHAR(64)			 											 										
		DECLARE @RelationObjectId VARCHAR(11)
		DECLARE @RelationMethod VARCHAR(12) = ' IN '	
		declare  @objectType VARCHAR(64) = 'Cuenta'
									
		declare @ObjectDatos bit;
		declare @RelationObjectDatos bit;
		IF PATINDEX('%:RelationParent', @FilterProperty) > 0
		BEGIN
			SET @FilterProperty = REPLACE(@FilterProperty, ':RelationParent', '')
			set @ObjectDatos = 0
			set @RelationObjectDatos = 0

			SELECT @ObjectTypeId = CAST(dbo.GetObjectId(@FilterProperty) AS VARCHAR), 
				@ObjectId = @FilterValue, 
				@RelationObjectTypeId = CAST(dbo.GetObjectId(@objectType) AS VARCHAR)			
						
			SET @Sql = @Sql + ' AND c.cue_iid ' + @RelationMethod + ' (SELECT RelationObjectId FROM _datos..RelationObject WHERE ObjectTypeId = ' + @ObjectTypeId + ' AND ObjectId = ' + @ObjectId + ' AND RelationObjectTypeId = ' + @RelationObjectTypeId + ') '     

			--else
				--SET @SqlFilter=@FilterProperty --'las tablas no coinciden' +CAST(@ObjectDatos AS VARCHAR)+ CAST(@RelationObjectDatos AS VARCHAR)
		END

		else IF @FilterProperty = 'Situacion'
		BEGIN      
			
			SET @Sql = @Sql + ' AND ( '      
			
			IF @FilterValue = 'Habilitada'
				SET @Sql = @Sql + ' est_nEstado IN (0)'      
			ELSE IF @FilterValue = 'No Habilitada'
				SET @Sql = @Sql + ' est_nEstado IN (2)'      
			ELSE IF @FilterValue = 'En Prueba'
				SET @Sql = @Sql + ' est_nEstado IN (3)'    
			ELSE IF @FilterValue = 'Eliminar'
				SET @Sql = @Sql + ' est_nEstado IN (4)'  		    		    			    
				
			IF @FilterValue = 'En Prueba'      
				SET @Sql = @Sql + ' OR (est_nEstado = 1 AND GetDate() BETWEEN est_dfechadesde AND isnull(est_dfechahasta, getdate()+1))'        
			
			IF @FilterValue = 'Alarma'
			begin
				SET @Sql = @Sql + ' (p_recepcion.rec_nestado <= 7           
					--And rec_tfechahora<=DATEADD(MINUTE,1,GetDate())
					And t_codigos_alarma2.cod_ntipo=0 And t_codigos_alarma2.cod_nalerta=1) '
				set @JoinAlarma = 1
			end
			
			
			SET @Sql = @Sql + ')'      
			
		END  
		ELSE IF @FilterProperty = 'est_nestado:IN'
			SET @Sql = @Sql + ' AND est_nestado in (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @FilterValue + ''', '',''))'
 		ELSE IF @FilterProperty = 'Dealer-Cuenta'
			SET @Sql = @Sql + ' AND (c.cue_clinea + ''-'' + c.cue_ncuenta) = ''' + @FilterValue + ''''
		
		ELSE IF @FilterProperty = 'cue_clinea'
			SET @Sql = @Sql + ' AND c.cue_clinea = ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'cue_ncuentaGET'
			SET @Sql = @Sql + ' AND c.cue_ncuenta >= ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'cue_ncuentaLET'
			SET @Sql = @Sql + ' AND c.cue_ncuenta <= ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'sta_tEnFalloDeTSTDesde'
			SET @Sql = @Sql + ' AND sta_tEnFalloDeTSTDesde >= convert(datetime,  ''' + @FilterValue + ''',105)'
		ELSE IF @FilterProperty = 'sta_dfechaultimotst'
			SET @Sql = @Sql + ' AND datediff(day, sta_dfechaultimotst, convert(datetime,  ''' + @FilterValue + ''',105)) = 0'



		ELSE IF @FilterProperty = 'tip_nCondicion' AND @FilterValue = '1'
		BEGIN
			SET @Sql = @Sql + ' AND (tip_nCondicion = 1)'     
			SET @Sql = @Sql + ' AND cue_iid NOT IN (SELECT OwnerId FROM _Datos.dbo.DispositivoMovil) '
		END
		ELSE IF @FilterProperty = 'cue_cnombre'
			SET @Sql = @Sql + ' AND c.' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''  
		ELSE IF @FilterProperty = 'cue_nparticion:GTINT'
			SET @Sql = @Sql + ' AND c.' + replace(@FilterProperty, ':GTINT', '') + ' > ''' + @FilterValue + ''''  
		ELSE IF @FilterProperty = 'cue_nparticion:GTEINT'
			SET @Sql = @Sql + ' AND c.' + replace(@FilterProperty, ':GTEINT', '') + ' >= ''' + @FilterValue + ''''  
		ELSE IF @FilterProperty = 'cue_ccalle'
			SET @Sql = @Sql + ' AND c.' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''   
		ELSE IF @FilterProperty = 'cue_cemail'
			SET @Sql = @Sql + ' AND ' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''   
		ELSE IF @FilterProperty = 'estados'
			SET @Sql = @Sql + ' AND est_iidcuenta IN (' + @FilterValue + ')' 
		ELSE IF @FilterProperty = 'pan_cdescripcion'
			SET @Sql = @Sql + ' AND ' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''  
		ELSE IF @FilterProperty = 'cue_clocalidad'
			SET @Sql = @Sql + ' AND c.' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''
		ELSE IF @FilterProperty = 'cue_cprovincia'
			SET @Sql = @Sql + ' AND c.' + @FilterProperty + ' = N''' + @FilterValue + '''' 

		ELSE IF @FilterProperty = 'cue_iid:ININT'
			SET @Sql = @Sql + ' AND c.cue_iid  IN (' + @FilterValue + ') ' 

		ELSE IF @FilterProperty = 'cue_iid:NOT INT'
			SET @Sql = @Sql + ' AND c.cue_iid  != ''' + @FilterValue + ''' ' 

		ELSE IF @FilterProperty = 'cue_cpermiso:LIKE'
			SET @Sql = @Sql + ' AND c.cue_cpermiso  LIKE ''%' + @FilterValue + '%'' ' 

		ELSE IF @FilterProperty = 'cue_nEfectiva:ININT'
			SET @Sql = @Sql + ' AND c.cue_nEfectiva IN (' + @FilterValue + ') '
	
		ELSE IF @FilterProperty = 'sta_dfechaOPNdesde:GT'
		begin
			SET @Sql = @Sql + ' AND ' + replace(@FilterProperty, ':GT', '') + ' >= convert(DATETIME,'''+CONVERT(VARCHAR,DATEADD(day, @FilterValue*-1 , GETDATE()),120)+''',120)'
		end

		ELSE IF @FilterProperty = 'sta_dfechaOPNdesde:LT'
		begin
			SET @Sql = @Sql + ' AND ' + replace(@FilterProperty, ':LT', '') + ' <= convert(DATETIME,'''+CONVERT(VARCHAR,DATEADD(day, @FilterValue*-1 , GETDATE()),120)+''',120)'
		end

		ELSE IF @FilterProperty = 'georeferenciada'
			BEGIN
				SET @Sql = @Sql + ' AND (c.cue_ncuenta NOT IN (''0000'',''XXXX'')
									AND c.cue_clinea NOT IN (''_SG'',''_MP'') 
									AND c.cue_cLatLng NOT IN ('''',''0.0,0.0'')
									AND est_nEstado NOT IN (2,4) )'			
			END
		ELSE IF @FilterProperty = 'sta_ncuentaenfallo' 
		begin
			if  @FilterValue = 1 -- solo pongo el filtro si viene en 1
			begin
				set @Sql = @Sql + ' AND ([sta_ncuentaenfallodetst] = 1 or
	[sta_ncuentaenfallo2dotst] = 1 or
	[sta_ncuentaenfallo3ertst] = 1) AND ((est_nEstado IN (0,2,3) OR (est_nEstado = 1 AND GetDate() BETWEEN est_dfechadesde AND isnull(est_dfechahasta, getdate()+1))))'
			end
		end

		ELSE IF @FilterProperty = 'sta_tst1:OR:sta_tst2'
		begin
			set @Sql = @Sql + ' AND ([sta_ncuentaenfallodetst] = 1 or [sta_ncuentaenfallo2dotst] = 1) '
		end


		ELSE IF @FilterProperty = 'sta_nEnFalloDeAC'
		begin
			set @Sql = @Sql + ' AND ([sta_nEnFalloDeAC] = ''' + @FilterValue + ''' )'
		end

		ELSE IF @FilterProperty = '_tip_nTipo'  
		BEGIN      
		SET @Sql = @Sql + ' AND (tip_nTipo IN (' + CAST(@FilterValue AS VARCHAR)  + ')' + 'or tip_nTipo is null)'
		END 
		ELSE IF @FilterProperty = 'tip_nCondicionIN'  
		BEGIN      
		SET @Sql = @Sql + ' AND tip_nCondicion IN (' + CAST(@FilterValue AS VARCHAR)  + ')'
		END 
		ELSE IF @FilterProperty = '_tip_nTipo:NOT'  
		BEGIN      
		SET @Sql = @Sql + ' AND (tip_nTipo NOT IN (' + CAST(@FilterValue AS VARCHAR)  + ')' + 'or tip_nTipo is null)'
		END 

		ELSE IF @FilterProperty = 'cue_ncuentaDesde'  
		BEGIN      
		SET @Sql = @Sql + ' AND c.cue_ncuenta BETWEEN ' + @FilterValue + ')'
		END 


		ELSE IF @FilterProperty = 'cue_cclave:LIKE'  
		BEGIN      
		SET @Sql = @Sql + ' AND c.cue_cclave LIKE ''%'+ @FilterValue +'%'''
		END 

		ELSE IF @FilterProperty = 'pro_cdescripcion:LIKE'  
		BEGIN      
			SET @Sql = @Sql + ' AND pro_cdescripcion LIKE ''%'+ @FilterValue +'%'''
		END 

		ELSE IF @FilterProperty = 'tpan.pan_idKey'  
		BEGIN      
		SET @Sql = @Sql + ' AND tpan.pan_idKey = '''+ @FilterValue +''''
		END
		ELSE IF @FilterProperty = 'pan.pan_ccodigo'  
		BEGIN      
		SET @Sql = @Sql + ' AND pan.pan_ccodigo = '''+ @FilterValue +''''
		END

		ELSE IF @FilterProperty = 'sinVehiculo'  
		BEGIN      
		SET @Sql = @Sql + ' AND c.cue_iid NOT IN  (select OwnerId from _Datos..dispositivoMovil where OwnerId = cue_iid) and tip_ncondicion in (1,2)'
		END 

		ELSE IF @FilterProperty = 'soloVehiculo' 
		BEGIN 
			IF @FilterValue = 'true'
				BEGIN
					SET @Sql = @Sql + ' AND cue_iid IN  (select OwnerId from _Datos..dispositivoMovil where OwnerId = cue_iid) and tip_ncondicion in (1,2)'
				END
		END

		ELSE IF @FilterProperty = 'cue_cCustom'  
		BEGIN      
		SET @Sql = @Sql + ' AND x.cue_cCustom LIKE N''%'+ @FilterValue +'%'''
		END

		ELSE IF @FilterProperty = '_nombre'  
		BEGIN   
		--set @FilterValue = replace(@FilterValue,'%u','\u')
		SET @Sql = @Sql + ' AND (
							c.cue_iid IN (SELECT cue_iid FROM _Datos..m_cuentas WHERE cue_cnombre LIKE N''%'+ @FilterValue +'%'') 
					 OR c.cue_iid IN (SELECT tel_iidcuenta FROM _Datos..m_telefonos WHERE tel_cnombre LIKE N''%'+ @FilterValue +'%'') 
					 OR c.cue_iid IN (SELECT usu_iidcuenta FROM _Datos..m_usuarios WHERE usu_cnombre LIKE N''%'+ @FilterValue +'%'') 
					)
			'
		END

		ELSE IF @FilterProperty = '_telefono'  
		BEGIN      
		SET @Sql = @Sql + ' AND (
							c.cue_iid IN (SELECT cue_iid FROM _Datos..m_cuentas WHERE cue_ctelefono LIKE ''%'+ @FilterValue +'%'') 
					 OR c.cue_iid IN (SELECT tel_iidcuenta FROM _Datos..m_telefonos WHERE tel_ctelefono LIKE ''%'+ @FilterValue +'%'') 					 
					)
			'
		END


		ELSE IF @FilterProperty = '_clave'  
		BEGIN      
		SET @Sql = @Sql + ' AND (
							c.cue_iid IN (SELECT cue_iid FROM _Datos..m_cuentas WHERE cue_cclave LIKE ''%'+ @FilterValue +'%'') 
					 OR c.cue_iid IN (SELECT tel_iidcuenta FROM _Datos..m_telefonos WHERE tel_cclave LIKE ''%'+ @FilterValue +'%'') 
					 OR c.cue_iid IN (SELECT usu_iidcuenta FROM _Datos..m_usuarios WHERE usu_cclave LIKE ''%'+ @FilterValue +'%'') 
					)
			'
		END
		
		ELSE IF @FilterProperty = '_cue_cLatLng:ISNULL'  
		BEGIN      
		SET @Sql = @Sql + ' AND c.cue_cLatLng = '''' OR cue_cLatLng = ''0.0,0.0''
			'
		END

		ELSE IF @FilterProperty = 'sta_dfechautimaalarma:GT'  
		BEGIN  

		SET @Sql = @Sql + ' AND sta_dfechautimaalarma >= '''+@FilterValue+''' 
			'
		END

		ELSE IF @FilterProperty = 'sta_dfechautimaalarma:GL'  
		BEGIN      
		SET @Sql = @Sql + ' AND sta_dfechautimaalarma <= '''+@FilterValue+''' 
			'
		END

		ELSE IF @FilterProperty = 'OPGSP'  
		BEGIN      
		SET @Sql = @Sql + ' AND pro_idkey = '''+@FilterValue+''' 
				AND cue_cubicacion LIKE ''%partidoId%''
			'
		END

		ELSE IF @FilterProperty = 'cue_dfechaalta:GT'  
		BEGIN  

		SET @Sql = @Sql + ' AND c.cue_dfechaalta >= '''+@FilterValue+''' 
			'
		END

		ELSE IF @FilterProperty = 'cue_dfechaalta:GL'  
		BEGIN      
		SET @Sql = @Sql + ' AND c.cue_dfechaalta <= '''+@FilterValue+''' 
			'
		END
		ELSE IF @FilterProperty = 'cue_cIMEI:LIKE'
		BEGIN  
			SET @Sql = @Sql + ' AND c.cue_cIMEI LIKE ''%'+ @FilterValue +'%''' 	
		END

		ELSE IF @FilterProperty = 'rep_cmail'
		BEGIN  
			SET @Sql = @Sql + ' AND ra.rep_cmail LIKE ''%'+ @FilterValue +'%''' 	
		END

		ELSE IF @FilterProperty = 'reporte_cod_ccodigo'
		BEGIN  
			SET @Sql = @Sql + ' AND ca.cod_ccodigo IN (''' + replace (replace (@FilterValue, ',', ''','''), '[', '''') + ''') '
			
		END

		ELSE IF @FilterProperty = 'pan_cnrosim'  
		BEGIN      
		SET @Sql = @Sql + ' AND (
					c.cue_iid IN (SELECT pan_iidcuenta FROM _Datos..m_paneles WHERE pan_cnrosim1 LIKE ''%'+ @FilterValue +'%''
					 OR pan_cnrosim2 LIKE ''%'+ @FilterValue +'%'')			 
					)
			'
		END

		ELSE IF @FilterProperty = 'pan_ccompania'  
		BEGIN      
		SET @Sql = @Sql + ' AND (
					c.cue_iid IN (SELECT pan_iidcuenta FROM _Datos..m_paneles WHERE pan_ccompania1 LIKE ''%'+ @FilterValue +'%''
					 OR pan_ccompania2 LIKE ''%'+ @FilterValue +'%'')		 
					)
			'
		END
		ELSE IF @FilterProperty = 'cue_ncuenta:ORcue_cnombre'
		BEGIN
			SET @Sql = @Sql + ' AND ( c.cue_cnombre LIKE ''%' + REPLACE(@FilterValue,'''','''''') + '%'' OR '+' c.cue_ncuenta = ''' + @FilterValue + ''')'
			
			
		END

		ELSE	
		begin
			SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''     
			PRINT @filterproperty + ', ELSE'
		end

		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END    
   
set @sql = @sql + @SqlFilterRango
print @Sql


IF @zona != ''  
 BEGIN      
 SET @Sql = @Sql + ' AND c.cue_iid IN (SELECT zon_iidcuenta FROM _Datos.dbo.[m_zonas] o WHERE  zon_ccodigo = '''+@zona+''' )'      
 END  

 IF @linea != ''  
 BEGIN      
 SET @Sql = @Sql + ' AND c.cue_clinea = ''' + @linea + ''''      
 END  


 IF @lineadesde != '' 
 BEGIN      
 SET @Sql = @Sql + ' AND c.cue_clinea >= ''' + @lineadesde + ''''      
 END 

 IF  @lineahasta != ''
 BEGIN      
 SET @Sql = @Sql + ' AND c.cue_clinea <= ''' + @lineahasta + ''''      
 END 
   
 IF @cuenta != ''  
 BEGIN      
 SET @Sql = @Sql + ' AND c.cue_ncuenta = ''' + @cuenta + ''''      
 END   
   
 IF @texto != ''  
 BEGIN      
 SET @Sql = @Sql + ' AND c.cue_cnombre LIKE ''%' + REPLACE(@texto,'''','''''') + '%'''      
 END      
 
 IF @cuentaId != 0  
 BEGIN      
 SET @Sql = @Sql + ' AND c.cue_iid = ' + CAST(@cuentaId AS VARCHAR)
 END  


IF @cue_ncuentaDesde  != '' 
BEGIN      
SET @Sql = @Sql + ' AND c.cue_ncuenta BETWEEN ''' + CAST(@cue_ncuentaDesde AS VARCHAR) + ''' AND ''' + CAST(@cue_ncuentaHasta AS VARCHAR) + ''''
END  

IF @est_nestado != 0  
 BEGIN      
 SET @Sql = @Sql + ' AND est_nestado = ' + CAST(@est_nestado AS VARCHAR) 
 END  

IF @est_nestadoin != ''  
 BEGIN      
 SET @Sql = @Sql + ' AND est_nestado IN (' + @est_nestadoin +') '
 END 

IF @sta_nestado != ''  
 BEGIN      
 SET @Sql = @Sql + ' AND sta_nestado IN (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @sta_nestado + ''', '','')) '
 END  

IF @tip_ccodigo != ''  
 BEGIN      
 SET @Sql = @Sql + ' AND tip_ccodigo = ''' + @tip_ccodigo +''' '
 END

print @Sql           

declare @SqlFrom NVARCHAR(max)

SET @SqlFrom = 'INSERT INTO #Temp (RowNumber, Id)          
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, cue_iid
		FROM _Datos.dbo.m_cuentas c
			LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion ON c.cue_iid = est_iidcuenta           
			LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid                 
			LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo
		--	LEFT OUTER JOIN _Datos.dbo.p_gps gps ON gps_idcuenta = c.cue_iid
			OUTER APPLY (
				SELECT TOP 1 * FROM _Datos.dbo.p_gps gps WHERE gps_idcuenta = c.cue_iid ORDER BY 1 DESC
			) AS gps

			OUTER APPLY (
				-- DEDALO 14/02/2020 Solo trae 1 panel por cuenta para la lista porque se duplican
				SELECT TOP 1 * FROM [_Datos]..[m_paneles] pan WHERE pan.pan_iidcuenta = c.cue_iid ORDER BY 1 DESC
			) AS pan

			LEFT OUTER JOIN _Tablas.dbo.t_provincias p on pro_ccodigo = c.cue_cprovincia
			LEFT OUTER JOIN _Datos.dbo.m_CuentasXtraInfo x ON x.cue_iidCuenta = c.cue_iid 
			LEFT JOIN [_Tablas]..[t_paneles] tpan ON tpan.pan_ccodigo = pan.pan_ccodigo
			LEFT JOIN _datos.dbo.m_reportes_automaticos ra ON ra.rep_iidcuenta = c.cue_iid
			LEFT OUTER JOIN _Tablas.dbo.t_lineas lin ON lin_ccodigo = c.cue_clinea   
			LEFT JOIN _Datos.dbo.Organization org on lin.lin_iOrganizacion = org.Id
			--LEFT JOIN _Datos.dbo.DispositivoMovil dm ON dm.OwnerId = c.cue_iid

			-- BC 390473224 : Se agrega JOIN a t_codigos_alarma
			LEFT JOIN _Tablas.dbo.t_codigos_alarma ca ON ca.cod_ccodigo = ms.sta_cultimaalarma
'
  if(@JoinAlarma = 1)
   begin
		set @SqlFrom = @SqlFrom + ' 
		Left Outer Join _datos.dbo.p_recepcion as p_recepcion ON rec_iidCuenta=c.cue_iid
	Left Outer Join _tablas.dbo.t_codigos_alarma as t_codigos_alarma2 ON rec_cAlarma = t_codigos_alarma2.cod_cCodigo '
   end

set @Sql = @SqlFrom + @Sql


 PRINT CAST(@Sql AS VARCHAR(MAX))              
 EXEC(@Sql)              
               
 --Cantidad de registros              
 SELECT @totalrows = MAX(RowNumber) FROM #Temp              
               
 --Paginacion  
 set @Sql = '';

	IF @fieldlist = '' 
		BEGIN
			SET @fieldlist = '
				c.cue_iid Id
				, c.cue_iid
				, c.cue_clinea
				, c.cue_ncuenta
				, LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(c.cue_cnombre, CHAR(13), ''''), CHAR(10), ''''), CHAR(9), ''''))) as cue_cnombre
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
				,ms.sta_ienviadossms
				,ms.sta_nenviasms
				, tip.* 
				,REPLACE(CONVERT(VARCHAR, gps.gps_tfechahora, 126),''1900-01-01T00:00:00'', '''') AS gps_tfechahora
				,ms.[sta_nEnFalloDeAC]
				,c.cue_nEfectiva
				,c.cue_cIdExtendido
				,c.cue_iZonaHoraria
				,x.cue_iLicenciasSP
				,c.cue_cPartitionInfo 
				,c.cue_cIMEI
				,c.cue_nparticion
				,c.cue_nAutoMonitoreo
				,c.cue_nllaveul
				,c.cue_ctelefono
				,c.cue_dfechaalta

				-- Agregado por el bug en el ExportDatosCuenta
				,c.cue_cemail
				,c.cue_cobservacion
				,c.cue_cubicacion
				,c.cue_dservicio
				,c.cue_cpermiso
				,c.cue_cclave

				,est_nestado
				,sta_dfechaOPNdesde
				,sta_tEnFalloDeTSTDesde
				,sta_dfechaultimotst
				,sta_cultimaalerta
				,REPLACE(CONVERT(VARCHAR, ms.sta_dFechaUltimaAlerta, 126),''1900-01-01T00:00:00'', '''') AS sta_dFechaUltimaAlerta
				,sta_nestado
				,lin_crazonsocial
				,lin_cimagen
				,sta_ncuentaenfallodetst
				,sta_ncuentaenfallo2dotst
				,sta_ncuentaenfallo3ertst
				,sta_nEnFalloDeAC
				,x.cue_cCustom
				,x.cue_cConfig
				,x.cue_cUltimaAlarmaRecibida
				,x.cue_dFechaUltimaAlarmaRecibida
				,x.cue_dFechaOPN
				,x.cue_dFechaCLO
				,tpan.*
				,caxtra.cod_cdescripcion as cod_cdescripcionUAR
				,caxtra.cod_nColorLetra as cod_nColorLetraUAR
				,caxtra.cod_ncolor as cod_ncolorUAR
				,madre.cue_clinea as madre_clinea
				,madre.cue_ncuenta as madre_ncuenta
				,madre.cue_cnombre as madre_cnombre
				,tinst.ins_cnombre as tinst_cnombre
				,tinst.ins_ccodigo as tinst_ccodigo
				,caalerta.cod_cdescripcion as cod_cdescripcionalerta
				,caalerta.cod_ncolorletra as cod_nColorLetraAlerta
				,caalerta.cod_ncolor as cod_ncolorAlerta
				,nvs.nvs_nNivel
				,org.Id as OrgId, org.Name as OrgNombre
			'
		END


 set @Sql = @Sql + 'SELECT RowNumber, '+ @fieldlist+'
	
  FROM _Datos.dbo.m_cuentas c               
	LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion ON c.cue_iid = est_iidcuenta       
	LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid              
	LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma ca ON ca.cod_ccodigo = ms.sta_cultimaalarma 
	LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma caalerta ON caalerta.cod_ccodigo = ms.sta_cultimaalerta        
	LEFT OUTER JOIN _Tablas.dbo.t_provincias p on pro_ccodigo = c.cue_cprovincia 
   
	--LEFT OUTER JOIN _Datos.dbo.p_gps gps ON gps_idcuenta = c.cue_iid 

	OUTER APPLY (
		SELECT TOP 1 * FROM _Datos.dbo.p_gps gps WHERE gps_idcuenta = c.cue_iid ORDER BY 1 DESC
	) AS gps

	LEFT OUTER JOIN _Datos.dbo.m_CuentasXtraInfo x ON x.cue_iidCuenta = c.cue_iid 
	LEFT OUTER JOIN _Tablas.dbo.t_codigos_alarma caxtra ON caxtra.cod_ccodigo = x.cue_cUltimaAlarmaRecibida          
	LEFT OUTER JOIN _Tablas.dbo.t_lineas lin ON lin_ccodigo = c.cue_clinea   
	LEFT JOIN _Datos.dbo.Organization org on lin.lin_iOrganizacion = org.Id
	LEFT OUTER JOIN _Tablas.dbo.t_tipos tip ON tip_ccodigo = c.cue_ctipo 

	OUTER APPLY (
			SELECT TOP 1 * FROM [_Datos]..[m_paneles] pan WHERE pan.pan_iidcuenta = c.cue_iid ORDER BY 1 DESC
		) AS pan

	OUTER APPLY (
			SELECT TOP 1 * FROM [_Datos]..[p_nivelsenal] nvs WHERE nvs.nvs_idCuenta = c.cue_iid ORDER BY nvs_tfechahora DESC
		) AS nvs

	LEFT JOIN [_Tablas]..[t_paneles] tpan ON tpan.pan_ccodigo = pan.pan_cgprs

	LEFT JOIN [_Datos].[dbo].[m_cuentas] madre ON madre.cue_iid = c.cue_nparticion
	LEFT JOIN _datos.dbo.m_reportes_automaticos ra ON ra.rep_iidcuenta = c.cue_iid
	--LEFT JOIN _Datos.dbo.DispositivoMovil dm ON dm.OwnerId = c.cue_iid

	-- Agregando el nombre del Instalador de la cuenta para reporte Informe de Cuentas
	-- Juan Bonforti / Nov 06 2017
	LEFT OUTER JOIN [_Tablas]..[t_instaladores] tinst ON tinst.ins_ccodigo = c.cue_cinstalador


'
   
 set @Sql = @Sql + ' INNER JOIN #Temp t ON t.Id = c.cue_iid          
 WHERE t.RowNumber BETWEEN (' + replace(@page, '''', '''''') + ' - 1) * ' + replace(@limit, '''', '''''') + ' + 1 AND (' + replace(@page, '''', '''''')+ ' * ' + replace(@limit, '''', '''''') + ')
 ORDER BY t.RowNumber ASC';


 print(CAST(@Sql  AS NText))
 exec(@Sql)
              
END