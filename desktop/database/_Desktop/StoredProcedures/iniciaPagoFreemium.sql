-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[iniciaPagoFreemium] 
	-- Parametros para verificacion
	@imei VARCHAR(255) = '',
	@preapproval_plan_id_mensual VARCHAR(255) = '',
	@reason VARCHAR(255) = '',
	@plw_token VARCHAR(256) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT @plw_token = plw.plw_token FROM _datos..p_landingWorkflow  plw 
	WHERE plw.plw_imei = @imei AND plw_iniciador = 'FREEMIUM'

	IF @plw_token IS NULL
	BEGIN
		SET @plw_token = 'NO'
	END
	/*ELSE
	BEGIN
		DECLARE @metadata NVARCHAR(MAX) = '';
		DECLARE @accion VARCHAR(15) = '';
		DECLARE @email VARCHAR(255) = '';


		SELECT @metadata = plw_metadata FROM _datos..p_landingWorkflow WHERE plw_token = @plw_token 

		SELECT @email = StringValue FROM parseJSON(@metadata) as metadata 
		WHERE NAME = 'email'

		DECLARE @fecha datetime;
		SET @fecha = GETDATE();
		EXEC MP_SuscriptionRequestInsert
			@fecha = @fecha,
			@token = @plw_token,
			@mail = @email,
			@preapproval_plan_id = @preapproval_plan_id_mensual,
			@reason = @reason,
			@external_reference = @plw_token,
			@payer_email = @email,
			@card_token_id = null,
			@back_url = null,
			@status = null,
			@estado = 'CREADO'
	END*/
END