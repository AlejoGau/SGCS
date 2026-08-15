CREATE OR ALTER PROCEDURE [dbo].[SGSP_SofIAVoiceCallProcessParsedEvent]
    @id_evento_softguard INT,
    @event_id VARCHAR(80) = NULL,
    @keyword_verified VARCHAR(20) = NULL,
    @requires_immediate_attention VARCHAR(20) = NULL,
    @conversation_summary NVARCHAR(MAX) = NULL,
    @observaciones NVARCHAR(MAX) = NULL,
    @reference VARCHAR(255) = NULL,
    @occurred_at DATETIME = NULL,
    @te_contact_name NVARCHAR(200) = NULL,
    @te_phone_number VARCHAR(30) = NULL,
    @te_elapsed_time_sec INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ahora DATETIME = GETDATE();
    DECLARE @ObsActual NVARCHAR(MAX);
    DECLARE @ObsNueva NVARCHAR(MAX);
    DECLARE @ObsFail NVARCHAR(MAX);
    DECLARE @rec_nestado_actualizar INT = NULL;
    DECLARE @rec_tFechaProceso DATETIME = NULL;
    DECLARE @rec_iPrioridad INT = 0;
    DECLARE @cue_iid INT = 0;
    DECLARE @iOpe INT = 0;
    DECLARE @iValor INT = 0;
    DECLARE @cObservacionesTE NVARCHAR(MAX);
    DECLARE @duracionTE CHAR(8);
    Declare @nProceso Int = 0

    BEGIN TRY
        SELECT
            @ObsActual = CAST(rec_cObservaciones AS NVARCHAR(MAX)),
            @rec_iPrioridad = ISNULL(rec_iPrioridad, 0),
            @cue_iid = ISNULL(rec_iidcuenta, 0),
            @iOpe = ISNULL(rec_ioperador, 0)
        FROM dbo.p_recepcion WITH (UPDLOCK, ROWLOCK)
        WHERE rec_iid = @id_evento_softguard;

        IF @@ROWCOUNT = 0
        BEGIN
            RAISERROR('No existe p_recepcion para id_evento_softguard=%d', 16, 1, @id_evento_softguard);
            RETURN;
        END

        SET @observaciones = LTRIM(RTRIM(ISNULL(@observaciones, N'')));
        SET @conversation_summary = LTRIM(RTRIM(ISNULL(@conversation_summary, N'')));
        SET @keyword_verified = LOWER(LTRIM(RTRIM(ISNULL(@keyword_verified, ''))));
        SET @requires_immediate_attention = LOWER(LTRIM(RTRIM(ISNULL(@requires_immediate_attention, 'normal'))));
        SET @te_contact_name = LTRIM(RTRIM(ISNULL(@te_contact_name, N'')));
        SET @te_phone_number = LTRIM(RTRIM(ISNULL(@te_phone_number, '')));

        IF (@observaciones <> N'')
            SET @observaciones = N'[' + CONVERT(VARCHAR, @ahora, 103) + N' ' + SUBSTRING(CONVERT(VARCHAR, @ahora, 114), 1, 5) + N'] [SofIA] ' + @observaciones;

        IF (ISNULL(@ObsActual, N'') <> N'' AND @observaciones <> N'')
            SET @ObsNueva = @ObsActual + CHAR(13) + @observaciones;
        ELSE IF (@observaciones <> N'')
            SET @ObsNueva = @observaciones;
        ELSE
            SET @ObsNueva = @ObsActual;

        IF (@keyword_verified IN ('true', 'na'))
        BEGIN
            SET @rec_nestado_actualizar = 3;
            SET @rec_tFechaProceso = @ahora;
            Set @nProceso = 62 	--	Operador Virtual - Procesado
        END
        ELSE IF (@keyword_verified = 'false')
        BEGIN
            SET @rec_nestado_actualizar = 0;
            SET @rec_iPrioridad = 1;
            Set @nProceso = 63	--	Operador Virtual - Pendiente
        END
        ELSE IF (@keyword_verified = 'fail' AND @requires_immediate_attention = 'urgent')
        BEGIN
            SET @rec_nestado_actualizar = 0;
            SET @rec_iPrioridad = 1;
            Set @nProceso = 63	--	Operador Virtual - Pendiente
        END
        ELSE
        BEGIN
            SET @rec_nestado_actualizar = 3;
            SET @rec_tFechaProceso = @ahora;
            Set @nProceso = 62 	--	Operador Virtual - Procesado
        END

        INSERT INTO dbo.EventosTimeLine
        (
            etl_iRecID,
            etl_iCuenta,
            etl_tFechaHora,
            etl_cAccion,
            etl_cObservacion,
            etl_cOwner,
            etl_iOperador
        )
        VALUES
        (
            @id_evento_softguard,
            @cue_iid,
            @ahora,
            'IngresoComentarios',
            @observaciones,
            '%SISTEMA%',
            @iOpe
        );

        UPDATE dbo.p_recepcion
        SET
            rec_cObservaciones = @ObsNueva,
            rec_nestado = @rec_nestado_actualizar,
            rec_tFechaProceso = @rec_tFechaProceso,
            rec_iPrioridad = @rec_iPrioridad,
            rec_iMinutosEspera = 0
        WHERE rec_iid = @id_evento_softguard;

        Insert Into [dbo].[p_recepcion_proceso] (pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
			Values(@id_evento_softguard,'_WW',@ahora,@nProceso,@iOpe)

        IF (@keyword_verified = 'fail')
        BEGIN
            UPDATE dbo.OperadorVirtualConfig
            SET ovc_iStatus = 0
            WHERE ovc_iStatus = 1;

            SELECT TOP 1
                @cue_iid = cue_iid
            FROM dbo.m_cuentas WITH (NOLOCK)
            WHERE cue_clinea = '_SG'
              AND cue_ncuenta = 'INTE';

            EXEC dbo.SGSP_AlarmaGenerar
                @idCta = @cue_iid,
                @cAlarma = '_VO',
                @cQuien = 'SoftGuard',
                @iValor = @iValor OUTPUT;

            SET @ObsFail = N'Se detecto un error en el servicio de Operador Virtual. Se debe procesar manualmente';
            SET @ObsFail = N'[' + CONVERT(VARCHAR, GETDATE(), 103) + N' ' + SUBSTRING(CONVERT(VARCHAR, GETDATE(), 114), 1, 5) + N'] [SofIA] ' + @ObsFail;

            UPDATE pr
            SET
                pr.rec_nestado = 4,
                pr.rec_cobservaciones = CASE
                    WHEN pr.rec_cobservaciones IS NOT NULL AND CAST(pr.rec_cobservaciones AS NVARCHAR(MAX)) <> N''
                        THEN CAST(pr.rec_cobservaciones AS NVARCHAR(MAX)) + CHAR(13) + @ObsFail
                    ELSE @ObsFail
                END
            FROM dbo.p_recepcion pr
            INNER JOIN
            (
                SELECT s.sve_iRecId
                FROM dbo.SofIA_VoiceCallEvents s
                INNER JOIN dbo.EventosPendientes p
                    ON s.sve_iRecId = p.rec_iid
                WHERE s.sve_tCreatedDate >= DATEADD(MINUTE, -5, GETDATE())
                  AND p.rec_nEstado = 3
            ) tmp
                ON pr.rec_iid = tmp.sve_iRecId
            WHERE pr.rec_nestado = 3;
        END
        ELSE IF (@keyword_verified <> 'recording_ready')
        BEGIN
            SET @cObservacionesTE = N'Llamo a :';

            IF (@te_contact_name <> N'')
                SET @cObservacionesTE += N' ' + @te_contact_name;

            IF (@te_phone_number <> '')
                SET @cObservacionesTE += N' ' + @te_phone_number;

            IF (@te_elapsed_time_sec IS NOT NULL AND @te_elapsed_time_sec >= 0)
            BEGIN
                SET @duracionTE = CONVERT(CHAR(8), DATEADD(SECOND, @te_elapsed_time_sec, 0), 108);
                SET @cObservacionesTE += N' [' + @duracionTE + N']';
            END

            EXEC dbo.SGSP_pRecepcionINS
                @rec_iidcuenta = @cue_iid,
                @rec_calarma = '_TE',
                @rec_nestado = 8,
                @rec_cObservaciones = @cObservacionesTE,
                @rec_nOrigen = 5,
                @rec_iOperador = @iOpe,
                @rec_iUsuario = 0,
                @rec_iTE = @id_evento_softguard,
                @iValor = @iValor OUTPUT;
        END
    END TRY
    BEGIN CATCH
        IF ERROR_NUMBER() = 2627 PRINT 'Handling PK violation...';
        ELSE IF ERROR_NUMBER() = 547 PRINT 'Handling CHECK/FK constraint violation...';
        ELSE IF ERROR_NUMBER() = 515 PRINT 'Handling NULL violation...';
        ELSE IF ERROR_NUMBER() = 245 PRINT 'Handling conversion error...';
        ELSE PRINT 'Error detectado...';

        PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
        PRINT 'Error Message : ' + ERROR_MESSAGE();
        PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
        PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
        PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
        PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');

        THROW;
    END CATCH
END