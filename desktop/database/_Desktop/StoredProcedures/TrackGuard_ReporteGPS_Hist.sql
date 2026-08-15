--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.797 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.917 
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_ReporteGPS_Hist]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(64) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '', 
 @tabla NVARCHAR(256) = '',
 @totalrows INT = 1 OUTPUT              
AS                
BEGIN                
 SET NOCOUNT ON   
 set DATEFORMAT	ymd

 IF @tabla=''
	BEGIN 
		SELECT @tabla = 'p_Posiciones'+SUBSTRING(REPLACE(CONVERT(VARCHAR,GETDATE(),102),'.',''),1,6)          
	END

 --Order          
 DECLARE @SortField NVARCHAR(64)           
 DECLARE @SortDirection NVARCHAR(4)          
 SELECT @SortField = 'pos_tRawfechahora', @SortDirection = 'ASC'          

 DECLARE @tabla_hist_recepcion NVARCHAR(256)
 
 SELECT @tabla_hist_recepcion='p_recepcion'+replace(@tabla,'p_Posiciones','')
 Print 'TABLA RECEPCION: '+@tabla_hist_recepcion           
 IF @sort != ''          
 BEGIN          
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                   
 END          
                 
 --Temp          
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                
           
 DECLARE @Sql NVARCHAR(2048)          
 SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)          
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, g.pos_idKey
      FROM _History.dbo.'+@tabla+' g  
		   LEFT JOIN _Datos.dbo.'+@tabla_hist_recepcion+' r ON rec_iid = g.pos_idRec
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
		IF @FilterProperty = 'pos_idCuenta'      
		  BEGIN      
			SET @Sql = @Sql + ' AND pos_idCuenta = ' + @FilterValue
		  END      		
		ELSE IF @FilterProperty = 'fechaDesde'      
		  BEGIN
            -- BC : 369971519, el buscador por pos_tfechaHora no corresponde, porque ese no filtra por Fechapos
            SET @Sql = @Sql + ' AND pos_tRawfechahora >= ''' + @FilterValue + ''''
            --SET @Sql = @Sql + ' AND pos_tfechahora >= ''' + @FilterValue + ''''    
		  END         		 
		ELSE IF @FilterProperty = 'fechaHasta'      
		  BEGIN      
			-- BC : 369971519, el buscador por pos_tfechaHora no corresponde, porque ese no filtra por Fechapos
            SET @Sql = @Sql + ' AND pos_tRawfechahora <= ''' + @FilterValue + ''''
            --SET @Sql = @Sql + ' AND pos_tfechahora <= ''' + @FilterValue + ''''
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
 -- workaround para crear #output
 /*
 SELECT  RowNumber, g.*, 
	REPLACE(CONVERT(VARCHAR, pos_tfechahora, 126),'1900-01-01T00:00:00', '') as pos_isofechahora, 
	pos_tRawfechahora as pos_isorawfechahora, 
	 r.*, 
	cod.*
	,
	   case 
			when pos_iRumbo between 0 and 22 then 'up' 
			when pos_iRumbo between 23 and 67 then 'upright'
			when pos_iRumbo between 68 and 112 then 'right'
			when pos_iRumbo between 113 and 157 then 'downright'
			when pos_iRumbo between 158 and 202 then 'down'
			when pos_iRumbo between 203 and 247 then 'downleft'
			when pos_iRumbo between 248 and 292 then 'left'
			when pos_iRumbo between 293 and 337 then 'upleft'
			when pos_iRumbo between 338 and 360 then 'up'
	    end as pos_Rumbo
into #output 
FROM _History.dbo.p_Posiciones202109 g
    INNER JOIN #Temp t ON t.Id = pos_idKey  
    --LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.pos_idRec        
    LEFT JOIN _Datos.dbo.p_recepcion r ON rec_iid = g.pos_idRec
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod ON cod_ccodigo = r.rec_calarma	   
WHERE t.RowNumber BETWEEN @page - 1 * @limit+ 1 AND @page * @limit
and 1=0
ORDER BY t.RowNumber ASC
*/


DECLARE @SqlPag NVARCHAR(max) 
SET @SqlPag =' 

SELECT  RowNumber,
	g.pos_idKey as gps_iid,g.pos_tfechahora,g.pos_idCuenta,g.pos_idRec,g.pos_rLatitud
	,g.pos_rLongitud,g.pos_iRumbo,g.pos_tRawfechahora,g.pos_iVelocidad,g.pos_iOdometro
	,g.pos_cDireccion,g.pos_cIMEI,g.pos_rAccuracy,g.pos_cMethod,g.pos_iBattery
	,g.pos_iExtBattery,g.pos_iNivelSenial,g.pos_iSatelites,g.pos_iSecuencia,g.pos_gGeography	
	,REPLACE(CONVERT(VARCHAR, pos_tfechahora, 126),''1900-01-01T00:00:00'', '''') as pos_isofechahora, 
	/*REPLACE(CONVERT(VARCHAR, */pos_tRawfechahora/*, 126),''1900-01-01T00:00:00'', '''')*/ as pos_isorawfechahora, 
	/*rxl_cLog,*/ r.*, 
	cod.*
	,
	   case 
			when pos_iRumbo between 0 and 22 then ''up'' 
			when pos_iRumbo between 23 and 67 then ''upright''
			when pos_iRumbo between 68 and 112 then ''right''
			when pos_iRumbo between 113 and 157 then ''downright''
			when pos_iRumbo between 158 and 202 then ''down''
			when pos_iRumbo between 203 and 247 then ''downleft''
			when pos_iRumbo between 248 and 292 then ''left''
			when pos_iRumbo between 293 and 337 then ''upleft''
			when pos_iRumbo between 338 and 360 then ''up''
	    end as gps_Rumbo
into ##output 
FROM _History.dbo.'+@tabla+' g
    INNER JOIN #Temp t ON t.Id = pos_idKey  
    --LEFT JOIN _Datos.dbo.p_RXLog ON rxl_iRecId = g.pos_idRec        
    LEFT JOIN _Datos.dbo.'+@tabla_hist_recepcion+' r ON rec_iid = g.pos_idRec
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod ON cod_ccodigo = r.rec_calarma	   
WHERE t.RowNumber BETWEEN ('+CONVERT(VARCHAR,@page)+' - 1) * '+CONVERT(VARCHAR,@limit)+' + 1 AND ('+CONVERT(VARCHAR,@page)+' * '+CONVERT(VARCHAR,@limit)+')                     
ORDER BY t.RowNumber ASC'

print '***************************************************'  
--print @SqlPag

--EXEC(@SqlPag)
exec sp_executesql @SqlPag

SET @SqlPag = '
	select
    RowNumber Numero,
    pos_tfechahora FechaHoraRecepcion,
    pos_isorawfechahora FechaHoraGps,
    pos_rLatitud Latitud,
    pos_rLongitud Longitud,
    pos_iVelocidad Velocidad,
    cod_ccodigo Codigo,
    cod_cdescripcion Descripcion,
    pos_cDireccion Direccion,
	cod_nColorLetra,
	cod_ncolor
from ##output order by RowNumber'

exec sp_executesql @SqlPag
           
drop table ##output;
END