CREATE OR ALTER PROCEDURE  [dbo].[SGSP_Test] AS 

Set DateFormat ymd

Declare @iidCuenta Int=0,
	@iReinicio        Int=0,
	@intParameter     Int=0,
	@iDiferencia      Int=0,
	@iDesactivada     Int=0,
	@iParametro       Int=0,
	@iEnviaMail       Int=0

Declare @nCada    Numeric(3,0)=0,
	@nTipo           Numeric(1,0)=0,
	@nEstado         Numeric(1,0)=0

Declare @dfechaultimotst DateTime,
	@Fecha_Hasta_aux DateTime,
	@UltimoTSTRec    DateTime,
	@Fecha_NSR_ANT   DateTime,
	@DiaHoy     	  DateTime=GetDate()

Declare @cAlarma Char(3)='',
	@cResolucion	 Char(3)='',
	@cGrabo	     Char(1)='S',
	@cUpdateStatus  Char(1)='N',
	@cPlantilla	 Char(3)=''

Declare @cAutoprocesa nVarChar(150)=''
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Set @iEnviaMail = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE' )

Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_Test] | EnviaMail => '+ Rtrim(Cast(@iEnviaMail As Varchar(10)))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare @FechaHora VarChar(19)= ( Select CONVERT(char(19), GetDate(),120) ),
	@EventoFecha VarChar(max),
	@EventoHora VarChar(max)

