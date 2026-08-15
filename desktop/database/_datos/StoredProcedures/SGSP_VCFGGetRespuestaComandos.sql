CREATE OR ALTER PROCEDURE [dbo].[SGSP_VCFGGetRespuestaComandos]
	@iCmdID [int] = 0 

AS
--Es el store que ejecuta VettiConfigGateway para obtener las respuestas de los comandos de VettiConfig recibidos por IRS
--Autor :Pablo O. Canónico
--Fecha :27/04/2022

Set NoCount On
BEGIN TRY
	Select [cmd_cRespuesta]
		From [dbo].[p_comandos_ip]
	where [cmd_iid] = @iCmdID
	And [cmd_nEstado] = 3
	And [cmd_cRespuesta] Is Not null
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