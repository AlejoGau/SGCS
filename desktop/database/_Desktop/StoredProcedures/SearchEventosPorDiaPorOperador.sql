CREATE OR ALTER PROCEDURE [dbo].[SearchEventosPorDiaPorOperador]
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
Select Max(ope_cnombre) As operador, Count(*) As cantidad
	From [_Datos].[dbo].p_recepcion With (NOLOCK)
	        Inner Join _Sistema.dbo.s_operadores On ope_iid = rec_ioperador 
	Where rec_ioperador>0 
            and ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112) 
	        And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) )
Group By rec_ioperador
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
	Select Max(ope_cnombre) As operador, Count(*) As cantidad
	From [_Datos].[dbo].p_recepcion With (NOLOCK)
	        Inner Join _Sistema.dbo.s_operadores On ope_iid = rec_ioperador
			INNER JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = rec_iidcuenta 
	WHERE 1 = 1' + @SqlFilter + '
		and rec_ioperador>0 
        and ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112) 
	    and CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) )
	Group By rec_ioperador
	ORDER BY COUNT(*) DESC'

print @sql
exec (@sql)