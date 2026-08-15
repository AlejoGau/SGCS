--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.883 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.130 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[CuentaUserLogin]
	@token NVARCHAR(128) = '',
	@user NVARCHAR(128),
	@clave NVARCHAR(128),
	@imei NVARCHAR(128),
	@userid int = 0
AS 
	SET NOCOUNT ON

	
		   	
	--Chequeo si el usuario y pass son validos
	DECLARE @uservalid INT	
	SELECT @uservalid = COUNT(*) FROM _Datos.dbo.[m_usuarios] u
		inner join _Datos.dbo.smartpanic s on (s.cuentaid = u.usu_iidcuenta) 
		WHERE [usu_cnombre] = @user 
		AND [usu_cclave] = @clave 
		AND s.Imei = @imei
			
	
	
	--Return
	IF @uservalid != 0
		BEGIN
		select top 1 @userid = usu_iid FROM _Datos.dbo.[m_usuarios] u
		inner join _Datos.dbo.smartpanic s on (s.cuentaid = u.usu_iidcuenta) 
		WHERE [usu_cnombre] = @user 
		AND [usu_cclave] = @clave 
		AND s.Imei = @imei

		SELECT 1 AS Codigo, 'OK' AS Descripcion, @userid as userId
		END
	ELSE 
		SELECT 2 AS Codigo, 'ERROR' AS Descripcion, null as userId