CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoSupervisor]
(
@rec_iid int,
@rec_cObservaciones NVARCHAR(max),
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


declare @Estado int = 0 
declare @FechaHoraProceso datetime = getdate()

declare @estadoold int = 0
--select @estadoold = eve_nestado from _datos..p_eventos where eve_iidCuenta = @idcuenta
select @estadoold = rec_nestado from _datos..p_recepcion where rec_iid = @rec_iid

Update _datos..p_eventos 
	Set eve_tFechaHora=@FechaHoraProceso
	, eve_nEstado = @Estado
	Where eve_iidCuenta=@IdCuenta
	



declare @Obs NVARCHAR(max)
select @Obs = rec_cobservaciones from _datos..p_recepcion where rec_iid = @rec_iid

If (@rec_cObservaciones is not null and @rec_cObservaciones != '')
begin
	set @Obs = @Obs 
	+ Char(13) 
	+ '['+convert(varchar, @FechaHoraProceso, 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] ['+@udw_nombre+' ' + @udw_apellido + '] '
	+@rec_cObservaciones

end


--lo pongo en pendiente
declare @rec_nestado int 
SET @rec_nestado = 0

--puse esto por que estaba dejando un operador y no se podia atender desde otro
--SET @idOperador = 0

update _datos..p_recepcion
set rec_nestado = @rec_nestado
,rec_tfechaproceso = @FechaHoraProceso
,rec_iMinutosEspera = 0
,rec_ioperador = 0 --[adrian] @idOperador puse esto por que estaba dejando un operador y no se podia atender desde otro
,rec_cTerminal = @cTerminal
,rec_idResolucion = 0
,rec_cCategorizacion = 0
,rec_cObservaciones = @Obs
where rec_iid = @rec_iid



declare @nProceso int
set @nProceso = 40	-- enviado a supervisor


select @ope_clogin,@idOperador,@rec_iid

Insert Into 
_datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
Values(@rec_iid,@cTerminal,@FechaHoraProceso,@nProceso,@idOPerador)



-- genero registro en timeline del tiempo que se puso en espera
-- problemas en BP 7/8/2019 probado con Pablo y Hernan
/*
INSERT INTO _Datos..EventosTimeLine
(etl_icuenta, etl_tfechahora,etl_caccion,etl_cobservacion,etl_cowner,etl_ioperador,etl_irecid) values
(@idcuenta,GETDATE(),'%EventoSupervisor%','%Se paso a supervision.%','%MWR%',@idOPerador,@rec_iid)
*/
select 0 Error, 'OK' Message
end