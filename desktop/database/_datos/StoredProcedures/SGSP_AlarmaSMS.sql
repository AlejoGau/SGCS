CREATE OR ALTER PROCEDURE [dbo].[SGSP_AlarmaSMS]
	@idCta [int] = 0,
	@cCodigoAlarma [char](3) = '',
	@idRec [int] = 0
WITH EXECUTE AS CALLER
AS
--Basado _Desktop.dbo.AlarmaSMS
--Autor :Pablo O. Canónico
--Fecha :09/03/2013
--03/07/2017 Se agrego resolucion de zona
--04/07/2017 Se agrego control de Prueba/No Habiitado
--07/07/2017 Se controla que por automonitoreo se sigan enviando notificaciones
--10/07/2017 Se agrego en control de Prueba que los codigos de alarma '_SP' ,'_FP' y '_SZ' se notifiquen
--21/03/2019 Se controla SMS disponibles
--18/04/2019 Mail por evento para Dealer
--12/06/2019 Se agrego envio de push
--18/06/2019 Push a todos los SP del Dealer del evento 
--18/09/2019 Push a todos los Admin de SP de la cuenta del evento 
--11/10/2019 Notificaciones Push Automáticas a admin de grupos
--15/10/2019 Se controla no enviar notificacion al IDPush que genero el evento
--24/08/2020 Se agrega envio por CheckPoint para VC por SMS
--24/11/2020 Se agrega envio por CheckPoint para VC por Mail
--18/03/2021 Se modifico el campo [cod_cGrupo] para contener varios grupos
--28/04/2021 Si no se envio push a la cuenta del evento y tiene configurado push por dealer para todos, se le envia la notificacion
--23/12/2021 Si no existe el idRec en pRecepcion se busca en la depurada ( TST )
--17/07/2023 Si el codigo es de Geocerca se envia el push al SP que lo genero (@cCodigoAlarma IN('_EG','_IG','__G','__I'))
--31/07/2023 Se cambio'%"groupEnabled"%' por'%"Telefono"%' porque el jSon de configuracion si no tenes grupo no guarda mas groupEnabled
--12/09/2023 Se cambio'%"Telefono"%' por'%%' porque si se creo el SP desde un QR el jSon de configuracion esta vacio
--25/07/2025 Se cambio a IF OBJECT_ID(@SynName, 'SN') 
--18/03/2026 Se agrego envia de SMS x Dealer

SET NOCOUNT ON
--Mail x Evento
Declare @Query nVarChar(255) ='',
		@cFrom nVarChar(150) ='',
		@cFromName nVarChar(100) ='',
		@cTo nVarChar(150) ='',
		@cSubject nVarChar(100) ='',
		@cMessageMerge nVarChar(max) ='',
		@cImagenes nVarChar(max) ='',
		@cMail nVarChar(200) ='',
		@cZona nVarChar(10) ='',
		@cDll nVarChar(100) = '',
		@message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

Declare @nFin Int = 0,
		@iEnviaMail Int = 0,
		@nEstado Int = 0,
		@iUsuario Int = 0

Declare @dDiaHoy DateTime = GetDate()

Declare @cFecha Char(10) =(Select Convert(Char(10), @dDiaHoy,103)),
		@cHora Char(10) =(Select Convert(Char(10), @dDiaHoy,108)),
		@idResolucion Char(3) = '999'

Declare @iPushPorCta Int = 0	--Se utiliza para saber si ya envio o no notificaciones para el idRec recibido

If @idRec > 0
Begin
	Declare	@iAuxCta [int] = 0
	Select Top 1 @iAuxCta = rec_iidcuenta, @cZona = IsNull(rec_czona,''), @nEstado = IsNull(rec_nestado,0), @idResolucion = IsNull(rec_idResolucion,'') , @iUsuario = [rec_iUsuario], @cDll = IsNull([rec_cdll],'') 
		From p_recepcion PR
		Left Outer Join [dbo].[m_receptores_cab] RC On RC.[rec_iid]=[rec_idReceptor]
	Where PR.[rec_iid] = @idRec

