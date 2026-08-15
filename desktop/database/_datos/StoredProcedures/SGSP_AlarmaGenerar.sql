CREATE OR ALTER PROCEDURE [dbo].[SGSP_AlarmaGenerar] 
	@idCta [int] = 0,
	@cAlarma [char](3) = '',
	@cQuien [nVarChar](50) = 'Sistema',
	@cObs [nVarChar](max) = '',
	@cContenido [nVarChar](50) = '',
	@iUsuario [int] = 0,
	@rLat [real] = NULL,
	@rLng [real] = NULL,
	@iSpeed [int] = 0,
	@iOdometer [int] = 0,
	@iValor [int] = 0 OUTPUT
AS
--Basado _Desktop.dbo.AlarmaGenear
--Autor :Pablo O. Canónico
--Fecha :09/03/2013
--Modificado 19-04-2016 Cambio rutina insert en pRecepcion
--Modificado 30-05-2016 Se actualiza m_Status
--Modificado 01-11-2016 Se agrego iUsuario como parametro
--2026-01-21 : Se agregaron parametros de Lat/Lng/Speed/Odometer que son enviados por la generacion de '_XV'
SET NOCOUNT ON

Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max) = ''

Declare @iAlerta Int
Declare @iEstado Int
Declare @rec_cObservaciones nVarChar(Max)
Set @rec_cObservaciones = ''

