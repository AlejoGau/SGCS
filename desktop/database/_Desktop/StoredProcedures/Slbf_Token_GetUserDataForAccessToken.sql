--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.640 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.900 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_GetUserDataForAccessToken]   
 @AccessToken NVARCHAR(500)  
AS  
 SET NOCOUNT ON  
   
 SELECT UserData FROM Token WHERE AccessToken = @AccessToken