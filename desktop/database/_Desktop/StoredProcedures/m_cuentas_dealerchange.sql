-- =============================================
-- Author:		Rodrigo Roman
-- Create date: 2022/11/30
-- Description:	Mover una cuenta de dealer buscando el próximo ncuenta disponible
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[m_cuentas_dealerchange] 
	-- Add the parameters for the stored procedure here
	--@cue_iid int,
	@imei varchar(255),
	@cue_clinea char(3),
	@iniciador VARCHAR(50) = '',
	@token VARCHAR(255) OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @cue_iid int;
	declare @pushToken varchar(1024) = '';
	declare @id int;

	IF (@iniciador = 'cupon')
	BEGIN
		SET @iniciador = 'FREEMIUM_CUPON'
	END
	ELSE
	BEGIN
		SET @iniciador = 'FREEMIUM_MP'
	END

	SELECT @id = ID, @cue_iid = CuentaId, @pushToken = pushToken FROM _Datos..SmartPanic
	WHERE Imei = @imei

	declare @ncuenta char(10)
    -- primero busco el proximo ncuenta disponible en el dealer.
	exec _Desktop..SearchCuentaProximoNumero @cue_clinea = @cue_clinea, @cue_ncuenta=@ncuenta OUTPUT

	update _Datos..m_cuentas set cue_clinea=@cue_clinea, cue_ncuenta=@ncuenta where cue_iid=@cue_iid

	SELECT @token = plw.plw_token FROM _datos..p_landingWorkflow  plw 
	WHERE plw.plw_imei = @imei AND plw_iniciador = 'FREEMIUM'

	UPDATE _datos..p_landingWorkflow
	SET plw_iniciador = @iniciador
	WHERE plw_token = @token;

	/*exec [dbo].[MP_SuscriptionRequestUpdate]
	@token = @token,
	@estado = 'authorized';*/

	IF (@token != '' AND @token is not null)
	BEGIN
		EXEC _desktop..[createPushMessage]
			@spId = @id,
			@spToken = @pushToken,
			@msgType = 'UPDATE_LOGIN',
			@data = NULL
	END



END