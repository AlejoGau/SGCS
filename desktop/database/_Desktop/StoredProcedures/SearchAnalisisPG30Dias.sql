CREATE OR ALTER PROCEDURE [dbo].[SearchAnalisisPG30Dias]
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

SELECT CAST(max(rec_iPuerto) AS INT) as puerto,Count(rec_iid) As cantidad,max(pue_cdescripcion) as descripcion
    FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
            Inner Join _Tablas.dbo.t_puertos On pue_npuerto  = rec_iPuerto
    Where (rec_nestado>=0 and rec_nestado<=7 ) 
            And  rec_norigen = 2  
            and rec_iPuerto<99 
            and CONVERT(CHAR,rec_tfechahora,112)> CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112)    
            and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
            and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
Group By rec_iPuerto order by max(rec_iPuerto) asc

*/

/*
 * APLICANDO FILTROS y RANGOS
 */
 
--Filters
DECLARE @SqlFilter AS VARCHAR(4096) = ''
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[p_recepcion]')
print @SqlFilter


--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[p_recepcion]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '---';
print @SqlFilterRango
print '---';

SET @SqlFilter = @SqlFilter + @SqlFilterRango
print @SqlFilter
 
--print  @SqlSort


--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
select @Sql = @Sql + '
	SELECT CAST(max(rec_iPuerto) AS INT) as puerto,Count(rec_iid) As cantidad,max(pue_cdescripcion) as descripcion
    FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
            Inner Join _Tablas.dbo.t_puertos On pue_npuerto  = rec_iPuerto
			INNER JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = rec_iidcuenta
    WHERE 1 = 1' + @SqlFilter + '
		AND (rec_nestado>=0 and rec_nestado<=7 ) 
        AND  rec_norigen = 2  
        AND rec_iPuerto<99 
        AND CONVERT(CHAR,rec_tfechahora,112)> CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112)    
        AND CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
        AND CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
	Group By rec_iPuerto order by max(rec_iPuerto) asc
	'
		

print @sql
exec (@sql)