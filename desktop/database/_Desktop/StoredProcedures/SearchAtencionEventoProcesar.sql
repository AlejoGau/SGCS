CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoProcesar]
(
@rec_iidPadre int = 0,
@rec_iid int=0,
@rec_cObservaciones NVARCHAR(max)='',
@rec_idResolucion NVARCHAR(3)='',
@rec_cCategorizacion NVARCHAR(3)='',
@token NVARCHAR(256)='',
@_UserId varchar(128) = '',
@nProceso int = 0
)
as
begin
	set nocount on
	--2024-07-31 Pablo. Se va a utilizar en la auto asignacion de eventos a VC este store, pero como el token no lo tengo y si tengo el UserId se agrega un parametro

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Inicio'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @cTerminal char(3) = '_WW'
	declare @udw_usuario NVARCHAR(128)

	if (@_UserId is Not Null And @_UserId != '')
		set @udw_usuario = @_UserId
	else
	Begin
		if(@token is null or @token = '')
		begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Token invalido'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			select 1 Error, 'El token no es valido' Message
			return;	
		end

		select @udw_usuario = userid from _desktop..Token where AccessToken = @token
		if(@udw_usuario is null or @udw_usuario = '')
		begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] No se puede obtener el usuario del token'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			select 2 Error, 'No se puede obtener el usuario del token' Message
			return;	
		end
	end 

	/*2024-07-31 Pablo, estas variables no se estan usando
	declare @udw_nombre NVARCHAR(100)
	declare @udw_apellido NVARCHAR(100)

	declare @ums_idWeb int = 0
	select @ums_idWeb = udw_idKey ,@udw_nombre = udw_nombre ,@udw_apellido = udw_apellido
	*/
	declare @ums_idWeb int = 0
	select @ums_idWeb = udw_idKey 
	from _sistema..UsersDesktopWeb with (nolock) where udw_usuario = @udw_usuario
	if(@ums_idWeb is null or @ums_idWeb = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] No se puede obtener el id del usuario'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 3 Error, 'No se puede obtener el id del usuario' Message
		return;	
	end

	declare @ums_data NVARCHAR(max)
	select @ums_data = ums_data from _sistema..UsersDesktopWebModulosSecurity s with (nolock)
		where ums_idModules = 2 --multimonitorweb
		and s.ums_idWeb = @ums_idWeb
	if(@ums_data is null or @ums_data = '')
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] No se puede obtener la metadata del usuario'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 4 Error, 'No se puede obtener la metadata del usuario' Message
		return;	
	end

	declare @ope_clogin NVARCHAR(128)
	select @ope_clogin = dbo.[GetOperNameByUserId](@ums_idWeb)
	if(@ope_clogin is null or @ope_clogin = '')
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] No se puede obtener el nombre del operador'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 5 Error, 'No se puede obtener el nombre del operador' Message
		return;	
	end

	declare @idOperador int = 0
	select @idOperador = o.ope_iid from _sistema..s_operadores o with (nolock) where o.ope_clogin = @ope_clogin
	if(@idOperador is null or @idOperador = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] No se puede obtener el id del operador'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 6 Error, 'No se puede obtener el id del operador' Message
		return;	
	end

	-- testeo que resolucion y categorizacion sean numeros
	if (@rec_idResolucion is not null AND @rec_idResolucion!= '' and ISNUMERIC(@rec_idResolucion)<>1) OR (@rec_cCategorizacion is not null and @rec_cCategorizacion!='' AND ISNUMERIC(@rec_cCategorizacion)<>1)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Categorizacion o resolucion invalidas'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 7 Error, 'Categorizacion o resolución inválidas' Message
		return;
	end

	declare @idcuenta int = 0
	select @idcuenta=p.rec_iidcuenta from _datos..p_recepcion p with (nolock) where rec_iid = @rec_iid
	if(@idcuenta is null or @idcuenta = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] El evento no tiene idCta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 7 Error, 'No se puede obtener el id de la cuenta del evento' Message
		return;	
	end

	/*2024-07-31 Pablo, estos parametros no se estan usando
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Parametros'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @cantidadmaxespera int
	select @cantidadmaxespera = convert(int, par_ivalor) from _tablas..t_parametros p with (nolock) where p.par_ccodigo = 'CANTIDADMAXESPERA'

	declare @tiempoespera int = 60
	declare @qtiempoespera NVARCHAR(128) = ''
	select @qtiempoespera = par_ivalor from _tablas..t_parametros p with (nolock) where p.par_ccodigo = 'TIEMPOENESPERA'
	if(@qtiempoespera is not null and @qtiempoespera != '')
	begin
		set @tiempoespera = CONVERT(int, @qtiempoespera)
	end
	*/

	declare @Estado int = 4 --4 = PROCESANDO
	declare @FechaHoraProceso datetime = getdate()

	declare @estadoold int = 0
	declare @rec_nestado int = 3 --procesado
	declare @nProcesoOld int = 0

	declare @Obs NVARCHAR(max)
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Observaciones'
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
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] El evento ya esta procesado'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select 4 Error, 'El evento ya esta procesado' Message
		return;	
	end

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Actualizo  p_eventos'
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

	--If hubo llamados, @cRetorno no esta vacio
	--	@Obs = @cObs + Alltrim(@cRetorno) ESTO VA CON 3.2.4
	--EndIf

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Actualizo  p_recepcion'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	update _datos..p_recepcion
	set rec_nestado = @rec_nestado
	,rec_tfechaproceso = @FechaHoraProceso
	--,rec_iMinutosEspera = @rec_iMinutosEspera 
	,rec_ioperador = @idOperador
	,rec_cTerminal = @cTerminal
	,rec_idResolucion = @rec_idResolucion
	,rec_cCategorizacion = @rec_cCategorizacion
	,rec_cObservaciones = @Obs
	where rec_iid = @rec_iid

   	if exists (Select [chs_idKey] From [_Datos].[dbo].[p_ChatSession] Where [chs_reciid] = @rec_iid And [chs_status] != 2) 
   	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Cierro los chats activos'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		update _datos..p_chatsession set chs_status = 2 where chs_reciid = @rec_iid
	End

	if (@nProceso = 0)
	BEGIN
		If(@estadoold = 0) -- pendiente
			set @nProceso = 12-- &&Pendiente - procesado
		else if (@estadoold = 9)
			set @nProceso = 33 -- procesa todo - procesado
		else if (@estadoold = 2)
			set @nProceso = 22	-- &&Espera - Procesado
		else if (@estadoold = 4)
			set @nProceso = 22	-- &&Espera - Procesado 
		else
			set @nProceso = 12 -- &&Pendiente - procesado

		--si era supervisado
		IF @nProcesoOld between 40 and 50
			set @nProceso = 43 -- %Supervisor - Procesado% 
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Inserto p_recepcion_proceso'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Insert Into _datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador,pro_iRecIdPadre)
		Values(@rec_iid,@cTerminal,@FechaHoraProceso,@nProceso,@idOPerador, @rec_iidPadre)

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Me fijo si la resolucion tomada es de FALSA ALARMA'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @nFalsa int
	Select @nFalsa = res_nfalsaalarma From _tablas..t_resoluciones with (nolock) Where 
	res_ccodigo=@rec_idResolucion

	If @nFalsa = 1	--Es Falsa Alarma
	begin
		--Busco en m_stauts para la cuenta
		declare @sta_nContadorFa int
		Select @sta_nContadorFa = sta_ncontadorfa From _datos..m_status with (nolock) Where sta_iidCuenta=@idcuenta

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Tengo que sumar 1 en contador de FalsasAlarma'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		if(@sta_nContadorFa is null)
			set @sta_nContadorFa = 1
		else
			set @sta_nContadorFa += 1
				
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Actualizo M_STATUS'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		update _datos..m_status
		set sta_ncontadorfa = @sta_nContadorFa
		,sta_dfechaprimerfa = @FechaHoraProceso
		where sta_iidcuenta = @idcuenta
	end


	--2024-07-31 Pablo: Si el llamado viene desde el TRIGGER [dbo].[trg_asignacion_movil_Eventos] ON [dbo].[m_asignacion_movil] ,no tiene que volver a verificar el movil asignado
	if(@token is null or @token = '') And (@_UserId is Not Null And @_UserId != '')
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Viene del trigger trg_asignacion_movil_Eventos no se verifica movil asignado'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	End
	Else
	Begin
	/* 
		El evento cuando se esta procesando, 
		se verifica si tiene un movil asignado y se lo desasigna 
	*/
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Se verifica si tiene un movil asignado y se lo desasigna'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	if exists (Select * From _Datos.dbo.m_asignacion_movil with (nolock) Where amv_rec_iid = @rec_iid) --	Si la busqueda NO trae algo NO HAGO NADA
   	begin
		declare @movasig NVARCHAR(100)
   		declare @idmovil int

		Select @idmovil = amv_objectid From _Datos.dbo.m_asignacion_movil with (nolock) Where amv_rec_iid = @rec_iid
		
		update _Datos.dbo.m_asignacion_movil set amv_estado = 2 WHERE amv_rec_iid = @rec_iid and amv_estado!=3

   		/*if exists (Select * From _tablas..t_MovilesPatrulla Where tmp_iAsignado = @idcuenta) --	Si la busqueda NO trae algo NO HAGO NADA
   		begin
   			declare @movasig NVARCHAR(100)
   			declare @idmovil int

   			Select @MovAsig = tmp_cnombre
			,@idMovil = tmp_iid From _tablas..t_MovilesPatrulla Where tmp_iAsignado = @idcuenta
   		

			Update _tablas..t_MovilesPatrulla Set tmp_nestado=1,tmp_iAsignado=0
				Where tmp_iAsignado = @idCuenta*/

			-- me fijo si el objeto asignado es una patruya
			/*
			Select @movasig = tmp_cnombre From _tablas..t_MovilesPatrulla Where tmp_idKey = @idmovil
			Update _tablas..t_MovilesPatrulla Set tmp_nestado=1,tmp_iAsignado=0
				Where tmp_idKey = @idmovil

			declare @message NVARCHAR(256) = @movasig -- ver como agregar un texto que se localice en la interfaz... 
			-- genero evento en el movil
			EXEC [_desktop].[dbo].[AlarmaGenerar]
				@idCta = @idMovil,
				@cAlarma = N'_LM',
				@cObservaciones = @message
			-- genero evento en la cuenta

			EXEC [_desktop].[dbo].[AlarmaGenerar]
				@idCta = @idMovil,
				@cAlarma = N'_LM',
				@cObservaciones = @message

			Insert Into _datos..p_Moviles(mov_idCuenta,mov_idMovil,mov_idRec)
				Values (@idCuenta,@idMovil,@rec_iid)
				*/
   	end
	End

	-- BC 378624324 : Al procesar directo el evento sin guardar previamente la Observacion, no aparecia en TimeLine
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
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoProcesar] Fin'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
   		
	select 0 Error, 'OK' Message
end