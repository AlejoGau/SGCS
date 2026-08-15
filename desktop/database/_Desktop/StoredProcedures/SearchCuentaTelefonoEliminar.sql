-- =============================================
-- Author:		<dedalo>
-- Create date: <02/09/2014>
-- Description:	<elimina todos los contactos de una cuenta (para luego importar de cero)>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SearchCuentaTelefonoEliminar] 
	(@idCuenta int,
	@token varchar(128))
AS
BEGIN

	SET NOCOUNT ON;
	declare @count int = 0;

	if(@idCuenta is null or @idCuenta = 0)
	begin
		select 1 Error, 'La cuenta no es válida' Message
		return;	
	end

	select @count = count(t.tel_iidcuenta) from _Datos..m_telefonos t where tel_iidcuenta = @idCuenta;
	delete from _Datos..m_telefonos where tel_iidcuenta = @idCuenta
    select 0 Error, 'OK' Message
END