----
	If @iAuxCta Is Null Or @iAuxCta = 0
	Begin
		--Busco el recid en la depurada
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] No existe en pRecepcion. Busco el @idRec en la depurada'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @cCierre Char(6) = Convert(Char(6),Getdate(), 112)
		Declare @SynName NVarchar(128) = 'p_recepcion' + @cCierre;
		IF OBJECT_ID(@SynName, 'SN') Is Not NULL
			Begin		
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] Busco en p_recepcion'+@cCierre
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Declare @cSQL nVarchar(MAX)
				Set @cSQL = 'Select @idCta = rec_iidcuenta, @cCodigoAlarma = rec_cAlarma, @cZona = rec_czona, @nEstado = rec_nestado, @iUsuario = rec_iUsuario, @cDll = rec_cdll From [dbo].[p_recepcion' +  @cCierre  +  '] PR	Inner Join [dbo].[m_receptores_cab] RC On RC.[rec_iid]=[rec_idReceptor] Where PR.[rec_iId]='+Cast(@idRec As Varchar(10))

				Declare @DynamicSqlParams NVarchar(MAX)
				Set @DynamicSqlParams = '@idRec Int,@idCta Int OUTPUT, @cCodigoAlarma Char(3) OUTPUT, @cZona Char(10) OUTPUT, @nEstado Int OUTPUT, @iUsuario Int OUTPUT, @cDll VarChar(100) OUTPUT'
				Execute sp_executesql @cSQL, @DynamicSqlParams, @idRec=@idRec, @idCta=@idCta OUTPUT, @cCodigoAlarma=@cCodigoAlarma OUTPUT, @cZona=@cZona OUTPUT, @nEstado=@nEstado OUTPUT, @iUsuario=@iUsuario OUTPUT, @cDll=@cDll OUTPUT
			End

		If @idCta Is Null Or @idCta = 0
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] idCta en cero!!! '
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
				Set NoExec On
			End
	End
End
----

Declare @cResolucion Char(3) = Right('000'+ Rtrim((Select CAST(IsNull(par_ivalor,999) As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='CATAUTOMONITOREO')),3)
If @nEstado = 6	And  Not @cCodigoAlarma IN('_SP','_FP','_SZ') --Prueba
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] En Prueba. No genera notificacion!!!'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

If @nEstado = 7 And @idResolucion<>@cResolucion	--No Habiitado/Automonitoreo
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] No Habiitado. No genera notificacion!!!'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

Declare @cPlantilla Char(3) = ''
Declare @cDestino nVarChar(200) = ''
Declare @cCheckPoint nVarChar(10) = ''

--PushNotification--
If @idRec > 0
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] Tiene @idRec. Execute SGSP_PushNotification'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Execute SGSP_PushNotification @idRec

	Select Top 1 @iPushPorCta = [Id]
		From [Message]
	Where [CuentaID]=@idCta	And [EventoID]=@idRec
End

Select @iEnviaMail = par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE'

