-- =============================================
-- Author:		Rodrigo Román
-- Create date: 13/9/2022
-- Description:	Actualiza imei del sp luego de login exitoso, obtiene datos.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[GetUpdateSpLogin] 
	-- Add the parameters for the stored procedure here
	@user varchar(50),
	@imei varchar(128)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @msg varchar(1024)
	print 'me fijo que haya uno y solo un SP para ese usuario'
	declare @count int=0;
	select @count = count(u.udw_idKey) from _datos..SmartPanic sp with (nolock)
	inner join _Sistema..UsersDesktopWeb u with (nolock) on sp.awccUserId = u.udw_idKey
	where u.udw_usuario = @user

	IF @count = 0
	BEGIN
		set @msg = 'No se encontro SP para el usuario '+@user
		RAISERROR(@msg, 16, 1)
		RETURN --exit now
	END
	ELSE IF @count > 1
	BEGIN
		set @msg = 'Hay multiples SP para el usuario '+@user
		RAISERROR(@msg, 16, 1)
		RETURN --exit now
	END

	print 'actualizo los datos del imei'
	declare @udw_idKey int
	select top 1 @udw_idKey =  u.udw_idKey  from _datos..SmartPanic sp with (nolock)
	inner join _Sistema..UsersDesktopWeb u with (nolock) on sp.awccUserId = u.udw_idKey
	where u.udw_usuario = @user

	update _datos..SmartPanic set Imei=@imei where awccUserId= @udw_idKey

    print 'obtengo los datos del SP y el usuario.'
	select top 1 udw_idKey,sp.CuentaId,sp.Id,sp.Telefono, sp.Nombre from _datos..SmartPanic sp with (nolock)
	inner join _Sistema..UsersDesktopWeb u with (nolock) on sp.awccUserId = u.udw_idKey
	where u.udw_usuario  = @user and sp.Imei = @imei

END