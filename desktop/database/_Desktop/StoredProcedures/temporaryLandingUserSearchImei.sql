-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[temporaryLandingUserSearchImei] 
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
END