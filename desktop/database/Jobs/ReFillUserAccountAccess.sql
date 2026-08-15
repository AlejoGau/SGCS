-- ============================================================
-- Job: ReFillUserAccountAccess
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'ReFillUserAccountAccess')
    EXEC msdb.dbo.sp_delete_job @job_name = N'ReFillUserAccountAccess', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'ReFillUserAccountAccess',
    @enabled           = 1,
    @description       = N'Actualiza UserAccountAccess',
    @category_name     = N'Database Maintenance',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'ReFillUserAccountAccess',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'ReFillUserAccountAccess',
    @step_id           = 1,
    @step_name         = N'Execute',
    @subsystem         = N'TSQL',
    @command           = N'Exec [dbo].[SGSP_ReFillUserAccountAccess]',
    @database_name     = N'_Sistema',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 1;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'ReFillUserAccountAccess',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'Execute',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 8,
    @freq_subday_interval   = 4,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20250901,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'ReFillUserAccountAccess',
    @schedule_name = N'Execute';
GO
