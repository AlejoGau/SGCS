CREATE OR ALTER TRIGGER [dbo].[SmartTrackUpdatePush] 
   ON  [dbo].[SmartTrack]
   AFTER UPDATE
AS 
BEGIN
	-- =============================================
	-- Author:	Roman Rodrigo
	-- Create date: 02/07/2018
	-- Description:	Genera un mensaje de push cuando cambia la configuracion de un vigicontrol
	-- =============================================

	SET NOCOUNT ON;

	declare @token varchar(1024) = ''

	select @token = pushToken from DELETED

	if (@token != '' AND @token is not null)
		BEGIN
			EXEC _desktop..[createPushMessage]
			@spId = NULL,
			@spToken = @token,
			@msgType = 'UPDATE_LOGIN',
			@data = NULL,
			@badge = '0'
		END
END