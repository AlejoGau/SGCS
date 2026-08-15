--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.100 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_PosicionesGPS]                  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',          
 @_dc NVARCHAR(256) = '',   
 @totalrows INT = 1 OUTPUT
 /*@top int = 500*/
AS                  
BEGIN                  
 SET NOCOUNT ON     
 set DATEFORMAT ymd  
             
 --Order            
 DECLARE @SortField NVARCHAR(64)             
 DECLARE @SortDirection NVARCHAR(4)            
 SELECT @SortField = 'gps_tRawfechahora', @SortDirection = 'ASC'            
 --SELECT @SortField = 'rec_iid', @SortDirection = 'ASC'      
 -- se cambio el orden a rawfechahora por la grafica del historico de posiciones        
             
 IF @sort != ''            
 BEGIN            
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC            
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                     
 END            
                   
 --Temp            
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                  
             
 DECLARE @Sql NVARCHAR(2048)            
 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)            
    SELECT TOP ' + convert(varchar, @limit) + ' ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, g.gps_iid  
     FROM _Datos.dbo.p_PosicionesGps g
		LEFT JOIN _Datos.dbo.p_recepcion r  WITH (NOLOCK) ON rec_iid = g.gps_idRec  
		LEFT JOIN  _Datos.dbo.p_posicionesSP sp WITH (NOLOCK) ON rec_iid = sp.sp_reciid
     WHERE 1 = 1 '                               
         
--Filters  
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
    
  --Set Filters  
  IF @FilterProperty = 'gps_idCuenta'        
    BEGIN        
   SET @Sql = @Sql + ' AND gps_idCuenta = ' + @FilterValue  
    END          
  ELSE IF @FilterProperty = 'fechaDesde'        
    BEGIN        
        SET @Sql = @Sql + ' AND gps_tRawfechahora >= ''' + @FilterValue + ''''
    END              
  ELSE IF @FilterProperty = 'fechaHasta'        
    BEGIN        
        SET @Sql = @Sql + ' AND gps_tRawfechahora <= ''' + @FilterValue + ''''
    END     
  ELSE IF @FilterProperty = 'alarmas'        
    BEGIN        
   SET @Sql = @Sql + ' AND rec_calarma IN (' + @FilterValue + ')'  
    END            
  ELSE IF @FilterProperty = 'rec_iid:gt'        
    BEGIN        
   SET @Sql = @Sql + ' AND rec_iid > ''' + @FilterValue + ''''  
    END            
  ELSE  
   SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''              
    
  --Next  
  SET @Index = @Index + 1  
 END  
   
 DROP TABLE #Filters  
END                         
  
 PRINT(@Sql)                
 EXEC(@Sql)                
                 
 --Cantidad de registros                
 SELECT @totalrows = MAX(RowNumber) FROM #Temp                
                 
 --Paginacion                
SELECT RowNumber, g.gps_tfechahora, 
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
	CASE WHEN g.gps_iBattery > 0 THEN g.gps_iBattery ELSE (g.gps_iExtBattery/100) END AS gps_iBattery,
	REPLACE(CONVERT(VARCHAR, g.gps_tfechahora, 126),'1900-01-01T00:00:00', '') as gps_isofechahora,
	REPLACE(CONVERT(VARCHAR, g.gps_tRawfechahora, 126),'1900-01-01T00:00:00', '') as gps_isorawfechahora, /*rxl_cLog,*/ r.*, cod.*,  
    case   
	   when g.gps_iRumbo between 0 and 22 then 'up'   
	   when g.gps_iRumbo between 23 and 67 then 'upright'  
	   when g.gps_iRumbo between 68 and 112 then 'right'  
	   when g.gps_iRumbo between 113 and 157 then 'downright'  
	   when g.gps_iRumbo between 158 and 202 then 'down'  
	   when g.gps_iRumbo between 203 and 247 then 'downleft'  
	   when g.gps_iRumbo between 248 and 292 then 'left'  
	   when g.gps_iRumbo between 293 and 337 then 'upleft'  
	   when g.gps_iRumbo between 338 and 360 then 'up'  
     end as gps_Rumbo,
	 [rxt_iId]
	,[rxt_iRecId]
	,[rxt_nSPIP]
	,[rxt_nSPSMS]
	,[rxt_cEvento]
	,[rxt_iSecuencia]
	,[rxt_cGeoFenceName]
	,[rxt_cRoute]
	,[rxt_iRouteID]
	,[rxt_nVCIP]
	,[rxt_nVCSMS]
	,[rxt_cData]
	,[rxt_dFechaHoraProcesaEvento]
	,[rxt_iProceso]
	,[rxt_iConexion]
	,[rxt_cimei],
	[cue_iid]
    ,[cue_clinea]
    ,[cue_ncuenta]
    ,[cue_cnombre]
    ,[cue_ccalle]
    ,[cue_clocalidad]
    ,[cue_cprovincia]
    ,[cue_ccodigopostal]
    ,[cue_ccallecorreo]
    ,[cue_clocalidadcorreo]
    ,[cue_cprovinciacorreo]
    ,[cue_ccodigopostalcorreo]
    ,[cue_ctelefono]
    ,[cue_cclave]
    ,[cue_cpermiso]
    ,[cue_ctipo]
    ,[cue_cubicacion]
    ,[cue_nparticion]
    ,[cue_cobservacion]
    ,[cue_cfoto]
    ,[cue_dfechaalta]
    ,[cue_dservicio]
    ,[cue_nmostrar]
    ,[cue_nsonidoul]
    ,[cue_nllaveul]
    ,[cue_cemail]
    ,[cue_cinstalador]
    ,[cue_cIMEI]
    ,[cue_cLatLng]
    ,[cue_nEfectiva]
    ,[cue_cIdExtendido]
    ,[cue_iZonaHoraria]
    ,[cue_cPartitionInfo]
    ,[cue_nAutoMonitoreo]
    ,[cue_nPrioridad]
  ,convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (g.gps_tRawfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tRawfechahoraOffset
  --,CASE WHEN g.gps_iVelocidad = 0 and g2.gps_iVelocidad = 0 THEN datediff(second,g2.gps_tRawfechahora,g.gps_tRawfechahora) ELSE 0 END AS tiempoDetenido
  FROM _Datos.dbo.p_PosicionesGps g  WITH (NOLOCK) 
	/*
	outer apply(select top 1 t2.gps_iVelocidad, t2.gps_trawfechahora 
		from _Datos.dbo.p_PosicionesGps t2 WITH (NOLOCK)
		where t2.gps_trawfechahora < g.gps_trawfechahora 
		and t2.gps_cimei = g.gps_cimei
		and t2.gps_idCuenta = g.gps_idcuenta 
		order by t2.gps_trawfechahora desc) as g2
	*/
    INNER JOIN #Temp t ON t.Id = g.gps_iid    
    --LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.gps_idRec          
    LEFT JOIN _Datos.dbo.p_recepcion r WITH (NOLOCK) ON rec_iid = g.gps_idRec  
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod WITH (NOLOCK) ON cod_ccodigo = r.rec_calarma
    LEFT JOIN _Datos.dbo.p_RXtraInfo rx WITH (NOLOCK) ON rxt_iRecId = g.gps_idRec
    LEFT JOIN _Datos.dbo.m_cuentas c WITH (NOLOCK) ON c.cue_iid = g.gps_idCuenta
	left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)        
 ORDER BY t.RowNumber ASC
                
END