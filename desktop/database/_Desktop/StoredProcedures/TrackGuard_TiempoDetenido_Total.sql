CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_TiempoDetenido_Total]
@page INT = 1,
@start INT = 0,
@limit INT = 50,
@sort NVARCHAR(256) = '',
@group NVARCHAR(256) = '',
@token NVARCHAR(256) = '',
@filter NVARCHAR(2048) = '',
@_dc NVARCHAR(256) = '',
@detenidoLimit int = 2,
@totalrows INT = 1 OUTPUT,
@totalDetenido int = 0 OUTPUT
AS
SET NOCOUNT ON

declare @top int = 1000

if @limit =1
	select @top =1

--Sort
DECLARE @SqlSort AS NVARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[gps_iid] DESC')

--Filters
DECLARE @SqlFilter AS NVARCHAR(MAX) = ''
--SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_PosicionesGps')

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
   SET @SqlFilter = @SqlFilter + ' AND gps_idCuenta = ' + @FilterValue  
    END          
  ELSE IF @FilterProperty = 'fechaDesde'        
    BEGIN        
   SET @SqlFilter = @SqlFilter + ' AND gps_tRawfechahora >= ''' + @FilterValue + ''''  
    END              
  ELSE IF @FilterProperty = 'fechaHasta'        
    BEGIN        
   SET @SqlFilter = @SqlFilter + ' AND gps_tRawfechahora <= ''' + @FilterValue + ''''  
    END     
  ELSE IF @FilterProperty = 'alarmas'        
    BEGIN        
   SET @SqlFilter = @SqlFilter + ' AND rec_calarma IN (' + @FilterValue + ')'  
    END            
  ELSE IF @FilterProperty = 'rec_iid:gt'        
    BEGIN        
   SET @SqlFilter = @SqlFilter + ' AND rec_iid > ''' + @FilterValue + ''''  
    END            
  ELSE  
   SET @SqlFilter = @SqlFilter + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''              
    
  --Next  
  SET @Index = @Index + 1  
 END  
   
 DROP TABLE #Filters  
END       

print 'Filter'
print @SqlFilter

--Sql
DECLARE @Sql NVARCHAR(MAX)
SET @Sql = 'select gps_idcuenta, 
         gps_trawfechahora, 
		 gps_iVelocidad,
		 gps_rlatitud,
		 gps_rlongitud,
		 gps_cdireccion,
		 row_number() over(partition by gps_idcuenta order by gps_trawfechahora asc) - row_number() over(partition by gps_idcuenta, gps_iVelocidad order by gps_trawfechahora asc)  r
  from _datos..p_PosicionesGPS
  where 1 = 1 '+ @SqlFilter
 

DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)
SET @DynamicSqlReturnRows = '
	with cte as 
	(
	'+@sql+'
	),
	total as (
		select 
			gps_idcuenta
			, min(gps_trawfechahora) as min_fecha
			, max(gps_trawfechahora) as max_fecha
			, max(gps_rlatitud) as gps_rlatitud
			, max(gps_rlongitud) as gps_rlongitud
			, max(gps_cdireccion) as gps_cdireccion
 			, DATEDIFF(minute,  min(gps_trawfechahora), max(gps_trawfechahora)) as minutos
		from cte
		where gps_iVelocidad = 0 
		group by gps_idcuenta, r
		having DATEDIFF(minute,  min(gps_trawfechahora), max(gps_trawfechahora)) > @detenidoLimit
	)
	select @totalDetenido = sum(minutos) from total
	group by gps_idcuenta
	'
                              
DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                                        
SET @DynamicSqlReturnRowsParams = '@detenidoLimit int ,@from INT, @to INT,@totalDetenido int OUTPUT'    

print @DynamicSqlReturnRows
          
DECLARE @from INT
DECLARE @to INT
SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
                   
EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams,@detenidoLimit = @detenidoLimit, @from = @from, @to = @to,@totalDetenido=@totalDetenido OUTPUT
print @totalDetenido