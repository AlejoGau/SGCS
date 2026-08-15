CREATE OR ALTER TRIGGER [dbo].[Trg_PosicionesSP] ON [dbo].[p_RXtraInfo] AFTER INSERT, UPDATE AS
BEGIN
    If Not OBJECT_ID('p_posicionesSP') IS NULL
    Begin

		--Identificar que evento se está ejecutando (Insert o Update)
		Declare  @Type VarChar(10)=''
		If Exists(Select * From inserted)
		Begin
		  If Exists(Select * From deleted) --Si es un update
		     Set @Type='Update'
		  Else                             --Si es un insert
			 Set @Type='Insert'
		End

        Declare @idRec Int = 0,
				@iSecuencia Int = 0,
				@idCta Int = 0,
				@nSPIP Int = 0,
				@nSPSMS Int = 0,
				@nVCIP Int = 0,
				@nVCSMS Int = 0

        Declare @tFechaHora Datetime = GetDate()

		Declare @message nVarChar(Max) = '',
				@StartDateTimeText VarChar(max) = ''

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | Inicio'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
        
        Select @idRec = [rxt_iRecId], @iSecuencia = [rxt_iSecuencia], @nSPIP=[rxt_nSPIP], @nSPSMS=[rxt_nSPSMS], @nVCIP=[rxt_nVCIP], @nVCSMS=[rxt_nVCSMS] From inserted

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | @idRec ('+Cast(@idRec As Varchar(10))+') | @nSPIP ('+Cast(@nSPIP As Varchar(10))+') | @nVCIP ('+Cast(@nSPIP As Varchar(10))+')'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

        If @nSPIP+@nSPSMS+@nVCIP+@nVCSMS > 0 And @idRec > 0
        Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | Es un : '+@Type
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Select @idCta=[rec_iidcuenta], @tFechaHora=[rec_tfechahora] From p_recepcion
				Where [rec_iid]=@idRec

			Declare @iCount Int = 0
			--Select @iCount=Count(*) From p_PosicionesGPS Where gps_idRec=@idRec
			Select Top 1 @iCount=gps_idRec From p_PosicionesGPS WITH (NOLOCK) Where gps_idRec=@idRec
			
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | p_PosicionesGPS.gps_idRec = '+Cast(@iCount As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @iCount > 0	--Si no hay registros en p_PosicionesGPS no hay que hacer el MERGE
			Begin
				Select Top 1 @iCount=sp_reciid From p_posicionesSP WITH (NOLOCK) Where sp_reciid=@idRec
			
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | p_posicionesSP.sp_reciid = '+Cast(@iCount As Varchar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				/*
				Select @iCount=Count(*) From p_posicionesSP Where sp_reciid=@idRec
			
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | Count(*) From p_posicionesSP = '+Cast(@iCount As Varchar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				*/

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | MERGE INTO [dbo].[p_posicionesSP]--'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
				MERGE INTO [dbo].[p_posicionesSP] AS TGT
				USING ( Select Top 1 @tFechaHora As _tfechahora, gps_cIMEI, gps_rLatitud, gps_rLongitud, gps_rAccuracy, gps_iVelocidad, gps_iRumbo, gps_iOdometro, gps_iBattery, @iSecuencia As _iSecuencia, @idRec As _reciid From p_PosicionesGPS Where gps_idRec=@idRec ) AS SRC
					ON TGT.[sp_reciid] = SRC.[_reciid]
				WHEN MATCHED THEN
					UPDATE SET
						TGT.[sp_tfechahora] = SRC.[_tfechahora],
						TGT.[sp_cIMEI] = SRC.[gps_cIMEI],
						TGT.[sp_rLatitud] = SRC.[gps_rLatitud],
						TGT.[sp_rLongitud] = SRC.[gps_rLongitud],
						TGT.[sp_rAccuracy] = SRC.[gps_rAccuracy],
						TGT.[sp_iVelocidad] = SRC.[gps_iVelocidad],
						TGT.[sp_iRumbo] = SRC.[gps_iRumbo],
						TGT.[sp_iOdometro] = SRC.[gps_iOdometro],
						TGT.[sp_iBatt] = SRC.[gps_iBattery],
						TGT.[sp_iSecuencia] = SRC.[_iSecuencia]
				WHEN NOT MATCHED THEN
					INSERT ([sp_tfechahora],[sp_cIMEI],[sp_rLatitud],[sp_rLongitud],[sp_rAccuracy],[sp_iVelocidad],[sp_iRumbo],[sp_iOdometro],[sp_iBatt],[sp_iSecuencia],[sp_reciid])
					VALUES (SRC.[_tfechahora],SRC.[gps_cIMEI],SRC.[gps_rLatitud],SRC.[gps_rLongitud],SRC.[gps_rAccuracy],SRC.[gps_iVelocidad],SRC.[gps_iRumbo],SRC.[gps_iOdometro],SRC.[gps_iBattery],SRC.[_iSecuencia],SRC.[_reciid]);

				/*
				--2023/09/08 Pablo.Lo cambie por TIMEOUT en tablas muy pesadas
				Declare @cIMEI Varchar(128) = '',
						@rLatitud Real,
						@rLongitud Real,
						@rAccuracy Real,
						@iVelocidad Int=0,
						@iRumbo Int=0,
						@iOdometro Int=0,
						@iBattery Int=0

				Select Top 1 @cIMEI=gps_cIMEI, @rLatitud=gps_rLatitud, @rLongitud=gps_rLongitud, @rAccuracy=gps_rAccuracy, @iVelocidad=gps_iVelocidad, @iRumbo=gps_iRumbo, @iOdometro=gps_iOdometro, @iBattery=gps_iBattery
					From [dbo].[p_PosicionesGPS]
				Where gps_idRec=@idRec

				If @iCount > 0	--Si hay registro en p_posicionesSP UPDATE
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | UPDATE [dbo].[p_posicionesSP]--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					UPDATE [dbo].[p_posicionesSP] 
					SET	[sp_tfechahora] = @tFechaHora,
						[sp_cIMEI] = @cIMEI,
						[sp_rLatitud] = @rLatitud,
						[sp_rLongitud] = @rLongitud,
						[sp_rAccuracy] = @rAccuracy,
						[sp_iVelocidad] = @iVelocidad,
						[sp_iRumbo] = @iRumbo,
						[sp_iOdometro] = @iOdometro,
						[sp_iBatt] = @iBattery,
						[sp_iSecuencia] = @iSecuencia
					Where [sp_reciid]=@idRec
				End
				Else 
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | INSERT INTO [dbo].[p_posicionesSP]--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					INSERT INTO [dbo].[p_posicionesSP] ([sp_tfechahora],[sp_cIMEI],[sp_rLatitud],[sp_rLongitud],[sp_rAccuracy],[sp_iVelocidad],[sp_iRumbo],[sp_iOdometro],[sp_iBatt],[sp_iSecuencia],[sp_reciid])
					VALUES (@tFechaHora,@cIMEI,@rLatitud,@rLatitud,@rAccuracy,@iVelocidad,@iRumbo,@iOdometro,@iBattery,@iSecuencia,@idRec)
				End
				*/
			End
        End

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [Trg_PosicionesSP] | Fin'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
    End
END