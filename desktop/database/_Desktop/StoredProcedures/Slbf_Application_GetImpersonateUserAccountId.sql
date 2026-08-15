--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.220 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.510 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Application_GetImpersonateUserAccountId]
	@ClientId NVARCHAR(200)
AS
	SET NOCOUNT ON
	
	SELECT UserAccount FROM [Application] WHERE ClientId = @ClientId