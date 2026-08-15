--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.270 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.560 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Application_GetRequestURI]
	@ClientId NVARCHAR(200)
AS
	SET NOCOUNT ON
	
	SELECT RequestURI FROM [Application] WHERE ClientId = @ClientId