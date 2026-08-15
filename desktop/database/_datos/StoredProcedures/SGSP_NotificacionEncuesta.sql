CREATE OR ALTER PROCEDURE [dbo].[SGSP_NotificacionEncuesta]
	@cCodAlarma Char(3) = '',
	@idRec Int = 0,
	@idCuenta Int = 0
As
--Verifica Notificaciones / Encuestas a enviar
--Autor : Pablo O. Canónico
--Fecha : 27/01/2022

Set NoCount ON

BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_NotificacionEncuesta] | CodAlarma ' + @cCodAlarma + ' | IdRec => ' + Rtrim(Cast(@idRec As varchar(10))) + ' | Id Cuenta => ' + Rtrim(Cast(@idCuenta As varchar(10)))  
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare @cObservaciones nVarchar(Max),
		@translation nVarchar(Max)=''

Declare @cDealer Char(3) = ''
Select @cDealer=cue_clinea
	From [dbo].[m_cuentas]
	Where [cue_iid]=@idCuenta

	If @cDealer = '' Or @cDealer Is Null
	Begin	
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_NotificacionEncuesta] | No se encontro dealer para Id Cuenta => ' + Rtrim(Cast(@idCuenta As varchar(10)))  
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

Declare @cConfig nVarChar(max) = ''
If @cCodAlarma='_ST'	--Es por Orden de ST finalizada
Begin
	Select @cConfig=[dst_config] 
		From [dbo].[m_dealer_stconfig]
		Where [dst_cdealer]=@cDealer
	Set @message = 'Start DateTime : %s | [SGSP_NotificacionEncuesta] | Config => ' + @cConfig
End
Else
Begin
	Select @cConfig=[lin_cMetaData] 
		From [_Tablas].[dbo].[t_lineas]
		Where [lin_ccodigo]=@cDealer
	Set @message = 'Start DateTime : %s | [SGSP_NotificacionEncuesta] | Metadata => ' + @cConfig
End

If @cConfig != '' And @cConfig Is Not Null
Begin
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @cValue nVarChar(max) = ''
	Select @cValue=value From OPENJSON(@cConfig)

	Declare @PlanillaPush Char(3) = ''
	Declare	@Encuesta Int = 0
	Select @PlanillaPush=PlanillaPush, @Encuesta=Encuesta
		From OPENJSON(@cValue) With (PlanillaPush Char(3), Encuesta Int)

	If @PlanillaPush != '' And Not @PlanillaPush Is Null
	Begin	
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_NotificacionEncuesta] | Execute [dbo].[SGSP_DirectPush] con la plantilla => ' + @PlanillaPush
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Execute [dbo].[SGSP_DirectPush] @idCta = @idCuenta, @cPlantilla = @PlanillaPush, @cCodAlarma = @cCodAlarma, @idRec = @idRec
	End

	If @Encuesta > 0 And Not @Encuesta Is Null
	Begin	
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_NotificacionEncuesta] | Enviar encuesta con codigo => ' + Rtrim(Cast(@Encuesta As varchar(10)))  
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @SPID Int = 0
		Select Top 1 @SPID=Id	
			From [dbo].[SmartPanic] sp
		Where pushToken <>'' 
			And Replace([Config],' ','') Like '%"groupEnabled":1%' 
			And CuentaId=@idCuenta
		
		If @SPID > 0 And Not @SPID Is Null
		Begin	
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_NotificacionEncuesta] | Enviar encuesta al SP Id => ' + Rtrim(Cast(@SPID As varchar(10)))  
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Declare @AccessToken VarChar(500) = ''
			Select Top (1) @AccessToken=[AccessToken]
				From [dbo].[Token]
			Where [UserId] = 'smartpanic@softguard.com'

			Execute	[_Desktop].[dbo].[EncuestaEnvioPush] @ids = @SPID, @subject = @Encuesta, @token=@AccessToken
		End		
	End
End
Set NoExec Off
END TRY
BEGIN CATCH

		Begin
			IF ERROR_NUMBER() = 2627
			BEGIN
				PRINT 'Handling PK violation...';
			END;
			ELSE IF ERROR_NUMBER() = 547
			BEGIN
				PRINT 'Handling CHECK/FK constraint violation...';
			END;
			ELSE IF ERROR_NUMBER() = 515
			BEGIN
				PRINT 'Handling NULL violation...';
			END;
			ELSE IF ERROR_NUMBER() = 245
			BEGIN
				PRINT 'Handling conversion error...';
			END;
			ELSE
			BEGIN
				PRINT 'Re-throwing error...';
			END;

			PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
			PRINT 'Error Message : ' + ERROR_MESSAGE();
			PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
			PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
			PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
			PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
		End
END CATCH