-- ============================================================
-- Job: CambioClavesNanoComm
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'CambioClavesNanoComm')
    EXEC msdb.dbo.sp_delete_job @job_name = N'CambioClavesNanoComm', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'CambioClavesNanoComm',
    @enabled           = 1,
    @description       = N'Genera los comandos para actualizar la clave de los equipos NanoComm',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'CambioClavesNanoComm',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'CambioClavesNanoComm',
    @step_id           = 1,
    @step_name         = N'Genera Comandos',
    @subsystem         = N'TSQL',
    @command           = N'EXECUTE CambioClavesNanoComm',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'CambioClavesNanoComm',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Genera Comandos',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20120115,
    @active_end_date        = 99991231,
    @active_start_time      = 11500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'CambioClavesNanoComm',
    @schedule_name = N'Genera Comandos';
GO
