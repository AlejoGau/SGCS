CREATE OR ALTER PROCEDURE [dbo].[UsuarioUpdQuick]
	@Id Int = 0,
	@usu_iidcuenta Int = 0,
	@usu_icodigo Int = 0,
	@usu_cnombre NVarChar (30) = '',
	@usu_iid Int = 0,
	@usu_cclave NVarChar (20) = '',
	@usu_ntipo numeric (18,1) = 7,
	@usu_cimagen NVarChar (60) = '',
	@usu_mobservacion Text = '',
	@usu_cidextendido NVarChar (100) = '',
	@usu_cmetadata VarChar (MAX) = '',
	@usu_itipoidentificacion Int = 0,
	@usu_cidentificacion VarChar (255) = '',
	@usu_teliid Int = 0,
	@usu_email VarChar (100) = '',
	@cuentasCSV VARCHAR(MAX),
	@dominio VARCHAR(50)
AS

	SET NOCOUNT ON
	--SELECT @usu_iid = @usu_icodigo
	DECLARE @cue INT;
	DECLARE @CuentasTabla TABLE (Cuenta VARCHAR(50));

	INSERT INTO @CuentasTabla (Cuenta)
	SELECT TRIM(value) FROM STRING_SPLIT(@cuentasCSV, ',');

	DECLARE CLONAR CURSOR FOR
		SELECT Cuenta FROM @CuentasTabla 
		OPEN CLONAR;
		FETCH NEXT FROM CLONAR INTO @cue;
		WHILE @@FETCH_STATUS = 0
		BEGIN
			DECLARE @upsert INT = 0;
			SELECT @upsert = usu_iidcuenta FROM _datos..m_usuarios
			WHERE  ISJSON(usu_cmetadata) = 1 AND
			JSON_VALUE(usu_cmetadata, '$.domain') = @dominio
			AND usu_iidcuenta = @cue

			IF(@upsert = 0)
			BEGIN
			EXEC [dbo].[UsuarioIns]
				@Name = NULL,
				@usu_iidcuenta = @cue,
				@usu_icodigo = 0,
				@usu_cnombre = @usu_cnombre,
				@usu_iid = @usu_iid,
				@usu_ntipo = 7,
				@usu_cmetadata = @usu_cmetadata,
				@usu_cidentificacion = @usu_cidentificacion 
			END
			ELSE
			BEGIN
			--EXEC UsuarioUpd 0, '', @usu_iidcuenta, 
			
			UPDATE _Datos..m_usuarios SET
					[usu_cnombre] = @usu_cnombre,
					[usu_cmetadata] = @usu_cmetadata,
					[usu_cidentificacion] = @usu_cidentificacion
				WHERE ISJSON(usu_cmetadata) = 1 AND JSON_VALUE(usu_cmetadata, '$.domain') = @dominio AND 
					usu_iidcuenta = @cue
			END
		FETCH NEXT FROM CLONAR INTO @cue;
	END;
	CLOSE CLONAR;
	DEALLOCATE CLONAR;