Select @iAlerta = cod_nalerta From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma 

Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | @iAlerta = '+Cast(@iAlerta As VarChar(10))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iAlerta < 2
Begin    
    Set @iEstado = 0	
    If @iAlerta = 0		--Si NO Genera Alerta (0) lo grabo con estado 5
        Set @iEstado = 5

	If (@cObs is not null And @cObs != '')
		Set @rec_cObservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] ['+Rtrim(@cQuien)+ '] '+ Rtrim(@cObs)

		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | Execute [SGSP_pRecepcionINS]-- | @idCta = '+Cast(@idCta As Varchar(10))+' |  @cAlarma = '+@cAlarma
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		EXEC [dbo].[SGSP_pRecepcionINS]
			@rec_iidcuenta = @idCta,
			@rec_calarma = @cAlarma,
			@rec_nestado  = @iEstado,
			@rec_cContenido = @cContenido,
			@rec_cObservaciones = @rec_cObservaciones,
			@rec_nOrigen = 5,
			@rec_iUsuario = @iUsuario,
			@iValor = @iValor OUTPUT
			
				
	--Tengo que actualizar m_Status con ultima alarma y fecha
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
	Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | Actualizar m_Status con ultima alarma y fecha'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	UPDATE m_status Set sta_cultimaalarma = @cAlarma, sta_dfechautimaalarma = CONVERT(DateTime, CONVERT(Varchar(20), GetDate(), 120),111) Where sta_iidCuenta=@idCta
		
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
	Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | Execute [SGSP_AlarmaSMS]-- | @idCta = '+Cast(@idCta As Varchar(10))+' |  @cAlarma = '+@cAlarma+ ' | @iValor = '+Cast(@iValor As Varchar(10)) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Exec SGSP_AlarmaSMS @idCta, @cAlarma, @iValor

	IF (@rLat IS NOT NULL AND @rLng IS NOT NULL AND @rLat !=0 AND @rLng!=0)
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | Esta georeferenciado lo guardo aunque el evento sea de no generar'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		--Esta georeferenciado lo guardo aunque el evento sea de no generar
		Declare @imei [varchar](128) = (Select IsNull(cue_cIMEI,'') From _Datos.dbo.m_cuentas WITH (NOLOCK) Where cue_iid=@idCta)
		Declare @rawFechaHora [datetime] = GetDate()
		Declare @gps_iid Int = 0
		
		-- Si la marca está EN trigger no HACER UPDATE
		DECLARE @Flag VARBINARY(128) = CONTEXT_INFO()
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | @Flag = '+CAST(@Flag AS VARCHAR(128))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF CAST(@Flag AS VARCHAR(128)) != 'InTrigger'
		Begin
			BEGIN TRANSACTION
				Select @gps_iid=[gps_iid] From _Datos.dbo.p_Gps WITH (UPDLOCK) Where gps_idcuenta = @idCta And gps_cIMEI = @imei
				IF @gps_iid > 0
					Begin
						Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
						Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | UPDATE [_Datos].[dbo].[p_Gps] con  gps_cIMEI = ' + @imei + ' para @gps_iid = '+ Cast(@gps_iid As VarChar(10)) 
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						UPDATE _Datos.dbo.p_Gps WITH (ROWLOCK)
							Set gps_rLatitud	= @rLat,
								gps_rLongitud	= @rLng,
								gps_idrec		= @iValor,
								gps_ivelocidad	= @iSpeed,
								gps_irumbo		= 0,
								gps_cIMEI		= @imei,
								gps_tRawFechaHora = @rawFechaHora,
								gps_tFechaHora	= @rawFechaHora,
								gps_iOdometro   = @iOdometer,
								gps_rAccuracy   = 0,
								gps_cMethod     = '',
								gps_iBattery    = 0,
								gps_iExtBattery = 0,
								gps_iNivelSenial= 0,
								gps_iSatelites  = 0,
								gps_iFuel		= 0,
								gps_iEngineStatus = 0
						Where [gps_iid]=@gps_iid
					End 
				ELSE
					Begin
						Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
						Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | INSERT [_Datos].[dbo].[p_Gps] con gps_idcuenta = '+ Cast(@idCta As VarChar(10)) + ' gps_cIMEI = ' + @imei 
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Insert Into _Datos.dbo.p_Gps (gps_idCuenta,gps_idRec,gps_rLatitud,gps_rLongitud,gps_iVelocidad,gps_iOdometro,gps_iRumbo,gps_tRawFechaHora,gps_cIMEI,gps_rAccuracy,gps_cMethod,gps_iBattery,gps_iNivelSenial,gps_iSatelites,gps_tfechahora,gps_iExtBattery,gps_iFuel,gps_iEngineStatus)
							Values                     (@idCta      , @iValor ,@rLat       ,@rLng        ,@iSpeed	  ,@iOdometer   ,0		   ,@rawFechaHora    ,@imei    ,0			 ,''	     ,0			  ,0               ,0			  ,@rawFechaHora ,0				 ,0		   ,0);
					End 
			COMMIT
		End
		Else
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | INSERT INTO p_PosicionesGPS'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			INSERT INTO p_PosicionesGPS (gps_tfechahora, gps_idCuenta, gps_idRec, gps_rLatitud, gps_rLongitud, gps_tRawfechahora, gps_iVelocidad, gps_iOdometro, gps_iRumbo, gps_cIMEI, gps_rAccuracy, gps_cMethod, gps_iBattery, gps_iNivelSenial, gps_iSatelites,gps_iExtBattery, gps_iFuel, gps_iEngineStatus)
			SELECT Getdate(), @idCta, @iValor, @rLat, @rLng, @rawFechaHora, @iSpeed, @iOdometer, 0, @imei, 0, '', 0, 0, 0, 0, 0, 0

		End

		-- Actualizo en la cuenta si esta NO es Condicion FIJO
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
		Declare @idm Int=0
		Select @idm = cue_iid From [_Datos]..[m_cuentas] WITH (NOLOCK)
			Inner Join  _Tablas.dbo.t_tipos On cue_ctipo=tip_ccodigo
			Where tip_nCondicion=0 And cue_iid=@idCta

		If @idm > 0
			Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] |  No hay que actualizar cue_cLatLng. Es condicion FIJO'
		Else
		Begin			
			Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] |  UPDATE [_Datos].[dbo].[m_cuentas] con @rLat = '+Rtrim(Cast(@rLat As Varchar(15)))+' | @rLng = '+Rtrim(Cast(@rLng As Varchar(15)))

			Update [_Datos].[dbo].[m_cuentas]
			Set cue_cLatLng = Rtrim(Cast(@rLat As Varchar(15)))+','+Rtrim(Cast(@rLng As Varchar(15)))
			Where cue_iid=@idCta
		
		End
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End 	
	Else
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)          
		Set @message = 'Start DateTime : %s | [SGSP_AlarmaGenerar] | NO Esta georeferenciado  @rLat = '+ISNULL(CONVERT(Varchar(20), @rLat), 'NULL')+' | @rLng = '+ISNULL(CONVERT(Varchar(20), @rLng), 'NULL')
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End
End