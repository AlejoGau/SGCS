CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_GetModulesFree]
AS
	SET NOCOUNT ON
		
	SELECT set_modules FROM _Sistema.dbo.S_seteos WHERE set_nId = 4