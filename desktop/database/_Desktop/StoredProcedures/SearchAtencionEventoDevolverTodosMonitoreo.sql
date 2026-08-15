--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.907 
-- 2024-11-25 Pablo : Le agregue @soloOutput=1 x que daba error en [LocalizationGetLocale]
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoDevolverTodosMonitoreo]
(
@token NVARCHAR(256),
@method NVARCHAR(256) = 'GET'
)
as
begin
set nocount on

declare @cTerminal char(3) = '_WW'

if(@token is null or @token = '')
begin
	select 1 Error, 'El token no es valido' Message
	return;	
end

declare @udw_usuario NVARCHAR(128)
select @udw_usuario = userid from _desktop..Token where AccessToken = @token
if(@udw_usuario is null or @udw_usuario = '')
begin
	select 2 Error, 'No se puede obtener el usuario del token' Message
	return;	
end

declare @udw_nombre NVARCHAR(100)
declare @udw_apellido NVARCHAR(100)
declare @ums_idWeb int = 0
select @ums_idWeb = udw_idKey 
,@udw_nombre = udw_nombre
,@udw_apellido = udw_apellido
from _sistema..UsersDesktopWeb where udw_usuario = @udw_usuario
if(@ums_idWeb is null or @ums_idWeb = 0)
begin
	select 3 Error, 'No se puede obtener el id del usuario' Message
	return;	
end

declare @ums_data NVARCHAR(max)
select @ums_data = ums_data from _sistema..UsersDesktopWebModulosSecurity s
	where ums_idModules = 2 --multimonitorweb
	and s.ums_idWeb = @ums_idWeb
if(@ums_data is null or @ums_data = '')
begin
	select 4 Error, 'No se puede obtener la metadata del usuario' Message
	return;	
end

declare @ope_clogin NVARCHAR(128)
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
			set @ope_clogin = @FilterValue
		end
	end
--set @ope_clogin = CONVERT(varchar, @ums_data) --FIXME: Parse json --{"Usuario":"Admin"}
if(@ope_clogin is null or @ope_clogin = '')
begin
	select 5 Error, 'No se puede obtener el nombre del operador' Message
	return;	
end

declare @idOperador int = 0
select @idOperador = o.ope_iid from _sistema..s_operadores o where o.ope_clogin = @ope_clogin
if(@idOperador is null or @idOperador = 0)
begin
	select 6 Error, 'No se puede obtener el id del operador' Message
	return;	
end

declare @t table (rownum int primary key identity(1,1), rec_iid int)

insert into @t
select rec_iid from _datos..p_recepcion r
where rec_ioperador = @idOperador and r.rec_nestado in (1,2,4,9)


--4 PROCESADO
--0 PENDIENTE
--3 ESPERA

if(@method != 'POST')
begin
	select * from @t
	print 'No job done'
	return
end

declare @rowcurrent int = 1
declare @rec_iid int

while exists(select * from @t where rownum = @rowcurrent)
begin
	select @rec_iid = rec_iid from @t where rownum = @rowcurrent
	declare @current_nestado int;
	select @current_nestado = rec_nestado from _datos..p_recepcion where rec_iid = @rec_iid
	DECLARE @translation AS NVARCHAR(1024);
	declare @observaciones NVARCHAR(512);

--print '[SearchAtencionEventoDevolverTodosMonitoreo] EXECUTE [dbo].[LocalizationGetLocale] Se desconecto el usuario '
	EXECUTE [dbo].[LocalizationGetLocale] @Name = N'Se desconecto el usuario', @translation = @translation OUTPUT, @soloOutput=1;
--print '[SearchAtencionEventoDevolverTodosMonitoreo] @translation : ' + @translation

--print '[SearchAtencionEventoDevolverTodosMonitoreo] EXECUTE [dbo].[LocalizationGetLocale] SISTEMA '
	declare @sys varchar(50)
	EXECUTE [dbo].[LocalizationGetLocale] @sys = N'SISTEMA', @translation = @translation OUTPUT, @soloOutput=1;

--print '[SearchAtencionEventoDevolverTodosMonitoreo] @translation : ' + @translation
	set @observaciones = '['+convert(varchar, getdate(), 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] ['+@sys+'] '
	+ @translation
	
--print '[SearchAtencionEventoDevolverTodosMonitoreo] EXECUTE [SearchAtencionEventoDevolver] '	
	exec SearchAtencionEventoDevolver @rec_iid, @token,@observaciones
	set @rowcurrent = @rowcurrent + 1
end

select 0 Error, 'OK' Message
end