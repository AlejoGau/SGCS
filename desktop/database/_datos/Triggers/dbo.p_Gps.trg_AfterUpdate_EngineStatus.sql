CREATE OR ALTER TRIGGER trg_AfterUpdate_EngineStatus
ON [dbo].[p_Gps]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Verificación temprana: salir si no hay cambios relevantes
    IF NOT EXISTS (
        SELECT 1 
        FROM inserted i
        INNER JOIN deleted d ON i.gps_iid = d.gps_iid
        WHERE i.gps_iEngineStatus != d.gps_iEngineStatus
          AND i.gps_iEngineStatus IN (0, 1)
    )
        RETURN;
    
    -- Declarar variables para el procesamiento en lote
    DECLARE @idCta INT, 
            @engineStatus INT,
            @return_value INT,
            @rec_iid INT,
            @bGuardoPTimer INT;
    
    -- Cursor optimizado para procesar múltiples registros
    DECLARE engine_cursor CURSOR LOCAL FAST_FORWARD FOR
        SELECT i.gps_idCuenta, i.gps_iEngineStatus
        FROM inserted i
        INNER JOIN deleted d ON i.gps_iid = d.gps_iid
        WHERE i.gps_iEngineStatus != d.gps_iEngineStatus
          AND i.gps_iEngineStatus IN (0, 1);
    
    OPEN engine_cursor;
    
    FETCH NEXT FROM engine_cursor INTO @idCta, @engineStatus;
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Procesamiento condicional optimizado
        IF @engineStatus = 1
        BEGIN
            EXEC @return_value = [_Desktop].[dbo].[AlarmaGenerar]
                @idCta = @idCta,
                @cAlarma = N'LME',
                @cObservaciones = N'Evento Generado Por Control interno',
                @rec_norigen = 3,
                @rec_iid = @rec_iid OUTPUT,
                @bGuardoPTimer = @bGuardoPTimer OUTPUT;
        END
        ELSE -- @engineStatus = 0 (ya validamos que solo puede ser 0 o 1)
        BEGIN
            EXEC @return_value = [_Desktop].[dbo].[AlarmaGenerar]
                @idCta = @idCta,
                @cAlarma = N'LMA',
                @cObservaciones = N'Evento Generado Por Control interno',
                @rec_norigen = 3,
                @rec_iid = @rec_iid OUTPUT,
                @bGuardoPTimer = @bGuardoPTimer OUTPUT;
        END
        
        FETCH NEXT FROM engine_cursor INTO @idCta, @engineStatus;
    END
    
    CLOSE engine_cursor;
    DEALLOCATE engine_cursor;
END