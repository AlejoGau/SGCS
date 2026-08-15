-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/5/2018
-- Description:	Trigger Delete para eliminar las notificaciones PUSH cuando se borra un SP
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[smartpanic_delete]
   ON  [dbo].[SmartPanic]
   AFTER DELETE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @id varchar(10) = ''
	declare @token varchar(1024) = ''
	select top 1 @id = convert(varchar(10),Id), @token = pushToken from deleted
	set @id = Ltrim(Rtrim(@id))

	UPDATE _datos..m_sms SET sms_cidspushsmartpanic = REPLACE(sms_cidspushsmartpanic, ';'+@id+';', ';')
		where sms_cidspushsmartpanic like '%;'+@id+';%'

	UPDATE _datos..m_sms SET sms_cidspushsmartpanic = ''
		where sms_cidspushsmartpanic = ';'

	delete from _datos..m_sms where sms_cidspushsmartpanic = ';' and sms_cPlantillaPush !='' and sms_cPlantillaPush is not null

	--Print 'token : '+@token
	-- 2023-05-15 Pablo : Se pidio en Jira DS-684
	if (@token != '' AND @token is not null)
			BEGIN
				EXEC _desktop..[createPushMessage]
				@spId = @id,
				@spToken = @token,
				@msgType = 'DELETE_APP',
				@data = NULL
			END	


	--Actualizo por si quedaron valores sin el ; adelante
	--Update [_Datos].[dbo].[m_sms]
	--	Set [sms_cidsPushSmartpanic] = ';' + Ltrim(Rtrim([sms_cidsPushSmartpanic])) + ';'
	--Where [sms_cidsPushSmartpanic] != ''
	--And Substring(Ltrim([sms_cidsPushSmartpanic]),1,1) != ';'

END