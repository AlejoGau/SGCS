-- ============================================================
-- Job: TimeZoneOffsetsSynchronize
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'TimeZoneOffsetsSynchronize')
    EXEC msdb.dbo.sp_delete_job @job_name = N'TimeZoneOffsetsSynchronize', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'TimeZoneOffsetsSynchronize',
    @enabled           = 1,
    @description       = N'Sincroniza offsets de husos horarios (DST) en t_TimeZone contra sys.time_zone_info, solo en meses con transiciones DST activas.',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'TimeZoneOffsetsSynchronize',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'TimeZoneOffsetsSynchronize',
    @step_id           = 1,
    @step_name         = N'Validar mes y sincronizar offsets',
    @subsystem         = N'TSQL',
    @command           = N'IF MONTH(GETDATE()) IN (2, 3, 4, 9, 10, 11)
    EXEC .[dbo].[SGSP_TimeZoneOffsetsSynchronize];
ELSE
    PRINT ''Fuera de ventana de sincronización DST (meses activos: Feb-Abr, Sep-Nov). No se ejecuta.'';
',
    @database_name     = N'_Tablas',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'TimeZoneOffsetsSynchronize',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Diario',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20260719,
    @active_end_date        = 99991231,
    @active_start_time      = 1500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'TimeZoneOffsetsSynchronize',
    @schedule_name = N'Diario';
GO
