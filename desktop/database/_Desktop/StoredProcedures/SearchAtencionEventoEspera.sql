--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.580 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.623 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoEspera]
(
@rec_iid int,
@rec_iMinutosEspera int,
@rec_cObservaciones NVARCHAR(max),
@rec_idResolucion NVARCHAR(3) = null,
@rec_cCategorizacion NVARCHAR(3) = null,
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
	select 7 Error, 'No se puede obtener el id de la cuenta del evento' Message, @rec_iid recid
	return;	
end

declare @cantidadmaxespera int
select @cantidadmaxespera = convert(int, par_ivalor) from _tablas..t_parametros p where p.par_ccodigo = 'CANTIDADMAXESPERA'

declare @tiempoespera int = 60
declare @qtiempoespera NVARCHAR(128) = ''
select @qtiempoespera = par_ivalor from _tablas..t_parametros p where p.par_ccodigo = 'TIEMPOENESPERA'
if(@qtiempoespera is not null and @qtiempoespera != '')
begin
	set @tiempoespera = CONVERT(int, @qtiempoespera)
end

--3. Cuando se realizo todo el proceso de atencion del evento se puede 
--seleccionar
--3.1 Pasar a espera
--3.1.1 Hay que verificar si no supero el limite de eventos en cola de espera
	
--		@Cantidad_maxima_espera sale de un parametro 'CANTIDADMAXESPERA'

declare @cantespera int = 0
Select @cantespera = COUNT(*) From _datos..p_recepcion r Where rec_nestado=2 

if(@cantespera > @cantidadmaxespera)
begin
	select 1 Error, 'La cantidad de eventos en espera esta sobre el limite' Message
	return;
end
--		If CantEnEspera > @Cantidad_maxima_espera informo en pantalla y NO 
--LO DEJO pasar a espera


--3.1.2 Hay que permitir un Spinner con tiempo expresado en minutos a =
--dejar en espera. Esto tiene un default
--		@nValor sale de un parametro 'TIEMPOENESPERA'
--		Si @nValor NO existe o NO esta en un rango de 10 a 999, toma el valor 
--60, sino lo que viene del parametro

--3.1.3 Sigue en 3.2

declare @Estado int = 1 --1 = procesando
declare @FechaHoraProceso datetime = getdate()

declare @estadoold int = 0
declare @nProcesoOld int = 0
--select @estadoold = eve_nestado from _datos..p_eventos where eve_iidCuenta = @idcuenta

select 
	@estadoold = rec_nestado ,
	@nProcesoOld = rxt_iProceso
from _datos..p_recepcion 
LEFT JOIN _Datos..p_RXtraInfo ON rec_iid = rxt_iRecId
where rec_iid = @rec_iid

Update _datos..p_eventos 
	Set eve_tFechaHora=@FechaHoraProceso
	, eve_nEstado = @Estado
	Where eve_iidCuenta=@IdCuenta
	
	
declare @rec_nestado int = 2 --espera

declare @Obs NVARCHAR(max)
select @Obs = rec_cobservaciones from _datos..p_recepcion where rec_iid = @rec_iid

If (@rec_cObservaciones is not null and @rec_cObservaciones != '')
begin
	set @Obs = @Obs 
	+ Char(13) 
	+ '['+convert(varchar, @FechaHoraProceso, 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] ['+@udw_nombre+' ' + @udw_apellido + '] '
	+@rec_cObservaciones


	-- guardo en timeline

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

end

--If hubo llamados, @cRetorno no esta vacio
--	@Obs = @cObs + Alltrim(@cRetorno) ESTO VA CON 3.2.4
--EndIf



--segun el paramentro PROCESOENESPERA le saco el id del operador o no
-- Miguel Azocar - 10/01/2020, configuro para que solo actualice el evento en 0 pero igual deje el registro de que operador hizo el cambio.
Declare @PROCESOENESPERA varchar(128), @UdpIdOperador Int = 0;
Set @UdpIdOperador = @idOperador

Select  @PROCESOENESPERA = par_ivalor from _tablas..t_parametros where par_ccodigo = 'PROCESOENESPERA';
IF @PROCESOENESPERA = 2
	BEGIN
		SET @UdpIdOperador = 0;
	END


update _datos..p_recepcion
set rec_nestado = @rec_nestado
,rec_tfechaproceso = @FechaHoraProceso
,rec_iMinutosEspera = @rec_iMinutosEspera 
,rec_ioperador = @UdpIdOperador
,rec_cTerminal = @cTerminal
,rec_idResolucion = ISNULL(@rec_idResolucion, rec_idResolucion)
,rec_cCategorizacion = ISNULL(@rec_cCategorizacion, rec_cCategorizacion)
,rec_cObservaciones = @Obs
where rec_iid = @rec_iid


--	Si estas enviando a ESPERA
--		Si Es tomado desde Pendientes
--			@nProceso = 13		&&Peprocesando - Envio a Espera
--		Si es toamado desde Espera
--			@nProceso = 23		&&Espera    - Dejo en Espera
declare @nProceso int
if(@estadoold = 0) --pendiente
	set @nProceso = 13--		&&procesando - espera
else if(@estadoold = 1) -- en proceso
	set @nProceso = 13--		&& procesando - espera
else if(@estadoold = 2) -- espera
	set @nProceso = 23 --&&Espera    - espera
else
	set @nProceso = 13	-- por defecto tomo procesando - espera


--si viene de supervisor
IF @nProcesoOld = 40 or @nProcesoOld = 46 or @nProcesoOld = 44 or @nProcesoOld = 41
BEGIN
	set @nProceso = 41 --%Espera - Supervisor% -- Pablo 1/8/2019
END




Insert Into 
_datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
Values(@rec_iid,@cTerminal,@FechaHoraProceso,@nProceso,@idOPerador)

--genero registro en timeline del tiempo que se puso en espera 
-- AGREGO action code pedido Pablo 1/8/2019
-- comento el llamado para que no quede con actioncode en 0
/*
INSERT INTO _Datos..EventosTimeLine
(etl_icuenta,etl_iAccionCode, etl_tfechahora,etl_caccion,etl_cobservacion,etl_cowner,etl_ioperador,etl_irecid) values
(@idcuenta,141,GETDATE(),'%EventoEspera%','%A espera por% '+CONVERT(NVARCHAR(10), @rec_iMinutosEspera)+' %Minutos%','%MWR%',@idOPerador,@rec_iid)
*/
select 0 Error, 'OK' Message
end