--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.607 
-- Pablo 2025-12-05 : que solamente de sonido de cuentas habiltadas (DSS-1429)
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[EventoSonidoSearch]
@token NVARCHAR(128) = '',   
@soloGeneraAlerta int = 0,
@page INT = 1,               
@start INT = 0,               
@limit INT = 1000
AS
BEGIN

  DECLARE @Sql AS NVARCHAR(max);
	DECLARE @tabla AS NVARCHAR(max) ;
	
	DECLARE @SqlFilterRango AS NVARCHAR(max);
	DECLARE @SqlFilter AS NVARCHAR(max) = '';


	EXEC getSqlRangesForToken @table = '', @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT

	SET @SqlFilter =  @SqlFilter + ' ' + @SqlFilterRango

	SET @tabla = '_datos..p_recepcion'
	IF @soloGeneraAlerta > 0
	BEGIN
		set @Sql = ';WITH CuentaFiltrada AS (
			SELECT cue_iid From _datos.dbo.m_cuentas o
				INNER JOIN [_Desktop].[dbo].[m_estado_cuenta_cab_situacion] s ON o.cue_iid = s.est_iidcuenta AND s.Situacion = ''Habilitado''
			Where 1=1 '++@SqlFilter

		set @Sql += '),
			EventosPendientesCTE AS (
				SELECT *
				FROM _datos..eventospendientes
				WHERE rec_iidcuenta IN (SELECT cue_iid FROM CuentaFiltrada)
			)
			SELECT TOP 1 *
			FROM EventosPendientesCTE ep
			LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo = ep.rec_calarma'
	END
	Else
	Begin
	
		SET @Sql = 'SELECT TOP 1 * FROM '+@tabla+' 
			LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=rec_calarma 
			left join _datos..m_cuentas o on cue_iid = rec_iidcuenta
			INNER JOIN [_Desktop].[dbo].[m_estado_cuenta_cab_situacion] s ON rec_iidcuenta = s.est_iidcuenta AND s.Situacion = ''Habilitado''
			WHERE 1=1 ' 
			--WHERE 1=1 AND rec_nestado = 0  comento el where porque si es no genera alerta no teiene que ser pendiente. y agrego orden DESC para traer el ultimo

		set @Sql = @Sql+@SqlFilter+ ' ORDER BY rec_iid DESC '
	End

	/*
	Print '-----------------------'
	DECLARE @StartIndex INT = 1
	DECLARE @ChunkSize INT = 4000

	WHILE @StartIndex <= LEN(@SQL)
	BEGIN
		DECLARE @Chunk NVARCHAR(MAX)
		SET @Chunk = SUBSTRING(@SQL, @StartIndex, @ChunkSize)

		-- Encuentra el último espacio en blanco en el fragmento
		DECLARE @LastSpaceIndex INT = CHARINDEX(' ', REVERSE(@Chunk))

		-- Si se encuentra un espacio, ajusta el fragmento
		IF @LastSpaceIndex > 0
			SET @Chunk = SUBSTRING(@Chunk, 1, @ChunkSize - @LastSpaceIndex)

		-- Imprime el fragmento
		PRINT @Chunk

		-- Actualiza el índice de inicio para la próxima iteración
		SET @StartIndex = @StartIndex + @ChunkSize - @LastSpaceIndex
	END
	*/	

	EXECUTE (@Sql)

END