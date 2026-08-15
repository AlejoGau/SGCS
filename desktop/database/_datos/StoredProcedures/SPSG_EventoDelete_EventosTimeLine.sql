-- =============================================
-- SP: SPSG_EventoDelete_EventosTimeLine
-- Descripción: Procesa MERGE y DELETE de EventosTimeLine
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SPSG_EventoDelete_EventosTimeLine]
    @Periodo CHAR(6),      
    @Operacion CHAR(1),     -- 'M' = Merge, 'D' = Delete
    @BatchSize INT = 100
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Validación de parámetros obligatorios
    IF @Periodo IS NULL OR LEN(@Periodo) <> 6
    BEGIN
        RAISERROR('El parámetro @Periodo es obligatorio y debe tener formato YYYYMM', 16, 1);
        RETURN -1;
    END
    
    IF @Operacion NOT IN ('M', 'D')
    BEGIN
        RAISERROR('El parámetro @Operacion debe ser M(erge) o D(elete)', 16, 1);
        RETURN -1;
    END
    
    DECLARE @StartTime DATETIME2(3) = SYSDATETIME();
    DECLARE @RowsAffected INT = 0;
    DECLARE @SQL NVARCHAR(MAX);
    DECLARE @TableName VARCHAR(128) = 'EventosTimeLine' + @Periodo;
    DECLARE @nError INT = 0;
    
    BEGIN TRY
        -- Crear tabla temporal para los IDs a procesar
        IF OBJECT_ID('tempdb..#RecordsToProcess') IS NOT NULL
            DROP TABLE #RecordsToProcess

        CREATE TABLE #RecordsToProcess (rec_iid INT PRIMARY KEY,edq_id BIGINT);

        IF @Operacion = 'M'		-- MERGE
        BEGIN
            -- Crear tabla histórica si no existe
            IF OBJECT_ID(@TableName) IS NULL
            BEGIN
                EXEC [SGSP_CreoETDepurado] @Periodo, @nError OUTPUT;
                
                IF @nError = 0
                BEGIN
                    INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cPeriodo, edc_cTableName, edc_cStatus, edc_cMessage)
                    VALUES ('CREAR_TABLA', @Periodo, @TableName, 'COMPLETADO', 'Tabla ' + @TableName + ' creada exitosamente');
                END
                ELSE
                BEGIN
                    INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cPeriodo, edc_cTableName, edc_cStatus, edc_cMessage)
                    VALUES ('CREAR_TABLA', @Periodo, @TableName, 'ERROR', 'Error al crear tabla ' + @TableName + '. Código error: ' + CAST(@nError AS VARCHAR(10)));
                    
                    RAISERROR('No se pudo crear la tabla histórica %s', 16, 1, @TableName);
                    RETURN -1;
                END
            END
            
            -- Seleccionar batch de registros pendientes de MERGE
            INSERT INTO #RecordsToProcess (rec_iid, edq_id)
            SELECT TOP (@BatchSize) 
                edq_idRec,
                edq_id
            FROM [dbo].[EventoDeleteQueue] WITH (ROWLOCK, READPAST)
            WHERE edq_iTimelineStatus = 0  -- Pendiente
              AND edq_cPeriodo = @Periodo
              AND edq_iAttempts < 3
            ORDER BY edq_id;
            
            SET @RowsAffected = @@ROWCOUNT;
            
            IF @RowsAffected = 0
            BEGIN
                RAISERROR('No hay registros pendientes de MERGE para EventosTimeLine en período : %s', 10, 1, @Periodo);
                RETURN 0;
            END
            
            -- Marcar registros como "en proceso"
            UPDATE q
            SET edq_tDateLastExecute = SYSDATETIME(),
                edq_iAttempts = edq_iAttempts + 1
            FROM [dbo].[EventoDeleteQueue] q
            INNER JOIN #RecordsToProcess r ON q.edq_id = r.edq_id;
            
            -- Construir y ejecutar MERGE dinámico
            SET @SQL = N'
            WITH SourceData AS (
                SELECT DISTINCT e.*
                FROM [dbo].[EventosTimeLine] e
                INNER JOIN #RecordsToProcess t ON e.etl_iRecID = t.rec_iid
            )
            MERGE [dbo].[' + @TableName + '] AS TGT
            USING SourceData AS SRC 
            ON TGT.etl_iRecID = SRC.etl_iRecID 
               AND TGT.etl_tFechaHora = SRC.etl_tFechaHora
            WHEN NOT MATCHED THEN 
                INSERT ([etl_idKey],[etl_iRecID],[etl_iCuenta],[etl_tFechaHora],
                        [etl_cAccion],[etl_cObservacion],[etl_cOwner],
                        [etl_iOperador],[etl_iAccionCode])
                VALUES (SRC.[etl_idKey],SRC.[etl_iRecID],SRC.[etl_iCuenta],
                        SRC.[etl_tFechaHora],SRC.[etl_cAccion],SRC.[etl_cObservacion],
                        SRC.[etl_cOwner],SRC.[etl_iOperador],SRC.[etl_iAccionCode]);';
            
            EXEC sp_executesql @SQL;
            SET @RowsAffected = @@ROWCOUNT;
            
            -- Solo marcar como Merged si realmente se insertó algo
            IF @RowsAffected > 0
            BEGIN
                -- Se insertaron registros, marcar como Merged
                UPDATE q
                SET edq_iTimelineStatus = 1,  -- Merged
                    edq_cLastError = NULL,
                    edq_iGeneralStatus = 
                        CASE 
                            WHEN edq_iRxtrainfoStatus >= 2 THEN 1  -- RXtra completo, Timeline parcial = Parcial
                            ELSE 1  -- Cualquier progreso = Parcial
                        END
                FROM [dbo].[EventoDeleteQueue] q
                INNER JOIN #RecordsToProcess r ON q.edq_id = r.edq_id;
            END
            ELSE
            BEGIN
                -- No se insertó nada, verificar si ya existe en histórica
                DECLARE @SQL2 NVARCHAR(MAX);
                DECLARE @ExistenEnHistorica INT;
                
                SET @SQL2 = N'SELECT @count = COUNT(DISTINCT etl_iRecID) 
                             FROM [dbo].[' + @TableName + '] h 
                             INNER JOIN #RecordsToProcess t ON h.etl_iRecID = t.rec_iid';
                
                EXEC sp_executesql @SQL2, N'@count INT OUTPUT', @count = @ExistenEnHistorica OUTPUT;
                
                IF @ExistenEnHistorica > 0
                BEGIN
                    -- Ya existen en histórica, marcar directamente como procesados
                    UPDATE q
                    SET edq_iTimelineStatus = 2,  -- Deleted (ya estaba en histórica)
                        edq_cLastError = 'Registro ya existia en tabla historica - marcado como completado',
                        edq_iGeneralStatus = 
                            CASE 
                                WHEN edq_iRxtrainfoStatus = 2 THEN 2  -- Ambos completos
                                ELSE 1  -- Parcial
                            END
                    FROM [dbo].[EventoDeleteQueue] q
                    INNER JOIN #RecordsToProcess r ON q.edq_id = r.edq_id;
                    
                    -- Registrar este caso especial
                    INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cPeriodo, edc_cTableName, edc_cStatus, edc_cMessage)
                    VALUES ('MERGE_TIMELINE_YA_EXISTE', @Periodo, @TableName, 'ADVERTENCIA', 
                            'Registros ya existian en historica. Marcados como completados: ' + CAST(@ExistenEnHistorica AS VARCHAR(10)));
                END
            END
            
            -- Registrar en control
            INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cPeriodo, edc_cTableName, edc_iAffectedRecords, edc_tDateStart, edc_tDateEnd, edc_iDurationMS, edc_cStatus)
            VALUES ('MERGE_TIMELINE', @Periodo, @TableName, @RowsAffected, @StartTime, SYSDATETIME(), DATEDIFF(MILLISECOND, @StartTime, SYSDATETIME()), 'COMPLETADO');
        END
        ELSE IF @Operacion = 'D'		-- DELETE
        BEGIN
            -- Seleccionar batch de registros con MERGE exitoso pendientes de DELETE
            INSERT INTO #RecordsToProcess (rec_iid, edq_id)
            SELECT TOP (@BatchSize) 
                edq_idRec,
                edq_id
            FROM [dbo].[EventoDeleteQueue] WITH (ROWLOCK, READPAST)
            WHERE edq_iTimelineStatus = 1  -- Merged exitosamente
              AND edq_cPeriodo = @Periodo
            ORDER BY edq_id;
            
            SET @RowsAffected = @@ROWCOUNT;
            
            IF @RowsAffected = 0
            BEGIN
                RAISERROR('No hay registros pendientes de DELETE para EventosTimeLine en período : %s', 10, 1, @Periodo);
                RETURN 0;
            END
            
            -- Eliminar de EventosTimeLine original
            DELETE e
            FROM [dbo].[EventosTimeLine] e
            INNER JOIN #RecordsToProcess t ON e.etl_iRecID = t.rec_iid;
            
            DECLARE @TotalDeleted INT = @@ROWCOUNT;
            
            -- Actualizar estado a Deleted Y estado general
            UPDATE q
            SET edq_iTimelineStatus = 2,  -- Deleted
                edq_tDateLastExecute = SYSDATETIME(),
                edq_iGeneralStatus = 
                    CASE 
                        WHEN edq_iRxtrainfoStatus = 2 THEN 2  -- Ambos completos = Completado
                        ELSE 1  -- Solo Timeline completo = Parcial
                    END
            FROM [dbo].[EventoDeleteQueue] q
            INNER JOIN #RecordsToProcess r ON q.edq_id = r.edq_id;
            
            -- Registrar en control
            INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cPeriodo, edc_cTableName, edc_iAffectedRecords, edc_tDateStart, edc_tDateEnd, edc_iDurationMS, edc_cStatus)
            VALUES ('DELETE_TIMELINE', @Periodo, 'EventosTimeLine', @TotalDeleted, @StartTime, SYSDATETIME(), DATEDIFF(MILLISECOND, @StartTime, SYSDATETIME()), 'COMPLETADO');
            
            -- Si no se eliminaron todos los esperados, registrar advertencia
            IF @TotalDeleted < @RowsAffected
            BEGIN
                INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cPeriodo, edc_cStatus, edc_cMessage)
                VALUES ('DELETE_TIMELINE_WARNING', @Periodo, 'ADVERTENCIA', 'Se esperaba eliminar ' + CAST(@RowsAffected AS VARCHAR(10)) + ' registros pero solo se eliminaron ' + CAST(@TotalDeleted AS VARCHAR(10)));
            END
            
            SET @RowsAffected = @TotalDeleted;
        END
        
        -- Limpiar tabla temporal
        DROP TABLE #RecordsToProcess;
        
        RETURN @RowsAffected;
        
    END TRY
    BEGIN CATCH
        -- Marcar registros como error
        IF OBJECT_ID('tempdb..#RecordsToProcess') IS NOT NULL
        BEGIN
            IF @Operacion = 'M'
            BEGIN
                UPDATE q
                SET edq_iTimelineStatus = 3,  -- Error
                    edq_iGeneralStatus = 3,
                    edq_cLastError = LEFT(ERROR_MESSAGE(), 500)
                FROM [dbo].[EventoDeleteQueue] q
                INNER JOIN #RecordsToProcess r ON q.edq_id = r.edq_id;
            END
            ELSE IF @Operacion = 'D'
            BEGIN
                UPDATE q
                SET edq_iTimelineStatus = 1,  -- Volver a Merged para reintento
                    edq_cLastError = LEFT('Error en DELETE: ' + ERROR_MESSAGE(), 500)
                FROM [dbo].[EventoDeleteQueue] q
                INNER JOIN #RecordsToProcess r ON q.edq_id = r.edq_id;
            END
            
            DROP TABLE #RecordsToProcess;
        END
        
        -- Registrar error
        INSERT INTO [dbo].[EventoDeleteControl] (edc_cProcessType, edc_cPeriodo, edc_cStatus, edc_cMessage)
        VALUES (CASE WHEN @Operacion = 'M' THEN 'MERGE_TIMELINE_ERROR' ELSE 'DELETE_TIMELINE_ERROR' END, @Periodo, 'ERROR', LEFT(ERROR_MESSAGE(), 2000));
        
        THROW;
    END CATCH
END