CREATE OR ALTER PROCEDURE [dbo].[SGSP_MQTTSubscriberGetCommands]
    @cDLL NVARCHAR(50),
    @cModelo NVARCHAR(500),
    @iTop INT = 50
WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta el servicio  MQTTSubscriber para obetener comandos pendientes. Los reserva marcandolos como En proceso.
--Autor :Pablo O. Canónico
--Fecha :16/08/2026
-- cmd_nEstado:
--   1 = Pendiente
--   2 = En proceso
--   3 = Procesado
--   4 = Cancelado
--   5 = Procesado con Error
--   6 = Vencido
--   9 = En proceso multiple
SET NOCOUNT ON;

BEGIN TRY
    IF ISNULL(@cDLL, N'') = N'' OR ISNULL(@cModelo, N'') = N''
    BEGIN
        SELECT
            CAST(NULL AS INT) AS cmd_iid,
            CAST(NULL AS DATETIME) AS cmd_tfechahora,
            CAST(NULL AS INT) AS cmd_iComando,
            CAST(NULL AS VARCHAR(200)) AS cmd_cValores,
            CAST(NULL AS INT) AS cmd_nEstado,
            CAST(NULL AS VARCHAR(100)) AS cmd_cObservaciones,
            CAST(NULL AS DATETIME) AS cmd_tEnvioFechaHora,
            CAST(NULL AS VARCHAR(MAX)) AS cmd_cRespuesta,
            CAST(NULL AS INT) AS mqtt_cuid
        WHERE 1 = 0;

        RETURN;
    END;

    DECLARE @Commands TABLE
    (
        cmd_iid INT PRIMARY KEY,
        cmd_tfechahora DATETIME,
        cmd_iComando INT,
        cmd_cValores VARCHAR(200),
        cmd_nEstado INT,
        cmd_cObservaciones VARCHAR(100),
        cmd_tEnvioFechaHora DATETIME NULL,
        cmd_cRespuesta VARCHAR(MAX) NULL,
        mqtt_cuid INT
    );

    ;WITH PendingCommands AS
    (
        SELECT TOP (@iTop)
            pc.cmd_iid,
            pc.cmd_tfechahora,
            pc.cmd_iComando,
            pc.cmd_cValores,
            pc.cmd_nEstado,
            pc.cmd_cObservaciones,
            pc.cmd_tEnvioFechaHora,
            pc.cmd_cRespuesta,
            vmd.cue_iMQTTDeviceID AS mqtt_cuid
        FROM _Datos..p_comandos_ip pc WITH (ROWLOCK, READPAST, UPDLOCK)
        INNER JOIN _Datos.dbo.v_MQTTDevices vmd WITH (NOLOCK) ON pc.cmd_idCuenta = vmd.cue_iidCuenta
        INNER JOIN _Datos..m_paneles pan WITH (NOLOCK) ON pan.pan_iidcuenta = pc.cmd_idCuenta
        LEFT JOIN _tablas..T_ReceptorProtocolModel rpm WITH (NOLOCK) ON rpm.rpm_idkey = pan.pan_rpmidkey
        WHERE pc.cmd_nEstado = 1
            AND pc.cmd_iEsCustom = 3
            AND DATEDIFF(HOUR, pc.cmd_tfechahora, GETDATE()) <= 24
            AND pc.cmd_tfechahora <= GETDATE()
            AND @cDLL IN ( SELECT TOP 1 rec.rec_cdll
							FROM _Datos..m_receptores_cab rec WITH (NOLOCK)
						   WHERE pc.cmd_idReceptor = rec.rec_iid
            )
            AND ISNULL(rpm.rpm_cmodelo, N'') = @cModelo
        ORDER BY pc.cmd_tfechahora ASC, pc.cmd_iid ASC
    )
    UPDATE pc
        SET pc.cmd_nEstado = 2
    OUTPUT
        inserted.cmd_iid,
        inserted.cmd_tfechahora,
        inserted.cmd_iComando,
        inserted.cmd_cValores,
        inserted.cmd_nEstado,
        inserted.cmd_cObservaciones,
        inserted.cmd_tEnvioFechaHora,
        inserted.cmd_cRespuesta,
        pending.mqtt_cuid
    INTO @Commands
    FROM _Datos..p_comandos_ip pc
    INNER JOIN PendingCommands pending ON pending.cmd_iid = pc.cmd_iid;

    SELECT
        cmd_iid,
        cmd_tfechahora,
        cmd_iComando,
        cmd_cValores,
        cmd_nEstado,
        cmd_cObservaciones,
        cmd_tEnvioFechaHora,
        cmd_cRespuesta,
        mqtt_cuid
    FROM @Commands
    ORDER BY cmd_tfechahora ASC, cmd_iid ASC;
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