CREATE OR ALTER PROCEDURE [dbo].[SGSP_VerificoLimiteYDisponiblesSMS] @iCuenta Int As
--Verifica SMS Limite y Disponibles | Actualiza Status
--Autor :Pablo O. Canónico
--Fecha :18/03/2013

SET NOCOUNT ON
Declare @iLimiteSMS Int
Declare @iEnviadosSMS Int
Declare @iAvisoDisponibles Int 
Declare @iEnviaMail Int

Set @iAvisoDisponibles = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='SMSAVISODISPONIBLES' )
If @iAvisoDisponibles Is Null
	Set @iAvisoDisponibles = 1

Set @iEnviaMail = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE' )		
If @iEnviaMail Is Null
	Set @iEnviaMail = 0

Declare @Query nVarChar(255)
Declare @cFrom nVarChar(150)
Declare @cFromName nVarChar(100)
Declare @cTo nVarChar(150)
Declare @cSubject nVarChar(100)
Declare @cMessage nVarChar(4000)
Declare @cMessageMerge nVarChar(max)
Declare @cImagenes nVarChar(max)
Declare @cMail As nVarChar(100)
Declare @cToOriginal nVarChar(150)
Declare @nFin As int
Declare @cCuenta Char(10)
Declare @cGrabo Char(1)
Declare @cFecha Char(10)
Declare @cHora Char(10)
Declare @dDiaHoy DateTime
Set @dDiaHoy = GetDate()

Set @cFecha=(Select Convert(Char(10), @dDiaHoy,103))
Set @cHora=(Select Convert(Char(10), @dDiaHoy,108))

Set @nFin= 1
set @cFrom = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
set @cFrom = Ltrim(Rtrim(@cFrom))

Set @cFromName = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
Set @cFromName = Ltrim(Rtrim(@cFromName))

set @cTo = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILINFORMATIVOCRA')
set @cTo = Ltrim(Rtrim(@cTo))

Declare @translation nVarChar(Max) = ''
Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Alcanzo Limite de SMS Disponibles', @soloOutput=1, @translation = @translation OUTPUT
Set @cSubject = @translation 

Declare @cToSMS nVarChar(150)
Declare @iModemSMS As int
Declare @cDestinoSMS nVarChar(150)
Declare @cAsunto nVarChar(4000)
Declare @cMailRuteoSMS nVarChar(150)
Declare @nEnviaSMS numeric(1,0)
Set @cGrabo = 'S'

Declare cSms CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select rep_iidcuenta,rep_iLimiteSMS,sta_iEnviadosSMS,rep_cSMSParaInforme,rep_iModemSMS,rep_cMailRuteoSMS,sta_nEnviaSMS
	From m_reportes_automaticos
		Inner Join m_status On rep_iidcuenta=sta_iidcuenta
		Where rep_iidcuenta=@iCuenta And ( rep_iLimiteSMS > 0 And rep_iLimiteSMS <> 9999 )
	
OPEN cSms
FETCH NEXT FROM cSms INTO @iCuenta,@iLimiteSMS,@iEnviadosSMS,@cToSMS,@iModemSMS,@cMailRuteoSMS,@nEnviaSMS
	WHILE @@FETCH_STATUS = 0
		Begin
			If @nEnviaSMS = 0	--Si ya controlo limite y envio mail/sms no deberia volver a hacerlo
				Begin
					If @iLimiteSMS-@iAvisoDisponibles <= @iEnviadosSMS
						Begin
							--Tengo que enviar aviso x mail a CRA
							If @cTo <> '' And @iEnviaMail > 0
							  Begin
								   Set @cMail = @cTo +';'
								   Set @cCuenta	= ( SELECT cue_clinea+'-'+cue_ncuenta FROM m_cuentas Where cue_iid=@iCuenta )	
								   Set @cMessage = 'En cuenta '+@cCuenta 

								   WHILE CHARINDEX(';',@cMail) > 0
								   BEGIN
										Set @nFin = CHARINDEX(';',@cMail)	
										Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
			
										Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
			
										If @cGrabo = 'S' And @iEnviaMail = 1		
											EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

										If @cGrabo = 'S' And @iEnviaMail = 2		
										   Begin	
										    Set @cMessageMerge = ''
											EXEC SGSP_TextMerge	@iCuenta,'','','_LS',@cFecha,@cHora,0, @cMessageMerge OUTPUT, @cImagenes OUTPUT
											If @cMessageMerge Is Null
												Set @cMessageMerge = @cMessage

											EXEC _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @dDiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iCuenta
										  End

										Set @cMail = SUBSTRING( @cMail, @nFin+1, 100-@nFin )
								   END
	
								   Set @cTo = Ltrim(Rtrim(@cToOriginal))
								   Set @nEnviaSMS = 1		--Setea que envio Mail de Aviso
							  End
							--

							--Tengo que enviar aviso x SMS a la Cuenta
							If @cToSMS <> '' And @iModemSMS > 0
								Begin 
									Set @cToSMS = Ltrim(Rtrim(@cToSMS))+';'

									WHILE CHARINDEX(';',@cToSMS) > 0 And @iModemSMS > 0
									BEGIN
										Set @nFin = CHARINDEX(';',@cToSMS)	
										Set @cDestinoSMS = SUBSTRING( @cToSMS, 1, @nFin-1 )
										Set @cAsunto = @cSubject+' : '+Ltrim(@cMessage)
										If @cGrabo = 'S' And @iEnviaMail = 1	
											EXEC SGSP_SaveSMSQueue @iCuenta,@iModemSMS,@cAsunto,@cDestinoSMS

										If @cGrabo = 'S' And @iEnviaMail = 2		
											Begin	
											    Set @cMessageMerge = ''
												EXEC SGSP_TextMerge	@iCuenta,'','','_LS',@cFecha,@cHora,0, @cMessageMerge OUTPUT, @cImagenes OUTPUT
												If @cMessageMerge Is Null
													Set @cMessageMerge = @cMessage

												Set @cAsunto = @cSubject+' : '+Ltrim(@cMessageMerge)
												EXEC SGSP_SaveSMSQueue @iCuenta,@iModemSMS,@cAsunto,@cDestinoSMS
											End

										Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 150-@nFin )
									END
									Set @nEnviaSMS = 1		--Setea que envio SMS de Aviso
								End
							--							

						End
				End
			--Else
			--2022-07-08 Pablo : porque el control y cambio de @nEnviaSMS lo deberia hacer siempre 
				Begin
					--Tengo que analizar si se quedo sin SMS rutee a mail si esta configurado
					If @iEnviadosSMS >= @iLimiteSMS
						Begin
							Set @nEnviaSMS = 2		--Setea que llego al limite de SMS
							If @cMailRuteoSMS <> ''
								Set @nEnviaSMS = 3		--Setea que hay mail para ruteo
				
						End 
					--							
				End			

				--Tengo que marcar la cuenta para indicar el status de envio de SMS
				If @cGrabo = 'S' And @nEnviaSMS > 0
					UPDATE [_Datos].[dbo].[m_status] SET sta_nEnviaSMS=@nEnviaSMS WHERE sta_iidcuenta=@iCuenta
					
				--

		FETCH NEXT FROM cSms INTO @iCuenta,@iLimiteSMS,@iEnviadosSMS,@cToSMS,@iModemSMS,@cMailRuteoSMS,@nEnviaSMS
		End

CLOSE cSms
DEALLOCATE cSms