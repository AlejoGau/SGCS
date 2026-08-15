CREATE OR ALTER PROCEDURE [dbo].[SearchEvolucionCuentas12Meses]
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
 * ORIGINAL
 *
SELECT Avg(sts_icantidad) as cantidad, month(sts_tfechahora) as mes, year(sts_tfechahora) as ano 
    FROM [_Sistema].[dbo].s_stats With (NOLOCK)
	WHERE 
		AND CONVERT(CHAR,sts_tfechahora,112) > CONVERT(CHAR,DATEADD(day,-' + @Filter + ',GETDATE()),112) 
		AND CONVERT(char, sts_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
		AND sts_ctipo = 'SC' 
		AND sts_cdescripcion = 'Habilitado'
GROUP BY month(sts_tfechahora), year(sts_tfechahora)
ORDER BY year(sts_tfechahora),month(sts_tfechahora) asc

*/

/*
 * APLICANDO FILTRO Y RANGOS
 */

--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Sistema].[dbo].s_stats')

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Sistema].[dbo].s_stats', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

--print '---';
--print @SqlFilterRango
--print '---';


SET @SqlFilter = @SqlFilter + @SqlFilterRango

print 'FILTER: '+ @SqlFilter
 
--print  @SqlSort


--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
select @Sql = '
	SELECT sts_tfechahora as fecha, sts_cdescripcion as descripcion, sts_icantidad as cantidad, CONVERT(CHAR(5),sts_tfechahora,3) As fecha_format 
    FROM [_Sistema].[dbo].s_stats  With (NOLOCK)
	WHERE 1 = 1 ' +  @SqlFilter  + '
			AND sts_ctipo = ''SC'' 
			AND sts_cdescripcion = ''Habilitado''
	ORDER BY sts_tfechahora ASC
'
print @sql
exec (@sql)