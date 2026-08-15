--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.583 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_SetMetaData]
 @UserId INT,
 @Username NVARCHAR(50),
 @MetaData NVARCHAR(MAX)  
AS
	SET NOCOUNT ON
	
	IF @UserId = 0  
		SELECT @UserId = udw_idKey FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username  
	
	UPDATE _Sistema.dbo.UsersDesktopWeb SET udw_metadata = @MetaData WHERE udw_idKey = @UserId
	
	SELECT udw_metadata FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId