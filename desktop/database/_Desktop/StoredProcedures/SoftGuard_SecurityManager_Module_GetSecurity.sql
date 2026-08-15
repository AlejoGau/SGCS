CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_Module_GetSecurity]
	@UserName VARCHAR(256),
	@ModuleId INT,
	@UserId INT = ''
AS
	SET NOCOUNT ON
	
	IF @UserId = '' 
	BEGIN
		--DECLARE @UserId INT	
		SELECT @UserId = udw_idKey FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @UserName
	END
	
	SELECT ums_data
      FROM _Sistema.dbo.UsersDesktopWebModulosSecurity               
     WHERE ums_idWeb = @UserId
		   AND ums_idModules = @ModuleId