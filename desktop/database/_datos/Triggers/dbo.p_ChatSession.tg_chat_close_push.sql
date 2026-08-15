-- =============================================
-- Author:		Rodrigo Roman
-- Create date: 7/5/2021
-- Description:	manda push al cerrar un chat
-- 2024-09-06 Hernan : Se modifico el payload para soportar el nuevo modelo de firebase
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[tg_chat_close_push] 
   ON  [dbo].[p_ChatSession] 
   AFTER UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    --print '[chatStatusClose] Envío un push al sp'

	/*
	select * from _Datos.[dbo].p_ChatMembers 
	inner join _Datos.[dbo].p_ChatSession on chm_chatid = chs_idKey
	inner join _datos..SmartPanic on id = chm_objectId
	where chm_objectType = 3067
	*/

	declare @chs_idkey int

	select @chs_idkey = chs_idkey from inserted

	INSERT INTO [_Datos]..[p_push_queue]
           ([ppq_msg]
           ,[ppq_estado]
           ,[ppq_fechacreacion]
		   ,[ppq_idmessage]
		   ,[ppq_idcuenta])
	select
	'{ 
			"message":{
				"data": {
					"action": "END_CHAT",
					"sound": "notification_push.wav",					
					"click_action" : "com.softguard.END_CHAT",
					"message_id":"'+ CONVERT(NVARCHAR(20), p.Id)+'",
					"android_channel_id": "BACKGROUND SERVICES"					
				},
				"apns": {
				  "payload": {
					"aps": {
					  "sound": "notification_push.wav"
					}  
				  }
				},
				"token":"'+p.pushToken+'"
			}
        }'

	/*
		'{
			"content_available": true,
			"priority": "high",
            "data": {
                "action": "END_CHAT",
                "message_id":'+ CONVERT(NVARCHAR(20), p.Id)+'
            },
            "notification": {
                "android_channel_id": "BACKGROUND SERVICES",
                "sound": "notification_push.wav",
        		"click_action" : "com.softguard.END_CHAT"
            },
            "to":"'+p.pushToken+'"
        }'

		*/
		,0
		,getdate()
		,p.id
		,p.CuentaId
	from _Datos.[dbo].p_ChatMembers 
		inner join _Datos.[dbo].p_ChatSession on chm_chatid = chs_idKey
		inner join _datos..SmartPanic p on id = chm_objectId
		where chm_objectType = 3067 and chs_idkey = @chs_idkey

END