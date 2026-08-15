--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.610 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.793 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_GetCode]
	@ClientId NVARCHAR(200),
	@UserId NVARCHAR(200)
AS
	SET NOCOUNT ON
	
	--Valid Application
	DECLARE @ValidApplication INT
	SELECT @ValidApplication = COUNT(Id) FROM [Application] WHERE ClientId = @ClientId
		
	IF @ValidApplication = 1			
		SELECT Code FROM Token WHERE ClientId = @ClientId AND UserId = @UserId