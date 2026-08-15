CREATE OR ALTER PROCEDURE [dbo].[SGSP_PushNotification]
	@idRec [int] = 0
WITH EXECUTE AS CALLER
AS
--Autor :Pablo O. Canónico
--Fecha :03/03/2017
--17/05/2017 Se cambio el asunto a 2 parametros MAILSENDERNAME/MAILNOTIFICACIONASUNTO
--30/10/2017 Se envia como @Customdata un Json con la descripcion del codigo de alarma
--09/01/2018 Si no existe el idRec en pRecepcion se busca en la depurada ( TST )
--11/04/2018 Para eventos de cuentas deshabilitadas no se generan push	
--30/08/2018 Se agrego control para no notificar al origen si el evento lo envio un SmartPanics
--03/09/2018 Se agrego nombre de usuario que genero el evento
--24/09/2018 Se controla que por automonitoreo se sigan enviando notificaciones
--21/12/2018 Se cambio Join contra [m_receptores_cab], porque los eventos internos no tienen idReceptor
--19/09/2019 Se rearmo el Customdata, que es el mensaje que se ven en los push
--20/11/2020 Se agrega envio por CheckPoint para VC
--18/03/2021 Se modifico el campo [cod_cGrupo] para contener varios grupos
--21/05/2021 Se contempla no procesar idPush de SP sin IMEI ( no asignados )
--29/06/2021 Se contempla que el idPush de SP puede no ser del idCta del evento
--12/04/2022 Se evitan @cidsPushSmartpanic con ;;
--15/07/2022 Se agrego harcodeo de sound en push
--04/11/2022 Dejo de ser harcodeo de sound en push y ahora se usa la configuracion que se guardo en m_sms
--25/07/2025 Se cambio a IF OBJECT_ID(@SynName, 'SN') 

SET NOCOUNT ON
Declare	@idCta [int] = 0,
	@cCodigoAlarma [char](3) = '',
	@cZona [char](3) = '',
	@nEstado [int] = 0,
	@iUsuario [int] = 0,
	@cDll [varchar](100) = '',
	@idResolucion Char(3) = '999',
	@translation nVarChar(Max)=''

Declare @cResolucion Char(3) = Right('000'+ Rtrim((Select CAST(IsNull(par_ivalor,999) As Char(3)) From [_Tablas].[dbo].[t_parametros] Where par_ccodigo='CATAUTOMONITOREO')),3)

Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

Select @idCta = [rec_iidcuenta], @cCodigoAlarma = [rec_cAlarma], @cZona = [rec_czona], @nEstado = [rec_nestado], @iUsuario = [rec_iUsuario], @cDll = IsNull([rec_cdll],''), @idResolucion = IsNull([rec_idResolucion],'') From p_recepcion PR
	Left Outer Join [dbo].[m_receptores_cab] RC On RC.[rec_iid]=[rec_idReceptor]
	Where PR.[rec_iid] = @idRec

If @idCta Is Null Or @idCta = 0
	Begin
		--Busco el recid en la depurada
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_PushNotification] No existe en pRecepcion. Busco el @idRec en la depurada'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @cCierre Char(6) = Convert(Char(6),Getdate(), 112)
		Declare @SynName NVarchar(128) = 'p_recepcion' + @cCierre;
		IF OBJECT_ID(@SynName, 'SN') Is Not NULL 
		Begin		
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_PushNotification] Busco en p_recepcion'+@cCierre
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
				Set @message = 'Start DateTime : %s | [SGSP_PushNotification] idCta en cero!!! '
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
				Set NoExec On
			End
	End


If @nEstado = 7 And @idResolucion<>@cResolucion	--No Habiitado/Automonitoreo
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_PushNotification] Cuenta en situacion -No Habilitado-'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		Set NoExec On
	End

Declare @iAlerta Int = 0
Select @iAlerta = cod_nalerta From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma 

If @iAlerta Is Null Or @iAlerta >= 2
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_PushNotification] No Genera Evento!!!'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

Declare @cFecha Char(10) = (Select Convert(Char(10), GetDate(),103))
Declare @cHora Char(10) = (Select Convert(Char(10), GetDate(),108))

Declare @cidsPushSmartpanic nVarChar(1000) = '',
		@cidPush nVarChar(1000) = '',
		@cSPToken nVarChar(1024) = '',
		@cSubject nVarChar(100) = '',
		@cMessageMerge nVarChar(max) = '',
		@cImagenes nVarChar(max) = '',
		@cTo nVarChar(150) = '',
		@Customdata nVarChar (max) = '',
		@cDesc nVarChar(100) = '',
		@cTelefono nVarChar(30) = '',
		@cNombre nVarChar(50) = '',
		@cCheckPoint nVarChar(10) = '',
		@cImei nVarChar(128) = '',
		@cSonido Char(1) = ''

Declare @cPlantilla Char(3) = ''