Declare @Query	nVarChar(255)='',
	@cFrom			nVarChar(100)=( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER'),
	@cFromName		nVarChar(100)=( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME'),
	@cTo			nVarChar(100)='',
	@cToOriginal	nVarChar(100)=( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILFALLOTEST'),
	@cMailDealer	nVarChar(100)='',	
	@cSubject		nVarChar(100)='Fallo de Testeo',
	@cMessage		nVarChar(4000)='',
	@cMessageMerge  nVarChar(max),
	@cImagenes      nVarChar(max),
	@cMail			nVarChar(300)='',
	@cToSMS		    nVarChar(150)='',
	@cDestinoSMS	nVarChar(150)=''

Declare @cCuenta	Char(80)='',
	@aut_ccodigo	Char(3)='',
	@aut_cdealer	Char(3)='',
	@aut_cprovincia	Char(3)='',
	@cue_cLinea		Char(3)='',
	@cue_cProvincia	Char(3)='',
	@cEsAP			Char(1)='',
	@Dealer			Char(3) = ''

Declare @nFin		Int=1,
	    @iModemSMS	Int=0,
		@iEnviaMailPorFalloTest Int=2	--2 es No
		
Declare @nInsert Numeric(1,0)=0
		
Set @cFrom = Ltrim(Rtrim(@cFrom))
Set @cFromName = Ltrim(Rtrim(@cFromName))

Declare @iProceso Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PROCESATST' )
--Indica si se realiza el control de Testeo. 0:No / 1:Si / 2:Si, en cuentas que no esten en FallaTST
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_Test] | Proceso => '+ Rtrim(Cast(@iProceso As Varchar(10)))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

If @iProceso > 0
    Begin	
		-- Aviso que la tarea esta funcionando
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlTST', @Repetition = 10
		--	
		DECLARE m_tst_prueba_Cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
		SELECT tst_iidCuenta,tst_cAlarma,sta_dFechaultimotst ,
			  (CASE WHEN tst_ntipo = 0 THEN DATEADD( MINUTE,tst_ncada,sta_dfechaultimotst ) 
					WHEN tst_ntipo = 1 THEN DATEADD( HOUR,tst_ncada,sta_dfechaultimotst ) 
					WHEN tst_ntipo = 2 THEN DATEADD( DAY,tst_ncada,sta_dfechaultimotst ) 
			   END ) AS Fecha_Hasta_aux ,
			  ( Select est_iidcuenta FROM m_estado_cuenta_Cab A With (NOLOCK) 
					 Where est_iidCuenta=tst_iidCuenta And ( est_nEstado=2 OR 
				( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta )
			   )) As iDesactivada,tst_cAlarmaAutoprocesa 
			 FROM m_tst_prueba With (NOLOCK)
			 Left Outer Join m_status On sta_iidCuenta=tst_iidCuenta
			 WHERE tst_ncada>0 And tst_cAlarma <> ''
			 	And (CASE WHEN @iProceso = 2 Then sta_ncuentaenfallodetst Else 0 END) = 0
				And (CASE WHEN tst_ntipo = 0 THEN DATEADD( MINUTE,tst_ncada,sta_dfechaultimotst ) 
					   WHEN tst_ntipo = 1 THEN DATEADD( HOUR,tst_ncada,sta_dfechaultimotst ) 
					   WHEN tst_ntipo = 2 THEN DATEADD( DAY,tst_ncada,sta_dfechaultimotst ) 
				 END ) <= GetDate()
			Order By Fecha_Hasta_aux

		Set @cTo = Ltrim(Rtrim(@cToOriginal))

		OPEN m_tst_prueba_Cursor
		FETCH NEXT FROM m_tst_prueba_Cursor INTO @iidCuenta , @cAlarma, @dFechaultimotst, @Fecha_Hasta_aux, @iDesactivada, @cAutoprocesa
		WHILE @@FETCH_STATUS = 0
		BEGIN
			Set @iDiferencia = DateDiff(minute,GETDATE(),@Fecha_Hasta_aux)	
			
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10)))+' | Alarma => '+ @cAlarma+' | FechaHora Ultimo TST => '+CONVERT(varchar, @dFechaultimotst,120) +' | FechaHora Hasta => '+CONVERT(varchar, @Fecha_Hasta_aux,120) + ' | Desactivada => '+ Rtrim(Cast(IsNull(@iDesactivada,0) As Varchar(10)))+' | AutoProcesa => '+ @cAutoprocesa + ' | Diferencia => '+ Rtrim(Cast(@iDiferencia As Varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF ( @iDiferencia Is Null Or @iDiferencia <= 0 ) And Year(@dFechaultimotst) != 1900
				Begin
					Set @cResolucion =''
					Set @nEstado = 0
					Set @cUpdateStatus = 'S'
					If NOT @iDesactivada Is Null
						Begin	
							--La cuenta esta Desactivada.Grabo con Resolucion Desactivada y Estado 7
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | --La cuenta esta Desactivada.('+Rtrim(Cast(@iidCuenta As Varchar(10)))+') Grabo con Resolucion Desactivada y Estado 7--'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							Set @cResolucion = (Select CAST(par_ivalor As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='MODO NO HABILITADO')
							Set @cResolucion = Stuff('000',4-Len(@cResolucion),Len(@cResolucion),@cResolucion)
							Set @nEstado = 7
							Set @cUpdateStatus = 'N'
						End	

					--Si viene categorizado como NoHabilitada se trata como un Evento de NO GENERAR, NO se graba p_recepcion			
					If @nEstado = 7
					   Set @iParametro = 2
					Else
					   Set @iParametro = ( SELECT cod_nalerta From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo=@cAlarma )

					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Parametro => '+ Rtrim(Cast(@iParametro As Varchar(10)))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					--2 Es un Evento de NO GENERAR, NO se graba p_recepcion			
					If @iParametro < 2
						Begin	
							--Si NO Genera Alerta (0) lo grabo con estado 5
							If @iParametro = 0
								Set @nEstado = 5
							
							Declare @bExecAlarmaSMS Int = 0

							If @cGrabo = 'S'	
								Begin
									BEGIN TRY
										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Execute [dbo].[SGSP_pRecepcionINS] con @nEstado => '+ Rtrim(Cast(@nEstado As Varchar(10))) + ' | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10)))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										EXEC [dbo].[SGSP_pRecepcionINS]
											@rec_iidcuenta = @iidCuenta,
											@rec_calarma = @cAlarma,
											@rec_tfechahora  = @DiaHoy,
											@rec_nestado  = @nEstado,
											@rec_ioperador = 0,
											@rec_idResolucion = @cResolucion,
											@rec_tFechaRecepcion = @DiaHoy,
											@rec_nOrigen = 8,
											@iValor = @intParameter OUTPUT
									END TRY
									BEGIN CATCH
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Execute [dbo].[SGSP_pRecepcionINS] Volvio con error'
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
										Set @intParameter=0
									END CATCH

									if @intParameter > 0
									Begin
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Execute [dbo].[SGSP_pRecepcionINS] Volvio con ID => '+ Rtrim(Cast(@intParameter As Varchar(10)))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										--Dealer para notificaciones x mail--
										Select @Dealer = IsNull(cue_clinea,'') From m_cuentas Where cue_iid = @iidCuenta
										
										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Dealer para notificaciones x mail => '+ @Dealer
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										--PushNotification--
										--Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Execute [dbo].[SGSP_PushNotification] con @intParameter => '+ Rtrim(Cast(@intParameter As Varchar(10)))
										--RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
										--Execute SGSP_PushNotification @intParameter
										--2023-12-28 : Pablo. Se cambio a [SGSP_AlarmaSMS] para tambien tener notificaciones por dealer
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Execute [dbo].[SGSP_AlarmaSMS] | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10)))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
										Execute [dbo].[SGSP_AlarmaSMS] @idCta = @iidCuenta, @cCodigoAlarma = @cAlarma, @idRec = @intParameter
										--2025-11-10 : Pablo. Como se cambio a [SGSP_AlarmaSMS] este ya hace envio de SMS y Mails, por lo tanto NO hay que enviarlos aca
										Set @bExecAlarmaSMS=1

										--Reporte Autoridades
										--Primero busco si hay autoridades y eventos automaticos/autoProcesados a controlar 
										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Reporte Autoridades | --Primero busco si hay autoridades y eventos automaticos/autoProcesados a controlar--'
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										DECLARE cAutoridad CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
											Select aut_ccodigo,aut_cdealer,aut_cprovincia, (Case When CHARINDEX(@cAlarma,aut_cAutoProcesados) > 0 Then 'S' Else 'N' End) As cEsAP
												From _Tablas.dbo.t_autoridades
												Where CHARINDEX(@cAlarma,aut_meventosauto) > 0 Or  CHARINDEX(@cAlarma,aut_cAutoProcesados) > 0 

										OPEN cAutoridad
										FETCH NEXT FROM cAutoridad INTO @aut_ccodigo,@aut_cdealer,@aut_cprovincia,@cEsAP
										WHILE @@FETCH_STATUS = 0
										BEGIN
											--Segundo busco la provincia y el dealer de la cuenta
											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Reporte Autoridades | --Segundo busco la provincia y el dealer de la cuenta--'
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											DECLARE cCta CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
							   					Select cue_cLinea ,cue_cProvincia From m_cuentas
												Where cue_iid=@iidCuenta
							
											OPEN cCta
											FETCH NEXT FROM cCta INTO @cue_cLinea,@cue_cProvincia
											WHILE @@FETCH_STATUS = 0
											BEGIN
												Set @nInsert = 0
	
												If @aut_cdealer = @cue_cLinea And @aut_cprovincia = @cue_cProvincia
													Set @nInsert = 1
												Else 
													If Ltrim(Rtrim(@aut_cdealer))= '' And @aut_cprovincia = @cue_cProvincia
														Set @nInsert = 1
													Else
														If @aut_cdealer = @cue_cLinea And Ltrim(Rtrim(@aut_cprovincia))= ''
															Set @nInsert = 1
														Else
															If Ltrim(Rtrim(@aut_cdealer))= '' And Ltrim(Rtrim(@aut_cprovincia))= ''
																Set @nInsert = 1
									 
												If @nInsert = 1
												   Begin
												   		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
														Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Reporte Autoridades | Insert Into p_reporte_autoridades'
														RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

														Insert Into p_reporte_autoridades(rep_cautoridad,rep_iidcuenta,rep_calarma,rep_dfechahora,rep_czona,rep_iidrecepcion)
														VALUES(@aut_ccodigo,@iidCuenta,@cAlarma,GetDate(),'',@intParameter)
									  
														If @cEsAP = 'S' And @cGrabo = 'S'	And @nEstado <> 5
															Begin
																--Busco Categorizacion de Reporte Autoridad Auto Procesado
																Set @cResolucion = (Select CAST(par_ivalor As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='CATREPAUTORIDADAP')
																Set @cResolucion = Stuff('000',4-Len(@cResolucion),Len(@cResolucion),@cResolucion)

																Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
																Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Reporte Autoridades | UPDATE p_recepcion con Categorizacion de Reporte Autoridad Auto Procesado => ' + @cResolucion
																RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

																UPDATE p_recepcion Set rec_nestado=5, rec_idResolucion=@cResolucion Where rec_iid=@intParameter
															End

												   End
								
											   FETCH NEXT FROM cCta INTO @cue_cLinea,@cue_cProvincia
											End
					
										   CLOSE cCta
										   DEALLOCATE cCta

										FETCH NEXT FROM cAutoridad INTO @aut_ccodigo,@aut_cdealer,@aut_cprovincia,@cEsAP
										End
					
										CLOSE cAutoridad
										DEALLOCATE cAutoridad
									End
								End --del If grabo								


							--Envio Mail
							Set @cCuenta = ( SELECT cue_clinea+'-'+Rtrim(cue_ncuenta)+' '+cue_cnombre FROM m_cuentas Where cue_iid=@iidCuenta )	
							Set @cMessage = 'En cuenta ' + Rtrim(@cCuenta) + ' | ' +@cAlarma+' | '+CONVERT(char(19), GetDate(),120)  

							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail | Message => ' + @cMessage
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							Set @cMail = @cTo 
							Set @cMailDealer = ''
							Set @iEnviaMailPorFalloTest = 2

							SELECT @cMailDealer=lin_cmail, @iEnviaMailPorFalloTest=lin_iEnviaMailPorFalloTest FROM _Tablas.dbo.t_lineas Inner Join m_cuentas On lin_ccodigo=cue_clinea Where cue_iid=@iidCuenta 

							If @iEnviaMailPorFalloTest = 2 Or @iEnviaMailPorFalloTest Is Null
								Set @cMailDealer = ''

							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail | Mail => ' + @cMail + ' | MailDealer => ' + @cMailDealer
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							IF @cMailDealer Is Not Null And @cMailDealer <> ''
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'+@cMailDealer +';'	
									Else
										Set @cMail = @cMailDealer +';'	
								End				
							Else 				
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'
								End	
						
							WHILE CHARINDEX(';',@cMail) > 0
							BEGIN
								Set @nFin = CHARINDEX(';',@cMail)	
								Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
								Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
							
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail | Query => ' + @Query
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								If @cGrabo = 'S' And @iEnviaMail = 1		
									EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

								If @cGrabo = 'S' And @iEnviaMail = 2		
									Begin	
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									Execute SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cAlarma,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT
									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage
									Else
										Begin
											--Uso el nombre de la plantilla como Subject
											Set @cSubject = ( Select [pls_cdescripcion] From _Tablas.dbo.t_plantillas_sms WHere pls_ccodigo=@cAlarma )
											If @cSubject Is Null Or @cSubject = ''
												Set @cSubject = 'Fallo de Testeo'
										End

										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
										
										Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta

									End
							   
								Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin )
							END
							--

							--Envio de Mail x Evento
							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail x Evento | Alarma => ' + @cAlarma
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	  						Select Top 1 @cMail=sms_cmailparaeventos,@cPlantilla=sms_cplantillamail,@cSubject=pls_cdescripcion From m_sms
								Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillamail
 								Where sms_cmailparaeventos<> ''  And sms_cplantillamail<>'' And sms_iidCuenta=@iidCuenta And
									( CHARINDEX(@cAlarma, sms_meventos) > 0  Or
									( sms_iNotificarAlertas=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1)) Or
									( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

							If @cMail <> ''
								Set @cMail = @cMail +';'

							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail x Evento | Mail => ' + @cMail
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							WHILE CHARINDEX(';',@cMail) > 0
							BEGIN
								Set @nFin = CHARINDEX(';',@cMail)	
								Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
								Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
							
								If @cGrabo = 'S' And @iEnviaMail = 1		
									EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

								If @cGrabo = 'S' And @iEnviaMail = 2		
									Begin	
									--Si ya proceso la plantilla para mail x dealer/parametro NO la uso x que puede ser otra plantilla
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage

									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
									Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail x Evento | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta

									End
							   
								Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin )
							END
							Set @cTo = Ltrim(Rtrim(@cToOriginal))	--Dejo el original para el loop
							Set @cToSMS = ''
							Set @iModemSMS = 0
							--							

							--Mail por evento para Dealer
							If @cGrabo = 'S' And @iEnviaMail = 2		
							Begin	
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail x Evento para Dealer | Dealer => ' + @Dealer
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
								
								If @Dealer <> ''
								Begin
									Declare cMailxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	  									Select [tnd_cMail],[tnd_cPlantillaMail],[pls_cdescripcion]
											From [_Tablas].[dbo].[T_Notificaciones_Dealer]
											Inner Join [_Tablas].[dbo].[t_plantillas_sms] On [pls_ccodigo]=[tnd_cPlantillaMail]
 										Where [tnd_cMail]<> '' And [tnd_cPlantillaMail]<>'' And [tnd_cDealer]=@Dealer And [tnd_iTipo]=0 And
												( CHARINDEX(@cAlarma, [tnd_cAlarmas]) > 0  Or
	 											( [tnd_iNotificarAlertas]=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1) ) Or
												( [tnd_iGrupoAlarmas]>0 And [tnd_iGrupoAlarmas] IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )
	
									Open cMailxEvento
									Fetch Next From cMailxEvento Into @cMail,@cPlantilla,@cSubject
									While @@FETCH_STATUS = 0
									Begin
										If @cMail <> ''
											Set @cMail = @cMail +';'

										WHILE CHARINDEX(';',@cMail) > 0
										Begin
											Set @nFin = CHARINDEX(';',@cMail)	
											Set @cTo = SUBSTRING( @cMail, 1, @nFin-1 )
											Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
			
											--Blanqueo para que el loop no los tenga con datos
											Set @cMessageMerge = ''
											Set @cImagenes = ''
											--

											Set @EventoFecha = LEFT(@FechaHora,11) 
											Set @EventoHora = RIGHT(@FechaHora,8) 
											Set @cMessageMerge = ''
											EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

											If @cMessageMerge Is Null
												Set @cMessageMerge = @cSubject

											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio Mail x Evento para Dealer | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta

											Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin );
										End
	
										Fetch Next From cMailxEvento Into @cMail,@cPlantilla,@cSubject
									End
									Close cMailxEvento
									Deallocate cMailxEvento

									Set @cTo = Ltrim(Rtrim(@cToOriginal))	--Dejo el original para el loop
									Set @cToSMS = ''
									Set @iModemSMS = 0
								End
							End
							--
							If @bExecAlarmaSMS=0
							Begin
								--Envio de SMS
								Select Top 1 @cToSMS=sms_csmsparaeventos, @iModemSMS=sms_imodemsms, @cPlantilla=sms_cplantillasms, @cSubject=pls_cdescripcion From m_sms
									Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillasms
			 					  Where sms_csmsparaeventos<>'' And sms_cplantillasms<>'' And sms_imodemsms>0 And sms_iidCuenta=@iidCuenta And
									 ( CHARINDEX(@cAlarma, sms_meventos) > 0  Or
									 ( sms_iNotificarAlertas=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1)) Or
									 ( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

								Set @cToSMS = Ltrim(Rtrim(@cToSMS))+';'

								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio de SMS | ToSMS => ' + @cToSMS
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								WHILE CHARINDEX(';',@cToSMS) > 0 And @iModemSMS > 0
								BEGIN
								   Set @nFin = CHARINDEX(';',@cToSMS)	
								   Set @cDestinoSMS=SUBSTRING( @cToSMS, 1, @nFin-1 )
								   If @cGrabo = 'S'
									Begin
										Set @EventoFecha = LEFT(@FechaHora,11) 
										Set @EventoHora = RIGHT(@FechaHora,8) 
										Set @cMessageMerge = ''
										Execute SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

										If @cMessageMerge Is Null
											Set @cMessageMerge = @cMessage

										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Envio de SMS | Execute SGSP_SaveSMSQueue | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) + ' | ModemSMS => ' + Rtrim(Cast(@iModemSMS As Varchar(10))) + ' | MessageMerge => ' + @cMessageMerge + ' | DestinoSMS => ' + @cDestinoSMS 
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										Execute SGSP_SaveSMSQueue @iidCuenta,@iModemSMS,@cMessageMerge,@cDestinoSMS	
										--Insert Into p_SMSqueue (que_idCuenta,que_iModemSMS,que_cAsunto,que_cDestino)
										--Values (@iidCuenta,@iModemSMS,@cMessageMerge,@cDestinoSMS)
										----Values (@iidCuenta,@iModemSMS,@cSubject+' : '+@cMessage,@cDestinoSMS)
									End
								
								   Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 150-@nFin )
								END
								--	
							End
					    End

						Set @UltimoTSTRec = GETDATE()

						If @cGrabo = 'S'	
							Begin  
								---Actualizo el m_status
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Actualizo el m_status | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10))) + ' | FechaHora Ultimo TST => '+CONVERT(varchar, @UltimoTSTRec,120) 
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								UPDATE m_status Set sta_dFechaultimotst = @UltimoTSTRec Where sta_iidCuenta=@iidCuenta
								---Si la cuenta esta NoHabilitada NO actualizo fallodetst
								If @cUpdateStatus = 'S'
	   						      Begin	
									UPDATE m_status Set sta_ncuentaenfallodetst = 1, sta_cultimaalarma = @cAlarma, sta_dfechautimaalarma = CONVERT(DateTime, CONVERT(Varchar(20), @DiaHoy, 120),111) Where sta_iidCuenta=@iidCuenta

									--Tengo q actualizar desde cuando esta en Fallo pero solo si la fecha esta null
									UPDATE m_status Set sta_tEnFalloDeTSTDesde = @UltimoTSTRec Where sta_iidCuenta=@iidCuenta And sta_tEnFalloDeTSTDesde Is Null

									--Si se configuro @cAutoprocesa entonces hay que insertar en [EventosEnFalloTesteo]
									If @cAutoprocesa <> ''
									Begin
										Set @cAutoprocesa = '1|,'+@cAutoprocesa
										
										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control de TST | Execute [dbo].[SGSP_Fill_EventosEnFalloTesteo] | Autoprocesa => ' + @cAutoprocesa  + ' | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10)))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										Execute [dbo].[SGSP_Fill_EventosEnFalloTesteo]	@idRecNoRes = @intParameter, @idCuenta = @iidCuenta, @tEventoFechaHora = @DiaHoy, @cAlarmaAutoprocesa = @cAutoprocesa
									End

								  End	
							End			

				End

		   FETCH NEXT FROM m_tst_prueba_Cursor INTO @iidCuenta , @cAlarma, @dFechaultimotst, @Fecha_Hasta_aux, @iDesactivada, @cAutoprocesa
		End

		CLOSE m_tst_prueba_Cursor
		DEALLOCATE m_tst_prueba_Cursor

    End
