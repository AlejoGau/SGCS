-- =============================================
-- Author:		RodrigoRoman
-- Create date: 30/03/2020
-- Description:	Pide el envio de una activacion para smartpanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SmartpanicsSendActivacionSearch]
	-- Add the parameters for the stored procedure here
	@telefono varchar(25),
	@resend int = 3, -- 3: forcenew, 1: resend, 2: fail?
	@sendsms int = 1, --1: envia sms, 2: crea activacion pero no envia
	@iModemSMS int ,
	@_dc varchar(255)='',
	@token varchar(255)=''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @spa_idkey int;
	declare @smartpanicid int;
	DECLARE @tokenstatus int; -- 1: creado con exito, 2: ya existe
	declare @cuentaid int;
	
	declare @message varchar(144);
	declare @activationtoken varchar(255)

	print '[SmartpanicsSendActivacionSearch] me fijo si el telefono corresponde a un SP activo.'
	select @smartpanicid = id, @cuentaid = CuentaId from _datos..SmartPanic where RIGHT(Telefono, 8) = RIGHT(@telefono, 8)

	print '[SmartpanicsSendActivacionSearch] me fijo si ya hay in codigo de activacion pendiente'
	select @spa_idkey = spa_idkey from _datos..SmartPanicActivacion 
		where RIGHT(spa_telefono, 8) = RIGHT(@telefono, 8)
		and spa_status = 1
		and @smartpanicid = [spa_smartpanicsiid]

	-- si hay un token pendiente lo anulo para crear otro
	if @spa_idkey>0 and @resend = 3
	BEGIN
		update _datos..SmartPanicActivacion set spa_status = 3 where spa_idkey = @spa_idkey
		select @spa_idkey = null
	END

	-- creo un nuevo token
	if @spa_idkey is null AND @smartpanicid>0
	BEGIN
		print '[SmartpanicsSendActivacionSearch] creo un nuevo token'
		EXECUTE _desktop.[dbo].[SmartpnicsCreateActivationToken] 
		   @telefono
		  ,@smartpanicid
		  ,@spa_idkey OUTPUT
		  ,@tokenstatus OUTPUT
		  ,@activationtoken OUTPUT
	END

	select @message = 'Su token de activación es '+@activationtoken

	print '[SmartpanicsSendActivacionSearch] busco el modem correcto para la cuenta'

	print '[SmartpanicsSendActivacionSearch] envío el codigo al usuario'
	IF @spa_idkey>0 and (@tokenstatus = 1 OR @resend = 1) and @sendsms = 1
	BEGIN
		EXEC _datos..SGSP_SaveSMSQueue 
			@cuentaid,@iModemSMS,@message,@telefono,null
	END


	print '[SmartpanicsSendActivacionSearch] devuelvo el estado final'
	if @tokenstatus = 2
		select '2' as status, 'Ya existe un token' as message -- no deberia pasar
	else if @tokenstatus = 1
		select '1' as status, 'El token se creó con éxito' as message, @activationtoken as token
	else if @smartpanicid is null
		select '3' as status, 'El dispositivo no existe' as message
	else if @spa_idkey > 0
		select '2' as status, 'Ya existe un token' as message
END