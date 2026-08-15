CREATE OR ALTER PROCEDURE
[dbo].[SearchAtencionEventoAtender]
(@rec_iid int,
@tomarProcesaTodo int = 0,
@token varchar(128) = '',
@_UserId varchar(128) = '',
@ReturnResult INT = 1
)
as
begin
	set nocount on
	--2024-07-22 Pablo. Se va a utilizar en la auto asignacion de eventos a VC este store, pero como el token no lo tengo y si tengo el UserId se agrega un parametro
	--1.Al tomar un evento primero
	--	*!*Verifico que el evento no este siendo procesado por otra terminal
	--importa si desde Pendientes o desde Espera

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	declare @cTerminal char(3) = '_WW'
	declare @udw_usuario varchar(128)
	if (@_UserId is Not Null And @_UserId != '')
		set @udw_usuario = @_UserId
	else
	Begin
		if(@token is null or @token = '')
		begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Token invalido'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @ReturnResult = 1
				select 1 Error, 'El token no es valido' Message
			return;	
		end

		select @udw_usuario = userid from _desktop..Token where AccessToken = @token
		if(@udw_usuario is null or @udw_usuario = '')
		begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] No se puede obtener el usuario del token'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @ReturnResult = 1
				select 2 Error, 'No se puede obtener el usuario del token' Message
			return;	
		end
	end 

	declare @ums_idWeb int = 0
	select @ums_idWeb = udw_idKey from _sistema..UsersDesktopWeb where udw_usuario = @udw_usuario
	if(@ums_idWeb is null or @ums_idWeb = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] No se puede obtener el id del usuario'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @ReturnResult = 1
			select 3 Error, 'No se puede obtener el id del usuario' Message
		return;	
	end

	declare @ope_clogin varchar(128)
	select @ope_clogin = dbo.[GetOperNameByUserId](@ums_idWeb)

	if(@ope_clogin is null or @ope_clogin = '')
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] No se puede obtener el nombre del operador'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @ReturnResult = 1
			select 5 Error, 'No se puede obtener el nombre del operador' Message
		return;	
	end

	declare @idOperador int = 0
	select @idOperador = o.ope_iid from _sistema..s_operadores o where o.ope_clogin = @ope_clogin
	if(@idOperador is null or @idOperador = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] No se puede obtener el id del operador'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		IF @ReturnResult = 1
			select 6 Error, 'No se puede obtener el id del operador' Message
		return;	
	end

	-- tomo los datos del evento
	declare @idcuenta int = 0
	declare @rec_ioperador int = 0
	declare @Estado int = 0
	DECLARE @nProcesoOld int = 0

	select 
		@idcuenta=p.rec_iidcuenta,
		@rec_ioperador = p.rec_ioperador,
		@Estado = rec_nestado,
		@nProcesoOld = rxt_iProceso
	from _datos..p_recepcion p with (nolock)
	LEFT JOIN _Datos..p_RXtraInfo with (nolock) ON rec_iid = rxt_iRecId
	where rec_iid = @rec_iid

	if(@idcuenta is null or @idcuenta = 0)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] El evento no tiene idCta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		IF @ReturnResult = 1
			select 7 Error, 'No se puede obtener el id de la cuenta del evento' Message
		return;	
	end

	--if exists(
	--	Select PE.eve_cTerminal From _datos..p_eventos PE Where PE.eve_cTerminal <> @cTerminal
	--			 And PE.eve_iidCuenta=@idCuenta
	--	 )

	declare @opeatendiendocuenta int = 0
	declare @nombreoperadoratendiendocuenta varchar(250)
	Declare @PERMITEATENDERCUENTAENPROCESO int = IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PERMITEATENDERCUENTAENPROCESO' ),0)

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] @PERMITEATENDERCUENTAENPROCESO : ' + Cast(@PERMITEATENDERCUENTAENPROCESO As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT


	BEGIN TRANSACTION
    select @opeatendiendocuenta = rec_ioperador, @nombreoperadoratendiendocuenta = ope_cnombre 
	from _Datos.dbo.p_recepcion WITH (UPDLOCK, ROWLOCK) 
	inner join _sistema..s_operadores on rec_ioperador = ope_iid
	where rec_iidcuenta = @idCuenta 
		and rec_nestado in (1,9) -- permite abrir eventos en espear de otro operador
		--and rec_nestado in (1,2,9)
		and rec_ioperador != @idOperador
		and rec_ioperador != '0'
		and rec_ioperador is not null
		 
	if @opeatendiendocuenta > 0 and @opeatendiendocuenta is not null and isnull(@PERMITEATENDERCUENTAENPROCESO,0)=0
	begin
		IF @@TRANCOUNT > 0
			COMMIT TRANSACTION

		EXEC FIX_IntegridadEventosPendientes

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] La cuenta esta tomada por otro operador '+@nombreoperadoratendiendocuenta
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @ReturnResult = 1
			select 8 Error, 'La cuenta esta tomada por otro operador '+@nombreoperadoratendiendocuenta Message
		return;	
	end		

	-- DEDALO 2018/05/24 estaba comentado lo descomento por problema de 2 usuarios tomando el mismo evento
	if (@idOperador != @rec_ioperador and @rec_ioperador!=0 and @rec_ioperador is not null)
	begin
		IF @@TRANCOUNT > 0
			COMMIT TRANSACTION

		EXEC FIX_IntegridadEventosPendientes

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Ea evento ya esta tomado por otro operador | @idOperador : '+CONVERT(varchar(10), @idOperador)+' - @rec_ioperador : '+CONVERT(varchar(10), @rec_ioperador) 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @ReturnResult = 1
			select 9 Error, 'El evento ya esta tomado por otro operador '+CONVERT(varchar(10), @idOperador)+','+CONVERT(varchar(10), @rec_ioperador)  Message
		--+CONVERT(varchar(10), @idOperador)+','+CONVERT(varchar(10), @rec_ioperador) 
		return;	
	end	
	--	Si esta consulta devuelve algo NO LO DEJO TOMAR y aviso
	

	--2.Si el evento es seleccionable entonces
	--2.1 Busco la Fecha_Hora del SQL > @FechaHoraProceso
	--2.2 GrabaTerminalProcesandoEvento
	
	--		**Si es un alta 1ero verifico que no exista
	--		@Estado =0 cuando el evento es tomado desde Pendientes / es 1 =
	--cuando se toma desde espera
	declare @fechahoraproceso datetime = getdate()


	--		Donde @rec_iid es el idem del evento tomado desde p_recpepcion
	--			  @idOPerador es el idem del operador logueado en la terminal
			 
	declare @rec_nestado int 
	--2.4 Actualizo el evento en p_recepcion
	if(@Estado = 2) -- Es de Espera
		set @rec_nestado = 4
	Else
		set @rec_nestado  = 1
	
	if(@tomarProcesaTodo = 1)
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Paso a procesa todo el estado es 9'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		set @rec_nestado = 9
	End

	update _datos..p_recepcion 
	set rec_nestado = @rec_nestado 
	,rec_tFechaProceso = @fechahoraproceso
	,rec_ioperador = @idOperador
	,rec_cTerminal = @cTerminal
	where rec_iid = @rec_iid

	IF @@TRANCOUNT > 0
		COMMIT TRANSACTION
	
