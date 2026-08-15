CREATE OR ALTER PROCEDURE [dbo].[EliminarP_GpsByCuentaSearch]
	@idCuenta INT = 0
AS
BEGIN
  
	IF @idCuenta != 0 
		BEGIN
			DELETE _Datos..p_Gps WHERE gps_idCuenta= @idCuenta;

		END
END