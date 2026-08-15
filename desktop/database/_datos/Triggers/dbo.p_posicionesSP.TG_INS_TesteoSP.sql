CREATE OR ALTER TRIGGER [dbo].[TG_INS_TesteoSP] ON [dbo].[p_posicionesSP] AFTER INSERT AS

BEGIN
	SET NOCOUNT ON;
	
	Declare @IMEI nVarChar(128)=''
	Declare @CuentaID Int=0, 
			@idRec Int=0,
			@iID Int=0,
			@sp_iid Int=0

	Declare @message nVarChar(Max) = '',
            @StartDateTimeText VarChar(max) = ''
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
    Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Inicio'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Declare @iCant Int=0 
	Select @iCant = Count(*) From inserted
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
    Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Cantidad de Registros Insertados @iCant ('+Cast(@iCant As Varchar(10))+')' 
    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Select @IMEI = [sp_cIMEI], @idRec = [sp_reciid], @sp_iid = [sp_iid] From inserted

 	--1ero veo si es de SmartPanics
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
    Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | 1ero veo si es de SmartPanics | @IMEI '+@IMEI  
    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	/*
	Select @CuentaID = [CuentaId] From [dbo].[SmartPanic] With (NOLOCK) Where [IMEI]=@IMEI And [Config] Like '%"HBcontrol":true%' And [EnFalloDeTesteo]=1
	If @CuentaID > 0
	Begin
		Print '--[TG_INS_TesteoSP] | Update [dbo].[SmartPanic]-- '+ Convert(VarChar, GetDate(),120) + '| @CuentaID ('+Cast(@CuentaID As Varchar(10))+')' 
		Update [dbo].[SmartPanic] Set [EnFalloDeTesteo] = 0, [EnFalloDeTesteoDesde] = Null Where [IMEI]=@IMEI And [CuentaId]=@CuentaID
	End
	*/

	--2019-09-16 Rodrigo : me fijo si tengo qe crear el evento SPP
	Select @CuentaID = CuentaId From [dbo].[SmartPanic] With (NOLOCK) Where [IMEI]=@IMEI 

	declare @cod_nalerta int
	SELECT @cod_nalerta = cod_nalerta FROM _Tablas.dbo.t_codigos_alarma WITH (NOLOCK)	WHERE  cod_ccodigo = 'SPP';
	--- si no tiene evento y SPP esta con genera evento, genero el evento de seguimiento.
	If @idRec = 0 and @cod_nalerta!=2 and @CuentaID>0
	BEGIN 
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
		Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Genero evento SPP'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		EXECUTE [_Desktop].[dbo].[AlarmaGenerar] 
			@idCta = @CuentaID
			,@cAlarma = 'SPP'
			,@rec_iid =  @idRec OUTPUT

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
		Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Actualizo posicion con idevento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		update [p_posicionesSP] set [sp_reciid]=@idRec where sp_iid = @sp_iid
	END
	--
	Select @iID = [Id] From [dbo].[SmartPanic] With (NOLOCK) Where [IMEI]=@IMEI And Replace([Config],' ','') Like '%"HBcontrol":true%' And [EnFalloDeTesteo]=1
	
	If @iID > 0
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
			Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Update [dbo].[SmartPanic] | @iID ('+Cast(@iID As Varchar(10))+')' 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Update [dbo].[SmartPanic] Set [EnFalloDeTesteo] = 0, [EnFalloDeTesteoDesde] = Null Where [Id]=@iID
		End
	--
	Else
		Begin
			--2do veo si es de VigiControl
			Set @CuentaID = 0

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
			Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | 2do veo si es de VigiControl | @IMEI '+@IMEI  
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			/*
			Select Top 1 @CuentaID = [CuentaId] From [dbo].[SmartTrack]	With (NOLOCK) Where [IMEI]=@IMEI And [Config] Like '%"HBcontrol":true%' And  [EnFalloDeTesteo]=1
			If @CuentaID > 0
			Begin
				Print '--[TG_INS_TesteoSP] | Update [dbo].[SmartTrack]-- '+ Convert(VarChar, GetDate(),120) + '| @CuentaID ('+Cast(@CuentaID As Varchar(10))+')' 
				Update [dbo].[SmartTrack] Set [EnFalloDeTesteo] = 0, [EnFalloDeTesteoDesde] = Null Where [IMEI]=@IMEI And [CuentaId]=@CuentaID
			End
			*/
			Set @iID = 0
			Select Top 1 @iID = [Id] From [dbo].[SmartTrack] With (NOLOCK) Where [IMEI]=@IMEI And Replace([Config],' ','') Like '%"HBcontrol":true%' And  [EnFalloDeTesteo]=1
			If @iID > 0
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
				Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Update [dbo].[SmartTrack] | @iID ('+Cast(@iID As Varchar(10))+')' 
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Update [dbo].[SmartTrack] Set [EnFalloDeTesteo] = 0, [EnFalloDeTesteoDesde] = Null Where [Id]=@iID
			End
			--
		End

	--Actualizo p_GpsSP--
	Select Top 1 @CuentaID = [gps_idCuenta] From [dbo].[p_Gps] With (NOLOCK) Where [gps_cIMEI]=@IMEI And [gps_idRec] = @idRec

	If @idRec > 0	--Viene de un evento x lo tanto hay pGPS
		Begin	
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
			Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Viene de un evento x lo tanto hay pGPS | MERGE INTO [dbo].[p_GpsSP] | @idRec ('+Cast(@idRec As Varchar(10))+')' 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			MERGE INTO [dbo].[p_GpsSP] AS TGT
			USING (	 Select * From [dbo].[p_Gps] With (NOLOCK) Where [gps_cIMEI]=@IMEI And [gps_idCuenta]=@CuentaID ) AS SRC 
			  ON TGT.[gps_cIMEI] = SRC.[gps_cIMEI]
			WHEN MATCHED THEN
			  UPDATE SET
				  TGT.[gps_cIMEI] = SRC.[gps_cIMEI],
				  TGT.[gps_tfechahora] = SRC.[gps_tfechahora],
				  TGT.[gps_idCuenta] = SRC.[gps_idCuenta],
				  TGT.[gps_idRec] = SRC.[gps_idRec],
				  TGT.[gps_rLatitud] = SRC.[gps_rLatitud],
				  TGT.[gps_rLongitud] = SRC.[gps_rLongitud],
				  TGT.[gps_iVelocidad] = SRC.[gps_iVelocidad],
				  TGT.[gps_iOdometro] = SRC.[gps_iOdometro],
				  TGT.[gps_iRumbo] = SRC.[gps_iRumbo], 
				  TGT.[gps_cDireccion] = SRC.[gps_cDireccion],
				  TGT.[gps_tRawfechahora] = SRC.[gps_tRawfechahora],
				  TGT.[gps_rAccuracy] = SRC.[gps_rAccuracy],
				  TGT.[gps_cMethod] = SRC.[gps_cMethod],
				  TGT.[gps_iBattery] = SRC.[gps_iBattery],
				  TGT.[gps_iNivelSenial] = SRC.[gps_iNivelSenial],
				  TGT.[gps_iSatelites] = SRC.[gps_iSatelites]
 			WHEN NOT MATCHED THEN 
				INSERT ([gps_cIMEI],[gps_tfechahora],[gps_idCuenta],[gps_idRec],[gps_rLatitud],[gps_rLongitud],[gps_iVelocidad],[gps_iOdometro],[gps_iRumbo],[gps_cDireccion],[gps_tRawfechahora],[gps_rAccuracy],[gps_cMethod],[gps_iBattery],[gps_iNivelSenial],[gps_iSatelites])
				VALUES (SRC.[gps_cIMEI],SRC.[gps_tfechahora],SRC.[gps_idCuenta],SRC.[gps_idRec],SRC.[gps_rLatitud],SRC.[gps_rLongitud],SRC.[gps_iVelocidad],SRC.[gps_iOdometro],SRC.[gps_iRumbo],SRC.[gps_cDireccion],SRC.[gps_tRawfechahora],SRC.[gps_rAccuracy],SRC.[gps_cMethod],SRC.[gps_iBattery],SRC.[gps_iNivelSenial],SRC.[gps_iSatelites]);
		End
	Else	--Viene de seguimiento evento x lo tanto NO hay pGPS
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
			Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Viene de seguimiento evento x lo tanto NO hay pGPS | MERGE INTO [dbo].[p_GpsSP]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			MERGE INTO [dbo].[p_GpsSP] AS TGT
			USING (	 Select * From inserted) AS SRC 
			  ON TGT.[gps_cIMEI] = SRC.[sp_cIMEI]
			WHEN MATCHED THEN
			  UPDATE SET
				  TGT.[gps_cIMEI] = SRC.[sp_cIMEI],
				  TGT.[gps_tfechahora] = SRC.[sp_tfechahora],
				  TGT.[gps_rLatitud] = SRC.[sp_rLatitud],
				  TGT.[gps_rLongitud] = SRC.[sp_rLongitud],
				  TGT.[gps_iVelocidad] = SRC.[sp_iVelocidad],
				  TGT.[gps_iOdometro] = SRC.[sp_iOdometro],
				  TGT.[gps_iRumbo] = SRC.[sp_iRumbo], 
				  TGT.[gps_rAccuracy] = SRC.[sp_rAccuracy],
				  TGT.[gps_iBattery] = SRC.[sp_iBatt],
				  TGT.[gps_tRawfechahora] = SRC.[sp_tfechahora]
 			WHEN NOT MATCHED THEN 
				INSERT ([gps_cIMEI],[gps_tfechahora],[gps_rLatitud],[gps_rLongitud],[gps_iVelocidad],[gps_iOdometro],[gps_iRumbo],[gps_rAccuracy],[gps_iBattery],[gps_tRawfechahora])
				VALUES (SRC.[sp_cIMEI],SRC.[sp_tfechahora],SRC.[sp_rLatitud],SRC.[sp_rLongitud],SRC.[sp_iVelocidad],SRC.[sp_iOdometro],SRC.[sp_iRumbo],SRC.[sp_rAccuracy],SRC.[sp_iBatt],SRC.[sp_tfechahora]);

			--Guardo en p_GPS con el idCuenta del movil
			--Select Top 1 @CuentaID = [cue_iid] From [dbo].m_cuentas With (NOLOCK) Where [cue_cIMEI]=@IMEI
			--Busco en SP o VC porque arriba solo lo trae si controla falla de hb
			Select Top 1 @CuentaID = [CuentaId] From [dbo].[SmartPanic] With (NOLOCK) Where [IMEI]=@IMEI
			If @CuentaID = 0 Or @CuentaID Is Null
				Select Top 1 @CuentaID = [CuentaId] From [dbo].[SmartTrack]	With (NOLOCK) Where [IMEI]=@IMEI

			-- busco el imei en una cuenta tecguard
			If @CuentaID = 0 Or @CuentaID Is Null
				Select Top 1 @CuentaID = cue_iid From _datos.[dbo].m_cuentas	With (NOLOCK) Where cue_cIMEI=@IMEI

			If @CuentaID > 0
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
					Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Guardo en p_GPS con el idCuenta del movil | MERGE INTO [dbo].[p_Gps] | @CuentaID ('+Cast(@CuentaID As Varchar(10))+')' 
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
					MERGE INTO [dbo].[p_Gps] AS TGT
					USING (	 Select * From inserted) AS SRC 
					  ON TGT.[gps_cIMEI] = SRC.[sp_cIMEI]
					  And TGT.[gps_idCuenta] = @CuentaID
					
					WHEN MATCHED THEN
					  UPDATE SET
						  --TGT.[gps_cIMEI] = SRC.[sp_cIMEI],
						  --TGT.[gps_idCuenta] = @CuentaID,
						  TGT.[gps_idRec] = 0,
						  TGT.[gps_tfechahora] = SRC.[sp_tfechahora],
						  TGT.[gps_rLatitud] = SRC.[sp_rLatitud],
						  TGT.[gps_rLongitud] = SRC.[sp_rLongitud],
						  TGT.[gps_iVelocidad] = SRC.[sp_iVelocidad],
						  TGT.[gps_iOdometro] = SRC.[sp_iOdometro],
						  TGT.[gps_iRumbo] = SRC.[sp_iRumbo], 
						  TGT.[gps_rAccuracy] = SRC.[sp_rAccuracy],
  						  TGT.[gps_iBattery] = SRC.[sp_iBatt],
						  TGT.[gps_tRawfechahora] = SRC.[sp_tfechahora],
						  TGT.[gps_iExtBattery] = 0
 					WHEN NOT MATCHED THEN 
						INSERT ([gps_tfechahora],[gps_idCuenta],[gps_idRec],[gps_rLatitud],[gps_rLongitud],[gps_iVelocidad],[gps_iOdometro],[gps_iRumbo],[gps_cDireccion],[gps_tRawfechahora],[gps_cIMEI],[gps_rAccuracy],[gps_cMethod],[gps_iBattery],[gps_iNivelSenial],[gps_iSatelites],[gps_iExtBattery])
						VALUES (SRC.[sp_tfechahora],@CuentaID,0,SRC.[sp_rLatitud],SRC.[sp_rLongitud],SRC.[sp_iVelocidad],SRC.[sp_iOdometro],SRC.[sp_iRumbo],0,SRC.[sp_tfechahora],SRC.[sp_cIMEI],SRC.[sp_rAccuracy],'',SRC.[sp_iBatt],0,0,0);
				
					--Analizar si se configuro redireccion de posiciones    0=No  1=Si
					Declare	@iSiNo int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='REDIRECTORPOSICIONES' )
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | REDIRECTORPOSICIONES => '+ Cast(@iSiNo As VarChar(10)) 
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					If @iSiNo=1
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
						Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Se configuro redirecto de posiciones | Execute [SGSP_IRSRedirectorEventos] '
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
						--@cAlarma='_P_' => No existe codigo de alarma para una posicion y el redirector lo necesita para saber que redirigir
						Execute SGSP_IRSRedirectorEventos  @iCuenta=@CuentaID, @iRecID=0 , @cAlarma='_P_'
					End

				End	
			--
		End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
	Set @message = 'Start DateTime : %s | [TG_INS_TesteoSP] | Fin' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
END