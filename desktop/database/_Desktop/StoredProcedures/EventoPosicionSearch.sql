--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.100 
--#############################################################################



  
CREATE OR ALTER PROCEDURE [dbo].[EventoPosicionSearch]                  
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
/* SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)            
    SELECT TOP ' + convert(varchar, @limit) + ' ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, r.gps_iid  
   
			FROM _Datos.dbo.p_recepcion  g WITH (NOLOCK) 
		  LEFT JOIN  _Datos.dbo.p_PosicionesGps r WITH (NOLOCK) ON rec_iid = r.gps_idRec  
			LEFT JOIN  _Datos.dbo.p_posicionesSP sp WITH (NOLOCK) ON rec_iid = sp.sp_reciid
     WHERE 1 = 1 '                               
  */       
  -- DEDALO 04/09/2019 saco paginación en TEMP porque tarda mucho, se verifica qe solo se usa en monitoreo de a 1 filtrado.
  select @sql ='SELECT g.[gps_iid]
      ,g.[gps_tfechahora]
      ,g.[gps_idCuenta]
      ,g.[gps_idRec]
      ,g.[gps_rLatitud]
      ,g.[gps_rLongitud]
      ,g.[gps_iRumbo]
      ,g.[gps_tRawfechahora]
      ,g.[gps_iVelocidad]
      ,g.[gps_iOdometro]
      ,g.[gps_cDireccion]
      ,g.[gps_cIMEI]
      ,g.[gps_rAccuracy]
      ,g.[gps_cMethod]
      ,g.[gps_iBattery]
      ,g.[gps_iNivelSenial]
      ,g.[gps_iSatelites]
      ,g.[gps_iExtBattery]
		, REPLACE(CONVERT(VARCHAR, gps_tfechahora, 126),''1900-01-01T00:00:00'', '''') as gps_isofechahora, REPLACE(CONVERT(VARCHAR, gps_tRawfechahora, 126),''1900-01-01T00:00:00'', '''') as gps_isorawfechahora, /*rxl_cLog,*/ r.*, cod.*,  
    case   
   when gps_iRumbo between 0 and 22 then ''up''   
   when gps_iRumbo between 23 and 67 then ''upright''  
   when gps_iRumbo between 68 and 112 then ''right''  
   when gps_iRumbo between 113 and 157 then ''downright''  
   when gps_iRumbo between 158 and 202 then ''down''  
   when gps_iRumbo between 203 and 247 then ''downleft''  
   when gps_iRumbo between 248 and 292 then ''left''  
   when gps_iRumbo between 293 and 337 then ''upleft''  
   when gps_iRumbo between 338 and 360 then ''up''  
     end as gps_Rumbo,
  rx.*,
  c.*
  FROM _Datos.dbo.p_PosicionesGps g WITH (NOLOCK) 
    --INNER JOIN #Temp t ON t.Id = gps_iid    
    --LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.gps_idRec          
    LEFT JOIN _Datos.dbo.p_recepcion r WITH (NOLOCK) ON rec_iid = g.gps_idRec  
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod WITH (NOLOCK) ON cod_ccodigo = r.rec_calarma 
    LEFT JOIN _Datos.dbo.p_RXtraInfo rx WITH (NOLOCK) ON rxt_iRecId = g.gps_idRec
    LEFT JOIN _Datos.dbo.m_cuentas c WITH (NOLOCK) ON c.cue_iid = g.gps_idCuenta
	where 1= 1 '
--Filters  
IF @filter != ''            
 BEGIN          
 SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')         
 Print '@filter: '+@filter  
 DECLARE @FilterProperty NVARCHAR(32)  
 DECLARE @FilterValue NVARCHAR(64)  
 


 DECLARE @Index INT  
 SET @Index = 1  
 WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)  
 BEGIN    
  --Read  
  SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'  
  SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'      
  Print '@FilterProperty: '+@FilterProperty  
  --Set Filters  
  IF @FilterProperty = 'gps_idRec'
	BEGIN
		SET @Sql = @Sql + ' AND gps_idRec = ' + @FilterValue
	END
  ELSE IF @FilterProperty = 'gps_idCuenta'        
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
  
 PRINT(cast(@sql as ntext))                
 EXEC(@Sql)                
  /*               
 --Cantidad de registros                
 SELECT @totalrows = MAX(RowNumber) FROM #Temp                
                 
 --Paginacion                
SELECT RowNumber, g.*, REPLACE(CONVERT(VARCHAR, gps_tfechahora, 126),'1900-01-01T00:00:00', '') as gps_isofechahora, REPLACE(CONVERT(VARCHAR, gps_tRawfechahora, 126),'1900-01-01T00:00:00', '') as gps_isorawfechahora, /*rxl_cLog,*/ r.*, cod.*,  
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
  rx.*,
  c.*
  FROM _Datos.dbo.p_PosicionesGps g WITH (NOLOCK) 
    INNER JOIN #Temp t ON t.Id = gps_iid    
    --LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.gps_idRec          
    LEFT JOIN _Datos.dbo.p_recepcion r WITH (NOLOCK) ON rec_iid = g.gps_idRec  
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod WITH (NOLOCK) ON cod_ccodigo = r.rec_calarma 
    LEFT JOIN _Datos.dbo.p_RXtraInfo rx WITH (NOLOCK) ON rxt_iRecId = g.gps_idRec
    LEFT JOIN _Datos.dbo.m_cuentas c WITH (NOLOCK) ON c.cue_iid = g.gps_idCuenta
 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)                       
 ORDER BY t.RowNumber ASC            
       */         
END