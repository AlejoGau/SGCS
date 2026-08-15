--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.143 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_MembershipProvider_ChangePassword]
	@Username NVARCHAR(128),
	@OldPassword NVARCHAR(64),
	@NewPassword NVARCHAR(64)
AS
	SET NOCOUNT ON
	
	DECLARE @UserId INT
	SELECT @UserId = udw_idKey FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username and udw_clave = @OldPassword

	IF @UserId IS NOT NULL
	BEGIN
		UPDATE _Sistema.dbo.UsersDesktopWeb SET udw_clave = @NewPassword WHERE udw_idKey = @UserId
		SELECT 1
	END
	ELSE
		SELECT 0