-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[temporaryLandingUserUpdate] 
	-- Parametros para verificacion
	@token VARCHAR(255) = ''

AS
BEGIN
	SET NOCOUNT ON;



	UPDATE _datos..p_landingWorkflow
	SET plw_status = 1
	WHERE plw_token = @token
	
END