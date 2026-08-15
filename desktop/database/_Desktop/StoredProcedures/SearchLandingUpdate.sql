--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.893 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchLandingUpdate]
	@lcfg_iid VARCHAR(MAX),
	@lcfg_ccontent VARCHAR(MAX) = ''	 
	AS
	BEGIN
	SET NOCOUNT ON
		UPDATE _Datos..LandingConfig
		SET lcfg_ccontent = @lcfg_ccontent
		WHERE lcfg_iid = @lcfg_iid
	END