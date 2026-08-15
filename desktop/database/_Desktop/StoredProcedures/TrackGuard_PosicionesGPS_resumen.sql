--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.720 
--#############################################################################

  
CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_PosicionesGPS_resumen]                  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',          
 @_dc NVARCHAR(256) = '',  
 @detenidoLimit int = 0,
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
             
 DECLARE @Sql NVARCHAR(MAX)  
 DECLARE @where NVARCHAR(MAX) = ''                   
         
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
   SET @where = @where + ' AND g.gps_idCuenta = ' + @FilterValue  
    END          
  ELSE IF @FilterProperty = 'fechaDesde'        
    BEGIN        
   SET @where = @where + ' AND g.gps_tRawfechahora >= ''' + @FilterValue + ''''  
    END              
  ELSE IF @FilterProperty = 'fechaHasta'        
    BEGIN        
   SET @where = @where + ' AND g.gps_tRawfechahora <= ''' + @FilterValue + ''''  
    END     
  ELSE IF @FilterProperty = 'alarmas'        
    BEGIN        
   SET @where = @where + ' AND g.rec_calarma IN (' + @FilterValue + ')'  
    END            
  ELSE IF @FilterProperty = 'rec_iid:gt'        
    BEGIN        
   SET @where = @where + ' AND g.rec_iid > ''' + @FilterValue + ''''  
    END            
  ELSE  
   SET @where = @where + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''              
    
  --Next  
  SET @Index = @Index + 1  
 END  
   
 DROP TABLE #Filters  
END                         


-- calculo el tiempo detenido
declare @totalDetenido int = 0;
EXEC	_Desktop.[dbo].[TrackGuard_TiempoDetenido_total]
		@filter = @filter,
		@totalrows = @totalrows OUTPUT,
		@totalDetenido = @totalDetenido OUTPUT
 

 SET @Sql = '
 with temp as(
SELECT row_number() over(order by g.gps_trawfechahora) as row , 
	max(g.gps_idCuenta) as ggps_idCuenta,
	max(g.gps_cimei) as ggps_cimei,
	MAX(g.gps_tRawfechahora) as ggps_tRawfechahora,
	MAX(g.gps_rlongitud) as ggps_rlongitud,
	MAX(g.gps_rlatitud) as ggps_rlatitud,
	MAX(g.gps_iid) as ggps_iid,
	MAX(g.gps_ivelocidad) as ggps_ivelocidad,
	MAX(cast(g.gps_iOdometro as bigint)) as ggps_iOdometro
  FROM _Datos.dbo.p_PosicionesGps g (NOLOCK)
 WHERE 1 = 1 
	AND g.gps_rlongitud is not null
	AND g.gps_rlatitud is not null ' + @where + '
 group by g.gps_trawfechahora
)
 SELECT 
	TOP '+convert(varchar(10),@limit)+'
	count(*) as total
	,min(ggps_tRawfechahora) as horadesde
	--,min(FORMAT(ggps_tRawfechahora,''dd/MM/yyyy hh:mm:ss tt'')) as horadesde
	,min(ggps_iid) as primerid
	,max(ggps_tRawfechahora) as horahasta
	--,min(FORMAT(ggps_tRawfechahora,''dd/MM/yyyy hh:mm:ss tt'')) as horahasta
	,max(ggps_ivelocidad) as velocidadmax
	,min(ggps_ivelocidad) as velocidadmin
	,sum(
		case
			when g.row = 1 then 0
			else DATEDIFF( minute , g2.gps_tRawfechahora,ggps_tRawfechahora)
		end
	) as tiempototal
	,'+convert(varchar(10),@totalDetenido)+' as tiempodetenido
	,max(CONVERT(time, DATEADD(s, DATEDIFF(s,g2.gps_tRawfechahora,ggps_tRawfechahora), CAST(''00:00:00'' as datetime2)))) as prueba
	,avg(ggps_ivelocidad) as velocidadprom
	,sum(
		case
			when g.row = 1 then 0
			when ggps_iOdometro < g2.gps_iOdometro then 0
			else ggps_iOdometro - isnull(g2.gps_iOdometro, 0)
		end
	) as distanciaOdometro
	,ROUND(sum(
		case
			when (g.row = 1 or g2.gps_rlatitud is null or g2.gps_rlongitud is null)  then 0
			else geography::Point(g2.gps_rlatitud, g2.gps_rlongitud, 4326).STDistance(geography::Point(ggps_rlatitud, ggps_rlongitud, 4326))/1000
		end
	), 2) as distanciaPoints
  FROM temp g 
	outer apply(select top 1 t2.gps_iodometro, t2.gps_rlongitud, t2.gps_rlatitud, t2.gps_tRawfechahora
		from _Datos.dbo.p_PosicionesGps t2 WITH (NOLOCK)
		where t2.gps_trawfechahora < ggps_trawfechahora 
		and t2.gps_cimei = ggps_cimei
		and t2.gps_idCuenta = ggps_idcuenta 
		order by t2.gps_trawfechahora desc) as g2
 '        
 set @sql = @Sql + ' group by ggps_idCuenta'

 --PRINT(@where)  
 --Print '-----'
 --Print(@sql)              

 EXEC(@Sql)                             

END