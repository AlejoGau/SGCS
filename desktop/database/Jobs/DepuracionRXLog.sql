-- ============================================================
-- Job: DepuracionRXLog
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'DepuracionRXLog')
    EXEC msdb.dbo.sp_delete_job @job_name = N'DepuracionRXLog', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'DepuracionRXLog',
    @enabled           = 1,
    @description       = N'Depura las tablas [p_RXLog]',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'DepuracionRXLog',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'DepuracionRXLog',
    @step_id           = 1,
    @step_name         = N'Ejecuta SGSP_DepuracionRXLog',
    @subsystem         = N'TSQL',
    @command           = N'Exec [SGSP_DepuracionRXLog]
',
    @database_name     = N'_Datos',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'DepuracionRXLog',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'DepuracionRXLog',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20160129,
    @active_end_date        = 99991231,
    @active_start_time      = 24500,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'DepuracionRXLog',
    @schedule_name = N'DepuracionRXLog';
GO
