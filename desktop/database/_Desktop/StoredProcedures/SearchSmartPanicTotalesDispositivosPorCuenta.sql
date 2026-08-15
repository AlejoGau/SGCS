CREATE OR ALTER PROCEDURE [dbo].[SearchSmartPanicTotalesDispositivosPorCuenta]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',  
	 @estado INT = 0,   --0.Todos 1.Asignados 2.Sin Asignar    
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = ''

AS
	SET NOCOUNT ON

--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[SmartPanic]')
/*
print '--- Filtros aplicados ';
print @SqlFilter
print '---';
*/
--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

/*
print '--- Rangos';
print @SqlFilterRango
print '---';
*/

SET @SqlFilter = @SqlFilter + @SqlFilterRango

If @estado = 1 
	Set @SqlFilter += ' And sp.Imei != '''''
Else If @estado = 2 
	Set @SqlFilter += ' And sp.Imei = '''''
/*
print '--- Filtro Final';
print @SqlFilter
print '---';
*/

--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
select @Sql = ' SELECT
                   c.cue_clinea,c.cue_ncuenta,c.cue_cnombre,
                    count(*) as TotalDispositivos,
                    sum(case when sp.Linea IS NOT NULL AND sp.Imei != '''' then 1 else 0 end) AS TotalDispositivosAsignados,
                    sum(case when sp.Linea IS NOT NULL AND sp.Imei = '''' then 1 else 0 end) AS TotalDispositivosSinAsignar
                FROM [_Datos].[dbo].[SmartPanic] sp
                    LEFT JOIN [_Datos].[dbo].[m_cuentas] c ON ( sp.CuentaId = c.cue_iid )
                WHERE 1 = 1
                    AND sp.Linea IS NOT NULL
                    AND c.cue_cnombre IS NOT NULL
                    ' + @SqlFilter + ' 
                GROUP BY c.cue_clinea,c.cue_ncuenta,c.cue_cnombre
                ORDER BY c.cue_clinea,c.cue_ncuenta
	'
/*
print '--- @Sql';
print @sql
print '---';
*/
exec (@sql)