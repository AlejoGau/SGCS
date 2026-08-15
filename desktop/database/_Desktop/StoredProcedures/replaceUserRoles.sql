-- =============================================
-- Author:		Román Rodrigo
-- Create date: 24/05/2017
-- Description:	Actualiza el rol de un usuario (para tomar rolesprovider de AD)
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[replaceUserRoles]
	-- Add the parameters for the stored procedure here
	@username varchar(250),
	@roles varchar(1024)
AS
BEGIN
	SET NOCOUNT ON;

	-- busco el ID del role real pasado (pueden llegar roles de AD inexistentes en la plataforma, tomo el primero existente)
	declare @roleid int;
	select top 1 @roleid=udw_idkey from _sistema..usersdesktopweb u
		where udw_usuario COLLATE DATABASE_DEFAULT in (select * from dbo.ParseArray(@roles, ',')) 
		and udw_tipo = 11 --solo usuarios tipo perfil

	if @roleid >0
	BEGIN
		print '[replaceUserRoles] aplico el perfil al usuario'
		update _sistema..usersdesktopweb set udw_iperfil = @roleid
			where udw_usuario COLLATE DATABASE_DEFAULT = @username COLLATE DATABASE_DEFAULT

		select 'Se actualizo el usuario '+@username +' con el role '+ convert(varchar(10),@roleid)
	END
	ELSE
	BEGIN
		select 'No existe el role'
	END

END