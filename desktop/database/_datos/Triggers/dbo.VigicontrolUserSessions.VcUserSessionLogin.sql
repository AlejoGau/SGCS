-- =============================================
-- Author:		Rodrigo Román
-- Create date: 26/04/2019
-- Description:	Controla logins de VC, genera token
-- TO-DO: enviar un push con el token nuevo.
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[VcUserSessionLogin]
   ON  [dbo].[VigicontrolUserSessions]
   AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- cada sesion insertada es un nuevo login.
	-- cada login crea sesion única o la actualiza.
	--2022-11-17 Pablo : le agregue Top 1 x que salio por error el MERGE por multiple row

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
			@idRec Int = 0,
			@dlogin datetime = null

	SELECT Top 1 @idCta=vus_idcuenta, @dlogin=vus_dlogin, @idRec=vus_login_idrec from inserted i
	
	Declare @msg varchar(100) = '[VcUserSessionLogin] Inicio | @idCta:' + Cast(@idCta As VarChar(10)) + ' | @idRec:' + Cast(@idRec As VarChar(10)) + ' |@dlogin: ' + CONVERT(Varchar, @dlogin,120) + ' |@TraceIDStr: ' +@TraceIDStr
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	
	
	begin try
		MERGE _datos..VigicontrolUserCurrentSession AS target  
		USING (
			SELECT Top 1 usu_idkey, vus_idcuenta, vus_dlogin, vus_login_idrec, vc.id
				from inserted i
				inner join _datos..m_usuarios on i.vus_iusuario = usu_icodigo and i.vus_idcuenta = usu_iidcuenta
				inner join _datos..p_RXtraInfo on rxt_iRecId = i.vus_login_idrec
				inner join _datos..smarttrack vc on imei = rxt_cimei
			) 
			AS source (usuidkey, cueiid, lastmodification, loginidrec, vcid)  
		ON (target.vucs_usuidkey = source.usuidkey)  
		WHEN MATCHED THEN   
			UPDATE SET vucs_lastmodification = source.lastmodification, vucs_token = newid(), vucs_cueiid = source.cueiid, vucs_loginidrec = source.loginidrec, vucs_vcid = source.vcid
		WHEN NOT MATCHED THEN  
		INSERT (vucs_lastmodification, vucs_token, vucs_cueiid, vucs_loginidrec,vucs_vcid,vucs_usuidkey)  
		VALUES (source.lastmodification,newid(),source.cueiid, source.loginidrec, source.vcid, source.usuidkey);
	end try
	begin catch
		print '[VigicontrolUserSessions] hubo un error al mergear los datos.'
		Set @msg = '[VcUserSessionLogin] hubo un error al mergear'
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	
	end catch

	Set @msg = '[VcUserSessionLogin] Fin | '+@TraceIDStr
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	

END