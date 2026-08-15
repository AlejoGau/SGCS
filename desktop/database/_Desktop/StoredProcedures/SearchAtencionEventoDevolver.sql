--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.840 
--#############################################################################

--exec [SearchAtencionEventoDevolver] 6423713, 'A3167F80-2C24-4B57-A7ED-A824B2A6949A'


CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoDevolver]
(
@rec_iid int,
@token NVARCHAR(256),
@observaciones NVARCHAR(512) = ''
)
as
begin
set nocount on

--2024-11-26 Pablo : Si cierra sesion y el evento en atencion es de autoasignacion de vc, da error
Declare @_Tagged Int = (Select [_Tagged] From [_Datos].[dbo].[EventosPendientes] with (nolock) Where [rec_iid] = @rec_iid)
If @_Tagged = 1
	Return

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
from _sistema..UsersDesktopWeb with (nolock) where udw_usuario = @udw_usuario
if(@ums_idWeb is null or @ums_idWeb = 0)
begin
	select 3 Error, 'No se puede obtener el id del usuario' Message
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
select @idOperador = o.ope_iid from _sistema..s_operadores o with (nolock) where o.ope_clogin = @ope_clogin
if(@idOperador is null or @idOperador = 0)
begin
	select 6 Error, 'No se puede obtener el id del operador' Message
	return;	
end

declare @idcuenta int = 0
select @idcuenta=p.rec_iidcuenta from _datos..p_recepcion p with (nolock) where rec_iid = @rec_iid
if(@idcuenta is null or @idcuenta = 0)
begin
	select 7 Error, 'No se puede obtener el id de la cuenta del evento ' Message
	return;	
end

declare @FechaHoraProceso datetime = getdate()

	
declare @rec_nestado int = 0 
declare @current_nestado int = 0
declare @nProcesoOld int = 0

declare @Obs NVARCHAR(max)

select @Obs = rec_cobservaciones, 
			 @current_nestado = rec_nestado ,
			 @nProcesoOld = rxt_iProceso
from _datos..p_recepcion with (nolock)
LEFT JOIN _Datos..p_RXtraInfo ON rec_iid = rxt_iRecId
where rec_iid = @rec_iid

if @observaciones != ''
begin
	set @Obs = @Obs + Char(13) + @observaciones
	--+ '['+convert(varchar, @FechaHoraProceso, 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] [SISTEMA] '
	--+ 'El sistema devolvio el evento a pendiente' + ' estado actual:'+ convert(varchar,@current_nestado)
end


 -- Miguel Azocar 15/01/2020: Verifico si viene de supervision para modificar el proceso
Declare @nProceso Int = 0
Declare @EstadoEvento Int = (Select [rec_nestado] From [_Datos].[dbo].[EventosPendientes] with (nolock) Where [rec_iid] = @rec_iid)


If @nProcesoOld Between 40 and 46 and @EstadoEvento != 4 -- Viene de Supervision
	Set @nProceso = 29
If @nProcesoOld = 46 And @EstadoEvento = 4 -- Viene de Espera Por Supervisor
	Set @nProceso = 30 -- Guardo como: %Supervisor - Pendiente%
Else -- NO Viene de Supervision
	Set @nProceso = 31  -- Guardo como: %Procesando - Pendiente%


if(@current_nestado = 2)
BEGIN
	-- si estaba en espera solo agrego observaciones y limpio asignación.
	update _datos..p_recepcion
	set rec_ioperador = 0
	,rec_cTerminal = ''
	,rec_cObservaciones = @Obs
	where rec_iid = @rec_iid

END
ELSE
BEGIN

	update _datos..p_recepcion
	set rec_nestado = @rec_nestado
	,rec_tfechaproceso = @FechaHoraProceso
	,rec_ioperador = 0
	,rec_cTerminal = ''
	,rec_cObservaciones = @Obs
	where rec_iid = @rec_iid

	

	/*
	-- no debe volver a supoervision lo manda a pendiente normal
	IF @nProcesoOld = 40 or  @nProcesoOld = 46
			SET @nProceso = 44
	ELSE IF @nProcesoOld = 45
			SET @nProceso = 40
	*/

	
END

Insert Into 
	_datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
	Values(@rec_iid,@cTerminal,@FechaHoraProceso,@nProceso,@idOPerador)

select 0 Error, 'OK' Message
end