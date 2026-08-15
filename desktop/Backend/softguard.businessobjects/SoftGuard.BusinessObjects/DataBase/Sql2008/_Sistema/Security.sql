ALTER TABLE UsersDesktopWeb ADD udw_nombre VARCHAR(64)
GO
ALTER TABLE UsersDesktopWeb ADD udw_apellido VARCHAR(64)
GO
ALTER TABLE UsersDesktopWeb ADD udw_empresa VARCHAR(64)
GO

CREATE PROCEDURE SoftGuard_SecurityManager_GetUserData
	@UserName VARCHAR(50)
AS
	SET NOCOUNT ON

	SELECT udw_usuario, udw_nombre, udw_apellido, udw_empresa
	  FROM UsersDesktopWeb
	 WHERE udw_usuario = @UserName
GO

CREATE PROCEDURE SoftGuard_MembershipProvider_ValidateUser
	@Username VARCHAR(50),
	@Password VARCHAR(10)
AS
	SET NOCOUNT ON
	
	SELECT COUNT(*) FROM UsersDesktopWeb WHERE udw_usuario = @Username AND udw_clave = @Password
GO

CREATE PROCEDURE SoftGuard_SecurityManager_GetModules
	@Username VARCHAR(50)
AS
	SET NOCOUNT ON
	
	SELECT m.udm_idKey ModuleId, m.udm_modulo ModuleName, um.dwm_idTabla UserId, um.dwm_data MetaData 
	  FROM UsersDesktopWeb u 
		   INNER JOIN UsersDesktopWebModulos um ON um.dwm_idWeb = u.udw_idKey 
		   INNER JOIN UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND m.udm_disponible = 1
	 WHERE u.udw_usuario = @Username
GO	

CREATE PROCEDURE SoftGuard_SecurityManager_Module_SetMetaData
	@Username VARCHAR(50),
	@ModuleId INT,
	@MetaData VARCHAR(4000)
AS
	SET NOCOUNT ON
	
	DECLARE @UserId INT
	SELECT @UserId = udw_idKey FROM UsersDesktopWeb WHERE udw_usuario = @Username
	
	UPDATE UsersDesktopWebModulos SET dwm_data = @MetaData WHERE dwm_idWeb = @UserId AND dwm_idModules = @ModuleId

	SELECT m.udm_idKey ModuleId, m.udm_modulo ModuleName, um.dwm_idTabla UserId, um.dwm_data MetaData 
	  FROM UsersDesktopWeb u 
		   INNER JOIN UsersDesktopWebModulos um ON um.dwm_idWeb = u.udw_idKey 
		   INNER JOIN UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND m.udm_disponible = 1
	 WHERE u.udw_usuario = @Username 
		   AND m.udm_idKey = @ModuleId
GO	