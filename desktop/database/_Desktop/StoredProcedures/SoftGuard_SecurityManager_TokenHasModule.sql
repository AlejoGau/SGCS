CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_TokenHasModule]    
 @Token NVARCHAR(256),
 @Module varchar(200) = '',
 @hasModule int=0 OUT
AS    
 SET NOCOUNT ON    
  
 SELECT @hasModule = count(*)    
   FROM _Sistema.dbo.UsersDesktopWeb u
	 inner join _datos..token t on u.udw_usuario = t.[UserId] and t.AccessToken = @Token
	 inner JOIN _Sistema.dbo.UsersDesktopWebModulos um ON u.udw_idkey = um.dwm_idWeb
	 inner join _sistema..usersdesktopmodules m on um.dwm_idModules = m.udm_idKey 
     
	WHERE m.udm_disponible in (1,2) and m.udm_key_reference = @Module
    

select @hasModule as hasModule;