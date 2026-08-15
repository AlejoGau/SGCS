--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.597 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoProcesarFullTodo]
(
@rec_iidPadre int = null,
@rec_iMinutosEspera int = null,
@rec_cObservaciones NVARCHAR(max),
@rec_idResolucion NVARCHAR(3),
@rec_cCategorizacion NVARCHAR(3),
@rec_iidArray NVARCHAR(max) = NULL,
@paso INT = NULL,
@token NVARCHAR(256)
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

	if @paso is null
	begin
		select -1 Error, 'Debe definir el paso' Message
		return;	
	end

	/*
	IF @rec_iidPadre is null
	BEGIN
		select 1 Error, 'No esta definido el rec_iidPadre' Message
		return;	
	END*/


	declare @udw_usuario NVARCHAR(128)
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


	--BEGIN TRY -- Prefiero mandar el error hacia adelante y loguearlo, sacamos try
		-- se toman todos los registros para reservarlos para luego procesarlos todos
		IF @paso = 0
		BEGIN
		exec ('insert into #Temp (rec_iid) select r.rec_iid from _datos..eventospendientes r where r.rec_iid in('+@rec_iidArray+') and rec_nestado in (0,1,2,4)')

		select @rowcount = COUNT(*) from #Temp
			while(@rowcurrent < @rowcount)
			begin
				set @rowcurrent = @rowcurrent + 1
				select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent
				exec SearchAtencionEventoAtender  @rec_iid, 1,@token 
			end

		END

		-- se procesan todos los registros (que fueron seleccionados)
		IF @paso = 1
		BEGIN
		exec ('insert into #Temp (rec_iid) select r.rec_iid from _datos..eventospendientes r where r.rec_iid in('+@rec_iidArray+') ')
		select @rowcount = COUNT(*) from #Temp
			while(@rowcurrent < @rowcount)
			begin
				set @rowcurrent = @rowcurrent + 1
				select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent
				exec SearchAtencionEventoProcesar @rec_iidPadre,@rec_iid, @rec_cobservaciones, @rec_idResolucion,@rec_cCategorizacion, @token 
			end
		END

		-- se devuelven los registros que no fueron procesados
		IF @paso = 2
		BEGIN
		CREATE TABLE #pend (rownum int primary key identity(1,1), rec_iid int)
			if (@rec_iidArray = '')
			BEGIN
				exec('insert into #pend (rec_iid) select r.rec_iid from _datos..eventospendientes r where rec_nestado = 9')
			END
			ELSE
			BEGIN
				exec('insert into #pend (rec_iid) select r.rec_iid from _datos..eventospendientes r where r.rec_iid in('+@rec_iidArray+') and rec_nestado = 9')
			END
	
			--rec_iid in ('+@rec_iidArray+')
			declare @pend_iid int = 0
			declare @pendrowcount int = 0
			declare @pendrowcurrent int = 0
			select @pendrowcount = COUNT(*) from #pend

			while(@pendrowcurrent < @pendrowcount)
			begin
				set @pendrowcurrent = @pendrowcurrent + 1
				select @pend_iid = rec_iid from #pend where rownum = @pendrowcurrent
				exec SearchAtencionEventoDevolver @pend_iid,@token 
				select 0 Error, 'OK' Message
			end

		END



		print @paso;
		-- espera
		IF @paso = 3
		BEGIN
			exec ('insert into #Temp (rec_iid) select r.rec_iid from _datos..eventospendientes r  With (NOLOCK) where r.rec_iid in('+@rec_iidArray+') ') --and rec_nestado IN (9) -- esto lo modifique el dia 2/1/2017 por problemas con los eventos en espera y en proceso

			print @paso;
			select @rowcount = COUNT(*) from #Temp

			while(@rowcurrent < @rowcount)
			begin
				set @rowcurrent = @rowcurrent + 1
				select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent

				print 'espera';

				exec SearchAtencionEventoEspera @rec_iid,@rec_iMinutosEspera, @rec_cObservaciones, @rec_idResolucion, @rec_cCategorizacion, @token 
				select 0 Error, 'OK' Message
			end
		END
	/*
	END TRY
	BEGIN CATCH
		select 1 Error, ERROR_MESSAGE() as [Message]
	END CATCH
	*/

END