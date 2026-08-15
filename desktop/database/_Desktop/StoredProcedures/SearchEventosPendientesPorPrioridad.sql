CREATE OR ALTER PROCEDURE [dbo].[SearchEventosPendientesPorPrioridad]
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

/* ORIGINAL
	--Filters
	DECLARE @SqlFilter AS VARCHAR(4096)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '_datos..eventospendientes')

	print @SqlFilter

	declare @sql as varchar(max) = ''

	set @sql = 'Select left(rec_iprioridad,1) As prioridad, count (*) as cantidad
	FROM _Datos.dbo.eventospendientes With (NOLOCK)
	WHERE 
	CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) ' + @sqlfilter
	+' group by left(rec_iprioridad,1)'

	print @sql
	exec (@sql)
*/

/*
 * APLICANDO FILTROS y RANGOS - NUEVO
 */
--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[EventosPendientes]')

print '--- SqlFilter';
print @SqlFilter
print '---';

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[EventosPendientes]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '--- SqlFilterRango';
print @SqlFilterRango
print '--- Token';
print @token
print '---';

SET @SqlFilter = @SqlFilter + @SqlFilterRango
/*
SET @SqlFilter = isnull(@SqlFilter,'') + isnull(@SqlFilterRango,'')
*/

print '--- SqlFilter + SqlFilterRango';
print @SqlFilter
print '---';

DECLARE @sql as varchar(max) = ''

set @sql = '
-- DECLARO TABLA DE PRIORIDADES
DECLARE @prioridad TABLE (prioridad INT);
DECLARE @tabla TABLE (prioridad INT, cantidad INT);

--CARGA DE TABLA Y DECLARACION DE VARIABLES
DECLARE @first AS INT = 1
DECLARE @last AS INT = 9

WHILE(@first <= @last)
	BEGIN
		INSERT INTO @prioridad VALUES(@first)
		SET @first += 1
	END

INSERT INTO @tabla
	SELECT left(rec_iprioridad,1) As prioridad,	count (*) as cantidad
	FROM [_Datos].[dbo].[EventosPendientes] With (NOLOCK) INNER JOIN [_Datos].[dbo].[m_cuentas]  c on rec_iidCuenta = c.cue_iid
	WHERE 1 = 1 '+ @SqlFilter +'
		AND CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
		GROUP BY left(rec_iprioridad,1)

	SELECT isnull(t.prioridad, p.prioridad) Prioridad, isnull(cantidad, 0) cantidad
	FROM @tabla t
		FULL JOIN @prioridad p on p.prioridad = t.prioridad
ORDER BY p.prioridad ASC
'

print @sql
exec (@sql)

-- FUNCIONA OK, ESTOY PROBANDO TABLA TEMPORAL
/*
'SELECT left(rec_iprioridad,1) As prioridad,	count (*) as cantidad
FROM [_Datos].[dbo].[EventosPendientes] With (NOLOCK) INNER JOIN [_Datos].[dbo].[m_cuentas]  c on rec_iidCuenta = c.cue_iid
WHERE 1 = 1
	AND CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
	'+ @SqlFilter +'

	GROUP BY left(rec_iprioridad,1)
'
*/