CREATE OR ALTER PROCEDURE [dbo].[SGSP_UpdateRedirectorQueueResult]
    @IdKey     INT,
    @Status    INT,              
    @Respuesta NVARCHAR(MAX) = NULL
AS
-- Actualiza rdq_iStatus y rdq_cRespuesta para un registro de RedirectorQueue.
-- 1=procesado OK, 3=error 
-- Autor : Pablo O. Canónico
-- Fecha : 2025-10-17

SET NOCOUNT ON;

DECLARE @Message NVARCHAR(4000);

SET @Message = N'============== SGSP_UpdateRedirectorQueueResult ==============';
RAISERROR(@Message, 10, 1) WITH NOWAIT;

SET @Message = N'IdKey=' + CAST(@IdKey AS NVARCHAR(20)) + N', Status=' + CAST(@Status AS NVARCHAR(10));
RAISERROR(@Message, 10, 1) WITH NOWAIT;

BEGIN TRY
    SET XACT_ABORT ON;

    UPDATE dbo.RedirectorQueue
       SET rdq_iStatus    = @Status,
           rdq_cRespuesta = @Respuesta
     WHERE rdq_idKey      = @IdKey;

    RAISERROR(N'Filas afectadas: %d', 10, 1, @@ROWCOUNT) WITH NOWAIT;

    RAISERROR(N'===================== FIN SP =====================', 10, 1) WITH NOWAIT;
    RETURN 0;
END TRY
BEGIN CATCH
    PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
    PRINT 'Error Message : ' + ERROR_MESSAGE();
    PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
    PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
    PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
    PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
    RETURN 1;
END CATCH