If @iEnviaMail = 2 --Utiliza SM y Plantillas
Begin
	set @cFrom = ( Select Cast(par_cvalor As nVarChar(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
	set @cFrom = Ltrim(Rtrim(@cFrom))

	Set @cFromName = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
	Set @cFromName = Ltrim(Rtrim(@cFromName))

	Declare cMailxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	  	Select sms_cmailparaeventos,sms_cplantillamail,pls_cdescripcion,IsNull(sms_czona,'') From m_sms
			Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillamail
 		Where sms_cmailparaeventos<> ''  And sms_cplantillamail<>'' And sms_iidCuenta=@idCta And
		  	  ( CHARINDEX(@cCodigoAlarma, sms_meventos) > 0  Or
			  ( sms_iNotificarAlertas=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1) ) Or
 			  ( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )
	
	Open cMailxEvento
	Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject,@cCheckPoint
	While @@FETCH_STATUS = 0
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] Mail x Evento. CheckPoint ('+@cCheckPoint+'). Zona del evento ('+@cZona+')'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		if @cCheckPoint = ''  Or ( @cCheckPoint != '' And @cCheckPoint = @cZona )
		Begin
			Set @cMail = @cDestino
			If @cMail <> ''
				Set @cMail = @cMail +';'

			WHILE CHARINDEX(';',@cMail) > 0
			Begin
				Set @nFin = CHARINDEX(';',@cMail)	
				Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
				Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
			
				--Blanqueo para que el loop no los tenga con datos
				Set @cMessageMerge = ''
				Set @cImagenes = ''
				--

				EXEC SGSP_TextMerge	@idCta,@cZona,@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT, @cImagenes OUTPUT
				If @cMessageMerge Is Null
					Set @cMessageMerge = @cSubject

				EXECUTE _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @dDiaHoy, 1, @Query, 'MAIL', @cImagenes, 900, @idCta

				Set @cMail = SUBSTRING( @cMail, @nFin+1, 200-@nFin );
			End
	   End
	   Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject,@cCheckPoint
	End
	Close cMailxEvento
	Deallocate cMailxEvento

	--Mail por evento para Dealer
	Declare @Dealer Char(3) = ''
	Select @Dealer = IsNull(cue_clinea,'') From m_cuentas Where cue_iid = @idCta
	If @Dealer <> ''
	Begin
		Declare cMailxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	  	Select [tnd_cMail],[tnd_cPlantillaMail],[pls_cdescripcion]
			From [_Tablas].[dbo].[T_Notificaciones_Dealer]
			Inner Join [_Tablas].[dbo].[t_plantillas_sms] On [pls_ccodigo]=[tnd_cPlantillaMail]
		Where [tnd_cMail]<> '' And [tnd_cPlantillaMail]<>'' And [tnd_cDealer]=@Dealer And [tnd_iTipo]=0 And
		  	  ( CHARINDEX(@cCodigoAlarma, [tnd_cAlarmas]) > 0  Or
			  ( [tnd_iNotificarAlertas]=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1) ) Or
 			  ( [tnd_iGrupoAlarmas]>0 And [tnd_iGrupoAlarmas] IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )
	
		Open cMailxEvento
		Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject
		While @@FETCH_STATUS = 0
		Begin
			Set @cMail = @cDestino +';'
			WHILE CHARINDEX(';',@cMail) > 0
			Begin
				Set @nFin = CHARINDEX(';',@cMail)	
				Set @cTo = SUBSTRING( @cMail, 1, @nFin-1 )
				Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
			
				--Blanqueo para que el loop no los tenga con datos
				Set @cMessageMerge = ''
				Set @cImagenes = ''
				--

				EXEC SGSP_TextMerge	@idCta,@cZona,@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT, @cImagenes OUTPUT
				If @cMessageMerge Is Null
					Set @cMessageMerge = @cSubject

				EXECUTE _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @dDiaHoy, 1, @Query, 'MAIL', @cImagenes, 900, @idCta

				Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin );
			End
	
		   Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject
		End
		Close cMailxEvento
		Deallocate cMailxEvento

		--------------------
		--Push a todos los SP del Dealer del evento 
		--Tengo que armar el mensaje a enviar sobre el evento de la cuenta que lo origino y ese mensaje se manda a todos con el idrec de ese evento, pero con idCta de cada destino
		--Las configuraciones puestas en el dealer enviaran los push a todos los SP de ese Dealer menos a los SP de la cuenta donde se genero el evento, para esa función están las notificaciones propias de la cuenta. 
		--tnd_iTipo  = 0 Mail / 1 Push
		--tnd_iAdmin = 0 Todos / 1 Admin / 2 Admin de la cuenta del evento / 3 Todos de la cuenta del evento

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] Push a todos los SP del Dealer del evento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @cPlantilla = ''
		Set @cSubject =''
		Set @iUsuario = 0

		Declare @iAdmin Int = 0
		Declare cPushxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
  	  	Select [tnd_iAdmin],[tnd_cPlantillaMail],[pls_cdescripcion]
			From [_Tablas].[dbo].[T_Notificaciones_Dealer]
		Inner Join [_Tablas].[dbo].[t_plantillas_sms] On [pls_ccodigo]=[tnd_cPlantillaMail]
		Where [tnd_cPlantillaMail]<>'' And [tnd_cDealer]=@Dealer And [tnd_iTipo]=1 And
		  	  ( CHARINDEX(@cCodigoAlarma, [tnd_cAlarmas]) > 0  Or
			  ( [tnd_iNotificarSP]=1 And @cDll='SmartPanicsPacketParser' ) Or
			  ( [tnd_iNotificarAlertas]=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1) ) Or
 			  ( [tnd_iGrupoAlarmas]>0 And [tnd_iGrupoAlarmas] IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )
	
		Open cPushxEvento
		Fetch Next From cPushxEvento Into @iAdmin,@cPlantilla,@cSubject
		While @@FETCH_STATUS = 0
		Begin
			If @cPlantilla Is NUll Or  @cPlantilla = ''
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] No hay plantilla para push de SP por dealer'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End
			Else
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] @cPlantilla => '+ @cPlantilla
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				--Declare @cConfig nVarChar(100) ='%"groupEnabled"%' 
				--Declare @cConfig nVarChar(100) ='%"Telefono"%' 
				Declare @cConfig nVarChar(100) ='%%' 
				If @iAdmin IN(1,2)
				  Set @cConfig ='%"groupEnabled":1%' 

				Declare @idPush Int = 0,
						@iCta Int = 0
				Declare @cZonaCta nVarchar(10) =''

				Set @cTo =''
				Set @cMessageMerge =''
				Set @cImagenes =''
						
				Declare	@cDesc nVarChar(100) = '',
						@Customdata nVarChar (max) = '',
						@cNombre nVarChar(50) = ''

				Select Top 1 @cZonaCta = IsNull(PR.rec_czona,''), @iCta = IsNull(PR.rec_iidcuenta,''), @iUsuario = IsNull(PR.rec_iUsuario,'')
					From p_recepcion PR
				Where PR.[rec_iid] = @idRec

				EXECUTE SGSP_TextMerge	@iCta,@cZonaCta,@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec,@cMessageMerge OUTPUT, @cImagenes OUTPUT
				If @cMessageMerge Is Null
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] No se pudo mergear plantilla'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
				Else
				Begin
					Select @cDesc=IsNull([cod_cdescripcion],@cCodigoAlarma) From [_Tablas].[dbo].[t_codigos_alarma] 
						Where [cod_ccodigo]=@cCodigoAlarma

					If @iUsuario > 0
						Select @cNombre=[usu_cnombre] 
							From [dbo].[m_usuarios]
						Where [usu_iidcuenta]=@iCta And [usu_icodigo]=@iUsuario
			
					If @cNombre Is Null Or @cNombre=''
						Set @cNombre = ''
					Else
						Set @cNombre = ': '+@cNombre

					Declare @cNotificacionAsunto nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILNOTIFICACIONASUNTO')
					Declare @cAsunto nVarChar(max) = Rtrim(@cFromName)+' '+Rtrim(@cNotificacionAsunto)
					Declare @DateRead DateTime = 0

					/*
					Declare cPushxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
					Select sp.Id,sp.CuentaId From [dbo].[SmartPanic] sp
						Inner join m_cuentas On cue_iid=CuentaId
					Where cue_clinea=@Dealer
						And pushToken <>'' 
						And Replace([Config],' ','') Like @cConfig	--'%"groupEnabled":1%' 
						And ( @iAdmin<2 And cue_iid!=@iCta ) Or ( @iAdmin=2 And cue_iid=@iCta )       --Para NO enviar a la cuenta del evento

					Open cPushxEvento
					Fetch Next From cPushxEvento Into @idPush,@iCta
					While @@FETCH_STATUS = 0
					Begin
							Set @cTo=Cast(@idPush As Varchar(10))
							Set @Customdata = '{"cod_cdescripcion":"'+Rtrim(@cDesc)+Rtrim(@cNombre)+'","rec_iid":"'+CONVERT(varchar(20), @idRec)+'"}'

							Print @Customdata
							EXECUTE [_Desktop].[dbo].[MessageIns] @Name = @cAsunto, @Body = @cMessageMerge, @DateCreated = @dDiaHoy, @FromTypeId = 0, @FromId = 0, @ToTypeId = 3067, @ToId = @cTo, @Customdata = @Customdata, @EventoID = @idRec, @CuentaID = @iCta

						Fetch Next From cPushxEvento Into @idPush,@iCta
					End
					Close cPushxEvento
					Deallocate cPushxEvento
					*/

					If @cDll='SmartPanicsPacketParser'
					Begin
						If (@cCodigoAlarma IN('_EG','_IG','__G','__I','_AN'))	--Si son codigos de Geocerca se envia el push al SP que lo genero
							Set @idPush=0
						Else

						Begin
							Select @idPush=[id] From [dbo].[SmartPanic]
								Inner Join [dbo].[m_telefonos] On tel_iidcuenta=[CuentaId] And Right(Ltrim(Rtrim([Telefono])),8)=Right(Ltrim(Rtrim([tel_ctelefono])),8)
							Where [tel_iidCuenta]=@iCta
								And [tel_iid] + 700 = @iUsuario
						End 

						Insert Into [dbo].[Message] ( [Name],[Body],[DateCreated],[DateRead],[FromTypeId],[FromId],[ToTypeId],[ToId],[Status],[Customdata],[EventoID],[CuentaID])
						Select @cAsunto, @cMessageMerge, @dDiaHoy, @DateRead, 0, 0, 3067, Cast(sp.Id As Varchar(10)),'', '{"cod_cdescripcion":"'+Rtrim(@cDesc)+Rtrim(@cNombre)+'","rec_iid":"'+CONVERT(varchar(20), @idRec)+'"}', @idRec, sp.CuentaId
						From [dbo].[SmartPanic] sp
							Inner join m_cuentas On cue_iid=CuentaId
						Where cue_clinea=@Dealer
							And pushToken <>'' 
							And Replace([Config],' ','') Like @cConfig	
							And ((@iPushPorCta>0 And @iAdmin=0 ) Or ( @iAdmin<2 And cue_iid!=@iCta ) Or ( @iAdmin>=2 And cue_iid=@iCta )) 
							And ( sp.Id!=@idPush )
					End
					Else
					Begin
						Insert Into [dbo].[Message] ( [Name],[Body],[DateCreated],[DateRead],[FromTypeId],[FromId],[ToTypeId],[ToId],[Status],[Customdata],[EventoID],[CuentaID])
						Select @cAsunto, @cMessageMerge, @dDiaHoy, @DateRead, 0, 0, 3067, Cast(sp.Id As Varchar(10)),'', '{"cod_cdescripcion":"'+Rtrim(@cDesc)+Rtrim(@cNombre)+'","rec_iid":"'+CONVERT(varchar(20), @idRec)+'"}', @idRec, sp.CuentaId
						From [dbo].[SmartPanic] sp
							Inner join m_cuentas On cue_iid=CuentaId
						Where cue_clinea=@Dealer
							And pushToken <>'' 
							And Replace([Config],' ','') Like @cConfig	
							--And                                  (( @iAdmin<2 And cue_iid!=@iCta ) Or ( @iAdmin>=2 And cue_iid=@iCta )) 
							And ((@iPushPorCta>0 And @iAdmin=0 ) Or ( @iAdmin<2 And cue_iid!=@iCta ) Or ( @iAdmin>=2 And cue_iid=@iCta )) 
					End
				End
			End

			Fetch Next From cPushxEvento Into  @iAdmin,@cPlantilla,@cSubject
		End
		Close cPushxEvento
		Deallocate cPushxEvento

		--------------------
	End
	--
