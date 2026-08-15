CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSRespuestaComandos]
	@iRecId [int] = 0,
	@cRespuesta [VarChar](1000) = '',
	@iReceptor  [int] = 0

AS
--Guarda la respuesta de los comandos de IBR-AMT recibidos en IRS
--Autor :Pablo O. Canónico
--Fecha :30/09/2020
--crx_iStatus Descripcion
--	0		Pendiente
--	1		Con Respuesta
--	2		Procesado

Set NoCount On

BEGIN TRY

	Declare @message VarChar(Max) = '',
		    @StartDateTimeText VarChar(Max) = '',
			@cComando VarChar(200) = ''

	Declare @idKey Int = 0
	Declare @iCmdId Int = 0
	Select Top (1) @idKey = [crx_idKey], @iCmdId = [crx_iCmdId] 
		From [dbo].[p_ComandosRX] 
		Inner Join [dbo].[p_comandos_ip] On [cmd_iid]=[crx_iCmdId] 
	Where [crx_iStatus]=0 And [cmd_idReceptor]=@iReceptor Order By [crx_tFechaHora]
	
	If @iCmdId Is Null Or @iCmdId = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_IRSRespuestaComandos] | Id Key en cero. No hay [p_ComandosRX] pendientes para Receptor : '+ CONVERT(VARCHAR(10), @iReceptor)
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

	Update [dbo].[p_ComandosRX]
		Set [crx_iRecId] = @iRecId
		   ,[crx_iStatus] = 1
		   ,[crx_tStatusExec] = GetDate()
	Where [crx_idKey]=@idKey

	Update [dbo].[p_comandos_ip]
		Set [cmd_cRespuesta] = @cRespuesta
	Where [cmd_iid] = @iCmdId

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