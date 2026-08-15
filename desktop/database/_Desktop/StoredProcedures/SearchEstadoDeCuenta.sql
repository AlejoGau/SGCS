CREATE OR ALTER PROCEDURE [dbo].[SearchEstadoDeCuenta]
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
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].m_cuentas')
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

select @Sql = '
		-- DECLARO TABLA DE PRIORIDADES
		DECLARE @evento TABLE (cantidad INT, situacion VARCHAR(30));
		DECLARE @tabla TABLE (cantidad INT, situacion VARCHAR(30));

		--CARGA DE TABLA Y DECLARACION DE VARIABLES
		DECLARE @first AS INT = 1
		DECLARE @last AS INT = 1

		WHILE(@first <= @last)
			BEGIN
				INSERT INTO @evento VALUES (0,''Habilitado'')
				INSERT INTO @evento VALUES (0,''Prueba'')
				INSERT INTO @evento VALUES (0,''No habilitado'')
				INSERT INTO @evento VALUES (0,''Prueba por zonas'')
				INSERT INTO @evento VALUES (0,''Solicitar Eliminar'')
				SET @first += 1
			END

		INSERT INTO @tabla
			SELECT count(est_nestado) as cantidad,
					(Case
						When est_nestado = 0 Then ''Habilitado''
						When est_nEstado = 1 Then ''Prueba''
						When est_nEstado = 2 Then ''No habilitado''
						When est_nEstado = 3 Then ''Prueba por zonas''
						When est_nEstado = 4 OR est_nEstado = 5 Then ''Solicitar Eliminar''
						Else ''Otro'' End ) As situacion
				FROM [_Datos].[dbo].m_cuentas c
						left outer join [_Datos].[dbo].m_estado_cuenta_cab on cue_iid = est_iidcuenta
					WHERE 1 = 1 ' + @SqlFilter + ' 
					GROUP BY est_nestado

		SELECT isnull(t.cantidad, 0) cantidad, isnull(t.situacion, e.situacion) situacion
			FROM @tabla t
				FULL JOIN @evento e on e.situacion = t.situacion
		ORDER BY e.situacion ASC '
print @sql
exec (@sql)