CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_Module_SetSecurity]  
 @Username VARCHAR(50),  
 @ModuleId INT,  
 @MetaData VARCHAR(MAX),
 @Token nvarchar(500) = ''
AS  
 SET NOCOUNT ON  
   
 DECLARE @UserId INT  
 SELECT @UserId = udw_idKey FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username  

 declare @metadataOld varchar(max)

 select @metadataOld = ums_data FROM _Sistema.dbo.UsersDesktopWebModulosSecurity WHERE ums_idWeb = @UserId AND ums_idModules = @ModuleId
   
 DELETE FROM _Sistema.dbo.UsersDesktopWebModulosSecurity WHERE ums_idWeb = @UserId AND ums_idModules = @ModuleId
 INSERT INTO _Sistema.dbo.UsersDesktopWebModulosSecurity (ums_idWeb, ums_idModules, ums_data) VALUES (@UserId, @ModuleId, @MetaData) 

 -- inserto auditoria
 if @token!=''
 BEGIN
	EXECUTE [_Desktop].[dbo].[SoftGuard_FrameworkAuditSet] 
		1
		,3215
		,@UserId
		,'Modificar'
		,@metadataOld
		,@MetaData
		,@Token
END

 SELECT m.udm_idKey ModuleId, m.udm_modulo ModuleName, um.dwm_idTabla UserId, um.dwm_data MetaData, us.ums_data MetaSecurity   
   FROM _Sistema.dbo.UsersDesktopWeb u   
     INNER JOIN _Sistema.dbo.UsersDesktopWebModulos um ON um.dwm_idWeb = u.udw_idKey   
     INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND m.udm_disponible = 1
     LEFT JOIN _Sistema.dbo.UsersDesktopWebModulosSecurity us ON us.ums_idWeb = u.udw_idKey AND us.ums_idModules = um.dwm_idModules
  WHERE u.udw_usuario = @Username   
     AND m.udm_idKey = @ModuleId