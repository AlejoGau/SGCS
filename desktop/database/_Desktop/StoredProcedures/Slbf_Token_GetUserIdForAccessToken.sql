--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.697 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.960 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_GetUserIdForAccessToken]	
	@AccessToken NVARCHAR(500)
AS
	SET NOCOUNT ON
	
	SELECT UserId FROM Token WHERE AccessToken = @AccessToken