Else	-- Aviso que la tarea no cumple las condiciones para funcionar
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlTST', @Repetition = 10, @Date = null, @Status = 0	

------------------------------------------------------------------------------------------------
----2do TST
------------------------------------------------------------------------------------------------
Set @iProceso = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PROCESA2TST' )
--Indica si se realiza el control de Testeo. 0:No / 1:Si / 2:Si, en cuentas que no esten en FallaTST
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Proceso => '+ Rtrim(Cast(@iProceso As Varchar(10)))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iProceso > 0
    Begin	
		-- Aviso que la tarea esta funcionando
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'Control2TST', @Repetition = 10
		--	

		DECLARE m_tst_prueba_Cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
		SELECT tst_iidCuenta,tst_cAlarmaGenerar,sta_dFechaultimo2dotst ,
			  (CASE WHEN tst_ntipo2 = 0 THEN DATEADD( MINUTE,tst_ncada2,sta_dfechaultimo2dotst ) 
					WHEN tst_ntipo2 = 1 THEN DATEADD( HOUR,tst_ncada2,sta_dfechaultimo2dotst ) 
					WHEN tst_ntipo2 = 2 THEN DATEADD( DAY,tst_ncada2,sta_dfechaultimo2dotst ) 
			   END ) AS Fecha_Hasta_aux ,
			  ( Select est_iidcuenta FROM m_estado_cuenta_Cab A With (NOLOCK) 
					 Where est_iidCuenta=tst_iidCuenta And ( est_nEstado=2 OR 
				( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta )
			   )) As iDesactivada,tst_cAlarma2Autoprocesa 
			 FROM m_tst_prueba With (NOLOCK)
			 Left Outer Join m_status On sta_iidCuenta=tst_iidCuenta
			 WHERE tst_ncada2>0 And tst_cAlarmaGenerar <> ''
			 And (CASE WHEN @iProceso = 2 Then sta_ncuentaenfallo2dotst Else 0 END) = 0
			 And (CASE WHEN tst_ntipo2 = 0 THEN DATEADD( MINUTE,tst_ncada2,sta_dfechaultimo2dotst ) 
				 WHEN tst_ntipo2 = 1 THEN DATEADD( HOUR,tst_ncada2,sta_dfechaultimo2dotst ) 
				  WHEN tst_ntipo2 = 2 THEN DATEADD( DAY,tst_ncada2,sta_dfechaultimo2dotst ) 
				 END ) <= GetDate()
			Order By Fecha_Hasta_aux

		Set @cSubject = 'Fallo de 2do Testeo'
		Set @cTo = Ltrim(Rtrim(@cToOriginal))
		OPEN m_tst_prueba_Cursor
		FETCH NEXT FROM m_tst_prueba_Cursor INTO @iidCuenta , @cAlarma, @dFechaultimotst, @Fecha_Hasta_aux, @iDesactivada, @cAutoprocesa
		WHILE @@FETCH_STATUS = 0
		BEGIN
			Set @iDiferencia = DateDiff(minute,GETDATE(),@Fecha_Hasta_aux)
			
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10)))+' | Alarma => '+ @cAlarma+' | FechaHora Ultimo TST => '+CONVERT(varchar, @dFechaultimotst,120) +' | FechaHora Hasta => '+CONVERT(varchar, @Fecha_Hasta_aux,120) + ' | Desactivada => '+ Rtrim(Cast(IsNull(@iDesactivada,0) As Varchar(10)))+' | AutoProcesa => '+ @cAutoprocesa + ' | Diferencia => '+ Rtrim(Cast(@iDiferencia As Varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF ( @iDiferencia Is Null Or @iDiferencia <= 0 ) And Year(@dFechaultimotst) != 1900
				Begin
					Set @cResolucion =''
					Set @nEstado = 0
					Set @cUpdateStatus = 'S'
					If NOT @iDesactivada Is Null
						Begin	
							--La cuenta esta Desactivada.Grabo con Resolucion Desactivada y Estado 7
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | --La cuenta esta Desactivada. Grabo con Resolucion Desactivada y Estado 7--'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
							
							Set @cResolucion = (Select CAST(par_ivalor As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='MODO NO HABILITADO')
							Set @cResolucion = Stuff('000',4-Len(@cResolucion),Len(@cResolucion),@cResolucion)
							Set @nEstado = 7
							Set @cUpdateStatus = 'N'
						End	

					--Si viene categorizao como NoHabilitada se trata como un Evento de NO GENERAR, NO se graba p_recepcion			
					If @nEstado = 7
					   Set @iParametro = 2
					Else
					   Set @iParametro = ( SELECT cod_nalerta From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo=@cAlarma )

					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Parametro => '+ Rtrim(Cast(@iParametro As Varchar(10)))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					--2 Es un Evento de NO GENERAR, NO se graba p_recepcion			
					If @iParametro < 2
						Begin	
							--Si NO Genera Alerta (0) lo grabo con estado 5
							If @iParametro = 0
								Set @nEstado = 5

							If @cGrabo = 'S'	
								Begin 
									BEGIN TRY
										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Execute [dbo].[SGSP_pRecepcionINS] con @nEstado => '+ Rtrim(Cast(@nEstado As Varchar(10)))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										Execute [dbo].[SGSP_pRecepcionINS]
												@rec_iidcuenta = @iidCuenta,
												@rec_calarma = @cAlarma,
												@rec_tfechahora  = @DiaHoy,
												@rec_nestado  = @nEstado,
												@rec_ioperador = 0,
												@rec_idResolucion = @cResolucion,
												@rec_tFechaRecepcion = @DiaHoy,
												@rec_nOrigen = 8,
												@iValor = @intParameter OUTPUT
									END TRY
									BEGIN CATCH
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Execute [dbo].[SGSP_pRecepcionINS] Volvio con error'
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										Set @intParameter=0
									END CATCH

									if @intParameter > 0
									Begin
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Execute [dbo].[SGSP_pRecepcionINS] Volvio con ID => '+ Rtrim(Cast(@intParameter As Varchar(10)))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										--Dealer para notificaciones x mail--
										Select @Dealer = IsNull(cue_clinea,'') From m_cuentas Where cue_iid = @iidCuenta
										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Dealer para notificaciones x mail => '+ @Dealer
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										--PushNotification--
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Execute [dbo].[SGSP_PushNotification] con @intParameter => '+ Rtrim(Cast(@intParameter As Varchar(10)))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
										Execute SGSP_PushNotification @intParameter

										--Reporte Autoridades
										--Primero busco si hay autoridades y eventos automaticos/autoProcesados a controlar 
										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Reporte Autoridades | --Primero busco si hay autoridades y eventos automaticos/autoProcesados a controlar--'
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
										DECLARE cAutoridad CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
											Select aut_ccodigo,aut_cdealer,aut_cprovincia, (Case When CHARINDEX(@cAlarma,aut_cAutoProcesados) > 0 Then 'S' Else 'N' End) As cEsAP
												From _Tablas.dbo.t_autoridades
												Where CHARINDEX(@cAlarma,aut_meventosauto) > 0 Or  CHARINDEX(@cAlarma,aut_cAutoProcesados) > 0 

										OPEN cAutoridad
										FETCH NEXT FROM cAutoridad INTO @aut_ccodigo,@aut_cdealer,@aut_cprovincia,@cEsAP
										WHILE @@FETCH_STATUS = 0
										BEGIN
											--Segundo busco la provincia y el dealer de la cuenta
											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Reporte Autoridades | --Segundo busco la provincia y el dealer de la cuenta--'
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											DECLARE cCta CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
							   					Select cue_cLinea ,cue_cProvincia From m_cuentas
												Where cue_iid=@iidCuenta
							
											OPEN cCta
											FETCH NEXT FROM cCta INTO @cue_cLinea,@cue_cProvincia
											WHILE @@FETCH_STATUS = 0
											BEGIN
												Set @nInsert = 0
	
												If @aut_cdealer = @cue_cLinea And @aut_cprovincia = @cue_cProvincia
													Set @nInsert = 1
												Else 
													If Ltrim(Rtrim(@aut_cdealer))= '' And @aut_cprovincia = @cue_cProvincia
														Set @nInsert = 1
													Else
														If @aut_cdealer = @cue_cLinea And Ltrim(Rtrim(@aut_cprovincia))= ''
															Set @nInsert = 1
														Else
															If Ltrim(Rtrim(@aut_cdealer))= '' And Ltrim(Rtrim(@aut_cprovincia))= ''
																Set @nInsert = 1
									 
												If @nInsert = 1
													Begin
												   		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
														Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Reporte Autoridades | Insert Into p_reporte_autoridades'
														RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

														Insert Into p_reporte_autoridades(rep_cautoridad,rep_iidcuenta,rep_calarma,rep_dfechahora,rep_czona,rep_iidrecepcion)
														VALUES(@aut_ccodigo,@iidCuenta,@cAlarma,GetDate(),'',@intParameter)
									  
														If @cEsAP = 'S' And @cGrabo = 'S'	And @nEstado <> 5
														Begin
															--Busco Categorizacion de Reporte Autoridad Auto Procesado
															Set @cResolucion = (Select CAST(par_ivalor As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='CATREPAUTORIDADAP')
															Set @cResolucion = Stuff('000',4-Len(@cResolucion),Len(@cResolucion),@cResolucion)

															Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
															Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Reporte Autoridades | UPDATE p_recepcion con Categorizacion de Reporte Autoridad Auto Procesado => ' + @cResolucion
															RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

															UPDATE p_recepcion Set rec_nestado=5, rec_idResolucion=@cResolucion Where rec_iid=@intParameter
														End
													 End
								
												FETCH NEXT FROM cCta INTO @cue_cLinea,@cue_cProvincia
											End
					
											CLOSE cCta
											DEALLOCATE cCta

							
									FETCH NEXT FROM cAutoridad INTO @aut_ccodigo,@aut_cdealer,@aut_cprovincia,@cEsAP
									End
					
									CLOSE cAutoridad
									DEALLOCATE cAutoridad
								End
							End --del If grabo									

							--Envio Mail
							Set @cCuenta = ( SELECT cue_clinea+'-'+Rtrim(cue_ncuenta)+' '+cue_cnombre FROM m_cuentas Where cue_iid=@iidCuenta )	
							Set @cMessage = 'En cuenta ' + Rtrim(@cCuenta) + ' | ' +@cAlarma+' | '+CONVERT(char(19), GetDate(),120)  

							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail | Message => ' + @cMessage
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							Set @cMail = @cTo 
							Set @cMailDealer = ''
							Set @iEnviaMailPorFalloTest = 2

							SELECT @cMailDealer=lin_cmail, @iEnviaMailPorFalloTest=lin_iEnviaMailPorFalloTest FROM _Tablas.dbo.t_lineas Inner Join m_cuentas On lin_ccodigo=cue_clinea Where cue_iid=@iidCuenta 

							If @iEnviaMailPorFalloTest = 2 Or @iEnviaMailPorFalloTest Is Null
								Set @cMailDealer = ''

							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail | Mail => ' + @cMail + ' | MailDealer => ' + @cMailDealer
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							IF @cMailDealer Is Not Null And @cMailDealer <> ''
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'+@cMailDealer +';'	
									Else
										Set @cMail = @cMailDealer +';'	
								End				
							Else 				
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'
								End	
						
							WHILE CHARINDEX(';',@cMail) > 0
							BEGIN
							   Set @nFin = CHARINDEX(';',@cMail)	
							   Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
							   Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
					
							   Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							   Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail | Query => ' + @Query
							   RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
							   If @cGrabo = 'S' And @iEnviaMail = 1		
								  EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

							   If @cGrabo = 'S' And @iEnviaMail = 2		
								  Begin	
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cAlarma,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT
									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage
									Else
										Begin
											--Uso el nombre de la plantilla como Subject
											Set @cSubject = ( Select [pls_cdescripcion] From _Tablas.dbo.t_plantillas_sms WHere pls_ccodigo=@cAlarma )
											If @cSubject Is Null Or @cSubject = ''
												Set @cSubject = 'Fallo de 2do Testeo'
										End

									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL',@cImagenes, 802, @iidCuenta
								  End
							   
							   Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin )
							END
							--

							--Envio de Mail x Evento
							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail x Evento | Alarma => ' + @cAlarma
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	  						Select Top 1 @cMail=sms_cmailparaeventos,@cPlantilla=sms_cplantillamail,@cSubject=pls_cdescripcion From m_sms
								Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillamail
 							  Where sms_cmailparaeventos<> '' And sms_cplantillamail<>'' And sms_iidCuenta=@iidCuenta And 
									 ( CHARINDEX(@cAlarma, sms_meventos) > 0  Or
									 ( sms_iNotificarAlertas=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1)) Or
									 ( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

							If @cMail <> ''
								Set @cMail = @cMail +';'

							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail x Evento | Mail => ' + @cMail
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							WHILE CHARINDEX(';',@cMail) > 0
							BEGIN
							   Set @nFin = CHARINDEX(';',@cMail)	
							   Set @cTo = SUBSTRING( @cMail, 1, @nFin-1 )
							   Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
							
							   If @cGrabo = 'S' And @iEnviaMail = 1		
								  EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

							   If @cGrabo = 'S' And @iEnviaMail = 2		
								  Begin	
								    --Si ya proceso la plantilla para mail x dealer/parametro NO la uso x que puede ser otra plantilla
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage

									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
									Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail x Evento | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta
								  End
							   
							   Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin )
							END 
							Set @cTo = Ltrim(Rtrim(@cToOriginal))	--Dejo el original para el loop
							Set @cToSMS = ''
							Set @iModemSMS = 0
							--							

							--Mail por evento para Dealer
						    If @cGrabo = 'S' And @iEnviaMail = 2		
							Begin	
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail x Evento para Dealer | Dealer => ' + @Dealer
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								If @Dealer <> ''
								Begin
									Declare cMailxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	  									Select [tnd_cMail],[tnd_cPlantillaMail],[pls_cdescripcion]
											From [_Tablas].[dbo].[T_Notificaciones_Dealer]
											Inner Join [_Tablas].[dbo].[t_plantillas_sms] On [pls_ccodigo]=[tnd_cPlantillaMail]
 										Where [tnd_cMail]<> '' And [tnd_cPlantillaMail]<>'' And [tnd_cDealer]=@Dealer And [tnd_iTipo]=0 And
											  ( CHARINDEX(@cAlarma, [tnd_cAlarmas]) > 0  Or
											  ( [tnd_iNotificarAlertas]=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1) ) Or
											  ( [tnd_iGrupoAlarmas]>0 And [tnd_iGrupoAlarmas] IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )
	
									Open cMailxEvento
									Fetch Next From cMailxEvento Into @cMail,@cPlantilla,@cSubject
									While @@FETCH_STATUS = 0
									Begin
										If @cMail <> ''
											Set @cMail = @cMail +';'

										WHILE CHARINDEX(';',@cMail) > 0
										Begin
											Set @nFin = CHARINDEX(';',@cMail)	
											Set @cTo = SUBSTRING( @cMail, 1, @nFin-1 )
											Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
			
											--Blanqueo para que el loop no los tenga con datos
											Set @cMessageMerge = ''
											Set @cImagenes = ''
											--

											Set @EventoFecha = LEFT(@FechaHora,11) 
											Set @EventoHora = RIGHT(@FechaHora,8) 
											Set @cMessageMerge = ''
											EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

											If @cMessageMerge Is Null
												Set @cMessageMerge = @cSubject

											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio Mail x Evento para Dealer | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta

											Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin );
										End
	
									   Fetch Next From cMailxEvento Into @cMail,@cPlantilla,@cSubject
									End
									Close cMailxEvento
									Deallocate cMailxEvento

									Set @cTo = Ltrim(Rtrim(@cToOriginal))	--Dejo el original para el loop
									Set @cToSMS = ''
									Set @iModemSMS = 0
								End
							End
							--

							--Envio de SMS
							Select Top 1 @cToSMS=sms_csmsparaeventos, @iModemSMS=sms_imodemsms, @cPlantilla=sms_cplantillasms, @cSubject=pls_cdescripcion From m_sms
								Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillasms
			 				  Where sms_csmsparaeventos<>'' And sms_cplantillasms<>'' And sms_imodemsms>0 And sms_iidCuenta=@iidCuenta And
								 ( CHARINDEX(@cAlarma, sms_meventos) > 0  Or
								 ( sms_iNotificarAlertas=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1)) Or
								 ( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

							Set @cToSMS = Ltrim(Rtrim(@cToSMS))+';'
							
							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio de SMS | ToSMS => ' + @cToSMS
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							WHILE CHARINDEX(';',@cToSMS) > 0 And @iModemSMS > 0
							BEGIN
							   Set @nFin = CHARINDEX(';',@cToSMS)	
							   Set @cDestinoSMS=SUBSTRING( @cToSMS, 1, @nFin-1 )
							   If @cGrabo = 'S'
								Begin
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage

									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
									Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Envio de SMS | Execute SGSP_SaveSMSQueue | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) + ' | ModemSMS => ' + Rtrim(Cast(@iModemSMS As Varchar(10))) + ' | MessageMerge => ' + @cMessageMerge + ' | DestinoSMS => ' + @cDestinoSMS 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Execute SGSP_SaveSMSQueue @iidCuenta,@iModemSMS,@cMessageMerge,@cDestinoSMS	
									--Insert Into p_SMSqueue (que_idCuenta,que_iModemSMS,que_cAsunto,que_cDestino)
									--Values (@iidCuenta,@iModemSMS,@cMessageMerge,@cDestinoSMS)
									----Values (@iidCuenta,@iModemSMS,@cSubject+' : '+@cMessage,@cDestinoSMS)
								End
							
							   Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 150-@nFin )
							END
							--														
					    End

						Set @UltimoTSTRec = GETDATE()
						If @cGrabo = 'S'	
							Begin  
								---Actualizo el m_status
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Actualizo el m_status | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10))) + ' | FechaHora Ultimo TST => '+CONVERT(varchar, @UltimoTSTRec,120) 
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								UPDATE m_status Set sta_dFechaultimo2dotst = @UltimoTSTRec Where sta_iidCuenta=@iidCuenta
								---Si la cuenta esta NoHabilitada NO actualizo fallodetst
								If @cUpdateStatus = 'S'
									Begin	
										UPDATE m_status Set sta_ncuentaenfallo2dotst = 1, sta_cultimaalarma = @cAlarma, sta_dfechautimaalarma = CONVERT(DateTime, CONVERT(Varchar(20), @DiaHoy, 120),111) Where sta_iidCuenta=@iidCuenta
									
										--Tengo q actualizar desde cuando esta en Fallo pero solo si la fecha esta null
										UPDATE m_status Set sta_tEnFalloDeTST2Desde = @UltimoTSTRec Where sta_iidCuenta=@iidCuenta And sta_tEnFalloDeTST2Desde Is Null

										--Si se configuro @cAutoprocesa entonces hay que insertar en [EventosEnFalloTesteo]
										If @cAutoprocesa <> ''
										Begin
											Set @cAutoprocesa = '2|,'+@cAutoprocesa
										
											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control2TST | Execute [dbo].[SGSP_Fill_EventosEnFalloTesteo] | Autoprocesa => '+@cAutoprocesa
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											Execute [dbo].[SGSP_Fill_EventosEnFalloTesteo]	@idRecNoRes = @intParameter, @idCuenta = @iidCuenta, @tEventoFechaHora = @DiaHoy, @cAlarmaAutoprocesa = @cAutoprocesa
										End


									End	
							End 
				End

			FETCH NEXT FROM m_tst_prueba_Cursor INTO @iidCuenta , @cAlarma, @dFechaultimotst, @Fecha_Hasta_aux, @iDesactivada, @cAutoprocesa
		End

		CLOSE m_tst_prueba_Cursor
		DEALLOCATE m_tst_prueba_Cursor

    End
