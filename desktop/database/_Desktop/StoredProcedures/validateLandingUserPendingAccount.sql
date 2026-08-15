-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[validateLandingUserPendingAccount] 
	-- Parametros para verificacion
	@imei VARCHAR(255) = ''

AS
BEGIN
	SET NOCOUNT ON;
	SELECT TOP 1 plw.* FROM _datos..p_landingWorkflow plw WHERE plw.plw_imei = @imei order by plw_status --AND plw_status = 0
END