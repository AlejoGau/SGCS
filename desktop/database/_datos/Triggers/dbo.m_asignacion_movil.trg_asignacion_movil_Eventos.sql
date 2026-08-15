CREATE OR ALTER TRIGGER [dbo].[trg_asignacion_movil_Eventos]
ON [dbo].[m_asignacion_movil]
AFTER UPDATE
AS

BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(Max) = ''

    declare @objecttypeid int
	declare @objectid int
	declare @status int
	declare @idassign int
	declare @rec_iid int
	declare @iusuarioVC int

	select top 1 @objecttypeid = amv_objecttypeid, @objectid = amv_objectid
		,@status = amv_estado ,@idassign = amv_idkey ,@rec_iid = amv_rec_iid
	from inserted

	-- busco la cuenta del evento
	declare @rec_iidcuenta int;
	select @rec_iidcuenta = rec_iidcuenta 
		from _datos..p_recepcion 
		where rec_iid = @rec_iid
	
	declare @calarma char(3)= '';
	declare @stCuentaId int;
	declare @nombre NVARCHAR(256) = '';

	if @objecttypeid = 3113
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [trg_asignacion_movil_Eventos] | [m_asignacion_movil] es VC'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

		/*
		Los cambios de estado que debieran generar evento son:

		2  -> CANCELADO
		3  -> COMPLETO (partida)
		11 -> EN CAMINO
		12 -> ARRIBADO

		Los codigos de alarma internos a genera son:

		Estado 2 ->    V23
		Estado 3 ->    V24
		Estado 11 ->   V25
		Estado 12 ->   V26

		Si se trata de un CleanApp se crearon nuevos eventos adaptados para CleanApp
		V23 VIGICONTROL: Asignación cancelada → C23 CLEANAPP: Asignación cancelada
		V24 VIGICONTROL: Partida Vigilador Asignada → C24 CLEANAPP: Partida de Personal Asignada
		V25 Vigilador Asignado En Camino → C25 CLEANAPP: Personal Asignado En Camino
		V26 Arribo Vigilador Asignado → C26 CLEANAPP: Arribo Personal Asignado
		*/
		
		Declare @AppType VarChar(64) = ''
		-- evento en el dispositivo.

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [trg_asignacion_movil_Eventos] | busco la cuenta del dispositivo y el usuario para crear el evento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

		select @stCuentaId=cuentaid,@nombre=Nombre,@AppType=[AppType] from _datos..SmartTrack where Id = @objectid

		If @AppType='VIGICONTROL'
		Begin
			-- defino el evento segun el estado
			If @status = 2
				SET @calarma = 'V23'
			Else if @status = 3
				SET @calarma = 'V24'
			Else if @status = 11
				SET @calarma = 'V25'
			Else if @status = 12
				SET @calarma = 'V26'
		End
		Else
		Begin
			-- defino el evento segun el estado
			If @status = 2
				SET @calarma = 'C23'
			Else if @status = 3
				SET @calarma = 'C24'
			Else if @status = 11
				SET @calarma = 'C25'
			Else if @status = 12
				SET @calarma = 'C26'
		End

		-- busco el usuario del smarttrack
		-- esto esta mal no se puede buscar, agregar campo en tabla y grabar cuando la app hace "ir" DEDALO 23/8/2018 visto con hernan
		/*
		select @iusuarioVC = usu_iid from  [_Datos].[dbo].[m_usuarios] u
			join [_Datos].[dbo].[m_telefonos] t on u.usu_iid = t.tel_iid+700 and u.usu_iidcuenta = t.tel_iidcuenta
			where t.tel_iidcuenta = @stCuentaId
		*/

		--Si @status=3 y es de un evento Taggeado, tengo que procesar el evento
		If @status=3 And @AppType='VIGICONTROL'
		Begin
			Declare @cDealer Char(3) = ''
					
		   	Select @cDealer=[cue_clinea] 
				From [_Datos].[dbo].[EventosPendientes] 
			Where [rec_iid] = @rec_iid And [_Tagged] = 1

		   	if @cDealer Is Not Null And @cDealer != ''
   			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [trg_asignacion_movil_Eventos] | [m_asignacion_movil] es un movil de un evento taggeado por auto asignacion. Lo proceso'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

				Declare @_UserId varchar(128) = '',
						@Cat Char(3) = '',
						@Res Char(3) = ''
				Select @_UserId=[aa_operador],@Cat=[aa_categorizacion],@Res=[aa_resolucion]
					From [_Datos].[dbo].[m_dealer_vcconfig_desnormalized]
					Inner Join [_Datos].[dbo].[m_dealer_vcconfig] On [dvc_idKey]=[dealer_idKey]
				Where [dvc_cdealer]=@cDealer And [dvc_apptype]='VIGICONTROL'

				Execute [_Desktop].[dbo].[SearchAtencionEventoProcesar] @rec_iid=@rec_iid, @rec_idResolucion=@Res, @rec_cCategorizacion=@Cat, @_UserId=@_UserId 

			End
		End
	END
	if @objecttypeid = 659 or  @objecttypeid = 3087 -- moviles de respuesta 659 modificar
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [trg_asignacion_movil_Eventos] | [m_asignacion_movil] es movil patrulla'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    
		if @status = 2
		BEGIN 
			select @calarma = '_LM'
		END
		
		-- evento en el dispositivo.
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [trg_asignacion_movil_Eventos] | [m_asignacion_movil] busco la cuenta de la patrulla'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

		Select @stCuentaId=tmp_icuenta, @nombre=tmp_cnombre
			From _tablas..t_MovilesPatrulla 
			Where tmp_idKey = @objectid
		
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [trg_asignacion_movil_Eventos] | genero los eventos => '+@calarma
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

	if (@calarma != '')
	BEGIN
		--DECLARE @tmpNewValue TABLE (newvalue int)
		--INSERT INTO @tmpNewValue 
		-- da error de nested insert (dedalo 14/1/2021)
		--Para la cuenta del dispositivo
		EXEC _desktop..AlarmaGenerar
			@idCta = @stCuentaId,
			@cAlarma = @calarma,
			@cObservaciones = @nombre,
			@cContenido = '',
			@rec_norigen = 5,
			@idUsuario = 0,
			@cUser = 'SISTEMA'
		
		--DECLARE @tmpNewValue2 TABLE (newvalue int)
		--INSERT INTO @tmpNewValue2 
		-- da error de nested insert (dedalo 14/1/2021)
		--Para la cuenta del evento
		EXEC _desktop..AlarmaGenerar
			@idCta = @rec_iidcuenta,
			@cAlarma = @calarma,
			@cObservaciones = @nombre,
			@cContenido = '',
			@rec_norigen = 5,
			@idUsuario = 0,
			@cUser = 'SISTEMA'
			
	END
END