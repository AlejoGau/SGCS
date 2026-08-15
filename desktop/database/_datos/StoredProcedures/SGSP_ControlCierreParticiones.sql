CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlCierreParticiones]
	@idCtaMadre [int]=0
AS
--Verifica que ante un cierre de una cuenta madre con particiones, estas esten cerradas
--Autor : Pablo O. Canónico
--Fecha : 17/05/2024

Set NoCount ON
BEGIN TRY
	Declare @iEsCtaMadre Int = 0

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_ControlCierreParticiones] | Busco si la cuenta tiene particiones | idCtaMadre => '+ Rtrim(Cast(@idCtaMadre As Varchar(10)))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Query
	Select Top 1 @iEsCtaMadre=[cue_iid] From [dbo].[m_cuentas] WITH (NOLOCK)
		Where [cue_nparticion]=@idCtaMadre

	--Si el query trae algun valor
	If ( @idCtaMadre Is Not  Null And @idCtaMadre > 0) 
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_ControlCierreParticiones] | Tiene particiones. Controlo si estan cerradas '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @cObs Varchar(Max) = ''
		Select @cObs = STUFF( (
				Select ' / ' + LTRIM(RTRIM([cue_ncuenta])) + '-' + RTRIM([cue_cnombre])
        			 From [dbo].[m_cuentas] WITH (NOLOCK)
				Inner Join [m_status] On cue_iid=sta_iidcuenta
					Where [cue_nparticion]=@idCtaMadre 
					  And [sta_nEstado] = 1 --Abierto
				FOR XML PATH(''), TYPE
			).value('.', 'VARCHAR(MAX)'), 1, 3, '')

	    If (@cObs Is Not Null And @cObs != '') 
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_ControlCierreParticiones] | Particiones en estado Abierto | Se genera evento de control _PA'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Declare @translation nVarchar(Max)=''
			Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Particiones Abiertas', @soloOutput=1, @translation = @translation OUTPUT
			Set @cObs = Rtrim(@translation) +' : ' + @cObs

			Execute [_Desktop].[dbo].[AlarmaGenerar] @idCta=@idCtaMadre, @cAlarma='_PA', @cObservaciones=@cObs
		End
	End

Set NoExec Off
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