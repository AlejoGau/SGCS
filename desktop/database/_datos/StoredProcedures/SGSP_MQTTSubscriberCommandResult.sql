CREATE OR ALTER PROCEDURE [dbo].[SGSP_MQTTSubscriberCommandResult]
    @cmd_iid INT,
    @bSuccess BIT,
    @cRespuesta VARCHAR(MAX) = NULL
WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta el servicio  MQTTSubscriber para guardar el resultado del envio de un comando MQTT.
--Autor :Pablo O. Canónico
--Fecha :16/08/2026
-- cmd_nEstado:
--   3 = Procesado
--   5 = Procesado con Error
SET NOCOUNT ON;

BEGIN TRY
    IF ISNULL(@cmd_iid, 0) <= 0
    BEGIN
        RAISERROR('Parametro @cmd_iid invalido.', 16, 1);
        RETURN;
    END;

    UPDATE _Datos..p_comandos_ip
        SET cmd_nEstado = CASE WHEN @bSuccess = 1 THEN 3 ELSE 5 END,
            cmd_tEnvioFechaHora = GETDATE(),
            cmd_cRespuesta = @cRespuesta
    WHERE cmd_iid = @cmd_iid
        AND cmd_nEstado = 2;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('No se encontro comando en estado En proceso (2) para actualizar', 16, 1);
        RETURN;
    END;
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

    THROW;
END CATCH;