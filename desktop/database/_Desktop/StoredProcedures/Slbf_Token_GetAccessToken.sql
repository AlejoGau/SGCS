--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.433 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.710 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_GetAccessToken]
	@ClientId NVARCHAR(200),
	@ClientSecret NVARCHAR(500),
	@Code NVARCHAR(500)
AS
	SET NOCOUNT ON
	
	--Valid Application
	DECLARE @ValidApplication INT
	SELECT @ValidApplication = COUNT(Id) FROM [Application] WHERE ClientId = @ClientId AND ClientSecret = @ClientSecret
	
	--Return AccessToken
	DECLARE @AccessToken NVARCHAR(500)
	SET @AccessToken = ''
	
	IF @ValidApplication = 1	
		SELECT @AccessToken = AccessToken FROM Token WHERE ClientId = @ClientId AND Code = @Code
	
	SELECT @AccessToken