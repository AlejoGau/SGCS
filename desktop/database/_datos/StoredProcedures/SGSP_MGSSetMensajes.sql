CREATE OR ALTER PROCEDURE [dbo].[SGSP_MGSSetMensajes]
	@iID [int] = 0,
	@iEstado [int] = 1

WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta MessagingGatewayService para actualizar los mensajes enviados
--Autor :Pablo O. Canónico
--Fecha :24/07/2018
--
--Estado en p_SMSqueue
--que_nEstado= 0		Pendiente
--que_nEstado= 1		Enviado
--que_nEstado= 2		Rechazado
--que_nEstado= 3		Conmuto a Mail
--que_nEstado= 4		En proceso

Set NoCount On
BEGIN TRY
	UPDATE	[dbo].[p_SMSqueue]
	Set [que_nEstado] = @iEstado
	Where [que_iid] = @iID
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