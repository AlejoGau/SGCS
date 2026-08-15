CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoObservacion]
(
@rec_iid int,
@rec_cObservaciones varchar(max),
@rec_idResolucion varchar(3) = '',
@rec_cCategorizacion varchar(3) = '',
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

	declare @udw_nombre varchar(100)
	declare @udw_apellido varchar(100)
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

	declare @ums_data varchar(max)
	select @ums_data = ums_data from _sistema..UsersDesktopWebModulosSecurity s
		where ums_idModules = 2 --multimonitorweb
		and s.ums_idWeb = @ums_idWeb
	if(@ums_data is null or @ums_data = '')
		begin
			select 4 Error, 'No se puede obtener la metadata del usuario' Message
			return;	
		end

	declare @ope_clogin varchar(128)
	select @ope_clogin = dbo.[GetOperNameByUserId](@ums_idWeb)

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

	declare @idcuenta int = 0
	select @idcuenta=p.rec_iidcuenta from _datos..p_recepcion p where rec_iid = @rec_iid
	if(@idcuenta is null or @idcuenta = 0)
		begin
			select 7 Error, 'No se puede obtener el id de la cuenta del evento' Message
			return;	
		end

	declare @FechaHoraProceso datetime = getdate()

	declare @Obs varchar(max)
	declare @idresolucion varchar(3)
	declare @idcategorizacion varchar(3)

	select @Obs = rec_cobservaciones, 
				 @idresolucion = rec_cCategorizacion,
				 @idcategorizacion = rec_cCategorizacion
	from _datos..p_recepcion where rec_iid = @rec_iid


	--print '@rec_cObservaciones antes del if'+@rec_cObservaciones;

	IF (@rec_cObservaciones is not null and @rec_cObservaciones != '')
		begin
			-- BC 378624324
			-- Se corrige validando por NULL, dado que por defecto el campo rec_cObservacion del evento se encuentra en NULL y lo transformamos a blanco para que pueda hacer el IF y no se rompa.
			set @Obs = ISNULL(@Obs,'') 
			+ Char(13) 
			+ '['+convert(varchar, @FechaHoraProceso, 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] [' + @ope_clogin + '] ' /*['+@udw_nombre+' ' + @udw_apellido + '] '*/
			+@rec_cObservaciones

			--PRINT '@Obs dentro del IF'+@Obs

		end


	-- si se envia remplazo
	IF @rec_idResolucion != ''
		BEGIN
			SET @idresolucion = @rec_idResolucion
		END

	IF @rec_cCategorizacion != ''
		BEGIN
			SET @idcategorizacion = @rec_cCategorizacion
		END

	update _datos..p_recepcion
	set	 rec_cObservaciones = @Obs,
		 rec_idResolucion = @idresolucion,
		 rec_cCategorizacion = @idcategorizacion
	where rec_iid = @rec_iid


	-- guardo en timeline
	-- Miguel Azocar: 17/1/2020, Verifica si esta en supervision el evento. 
	Declare @iProcesoSupervisor Int = 201
		   	
	If (Select [rxt_iProceso] From [_Datos].[dbo].[p_RXtraInfo] Where rxt_iRecId = @rec_iid) Between 40 And 49
	Begin
		Set @iProcesoSupervisor = (Select [rxt_iProceso] From [_Datos].[dbo].[p_RXtraInfo] Where rxt_iRecId = @rec_iid)
		Insert Into _Datos..EventosTimeline (etl_iRecID,etl_iCuenta,etl_tFechaHora,etl_cAccion,etl_cObservacion,etl_cOwner,etl_iOperador,etl_iAccionCode)
		Values (@rec_iid,@idcuenta,@FechaHoraProceso,'IngresoComentarios',@rec_cObservaciones,'%MWR%',@idOperador,@iProcesoSupervisor)
	End Else
	Begin
		Insert Into _Datos..EventosTimeline (etl_iRecID,etl_iCuenta,etl_tFechaHora,etl_cAccion,etl_cObservacion,etl_cOwner,etl_iOperador,etl_iAccionCode)
		Values (@rec_iid,@idcuenta,@FechaHoraProceso,'IngresoComentarios',@rec_cObservaciones,'%MWR%',@idOperador,@iProcesoSupervisor)
	End
	
	select * from _datos..p_recepcion where rec_iid = @rec_iid
	end