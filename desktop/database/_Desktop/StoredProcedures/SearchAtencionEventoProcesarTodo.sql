CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoProcesarTodo]
(
@rec_iidcuenta int,
@rec_cObservaciones varchar(max) = NULL,
@rec_idResolucion varchar(3) = NULL,
@rec_cCategorizacion varchar(3) = NULL,
@rec_iidArray varchar(max) = NULL,
@paso int = 1,
	-- paso 0 es que los toma a estado 9, 
	-- paso 1 procesa la lista y devuelve los que no se seleccionaron
	-- paso 2 cancela y devuelve todo
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

CREATE TABLE #Temp (rownum int primary key identity(1,1), rec_iid int)
declare @rec_iid int = 0
declare @rowcount int = 0
declare @rowcurrent int = 0

print 'PASO '+ CONVERT(varchar(10), @paso)

if (@paso = 0)
BEGIN

	if (@rec_iidArray is null or @rec_iidArray='')
		BEGIN
			insert into #Temp (rec_iid) select r.rec_iid from _datos..p_recepcion r where rec_iidcuenta = @rec_iidcuenta and rec_nestado in (0,1,2,4)
		END
	ELSE
		BEGIN
			exec ('insert into #Temp (rec_iid) select r.rec_iid from _datos..p_recepcion r where r.rec_iid in('+@rec_iidArray+') and rec_nestado in (0,1,2,4)');
		END

	select @rowcount = COUNT(*) from #Temp
	while(@rowcurrent < @rowcount)
	begin
		set @rowcurrent = @rowcurrent + 1
		select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent
		exec SearchAtencionEventoAtender  @rec_iid, 1,@token 
	end
END

if (@paso = 1)
BEGIN
	if (@rec_iidArray is null or @rec_iidArray='')
	BEGIN
	insert into #Temp (rec_iid) select r.rec_iid from _datos..p_recepcion r where rec_iidcuenta = @rec_iidcuenta and rec_nestado = 9
	END
	ELSE
	BEGIN
	exec ('insert into #Temp (rec_iid) select r.rec_iid from _datos..p_recepcion r where r.rec_iid in('+@rec_iidArray+') and rec_nestado = 9');
	END

	
	select @rowcount = COUNT(*) from #Temp
	while(@rowcurrent < @rowcount)
	begin
		set @rowcurrent = @rowcurrent + 1
		select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent
		print @rec_iid;
		print 'procesando '+CONVERT(varchar(10), @rec_iid)
		exec SearchAtencionEventoProcesar  @rec_iid, @rec_cobservaciones, @rec_idResolucion,@rec_cCategorizacion, @token 
		print 'fin procesando '+CONVERT(varchar(10), @rec_iid)
	end
END


-- devuelvo a pendiente los NO procesados
if (@paso = 2)
BEGIN
	CREATE TABLE #pend (rownum int primary key identity(1,1), rec_iid int)
	insert into #pend (rec_iid) select r.rec_iid from _datos..p_recepcion r where rec_iidcuenta = @rec_iidcuenta and rec_nestado = 9
	declare @pend_iid int = 0
	declare @pendrowcount int = 0
	declare @pendrowcurrent int = 0
	select @pendrowcount = COUNT(*) from #pend
	while(@pendrowcurrent < @pendrowcount)
	begin
		set @pendrowcurrent = @pendrowcurrent + 1
		select @pend_iid = rec_iid from #pend where rownum = @pendrowcurrent
		exec SearchAtencionEventoDevolver @pend_iid,@token 
	end
END
select 0 Error, 'OK' Message
end