-- =============================================
-- Author:		Rodrigo Román
-- Create date: 26/04/2019
-- Description:	Controla logouts de VC, borra el token
-- TO-DO: enviar un push avisando la desconexion
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[VcUserSessionLogout]
   ON  [dbo].[VigicontrolUserSessions]
   AFTER UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- cada sesion actaulizada es un nuevo logout
	-- cada logout borra sesion unica de ese usuario

	DECLARE @TraceIDStr NVARCHAR(36);
	-- Obtener como string (porque así se guardó)
	SET @TraceIDStr = CONVERT(NVARCHAR(36), SESSION_CONTEXT(N'TraceID'));

	-- Si nunca se seteó, @TraceID será NULL
	IF @TraceIDStr IS NULL
	BEGIN
		SET @TraceIDStr = CONVERT(NVARCHAR(36), NEWID());
		-- Opcional: guardarlo en el contexto para futuras llamadas en la misma sesión
		EXEC sp_set_session_context @key = N'TraceID', @value = @TraceIDStr;
	END

	Declare @idCta Int = 0,
			@idKey Int = 0,
			@iUsu Int = 0

	SELECT Top 1 @idCta=vus_idcuenta, @idKey=[vus_idkey], @iUsu=[vus_iusuario] from inserted 
	
	Declare @msg varchar(100) = '[VcUserSessionLogout] Inicio | vus_idcuenta:' + Cast(@idCta As VarChar(10)) + ' | vus_idkey:' + Cast(@idKey As VarChar(10)) + ' | vus_iusuario: ' + Cast(@iUsu As Varchar(10)) + ' |@TraceIDStr: ' +@TraceIDStr
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	

	delete from _datos..VigicontrolUserCurrentSession 
		where vucs_usuidkey in (
			select usu_idkey from _datos..m_usuarios
				inner join inserted i on i.vus_iusuario = usu_icodigo and i.vus_idcuenta = usu_iidcuenta
		) 

	Declare @iCant INT;

	SELECT @iCant = COUNT(*) 
	FROM _datos..VigicontrolUserCurrentSession v
	WHERE EXISTS (
		SELECT 1 FROM _datos..m_usuarios u
		INNER JOIN inserted i ON i.vus_iusuario = u.usu_icodigo AND i.vus_idcuenta = u.usu_iidcuenta
		WHERE u.usu_idkey = v.vucs_usuidkey
	);

	IF @iCant > 0
	BEGIN
		DELETE FROM _datos..VigicontrolUserCurrentSession 
		WHERE vucs_usuidkey IN (
			SELECT usu_idkey FROM _datos..m_usuarios
			INNER JOIN inserted i ON i.vus_iusuario = usu_icodigo AND i.vus_idcuenta = usu_iidcuenta
		);
    
		Set @msg  = '[VcUserSessionLogout] Fin | Se eliminaron ' + CAST(@iCant AS VARCHAR(10)) + ' registros';
	END
	ELSE
	BEGIN
		Set @msg  = '[VcUserSessionLogout] Fin | No se encontraron registros para eliminar';
	END

	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	
END