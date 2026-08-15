--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.650 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.850 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[Trackguard_FlotasByUser]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(64) = '',            
 @filter NVARCHAR(2048) = '',       
 @token NVARCHAR(128),     
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT              
AS                       
	SET NOCOUNT ON              
	 
	--Load Security
	DECLARE @UserId INT
	SELECT @UserId = dbo.GetUserIdByToken(@token)  

	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
		   LEFT JOIN _Tablas.dbo.t_lineas l ON l.lin_ccodigo = um.dwm_dealer
     WHERE um.dwm_idWeb = @UserId and um.dwm_idmodules=0