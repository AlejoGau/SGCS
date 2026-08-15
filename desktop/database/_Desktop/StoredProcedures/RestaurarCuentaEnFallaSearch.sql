CREATE OR ALTER PROCEDURE [dbo].[RestaurarCuentaEnFallaSearch]
	@idCuenta INT = 0
AS
BEGIN
	IF @idCuenta != 0 
		BEGIN
			Update _datos..[m_CuentasXtraInfo]	Set [cue_iEnFalla]=0 Where [cue_iidCuenta]=@idCuenta
		END
END