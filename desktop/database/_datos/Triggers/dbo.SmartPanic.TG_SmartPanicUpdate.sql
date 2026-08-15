CREATE OR ALTER TRIGGER [dbo].[TG_SmartPanicUpdate]
ON [dbo].[SmartPanic]
AFTER UPDATE
AS
BEGIN
    -- =============================================
    -- Trigger:     TG_SmartPanicUpdate
    -- Descripción: Trigger unificado que combina:
    --              1) SmartPanicUpdateTrigger (Roman Rodrigo 13/01/2017)
    --              2) SmarPanic_UPDATE
    -- Unificado:   Pablo - 27/11/2025
    -- =============================================

    SET NOCOUNT ON;

    -- ============================================
    -- DECLARACIÓN DE VARIABLES UNIFICADAS
    -- ============================================
    DECLARE @message NVARCHAR(MAX) = '',
            @StartDateTimeText VARCHAR(30) = '';

	DECLARE @TraceIDStr NVARCHAR(36);
	-- Obtener como string (porque así se guardó)
	SET @TraceIDStr = CONVERT(NVARCHAR(36), SESSION_CONTEXT(N'TraceID'));

	-- Si nunca se seteó, @TraceID será NULL
	IF @TraceIDStr IS NULL
		SET @TraceIDStr = CAST(@@SPID AS NVARCHAR); 

    -- Variables de identificación
    DECLARE @id INT,
            @pushToken VARCHAR(1024) = '',
			@pushTokenOLD VARCHAR(1024) = '';

    -- Variables de CuentaId (old/new)
    DECLARE @old_CuentaId INT = 0,
            @new_CuentaId INT = 0;

    -- Variables para detección de cambios (ex SmartPanicUpdateTrigger)
    DECLARE @TelefonoOld VARCHAR(128) = '',
            @TelefonoNew VARCHAR(128) = '',
            @NombreOld VARCHAR(256) = '',
            @NombreNew VARCHAR(256) = '',
            @ConfigOld VARCHAR(MAX) = '',
            @ConfigNew VARCHAR(MAX) = '',
			@imeiOld VARCHAR(128) = '',
            @imeiNew VARCHAR(128) = ''

    -- Variables auxiliares
    DECLARE @linea CHAR(3),
            @iValor INT = 0,
			@debug CHAR(1) = 'N'

    -- ============================================
    -- LECTURA ÚNICA DE DELETED E INSERTED
    -- ============================================
    SELECT @old_CuentaId = ISNULL([CuentaId], 0),
           @TelefonoOld  = ISNULL([Telefono], ''),
           @NombreOld    = ISNULL([Nombre], ''),
           @ConfigOld    = ISNULL([Config], ''),
		   @imeiOld      = ISNULL([Imei], ''),
		   @pushTokenOLD  = ISNULL([pushToken], '')
    FROM DELETED;

    SELECT @id           = [Id],
           @pushToken    = ISNULL([pushToken], ''),
           @new_CuentaId = ISNULL([CuentaId], 0),
           @TelefonoNew  = ISNULL([Telefono], ''),
           @NombreNew    = ISNULL([Nombre], ''),
           @ConfigNew    = ISNULL([Config], ''),
		   @imeiNew		 = ISNULL([Imei], '')
    FROM INSERTED;

    -- ============================================
    -- SECCIÓN 1: Ex [SmartPanicUpdateTrigger]
    -- Autor original: Roman Rodrigo - 13/01/2017
    -- Modificado: Pablo 2024-10-09 (comparar Old-New)
    -- Propósito: Push de UPDATE_LOGIN cuando cambia
    --            Telefono, Nombre o Config
    -- ============================================
	SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Inicio Sección 1';
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
						Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Nuevo idCta='+Cast(@new_CuentaId As varchar(10)) + ' | Nuevo Telefono='+@TelefonoNew + ' | Nuevo pushToken='+@pushToken+ ' | Nuevo Config='+@ConfigNew 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	If @debug = 'S'
	Begin
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
							Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Viejo idCta='+Cast(@old_CuentaId As varchar(10)) + ' | Viejo Telefono='+@TelefonoOld + '  | Viejo pushToken='+@pushTokenOLD + '  | Viejo Config='+@ConfigOld
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @debug = 'S'
	Begin
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
							Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH
	End	
	IF (@new_CuentaId != 0)
    BEGIN
        IF (@TelefonoOld != @TelefonoNew OR @NombreOld != @NombreNew OR @ConfigOld != @ConfigNew)
        BEGIN
            IF (@pushToken IS NOT NULL AND @pushToken != '')
            BEGIN
			    SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
				SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | EXECUTE _desktop..[createPushMessage] con UPDATE_LOGIN ';
				RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
				If @debug = 'S'
				Begin
					BEGIN TRY
						INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
					END TRY
					BEGIN CATCH
					END CATCH
				End

                EXECUTE _desktop..[createPushMessage]  @spId = @id, @spToken = @pushToken, @msgType = 'UPDATE_LOGIN', @data = NULL;
            END
        END
    END

    -- ============================================
    -- SECCIÓN 2: Ex [SmarPanic_UPDATE]
    -- Propósito: Actualizar Linea y generar alarma
    --            cuando cambia CuentaId
    -- ============================================
    SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Inicio Sección 2';
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
	If @debug = 'S'
	Begin
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
							Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH
	End

    -- Actualizar dealer si hay CuentaId válido
    IF (@new_CuentaId > 0)
    BEGIN
        SELECT @linea = c.cue_clinea 
			FROM _Datos..m_cuentas c 
        WHERE c.cue_iid = @new_CuentaId;

        UPDATE s 
        SET Linea = @linea 
			FROM SmartPanic s 
        INNER JOIN INSERTED i ON i.Id = s.Id;
    END

    -- Generar alarma si CuentaId cambió
    IF (@pushToken IS NOT NULL AND @pushToken != '' AND @pushToken != @pushTokenOLD AND @new_CuentaId > 0  ) --AND @new_CuentaId != @old_CuentaId)
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Execute [dbo].[SGSP_AlarmaGenerar] @idCta=' + CAST(@new_CuentaId AS VARCHAR(10)) + ' @cAlarma=_DC';
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

		Declare @trap table
		(
			iValor int
		)
		Insert Into @trap EXECUTE [dbo].[SGSP_AlarmaGenerar]  @idCta   = @new_CuentaId, @cAlarma = '_DC', @cQuien = 'SoftGuard', @iValor = @iValor OUTPUT 

    END
    ELSE
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | No cambio IdCta, NO ejecuto [SGSP_AlarmaGenerar] | Nuevo @idCta=' + CAST(@new_CuentaId AS VARCHAR(10)) + '. Anterior @idCta=' + CAST(@old_CuentaId AS VARCHAR(10));
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
    END

	If @debug = 'S'
	Begin
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
							Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH
	End

    -- ============================================
    -- SECCIÓN 3: CONFIG
    -- Propósito: Si blanquearon IMEI y tenia config de AltaLanding lo dejo
    -- ============================================
    SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Inicio Sección 3';
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
	If @debug = 'S'
	Begin
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
							Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH
	End

    -- Generar alarma si imei cambió
    IF ( @imeiNew = '' AND @imeiNew != @imeiOld And @ConfigOld Like '%{"groupEnabled"%') 
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Update [dbo].[SmartPanic] Set [Config]=@ConfigOld Where [Id]=' + CAST(@Id AS VARCHAR(10))
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
		If @debug = 'S'
		Begin
			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
								Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH
		End
        Update [dbo].[SmartPanic] Set [Config]=@ConfigOld Where [Id]=@id
    END

    SET @StartDateTimeText = CONVERT(VARCHAR(30), GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [TG_SmartPanicUpdate] | Fin';
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
	If @debug = 'S'
	Begin
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
							Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH
	End

END