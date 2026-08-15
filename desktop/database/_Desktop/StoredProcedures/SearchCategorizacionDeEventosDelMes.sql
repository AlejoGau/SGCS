CREATE OR ALTER PROCEDURE [dbo].[SearchCategorizacionDeEventosDelMes]
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

Select Max(res_cdescripcion) As descripcion, Count(*) As cantidad
    From [_Datos].[dbo].p_recepcion With (NOLOCK)
            Inner Join _Tablas.dbo.t_resoluciones On res_cCodigo = rec_idResolucion 
    Where (rec_nestado = 3 AND  rec_idResolucion  > 0) 
            And datepart(m,rec_tfechahora) = datepart(m,GETDATE()) 
Group By rec_idResolucion

*/

/*
* APLICANDO FILTROS y RANGOS
*/
--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[p_recepcion]')

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
select @Sql = '
	Select Max(res_cdescripcion) As descripcion, Count(*) As cantidad
		From [_Datos].[dbo].p_recepcion With (NOLOCK)
				Inner Join _Tablas.dbo.t_resoluciones On res_cCodigo = rec_idResolucion
				INNER JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = rec_iidcuenta
		WHERE 1 = 1 ' + @SqlFilter + '
			AND (rec_nestado = 3 AND  rec_idResolucion  > 0) 
			AND datepart(m,rec_tfechahora) = datepart(m,GETDATE()) 
	Group By rec_idResolucion
	'

	
print @sql
exec (@sql)