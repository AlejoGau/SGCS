-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[EliminaIntentoPago] 
	-- Parametros para verificacion
	@imei VARCHAR(256)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @token VARCHAR(255)

	SELECT @token = plw.plw_token FROM _datos..p_landingWorkflow  plw 
	WHERE plw.plw_imei = @imei 

	DELETE _Datos..MP_SuscriptionRequest
	WHERE token = @token

	DELETE _Datos..p_landingWorkflow
	WHERE plw_imei = @imei
	
END