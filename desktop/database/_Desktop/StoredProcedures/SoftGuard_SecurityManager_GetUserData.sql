--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.333 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.403 
--#############################################################################




CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_GetUserData]
	@UserName NVARCHAR(50)
AS
	SET NOCOUNT ON

	SELECT udw_usuario, udw_nombre, udw_apellido, udw_empresa, o.Name OrganizationName, udw_idKey, udw_tipo, udw_iperfil
	  FROM _Sistema.dbo.UsersDesktopWeb w
	  left join _datos..Organization o on(w.udw_empresa = convert(varchar, o.id))
	 WHERE udw_usuario = @UserName