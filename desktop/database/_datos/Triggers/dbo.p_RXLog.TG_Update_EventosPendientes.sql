CREATE OR ALTER TRIGGER [dbo].[TG_Update_EventosPendientes] ON [dbo].[p_RXLog] AFTER INSERT AS
BEGIN
	SET NOCOUNT ON;
	Declare @idRec Int

	Select @idRec = rxl_iRecId	From inserted
		
	Execute SGSP_Fill_EventosPendientes @idRec=@idRec, @nCheck=0
	 
	/*Se saco el 21-12-2018 a pedido de Rodrigo y se agrego en SGSP_AlarmaSMS
	--PushNotification--
	Execute SGSP_PushNotification @idRec
	*/
END