-- =============================================
-- Author:		Román Rodrigo
-- Create date: 16/05/2017
-- Description:	aplica un perfil a un usuario
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ApplyProfile]
	@udw_iperfil int,
	@udw_idkey int
AS
BEGIN
	SET NOCOUNT ON;
	-- tomo el operador para que no se pise

	Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  

	Set @message = 'Start DateTime : %s | [ApplyProfile]'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @ope_iid int = 0;
	declare @ums_data_module2_WebRemoto NVARCHAR(max) = ''
	declare @ums_data_module42_WebRemotoMobile NVARCHAR(max) = ''
	declare @ums_data_WRPerfil NVARCHAR(max) = ''
	declare @ums_data_WRMPerfil NVARCHAR(max) = ''

	declare @usuario NVARCHAR(500)='';
	DECLARE @awccDealerOld VARCHAR(MAX) = '';
	declare @Instalador VARCHAR(3) = '';

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | SELECT @opeiid, @usuario'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	select top 1 @ope_iid = operador,@usuario = usuario,@ums_data_module2_WebRemoto=ums_data  from [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		outer apply (select stringValue as operador from dbo.parseJSON(ums_data) where name = 'ope_iid') as json
		outer apply (select stringValue as usuario from dbo.parseJSON(ums_data) where name = 'Usuario') as json2
		where ums_idModules = 2		--2.WebRemoto
		and ums_idWeb = @udw_idkey

	select top 1 @ope_iid = operador,@usuario = usuario,@ums_data_WRPerfil=ums_data  from [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		outer apply (select stringValue as operador from dbo.parseJSON(ums_data) where name = 'ope_iid') as json
		outer apply (select stringValue as usuario from dbo.parseJSON(ums_data) where name = 'Usuario') as json2
		where ums_idModules = 2		--2.WebRemoto
		and ums_idWeb = @udw_iperfil

	/******Daniel O. Medina https://softguard.atlassian.net/browse/DSS-721 ********/

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | GUARDO PIN DE WebRemotoMobile'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	select @ums_data_module42_WebRemotoMobile=ums_data from [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		where ums_idModules = 42	--42.WebRemotoMobile
		and ums_idWeb = @udw_idkey
	/******************************************************************************/
	select @ums_data_WRMPerfil=ums_data from [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		where ums_idModules = 42	--42.WebRemotoMobile
		and ums_idWeb = @udw_iperfil

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | SELECT @Instalador'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	select top 1 @Instalador = case when Instalador='null' then '' else Instalador end  from [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		outer apply (select stringValue as Instalador from dbo.parseJSON(ums_data) where name = 'Instalador') as json
		where ums_idModules = 3		--3.SerTec
		and ums_idWeb = @udw_idkey

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | @Instalador = '+@Instalador
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT


	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | SELECT @awccDealerOld'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	select top 1 @awccDealerOld = rights  from [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]	
		outer apply (select stringValue as rights from dbo.parseJSON(ums_data) where name = 'dealer') as json	
		where ums_idModules = 11	--11.AWCC
		and ums_idWeb = @udw_idkey

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | @awccDealerOld = '+@awccDealerOld
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT


    -- borro los modulos del usuario que no son rangos 
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | borro los modulos del usuario que no son rangos'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	delete from _Sistema..UsersDesktopWebModulos
		where dwm_idWeb = @udw_idkey
		and (dwm_dealer is null or dwm_dealer = '')
		and dwm_idModules!=8	--8.Desktop

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | borro los seteos de seguridad de modulos. @udw_idkey = '+Cast(@udw_idkey as varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- borro los seteos de seguridad de modulos
	delete from [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		where ums_idWeb = @udw_idkey
		and ums_idModules!=8	--8.Desktop
		
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | inserto los modulos del perfil'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT


	-- inserto los modulos del perfil menos los que ya existan (no borro el desktop)
	insert into _Sistema..UsersDesktopWebModulos 
		select @udw_idkey as dwm_idweb
			  ,[dwm_idModules]
			  ,[dwm_idTabla]
			  ,[dwm_dealer]
			  ,[dwm_cuenta_desde]
			  ,[dwm_cuenta_hasta]
			  ,[dwm_data]
		  FROM [_Sistema].[dbo].[UsersDesktopWebModulos]
		  where [dwm_idWeb] = @udw_iperfil
		  and [dwm_idModules] not in (select [dwm_idModules] from [_Sistema].[dbo].[UsersDesktopWebModulos] where [dwm_idWeb] = @udw_idkey)

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | inserto la seguridad del perfil  @udw_iperfil = '+Cast(@udw_iperfil as varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- inserto la seguridad del perfil
	-- revisar relaciones
	/*
	insert into [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		select @udw_idkey as ums_idWeb
			,[ums_idModules]
			,[ums_data]
		FROM [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
		where ums_idWeb = @udw_iperfil
		and ums_idModules!=8
	*/

	MERGE INTO [_Sistema].[dbo].[UsersDesktopWebModulosSecurity] AS TGT
	USING ( select @udw_idkey As [ums_idWeb],[ums_idModules],[ums_data] FROM [_Sistema].[dbo].[UsersDesktopWebModulosSecurity] 
			where ums_idWeb = @udw_iperfil and ums_idModules!=8	) As SRC 
			ON TGT.[ums_idWeb] = SRC.[ums_idWeb] And TGT.[ums_idModules]=SRC.[ums_idModules] 
	WHEN MATCHED THEN
		UPDATE SET
		   TGT.[ums_idModules] = SRC.[ums_idModules],
		   TGT.[ums_data] = SRC.[ums_data]
	WHEN NOT MATCHED THEN 
		INSERT  ([ums_idWeb],[ums_idModules],[ums_data])
		 VALUES (SRC.[ums_idWeb],SRC.[ums_idModules],SRC.[ums_data]);


	DECLARE @ExisteUserDeskMod INT = 0
	/******Daniel O. Medina https://softguard.atlassian.net/browse/DSS-721 ********/
	if @ums_data_module42_WebRemotoMobile<>''
	begin
		select @ExisteUserDeskMod = 1 from _sistema.dbo.[UsersDesktopWebModulosSecurity] where  ums_idWeb=@udw_idkey and  ums_idModules= 42		--42.WebRemotoMobile
		if @ExisteUserDeskMod = 0
		begin
			insert into [_Sistema].[dbo].[UsersDesktopWebModulosSecurity](ums_idWeb,ums_idModules,ums_data)
			values(@udw_idkey,42,@ums_data_module42_WebRemotoMobile)		
		End
	End
	/*****************************************************************************/
	Else
	if @ums_data_WRMPerfil<>''
	begin
		select @ExisteUserDeskMod = 1 from _sistema.dbo.[UsersDesktopWebModulosSecurity] where  ums_idWeb=@udw_idkey and  ums_idModules= 42		--42.WebRemotoMobile
		if @ExisteUserDeskMod = 0
		begin
			insert into [_Sistema].[dbo].[UsersDesktopWebModulosSecurity](ums_idWeb,ums_idModules,ums_data)
			values(@udw_idkey,42,@ums_data_WRMPerfil)		
		End
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | actualizo la seguridad de webremoto'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- actualizo la seguridad de webremoto.
	declare @ums_data NVARCHAR(max)
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | piso el valor del operador'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- piso el valor del operador
	if @ope_iid is not null
	BEGIN

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [ApplyProfile] | ADENTRO DEL IF @OPE_IID'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		-- tomo el json actual
		/*select @ums_data = '' ******Daniel O. Medina https://softguard.atlassian.net/browse/DSS-721 ********
		select @ums_data = [ums_data]  *******anulo porque no anda, debe ser insert y no update************
			FROM [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
			where ums_idWeb = @udw_idkey
				and ums_idModules = 2*/

		if @ums_data_module2_WebRemoto is not null AND @ums_data_module2_WebRemoto != ''
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [ApplyProfile] | actualizo el registro'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--2023-12-22 : Pablo NO puede ser insert, x que si hereda un perfil el ums_idModules=2 ya lo tiene
			MERGE INTO [_Sistema].[dbo].[UsersDesktopWebModulosSecurity] AS TGT
			USING ( select @udw_idkey As [ums_idWeb],2 As [ums_idModules], @ums_data_module2_WebRemoto As [ums_data] ) As SRC 
					ON TGT.[ums_idWeb] = SRC.[ums_idWeb] And TGT.[ums_idModules]=SRC.[ums_idModules] 
			WHEN MATCHED THEN
				UPDATE SET
				   TGT.[ums_data] = SRC.[ums_data]
			WHEN NOT MATCHED THEN 
				INSERT  ([ums_idWeb],[ums_idModules],[ums_data])
				 VALUES (SRC.[ums_idWeb],SRC.[ums_idModules],SRC.[ums_data]);

		END
		Else
		if @ums_data_WRPerfil is not null AND @ums_data_WRPerfil != ''
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [ApplyProfile] | actualizo el registro desde perfil'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--2023-12-22 : Pablo NO puede ser insert, x que si hereda un perfil el ums_idModules=2 ya lo tiene
			MERGE INTO [_Sistema].[dbo].[UsersDesktopWebModulosSecurity] AS TGT
			USING ( select @udw_idkey As [ums_idWeb],2 As [ums_idModules], @ums_data_WRPerfil As [ums_data] ) As SRC 
					ON TGT.[ums_idWeb] = SRC.[ums_idWeb] And TGT.[ums_idModules]=SRC.[ums_idModules] 
			WHEN MATCHED THEN
				UPDATE SET
				   TGT.[ums_data] = SRC.[ums_data]
			WHEN NOT MATCHED THEN 
				INSERT  ([ums_idWeb],[ums_idModules],[ums_data])
				 VALUES (SRC.[ums_idWeb],SRC.[ums_idModules],SRC.[ums_data]);

		END
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | piso el valor del Instalador'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- piso el valor del Instalador
	if @Instalador is not null
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [ApplyProfile] | ADENTRO DEL IF @INSTALADOR '+convert(varchar(10),@udw_idkey)
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		-- tomo el json actual
		select @ums_data = ''
		select @ums_data = [ums_data]
			FROM [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
			where ums_idWeb = @udw_idkey
				and ums_idModules = 3	--3.SerTec

		if @ums_data is not null AND @ums_data != ''
		BEGIN
			declare @hierarchy2 as JSONHierarchy 

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [ApplyProfile] | tiene valores @ums_data, actualizo '+@ums_data
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			insert into @hierarchy2 select * from dbo.parseJSON(@ums_data)
			update @hierarchy2 set StringValue = @Instalador where NAME = 'Instalador'
	
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [ApplyProfile] | nuevo json instalador'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [ApplyProfile] | ' + dbo.ToJSON(@hierarchy2)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			-- actualizo el registro
			update [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
				set [ums_data] = dbo.ToJSON(@hierarchy2)
				where ums_idWeb = @udw_idkey
					and ums_idModules = 3	--3.SerTec

		END
	END


	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [ApplyProfile] | @awccDealerOld = '+@awccDealerOld
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF @awccDealerOld != ''
	BEGIN

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [ApplyProfile] | ACTUALIZO DEALER AWCC'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		-- tomo la metadata posterior a aplicar el perfil 
		DECLARE @nuevaUms_data VARCHAR(MAX)
	
		select @nuevaUms_data = [ums_data]
			FROM [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
			where ums_idWeb = @udw_idkey
				and ums_idModules = 11	--11.AWCC

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [ApplyProfile] | Nueva metadata:'+@nuevaUms_data
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		if @nuevaUms_data is not null AND @nuevaUms_data != ''
		BEGIN
			--parseo nueva metadata
			DECLARE @awccUms_dataNew JSONHierarchy
			insert into @awccUms_dataNew select * from dbo.parseJSON(@nuevaUms_data)

			--updateo valor
			update @awccUms_dataNew set StringValue = @awccDealerOld where NAME = 'dealer'	

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [ApplyProfile] | Nuevo json:'+ _desktop.dbo.ToJSON(@awccUms_dataNew)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			-- actualizo el registro
			update [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
				set [ums_data] = dbo.ToJSON(@awccUms_dataNew)
				where ums_idWeb = @udw_idkey
					and ums_idModules = 11	--11.AWCC
		END
	END

END