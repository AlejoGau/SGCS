-- =============================================
-- Author:		Roman Rodrigo
-- Create date: 18/9/2018
-- Description:	Actualiza el comando cuando se actualiza el sms como enviado
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[SmsActualizaEstadoCmd]
   ON  dbo.p_SMSqueue
   AFTER update
AS 
BEGIN

	SET NOCOUNT ON;

	declare @cmd_iid int;
    -- tomo el id del comando
	
	select @cmd_iid = cmd_iid from _datos..p_comandos_ip 
		inner join inserted on cmd_iid = que_idcmd
		where que_nestado = 1

	-- is tengo id de comando lo actualizo
	if @cmd_iid > 0
	BEGIN
		update _datos..p_comandos_ip 
			set cmd_nEstado = 3
			where cmd_iid = @cmd_iid
	END
	
	select @cmd_iid = 0 
-- tomo el id del comando
	select @cmd_iid = cmd_iid from _datos..p_comandos_ip 
		inner join inserted on cmd_iid = que_idcmd
		where que_nestado = 2

	-- is tengo id de comando lo actualizo
	if @cmd_iid > 0
	BEGIN
		update _datos..p_comandos_ip 
			set cmd_nEstado = 6
			where cmd_iid = @cmd_iid
	END
	

END