CREATE OR ALTER PROCEDURE [dbo].[RestaurarCuentaEnFalloACSearch]
	@idCuenta INT = 0
AS
BEGIN
	IF @idCuenta != 0 
		BEGIN
			Update _datos..m_status	Set sta_nEnFalloDeAC=0 Where sta_iidcuenta=@idCuenta
		END
END