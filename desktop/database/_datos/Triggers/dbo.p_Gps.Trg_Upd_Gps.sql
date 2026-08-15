CREATE OR ALTER TRIGGER [dbo].[Trg_Upd_Gps] ON [dbo].[p_Gps] INSTEAD OF UPDATE As
BEGIN
	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | INSERT INTO p_PosicionesGPS'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	INSERT INTO p_PosicionesGPS (gps_tfechahora, gps_idCuenta, gps_idRec, gps_rLatitud, gps_rLongitud, gps_tRawfechahora, gps_iVelocidad, gps_iOdometro, gps_iRumbo, gps_cIMEI, gps_rAccuracy, gps_cMethod, gps_iBattery, gps_iNivelSenial, gps_iSatelites,gps_iExtBattery, gps_iFuel, gps_iEngineStatus)
	SELECT I.gps_tfechahora, I.gps_idCuenta, I.gps_idRec, I.gps_rLatitud, I.gps_rLongitud, I.gps_tRawfechahora, I.gps_iVelocidad, I.gps_iOdometro, I.gps_iRumbo, I.gps_cIMEI, I.gps_rAccuracy, I.gps_cMethod, I.gps_iBattery, I.gps_iNivelSenial, I.gps_iSatelites, I.gps_iExtBattery, I.gps_iFuel, I.gps_iEngineStatus From Inserted I

	--Ahora hay que verificar si el evento es mas nuevo que el anterior
	Declare @del_tRawfechahora Datetime,
			@ins_tRawfechahora Datetime
    Declare @del_iBattery [int] = 0,
			@ins_iBattery [int] = 0,
			@upd_iBattery [int] = 0
	
	Select @del_tRawfechahora = [gps_tRawfechahora], @del_iBattery = [gps_iBattery] From deleted
	Select @ins_tRawfechahora = [gps_tRawfechahora], @ins_iBattery = [gps_iBattery] From inserted

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | Verificar si el evento es mas nuevo que el anterior | ins_tRawfechahora : ' + Convert(Varchar(25), @ins_tRawfechahora, 25) + ' | del_tRawfechahora : ' + Convert(Varchar(25), @del_tRawfechahora, 25)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @ins_tRawfechahora >= @del_tRawfechahora
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			--If @ins_tRawfechahora > DATEADD(hour, 24, @del_tRawfechahora)
			If @ins_tRawfechahora > DATEADD(hour, 24, Getdate())
				Begin
					Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | El evento es mayor a 24 horas que fecha hora actual. NO Se actualiza'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
			Else
				Begin
					Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | El evento es mas nuevo que el anterior. Se actualiza'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
					--2023-05-19 Pablo : Existen GPS que no envian nivel de bateria y el update pisa con cero al valor anterior. Se decicio no pisar si viene con 0
					If @del_iBattery > 0 And @ins_iBattery = 0
						Set @upd_iBattery = @del_iBattery
					Else	
						Set @upd_iBattery = @ins_iBattery

					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | Bateria anterior : '+Cast(@del_iBattery As Varchar(10))+' | Bateria nueva : '+Cast(@ins_iBattery As Varchar(10))+' | Bateria a actualizar : '+Cast(@upd_iBattery As Varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					UPDATE [dbo].[p_Gps] WITH (ROWLOCK)
						SET [gps_tfechahora] = I.gps_tfechahora
							,[gps_idCuenta] = I.gps_idCuenta
							,[gps_idRec] = I.gps_idRec
							,[gps_rLatitud] = I.gps_rLatitud
							,[gps_rLongitud] = I.gps_rLongitud
							,[gps_iVelocidad] = I.gps_iVelocidad
							,[gps_iOdometro] = I.gps_iOdometro
							,[gps_iRumbo] = I.gps_iRumbo
							,[gps_cDireccion] = I.gps_cDireccion
							,[gps_tRawfechahora] = I.gps_tRawfechahora
							,[gps_cIMEI] = I.gps_cIMEI
							,[gps_rAccuracy] = I.gps_rAccuracy
							,[gps_cMethod] = I.gps_cMethod
							,[gps_iBattery] = @upd_iBattery
							,[gps_iNivelSenial] = I.gps_iNivelSenial
							,[gps_iSatelites] = I.gps_iSatelites
							,[gps_iExtBattery] = I.gps_iExtBattery
							,[gps_iFuel] = I.gps_iFuel
							,[gps_iEngineStatus] = I.gps_iEngineStatus
					FROM Inserted I, [p_Gps]
					WHERE I.gps_iid = [p_Gps].[gps_iid];

					Declare @idCta Int = 0,
							@idRec Int = 0
					Declare @cMethod VarChar(10) = ''

					Select @idCta=[gps_idCuenta], @cMethod=[gps_cMethod], @idRec=[gps_idRec] From inserted
	
					If Not @idCta Is Null
					Begin
						--If Not OBJECT_ID('DispositivoMovil') IS NULL
						--	Begin
							Declare @iVelocidad Int = 0,
								@iMaxSpeed Int = 0,
								@iOdometer Int = 0,
								@idDispositivo Int = 0,
								@ParkingLot Int = 0

							Declare @rLat [real] = NULL,
									@rLng [real] = NULL

							Declare @tOdometerDate Datetime

							Declare @iValor Int = 0
							Declare @Obs Varchar(50) = ''

							Select @iVelocidad = [gps_iVelocidad], @iMaxSpeed = IsNull([MaxSpeed],0), @iOdometer = IsNull([gps_iOdometro],0), @tOdometerDate = IsNull([gps_tRawfechahora],GetDate()), @idDispositivo = IsNull(DM.[Id],0), @ParkingLot = IsNull([ParkingLot],0), @rLat=[gps_rLatitud], @rLng=[gps_rLongitud]
								From inserted
								Left Outer Join [dbo].[DispositivoMovil] DM On [gps_idCuenta] = [OwnerId]

							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | Controlo exceso de velocidad | iMaxSpeed : '+Cast(@iMaxSpeed As Varchar(10))
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							If @iMaxSpeed > 0 And ( @iVelocidad > @iMaxSpeed )
								Begin
									Set @iValor=0
									Set @Obs = 'Velocidad : '+ Rtrim(Cast(@iVelocidad As VarChar(5))) + ' Km/h'

									Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | Exec SGSP_AlarmaGenerar _XV | '+@Obs+' |  @rLat = '+ISNULL(CONVERT(Varchar(20), @rLat), 'NULL')+' | @rLng = '+ISNULL(CONVERT(Varchar(20), @rLng), 'NULL')
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									-- Marca que estamos en el trigger
									DECLARE @Flag VARBINARY(128) = CAST('InTrigger' AS VARBINARY(128))
									SET CONTEXT_INFO @Flag

									EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@idCta, @cAlarma='_XV', @cQuien='SoftGuard' , @cObs=@Obs, @cContenido='', @iUsuario=0, @rLat=@rLat, @rLng=@rLng, @iSpeed=@iVelocidad, @iOdometer=@iOdometer, @iValor=@iValor OUTPUT

									-- Limpia la marca
									SET CONTEXT_INFO 0x0
								End

							If @idDispositivo > 0
								UPDATE [dbo].[DispositivoMovil] WITH (ROWLOCK)
									SET [OdometerDate] =@tOdometerDate,
										[Odometer] = @iOdometer
								WHERE [Id] = @idDispositivo

							--Analizo si esta en modo parking
							/*
							0 = Parking desactivado
							1 = Parking activado
							*/
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | Controlo modo parking | ParkingLot : '+Cast(@ParkingLot As Varchar(10))+' | idRec : '+Cast(@idRec As Varchar(10))
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
							If @ParkingLot = 1 And @idRec > 0
							Begin
								--Verificar si el Dealer tiene configurado el control
								Declare @Dealer Char(3) = ''
								Select @Dealer=cue_clinea From [dbo].[m_cuentas]
									Where cue_iid=@idCta

								If @Dealer != ''
								Begin
									Declare @parking_velocidad Int = 0
									Declare @parking_eventos Varchar(max) = ''
									Select @parking_velocidad=[dtg_parking_velocidad],@parking_eventos=[dtg_parking_eventos_hide]
										From [dbo].[m_dealer_tgconfig]
									Where [dtg_cdealer] = @Dealer

									--Verificar si el control es por velocidad
									If @parking_velocidad > 0
									Begin
										If @iVelocidad > @parking_velocidad
										Begin
											Set @iValor=0
											Set @Obs = 'Velocidad : '+ Rtrim(Cast(@iVelocidad As VarChar(5))) + ' Km/h'

											Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
											Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | Exec SGSP_AlarmaGenerar _MP | '+@Obs
											RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

											EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@idCta, @cAlarma='_MP', @cQuien='SoftGuard' , @cObs=@Obs, @cContenido='', @iUsuario=0, @iValor=@iValor OUTPUT
										End
									End
									Else
									Begin
										--Verificar si el control es por eventos
										If @parking_eventos != ''
										Begin
											Declare @Alarma Char(3) = ''
											Select @Alarma=rec_calarma
												From p_recepcion
											Where rec_iid=@idRec And  CHARINDEX(rec_calarma,@parking_eventos) > 0 

											If @Alarma != ''
											Begin
												Set @Obs = 'Control sobre evento : ' + @Alarma 

												Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
												Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | Exec SGSP_AlarmaGenerar _MP | '+@Obs
												RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

												EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@idCta, @cAlarma='_MP', @cQuien='SoftGuard' , @cObs=@Obs, @cContenido='', @iUsuario=0, @iValor=@iValor OUTPUT
											End
										End
									End
								End
							End
						--End

						If @cMethod = ''	--Si son de SP o VC no tienen que actualizar m_Status porque sino rompen el control de 2do TST
						Begin
							If ( Select [sta_iidcuenta] From [m_status] Where [sta_iidcuenta] = @idCta ) > 0
							Begin
								Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | UPDATE [dbo].[m_status]'
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								UPDATE [dbo].[m_status] Set [sta_dfechaultimo2dotst] = Getdate(), [sta_ncuentaenfallo2dotst] = 0 Where [sta_iidcuenta] = @idCta
							End
						End 

					End
				End
		End
	Else
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_Upd_Gps] | El evento es mas viejo que el anterior. NO Se actualiza'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
END