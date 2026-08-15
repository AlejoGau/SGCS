--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.783 
--#############################################################################
  
CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_PosicionesGPS_resumen_hist]                  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',
 @_dc NVARCHAR(256) = '',  
 @detenidoLimit int = 0,
 @totalrows INT = 1 OUTPUT,
 @tabla NVARCHAR(256) = ''
 /*@top int = 500*/
AS                  
BEGIN                  
 SET NOCOUNT ON     
 set DATEFORMAT ymd  
             

             
 DECLARE @tabla_hist_recepcion NVARCHAR(256)
 
 SELECT @tabla_hist_recepcion='p_recepcion'+replace(@tabla,'p_Posiciones','')

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
             
 IF @sort != ''            
 BEGIN            
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC            
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC                     
 END            
                   
 --Temp            
 CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                  
             
 DECLARE @Sql NVARCHAR(MAX)  
 DECLARE @where NVARCHAR(MAX) = ''                   
 DECLARE @grwhere NVARCHAR(MAX) = ''   
         
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
   SET @where = @where + ' AND g.pos_idCuenta = ' + @FilterValue  
   SET @grwhere = @grwhere + ' AND t2.pos_idCuenta = ' + @FilterValue  
    END          
  ELSE IF @FilterProperty = 'fechaDesde'        
    BEGIN        
   SET @where = @where + ' AND g.pos_tRawfechahora >= ''' + @FilterValue + ''''  
    END              
  ELSE IF @FilterProperty = 'fechaHasta'        
    BEGIN        
   SET @where = @where + ' AND g.pos_tRawfechahora <= ''' + @FilterValue + ''''  
    END     
  ELSE IF @FilterProperty = 'alarmas'        
    BEGIN        
   SET @where = @where + ' AND rec_calarma IN (''C02'')' --' AND rec_calarma IN (' + @FilterValue + ')'  
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
EXEC	_Desktop.[dbo].[TrackGuard_TiempoDetenido_total_Hist]
		@filter = @filter,
		@tabla = @tabla,
		@totalrows = @totalrows OUTPUT,
		@totalDetenido = @totalDetenido OUTPUT
 

 SET @Sql = '
 with temp as(
SELECT row_number() over(order by g.pos_trawfechahora) as row , 
	max(g.pos_idCuenta) as ggps_idCuenta,
	max(g.pos_cimei) as ggps_cimei,
	MAX(g.pos_tRawfechahora) as ggps_tRawfechahora,
	MAX(g.pos_rlongitud) as ggps_rlongitud,
	MAX(g.pos_rlatitud) as ggps_rlatitud,
	MAX(g.pos_idKey) as ggps_iid,
	MAX(g.pos_ivelocidad) as ggps_ivelocidad,
	MAX(cast(g.pos_iOdometro as bigint)) as ggps_iOdometro
  FROM _History.dbo.'+@tabla+' g (NOLOCK)
    LEFT JOIN _Datos.dbo.'+@tabla_hist_recepcion +' r WITH (NOLOCK) ON rec_iid = g.pos_idRec  
    LEFT JOIN _Tablas.dbo.t_codigos_alarma cod WITH (NOLOCK) ON cod_ccodigo = r.rec_calarma
 WHERE 1 = 1 
	AND g.pos_rlongitud is not null
	AND g.pos_rlatitud is not null ' + @where + '
 group by g.pos_trawfechahora
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
			else DATEDIFF( minute , g2.pos_tRawfechahora,ggps_tRawfechahora)
		end
	) as tiempototal
	,'+convert(varchar(10),@totalDetenido)+' as tiempodetenido
	,max(CONVERT(time, DATEADD(s, DATEDIFF(s,g2.pos_tRawfechahora,ggps_tRawfechahora), CAST(''00:00:00'' as datetime2)))) as prueba
	,avg(ggps_ivelocidad) as velocidadprom
	,(
		SELECT 	MAX(cast(g.pos_iOdometro as bigint)) - 	MIN(cast(g.pos_iOdometro as bigint))
		FROM _History.dbo.'+@tabla+' g (NOLOCK)
		WHERE 1 = 1 and g.pos_iOdometro!=0 
		' + @where + '
	) as distanciaOdometro
	,ROUND(sum(
		case
			when (g.row = 1 or g2.pos_rlatitud is null or g2.pos_rlongitud is null)  then 0
			else geography::Point(g2.pos_rlatitud, g2.pos_rlongitud, 4326).STDistance(geography::Point(ggps_rlatitud, ggps_rlongitud, 4326))/1000
		end
	), 2) as distanciaPoints
  FROM temp g 
	outer apply(select top 1 t2.pos_iodometro, t2.pos_rlongitud, t2.pos_rlatitud, t2.pos_tRawfechahora
		from _History.dbo.'+@tabla+' t2 WITH (NOLOCK)
		LEFT JOIN _Datos.dbo.'+@tabla_hist_recepcion +' r WITH (NOLOCK) ON rec_iid = pos_idRec  
		LEFT JOIN _Tablas.dbo.t_codigos_alarma cod WITH (NOLOCK) ON cod_ccodigo = r.rec_calarma

		where t2.pos_trawfechahora < ggps_trawfechahora 
		--and t2.pos_cimei = ggps_cimei
		--and t2.pos_idCuenta = ggps_idcuenta 
		' + @grwhere + ' 
		order by t2.pos_trawfechahora desc) as g2
 '        
 set @sql = @Sql + ' group by ggps_idCuenta'

 --PRINT(@where)  
/* 
*/
Print '*************************************'
print CAST(@sql AS NTEXT) 

EXEC(@Sql)                             

END