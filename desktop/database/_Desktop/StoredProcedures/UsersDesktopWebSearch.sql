CREATE OR ALTER PROCEDURE [dbo].[UsersDesktopWebSearch]
					@Id Int
	--WITH ENCRYPTION
	AS
		Select [udw_idKey] Id, '' Name
		, [udw_idKey], [udw_usuario], [udw_clave], [udw_nombre], [udw_apellido], [udw_empresa], [udw_tipo], [udw_iperfil]
		from _sistema..UsersDesktopWeb
		where [udw_idKey] = @Id