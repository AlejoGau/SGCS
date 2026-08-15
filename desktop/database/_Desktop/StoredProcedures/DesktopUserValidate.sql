--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.653 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.570 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[DesktopUserValidate]
	@username NVARCHAR(128) = ''
	
	AS 
	SET NOCOUNT ON
	
	-- busco si hay un usuario con ese nombre
	DECLARE @UserId INT
	DECLARE @Exists INT	
	SELECT @Exists = COUNT(*) FROM _Sistema..UsersDesktopWeb WHERE udw_usuario = @username

	
	--Return
	IF @Exists != 0
		SELECT 1 AS Codigo, 'Usuario Existe' AS Descripcion