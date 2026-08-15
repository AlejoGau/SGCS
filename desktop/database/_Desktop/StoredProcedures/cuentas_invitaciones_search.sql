CREATE OR ALTER PROCEDURE [dbo].[cuentas_invitaciones_search]
	@page INT = 1,
	@start INT = 0,
	@limit INT = 50,
	@sort NVARCHAR(256) = '',
	@group NVARCHAR(256) = '',
	@filter NVARCHAR(2048) = '',
	@_dc NVARCHAR(256) = '',
	@totalrows INT = 1 OUTPUT
AS
SET NOCOUNT ON

-- Extraer filtros del JSON
DECLARE @nombre NVARCHAR(200) = ''
DECLARE @direccion NVARCHAR(200) = ''
DECLARE @contacto NVARCHAR(200) = ''

-- Parsear filtros del JSON de Sencha
IF @filter <> ''
BEGIN
	SELECT @nombre = ISNULL(JSON_VALUE(value, '$.value'), '')
	FROM OPENJSON(@filter)
	WHERE JSON_VALUE(value, '$.property') = 'nombre'

	SELECT @direccion = ISNULL(JSON_VALUE(value, '$.value'), '')
	FROM OPENJSON(@filter)
	WHERE JSON_VALUE(value, '$.property') = 'direccion'

	SELECT @contacto = ISNULL(JSON_VALUE(value, '$.value'), '')
	FROM OPENJSON(@filter)
	WHERE JSON_VALUE(value, '$.property') = 'contacto'
END

-- Base query con filtros dinámicos
DECLARE @SqlWhere NVARCHAR(MAX) = ' WHERE t.tel_cnombre <> '''' '

IF @nombre <> ''
	SET @SqlWhere = @SqlWhere + ' AND (c.cue_cnombre LIKE ''%'' + @pNombre + ''%'' OR c.cue_clinea LIKE ''%'' + @pNombre + ''%'' OR c.cue_ncuenta LIKE ''%'' + @pNombre + ''%'')'

IF @direccion <> ''
	SET @SqlWhere = @SqlWhere + ' AND (c.cue_ccalle LIKE ''%'' + @pDireccion + ''%'' OR c.cue_clocalidad LIKE ''%'' + @pDireccion + ''%'')'

IF @contacto <> ''
	SET @SqlWhere = @SqlWhere + ' AND t.tel_cnombre LIKE ''%'' + @pContacto + ''%'''

DECLARE @SqlBase NVARCHAR(MAX)
SET @SqlBase = ' FROM _Datos..m_cuentas c
	INNER JOIN _Datos..m_telefonos t ON t.tel_iidcuenta = c.cue_iid '
	+ @SqlWhere

-- Total Rows
DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)
DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)
SET @DynamicSqlTotalRows = 'SELECT @TotalRows = COUNT(*) ' + @SqlBase
SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT, @pNombre NVARCHAR(200), @pDireccion NVARCHAR(200), @pContacto NVARCHAR(200)'
EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams,
	@totalrows OUTPUT, @pNombre = @nombre, @pDireccion = @direccion, @pContacto = @contacto

-- Pagination
DECLARE @from INT
DECLARE @to INT
SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

-- Execute paginated query
DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)
SET @DynamicSqlReturnRows = '
SELECT * FROM (
	SELECT ROW_NUMBER() OVER (ORDER BY c.cue_iid) AS RowNumber,
		c.cue_iid,
		TRIM(cue_clinea) + ''-'' + TRIM(cue_ncuenta) + ''-'' + TRIM(cue_cnombre) AS Cuenta,
		c.cue_ccalle + '', '' + c.cue_clocalidad AS Direccion,
		t.tel_cnombre AS Contacto,
		t.tel_ctelefono AS telefono,
		CASE t.tel_ntr
			WHEN 1 THEN ''Contacto Smartpanics''
			WHEN 2 THEN ''Contacto Comun''
			WHEN 3 THEN ''Contacto Ambos''
			WHEN 4 THEN ''Oculto''
			ELSE ''Seleccione''
		END AS tipoContacto
	' + @SqlBase + '
) AS T
WHERE RowNumber BETWEEN @from AND @to
ORDER BY RowNumber'

DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)
SET @DynamicSqlReturnRowsParams = '@from INT, @to INT, @pNombre NVARCHAR(200), @pDireccion NVARCHAR(200), @pContacto NVARCHAR(200)'
EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams,
	@from = @from, @to = @to, @pNombre = @nombre, @pDireccion = @direccion, @pContacto = @contacto