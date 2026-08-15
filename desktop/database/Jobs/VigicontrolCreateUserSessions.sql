-- ============================================================
-- Job: VigicontrolCreateUserSessions
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'VigicontrolCreateUserSessions')
    EXEC msdb.dbo.sp_delete_job @job_name = N'VigicontrolCreateUserSessions', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'VigicontrolCreateUserSessions',
    @enabled           = 1,
    @description       = N'Busca los eventos de login y logout de vigicontrol y los inserta en la tabla de sesiones para armar reportes',
    @category_name     = N'[Uncategorized (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'VigicontrolCreateUserSessions',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'VigicontrolCreateUserSessions',
    @step_id           = 1,
    @step_name         = N'VigicontrolCreateUserSessions',
    @subsystem         = N'TSQL',
    @command           = N'exec _desktop..VigicontrolCreateUserSessions',
    @database_name     = N'master',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'VigicontrolCreateUserSessions',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'everyday',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 1,
    @freq_subday_interval   = 0,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20180131,
    @active_end_date        = 99991231,
    @active_start_time      = 230000,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'VigicontrolCreateUserSessions',
    @schedule_name = N'everyday';
GO
