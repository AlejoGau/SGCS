CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlFalsasAlarmas]  As
--Verifica Falsas Alarmas | Actualiza Status
--Autor :Pablo O. Canónico
--Fecha :02/12/2014
--Modificado 19-04-2016 Cambio rutina insert en pRecepcion
--Modificado 30-05-2016 Se actualiza m_Status

SET NOCOUNT ON
-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlFalsasAlarmas', @Repetition = 30
--	

Declare @iEnviaMail Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE' )		
If @iEnviaMail Is Null
	Set @iEnviaMail = 0

Declare @Query	nVarChar(255)='',
 @cFrom			nVarChar(150)=( Select Cast(par_cValor As nVarChar(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER'),
 @cFromName		nVarChar(100)=( Select Cast(par_cValor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME'),
 @cTo			nVarChar(150)=( Select Cast(par_cValor As nVarChar(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILFALSASALARMAS'),
 @cSubject		nVarChar(100)='',
 @cMessage		nVarChar(4000)='',
 @cMessageMerge nVarChar(max)='',
 @cImagenes     nVarChar(max)='',
 @cMail			nVarChar(100)='',
 @cToOriginal	nVarChar(150)='',
 @cMailDealer	nVarChar(100)=''

Declare @translation nVarChar(Max) = ''
Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Alcanzo Limite de Falsas Alarmas', @soloOutput=1, @translation = @translation OUTPUT
Set @cSubject = @translation 

Declare @nFin	int=1,
 @iParametro    Int=0,
 @iidCuenta		int=0,
 @iSituacion	int=0

Declare @dDiaHoy DateTime = GetDate()

Declare @cCuenta	Char(10)='',
 @cGrabo			Char(1)='S',
 @cFecha			Char(10)=(Select Convert(Char(10), @dDiaHoy,103)),
 @cHora				Char(10)=(Select Convert(Char(10), @dDiaHoy,108)),
 @cResolucion		Char(3)=''

Set @cFrom = Ltrim(Rtrim(@cFrom))
Set @cFromName = Ltrim(Rtrim(@cFromName))
Set @cTo = Ltrim(Rtrim(@cTo))

Declare @nEstado Numeric(1,0)=0

Declare cFalsas CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select sta_iidCuenta,( Select est_iidcuenta From m_estado_cuenta_Cab A With (NOLOCK) 
							 Where est_iidCuenta=sta_iidCuenta And ( est_nEstado=2 OR 
						( est_nEstado=1 And @dDiaHoy BetWeen est_dfechadesde And est_dfechahasta )
						)) As iSituacion 
	From m_status 
	Inner Join m_falsas On fal_iidCuenta=sta_iidCuenta
	Where fal_nMargen > 0 And sta_ncontadorfa >= fal_nMargen And sta_nEnvioMailFA = 0
	
OPEN cFalsas
FETCH NEXT FROM cFalsas INTO @iidCuenta,@iSituacion
	WHILE @@FETCH_STATUS = 0
		Begin
			If @iSituacion Is Null	--No esta Deshabilitada o en Prueba
				Begin
					--Tengo que grabar Evento _LF : Supero Limite Falsas Alarmas
					Set @cResolucion =''
					Set @nEstado = 0
				    Set @iParametro = ( SELECT cod_nalerta From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo='_LF' )

					--Si es un Evento de NO GENERAR, NO se graba p_recepcion			
					If @iParametro < 2
						Begin	
							--Si NO Genera Alerta (0) lo grabo con estado 5
							If @iParametro = 0
								Set @nEstado = 5

							If @cGrabo = 'S'	
								Begin
									BEGIN TRY

									EXEC [dbo].[SGSP_pRecepcionINS]
											@rec_iidcuenta = @iidCuenta,
											@rec_calarma = '_LF',
											@rec_tfechahora  = @dDiaHoy,
											@rec_nestado  = @nEstado,
											@rec_idResolucion = @cResolucion,
											@rec_tFechaRecepcion = @dDiaHoy,
											@rec_nOrigen = 8,
											@iValor = @iParametro OUTPUT
									END TRY
									BEGIN CATCH
										Print 'EXEC [dbo].[SGSP_pRecepcionINS] Volvio con error'
										Set @iParametro=0
									END CATCH

									if @iParametro > 0
									Begin
										--Tengo que actualizar Status con ultima alarma y fecha
										UPDATE m_status Set sta_cultimaalarma = '_LF', sta_dfechautimaalarma = CONVERT(DateTime, CONVERT(Varchar(20), @dDiaHoy, 120),111) 
											Where sta_iidCuenta=@iidCuenta
									End
								End	
						End

					--Tengo que enviar aviso x mail a Supervisor
					If @iEnviaMail > 0
						Begin

							Set @cMail = @cTo 
							Set @cMailDealer = ( Select lin_cmail FROM _Tablas.dbo.t_lineas Inner Join m_cuentas On lin_ccodigo=cue_clinea Where cue_iid=@iidCuenta )	
							IF @cMailDealer Is Not Null And @cMailDealer <> ''
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'+@cMailDealer +';'	
									Else
										Set @cMail = @cMailDealer +';'	
								End				
							Else 				
								Begin
									If @cMail <> ''
										Set @cMail = @cMail +';'
								End	
						
							Set @cCuenta	= ( SELECT cue_clinea+'-'+cue_ncuenta FROM m_cuentas Where cue_iid=@iidCuenta )	
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
										EXEC SGSP_TextMerge	@iidCuenta,'','','_LF',@cFecha,@cHora,0, @cMessageMerge OUTPUT, @cImagenes OUTPUT
										If @cMessageMerge Is Null
											Set @cMessageMerge = @cMessage

										EXEC _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @dDiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta
									End

								Set @cMail = SUBSTRING( @cMail, @nFin+1, 100-@nFin )
							End
	
							Set @cTo = Ltrim(Rtrim(@cToOriginal))

							--Tengo que marcar la cuenta para indicar el status de envio de Mail
							UPDATE [_Datos].[dbo].[m_status] Set sta_nEnvioMailFA=1 Where sta_iidcuenta=@iidCuenta
							--

						End
						--
				End

			FETCH NEXT FROM cFalsas INTO @iidCuenta,@iSituacion
		End

CLOSE cFalsas
DEALLOCATE cFalsas