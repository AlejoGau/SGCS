CREATE OR ALTER PROCEDURE [dbo].[SofIA_PacketProcesor]
    @rec_iid INT,
    @codaccion NVARCHAR(50),
    @cue_iid NVARCHAR(100) = NULL,
    @estado NVARCHAR(50),
    @detalle NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    PRINT CONCAT('[SofIA_PacketProcesor] START rec=', @rec_iid, ', action=', @codaccion, ', estado=', @estado);

    DECLARE @accionId INT;
    DECLARE @cueInt INT = TRY_CAST(@cue_iid AS INT);
    DECLARE @cData NVARCHAR(MAX) = @detalle;
    DECLARE @cZona NVARCHAR(50) = '';
    DECLARE @postImages NVARCHAR(500) = '';
    DECLARE @detalleIsJson BIT = 0;
    DECLARE @cameraId NVARCHAR(100) = NULL;
    DECLARE @cameraIdInt INT = NULL;
    DECLARE @cameraName NVARCHAR(200) = NULL;
    DECLARE @cameraSource NVARCHAR(100) = NULL;
    DECLARE @controlPointId INT = NULL;
    DECLARE @controlPointReference NVARCHAR(200) = NULL;
    DECLARE @contextLabel NVARCHAR(200) = NULL;

    IF @detalle IS NOT NULL AND ISJSON(@detalle) = 1
    BEGIN
        SET @detalleIsJson = 1;

        SET @cameraId = JSON_VALUE(@detalle, '$.camara.id');
        SET @cameraIdInt = TRY_CAST(JSON_VALUE(@detalle, '$.camara.id') AS INT);
        SET @cameraName = JSON_VALUE(@detalle, '$.camara.nombre');
        SET @cameraSource = JSON_VALUE(@detalle, '$.camara.source');
        SET @controlPointId = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.control_point.id') AS INT);
        SET @controlPointReference = JSON_VALUE(@detalle, '$.metadata.control_point.reference');
        IF @cameraSource = 'cuentas_video_links'
           AND @cameraIdInt IS NOT NULL
           AND @cueInt IS NOT NULL
        BEGIN
            SELECT TOP 1 @cZona = cvl_czona
            FROM _Datos..m_cuentas_video_links WITH (NOLOCK)
            WHERE cvl_idkey = @cameraIdInt
              AND cvl_iidCuenta = @cueInt;
        END


        DECLARE @outputImage NVARCHAR(512) = JSON_VALUE(@detalle, '$.detector_result.output_image');
        DECLARE @outputVideo NVARCHAR(512) = JSON_VALUE(@detalle, '$.detector_result.output_video');

        IF @outputImage IS NOT NULL AND LTRIM(RTRIM(@outputImage)) <> ''
            SET @postImages = LTRIM(RTRIM(@outputImage));

        IF @outputVideo IS NOT NULL AND LTRIM(RTRIM(@outputVideo)) <> ''
            SET @postImages = CASE WHEN @postImages = '' THEN LTRIM(RTRIM(@outputVideo)) ELSE @postImages + ',' + LTRIM(RTRIM(@outputVideo)) END;
    END

    IF (@controlPointId IS NOT NULL OR NULLIF(@controlPointReference, '') IS NOT NULL)
    BEGIN
        SET @contextLabel = CONCAT('Punto ', ISNULL(CAST(@controlPointId AS NVARCHAR(20)), ''), CASE WHEN NULLIF(@controlPointReference, '') IS NOT NULL THEN CONCAT(' - ', @controlPointReference) ELSE '' END);
    END

    IF (@contextLabel IS NULL OR LTRIM(RTRIM(@contextLabel)) = '')
    BEGIN
        SET @contextLabel = COALESCE(NULLIF(@cameraName, ''), NULLIF(@cameraId, ''), NULLIF(@cameraSource, ''), NULLIF(@cZona, ''), '');
    END

    PRINT CONCAT('[SofIA_PacketProcesor] JSON=', @detalleIsJson, ', cue_iid=', ISNULL(@cue_iid, 'NULL'), ', zona=', ISNULL(@cZona, ''), ', control_point=', ISNULL(@controlPointReference, ''));

    INSERT INTO _datos..p_sofia_accion (sof_reciid, sof_ccodaccion, sof_cueiid, sof_cestado, sof_cdetalle)
    VALUES (@rec_iid, @codaccion, @cue_iid, @estado, @detalle);

    SET @accionId = SCOPE_IDENTITY();
    PRINT CONCAT('[SofIA_PacketProcesor] Accion registrada sof_iidkey=', @accionId);

    -- Marcar evento como atendido para que deje de estar pendiente (_SR incluido)
    IF @codaccion = 'take_event' AND @estado = 'ok'
    BEGIN
        UPDATE _Datos..p_recepcion
        SET rec_nEstado = 1 -- atendido / tomado
        WHERE rec_iid = @rec_iid AND ISNULL(rec_nEstado, 0) = 0;

        PRINT '[SofIA_PacketProcesor] Evento marcado como atendido (rec_nEstado=1)';
    END

    DECLARE @alarms TABLE (id INT IDENTITY(1,1) PRIMARY KEY, alarm NVARCHAR(10), observacion NVARCHAR(500));
    DECLARE @finalObservation NVARCHAR(500);
    DECLARE @hasGeneratedAlarm BIT = 0;

    IF @codaccion = 'open_camera' AND @estado = 'error'
    BEGIN
        SET @finalObservation = 'Error al abrir camara (open_camera)';
        IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
            SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

        INSERT INTO @alarms (alarm, observacion) VALUES ('_IH', @finalObservation);
        PRINT '[SofIA_PacketProcesor] open_camera -> error registrado';
        GOTO PROCESS_ALARMS;
    END

    IF @codaccion = 'detection_result'
    BEGIN
        IF @detalleIsJson = 0
        BEGIN
            PRINT '[SofIA_PacketProcesor] detalle no es JSON valido, se conserva flujo legacy.';

            IF @estado = 'error'
            BEGIN
                IF @contextLabel IS NULL OR LTRIM(RTRIM(@contextLabel)) = ''
                    SET @contextLabel = CONCAT('rec ', @rec_iid);

                DECLARE @errorText NVARCHAR(200) = LEFT(ISNULL(@detalle, ''), 200);
                SET @finalObservation = 'Error en deteccion';
                IF @errorText <> ''
                    SET @finalObservation = CONCAT(@finalObservation, ' (', @errorText, ')');

                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_IH', @finalObservation);
            END

            GOTO PROCESS_ALARMS;
        END
        ELSE
        BEGIN
            DECLARE @detectorError NVARCHAR(200) = JSON_VALUE(@detalle, '$.detector_result.error');
            DECLARE @detectorDetail NVARCHAR(400) = JSON_VALUE(@detalle, '$.detector_result.detail');
            IF @detectorError IS NOT NULL OR @estado = 'error'
            BEGIN
                SET @finalObservation = CONCAT('Error en deteccion: ', ISNULL(@detectorError, @estado));
                IF @detectorDetail IS NOT NULL AND LTRIM(RTRIM(@detectorDetail)) <> ''
                    SET @finalObservation = CONCAT(@finalObservation, ' (', @detectorDetail, ')');

                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_IH', @finalObservation);
                PRINT '[SofIA_PacketProcesor] detection_result -> error reportado por runner';
                GOTO PROCESS_ALARMS;
            END

            DECLARE @connectionStatus NVARCHAR(40) = JSON_VALUE(@detalle, '$.metadata.integrity.connection.status');
            IF @connectionStatus IN ('fail', 'error', 'timeout')
            BEGIN
                SET @finalObservation = 'Verificacion de conexion fallida';
                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_IH', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Integridad: conexion fallida';
            END

            DECLARE @coverStatus NVARCHAR(40) = JSON_VALUE(@detalle, '$.metadata.integrity.cover.status');
            DECLARE @coverMetric FLOAT = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.integrity.cover.metric') AS FLOAT);
            DECLARE @coverThreshold FLOAT = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.integrity.cover.threshold') AS FLOAT);
            DECLARE @coverEnabledRaw NVARCHAR(20) = JSON_VALUE(@detalle, '$.metadata.integrity.cover.enabled');
            DECLARE @coverEnabled BIT = CASE
                WHEN @coverEnabledRaw IS NULL THEN 1
                WHEN LOWER(@coverEnabledRaw) IN ('1', 'true') THEN 1
                ELSE 0
            END;
            DECLARE @focusStatus NVARCHAR(40) = JSON_VALUE(@detalle, '$.metadata.integrity.outOfFocus.status');
            DECLARE @focusMetric FLOAT = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.integrity.outOfFocus.metric') AS FLOAT);
            DECLARE @focusThreshold FLOAT = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.integrity.outOfFocus.threshold') AS FLOAT);
            DECLARE @differenceStatus NVARCHAR(40) = JSON_VALUE(@detalle, '$.metadata.integrity.difference.status');
            DECLARE @differenceMetric FLOAT = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.integrity.difference.metric') AS FLOAT);
            DECLARE @differenceThreshold FLOAT = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.integrity.difference.threshold') AS FLOAT);

            DECLARE @shouldRaiseCover BIT = 0;
            DECLARE @shouldRaiseFocus BIT = 0;
            DECLARE @shouldRaiseDifference BIT = 0;
            DECLARE @coverReasons NVARCHAR(300) = '';

            IF @coverEnabled = 1
            BEGIN
                IF @coverStatus IN ('fail', 'blocked', 'critical')
                BEGIN
                    SET @shouldRaiseCover = 1;
                    SET @coverReasons = CONCAT(@coverReasons, CASE WHEN @coverReasons = '' THEN '' ELSE '; ' END, 'coverStatus=', @coverStatus);
                END

                IF @coverMetric IS NOT NULL
                BEGIN
                    DECLARE @coverLimit FLOAT = CASE WHEN @coverThreshold IS NOT NULL THEN @coverThreshold ELSE 0.6 END;
                    IF @coverMetric >= @coverLimit
                    BEGIN
                        SET @shouldRaiseCover = 1;
                        SET @coverReasons = CONCAT(@coverReasons, CASE WHEN @coverReasons = '' THEN '' ELSE '; ' END, 'coverMetric=', CONVERT(NVARCHAR(32), CAST(@coverMetric AS DECIMAL(10,3))));
                    END
                END
            END

            IF @focusStatus IN ('fail', 'critical')
                SET @shouldRaiseFocus = 1;

            IF @focusStatus IS NULL AND @focusMetric IS NOT NULL AND @focusThreshold IS NOT NULL AND @focusMetric <= @focusThreshold
                SET @shouldRaiseFocus = 1;

            IF @differenceStatus IN ('fail', 'critical')
                SET @shouldRaiseDifference = 1;

            IF @differenceMetric IS NOT NULL AND @differenceThreshold IS NOT NULL AND @differenceMetric >= @differenceThreshold
                SET @shouldRaiseDifference = 1;

            IF @shouldRaiseCover = 1
            BEGIN
                SET @finalObservation = 'Camara obstruida o cubierta';
                IF @coverReasons <> ''
                    SET @finalObservation = CONCAT(@finalObservation, ' (', @coverReasons, ')');

                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_II', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Integridad: obstruccion o cobertura';
            END

            IF @shouldRaiseFocus = 1
            BEGIN
                SET @finalObservation = 'Camara fuera de foco';
                IF @focusMetric IS NOT NULL
                    SET @finalObservation = CONCAT(@finalObservation, ' metric=', CONVERT(NVARCHAR(32), CAST(@focusMetric AS DECIMAL(10,3))));
                IF @focusThreshold IS NOT NULL
                    SET @finalObservation = CONCAT(@finalObservation, ' threshold=', CONVERT(NVARCHAR(32), CAST(@focusThreshold AS DECIMAL(10,3))));

                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_FF', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Integridad: fuera de foco';
            END

            IF @shouldRaiseDifference = 1
            BEGIN
                SET @finalObservation = 'Cambio de escena detectado';
                IF @differenceMetric IS NOT NULL
                    SET @finalObservation = CONCAT(@finalObservation, ' metric=', CONVERT(NVARCHAR(32), CAST(@differenceMetric AS DECIMAL(10,3))));
                IF @differenceThreshold IS NOT NULL
                    SET @finalObservation = CONCAT(@finalObservation, ' threshold=', CONVERT(NVARCHAR(32), CAST(@differenceThreshold AS DECIMAL(10,3))));

                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_RF', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Integridad: diferencia contra referencia';
            END

            DECLARE @personCount INT = TRY_CAST(JSON_VALUE(@detalle, '$.detector_result.classes_detected.person.max_count') AS INT);
            DECLARE @occupancyEnabledRaw NVARCHAR(20) = JSON_VALUE(@detalle, '$.metadata.analytics.people.occupancyEnabled');
            DECLARE @occupancyEnabled BIT = CASE WHEN LOWER(ISNULL(@occupancyEnabledRaw, '')) IN ('1', 'true') THEN 1 ELSE 0 END;
            DECLARE @occupancyMax INT = TRY_CAST(JSON_VALUE(@detalle, '$.metadata.analytics.people.maxOccupancy') AS INT);
            DECLARE @hasFire BIT = 0;
            DECLARE @hasSmoke BIT = 0;
            DECLARE @hasPerson BIT = 0;
            DECLARE @hasAnimal BIT = 0;
            DECLARE @hasVehicle BIT = 0;

            SELECT 
                @hasFire = CASE WHEN [key] = 'Fire' THEN 1 ELSE @hasFire END,
                @hasSmoke = CASE WHEN [key] = 'Smoke' THEN 1 ELSE @hasSmoke END,
                @hasPerson = CASE WHEN [key] = 'person' THEN 1 ELSE @hasPerson END,
                @hasAnimal = CASE WHEN [key] IN ('bird','cat','dog','horse','sheep','cow','elephant','bear','zebra','giraffe') THEN 1 ELSE @hasAnimal END,
                @hasVehicle = CASE WHEN [key] IN ('bicycle','car','motorcycle','airplane','bus','train','truck','boat') THEN 1 ELSE @hasVehicle END
            FROM OPENJSON(@detalle, '$.detector_result.classes_detected');

            IF @hasFire = 1 OR @hasSmoke = 1
            BEGIN
                SET @finalObservation = 'Deteccion confirmada por SofIA: fuego o humo';
                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_IP', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Detecciones -> alarma _IP';
            END

            IF @hasPerson = 1
            BEGIN
                SET @finalObservation = 'Deteccion confirmada por SofIA: personas';
                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_ID', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Detecciones -> alarma _ID';
            END

            IF @hasAnimal = 1
            BEGIN
                SET @finalObservation = 'Deteccion confirmada por SofIA: animales';
                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_IE', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Detecciones -> alarma _IE';
            END

            IF @hasVehicle = 1
            BEGIN
                SET @finalObservation = 'Deteccion confirmada por SofIA: vehiculos';
                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_EF', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Detecciones -> alarma _EF';
            END

            IF @personCount IS NOT NULL AND @personCount > 0
            BEGIN
                DECLARE @aforoThreshold INT;
                IF @occupancyEnabled = 1 AND @occupancyMax IS NOT NULL AND @occupancyMax > 0
                    SET @aforoThreshold = @occupancyMax;
                ELSE
                    SET @aforoThreshold = 1;

                IF @personCount > @aforoThreshold
                BEGIN
                    DECLARE @aforoExtraInfo NVARCHAR(64) = '';
                    IF @occupancyEnabled = 1 AND @occupancyMax IS NOT NULL AND @occupancyMax > 0
                        SET @aforoExtraInfo = CONCAT(' (maximo ', @occupancyMax, ')');

                    SET @finalObservation = CONCAT('Deteccion de aforo: ', @personCount, ' personas', @aforoExtraInfo);
                IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
                    SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

                INSERT INTO @alarms (alarm, observacion) VALUES ('_IL', @finalObservation);
                PRINT '[SofIA_PacketProcesor] Detecciones -> alarma aforo (_IL)';
                END
            END
        END
    END

    IF @codaccion = 'event_complete'
    BEGIN
        DECLARE @hasDetections BIT = CASE WHEN EXISTS (
            SELECT 1
            FROM _datos..p_sofia_accion
            WHERE sof_reciid = @rec_iid AND sof_ccodaccion = 'alarm_generated'
        ) THEN 1 ELSE 0 END;

        DECLARE @eventAlarm NVARCHAR(10) = CASE WHEN @hasDetections = 1 THEN '_IB' ELSE '_IA' END;
        SET @finalObservation = CASE WHEN @hasDetections = 1 THEN 'Ronda SofIA completada con novedades' ELSE 'Ronda SofIA completada sin novedades' END;

        IF @contextLabel IS NOT NULL AND LTRIM(RTRIM(@contextLabel)) <> ''
            SET @finalObservation = CONCAT(@contextLabel, ' - ', @finalObservation);

        INSERT INTO @alarms (alarm, observacion) VALUES (@eventAlarm, @finalObservation);
        PRINT CONCAT('[SofIA_PacketProcesor] event_complete -> alarma ', @eventAlarm);

        -- Marcar evento como procesado (estado 3) al completar la ronda
        DECLARE @tFechaHora DATETIME = SYSDATETIME();
        DECLARE @cObs NVARCHAR(500) = '';

        UPDATE _Datos..p_recepcion
        SET rec_nEstado = 3,
            rec_tFechaProceso = @tFechaHora,
            rec_cObservaciones = @cObs
        WHERE rec_iid = @rec_iid;

        PRINT '[SofIA_PacketProcesor] Evento marcado como procesado (rec_nEstado=3)';
    END

