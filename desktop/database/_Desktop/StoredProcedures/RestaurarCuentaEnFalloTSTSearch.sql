CREATE OR ALTER PROCEDURE [dbo].[RestaurarCuentaEnFalloTSTSearch]
	@idCuenta INT = 0
AS
BEGIN
	IF @idCuenta != 0 
		BEGIN
			Update _datos..m_status	Set 
				sta_ncuentaenfallo2dotst=0,
				sta_ncuentaenfallodetst=0,
				sta_ncuentaenfallo3ertst=0,
				sta_dfechaultimo2dotst=null,
				sta_dfechaultimotst=null,
				sta_dfechaultimo3ertst=null
				Where sta_iidcuenta=@idCuenta

			Delete From _datos..[EventosEnFalloTesteo]
				Where [eft_iidCuenta] = @idCuenta 
		END
END