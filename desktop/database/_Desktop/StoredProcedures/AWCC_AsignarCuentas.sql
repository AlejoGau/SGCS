--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.893 
--#############################################################################
 CREATE OR ALTER PROCEDURE [dbo].[AWCC_AsignarCuentas]
	@Accion CHAR(1),
	@nombrelogin NVARCHAR(100),
	@cue_iid INT
 AS
	SET NOCOUNT ON
	--@Accion CHAR(1)'A' y 'B'
	
	exec _Sistema.dbo.UsuariosAWCC_AsignarCuentas @Accion, @nombrelogin, @cue_iid