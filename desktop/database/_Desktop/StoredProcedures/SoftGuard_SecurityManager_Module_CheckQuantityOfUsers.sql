CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_Module_CheckQuantityOfUsers]
	@ModuleId INT
AS
	SET NOCOUNT ON
	
	SELECT m.udm_key_reference AS KeyReference, COUNT(DISTINCT dwm_idWeb) AS QuantityOfUsers
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
		   RIGHT JOIN _Sistema.dbo.UsersDesktopModules m ON um.dwm_idModules = m.udm_idKey
	 WHERE m.udm_idKey = @ModuleId
	 GROUP BY m.udm_key_reference