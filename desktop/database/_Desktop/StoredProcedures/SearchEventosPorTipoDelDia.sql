CREATE OR ALTER PROCEDURE [dbo].[SearchEventosPorTipoDelDia]
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

SELECT count(rec_calarma) as cant, rec_calarma as tipo
	FROM [_Datos].[dbo].p_recepcion 
    where CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112)
group by rec_calarma
*/


/*
 * APLICANDO FILTRO Y RANGOS
 */
--Filters
DECLARE @SqlFilter AS VARCHAR(4096) = ''
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].p_recepcion')
print @SqlFilter

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].p_recepcion', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '---';
print @SqlFilterRango
print '---';

SET @SqlFilter = @SqlFilter + @SqlFilterRango
print @SqlFilter
 
--print  @SqlSort


--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
select @Sql = @Sql + '
	SELECT count(rec_calarma) as cant, ca.cod_cdescripcion as tipo
		FROM [_Datos].[dbo].p_recepcion pr
			JOIN [_Tablas].[dbo].t_codigos_alarma ca on ca.cod_ccodigo = pr.rec_calarma
			INNER JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = pr.rec_iidcuenta
		WHERE 1 = 1' + @SqlFilter + '
			and CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112)
	GROUP BY ca.cod_cdescripcion
	ORDER BY count(rec_calarma) ASC'


print @sql
exec (@sql)