PROCESS_ALARMS:
    DECLARE @alarmsCount INT = (SELECT COUNT(*) FROM @alarms);
    PRINT CONCAT('[SofIA_PacketProcesor] Total alarmas a generar: ', @alarmsCount);

    IF @alarmsCount > 0 AND @codaccion <> 'event_complete'
    BEGIN
        SET @hasGeneratedAlarm = 1;

        IF NOT EXISTS (
            SELECT 1
            FROM _datos..p_sofia_accion
            WHERE sof_reciid = @rec_iid AND sof_ccodaccion = 'alarm_generated'
        )
        BEGIN
            INSERT INTO _datos..p_sofia_accion (sof_reciid, sof_ccodaccion, sof_cueiid, sof_cestado, sof_cdetalle)
            VALUES (@rec_iid, 'alarm_generated', @cue_iid, '1', CONCAT('source=', @codaccion));
        END
    END

    DECLARE @postImagesParam NVARCHAR(500) = NULL;
    IF @postImages IS NOT NULL AND LTRIM(RTRIM(@postImages)) <> ''
        SET @postImagesParam = LEFT(@postImages, 500);

    IF @alarmsCount > 0
    BEGIN
        IF @cueInt IS NULL
        BEGIN
            PRINT '[SofIA_PacketProcesor] WARN: cue_iid no convertible a INT, se omiten alarmas secundarias.';
        END
        ELSE
        BEGIN
            DECLARE @loop INT = 1;
            DECLARE @maxLoop INT = (SELECT MAX(id) FROM @alarms);
            DECLARE @alarmCode NVARCHAR(10);
            DECLARE @alarmObs NVARCHAR(500);

            DECLARE @zonaTrim NVARCHAR(50);
            SET @zonaTrim = LEFT(ISNULL(@cZona, ''), 50);
            WHILE @loop <= ISNULL(@maxLoop, 0)
            BEGIN
                SELECT @alarmCode = alarm, @alarmObs = observacion FROM @alarms WHERE id = @loop;

                IF @alarmCode IS NOT NULL
                BEGIN
                    SET @alarmObs = LEFT(ISNULL(@alarmObs, ''), 500);
                    PRINT CONCAT('[SofIA_PacketProcesor] Ejecutando SofIA_ProcesarEventoCompleto -> ', @alarmCode, ' | ', @alarmObs);

                    EXEC dbo.SofIA_ProcesarEventoCompleto
                        @idCta          = @cueInt,
                        @cAlarma        = @alarmCode,
                        @cObservaciones = @alarmObs,
                        @cData          = @cData,
                        @cZona          = @zonaTrim,
                        @postImages     = @postImagesParam;
                END

                SET @loop = @loop + 1;
            END
        END
    END

    PRINT CONCAT('[SofIA_PacketProcesor] END rec=', @rec_iid, ', sof_iidkey=', @accionId);

    SELECT sof_iidkey, sof_reciid, sof_ccodaccion, sof_cueiid, sof_cestado, sof_cdetalle, sof_isofechahora
    FROM _datos..p_sofia_accion WHERE sof_iidkey = @accionId;
END