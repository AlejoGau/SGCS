CREATE OR ALTER TRIGGER [dbo].[TG_INS_pPosiciones] ON [dbo].[p_PosicionesGPS] AFTER INSERT AS

BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''
	
	Declare @iCant Int=0 
	Select @iCant = Count(*) From inserted

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_INS_pPosiciones] | Cantidad de Registros Insertados | iCant ('+Cast(@iCant As Varchar(10))+')' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @iCant = 0
		Begin
			Set @message = 'Start DateTime : %s | [TG_INS_pPosiciones] | No graba!!!' 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set NoExec On
		End

	Declare	@tFechahora [Datetime] = NULL,
	@idCuenta [Int] = 0,
	@idRec [Int] = 0,
	@rLatitud [Real] = 0,
	@rLongitud [Real] = 0,
	@iRumbo [Int] = 0,
	@tRawfechahora [Datetime] = NULL,
	@iVelocidad [Int] = 0,
	@iOdometro [Int] = 0,
	@cDireccion [nVarchar](300) = '',
	@cIMEI [Varchar](128) = '',
	@rAccuracy [Real] = 0,
	@cMethod [Varchar](10) = '',
	@iBattery [Int] = 0,
	@iExtBattery [Int] = 0,
	@iNivelSenial [Int] = 0,
	@iSatelites [Int] = 0,
	@iSecuencia [Int] = 0,
	@iFuel [Int] = 0,
	@iEngineStatus [Int] = 0,
	@iValor [Int] = 0

	SELECT @tFechahora=[gps_tfechahora],@idCuenta=[gps_idCuenta],@idRec=[gps_idRec],@rLatitud=[gps_rLatitud],@rLongitud=[gps_rLongitud],@iRumbo=[gps_iRumbo],@tRawfechahora=[gps_tRawfechahora],
		   @iVelocidad=[gps_iVelocidad],@iOdometro=[gps_iOdometro],@cDireccion=[gps_cDireccion],@cIMEI=[gps_cIMEI],@rAccuracy=[gps_rAccuracy],@cMethod=[gps_cMethod],@iBattery=[gps_iBattery],
		   @iNivelSenial=[gps_iNivelSenial],@iSatelites=[gps_iSatelites],@iExtBattery=[gps_iExtBattery],@iFuel=[gps_iFuel],@iEngineStatus=[gps_iEngineStatus]
	FROM inserted
	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [TG_INS_pPosiciones] | Execute [dbo].[SGSP_p_PosicionesINS] '+'| @iFuel : '+Cast(@iFuel As Varchar(10))+' | @idRec : '+Cast(@idRec As Varchar(10)) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
 
	Execute [dbo].[SGSP_p_PosicionesINS]
		@tFechahora = @tFechahora,
		@idCuenta = @idCuenta,
		@idRec = @idRec,
		@rLatitud = @rLatitud,
		@rLongitud = @rLongitud,
		@iRumbo = @iRumbo,
		@tRawfechahora = @tRawfechahora,
		@iVelocidad = @iVelocidad,
		@iOdometro = @iOdometro,
		@cDireccion = @cDireccion,
		@cIMEI = @cIMEI,
		@rAccuracy = @rAccuracy,
		@cMethod = @cMethod,
		@iBattery = @iBattery,
		@iExtBattery = @iExtBattery,
		@iNivelSenial = @iNivelSenial,
		@iSatelites = @iSatelites,
		@iSecuencia = @iSecuencia,
		@iFuel = @iFuel,
		@iEngineStatus = @iEngineStatus,
		@iValor = @iValor OUTPUT
	
		If @idRec = 0	--Viene de seguimiento
		Begin
			--Analizar si se configuro redireccion de posiciones    0=No  1=Si
			Declare	@iSiNo int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='REDIRECTORPOSICIONES' )
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [TG_INS_pPosiciones] | REDIRECTORPOSICIONES => '+ Cast(@iSiNo As VarChar(10)) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @iSiNo=1
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
				Set @message = 'Start DateTime : %s | [TG_INS_pPosiciones] | Se configuro redirecto de posiciones | Execute [SGSP_IRSRedirectorEventos] '
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
				--@cAlarma='_P_' => No existe codigo de alarma para una posicion y el redirector lo necesita para saber que redirigir
				Execute SGSP_IRSRedirectorEventos  @iCuenta=@idCuenta, @iRecID=0 , @cAlarma='_P_'
			End
		End

	Set NoExec Off	
END