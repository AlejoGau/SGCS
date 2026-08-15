CREATE OR ALTER PROCEDURE [dbo].[SGSP_MGSGetMensajes]
	@cTerminal [char](3) = '',
	@iModemSMS [int] = 0,
	@iEstado [int] = 0

WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta MessagingGatewayService para obetener los mensajes pendientes de enviar
--Autor :Pablo O. Canónico
--Fecha :17/07/2018
--
--Estado en p_SMSqueue
--que_nEstado= 0		Pendiente
--que_nEstado= 1		Enviado
--que_nEstado= 2		Rechazado
--que_nEstado= 3		Conmuto a Mail
--que_nEstado= 4		En proceso
--
--Tipo de contacto
-- tel_nsp		1		Contacto
-- tel_nsp		2		SP / VC
-- tel_nsp		3		Ambos
-- tel_nsp		4		Oculto

--2025-09-22 Pablo : Se agrego control de modem [tgm_ntipo]=12 (WAD Rest API Gateway) para obtener nro de telefono internacional
--2025-10-09 Pablo : Se agrego And [tel_nsp]=1 para evitar nro de telefono duplicado
--2026-03-19 Pablo : Cambien a Left Join porque los destinos de notificacion por dealer no estan en m_telefonos
Set NoCount On
BEGIN TRY
	Declare @message nVarChar(Max) = '',
		@StartDateTimeText nVarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_MGSGetMensajes] | --Inicio--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	--Para buscar los mensajes pendientes mayores a una hora hacia atras
	Declare @tFechaHoraInicio DateTime = DATEADD(hh, -1, GetDate())

	--Verifico si el modem tiene el gateway [tgm_ntipo]=12 (WAD Rest API Gateway)
	Declare @idKey Int = 0
	Select @idKey=sms_idKey 
		From [_Tablas].[dbo].[t_modems_sms]
	Inner Join [_Tablas].[dbo].[t_GatewaysMSG] On [tgm_idKey]=[sms_iGateway]
	where [sms_icodigo]=@iModemSMS and [tgm_ntipo]=12

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_MGSGetMensajes] | --Verifico si el modem tiene el gateway [tgm_ntipo]=12 (WAD Rest API Gateway)-- | @idKey => '+ Cast(@idKey As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Le cambio el estado al mensaje
	;WITH Updates 
	AS
	(Select [que_nEstado] From [dbo].[p_SMSqueue]
			Inner Join [_Tablas].[dbo].[t_modems_sms] On [que_iModemSMS]=[sms_icodigo]
			Inner Join [_Tablas].[dbo].[t_GatewaysMSG] On [sms_igateway]=[tgm_idKey]
		Where [que_nEstado] = @iEstado And que_tfechahora >= @tFechaHoraInicio
		  And [sms_cterminal] = @cTerminal
		  And [que_iModemSMS] = @iModemSMS
		  And [que_nEstado] NOT IN(1,3) 
	) UPDATE Updates
	Set [que_nEstado] = 4

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_MGSGetMensajes] | --Le cambio el estado al mensaje a 4--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Devuelvo todos los que se estan procesando
	If @idKey=0 Or @idKey Is Null
	Begin
		Set @message = 'Start DateTime : %s | [SGSP_MGSGetMensajes] | --Devuelvo todos los que se estan procesando (sin @idKey)--'

		Select que_iid,que_tfechahora,que_idCuenta,que_cAsunto,que_cDestino,que_idCmd
			From [dbo].[p_SMSqueue]
				Inner Join [_Tablas].[dbo].[t_modems_sms] On [que_iModemSMS]=[sms_icodigo]
				Inner Join [_Tablas].[dbo].[t_GatewaysMSG] On [sms_igateway]=[tgm_idKey]
			Where [que_nEstado] = 4 And que_tfechahora >= @tFechaHoraInicio
			  And [sms_cterminal] = @cTerminal
			  And [que_iModemSMS] = @iModemSMS
			Order By que_tfechahora,que_iid
	End
	Else
	Begin
		Set @message = 'Start DateTime : %s | [SGSP_MGSGetMensajes] | --Devuelvo todos los que se estan procesando--'
		
		Select que_iid,que_tfechahora,que_idCuenta,que_cAsunto,COALESCE(tel_cinternacional, que_cDestino) As que_cDestino,que_idCmd
			From [dbo].[p_SMSqueue]
				Inner Join [_Tablas].[dbo].[t_modems_sms] On [que_iModemSMS]=[sms_icodigo]
				Inner Join [_Tablas].[dbo].[t_GatewaysMSG] On [sms_igateway]=[tgm_idKey]
				Left Join [_Datos].[dbo].[m_telefonos] On [tel_iidcuenta]=[que_idCuenta] And [tel_ctelefono]=[que_cDestino] And [tel_iismobile]=1 --And [tel_nsp]=1
			Where [que_nEstado] = 4 And que_tfechahora >= @tFechaHoraInicio
			  And [sms_cterminal] = @cTerminal
			  And [que_iModemSMS] = @iModemSMS
			Order By que_tfechahora,que_iid
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

END TRY
BEGIN CATCH
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

END CATCH