End	
--

--SMS x Evento
--Controlar Disponibles
--Tengo que buscar x cada SMS pendiente, si el status de la cuenta cambio 
Declare @nEnviaSMS Int = 0
Declare @cMailRuteoSMS nVarchar(150) = ''

Select Top 1 @nEnviaSMS=sta_nEnviaSMS,@cMailRuteoSMS=IsNull(rep_cMailRuteoSMS,'') 
	From m_status
	Left Outer Join m_reportes_automaticos On rep_iidcuenta=sta_iidcuenta
	Where sta_iidcuenta	= @idCta

If @nEnviaSMS != null
Begin
	--Controlo aunque no deberia pasar nunca
	If @nEnviaSMS = 3 And Ltrim(Rtrim(@cMailRuteoSMS)) = ''
		Set @nEnviaSMS = 2
End

--nEnviaSMS = 1		--Setea que envio SMS de Aviso
--nEnviaSMS = 2		--Setea que llego al limite de SMS
--nEnviaSMS = 3		--Setea que hay mail para ruteo

If  @nEnviaSMS = 2
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] Supero Limite de SMS. NO tiene configurado Mail para Ruteo. idCta ('+Cast(@idCta As VarChar(10))+')'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End

If @nEnviaSMS = 3		--Tiene que enviar Mail
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] Supero Limite de SMS. Tiene configurado Mail para Ruteo. idCta ('+Cast(@idCta As VarChar(10))+')'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

