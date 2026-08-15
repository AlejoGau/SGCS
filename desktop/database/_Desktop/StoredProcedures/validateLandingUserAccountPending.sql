-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[validateLandingUserAccountPending] 
	-- Parametros para verificacion
	@imei VARCHAR(255) = ''

AS
BEGIN
	SET NOCOUNT ON;

	SELECT TOP 1 plw.*, b.id, b.preapproval_plan_id
	FROM _datos..p_landingWorkflow plw 
	full JOIN _DATOS..MP_SuscriptionRequest B ON PLW.plw_token=B.TOKEN
	WHERE plw.plw_imei = @imei order by plw.plw_status --AND plw_status = 0

	
END