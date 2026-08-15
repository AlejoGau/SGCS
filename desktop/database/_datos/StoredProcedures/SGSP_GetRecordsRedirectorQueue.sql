CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetRecordsRedirectorQueue]
    @BatchSize INT
AS
-- Toma registros pendientes (rdq_iStatus = 0), los marca "en proceso" (rdq_iStatus = 1) y devuelve el lote.
-- Autor : Pablo O. Canónico
-- Fecha : 2025-10-17

SET NOCOUNT ON;

DECLARE @Message NVARCHAR(4000);

SET @Message = N'============== SGSP_GetRecordsRedirectorQueue ==============';
RAISERROR(@Message, 10, 1) WITH NOWAIT;

SET @Message = N'BatchSize: ' + CAST(@BatchSize AS NVARCHAR(10));
RAISERROR(@Message, 10, 1) WITH NOWAIT;

BEGIN TRY
    SET XACT_ABORT ON;

    -- IDs seleccionados en esta ejecucion
    CREATE TABLE #picked (rdq_idKey INT PRIMARY KEY);

    BEGIN TRAN;

		;WITH cte AS
		(
			SELECT TOP (@BatchSize) q.rdq_idKey
			FROM dbo.RedirectorQueue AS q WITH (READPAST, UPDLOCK, ROWLOCK)
			WHERE q.rdq_iStatus = 0
			ORDER BY q.rdq_tFechaHora ASC, q.rdq_idKey ASC
		)
		INSERT INTO #picked (rdq_idKey)
		SELECT rdq_idKey FROM cte;

        IF @@ROWCOUNT = 0
        BEGIN
            COMMIT TRAN;

            SET @Message = N'No se encontraron pendientes (rdq_iStatus = 0).';
            RAISERROR(@Message, 10, 1) WITH NOWAIT;

            -- Devolver resultset vacío con misma forma
            SELECT CAST(NULL AS INT)           AS rdq_idKey,
                   CAST(NULL AS NVARCHAR(MAX)) AS rdq_cLlamado,
                   CAST(NULL AS DATETIME)      AS rdq_tFechaHora,
                   CAST(NULL AS INT)           AS rdq_iReSend;
            RETURN 0;
        END

        SET @Message = N'IDs seleccionados: ' + CAST((SELECT COUNT(*) FROM #picked) AS NVARCHAR(10));
        RAISERROR(@Message, 10, 1) WITH NOWAIT;

        -- Marcar en proceso
        UPDATE q
           SET q.rdq_iStatus = 1
        FROM dbo.RedirectorQueue AS q
        INNER JOIN #picked p ON p.rdq_idKey = q.rdq_idKey;

        SET @Message = N'Filas actualizadas a "en proceso": ' + CAST(@@ROWCOUNT AS NVARCHAR(10));
        RAISERROR(@Message, 10, 1) WITH NOWAIT;

    COMMIT TRAN;

    -- Devolver el lote a procesar
    SELECT q.rdq_idKey,
           q.rdq_cLlamado,
           q.rdq_tFechaHora,
           q.rdq_iReSend
    FROM dbo.RedirectorQueue q
    INNER JOIN #picked p ON p.rdq_idKey = q.rdq_idKey;

    SET @Message = N'Devolviendo lote seleccionado.';
    RAISERROR(@Message, 10, 1) WITH NOWAIT;

    SET @Message = N'===================== FIN SP =====================';
    RAISERROR(@Message, 10, 1) WITH NOWAIT;

END TRY
BEGIN CATCH
    -- Manejo de errores al estilo de tus SGSP_*
    IF ERROR_NUMBER() = 2627
    BEGIN
        PRINT 'Handling PK violation...';
    END
    ELSE IF ERROR_NUMBER() = 547
    BEGIN
        PRINT 'Handling CHECK/FK constraint violation...';
    END
    ELSE IF ERROR_NUMBER() = 515
    BEGIN
        PRINT 'Handling NOT NULL violation...';
    END
    ELSE IF ERROR_NUMBER() IN (245, 248, 297)
    BEGIN
        PRINT 'Handling conversion error...';
    END
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