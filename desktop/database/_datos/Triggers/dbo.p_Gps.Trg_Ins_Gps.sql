CREATE OR ALTER TRIGGER [dbo].[Trg_Ins_Gps] ON [dbo].[p_Gps] INSTEAD OF INSERT AS
BEGIN
	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [Trg_Ins_Gps] | INSERT INTO p_PosicionesGPS'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	INSERT INTO p_PosicionesGPS (gps_tfechahora, gps_idCuenta, gps_idRec, gps_rLatitud, gps_rLongitud, gps_tRawfechahora, gps_iVelocidad, gps_iOdometro, gps_iRumbo, gps_cIMEI, gps_rAccuracy, gps_cMethod, gps_iBattery, gps_iNivelSenial, gps_iSatelites,gps_iExtBattery,gps_iFuel,gps_iEngineStatus)
	SELECT I.gps_tfechahora, I.gps_idCuenta, I.gps_idRec, I.gps_rLatitud, I.gps_rLongitud, I.gps_tRawfechahora, I.gps_iVelocidad, I.gps_iOdometro, I.gps_iRumbo, I.gps_cIMEI, I.gps_rAccuracy, I.gps_cMethod, I.gps_iBattery, I.gps_iNivelSenial, I.gps_iSatelites,I.gps_iExtBattery,I.gps_iFuel,I.gps_iEngineStatus From Inserted I

	Declare @idCta Int = 0,
			@idRec Int = 0
	Declare @cMethod VarChar(10) = ''

	Declare @ins_tfechahora Datetime,
			@ins_tRawfechahora Datetime

	Select @idCta=[gps_idCuenta], @ins_tfechahora=[gps_tfechahora], @ins_tRawfechahora=[gps_tRawfechahora], @cMethod=[gps_cMethod], @idRec=[gps_idRec] From inserted

	If @ins_tRawfechahora > DATEADD(hour, 24, Getdate())
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [Trg_Ins_Gps] | El evento es mayor a 24 horas que fecha hora actual. Se actualiza con FechaHora del evento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		Set @ins_tRawfechahora = @ins_tfechahora
	End 	

	INSERT INTO [dbo].[p_Gps] ([gps_tfechahora],[gps_idCuenta],[gps_idRec],[gps_rLatitud],[gps_rLongitud],[gps_iVelocidad],[gps_iOdometro],[gps_iRumbo],[gps_cDireccion],[gps_tRawfechahora],[gps_cIMEI],[gps_rAccuracy],[gps_cMethod],[gps_iBattery],[gps_iNivelSenial],[gps_iSatelites],[gps_iExtBattery],[gps_iFuel],[gps_iEngineStatus])
    Select [gps_tfechahora],[gps_idCuenta],[gps_idRec],[gps_rLatitud],[gps_rLongitud],[gps_iVelocidad],[gps_iOdometro],[gps_iRumbo],[gps_cDireccion],@ins_tRawfechahora,[gps_cIMEI],[gps_rAccuracy],[gps_cMethod],[gps_iBattery],[gps_iNivelSenial],[gps_iSatelites],[gps_iExtBattery],[gps_iFuel],[gps_iEngineStatus] From inserted
	
	If Not @idCta Is Null
	Begin
		--If Not OBJECT_ID('DispositivoMovil') IS NULL
		--Begin
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
			Set @message = 'Start DateTime : %s | [Trg_Ins_Gps] | Controlo exceso de velocidad | iMaxSpeed : '+Cast(@iMaxSpeed As Varchar(10))+' | iVelocidad : '+Cast(@iVelocidad As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @iMaxSpeed > 0 And ( @iVelocidad > @iMaxSpeed )
				Begin
					Set @iValor=0
					Set @Obs = 'Velocidad : '+ Rtrim(Cast(@iVelocidad As VarChar(5))) + ' Km/h'
					
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [Trg_Ins_Gps] | Exec SGSP_AlarmaGenerar _XV | '+@Obs
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
					EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@idCta, @cAlarma='_XV', @cQuien='SoftGuard' , @cObs=@Obs, @cContenido='', @iUsuario=0, @rLat=@rLat, @rLng=@rLng, @iSpeed=@iVelocidad, @iOdometer=@iOdometer, @iValor=@iValor OUTPUT

				End

			If @idDispositivo > 0
				UPDATE [dbo].[DispositivoMovil]
					SET [OdometerDate]=@tOdometerDate,
						[Odometer]=@iOdometer
				WHERE [Id] = @idDispositivo

			--Analizo si esta en modo parking
			/*
			0 = Parking desactivado
			1 = Parking activado
			*/
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
							Set @message = 'Start DateTime : %s | [Trg_Ins_Gps] | Exec SGSP_AlarmaGenerar _MP | '+@Obs
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta, '_MP', 'SoftGuard' , @Obs, '', 0, @iValor OUTPUT
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
								Set @message = 'Start DateTime : %s | [Trg_Ins_Gps] | Exec SGSP_AlarmaGenerar _MP | '+@Obs
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta, '_MP', 'SoftGuard' , @Obs, '', 0, @iValor OUTPUT
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
				Set @message = 'Start DateTime : %s | [Trg_Ins_Gps] | UPDATE [dbo].[m_status]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				UPDATE [dbo].[m_status] Set [sta_dfechaultimo2dotst] = Getdate(), [sta_ncuentaenfallo2dotst] = 0 Where [sta_iidcuenta] = @idCta
			End
		End 
	End
END