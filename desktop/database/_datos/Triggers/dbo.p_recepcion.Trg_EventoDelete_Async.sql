-- =============================================
-- Trigger: Trg_EventoDelete_Async
-- Descripción: Versión asíncrona del trigger
-- Reemplaza a Trg_EventoDelete
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[Trg_EventoDelete_Async] 
ON [dbo].[p_recepcion] 
AFTER DELETE 
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @RowCount INT = 0;
    SELECT @RowCount = COUNT(*) FROM deleted; 
    
    DECLARE @Message NVARCHAR(MAX);
    SET @Message = FORMATMESSAGE('[Trg_EventoDelete_Async] - Records: %d', @RowCount);
    RAISERROR(@Message, 10, 1) WITH NOWAIT;
    
    -- Salida temprana si no hay registros
    IF @RowCount = 0 RETURN;
    
    BEGIN TRY
        -- Configuración de batching
        DECLARE @BatchSize INT = 1500;
        DECLARE @ProcessedRows INT = 0;
        DECLARE @BatchNumber INT = 1;
        DECLARE @StartTime DATETIME2 = SYSDATETIME();
        
        -- Tabla temporal para procesar por lotes
        CREATE TABLE #DeletedBatch (
            rec_iid INT,
            rec_tfechahora DATETIME,
            rec_periodo VARCHAR(6),
            RowNum INT
        );
        
        -- Cargar datos con numeración para batching
        INSERT INTO #DeletedBatch (rec_iid, rec_tfechahora, rec_periodo, RowNum)
        SELECT 
            rec_iid,
            rec_tfechahora,
            LEFT(CONVERT(VARCHAR(8), rec_tfechahora, 112), 6),
            ROW_NUMBER() OVER (ORDER BY rec_iid)
        FROM deleted;
        
        -- Procesar en batches
        WHILE @ProcessedRows < @RowCount
        BEGIN
            DECLARE @BatchStart INT = @ProcessedRows + 1;
            DECLARE @BatchEnd INT = @ProcessedRows + @BatchSize;
            DECLARE @CurrentBatchSize INT;
            
            -- 1. Insertar en la cola de procesamiento asíncrono (BATCH)
            INSERT INTO [dbo].[EventoDeleteQueue] 
                (edq_idRec, edq_tDateTime, edq_cPeriodo)
            SELECT 
                rec_iid,
                rec_tfechahora,
                rec_periodo
            FROM #DeletedBatch
            WHERE RowNum BETWEEN @BatchStart AND @BatchEnd;
            
            SET @CurrentBatchSize = @@ROWCOUNT;
            
            -- 2. Va a _RegistrosAEliminar x que EventosPendientes tiene su propio trigger de delete
            INSERT INTO _RegistrosAEliminar ([rae_cTabla], [rae_iID]) 
            SELECT 'EventosPendientes', rec_iid 
            FROM #DeletedBatch
            WHERE RowNum BETWEEN @BatchStart AND @BatchEnd;
            
            -- 3. Van a _RegistrosAEliminar 
            INSERT INTO _RegistrosAEliminar ([rae_cTabla], [rae_iID]) 
            SELECT tabla, rec_iid
            FROM #DeletedBatch
            CROSS JOIN (VALUES 
                ('p_recepcion_proceso'),
                ('p_recepcion_notas'), 
                ('p_RXLog'),
                ('p_RXImg')
            ) AS tablas(tabla)
            WHERE RowNum BETWEEN @BatchStart AND @BatchEnd;
            
            SET @ProcessedRows = @ProcessedRows + @CurrentBatchSize;
            
            -- Informacion de progreso
            IF (@BatchNumber % 5 = 0) OR (@ProcessedRows >= @RowCount)
            BEGIN
                SET @Message = FORMATMESSAGE('[Trg_EventoDelete_Async] - Batch %d: Processed %d/%d records', 
                    @BatchNumber, @ProcessedRows, @RowCount);
                RAISERROR(@Message, 10, 1) WITH NOWAIT;
            END
            
            SET @BatchNumber = @BatchNumber + 1;
            
            -- Pausa (solo si hay más batches)
            IF @ProcessedRows < @RowCount
            BEGIN
                WAITFOR DELAY '00:00:00.003'; -- 3ms
            END
        END
        
        -- Informacion final con timing
        DECLARE @ElapsedMs INT = DATEDIFF(MILLISECOND, @StartTime, SYSDATETIME());
        SET @Message = FORMATMESSAGE('[Trg_EventoDelete_Async] - COMPLETED: %d records in %d batches (%dms)', 
            @RowCount, @BatchNumber - 1, @ElapsedMs);
        RAISERROR(@Message, 10, 1) WITH NOWAIT;
        
        DROP TABLE #DeletedBatch;
        
    END TRY
    BEGIN CATCH
        -- Cleanup en caso de error
        IF OBJECT_ID('tempdb..#DeletedBatch') IS NOT NULL
            DROP TABLE #DeletedBatch;
            
        -- Log del error pero NO hacer THROW para no fallar el DELETE original
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        
        -- Insertar en control como error
        INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cStatus, edc_cMessage)
        VALUES ('TRIGGER_ERROR', 'ERROR', @ErrorMessage);
        
        RAISERROR('Error en Trg_EventoDelete_Async: %s', 10, 1, @ErrorMessage) WITH NOWAIT;
    END CATCH;
END