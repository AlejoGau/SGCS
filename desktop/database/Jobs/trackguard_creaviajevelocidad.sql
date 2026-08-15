-- ============================================================
-- Job: trackguard_creaviajevelocidad
-- Generado por pull-db.ps1 - NO editar manualmente
-- ============================================================
USE msdb;
GO

IF EXISTS (SELECT 1 FROM msdb.dbo.sysjobs WHERE name = N'trackguard_creaviajevelocidad')
    EXEC msdb.dbo.sp_delete_job @job_name = N'trackguard_creaviajevelocidad', @delete_unused_schedule = 0;
GO

EXEC msdb.dbo.sp_add_job
    @job_name          = N'trackguard_creaviajevelocidad',
    @enabled           = 0,
    @description       = N'Crea viajes analizando la velocidad de los vehículos',
    @category_name     = N'[PG Timer (Local)]',
    @owner_login_name  = N'sa',
    @delete_level      = 0;
GO

EXEC msdb.dbo.sp_add_jobserver
    @job_name   = N'trackguard_creaviajevelocidad',
    @server_name = N'(LOCAL)';
GO

EXEC msdb.dbo.sp_add_jobstep
    @job_name          = N'trackguard_creaviajevelocidad',
    @step_id           = 1,
    @step_name         = N'TG_creaViajeVelocidad',
    @subsystem         = N'TSQL',
    @command           = N'exec _desktop..TG_creaViajeVelocidad',
    @database_name     = N'master',
    @on_success_action = 1,
    @on_success_step_id = 0,
    @on_fail_action    = 2,
    @on_fail_step_id   = 0,
    @retry_attempts    = 0,
    @retry_interval    = 0;
GO

EXEC msdb.dbo.sp_update_job
    @job_name      = N'trackguard_creaviajevelocidad',
    @start_step_id = 1;
GO

EXEC msdb.dbo.sp_add_schedule
    @schedule_name          = N'continuo',
    @enabled                = 1,
    @freq_type              = 4,
    @freq_interval          = 1,
    @freq_subday_type       = 2,
    @freq_subday_interval   = 10,
    @freq_relative_interval = 0,
    @freq_recurrence_factor = 0,
    @active_start_date      = 20200211,
    @active_end_date        = 99991231,
    @active_start_time      = 0,
    @active_end_time        = 235959;
GO

EXEC msdb.dbo.sp_attach_schedule
    @job_name      = N'trackguard_creaviajevelocidad',
    @schedule_name = N'continuo';
GO
