CREATE OR ALTER PROCEDURE [dbo].[AWCC_ObtenerToken]
	@UserId VARCHAR(256)
AS
	SET NOCOUNT ON

	DECLARE @ClientId VARCHAR(256)
	SELECT @ClientId = ClientId FROM Application WHERE Name = 'Desktop'

	SELECT AccessToken FROM Token WHERE UserId = @UserId AND ClientId = @ClientId