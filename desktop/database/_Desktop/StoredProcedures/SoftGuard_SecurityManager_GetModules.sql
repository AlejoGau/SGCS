--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.070 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_SecurityManager_GetModules]    
 @Username NVARCHAR(50),
 @remoteIp varchar(200) = ''
AS    
 SET NOCOUNT ON    
     
 DECLARE @UserId INT  
 declare @udw_metadata varchar(max)
 SELECT @UserId = udw_idKey, @udw_metadata = udw_metadata FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username  

 -- si me mandan remoteip, valido que el usuario tenga derechos desde esa ip.
 if (@remoteIp <> '')
 BEGIN
	-- busco si controlaIP
	declare @controla int

	BEGIN TRY  
		select @controla = convert(int,isnull(replace(stringvalue,'null',''),'0')) from dbo.parseJSON(@udw_metadata) where name = 'controlaIp'
	END TRY  
	BEGIN CATCH  
		print 'hubo un error al parsear la metadata del usuario para controlar ip remota'
		select @controla = 0 
	END CATCH;  
	

	if (@controla = 1)
	BEGIN
		-- tengo que controlar
		declare @incluido int
		select @incluido = count(*) from _sistema..s_ip_range
			where dbo.IPAddressToInteger(@remoteIp) >= dbo.IPAddressToInteger(ipr_desde) and
			dbo.IPAddressToInteger(@remoteIp) <= dbo.IPAddressToInteger(ipr_hasta)
			and ipr_estado = 1

		if (@incluido = 0)
		begin
			declare @msg varchar(500)
			select @msg = 'El usuario esta fuera del rango de IPs '+@remoteIp
			raiserror (@msg, 16,1)
		end
	END
 END
  
 SELECT DISTINCT m.udm_idKey ModuleId, m.udm_modulo ModuleName, m.udm_key_reference KeyReference, um.dwm_idTabla UserId, um.dwm_data MetaData, us.ums_data MetaSecurity,
 (case when dwm_idKey is null then 0 else 1 end) Available
 --udm_disponible as Available
 , ui.Version AppVersion    , m.udm_disponible
   FROM _Sistema.dbo.UsersDesktopModules m  
     LEFT JOIN _Sistema.dbo.UsersDesktopWebModulos um ON um.dwm_idModules = m.udm_idKey AND m.udm_disponible in (1,2,3) AND um.dwm_idWeb = @UserId  
     LEFT JOIN _Sistema.dbo.UsersDesktopWebModulosSecurity us ON us.ums_idWeb = @UserId AND us.ums_idModules = m.udm_idKey
     LEFT JOIN _Desktop.dbo.UIApplication ui ON ui.Name COLLATE DATABASE_DEFAULT = m.udm_key_reference COLLATE DATABASE_DEFAULT
	WHERE m.udm_disponible in (1,2,3)
	order by ModuleName