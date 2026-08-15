CREATE OR ALTER PROCEDURE [dbo].[SearchTG_MantenimientoVehiculo_Servicios]
    @page INT = 1,               
    @start INT = 0,               
    @limit INT = 50,               
    @sort VARCHAR(256) = '',   
    @group VARCHAR(256) = '',            
    @filter VARCHAR(2048) = '',        
    @_dc VARCHAR(256) = '',
    @token varchar(256),
@totalrows INT = 1 OUTPUT     
AS  
SET NOCOUNT ON   
 
--Sort
DECLARE @SqlSort AS VARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'ms.tgms_idkey ASC')
 
--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, '_Tablas..t_TG_mantenimiento_servicios', '[tgmh_idispositivomovil],[tgmh_dfecha]')
 
-- Obtengo los filtros de fechas desde el filter
IF @filter != ''        
    BEGIN
        SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)

        DECLARE @idispositivomovilTemp VARCHAR(255) = ''
        DECLARE @idispositivomovil VARCHAR(255) = ''
        DECLARE @fechaDesdeTemp VARCHAR(255) = ''
        DECLARE @fechaDesde VARCHAR(255) = ''
        
        -- Obtengo el id del vehículo por el cual consulto
        SELECT TOP 1 @idispositivomovilTemp = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'tgmh_idispositivomovil')
        SELECT TOP 1 @fechaDesdeTemp = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'tgmh_dfecha')

        -- Filtro por el coche que necesito
        IF @idispositivomovilTemp != ''
            BEGIN
                SET @idispositivomovil = ' AND mh.tgmh_idispositivomovil = '''+@idispositivomovilTemp+''''
            END
        -- Filtro por la fecha
        IF @fechaDesdeTemp != ''
            BEGIN
                SET @SqlFilter = @SqlFilter + ' AND tgmh_dfecha >= '''+@fechaDesdeTemp+''''
            END
        
        
    END


--Sql
DECLARE @Sql NVARCHAR(MAX)
SET @Sql = '
    FROM _Tablas..t_TG_mantenimiento_servicios ms
        OUTER APPLY (
            SELECT TOP 1 
                mh.* 
            FROM _Datos..TG_mantenimiento_historico mh
                LEFT JOIN _Datos..DispositivoMovil dm ON (dm.OwnerId = mh.tgmh_idispositivomovil)
            WHERE mh.tgmh_idservicio = ms.tgms_idkey '+@idispositivomovil+' 
            ORDER BY mh.tgmh_dfecha DESC
        ) rechistorico
        OUTER APPLY (
            SELECT TOP 1 Odometer
            FROM  _Datos..DispositivoMovil
            WHERE OwnerId = '+@idispositivomovilTemp+'
        ) dispositivoMovil 
    WHERE 1 = 1 ' + @SqlFilter

print @Sql
 
--Total Rows
DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

--Execute Sql (ReturnRows)
DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
SET @DynamicSqlReturnRows = 'SELECT * 
                    FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, *
                    ' + @Sql + ') AS T
                    WHERE RowNumber BETWEEN @from AND @to '
                            
DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
                
DECLARE @from INT
DECLARE @to INT
SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
                
EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to