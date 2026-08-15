CREATE OR ALTER PROCEDURE [dbo].[SGSP_AMTInsertComandos]
	@cIMEI [VarChar](10) = '',
	@cValores [VarChar](100) = '',
	@iValor [int] = 0 OUTPUT,
	@iCta [int] = 0 OUTPUT,
	@iidIRS [int] = 0 OUTPUT

AS
--Es el store que ejecuta TcpServerCore para insertas los comandos a enviar por IRS
--Autor :Pablo O. Canónico
--Fecha :29/09/2020

Set NoCount On
BEGIN TRY
	Declare @message VarChar(Max) = '',
		    @StartDateTimeText VarChar(Max) = '',
			@cComando VarChar(200) = ''

	Select @iCta = cue_iid, @iidIRS = IsNull([cue_iidIRS],0)  From [dbo].[m_cuentas] 
	Left Outer Join [dbo].[m_CuentasXtraInfo] On [cue_iidCuenta]=[cue_iid]
	Where cue_cIMEI = @cIMEI
	If @iCta Is Null Or @iCta = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AMTInsertComandos] | Id Cuenta en cero. No hay cuenta para el IMEI '+@cIMEI
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		Set NoExec On
	End

	Declare @iReceptor Int = (Select rec_iid From [dbo].[m_receptores_cab] Where [rec_cdll] = 'IntelBrasPacketParser')
	If @iReceptor Is Null Or @iReceptor = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AMTInsertComandos] | Id Receptor en cero. No se encontro IntelBrasPacketParser'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

	Insert Into [dbo].[p_comandos_ip] ([cmd_idCuenta],[cmd_idReceptor],[cmd_iComando],[cmd_cValores],[cmd_nEstado],[cmd_cObservaciones])
		VALUES (@iCta, @iReceptor, 0,'$AMT|' + @cValores + '[]', 1,'Comando AMT Interno')

	Select @iValor = SCOPE_IDENTITY()	--Para el OUTPUT
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
	IF @@TRANCOUNT>0
		ROLLBACK TRAN

END CATCH