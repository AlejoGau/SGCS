--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.380 
--#############################################################################
-- =============================================
-- Author:		Rodrigo Román
-- Create date: 13/01/2017
-- Description:	Creación de mensajes push en la tabla
-- 2023-05-15 Pablo : Se agrego @msgType = 'DELETE_APP'
-- 2023-11-06 Pablo : Se agrego If @msgType != 'UPDATE_LOGIN'
-- 2024-01-08 Pablo : Set @spId = @spId * (-1) para evitar que el ID del SP se mezcle con el ID del message
-- 2024-09-06 Dedalo : Se modifico el payload para soportar el nuevo modelo de firebase, se unificaron los mensajes de android e IOS
-- 2024-09-06 Pablo : Se modifico el resto de los payload para soportar el nuevo modelo de firebase
-- 2024-09-06 Pablo : Se controla valores null para evitar generar mensajes vacios
-- 2024-11-20 Pablo : Cambiamos el badge a numerico y se saco content_available:true a pedido de MatiasM
-- 2026-01-28 Pablo : Se llama al store [SGSP_BadgeCounter] para obtener el dato a enviar en Badge
-- 2026-01-29 Pablo : Se agrego @msgType = 'EVENT_IM_HERE'
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[createPushMessage]
	@spId INT = 0,
	@vcid INT = 0,
	@spToken NVARCHAR(1024) = '',
	@msgType NVARCHAR(128) = '',
	@data NVARCHAR(1024) = '',
	@badge NVARCHAR(5) = '',
	@title NVARCHAR(256) = 'SmartPanics',
	@idassign INT = 0,
	@idSurvey INT = 0,
	@idcuenta INT = 0,
	@notification_sound VARCHAR(255) = 'notification_push.wav'
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Text nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	--Verifico nulls--
	If (@spId Is Null) Set @spId = 0
	If (@vcid Is Null) Set @vcid = 0
	If (@spToken Is Null) Set @spToken = ''
	If (@msgType Is Null) Set @msgType = ''
	If (@data Is Null) Set @data = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @Text = 'Start DateTime : %s | [createPushMessage] @badge => '+IsNull(@badge,'null')
	RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

	If (@badge Is Null Or @badge = '')
	Begin
		Declare @iBadge Int
		Execute [dbo].[SGSP_BadgeCounter] @spId = @spId, @badge = @iBadge OUTPUT
		SET @badge = CAST(ISNULL(@iBadge, 0) AS NVARCHAR(5))

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @Text = 'Start DateTime : %s | [createPushMessage] | [SGSP_BadgeCounter] @spId='+Cast(@spId As Varchar(10)) +' | @badge => '+IsNull(@badge,'null')
		RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	If (@title Is Null) Set @title = 'SmartPanics'
	If (@idassign Is Null) Set @idassign = 0
	If (@idSurvey Is Null) Set @idSurvey = 0
	If (@idcuenta Is Null) Set @idcuenta = 0
	IF (@notification_sound IS NULL OR @notification_sound = '') Set @notification_sound = 'notification_push.wav'

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @Text = 'Start DateTime : %s | [createPushMessage] Begin con @msgType => '+@msgType
	RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

	DECLARE @ppq_msg NVARCHAR(max) = '';
	SELECT @data = replace(@data, '<BR>', ' ');

    -- SANITIZACION PARA JSON (Nativo SQL 2019)
    DECLARE @tSafe NVARCHAR(MAX) = STRING_ESCAPE(@title, 'json');
    DECLARE @dSafe NVARCHAR(MAX) = STRING_ESCAPE(@data, 'json');

	DECLARE @tipo VARCHAR(256)
	IF @title IS NULL OR @title = '' SET @title = 'SmartPanics'

	IF @spId > 0
	BEGIN
		IF @spToken = '' OR @spToken IS NULL
		BEGIN
			SELECT @spToken = pushToken,@idcuenta = CuentaId,@tipo = Tipo FROM [_Datos].[dbo].[SmartPanic] WHERE id = @spId
		END
		IF @idcuenta = 0
		BEGIN
			SELECT @idcuenta = s.CuentaId,@tipo = Tipo FROM [_Datos].[dbo].SmartPanic s WHERE s.pushToken = @spToken
		END
	END
	ELSE IF @vcId > 0
	BEGIN
		IF @spToken = '' OR @spToken IS NULL
		BEGIN
			SELECT @spToken = pushToken FROM [_Datos].[dbo].SmartTrack WHERE id = @vcId
		END
		SET @spId = @vcId;
		IF @idcuenta = 0
		BEGIN
			SELECT @idcuenta = s.CuentaId,@tipo = 'ANDROID' FROM [_Datos].[dbo].smarttrack s WHERE s.pushToken = @spToken
		END
	END
	ELSE
	BEGIN
		SELECT @spId = sp.Id,@idcuenta = sp.CuentaId,@tipo = Tipo FROM [_Datos].[dbo].[SmartPanic] sp WHERE sp.pushToken = @spToken
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @Text = 'Start DateTime : %s | [createPushMessage] Genero el mensaje según el tipo => '+@msgType
	RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

	IF (@msgType = 'NEW_MESSAGE' OR @msgType = 'NEW_DATAMESSAGE')
	BEGIN
		SET @ppq_msg = '{
    "message": {
        "data": {
            "action": "INBOX_MESSAGE",
            "sound": "' + @notification_sound + '",
            "message_id": "' + CAST(@spId AS NVARCHAR(20)) + '",
            "click_action": "com.softguard.INBOX_MESSAGE",
            "android_channel_id": "BACKGROUND SERVICES",
            "title": "' + @tSafe + '",
            "body": "' + @dSafe + '"
        },
        "apns": {
            "payload": {
                "aps": {
                    "alert": { "title": "' + @tSafe + '", "body": "' + @dSafe + '" },
                    "sound": "' + @notification_sound + '",
                    "badge": ' + @badge + '
                }
            }
        },
        "token": "' + @spToken + '"
    }
}'
	END
	ELSE IF (@msgType = 'EVENT_IM_HERE')
	BEGIN
		SET @ppq_msg = '{
    "message": {
        "data": {
            "action": "EVENT_IM_HERE",
            "sound": "' + @notification_sound + '",
            "title": "' + @tSafe + '",
            "body": "' + @dSafe + '"
        },
        "apns": {
            "payload": {
                "aps": {
                    "alert": { "title": "' + @tSafe + '", "body": "' + @dSafe + '" },
                    "sound": "' + @notification_sound + '",
                    "badge": ' + @badge + '
                }
            }
        },
        "token": "' + @spToken + '"
    }
}'
	END
	ELSE IF (@msgType = 'ALARM_STOP')
	BEGIN
		SET @ppq_msg = '{ "message":{ "data": { "action": "ALARM_STOP", "content_available":"true" }, "token":"' + @spToken + '" } }'
	END
	ELSE IF (@msgType = 'START_CHAT')
	BEGIN
		SET @ppq_msg = '{ 
			"message":{
				"data": {
					"action": "START_CHAT",
					"sound": "' + @notification_sound + '",
					"message_id":"' + CAST(@spId AS NVARCHAR(20)) + '",
					"click_action" : "com.softguard.START_CHAT",
					"android_channel_id": "BACKGROUND SERVICES",
					"title": "' + @tSafe + '",
					"body": "' + @dSafe + '"
				},
				"apns": {
				  "payload": {
					"aps": {
					  "alert": { "title": "' + @tSafe + '", "body": "' + @dSafe + '" },
					  "sound": "' + @notification_sound + '",
					  "badge": ' + @badge + '
					}  
				  }
				},
				"token":"' + @spToken + '"
			}
        }'
	END
	ELSE IF (@msgType = 'END_CHAT')
	BEGIN
		SET @ppq_msg = '{ "message":{ "data": { "action": "END_CHAT", "message_id":"' + CAST(@spId AS NVARCHAR(20)) + '" }, "notification": { "title": "' + @tSafe + '", "body": "' + @dSafe + '" }, "token":"' + @spToken + '" } }'
	END
	ELSE IF (@msgType = 'NEW_ASSIGN')
	BEGIN
		DECLARE @tAssign NVARCHAR(MAX);
		EXECUTE [dbo].[LocalizationGetLocale] @Name = "Nueva asignación",@soloOutput = 1,@translation = @tAssign OUTPUT;
		SET @ppq_msg = '{ "message":{ "data": { "action": "NEW_ASSIGN" }, "notification": { "title": "VigiControl", "body": "' + STRING_ESCAPE(@tAssign, 'json') + '" }, "token":"' + @spToken + '" } }'
	END
	ELSE IF (@msgType = 'CANCEL_ASSIGN')
	BEGIN
		DECLARE @tCancel NVARCHAR(MAX);
		EXECUTE [dbo].[LocalizationGetLocale] @Name = "Una asignacion fue cancelada",@soloOutput = 1,@translation = @tCancel OUTPUT;
		SET @ppq_msg = '{ "message":{ "data": { "action": "CANCEL_ASSIGN", "message_id":"' + CAST(@spId AS NVARCHAR(20)) + '" }, "notification": { "title": "VigiControl", "body": "' + STRING_ESCAPE(@tCancel, 'json') + '" }, "token":"' + @spToken + '" } }'
	END
	ELSE IF (@msgType = 'SENDLOG' OR @msgType = 'LOGOUT' OR @msgType = 'DELETE_APP')
	BEGIN
		SET @ppq_msg = '{ "message":{ "data": { "action": "' + @msgType + '", "content_available":"true" }, "token":"' + @spToken + '" } }'
	END
	ELSE IF (@msgType = 'SURVEY')
	BEGIN
		SET @ppq_msg = '{ 
			"message":{
				"data": {
					"action": "SURVEY",
					"sound": "' + @notification_sound + '",
					"id_survey": "' + CAST(@idSurvey AS NVARCHAR(20)) + '",
					"click_action" : "SURVEY",
                    "title": "' + @tSafe + '",
					"body": "' + @dSafe + '"
				},
				"apns": {
				  "payload": {
					"aps": {
					  "alert": { "title": "' + @tSafe + '", "body": "' + @dSafe + '" },
					  "sound": "' + @notification_sound + '",
					  "badge": ' + @badge + ',
					  "content_available":"true"
					}  
				  }
				},
				"token":"' + @spToken + '"
			}
        }'
	END
	ELSE
	BEGIN
		DECLARE @recentLoginUpdateExists INT
		SELECT @recentLoginUpdateExists = COUNT(*) FROM [_Datos].[dbo].[p_push_queue] WHERE ppq_msg LIKE '%UPDATE_LOGIN%' AND ppq_idmessage = @spId AND ppq_fechacreacion >= DATEADD(MINUTE, -5, GETDATE())

		IF @recentLoginUpdateExists = 0
		BEGIN
			Set @spId = @spId * (-1)
			SET @ppq_msg = '{ "message":{ "data": { "action": "UPDATE_LOGIN", "content_available":"true" }, "token":"' + @spToken + '" } }'
			
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			RAISERROR( 'Start DateTime : %s | [createPushMessage] UPDATE_LOGIN', 10,1,@StartDateTimeText) WITH NOWAIT
			INSERT INTO [_Datos].[dbo].[p_push_queue] ([ppq_msg],[ppq_estado],[ppq_fechacreacion],[ppq_idmessage],[ppq_idcuenta])
			VALUES (@ppq_msg,0,getdate(),@spId,@idcuenta)
		END
	END

	IF @spToken = '' OR @spToken IS NULL
	Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			RAISERROR( 'Start DateTime : %s | [createPushMessage] pushtoken invalido', 10,1,@StartDateTimeText) WITH NOWAIT
	End	
	ELSE
	BEGIN
		If @msgType != 'UPDATE_LOGIN'
		Begin
			INSERT INTO [_Datos].[dbo].[p_push_queue] ([ppq_msg],[ppq_estado],[ppq_fechacreacion],[ppq_idmessage],[ppq_idcuenta])
			VALUES (@ppq_msg,0,getdate(),@spId,@idcuenta)
		End 
	END
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	RAISERROR( 'Start DateTime : %s | [createPushMessage] End', 10,1,@StartDateTimeText) WITH NOWAIT
END