Declare @nFin int = 0,
		@iIDSP Int = 0,
		@iSigo Int = 1

Declare @dHoy DateTime = GetDate()

Declare @cFromName nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
Declare @cNotificacionAsunto nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILNOTIFICACIONASUNTO')
Declare @cAsunto nVarChar(max) = Rtrim(@cFromName)+' '+Rtrim(@cNotificacionAsunto)

Declare cPushlxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	  	Select sms_cidsPushSmartpanic,sms_cPlantillaPush,pls_cdescripcion,IsNull(sms_czona,''),sms_cSonido From m_sms
			Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cPlantillaPush
 		Where sms_cidsPushSmartpanic<>'' And sms_cPlantillaPush<>'' And sms_iidCuenta=@idCta And 
			  ( CHARINDEX(@cCodigoAlarma, sms_meventos) > 0 Or
			  ( sms_iNotificarAlertas=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1) ) Or
			  ( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

Open cPushlxEvento
Fetch Next From cPushlxEvento Into @cidsPushSmartpanic,@cPlantilla,@cSubject,@cCheckPoint,@cSonido
While @@FETCH_STATUS = 0
Begin
	Set @cCheckPoint = Rtrim(@cCheckPoint)
	Set @cZona = Rtrim(@cZona)

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_PushNotification] CheckPoint ('+@cCheckPoint+'). Zona del evento ('+@cZona+')'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	if @cCheckPoint = ''  Or ( @cCheckPoint != '' And @cCheckPoint = @cZona )
	Begin
		Set @cidsPushSmartpanic = Replace(@cidsPushSmartpanic,';;','')
		Set @cidPush = @cidsPushSmartpanic +';'
		WHILE CHARINDEX(';',@cidPush) > 0
		Begin
			Set @nFin = CHARINDEX(';',@cidPush)	
			Set @cTo=SUBSTRING( @cidPush, 1, @nFin-1 )
			If @cTo != ''
			Begin
				Set @iSigo = 1

				Select Top 1 @cImei=Imei From [dbo].[SmartPanic]
					Where [ID]=Rtrim(@cTo) And [CuentaID]=@idCta
				
				If @cImei Is Null Or @cImei=''
				Begin
					Set @message = 'Start DateTime : %s | [SGSP_PushNotification] SmartPanics destino no es de la cuenta a la cual llego el evento. Busco sin IdCta'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Select Top 1 @cImei=Imei From [dbo].[SmartPanic]
					Where [ID]=Rtrim(@cTo)
				End

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_PushNotification] To ('+@cTo+'). Imei ('+@cImei+')'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT					

				If @cImei Is Null Or @cImei=''
				Begin
					Set @message = 'Start DateTime : %s | [SGSP_PushNotification] SmartPanics sin IMEI. NO se envia push'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
				Else
				Begin
					Select @cNombre=IsNull([usu_cnombre],Cast(@iUsuario As  nVarChar(50)))
						From [dbo].[m_usuarios]
						Where [usu_iidcuenta]=@idCta And [usu_icodigo]=@iUsuario
					/*
					If @cNombre Is Null Or @cNombre=''
						Set @cNombre = ''
					Else
						Set @cNombre = ' : '+@cNombre
					*/
					
					--Si el evento lo envio un SmartPanics no hay que notificar al origen
					If @cDll='SmartPanicsPacketParser'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [SGSP_PushNotification] Si el evento lo envio un SmartPanics no hay que notificar al origen'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Select @cTelefono=[tel_ctelefono],@iIDSP=[id] From p_recepcion
							Inner Join [dbo].[m_telefonos] On tel_iidcuenta=[rec_iidCuenta]
							Inner Join [dbo].[SmartPanic] On [tel_iidcuenta]=[CuentaId] And Right(Ltrim(Rtrim([Telefono])),8)=Right(Ltrim(Rtrim([tel_ctelefono])),8)
						Where [rec_iidCuenta]=@idCta
						  And [rec_iid] = @idRec
						  And [tel_iid] + 700 = [rec_iUsuario]

						If @cTelefono Is Null Or @cTelefono = ''
							Set @iSigo = 1
						Else
							Begin
								If Rtrim(Cast(@iIDSP As nVarChar(150)))=@cTo
									Set @iSigo = 0
							End
					End

					if @iSigo = 1
						Begin
							EXEC SGSP_TextMerge	@idCta,@cZona,@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT, @cImagenes OUTPUT
							If @cMessageMerge Is Null
								Set @cMessageMerge = @cSubject

							Declare @Msg VarChar(100) = ''

							If @cCodigoAlarma IN('_IG','_EG')
							Begin
								Declare @GeocercaNombre nVarChar(max) = ''
								Select Top 1 @GeocercaNombre = IsNull(rxt_cGeoFenceName,'') From p_RXtraInfo WITH (NOLOCK) Where rxt_iRecId = @idRec

								Set @Msg = 'ha salido de Geocerca'
								If @cCodigoAlarma = '_IG'
									Set @Msg = 'ha ingresado a Geocerca'

								Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = @Msg, @soloOutput=1, @translation = @translation OUTPUT
								Set @Msg = Rtrim(@translation)

								Set @Customdata = '{"cod_cdescripcion":"'+Rtrim(@cNombre)+' '+Rtrim(@Msg) +' '+Rtrim(@GeocercaNombre)+'","rec_iid":"'+CONVERT(varchar(20), @idRec)+'"}'
							End
							Else
							Begin
								Declare @CtaName nVarchar(100) =  ''
								Select @CtaName=IsNull([cue_cNombre],'') 
									From [dbo].[m_cuentas] WITH (NOLOCK)
									Where[cue_iid]=@idCta

								Declare @iResuelve Int = 0
								--cod_nResuelve	Descripcion
								--	0	Por Zona
								--	1	Por Usuario
								--	2	Nada
								--	3	Ambos	
								--https://basecamp.com/2249105/projects/14758734/todos/398239270				

								Select @cDesc=IsNull([cod_cdescripcion],@cCodigoAlarma), @iResuelve=IsNull([cod_nResuelve],0) 
									From [_Tablas].[dbo].[t_codigos_alarma] WITH (NOLOCK)
									Where [cod_ccodigo]=@cCodigoAlarma

								Set @Customdata = '{"cod_cdescripcion":"'+Rtrim(@CtaName)+'. '+Rtrim(@cDesc)
					
								If @iResuelve=0
								Begin
									--Set @Msg = 'en zona'

									Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = @Msg, @soloOutput=1, @translation = @translation OUTPUT
									Set @Msg = Rtrim(@translation)

									Declare @ZonaDesc nVarchar(100) =  ''
									Select @ZonaDesc=IsNull([zon_cdescripcion],@cZona) 
										From [dbo].[m_zonas] WITH (NOLOCK)
										Where[zon_iidcuenta]=@idCta And [zon_ccodigo]=@cZona

									Set @Customdata += ' '+Rtrim(@Msg) + ' ' + Rtrim(@ZonaDesc)
								End
					
								If @iResuelve=1 OR @iResuelve=3
								Begin
									Set @Msg = 'del usuario'

									Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = @Msg, @soloOutput=1, @translation = @translation OUTPUT
									Set @Msg = Rtrim(@translation)

									Set @Customdata += +' '+Rtrim(@Msg) + ' ' + Rtrim(@cNombre)
								End

								Set @Customdata += '","rec_iid":"'+CONVERT(Varchar(20), @idRec)+'"}'
							End


							/*							
							--{"cod_cdescripcion":"FAMILIA RODRIGUEZ. Intrusión en zona ","rec_iid":"62871906","notification_sound":"Push-Sonido1.mp3"}
							Ahora en caso que el usuario seleccione un sonido, debera agregarse al Customdata el sonido que selecciono, que pueden ser

							Push-Sonido1.mp3
							Push-Sonido2.mp3
							Push-Sonido3.mp3
							Push-Sonido4.mp3
							Push-Sonido5.mp3
							*/
							If (Rtrim(@cSonido) != '' And @cSonido IN('1','2','3','4','5'))
							Begin
								Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_PushNotification] @cSonido = ' + @cSonido
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
								Set @Customdata = Replace(@Customdata,'}','')
								Set @Customdata += ',"notification_sound":"Push_Sonido'+@cSonido+'.mp3"}'
							End

							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_PushNotification] @Customdata = ' + @Customdata
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							--EXEC [_Desktop].[dbo].[MessageIns] @Name = @cAsunto, @Body = @cMessageMerge, @DateCreated = @dHoy, @FromTypeId = 0, @FromId = 0, @ToTypeId = 3067, @ToId = @cTo, @Customdata = @Customdata, @EventoID = @idRec, @CuentaID = @idCta
							--2020-04-08 : Pablo x que el MessageIns daba error al devolver el registro insertado
							Insert Into _datos..Message ( [Name], [Body],[DateCreated],[FromTypeId],[FromId],[ToTypeId],[ToId],[Customdata],[EventoID],[CuentaID])
				 			Values (@cAsunto, @cMessageMerge, @dHoy, 0, 0, 3067, @cTo, @Customdata, @idRec, @idCta)

						End
					Else
						Begin
							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_PushNotification] @iIDSP=@cTo. No genero notificacion'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						End

				End
			End
			Set @cidPush = SUBSTRING( @cidPush, @nFin+1, 1000-@nFin );
		End
	End
	Fetch Next From cPushlxEvento Into @cidsPushSmartpanic,@cPlantilla,@cSubject,@cCheckPoint,@cSonido
End
Close cPushlxEvento
Deallocate cPushlxEvento
Set NoExec Off