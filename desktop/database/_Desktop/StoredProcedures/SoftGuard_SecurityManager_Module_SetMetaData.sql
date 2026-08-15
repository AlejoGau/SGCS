--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.120 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_Module_SetMetaData]  
 @Username NVARCHAR(50),  
 @ModuleId INT,  
 @MetaData NVARCHAR(4000)  
AS  
 SET NOCOUNT ON  
   
 DECLARE @UserId INT  
 SELECT @UserId = udw_idKey FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username  
   
 UPDATE _Sistema.dbo.UsersDesktopWebModulos SET dwm_data = @MetaData WHERE dwm_idWeb = @UserId AND dwm_idModules = @ModuleId  
   
 SELECT m.udm_idKey ModuleId, m.udm_modulo ModuleName, um.dwm_idTabla UserId, um.dwm_data MetaData, us.ums_data MetaSecurity   
   FROM _Sistema.dbo.UsersDesktopWeb u   
     INNER JOIN _Sistema.dbo.UsersDesktopWebModulos um ON um.dwm_idWeb = u.udw_idKey   
     INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND m.udm_disponible = 1
     LEFT JOIN _Sistema.dbo.UsersDesktopWebModulosSecurity us ON us.ums_idWeb = u.udw_idKey AND us.ums_idModules = um.dwm_idModules  
  WHERE u.udw_usuario = @Username   
     AND m.udm_idKey = @ModuleId