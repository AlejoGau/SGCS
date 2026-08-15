--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.467 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.747 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_GetClientIdForAccessToken]
 @AccessToken NVARCHAR(500)  
AS  
 SET NOCOUNT ON  
   
 SELECT ClientId FROM Token WHERE AccessToken = @AccessToken