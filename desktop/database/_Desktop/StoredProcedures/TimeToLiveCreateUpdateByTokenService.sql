--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.570 
--#############################################################################




CREATE OR ALTER PROCEDURE [dbo].[TimeToLiveCreateUpdateByTokenService]
	 @Token NVARCHAR(500)
	, @Service NVARCHAR(256)
	, @operadorName VARCHAR (256)=''
--WITH ENCRYPTION
AS
begin

	
	-- si el servicio es monitoreo como nombre pongo el operador
	if @Service = ''
	return;

	IF @operadorName = ''
		BEGIN
			if (@Service = 'monitoreo')
			BEGIN
				declare @userId NVARCHAR(200)

				--busco el id del usuario
				select @userid = userid from token where AccessToken = @token

				declare @ums_idWeb int = 0
				select @ums_idWeb = udw_idKey from _sistema..UsersDesktopWeb where udw_usuario = @userid
				if(@ums_idWeb is null or @ums_idWeb = 0)
				begin
					select 3 Error, 'No se puede obtener el id del usuario' Message
					return;	
				end
				-- busco el operador
				declare @ums_data NVARCHAR(max)
				select @ums_data = ums_data from _sistema..UsersDesktopWebModulosSecurity s
					where ums_idModules = 2 --multimonitorweb
					and s.ums_idWeb = @ums_idWeb
				if(@ums_data is null or @ums_data = '')
				begin
					select 4 Error, 'No se puede obtener la metadata del usuario' Message
					return;	
				end

				DECLARE @FilterTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME NVARCHAR(2000), StringValue NVARCHAR(MAX) NOT NULL, ValueType NVARCHAR(10) NOT null)
				INSERT INTO @FilterTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) 
					SELECT * FROM _desktop.dbo.parseJSON(@ums_data) WHERE NAME IN ('Usuario')		
				
				declare @cf int
				select @cf = COUNT(*) from @FilterTable
			
				DECLARE @FilterProperty NVARCHAR(128)
				DECLARE @FilterValue NVARCHAR(128)

				DECLARE @FilterIndex INT
				SET @FilterIndex = 1
				WHILE((SELECT COUNT(*) FROM @FilterTable WHERE parent_ID = @FilterIndex) != 0)
				BEGIN			
					--Read
					SELECT @FilterValue = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @FilterTable WHERE parent_ID = @FilterIndex AND NAME = 'Usuario'
							
					--Next
					SET @FilterIndex = @FilterIndex + 1			
				
					--Set 
					IF @FilterValue != ''
					BEGIN
						set @userid = @FilterValue
					end
				end
			END


	END

	declare @id int = 0;

	select @id = Id from _Datos..[TimeToLive] where token = @Token and [service] = @Service

	if (@id = 0)
		BEGIN
		insert into _Datos..[TimeToLive](Name, [Service], Token, DateCreated)
			values(@operadorName, @Service, @Token, GETDATE())

		set @id = @@identity
		END
	else
		update _Datos..[TimeToLive] set DateCreated = GETDATE(), Name = @operadorName, Service = @Service
			where id= @id
		
		
	select * from _Datos..[TimeToLive] where id= @id

end