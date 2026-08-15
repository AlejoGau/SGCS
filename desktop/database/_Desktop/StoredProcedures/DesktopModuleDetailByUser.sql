--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.540 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[DesktopModuleDetailByUser]  
 @Module NVARCHAR(128),
 @Id INT = 0, 
 @token NVARCHAR(256) = '',
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort NVARCHAR(64) = '',              
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',                
 @totalrows INT = 1 OUTPUT                 
AS    
begin
 SET NOCOUNT ON    
 
 IF @Id = 0
 BEGIN	
	SELECT @Id = dbo.GetUserIdByToken(@token)
 END
  
 SELECT um.*
   FROM _Sistema.dbo.UsersDesktopModules m  
     INNER JOIN _Sistema.dbo.UsersDesktopWebModulos um ON um.dwm_idModules = m.udm_idKey AND m.udm_disponible = 1 AND um.dwm_idWeb = @Id AND m.udm_key_reference = @Module

end