CREATE OR ALTER PROCEDURE [dbo].[SGSP_SaveSMSQueue]
 @idCta Int = 0,
 @iModemSMS Int = 0,
 @cAsunto nVarChar(4000) = '',
 @cDestinoSMS nVarChar(150) = '',
 @idCmd Int = 0 
 As
--Insert en la cola de SMS
--Autor :Pablo O. Canónico
--Fecha :15/03/2013
--2018-08-08 Se agrego campo que_idCmd
--2026-05-05 Se controla para WAD no cortar los mensajes en 160 chars como en los SMS
SET NOCOUNT ON
IF @cDestinoSMS = ''
	Select @cDestinoSMS=[pan_cNroSim1] from [_Datos].[dbo].[m_paneles] where @idCta = pan_iidcuenta

IF @cDestinoSMS != '' And @cDestinoSMS Is Not Null
Begin
	Declare @cAsuntoAux nVarChar(4000) = ''

	--Verifico si el modem tiene el gateway [tgm_ntipo]=12 (WAD Rest API Gateway)
	Declare @idKey Int = 0
	Select @idKey=sms_idKey 
		From [_Tablas].[dbo].[t_modems_sms]
	Inner Join [_Tablas].[dbo].[t_GatewaysMSG] On [tgm_idKey]=[sms_iGateway]
	where [sms_icodigo]=@iModemSMS and [tgm_ntipo]=12

	If @idKey>0	--Para WAD no se debe cortar los mensajes
	Begin
		Insert Into p_SMSqueue (que_idCuenta,que_iModemSMS,que_cAsunto,que_cDestino,que_idCmd)
			Values (@idCta,@iModemSMS,@cAsunto,@cDestinoSMS,@idCmd)
	End
	Else
	Begin
		WHILE LEN(@cAsunto) > 0
		BEGIN
  
			Set @cAsuntoAux = SUBSTRING( @cAsunto, 1, 160 )

			If @cAsuntoAux <> ''
				Insert Into p_SMSqueue (que_idCuenta,que_iModemSMS,que_cAsunto,que_cDestino,que_idCmd)
					Values (@idCta,@iModemSMS,@cAsuntoAux,@cDestinoSMS,@idCmd)

			Set @cAsunto = SUBSTRING( @cAsunto, 161, 160 )
		END
	End
End