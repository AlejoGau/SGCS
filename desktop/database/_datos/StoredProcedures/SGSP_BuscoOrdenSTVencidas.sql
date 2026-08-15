CREATE OR ALTER PROCEDURE [dbo].[SGSP_BuscoOrdenSTVencidas]
AS
SET NOCOUNT ON
BEGIN TRY
	SET DATEFIRST 7
	Declare @message nVarChar(Max) = '',
		@StartDateTimeText VARCHAR(max) = ''
	
	Declare @iEnviaMail Int = 0,
			@iidCuenta Int = 0,
			@iNumero Int = 0,
			@nFin Int = 0,
			@iIdInterno Int = 0,
			@iAlerta Int = (SELECT cod_nalerta From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo='_OV') 

	Declare @DiaHoy DateTime = GetDate()

	Declare @cGrabo Char(1) = 'S',
			@cFecha Char(10) = (Select Convert(Char(10), @DiaHoy,103)),
			@cHora Char(10) = (Select Convert(Char(10), @DiaHoy,108)),
			@cCuenta Char(10) = ''
	
	Declare @Query nVarChar(255) = '',
		@cFrom nVarChar(150) = '',
		@cFromName nVarChar(100) = '',
		@cTo nVarChar(150) = '',
		@cSubject nVarChar(100) = '',
		@cSubjectOriginal nVarChar(100) = '',
		@cMessage nVarChar(4000) = '',
		@cMessageMerge nVarChar(max) = '',
		@cImagenes nVarChar(max) = '',
		@cMail As nVarChar(100) = '',
		@cToOriginal nVarChar(150) = '',
		@translation nVarchar(Max) = '',
		@rec_cObservaciones nVarChar(Max)

	If @iAlerta = 1		--Genera Alerta
	   Begin
		-- Aviso que la tarea esta funcionando	60min * 25hs = 1500
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'BuscoOrdenSTVencidas', @Repetition = 1500
		--	
		Set @iEnviaMail = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE' )		
		If @iEnviaMail Is Null
			Set @iEnviaMail = 0
   
		Set @nFin= 1
		set @cFrom = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
		set @cFrom = Ltrim(Rtrim(@cFrom))

		Set @cFromName = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
		Set @cFromName = Ltrim(Rtrim(@cFromName))

		Set @cTo = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILINFORMATIVOCRA')
		Set @cTo = Ltrim(Rtrim(@cTo))
		Set @cToOriginal = @cTo

		Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Orden de ST Vencida', @soloOutput=1, @translation = @translation OUTPUT
		Set @cSubject = Rtrim(@translation)
		Set @cSubjectOriginal = @cSubject

		Declare cVencido CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
			Select [stc_iid_cuenta], [stc_inumero] From [m_st_cabecera]
				--Where  [stf_dfecha_vto_orden] >= EOMONTH (@DiaHoy,-2)
				Where  [stf_dfecha_vto_orden] <= @DiaHoy
				And Not stc_nestado IN(3,4)
	
		Open cVencido
		Fetch Next From cVencido Into @iidCuenta,@iNumero
		While @@FETCH_STATUS = 0
		Begin
		   If @cGrabo = 'S'
			  Begin	
					Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Orden de Servicio :', @soloOutput=1, @translation = @translation OUTPUT
					Set @rec_cObservaciones = '[' + CONVERT (VARCHAR, GetDate(), 103) + ' ' + substring(CONVERT (VARCHAR, getdate(), 114), 1, 5) + '] [SoftGuard] ' + Rtrim(@translation) + ' ' + Cast(@iNumero As VarChar(10)) + CHAR(13)+CHAR(10)

					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | SGSP_BuscoOrdenSTVencidas | Observaciones : '+@rec_cObservaciones
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Execute [dbo].[SGSP_pRecepcionINS]
							@rec_iidcuenta = @iidCuenta,
							@rec_calarma = '_OV',
							@rec_tfechahora  = @DiaHoy,
							@rec_nestado  = 0,
							@rec_cObservaciones = @rec_cObservaciones,
							@rec_tFechaRecepcion = @DiaHoy,
							@rec_nOrigen = 8,
							@iValor = @iIdInterno OUTPUT

				--If @cTo <> '' And @iEnviaMail > 0 
				If @cTo <> '' And @iEnviaMail = 2 And @iIdInterno > 0
					Begin
						Set @cMail = @cTo +';'
						Set @cCuenta = ''
						Set @cCuenta = ( SELECT cue_clinea+'-'+cue_ncuenta FROM m_cuentas Where cue_iid=@iidCuenta )	
						Set @cMessage = 'En cuenta '+@cCuenta 

						Set @cSubject = @cSubjectOriginal + ' (' + Cast(@iNumero As VarChar(10)) + ')'

						WHILE CHARINDEX(';',@cMail) > 0
						BEGIN
							Set @nFin = CHARINDEX(';',@cMail)	
							Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
			
							Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
							/*			
							If @iEnviaMail = 1		
								Execute [_Sistema].[dbo].[sp_SendMail] @cFrom, @cTo, @cSubject, @cMessage	
							*/
							If @iEnviaMail = 2		
								Begin	
									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | SGSP_BuscoOrdenSTVencidas | Se envia mail informativo a la CRA : '+@cTo
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Execute [_Datos].[dbo].[SGSP_TextMerge]	@iidCuenta,'','','_OV',@cFecha,@cHora,@iIdInterno, @cMessageMerge OUTPUT, @cImagenes OUTPUT
									If @cMessageMerge Is Null
										Set @cMessageMerge = @cMessage

									Execute [_Datos].[dbo].[SmartMail_ProgramCreate] @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta
								End

							Set @cMail = SUBSTRING( @cMail, @nFin+1, 100-@nFin )
						END
	
						Set @cTo = Ltrim(Rtrim(@cToOriginal))
					End
			  End
	
		   Fetch Next From cVencido Into @iidCuenta,@iNumero
		End
		Close cVencido
		Deallocate cVencido

	   End
	Else
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_BuscoOrdenSTVencidas | El codigo _OV NO esta configurado para generar alerta'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

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