Declare @cDestinoSMS nVarChar(150)
Declare @cToSMS nVarChar(160)
Declare @iModemSMS As int
Declare @cTelefono nVarChar(30) = ''
Declare @iSigo Int = 1

Declare cSMSxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	Select sms_csmsparaeventos,sms_cplantillasms,pls_cdescripcion,sms_imodemsms,IsNull(sms_czona,'') From m_sms
		Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillasms
			Where sms_csmsparaeventos<> ''  And sms_cplantillasms<>''  And sms_imodemsms>0 And sms_iidCuenta=@idCta And
		  	  ( CHARINDEX(@cCodigoAlarma, sms_meventos) > 0  Or
			  ( sms_iNotificarAlertas=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1) ) Or
 			  ( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

Open cSMSxEvento
Fetch Next From cSMSxEvento Into @cDestino,@cPlantilla,@cSubject,@iModemSMS,@cCheckPoint
While @@FETCH_STATUS = 0
Begin

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] SMS x Evento. CheckPoint ('+@cCheckPoint+'). Zona del evento ('+@cZona+')'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	if @cCheckPoint = ''  Or ( @cCheckPoint != '' And @cCheckPoint = @cZona )
	Begin

		Set @cToSMS = Ltrim(Rtrim(@cDestino))+';'
		WHILE CHARINDEX(';',@cToSMS) > 0 
		BEGIN
			Set @nFin = CHARINDEX(';',@cToSMS)	
			Set @cDestinoSMS = SUBSTRING( @cToSMS, 1, @nFin-1 )
			Set @iSigo = 1

			--Si el evento lo envio un SmartPanics no hay que notificar al origen
			If @cDll='SmartPanicsPacketParser'
			Begin
				Select @cTelefono=[tel_ctelefono] From p_recepcion
					Inner Join [dbo].[m_telefonos] On tel_iidcuenta=[rec_iidCuenta]
					Inner Join [dbo].[SmartPanic] On [tel_iidcuenta]=[CuentaId] And Right(Ltrim(Rtrim([Telefono])),8)=Right(Ltrim(Rtrim([tel_ctelefono])),8)
				Where [rec_iidCuenta]=@idCta
					And [rec_iid] = @idRec
					And [tel_iid] + 700 = [rec_iUsuario]

				If @cTelefono Is Null Or @cTelefono = ''
					Set @iSigo = 1
				Else
					Begin
						If Right(Ltrim(Rtrim(@cTelefono)),8) = Right(Ltrim(Rtrim(@cDestinoSMS)),8)
							Set @iSigo = 0
					End
			End

			if @iSigo = 1
				Begin
					--Blanqueo para que el loop no los tenga con datos
					Set @cMessageMerge = ''
					Set @cImagenes = ''
					--

					EXEC SGSP_TextMerge	@idCta,@cZona,@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT, @cImagenes OUTPUT
					If @cMessageMerge Is Null
						Set @cMessageMerge = @cSubject

					If  @nEnviaSMS <= 1		--Tiene que enviar SMS
						EXECUTE SGSP_SaveSMSQueue @idCta,@iModemSMS,@cMessageMerge,@cDestinoSMS
					Else
					Begin
						Set @cMail = Rtrim(@cMailRuteoSMS) +';'
						WHILE CHARINDEX(';',@cMail) > 0
						Begin
							Set @nFin = CHARINDEX(';',@cMail)	
							Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
							Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'

							EXECUTE SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @dDiaHoy, 1, @Query, 'MAIL', @cImagenes, 901, @idCta

							Set @cMail = SUBSTRING( @cMail, @nFin+1, 200-@nFin );
						End
					End
				End

			Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 160-@nFin )
		END
	End
	Fetch Next From cSMSxEvento Into @cDestino,@cPlantilla,@cSubject,@iModemSMS,@cCheckPoint
