-- =============================================
-- SP: SPSG_EventoDelete_ProcessQueue
-- Descripción: SP principal que orquesta el procesamiento de la cola
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SPSG_EventoDelete_ProcessQueue]
    @MaxMinutes INT = 10,      -- Tiempo máximo de ejecución en minutos
    @BatchSize INT = 100        -- Tamaño del batch para cada operación
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @StartTime DATETIME2(3) = SYSDATETIME();
    DECLARE @CutoffTime DATETIME2(3) = DATEADD(MINUTE, @MaxMinutes, @StartTime);
    DECLARE @CurrentPeriodo CHAR(6);
    DECLARE @RowsProcessed INT;
    DECLARE @TotalProcessed INT = 0;
    DECLARE @CycleCount INT = 0;
    
    -- Variables para control anti-loop
    DECLARE @RegistrosPendientesAnterior INT = -1;
    DECLARE @RegistrosPendientesActual INT;
    DECLARE @CiclosSinProgreso INT = 0;
    DECLARE @MaxCiclosSinProgreso INT = 3;
    
    BEGIN TRY
        -- Log inicio del proceso
        INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cStatus, edc_cMessage)
        VALUES ('PROCESS_START', 'INICIADO', 'Iniciando procesamiento de cola');
        
        -- Contar registros pendientes iniciales
        SELECT @RegistrosPendientesAnterior = COUNT(*) 
        FROM [dbo].[EventoDeleteQueue] 
        WHERE edq_iGeneralStatus < 2;
        
        -- Procesar mientras haya tiempo, registros pendientes y no estemos en loop
        WHILE SYSDATETIME() < @CutoffTime 
          AND EXISTS (SELECT 1 FROM [dbo].[EventoDeleteQueue] WHERE edq_iGeneralStatus < 2)
          AND @CiclosSinProgreso < @MaxCiclosSinProgreso
        BEGIN
            SET @CycleCount = @CycleCount + 1;
            DECLARE @RegistrosProcesadosEnCiclo INT = 0;
            
            -- Obtener períodos únicos con registros pendientes
            DECLARE periodo_cursor CURSOR LOCAL FAST_FORWARD FOR
                SELECT DISTINCT edq_cPeriodo
                FROM [dbo].[EventoDeleteQueue]
                WHERE edq_iGeneralStatus < 2  -- No completados
                  AND edq_iAttempts < 3        -- No exceder reintentos
                ORDER BY edq_cPeriodo;
            
            OPEN periodo_cursor;
            FETCH NEXT FROM periodo_cursor INTO @CurrentPeriodo;
            
            WHILE @@FETCH_STATUS = 0 AND SYSDATETIME() < @CutoffTime
            BEGIN
                -- =============================================
                -- 1. Procesar MERGE de p_RXtraInfo
                -- =============================================
                IF EXISTS (SELECT 1 FROM [dbo].[EventoDeleteQueue] 
                          WHERE edq_cPeriodo = @CurrentPeriodo 
                            AND edq_iRxtrainfoStatus = 0
                            AND edq_iAttempts < 3)
                BEGIN
                    EXEC @RowsProcessed = [dbo].[SPSG_EventoDelete_RXtraInfo] 
                        @Periodo = @CurrentPeriodo,
                        @Operacion = 'M',
                        @BatchSize = @BatchSize;
                    
                    SET @TotalProcessed = @TotalProcessed + ISNULL(@RowsProcessed, 0);
                    SET @RegistrosProcesadosEnCiclo = @RegistrosProcesadosEnCiclo + ISNULL(@RowsProcessed, 0);
                END
                
                -- =============================================
                -- 2. Procesar DELETE de p_RXtraInfo
                -- =============================================
                IF EXISTS (SELECT 1 FROM [dbo].[EventoDeleteQueue] 
                          WHERE edq_cPeriodo = @CurrentPeriodo 
                            AND edq_iRxtrainfoStatus = 1)
                BEGIN
                    EXEC @RowsProcessed = [dbo].[SPSG_EventoDelete_RXtraInfo] 
                        @Periodo = @CurrentPeriodo,
                        @Operacion = 'D',
                        @BatchSize = @BatchSize;
                    
                    SET @TotalProcessed = @TotalProcessed + ISNULL(@RowsProcessed, 0);
                    SET @RegistrosProcesadosEnCiclo = @RegistrosProcesadosEnCiclo + ISNULL(@RowsProcessed, 0);
                END
                
                -- =============================================
                -- 3. Procesar MERGE de EventosTimeLine
                -- =============================================
                IF EXISTS (SELECT 1 FROM [dbo].[EventoDeleteQueue] 
                          WHERE edq_cPeriodo = @CurrentPeriodo 
                            AND edq_iTimelineStatus = 0
                            AND edq_iAttempts < 3)
                BEGIN
                    EXEC @RowsProcessed = [dbo].[SPSG_EventoDelete_EventosTimeLine] 
                        @Periodo = @CurrentPeriodo,
                        @Operacion = 'M',
                        @BatchSize = @BatchSize;
                    
                    SET @TotalProcessed = @TotalProcessed + ISNULL(@RowsProcessed, 0);
                    SET @RegistrosProcesadosEnCiclo = @RegistrosProcesadosEnCiclo + ISNULL(@RowsProcessed, 0);
                END
                
                -- =============================================
                -- 4. Procesar DELETE de EventosTimeLine
                -- =============================================
                IF EXISTS (SELECT 1 FROM [dbo].[EventoDeleteQueue] 
                          WHERE edq_cPeriodo = @CurrentPeriodo 
                            AND edq_iTimelineStatus = 1)
                BEGIN
                    EXEC @RowsProcessed = [dbo].[SPSG_EventoDelete_EventosTimeLine] 
                        @Periodo = @CurrentPeriodo,
                        @Operacion = 'D',
                        @BatchSize = @BatchSize;
                    
                    SET @TotalProcessed = @TotalProcessed + ISNULL(@RowsProcessed, 0);
                    SET @RegistrosProcesadosEnCiclo = @RegistrosProcesadosEnCiclo + ISNULL(@RowsProcessed, 0);
                END
                
                FETCH NEXT FROM periodo_cursor INTO @CurrentPeriodo;
            END
            
            CLOSE periodo_cursor;
            DEALLOCATE periodo_cursor;
            
            -- Control anti-loop: verificar progreso
            SELECT @RegistrosPendientesActual = COUNT(*) 
            FROM [dbo].[EventoDeleteQueue] 
            WHERE edq_iGeneralStatus < 2;
            
            -- Si no hubo cambios en los registros pendientes
            IF @RegistrosPendientesActual = @RegistrosPendientesAnterior
            BEGIN
                SET @CiclosSinProgreso = @CiclosSinProgreso + 1;
                
                -- Log de advertencia
                IF @CiclosSinProgreso >= 2
                BEGIN
                    INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cStatus, edc_cMessage)
                    VALUES ('PROCESS_WARNING', 'ADVERTENCIA', 
                            'Ciclo ' + CAST(@CiclosSinProgreso AS VARCHAR(10)) + 
                            ' sin progreso. Registros pendientes: ' + CAST(@RegistrosPendientesActual AS VARCHAR(10)));
                END
                
                -- Si alcanzamos el límite, salir
                IF @CiclosSinProgreso >= @MaxCiclosSinProgreso
                BEGIN
                    INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cStatus, edc_cMessage)
                    VALUES ('PROCESS_LOOP_EXIT', 'ADVERTENCIA', 
                            'Saliendo por ' + CAST(@MaxCiclosSinProgreso AS VARCHAR(10)) + 
                            ' ciclos sin progreso. Registros pendientes: ' + CAST(@RegistrosPendientesActual AS VARCHAR(10)) + 
                            '. Posibles registros con intentos excedidos o ya en historica.');
                    BREAK;
                END
            END
            ELSE
            BEGIN
                -- Hubo progreso, resetear contador
                SET @CiclosSinProgreso = 0;
                SET @RegistrosPendientesAnterior = @RegistrosPendientesActual;
            END
            
            -- Pequeña pausa para no saturar el sistema
            IF SYSDATETIME() < @CutoffTime AND @CiclosSinProgreso < @MaxCiclosSinProgreso
                WAITFOR DELAY '00:00:00.100';
        END
        
        -- Log resumen final
        DECLARE @Duration INT = DATEDIFF(SECOND, @StartTime, SYSDATETIME());
        DECLARE @Summary NVARCHAR(2000);
        DECLARE @RazonSalida VARCHAR(100);
        
        -- Determinar razón de salida
        SET @RazonSalida = CASE
            WHEN @CiclosSinProgreso >= @MaxCiclosSinProgreso THEN 'Loop detectado'
            WHEN SYSDATETIME() >= @CutoffTime THEN 'Tiempo agotado'
            WHEN NOT EXISTS (SELECT 1 FROM [dbo].[EventoDeleteQueue] WHERE edq_iGeneralStatus < 2) THEN 'Cola vacia'
            ELSE 'Completado'
        END;
        
        SELECT @Summary = FORMATMESSAGE('Procesamiento completado. Ciclos: %d, Registros: %d, Duracion: %d seg, Razon: %s', 
                                        @CycleCount, @TotalProcessed, @Duration, @RazonSalida);
        
        INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_iAffectedRecords, edc_tDateStart, edc_tDateEnd, edc_iDurationMS, edc_cStatus, edc_cMessage)
        VALUES ('PROCESS_END', @TotalProcessed, @StartTime, SYSDATETIME(), @Duration * 1000, 'COMPLETADO', @Summary);
        
        -- Guardar estadísticas finales con detalle de intentos excedidos
        INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cStatus, edc_cMessage)
        SELECT 'ESTADISTICAS_FINALES', 'INFO',
            FORMATMESSAGE('Total:%d | Pend:%d | Parc:%d | Comp:%d | Err:%d | IntentosExced:%d',
                COUNT(*),
                SUM(CASE WHEN edq_iGeneralStatus = 0 THEN 1 ELSE 0 END),
                SUM(CASE WHEN edq_iGeneralStatus = 1 THEN 1 ELSE 0 END),
                SUM(CASE WHEN edq_iGeneralStatus = 2 THEN 1 ELSE 0 END),
                SUM(CASE WHEN edq_iGeneralStatus = 3 THEN 1 ELSE 0 END),
                SUM(CASE WHEN edq_iAttempts >= 3 THEN 1 ELSE 0 END))
        FROM [dbo].[EventoDeleteQueue];
        
        RETURN 0;
        
    END TRY
    BEGIN CATCH
        -- Registrar error fatal
        INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cStatus, edc_cMessage)
        VALUES ('PROCESS_FATAL_ERROR', 'ERROR', LEFT(ERROR_MESSAGE(), 2000));
        
        THROW;
    END CATCH
END