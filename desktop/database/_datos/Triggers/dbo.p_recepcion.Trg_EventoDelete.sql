CREATE OR ALTER TRIGGER [dbo].[Trg_EventoDelete] ON [dbo].[p_recepcion] AFTER DELETE AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @RowCount INT = @@ROWCOUNT;
    DECLARE @StartTime DATETIME2 = SYSDATETIME();
    DECLARE @Message NVARCHAR(MAX);
    
    -- Early exit si no hay registros eliminados
    IF @RowCount = 0 RETURN;
    
    SET @Message = FORMATMESSAGE('Trg_EventoDelete START - Records: %d', @RowCount);
    RAISERROR(@Message, 10, 1) WITH NOWAIT;
    
    BEGIN TRY
        IF @RowCount = 1
        BEGIN
            DELETE EP 
            FROM [dbo].[EventosPendientes] EP
            INNER JOIN deleted d ON EP.rec_iid = d.rec_iid;
        END
        ELSE
        BEGIN
            INSERT INTO _RegistrosAEliminar ([rae_cTabla], [rae_iID]) 
            SELECT 'EventosPendientes', rec_iid FROM deleted;
        END

        INSERT INTO _RegistrosAEliminar ([rae_cTabla], [rae_iID]) 
        SELECT tabla, rec_iid
        FROM deleted
        CROSS JOIN (VALUES 
            ('p_recepcion_proceso'),
            ('p_recepcion_notas'), 
            ('p_RXLog'),
            ('p_RXImg')
        ) AS tablas(tabla);


        -- Crear tabla temporal con períodos únicos
        CREATE TABLE #PeriodosDeleted ( cCierre CHAR(6), rec_iid INT,
            INDEX IX_TempPeriodosDeleted_Cierre_RecID (cCierre, rec_iid)
        );
        
        -- Insertar TODOS los registros con su período
        INSERT INTO #PeriodosDeleted (cCierre, rec_iid)
        SELECT LEFT(CONVERT(VARCHAR(8), rec_tfechahora, 112), 6) AS cCierre,  rec_iid
			FROM deleted 
        WHERE rec_iid > 0;

        -- CREAR TODAS LAS TABLAS NECESARIAS DE UNA VEZ
        DECLARE @cSQL NVARCHAR(MAX) = '';
        DECLARE @PeriodosUnicos TABLE (cCierre CHAR(6));
        
        -- Obtener períodos únicos
        INSERT INTO @PeriodosUnicos (cCierre)
	        SELECT DISTINCT cCierre FROM #PeriodosDeleted;

        -- Crear tablas p_RXtraInfo para todos los períodos
        DECLARE @nError INT;
        DECLARE @cCierre CHAR(6);
        
        DECLARE crear_tablas CURSOR LOCAL FAST_FORWARD FOR
        SELECT cCierre FROM @PeriodosUnicos;
        
        OPEN crear_tablas;
        FETCH NEXT FROM crear_tablas INTO @cCierre;
        
        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Crear p_RXtraInfo si no existe
            IF OBJECT_ID('p_RXtraInfo' + @cCierre) IS NULL
                EXEC [SGSP_CreoRXTIDepurado] @cCierre;
            
            -- Crear EventosTimeLine si no existe  
            IF OBJECT_ID('EventosTimeLine' + @cCierre) IS NULL
                EXEC [SGSP_CreoETDepurado] @cCierre;
                
            FETCH NEXT FROM crear_tablas INTO @cCierre;
        END;
        
        CLOSE crear_tablas;
        DEALLOCATE crear_tablas;

       
        -- Construir SQL dinámico para TODOS los períodos
        SELECT @cSQL = STRING_AGG(
            'INSERT INTO [dbo].[p_RXtraInfo' + cCierre + '] 
             SELECT r.[rxt_iRecId],r.[rxt_nSPIP],r.[rxt_nSPSMS],r.[rxt_cEvento],r.[rxt_iSecuencia],
                    r.[rxt_cGeoFenceName],r.[rxt_cRoute],r.[rxt_iRouteID],r.[rxt_nVCIP],r.[rxt_nVCSMS],
                    r.[rxt_cData],r.[rxt_dFechaHoraProcesaEvento],r.[rxt_iProceso],r.[rxt_iConexion] 
             FROM [dbo].[p_RXtraInfo] r
             INNER JOIN #PeriodosDeleted p ON r.[rxt_iRecId] = p.rec_iid AND p.cCierre = ''' + cCierre + ''';',
            CHAR(13) + CHAR(10)
        )
        FROM @PeriodosUnicos;


        IF @cSQL IS NOT NULL
		Begin
			SET @Message = FORMATMESSAGE('Trg_EventoDelete - @cSQL: %s', @cSQL);
			RAISERROR(@Message, 10, 1) WITH NOWAIT;

            EXEC sp_executesql @cSQL;
		End

        -- Construir MERGE para TODOS los períodos
        SELECT @cSQL = STRING_AGG(
            'WITH SourceData AS (
                SELECT e.[etl_idKey],e.[etl_iRecID],e.[etl_iCuenta],e.[etl_tFechaHora],e.[etl_cAccion],
                       e.[etl_cObservacion],e.[etl_cOwner],e.[etl_iOperador],e.[etl_iAccionCode]
                FROM [dbo].[EventosTimeLine] e
                INNER JOIN #PeriodosDeleted p ON e.[etl_iRecID] = p.rec_iid AND p.cCierre = ''' + cCierre + '''
            )
            MERGE [dbo].[EventosTimeLine' + cCierre + '] AS TGT
            USING SourceData AS SRC 
            ON TGT.etl_iRecID = SRC.etl_iRecID AND TGT.etl_tFechaHora = SRC.etl_tFechaHora
            WHEN NOT MATCHED THEN 
                INSERT ([etl_idKey],[etl_iRecID],[etl_iCuenta],[etl_tFechaHora],[etl_cAccion],
                        [etl_cObservacion],[etl_cOwner],[etl_iOperador],[etl_iAccionCode])
                VALUES (SRC.[etl_idKey],SRC.[etl_iRecID],SRC.[etl_iCuenta],SRC.[etl_tFechaHora],
                        SRC.[etl_cAccion],SRC.[etl_cObservacion],SRC.[etl_cOwner],SRC.[etl_iOperador],
                        SRC.[etl_iAccionCode]);',
            CHAR(13) + CHAR(10)
        )
        FROM @PeriodosUnicos;

        -- Ejecutar TODOS los MERGEs de una vez
        IF @cSQL IS NOT NULL
		Begin
			SET @Message = FORMATMESSAGE('Trg_EventoDelete - @cSQL: %d', @cSQL);
			RAISERROR(@Message, 10, 1) WITH NOWAIT;

            EXEC sp_executesql @cSQL;
		End

        -- Eliminar TODOS los registros procesados de EventosTimeLine
        DELETE e
        FROM [dbo].[EventosTimeLine] e
        INNER JOIN #PeriodosDeleted p ON e.[etl_iRecID] = p.rec_iid;

        DROP TABLE #PeriodosDeleted;

        -- Log final
        DECLARE @EndTime DATETIME2 = SYSDATETIME();
        DECLARE @Duration INT = DATEDIFF(MILLISECOND, @StartTime, @EndTime);
        
        SET @Message = FORMATMESSAGE('Trg_EventoDelete COMPLETED - Duration: %d ms', @Duration);
        RAISERROR(@Message, 10, 1) WITH NOWAIT;

    END TRY
    BEGIN CATCH        
        IF OBJECT_ID('tempdb..#PeriodosDeleted') IS NOT NULL
            DROP TABLE #PeriodosDeleted;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;