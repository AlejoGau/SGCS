-- =============================================
-- Author:		Rodrigo Román
-- Create date: 19/02/2020
-- Description:	Recibe mensajes de terminal remota, analiza y genera eventos
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[terminalRemotaPacketParser]
	-- Add the parameters for the stored procedure here
	@from varchar(50),
	@message nvarchar(255)
AS
BEGIN

	SET NOCOUNT ON;

	print '[terminalRemotaPacketParser] me fijo si el telefono existe en alguna cuenta como terminal remota'
	declare @cue_iid int;
	declare @rec_iid int;
	declare @zon_codigoalarma varchar(10)

	select @cue_iid = cue_iid from _datos..m_cuentas
		inner join _datos..m_telefonos on tel_iidcuenta = cue_iid
		where reverse(substring(reverse( tel_ctelefono),0,9)) = reverse(substring(reverse(@from),0,9))
		and tel_ntr = 1

	print '[terminalRemotaPacketParser] @cue_iid'
	print @cue_iid

	print '[terminalRemotaPacketParser] me fijo si el mensaje esta como zona de la cuenta'
	declare @zona int
	select @zon_codigoalarma = zon_codigoalarma from _datos..m_zonas
		where zon_iidcuenta = @cue_iid
		and zon_ccodigo = @message

	print '[terminalRemotaPacketParser] @zon_codigoalarma'
	print @zon_codigoalarma

	print '[terminalRemotaPacketParser] Genero la alarma'
	if (@zon_codigoalarma is not null and @zon_codigoalarma != '')
	BEGIN
		EXEC [dbo].[AlarmaGenerar]
			@idCta = @cue_iid,
			@cAlarma = @zon_codigoalarma,
			@cZona = @message,
			@rec_nOrigen = 6, -- 6 = SMS
			@rec_iid = @rec_iid OUTPUT

		-- inserto en p_rxlog
		INSERT INTO [_Datos].[dbo].[p_RXLog] (rxl_iRecId,rxl_cLog,rxl_cDll,rxl_cEvento,rxl_cLineCard)
			VALUES (@rec_iid,LEFT(@message, 1000),'',@zon_codigoalarma,'');

	END
END