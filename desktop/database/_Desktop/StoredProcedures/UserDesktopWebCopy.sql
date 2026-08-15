--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.513 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.510 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[UserDesktopWebCopy]  
-- tomo los valores del nuevo usuario
	@nombre NVARCHAR(100),
	@apellido NVARCHAR(100),
	@usuario NVARCHAR(50), 
	@idkey int --id del usuario a copiar


	--WITH ENCRYPTION          
	AS      
	BEGIN
	SET NOCOUNT ON  

	declare @idinserted int = 0;

	-- inserto el nuevo usuario
	insert into _Sistema..UsersDesktopWeb (udw_usuario,udw_clave,udw_nombre,udw_apellido,udw_empresa,udw_estado,udw_metadata)
		select @usuario,'dzbivSz9XBwCZVdYAK7LRA==',@nombre,@apellido,udw_empresa,udw_estado,udw_metadata from _Sistema..UsersDesktopWeb where udw_idKey = @idkey;

	set @idinserted = @@Identity;

	-- inserto modulos y rangos
	insert into _Sistema..UsersDesktopWebModulos (dwm_idWeb,dwm_idModules,dwm_idTabla, dwm_dealer, dwm_cuenta_desde, dwm_cuenta_hasta, dwm_data)
		select @idinserted,dwm_idModules,dwm_idTabla, dwm_dealer, dwm_cuenta_desde, dwm_cuenta_hasta, dwm_data from _Sistema..UsersDesktopWebModulos where dwm_idWeb = @idkey;

	-- inserto configuraciones de modulos
	insert into _Sistema..UsersDesktopWebModulosSecurity (ums_idWeb, ums_idModules, ums_data)
		select @idinserted,ums_idModules, ums_data from _Sistema..UsersDesktopWebModulosSecurity where ums_idWeb = @idkey;

	--select @idinserted;
	--select * from _Sistema..UsersDesktopWeb where udw_idKey = @idinserted
	--select * from _Sistema..UsersDesktopWebModulos where dwm_idWeb = @idinserted
	--select * from _Sistema..UsersDesktopWebModulosSecurity where ums_idWeb = @idinserted
	
	EXEC UsersDesktopWebSel @idinserted     
	
	END