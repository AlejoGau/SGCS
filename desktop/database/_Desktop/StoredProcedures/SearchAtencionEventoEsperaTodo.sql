CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoEsperaTodo]
(
@rec_iidcuenta int,
@rec_iMinutosEspera int,
@rec_cObservaciones varchar(max),
@rec_idResolucion varchar(3),
@rec_cCategorizacion varchar(3),
@token varchar(256)
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

declare @udw_usuario varchar(128)
select @udw_usuario = userid from _desktop..Token where AccessToken = @token
if(@udw_usuario is null or @udw_usuario = '')
begin
	select 2 Error, 'No se puede obtener el usuario del token' Message
	return;	
end

declare @t table (rownum int primary key identity(1,1), rec_iid int)
insert into @t (rec_iid)
select r.rec_iid from _datos..p_recepcion r where rec_iidcuenta = @rec_iidcuenta
and rec_nestado in (0,1,4,9)

declare @rec_iid int = 0

declare @rowcount int = 0
declare @rowcurrent int = 0
select @rowcount = COUNT(*) from @t
while(@rowcurrent < @rowcount)
begin
	set @rowcurrent = @rowcurrent + 1
	select @rec_iid = rec_iid from @t where rownum = @rowcurrent
	
	exec SearchAtencionEventoEspera  @rec_iid, @rec_iMinutosEspera, @rec_cobservaciones, @rec_idResolucion,@rec_cCategorizacion, @token 
end

select 0 Error, 'OK' Message
end