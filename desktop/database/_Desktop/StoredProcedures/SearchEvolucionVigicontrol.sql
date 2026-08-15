CREATE OR ALTER PROCEDURE [dbo].[SearchEvolucionVigicontrol]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = ''
AS
SET NOCOUNT ON

/*
 * APLICANDO FILTROS y RANGOS
 */
 
--Filters
DECLARE @SqlFilter AS VARCHAR(4096) = ''
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Sistema].[dbo].[s_stats]')

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Sistema].[dbo].[s_stats]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

--print '---';
--print @SqlFilterRango
--print '---';

SET @SqlFilter = @SqlFilter + @SqlFilterRango
--print @SqlFilter
--print  @SqlSort

--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
Set @Sql = '
	SELECT sts_tfechahora as fecha, sts_cdescripcion as descripcion, sts_icantidad as cantidad, CONVERT(CHAR(5),sts_tfechahora,3) As fecha_format 
    FROM [_Sistema].[dbo].s_stats  With (NOLOCK)
	WHERE 1 = 1 ' +  @SqlFilter  + '
			AND sts_ctipo = ''VC'' 
			AND sts_cdescripcion = ''VIGICONTROL''
	ORDER BY sts_tfechahora ASC
'
--print @sql
exec (@sql)