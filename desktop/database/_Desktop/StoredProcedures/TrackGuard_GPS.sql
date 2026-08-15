--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.263 
--#############################################################################

   
 CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_GPS]                      
 @page INT = 1,                     
 @start INT = 0,                     
 @limit INT = 50,                     
 @sort NVARCHAR(64) = '',                  
 @filter NVARCHAR(2048) = '',              
 @_dc NVARCHAR(256) = '',  
 @short NVARCHAR(256) = 'false',                 
 @totalrows INT = 1 OUTPUT       
AS                      
BEGIN                      
 SET NOCOUNT ON              
 SET DATEFORMAT ymd             
                 
 --Order                
 DECLARE @SortField NVARCHAR(64)                 
 DECLARE @SortDirection NVARCHAR(4)                
 SELECT @SortField = 'gps_iid', @SortDirection = 'DESC'                
                 
 IF @sort != ''                
 BEGIN                
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC                
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                         
 END                
                       
 --Temp                
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                      
                 
 DECLARE @Sql NVARCHAR(max)                
 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)                
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, gps_iid      
      FROM _Datos.dbo.p_Gps g        
	  LEFT JOIN _datos.dbo.m_cuentas AS c with (nolock) ON g.gps_idCuenta=c.cue_iid
	  left join _tablas..t_tipos as tip with (nolock) on c.cue_ctipo = tip_ccodigo
     WHERE 1 = 1 and gps_idCuenta !=0 and tip.tip_ncondicion in (1,2,3,4,5)'                                   

Print '------'
Print 'CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                      '

IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(max)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Red
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		
		--Set Filters
		IF @FilterProperty = 'gps_idcuenta'      		 
			SET @Sql = @Sql + ' AND gps_idcuenta IN (SELECT strval FROM dbo.ParseArray(''' + @FilterValue + ''','','')) '    
     		   
		ELSE IF @FilterProperty = 'gps_cIMEI'      		 
		 SET @Sql = @Sql + ' AND gps_cIMEI = ''' + @FilterValue + ''''    

		ELSE IF @FilterProperty = 'fechaDesde'      		 
		 SET @Sql = @Sql + ' AND gps_tfechahora >= convert(DATETIME,''' + @FilterValue + ''',120)'		 
		ELSE IF @FilterProperty = 'fechaHasta'      		 
		 SET @Sql = @Sql + ' AND gps_tfechahora <= ''' + @FilterValue + ''''
		ELSE IF @FilterProperty = 'fechaDesdeMayor'      		 
		 SET @Sql = @Sql + ' AND gps_tfechahora > convert(DATETIME,''' + @FilterValue + ''',120)'	
		 		 
		ELSE	
			SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''     

		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END    
         
      
 Print @sql
Print '------'
             
 EXEC(@Sql)                    
                     
 --Cantidad de registros                    
 SELECT @totalrows = MAX(RowNumber) FROM #Temp                    
                     
 --Paginacion          
if (@short = 'true')
BEGIN
	SELECT t.RowNumber, 
	g.*, REPLACE(CONVERT(VARCHAR, gps_tfechahora, 126),'1900-01-01T00:00:00', '') as gps_isofechahora,       
		REPLACE(CONVERT(VARCHAR, gps_tRawfechahora, 126),'1900-01-01T00:00:00', '') as gps_isorawfechahora, /*rxl_cLog,*/      
		case       
	   when gps_iRumbo between 0 and 22 then 'up'       
	   when gps_iRumbo between 23 and 67 then 'upright'      
	   when gps_iRumbo between 68 and 112 then 'right'      
	   when gps_iRumbo between 113 and 157 then 'downright'      
	   when gps_iRumbo between 158 and 202 then 'down'      
	   when gps_iRumbo between 203 and 247 then 'downleft'      
	   when gps_iRumbo between 248 and 292 then 'left'      
	   when gps_iRumbo between 293 and 337 then 'upleft'      
	   when gps_iRumbo between 338 and 360 then 'up'      
		 end as gps_Rumbo     
		 --,s.[sta_iidcuenta]      
		  --,s.[sta_nestado]      
		  --,s.[sta_cultimaalarma]
		  /*      
		  ,convert (NVARCHAR(128), s.[sta_cultimaalarma], 127) [sta_cultimaalarma]      
		  ,convert (NVARCHAR(128), s.[sta_dfechautimaalarma], 127) [sta_dfechautimaalarma]      
	 ,s.[sta_ncontadorfa]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimotst], 127) [sta_dfechaultimotst]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaprimerfa], 127) [sta_dfechaprimerfa]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimooc], 127) [sta_dfechaultimooc]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimo2dotst], 127) [sta_dfechaultimo2dotst]      
		  ,s.[sta_ncuentaenfallodetst]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimo3ertst], 127) [sta_dfechaultimo3ertst]      
		  ,s.[sta_ncuentaenfallo2dotst]      
		  ,s.[sta_ncuentaenfallo3ertst]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaOPNdesde], 127) [sta_dfechaOPNdesde]      
		  ,s.[sta_nEventoParaOPV]      
		      
		  */  
		  ,s.[sta_cUltimaAlerta]
		  ,convert (NVARCHAR(128), s.[sta_dFechaUltimaAlerta], 127) [sta_dFechaUltimaAlerta],      
		  a.cod_ccodigo,
		  a.cod_cSonido,
		  --a.cod_nColorLetra,
		  --a.cod_ncolor,
		  a.cod_nalerta,
		  a.cod_cdescripcion,
		  a.cod_idKey,
			c.cue_cLatLng,
			cx.cue_iEngineStatus,
			tip.*
		  --,a.*
		  --,f.* 
		  , convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (g.gps_tRawfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tRawfechahoraOffset
	  FROM _Datos.dbo.p_Gps g      
		LEFT JOIN _datos.dbo.m_cuentas AS c with (nolock) ON g.gps_idCuenta=c.cue_iid
		left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
		left join _tablas..t_tipos as tip with (nolock) on c.cue_ctipo = tip_ccodigo
		LEFT JOIN _datos.dbo.m_CuentasXtraInfo AS cx with (nolock) ON c.cue_iid=cx.cue_iidCuenta
		LEFT JOIN _datos.dbo.m_status s with (nolock) on (g.gps_idCuenta = s.sta_iidcuenta)      
		LEFT JOIN _Tablas.dbo.t_codigos_alarma a with (nolock) ON a.cod_ccodigo = s.sta_cUltimaAlerta      
		--left join [_Datos].dbo.[m_formatos] f on (f.for_calarma = a.cod_ccodigo)
		left JOIN #Temp t ON t.Id = gps_iid                
		--LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.gps_idRec      
	 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit) --and gps_idCuenta !=0                        
	 ORDER BY t.RowNumber ASC
END
else
BEGIN
	SELECT t.RowNumber, 
	g.*, REPLACE(CONVERT(VARCHAR, gps_tfechahora, 126),'1900-01-01T00:00:00', '') as gps_isofechahora,       
		REPLACE(CONVERT(VARCHAR, gps_tRawfechahora, 126),'1900-01-01T00:00:00', '') as gps_isorawfechahora, /*rxl_cLog,*/      
		case       
	   when gps_iRumbo between 0 and 22 then 'up'       
	   when gps_iRumbo between 23 and 67 then 'upright'      
	   when gps_iRumbo between 68 and 112 then 'right'      
	   when gps_iRumbo between 113 and 157 then 'downright'      
	   when gps_iRumbo between 158 and 202 then 'down'      
	   when gps_iRumbo between 203 and 247 then 'downleft'      
	   when gps_iRumbo between 248 and 292 then 'left'      
	   when gps_iRumbo between 293 and 337 then 'upleft'      
	   when gps_iRumbo between 338 and 360 then 'up'      
		 end as gps_Rumbo,      
		 s.[sta_iidcuenta]      
		  ,s.[sta_nestado]      
		  --,s.[sta_cultimaalarma]      
		  ,convert (NVARCHAR(128), s.[sta_cultimaalarma], 127) [sta_cultimaalarma]      
		  ,convert (NVARCHAR(128), s.[sta_dfechautimaalarma], 127) [sta_dfechautimaalarma]      
	 ,s.[sta_ncontadorfa]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimotst], 127) [sta_dfechaultimotst]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaprimerfa], 127) [sta_dfechaprimerfa]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimooc], 127) [sta_dfechaultimooc]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimo2dotst], 127) [sta_dfechaultimo2dotst]      
		  ,s.[sta_ncuentaenfallodetst]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaultimo3ertst], 127) [sta_dfechaultimo3ertst]      
		  ,s.[sta_ncuentaenfallo2dotst]      
		  ,s.[sta_ncuentaenfallo3ertst]      
		  ,convert (NVARCHAR(128), s.[sta_dfechaOPNdesde], 127) [sta_dfechaOPNdesde]      
		  ,s.[sta_nEventoParaOPV]      
		  ,s.[sta_cUltimaAlerta]      
		  ,convert (NVARCHAR(128), s.[sta_dFechaUltimaAlerta], 127) [sta_dFechaUltimaAlerta],      
		  a.cod_ccodigo,
		  a.cod_cSonido,
		  a.cod_nColorLetra,
		  a.cod_ncolor,
		  a.cod_nalerta,
		  a.cod_cdescripcion,
		  a.cod_idKey,
		  --a.*,
		  f.*,
			MP.*,
			c.cue_cLatLng,
			cx.cue_iEngineStatus 
		, convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (g.gps_tRawfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tRawfechahoraOffset
	  FROM _Datos.dbo.p_Gps g 
		LEFT JOIN _datos.dbo.m_cuentas AS c  with (nolock)  ON g.gps_idCuenta=c.cue_iid
		left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
		LEFT JOIN _datos.dbo.m_CuentasXtraInfo AS cx  with (nolock)  ON c.cue_iid=cx.cue_iidCuenta
		left join _tablas..t_tipos as tip with (nolock) on c.cue_ctipo = tip_ccodigo
		LEFT JOIN _datos.dbo.m_status s with (nolock)  on (g.gps_idCuenta = s.sta_iidcuenta)      
		LEFT JOIN _Tablas.dbo.t_codigos_alarma a with (nolock)  ON a.cod_ccodigo = s.sta_cUltimaAlerta   
		LEFT JOIN _Tablas.dbo.t_MovilesPatrulla AS MP  with (nolock) ON g.gps_idCuenta=MP.tmp_icuenta 
		left join [_Datos].dbo.[m_formatos] f  with (nolock) on (f.for_calarma = a.cod_ccodigo)
		left JOIN #Temp t ON t.Id = gps_iid                
		--LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.gps_idRec      
	 WHERE 
	 t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit) --and gps_idCuenta !=0                        
	 ORDER BY t.RowNumber ASC 
END

          
               
                    
END