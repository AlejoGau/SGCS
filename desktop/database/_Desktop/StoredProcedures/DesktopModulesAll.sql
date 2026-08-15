--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.350 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[DesktopModulesAll]
@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort NVARCHAR(64) = '',            
	@filter NVARCHAR(2048) = '',      
	@_dc NVARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT     
AS
	SET NOCOUNT ON
	
	SELECT * FROM _Sistema.dbo.UsersDesktopModules