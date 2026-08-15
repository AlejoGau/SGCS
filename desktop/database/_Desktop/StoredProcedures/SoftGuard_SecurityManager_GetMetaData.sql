--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.700 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_GetMetaData]
 @UserId INT,
 @Username NVARCHAR(50)
AS
	SET NOCOUNT ON
	
	IF @UserId = 0
		SELECT @UserId = udw_idKey FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username  		
	
	SELECT udw_metadata FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId