CREATE OR ALTER PROCEDURE [dbo].[TimeToLiveCreateUpdateByTokenServiceProxy]
		@Token NVARCHAR(500),
		@operadorName VARCHAR (256) = 'TEST'
AS
BEGIN

	-- saco el try catch porque debo dejar que falle en la interfaz para que desconecte al usuario

	--BEGIN TRY
		EXEC _Desktop..TimeToLiveCreateUpdateByTokenService 
			@operadorName = @operadorName, @Token = @Token, @Service = 'monitoreo'
	/*END TRY
	BEGIN CATCH
		select 1 Error, ERROR_MESSAGE() as [Message]
	END CATCH*/
END