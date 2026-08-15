--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.463 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.387 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[DesktopModulesByUser]        
 @Id INT,        
 @page INT = 1,                       
 @start INT = 0,                       
 @limit INT = 50,                       
 @sort NVARCHAR(64) = '',                    
 @filter NVARCHAR(2048) = '',              
 @_dc NVARCHAR(256) = '',                      
 @totalrows INT = 1 OUTPUT                       
AS          
 SET NOCOUNT ON          
        
 SELECT DISTINCT m.udm_idKey, m.udm_modulo, m.udm_key_reference, dwm_idKey         
   FROM _Sistema.dbo.UsersDesktopModules m        
     INNER JOIN _Sistema.dbo.UsersDesktopWebModulos um ON um.dwm_idModules = m.udm_idKey AND m.udm_disponible IN (1,3) AND um.dwm_idWeb = @Id