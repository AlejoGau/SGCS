--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.333 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[DesktopModulesValidator]                
 @id INT,
 @modulo INT,
 @dealer NVARCHAR(3),
 @desde NVARCHAR(4),
 @hasta NVARCHAR(4),
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(64) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT              
AS                
 SET NOCOUNT ON
 
 --Valid desde
 DECLARE @DesdeValid INT
 SELECT @DesdeValid = COUNT(*) 
   FROM _Sistema.dbo.UsersDesktopWebModulos 
  WHERE dwm_idWeb = @id 
	    AND dwm_idModules = @modulo 
	    AND dwm_dealer = @dealer 
	    AND @desde BETWEEN dwm_cuenta_desde AND dwm_cuenta_hasta
 
 --Valid hasta
 DECLARE @HastaValid INT
 SELECT @HastaValid = COUNT(*) 
   FROM _Sistema.dbo.UsersDesktopWebModulos 
  WHERE dwm_idWeb = @id 
	    AND dwm_idModules = @modulo 
	    AND dwm_dealer = @dealer 
	    AND @hasta BETWEEN dwm_cuenta_desde AND dwm_cuenta_hasta
	   
  IF @DesdeValid != 0 AND @HastaValid != 0 	    
	SELECT 1 AS Codigo, 'RangoInvalido' AS Descripcion     	    
  ELSE IF @DesdeValid != 0
     SELECT 2 AS Codigo, 'RangoDesdeInvalido' AS Descripcion     	    
  ELSE IF @HastaValid != 0
     SELECT 3 AS Codigo, 'RangoHastaInvalido' AS Descripcion