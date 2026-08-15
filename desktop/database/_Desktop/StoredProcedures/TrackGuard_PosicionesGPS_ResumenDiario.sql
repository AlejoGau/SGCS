--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.720 
--#############################################################################
  
CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_PosicionesGPS_ResumenDiario]                  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',          
 @_dc NVARCHAR(256) = '',  
 @token VARCHAR(256) = '',
 @detenidoLimit int = 2,

 @cue_clinea NVARCHAR(3) = '',
 @cue_clineaHasta NVARCHAR(3) = '',
 @cue_ncuentaDesde NVARCHAR(4) = '',
 @cue_ncuentaHasta NVARCHAR(4) = '',

 @totalrows INT = 1 OUTPUT
 
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
 
  --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT

         
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
    ELSE  
    SET @where = @where + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''              
        
    --Next  
    SET @Index = @Index + 1  
    END  
    
    DROP TABLE #Filters  
 END


 -- BC 412253681 - Se agregan los input de busqueda de CuentaDesde, Hasta.
 IF @cue_clinea != '' AND @cue_clineaHasta = '' 
 SET @where = @where + ' AND o.cue_clinea = ''' + @cue_clinea + ''''                

 IF @cue_clinea != '' AND @cue_clineaHasta != '' 
 SET @where = @where + ' AND o.cue_clinea >= ''' + @cue_clinea + '''  AND o.cue_clinea <= ''' + @cue_clineaHasta + ''' '

 IF @cue_ncuentaDesde != ''  
 SET @where = @where + ' AND o.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''

 IF @cue_ncuentaHasta != ''  
 SET @where = @where + ' AND o.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''

 
 SET @Sql = 'with temp as(
SELECT row_number() over(order by g.gps_trawfechahora) as row , 
	MAX(g.gps_idCuenta) as ggps_idCuenta,
	MAX(o.cue_clinea) as cue_clinea,
	MAX(o.cue_ncuenta) as cue_ncuenta,
	MAX(o.cue_cnombre) as cue_cnombre,
	MAX(g.gps_cimei) as ggps_cimei,
	MAX(v.Domain) as vDomain,
	--MAX(convert(varchar, g.gps_tRawfechahora, 112)) as ggps_tRawfechahora,
	MAX(g.gps_tRawfechahora) as ggps_tRawfechahora,
	MAX(g.gps_rlongitud) as ggps_rlongitud,
	MAX(g.gps_rlatitud) as ggps_rlatitud,
	MAX(g.gps_iid) as ggps_iid,
	MAX(g.gps_ivelocidad) as ggps_ivelocidad,
	MAX(cast(g.gps_iOdometro as bigint)) as ggps_iOdometro
  FROM _Datos.dbo.p_PosicionesGps g (NOLOCK)
	LEFT JOIN _Datos.dbo.m_cuentas o ON ( o.cue_iid = g.gps_idCuenta AND g.gps_cimei = o.cue_cimei )
    inner JOIN _Datos.dbo.DispositivoMovil v ON ( v.OwnerId = o.cue_iid )
 WHERE 1 = 1 
	AND g.gps_rlongitud is not null
	AND g.gps_rlatitud is not null ' + @where + @SqlFilterRango +'
 group by g.gps_trawfechahora, o.cue_iid
)
 SELECT 
	TOP '+convert(varchar(10), @limit)+'
	count(*) as total
	,ggps_idCuenta
	,cue_clinea
	,cue_ncuenta
	,cue_cnombre
	,vDomain
	,MAX(convert(varchar, CONVERT(date, ggps_tRawfechahora), 103)) as fecha
	,MAX(ggps_ivelocidad) as velocidadmax
	,AVG(ggps_ivelocidad) as velocidadprom
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
 set @sql = @Sql + '
	group by ggps_idCuenta, convert(varchar, ggps_tRawfechahora, 112), cue_clinea, cue_ncuenta, cue_cnombre, vDomain
	ORDER BY convert(varchar, ggps_tRawfechahora, 112) DESC'

/*
 PRINT(@where)  
 print(@sql)
*/
 EXEC(@Sql)                             

END