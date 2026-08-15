--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.107 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[TimeToLiveByServiceTimeoutExec]
	@Service NVARCHAR(256) = 'monitoreo'
	,@Timeout int = 60
	,@Method NVARCHAR(10) = 'get'
--WITH ENCRYPTION
AS
declare @t table (rownum int primary key identity(1,1), Id int,Token NVARCHAR(256))
-- aviso que la tarea esta funcionando
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'TimeToLiveJob'
insert into @t (Id, Token)
Select Id, [Token]
from [_Datos]..[TimeToLive]
where [service] = @Service and datediff(second, DateCreated, GETDATE()) > @Timeout

if(@method != 'post')
begin
	select * from @t
	return
end
else if @Service = '' or @Service is null
begin
	return
end
else
begin
	declare @rowcurrent int = 1
	declare @token NVARCHAR(256)
	declare @Id int = 0
	while exists (select * from @t where rownum = @rowcurrent)
	begin
		select @Id = id, @token = token from @t where rownum = @rowcurrent
		
		exec [SearchAtencionEventoDevolverTodosMonitoreo] @token, 'POST'
		delete from _Datos..TimeToLive where Id = @Id

		-- saco el token de la lista de webremoto
        declare @DESKTOPEXTERNALURL varchar(250);
        select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';
        INSERT INTO _datos..[RemoteCallQueue]
               ([rcq_estado]
               ,[rcq_tipo]
               ,[rcq_url])
         VALUES
               (0
               ,'HTTPGET'
               ,@DESKTOPEXTERNALURL+'/a/WebRemoto?dropModuleSession=true&oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&token='+@token)
        
		
		set @rowcurrent = @rowcurrent + 1
	end

	--EXEC [dbo].[EventoDevolverHuerfanos]
end

select 0 Status, 'OK' Message