--		@rec_tfechaproceso  =@FechaHoraProceso
--		@rec_iOperador      = @idOPerador
--		@rec_cTerminal		= @cTerminal

	if exists(Select * From _datos..p_eventos e with (nolock) Where e.eve_iidCuenta = @idcuenta)
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Actualizo p_eventos'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		Update _datos..p_eventos Set 
			eve_tFechaHora=@FechaHoraProceso,eve_cTerminal=@cTerminal 
			Where eve_iidCuenta=@IdCuenta
	end	
	else
	begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] INSERT p_eventos: @cTerminal=' + @cTerminal + ', @IdCuenta=' + CAST(@IdCuenta AS VARCHAR(10)) + ', @Estado=' + CAST(@Estado AS VARCHAR(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Insert Into _datos..p_eventos (eve_cTerminal,eve_tFechaHora,eve_iidCuenta,eve_nEstado)
			Values (@cTerminal,@FechaHoraProceso,@IdCuenta,@Estado)
	end
	
	--2.3	GuardoRecepcionProceso
	declare @nproceso int = 0
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120) 
	if(@Estado = 0)
	begin
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Tomado desde Pendientes'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		set @nProceso = 11--		&&Pendiente - Tomado
		if(@tomarProcesaTodo = 1) 
			set @nProceso = 14 --Pendiente - Procesa Todo
	end
	else
	begin
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Tomado desde Espera'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		set @nProceso = 21	--	&&Espera    - Tomado
		if(@tomarProcesaTodo = 1) 
			set @nProceso = 24 --Espera - Procesa Todo
	end

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] @nProcesoOld : ' + Cast(@nProcesoOld As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF @nProcesoOld = 40 or @nProcesoOld = 44 or @nProcesoOld = 41
		set @nProceso = 46 -- supervisor - procesnado
	ELSE IF @nProcesoOld = 46
		set @nProceso = 45 -- supervisor - procesar todos

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] INSERT p_recepcion_proceso: @rec_iid=' + CAST(@rec_iid AS VARCHAR(10)) + ', @nProceso=' + CAST(@nProceso AS VARCHAR(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Insert Into _datos..p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
				Values(@rec_iid,@cTerminal,@FechaHoraProceso,@nProceso,@idOPerador)

	DECLARE @operadorAtendiendo varchar(255)
	DECLARE @estadoActual INT

	SELECT @operadorAtendiendo = ope_cLogin, @estadoActual = rec_nEstado FROM _Datos..eventospendientes WHERE rec_iid = @rec_iid

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] @estadoActual : ' + Cast(@estadoActual As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] @operadorAtendiendo : ' + @operadorAtendiendo
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF @estadoActual in (1,4,9) AND @operadorAtendiendo = ''
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Execute FIX_IntegridadEventosPendientes'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		EXEC FIX_IntegridadEventosPendientes

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchAtencionEventoAtender] Problema de integridad en evento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @ReturnResult = 1
			select 10 Error, 'Problema de integridad en evento' Message, @operadorAtendiendo as operador,@estadoActual as estado
	END
	ELSE 
		IF @ReturnResult = 1
			select 0 Error, 'OK' Message, @operadorAtendiendo as operador,@estadoActual as estado

end