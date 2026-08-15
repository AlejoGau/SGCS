--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.100 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_PosicionesGPS_Hist]                  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',          
 @_dc NVARCHAR(256) = '',   
 @totalrows INT = 1 OUTPUT,
 @Tabla NVARCHAR(256) = ''
 /*@top int = 500*/
AS                  
BEGIN                  
 SET NOCOUNT ON     
 set DATEFORMAT ymd  

 IF @tabla=''
	BEGIN 
		SELECT @tabla = 'p_Posiciones'+SUBSTRING(REPLACE(CONVERT(VARCHAR,GETDATE(),102),'.',''),1,6)          
	END

             
 --Order            
 DECLARE @SortField NVARCHAR(64)             
 DECLARE @SortDirection NVARCHAR(4)            
 SELECT @SortField = 'pos_tRawfechahora', @SortDirection = 'ASC'            
 --SELECT @SortField = 'rec_iid', @SortDirection = 'ASC'      
 -- se cambio el orden a rawfechahora por la grafica del historico de posiciones        
             
 DECLARE @tabla_hist_recepcion NVARCHAR(256)
 
 SELECT @tabla_hist_recepcion='p_recepcion'+replace(@tabla,'p_Posiciones','')

 IF @sort != ''            
 BEGIN            
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC            
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                     
 END            
                   
 --Temp            
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                  
             
 DECLARE @Sql NVARCHAR(2048)   
 DECLARE @SqlPag NVARCHAR(max)

 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)            
    SELECT TOP ' + convert(varchar, @limit) + ' ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, g.pos_idKey  
     FROM _History..'+@Tabla+' g
		LEFT JOIN _Datos.dbo.'+@tabla_hist_recepcion+' r  WITH (NOLOCK) ON rec_iid = g.pos_idRec  
		LEFT JOIN  _Datos.dbo.p_posicionesSP sp WITH (NOLOCK) ON rec_iid = sp.sp_reciid
     WHERE 1 = 1 '                               
         
--Filters  
IF @filter != ''            
 BEGIN       
 SET @filter = replace(@filter,'gps_idRec','pos_idRec')
 SET @filter = replace(@filter,'gps_cIMEI','pos_cIMEI')
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
  IF @FilterProperty = 'pos_idCuenta'        
    BEGIN        
   SET @Sql = @Sql + ' AND pos_idCuenta = ' + @FilterValue  
    END          
  ELSE IF @FilterProperty = 'fechaDesde'        
    BEGIN        
        SET @Sql = @Sql + ' AND pos_tRawfechahora >= ''' + @FilterValue + ''''
    END              
  ELSE IF @FilterProperty = 'fechaHasta'        
    BEGIN        
        SET @Sql = @Sql + ' AND pos_tRawfechahora <= ''' + @FilterValue + ''''
    END     
  ELSE IF @FilterProperty = 'alarmas'        
    BEGIN        
   SET @Sql = @Sql + ' AND rec_calarma IN (' + @FilterValue + ')'  
    END            
  ELSE IF @FilterProperty = 'rec_iid:gt'        
    BEGIN        
   SET @Sql = @Sql + ' AND pos_idRec > ''' + @FilterValue + ''''  
    END            
  ELSE  
   SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''              
    
  --Next  
  SET @Index = @Index + 1  
 END  
   
 DROP TABLE #Filters  
END                         
  
 --print ('------------------------')
 --Print 'CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)'
 --PRINT(@Sql)                
 EXEC(@Sql)                
 --print ('------------------------')                 
 --Cantidad de registros                
 SELECT @totalrows = MAX(RowNumber) FROM #Temp                
                 
 --Paginacion  
 SET @SqlPag = '
	SELECT RowNumber, g.pos_tfechahora AS gps_tfechahora, 
	g.pos_idRec AS gps_idRec,  
	g.pos_rLatitud AS gps_rLatitud, 
	g.pos_rLongitud AS gps_rLongitud, 
	g.pos_iVelocidad AS gps_iVelocidad, 
	g.pos_iOdometro AS pgs_iOdometro, 
	g.pos_iRumbo AS gps_iRumbo, 
	g.pos_cDireccion AS gps_cDireccion, 
	g.pos_tRawfechahora AS gps_tRawfechahora,
	g.pos_iNivelSenial AS gps_iNivelSenial,
	g.pos_iSatelites AS gps_iSatelites,
	g.pos_cIMEI as gps_cIMEI,
	g.pos_idKey AS gps_iid,
	g.[pos_rAccuracy] As [gps_rAccuracy],
	CASE WHEN g.pos_iBattery > 0 THEN g.pos_iBattery ELSE (g.pos_iExtBattery/100) END  AS gps_iBattery,
	REPLACE(CONVERT(VARCHAR, g.pos_tfechahora, 126),''1900-01-01T00:00:00'', '''')  AS gps_isofechahora,
	REPLACE(CONVERT(VARCHAR, g.pos_tRawfechahora, 126),''1900-01-01T00:00:00'', '''') as gps_isorawfechahora,  r.*, cod.*,  
    case   
	   when g.pos_iRumbo between 0 and 22 then ''up''   
	   when g.pos_iRumbo between 23 and 67 then ''upright''  
	   when g.pos_iRumbo between 68 and 112 then ''right''  
	   when g.pos_iRumbo between 113 and 157 then ''downright''  
	   when g.pos_iRumbo between 158 and 202 then ''down''  
	   when g.pos_iRumbo between 203 and 247 then ''downleft''  
	   when g.pos_iRumbo between 248 and 292 then ''left''  
	   when g.pos_iRumbo between 293 and 337 then ''upleft''  
	   when g.pos_iRumbo between 338 and 360 then ''up''  
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
	,[rxt_cimei]
	,[cue_iid]
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
  ,convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (g.pos_tRawfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tRawfechahoraOffset
  FROM _History..'+@Tabla+' g  WITH (NOLOCK) 

    INNER JOIN #Temp t ON t.Id = g.pos_idkey    
    LEFT JOIN _Datos.dbo.'+@tabla_hist_recepcion +' r WITH (NOLOCK) ON rec_iid = g.pos_idRec  
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod WITH (NOLOCK) ON cod_ccodigo = r.rec_calarma
    LEFT JOIN _Datos.dbo.p_RXtraInfo rx WITH (NOLOCK) ON rxt_iRecId = g.pos_idRec
    LEFT JOIN _Datos.dbo.m_cuentas c WITH (NOLOCK) ON c.cue_iid = g.pos_idCuenta
	left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
 WHERE t.RowNumber BETWEEN ('+convert(varchar,@page)+' - 1) * '+convert(varchar,@limit)+' + 1 AND ('+convert(varchar,@page)+' * '+convert(varchar,@limit)+')        
 ORDER BY t.RowNumber ASC'

 --print ('------------------------')
 --print (@SqlPag)

  EXEC(@SqlPag)                

END