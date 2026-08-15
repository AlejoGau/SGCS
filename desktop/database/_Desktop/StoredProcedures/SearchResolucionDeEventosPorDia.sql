CREATE OR ALTER PROCEDURE [dbo].[SearchResolucionDeEventosPorDia]
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
Select Max(cat_cdescripcion) As descripcion, Count(*) As cantidad 
    From [_Datos].[dbo].p_recepcion With (NOLOCK)
        Inner Join _Tablas.dbo.t_categorizacion On cat_cCodigo = rec_cCategorizacion
    Where (rec_nestado = 3 AND rec_cCategorizacion > 0) 
        And ( CONVERT(char(8), rec_tFechaProceso,112) >= CONVERT(CHAR,GETDATE(),112)
        And CONVERT(char(8), rec_tFechaProceso,112) <= CONVERT(CHAR,GETDATE(),112)) 
Group By rec_cCategorizacion
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
	    SELECT Max(cat_cdescripcion) As descripcion, Count(*) As cantidad 
		
        FROM [_Datos].[dbo].p_recepcion With (NOLOCK)
			INNER JOIN _Tablas.dbo.t_categorizacion On cat_cCodigo = rec_cCategorizacion
			INNER JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = rec_iidcuenta
		WHERE 1 = 1 ' + @SqlFilter + '
			
            -- 12/03/2018 Se agrega debido a que hay campos que deben ser con numeros y traen Strings
            AND ( rec_nestado = 3 AND (case when IsNumeric(rec_cCategorizacion) = 1
                THEN CAST (rec_cCategorizacion as int)
                ELSE 0 END) > 0 )
            -- Fin del cambio. 

			AND ( CONVERT(char(8), rec_tFechaProceso,112) >= CONVERT(CHAR,GETDATE(),112)
			AND CONVERT(char(8), rec_tFechaProceso,112) <= CONVERT(CHAR,GETDATE(),112))

            AND ISNUMERIC(rec_idResolucion) <> 0
            AND ISNUMERIC(rec_cCategorizacion) <> 0

	    GROUP BY rec_cCategorizacion
	    ORDER BY COUNT(*) DESC
        
	'
print @sql
exec (@sql)