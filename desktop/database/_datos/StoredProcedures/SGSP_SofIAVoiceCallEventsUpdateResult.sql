CREATE OR ALTER PROCEDURE [dbo].[SGSP_SofIAVoiceCallEventsUpdateResult]
    @Id           INT=0,
    @HttpCode     INT=0,
    @IsSuccess    BIT,
    @Message VARCHAR(MAX)=''
WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta SofIAVoiceCallEventService para actualizar el resultado de la ejecucion del EndPoint
--Autor :Pablo O. Canónico
--Fecha :12/12/2025
Set NoCount On
BEGIN TRY

    DECLARE @FinalStatus INT = 1;
    DECLARE @Msg         VARCHAR(MAX);

    -- 0 = pendiente
    -- 1 = procesado
    -- 2 = error

	IF (ISNULL(@IsSuccess, 0) != 1)
	    SET @FinalStatus = 2;

    SET @Msg = ISNULL(@Message, '');

    UPDATE [dbo].[SofIA_VoiceCallEvents]
    SET
        sve_iStatus       = @FinalStatus,
        sve_tLastUpdated  = GETDATE(),
        sve_cMessage	  = @Msg
    WHERE
        sve_idKey = @Id;
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