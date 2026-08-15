--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.797 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.917 
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_ReporteGPS]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(64) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT              
AS                
BEGIN                
 SET NOCOUNT ON   
 set DATEFORMAT	ymd
           
 --Order          
 DECLARE @SortField NVARCHAR(64)           
 DECLARE @SortDirection NVARCHAR(4)          
 SELECT @SortField = 'gps_tRawfechahora', @SortDirection = 'ASC'          
           
 IF @sort != ''          
 BEGIN          
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                   
 END          
                 
 --Temp          
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                
           
 DECLARE @Sql NVARCHAR(2048)          
 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)          
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, g.gps_iid
      FROM _Datos.dbo.p_PosicionesGps g  
		   LEFT JOIN _Datos.dbo.p_recepcion r ON rec_iid = g.gps_idRec
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
            -- BC : 369971519, el buscador por gps_tfechaHora no corresponde, porque ese no filtra por FechaGPS
            SET @Sql = @Sql + ' AND gps_tRawfechahora >= ''' + @FilterValue + ''''
            --SET @Sql = @Sql + ' AND gps_tfechahora >= ''' + @FilterValue + ''''    
		  END         		 
		ELSE IF @FilterProperty = 'fechaHasta'      
		  BEGIN      
			-- BC : 369971519, el buscador por gps_tfechaHora no corresponde, porque ese no filtra por FechaGPS
            SET @Sql = @Sql + ' AND gps_tRawfechahora <= ''' + @FilterValue + ''''
            --SET @Sql = @Sql + ' AND gps_tfechahora <= ''' + @FilterValue + ''''
		  END   
		ELSE IF @FilterProperty = 'alarmas'      
		  BEGIN      
			SET @Sql = @Sql + ' AND rec_calarma IN (' + @FilterValue + ')'
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
 
SELECT RowNumber, g.*, 
	REPLACE(CONVERT(VARCHAR, gps_tfechahora, 126),'1900-01-01T00:00:00', '') as gps_isofechahora, 
	/*REPLACE(CONVERT(VARCHAR, */gps_tRawfechahora/*, 126),'1900-01-01T00:00:00', '')*/ as gps_isorawfechahora, 
	/*rxl_cLog,*/ r.*, 
	cod.*,
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
into #output 
FROM _Datos.dbo.p_PosicionesGps g
    INNER JOIN #Temp t ON t.Id = gps_iid  
    --LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.gps_idRec        
    LEFT JOIN _Datos.dbo.p_recepcion r ON rec_iid = g.gps_idRec
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod ON cod_ccodigo = r.rec_calarma	   
WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)                     
ORDER BY t.RowNumber ASC
  
select 
    RowNumber Numero,
    gps_tfechahora FechaHoraRecepcion,
    gps_isorawfechahora FechaHoraGps,
    gps_rLatitud Latitud,
    gps_rLongitud Longitud,
    gps_iVelocidad Velocidad,
    cod_ccodigo Codigo,
    cod_cdescripcion Descripcion,
    gps_cDireccion Direccion,
	cod_nColorLetra,
	cod_ncolor
from #output
              
END