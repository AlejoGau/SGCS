CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoProcesarLite]
(
@rec_iid int=0,
@rec_idResolucion NVARCHAR(3)='',
@rec_cCategorizacion NVARCHAR(3)='',
@rec_cObservaciones NVARCHAR(max)='',
@idcuenta int = 0,
@token NVARCHAR(256)=''
)
as
--Basado _Desktop.dbo.SearchAtencionEventoProcesar
--Autor :Pablo O. Canónico
--Fecha :02/03/2026
--Se va a utilizar solamente desde LPRFormSave
begin
	set nocount on

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Inicio'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @cTerminal char(3) = '_WW'
	declare @udw_usuario NVARCHAR(128)

	if(@token is null or @token = '')
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Token invalido'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 1 Error, 'El token no es valido' Message
		return;	
	end

	select @udw_usuario = userid from _desktop..Token with (nolock) where AccessToken = @token
	if(@udw_usuario is null or @udw_usuario = '')
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] No se puede obtener el usuario del token'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 2 Error, 'No se puede obtener el usuario del token' Message
		return;	
	end
	
	declare @ums_idWeb int = 0
	select @ums_idWeb = udw_idKey 
	from _sistema..UsersDesktopWeb with (nolock) where udw_usuario = @udw_usuario
	if(@ums_idWeb is null or @ums_idWeb = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] No se puede obtener el id del usuario'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 3 Error, 'No se puede obtener el id del usuario' Message
		return;	
	end

	declare @ope_clogin NVARCHAR(128)
	select @ope_clogin = dbo.[GetOperNameByUserId](@ums_idWeb)
	if(@ope_clogin is null or @ope_clogin = '')
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] No se puede obtener el nombre del operador'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 5 Error, 'No se puede obtener el nombre del operador' Message
		return;	
	end

	declare @idOperador int = 0
	select @idOperador = o.ope_iid from _sistema..s_operadores o with (nolock) where o.ope_clogin = @ope_clogin
	if(@idOperador is null or @idOperador = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] No se puede obtener el id del operador'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 6 Error, 'No se puede obtener el id del operador' Message
		return;	
	end

	-- testeo que resolucion y categorizacion sean numeros
	if (@rec_idResolucion is not null AND @rec_idResolucion!= '' and ISNUMERIC(@rec_idResolucion)<>1) OR (@rec_cCategorizacion is not null and @rec_cCategorizacion!='' AND ISNUMERIC(@rec_cCategorizacion)<>1)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Categorizacion o resolucion invalidas'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 7 Error, 'Categorizacion o resolución inválidas' Message
		return;
	end

	declare @Estado int = 4 --4 = PROCESANDO
	declare @FechaHoraProceso datetime = getdate()

	declare @estadoold int = 0
	declare @rec_nestado int = 3 --procesado
	declare @nProcesoOld int = 0

	declare @Obs NVARCHAR(max)
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Observaciones'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	select @Obs = rec_cobservaciones, 
				 @estadoold = rec_nestado,
				 @nProcesoOld = rxt_iProceso
	from _datos..p_recepcion with (nolock)
	LEFT JOIN _Datos..p_RXtraInfo with (nolock) ON rec_iid = rxt_iRecId
	where rec_iid = @rec_iid

	if(@estadoold = 3) -- me fijo si ya estaba procesado
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] El evento ya esta procesado'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 4 Error, 'El evento ya esta procesado' Message
		return;	
	end

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Actualizo  p_eventos'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Update _datos..p_eventos 
		Set eve_tFechaHora=@FechaHoraProceso
		, eve_nEstado = @Estado
		Where eve_iidCuenta=@IdCuenta
	
	If (@rec_cObservaciones is not null and @rec_cObservaciones != '')
	begin
		set @Obs = @Obs 
		+ Char(13) 
		+ '['+convert(varchar, @FechaHoraProceso, 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] ['+@ope_clogin+ '] '
		+@rec_cObservaciones
	end

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Actualizo  p_recepcion'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	update _datos..p_recepcion
	set rec_nestado = @rec_nestado
	,rec_tfechaproceso = @FechaHoraProceso
	,rec_ioperador = @idOperador
	,rec_cTerminal = @cTerminal
	,rec_idResolucion = @rec_idResolucion
	,rec_cCategorizacion = @rec_cCategorizacion
	,rec_cObservaciones = @Obs
	where rec_iid = @rec_iid

	Declare @nProceso int = 0
	If(@estadoold = 0) -- pendiente
		set @nProceso = 12	-- &&Pendiente - procesado
	else if (@estadoold = 9)
		set @nProceso = 33	-- procesa todo - procesado
	else if (@estadoold = 2)
		set @nProceso = 22	-- &&Espera - Procesado
	else if (@estadoold = 4)
		set @nProceso = 22	-- &&Espera - Procesado 
	else
		set @nProceso = 12	-- &&Pendiente - procesado

	--si era supervisado
	IF @nProcesoOld between 40 and 50
		set @nProceso = 43	-- %Supervisor - Procesado% 

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Inserto p_recepcion_proceso'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Insert Into _datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador,pro_iRecIdPadre)
		Values(@rec_iid,@cTerminal,@FechaHoraProceso,@nProceso,@idOPerador, 0)

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Me fijo si la resolucion tomada es de FALSA ALARMA'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- guardo en timeline
	IF (@rec_cObservaciones != '')
		BEGIN
			INSERT INTO _Datos..EventosTimeline (
				etl_iRecID,
				etl_iCuenta,
				etl_tFechaHora,
				etl_cAccion,
				etl_cObservacion,
				etl_cOwner,
				etl_iOperador,
				etl_iAccionCode
			) VALUES (
				@rec_iid,
				@idcuenta,
				@FechaHoraProceso,
				'IngresoComentarios',
				@rec_cObservaciones,
				'%MWR%',
				@idOperador,
				201
			)
		END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesarLite] Fin'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
   		
	select 0 Error, 'OK' Message
end