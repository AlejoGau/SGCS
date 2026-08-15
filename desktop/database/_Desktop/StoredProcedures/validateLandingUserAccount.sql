-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[validateLandingUserAccount] 
	-- Parametros para verificacion
	@numeroAbonado VARCHAR(4) = '',
	@palabraClave VARCHAR(128) = '',
	@telefono VARCHAR(128) = ''

AS
BEGIN
	SET NOCOUNT ON;

	-- Selecciono la cuenta a asociar el SmartPanics, en base a los datos ingresados en el FORM de la APP
	SELECT TOP 1 c.*
	FROM _datos..m_cuentas c
		LEFT JOIN _datos..m_telefonos mt ON (mt.tel_iidcuenta = c.cue_iid)
		LEFT JOIN _datos..m_usuarios usu ON (usu.usu_iidcuenta = c.cue_iid)
	WHERE c.cue_ncuenta = @numeroAbonado
		AND mt.tel_ctelefono LIKE '%'+RIGHT(@telefono,6)+'%'
		AND ( mt.tel_cclave = @palabraClave OR usu.usu_cclave = @palabraClave )
END