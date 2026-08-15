CREATE OR ALTER PROCEDURE [dbo].[SearchEventosAutoprocesadosDelDia]
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
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[p_recepcion]')
print @SqlFilter


--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].m_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '---';
print @SqlFilterRango
print '---';

SET @SqlFilter = @SqlFilter + @SqlFilterRango
print @SqlFilter
 
--print  @SqlSort


--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
select @Sql = @Sql + '	
	SELECT COUNT(rec_calarma) as cantidad, rec_calarma as alarma, ca.cod_cdescripcion as descripcion
	FROM [_Datos].[dbo].[p_recepcion] pr
		LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ca on ca.cod_ccodigo = pr.rec_calarma
	WHERE 1 = 1' + @SqlFilter + '
		AND CONVERT(CHAR(8),pr.rec_tFechaProceso,12) = CONVERT(CHAR(8),GETDATE(),12) 
		AND (rec_nestado IN(5,6,7))
	GROUP BY pr.rec_calarma, ca.cod_cdescripcion
	ORDER BY COUNT(rec_calarma) DESC'				

print @sql
exec (@sql)