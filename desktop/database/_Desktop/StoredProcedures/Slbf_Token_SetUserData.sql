--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.880 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.127 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_SetUserData]
 @AccessToken NVARCHAR(500),
 @UserData NVARCHAR(MAX)	
AS
	SET NOCOUNT ON
	
	UPDATE Token set UserData = @UserData where AccessToken = @AccessToken