End
Close cSMSxEvento
Deallocate cSMSxEvento

--SMS por Dealer
Declare cSMSxDealer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
  	Select [tnd_cSMS],[tnd_cPlantillaMail],[pls_cdescripcion],[tnd_iModemSMS]
			From [_Tablas].[dbo].[T_Notificaciones_Dealer]
		Inner Join [_Tablas].[dbo].[t_plantillas_sms] On [pls_ccodigo]=[tnd_cPlantillaMail]
		Where [tnd_cPlantillaMail]<>'' And [tnd_cDealer]=@Dealer And [tnd_iTipo]=2 And CHARINDEX(@cCodigoAlarma, [tnd_cAlarmas]) > 0 


Open cSMSxDealer
Fetch Next From cSMSxDealer Into @cDestino,@cPlantilla,@cSubject,@iModemSMS
While @@FETCH_STATUS = 0
Begin

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_AlarmaSMS] SMS x Dealer x Evento'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @cToSMS = Ltrim(Rtrim(@cDestino))+';'
	WHILE CHARINDEX(';',@cToSMS) > 0 
	BEGIN
		Set @nFin = CHARINDEX(';',@cToSMS)	
		Set @cDestinoSMS = SUBSTRING( @cToSMS, 1, @nFin-1 )

		--Blanqueo para que el loop no los tenga con datos
		Set @cMessageMerge = ''
		Set @cImagenes = ''
		--

		EXEC SGSP_TextMerge	@idCta,@cZona,@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT, @cImagenes OUTPUT
		If @cMessageMerge Is Null
			Set @cMessageMerge = @cSubject

		If  @nEnviaSMS <= 1		--Tiene que enviar SMS
			EXECUTE SGSP_SaveSMSQueue @idCta,@iModemSMS,@cMessageMerge,@cDestinoSMS

		Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 160-@nFin )
	END
	
	Fetch Next From cSMSxDealer Into @cDestino,@cPlantilla,@cSubject,@iModemSMS
End
Close cSMSxDealer
Deallocate cSMSxDealer
--

Set NoExec Off