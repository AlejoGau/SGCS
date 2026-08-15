--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.827 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.977 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_RenewAccessToken]
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
	BEGIN
		--RENEW ACCESSTOKEN		
		UPDATE Token SET AccessToken = NEWID() WHERE ClientId = @ClientId AND Code = @Code
		
		--GET ACCESSTOKEN
		SELECT @AccessToken = AccessToken FROM Token WHERE ClientId = @ClientId AND Code = @Code
	END
	
	SELECT @AccessToken