-- ============================================================
-- Job: SendPlatesToCamera
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'SendPlatesToCamera')
    EXEC msdb.dbo.sp_delete_job @job_name = N'SendPlatesToCamera', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'SendPlatesToCamera',
    @enabled           = 0,
    @description       = N'Envia patentes a camara hiskvision',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'SendPlatesToCamera',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'SendPlatesToCamera',
    @step_id           = 1,
    @step_name         = N'Inserta',
    @subsystem         = N'TSQL',
    @command           = N'SET XACT_ABORT ON;

-- =========================================================================
DECLARE @DelayEntreCuentas VARCHAR(8) = ''00:30:00''; -- Espera entre cada INSERT

DECLARE @UrlBase NVARCHAR(500) =
    ''https://app.montealina.es/handler/SendPlatesToCameraHandler'' +
    ''?_dc=1719945281755'' +
    ''&cuentaid={ID}'' +
    ''&Oauth_Token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87'';

DECLARE @Cuentas TABLE
(
    Orden    INT PRIMARY KEY,
    IdCuenta INT NOT NULL
);

INSERT INTO @Cuentas (Orden, IdCuenta) VALUES
    (1, 434),
    (2, 433),
    (3, 17);
-- =========================================================================

DECLARE @Orden    INT,
        @MaxOrden INT,
        @IdCuenta INT,
        @Url      NVARCHAR(500);

SELECT @MaxOrden = MAX(Orden) FROM @Cuentas;
SET @Orden = 1;

WHILE @Orden <= @MaxOrden
BEGIN
    SELECT @IdCuenta = IdCuenta FROM @Cuentas WHERE Orden = @Orden;

    SET @Url = REPLACE(@UrlBase, ''{ID}'', CAST(@IdCuenta AS NVARCHAR(10)));

    INSERT INTO _Datos.dbo.RedirectorQueue
    (
        rdq_iReDirector,
        rdq_idRec,
        rdq_idGps,
        rdq_tFechaHora,
        rdq_cLlamado,
        rdq_cRespuesta,
        rdq_iStatus,
        rdq_tStatusExec,
        rdq_iReSend,
        rdq_tReSendExec
    )
    VALUES
    (
        0,
        0,
        0,
        GETDATE(),
        @Url,
        '''',
        0,
        '''',
        0,
        ''''
    );

    -- No esperar después del último INSERT (evita un delay inútil al final)
    IF @Orden < @MaxOrden
        WAITFOR DELAY @DelayEntreCuentas;

    SET @Orden += 1;
END',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'SendPlatesToCamera',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Ejecuta',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20260511,
    @active_end_date        = 99991231,
    @active_start_time      = 305,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'SendPlatesToCamera',
    @schedule_name = N'Ejecuta';
GO
