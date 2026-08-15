CREATE OR ALTER PROCEDURE [dbo].[IPRS_getCmdAccountData]
	@idcuenta [int]
WITH EXECUTE AS CALLER
AS
BEGIN
	SET NOCOUNT ON;
	declare @remoteCmdIp varchar(20)
	,@remoteCmdPort int
	,@strAssembly varchar(50)
	,@imei varchar(50)

	select @remoteCmdIp = pan_cremoteip
		,@remoteCmdPort = pan_iremoteport
		,@strAssembly = rec_cdll
		from _datos..m_paneles 
		left join _datos..m_receptores_cab on rec_iid = pan_ireceptor
		where pan_iidcuenta = @idcuenta

	-- si no tengo receptor asociado pruebo de buscar el vehiculo
	print @strAssembly
	if (@strAssembly is null)
	BEGIN
		print 'si no tengo receptor asociado pruebo de buscar el vehiculo'
		select @strAssembly = rec_cdll
			from _datos..m_receptores_cab
			inner join _datos..equipodispositivomovil on (rec_iid = idequipo and idcuenta = @idcuenta)
	END

	select  @imei = cue_cimei from _datos..m_cuentas where cue_iid = @idcuenta

	select @remoteCmdIp remoteCmdIp,@remoteCmdPort remoteCmdPort,@strAssembly strAssembly,@imei imei
END