Else	-- Aviso que la tarea no cumple las condiciones para funcionar
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'Control2TST', @Repetition = 10, @Date = null, @Status = 0	

------------------------------------------------------------------------------------------------
----3er TST
------------------------------------------------------------------------------------------------
Set  @iProceso = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PROCESA3TST' )
--Indica si se realiza el control de Testeo. 0:No / 1:Si / 2:Si, en cuentas que no esten en FallaTST
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Proceso => '+ Rtrim(Cast(@iProceso As Varchar(10)))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iProceso > 0
    Begin	
		-- Aviso que la tarea esta funcionando
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'Control3TST', @Repetition = 10
		--	

		DECLARE m_tst_prueba_Cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
		SELECT tst_iidCuenta,tst_cAlarma3Generar,sta_dFechaultimo3ertst ,
			  (CASE WHEN tst_ntipo3 = 0 THEN DATEADD( MINUTE,tst_ncada3,sta_dfechaultimo3ertst ) 
					WHEN tst_ntipo3 = 1 THEN DATEADD( HOUR,tst_ncada3,sta_dfechaultimo3ertst ) 
					WHEN tst_ntipo3 = 2 THEN DATEADD( DAY,tst_ncada3,sta_dfechaultimo3ertst ) 
			   END ) AS Fecha_Hasta_aux ,
			  ( Select est_iidcuenta FROM m_estado_cuenta_Cab A With (NOLOCK) 
					 Where est_iidCuenta=tst_iidCuenta And ( est_nEstado=2 OR 
				( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta )
			   )) As iDesactivada,tst_cAlarma3Autoprocesa 
			 FROM m_tst_prueba With (NOLOCK)
			 Left Outer Join m_status On sta_iidCuenta=tst_iidCuenta
			 WHERE tst_ncada3>0 And tst_cAlarma3Generar <> ''
			 And (CASE WHEN @iProceso = 2 Then sta_ncuentaenfallo3ertst Else 0 END) = 0
			 And (CASE WHEN tst_ntipo3 = 0 THEN DATEADD( MINUTE,tst_ncada3,sta_dfechaultimo3ertst ) 
				 WHEN tst_ntipo3 = 1 THEN DATEADD( HOUR,tst_ncada3,sta_dfechaultimo3ertst ) 
				  WHEN tst_ntipo3 = 2 THEN DATEADD( DAY,tst_ncada3,sta_dfechaultimo3ertst ) 
				 END ) <= GetDate() And sta_nEstado = 0
			Order By Fecha_Hasta_aux

		Set @cSubject = 'Fallo de Test Seguidor'
		Set @cTo = Ltrim(Rtrim(@cToOriginal))		

		OPEN m_tst_prueba_Cursor
		FETCH NEXT FROM m_tst_prueba_Cursor INTO @iidCuenta , @cAlarma, @dFechaultimotst, @Fecha_Hasta_aux, @iDesactivada, @cAutoprocesa
		WHILE @@FETCH_STATUS = 0
		BEGIN
			Set @iDiferencia = DateDiff(minute,GETDATE(),@Fecha_Hasta_aux)

			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10)))+' | Alarma => '+ @cAlarma+' | FechaHora Ultimo TST => '+CONVERT(varchar, @dFechaultimotst,120) +' | FechaHora Hasta => '+CONVERT(varchar, @Fecha_Hasta_aux,120) + ' | Desactivada => '+ Rtrim(Cast(IsNull(@iDesactivada,0) As Varchar(10)))+' | AutoProcesa => '+ @cAutoprocesa + ' | Diferencia => '+ Rtrim(Cast(@iDiferencia As Varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF ( @iDiferencia Is Null Or @iDiferencia <= 0 ) And Year(@dFechaultimotst) != 1900
				Begin
					Set @cResolucion =''
					Set @nEstado = 0
					Set @cUpdateStatus = 'S'
					If NOT @iDesactivada Is Null
						Begin	
							--La cuenta esta Desactivada.Grabo con Resolucion Desactivada y Estado 7
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | --La cuenta esta Desactivada. Grabo con Resolucion Desactivada y Estado 7--'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
							Set @cResolucion = (Select CAST(par_ivalor As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='MODO NO HABILITADO')
							Set @cResolucion = Stuff('000',4-Len(@cResolucion),Len(@cResolucion),@cResolucion)
							Set @nEstado = 7
							Set @cUpdateStatus = 'S'
						End	

					--Si viene categorizao como NoHabilitada se trata como un Evento de NO GENERAR, NO se graba p_recepcion			
					If @nEstado = 7
					   Set @iParametro = 2
					Else
					   Set @iParametro = ( SELECT cod_nalerta From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo=@cAlarma )

					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Parametro => '+ Rtrim(Cast(@iParametro As Varchar(10)))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					--2 Es un Evento de NO GENERAR, NO se graba p_recepcion			
					If @iParametro < 2
						Begin	
							--Si NO Genera Alerta (0) lo grabo con estado 5
							If @iParametro = 0
								Set @nEstado = 5
								If @cGrabo = 'S'	
									Begin  
										BEGIN TRY
											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Execute [dbo].[SGSP_pRecepcionINS] con @nEstado => '+ Rtrim(Cast(@nEstado As Varchar(10)))
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											Execute [dbo].[SGSP_pRecepcionINS]
														@rec_iidcuenta = @iidCuenta,
														@rec_calarma = @cAlarma,
														@rec_tfechahora  = @DiaHoy,
														@rec_nestado  = @nEstado,
														@rec_ioperador = 0,
														@rec_idResolucion = @cResolucion,
														@rec_tFechaRecepcion = @DiaHoy,
														@rec_nOrigen = 8,
														@iValor = @intParameter OUTPUT
										END TRY
										BEGIN CATCH
											Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Execute [dbo].[SGSP_pRecepcionINS] Volvio con error'
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											Set @intParameter=0
										END CATCH

										if @intParameter > 0
										Begin
											Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Execute [dbo].[SGSP_pRecepcionINS] Volvio con ID => '+ Rtrim(Cast(@intParameter As Varchar(10)))
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											--Dealer para notificaciones x mail--
											Select @Dealer = IsNull(cue_clinea,'') From m_cuentas Where cue_iid = @iidCuenta

											--Dealer para notificaciones x mail--
											Select @Dealer = IsNull(cue_clinea,'') From m_cuentas Where cue_iid = @iidCuenta
											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Dealer para notificaciones x mail => '+ @Dealer
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											--PushNotification--
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Execute [dbo].[SGSP_PushNotification] con @intParameter => '+ Rtrim(Cast(@intParameter As Varchar(10)))
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
											Execute SGSP_PushNotification @intParameter

											--Reporte Autoridades
											--Primero busco si hay autoridades y eventos automaticos/autoProcesados a controlar 
											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Reporte Autoridades | --Primero busco si hay autoridades y eventos automaticos/autoProcesados a controlar--'
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											DECLARE cAutoridad CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
												Select aut_ccodigo,aut_cdealer,aut_cprovincia, (Case When CHARINDEX(@cAlarma,aut_cAutoProcesados) > 0 Then 'S' Else 'N' End) As cEsAP
													From _Tablas.dbo.t_autoridades
													Where CHARINDEX(@cAlarma,aut_meventosauto) > 0 Or  CHARINDEX(@cAlarma,aut_cAutoProcesados) > 0 

											OPEN cAutoridad
											FETCH NEXT FROM cAutoridad INTO @aut_ccodigo,@aut_cdealer,@aut_cprovincia,@cEsAP
											WHILE @@FETCH_STATUS = 0
											BEGIN
												--Segundo busco la provincia y el dealer de la cuenta
												Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
												Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Reporte Autoridades | --Segundo busco la provincia y el dealer de la cuenta--'
												RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
												
												DECLARE cCta CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
							   						Select cue_cLinea ,cue_cProvincia From m_cuentas
													Where cue_iid=@iidCuenta
							
												OPEN cCta
												FETCH NEXT FROM cCta INTO @cue_cLinea,@cue_cProvincia
												WHILE @@FETCH_STATUS = 0
												BEGIN
													Set @nInsert = 0
	
													If @aut_cdealer = @cue_cLinea And @aut_cprovincia = @cue_cProvincia
														Set @nInsert = 1
													Else 
														If Ltrim(Rtrim(@aut_cdealer))= '' And @aut_cprovincia = @cue_cProvincia
															Set @nInsert = 1
														Else
															If @aut_cdealer = @cue_cLinea And Ltrim(Rtrim(@aut_cprovincia))= ''
																Set @nInsert = 1
															Else
																If Ltrim(Rtrim(@aut_cdealer))= '' And Ltrim(Rtrim(@aut_cprovincia))= ''
																	Set @nInsert = 1
									 
												If @nInsert = 1
													Begin
												   		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
														Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Reporte Autoridades | Insert Into p_reporte_autoridades'
														RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

														Insert Into p_reporte_autoridades(rep_cautoridad,rep_iidcuenta,rep_calarma,rep_dfechahora,rep_czona,rep_iidrecepcion)
														VALUES(@aut_ccodigo,@iidCuenta,@cAlarma,GetDate(),'',@intParameter)
									  
														If @cEsAP = 'S' And @cGrabo = 'S'	And @nEstado <> 5
														Begin
															--Busco Categorizacion de Reporte Autoridad Auto Procesado
															Set @cResolucion = (Select CAST(par_ivalor As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='CATREPAUTORIDADAP')
															Set @cResolucion = Stuff('000',4-Len(@cResolucion),Len(@cResolucion),@cResolucion)

															Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
															Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Reporte Autoridades | UPDATE p_recepcion con Categorizacion de Reporte Autoridad Auto Procesado => ' + @cResolucion
															RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

															UPDATE p_recepcion Set rec_nestado=5, rec_idResolucion=@cResolucion Where rec_iid=@intParameter
														End
												    End
								
													FETCH NEXT FROM cCta INTO @cue_cLinea,@cue_cProvincia
											   End
					
											   CLOSE cCta
											   DEALLOCATE cCta
							
											FETCH NEXT FROM cAutoridad INTO @aut_ccodigo,@aut_cdealer,@aut_cprovincia,@cEsAP
											End
					
											CLOSE cAutoridad
											DEALLOCATE cAutoridad
									End
								End --del If grabo										
						  
							--Envio Mail
							Set @cCuenta = ( SELECT cue_clinea+'-'+Rtrim(cue_ncuenta)+' '+cue_cnombre FROM m_cuentas Where cue_iid=@iidCuenta )	
							Set @cMessage = 'En cuenta ' + Rtrim(@cCuenta) + ' | ' +@cAlarma+' | '+CONVERT(char(19), GetDate(),120)  
							
							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail | Message => ' + @cMessage
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							Set @cMail = @cTo 
							Set @cMailDealer = ''
							Set @iEnviaMailPorFalloTest = 2

							SELECT @cMailDealer=lin_cmail, @iEnviaMailPorFalloTest=lin_iEnviaMailPorFalloTest FROM _Tablas.dbo.t_lineas Inner Join m_cuentas On lin_ccodigo=cue_clinea Where cue_iid=@iidCuenta 

							If @iEnviaMailPorFalloTest = 2 Or @iEnviaMailPorFalloTest Is Null
								Set @cMailDealer = ''

							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail | Mail => ' + @cMail + ' | MailDealer => ' + @cMailDealer
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							IF @cMailDealer Is Not Null And @cMailDealer <> ''
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'+@cMailDealer +';'	
									Else
										Set @cMail = @cMailDealer +';'	
								End				
							Else 				
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'
								End	
						
							WHILE CHARINDEX(';',@cMail) > 0
							BEGIN
							   Set @nFin = CHARINDEX(';',@cMail)	
							   Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
							   Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
							
							   Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							   Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail | Query => ' + @Query
							   RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							   If @cGrabo = 'S' And @iEnviaMail = 1		
								  EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

							   If @cGrabo = 'S' And @iEnviaMail = 2		
								  Begin	
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cAlarma,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT
									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage
									Else
										Begin
											--Uso el nombre de la plantilla como Subject
											Set @cSubject = ( Select [pls_cdescripcion] From _Tablas.dbo.t_plantillas_sms WHere pls_ccodigo=@cAlarma )
											If @cSubject Is Null Or @cSubject = ''
												Set @cSubject = 'Fallo de Test Seguidor'
										End

									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta
								  End
							   
							   Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin )
							END
							--

							--Envio de Mail x Evento
							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail x Evento | Alarma => ' + @cAlarma
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	  						Select Top 1 @cMail=sms_cmailparaeventos,@cPlantilla=sms_cplantillamail,@cSubject=pls_cdescripcion From m_sms
								Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillamail
 							  Where sms_cmailparaeventos<> '' And sms_cplantillamail<>'' And sms_iidCuenta=@iidCuenta And
									( CHARINDEX(@cAlarma, sms_meventos) > 0  Or
									( sms_iNotificarAlertas=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1)) Or
									( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

							If @cMail <> ''
								Set @cMail = @cMail +';'
							
							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail x Evento | Mail => ' + @cMail
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							WHILE CHARINDEX(';',@cMail) > 0
							BEGIN
							   Set @nFin = CHARINDEX(';',@cMail)	
							   Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
							   Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
							
							   If @cGrabo = 'S' And @iEnviaMail = 1		
								  EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

							   If @cGrabo = 'S' And @iEnviaMail = 2		
								  Begin	
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage

									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
									Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail x Evento | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
									
									Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta

								  End
							   
							   Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin )
							END
							Set @cTo = Ltrim(Rtrim(@cToOriginal))	--Dejo el original para el loop							
							Set @cToSMS = ''
							Set @iModemSMS = 0
							--							

							--Mail por evento para Dealer
						    If @cGrabo = 'S' And @iEnviaMail = 2		
							Begin	
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail x Evento para Dealer | Dealer => ' + @Dealer
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								If @Dealer <> ''
								Begin
									Declare cMailxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	  									Select [tnd_cMail],[tnd_cPlantillaMail],[pls_cdescripcion]
											From [_Tablas].[dbo].[T_Notificaciones_Dealer]
											Inner Join [_Tablas].[dbo].[t_plantillas_sms] On [pls_ccodigo]=[tnd_cPlantillaMail]
 										Where [tnd_cMail]<> '' And [tnd_cPlantillaMail]<>'' And [tnd_cDealer]=@Dealer And [tnd_iTipo]=0 And
											  ( CHARINDEX(@cAlarma, [tnd_cAlarmas]) > 0  Or
 											  ( [tnd_iNotificarAlertas]=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1) ) Or
											  ( [tnd_iGrupoAlarmas]>0 And [tnd_iGrupoAlarmas] IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )
	
									Open cMailxEvento
									Fetch Next From cMailxEvento Into @cMail,@cPlantilla,@cSubject
									While @@FETCH_STATUS = 0
									Begin
										If @cMail <> ''
											Set @cMail = @cMail +';'

										WHILE CHARINDEX(';',@cMail) > 0
										Begin
											Set @nFin = CHARINDEX(';',@cMail)	
											Set @cTo = SUBSTRING( @cMail, 1, @nFin-1 )
											Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
			
											--Blanqueo para que el loop no los tenga con datos
											Set @cMessageMerge = ''
											Set @cImagenes = ''
											--

											Set @EventoFecha = LEFT(@FechaHora,11) 
											Set @EventoHora = RIGHT(@FechaHora,8) 
											Set @cMessageMerge = ''
											EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

											If @cMessageMerge Is Null
												Set @cMessageMerge = @cSubject
											
											Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
											Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio Mail x Evento para Dealer | Execute _Datos.dbo.SmartMail_ProgramCreate | FromName => ' + @cFromName + ' | From => ' + @cFrom + ' | Subject => ' + @cSubject + ' | MessageMerge => ' + @cMessageMerge + ' | Query => ' + @Query + ' | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) 
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											Execute _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta

											Set @cMail = SUBSTRING( @cMail, @nFin+1, 300-@nFin );
										End
	
									   Fetch Next From cMailxEvento Into @cMail,@cPlantilla,@cSubject
									End
									Close cMailxEvento
									Deallocate cMailxEvento

									Set @cTo = Ltrim(Rtrim(@cToOriginal))	--Dejo el original para el loop
									Set @cToSMS = ''
									Set @iModemSMS = 0
								End
							End
							--

							--Envio de SMS
							Select Top 1 @cToSMS=sms_csmsparaeventos, @iModemSMS=sms_imodemsms, @cPlantilla=sms_cplantillasms, @cSubject=pls_cdescripcion From m_sms
								Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillasms
			 				  Where sms_csmsparaeventos<>'' And sms_cplantillasms<>'' And sms_imodemsms>0 And sms_iidCuenta=@iidCuenta And
									( CHARINDEX(@cAlarma, sms_meventos) > 0  Or
									( sms_iNotificarAlertas=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1)) Or
									( sms_iGrupoAlarmas>0 And sms_iGrupoAlarmas IN (Select gru_idKey From _Tablas.dbo.t_Grupos TG	Where EXISTS ( Select cod_cGrupo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And CHARINDEX(TG.gru_ccodigo,cod_cGrupo) > 0 ) ) ) )

							Set @cToSMS = Ltrim(Rtrim(@cToSMS))+';'
							
							Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio de SMS | ToSMS => ' + @cToSMS
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							WHILE CHARINDEX(';',@cToSMS) > 0 And @iModemSMS > 0
							BEGIN
							   Set @nFin = CHARINDEX(';',@cToSMS)	
							   Set @cDestinoSMS=SUBSTRING( @cToSMS, 1, @nFin-1 )
							   If @cGrabo = 'S'
								Begin
									Set @EventoFecha = LEFT(@FechaHora,11) 
									Set @EventoHora = RIGHT(@FechaHora,8) 
									Set @cMessageMerge = ''
									EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,@cPlantilla,@EventoFecha,@EventoHora,@intParameter, @cMessageMerge OUTPUT, @cImagenes OUTPUT

									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage

									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120) 
									Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Envio de SMS | Execute SGSP_SaveSMSQueue | IdCuenta => ' + Rtrim(Cast(@iidCuenta As Varchar(10))) + ' | ModemSMS => ' + Rtrim(Cast(@iModemSMS As Varchar(10))) + ' | MessageMerge => ' + @cMessageMerge + ' | DestinoSMS => ' + @cDestinoSMS 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Execute SGSP_SaveSMSQueue @iidCuenta,@iModemSMS,@cMessageMerge,@cDestinoSMS	
									--Insert Into p_SMSqueue (que_idCuenta,que_iModemSMS,que_cAsunto,que_cDestino)
									--Values (@iidCuenta,@iModemSMS,@cMessageMerge,@cDestinoSMS)
									----Values (@iidCuenta,@iModemSMS,@cSubject+' : '+@cMessage,@cDestinoSMS)
								End
							
							   Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 150-@nFin )
							END
							--														
					    End

						Set @UltimoTSTRec = GETDATE()

						If @cGrabo = 'S'	
							Begin  
								---Actualizo el m_status
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Actualizo el m_status | IdCuenta => '+ Rtrim(Cast(@iidCuenta As Varchar(10))) + ' | FechaHora Ultimo TST => '+CONVERT(varchar, @UltimoTSTRec,120) 
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								UPDATE m_status Set sta_dFechaultimo3ertst = @UltimoTSTRec Where sta_iidCuenta=@iidCuenta
								---Si la cuenta esta NoHabilitada NO actualizo fallodetst
								If @cUpdateStatus = 'S'
							      Begin	
									UPDATE m_status Set sta_ncuentaenfallo3ertst = 1, sta_cultimaalarma = @cAlarma, sta_dfechautimaalarma = CONVERT(DateTime, CONVERT(Varchar(20), @DiaHoy, 120),111) Where sta_iidCuenta=@iidCuenta
	
									--Tengo q actualizar desde cuando esta en Fallo pero solo si la fecha esta null
							        UPDATE m_status Set sta_tEnFalloDeTST3Desde = @UltimoTSTRec Where sta_iidCuenta=@iidCuenta And sta_tEnFalloDeTST3Desde Is Null

									--Si se configuro @cAutoprocesa entonces hay que insertar en [EventosEnFalloTesteo]
									If @cAutoprocesa <> ''
									Begin
										Set @cAutoprocesa = '3|,'+@cAutoprocesa

										Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_Test] | Control3TST | Execute [dbo].[SGSP_Fill_EventosEnFalloTesteo] | Autoprocesa => '+@cAutoprocesa
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										Execute [dbo].[SGSP_Fill_EventosEnFalloTesteo]	@idRecNoRes = @intParameter, @idCuenta = @iidCuenta, @tEventoFechaHora = @DiaHoy, @cAlarmaAutoprocesa = @cAutoprocesa
									End

							      End	
							End 
				End

			FETCH NEXT FROM m_tst_prueba_Cursor INTO @iidCuenta , @cAlarma, @dFechaultimotst, @Fecha_Hasta_aux, @iDesactivada, @cAutoprocesa
		End

		CLOSE m_tst_prueba_Cursor
		DEALLOCATE m_tst_prueba_Cursor

    End
Else	-- Aviso que la tarea no cumple las condiciones para funcionar
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'Control3TST', @Repetition = 10, @Date = null, @Status = 0